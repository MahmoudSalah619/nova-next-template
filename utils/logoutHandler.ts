import store from "@/redux";
import { logout } from "@/redux/authReducer";
import { clearSession } from "@/lib/api";

/** Clear the session cookies and reset Redux auth state. */
export default function logoutHandler() {
  clearSession();
  store.dispatch(logout());
}
