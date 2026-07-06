import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import showAuthToast from "./showAuthToast";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export default function handleErrors(error: unknown, autoClose = 3000) {
  const err = error as FetchBaseQueryError;
  if (err.status === "FETCH_ERROR" || err.status === "TIMEOUT_ERROR") {
    showAuthToast({
      title: "Connection Error",
      autoClose,
    });
  } else if (err.status === "PARSING_ERROR") {
    showAuthToast({
      title: "Unknown Error",
      autoClose,
    });
  } else if (Array.isArray(err.data)) {
    showAuthToast({
      title: JSON.stringify(err.data),
      autoClose,
    });
  } else if (isObject(err.data)) {
    const dataObject = err.data as Record<string, unknown>;

    Object.keys(err.data).forEach((key) => {
      if (Array.isArray(dataObject[key])) {
        const errResult = dataObject[key] as string[];
        showAuthToast({
          title: key,
          message: JSON.stringify(errResult),
          autoClose,
        });
      } else {
        const errResult = dataObject[key] as string;
        showAuthToast({
          title: key,
          message: JSON.stringify(errResult),
          autoClose,
        });
      }
    });
  }
}
