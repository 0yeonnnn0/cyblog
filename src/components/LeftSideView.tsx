"use client"; // 클라이언트 컴포넌트로 설정

import { BlogButton } from "@/app/blog/blogView";
import { CalendarBody } from "./Calendar";
import { useSelectDateStore } from "@/store/blogStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import profileImg from "@/public/profile.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareGithub,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useUserStore } from "@/store/userStore";

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
export function SocialIcons() {
  return (
    <div className="flex gap-5 font-black select-none">
      <SocialIcon
        url="https://www.instagram.com/___yeonnnn"
        icon={faSquareInstagram}
      />
      <SocialIcon url="https://github.com/0yeonnnn0" icon={faSquareGithub} />
      <SocialIcon url="https://lmsd1.tistory.com/" icon={faSquarePen} />
    </div>
  );
}

type SocialIconProps = {
  url: string;
  icon: IconProp;
  size?: "1x" | "2x" | "3x";
};

function SocialIcon({ url, icon, size = "2x" }: SocialIconProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={icon} size={size} />
    </a>
  );
}

export function BPLeftside() {
  const 글있는날: Record<string, string[]> = {
    "2024-07": ["2024-07-10", "2024-07-15"],
    "2024-08": ["2024-08-01", "2024-08-10", "2024-08-20"],
  };
  const selectDate = useSelectDateStore((state) => state.selectDate);
  const setSelectDate = useSelectDateStore((state) => state.setSelectDate);
  const router = useRouter();

  const handleButtonClick = () => {
    const today = new Date();
    setSelectDate(today);
    const formattedDate = today.toISOString().split("T")[0];
    router.push(`/?post=${formattedDate}`);
  };

  return (
    <div className="flex flex-col justify-between h-full pb-3 items-center">
      <div>
        <CalendarBody
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          글있는날={글있는날}
        />
        <div className="mt-6 flex justify-center">
          <BlogButton
            variant="secondary"
            text="Go Today"
            onClick={() => handleButtonClick()}
          />
        </div>
      </div>
      <SocialIcons />
    </div>
  );
}
