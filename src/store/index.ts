import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    students: require('./modules/students').default,
    subjects: require('./modules/subjects').default,
    tests: require('./modules/tests').default
  },
  state: {
    // value to show the sidebar
    toggleSidebar: true,
    // global materai desing colors
    colors: {
      primary:'indigo'
    }
    
  },
  mutations: {
    // global envent to toggle the sidebar
    toggleSidebar(state){
      state.toggleSidebar = !state.toggleSidebar;
    }
  },
  actions: {

  },
});
