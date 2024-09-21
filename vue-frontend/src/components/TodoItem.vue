<script setup lang="ts">
import { AcademicCapIcon } from '@heroicons/vue/24/solid'
import type { Todo } from '@/models/todo';

defineProps<{
  todo: Todo
}>();

</script>

<template>
  <div v-if="todo" class="card">
    <h1><AcademicCapIcon  class="inline-block w-6 h-6" /> {{ todo.title }}</h1>
    <h3>{{ todo.description }}</h3>
    <RouterLink :to="'/todos/edit/' + todo?.id">Edit</RouterLink>
    <RouterLink :to="'/todos/delete/' + todo?.id">Delete</RouterLink>
  </div>
</template>

<style scoped>
</style>
