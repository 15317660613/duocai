const deColumn = [
  {
    id:2019070701,
    type:'selection',
    width:'35',
    ref:'multipleTable',
    prop:'check',
    label:'',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070702,
    type:'',
    width:'150',
    ref:'',
    prop:'num',
    label:'部门编号',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070703,
    type:'',
    width:'80',
    ref:'',
    prop:'name',
    label:'部门名称',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070704,
    type:'',
    width:'80',
    ref:'',
    prop:'state',
    label:'部门状态',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070705,
    type:'',
    width:'100',
    ref:'',
    prop:'phone',
    label:'部门电话',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070706,
    type:'',
    width:'200',
    ref:'',
    prop:'adress',
    label:'部门地址',
    align:'left',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070707,
    type:'',
    width:'100',
    ref:'',
    prop:'prefix',
    label:'房客源编号前缀',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070708,
    type:'',
    width:'200',
    ref:'',
    prop:'remark',
    label:'备注',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },

];
const marketControl = [
  {
    id:2019070701,
    type:'selection',
    width:'35',
    ref:'multipleTable',
    prop:'check',
    label:'',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070702,
    type:'',
    width:'100',
    ref:'',
    prop:'name',
    label:'项目名称',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070703,
    type:'',
    width:'100',
    ref:'',
    prop:'projectState',
    label:'营销状态',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070704,
    type:'',
    width:'70',
    ref:'',
    prop:'districtName',
    label:'区县',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070705,
    type:'',
    width:'70',
    ref:'',
    prop: 'streetName',
    label:'街镇',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070706,
    type:'',
    width:'70',
    ref:'',
    prop:'num1',
    label:'在售',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },

  {
    id:2019070707,
    type:'',
    width:'70',
    ref:'',
    prop:'num2',
    label:'待售',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070707,
    type:'',
    width:'100',
    ref:'',
    prop:'num3',
    label:'我方已签约',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070707,
    type:'',
    width:'100',
    ref:'',
    prop:'num4',
    label:'外方已签约',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070707,
    type:'',
    width:'60',
    ref:'',
    prop:'num5',
    label:'停滞',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
];
const phyColumn = [
  {
    id:1001,
    type:'selection',
    width:'35',
    ref:'multipleTable',
    prop:'check',
    label:'',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1002,
    type:'',
    width:'100',
    ref:'',
    prop:'departName',
    label:'部门名称',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1003,
    type:'',
    width:'140',
    ref:'',
    prop:'name',
    label:'物理简称',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1004,
    type:'',
    width:'50',
    ref:'',
    prop:'stateName',
    label:'状态',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1005,
    type:'',
    width:'140',
    ref:'',
    prop:'responsibleName',
    label:'负责人',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1006,
    type:'',
    width:'100',
    ref:'',
    prop:'houseOwner',
    label:'业主',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },

  {
    id:1007,
    type:'',
    width:'90',
    ref:'',
    prop:'size',
    label:'面积',
    align:'center',
    sortable:true,
    show:true,
    fixed:false,
    child:[
      {
        id:2007,
        pre:1007,
        type:'',
        width:'100',
        ref:'',
        prop:'size',
        titleLabel:'面积',
        num:'count1',
        label:'',
        align:'center',
        sortable:false,
        show:true,
        fixed:false
      },
    ]
  },
  {
    id:1008,
    type:'',
    width:'100',
    ref:'',
    prop:'signingDate',
    label:'签订日',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1009,
    type:'',
    width:'180',
    ref:'',
    prop:'rentTime',
    label:'租期',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1010,
    type:'',
    width:'100',
    ref:'',
    prop:'qualifications',
    label:'资质',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1011,
    type:'',
    width:'100',
    ref:'',
    prop:'business',
    label:'工商',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1012,
    type:'',
    width:'100',
    ref:'',
    prop:'publicSecurity',
    label:'公安',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:1013,
    type:'',
    width:'',
    ref:'',
    prop:'',
    label:'租金',
    align:'center',
    sortable:false,
    show:true,
    fixed:false,
    child:[
      {
        id:2013,
        pre:1013,
        type:'',
        width:'100',
        ref:'',
        prop:'count2',
        titleLabel:'租金',
        num:'',
        label:'租金-元/年',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3013,
            pre:2013,
            type:'',
            width:'100',
            ref:'',
            prop:'yearRent',
            label:'',
            num:'count2',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2014,
        pre:1013,
        type:'',
        width:'100',
        ref:'',
        prop:'count3',
        titleLabel:'租金',
        num:'',
        label:'租金-元/月',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3014,
            pre:2014,
            type:'',
            width:'100',
            ref:'',
            prop:'monthRent',
            label:'',
            num:'count3',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2015,
        pre:1013,
        type:'',
        width:'120',
        ref:'',
        prop:'count4',
        titleLabel:'租金',
        num:'',
        label:'租金-元/平米/天',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3015,
            pre:2015,
            type:'',
            width:'120',
            ref:'',
            prop:'unitRent',
            label:'',
            num:'count4',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2016,
        pre:1013,
        type:'',
        width:'100',
        ref:'',
        prop:'count5',
        titleLabel:'租金',
        num:'',
        label:'租金-付款',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3016,
            pre:2016,
            type:'',
            width:'100',
            ref:'',
            prop:'paymentMethod',
            label:'',
            num:'count5',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
    ]
  },
  {
    id:1017,
    type:'',
    width:'',
    ref:'',
    prop:'',
    label:'物业费',
    align:'center',
    sortable:false,
    show:true,
    fixed:false,
    child:[
      {
        id:2017,
        pre:1017,
        type:'',
        width:'100',
        ref:'',
        prop:'count6',
        titleLabel:'物业费',
        num:'',
        label:'物业费-元/年',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3017,
            pre:2017,
            type:'',
            width:'100',
            ref:'',
            prop:'propertyFee',
            label:'',
            num:'count6',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2018,
        pre:1017,
        type:'',
        width:'120',
        ref:'',
        prop:'count7',
        titleLabel:'物业费',
        num:'',
        label:'物业费-元/平米',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3018,
            pre:2018,
            type:'',
            width:'120',
            ref:'',
            prop:'price',
            label:'',
            num:'count7',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
    ]
  },
  {
    id:1019,
    type:'',
    width:'',
    ref:'',
    prop:'',
    label:'供暖费',
    align:'center',
    sortable:false,
    show:true,
    fixed:false,
    child:[
      {
        id:2019,
        pre:1019,
        type:'',
        width:'100',
        ref:'',
        prop:'count8',
        titleLabel:'供暖费',
        num:'',
        label:'供暖-元/年期',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3019,
            pre:2019,
            type:'',
            width:'100',
            ref:'',
            prop:'heatingCosts',
            label:'',
            num:'count8',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2020,
        pre:1019,
        type:'',
        width:'100',
        ref:'',
        prop:'count9',
        titleLabel:'供暖费',
        num:'',
        label:'供暖公司',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3020,
            pre:2020,
            type:'',
            width:'100',
            ref:'',
            prop:'heatingCompany',
            label:'',
            num:'count9',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
    ]
  },
  {
    id:1021,
    type:'',
    width:'',
    ref:'',
    prop:'',
    label:'网费',
    align:'center',
    sortable:false,
    show:true,
    fixed:false,
    child:[
      {
        id:2021,
        pre:1021,
        type:'',
        width:'100',
        ref:'',
        prop:'count10',
        titleLabel:'网费',
        num:'',
        label:'网费-元/年',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3021,
            pre:2021,
            type:'',
            width:'100',
            ref:'',
            prop:'internetPriceYear',
            label:'',
            num:'count10',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2022,
        pre:1021,
        type:'',
        width:'100',
        ref:'',
        prop:'count11',
        titleLabel:'网费',
        num:'',
        label:'网费-元/月',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3022,
            pre:2022,
            type:'',
            width:'100',
            ref:'',
            prop:'internetPriceMonth',
            label:'',
            num:'count11',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2023,
        pre:1021,
        type:'',
        width:'100',
        ref:'',
        prop:'count12',
        titleLabel:'网费',
        num:'',
        label:'服务商',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3023,
            pre:2023,
            type:'',
            width:'100',
            ref:'',
            prop:'internetName',
            label:'',
            num:'count12',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2024,
        pre:1021,
        type:'',
        width:'100',
        ref:'',
        prop:'count13',
        titleLabel:'网费',
        num:'',
        label:'网费-用户名',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3024,
            pre:2024,
            type:'',
            width:'100',
            ref:'',
            prop:'internetUserName',
            label:'',
            num:'count13',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2025,
        pre:1021,
        type:'',
        width:'110',
        ref:'',
        prop:'count14',
        titleLabel:'网费',
        num:'',
        label:'网费-用户号码',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3025,
            pre:2025,
            type:'',
            width:'110',
            ref:'',
            prop:'internetUserNumber',
            label:'',
            num:'count14',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
      {
        id:2026,
        pre:1021,
        type:'',
        width:'100',
        ref:'',
        prop:'count15',
        titleLabel:'网费',
        num:'',
        label:'合约日',
        align:'center',
        sortable:true,
        show:true,
        fixed:false,
        child:[
          {
            id:3026,
            pre:2026,
            type:'',
            width:'100',
            ref:'',
            prop:'internetTime',
            label:'',
            num:'count15',
            align:'center',
            sortable:false,
            show:true,
            fixed:false,
          }
        ]
      },
    ]
  },
  {
    id:1027,
    type:'',
    width:'100',
    ref:'',
    prop:'remark',
    label:'备注',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
];
const bugtColumn = [
  {
    id:2019070722,
    type:'selection',
    width:'50',
    ref:'multipleTable',
    prop:'',
    label:'',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070723,
    type:'',
    width:'150',
    ref:'',
    prop:'name',
    label:'预算单位',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070724,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070725,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070726,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070727,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
  },
  {
    id:2019070728,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070729,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070730,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070731,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070732,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },
  {
    id:2019070733,
    type:'',
    width:'100',
    ref:'',
    prop:'id',
    label:'年份',
    align:'center',
    sortable:true,
    show:true,
    fixed:false
  },

];

const alevel1=[{
  value: 0,
  label:"00",
  id:"s0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"s1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"s2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"s3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"s4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"s5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"s6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"s7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"s8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"s9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"s10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"s11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"s12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"s13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"s14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"s15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"s16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"s17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"s18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"s19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"s20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"s21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"s22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"s23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"s24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"s25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"s26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"s27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"s28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"s29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"s30",
  disabled:false
},
];
const alevel2=[{
  value: 0,
  label:"00",
  id:"a0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"a1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"a2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"a3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"a4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"a5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"a6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"a7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"a8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"a9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"a10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"a11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"a12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"a13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"a14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"a15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"a16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"a17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"a18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"a19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"a20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"a21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"a22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"a23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"a24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"a25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"a26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"a27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"a28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"a29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"a30",
  disabled:false
},
];
const alevel3=[{
  value: 0,
  label:"00",
  id:"b0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"b1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"b2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"b3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"b4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"b5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"b6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"b7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"b8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"b9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"b10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"b11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"b12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"b13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"b14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"b15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"b16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"b17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"b18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"b19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"b20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"b21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"b22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"b23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"b24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"b25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"b26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"b27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"b28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"b29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"b30",
  disabled:false
},
];
const alevel4=[{
  value: 0,
  label:"00",
  id:"c0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"c1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"c2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"c3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"c4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"c5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"c6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"c7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"c8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"c9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"c10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"c11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"c12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"c13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"c14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"c15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"c16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"c17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"c18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"c19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"c20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"c21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"c22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"c23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"c24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"c25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"c26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"c27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"c28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"c29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"c30",
  disabled:false
},
];
const alevel5=[{
  value: 0,
  label:"00",
  id:"d0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"d1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"d2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"d3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"d4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"d5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"d6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"d7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"d8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"d9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"d10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"d11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"d12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"d13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"d14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"d15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"d16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"d17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"d18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"d19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"d20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"d21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"d22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"d23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"d24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"d25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"d26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"d27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"d28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"d29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"d30",
  disabled:false
},
];

const blevel1=[{
  value: 0,
  label:"00",
  id:"s0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"bs1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"bs2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"bs3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"bs4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"bs5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"bs6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"bs7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"bs8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"bs9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"bs10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"bs11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"bs12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"bs13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"bs14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"bs15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"bs16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"bs17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"bs18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"bs19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"bs20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"bs21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"bs22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"bs23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"bs24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"bs25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"bs26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"bs27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"bs28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"bs29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"bs30",
  disabled:false
},
];
const blevel2=[{
  value: 0,
  label:"00",
  id:"ba0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"ba1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"ba2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"ba3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"ba4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"ba5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"ba6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"ba7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"ba8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"ba9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"ba10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"ba11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"ba12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"ba13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"ba14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"ba15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"ba16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"ba17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"ba18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"ba19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"ba20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"ba21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"ba22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"ba23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"ba24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"ba25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"ba26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"ba27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"ba28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"ba29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"ba30",
  disabled:false
},
];
const blevel3=[{
  value: 0,
  label:"00",
  id:"bb0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"bb1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"bb2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"bb3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"bb4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"bb5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"bb6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"bb7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"bb8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"bb9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"bb10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"bb11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"bb12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"bb13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"bb14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"bb15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"bb16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"bb17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"bb18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"bb19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"bb20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"bb21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"bb22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"bb23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"bb24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"bb25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"bb26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"bb27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"bb28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"bb29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"bb30",
  disabled:false
},
];
const blevel4=[{
  value: 0,
  label:"00",
  id:"bc0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"bc1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"bc2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"bc3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"bc4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"bc5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"bc6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"bc7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"bc8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"bc9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"bc10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"bc11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"bc12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"bc13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"bc14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"bc15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"bc16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"bc17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"bc18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"bc19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"bc20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"bc21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"bc22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"bc23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"bc24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"bc25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"bc26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"bc27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"bc28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"bc29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"bc30",
  disabled:false
},
];
const blevel5=[{
  value: 0,
  label:"00",
  id:"bd0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"bd1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"bd2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"bd3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"bd4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"bd5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"bd6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"bd7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"bd8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"bd9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"bd10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"bd11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"bd12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"bd13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"bd14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"bd15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"bd16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"bd17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"bd18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"bd19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"bd20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"bd21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"bd22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"bd23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"bd24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"bd25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"bd26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"bd27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"bd28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"bd29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"bd30",
  disabled:false
},
];

const clevel1=[{
  value: 0,
  label:"00",
  id:"s0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"cs1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"cs2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"cs3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"cs4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"cs5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"cs6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"cs7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"cs8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"cs9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"cs10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"cs11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"cs12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"cs13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"cs14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"cs15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"cs16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"cs17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"cs18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"cs19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"cs20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"cs21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"cs22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"cs23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"cs24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"cs25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"cs26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"cs27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"cs28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"cs29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"cs30",
  disabled:false
},
];
const clevel2=[{
  value: 0,
  label:"00",
  id:"ca0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"ca1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"ca2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"ca3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"ca4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"ca5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"ca6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"ca7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"ca8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"ca9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"ca10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"ca11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"ca12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"ca13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"ca14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"ca15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"ca16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"ca17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"ca18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"ca19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"ca20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"ca21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"ca22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"ca23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"ca24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"ca25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"ca26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"ca27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"ca28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"ca29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"ca30",
  disabled:false
},
];
const clevel3=[{
  value: 0,
  label:"00",
  id:"cb0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"cb1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"cb2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"cb3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"cb4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"cb5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"cb6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"cb7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"cb8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"cb9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"cb10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"cb11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"cb12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"cb13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"cb14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"cb15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"cb16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"cb17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"cb18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"cb19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"cb20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"cb21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"cb22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"cb23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"cb24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"cb25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"cb26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"cb27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"cb28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"cb29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"cb30",
  disabled:false
},
];
const clevel4=[{
  value: 0,
  label:"00",
  id:"cc0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"cc1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"cc2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"cc3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"cc4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"cc5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"cc6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"cc7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"cc8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"cc9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"cc10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"cc11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"cc12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"cc13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"cc14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"cc15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"cc16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"cc17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"cc18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"cc19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"cc20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"cc21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"cc22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"cc23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"cc24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"cc25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"cc26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"cc27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"cc28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"bc29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"cc30",
  disabled:false
},
];
const clevel5=[{
  value: 0,
  label:"00",
  id:"cd0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"cd1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"cd2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"cd3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"cd4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"cd5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"cd6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"cd7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"cd8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"cd9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"cd10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"cd11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"cd12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"cd13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"cd14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"cd15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"cd16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"cd17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"cd18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"cd19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"cd20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"cd21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"cd22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"cd23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"cd24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"cd25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"cd26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"cd27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"cd28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"cd29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"cd30",
  disabled:false
},
];

const dlevel1=[{
  value: 0,
  label:"00",
  id:"s0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"ds1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"ds2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"ds3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"ds4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"ds5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"ds6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"ds7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"ds8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"ds9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"ds10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"ds11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"ds12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"ds13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"ds14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"ds15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"ds16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"ds17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"ds18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"ds19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"ds20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"ds21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"ds22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"ds23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"ds24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"ds25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"ds26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"ds27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"ds28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"ds29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"ds30",
  disabled:false
},
];
const dlevel2=[{
  value: 0,
  label:"00",
  id:"da0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"da1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"da2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"da3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"da4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"da5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"da6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"da7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"da8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"da9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"da10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"da11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"da12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"da13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"da14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"da15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"da16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"da17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"da18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"da19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"da20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"da21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"da22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"da23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"da24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"da25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"da26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"da27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"da28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"da29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"da30",
  disabled:false
},
];
const dlevel3=[{
  value: 0,
  label:"00",
  id:"cb0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"db1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"db2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"db3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"db4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"db5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"db6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"db7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"db8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"db9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"db10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"db11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"db12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"db13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"db14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"db15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"db16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"db17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"db18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"db19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"db20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"db21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"db22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"db23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"db24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"db25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"db26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"db27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"db28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"db29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"db30",
  disabled:false
},
];
const dlevel4=[{
  value: 0,
  label:"00",
  id:"dc0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"dc1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"dc2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"dc3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"dc4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"dc5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"dc6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"dc7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"dc8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"dc9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"dc10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"dc11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"dc12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"dc13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"dc14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"dc15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"dc16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"dc17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"dc18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"dc19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"dc20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"dc21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"dc22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"dc23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"dc24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"dc25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"dc26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"dc27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"dc28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"dc29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"dc30",
  disabled:false
},
];
const dlevel5=[{
  value: 0,
  label:"00",
  id:"dd0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"dd1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"dd2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"dd3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"dd4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"dd5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"dd6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"dd7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"dd8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"dd9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"dd10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"dd11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"dd12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"dd13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"dd14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"dd15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"dd16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"dd17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"dd18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"dd19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"dd20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"dd21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"dd22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"dd23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"dd24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"dd25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"dd26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"dd27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"dd28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"dd29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"dd30",
  disabled:false
},
];

const elevel1=[{
  value: 0,
  label:"00",
  id:"s0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"es1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"es2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"es3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"es4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"es5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"es6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"es7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"es8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"es9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"es10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"es11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"es12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"es13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"es14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"es15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"es16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"es17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"es18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"es19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"es20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"es21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"es22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"es23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"es24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"es25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"es26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"es27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"es28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"es29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"es30",
  disabled:false
},
];
const elevel2=[{
  value: 0,
  label:"00",
  id:"ea0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"ea1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"ea2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"ea3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"ea4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"ea5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"ea6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"ea7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"ea8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"ea9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"ea10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"ea11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"ea12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"ea13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"ea14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"ea15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"ea16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"ea17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"ea18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"ea19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"ea20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"ea21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"ea22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"ea23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"ea24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"ea25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"ea26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"ea27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"ea28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"ea29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"ea30",
  disabled:false
},
];
const elevel3=[{
  value: 0,
  label:"00",
  id:"cb0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"eb1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"eb2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"eb3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"eb4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"eb5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"eb6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"eb7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"eb8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"eb9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"eb10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"eb11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"eb12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"eb13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"eb14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"eb15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"eb16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"eb17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"eb18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"eb19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"eb20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"eb21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"eb22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"eb23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"eb24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"eb25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"eb26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"eb27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"eb28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"eb29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"eb30",
  disabled:false
},
];
const elevel4=[{
  value: 0,
  label:"00",
  id:"ec0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"ec1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"ec2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"ec3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"ec4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"ec5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"ec6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"ec7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"ec8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"ec9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"ec10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"ec11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"ec12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"ec13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"ec14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"ec15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"ec16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"edc17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"ec18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"ec19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"ec20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"ec21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"ec22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"ec23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"ec24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"ec25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"ec26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"ec27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"ec28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"ec29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"ec30",
  disabled:false
},
];
const elevel5=[{
  value: 0,
  label:"00",
  id:"ed0",
  disabled:false
},{
  value: 1,
  label:"01",
  id:"ed1",
  disabled:false
}, {
  value: 2,
  label:"02",
  id:"ed2",
  disabled:false
}, {
  value: 3,
  label: "03",
  id:"ed3",
  disabled:false
}, {
  value: 4,
  label: "04",
  id:"ed4",
  disabled:false
}, {
  value: 5,
  label: "05",
  id:"ed5",
  disabled:false
},{
  value: 6,
  label: "06",
  id:"ed6",
  disabled:false
},{
  value: 7,
  label: "07",
  id:"ed7",
  disabled:false
},{
  value: 8,
  label: "08",
  id:"ed8",
  disabled:false
},{
  value: 9,
  label: "09",
  id:"ed9",
  disabled:false
},{
  value: 10,
  label: 10,
  id:"ed10",
  disabled:false
},{
  value: 11,
  label: 11,
  id:"ed11",
  disabled:false
},{
  value: 12,
  label: 12,
  id:"ed12",
  disabled:false
},{
  value: 13,
  label: 13,
  id:"ed13",
  disabled:false
},{
  value: 14,
  label: 14,
  id:"ed14",
  disabled:false
},{
  value: 15,
  label: 15,
  id:"ed15",
  disabled:false
},{
  value: 16,
  label: 16,
  id:"ed16",
  disabled:false
},{
  value: 17,
  label: 17,
  id:"ed17",
  disabled:false
},{
  value: 18,
  label: 18,
  id:"ed18",
  disabled:false
},{
  value: 19,
  label: 19,
  id:"ed19",
  disabled:false
},{
  value: 20,
  label: 20,
  id:"ed20",
  disabled:false
},{
  value: 21,
  label: 21,
  id:"ed21",
  disabled:false
},{
  value: 22,
  label: 22,
  id:"ed22",
  disabled:false
},{
  value: 23,
  label: 23,
  id:"ed23",
  disabled:false
},{
  value: 24,
  label: 24,
  id:"ed24",
  disabled:false
},{
  value: 25,
  label: 25,
  id:"ed25",
  disabled:false
},{
  value: 26,
  label: 26,
  id:"ed26",
  disabled:false
},{
  value: 27,
  label: 27,
  id:"ed27",
  disabled:false
},{
  value: 28,
  label: 28,
  id:"ed28",
  disabled:false
},{
  value: 29,
  label: 29,
  id:"ed29",
  disabled:false
},{
  value: 30,
  label: 30,
  id:"ed30",
  disabled:false
},
];


export const departmentParam = {
  deColumn: deColumn,
  phyColumn: phyColumn,
  bugtColumn:bugtColumn,
  marketControl:marketControl,
  alevel1:alevel1,
  alevel2:alevel2,
  alevel3:alevel3,
  alevel4:alevel4,
  alevel5:alevel5,

  blevel1:blevel1,
  blevel2:blevel2,
  blevel3:blevel3,
  blevel4:blevel4,
  blevel5:blevel5,

  clevel1:clevel1,
  clevel2:clevel2,
  clevel3:clevel3,
  clevel4:clevel4,
  clevel5:clevel5,

  dlevel1:dlevel1,
  dlevel2:dlevel2,
  dlevel3:dlevel3,
  dlevel4:dlevel4,
  dlevel5:dlevel5,

  elevel1:elevel1,
  elevel2:elevel2,
  elevel3:elevel3,
  elevel4:elevel4,
  elevel5:elevel5,



}
