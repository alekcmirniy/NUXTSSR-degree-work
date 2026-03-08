export interface PostData {
    headerText: string;
    epigraph: string;
    text: string; //предварительно блочная структура текста - понять, как.
    image: any; //предварительно any - мб будет и string, но если получаю картинку с сервера - то как тогда?
    date: Date;
    author: string; //тут пока что string - будет по клику вести ссылка на профиль автора поста
}
