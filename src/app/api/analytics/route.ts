import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { PageView } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// ── POST /api/analytics — called by client tracker ───────────────────────────
export async function POST(req: NextRequest) {
    try {
        const { page, duration } = await req.json();

        // Get visitor IP
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

        // Resolve city from IP (free service, no API key needed)
        let city = "Local";
        let country = "Local";
        if (ip !== "127.0.0.1" && ip !== "::1") {
            try {
                const geo = await fetch(`http://ip-api.com/json/${ip}?fields=city,country`);
                const data = await geo.json();
                city = data.city || "Unknown";
                country = data.country || "Unknown";
            } catch {
                // silently ignore — geo lookup failed
            }
        }

        await dbConnect();
        await PageView.create({ city, country, page, duration });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Analytics POST error:", err);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

// ── GET /api/analytics — used by dashboard (auth required) ───────────────────
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const views = await PageView.find({})
            .sort({ createdAt: -1 })
            .limit(500)
            .lean();

        // Aggregate stats
        const total = views.length;
        const cities = Array.from(new Set(views.map((v: any) => v.city))).filter(
            (c) => c !== "Local" && c !== "Unknown"
        );

        const pageCounts: Record<string, number> = {};
        const countryCounts: Record<string, number> = {};
        
        for (const v of views as any[]) {
            pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
            countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
        }
        
        const topPages = Object.entries(pageCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const topCountries = Object.entries(countryCounts)
            .filter(([country]) => country !== "Local" && country !== "Unknown")
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const avgDuration =
            total > 0
                ? Math.round(
                    (views as any[]).reduce((sum, v) => sum + (v.duration || 0), 0) /
                    total
                )
                : 0;

        return NextResponse.json({
            total,
            uniqueCities: cities.length,
            topPages,
            topCountries,
            avgDuration,
            recent: JSON.parse(JSON.stringify(views.slice(0, 20))),
        });
    } catch (err) {
        console.error("Analytics GET error:", err);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
