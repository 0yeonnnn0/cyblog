// src/models/Blog.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  content: string; // 게시물 내용
  author: string; // 작성자
  views: number; // 조회수
  createdAt: Date; // 작성일
  updatedAt: Date; // 수정일
  likey: number; // 좋아요 수
}

export const BlogSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: String, required: true },
    views: { type: Number, default: 0 },
    likey: { type: Number, default: 0 },
  },
  { timestamps: true } // 자동으로 createdAt, updatedAt을 관리합니다.
);

export default mongoose.model<IBlog>("Blog", BlogSchema);
