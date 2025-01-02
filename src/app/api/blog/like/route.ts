import { NextResponse } from "next/server";
import Blog from "@/model/Blog"; // 모델 경로에 맞게 수정하세요
import connectDB from "@/lib/mongoose/config"; // DB 연결 함수

export async function POST(req: Request) {
  await connectDB();
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
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
