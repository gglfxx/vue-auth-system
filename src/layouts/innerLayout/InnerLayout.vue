<template>
  <div :class="classObj" class="inner-layout" >
    <!-- 侧边菜单 -->
    <side-bar />

    <div class="inner-layout__main">
      <!-- 顶部工具栏 -->
      <header-bar/>
      <!--导航标签 -->
      <nav-tag v-show="tagVisible"/>

      <div class="inner-layout__page" :class="{'with-navtag':tagVisible}">
        <!-- 路由页面 -->
        <transition name="page" mode="out-in">
          <keep-alive :include="cachePages">
            <router-view :key="key"/>
          </keep-alive>
        </transition>
      </div>
    </div>
    <!-- 系统界面设置 -->
    <right-panel>
      <settings />
    </right-panel>
  </div>
</template>

<script>
import { HeaderBar, SideBar, NavTag, Settings, RightPanel } from './components'
import { mapGetters } from 'vuex'

export default {
  components: {
    HeaderBar,
    SideBar,
    NavTag,
    Settings,
    RightPanel
  },
  computed: {
    ...mapGetters(['tagVisible', 'cachePages']),
    // 创建文章以及所有的编辑文章都是共用的ArticleEdit组件,所以对应的路由不能使用keep-alive缓存。
    // 同时它们使用的也是动态路由，在这些路由之间切换时也需要响应路由参数的变化，当路由参数变化时需要重新渲染。
    key () {
      return this.$route.path
    },
    classObj () {
      return {
        hideSidebar: this.$store.getters.sideCollapse,
        openSidebar: !this.$store.getters.sideCollapse
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inner-layout {
  display: flex;
  height: 100vh;
  overflow-y: hidden;

  .inner-layout__main {
    width: 100%;
    overflow-x: hidden;
    margin-left:$sideBarWidth;
    .inner-layout__page {
      &.with-navtag {
        height: calc(100vh - 90px);
      }

      .page {

        &-enter {
          opacity: 0;
          transform: translateX(-30px);
        }

        &-leave-to {
          opacity: 0;
          transform: translateX(30px);
        }

        &-enter-active,
        &-leave-active {
          transition: all .3s ease;
        }
      }

    }
  }
}
</style>
