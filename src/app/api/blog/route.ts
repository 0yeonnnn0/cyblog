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

// GET: 특정 날짜의 블로그 게시물 조회 및 월별 포스트 날짜 목록 조회
export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const postDate = url.searchParams.get("post");
    const month = url.searchParams.get("month");

    // 월별 포스트 날짜 목록 조회
    if (month) {
      const startOfMonth = new Date(month + "-01");
      const endOfMonth = new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth() + 1,
        0
      );

      const posts = await Blog.find(
        {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
        "createdAt"
      ); // createdAt 필드만 가져옴

      const dates = posts.map(
        (post) => post.createdAt.toISOString().split("T")[0]
      );

      return NextResponse.json({ dates });
    }

    // 특정 날짜의 포스트 조회
    if (postDate) {
      const blog = await getBlogByDateRange(postDate);
      if (!blog) {
        return NextResponse.json(
          { message: "No blog post found for the specified date" },
          { status: 404 }
        );
      }
      return NextResponse.json(blog);
    }

    throw new Error("Either 'post' or 'month' parameter is required");
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
    await connectDB();

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
    await connectDB();

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
