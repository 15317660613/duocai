<template>
  <div class="" >
    <el-dialog v-dialogDrag title="批量设置房号规则" width="600px" @close="clearFormData" :visible.sync="buildingNumSetting">
      <div class="pop-up" >
        <div class="pop-up-container"  style="height: 496px;">
          <el-form ref="formsData" :model="form">
            <div class="rules" >
              <div class="clear padding-t-5" >
                <div class="left left-word" style="width: 32px;">
                  <span class="color1" ></span>
                </div>
                <div class="left check-radio" >
                  <el-checkbox v-model="form.isChoose" :false-label="0" :true-label="1"  ></el-checkbox>
                </div>
                <div class="left word-1"  >
                  新增房源【栋座位置】必须从已有的栋座中选取
                </div>
                <div class="left " style="margin-left:30px;" >
                   <div class="rule-btn" @click="clickSetBuildingRule"  >
                     设置栋座规则
                   </div>
                </div>
              </div>
            </div>
          </el-form>
            <div class="break"></div>
          <el-form ref="formsData1" :model="form">
            <div class="rules" >
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" >选择楼盘</span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.oldRules"  :label="1" >&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  原来房号规则为【1】的楼盘字典
                </div>
                <div class="left " style="margin-left:126px;" >
                  <div class="rule-btn" @click="clickSetHouseRule" >
                    设置房号规则
                  </div>
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" ></span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.oldRules" :label="2" >&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  原来房号规则为【2】的楼盘字典
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" ></span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.oldRules" :label="3" >&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  原来房号规则为【3】的楼盘字典
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" ></span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.oldRules" :label="4" >&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  原来房号规则为【4】的楼盘字典
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" ></span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.oldRules" :label="5" >&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  原来房号规则为【5】的楼盘字典
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" ></span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.oldRules" :label="6" >&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  所有的楼盘字典
                </div>
              </div>
            </div>
            <div class="break"></div>
            <div class="rules" >
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" >新的规则</span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.newRules" :label="1" >&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  1.【字母、数字任意组合】
                </div>
                <div class="left special-word" >
                  例如：601、18D
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" ></span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.newRules" :label="2" >&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  2.【字母、数字、字符任意组合】
                </div>
                <div class="left special-word" >
                  例如：601、18-D
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color2" >2+2规则</span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.newRules" :label="3" >&nbsp; </el-radio>
                </div>
                <div class="left rigth-word" >
                  3.【楼层（2位）+房间号（数字）】
                </div>
                <div class="left special-word" >
                  例如：0601、1804
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color2" >2+1规则</span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.newRules" :label="4">&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  4.【楼层（2位）+房间号（字母）】
                </div>
                <div class="left special-word" >
                  例如：06A、18D
                </div>
              </div>
              <div class="clear padding-t-b-5" >
                <div class="left left-word" >
                  <span class="color2" >2+2/2+1混合</span>
                </div>
                <div class="left check-radio-specical" >
                  <el-radio v-model="form1.newRules" :label="5" >&nbsp;</el-radio>
                </div>
                <div class="left rigth-word" >
                  5.【楼层（2位）+房间号（数字/字母）】
                </div>
                <div class="left special-word" >
                  例如：06A、18D
                </div>
              </div>
            </div>
          </el-form>
        </div>

      </div>

    </el-dialog>

  </div>
</template>

<script>
  import {setBuildingRule,setHouseRule} from '../../../service/getData'

  export default {
    props:["buildingNumSettingShow"],
    data() {
      return {
        buildingNumSetting:this.buildingNumSettingShow,
        ids:'',

        form:{
          ids:0,
          isChoose:0,
        },
        form1: {
          ids:'0',
          oldRules:1,
          newRules:1,
        },
        formLabelWidth: '100px'
      };
    },
    components:{

    },
    methods:{
      isShowBuildingNumSetting(ids){
        this.buildingNumSetting = true;
      },
      clickSetBuildingRule(){
        this.myConfirm("确定设置所有楼盘字典的栋座规则吗？", 'question-icon','是','否','','my-message').then(res => {
          this.setBuildingRule();
        }).catch(err => {
        })
      },
      setBuildingRule(){
        let _this = this;
        let isChoose = _this.form.isChoose;
        setBuildingRule('',isChoose).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.dialogMoveBuilding = false;
            _this.myAlert("数据保存成功！",'success-icon').then(res => {

            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      clickSetHouseRule(){
        let oldRule = this.form1.oldRules;
        let newRule = this.form1.newRules;
        let title1 = '',title2 = '';
        if(oldRule == 1){
          title1 = '原有房号规则为[1]的楼盘字典';
        }else if(oldRule == 2){
          title1 = '原有房号规则为[2]的楼盘字典';
        }else if(oldRule == 3){
          title1 = '原有房号规则为[3]的楼盘字典';
        }else if(oldRule == 4){
          title1 = '原有房号规则为[4]的楼盘字典';
        }else if(oldRule == 5){
          title1 = '原有房号规则为[5]的楼盘字典';
        }else {
          title1 = '所有的楼盘字典';
        }

        if(newRule == 1){
          title2 = '房号规则[1]吗？';
        }else if(newRule == 2){
          title2 = '房号规则[2]吗？';
        }else if(newRule == 3){
          title2 = '房号规则[3]吗？';
        }else if(newRule == 4){
          title2 = '房号规则[4]吗？';
        }else if(newRule == 5){
          title2 = '房号规则[5]吗？';
        }
        this.myConfirm("确定将："+title1, 'question-icon','是','否',"修改为："+title2,'my-message').then(res => {
          this.setHouseRule();
        }).catch(err => {
        })
      },
      setHouseRule(){
        let _this = this;
        let oldRules = _this.form1.oldRules;
        let newRules = _this.form1.newRules;
        setHouseRule('',newRules,oldRules).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.dialogMoveBuilding = false;
            _this.myAlert("数据调动成功！",'success-icon').then(res => {
              _this.clearFormData();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      clearFormData(){
        this.buildingNumSetting = false;
        this.form.isChoose = 0;
        this.form1.oldRules = 1;
        this.form1.newRules = 1;
      },
    }
  }
</script>

<style lang="scss" scoped>

  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }
  .padding-t-5{
    padding-top:8px;

  }
  .padding-t-b-5{
    padding:8px 0;
  }

  .left-word{
    height: 14px;
    width: 89px;
    text-align: right;
    line-height: 14px;
  }
  .word-1{
    line-height:20px;
    font-size:16px;
    color:#A20000;
  }
  .rule-btn{
    cursor:pointer;
    width: 120px;
    height: 23px;
    line-height:21px;
    background: inherit;
    background-color: rgba(223, 218, 213, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(102, 102, 102, 1);
    border-radius: 0px;
    text-align:center;
  }
  .rigth-word{
    font-size:12px;
    line-height: 20px;
  }
  .check-radio-specical{
    padding: 0 0px 0 11px;
  }
  .check-radio{
    padding: 0 5px 0 11px;
  }
  .special-word{

    color:#999;
  }
  .color1{
    color:#336699;
    font-size:12px;
  }
  .color2{
    color:#999999;
    font-size:12px;
  }
</style>
