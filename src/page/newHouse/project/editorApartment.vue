<template>
  <div style="width:100%;padding:0px 10px;">
      <div class="pop-up" style="width:100%;height: 200px;" >
        <div class="pop-up-container " >
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:0px;" >
                <div class="clear" >
                  <div class="left padding-r-2" style="width:60px;text-align:center;" >
                    <span class="word require-word" >户型名称</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="typeName" >
                      <el-input @input="checkTypeName"  v-model="form.typeName" title="A-Z任意一个字母" maxlength="1" style="width:370px;" ></el-input>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear" >
                  <div class="left padding-r-2" style="width:60px;text-align:right;" >
                    <span class="word " >户型</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="roomShape1" >
                      <el-select v-model="form.roomShape1"    style="width:75px;" >
                        <el-option v-for="item in apartmentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word " >房</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="roomShape2" >
                      <el-select  v-model="form.roomShape2"    style="width:75px;" >
                        <el-option v-for="item in apartmentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word " >厅</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="roomShape3" >
                      <el-select v-model="form.roomShape3"    style="width:75px;" >
                        <el-option v-for="item in apartmentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word " >卫</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="roomShape4" >
                      <el-select v-model="form.roomShape4"    style="width:75px;" >
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
                  <div class="left padding-r-2" style="padding-left:60px;" >
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
                  <div class="left padding-r-2" style="padding-left:77px;" >
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
                      <el-input @input="checkNum4"  v-model="form.saleBuildingCount" title="上限4位数" maxlength="4" style="width:85px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word " >在售面积</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="saleArea" >
                      <el-input @input="checkNum5"  v-model="form.saleArea" title="上限10位数" maxlength="10" style="width:88px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  >
                    <span class="word " >在售套数</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="saleHouseCount" >
                      <el-input @input="checkNum6"  v-model="form.saleHouseCount" title="上限10位数" maxlength="10" style="width:88px;" ></el-input>
                    </el-form-item>
                  </div>
                </div>

              </div>
            </el-form>
          </div>
        </div>

        <div slot="footer" class="dialog-footer clear" style="margin-top: 2px;">
          <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 10px;" >
            <div class="left" style="padding-right:7px;"  >
              <i class="up-page-icon" @click="upPage($event)" ></i>
            </div>
            <div class="left" >
              <i class="down-page-icon" @click="downPage($event)" ></i>
            </div>
          </div>

          <div style="margin-left: 220px;" >
            <div class="left" style="padding:5px 0 0 0;" >
              <el-checkbox type="checkbox" v-model="form.isHighQuality" :false-label="0" :true-label="1"  />
            </div>
            <div class="left" style="padding:7px 0 0 5px;" >
              <span >主力户型</span>
            </div>

          </div>
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
  </div>
</template>
<script>

  import {editorApartment,modifyApartment} from '../../../service/newHouse'
  import {rentConstParam} from '../../../utils/rentParam'
  export default {
    props:["editorApartmentVisible","id","projectId","typeName","thisindex","layerid"],
    data() {
      return {
        dialogVisible:this.editorApartmentVisible,
        apartmentSelect:rentConstParam,
        apartmentName:'',
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
      showDialog(){
        this.form.projectId = this.projectId;
        this.form.id = this.id;
        this.apartmentName = this.typeName;
        this.getApartmentParams();
      },
      getApartmentParams(){
        let _this = this;
        let id = _this.form.id;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        editorApartment(id).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let initArr = [{id:"0",name:" "}];
            _this.roomUseParams = initArr.concat(params.roomUseParams);
            _this.decorateIdParams = initArr.concat(params.decorateIdParams);
            let form = response.data.houseType;
            for(let arr in form ){
              if(form[arr] == null){
                form[arr] = "";
              }
            }
           
            form.isHighQuality = form.isHighQuality*1;
            _this.form = form;
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

        if(!form.isHighQuality){
          form.isHighQuality = 0;
        }else{
          form.isHighQuality = 1;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        modifyApartment(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功!",'success-icon').then(res => {

              _this.$layer.close(_this.layerid);
              _this.$parent.reloadApartmentList();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      clearFormData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },

      upPage(e){
        let count = this.thisindex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata = this.$parent.changeTitle(count-1,needlayerid);
        this.thisindex = callbackdata.thisindex;
        this.form.id = callbackdata.row.id;
        this.form.projectId = callbackdata.row.projectId;
        this.apartmentName = callbackdata.row.typeName;
        this.getApartmentParams();
      },

      downPage(e){
        let count = this.thisindex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata = this.$parent.changeTitle(count+1,needlayerid);
        this.thisindex = callbackdata.thisindex;
        this.form.id = callbackdata.row.id;
        this.form.projectId = callbackdata.row.projectId;
        this.apartmentName = callbackdata.row.typeName;
        this.getApartmentParams();
      },
    },
    mounted(){
      this.showDialog();
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
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
    },
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 0px 10px;
    height:155px;
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
