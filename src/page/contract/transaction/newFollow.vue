<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'合同跟进 【'+contractName+'】'" width="500px" @close="clearFormData" :visible.sync="dialogNewFollow" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 262px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:1px 0 0;" >

                <div class="clear" >
                  <div class="left padding-r-3">
                    <span class="word require-word"  >跟进员工</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="departId" >
                      <el-select v-model="form.departId" @change="findUserByDepart"  placeholder="" style="width:155px;" >
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
                      <el-select v-model="form.empId" placeholder="" style="width:100px;" >
                        <el-option v-for="item in userList"   :label="item.name" :value="item.id" >
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
          <span class="right save-cancel-btn" @click="dialogNewFollow = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>


  import {followParam} from "../../../service/houseData";
  import {newFollow} from "../../../service/contractSpecial";
  import {findUserByDepartId} from "../../../service/organizeDate";
  export default {
    props:["newShowFollowValue"],
    data() {
      return {
        dialogNewFollow:this.newShowFollowValue,
        checkHouse:false,

        departTree:[],
        userList:[],
        time:'',
        contractName:'',
        num:'',
        form:{
          id:'',
          contractId:'',
          departId:'',
          empId:'',
          remark:'',
          deleted:0,
          createBy:'aa',
          createTime:'',
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
      showFollowVisible(id,contractName){
        this.dialogNewFollow = true;
        this.form.contractId = id;
        this.contractName = contractName;
        this.getFollowParamData();
      },
      clickCheckHouse(){
        let customerId = this.form.customerId;
        this.$refs.showCheckHouse.dialogShow(customerId);
      },
      setCheckData(id,name){
        this.form.customerId = id;
        this.form.customerName = name;
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

            _this.processWayIdParams = processWayIdParams;

            if(data.departTree){
              let arr = [];
              let treeData = data.departTree
              for(let i = 0 ; i < treeData.length; i++){
                arr.push({
                  id:treeData[i].id,
                  name:treeData[i].label.replace(/&nbsp;/g,""),
                  level:treeData[i].level,
                  state:treeData[i].state,
                })
              }
              _this.departTree = arr;
              try {
                let defaultUserId = data.defaultUserId;
                let defaultDeptId = data.defaultDepartId;
                let defaultUserList = data.defaultUserList;
                if(defaultDeptId != -1){
                  _this.userList = defaultUserList;
                  _this.form.empId = defaultUserId;
                  _this.form.departId = defaultDeptId;
                }
               
              }catch(e){

              }
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
              let arr = [{id:0,name:' '}];
              if(user && user.length != 0){
                user.forEach(function(item){
                    arr.push({
                      id: item.id,
                      name: item.name,
                    })
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
        let form = _this.form;
        let remark = form.remark;
        let empId = form.empId;
        let customerId = form.customerId;

        if(empId == '' || empId == '0'){
          this.myAlert("跟进人员不能为空",'dangerous-icon');
          return false;
        }

        if(!remark){
          this.myAlert("跟进内容不能为空",'dangerous-icon');
          return false;
        }else{
            if(this.num && remark.length < this.num*1){
              this.myAlert("写跟进至少"+this.num+"个字",'dangerous-icon');
              return false;
            }
        }

        newFollow(form).then(function(response){
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
        this.dialogNewFollow = false;
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
</style>
