<template>
  <div class="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components:{
    NavBar
  }
}
</script>
<style scoped>
*{
  margin:0;
  padding: 0;
  font-family: "Inter", sans-serif;
}
</style>

