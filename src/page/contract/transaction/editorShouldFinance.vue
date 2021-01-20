<template>
  <div class="" style="width:100%;padding:0 10px;" >
     <div class="pop-up" style="margin-bottom: 10px;">
        <div class="pop-up-container " >
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:0px;" >
                <div class="clear" style="position:relative;top:5px;" >
                  <div class="left" style="padding-left:85px;" >
                    <span class="title-des-word" >业类</span>
                  </div>
                  <div class="left" style="padding-left:107px;" >
                    <span class="title-des-word" >收方【来源】</span>
                  </div>
                  <div class="left" style="padding-left:5px;" >
                    <span class="title-des-word" >应收金额</span>
                  </div>
                  <div class="left" style="padding-left:45px;" >
                    <span class="title-des-word" >应付金额</span>
                  </div>
                  <div class="left" style="padding-left:12px;" >
                    <span class="title-des-word" >付方【来源】</span>
                  </div>

                </div>
                <div class="clear" >
                  <div class="left padding-r-3" >
                    <span class="word require-word" >应收应付</span>
                  </div>

                  <div class="left">
                    <el-form-item  prop="businessType1" >
                      <el-select :disabled="true"  v-model="form.businessType1"  placeholder="" style="width:80px;" >
                        <el-option v-for="item in businessType1Params"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left">
                    <el-form-item  prop="businessType1" >
                      <el-select :disabled="finishDisabled || salaryAndFinanceDisabled" v-model="form.businessType2"  placeholder="" style="width:80px;" >
                        <el-option v-for="item in businessType2Params"  :label="item.rname" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left">
                    <el-form-item  prop="sourceGetId" >
                      <el-select :disabled="finishDisabled  || salaryAndFinanceDisabled"  v-model="form.sourceGetId"  placeholder="" style="width:65px;" >
                        <el-option v-for="item in sourceGetIdParams1"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                  <div class="left text-input">
                    <el-form-item  prop="sourceGetAmount" >
                      <el-input :disabled="finishDisabled  || salaryAndFinanceDisabled" @input="checkNum1" title="上限10位数" maxlength="13" v-model="form.sourceGetAmount" style="width:70px;" ></el-input>

                    </el-form-item>
                  </div>
                  <div class="left" >
                    <i class="arrow-icon" ></i>
                  </div>
                  <div class="left text-input">
                    <el-form-item  prop="targetPayAmount" >
                      <el-input :disabled="finishDisabled  || salaryAndFinanceDisabled" @input="checkNum2" title="上限10位数" maxlength="13"  v-model="form.targetPayAmount"  style="width:70px;" ></el-input>

                    </el-form-item>
                  </div>
                  <div class="left">
                    <el-form-item  prop="targetPayId" >
                      <el-select :disabled="finishDisabled  || salaryAndFinanceDisabled"  v-model="form.targetPayId"  placeholder="" style="width:65px;" >
                        <el-option v-for="item in sourceGetIdParams2"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div  >
                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="text-align:right;" >
                    <span class="word require-word" >收付日期</span>
                  </div>

                  <div class="left " style="" >
                    <el-form-item   prop="getPayDate" >
                      <el-date-picker :disabled="finishDisabled  || salaryAndFinanceDisabled" size="mini" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.getPayDate" style="width: 92px;"></el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="width:42px;text-align:right;" >
                    <span class="word " >备注</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="remark" >
                      <el-input :disabled="finishDisabled  || salaryAndFinanceDisabled"  v-model="form.remark" title="上限50个字，数字/字母/汉字" maxlength="50" style="width:320px;" ></el-input>

                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-2" style="padding:0px 5px 0 15px;" >
                    <el-form-item prop="isAchievement"  >
                      <el-checkbox
                        :disabled="finishDisabled  || salaryAndFinanceDisabled"  
                        v-model="form.isAchievement"
                        class="left"
                        :false-label="0" :true-label="1"
                      ></el-checkbox>
                    </el-form-item>

                  </div>
                  <div class="left padding-r-2">
                    <span class="" style="line-height:28px;">计业绩</span>
                  </div>
                </div>  
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <div v-if="salaryAndFinanceDisabled" class="left close-word" >
            此财务关联的同项类业绩分成已结算，工资已封账，不允许修改！
          </div>  
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span v-if="!salaryAndFinanceDisabled && !finishDisabled" class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
          <span v-else  class="right save-cancel-disabled-btn" type="primary"  >保 存</span>
        </div>
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

  import {financeParams,editorContractFinance,modifyContractFinance,contractgetByBusinessType2} from "../../../service/contractSpecial";
  import {departperson} from "../../../service/organizeDate";

  import CheckHousePage from './checkHouse'
  export default {
    props:["contractId", "businessType","id","finishDisabled","layerid"],
    data() {
      return {
        dialogNewFollow:this.editorShowShoudFinanceValue,
        salaryAndFinanceDisabled:false,
        titlename:'',
        processWayIdParams:[],
        sourceGetIdParams1:[],
        sourceGetIdParams2:[],
        businessType1Params:[],
        businessType2Params:[],
        businessType2s:[],
        sourceGetAmount:'0.00',
        targetPayAmount:'0.00',

        form:{
          id:'',
          contractId:'',
          businessType1:'',
          businessType2:'',
          sourceGetId:'',
          sourceGetClose:'1',
          targetPayClose:'1',
          sourceGetAmount:'0.00',
          targetPayAmount:'0.00',
          targetPayId:'',
          getPayDate:'',
          isAchievement:1,
          remark:'',
          createBy:'',
          createTime:'',
          updateBy:'',
          updateTime:'',
        },
      };
    },

    methods:{
      checkNum1(){
        this.form.sourceGetAmount= this.form.sourceGetAmount.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.targetPayAmount= this.form.targetPayAmount.replace(/[^\.\d]/g,'');
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
        this.businessType2Params = [{id:'',name:' ',rname:' '}].concat(arr);
        this.businessType2 = '';
      },
      getFinanceParamData(id){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        })
        let form = {id:id,};
        editorContractFinance(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;

            let sourceGetIdParams = params.sourceGetIdParams;
            let businessType1Params = params.businessType1Params;
           _this.businessType2s = response.data.businessType2s;
            if(sourceGetIdParams && sourceGetIdParams.length != 0){
              _this.sourceGetIdParams1 = sourceGetIdParams;
              _this.sourceGetIdParams2 = [].concat(sourceGetIdParams);
            }
            businessType1Params.forEach(item =>{
              let remark = item.remark;
              if(remark != null){
                item.name = item.name + remark;
              }
                
            })
            _this.businessType1Params = businessType1Params;
            let financeData = response.data.finance;
            if(financeData){
              for(let attr in financeData){
                if(financeData[attr] != null){
                  _this.form[attr] = financeData[attr];
                }
              }
            }

            _this.sourceGetAmount = _this.form.sourceGetAmount;
            _this.targetPayAmount = _this.form.targetPayAmount;

            let isAchievement = _this.form.isAchievement;
            if(isAchievement != '0'){
              _this.form.isAchievement = 1;
            }else{
              _this.form.isAchievement = 0;
            }
            _this.form.createBy = response.data.finance.createBy;
            _this.form.createTime = response.data.finance.createTime;
            _this.form.updateBy = response.data.finance.updateBy;
            _this.form.updateTime = response.data.finance.updateTime;
            let salaryCloseFlag = financeData.salaryCloseFlag;
            let isClosingAccounts = financeData.isClosingAccounts; 
            //收支工资已封账，禁止修改
           
            if(salaryCloseFlag == 1 && isClosingAccounts == '1'){
              _this.salaryAndFinanceDisabled = true;
            }
            _this.changBusiness();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      
      saveData(){
        let _this = this;
        
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        let sourceGetId = form.sourceGetId;
        let businessType2 = form.businessType2;
        let sourceGetAmount = form.sourceGetAmount;
        let targetPayAmount = form.targetPayAmount;
        let targetPayId = form.targetPayId;
        let getPayDate = form.getPayDate;
        let businessType2s = "";
        if(this.businessType2s){ 
          businessType2s = this.businessType2s.toString();
        } 
        if(businessType2 == ''){
          this.myAlert("业类不能为空！","dangerous-icon");
          return false;
        }
        if(targetPayAmount == "" || targetPayAmount == "0.00" || targetPayAmount == "0"  ){
          if(sourceGetAmount == "" || sourceGetAmount == "0.00" || sourceGetAmount == "0"   ){
            this.myAlert("应收金额不能为空！","dangerous-icon");
            return false;
          }  
        }
        if((sourceGetAmount == "" || sourceGetAmount == "0.00" || sourceGetAmount == "0"  )){
          if(targetPayAmount == '0.00' || targetPayAmount == '0' || targetPayAmount == ''){
            this.myAlert("应付金额不能为空！","dangerous-icon");
            return false;
          }
        }

        if(!getPayDate){
          this.myAlert("收付日期不能为空！","dangerous-icon");
          return false;
        }
        if(businessType2s && businessType2s.indexOf(businessType2) != -1){
          _this.myConfirm("警告：业绩分成已结算，工资已封账，不能增加同项类【计业绩】的财务，", 'question-icon','是·','否','是否继续保存？','my-message').then(res => {
            form.isAchievement = 0;
            _this.checkFianceDataByContractId(form);
          }).catch(err => {
            
          })
          return false;
        }
         _this.checkFianceDataByContractId(form);
      },
      //比较实收实付应收应付金额
      checkFianceDataByContractId(form){
        let _this = this;
        let businessType2 = _this.form.businessType2;
        let contractId = this.form.contractId;
        let isAchievement = this.form.isAchievement;
        let financeId = this.form.id;
        let formData = {businessType2:businessType2,contractId:contractId,isAchievement:isAchievement,financeId:financeId};
        contractgetByBusinessType2(formData).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let num1 = data.num1;
            let num2 = data.num2;
            let sourceGetAmount = _this.form.sourceGetAmount;
            let targetPayAmount = _this.form.targetPayAmount;
            
            if(num1){
              num1 = num1*1;
            }else{
              num1 = 0;
            }
            if(num2){
              num2 = num2*1
            }else{
              num2 = 0;
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
            if((num1+sourceGetAmount) < (num2+targetPayAmount)){
              _this.myAlert("应付总金额不能大于应收总金额","dangerous-icon");  
              return false;
            }else{
              _this.clickSaveData(form);
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },  
      clickSaveData(form){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        modifyContractFinance(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
             debugger;
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
      this.form.id = this.id;
      this.getFinanceParamData(this.id);
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
    color:#000080;
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
    color:#000080;
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
    color:#000080;
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
    color:#000080;
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
    color:#000080;
  }
  .arrow-icon{
    background:url(../../../images/qiet.png) -208px -226px;
    width:25px;
    height:25px;
    display:block;
    cursor:pointer;
  }
  .title-des-word{
    color:#a6a9ac;
    display:inline-block;

  }
</style>
