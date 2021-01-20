<template>
  <div class="" style="width:100%;" >
      <div class="pop-up" style="width:calc(100% - 20px);margin:0 10px;" >
        <div class="pop-up-container" style="width:calc(100% - 20px);height: 462px;" >
          <el-form ref="formsData"  :model="form">
            <div class="clear" >
              <div class="left  padding-r-2"  style="width:60px;text-align:right;" >
                <span class="word require-word" >合同编号</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-input disabled="true"  v-model="name"   placeholder="【自动编号】" style="width:160px;"  ></el-input>
              </div>
              <div class="left  padding-r-2" style="width:50px;text-align:right;" >
                <span class="word " >业类</span>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="businessType" >
                  <el-select @change="getBuyTypeName" v-model="form.businessType"  placeholder="" style="width:92px;" >
                    <el-option v-for="item in businessTypeParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2 "  style="width:70px;text-align:right;" >
                <span class="word" >房产证号</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="realEstateNum" >
                <el-input @input="checkWord" title="上限50个字,数字/字母/汉字" maxlength="50"   v-model="form.realEstateNum"    style="width:150px;"  ></el-input>
                </el-form-item>
              </div>
              <div class="left  padding-r-2" style="width:45px;text-align:right;" >
                <span class="word " >状态</span>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="stateId" >
                  <el-select  v-model="form.stateId"  placeholder="" style="width:90px;" >
                    <el-option v-for="item in stateIdParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clear" style="position:relative;" >
              <div class="left  padding-r-2"  style="width:60px;text-align:right;" >
                <span :class="{'word':true,'require-word':true}" >{{houseAddressName}}</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="padding-right:23px;" >
                <el-form-item  prop="roomAddress" >
                  <el-input title="（手动输入时）上限50个字" maxlength="50"    v-model="form.roomAddress"    style="width:280px;"  ></el-input>
                </el-form-item>
              </div>
              <div style="position:absolute;top:6px;left:340px;" >
                <i class="house-special-icon" @click="showCheckHouse" ></i>
              </div>

              <div class="left padding-r-2 "  style="width:70px;text-align:right;" >
                <span class="word require-word" >签约日</span>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="contractDate" >
                  <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.contractDate" style="width: 150px;"></el-date-picker>
                </el-form-item>
              </div>

              <div class="left  padding-r-2 " style="width:45px;text-align:right;" >
                <span class="word " >面积</span>
              </div>
              <div class="left padding-r-1 l-h-27 text-input" style="" >
                <el-form-item  prop="roomArea" >
                  <el-input title="上限10位数" maxlength="13"    @input="checkNum1"  v-model="form.roomArea"    style="width:90px;"  ></el-input>
                </el-form-item>
              </div>
              <div class="left" >
                <span class="word" >㎡</span>
              </div>
            </div>
            <div class="clear" style="position:relative;" >
              <div class="left  padding-r-2"  style="width:60px;text-align:right;" >
                <span class="word " >{{houseNumName}}</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="roomNum" >
                  <el-input class=""  v-model="form.roomNum"    style="width:132px;"  ></el-input>
                </el-form-item>
              </div>
              <div style="position:absolute;left:200px;top:11px;" >
                <i :class="{'new-house-icon':houseIconType == 1,'rent-house-icon':houseIconType == 3,'sale-house-icon':houseIconType == 2,}" ></i>
              </div>

              <div class="left padding-r-2 "  style="width:74px;text-align:right;" >
                <span :class="{'word':true,'require-word':true}" >{{saleName}}</span>
              </div>
              <div class="left padding-r-1 l-h-27 text-input" style="" >
                <el-form-item  prop="price" >
                  <el-input title="上限10位数" maxlength="13"  @input="checkNum2"  v-model="form.price"    style="width:82px;"  ></el-input>
                </el-form-item>
              </div>
              <div class="left" >
                <span class="word" >元</span>
              </div>
              <div class="left  padding-r-2" style="width:72px;text-align:right;" >
                <span class="word " >签约人员</span>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="contractEmpDepart" >
                  <el-select @change="findUserByDepart(1)"  v-model="form.contractEmpDepart"  placeholder="" style="width:92px;" >
                    <el-option  v-for="item in departTree"  :label="item.name" :value="item.id">
                      <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                        <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                        <span v-if="item.state=='常态'">{{item.name}}</span>
                      </span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="contractEmpId" >
                  <el-select  v-model="form.contractEmpId"  placeholder="" style="width:92px;" >
                    <el-option v-for="item in userList1"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="left  padding-r-2" style="width:45px;text-align:right;" >
                <span class="word " >用途</span>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="roomUseId" >
                  <el-select disabled='true' v-model="form.roomUseId"  placeholder="" style="width:65px;" >
                    <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clear" >
              <div class="left  padding-r-2"  style="width:60px;text-align:right;" >
                <span class="word " >{{buyTypeName}}</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="businessNum" >
                  <el-input   v-model="form.businessNum"    style="width:132px;"  ></el-input>
                </el-form-item>
              </div>

              <div class="left padding-r-2 "  style="width:74px;text-align:right;" >
                <span class="word " >单价</span>
              </div>
              <div class="left padding-r-1 l-h-27 text-input" style="" >
                <el-form-item  prop="unitPrice" >
                  <el-input title="上限10位数" maxlength="13" @input="checkNum3"  v-model="form.unitPrice"    style="width:93px;"  ></el-input>
                </el-form-item>
              </div>
              <div class="left  padding-r-2" style="width:73px;text-align:right;" >
                <span class="word " >签约经理</span>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="contractLeaderDepart" >
                  <el-select @change="findUserByDepart(2)"  v-model="form.contractLeaderDepart"  placeholder="" style="width:92px;" >
                    <el-option  v-for="item in departTree"  :label="item.name" :value="item.id">
                      <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                        <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                        <span v-if="item.state=='常态'">{{item.name}}</span>
                      </span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="contractLeaderId" >
                  <el-select  v-model="form.contractLeaderId"  placeholder="" style="width:92px;" >
                    <el-option v-for="item in userList2"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="left  padding-r-2" style="width:44px;text-align:right;" >
                <span class="word " >自定号</span>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="num" >
                  <el-select  v-model="form.num"  placeholder="" style="width:66px;" >
                    <el-option v-for="item in numParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="break" >
            </div>
            <div class="clear" style="position:relative;" >
              <div class="left  padding-r-2"  style="width:60px;text-align:right;" >
                <span class="word require-word" >{{propertyName}}</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="ownerName" >
                  <el-input title="上限25个字" maxlength="25"  v-model="form.ownerName"    style="width:160px;"  ></el-input>
                </el-form-item>
              </div>
              <div class="left  padding-r-2 "  style="width:47px;text-align:right;" >
                <span  :class="{'word':true,'require-word':checkContractValue3 == 'true'}"    >手机</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="ownerPhone" >
                  <el-input  title="上限15位数" maxlength="15"  @input="checkNum4" v-model="form.ownerPhone"    style="width:92px;"  ></el-input>
                </el-form-item>
              </div>
              <div class="left  padding-r-2"  style="width:73px;text-align:right;" >
                <span :class="{'word':true,'require-word':true}" >客户姓名</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="padding-right:23px;" >
                <el-form-item  prop="customerName" >
                  <el-input title="上限25个字" maxlength="25"   v-model="form.customerName"    style="width:130px;"  ></el-input>
                </el-form-item>
              </div>
              <div style="position:absolute;top:6px;left:563px;" >
                <i class="customer-special-icon" @click="showCheckCustomer" ></i>
              </div>
              <div class="left  padding-r-2"  style="width:41px;text-align:right;" >
                <span class="word " >手机</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="customerPhone" >
                  <el-input title="上限15位数" maxlength="15"  @input="checkNum5"  v-model="form.customerPhone"    style="width:100px;"  ></el-input>
                </el-form-item>
              </div>


            </div>
            <div class="clear" >
              <div class="left  padding-r-2"  style="width:60px;text-align:right;" >
                <span class="word " >{{saleAddressName}}</span>
              </div>
              <div class="left  l-h-27" style="" >
                <el-form-item  prop="ownerAddress" >
                  <el-input title="上限50个字" maxlength="50"  v-model="form.ownerAddress"    style="width:223px;"  ></el-input>
                </el-form-item>
              </div>

              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="ownerSource" >
                <el-input title="来源"  v-model="form.ownerSource"    style="width:77px;"  ></el-input>
                </el-form-item>
              </div>
              <div class="left  padding-r-2"  style="width:73px;text-align:right;" >
                <span class="word " >客源编号</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="customerCode" >
                  <el-input    v-model="form.customerCode"    style="width:93px;"  ></el-input>
                </el-form-item>
              </div>
              <div class="left  padding-r-2"  style="width:61px;text-align:right;" >
                <span class="word " >联系地址</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="customerAddress" >
                  <el-input title="上限50个字" maxlength="50"   v-model="form.customerAddress"    style="width:140px;"  ></el-input>
                </el-form-item>
              </div>


            </div>
            <div class="clear" >
              <div class="left  padding-r-2"  style="width:60px;text-align:right;" >
                <span  :class="{'word':true,'require-word':checkContractValue4 == 'true'}"  >身份证号</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="ownerId" >
                  <el-input title="上限18个字" maxlength="18"  v-model="form.ownerId"    style="width:300px;"  ></el-input>
                </el-form-item>
              </div>

              <div class="left  padding-r-2"  style="width:73px;text-align:right;" >
                <span class="word " >身份证号</span>
              </div>
              <div class="left padding-r-1 l-h-27" style="" >
                <el-form-item  prop="customerIdCard" >
                  <el-input title="上限18个字" maxlength="18"  v-model="form.customerIdCard"    style="width:295px;"  ></el-input>
                </el-form-item>
              </div>

            </div>
            
            <div class="clear" >

              <div class="left clear left-content" style="margin-top:5px;height: 250px;" >
                <div class="break" style="margin-top:0px;" >

                </div>
                <div class="no-data-word" >
                  【无跟进记录或跟进记录被屏蔽】
                </div>
              </div>
              <div class="left right-content" >
                <div class="clear " v-if="!typeHide" >
                    <div class="left  padding-r-2" style="width:55px;text-align:right;" >
                      <span class="word " >佣金类型</span>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="num" >
                        <el-select  v-model="form.commissionType"  @change="changeCommissionType"  placeholder="" style="width:90px;" >
                          <el-option v-for="item in commissionTypeParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="num" >
                        <el-select  v-model="form.commissionTypeRemark" placeholder="" style="width:202px;" >
                          <el-option v-for="item in commissionTypeRemarkParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                </div>
                <div class="clear" v-if="!typeHide" >
                    <div class="left  padding-r-2" style="width:55px;text-align:right;" >
                      <span class="word " >佣金模式</span>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="num"  >
                        <el-select @change="changeUnit"  v-model="form.commissionModel"  placeholder="" style="width:90px;" >
                          <el-option v-for="item in commissionModelParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="num" >
                         <el-input @input="checkModelRemark" title="上限10位数" maxlength="23"  v-model="form.commissionModelRemark"    style="width:193px;"  ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left" >
                      <span class="word" v-if="unitMoneyOrProperty" >元</span>
                      <span class="word" v-else >%</span>
                    </div>
                </div>
                <div class="clear " style="padding-top:5px;"  >
                  <div class="left  padding-r-2"  style="width:55px;text-align:right;" >
                    <span class="">备注</span>
                  </div>
                  <div class="left">
                      <textarea
                        type="textarea"
                        style="width:294px;height:158px;resize: none;"
                        maxLength="1000"
                        title="上限1000个字"
                        class="remark"
                        v-model="form.remark">
                      </textarea>
                  </div>
                </div>
             </div>
            </div>
          </el-form>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        </div>
      </div>
  </div>
