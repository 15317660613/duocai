import fetch from '../config/fetch'

//获取参数
export const relist = (reportDepartIds,reportEmpIds,reportStates,timeEnd,timeStart,timeMode,word,cards) => fetch('/first_house/firstHouseRecordList', {
  reportDepartIds,reportEmpIds,reportStates,timeEnd,timeStart,timeMode,word,cards
}, 'post')
//新增报备
export const addreport = (arriveDays,arriveDuration,customerCard,customerId, customerPhone
,delegateEmpId,delegateEmpPhone,delegateId,emps,platformEmpId,platformEmpPhone, platformId,
projectId,remark,reportDate,reportDays,reportDeptId,reportDuration,reportNum,reportPersonId,
 reportPersonPhone,reportResult, delegateContactor,
 delegateContactorPhone,card) => fetch('/first_house/insertRecord', {
  arriveDays,arriveDuration,customerCard,customerId, customerPhone
  ,delegateEmpId,delegateEmpPhone,delegateId,emps,platformEmpId,platformEmpPhone, platformId,
  projectId,remark,reportDate,reportDays,reportDeptId,reportDuration,reportNum,reportPersonId,
  reportPersonPhone,reportResult,delegateContactor,
  delegateContactorPhone,card

}, 'post')
//报备详情
export const reportdetailn = (id) => fetch('/first_house/detailRecord', {
id
}, 'post')
//修改报备
export const updreport = (id,arriveDays,arriveDuration,customerCard,customerId, customerPhone
  ,delegateEmpId,delegateEmpPhone,delegateId,emps,platformEmpId,platformEmpPhone, platformId,
  projectId,remark,reportDate,reportDays,reportDeptId,reportDuration,reportNum,reportPersonId,
  reportPersonPhone,reportResult,delegateContactor,
  delegateContactorPhone,card) => fetch('/first_house/updateRecord', {
  id,arriveDays,arriveDuration,customerCard,customerId, customerPhone
  ,delegateEmpId,delegateEmpPhone,delegateId,emps,platformEmpId,platformEmpPhone, platformId,
  projectId,remark,reportDate,reportDays,reportDeptId,reportDuration,reportNum,reportPersonId,
  reportPersonPhone,reportResult,delegateContactor,
  delegateContactorPhone,card

}, 'post')
//删除报备
export const deletereport = (id,deleted) => fetch('/first_house/deleteRecord', {
  id,deleted
}, 'post')




//获取登录人信息

export const getLoginUserMessage = (form) => fetch('/first_house/defaultData',form, 'post')

//业务统计跳转报备列表
export const firsthouseBusinessCountRecordList = (form) => fetch('/first_house/businessCountRecordList',form, 'post');


//通过新房id 获取平台公司

export const getDelegates = (form) => fetch('/first_house/getDelegates',form, 'post');

//通过平台公司获取平台人员 无平台传projectId

export const getPlatformsUser = (form) => fetch('/first_house/getPlatformsUser',form, 'post');
