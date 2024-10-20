"use client"; // Next.js 클라이언트 컴포넌트로 지정

import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { usePathname } from "next/navigation";
import "@/app/globals.css";

interface CalendarBodyProps {
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
  글있는날: Record<string, string[]>;
}

const CalendarBody: React.FC<CalendarBodyProps> = ({
  selectDate,
  setSelectDate,
  글있는날,
}) => {
  const [boldDates, setBoldDates] = useState<Set<string>>(new Set());
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const pathname = usePathname();

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
        onChange={(value) => setSelectDate(value as Date)}
        locale="ko"
        tileClassName={tileClassName}
        onActiveStartDateChange={handleActiveStartDateChange}
      />
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setSelectDate(new Date())}
          className="p-1 border border-gray-600"
        >
          Go Today
        </button>
      </div>
    </div>
  );
};

export default CalendarBody;
