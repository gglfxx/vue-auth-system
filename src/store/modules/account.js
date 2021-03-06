// import api from '@/api'

const account = {
  state: {
    token: sessionStorage.getItem('token'),
    userInfo: {},
    routeMap: []
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
    },
    SET_ROUTE_MAP (state, routeMap) {
      state.routeMap = routeMap
    }
  },
  actions: {
    // 登录获取token
    Login ({ commit }, loginInfo) {
      const username = loginInfo.username.trim()
      const password = loginInfo.password
      return new Promise((resolve, reject) => {
        const token = username + password
        sessionStorage.setItem('token', token)
        commit('SET_TOKEN', token)
        resolve()
        /* api.account.login({
          username,
          password
        }).then(res => {
          const token = res.token
          sessionStorage.setItem('token', token)
          commit('SET_TOKEN', token)
          resolve()
        }).catch((error) => {
          reject(error)
        }) */
      })
    },
    // 通过token获取用户信息
    // 实际开发token放在请求头的Authorization中
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        /* api.account.getUserInfo({
          token: state.token
        }).then(res => {
          commit('SET_USER_INFO', res)
          resolve(res)
        }).catch((error) => {
          reject(error)
        }) */
        const res = {
          username: 'admin',
          name: '管理员',
          gender: '男',
          avatar: 'https://s2.ax1x.com/2019/08/02/edRc1P.jpg',
          mobilePhone: '13812345678',
          email: '13812345678@qq.com',
          roles: ['admin']
        }
        commit('SET_USER_INFO', res)
        resolve(res)
      })
    },
    logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        /*  api.account.logout({
          token: state.token
        }).then(res => {
          commit('SET_TOKEN', '')
          commit('SET_USER_INFO', {})
          commit('SET_ROUTE_MAP', [])
          sessionStorage.clear()
          resolve()
        }).catch((error) => {
          reject(error)
        }) */
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', {})
        commit('SET_ROUTE_MAP', [])
        sessionStorage.clear()
        resolve()
      })
    }
  }
}
export default account
