<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'合同跟进 【'+contractName+'】'" width="500px" @close="clearFormData" :visible.sync="dialogEditorFollow" :append-to-body='true' >
      <div class="pop-up" style="margin-bottom: 10px;">
        <div class="pop-up-container " style="height: 252px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:1px 0 0;" >

                <div class="clear" >
                  <div class="left padding-r-3">
                    <span class="word require-word"  >跟进员工</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="departId" >
                      <el-select :disabled="finishDisabled" v-model="form.departId" @change="findUserByDepart"  placeholder="" style="width:155px;" >
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
                      <el-select  :disabled="finishDisabled" v-model="form.empId" placeholder="" style="width:100px;" >
                        <el-option v-for="item in userList"   :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

                <div class="clear" style="padding-bottom:10px;" >
                  <div class="left padding-r-3">
                    <span class="word require-word"  >跟进内容</span>
                  </div>
                  <div class="left" style="padding-top:2px;" >
                    <el-form-item   prop="remark" >
                      <textarea
                        :disabled="finishDisabled"
                        type="textarea"
                        style="width:350px;height:130px;"
                        maxLength="1000"
                        title="上限1000个字"
                        class="remark"
                        v-model="form.remark">
                      </textarea>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogEditorFollow = false">取 消</span>
          <span v-if="!finishDisabled" class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
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
    </el-dialog>

  </div>
</template>
<script>

  import {editorFollow,modifyFollow} from "../../../service/contractSpecial";

  import {findUserByDepartId} from "../../../service/organizeDate";
  export default {
    props:["editorShowFollowValue"],
    data() {
      return {
        dialogEditorFollow:this.editorShowFollowValue,
        checkHouse:false,
        departTree:[],
        userList:[],
        time:'',
        contractName:'',
        num:'',
        finishDisabled:false,
        form:{
          id:'',
          contractId:'',
          departId:'',
          empId:'',
          remark:'',
          deleted:0,
          createBy:'aa',
          createTime:'',
          updateBy:'',
          updateTime:'',
        },
      };
    },
    components:{
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
      showFollowVisible(contractId,id,contractName,num,finishDisabled){
        this.dialogEditorFollow = true;
        this.form.contractId = contractId;
        this.contractName = contractName;
        this.finishDisabled = finishDisabled;
        debugger;
        if(num){
          this.num = num*1;
        }
        this.getFollowData(id);
      },
      clickCheckHouse(){
        let customerId = this.form.customerId;
        this.$refs.showCheckHouse.dialogShow(customerId);
      },
      setCheckData(id,name){
        this.form.customerId = id;
        this.form.customer = name;
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
              let arr = [{id:0,name:' '}];
              users.forEach(function(item){
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
              _this.userList = arr;
            }
            let processing = response.data.processing;
            _this.form = processing;
            let remark = processing.remark;
            _this.form.remark = remark.replace(/<br\/>/g,"\n")

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
              let arr = [{id:0,name:' '}];
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
              _this.userList =  arr;
              _this.form.empId = "";
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
        let customerId = form.customerId;
        if(processWayId == ''){
          this.myAlert("时间方式不能为空",'dangerous-icon');
          return false;
        }
        if(empId == '' || empId == '0'){
          this.myAlert("跟进人员不能为空",'dangerous-icon');
          return false;
        }
        if(type == '带看' && customerId == ''){
          this.myAlert("看房客源不能为空",'dangerous-icon');
          return false;
        }
        if(!remark){
          this.myAlert("跟进内容不能为空",'dangerous-icon');
          return false;
        }else{
          if(remark.length < this.num*1){
            this.myAlert("写跟进至少"+this.num+"个字",'dangerous-icon');
            return false;
          }
        }

        form.remark = form.remark.replace(/\n/g,"<br/>")
        modifyFollow(form).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功",'success-icon').then(res => {
              _this.clickSaveCallback();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      clickSaveCallback(){
        this.clearFormData();
      },
      clearFormData(){
        this.dialogEditorFollow = false;
        this.$refs.formsData.resetFields();
        this.$emit("getFollowList");
      },
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
  .link-customer-icon{
    background:url(../../../images/icon.png) -366px -140px;
    width:25px;
    height:32px;
    display:block;
    cursor:pointer;
  }
  .record-word {
    font-size: 12px;
    color: #a6a9ac;
    display: inline-block;
    padding-right: 2px;
  }
</style>
