import { useRouter } from "next/navigation";

export function BlogTitle() {
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
        https://cyblog.vercel.app
      </span>
    </div>
  );
}
