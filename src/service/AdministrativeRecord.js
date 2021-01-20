import fetch from '../config/fetch'


/*行政记录详情
*
* */
export const administrativeardetail = (id) => fetch('/administrative/ardetail',{id},'post');

/*删除附件
*
* */
export const administrativedelReFiles = (ids) => fetch('/administrative/delReFiles',{ids},'post');

/*行政记录列表
*
* */
export const administrativefindAdrecordlist = (form) => fetch('/administrative/findAdrecordlist',form,'post');

/*行政记录参数
*
* */
export const administrativegetAdparam = () => fetch('/administrative/getAdparam',{},'post');

/*获取附件
*
* */
export const administrativegetReFiles = (form) => fetch('/administrative/getReFiles',form,'post');

/*新增记录
*
* */
export const administrativeinsertrecord = (form) => fetch('/administrative/insertrecord',form,'post');

/*修改记录详情
*
* */
export const administrativeupdetail = (form) => fetch('/administrative/updetail',form,'post');

/*上传附件
*
* */
export const administrativeuploadFiles = (form) => fetch('/administrative/uploadFiles',form,'post');

/*下载附件
*
* */
export const administrativedownloadReFiles = (ids) => fetch('/administrative/downloadReFiles',{ids},'post');

/*删除记录
*
* */
export const administrativedeletere = (id,deleted) => fetch('/administrative/deletere',{id,deleted},'post');