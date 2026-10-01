import BlurFade from "@/components/magicui/blur-fade";
import { type PlainPost } from "@/lib/models";
import Link from "next/link";
import { ArrowUpRight, Eye, Heart, MessageSquare } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface Props {
  posts: Array<PlainPost & { category?: string }>;
}

export default function BlogArchiveList({ posts }: Props) {
  // Group posts by year
  const groupedByYear: Record<
    number,
    Array<PlainPost & { category?: string }>
  > = {};

  posts.forEach((post) => {
    const dateObj = new Date(post.createdAt);
    const year = isNaN(dateObj.getTime()) ? 2026 : dateObj.getFullYear();
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(post);
  });

  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const totalArticles = posts.length;
  const yearSpan =
    years.length > 0 ? Math.max(1, years[0] - years[years.length - 1] + 1) : 1;

  return (
    <main className="min-h-dvh flex flex-col gap-10 pt-4 pb-20 max-w-2xl mx-auto">
      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/80">
            Archive
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All writing
          </h1>
          <p className="text-sm text-muted-foreground font-normal mt-1">
            {totalArticles} {totalArticles === 1 ? "article" : "articles"}{" "}
            across {yearSpan} {yearSpan === 1 ? "year" : "years"}.
          </p>
        </div>
      </BlurFade>

      {/* Year groups */}
      <div className="flex flex-col gap-14 mt-4">
        {years.map((year, yearIndex) => {
          const yearPosts = groupedByYear[year];
          return (
            <BlurFade
              key={year}
              delay={BLUR_FADE_DELAY * 2 + yearIndex * 0.05}
            >
              <div className="flex flex-col gap-6">
                {/* Year title & article count */}
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {year}
                  </h2>
                  <span className="text-xs text-muted-foreground font-normal">
                    {yearPosts.length}{" "}
                    {yearPosts.length === 1 ? "article" : "articles"}
                  </span>
                </div>

                {/* Posts list */}
                <div className="flex flex-col divide-y divide-border/40 border-t border-border/40">
                  {yearPosts.map((post) => {
                    const categoryName =
                      post.category ||
                      (post.title.toLowerCase().includes("editorial")
                        ? "EDITORIAL"
                        : post.title.toLowerCase().includes("flag") ||
                          post.title.toLowerCase().includes("product")
                        ? "PRODUCT"
                        : post.title.toLowerCase().includes("grid") ||
                          post.title.toLowerCase().includes("design")
                        ? "DESIGN"
                        : post.title.toLowerCase().includes("commit") ||
                          post.title.toLowerCase().includes("culture")
                        ? "CULTURE"
                        : post.title.toLowerCase().includes("cache") ||
                          post.title.toLowerCase().includes("monorepo")
                        ? "OPERATIONS"
                        : "ARTICLE");

                    return (
                      <Link
                        key={post._id || post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex items-start justify-between gap-4 py-4 transition-colors hover:bg-muted/30 px-1 -mx-1 rounded-md"
                      >
                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <h3 className="font-semibold text-base text-foreground leading-snug group-hover:text-foreground/90">
                            {post.title}
                          </h3>
                          <span className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground">
                            {categoryName}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0 pt-0.5 tabular-nums">
                          <div className="hidden sm:flex items-center gap-2.5 text-xs opacity-75">
                            <span
                              className="flex items-center gap-1"
                              title="Views"
                            >
                              <Eye className="size-3.5" />
                              {post.views ?? 0}
                            </span>
                            <span
                              className="flex items-center gap-1"
                              title="Likes"
                            >
                              <Heart className="size-3.5" />
                              {post.likes ?? 0}
                            </span>
                            <span
                              className="flex items-center gap-1"
                              title="Comments"
                            >
                              <MessageSquare className="size-3.5" />
                              {post.commentCount ?? 0}
                            </span>
                          </div>
                          <span className="hidden sm:inline text-muted-foreground/40">
                            •
                          </span>
                          <span>{formatShortDate(post.createdAt)}</span>
                          <ArrowUpRight className="size-3.5 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </main>
  );
}
