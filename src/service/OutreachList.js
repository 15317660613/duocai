import fetch from '../config/fetch'


/**
 * 参数
 */
export const externalConnectiongetWparam = () => fetch('/externalConnection/getWparam',{},'post');

/**
 * 外联列表
 */
export const  externalConnectionfindConnectionlist = (form) => fetch('/externalConnection/findConnectionlist',form,'post');

/**
 * 外联新增
 */
 export const  externalConnectioninsertConnection = (form) => fetch('/externalConnection/insertConnection',form,'post');

/**
 * 外联删除
 */
 export const  externalConnectiondeleteConnection = (id,deleted) => fetch('/externalConnection/deleteConnection',{id,deleted},'post');

/**
 * 外联详情
 */
 export const  externalConnectionconnectiondetail = (id) => fetch('/externalConnection/connectiondetail',{id},'post');
 
/**
 * 外联修改
 */
 export const  externalConnectionupdatedConnection = (form) => fetch('/externalConnection/updatedConnection',form,'post');