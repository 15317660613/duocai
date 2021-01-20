import fetch from '../config/fetch'

// 新增修改平台
export const sharingSharingUpOrAdd = (form) => fetch('/sharing/SharingUpOrAdd', form,'post');

// 删除平台 
export const sharingdelete = (form) => fetch('/sharing/delete', form,'post');

// 删除音频 
export const sharingdeleteVD = (form) => fetch('/sharing/deleteVD', form,'post');

// 获取参数 
export const sharinggetNparam = () => fetch('/sharing/getNparam', {},'post');

// 获取分享平台 
export const sharinggetShare = (form) => fetch('/sharing/getShare', form,'post');

// 分享平台列表 
export const sharingsharinglist = (form) => fetch('/sharing/sharinglist', form,'post');

// 播放时间 
export const sharingupdatePlayTime = (form) => fetch('/sharing/updatePlayTime', form,'post');

// 根据职位获取人员(多选)
export const userfindUserByStaffIds = (form) => fetch('/user/findUserByStaffIds', form,'post');

// 根据职位名称搜索职位
export const staffFindStaffByLike = (names) => fetch('/staff/findStaffByLike', names,'post');
