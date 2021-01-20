const houseTypeParams = [
    {
      id: "售价降",
      name: "售价降",
      select: false
    },
    {
      id: "售价涨",
      name: "售价涨",
      select: false
    },
    {
      id: "售价修改",
      name: "售价修改",
      select: false
    },
    {
      id: "租价降",
      name: "租价降",
      select: false
    },
    {
      id: "租价涨",
      name: "租价涨",
      select: false
    },
    {
      id: "封盘",
      name: "封盘",
      select: false
    },
    {
      id: "特盘",
      name: "特盘",
      select: false
    },
    {
      id: "私盘",
      name: "私盘",
      select: false
    },
    {
      id: "私盘",
      name: "私盘",
      select: false
    },
    {
      id: "状态修改",
      name: "状态修改",
      select: false
    },
    {
      id: "有效",
      name: "有效",
      select: false
    },
    {
      id: "预定",
      name: "预定",
      select: false
    },
    {
      id: "我售",
      name: "我售",
      select: false
    },
    {
      id: "已售",
      name: "已售",
      select: false
    },
    {
      id: "我租",
      name: "我租",
      select: false
    },
    {
      id: "已租",
      name: "已租",
      select: false
    },
    {
      id: "暂缓",
      name: "暂缓",
      select: false
    },
    {
      id: "未知",
      name: "未知",
      select: false
    },
    {
      id: "无效",
      name: "无效",
      select: false
    }
  ];
  const houseTradeParams = [
    {
      id: "1",
      name: "出售",
      select: false
    },
    {
      id: "2",
      name: "出租",
      select: false
    },
    {
      id: "3",
      name: "租售",
      select: false
    }
  ];
  
  const testList = [
    {
      id:"202022401",
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
      id:"2020224015",
      type:'',
      width:'80',
      ref:'',
      prop:'state',
      label:'人员状态',
      sortable:true,
      show:false,
      fixed:false,
      align:'center',
    },
    {
      id:"2020224015",
      type:'',
      width:'80',
      ref:'',
      prop:'staffId',
      label:'职位',
      sortable:true,
      show:false,
      fixed:false,
      align:'center',
    },
    {
      id:"202022402",
      type:'',
      width:'100',
      ref:'',
      prop:'taskTime',
      label:'规划',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:"202022403",
      type:'',
      width:'200',
      ref:'',
      prop:'user',
      label:'执行人',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:"2020224012",
      type:'',
      width:'150',
      ref:'',
      prop:'report',
      label:'常报',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    
    {
      id:"202022405",
      type:'',
      width:'50',
      ref:'',
      prop:'num',
      label:'序号',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:"202022406",
      type:'',
      width:'80',
      ref:'',
      prop:'taskType',
      label:'类别',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:"2020224010",
      type:'',
      width:'80',
      ref:'',
      prop:'taskState',
      label:'任务状态',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:"2020224011",
      type:'',
      width:'60',
      ref:'',
      prop:'taskStateUser',
      label:'确认人',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    
    {
      id:"2020224013",
      type:'',
      width:'80',
      ref:'',
      prop:'finishState',
      label:'完成状态',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:"2020224014",
      type:'',
      width:'60',
      ref:'',
      prop:'finishStateUser',
      label:'确认人',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:"202022404",
      type:'',
      width:'450',
      ref:'',
      prop:'taskConcept',
      label:'任务概念',
      sortable:true,
      show:true,
      fixed:false,
      align:'center',
    },
    {
      id:"2020224016",
      type:'',
      width:'450',
      ref:'',
      prop:'remark',
      label:'任务备注',
      sortable:true,
      show:false,
      fixed:false,
      align:'center',
    },
    {
      id:"2020224017",
      type:'',
      width:'450',
      ref:'',
      prop:'executeRecord',
      label:'执行方略',
      sortable:true,
      show:false,
      fixed:false,
      align:'center',
    },
    {
      id:"2020224018",
      type:'',
      width:'450',
      ref:'',
      prop:'taskRecord',
      label:'灵感记录',
      sortable:true,
      show:false,
      fixed:false,
      align:'center',
    }
  ];
  export const testParam = {
    testList: testList,
    houseTradeParams: houseTradeParams,
    houseTypeParams: houseTypeParams
  };
  