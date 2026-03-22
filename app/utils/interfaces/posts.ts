export interface PostData {
    headerText: string;
    epigraph: string;
    text: string; //предварительно блочная структура текста - понять, как.
    image: any; //предварительно any - мб будет и string, но если получаю картинку с сервера - то как тогда?
    date: Date;
    author: string; //тут пока что string - будет по клику вести ссылка на профиль автора поста
}

export type PostsRequest = {
    count: number;
    items: Array<{
        attachments: any[]; //тут фотки постов - придумать как их обрабатывать.
        comments: { count: number };
        date: Date;
        donut: { is_donut: boolean };
        from_id: number;
        hash: string;
        id: number;
        inner_type: string;
        likes: { can_like: number; count: number; user_likes: number };
        marked_as_ads: number;
        owner_id: number;
        post_type: "string";
        push_subscription: { is_subscribed: boolean };
        reaction_set_id: string;
        reactions: { count: number; items: any[] };
        reposts: { count: number };
        text: string;
        type: string;
        views: { count: number };
    }>;
    reaction_sets: any[];
};
