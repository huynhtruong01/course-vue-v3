<script setup lang="ts">
import Container from './components/Container.vue';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header></Header>
  <main class="mt-20 min-h-screen">
    <Container>
      <router-view />
    </Container>
  </main>
  <Footer></Footer>
</template>


