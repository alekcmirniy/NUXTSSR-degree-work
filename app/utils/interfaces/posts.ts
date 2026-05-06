export type PostsRequest = {
    count: number;
    items: Array<{
        attachments: any[]; //тут фотки постов - придумать как их обрабатывать.
        comments: { count: number };
        date: Date;
        from_id: number;
        id: number;
        likes: { can_like: number; count: number; user_likes: number };
        marked_as_ads: number; //маркер рекламы - почему бы и нет
        owner_id: number;
        push_subscription: { is_subscribed: boolean };
        reaction_set_id: string;
        reactions: { count: number; items: any[] };
        reposts: { count: number };
        text: string;
        type: string;
        views: { count: number };
    }>;
    reaction_sets: any[];
    // реакции пока оставил - может тоже сможем сделать
};

export interface PostData {
    id: number;

    headerText: string; // title
    text: string;

    attachments: Array<any>; //фотки - поправить их потом, тут будут вообще все фотки с поста
    image: string | null;

    date: string; // уже отформатированная строка
    author: string;

    likes: number;
    comments: number;
    views: number;
    reposts: number;
}

//TODO: НУЖНО ОБРЕЗАТЬ И УДАЛИТЬ ССЫЛКИ В ТЕКСТЕ!

/*
СМОТРИ ТУТ
В мероприятии приняли участие 30 обучающихся, среди которых были 10 студентов из ВУЦ и 4 приглашенных гостя. Встретили участников живой музыкой в исполнении [https://vk.ru/muzguap|МУЗГУАП] 🎶
*/
