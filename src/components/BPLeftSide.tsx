"use client"; // 클라이언트 컴포넌트로 설정

import { Dispatch, SetStateAction } from "react";
import CalendarBody from "./Calendar";

interface BPLeftsideProps {
  selectDate: Date;
  setSelectDate: Dispatch<SetStateAction<Date>>;
}

const BPLeftside: React.FC<BPLeftsideProps> = ({
  selectDate,
  setSelectDate,
}) => {
  const 글있는날: Record<string, string[]> = {
    "2024-07": ["2024-07-10", "2024-07-15"],
    "2024-08": ["2024-08-01", "2024-08-10", "2024-08-20"],
  };

  return (
    <div>
      <CalendarBody
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        글있는날={글있는날}
      />
    </div>
  );
};

export default BPLeftside;
