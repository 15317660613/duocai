<template>
  <div class="books" >
    <div class="pop-up" style="height: 442px;padding-left:0px;">
      <div class="pop-up-container clear" >
        <el-form ref="formsData" :model="formData" >
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
              <div class="cut-line" style="width: 600px;margin:15px 0 0 0px;padding-bottom:5px;">
                <span  class="wfsize" style="margin-left: 30px">项目</span>
                <span  class="wfsize" style="margin-left: 30px">底薪单价</span>
                <span  class="wfsize" style="margin-left: 248px">备注</span>
              </div>
              <div style="width: 600px;margin-top: 5px;margin-left: 0px">
                <div class='clear' v-for="(elem ,index) in form" >
                  <div class="left" style="padding:0 20px 0 30px;" >
                    <span style="line-height:28px;display:inline-block;" >{{elem.projectName}}</span>
                  </div>
                  <div class="left clear" style="width:130px;height:27px;" >
                    <div class="left" v-if="elem.projectName == '请假' || elem.projectName == '旷工' ||  elem.projectName == '缺卡'  " >
                      <el-form-item   >
                        <el-input   v-show="elem.type==1"  v-model="elem.autoValue" maxlength="13" title="上限10位数"  :disabled="true" style="width: 76px;color: #88898c"></el-input>
                        </el-form-item>
                    </div>
                    <div class="left" >
                      <el-form-item >
                        <el-input  :disabled="closeAccountDisabled"  v-show="elem.type==2" @input="nuem(elem)" v-model="elem.value" maxlength="13" title="上限10位数" style="width: 76px;"></el-input>
                      </el-form-item>
                    </div>
                    <div class="left" v-if="elem.projectName == '请假' || elem.projectName == '旷工' ||  elem.projectName == '缺卡'  " >
                      <el-form-item >
                        <el-select  :disabled="closeAccountDisabled" v-model="elem.type"  style="width:53px;height: 22px;">
                          <el-option v-for="item in choos"  :label="item.value" :value="item.id"  ></el-option>
                        </el-select>
                        </el-form-item> 
                    </div>  
                  </div>    
                   <div class="left" style="padding-left:10px;" >
                      <el-form-item >
                        <el-input :disabled="closeAccountDisabled" maxlength="100" v-model="elem.remark" title="上限100个字" style="width: 384px"></el-input>
                      </el-form-item>
                   </div> 
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
  import {accountad,accountUser,insetatt,insetuseratt} from '../../../service/jobData'
  export default {
    name: 'bookthree',
    props:["acnut"],
    data(){
      return{
        staffOrUserType:0,
        closeAccountDisabled:false,//封账标识
        jobname:'',
        userList:[],
        acccountData:"",
        userTimeId:"",
        fristpid:"",
        jobname:"",
        staffTimeId:"",
        thistruevalue:'',
        choos:[
          {
            id:1,
            value:"自动"
          },{
            id:2,
            value:"手动"
          }
        ],
        formData:{

        },
        form:[
          {
            id:'',
            staffTimeId:'',
            projectName:'请假',
            autoValue:'',
            type:1,
            value:'',
            remark:'',   
          },
          {
            id:'',
            staffTimeId:'',
            projectName:'旷工',
            autoValue:'',
            type:1,
            value:'',
            remark:'',   
          },
          {
            id:'',
            staffTimeId:'',
            projectName:'缺卡',
            autoValue:'',
            type:1,
            value:'',
            remark:'',   
          },
          {
            id:'',
            staffTimeId:'',
            projectName:'时次',
            autoValue:'',
            type:2,
            value:'',
            remark:'',   
          },
          
          {
            id:'',
            staffTimeId:'',
            projectName:'早退',
            autoValue:'',
            type:2,
            value:'',
            remark:'',   
          },
          {
            id:'',
            staffTimeId:'',
            projectName:'迟到',
            autoValue:'',
            type:2,
            value:'',
            remark:'',   
          }
        ],
        initForm:[
          {
            id:'',
            staffTimeId:'',
            projectName:'请假',
            autoValue:'',
            type:1,
            value:'',
            remark:'',   
          },
          {
            id:'',
            staffTimeId:'',
            projectName:'旷工',
            autoValue:'',
            type:1,
            value:'',
            remark:'',   
          },
          {
            id:'',
            staffTimeId:'',
            projectName:'缺卡',
            autoValue:'',
            type:1,
            value:'',
            remark:'',   
          },
          {
            id:'',
            staffTimeId:'',
            projectName:'时次',
            autoValue:'',
            type:2,
            value:'',
            remark:'',   
          },
          
          {
            id:'',
            staffTimeId:'',
            projectName:'早退',
            autoValue:'',
            type:2,
            value:'',
            remark:'',   
          },
          {
            id:'',
            staffTimeId:'',
            projectName:'迟到',
            autoValue:'',
            type:2,
            value:'',
            remark:'',   
          }
        ],
      }
    },
    
    methods:{
      //初始化
      intitbook(acccountData){
        let _this=this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        this.staffOrUserType=0
        this.acccountData=acccountData
        this.jobname=acccountData.name
        this.staffTimeId=acccountData.staffTimeId
        let staffTimeId=acccountData.staffTimeId;

        accountad(staffTimeId).then(function (response) {
           _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            debugger;
            let attendance=response.data.attendance;
            try{
              let isClosingAccounts = attendance[0].isClosingAccounts;
              if(isClosingAccounts && isClosingAccounts != '0'){
                _this.closeAccountDisabled = true;
              }else{
                  _this.closeAccountDisabled = false;
              }
            }catch(e){

            }  
             let autoValue = response.data.autoValue;
              if(attendance && attendance.length != 0){
                _this.form = attendance;
              }else{
                _this.form = JSON.parse(JSON.stringify(_this.initForm));
              }
              _this.form.forEach(function(item){
                item.autoValue = autoValue;
              })
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
                _this.userList=arr;
              }
              let myselfform = {
                updateBy:attendance[0].updateBy,
                updateTime:attendance[0].updateTime,
              };
              _this.$emit('operationlogfunc',myselfform);
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
         
          
        })

      },
       //职位人员切换
      changesStaffOrUser(){
        let staffOrUserType=this.staffOrUserType;
        if(staffOrUserType==0){
          this.staffOrUserType=1
          this.clickGetUserData(this.userTimeId)
        }else if(staffOrUserType==1){
          this.staffOrUserType=0
          this.intitbook(this.acccountData)
        }
      },
      //....
      clickGetUserData(id){
        let _this=this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let parr=this.userList;
        for(var i=0;parr.length>i;i++){
          if(id==parr[i].id){
            parr[i].chose1=false;
            parr[i].chose2=true;
          }else{
            parr[i].chose1=true;
            parr[i].chose2=false
          }
        }
        this.userList=parr;
        this.userTimeId=id;
        accountUser(id).then(function (response) {
           _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let autoValue = response.data.autoValue;
             let attendance=response.data.attendance;
             try{
              let isClosingAccounts = attendance[0].isClosingAccounts;
              if(isClosingAccounts && isClosingAccounts != '0'){
                _this.closeAccountDisabled = true;
              }else{
                  _this.closeAccountDisabled = false;
              }
             }catch(e){

             }  
            if(attendance && attendance.length != 0){
              _this.form = attendance;
            }else{
                _this.form = JSON.parse(JSON.stringify(_this.initForm));
              }
             _this.form.forEach(function(item){
              item.autoValue = autoValue;
            })
             let myselfform = {
              updateBy:attendance[0].updateBy,
              updateTime:attendance[0].updateTime,
            };
            _this.$emit('operationlogfunc',myselfform);
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      //校验
      nuem(elem){
          elem.value = elem.value.replace(/[^\.\d]/g,'');
          var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
          if (!reg.test(elem.value)) {
            if (elem.value == undefined||elem.value == '') {
              elem.value = '';
              return;
            }
            elem.value = this.thistruevalue;
          } else {
            this.thistruevalue = elem.value;
          }
       },
       
     //保存
      saveFormData(){
        let _this=this;
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        debugger;
        let staffOrUserType = this.staffOrUserType;
        if(this.staffOrUserType==0){
          let staffTimeId=this.staffTimeId;
          form.forEach(function(item){
            item.staffTimeId = staffTimeId;
          })
          let data = JSON.stringify(form);
          insetatt(data).then(function (response) {
              _this.$layer.closeAll("loading");
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                 _this.myAlert("数据保存成功",'success-icon').then(res => {
                   _this.intitbook(_this.acccountData);
                }).catch(err => {

                })
              } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message+"！");
              }
          })
        }else{
          let userTimeId=this.userTimeId;
          form.forEach(function(item){
            item.userTimeId = userTimeId;
          })
          let data = JSON.stringify(form);
          insetuseratt(data).then(function (response) {
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
  .rjs{
    background:url(../../../images/qiet.png) -9px -234px;
    width:25px;
    height:25px;
    display:inline-block;
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
