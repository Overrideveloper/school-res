// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import LandingPage from './components/LandingPage';
import App from './App';

require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss');

Vue.use(BootstrapVue);
Vue.component('icon', Icon);

/* import VueResource from 'vue-resource'; */

Vue.config.productionTip = false;

/* Vue.use(VueResource); */

/* eslint-disable no-new */

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: LandingPage,
    },
  ],
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
