import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));

  const createNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log("error: ", error);
    } else {
      user.value = data;
      console.log("user :", user.value);
    }
  };

  const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log("error: ", error);
    } else {
      user.value = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log("logged in user :", user.value);
    }
  };

  return { user, createNewUser, loginUser };
});
