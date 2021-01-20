import fetch from '../config/fetch'


/*租售列表
*
* */
export const rentList = (form) => fetch('/sec_house/list',form,'post');


/*房源统计 -组织转资源当中
*
* */
export const listCount = (form) => fetch('/sec_house/listCount',form,'post');

/*根据房源获取房源配对
*
* */
export const houserFindCustomerList = (id) => fetch('/sec_house/getPairsByHouseId', {
 id
},'post');

/*获取房源详情参数
*
* */
export const rentParam = () => fetch('/sec_house/getParams', {

},'post');

/*批量修改自顶号
*
* */
export const modifyNum = (ids,num) => fetch('/sec_house/changeNum', {
  ids,
  num
},'post');

/*转归属人
*
* */
export const changePeople = (emp1,emp2,emp3,ids) => fetch('/sec_house/changeEmp', {
  emp1,
  emp2,
  emp3,
  ids
},'post');

//公盘转私盘统计
export const privateChangePublicCount = (form) => fetch('/sec_house/changeRoomProperty1Count',form,'post');


//公盘转私盘
export const privateChangePublic = (form) => fetch('/sec_house/changeRoomProperty1',form,'post');





/*新增房源
*
* */
export const rentNewAdd = (form) => fetch('/sec_house/insert',form,'post');


/*房源详情
*
* */
export const rentEditor = (id) => fetch('/sec_house/detail', {
  id
}, 'post')

/*修改房源
*
* */
export const rentModify = (form) => fetch('/sec_house/update',form,'post');

/*删除房源
*
* */
export const rentDeleted = (ids,deleted) => fetch('/sec_house/delHouse', {
  ids,
  deleted,
}, 'post');




//获取跟进参数集合
export const followParam = () => fetch('/sec_house/getProcessingParams', {

}, 'post');

//新增看业主
export const lookMaster = (id) => fetch('/sec_house/insertShowOwner', {
  id
}, 'post')

//跟进列表
export const followListRouter = (form) => fetch('/sec_house/getProcessingList',form,'post');


//跟进详情列表
export const followList = (id,type) => fetch('/sec_house/detailProcessingList', {
  id,
  type
}, 'post');
//新增跟进
export const newFollow = (form) => fetch('/sec_house/insertProcessing',form,'post');

//跟进详情
export const editorFollow = (id) => fetch('/sec_house/detailProcessing', {
  id
}, 'post');

//修改跟进
export const modifyFollow = (form) => fetch('/sec_house/updateProcessing',form,'post');

//删除详情
export const deletedFollow = (ids,deleted) => fetch('/sec_house/deletedProcessing', {
  ids,
  deleted
}, 'post');

//钥匙列表
export const keyList = (form) => fetch('/sec_house/getkeysList',form,'post');

//钥匙
export const keyParams = () => fetch('/sec_house/getKeyParams', {

}, 'post');

//删除钥匙
export const deletedKey = (ids) => fetch('/sec_house/delKeys', {
  ids
}, 'post');


//钥匙
export const houseKey = (id) => fetch('/sec_house/getKeysByHouseId', {
 id
}, 'post');

//钥匙操作日志
export const houseOperation = (id,type) => fetch('/sec_house/getKeysOpr', {
  id,
  type
}, 'post');


//客源


export const customerList = (form) => fetch('/customer/list',form,'post');


//获取进程
export const getProgress = () => fetch('/customer/getProcessingState', {

}, 'post');

//修改进程
export const modifyProgress = (ids,processingState) => fetch('/customer/changeProcessingState', {
  ids,
  processingState
}, 'post');

//获取最高顺位号
export const getSequence = (customerId) => fetch('/customer/getMaxIndex', {
  customerId
}, 'post');

//修改顺位号
export const modifySequence = (id,index) => fetch('/customer/changeIndex', {
  id,
  index
}, 'post');
//解除配对
export const removeCompare = (houseId,ids) => fetch('/customer/deleteSecHousePair', {
  houseId,
  ids
}, 'post');

//解除配对
export const lableCompare = (form) => fetch('/sec_house/housePairlist',form, 'post');




//房对列表


export const customerCompareList = (form) => fetch('/sec_house/getPairsList',form,'post');


//房对列表参数
export const houseParirsParams = () => fetch('/sec_house/getPairParams', {

}, 'post');

//业务统计跳转房源列表
export const sechouseBusinessCountList = (form) => fetch('/sec_house/businessCountList',form,'post');

//业务统计跳转房源列表
export const sechouseBusinessCountProcessingList = (form) => fetch('/sec_house/businessCountProcessingList',form,'post');