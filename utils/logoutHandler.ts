import store from "@/redux";
import { logout } from "@/redux/authReducer";

export default function logoutHandler() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  store.dispatch(logout());
}
