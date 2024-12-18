"use client";
import "@/app/globals.css";
import { HPPostIt } from "@/components/HPPostIt";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { HPViews, HPBlogTitle } from "./homeView";
import { BPLeftside, HPLeftSide, SocialIcons } from "@/components/LeftSideView";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="bg-custom-gray bg-custom-bg h-[700px] overflow-x-auto font-dungGeunMo font-normal">
        <div className="flex ml-5 mt-5">
          <div className="basis-60 float-right rounded-3xl bg-white border-gray-500 border-solid border-r-0 p-outerLeft border-2">
            <div className="bg-gray-300 bg-clip-content border-dashed border-gray-500 border-2 rounded-3xl p-dot-left float-right border-r-0">
              <HPViews todayViews={10} totalViews={100} />

              <div className="bg-white border-solid border-gray-400 border-3 rounded-2xl h-content w-content-left m-content-left p-content-left">
                {pathname === "/" ? <BPLeftside /> : <HPLeftSide />}
              </div>
            </div>
          </div>
          <div className="basis-outerRight float-left rounded-3xl bg-white border-gray-500 border-solid border-l-0 pt-4 pb-4 border-2">
            <div className="w-dotRight bg-gray-300 bg-clip-content border-dashed border-gray-500 border-2 rounded-3xl p-dot-right float-left border-l-0">
              <HPBlogTitle />
              <HPPostIt />
              <div className="w-content-right bg-white border-solid border-gray-400 border-3 h-content rounded-2xl m-content-right p-content-right">
                <div className="h-full overflow-auto">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
