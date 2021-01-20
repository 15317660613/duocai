import fetch from '../config/fetch'


//新房列表
export const newHouseList = (form) => fetch('/first_house/firstHouseList',form, 'post')


//获取参数集合
export const getparams = (flag = false,isContract = false) => fetch('/first_house/getParams', {
  flag,
  isContract
}, 'post')

//新增项目
export const addNewHouse = (form) => fetch('/first_house/insert',form, 'post')

//项目详情
export const editorHouse = (id) => fetch('/first_house/detail',{
  id
}, 'post')

//项目修改
export const modifyHouse = (form) => fetch('/first_house/update',form, 'post')

//删除项目
export const deletedProject = (id,deleted) => fetch('/first_house/delete',{
  id,
  deleted
}, 'post');



//代理信息列表 -平台公司 -销售公司
export const agenctList = (id) => fetch('/first_house/detailDelegates',{
  id
}, 'post');

//代理信息列表 -平台公司
//代理信息 -平台公司参数
export const agenctCompanyParams = () => fetch('/first_house/getDelegatePlatformParams', {},'post');


//新增代理信息 -平台公司
export const addAgenctCompany = (form) => fetch('/first_house/insertDelegatePlatform',form, 'post');

//代理信息详情 -平台公司
export const editorAgenctCompany = (id) => fetch('/first_house/detailDelegatePlatform',{
  id
}, 'post');

//修改代理信息 -平台公司
export const modifyAgenctCompany = (form) => fetch('/first_house/updateDelegatePlatform',form, 'post');

//删除代理信息 -平台公司
export const deletedAgenctCompany = (id,deleted) => fetch('/first_house/deleteDelegatePlatform',{
  id,
  deleted
}, 'post');


//新增代理信息 -销售公司
export const addSaleCompany = (form) => fetch('/first_house/insertDelegateC',form, 'post');

//代理信息详情 -销售公司
export const editorSaleCompany = (id) => fetch('/first_house/detailDelegateC',{
  id
}, 'post');

//修改代理信息 -销售公司
export const modifySaleCompany = (form) => fetch('/first_house/updateDelegateC',form, 'post');

//删除代理信息 -销售公司
export const deletedSaleCompany = (id,deleted) => fetch('/first_house/deleteDelegateC',{
  id,
  deleted
}, 'post');





//户型资料列表
export const apartmentList = (id) => fetch('/first_house/detailTypes',{
  id
}, 'post');

//户型资料参数
export const apartmentParams = () => fetch('/first_house/getTypeParams', {},'post');

//新增户型资料
export const addApartment = (form) => fetch('/first_house/insertType',form, 'post');

//详情户型资料
export const editorApartment = (id) => fetch('/first_house/detailType', {
  id
},'post');

//修改户型资料
export const modifyApartment = (form) => fetch('/first_house/updateType',form, 'post');

//删除户型资料
export const deletedApartment = (id,deleted) => fetch('/first_house/deleteType',{
  id,
  deleted
}, 'post');


// 平台公司

export const plaformCompanyList = () => fetch('/first_house/firstHousePlatformList', {

}, 'post')

// 新增平台公司

export const addPlaformCompany = (form) => fetch('/first_house/insertPlatform',form, 'post')

// 详情平台公司

export const editorPlaformCompany = (id) => fetch('/first_house/detailPlatform', {
  id
}, 'post')

// 修改平台公司

export const modifyPlaformCompany = (form) => fetch('/first_house/updatePlatform', form, 'post')

// 删除平台公司

export const deletedPlaformCompany = (id,deleted) => fetch('/first_house/deletePlatform', {
  id,
  deleted
}, 'post')





//新房 栋座列表
export const pedestalList = (id,seatId) => fetch('/first_house/detailSeats',{
  id,
  seatId
}, 'post');

//新增栋座
export const addPedestal = (form) => fetch('/first_house/insertSeat',form, 'post');

//批量新增栋座
export const batchAddPedestal = (form) => fetch('/first_house/insertSeats',form, 'post');


//栋座详情
export const editorPedestal = (id) => fetch('/first_house/detailSeat', {
  id
},'post');

//修改栋座
export const modifyPedestal = (form) => fetch('/first_house/updateSeat',form, 'post');

//删除栋座
export const deletedPedestal = (id,deleted) => fetch('/first_house/deleteSeats',{
  id,
  deleted
}, 'post');



//单元

//栋座查单元
export const findUnitBySeartId = (id) => fetch('/first_house/getUnitsBySeatId', {
  id
},'post');

//栋座查单元
export const findUnitParams = () => fetch('/first_house/detailUnitParam', {

},'post');

//新增单元
export const addUnit = (form) => fetch('/first_house/insertUnit',form, 'post');


//单元详情
export const editorUnit = (id) => fetch('/first_house/detailUnit', {
  id
},'post');

//修改单元
export const modifyUnit = (form) => fetch('/first_house/updateUnit',form, 'post');

//删除单元
export const deletedUnit = (id,deleted) => fetch('/first_house/deleteUnits',{
  id,
  deleted
}, 'post');

//进入房号
export const findSeatHouseNum = (seatId,showAll,unitId,name='') => fetch('/first_house/getRoomsByUnitId', {
  seatId,
  showAll,
  unitId,
  name
},'post');

//新增房号
export const addHouseNum = (form) => fetch('/first_house/insertRoom',form, 'post');


//房号详情
export const editorHouseNum = (id,projectId) => fetch('/first_house/detailRoom', {
  id,
  projectId
},'post');

//修改房号
export const modifyHouseNum = (form) => fetch('/first_house/updateRoom',form, 'post');

//修改房号
export const modifyHouseNums = (form) => fetch('/first_house/updateRooms',form, 'post');

//删除房号
export const deletedHouseNum = (id,deleted) => fetch('/first_house/deleteRooms',{
  id,
  deleted
}, 'post');

//批量新增房号
export const batchNewHouseNum = (form) => fetch('/first_house/insertRooms',form,'post');



// 新房详情 - 配对列表

export const houserFindCustomerList = (id) => fetch('/first_house/detailPairs', {
  id
}, 'post')


//项对列表

export const projectCompareList = (form) => fetch('/first_house/getPairsList',form, 'post')


/*带看列表
 *
 * */
export const firstHouseLookList = (form) => fetch('/first_house/firstHouseLookList', form ,'post');

//业务统计跳转带看列表
export const firstHouseBusinessCountLookList = (form) => fetch('/first_house/businessCountLookList',form, 'post')

//业务统计跳转新房列表
export const firstHouseBusinessCountHouseList = (form) => fetch('/first_house/businessCountHouseList',form, 'post')

//批量修改自定义号
export const firstHousechangeNum = (form) => fetch('/first_house/changeNum',form, 'post')