import mongoose, { Document, Schema, models, model } from "mongoose";

// Interface for Comment
export interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  body: string;
  createdAt: Date;
}

// Interface for Post
export interface IPost extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail: string; // URL to an image
  content: string; // MDX content
  views: number;
  likes: number;
  createdAt: Date;
  comments: IComment[];
}

// Schema for Comment
const CommentSchema = new Schema<IComment>({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Schema for Post
const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Virtual for comments count (optimization)
PostSchema.virtual("commentCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
  count: true,
});

PostSchema.set("toObject", { virtuals: true });
PostSchema.set("toJSON", { virtuals: true });

export const Comment =
  models.Comment || model<IComment>("Comment", CommentSchema);
export const Post = models.Post || model<IPost>("Post", PostSchema);
export type PlainPost = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  content: string;
  views: number;
  likes: number;
  createdAt: string;
  commentCount?: number;
};

// ── Visitor Analytics ─────────────────────────────────────────────────────────

export interface IPageView extends Document {
  city: string;
  country: string;
  page: string;
  duration: number; // seconds
  createdAt: Date;
}

const PageViewSchema = new Schema<IPageView>({
  city: { type: String, default: "Unknown" },
  country: { type: String, default: "Unknown" },
  page: { type: String, required: true },
  duration: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const PageView =
  models.PageView || model<IPageView>("PageView", PageViewSchema);