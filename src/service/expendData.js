import fetch from '../config/fetch'

/*消耗品详情
*
* */
export const expendManageDetail = (form) => fetch('/financeConsume/detailManage', form,'post');

/*消耗品详情
*
* */
export const addAndUpdateExpendManage = (form) => fetch('/financeConsume/insertManage', form,'post');


/*消耗品规则列表
*
* */
export const expendRuleList = (form) => fetch('/financeConsume/listRule', form,'post');

/*新增消耗品规则
*
* */
export const addExpendRule = (form) => fetch('/financeConsume/insertRule', form,'post');


/*详情消耗品规则
*
* */
export const detialExpendRule = (form) => fetch('/financeConsume/detailRule', form,'post');



/*修改消耗品规则
*
* */
export const modifyExpendRule = (form) => fetch('/financeConsume/updateRule', form,'post');

/*删除消耗品规则
*
* */
export const deletedExpendRule = (form) => fetch('/financeConsume/deletedRule', form,'post');


/*消耗管理列表
*
* */
export const expendList = (form) => fetch('/financeConsume/list', form,'post');


/*消耗管理详情
*
* */
export const editorExpend = (form) => fetch('/financeConsume/detail', form,'post');

/*修改消耗管理详情
*
* */
export const modifyExpend = (form) => fetch('/financeConsume/update', form,'post');


/*删除消耗管理详情
*
* */
export const deletedExpendPerson = (form) => fetch('/financeConsume/deleted', form,'post');


/*消耗管理列表
*
* */
export const expendListDay = (form) => fetch('/financeConsume/listDay', form,'post');


/*每日消耗管理详情
*
* */
export const editorExpendDay = (form) => fetch('/financeConsume/detailDay', form,'post');

/*修改每日消耗管理详情
*
* */
export const modifyExpendDay = (form) => fetch('/financeConsume/updateDay', form,'post');


/*通过部门查询消耗人员
*
* */
export const findExpendUserByDepartId = (form) => fetch('/financeConsume/getUserList', form,'post');



/*新增多人
*
* */
export const bacthExpendUser = (form) => fetch('/financeConsume/insertMorePeo', form,'post');


/*新增多月人
*
* */
export const bacthExpendMonthUser = (form) => fetch('/financeConsume/insertMoreMon', form,'post');


/*获取消耗参数
*
* */
export const getExpendParams = (form) => fetch('/financeConsume/getParams', form,'post');


/*总来源详情
*
* */
export const getExpendSourceData = (form) => fetch('/financeConsume/consumeAll', form,'post');


/*修改总来源详情
*
* */
export const modifyExpendSourceData = (form) => fetch('/financeConsume/updateConsumeAll', form,'post');

/*新增多月人统计
*
* */
export const financeConsumeInsertMoreMonCount = (form) => fetch('/financeConsume/insertMoreMonCount', form,'post');