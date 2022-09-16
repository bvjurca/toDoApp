// /store/user.js

import { defineStore } from "pinia";
import supabase from "../supabase";

export default defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      else this.user = null;
    },

    // async passwordReset() {
    //   const email = prompt("Please enter your email:");
    //   if (!email) {
    //     window.alert("Email address is required.");
    //   } else {
    //     const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    //     if (error) {
    //       alert("Error: " + error.message);
    //     } else {
    //       alert("Password recovery email has been sent.");
    //     }
    //   }
    // },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
