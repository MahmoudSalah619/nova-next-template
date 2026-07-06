import handleErrors from "@/utils/handleErrors";
import { SerializedError } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLayoutEffect, useRef, useState } from "react";

interface UseAbortableQueryState<Data, Params> {
  data?: Data;
  currentData?: Data;
  endpointName?: string;
  error?: FetchBaseQueryError | SerializedError;
  fulfilledTimeStamp?: number;
  isError?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  isUninitialized?: boolean;
  originalArgs?: Params;
  requestId?: string;
  reset?: () => void;
  startedTimeStamp?: number;
  status: QueryStatus;
}

interface ExtraHookOptions {
  skip?: boolean;
}

/**
 * Custom hook to wrap RTK Query lazy hooks with abort functionality.
 *
 * @template HookFn - The RTK Query lazy hook type (e.g., useLazyGetDataQuery)
 * @template Result - The return type of the lazy hook
 * @template HookParam - The parameter type for the fetch function
 * @template HookOptions - The options type for the lazy hook
 *
 * @param {HookFn} useLazyQuery - The RTK Query lazy hook to wrap.
 * @param {HookParam} [params] - Parameters to pass to the fetch function.
 *   ⚠️ Warning: The `params` object should be memoized (e.g., with useMemo or useCallback)
 *   to prevent unnecessary re-fetching due to reference changes.
 * @param {HookOptions} [options] - Options to pass to the lazy hook.
 *
 * @returns {{
 *   data: Data | undefined;
 *   refetch: (args: HookParam) => Promise<void>;
 *   queryState: UseAbortableQueryState<Data, HookParam>;
 *   lastPromiseInfo: Result[2];
 *   abort: () => void;
 * }} Object containing query data, refetch, abort, and query state.
 *
 * @example
 * const { data, refetch, queryState, abort } = useAbortableQuery(useLazyGetUserQuery, { id: 1 });
 */

export default function useAbortableQuery<
  HookFn extends (...args: any[]) => any,
  Result extends ReturnType<HookFn> = ReturnType<HookFn>,
  HookParam extends Parameters<Result[0]>[0] = Parameters<Result[0]>[0],
  HookOptions extends Parameters<HookFn>[0] = Parameters<HookFn>[0],
>(
  useLazyQuery: HookFn,
  params?: HookParam,
  options?: HookOptions & ExtraHookOptions
) {
  type ReturnFetchFn = ReturnType<Result[0]>;
  type ReturnUnwrapFn = ReturnType<ReturnFetchFn["unwrap"]>;
  type Data = Awaited<ReturnUnwrapFn>;

  const [data, setData] = useState<Data | undefined>(undefined);
  const abortRef = useRef<() => void>(null);

  const [fetchFnFromHook, queryState, lastPromiseInfo] = useLazyQuery(options);

  const abort = () => {
    if (abortRef.current) {
      abortRef.current();
      abortRef.current = null;
    }
  };

  const fetch: Result[0] = async (args?: HookParam) => {
    try {
      abort();
      const promise = fetchFnFromHook(args ?? params);

      abortRef.current = promise.abort;

      const responseData = await promise.unwrap();

      setData(responseData);
    } catch (error) {
      handleErrors(error);
    }
  };

  useLayoutEffect(() => {
    if (options?.skip) {
      return;
    }
    fetch();

    return () => {
      abort();
    };
  }, [params]);

  return {
    data,
    refetch: fetch,
    queryState: queryState as UseAbortableQueryState<Data, HookParam>,
    lastPromiseInfo: lastPromiseInfo as Result[2],
    abort,
  };
}
