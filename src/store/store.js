import apiClient from './axios';
import { createStore } from 'vuex'; 

const store = createStore({
  state: {
    isUserLoggedIn: localStorage.getItem('isUserLoggedIn') === 'true' || false,
    token: localStorage.getItem('token') || null, // access token for user authentication
    tasksList: JSON.parse(localStorage.getItem('tasksList')) || [],
  },
  mutations: {
    setLoginState(state, { isLoggedIn, token }) {
      state.isUserLoggedIn = isLoggedIn;
      state.token = token;
      localStorage.setItem('isUserLoggedIn', isLoggedIn);
      if(token){
        localStorage.setItem('token', token);
      }
      else{
        localStorage.removeItem('token');
      }
    },
    setTasksList(state, tasks) {
        state.tasksList = tasks;
        localStorage.setItem('tasksList', JSON.stringify(tasks)); 
    },
  },
  actions: {
    // Makes request for creating new user
    async signup({ commit }, token){
      try{
        const response = await apiClient.post('/auth/signup', token);
        commit('setLoginState', { isLoggedIn: true, token: response.data.accessToken });
      } catch(error){
        if (error.response && error.response.data && error.response.data.message) {
          console.error("ERROR in signup: ", error.response.data.message);
          return error.response.data.message; 
        } else {
          console.error("Unexpected error: ", error);
          return 'An unexpected error occurred'; 
        }
      }
    },

    // Makes request for Login of existing user
    async login({ commit }, token) {
      try{
        const response = await apiClient.post('/auth/login', token);
        commit('setLoginState', { isLoggedIn: true, token: response.data.accessToken });
      } catch(error){
        if (error.response && error.response.data && error.response.data.message) {
          console.error("ERROR in signup: ", error.response.data.message);
          return error.response.data.message; 
        } else {
          console.error("Unexpected error: ", error);
          return 'An unexpected error occurred'; 
        }
      }
    },

    // Logout existing user
    logout({ commit }) {
        commit('setLoginState', { isLoggedIn: false, token: null });
        commit('setTasksList', []); 
    },

    // Fetches all tasks of current user 
    async getAllTask({ commit }){
      try{
        const response = await apiClient.get('/todo');
        commit('setTasksList', response.data.todos)
      } catch(error) {
        console.log("Error in fetching tasks:", error)
        return error;
      }
    },

    // Creates new task for existing user
    async addNewTask({ commit }, task) {
      try{
        const response = await apiClient.post('/todo', {title: task})
        commit('setTasksList', response.data.todos);
      }
      catch(error){
        console.log("Error in adding task: ", error)
        return error;
      }
    },

    // Toggle task completion status of selected task
    async toggleTaskCompletion({ commit }, taskId) {
      try{
        const response = await apiClient.put(`/todo/${taskId}`)
        commit('setTasksList', response.data.todos);
      }
      catch(error){
        console.log("Error in toggle task: ", error)
        return error;
      }
    },

    // Deletes selected task
    async deleteTask({ commit }, taskId) {
      try{
        const response = await apiClient.delete(`/todo/${taskId}`)
        commit('setTasksList', response.data.todos);
      }
      catch(error){
        console.log("Error in delete task: ", error)
        return error;
      }
    },
  },
  getters: {
    isUserLoggedIn: (state) => state.isUserLoggedIn,
    completedTasks: (state) => state.tasksList.filter((task) => task.completed),
    incompleteTasks: (state) => state.tasksList.filter((task) => !task.completed),
    getAccessToken: (state) => state.token,
  },
});

export default store;