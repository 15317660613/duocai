<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="房号设置" width="550px" :visible.sync="dialogNewHouseNum" @close="clearFormData" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 162px;">
          <div class="move-content" >
            <el-form ref="formsData"  :model="form">


              <div class="clear" >
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >户型</span>
                </div>
                <div class="left" >
                  <el-form-item prop="typeId" >
                    <el-select v-model="form.typeId"      style="width:75px;" >
                      <el-option v-for="item in types"  :label="item.typeName" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:35px;text-align:right;"  >
                  <span class="word " >房型</span>
                </div>
                <div class="left" >
                  <el-form-item prop="room" >
                    <el-select v-model="form.room"      style="width:50px;" >
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  mearsure-unit">房</div>
                <div class="left"  >
                  <el-form-item prop="hall" >
                    <el-select v-model="form.hall"      style="width:50px;" >
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left padding-r-2 mearsure-unit">厅</div>
                <div class="left"  >
                  <el-form-item prop="wei" >
                    <el-select v-model="form.wei"      style="width:50px;" >
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 mearsure-unit">卫</div>
                <div class="left padding-r-2 word"  >
                  <el-form-item prop="balcony" >
                    <el-select v-model="form.balcony"      style="width:50px;" >
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  word">阳台</div>
              </div>
              <div class="clear" >
                <div class="left clear" style="padding-top:14px;" >
                  <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                    <span class="word " >总价</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="price" >
                      <el-input @input="checkNum5" v-model="form.price" title="上限15个字" maxLength="15"  autocomplete="off" style="width:70px" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left  mearsure-unit">万</div>
                </div>

                <div class="left" style="padding-left:5px;" >
                  <div class="clear" >
                    <div class="left  padding-r-2 des-word" style="width:15px;text-align:right;"  >
                      <input type="radio" v-model="form.chooseArea" value="2" />
                    </div>
                    <div class="left  padding-r-2 des-word" style="width:50px;text-align:right;"  >
                      <span class="word " >套内面积</span>
                    </div>
                    <div class="left" >
                      <el-form-item prop="inArea" >
                        <el-input @input="checkNum2" v-model="form.inArea" maxLength="10" title="0-10位数" autocomplete="off" style="width:75px" ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left mearsure-unit">㎡</div>
                  </div>
                  <div class="clear" >
                    <div class="left  padding-r-2 des-word" style="width:15px;text-align:right;"  >
                      <input type="radio" v-model="form.chooseArea" value="1" />
                    </div>
                    <div class="left  padding-r-2 des-word" style="width:50px;text-align:right;"  >
                      <span class="word " >建筑面积</span>
                    </div>
                    <div class="left" >
                      <el-form-item prop="buildArea" >
                        <el-input @input="checkNum3" v-model="form.buildArea" maxLength="10" title="0-10位数" autocomplete="off" style="width:75px" ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left mearsure-unit">㎡</div>
                  </div>
                </div>
                <div class="left clear" style="padding-top:14px;" >
                  <div class="left  padding-r-2 des-word" style="width:42px;text-align:right;"  >
                    <span class="word " >单价</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="unitPrice" >
                      <el-input @input="checkNum4" v-model="form.unitPrice" title="上限5位数" maxLength="5" autocomplete="off" style="width:70px" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left  mearsure-unit">元</div>
                </div>
              </div>
              <div class="clear" >
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >朝向</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="orientation" >
                    <el-select v-model="form.orientation"      style="width:80px;" >
                      <el-option v-for="item in orientationParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:77px;text-align:right;"  >
                  <span class="word " >装修</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="roomDecorate" >
                    <el-select v-model="form.roomDecorate"      style="width:75px;" >
                      <el-option v-for="item in decorateIdParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:58px;text-align:right;"  >
                  <span class="word " >用途</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="roomUse" >
                    <el-select v-model="form.roomUse"      style="width:70px;" >
                      <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
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
  import {modifyHouseNums,editorHouseNum}  from '../../../service/newHouse'
  export default {
    props:["modifyHouseNumValue"],
    data() {
      return {
        dialogNewHouseNum:this.modifyHouseNumValue,
        villages:[],
        seats:[],
        units:[],
        roomUseParams:[],
        orientationParams:[],
        decorateIdParams:[],
        otherSelect:[0,1,2,3,4,5,6,7,8,9],
        projectId:[],
        types:[],
        form: {
          ids:'',

          typeId: '',
          room: '',
          hall: '',
          wei: '',
          balcony: '',
          price: '',
          chooseArea:'2',
          inArea: '',
          buildArea: '',
          unitPrice: '',
          orientation: '',
          roomDecorate: '',
          roomUse: '',
        },
        formLabelWidth: '100px'
      };
    },
    methods:{
      checkNum1(){
        this.form.floor= this.form.floor.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.inArea= this.form.inArea.replace(/[^\.\d]/g,'');
        let price = this.form.price;
        let inArea = this.form.inArea;
        let buildArea = this.form.buildArea;
        let unitPrice = this.form.unitPrice;
        let chooseArea = this.form.chooseArea;
        if(chooseArea == 2){
          if(inArea != '' && price != ''){
            this.form.unitPrice = ((price*1)/(inArea*1)*10000).toFixed(2);
          }
        }else{

        }
      },
      checkNum3() {
        this.form.buildArea = this.form.buildArea.replace(/[^\.\d]/g, '');
        let price = this.form.price;
        let inArea = this.form.inArea;
        let buildArea = this.form.buildArea;
        let unitPrice = this.form.unitPrice;
        let chooseArea = this.form.chooseArea;
        if (chooseArea == 1) {
          if (buildArea != '' && price != '') {
            this.form.unitPrice = ((price * 1) / (buildArea * 1)*10000).toFixed(2);
          }
        }
      },
      checkNum4(){
        this.form.unitPrice= this.form.unitPrice.replace(/[^\.\d]/g,'');
        let price = this.form.price;
        let inArea = this.form.inArea;
        let buildArea = this.form.buildArea;
        let unitPrice = this.form.unitPrice;
        let chooseArea = this.form.chooseArea;
        if(chooseArea == 1){
          if(buildArea != '' && unitPrice != ''){
            this.form.price = ((buildArea*1)*(unitPrice*1)/10000).toFixed(0);
          }
        }else{
          if(inArea != '' && unitPrice != ''){
            this.form.price = ((inArea*1)*(unitPrice*1)/10000).toFixed(0);
          }
        }

      },
      checkNum5(){
        let price = this.form.price;
        let inArea = this.form.inArea;
        let buildArea = this.form.buildArea;
        let unitPrice = this.form.unitPrice;
        let chooseArea = this.form.chooseArea;
        if(chooseArea == 1){
          if(buildArea != '' && price != ''){
            this.form.unitPrice = ((price*1)/(buildArea*1)*10000).toFixed(0);
          }
        }else{
          if(inArea != '' && price != ''){
            this.form.unitPrice = ((price*1)/(inArea*1)*10000).toFixed(0);
          }
        }
      },
      modifyHouseNum(ids,projectId){
        this.dialogNewHouseNum = true;
        this.form.ids = ids;
        this.projectId = projectId;
        this.getSelectData();
      },
      getSelectData(){
        let _this = this;
        let id = this.form.id;
        let projectId = this.projectId;
        editorHouseNum('',projectId).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let room = response.data.room;
            let types = params.types;
            let initArr = [{id:"0",name:" "}];
            let roomUseParams = params.roomUseParams;
            let orientationParams = params.orientationParams;
            let decorateIdParams = params.decorateIdParams;
            if(roomUseParams){
              _this.roomUseParams = initArr.concat(roomUseParams);
            }
            if(orientationParams){
              _this.orientationParams = initArr.concat(orientationParams);
            }
            if(decorateIdParams){
              _this.decorateIdParams = initArr.concat(decorateIdParams);
            }
            if(types){
              _this.types = types;
            }
            for(let arr in room ){
              if(room[arr] == null){
                room[arr] = "";
              }else{
                _this.form[arr] = room[arr];
              }
            }
          }
        })
      },
      saveFormData(){
        let _this =  this;
        var flag = false;
        let form =  JSON.parse(JSON.stringify(_this.form));
        let floor = form.floor;
        if(floor == ''){
          form.floor = '-1';
        }
        modifyHouseNums(form).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){

            _this.myAlert("数据保存成功！",'success-icon').then(res => {
              let id = _this.form.projectId;
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
        this.dialogNewHouseNum = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 10px 0px;
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
    .word{
      line-height:27px;
      color:12px;
    }
    .break{
      border-width: 2px;
      border-top-width:0px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      margin:5px 0  5px;
    }
    .title-word{
      line-height:20px;
      font-size:12px;
    }
    .mearsure-unit{
      line-height:28px;
      color:#999999;
      font-size:12px;
      padding:0 2px;
    }
    .padding-r-2{
      padding-right:2px;
    }
    .select {
      width: 120px;
    }
    p{
      color:#DCA96D;
      font-size:12px;
    }
    .special-word{
      color:#009933;
    }
  }
</style>
