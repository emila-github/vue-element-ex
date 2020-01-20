<template>
  <div id="Main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
#Main {
  position: fixed;
  top: 75px;
  left: $navWidth;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: none;
}
</style>
