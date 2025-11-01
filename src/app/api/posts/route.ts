import dbConnect from "@/lib/db";
import { Post } from "@/lib/models";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// GET all posts
export async function GET() {
  await dbConnect();
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("commentCount");
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// POST a new post (Protected)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  await dbConnect();
  try {
    const data = await req.json();
    const post = await Post.create(data); // Create new post
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) { // <-- The underscore was removed from this line
    console.error("Post creation error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}