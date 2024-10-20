"use client";
// 공통 레이아웃
// 해당 경로 및 하위 경로에서 공통으로 사용되는 레이아웃(틀)을 정의
// 모든 페이지에 적용할 공통적인 UI 요소(헤더, 푸터, 네비게이션 바 등)를 설정할 때 사용
// /app 폴더와 각 경로에 배치할 수 있으며, 해당 위치의 모든 하위 page.tsx에 공통적으로 적용됩니다.
// 	•	예: app/layout.tsx → 모든 페이지에 적용되는 레이아웃
// 	•	app/dashboard/layout.tsx → /dashboard와 그 하위 경로에 적용되는 레이아웃

import "@/app/globals.css"; // 공통 CSS 파일
import HPLeftSide from "@/components/HPLeftSide";
import HPPostIt from "@/components/HPPostIt";
import HPViews from "@/components/HPViews";
import { useState, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/lib/store"; // Redux 스토어 가져오기
import HPBlogTitle from "@/components/HPBlogTitle";
import { usePathname } from "next/navigation";
import BlogPage from "./blog/page";
import BPLeftside from "@/components/BPLeftSide";
import { SelectDateProvider } from "@/context/SelectDateContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [selectDate, setSelectDate] = useState<Date>(new Date());

  return (
    <Provider store={store}>
      <html lang="en">
        <body className="bg-custom-gray bg-custom-bg h-[700px] overflow-x-auto font-dungGeunMo font-normal">
          <div className="flex ml-5 mt-5">
            <div className="basis-60 float-right rounded-3xl bg-white border-gray-500 border-solid border-r-0 p-outerLeft border-2">
              <div className="bg-gray-300 bg-clip-content border-dashed border-gray-500 border-2 rounded-3xl p-dot-left float-right border-r-0">
                <HPViews todayViews={10} totalViews={100} />

                <div className="bg-white border-solid border-gray-400 border-3 rounded-2xl h-content w-content-left m-content-left p-content-left">
                  {pathname === "/blog" ? (
                    <BPLeftside
                      setSelectDate={setSelectDate}
                      selectDate={selectDate}
                    />
                  ) : (
                    <HPLeftSide />
                  )}
                </div>
              </div>
            </div>
            <div className="basis-outerRight float-left rounded-3xl bg-white border-gray-500 border-solid border-l-0 pt-4 pb-4 border-2">
              <div className="w-dotRight bg-gray-300 bg-clip-content border-dashed border-gray-500 border-2 rounded-3xl p-dot-right float-left border-l-0">
                <HPBlogTitle />
                <HPPostIt />
                <div className="w-content-right bg-white border-solid border-gray-400 border-3 h-content rounded-2xl m-content-right p-content-right">
                  <div className="h-full overflow-auto">
                    <SelectDateProvider selectDate={selectDate}>
                      {children}
                    </SelectDateProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    </Provider>
  );
}
