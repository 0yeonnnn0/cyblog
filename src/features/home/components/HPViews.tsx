import { useVisitorStore } from "@/store/visitorStore";
import { useEffect } from "react";

export function VisitorCounter() {
  const { count, isLoading, error, updateVisitorCount } = useVisitorStore();

  useEffect(() => {
    updateVisitorCount();
  }, []);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;
  return (
    <p className="h-14 pt-9 text-xs text-center select-none">
      {/* <span>Today </span>
      <span className="text-theme-color-blue">{todayViews}</span>
      <span> | </span> */}
      Total <span className="text-theme-color-blue">{count}</span>
    </p>
  );
}
