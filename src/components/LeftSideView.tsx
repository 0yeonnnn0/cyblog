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
import { useEffect, useState } from "react";

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
  const [글있는날, set글있는날] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [selectDate, setSelectDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => {
    const fetchPostDates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/blog?month=${currentMonth}`);
        const data = await response.json();
        if (response.ok) {
          set글있는날((prevDates) => ({
            ...prevDates,
            [currentMonth]: data.dates,
          }));
        }
      } catch (error) {
        console.error("날짜 데이터를 가져오는데 실패했습니다:", error);
      }
      setIsLoading(false);
    };

    fetchPostDates();
  }, [currentMonth]);

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
            onClick={() => setSelectDate(new Date().toISOString().slice(0, 10))}
          />
        </div>
      </div>
      <SocialIcons />
    </div>
  );
}
