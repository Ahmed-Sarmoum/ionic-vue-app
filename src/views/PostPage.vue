<template>
    <ion-page>
        <ion-content>
            <ion-card class="ion-no-margin ion-margin-vertical">
                <ion-card-content>
                    <ion-img :src="post?.photo" class="ion-margin-bottom" />
                    <ion-row>
                        <ion-col size="12">
                            <ion-row>
                                <ion-col size="1" style="display: flex; align-items: center; justify-content: end;">
                                    <ion-icon :icon="heartOutline" />
                                </ion-col>
                                <ion-col size="2">
                                    <span>
                                        {{ post?.likes }}
                                    </span>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                        <ion-col>
                            <p>
                                {{ post?.description }}
                            </p>
                        </ion-col>
                    </ion-row>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script setup  lang="ts">
import { useRoute } from "vue-router";
import { userStore } from "@/store/store";
import { computed, onMounted } from "vue";
import { User } from "@/interfaces/user-interface";
import { heartOutline } from "ionicons/icons";

const route = useRoute()
const store = userStore()

const userEntity = computed(() => {
    return store.userEntity as User
})

const post = computed(() => {
    const subscriber = userEntity.value.subscribers.find(sub => sub.profile.id === Number(route.params.userId))
    return subscriber?.posts.find(post => post.id === Number(route.params.id))
})

onMounted(() => {})
</script>