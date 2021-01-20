function getBeforeDate(num){
  let n = num;
  let d = new Date();
  let s = '';
  let year = d.getFullYear();
  let mon=d.getMonth()+1;
  let day=d.getDate();
  if(day <= n){
    if(mon>1) {
      mon=mon-1;
    }
    else {
      year = year-1;
      mon = 12;
    }
  }
  d.setDate(d.getDate()-n);
  year = d.getFullYear();
  mon=d.getMonth()+1;
  day=d.getDate();
  s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
  return s;
}

function getCurrentDate(){
  let date = new Date();
  let year = date .getFullYear();
  let month = date .getMonth()+1;
  if(month*1 < 10){
    month = "0"+month;
  }
  let day = date.getDate();
  if(day*1 < 10){
    day = "0"+day;
  }
  let currentDate = year +"-"+month +"-"+day;
  return currentDate;
}

function getTwoDateByDay(type){
    let startTime = '',endTime=getCurrentDate();
   if(type == -1){
    endTime = '';
   }else if(type == 1){
      endTime = '';
    }else if(type == 2){
      startTime = getCurrentDate();
    }else if(type == 3){
      startTime = getBeforeDate(2);
    }else if(type == 4){
      startTime = getBeforeDate(6);
    }else if(type == 5){

      var now = new Date();
      now.setMonth(now.getMonth()-1);
      var now2 = new Date();
      now2.setMonth(now.getMonth()+1);
      var resultDate,year,month,date,hms;
      var currDate = new Date();
      year = currDate.getFullYear();
      month = currDate.getMonth()+1;
      date = currDate.getDate();
      switch(month)
      {
        case 1:

          month += 11;
          year--;
          break;
        default:
          month -= 1;
          break;
      }
      month = (month < 10) ? ('0' + month) : month;
      startTime = year + '-'+month+'-'+date;
    }else if(type == 6){
      var now = new Date();
      now.setMonth(now.getMonth()-1);
      var now2 = new Date();
      now2.setMonth(now.getMonth()+1);
      var resultDate,year,month,date,hms;
      var currDate = new Date();
      year = currDate.getFullYear();
      month = currDate.getMonth()+1;
      date = currDate.getDate();
      hms = currDate.getHours() + ':' + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0'+currDate.getSeconds() : currDate.getSeconds());
      switch(month)
      {
        case 1:
        case 2:
        case 3:
          month += 9;
          year--;
          break;
        default:
          month -= 3;
          break;
      }
      month = (month < 10) ? ('0' + month) : month;
      startTime = year + '-'+month+'-'+date;
    }else if(type == 7){
      var now = new Date();
      now.setMonth(now.getMonth()-1);
      var now2 = new Date();
      now2.setMonth(now.getMonth()+1);
      var resultDate,year,month,date,hms;
      var currDate = new Date();
      year = currDate.getFullYear()-1;
      month = currDate.getMonth()+1;
      date = currDate.getDate();
      month = (month < 10) ? ('0' + month) : month;
      startTime = year + '-'+month+'-'+date;
    }else if(type == 8){
      var now = new Date();
      now.setMonth(now.getMonth()-1);
      var now2 = new Date();
      now2.setMonth(now.getMonth()+1);
      var resultDate,year,month,date,hms;
      var currDate = new Date();
      year = currDate.getFullYear();
      month = currDate.getMonth()+1;
      date = currDate.getDate();
      hms = currDate.getHours() + ':' + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0'+currDate.getSeconds() : currDate.getSeconds());
      if(month < 6){
        month += 6;
        year--;
      }else{
        month -= 6;

      }
     
      month = (month < 10) ? ('0' + month+1) : month;
      startTime = year + '-'+month+'-'+date;
    }else if(type == 9){
     var now = new Date();
     now.setMonth(now.getMonth()-1);
     var now2 = new Date();
     now2.setMonth(now.getMonth()+1);
     var resultDate,year,month,date,hms;
     var currDate = new Date();
     year = currDate.getFullYear();
     month = currDate.getMonth()+1;
     date = currDate.getDate();

     month = (month < 10) ? ('0' + month) : month;
     startTime = year + '-'+month+'-'+"01";
   }else if(type == 10){
     //昨天
    startTime = getBeforeDate(1);
    endTime= getBeforeDate(1);
  }else if(type == 11){
     //去年
     var currDate = new Date();
     year = currDate.getFullYear()-1;
     startTime = year + '-'+"01"+'-'+"01";
     endTime=  year + '-'+"12"+'-'+"31";
   }else if(type == 12){
     //本年
     var currDate = new Date();
     year = currDate.getFullYear();
     startTime = year + '-'+"01"+'-'+"01";
   }else if(type == 13){
     //本月
     var currDate = new Date();
     month = currDate.getMonth()+1;
     var MonthNextFirstDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1);
     var lastDay = new Date(MonthNextFirstDay - 86400000);
     var day2 = lastDay.getDate().toString().padStart(2,'0');
     year = currDate.getFullYear();
     month = (month < 10) ? ('0' + month) : month;
     startTime = year + '-'+month+'-'+"01";
     endTime=  year + '-'+month+'-'+day2;
   }else if(type == 14){
     //上月
     var currDate = new Date();
     month = currDate.getMonth();
     var MonthNextFirstDay = new Date(currDate.getFullYear(), currDate.getMonth() , 1);
     var lastDay = new Date(MonthNextFirstDay - 86400000);
     year = currDate.getFullYear();
     month = (month < 10) ? ('0' + month) : month;
     startTime = year + '-'+month+'-'+"01";
     endTime=  year + '-'+month+'-'+lastDay.getDate();
   }else if(type == 15){
      var now = new Date(); // 当前日期
      var nowDayOfWeek = now.getDay(); // 今天本周的第几天
      var nowDay = now.getDate(); // 当前日
      var nowMonth = now.getMonth(); // 当前月
      var nowYear = now.getYear(); // 当前年
      nowYear += (nowYear < 2000) ? 1900 : 0;
      var day = nowDayOfWeek || 7;
     
      startTime =  formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day));
   }else if(type == 16){
     debugger;
      var weekDate = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);// 计算开始时间用
      var weekDate2 = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);// 计算结束时间用

      var day = weekDate.getDay();
      var time = weekDate.getDate()-day+(day===0?-6:1);
      var month1 = startDate.getMonth()+1;
      var day1 = startDate.getDate();
      if(month1 < 10){
        month1 = "0" + month1;
      }
      if(day1 < 10){
        day1 = "0" + day1;
      }
      var startDate = new Date(weekDate.setDate(time));
      startTime = startDate.getFullYear()+'-'+(month1)+'-'+day1;
      var endDate = new Date(weekDate2.setDate(time+6));
      var month2 = endDate.getMonth()+1
      var day2 = endDate.getDate();
      if(month2 < 10){
        month2 = "0" + month2;
      }
      if(day2 < 10){
        day2 = "0" + day2;
      }
      endTime = endDate.getFullYear()+'-'+(month2)+'-'+day2;
   }else if(type == 17){
     //上月补0 格式YYYY-MM-DD
     var currDate = new Date();
     month = currDate.getMonth();
     var MonthNextFirstDay = new Date(currDate.getFullYear(), currDate.getMonth() , 1);
     var lastDay = new Date(MonthNextFirstDay - 86400000);
     year = currDate.getFullYear();
     if (month < 10)  month = '0' + month;
     startTime = year + '-'+month+'-'+"01";
     endTime=  year + '-'+month+'-'+lastDay.getDate();
   }
   else if(type == 18){
     //上月 格式YYYY-MM
     var currDate = new Date();
     month = currDate.getMonth();
     var MonthNextFirstDay = new Date(currDate.getFullYear(), currDate.getMonth() , 1);
     var lastDay = new Date(MonthNextFirstDay - 86400000);
     year = currDate.getFullYear();
     if (month < 10)  month = '0' + month;
     startTime = year + '-'+month;
     endTime=  year + '-'+month;
   }
   else if(type == 19){
     //当月1日到当日
     var currDate = new Date();
     year = currDate.getFullYear();
     month = currDate.getMonth()+1;
     date = currDate.getDate();
     if (month < 10)  month = '0' + month;
     startTime = year + '-'+month+'-'+"01";
     endTime=  year + '-'+month+'-'+date;
   }else if(type == 20){
     //当月 格式YYYY-MM
     var currDate = new Date();
     year = currDate.getFullYear();
     month = currDate.getMonth()+1;
     if (month < 10)  month = '0' + month;
     startTime = year + '-'+month;
     endTime=  year + '-'+month;
   }else if(type == 21){
    //昨天
    startTime = getBeforeDate(1);
    endTime = getBeforeDate(1);
  }
    return {startTime:startTime,endTime:endTime};
}

