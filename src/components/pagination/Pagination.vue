<template>
  <!-- 分页 -->
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :class="`pagination--${position}`"
      :total="total"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :background="background"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    position: {
      validator: function (value) {
        return ['left', 'center', 'right'].includes(value)
      },
      default: 'center'
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handlePageSizeChange (val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },
    handleCurrentChange (val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
