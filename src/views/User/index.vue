<template>
  <div>
    <el-form :inline="true" :model="data.formInline" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="22">
          <!-- <el-form-item label="生命周期示例">
            <IndexLife />
          </el-form-item> -->
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
    <TableVue :config="data.configTable">
      <template v-slot:status="slotData">
        <el-switch v-model="slotData.data.status" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button size="mini" @click="handleEdit(slotData.$index, slotData.data)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(slotData.data)">删除</el-button>
      </template>
    </TableVue>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
// import IndexLife from '@/components/indexLife'
import SelectVue from '@/components/SelectVue'
import TableVue from '@/components/TableVue'
export default {
  name: 'UserIndex',
  components: {
    // IndexLife,
    SelectVue,
    TableVue,
  },
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    const data = reactive({
      configOptions: { init: ['name', 'phone'] },
      formInline: {
        keywordSelected: 'id',
        keyword: '',
      },
      configTable: {
        requestData: {
          urlKey: 'getUserList',
          method: 'post',
          data: {},
        },
        selection: true,
        tHead: [
          {
            label: '邮箱/用户名',
            field: 'email',
            width: 120,
          },
          {
            label: '真实姓名',
            field: 'name',
          },
          {
            label: '手机号',
            field: 'phone',
          },
          {
            label: '地址',
            field: 'address',
          },
          {
            label: '角色',
            field: 'role',
          },
          {
            label: '禁启用状态',
            field: 'status',
            columnType: 'slot',
            slotName: 'status',
          },
          {
            label: '操作',
            field: 'operation',
            columnType: 'slot',
            slotName: 'operation',
            width: 200,
          },
        ],
      },
    })
    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
    }

    return {
      data,
      handleEdit,
      handleDelete,
    }
  },
}
</script>

<style></style>
