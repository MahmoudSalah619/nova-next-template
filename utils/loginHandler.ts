import store from "@/redux";
import { login, setUserInfo } from "@/redux/authReducer";
import api from "@/api";
import { User } from "@/api/types/auth";

export default function loginHandler({
  token = "",
  refreshToken = "",
  withoutResetCache = false,
  data,
}: {
  token?: string;
  refreshToken?: string;
  withoutResetCache?: boolean;
  data?: User;
}) {
  if (token) localStorage.setItem("token", token);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  if (!withoutResetCache) store.dispatch(api.util.resetApiState());
  if (data) store.dispatch(setUserInfo(data));

  store.dispatch(login(token));
}
