<template>
  <el-select v-model="data.selected" placeholder="关键字类型" style="width: 100px;">
    <el-option v-for="option in data.initOptions" :key="option.value" :label="option.label" :value="option.value">
    </el-option>
  </el-select>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
export default {
  name: 'SelectVue',
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    const data = reactive({
      initOptions: [],
      selected: '',
      options: [
        {
          value: 'id',
          label: 'ID',
        },
        {
          value: 'title',
          label: '标题',
        },
        {
          value: 'name',
          label: '姓名',
        },
        {
          value: 'phone',
          label: '手机号',
        },
        {
          value: 'email',
          label: '邮箱',
        },
      ],
    })
    let initOption = () => {
      let initData = props.config.init
      if (!initData.length) {
        console.log('配置不能为空')
        return false
      }
      let optionArr = []
      initData.forEach(item => {
        let arr = data.options.filter(elem => elem.value === item)
        arr[0] && optionArr.push(arr[0])
      })
      data.initOptions = optionArr
    }
    onMounted(() => {
      initOption()
    })
    return {
      data,
    }
  },
}
</script>

<style lang="scss" scoped></style>
