import dbConnect from "@/lib/db";
import { HomepageIntro } from "@/lib/models";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// GET homepage intro
export async function GET() {
  await dbConnect();
  try {
    let intro = await HomepageIntro.findOne({});
    
    if (!intro) {
      // Return default if none exists yet
      return NextResponse.json({
        success: true,
        data: {
          name: "Your Name",
          title: "Your Title",
          bio: ["Bio line 1"],
          photo: "/profile.jpg",
        },
      });
    }
    
    return NextResponse.json({ success: true, data: intro });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// UPDATE homepage intro (Protected)
export async function PUT(req: NextRequest) {
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
    
    let intro = await HomepageIntro.findOne({});
    
    if (!intro) {
      intro = await HomepageIntro.create(data);
    } else {
      intro = await HomepageIntro.findByIdAndUpdate(intro._id, data, {
        new: true,
      });
    }

    revalidatePath("/");
    revalidatePath("/dashboard");

    return NextResponse.json({ success: true, data: intro });
  } catch (error) {
    console.error("Homepage intro update error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
