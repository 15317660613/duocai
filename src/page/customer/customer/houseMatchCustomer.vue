<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="客配房" width="350px" @close="clearFormData" :visible.sync="dialogVisible" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 312px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check1" >
                    <el-checkbox v-model="form.check1"  :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >交易</span>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-select v-model="form.roomTypeIds"  style="width:90px;" >
                      <el-option v-for="item in tradeParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check2" >
                    <el-checkbox v-model="form.check2":false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >区县</span>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-select @change="findStreeByTown" v-model="form.townIds" style="width:90px;" >
                      <el-option v-for="item in areas"  :label="item.label" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check3" >
                    <el-checkbox v-model="form.check3"  :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >街镇</span>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-select v-model="form.streetIds" style="width:90px;" >
                      <el-option v-for="item in streetArr"  :label="item.label" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check4" >
                    <el-checkbox v-model="form.check4"  :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >用途</span>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-select v-model="form.roomUseId" style="width:90px;" >
                      <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check5" >
                    <el-checkbox v-model="form.check5" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >房型</span>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-select v-model="form.roomShape"  style="width:90px;" >
                      <el-option v-for="item in roomShapeParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check6" >
                    <el-checkbox v-model="form.check6" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >面积</span>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-input  v-model="form.area1" maxLength="15" title="上限15位数" autocomplete="off" style="width:40px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" style="line-height:28px;width:10px;text-align:center;" >
                  -
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-input  v-model="form.area2" maxLength="15" title="上限15位数" autocomplete="off" style="width:40px" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item  prop="check7" >
                    <el-checkbox v-model="form.check7" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word" >价格</span>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-input  v-model="form.price1" maxLength="15" title="上限15位数" autocomplete="off" style="width:40px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" style="line-height:28px;width:10px;text-align:center;" >
                  -
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-input  v-model="form.price2" maxLength="15" title="上限15位数" autocomplete="off" style="width:40px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-select v-model="form.unit" style="width:40px;" >
                      <el-option   label="万" value="万" ></el-option>
                      <el-option   label="元" value="元" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" style="padding:3px 20px;"  @click="dialogVisible = false">取 消</span>
          <span class="right save-cancel-btn" style="padding:3px 20px;"   type="primary" @click="saveData">开始匹配</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {findbyId} from '../../../service/getData'
  import {customerConstParam} from '../../../utils/customerParam'
  import {editorCustomer} from '../../../service/customerData'

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
          check3:'',
          check4:'',
          check5:'',
          check6:'',
          check7:'',
          roomTypeIds:'-1',
          townIds:'-1',
          streetIds:'-1',
          roomUseId:'-1',
          roomShape:'-1',
          area1:'',
          area2:'',
          price1:'',
          price2:'',
          unit:'',
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
        editorCustomer(id).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let initArr = [{id:"-1",name:"全部"}];
            let tradeParams = customerConstParam.tradeParams;
            _this.tradeParams = initArr.concat(tradeParams);

            if(params.areas){
              _this.areas = [{id:"-1",label:"全部"}].concat(params.areas);
            }
            if(params.roomShapeIdParams){
              _this.roomShapeParams = initArr.concat(params.roomShapeIdParams);
            }
            let streets = response.data.streets;
            _this.streetArr = [{id:"-1",label:"全部"}].concat(streets);
            //用途
            if(params.roomUseParams){
              _this.roomUseParams = initArr.concat(params.roomUseParams);

            }

            let customerBasic = response.data.customerBasic;
            _this.form.roomTypeIds = customerBasic.customerType;
            _this.form.area1 = customerBasic.area1;
            _this.form.area2 = customerBasic.area2;
            _this.form.price1 = customerBasic.price1;
            _this.form.price2 = customerBasic.price2;
            _this.form.unit = customerBasic.unit;
            _this.form.roomUseId = customerBasic.roomUseId;
            let townIds = response.data.townIds;
            let streetIds = response.data.streetIds;
            if(townIds && townIds.length != 0){
              _this.form.townIds = townIds[0];
            }
            if(streetIds && streetIds.length != 0){
              _this.form.streetIds = streetIds[0];
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      //地域查询街镇
      findStreeByTown(val){
        let _this = this;
        this.form.streetId = '-1';

        if(val){
          findbyId(val).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let initArr = [{id:"-1",label:"全部"}];
              if(data){
                _this.streetArr = initArr.concat(data);
              }

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }

      },

      saveData(){
        let _this =  this;
        let form = JSON.stringify(_this.form);
       this.$router.push({
          path:"/home/rent",
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

        this.form.townId = '';
        this.dialogModifyNum = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 10px 10px;
    .des-word{
      display: inline-block;
      line-height: 27px;
      margin-left: -10px;
      margin-right: 10px;
    }
  }
</style>


