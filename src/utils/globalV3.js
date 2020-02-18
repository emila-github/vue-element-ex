import { MessageBox } from 'element-ui'
import { ref } from '@vue/composition-api'

export function global() {
  const str = ref('')
  const confirm = params => {
    console.log('confirm')
    MessageBox.confirm(params.content, params.tip || '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    })
      .then(() => {
        str.value = '删除'
        params.fn && params.fn(params.datas || {})
        MessageBox({
          type: 'success',
          message: '删除成功!',
        })
      })
      .catch(() => {
        MessageBox({
          type: 'info',
          message: '已取消删除',
        })
      })
  }
  return {
    str,
    confirm,
  }
}
