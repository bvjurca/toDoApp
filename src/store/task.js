import { defineStore } from "pinia";
import supabase from "../supabase/index";

export default defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async addTask(taskName, userId, taskStatus) {
      const { error } = await supabase
        .from("tasks")
        .insert([
          { title: taskName, user_id: userId, is_complete: taskStatus },
        ]);
      if (error) throw error;
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
    async editStatus(newStatus, taskId) {
      const { error } = await supabase
        .from("tasks")
        .update({ is_complete: newStatus })
        .match({ id: taskId });
      if (error) throw error;
      this.fetchTasks();
    },

    async editName(newName, taskId) {
      const { error } = await supabase
        .from("tasks")
        .update({ title: newName })
        .match({ id: taskId });
      if (error) throw error;
    },
  },
});
