<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);

const createNewUser = async () => {
  try {
    loading.value = true;
    await userStore.createNewUser(email.value, password.value);
    success.value = "User created successfully!";
    error.value = "";
    email.value = "";
    password.value = "";
  } catch (err) {
    error.value = err.message || "Error creating new user. Please try again.";
    success.value = "";
  } finally {
    loading.value = false;
  }
};

const loginUser = async () => {
  try {
    loading.value = true;
    await userStore.loginUser(email.value, password.value);
    error.value = "";
    success.value = "";

    router.push({ name: "tasks" });
  } catch (err) {
    error.value = "Incorrect email or password. Please try again.";
    success.value = "";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <h1>Bienvenido a tu gestor de tareas</h1>

    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="success" class="success-message">{{ success }}</div>

    <h2 v-if="userStore.user">Usuario Actual: {{ userStore.user.email }}</h2>

    <div class="input-container">
      <input placeholder="Ingresa tu correo electrónico" v-model="email" class="styled-input" />
      <input type="password" placeholder="Ingresa tu contraseña" v-model="password" class="styled-input" />
    </div>

    <div class="button-container">
      <button @click="createNewUser" :disabled="loading" class="styled-button">Crear Usuario</button>
      <button @click="loginUser" :disabled="loading" class="styled-button">Iniciar Sesión</button>
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
  color: #d9534f;
  font-size: 14px;
  margin-bottom: 10px;
}

.success-message {
  color: #5cb85c;
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
  padding: 14px 18px; /* Ajuste en el padding para más espacio */
  margin: 10px 0;
  border: 2px solid #ccc; /* Borde más grueso */
  border-radius: 30px; /* Borde más redondeado */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  outline: none; /* Quita el contorno en focus */
}

.styled-input:focus {
  border-color: #6fb1fc; /* Color de borde al enfocar */
}

.styled-button {
  background-color: #6fb1fc;
  color: #fff;
  padding: 14px 28px; /* Ajuste en el padding para más espacio */
  border: none;
  border-radius: 30px; /* Borde más redondeado */
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s, transform 0.2s;
  margin: 10px 0;
}

.styled-button:hover {
  background-color: #4a90e2;
  transform: translateY(-2px); /* Efecto de levantamiento al pasar el mouse */
}

.styled-button:disabled {
  background-color: #b0d4ff;
  cursor: not-allowed;
}

.button-container {
  margin-bottom: 30px;
}
</style>