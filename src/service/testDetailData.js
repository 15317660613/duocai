import fetch from '../config/fetch'


/*合同列表
*
* */
export const taskList = (form) => fetch('/userConceptTask/taskList',form,'post');

/*获取参数集合
*
* */
export const taskgetparams = () => fetch('/userConceptTask/getParams',{},'post');

/*批量修改类别常报(type=1 常报type=2 类别)
*
* */
export const changeTask = (form) => fetch('/userConceptTask/changeTaskCategory',form,'post');

/*删除任务
*
* */
export const delTask = (form) => fetch('/userConceptTask/delete',form,'post');

/*新增任务
*
* */
export const insertTask = (form) => fetch('/userConceptTask/insert',form,'post');

/*任务详情
*
* */
export const detailTask = (form) => fetch('/userConceptTask/detail',form,'post');

/*修改任务
*
* */
export const updateTask = (form) => fetch('/userConceptTask/update',form,'post');

/*批量修改状态 taskList{id, userId}
*
* */
export const batchUpdateInsuranceTask = (form) => fetch('/userConceptTask/batchUpdateInsurance',form,'post');
