/**
 * Stats service — demonstrates a typed `fetch` endpoint.
 *
 * The request hits `${NEXT_PUBLIC_API_URL}/{lang}/api/stats`. Point
 * `NEXT_PUBLIC_API_URL` at your backend and the call resolves there.
 */
import { apiMethods } from "@/lib/api";
import type { ApiFetchOptions } from "@/lib/api";
import type { StatsResponse } from "./types";

export function getStats(options?: ApiFetchOptions) {
  return apiMethods.get<StatsResponse>("/stats", options);
}

export type * from "./types";
