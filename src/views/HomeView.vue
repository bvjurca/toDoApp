<template>
  <div class="home">
     <p>Signed in as {{ user.email }} </p>
     <h1>{{ fakeUserName() }}'s to do list</h1>
    <task-to-be-added/>
    
    <TaskList/>
  </div>
</template>

<script>
import taskToBeAdded from '@/components/taskToBeAdded.vue';
import TaskList from '@/components/TaskList.vue';
import userStore from '@/store/user';
import { mapState, mapActions} from 'pinia';

export default {
  name: 'HomeView',
  components: { taskToBeAdded, TaskList },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['fetchUser']),
  fakeUserName() {
      return this.user.email.slice(0, this.user.email.indexOf('@'));
    },
  }
};
</script>
