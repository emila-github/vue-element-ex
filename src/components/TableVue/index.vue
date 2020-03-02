<template>
  <el-table
    ref="multipleTable"
    :data="data.tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="data.tableConfig.selection" type="selection" width="45" align="center"> </el-table-column>
    <template v-for="col in data.tableConfig.tHead">
      <!-- v-slot -->
      <el-table-column
        v-if="col.columnType === 'slot'"
        :key="col.field"
        :prop="col.field"
        :label="col.label"
        :width="col.width"
      >
        <template slot-scope="scope">
          <slot :name="col.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- 文本数据渲染 -->
      <el-table-column v-else :key="col.field" :prop="col.field" :label="col.label" :width="col.width">
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted, watch, onBeforeMount } from '@vue/composition-api'

import { tableLoadData } from './tableLoadData'
export default {
  name: 'TableVue',
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    const { loadData, tableData } = tableLoadData()
    const data = reactive({
      tableConfig: {
        // 请求接口URL及配置
        requestData: {},
        // 多选框
        selection: false,
        // 表头
        tHead: [],
      },
      tableData: [
        {
          email: '11@qq.com',
          name: '王小虎1',
          phone: 13400000000,
          address: '上海市普陀区金沙江路 1518 弄',
          role: '超管',
          status: true,
        },
        {
          email: '11@qq.com',
          name: '王小虎2',
          phone: 13400000000,
          address: '上海市普陀区金沙江路 1518 弄',
          role: '超管',
          status: false,
        },
      ],
      multipleSelection: [],
    })

    // methods:
    const toggleSelection = rows => {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
    const handleSelectionChange = val => {
      this.multipleSelection = val
    }

    const initTableConfig = () => {
      let configData = props.config
      let keys = Object.keys(data.tableConfig)

      for (let key in configData) {
        if (keys.includes(key)) {
          data.tableConfig[key] = configData[key]
        }
      }
    }

    watch(
      () => tableData.items,
      (newValue, oldValue) => {
        console.log(newValue, oldValue)
        data.tableData = newValue
      },
    )

    onBeforeMount(() => {
      initTableConfig()
      loadData(data.tableConfig)
    })

    return {
      data,
      toggleSelection,
      handleSelectionChange,
    }
  },
}
</script>

<style></style>
