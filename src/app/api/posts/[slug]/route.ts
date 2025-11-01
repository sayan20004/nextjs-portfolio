import dbConnect from "@/lib/db";
import { Post } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const post = await Post.findOneAndUpdate(
      { slug: params.slug },
      { $inc: { views: 1 } }, // Increment view count
      { new: true }
    ).populate("commentCount");

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}