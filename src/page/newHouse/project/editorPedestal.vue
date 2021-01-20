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
                    <el-input @input="number" v-model="form.pliesNumber" maxLength="5" title="上限5位数"  autocomplete="off" style="width:80px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left record-word mearsure-unit">层</div>

              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item label="梯户数" prop="stairsNumber"  label-width="68px">
                    <el-select v-model="form.stairsNumber"      style="width:80px;" >
                      <el-option v-for="item in stairsParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left record-word mearsure-unit">梯</div>
                <div class="left" style="padding-left:37px;" >
                  <el-form-item prop="doorNumber" >
                    <el-select v-model="form.doorNumber"      style="width:80px;" >
                      <el-option v-for="item in doorNumberParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left record-word  mearsure-unit">户</div>
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
                    <el-input @input="checkNum" v-model="form.unitNumber" maxLength="5" title="上限5位数"  autocomplete="off" style="width:80px" ></el-input>

                  </el-form-item>
                </div>
                <div class="left record-word mearsure-unit">单元</div>
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
  import {editorPedestal,modifyPedestal} from '../../../service/newHouse'
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
          liableDepart:'',
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
      getSelectData(id){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        editorPedestal(id).then(function(response){
          _this.$layer.closeAll("loading");
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            let params = response.data.params;
            let seat = response.data.seat;
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
            _this.form = seat;
          }
        })
      },
      editorPedestal(id,name){
        this.dialogEditorPedestal = true;
        this.titlename = name;
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
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        modifyPedestal(form).then(function(response){
          _this.$layer.closeAll("loading");
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
        if(value != "") {
          _this.form.name = _this.form.name + value;
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
    padding:20px 40px;
    .title-word{
      line-height:20px;
      font-size:12px;
    }
    .mearsure-unit{
      line-height:28px;

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
