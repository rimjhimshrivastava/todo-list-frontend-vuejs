import { createStore } from 'vuex'; 

const store = createStore({
  state: {
    isUserLoggedIn: localStorage.getItem('isUserLoggedIn') === 'true' || false,
    token: localStorage.getItem('token') || null,
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
    login({ commit }, token) {
        //implement api logic to get tasks list from db
        const tasks = []
        commit('setLoginState', { isLoggedIn: true, token });
        commit('setTasksList', tasks);
    },
    logout({ commit }) {
        commit('setLoginState', { isLoggedIn: false, token: null });
        commit('setTasksList', []); 
    },
    addNewTask({ state, commit }, task) {
        //implement api logic to upload new task in db
      const newTask = { id: Date.now(), title: task, completed: false };
      const updatedTasks = [...state.tasksList, newTask];
      commit('setTasksList', updatedTasks);
    },
    toggleTaskCompletion({ state, commit }, taskId) {
        //implement api logic to update tasks in db
      const updatedTasks = state.tasksList.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      commit('setTasksList', updatedTasks);
    },
    deleteTask({ state, commit }, taskId) {
        //implement api logic to update tasks in db
      const updatedTasks = state.tasksList.filter((task) => task.id !== taskId);
      commit('setTasksList', updatedTasks);
    },
  },
  getters: {
    isUserLoggedIn: (state) => state.isUserLoggedIn,
    completedTasks: (state) => state.tasksList.filter((task) => task.completed),
    incompleteTasks: (state) => state.tasksList.filter((task) => !task.completed),
  },
});

export default store;