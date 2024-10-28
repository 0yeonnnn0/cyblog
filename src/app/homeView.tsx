import { useRouter } from "next/navigation";
interface HPViewsProps {
  todayViews: number;
  totalViews: number;
}

export function HPViews({ todayViews, totalViews }: HPViewsProps) {
  return (
    <p className="h-14 pt-9 text-xs text-center select-none">
      <span>Today</span>
      <span className="text-theme-color-blue">{todayViews}</span>
      <span>
        | Total <span className="text-theme-color-blue">{totalViews}</span>
      </span>
    </p>
  );
}

export function HPBlogTitle() {
  const router = useRouter();

  return (
    <div className="flex flex-row flex-nowrap justify-between items-end h-14 px-6">
      <p
        className="inline-block text-3xl cursor-pointer select-none"
        onClick={() => {
          router.push("/");
        }}
      >
        Trust.
      </p>
      <span className="float-right text-xs mr-2 text-gray-600">
        https://cyblog.fly.dev
      </span>
    </div>
  );
}
