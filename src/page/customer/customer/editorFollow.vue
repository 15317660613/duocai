<template>
  <div style="width:100%;padding:0 10px;" >
    <div class="pop-up">
      <div class="pop-up-container " style="height: 257px;">
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
                    <el-form-item  prop="townId" >
                      <el-select @change="getProceType" v-model="form.processWayId"  style="width:115px;" >
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
                      <el-select v-model="form.departId" @change="findUserByDepart"  style="width:235px;" >
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
                      <el-select v-model="form.empId"  style="width:115px;" >
                        <el-option v-for="item in userList"   :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" v-show="form.type == '带看'" >
                  <div class="left padding-r-3" >
                    <span class="word require-word"  >看房房源</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="house" >
                      <el-input disabled  v-model="form.house" title="(房源编号 地址 面积)" style="width:330px;" ></el-input>

                    </el-form-item>
                  </div>
                  <div class="left" >
                    <i class="link-house-icon" @click="clickCheckHouse" ></i>
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
                  <div class="left" style="padding-top:5px;" >
                    <el-form-item   prop="remark" >

                      <textarea
                        v-if="paste"
                        onpaste="return false;"
                        onselectstart="return false;"
                        ondrag="return false;"
                        type="textarea"
                        style="width:348px;height:130px;resize: none;"
                        maxLength="1000"
                        title="上限1000个字"
                        class="remark"
                        v-model="form.remark"
                        v-html="form.remark"
                      ></textarea>
                      <textarea
                        v-else
                        type="textarea"
                        style="width:348px;height:130px;resize: none;"
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
      <div slot="footer" class="dialog-footer clear" style="padding: 3px 0px;">
        <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
      </div>
    </div>
    <div>
      <CheckHousePage @setCheckData="setCheckData" :checkHouseValue="checkHouse" ref="showCheckHouse"></CheckHousePage>
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

  import {followParam} from "../../../service/houseData";
  import {modifyFollow,editorFollow} from '../../../service/customerData'
  import {findUserByDepartId} from "../../../service/organizeDate";

  import CheckHousePage from './checkHouse'
  export default {
    props:["editorShowFollowValue",'mycustomerId','myname','myid',"mypaste",'layerid'],
    data() {
      return {
        dialogEditorFollow:this.editorShowFollowValue,
        checkHouse:false,
        initForm:null,
        processWayIdParams:[],
        departTree:[],
        userList:[],
        time:'',
        houseName:'',
        customerName:'',
        paste:false,
        form:{
          type:'',
          houseId:'',
          customerId:'',
          house:'',
          processWayId:'',
          departId:'',
          empId:'',
          remark:'',
          house:'',
          businessType:'',
          deleted:0,
          createBy:'',
          createTime:'',
          updateBy:'',
          updateTime:'',
        },
      };
    },
    components:{
      CheckHousePage,
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
      showFollowVisible(customerId,customerName,id,paste){
        this.form.customerId = customerId;
        this.customerName = customerName;
        if(paste == 'true'){
          this.paste =  true;
        }
        
        if(id){
          this.getFollowData(id);
        }
        
      },
      clickCheckHouse(){
        this.$refs.showCheckHouse.dialogShow(this.form.customerId,this.form.houseId);
      },

       setCheckData(id,name,rentData){
        this.form.houseId = id;
        this.form.house = name;
        let roomType = rentData.roomType;
        let customerType = this.customerType;
        if(customerType == 2 || customerType == 3){
          this.form.businessType = 1;
        }else if(customerType == 1){
          this.form.businessType = 2;
        }
      },
     
      getFollowData(id){
        let _this = this;
        editorFollow(id).then(function(response) {
          if (response.status == 500) {
            return false;
          }else if (response.status == 0) {
            let params = response.data.params;
            let processWayIdParams = params.processWayIdParams;
            let departTree = params.departTree;

            _this.processWayIdParams = processWayIdParams;
            if(params.departTree) {
              let arr = [];
              let treeData = params.departTree
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  state:treeData[i].state
                })
              }
              _this.departTree = arr;
            }
            let users = response.data.users;
            if(users && users.length != 0){
              let arr = [];
              users.forEach(function(item){
                if(item.doBusiness == 1 ) {
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                }
              })
              let arrUser = [{id:0,name:' '}].concat(arr);
              _this.userList = arrUser;
            }
            let processing = response.data.processing;
            for(let attr in processing){
              if(processing[attr] == null){
                processing[attr] = "";
              }
            }
            
            _this.form = processing;
            _this.initForm = JSON.parse(JSON.stringify(processing));
             _this.form.businessType = processing.businessType*1;
            let type = ''
            _this.processWayIdParams.forEach(function(item){
              if(item.id == _this.form.processWayId){
                type = item.name;
              }
            })
            _this.form.type = type;
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
              let arr = [{id:'0',name:' '}];
              if(user && user.length != 0){
                user.forEach(function(item){
                  if(item.doBusiness == 1 ) {
                    let obj = {
                      id: item.id,
                      name: item.name,
                      stateUser:0,
                    }
                    if(item.paramName == '正式离职'){
                      obj.stateUser  = 1;
                    }
                    arr.push(obj);
                  }   
                })
              }
              _this.userList =  arr;
              _this.form.empId = '0';
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      saveData(){
        let _this =  this;
        let form = JSON.parse(JSON.stringify(_this.form));
        let remark = form.remark;
        let processWayId = form.processWayId;
        let empId = form.empId;
        let type =form.type;
        let houseId = form.houseId;
        let initForm = this.initForm;
        if(processWayId == ''){
          this.myAlert("时间方式不能为空！",'dangerous-icon');
          return false;
        }
        if(empId == '' || empId == '0'){
          this.myAlert("跟进人员不能为空！",'dangerous-icon');
          return false;
        }
        if(type == '带看' && houseId == ''){
          this.myAlert("看房房源不能为空！",'dangerous-icon');
          return false;
        }
        if(!remark){
          this.myAlert("跟进内容不能为空！",'dangerous-icon');
          return false;
        }
        let updateForm = _this.$utils.checkObjDataDifferent(form,initForm);
        modifyFollow(updateForm).then(function(response){
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
      this.showFollowVisible(this.mycustomerId,this.myname,this.myid,this.mypaste);
    }
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
  .link-house-icon{
    background:url(../../../images/icon.png) -339px -143px;
    width:25px;
    height:32px;
    display:block;
    cursor:pointer;
  }
</style>
