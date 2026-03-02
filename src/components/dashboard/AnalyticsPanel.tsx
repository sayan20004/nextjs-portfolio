"use client";

import { useEffect, useState } from "react";

interface AnalyticsData {
    total: number;
    uniqueCities: number;
    avgDuration: number;
    topPages: [string, number][];
    recent: {
        _id: string;
        city: string;
        country: string;
        page: string;
        duration: number;
        createdAt: string;
    }[];
}

export default function AnalyticsPanel() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/analytics")
            .then((r) => r.json())
            .then((d) => { setData(d); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-sm text-muted-foreground">Loading analytics…</p>;
    if (!data) return <p className="text-sm text-muted-foreground">Failed to load analytics.</p>;

    return (
        <div className="flex flex-col gap-6">
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: "Total Visits", value: data.total },
                    { label: "Unique Cities", value: data.uniqueCities },
                    { label: "Avg. Time (s)", value: data.avgDuration },
                ].map(({ label, value }) => (
                    <div key={label} className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                        <p className="text-2xl font-bold text-foreground">{value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Top pages */}
            <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">Top Pages</h3>
                <ul className="flex flex-col gap-1">
                    {data.topPages.map(([page, count]) => (
                        <li key={page} className="flex items-center justify-between text-sm">
                            <span className="font-mono text-muted-foreground">{page}</span>
                            <span className="font-semibold text-foreground">{count} visits</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent visits */}
            <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">Recent Visits</h3>
                <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-border bg-secondary/40">
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground">City</th>
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Country</th>
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Page</th>
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Duration</th>
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recent.map((v) => (
                                <tr key={v._id} className="border-b border-border last:border-0 hover:bg-secondary/20">
                                    <td className="px-3 py-2 text-foreground">{v.city}</td>
                                    <td className="px-3 py-2 text-muted-foreground">{v.country}</td>
                                    <td className="px-3 py-2 font-mono text-muted-foreground">{v.page}</td>
                                    <td className="px-3 py-2 text-foreground">{v.duration}s</td>
                                    <td className="px-3 py-2 text-muted-foreground">
                                        {new Date(v.createdAt).toLocaleString("en-IN", {
                                            dateStyle: "short",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
