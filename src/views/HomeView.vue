<template>
  <div class="home">
    <h1>Home - ToDoApp</h1>
    <button>Add a task</button>
    <ol>
      <li></li>
    </ol>
  </div>
</template>

<script>

import { mapActions, mapState } from 'pinia';
import taskStore from '@/store/task';

export default {
  name: 'HomeView',
  computed: {
    ...mapState(taskStore, ['task']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'editTask', 'deleteTask']),
  },
  async handleDeleteTask(taskId) {
    const deleted = await this.deleteTask(taskId);
    if (deleted) {
      console.log('removed');
    } else {
      console.log('not removed, delete does not work :(');
    }
  },
  created() {
    this.fetchTasks();
  },
};
</script>
