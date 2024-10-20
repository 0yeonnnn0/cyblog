"use client";

import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation"; // usePathname을 추가로 가져옵니다.
import { RootState } from "@/lib/store"; // Redux 스토어의 루트 상태 타입을 가져옵니다.

const HPPostIt = () => {
  const router = useRouter();
  const pathname = usePathname(); // usePathname으로 현재 경로 가져오기
  const state = useSelector((state: RootState) => state.isLoggedIn); // Redux 상태에서 isLoggedIn 가져오기

  const topButtons = [
    { path: "/", label: "홈" },
    { path: "/profile", label: "프로필" },
    { path: "/blog", label: "블로그" },
    { path: "/guestbook", label: "방명록" },
  ];

  const bottomButtons = [
    { path: "/auth/login", label: "로그인", condition: state },
    { path: "/auth/mypage", label: "MyPage", condition: !state },
  ];

  const getButtonClass = (path: string) => {
    const isSelected = pathname === path; // usePathname에서 가져온 값을 사용합니다.
    const baseClass =
      "block w-post-it h-post-it rounded-post-it border border-black border-l-0 m-[3px] -ml-[1px] text-[17px] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.5)] outline-none select-none";
    const hoverClass = "hover:bg-white hover:text-black";
    const selectedClass = "bg-white";
    const defaultClass = "bg-theme-color-blue";

    const textClass = isSelected ? "text-black" : "text-white";

    return `${baseClass} ${hoverClass} ${
      isSelected ? selectedClass : defaultClass
    } ${textClass}`;
  };

  return (
    <div className="float-right w-0 m-post-it flex flex-col gap-44">
      <div>
        {topButtons.map((button, index) => (
          <button
            key={index}
            className={getButtonClass(button.path)}
            onClick={() => {
              router.push(button.path);
            }}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div>
        {bottomButtons.map((button, index) => {
          return button.condition ? (
            <button
              key={index}
              className={getButtonClass(button.path)}
              onClick={() => {
                router.push(button.path);
              }}
            >
              {button.label}
            </button>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default HPPostIt;
