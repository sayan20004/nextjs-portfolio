"use client";

import { useEffect, useState } from "react";

interface VisitorData {
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
  topCountries: [string, number][];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-sm text-muted-foreground">Loading analytics…</p>;
  if (!data)
    return <p className="text-sm text-muted-foreground">Failed to load analytics.</p>;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="title text-3xl">Site Analytics</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Visitor statistics and page performance
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Total Visits", value: data.total },
          { label: "Unique Cities", value: data.uniqueCities },
          { label: "Avg. Duration", value: `${data.avgDuration}s` },
          {
            label: "Top Countries",
            value: data.topCountries?.length || 0,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-secondary/30 p-4"
          >
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-2">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Top pages */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Most Visited Pages
          </h3>
          <div className="rounded-lg border border-border overflow-hidden">
            <ul className="flex flex-col divide-y divide-border">
              {data.topPages.map(([page, count]) => (
                <li
                  key={page}
                  className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors"
                >
                  <span className="font-mono text-sm text-muted-foreground">
                    {page}
                  </span>
                  <span className="font-semibold text-foreground">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top countries */}
        {data.topCountries && data.topCountries.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Top Countries
            </h3>
            <div className="rounded-lg border border-border overflow-hidden">
              <ul className="flex flex-col divide-y divide-border">
                {data.topCountries.map(([country, count]) => (
                  <li
                    key={country}
                    className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground">
                      {country || "Unknown"}
                    </span>
                    <span className="font-semibold text-foreground">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Recent visits */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Recent Visitor Activity
        </h3>
        <div className="rounded-lg border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Location
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Country
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Page Visited
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Duration
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {data.recent.map((v) => (
                <tr
                  key={v._id}
                  className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-4 py-3 text-foreground font-medium">
                    {v.city || "Unknown"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {v.country || "Unknown"}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground text-xs">
                    {v.page}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {v.duration > 0 ? `${v.duration}s` : "--"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
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
