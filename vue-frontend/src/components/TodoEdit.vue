<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import PRButton from './elements/PRButton.vue';
import PRButtonRow from './elements/PRButtonRow.vue';

const props = defineProps({
  id: String
});

const router = useRouter();

const editTodo = ref<Todo>({
  title: '',
  description: '',
  done: false,
  created_date: '',
  updated_date: '',
});

let originalTodo: Todo;

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

  originalTodo = { ...todo };
  editTodo.value = { ...todo };
});

function resetTodo() {
  editTodo.value = { ...originalTodo };
}

function submitTodo() {
  axios.put(`/api/todos`, { todo: editTodo.value })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log('PUT Todo API Response: ', response.data);
      router.push('/todos');
    })
    .catch(console.error);
}

// const myTestButton = ref(PRButton);

// function testButton() {
//   console.log("Button clicked");
//   myTestButton.value.startLoading();
//   setTimeout(() => {
//     myTestButton.value.stopLoading();
//   }, 2000);

// }
</script>

<template>
  <div class="createTodoWrapper">
    <RouterLink to="/todos">Back</RouterLink>
    <h2>Edit Todo</h2>
    <form @submit.prevent="submitTodo" class="group relative">
      <div class="formRow">
        <label for="todoTitle">Title</label>
        <input id="todoTitle" type="text" v-model="editTodo.title"
               class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 px-4 ring-1 ring-slate-200 shadow-sm">
      </div>
      <div class="formRow">
        <label for="todoDescription">Description</label>
        <input id="tododescription" type="text" v-model="editTodo.description">
      </div>
      <div class="formRow">
        <span></span>
        <PRButtonRow>
          <PRButton @click="resetTodo">Reset</PRButton>
          <PRButton type="submit">Edit Todo</PRButton>
        </PRButtonRow>
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
