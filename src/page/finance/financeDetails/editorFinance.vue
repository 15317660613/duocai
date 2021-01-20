<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container " >
          <div class="move-content" style="height:450px;padding:5px;" >
              <el-form ref="formsData"  :model="form" >
                <div class="clear padding-top-5" >
                    <div class="left  padding-r-2" style="width:75px;text-align:right;" >
                        <span class="word require-word" >项类</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="itemClassTwo" >
                            <el-select  :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled" v-model="form.itemClassTwo" @change="getItemClassThreeByTwoId"  placeholder="" style="width:97px;" >
                                <el-option v-for="item in itemClassTwoParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div v-if="isShow == 1" class="left padding-r-1" >
                        <el-form-item  prop="itemClassThree"  >
                            <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled" v-model="form.itemClassThree" @change="getItemClassFourByThreeId"   placeholder="" style="width:162px;" >
                                <el-option  v-for="item in itemClassThreeParams" :label="item.name + (item.remark ? item.remark : '')" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div v-if="isShow == 1" class="left padding-r-1" >
                        <el-form-item  prop="itemClassFour" >
                            <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled" v-model="form.itemClassFour"  @change="accountMangage"  placeholder="" style="width:152px;" >
                                <el-option  v-for="item in itemClassFourParams" :label="item.name + (item.remark ? item.remark : '')" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                 <div  class="clear"  >
                    <div v-if="showAccountIcon == 1 || beShowAccountIcon == 1" class="left  padding-r-2" style="width:75px;text-align:right;padding-top:4px;" >
                        <i @click="accountMangageClick"  :class="{'seven-one-icon':beAccount == 3 || beAccount == 0 || beAccount == 1,'seven-two-icon':beAccount == 2,'seven-three-icon':beAccount == 4,'right':true}"  ></i>
                    </div>
                    <div v-if="showAccountIcon == 1" class="left padding-r-1" style="padding-top:5px;" >
                        <span v-html="form.financeDes"  title="部门人员 工资年月  金额  操作日志"  style="display:inline-block;min-height:23px;width:413px;border:1px solid #aaa;background:#e6e6e6;border-radius:3px;"  ></span>
                     </div>    
                </div>    
                   
                <div class="clear padding-top-5" >
                    <div class="left  padding-r-2" style="width:75px;text-align:right;" >
                        <span class="word require-word" >事件</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="form.isClosingAccounts == 1 || formContractDisabled" title="上限30个字" maxlength="30"  v-model="form.event"   placeholder="" style="width:413px;"  ></el-input>
                    
                        </el-form-item>
                    </div>
                    
                </div>
                <div class="clear padding-top-5" >
                    <div class="left  padding-r-2" style="width:75px;text-align:right;" >
                        <span class="word require-word" >金额</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="price" >
                            <el-input :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled" @input="checkNumPrice" title="上限10位数" maxlength="10"  v-model="form.price"   placeholder="" style="width:100px;"  ></el-input>
                    
                        </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="wayOne" >
                            <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled" v-model="form.wayOne"   placeholder="" style="width:80px;" >
                                <el-option  v-for="item in wayOneParams" :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="wayTwo" >
                            <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled" v-model="form.wayTwo"   placeholder="" style="width:80px;" >
                                <el-option  v-for="item in wayTwoParams " :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="left padding-r-1" v-if="manageShow == 0" >
                        <div @mouseleave="showSelect1 = false" class="el-select" style="width:150px;padding-top:4px;position:relative;" >
                            <div class="el-input el-input--suffix" >
                                <input title="此处填写该金额的存出方式，且存出方式各金额相加必须等于金额总数！" :disabled="form.isClosingAccounts == 1"  @click="showSelectInputClick1" :class="{'el-input__inner':true,'disabled-input':form.isClosingAccounts == 1 || formContractDisabled }"  type="text" readonly="readonly" v-model="boxType1"  autocomplete="off" placeholder >
                                <span class="el-input__suffix" >
                                <span class="el-input__suffix-inner" ></span>
                                </span>
                                
                            </div>
                            <div class="" v-show="showSelect1" style="position:absolute;width:100%;background:#fff;z-index:10;padding-left:5px;" >
                                <div class="clear"  v-for="(item ,index) in storageParams" >
                                    <span class="left" >
                                        <el-checkbox @change="changeBoxType1(item)" v-model="item.select" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                                    </span>
                                    
                                    <span class="left select-check" style="margin-left:-12px;" >{{item.name}}</span>
                                    <span class="left select-check" >
                                        <input type="text"  maxlength="13" @input="changeBoxType1(item)" v-model="item.money" style="width:50px;border-bottom:1px solid #999;" >
                                    </span>
                                    <span class="left select-check" style="margin-left:0px;" >元</span>
                                </div>      
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clear padding-top-5" v-if="manageShow == 1" >
                    <div class="left  padding-r-2" style="width:75px;text-align:right;" >
                        <span class="word require-word" >转出</span>
                    </div>
                   
                    <div class="left padding-r-1"  >
                         <div @mouseleave="showSelect2 = false" class="el-select" style="width:150px;padding-top:4px;position:relative;" >
                            <div class="el-input el-input--suffix" >
                                <input title="此处填写该金额的存出方式，且存出方式各金额相加必须等于金额总数！"  @click="showSelectInputClick2" type="text" readonly="readonly" v-model="boxType2" :title="boxType2" autocomplete="off" placeholder :class="{'el-input__inner':true,'disabled-input':form.isClosingAccounts == 1 || formContractDisabled}"  >
                                <span class="el-input__suffix" >
                                <span class="el-input__suffix-inner" ></span>
                                </span>
                                
                            </div>
                            <div class="" v-show="showSelect2" style="position:absolute;width:100%;background:#fff;z-index:10;padding-left:5px;" >
                                <div class="clear"  v-for="(item ,index) in storageParams2" >
                                    <span class="left" >
                                        <el-checkbox @change="changeBoxType2(item)" v-model="item.select" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                                    </span>
                                    
                                    <span class="left select-check" style="margin-left:-12px;" >{{item.name}}</span>
                                    <span class="left" >
                                        <input type="text select-check"  maxlength="13" @input="changeBoxType2(item)" v-model="item.money" style="width:50px;border-bottom:1px solid #999;" >
                                    </span>
                                    <span class="left select-check" style="margin-left:0px;" >元</span>
                                </div>      
                            </div>
                        </div>
                    </div>
                    <div class="left  padding-r-2" style="width:92px;text-align:right;" >
                        <span class="word require-word" >转入</span>
                    </div>
                   
                    <div class="left padding-r-1"  >
                        <div @mouseleave="showSelect3 = false" class="el-select" style="width:150px;padding-top:4px;position:relative;" >
                            <div class="el-input el-input--suffix" >
                                <input title="此处填写该金额的存出方式，且存出方式各金额相加必须等于金额总数！" @click="showSelectInputClick3" type="text" readonly="readonly" v-model="boxType3" :title="boxType3" autocomplete="off" placeholder :class="{'el-input__inner':true,'disabled-input':form.lisClosingAccounts == 1 || formContractDisabled}"  >
                                <span class="el-input__suffix" >
                                <span class="el-input__suffix-inner" ></span>
                                </span>
                                
                            </div>
                            <div class="" v-show="showSelect3" style="position:absolute;width:100%;background:#fff;z-index:10;padding-left:5px;" >
                                <div class="clear"  v-for="(item ,index) in storageParams3" >
                                    <span class="left" >
                                        <el-checkbox @change="changeBoxType3(item)" v-model="item.select" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                                    </span>
                                    
                                    <span class="left select-check" style="margin-left:-12px;" >{{item.name}}</span>
                                    <span class="left select-check" >
                                        <input type="text"  maxlength="10"  @input="changeBoxType3(item)" v-model="item.money" style="width:50px;border-bottom:1px solid #999;" >
                                    </span>
                                    <span class="left select-check" style="margin-left:0px;" >元</span>
                                </div>      
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clear padding-top-5" v-if="manageShow == 0" >
                    <div class="left  padding-r-2" style="width:75px;text-align:right;" >
                        <span class="word require-word" >收支对方</span>
                    </div>
                
                    <div class="left padding-r-1" >
                        <el-form-item  prop="expenditureIdType" >
                            <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled" @change="changeExpenditureIdType" v-model="form.expenditureIdType"   placeholder="" style="width:100px;" >
                                <el-option  v-for="item in expenditureIdTypeParams" :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                     
                    <div v-if="form.expenditureIdType == '1'" class='left clear' >
                        <div class="left padding-r-1" >
                            <el-form-item  prop="expenditureCoop" >
                                <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled" v-model="form.expenditureCoop"  @change="finUserByDepart1"    placeholder="" style="width:135px;" >
                                    <el-option  v-for="item in departParams1"  :label="item.name" :value="item.id">
                                      <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                                        <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                                        <span v-if="item.state=='常态'">{{item.name}}</span>
                                      </span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="left padding-r-1" >
                            <el-form-item  prop="expenditureId" >
                                <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled" v-model="form.expenditureId"   placeholder="" style="width:100px;" >
                                    <el-option  v-for="item in userParams1" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"  ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div v-if="form.expenditureIdType == '2'" class='left clear' >
                        <div class="left padding-r-1" >
                            <el-form-item  prop="expenditureCoop" >
                                <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled" v-model="form.expenditureCoop"    placeholder="" style="width:100px;" >
                                    <el-option  v-for="item in coopParams" :label="item.name" :value="item.id" ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="left padding-r-1" >
                            <el-form-item  prop="expenditureId" >
                                <el-input  :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled" title="上限30个字" maxlength="30"  v-model="form.expenditureId"   placeholder="" style="width:210px;"  ></el-input>
                            </el-form-item>
                        </div>
                    </div>   
                    <div v-if="form.expenditureIdType == '3'" class='left clear' >
                       
                        <div class="left padding-r-1" >
                            <el-form-item  prop="expenditureId" >
                                <el-input :disabled="form.isClosingAccounts == 1 || formContractDisabled || beAccountDisabled"  title="上限30个字" maxlength="30" v-model="form.expenditureId"   placeholder="" style="width:311px;"  ></el-input>
                            </el-form-item>
                        </div>
                    </div>       
                    
                </div>
                <div class="clear padding-top-5" >
                    <div class="left  padding-r-2" style="width:75px;text-align:right;" >
                        <span class="word require-word" >收支时间</span>
                    </div> 
                    <div class="left padding-r-1" >
                        <el-form-item  label-width="0">
                            <el-date-picker :disabled="form.isClosingAccounts == 1 || formContractDisabled" size="mini"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.time" style="width: 100px;" ></el-date-picker>
                        </el-form-item>
                    </div>     
                    <div class="left  padding-r-2" style="width:110px;text-align:right;" >
                        <span class="word require-word" >财务人</span>
                    </div>
                
                    <div class="left padding-r-1" >
                        <el-form-item  prop="financeUserDepartId" >
                            <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled" v-model="form.financeUserDepartId" @change="finUserByDepart2"  placeholder="" style="width:100px;" >
                                <el-option  v-for="item in departParams2"  :label="item.name" :value="item.id">
                                    <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                                        <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                                        <span v-if="item.state=='常态'">{{item.name}}</span>
                                    </span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="financeUserId" >
                            <el-select :disabled="form.isClosingAccounts == 1 || formContractDisabled" v-model="form.financeUserId"   placeholder="" style="width:100px;" >
                                <el-option  v-for="item in userParams2" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"  ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="clear padding-top-5" >
                    <div class="left  padding-r-2" style="width:75px;text-align:right;" >
                        <span class="word" >备注</span>
                    </div> 
                    <div class="left padding-r-1 padding-top-5" >
                    <textarea :disabled="form.isClosingAccounts == 1 || formContractDisabled" class="remark" style="width:412px;height:100px;" v-model="form.remark" title="上限100个字" maxlength="100" ></textarea>
                    </div>  
                </div>
                 <div v-if="synchorShow == 1" class="clear " >
                    <div class="break" >
                    </div>   
                    <div class="clear padding-top-5" >
                        <div class="clear">
                            <div class="left  padding-r-2" style="width:75px;text-align:right;" >
                                <span class="word" >同步</span>
                            </div>
                            <div class="left" style="padding-top:2px;"  >
                                <el-checkbox :disabled="form.isClosingAccounts == 1" v-model="form.isSyncConsumables" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                            </div>
                            <div class="left  padding-r-2" style="width:55px;margin-left:-15px;font-weight:700;text-align:right;" >
                                <span class="word" style="font-weight:700;" >消耗品类</span>
                            </div> 
                            <div class="left padding-r-1" >
                                <el-form-item  prop="consumablesId" >
                                    <el-select :disabled="form.isClosingAccounts == 1" v-model="form.consumablesId"   placeholder="" style="width:100px;" >
                                        <el-option  v-for="item in consumeManages" :label="item.name" :value="item.id" :class="{'leave-user':item.isClosed == 1}" ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        
                        <div class="clear">
                            <div class="left m-l-75" style="padding-top:2px;"  >
                                <el-checkbox :disabled="form.isClosingAccounts == 1" v-model="form.isSyncPhysical" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                            </div>
                            <div class="left  padding-r-2" style="width:55px;margin-left:-15px;font-weight:700;text-align:right;" >
                                <span class="word" style="font-weight:700;" >物理单位</span>
                            </div> 
                            <div class="left padding-r-1" >
                                <el-form-item  prop="consumablesId" >
                                    <el-select :disabled="form.isClosingAccounts == 1" @change="consumablesIdfunc" v-model="form.physicalCoopStateId" style="width:100px;" >
                                        <el-option  v-for="item in departCoopStateParams" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="left padding-r-1" >
                                <el-form-item  prop="consumablesId" >
                                    <el-select :disabled="form.isClosingAccounts == 1" v-model="form.physicalCoopId"   placeholder="" style="width:100px;" >
                                        <el-option  v-for="item in departCoopNameParams" :label="item.name" :value="item.id" :class="{'leave-user':item.isClosed == 1}" ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div> 
                        </div> 
                         
                    </div>
                 </div>
                 <div class="clear" style="padding-top:30px;" >
                    <div class="left  padding-r-2" style="width:75px;text-align:right;" >
                        <span class="word" >收支封账</span>
                    </div> 
                    <div class="left padding-r-1 " >
                        <el-form-item  prop="consumablesId" >
                            <el-select v-model="form.isClosingAccounts"   placeholder="" style="width:100px;" >
                                <el-option  v-for="item in closeParams" :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div v-if="form.isClosingAccounts" class="left mark-des-word " style="color:padding:5px 0 0 5px ;" >
                        (封账后不可修改以上的信息)
                    </div>
                    <div v-else-if="beAccountDisabled" class="left mark-des-word" style="padding:5px 0 0 5px ;" >
                       (该笔收支已被平账，【项类/金额/收支对方】不可修改)
                    </div>
                      
                      
                </div>      
              </el-form>  
          </div>
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
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
          <div class="right foot-btn" style="padding:0px;border-width:0px;margin-right:10px;" >
            <i class="file-icon"  @click="isShowPhotoAndFile"  ></i>
          </div>
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
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {editorFinanceData,modifyFinanceData} from "../../../service/financeData"; 
  import {financeParam,} from "../../../utils/financeParams";
  import AccountBalancePage from './accountBalance'
  import AccountBalanceSpecailPage  from './accountBalanceSpecial'
  import BeAccountBalancePage from './beAccountBalance'
  import BeAccountBalanceSpecailPage  from './beAccountBalanceSpecial'
  import {getFilesList6,deletedFiles6,uploadFiles6,updateFileName6} from '../../../service/fileData'
  import {departcoopgetListByState} from '../../../service/PhysicalManagement'
  
		
  import FilePage from '../../../components/file'
  export default {
    props:["layerid",'myid','mythisindex'],
    data() {
      return {
        isShow:1,
        synchorShow:0,
        manageShow:0,
        showAccountIcon:0,//平账标识
        beShowAccountIcon:0,//被平账标识
        formContractDisabled:false,
        accountPrice:0,//平账金额
        beAccount:3,
        beAccountDisabled:false, //被平账禁用项类 金额， 收支
        streetArr:[],
        itemClassTwoParams:[],
        itemClassThreeParams1:[],
        itemClassThreeParams2:[],
        itemClassThreeParams:[],
        itemClassFourParams:[],

        storageParams:[],
        storageParams2:[],
        storageParams3:[],
        wayOneParams:[],
        wayTwoParams:[],
        expenditureIdTypeParams:[],
        consumeManages:[],
        departCoopStateParams:[],
        departCoopNameParams:[],
        departParams1:[],
        departParams2:[],
        userParams1:[],
        userParams2:[],
        coopParams:[],
        closeParams:[{id:0,name:'未封账'},{id:1,name:'已封账'}],
        getId:this.myid,
        thisindex:this.mythisindex,
        showSelect1:false,
        boxType1:'',
        showSelect2:false,
        boxType2:'',
        showSelect3:false,
        boxType3:'',
        thistruemoney1:'',
        thistruemoney2:'',
        form:{
            id:'',
            itemClassTwo:'',
            itemClassThree:'',
            itemClassFour:'',
            financeDes:'',
            event:'',
            price:'',
            wayOne:'',
            wayTwo:'',
            expenditureIdType:'',
            expenditureCoop:'',
            expenditureId:'',
            financeUserDepartId:'',
            financeUserId:'',
            remark:'',
            time:'',
            isSyncConsumables:'0',
            isSyncPhysical:'0',
            consumablesId:'',
            isClosingAccounts:'0',
            physicalCoopStateId:'',
            physicalCoopId:'',
        },
      };
    },
    components:{
        AccountBalancePage,
        AccountBalanceSpecailPage,
        BeAccountBalancePage,
        BeAccountBalanceSpecailPage,
        FilePage,
    },
    methods:{
        consumablesIdfunc(){
            let _this = this;
            _this.$layer.loading({
              shade: true,//是否显示遮罩
            });
            departcoopgetListByState(_this.form.physicalCoopStateId).then(function (response) {
                _this.$layer.closeAll('loading');
                if(response.status == 500){
                    return false;
                }else if(response.status == 0){
                    _this.form.physicalCoopId = '';
                    _this.departCoopNameParams = [{id:'',name:'  ',select:true}].concat(response.data);
                }else if(response.status == 1){
                    _this.myAlert(response.msg+"！",'dangerous-icon');
                }
            })
        },
       isShowPhotoAndFile(){
        // this.$refs.FilePageId.showDialogVisible();
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: FilePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              recordId:_this.form.id,
              getFilesByType:getFilesList6,
              deleteFiles:deletedFiles6,
              uploadFiles:uploadFiles6,
              updateFileName:updateFileName6,
               downLoadFiles:'/finance_expenditure/downloadReFiles',
            }//props
          },
          area:['800px','560px'],
          title: "图照",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },
        checkNumPrice(){
            this.form.price= this.form.price.replace(/[^\.\d]/g,'');
        },
        changeExpenditureIdType(){
            this.form.expenditureCoop = '';
            this.form.expenditureId = '';
        },
        showSelectInputClick1(){
            this.showSelect1 = !this.showSelect1;
        },
        changeBoxType1(item){

            var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
              if (!reg.test(item.money)) {
                if (item.money == undefined||item.money == '') {
                  item.money = '';
                  return;
                }
                item.money = this.thistruemoney1;
              } else {
                this.thistruemoney1 = item.money;
              }

            let boxType = this.boxType1;
            item.money = item.money.replace(/[^\.\d]/g,'');
            let storageParams = this.storageParams;
            let name = "";
            let flag = true;
            storageParams.forEach(item => {
                if(item.select && flag){
                    name = item.name +" " +item.money + " 元";
                    flag = false;
                }
            })
            this.boxType1 = name;
        },
        showSelectInputClick2(){
            this.showSelect2 = !this.showSelect2;
        },
        changeBoxType2(item){
            var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
              if (!reg.test(item.money)) {
                if (item.money == undefined||item.money == '') {
                  item.money = '';
                  return;
                }
                item.money = this.thistruemoney2;
              } else {
                this.thistruemoney2 = item.money;
              }
            let boxType = this.boxType2;
            item.money = item.money.replace(/[^\.\d]/g,'');
            let storageParams = this.storageParams2;
            let name = "";
           let flag = true;
            storageParams.forEach(item => {
                if(item.select && flag){
                    name = item.name +" " +item.money + " 元";
                    flag = false;
                }
            })
            this.boxType2 = name;
            
        },
        showSelectInputClick3(){
            this.showSelect3 = !this.showSelect3;
        },
        changeBoxType3(item){
            let boxType = this.boxType3;
            item.money = item.money.replace(/[^\.\d]/g,'');
            let storageParams = this.storageParams3;
            let name = "";
           let flag = true;
            storageParams.forEach(item => {
                if(item.select && flag){
                    name = item.name +" " +item.money + " 元";
                    flag = false;
                }
            })
            this.boxType3 = name;
            
        },
        accountMangage(){
            // debugger;
           let itemClassThree = this.form.itemClassThree;
           let itemClassFour = this.form.itemClassFour;
           let itemClassThreeParams = this.itemClassThreeParams;
           let itemClassFourParams = this.itemClassFourParams;
           let threeName =  this.getSelectNameByList(itemClassThreeParams,itemClassThree);
           let fourName =  this.getSelectNameByList(itemClassFourParams,itemClassFour);
           let expenditureIdType = this.form.expenditureIdType;
           let expenditureId = this.form.expenditureId;
           if(  (threeName.indexOf('X') != -1 &&  fourName.indexOf("4") != -1) || 
                (threeName.indexOf('X') != -1 &&  fourName.indexOf("5") != -1) || 
                (threeName.indexOf('x') != -1 &&  fourName.indexOf("1") != -1) || 
                (threeName.indexOf('x') != -1 &&  fourName.indexOf("2") != -1) || 
                (threeName.indexOf('x') != -1 &&  fourName.indexOf("3") != -1) 
                
                

            ){
               this.showAccountIcon = 1;
              
           }else if((threeName.indexOf('x') != -1 &&  fourName.indexOf("4") != -1) || 
                (threeName.indexOf('x') != -1 &&  fourName.indexOf("5") != -1) || 
                (threeName.indexOf('X') != -1 &&  fourName.indexOf("1") != -1) || 
                (threeName.indexOf('X') != -1 &&  fourName.indexOf("2") != -1) || 
                (threeName.indexOf('X') != -1 &&  fourName.indexOf("3") != -1) ){    
                this.beShowAccountIcon = 1;   
            }else{
               this.showAccountIcon = 0;
           }

        },
        accountMangageClick(){
           let _this = this;
           let itemClassTwo = this.form.itemClassTwo;
           let itemClassThree = this.form.itemClassThree;
           let itemClassFour = this.form.itemClassFour;
           let itemClassThreeParams = this.itemClassThreeParams;
           let itemClassFourParams = this.itemClassFourParams;
           let threeName =  this.getSelectNameByList(itemClassThreeParams,itemClassThree);
           let fourName =  this.getSelectNameByList(itemClassFourParams,itemClassFour);
           let expenditureIdType = this.form.expenditureIdType;
           let expenditureId = this.form.expenditureId;
          
           if(threeName.indexOf('X') != -1 && fourName.indexOf("5") != -1 ){
                let checkFinance = this.form.financeIds; 
                let checkSalary = this.form.salaryIds; 
                let expenditureIdType = this.form.expenditureIdType;
                let expenditureCoop = this.form.expenditureCoop;
                let expenditureId = this.form.expenditureId;
                let test = this.$layer.iframe({
                    content: {
                        content: AccountBalanceSpecailPage , //传递的组件对象
                        parent: this,//当前的vue对象
                        data:{
                            itemClassFour:itemClassFour,
                            itemClassTwo:itemClassTwo,
                            preId:this.form.id,
                            financeId:this.form.financeId,
                            checkFinance:checkFinance,
                            checkSalary:checkSalary,
                            expenditureIdType:expenditureIdType,
                            expenditureDepartId:expenditureCoop,
                            expenditureUserId:expenditureId,
                        }//props
                    },
                    area:['550px','450px'],
                    title: "平账列表  项类  " + threeName + fourName,
                    shadeClose: false,
                    shade: true,//是否显示遮罩
                    zIndex:19891110,
                    cancel:()=>{//关闭事件
                    
                    }
                });
           }else  if(threeName.indexOf('x') != -1 && fourName.indexOf("5") != -1 ){
                let checkFinance = this.form.financeIds; 
                let checkSalary = this.form.salaryIds; 
                let expenditureIdType = this.form.expenditureIdType;
                let expenditureCoop = this.form.expenditureCoop;
                let expenditureId = this.form.expenditureId;
                let test = this.$layer.iframe({
                    content: {
                        content: BeAccountBalanceSpecailPage , //传递的组件对象
                        parent: this,//当前的vue对象
                        data:{
                            itemClassFour:itemClassFour,
                            itemClassTwo:itemClassTwo,
                            preId:this.form.id,
                            checkFinance:checkFinance,
                            checkSalary:checkSalary,
                            expenditureIdType:expenditureIdType,
                            expenditureDepartId:expenditureCoop,
                            expenditureUserId:expenditureId,
                        }//props
                    },
                    area:['550px','450px'],
                    title: "被平账列表  项类  " + threeName + fourName,
                    shadeClose: false,
                    shade: true,//是否显示遮罩
                    zIndex:19891110,
                    cancel:()=>{//关闭事件
                    
                    }
                });
           }else if((threeName.indexOf('X') != -1 && fourName.indexOf("4") != -1) || 
                (threeName.indexOf('x') != -1 && fourName.indexOf("1") != -1) || 
                (threeName.indexOf('x') != -1 && fourName.indexOf("2") != -1) || 
                (threeName.indexOf('x') != -1 && fourName.indexOf("3") != -1)
               
            ){
               let checkFinance = this.form.financeIds; 
               let expenditureIdType = this.form.expenditureIdType;
               let expenditureCoop = this.form.expenditureCoop;
               let expenditureId = this.form.expenditureId;
               let test = this.$layer.iframe({
                content: {
                    content: AccountBalancePage , //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{
                        itemClassFour:itemClassFour,
                        itemClassTwo:itemClassTwo,
                        preId:this.form.id,
                        financeId:this.form.financeId,
                        checkFinance:checkFinance,
                        expenditureIdType:expenditureIdType,
                        expenditureDepartId:expenditureCoop,
                        expenditureUserId:expenditureId,
                    }//props
                },
                area:['550px','450px'],
                title: "平账列表  项类  " + threeName + fourName,
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                
                }
                });
                
           }else if((threeName.indexOf('x') != -1 && fourName.indexOf("4") != -1) || 
                (threeName.indexOf('X') != -1 && fourName.indexOf("1") != -1) || 
                (threeName.indexOf('X') != -1 && fourName.indexOf("2") != -1) || 
                (threeName.indexOf('X') != -1 && fourName.indexOf("3") != -1)
               
            ){
               let checkFinance = this.form.financeIds; 
               let expenditureIdType = this.form.expenditureIdType;
               let expenditureCoop = this.form.expenditureCoop;
               let expenditureId = this.form.expenditureId;
               let test = this.$layer.iframe({
                content: {
                    content: BeAccountBalancePage , //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{
                        itemClassFour:itemClassFour,
                        itemClassTwo:itemClassTwo,
                        preId:this.form.id,
                        checkFinance:checkFinance,
                        expenditureIdType:expenditureIdType,
                        expenditureDepartId:expenditureCoop,
                        expenditureUserId:expenditureId,
                    }//props
                },
                area:['550px','450px'],
                title: "被平账列表  项类  " + threeName + fourName,
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                
                }
                });
                
           }

        },
         setAccountFinanceIds(financeId,elem,financeDes,checkFinanceArr){
            this.form.financeIds = financeId;
            let count = 0;
            checkFinanceArr.forEach(item => {
                if(item.count != null){
                    count += Number(item.count);
                }
            })
            this.accountPrice = count;

            let expenditureIdType = elem.expenditureIdType;
            let expenditureDepartId = elem.expenditureDepartId;
            let expenditureUserId = elem.expenditureUserId;

            let departId = elem.departId;
            let userId = elem.userId;
            this.form.expenditureIdType = expenditureIdType;
            this.form.expenditureCoop = expenditureDepartId;
            this.form.expenditureId = expenditureUserId;
            this.form.fexpenditureId = expenditureUserId;
            this.form.financeDes = financeDes;
            this.findUserByDepartIds();

        },
        setAccountFinanceIdsAndSalaryIds(elem1,elem2,financeDes,checkFinanceArr,checkSalaryArr){
            let count = 0;
            let flag = true;
            if(elem1){
                let arr = [];
                checkFinanceArr.forEach(item => {
                    arr.push(item.id);
                    count = count + item.count*1;
                })
                this.form.financeIds = arr.toString();

                let expenditureIdType = elem1.expenditureIdType;
                let expenditureDepartId = elem1.expenditureDepartId;
                let expenditureUserId = elem1.expenditureUserId;

                let departId = elem1.departId;
                let userId = elem1.userId;
                this.form.expenditureIdType = expenditureIdType;
                this.form.expenditureCoop = expenditureDepartId;
                this.form.expenditureId = expenditureUserId;
                this.form.pexpenditureId = expenditureUserId;
               
                this.findUserByDepartIds();
                flag = false;
            }else{
                this.form.financeIds = ""; 
            }
             if(elem2){
                let arr = [];
                checkSalaryArr.forEach(item => {
                    arr.push(item.id);
                    count = count + item.count*1;
                })
                this.form.salaryIds = arr.toString(); 
                
                if(flag){
                    let expenditureIdType = elem2.expenditureIdType;
                    let expenditureDepartId = elem2.expenditureDepartId;
                    let expenditureUserId = elem2.expenditureUserId;

                    let departId = elem2.departId;
                    let userId = elem2.userId;
                    this.form.expenditureIdType = expenditureIdType;
                    this.form.expenditureCoop = expenditureDepartId;
                    this.form.expenditureId = expenditureUserId;
                    this.form.pexpenditureId = expenditureUserId;
                    this.findUserByDepartIds();
                }   
            }else{
                 this.form.salaryIds = ""; 
            }
            this.form.financeDes = financeDes;
            this.accountPrice = count;
        },
       getFinanceParamData(){
        let _this = this;
        let form = {id:this.getId,};
         this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        editorFinanceData(form).then(function(response) {
          _this.$layer.closeAll("loading");  
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let financeExpenditure = response.data.financeExpenditure;
            let beAccount = financeExpenditure.beAccount;
            _this.beAccount = beAccount;
            if(beAccount == 2 ||  beAccount == 4){
                _this.beAccountDisabled = true;
            }else{
                _this.beAccountDisabled = false;
            }
            let departTree = params.departTree;
            let balanceList = response.data.balanceList;
            if(departTree && departTree.length != 0){
               let arr = [{id:'',name:" ",select:true}]; 
              for(let i = 0 ; i  < departTree.length ; i++){
                arr.push({
                  id:departTree[i].id,
                  name:departTree[i].label.replace(/&nbsp;/g,""),
                  select:departTree[i].select,
                  state:departTree[i].state,
                  level:departTree[i].level,
                })
              }
              _this.departParams1 = JSON.parse(JSON.stringify(arr));
              _this.departParams2 = JSON.parse(JSON.stringify(arr));
              _this.userParam1 = [{id:'',name:" ",select:true}]; 
              _this.userParam2 = [{id:'',name:" ",select:true}]; 
              
            }
            let itemClassTwoParams = params.itemClassTwoParams;
            _this.itemClassTwoParams = [{id:'',name:" ",select:true}].concat(itemClassTwoParams);
            let itemClassThreeParams1 = params.itemClassThreeParams1;
            let itemClassThreeParams2 = params.itemClassThreeParams2;
            _this.itemClassThreeParams1 = [{id:'',name:" ",select:true}].concat(itemClassThreeParams1);
            _this.itemClassThreeParams2 = [{id:'',name:" ",select:true}].concat(itemClassThreeParams2);
            let storageParams = params.storageParams;
            
            let itemClassTwoName = financeExpenditure.itemClassTwoName;
            let storages = response.data.storages;
            let outStorages = response.data.outStorages;
           
            if(storageParams && storageParams.length != 0){
                storageParams.forEach(item =>{
                    item.select = false;
                    item.money = "";
                })
            }
            if(itemClassTwoName == '收入'){
              _this.itemClassThreeParams = [{id:'',name:" ",select:true}].concat(itemClassThreeParams1);
              _this.isShow = 1;
              _this.synchorShow = 0;
              _this.manageShow = 0;
              let currentArr = JSON.parse(JSON.stringify(storageParams));
             
              let inputValue =  _this.setStoragesSelectAndInput(storages,currentArr);
              _this.boxType1 = inputValue;
              _this.storageParams = JSON.parse(JSON.stringify(currentArr));
              _this.storageParams2 = JSON.parse(JSON.stringify(storageParams));
              _this.storageParams3 = JSON.parse(JSON.stringify(storageParams));
            }else if(itemClassTwoName == '支出'){
              _this.itemClassThreeParams = [{id:'',name:" ",select:true}].concat(itemClassThreeParams2);
               _this.isShow = 1;
              _this.synchorShow = 1;
              _this.manageShow = 0;
              let currentArr = JSON.parse(JSON.stringify(storageParams));
             
              let inputValue =  _this.setStoragesSelectAndInput(storages,currentArr);
              _this.boxType1 = inputValue;
              
              _this.storageParams = JSON.parse(JSON.stringify(currentArr));
              _this.storageParams2 = JSON.parse(JSON.stringify(storageParams));
              _this.storageParams3 = JSON.parse(JSON.stringify(storageParams));

            }else{
              _this.itemClassThreeParams = [{id:'',name:" ",select:true}];
               _this.isShow = 0;
              _this.synchorShow = 0;
              _this.manageShow = 1;
              let currentArr = JSON.parse(JSON.stringify(storageParams));
              let inputValue =  _this.setStoragesSelectAndInput(storages,currentArr);
              _this.boxType2 = inputValue;
              _this.storageParams2 = JSON.parse(JSON.stringify(currentArr));
              currentArr = JSON.parse(JSON.stringify(storageParams));
              inputValue =  _this.setStoragesSelectAndInput(outStorages,currentArr);
              _this.boxType3 = inputValue;
              _this.storageParams3 = JSON.parse(JSON.stringify(currentArr));
              
              _this.storageParams = JSON.parse(JSON.stringify(storageParams));

            }
            let expenditureUsers = params.expenditureUsers;
            if(expenditureUsers){
                let arr = [{id:'',name:" ",select:true}];
               if(expenditureUsers && expenditureUsers.length != 0){
                    expenditureUsers.forEach(function(item){
                        let obj = {
                            id: item.id,
                            name: item.name,
                            stateUser:0,
                        }
                        if(item.paramName == '正式离职'){
                            obj.stateUser  = 1;
                        }
                        arr.push(obj);
                    })
                }  
              _this.userParams1 =  arr; 
            }
            let financeUsers = params.financeUsers;
            if(financeUsers){
                let arr = [{id:'',name:" ",select:true}];
               if(financeUsers && financeUsers.length != 0){
                    financeUsers.forEach(function(item){
                        let obj = {
                            id: item.id,
                            name: item.name,
                            stateUser:0,
                        }
                        if(item.paramName == '正式离职'){
                            obj.stateUser  = 1;
                        }
                        arr.push(obj);
                    })
                }  
              _this.userParams2 =  arr; 
            }
            
            _this.itemClassFourParams = [{id:'',name:" ",select:true}].concat(params.itemClassFourParams);
            
            let wayOneParams = params.wayOneParams;
            _this.wayOneParams = [{id:'',name:" ",select:true}].concat(wayOneParams);
            let wayTwoParams = params.wayTwoParams;
            _this.wayTwoParams = [{id:'',name:" ",select:true}].concat(wayTwoParams);
            
            _this.expenditureIdTypeParams = [{id:'',name:" ",select:true}].concat(financeParam.finaceExpendType);
            _this.coopParams = [{id:'',name:" ",select:true}].concat(financeParam.coopParams);
            let consumeManages = params.consumeManages;
            
            _this.consumeManages = [{id:'',name:" ",select:true,isClosed:0,}].concat(consumeManages);
            _this.departCoopStateParams = [{id:'',name:" ",select:true,isClosed:0,}].concat(params.departCoopStateParams);

            
            for(let attr in financeExpenditure){
              if(financeExpenditure[attr] == null){
                financeExpenditure[attr] = '';

              }
            }
            _this.accountPrice = financeExpenditure.countPrice;
            _this.form = financeExpenditure;
            if(balanceList && balanceList.length != 0){
                try{
                    let financeDes = "";
                    balanceList.forEach(item => {
                       financeDes += (item.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+item.event +"<br/>");
                    })
                    _this.form.financeDes = financeDes ;
                }catch(e){

                }
           }
            //从合同同步过来；
            if(financeExpenditure.financeId){
                _this.formContractDisabled = true;
            }

            if(params.physicalCoops){
                let myarr = [{id:'',name:" ",select:false}];
                params.physicalCoops.forEach(function(item){
                    myarr.push({
                        id:item.id,
                        name:item.name,
                        select:false,
                    })
                })
              _this.departCoopNameParams =  myarr; 
            }

            _this.accountMangage();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })  
      },
       setStoragesSelectAndInput(storageValues,storageParams){
            let  map = {};
            let inputValue = "";
            storageValues.forEach(item => {
                map[item.paramId] = item.paramValue;
            })
            let arr = [];
            let flag = true;
            storageParams.forEach(item => {
                if(map[item.id]){
                    item.money = map[item.id];
                    item.select = true;
                    if(flag){
                        arr.push(item.name +" "+item.money+ " 元"  );
                        flag = false;
                    }    
                }
            })
            inputValue = arr.toString();
            return inputValue;
	   },
       getItemClassThreeByTwoId(){
          let itemClassTwo = this.form.itemClassTwo;
          let itemClassTwoParams = this.itemClassTwoParams;
          let itemClassName = "";
          itemClassTwoParams.forEach(item =>{
              if(item.id == itemClassTwo){
                  itemClassName = item.name;
                  return false;
              }
          })
          if(itemClassName == '收入'){
              this.itemClassThreeParams = JSON.parse(JSON.stringify(this.itemClassThreeParams1));
              this.isShow = 1;
              this.synchorShow = 0;
              this.manageShow = 0;
              this.form.isSyncConsumables = 0;
              this.form.isSyncPhysical = 0;
              this.form.consumablesId = '';
          }else if(itemClassName == '支出'){
              this.itemClassThreeParams = JSON.parse(JSON.stringify(this.itemClassThreeParams2));
              this.isShow = 1;
              this.synchorShow = 1;
              this.manageShow = 0;
              this.form.isSyncConsumables = 0;
              this.form.isSyncPhysical = 0;
              this.form.consumablesId = '';
          }else{
              this.itemClassThreeParams  = [{id:'',name:" ",select:true}]; 
              this.isShow = 0;
              this.synchorShow = 0;
              this.manageShow = 1;
              this.form.isSyncConsumables = 0;
              this.form.isSyncPhysical = 0;
              this.form.consumablesId = '';
          }
          this.itemClassFourParams  = [{id:'',name:" ",select:true}]; 
          this.form.itemClassThree = "";
          this.form.itemClassFour = "";
          this.showAccountIcon = 0;

      }, 
      getItemClassFourByThreeId(){
          let itemClassThree = this.form.itemClassThree;
          let itemClassThreeParams = this.itemClassThreeParams;
          let getChildren = [];
          itemClassThreeParams.forEach(item =>{
              let children = item.children;
              if(children &&  itemClassThree == item.id){
                  getChildren = children;
                  return false;
              }
          })
          if(getChildren && itemClassThree.length != 0){
              this.itemClassFourParams = [{id:'',name:" ",select:true}].concat(getChildren);
          }else{
              this.itemClassFourParams = [{id:'',name:" ",select:true}];
          }
          this.form.itemClassFour = "";
          this.showAccountIcon = 0;
      },
       findUserByDepartIds(){
            let _this = this;
            
            let id1 = this.form.expenditureCoop;
            let id2 = this.form.financeUserDepartId;
            let arr = [id1,id2];
            let form = {id:arr.toString(),flag:3,isSelect:1,showLeave:1};
            findUserByDepartId(form).then(function (response) {
                if (response.status == 500) {
                return false;
                } else if (response.status == 0) {
                let data = response.data;
                let user = data.user;
                let arr1 = [{id:'',name:" ",select:true}];
                let arr2 = [{id:'',name:" ",select:true}];
                if(user && user.length != 0){
                    user.forEach(function(item){
                    
                        let obj = {
                            id: item.id,
                            name: item.name,
                            stateUser:0,
                        }
                        if(item.paramName == '正式离职'){
                            obj.stateUser  = 1;
                        }
                        if(item.departId == id1){
                            arr1.push(obj);
                        }
                        if(item.departId == id2){
                            arr2.push(obj);
                        }
                        
                    })
                }
                 _this.userParams1 = arr1;
                 _this.userParams2 = arr2;
                } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message + "！");
                }
            })
       },
       finUserByDepart1(){
        let _this = this;
        let id = this.form.expenditureCoop;
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'',name:" ",select:true}];
              if(user && user.lengthg != 0){
                user.forEach(function(item){
                    let obj = {
                        id: item.id,
                        name: item.name,
                        stateUser:0,
                    }
                    if(item.paramName == '正式离职'){
                        obj.stateUser  = 1;
                    }
                    arr.push(obj);
                })
              }
              _this.userParams1 = arr;
              _this.form.expenditureId = "";
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.userParams1 = [{id:'',name:" ",select:true}];
        }
      },
      finUserByDepart2(){
        let _this = this;
        let id = this.form.financeUserDepartId;
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'',name:"",select:true}];
              if(user && user.lengthg != 0){
                user.forEach(function(item){
                    let obj = {
                        id: item.id,
                        name: item.name,
                        stateUser:0,
                    }
                    if(item.paramName == '正式离职'){
                        obj.stateUser  = 1;
                    }
                    arr.push(obj);
                })
              }
              _this.userParams2 = arr;
              _this.form.financeUserId = "";
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.userParams2 = [{id:'',name:" ",select:true}];
        }

      },
      saveData(){

        let _this =  this;
        let form = JSON.parse(JSON.stringify(_this.form));
        let itemClassTwo = form.itemClassTwo;

       
        let event = form.event;
        let price = form.price;
        let wayOne = form.wayOne;
        let wayTwo = form.wayTwo;

        let expenditureIdType = form.expenditureIdType;
        let expenditureCoop = form.expenditureCoop;
        let expenditureId = form.expenditureId;

        let time = form.time;
        let financeUserId = form.financeUserId;
        let itemClassTwoParams = this.itemClassTwoParams;
        let storageParams = this.storageParams;
        let storageParams2 = this.storageParams2;
        let storageParams3 = this.storageParams3; 
        let itemClassName = "";
        let accountPrice = this.accountPrice;//平账金额
        itemClassTwoParams.forEach(item =>{
            if(item.id == itemClassTwo){
                itemClassName = item.name;
                return false;
            }
        })
        
        let itemClassThree = this.form.itemClassThree;
        let itemClassFour = this.form.itemClassFour;
        let itemClassThreeParams = this.itemClassThreeParams;
        let itemClassFourParams = this.itemClassFourParams;
        let threeName =  this.getSelectNameByList(itemClassThreeParams,itemClassThree);
        let fourName =  this.getSelectNameByList(itemClassFourParams,itemClassFour);
        let salaryIds = this.form.salaryIds;
        let financeIds = this.form.financeIds;
        debugger;
        if(itemClassName == ''){
          this.myAlert("项类不能为空",'dangerous-icon');
          return false;
        }else{
            if(itemClassName != '' && itemClassName != '管理' && itemClassFour == ''){
                this.myAlert("项类不能为空",'dangerous-icon');
                return false;
            }else if(itemClassName != '' && itemClassName != '管理'){
                if(threeName.indexOf('X') != -1 && fourName.indexOf("5") != -1 ){
                    if(!salaryIds && !financeIds){
                        this.myAlert("必须先进行平账再保存",'dangerous-icon');
                        return false;
                    }
                    let pexpenditureId = this.form.pexpenditureId;
                    if(pexpenditureId && expenditureId != pexpenditureId){
                        this.myAlert("所选择的被平账数据的收方必须一致，请重新选择！",'dangerous-icon');
                        return false;
                    }
                }else if((threeName.indexOf('X') != -1 && fourName.indexOf("4") != -1) || 
                    (threeName.indexOf('x') != -1 && fourName.indexOf("1") != -1) || 
                    (threeName.indexOf('x') != -1 && fourName.indexOf("2") != -1) || 
                    (threeName.indexOf('x') != -1 && fourName.indexOf("3") != -1)
                
                ){
                    if(!financeIds ){
                        this.myAlert("必须先进行平账再保存",'dangerous-icon');
                        return false;
                    }
                    let pexpenditureId = this.form.pexpenditureId;
                    if(pexpenditureId && expenditureId != pexpenditureId){
                        this.myAlert("所选择的被平账数据的收方必须一致，请重新选择！",'dangerous-icon');
                        return false;
                    }
                }else if((threeName.indexOf('x') != -1 && fourName.indexOf("4") != -1) || 
                    (threeName.indexOf('X') != -1 && fourName.indexOf("1") != -1) || 
                    (threeName.indexOf('X') != -1 && fourName.indexOf("2") != -1) || 
                    (threeName.indexOf('X') != -1 && fourName.indexOf("3") != -1)){
                    let fexpenditureId = this.form.fexpenditureId;
                    if(fexpenditureId && expenditureId != fexpenditureId){
                        this.myAlert("所选择的被平账数据的收方必须一致，请重新选择！",'dangerous-icon');
                        return false;
                    }    
                }    
            }
        }
        
        if(!event){
            this.myAlert("事件不能为空",'dangerous-icon');
            return false;
        }
        if(price == ''){
            this.myAlert("金额不能为空",'dangerous-icon');
            return false;
        }
        
        if(itemClassName != '' && itemClassName != '管理'){
            if((threeName.indexOf('X') != -1 && fourName.indexOf("5") != -1)|| ( threeName.indexOf('X') != -1 && fourName.indexOf("4") != -1) || 
                (threeName.indexOf('x') != -1 && fourName.indexOf("1") != -1) || 
                (threeName.indexOf('x') != -1 && fourName.indexOf("2") != -1) || 
                (threeName.indexOf('x') != -1 && fourName.indexOf("3") != -1)
            
            ){
                if((price != '' && accountPrice != '') &&  ( price*1 >  accountPrice*1)){
                    this.myAlert("主平账数值不能大于所勾选被平账数据的未平账部分的绝对值总和!",'dangerous-icon');
                    return false;
                } 
            }    
        } 
        if(!wayOne || !wayTwo){
            this.myAlert("来源不能为空",'dangerous-icon');
            return false;
        }
        let storages = [];
        let outSstorages = [];
        if(itemClassName == "收入" || itemClassName == "支出"){
            let flag = false;
            storageParams.forEach(item => {
                if(item.select){
                    storages.push({paramId:item.id,paramValue:item.money});
                    flag = true;
                }
            })
            if(!flag){
                this.myAlert("存出方式不能为空",'dangerous-icon');
                return false;
            }
            let count = 0;
            if(storages && storages.length != 0){
                storages.forEach(item => {
                    if(item.paramValue){
                        count += (item.paramValue)*1;
                    }
                })
            }
            if(count != price){
                this.myAlert("存出方式金额之和必须等于总金额！",'dangerous-icon');
                return false;
            }
        }else if(itemClassName == "管理"){
            let flag = false;
            storageParams2.forEach(item => {
                if(item.select){
                   storages.push({paramId:item.id,paramValue:item.money});
                    flag = true;
                }
            })
            if(!flag){
                this.myAlert("转出方式不能为空",'dangerous-icon');
                return false;
            }
            flag = false;
            storageParams3.forEach(item => {
                if(item.select){
                    outSstorages.push({paramId:item.id,paramValue:item.money});
                    flag = true;
                }
            })
            if(!flag){
                this.myAlert("转入方式不能为空",'dangerous-icon');
                return false;
            }
        }
        if( itemClassName != '管理'){
            let expenditureCoop = this.form.expenditureCoop;
            let expenditureId = this.form.expenditureId;
            if(expenditureIdType == ''){
                this.myAlert("收支对方不能为空",'dangerous-icon');
                return false;
            }else if(expenditureIdType == '1'){
                if(!expenditureIdType || !expenditureId){
                    this.myAlert("收支对方不能为空",'dangerous-icon');
                    return false;
                }
            }else if(expenditureIdType == '2'){
                if(!expenditureIdType || expenditureId == ''){
                    this.myAlert("收支对方不能为空",'dangerous-icon');
                    return false;
                }
            }else if(expenditureIdType == '3'){
                 if(expenditureId == ''){
                    this.myAlert("收支对方不能为空",'dangerous-icon');
                    return false;
                }
            }
           
        }
        if(time == ''){
            this.myAlert("收支时间不能为空",'dangerous-icon');
            return false;
        }
        if(financeUserId == ''){
            this.myAlert("财务人不能为空",'dangerous-icon');
            return false;
        }

        if(form.isSyncConsumables=='1'&&form.consumablesId==''){
            this.myAlert("请选择要同步的消耗品!",'dangerous-icon');
            return false;
        }

        if(form.isSyncPhysical=='1'&&form.physicalCoopId==''){
            this.myAlert("请选择要同步的物理名称!",'dangerous-icon');
            return false;
        }

        storages = JSON.stringify(storages);
        outSstorages = JSON.stringify(outSstorages);
        
        if(storages){
            form.storages = storages;
        }
        if(outSstorages){
            form.outStorages = outSstorages;
        }
        modifyFinanceData(form).then(function(response){

          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
              _this.myAlert("数据保存成功",'success-icon').then(res => {
                 _this.$parent.reloadFinanceList(3,_this.form.id);  
                _this.cancelData();
              }).catch(err => {

              })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
      getSelectNameByList(list,id){
        let name = '';
        list.forEach(function(item){
          if(item.id == id){
            name = item.name;
            return false;
          }
        })
        return name;
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
          this.getFinanceParamData();
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
          this.getFinanceParamData();
        },
    },
    mounted(){
        this.getFinanceParamData();
    },
    watch:{
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
  }
</script>

<style lang="scss" scoped>
  .move-content {
    .require-word:before{
        content: '*';
        color: #F56C6C;
        margin-right: 1px;
    }
    .word{
        line-height:27px;
    }
    .padding-top-5{
        padding-top:5px;
    }
    .padding-r-1{
        padding-right:1px;
    }
    .padding-r-2{
        padding-right:2px;
    }
    .account-icon{
        background: url(../../../images/icon.png) -33px -190px no-repeat;
        width: 20px;
        height: 20px;
        display: inline-block;
        cursor: pointer;
    }
    .select-check{
        line-height:23px;
    }
    .disabled-input{
        cursor:not-allowed;
        background:#E6E6E6;
    }
  }
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
