declare module "#auth-utils" {
    interface User {
        id: number;
        email: string;
        name?: string;
        surname?: string;
        patronymic?: string | null;
        role?: "student" | "teacher";
        group?: string | null;
        department?: string | null;
        bio?: string | null;
        avatarUrl?: string | null;
    }

    interface UserSession {
        user: User;
    }
}
