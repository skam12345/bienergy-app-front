<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button class="btn btn-primary"
              @click="moveToCreatePage"
      >
        Create Todo
      </button>
    </div>
    <input type="text" v-model="searchText" class="form-control" placeholder="Search" @keyup.enter="searchTodo">
    <hr />
    <div style="color: red">{{ error }}</div>
    <div v-if="!todos.length">
      There is nothing to display
    </div>
    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo ="deleteTodo"></TodoList>
    <hr/>
    <Pagination
      v-if="todos.length"
      :numberOfPages = "numberOfPages"
      :current-page = "currentPage"
      @click="getTodos"
    ></Pagination>
  </div>
</template>

<script>
import {ref, computed, watch} from 'vue';
import TodoList from "@/components/TodoList";
import axios from "@/axios";
import {useToast} from "@/composables/toast";
import {useRouter} from "vue-router";
import Pagination from "@/components/Pagination.vue";

export default {
  components: {
    TodoList,
    Pagination
  },
  setup() {
    const router = useRouter();
    const todos = ref([
    ]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');

    let {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
      timeout } = useToast()

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',
      })
    }

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        triggerToast('Something went wrong', 'danger');
      }
    };
    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      // 데이터베이스 투두를 저장
      try {
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed,
        });

        getTodos(1);
      } catch (err) {
        triggerToast('Something went wrong', 'danger');
      }
    };

    const toggleTodo = async (index, checked) => {
      try{
        console.log(checked)
        const id = todos.value[index].id;
        todos.value[index].completed = checked;
        await axios.patch('todos/' + id, {
          completed: checked
        });
      } catch (err) {
        console.log(err)
        triggerToast('Something went wrong', 'danger');
      }
    };

    const deleteTodo = async (id) => {
      try {
        await axios.delete('todos/' + id);
        getTodos(1);
      } catch (err) {
        triggerToast('Something went wrong', 'danger');
      }
    };

    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    }

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() =>{
        getTodos(1);
      }, 1000)
    })

    return {
      todos,
      todoStyle,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchText,
      // filteredTodos,
      error,
      getTodos,
      numberOfPages,
      currentPage,
      searchTodo,
      toastMessage,
      toastAlertType,
      showToast,
      moveToCreatePage
    };
  }
}

</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>