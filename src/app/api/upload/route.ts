import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { join } from "path";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const uploadPath = join(process.cwd(), "public", "uploads", filename);

    // Ensure uploads directory exists
    await mkdir(join(process.cwd(), "public", "uploads"), { recursive: true });

    // Write file to public/uploads
    const bytes = await file.arrayBuffer();
    await writeFile(uploadPath, Buffer.from(bytes));

    // Return public URL
    const url = `/uploads/${filename}`;
    return NextResponse.json({
      url: url,
      data: { url },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}