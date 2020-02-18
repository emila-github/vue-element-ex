import service from "@/utils/request";
// 新增信息
export function AddInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data: data
  });
}

// 一级分类添加
export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data: data
  });
}
// 获取分类
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data: data
  });
}
// 删除分类
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data: data
  });
}
// 编辑分类
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data: data
  });
}
