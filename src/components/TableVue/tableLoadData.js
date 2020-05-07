import { reactive } from '@vue/composition-api'
import { requestUrl } from '@/api/requestUrl'
import { loadTableData } from '@/api/common'
export function tableLoadData() {
  const tableData = reactive({
    items: [],
    total: 0,
  })
  const loadData = params => {
    console.log('todo loadData')
    let { urlKey, method, data: _data } = params.requestData

    let defautlData = {
      pageNumber: 1,
      pageSize: 2,
    }

    let requestData = {
      url: requestUrl[urlKey],
      method,
      data: Object.assign({}, defautlData, _data),
    }

    loadTableData(requestData)
      .then(response => {
        let responseData = response.data.data.data
        if (responseData && responseData.length) {
          tableData.items = responseData
          tableData.total = response.data.data.total
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  return {
    tableData,
    loadData,
  }
}
