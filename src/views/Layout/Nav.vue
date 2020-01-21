<template>
  <div id="NavWrap">
    <img src="../../assets/logo.png" alt="" class="logo" />
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
import { reactive, onMounted, computed } from "@vue/composition-api";
export default {
  name: "navWrap",
  setup(props, { root }) {
    const routers = reactive(root.$router.options.routes);
    console.log(routers);
    // const isCollapse = ref(false);
    // computed 监听
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
    // 函数
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    // // 获取state
    // console.log("==", root.$store.state.isCollapse);
    // console.log("==", root.$store.getters.count);
    // // 设置state
    // root.$store.commit("SET_COUNT", 11);
    // console.log("==", root.$store.state.count);

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
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
  .logo {
    display: block;
    margin: 50px auto;
    width: 92px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
.open {
  #NavWrap {
    width: $navWidth;
  }
}
.close {
  #NavWrap {
    width: $navCloseWidth;
    .logo {
      width: 60%;
    }
  }
}
</style>
