import fetch from '../config/fetch'


/*删除操作日志
*
* */
export const operationrecorddelteOprecord = (id) => fetch('/operationrecord/delteOprecord',{id},'post');

/*操作日志列表
*
* */
export const operationrecordrecordList = (form) => fetch('/operationrecord/recordList',form,'post');

/*回收站彻底删除
*
* */
export const recycledelete = (form) => fetch('/recycle/delete',form,'post');

/*回收站列表
*
* */
export const recyclefindRecycleList = (form) => fetch('/recycle/findRecycleList',form,'post');

/*回收站恢复
*
* */
export const recyclerecovery = (form) => fetch('/recycle/recovery',form,'post');