<template>
  <div class="container">
    <h1>Tasks</h1>
    <div class="task-input-container">
      <input placeholder="Task Title" v-model="taskTitle" class="styled-input" />
      <input placeholder="Task Description" v-model="taskDescription" class="styled-input" />
      <button @click="addNewTask" class="styled-button">{{ editingTaskId ? 'Update Task' : 'Add Task' }}</button>
    </div>

    <br><br>
    <button @click="taskStore.fetchTasks()" class="styled-button">Fetch Tasks</button>
    <ul class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id" class="task-item">
        <span :class="{ 'task-done': task.done }" class="task-post-it">
          <strong :style="{ 'text-decoration': task.done ? 'line-through' : 'none', 'color': task.done ? 'green' : 'black' }">{{ task.title }}</strong>: {{ task.description }}
        </span>
        <button v-if="!task.done" @click="markTaskAsDone(task)" class="done-button">Done</button>
        <button @click="editTask(task)" class="edit-button">Edit</button>
        <button @click="deleteTask(task.id)" class="delete-button">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/task";
import { useUserStore } from "../stores/user";
import { ref } from "vue";

const taskStore = useTaskStore();
const userStore = useUserStore();

const taskTitle = ref("");
const taskDescription = ref("");
const editingTaskId = ref(null);

const addNewTask = async () => {
  if (editingTaskId.value) {
    await taskStore.updateTask(editingTaskId.value, taskTitle.value, taskDescription.value);
    editingTaskId.value = null;
  } else {
    await taskStore.addTask(taskTitle.value, userStore.user.id);
  }
  taskTitle.value = "";
  taskDescription.value = "";
};

const editTask = (task) => {
  editingTaskId.value = task.id;
  taskTitle.value = task.title;
  taskDescription.value = task.description;
};

const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
};

const markTaskAsDone = async (task) => {
  task.done = true; // Marcamos la tarea como completada en el estado
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9a8d4, #8ec5fc);
  color: #333;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.task-input-container {
  margin: 20px 0;
}

.styled-input {
  display: block;
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.styled-button, .edit-button, .delete-button, .done-button {
  background: #ff6b6b;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s;
  margin: 5px;
}

.styled-button:hover, .edit-button:hover, .delete-button:hover, .done-button:hover {
  background: #ff4757;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  background: #fffde7; /* Fondo amarillo claro para simular un post-it */
  padding: 10px 20px;
  margin: 5px 0;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-post-it {
  font-family: 'Permanent Marker', cursive; /* Fuente que simula el texto de rotulador */
  font-size: 18px;
  color: black; /* Color inicial del texto */
}

.task-done strong {
  color: green; /* Color del texto cuando está completado */
  text-decoration: line-through; /* Tachado del texto cuando está completado */
}

.edit-button, .delete-button {
  margin-left: 10px;
  padding: 5px 10px;
}
</style>
