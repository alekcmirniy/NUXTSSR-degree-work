<template>
    <div class="flex items-center justify-evenly">
        <div class="posts-container border-solid border-black">
            {{ error }}
            {{ posts }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAxiosStore } from "#imports";
import type { PostData } from "~/utils/interfaces/posts";

const { posts, error } = useAxiosStore();

const mockPosts: PostData[] = [
    //заимствовать данные не из своей базы а с чужой - сайт https://guap.ru/
    {
        headerText: "Путешествие в мир TypeScript",
        epigraph: "Строгость — это свобода.",
        text: "TypeScript помогает создавать крупные проекты, избегая множества ошибок уже на этапе разработки.",
        image: "@/public/postExample.png",
        date: new Date("2024-01-12"),
        author: "AlexCode",
    },
    {
        headerText: "Почему важно писать чистый код",
        epigraph: "Код читается гораздо чаще, чем пишется.",
        text: "Чистый код экономит время всей команды и снижает стоимость поддержки проекта.",
        image: "@/public/postExample.png",
        date: new Date("2024-02-03"),
        author: "DevMind",
    },
    {
        headerText: "React: первый шаг к UI",
        epigraph: "Интерфейс — это разговор с пользователем.",
        text: "React делает создание пользовательских интерфейсов удобным и модульным.",
        image: "@/public/postExample.png",
        date: new Date("2024-03-18"),
        author: "FrontendFox",
    },
    {
        headerText: "Оптимизация производительности в браузере",
        epigraph: "Скорость — ключ к лучшему UX.",
        text: "Работа с рендером, мемоизация и правильная структура данных — вот основа.",
        image: "@/public/postExample.png",
        date: new Date("2024-04-27"),
        author: "PerfGuru",
    },
    {
        headerText: "CSS Grid: современный подход к layout",
        epigraph: "Правильная сетка — половина дизайна.",
        text: "Grid позволяет создавать адаптивные интерфейсы быстро и удобно.",
        image: "@/public/postExample.png",
        date: new Date("2024-05-09"),
        author: "StyleMaster",
    },
    {
        headerText: "Зачем нужны unit-тесты?",
        epigraph: "Тесты — не роскошь, а необходимость.",
        text: "Юнит-тесты предотвращают регрессии и помогают не бояться рефакторинга.",
        image: "@/public/postExample.png",
        date: new Date("2024-06-14"),
        author: "QATech",
    },
    {
        headerText: "Node.js и асинхронность",
        epigraph: "Событийный цикл — сердце Node.js.",
        text: "Асинхронные операции делают приложения быстрыми и отзывчивыми.",
        image: "@/public/postExample.png",
        date: new Date("2024-07-01"),
        author: "BackCoder",
    },
    {
        headerText: "Введение в Next.js 14",
        epigraph: "Новый стандарт для React-разработки.",
        text: "App Router, серверные компоненты и отличная производительность.",
        image: "@/public/postExample.png",
        date: new Date("2024-08-11"),
        author: "NextHero",
    },
    {
        headerText: "Git: лучшие практики",
        epigraph: "История — наше всё.",
        text: "Четкие коммиты, feature-ветки и code review — путь к чистому репозиторию.",
        image: "@/public/postExample.png",
        date: new Date("2024-09-02"),
        author: "RepoSensei",
    },
    {
        headerText: "Как работает рендеринг в React",
        epigraph: "Понимание — залог оптимизации.",
        text: "Разберём reconciliation, ключи и мемоизацию.",
        image: "@/public/postExample.png",
        date: new Date("2024-10-15"),
        author: "FiberWizard",
    },
    {
        headerText: "Frontend-архитектура: основы",
        epigraph: "Структура определяет масштабируемость.",
        text: "Модули, слои, разделение ответственности.",
        image: "@/public/postExample.png",
        date: new Date("2024-10-22"),
        author: "ArchPro",
    },
    {
        headerText: "JWT: как работает аутентификация",
        epigraph: "Безопасность важнее удобства.",
        text: "Токены, refresh, best practices.",
        image: "@/public/postExample.png",
        date: new Date("2024-11-03"),
        author: "SecExpert",
    },
    {
        headerText: "Оптимизация изображений",
        epigraph: "Меньше — быстрее.",
        text: "WebP, AVIF, компрессия и lazy loading.",
        image: "@/public/postExample.png",
        date: new Date("2024-12-09"),
        author: "MediaNinja",
    },
    {
        headerText: "UX-паттерны для веба",
        epigraph: "Пользователь важнее всего.",
        text: "Правильные отступы, визуальная иерархия, предсказуемость.",
        image: "@/public/postExample.png",
        date: new Date("2024-12-19"),
        author: "UXBird",
    },
    {
        headerText: "TailwindCSS: быстро и стильно",
        epigraph: "Utility-first экономит время.",
        text: "Tailwind позволяет сфокусироваться на дизайне, а не на названиях классов.",
        image: "@/public/postExample.png",
        date: new Date("2025-01-10"),
        author: "CSSCat",
    },
    {
        headerText: "Как работает бандлинг кода",
        epigraph: "Bundler — дирижёр вашего проекта.",
        text: "Vite, Webpack, Rollup — что выбрать?",
        image: "@/public/postExample.png",
        date: new Date("2025-01-22"),
        author: "BuildMaster",
    },
    {
        headerText: "State management: Redux или нет?",
        epigraph: "Состояние — это сложно.",
        text: "Redux, Zustand, Jotai — сравнение подходов.",
        image: "@/public/postExample.png",
        date: new Date("2025-02-01"),
        author: "StateGuru",
    },
    {
        headerText: "Ленивая загрузка компонентов",
        epigraph: "Меньше — быстрее.",
        text: "Code splitting и dynamic import.",
        image: "@/public/postExample.png",
        date: new Date("2025-02-15"),
        author: "LoadMaster",
    },
    {
        headerText: "Советы по улучшению UI",
        epigraph: "Маленькие детали делают магию.",
        text: "Тени, плавность, адаптивность.",
        image: "@/public/postExample.png",
        date: new Date("2025-02-27"),
        author: "UIDesigner",
    },
    {
        headerText: "Работа с формами в React",
        epigraph: "Форма — это пользовательский путь.",
        text: "React Hook Form, yup, оптимизация перерисовок.",
        image: "@/public/postExample.png",
        date: new Date("2025-03-03"),
        author: "FormWizard",
    },
    {
        headerText: "Server Components в Next.js",
        epigraph: "Будущее уже здесь.",
        text: "SSR, streaming, data-fetching.",
        image: "@/public/postExample.png",
        date: new Date("2025-03-11"),
        author: "NextSensei",
    },
    {
        headerText: "Сравнение CSS-in-JS решений",
        epigraph: "Стиль — не только про красоту.",
        text: "Emotion, Styled Components, Linaria.",
        image: "@/public/postExample.png",
        date: new Date("2025-03-18"),
        author: "StyleDev",
    },
    {
        headerText: "GraphQL или REST?",
        epigraph: "Передача данных — фундамент.",
        text: "Гибкость GraphQL vs простота REST.",
        image: "@/public/postExample.png",
        date: new Date("2025-04-02"),
        author: "APIWizard",
    },
    {
        headerText: "WebSockets и realtime",
        epigraph: "Онлайн — значит мгновенно.",
        text: "Socket.io, слои абстракции, примеры.",
        image: "@/public/postExample.png",
        date: new Date("2025-04-15"),
        author: "RealtimeDev",
    },
    {
        headerText: "Микросервисы: стоит ли начинать?",
        epigraph: "Не всегда маленькое — лучшее.",
        text: "Плюсы, минусы, когда применять.",
        image: "@/public/postExample.png",
        date: new Date("2025-04-30"),
        author: "MicroMaster",
    },
];

// defineOptions({
//     async preFetch({ store }) {
//         const { fetchData, setData } = useAxiosStore(store);
//         const token =
//             "bc2ebae0bc2ebae0bc2ebae077bf124310bbc2ebc2ebae0d532f741804d1ca1f9603141";
//         const groupId = -122496494;
//         const url = `https://api.vk.com/method/wall.get?owner_id=${groupId}&count=20&access_token=${token}&v=5.199`;

//         const handledRes = await fetchData("posts", async () => {
//             const res = (await axios.get(url)) as any;
//             console.log(res.data.error || "Ошибки нет");
//             if (!res) throw new Error("Has no response!");
//             else if (res.data.error) throw new Error(res.data.error.error_msg);
//             return res;
//         });
//         setData("posts", handledRes);
//     },
// });
</script>

<style lang="scss" scoped>
.posts-container {
    border: solid 2px black;
    width: 60vw;
    height: 1000px;
}
</style>
