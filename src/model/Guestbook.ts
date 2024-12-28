import mongoose, { Schema, Document } from "mongoose";

export interface IGuestbook extends Document {
  isUser: boolean; // 사용자 여부
  guestName: string; // 방명록 작성자 이름
  contents: string; // 방명록 내용
  PW: string; // 비밀번호
  date: Date; // 작성 날짜
  likes: number; // 좋아요 수
}

const GuestbookSchema = new Schema<IGuestbook>({
  isUser: { type: Boolean, required: true, default: false },
  guestName: { type: String, required: true },
  contents: { type: String, required: true },
  PW: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  likes: { type: Number, default: 0 },
});

export default mongoose.models.Guestbook ||
  mongoose.model<IGuestbook>("Guestbook", GuestbookSchema);
