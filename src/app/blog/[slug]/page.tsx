import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxComponents } from "@/components/mdx/MdxComponents";
import dbConnect from "@/lib/db";
import { Post, type PlainPost } from "@/lib/models";
import BlogDetailView from "@/components/blog/BlogDetailView";
import BlogArchiveList from "@/components/blog/BlogArchiveList";
import { getAllBlogPosts } from "@/lib/posts";

interface PageProps {
  params: { slug: string };
}

const SAMPLE_POSTS: Record<string, PlainPost> = {
  "ownership-models-as-a-mental-framework-for-editorial-systems": {
    _id: "1",
    title: "Ownership models as a mental framework for editorial systems",
    slug: "ownership-models-as-a-mental-framework-for-editorial-systems",
    description:
      "Exploring mental frameworks for structuring clear ownership, decision-making, and execution in modern editorial systems.",
    thumbnail: "",
    category: "EDITORIAL",
    content: `
## Overview

The team agreed to cut the Teams price to hit renewals without losing margin. Dana owns the Acme quote; existing customers stay on their plan.

### Key Decisions

* **Teams plan moves to $14 per seat**, billed yearly.
* **Customers who signed before March** keep their current price.
* **Pricing page updates** after the Acme quote goes out.

## Core Action Items

1. **Send Acme the revised quote** (Fri)
2. **Rerun churn model at $14** (Tonight)
3. **Update pricing page copy** (Next week)

### Implementation Strategy

When building scalable publishing architectures, clear ownership models prevent bottlenecking across cross-functional teams.

\`\`\`typescript
interface OwnershipModel {
  domain: string;
  leadOwner: string;
  reviewCadence: "daily" | "weekly" | "sprint";
  allowOverrides: boolean;
}
\`\`\`

## Summary & Next Steps

Establishing explicit boundaries allows engineering and product teams to move fast with confidence.
    `,
    views: 248,
    likes: 42,
    createdAt: "2026-08-01T00:00:00.000Z",
    topics: [
      { id: "overview", title: "Overview & Context", timestamp: "04:12" },
      { id: "key-decisions", title: "Key Decisions", timestamp: "14:02" },
      { id: "core-action-items", title: "Action Items & Timeline", timestamp: "14:19" },
      { id: "implementation-strategy", title: "Implementation Strategy", timestamp: "22:40" },
    ],
  },
};

async function getPost(slug: string): Promise<PlainPost | null> {
  try {
    await dbConnect();

    const post = await Post.findOneAndUpdate(
      { slug: slug },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("commentCount")
      .lean();

    if (post) {
      return JSON.parse(JSON.stringify(post));
    }
  } catch (error) {
    console.error("Failed to fetch post from DB:", error);
  }

  // Fallback sample post lookup if DB post not present
  if (SAMPLE_POSTS[slug]) {
    return SAMPLE_POSTS[slug];
  }

  // Generic fallback post so any clicked link in sample list opens smoothly
  return {
    _id: slug,
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    slug: slug,
    description: "Detailed analysis and implementation notes on " + slug.replace(/-/g, " ") + ".",
    thumbnail: "",
    category: "ARTICLE",
    content: `
## Overview

This article outlines core concepts, architectural decisions, and step-by-step implementation details for **${slug.replace(/-/g, " ")}**.

### Key Highlights

* **Scalable Architecture**: Designed for minimal latency and clean code maintainability.
* **Modern Stack**: Built with Next.js, React, TypeScript, and TailwindCSS.
* **SEO & Analytics**: Includes automated JSON-LD schema markup and real-time visitor tracking.

## Technical Implementation

\`\`\`typescript
// Example snippet for ${slug}
export async function executeWorkflow(payload: Record<string, any>) {
  console.log("Executing workflow:", payload);
  return { status: "success", timestamp: new Date().toISOString() };
}
\`\`\`

## Conclusion

Thank you for reading! Feel free to leave a comment below or connect via GitHub/LinkedIn.
    `,
    views: 184,
    likes: 29,
    createdAt: new Date().toISOString(),
    topics: [
      { id: "overview", title: "Overview & Highlights", timestamp: "01:20" },
      { id: "key-highlights", title: "Key Decisions", timestamp: "05:10" },
      { id: "technical-implementation", title: "Technical Implementation", timestamp: "11:45" },
      { id: "conclusion", title: "Conclusion & Summary", timestamp: "18:30" },
    ],
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);
  const allPosts = await getAllBlogPosts();

  if (!post) {
    notFound();
  }

  const contentComponent = (
    <MDXRemote source={post.content} components={MdxComponents} />
  );

  return (
    <>
      {/* Background: Complete Blog Archive List (All writing, 2026, 2025, 2024...) */}
      <BlogArchiveList posts={allPosts} />

      {/* Foreground overlay: Full-width/height macOS Blog Reader or Minimized Floating Bar */}
      <BlogDetailView post={post} contentComponent={contentComponent} />
    </>
  );
}
