import fetch from '../config/fetch'


/*客源列表
*
* */
export const customerList = (form) => fetch('/customer/list',form,'post');

/*获取客源参数
*
* */
export const customerParams = () => fetch('/customer/getParams',{

},'post');

/*新增客源
*
* */
export const newCustomer = (form) => fetch('/customer/insert',form,'post');

/*新增客源
*
* */
export const deletedCustomer = (ids,deleted) => fetch('/customer/delete',{
  ids,
  deleted
},'post');

/*客源详情
*
* */
export const editorCustomer = (id) => fetch('/customer/detail',{
  id
},'post');

/*修改客源
*
* */
export const modifyCustomer = (form) => fetch('/customer/update',form,'post');



//跟进列表
export const followListRouter = (form) => fetch('/customer/getProcessingList',form,'post');

//跟进详情列表
export const followList = (id,type) => fetch('/customer/detailProcessingList', {
  id,
  type
}, 'post');


//新增跟进
export const newFollow = (form) => fetch('/customer/insertProcessing',form,'post');

//跟进详情
export const editorFollow = (id) => fetch('/customer/detailProcessing', {
  id
}, 'post');

//修改跟进
export const modifyFollow = (form) => fetch('/customer/updateProcessing',form,'post');

//删除详情
export const deletedFollow = (ids,deleted) => fetch('/customer/deletedProcessing', {
  ids,
  deleted
}, 'post');
//获取跟进参数集合
export const followParam = () => fetch('/customer/getProcessingParams', {

}, 'post');

//根据客源获取配对
export const customerFindPairList = (id) => fetch('/customer/getPairsByCustomerId', {
  id
},'post');

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


/*标记
*
* */
export const labelCustomer = (customerId,houseIds) => fetch('/customer/insertCustomerPair',{
  customerId,
  houseIds
},'post');



/*删除标记
*
* */
export const deletedCustomerPair = (customerId,ids) => fetch('/customer/deleteCustomerPair',{
  customerId,
  ids
},'post');

/*标记
*
* */
export const labelHouse = (houseId,customerIds) => fetch('/customer/insertSecHousePair',{
  houseId,
  customerIds
},'post');



/*删除标记
*
* */
export const deletedHousePair = (houseId,ids) => fetch('/customer/deleteSecHousePair',{
  houseId,
  ids
},'post');


/*检查电话号码
*
* */
export const checkPhone = (id,phone) => fetch('/customer/checkSamePhone',{
  id,
  phone
},'post');

/*检查电话身份证
*
* */
export const checkIdCard = (id,idCard) => fetch('/customer/checkSameIDCard',{
  id,
  idCard
},'post');

/*检查黑名单
*
* */
export const checkBlack = (phone,idCard) => fetch('/customer/checkBlack',{
  phone,
  idCard
},'post');

/*批量修改自顶号
*
* */
export const modifyNum = (ids,num) => fetch('/customer/changeNum', {
  ids,
  num
},'post');


//房对列表


export const customerCompareList = (form) => fetch('/customer/getPairsList',form,'post');

//客对列表参数
export const houseParirsParams = () => fetch('/customer/getPairParams', {

}, 'post');

//解除配对
export const removeCompare = (houseId,ids) => fetch('/customer/deleteCustomerPair', {
  houseId,
  ids
}, 'post');

/*根据客源获取房源配对
*
* */
export const houserFindCustomerList = (id) => fetch('/customer/getPairsByHouseId', {
  id
},'post');

/*转员工
*
* */
export const changePeople = (emp1,emp2,ids) => fetch('/customer/changeEmp', {
  emp1,
  emp2,
  ids
},'post');

//公盘转私盘统计
export const privateChangePublicCount = (form) => fetch('/customer/changeCustomerProperty1Count',form,'post');



//私客转公客
export const privateChangePublic = (form) => fetch('/customer/changeRoomProperty1',form,'post');

//业务统计跳转客源列表
export const customerBusinessCountList = (form) => fetch('/customer/businessCountList',form,'post');

//业务统计跳转跟进列表
export const customerBusinessCountProcessingList = (form) => fetch('/customer/businessCountProcessingList',form,'post');






















