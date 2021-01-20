import fetch from '../config/fetch'


/*工资列表 1 部门 2 人员
*
* */
export const userInsuranceTaskList = (form) => fetch('/userSalary/taskList',form,'post');
														

/*获取参数集合
*
* */
export const userSalarygetParams = () => fetch('/userSalary/getParams',{},'post');

/*删除工资
*
* */
export const userSalaryDelete = (form) => fetch('/userSalary/delete', form, 'post')

/*工资详情
*
* */
export const userSalaryDetail = (id) => fetch('/userSalary/detail', { id }, 'post')

/*当月考勤扣款
*
* */
export const userSalaryGetAttendanceMonth = (form) => fetch('/userSalary/getAttendanceMonth', form, 'post')

/*获取单项工资
*
* */
export const userSalaryGetIndividualList = (form) => fetch('/userSalary/getIndividualList', form, 'post')

/*险金 1 险 2金
*
* */
export const userSalaryGetInsurance = (form) => fetch('/userSalary/getInsurance', form, 'post')

/*奖罚 1 奖 2罚
*
* */
export const userSalaryGetPunish = (form) => fetch('/userSalary/getPunish', form, 'post')

/*根据部门获取人员
*
* */
export const userSalaryGetUserList = (form) => fetch('/userSalary/getUserList', form, 'post')

/*新增工资
*
* */
export const userSalaryInsert = (form) => fetch('/userSalary/insert', form, 'post')

/*修改工资
*
* */
export const userSalaryUpdate = (form) => fetch('/userSalary/update', form, 'post')

/*工资封账
*
* */
export const userSalaryUpdateClose = (form) => fetch('/userSalary/updateClose', form, 'post')

/*更新单项工资
*
* */
export const userSalaryUpdateIndividual = (form) => fetch('/userSalary/updateIndividual', form, 'post')

/*已发放
*
* */
export const userSalaryUpdateState = (ids) => fetch('/userSalary/updateState', {ids}, 'post')

/*有切换-主平账列表 type 1 收支 2工资
*
* */
export const financeExpendituregetReconciliationList2 = (form) => fetch('/finance_expenditure/getReconciliationList2', form, 'post')

/*有切换-被平账列表 type 1 收支 2工资
*
* */
export const financeExpendituregetBeReconciliationList2 = (form) => fetch('/finance_expenditure/getBeReconciliationList2', form, 'post')

/*提金问号详情
*
* */
export const userSalarygetBonus = (form) => fetch('/userSalary/getBonus', form, 'post')

/*操作日志列表
*
* */
export const operationrecordrecordList = (form) => fetch('/operationrecord/recordList', form, 'post')

/*当月考勤详情
*
* */
export const userSalarygetAttendanceDetail = (form) => fetch('/userSalary/getAttendanceDetail', form, 'post')


/*当月考勤详情
*
* */
export const getCloseByUserIdAndBalTime = (form) => fetch('/userSalary/getCloseByUserIdAndBalTime', form, 'post')
