// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import router from './router';
import App from './App';

require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require("font-awesome-webpack");

Vue.use(BootstrapVue);

/* import VueResource from 'vue-resource'; */

Vue.config.productionTip = false;

/* Vue.use(VueResource); */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
