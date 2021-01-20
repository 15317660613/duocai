import fetch from '../config/fetch'


/**
 * 登录接口
 */
export const login = (form) => fetch('/user/login',form,'get');
/**
 * 获取首页默认地址
 */

export const cityGuess = (townIds) => fetch('/area/findAreaByTownId', {
  townIds
},'post');

/*楼盘列表数据
*
* */
export const buildingList = () => fetch('/area_village/villageList', {

},'post');

/*通过地域查楼盘列表数据
*
* */
export const findBuildingListByAreaId = (ids,word) => fetch('/area_village/findVillageById', {
  ids,
  word
},'post');


/*通过楼盘检索地域数据
*
* */
export const findBuildingByWord = (townId,streetId,name) => fetch('/area_village/detailByName', {
  townId,
  streetId,
  name
},'post');

/*查重复楼盘
*
* */
export const findRepeatBuilding = () => fetch('/area_village/findReName', {

},'post');



/*获取楼盘下拉参数就扣
*
* */
export const findBuildingParamData = (townId) => fetch('/area_village/getParams', {
  townId
},'post');


/*获取楼盘新增保存
*
* */
export const saveNewBuilding = (form) => fetch('/area_village/insert',form,'post');

/*删除楼盘
*
* */
export const deletedBuilding = (id,deleted) => fetch('/area_village/delete', {
  id,
  deleted
},'post');

/*合并楼盘参数
*
* */
export const mergerBuildingParams = (id) => fetch('/area_village/findMergeParam', {
  id
},'post');

/*合并楼盘
*
* */
export const mergerBuilding = (form) => fetch('/area_village/mergeVillage',form,'post');



/*调动楼盘
*
* */
export const moveBuilding = (id,newTownId,newStreetId) => fetch('/area_village/moveVillage', {
  id,
  newTownId,
  newStreetId
},'post');

/*楼盘规则
*
* */
export const setBuildingRule = (ids,isChoose) => fetch('/area_village/setSeatRules', {
  ids,
  isChoose
},'post');

/*楼盘规则
*
* */
export const setHouseRule = (ids,newRules,oldRules) => fetch('/area_village/setRoomRules', {
  ids,
  newRules,
  oldRules
},'post');


/*获取楼盘详情
*
* */
export const findEditorData = (id) => fetch('/area_village/detail', {
  id
},'post');

/*楼盘名称重复
*
* */
export const checkBuildingName = (id,name,streetId) => fetch('/area_village/checkVillageName', {
  id,
  name,
  streetId
},'post');


/*获取楼盘编辑
*
* */
export const saveEditorBuilding = (form) => fetch('/area_village/update',form,'post');

/*楼盘名称重复
*
* */
export const findSchoolByBuildingId = (id) => fetch('/area_village/getSchools', {
  id
},'post');



/*新增物业主
*
* */
export const newPropertyOwner = (form) => fetch('/areaVillagePropertyOwner/insert',form,'post');

/*物业主详情
*
* */
export const detailPropertyOwnerexport  = (id) => fetch('/areaVillagePropertyOwner/detail', {
  id
},'post');

/*修改物业主
*
* */
export const modifyPropertyOwner = (form) => fetch('/areaVillagePropertyOwner/update',form,'post');

/*删除物业主
*
* */
export const deletedPropertyOwner  = (id,deleted) => fetch('/areaVillagePropertyOwner/delete', {
  id,
  deleted
},'post');

/*校验物业简称重复
*
* */
export const checkPropertyOwnerName  = (id,name) => fetch('/areaVillagePropertyOwner/checkPropertyOwnerName', {
  id,
  name
},'post');

/*校验序号重复
*
* */
export const checkPropertyOwnerNum  = (id,no) => fetch('/areaVillagePropertyOwner/checkPropertyOwnerNo', {
  id,
  no
},'post');



/*物业主列表
*
* */
export const propertyOwnerList  = (word) => fetch('/areaVillagePropertyOwner/getPropertyOwnerList', {
  word
},'post');


/*栋座列表
*
* */
export const pedestalList  = (id,seatId) => fetch('/area_village/detailSeats', {
  id,
  seatId
},'post');

/*新增栋座
*
* */
export const newPedestal = (form) => fetch('/area_village/insertSeat',form,'post');


/*栋座详情
*
* */
export const edtiorPedestal  = (id) => fetch('/area_village/detailSeat', {
  id
},'post');

/*修改栋座
*
* */
export const batchPedestal  = (form) => fetch('/area_village/insertSeats',form,'post');


/*修改栋座
*
* */
export const modifyPedestal  = (form) => fetch('/area_village/updateSeat',form,'post');

/*删除栋座
*
* */
export const deletedPedestal  = (id,deleted) => fetch('/area_village/deleteSeats', {
  id,
  deleted
},'post');

