<template>
  <div class="" style="width:100%;padding:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container" style="height: 304px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:0px;" >
                <div class="clear" style="" >
                  <div class="left padding-r-3" style="width:40px;text-align:right;" >
                    <span class="word " >业类</span>
                  </div>
                  <div class="left">
                    <el-form-item   prop="businessType1" >
                      <el-select  @change="getChildrenParamsList" v-model="form.businessType1"  placeholder="" style="width:105px;" >
                        <el-option :disabled="item.disabled" v-for="item in businessType1Params"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left">
                    <el-form-item  prop="businessType2" >
                      <el-select  @change="setDisabled"    v-model="form.businessType2"  placeholder="" style="width:120px;" >
                        <el-option v-for="item in businessType2Params"  :label="item.rname" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="width:50px;text-align:right;" >
                    <span class="word " >合同</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="roomAddress" >
                      <el-input  :disabled="true"  v-model="roomAddress"  style="width:256px;" ></el-input>

                    </el-form-item>
                  </div>
                </div>
                <div class="clear" style="position:relative;top:5px;" >
                  <div class="left" style="padding-left:58px;" >
                    <span class="title-des-word" >收付方</span>
                  </div>
                  <div class="left" style="padding-left:143px;" >
                    <span class="title-des-word" >金额(元)</span>
                  </div>

                  <div class="left" style="padding-left:50px;" >
                    <span class="title-des-word" >方式</span>
                  </div>

                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="width:40px;text-align:right;" >
                    <span class="word " >实收</span>
                  </div>


                  <div class="left">
                    <el-form-item  prop="sourceGetId" >
                      <el-select   :disabled="disabledTyp1"  v-model="form.sourceGetId"  placeholder="" style="width:80px;" >
                        <el-option v-for="item in sourceGetIdParams1"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left">
                    <el-form-item  prop="sourceGetName" >
                      <el-input :disabled="disabledTyp1" title="上限10个字" maxlength="10"  v-model="form.sourceGetName" style="width:90px;" ></el-input>

                    </el-form-item>
                  </div>
                  <div class="left text-input" style="position:relative;" >
                    <el-form-item  prop="sourceGetAmount" >
                      <el-input :disabled="disabledTyp1" @input="checkNum1" title="上限10个字" maxlength="13" v-model="form.sourceGetAmount" style="width:80px;" ></el-input>

                    </el-form-item>
                    <i v-if="false" class="beAccount-icon" @click="clickShowBeAccount" style="position:absolute;top:5px;left:1px;" ></i>
                  </div>
                  <div class="left">
                    <el-form-item  prop="sourceGetType" >
                      <el-select :disabled="disabledTyp1"  v-model="form.sourceGetType"  placeholder="" style="width:75px;" >
                        <el-option v-for="item in sourceGetTypeParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left">
                    <el-form-item  prop="sourceGetClose" >
                      <el-select :disabled="disabledTyp1"  v-model="form.sourceGetClose"  placeholder="" style="width:66px;" >
                        <el-option   label="" value="" ></el-option>
                        <el-option v-for="item in sourceGetCloseParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left padding-r-1"  >
                      <div  @mouseleave="showSelect1 = false"  class="el-select" style="width:140px;padding-top:4px;position:relative;" >
                          <div class="el-input el-input--suffix" >
                              <input title="此处填写该金额的存出方式，且存出方式各金额相加必须等于金额总数！" @click="showSelectInputClick1" type="text" readonly="readonly" v-model="boxType1" autocomplete="off" placeholder :class="{'el-input__inner':true,'disabled-input':finishDisabled || disabledTyp1}">
                              <span class="el-input__suffix" >
                              <span class="el-input__suffix-inner" ></span>
                              </span>
                              
                          </div>
                          <div class="" v-show="showSelect1" style="position:absolute;width:100%;background:#fff;z-index:10;padding-left:5px;" >
                              <div class="clear"  v-for="(item ,index) in storageParams1" >
                                  <span class="left" >
                                      <el-checkbox @change="changeBoxType1(item)" v-model="item.select" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                                  </span>
                                  
                                  <span class="left select-check" style="margin-left:-12px;" >{{item.name}}</span>
                                  <span class="left select-check" >
                                      <input type="text" maxlength="13" @input="changeBoxType1(item)" v-model="item.money" style="width:50px;border-bottom:1px solid #999;" >
                                  </span>
                                  <span class="left select-check" style="margin-left:0px;" >元</span>
                              </div>      
                          </div>
                      </div>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="width:40px;text-align:right;" >
                    <span class="word " >实付</span>
                  </div>


                  <div class="left">
                    <el-form-item  prop="targetPayId" >
                      <el-select :disabled="disabledTyp2"  v-model="form.targetPayId"  placeholder="" style="width:80px;" >
                        <el-option v-for="item in sourceGetIdParams1"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left">
                    <el-form-item  prop="targetPayName" >
                      <el-input :disabled="disabledTyp2" title="上限10个字" maxlength="10"  v-model="form.targetPayName" style="width:90px;" ></el-input>

                    </el-form-item>
                  </div>
                  <div class="left text-input" style="position:relative;" >
                    <el-form-item  prop="targetPayAmount" >
                      <el-input :disabled="disabledTyp2" @input="checkNum2" title="上限10个字" maxlength="13" v-model="form.targetPayAmount" style="width:80px;" ></el-input>

                    </el-form-item>
                    <i v-if="accountIcon" class="account-icon" @click="clickShowAccount" style="position:absolute;top:5px;left:1px" ></i>
                  </div>

                  <div class="left">
                    <el-form-item  prop="targetPayType" >
                      <el-select  :disabled="disabledTyp2" v-model="form.targetPayType"  placeholder="" style="width:75px;" >
                        <el-option v-for="item in sourceGetTypeParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left">
                    <el-form-item  prop="targetPayClose" >
                      <el-select :disabled="disabledTyp2"  v-model="form.targetPayClose"  placeholder="" style="width:66px;" >
                        <el-option   label="" value="" ></el-option>
                        <el-option v-for="item in sourceGetCloseParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left padding-r-1"  >
                      <div  @mouseleave="showSelect2 = false"  class="el-select" style="width:140px;padding-top:4px;position:relative;" >
                          <div class="el-input el-input--suffix" >
                              <input title="此处填写该金额的存出方式，且存出方式各金额相加必须等于金额总数！" @click="showSelectInputClick2" type="text" readonly="readonly" v-model="boxType2" autocomplete="off" placeholder :class="{'el-input__inner':true,'disabled-input':finishDisabled || disabledTyp2}" >
                              <span class="el-input__suffix" >
                              <span class="el-input__suffix-inner" ></span>
                              </span>
                              
                          </div>
                          <div class="" v-show="showSelect2" style="position:absolute;width:100%;background:#fff;z-index:10;padding-left:5px;" >
                              <div class="clear"  v-for="(item ,index) in storageParams2" >
                                  <span class="left" >
                                      <el-checkbox @change="changeBoxType2(item)" v-model="item.select" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                                  </span>
                                  
                                  <span class="left select-check" style="margin-left:-12px;" >{{item.name}}</span>
                                  <span class="left select-check" >
                                      <input type="text" maxlength="13" @input="changeBoxType2(item)" v-model="item.money" style="width:50px;border-bottom:1px solid #999;" >
                                  </span>
                                  <span class="left select-check" style="margin-left:0px;" >元</span>
                              </div>      
                          </div>
                      </div>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="width:65px;text-align:right;" >
                    <span class="word require-word" >收付日期</span>
                  </div>

                  <div class="left " style="" >
                    <el-form-item  prop="getPayDate" >
                      <el-date-picker  size="mini" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.getPayDate" style="width: 100px;"></el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" style="padding:0px 5px 0 15px;" >
                    <el-form-item prop="isAchievement" >
                      <el-checkbox
                        v-model="form.isAchievement"
                        class="left"
                        :false-label="0" :true-label="1"
                      ></el-checkbox>
                    </el-form-item>

                  </div>
                  <div class="left padding-r-2">
                    <span class="" style="line-height:28px;">计业绩</span>
                  </div>
                  <div class="left padding-r-3" style="width:96px;text-align:right;" >
                    <span class="word require-word" >财务人</span>
                  </div>
                  <div class="left " >
                    <el-form-item  prop="managerDepartId" >
                      <el-select @change="findUserByDepart(1)" v-model="form.managerDepartId"  placeholder="" style="width:140px;" >
                        <el-option v-for="item in departTree"  :label="item.name" :value="item.id" >
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                  <div class="left " >
                    <el-form-item  prop="managerId" >
                      <el-select  v-model="form.managerId"  placeholder="" style="width:100px;" >
                        <el-option v-for="item in userList"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="width:40px;text-align:right;" >
                    <span class="word " >备注</span>
                  </div>
                  <div class="left" style="padding-top:5px;" >
                    <el-form-item  prop="remark" >
                      <textarea  class="remark" :rows="6" v-model="form.remark" title="上限100个字，数字/字母/汉字" maxlength="100" style="width:532px;resize: none;" ></textarea>

                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
  </div>
