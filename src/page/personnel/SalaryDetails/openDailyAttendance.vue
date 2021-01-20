<template>
  <div style="width:100%;margin:0 10px;" >
    <div class="pop-up" style="width:100%;padding:0;">
      <div style="padding:10px 10px;" >
        <el-tabs type="border-card" v-model="getActiveName" @tab-click="changeTab">
          <el-tab-pane label="每日考勤扣款" name="single">
            <span slot="label">每日考勤扣款</span>

            <div class="search-container" style="height:460px;margin:0;width:100%;overflow:auto">
               <el-form ref="formsData" :model="form">
                
                <div
                  class="search-container clear"
                  style="padding:10px 20px;margin:0px 0 5px 10px;"
                  v-for="(item,index) in form.days"
                  :key="index"
                >
                  <div class="left">
                    <div class="clear">
                      <div class="left" style="padding-top:5px">
                        <span style="color:#990000;">{{item.day}}</span>
                      </div>

                      <div class="left padding-l-5">
                        <el-form-item label label-width="0">
                          <CheckSelect :selectId="item.selectId" :getDisabled=true  @changeSelect="changeSelect" :indexSelect="index" :listData="item.paramDatas" style="margin-top:3px;width:120px;" ></CheckSelect>
                        </el-form-item>
                      </div>
                    </div>
                  </div>

                  <div class="left" style="width:500px" >
                    <div v-show="el.show == 1" :name="el.show" v-for="(el,index) in item.child" :key="index"  class="left" style="width:279px" >
                      <div>
                      <div class="left" style="padding:3px 0 0 7px">
                        <span>{{el.paramName}}</span>
                      </div>
                      <div class="left padding-l-2">
                        <el-form-item label label-width="0">
                          <el-time-picker
                          :disabled="true"
                            v-model="el.paramTime1"
                            :picker-options="{
                              format: 'HH:mm',
                            }"
                            format="HH:mm"
                            value-format="HH:mm"
                            style="width: 91px;"
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
                            :disabled="true"
                              v-model="el.paramTime2"
                              :picker-options="{
                                format: 'HH:mm',
                              }"
                              format="HH:mm"
                              value-format="HH:mm"
                              prefix-icon="el-icon-date"
                              style="width: 91px;"
                            ></el-time-picker>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="left" v-if="el.paramName!=='时次'&&el.paramName!=='早退'&&el.paramName!=='迟到'">
                        <el-form-item label label-width="0" prop="paramNum">
                          <el-select v-model="el.paramNum" disabled style="width:50px;">
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

                    <div class="clear left" >
                      <div class="left" style="padding:6px 0 0 7px;">
                        <span>备注</span>
                      </div>
                      <div class="left" style="padding:5px 0 0 2px;" >
                          <textarea disabled="disabled" class="remark" style="width:460px;height:60px;resize: none;" title="上限500个字"  maxlength="500"  v-model="item.remark"
                          ></textarea>
                      </div>
                    </div>

                  </div>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="当月扣款总计" name="many">
            <span slot="label">当月扣款总计</span>
            <div class="search-container" style="height:460px;margin:0px;width:100%;">
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
                      <el-input
                        type="text"
                        title="上限10位数"
                        style="width:80px;"
                        :maxlength="10"
                        v-model="forms.day"
                        :disabled="disableds"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left">
                    <el-form-item label label-width="0" prop="paramNum">
                      <el-select
                        style="width:50px;"
                        @change="chooseChange"
                        v-model="choose"
                        disabled
                      >
                        <el-option label="自动" value="1">自动</el-option>
                        <el-option label="手动" value="2">手动</el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-l-5">
                    <el-form-item label label-width="0" prop="remark">
                      <el-input
                        style="width:456px;height:30px;"
                        title="上限30个字"
                        disabled
                        :maxlength="10"
                        v-model="forms.remark"
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
                          style="width:75px;"
                          :maxlength="10"
                          v-model="item.paramNum"
                          :disabled="disableds"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-l-5">
                      <el-form-item label label-width="0" prop="day">
                        <el-input
                          type="text"
                          title="上限10位数"
                          style="width:80px;"
                          :maxlength="10"
                          v-model="item.price"
                          :disabled="disableds"
                        ></el-input>
                        <span>元</span>
                      </el-form-item>
                    </div>
                    <div class="left padding-l-5">
                      <el-form-item label label-width="0" prop="remark">
                        <el-input
                          style="width:456px;height:30px;"
                          title="上限30个字"
                          disabled
                          :maxlength="10"
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
       </div>  
    </div>
    <div class="clear footerabsoluteclass">
        <div class="left footerabsoluteclasschild" >
          <span class="record-word">录入:</span>
          <span class="record-word" >{{form.createBy}}</span>
          <span class="record-word footerpaddingleft10">录入时间:</span>
          <span class="record-word" >{{form.createTime}}</span>
          <span class="record-word footerpaddingleft20">最后修改:</span>
          <span class="record-word" >{{form.updateBy}}</span>
          <span class="record-word footerpaddingleft10">最后修改时间:</span>
          <span class="record-word" >{{form.updateTime}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import {findUserByDepartId} from "../../../service/organizeDate";
import CheckSelect from "../../../components/checkSpecial1";
import {
  getattendParams,
  onleyInsert,
  allInsert,
  detailAttend, 
  updateAttend
} from "../../../service/attendData";
import {userSalarygetAttendanceDetail } from "../../../service/SalaryDetails"
import AttendanceDaysDescription from "./AttendanceDaysDescription";
export default {
  props: ["thisrow"],
  
  data() {
    return {
      getActiveName: 'single',
      dialogNewFollow: this.newAttendVisible,
      executorList: [],
      userList: [],
      nums:[{id:'0.5',name:'0.5'},{id:'1',name:'1'}],
      addentOneList: [],
      checked: false,
      choose: "自动",
      paramMap: {},
      departName: "",
      disableds: "",
      everyList:[],
      paramIdParams:[],
      defaultProps: {
        children: "children",
        label: "label"
      },
      forms: {
        day: ""
      },
      
      elemDay: {
        day:'',
        remark:'',
        show:1,
        child:[]
      },
      form: {
        chooseTime: "",
        time: "",
        departId: "",
        userId: "",
        id: "",
        createBy:'',
        createTime:'',
        updateBy:'',
        updateTime:'',
        days: [


        ]
      },
      data: [],
      active1: false,
      active2: false
    };
  },
  components: {
    CheckSelect,
    AttendanceDaysDescription
  },
  methods: {
    explain() {
      let _this = this;
      let layerId = _this.$layer.iframe({
        content: {
          content: AttendanceDaysDescription, //传递的组件对象
          parent: this,//当前的vue对象
          data:{

          }//props
        },
        area:['550px','250px'],
        title:"【实际出勤天数】 说明",
        shadeClose: false,
        shade: true,//是否显示遮罩
        zIndex:19891110,
        cancel:()=>{//关闭事件

        }
      });
    },
    chooseChange(val) {
      console.log(val);
      if (val == 1) {
        this.disableds = true;
      } else if (val == 2) {
        this.disableds = false;
      }
    },
    stateChange(params) {
      let _this = this;
      let map = _this.paramMap;
      params.paramNames = map[params.paramId];
    },
    getDetialData() {
      let _this = this;
      let form  = {
        userId:this.thisrow.userId,
        time:this.thisrow.time,
      };
      userSalarygetAttendanceDetail(form).then(res => {
        
        if(res.stauts == 500) {
          return false;
        }else if(res.status === 0) {
          let params = res.data.params;
          let paramIdParams = params.paramIdParams;
          _this.paramIdParams = paramIdParams;
          if(paramIdParams && paramIdParams.length != 0){
            let arr1 = [];
            paramIdParams.forEach(item =>{
              _this.paramMap[item.name] = item.id;
              let obj = { 
                show:0,
                paramName:item.name,
                paramId:'',
                paramTime1:'',
                paramTime2:'',
                
              }
              arr1.push(obj);
            })
            _this.elemDay.child = arr1;
          }
          let days = res.data.days;
          let record = res.data.record;
          _this.form = record;
          if(_this.form.attendanceDaysType=='1'){
            _this.choose = '1';
            _this.forms.day = _this.form.attendanceDays;
          };
          let month = res.data.moth;
          _this.everyList = month;
          
          _this.setOneMonthDay(days);
          _this.$layer.closeAll("loading");
        }
      });
    },
    setOneMonthDay(days){
      let arr = [];
      for(let i = 0 ; i < days.length; i ++){
        let obj = JSON.parse(JSON.stringify(days[i]));

        obj.day = (i+1)+"号";
        obj.selectId = 'selectId'+i;
        let paramDatas = JSON.parse(JSON.stringify(this.paramIdParams));
        let dayChild = days[i].child;
        let paramIdParams = this.paramIdParams;
        let dayChildMap = {};
        if(dayChild){
          dayChild.forEach(item1 => {
            dayChildMap[item1.paramId] = item1;
            paramDatas.forEach(item2 => {
              if(item2.id == item1.paramId){
                item2.select = true;
              }
            })
          })
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
              }
            }
            arr1.push(objChild);
          })
          obj.child = arr1;
        }
        arr.push(obj);
      }
      this.form.days = arr;
      console.log(this.form.days);
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
                elemDay.child.forEach(item1 =>{
                  if(item1.paramName == name){
                    item1.show = 1;
                    item1.paramId = item.id;
                  }
                })  
              }else{
                elemDay.child.forEach(item1 =>{
                  if(item1.paramName == name){
                    item1.show = 0;
                    item1.paramId = "";
                  }
                })  
              } 
             })
           }
         }
       }
    },
   
    finUserState() {
      let _this = this;
      let id = this.form.departId;
      if (id) {
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let user = data.user;
            user = [{ id: "-1", name: "全部", select: true }].concat(user);
            _this.userList = user;
            _this.form["userId"] = "";
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      }
    },
   
    changeTab(tab) {
      let _this = this;
      let label = tab.label;
      if (label == "每日考勤情况") {
        if (!this.active1) {
          this.active1 = true;
        }
      } else if (label == "每月考勤总计") {
        if (!this.active2) {
          this.active2 = true;
        }
      }
    },
   
  },
 
  mounted() {
    this.getDetialData();
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs--border-card > .el-tabs__header {
  background: #dcd9d3;
}
/deep/.el-tabs__nav #tab-single{
  margin-left: 10px!important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  background:url("../../../images/weixuanzhongspecial.png");
  border-width:0 !important;
  height:24px;
  padding-left:20px !important;
  span{
    position:relative;
    text-align:center;
    display:inline-block;
    top:3px;
  }

}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background:url("../../../images/xuanzhongspecial.png");
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
  height: 450px;
  width: 552px;
  position: relative;
  padding: 0px 20px 20px 20px;
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
