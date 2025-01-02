"use client";
import { useEffect } from "react";
import { useVisitorStore } from "@/store/visitorStore";

export function TotalVisitorCounter() {
  const { count, isLoading, error, updateVisitorCount } = useVisitorStore();

  useEffect(() => {
    updateVisitorCount();
  }, []);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;

  return <span className="text-theme-color-blue">{count}</span>;
}
