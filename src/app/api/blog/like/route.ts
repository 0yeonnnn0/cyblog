import { NextResponse } from "next/server";
import Blog from "@/model/Blog"; // 모델 경로에 맞게 수정하세요
import connectDB from "@/config/mongoose"; // DB 연결 함수

connectDB();

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    blog.likey += 1;
    await blog.save();

    return NextResponse.json({ likes: blog.likey });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to like blog post" },
      { status: 500 }
    );
  }
}
