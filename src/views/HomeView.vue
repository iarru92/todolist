<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const error = ref("");

const createNewUser = async () => {
  try {
    await userStore.createNewUser(email.value, password.value);
    error.value = "";
  } catch (err) {
    error.value = "Error creating new user. Please try again.";
  }
};

const loginUser = async () => {
  try {
    await userStore.loginUser(email.value, password.value);
    error.value = "";

    router.push({ name: "tasks"});    
  } catch (err) {
    error.value = "Incorrect email or password. Please try again.";
  }
};
</script>

<template>
  <div class="container">
    <h1>Bienvenido a tu gestor de tareas</h1>
    
    <div v-if="error.value" class="error-message">
      {{ error.value }}
    </div>

    <h2 v-if="userStore.user">Current User: {{ userStore.user.email }}</h2>

    <div class="input-container">
      <input placeholder="Write your email" v-model="email" class="styled-input" />
      <input type="password" placeholder="Write your password" v-model="password" class="styled-input" />
    </div>

    <div class="button-container">
      <button @click="createNewUser" class="styled-button">Create new User</button>
      <button @click="loginUser" class="styled-button">Login</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f4f8;
  color: #333;
  font-family: 'Arial', sans-serif;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}

h1, h2 {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  color: #333;
}

.input-container {
  margin: 20px 0;
}

.styled-input {
  display: block;
  width: 300px;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

.styled-button {
  background-color: #6fb1fc;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.3s;
  margin: 10px 0;
}

.styled-button:hover {
  background-color: #4a90e2;
}

.button-container {
  margin-bottom: 30px;
}
</style>

