<template>
    <div>
      <h2>Log In</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'LoginView',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    computed: {
      ...mapGetters(['isUserLoggedIn']), 
    },
    methods: {
      ...mapActions(['login']),
      handleSubmit() {
        //logic for login, also deal with invalid login credentials
        let token = {
          username:this.username,
          password:this.password
        }
        this.login(token)
        this.username = '';
        this.password = '';
        this.errorMessage = '';
        this.$router.push('/');
      }
    },
  };
  </script>
  