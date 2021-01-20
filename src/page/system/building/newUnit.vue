<template>
  <div class="" >
      <el-dialog :close-on-click-modal="false" v-dialogDrag title="新增单元" width="550px" :visible.sync="dialogVisible" @close="clearFormData" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 162px;">
          <div class="move-content" >
            <el-form ref="formsData"  :model="form">
              <div class="clear" >
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word require-word" >单元名</span>
                </div>
                <div class="left"   >
                  <el-form-item prop="name"  >
                    <el-input v-model="form.name" title="上限15个字" maxlength="15"    autocomplete="off" style="width:150px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word require-word" >楼层号</span>
                </div>
                <div class="left" >
                  <el-form-item prop="floorMin" >
                    <el-input @input="checkNum1" v-model="form.floorMin" title="上限4位数" maxlength="4"    autocomplete="off" style="width:70px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style=""  >
                  <span class="word " >-</span>
                </div>
                <div class="left" >
                  <el-form-item prop="floorMax" >
                    <el-input @input="checkNum2" v-model="form.floorMax" title="上限4位数" maxlength="4"    autocomplete="off" style="width:70px" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >用途</span>
                </div>
                <div class="left" >
                  <el-form-item prop="functionId" >
                    <el-select v-model="form.functionId"      style="width:150px;" >
                      <el-option v-for="item in useParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >空调</span>
                </div>
                <div class="left" >
                  <el-form-item prop="airConditioningType" >
                    <el-select v-model="form.airConditioningType"      style="width:150px;" >
                      <el-option v-for="item in airConditionerParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>

              </div>
              <div class="clear" >
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >空调费</span>
                </div>
                <div class="left" >
                  <el-form-item prop="airConditioningFee" >
                    <el-input @input="checkNum3" v-model="form.airConditioningFee" title="上限10位数" maxlength="10"    autocomplete="off" style="width:150px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >物业费</span>
                </div>
                <div class="left" >
                  <el-form-item prop="propertyFee" >
                    <el-input @input="checkNum4" v-model="form.propertyFee" title="上限10位数" maxlength="10"    autocomplete="off" style="width:150px" ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="clear" >
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >客梯</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="passengerElevator">
                    <el-select v-model="form.passengerElevator"      style="width:60px;" >
                      <el-option v-for="item in liftParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:30px;text-align:right;"  >
                  <span class="word " >货梯</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="goodsElevator">
                    <el-select v-model="form.goodsElevator"      style="width:60px;" >
                      <el-option v-for="item in liftParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="padding:3px"  >
                  <input type="checkbox" v-model="form.isElevator" value="1" />
                </div>
                <div class="left  padding-r-2 des-word" style="width:72px;"  >
                  <span class="word " >区分电梯</span>
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
  import {findUnitParams}  from '../../../service/newHouse'
  import {addUnit}  from '../../../service/getData'
  export default {
    props:["newUnitValue"],
    data() {
      return {
        dialogVisible:this.newUnitValue,

        airConditionerParams:[],
        liftParams:[],
        useParams:[],
        form: {
          id:'0',
          villageId:"",
          villageSeatId:"",
          name:"",
          floorMin:"",
          floorMax:"",
          functionId:"",
          airConditioningType:"",
          airConditioningFee:"",
          propertyFee:"",
          passengerElevator:"",
          goodsElevator:"",
          isElevator:0,
        },
        formLabelWidth: '100px'
      };
    },
    methods:{
      checkNum1(){
        this.form.floorMin= this.form.floorMin.replace(/[^\d]/g,'');
      },
      checkNum2(){
        this.form.floorMax= this.form.floorMax.replace(/[^\d]/g,'');
      },
      checkNum3(){
        this.form.airConditioningFee= this.form.airConditioningFee.replace(/[^\.\d]/g,'');
      },
      checkNum4(){
        this.form.propertyFee= this.form.propertyFee.replace(/[^\.\d]/g,'');
      },
      showDialog(buildingId,setId){
        this.dialogVisible = true;
        this.form.villageId = buildingId;
        this.form.villageSeatId = setId;
        this.getSelectData();
      },
      getSelectData(){
        let _this = this;
        findUnitParams(1).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let initArr = [{id:"0",name:" "}];
            let params = response.data;
            let airConditionerParams = params.airConditionerParams;
            let liftParams = params.liftParams;
            let useParams = params.useParams;
            if(airConditionerParams){
              _this.airConditionerParams = initArr.concat(airConditionerParams);
            }
            if(liftParams){
              _this.liftParams = initArr.concat(liftParams);
            }
            if(useParams){
              _this.useParams = initArr.concat(useParams);
            }
          }
        })
      },
      saveFormData(){
        let _this =  this;
        var flag = false;
        let form =  JSON.parse(JSON.stringify(_this.form));
        let unitName = form.name;
        let floorMin = form.floorMin;
        let floorMax = form.floorMax;
        if(!unitName){
          this.myAlert("单元名不能为空！","dangerous-icon");
          return false;
        }
        if(floorMin == "" || floorMax == "" ){
          this.myAlert("楼层号不能为空！","dangerous-icon");
          return false;
        }

        if(!form.isElevator){
          form.isElevator = 0;
        }else{
          form.isElevator = 1;
        }
        addUnit(form).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){

            _this.myAlert("数据保存成功！",'success-icon').then(res => {
              let id = _this.form.villageId;
              _this.$parent.reloadListData(id);
              _this.clearFormData();
            }).catch(err => {
            })
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }

        })
      },

      clearFormData(){
        this.$refs.formsData.resetFields();
        this.form.isElevator = 0;
        this.dialogVisible = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 10px 10px;
    .require-word:before{
      content: '*';
      color: #F56C6C;
      margin-right: 1px;
    }
    .require-word-i:before{
      content: '*';
      color: #F56C6C;
      margin-right: 1px;
    }
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
