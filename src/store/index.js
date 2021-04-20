import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import getters from './getters'
import setting from './modules/setting'
import cache from './modules/cache'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account,
    cache,
    setting
  },
  getters
})

export default store
