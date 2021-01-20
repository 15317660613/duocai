<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="">
      <div class="search-container" style="height: 262px;overflow: auto;">
        <el-form ref="formsData" :model="form">
          <div class="top">
            <div class="clear" style>
              <div class="left padding-r-2 des-word" style="width:70px;text-align:right;" >
                <span class="word require-word">分成人</span>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="departId">
                  <el-select
                    @change="findUserAndLeaveByDepartId"
                    v-model="form.departId"
                    placeholder
                    title="分成人"
                    style="width:80px;"
                  >
                    <el-option  v-for="item in departParams"  :label="item.name" :value="item.id">
                      <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                        <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                        <span v-if="item.state=='常态'">{{item.name}}</span>
                      </span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="userId">
                  <el-select
                    v-model="form.userId"
                    placeholder
                    @change="userChange"
                    style="width:80px;"
                  >
                    <el-option v-if="item.stateUser == 0 || (form.checked == 1 && item.stateUser == 1)" v-for="item in userParams" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2">
                <el-checkbox v-model="form.checked" :false-label="0" :true-label="1" style="padding:1px 0 0 17px;"></el-checkbox>
               
              </div>
              <div class="left" style="padding:2px 0 0 5px;" >
                 <span  >显示离职员工</span>
              </div>
            </div>
            <div class="clear">
              <div class="left padding-r-2 des-word" style="width:70px;text-align:right;" >
                <span class="word require-word">业类</span>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="categoryOne">
                  <el-select
                    v-model="form.categoryOne"
                    @change="cateChange"
                    :disabled="true"
                    style="width:80px;"
                  >
                    <el-option v-for="item in industrys" :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="categoryTwo">
                  <el-select @change="getFianceDataByContractId" v-model="form.categoryTwo" placeholder style="width:80px;">
                     <el-option v-for="item in businessType2Params" :label="item.name+item.remark" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2 des-word" style="width:80px;text-align:right;" >
                <span class="word require-word">分成比例</span>
              </div>
              <div class="left padding-r-2 text-input des-word">
                <el-form-item prop="proportion">
                  <el-input
                    @input="checkNum1"
                    style="width:100px;"
                    v-model.trim="form.proportion"
                    title="上限10位数"
                    maxlength="15"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <span class="word" >%</span>
              </div>
            </div>
            <div class="clear">
              <div class="left padding-r-2 des-word" style="width:70px;text-align:right;" >
                <span class="word">应收业绩</span>
              </div>
              <div class="left padding-r-2 text-input des-word">
                <el-form-item prop="receivable">
                  <el-input
                    style="width:100px;"
                    v-model.trim="form.receivable"
                     @input="checkNum2"
                    title="上限10位数"
                    maxlength="13"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="left padding-r-2 des-word" style="width:141px;text-align:right;">
                <span class="word">实收业绩</span>
              </div>
              <div class="left padding-r-2 text-input des-word">
                <el-form-item prop="receipts">
                  <el-input
                    style="width:100px;"
                    v-model.trim="form.receipts"
                     @input="checkNum3"
                    title="上限10位数"
                    maxlength="13"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="clear">
              <div class="left padding-r-2 des-word" style="width:70px;text-align:right;" >
                <span class="word">分成说明</span>
              </div>
              <div class="left padding-r-2 des-word">
                <el-form-item prop="explainRemark">
                  <el-input
                    style="width:343px;"
                    v-model.trim="form.explainRemark"
                    title="上限50个字"
                    maxlength="50"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="break" style="margin:0px 9px 0px"></div>
          <div class="bottom">
            <div class="clear">
              <div class="left padding-r-2 des-word" style="width:70px;text-align:right;" >
                <span class="word require-word">模式</span>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="patternLevel">
                  <el-select
                    @change="findStreeByTown"
                    v-model="form.patternLevel"
                    placeholder
                    style="width:80px;"
                  >
                    <el-option v-for="item in patternLevels" :label="item.name" :value="item.id"></el-option>

                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2 des-word" style="margin-left:19px">
                <span class="word">特殊扣除</span>
              </div>
              <div class="left text-input padding-r-2">
                <el-form-item prop="deduct">
                  <el-input
                    style="width:88px;"
                    v-model.trim="form.deduct"
                     @input="checkNum4"
                     title="上限10位数"
                    maxlength="13"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </div>
             
              <div class="left padding-r-2 des-word" style="width:52px;text-align:right;">
                <span class="word">方式</span>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="type">
                  <el-select
                    @change="findStreeByTown"
                    v-model="form.type"
                    placeholder
                    style="width:50px;"
                  >
                    <el-option label="月" value="月"></el-option>
                    <el-option label="年" value="年"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clear">
              <div class="left padding-r-2 des-word" style="width:70px;text-align:right;" >
                <span class="word">应计提成</span>
              </div>
              <div class="left padding-r-2 text-input des-word">
                <el-form-item prop="bonus">
                  <el-input
                    style="width:80px;"
                    v-model.trim="form.bonus"
                    maxlength="10"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </div>
               <div class="left padding-r-2" style="padding:0px 0 0 1px;" >
                <el-form-item prop="isCheck" >
                  <el-checkbox
                    @change="changeBalanceTime"
                    v-model="form.isCheck"
                    class="left"
                     :false-label="0" :true-label="1"
                  ></el-checkbox>
                </el-form-item>

              </div>
              <div class="left padding-r-2 des-word" style="padding-left:1px;">
                <span class="word">结算年月</span>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="balanceTime" >
                  <el-date-picker
                    :disabled="hasCheckBalanceTime"
                    size="mini"
                    type="month"
                    :picker-options="pickerOptions" 
                    placeholder="选择日期"
                    value-format="yyyy-MM"
                    v-model="form.balanceTime"
                    style="width: 92px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="left padding-r-2" style="padding:0px 0 0 48px;" >
                <el-form-item prop="isCalculateSalary" >
                  <el-checkbox
                    v-model="form.isCalculateSalary"
                    class="left"
                    :false-label="0" :true-label="1" 
                  ></el-checkbox>
                </el-form-item>

              </div>
              <div class="left padding-r-2">
                <span class="" style="line-height:28px;">计工资</span>
              </div>
            </div>
            <div class="clear">
              <div class="left padding-r-2 des-word" style="width:70px;text-align:right;" >
                <span class="word">首次结算</span>
              </div>
              <div class="left text-input padding-r-2">
                <el-form-item prop="firstBalance">
                  <el-input
                    style="width:80px;"
                    v-model.trim="form.firstBalance"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="left padding-r-2 des-word" style="padding-left:17px;">
                <span class="word">总补结算</span>
              </div>
              <div class="left text-input padding-r-2">
                <el-form-item prop="totilBalance">
                  <el-input
                    style="width:88px;"
                    v-model.trim="form.totilBalance"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="left" style="margin-top:8px;">
                <i class="question-icon" @click="calculation"></i>
              </div>
            </div>
            <div class="break" style="margin:0px 9px 0px"></div>

          </div>

         
          <div class="clear" style="padding:10px 0 -1px;">
              <div class="left padding-r-2 des-word" style="width:85px;text-align:right;" >
                <span class="word ">业绩归属职位</span>
              </div>
               <div class="left padding-r-2" style="position:relative;" >
                <span class="word " style="color:#999;position:absolute;top:-18px;display:inline-block;width:125px;" >（默认现所属职位）</span> 
                <el-form-item prop="useStaffId">
                  <el-select
                    
                    v-model="form.useStaffId"
                    placeholder
                   
                    style="width:100px;"
                  >
                    <el-option v-for="item in staffList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2 des-word" style="width:123px;text-align:right;" >
                <span class="word ">业绩归属部门</span>
                
              </div>
               <div class="left padding-r-2" style="position:relative;">
                 <span class="word " style="color:#999;position:absolute;top:-18px;display:inline-block;width:125px;" >（默认现所属部门）</span> 
                <el-form-item prop="useDepartId">
                  <el-select
                    
                    v-model="form.useDepartId"
                    placeholder
                    
                    style="width:100px;"
                  >
                    <el-option v-for="item in departList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
          </div>  
        </el-form>
      </div>
      <div slot="footer" style="padding:3px 0;" class="dialog-footer clear">
        <span class="right save-cancel-btn" @click="cancelData" >取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="checkHadCloseSalary" >保 存</span>
      </div>
    </div>

  </div>
