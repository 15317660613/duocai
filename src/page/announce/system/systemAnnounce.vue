<template>
  <div id="finance-income-pay-container" class="rent-container mycontailerclass1" >
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <div  class="item left padding-l-10 clear"  @click="newFinance" >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="fa fa-plus add"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >新增</span>
              </div>
            </div>  
          </div>

          <div  class="item left clear padding-l-10" @click="deletedFinance"  >
             <div class="border-icon clear" > 
              <div class="left"  >
                <i class="fa fa-times delete"  ></i>
              </div>
              <div class="left"  >
                <span class="search-word" >删除</span>
              </div>
             </div>  
          </div>

           <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div  class="item left padding-l-10 clear"  @click="incomeNOAccount" >
             <div class="border-icon clear" > 
              <div class="left"  >
                <i class="income-budget-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >收入未平账</span>
              </div>
             </div>  
          </div>
          <div  class="item left padding-l-10 clear"  @click="payNoAccount" >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="pay-budget-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >支出未平账</span>
              </div>
             </div> 
          </div>
           <div  class="item left padding-l-10 clear"  @click="totalNoAccount" >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="total-budget-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >全部未到账</span>
              </div>
            </div> 
          </div>
          <div  class="item left padding-l-10 clear"  @click="bacthAccount" >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="account-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >收支封账</span>
              </div>
            </div>  
          </div>

          <div class="item left clear padding-l-10"  >
            <div class="left clear" @click="cancelBatchAccount"  >
              <div class="border-icon clear" > 
                <div class="left"  >
                  <i class="cancel-account-icon"  ></i>
                </div>
                <div class="left"   >
                  <span class="search-word" >取消封账</span>
                </div>
              </div>  
            </div>  
             <div class="left padding-l-10"  >
                <i class="cut-icon"></i>
            </div>
           <div class="left padding-l-5 padding-t-5" >
            <div class="border-icon clear" > 
              <i class="one-Thirteen-icon" title="过滤选中"  @click="filterData" ></i>
            </div>  
          </div>
         

          <div class="left padding-l-10">
            <div class="border-icon clear" > 
             <i class="leading-out-icon" title="自选列" @click="clickColumn"></i>
            </div> 
          </div>
          <div type="primary" class="padding-l-10 left padding-t-2" @click="exportToExcel">
            <div class="border-icon clear" > 
              <i class="print-out-icon" title="导出" ></i>
            </div>  
          </div>

          <div class="item padding-l-5 left">
            <div class="record-num">
              <span class="search-word">&lt;</span>
              <span class="search-word">{{currentNum}}</span>
              <span class="search-word">/</span>
              <span class="search-word">{{tableData.length}}</span>
              <span class="search-word">&gt;</span>
            </div>
          </div>

          <div class="item left clear padding-l-15">
            <div class="border-icon clear" > 
              <i class="back-icon user left" @click="tabRemove('/home/FinanceDetails')"></i>
            </div>  
          </div>
          </div>
        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" >
              <div class="left padding-l-15" >
              <span class="des-word" >日期</span>
            </div>
            <div class="left " >
              <el-form-item prop="timeType" label-width="0">
                <el-select v-model="form.timeMode"  placeholder="" style="width:85px;" >
                  <el-option  label="收支日" value="1" ></el-option>
                  <el-option  label="录入日" value="2" ></el-option>
                </el-select>
              </el-form-item>

            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-select  @change="getQuickDate" v-model="quick"  placeholder="" style="width:85px;"   >
                   <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="今天" value="2" ></el-option>
                  <el-option  label="昨天" value="21" ></el-option>
                  <el-option  label="三天" value="3" ></el-option>
                  <el-option  label="上周" value="16" ></el-option>
                  <el-option  label="本周" value="15" ></el-option>
                  <el-option  label="上月" value="17" ></el-option>
                  <el-option  label="本月" value="9" ></el-option>
                  
                  <el-option  label="上年" value="11" ></el-option>
                  <el-option  label="本年" value="12" ></el-option>
                  <el-option  label="自定义" value="1" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="form.timeStart" style="width: 90px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="form.timeEnd" style="width: 90px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >项类</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-select  v-model="form.itemClassTwo" @change="getItemClassThreeByTwoId"  placeholder="" style="width:60px;" >
                  <el-option v-for="item in itemClassTwoParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-select  v-model="form.itemClassThree"  @change="getItemClassFourByThreeId"   placeholder="" style="width:100px;" >
                  <el-option v-for="item in itemClassThreeParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial  :selectId="itemclass" :listData="itemClassFourParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >对方</span>
            </div>
            <div class="clear left" style="width:290px;" >
              <div class="left " >
                <el-form-item label="" label-width="0">
                  <el-select @change="changeUserType" v-model="form.expenditureIdType"  placeholder="" style="width:70px;" >
                    <el-option v-for="item in expenditureIdTypeParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="clear left" v-if="showDepart1"  >
                <div class="left " >
                  <el-form-item label="" label-width="0">
                    <CheckSelectSpecial @findStreetByTown="finUserByDepart1"  :selectId="departIds1" :listData="departParams1" style="width:110px;" ></CheckSelectSpecial>
                  </el-form-item>
                </div>
                <div class="left " >
                  <el-form-item label="" label-width="0">
                    <CheckSelectSpecial  :selectId="userIds1" :listData="userParams1" style="width:110px;" ></CheckSelectSpecial>
                  </el-form-item>
                </div>
              </div>
              <div class="clear left" v-if="showDepart2"  >
                <div class="left " >
                  <el-form-item label="" label-width="0">
                    <el-select v-model="form.expenditureCoop"  placeholder="" style="width:85px;" >
                         <el-option v-for="item in coopParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                
              </div>
            </div>  
            <div class="left padding-l-15" style=""  >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.word"  title="流水号/事件/备注" maxlength="30" style="width:140px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>

            <div class=" left padding-l-5" >
              <i class="search-btn" @click="searchFinanceDataList"  >查询</i>
            </div>
            <div class="left"  style="padding-top:1px;" >
              <i class="claerlys" @click="clearForm"  ></i>
            </div>
            <div class="left" style="margin-top:3px;" >
              <i :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}" @click="showSearch" ></i>
            </div>
          </div>
          <div class="clear"   id="finance-search" >
              <div class="left padding-l-15" >
                <span class="des-word" >财务</span>
              </div>
              <div class="left " >
                <el-form-item label="" label-width="0">
                    <CheckSelectSpecial @findStreetByTown="finUserByDepart2" :selectId="departIds2" :listData="departParams2" style="width:110px;" ></CheckSelectSpecial>
                </el-form-item>
                </div>
              <div class="left padding-l-2" >
                <el-form-item label="" label-width="0">
                    <CheckSelectSpecial :selectId="userIds2" :listData="userParams2" style="width:110px;" ></CheckSelectSpecial>
                </el-form-item>
              </div>
              <div class="left padding-l-15" >
                <span class="des-word" >收支封账</span>
              </div>
              <div class="left " >
                <el-form-item  label-width="0">
                    <el-select v-model="form.isClosingAccounts"  placeholder="" style="width:85px;" >
                         <el-option  label="全部" value="-1" ></el-option>
                        <el-option  label="未封账" value="0" ></el-option>
                        <el-option  label="已封账" value="1" ></el-option>
                    </el-select>
                </el-form-item>

                </div>
          </div>    
        </el-form>
      </div>
    </div>

    <div class="content clear" style="height:calc(100% - 130px)" >

      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName"
          :cell-class-name="rowClass"
          :cell-style="cellStyle"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :row-height="rowHeight"
          ref="singleTable"
        >


          <template v-if="item.show" v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop == 'icon'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
            >
              <template slot-scope="scope">
                <div  style="padding-left:5px;position:relative;" >
                  <i :class="{'public-icon':scope.row.customerType == '1','private-icon':scope.row.customerType == '2'}" ></i>

                </div>
              </template>
            </PlTableColumn>
            <PlTableColumn
              v-else-if="item.prop == 'event'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
            >
              <template slot-scope="scope">
                <div v-html="scope.row.event" style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="getFinanceEditor(scope.$index, scope.row)" >

                </div>
              </template>
            </PlTableColumn>
            <PlTableColumn
              v-else-if="item.prop == 'price'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
            >
                <template slot="header" slot-scope="scope">
                  <div class="clear" style="display:inline-block;" >
                    <span>{{item.label}}</span>
                     <span v-html="priceTotal" v-if="priceTotal != '' && priceTotal.indexOf('-') != -1" style="color:#CC3300;text-algin:center;cursor:pointer;"  >
                     
                    </span>
                    <span  v-html="priceTotal" v-else-if="priceTotal != '' && priceTotal.indexOf('-') == -1" style="color:#009933;text-algin:center;cursor:pointer;"  >
                        
                    </span>
                  </div>  
                </template>
             
               <template slot-scope="scope" style="height: 100%;">
                 <div class="clear" style="position:relative;" >
                  <div class="left" >
                    <i :class="{'seven-one-icon':scope.row.beAccount == 3,'seven-two-icon':scope.row.beAccount == 2,'seven-three-icon':scope.row.beAccount == 4}" ></i>
                  </div>
                  <div class="right" >   
                    <div :title="'转出：'+scope.row .storage +'  \n转入：'+ scope.row.outStorage" v-if="scope.row.itemClassTwo != null &&  scope.row.itemClassTwo != '' && scope.row.itemClassTwo == '管理'" style="color:#000000;text-algin:center;cursor:pointer;;"  >
                        {{ scope.row.price }}
                    </div> 
                    <div :title="scope.row .storage"  v-else-if="scope.row.wayOne != null && scope.row.wayOne != '' && scope.row.wayOne.indexOf('已到账') != -1" style="color:#060ccb;text-algin:center;cursor:pointer;"  >
                        {{ scope.row.price }}
                    </div>
                    <div :title="scope.row .storage" v-else-if="scope.row.price != null  && scope.row.price != '' && scope.row.itemClassTwo == '支出'" style="color:#CC3300;text-algin:center;cursor:pointer;"  >
                        {{ scope.row.price }}
                    </div>
                    <div :title="scope.row .storage" v-else-if="scope.row.price != null  && scope.row.price != '' && scope.row.itemClassTwo == '收入'" style="color:#009933;text-algin:center;cursor:pointer;"  >
                        {{ scope.row.price }}
                    </div>
                  </div>
                  <div v-if="scope.row.price != null" class="" style="position:absolute;right:-5px;bottom:-3px;">
                    <i class="blue-icon"  @click="showDownAngle(scope.row)"  ></i>
                  </div>
                 </div>   
                </template>
            </PlTableColumn>
           
            <PlTableColumn
              v-else
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              slot-scope="scope"
              :fixed="item.fixed"
              :align="item.align"
            >
            </PlTableColumn>
          </template>
        </PlTable>
      </div>
    </div>
  </div>
