import fetch from '../config/fetch'


//请求日期类型的

export const timeType = () => fetch('/depart/departTree', {
  state,type
}, 'post')

//销售管理

export const salemangent = (form) => fetch('/first_house/firstHousePrebuyList',form, 'post')

  //认筹参数
export const identifyChipsParams = (flag = true) => fetch('/first_house/getPrebuyParams',{
  flag
},'post');

//新增认筹
export const addIdentifyChips = (form) => fetch('/first_house/insertPrebuy',form,'post');

//认筹详情
export const editorIdentifyChips = (id) => fetch('/first_house/detailPrebuy', {
  id
},'post');


//根据房号获取认筹参数
export const getInitIdentifyChipsParams = (ufloorId) => fetch('/first_house/getPrebuyParamByUfloorId', {
  ufloorId
},'post');



//修改认筹
export const modifyIdentifyChips = (form) => fetch('/first_house/updatePrebuy',form, 'post');

//删除认筹
export const deletedIdentifyChips = (id,deleted) => fetch('/first_house/deletePrebuy',{
  id,
  deleted
}, 'post');

//客户信息列表
export const prebuyEmpList = (form) => fetch('/first_house/prebuyEmpList',form,'post');


//新增客户信息
export const addPrebuyEmp = (form) => fetch('/first_house/insertPrebuyEmp',form,'post');

//客户信息详情
export const editorPrebuyEmp = (id) => fetch('/first_house/detailPrebuyEmp', {
  id
},'post');



//修改客户信息
export const modifyPrebuyEmp = (form) => fetch('/first_house/updatePrebuyEmp',form, 'post');

//删除客户信息
export const deletedPrebuyEmp = (id,deleted) => fetch('/first_house/deletePrebuyEmp',{
  id,
  deleted
}, 'post');




