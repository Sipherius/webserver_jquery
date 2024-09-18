<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const props = defineProps({
  id: String
});

const router = useRouter();

const deleteTodo = ref<Todo>({
  title: '',
  description: '',
  done: false,
  created_date: '',
  updated_date: '',
});

async function loadTodo(id: string): Promise<Todo | null> {
  try {
    const response = await axios.get(`/api/todos/${id}`);
    console.log('GET Todo API Response: ', response.data);
    return response.data.data.todo;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
}

onMounted(async () => {
  if (!props.id) {
    return;
  }

  const todo = await loadTodo(props.id);

  if (!todo) {
    return;
  }

  deleteTodo.value = { ...todo };
});

function submitTodo() {
  axios.delete(`/api/todos/${deleteTodo.value.id}`)
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log('DELETE Todo API Response: ', response.data);
      router.push('/todos');
    })
    .catch(console.error);
}
</script>

<template>
  <div class="createTodoWrapper">
    <RouterLink to="/todos">Back</RouterLink>
    <h2>Delete Todo</h2>
    <form @submit.prevent="submitTodo">
      <div class="formRow">
        <label>Title</label>
        <span>{{ deleteTodo.title }}</span>
      </div>
      <div class="formRow">
        <label>Description</label>
        <span>{{ deleteTodo.description }}</span>
      </div>
      <div class="formRow">
        <span></span>
        <div>
          <button type="submit">Delete Todo</button>
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
