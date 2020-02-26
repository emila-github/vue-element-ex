<template>
  <div>
    <el-form :inline="true" :model="data.formInline" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item label="关键字">
            <SelectVue :config="data.configOptions" style="width: 150px;" />
          </el-form-item>

          <el-form-item>
            <el-input v-model="data.formInline.keyword" placeholder="关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="add-area">
          <el-form-item>
            <el-button type="success">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import SelectVue from '@/components/SelectVue'
export default {
  name: 'UserIndex',
  components: {
    SelectVue,
  },
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    const data = reactive({
      configOptions: { init: ['name', 'phone'] },
      formInline: {
        keywordSelected: 'id',
        keyword: '',
      },
    })
    return {
      data,
    }
  },
}
</script>

<style></style>
