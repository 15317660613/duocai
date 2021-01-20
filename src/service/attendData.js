
import fetch from '../config/fetch'

//获取参数
export const getattendParams = (flag) => fetch('/userAttendanceRecord/getParams', 
  flag
, 'post')

export const getattendList = (flag) => fetch('/userAttendanceRecord/list', 
    flag
  , 'post')
  
  export const delAttend = (flag) => fetch('/userAttendanceRecord/delete', 
    flag
  , 'post')
  
  export const onleyInsert = (form) => fetch('/userAttendanceRecord/insert',form, 'post')


  export const allInsert = (form) => fetch('/userAttendanceRecord/inserts',form, 'post')


  export const detailAttend = (id) => fetch('/userAttendanceRecord/detail',{
      id
  }, 'post')



  export const updateAttend = (form) => fetch('/userAttendanceRecord/update',form, 'post')

  export const findAttendUserBydepartId = (form) => fetch('/userAttendanceRecord/getUserList',form, 'post')

  export const attendEveryMonth = (form) => fetch('/userSalary/getAttendanceMonth',form, 'post')
  