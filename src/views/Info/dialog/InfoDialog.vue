<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisibleFlag"
    width="30%"
    :before-close="handleClose"
    @close="close"
    @opened="opened"
  >
    <el-form :model="form" ref="addInfoForm">
      <el-form-item label="类型" :label-width="formLabelWidth" prop="category">
        <el-select v-model="form.category" placeholder="请选择活动区域">
          <el-option v-for="item in categoryOptions.items" :label="item.category_name" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="概况" :label-width="formLabelWidth" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleFlag = false">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="submitStatus">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { AddInfo } from '@/api/news'
export default {
  name: 'InfoDailog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: true,
    },
    category: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    let { root, emit, refs } = context
    const dialogVisibleFlag = ref(false)
    const formLabelWidth = ref('70px')
    const submitStatus = ref(false)

    const form = reactive({
      category: '',
      title: '',
      content: '',
    })

    const categoryOptions = reactive({
      items: [],
    })
    // methods
    const submit = () => {
      submitStatus.value = true
      let requestData = {
        category: form.category,
        title: form.title,
        content: form.content,
      }
      AddInfo(requestData)
        .then(response => {
          let { resCode, message } = response.data
          if (resCode === 0) {
            root.$message({
              message: message,
              type: 'success',
            })
          }
          submitStatus.value = false
          dialogVisibleFlag.value = false
          refs.addInfoForm.resetFields()
          console.log(response)
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          submitStatus.value = false
          dialogVisibleFlag.value = false
        })
    }

    const opened = () => {
      console.log('props.category', props.category)
      categoryOptions.items = props.category
    }
    const close = () => {
      // 方法一：
      // 回调要做逻辑处理时使用
      // this.$emit("close");

      // 方法二：
      //  不处理逻辑时可以用.sync修饰符来修改父组件值
      //  父组件通过 .sync 修饰符授权子组件更新父组件值
      //  <InfoDialog :dialogVisible.sync="dialogVisible" />
      emit('update:dialogVisible', false)
    }
    const handleClose = done => {
      root
        .$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    }

    // 监听
    watch(() => {
      dialogVisibleFlag.value = props.dialogVisible
    })
    onMounted(() => {})
    return {
      submitStatus,
      dialogVisibleFlag,
      formLabelWidth,
      form,
      close,
      handleClose,
      opened,
      categoryOptions,
      submit,
    }
  },
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
