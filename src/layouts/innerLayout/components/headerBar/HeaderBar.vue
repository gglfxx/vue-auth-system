<template>
  <div class="header-bar">
    <i class="header-bar__collapse" :class="sideCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
       @click="handleCollapse"></i>
    <div class="header-bar__menu">
      <full-screen/>
      <theme-setting />
      <el-tooltip content="Global Size" effect="dark" placement="bottom">
        <size-setting id="size-setting" class="right-menu-item hover-effect" />
      </el-tooltip>
      <el-dropdown @command="handleCommand">
        <img class="avatar" :src="userInfo.avatar" alt/>
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
import FullScreen from '@/components/fullScreen/FullScreen'
import ThemeSetting from '@/components/setting/themeSetting/ThemeSetting'
import { resetRouter } from '@/router'
import SizeSetting from '@/components/setting/sizeSetting/SizeSetting'

export default {
  components: {
    FullScreen,
    ThemeSetting,
    SizeSetting
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
  line-height: 50px;
  padding-right: 40px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
  0 2px 1px -1px rgba(0, 0, 0, 0.12);
  background-color: var(--theme);

  .header-bar__collapse {
    color: #fff;
    font-size: 24px;
    margin-left: 16px;
    cursor: pointer;

    &:hover {
      color: $auxiliary-text-color;
    }
  }

  .el-color-picker {
    transform: translate(-10px, -3px);
  }

  .header-bar__menu {
    box-sizing: border-box;
    float: right;
    height: 50px;
    padding: 5px;

    .el-dropdown {
      height: 40px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
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
