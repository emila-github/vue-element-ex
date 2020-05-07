import { reactive } from '@vue/composition-api'
export function paginationHook() {
  const pageData = reactive({
    currentPage: 1,
    pageSize: 2,
    pageSizes: [2, 4, 6, 10],
    total: 0,
  })

  const totalCount = val => {
    pageData.total = val
  }

  const handleSizeChange = val => {
    pageData.pageSize = val
    console.log(`每页 ${val} 条`)
  }
  const handleCurrentChange = val => {
    pageData.currentPage = val
    console.log(`当前页: ${val}`)
  }
  return {
    pageData,
    totalCount,
    handleSizeChange,
    handleCurrentChange,
  }
}
