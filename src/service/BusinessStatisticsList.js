import fetch from '../config/fetch'

/* 参数集合 */
export const statisticsGetParams = ( ) => fetch('/statistics/getParams',{ },'post');

/* 业务统计列表 */
export const statisticsBusinessCount = (form) => fetch('/statistics/businessCount',form,'post');

/* 指标设置 */
export const statisticsInsertTarget = (form) => fetch('/statistics/insertTarget',form,'post');

/* 指标详情 */
export const statisticsDetailTarget = (form) => fetch('/statistics/detailTarget',form,'post');

/* 业绩统计 */
export const statisticsAchievementCount = (form) => fetch('/statistics/achievementCount',form,'post');