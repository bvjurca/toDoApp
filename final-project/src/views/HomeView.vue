<template>
  <div class="home">
    <h1>Home</h1>
    <button>Add a task</button>
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
    ...mapActions(taskStore, ['fetchTasks']),
  },
  created() {
    this.fetchTasks();
  },
};
</script>
