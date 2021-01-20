import fetch from '../config/fetch'

//新增人员
export const addperson= (form) => fetch('/user/insert',form, 'post')
//新增人员下拉参数
export const addperparam= (creatid) => fetch('/user/getParams', {
  creatid
}, 'post')
//传头像
export const updatePhoto= (form) => fetch('/user/changeHeadPortrait',form, 'post')
//删除人
export const deperson= (deleted,id) => fetch('/user/delete', {
  deleted,id
}, 'post')

//通过人员id查详情
export const userde= (id) => fetch('/user/detailUser', {
  id
}, 'post')
//人员图文信息
export const imageList= (id) => fetch('/user/detailState', {
  id
}, 'post')
//人员职变
export const userchange= (id) => fetch('/user/detailChange', {
  id
}, 'post')
//修改人员信息
export const userUpdate= (form) => fetch('/user/update',form, 'post');

//新增图文信息
export const  newUserImage = (id) => fetch('/user/imgeId', {
  id
}, 'post')


//修改图文信息
export const updateImages= (userImage) => fetch('/user/updateImage', {
  userImage
}, 'post')

//人力明细
export const manpowerListData= (form) => fetch('/user/usersDetailList', form, 'post');

//批量修改自定号
export const modifyNum = (form) => fetch('/user/changeNum',form, 'post')


//人力统计
export const userCount= (form) => fetch('/user/usersCount', form, 'post')

//人员相关数据统计
export const userAboutDataCount= (id) => fetch('/user/detailCount', {id}, 'post')


//人员相关数据转出
export const userAboutDataChange= (form) => fetch('/user/changeOwnerUser', form, 'post')




//部门树状
export const odeparttree = (state,type,isBusiness='',name='') => fetch('/depart/departTree', {
  state,type,isBusiness,name
}, 'post')

//部门树状
export const myodeparttree = (form) => fetch('/depart/departTree', form , 'post');

//部门树状21
export const departTree2 = (form) => fetch('/depart/departTree2', form, 'post')
export const ostaffttree = () => fetch('/staff/staffTree', {

}, 'post')
//通过部门查人
export const departperson= (id) => fetch('/depart/detailDepart', {
id
}, 'post')

//通过部门查人
export const findUserByDepartId = (form) => fetch('/depart/detailDepart',form, 'post')

//职位树状
export const dutytree= () => fetch('/depart/staffTree', {

}, 'post')
//通过职位查人
export const dutyperson= (id) => fetch('/depart/staffList', {
id
}, 'post')

export const findUserByDutyId= (form) => fetch('/depart/staffList',form, 'post')

//新增部门
export const addDepart= (form) => fetch('/depart/insert',form, 'post')
//修改部门
export const updetadepart= ( departAdministrations,departPhysicalArea,id,createBy,preId,level,num1,num2,num3,num4,num5,name,doBusiness,adress,phone,prefix,state,type,remark,businessCount,achievementCount) => fetch('/depart/update', {
  departAdministrations,departPhysicalArea,id,createBy,preId,level,num1,num2,num3,num4,num5,name,doBusiness,adress,phone,prefix,state,type,remark,businessCount,achievementCount
}, 'post')
//删除部门
export const deletdepart= (id,deleted) => fetch('/depart/delete', {
  id,deleted
}, 'post')


//调动部门参数
export const changedparam= (type) => fetch('/depart/changeDepartParam', {
  type
}, 'post')
//调动部门
export const changedpart= (id,level,num1,num2, num3,num4,num5,preId) => fetch('/depart/changeDepart', {
  id,level,num1,num2, num3,num4,num5,preId
}, 'post')

//人员调动/转资源参数
export const OwnerUserdparam= () => fetch('/depart/changeOwnerUserParam', {

}, 'post')

//人员调动/转资源
export const changeuserplace= (count1,count2,count3,count4,count5,count6,count7,count8,count9,count10,customerState,
  customerType,inUserId,num,outUserId,roomState,roomType,customerTimeStart,customerTimeEnd,roomTimeStart,roomTimeEnd,villageId) => fetch('/depart/changeOwnerUser', {
  count1,count2,count3,count4,count5,count6,count7,count8,count9,count10,customerState,
  customerType,inUserId,num,outUserId,roomState,roomType,customerTimeStart,customerTimeEnd,roomTimeStart,roomTimeEnd,villageId
}, 'post')
//转出人统计
export const OwnerUserCount= (id) => fetch('/depart/changeOwnerUserCount', {
  id
}, 'post')
//人员调动
export const changeuserdepart= (id,newDeptId) => fetch('/depart/changeUserDepart', {
  id,newDeptId
}, 'post')


//通过部门查询上级部门
export const findUpDepartByDepartId= (form) => fetch('/depart/preDepartTree',form, 'post')




















