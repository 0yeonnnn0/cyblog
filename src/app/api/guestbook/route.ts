import { NextResponse } from "next/server";
import Guestbook from "@/model/Guestbook";
import connectDB from "@/lib/mongoose/config"; // DB 연결 함수

// GET 요청 처리
export async function GET() {
  try {
    // DB 연결
    await connectDB();

    // 모든 방명록 데이터 조회 (날짜 내림차순 정렬)
    const guestbooks = await Guestbook.find({})
      .sort({ date: -1 })
      .select("-PW"); // 비밀번호 필드 제외

    // 성공 응답 반환
    return NextResponse.json(guestbooks, { status: 200 });
  } catch (error) {
    // 에러 처리
    console.error("방명록 조회 중 오류 발생:", error);
    return NextResponse.json(
      { message: "방명록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
