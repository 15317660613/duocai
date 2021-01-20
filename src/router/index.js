import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component:(resolve) => require(['../components/home/home'],resolve),
      children:[
        {
          path: "rent",
          component:(resolve) => require(['../page/house/rent/rent'],resolve),
          meta: {title: '租售列表',name:'rent'},
          name:'rent',
        },

        {
          path: "houseCompare",
          component:(resolve) => require(['../page/house/rent/houseCompare'],resolve),
          meta: {title: '房对列表',name:'houseCompare'},
          name:'houseCompare',
        },
        {
          path: "follow",
          component:(resolve) => require(['../page/house/follow/follow'],resolve),
          meta: {title: '跟进记录',name:'follow'},
          name:'follow',
        },
        {
          path: "keyManage",
          component:(resolve) => require(['../page/house/key/key'],resolve),
          meta: {title: '钥匙管理',name:'keyManage'},
          name:'keyManage',
        },
        {
          path: "project",
          component:(resolve) => require(['../page/newHouse/project/project'],resolve),
          meta: {title: '项目列表',name:'project'},
          name:'project',
        },
        {
          path: "projectCompare",
          component:(resolve) => require(['../page/newHouse/project/projectCompare'],resolve),
          meta: {title: '项对列表',name:'projectCompare'},
          name:'projectCompare',
        },
        {
          path: "projectSell",
          component:(resolve) => require(['../page/newHouse/sell/sell'],resolve),
          meta: {title: '销售管理',name:'projectSell'},
          name:'projectSell',
        },
        {
          path: "customerSource",
          component:(resolve) => require(['../page/customer/customer/customerSource'],resolve),
          meta: {title: '客源列表',name:'customerSource'},
          name:'customerSource',
        },
        {
          path: "customerCompare",
          component:(resolve) => require(['../page/customer/customer/customerCompare'],resolve),
          meta: {title: '客对列表',name:'customerCompare'},
          name:'customerCompare',
        },
        {
          path: "customerFollow",
          component:(resolve) => require(['../page/customer/follow/follow'],resolve),
          meta: {title: '跟进记录',name:'customerFollow'},
          name:'customerFollow',
        },
        {
          path: "transactionContract",
          component:(resolve) => require(['../page/contract/transaction/contractList'],resolve),
          meta: {title: '交易合同',name:'transactionContract'},
          name:'transactionContract',
        },
        {
          path: "financeProgress",
            component:(resolve) => require(['../page/contract/progressFinance/progress'],resolve),
          meta: {title: '新房进度',name:'financeProgress'},
          name:'financeProgress',
        },
        {
          path: "shouldFinance",
            component:(resolve) => require(['../page/contract/shouldFinance/shouldFinance'],resolve),
          meta: {title: '应收应付',name:'shouldFinance'},
          name:'shouldFinance',
        },
        {
          path: "realFinance",
            component:(resolve) => require(['../page/contract/realFinance/realFinance'],resolve),
          meta: {title: '实收实付',name:'realFinance'},
          name:'realFinance',
        },
        {
          path: "projectSales",
          component:(resolve) => require(['../page/newHouse/marketControl/marketControl'],resolve),
          meta: {title: '项目销控',name:'projectSales'},
          name:'projectSales',

        },
        {
          path: "projectSalesDetail",
          component:(resolve) => require(['../page/newHouse/marketControl/marketControlDetail'],resolve),
          meta: {title: '销控详情',name:'projectSalesDetail'},
          name:'projectSalesDetail',
        },
        {
          path: 'building',
          component:(resolve) => require(['../page/system/building/building'],resolve),
          meta: {title: '楼盘字典',name:'building'},
          name:'building',
        },
        {
          path: 'school',
          component:(resolve) => require(['../page/system/school/school'],resolve),
          meta: {title: '学校字典',name:'school'},
          name:'school'
        },
        {
          path: 'areaDetail',
          component:(resolve) => require(['../page/system/aremodel/area'],resolve),
          meta: {title: '地域字典',name:'areaDetail'},
          name:'areaDetail'
        },

        {
          path: 'paramsBase',
          component:(resolve) => require(['../page/system/param/paramsBase'],resolve),
          meta: {title: '基础参数',name:'paramsBase'},
          name:'paramsBase'
        },
        {
          path: 'paramsMatch',
          component:(resolve) => require(['../page/system/param/paramsMatch'],resolve),
          meta: {title: '可配参数',name:'paramsMatch'},
          name:'paramsMatch'
        },
        {
          path: 'manchoose',
          component:(resolve) => require(['../page/organize/mangent/manchoose'],resolve),
          meta: {title: '管理选项',name:'manchoose'},
          name:'manchoose'
        },
        {
          path: 'organize',
          component:(resolve) => require(['../page/organize/organization/organize'],resolve),
          meta: {title: '组织机构',name:'organize'},
          name:'organize'
        },
        {
          path: 'derpartment',
          component:(resolve) => require(['../page/organize/depart/derpartment'],resolve),
          meta: {title: '部门明细',name:'derpartment'},
          name:'derpartment'
        },
        {
          path: 'budget',
          component:(resolve) => require(['../page/organize/budget/budget'],resolve),
          meta: {title: '预算明细',name:'budget'},
          name:'budget'
        },
        {
          path: 'physical',
          component:(resolve) => require(['../page/organize/physicals/physical'],resolve),
          meta: {title: '物理明细',name:'physical'},
          name:'physical'
        },
        {
          path: 'testDetails',
          component:(resolve) => require(['../page/personnel/testDetail/test'],resolve),
          meta: {title: '任务明细',name:'testDetails'},
          name:'testDetails'
        },
         {
          path: 'attendance',
          component:(resolve) => require(['../page/personnel/attendance/attend'],resolve),
          meta: {title: '考勤明细',name:'attendance'},
          name:'attendance'
        },
         {
          path: 'rewardPunish',
          component:(resolve) => require(['../page/personnel/rewardPunish/rewardList'],resolve),
          meta: {title: '奖罚明细',name:'rewardPunish'},
          name:'rewardPunish'
        },
        {
          path: 'goldExtraction',
            component:(resolve) => require(['../page/personnel/goldExtraction/goldExtraction'],resolve),
          meta: {title: '提金明细',name:'goldExtraction'},
          name:'goldExtraction'
        },
        {
          path: 'joblist',
          component:(resolve) => require(['../page/organize/job/joblist'],resolve),
          meta: {title: '职位明细',name:'joblist'},
          name:'joblist'
        },
        {
          path: 'manpowerlist',
          component:(resolve) => require(['../page/organize/manpower/manpowerlist'],resolve),
          meta: {title: '人力明细',name:'manpowerlist'},
          name:'manpowerlist'
        },
        {
          path: 'mancount',
          component:(resolve) => require(['../page/organize/manpower/mancount'],resolve),
          meta: {title: '人力统计',name:'mancount'},
          name:'mancount'
        },
        {
          path: 'weekcompare',
          component:(resolve) => require(['../page/organize/manpower/weekcompare'],resolve),
          meta: {title: '周比',name:'weekcompare'},
          name:'weekcompare'
        },
        {
          path: 'monthcompare',
          component:(resolve) => require(['../page/organize/manpower/monthcompare'],resolve),
          meta: {title: '月比',name:'monthcompare'},
          name:'monthcompare'
        },
        {
          path: 'seasoncompare',
          component:(resolve) => require(['../page/organize/manpower/seasoncompare'],resolve),
          meta: {title: '季比',name:'seasoncompare'},
          name:'seasoncompare'
        },
        {
          path: 'yearcompare',
          component:(resolve) => require(['../page/organize/manpower/yearcompare'],resolve),
          meta: {title: '年比',name:'yearcompare'},
          name:'yearcompare'
        },
        {
          path: 'apartmentLayout',
          component:(resolve) => require(['../page/newHouse/apartmentLayout/apartmentLayout'],resolve),
          meta: {title: '户型列表',name:'apartmentLayout'},
          name:'apartmentLayout'
        },
        {
          path: 'report',
          component:(resolve) => require(['../page/newHouse/report/report'],resolve),
          meta: {title: '报备列表',name:'report'},
          name:'report'
        },
        {
          path: 'takeLook',
          component:(resolve) => require(['../page/newHouse/takeLook/takeLook'],resolve),
          meta: {title: '带看记录',name:'takeLook'},
          name:'takeLook'
        },
        {
          path: 'InsuranceMoney',
          component:(resolve) => require(['../page/personnel/InsuranceMoney/InsuranceMoney'],resolve),
          meta: {title: '险金明细',name:'InsuranceMoney'},
          name:'InsuranceMoney'
        },
        {
          path: 'AccumulationFund',
          component:(resolve) => require(['../page/personnel/InsuranceMoney/AccumulationFund'],resolve),
          meta: {title: '公积金明细',name:'AccumulationFund'},
          name:'AccumulationFund'
        },
        {
          path: 'SalaryDetails',
          component:(resolve) => require(['../page/personnel/SalaryDetails/SalaryDetails'],resolve),
          meta: {title: '工资明细',name:'SalaryDetails'},
          name:'SalaryDetails'
        },

        {
          path: 'SalaryDetailsPerson',
          component:(resolve) => require(['../page/personnel/SalaryDetails/SalaryDetailsPerson'],resolve),
          meta: {title: '工资明细',name:'SalaryDetailsPerson'},
          name:'SalaryDetailsPerson'
        },

        {
          path: 'FinanceDetails',
          component:(resolve) => require(['../page/finance/financeDetails/finance'],resolve),
          meta: {title: '收支明细',name:'FinanceDetails'},
          name:'FinanceDetails'
        },
        {
          path: 'FinanceStatistics',
          component:(resolve) => require(['../page/finance/financeStatistics/statistics'],resolve),
          meta: {title: '收支统计',name:'FinanceStatistics'},
          name:'FinanceStatistics'
        },
        {
          path: 'FinanceExpend',
          component:(resolve) => require(['../page/finance/financeExpend/expend'],resolve),
          meta: {title: '消耗明细',name:'FinanceExpend'},
          name:'FinanceExpend'
        },
        {
          path: 'FinanceExpendRule',
          component:(resolve) => require(['../page/finance/financeExpend/expendRuleManage'],resolve),
          meta: {title: '消耗规则管理',name:'FinanceExpendRule'},
          name:'FinanceExpendRule'
        },
        {
          path: 'OutreachList',
          component:(resolve) => require(['../page/behavior/Outreach/OutreachList'],resolve),
          meta: {title: '外联明细',name:'OutreachList'},
          name:'OutreachList'
        },
        {
          path: 'InternalKey',
          component:(resolve) => require(['../page/behavior/InternalKey/InternalKey'],resolve),
          meta: {title: '内部钥匙',name:'InternalKey'},
          name:'InternalKey'
        },
        {
          path: 'InternalKeyKey',
          component:(resolve) => require(['../page/behavior/InternalKey/InternalKeykey'],resolve),
          meta: {title: '内部钥匙(钥匙)',name:'InternalKeyKey'},
          name:'InternalKeyKey'
        },
        {
          path: 'AdministrativeRecord',
          component:(resolve) => require(['../page/behavior/AdministrativeRecord/AdministrativeRecord'],resolve),
          meta: {title: '行政记录',name:'AdministrativeRecord'},
          name:'AdministrativeRecord'
        },
        {
          path: 'operationlog',
          component:(resolve) => require(['../page/system/operationlog/operationlog'],resolve),
          meta: {title: '操作日志',name:'operationlog'},
          name:'operationlog'
        },
        {
          path: 'recycle',
          component:(resolve) => require(['../page/system/recycle/recycle'],resolve),
          meta: {title: '回收站',name:'recycle'},
          name:'recycle'
        },
        {
          path: 'BusinessStatistics',
          component:(resolve) => require(['../page/statistics/BusinessStatistics/BusinessStatisticsList'],resolve),
          meta: {title: '业务统计',name:'BusinessStatistics'},
          name:'BusinessStatistics'
        },
        {
          path: 'PerformanceStatistics',
          component:(resolve) => require(['../page/statistics/PerformanceStatistics/PerformanceStatisticsList'],resolve),
          meta: {title: '业绩统计',name:'PerformanceStatistics'},
          name:'PerformanceStatistics'
        },
        {
          path: 'PhysicalManagementList',
          component:(resolve) => require(['../page/behavior/PhysicalManagement/PhysicalManagementList'],resolve),
          meta: {title: '物理管理',name:'PhysicalManagementList'},
          name:'PhysicalManagementList'
        },
        {
          path: 'PhysicalProcedures',
          component:(resolve) => require(['../page/behavior/PhysicalManagement/PhysicalProcedures'],resolve),
          meta: {title: '物理手续',name:'PhysicalProcedures'},
          name:'PhysicalProcedures'
        },
        {
          path: 'PhysicalAssets',
          component:(resolve) => require(['../page/behavior/PhysicalManagement/PhysicalAssets'],resolve),
          meta: {title: '物理资产',name:'PhysicalAssets'},
          name:'PhysicalAssets'
        },
        {
          path: 'AnnocunceSystem',
          component:(resolve) => require(['../page/announce/system/systemAnnounce'],resolve),
          meta: {title: '制度公告',name:'AnnocunceSystem'},
          name:'AnnocunceSystem'
        },
        {
          path: 'AnnocuncePlatform',
          component:(resolve) => require(['../page/announce/platform/platformAnnounce'],resolve),
          meta: {title: '分享平台',name:'AnnocuncePlatform'},
          name:'AnnocuncePlatform'
        },
      ]
    },

  ]
})
