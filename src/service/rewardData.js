import fetch from '../config/fetch'

/*奖罚列表
*
* */
export const rewardList = (form) => fetch('/userPunish/taskList',form,'post');

/*获取参数集合
*
* */
export const rewardgetparams = (form) => fetch('/userPunish/getParams',form,'post');

/*新增奖罚
*
* */
export const rewardInsert = (form) => fetch('/userPunish/insert',form,'post');

/*批量新增奖罚
*
* */
export const rewardInserts = (form) => fetch('/userPunish/inserts',form,'post');

/*删除奖罚
*
* */
export const rewardDel = (form) => fetch('/userPunish/delete',form,'post');

/*奖罚详情
*
* */
export const rewardDetial = (id) => fetch('/userPunish/detail',{id},'post');

/*修改奖罚
*
* */
export const rewardUpdate = (form) => fetch('/userPunish/update',form,'post');

/*根据部门获取人员
*
* */
export const rewardGetUserList = (form) => fetch('/userPunish/getUserList',form,'post');