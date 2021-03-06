import config from '@/config'

const setting = {
  state: {
    theme: localStorage.getItem('theme') || config.theme,
    sideCollapse: localStorage.getItem('sideCollapse') ? !!+localStorage.getItem('sideCollapse') : config.sideCollapse, // Boolean(Number('1'))
    tagVisible: localStorage.getItem('tagVisible') ? !!+localStorage.getItem('tagVisible') : config.tagVisible,
    sidebarLogo: localStorage.getItem('sidebarLogo') ? !!+localStorage.getItem('sidebarLogo') : config.sidebarLogo,
    style: localStorage.getItem('style') || config.style,
    size: localStorage.getItem('size') || config.size
  },
  mutations: {
    SET_THEME (state, theme) {
      state.theme = theme
      localStorage.setItem('theme', theme)
    },
    SET_SIDE_COLLAPSE (state, collapse) {
      state.sideCollapse = collapse
      localStorage.setItem('sideCollapse', collapse ? '1' : '0')
    },
    SET_TAG_VISIBLE (state, visible) {
      state.tagVisible = visible
      localStorage.setItem('tagVisible', visible ? '1' : '0')
    },
    SET_STYLE (state, style) {
      state.style = style
      localStorage.setItem('style', style)
    },
    SET_SIZE (state, size) {
      state.size = size
      localStorage.setItem('size', size)
    },
    SET_LOGO (state, sidebarLogo) {
      state.sidebarLogo = sidebarLogo
      localStorage.setItem('sidebarLogo', sidebarLogo ? '1' : '0')
    }
  },
  actions: {
    changeSetting ({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}
export default setting
