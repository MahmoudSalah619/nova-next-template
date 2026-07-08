import store from "@/redux";
import { login, setUserInfo } from "@/redux/authReducer";
import { setSessionTokens } from "@/lib/api";
import { User } from "@/services/auth/types";

/**
 * Persist a successful login: write the session cookies and sync Redux state.
 * Tokens are stored as cookies (not `localStorage`) so Server Components can
 * read them during SSR.
 */
export default function loginHandler({
  token = "",
  refreshToken = "",
  data,
}: {
  token?: string;
  refreshToken?: string;
  data?: User;
}) {
  if (token) setSessionTokens(token, refreshToken);
  if (data) store.dispatch(setUserInfo(data));

  store.dispatch(login(token));
}
