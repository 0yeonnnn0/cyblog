import { BlogSchema, IBlog } from "@/model/Blog";
import mongoose, { model } from "mongoose";

const blog = model<IBlog>("Blog", BlogSchema);

export async function createBlogPost(data: Partial<IBlog>): Promise<IBlog> {
  try {
    const newBlog = new blog(data);
    const savedBlog = await newBlog.save();
    return savedBlog;
  } catch (error) {
    throw new Error("Failed to create blog post");
  }
}