</template>

<script>
  import { contractParams,newContract } from "../../../service/contractSpecial";
  import {findUserByDepartId} from "../../../service/organizeDate";
  import CheckCustomerPage from './checkCustomer'
  import CheckProjectPage from './checkProject'
  import CheckHousePage from './checkHouse'
  export default {
    props:["newRentVisible",'layerid'],
    data() {
      return {
        businessTypeParams:[],
        houseIconType:1,
        typeHide:false,
        numParams:[],
        roomUseParams:[],
        stateIdParams:[],
        departTree:[],

        userList1:[],
        userList2:[],
        
        commissionTypeParams:[],
        commissionTypeRemarkParams:[],
        commissionTypeRemarkParams1:[],
        commissionTypeRemarkParams2:[],
        commissionModelParams:[],
        buyTypeName:'认购编号',
        saleName:'售价',
        houseAddressName:'新房地址',
        houseNumName:'项目编号',
        propertyName:'开发商',
        saleAddressName:'销售地址',
        checkContractValue1:"false",
        checkContractValue2:"false",
        checkContractValue3:"false",
        checkContractValue4:"false",
        checkContractValue5:"false",
        checkContractValue6:"false",
        unitMoneyOrProperty:false,
        
        form: {
          businessType:'',
          realEstateNum:'',
          stateId:'',
          roomAddress:'',
          contractDate:'',
          roomArea:'0.00',
          roomNum:'',
          price:'0',
          roomId:'', 
          customerId:'',
          contractEmpDepart:'',
          contractEmpId:'',

          roomUseId:'',

          businessNum:'',
          unitPrice:'0.00',

          contractLeaderDepart:'',
          contractLeaderId:'',
          num:'',

          ownerName:'',
          ownerPhone:'',

          customerName:'',
          customerPhone:'',

          ownerAddress:'',
          ownerSource:'',
          customerCode:'',
          customerAddress:'',
          ownerId:'',
          customerIdCard :'',
          commissionType:'',
          commissionTypeRemark:'',
          commissionModel:'',
          commissionModelRemark:'',
          remark:'',
         
          createBy:'aaa',
        },

        rules:{

        },
        formLabelWidth: '78px'
      };
    },
    components:{
      CheckCustomerPage,
      CheckProjectPage,
      CheckHousePage,
    },
    methods:{
      checkWord(){
        this.form.realEstateNum= this.form.realEstateNum.replace(/[^a-zA-Z\u4E00-\u9FA5\d]/g,'');
      },
      checkNum1(){
        this.form.roomArea= this.form.roomArea.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.price= this.form.price.replace(/[^\.\d]/g,'');
      },
      checkNum3(){
        this.form.unitPrice= this.form.unitPrice.replace(/[^\.\d]/g,'');
      },
      checkNum4(){
        this.form.ownerPhone= this.form.ownerPhone.replace(/[^\d]/g,'');
      },
      checkNum5(){
        this.form.customerPhone= this.form.customerPhone.replace(/[^\d]/g,'');
      },
      checkModelRemark(){
        this.form.commissionModelRemark = this.form.commissionModelRemark.replace(/[^\.\d]/g,'');
      },
      changeUnit(){
        let commissionModel = this.form.commissionModel;
        let commissionModelParams = this.commissionModelParams;
        let paramName = "";
        commissionModelParams.forEach(item => {
          if(commissionModel == item.id){
            paramName = item.name;
            return false;
          }
        })
        if(paramName == '金额'){
          this.unitMoneyOrProperty = true;
        }else if(paramName == '比例'){
          this.unitMoneyOrProperty = false;
        }
      },
      getBuyTypeName(){
        let _this = this;
        let businessTypeParams = this.businessTypeParams;
        let businessType = this.form.businessType;

        if(businessTypeParams && businessTypeParams.length != 0){
          businessTypeParams.forEach(function(item){
              if(item.id == businessType){
                  if(item.name.indexOf('A') != -1){
                    _this.buyTypeName = '认购编号';
                    _this.houseIconType = 1;
                    _this.saleName = '售价'; 
                    _this.houseAddressName = '新房地址';
                    _this.houseNumName = '项目编号';
                    _this.propertyName = '开发商';
                    _this.saleAddressName  = '销售地址';
                    
                    _this.typeHide = false;   
                  }else{
                    _this.typeHide = true;   
                    _this.buyTypeName = '委托编号';

                    _this.houseAddressName = '房源地址';
                    _this.houseNumName = '房源编号';
                    _this.propertyName = '业主姓名';
                    _this.saleAddressName  = '联系地址';

                    if(item.name.indexOf('B') != -1){
                      _this.houseIconType = 2; 
                      _this.saleName = '售价';
                    }else{
                      _this.houseIconType = 3; 
                      _this.saleName = '租价';
                    }
                  }
              }
          })
        }
      },
      changeCommissionType(){
        let commissionType = this.form.commissionType;
        let commissionTypeParams = this.commissionTypeParams;
        let commissionTypeRemarkParams1 = this.commissionTypeRemarkParams1;
        let commissionTypeRemarkParams2 = this.commissionTypeRemarkParams2;
        this.form.commissionTypeRemark = "";
        let name ="";
        commissionTypeParams.forEach(item => {
          if(item.id == commissionType){
            name = item.name;
          }  
        })
          if(name == '' || name == '时效结佣'){
            this.commissionTypeRemarkParams = JSON.parse(JSON.stringify(commissionTypeRemarkParams1));
            return false;
          }else{
            this.commissionTypeRemarkParams = JSON.parse(JSON.stringify(commissionTypeRemarkParams2));
            return false;
          }
      },
      getContractParam(){

        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        contractParams().then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{id: "0", name: " "}];
            let businessTypeParams = data.businessTypeParams;
            let numParams = data.numParams;
            let roomUseParams = data.roomUseParams;
            let stateIdParams = data.stateIdParams;

            let commissionTypeParams = data.commissionTypeParams;
            let commissionTypeRemarkParams1 = data.commissionTypeRemarkParams1;
            let commissionTypeRemarkParams2 = data.commissionTypeRemarkParams2;
            let commissionModelParams = data.commissionModelParams;
            _this.commissionTypeParams = [{id: "", name: " "}].concat(commissionTypeParams);
            _this.commissionTypeRemarkParams1 = [{id: "", name: " "}].concat(commissionTypeRemarkParams1);
            _this.commissionTypeRemarkParams2 = [{id: "", name: " "}].concat(commissionTypeRemarkParams2);
            _this.commissionTypeRemarkParams = [{id: "", name: " "}].concat(JSON.parse(JSON.stringify(commissionTypeRemarkParams1)));
            _this.commissionModelParams = commissionModelParams;

            _this.commissionModelParams.forEach(item=>{
              if(item.name=='比例'){
                _this.form.commissionModel = item.id;
              }
            })
            _this.form.contractDate = _this.getCurrentDate();
            if(businessTypeParams){
               businessTypeParams.forEach(item =>{
                 let remark = item.remark;
                 if(remark != null){
                    item.name = item.name + remark;
                 }
               })
                _this.businessTypeParams = initArr.concat(businessTypeParams);
                if(businessTypeParams.length != 0){
                    _this.form.businessType = businessTypeParams[0].id;
                }
            }
            if (numParams) {
              let arr = [];
              numParams.forEach(item =>{
                  arr.push({id:item.name,name:item.name})
              })
              _this.numParams = initArr.concat(arr);
            }
            if(roomUseParams){
              _this.roomUseParams = initArr.concat(roomUseParams);
              if(roomUseParams.length != 0){
                _this.form.roomUseId = roomUseParams[0].id;
              }
            }
            if(stateIdParams){
              _this.stateIdParams = initArr.concat(stateIdParams);
              if(stateIdParams.length != 0){
                _this.form.stateId = stateIdParams[0].id;
              }
            }


            if(data.departTree) {
              let arr = [];
              let treeData = data.departTree
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  state:treeData[i].state,
                })
              }
              _this.departTree = arr;
              try {
                let defaultUserId = data.defaultUserId;
                let defaultDeptId = data.defaultDepartId;
                let defaultUserList = data.defaultUserList;
                if(defaultDeptId != -1){
                  _this.userList1 = defaultUserList;
                  _this.form.contractEmpId = defaultUserId;
                  _this.form.contractEmpDepart = defaultDeptId;
                }  
              } catch (e) {

              }

              let systemSet = data.systemSet;
              if(systemSet && systemSet.length != 0){
                systemSet.forEach(item =>{
                  debugger;
                   if(item.paramName == '新增合同必须选择【关联房源】' && item.paramData == 'true'){
                     _this.checkContractValue1 = 'true';
                   }
                   if(item.paramName == '新增合同必须选择【关联客源】' && item.paramData == 'true' ){
                     _this.checkContractValue2 = 'true';
                   }
                   if(item.paramName == '合同【电话】必填' && item.paramData == 'true' ){
                     _this.checkContractValue3 = 'true';
                   }
                   if(item.paramName == '合同【身份证】必填' && item.paramData == 'true' ){
                     _this.checkContractValue4 = 'true';
                   }
                })
              }
            }

            }
        })
      },
      showCheckCustomer(){
        let _this = this;
        let customerId = this.form.customerId;
        let test = _this.$layer.iframe({
          content: {
            content: CheckCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{customerIdParent:customerId}//props
          },
          area:['600px','450px'],
          title: "选择客源",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });
      },
      showCheckHouse(){
        let _this = this;
        let roomId = this.form.roomId;
        let businessType = this.form.businessType;
        let params = this.businessTypeParams;
        let houseName = null;
        if(params && params.length != 0){
          params.forEach(function(item){
              if(item.id == businessType){
                houseName = item.name;
              }
          })
        }
        if(houseName){
            if(houseName.indexOf('A') != -1){
              let test = _this.$layer.iframe({
                content: {
                  content: CheckProjectPage, //传递的组件对象
                  parent: this,//当前的vue对象
                  data:{getHouseId:roomId}//props
                },
                area:['600px','450px'],
                title: "选择新房",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件

                }
              });
            }else{
              _this.$layer.iframe({
                content: {
                  content: CheckHousePage, //传递的组件对象
                  parent: this,//当前的vue对象
                  data:{getHouseId:roomId}//props
                },
                area:['600px','450px'],
                title: "选择二手房",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件

                }
              });
            }
        }

      },
      setCheckCustomerData(elem){
        this.form.customerId = elem.id;
        if(elem){
          if(elem.name != null){
              this.form.customerName =  elem.name;
          }else{
            this.form.customerName = "";
          }
          if(elem.phoneNum != null){
            this.form.customerPhone =  elem.phoneNum;
          }else{
            this.form.customerPhone = "";
          }
          if(elem.customerCode != null){
            this.form.customerCode =  elem.customerCode;
          }else{
            this.form.customerCode = "";
          }
          if(elem.comment != null){
            this.form.customerAddress =  elem.comment;
          }else{
            this.form.customerAddress = "";
          }
          if(elem.idCard != null){
            this.form.customerIdCard =  elem.idCard;
          }else{
            this.form.customerIdCard = "";
          }
        }
      },
      setCheckHouseData1(elem){
        this.form.roomId = elem.id;
        if(elem.projectAddress != null){
          this.form.roomAddress =  elem.projectAddress;
        }else{
          this.form.roomAddress =  "";
        }
        if(elem.projectCode != null){
          this.form.roomNum =  elem.projectCode;
        }else{
          this.form.roomNum =  "";
        }

        if(elem.prepurchaseNum != null){
          this.form.businessNum =  elem.prepurchaseNum;
        }else{
          this.form.businessNum =  "";
        }

        if(elem.roomType){
          let roomType = elem.roomType;
          if(roomType == "出租" || roomType == "租售"){
            if(elem.rentPriceArea != null){
              this.form.unitPrice =  elem.rentPriceArea;
            }else{
              this.form.unitPrice = "";
            }
            if(elem.rentPrice != null){
              this.form.price =  elem.rentPrice;
            }else{
              this.form.price = "";
            }
          }else if(roomType == "出售"){
            if(elem.salePriceArea != null){
              this.form.unitPrice =  elem.salePriceArea;
            }else{
              this.form.unitPrice = "";
            }
            if(elem.salePrice != null){
              this.form.price =  elem.salePrice;
            }else{
              this.form.price = "";
            }

          }else{

          }
        }
      },
      setCheckHouseData2(elem){
        this.form.roomId = elem.id;
        if(elem.adress != null){
          this.form.roomAddress =  elem.adress;
        }else{
          this.form.roomAddress = "";
        }
        if(elem.roomCode != null){
          this.form.roomNum =  elem.roomCode;
        }else{
          this.form.roomNum = "";
        }

        if(elem.roomDelegateNum != null){
          this.form.businessNum =  elem.roomDelegateNum;
        }else{
          this.form.businessNum = "";
        }
        if(elem.roomType){
            let roomType = elem.roomType;
            if(roomType == "出租" || roomType == "租售"){
              if(elem.rentPriceArea != null){
                this.form.unitPrice =  elem.rentPriceArea;
              }else{
                this.form.unitPrice = "";
              }
              if(elem.rentPrice != null){
                this.form.price =  elem.rentPrice;
              }else{
                this.form.price = "";
              }
            }else if(roomType == "出售"){
              if(elem.salePriceArea != null){
                this.form.unitPrice =  elem.salePriceArea;
              }else{
                this.form.unitPrice = "";
              }
              if(elem.salePrice != null){
                this.form.price =  elem.salePrice;
              }else{
                this.form.price = "";
              }

            }else{

            }
        }
      },
      findUserByDepart(value){
        let _this = this;
        let id = null;
        let userList = "";
        if(value == 1){
          id = this.form.contractEmpDepart;
          userList = "userList1";
        }else if(value == 2){
          id = this.form.contractLeaderDepart;
          userList = "userList2";
        }
        if(id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [];
              if(user && user.length != 0){
                user.forEach(item => {
                  if(item.doBusiness == 1){
                    let obj = {
                      id: item.id,
                      name: item.name,
                      stateUser:0,
                    }
                    if(item.paramName == '正式离职'){
                      obj.stateUser  = 1;
                    }
                    arr.push(item);
                  }
                })
              }

              _this[userList] =  arr;
              if(value == 1) {
                _this.form["contractEmpId"] = '';
              }else{
                _this.form["contractLeaderId"] = '';
              }
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      saveFormData(){

        let _this =  this;
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        let roomAddress = form.roomAddress;
        let price = form.price;
        let ownerName = form.ownerName;
        let customerName = form.customerName;
        let ownerPhone = form.ownerPhone;
        let ownerId = form.ownerId;
        let customerId = this.form.customerId;
        let roomId = this.form.roomId;
        let contractDate = form.contractDate;
        let checkContractValue1 = this.checkContractValue1;
        let checkContractValue2 = this.checkContractValue2;
        let checkContractValue3 = this.checkContractValue3;
        let checkContractValue4 = this.checkContractValue4;
        if(!roomAddress){
          this.myAlert("房源地址为空！",'dangerous-icon');
          return false;
        }
        if(!contractDate){
          this.myAlert("签约日为空！",'dangerous-icon');
          return false;
        }
        
        if(!price ){
          this.myAlert("售价不能为空！",'dangerous-icon');
          return false;
        }
        if(!ownerName){
          this.myAlert("业主姓名不能为空！",'dangerous-icon');
          return false;
        }
        if(!ownerPhone &&  checkContractValue3 == 'true'){
          this.myAlert("手机号不能为空！",'dangerous-icon');
          return false;
        }
        if(!ownerId &&  checkContractValue4 == 'true'){
          this.myAlert("身份证号号不能为空！",'dangerous-icon');
          return false;
        }
        if(!customerName ){
          this.myAlert("客户姓名不能为空！",'dangerous-icon');
          return false;
        }
        if(checkContractValue1 == 'true' && roomId == '' ){
           this.myAlert("新增合同必须选择【关联房源】！",'dangerous-icon');
          return false;
          
        }
        if(checkContractValue2 == 'true' && customerId == '' ){
           this.myAlert("新增合同必须选择【关联客源】！",'dangerous-icon');
          return false;
          
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });


        newContract(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let id = response.data;
            _this.myConfirm("合同记录保存成功！", 'question-icon','是','否','是否继续录入【人笔业绩和财务收付】等信息？','my-big-message').then(res => {
              let row = {
                id:id,
                roomAddress:_this.form.roomAddress,
                ownerName:_this.form.ownerName,
                customerName:_this.form.customerName,
              }
              _this.$parent.reloadContractList(2,row);
              _this.cancelData();
            }).catch(err => {
              _this.$parent.reloadContractList(1);
              _this.cancelData();
            })
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangouser-icon');
          }
        })
      },
      cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },
      getCurrentDate(){
        let date = new Date();
        let year = date .getFullYear();
        let month = date .getMonth()+1;
        if(month*1 < 10){
          month = "0"+month;
        }
        let day = date .getDate();
        if(day*1 < 10){
          day = "0"+day;
        }
        let currentDate = year +"-"+month +"-"+day;
        return currentDate;
      },

    },
    mounted(){
      this.getContractParam();
    },
    watch:{
      'form.roomArea':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.roomArea = undefined;
            return;
          }
          this.form.roomArea = oldval
        } else {
          this.form.roomArea = newval.replace(/^\./g, "")
        }
      },
      'form.price':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.price = undefined;
            return;
          }
          this.form.price = oldval
        } else {
          this.form.price = newval.replace(/^\./g, "")
        }
      },
      'form.unitPrice':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.unitPrice = undefined;
            return;
          }
          this.form.unitPrice = oldval
        } else {
          this.form.unitPrice = newval.replace(/^\./g, "")
        }
      },
      
      'form.commissionModelRemark':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.commissionModelRemark = undefined;
            return;
          }
          this.form.commissionModelRemark = oldval
        } else {
          this.form.commissionModelRemark = newval.replace(/^\./g, "")
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
  @import '../../../style/contract.scss'
</style>
<style lang="scss" scoped>
  .padding1{
    padding-left:0px;
    display:inline-block;
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
  }  
</style>
