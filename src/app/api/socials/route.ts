import dbConnect from "@/lib/db";
import { Social } from "@/lib/models";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// GET all socials
export async function GET() {
  await dbConnect();
  try {
    const socials = await Social.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data: socials });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// POST a new social (Protected)
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
    const social = await Social.create(data);

    revalidatePath("/dashboard");
    revalidatePath("/");

    return NextResponse.json(
      { success: true, data: social },
      { status: 201 }
    );
  } catch (error) {
    console.error("Social creation error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
