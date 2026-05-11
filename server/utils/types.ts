export interface LessonItem {
    id: string;
    subject: string;
    teacher: string;
    classroom: string;
    lessonType: string;
    startTime: string;
    endTime: string;
    weekType: string;
}

export interface DaySchedule {
    day: string;
    lessons: LessonItem[];
}

export interface ParsedSchedule {
    group: string;
    internalGroupId: string;
    updatedAt: string;
    days: DaySchedule[];
}
