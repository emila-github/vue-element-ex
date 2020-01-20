<template>
  <div>
    <layout-header></layout-header>
    <layout-nav></layout-nav>
    <layout-main></layout-main>
  </div>
</template>

<script>
import LayoutHeader from "./Header";
import LayoutMain from "./Main";
import LayoutNav from "./Nav";
export default {
  name: "layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  setup() {}
};
</script>

<style lang="scss" scoped></style>
