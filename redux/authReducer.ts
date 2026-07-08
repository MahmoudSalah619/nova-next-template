import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/services/auth/types";

interface IAuthState {
  token?: string | null;
  userData?: User | null;
}
const initialState: IAuthState = {
  token: null,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => ({
      ...state,
      token: action.payload,
    }),
    setUserInfo: (state, action: PayloadAction<User>) => ({
      ...state,
      userData: action.payload,
    }),
    logout: () => ({
      token: null,
      userData: null,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { login, setUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;
