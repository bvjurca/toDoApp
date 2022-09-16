<template>
  <header>
    <span>Sign in | </span>
    <router-link to="/register">Sign up</router-link>
  </header>
  <form>
    <div>
      <label for="email"
        >Email:
        <input type="email" required id="email" v-model="email" />
      </label>
    </div>
    <div>
      <label for="password"
        >Password:
        <input type="password" required id="password" v-model="password" />
      </label>
    </div>
    <button @click.prevent="handleSignIn">Sign in</button>
  </form>
  <!-- <div>
    <a @click.prevent="handlePasswordReset" href="/"> Forgot your password? </a>
  </div> -->
</template>
<script>
import { mapActions, mapState } from "pinia";
import userStore from "@/store/user";

export default {
  name: "AuthView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(userStore, ["signIn"]),
    handleSignIn() {
      const userData = {
        email: this.email,
        password: this.password,
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
