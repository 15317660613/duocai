<template>
  <div class="building" >
      <div class="pop-up" style="height:562px;overflow:auto;" >
      <div class="pop-up-container"  >
        <el-form ref="formsData" :rules="rules" :model="form" >
          <div class="clear" >
            <div class="left" style="padding-left:30px" >
              <span class="require-word input-l-word" >地域</span>
            </div>
            <div class="left" >
              <el-form-item  prop="cityId" >
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
            <div class="left" style="padding-left:6px" >
              <span class="require-word input-l-word" >楼盘名称</span>
            </div>
            <div class="left" >
              <el-form-item  prop="name" >
                <el-input  v-model.trim="form.name" maxlength="30" title="上限30个字" autocomplete="off" class="build-name" style="width: 450px;"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear" >
            <div class="left" >
              <el-form-item label="建房/产权" prop="buildTime" label-width="64px">
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
              <el-form-item label="物业用途" prop="propertyUse" label-width="76px">
                <el-select v-model="form.propertyUse"   class="select" >
                  <el-option v-for="item in propertyUseParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left" >
              <el-form-item label="总户数" prop="houseNum" label-width="50px">
                <el-input v-model="form.houseNum" @input="number1" maxLength="4"  title="上限4位数"     autocomplete="off" style="width:85px" ></el-input>
              </el-form-item>
            </div>
            <div class="left mearsure-unit">户</div>
          </div>
          <div class="clear" >
            <div class="left" >
              <el-form-item label="建筑面积" prop="buildArea" label-width="64px">
                <el-input @input="number6" v-model="form.buildArea" maxLength="10" title="上限10位数" autocomplete="off" class="width-110" ></el-input>
              </el-form-item>

            </div>
            <div class="left mearsure-unit">m²</div>
            <div class="left" >
              <el-form-item label="物业类型" prop="propertyType" label-width="61px" >
                <el-select v-model="form.propertyType"    class="select" >
                  <el-option v-for="item in propertyTypeParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>

          </div>
          <div class="clear" >
            <div class="left" >
              <el-form-item label="售均价" prop="avgPrice" label-width="64px">
                <el-input @input="number3" v-model="form.avgPrice" maxLength="10" title="上限10位数" autocomplete="off" class="width-110" ></el-input>
              </el-form-item>
            </div>
            <div class="left mearsure-unit">元</div>
            <div class="left" >
              <el-form-item label="纳税价格" prop="payTaxes" label-width="64px">
                <el-input  @input="number2" v-model="form.payTaxes" maxLength="10" title="上限10位数"  autocomplete="off" style="width:100px" ></el-input>
              </el-form-item>
            </div>
            <div class="left mearsure-unit">元</div>
          </div>

          <div class="clear" >
            <div class="left" >
              <el-form-item label="详细地址" prop="adress" label-width="64px">
                <el-input v-model="form.adress" maxLength="30" title="上限30位字" autocomplete="off" class="build-name" style="width:450px;"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear" >
            <div class="left" >
              <el-form-item label="物业主" prop="propertyOwner"  label-width="64px">
                <el-input v-model="form.propertyOwner" maxLength="20" title="上限20位字"  autocomplete="off" class="width-110" ></el-input>
              </el-form-item>
            </div>
            <div class="left icon-user" @click="isShowPropertyOwnerList" >
              <i class="user-icon user"></i>
            </div>
            <div class="left" >
              <span style="line-height:27px;display:inline-block;width:60px;text-align:right;padding-right:5px;" >电话</span>
            </div>
            <div class="left" >
              <el-form-item  prop="propertyOwnerPhone" >
                <el-input @input="number"  v-model="form.propertyOwnerPhone" maxLength="15" title="上限15位数" autocomplete="off" style="width:100px" ></el-input>
              </el-form-item>
            </div>
            <div class="left" >
              <el-form-item label="物业费" prop="propertyFee" label-width="50px">
                <el-input @input="number5"  v-model="form.propertyFee" maxLength="10" title="上限10位数" autocomplete="off" style="width:70px" ></el-input>
              </el-form-item>
            </div>
            <div class="left mearsure-unit">元/m²</div>
          </div>

          <div class="clear" >
            <div class="left" >
              <el-form-item label="物业公司" prop="propertyCompany" label-width="64px">
                <el-input v-model="form.propertyCompany"maxLength="20" title="上限20个字"  autocomplete="off" class="width-110" ></el-input>
              </el-form-item>
            </div>

            <div class="left" >
              <el-form-item label="电话" prop="propertyCompanyPhone" label-width="80px">
                <el-input @input="number4" v-model="form.propertyCompanyPhone" maxLength="15" title="上限15位数" autocomplete="off" style="width:100px" ></el-input>
              </el-form-item>
            </div>
            <div class="left" >
              <el-form-item label="地铁" prop="metro" label-width="50px">
                <el-select v-model="form.metro"    class="select" >
                  <el-option v-for="item in metroParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear" >
            <div class="left" >
              <el-form-item label="负责人" prop="chargePersonDepartId" label-width="64px">
                 <el-select @change="findUserByDepart" v-model="form.chargePersonDepartId" maxLength="500" title="上限500个字"   class="select"  >
                    <el-option   label="" value="" ></el-option>
                    <el-option v-for="item in departParams"  :label="item.name" :value="item.id" >
                      <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}">{{item.name}}</span>
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
              <el-form-item label="结构" prop="structure" label-width="36px">
                <el-select v-model="form.structure"     class="select" >
                  <el-option v-for="item in structureParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left" >
              <el-form-item label="环线" prop="loopLine" label-width="50px">
                <el-select v-model="form.loopLine"  class="select" style="width:70px;">
                  <el-option v-for="item in loopLineParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear" >
            <div class="left" style="padding-left:35px;color:#606266;" >
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
          <div class="rules" >
            <div class="clear padding-t-5" >
              <div class="left left-word" >
                <span class="color1" >栋座必选</span>
              </div>
              <div class="left check-radio" >
                <el-form-item  prop="chooseHouse" >
                  <el-checkbox style="height:20px;"  v-model="form.chooseHouse"  :false-label="0" :true-label="1" ></el-checkbox>
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
                  <el-checkbox style="height:20px;"  @change="autoCheckBuilding" v-model="form.chooseHouseNum"  :false-label="0" :true-label="1"  ></el-checkbox>
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
    </div>
      <div slot="footer" class="dialog-footer clear">
        <div class="left clear" >

        </div>
        <div class="right"  style="margin-top: 3px;">

          <span class="right save-cancel-btn" style="margin-right:0px;" @click="closeEditorBuilding" >取 消</span>
          <span class="right save-cancel-btn"  type="primary" @click="saveEditorBuilding">保 存</span>
          <div class="right" style="border:1px solid #666;padding:1px 0px 1px 1px;margin-right:10px;" >
            <i class="file-icon" @click="isShowPhotoAndFile" ></i>
          </div>
        </div>
      </div>
    <div class="component-container" >
        <PropertyOwnerListPage @setProperty="setProperty" :propertyOwnerList="dialogPropertyOwnerList" ref="showPropertyOwnerList" ></PropertyOwnerListPage>
    </div>



  </div>
