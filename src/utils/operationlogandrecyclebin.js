 const navdata = [
    {
        label: '房源管理',
        id:1,
        children: [
            {label:'新增房源',id:2},
            {label:'修改房源',id:3},
            {label:'删除房源',id:4},
            {label:'上传/修改/删除房源图照',id:5},
            {label:'修改钥匙状态',id:6},
            {label:'查看业主',id:7},
            {label:'删除钥匙',id:8},
            {label:'删除跟进',id:9}
        ]
    }, 
    {
        label: '新房管理',
        id:10,
        children: [
            {label:'新增项目',id:11},
            {label:'修改项目',id:12},
            {label:'删除项目',id:13},
            {label:'新增认筹',id:14},
            {label:'修改认筹',id:15},
            {label:'新增报备',id:16},
            {label:'修改报备',id:17},
            {label:'上传/删除项目图照',id:18},
            {label:'上传/删除报备图照',id:19},
        ]
    },
    {
        label: '客源管理',
        id:20,
        children: [
            {label:'新增客源',id:21},
            {label:'修改客源',id:22},
            {label:'删除客源',id:23},
            {label:'删除跟进',id:24}
        ]
    },
    {
        label: '合同管理',
        id:25,
        children: [
            {label:'新增合同',id:26},
            {label:'修改合同',id:27},
            {label:'删除合同',id:28},
            {label:'新增业绩分成',id:29},
            {label:'修改业绩分成',id:30},
            {label:'删除业绩分成',id:31},
            {label:'新增财务收付',id:32},
            {label:'修改财务收付',id:33},
            {label:'删除财务收付',id:34},
            {label:'上传/删除合同图照',id:35}
        ]
    },
    {
        label: '统计管理',
        id:36,
    },
    {
        label: '组织管理',
        id:37,
        children: [
            {label:'新增部门',id:38},
            {label:'修改部门',id:39},
            {label:'删除部门',id:40},
            {label:'部门调动',id:41},
            {label:'物理调动',id:42},
            {label:'新增人员',id:43},
            {label:'修改人员',id:44},
            {label:'删除人员',id:45},
            {label:'人员调动',id:46},
            {label:'新增职位',id:47},
            {label:'修改职位',id:48},
            {label:'删除职位',id:49},
            {label:'新增职位账套',id:50},
            {label:'修改职位账套',id:51},
            {label:'删除职位账套',id:52}
        ]
    },
    {
        label: '人事管理',
        id:53,
        children: [
            {label:'新增任务',id:54},
            {label:'修改任务',id:55},
            {label:'删除任务',id:56},
            {label:'新增考勤',id:57},
            {label:'修改考勤',id:58},
            {label:'删除考勤',id:59},
            {label:'新增奖罚',id:60},
            {label:'修改奖罚',id:61},
            {label:'删除奖罚',id:62},
            {label:'新增险金',id:63},
            {label:'修改险金',id:64},
            {label:'删除险金',id:65},
            {label:'新增工资',id:66},
            {label:'修改工资',id:67},
            {label:'删除工资',id:68}
        ]
    },
    {
        label: '财务管理',
        id:69,
        children: [
            {label:'新增收支',id:70},
            {label:'修改收支',id:71},
            {label:'删除收支',id:72},
            {label:'修改消耗品管理',id:73},
            {label:'删除消耗品管理',id:74},
        ]
    },
    {
        label: '行物管理',
        id:75,
        children: [
            {label:'新增内部钥匙',id:76},
            {label:'修改内部钥匙',id:77},
            {label:'删除内部钥匙',id:78},
            {label:'新增行政记录',id:79},
            {label:'修改行政记录',id:80},
            {label:'删除行政记录',id:81},
            {label:'新增外联',id:82},
            {label:'修改外联',id:83},
            {label:'删除外联',id:84},
        ]
    },
    {
        label: '人文管理',
        id:85,
        children: [
            {label:'新增制度公告',id:86},
            {label:'修改制度公告',id:87},
            {label:'删除制度公告',id:88},
            {label:'新增分享平台',id:89},
            {label:'修改分享平台',id:90},
            {label:'删除分享平台',id:91},
        ]
    },
    {
        label: '系统管理',
        id:92,
        children: [
            {label:'新增地域',id:93},
            {label:'修改地域',id:94},
            {label:'删除地域',id:95},
            {label:'新增楼盘',id:96},
            {label:'修改楼盘',id:97},
            {label:'删除楼盘',id:98},
            {label:'新增学校',id:99},
            {label:'修改学校',id:100},
            {label:'删除学校',id:101},
            {label:'修改管理选项',id:102}
        ]
    },
]

 const recycledata = [
    {
        label: '房源管理',
        id:1,
        children: [
            {label:'租售列表',id:2},
        ]
    }, 
    {
        label: '新房管理',
        id:10,
        children: [
            {label:'项目列表',id:11},
            {label:'户型列表',id:12},
            {label:'报备列表',id:13},
            {label:'销售管理',id:14},
            {label:'平台公司',id:15},
            {label:'销售公司',id:16}
        ]
    },
    {
        label: '客源管理',
        id:20,
        children: [
            {label:'客源列表',id:21}
        ]
    },
    {
        label: '合同管理',
        id:25,
        children: [
            {label:'交易合同',id:26},
            {label:'合同财务',id:27}
        ]
    },
    {
        label: '组织管理',
        id:36,
        children: [
            {label:'部门',id:26},
            {label:'人员',id:27},
            {label:'职位',id:22}
        ]
    },
    {
        label: '人事管理',
        id:37,
        children: [
            {label:'任务管理',id:38},
            {label:'考勤明细',id:39},
            {label:'奖罚明细',id:40},
            {label:'险金明细-保险',id:41},
            {label:'险金明细-公积金',id:42},
            {label:'提金明细',id:43},
            {label:'工资明细',id:44}
        ]
    },
    {
        label: '财务管理',
        id:53,
        children: [
            {label:'收支管理',id:54},
            {label:'消耗管理',id:55}
        ]
    },
    {
        label: '行物管理',
        id:69,
        children: [
            {label:'行政事件',id:70},
            {label:'内部钥匙',id:71},
            {label:'外联明细',id:72},
            {label:'行政记录',id:73}
        ]
    },
    {
        label: '人文管理',
        id:75,
        children: [
            {label:'制度公告',id:76},
            {label:'分享平台',id:77},
        ]
    },
    {
        label: '系统管理',
        id:85,
        children: [
            {label:'地域字典',id:80},
            {
                label:'楼盘字典',
                id:86,
                children:[
                    {label:'楼盘',id:81},
                    {label:'物业主',id:82}
                ]
            },
            {label:'学校字典',id:87}
        ]
    },
]

