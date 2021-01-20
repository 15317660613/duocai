import fetch from '../config/fetch'

//获取参数
export const apartparam = (flag) => fetch('/first_house/getTypeParams', {
  flag
}, 'post')
//户型列表
export const apartlist = (districtIds,isHighQualitys,projectStates,streetIds,typeName,word) => fetch('/first_house/getTypeList', {
  districtIds,isHighQualitys,projectStates,streetIds,typeName,word
}, 'post')
//户型详情
export const apartdetail = (id) => fetch('/first_house/detailType', {
  id
}, 'post')
//修改户型详情
export const updatapart = (id,projectId,areaHigh,areaLow,avePrice,decorateId,highLightDesc,isHighQuality,price,roomShape1,roomShape2,roomShape3,roomShape4
      ,roomUseId,saleArea,saleBuildingCount,saleHouseCount,suitableFor,typeName) => fetch('/first_house/updateType', {
  id,projectId,areaHigh,areaLow,avePrice,decorateId,highLightDesc,isHighQuality,price,roomShape1,roomShape2,roomShape3,roomShape4
  ,roomUseId,saleArea,saleBuildingCount,saleHouseCount,suitableFor,typeName
}, 'post')
//删除户型
export const delapart = (id,deleted) => fetch('/first_house/deleteType', {
  id,deleted
}, 'post')
