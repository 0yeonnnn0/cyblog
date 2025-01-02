import "@/app/globals.css";
import { ReactNode } from "react";
import MainLayout from "./MainLayout";

export const metadata = {
  title: "cyblog",
  description: "cyblog",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-custom-gray bg-custom-bg h-[700px] overflow-x-auto font-dungGeunMo font-normal">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
