const mySalaryDetailsList = [
	{id:'111',bumen:'111',dixin:'111',dykqkk:'111',dyjfkk:'111',dyjfjb:'111',zjbdy:'111',dytcyjn:'111',dytcyjy:'111',dyjjyjy:'111',dytcyyy:'111',bxgs:'111',gjjgs:'111',bxgr:'111',gjjgr:'111',zyjdy:'111',zrldy:'111',dyjjjsn:'111',dytcjsn:'111',dyjjjsy:'111',dytcjsy:'111',zjsdy:'111',wyjjjsn:'111',wyjcjsn:'111',wyjjjsy:'111',wybckk:'111',wybcjb:'111',zsqyf:'111',gss:'111',zshyf:'111',zrlsj:'111',czqk:'111',zzzff:'111',dbke:'111',zsjff:'111',gzfz:'111',fflqzj:'111'},
	{id:'222',bumen:'222',dixin:'222',dykqkk:'222',dyjfkk:'222',dyjfjb:'222',zjbdy:'222',dytcyjn:'222',dytcyjy:'222',dyjjyjy:'222',dytcyyy:'222',bxgs:'222',gjjgs:'222',bxgr:'222',gjjgr:'222',zyjdy:'222',zrldy:'222',dyjjjsn:'222',dytcjsn:'222',dyjjjsy:'222',dytcjsy:'222',zjsdy:'222',wyjjjsn:'222',wyjcjsn:'222',wyjjjsy:'222',wybckk:'222',wybcjb:'222',zsqyf:'222',gss:'222',zshyf:'222',zrlsj:'222',czqk:'222',zzzff:'222',dbke:'222',zsjff:'222',gzfz:'222',fflqzj:'222'},
	{id:'333',bumen:'333',dixin:'333',dykqkk:'333',dyjfkk:'333',dyjfjb:'333',zjbdy:'333',dytcyjn:'333',dytcyjy:'333',dyjjyjy:'333',dytcyyy:'333',bxgs:'333',gjjgs:'333',bxgr:'333',gjjgr:'333',zyjdy:'333',zrldy:'333',dyjjjsn:'333',dytcjsn:'333',dyjjjsy:'333',dytcjsy:'333',zjsdy:'333',wyjjjsn:'333',wyjcjsn:'333',wyjjjsy:'333',wybckk:'333',wybcjb:'333',zsqyf:'333',gss:'333',zshyf:'333',zrlsj:'333',czqk:'333',zzzff:'333',dbke:'333',zsjff:'333',gzfz:'333',fflqzj:'333'},
	{id:'444',bumen:'444',dixin:'444',dykqkk:'444',dyjfkk:'444',dyjfjb:'444',zjbdy:'444',dytcyjn:'444',dytcyjy:'444',dyjjyjy:'444',dytcyyy:'444',bxgs:'444',gjjgs:'444',bxgr:'444',gjjgr:'444',zyjdy:'444',zrldy:'444',dyjjjsn:'444',dytcjsn:'444',dyjjjsy:'444',dytcjsy:'444',zjsdy:'444',wyjjjsn:'444',wyjcjsn:'444',wyjjjsy:'444',wybckk:'444',wybcjb:'444',zsqyf:'444',gss:'444',zshyf:'444',zrlsj:'444',czqk:'444',zzzff:'444',dbke:'444',zsjff:'444',gzfz:'444',fflqzj:'444'},
	{id:'555',bumen:'555',dixin:'555',dykqkk:'555',dyjfkk:'555',dyjfjb:'555',zjbdy:'555',dytcyjn:'555',dytcyjy:'555',dyjjyjy:'555',dytcyyy:'555',bxgs:'555',gjjgs:'555',bxgr:'555',gjjgr:'555',zyjdy:'555',zrldy:'555',dyjjjsn:'555',dytcjsn:'555',dyjjjsy:'555',dytcjsy:'555',zjsdy:'555',wyjjjsn:'555',wyjcjsn:'555',wyjjjsy:'555',wybckk:'555',wybcjb:'555',zsqyf:'555',gss:'555',zshyf:'555',zrlsj:'555',czqk:'555',zzzff:'555',dbke:'555',zsjff:'555',gzfz:'555',fflqzj:'555'},
	{id:'666',bumen:'666',dixin:'666',dykqkk:'666',dyjfkk:'666',dyjfjb:'666',zjbdy:'666',dytcyjn:'666',dytcyjy:'666',dyjjyjy:'666',dytcyyy:'666',bxgs:'666',gjjgs:'666',bxgr:'666',gjjgr:'666',zyjdy:'666',zrldy:'666',dyjjjsn:'666',dytcjsn:'666',dyjjjsy:'666',dytcjsy:'666',zjsdy:'666',wyjjjsn:'666',wyjcjsn:'666',wyjjjsy:'666',wybckk:'666',wybcjb:'666',zsqyf:'666',gss:'666',zshyf:'666',zrlsj:'666',czqk:'666',zzzff:'666',dbke:'666',zsjff:'666',gzfz:'666',fflqzj:'666'}
]
const mySalaryDetailsListPerson = [
	{id:'111',time:'111',name:'111',num1:'111',num2:'111',num3:'111',num4:'111',num5:'111',num6:'111',num7:'111',num8:'111',num9:'111',num10:'111',num11:'111',num12:'111',num13:'111',num14:'111',num15:'111',num16:'111',num17:'111',num18:'111',num19:'111',num20:'111',num21:'111',num22:'111',num23:'111',num24:'111',num25:'111',num26:'111',num27:'111',num28:'111',num29:'111',num30:'111',num31:'111',num32:'111',num33:'111',num34:'111',num35:'111',num36:'3636',num37:'3737'},
	{id:'222',time:'222',name:'222',num1:'222',num2:'222',num3:'222',num4:'222',num5:'222',num6:'222',num7:'222',num8:'222',num9:'222',num10:'222',num11:'222',num12:'222',num13:'222',num14:'222',num15:'222',num16:'222',num17:'222',num18:'222',num19:'222',num20:'222',num21:'222',num22:'222',num23:'222',num24:'222',num25:'222',num26:'222',num27:'222',num28:'222',num29:'222',num30:'222',num31:'222',num32:'222',num33:'222',num34:'222',num35:'222',num36:'3636',num37:'3737'},
	{id:'333',time:'333',name:'333',num1:'333',num2:'333',num3:'333',num4:'333',num5:'333',num6:'333',num7:'333',num8:'333',num9:'333',num10:'333',num11:'333',num12:'333',num13:'333',num14:'333',num15:'333',num16:'333',num17:'333',num18:'333',num19:'333',num20:'333',num21:'333',num22:'333',num23:'333',num24:'333',num25:'333',num26:'333',num27:'333',num28:'333',num29:'333',num30:'333',num31:'333',num32:'333',num33:'333',num34:'333',num35:'333',num36:'3636',num37:'3737'},
	{id:'444',time:'444',name:'444',num1:'444',num2:'444',num3:'444',num4:'444',num5:'444',num6:'444',num7:'444',num8:'444',num9:'444',num10:'444',num11:'444',num12:'444',num13:'444',num14:'444',num15:'444',num16:'444',num17:'444',num18:'444',num19:'444',num20:'444',num21:'444',num22:'444',num23:'444',num24:'444',num25:'444',num26:'444',num27:'444',num28:'444',num29:'444',num30:'444',num31:'444',num32:'444',num33:'444',num34:'444',num35:'444',num36:'3636',num37:'3737'},
	{id:'555',time:'555',name:'555',num1:'555',num2:'555',num3:'555',num4:'555',num5:'555',num6:'555',num7:'555',num8:'555',num9:'555',num10:'555',num11:'555',num12:'555',num13:'555',num14:'555',num15:'555',num16:'555',num17:'555',num18:'555',num19:'555',num20:'555',num21:'555',num22:'555',num23:'555',num24:'555',num25:'555',num26:'555',num27:'555',num28:'555',num29:'555',num30:'555',num31:'555',num32:'555',num33:'555',num34:'555',num35:'555',num36:'3636',num37:'3737'},
	{id:'666',time:'666',name:'666',num1:'666',num2:'666',num3:'666',num4:'666',num5:'666',num6:'666',num7:'666',num8:'666',num9:'666',num10:'666',num11:'666',num12:'666',num13:'666',num14:'666',num15:'666',num16:'666',num17:'666',num18:'666',num19:'666',num20:'666',num21:'666',num22:'666',num23:'666',num24:'666',num25:'666',num26:'666',num27:'666',num28:'666',num29:'666',num30:'666',num31:'666',num32:'666',num33:'666',num34:'666',num35:'666',num36:'3636',num37:'3737'}
]
const SalaryDetailsParams = [
	{id:'111',name:'111',val:'111',remark:'111'},
	{id:'222',name:'222',val:'222',remark:'222'},
	{id:'333',name:'333',val:'333',remark:'333'},
	{id:'444',name:'444',val:'444',remark:'444'},
	{id:'555',name:'555',val:'555',remark:'555'},
	{id:'666',name:'666',val:'666',remark:'666'},
	{id:'777',name:'777',val:'777',remark:'777'},
	{id:'888',name:'888',val:'888',remark:'888'}
]
const iframechildthreethead = [
	{id:2019121901,type:'',width:'100',ref:'',prop:'riqi',label:'日期',sortable:true,show:true,fixed:false,align:'center'},
	{id:2019121902,type:'',width:'200',ref:'',prop:'shixiang',label:'事项',sortable:true,show:true,fixed:false,align:'center'},
	{id:2019121903,type:'',width:'100',ref:'',prop:'jiangfajine',label:'奖罚金额',sortable:true,show:true,fixed:false,align:'center'},
	{id:2019121904,type:'',width:'295',ref:'',prop:'beizhu',label:'备注',sortable:true,show:true,fixed:false,align:'center'}
]
const iframechildthreedata = [
	{id:111,riqi:'111',shixiang:'111',jiangfajine:'111',beizhu:'111'},
	{id:111,riqi:'111',shixiang:'111',jiangfajine:'111',beizhu:'111'},
	{id:111,riqi:'111',shixiang:'111',jiangfajine:'111',beizhu:'111'},
	{id:222,riqi:'222',shixiang:'222',jiangfajine:'222',beizhu:'222'},
	{id:333,riqi:'333',shixiang:'333',jiangfajine:'333',beizhu:'333'},
	{id:444,riqi:'444',shixiang:'444',jiangfajine:'444',beizhu:'444'}
]

