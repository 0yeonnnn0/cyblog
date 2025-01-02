import { useSelectDateStore } from "@/store/blog/selectDateStore";
import { formatDateToKorean } from "@/utils/dateUtils";

export function DateView() {
  const { selectDate } = useSelectDateStore();

  return (
    <time className="block mb-3 text-gray-600 font-medium">
      {formatDateToKorean(selectDate)}
    </time>
  );
}
