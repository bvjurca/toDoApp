<template>
  <div class="home">
    <p class='hello'> {{ greeting() +' '+ approxUserName() +'!' }}</p>
    <h1>{{ approxUserName() }}'s to do list</h1>
    <task-to-be-added />

    <TaskList />
  </div>
</template>

<script>
import taskToBeAdded from "@/components/taskToBeAdded.vue";
import TaskList from "@/components/TaskList.vue";
import userStore from "@/store/user";
import { mapState, mapActions } from "pinia";

export default {
  name: "HomeView",
  data() {
    return {};
  },
  components: { taskToBeAdded, TaskList },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(userStore, ["fetchUser"]),
    approxUserName() {
      return this.user.email.slice(0, this.user.email.indexOf("@"));
    },
    // greeting depdening on time of day
    greeting() {
      var today = new Date();
      var hr = today.getHours();

      if (hr < 12) {
        return("Good morning");
      } else if (hr < 18) {
        return("Good afternoon");
      } else {
        return("Good evening");
      }
    },
  },
};
</script>
