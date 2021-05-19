<template>
  <!-- 分页 -->
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :class="`pagination--${position}`"
      :total="total"
      :current-page.sync="currentPage"
      :page-size.sync="pageSizeNum"
      :page-sizes="pageSizes"
      :layout="layout"
      :background="background"
      @size-change="handlePageSizeChange"
      @current-change="handlePageNumberChange">
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
    pageNumber: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50, 1000]
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
        return this.pageNumber
      },
      set (val) {
        this.$emit('update:pageNumber', val)
      }
    },
    pageSizeNum: {
      get () {
        return this.pageSize
      },
      set (val) {
        this.$emit('update:pageSize', val)
      }
    }
  },
  methods: {
    handlePageSizeChange (val) {
      this.$emit('pagination', val)
    },
    handlePageNumberChange (val) {
      this.$emit('pagination', val)
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
