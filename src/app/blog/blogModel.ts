import { IBlog } from "@/model/Blog";

export async function getBlogPost(date: string) {
  try {
    const response = await fetch(`/api/blog?post=${date}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createBlogPost(data: Partial<IBlog>): Promise<IBlog> {
  try {
    const postBlogData = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!postBlogData.ok) {
      throw new Error("Failed to create blog post");
    }

    const newBlog = await postBlogData.json();
    return newBlog;
  } catch (error) {
    throw new Error("Failed to create blog post");
  }
}

export async function deleteBlogPost(date: string) {
  try {
    const response = await fetch(`/api/blog?post=${date}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete blog post");
    }

    console.log("Blog post deleted successfully");
  } catch (error) {
    console.error(error);
  }
}

export async function likeBlogPost(id: string) {
  try {
    const response = await fetch(`/api/blog/like`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
