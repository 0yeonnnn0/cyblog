import { useEffect, useState } from "react";
import {
  getVisitorCount,
  incrementVisitorCount,
} from "../api/visitorCounterApi";

export const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const initVisitorCount = async () => {
      try {
        await incrementVisitorCount();
        const { count } = await getVisitorCount();
        setVisitorCount(count);
      } catch (error) {
        console.error("방문자 수 처리 실패:", error);
      }
    };

    initVisitorCount();
  }, []);

  return { visitorCount };
};
