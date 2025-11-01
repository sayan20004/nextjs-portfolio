import dbConnect from "@/lib/db";
import { Post } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const post = await Post.findOneAndUpdate(
      { slug: params.slug },
      { $inc: { likes: 1 } }, // Increment like count
      { new: true }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: { likes: post.likes } });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}