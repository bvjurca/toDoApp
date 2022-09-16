import { defineStore } from "pinia";
import supabase from "../supabase/index";

export default defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    tasksByDate() {
      return this.tasks.sort((a, b) =>
        a.inserted_at > b.inserted_at ? -1 : 1
      );
    },
  },
  actions: {
    async addTask(taskName, userId, taskStatus) {
      const { error } = await supabase.from("tasks").insert([{ title: taskName, user_id: userId, is_complete: taskStatus }]);
      if (error) throw error;
      // if (data.length) {
      //   this.tasks.push(data[0]);
      // }
    },

    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks.map((task) => ({
        ...task,
        inserted_at: new Date(task.inserted_at).toLocaleDateString(),
      }));
    },

    async delTask(taskId) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .delete()
          .match({ id: taskId });
        if (error) throw error;
        if (data && data.length) {
          const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
          this.tasks = this.tasks.splice(taskIndex, 1);
        } else {
          throw new Error("Task does not exist");
        }
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
});
