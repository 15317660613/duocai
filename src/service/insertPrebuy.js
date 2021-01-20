import fetch from '../config/fetch'

//新增认筹
export const AddinsertPrebuy = (form) => fetch('/first_house/insertPrebuy',form,'post');
