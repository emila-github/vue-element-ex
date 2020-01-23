<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisibleFlag"
    width="30%"
    :before-close="handleClose"
    @close="close"
  >
    <el-form :model="form">
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概况" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleFlag = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisibleFlag = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
export default {
  name: "InfoDailog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { root, emit }) {
    const dialogVisibleFlag = ref(false);
    const formLabelWidth = ref("70px");

    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });

    // 监听
    watch(() => {
      dialogVisibleFlag.value = props.dialogVisible;
    });
    // methods
    const close = () => {
      // 方法一：
      // 回调要做逻辑处理时使用
      // this.$emit("close");

      // 方法二：
      //  不处理逻辑时可以用.sync修饰符来修改父组件值
      //  父组件通过 .sync 修饰符授权子组件更新父组件值
      //  <InfoDialog :dialogVisible.sync="dialogVisible" />
      emit("update:dialogVisible", false);
    };
    const handleClose = done => {
      root
        .$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    };

    return {
      dialogVisibleFlag,
      formLabelWidth,
      form,
      close,
      handleClose
    };
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
