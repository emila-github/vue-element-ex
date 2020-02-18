<template>
  <div id="HeaderWarp">
    <div @click="handlerNarBar">
      <svg-icon class="nav-bar-icon" iconClass="menu" className="menu"></svg-icon>
    </div>

    <div class="header-right">
      <div class="user-info" @click="test">{{ username }}</div>
      <div @click="handlerExit" class="close-icon">
        <svg-icon iconClass="close" className="console"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed } from '@vue/composition-api'
export default {
  name: 'headerWarp',
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    const username = computed(() => root.$store.state.app.username)
    const handlerNarBar = () => {
      root.$store.commit('app/SET_COLLAPSE')
      // root.$store.dispatch("setMenuStatus", { test: "test1" });
    }
    const handlerExit = () => {
      root.$store.dispatch('app/exit').then(() => {
        root.$router.push({
          name: 'loginV3',
        })
      })
    }
    const test = () => {
      console.log('test')
    }
    onMounted(() => {})
    return {
      username,
      handlerNarBar,
      handlerExit,
      test,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../styles/config.scss';

#HeaderWarp {
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
.open {
  #HeaderWarp {
    left: $navWidth;
  }
}
.close {
  #HeaderWarp {
    left: $navCloseWidth;
  }
}
</style>
