<script setup lang="ts">
import Container from './Container.vue';
</script>
<template>
    <header class="fixed top-0 left-0 bg-white w-full border-b border-gray-200">
        <Container>
            <router-link to="/" class="text-2xl font-bold">Logo</router-link>
            <nav>
                <ul class="flex gap-4 items-center">
                    <li class="px-4 py-2">
                        <router-link to="/" class="block font-medium">Home</router-link>
                    </li>
                    <li class="px-4 py-2">
                        <router-link to="/about" class="block font-medium">About</router-link>
                    </li>
                    <li class="px-4 py-2">
                        <router-link to="/projects" class="block font-medium">Projects</router-link>
                    </li>
                    <li class="px-4 py-2">
                        <router-link to="/contact" class="block font-medium">Contact</router-link>
                    </li>
                </ul>
            </nav>
        </Container>
    </header>
</template>