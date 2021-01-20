const BusinessStatistics = [
    {
        id:1001,
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
        id:1002,
        type:'',
        width:'50',
        ref:'',
        prop:'myindex',
        label:'序号',
        titleLabel:'序号',
        sortable:true,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:1003,
        type:'',
        width:'100',
        ref:'',
        prop:'time',
        label:'时期',
        titleLabel:'时期',
        sortable:true,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:1004,
        type:'',
        width:'120',
        ref:'',
        prop:'name',
        titleLabel:'部门/部门-个人/职位',
        label:'部门/部门-个人/职位',
        label1:'部门',
        label2:'部门-个人',
        label3:'职位',
        sortable:true,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:1005,
        type:'',
        width:'80',
        ref:'',
        prop:'count1',
        num:'num1',
        titleLabel:'购房客增',
        label:'购房客增',
        sortable:true,
        show:true,
        fixed:false,
        align:'center',
        child:[
            {
                id:2005,
                pre:1005,
                type:'',
                width:'80',
                ref:'',
                prop:'count1total',
                titleLabel:'购房客增',
                linkhttp:'/home/customerSource',
                thisindex:'1',
                num:'',
                label:'',
                align:'center',
                sortable:false,
                show:true,
                fixed:false
            },
        ],
    },
    {
        id:1006,
        type:'',
        width:'80',
        ref:'',
        prop:'count2',
        num:'num2',
        label:'购房客跟',
        titleLabel:'购房客跟',
        sortable:true,
        show:true,
        fixed:false,
        align:'center',
        child:[
            {
                id:2006,
                pre:1006,
                type:'',
                width:'80',
                ref:'',
                prop:'count2total',
                titleLabel:'购房客增',
                linkhttp:'/home/customerFollow',
                thisindex:'2',
                label:'',
                num:'',
                align:'center',
                sortable:false,
                show:true,
                fixed:false
            },
        ],
    },
    {
        id:1007,
        type:'',
        width:'80',
        ref:'',
        prop:'count3',
        num:'num3',
        label:'租房客增',
        titleLabel:'租房客增',
        sortable:true,
        show:true,
        fixed:false,
        align:'center',
        child:[
            {
                id:2007,
                pre:1007,
                type:'',
                width:'80',
                ref:'',
                prop:'count3total',
                titleLabel:'购房客增',
                linkhttp:'/home/customerSource',
                thisindex:'3',
                label:'',
                num:'',
                align:'center',
                sortable:false,
                show:true,
                fixed:false
            },
        ],
    },
    {
        id:1008,
        type:'',
        width:'80',
        ref:'',
        prop:'count4',
        num:'num4',
        label:'租房客跟',
        titleLabel:'租房客跟',
        sortable:true,
        show:true,
        fixed:false,
        align:'center',
        child:[
            {
                id:2008,
                pre:1008,
                type:'',
                width:'80',
                ref:'',
                prop:'count4total',
                titleLabel:'购房客增',
                linkhttp:'/home/customerFollow',
                thisindex:'4',
                label:'',
                num:'',
                align:'center',
                sortable:false,
                show:true,
                fixed:false
            },
        ],
    },
    {
        id:1009,
        type:'',
        width:'',
        ref:'',
        prop:'count5',
        label:'A二级渠道',
        titleLabel:'A二级渠道',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
        child:[
            {
                id:2009,
                pre:1009,
                type:'',
                width:'80',
                ref:'',
                prop:'count5',
                label:'报备增',
                titleLabel:'A二级渠道',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3009,
                        pre:2009,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count5',
                        num:'num5',
                        prop:'count5total',
                        thisindex:'5',
                        label:'',
                        linkhttp:'/home/report',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2010,
                pre:1009,
                type:'',
                width:'80',
                ref:'',
                label:'带看增',
                titleLabel:'A二级渠道',
                prop:'count6',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3010,
                        pre:2010,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count6',
                        num:'num6',
                        prop:'count6total',
                        thisindex:'6',
                        label:'',
                        link:[{
                            linkhttp:'/home/customerFollow',
                            linkname:'链接客源跟进',
                        },{
                            linkhttp:'/home/takeLook',
                            linkname:'链接带看列表',
                        }],
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2011,
                pre:1009,
                type:'',
                width:'80',
                ref:'',
                label:'排卡增',
                titleLabel:'A二级渠道',
                align:'center',
                prop:'count7',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3011,
                        pre:2011,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count7',
                        num:'num7',
                        prop:'count7total',
                        thisindex:'7',
                        label:'',
                        link:[{
                            linkhttp:'/home/customerSource',
                            linkname:'链接客源列表',
                        },{
                            linkhttp:'/home/project',
                            linkname:'链接项目列表',
                        },{
                            linkhttp:'/home/report',
                            linkname:'链接报备列表',
                        }],
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
        ],
    },
    {
        id:1012,
        type:'',
        width:'',
        ref:'',
        prop:'count8',
        label:'B三级买卖',
        titleLabel:'B三级买卖',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
        child:[
            {
                id:2012,
                pre:1012,
                type:'',
                width:'80',
                ref:'',
                prop:'count8',
                label:'房增',
                titleLabel:'B三级买卖',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3012,
                        pre:2012,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count8',
                        num:'num8',
                        prop:'count8total',
                        thisindex:'8',
                        label:'',
                        linkhttp:'/home/rent',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2013,
                pre:1012,
                type:'',
                width:'80',
                ref:'',
                prop:'count9',
                label:'房跟',
                titleLabel:'B三级买卖',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3013,
                        pre:2013,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count9',
                        num:'num9',
                        prop:'count9total',
                        thisindex:'9',
                        label:'',
                        linkhttp:'/home/follow',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2014,
                pre:1012,
                type:'',
                width:'80',
                ref:'',
                prop:'count10',
                label:'带看增',
                titleLabel:'B三级买卖',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3014,
                        pre:2014,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count10',
                        num:'num10',
                        prop:'count10total',
                        thisindex:'10',
                        label:'',
                        link:[{
                            linkhttp:'/home/follow',
                            linkname:'链接房源跟进',
                        },{
                            linkhttp:'/home/customerFollow',
                            linkname:'链接客源跟进',
                        }],
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2015,
                pre:1012,
                type:'',
                width:'100',
                ref:'',
                prop:'count11',
                num:'number11',
                label:'钥匙房',
                label1:'(钥匙)',
                count:'',
                titleLabel:'B三级买卖',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3015,
                        pre:2015,
                        type:'',
                        width:'100',
                        ref:'',
                        count:'count11',
                        num:'num11',
                        prop:'count11total',
                        thisindex:'11',
                        label:'',
                        linkhttp:'/home/rent',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2016,
                pre:1012,
                type:'',
                width:'100',
                ref:'',
                prop:'count12',
                num:'number12',
                count:'',
                label:'图照房',
                label1:'(图照)',
                titleLabel:'B三级买卖',
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
                        count:'count12',
                        num:'num12',
                        prop:'count12total',
                        thisindex:'12',
                        label:'',
                        linkhttp:'/home/rent',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2017,
                pre:1012,
                type:'',
                width:'100',
                ref:'',
                prop:'count13',
                label:'视频房',
                num:'number13',
                count:'',
                label1:'(视频)',
                titleLabel:'B三级买卖',
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
                        count:'count13',
                        num:'num13',
                        prop:'count13total',
                        thisindex:'13',
                        label:'',
                        linkhttp:'/home/rent',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
        ],
    },
    {
        id:1018,
        type:'',
        width:'',
        ref:'',
        prop:'count14',
        label:'C三级租赁',
        titleLabel:'C三级租赁',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
        child:[
            {
                id:2018,
                pre:1018,
                type:'',
                width:'80',
                ref:'',
                prop:'count14',
                label:'房增',
                titleLabel:'C三级租赁',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3018,
                        pre:2018,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count14',
                        num:'num14',
                        prop:'count14total',
                        thisindex:'14',
                        label:'',
                        linkhttp:'/home/rent',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2019,
                pre:1018,
                type:'',
                width:'80',
                ref:'',
                prop:'count15',
                label:'房跟',
                titleLabel:'C三级租赁',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3019,
                        pre:2019,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count15',
                        num:'num15',
                        prop:'count15total',
                        thisindex:'15',
                        label:'',
                        linkhttp:'/home/follow',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2020,
                pre:1018,
                type:'',
                width:'80',
                ref:'',
                prop:'count16',
                label:'带看增',
                titleLabel:'C三级租赁',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3020,
                        pre:2020,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count16',
                        num:'num16',
                        prop:'count16total',
                        thisindex:'16',
                        label:'',
                        link:[{
                            linkhttp:'/home/follow',
                            linkname:'链接房源跟进',
                        },{
                            linkhttp:'/home/customerFollow',
                            linkname:'链接客源跟进',
                        }],
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2021,
                pre:1018,
                type:'',
                width:'80',
                ref:'',
                prop:'count17',
                num:'number17',
                count:'',
                label:'钥匙房',
                label1:'(钥匙)',
                titleLabel:'C三级租赁',
                align:'center',
                sortable:true,
                show:true,
                fixed:false,
                child:[
                    {
                        id:3021,
                        pre:2021,
                        type:'',
                        width:'80',
                        ref:'',
                        count:'count17',
                        num:'num17',
                        prop:'count17total',
                        thisindex:'17',
                        label:'',
                        linkhttp:'/home/rent',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2022,
                pre:1018,
                type:'',
                width:'100',
                ref:'',
                prop:'count18',
                num:'number18',
                count:'',
                label:'图照房',
                label1:'(图照)',
                titleLabel:'C三级租赁',
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
                        count:'count18',
                        num:'num18',
                        prop:'count18total',
                        thisindex:'18',
                        label:'',
                        linkhttp:'/home/rent',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
            {
                id:2023,
                pre:1018,
                type:'',
                width:'100',
                ref:'',
                prop:'count19',
                num:'number19',
                count:'',
                label:'视频房',
                label1:'(图照)',
                titleLabel:'C三级租赁',
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
                        count:'count19',
                        num:'num19',
                        prop:'count19total',
                        thisindex:'19',
                        label:'',
                        linkhttp:'/home/rent',
                        align:'center',
                        sortable:false,
                        show:true,
                        fixed:false,
                    }
                ]
            },
        ],
    },
]


const newBusinessStatistics = [{
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
        width:'100',
        ref:'',
        prop:'day',
        thisdata:'',
        label:'时期',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121903,
        type:'',
        width:'70',
        ref:'',
        prop:'num1',
        label1:'购房',
        label2:'客增',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121904,
        type:'',
        width:'70',
        ref:'',
        prop:'num2',
        label1:'购房',
        label2:'客跟',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121905,
        type:'',
        width:'70',
        ref:'',
        prop:'num3',
        label1:'租房',
        label2:'客增',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121906,
        type:'',
        width:'70',
        ref:'',
        prop:'num4',
        label1:'租房',
        label2:'客跟',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121907,
        type:'',
        width:'70',
        ref:'',
        prop:'num5',
        label1:'A二级渠道',
        label2:'报备',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121908,
        type:'',
        width:'70',
        ref:'',
        prop:'num6',
        label1:'A二级渠道',
        label2:'带看',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121909,
        type:'',
        width:'70',
        ref:'',
        prop:'num7',
        label1:'A二级渠道',
        label2:'排卡',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121910,
        type:'',
        width:'70',
        ref:'',
        prop:'num8',
        label1:'B三级买卖',
        label2:'房增',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121911,
        type:'',
        width:'70',
        ref:'',
        prop:'num10',
        label1:'B三级买卖',
        label2:'带看',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121912,
        type:'',
        width:'70',
        ref:'',
        prop:'num11',
        label1:'B三级买卖',
        label2:'钥匙房',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121913,
        type:'',
        width:'70',
        ref:'',
        prop:'num12',
        label1:'B三级买卖',
        label2:'图照房',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121914,
        type:'',
        width:'70',
        ref:'',
        prop:'num13',
        label1:'B三级买卖',
        label2:'视频房',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121915,
        type:'',
        width:'70',
        ref:'',
        prop:'num14',
        label1:'C三级租赁',
        label2:'房增',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121916,
        type:'',
        width:'70',
        ref:'',
        prop:'num15',
        label1:'C三级租赁',
        label2:'房跟',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121917,
        type:'',
        width:'70',
        ref:'',
        prop:'num16',
        label1:'C三级租赁',
        label2:'带看',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121918,
        type:'',
        width:'70',
        ref:'',
        prop:'num17',
        label1:'C三级租赁',
        label2:'钥匙房',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121919,
        type:'',
        width:'70',
        ref:'',
        prop:'num18',
        label1:'C三级租赁',
        label2:'图照房',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
    {
        id:2019121920,
        type:'',
        width:'70',
        ref:'',
        prop:'num19',
        label1:'C三级租赁',
        label2:'视频房',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
    },
]

  export const BusinessStatisticsParam = {
    BusinessStatistics: BusinessStatistics,
    newBusinessStatistics:newBusinessStatistics,
  };
  