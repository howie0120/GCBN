import Vue from 'vue'
import App from './App.vue'
import router from './router/route';
import store from './store'

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/icons'
import '../styles/index.scss'

Vue.use(ElementUI, {locale})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

