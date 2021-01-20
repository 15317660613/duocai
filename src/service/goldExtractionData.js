/**
 * Created by nhao on .
 */
import fetch from '../config/fetch'


/**
 * 人月提金
 */
export const goldExtractType1 = (form) => fetch('/tBonus/getUserMonthBonus',form,'post');

/**
 * 人结提金
 */
export const goldExtractType2 = (form) => fetch('/tBonus/getUserBalanceBonus',form,'post');

/**
 * 人笔提金
 */
export const goldExtractType4 = (form) => fetch('/tBonus/bonusDetailList',form,'post');

/**
 * 人总提金
 */
export const goldExtractType3 = (form) => fetch('/tBonus/bonusList',form,'post');

/**
 * 人月提金-业务详情
 */
export const goldExtractEditorBusiness = (form) => fetch('/tBonus/toAllDetail',form,'post');


/**
 * 人月提金-提金详情
 */
export const goldExtractEditor = (form) => fetch('/tBonus/tBonusDetail',form,'post');

/**
 * 人月提金-提金详情
 */
export const goldExtractModify = (form) => fetch('/tBonus/updateTBonus',form,'post');

/**
 * 人月提金-补结算详情
 */
export const goldExtractNoFirstBalance = (form) => fetch('/tBonus/noFirstBalanceDetail',form,'post');


/**
 * 通过部门查人员 -提金
 */
export const findUsersByDepartIdsBouns = (form) => fetch('/tBonus/getUserList',form,'post');

/**
 * 批量保存 人月提金
 */
export const saveBatchBouns = (form) => fetch('/tBonus/insertTBonusUser',form,'post');

/**
 * 批量删除 人月提金
 */
export const deletedBatchBouns = (form) => fetch('/tBonus/delete',form,'post');


/**
 *  人月提金 业务详情
 */
export const goldExtractionBusinessDetail = (form) => fetch('/tBonus/toAllDetail',form,'post');

/**
 *  人月提金 未结提成
 */
export const noGoldExtractionBusinessDetail = (form) => fetch('/tBonus/getMonthAndYearRemarkDatas',form,'post');





/**
 *  人结提金 -三角问号
 */
export const goldExtractionPersonBudgetAngle = (form) => fetch('/tBonus/toBalanceDetail',form,'post');




/**
 *  人总提金-三角问号
 */
export const goldExtractionPersonTotalAngle = (form) => fetch('/tBonus/toNoBalanceDetail',form,'post');


/**
 *  人总提金-三角问号
 */
export const goldExtractionBudgetTime = (form) => fetch('/tBonus/updateBal',form,'post');



/**
 * 总个人欠款-三角问号
 */
export const goldExtractionTotalDebt = (form) => fetch('/tBonus/personalDebtDetial',form,'post');

