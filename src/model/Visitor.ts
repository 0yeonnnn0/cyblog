import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  _id: { type: String, default: "visitorCount" }, // 고정된 ID
  count: { type: Number, default: 0 }, // 방문자 수
});

export default mongoose.models.Visitor ||
  mongoose.model("Visitor", VisitorSchema, "counters");
