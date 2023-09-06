<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
    class?: string
}>()
</script>

<template>
    <div class="max-w-[1120px] m-auto p-4 flex items-center justify-between" :class="props.class">
        <slot></slot>
    </div>
</template>        