import { TotalVisitorCounter } from "./visitor/VisitorCounter";

export function VisitorCounter() {
  return (
    <div className="h-14 pt-9 text-xs text-center select-none">
      {/* <span>Today </span>
      <span className="text-theme-color-blue">{todayViews}</span>
      <span> | </span> */}
      <span>Total </span>
      <TotalVisitorCounter />
    </div>
  );
}
