import fetch from '../config/fetch'


/*合同列表
*
* */
export const contractList = (form) => fetch('/contract/list',form,'post');


/*
删除合同
*/
export const delcontract = (form) => fetch('/contract/delete',form,'post');

/*
合同自顶号
*/
export const modifycontractNum = (form) => fetch('/contract/changeNum',form,'post');

/*
 业绩列表
*/
export const achievementList = (form) => fetch('/contract/detailBonus',form,'post');


/*
 新增提金
*/

export const addtBonus = (form) => fetch('/tBonus/insert',form,'post');

/*
删除提金
*/

export const deltBonus = (form) => fetch('/tBonus/delete2',form,'post');

/*
修改业绩
*/
export const updatetBonus = (form) => fetch('/tBonus/update',form,'post');

/*
业绩详情
*/
export const detailsBonus = (form) => fetch('/tBonus/detail',form,'post');

/*
获取模式
*/ 
export const ModelstBonus = (form) => fetch('/tBonus/getModels',form,'post');

/*
获取参数集合
*/

export const getParams = (isList=true,needChild=true,contractId = "") => fetch('/tBonus/getParams',{isList,needChild,contractId},'post');



export const contractGetParams = (isList=false) => fetch('/contract/getParams',{isList},'post');


export const getFinanceByContractId = (form) => fetch('/contract/getFinanceByBusinessType2',form,'post');





