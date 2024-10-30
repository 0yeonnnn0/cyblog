"use client"; // Next.js 클라이언트 컴포넌트로 지정

import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { SelectDateState } from "@/store/blogStore";

interface CalendarBodyProps extends SelectDateState {
  글있는날: Record<string, string[]>;
}

export function CalendarBody({
  selectDate,
  setSelectDate,
  글있는날,
}: CalendarBodyProps) {
  const [boldDates, setBoldDates] = useState<Set<string>>(new Set());
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const router = useRouter();

  const fetchBoldDates = (month: number) => {
    const data = 글있는날;
    return new Set(data[`2024-${String(month + 1).padStart(2, "0")}`] || []);
  };

  useEffect(() => {
    const loadDates = () => {
      const dates = fetchBoldDates(currentMonth);
      setBoldDates(dates);
    };
    loadDates();
  }, [currentMonth]);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      if (boldDates.has(dateString)) {
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
      setCurrentMonth(activeStartDate.getMonth());
    }
  };

  // 날짜 클릭 시 경로 이동
  const handleDateClick = (date: Date) => {
    setSelectDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    router.push(`/?post=${formattedDate}`); // 선택한 날짜로 경로 설정
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
          setSelectDate(value as Date);
          handleDateClick(value as Date); // 날짜 클릭 시 handleDateClick 호출
        }}
        locale="ko"
        tileClassName={tileClassName}
        onActiveStartDateChange={handleActiveStartDateChange}
      />
    </div>
  );
}
