<script setup lang="ts">
import { defineProps } from 'vue'
import { IPost } from '../models'
const { post } = defineProps<{
    post: IPost
}>()
</script>
<template>
    <div class="p-4 rounded border border-gray-200">
        <router-link :to="`/posts/${post.id}`" class="block">
            <h2 class="text-xl font-semibold text-gray-800 line-clamp-1 mb-2">{{ post.title }}</h2>
            <p class="line-clamp-4">{{ post.body }}</p>
        </router-link>
    </div>
</template>