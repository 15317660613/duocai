import fetch from '../config/fetch'

/*更新二手房名称
*
* */
export const getFilesList1 = (form) => fetch('/sec_house/getFiles', form,'post');

export const deletedFiles1 = (form) => fetch('/sec_house/delFiles', form,'post');

export const uploadFiles1 = (form) => fetch('/sec_house/uploadFiles', form,'post');

export const updateFileName1 = (form) => fetch('/sec_house/updateFile', form,'post');



/*新房
*
* */
export const getFilesList2 = (form) => fetch('/first_house/getFiles', form,'post');

export const deletedFiles2 = (form) => fetch('/first_house/delFiles', form,'post');

export const uploadFiles2 = (form) => fetch('/first_house/uploadFiles', form,'post');

export const updateFileName2 = (form) => fetch('/first_house/updateFile', form,'post');




/*报备
*
* */
export const getFilesList3 = (form) => fetch('/first_house/getRecordFiles', form,'post');

export const deletedFiles3 = (form) => fetch('/first_house/delRecordFiles', form,'post');

export const uploadFiles3 = (form) => fetch('/first_house/uploadRecordFiles', form,'post');

export const updateFileName3 = (form) => fetch('/first_house/updateRecordFiles', form,'post');




/*合同
*
* */
export const getFilesList4 = (form) => fetch('/contract/getFiles', form,'post');

export const deletedFiles4 = (form) => fetch('/contract/delFiles', form,'post');

export const uploadFiles4 = (form) => fetch('/contract/uploadFiles', form,'post');

export const updateFileName4 = (form) => fetch('/contract/updateFiles', form,'post');


/*任务
*
* */
export const getFilesList5 = (form) => fetch('/userConceptTask/getFiles', form,'post');

export const deletedFiles5 = (form) => fetch('/userConceptTask/delFiles', form,'post');

export const uploadFiles5 = (form) => fetch('/userConceptTask/uploadFiles', form,'post');

export const updateFileName5 = (form) => fetch('/userConceptTask/updateFiles', form,'post');



/*收支
*
* */
export const getFilesList6 = (form) => fetch('/finance_expenditure/getFiles', form,'post');

export const deletedFiles6 = (form) => fetch('/finance_expenditure/delFiles', form,'post');

export const uploadFiles6 = (form) => fetch('/finance_expenditure/uploadFiles', form,'post');

export const updateFileName6 = (form) => fetch('/finance_expenditure/updateFiles', form,'post');



/*行政
*
* */
export const getFilesList7 = (form) => fetch('/administrative/getReFiles', form,'post');

export const deletedFiles7 = (form) => fetch('/administrative/delReFiles', form,'post');

export const uploadFiles7 = (form) => fetch('/administrative/uploadFiles', form,'post');

export const updateFileName7 = (form) => fetch('/administrative/updateFiles', form,'post');




/*楼盘
*
* */
export const getFilesList8 = (form) => fetch('/area_village/getFiles', form,'post');

export const deletedFiles8 = (form) => fetch('/area_village/delFiles', form,'post');

export const uploadFiles8 = (form) => fetch('/area_village/uploadFiles', form,'post');
export const updateFileName8 = (form) => fetch('/area_village/updateFiles', form,'post');




/*人员图文信息
*
* */
export const getFilesList9 = (form) => fetch('/user/getFiles', form,'post');

export const deletedFiles9 = (form) => fetch('/user/delFiles', form,'post');

export const uploadFiles9 = (form) => fetch('/user/uploadFiles', form,'post');
export const updateFileName9 = (form) => fetch('/user/updateFiles', form,'post');