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
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      {
        message: "블로그 게시물 생성/수정 실패",
        error: error.message,
      },
      { status: 400 }
    );
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
  } catch (error: any) {
    return NextResponse.json(
      { message: "블로그 게시물 수정 실패", error: error.message },
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
