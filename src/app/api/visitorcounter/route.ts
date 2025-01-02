import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose/config"; // DB 연결 함수
import Visitor from "@/model/Visitor"; // 방문자 모델

// GET 요청: 방문자 수 조회
export async function GET() {
  try {
    // DB 연결
    await connectDB();

    // 방문자 수 조회 (컬렉션에서 _id가 'visitorCount'인 문서 검색)
    const visitorData = await Visitor.findOne({ _id: "visitorCount" });

    // 데이터가 없으면 기본값 0 반환
    const visitorCount = visitorData ? visitorData.count : 0;

    // 성공 응답 반환
    return NextResponse.json({ count: visitorCount }, { status: 200 });
  } catch (error) {
    console.error("방문자 수 조회 중 오류 발생:", error);
    return NextResponse.json(
      { message: "방문자 수를 조회하는 데 실패했습니다." },
      { status: 500 }
    );
  }
}

// POST 요청: 방문자 수 증가
export async function POST() {
  try {
    // DB 연결
    await connectDB();

    // 방문자 수 업데이트 (없으면 생성)
    const updatedVisitorData = await Visitor.findOneAndUpdate(
      { _id: "visitorCount" },
      { $inc: { count: 1 } },
      { upsert: true, new: true } // 없으면 새로 생성하고 업데이트된 값 반환
    );

    // 성공 응답 반환
    return NextResponse.json(
      { message: "Visitor count updated", count: updatedVisitorData.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("방문자 수 업데이트 중 오류 발생:", error);
    return NextResponse.json(
      { message: "방문자 수를 업데이트하는 데 실패했습니다." },
      { status: 500 }
    );
  }
}
