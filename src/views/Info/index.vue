<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item label="类型">
            <el-select v-model="formInline.typeSelected" placeholder="类型" style="width: 130px;">
              <el-option
                v-for="option in typeOptions.item"
                :key="option.id"
                :label="option.category_name"
                :value="option.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="date1">
            <el-date-picker
              v-model="formInline.date1"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="关键字">
            <el-select v-model="formInline.keywordSelected" placeholder="关键字类型" style="width: 100px;">
              <el-option
                v-for="option in keywordOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="formInline.keyword" placeholder="关键字"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="add-area">
          <el-form-item>
            <el-button type="success" @click="dialogVisible = true">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      :data="tableData.item"
      border
      style="width: 100%"
      v-loading="loadingData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" align="center"> </el-table-column>
      <el-table-column prop="title" label="标题" width="120"> </el-table-column>
      <el-table-column prop="createDate" :formatter="toTime" label="创建时间" width="100"> </el-table-column>
      <el-table-column prop="category" :formatter="toCategory" label="类型" width="100"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <router-link
            class="margin-left-10 margin-right-10"
            :to="{ name: 'InfoDetailed', query: { id: scope.row.id } }"
          >
            <el-button size="mini">编辑详情</el-button>
          </router-link> -->
          <el-button size="mini" @click="toDetailedPage(scope.row)">编辑详情</el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row :gutter="20" align="middle" style="margin-top: 30px;">
      <el-col :span="2">
        <el-button size="small" @click="handleDeleteSelected">批量删除</el-button>
      </el-col>
      <el-col :span="22" class="pagination-bar">
        <el-pagination
          background
          layout="total, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.currentPage"
          :total="total"
          :page-size="page.pageSize"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- <InfoDialog :dialogVisible="dialogVisible" @close="closeInfoDialog" /> -->
    <!-- .sync 修饰符   子组件通过 this.$emit("update:dialogVisible", false); 修改父组件值-->
    <InfoDialog :dialogVisible.sync="dialogVisible" :category="typeOptions.item" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { GetList, DeleteInfo } from '@/api/news'
import InfoDialog from './dialog/InfoDialog'
import { global } from '@/utils/globalV3'
// eslint-disable-next-line no-unused-vars
import { timestampToTime } from '@/utils/common'
import { common } from '@/api/common'

export default {
  name: 'InfoIndex',
  components: {
    InfoDialog,
  },
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    const { str, confirm } = global()
    const { category, getCategory } = common()
    const total = ref(0)
    const page = reactive({
      pageSize: 2,
      currentPage: 1,
    })
    let currentSelectionIds = ref([])
    const loadingData = ref(false)

    watch(() => {
      console.log('str.value', str.value)
    })

    const dialogVisible = ref(false)
    const typeOptions = reactive({
      item: [
        {
          id: 1,
          category_name: '国际信息',
        },
        {
          id: 2,
          category_name: '国内信息',
        },
        {
          id: 3,
          category_name: '行业信息',
        },
      ],
    })
    const keywordOptions = reactive([
      {
        value: 'id',
        label: 'ID',
      },
      {
        value: 'title',
        label: '标题',
      },
    ])
    const formInline = reactive({
      keywordSelected: 'id',
      keyword: '',
      typeSelected: null,
      date1: '',
    })
    const onSearch = () => {
      console.log('onSearch!', formInline)
      getList()
    }
    // TODO:search data
    // const formatSearchData = () => {
    //   let requestData = {}
    //   return requestData
    // }
    const tableData = reactive({
      item: [
        {
          createDate: '2016-05-02',
          title: '王小虎',
          content: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    })
    const toDetailedPage = row => {
      root.$router.push({
        name: 'InfoDetailed',
        query: {
          id: row.id,
        },
      })
    }
    const confirmDelete = datas => {
      console.log('todo confirmDelete', datas.ids)
      DeleteInfo({ id: datas.ids }).then(response => {
        let { resCode, message } = response.data
        if (resCode === 0) {
          root.$message({
            message: message,
            type: 'success',
          })
          currentSelectionIds.value = []
          getList()
        }
        console.log(response)
      })
    }
    const handleEdit = (index, row) => {
      console.log(index, row)
    }
    const handleDelete = (index, row) => {
      console.log(index, row)
      confirm({
        content: '此操作将永久删除该文件, 是否继续?',
        tip: '警告',
        fn: confirmDelete,
        datas: { ids: [row.id] },
      })
      // root.confirm({
      //   content: "此操作将永久删除该文件, 是否继续?",
      //   tip: "警告",
      //   fn: confirmDelete,
      //   id: index
      // });
    }
    const handleDeleteSelected = () => {
      if (!currentSelectionIds.value || !currentSelectionIds.value.length) {
        root.$message({
          message: '请选择要删除的数据',
          type: 'error',
        })
        return false
      }
      root.confirm({
        content: '是否删除选中记录, 是否继续?',
        fn: confirmDelete,
        datas: { ids: currentSelectionIds.value },
      })
    }

    const handleSelectionChange = val => {
      let ids = val.map(item => item.id)
      currentSelectionIds.value = ids
      console.log(val, ids)
      return ids
    }

    const closeInfoDialog = () => {
      dialogVisible.value = false
    }
    const getList = () => {
      loadingData.value = true
      let requestData = {
        categoryId: '',
        startTime: '',
        endTime: '',
        title: '',
        id: '',
        pageNumber: page.currentPage,
        pageSize: page.pageSize,
      }
      GetList(requestData).then(response => {
        console.log(response)
        loadingData.value = false
        total.value = response.data.data.total
        tableData.item = response.data.data.data
      })
    }

    const handleSizeChange = val => {
      page.pageSize = val
      page.currentPage = 1
      getList()
      console.log(`每页 ${val} 条`)
    }
    const handleCurrentChange = val => {
      page.currentPage = val
      getList()
      console.log(`当前页: ${val}`)
    }
    // eslint-disable-next-line no-unused-vars
    const toTime = (row, column, cellValue, index) => {
      return timestampToTime(row.createDate)
    }
    const toCategory = row => {
      let findItem = typeOptions.item.find(item => item.id === row.categoryId)
      if (findItem && findItem.category_name) {
        return findItem.category_name
      } else {
        return row.categoryId
      }
    }
    watch(
      () => category.items,
      value => {
        console.log('category.items value', value)
        typeOptions.item = value
      },
    )

    onMounted(() => {
      getList()
      getCategory()
    })
    return {
      loadingData,
      total,
      page,
      dialogVisible,
      closeInfoDialog,
      typeOptions,
      keywordOptions,
      formInline,
      onSearch,
      tableData,
      toDetailedPage,
      handleEdit,
      handleDelete,
      handleDeleteSelected,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      toTime,
      toCategory,
    }
  },
}
</script>

<style lang="scss" scoped>
.add-area {
  display: flex;
  justify-content: flex-end;
}
.pagination-bar {
  display: flex;
  justify-content: flex-end;
}
</style>
