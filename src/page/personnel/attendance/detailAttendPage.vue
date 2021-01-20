<template>
  <div class="" style="margin:0 10px;width:100%;">
    
      <div class="pop-up" style="width:100%;padding:6px 0 0;">
        <el-tabs type="border-card" v-model="getActiveName" @tab-click="changeTab" style="margin:0 10px;" >
          <el-tab-pane label="每日考勤情况" name="single">
            <span slot="label">每日考勤情况</span>

            <div class="search-container" style="height:447px;margin-top:0;overflow:auto;width:100%;">
              <el-form ref="formsData" :model="form">
               
                <div
                  class="search-container clear"
                  style="padding:10px 0 10px 20px;margin:0px 0 5px 10px;"
                  v-for="(item,index) in form.days"
                  :key="index"
                >
                  <div class="left">
                    <div class="clear">
                      <div class="left" style="padding-top:5px;width:30px;text-align:right;">
                        <span style="color:#990000;">{{item.day}}</span>
                      </div>

                      <div class="left padding-l-5">
                         <el-form-item label label-width="0">
                          <CheckSelect :getDisabled="item.timeDisabled || isClosingAccounts" :selectId="item.selectId" @changeSelect="changeSelect" :indexSelect="index" :listData="item.paramDatas" style="margin-top:3px;width:120px;" ></CheckSelect>
                         </el-form-item>
                      </div>
                    </div>
                  </div>

                  <div class="left" style="width:535px" >
                    <div v-if="el.show == 1" :name="el.show" v-for="(el,index) in item.child" :key="index"  class="left" style="width:265px" >
                      <div>
                      <div class="left" style="padding:3px 0 0 7px">
                        <span>{{el.paramName}}</span>
                      </div>
                      <div class="left padding-l-2">
                        <el-form-item label label-width="0">
                          <el-time-picker
                            :disabled="item.timeDisabled || isClosingAccounts"
                            v-model="el.paramTime1"
                            :picker-options="{
                              format: 'HH:mm',
                            }"
                            @change="changTime1(el.paramName,el)"
                            format="HH:mm"
                            value-format="HH:mm"
                            style="width: 70px;"
                           prefix-icon="el-icon-date"
                          ></el-time-picker>
                        </el-form-item>
                      </div>
                      <div v-if="el.paramName!=='早退'&&el.paramName!=='迟到'">
                        <div class="left padding-l-5" style="padding-top:3px">
                          <span>-</span>
                        </div>
                        <div class="left padding-l-2">
                          <el-form-item label label-width="0">
                            <el-time-picker
                              :disabled="item.timeDisabled || isClosingAccounts"
                              v-model="el.paramTime2"
                              @change="changTime2(el.paramName,el)"
                              :picker-options="{
                                format: 'HH:mm',
                              }"
                              format="HH:mm"
                              value-format="HH:mm"
                              prefix-icon="el-icon-date"
                              style="width: 70px;"
                            ></el-time-picker>
                          </el-form-item>
                        </div>
                      </div>
                      <div
                        class="left"
                        v-if="el.paramName!=='时次'&&el.paramName!=='早退'&&el.paramName!=='迟到'"
                      >
                        <el-form-item label label-width="0" prop="paramNum">
                          <el-select :disabled="item.timeDisabled || isClosingAccounts" v-model="el.paramNum" style="width:50px;">
                            <el-option
                              v-for="(item,index) in nums"
                              :key="index"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      </div>
                    </div>

                    <div class="clear left" v-show="item.show == '1'" >
                      <div class="left" style="padding:6px 0 0 7px;">
                        <span>备注</span>
                      </div>
                      <div class="left" style="padding:5px 0 0 2px;" >
                          <textarea :disabled="item.timeDisabled || isClosingAccounts"  class="remark" style="width:472px;height:60px;" title="上限500个字"  maxlength="500"  v-model="item.remark"
                          ></textarea>
                      </div>
                    </div>

                  </div>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="当月考勤总计" name="many">
            <span slot="label">当月考勤总计</span>
            <div class="search-container" style="height:447px;margin:0px;width:100%;">
                <el-form ref="formsData" :model="forms">
                  <div class="clear" style="padding:20px">
                    <div class="left padding-r-2 des-word" style="padding:5px 0 0 10px">
                      <i class="left question-icon" @click="explain"></i>
                    </div>
                    <div class="left" style="padding-left:2px">
                      <span class="des-word">实际出勤天数</span>
                    </div>
                    <div class="left">
                      <el-form-item label label-width="0" prop="day">
                        <el-input  v-if="form.attendanceDaysType == null || form.attendanceDaysType == 1" 
                          type="text"
                          title="上限5位数"
                          style="width:80px;"
                          :maxlength="10"
                          v-model="form.attendanceDays"
                          :disabled="disabled"
                        ></el-input>
                         <el-input v-else
                          @input="checkNumDay"
                          type="text"
                          title="上限5位数"
                          style="width:80px;"
                          :maxlength="5"
                          :disabled="isClosingAccounts"
                          v-model="form.manualAttendanceDays"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left">
                      <el-form-item label label-width="0" prop="attendanceDaysType">
                        <el-select
                          :disabled="isClosingAccounts"
                          style="width:50px;height: 20px;"
                          @change="chooseChange"
                          v-model="form.attendanceDaysType"
                        >
                          <el-option label="自动" value="1">自动</el-option>
                          <el-option label="手动" value="2">手动</el-option>
                        </el-select>
                      </el-form-item>  
                    </div>
                    <div class="left padding-l-5">
                      <el-form-item label label-width="0" prop="remark">
                        <el-input
                          :disabled="isClosingAccounts"
                          :rows="1"
                          style="width:456px;height:30px;"
                          title="上限30个字"
                          :maxlength="30"
                          v-model="form.remark"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear">
                    <div class="left" style="padding-left:84px;">
                      <span class="des-word" style="font-weight:bold">次数</span>
                    </div>
                    <div class="left" style="padding-left:52px;">
                      <span class="des-word" style="font-weight:bold">扣款</span>
                    </div>
                    <div class="left" style="padding-left:282px;">
                      <span class="des-word" style="font-weight:bold">备注</span>
                    </div>
                  </div>

                  <div class="break" style="margin:0 10px 0"></div>
                  <div class="clear" style="padding:20px">
                    <div style="width:700px;height:40px" v-for="(item,index) in everyList" :key="index">
                      <div class="left" style="padding-left:20px">
                        <span class="des-word">{{item.paramName}}</span>
                      </div>
                      <div class="left">
                        <el-form-item label label-width="0" prop="day">
                          <el-input
                            type="text"
                            title="上限10位数"
                            style="width:75px;text-align:center;"
                            :maxlength="10"
                            v-model="item.paramNum"
                            :disabled="true"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="left padding-l-5">
                        <el-form-item label label-width="0" prop="day">
                          <el-input
                            type="text"
                            title="上限10位数"
                            style="width:80px;text-align:center;"
                            :maxlength="10"
                            v-model="item.price"
                            :disabled="true"
                          ></el-input>
                          <span>元</span>
                        </el-form-item>
                      </div>
                      <div class="left padding-l-5">
                        <el-form-item label label-width="0" prop="remark">
                          <el-input
                            :disabled="isClosingAccounts"
                            style="width:456px;height:30px;"
                            title="上限30个字"
                            :maxlength="30"
                            v-model="item.remark"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </el-form>
              </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer clear" style="padding: 3px 0px;">
          <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 10px;" >
            <div class="left" style="padding-right:7px;"  >
              <i class="up-page-icon" @click="upPage($event)" ></i>
            </div>
            <div class="left" >
              <i class="down-page-icon" @click="downPage($event)" ></i>
            </div>
          </div>
          <span class="right save-cancel-btn" style="margin-right:10px;"  @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
      <div class="component-container">
        <Explain :newAttendVisible="newAttendValue" :activeName="activeName" ref="explain"></Explain>
      </div>
      <div class="clear footerabsoluteclass">
      <div class="left footerabsoluteclasschild" >
        <span class="record-word" style="margin-left:0px;">首次录入:</span>
        <span v-if="form.createBy" class="record-word">{{form.createBy}}</span>
        <span v-if="form.createTime" class="record-word">{{form.createTime}}</span>
        <span class="record-word footerpaddingleft10">最后修改:</span>
        <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
        <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {odeparttree } from "../../../service/organizeDate";
