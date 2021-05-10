<template>
  <div class="outer-layout">
    <div class="outer-layout__page">
      <div class="outer-layout__header">
        <span>统一认证管理平台</span>
      </div>
      <div class="login-form">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .outer-layout {
    width: 100%;
    min-height: 100vh;
    background: url(~@/assets/images/layout/background.svg) no-repeat fixed center;
    background-size: cover;

    .outer-layout__header {
      text-align: center;
      font-size: 32px;
      color: #66b1ff;
    }

    .outer-layout__page {
      width: 440px;
      padding: 100px 35px 0;
      margin: 0 auto;
      max-width: 100%;
      .login-form{
        padding-top:50px;
      }
    }

    .style-setting {
      display: none;
    }
  }
</style>
