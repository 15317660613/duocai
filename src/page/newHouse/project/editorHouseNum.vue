<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="修改房号" width="500px" height="250px" :visible.sync="dialogNewHouseNum" @close="clearFormData" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 262px;">
          <div class="move-content" >
            <el-form ref="formsData"  :model="form">
              <div class="clear" >
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word require-word" >楼盘字典</span>
                </div>
                <div class="left" >
                  <el-form-item >
                    <el-input v-model="form.villageName" disabled   autocomplete="off" style="width:135px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:70px;text-align:right;"  >
                  <span class="word " >栋座</span>
                </div>
                <div class="left" >
                  <el-form-item >
                    <el-input v-model="form.villageSeatName" disabled   autocomplete="off" style="width:60px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >单元</span>
                </div>
                <div class="left" >
                  <el-form-item >
                    <el-input v-model="form.villageUnitName" disabled   autocomplete="off" style="width:60px" ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="clear " style="padding-bottom:8px;" >
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >楼层</span>
                </div>
                <div class="left " >
                  <el-form-item prop="floor" >
                    <el-input @input="checkNum1" v-model="form.floor" title="0-6位数" maxLength="6" autocomplete="off" style="width:120px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left des-word word">层</div>
                <div class="left  padding-r-2 des-word" style="width:70px;text-align:right;"  >
                  <span class="word " >别名</span>
                </div>
                <div class="left" >
                  <el-form-item prop="name" >
                    <el-input  v-model="form.name" title="上限4位数" maxLength="4" autocomplete="off" style="width:60px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word special-word" >房号</span>
                </div>
                <div class="left" >
                  <el-form-item prop="roomNum" >
                    <el-input @input="checkNum1" v-model="form.roomNum" title="上限10个字" maxLength="10" autocomplete="off" style="width:60px" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="right  padding-r-2 des-word" style="position: absolute;right: 28px;top: 102px;"  >
                <span class="word " style="color:#999;" >单条以手动修改为准</span>
              </div>
              <div class="break" >

              </div>
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
                    <el-select v-model="form.room"  placeholder=""     style="width:50px;" >
                      <el-option   label=" " value="-1" ></el-option>
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  mearsure-unit">房</div>
                <div class="left"  >
                  <el-form-item prop="hall" >
                    <el-select v-model="form.hall"      style="width:50px;" >
                      <el-option   label=" " value="-1" ></el-option>
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left padding-r-2 mearsure-unit">厅</div>
                <div class="left"  >
                  <el-form-item prop="wei" >
                    <el-select v-model="form.wei"      style="width:50px;" >
                      <el-option   label=" " value="-1" ></el-option>
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 mearsure-unit">卫</div>
                <div class="left padding-r-2 word"  >
                  <el-form-item prop="balcony" >
                    <el-select v-model="form.balcony"      style="width:50px;" >
                      <el-option   label=" " value="-1" ></el-option>
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
                    <el-select v-model="form.orientation"  placeholder=""     style="width:80px;" >
                      <el-option v-for="item in orientationParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:77px;text-align:right;"  >
                  <span class="word " >装修</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="roomDecorate" >
                    <el-select v-model="form.roomDecorate" placeholder=""     style="width:75px;" >
                      <el-option v-for="item in decorateIdParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:58px;text-align:right;"  >
                  <span class="word " >用途</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="roomUse" >
                    <el-select v-model="form.roomUse"  placeholder=""     style="width:70px;" >
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
  import {modifyHouseNum,editorHouseNum}  from '../../../service/newHouse'
  export default {
    props:["newHouseNumValue"],
    data() {
      return {
        dialogNewHouseNum:this.newHouseNumValue,
        villages:[],
        seats:[],
        units:[],
        roomUseParams:[],
        orientationParams:[],
        decorateIdParams:[],
        types:[],
        otherSelect:[0,1,2,3,4,5,6,7,8,9],
        form: {
          id:'',
          isCheck:'1',
          name: '',
          villageName:'',
          villageSeatName:'',
          villageUnitName:'',
          unitId:0,
          projectId:0,
          buildingsId:0,
          floor: '',
          roomNum: '',
          typeId: '',
          room: -1,
          hall: -1,
          wei: -1,
          balcony: -1,
          price: '',
          chooseArea:'2',
          name:'',
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
            let currentPrice = ((price*1)/(inArea*1)*10000).toFixed(2);
            if(isNaN(currentPrice) || !isFinite(currentPrice)){
              this.form.unitPrice = '';
            }else{
              this.form.unitPrice = currentPrice;
            }
          }else{
            this.form.unitPrice = '';
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
            let currentPrice = ((price * 1) / (buildArea * 1)*10000).toFixed(2);
            if(isNaN(currentPrice) || !isFinite(currentPrice)){
              this.form.unitPrice = '';
            }else{
              this.form.unitPrice = currentPrice;
            }
          }else{
            this.form.unitPrice = '';
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
              let currentPrice = ((buildArea*1)*(unitPrice*1)/10000).toFixed(0);
              if(isNaN(currentPrice)){
                this.form.price = '';
              }else{
                this.form.price = currentPrice;
              }
            }else{
              this.form.price = "";
            }
        }else{
          if(inArea != '' && unitPrice != ''){
            let currentPrice = ((inArea*1)*(unitPrice*1)/10000).toFixed(0);
            if(isNaN(currentPrice)){
              this.form.price = '';
            }else{
              this.form.price = currentPrice;
            }
          }else{
            this.form.price = "";
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
            let currentPrice = ((price*1)/(buildArea*1)*10000).toFixed(0);
            if(isNaN(currentPrice) || !isFinite(currentPrice)){
              this.form.unitPrice = '';
            }else{
              this.form.unitPrice = currentPrice;
            }
          }else{
            this.form.unitPrice = "";
          }
        }else{
          if(inArea != '' && price != ''){
            let currentPrice = ((price*1)/(inArea*1)*10000).toFixed(0);
            if(isNaN(currentPrice) || !isFinite(currentPrice)){
              this.form.unitPrice = '';
            }else{
              this.form.unitPrice = currentPrice;
            }
          }else{
            this.form.unitPrice = "";
          }
        }
      },
      editorHouseNum(obj,id){
        this.dialogNewHouseNum = true;
        this.form.villageName = obj.villageName;
        this.form.villageSeatName = obj.seatName;
        this.form.villageUnitName = obj.unitName;
        this.form.unitId = obj.unit;
        this.form.projectId = obj.villageId;
        this.form.buildingsId = obj.villageSeatId;
        this.form.id = id;
        this.getSelectData();
      },
      getSelectData(){
        let _this = this;
        let id = this.form.id;
        let projectId = this.form.projectId;
        editorHouseNum(id,projectId).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let room = response.data.room;
            let initArr = [{id:"0",name:" "}];
            let roomUseParams = params.roomUseParams;
            let orientationParams = params.orientationParams;
            let decorateIdParams = params.decorateIdParams;
            let types = params.types;
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
            let floor = _this.form.floor;
            if(floor == '-1'){
              _this.form.floor = '';
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
          floor = -1;
        }
        modifyHouseNum(form).then(function(response){
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
