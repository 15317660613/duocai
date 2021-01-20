<template>
  <div style="padding: 0px 10px;width: 100%;">
      <div class="pop-up">
        <div class="pop-up-container" style="height:328px;overflow-y:auto;overflow-x:hidden;position: relative;padding: 5px;margin: 10px;" >
          <el-form ref="formsData"  :model="form" >
            <div class="clear" >
              <div class="left center-fundation">
                <div class="clear">
                  <div class="left padding-l-15" style="padding-left:10px" >
                    <span class="des-word" style="width: 75px;">实际出勤天数</span>
                  </div>

                  <div class="left">
                    <el-form-item label label-width="0">
                      <el-input  title="" maxlength="30" :disabled='true' style="width:80px;" v-model='sjcqts' autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left" style="padding-left: 3px;">
                    <el-form-item label label-width="0" prop="departId111">
                      <el-select    style="width:70px;" disabled  v-model="autoORhandDefault">
                        <el-option v-for="item in autoORhand" :label="item.name" :value="item.id"  style="width: 80px;"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left" style="padding-left: 50px;">
                    <el-form-item label label-width="0" prop="departId111">
                      <el-input  title="" maxlength="30" :disabled='true' style="width:250px;" v-model='timeremark' autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear">
                  <div class="left" style="margin-left: 96px;">
                    <span style="font-weight: bold;">次数</span>
                  </div>
                  <div class="left" style="margin-left: 70px;">
                    <span style="font-weight: bold;">扣款</span>
                  </div>
                  <div class="left" style="margin-left: 175px;">
                    <span style="font-weight: bold;">备注</span>
                  </div>
                </div>
                
              </div>

            </div>
            <div class="break" >
            </div>
            <div style="overflow-y: auto;">
              <div v-for='item in SalaryDetailsParams' class="clear">
                <div class="left" style="width: 70px;text-align: right;">
                  <span class="des-word" style="width: 70px;">{{item.paramName}}</span>
                </div>
                <div class="left " style="padding-left:3px;"  >
                  <el-form-item prop="word" label-width="0">
                    <el-input  title="" maxlength="10" style="width:80px;" disabled v-model='item.paramNum' autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
                <div class="left " style="padding-left:3px;"  >
                  <el-form-item prop="word" label-width="0">
                    <el-input  title="" maxlength="10" style="width:80px;" disabled v-model='item.price' autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
                <div class="left " style="padding-left:3px;margin-top: 6px;"  >
                  <span>元</span>
                </div>
                <div class="left " style="padding-left:23px;"  >
                  <el-form-item  label-width="0">
                    <el-input  title="上限30个字" maxlength="30" style="width:250px;" disabled v-model='item.remark' autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>

  </div>
</template>

<script>
import { userSalaryGetAttendanceMonth  } from "../../../service/SalaryDetails";


export default {
  props:['thisnum','thistime','thisuserId'],
  data() {
    return {
      executorId111:'executorId111',
      autoORhand:[{id:'1',name:'自动'},{id:'2',name:'手动'}],
      autoORhandDefault:'1',
      timeremark:'',
      executorList111:[{ id: "-1", name: "全部", select: true }],
      departParams111:[],
      departId111:'departId111',
      SalaryDetailsParams:[],
      sjcqts:1,
      currentPage:null,
      
      formNA:{
        time:''
      },
      form:{

      }
    };
  },
  components: {

  },
  methods: {
    getParamsData(){
      let _this = this;
      let form = {
        num:_this.thisnum,
        time:_this.thistime,
        userId:_this.thisuserId,
      };
      userSalaryGetAttendanceMonth(form).then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          if(data.userAttendanceRecord){
            _this.sjcqts = data.userAttendanceRecord.attendanceDays;
            _this.timeremark = data.userAttendanceRecord.remark;
          };
          if(data.list){
            _this.SalaryDetailsParams = data.list;
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