import {
  attendEveryMonth,
  getattendParams,
  onleyInsert,
  allInsert,
  detailAttend, 
  updateAttend
} from "../../../service/attendData";
import CheckSelect from "../../../components/checkSpecial1";
import Explain from "./explain";
export default {
  props: ["activeName", "attendId","layerid",'mythisindex'],
  components: {
    CheckSelect,
    Explain
  },
  data() {
    return {
      getActiveName: this.activeName,
      thisindex:this.mythisindex,
      newAttendValue:false,
      paramIdParams:[],
      executorList: [],
      userList: [],
      everyList:[],
      nums:[{id:'0.5',name:'0.5'},{id:'1',name:'1'}],
      addentOneList: [],
      paramMap:{},
      treeData:[],
      getId:this.attendId,
      checked: false,
      totalcheckednum:0,
      departName: "",
      param:"",
      isClosingAccounts:false,// 封账禁用；
      choosePersonIds:'',
      disabled:true,
      defaultProps: {
        children: "children",
        label: "label"
      },

      elemDay: {
        day:'',
        remark:'',
        show:'0',
        child:[]
      },
     
      forms:{

      },
      paramMap:{},
      form: {
        chooseTime: "",
        time: "",
        departId: "",
        userId: "",
        id: "",
        attendanceDaysType:'1',
        attendanceDays:'',
        manualAttendanceDays:'',
        remark:'',
        days: [


        ]
      },
      userId:[],
      tableData:[],
      active1: false,
      active2: false
    };
  },
  
  methods: {
    checkNumDay(){
      this.form.manualAttendanceDays= this.form.manualAttendanceDays.replace(/[^\d]/g,'');
    },
    changTime1(type,elem){
      if(type == '缺卡'){
        elem.paramTime2 = '';
      }
    },
    changTime2(type,elem){
      if(type == '缺卡'){
        elem.paramTime1 = '';
      }
    },
    changeTab(tab) {
      let _this = this;
      let label = tab.label;
      if (label == "每日考勤情况") {
        if (!this.active1) {
          this.active1 = true;
        }
      } else if (label == "当月考勤总计") {
        if (!this.active2) {
          this.active2 = true;
        }
      }
    },
    chooseChange(){
      let attendanceDaysType  = this.form.attendanceDaysType;
      if(attendanceDaysType == 1){
        this.disabled = true; 
      }else{
        this.disabled = false; 
      }
    },
    
    editorAttend() {
       this.getDetialData();
    },
    getDetialData() {
      let _this = this;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      let id = this.getId;
      detailAttend(id).then(res => {
        this.$layer.closeAll("loading");
        if (res.status === 500) {
          return false;
        } else if (res.status === 0) {
          let data = res.data;
          if (data.departTree) {
            let arr = [{ id: "-1", name: " ", select: true }];
            let treeData = data.departTree;
            for (let i = 0; i < treeData.length; i++) {
              arr.push({
                id: treeData[i].id,
                name: treeData[i].label.replace(/&nbsp;/g, ""),
                level: treeData[i].level,
                select: false
              });
            }
            this.executorList = arr;
            
          }
          let paramIdParams = res.data.params.paramIdParams;
          _this.paramIdParams = paramIdParams;
          if(paramIdParams && paramIdParams.length != 0){
            let arr1 = [];
            paramIdParams.forEach(item =>{
              _this.paramMap[item.name] = item.id;
              let obj = {	
                show:'0',
                paramName:item.name,
                paramId:'',
                paramTime1:'',
                paramTime2:'',
                paramNum:'0.5',
              }
              arr1.push(obj);
            })
            _this.elemDay.child = arr1;
          }
          let record = res.data.record;
          let isClosingAccounts = record.isClosingAccounts;
          if(record && record.attendanceDaysType == null){
            record.attendanceDaysType = '1';
          }
          record.days = [];
          _this.form = record;
          if(isClosingAccounts == 1){
            _this.isClosingAccounts = true;
          }else{
            _this.isClosingAccounts = false;
          }  
          
          let startDay = record.startDay;
          let endDay = record.endDay;
          let days = res.data.days;
          let time = record.time;
          let month = res.data.moth;
          _this.everyList = month;
          let startTime = 0;
          let endTime = 50;
          if(startDay){
            startTime = startDay.substring(8)*1;
          }
          if(endDay){
            endTime = endDay.substring(8)*1;
          }
          
          _this.setOneMonthDay(days,time,startTime,endTime);
        }
      });
    },
    setOneMonthDay(days,time,startTime,endTime){
      let arr = [];
      let year = time.split("-")[0];
      let month1 =  time.split("-")[1];
      let month = (new Date(year, month1, 0).getDate())*1;
      for(let i = 0 ; i < month ; i ++){
        
        let obj = JSON.parse(JSON.stringify(days[i]));
        obj.day = (i+1)+"号";
        if(startTime > i+1 || endTime < i+1){
          obj.timeDisabled = true;
        }else{
          obj.timeDisabled = false;
        };
        if(this.form.isClosingAccounts=='1'){
          obj.timeDisabled = true;
        }
        obj.selectId = 'selectId'+i;
        let paramDatas = JSON.parse(JSON.stringify(this.paramIdParams));
        let dayChild = days[i].child;
        let paramIdParams = this.paramIdParams;
        let dayChildMap = {};
        if(dayChild){
          let count = 0;
          dayChild.forEach(item1 => {
            dayChildMap[item1.paramId] = item1;
            paramDatas.forEach(item2 => {
              if(item2.id == item1.paramId){
                item2.select = true;
                count = 1;
              }
            })
          });
          if(count){
            obj.show = '1';
          }
        }
        obj.paramDatas  = paramDatas;
        let arr1 = [];
        if(paramIdParams && paramIdParams.length != 0){
          paramIdParams.forEach(item =>{
            this.paramMap[item.name] = item.id;
            let objChild = {};
            if(dayChildMap[item.id]){
              objChild = dayChildMap[item.id];
              objChild.show = 1;
              objChild.paramName = item.name;
            }else{
              objChild = {	
                show:0,
                paramName:item.name,
                paramId:'',
                paramTime1:'',
                paramTime2:'',
                paramNum:'0.5'
              }
            }
            arr1.push(objChild);
          })
          obj.child = arr1;
        }
        arr.push(obj);
      }
      this.form.days = arr;
    },
    changeSelect(index){
       if(index != null){
         let days = this.form.days;
         let elemDay = days[index];
         if(elemDay){
           let paramDatas = elemDay.paramDatas;
           if(paramDatas && paramDatas.length != 0){
             paramDatas.forEach(item => {
              let name = item.name;
              let select = item.select;
              if(select){
                elemDay.show = '1';
                elemDay.child.forEach(item1 =>{
                  if(item1.paramName == name){
                    item1.show = 1;
                    item1.paramId = item.id;
                  }
                })  
                elemDay.show = '1';
              }else{
                let count = 0;
                elemDay.child.forEach(item1 =>{
                  if(item1.paramName == name){
                    item1.show = 0;
                    item1.paramId = "";
                  }
                  if(item1.show ==1 ){
                    count = 1;
                  }
                })  
                if(count){
                  elemDay.show = '1';
                }else{
                  elemDay.show = '0';
                }
              } 
              
             })
             
           }
         }
       }
    },
    setTimeToMin(time){
      let min = time.split(':')[0];
      let sec = time.split(':')[1];
      let s = Number(min*3600) + Number(sec*60);
      return s;
    },
    explain() {
      this.$refs["explain"].explains();
    },
    saveData() {
      let _this = this;
     
      let form = JSON.parse(JSON.stringify(this.form));
      for(let attr in form){
        if(form[attr] == 'null' || form[attr] == null){
          form[attr] = '';
        }
      }
      let obj = form;
      let days = form.days;
      let arr = [];
      let flag = 0;
      days.forEach(item =>{
        let child = item.child;
        if(child && child.length != 0){
          child.forEach(item1 =>{
            if(item1.show == 1){
              if(item1.paramName == '早退' || item1.paramName == '迟到'){
                let time1 = item1.paramTime1;
                let paramName = item1.paramName;
                if(!time1){
                  this.myAlert(paramName+"不能为空！", "dangerous-icon");
                  flag = 1;
                  return false;
                }
              }else if(item1.paramName == '缺卡' ){
                
              }else{
                let time1 = item1.paramTime1;
                let time2 = item1.paramTime2;
                let paramName = item1.paramName;
                if(!time1 || !time2){
                  this.myAlert(paramName+"不能为空！", "dangerous-icon");
                  flag = 1;
                  return false;
                }
                if(time1 && time2){
                   let getTime1 = this.setTimeToMin(time1);
                   let getTime2 = this.setTimeToMin(time2);
                   if(getTime1 > getTime2){
                     this.myAlert(paramName+"的开始时间不能大于结束时间！", "dangerous-icon");
                      flag = 1;
                      return false;
                   }
                }
              }
            }
          })
        }
      })
      if(flag == 1){
        return false;
      }
      
      days.forEach(item =>{
        let obj1 = item;
        obj1.paramDatas = '';
        let child = item.child;
        let currentChild = [];
        child.forEach(item =>{
          if(item.show == 1){
            if(item){
              for(let attr in item){
                if(item[attr] == 'null' || item[attr] == null){
                  item[attr] = '';
                }
              }
            }
            currentChild.push(item);

          }
        })
        obj1.child = currentChild;
        arr.push(obj1);
      })
      let everyList = this.everyList;
      obj.days = JSON.stringify(arr);
      obj.moth = JSON.stringify(everyList);
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      updateAttend(obj).then(res => {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          
          _this.myAlert("数据保存成功！", "success-icon").then(res => {
              _this.$parent.changeModifyData(_this.form.id);
              _this.cancelData();
            }).catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      });
    },
   
    cancelData() {
      this.$layer.close(this.layerid);
    },
    upPage(e){
      let count = this.thisindex;
      let needlayerid;
      e.path.forEach(item=>{
        if(item.id){
          if(item.id.indexOf('notification')!=-1){
            needlayerid = item.id;
          }
        }
      });
      let callbackdata = this.$parent.changeTitle(count,needlayerid,1);
      this.getId = callbackdata.rowid;
      this.thisindex = callbackdata.thisindex;
      this.editorAttend();
    },

    downPage(e){
      let count = this.thisindex;
      let needlayerid;
      e.path.forEach(item=>{
        if(item.id){
          if(item.id.indexOf('notification')!=-1){
            needlayerid = item.id;
          }
        }
      });
      let callbackdata = this.$parent.changeTitle(count,needlayerid,2)
      this.getId = callbackdata.rowid;
      this.thisindex = callbackdata.thisindex;
      this.editorAttend();
    }, 
  },
  mounted(){
    this.editorAttend();
  },
  beforeDestroy(){
    let _this = this;
    _this.$store.state.layerifranme.forEach((item,index)=>{
      if(item.thisrowid == _this.getId){
        _this.$store.state.layerifranme.splice(index,1);
      }
    })
    _this.$parent.shadenum();
  },

};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs--border-card > .el-tabs__header {
  background: #dcd9d3;
}

