import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");

  if (!filename || !req.body) {
    return NextResponse.json(
      { error: "No filename or file body provided" },
      { status: 400 }
    );
  }

  const blob = await put(filename, req.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}