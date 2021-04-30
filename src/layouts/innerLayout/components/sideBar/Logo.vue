<template>
  <div class="side-bar-logo" :class="{'collapse':sideCollapse}">
    <router-link class="sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo">
      <h1 class="sidebar-title">{{ title }} </h1>
    </router-link>
  </div>
</template>

<script>
import logo from '@/assets/images/layout/logo.png'
export default {
  name: 'SidebarLogo',
  data () {
    return {
      title: 'Vue Uam Admin',
      logo: logo
    }
  },
  computed: {
    sideCollapse () {
      return this.$store.getters.sideCollapse
    }
  }
}
</script>

<style lang="scss" scoped>

.side-bar-logo {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #434a50;
  font-size: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  /* 查看element的menu.css源码可知transition的参数 */
  transition: width .3s ease-in-out;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
