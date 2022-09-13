<template>
  <div class="home">
    <h1>Home - ToDoApp</h1>
    <task-to-be-added/>
    
    <TaskList/>
  </div>
</template>

<script>
import taskToBeAdded from '../components/taskToBeAdded.vue';
import TaskList from '../components/TaskList.vue';

export default {
  name: 'HomeView',
  components: { taskToBeAdded, TaskList }
};
</script>
