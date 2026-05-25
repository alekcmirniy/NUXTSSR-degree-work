import { z } from "zod";
import { vitals } from "~~/server/db/vitalsSchema";
import { db } from "~~/server/db/index";

const Schema = z.object({
    id: z.string(),
    name: z.enum(["LCP", "INP", "CLS", "FCP", "TTFB"]),
    value: z.number(),
    delta: z.number(),
    rating: z.enum(["good", "needs-improvement", "poor"]),
    pathname: z.string(),
    build: z.enum(["before", "after"]),
    navigationType: z.string().optional(),
    attribution: z.any().optional(),
    ts: z.number(),
});

export default defineEventHandler(async (event) => {
    const body = Schema.parse(await readBody(event));

    await db.insert(vitals).values({
        createdAt: new Date(body.ts),
        build: body.build,
        pathname: body.pathname,
        metric: body.name,
        value: body.value,
        rating: body.rating,
        navigationType: body.navigationType ?? null,
        attribution: body.attribution ? JSON.stringify(body.attribution) : null,
    });

    return { ok: true };
});
