<template>
  <div class="books" >
    <div class="pop-up" style="height: 442px;padding-left:0px;">
      <div class="pop-up-container clear" >
        <el-form ref="formsDatas" :rules="rules" :model="form" >
          <div class="clear "style="width: 747px;">
            <div class="left clear" style="width:120px">
             <div class="clear backss " style="width:120px;height:27px;">
               <span class="left" style="display:inline-block;width:95px;padding-left:20px;height:27px;line-height:30px;text-align:center;">{{jobname}}</span>
               <i class="left tie-icon" @click="changesStaffOrUser"  style="margin-left: 2px;margin-top: 8px">
               </i>
             </div>
             <div v-show="staffOrUserType==1" :class="{backss:item.chose1,backss2:item.chose2}"  v-for="item in userList" @click="clickGetUserData(item.id)" class="left  " style="cursor:pointer;">
               <span style="display:inline-block;width:120px;padding-left:30px;height:27px;line-height:30px;">{{item.name}}</span>
             </div>
            </div>
            <div class="border-box"  style="width: 625px;height: 425px;float: right;border-radius:3px;margin-top: 3px;">
              <div class="cut-line clear" style="margin:15px 0 0 30px;padding-bottom:5px;">
                <span class="wfsize left" style="margin-left: 10px;width: 100%">保险比例设置</span>
                  <el-form-item class="left" label="缴存基数" prop="state" style="width: 260px;margin-left: 30px;margin-top:10px">
                    <el-input  :disabled="closeAccountDisabled" v-model="form.insuranceBaseNum" title="上限10位数" maxlength="13" @input="numn(1)" style="width: 96px"></el-input>
                    <span>元</span>
                  </el-form-item>
                  <el-form-item class="left" label="大额门诊" prop="state" style="width: 260px;margin-top:10px">
                    <el-input  :disabled="closeAccountDisabled" v-model="form.largeOutpatientNum" title="上限10位数" maxlength="13" @input="numn(2)" style="width: 96px"></el-input>
                    <span>元</span>
                  </el-form-item>
                  <div style="width: 100%">
                    <span class="left" style="width: 51px;margin-top:16px;margin-left: 33px">生育险</span>
                    <el-form-item class="left" label="公司" prop="state" style="width:180px;margin-left: 0px;margin-top:10px">
                      <el-input  :disabled="closeAccountDisabled"  v-model="form.percentageCom_1" @input="calculate(1)" style="width: 50px;color: #88898c"></el-input>
                      <span>%</span>
                      <el-input  :disabled="true" v-model="form.priceCom_1" clos  style="width: 50px"></el-input>
                      <span>元</span>
                    </el-form-item>
                    <el-form-item class="left" label="个人" prop="state" style="width:220px;margin-left:50px;margin-top:10px">
                      <el-input  :disabled="closeAccountDisabled" v-model="form.percentagePer_1"   @input="calculate(2)" style="width: 50px;color: #88898c"></el-input>
                      <span>%</span>
                      <el-input  v-model="form.pricePer_1" :disabled="true" style="width: 50px"></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                  <div style="width: 100%">
                    <span class="left" style="width: 51px;margin-top:16px;margin-left:33px">工伤险</span>
                    <el-form-item class="left" label="公司" prop="state" style="width:180px;margin-left: 0px;margin-top:10px">
                      <el-input  :disabled="closeAccountDisabled" v-model="form.percentageCom_2" @input="calculate(3)" style="width: 50px;color: #88898c"></el-input>
                      <span>%</span>
                      <el-input   v-model="form.priceCom_2"  :disabled="true"  style="width: 50px"></el-input>
                      <span>元</span>
                    </el-form-item>
                    <el-form-item class="left" label="个人" prop="state" style="width:220px;margin-left:50px;margin-top:10px">
                      <el-input  :disabled="closeAccountDisabled" v-model="form.percentagePer_2" @input="calculate(4)"  style="width: 50px;color: #88898c"></el-input>
                      <span>%</span>
                      <el-input v-model="form.pricePer_2"  :disabled="true" style="width: 50px"></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                  <div style="width: 100%">
                    <span class="left" style="width: 51px;margin-top:16px;margin-left: 33px">养老险</span>
                    <el-form-item class="left" label="公司" prop="state" style="width:180px;margin-left: 0px;margin-top:10px">
                      <el-input  :disabled="closeAccountDisabled" v-model="form.percentageCom_3" @input="calculate(5)"  style="width: 50px;color: #88898c"></el-input>
                      <span>%</span>
                      <el-input   v-model="form.priceCom_3" :disabled="true"  style="width: 50px"></el-input>
                      <span>元</span>
                    </el-form-item>
                    <el-form-item class="left" label="个人" prop="state" style="width:220px;margin-left:50px;margin-top:10px">
                      <el-input  :disabled="closeAccountDisabled"  v-model="form.percentagePer_3" @input="calculate(6)"  style="width: 50px;color: #88898c"></el-input>
                      <span>%</span>
                      <el-input   v-model="form.pricePer_3" :disabled="true"   style="width: 50px"></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                  <div style="width: 100%">
                    <span class="left" style="width: 51px;margin-top:16px;margin-left: 33px">失业险</span>
                    <el-form-item class="left" label="公司" prop="state" style="width:180px;margin-left: 0px;margin-top:10px">
                      <el-input  :disabled="closeAccountDisabled" v-model="form.percentageCom_4" @input="calculate(7)"  style="width: 50px;color: #88898c"></el-input>
                      <span>%</span>
                      <el-input  v-model="form.priceCom_4" :disabled="true"  style="width: 50px"></el-input>
                      <span>元</span>
                    </el-form-item>
                    <el-form-item class="left" label="个人" prop="state" style="width:220px;margin-left:50px;margin-top:10px">
                      <el-input  :disabled="closeAccountDisabled"  v-model="form.percentagePer_4"  @input="calculate(8)"  style="width: 50px;color: #88898c"></el-input>
                      <span>%</span>
                      <el-input   v-model="form.pricePer_4" :disabled="true"  style="width: 50px"></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                  <div style="width: 100%">
                  <span class="left" style="width: 51px;margin-top:16px;margin-left: 33px">医疗险</span>
                  <el-form-item class="left" label="公司" prop="state" style="width:180px;margin-left: 0px;margin-top:10px">
                    <el-input  :disabled="closeAccountDisabled" v-model="form.percentageCom_5" @input="calculate(9)" style="width: 50px;color: #88898c"></el-input>
                    <span>%</span>
                    <el-input   v-model="form.priceCom_5" :disabled="true"  style="width: 50px"></el-input>
                    <span>元</span>
                  </el-form-item>
                  <el-form-item class="left" label="个人" prop="state" style="width:220px;margin-left:50px;margin-top:10px">
                    <el-input  :disabled="closeAccountDisabled"  v-model="form.percentagePer_5"  @input="calculate(10)" style="width: 50px;color: #88898c"></el-input>
                    <span>%</span>
                    <el-input  v-model="form.pricePer_5" :disabled="true"  style="width: 50px"></el-input>
                    <span>元</span>
                  </el-form-item>
                </div>

              </div>
              <div class="left " style="margin-left: 30px;height:115px;width: 90%;">
                <span class="wfsize left" style="margin-left: 10px;width: 100%;margin-top: 10px">公积金比例设置</span>
                <el-form-item class="left" label="缴存基数" prop="state" style="width: 100%;margin-left: 30px;margin-top:10px">
                  <el-input  :disabled="closeAccountDisabled" v-model="form.fundBaseNum" title="上限10位数" maxlength="13" @input="numn(10)" style="width: 96px"></el-input>
                  <span>元</span>
                </el-form-item>
                <div style="width: 100%">
                  <el-form-item class="left" label="公司" prop="state" style="width:180px;margin-left: 84px;margin-top:10px">
                    <el-input  :disabled="closeAccountDisabled"  v-model="form.percentageCom_6" @input="calculate(11)"  style="width: 50px;color: #88898c"></el-input>
                    <span>%</span>
                    <el-input  v-model="form.priceCom_6" :disabled="true"  style="width: 50px"></el-input>
                    <span>元</span>
                  </el-form-item>
                  <el-form-item class="left" label="个人" prop="state" style="width:220px;margin-left:50px;margin-top:10px">
                    <el-input :disabled="closeAccountDisabled" v-model="form.percentagePer_6"  @input="calculate(12)" style="width: 50px;color: #88898c"></el-input>
                    <span>%</span>
                    <el-input  v-model="form.pricePer_6"  :disabled="true"  style="width: 50px"></el-input>
                    <span>元</span>
                  </el-form-item>
                </div>
              </div>
            </div>

          </div>
        </el-form>
      </div>
    </div>
   <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
      <span class="right save-cancel-btn" style="margin-right:0px;"  @click="cancelData">取 消</span>
      <span class="right save-cancel-btn"  type="primary" @click="saveFormData" >保 存</span>
    </div>
    
  </div>
