import dbConnect from "@/lib/db";
import { Experience } from "@/lib/models";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// GET all experiences
export async function GET() {
  await dbConnect();
  try {
    const experiences = await Experience.find({}).sort({ start: -1 });
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// POST a new experience (Protected)
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
    const experience = await Experience.create(data);

    revalidatePath("/dashboard");
    revalidatePath("/");

    return NextResponse.json(
      { success: true, data: experience },
      { status: 201 }
    );
  } catch (error) {
    console.error("Experience creation error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
