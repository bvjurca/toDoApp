<template>
  <section class="emptystate" v-if="!tasks.length">
    <img src="https://i.imgur.com/qN1iZfK.jpg" alt="task illustration" />
    <h2>So far, nothing here</h2>
    <p>Your tasks will appear here once you create them</p>
  </section>
  <ul class="task-in-list">
    <li v-for="task in tasks" :key="task.id">
      <input
        class="checkbox"
        @click="handleTaskStatus(task.is_complete, task.id)"
        type="checkbox"
        v-model="task.is_complete"
        v-bind:id="task.is_complete"
      />
      <div class="content">
        <input
          class="task-name"
          v-model="task.title"
          :style="
            task.is_complete
              ? 'text-decoration: line-through'
              : 'text-decoration:none'
          "
          @change="handleTaskName(task.title, task.id)"
        />
        <span v-if="task.is_complete" id="done"> DONE!</span>
      </div>
      <button id="kill" @click="deleteTask(task.id)">Remove</button>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from "pinia";
import taskStore from "@/store/task";

export default {
  name: "ShowTasks",
  computed: {
    ...mapState(taskStore, ["tasks"]),
  },
  methods: {
    ...mapActions(taskStore, ["delTask", "editStatus", "editName"]),

    deleteTask(taskId) {
      try {
        this.delTask(taskId);
        alert("Task deleted. Please refresh page.");
      } catch (error) {
        alert("Error: ", error.message);
      }
    },
    handleTaskStatus(task, taskID) {
      this.editStatus(!task, taskID);
    },

    handleTaskName(title, taskID) {
      if (title.length !== 0) {
        this.editName(title, taskID);
      } else {
        alert("Empty task? That doesn't make sense");
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
