import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// 全局注册的组件、指令、过滤器
import * as Icon from './icons'

import '@/assets/styles/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Icon,
  render: h => h(App)
}).$mount('#app')
