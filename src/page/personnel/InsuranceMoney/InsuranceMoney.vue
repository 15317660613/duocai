<template>
  <div class="page-container mycontailerclass1"  id="InsuranceMoney-container" >
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <label>
            <div class="left padding-l-15"  >
              <el-radio  v-model="IMorAF" :label="1">&nbsp;</el-radio>
            </div>
            <div class="left" >
              保险
            </div>
          </label>
          <label>
            <div class="left padding-l-10" >
              <el-radio @change="changeToAccumulationFund"  v-model="IMorAF" :label="2">&nbsp;</el-radio>
            </div>
            <div class="left" >
              公积金
            </div>
          </label>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left padding-l-10 clear"  @click="addInsurance" >
           <div class="border-icon clear" > 
              <div class="left"  >
                <i class="fa add-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >新增</span>
              </div>
           </div>

          </div>

          <div class="item left clear padding-l-10" @click="deletedInsuranceMoney">
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="fa delete-icon"  ></i>
              </div>
              <div class="left"  >
                <span class="search-word" >删除</span>
              </div>
            </div>  
          </div>
          <div class="item left clear padding-l-10">
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="filterchoose-icon" title="过滤选中" @click="filterData" ></i>
              </div>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10"  >
            <div class="border-icon clear" > 
              <i class="leading-out-icon" title="自选列" @click="clickColumn" ></i>
            </div>  
          </div>
          <div class="left padding-l-10" @click="exportToExcel"  >
            <div class="border-icon clear" > 
              <i class="print-out-icon" title="导出"  ></i>
            </div>  
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left" >
            <div class="record-num" >
              <span class="search-word" ><</span>
              <span class="search-word" >{{currentNum}}</span>
              <span class="search-word" >/</span>
              <span class="search-word" >{{tableData.length}}</span>
              <span class="search-word" >></span>
            </div>
          </div>
          <div class="item left clear" >
            <div class="border-icon clear" > 
              <i class="back-icon user left" @click="tabRemove('/home/InsuranceMoney')" ></i>
            </div>  
          </div>

        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear">
            <div class="left" style="padding-left: 10px;">
              <span class="des-word" >年月</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeStart" label-width="0">
                <el-date-picker size="mini" type="month"   value-format="yyyy-MM" v-model="form.timeStart" style="width: 80px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeEnd" label-width="0">
                <el-date-picker size="mini" type="month"   value-format="yyyy-MM" v-model="form.timeEnd" style="width: 80px;"></el-date-picker>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">
              <span class="des-word" >缴存</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" prop="select1">
                <CheckSelectSpecial :selectId="select1" :listData="insuranceMoneyState" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-select    style="width:80px;"  v-model="depositParamsdefault" >
                  <el-option v-for="item in insuranceMoneydepositParams" :label="item.name" :value="item.id"  style="width: 80px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-select    style="width:80px;"  v-model="useParamsdefault" @change='selectChangemethods'>
                  <el-option v-for="item in insuranceMoneyuseParams" :label="item.name" :value="item.id"  style="width: 80px;"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">
              <span class="des-word" >人力状态</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" prop="select2">
                <CheckSelectSpecial :selectId="select2" :listData="userStateIdParams" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" prop="select3">
                <CheckSelectSpecial :selectId="select3" :listData="userParams1" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" prop="select4">
                <CheckSelectSpecial :selectId="select4" :listData="userParams2" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">  
              <span class="des-word" >职位</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0" prop="select5">
                <CheckSelect :selectId="select5" :listData="staffIdParams" style="width:80px;" ></CheckSelect>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:15px" >
              <span class="des-word" >缴纳人</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="select6">
                <CheckSelectSpecial
                  @findStreetByTown="finUserByDepart"
                  :selectId="select6"
                  :listData="executorList"
                  style="width:90px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="select7">
                <CheckSelectSpecial
                  :selectId="select7"
                  :listData="departParams"
                  style="width:80px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            
            <div class="left " style="padding-left:15px;"  >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.word" title="姓名/备注" maxlength="30" style="width:100px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left" style="margin-top:2px;"  >
              <i class="search-btn" @click="searchInsuranceMoneyList">查询</i>
            </div>

            <div class="left " style="margin-top:3px;"  >
              <i class="claerlys" @click="clearForm" ></i>
            </div>

          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear" style="height: calc(100% - 88px);">

      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @row-click="getRowDataByClick"
          :cell-class-name="finalCellStyle"
          :cell-style="cellStyle"
          :row-height="rowHeight"
          ref="singleTable"
        >
          <template v-if="item.show" v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop == 'check'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable" 
              :align="item.align"
            >


            </PlTableColumn>

            <pl-table-column
              v-else-if="item.prop == 'state'"
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
              <template slot-scope="scope" style="height: 100%;">
                <div v-if="scope.row.state2">
                  {{ scope.row.state }} - {{ scope.row.state2 }}
                </div>
                <div v-else>
                  {{ scope.row.state }}
                </div>
              </template>
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'staffId'"
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
              <template slot="header">
                
                <span style="color: #999;transform: scale(0.8);display: inline-block;">(当时)</span>
                <span>{{item.label}}</span>
              </template>
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'user'"
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
              <template slot="header">
                <span style="color: #999;transform: scale(0.8);display: inline-block;">(当时)</span>
                <span>{{item.label}}</span>
              </template>
              <template slot-scope="scope">
                <div style="position: absolute;top: 50%;margin-top: -6px;width: 100%;">
                  <div class="findparentclass" style="color:#336699;text-algin:center;cursor:pointer;z-index: 333;font-weight: bold;" @click="editorPersonMonth(scope.$index, scope.row)" >
                    {{ scope.row.user }}
                  </div>
                  <!-- 状态 -->
                  <div v-if="scope.row.state3">
                    <div v-if="scope.row.state3.indexOf('强制')!=-1" class="nine-one-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -40px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('未办')!=-1" class="eight-eleven-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -11px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('黑名')!=-1" class="eight-nine-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: 20px;">
                    </div>
                  </div>
                  
                </div>
                <!-- 开始时间 -->
                  <div v-if="scope.row.jobTime1" class="tdtopleft-icon" style="position: absolute;top: 0px;left: 0px;">
                    <div style="transform:rotate(-53deg) scale(0.8);margin-top: -4px;margin-left: -11px;">
                      <p style="line-height: 12px;width: 37px;">{{scope.row.jobTime2}}</p>
                      <p style="line-height: 12px;width: 40px;">{{scope.row.jobTime1}}</p>
                    </div> 
                  </div>
                  <!-- 结束时间 -->
                  <div v-if="scope.row.stopTime1" class="tdbottomright-icon" style="position: absolute;bottom: -3px;right: -5px;">
                    <div style="transform:rotate(-53deg) scale(0.8);margin-top: 8px;margin-left: 0px;">
                      <p style="line-height: 12px;width: 40px;">{{scope.row.stopTime1}}</p>
                      <p style="line-height: 12px;width: 37px;">{{scope.row.stopTime2}}</p>
                    </div> 
                  </div>
                
              </template>
            </pl-table-column>

            <PlTableColumn
              v-else-if="item.prop == 'largeOutpatientNum'||item.prop == 'priceCom'||item.prop == 'pricePer'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              slot-scope="scope"
            >
               <template v-if="item1.show" v-for="item1 in item.child" >
                <PlTableColumn
                    v-if='item.child||item.child.length>0 '
                    
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item1.sortable"
                    :align="item.align"
                    >
                    <template slot-scope="scope" style="height: 100%;">
                      <div style="position:relative;" >
                        <div  style="text-algin:center;width: 100%;"  >
                          {{ scope.row[item.prop] }}
                        </div>
                      </div>  
                    </template>
                </PlTableColumn>
               </template>  
            </PlTableColumn>

            <pl-table-column
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
              show-overflow-tooltip
            >

            </pl-table-column>
          </template>
        </PlTable>
      </div>
    </div>
  </div>
