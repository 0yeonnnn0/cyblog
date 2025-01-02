"use client";

import Image from "next/image";
import profileImg from "@/public/profile.png";
import { useUserStore } from "@/store/userStore";
import { SocialIcons } from "./SocialIcons";

export function HPLeftSide() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="flex justify-between flex-col gap-3 h-full pb-3 items-center">
      <div>
        <Image
          src={profileImg}
          alt="profile"
          className="rounded-xl bg-cover mb-5 select-none"
          width={160}
          height={160}
          priority
        />

        <div className="w-40 h-32 text-pretty select-none">
          {user && `${user?.username} 님, \n`}제 일기장에 오신 것을 환영합니다.
          🌱
        </div>
      </div>
      <SocialIcons />
    </div>
  );
}
