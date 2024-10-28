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
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.resetUser);

  const getButtonClass = (path: string) => {
    const isSelected = pathname === path;
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

  // topButtons에 글쓰기 버튼 추가
  const topButtons: Button[] = [
    { path: "/", label: "홈" },
    { path: "/profile", label: "프로필" },
    { path: "/blog", label: "블로그" },
    { path: "/guestbook", label: "방명록" },
  ];

  const bottomButtons: Button[] = [
    user
      ? { path: "/auth/login", label: "LogOut", condition: true }
      : { path: "/auth/login", label: "LogIn", condition: true },
  ];

  return (
    <div className="float-right w-0 h-96 m-post-it flex flex-col justify-between">
      <CombinedButtons
        buttons={topButtons}
        getButtonClass={getButtonClass}
        handleLogout={handleLogout}
      />
      <CombinedButtons
        buttons={bottomButtons}
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
      {buttons.map(
        (button, index) =>
          button.condition !== false && (
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
          )
      )}
    </div>
  );
}
