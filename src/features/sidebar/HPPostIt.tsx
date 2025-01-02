"use client";

import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store/userStore";

interface Button {
  path: string;
  label: string;
  condition?: boolean;
}

interface CombinedButtonsProps {
  buttons: Button[];
  getButtonClass: (path: string) => string;
  handleLogout: () => void;
}

export function HPPostIt() {
  const pathname = usePathname();
  const { user, resetUser } = useUserStore();

  const getButtonClass = (path: string) => {
    const pathWithoutQuery = path.split("?")[0]; // 쿼리 파라미터 제거
    const isSelected = pathname === pathWithoutQuery;
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

  const handleLogout = () => {
    resetUser();
    window.location.reload();
  };

  const getTodayString = () => {
    return new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  const topButtons: Button[] = [
    { path: `/blog?post=${getTodayString()}`, label: "블로그" },
    { path: "/profile", label: "프로필" },
    // { path: "/guestbook", label: "방명록" },
    ...(user
      ? [{ path: "/auth/login", label: "LogOut" }]
      : [{ path: "/auth/login", label: "LogIn" }]),
  ];

  return (
    <div className="float-right w-0 h-96 m-post-it flex flex-col justify-between">
      <CombinedButtons
        buttons={topButtons}
        getButtonClass={getButtonClass}
        handleLogout={handleLogout}
      />
    </div>
  );
}

function CombinedButtons({
  buttons,
  getButtonClass,
  handleLogout,
}: CombinedButtonsProps) {
  const router = useRouter();

  return (
    <div>
      {buttons.map((button, index) => {
        if (button.condition !== false) {
          return (
            <button
              key={index}
              className={getButtonClass(button.path)}
              onClick={() => {
                button.label === "LogOut"
                  ? handleLogout()
                  : router.push(button.path);
              }}
            >
              {button.label}
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}
