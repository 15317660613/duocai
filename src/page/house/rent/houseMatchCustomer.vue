<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="房配客" width="350px" @close="clearFormData" :visible.sync="dialogVisible" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 312px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check1" >
                    <el-checkbox v-model="form.check1" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >交易</span>
                </div>
                <div class="left" >
                  <el-form-item prop="customerType" >
                    <el-select v-model="form.customerType"        style="width:120px;" >
                      <el-option v-for="item in tradeParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check2" >
                    <el-checkbox v-model="form.check2" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >区县</span>
                </div>
                <div class="left" >
                  <el-form-item prop="townIds" >
                    <el-select @change="findStreetByTown" v-model="form.districtId"     style="width:120px;" >
                      <el-option v-for="item in areas"  :label="item.label" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check3" >
                    <el-checkbox v-model="form.check3" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >街镇</span>
                </div>
                <div class="left" >
                  <el-form-item prop="streetIds" >
                    <el-select v-model="form.streetIds"        style="width:120px;" >
                      <el-option v-for="item in streetArr"  :label="item.label" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check4" >
                    <el-checkbox v-model="form.check4" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >楼盘</span>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-input  v-model="form.areaVillage" maxLength="30" title="上限30位字" autocomplete="off" style="width:120px" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check5" >
                    <el-checkbox v-model="form.check5" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >用途</span>
                </div>
                <div class="left" >
                  <el-form-item prop="roomUseId" >
                    <el-select v-model="form.roomUseId"        style="width:120px;" >
                      <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check6" >
                    <el-checkbox v-model="form.check6" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >房型</span>
                </div>
                <div class="left" >
                  <el-form-item prop="roomShape" >
                    <el-select v-model="form.roomShapeId"        style="width:120px;" >
                      <el-option v-for="item in roomShapeParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check7" >
                    <el-checkbox v-model="form.check7" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >面积</span>
                </div>
                <div class="left" >
                  <el-form-item prop="area1" >
                    <el-input  v-model="form.roomTotalArea" maxLength="15" title="上限15位数" autocomplete="off" style="width:120px" ></el-input>
                  </el-form-item>
                </div>
                 <div class="left  padding-r-1"  >
                    <span class="remark-word" >㎡</span>
                 </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check8" >
                    <el-checkbox v-model="form.check8" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >价格</span>
                </div>
                <div class="left" >
                  <el-form-item prop="price1" >
                    <el-input  v-model="form.price1" maxLength="15" title="上限15位数" autocomplete="off" style="width:120px" ></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" style="padding:3px 20px;" @click="dialogVisible = false">取 消</span>
          <span class="right save-cancel-btn" style="padding:3px 20px;"  type="primary" @click="saveData">开始匹配</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {findbyId,moveBuilding} from "../../../service/getData";
  import {rentConstParam} from '../../../utils/rentParam'
  import {rentParam,rentEditor} from '../../../service/houseData'
  export default {
    props:["houseMatchHouseVisible"],
    data() {
      return {
        dialogVisible:this.houseMatchHouseVisible,
        tradeParams:[],
        areas:[],
        streetArr:[],
        roomUseParams:[],
        roomShapeParams:[],
        dataObj:null,
        form:{
          check1:1,
          check2:1,
          check3:'0',
          check4:'0',
          check5:'0',
          check6:'0',
          check7:'0',
          check8:'0',
          houseNumRule:1,
          areaVillage:'',
          customerType:'',
          districtId:'-1',
          streetIds:'',
          roomUseId:'-1',
          roomShapeId:'-1',
          roomTotalArea:'',
          area1:'',
          area2:'',
          price1:'',
          price2:'',
        },
      };
    },
    methods:{
      showDialogView(dataObj){
        this.dialogVisible = true;
        this.dataObj = dataObj;
        this.getRentParam();
      },
      //获取参数
      getRentParam(){

        let _this = this;
        let dataObj = _this.dataObj;
        let id = dataObj.id;
        rentEditor(id).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            debugger;
            let params = response.data.params;
            let initArr = [{id:"-1",name:" "}];
            let tradeParams = rentConstParam.houseTradeParams;
            _this.tradeParams = tradeParams;
            let basic = response.data.basic;
            let roomType = basic.roomType;
            _this.form.customerType = roomType;
            
            if(params.areas){
              let districtId = basic.districtId;
              _this.areas = [{id:"-1",label:" "}].concat(params.areas);
              _this.form.districtId = districtId;
            }

            if(params.roomShapeParams){
              _this.roomShapeParams = [{id:'-1',name:'全部'}].concat(params.roomShapeParams);
              _this.form.roomShapeId = basic.roomShapeId;
            }

            let streets = response.data.streets;
            if(streets && streets.length != 0){
              _this.streetArr = [{id:"-1",label:"全部"}].concat(streets);
            }
            

            //用途
            if(params.roomUseParams){
              _this.roomUseParams = [{id:"-1",label:"全部"}].concat(params.roomUseParams);
              _this.form.roomUseId = basic.roomUseId;
            }
            _this.form.streetIds = basic.streetId;

            _this.form.areaVillage = basic.areaVillage;
            _this.form.roomTotalArea = basic.roomTotalArea;

            let salePrice = basic.salePrice;
            let salePriceUnit = basic.salePriceUnit;

            let rentPrice = basic.rentPrice;
            let rentPriceUnit = basic.rentPriceUnit;
            if(roomType == '1'){
               _this.form.price1 = (salePrice*1)*10000;
            }else if(roomType == '2'){
                 _this.form.price1 = rentPrice;
            }
           
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      //查街镇
      findStreetByTown(){
        let _this = this;
        let ids = this.form.townIds;
        findbyId(ids).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let arr = [{id:'-1',label:'全部',select:true}];
            if(data && data.length){
              data.forEach(function(item){
                arr.push({
                  id:item.id,
                  label:item.label,
                  select:false,
                })
              })
            }
            _this.streetArr = arr;
            _this.form.streetIds = '-1';
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      saveData(){
       let _this =  this;
       let form = JSON.stringify(_this.form);
       this.$router.push({
          path:"/home/customerSource",
          query:{
            form:form,
          }
        })
        this.dialogVisible = false;
      },
      clickSaveCallback(){
        this.boxMessage.dialogVisible = false;
        this.clearFormData();
      },
      clearFormData(){
        this.$refs.formsData.resetFields();
        this.form.isElevator = 0;
        this.dialogVisible = false
      
        this.form.townId = '';
        this.dialogModifyNum = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 10px 40px;
    .des-word{
      display: inline-block;
      line-height: 27px;
      margin-left: -10px;
      margin-right: 10px;
    }
  }
   .remark-word{
    display:inline-block;
    font-size:12px;
    color:#999;
    line-height: 27px;
  }
</style>


