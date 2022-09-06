<template>
  <h1>SigninSignup</h1>
  <form>
    <div class="flex flex-col mb-2">
      <label for="email" class="mb-1 text-sm">Email:
        <input type="text" required class="p-2 text-gray-500" id="email" v-model="email"/>
      </label>
    </div>
    <div class="flex flex-col mb-2">
      <label for="password" class="mb-1 text-sm">Password:
        <input type="password" required class="p-2 text-gray-500" id="password" v-model="password"/>
      </label>
    </div>
  </form>
  <button @click="handleSignUp">Sign up </button>
  <button @click="handleSignIn">Sign in</button>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp', 'signIn']),
    handleSignUp() {
      const userData = {
        email: 'bogdan.victor@ironhack.com',
        password: '1234pass',
      };
      this.signUp(userData.email, userData.password);
    },
    handleSignIn() {
      const userData = {
        email: 'bogdan.victor@ironhack.com',
        password: '1234pass',
      };
      this.signIn(userData.email, userData.password);
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
