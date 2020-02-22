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
        <el-upload
          class="avatar-uploader"
          action="http://up-z2.qiniup.com"
          :data="datas.uploadKey"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="datas.ruleForm.imgUrl" :src="datas.ruleForm.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { QiniuToken } from '@/api/common'
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
      uploadKey: {
        token: '',
      },
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

    const handleAvatarSuccess = (res, file) => {
      console.log('handleAvatarSuccess', res, file)
      let url = root.$store.getters['common/qiliuUrl']
      datas.ruleForm.imgUrl = `${url}${res.key}`
      // datas.ruleForm.imageUrl = URL.createObjectURL(file.raw)
    }
    const beforeAvatarUpload = file => {
      console.log(file)

      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        root.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        root.$message.error('上传头像图片大小不能超过 2MB!')
      }

      // // 文件名转码
      // let suffix = file.name
      // let key = encodeURI(`${suffix}`)
      // datas.uploadKey.key = key
      return isJPG && isLt2M
    }

    const getQiniuToken = () => {
      let requestData = {
        accesskey: 'BbzrvOfIsOfO_mxtIVO9sj_hpGdks80M-mDGAJfD', // 密钥AK*
        secretkey: '068lng5NGS92d9Ejq9GzExEN6-I-W1eUijONMdWm', //密钥SK*
        buckety: '17173', //空间名称*
      }
      QiniuToken(requestData).then(response => {
        console.log('QiniuToken', response)
        datas.uploadKey.token = response.data.data.token
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
      getQiniuToken()
    })
    return {
      datas,
      categoryOptions,
      onEditorChange,
      submitForm,
      resetForm,
      handleAvatarSuccess,
      beforeAvatarUpload,
    }
  },
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
