<template>
  <div class="home">
    <h1>Home - ToDoApp</h1>
    <task-to-be-added/>
    <ol>
      <li></li>
    </ol>
  </div>
</template>

<script>
import taskToBeAdded from '../components/taskToBeAdded.vue';

export default {
  name: 'HomeView',
  components: { taskToBeAdded }
};
</script>
