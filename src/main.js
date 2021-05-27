import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import dayjs from 'dayjs'

// 全局注册的组件、指令、过滤器
import * as Icon from './icons'

import '@/assets/styles/app.scss'

Vue.config.productionTip = false

// 模拟数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../src/mock')
  mockXHR()
}

Object.defineProperty(Vue.prototype, '$dayjs', {
  value: dayjs
})

new Vue({
  router,
  store,
  Icon,
  render: h => h(App)
}).$mount('#app')
