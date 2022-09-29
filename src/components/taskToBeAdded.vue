<template>
  <div id='addtask'>
      <input
        required
        ref="incomingTask"
        id="task"
        v-model="title"
        placeholder="Type something..."
      />
   
    <button @click="newTask"
    :disabled="title.length < 4">Add task</button> <!--supabase needs it to be at least 4 chars-->
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
     ...mapState(taskStore, ["tasks"]),
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
        //this.querySelector('#task').value = 'Type something...';      clear input attempt:(
      
    }
  },
  created() {
    this.fetchTasks();
  },
};
</script>
