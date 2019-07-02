import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    students: require('./modules/students').default,
    subjects: require('./modules/subjects').default
  },
  state: {
    // value to show the sidebar
    toggleSidebar: true,
    // global materai desing colors
    colors: {
      primary:'green accent-4'
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
