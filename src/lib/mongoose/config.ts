import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI가 환경변수에 설정되지 않았습니다.");
}

// 글로벌 객체에 캐싱된 연결 저장
interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 개발 환경에서 핫 리로딩을 위한 전역 캐시 유지
declare global {
  // eslint-disable-next-line no-var
  var mongoose: Cached;
}

const cached: Cached = global.mongoose || { conn: null, promise: null };

async function connectDB(): Promise<typeof mongoose> {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI as string);
    }

    cached.conn = await cached.promise;

    // 연결 에러 이벤트 핸들링
    cached.conn.connection.on("error", (err) => {
      console.error("MongoDB 연결 에러:", err);
      cached.conn = null;
      cached.promise = null;
    });

    console.log(`MongoDB Connected: ${cached.conn.connection.host}`);
    return cached.conn;
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);
    cached.conn = null;
    cached.promise = null;
    throw error;
  }
}

export default connectDB;
