<template>
  <div class="" >

      <div class="pop-up" style="width: 780px;margin: 0 10px;" >
        <div class="pop-up-container" style="height:462px;overflow-y:auto;overflow-x:hidden;position: relative;" >
          <el-form ref="formsData"  :model="form" >
            <div>
              <div v-for='(item,index) in SalaryDetailsParams' class="clear">
                <!-- 总计栏 -->
                <div class="clear" v-if="item.type=='总基本当月'||item.type=='总应计当月'||item.type=='总人力当月'||item.type=='总结算当月'||item.type=='总税前应发'||item.type=='总税后应发'||item.type=='总人力实际'||item.type=='总最终发放'||item.type=='总实际发放'">
                  <div class="left" style="width: 40px;text-align: right;">
                    <span class="des-word" style="width: 20px;">{{index+1}}</span>
                  </div>
                  <div class="left" style="width: 110px;text-align: right;">
                    <span class="des-word" style="width: 115px;font-weight: bold;">{{item.type}}</span>
                  </div>

                  <div class="left " style="padding-left:3px;">
                    <el-form-item prop="word" label-width="0">
                      <el-input :disabled="true" onkeyup="value=value.replace(/[^\d]/g,'')" title="上限10位数" maxlength="10" style="width:80px;" v-model='item.autoValue' autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  
                  <div class="left" style="width: 55px;margin-left: 100px;">
                    <span class="des-word" >备注</span>
                  </div>
                  <div class="left " style="padding-left:3px;"  >
                    <el-form-item  label-width="0">
                      <el-input :disabled="inputtrueorfalse" title="上限100个字" maxlength="100" style="width:330px;" v-model='item.remark' autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="index==5||index==8||index==19||index==26||index==29" >
                    <div class="break"></div>
                  </div>
                </div>
                
                <!-- 处置欠款 -->
                <div class="clear" v-else-if="item.type=='处置欠款'">
                  <div v-if="item.deleted==0">
                    <div class="left" style="width: 40px;text-align: right;">
                      <span class="des-word" style="width: 20px;">{{index+1 }}</span>
                    </div>

                    <div class="left" style="width: 110px;text-align: right;">
                      <div class="left" style="margin-top: 5px;margin-left: 40px;" >  
                      </div>
                      <span class="des-word" style="width: 70px;float: left;">{{item.type}}</span>
                    </div>
                  
                    <div class="left " style="padding-left:3px;">
                      <el-form-item prop="word" label-width="0">
                        
                        <el-input name="1" v-if="item.price!=item.arrearstotalnum&&item.arrearstotalnum>0" :disabled='true' @input='checkNum2(item)' title="上限10位数" maxlength="10" style="width:80px;" v-model='item.manualValue' autocomplete="off" ></el-input>
                        <el-input v-else :disabled='inputtrueorfalse' @input='checkNum2(item)' title="上限10位数" maxlength="10" style="width:80px;" v-model='item.manualValue' autocomplete="off" ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left" style="padding-left: 3px" >
                      <el-form-item  label-width="0">
                        <el-select :disabled='true'    style="width:70px;"  v-model="item.manualType">
                          <el-option  v-for="item in autoORhand" :label="item.name" :value="item.manualType"  style="width: 70px;"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <template>
                      <div class="left qusetion-icon"  @click='openSalaryDetailsIframeChild(item)' style="margin: 3px 0 0 3px" >

                      </div>
                      <div v-if="item.manualValue<0" class="left seven-one-icon"  @click='openDisposalArrears(item)' style="margin: 3px 0px 0px 6px" >
                      </div>

                      <div v-else-if="item.price" class="left" style="margin: 3px 0px 0px 6px;">
                        <i v-if="Number(item.price)==0" class="left seven-two-icon" @click='BalanceAccountIframe(item)'></i>
                        <i v-if="Number(item.price)>0 && Number(item.price) == Number(item.arrearstotalnum)" class="left seven-one-icon" @click='BalanceAccountIframe(item)'></i>
                        <i v-if="Number(item.price)>0&& Number(item.price) != Number(item.arrearstotalnum)" class="left seven-three-icon" @click='BalanceAccountIframe(item)'></i>
                      </div>

                      <div v-else class="left" style="margin: 3px 0px 0px 6px;width: 20px;" >

                      </div>
                    </template>
                    <div class="left" style="width: 28px;">
                      <span class="des-word" style="width: 29px;">备注</span>
                    </div>
                    <div class="left " style="padding-left:3px;"  >
                      <el-form-item  label-width="0">
                        <el-input :disabled='inputtrueorfalse' title="上限100个字" maxlength="100" style="width:330px;" v-model='item.remark'  autocomplete="off" ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <!-- 底薪 -->
                <div class="clear" v-else-if="item.type=='底薪'">
                  <div class="left" style="width: 40px;text-align: right;">
                    <span class="des-word" style="width: 20px;">{{index+1}}</span>
                  </div>
                  <div class="left" style="width: 110px;text-align: right;">
                    <span class="des-word" style="width: 115px;">{{item.type}}</span>
                  </div>

                  <!-- 自动 -->
                  <div class="left"  v-if="item.manualType=='1'">
                    <div class="left " style="padding-left:3px;" >
                      <el-form-item prop="word" label-width="0">
                        <el-input :disabled='true'  onkeyup="value=value.replace(/[^\d]/g,'')" title="上限10位数" maxlength="10" style="width:80px;" v-model='item.autoValue' autocomplete="off" ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left" style="padding-left: 3px">
                      <el-form-item  label-width="0">
                        <el-select :disabled='inputtrueorfalse'  style="width:70px;"  v-model="item.manualType">
                          <el-option v-for="item in autoORhand" :label="item.name" :value="item.manualType"  style="width: 70px;"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left" style="width: 55px;margin-left: 27px;">
                      <span class="des-word" >备注</span>
                    </div>
                  </div>
                  <!-- 手动 -->
                  <div class="left" v-else>
                    <div class="left " style="padding-left:3px;" >
                      <el-form-item prop="word" label-width="0">
                        <el-input :disabled="inputtrueorfalse" onkeyup="value=value.replace(/[^\d]/g,'')" title="上限10位数" maxlength="10" style="width:80px;" v-model='item.manualValue' autocomplete="off" ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left" style="padding-left: 3px">
                      <el-form-item  label-width="0">
                        <el-select :disabled="inputtrueorfalse"   style="width:70px;"  v-model="item.manualType">
                          <el-option v-for="item in autoORhand" :label="item.name" :value="item.manualType"  style="width: 70px;"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <template>
                      <div class="left qusetion-icon"  @click='openSalaryDetailsIframeChild(item)' style="margin: 3px 0 0 3px" >

                      </div>
                    </template>
                    <div class="left" style="width: 55px;">
                      <span class="des-word" >备注</span>
                    </div>
                  </div>
                  <div class="left " style="padding-left:3px;"  >
                    <el-form-item  label-width="0">
                      <el-input :disabled="inputtrueorfalse" title="上限100个字" maxlength="100" style="width:330px;" v-model='item.remark'autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                </div>

                <!-- 工资封账 -->
                <div class="clear" v-else-if="item.type=='工资封账'">
                  <div class="break"></div>
                  <div class="left" style="width: 40px;text-align: right;">
                    <span class="des-word" style="width: 20px;">{{index+1}}</span>
                  </div>
                  <div class="left" style="width: 110px;text-align: right;">
                    <span class="des-word" style="width: 115px;font-weight: bold;">{{item.type}}</span>
                  </div>

                  <div class="left " style="padding-left:3px;">
                    <el-form-item  label-width="0">
                      <el-select :disabled="statetrueorfalse"   style="width:70px;"  v-model="form.isClosingAccounts" @change='isClosingAccountschangefunc'>
                        <el-option v-for="ii in isClosingAccounts" :label="ii.name" :value="ii.id"  style="width: 70px;"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  
                  <div class="left" style="width: 55px;margin-left: 110px;">
                    <span class="des-word" >备注</span>
                  </div>
                  <div class="left " style="padding-left:3px;"  >
                    <el-form-item  label-width="0">
                      <el-input :disabled="statetrueorfalse" title="上限100个字" maxlength="100" style="width:330px;" v-model='form.closeRemark' autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                </div>

                 <!-- 发放领取 -->
                <div class="clear"  v-else-if="item.type=='发放领取'">
                  <div class="left" style="width: 40px;text-align: right;">
                    <span class="des-word" style="width: 20px;">{{index+1}}</span>
                  </div>
                  <div class="left" style="width: 110px;text-align: right;">
                    <span class="des-word" style="width: 115px;font-weight: bold;">{{item.type}}</span>
                  </div>

                  <div class="left " style="padding-left:3px;">
                    <el-form-item  label-width="0">
                      <el-select :disabled="isClosingAccountstrueorfalse" style="width:70px;"  v-model="form.state"  @change="statechangefunc">
                        <el-option v-for="ii in stateParams" :label="ii.name" :value="ii.id"  style="width: 70px;"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  
                  <div class="left" style="width: 55px;margin-left: 110px;">
                    <span class="des-word" >备注</span>
                  </div>
                  <div class="left " style="padding-left:3px;"  >
                    <el-form-item  label-width="0">
                      <el-input :disabled="isClosingAccountstrueorfalse" title="上限100个字" maxlength="100" style="width:330px;" v-model='form.stateRemark'  autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <!-- 禁用自动手动切换 只有手动模式 -->
                <div class="clear" v-else-if="item.type=='往月补充扣款'||item.type=='往月补充奖补'||item.type=='个所税'||item.type=='代补扣额'">
                  <div class="left" style="width: 40px;text-align: right;">
                    <span class="des-word" style="width: 20px;">{{index+1}}</span>
                  </div>
                  <div class="left" style="width: 110px;text-align: right;">
                    <span class="des-word" style="width: 115px;">{{item.type}}</span>
                  </div>
                  <div class="left " style="padding-left:3px;">
                    <el-form-item prop="word" label-width="0">
                      <el-input :disabled="inputtrueorfalse" onkeyup="value=value.replace(/[^\d]/g,'')" title="上限10位数" maxlength="10" style="width:80px;" v-model='item.manualValue' autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left" style="padding-left: 3px" >
                    <el-form-item  label-width="0">
                      <el-select :disabled='true'   style="width:70px;"  v-model="item.manualType">
                        <el-option v-for="item in autoORhand" :label="item.name" :value="item.manualType"  style="width: 70px;"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <template>
                    <div class="left qusetion-icon"  @click='openSalaryDetailsIframeChild(item)' style="margin: 3px 0 0 3px" >

                    </div>
                  </template>
                  
                  <div class="left" style="width: 55px;">
                    <span class="des-word" >备注</span>
                  </div>
                  <div class="left " style="padding-left:3px;"  >
                    <el-form-item  label-width="0">
                      <el-input :disabled="inputtrueorfalse" title="上限100个字" maxlength="100" style="width:330px;" v-model='item.remark' autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="index==5||index==8||index==19||index==26||index==29">
                    <div class="break"></div>
                  </div>
                </div>

                <div class="clear" v-else >
                  <div class="left" style="width: 40px;text-align: right;">
                    <span class="des-word" style="width: 20px;">{{index+1}}</span>
                  </div>
                  <div class="left" style="width: 110px;text-align: right;">
                    <span class="des-word" style="width: 115px;">{{item.type}}</span>
                  </div>

                  <div class="left " style="padding-left:3px;" v-if="item.manualType=='1'" >
                    <el-form-item prop="word" label-width="0">
                      <el-input :disabled="true" onkeyup="value=value.replace(/[^\d]/g,'')" title="上限10位数" maxlength="10" style="width:80px;" v-model='item.autoValue' autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left " style="padding-left:3px;" v-else >
                    <el-form-item prop="word" label-width="0">
                      <el-input :disabled="inputtrueorfalse" onkeyup="value=value.replace(/[^\d]/g,'')" title="上限10位数" maxlength="10" style="width:80px;" v-model='item.manualValue' autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left" style="padding-left: 3px" >
                    <el-form-item  label-width="0">
                      <el-select :disabled="inputtrueorfalse"   style="width:70px;"  v-model="item.manualType">
                        <el-option v-for="item in autoORhand" :label="item.name" :value="item.manualType"  style="width: 70px;"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <template>
                    <div class="left qusetion-icon"  @click='openSalaryDetailsIframeChild(item)' style="margin: 3px 0 0 3px" >

                    </div>
                  </template>
                  
                  <div class="left" style="width: 55px;">
                    <span class="des-word" >备注</span>
                  </div>
                  <div class="left " style="padding-left:3px;"  >
                    <el-form-item  label-width="0">
                      <el-input :disabled="inputtrueorfalse" title="上限100个字" maxlength="100" style="width:330px;" v-model='item.remark'  autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="index==5||index==8||index==19||index==26||index==29">
                    <div class="break"></div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>

        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 10px;" >
            <div class="left" style="padding-right:7px;"  >
              <i class="up-page-icon" @click="upPage($event)" ></i>
            </div>
            <div class="left" >
              <i class="down-page-icon" @click="downPage($event)" ></i>
            </div>
          </div>
          <span v-if="form.isClosingAccounts=='1'" class="m-l-15" style="color: #009933;font-weight: bold;"> 已封账的工资不能修改 </span>
          <span v-if="form.isClosingAccounts=='0'&& BalancingAccounts" class="m-l-15" style="color: #009933;font-weight: bold;"> 有处置欠款已被平账，被平账的处置欠款【金额】不可修改 </span>
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
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

  </div>
