import { onCLS, onINP, onLCP, onFCP, onTTFB } from "web-vitals/attribution";

type MetricPayload = {
    id: string;
    name: string;
    value: number;
    delta: number;
    rating: "good" | "needs-improvement" | "poor";
    pathname: string;
    build: string;
    navigationType?: string;
    attribution?: Record<string, unknown>;
    ts: number;
};

function sendMetric(payload: MetricPayload) {
    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
        navigator.sendBeacon(
            "/api/vitals",
            new Blob([body], { type: "application/json" }),
        );
        return;
    }

    fetch("/api/vitals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        keepalive: true,
    }).catch(() => {});
}

export default defineNuxtPlugin(() => {
    const build = import.meta.env.MODE === "production" ? "after" : "before";

    const report = (metric: any) => {
        sendMetric({
            id: metric.id,
            name: metric.name,
            value: metric.value,
            delta: metric.delta,
            rating: metric.rating,
            pathname: window.location.pathname,
            build,
            navigationType: metric.navigationType,
            attribution: metric.attribution,
            ts: Date.now(),
        });
    };

    onCLS(report, { reportAllChanges: true });
    onINP(report, { reportAllChanges: true });
    onLCP(report, { reportAllChanges: true });
    onFCP(report);
    onTTFB(report);
});
