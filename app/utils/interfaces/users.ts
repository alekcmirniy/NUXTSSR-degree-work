export type UserRole = "student" | "teacher";

export interface UserPreview {
    id: number;
    name: string;
    surname: string;
    patronymic: string | null;
    role: UserRole;
    group: string | null;
    department: string | null;
    bio: string | null;
    avatarUrl: string | null;
}

export interface UserProfile extends UserPreview {
    email: string;
    createdAt: string;
    updatedAt: string;
}