//批量修改栋座
export const batchModifyPedestal = (villageId,oldSeatId,newSeatId) => fetch('/area_village/updateHouseSeat', {
  villageId,
  oldSeatId,
  newSeatId
},'post');

//新增单元
export const addUnit  = (form) => fetch('/area_village/insertUnit',form,'post');

//单元详情
export const editorUnit  = (id) => fetch('/area_village/detailUnit', {
  id
},'post');

//单元修改
export const modifyUnit  = (form) => fetch('/area_village/updateUnit', form,'post');

//删除单元
export const deletedUnit  = (id,deleted) => fetch('/area_village/deleteUnits', {
  id,
  deleted
},'post');


//通过栋座查单元
export const findUnitBySeartId = (id) => fetch('/area_village/getUnitsBySeatId', {
  id
},'post');

//进入房号
export const findSeatHouseNum = (seatId,showAll,unitId,name='') => fetch('/area_village/getRoomsByUnitId', {
  seatId,
  showAll,
  unitId,
  name
},'post');

//新增房号
export const newHouseNum = (form) => fetch('/area_village/insertRoom',form,'post');

//房号详情
export const editorHouseNum = (id) => fetch('/area_village/detailRoom', {
  id
},'post');

//房号修改
export const modifyHouseNum = (form) => fetch('/area_village/updateRoom',form,'post');

//修改房号
export const modifyHouseNums = (form) => fetch('/area_village/updateRooms',form, 'post');


/*删除房号
*
* */
export const deletedHouseNum  = (id,deleted) => fetch('/area_village/deleteRooms', {
  id,
  deleted
},'post');

//批量新增房号
export const batchNewHouseNum = (form) => fetch('/area_village/insertRooms',form,'post');


/*学校列表
*
* */
export const schoolList  = (character,level,type,word,areaId) => fetch('/school/findSchoolByKeys', {
  character,
  level,
  type,
  word,
  areaId
},'post');

/*新增附近学校
*
* */
export const newNearbySchool = (form) => fetch('/school/insertSchoolVillage',form,'post');


/*附近学校详情
*
* */
export const edtiorNearbySchool  = (id,schoolId,villageId) => fetch('/school/schoolVillageDetail', {
  id,
  schoolId,
  villageId
},'post');

/*修改附近学校
*
* */
export const modifyNearbySchool  = (form) => fetch('/school/updateSchoolVillage',form,'post');

/*删除附近学校
*
* */
export const deletedNearbySchool  = (id,deleted) => fetch('/school/deleteSchoolVillage', {
  id,
  deleted
},'post');

/*新增学校
*
* */
export const newSchool = (form) => fetch('/school/insert',form,'post');


/*学校详情
*
* */
export const edtiorSchool  = (id) => fetch('/school/detail', {
  id
},'post');

/*修改学校
*
* */
export const modifySchool  = (form) => fetch('/school/update',form,'post');

/*删除学校
*
* */
export const deletedSchool  = (id,deleted) => fetch('/school/delete', {
  id,
  deleted
},'post');


/**
 * 获取首页默认地址
 */
//新增地域
export const addArea = (preId, name, no,createBy,level) => fetch('/area/insert', {
  preId, name, no,createBy,level
}, 'post').then()
//合并地域
export const mergeArea = (delFlag,newId,oldIds) => fetch('/area/mergeArea', {
  delFlag,newId,oldIds
}, 'post')
//地域列表
export const areList = () => fetch('/area/areaList', {

}, 'post')
//根据地域ID找数据
export const findbyId = (townIds) => fetch('/area/findAreaByTownId', {
  townIds
}, 'post')
//删除地域
export const deleteArea = (deleted,id) => fetch('/area/delete', {
  deleted,id
}, 'post')
//校验名字
export const checkname = (id, name, pre_id) => fetch('/area/checkAreaName', {
  id, name, pre_id
}, 'post')
//校验序号
export const checknum = (id, no, pre_id) => fetch('/area/checkAreaNo', {
  id, no, pre_id
}, 'post')


//修改地域
export const updateArea = (id,preId, name, no, updateBy,level) => fetch('/area/update', {
 id, preId, name, no, updateBy,level
}, 'post')


//新增参数
export const addparam = (name, type,num,remark,createBy) => fetch('/param/insert', {
  name, type,num,remark,createBy
}, 'post')


//参数列表
export const paramList = (type) => fetch('/param/findParamByType', {
  type
}, 'post')


//删除参数
export const deparam = (id) => fetch('/param/delete', {
  id
}, 'post')



//参数详情
export const pdetail = (id) => fetch('/param/detail', {
  id
}, 'post')


//修改参数
export const upparam = (id,name, type,num,remark,createBy) => fetch('/param/update', {
  id,name, type,num,remark,createBy
}, 'post')

//查询子集参数

export const findChildParams = (id,finance = false) => fetch('/param/getParamTree', {
  id,
  finance
}, 'post')