</template>

<script>
  import {accountid,xianj,savexianj,savexianp} from '../../../service/jobData'
  export default {
    name: 'booktwo',
    props:["acnut"],
    data(){
      return{
        closeAccountDisabled:false,//封账标识
        jobname:'',
        staffOrUserType:0,
        id:"",
        accountData:"",
        jobname:"",
        staffTimeId:"",
        userList:[],
        userTimeId:"",
        firstUserId:"",
        form:{
          percentageCom_1:"",
          percentagePer_1:"",
          priceCom_1:"",
          pricePer_1:"",
          percentageCom_2:"",
          percentagePer_2:"",
          priceCom_2:"",
          pricePer_2:"",
          percentageCom_3:"",
          percentagePer_3:"",
          priceCom_3:"",
          pricePer_3:"",
          percentageCom_4:"",
          percentagePer_4:"",
          priceCom_4:"",
          pricePer_4:"",
          percentageCom_5:"",
          percentagePer_5:"",
          priceCom_5:"",
          pricePer_5:"",
          percentageCom_6:"",
          percentagePer_6:"",
          priceCom_6:"",
          pricePer_6:"",
          insuranceBaseNum:"",
          largeOutpatientNum:"",
          fundBaseNum:"",
          type_1:"",
          type_2:"",
          type_3:"",
          type_4:"",
          type_5:"",
          type_6:"",
          id_1:"",
          id_2:"",
          id_3:"",
          id_4:"",
          id_5:"",
          id_6:"",
        },
        rules:{


        }
      }
    },
   
    methods:{
      //初始数据
      intitbook(accountData){
        let _this=this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        this.staffOrUserType=0
        this.accountData=accountData
        this.jobname=accountData.name
        this.staffTimeId=accountData.staffTimeId
        
        let staffTimeId=accountData.staffTimeId
        accountid(staffTimeId).then(function (response) {
           _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let insurance = response.data.insurance;
            try{
              let isClosingAccounts = insurance.isClosingAccounts;
              if(isClosingAccounts && isClosingAccounts != '0'){
                _this.closeAccountDisabled = true;
              }else{
                  _this.closeAccountDisabled = false;
              }
            }catch(e){

            }  
            if(insurance!=null){
              if(insurance.id){
                _this.id = insurance.id;
              }
              for(let attr in insurance){
                if(insurance[attr] == null || insurance[attr] == 'null' ){
                  insurance[attr] = "";
                }
                _this.form[attr] = insurance[attr]
              }
              // _this.form = insurance;
             let myselfform = {
                updateBy:insurance.updateBy,
                updateTime:insurance.updateTime,
              };
              _this.$emit('operationlogfunc',myselfform);
            }
            let arr=[]
            let users=response.data.users
            if(users && users.length != 0){
              for(var i=0;users.length>i;i++){
                arr.push({
                  id:users[i].id,
                  name:users[i].name,
                  uId:users[i].uId,
                  chose1:true,
                  chose2:false,
                })
              }
              _this.userTimeId = arr[0].id;
              _this.userList=arr
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
          
          
        })
      },
          //计算百分比
      calculate(i){
          let cals=""
          let iban=this.form.fundBaseNum;
          let ibun=this.form.insuranceBaseNum;
          
          if(i == 1){
            this.form.percentageCom_1=this.form.percentageCom_1.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentageCom_1;
            if(ibun!=null&&ibun!=0){
              this.form.priceCom_1=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 2){
            this.form.percentagePer_1=this.form.percentagePer_1.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentagePer_1;
            if(ibun!=null&&ibun!=0){
             this.form.pricePer_1=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 3){
            this.form.percentageCom_2=this.form.percentageCom_2.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentageCom_2;
            if(ibun!=null&&ibun!=0){
              this.form.priceCom_2=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 4){
            this.form.percentagePer_2=this.form.percentagePer_2.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentagePer_2;
            if(ibun!=null&&ibun!=0){
             this.form.pricePer_2=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 5){
            this.form.percentageCom_3=this.form.percentageCom_3.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentageCom_3;
            if(ibun!=null&&ibun!=0){
              this.form.priceCom_3=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 6){
            this.form.percentagePer_3=this.form.percentagePer_3.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentagePer_3;
            if(ibun!=null&&ibun!=0){
             this.form.pricePer_3=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 7){
            this.form.percentageCom_4=this.form.percentageCom_4.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentageCom_4;
            if(ibun!=null&&ibun!=0){
              this.form.priceCom_4=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 8){
            this.form.percentagePer_4=this.form.percentagePer_4.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentagePer_4;
            if(ibun!=null&&ibun!=0){
             this.form.pricePer_4=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 9){
            this.form.percentageCom_5=this.form.percentageCom_5.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentageCom_5;
            if(ibun!=null&&ibun!=0){
              this.form.priceCom_5=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 10){
            this.form.percentagePer_5=this.form.percentagePer_5.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentagePer_5;
            if(ibun!=null&&ibun!=0){
             this.form.pricePer_5=cals*(ibun/100).toFixed(2);
            }
          }else if(i == 11){
            let publicI = this.form.fundBaseNum;
            this.form.percentageCom_6=this.form.percentageCom_6.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentageCom_6;
            if(ibun!=null&&ibun!=0){
              this.form.priceCom_6=cals*(publicI/100).toFixed(2);
            }
          }else if(i == 12){
            let publicI = this.form.fundBaseNum;
            this.form.percentagePer_6=this.form.percentagePer_6.toString().replace(/[^\.\d]/g,'');
            cals=this.form.percentagePer_6;
            if(ibun!=null&&ibun!=0){
             this.form.pricePer_6=cals*(publicI/100).toFixed(2);
            }
          }
          

        },
      //校验
      numn(i){
        if(i==1){
          let percentageCom_1 = this.form.percentageCom_1;
          let priceCom_1 = this.form.priceCom_1;
          let percentagePer_1 = this.form.percentagePer_1;
          let pricePer_1 = this.form.pricePer_1;

          let percentageCom_2 = this.form.percentageCom_2;
          let priceCom_2 = this.form.priceCom_2;
          let percentagePer_2 = this.form.percentagePer_2;
          let pricePer_2 = this.form.pricePer_2;

          let percentageCom_3 = this.form.percentageCom_3;
          let priceCom_3 = this.form.priceCom_3;
          let percentagePer_3 = this.form.percentagePer_3;
          let pricePer_3 = this.form.pricePer_3;

          let percentageCom_4 = this.form.percentageCom_4;
          let priceCom_4 = this.form.priceCom_4;
          let percentagePer_4 = this.form.percentagePer_4;
          let pricePer_4 = this.form.pricePer_4;

          let percentageCom_5 = this.form.percentageCom_5;
          let priceCom_5 = this.form.priceCom_5;
          let percentagePer_5 = this.form.percentagePer_5;
          let pricePer_5 = this.form.pricePer_5;
         
          this.form.insuranceBaseNum=this.form.insuranceBaseNum.toString().replace(/[^\.\d]/g,'');
          let insuranceBaseNum = this.form.insuranceBaseNum;
          if(insuranceBaseNum && percentageCom_1){
            this.form.priceCom_1 = ((insuranceBaseNum)*(percentageCom_1*1)/100).toFixed(2)
          }
          if(insuranceBaseNum && percentagePer_1){
            this.form.pricePer_1 = ((insuranceBaseNum)*(percentagePer_1*1)/100).toFixed(2)
          }

          if(insuranceBaseNum && percentageCom_2){
            this.form.priceCom_2 = ((insuranceBaseNum)*(percentageCom_2*1)/100).toFixed(2)
          }
          if(insuranceBaseNum && percentagePer_2){
            this.form.pricePer_2 = ((insuranceBaseNum)*(percentagePer_2*1)/100).toFixed(2)
          }

          if(insuranceBaseNum && percentageCom_3){
            this.form.priceCom_3 = ((insuranceBaseNum)*(percentageCom_3*1)/100).toFixed(2)
          }
          if(insuranceBaseNum && percentagePer_3){
            this.form.pricePer_3 = ((insuranceBaseNum)*(percentagePer_3*1)/100).toFixed(2)
          }

          if(insuranceBaseNum && percentageCom_4){
            this.form.priceCom_4 = ((insuranceBaseNum)*(percentageCom_4*1)/100).toFixed(2)
          }
          if(insuranceBaseNum && percentagePer_4){
            this.form.pricePer_4 = ((insuranceBaseNum)*(percentagePer_4*1)/100).toFixed(2)
          }

          if(insuranceBaseNum && percentageCom_5){
            this.form.priceCom_5 = ((insuranceBaseNum)*(percentageCom_5*1)/100).toFixed(2)
          }
          if(insuranceBaseNum && percentagePer_5){
            this.form.pricePer_5 = ((insuranceBaseNum)*(percentagePer_5*1)/100).toFixed(2)
          }

          
        }
         if(i==2){
           this.form.largeOutpatientNum=this.form.largeOutpatientNum.toString().replace(/[^\.\d]/g,'');
         }
         if(i==10){
           this.form.fundBaseNum=this.form.fundBaseNum.toString().replace(/[^\.\d]/g,'');
           let fundBaseNum = this.form.fundBaseNum;
           let percentageCom_6 = this.form.percentageCom_6;
           let priceCom_6 = this.form.priceCom_6;
           let percentagePer_6 = this.form.percentagePer_6;
           let pricePer_6 = this.form.pricePer_6;

           if(fundBaseNum && percentageCom_6){
            this.form.priceCom_6 = ((fundBaseNum)*(percentageCom_6*1)/100).toFixed(2)
          }
          if(fundBaseNum && percentagePer_6){
            this.form.pricePer_6 = ((fundBaseNum)*(percentagePer_6*1)/100).toFixed(2)
          }
         }


      },
      changesStaffOrUser(){
        let staffOrUserType=this.staffOrUserType;
        if(staffOrUserType==0){
          this.staffOrUserType=1
          this.clickGetUserData(this.userTimeId)
        }else if(staffOrUserType==1){
          this.staffOrUserType=0
          this.intitbook(this.accountData)
        }
      },
      //点击人员
      clickGetUserData(id){
         let _this=this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let parr=this.userList
        for(var i=0;parr.length>i;i++){
          if(id==parr[i].id){
            parr[i].chose1=false;
            parr[i].chose2=true;
          }else{
            parr[i].chose1=true;
            parr[i].chose2=false
          }
        }
        this.userList=parr
        this.userTimeId=id
       
        let ids=this.userTimeId;
        xianj(ids).then(function (response) {
           _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let insurance = response.data.insurance;
            try{
              let isClosingAccounts = insurance.isClosingAccounts;
              if(isClosingAccounts && isClosingAccounts != '0'){
                _this.closeAccountDisabled = true;
              }else{
                  _this.closeAccountDisabled = false;
              }
            }catch(e){
              
            }  
            if(insurance!=null){
              if(insurance.id){
                _this.id = insurance.id;
              }
              _this.form = insurance;

              let myselfform = {
                updateBy:insurance.updateBy,
                updateTime:insurance.updateTime,
              };
              _this.$emit('operationlogfunc',myselfform);
            }else{

            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
          
        })
      },
      //保存
      saveFormData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let staffOrUserType=this.staffOrUserType;
        if(staffOrUserType==0){
          let staffTimeId=this.staffTimeId;
           form.staffTimeId = staffTimeId;
          savexianj(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              _this.myAlert("数据保存成功",'success-icon').then(res => {
                _this.intitbook(_this.accountData);
              }).catch(err => {

              })
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }else if(staffOrUserType==1){
          let userTimeId=this.userTimeId;
          form.userTimeId = userTimeId;
          savexianp(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              _this.myAlert("数据保存成功",'success-icon').then(res => {
                 _this.clickGetUserData(_this.userTimeId);
              }).catch(err => {

              })
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })

        }

      },
      cancelData(){
         this.$emit("cancelData");
      }
    },
    watch:{
      'form.insuranceBaseNum':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.insuranceBaseNum = undefined;
            return;
          }
          this.form.insuranceBaseNum = oldval
        } else {
          this.form.insuranceBaseNum = newval.replace(/^\./g, "")
        }
      },
      'form.largeOutpatientNum':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.largeOutpatientNum = undefined;
            return;
          }
          this.form.largeOutpatientNum = oldval
        } else {
          this.form.largeOutpatientNum = newval.replace(/^\./g, "")
        }
      },
      'form.fundBaseNum':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.fundBaseNum = undefined;
            return;
          }
          this.form.fundBaseNum = oldval
        } else {
          this.form.fundBaseNum = newval.replace(/^\./g, "")
        }
      },
      
    }
  }
</script>

<style lang="scss" scoped>
  .wfsize{
    font-family: '微软雅黑 Bold', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    color: #333333;
  }
  .rjs{
    background:url(../../../images/qiet.png) -9px -234px;
    width:25px;
    height:25px;
    display:inline-block;
  }
  .backs{
    color: dodgerblue;
  }
  
  .backss2{
    background:url(../../../images/xuanzhong.png) 5px 2px no-repeat;
    width:120px;
    height:27px;
    display:inline-block;
    right: 15px;
    float: left;
  }
  .backss{
    background:url(../../../images/weixuanzhong.png) 9px 2px no-repeat;
    width:120px;
    height:27px;
    display:inline-block;
    margin-left: 2px;
    background-color: #DCD9D3;
  }
  /deep/ .el-tabs--border-card{
    box-shadow:0;
  }
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .input-l-word{
    display:inline-block;
    line-height:28px;
    padding-right:5px;
  }
  .width-60{
    width:55px;
  }
  .width-110{
    width:110px;
  }
  .books .pop-up{
    padding-bottom:0 !important;
    .pop-up-container{
      border-width:0px;
    }
  }

  .select{
    width:100px;
  }
  .books-name{
    width:495px;
  }
  .mearsure-unit{
    line-height:25px;
    color:#606266;
    font-size:12px;
    padding-left:5px;
  }
  .icon-user{
    line-height:25px;
    padding-left:5px;
  }
  .remark{
    margin-top:5px;
    width:495px;
  }
  .select-item {
    margin-left: 0px;
  }
  .books-icon{
    background:url(../../../images/system/tupian.png) -15px -15px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .user-icon{
    background:url(../../../images/system/wuyezhu.png) -15px -15px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }
  .padding-t-5{
    padding-top:5px;

  }
  .padding-t-b-5{
    padding:5px 0;
  }
  .left-word{
    height: 14px;
    width: 78px;
    text-align: right;
    line-height: 14px;
  }
  .rigth-word{
    font-size:12px;
  }
  .check-radio{
    padding: 0 5px 0 11px;
  }
  .special-word{

    color:#999;
  }
  .color1{
    color:#336699;
    font-size:12px;
  }
  .color2{
    color:#999999;
    font-size:12px;
  }
  .rules{
    /deep/ .el-form-item__content{
      line-height:18px !important;
    }
    /deep/ .el-radio__input.is-checked+.el-radio__label {
      color: #333;
      font-size:12px;
      padding:0;
    }
    /deep/ .el-radio__label {
      font-size: 12px;
      padding:0;
    }
  }
  /deep/ .el-textarea__inner{
    padding:5px;
    font-size:12px;
    border:1px solid #aaa;
  }
</style>
