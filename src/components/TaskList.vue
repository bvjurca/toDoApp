<template>
    <div v-for="task in tasks" :key="task.id" :id="task.id">
      <div class='task-in-list'>
        <input
          aria-label="checkbox"
          class="checkbox"
          type="checkbox"
          v-model="task.is_complete"
          v-bind:id="task.is_complete"
        />
        <input
          aria-label="title"
          v-model="task.title"
          @change="handleEditTitle(task.title, task.id)"
        />
        <span v-if="task.is_complete"> COMPLETE!</span>
        <button @click="deleteTask(task.id)" class="card-link">Remove Task</button>
      </div>
    </div>

</template>

<script>
import { mapActions, mapState } from 'pinia';
import taskStore from '@/store/task';

export default {
  name: 'ShowTasks',
  computed: {
    ...mapState(taskStore, ['tasks']),
  },
  methods: {
    ...mapActions(taskStore, ['delTask', 'editStatus', 'editTitle']),

    deleteTask(taskId) {
      try {
        this.delTask(taskId);
        alert('Task deleted');
      } catch (error) {
        alert('Error: ', error.message);
      }
    },

  },
  watch: {
    tasks(state) {
      console.log(state);
    },
  },
};
</script>