</template>


<script>
  /*获取数据
  *
  * */
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {getfinanceParams,getfinanceListData,deletedFinanceData,financeCloseAccountOrCancel} from "../../../service/financeData";
  import {financeParam,} from "../../../utils/financeParams";
    
  import {quickDate} from '../../../utils/getQuickDate'
  import { PlTable, PlTableColumn } from 'pl-table';
  import CheckSelectSpecial from '../../../components/checkSpecial'
  // 编辑
  import ColumPage from '../../../components/column'

  import NewFinancePage from './newSystemAnnounce'
  import EdiorFinancePage from './editorSystemAnnounce'

  //获取数据
  export default {
    data() {
      return {
        culumnTitle:'收支明细',
        columnData:financeParam.financeColumn,
        sessionStr:'finance-list',
        columnValue:false,
        rowHeight:27,
        currentNum:0,
        tableData:[],
        quick:'-1',
        upAndDown:'1',
        itemclass:"itemclass",
        departIds1:"departIds1",
        userIds1:"userIds1",
        departIds2:"departIds2",
        userIds2:"userIds2",
        showDepart1:true,
        showDepart2:false,
        departParams1:[],
        departParams2:[],
        departParamsTemp:[],
        userParams1:[],
        userParams2:[],

        itemClassTwoParams:[],
        itemClassThreeParams:[{id:'-1',name:"全部",select:true}],
        itemClassThreeParams1:[],
        itemClassThreeParams2:[],
        itemClassFourParams:[],
        expenditureIdTypeParams:[{id:'-1',name:"全部",select:true}],
        expenditureIdTypeParams3:[{id:'-1',name:"全部",select:true}].concat(financeParam.finaceExpendType),
        coopParams:[{id:'-1',name:"全部",select:true}].concat(financeParam.coopParams),
        multipleSelection:[],
        priceTotal:'0',
        form:{
            timeMode:'1',
            timeStart:'',
            timeEnd:'',
            itemClassTwo:'-1',
            itemClassThree:'-1',
            expenditureIdType:'-1',
            word:'',
            expenditureCoop:'-1',
            isClosingAccounts:"-1",
        },
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
      };
    },
    components:{
      CheckSelectSpecial,
      ColumPage,
      PlTable,
      PlTableColumn,
      NewFinancePage,
      EdiorFinancePage,
      GetTotalColuntPage
    },
    methods: {
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
          }else if(itemClassName == '支出'){
              this.itemClassThreeParams = JSON.parse(JSON.stringify(this.itemClassThreeParams2));
          }else{
              this.itemClassThreeParams  = [{id:'-1',name:"全部",select:true}]; 
          }
          this.form.itemClassThree = "-1";
          this.itemClassFourParams =  [{id:'-1',name:"全部",select:true}];
      }, 
      getItemClassFourByThreeId(){
          let itemClassThree = this.form.itemClassThree;
          let itemClassThreeParams = this.itemClassThreeParams;
          let children = [];
          itemClassThreeParams.forEach(item => {
            if(item.id == itemClassThree){
              children = item.children;
            }
          })
          children = JSON.parse(JSON.stringify(children));
          children.forEach(item => {
            item.name = item.name+item.remark;
          })
          this.itemClassFourParams =  [{id:'-1',name:"全部",select:true}].concat(children);
      }, 
      showDownAngle(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: GetTotalColuntPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['350px','420px'],
          title: "相关数据如下",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      changeUserType(){
        let expenditureIdType = this.form.expenditureIdType;
        let expenditureIdTypeParams = this.expenditureIdTypeParams;
        let name = ""
        expenditureIdTypeParams.forEach(item =>{
          if(expenditureIdType == item.id){
            name = item.name;
          }
        })
        if(name && name.indexOf("内部") != -1){
          this.showDepart1 = true;
          this.showDepart2 = false;
          if(this.departParams1 && this.departParams1.length == 0){
             this.departParams1 = [{id:'-1',name:"全部",select:true}].concat(this.departParamsTemp);
             this.userParams1 = [{id:'-1',name:"全部",select:true}];
          }
         
        }else if(name && name.indexOf("业主/客户") != -1){
          this.showDepart1 = false;
          this.showDepart2 = true;
        }else{
          this.showDepart1 = false;
          this.showDepart2 = false;
        }

      },
      getFinanceParamData(linkType,LinkForm){
        let _this = this;
        let form = {needChild:1,};
        getfinanceParams(form).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let departTree = data.departTree;
            
            let time = quickDate.getTwoDateByDay(3);
            _this.quick = '3';
            _this.form.timeStart = time.startTime;
            _this.form.timeEnd = time.endTime;
            if(departTree && departTree.length != 0){
               let arr = [{id:'-1',name:"全部",select:true}]; 
               let arrTemp = [];
              for(let i = 0 ; i  < departTree.length ; i++){
                let obj = {
                  id:departTree[i].id,
                  name:departTree[i].label.replace(/&nbsp;/g,""),
                  select:departTree[i].select,
                  level:departTree[i].level,
                  state:departTree[i].state,
                }
                arr.push(obj)
                arrTemp.push(obj);
              }
              _this.departParams2 = JSON.parse(JSON.stringify(arr));
              _this.userParams2 = [{id:'-1',name:"全部",select:true}];
              _this.departParamsTemp = JSON.parse(JSON.stringify(arrTemp));
              
            }
            let itemClassTwoParams = data.itemClassTwoParams;
            _this.itemClassTwoParams = [{id:'-1',name:"全部",select:true}].concat(itemClassTwoParams);
            let itemClassThreeParams1 = data.itemClassThreeParams1;
            let itemClassThreeParams2 = data.itemClassThreeParams2;
            _this.itemClassThreeParams1 = [{id:'-1',name:"全部",select:true}].concat(itemClassThreeParams1);
            _this.itemClassThreeParams2 = [{id:'-1',name:"全部",select:true}].concat(itemClassThreeParams2);
            _this.itemClassFourParams = [{id:'-1',name:"全部",select:true}];
            _this.userParams1 = [{id:'-1',name:"全部",select:true}];
            let finaceExpendType = financeParam.finaceExpendType;
            _this.expenditureIdTypeParams = [{id:'-1',name:"全部",select:true}].concat(financeParam.finaceExpendType);
            finaceExpendType.forEach(item => {
              if(item.name == '内部'){
                _this.form.expenditureIdType = item.id;
              }
            })
            if(_this.departParams1 && _this.departParams1.length == 0){
              _this.departParams1 = [{id:'-1',name:"全部",select:true}].concat(_this.departParamsTemp);
              _this.userParams1 = [{id:'-1',name:"全部",select:true}];
            }
            if(linkType){
              _this.findFinanceListByForm(LinkForm);
            }else{
              _this.searchFinanceDataList();
            }
            
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })  
      },  
      searchFinanceDataList(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let page = this.page;
        let ids = this.multipleSelection.toString();
        let expenditureCoop = this.getSelectIdByList(this.departParams1);
        let expenditureId = this.getSelectIdByList(this.userParams1);
        let departIds = this.getSelectIdByList(this.departParams2);
        let empIds = this.getSelectIdByList(this.userParams2);
        let itemClassFour = this.getSelectIdByList(this.itemClassFourParams);
        let expenditureIdType = this.form.expenditureIdType;
        form.expenditureCoop = expenditureCoop;
        form.expenditureId = expenditureId;
        form.departIds = departIds;
        form.empIds = empIds;
        form.itemClassFour = itemClassFour;
        getfinanceListData(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            data.forEach(item => {
              let storage = item.storage;
              if(storage){
                item.storage = "  " + storage.replace("<br/>",'\n ');
              }
            })
            _this.tableData = data;
            _this.priceTotal = response.data.total+"";
           
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      reloadFinanceList(type,id){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {id:id};
       
        getfinanceListData(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            let tableData = _this.tableData;
            let arr = [];
            tableData.forEach(function(item){
              if(item.id == data[0].id){
                arr.push(data[0]);
              }else{
                arr.push(item);
              }
            })
            _this.tableData = arr;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      findFinanceListByForm(form){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        getfinanceListData(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            _this.tableData = data;
            _this.priceTotal = response.data.total+"";
           
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      getQuickDate(value){
        let time = quickDate.getTwoDateByDay(value);
        this.form.timeStart = time.startTime;
        this.form.timeEnd = time.endTime;
        if(value != 1){
          this.timeDisabled = true;
        }else{
          this.timeDisabled = false;
        }
      },
      newFinance(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: NewFinancePage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['600px','550px'],
          title: "新增收支",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      getFinanceEditor(index,row){
        let _this = this;
        let thisifranmeisopen = false;
        let thisifranmeopennum = 0;
        let itemClassTwo = row.itemClassTwo;
        let itemClassThree = row.itemClassThree;
        let itemClassFour = row.itemClassFour;
        let titleName = "";
        if(itemClassTwo != '管理'){
          if(itemClassThree && itemClassThree != 'null'){
            titleName += ('&nbsp;&nbsp;&nbsp;&nbsp;'+itemClassThree);
          }
          if(itemClassFour &&  itemClassFour != 'null'){
            titleName += ('-'+itemClassFour);
          }
          titleName = ("收支修改 【" +row.itemClassTwo+titleName+ "】");
        }else{
          titleName = "管理详情";
        }
        

        _this.$store.state.layerifranme.forEach(item=>{
          if(item.thisrowid == row.id){
            document.getElementById(item.childlayerid).focus();
            thisifranmeisopen = true;
          };
          if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]){
            thisifranmeopennum = thisifranmeopennum + 1;
          }
        });
        if(thisifranmeisopen){
          return false;
        };
        if(thisifranmeopennum>=8){
          _this.myAlert("当前列表打开详情数量已达上限！",'dangerous-icon');
          return false;
        }
        let id = row.id;
        let layerId = _this.$layer.iframe({
          content: {
            content: EdiorFinancePage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{myid:id,mythisindex:index}//props
          },
          area:['600px','550px'],
          title: titleName,
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
          this.currentPage = '';
          if( this.initLeft != 0){
              this.initLeft -= 10;
              this.initTop -= 30;
            }
          }
        });
        let getLayerId = document.getElementById(layerId);
        getLayerId.style.left = "calc(50% + "+this.initLeft+"px)";
        getLayerId.style.top =  "calc(50% + "+this.initTop+"px)";
        this.initLeft += 10;
        this.initTop += 30;

        document.getElementById('thimyshade').style.display = "block";
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.id,oneORmore:2};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
        _this.$refs.singleTable.setCurrentRow(row);
      },
      deletedFinance(){
        
        let _this = this;
        let select = this.multipleSelection.toString();
        let tableData = this.tableData;
        let flag1 = false;
        let flag2 = false;
        tableData.forEach(item => {
          if(select && select.indexOf(item.id) != -1){
            if(item.financeId){
              flag1 = true;
            }
            if(item.isClosingAccounts == '已封账'){
              flag2 = true;
            }
          }
        })
        if(flag1){
           this.myAlert("此条收支是从合同同步过来的，不允许删除!", "dangerous-icon");
           return false;
        }
        if(flag2){
           this.myAlert("请先取消封账!", "dangerous-icon");
           return false;
        }
        if (select) {
          _this
            .myConfirm(
              "警告：收支删除后不能还原",
              "dangerous-icon",
              "确认",
              "取消",
              "确定要永久删除选定的收支吗？",
              "my-message"
            )
            .then(res => {
              _this.deletedFinanceListData();
            })
            .catch(err => {});
        } else {
          this.myAlert("请勾选要删除的收支!", "dangerous-icon");
        }
      },
      deletedFinanceListData() {
        let _this = this;
        let id = this.multipleSelection.toString();
        let select = {
          id,
          deleted: 1
        };
        deletedFinanceData(select).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("删除成功!", "success-icon").then(res => {
                let id = _this.multipleSelection;
                let temp = _this.tableData.concat();
                for(let i = 0 , len = id.length; i < len ; i++ ){
                  temp = _this.deletArrByValue(temp,id[i]);
                }
                
                _this.tableData = temp;
                _this.currentNum = 0;
              }).catch(err => {});
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      //删除删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
      },
      incomeNOAccount(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {itemClassTwo:"708757052973264896", noBalance:1,};
        getfinanceListData(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            data.forEach(item => {
              let storage = item.storage;
              if(storage){
                item.storage = "  " + storage.replace("<br/>",'\n ');
              }
            })
            _this.tableData = data;
            _this.priceTotal = response.data.total+"";
           
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      payNoAccount(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {itemClassTwo:"708757093045645312", noBalance:1,};
        
        getfinanceListData(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            data.forEach(item => {
              let storage = item.storage;
              if(storage){
                item.storage = "  " + storage.replace("<br/>",'\n ');
              }
            })
            _this.tableData = data;
            _this.priceTotal = response.data.total+"";
           
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      totalNoAccount(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
         let form = {wayTwo:"703691974058061824",};
        
        getfinanceListData(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            data.forEach(item => {
              let storage = item.storage;
              if(storage){
                item.storage = "  " + storage.replace("<br/>",'\n ');
              }
            })
            _this.tableData = data;
            _this.priceTotal = response.data.total+"";
           
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      bacthAccount(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if (select) {
          _this
            .myConfirm(
              "确定要封账吗？",
              "question-icon",
              "确认",
              "取消",
              "",
              "my-message"
            )
            .then(res => {
              _this.saveBacthAccount(1);
            })
            .catch(err => {});
        } else {
          debugger;
          this.myAlert("请勾选收支!", "dangerous-icon");
        }
      },

      cancelBatchAccount(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if (select) {
          _this
            .myConfirm(
              "确定要取消封账吗？",
              "question-icon",
              "确认",
              "取消",
              "",
              "my-success"
            )
            .then(res => {
              _this.saveBacthAccount(2);
            })
            .catch(err => {});
        } else {
          debugger;
          this.myAlert("请勾选收支!", "dangerous-icon");
        }
      },
      saveBacthAccount(type){
        let _this = this;
        let ids = this.multipleSelection.toString();
        let close = 0;
        let responseWord = "取消封账成功！";
        if(type == 1){
          close = 1;
          responseWord = "封账成功！";
        }
        let form = {
          ids,
          close: close
        };

        financeCloseAccountOrCancel(form).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert(responseWord, "success-icon").then(res => {
                
                _this.currentNum = 0;
                _this.searchFinanceDataList();
              }).catch(err => {});
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      filterData(){
        let select = this.multipleSelection.toString();
        if(select){
          let arr = [];
          this.tableData.forEach(function(item){
            if(select.indexOf(item.id) != -1){
              arr.push(item);
            }
          })
          this.currentNum = 0;
          this.tableData = arr;
        }else{
          this.myAlert('请选择需要过滤的数据!','dangerous-icon');
        }
      },
      clickColumn() {
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: ColumPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              columnData:_this.columnData,
              sessionStr:_this.sessionStr,
            }//props
          },
          area:['350px','400px'],
          title: "自选列 【"+_this.culumnTitle+"】",
          tips: 1,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
        
        // this.$refs["addNewRent"].newRent();
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      exportToExcel() {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require("../../../assets/js/Export2Excel.js");
          let tHeader = [];
          this.columnData.forEach(item => {
            tHeader.push(item.label);
          });

          let filterVal = [];
          this.columnData.forEach(item => {
            filterVal.push(item.prop);
          });
          const list = this.tableData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "收支明细列表");
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
     
      showSearch(){
        let rent = document.getElementById("finance-income-pay-container");
        if(this.upAndDown == 1){
          this.upAndDown = 2;

          rent.getElementsByClassName("content")[0].style.height="calc(100% - 110px) !important";
          rent.getElementsByClassName("el-table")[0].style.height="100% !important";
          document.getElementById("finance-search").style.display = "none";

        }else{
          this.upAndDown = 1;
          rent.getElementsByClassName("content")[0].style.height="calc(100% - 130px) !important";
          rent.getElementsByClassName("el-table")[0].style.height="100% !important";
          document.getElementById("finance-search").style.display = "block";
          
        }
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      //全选
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },
      rowClass({row, index}) {
        let className = "";
        if (row.isClosingAccounts == '已封账') {
          className =  'close-account';
        }
        return className;
      },
      cellStyle(){

      },
      getRowDataByClick(row, column, event) {
        let _this = this;
        _this.currentNum = row.index + 1;
      },
     
      reloadListByStorage() {
        let storage = window.localStorage;
        let titleData = storage.getItem(this.sessionStr);
        let storageColumn = JSON.parse(titleData);
        let columnDatas = JSON.parse(JSON.stringify(this.columnData));
        let column = null;
        if (storageColumn) {
          column = storageColumn.column;
          this.rowHeight = storageColumn.height;
        } else {
          column = columnDatas;
        }
        let count = "";
        column.forEach(function(item, index) {
          if (item.fixed) {
            count = index;
          }
        });

        column.forEach(function(item, index) {
          if (!count) {
            item.fixed = false;
          } else {
            if (count >= index) {
              item.fixed = true;
            }
          }
        });
        this.columnData = column;
      },
      finUserByDepart1(){
        let _this = this;
        let id = this.getSelectIdByList(_this.departParams1);
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'-1',name:"全部",select:true}];
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
                  arr.push(obj);
                })
              }
              _this.userParams1 = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.userParams1 = [{id:'-1',name:"全部",select:true}];
        }

      },
      finUserByDepart2(){
        let _this = this;
        let id = this.getSelectIdByList(_this.departParams2);
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'-1',name:"全部",select:true}];
              if(user && user.lengthg != 0){
                user.forEach(function(item){
                  if(item.doBusiness == 1 ) {
                    arr.push({
                      id: item.id,
                      name: item.name,
                      select:false,
                    })
                  }
                })
              }
              _this.userParams2 = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.userParams2 = [{id:'-1',name:"全部",select:true}];
        }

      },
       getSelectIdByList(list){
        let arr = [];
        list.forEach(function(item){
          if(item.select){
            arr.push(item.id);
          }
        })
        return arr.toString();
      },
      backSlect(list){
        let arr = [];
        list.forEach(function(item){
          if(item.id != -1){
            item.select = false;
          }else{
            item.select = true;
          }
          arr.push(item);
        })
        return arr;
      },
      
      clearForm(){
        let _this = this;
        this.form.timeMode = '1';
        
        this.form.itemClassTwo = '-1';
        this.form.itemClassThree = '-1';
        let expenditureIdTypeParams = this.expenditureIdTypeParams;

        expenditureIdTypeParams.forEach(item => {
          if(item.name == '内部'){
            _this.form.expenditureIdType = item.id;
          }
        })
        this.form.expenditureIdType = '-1';
        this.form.word = '';
        this.form.isClosingAccounts = "-1";
        let time = quickDate.getTwoDateByDay(3);
        this.quick = '3';
        this.form.timeStart = time.startTime;
        this.form.timeEnd = time.endTime;

        

        this.departParams1 = this.backSlect(this.departParams1);
        this.userParams1 = this.backSlect(this.userParams1);
        this.departParams2 = this.backSlect(this.departParams2);
        this.userParams2 = this.backSlect(this.userParams2);
        this.itemClassFourParams = this.backSlect(this.itemClassFourParams);
        this.changeUserType();
      },
      backSlect(list) {
        let arr = [];
        list.forEach(function(item) {
          if (item.id != -1) {
            item.select = false;
          } else {
            item.select = true;
          }
          arr.push(item);
        });
        return arr;
      },
      tabRemove (targetName) {
        // 首页不可删除
        if (targetName == '/') {
          return;
        }
        this.$store.commit('delete_tabs', targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            this.$store.commit('set_active_index', this.options[this.options.length-1].path);
            this.$router.push({path: this.activeIndex});
          } else {
            this.$router.push({path: '/home/'});
          }
        }
      },
      changeTitle(count,needlayerid,upordown){
        let _this = this;
        let mycountnum = 0;
        let currentId =  _this.tableData[count].id;
        let tableData = this.tableData;
        let saveData = this.$store.state.layerifranme;
        let hasSaveIds = [];
        saveData.forEach(item => {
            hasSaveIds.push(item.thisrowid);
        })
        hasSaveIds = hasSaveIds.toString();
        if(upordown == 1){
           let flag = 0;
           for(let i = tableData.length-1; i> 0 ; i--){
              let tempId = tableData[i].id;
              if(tempId == currentId){
                flag = 1;
                continue;
              }
              if(flag){
                  if(hasSaveIds.indexOf(tempId) == -1){
                     mycountnum = i;
                     break;
                  }
              }
           }  
        }else{
          let flag = 0;
           for(let j = 0 ,len = tableData.length;  j < len ; j++){
              let tempId1 = tableData[j].id;
              if(tempId1 == currentId){
                flag = 1;
                continue;
              }
              if(flag){
                  if(hasSaveIds.indexOf(tempId1) == -1){
                     mycountnum = j;
                     break;
                  }
              }
           }  
        }
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "收支修改 【" +_this.tableData[mycountnum].itemClassTwo+'&nbsp;&nbsp;&nbsp;&nbsp;'+_this.tableData[mycountnum].itemClassThree+'-'+_this.tableData[mycountnum].itemClassFour+ "】";
        _this.$refs.singleTable.setCurrentRow(_this.tableData[mycountnum]);

        let  callbackdata = {
          rowid: _this.tableData[mycountnum].id,
          thisindex:mycountnum,
        };
        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.tableData[mycountnum].id
          }
        })
        return callbackdata;
      },
      shadenum(){
        let _this = this;
        document.getElementById('thimyshade').style.display = "none";
        if(_this.$store.state.layerifranme.length!=0){
          _this.$store.state.layerifranme.forEach(item=>{
            if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2] && item.oneORmore==2){
              document.getElementById('thimyshade').style.display = "block";
            };
          });
        }
      },
    },
    mounted(){
      this.reloadListByStorage();
      this.shadenum();
      let form=this.$route.query.form;
      if(form){
        form = JSON.parse(form);
        this.getFinanceParamData(1,form);
      }else{
        this.getFinanceParamData(0);
      }
      
    },
    watch: {
      $route: {
            handler() {
              let form=this.$route.query.form;
              if(form){
                form = JSON.parse(form);
                this.getFinanceParamData(1,form);
              }  
          },
          deep: true,
      }
    },   
    computed: {

      options () {
        return this.$store.state.options;
      },
      activeIndex: {
        get () {
          return this.$store.state.activeIndex;
        },
        set (val) {
          this.$store.commit('set_active_index', val);
        }
      }
    },
  };
