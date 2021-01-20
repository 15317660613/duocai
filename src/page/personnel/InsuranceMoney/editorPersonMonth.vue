<template>
  <div style="width: 100%;padding: 0px 10px;">
    <div class="pop-up">
      <div class="pop-up-container" style="height:452px;overflow-y:auto;overflow-x:hidden;position: relative;" >
        <el-form ref="form"  :model="form" >
          <div class="clear" >
            <div class="left center-fundation"  >
              <div class="clear" >
                <div class="left" style="padding:3px 0 0 15px">
                  <span class="des-word" style="width: 80px;">首次缴存年月</span>
                </div>
                <div class="left padding-l-2" style="padding-top:5px">
                  <el-form-item label label-width="0" prop="time">
                    <el-date-picker
                      size="mini"
                      type="month"
                      v-model="form.firstTime"
                      :disabled="true"
                      style="width: 91px;"
                      format="yyyy-MM"
                      value-format="yyyy-MM"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left" style="padding:3px 0 0 15px">
                  <span class="word require-word" style="width: 60px;">缴存基数</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="insuranceBaseNum" style="height: 30px;width: 88px;margin-top: 3px;">
                    <el-input  style="" :disabled="true" v-model.trim="form.insuranceBaseNum"   autocomplete="off" title="缴存基数"></el-input>
                  </el-form-item>
                </div>
                <div class="left" style="padding:9px 0 0 1px">
                  <span>元</span>
                </div>
                <div class="left" style="padding:3px 0 0 15px">
                  <span class="word" style="width: 60px;">大额门诊</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="largeOutpatientNum" style="height: 30px;width: 88px;margin-top: 3px;">
                    <el-input  style="" :disabled="true" v-model.trim="form.largeOutpatientNum"   autocomplete="off" title="大额门诊"></el-input>
                  </el-form-item>
                </div>
                <div class="left" style="padding:9px 0 0 1px">
                  <span>元</span>
                </div>
              </div>
            </div>
            </div>
          <div class="break" >
          </div>
          <div class="optionContent" style="width: 100%;">
            <div class="IMoptions clear">
              <div class="left">
                <span class="word">生育险</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 15px;">公司</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentageCom_1" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form.percentageCom_1" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="priceCom_1" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.priceCom_1" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 50px;">个人</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentagePer_1" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form.percentagePer_1"  autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="pricePer_1" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.pricePer_1" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
            </div>
            <div class="IMoptions clear">
              <div class="left">
                <span class="word">工伤险</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 15px;">公司</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentageCom_2" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style="" :disabled="true"  v-model="form.percentageCom_2" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="priceCom_2" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true"  v-model="form.priceCom_2" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 50px;">个人</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentagePer_2" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form.percentagePer_2"  autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="pricePer_2" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.pricePer_2"  autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
            </div>
            <div class="IMoptions clear">
              <div class="left">
                <span class="word">养老险</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 15px;">公司</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentageCom_3" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style=""  :disabled="true" v-model="form.percentageCom_3" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="priceCom_3" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.priceCom_3"  autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 50px;">个人</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentagePer_3" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form.percentagePer_3"  autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="pricePer_3" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.pricePer_3" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
            </div>
            <div class="IMoptions clear">
              <div class="left">
                <span class="word">失业险</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 15px;">公司</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentageCom_4" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form.percentageCom_4" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="priceCom_4" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.priceCom_4" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 50px;">个人</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentagePer_4" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form.percentagePer_4" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="pricePer_4" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.pricePer_4" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
            </div>
            <div class="IMoptions clear">
              <div class="left">
                <span class="word">医疗险</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 15px;">公司</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentageCom_5" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form.percentageCom_5"  autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="priceCom_5" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.priceCom_5"  autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 50px;">个人</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentagePer_5" style="height: 30px;width: 45px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form.percentagePer_5" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="pricePer_5" style="height: 30px;width: 45px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.pricePer_5"  autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
            </div>
          </div>
          <div class="break" >
          </div>
          <div class="totalcontent">
            <div class="IMoptions clear">
              <div class="left">
                <span class="word">月缴额</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 15px;">公司</span>
              </div>
              <div class="left" >
                <el-form-item  prop="priceCom_total" style="height: 30px;width: 107px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form.priceCom_total" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 50px;">个人</span>
              </div>
              <div class="left" >
                <el-form-item  prop="pricePer_total" style="height: 30px;width: 101px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form.pricePer_total" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
            </div>
          </div>
          <div class="break" >
          </div>
          <div class="othercontent clear" style="padding-top: 5px;">
            <div class="left">
              <span class="des-word" >状态</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0">
                <el-select :disabled="isClosingAccounts"   style="width:100px;"  v-model="form.state" >
                  <el-option v-for="item in stateParams" :label="item.name" :value="item.id"  style="width: 100px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left">
              <span class="des-word" >用工</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0" >
                <el-select  :disabled="isClosingAccounts"  style="width:100px;" v-model="form.useId"  >
                  <el-option v-for="item in useParams" :label="item.name" :value="item.id"  style="width: 100px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left">
              <span class="des-word" >缴存</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0">
                <el-select   :disabled="isClosingAccounts" style="width:100px;"  v-model="form.deposit">
                  <el-option v-for="item in depositParams"  :label="item.name" :value="item.id"  style="width: 100px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
            
            
          </div>
          <div class="remarkcontent">
            <div class="left">
              <span class="des-word" >备注</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0">
                <el-input
                  :disabled="isClosingAccounts"
                  type="textarea"
                  style="width: 450px;"
                  :rows="4"
                  title="上限500个字"
                  maxlength="500"
                  v-model="myremark">
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>

      <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
        <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 10px;" >
          <div class="left" style="padding-right:7px;"  >
            <i class="up-page-icon" @click="upPage($event)" ></i>
          </div>
          <div class="left" >
            <i class="down-page-icon" @click="downPage($event)" ></i>
          </div>
        </div>
        <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
      </div>
    </div>
    <div class="clear footerabsoluteclass">
      <div class="left footerabsoluteclasschild" >
        <span class="record-word" style="margin-left:0px;">首次录入:</span>
        <span v-if="form.createBy" class="record-word">{{form.createBy}}</span>
        <span v-if="form.createTime" class="record-word">{{form.createTime}}</span>
        <span class="record-word footerpaddingleft10">最后修改:</span>
        <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
        <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
      </div>
    </div> 
  </div>
