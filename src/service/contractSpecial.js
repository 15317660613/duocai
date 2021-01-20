/**
 * Created by nhao on 2020-2-18.
 */
import fetch from '../config/fetch'


/*获取合同参数
 *
 * */
export const contractParams = (isList = 0) => fetch('/contract/getParams',{
  isList
},'post');

/*新增合同
 *
 * */
export const newContract = (form) => fetch('/contract/insert',form,'post');


/*合同详情
 *
 * */
export const ediotrContract = (id) => fetch('/contract/detail',{
  id
},'post');

/*合同详情
 *
 * */
export const modifyContract = (form) => fetch('/contract/update',form,'post');



/*列表跟进
 *
 * */
export const followList = (form) => fetch('/contract/detail',form,'post');



/*新增跟进
 *
 * */
export const newFollow = (form) => fetch('/contract/insertProcessing',form,'post');


/*跟进详情
 *
 * */
export const editorFollow = (id) => fetch('/contract/detailProcessing',{
  id
},'post');

/*修改跟进
 *
 * */
export const modifyFollow = (form) => fetch('/contract/updateProcessing',form,'post');



/*删除跟进
 *
 * */
export const deletedFollow = (ids,deleted) => fetch('/contract/deletedProcessing',{
  ids,
  deleted
},'post');


/*删除跟进
 *
 * */
export const findFollowByContractId = (form) => fetch('/contract/detailProcessings',form,'post');

/*
财务参数

*/
export const financeParams = (businessType1,contractId = '') => fetch('/contract/getFinanceParams',{
  businessType1,
  contractId
},'post');

/*
 合同财务列表

 */
export const contractFinanceList = (form) => fetch('/contract/detailFinance',form,'post');


/*
 新增合同财务

 */
export const newContractFinance = (form) => fetch('/contract/insertFinance',form,'post');

/*
 新增合同财务

 */
export const contractGetFirstHouseList = (form) => fetch('/contract/getFirstHouseList',form,'post');


/*
 合同财务详情

 */
export const editorContractFinance = (form) => fetch('/contract/financeDetail',form,'post');

/*
 修改合同财务

 */
export const modifyContractFinance = (form) => fetch('/contract/updateFinance',form,'post');


/*
 删除合同财务

 */
export const deletedContractFinance = (id,deleted = 0) => fetch('/contract/deleteFinance',{
  id,
  deleted
},'post');

/*
 合同财务列表

 */
export const contractFinanceListSpecial = (form) => fetch('/contract/financeList',form,'post');


/*
 合同财务列表

 */
export const contractProgress = (form) => fetch('/contract/firstHouseProcessList',form,'post');


/*
 合同财务平账

 */
export const contractAccountFinance = (form) => fetch('/contract/balanceList',form,'post');


/*
 合同财务被平账

 */
export const contractBeAccountFinance = (financeId) => fetch('/contract/beBalanceList',{
  financeId
},'post');

/*获取应收应付
 */
export const contractgetByBusinessType2 = (form) => fetch('/contract/getByBusinessType2',form,'post');






