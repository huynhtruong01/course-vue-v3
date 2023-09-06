<script setup lang="ts">
import Container from './components/Container.vue';
import Header from './components/Header.vue'
</script>

<template>
  <Header></Header>
  <main class="mt-20">
    <Container>
      <router-view></router-view>
    </Container>
  </main>
</template>


