import { GetCategory } from '@/api/news'
import { reactive } from '@vue/composition-api'
import service from '@/utils/request'

export function common() {
  const category = reactive({
    items: [],
  })
  // 获取分类
  const getCategory = () => {
    GetCategory({}).then(response => {
      category.items = response.data.data.data
    })
  }

  return {
    category,
    getCategory,
  }
}

// 获取七牛云token
export function QiniuToken(data) {
  return service.request({
    method: 'post',
    url: '/uploadImgToken/',
    data: data,
  })
}

// 请求表格数据
export function loadTableData(params) {
  let { method = 'post', url = '', data = {} } = params
  return service.request({
    method: method,
    url: url,
    data: data,
  })
}
