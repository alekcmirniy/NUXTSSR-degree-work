<template>
    <div class="w-full px-4 py-6 lg:px-8">
        <div
            class="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.42fr_0.58fr]"
        >
            <section
                class="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur"
            >
                <div class="border-b border-white/10 p-5">
                    <UChip
                        color="primary"
                        variant="soft"
                        size="lg"
                        class="w-fit"
                        >Чаты</UChip
                    >
                    <h1
                        class="mt-3 text-3xl font-semibold tracking-tight text-white"
                    >
                        Сообщения
                    </h1>
                    <p class="mt-2 text-sm leading-6 text-slate-300">
                        Переписка сохраняется на сервере. Новые сообщения
                        подтягиваются автоматически.
                    </p>

                    <div class="mt-4">
                        <UInput
                            v-model="search"
                            placeholder="Поиск по диалогам"
                        />
                    </div>
                </div>

                <div
                    class="max-h-[calc(100vh-18rem)] space-y-3 overflow-y-auto p-4"
                >
                    <div
                        v-if="filteredConversations.length === 0"
                        class="rounded-3xl border border-dashed border-white/15 bg-black/20 p-6 text-center text-sm text-slate-400"
                    >
                        Пока нет диалогов.
                    </div>

                    <ConversationItem
                        v-for="conversation in filteredConversations"
                        :key="conversation.id"
                        :conversation="conversation"
                        :active="selectedConversation?.id === conversation.id"
                        @select="
                            openConversationById(conversation.otherUser.id)
                        "
                    />
                </div>
            </section>

            <section
                class="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 shadow-2xl shadow-black/20"
            >
                <div v-if="selectedConversation" class="flex h-full flex-col">
                    <div class="border-b border-white/10 p-5">
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white/10 text-sm font-semibold text-white"
                                >
                                    <img
                                        v-if="
                                            selectedConversation.otherUser
                                                .avatarUrl
                                        "
                                        :src="
                                            selectedConversation.otherUser
                                                .avatarUrl
                                        "
                                        alt="avatar"
                                        class="h-full w-full object-cover"
                                    />
                                    <span v-else>{{ selectedInitials }}</span>
                                </div>

                                <div>
                                    <h2
                                        class="text-xl font-semibold text-white"
                                    >
                                        {{ selectedFullName }}
                                    </h2>
                                    <p class="text-sm text-slate-400">
                                        {{ selectedSubtitle }}
                                    </p>
                                </div>
                            </div>

                            <UButton
                                :to="`/people/${selectedConversation.otherUser.id}`"
                                color="primary"
                                variant="soft"
                                size="sm"
                                class="ui-btn ui-btn-secondary"
                            >
                                Профиль
                            </UButton>
                        </div>
                    </div>

                    <div
                        ref="messagesWrap"
                        class="flex-1 space-y-4 overflow-y-auto p-5"
                    >
                        <div
                            v-if="messages.length === 0"
                            class="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-sm text-slate-400"
                        >
                            Напишите первое сообщение.
                        </div>

                        <MessageBubble
                            v-for="message in messages"
                            :key="message.id"
                            :message="message"
                            :mine="message.senderId === currentUserId"
                        />
                    </div>

                    <div class="border-t border-white/10 p-4">
                        <form class="flex gap-3" @submit.prevent="sendMessage">
                            <UTextarea
                                v-model="draft"
                                :rows="1"
                                autoresize
                                placeholder="Введите сообщение..."
                                class="flex-1"
                            />
                            <UButton
                                type="submit"
                                color="primary"
                                size="lg"
                                :loading="sending"
                            >
                                Отправить
                            </UButton>
                        </form>
                    </div>
                </div>

                <div
                    v-else
                    class="flex h-full min-h-[520px] items-center justify-center p-8 text-center"
                >
                    <div class="max-w-md">
                        <div
                            class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-white"
                        >
                            <UIcon
                                name="i-lucide-message-circle"
                                class="text-2xl"
                            />
                        </div>
                        <h2 class="mt-4 text-2xl font-semibold text-white">
                            {{
                                selfChatError
                                    ? "Нельзя открыть чат с самим собой"
                                    : "Выберите диалог"
                            }}
                        </h2>
                        <p class="mt-2 text-sm leading-6 text-slate-300">
                            {{
                                selfChatError
                                    ? "Откройте профиль другого пользователя и нажмите «Написать в чате»."
                                    : "Откройте человека из списка или нажмите «Написать в чате» на странице профиля."
                            }}
                        </p>
                    </div>
                </div>
            </section>
        </div>

        <UAlert
            v-if="errorMessage"
            class="mx-auto mt-6 max-w-7xl"
            color="error"
            variant="soft"
            :title="errorMessage"
        />
    </div>
</template>

<script setup lang="ts">
import type {
    ChatMessage,
    ChatThreadResponse,
    ConversationPreview,
} from "~/utils/interfaces/chat";

const route = useRoute();
const { user } = useUserSession();

