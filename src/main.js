// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VModal from 'vue-js-modal';
import Toastr from 'vue-toastr';
import router from './router';
import App from './App';

require('vue-toastr/src/vue-toastr.less');

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VModal);
Vue.component('icon', Icon);
Vue.component('vue-toastr', Toastr);
Vue.config.productionTip = false;

/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
