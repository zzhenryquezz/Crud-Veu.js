import Vue from 'vue';
import Router from 'vue-router';
import { HomePage, StudentsPage, SubjectsPage } from './views';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },   
    {
      path: '/students',
      name: 'students',
      meta:{
        title: 'Alunos'
      },
      component: StudentsPage,
    },   
    {
      path: '/subjects',
      name: 'subjects',
      meta:{
        title: 'Materias'
      },
      component: SubjectsPage,
    },   
  ],
});
