<template>
  <div style="width: 100%;padding: 0px 10px;">
      <div class="pop-up">
        <div class="pop-up-container" style="height:328px;overflow-y:auto;overflow-x:hidden;position: relative;padding: 5px;margin: 10px;" >
          <el-form ref="formsData"  :model="formNA" >
            <div class="clear" >
              <div class="left center-fundation">
                <div class="clear">
                  <div class="left padding-l-15" style="padding-left:10px" >
                    <span class="des-word">缴存年月</span>
                  </div>

                  <div class="left">
                    <el-form-item label label-width="0">
                      <el-date-picker size="mini" :disabled='true' :default-value="time" type="month"   value-format="yyyy-MM" v-model="thistime" style="width: 90px;"></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </div>

            </div>
            <div class="break" >
            </div>
            <div class="optionContent" style="width: 100%;">
              <div class="IMoptions clear" style="margin-left:66px;">
                <div class="left">
                  <span class="word" style="display: inline-block;width: 47px;">公积金</span>
                </div>
                <div class="left padding-l-15" style="padding-left:10px" >
                  <span class="des-word">缴存基数</span>
                </div>
                <div class="left">
                  <el-form-item label label-width="0">
                    <el-input  title="" maxlength="10" :disabled='true' style="width:90px;" v-model='formNA.insuranceBaseNum' autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
                <div class="left">
                  <span  class="des-word" style="width: 18px;">元</span>
                </div>
              </div>
              <div class="IMoptions clear" style="margin-left:66px;">
                <div class="left">
                  <span class="word" style="display: inline-block;width: 47px;">公积金</span>
                </div>
                <div class="left">
                  <span class="word" style="margin-left: 15px;">公司</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="percentageCom_1" style="height: 30px;width: 55px;margin-top: 0px;">
                    <el-input  style="" :disabled="true" v-model="formNA.percentageCom" autocomplete="off"  ></el-input>
                  </el-form-item>
                </div>
                <div class="left">
                  <span class="word">%</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="priceCom_1" style="height: 30px;width: 55px;margin-top: 0px;margin-left: 5px;">
                    <el-input  style="" :disabled="true" v-model="formNA.priceCom" autocomplete="off"  ></el-input>
                  </el-form-item>
                </div>
                <div class="left">
                  <span class="word">元</span>
                </div>
                <div class="left">
                  <span class="word" style="margin-left: 50px;">个人</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="percentagePer_1" style="height: 30px;width: 55px;margin-top: 0px;">
                    <el-input  style="" :disabled="true" v-model="formNA.percentagePer"  autocomplete="off"  ></el-input>
                  </el-form-item>
                </div>
                <div class="left">
                  <span class="word">%</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="pricePer_1" style="height: 30px;width: 55px;margin-top: 0px;margin-left: 5px;">
                    <el-input  style="" :disabled="true" v-model="formNA.pricePer" autocomplete="off"  ></el-input>
                  </el-form-item>
                </div>
                <div class="left">
                  <span class="word">元</span>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>

  </div>
</template>

<script>
import { departperson } from "../../../service/organizeDate";
import { userSalaryGetInsurance } from "../../../service/SalaryDetails";
import { userInsuranceDetail } from "../../../service/InsuranceMoney";


import CheckSelectSpecial from '../../../components/checkSpecial'
import CheckSelect from "../../../components/check";

// 个人模拟数据
import { mySalaryDetailsListContent } from '../../../utils/mySalaryDetailsList';

export default {
  props:['thisnum','thistime','thisuserId','thismytype'],
  data() {
    return {
      lageMoney:'',
      listdata:[],
      thistype:this.thismytype,
      time:this.thistime,
      formNA:{
        insuranceBaseNum:'',
        percentageCom:'',
        priceCom:'',
        percentagePer:'',
        pricePer:'',
      }
    };
  },
  components: {

  },
  methods: {
    getParamsData(){
      let _this = this;
      let form = {
        type:'2',
        userId:_this.thisuserId,
        time:_this.time,
        num:_this.thisnum
      };
      userSalaryGetInsurance(form).then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          if(data.insurance){
            _this.formNA.insuranceBaseNum = data.insurance.insuranceBaseNum;
            _this.formNA.largeOutpatientNum = data.insurance.largeOutpatientNum;
          };
          if(data.list){
            _this.listdata = data.list;
            _this.formNA.percentageCom = data.list[0].percentageCom;
            _this.formNA.priceCom = data.list[0].priceCom;
            _this.formNA.percentagePer = data.list[0].percentagePer;
            _this.formNA.pricePer = data.list[0].pricePer;
          }
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })

    },
  },
  mounted(){
    this.getParamsData();
  }
};
</script>
<style type="text/css" scoped="">
  /deep/ .search-container {
    width: calc(100% - 10px);
    margin: 5px auto 0 5px;
    border-style: 2px solid;
    line-height: 23px;
  }
</style>
<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>