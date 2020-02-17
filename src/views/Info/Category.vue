<template>
  <div id="category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <div class="line"></div>
    <div>
      <el-row>
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category" v-for="item in category.datas" :key="item.id">
              <div class="h4">
                <svg-icon icon-class="category-open"></svg-icon>
                {{ item.category_name }}
                <div class="button-group">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="
                      editCategory({
                        categoryName: item.category_name
                      })
                    "
                    round
                    >编辑</el-button
                  >
                  <el-button size="mini" type="success" round
                    >添加子级</el-button
                  >
                  <el-button size="mini" @click="deleteCategory(item.id)" round
                    >删除</el-button
                  >
                </div>
              </div>
              <ul v-if="item.children && item.children.length">
                <li v-for="cItem in item.children" :key="cItem.id">
                  {{ cItem.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="menu-title">
            一级分类编辑
          </div>
          <el-form
            label-width="142px"
            class="form-wrap"
            :model="form"
            ref="ruleForm"
          >
            <el-form-item label="一级分类名称：" v-if="categoryFirstInput">
              <el-input
                v-model="form.categoryName"
                :disabled="categoryFirstInputDisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" v-if="categoryChildrenInput">
              <el-input
                v-model="form.resecCategoryName"
                :disabled="categoryChildrenInputDisabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="submitLoadingStatus"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { AddFirstCategory, GetCategory, DeleteCategory } from "@/api/news";
import { global } from "@/utils/globalV3";
export default {
  name: "InfoCategory",
  // eslint-disable-next-line no-unused-vars
  setup(props, { root, refs }) {
    const { confirm } = global();
    const form = reactive({
      categoryName: "",
      resecCategoryName: ""
    });

    const category = reactive({
      datas: [
        // {
        //   id: 1,
        //   category_name: "国际信息",
        //   children: [
        //     {
        //       id: 11,
        //       category_name: "国际信息1"
        //     },
        //     {
        //       id: 12,
        //       category_name: "国际信息2"
        //     }
        //   ]
        // }
      ]
    });

    const categoryFirstInput = ref(true);
    const categoryChildrenInput = ref(false);
    const submitLoadingStatus = ref(false);
    const categoryFirstInputDisabled = ref(true);
    const categoryChildrenInputDisabled = ref(true);

    const submit = () => {
      if (!form.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      submitLoadingStatus.value = true;
      AddFirstCategory({ categoryName: form.categoryName })
        .then(response => {
          console.log(response);
          if (response.data.resCode === 0) {
            root.$message({
              message: response.data.message,
              type: "success"
            });
            category.datas.push(response.data.data);
            submitLoadingStatus.value = false;
            // refs.ruleForm.resetFields();

            form.categoryName = "";
            form.resecCategoryName = "";
          }
        })
        .catch(error => {
          console.log(error);
          submitLoadingStatus.value = false;
          form.categoryName = "";
          form.resecCategoryName = "";
        });
    };
    const addFirst = () => {
      categoryFirstInput.value = true;
      categoryChildrenInput.value = false;
      categoryFirstInputDisabled.value = false;
      categoryChildrenInputDisabled.value = true;
    };

    const getCategory = () => {
      GetCategory().then(response => {
        console.log(response);
        category.datas = response.data.data.data;
      });
    };

    const deleteCategory = id => {
      console.log("deleteCategory");
      confirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        fn: datas => {
          DeleteCategory({ categoryId: datas.id })
            .then(response => {
              console.log(response);
              // 索引删除法
              // const index = category.datas.findIndex(item => item.id === id);
              // if (index !== -1) {
              //   category.datas.splice(index, 1);
              // }

              // 过滤法删除
              category.datas = category.datas.filter(item => item.id !== id);

              root.$message({
                message: response.data.message,
                type: "success"
              });
            })
            .catch(error => {
              console.log(error);
            });
        },
        datas: { id }
      });
    };

    const editCategory = ({ categoryName: name }) => {
      console.log("editCategory", name);
      categoryFirstInput.value = true;
      categoryChildrenInput.value = false;
      categoryFirstInputDisabled.value = false;
      categoryChildrenInputDisabled.value = true;
      form.categoryName = name;
    };

    onMounted(() => {
      getCategory();
    });

    return {
      form,
      submit,
      submitLoadingStatus,
      addFirst,
      categoryFirstInput,
      categoryChildrenInput,
      categoryFirstInputDisabled,
      categoryChildrenInputDisabled,
      category,
      deleteCategory,
      editCategory
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.line {
  width: calc(100% + 60px);
  height: 1px;
  margin: 30px 0;
  margin-left: -30px;
  background-color: #e9e9e9;
}
.category-wrap {
  cursor: pointer;
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 20px;
    }
  }
  .category {
    line-height: 44px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: 22px;
      top: 0;
      bottom: 0;
      width: 32px;
      border-left: 1px dotted #000;
    }
    .h4 {
      padding-left: 40px;
      position: relative;
    }
    svg {
      position: absolute;
      left: 16px;
      top: 15px;
      font-size: 14px;
      background-color: #fff;
    }
    li {
      list-style: none;
      padding-left: 36px;
      margin-left: 24px;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        left: 0px;
        top: 23px;
        width: 32px;
        border-bottom: 1px dotted #000;
      }
    }
    li,
    .h4 {
      @include webkit(transition, all 0.3s ease 0s);
      &:hover {
        background-color: #f3f3f3;
        .button-group {
          display: block;
        }
      }
    }
  }
  .button-group {
    display: none;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 11px;
    button {
      font-size: 12px;
    }
  }
}

.menu-title {
  line-height: 44px;
  padding-left: 20px;
  background-color: #f3f3f3;
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
</style>
