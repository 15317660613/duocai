<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'选定客转归属人 【'+titlename+'】'" width="350px" @close="clearFormData" :visible.sync="dialogModifyNum" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 112px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:10px 5px;" >
                <div  class="clear" >
                  <div class="left" >
                    <span class="word">员工1</span>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="depart1" >
                      <el-select @change="findUserByDepart(1)" v-model="form.depart1" class="select" >
                        <el-option   label="不修改人员" value="-1" ></el-option>
                        <el-option  v-for="item in departTree"  :label="item.name" :value="item.id" >
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}"  >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="emp1" >
                      <el-select v-model="form.emp1" class="select" >
                        <el-option v-for="item in userList1"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div  class="clear" >
                  <div class="left" >
                    <span class="word">员工2</span>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="depart2" >
                      <el-select @change="findUserByDepart(2)" v-model="form.depart2" class="select" >
                        <el-option   label="不修改人员" value="-1" ></el-option>
                        <el-option   label="修改为空" value="-2" ></el-option>
                        <el-option  v-for="item in departTree"  :label="item.name" :value="item.id" >
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}"  >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="emp2" >
                      <el-select v-model="form.emp2" class="select" >
                       
                        <el-option v-for="item in userList2"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogModifyNum = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {followParam} from "../../../service/houseData";
  import {changePeople} from "../../../service/customerData";
  import {findUserByDepartId} from "../../../service/organizeDate";

  export default {
    props:["modifyChangePeopleVisible"],
    data() {
      return {
        dialogModifyNum:this.modifyChangePeopleVisible,
        departTree:[],
        titlename:'',
        userList1:[{id:'-1',name:'不修改人员'}],
        userList2:[{id:'-1',name:'不修改人员'}],

        ids:'',
        form:{
          num:'',
          depart1:'-1',
          depart2:'-1',

          emp1:'-1',
          emp2:'-1',
        },
      };
    },
    methods:{
      diolagShow(ids){
        this.dialogModifyNum = true;
        let mydata = ids.split(',');
        
        this.titlename = mydata.length+'条';
        this.ids = ids;
        this.getNumData();
      },

      getNumData(){
        let _this = this;
        followParam().then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let departTree = data.departTree;
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
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      findUserByDepart(value){
        let _this = this;
        let id = null;
        let userList = "";
        if(value == 1){
          id = this.form.depart1;
          userList = "userList1";
        }else if(value == 2){
          id = this.form.depart2;
          userList = "userList2";
        }else if(value == 3){
          id = this.form.depart3;
          userList = "userList3";
        }
        if(id && id != -1 && id != -2) {
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

              _this[userList] =  arr;
              if(value == 1){
                _this.form["emp"+value] = '';
              }else{
                _this.form["emp"+value] = '';
              }
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          
            if(id == -1 && value == 1){
             _this[userList] =  [{id:'-1',name:'不修改人员'}];
             _this.form["emp"+value] = '-1';
           }else if(id == -1 && value == 2){
             _this[userList] =  [{id:'-1',name:'不修改人员'}];
             _this.form["emp"+value] = '-1';
           }else if(id == -2 && value == 2){
              _this[userList] =  [{id:'-2',name:'修改为空'}];
             _this.form["emp"+value] = '-2';
           }
        }
      },
      saveData() {
        let _this = this;
        let ids = _this.ids;
        let emp1 = _this.form.emp1;
        let emp2 = _this.form.emp2;
        if(!emp1){
          this.myAlert("员工不能为空！",'dangerous-icon');
          return false;
        }
        changePeople(emp1,emp2,ids).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功", 'success-icon').then(res => {
              _this.clearFormData();
              _this.$emit("reloadCustomerList",1);
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

        this.form.townId = '';
        this.dialogModifyNum = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 10px 10px;
    .select{
      width:100px;
    }
    .word{
      display:inline-block;
      line-height:28px;
      height:28px;
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
</style>
