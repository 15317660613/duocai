import fetch from '../config/fetch'


/*险金列表
*
* */
export const InsuranceMoney = (form) => fetch('/userInsurance/list',form,'post');


/*获取参数集合
*
* */
export const InsuranceMoneyParams = () => fetch('/userInsurance/getParams',{},'post');

/*新增险金
*
* */
export const newAddInsuranceMoney = (form) => fetch('/userInsurance/insert', form, 'post')

/*险金详情
*
* */
export const userInsuranceDetail = (id,type) => fetch('/userInsurance/detail',{ id,type }, 'post')

/*修改险金
*
* */
export const userInsuranceUpdate = (form) => fetch('/userInsurance/update',form, 'post')

/*删除险金
*
* */
export const userInsuranceDelete = (id,deleted) => fetch('/userInsurance/delete',{ id, deleted }, 'post')

/*根据部门获取人员
*
* */
export const userInsurancegetUserList = (form) => fetch('/userInsurance/getUserList', form, 'post')