/deep/ .pop-up .el-tabs--border-card>.el-tabs__header .el-tabs__item{
  background:url("../../../images/weixuanzhong1.png");
  border-width:0 !important;
  height:24px;
  padding-left:20px !important;
  span{
    position:relative;
    text-align:center;
    display:inline-block;
    top:3px;
    width:107px;
  }
}
/deep/ .pop-up .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background:url("../../../images/xuanzhong1.png");
  color: #909399;
  border-width:0px !important;
  height:24px;
}

/deep/ .el-tabs__nav .is-active {
  height: 24px !important;
  border: none;
}
/deep/ .el-tabs__nav-scroll {
  height: 24px !important;
}
/deep/ .el-tabs--border-card {
  background: #dcd9d3;
  border-width: 0;
}
/deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 0 !important;
}
/deep/ .break {
  border-width: 2px;
  border-top-width: 0px;
  border-style: solid;
  border-image: url("../../../images/system/border.png") 2 repeat;
  margin: 3px 0 0;
}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #00cc66;
}
/deep/ .el-input.is-disabled .el-input__inner{
  text-align:center;
  height:20px !important;
}
.styles {
  padding: 3px 0px 0px 132px !important;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.content {
  height:382px;
  width: 544px;
  position: relative;
  padding: 0px 0px 0px 10px;
}
.require-word:before {
  content: "*";
  color: #f56c6c;
  margin-right: 1px;
}
.padding-l-15 {
  padding-left: 15px;
}
.padding-l-5 {
  padding-left: 5px;
}
.padding-l-2 {
  padding-left: 2px;
}
.padding-l-10 {
  padding-left: 10px;
}
</style>
