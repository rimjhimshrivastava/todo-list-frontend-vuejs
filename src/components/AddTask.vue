<template>
    <div class="add-task">
      <h2>Add a New Task</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <input
            type="text"
            id="taskTitle"
            v-model="taskTitle"
            placeholder="Enter task title"
            required
          />
        </div>
        <button type="submit" :disabled="!taskTitle.trim()">Add Task</button>
      </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      taskTitle: '',
    };
  },
  methods: {
    ...mapActions(['addNewTask']), 
    handleSubmit() {
      this.addNewTask(this.taskTitle);
      this.taskTitle = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.add-task{
  margin-bottom: 1rem;
  form{
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    width: 100%; 
    input{
      flex-grow: 1;
      background: none;
      border: none;
      font-size: 1.5rem;
      border-bottom: 2px solid white;
      padding: 0.5rem 3rem 7px 0;
      color: white;
      &:focus {
        outline: none; 
        border-bottom: 2px solid white; 
      }
    }
    button{
      background: none;
      border: 2px solid white;
      color: white;
      font-size: 1.5rem;
      padding: 0.5rem 1rem;
      white-space: nowrap; 
      transition: background-color 0.3s, color 0.3s; 

      &:hover {
        background-color: white; 
        color: black; 
        cursor: pointer; 
      }
    }
  }
}


</style>