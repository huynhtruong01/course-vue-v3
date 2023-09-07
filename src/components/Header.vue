<script setup lang="ts">
import Container from './Container.vue';
import { links } from '../data'
</script>
<template>
    <header class="fixed top-0 left-0 bg-white w-full border-b border-gray-200">
        <Container>
            <router-link to="/" class="text-2xl font-bold">Logo</router-link>
            <nav>
                <ul class="flex gap-4 items-center">
                    <li v-for="link in links" :key="link.name" class="relative px-2 py-1">
                        <router-link :to="{ name: link.name.toLowerCase(), params: {} }" class="block font-medium">{{
                            link.name
                        }}</router-link>
                    </li>
                </ul>
            </nav>
        </Container>
    </header>
</template>