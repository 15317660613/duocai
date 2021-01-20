
const newHouseColumn = [
  
  {
    id:2019121901,
    type:'selection',
    width:'30',
    ref:'multipleTable',
    prop:'check',
    label:'√',
    sortable:true,
    show:true,
    fixed:false,
    align:'left',
  },
  {
    id:2019121902,
    type:'',
    width:'120',
    ref:'',
    prop:'projectName',
    label:'项目名称',
    sortable:true,
    show:true,
    fixed:false,
    align:'left',
  },
  {
    id:2019121903,
    type:'',
    width:'100',
    ref:'',
    prop:'projectCode',
    label:'项目编号',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },
  {
    id:2019121924,
    type:'',
    width:'100',
    ref:'',
    prop:'registerName',
    label:'登记名称',
    sortable:true,
    show:false,
    fixed:false,
    align:'center',
  },
  {
    id:2019121904,
    type:'',
    width:'65',
    ref:'',
    prop:'num',
    label:'自定号',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },
  {
    id:2019121900,
    type:'',
    width:'100',
    ref:'',
    prop:'area',
    label:'地域',
    sortable:true,
    show:false,
    fixed:false,
    align:'left',
  },
  {
    id:2019121905,
    type:'',
    width:'100',
    ref:'',
    prop:'responsibleEmp',
    label:'信息负责人',
    sortable:true,
    show:false,
    fixed:false,
    align:'center',
  },
  {
    id:2019121906,
    type:'',
    width:'100',
    ref:'',
    prop:'projectState',
    label:'营销状态',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },
  {
    id:2019121906,
    type:'',
    width:'100',
    ref:'',
    prop:'cooperateState',
    label:'合作状态',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },
  
  {
    id:2019121911,
    type:'',
    width:'140',
    ref:'',
    prop:'investor',
    label:'投资商',
    sortable:true,
    show:false,
    fixed:false,
    align:'center',
  },
  {
    id:2019121912,
    type:'',
    width:'140',
    ref:'',
    prop:'developer',
    label:'开发商',
    sortable:true,
    show:false,
    fixed:false,
    align:'center',
  },
  {
    id:2019121908,
    type:'',
    width:'90',
    ref:'',
    prop:'placeGetDate',
    label:'拿地日期',
    sortable:true,
    show:false,
    fixed:false,
    align:'center',
  },
  {
    id:2019121907,
    type:'',
    width:'140',
    ref:'',
    prop:'projectAddress',
    label:'销售地址',
    sortable:true,
    show:false,
    fixed:false,
    align:'left',
  },

  {
    id:2019121909,
    type:'',
    width:'90',
    ref:'',
    prop:'avePrice',
    label:'项目均价',
    sortable:true,
    show:true,
    fixed:false,
    align:'right',
  },
  {
    id:201912190229,
    type:'',
    width:'60',
    ref:'',
    prop:'cardNum',
    label:'排卡',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },
  {
    id:2019121910,
    type:'',
    width:'90',
    ref:'',
    prop:'contactor',
    label:'联系人',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },

  {
    id:2019121913,
    type:'',
    width:'90',
    ref:'',
    prop:'documents',
    label:'项目证件',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },
  {
    id:2019121914,
    type:'',
    width:'90',
    ref:'',
    prop:'startDate',
    label:'首开日期',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },
  {
    id:2019121915,
    type:'',
    width:'90',
    ref:'',
    prop:'endDate',
    label:'最晚交房',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },
  {
    id:2019121916,
    type:'',
    width:'90',
    ref:'',
    prop:'propertyYear',
    label:'产权年限',
    sortable:true,
    show:false,
    fixed:false,
    align:'center',
  },
  {
    id:2019121917,
    type:'',
    width:'90',
    ref:'',
    prop:'contactorPhone',
    label:'联系电话',
    sortable:true,
    show:false,
    fixed:false,
    align:'center',
  },{
    id:20191219018,
    type:'',
    width:'90',
    ref:'',
    prop:'coverArea',
    label:'占地面积',
    sortable:true,
    show:false,
    fixed:false,
    align:'right',
  },
  {
    id:2019121919,
    type:'',
    width:'70',
    ref:'',
    prop:'buildingArea',
    label:'建筑面积',
    sortable:true,
    show:false,
    fixed:false,
    align:'right',
  },
  {
    id:2019121920,
    type:'',
    width:'80',
    ref:'',
    prop:'buildingType',
    label:'建筑类型',
    sortable:true,
    show:false,
    fixed:false,
    align:'center',
  },
  {
    id:2019121921,
    type:'',
    width:'70',
    ref:'',
    prop:'ownerCount',
    label:'总户数',
    sortable:true,
    show:false,
    fixed:false,
    align:'center',
  },
  {
    id:2019121922,
    type:'',
    width:'80',
    ref:'',
    prop:'todayShow',
    label:'今日带看',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },
  {
    id:2019121923,
    type:'',
    width:'80',
    ref:'',
    prop:'allShow',
    label:'总带看量',
    sortable:true,
    show:true,
    fixed:false,
    align:'center',
  },

]
const definedParams = [
  {
    id:'一次性',
    name:'一次性',
    select:false,
  },
  {
    id:'重复性',
    name:'重复性',
    select:false,
  },

]
const dayParams = [
  {
    id:'10',
    name:'第10天',
    select:false,
  },
  {
    id:'15',
    name:'15天',
    select:false,
  },
  {
    id:'20',
    name:'20天',
    select:false,
  },
  {
    id:'25',
    name:'25天',
    select:false,
  },
  {
    id:'30',
    name:'30天',
    select:false,
  },
  {
    id:'40',
    name:'40天',
    select:false,
  },
  {
    id:'60',
    name:'60天',
    select:false,
  }
]
const reportRuleParams = [
  {
    id:'全部号码',
    name:'全部号码',
    select:false,
  },
  {
    id:'前三后四',
    name:'前三后四',
    select:false,
  }
]
export const newHouseParam = {
  newHouseColumn: newHouseColumn,
  definedParams:definedParams,
  dayParams:dayParams,
  reportRuleParams:reportRuleParams,

}
