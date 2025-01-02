import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI가 환경변수에 설정되지 않았습니다.");
}

async function connectDB() {
  try {
    // 이미 연결된 경우 재연결하지 않음
    if (mongoose.connection.readyState === 1) {
      return;
    }

    const conn = await mongoose.connect(MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB 연결 오류:`, error);
    throw error; // 에러를 던져서 호출하는 쪽에서 처리하도록 함
  }
}

export default connectDB;
