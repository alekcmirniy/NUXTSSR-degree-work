<template>
    <section class="container">
        <header class="header">
            <h1 class="header-text">{{ postData.headerText }}</h1>
            <aside class="header-aside-container">
                <div class="add-to-favourites">⚝</div>
                <div class="post-date">{{ 'преобразованная дата' }}</div>
            </aside>
        </header>

        <main class="main-content">
            <!-- IMG -->
        </main>

        <footer class="footer">
            <p class="post-author">Author: {{ postData.author }}</p>
            <p class="post-epigraph">{{ postData.epigraph }}</p>
        </footer>
    </section>
</template>

<script lang="ts" setup>
import { PostData } from 'src/utils/interfaces';

const props = defineProps<{
    postData: PostData
}>();
const postData = props.postData;

const transformData = () => {
    //преобразование даты под шаблон
}

</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;

    .header {
        display: flex;

        .header-aside-container {
            display: flex;
            flex-direction: column;
        }
    }

    .footer {
        display: flex;
        flex-direction: column;

        .post-epigraph {
            text-align: center;
        }
    }
}
</style>