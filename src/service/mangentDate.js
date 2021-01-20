import fetch from '../config/fetch'

//合并地域
export const updateSystemSets = (params) => fetch('/system_set/updateSystemSets', {
 params
}, 'post')
export const getSystemSets = () => fetch('/system_set/getSystemSet', {

}, 'post')
