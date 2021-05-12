<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon icon-name="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of options" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  data () {
    return {
      sizeSelectKey: 0,
      options: [
        { label: 'big', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  computed: {
    size () {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize (value) {
      this.$ELEMENT.size = value
      this.sizeSelectKey++
      this.$store.commit('SET_SIZE', value)
      this.$store.commit('SET_CACHE_PAGES', [])
      this.refreshView()
      this.$message({
        message: 'Switch Size Success',
        type: 'success'
      })
    },
    refreshView () {
      // this.$store.dispatch('tagsView/delAllCachedViews', this.$route)
      const { fullPath } = this.$route
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }
}
</script>
