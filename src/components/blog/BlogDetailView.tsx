"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageSquare,
  Maximize2,
  Minimize2,
  X,
  Search,
  Share2,
  Send,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { type PlainPost, IComment } from "@/lib/models";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "sonner";
import LikeButton from "./LikeButton";

interface TopicItem {
  id: string;
  title: string;
  timestamp?: string;
}

interface Props {
  post: PlainPost;
  contentComponent: React.ReactNode;
}

export default function BlogDetailView({ post, contentComponent }: Props) {
  const router = useRouter();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>("");

  // Comments state
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  // Extract topics/headings from post.topics or parse headings from post.content
  const topics: TopicItem[] = useMemo(() => {
    if (post.topics && post.topics.length > 0) {
      return post.topics;
    }
    // Auto-extract H2 and H3 headings from Markdown content if no custom topics set
    const matches: TopicItem[] = [];
    const headingRegex = /^#{2,3}\s+(.+)$/gm;
    let match;
    let index = 1;
    while ((match = headingRegex.exec(post.content)) !== null) {
      const title = match[1].replace(/[*_~`]/g, "").trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      matches.push({
        id: id || `heading-${index}`,
        title,
        timestamp: `0${index}:15`,
      });
      index++;
    }

    if (matches.length === 0) {
      return [
        { id: "overview", title: "Overview", timestamp: "00:30" },
        { id: "key-takeaways", title: "Key Takeaways", timestamp: "02:15" },
        { id: "implementation", title: "Implementation", timestamp: "05:40" },
        { id: "conclusion", title: "Conclusion & Next Steps", timestamp: "09:20" },
      ];
    }
    return matches;
  }, [post.topics, post.content]);

  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${post.slug}/comments`);
      const data = await res.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  }, [post.slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Handle comment submit
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsPostingComment(true);
    try {
      const res = await fetch(`/api/posts/${post.slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newComment.trim() }),
      });

      if (!res.ok) throw new Error("Failed to post comment");
      const data = await res.json();

      setComments((prev) => [data.data, ...prev]);
      setNewComment("");
      toast.success("Comment posted successfully!");
    } catch (error) {
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setIsPostingComment(false);
    }
  };

  // Scroll to topic heading
  const scrollToTopic = (topicId: string) => {
    setActiveTopic(topicId);
    const element = document.getElementById(topicId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Fallback: search by heading text content
      const headings = document.querySelectorAll("h1, h2, h3, h4");
      for (const heading of Array.from(headings)) {
        if (
          heading.textContent
            ?.toLowerCase()
            .includes(topicId.replace(/-/g, " "))
        ) {
          heading.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // Build JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.thumbnail ? [post.thumbnail] : [],
    datePublished: post.createdAt,
    author: {
      "@type": "Person",
      name: "Sayan Maity",
      url: "https://sayanmaity.me",
    },
  };

  return (
    <>
      {/* Inject JSON-LD SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {post.seoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.seoSchema }}
        />
      )}

      {/* MINIMIZED FLOATING BAR / WIDGET */}
      {isMinimized && (
        <div
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 bg-card/95 backdrop-blur-xl border border-border px-4 py-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-5 max-w-md cursor-pointer hover:border-primary/50 transition-all hover:scale-105 group"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shrink-0 shadow-md">
            <FileText className="size-5" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              MINIMIZED BLOG
            </span>
            <span className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {post.title}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-border/60">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
              }}
              className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors flex items-center gap-1 text-xs font-medium"
              title="Open Minimized Blog"
            >
              <Maximize2 className="size-3.5" />
              <span className="hidden sm:inline">Open</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push("/blog");
              }}
              className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
              title="Close"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* FULL WIDTH & FULL HEIGHT MACOS APPLICATION WINDOW CONTAINER */}
      <div
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm transition-all duration-300 flex flex-col ${
          isMinimized ? "hidden" : "flex"
        } ${isFullscreen ? "p-0" : "p-2 sm:p-4 md:p-6"}`}
      >
        <div className="w-full h-full rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
          {/* MACOS HEADER TITLEBAR */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40 backdrop-blur shrink-0">
            {/* macOS Window Controls (Traffic Lights) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/blog")}
                className="size-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                title="Close and return to blog list"
              >
                <X className="size-2 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="size-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                title="Minimize to floating widget"
              >
                <Minimize2 className="size-2 text-yellow-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="size-3.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                title="Toggle Fullscreen Edge-to-Edge"
              >
                <Maximize2 className="size-2 text-green-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Title & Metadata */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground truncate max-w-lg px-2">
              <span className="font-semibold text-foreground truncate">
                {post.title}
              </span>
              <span className="opacity-40">•</span>
              <span className="shrink-0">{formatDate(post.createdAt)}</span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-md hover:bg-muted transition-colors border border-border/50"
                title="Share Article"
              >
                <Share2 className="size-3.5" />
                <span className="hidden sm:inline font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* 3-COLUMN DESKTOP BODY LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 divide-y md:divide-y-0 md:divide-x divide-border min-h-0 overflow-hidden">
            {/* COLUMN 1: LEFT SIDEBAR (Topics & Table of Contents) */}
            <div className="md:col-span-3 p-4 flex flex-col gap-6 bg-muted/20 overflow-y-auto">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  DOCUMENT TOPICS
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  Highlighted Topics
                </h3>
              </div>

              {/* Topics / Headings List */}
              <nav className="flex flex-col gap-1">
                {topics.map((topic) => {
                  const isActive = activeTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => scrollToTopic(topic.id)}
                      className={`flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span className="truncate pr-2">{topic.title}</span>
                      {topic.timestamp && (
                        <span className="text-[10px] opacity-70 shrink-0 tabular-nums">
                          {topic.timestamp}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Status Box */}
              <div className="mt-auto pt-4 border-t border-border flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-3.5 text-green-500" />
                  <span>Verified Article</span>
                </div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">
                  Written by Sayan Maity • Full Stack Developer & UI/UX Lead.
                </div>
              </div>
            </div>

            {/* COLUMN 2: MIDDLE CONTENT AREA */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col gap-8 bg-card overflow-y-auto">
              {/* Article Header */}
              <div className="flex flex-col gap-4 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary">
                    {post.category || "EDITORIAL"}
                  </span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {formatDate(post.createdAt)}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
                  {post.title}
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {post.description}
                </p>

                {/* Author Info & Stats */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9 border ring-2 ring-border">
                      <AvatarImage src="/profile.jpg" alt="Sayan Maity" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-foreground">
                        Sayan Maity
                      </span>
                      <span className="text-muted-foreground">
                        Software Engineer
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="size-3.5" /> {post.views}
                    </span>
                    <LikeButton slug={post.slug} initialLikes={post.likes} />
                  </div>
                </div>
              </div>

              {/* Main MDX Content */}
              <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed">
                {contentComponent}
              </div>

              {/* Bottom Comments Form & Action Bar */}
              <div className="mt-8 pt-8 border-t border-border flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <MessageSquare className="size-4" />
                    Discussion & Comments ({comments.length})
                  </h3>
                </div>

                {/* Comment Input */}
                <form
                  onSubmit={handleCommentSubmit}
                  className="flex flex-col gap-3 bg-muted/30 p-4 rounded-xl border border-border"
                >
                  <Textarea
                    placeholder="Write a comment or share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="bg-background resize-none text-sm"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isPostingComment || !newComment.trim()}
                      size="sm"
                      className="gap-2"
                    >
                      <Send className="size-3.5" />
                      {isPostingComment ? "Posting..." : "Post Comment"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* COLUMN 3: RIGHT SIDEBAR (Comments & Key Moments) */}
            <div className="md:col-span-3 p-4 flex flex-col gap-6 bg-muted/10 overflow-y-auto">
              {/* Key Moments / Highlights */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  KEY MOMENTS
                </span>
                <div className="flex flex-col gap-2">
                  {topics.slice(0, 4).map((topic, i) => (
                    <button
                      key={topic.id}
                      onClick={() => scrollToTopic(topic.id)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/60 hover:border-border text-left group transition-all"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] font-semibold text-primary px-1.5 py-0.5 rounded bg-primary/10 tabular-nums">
                          {topic.timestamp || `0${i + 1}:00`}
                        </span>
                        <span className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {topic.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Engagement Stats Gauge */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  ENGAGEMENT STATS
                </span>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Views Count</span>
                    <span className="font-semibold text-foreground">
                      {post.views}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(15, post.views % 100))}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-muted-foreground mt-1">
                    <span>Reader Appreciation</span>
                    <span className="font-semibold text-foreground">
                      {post.likes} likes
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(20, (post.likes * 10) % 100))}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Real-time Comments Feed */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  READER COMMENTS ({comments.length})
                </span>

                <div className="flex flex-col gap-3">
                  {isLoadingComments ? (
                    <p className="text-xs text-muted-foreground">
                      Loading comments...
                    </p>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={String(comment._id)}
                        className="flex flex-col gap-1.5 p-3 rounded-xl bg-card border border-border/60 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">
                            Anonymous Reader
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {formatDate(
                              new Date(comment.createdAt).toISOString()
                            )}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {comment.body}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
