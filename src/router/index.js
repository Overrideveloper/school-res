import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '../components/LandingPage';
import StudentList from '../components/StudentList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/landing',
      name: 'redirect',
    },
    {
      path: '/landing',
      component: LandingPage,
      name: 'landing',
    },
    {
      path: '/students',
      component: StudentList,
      name: 'students',
    },
  ],
});
