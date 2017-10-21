// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'vue-awesome/icons';
import $ from 'jquery';
import Icon from 'vue-awesome/components/Icon';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VModal from 'vue-js-modal';
import Toastr from 'vue-toastr';
import router from './router';
import App from './App';

require('vue-toastr/src/vue-toastr.less');
require('jqueryui');

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VModal);
Vue.component('icon', Icon);
Vue.component('vue-toastr', Toastr);
Vue.component('date-picker', {
  template: '<input/>',
  props: ['dateFormat'],
  // eslint-disable-next-line
  mounted: function() {
    const self = this;
    $(this.$el).datepicker({
      dateFormat: this.dateFormat,
      yearRange: '1960:2020',
      changeMonth: true,
      changeYear: true,
      // eslint-disable-next-line
    onSelect: function(date) {
        self.$emit('update-date', date);
      },
    });
  },
  // eslint-disable-next-line
  beforeDestroy: function() {
    $(this.$el).datepicker('hide').datepicker('destroy');
  },
});
Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
