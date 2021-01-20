<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'修改栋座 【'+titlename+'】'" width="550px" :visible.sync="dialogEditorPedestal" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 162px;">
          <div class="move-content" >
            <el-form ref="formsData" :rules="rules" :model="form">
              <div class="clear" >
                <div class="left" >
                  <el-form-item label="栋座名称" prop="name" label-width="68px">
                    <el-input v-model.trim="form.name" maxLength="15" title="最多15个字"   autocomplete="off" style="width:150px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item  >
                    <el-select    v-model="form.special"  @change="changePedestalNum"  style="width:80px;" >
                      <el-option v-for="item in seatNamesParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item label="总层数" prop="pliesNumber" label-width="68px">
                    <el-input @input="number" v-model="form.pliesNumber" maxLength="6" title="0-6位数" autocomplete="off" style="width:80px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left mearsure-unit">层</div>

              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item label="梯户数" prop="stairsNumber"  label-width="68px">
                    <el-select v-model="form.stairsNumber"      style="width:80px;" >
                      <el-option v-for="item in stairsParams"  :label="item.name" :value="item.name" ></el-option>
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
                  <el-form-item label="单元数" prop="unitType"  label-width="68px">
                    <el-select v-model="form.unitType"      style="width:80px;" >
                      <el-option v-for="item in unitParams"  :label="item.name" :value="item.id" ></el-option>

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
                  <el-form-item  prop="liablePersonDepartId" label="责任人"  label-width="68px">
                    <el-select @change="findUserByDepart" v-model="form.liablePersonDepartId"      style="width:130px;" >
                       <el-option v-for="item in departs"  :label="item.name" :value="item.id" >
                         <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}"  >{{item.name}}</span>
                       </el-option>
                   
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" style="padding-left:5px;" >
                  <el-form-item prop="liablePerson" >
                    <el-select v-model="form.liablePerson"      style="width:80px;" >
                        <el-option v-for="item in users"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData">保 存</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {edtiorPedestal,modifyPedestal} from '../../../service/getData'
  import {departperson} from "../../../service/organizeDate";
  export default {
    props:["editorPedestalValue"],
    data() {
      let validateName = (rule, value, callback) => {
        if (value == "") {
          this.myAlert("栋座名称为空！",'dangerous-icon');
        }
      }
      return {
        dialogEditorPedestal:this.editorPedestalValue,
        titlename:'',
        stairsParams:[],
        doorNumberParams:[],
        unitParams:[],
        
        seatNamesParams:[
          {id:"空",name:""},
          {id:"栋",name:"栋"},
          {id:"座",name:"座"},
          {id:"幢",name:"幢"},
          {id:"号",name:"号"},
          {id:"号楼",name:"号楼"},
        ],
        departs:[],
        users:[],
        textarea2:"",
        form: {
          name:'',
          special:'',
          villageId:0,
          pliesNumber:'',
          stairsNumber:'',
          doorNumber:0,
          unitType:'',
          unitNumber:'',
          liablePersonDepartId:'',
          liablePerson:'',
          createBy:'aaa',
          deleted:0,
        },
        rules:{
          name:[
            {required: true,validator: validateName, trigger: 'blur' }
          ]
        },
        formLabelWidth: '100px'
      };
    },
    methods:{
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
      getSelectData(id){
        let _this = this;
        edtiorPedestal(id).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            let params = response.data.params;
            let seat = response.data.seat;
            _this.titlename = seat.name;
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
            arr = [];
            if(departs && departs.length != 0){
              departs.forEach(function(item){
                arr.push({id:item.id,level:item.level,name:item.label.replace(/&nbsp;/g,"")});
              })
            }
            _this.departs = arr;
            arr = [];
            let users = response.data.users;
            if(users && users.length != 0){
              users.forEach(function(item){
                arr.push({id:item.id,name:item.name});
              })
            }
            _this.users = arr;
            _this.form = seat;
          }
        })
      },
      editorPedestal(id){
        this.dialogEditorPedestal = true;
        this.getSelectData(id);
      },
      saveFormData(){
        let _this =  this;
        let name = _this.form.name;
        let unitType = _this.form.unitType;
        let unitNumber = _this.form.unitNumber;
        let unitName = _this.getNameById(this.unitParams,unitType);
        if(unitName == '数字'){
          if(unitNumber * 1 > 99){
            this.myAlert("数字单元号不能超过99！","dangerous-icon");
            return false;
          }

        }else if(unitName == '英文'){
          if(unitNumber * 1 > 26){
            this.myAlert("英文单元号不能超过26！","dangerous-icon");
            return false;
          }
        }else if(unitName == '甲乙'){
          if(unitNumber * 1 > 8){
            this.myAlert("甲乙单元号不能超过8！","dangerous-icon");
            return false;
          }
        }else if(unitName == '朝向'){
          if(unitNumber * 1 > 9){
            this.myAlert("朝向单元号不能超过9！","dangerous-icon");
            return false;
          }
        }
        if(!name){
          this.myAlert("栋座名称为空！",'dangerous-icon');
          return false;
        }
        let form =  JSON.parse(JSON.stringify(_this.form));
        if(!form.pliesNumber){
          form.pliesNumber = 0;
        }
        if(!form.unitNumber){
          form.unitNumber = 0;
        }
        if(!form.doorNumber){
          form.doorNumber = 0;
        }
        if(!form.stairsNumber){
          form.stairsNumber = 0;
        }
        modifyPedestal(form).then(function(response){

          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            _this.saveDataSuccess();
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
      clearFormData(){
        this.$refs.formsData.resetFields();
        this.dialogEditorPedestal = false
      },
       changePedestalNum(value){
        let _this = this;
        let name = _this.form.name;
        if(value != ""){
          let lastChar = '';
          if(name !=''){
            lastChar = name.substr(name.length-1,1);
          }
          if(lastChar == '栋' || lastChar == '座' ||  lastChar == '幢' ||  lastChar == '号' ||  lastChar == '楼号' ){
            if(value != '空'){
              _this.form.name = name.substring(0,name.length-1) + value;
            }  
          }else{
              if(value != '空'){
                _this.form.name = _this.form.name + value;
              }
             
          }
         
        }
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
</style>
