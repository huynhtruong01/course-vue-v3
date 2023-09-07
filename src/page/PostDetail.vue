<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IPost } from '../models';
import axios from 'axios'

const post: Ref<null | IPost> = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
    const id = route.params.postId
    if (id) {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        post.value = res.data
    }
})

function handleBackPosts() {
    router.push('/posts')
}
</script>
<template>
    <section>
        <button class="px-4 py-2 rounded bg-cyan-600 text-white font-medium mb-4" @click="handleBackPosts">Back to
            posts</button>
        <p v-if="!post">Loading...</p>
        <div v-if="post">
            <h1 class="text-2xl font-bold text-gray-900 capitalize">{{ post.title }}</h1>
            <p>{{ post.body }}</p>
        </div>
    </section>
</template>