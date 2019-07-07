import Vue from 'vue';
import Router from 'vue-router';
import { HomePage, StudentsPage, SingleStudentPage, SubjectsPage, TestsPage } from './views';

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
      path: '/student/:name/:id',
      name: 'single_students',
      component: SingleStudentPage,
      meta:{
        title: 'Aluno'
      }
    },   
    {
      path: '/subjects',
      name: 'subjects',
      meta:{
        title: 'Materias'
      },
      component: SubjectsPage,
    },   
    {
      path: '/tests',
      name: 'tests',
      meta:{
        title: 'Provas'
      },
      component: TestsPage,
    },   
  ],
});
