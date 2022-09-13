<template>
  <table v-if="tasksByDate.length">
    <tr>
      <th v-for="col in cols" :key="col.key">{{ col.title }}</th>
    </tr>
  </table>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';
import userStore from '@/store/user';

export default {
  name: 'TaskList',
  data() {
    return {
      cols: [
        {
          title: 'Title',
          key: 'title',
        },
        {
          title: 'Date',
          key: 'date',
        },
        {
          title: 'Status',
          key: 'status',
        },
        {
          title: 'Action',
          key: 'action',
        },
      ],
      actions: [
        {
          id: 0,
          title: 'Edit',
          placeholderAction: this.handleEdit,
        },
        {
          id: 1,
          title: 'Delete',
          placeholderAction: this.handleDel,
        },
      ],
    };
  },
  computed: {
    ...mapState(taskStore, ['tasksByDate']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'delTask', 'addTask']),

    async handleDel(taskId) {
      const result = await this.delTask(taskId);
      if (result) {
        console.log('Task deleted');
      } else {
        console.log('Task not deleted');
      }
    },
    handleaddTask() {
      this.addTask({
        title: 'New task',
        user_id: this.user.id,
      });
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
