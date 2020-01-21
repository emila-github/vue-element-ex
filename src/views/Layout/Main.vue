<template>
  <div id="MainWrap">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
#MainWrap {
  height: 100vh;
  background-color: #f7f7f7;
  // position: fixed;
  // top: 75px;
  // left: $navWidth;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // box-sizing: border-box;
  .main-content {
    width: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-left: $navWidth + 30;
    padding-right: 30px;
    -webkit-box-sizing: border-box;
    .content {
      width: 100%;
      height: 100%;
      padding-top: 30px;
      padding-left: 30px;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
}
</style>
