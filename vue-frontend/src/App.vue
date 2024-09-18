<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import axios from 'axios';

console.log(import.meta.env.VITE_API_DOMAIN);
axios.defaults.baseURL = import.meta.env.VITE_API_DOMAIN;

</script>

<template>
  <header>
    <HelloWorld msg="Sandbox" />
  </header>

  <div class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/todos">Todos</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  column-gap: 1rem;
}

nav {
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
}
</style>
