
const cache = {
  namespace: true,
  state: {
    // 需要缓存的页面
    cacheViews: [],
    visitedViews: []
  },
  mutations: {
    SET_VISITED_VIEW: (state, view) => {
      /* if (process.env.NODE_ENV === 'development') {
       state.cachePages = []
     } else {
       state.cachePages = pages
     } */
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title,
          affix: view.meta.affix,
          path: view.path,
          name: view.name,
          noCache: view.meta.noCache
        })
      )
    },
    SET_CACHED_VIEW: (state, view) => {
      if (state.cacheViews.includes(view.name)) return
      if (!view.meta.noCache) {
        state.cacheViews.push(view.name)
      }
    }
  },
  actions: {
    addView ({ dispatch }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    addVisitedView ({ commit }, view) {
      commit('SET_VISITED_VIEW', view)
    },
    addCachedView ({ commit }, view) {
      commit('SET_CACHED_VIEW', view)
    }
  }
}
export default cache
