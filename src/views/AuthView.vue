<template>
  <header>
    <span>Sign in | </span>
    <router-link to="/register">Sign up</router-link>
  </header>
  <form>
    <div>
      <label for="email"
        >Email:
        <input
          type="email"
          required
          id="email"
          v-model="email"
        />
      </label>
    </div>
    <div>
      <label for="password"
        >Password:
        <input
          type="password"
          required
          id="password"
          v-model="password"
        />
      </label>
    </div>
    <button @click="handleSignIn">Sign in</button>
  </form>
</template>
<script>
import { mapActions, mapState } from "pinia";
import userStore from "@/store/user";

export default {
  name: "AuthView",
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(userStore, ["signIn"]),
    handleSignIn() {
      const userData = {
        email: this.email,
        password: this.password,
        confirmPass: this.confirmPass,
      };
      this.signIn(userData.email, userData.password);
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: "/" });
      }
    },
  },
};
</script>
