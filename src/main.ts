import Vue from 'vue';
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.component('AlertDialog', require('./components/helper').AlertDialog);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