</template>
<script>
  import {financeParams,newContractFinance,contractgetByBusinessType2} from "../../../service/contractSpecial";
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {findChildParams} from "../../../service/getData";
  import AccountPage from './account'
  import BeAccountPage from './beAccount'

  export default {
    props:["contractId", "businessType","contractCode","roomAddress","layerid"],
    businessType1Params:[],

    data() {
      return {
        dialogNewFollow:this.newShowShoudFinanceValue,
        dialogAccountValue:false,
        dialogBeAccountValue:false,
        disabledTyp1:false,
        disabledTyp2:false,
        finishDisabled:false,
        
        checkElem:'',
        checkCount:0,
        processWayIdParams:[],
        sourceGetTypeParams:[],
        sourceGetBankParams:[],
        sourceGetIdParams1:[],
        sourceGetIdParams2:[],
        
        businessType1Params:[],
        sourceGetCloseParams:[],
        businessType2Params:[],
        businessType2s:[],
        storageParams1:[],
        storageParams2:[],
        showSelect1:false,
        boxType1:'',
        showSelect2:false,
        boxType2:'',
        departTree:[],
        userList:[],
        accountIcon:false,
        form:{
          id:'',
          contractId:'',
          businessType1:'',
          businessType2:'',
          sourceGetId:'',
          sourceGetName:'',
          sourceGetAmount:'0.00',
          sourceGetType:'',
          sourceGetClose:'',
          sourceGetBank:'',
          targetPayId:'',
          targetPayName:'',
          targetPayAmount:'0.00',
          targetPayType:'',
          targetPayClose:'',
          targetPayBank:'',
          getPayDate:'',
          isAchievement:1,
          managerDepartId:'',
          managerId:'',
          remark:'',
          isReturn:'',
          fid: '',
          over:'',
          preId:'',
        },
        preSourceGetAmount:'',
        preTargetPayAmount:'',
        thistruemoney1:'',
        thistruemoney2:'',
      };
    },
    components:{
      AccountPage,
      BeAccountPage
    },
    methods:{
      checkNum1(){
        this.form.sourceGetAmount= this.form.sourceGetAmount.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.targetPayAmount= this.form.targetPayAmount.replace(/[^\.\d]/g,'');
      },
      clickShowAccount(){
        let contractId = this.form.contractId;
        let businessType1Params = this.businessType1Params;
        let businessType2Params = this.businessType2Params;
        let businessType1 = this.form.businessType1;
        let businessType2 = this.form.businessType2;
        let businessName1 = null;
        let businessName2 = null;
        let fid = this.form.fid;
        if(businessType1Params && businessType1Params.length != 0){
          businessType1Params.forEach(function(item){
              if(item.id == businessType1){
                businessName1 = item.name;
              }
          })
        }
        if(businessType2Params && businessType2Params.length != 0){
          businessType2Params.forEach(function(item){
            if(item.id == businessType2){
              businessName2 = item.name;
            }
          })
        }
        let targetPayId = this.form.targetPayId;
        let targetPayName = this.form.targetPayName;
        let financeId = this.form.id;
        if(businessType2){
          let layerId = this.$layer.iframe({
            content: {
              content: AccountPage, //传递的组件对象
              parent: this, //当前的vue对象
              data: {
                businessType2,contractId,businessName1,businessName2,fid,
                 sourceGetId:targetPayId,sourceGetName:targetPayName,
                 thisFinanceId:financeId,
              } //props
            },
            area:["550px", "450px"],
            title: "主平账列表 【"+businessName1+"】",
            shadeClose: false,
            shade: true, //是否显示遮罩
            zIndex: 198911100,
            cancel: () => {
              //关闭事件
              
            }
          })
        }
      },
      clickShowBeAccount(){
        let contractId = this.form.contractId;
        let businessType1Params = this.businessType1Params;
        let businessType2Params = this.businessType2Params;
        let businessType1 = this.form.businessType1;
        let businessType2 = this.form.businessType2;
        let businessName1 = null;
        let businessName2 = null;
        if(businessType1Params && businessType1Params.length != 0){
          businessType1Params.forEach(function(item){
            if(item.id == businessType1){
              businessName1 = item.name;
            }
          })
        }
        if(businessType2Params && businessType2Params.length != 0){
          businessType2Params.forEach(function(item){
            if(item.id == businessType2){
              businessName2 = item.name;
            }
          })
        }
        if(businessType2){
          let layerId = this.$layer.iframe({
            content: {
              content: BeAccountPage, //传递的组件对象
              parent: this, //当前的vue对象
              data: {
                businessType2,contractId,businessName1,businessName2,financeId
              } //props
            },
            area:["550px", "450px"],
            title: "被平账列表 【"+businessName1+"】",
            shadeClose: false,
            shade: true, //是否显示遮罩
            zIndex: 198911100,
            cancel: () => {
              //关闭事件
              
            }
          })
        }
      },
      
      showSelectInputClick1(){
          // debugger;
            this.showSelect1 = !this.showSelect1;
      },
      changeBoxType1(item){
          var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
          if (!reg.test(item.money)) {
            if (item.money == undefined||item.money == '') {
              item.money = '';
              return;
            }
            item.money = this.thistruemoney1;
          } else {
            this.thistruemoney1 = item.money;
          }
          let boxType = this.boxType1;
          if(item.money){
             item.money = item.money.replace(/[^\.\d]/g,'');
          }
         
          let storageParams = this.storageParams1;
          let name = "";
          let flag = true;
          storageParams.forEach(item => {
            if(item.select && flag){
              let money = item.money;
              
              name = item.name +" " +money+ " 元";
              flag = false;
            } 
          })
          this.boxType1 = name;
      },
      showSelectInputClick2(){
          this.showSelect2 = !this.showSelect2;
      },
      
      changeBoxType2(item){
          var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
          if (!reg.test(item.money)) {
            if (item.money == undefined||item.money == '') {
              item.money = '';
              return;
            }
            item.money = this.thistruemoney2;
          } else {
            this.thistruemoney2 = item.money;
          }

          let boxType = this.boxType2;
          if(item.money){
             item.money = item.money.replace(/[^\.\d]/g,'');
          }
          let storageParams = this.storageParams2;
          let name = "";
          let flag = true;
          storageParams.forEach(item => {
              if(item.select && flag){
                let money = item.money;
                
                name = item.name +" " +money+ " 元";
                flag = false;
              }
          })
          this.boxType2 = name;
          
      },
      changBusiness(){
        let businessType1Params = this.businessType1Params;
        let businessType1 = this.form.businessType1
        let arr = [{id:'',name:' '}];
        businessType1Params.forEach(item =>{
          if(item.id == businessType1){
            let child = item.children;
            child.forEach(item =>{
              let remark = item.remark;
              if(remark != null){
                item.rname = item.name + remark;
              }
              
            })
            arr = child;
          }
        })
        if(!arr){
          arr = [];
        }
        this.businessType2Params = [{id:'',rname:' ',name:' '}].concat(arr);
        this.businessType2 = '';
      },
      getChildrenParamsList(){
        let _this = this;
        let id = _this.form.businessType1;
        let businessType1Params = _this.businessType1Params;
        
        this.disabledTyp1 = false;
        this.disabledTyp2 = false;
        this.accountIcon = false;
        let arr = [{id:'',name:' '}];
        businessType1Params.forEach(item =>{
          if(item.id == id){
            let child = item.children;
            child.forEach(item =>{
              let remark = item.remark;
              if(remark != null){
                item.rname = item.name + remark;
              } 
            })
            arr = child;
          }
        })
        if(!arr){
          arr = [];
        }
        this.businessType2Params = [{id:'',name:' ',rname:' '}].concat(arr);
        this.form.businessType2 = '';
      },
      setDisabled(){
        let _this = this;
        let id = _this.form.businessType1;
        let id2 = _this.form.businessType2;
        let businessType1Params = _this.businessType1Params;
        let businessType2Params = _this.businessType2Params;
        let name = '';
        let name2 = '';
        businessType1Params.forEach(item=>{
          if(item.id == id){
            name = item.name;
            return false;
          }
        })
        businessType2Params.forEach(item=>{
          if(item.id == id2){
            name2 = item.name;
            return false;
          }
        })


        if(name && (name.indexOf("X") != -1 && name2.indexOf("1") != -1 )) {
          this.disabledTyp2 = true;
          this.form.targetPayAmount = '0.00';
        }else{
          this.disabledTyp2 = false;
        }
        if(name && (name.indexOf("x") != -1 && name2.indexOf("1") != -1 )) {
          this.disabledTyp1 = true;
          this.form.sourceGetAmount = '0.00';
          this.accountIcon = true;
        }else{
          this.disabledTyp1 = false;
          this.accountIcon = false;
        };

        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let myform={contractId:_this.form.contractId,businessType2:_this.form.businessType2};
        contractgetByBusinessType2(myform).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.preTargetPayAmount = data.preTargetPayAmount;
            _this.preSourceGetAmount = data.preSourceGetAmount;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      setCheckData(elem,checkFinanceArr){
        let _this = this;

        if(elem) {
          let arr = [];
          this.checkElem = elem;
          let sourceGetId = elem.sourceGet1;
          let sourceGetName = elem.sourceGetId2;
          _this.form.targetPayId = sourceGetId;
          _this.form.targetPayName = sourceGetName;

          let count = 0;
          checkFinanceArr.forEach(item => {
            arr.push(item.id);
            if(item.over){
              count += item.over*1;
            }  
          })
          _this.checkCount = count;
          this.form.fid = arr.toString();
        }else{
          this.form.fid = "";
          this.checkElem = "";
        }
      },
      getFinanceParamData(businessType){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        })
        financeParams('',this.form.contractId).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let sourceGetIdParams = data.sourceGetIdParams;
            let businessType1Params = data.businessType1Params;
            let sourceGetTypeParams = data.sourceGetTypeParams;
            let sourceGetBankParams = data.sourceGetBankParams;
            let sourceGetCloseParams = data.sourceGetCloseParams;
             _this.businessType2s = data.businessType2s;
            if(sourceGetIdParams && sourceGetIdParams.length != 0){
              let sourceArr = [];
              sourceGetIdParams.forEach(item => {
                if(item.name != '内部'){
                  sourceArr.push(item);
                }
              })
              _this.sourceGetIdParams1 = [{id:'',name:' '}].concat(sourceArr);
              _this.form.sourceGetId = sourceArr[0].id;
              _this.form.targetPayId = sourceArr[2].id;
            }
            if(sourceGetTypeParams && sourceGetTypeParams.length != 0){
              _this.sourceGetTypeParams = [{id:'',name:' '}].concat(sourceGetTypeParams);

              _this.form.sourceGetType = sourceGetTypeParams[0].id;
              _this.form.targetPayType = sourceGetTypeParams[0].id;

            }
            _this.sourceGetCloseParams = sourceGetCloseParams;
            _this.form.sourceGetClose = sourceGetCloseParams[0].id;
            _this.form.targetPayClose  = sourceGetCloseParams[0].id;
            if(sourceGetBankParams && sourceGetBankParams.length != 0){
              sourceGetBankParams.forEach(item => {
                item.money = "";
              })
              _this.storageParams1 =JSON.parse(JSON.stringify(sourceGetBankParams));
              _this.storageParams2 = JSON.parse(JSON.stringify(sourceGetBankParams));
            }
           
            let flag = false;
            let businessArr = [];
           
            businessType1Params.forEach(item => {
              let name = item.name;
              let remark = item.remark;
              if(remark != null){
                item.name = item.name + remark;
              }
              if(name.indexOf("A") != -1 && item.id == businessType){
                flag = true;
                return false;
              }
            })
            
            businessType1Params.forEach(item => {
              let obj = {
                id:item.id,
                name:item.name,
                disabled:false,
                children:item.children,
              }
              if(flag){
                  if(item.name.indexOf("B") != -1 || item.name.indexOf("C") != -1){
                    obj.disabled = true;
                  }
              }
              businessArr.push(obj);
            })  
            _this.businessType1Params = businessArr;
            
            _this.form.businessType1 = businessType;
           
            _this.form.getPayDate = _this.getCurrentDate();
           

            if(data.departTree){
              let arr = [];
              let treeData = data.departTree
              for(let i = 0 ; i < treeData.length; i++){
                arr.push({
                  id:treeData[i].id,
                  name:treeData[i].label.replace(/&nbsp;/g,""),
                  level:treeData[i].level,
                  state:treeData[i].state
                })
              }
              _this.departTree = arr; // 部门
              _this.changBusiness();
            }

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      //部门查人员
      findUserByDepart(value){
        let _this = this;
        let id = this.form.managerDepartId;
        let userList = "userList";

        if(id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [];
              if(user && user.length != 0){
                user.forEach(function(item){
                  arr.push({
                    id: item.id,
                    name: item.name,
                  })
                })

              }

              _this[userList] =  user;
              _this.form["managerId"] = '';
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      
      saveData(){
        let _this = this;
        
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        let sourceGetId = form.sourceGetId;
        let sourceGetName = form.sourceGetName;
        let sourceGetAmount = form.sourceGetAmount;
        let sourceGetType = form.sourceGetType;
        let sourceGetClose = form.sourceGetClose;
        let sourceGetBank = form.sourceGetBank;
        let targetPayId = form.targetPayId;
        let targetPayName = form.targetPayName;
        let targetPayAmount = form.targetPayAmount;
        let targetPayType = form.targetPayType;
        let targetPayClose = form.targetPayClose;
        let targetPayBank = form.targetPayBank;
        let managerDepartId = form.managerDepartId;
        let managerId = form.managerId;
        let storageParams1 = this.storageParams1;
        let storageParams2 = this.storageParams2;
        let disabledTyp1 = this.disabledTyp1;
        let disabledTyp2 = this.disabledTyp2;
        let getPayDate = form.getPayDate;
        let businessType2s = "";
        if(this.businessType2s){ 
          businessType2s = this.businessType2s.toString();
        } 
        let businessType2 = this.form.businessType2;
        let storages = [];
        let outSstorages = [];
        let checkElem = this.checkElem;
        let checkCount = this.checkCount;
        if(!disabledTyp1){
          if(sourceGetAmount != "0.00" && sourceGetAmount != '0' && sourceGetAmount != ''){
            if(sourceGetId == "" || sourceGetName == ''){
              this.myAlert("实收收付方不能为空","dangerous-icon");
              return false;
            }
            if(sourceGetType == "" ||  sourceGetClose == ""){
              this.myAlert("实收方式不能为空","dangerous-icon");
              return false;
            }
            let flag = false;
            storageParams1.forEach(item => {
                if(item.select){
                    storages.push({paramId:item.id,paramValue:item.money});
                    flag = true;
                }
            })
            let count = 0;
            if(storages && storages.length != 0){
                storages.forEach(item => {
                    if(item.paramValue){
                        count += (item.paramValue)*1;
                    }
                })
            }
            if(!flag){
              this.myAlert("实收方式不能为空",'dangerous-icon');
              return false;
            }
            if(count != sourceGetAmount){
              this.myAlert("收方存出金额之和必须等于总金额！",'dangerous-icon');
              return false;
            }
          }
        }
        if(!disabledTyp2){
          if(targetPayAmount != "0.00" && targetPayAmount != '0' && targetPayAmount != ''){
            if(targetPayId == "" || targetPayName == '' ){
              this.myAlert("实付收付方不能为空","dangerous-icon");
              return false;
            }
            if( targetPayType == "" ||  targetPayClose == ""){
              this.myAlert("实付方式不能为空","dangerous-icon");
              return false;
            }
            let flag = false;
            storageParams2.forEach(item => {
                if(item.select){
                    outSstorages.push({paramId:item.id,paramValue:item.money});
                    flag = true;
                }
            })
            
            let count = 0;
            if(outSstorages && outSstorages.length != 0){
                outSstorages.forEach(item => {
                    if(item.paramValue){
                        count += (item.paramValue)*1;
                    }
                })
            }
            if(!flag){
                this.myAlert("实付方式不能为空",'dangerous-icon');
                return false;
            }
            if(count != targetPayAmount){
              this.myAlert("付方存出金额之和必须等于总金额！",'dangerous-icon');
              return false;
            }
          } 
        }
        
        
        if(checkElem){
           let sourceGetIdCheck = checkElem.sourceGet1;
           let sourceGetNameCheck = checkElem.sourceGetId2;
          _this.form.targetPayId = sourceGetId;
          _this.form.targetPayName = sourceGetName;
          if((targetPayId != sourceGetIdCheck) || (targetPayName != sourceGetNameCheck)){
             this.myAlert("所选择的被平账数据的收付方必须一致，请重新选择！",'dangerous-icon');
             return false;
          }
        }

        if(checkCount && targetPayAmount){
          if(targetPayAmount*1 > checkCount*1){
           
              this.myAlert("主平账数值不能大于所勾选被平账数据的未平账部分的绝对值总和!",'dangerous-icon');
              return false;
          }

        }
        
        if(!getPayDate){
          this.myAlert("收付日期不能为空！","dangerous-icon");
          return false;
        }
        if(managerId == ''){
          this.myAlert("财务人不能为空","dangerous-icon");
          return false;
        }
        if(storages.length != 0){
          storages = JSON.stringify(storages);
        }else{
          storages = "";
        }
        if(outSstorages.length != 0){
          outSstorages = JSON.stringify(outSstorages);
        }else{
          outSstorages = "";
        }  
        
        if(storages){
            form.sourceGetBank = storages;
        }
        if(outSstorages){
            form.targetPayBank = outSstorages;
        }
        if(businessType2s && businessType2s.indexOf(businessType2) != -1){
          _this.myConfirm("警告：业绩分成已结算，工资已封账，不能增加同项类【计业绩】的财务，", 'question-icon','是·','否','是否继续保存？','my-message').then(res => {
            form.isAchievement = 0;
            _this.checkFianceDataByContractId(form);
          }).catch(err => {
            
          })
          return false;
        }
        this.checkFianceDataByContractId(form);
      },
      //比较实收实付应收应付金额
      checkFianceDataByContractId(form){
        let _this = this;
        let businessType2 = _this.form.businessType2;
        let contractId = this.form.contractId;
        let isAchievement = this.form.isAchievement;
        let businessType1Params = _this.businessType1Params;
        let businessType1 = this.form.businessType1;
        let name = '';
       
        businessType1Params.forEach(item=>{
          if(item.id == businessType1){
            name = item.name;
            return false;
          }
        })

        if(name && (name.indexOf("X") == -1 &&  name.indexOf("x") == -1 )) {
          let formData = {businessType2:businessType2,contractId:contractId,isAchievement:isAchievement,};
          contractgetByBusinessType2(formData).then(function(response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let num1 = data.num1;
              let num2 = data.num2;
              let num3 = data.num3;
              let num4 = data.num4;
              let sourceGetAmount = _this.form.sourceGetAmount;
              let targetPayAmount = _this.form.targetPayAmount;
              if(num1){
                num1 = num1*1;
              }else{
                num1 = 0;
              }
              if(num2){
                num2 = num2*1;
              }else{
                num2 = 0;
              }
              if(num3){
                num3 = num3*1;
              }else{
                num3 = 0;
              }
              if(num4){
                num4 = num4*1;
              }else{
                num4 = 0;
              }
              if(sourceGetAmount){
                sourceGetAmount = sourceGetAmount*1;
              }else{
                sourceGetAmount = 0;
              }
              if(targetPayAmount){
                targetPayAmount = targetPayAmount*1;
              }else{
                targetPayAmount = 0;
              }
              if((num3 + sourceGetAmount) > (num1)){
                _this.myAlert("实收总金额不能大于应收总金额","dangerous-icon");  
                return false;
              }else if((num4+targetPayAmount) > (num2) || (num4+targetPayAmount)>(num3+sourceGetAmount)){
                _this.myAlert("实付总金额不能大于应付/实收总金额","dangerous-icon");  
                return false;
              }else{
                _this.clickSaveData(form);
              }
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.clickSaveData(form);
        }
        
      },  
      clickSaveData(form){
        let _this = this;
         this.$layer.loading({
          shade: true,//是否显示遮罩
        });  
        newContractFinance(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {

            _this.myAlert("数据保存成功！", 'success-icon').then(res => {
              _this.$parent.getShouldAndRealListData();
              _this.cancelData();
             
            }).catch(err => {
            })
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        })
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
        let currentDate = year +"-"+month +"-"+day;
        return currentDate;
      },
      
      cancelData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
      this.form.contractId = this.contractId;
      this.getFinanceParamData(this.businessType);
    },
    watch:{
      'form.sourceGetAmount':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.sourceGetAmount = undefined;
            return;
          }
          this.form.sourceGetAmount = oldval
        } else {
          this.form.sourceGetAmount = newval.replace(/^\./g, "")
        }
      },
      'form.targetPayAmount':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.targetPayAmount = undefined;
            return;
          }
          this.form.targetPayAmount = oldval
        } else {
          this.form.targetPayAmount = newval.replace(/^\./g, "")
        }
      },
      
    },
  }
</script>

<style lang="scss" scoped>
  .remark{
    padding:3px;
    border:1px solid #aaa;
    border-radius:5px;
    font-size:12px;
  }
  .move-content {
    padding:10px 0 10px 10px;
    .remark{
      border:1px solid #aaa;
      border-radius:3px;
      font-size:12px;
    }
    .padding-r-3{
      padding-right:3px;
    }
    .require-word:before{
      content: '*';
      color: #F56C6C;
      margin-right: 1px;
    }
    .word{
      line-height:27px;
    }
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
  .arrow-icon{
    background:url(../../../images/qiet.png) -208px -226px;
    width:25px;
    height:25px;
    display:block;
    cursor:pointer;
  }
  .account-icon{
    background:url(../../../images/icon.png) -33px -190px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
  .beAccount-icon{
    background:url(../../../images/icon.png) -58px -194px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
  .title-des-word{
    color:#a6a9ac;
    display:inline-block;

  }
  .select-check{
    line-height:23px;
  }
  .disabled-input{
      cursor:not-allowed;
      background:#E6E6E6;
  }
</style>
