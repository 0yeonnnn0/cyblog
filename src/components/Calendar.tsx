"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { useCalendarStore } from "@/store/calendarStore";

interface CalendarBodyProps {
  selectDate: Date;
  setSelectDate: (date: Date) => void;
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

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      // date를 로컬 시간 기준 YYYY-MM-DD 형식으로 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      if (postDates?.includes(formattedDate)) {
        return "bold-date";
      }
    }
    return null;
  };

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
    setSelectDate(date);
    router.push(`/?post=${date.toISOString().slice(0, 10)}`);
  };

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
        value={selectDate}
        onChange={(value) => {
          const date = value as Date;
          setSelectDate(date);
          handleDateClick(date);
        }}
        locale="ko"
        tileClassName={tileClassName}
        onActiveStartDateChange={handleActiveStartDateChange}
      />
    </div>
  );
}
