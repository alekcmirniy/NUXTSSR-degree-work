import * as cheerio from "cheerio";
import type { DaySchedule, LessonItem, ParsedSchedule } from "../types";

type TimeMeta = {
    lessonNumber: string;
    startTime: string;
    endTime: string;
};

function normalizeText(value: string): string {
    return value.replace(/\s+/g, " ").trim();
}

function parseTimeLine(text: string): TimeMeta | null {
    const match = text.match(/(\d+)\s+пара\s+\(([\d:]+)—([\d:]+)\)/);
    if (!match) return null;

    return {
        lessonNumber: match[1]!,
        startTime: match[2]!,
        endTime: match[3]!,
    };
}

export async function parseSchedule(
    group: string,
    internalGroupId: string,
): Promise<ParsedSchedule> {
    const html = await $fetch<string>(
        `https://guap.ru/rasp?gr=${internalGroupId}`,
        {
            responseType: "text",
        },
    );

    const $ = cheerio.load(html);
    const container = $("div.container.content.mb-5").first();

    const days: DaySchedule[] = [];
    let currentDay: DaySchedule | null = null;
    let currentTime: TimeMeta | null = null;

    const children = container.children().toArray();

    for (let i = 0; i < children.length; i++) {
        const el = children[i];
        const $el = $(el);

        if (el!.tagName === "h4") {
            currentDay = {
                day: normalizeText($el.text()),
                lessons: [],
            };
            days.push(currentDay);
            currentTime = null;
            continue;
        }

        const classes = ($el.attr("class") || "").split(/\s+/);

        if (classes.includes("mt-3") && classes.includes("text-danger")) {
            currentTime = parseTimeLine(normalizeText($el.text()));
            continue;
        }

        if (
            classes.includes("mb-3") &&
            classes.includes("d-flex") &&
            classes.includes("gap-2")
        ) {
            if (!currentDay) continue;

            const content = $el.children().eq(1);
            const lessonType = normalizeText(
                content.find(".fs-6.lh-sm.opacity-50").first().text(),
            );
            const subject = normalizeText(
                content.find(".lead.lh-sm").first().text(),
            );

            const details = normalizeText(
                content.find(".opacity-75").first().text(),
            );

            const roomMatch = details.match(/ауд\.\s*(.+?)\s*—/i);
            const teacherMatch = details.match(/преп:\s*(.+?)\s*гр:/i);
            const weekIcon = $el.children().eq(0);
            const weekTitle = normalizeText(weekIcon.attr("title") || "");
            const weekSymbol = normalizeText(weekIcon.text());

            currentDay.lessons.push({
                id: `${group}-${currentDay.day}-${currentDay.lessons.length}`,
                subject: subject || "Без названия",
                teacher: teacherMatch
                    ? normalizeText(teacherMatch[1]!)
                    : "Не указан",
                classroom: roomMatch ? normalizeText(roomMatch[1]!) : "—",
                lessonType: lessonType || "Занятие",
                startTime: currentTime?.startTime || "",
                endTime: currentTime?.endTime || "",
                weekType: weekTitle || weekSymbol || "",
            });
        }
    }

    return {
        group,
        internalGroupId,
        updatedAt: new Date().toISOString(),
        days: days.filter(
            (day) =>
                day.lessons.length > 0 ||
                day.day.includes("Вне сетки расписания"),
        ),
    };
}
