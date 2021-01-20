import fetch from '../config/fetch'

/*预算明细列表 */
export const departcoopcoopBudgetList = (form) => fetch('/depart_coop/coopBudgetList',form,'post');

/*物理明细列表 */
export const departcoopcoopList = (form) => fetch('/depart_coop/coopList',form,'post');

/*删除物理场地 */
export const departcoopdelete = (form) => fetch('/depart_coop/delete',form,'post');

/*部门明细列表 */
export const departcoopdepartList = (form) => fetch('/depart_coop/departList',form,'post');

/*物理场地详情 */
export const departcoopdetail = (id) => fetch('/depart_coop/detail',{id},'post');

/*根据年获取预算单位 */
export const departcoopgetCoopBudget = (form) => fetch('/depart_coop/getCoopBudget',form,'post');

/*获取对应的预算部门/物理 */
export const departcoopgetCoopBudgetById = (form) => fetch('/depart_coop/getCoopBudgetById',form,'post');

/*根据层级获取部门 */
export const departcoopgetDepartByLevel = (form) => fetch('/depart_coop/getDepartByLevel',form,'post');

/*根据状态获取物理明细 */
export const departcoopgetListByState = (state) => fetch('/depart_coop/getListByState',{state},'post');

/*获取参数集合 */
export const departcoopgetParams = (form) => fetch('/depart_coop/getParams',form,'post');

/*物理资产/物理手续详情 */
export const departcoopgetPhysicalAdministrativeDetail = (form) => fetch('/depart_coop/getPhysicalAdministrativeDetail',form,'post');

/*物理资产/物理手续列表 */
export const departcoopgetPhysicalAdministrativeList = (form) => fetch('/depart_coop/getPhysicalAdministrativeList',form,'post');

/*物理缴费详情*/
export const departcoopgetPhysicalDetail = (form) => fetch('/depart_coop/getPhysicalDetail',form,'post');

/*物理缴费列表*/
export const departcoopgetPhysicalList = (form) => fetch('/depart_coop/getPhysicalList',form,'post');

/*根据部门获取物理*/
export const departcoopgetPlaceByDepart = (ids) => fetch('/depart_coop/getPlaceByDepart',{ids},'post');

/*新增物理场地*/
export const departcoopinsert = (form) => fetch('/depart_coop/insert',form,'post');

/*设置预算*/
export const departcoopinsertBudget = (form) => fetch('/depart_coop/insertBudget',form,'post');

/*修改物理场地*/
export const departcoopupdate = (form) => fetch('/depart_coop/update',form,'post');

/*物理资产/物理手续保存*/
export const departcoopupdatePhysicalAdministrativeDetail = (form) => fetch('/depart_coop/updatePhysicalAdministrativeDetail',form,'post');

/*物理缴费保存*/
export const departcoopupdatePhysicalDetail = (form) => fetch('/depart_coop/updatePhysicalDetail',form,'post');

//物理调动
export const departchangeDepartPlace = (form) => fetch('/depart/changeDepartPlace', form, 'post')