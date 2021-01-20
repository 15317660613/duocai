import fetch from '../config/fetch'

/*获取收支参数数据
*
* */
export const getfinanceParams = (form) => fetch('/finance_expenditure/getParams', form,'post');

/*收支列表
*
* */
export const getfinanceListData = (form) => fetch('/finance_expenditure/getList', form,'post');


/*新增收支
*
* */
export const addFinanceData = (form) => fetch('/finance_expenditure/insert', form,'post');

/*收支详情
*
* */
export const editorFinanceData = (form) => fetch('/finance_expenditure/detail', form,'post');

/*修改收支
*
* */
export const modifyFinanceData = (form) => fetch('/finance_expenditure/update', form,'post');


/*删除收支
*
* */
export const deletedFinanceData = (form) => fetch('/finance_expenditure/delete', form,'post');


/*平账列表
*
* */
export const financeAccountList = (form) => fetch('/finance_expenditure/getReconciliationList', form,'post');

/*被平账列表
*
* */
export const financeBeAccountList = (form) => fetch('/finance_expenditure/getBeReconciliationList', form,'post');



/*平账有切换列表
*
* */
export const financeAccountListType = (form) => fetch('/finance_expenditure/getReconciliationList2', form,'post');

/*被平账有切换列表
*
* */
export const financeBeAccountListType = (form) => fetch('/finance_expenditure/getBeReconciliationList2', form,'post');


/*封账取消封账
*
* */
export const financeCloseAccountOrCancel = (form) => fetch('/finance_expenditure/updateClose', form,'post');

/*总剩余
*
* */
export const getTotalCount = (form) => fetch('/finance_expenditure/getTotalCount', form,'post');




