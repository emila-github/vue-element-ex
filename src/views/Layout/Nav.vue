<template>
  <div id="NavWrap">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      :router="true"
    >
      <template v-for="item in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="item.path">
          <template slot="title">
            <svg-icon
              :iconClass="item.meta.icon"
              className="menu font24"
            ></svg-icon>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item :key="subItem.id" :index="subItem.path"
              >{{ subItem.meta.name }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
  name: "navWrap",
  setup(props, { root }) {
    const routers = reactive(root.$router.options.routes);
    console.log(routers);
    const isCollapse = ref(false);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    // 生命周期挂在完成后
    onMounted(() => {
      console.log("onMounted 生命周期挂在完成后");
    });
    return {
      routers,
      isCollapse,
      handleOpen,
      handleClose
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
#NavWrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navWidth;
  height: 100vh;
  background-color: #344a5f;
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>
