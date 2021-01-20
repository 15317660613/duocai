<template>
  <div class="" style="width:100%;padding:0 10px;" >
    <div class="pop-up" >
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
                <div class="left" style="padding-left:0px;" >
                  <span class="title-des-word" >应收金额(元)</span>
                </div>
                <div class="left" style="padding-left:18px;" >
                  <span class="title-des-word" >应付金额(元)</span>
                </div>
                <div class="left" style="padding-left:2px;" >
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
                    <el-select  v-model="form.businessType2"  placeholder="" style="width:80px;" >
                      <el-option v-for="item in businessType2Params"  :label="item.rname" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div  >
                <div class="left">
                  <el-form-item  prop="sourceGetId" >
                    <el-select  v-model="form.sourceGetId"  placeholder="" style="width:65px;" >
                      <el-option v-for="item in sourceGetIdParams1"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div  >
                <div class="left text-input">
                  <el-form-item  prop="sourceGetAmount" >
                    <el-input @input="checkNum1" title="上限10位数" maxlength="13" v-model="form.sourceGetAmount" style="width:70px;" ></el-input>

                  </el-form-item>
                </div>
                <div class="left" >
                  <i class="arrow-icon" ></i>
                </div>
                <div class="left text-input">
                  <el-form-item  prop="targetPayAmount" >
                    <el-input @input="checkNum2" title="上限10位数" maxlength="13" v-model="form.targetPayAmount"  style="width:70px;" ></el-input>

                  </el-form-item>
                </div>
                <div class="left">
                  <el-form-item  prop="targetPayId" >
                    <el-select  v-model="form.targetPayId"  placeholder="" style="width:65px;" >
                      <el-option v-for="item in sourceGetIdParams2"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div  >
              </div>
              <div class="clear" >
                <div class="left padding-r-3" style="text-align:right;" >
                  <span class="word  require-word" >收付日期</span>
                </div>

                <div class="left " style="" >
                  <el-form-item  prop="getPayDate" >
                    <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.getPayDate" style="width: 92px;"></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-r-3" style="width:42px;text-align:right;" >
                  <span class="word " >备注</span>
                </div>
                <div class="left">
                  <el-form-item  prop="remark" >
                    <el-input  v-model="form.remark" title="上限50个字，数字/字母/汉字" maxlength="50" style="width:320px;" ></el-input>

                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
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
              </div>  
            </div>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer clear" style="padding: 5px 0px;">
      
        <span class="right save-cancel-btn" @click="cancelData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
      </div>
    </div>
  </div>
</template>
<script>

  import {financeParams,newContractFinance,contractgetByBusinessType2} from "../../../service/contractSpecial";
  import {departperson} from "../../../service/organizeDate";
  import {findChildParams} from "../../../service/getData";



  export default {
    props:["contractId","businessType","layerid"],
    data() {
      return {
        dialogNewFollow:this.newShowShoudFinanceValue,
        processWayIdParams:[],
        sourceGetIdParams1:[],
        sourceGetIdParams2:[],
        businessType1Params:[],
        businessType2Params:[
          {
            id:'',
            name:' ',
          },
          
        ],
        businessType2s:[],
        form:{
          id:'',
          contractId:'',
          businessType1:'',
          businessType2:'',
          sourceGetId:'',
          sourceGetAmount:'0.00',
          targetPayAmount:'0.00',
          targetPayId:'',
          getPayDate:'',
          isAchievement:1,
          remark:'',
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
        let arr = [{id:'',name:' ',rname:' '}];
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
        this.form.businessType2 = arr[0].id;
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
            _this.businessType2s = data.businessType2s;
            if(sourceGetIdParams && sourceGetIdParams.length != 0){
             
              _this.sourceGetIdParams1 = sourceGetIdParams;
              _this.sourceGetIdParams2 = sourceGetIdParams;
              _this.form.sourceGetId = sourceGetIdParams[0].id;
              _this.form.targetPayId = sourceGetIdParams[0].id;
            }
            
            businessType1Params.forEach(item =>{
              let remark = item.remark;
              if(remark != null){
                item.name = item.name + remark;
              }
                
            })
            _this.businessType1Params = businessType1Params;
            _this.form.getPayDate = _this.getCurrentDate();
            _this.form.businessType1 = businessType;
            _this.changBusiness();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      getChildrenParamsList(){
        let _this = this;
        let id = _this.form.businessType1;
        findChildParams(id).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      
      saveData(){
        let _this = this;
        
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        let businessType2 = form.businessType2;
        let sourceGetId = form.sourceGetId;
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
        let formData = {businessType2:businessType2,contractId:contractId,isAchievement:isAchievement,};
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
              num2 = num2*1;
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
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        newContractFinance(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功！", 'success-icon').then(res => {
              debugger;
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
