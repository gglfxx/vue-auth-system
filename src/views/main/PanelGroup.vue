<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="grid in grids" :key="grid.name">
      <div class="card-panel" @click="handleSetLineChartData(grid.type)">
        <div class="card-panel-icon-wrapper" :class="grid.className">
          <svg-icon :icon-name="grid.icon" class="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ grid.name }}
          </div>
          <count-to :start-val="0" :endVal="grid.number" :duration="grid.duration" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
// import api from '@/api'
export default {
  components: {
    CountTo
  },
  created () {
    this.getGridData()
  },
  data () {
    return {
      grids: [{
        type: 'visits',
        icon: 'peoples',
        className: 'icon-people',
        name: '访问量',
        number: 102400,
        duration: 2600
      }, {
        type: 'messages',
        icon: 'message',
        className: 'icon-message',
        name: '评论数量',
        duration: 3000,
        number: 81212
      }, {
        type: 'purchases',
        icon: 'money',
        className: 'icon-money',
        name: '商品数量',
        duration: 3200,
        number: 9280
      }, {
        type: 'shopping',
        icon: 'shopping',
        className: 'icon-shopping',
        name: '购买数量',
        duration: 3600,
        number: 13600
      }]
    }
  },
  methods: {
    handleSetLineChartData (type) {
      this.$emit('handleSetLineChartData', type)
    }/*,
    async getGridData () {
      const data = await api.dashboard.getGridData()
      this.grids.forEach((item, index) => {
        item.number = Object.values(data)[index]
      })
    } */
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
