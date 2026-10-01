import dbConnect from "@/lib/db";
import { Post, type PlainPost } from "@/lib/models";

export const SAMPLE_POSTS: Array<PlainPost & { category?: string }> = [
  {
    _id: "1",
    title: "Ownership models as a mental framework for editorial systems",
    slug: "ownership-models-as-a-mental-framework-for-editorial-systems",
    description: "Exploring mental frameworks for structuring ownership in editorial and publishing systems.",
    thumbnail: "",
    content: "",
    views: 120,
    likes: 15,
    createdAt: "2026-08-01T00:00:00.000Z",
    category: "EDITORIAL",
  },
  {
    _id: "2",
    title: "The case against feature flags as a publishing strategy",
    slug: "the-case-against-feature-flags-as-a-publishing-strategy",
    description: "Why feature flags can create tech debt when overused in publishing systems.",
    thumbnail: "",
    content: "",
    views: 95,
    likes: 8,
    createdAt: "2026-07-21T00:00:00.000Z",
    category: "PRODUCT",
  },
  {
    _id: "3",
    title: "Twelve-factor blogs in 2026: what held up and what did not",
    slug: "twelve-factor-blogs-in-2026",
    description: "Revisiting the twelve-factor app methodology applied to modern personal blogs.",
    thumbnail: "",
    content: "",
    views: 210,
    likes: 24,
    createdAt: "2026-07-08T00:00:00.000Z",
    category: "OPERATIONS",
  },
  {
    _id: "4",
    title: "Grid systems for developers who distrust designers",
    slug: "grid-systems-for-developers-who-distrust-designers",
    description: "Practical layout math and grid principles tailored for engineers.",
    thumbnail: "",
    content: "",
    views: 180,
    likes: 19,
    createdAt: "2026-06-22T00:00:00.000Z",
    category: "DESIGN",
  },
  {
    _id: "5",
    title: "Writing commit messages as future editorial documentation",
    slug: "writing-commit-messages-as-future-editorial-documentation",
    description: "Treating git commit logs as living documentation for engineering teams.",
    thumbnail: "",
    content: "",
    views: 140,
    likes: 12,
    createdAt: "2026-06-05T00:00:00.000Z",
    category: "CULTURE",
  },
  {
    _id: "6",
    title: "HTTP caching for article pages you can actually measure",
    slug: "http-caching-for-article-pages-you-can-actually-measure",
    description: "Cache strategies, CDN edge rules, and validation metrics for content sites.",
    thumbnail: "",
    content: "",
    views: 310,
    likes: 32,
    createdAt: "2025-12-12T00:00:00.000Z",
    category: "EDITORIAL",
  },
  {
    _id: "7",
    title: "The monorepo migration that took six months and why it was worth it",
    slug: "the-monorepo-migration-that-took-six-months",
    description: "Lessons learned migrating multiple repositories into a unified codebase.",
    thumbnail: "",
    content: "",
    views: 450,
    likes: 58,
    createdAt: "2025-11-03T00:00:00.000Z",
    category: "OPERATIONS",
  },
  {
    _id: "8",
    title: "Pricing pages that convert without manipulation",
    slug: "pricing-pages-that-convert-without-manipulation",
    description: "Designing transparent pricing tables that build trust with customers.",
    thumbnail: "",
    content: "",
    views: 290,
    likes: 27,
    createdAt: "2025-09-17T00:00:00.000Z",
    category: "DESIGN",
  },
  {
    _id: "9",
    title: "Building responsive layouts with modern CSS container queries",
    slug: "building-responsive-layouts-with-css-container-queries",
    description: "Moving beyond viewport media queries to component-driven design.",
    thumbnail: "",
    content: "",
    views: 230,
    likes: 21,
    createdAt: "2025-06-14T00:00:00.000Z",
    category: "DEVELOPMENT",
  },
  {
    _id: "10",
    title: "State management patterns in full-stack Next.js applications",
    slug: "state-management-patterns-in-fullstack-nextjs",
    description: "Comparing server components, URL search params, and React context.",
    thumbnail: "",
    content: "",
    views: 520,
    likes: 64,
    createdAt: "2025-03-28T00:00:00.000Z",
    category: "ARCHITECTURE",
  },
  {
    _id: "11",
    title: "Getting started with Swift and SwiftUI for web developers",
    slug: "getting-started-with-swift-and-swiftui",
    description: "A practical guide for React/JS developers transitioning into native iOS.",
    thumbnail: "",
    content: "",
    views: 610,
    likes: 72,
    createdAt: "2024-10-10T00:00:00.000Z",
    category: "MOBILE",
  },
  {
    _id: "12",
    title: "Building an AI-powered quiz application with Gemini API",
    slug: "building-an-ai-powered-quiz-application-with-gemini-api",
    description: "How to process PDF documents and auto-generate interactive MCQs using LLMs.",
    thumbnail: "",
    content: "",
    views: 780,
    likes: 91,
    createdAt: "2024-08-15T00:00:00.000Z",
    category: "AI",
  },
  {
    _id: "13",
    title: "My journey into web development and open source",
    slug: "my-journey-into-web-development-and-open-source",
    description: "Reflections on learning full-stack development, contributing to projects, and community.",
    thumbnail: "",
    content: "",
    views: 400,
    likes: 45,
    createdAt: "2024-02-04T00:00:00.000Z",
    category: "PERSONAL",
  },
];

export async function getAllBlogPosts(): Promise<Array<PlainPost & { category?: string }>> {
  try {
    await dbConnect();
    const dbPosts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("commentCount")
      .lean();

    const parsed = JSON.parse(JSON.stringify(dbPosts));
    if (parsed && parsed.length > 0) {
      return parsed;
    }
  } catch (error) {
    console.error("Failed to fetch posts from DB:", error);
  }
  return SAMPLE_POSTS;
}
