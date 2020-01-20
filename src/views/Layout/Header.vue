<template>
  <div id="Header">header</div>
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
  height: 75px;
  background-color: #fff;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
</style>
