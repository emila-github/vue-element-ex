<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { onMounted, computed } from '@vue/composition-api'
export default {
  name: 'svgIcon',
  props: {
    iconClass: {
      type: String,
      default: '',
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    console.log('svgicon props', props)

    const iconName = computed(() => {
      return `#icon-${props.iconClass}`
    })
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      } else {
        return `svg-icon`
      }
    })

    onMounted(() => {})
    return {
      iconName,
      svgClass,
    }
  },
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  // color: red;
  // &.font12 {
  //   font-size: 12px;
  // }
  // &.font24 {
  //   font-size: 24px;
  // }
}
</style>
