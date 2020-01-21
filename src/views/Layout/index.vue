<template>
  <div :class="[menuStatus ? 'close' : 'open']">
    <layout-header></layout-header>
    <layout-nav></layout-nav>
    <layout-main></layout-main>
  </div>
</template>

<script>
import { onMounted, computed } from "@vue/composition-api";
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
  setup(props, { root }) {
    const menuStatus = computed(() => {
      return root.$store.state.isCollapse;
    });
    onMounted(() => {});
    return { menuStatus };
  }
};
</script>

<style lang="scss" scoped></style>
