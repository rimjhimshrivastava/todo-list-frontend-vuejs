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
