<template>
  <div class="home">
    <div v-if="isUserLoggedIn">
      <AddTask />
      <p v-if="incompleteTasks.length == 0">No tasks available yet</p>
      <div class="tasks-list">
        <li v-for="task in incompleteTasks" :key="task.id">
          <input 
            type="checkbox" 
            :checked="task.completed" 
            @change="toggleTaskCompletion(task.id)" 
          />
          <span>{{ task.title }}</span>
          <span class="material-symbols-outlined" @click="deleteTask(task.id)">delete</span>
        </li>
      </div>
      <h3 style="margin: 0">Completed Tasks</h3>
      <hr/>
      <p v-if="completedTasks.length == 0">No tasks completed yet</p>
      <div class="tasks-list">
        <li v-for="task in completedTasks" :key="task.id">
          <input 
          type="checkbox" 
          :checked="task.completed" 
          @change="toggleTaskCompletion(task.id)" 
          />
          <span>{{ task.title }}</span>
          <span class="material-symbols-outlined" @click="deleteTask(task.id)">delete</span>
        </li>
      </div>
    </div>
    <div class="suggest-login" v-else>
       <h2>Try Out Todo-list for free!</h2> 
       <h3>Boost your daily productivity</h3>
       <router-link 
       class="login-button"
       to="signup" 
       >Create new account </router-link>
       <router-link 
       class="login-button"
       to="login" 
       >Log into existing account</router-link>
    </div>
  </div>
</template>

<script>
import AddTask from '@/components/AddTask.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  components:{
    AddTask
  },
  computed: {
    ...mapGetters(['isUserLoggedIn', 'completedTasks', 'incompleteTasks']), 
  },
  methods: {
    ...mapActions(['toggleTaskCompletion', 'deleteTask']),
  }
}
</script>

<style lang="scss" scoped>

.home {
  padding: 20px;
  width: 30%;
  min-width: 30rem;
}

h2, h3 {
  color: #ffffff;
  margin: 20px 0;
}

.router-link {
  color: #ffffff;
  text-decoration: none;
  margin: 5px 10px;
}

.router-link:hover {
  color: #42b983;
}

/* Task list styling */
.tasks-list {
  list-style-type: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #1f1f1f;
  margin: 5px 0;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.task-item:hover {
  background-color: #333333;
}

input[type="checkbox"] {
  margin-right: 15px;
  cursor: pointer;
}

.completed-task {
  text-decoration: line-through;
  color: #aaa;
}

.delete-icon {
  margin-left: auto;
  cursor: pointer;
  color: #ff5555;
  font-size: 20px;
}

.delete-icon:hover {
  color: #ff0000;
}

p {
  color: #888;
}

.suggest-login {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  background-color: #1f1f1f;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  h2 {
    color: #ffffff;
    font-size: 2rem;
    margin-bottom: 10px;
  }
  h3 {
    color: #bbb;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  .login-button {
    display: inline-block;
    margin: 10px 15px;
    color: #ffffff;
    text-decoration: none;
    padding: 10px 15px;
    background-color: #333333;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  .login-button:hover {
    background-color: #42b983;
  }
  .login-button:active {
    background-color: #338e6f;
  }
  .login-button:focus {
    outline: 2px solid #42b983;
    outline-offset: 4px;
  }
}

</style>