const operationlogthead = [
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
      align:'center',
    },
    {
      id:2019121902,
      type:'',
      width:'180',
      ref:'',
      prop:'time',
      label:'操作时间',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:2019121902,
      type:'',
      width:'180',
      ref:'',
      prop:'userName',
      label:'操作人',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:2019121902,
      type:'',
      width:'550',
      ref:'',
      prop:'content',
      label:'操作内容',
      sortable:true,
      show:true,
      fixed:false,
      align:'left',
    }
]
//租售列表
const recyclethead_RentalList = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'roomCode',label:'房源编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'80',ref:'',prop:'district',label:'区县',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'80',ref:'',prop:'street',label:'街道',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'160',ref:'',prop:'adress',label:'地址',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'50',ref:'',prop:'ownerName',label:'业主',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'90',ref:'',prop:'emp1',label:'归属人1',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'150',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]
//钥匙管理
const recyclethead_KeyManagement = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'roomCode',label:'房源编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'keyTypeId',label:'钥匙类型',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'150',ref:'',prop:'emp',label:'负责人',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'state',label:'状态',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'150',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]
//项目列表
const recyclethead_ProjectList = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'projectCode',label:'项目编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'districtId',label:'区县',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'130',ref:'',prop:'streetId',label:'街道',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'projectName',label:'地址',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'contactor',label:'负责人',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//户型列表
const recyclethead_HouseType = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'projectName',label:'项目名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'typeName',label:'户型名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'roomShape',label:'户型',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//报备列表
const recyclethead_ReportList = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'reportNum',label:'报备编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'projectName',label:'项目名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'customerName',label:'客户名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'reportPerson',label:'报备人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//销售管理
const recyclethead_SalesManagement = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'prepurchaseNum',label:'认购编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'170',ref:'',prop:'adress',label:'项目/栋座/房号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'80',ref:'',prop:'roomStateName',label:'状态',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'customerName',label:'客户名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//平台公司
const recyclethead_PlatformCompany = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'platformCompany',label:'平台公司',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'110',ref:'',prop:'联系人员',label:'联系人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'contactPhone',label:'联系电话',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//销售公司
const recyclethead_SaleCompany = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'contactCompany',label:'销售公司',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'110',ref:'',prop:'contactEmp',label:'销售人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'contactPhone',label:'销售电话',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//客源列表
const recyclethead_ListCustomers = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'customerCode',label:'客户编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'80',ref:'',prop:'customerType',label:'交易',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'90',ref:'',prop:'name',label:'客户',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'phoneNum',label:'手机号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'delegateDate',label:'委托日期',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'90',ref:'',prop:'empId1',label:'归属人1',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//交易合同
const recyclethead_TransactionContract = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'contractCode',label:'合同编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'140',ref:'',prop:'roomAddress',label:'房源地址',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'ownerName',label:'业主姓名',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'customerName',label:'客户姓名',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//合同财务
const recyclethead_ContractFinance = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'150',ref:'',prop:'contractName',label:'合同名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'60',ref:'',prop:'businessType1',label:'收付',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'getPayDate',label:'收付日期',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'90',ref:'',prop:'businessType',label:'业类',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'sourceGetAmount',label:'应收/实收金额',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'80',ref:'',prop:'sourceGetId',label:'收方',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'targetPayAmount',label:'应付/实付金额',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'80',ref:'',prop:'targetPayId',label:'付方',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//部门
const recyclethead_department = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'150',ref:'',prop:'num',label:'部门编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'name',label:'部门名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//人员
const recyclethead_personnel = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'90',ref:'',prop:'num',label:'人员编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'name',label:'姓名',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'80',ref:'',prop:'gender',label:'性别',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'depart',label:'部门',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//职位
const recyclethead_position = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'90',ref:'',prop:'num',label:'职位编号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'name',label:'职位名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'90',ref:'',prop:'state',label:'状态',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//任务管理
const recyclethead_taskManagement = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'taskTime',label:'规划',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'user',label:'执行人',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'150',ref:'',prop:'taskConcept',label:'任务概念',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//考勤明细
const recyclethead_AttendanceDetails = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'time',label:'考勤年月',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'user',label:'部门人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//奖罚明细
const recyclethead_DetailsPunishments = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'time',label:'奖罚年月',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'user',label:'部门人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//险金明细-保险
const recyclethead_DetailsPremium_Insurance = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'time',label:'缴存年月',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'user',label:'部门人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//险金明细-公积金
const recyclethead_DetailsPremium_accumulationFund = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'time',label:'缴存年月',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'user',label:'部门人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//提金明细
const recyclethead_DetailsWithdrawal = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'time',label:'年月',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'user',label:'部门人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//工资明细
const recyclethead_SalaryDetails = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'time',label:'年月',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'user',label:'部门人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//收支管理
const recyclethead_RevenueEexpenditureManagement = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'number',label:'收支流水号',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'150',ref:'',prop:'event',label:'事件',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'90',ref:'',prop:'price',label:'金额',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'80',ref:'',prop:'time',label:'收支时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'financeUserId',label:'财务人',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//消耗管理
const recyclethead_ConsumptionManagement = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'time',label:'消耗年月',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'user',label:'消耗人员',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//内部钥匙
const recyclethead_InternalKey = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'150',ref:'',prop:'paramId',label:'钥匙名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'200',ref:'',prop:'userId',label:'负责人',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//外联明细
const recyclethead_OutreachDetails = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'typeId',label:'类型',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'200',ref:'',prop:'organizationName',label:'外联名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'adname',label:'负责人',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//行政记录
const recyclethead_AdministrativeRecords = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'100',ref:'',prop:'createTime',label:'录入日',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'200',ref:'',prop:'event',label:'事件记录',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'type',label:'类型',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//地域字典
const recyclethead_RegionalDictionary = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'200',ref:'',prop:'name',label:'街道名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//楼盘
const recyclethead_PropertiesForSale = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'adress',label:'地域',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'90',ref:'',prop:'name',label:'楼盘名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//物业主
const recyclethead_PropertyOwner = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'shortName',label:'名称（简）',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'110',ref:'',prop:'userName',label:'联系人',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'tel',label:'联系电话',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]

