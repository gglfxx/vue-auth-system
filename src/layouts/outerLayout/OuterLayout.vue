<template>
  <div class="outer-layout">
    <div class="outer-layout__header">
      <span>统一认证管理平台</span>
    </div>

    <div class="outer-layout__page">
      <router-view />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .outer-layout {
    min-height: 100vh;
    background: url(~@/assets/images/layout/background.svg) no-repeat fixed center;
    background-size: cover;

    .outer-layout__header {
      padding-top: 60px;
      text-align: center;
      font-size: 32px;
      color: #66b1ff;
    }

    .outer-layout__page {
      width: 440px;
      margin: 60px auto 0;
    }

    .style-setting {
      display: none;
    }
  }
</style>