</template>
<script>
import { findbyId } from "../../../service/getData";
import {findChildParams} from "../../../service/getData";
import {
  addtBonus,
  ModelstBonus,
  getParams
} from "../../../service/contractData";
import { findUserByDepartId } from "../../../service/organizeDate";
import {getCloseByUserIdAndBalTime} from '../../../service/SalaryDetails';
import { phyparam, getphy } from "../../../service/getdepartData";
import Calculation from "./calculation";
import Synchronization from "./synchronization";

import { contractParams ,contractgetByBusinessType2} from "../../../service/contractSpecial";
export default {
  // noFinishDisabled 未结佣标识
  props: ["businessType","contractId","baTime","businessPersonAuth","noFinishDisabled","layerid"],
  data() {
    return {
      userParams: [],
      streetArr: [],
      departParams: [],
      patternLevels: [],
      industrys: [],
      businessType2Params:[],
      getBusinessType:this.businessType,
      dutyParams:[],
      departList:[],
      staffList:[],
      hasCheckBalanceTime:true,
      num1:0,
      num2:0,
      pickerOptions: { //大于当前月分的日期不可选
              disabledDate: (time) => {
                  var date = new Date();
                  var year = date.getFullYear();
                  var month = date.getMonth() + 1;
                  if (month >= 1 && month <= 9) {
                      month = "0" + month;
                  }
                  var currentdate = year.toString()  + month.toString();

                  var timeyear = time.getFullYear();
                  var timemonth = time.getMonth() + 1;
                  if (timemonth >= 1 && timemonth <= 9) {
                      timemonth = "0" + timemonth;
                  }
                  var timedate = timeyear.toString() + timemonth.toString();
                  return currentdate < timedate;
              }
      },
      form: {
        id:'',
        contractId:this.contractId,
        departId:'',
        userId:'',
        categoryOne:'',
        categoryTwo:'',
        proportion:'0.000',
        receivable:'0.00',
        receipts:'0.00',
        explainRemark:'',
        patternLevel:'',
        bonus:'0.00',
        type:'月',
        deduct:'0.00',
        isCheck:0,
        balanceTime:'',
        isCalculateSalary:'',
        firstBalance:'0.00',
        totilBalance:'0.00',
        chiefNames:'',
        chiefIds:'',
        chiefDepartIds:'',
        baTime:this.baTime,
        useDepartId:'',
        useStaffId:'',

      }
    };
  },
  components: {
    Calculation,
    Synchronization
  },
  methods: {
    checkNum1(){
       this.form.proportion= this.form.proportion.replace(/[^\%\.\d]/g,'');
       let deduct = this.form.deduct;
       let proportion = this.form.proportion;
       let num1 = this.num1*1;
       let num2 = this.num2*1;
       if(proportion && num1 > 0){
         this.form.receivable = (proportion*1)*(num1*1)/100;
       }else{
         this.form.receivable = "0";
       }
       if(proportion && num2 > 0){
         this.form.receipts = (proportion*1)*(num2*1)/100;
       }else{
         this.form.receipts = "0";
       }
    },
    checkNum2(){
      this.form.receivable= this.form.receivable.replace(/[^\%\.\d]/g,'');
      let receivable = this.form.receivable;
      let num1 = this.num1;
      if(receivable && num1*1 > 0){
         this.form.proportion = (receivable*1)/(num1*1)*100;
      }else{
        this.form.proportion = "0";
      }
      let proportion = this.form.proportion;
      let num2 = this.num2*1;
      if(proportion && num2 > 0){
         this.form.receipts = (proportion*1)*(num2*1)/100;
       }else{
         this.form.receipts = "0";
       }
    },
    checkNum3(){
      this.form.receipts= this.form.receipts.replace(/[^\%\.\d]/g,'');
      let receipts = this.form.receipts;
      let num2 = this.num2;
      if(receipts && num2*1){
         this.form.proportion = (receipts*1)/(num2*1)*100;
      }else{
        this.form.proportion = "0";
      }
      
      let proportion = this.form.proportion;
      let num1 = this.num1;
      if(proportion && num1*1){
         this.form.receivable = (proportion*1)*(num1*1)/100;
      }else{
        this.form.receivable = "0";
      }
    },
    checkNum4(){
      this.form.deduct= this.form.deduct.replace(/[^\%\.\d]/g,'');
    },
    changeBalanceTime(){
      let balanceTime = this.form.balanceTime;
      let isCheck = this.form.isCheck;
      if(isCheck){
        this.hasCheckBalanceTime = false;
      }else{
         this.hasCheckBalanceTime = true;
      }
    },
    cateChange(){

    },
    //获取应收应付业绩
    getFianceDataByContractId(){
      let _this = this;
      let categoryTwo = _this.form.categoryTwo;
      let contractId = this.form.contractId;
      let form = {businessType2:categoryTwo,contractId:contractId,isAchievement:1};
      contractgetByBusinessType2(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          debugger;
          let data = response.data;
           let num1 = data.num1*1 - data.num2*1;
           let num2 = data.num3*1 - data.num2*1;
           if(num2 < 0){
             num2 = 0;
           }
           _this.num1 = num1;
           _this.num2 = num2;
         
          let proportion = _this.form.proportion;
          if(proportion && num1 > 0){
            _this.form.receivable = (proportion*1)*(num1*1)/100;
          }else{
            _this.form.receivable = "0";
          }
          if(proportion && num2 > 0){
            _this.form.receipts = (proportion*1)*(num2*1)/100;
          }else{
            _this.form.receipts = "0";
          }
          

        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      })
    },
    getParam() {
      let _this = this;
      getParams().then(response => {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let finishSalary = response.data.finishSalary;
          let departTree = response.data.departTree;
          
          if (departTree && departTree.length != 0) {
            let arr = [];
            for (let i = 0; i < departTree.length; i++) {
              arr.push({
                id: departTree[i].id,
                name: departTree[i].label.replace(/&nbsp;/g, ""),
                select: false,
                level:departTree[i].level,
                state:departTree[i].state,
              });
            }
            _this.departParams = arr;
            _this.$layer.closeAll("loading");
          }
          let initArr = [{ id: "0", name: " " }];
          let industrys = response.data.categoryOneParams;
          if (industrys) {
            industrys.forEach(function(item){
                initArr.push({
                  id:item.id,
                  name:item.name,
                })
            })

          let staffList = response.data.staffList;
          let departList = response.data.departList; 
          departList.forEach(item => {
            item.name = item.label;
          })
            _this.departList = departList;
            _this.staffList = staffList;
            _this.industrys = initArr;
            _this.form.categoryOne = _this.businessType;
          }
          
          _this.getChildrenParamsList();
        }
      });
    },
    getChildrenParamsList(){
      let _this = this;
      let id = _this.form.categoryOne;
      findChildParams(id,false).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let arr = [{id:'',name:' ',remark:''}].concat(data);
          _this.businessType2Params = arr;
          _this.form.categoryTwo = '';
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      })
    },
    userChange(e) {
      let _this = this;
      let userId = this.form.userId;
      let baTime = this.form.baTime;

      let businessType = this.form.categoryOne;
      let userParams = this.userParams;
      let departList = this.departList;
      let userData = "";
      if(baTime){
        baTime = baTime.substring(0,7);
      }
      userParams.forEach(item => {
        if(item.id == userId){
          userData = item;
          return false;
        }
      })
      if(userData){
        let flag = false;
        departList.forEach(item => {
          if(item.id == userData.departId){
            this.form.useDepartId = userData.departId;
            flag = true;
            return false;
          }
        })
        if(!flag){
          this.form.useDepartId = "";
        }
        let staffId = userData.staffId;
        let staffList = this.staffList;
        flag = false;
        staffList.forEach(item => {
          if(item.id == staffId){
            _this.form.useStaffId = item.id;
            flag = true;
          }
        })
        if(!flag){
          this.form.useStaffId = "";
        }
      }
      let form = {
        userId,
        createTime:baTime,
        businessType:businessType,
      };
      this.form.chiefIds = '';
      this.form.chiefNames = '';
      this.form.chiefDepartIds = '';

      ModelstBonus(form).then(response => {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          if(!data || data.length == 0){
            let userName = "";
            let departParams = _this.departParams;
            let userParams = _this.userParams;
            let departId = _this.form.departId;
            departParams.forEach(item => {
              if(item.id == departId){
                userName = item.name;
              }
            })
             userParams.forEach(item => {
              if(item.id == userId){
                userName = userName + "-" +item.name;
              }
            })
            this.myAlert(userName+"还未设置"+baTime+"的账套，不允许新增业绩分成！","dangerous-icon");
          }else{
             
          }
          _this.patternLevels = response.data;
          _this.form.patternLevel = '';
        } else if (response.status == 1) {
          let message = response.msg;
        }
      });
    },
    synchronization(index, row) {
      let _this = this;
      let balanceTime = _this.form.balanceTime;
      let userId = this.form.userId;
      let chiefIds = this.form.chiefIds;
      let chiefNames = this.form.chiefNames;
      let chiefDepartIds = this.form.chiefDepartIds;
      if(!userId){
        return false;
      }
      let test = _this.$layer.iframe({
        content: {
          content: Synchronization, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            balanceTime: balanceTime,
            userId: userId,
            chiefIds:chiefIds,
            chiefNames:chiefNames,
            chiefDepartIds:chiefDepartIds,

          } //props
        },
        area: ["622px", "498px"],
        title: "同步",
        shadeClose: false,
        shade: false, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          this.currentPage = "";
        }
      });
    },
    setElemSynchro(getChiefIds,getChiefNames,getChiefDepartIds){
      this.form.chiefIds = getChiefIds;
      this.form.chiefNames = getChiefNames;
      this.form.chiefDepartIds = getChiefDepartIds;
    },
    calculation(index, row) {
      let _this = this;
      let test = _this.$layer.iframe({
        content: {
          content: Calculation, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            activeName: "house",
            currentIndex: index,
            balanceTime: this.getCurrentDate(this.form.balanceTime),
            totilBalance: this.form.totilBalance
          } //props
        },
        area: ["550px", "250px"],
        title: "总补结算详情",
        shadeClose: false,
        shade: false, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          this.currentPage = "";
        }
      });
    },
    findUserAndLeaveByDepartId() {
      let _this = this;
      let id = this.form.departId;
      let showLeave = this.form.checked;
      let form = {id,flag:3,isSelect:1,showLeave:1};
      
      if (id) {
        findUserByDepartId(form).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let user = data.user;
            let arr = [];
            if (user && user.length != 0) {
              user.forEach(function(item) {
                let obj = JSON.parse(JSON.stringify(item));
                obj.stateUser = 0;
                if(item.paramName == '正式离职'){
                  obj.stateUser  = 1;
                }
                arr.push(obj);
              });
            }
            _this.userParams = arr;
            _this.form['userId']='';

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      }
    },
    findStreeByTown(val) {
      let _this = this;

      if (val) {
        findbyId(val).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{ id: "0", label: " " }];
            if (data && data.length != 0) {
              _this.streetArr = initArr.concat(data);
              _this.form.streetId = "";
            } else {
              _this.streetArr = initArr;
              _this.form.streetId = "";
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      }
    },
    checkHadCloseSalary(){
      let _this = this;
      let userId = this.form.userId;
      let balanceTime = this.form.balanceTime;
      if(balanceTime){
        let form = {balTime:balanceTime,userId:userId};

        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        getCloseByUserIdAndBalTime(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 1) {
           let salaryCloseFlag = response.data.salaryCloseFlag;
           if(salaryCloseFlag > 0){

           }else{
             _this.savetBonus();
           }
            
          } else if (response.status == 0) {
            let message = response.msg;
            
          }
        });
      }else{
        _this.savetBonus();
      }  
    },
    savetBonus() {
      let _this = this;
      let form = JSON.parse(JSON.stringify(_this.form)) ;
      let userId = form.userId;
      let categoryTwo = form.categoryTwo;
      let proportion = form.proportion;
      let patternLevel = form.patternLevel;
      if(!userId){
          this.myAlert("分成人不能为空！",'dangerous-icon');
        return false;
      }
      if(!categoryTwo){
          this.myAlert("业类不能为空！",'dangerous-icon');
        return false;
      }
      if(!proportion){
        this.myAlert("分成比例不能为空！",'dangerous-icon');
        return false;
      }
      if(!patternLevel){
        this.myAlert("模式不能为空！",'dangerous-icon');
        return false;
      }
      if(this.businessPersonAuth == 'true' && !form.chiefNames){
        this.myAlert("同步人不能为空！",'dangerous-icon');
        return false;
      }
      let isCalculateSalary = 0;
      if (form.isCalculateSalary) {
        isCalculateSalary = 1;
      } else {
        isCalculateSalary = 0;
      }
      if(form.balanceTime == null || form.balanceTime == 'null'){
        form.balanceTime = "";
      }
      form.isCalculateSalary = isCalculateSalary;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      addtBonus(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message);
        } else if (response.status == 0) {
          let message = response.msg;
          _this.myAlert(message,'success-icon').then(res => {
              _this.$parent.getPerformance();
              _this.cancelData();
          }).catch(err => {

          })
          
        }
      });
    },
    getCurrentDate(){
      let date = new Date();
      let year = date .getFullYear();
      let month = date .getMonth()+1;
      if(month*1 < 10){
        month = "0"+month;
      }
      let day = date .getDate();
      if(day*1 < 10){
        day = "0"+day;
      }
      let currentDate = year +"-"+month;
      return currentDate;
    },

    cancelData() {
      this.$layer.close(this.layerid);
    }
  },
  mounted() {
    this.getParam();
  },
  
  watch:{
    'form.proportion':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,4}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form.proportion = undefined;
          return;
        }
        this.form.proportion = oldval
      } else {
        
        if(newval){
          this.form.proportion = (newval+"").replace(/^\./g, "");
        }
      }
    },
    'form.receivable':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form.receivable = undefined;
          return;
        }
        this.form.receivable = oldval
      } else {
        if(newval){
          this.form.receivable = (newval+"").replace(/^\./g, "")
        }
      }
    },
    'form.receipts':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form.receipts = undefined;
          return;
        }
        this.form.receipts = oldval
      } else {
        if(newval){
          this.form.receipts = (newval+"").replace(/^\./g, "")
        }
      }
    },
    'form.deduct':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form.deduct = undefined;
          return;
        }
        this.form.deduct = oldval
      } else {
        if(newval){
          this.form.deduct = (newval+"").replace(/^\./g, "")
        }
        
      }
    },
    
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 40px;
}
.content {
  width: 100%;
  border: 1px solid #797979;
}
.top {
}
.bottom {
  padding: 0 0 14px 0;
}
.require-word:before {
  content: "*";
  color: #f56c6c;
  margin-right: 1px;
}
.question-icon {
  background: url(../../../images/icon2.png) -367px -62px;
  width: 15px;
  height: 15px;
  display: block;
  cursor: pointer;
}
.question-icon:hover {
  background: url(../../../images/icon2.png) -367px -62px;
  width: 15px;
  height: 15px;
  display: block;
  cursor: pointer;
}
.pensail-icon {
  background: url(../../../images/icon.png) -323px -173px;
  width: 21px;
  height: 22px;
  display: block;
  cursor: pointer;
  position: absolute;
  left: 43px;
  top: -52px;
}
.pensail-icon:hover {
  background: url(../../../images/yyf.png) 144px -102px;
  width: 21px;
  height: 22px;
  display: block;
  cursor: pointer;
}
.question-icon {
  cursor: pointer;
}
.foot-btn {
  display: inline-block;
  padding: 2px 15px;
  border: 1px solid #797979;
  cursor: pointer;
  font-size: 12px;
}
.pop-up {
  .pop-up-container {
    border-width: 0px;
    padding: 0 5px;
  }
}
.padding-l-10 {
  padding-left: 10px;
}
.pop-up-container .el-select dropdown-list .el-select__tags {
  display: none;
}
.break {
  border-width: 2px;
  border-top-width: 0px;
  border-style: solid;
  border-image: url("../../../images/system/border.png") 2 repeat;
  margin: 8px 0 0;
}
.padding-t-10 {
  padding-top: 10px;
}
.padding-t-6 {
  padding-top: 6px;
}
.padding-t-2 {
  padding-top: 2px;
}
.padding-r-2 {
  padding-right: 2px;
}
.padding-r-1 {
  padding-right: 1px;
}
.footer-btn {
  padding: 5px 0;
}
.cancel-btn {
  display: inline-block;
  line-height: 18px;
  height: 20px;
  margin: 0 0px 0 5px;
  padding: 0px 12px;
  font-size: 12px;
  border: 1px solid #666;
  border-radius: 3px;
  color: #333333;
  background-color: #dfdad5;
}
/deep/ .el-textarea__inner {
  padding: 5px;
  font-size: 12px;
  border: 1px solid #aaa;
}
/deep/ .el-select .el-input .el-select__caret {
  height: 30px;
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
</style>
<style lang="scss">
.special-select-color .el-input__inner {
  color: #088383;
}
</style>