</script>

<style lang="scss" scoped>

  .rent-container {
    font-size:12px;
    height:100%;
    .padding-l-15{
      padding-left:15px;
    }
    .padding-l-10{
      padding-left:10px;
    }
    .padding-l-5{
      padding-left:5px;
    }
    .padding-l-2{
      padding-left:2px;
    }
    .cut-icon{
      background:url(../../../images/system/fenge.png) -100px -90px;
      width:3px;
      height:23px;
      display:block;
    }

  
    .income-budget-icon{
      background:url(../../../images/icon2.png)  -92px -94px;
      width:20px;
      height:20px;
      display:block;
    }
    .pay-budget-icon{
      background:url(../../../images/icon2.png) -126px -94px;
      width:20px;
      height:20px;
      display:block;
    }

    .total-budget-icon{
      background:url(../../../images/icon2.png) -158px -94px;
      width:20px;
      height:20px;
      display:block;
    }
    .account-icon{
      background:url(../../../images/icon2.png) -186px -94px;
      width:20px;
      height:20px;
      display:block;
    }
    .cancel-account-icon{
      background:url(../../../images/icon2.png) -219px -94px;
      width:20px;
      height:20px;
      display:block;
    }
    
    .leading-out-icon{
      background:url(../../../images/icon.png) -126px -118px;
      width:20px;
      height:20px;
      display:block;
    }

    .print-out-icon{
      background:url(../../../images/system/daochu.png) -15px -15px;
      width:20px;
      height:20px;
      display:block;
    }
    
    .back-icon{
      background:url(../../../images/system/tuichu.png) -15px -15px;
      width:20px;
      height:20px;
      display:inline-block;
    }
    
    .add {
      font-size:12px;
      color: #008000;
      margin-top:3px;
    }
    .delete{
      font-size:12px;
      color: #FF0000;
      margin-top:3px;
    }
  }
  
</style>
