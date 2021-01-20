import fetch from '../config/fetch'

/*获取收支统计数据
*
* */
export const getFinanceExpendCount = (form) => fetch('/finance_expenditure/financeExpendCount', form,'post');

/*总现金余额
*
* */
export const getFinanceBudgetCount = (form) => fetch('/finance_expenditure/getExpenditureStorages', form,'post');





/*获取收支统计问号1
*
* */
export const getFinanceExpendQuestion1 = (form) => fetch('/finance_expenditure/getExpenditureStorages', form,'post');


/*获取收支统计问号2
*
* */
export const getFinanceExpendQuestion2 = (form) => fetch('/finance_expenditure/getExpenditureStorages1', form,'post');


/*获取收支统计问号3
*
* */
export const getFinanceExpendQuestion3 = (form) => fetch('/finance_expenditure/getExpenditureStorages2', form,'post');


/*获取收支统计问号4
*
* */
export const getFinanceExpendQuestion4 = (form) => fetch('/finance_expenditure/getExpenditureStorages3', form,'post');


/*获取收支统计问号5
*
* */
export const getFinanceExpendQuestion5 = (form) => fetch('/finance_expenditure/getExpenditureStorages4', form,'post');

/*余额统计
*
* */
export const getFinanceStatistics = (form) => fetch('/finance_expenditure/getTotalCount', form,'post');