function getTwoDayByDay(type){
  let startTime = '',endTime=getCurrentDate();
  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth()+1; 
  let day = currDate.getDate(); 
  if(type == -1){
    endTime = '';
  }else if(type ==  1 ){
    startTime = "";
    endTime = "";
  }else if(type == 2){
    startTime = getCurrentDate();
  }else if(type == 3){
    //昨天
    startTime = getBeforeDate(1);
    endTime = getBeforeDate(1);
  }else if(type == 4){
    var now = new Date(); // 当前日期
    var nowDayOfWeek = now.getDay(); // 今天本周的第几天
    var nowDay = now.getDate(); // 当前日
    var nowMonth = now.getMonth(); // 当前月
    var nowYear = now.getYear(); // 当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    day = nowDayOfWeek || 7;
   
    startTime =  formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day));
  }else if(type == 5){
    if (month < 10)  month = '0' + month;
    startTime = year + "-"+month +"-01"
  }else if(type == 6){
    debugger;
    month  = month - 1;
    if(month == 0){
      month = 12
      year = year -1 ;
    }
    if (month < 10)  month = '0' + month;
    startTime = year + "-"+month +"-01";
    var lastDay  = new Date(year,month,0);    
    endTime = year + "-" + month + '-' +lastDay.getDate();
  }else if(type == 7){
    startTime = getBeforeDate(2);
  }else if(type == 8){
    startTime = getBeforeDate(6);
  }else if(type == 9){
    startTime = getBeforeDate(9);
  }else if(type == 10){
    startTime = getBeforeDate(29);
  }else if(type == 11){
    startTime = getBeforeDate(99);
  }

  return {startTime:startTime,endTime:endTime};
}

