import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IBlog } from "@/model/Blog";

import {
  getBlogPost,
  createBlogPost,
  deleteBlogPost,
  likeBlogPost,
} from "@/features/blog/models/blogModel";
import { CurrentPost } from "@/store/blog/currentPostStore";

export const useBlogPost = (selectDate: string) => {
  const queryClient = useQueryClient();

  const convertToCurrentPost = (blog: IBlog | null): CurrentPost | null => {
    if (!blog) return null;

    const plainBlog = {
      content: blog.content || "",
      author: blog.author || "",
      likey: blog.likey || 0,
      _id: String(blog._id),
      createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : null,
      updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : null,
      postDay: blog.postDay || "",
    };

    return plainBlog;
  };

  const { data: currentPost } = useQuery({
    queryKey: ["post", selectDate],
    queryFn: async () => {
      const data = await getBlogPost(selectDate);
      return convertToCurrentPost(data);
    },
    enabled: !!selectDate,
  });

  // rawPost도 직렬화된 데이터를 반환
  const rawPost = currentPost ? { ...currentPost } : null;

  const mutations = {
    save: useMutation({
      mutationFn: (content: string) => createBlogPost({ content }, selectDate),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["post", selectDate] });
      },
    }),
    delete: useMutation({
      mutationFn: () => deleteBlogPost(selectDate),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["post", selectDate] });
      },
    }),
    like: useMutation<void, Error, string>({
      mutationFn: (postId: string) => likeBlogPost(postId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["post", selectDate] });
      },
    }),
  };

  return {
    currentPost,
    mutations,
    rawPost,
  };
};
