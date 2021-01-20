import fetch from '../config/fetch'



//获取参数集合
export const getsparam = () => fetch('/staff/getParams', {

}, 'post')
//职位明细列表
export const staffList = (form) => fetch('/staff/staffList', form, 'post')
//新增职位
export const addJob = (form) => fetch('/staff/insert',form, 'post')
//删除职位
export const dejobs = (deleted, ids) => fetch('/staff/delete', {
  deleted, ids
}, 'post')
//职位明细
export const jobDetail = ( id) => fetch('/staff/detail', {
  id
}, 'post')
//修改职位
export const updateJob = (form) => fetch('/staff/update', form, 'post')
//新增年月账套
export const addbuk = ( staffId, time) => fetch('/staff/insertAccountSet', {
  staffId, time
}, 'post')
//删除账套
export const delbook = ( ids) => fetch('/staff/deleteAccountSet', {
  ids
}, 'post')
//基础账套
export const accountsd = (staffTimeId) => fetch('/staff/accountSalaryDetail', {
  staffTimeId
}, 'post')
//基础人员账套数据
export const usersd = (userTimeId) => fetch('/staff/accountUserSalaryDetail', {
  userTimeId
}, 'post')
//基础账套职位保存
export const savejob = (id,type,count,days,isSalary,remark, staffTimeId) => fetch('/staff/insertSetSalary', {
  id,type,count,days,isSalary,remark, staffTimeId
}, 'post')
//基础账套个人保存
export const savepe = (id,type,count,days,isSalary,remark, userTimeId) => fetch('/staff/insertSetUserSalary', {
  id,type,count,days,isSalary,remark, userTimeId
}, 'post')

//险金账套
export const accountid = (staffTimeId) => fetch('/staff/accountInsuranceDetail', {
  staffTimeId
}, 'post')
//险金人员账套数据
export const xianj = (userTimeId) => fetch('/staff/accountUserInsuranceDetail', {
  userTimeId
}, 'post')
//险金账套职位保存
export const savexianj = (form) => fetch('/staff/insertSetInsurance',form, 'post')
//险金账套个人保存
export const savexianp = (form) => fetch('/staff/insertSetUserInsurance', form, 'post')


//考勤账套
export const accountad = (staffTimeId) => fetch('/staff/accountAttendanceDetail', {
  staffTimeId
}, 'post')
//考勤人员账套
export const  accountUser = (userTimeId) => fetch('/staff/accountUserAttendanceDetail', {
  userTimeId
}, 'post')
//考勤保存职位
export const  insetatt = (accountSetAttendance) => fetch('/staff/insertSetAttendance', {
  accountSetAttendance
}, 'post')
//考勤保存人员
export const  insetuseratt = ( accountSetUserAttendance) => fetch('/staff/insertSetUserAttendance', {
  accountSetUserAttendance
}, 'post')
//提金账套
export const accountbd = (staffTimeId) => fetch('/staff/accountBonusDetail', {
  staffTimeId
}, 'post')
//提金人员账套
export const userbonus = (  userTimeId) => fetch('/staff/accountUserBonusDetail', {
  userTimeId
}, 'post')

//保存提金账套
export const savebonus = (data) => fetch('/staff/insertSetBonus', {
  data
}, 'post')
//保存提金人员账套
export const saveuserbonus = (data) => fetch('/staff/insertSetUserBonus', {
  data
}, 'post')





















