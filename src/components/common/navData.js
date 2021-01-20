
//导航栏数据
export default {
  navData:[
    {
      index:"1",
      title:"房源管理",
      childNav:[
        {
          index:"1",
          title:"租售列表",
          path:"/home/rent",
          name:"rent",
          type:1,
          meta: {
            keepAlive: true // 不需要缓存
          }
        },
        {
          index:"2",
          title:"房对列表",
          path:"/home/houseCompare",
          name:"houseCompare",
          type:2,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          index:"3",
          title:"跟进记录",
          path:"/home/follow",
          name:"follow",
          type:1,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          index:"4",
          title:"钥匙管理",
          path:"/home/keyManage",
          name:"keyManage",
          type:1,
          meta: {
            keepAlive: true // 需要缓存
          }
        },

      ]
    },
    {
      index:"2",
      title:"新房管理",
      childNav:[
        {
          index:"1",
          title:"项目列表",
          path:"/home/project",
          name:"project",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"8",
          title:"项对列表",
          path:"/home/projectCompare",
          name:"projectCompare",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },

        {
          index:"2",
          title:"户型列表",
          path:"/home/apartmentLayout",
          name:"apartmentLayout",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"报备列表",
          path:"/home/report",
          name:"report",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"4",
          title:"带看记录",
          path:"/home/takeLook",
          name:"takeLook",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"5",
          title:"销售管理",
          path:"/home/projectSell",
          name:"projectSell",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"6",
          title:"项目销控",
          path:"/home/projectSales",
          name:"projectSales",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"7",
          title:"项目销控详情",
          path:"/home/projectSalesDetail/:id",
          name:"projectSalesDetail",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }
      ]
    },
    {
      index:"3",
      title:"客源管理",
      childNav:[
        {
          index:"1",
          title:"客源列表",
          path:"/home/customerSource",
          name:"customerSource",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"客对列表",
          path:"/home/customerCompare",
          name:"customerCompare",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"跟进记录",
          path:"/home/customerFollow",
          name:"follow",
          type:1,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
      ]
    },
    {
      index:"4",
      title:"合同管理",
      childNav:[
        {
          index:"1",
          title:"交易合同",
          path:"/home/transactionContract",
          name:"transactionContract",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"新房进度",
          path:"/home/financeProgress",
          name:"financeProgress",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"应收应付",
          path:"/home/shouldFinance",
          name:"shouldFinance",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"4",
          title:"实收实付",
          path:"/home/realFinance",
          name:"realFinance",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }
      ]
    },
    {
      index:"5",
      title:"统计管理",
      childNav:[
        {
          index:"1",
          title:"房源统计",
          path:"",
          name:"",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"新房统计",
          path:"",
          name:"",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"客源统计",
          path:"",
          name:"",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"4",
          title:"业务统计",
          path:"/home/BusinessStatistics",
          name:"BusinessStatistics",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"5",
          title:"合同统计",
          path:"",
          name:"",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"6",
          title:"业绩统计",
          path:"/home/PerformanceStatistics",
          name:"PerformanceStatistics",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }
      ]
    },
    {
      index:"6",
      title:"组织管理",
      childNav:[
        {
          index:"1",
          title:"组织机构",
          path:"/home/organize",
          name:"organize",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"部门明细",
          path:"/home/derpartment",
          name:"derpartment",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"职位明细",
          path:"/home/joblist",
          name:"joblist",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"4",
          title:"人力统计",
          path:"/home/mancount",
          name:"mancount",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"5",
          title:"人力明细",
          path:"/home/manpowerlist",
          name:"manpowerlist",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"6",
          title:"物理明细",
          path:"/home/physical",
          name:"physical",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"7",
          title:"预算明细",
          path:"/home/budget",
          name:"budget",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"8",
          title:"周比",
          path:"/home/weekcompare",
          name:"weekcompare",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"9",
          title:"月比",
          path:"/home/monthcompare",
          name:"monthcompare",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"10",
          title:"季比",
          path:"/home/seasoncompare",
          name:"seasoncompare",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"11",
          title:"年比",
          path:"/home/yearcompare",
          name:"yearcompare",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },




      ]
    },
    {
      index:"7",
      title:"人事管理",
      childNav:[
        {
          index:"1",
          title:"任务明细",
          path:"/home/testDetails",
          name:"testDetails",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"考勤明细",
          path:"/home/attendance",
          name:"attendance",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"奖罚明细",
          path:"/home/rewardPunish",
          name:"rewardPunish",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"4",
          title:"险金明细",
          path:"/home/InsuranceMoney",
          name:"InsuranceMoney",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"5",
          title:"提金明细",
          path:"/home/goldExtraction",
          name:"goldExtraction",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"6",
          title:"工资明细",
          path:"/home/SalaryDetails",
          name:"SalaryDetails",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"7",
          title:"公积金明细",
          path:"/home/AccumulationFund",
          name:"AccumulationFund",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"8",
          title:"工资明细",
          path:"/home/SalaryDetailsPerson",
          name:"SalaryDetailsPerson",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }
      ]
    },
    {
      index:"8",
      title:"财务管理",
      childNav:[
        {
          index:"1",
          title:"收支统计",
          path:"/home/FinanceStatistics",
          name:"FinanceStatistics",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"收支明细",
          path:"/home/FinanceDetails",
          name:"FinanceDetails",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"预算管理",
          path:"",
          name:"",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"4",
          title:"消耗管理",
          path:"/home/FinanceExpend",
          name:"FinanceExpend",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"5",
          title:"消耗规则管理",
          path:"/home/FinanceExpendRule",
          name:"FinanceExpendRule",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }
      ]
    },
    {
      index:"9",
      title:"行物管理",
      childNav:[
        {
          index:"1",
          title:"行政事件",
          path:"",
          name:"",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"物理管理",
          path:"/home/PhysicalManagementList",
          name:"PhysicalManagementList",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"物理手续",
          path:"/home/PhysicalProcedures",
          name:"PhysicalProcedures",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"物理资产",
          path:"/home/PhysicalAssets",
          name:"PhysicalAssets",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"内部钥匙",
          path:"/home/InternalKey",
          name:"InternalKey",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"内部钥匙",
          path:"/home/InternalKeyKey",
          name:"InternalKeyKey",
          type:2,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"4",
          title:"外联明细",
          path:"/home/OutreachList",
          name:"OutreachList",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"5",
          title:"行政记录",
          path:"/home/AdministrativeRecord",
          name:"AdministrativeRecord",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }
      ]
    },
    {
      index:"10",
      title:"人文管理",
      childNav:[
        {
          index:"1",
          title:"制度公告",
          path:"/home/AnnocunceSystem",
          name:"AnnocunceSystem",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"分享平台",
          path:"/home/AnnocuncePlatform",
          name:"AnnocuncePlatform",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"提案建议",
          path:"",
          name:"",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"4",
          title:"消息中心",
          path:"",
          name:"",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"5",
          title:"黑名单",
          path:"",
          name:"",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }
      ]
    },
    {
      index:"11",
      title:"系统管理",
      childNav:[
        {
          index:"1",
          title:"地域字典",
          path:"/home/areaDetail",
          name:"areaDetail",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"2",
          title:"楼盘字典",
          path:"/home/building",
          name:"building",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"3",
          title:"学校字典",
          path:"/home/school",
          name:"school",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"4",
          title:"基础参数",
          path:"/home/paramsBase",
          name:"paramsBase",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"5",
          title:"可配参数",
          path:"/home/paramsMatch",
          name:"paramsMatch",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"6",
          title:"管理选项",
          path:"/home/manchoose",
          name:"manchoose",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"7",
          title:"操作日志",
          path:"/home/operationlog",
          name:"operationlog",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        },
        {
          index:"8",
          title:"回收站",
          path:"/home/recycle",
          name:"recycle",
          type:1,
          meta: {
            keepAlive: false // 不需要缓存
          }
        }
      ]
    }
  ],
}
