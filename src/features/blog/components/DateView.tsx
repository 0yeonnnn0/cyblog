import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { formatDateToKorean } from "@/utils/dateUtils";

export function DateView() {
  const { selectDate } = useSelectDateStore();

  return (
    <time className="block  text-gray-600 font-medium">
      <span>{formatDateToKorean(selectDate).date}</span>
      <span>{formatDateToKorean(selectDate).suffix}</span>
    </time>
  );
}
