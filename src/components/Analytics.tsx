"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Analytics() {
    const pathname = usePathname();
    const startTime = useRef<number>(Date.now());
    const currentPage = useRef<string>(pathname);

    // Flush a page view to the API
    const flush = (page: string, start: number) => {
        const duration = Math.round((Date.now() - start) / 1000);
        // Use sendBeacon so it fires even when the tab is closing
        const payload = JSON.stringify({ page, duration });
        if (navigator.sendBeacon) {
            navigator.sendBeacon(
                "/api/analytics",
                new Blob([payload], { type: "application/json" })
            );
        } else {
            fetch("/api/analytics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload,
                keepalive: true,
            }).catch(() => { });
        }
    };

    // Track page changes (SPA navigation)
    useEffect(() => {
        const prevPage = currentPage.current;
        const prevStart = startTime.current;

        if (prevPage !== pathname) {
            // Flush the previous page before switching
            flush(prevPage, prevStart);
            currentPage.current = pathname;
            startTime.current = Date.now();
        }
    }, [pathname]);

    // Track tab close / page unload
    useEffect(() => {
        const handleUnload = () => {
            flush(currentPage.current, startTime.current);
        };
        window.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") handleUnload();
        });
        window.addEventListener("pagehide", handleUnload);
        return () => {
            window.removeEventListener("pagehide", handleUnload);
        };
    }, []);

    return null; // invisible component
}