//学校字典
const recyclethead_SchoolDictionary = [
    {id:2019121901,type:'selection',width:'30',ref:'multipleTable',prop:'check',label:'√',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'200',ref:'',prop:'areaName',label:'学校地址',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'200',ref:'',prop:'name',label:'学校名称',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedTime',label:'删除时间',sortable:true,show:true,fixed:false,align:'center'},
    {id:2019121902,type:'', width:'120',ref:'',prop:'deletedBy',label:'删除人员',sortable:true,show:true,fixed:false,align:'center'},
]
export const mynavdata = {
  navdata: navdata,
  recycledata:recycledata,
  operationlogthead:operationlogthead,
  recyclethead_RentalList:recyclethead_RentalList,
  recyclethead_KeyManagement:recyclethead_KeyManagement,
  recyclethead_ProjectList:recyclethead_ProjectList,
  recyclethead_HouseType:recyclethead_HouseType,
  recyclethead_ReportList:recyclethead_ReportList,
  recyclethead_SalesManagement:recyclethead_SalesManagement,
  recyclethead_PlatformCompany:recyclethead_PlatformCompany,
  recyclethead_SaleCompany:recyclethead_SaleCompany,
  recyclethead_ListCustomers:recyclethead_ListCustomers,
  recyclethead_TransactionContract:recyclethead_TransactionContract,
  recyclethead_ContractFinance:recyclethead_ContractFinance,
  recyclethead_department:recyclethead_department,
  recyclethead_personnel:recyclethead_personnel,
  recyclethead_position:recyclethead_position,
  recyclethead_taskManagement:recyclethead_taskManagement,
  recyclethead_AttendanceDetails:recyclethead_AttendanceDetails,
  recyclethead_DetailsPunishments:recyclethead_DetailsPunishments,
  recyclethead_DetailsPremium_Insurance:recyclethead_DetailsPremium_Insurance,
  recyclethead_DetailsPremium_accumulationFund:recyclethead_DetailsPremium_accumulationFund,
  recyclethead_DetailsWithdrawal:recyclethead_DetailsWithdrawal,
  recyclethead_SalaryDetails:recyclethead_SalaryDetails,
  recyclethead_RevenueEexpenditureManagement:recyclethead_RevenueEexpenditureManagement,
  recyclethead_ConsumptionManagement:recyclethead_ConsumptionManagement,
  recyclethead_InternalKey:recyclethead_InternalKey,
  recyclethead_OutreachDetails:recyclethead_OutreachDetails,
  recyclethead_AdministrativeRecords:recyclethead_AdministrativeRecords,
  recyclethead_RegionalDictionary:recyclethead_RegionalDictionary,
  recyclethead_PropertiesForSale:recyclethead_PropertiesForSale,
  recyclethead_PropertyOwner:recyclethead_PropertyOwner,
  recyclethead_SchoolDictionary:recyclethead_SchoolDictionary
}   
