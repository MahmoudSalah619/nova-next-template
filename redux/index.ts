import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import { getClientToken } from "@/lib/api";

// Hydrate the auth token from the session cookie on the client. On the server
// this is `null`; Server Components read the token directly via `getToken()`.
const token = getClientToken();

const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
  preloadedState: {
    auth: { token, userData: null },
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
