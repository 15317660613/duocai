<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="新增户型" width="550px" @close="clearFormData" :visible.sync="dialogVisible" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 162px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:0px;" >
                <div class="clear" >
                  <div class="left padding-r-2" style="width:60px;text-align:center;" >
                    <span class="word require-word" >户型名称</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="typeName" >
                      <el-input @input="checkTypeName"  v-model="form.typeName" title="A-Z任意一个字母" maxlength="1" style="width:340px;" ></el-input>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear" >
                  <div class="left padding-r-2" style="width:60px;text-align:right;" >
                    <span class="word " >户型</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="roomShape1" >
                      <el-select v-model="form.roomShape1"    style="width:65px;" >
                        <el-option v-for="item in apartmentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word " >房</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="roomShape2" >
                      <el-select  v-model="form.roomShape2"    style="width:65px;" >
                        <el-option v-for="item in apartmentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word " >厅</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="roomShape3" >
                      <el-select v-model="form.roomShape3"    style="width:65px;" >
                        <el-option v-for="item in apartmentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word " >卫</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="roomShape4" >
                      <el-select v-model="form.roomShape4"    style="width:65px;" >
                        <el-option v-for="item in apartmentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3"  >
                    <span class="word " >阳台</span>
                  </div>
                </div>
                <div class="clear"  >
                  <div class="left padding-r-2" style="width:60px;text-align:right;" >
                    <span class="word " >面积</span>
                  </div>
                  <div class="left padding-r-2">
                    <el-form-item  prop="areaLow" >
                      <el-input @input="checkNum1"  v-model="form.areaLow" title="上限10位数" maxlength="13"  style="width:80px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left">
                    <el-form-item  prop="areaHigh" >
                      <el-input @input="checkNum2"  v-model="form.areaHigh" title="上限10位数" maxlength="13" style="width:80px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" >
                    <span class="word " >㎡</span>
                  </div>
                  <div class="left padding-r-2" style="padding-left:30px;" >
                    <span class="word " >均价</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="avePrice" >
                      <el-input @input="checkNum3"  v-model="form.avePrice" title="上限10位数" maxlength="13" style="width:105px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left " >
                    <span class="word " >元/㎡</span>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-2"  style="width:60px;text-align:right;" >
                    <span class="word " >用途</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="roomUseId" >
                      <el-select  v-model="form.roomUseId"    style="width:160px;" >
                        <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" style="padding-left:47px;" >
                    <span class="word " >装修</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="decorateId" >
                      <el-select v-model="form.decorateId"    style="width:105px;" >
                        <el-option v-for="item in decorateIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-2"  style="width:60px;text-align:right;" >
                    <span class="word " >在售栋数</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="saleBuildingCount" >
                      <el-input @input="checkNum4"  v-model="form.saleBuildingCount" title="上限4位数" maxlength="4" style="width:75px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word " >在售面积</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="saleArea" >
                      <el-input @input="checkNum5"  v-model="form.saleArea" title="上限10位数" maxlength="10" style="width:78px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  >
                    <span class="word " >在售套数</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="saleHouseCount" >
                      <el-input @input="checkNum6"  v-model="form.saleHouseCount" title="上限10位数" maxlength="10" style="width:78px;" ></el-input>
                    </el-form-item>
                  </div>
                </div>

              </div>
              <div style="position:absolute;bottom:15px;right:240px;" >
                <div class="left" style="padding:5px 0 0 0;" >
                  <el-checkbox type="checkbox" v-model="form.isHighQuality" value="1" :false-label="0" :true-label="1"  />
                </div>
                <div class="left" style="padding:7px 0 0 5px;" >
                  <span >主力户型</span>
                </div>

              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">

          <span class="right save-cancel-btn" @click="dialogVisible = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>

  import {apartmentParams,addApartment} from '../../../service/newHouse'
  import {rentConstParam} from '../../../utils/rentParam'
  export default {
    props:["newApartmentVisible"],
    data() {
      return {
        dialogVisible:this.newApartmentVisible,
        apartmentSelect:rentConstParam,
        houseName:'',
        roomUseParams:[],
        decorateIdParams:[],
        form:{
          id:'',
          projectId:'',
          typeName:'',
          roomShape1:'-1',
          roomShape2:'-1',
          roomShape3:'-1',
          roomShape4:'-1',
          areaLow:'',
          areaHigh:'',
          avePrice:'',
          roomUseId:'0',
          decorateId:'0',
          saleBuildingCount:'',
          saleArea:'',
          saleHouseCount:'',
          isHighQuality:0,
        },
      };
    },
    components:{

    },
    methods:{
      checkTypeName(){
        this.form.typeName = this.form.typeName.replace(/[^A-Z]/g,'');
      },
      checkNum1(item){
        this.form.areaLow = this.form.areaLow.replace(/[^\.\d]/g,'');
      },
      checkNum2(item){
        this.form.areaHigh = this.form.areaHigh.replace(/[^\.\d]/g,'');
      },
      checkNum3(item){
        this.form.avePrice = this.form.avePrice.replace(/[^\.\d]/g,'');
      },
      checkNum4(item){
        this.form.saleBuildingCount = this.form.saleBuildingCount.replace(/[^\.\d]/g,'');
      },
      checkNum5(item){
        this.form.saleArea = this.form.saleArea.replace(/[^\.\d]/g,'');
      },
      checkNum6(item){
        this.form.saleHouseCount = this.form.saleHouseCount.replace(/[^\.\d]/g,'');
      },
      showDialog(id){
        this.dialogVisible = true;
        this.form.projectId = id;
        this.getApartmentParams();
      },
      getApartmentParams(){
        let _this = this;
        apartmentParams().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{id:"0",name:" "}];
              _this.roomUseParams = initArr.concat(data.roomUseParams);
              _this.decorateIdParams = initArr.concat(data.decorateIdParams);
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      saveData(){
        let _this =  this;
        let form = JSON.parse(JSON.stringify(this.form));
        let typeName = form.typeName;

        if(!typeName){
          this.myAlert("户型名称为空！",'dangerous-icon');
          return false;
        }

       
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        addApartment(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功!",'success-icon').then(res => {

              _this.clearFormData();
              _this.$emit("reloadApartmentList");
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      clearFormData(){
        this.dialogVisible = false;
        this.form.isHighQuality = 0;
        this.connectionList = [
          {
            contactEmp:'',
            contactPhone:'',
            deleted:0,
          }
        ];
        this.$refs.formsData.resetFields();

      },
    },
    watch:{
      'form.areaLow':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.areaLow = undefined;
            return;
          }
          this.form.areaLow = oldval
        } else {
          this.form.areaLow = newval.replace(/^\./g, "")
        }
      },
      'form.areaHigh':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.areaHigh = undefined;
            return;
          }
          this.form.areaHigh = oldval
        } else {
          this.form.areaHigh = newval.replace(/^\./g, "")
        }
      },
      'form.avePrice':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.avePrice = undefined;
            return;
          }
          this.form.avePrice = oldval
        } else {
          this.form.avePrice = newval.replace(/^\./g, "")
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 0px 30px;
    overflow:auto;
    .remark{
      border:1px solid #aaa;
      border-radius:3px;
      font-size:12px;
    }
    .padding-r-2{
      padding-right:2px;
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
    color:#000080;
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
    color:#000080;
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
    color:#000080;
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
    color:#000080;
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
    color:#000080;
  }
  .link-customer-icon{
    background:url(../../../images/icon.png) -366px -140px;
    width:25px;
    height:32px;
    display:block;
    cursor:pointer;
  }
  .add-icon{
    background:url(../../../images/icon.png) -213px -172px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
  .deleted-icon{
    background:url(../../../images/icon.png) -240px -172px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
</style>
