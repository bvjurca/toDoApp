import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async editTask(taskId) {
      // const { error, data } = await supabase.auth;
      if (error) throw error;
      if (data) {
        console.log(data);
        const currentTask = this.tasks.filter((task) => task.id === taskId);
        currentTask.title = data;
      }
    },

    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
    },
  },
});