function getTime(n) {
  let  now = new Date();
  let year = now.getFullYear();
  //因为月份是从0开始的,所以获取这个月的月份数要加1才行
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let day = now.getDay();
  //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
  if (day !== 0) {
    n = n + (day - 1);
  } else {
    n = n + day;
  }
  if (day) {
    //这个判断是为了解决跨年的问题
    if (month > 1) {
      month = month;
    }
    //这个判断是为了解决跨年的问题,月份是从0开始的
    else {
      year = year - 1;
      month = 12;
    }
  }
  now.setDate(now.getDate() - n);
  year = now.getFullYear();
  month = now.getMonth() + 1;
  date = now.getDate();
  // console.log(n);
  var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
  return s;
}
function getTwoWeekByDay(type){
  let startTime = '',endTime=getCurrentDate();
  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth()+1; 
  let day = currDate.getDate(); 
  if(type == -1){
    endTime = '';
  }else if(type ==  1 ){
    startTime = "";
    endTime = "";
  }else if(type == 2){
    startTime = getTime(0);
  }else if(type == 3){
    startTime = getTime(7);
    endTime = getTime(1);
  }else if(type == 4){
    if (month < 10)  month = '0' + month;
    startTime = year + "-"+month +"-01"
    
  }else if(type == 5){
    startTime = year + "-01-01";
  }else if(type == 6){
    startTime = getTime(14);
  }else if(type == 7){
    startTime = getTime(63);
  }else if(type == 8){
    startTime = getTime(203);
  }
  return {startTime:startTime,endTime:endTime};
}
function getTwoMonthByDay(type){
  let startTime = '',endTime=getCurrentDate();
  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth(); 
  if(type == -1){
    endTime = '';
  }else if(type ==  1 ){
    startTime = "";
    endTime = "";
  }else if(type == 2){
    month = month + 1;
    if (month < 10)  month = '0' + month;
    startTime = year + '-'+month;
    endTime=  year + '-'+month;
  }else if(type == 3){
    let startYear = "";
    let startMonth = "";
    startMonth  = startMonth -1;
    if(month == 0){
      startMonth = 12;
      startYear = year - 1;
    }else{
      startMonth = month;
      startYear = year;
    }
   
    if (startMonth < 10)  startMonth = '0' + startMonth;
    if (month < 10)  month = '0' + month;
    startTime = startYear + '-'+startMonth;
    endTime=  year + '-'+month;
  }else if(type == 4){
    let startYear = "";
    let startMonth = "";
    startMonth = month - 1;
    if(startMonth  <= 0 ){
      startMonth = 12 + startMonth;
      startYear = year - 1;
    }else{
      startMonth = startMonth;
      startYear = year;
    }
    month = month + 1;
    if (startMonth < 10)  startMonth = '0' + startMonth;
    if (month < 10)  month = '0' + month;
    startTime = startYear + '-'+startMonth;
    endTime=  year + '-'+month;
  }else if(type == 5){
    let startYear = "";
    let startMonth = "";
    startMonth = month - 4;
    if(startMonth  <= 0 ){
      startMonth = 12 + startMonth;
      startYear = year - 1;
    }else{
      startMonth = startMonth;
      startYear = year;
    }
    month = month + 1;
    if (startMonth < 10)  startMonth = '0' + startMonth;
    if (month < 10)  month = '0' + month;
    startTime = startYear + '-'+startMonth;
    endTime=  year + '-'+month;
  }else if(type == 6){
    let startYear = "";
    let startMonth = "";
    startMonth = month - 10;
    if(startMonth  <= 0 ){
      startMonth = 12 + startMonth;
      startYear = year - 1;
    }else{
      startMonth = startMonth;
      startYear = year;
    }
    month = month + 1;
    if (startMonth < 10)  startMonth = '0' + startMonth;
    if (month < 10)  month = '0' + month;
    startTime = startYear + '-'+startMonth;
    endTime=  year + '-'+month;
  }
  return {startTime:startTime,endTime:endTime};
}
function getTwoQuarterByDay(type){
  let startTime = '',endTime=getCurrentDate();
  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth()+1;
  let currentQuarter = Math.ceil(month/3);
  let startQuarter = currentQuarter;
  let endQuarter = currentQuarter;
  if(type == -1){
    endTime = '';
    startQuarter = '';
    endQuarter = '';
  }else if(type ==  1 ){
    year = "";
    month = "";
    startQuarter = '';
    endQuarter = '';
  }else if(type == 2){
    startTime = year;
    endTime = year;

  }else if(type == 3){
    if((currentQuarter - 1) == 0 ){
      startTime = year-1;
      endTime = year-1;
      startQuarter = 4;
      endQuarter = 4;
    }else{
      startTime = year;
      endTime = year;
      startQuarter = currentQuarter - 1;
      endQuarter = currentQuarter - 1;
    }
  }else if(type == 4){
    startTime = year;
    endTime = year;
    startQuarter = 1;
    endQuarter = currentQuarter;
  }else if(type == 5){
    endTime = year;
    endQuarter = currentQuarter;
    if(currentQuarter == 4){
      startTime = year;
      startQuarter = 1;
    }else{
      startTime = year - 1;
      startQuarter =4 - (4 - currentQuarter - 1);
    }
    
  }else if(type == 6){
    endTime = year-1;
    endQuarter = 4;
    startTime = year - 1;
    startQuarter =1;
  }else if(type == 7){
    endTime = year;
    endQuarter = currentQuarter;
    startTime = year - 2;
    startQuarter =1;
  }
  return {startTime:startTime,endTime:endTime,startQuarter:startQuarter,endQuarter:endQuarter};
}
function getTwoYearByDay(type){
  let startTime = '',endTime=getCurrentDate();
  let currDate = new Date();
  let year = currDate.getFullYear();
  if(type == -1){
    endTime = '';
  }else if(type ==  1 ){
    startTime = "";
    endTime = "";
  }else if(type == 2){
    startTime = year;
    endTime = year;
  }else if(type == 3){
    startTime = year-1;
    endTime = year-1;
  }else if(type == 4){
    startTime = year-2;
    endTime = year;
  }else if(type == 5){
    startTime = year-9;
    endTime = year;
  }
  return {startTime:startTime,endTime:endTime};
}
function getTwoByDay(day){
  let endTime=getCurrentDate();
  let startTime = getBeforeDate(day);
  return {startTime:startTime,endTime:endTime};
}

//格局化日期：yyyy-MM-dd 
function formatDate(date) { 
  var myyear = date.getFullYear(); 
  var mymonth = date.getMonth()+1; 
  var myweekday = date.getDate(); 
   
  if(mymonth < 10){ 
  mymonth = "0" + mymonth; 
  } 
  if(myweekday < 10){ 
  myweekday = "0" + myweekday; 
  } 
  return (myyear+"-"+mymonth + "-" + myweekday); 
} 

export const quickDate = {
  getTwoDateByDay:getTwoDateByDay,
  getTwoByDay:getTwoByDay,
  getTwoYearByDay:getTwoYearByDay,
  getTwoQuarterByDay:getTwoQuarterByDay,
  getTwoMonthByDay:getTwoMonthByDay,
  getTwoWeekByDay:getTwoWeekByDay,
  getTwoDayByDay:getTwoDayByDay,
}
