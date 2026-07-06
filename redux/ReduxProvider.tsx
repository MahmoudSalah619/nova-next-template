"use client";

import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "@/redux";
import type { ReactNode } from "react";

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <CookiesProvider>{children}</CookiesProvider>
    </Provider>
  );
}
