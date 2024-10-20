"use client"; // Next.js 클라이언트 컴포넌트로 지정
import { useRouter } from "next/navigation";

const HPBlogTitle: React.FC = () => {
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
};

export default HPBlogTitle;