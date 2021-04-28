<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统布局配置</h3>
      <div class="drawer-item">
        <span>导航标签</span>
        <el-switch v-model="tagVisible" class="drawer-switch"/>
      </div>
      <div class="drawer-item">
        <span>侧边栏 Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch"/>
      </div>
      <div class="drawer-item">
        <span>系统风格</span>
        <style-setting/>
      </div>
      <div class="drawer-item">
        <span>元素大小</span>
        <size-setting/>
      </div>
    </div>
  </div>
</template>

<script>
import StyleSetting from '@/components/setting/styleSetting/StyleSetting'
import SizeSetting from '@/components/setting/sizeSetting/SizeSetting'

export default {
  components: {
    StyleSetting,
    SizeSetting
  },
  data () {
    return {}
  },
  computed: {
    tagVisible: {
      get () {
        return this.$store.getters.tagVisible
      },
      set (val) {
        /* this.$store.dispatch('setting/changeSetting', {
          key: 'SET_TAG_VISIBLE',
          value: val
        }) */
        this.$store.commit('SET_TAG_VISIBLE', val)
      }
    },
    sidebarLogo: {
      get () {
        return this.$store.getters.sidebarLogo
      },
      set (val) {
        // 异步操作请求
        /* this.$store.dispatch('setting/changeSetting', {
          key: 'SET_LOGO',
          value: val
        }) */
        // 同步操作
        this.$store.commit('SET_LOGO', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
