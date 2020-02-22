<template>
  <div>
    <el-form :model="datas.ruleForm" :rules="datas.rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="信息分类" prop="category">
        <el-select v-model="datas.ruleForm.categoryId" placeholder="请选择活动区域">
          <el-option v-for="item in categoryOptions.items" :label="item.category_name" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="datas.ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="imageUrl">
        <upload-img :imgUrl.sync="datas.ruleForm.imgUrl"></upload-img>
        <!-- <upload-img :imgUrl.sync="datas.ruleForm.imgUrl" @success="uploadImgSuccess"></upload-img> -->
      </el-form-item>

      <el-form-item label="发布时间" required>
        <el-date-picker type="date" :disabled="true" placeholder="选择日期" v-model="datas.ruleForm.createDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="详细内容" prop="content">
        <quill-editor v-model="datas.ruleForm.content" ref="myQuillEditor" change="onEditorChange($event)">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { common } from '@/api/common'
import { GetList, EditInfo } from '@/api/news'
import UploadImg from '@/components/UploadImg'

import { timestampToTime } from '@/utils/common'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'infoDetailed',
  components: {
    quillEditor,
    UploadImg,
  },
  setup(props, { root }) {
    console.log(root)
    let id = root.$route.query.id
    console.log(id)
    const { category, getCategory } = common()
    const categoryOptions = reactive({
      items: [],
    })

    const datas = reactive({
      ruleForm: {
        categoryId: '',
        title: '',
        content: '',
        createDate: '',
        imgUrl: '',
      },
      rules: {},
    })

    // methods
    // const uploadImgSuccess = val => {
    //   datas.ruleForm.imgUrl = val
    // }
    const submitForm = () => {
      // TODO: validate
      let submitDatas = Object.assign({}, datas.ruleForm, { id })
      EditInfo(submitDatas).then(response => {
        console.log(response)
      })
    }
    const resetForm = formName => {
      root.$refs[formName].resetFields()
    }
    const onEditorChange = ({ quill, html, text }) => {
      console.log('editor change!', quill, html, text)
      datas.ruleForm.content = html
    }
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id,
      }
      GetList(requestData).then(response => {
        console.log(response)
        let responseData = response.data.data.data[0] || {}

        datas.ruleForm = Object.assign({}, response.data.data.data[0], {
          createDate: timestampToTime(responseData.createDate),
        })
      })
    }

    watch(
      () => category.items,
      value => {
        console.log('category.items value', value)
        categoryOptions.items = value
      },
    )

    onMounted(() => {
      getCategory()
      getInfo()
    })
    return {
      datas,
      categoryOptions,
      onEditorChange,
      submitForm,
      resetForm,
      // uploadImgSuccess,
    }
  },
}
</script>

<style lang="scss" scoped></style>
