<template>
  <div id="Header">
    <svg-icon class="nav-bar-icon" iconClass="menu" className="menu"></svg-icon>
    <div class="header-right">
      <div class="user-info">管理员</div>
      <svg-icon
        class="close-icon"
        iconClass="close"
        className="console"
      ></svg-icon>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";

#Header {
  position: fixed;
  top: 0;
  left: $navWidth;
  right: 0;
  height: $layoutHeader;
  background-color: #fff;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav-bar-icon {
    margin-left: 32px;
    font-size: 30px;
    cursor: pointer;
  }

  .header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;

    .user-info {
      border-right: 1px solid #ededed;
      height: 100%;
      padding-right: 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 30px;

      + .close-icon {
        font-size: 30px;
        margin-right: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
