import { GetCategory } from "@/api/news";
import { reactive } from "@vue/composition-api";

export function common() {
  const category = reactive({
    items: []
  });
  // 获取分类
  const getCategory = () => {
    GetCategory({}).then(response => {
      category.items = response.data.data.data;
    });
  };

  return {
    category,
    getCategory
  };
}
