import { getAllBlogPosts } from "@/lib/posts";
import BlogArchiveList from "@/components/blog/BlogArchiveList";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return <BlogArchiveList posts={posts} />;
}