const currentUserId = computed(() => Number((user.value as any)?.id));

const conversations = ref<ConversationPreview[]>([]);
const selectedConversation = ref<ConversationPreview | null>(null);
const messages = ref<ChatMessage[]>([]);
const draft = ref("");
const search = ref("");
const sending = ref(false);
const messagesWrap = ref<HTMLElement | null>(null);
const selfChatError = ref(false);
const errorMessage = ref<string | null>(null);

let pollingId: ReturnType<typeof setInterval> | null = null;

const filteredConversations = computed(() => {
    const q = search.value.trim().toLowerCase();
    if (!q) return conversations.value;

    return conversations.value.filter((conversation) => {
        const u = conversation.otherUser;
        const fullName = [u.surname, u.name, u.patronymic]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
        const meta = [u.group, u.department, u.bio]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
        const last = conversation.lastMessage?.content.toLowerCase() || "";
        return fullName.includes(q) || meta.includes(q) || last.includes(q);
    });
});

const selectedFullName = computed(() => {
    const u = selectedConversation.value?.otherUser;
    if (!u) return "";
    return [u.surname, u.name, u.patronymic].filter(Boolean).join(" ");
});

const selectedInitials = computed(() => {
    const u = selectedConversation.value?.otherUser;
    if (!u) return "";
    return [u.surname?.[0], u.name?.[0]].filter(Boolean).join("").toUpperCase();
});

const selectedSubtitle = computed(() => {
    const u = selectedConversation.value?.otherUser;
    if (!u) return "";
    return u.role === "teacher"
        ? u.department || "Преподаватель"
        : [u.group, u.department].filter(Boolean).join(" · ") || "Студент";
});

async function loadConversations() {
    const list = await $fetch<ConversationPreview[]>("/api/chats");
    conversations.value = list;
}

async function loadThread(otherUserId: number) {
    errorMessage.value = null;

    if (otherUserId === currentUserId.value) {
        selfChatError.value = true;
        selectedConversation.value = null;
        messages.value = [];
        return;
    }

    selfChatError.value = false;

    const thread = await $fetch<ChatThreadResponse>(
        `/api/chats/with/${otherUserId}`,
    );

    selectedConversation.value = {
        id: thread.conversation.id,
        pairKey: thread.conversation.pairKey,
        updatedAt: thread.conversation.updatedAt,
        otherUser: thread.counterpart,
        lastMessage: thread.messages.at(-1) || null,
        unreadCount: 0,
    };

    messages.value = thread.messages;

    await $fetch(`/api/chats/${thread.conversation.id}/read`, {
        method: "POST",
    });

    await loadConversations();

    nextTick(() => {
        messagesWrap.value?.scrollTo({
            top: messagesWrap.value.scrollHeight,
            behavior: "smooth",
        });
    });
}

async function openConversationById(otherUserId: number) {
    await navigateTo({
        path: "/chat",
        query: { with: String(otherUserId) },
    });
}

async function sendMessage() {
    const text = draft.value.trim();
    if (!text || !selectedConversation.value) return;

    sending.value = true;
    try {
        await $fetch(`/api/chats/${selectedConversation.value.id}/messages`, {
            method: "POST",
            body: { content: text },
        });

        draft.value = "";
        await loadThread(selectedConversation.value.otherUser.id);
    } catch (e: any) {
        errorMessage.value =
            e?.statusMessage || "Не удалось отправить сообщение";
    } finally {
        sending.value = false;
    }
}

async function openFromRoute() {
    const withId = Number(route.query.with);

    if (Number.isFinite(withId)) {
        try {
            await loadThread(withId);
        } catch (e: any) {
            errorMessage.value =
                e?.statusMessage || "Не удалось открыть диалог";
            selectedConversation.value = null;
            messages.value = [];
        }
    } else if (conversations.value[0]) {
        try {
            await loadThread(conversations.value[0].otherUser.id);
        } catch (e: any) {
            errorMessage.value =
                e?.statusMessage || "Не удалось открыть диалог";
        }
    }
}

async function refreshActiveThread() {
    if (!selectedConversation.value) return;

    try {
        await loadThread(selectedConversation.value.otherUser.id);
    } catch {
        // silently ignore polling errors
    }
}

onMounted(async () => {
    try {
        await loadConversations();
    } catch (e: any) {
        errorMessage.value =
            e?.statusMessage || "Не удалось загрузить список чатов";
    }

    await openFromRoute();

    pollingId = setInterval(async () => {
        await Promise.all([
            loadConversations().catch(() => {}),
            refreshActiveThread(),
        ]);
    }, 5000);
});

watch(
    () => route.query.with,
    async (val) => {
        const id = Number(val);
        if (Number.isFinite(id)) {
            try {
                await loadThread(id);
            } catch (e: any) {
                errorMessage.value =
                    e?.statusMessage || "Не удалось открыть диалог";
            }
        }
    },
);

onBeforeUnmount(() => {
    if (pollingId) clearInterval(pollingId);
});
</script>