const iframechildsingleWagedata = [
	{id:'3',name:'底薪',select:false},
	{id:'3',name:'当月考勤扣款',select:false},
	{id:'3',name:'当月奖罚-扣款',select:false},
	{id:'3',name:'当月奖罚-奖补',select:false},
	{id:'3',name:'当月提成应计（年）',select:false},
	{id:'3',name:'当月奖金应计（月）',select:false},
	{id:'3',name:'当月提成应计（月）',select:false},
	{id:'3',name:'保险（公司）',select:false},
	{id:'3',name:'公积金（公司）',select:false},
	{id:'3',name:'保险（个人）',select:false},
	{id:'3',name:'公积金（个人）',select:false},
	{id:'3',name:'当月奖金结算（年）',select:false},
	{id:'3',name:'当月提成结算（年）',select:false},
	{id:'3',name:'当月奖金结算（月）',select:false},
	{id:'3',name:'当月提成结算（月）',select:false},
	{id:'3',name:'往月奖金结算（年）',select:false},
	{id:'3',name:'往月提成结算（年）',select:false},
	{id:'3',name:'往月奖金结算（月）',select:false},
	{id:'3',name:'往月提成结算（月）',select:false},
	{id:'3',name:'往月补充扣款',select:false},
	{id:'3',name:'往月补充奖补',select:false},
	{id:'3',name:'个所税',select:false},
	{id:'3',name:'代补扣额',select:false}
]

export const mySalaryDetailsListContent = {
  mySalaryDetailsList: mySalaryDetailsList,
  mySalaryDetailsListPerson:mySalaryDetailsListPerson,
  SalaryDetailsParams:SalaryDetailsParams,
  iframechildthreethead:iframechildthreethead,
  iframechildthreedata:iframechildthreedata,
  iframechildsingleWagedata:iframechildsingleWagedata
}