</template>

<script>
import 
  { InsuranceMoneyodeparttree,
    newAddInsuranceMoney,
    InsuranceMoneyParams,
    userInsuranceDetail,
    userInsuranceUpdate
  } from "../../../service/InsuranceMoney"
import CheckSelect from "../../../components/check";
import layer from 'vue-layer';
export default {
  props:['myid','mythisindex','layerid'],
  data() {
    return {
      id:this.myid,
      thisindex:this.mythisindex,
      myremark:'',
      useParams:[],
      depositParams:[],
      isClosingAccounts:false,
      stateParams:[],
      form:{
        state:'',
        deposit:'',
        useId:'',
        remark:'',
        firstTime:'',
        type:'保险',
        userId:'',
        time:'',
      }
    };
  },
  components: {
    CheckSelect
  },
  methods: {
    
    getUserInsuranceDetail(){
      let thisid = this.id;
      let _this = this;
      let myform = {};
      userInsuranceDetail(thisid,_this.form.type).then(function (response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          console.log("请求详情成功");
          // if(response.data.insuranceData){
          //   _this.form = response.data.insuranceData
          // };
          if(response.data.insuranceData){
             let data = response.data.insuranceData;
             for(let attr in data){
                if(data[attr] != null){
                  _this.form[attr] =  data[attr];
                }
             }
             if(data.isClosingAccounts=='1'){
              _this.isClosingAccounts = true;
             }else{
              _this.isClosingAccounts = false;
             }
          }
          if(response.data.params){
            _this.useParams = response.data.params.useParams;
            _this.depositParams = response.data.params.depositParams;
            _this.stateParams = response.data.params.stateParams;
          };
          if(response.data.insurance){
            _this.form.state = response.data.insurance.state;
            _this.form.deposit = response.data.insurance.deposit;
            _this.form.useId = response.data.insurance.useId;
            _this.form.remark = response.data.insurance.remark;
            _this.form.firstTime = response.data.insurance.firstTime;
            _this.form.time = response.data.insurance.time;
            _this.form.userId = response.data.insurance.userId;
            _this.form.createBy = response.data.insurance.createBy;
            _this.form.createTime = response.data.insurance.createTime;
            _this.form.updateBy = response.data.insurance.updateBy;
            _this.form.updateTime = response.data.insurance.updateTime;
          }
          _this.myremark = _this.form.remark;
          console.log(_this.form);
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }

      })
    },
    saveFormData(){
      let myform = {
        id:this.id,
        time:this.form.time,
        type:this.form.type,
        state:this.form.state,
        useId:this.form.useId,
        deposit:this.form.deposit,
        remark:this.myremark,
        userId:this.form.userId,
      };
      userInsuranceUpdate(myform).then(res => {
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              this.$parent.searchInsuranceMoneyList();
              this.clearFormData();
            })
            .catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      })
    },
    clearFormData() {
      this.$layer.close(this.layerid);
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
      let callbackdata = this.$parent.changeTitle(count,needlayerid,1);
      this.id = callbackdata.rowid;
      this.thisindex = callbackdata.thisindex;
      this.getUserInsuranceDetail();
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
      let callbackdata = this.$parent.changeTitle(count,needlayerid,2)
      this.id = callbackdata.rowid;
      this.thisindex = callbackdata.thisindex;
      this.getUserInsuranceDetail();
    },
  },


  mounted() {
   this.getUserInsuranceDetail();
  },
  beforeDestroy(){
    let _this = this;
    console.log(_this.$store.state.layerifranme);
    _this.$store.state.layerifranme.forEach((item,index)=>{
      if(item.thisrowid == _this.id){
        _this.$store.state.layerifranme.splice(index,1);
      }
    })
    _this.$parent.shadenum();
  },
};
</script>
<style type="text/css" scoped="">
  /deep/ .IMoptions{
    padding: 5px 0 5px 25px;
  }
  .content {
    height:300px;
    width: 500px;
    position: relative;
    padding: 0px 20px 20px 20px;
    overflow-y: auto;
  }
</style>
<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>