"use client";

import { useAuthPath } from "@/features/auth/hooks/useAuthPath";
import { AuthBottomNav } from "@/features/auth/components/AuthBottomNav";
import { AuthLogo } from "@/components/AuthLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoginPage } = useAuthPath();

  return (
    <div className="border border-transparent rounded-[10px] p-[5px]">
      <div className="flex flex-col justify-center">
        <AuthLogo />
        <div className="w-login-button m-[20px] mx-auto">{children}</div>
        <AuthBottomNav isLoginPage={isLoginPage} />
      </div>
    </div>
  );
}
