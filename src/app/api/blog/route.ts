// src/app/blog/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/config/mongoose"; // DB 연결 함수
import Blog from "@/model/Blog"; // IBlog 모델

const getDayRange = (date: string) => {
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);
  return { startOfDay, endOfDay };
};

const validateDate = (date: string | null) => {
  if (!date) throw new Error("Date parameter is required");
  return date;
};

const getBlogByDateRange = async (date: string) => {
  const { startOfDay, endOfDay } = getDayRange(date);
  return await Blog.findOne({
    createdAt: { $gte: startOfDay, $lt: endOfDay },
  });
};
// MongoDB와 연결합니다.
connectDB();

// GET: 모든 블로그 게시물 조회
export async function GET(req: Request) {
  try {
    const date = validateDate(new URL(req.url).searchParams.get("post"));
    const blog = await getBlogByDateRange(date);

    if (!blog) throw new Error("No blog post found for the specified date");
    return NextResponse.json(blog);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message.includes("required") ? 400 : 404 }
    );
  }
}

// POST: 새로운 블로그 게시물 생성
export async function POST(req: Request) {
  try {
    const { date, ...otherFields } = await req.json();
    validateDate(date);

    const { startOfDay, endOfDay } = getDayRange(date);
    const blog = await Blog.findOneAndUpdate(
      { createdAt: { $gte: startOfDay, $lt: endOfDay } },
      { ...otherFields },
      { new: true, upsert: true }
    );

    return NextResponse.json(blog, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create or update blog post" },
      { status: 400 }
    );
  }
}

// DELETE: 특정 블로그 게시물 삭제
export async function DELETE(req: Request) {
  try {
    const date = validateDate(new URL(req.url).searchParams.get("date"));
    const { startOfDay, endOfDay } = getDayRange(date);

    const deletedBlog = await Blog.findOneAndDelete({
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    if (!deletedBlog)
      throw new Error("No blog post found for the specified date");
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.message.includes("required") ? 400 : 404 }
    );
  }
}
