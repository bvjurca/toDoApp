import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async addTask(task) {
      const { data, error } = await supabase.from('tasks').insert(task);
      if (error) throw error;
      if (data) {
        this.tasks.push(data);
      }
    },

    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      // this.tasks = tasks;
      this.tasks = tasks.map((task) => ({
        ...task,
        inserted_at: new Date(task.inserted_at).toLocaleDateString(),
      }));
    },
  },
});
