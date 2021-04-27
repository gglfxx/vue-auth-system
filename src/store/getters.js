const getters = {
  token: state => state.account.token,
  userInfo: state => state.account.userInfo,
  routeMap: state => state.account.routeMap,
  cachePages: state => state.cache.cachePages,
  theme: state => state.setting.theme,
  sideCollapse: state => state.setting.sideCollapse,
  sidebarLogo: state => state.setting.sidebarLogo,
  tagVisible: state => state.setting.tagVisible,
  showSettings: state => state.settings.showSettings,
  style: state => state.setting.style,
  size: state => state.setting.size
}

export default getters
