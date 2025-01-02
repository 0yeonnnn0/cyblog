"use client";
import { useSelectDateStore } from "@/store/blogStore";
import { useBlogStore } from "@/store/blogStore";
import { useLoadingStore } from "@/store/loadingStore";
import { BlogButton } from "@/app/blog/blogView";
import { useEffect } from "react";
import { CalendarBody } from "../Calendar";
import { SocialIcons } from "./SocialIcons";
import { useRouter } from "next/navigation";

export function BPLeftside() {
  const { selectDate, setSelectDate } = useSelectDateStore();
  const { setCurrentPost, clearCurrentPost } = useBlogStore();
  const { setIsLoading } = useLoadingStore();
  const router = useRouter();

  const handleGoToday = () => {
    const today = new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setSelectDate(today);
    router.push("/blog?post=" + today);
  };

  // 특정 날짜 포스트 조회
  useEffect(() => {
    if (selectDate) {
      setIsLoading(true);
      clearCurrentPost();

      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/blog?post=${selectDate}`);
          const data = await response.json();
          if (response.ok) {
            setCurrentPost(data);
          } else {
            clearCurrentPost();
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [selectDate]);

  return (
    <div className="flex flex-col justify-between h-full pb-3 items-center">
      <div>
        <CalendarBody selectDate={selectDate} setSelectDate={setSelectDate} />
        <div className="mt-6 flex justify-center">
          <BlogButton
            variant="secondary"
            text="Go Today"
            onClick={handleGoToday}
          />
        </div>
      </div>
      <SocialIcons />
    </div>
  );
}
