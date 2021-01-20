import fetch from '../config/fetch'

//部门详情
export const departdet= (id) => fetch('/depart/detail', {
  id
}, 'post')
//部门权限行政跨步
export const stration= (col,departId,name) => fetch('/depart/detailAdministration', {
  col,departId,name
}, 'post')
//部门权限物理跨步
export const sical= (col,departId,name) => fetch('/depart/detailPhysicalArea', {
  col,departId,name
}, 'post')
//部门明细列表
export const getdepartlist= (form) => fetch('/depart_coop/departList', 
  form
, 'post')
//部门参数
export const departparam= () => fetch('/depart_coop/departList', {

}, 'post')

//部门参数
export const departTree= (isBusiness,state,type) => fetch('/depart/departTree', {
  isBusiness,
  state,
  type
}, 'post')

//部门参数-搜索
export const departTreeByWord= (form) => fetch('/depart/departTree',form, 'post')



//部门 参数
export const departParam= (form) => fetch('/depart/getParams', form, 'post')

//新增物理单位
export const departcoopinsert= (form) => fetch('depart_coop/insert', form, 'post')

//物理明细列表
export const departcoopcoopList= (form) => fetch('/depart_coop/coopList', form, 'post')
//删除物理场地
export const departcoopdelete = (deleted,id) => fetch('/depart_coop/delete', {
  deleted,id
}, 'post')
//物理详情
export const coopdetail= (id) => fetch('/depart_coop/detail', {
  id

}, 'post')
//物理参数
export const departcoopgetParams= () => fetch('/depart_coop/getParams', {}, 'post')

//修改物理单位
export const departcoopupdate= (form) => fetch('depart_coop/update', form, 'post')

//获取物理参数
export const phyparam= () => fetch('/depart_coop/getParams', {

}, 'post')
//根据部门id获取物理
export const departcoopgetPlaceByDepart = (ids) => fetch('/depart_coop/getPlaceByDepart', {
ids
}, 'post')
//根据层级获取部门
export const leveldepart= ( levels) => fetch('/depart_coop/getDepartByLevel', {
  levels
}, 'post')
//设置预算
export const insertBudget= (delDepartIds,departIds,time) => fetch('/depart_coop/insertBudget', {
  delDepartIds,departIds,time
}, 'post')
//获取对应的预算部门/物理
export const getCoopBudgetById= (departId,time) => fetch('/depart_coop/getCoopBudgetById', {
  departId,time
}, 'post')
//预算列表
export const cblist= (departIds,placeIds,showType,type,word) => fetch('/depart_coop/coopBudgetList', {
  departIds,placeIds,showType,type,word
}, 'post')

//获取直属部门


export const getRangeDepart= (form) => fetch('/depart/departRange',form, 'post')











