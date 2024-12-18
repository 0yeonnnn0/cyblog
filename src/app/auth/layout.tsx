"use client";

import Image from "next/image";
import logoImg from "@/public/logo_fire.gif";
import { ReactNode } from "react";
import NavigationLink from "@/components/NavigationLink";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const currentPath = usePathname();
  const isLoginPage: boolean = currentPath === "/auth/login";

  return (
    <div className="border border-transparent rounded-[10px] p-[5px]">
      <div className="flex flex-col justify-center">
        {/* 공통 로고 */}
        <Image
          src={logoImg}
          alt="Blog Logo Fire ver."
          className="w-56 mx-auto"
          unoptimized={true}
        />
        <div className="w-login-button m-[20px] mx-auto">{children}</div>
        <BottomNav isLoginPage={isLoginPage} />
      </div>
    </div>
  );
}

interface BottomNavProps {
  isLoginPage: boolean;
}

function BottomNav({ isLoginPage }: BottomNavProps) {
  return (
    <div className="flex text-sm justify-center my-2 text-gray-500 gap-3">
      <NavigationLink path="/auth/find/id" label="아이디 찾기" />
      <p>|</p>
      <NavigationLink path="/auth/find/pw" label="비밀번호 찾기" />
      <p>|</p>
      {isLoginPage ? (
        <NavigationLink path="/auth/join" label="회원가입" />
      ) : (
        <NavigationLink path="/auth/login" label="로그인" />
      )}
    </div>
  );
}
