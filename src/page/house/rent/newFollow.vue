<template>
  <div style="width:100%;padding:0 10px;">
      <div class="pop-up" style="width:100%;padding:10px 10px 0;height: 300px;" >
        <div class="pop-up-container " style="margin: 0px;height: 256px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:0px;" >
                <div class="clear" >
                  <div class="left padding-r-3" >
                    <span class="word require-word" >时间方式</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="createTime" >
                      <el-input disabled v-model="form.createTime" title="(系统时间)" style="width:235px;" ></el-input>

                    </el-form-item>
                  </div>
                  <div class="left">
                    <el-form-item  prop="processWayId" >
                      <el-select @change="getProceType" v-model="form.processWayId"    style="width:115px;" >
                        <el-option v-for="item in processWayIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

                <div class="clear" >
                  <div class="left padding-r-3" >
                    <span class="word require-word"  >跟进员工</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="departId" >
                      <el-select v-model="form.departId" @change="findUserByDepart"    style="width:235px;" >
                        <el-option v-for="item in departTree"   :label="item.name" :value="item.id" >
                          <span  :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left">
                    <el-form-item  prop="empId" >
                      <el-select v-model="form.empId"   style="width:115px;" >
                        <el-option v-for="item in userList"   :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"  >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" v-show="form.type == '带看'" >
                  <div class="left padding-r-3" >
                    <span class="word require-word"  >看房客源</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="customerName" >
                      <el-input disabled  v-model="form.customerName" title="(客户名称)" style="width:330px;" ></el-input>

                    </el-form-item>
                  </div>
                  <div class="left" >
                    <i class="link-customer-icon" @click="clickCheckHouse" ></i>
                  </div>
                </div>
                <div class="clear" v-show="form.type == '带看'" >
                    <div class="clear left" style="padding-left:57px;" >
                      <div class="left"  >
                        <el-radio  v-model="form.businessType" :label="1">&nbsp;</el-radio>
                      </div>
                      <div class="left" style="margin-left:-10px;" > 
                        按B类买卖业务带看统计
                      </div>
                    </div>
                    <div class="clear left" style="padding-left:58px;" >
                      <div class="left"  >
                        <el-radio  v-model="form.businessType" :label="2">&nbsp;</el-radio>
                      </div>
                      <div class="left"  style="margin-left:-10px;" > 
                        按C类买卖业务带看统计
                      </div>
                    </div>
                </div>  
                <div class="clear" >
                  <div class="left padding-r-3" >
                    <span class="word require-word"  >跟进内容</span>
                  </div>
                  <div class="left" style="padding-top:3px;" >
                    <el-form-item   prop="remark" >

                      <textarea
                        v-if="paste"
                        onpaste="return false;"
                        onselectstart="return false;"
                        ondrag="return false;"
                        type="textarea"
                        :rows="8"
                        style="width:348px;height: 130px;resize: none;"
                        maxLength="1000"
                        title="上限1000个字"
                        class="remark"
                        v-model="form.remark"
                        v-html="form.remark"
                      ></textarea>
                      <textarea
                        v-else
                        type="textarea"
                        :rows="8"
                        style="width:348px;height: 130px;resize: none;"
                        maxLength="1000"
                        title="上限1000个字"
                        class="remark"
                        v-model="form.remark"
                        v-html="form.remark"
                      ></textarea>
                    </el-form-item>
                  </div>

                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear" style="margin-top: 3px;">
          <span class="right save-cancel-btn" @click="clearFormData" style="margin: 0px;">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
      <div>
        <CheckCustomerPage @setCheckData="setCheckData" :checkHouseValue="checkHouse" ref="showCheckHouse"></CheckCustomerPage>
      </div>

  </div>
