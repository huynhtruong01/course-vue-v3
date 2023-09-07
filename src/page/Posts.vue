<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue'
import axios from 'axios'
import Post from '../components/Post.vue'
import { IPost } from '../models'

const posts: Ref<IPost[]> = ref([])

onMounted(async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    posts.value = res.data
})

</script>
<template>
    <section class="w-full">
        <h1 class="text-2xl text-gray-900 mb-6 font-bold w-full text-center">Posts</h1>
        <div>
            <p v-if="posts.length === 0" class="text-center">Loading...</p>
            <div class="grid grid-cols-3 gap-4">
                <Post v-for="post in posts" :post="post" :key="post.id"></Post>
            </div>
        </div>
    </section>
</template>