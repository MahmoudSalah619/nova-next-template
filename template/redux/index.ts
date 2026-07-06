import { configureStore } from "@reduxjs/toolkit";
// import rtkQueryErrorLogger from "apis/middlewares/errorMiddleware";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import api from "@/api";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    app: appReducer,
  },
  preloadedState: {
    auth: { token, userData: null },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
