<template>
  <header>
    <router-link to="/auth">Sign in</router-link>
    <span> | Sign up</span>
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
    <button @click.prevent="handleSignUp">Sign up</button>
    <Transition>
      <div v-if="errorMsg" class="error-message">
        <p>{{ errorMsg }}</p>
      </div>
    </Transition>
  </form>
</template>

<script>
import { mapActions, mapState } from "pinia";
import userStore from "@/store/user";

export default {
  name: "RegisterView",
  data() {
    return {
      errorMsg: "",
      email: "",
      password: "",
      confirmPass: "",
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(userStore, ["signUp"]),
    async handleSignUp() {
      if (this.password === this.confirmPass) {
        try {
          const userData = {
            email: this.email,
            password: this.password,
          };
          this.signUp(userData.email, userData.password);
        } catch (error) {
          this.errorMsg = error.message;
        }
      } else this.errorMsg = "Passwords do not match!";
      setTimeout(() => {
        this.errorMsg = null;
      }, 3000);
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.push({ path: "/auth" });
      }
    },
  },
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
