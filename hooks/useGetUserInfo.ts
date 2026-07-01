"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

export default function useGetUserInfo() {
  const { token, userData } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userType = userData?.user_type;

  return {
    isLoggedIn: mounted && !!token,
    isAdmin: mounted && userType === "admin",
    isSeller: mounted && userType === "seller",
    role: mounted ? (userType ?? null) : null,
    userInfo: mounted ? (userData ?? null) : null,
  };
}