</template>


<script>
  // 获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {InsuranceMoney,InsuranceMoneyParams,userInsuranceDelete} from "../../../service/InsuranceMoney"; 



  // 自选列
  import ColumPage from '../../../components/column'

  import CheckSelect from '../../../components/check'
  import CheckSelectSpecial from '../../../components/checkSpecial'

  import { PlTable, PlTableColumn } from 'pl-table';
  import {InsuranceMoneyParam} from '../../../utils/InsuranceMoney'
  import newAddInsurance from './newAddInsurance'
  import EditorPersonMonthPage from './editorPersonMonth'
  import {quickDate} from '../../../utils/getQuickDate';
  import { orgnizetionParam } from "../../../utils/orgnizeparam";
  export default {
    data() {
      return {
        insuranceMoneyState:[],
        insuranceMoneyuseParams:[],
        insuranceMoneydepositParams:[],
        select1:'select1',
        select2:'select2',
        select3:'select3',
        select4:'select4',
        select5:'select5',
        select6:'select6',
        select7:'select7',
        bumenrenyuan:[],
        staffIdParams:[],
        useParamsdefault:'全部',
        depositParamsdefault:'全部',
        userStateIdParams:[],
        executorList: [],
        departParams:[],
        userParams1: orgnizetionParam.orgnizetionStateTwo,
        userParams2: orgnizetionParam.orgnizetionStateThree,
        form:{
          timeStart:'',
          timeEnd:'',
          word:'',
          type:"保险"  
        },
        columnValue:false,
        upAndDown:1,
        IMorAF:1,
        currentNum:0,
        rowHeight:35,
        culumnTitle:'险金明细',
        sessionStr:'InsuranceMoney-list',
        tableData:[],
        columnData:InsuranceMoneyParam.InsuranceMoneyColumn,
        currentPage:'',
        multipleSelection:[],
        userParams:[],
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        
      };
    },
    components:{
      PlTable,
      PlTableColumn,
      ColumPage,
      CheckSelect,
      CheckSelectSpecial,
      newAddInsurance,
      EditorPersonMonthPage,
    },
    methods:{
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
      returnMonth(val){
        if(val){
          return val.substring(5,7)
        }
      },
      returnYear(val){
        if(val){
          return val.substring(0,4)
        }
      },
      finalCellStyle({row, column, rowIndex, columnIndex}){
        if(row.state == "正式离职"&&column.label=='部门-人员'){
          return 'specialstyle'
        }
        if(row.state == "正式离职"){
          return 'usertdstyle'
        };
        if(column.label=='部门-人员'){
          return 'myselfstyle'
        };
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        if(column.label=='部门-人员'){
          return {'line-height':this.rowHeight};
        }
      },
      changeToAccumulationFund(){
        this.$router.push('/home/AccumulationFund');
      },
      selectChangemethods(){

      },
      getParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        
        InsuranceMoneyParams().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.getQuickDate(20);
            let data = response.data;
            
            if(data.stateParams){
              let initArr = [{id:"-1",name:"全部",select:true}];
              _this.insuranceMoneyState = initArr.concat(data.stateParams);
            }
            if(data.useParams){
              let initArr = [{id:"-1",name:"全部",select:true}];
              _this.insuranceMoneyuseParams = initArr.concat(data.useParams);
              _this.useParamsdefault = '-1';
            }
            if(data.userStateIdParams){
              let arr = [{ id: "-1", name: "全部", select: true }];
              data.userStateIdParams.forEach(item=>{
                if(item.name=='常态在职'||item.name=='薪假在职'||item.name=='停薪在职'||item.name=='申离在职'||item.name=='正式离职'){
                  arr.push({
                    id: item.id,
                    name: item.name,
                    select: false
                  });
                }
              })
              _this.userStateIdParams = arr;
            }
            
            if(data.depositParams){
              let initArr = [{id:"-1",name:"全部",select:true}];
              _this.insuranceMoneydepositParams = initArr.concat(data.depositParams);
              _this.depositParamsdefault = '-1';
            }

            
            let arr1 = [{ id: "-1", name: "全部", select: true }];
            _this.userParams1 = arr1.concat(_this.userParams1);

            let arr2 = [{ id: "-1", name: "全部", select: true }];
            _this.userParams2 = arr2.concat(_this.userParams2);

            if(data.staffIdParams){
              let arr = [{ id: "-1", name: "全部", select: true }];
              data.staffIdParams.forEach(function(item){
                arr.push({
                  id:item.id,
                  name:item.label,
                  select:false,
                })
              })
              _this.staffIdParams = arr;
            }

            if (data.departTree) {
              let arr = [{ id: "-1", name: "全部", select: true }];
              let treeData = data.departTree;
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  select: false,
                  state:treeData[i].state,
                });
              }
              _this.executorList = arr;
            }
            
            _this.departParams = [{id:'-1',name:'全部',select:true}];
            _this.searchInsuranceMoneyList();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      searchInsuranceMoneyList(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
        

        let insuranceState = _this.getSelectIdByList(_this.insuranceMoneyState);
        form.insuranceState = insuranceState.toString();

        let useId = _this.useParamsdefault;
        form.useId = useId.toString();

        let stateIds = _this.getSelectIdByList(_this.userStateIdParams);
        form.stateIds = stateIds.toString();

        let stateIds2 = _this.getSelectIdByList1(_this.userParams1);
        form.stateIds2 = stateIds2.toString();

        let stateIds3 = _this.getSelectIdByList(_this.userParams2 );
        form.stateIds3 = stateIds3.toString();

        let deposit = _this.depositParamsdefault;
        form.deposit = deposit.toString();

        let staffId = _this.getSelectIdByList(_this.staffIdParams );
        form.staffId = staffId.toString();

        let departIds = _this.getSelectIdByList(_this.executorList );
        form.departIds = departIds.toString();

        let userIds = _this.getSelectIdByList(_this.departParams );
        form.userIds = userIds.toString();

        let stateName = _this.getSelectIdByList1(_this.userParams2 );
        form.stateName = stateName.toString();

        if(form.timeStart==null||form.timeStart=="null"){
          form.timeStart = '';
        }
        if(form.timeEnd==null||form.timeEnd=="null"){
          form.timeEnd = '';
        };
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        InsuranceMoney(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.currentNum = 0;
            _this.tableData = data.list;
            if(data.list.length!=0){
              let columnDatatotal = {
                num1total:data.total.largeOutpatientNum,
                num3total:data.total.priceCom,
                num4total:data.total.pricePer,
              };

              _this.columnData.forEach(item=>{
                if(item.child){
                  item.child.forEach(ii=>{
                    ii.label = columnDatatotal[ii.prop];
                  })
                }
              });

            }else{
              let columnDatatotal = {
                num1total:'0.00',
                num3total:'0.00',
                num4total:'0.00',
              };

              _this.columnData.forEach(item=>{
                if(item.child){
                  item.child.forEach(ii=>{
                    ii.label = columnDatatotal[ii.prop];
                  })
                }
              });
            }
            
            
            _this.tableData.forEach(item=>{
              item.priceCom = Number(item.priceCom);
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },


      finUserByDepart(){
        let _this = this;
        let id = _this.getSelectIdByList(_this.executorList);
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{ id: "-1", name: "全部", select: true }];
              user.forEach(function(item){
                if(item.doBusiness == 1 ) {
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                }
              })
              _this.departParams = arr;

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.departParams = [{id:'-1',name:"全部",select:true}];
        }

      },
      //新增项目
      addInsurance(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: newAddInsurance, //传递的组件对象
            parent: this,//当前的vue对象
            data:{mytype:'保险'}//props
          },
          area:['800px','560px'],
          title: "批量新增保险人月",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      editorPersonMonth(index, row){
        let _this = this;
        let thisifranmeisopen = false;
        let thisifranmeopennum = 0;
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
        this.currentPage = row;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorPersonMonthPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{myid:row.id,mythisindex:index}//props
          },
          area:['600px','550px'],
          title:"保险修改 【" + this.currentPage.user + '&nbsp;&nbsp;&nbsp;&nbsp;' + this.currentPage.time + "】",
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

      //删除项目
      deletedInsuranceMoney(){
        let _this = this;
        let ids = _this.multipleSelection;
        if(ids.length != 0){
          _this.myConfirm("警告：险金明细删除后将不能还原！","question-icon",'是','否',"确定要删除选定记录吗？").then(res => {
            _this.deletedIMSuccess();
          }).catch(err => {

          })
        }else{
          _this.myAlert("请选择要删除的险金明细！")
        }
      },

      deletedIMSuccess(){
        let _this = this;
        let deleted = 1;
        let ids = _this.multipleSelection.toString();
        console.log(ids);
        userInsuranceDelete(ids,deleted).then(function (response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let data = response.data;
            _this.currentNum = 0;
            _this.myAlert("删除成功",'success-icon').then(res => {
              let id = _this.multipleSelection;
              let temp = _this.tableData.concat();
              for(let i = 0 , len = id.length; i < len ; i++ ){
                temp = _this.deletArrByValue(temp,id[i]);
              }
              _this.tableData = temp;
            }).catch(err => {

            })
          }else if(response.status == 1){
            _this.myAlert(response.msg+"！");
          }
        })
      },

      // showSearch(){
      //   let rent = document.getElementById("InsuranceMoney-container");
      //   if(this.upAndDown == 1){
      //     this.upAndDown = 2;

      //     rent.getElementsByClassName("content")[0].style.height="calc(100% - 85px)";
      //     rent.getElementsByClassName("el-table")[0].style.height="calc(100% - 138px) !important";
      //     rent.getElementsByClassName("project-search")[0].style.display = "none";

      //   }else{
      //     this.upAndDown = 1;
      //     rent.getElementsByClassName("content")[0].style.height="calc(100% - 115px)";
      //     rent.getElementsByClassName("el-table")[0].style.height="calc(100% - 175px) !important";
      //     rent.getElementsByClassName("project-search")[0].style.display = "block";
      //   }
      // },
      clearForm(){
        let _this = this;
        _this.getQuickDate(20);
        _this.form.word = '';
        _this.insuranceMoneyState = _this.backSlect(_this.insuranceMoneyState);
        _this.useParamsdefault = '-1';
        _this.depositParamsdefault = '-1';
        _this.userStateIdParams =  _this.backSlect(_this.userStateIdParams);
        _this.userParams1 = _this.backSlect(_this.userParams1);
        _this.userParams2 = _this.backSlect(_this.userParams2);
        _this.staffIdParams = _this.backSlect(_this.staffIdParams);
        _this.executorList = _this.backSlect(_this.executorList);
        _this.departParams = _this.backSlect(_this.departParams);
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
      //自选列
      clickColumn(){
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
      reloadListByStorage(){
        let storage=window.localStorage;
        let titleData = storage.getItem(this.sessionStr);
        let storageColumn = JSON.parse(titleData);
        let columnData = JSON.parse(JSON.stringify(this.columnData));
        let column = null;
        if(storageColumn){
          column = storageColumn.column;
          this.rowHeight = storageColumn.height;
        }else{
          column = columnData;
        }
        let count = '';
        column.forEach(function(item,index){
          if(item.fixed){
            count = index;
          }
        })

        column.forEach(function(item,index){
          if(!count){
            item.fixed = false;
          }else {
            if (count >= index) {
              item.fixed = true;
            }
          }
        })
        this.columnData = column;
      },
      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          let tHeader = [];
          this.columnData.forEach(item => {
            tHeader.push(item.label);
          });
          let filterVal = [];
          this.columnData.forEach(item => {
            filterVal.push(item.prop);
          });
          this.tableData.forEach(item=>{
            if(item.state2){
              item.state = item.state+'-'+item.state2
            }
          })
          const list = this.tableData;

          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '保险列表');
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
      tableRowClassName ({row, rowIndex}) {

        // 把每一行的索引放进row
        row.index = rowIndex;
        // if(column.property == "user"){
        //   return 'usertdstyle'
        // }
      },
      getRowDataByClick (row, column, event) {
        let _this = this;
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
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
      getSelectIdByList(list){
        let arr = [];
        if(list && list.length != 0) {
          list.forEach(function (item) {
            if (item.select) {
              arr.push(item.id);
            }
          })
        }
        return arr.toString();
      },
      getSelectIdByList1(list){
        let arr = [];
        if(list && list.length != 0) {
          list.forEach(function (item) {
            if (item.select) {
              arr.push(item.name);
            }
          })
        }
        return arr.toString();
      },
      //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
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
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "保险修改 【" + _this.tableData[mycountnum].user + '&nbsp;&nbsp;&nbsp;&nbsp;' + _this.tableData[mycountnum].time + "】";
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
    mounted(){
      this.reloadListByStorage();
      this.shadenum();
      this.getParamsData();
    },
    watch: {
      $route: {
        handler() {
          this.IMorAF = 1;
        },
        deep: true,
      }
    },
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-table,.el-table__expanded-cell {
    height: 100% !important;
  }
  /deep/ .usertdstyle {
    color: #999999;
    .findparentclass{
      color: #999999 !important;
    }

  }
  /deep/ .specialstyle .cell{
    line-height: 100%!important;
    height: 100%!important;
    .findparentclass{
      color: #999999 !important;
    }
  }
  /deep/ .myselfstyle .cell{
    
      line-height: 100%!important;
      height: 100%!important;
  }
  .page-container {
    font-size: 12px;
    height: 100%;
    .padding-l-15 {
      padding-left: 15px;
    }
    .padding-l-10 {
      padding-left: 10px;
    }
    .padding-l-25 {
      padding-left: 25px;
    }
    .padding-l-5 {
      padding-left: 5px;
    }
    .padding-l-2 {
      padding-left: 2px;
    }
    .add {
      font-size:18px;
      color: #008000;
      margin-top:3px;
    }
    .delete{
      font-size:18px;
      color: #FF0000;
      margin-top:3px;
    }
    .search-btn,.claerlys{
      cursor:pointer;
    }
    .content{
      width:100%;
      .list-content{
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        margin: 5px auto 0px;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
      }
    }

  }
  /deep/ .plTableBox .el-table .el-table__header th{
    background-color: #DCD9D3;
  }
</style>
