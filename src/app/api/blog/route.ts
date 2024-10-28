// src/app/blog/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/config/mongoose"; // DB 연결 함수
import Blog from "@/model/Blog"; // IBlog 모델

// MongoDB와 연결합니다.
connectDB();

// GET: 모든 블로그 게시물 조회
export async function GET() {
  try {
    const blogs = await Blog.find();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST: 새로운 블로그 게시물 생성
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newBlog = new Blog(body);
    await newBlog.save();
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create blog post" },
      { status: 400 }
    );
  }
}

// DELETE: 특정 블로그 게시물 삭제
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Blog post ID is required" },
        { status: 400 }
      );
    }
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete blog post" },
      { status: 400 }
    );
  }
}
