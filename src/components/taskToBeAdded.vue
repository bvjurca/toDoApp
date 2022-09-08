<template>
  <div>
      <input
        type="text"
        required
        id="task"
        v-model="newTask"
        placeholder="Type something..."
      />
   
    <button @click="newTask ">Add task</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import taskStore from "@/store/task";

export default {
  name: "taskToBeAdded",
  data() {
    return {
      newTitle: "",
    };
  },
  computed: {
    ...mapState(taskStore, ["task"]),
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
