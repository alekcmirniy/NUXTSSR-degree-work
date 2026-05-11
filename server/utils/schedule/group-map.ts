import * as cheerio from "cheerio";

const groupMapCache = new Map<string, string>();

export async function getInternalGroupId(
    group: string,
): Promise<string | null> {
    if (groupMapCache.has(group)) {
        return groupMapCache.get(group)!;
    }

    const html = await $fetch<string>("https://guap.ru/rasp", {
        responseType: "text",
    });

    const $ = cheerio.load(html);

    let foundValue: string | null = null;

    $("option").each((_, el) => {
        const text = $(el).text().trim();
        const value = $(el).attr("value");

        if (text === group && value) {
            foundValue = value;
        }
    });

    if (foundValue) {
        groupMapCache.set(group, foundValue);
    }

    return foundValue;
}
