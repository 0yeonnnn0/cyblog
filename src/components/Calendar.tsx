"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { useCalendarStore } from "@/store/calendarStore";
import { getCalendarTileClassName } from "@/utils/dateUtils";

interface CalendarBodyProps {
  selectDate: string;
  setSelectDate: (date: string) => void;
}

export function CalendarBody({ selectDate, setSelectDate }: CalendarBodyProps) {
  const { currentMonth, setCurrentMonth, currentYear, setCurrentYear } =
    useCalendarStore();
  const router = useRouter();
  const [postDates, setPostDates] = useState<string[]>([]);
  // 월별 포스트 목록 조회
  useEffect(() => {
    const fetchPostDates = async () => {
      try {
        const response = await fetch(
          `/api/blog?month=${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}`
        );
        const data = await response.json();
        setPostDates(data.dates);
      } catch (error) {
        console.error("날짜 데이터를 가져오는데 실패했습니다:", error);
      }
    };

    fetchPostDates();
  }, [currentMonth, setPostDates]);

  // 타일 클래스명 설정
  const tileClassName = ({ date, view }: { date: Date; view: string }) =>
    getCalendarTileClassName({ date, view }, postDates);

  // 캘린더 시작 날짜 변경 시 처리
  const handleActiveStartDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (activeStartDate) {
      setCurrentYear(activeStartDate.getFullYear());
      setCurrentMonth(activeStartDate.getMonth());
    }
  };

  // 날짜 클릭 시 경로 이동
  const handleDateClick = (date: Date) => {
    setSelectDate(date.toISOString().slice(0, 10));
    router.push(`/blog?post=${date.toISOString().slice(0, 10)}`);
  };

  const dateValue = new Date(selectDate + "T00:00:00"); // 타임존 이슈 방지를 위해 시간 추가

  return (
    <div>
      <Calendar
        className="font-mono justify-center"
        calendarType="gregory"
        showNeighboringMonth={false}
        formatDay={(locale, date) => format(date, "d")}
        minDetail="year"
        next2Label={null}
        prev2Label={null}
        value={dateValue}
        onChange={(value) => {
          const date = value as Date;
          setSelectDate(date.toISOString().slice(0, 10));
          handleDateClick(date);
        }}
        locale="ko"
        tileClassName={tileClassName}
        onActiveStartDateChange={handleActiveStartDateChange}
      />
    </div>
  );
}
