import dbConnect from "@/lib/db";
import { Post, Comment } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

// GET comments for a post
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const post = await Post.findOne({ slug: params.slug });
    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    const comments = await Comment.find({ postId: post._id }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// POST a new comment
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const post = await Post.findOne({ slug: params.slug });
    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    const { body } = await req.json();
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Comment body is required" },
        { status: 400 }
      );
    }

    const comment = await Comment.create({ postId: post._id, body });
    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}