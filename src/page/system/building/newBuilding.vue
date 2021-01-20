<template>
  <div class="" style="width:100%;padding:0 10px;" >
     <div class="pop-up" >
        <div class="pop-up-container" style="" >
          <el-form ref="formsData"  :model="form" >
            <div class="clear" >
              <div class="left" style="padding-left:42px" >
                <span class="require-word input-l-word" >地域</span>
              </div>
              <div class="left" >
                <el-form-item  prop="cityId"   >
                  <el-select v-model="form.cityId" disabled   class="select" >
                    <el-option v-for="item in citys"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left select-item" >
                <el-form-item label="" label-width="0">
                  <el-select v-model="form.townId" disabled    class="select" >
                    <el-option v-for="item in towns"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left select-item" >
                <el-form-item label="" prop="streetId"  @change="getStreetId" label-width="0">
                  <el-select v-model="form.streetId"    class="select" >
                    <el-option v-for="item in streets"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clear" >
              <div class="left" style="padding-left:18px" >
                <span class="require-word input-l-word" >楼盘名称</span>
              </div>
              <div class="left" >
                <el-form-item  prop="name" >
                  <el-input  v-model.trim="form.name" maxlength="30" title="上限30个字" autocomplete="off" class="build-name" ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="clear" >
              <div class="left" >
                <el-form-item label="建房/产权" prop="buildTime" :label-width="formLabelWidth">
                  <el-select v-model="form.buildTime"    class="width-60" >
                    <el-option v-for="item in propertyRightParamsOne"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left select-item" >
                <el-form-item label="" prop="propertyRight" label-width="0">
                  <el-select v-model="form.propertyRight"     class="width-60" >
                    <el-option v-for="item in propertyRightParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left" >
                <el-form-item label="物业用途" prop="propertyUse" label-width="85px">
                  <el-select v-model="form.propertyUse"   class="select" >
                    <el-option v-for="item in propertyUseParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left" >
                <el-form-item label="总户数" prop="houseNum" label-width="60px">
                  <el-input v-model="form.houseNum" @input="number1" maxLength="4"  title="上限4位数"     autocomplete="off" style="width:85px" ></el-input>
                </el-form-item>
              </div>
              <div class="left mearsure-unit">户</div>
            </div>
            <div class="clear" >
              <div class="left" >
                <el-form-item label="建筑面积" prop="buildArea" :label-width="formLabelWidth">
                  <el-input @input="number6" v-model="form.buildArea" maxLength="13" title="上限10位数" autocomplete="off" class="width-110" ></el-input>
                </el-form-item>

              </div>
              <div class="left mearsure-unit">m²</div>
              <div class="left" >
                <el-form-item label="物业类型" prop="propertyType" label-width="70px" >
                  <el-select v-model="form.propertyType"    class="select" >
                    <el-option v-for="item in propertyTypeParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

            </div>
            <div class="clear" >
              <div class="left" >
                <el-form-item label="售均价" prop="avgPrice" :label-width="formLabelWidth">
                  <el-input @input="number3" v-model="form.avgPrice" maxLength="13" title="上限10位数" autocomplete="off" class="width-110" ></el-input>
                </el-form-item>
              </div>
              <div class="left mearsure-unit">元</div>
              <div class="left" >
                <el-form-item label="纳税价格" prop="payTaxes" label-width="73px">
                  <el-input  @input="number2" v-model="form.payTaxes" maxLength="10" title="上限10位数"  autocomplete="off" style="width:100px" ></el-input>
                </el-form-item>
              </div>
              <div class="left mearsure-unit">元</div>
            </div>

            <div class="clear" >
              <div class="left" >
                <el-form-item label="详细地址" prop="adress" :label-width="formLabelWidth">
                  <el-input v-model="form.adress" maxLength="30" title="上限30位字" autocomplete="off" class="build-name" ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="clear" >
              <div class="left" >
                <el-form-item label="物业主" prop="propertyOwner"  :label-width="formLabelWidth">
                  <el-input v-model="form.propertyOwner" maxLength="20" title="上限20位字"  autocomplete="off" class="width-110" ></el-input>
                </el-form-item>
              </div>
              <div class="left icon-user" @click="isShowPropertyOwnerList" >
                <i class="user-icon user"></i>
              </div>
              <div class="left" >
                <span style="line-height:27px;display:inline-block;width:70px;text-align:right;padding-right:5px;" >电话</span>
              </div>
              <div class="left" >
                <el-form-item  prop="propertyOwnerPhone" >
                  <el-input @input="number"  v-model="form.propertyOwnerPhone" maxLength="15" title="上限15位数" autocomplete="off" style="width:100px" ></el-input>
                </el-form-item>
              </div>
              <div class="left" >
                <el-form-item label="物业费" prop="propertyFee" label-width="60px">
                  <el-input @input="number5"  v-model="form.propertyFee" maxLength="10" title="上限10位数" autocomplete="off" style="width:70px" ></el-input>
                </el-form-item>
              </div>
              <div class="left mearsure-unit">元/m²</div>
            </div>

            <div class="clear" >
              <div class="left" >
                <el-form-item label="物业公司" prop="propertyCompany" :label-width="formLabelWidth">
                  <el-input v-model="form.propertyCompany"maxLength="20" title="上限20个字"  autocomplete="off" class="width-110" ></el-input>
                </el-form-item>
              </div>

              <div class="left" >
                <el-form-item label="电话" prop="propertyCompanyPhone" label-width="91px">
                  <el-input @input="number4" v-model="form.propertyCompanyPhone" maxLength="15" title="上限15位数" autocomplete="off" style="width:100px" ></el-input>
                </el-form-item>
              </div>
              <div class="left" >
                <el-form-item label="地铁" prop="metro" label-width="60px">
                  <el-select v-model="form.metro"    class="select" >
                    <el-option v-for="item in metroParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clear" >
              <div class="left" >
                <el-form-item label="负责人" prop="chargePersonDepartId" :label-width="formLabelWidth">
                  <el-select @change="findUserByDepart" v-model="form.chargePersonDepartId" maxLength="500" title="上限500个字"   class="select"  >
                    <el-option   label="" value="" ></el-option>
                    <el-option v-for="item in departParams"  :label="item.name" :value="item.id" >
                      <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}"  >{{item.name}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="left select-item" >
                <el-form-item label="" prop="chargePerson" label-width="0">
                  <el-select v-model="form.chargePerson"      style="width:80px;" >
                    <el-option v-for="item in userParams"  :label="item.name" :value="item.id" >
                       
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left" >
                <el-form-item label="结构" prop="structure" label-width="35px">
                  <el-select v-model="form.structure"     class="select" >
                    <el-option v-for="item in structureParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left" >
                <el-form-item label="环线" prop="loopLine" label-width="42px">
                  <el-select v-model="form.loopLine"      class="select" >
                    <el-option v-for="item in loopLineParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clear" style="padding-bottom:10px;" >
              <div class="left" style="padding-left:48px" >
                <span class=" input-l-word" >备注</span>
              </div>
              <div class="left" >
               
                  <textarea
                    type="textarea"
                    style="width:465px;height:48px;"
                    maxLength="500"
                    title="上限500个字"
                    class="remark"
                    v-model="form.remark">
                  </textarea>
              </div>
            </div>
            <div class="break">

            </div>
            <div class="rules" style="padding-bottom:40px;" >
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" >栋座必选</span>
                </div>
                <div class="left check-radio" >
                  <el-form-item  prop="chooseHouse" >
                    <el-checkbox disabled="true" style="height:20px;" v-model="form.chooseHouse"  :false-label="0" :true-label="1" ></el-checkbox>
                  </el-form-item>
                </div>
                <div class="left rigth-word" >
                  新增房源【栋座位置】必须从已有的栋座中选取
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" >房号必选</span>
                </div>
                <div class="left check-radio" >
                  <el-form-item  prop="chooseHouseNum" >
                    <el-checkbox disabled="true" style="height:20px;"   v-model="form.chooseHouseNum"  :false-label="0" :true-label="1"  ></el-checkbox>
                  </el-form-item>
                </div>
                <div class="left rigth-word" >
                  新增房源【房号】必须从已有的房号中选取（所有栋座必须有房号）
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color1" >房号规则</span>
                </div>
                <div class="left check-radio" >
                  <el-form-item  prop="houseNumRule" >
                    <el-radio v-model="form.houseNumRule" :label="1">&nbsp;</el-radio>
                  </el-form-item>
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

                </div>
                <div class="left check-radio" >
                  <el-form-item  prop="houseNumRule" >
                    <el-radio v-model="form.houseNumRule" :label="2">&nbsp;</el-radio>
                  </el-form-item>
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
                <div class="left check-radio" >
                  <el-form-item  prop="houseNumRule" >
                    <el-radio v-model="form.houseNumRule" :label="3">&nbsp;</el-radio>
                  </el-form-item>
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
                <div class="left check-radio" >
                  <el-form-item  prop="houseNumRule" >
                    <el-radio v-model="form.houseNumRule" :label="4">&nbsp;</el-radio>
                  </el-form-item>
                </div>
                <div class="left rigth-word" >
                  4.【楼层（2位）+房间号（字母）】
                </div>
                <div class="left special-word" >
                  例如：06A、18D
                </div>
              </div>
              <div class="clear padding-t-5" >
                <div class="left left-word" >
                  <span class="color2" >2+2/2+1混合</span>
                </div>
                <div class="left check-radio" >
                  <el-form-item  prop="houseNumRule" >
                    <el-radio v-model="form.houseNumRule" :label="5" >&nbsp;</el-radio>
                  </el-form-item>
                </div>
                <div class="left rigth-word" >
                  5.【楼层（2位）+房间号（数字/字母）】
                </div>
                <div class="left special-word" >
                  例如：06A、18D
                </div>
              </div>
              <div class="clear padding-t-b-5" >
                <div class="left left-word" >
                  <span class="color1" >房号例外</span>
                </div>
                <div class="left check-radio" >
                  <el-form-item  prop="houseNumException" >
                    <el-input v-model="form.houseNumException" autocomplete="off" class="" ></el-input>
                  </el-form-item>
                </div>

                <div class="left special-word" >
                  9=数字/A=字母    例：99A99可输13A04
                </div>
              </div>

            </div>

          </el-form>
        </div>
        <div slot="footer" style="padding:5px 0px;" class="dialog-footer clear">
          <span class="right save-cancel-btn"  @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        </div>
      </div>
    <div class="component-container" >
      <PropertyOwnerListPage @setProperty="setProperty" :propertyOwnerList="dialogPropertyOwnerList" ref="showPropertyOwnerList" ></PropertyOwnerListPage>
    </div>
    <div class="component-container" >
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleDangerous"
        width="350px"
      >
        <div>
          <div class="pop-up" style="padding-bottom:5px;">
            <div class="pop-up-container clear" style="height:112px;padding-left:30px;" >
              <div class="left question-icon" >

              </div>
              <div class="left" style="font-size: 12px;width: 220px;padding-left:5px;lien-height:18px;padding-top:15px;" >
                楼盘字典保存成功！是否添加【栋座】资料？
              </div>
            </div>
            <div class="clear" style="padding-right:5px;" >
              <span slot="footer" class="dialog-footer">
                <el-button class="right" type="primary" @click="saveSuccess">确 定</el-button>

              </span>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {findBuildingParamData,checkBuildingName,saveNewBuilding} from '../../../service/getData'
  let streetId = null;
  let repeatName = null;
  //物业主列表
  import PropertyOwnerListPage from './propertyOwnerListSpecial'
  import {departperson} from "../../../service/organizeDate";
  export default {
    props:["buildingShow","clickStreetId","layerid","level","townId","name","streetId"],
    data() {
      return {
        dialogFormVisible:this.buildingShow,
        getClickStreetId:this.clickStreetId,
        isFromHousePage:false,
        dialogPropertyOwnerList:false,
        dialogVisibleDangerous:false,
        loading:true,
        structureParams:[],
        loopLineParams:[],
        metroParams:[],
        propertyOwners:[],
        propertyRightParamsOne:[],
        propertyRightParams:[],
        propertyTypeParams:[],
        propertyUseParams:[],
        propertyOwners:[],
        streets:[],
        citys:[],
        towns:[],
        departParams:[],
        userParams:[],
        textarea2:"",

        form: {
          cityId:'',
          townId:'',
          streetId:'',
          name:'',
          buildTime:2019,
          propertyRight:'70年',
          propertyUse:'住宅',
          houseNum:0,

          buildArea:0,
          propertyType:'多层',
          avgPrice:0,
          payTaxes:0,
          adress:'',
          propertyOwner:'',
          propertyOwnerId:'',
          propertyOwnerPhone:'',
          propertyFee:0,
          propertyCompany:'',
          propertyCompanyPhone:'',
          metro:'',
          chargePersonDepartId:'',
          chargePerson:'',
          structure:'钢构',
          loopLine:'',
          remark:'',
          chooseHouse:0,
          chooseHouseNum:0,
          houseNumRule:1,
          houseNumException:'',
          createTime:"aaa",
          createBy:"213",
        },

        formLabelWidth: '78px'
      };
    },
    components:{
      PropertyOwnerListPage,
    },
    methods:{
      number(){
        this.form.propertyOwnerPhone= this.form.propertyOwnerPhone.replace(/[^\.\d]/g,'');
        this.form.propertyOwnerPhone= this.form.propertyOwnerPhone.replace('.','');
      },
      number1(){
        this.form.houseNum= this.form.houseNum.replace(/[^\.\d]/g,'');
        this.form.houseNum= this.form.houseNum.replace('.','');
      },
      number2(){
        this.form.payTaxes= this.form.payTaxes.replace(/[^\.\d]/g,'');
      },
      number3(){
        this.form.avgPrice= this.form.avgPrice.replace(/[^\.\d]/g,'');
      },
      number4(){
        this.form.propertyCompanyPhone= this.form.propertyCompanyPhone.replace(/[^\.\d]/g,'');
        this.form.propertyCompanyPhone= this.form.propertyCompanyPhone.replace('.','');
      },
      number5(){
        this.form.propertyFee= this.form.propertyFee.replace(/[^\.\d]/g,'');
      },
      number6(){
        this.form.buildArea= this.form.buildArea.replace(/[^\.\d]/g,'');
      },

      validateArea (rule, value, callback){
        if (value == "") {
          this.myAlert("地域为空！",'dangerous-icon');
        }
      },
      getSelectData(level,streetId){
        let _this = this;
        let townId = _this.townId;
        let arr = [];
        for(let i = 2021 ; i > 1939 ; i--){
          let obj = {
            id:i,
            name:i,
          };
          arr.push(obj);
        }
        _this.propertyRightParamsOne = arr;

        findBuildingParamData(townId).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            let data = response.data;
            _this.citys = [{
              name: data.cityName,
              id: data.cityId,
            }];
            _this.towns = [{
              name: data.townName,
              id: data.townId,
            }];
            _this.form.cityId = data.cityId;
            _this.form.townId = data.townId;
            _this.streets = data.streets;
            _this.structureParams = data.structureParams;
            _this.loopLineParams = data.loopLineParams;
            _this.metroParams = data.metroParams;
            _this.propertyOwners = data.propertyOwners;
            _this.propertyRightParams = data.propertyRightParams;
            _this.propertyTypeParams = data.propertyTypeParams;
            _this.propertyUseParams = data.propertyUseParams;
            _this.propertyOwners = data.propertyOwners;
            let departParams = data.departs;
            if(departParams){
              let arr = [];
              for(let i = 0 ; i < departParams.length; i++){
                arr.push({
                  id:departParams[i].id,
                  name:departParams[i].label.replace(/&nbsp;/g,""),
                  level:departParams[i].level,
                })
              }
              _this.departParams = arr;
            }  
            if(level == 4){
              _this.form.streetId = streetId;
            }
            _this.loading = true;
          }
        })
      },
       findUserByDepart(){
        let _this = this;
        let id = this.form.chargePersonDepartId;
        if(id) {
          departperson(id).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [];
              if(user && user.length != 0){
                user.forEach(function(item){
                  if(item.paramName == "常态在职" || 
                    item.paramName == "薪假在职" || 
                    item.paramName == "停薪在职" || 
                    item.paramName == "申离在职" || 
                    item.paramName == "正式离职" 
                  ){
                    arr.push({
                      id: item.id,
                      name: item.name,
                    })
                  }  
                })
              }
              _this.userParams =  arr;
              _this.form.chargePerson = "";
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      setProperty(id,name,phone){
        this.form.propertyOwnerId = id;
        if(name != '' && name != null){
          this.form.propertyOwner = name;
        }else{
          this.form.propertyOwner = "";
        }
        if(phone != '' && phone != null){
          this.form.propertyOwnerPhone = phone;
        }else{
          this.form.propertyOwnerPhone = '';
        }
      },
      saveFormData(){
        let _this =  this;
        let name = _this.form.name;
        let streetId = _this.form.streetId;

        if(!streetId){
          this.myAlert("地域为空！",'dangerous-icon');
          return false;
        }
        if(!name){
          this.myAlert("楼盘名称为空！",'dangerous-icon');
          return false;
        }


        if(this.isFromHousePage){
          let streetId = this.form.streetId;
          let id = "";
          this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          checkBuildingName(id,name,streetId).then(function(response){
            _this.$layer.closeAll("loading");
            if(response.status == 500){
            }else if(response.status == 0){
              repeatName = false;
              _this.saveData();
            }else if(response.status == 1){
              repeatName = true;
              _this.myAlert(response.msg+"！",'dangerous-icon');
            }
          })
        }else{
          _this.validateName();
        }

      },
      validateName(){
        let _this = this;
        let value = this.form.name;
        let streetId = this.form.streetId;
        if (value == "") {
          this.myAlert("楼盘名称为空！",'dangerous-icon');
        } else if (value !== '') {
          let id = "";
          let street = "";

          if(streetId){
            street = streetId;
            this.$layer.loading({
              shade: true,//是否显示遮罩
            });
            checkBuildingName(id,value,street).then(function(response){
              _this.$layer.closeAll("loading");
              if(response.status == 500){

              }else if(response.status == 0){
                repeatName = false;
                _this.saveData();
              }else if(response.status == 1){
                let msg =  response.msg
                repeatName = true;
                _this.myAlert(msg,'dangerous-icon');

              }else if(response.status == 2){
                /*_this.myAlert("若不同市区有同名楼盘，请在楼盘后加备注：XX花园（YY）！",'dangerous-icon');*/
                  _this.dialogFormVisible=false
              }
            })
          }else{

          }

        } else {
        }
      },
      saveData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        saveNewBuilding(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myConfirm("&nbsp;&nbsp;&nbsp楼盘字典保存成功！", 'question-icon','是','否','&nbsp;&nbsp;&nbsp;是否添加【栋座】资料？').then(res => {
            
              let id = response.data;
              let name = _this.form.name;
              if(!_this.isFromHousePage) {
                _this.clearFormData();
                _this.$parent.addNewBuildingInPage(2, id, name);
              }else{
                _this.clearFormData();
                _this.$parent.addNewBuildingInPage(2, id,_this.form.name);
              }

            }).catch(err => {
              let id = response.data;
              _this.addNewBuildingBtn(id);
            })
          } else if (response.status == 0){
            _this.myAlert(response.msg,'dangouser-icon');
          }
        })
      },
      addNewBuildingBtn(id){
        var _this = this;
        if(!_this.isFromHousePage) {
          _this.myConfirm("&nbsp;&nbsp;&nbsp;楼盘字典保存成功！", 'question-icon', '是', '否', '&nbsp;&nbsp;&nbsp;继续添加新的楼盘字典？').then(res => {
            _this.clearFormData();
            _this.$parent.addNewBuildingInPage(1);
          }).catch(err => {
            _this.clearFormData();
            _this.$parent.addNewBuildingInPage(3);
          })
        }else{
          _this.$parent.addHouseBuilding(id,_this.form);
          _this.clearFormData();
        }
      },
      saveSuccess(){
        var _this = this;
        _this.dialogFormVisible = false;

        _this.$parent.searchData();
        _this.clearFormData();
      },
      getStreetId(value){
        streetId = value;
      },
      //恢复初始数据
      clearFormData(){
        this.$layer.close(this.layerid);
      },

      isShowNewBuilding(level,streetId){

        this.dialogFormVisible = true;
        this.getSelectData(level,streetId)
      },
      isShowNewBuildingSpecial(level,townId,name,streetId){
        this.dialogFormVisible = true;
        this.clickStreetId = townId;
        if(name){
          this.form.name = name;
          this.isFromHousePage = true;
        }
        this.getSelectData(level,townId);
        this.form.streetId = streetId;
      },
      isShowPropertyOwnerList(){
        let _this =  this;
        let propertyOwnerId = _this.form.propertyOwnerId;

        _this.$refs['showPropertyOwnerList'].showPropertyOwnerList(propertyOwnerId);
      }
    },
    mounted(){
      let level = this.level;
      let streetId = this.streetId;
      let name = this.name;
      let townId = this.townId;
        if(name){
          this.isShowNewBuildingSpecial(level,townId,name,streetId);
        }else{
           this.isShowNewBuilding(level,streetId);
        }
    },
    watch:{
      'form.buildArea':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.buildArea = undefined;
            return;
          }
          this.form.buildArea = oldval
        } else {
          this.form.buildArea = newval.replace(/^\./g, "")
        }
      },
      'form.avgPrice':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.avgPrice = undefined;
            return;
          }
          this.form.avgPrice = oldval
        } else {
          this.form.avgPrice = newval.replace(/^\./g, "")
        }
      },
      'form.payTaxes':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.payTaxes = undefined;
            return;
          }
          this.form.payTaxes = oldval
        } else {
          this.form.payTaxes = newval.replace(/^\./g, "")
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
  /deep/ .el-tabs--border-card{
    box-shadow: 0;
  }
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .input-l-word{
    display:inline-block;
    line-height:28px;
    padding-right:5px;
  }
  .width-60{
    width:55px;
  }
  .width-110{
    width:110px;
  }
  .building .pop-up{
    padding-bottom:0 !important;
    .pop-up-container{
      border-width:0px;
      padding:0 5px;
    }
  }

  .select{
    width:100px;
  }
  .build-name{
    width:465px;
  }
  .mearsure-unit{
    line-height:25px;
    color:#606266;
    font-size:12px;
    padding-left:5px;
  }
  .icon-user{
    margin-top:4px;
  }
  .remark{
    margin-top:5px;
    width:530px;
  }
  .select-item {
    margin-left: 0px;
  }
  .building-icon{
    background:url(../../../images/system/tupian.png) -15px -15px;
    width:20px;
    height:20px;
    display:inline-block;
    
  }
 
  .user-icon{
    background:url(../../../images/system/wuyezhu.png) -16px -16px;
    width:20px;
    height:20px;
    display:inline-block;
    cursor:pointer;
    border: 1px solid #555;
  }
 
  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }
  .padding-t-5{
    padding-top:5px;

  }
  .padding-t-b-5{
    padding:5px 0;
  }
  .left-word{
    height: 14px;
    width: 78px;
    text-align: right;
    line-height: 14px;
  }
  .rigth-word{
    font-size:12px;
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
  .rules{
    /deep/ .el-form-item__content{
      line-height:18px !important;
    }
    /deep/ .el-radio__input.is-checked+.el-radio__label {
      color: #333;
      font-size:12px;
      padding:0;
    }
    /deep/ .el-radio__label {
      font-size: 12px;
      padding:0;
    }
  }
  /deep/ .el-textarea__inner{
    padding:5px;
    font-size:12px;
    border:1px solid #aaa;
  }
</style>