</template>

<script>
  //物业主列表
  import PropertyOwnerListPage from './propertyOwnerListSpecial'
  import {findEditorData,checkBuildingName,saveEditorBuilding} from '../../../service/getData'
  import {departperson} from "../../../service/organizeDate";
  let buildingId = null;
  let streetId = null;
  let repeatName = null;
  export default {
    props:["editorBuilding","editorBuildingId"],
    data() {
      let validateArea = (rule, value, callback) => {
        if (value === '') {
          this.myAlert("地域为空！",'dangerous-icon');
        }
      }

      return {
        dialogFormEditorBuilding:this.editorBuilding,
        dialogPropertyOwnerList:false,

        getId:this.editorBuildingId,
        photoAndFile:false,

        textarea2:"",
        structureParams:[],
        loopLineParams:[],
        metroParams:[],
        propertyOwners:[],
        propertyRightParamsOne:[],
        propertyRightParams:[],
        propertyTypeParams:[],
        propertyUseParams:[],
        propertyOwners:[],
        departParams:[],
        userParams:[],
        streets:[],
        citys:[],
        towns:[],
        textarea2:"",
        form: {
          cityId:'',
          townId:'',
          streetId:'',
          name:'',
          buildTime:'',
          propertyRight:'',
          propertyUse:'',
          houseNum:0,
          buildArea:'',
          propertyType:'',
          avgPrice:'',
          payTaxes:'',
          adress:'',
          propertyOwner:'',
          propertyOwnerId:'',
          propertyOwnerPhone:'',
          propertyFee:'',
          propertyCompany:'',
          propertyCompanyPhone:'',
          metro:'',
          chargePersonDepartId:'',
          chargePerson:'',
          structure:'',
          loopLine:'',
          remark:'',
          chooseHouse:0,
          chooseHouseNum:0,
          houseNumRule:1,
          houseNumException:'',
          createTime:"aaa",
          createBy:"213",
          locked:0,
        },
        rules: {
          cityId: [
            {required: true,message: '地域为空', trigger: 'blur'},
          ],
          streetId:[
            {required: true,validator: validateArea, trigger: 'change' }
          ],
          name:[
            {required: true,message: ' ', trigger: 'blur'}
          ],
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

      isShowNewBuilding(){
        this.dialogFormEditorBuilding = true;
      },
      getEditorBuildingData(id){
        let _this = this;
        let arr = [];
        for(let i = 2021 ; i > 1939 ; i--){
          let obj = {
            id:i,
            name:i,
          };
          arr.push(obj);
        }
        _this.propertyRightParamsOne = arr;

        findEditorData(id).then(function(response){
          if(response.status == 500){
            return false;
          }
          //修改栋座，学校数；
          _this.$emit('setBuildingAndSchoolNum',response.data.seatNum,response.data.schoolNum);
          var data = response.data.params;
          var getData = response.data.areaVillage;
          _this.form = getData;

          _this.$emit("setLockedData",getData.locked);
          buildingId = getData.id;
          streetId = getData.streetId;
          _this.citys = [{
            name:data.cityName,
            id:data.cityId,
          }];
          _this.towns = [{
            name:data.townName,
            id:data.townId,
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
          _this.userParams = response.data.users;
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
      saveEditorBuilding(){
        let _this = this;
        let value = this.form.name;
        let streetId = this.form.streetId;
        if (value == "") {
          this.myAlert("楼盘名称为空！",'dangerous-icon');
        } else if (value !== '') {
          let id = this.form.id;
          let street = "";

          if(streetId){
            street = streetId;
            checkBuildingName(id,value,street).then(function(response){
              if(response.status == 500){
              }else if(response.status == 0){
                repeatName = false;
                _this.saveBuildingData();
              }else{
                repeatName = true;
              _this.myAlert("若不同市区有同名楼盘，请在楼盘后加备注：XX花园（YY）！",'dangerous-icon');
              }
            })
          }else{

          }

        } else {
        }
      },
      saveBuildingData(){
        let _this =  this;
        var flag = false;
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

        if(repeatName){
          this.myAlert("楼盘名称重复！",'dangerous-icon');
          return false;
        }

        let form = JSON.parse(JSON.stringify(_this.form)) ;
        for(let arr in form){
          if(form[arr] == null ){
            form[arr] = "";
          }
        }
        saveEditorBuilding(form).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let id = _this.form.id;
            _this.saveSuccess(id,form);
          }
        })
      },
      saveSuccess(id,form){
        let _this = this;
        _this.myAlert("保存成功",'success-icon').then(res => {
          _this.clearFormData();
          _this.$emit("closeBuilding",id,form);
        }).catch(err => {
        })
      },

      isShowPhotoAndFile(){
        this.$emit("isShowPhotoAndFile");
      },
      //勾选房号，栋座自动勾上
      autoCheckBuilding(){
        if(this.form.chooseHouseNum == 1){
          this.form.chooseHouse = 1;
        }else{
          this.form.chooseHouse = 0;
        }
      },
      closeEditorBuilding(){
        let _this = this;
        _this.$emit("closeBuilding");
      },

      isShowPropertyOwnerList(){
        let _this =  this;
        let propertyOwnerId = _this.form.propertyOwnerId;
        _this.$refs['showPropertyOwnerList'].showPropertyOwnerList(propertyOwnerId);
      },
      getStreetId(value){
        streetId = value;
      },
      //取消清空
      clearFormData(formRule){
        this.$refs.formsData.resetFields();
        this.form.propertyOwnerId = "";
        this.dialogFormVisible = false
      },

    },
    mounted(){
      let _this = this;
      let id = _this.getId;
      _this.getEditorBuildingData(id);
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
    }
  }

  .select{
    width:100px;
  }
  .build-name{
    width:495px;
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
    width:495px;
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
  .file-icon{
    background:url(../../../images/icon.png) -336px -97px;
    width:25px;
    height:18px;
    display:block;
    cursor:pointer;
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
