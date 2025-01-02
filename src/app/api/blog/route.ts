// src/app/blog/route.ts
import { NextResponse } from "next/server";
import Blog from "@/model/Blog"; // IBlog 모델
import connectDB from "@/lib/mongoose/config";

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

// GET: 특정 날짜의 블로그 게시물 조회 및 월별 포스트 날짜 목록 조회
export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const postDate = url.searchParams.get("post");
    const month = url.searchParams.get("month");

    // 월별 포스트 날짜 목록 조회
    if (month) {
      const [year, monthStr] = month.split("-");
      const nextMonth = String(Number(monthStr) + 1).padStart(2, "0");

      const posts = await Blog.find(
        {
          postDay: {
            $gte: `${year}-${monthStr}-01`,
            $lt: `${year}-${nextMonth}-01`,
          },
        },
        "postDay"
      );

      const dates = posts.map((post) => post.postDay);
      return NextResponse.json({ dates });
    }

    // 특정 날짜의 포스트 조회
    if (postDate) {
      const blog = await Blog.findOne({ postDay: postDate });
      if (!blog) {
        return NextResponse.json(
          { message: "No blog post found for the specified date" },
          { status: 404 }
        );
      }
      return NextResponse.json(blog);
    }

    throw new Error("Either 'post' or 'month' parameter is required");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// POST: 새로운 블로그 게시물 생성
export async function POST(req: Request) {
  try {
    await connectDB();
    const { date, ...otherFields } = await req.json();

    // 날짜 유효성 검사
    if (!date || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return NextResponse.json(
        { message: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    const blogData = {
      ...otherFields,
      postDay: date,
    };

    // 기존 게시물 확인
    const existingPost = await Blog.findOne({ postDay: date });

    const blog = await Blog.findOneAndUpdate({ postDay: date }, blogData, {
      new: true,
      upsert: true,
    });

    // 새로운 게시물 생성인지 업데이트인지에 따라 다른 상태 코드 반환
    return NextResponse.json(blog, {
      status: existingPost ? 200 : 201,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// PUT: 기존 블로그 게시물 수정
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { date, ...data } = await req.json();
    console.log("date", date);
    console.log("data", data);

    // 날짜 유효성 검사
    if (!date || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return NextResponse.json(
        { message: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    const blog = await Blog.findOneAndUpdate(
      { postDay: date },
      { ...data },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// DELETE: 특정 블로그 게시물 삭제
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const date = validateDate(new URL(req.url).searchParams.get("date"));

    const deletedBlog = await Blog.findOneAndDelete({
      postDay: date,
    });

    if (!deletedBlog)
      throw new Error("No blog post found for the specified date");
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
