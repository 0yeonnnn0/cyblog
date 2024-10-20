interface HPViewsProps {
  todayViews: number; // 오늘 조회수
  totalViews: number; // 총 조회수
}

const HPViews: React.FC<HPViewsProps> = ({ todayViews, totalViews }) => {
  return (
    <p className="h-14 pt-9 text-xs text-center select-none">
      <span>Today</span>{" "}
      <span className="text-theme-color-blue">{todayViews}</span>
      <span>
        | Total <span className="text-theme-color-blue">{totalViews}</span>
      </span>
    </p>
  );
};

export default HPViews;
