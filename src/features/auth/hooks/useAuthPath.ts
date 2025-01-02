"use client";

import { usePathname } from "next/navigation";

export function useAuthPath() {
  const currentPath = usePathname();
  return {
    isLoginPage: currentPath === "/auth/login",
  };
}
