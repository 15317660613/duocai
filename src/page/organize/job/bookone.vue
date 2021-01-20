<template>
  <div class="books" >
    <div class="pop-up" style="height: 442px;padding-left:0px;">
      <div class="pop-up-container clear" >
        <el-form ref="formsData" :model="form" >
         <div class="clear ">
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
           <div class="border-box left"  style="width: 625px;height: 425px;border-radius:3px;margin-top: 3px;">
             <div class="cut-line" style="width: 600px;margin:15px 0 0px 0px;padding-bottom:5px;">
               <span class="wfsize" style="margin-left: 50px">应出勤天数</span>
               <span  class="wfsize" style="margin-left: 32px">项目</span>
               <span  class="wfsize" style="margin-left: 30px">单价</span>
               <span  class="wfsize" style="margin-left: 248px">备注</span>
             </div>
             <div style="width: 600px;margin-top: 15px;margin-left: 18px">
               <el-form-item class="left" label="" style="width: 100px;margin-left: 20px">
                 <el-select :disabled="closeAccountDisabled" v-model="form.days" style="width: 83px;height: 22px;">
                   <el-option v-for="item in ondates" :id="item.id" :label="item.value" :value="item.value" ></el-option>
                 </el-select>
               </el-form-item>
               <el-form-item class="left" label="底薪" style="width:160px;" >
                 <el-input :disabled="closeAccountDisabled" v-model="form.count" @input="checkNum" title="上限10位数" maxlength="13" @change="nums" style="width: 96px"></el-input>
                
                 
               </el-form-item>
               <el-form-item class="left" prop="isSalary" >
                  <input :disabled="closeAccountDisabled" type="checkbox" v-model="form.isSalary"  value="1" />
                </el-form-item>
               <span class="left" style="display:inline-block;line-height:25px;padding-right:20px;" >计算为工资</span>
               
               <el-form-item class="left"  prop="remark" style="width: 200px;">
                 <el-input :disabled="closeAccountDisabled" v-model="form.remark" title="上限100个字" maxlength="100" style="width: 196px"></el-input>
               </el-form-item>
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
  import {accountsd,usersd,savejob,savepe} from '../../../service/jobData'

  export default {
    name: 'bookone',
    props:["acnut"],
    data(){
      return{
        staffOrUserType:0,
        accountData:"",
        jobname:"",
        staffTimeId:"",
        userTimeId:"",
        ondates:[],
        treeData:[],
        userList:[],
        closeAccountDisabled:false,//封账标识
        form:{
          id:'',
          days:'',
          count:'',
          type:'底薪',
          isSalary:0,
          remark:'',
          isClosingAccounts:0,
        },
        initForm:{
          id:'',
          days:'',
          count:'',
          type:'底薪',
          isSalary:0,
          remark:'',
          isClosingAccounts:0,
        },

      }
    },
    
     methods:{
       checkNum(){
         this.form.count = this.form.count.replace(/[^\.\d]/g,'');
       },
      //初始
       intitbook(accountData){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        this.accountData=accountData;
        this.jobname=accountData.name
        this.staffTimeId=accountData.staffTimeId;
        
        this.staffOrUserType=0
        let arr=[]
        for(var i=0;32>i;i++){
           arr.push({
             id:i,
             value:i
           })
        }
        this.ondates=arr
        let staffTimeId=accountData.staffTimeId;
        accountsd(staffTimeId).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
           let salary = response.data.salary;
           try{
            let isClosingAccounts = salary.isClosingAccounts;
            
            if(isClosingAccounts && isClosingAccounts != '0'){
              _this.closeAccountDisabled = true;
            }else{
              _this.closeAccountDisabled = false;
            }
           }catch(e){
             
           } 
           if(salary){
              for(let attr in salary){
                if(salary[attr] == null ){
                  salary[attr]  = "";
                }
              }
              _this.form =  salary; 
              let myselfform = {
                updateBy:salary.updateBy,
                updateTime:salary.updateTime,
              };
              _this.$emit('operationlogfunc',myselfform);
           }else{
             _this.form = JSON.parse(JSON.stringify(_this.initForm));
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
       //切换人员职位
       changesStaffOrUser(){
         this.closeAccountDisabled = false;
         let staffOrUserType=this.staffOrUserType;
         if(staffOrUserType==0){
           this.staffOrUserType=1
           this.clickGetUserData(this.userTimeId)
         }else if(staffOrUserType==1){
           this.staffOrUserType=0
           this.intitbook(this.accountData);
         }
         
       },
       //点击人员
       clickGetUserData(item){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
         let parr=this.userList
         for(var i=0;parr.length>i;i++){
           if(item==parr[i].id){
             parr[i].chose1=false;
             parr[i].chose2=true;
           }else{
             parr[i].chose1=true;
             parr[i].chose2=false
           }
         }
         this.userList=parr;
         this.userTimeId=item
        
         let userTimeId=this.userTimeId
         usersd(userTimeId).then(function (response) {
           _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let salary = response.data.salary;
              try{
                let isClosingAccounts = salary.isClosingAccounts;
                if(isClosingAccounts && isClosingAccounts != '0'){
                  _this.closeAccountDisabled = true;
                }else{
                  _this.closeAccountDisabled = false;
                }
              }catch(e){

              }
              
              if(salary){
                  for(let attr in salary){
                    if(salary[attr] == null ){
                      salary[attr]  = "";
                    }
                  }
                  _this.form =  salary; 
                  let myselfform = {
                    updateBy:salary.updateBy,
                    updateTime:salary.updateTime,
                  };
                  _this.$emit('operationlogfunc',myselfform);
              }else{
                _this.form = JSON.parse(JSON.stringify(_this.initForm));
              }
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
         })
       },
       //校验
       nums(){
         if(this.form.prices != ''){
           this.form.prices= this.form.prices.replace(/[^\.\d]/g,'');
         }
         
       },
      //保存
       saveFormData(){
        let _this =  this;
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = form.id;
        let type = form.type;
        let count = form.count;
        let days = form.days;
        let remark = form.remark;
        let isSalary = form.isSalary;
        if(isSalary){
          isSalary = 1;
        }else{
          isSalary = 0;
        }
        let staffOrUserType = this.staffOrUserType; 
        if(staffOrUserType==0){
          let staffTimeId=this.staffTimeId;
          savejob(id,type,count,days,isSalary,remark, staffTimeId).then(function (response) {
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
            let userTimeId=this.userTimeId
            savepe(id,type,count,days,isSalary,remark, userTimeId).then(function (response) {
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
      'form.count':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.count = undefined;
            return;
          }
          this.form.count = oldval
        } else {
          this.form.count = newval.replace(/^\./g, "")
        }
      },
    },

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
