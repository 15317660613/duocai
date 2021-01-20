<template>
  <div style="padding: 0px 10px;width: 100%;">
    <div class="pop-up">
      <div class="pop-up-container" style="height:250px;overflow-y:auto;overflow-x:hidden;position: relative;" >
        <el-form ref="form1"  :model="form1" >
          <div class="clear">
            <div class="left center-fundation"  >
              <div class="clear" >
                <div class="left" style="padding:3px 0 0 40px">
                  <span class="des-word" style="width: 80px;">首次缴存年月</span>
                </div>
                <div class="left padding-l-2" style="padding-top:5px">
                  <el-form-item label label-width="0">
                    <el-date-picker
                      size="mini"
                      type="month"
                      v-model="form1.time"
                      :disabled="true"
                      style="width: 91px;"
                      format="yyyy-MM"
                      value-format="yyyy-MM"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left" style="padding:3px 0 0 53px">
                  <span class="word require-word" style="width: 65px;">缴存基数</span>
                </div>
                <div class="left" >
                  <el-form-item style="height: 30px;width: 88px;margin-top: 3px;">
                    <el-input  style="" :disabled="true" v-model.trim="form1.insuranceBaseNum"   autocomplete="off" title="缴存基数"></el-input>
                  </el-form-item>
                </div>
                <div class="left" style="padding:9px 0 0 1px">
                  <span>元</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="break" >
          </div> -->
          <div class="totalcontent">
            <div class="IMoptions clear">
              <div class="left">
                <span class="word">月缴额</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 15px;">公司</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentageCom_6" style="height: 30px;width: 50px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form1.percentageCom_6" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="priceCom_total2" style="height: 30px;width: 50px;margin-top: 0px;">
                  <el-input  style="" :disabled="true" v-model="form1.priceCom_total2" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
              <div class="left">
                <span class="word" style="margin-left: 50px;">个人</span>
              </div>
              <div class="left" >
                <el-form-item  prop="percentagePer_6" style="height: 30px;width: 50px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form1.percentagePer_6" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">%</span>
              </div>
              <div class="left" >
                <el-form-item  prop="pricePer_total2" style="height: 30px;width: 50px;margin-top: 0px;margin-left: 5px;">
                  <el-input  style="" :disabled="true" v-model="form1.pricePer_total2" autocomplete="off"  ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="word">元</span>
              </div>
            </div>
          </div>
          <div class="break" >
          </div>
          <div class="othercontent clear" style="padding: 5px 0 0px 20px;">
            <div class="left">
              <span class="des-word" >状态</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0">
                <el-select  :disabled="isClosingAccounts"  style="width:80px;"  v-model="form1.state" >
                  <el-option v-for="item in stateParams" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left">
              <span class="des-word" >持卡状态</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0" >
                <el-select   :disabled="isClosingAccounts" style="width:100px;" v-model="form1.cardHolding"  >
                  <el-option v-for="item in useParams" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left">
              <span class="des-word" style="width: 35px;">缴存</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0">
                <el-select  :disabled="isClosingAccounts"  style="width:80px;"  v-model="form1.deposit">
                  <el-option v-for="item in depositParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            
            
          </div>
          <div class="clear" style="padding-left:20px;">
            <div class="left">
              <span class="des-word" >个人代码</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0">
                <el-input
                  :disabled="isClosingAccounts"
                  type="text"
                  v-model="form1.personCode"
                  style="width: 350px;"
                  maxlength="100"
                  title="上限100个字">
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear" style="padding: 5px 0 5px 20px;">
            <div class="left">
              <span class="des-word" >备注</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0">
                <el-input
                  :disabled="isClosingAccounts"
                  type="textarea"
                  style="width: 350px;"
                  :rows="3"
                  title="上限500个字"
                  maxlength="500"
                  v-model="form1.remark">
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
      stateParams:[],
      useParams:[],
      getId:this.myid,
      thisindex:this.mythisindex,
      depositParams:[],
      isClosingAccounts:false,
      form1:{
        time:'',
        remark:'',
        cardHolding:'',
        deposit:'',
        state:'',
        personCode:'',
        type:'公积金',
        userId:'',
        priceCom_total2:'',
        pricePer_total2:'',
        percentageCom_6:'',
        percentagePer_6:'',
      },
      form:{
        createBy:'',
        createTime:'',
        updateBy:'',
        updateTime:'',
      },
    };
  },
  components: {
    CheckSelect
  },
  methods: {
    
    getUserInsuranceDetail(){
      let thisid = this.getId;
      let _this = this;
      _this.$layer.loading({
        shade: true //是否显示遮罩
      });
      userInsuranceDetail(thisid,_this.form1.type).then(function (response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          console.log("请求详情成功");
          if(response.data.insuranceData){
             let data = response.data.insuranceData;
             for(let attr in data){
                if(data[attr] != null){
                  _this.form1[attr] =  data[attr];
                }
             }
             if(data.isClosingAccounts=='1'){
              _this.isClosingAccounts = true;
             }else{
              _this.isClosingAccounts = false;
             }
          }
          
          if(response.data.params){
            _this.stateParams = response.data.params.stateParams;
            _this.useParams = response.data.params.paramIdParams;
            _this.depositParams = response.data.params.depositParams;
          };
          
          if(response.data.insurance){
            _this.form1.remark = response.data.insurance.remark;
            _this.form1.state = response.data.insurance.state;
            _this.form1.cardHolding = response.data.insurance.cardHolding;
            _this.form1.deposit = response.data.insurance.deposit;
            _this.form1.time = response.data.insurance.time;
            _this.form1.userId = response.data.insurance.userId;
            _this.form1.personCode = response.data.insurance.personCode;
            _this.form1.priceCom_total2 = response.data.insuranceData.priceCom_total2;
            _this.form1.pricePer_total2 = response.data.insuranceData.pricePer_total2;
            _this.form1.percentageCom_6 = response.data.insuranceData.percentageCom_6;
            _this.form1.percentagePer_6 = response.data.insuranceData.percentagePer_6;

            _this.form.createBy = response.data.insurance.createBy;
            _this.form.createTime = response.data.insurance.createTime;
            _this.form.updateBy = response.data.insurance.updateBy;
            _this.form.updateTime = response.data.insurance.updateTime;
            
            console.log(_this.form1);
          }
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }

      })
    },
    saveFormData(){
      let myform = {
        id:this.getId,
        time:this.form1.time,
        type:this.form1.type,
        state:this.form1.state,
        cardHolding:this.form1.cardHolding,
        deposit:this.form1.deposit,
        personCode:this.form1.personCode,
        remark:this.form1.remark,
        userId:this.form1.userId,
      };

      for(let i in myform ){
        if(myform[i]==null||myform[i]=="null"){
          myform[i] = ''
        }
      }
      debugger;
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      userInsuranceUpdate(myform).then(res => {
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          this.clearFormData();
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
      this.getId = callbackdata.rowid;
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
      this.getId = callbackdata.rowid;
      this.thisindex = callbackdata.thisindex;
      this.getUserInsuranceDetail();
    },
  },
  mounted() {
   this.getUserInsuranceDetail();
  },
  beforeDestroy(){
    let _this = this;
    _this.$store.state.layerifranme.forEach((item,index)=>{
      if(item.thisrowid == _this.getId){
        _this.$store.state.layerifranme.splice(index,1);
      }
    })
    _this.$parent.shadenum();
  },
};
</script>
<style type="text/css" scoped="">
  /deep/ .IMoptions{
    padding: 5px 0 5px 15px;
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