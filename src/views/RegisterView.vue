<template>
  <header>
    <router-link to="/auth">Sign in</router-link>
    <span> | Sign up</span>
  </header>
  <form>
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>
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
    <div>
      <label for="confirmPass"
        >Confirm password:
        <input
          type="password"
          required
          id="confirmPass"
          v-model="confirmPass"
        />
      </label>
    </div>
    <button @click="handleSignUp">Sign up</button>
  </form>
</template>

<script>
import { mapActions, mapState } from "pinia";
import userStore from "@/store/user";

export default {
  name: "RegisterView",
  data() {
    return {
      errorMsg: '',
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(userStore, ["signUp"]),
    async handleSignUp() {
      if(this.password === this.confirmPass) {
        try {
      const userData = {
        email: this.email,
        password: this.password,
        confirmPass: this.confirmPass,
      };
      this.signUp(userData.email, userData.password);
      }
      catch (error) { 
        this.errorMsg = error.message;
       }
      }
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
