<template>
  <div class="header-bar">
    <i class="header-bar__collapse" :class="sideCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
       @click="handleCollapse"></i>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="header-bar__menu">
      <full-screen class="right-menu-item"/>
      <theme-setting class="right-theme-item"/>
      <el-tooltip content="布局大小" effect="dark" placement="bottom">
        <size-setting id="size-setting" class="right-menu-item hover-effect" />
      </el-tooltip>
      <el-dropdown @command="handleCommand" class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <img class="avatar" :src="userInfo.avatar" alt/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/mine">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import FullScreen from '@/components/fullScreen/FullScreen'
import ThemeSetting from '@/components/setting/themeSetting/ThemeSetting'
import { resetRouter } from '@/router'
import SizeSetting from '@/components/setting/sizeSetting/SizeSetting'

export default {
  components: {
    FullScreen,
    ThemeSetting,
    SizeSetting,
    Breadcrumb
  },
  data () {
    return {
      avatar: ''
    }
  },
  computed: {
    ...mapGetters(['sideCollapse', 'userInfo'])
  },
  methods: {
    // 折叠侧边栏
    handleCollapse () {
      this.$store.commit('SET_SIDE_COLLAPSE', !this.sideCollapse)
    },
    // 退出登录
    handleCommand (command) {
      if (command === 'logout') {
        this.$store.dispatch('logout').then(() => {
          resetRouter()
          this.$router.replace('/account/login')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-bar {
  height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 2px 1px -1px rgba(0, 0, 0, 0.1);
  background: #fff;
  overflow: hidden;
  position: relative;

  .header-bar__collapse {
    line-height: 46px;
    height: 100%;
    float: left;
    font-size:24px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    padding: 0px 15px;
    &:hover {
      color: $auxiliary-text-color;
    }
  }
  .right-theme-item {
    padding: 0 8px;
  }
  .el-color-picker {
    transform: translate(0, -8px);
  }

  .header-bar__menu {
    float: right;
    height: 100%;
    line-height: 50px;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
    .avatar-container{
      margin-right: 30px;
    }
  }
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
    margin-bottom: 5px;
    &.hover-effect {
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }
}
</style>
