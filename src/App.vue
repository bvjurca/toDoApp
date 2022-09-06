<template>
  <nav v-if="user !== null">
    <router-link to="/">Home</router-link> |
    <router-link @click.prevent = "handleSignOut" to="/auth">Sign out</router-link>
  </nav>
  <router-view/>
</template>

<script>

import userStore from '@/store/user';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'App',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['fetchUser', 'signOut']),
    handleSignOut() {
      this.signOut();
      if (this.user === null) {
        this.$router.push('/auth');
      }
    },
  },
  async created() {
    try {
      await this.fetchUser(); // here we call fetch user
      if (!this.user) {
      // redirect them to logout if the user is not there
        this.$router.push({ path: '/auth' });
      } else {
      // continue to dashboard
        this.$router.push({ path: '/' });
      }
    } catch (e) {
      console.error(e);
    }
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
