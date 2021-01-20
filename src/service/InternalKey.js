import fetch from '../config/fetch'


/*钥匙列表
*
* */
export const internalKeyfindListkey = (form) => fetch('/internalKey/findListkey',form,'post');

/*钥匙参数
*
* */
export const internalKeygetKparam = () => fetch('/internalKey/getKparam',{},'post');

/*钥匙新增
*
* */
export const internalKeyinsertKeys = (form) => fetch('/internalKey/insertKeys',form,'post');

/*钥匙详情
*
* */
export const internalKeyinkeyDetail = (form) => fetch('/internalKey/inkeyDetail',form,'post');

/*钥匙修改
*
* */
export const internalKeyupdatekey = (form) => fetch('/internalKey/updatekey',form,'post');

/*钥匙删除
*
* */
export const internalKeydelete = (id,keynameid,deleted) => fetch('/internalKey/delete',{id,keynameid,deleted},'post');