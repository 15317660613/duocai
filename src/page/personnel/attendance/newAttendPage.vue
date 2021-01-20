<template>
  <div class="" style="margin:0 10px;width:100%;">
    
      <div class="pop-up" style="width:100%;padding:6px 0 0;">
        <el-tabs type="border-card" v-model="getActiveName" @tab-click="changeTab" style="margin:0 10px;" >
          <el-tab-pane label="单独新增考勤人月" name="single">
            <span slot="label">单独新增考勤人月</span>

            <div class="search-container" style="height:444px;margin-top:0;overflow:auto;width:100%;">
              <el-form ref="formsData" :model="form">
                <div class="clear">
                  <div class="left" style="padding-left:34px">
                    <span class="des-word require-word">部门人员</span>
                  </div>
                  <div class="left">
                    <el-form-item  >
                      <el-select
                        v-model="form.departId"
                        @change="finUserState"
                        style="width:100px;"
                      >
                        <el-option  v-for="item in executorList"  :label="item.name" :value="item.id">
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                              <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                              <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-l-2">
                    <el-form-item  >
                      <el-select v-model="form.userId" style="width:100px;">
                        <el-option
                          v-for="(item,index) in userList"
                          :key="index"
                          :label="item.name"
                          :value="item.id"
                          :class="{'leave-user':item.stateUser == 1}" 
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left" style="padding-left:34px">
                    <span class="des-word require-word">考勤年月</span>
                  </div>
                  <div class="left padding-l-2">
                    <el-form-item label label-width="0" >
                      <el-date-picker
                        type="month"
                         
                         
                        value-format="yyyy-MM"
                        v-model="form.time"
                        style="width: 91px;"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>

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
                          <CheckSelect :selectId="item.selectId" @changeSelect="changeSelect" :indexSelect="index" :listData="item.paramDatas" style="margin-top:3px;width:120px;" ></CheckSelect>
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
                            v-model="el.paramTime1"
                            :picker-options="{
                              format: 'HH:mm',
                            }"
                            format="HH:mm"
                            @change="changTime1(el.paramName,el)"
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
                              v-model="el.paramTime2"
                              :picker-options="{
                                format: 'HH:mm',
                              }"
                              @change="changTime2(el.paramName,el)"
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
                          <el-select v-model="el.paramNum" style="width:50px;">
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

                    <div v-if="item.show == 1" class="clear left" >
                      <div class="left" style="padding:6px 0 0 7px;">
                        <span>备注</span>
                      </div>
                      <div class="left" style="padding:5px 0 0 2px;" >
                          <textarea class="remark" style="width:472px;height:60px;" title="上限500个字"  maxlength="500"  v-model="item.remark"
                          ></textarea>
                      </div>
                    </div>

                  </div>
                </div>
              </el-form>
            </div>
            <div class="clear" style="padding:5px 0;">
              <span
                class="right save-cancel-btn"
                style="margin-right:0px;"
                @click="cancelData"
              >取 消</span>
              <span
                class="right save-cancel-btn"
                style=""
                type="primary"
                @click="saveData"
              >保 存</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="批量新增考勤人月" name="many">
            <span slot="label">批量新增考勤人月</span>
            <div class="search-container" style="height:444px;margin-top:0;overflow:auto;width:100%;" >
              <el-form ref="formsData" :model="form">
                <div class="clear">
                  <div class="left padding-l-15" style="padding-top:5px">
                    <el-input @input="querySearchAsync" v-model="departName" title="部门名称" maxlength="10" style="width:130px;"></el-input>
                  </div>
                  <div class="left" style="padding:3px 0 0 100px">
                    <span class="des-word require-word">选择年月</span>
                  </div>
                  <div class="left padding-l-2" style="padding-top:5px">
                    <el-form-item label label-width="0" prop="time">
                      <el-date-picker
                         type="month"
                         
                         
                        value-format="yyyy-MM"
                        v-model="forms.time"
                        @change="changeTime"
                        style="width: 91px;"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>

                <div
                  class="search-container left"
                  style="height:405px;overflow:auto;width:239px;margin:0;border-left:none;border-bottom:none;padding:12px"
                >
                  <el-tree
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    ref="newTopRightsTree"
                    :check-strictly="true"
                    @check="gettreeData"
                    :default-expanded-keys="[2, 3]"
                    :default-checked-keys="[5]"
                    :props="defaultProps"
                    style="background:#DCD9D3;font-size:12px;"
                  ></el-tree>
                </div>

                <div class="left content">
                  <div class="break"></div>
                  <div style="widht:100%;height:330px;overflow:auto;" class="clear">

                    <div class="left" v-for="(item,index) in tableData" :key="item.id" style="width: 100%;">
                      <p style="padding-top:10px;color:#999999;padding-left: 10px;">{{item.title}}</p>
                      <div class="clear">
                        <div style="width:100px;" class="left clear" v-for="(i,cindex) in item.person"  >
                          <div class="left"   >
                          
                            <el-checkbox 
                              style="font-size:12px;"
                              :disabled="i.green == 1 ? true:false"
                               :false-label="0" :true-label="1"
                              v-model='i.check'
                              @change="checkNum"
                            ></el-checkbox>
                          </div>
                          <div class="left" style="padding-left:3px;" >
                              <span :class="{'green-color':i.green == 1,'black-color':i.paramName == '正式离职',}" >{{i.name}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="break"></div>
                    </div>
                  </div>
                  <div style="padding-left:10px;">
                    <p  ><div style="width: 12px;height: 12px;background: rgba(0, 204, 102, 1);margin-right: 5px;display: inline-block;"></div>该月已生成考勤</p>
                    <p  ><div style="width: 12px;height: 12px;background: rgba(153, 153, 153, 1);margin-right: 5px;display: inline-block;"></div>正式离职</p>
                    <p  ><div style="width: 12px;height: 12px;background: rgba(51, 51, 51, 1);margin-right: 5px;display: inline-block;"></div>常态在职，薪假在职，停薪在职，申离在职 <span style="float: right;margin-right: 15px;">总计 : {{totalcheckednum}} 人</span></p>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="clear" style="padding:5px 0;">
              <span
                class="right save-cancel-btn"
                style="margin-right:0px;"
                @click="cancelData"
              >取 消</span>
              <span
                class="right save-cancel-btn"
                style=""
                type="primary"
                @click="saveUserData"
              >保 存</span>
              <el-checkbox class="right" style="margin:3px 30px 0 0;" @change="allCheck" v-model="checked">全选</el-checkbox>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
   
  </div>
</template>

<script>
import { findUserByDepartId,} from "../../../service/organizeDate";
import {departTreeByWord } from "../../../service/getdepartData";

import CheckSelect from "../../../components/checkSpecial1";
import {
  getattendParams,
  onleyInsert,
  allInsert,
  findAttendUserBydepartId
} from "../../../service/attendData";
export default {
  props: ["activeName", "layerid"],
  data() {
    return {
      getActiveName: this.activeName,
      dialogNewFollow: this.newAttendVisible,
      paramIdParams:[],
      executorList: [],
      userList: [],
      nums:[{id:'0.5',name:'0.5'},{id:'1',name:'1'}],
      addentOneList: [],
      paramMap:{},
      treeData:[],
      checked: false,
      totalcheckednum:0,
      lastTime:0,
      departName: "",
      param:"",
      choosePersonIds:'',
      defaultProps: {
        children: "children",
        label: "label"
      },

      elemDay: {
        day:'',
        remark:'',
        show:0,
        child:[]
      },
     
      forms:{

      },
      paramMap:{},
      form: {
       
        time: "",
        departId: "",
        userId: "",
        id: "",

        days: [


        ]
      },
      userId:[],
      tableData:[],
      active1: false,
      active2: false
    };
  },
  components: {
    CheckSelect
  },
  methods: {
    newAttend() {
      this.dialogNewFollow = true;
       this.getParams();
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
    getParams() {
      let _this = this;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      getattendParams().then(res => {
       
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
                select: false,
                state:treeData[i].state,
              });
            }
            this.executorList = arr;
            
          }
          let paramIdParams = res.data.paramIdParams;
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
          setTimeout(function(){
             _this.setOneMonthDay();
          },500)
         
        }
      });
    },
    setOneMonthDay(){
      let arr = [];
      let year = new Date().getFullYear();
      let month1 =  new Date().getMonth()+1;
      let month = (new Date(year, month1, 0).getDate())*1;
      for(let i = 1 ; i <= month ; i ++){
        let obj = JSON.parse(JSON.stringify(this.elemDay));
        obj.day = i+"号";
        obj.selectId = 'selectId'+i;
        obj.paramDatas = JSON.parse(JSON.stringify(this.paramIdParams)),
        arr.push(obj);
        
      }
      this.form.days = arr;
      this.$layer.closeAll("loading");
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
                elemDay.show = 1;
                elemDay.child.forEach(item1 =>{
                  if(item1.paramName == name){
                    item1.show = 1;
                    item1.paramId = item.id;
                  }
                })  
              }else{
                let count = 0;
                elemDay.child.forEach(item1 =>{
                  
                  if(item1.paramName == name){
                    item1.show = 0;
                    item1.paramId = "";
                  }
                  if(item1.show == 1){
                    count = 1;
                  }
                })  
                if(count){
                   elemDay.show = 1;
                }else{
                   elemDay.show = 0;
                }
              } 
              
             })
             
           }
         }
       }
    },
    allCheck(){
        if(this.checked == 1){
            let tableData = this.tableData;
            tableData.forEach(item=>{
                let person = item.person;
                if(person && person.length != 0){
                    person.forEach(item1 =>{
                        debugger;
                        if(item1.green != 1){
                            item1.check =1;
                        }
                    })
                }
            })
        }else{
            let tableData = this.tableData;
            tableData.forEach(item=>{
                let person = item.person;
                if(person && person.length != 0){
                    person.forEach(item1 =>{
                        if(item1.green != 1){
                            item1.check =0;
                        }
                    })
                }
            })
        }
        this.checkNum();
    },
    checkNum(){
        let count = 0;
        let tableData =  this.tableData;
       
        tableData.forEach(item =>{
            if(item.person && item.person.length != 0){
                let person = item.person;
                person.forEach(item1 =>{
                    if(item1.check == 1){
                        count ++;
                    }
                })
            }
        })
        this.totalcheckednum = count ;
    },
    changeTab(tab) {
      let _this = this;
      let label = tab.label;
      if (label == "单独新增考勤人月") {
        if (!this.active1) {
          this.active1 = true;
        }
      } else if (label == "批量新增考勤人月") {
        if (!this.active2) {
          this.active2 = true;
          this.getTreeDateDepart();
        }
      }
    },
    checkStrictly(){

    },
    getTreeDateDepart(){
      let _this = this;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      let form = {state:'常态',type:'主'};
      departTreeByWord(form).then((response) =>{
        this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          this.treeData=response.data;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
        
      })
    },
     querySearchAsync(){
      let _this = this;
      let departName = this.departName;
      let form = {state:'常态',type:'主'};
      if(departName != ""){
        form = {state:'常态',type:'主',name:this.departName,};
      }
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      
      let now = new Date();
      
      if (now - this.lastTime  > 100) {
        this.lastTime = now;
        departTreeByWord(form).then( (res) =>{
          this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status === 0) {
            this.treeData= res.data;
            this.changeTime();
            this.$layer.closeAll("loading");
          } else if (res.status === 1) {
            let message = res.msg;
            this.myAlert(message + "！");
          }
        })
      }
    },
    checkbox(val){
      let arr=[]
      this.tableData.forEach(item=>{
        if(item.select){
          arr.push(item.id)
       }else{
          arr.splice(item.id,1)
       }
      })

        this.userId=arr
        this.userId=this.userId.join(',')
    },
    changeTime(){
      this.tableData = [];
      this.$nextTick(() => {
          this.$refs.newTopRightsTree.setCheckedKeys([]);
          this.checkNum();
      });
      
    },
    gettreeData(arg1,arg2){
      let id = arg1.id;
      let title = arg1.label;
      let checkedKeys = arg2.checkedKeys;
      let str = checkedKeys.toString();
      let time = this.forms.time;
      if(!time){
        this.myAlert("年月不能为空！", "dangerous-icon");
        return false;
      }
      if(str){
        if(str.indexOf(id) != -1){
          let form = {id:id,time:time};
          findAttendUserBydepartId(form).then( (response)=> {
            this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              if(response.status==0){
                let tableData = this.tableData;
                let user = response.data.users;
                let haveUserIds = response.data.haveUserIds;
                if(user && user.length != 0){
                  user.forEach(item=>{
                    if(haveUserIds){
                      let str = haveUserIds.toString();
                      if(str.indexOf(item.id) != -1){
                        item.green = 1;
                        item.check = 1;
                      }else{
                        item.green = 0;
                        item.check = 0;
                      }
                    }
                  })
                  let obj = {title:title,id:id,person:user};
                  this.tableData.push(obj); 
                  this.checkNum();
                }
                
              }
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
           let tableData = this.tableData;
           let arr = [];
           tableData.forEach(item =>{
             if(id != item.id){
               arr.push(item);
             }
           })
           this.tableData = arr;
        }
      }else{
        this.tableData = [];
      }
      
    },
    stateChange(params) {

      let _this = this;
      let map = _this.paramMap;
      params.paramNames = map[params.paramId];
      this.form.days.forEach(item=>{
          item.child.forEach(el=>{
        console.log(item.paramNames)
          if(el.paramName===item.paramNames){
              el.paramId=item.paramId
          }

        })
      })

    },
    saveData() {
      let _this = this;
      
      let form = JSON.parse(JSON.stringify(this.form));
      if(!form.userId){
        this.myAlert("部门人员不能为空！", "dangerous-icon");
        return false;
      }
      if(!form.time){
         this.myAlert("考勤年月不能为空！", "dangerous-icon");
        return false;
      }
      let days = form.days;
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
              }else if(item1.paramName == '缺卡'){
                
              }else{
                let time1 = item1.paramTime1;
                let time2 = item1.paramTime2;
                let paramName = item1.paramName;
                if(!time1 || !time2){
                  this.myAlert(paramName+"不能为空！", "dangerous-icon");
                  flag = 1;
                  return false;
                }
              }
            }
          })
        }
      })
      if(flag == 1){
        return false;
      }
      let obj = {
        time:form.time,
        userId:form.userId,
      }
      
      let arr = [];
      days.forEach(item =>{
        let obj1 = {
          day:item.day,
          remark:item.remark,
          child:[],
        }
        let child = item.child;
        let currentChild = [];
        child.forEach(item =>{
          if(item.show == 1){
            currentChild.push(item);
          }
        })
        obj1.child = currentChild;
        arr.push(obj1);
      })
      obj.days = JSON.stringify(arr);
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      onleyInsert(obj).then(res => {
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          this.myAlert("数据保存成功！", "success-icon").then(res => {
             _this.$parent.searchAttendDataList();
             _this.cancelData();
          }).catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      });
    },
    saveUserData() {
      let _this = this;
      
      let form = JSON.parse(JSON.stringify(this.forms));
      let tableData = this.tableData;
      let users = [];
      tableData.forEach(item =>{
        if(item && item.person){
          let person = item.person;
          if(person && person.length != 0){
             person.forEach(item1 =>{
               if(item1.green != 1 && item1.check == 1){
                 users.push(item1.id);
               }
             })
          }
        }
      })
      let time = this.forms.time;
      
      if(!form.time){
        this.myAlert("日期不能为空！", "dangerous-icon");
        return false;
      }
      if(users.length == 0){
         this.myAlert("人员不能为空！", "dangerous-icon");
        return false;
      }
      let userIds = users.toString();
      let obj = {time:time,userIds:userIds};
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      allInsert(obj).then(res => {
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          this.myAlert("数据保存成功！", "success-icon").then(res => {
            debugger;
              _this.$parent.searchAttendDataList();
              _this.cancelData();
            }).catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      });
    },
    getCurrentDate(dateing) {
      let date = new Date(dateing);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month * 1 < 10) {
        month = "0" + month;
      }
      let day = date.getDate();
      if (day * 1 < 10) {
        day = "0" + day;
      }
      let currentDate = year + "-" + month;
      return currentDate;
    },
    getCurrentday(dateing) {
      let date = new Date(dateing);
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      if (h * 1 < 10) {
        h = "0" + h;
      }
      if (m * 1 < 10) {
        m = "0" + m;
      }
      if (s * 1 < 10) {
        s = "0" + s;
      }
      let currentDate = h + ":" + m + ":" + s;
      return currentDate;
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
            let arr = [{ id: "", name: " ", select: true }];
            if(user && user.length != 0){
              user.forEach(function(item){
                
                let obj = {
                id: item.id,
                name: item.name,
                stateUser:0,
                }
                if(item.paramName == '正式离职'){
                obj.stateUser  = 1;
                }
                arr.push(obj);
              })
            }
           
            _this.userList = arr;
            _this.form["userId"] = "";
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      }
    },
    getSelectIdByList(list) {
      let arr = [];
      list.forEach(function(item) {
        if (item.select) {
          arr.push(item.id);
        }
      });
      return arr.toString();
    },
   
    cancelData() {
      this.$layer.close(this.layerid);
    },

    clearFormData() {
      this.cancelData();
      
    },
    getSelectIdByList(list) {
      let arr = [];
      list.forEach(function(item) {
        if (item.select) {
          arr.push(item.id);
        }
      });
      return arr.toString();
    },
    
  },
  mounted(){
    this.newAttend();
  },
  beforeDestroy(){
    let _this = this;
    _this.$store.state.layerifranme.forEach((item,index)=>{
      if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
        _this.$store.state.layerifranme.splice(index,1);
      }
    }); 
    console.log(_this.$store.state.layerifranme);
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
.black-color{
  color:rgb(153, 153, 153);
}
.green-color{
  color:rgb(0, 204, 102);
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
  width: 505px;
  position: relative;
  padding: 0px 0px 0px 10px;
}
.require-word:before {
  content: "*";
  color: #f56c6c;
  margin-right: 1px;
}
.padding1{
    padding-left:0px;
    display:inline-block;
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
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
