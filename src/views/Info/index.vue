<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item label="类型">
            <el-select
              v-model="formInline.typeSelected"
              placeholder="类型"
              style="width: 130px;"
            >
              <el-option
                v-for="option in typeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="date1">
            <el-date-picker
              v-model="formInline.date1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="关键字">
            <el-select
              v-model="formInline.keywordSelected"
              placeholder="关键字"
              style="width: 100px;"
            >
              <el-option
                v-for="option in keywordOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="add-area">
          <el-form-item>
            <el-button type="success" @click="dialogVisible = true"
              >添加</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="45" align="center">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-row :gutter="20" align="middle" style="margin-top: 30px;">
      <el-col :span="2">
        <el-button size="small" @click="handleDeleteSelected"
          >批量删除</el-button
        >
      </el-col>
      <el-col :span="22" class="pagination-bar">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </el-col>
    </el-row>

    <!-- <InfoDialog :dialogVisible="dialogVisible" @close="closeInfoDialog" /> -->
    <!-- .sync 修饰符   子组件通过 this.$emit("update:dialogVisible", false); 修改父组件值-->
    <InfoDialog :dialogVisible.sync="dialogVisible" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted } from "@vue/composition-api";
import InfoDialog from "./dialog/InfoDialog";

export default {
  name: "InfoIndex",
  components: {
    InfoDialog
  },
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    const dialogVisible = ref(false);
    const typeOptions = reactive([
      {
        value: 1,
        label: "国际信息"
      },
      {
        value: 2,
        label: "国内信息"
      },
      {
        value: 3,
        label: "行业信息"
      }
    ]);
    const keywordOptions = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    const formInline = reactive({
      keywordSelected: "id",
      user: "",
      typeSelected: 2,
      date1: ""
    });
    const onSubmit = () => {
      console.log("submit!");
    };

    const tableData = reactive([
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄"
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
      }
    ]);
    const confirmDelete = id => {
      console.log("todo confirmDelete", id);
    };
    const handleEdit = (index, row) => {
      console.log(index, row);
    };
    const handleDelete = (index, row) => {
      console.log(index, row);
      root.confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        fn: confirmDelete,
        id: index
      });
    };
    const handleDeleteSelected = () => {
      root.confirm({
        content: "是否删除选中记录, 是否继续?"
      });
    };

    const closeInfoDialog = () => {
      dialogVisible.value = false;
    };
    return {
      dialogVisible,
      closeInfoDialog,
      typeOptions,
      keywordOptions,
      formInline,
      onSubmit,
      tableData,
      handleEdit,
      handleDelete,
      handleDeleteSelected
    };
  }
};
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
