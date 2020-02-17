<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <div class="line"></div>
    <div>
      <el-row>
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category">
              <h4>
                <svg-icon icon-class="category-close"></svg-icon>
                新闻
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="success" round
                    >添加子级</el-button
                  >
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
              <h4>
                <svg-icon icon-class="category-open"></svg-icon>
                新闻
              </h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">
            一级分类编辑
          </h4>
          <el-form label-width="142px" class="form-wrap">
            <el-form-item label="一级分类名称：">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger">确定</el-button>
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
export default {
  name: "InfoCategory",
  // eslint-disable-next-line no-unused-vars
  setup(props) {
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: ""
    });

    return {
      formLabelAlign
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
    h4 {
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
    h4 {
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
