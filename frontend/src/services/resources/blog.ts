import api from "../../utils/requests";

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  coverUrl?: string;
  tags?: string[];
  status?: string;
  publishedAt?: string;
};

export type BlogPost = BlogPostSummary & {
  contentMarkdown: string;
  author?: string;
};

export const getPosts = () => {
  return api.get<BlogPostSummary[]>(`/api/blog/posts`);
};

export const getPost = (slug: string) => {
  return api.get<BlogPost>(`/api/blog/posts/${slug}`);
};

export const upsertPost = (post: BlogPost) => {
  return api.post(`/api/blog/admin/posts`, post);
};

export const deletePost = (slug: string) => {
  return api.delete(`/api/blog/admin/posts/${slug}`);
};

export const uploadCover = (slug: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('slug', slug);
  return api.post(`/api/blog/admin/upload-cover`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const uploadImage = (slug: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('slug', slug);
  return api.post(`/api/blog/admin/upload-image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};