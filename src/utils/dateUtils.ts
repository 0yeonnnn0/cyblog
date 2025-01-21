/**
 * Calendar 타일의 클래스명을 결정하는 유틸리티 함수
 * @param date - 캘린더의 각 날짜
 * @param view - 캘린더 뷰 타입 (month, year, decade)
 * @param postDates - 게시글이 있는 날짜들의 배열
 * @returns 해당 날짜에 적용할 클래스명 또는 null
 */
export const getCalendarTileClassName = (
  {
    date,
    view,
  }: {
    date: Date;
    view: string;
  },
  postDates?: string[]
) => {
  if (view === "month") {
    const formattedDate = formatDateToYYYYMMDD(date);
    if (postDates?.includes(formattedDate)) {
      return "bold-date";
    }
  }
  return null;
};

/**
 * Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
 */
export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * YYYY-MM-DD 형식의 문자열을 "YYYY년 MM월 DD일" 형식으로 변환
 */
export const formatDateToKorean = (
  dateString: string
): { date: string; suffix: string } => {
  const [year, month, day] = dateString.split("-");
  return {
    date: `${year}. ${month.padStart(2, "0")}. ${day.padStart(2, "0")}`,
    suffix: "의 일기",
  };
};
