import fetch from '../config/fetch'

//销控列表
export const maketList = (form) => fetch('/first_house/firstHouseMarketingList',form,'post');


//销控详情
export const maketDetail = (form) => fetch('/first_house/firstHouseMarketingDetail',form,'post');

//左侧树状图

export const maketDTree = (id) => fetch('/first_house/firstHouseMarketingTree',{id},'post');


//更新状态

export const updateMaketState = (form) => fetch('/first_house/updateRoomState',form,'post');

