<template>
  <div class="outer-layout">
    <div class="outer-layout__header">
      <svg-icon icon-name="logo" />
      <span>统一用户认证系统</span>
    </div>

    <div class="outer-layout__page">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .outer-layout {
    min-height: 100vh;
    background: url(~@/assets/images/layout/outer_bg.jpg) no-repeat fixed center;
    background-size: cover;

    .outer-layout__header {
      padding-top: 60px;
      text-align: center;
      font-size: 32px;
      color: #fff;
    }

    .outer-layout__page {
      width: 440px;
      margin: 60px auto 0;
    }
  }
</style>
