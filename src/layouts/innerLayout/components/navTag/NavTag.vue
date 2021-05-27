<template>
  <!-- 导航标签，同时负责缓存页面 -->
  <scrollbar>
    <div class="nav-tag">
      <div
        class="nav-tag__item"
        :class="{active:isTagActive(tag.path)}"
        v-for="(tag, index) in tagList"
        :key="tag.path"
        @dblclick="handleClose(index)">
        <router-link class="link" :to="tag.path">{{ tag.title }}</router-link>
        <i v-if="!isAffix(tag)" class="el-icon-circle-close close" @click="handleClose(index)"></i>
      </div>
    </div>
  </scrollbar>
</template>

<script>
import Scrollbar from '@/components/scrollbar/Scrollbar'
import bus from '@/utils/bus'

export default {
  components: {
    Scrollbar
  },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    tagList () {
      return this.$store.getters.visitedViews
    }
  },
  watch: {
    $route (route) {
      this.addTag(route)
    }
  },
  created () {
    this.addTag(this.$route)
    bus.$on('closeTag', (path) => {
      const tagIndex = this.tagList.findIndex(tag => tag.path === path)
      this.tagList.splice(tagIndex, 1)
    })
  },
  methods: {
    isTagActive (path) {
      return this.$route.path === path
    },
    isAffix (tag) {
      return tag.affix
    },
    // 添加标签
    addTag (route) {
      const tagExist = this.tagList.some(item => item.path === route.path)
      // 路由名称存在才在tag栏中显示，比如Reload路由没设置name，就不显示tag。
      if (!tagExist && route.name) {
        this.tagList.push({
          title: route.meta.title,
          affix: route.meta.affix,
          path: route.path,
          name: route.name,
          noCache: route.meta.noCache
        })
        this.$store.dispatch('addView', route)
      }
    },
    // 关闭标签
    handleClose (index) {
      // tagList中只有首页时不关闭首页
      if (this.tagList.length === 1 && this.tagList[0].path === '/authSys') return false
      const delTag = this.tagList.splice(index, 1)[0]
      // 判断关闭的tag的下一个tag存不存在，存在就跳到下一个tag，不存在就跳到上一个tag。
      const toTag = this.tagList[index] ? this.tagList[index] : this.tagList[index - 1]
      if (toTag) {
        // 只有关闭的是当前页面才进行跳转
        delTag.path === this.$route.path && this.$router.push(toTag.path)
      } else {
        // 如果上一个tag也不存在就跳到首页(也就是关闭完所有tag了)
        this.$router.push('/authSys')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-wrap {
  height: 40px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}

.nav-tag {
  display: flex;
  height: 40px;
  box-sizing: border-box;
  padding: 5px 10px;
  white-space: nowrap;

  .nav-tag__item {
    padding: 5px 10px;
    border-radius: 4px;
    border: $base-border;
    background-color: var(--theme-white__9);
    color: #409eff;

    & + .nav-tag__item {
      margin-left: 10px;
    }
    &.active {
      background-color: #42b983;
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 3px;
      }
    }
    .link {
      display: inline-block;
      font-size: 12px;
      margin-right: 5px;

      /*&:hover {
        color: $auxiliary-text-color !important;
      }*/
    }

    .close {
      color: var(--theme);
      cursor: pointer;

      &:hover {
        color: $auxiliary-text-color;
      }
    }

    &.active {
      background-color: var(--theme);

      .link,
      .close {
        color: #fff;

        &:hover {
          color: $auxiliary-text-color;
        }
      }
    }
  }
}
</style>
