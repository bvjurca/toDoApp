import { defineStore } from "pinia";
import supabase from "../supabase/index";

export default defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async addTask(taskName, userId, taskStatus) {
      try {
        // first prevent task duplication
        const { data } = await supabase
          .from("tasks")
          .select("title, user_id")
          .match({ title: taskName, user_id: userId });
        if (data && data.length) {
          alert("Task already exists");
        } else {
          //then allow creation
          const { error } = await supabase
            .from("tasks")
            .insert([
              { title: taskName, user_id: userId, is_complete: taskStatus },
            ]);
          if (error) throw error;
        }
      } catch (error) {
        console.error(error);
      }
    },
    timeConv(insertedDate) {
      //let's convert the supabase date into something more user friendly
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var timeAgo = Date.now() - Date.parse(insertedDate);
      if (timeAgo < msPerMinute) {
        return Math.round(timeAgo / 1000) + " sec ago";
      } else if (timeAgo < msPerHour) {
        return Math.round(timeAgo / msPerMinute) + " min ago";
      } else if (timeAgo < msPerDay) {
        return Math.round(timeAgo / msPerHour) + "h ago";
      } else if (timeAgo < msPerMonth) {
        return "about " + Math.round(timeAgo / msPerDay) + "d ago";
      } else if (timeAgo < msPerYear) {
        return "about " + Math.round(timeAgo / msPerMonth) + " mo ago";
      } else {
        return "about " + Math.round(timeAgo / msPerYear) + "y ago";
      }
    },

    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks.map((task) => ({
        ...task,
        inserted_at: this.timeConv(task.inserted_at),
      }));
    },
    async delTask(taskId) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .delete()
          .match({ id: taskId });
        if (error) throw error;
        if (data && data.length) {
          const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
          this.tasks = this.tasks.splice(taskIndex, 1);
        } else {
          throw new Error("Task does not exist");
        }
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async editStatus(newStatus, taskId) {
      const { error } = await supabase
        .from("tasks")
        .update({ is_complete: newStatus })
        .match({ id: taskId });
      if (error) throw error;
      this.fetchTasks();
    },
    async editName(newName, taskId) {
      const { error } = await supabase
        .from("tasks")
        .update({ title: newName })
        .match({ id: taskId });
      if (error) throw error;
    },
  },
});
