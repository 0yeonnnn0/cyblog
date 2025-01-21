"use client";
import "@/app/globals.css";
import { HPPostIt } from "@/features/sidebar/HPPostIt";
import { ReactNode } from "react";
import { HPLeftSide } from "@/features/sidebar/HPLeftSide";
import { BPLeftside } from "@/features/sidebar/BPLeftside";
import { BlogTitle } from "@/features/home/components/BlogTitle";
import { VisitorCounter } from "@/features/home/components/HPViews";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex ml-5 mt-5">
      <div className="basis-60 rounded-3xl bg-white border-gray-500 border-solid border-r-0 p-outerLeft border-2">
        <div className="bg-gray-300 bg-clip-content border-dashed border-gray-500 border-2 rounded-3xl p-dot-left ml-3 border-r-0">
          <VisitorCounter />

          <div className="bg-white border-solid border-gray-400 border-3 rounded-2xl h-content w-content-left m-content-left p-content-left">
            {pathname === "/blog" ? <BPLeftside /> : <HPLeftSide />}
          </div>
        </div>
      </div>
      <div className="basis-outerRight rounded-3xl pr-3 bg-white border-gray-500 border-solid border-l-0 pt-4 pb-4 border-2">
        <div className="w-dotRight bg-gray-300 bg-clip-content border-dashed border-gray-500 border-2 rounded-3xl p-dot-right border-l-0">
          <BlogTitle />
          <HPPostIt />
          <div className="w-content-right bg-white border-solid border-gray-400 border-3 h-content rounded-2xl m-content-right p-content-right">
            <div className="h-full overflow-auto scrollbar-hide">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
