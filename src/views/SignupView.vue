<template>
    <div>
      <h2>Sign Up</h2>
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
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SignupView',
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
        // logic for sign up
        let token = {
          username:this.username,
          password:this.password
        }
        this.login(token)
        this.username = '';
        this.password = '';
        this.errorMessage = '';
        this.$router.push('/');
      },
      mounted(){
        if(this.isUserLoggedIn){
          this.$router.push('/');
        }
      }
    },
  };
  </script>
  
