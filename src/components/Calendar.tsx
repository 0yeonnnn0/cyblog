"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

interface CalendarBodyProps {
  selectDate: Date;
  setSelectDate: (date: Date) => void;
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
      const dateString = format(date, "yyyy-MM-dd");
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
