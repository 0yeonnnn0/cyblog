import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  content: string; // 게시물 내용
  author: string; // 작성자
  views: number; // 조회수
  createdAt: Date; // 작성일(UTC)
  updatedAt: Date; // 수정일(UTC)
  likey: number; // 좋아요 수
  postDay: string; // 작성일(UTC)
}

const BlogSchema = new Schema<IBlog>({
  content: { type: String, required: true },
  author: { type: String, required: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likey: { type: Number, default: 0 },
  postDay: { type: String, required: true },
});

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
