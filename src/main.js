import Vue from 'vue'
import App from './App.vue'
import router from './router'
import crud from './utils/crud'

Vue.use(crud);

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import vuetify from './plugins/vuetify';

Vue.use(VueMaterial);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

process.on('uncaughtException', function (error) {
  console.error(error);
});
