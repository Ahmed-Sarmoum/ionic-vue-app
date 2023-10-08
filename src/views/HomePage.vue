<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding ion-margin">
      <ion-row>
        <ion-col size="12" >
          <ion-card 
            v-for="post in (mergedPosts)" 
            :key="post.id"
            class="ion-no-margin ion-no-vertical">
            <ion-card-header @click="router.push(`profile/${post.userId}`)">
              <ion-card-subtitle>
                {{ new Date(post.date).toDateString() }}
              </ion-card-subtitle>
              <ion-card-title>
                {{ getSubByPostId(post.userId)?.profile.name }}
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-img :src="post.photo" class="ion-margin-bottom" />
              <ion-row>
                <ion-col size="12">
                  <ion-row>
                    <ion-col
                      size="1"
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: end;
                      "
                    >
                      <ion-icon :icon="heartOutline"> </ion-icon>
                    </ion-col>

                    <ion-col size="2">
                      <span>{{ post.likes }}</span>
                    </ion-col>
                  </ion-row>
                </ion-col>
                <ion-col>
                  <p>
                    {{ post.description }}
                  </p>
                </ion-col>
              </ion-row>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { userStore } from "@/store/store";
import { computed, onMounted, ref } from "vue";
import { User } from "@/interfaces/user-interface";
import { Post } from "@/interfaces/post-interface";
import { Subscriber } from "@/interfaces/subscriber-interface";
import { heartOutline } from 'ionicons/icons'
import { useRouter } from "vue-router";

const router = useRouter()
const store = userStore();
const mergedPosts = ref<Post[]>([]);

const userEntity = computed(() => {
  return store.userEntity as User
})

const mergePost = () => {
  if (userEntity.value.subscribers.length > 0) {
    userEntity.value.subscribers.forEach(sub => {
      mergedPosts.value.push(...sub.posts)
    })
  }
};

const getSubByPostId = (id: number) => {
  return userEntity.value.subscribers.find((sub: Subscriber) => sub.profile.id ===id)
}

onMounted(async () => {
  store.fetchUserFromDB();
  mergePost()

  mergedPosts.value.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })
});
</script>