</template>

<script>
import {findUserByDepartId} from "../../../service/organizeDate";
import { userSalaryInsert,userSalarygetParams,userSalaryDetail,userSalaryUpdate } from "../../../service/SalaryDetails";

import CheckSelectSpecial from '../../../components/checkSpecial'
import CheckSelect from "../../../components/check";

// 各种弹窗
import iframechildone from './iframechildone.vue';
import iframechildtwo from './iframechildtwo.vue';
import iframechildthree from './iframechildthree.vue';
import iframechildfour from './iframechildfour';
import iframechildfive from './iframechildfive';
import iframechildsix from './iframechildsix';
import iframechildseven from './iframechildseven';
import openDisposalArrearsPage from './DisposalArrearsDetails';
import BalanceAccountIframePage from './BalanceAccountIframe';
// 个人模拟数据
import { mySalaryDetailsListContent } from '../../../utils/mySalaryDetailsList';
export default {
  // props:['id','userId','departId','thissalaryState','thisisClosingAccounts','time'],
  props:['rowdata','mythisindex','layerid'],
  data() {
    return {
      statetrueorfalse:false,
      getId:this.rowdata.id,
      userId:this.rowdata.userId,
      departId:this.rowdata.departId,
      thissalaryState:this.rowdata.salaryState,
      thisisClosingAccounts:this.rowdata.isClosingAccounts,
      thisindex:this.mythisindex,
      isClosingAccountstrueorfalse:false,
      inputtrueorfalse:false,
      executorId111:'executorId111',
      autoORhand:[{manualType:'1',name:'自动'},{manualType:'2',name:'手动'}],
      autoORhandDefault:'1',
      executorList111:[{ id: "-1", name: "全部", select: true }],
      departParams111:[],
      departId111:'departId111',
      SalaryDetailsParams:[],
      departnamedefault:'',
      departnamedefaultdata:[],
      usernamedefault:'',
      usernamedefaultdata:[],
      stateParams:[],
      isClosingAccounts:[{id:'0',name:'未封账',select:true},{id:'1',name:'已封账',select:false}],
      isClosingAccountsRemark:'',
      stateParamsRemark:'',
      DisposalArrearsArr:[],
      thistime:'',
      myid:'',
      myuserId:'',
      BalancingAccounts:false,
      form:{

        },
      thisfinancenum:0,
      thissalarynum:0,
      thismyid:0,
    };
  },
  components: {
    CheckSelect,
    CheckSelectSpecial,
    iframechildone,
    iframechildtwo,
    iframechildthree,
    iframechildfour,
    iframechildfive,
    iframechildsix,
    iframechildseven,
  },
  methods: {
    statechangefunc(val){
      this.stateParams.forEach(item=>{
        if(item.id==val){
          if(item.name=="已发放"){
            this.statetrueorfalse = true;
          }else{
            this.statetrueorfalse  = false;
          }
        }
      })
    },

    isClosingAccountschangefunc(val){
      this.isClosingAccounts.forEach(item=>{
        if(item.id==val){
          if(item.name=="未封账"){
            this.isClosingAccountstrueorfalse = true;
            this.inputtrueorfalse = false;
          }else{
            this.isClosingAccountstrueorfalse  = false;
            this.inputtrueorfalse = true;
          }
        }
      })
    },
    fathermethods(id,financeIds,salaryIds,thiscount,totalnum){
      let _this = this;
      _this.SalaryDetailsParams.forEach(item=>{
        if(item.id==id){
          item.financeIds = financeIds;
          item.salaryIds = salaryIds;
          item.price = thiscount;
          item.totalnum = totalnum;
        }

      })

    },
    getDetailsData(){
      let _this = this;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      userSalaryDetail(_this.getId).then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          if(_this.thissalaryState=='已发放'){
            _this.statetrueorfalse = true;
          }else{
            _this.statetrueorfalse = false;
          };
          if(_this.thisisClosingAccounts=='未封账'){
            _this.isClosingAccountstrueorfalse = true;
            _this.inputtrueorfalse = false;
          }else{
            _this.isClosingAccountstrueorfalse = false;
            _this.inputtrueorfalse = true;
          };
          let data = response.data;
          if(data.details){
            _this.SalaryDetailsParams = data.details;
            _this.SalaryDetailsParams.forEach(item=>{
              if(item.type=='处置欠款'&&item.manualValue>0){
                item.arrearstotalnum = item.manualValue;
              };
              if(item.type=='处置欠款'){
                if(item.financeIds||item.salaryIds){
                  if(item.manualValue>0){
                    _this.BalancingAccounts = true;
                  }
                }
              };
            })
            _this.stateParams = data.params.stateParams;
            // _this.form = data.salary;
            // _this.form.createBy = data.salary.createBy;
            for(let attr in data.salary){
              if(data.salary[attr] != null){
                _this.form[attr] =  data.salary[attr];
              }
            }

            if(_this.form.stateRemark==null||_this.form.stateRemark=="null"){
              _this.form.stateRemark="";
            };
            if( _this.form.closeRemark==null||_this.form.closeRemark=="null"){
              _this.form.closeRemark="";
            };
            _this.thistime = data.salary.time;
            _this.myid = data.salary.id;
            _this.myuserId = data.salary.userId;
            _this.SalaryDetailsParams.push({
              type:'工资封账',
              isClosingAccounts:'',
              isClosingAccountsRemark:'',
            });
            _this.SalaryDetailsParams.push({
              type:'发放领取',
              stateParams:'',
              stateParamsRemark:'',
             });
            _this.SalaryDetailsParams.forEach((item,index)=>{
              if(item.type=="处置欠款"){
                _this.DisposalArrearsArr.push(index);
              }
            })
          };
          
          // _this.tableData = data.list;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })
    },
    openSalaryDetailsIframeChild(val){
      let _this = this;
      // 当月考勤扣款
      if(val.manualType=='1'){
        if(val.type == '当月考勤扣款'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildone, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thisnum:val.autoValue,thistime:_this.thistime,thisuserId:_this.myuserId}//props
            },
            type:2,
            area:['600px','400px'],
            title: '当月考勤扣款---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        
        
        if(val.type == '当月奖罚-扣款'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildtwo, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thisnum:val.autoValue,thistime:_this.thistime,thisuserId:_this.myuserId,thistype:'2'}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '当月奖罚-奖补'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildtwo, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thisnum:val.autoValue,thistime:_this.thistime,thisuserId:_this.myuserId,thistype:'1'}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '保险（公司）'||val.type == '保险（个人）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildfour, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistime:_this.thistime,thisuserId:_this.myuserId,thisnum:val.autoValue}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '公积金（公司）'||val.type == '公积金（个人）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildfive, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thisnum:val.autoValue,thistime:_this.thistime,thisuserId:_this.myuserId,thismytype:val.type}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '当月提成应计（年）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildsix, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myuserId,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '当月奖金应计（月）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildseven, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myuserId,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '当月提成应计（月）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildsix, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myuserId,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '当月奖金结算（年）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildseven, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myuserId,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '当月提成结算（年）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildsix, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myuserId,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '当月奖金结算（月）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildseven, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myuserId,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '当月提成结算（月）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildsix, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myuserId,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '往月奖金结算（年）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildseven, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myid,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '往月提成结算（年）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildsix, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myid,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '往月奖金结算（月）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildseven, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myid,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '往月提成结算（月）'){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildsix, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thistype:val.type,thisnum:val.autoValue,thisuserId:_this.myid,thistime:_this.thistime}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
        if(val.type == '往月补充扣款'||val.type == '往月补充奖补'||val.type == '个所税'||val.type == "处置欠款"||val.type == "代补扣额"){
          let test = _this.$layer.iframe({
            content: {
              content: iframechildthree, //传递的组件对象
              parent: this,//当前的vue对象
              data:{thiswords:val.type,thisuserId:_this.myid}//props
            },
            type:2,
            area:['600px','400px'],
            title: val.type+'---'+val.autoValue+'元',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        };
      }else{
        let test = _this.$layer.iframe({
          content: {
            content: iframechildthree, //传递的组件对象
            parent: this,//当前的vue对象
            data:{thiswords:val.type,thisuserId:_this.myid}//props
          },
          type:2,
          area:['600px','400px'],
          title: val.type+'---'+val.manualValue+'元',
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891111,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      }
      
    },
    //删除处置欠款
    cutIKthings(item,index){
      let _this = this;
      item.deleted = 1;
      // _this.SalaryDetailsParams.splice(index,1);
    },
    //主平账列表
    openDisposalArrears(row){
      let _this = this;
      let test = _this.$layer.iframe({
        content: {
          content: openDisposalArrearsPage, //传递的组件对象
          parent: this,//当前的vue对象
          data:{
            userId:_this.userId,
            departId:_this.departId,
            id:row.id,
            thisnum:Math.abs(row.manualValue),
            inputtrueorfalse:_this.inputtrueorfalse,
            thisfinanceIds:row.financeIds,
            thissalaryIds:row.salaryIds
          }//props
        },
        type:2,
        area:['550px','450px'],
        title: '主平账列表',
        shadeClose: false,
        shade: true,//是否显示遮罩
        zIndex:19891113,
        cancel:()=>{//关闭事件
          this.currentPage = '';
        }
      });
    },
    // 被平账列表
    BalanceAccountIframe(row){
      let _this = this;
      let test = _this.$layer.iframe({
        content: {
          content: BalanceAccountIframePage, //传递的组件对象
          parent: this,//当前的vue对象
          data:{
            rowdata:row
          }
        },
        type:2,
        area:['550px','450px'],
        title: '被平账列表',
        shadeClose: false,
        shade: true,//是否显示遮罩
        zIndex:19891113,
        cancel:()=>{//关闭事件
          this.currentPage = '';
        }
      });
    },

    getSelectIdByList(list){
      let arr = [];
      if(list && list.length != 0) {
        list.forEach(function (item) {
          if (item.select) {
            arr.push(item.id);
          }
        })
      }
      return arr.toString();
    },
    finUserByDepart(){
      let _this = this;
      let id = _this.getSelectIdByList(_this.executorList111);
      if(id){
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            if (data.user) {
              let arr = [{ id: "-1", name: "全部", select: true }];
              let treeData = data.user;
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].name,
                  select: false
                });
              }
              _this.departParams111 = arr;
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }else{

      }

    },
    getParamsData(val, ss){
      let _this = this;
      userSalarygetParams().then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let arr = [{ id: "-1", name: "全部", select: true }];
          if (data.departTree) {
            
            let treeData = data.departTree;
            for (let i = 0; i < treeData.length; i++) {
              arr.push({
                id: treeData[i].id,
                name: treeData[i].label.replace(/&nbsp;/g, ""),
                level: treeData[i].level,
                select: false
              });
            }
            _this.executorList111 = arr;
          }else{
            _this.executorList111 = arr;
          }
          
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })

    },

    saveFormData(){
      let _this = this;
      let details = [];
      let mytrueorfalse = true;
      //封账备注
      let repaymenttotal = 0;
      let arrearstotal = 0;
      _this.SalaryDetailsParams.forEach((item,index)=>{
        if(item.type!='工资封账'&&item.type!='发放领取'){
          details.push(item);
        };
        if(item.type=="处置欠款"){
          if(item.financeIds==null){
            item.financeIds = "";
          };
          if(item.salaryIds==null){
            item.salaryIds = "";
          };
          if(item.manualValue<0&&item.deleted==0){
            if(item.financeIds=="" && item.salaryIds==""){
              _this.myAlert("请进行平账操作!", "dangerous-icon");
              mytrueorfalse = false;
                return false;
            }else{
              mytrueorfalse = item.totalnum;
              repaymenttotal =  Math.abs(item.price);
            }
          }
        }
      });
      if(repaymenttotal>mytrueorfalse){
        _this.myAlert("主平账数值不能大于所勾选被平账数据的未平账部分的绝对值总和!", "dangerous-icon");
        mytrueorfalse = false;
        return false;
      }
      if(mytrueorfalse==false){
        return false;
      }
      let form = {
        details:JSON.stringify(details),
        id:_this.getId,
        isClosingAccounts:_this.form.isClosingAccounts,
        closeRemark:_this.form.closeRemark,
        state:_this.form.state,
        stateRemark:_this.form.stateRemark,
        userId:_this.userId,
        departId:_this.departId,
        time:'',
      };
      
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      userSalaryUpdate(form).then(res => {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          _this.clearFormData();
          _this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              _this.$parent.searchSalaryDetailsList();
              _this.clearFormData();
            })
            .catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      })
    },
    clearFormData() {
      this.$layer.close(this.layerid);
    },
    checkNum2(obj){
      obj.manualValue = obj.manualValue.replace(/[^\.\-\d]/g,'');
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
      this.getId = callbackdata.row.id;
      this.userId = callbackdata.row.userId;
      this.departId = callbackdata.row.departId;
      this.thissalaryState = callbackdata.row.salaryState;
      this.thisisClosingAccounts = callbackdata.row.isClosingAccounts;
      this.thisindex = callbackdata.thisindex;
      this.getDetailsData();
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
      this.getId = callbackdata.row.id;
      this.userId = callbackdata.row.userId;
      this.departId = callbackdata.row.departId;
      this.thissalaryState = callbackdata.row.salaryState;
      this.thisisClosingAccounts = callbackdata.row.isClosingAccounts;
      this.thisindex = callbackdata.thisindex;
      this.getDetailsData();
    },
  },
  mounted() {
    this.getDetailsData();
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
<style type="text/css" scoped="">
  /deep/ .search-container {
    width: calc(100% - 10px);
    margin: 5px auto 0 5px;
    border-style: 2px solid;
    line-height: 23px;
  }
</style>
<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>