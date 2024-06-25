import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select();

    if (error) {
      console.log("Error: ", error);
    } else {
      tasks.value = data;
      console.log("tasks: ", tasks.value);
    }
  };

  const addTask = async (title, user_id) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: title, user_id: user_id }]);

    if (error) {
      console.log("Error: ", error);
    } else {
      tasks.value = data;
      console.log("Tasks: ", tasks.value);
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.log("Error: ", error);
    } else {
      tasks.value = tasks.value.filter(task => task.id !== id);
      console.log("Deleted task with id: ", id);
    }
  };

  const updateTask = async (id, title, description) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ title, description })
      .eq('id', id);

    if (error) {
      console.log("Error: ", error);
    } else {
      const index = tasks.value.findIndex(task => task.id === id);
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], title, description };
        console.log("Updated task: ", tasks.value[index]);
      }
    }
  };

  return { tasks, fetchTasks, addTask, deleteTask, updateTask };
});
