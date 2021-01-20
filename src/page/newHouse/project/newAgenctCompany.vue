<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="新增平台公司" width="600px" height="250px" @close="clearFormData" :visible.sync="dialogVisible" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 312px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:0px;" >
                <div class="clear" >
                  <div class="left padding-r-2" style="width:70px;text-align:right;" >
                    <span class="word require-word" >平台公司</span>
                  </div>
                  <div class="left padding-r-2">
                    <el-form-item  prop="platformId" >
                      <el-select @change="getConnectionByPlatform" v-model="form.platformId"    style=" width:100px;" >
                        <el-option v-for="item in platformParams"  :label="item.platformCompany" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" style="padding-top:8px" >
                    <input type="checkbox" v-model="form.isMain" value="1" >
                  </div>
                  <div class="left "  >
                    <span class="word " >主</span>
                  </div>
                  <div class="left padding-r-2" style="width:70px;text-align:right;" >
                    <span class="word require-word" >联系人员</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="contactor" >
                      <el-select @change="getConnectphone"  v-model="form.contactor"    style="width:100px;" >
                        <el-option v-for="item in connectionList"  :label="item.contactEmp" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" style="width:70px;text-align:right;" >
                    <span class="word require-word" >联系电话</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="contactorPhone" >
                      <el-input disabled  v-model="form.contactorPhone" title="上限10个字" maxlength="10" style="width:100px;" ></el-input>
                    </el-form-item>
                  </div>

                </div>
               
                <div class="clear" >
                  <div class="left padding-r-2" style="width:70px;text-align:right;" >
                    <span class="word " >合同开始</span>
                  </div>
                  <div class="left" >
                    <el-form-item   prop="contractStartDate"  >
                      <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.contractStartDate" style="width: 100px;"></el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="width:99px;text-align:right;">
                    <span class="word "  >合同结束</span>
                  </div>
                  <div class="left" >
                    <el-form-item   prop="contractEndDate" >
                      <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.contractEndDate" style="width: 100px;"></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
                <div class="break" style="width:540px;margin-left:5px;" ></div>
                <div class="clear" >
                  <div class="left  padding-r-2 " style="width:70px;text-align:right;" >
                    <span class="word require-word" >报备保护期</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="arriveType" >
                      <el-select v-model="form.reportType"    style="width:60px;" >
                        <el-option v-for="item in definedParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div v-show="form.reportType == '一次性'" class="left padding-r-2"  >
                    <div >
                      <el-form-item  prop="reportDays" >
                        <el-date-picker type="datetime" style="width:152px;"  v-model="form.reportDays" value-format="yyyy-MM-dd HH:mm" ></el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                  <div v-show="form.reportType == '重复性'" class="left padding-r-2 left"  >
                    <div class="left padding-r-2" >
                      <el-form-item  prop="reportDuration" >
                        <el-select  v-model="form.reportDuration"    style="width:60px;" >
                          <el-option v-for="item in reportDurationParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left" >
                      <el-form-item  prop="reportDays1" >
                        <el-time-select
                          v-model="form.reportDays1"
                          style="width:90px;">
                        </el-time-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="left  padding-r-2 " style="width:92px;text-align:right;" >
                    <span class="word " >报备方式</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="reportWayId" >
                      <el-select v-model="form.reportWayId"    style="width:80px;" >
                        <el-option v-for="item in reportWayIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left  padding-r-2 " style="width:70px;text-align:right;" >
                    <span class="word require-word" >到场保护期</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="arriveType" >
                      <el-select  v-model="form.arriveType"    style="width:60px;" >
                        <el-option v-for="item in definedParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div v-show="form.arriveType == '一次性'" class="left padding-r-2"  >
                      <el-form-item  prop="arriveDays" >
                        <el-date-picker type="datetime"  style="width:152px;"  v-model="form.arriveDays" value-format="yyyy-MM-dd HH:mm" ></el-date-picker>
                      </el-form-item>

                  </div>
                  <div v-show="form.arriveType == '重复性'" class="left padding-r-2 left"  >
                    <div class="left padding-r-2" >
                      <el-form-item  prop="arriveDuration" >
                        <el-select  v-model="form.arriveDuration"    style="width:60px;" >
                          <el-option v-for="item in arriveDurationParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left" >
                      <el-form-item  prop="arriveDays1" >
                        <el-time-select
                          v-model="form.arriveDays1"
                          style="width:90px;">
                        </el-time-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="left  padding-r-2 " style="width:92px;text-align:right;" >
                    <span class="word require-word" >报备规则</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="reportRules" >
                      <el-select  v-model="form.reportRules"    style="width:80px;" >
                        <el-option v-for="item in reportRuleParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
               
                <div class="clear" >
                  <div class="left padding-r-2" style="width:70px;text-align:right;" >
                    <span class="word require-word" >佣金类型</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="commTypeId" >
                      <el-select @change="changeCommType" v-model="form.commTypeId"    style=" width:106px;" >
                        <el-option v-for="item in commTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left">
                    <el-form-item  v-if="commType" prop="commTypeRemark" >
                      <el-select v-model="form.commTypeRemark"    style=" width:106px;" >
                        <el-option v-for="item in commissionTypeRemarkParams1"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item  v-else prop="commTypeRemark" >
                      <el-select v-model="form.commTypeRemark"    style=" width:106px;" >
                        <el-option v-for="item in commissionTypeRemarkParams2"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                 

                  <div class="left padding-r-3" style="padding-left:40px;" >
                    <span class="word require-word" >佣金模式</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="commModeId" >
                      <el-select v-model="form.commModeId" @change="commModetypechangefunc" style=" width:80px;" >
                        <el-option v-for="item in commModeIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left">
                    <el-form-item  prop="commCount" >
                      <el-input   v-model="form.commCount" title="上限10个字" maxlength="10" style="width:80px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left" >
                    <span class="word" v-if="unitMoneyOrProperty" >元</span>
                    <span class="word" v-else >%</span>
                  </div>
                  
                </div>
                <div class="clear" >

                  <div class="left padding-r-2" style="width:70px;text-align:right;" >
                    <span class="word " >佣金描述</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="commDesc" >
                      <el-input  v-model="form.commDesc" title="上限50个字" maxlength="50" style="width:469px;" ></el-input>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear" >

                  <div class="left padding-r-2" style="width:70px;text-align:right;" >
                    <span class="word " >现金奖</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="bonus" >
                      <el-input  v-model="form.bonus" title="现金描述（上限50个字）" maxlength="50" style="width:469px;"  ></el-input>
                    </el-form-item>
                  </div>
                  <div class="clear" >
                    <div class="left padding-r-2" style="width:70px;text-align:right;" >
                      <span class="word require-word" >启用时间</span>
                    </div>
                    <div class="left" >
                      <el-form-item  prop="startTime" >
                          <el-date-picker v-model="form.startTime" size="mini" type="date"   format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm"  style="width: 150px;"></el-date-picker>
                      </el-form-item>
                    </div>
                    <div class="clear record word p-l-15"  >
                      (报备时间在启用时间之后的都用此规则)
                    </div>  
                  </div>  
                  <div class="break" style="width:540px;margin-left:5px;" ></div>
                  <div class="clear" style="padding-bottom:10px;" >
                    <div class="left padding-r-2" style="width:70px;text-align:right;" >
                      <span class="des-type-word " >派车类型</span>
                    </div>
                    <div class="left clear" >
                      <div class="left clear every-check-special" v-for="(item ,index ) in saleParams" >
                        <div class="left" >

                          <input type="checkbox"   style="height:28px;"   v-model="item.check"  :value="item.id"  ></input>

                        </div>
                        <div class="left" >
                          <span class="check-des-word" >{{item.name}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
  import {newHouseParam} from '../../../utils/newHouseParams'
  import {editorPlaformCompany,agenctCompanyParams,addAgenctCompany} from '../../../service/newHouse'

  export default {
    props:["newAgenctCompanyVisible"],
    data() {
      return {
        dialogVisible:this.newAgenctCompanyVisible,
        checkHouse:false,
        platformParams:[],
        reportWayIdParams:[],
        commTypeIdParams:[],
        commissionTypeRemarkParams1:[],
        commissionTypeRemarkParams2:[],
        commModeIdParams:[],
        saleParams:[],
        reportDurationParams:[],
        arriveDurationParams:[],
        connectionList:[],
        definedParams:newHouseParam.definedParams,
        reportRuleParams:newHouseParam.reportRuleParams,
        commType:true,
        unitMoneyOrProperty:false,
        form:{
          id:'',
          noPlatform:1,
          projectId:'',
          platformId:'',
          isMain:'',
          contactor:'',
          contactorPhone:'',
          contractStartDate:'',
          contractEndDate:'',
          reportType:'一次性',
          reportDuration:'',
          reportDays:'',
          reportDays1:'',
          reportWayId:'',
          commTypeRemark:'',
          commCount:'',
          arriveType:'一次性',
          arriveDuration:'',
          arriveDays:'',
          arriveDays1:'',
          reportRules:'全部号码',
          startTime:'',
          commTypeId:'',
          commModeId:'',
          
          commDesc:'',
          bonus:'',
          saleIds:'',
        },
      };
    },
    components:{

    },
    methods:{
      checkNum(item){
        this.form.commCount = this.form.commCount.replace(/[^\.\d]/g,'');
      },
      showDialog(id,houseName){
        this.dialogVisible = true;
        this.getParamsData();
        this.form.projectId = id;
      },
      commModetypechangefunc(){
        this.commModeIdParams.forEach(item=>{
          if(this.form.commModeId == item.id){
            if(item.name == '比例'){
              this.unitMoneyOrProperty = false;
            }else{
              this.unitMoneyOrProperty = true;
            }
          }
        })
      },
      getConnectionByPlatform(value){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        if(value) {
          editorPlaformCompany(value).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;

              _this.connectionList = data.emps;
              _this.form.contactor = "";
              _this.form.contactorPhone = "";
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.connectionList = [];
          _this.form.contactor = "";
          _this.form.contactorPhone = "";
        }
      },
      getConnectphone(value){
        let _this = this;
        if(_this.connectionList && _this.connectionList.length != 0){
          _this.connectionList.forEach(function(item){
            if(item.id == value){
              _this.form.contactorPhone = item.contactPhone;
            }
          })
        }else{
          _this.form.contactorPhone = "";
        }
      },
      getParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        agenctCompanyParams().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;

            let initArr = [{id:"0",name:" "}];
            if(data.platformList){
              let initArrSpecial = [{id:"0",platformCompany:" "}];

              _this.platformParams = initArrSpecial.concat(data.platformList);
            }
            if(data.reportWayIdParams){
              _this.reportWayIdParams = initArr.concat(data.reportWayIdParams);
            }
            if(data.commTypeIdParams){
              _this.commTypeIdParams = initArr.concat(data.commTypeIdParams);
            }
            if(data.commModeIdParams){
              _this.commModeIdParams = data.commModeIdParams;
              _this.commModeIdParams.forEach(item=>{
                if(item.name == '比例'){
                  _this.form.commModeId = item.id;
                }
              })
            }
            if(data.commissionTypeRemarkParams1){
              _this.commissionTypeRemarkParams1 = initArr.concat(data.commissionTypeRemarkParams1); 
            }
            if(data.commissionTypeRemarkParams2){
              _this.commissionTypeRemarkParams2 = initArr.concat(data.commissionTypeRemarkParams2); 
            }
            if(data.reportDurationParams && data.reportDurationParams.length != 0 ){
              _this.reportDurationParams = data.reportDurationParams;

              _this.form.reportDuration = data.reportDurationParams[0].id;
            }
            if(data.arriveDurationParams && data.arriveDurationParams.length != 0){
              _this.arriveDurationParams = data.arriveDurationParams;
              _this.form.arriveDuration = data.arriveDurationParams[0].id;
            }

            if(data.saleParams){
              let  saleParams = data.saleParams;
              saleParams.forEach(function(item){
                item.check = 0;
              })
              _this.saleParams = data.saleParams;
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      changeCommType(){
        let commTypeId = this.form.commTypeId;
        let commTypeIdParams = this.commTypeIdParams;
        let paramName = "";
        commTypeIdParams.forEach(item => {
          if(commTypeId == item.id){
            paramName = item.name;
            return false;
          }
        })
        if(paramName == '时效结佣'){
          this.commType = true;
        }else if(paramName == '进度结佣'){
          this.commType = false;
        }
        this.form.commTypeRemark = "";
      },
      saveData(){
        let _this =  this;
        let form = JSON.parse(JSON.stringify(this.form));
        let platformId = form.platformId;
        let commModeId = form.commModeId;
        let commDesc = form.commDesc;
        let saleParams = this.saleParams;
        let commTypeId = form.commTypeId;
        let commTypeRemark = form.commTypeRemark;
        let commCount = form.commCount;
        let startTime = form.startTime;
        let saleIds = [];
        if(!platformId){
          this.myAlert("平台公司为空！",'dangerous-icon');
          return false;
        }
        
        let reportType = form.reportType; 
        let reportDays = form.reportDays; 
        let reportDuration = form.reportDuration; 
        let reportDays1 = form.reportDays1; 
        
        let arriveType = form.arriveType; 
        let arriveDays = form.arriveDays; 
        let arriveDuration = form.arriveDuration; 
        let arriveDays1 = form.arriveDays1; 
        if(reportType == "重复性"){
          if(!reportDuration || !reportDays1){
            this.myAlert("报备保护期为空！", 'dangerous-icon');
            return false;
          }
        }else{
          if(!reportDays){
            this.myAlert("报备保护期为空！", 'dangerous-icon');
            return false;
          }
        }

        if(arriveType == "重复性"){
          if(!arriveDuration || !arriveDays1){
            this.myAlert("到场保护期为空！", 'dangerous-icon');
            return false;
          }
        }else{
          if(!arriveDays){
            this.myAlert("到场保护期为空！", 'dangerous-icon');
            return false;
          }
        }
        if (!commTypeId  || !commTypeRemark) {
          this.myAlert("佣金类型为空！", 'dangerous-icon');
          return false;
        }
        if (!commModeId || commCount == '') {
          this.myAlert("佣金模式为空！", 'dangerous-icon');
          return false;
        }
        if(!startTime){
          this.myAlert("启用时间不能为空！", 'dangerous-icon');
          return false;
        }
        if(form.reportType == "重复性"){
            form.reportDays = form.reportDays1;
            form.reportDays1 = '';
        }

        if(form.arriveType == "重复性"){
          form.arriveDays = form.arriveDays1;
          form.arriveDays1 = '';
        }



        saleParams.forEach(function(item){
          if(item.check != '0'){
            saleIds.push(item.id);
          }
        })

        form.saleIds = saleIds.toString();
        if(!form.isMain){
          form.isMain = 0;
        }else{
          form.isMain = 1;
        }
        let platformParams = this.platformParams;
        let platformName = "";
        platformParams.forEach(function(item){
          if(item.id == platformId){
            platformName = item.platformCompany;
          }
        })
        form.platformName = platformName;
        form.startTime = startTime.substring(0,16);
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        addAgenctCompany(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功!",'success-icon').then(res => {
              _this.dialogVisible = false;
              _this.$emit("reloadAgentCompanyList",1);
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
        this.dialogVisible = false;
        this.form.isMain = '';
        this.$refs.formsData.resetFields();

      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 0px 0px;

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
      display:inline-block;
      line-height:27px;
    }
  }

  .des-type-word{
    color:#3F993C;
    line-height:27px;
  }
  .every-check-special{
    padding-right:10px;
  }
  .check-des-word{
    line-height:28px;
    padding-left:2px;
    font-size:12px;
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
  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }
</style>
