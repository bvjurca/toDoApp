<template>
  <div id='addtask'>
      <input
        required
        id="task"
        v-model="title"
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
      title: "",
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(taskStore, ["fetchTasks", "addTask"]),
    newTask() {
      const taskContent = { 
        title: this.title,
        user_id: this.user.id,
        isComplete: this.isComplete,
       };
        this.addTask(taskContent.title, taskContent.user_id, taskContent.isComplete);
    }
  },
  created() {
    this.fetchTasks();
  },
};
</script>
