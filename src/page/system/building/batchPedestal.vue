<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'批量生成栋座 【'+title+'】'" width="600px" height="550px" :visible.sync="dialogBatchPedestal" @close="clearFormData" :append-to-body="true" >

      <div class="pop-up" style="height: 508px;">
        <el-form ref="formsData" :model="form">
          <div class="pop-up-container clear margin-b-10" >
            <div class="left" >
              <span class="word-1" >栋座名称</span>
            </div>
            <div class="left" >
              <div class="word-2" >
                <span>前缀</span>
              </div>
              <div>
                <el-form-item prop="startName"  >
                  <el-input v-model.trim="form.startName"  maxlength="10" style="width:100px" title="最多10个字"></el-input>
                </el-form-item  >
              </div>
            </div>
            <div class="left left-bracket" >
            </div>
            <div class="left" >
              <div class="clear up-w" >
                <div class="left" >
                  <el-form-item  prop="houseNumRule"  >
                    <el-radio v-model="form.houseNumRule" :label="1" >&nbsp;</el-radio>
                  </el-form-item>
                </div>
                <div class="left" style="margin-right:5px;" >
                  <el-form-item prop="startIndex"  >
                    <el-input @input="checkNum1"  v-model.trim="form.startIndex"  autocomplete="off" class="" style="width:45px;" ></el-input>
                  </el-form-item>
                </div>
                <div class="left">
                  至
                </div>
                <div class="left" style="margin-left:5px;" >
                  <el-form-item prop="endIndex"   >
                    <el-input @input="checkNum2" v-model.trim="form.endIndex"  autocomplete="off" class="" style="width:45px;" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear down-w" >
                <div class="left" >
                  <el-form-item  prop="houseNumRule" >
                    <el-radio v-model="form.houseNumRule" :label="2"  >&nbsp;</el-radio>
                  </el-form-item>
                </div>
                <div class="left" style="margin-right:5px;" >
                  <el-form-item prop="startIndex1"  >

                    <el-input @input="checkChar1" v-model="form.startIndex1" maxLength="1" autocomplete="off" class="" style="width:45px;" ></el-input>
                  </el-form-item>
                </div>
                <div class="left">
                  至
                </div>
                <div class="left" style="margin-left:5px;" >
                  <el-form-item prop="endIndex1"  >
                    <el-input @input="checkChar2" v-model="form.endIndex1" maxLength="1"  autocomplete="off" class="" style="width:45px;" ></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="left right-bracket" >
            </div>
            <div class="left" >
              <div class="word-2" >
                <span>后缀</span>
              </div>
              <div>
                <el-form-item prop="endName"  >
                  <el-select    v-model="form.endName"  style="width:100px;" >
                    <el-option v-for="item in seatNamesParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="pop-up-container margin-b-10" >
            <div class="move-content" >


                <div class="clear" >
                  <div class="left" >
                    <el-form-item prop="pliesNumber" label="总层数"  label-width="60px">

                      <el-input @input="number" v-model="form.pliesNumber" maxLength="6" title="0-6位数" autocomplete="off" style="width:80px" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left mearsure-unit">层</div>

                </div>
                <div class="clear" >
                  <div class="left" >
                    <el-form-item prop="stairsNumber" label="梯户数"  label-width="60px">
                      <el-select v-model="form.stairsNumber"      style="width:80px;" >
                        <el-option v-for="item in stairsParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left mearsure-unit">梯</div>
                  <div class="left" style="padding-left:37px;" >
                    <el-form-item prop="doorNumber" >
                      <el-select v-model="form.doorNumber"      style="width:80px;" >
                        <el-option v-for="item in doorNumberParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left mearsure-unit">户</div>
                </div>
                <div class="clear" >
                  <div class="left" >
                    <el-form-item prop="unitType" label="单元数"  label-width="60px">
                      <el-select v-model="form.unitType"      style="width:80px;" >
                        <el-option v-if="item.name != '朝向'" v-for="item in unitParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left mearsure-unit">有</div>
                  <div class="left" style="padding-left:37px;" >
                    <el-form-item prop="unitNumber" >
                        <el-input @input="checkNum" v-model="form.unitNumber" title="0-6位数" maxLength="6" autocomplete="off" style="width:80px" ></el-input>

                    </el-form-item>
                  </div>
                  <div class="left mearsure-unit">单元</div>
                </div>
                <div class="clear" >
                  <div class="left" >
                    <el-form-item label="责任人"  label-width="60px">
                      <el-select @change="findUserByDepart" v-model="form.liablePersonDepartId"      style="width:130px;" >
                        <el-option label="" value="" ></el-option>
                        <el-option v-for="item in departs"  :label="item.name" :value="item.id" >
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}"  >{{item.name}}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left" style="padding-left:5px;" >
                    <el-form-item >
                     <el-select v-model="form.liablePerson"      style="width:80px;" >
                       <el-option label="" value="" ></el-option>
                       <el-option v-for="item in users"  :label="item.name" :value="item.id" ></el-option>
                     </el-select>
                    </el-form-item>
                  </div>
                </div>
            </div>

          </div>
        </el-form>
          <div class="pop-up-container " style="height: 220px;">
          <div class="clear" >
            <div class="left list-content list-container" >
              <div class="list-table"  >
                <el-table
                  :data="tableData"
                  style="width: 100%;height:100%;"
                  height="100%"
                  border
                  highlight-current-row
                  :default-sort = "{prop: 'date', order: 'descending'}"
                >

                  <el-table-column
                    prop="name"
                    label="栋座名"
                    :show-overflow-tooltip="true"
                    width="120">

                  </el-table-column>


                  <el-table-column
                    prop="pliesNumber"
                    label="总层"
                    width="80"
                   >
                  </el-table-column>
                  <el-table-column
                    prop="stairsDoorNumber"
                    label="梯户"
                    width="80"
                    >

                  </el-table-column>
                  <el-table-column
                    prop="unitNumber"
                    label="单元"
                    width="80"
                    >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogBatchPedestal = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
          <span class="right save-cancel-btn" type="primary" @click="lookThrought">预 览</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {edtiorPedestal,batchPedestal} from '../../../service/getData';
   import {departperson} from "../../../service/organizeDate";
  const charsetArr = ['A', 'B','C', 'D', 'E','F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  export default {
    props:["batchPedestalValue"],
    data() {
      return {
        dialogBatchPedestal:this.batchPedestalValue,
        title:'',
        stairsParams:[],
        doorNumberParams:[],
        unitParams:[],
        departs:[],
        users:[],
        seatNamesParams:[
          {id:"空",name:""},
          {id:"栋",name:"栋"},
          {id:"座",name:"座"},
          {id:"幢",name:"幢"},
          {id:"号",name:"号"},
          {id:"号楼",name:"号楼"},
        ],
        tableData:[],
        textarea2:"",
        radio:1,
        input:"",

        form: {
          startName:"",
          houseNumRule:1,
          startIndex:1,
          startIndex1:'A',
          endIndex:10,
          endIndex1:'H',
          endName:"",
          pliesNumber:"",
          stairsNumber:"",
          doorNumber:"",
          villageId:"",
          unitType:"",
          unitNumber:"",
          liablePersonDepartId:'',
          liablePerson:'',
          deleted:0,
          createBy:"aaa"
        },
        formLabelWidth: '100px'
      };
    },
    methods:{
      checkNum1(){
        this.form.startIndex= this.form.startIndex.replace(/[^\d]/g,'');
      },
      checkNum2(){
        this.form.endIndex= this.form.endIndex.replace(/[^\d]/g,'');
      },
      checkChar1(){
        this.form.startIndex1= this.form.startIndex1.replace(/[^A-Z]+/g,'');
      },
      checkChar2(){
        this.form.endIndex1= this.form.endIndex1.replace(/[^A-Z]+/g,'');
      },
      number(){
        this.form.pliesNumber= this.form.pliesNumber.replace(/[^\.\d]/g,'');
        this.form.pliesNumber= this.form.pliesNumber.replace('.','');
      },
      checkNum(){
        this.form.unitNumber= this.form.unitNumber.replace(/[^\d]/g,'');
        this.form.unitNumber= this.form.unitNumber.replace('.','');
      },
      findUserByDepart(value){
        let _this = this;
        let id = this.form.liablePersonDepartId;
        if(id) {
          departperson(id).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [];
              if(user && user.lengthg != 0){
                user.forEach(function(item){
                  if(item.paramName == "常态在职" || 
                    item.paramName == "薪假在职" || 
                    item.paramName == "停薪在职" || 
                    item.paramName == "申离在职" || 
                    item.paramName == "正式离职" 
                  ){
                    arr.push({
                      id: item.id,
                      name: item.name,
                    })
                  }  
                })
              }
              _this.users =  arr;
              _this.form.liablePerson = '';
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.users =  [];
          _this.form.liablePerson = ' ';
        }
      },
      getSelectData(){
        let _this = this;
        let id = '';
        edtiorPedestal(id).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            let params = response.data.params;
            let unitParams = params.unitParams;
            let unit = [];
            unitParams.forEach(item => {
              if(item.name != '朝向'){
                unit.push(item);
              }
            })
            _this.unitParams= unit;
            let arr = [];
            for(let i = 1 ;i <= 20 ; i++){
              arr.push({id:i,name:i});
            }
            _this.stairsParams = arr;
            arr = [];
            for(let i = 1 ;i <= 200 ; i++){
              arr.push({id:i,name:i});
            }
            _this.doorNumberParams = arr;
            let departs = params.departs;
            let arr2 = [];
            if(departs && departs.length != 0){
              departs.forEach(function(item){
                arr2.push({id:item.id,level:item.level,name:item.label.replace(/&nbsp;/g,"")});
              })
            }
            _this.departs = arr2;
            let arr3 = [];
            let users = params.users;
            if(users && users.length != 0){
              users.forEach(function(item){
                arr3.push({id:item.id,name:item.name});
              })
            }
            _this.users = arr3;
          }
        })
      },

      batchPedestal(id,name){
        this.dialogBatchPedestal = true;
        this.form.villageId = id;
        this.title = name;
        this.getSelectData();
      },
      lookThrought(){
          let _this = this;
          let form = _this.form;
          let type = _this.form.houseNumRule;
          let stairsNumber = form.stairsNumber;
          let doorNumber = form.doorNumber;
          let unitNumber = form.unitNumber;
          let endName = form.endName;
          let startIndex = form.startIndex;
          let endIndex = form.endIndex;
          let startIndex1 = form.startIndex1;
          let endIndex1 = form.endIndex1;
          let obj = {};
          let unitType = _this.form.unitType;
          let unitName = _this.getNameById(this.unitParams,unitType);

          if(unitName == '数字'){
            if(unitNumber * 1 > 99){
              this.myAlert("数字单元号不能超过99！","dangerous-icon");
              return false;
            }
            if(unitNumber*1 < 10){
              unitNumber = "00"+unitNumber;
            }else{
              unitNumber = "0"+unitNumber;
            }

          }else if(unitName == '英文'){
            if(unitNumber * 1 > 26){
              this.myAlert("英文单元号不能超过26！","dangerous-icon");
              return false;
            }
            if(unitNumber*1 < 10){
              unitNumber = "A0"+unitNumber;
            }else{
              unitNumber = "A"+unitNumber;
            }
          }else if(unitName == '甲乙'){
            if(unitNumber * 1 > 8){
              this.myAlert("甲乙单元号不能超过8！","dangerous-icon");
              return false;
            }
            if(unitNumber*1 < 10){
              unitNumber = "T0"+unitNumber;
            }else{
              unitNumber = "T"+unitNumber;
            }
          }else if(unitName == '朝向'){
            if(unitNumber * 1 > 9){
              this.myAlert("朝向单元号不能超过9！","dangerous-icon");
              return false;
            }
          }

          if(type == 1){
            if(endIndex < startIndex){
              this.myAlert("房间号错误！",'fail-icon');
            }
            let arr = [];
            if(endName == "空"){
              endName = "";
            }
            for(var i = startIndex ; i <= endIndex*1; i++  ){

              if(stairsNumber == ''){
                stairsNumber = 0;
              }
              if(doorNumber == ''){
                doorNumber = 0;
              }

              obj = {
                name:form.startName+i+endName,
                pliesNumber:form.pliesNumber,
                stairsDoorNumber:stairsNumber+"梯"+doorNumber+"户",
                unitNumber:unitNumber,
              }
              arr.push(obj);
            }
            _this.tableData = arr;
          }else{
            let star = charsetArr.indexOf(startIndex1);
            let end = charsetArr.indexOf(endIndex1);
            if(star > end){
              this.myAlert("房间号错误！",'fail-icon');
            }
            let arr = [];
            if(endName == "空"){
              endName = "";
            }
            let flag = false;

            for(let i = star; i <= end; i++  ){

              if(stairsNumber == ''){
                stairsNumber = 0;
              }
              if(doorNumber == ''){
                doorNumber = 0;
              }

              obj = {
                name:form.startName+ charsetArr[i]+endName,
                pliesNumber:form.pliesNumber,
                stairsDoorNumber:stairsNumber+"梯"+doorNumber+"户",
                unitNumber:unitNumber,
              }
              arr.push(obj);
              if(charsetArr[i] == endIndex){
                break;
              }
            }
            _this.tableData = arr;
          }
      },
      saveData(){
        let _this =  this;
        let form = _this.form;
        if(form.houseNumRule == 1){
          let startIndex = form.startIndex;
          let endIndex = form.endIndex;
          if(startIndex > endIndex){
            this.myAlert("房间号错误！",'fail-icon');
            return false;
          }
        }else{
          let startIndex1 = form.startIndex1;
          let endIndex1 = form.endIndex1;
          let star = charsetArr.indexOf(startIndex1);
          let end = charsetArr.indexOf(endIndex1);
          if(star > end){
            this.myAlert("房间号错误！",'fail-icon');
            return false;
          }
          form.startIndex = form.startIndex1;
          form.endIndex = form.endIndex1;
        }
        if(!form.doorNumber){
          form.doorNumber = 0;
        }
        if(!form.endIndex){
          form.endIndex = 0;
        }
        if(!form.pliesNumber){
          form.pliesNumber = 0;
        }
        if(!form.stairsNumber){
          form.stairsNumber = 0;
        }
        if(!form.unitNumber){
          form.unitNumber = 0;
        }

        batchPedestal(form).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let id = _this.form.villageId;
            _this.saveDataSuccess(id);
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }
        })
      },
      saveDataSuccess(){
        let _this = this;
        _this.myAlert("栋座保存成功",'success-icon').then(res => {
          _this.$parent.reloadPedestal();
          _this.clearFormData();
        }).catch(err => {
        })
      },
      //恢复初始数据
      clearFormData(formRule){
        this.$refs.formsData.resetFields();
        this.tableData = [];
        this.dialogBatchPedestal = false
      },
      getNameById(list,id){
        let name = "";
        for(let i = 0 ; i < list.length ; i ++){
          if(list[i].id == id){
            name = list[i].name;
            break;
          }
        }
        return name;
      }
    }
  }
</script>

<style lang="scss" scoped>
  *{
    font-size:12px;
  }

  .margin-b-10{
    margin-bottom:10px;
  }
  .word-1{
    padding-left:20px;
    width:80px;
    display:inline-block;
    line-height:75px;
    height:75px;

  }
  .word-2{
    padding-top: 11px;
    width: 100px;
    text-align: center;
    span{
      color:#999;
    }
  }
  .up-w{
    padding-top:5px;
  }
  .down-w{
    padding-top:20px;
  }
  .left-bracket{
    height:75px;
    width:20px;
  }
  .right-bracket{
    height:75px;
    width:20px;
  }
  .move-content {
    padding:10px 0 10px 10px;
    .title-word{
      line-height:20px;
      font-size:12px;
    }
    .mearsure-unit{
      line-height:28px;
      color:#606266;
      font-size:12px;
      padding-left:5px;
    }
    .select {
      width: 120px;
    }
    p{
      color:#DCA96D;
      font-size:12px;
    }
  }
  .list-table{
    height:215px;
  }
</style>
