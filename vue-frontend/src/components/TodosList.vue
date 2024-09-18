<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Todos } from '../models/todos';
import TodoCard from './TodoItem.vue';

const todos = ref<Todos>([]);

function getTodos() {
  axios.get('/api/todos')
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log('GET Todos API Response: ', response.data);
      todos.value = response.data.data.todos;
    })
    .catch(console.error);
}

onMounted(() => {
  getTodos();
});

</script>

<template>
  <main>
    <h1>List of todos</h1>

    <div class="buttonRow">
      <!-- <button @click="getTodos">Get Todos</button> -->
      <RouterLink to="/todos/create">Create Todo</RouterLink>
    </div>

    <div v-for="todo in todos" :key="todo.id">
      <TodoCard :todo="todo" />
    </div>
  </main>
</template>

<style scoped>
.buttonRow {
  display: flex;
  column-gap: 0.5rem;
}
</style>
