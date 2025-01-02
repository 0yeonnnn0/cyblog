"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelectDateStore } from "@/store/blogStore";

export default function HomePage() {
  const router = useRouter();
  const selectDate = useSelectDateStore((state) => state.selectDate);

  useEffect(() => {
    router.push(`/blog?post=${selectDate}`);
  }, [router]);

  return null;
}
