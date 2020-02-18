<template>
  <el-dialog title="提示" :visible.sync="dialogVisibleFlag" width="30%" :before-close="handleClose" @close="close">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleFlag = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisibleFlag = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'InfoDailog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-reserved-keys
      dialogVisibleFlag: false,
    }
  },
  watch: {
    dialogVisible: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue, oldValue) {
        this.dialogVisibleFlag = newValue
      },
    },
  },
  methods: {
    close() {
      // 方法一：
      // 回调要做逻辑处理时使用
      // this.$emit("close");

      // 方法二：
      //  不处理逻辑时可以用.sync修饰符来修改父组件值
      //  父组件通过 .sync 修饰符授权子组件更新父组件值
      //  <InfoDialog :dialogVisible.sync="dialogVisible" />
      this.$emit('update:dialogVisible', false)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="sass" scoped></style>
