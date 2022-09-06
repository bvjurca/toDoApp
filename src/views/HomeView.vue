<template>
  <div class="home">
    <h1>Home - ToDoApp</h1>
    <button @click="addTask">Add a task</button>
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
    ...mapActions(taskStore, ['fetchTasks', 'addTask']),
  },
  created() {
    this.fetchTasks();
  },
};
</script>
