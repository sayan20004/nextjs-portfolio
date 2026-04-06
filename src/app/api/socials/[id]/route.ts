import dbConnect from "@/lib/db";
import { Social } from "@/lib/models";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// GET a single social by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const social = await Social.findById(params.id);
    if (!social) {
      return NextResponse.json(
        { success: false, error: "Social not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: social });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// PUT (update) a social by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const social = await Social.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    if (!social) {
      return NextResponse.json(
        { success: false, error: "Social not found" },
        { status: 404 }
      );
    }

    revalidatePath("/dashboard");
    revalidatePath("/");

    return NextResponse.json({ success: true, data: social });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE a social by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  await dbConnect();
  try {
    const social = await Social.findByIdAndDelete(params.id);
    if (!social) {
      return NextResponse.json(
        { success: false, error: "Social not found" },
        { status: 404 }
      );
    }

    revalidatePath("/dashboard");
    revalidatePath("/");

    return NextResponse.json({ success: true, message: "Social deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
