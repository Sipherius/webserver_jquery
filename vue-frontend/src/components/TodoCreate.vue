<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const newTodo = ref<Todo>({
  title: 'Default title',
  description: 'Default description',
  done: false,
  created_date: '',
  updated_date: '',
});

function resetTodo() {
  console.log("Reset");
  newTodo.value.title = 'Default title';
  newTodo.value.description = 'Default description';
  console.log(newTodo.value);
}

function submitTodo() {
  axios.post('/api/todos', { todo: newTodo.value })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log('POST Todo API Response: ', response.data);
      router.push('/todos');
    })
    .catch(console.error);
}
</script>

<template>
  <div class="createTodoWrapper">
    <RouterLink to="/todos">Back</RouterLink>
    <h2>Create Todo</h2>
    <form @submit.prevent="submitTodo">
      <div class="formRow">
        <label for="todoTitle">Title</label>
        <input id="todoTitle" type="text" v-model="newTodo.title">
      </div>
      <div class="formRow">
        <label for="todoDescription">Description</label>
        <input id="tododescription" type="text" v-model="newTodo.description">
      </div>
      <div class="formRow">
        <span></span>
        <div>
          <button type="button" @click="resetTodo">Reset</button>
          &nbsp;
          <button type="submit">Create Todo</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

.formRow {
  display: grid;
  grid-template-columns: 8rem 1fr;
}
</style>
