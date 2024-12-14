<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <h2>Sign Up</h2>
        <div>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
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
      ...mapActions(['signup']),
      async handleSubmit() {
        let token = {
          username:this.username,
          password:this.password
        }
        let result = await this.signup(token)
        this.username = '';
        this.password = '';
        this.errorMessage = result;
        if(!result) {
          this.errorMessage = '';
          this.$router.push('/');
        }
      },
      mounted(){
        if(this.isUserLoggedIn){
          this.$router.push('/');
        }
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h2 {
    color: white;
    font-size: 2rem;
    margin: 0.5rem 0;
    padding: 0;
  }
  
  form {
    background-color: #1f1f1f;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    padding: 1rem 2rem;
    margin-top: 2rem;
    div {
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
  
      input {
        background: none;
        border: none;
        border-bottom: 1px solid white;
        padding: 10px 0;
        color: white;
        font-size: 1rem;
        width: 100%;
        &::placeholder {
          color: grey;
        }
        &:focus {
          border-color: grey;
          outline: none;
        }
      }
    }
  
    button {
      background: none;
      border: 2px solid white;
      color: white;
      padding: 10px 20px;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s ease, color 0.3s ease;
      width: 100%;
      &:hover {
        background-color: white;
        color: black;
      }
    }
  }
  
  p {
    margin-top: 10px;
    color: red;
    font-size: 1rem;
  }
  
  </style>