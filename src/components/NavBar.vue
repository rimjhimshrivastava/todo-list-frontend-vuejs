<template>
  <div class="navbar">
    <div class="nav-list">
      <div class="logo">Todo App</div>
      <router-link to="/" class="home-link">Home</router-link>
    </div>
    <div v-if="isUserLoggedIn">
      <button @click="logout" type="button">Logout</button>
    </div>
  </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'NavBar',
        computed: {
            ...mapGetters(['isUserLoggedIn']), 
        },
        methods: {
            ...mapActions(['logout']), 
        },
    }
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  background-color: #1a1a1a;
  color: #fff;
  padding: 10px 30px; 
  border-bottom: 2px solid #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.nav-list {
  display: flex;
  align-items: center; 
  gap: 20px; 
}

.logo {
  font-size: 1.8rem; 
  font-weight: bold;
}

.home-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem; 
  transition: color 0.3s;
}

.home-link:hover {
  color: #42b983;
}

.navbar button {
  padding: 8px 16px; 
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem; 
  cursor: pointer;
  transition: background-color 0.3s;
}

.navbar button:hover {
  background-color: #338e6f;
}

.navbar button:active {
  background-color: #276f53;
}

.navbar button:focus {
  outline: none;
  box-shadow: 0 0 4px #42b983;
}
</style>