<template>
  <div id='addtask'>
      <input
        type="text"
        required
        id="task"
        v-model="newTask"
        placeholder="Type something..."
      />
   
    <button @click="newTask">Add task</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import userStore from "../store/user";
import taskStore from "../store/task";

export default {
  name: "taskToBeAdded",
  data() {
    return {
      newTitle: "",
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(taskStore, ["fetchTasks", "addTask"]),
    newTask() {
        this.addTask(this.newTitle, this.user.id);
        this.newTitle = '';
    }
  },
  created() {
    this.fetchTasks();
  },
};
</script>