</template>
<script>

  import {followParam,newFollow} from "../../../service/houseData";
   import {findUserByDepartId} from "../../../service/organizeDate";
  import CheckCustomerPage from './checkCustomer'
  export default {
    props:["newShowFollowValue","thisid","thishouseName","thisnum","thispaste","layerid","roomType"],
    data() {
      return {
        checkHouse:false,
        processWayIdParams:[],
        departTree:[],
        userList:[],
        time:'',
        houseName:'',
        num:'',
        paste:false,
        form:{
          type:'',
          houseId:'',
          customerId:'',
          customerName:'',
          processWayId:'',
          departId:'',
          businessType:'',
          empId:'',
          remark:'',
          deleted:0,
          createBy:'aa',
          createTime:'',
        },
      };
    },
    components:{
      CheckCustomerPage,
    },
    methods:{
      getProceType(value){
        let _this = this;
        let type = ''
        _this.processWayIdParams.forEach(function(item){
          if(item.id == value){
            type = item.name;
          }
        })
        _this.form.type = type;
      },
      showFollowVisible(){
        this.form.houseId = this.thisid;
        this.houseName = this.thishouseName;
        if(this.thispaste == 'true'){
          this.paste =  true;
        }
        if(this.thisnum){
            this.num = this.thisnum*1;
        }
        this.getFollowParamData();
      },
      clickCheckHouse(){
        let customerId = this.form.customerId;
        this.$refs.showCheckHouse.dialogShow(customerId);
      },
      setCheckData(id,name,customerData){
        this.form.customerId = id;
        this.form.customerName = name;
        let customerType = customerData.customerType;
        let roomType = this.roomType;
        if(roomType == 1 || roomType == 3){
          this.form.businessType = 1;
        }else if(roomType == 2){
          this.form.businessType = 2;
        }
      },
      getFollowParamData(){
        let _this = this;
        followParam().then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let processWayIdParams = data.processWayIdParams;
            let departTree = data.departTree;
            _this.form.createTime = _this.curentTime();
            _this.processWayIdParams = processWayIdParams;
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

              _this.departTree = arr;
            }

            try {
              let defaultUserId = data.defaultUserId;
              let defaultDepartId = data.defaultDepartId;
              let defaultUserList = data.defaultUserList;
              if(defaultDepartId != -1){
                _this.userList = defaultUserList;
                _this.form.empId = defaultUserId;
                _this.form.departId = defaultDepartId;
              }
              
            }catch(e){

            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      findUserByDepart(value){
        let _this = this;
        let id = value;
        if(id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'0',name:" ",}];
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
              _this.form.empId = "";
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      curentTime(){
          var now = new Date();

          var year = now.getFullYear();       //年
          var month = now.getMonth() + 1;     //月
          var day = now.getDate();            //日

          var hh = now.getHours();            //时
          var mm = now.getMinutes();          //分
          var ss = now.getSeconds();
          var clock = year+"-";
          if(month < 10)
            clock += "0";
          clock += month + "-";
          if(day < 10)
            clock += "0";
          clock += day + " ";
          if(hh < 10)
            clock += "0";
          clock += hh + ":";
          if (mm < 10) clock += '0';
          clock += mm + ":";
          if (ss < 10) clock += '0';
          clock += ss;

          return clock;
      },
      saveData(){
        let _this =  this;
        let form = _this.form;
        let remark = form.remark;
        let processWayId = form.processWayId;
        let empId = form.empId;
        let type =form.type;
        let customerId = form.customerId;
        if(processWayId == ''){
          this.myAlert("时间方式为空",'dangerous-icon');
          return false;
        }
        if(empId == '' || empId == '0'){
          this.myAlert("跟进人员为空",'dangerous-icon');
          return false;
        }
        if(type == '带看' && customerId == ''){
          this.myAlert("看房客源为空",'dangerous-icon');
          return false;
        }
        if(!remark){
          this.myAlert("跟进内容为空",'dangerous-icon');
          return false;
        }else{
            if(remark.length < this.num*1){
              this.myAlert("写跟进至少"+this.num+"个字",'dangerous-icon');
              return false;
            }
        }

        newFollow(form).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功",'success-icon').then(res => {
              _this.clearFormData();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      clearFormData(){
        this.$parent.getFollowList();
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
      this.showFollowVisible();
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
  .link-customer-icon{
    background:url(../../../images/icon.png) -366px -140px;
    width:25px;
    height:32px;
    display:block;
    cursor:pointer;
  }
</style>
