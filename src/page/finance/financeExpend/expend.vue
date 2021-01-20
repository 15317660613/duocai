<template>
  <div class="clear" style="height:100%;" >
    <div class="rent-container mycontailerclass1" >
      <div class="top-container border-black" >
        <div class="search-container mycontailerclass2" >
          <div class="clear" >
            <div class="left padding-l-15" style="padding-top: 2px;" >
              <el-radio  @change="changeExpendType(1)"  v-model="expendType" :label="1">&nbsp;</el-radio>
            </div>
            <div class="left" style="padding-top: 2px;">
              消耗管理
            </div>
            <div class="left padding-l-10" style="padding-top: 2px;">
              <el-radio @change="changeExpendType(2)" v-model="expendType" :label="2">&nbsp;</el-radio>
            </div>
            <div class="left" style="padding-top: 2px;">
              每日消耗
            </div>

            <div class="left" style="padding-left:25px;" @click="expendManage" >
              <div class="border-icon clear" > 
                消耗品类管理
              </div>  
            </div>
            <div class="left" style="padding-left:10px;" @click="expendRuleManage" >
              <div class="border-icon clear" > 
                消耗规则管理
              </div>  
            </div>

            <div class="left padding-l-10" @click="newExpendPersonMonth" style="cursor:pointer;">
              <div class="border-icon clear" > 
                <i class="fa fa-plus add"></i>
                <span>新增多人月</span>
              </div>  
            </div>
            <div class="left padding-l-10" @click="newExpendMonth" style="cursor:pointer;">
              <div class="border-icon clear" > 
                <i class="fa fa-plus add"></i>
                <span>新增多月人</span>
              </div>  
            </div>
            <div class="left padding-l-10" v-if="expendType == 1" @click="deletedExpend" style="cursor:pointer;">
              <div class="border-icon clear" > 
                <i class="fa fa-times delete" style="color:#FF0000;"></i>
                <span>删除</span>
              </div>  
            </div>
            <div class="left padding-l-5">
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
            <div class="item left clear padding-l-15">
              <div class="border-icon clear" > 
                <i class="back-icon user left" @click="tabRemove('/home/attendance')"></i>
              </div>
            </div> 
          </div>
        </div>
      
        <div v-if="expendType == 1" class="search-container " >
          <el-form ref="formsData"  :model="form" > 
            <div class="clear" >
                <div class="left padding-l-15">
                <span class="des-word">消耗年月</span>
              </div>
              <div class="left">
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" prop="timeStart">
                    <el-date-picker
                      type="month"
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM"
                      v-model="form.timeStart"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" prop="timeEnd">
                    <el-date-picker
                      type="month"
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM"
                      v-model="form.timeEnd"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-15">
                  <span class="des-word">人员</span>
                  </div>
                  <div class="left">
                  <el-form-item label label-width="0" prop="executorId">
                      <CheckSelectSpecial
                      @findStreetByTown="finUserByDepartId"
                      :selectId="expendDepartId"
                      :listData="expendDepartParams"
                      style="width:110px;"
                      ></CheckSelectSpecial>
                  </el-form-item>
                  </div>
                  <div class="left padding-l-2">
                      <el-form-item label label-width="0" prop="departId">
                          <CheckSelectSpecial
                          :selectId="expendUserId"
                          :listData="expendUserParams"
                          style="width:96px;"
                          ></CheckSelectSpecial>
                      </el-form-item>
                  </div>
                  
                  <div class="left padding-l-15">
                      <el-form-item label label-width="0" prop="hvaeClose">
                          <el-checkbox v-model="form.hvaeClose" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                      </el-form-item>
                  </div>
                  <div class="left " style="margin-left:-12px;">
                      <span class="des-word">包含已关闭品类</span>
                  </div>
                  <div class="left padding-l-15"  >
                      <el-form-item prop="word1" label-width="0">
                          <el-input  v-model.trim="form.word" maxlength="30" title="消耗人员" style="width:180px;"  autocomplete="off" ></el-input>
                      </el-form-item>
                  </div>

                  <div class=" left padding-l-5" style="padding-top:3px;" >
                      <i class="search-btn" @click="searchExpendListData"  >查询</i>
                  </div>
                  <div class="left padding-l-5" style="padding-top:3px;" >
                      <i class="claerlys" @click="clearForm" ></i>
                  </div>
                  <div class="item padding-l-5 left"  style="padding-top:4px;" >
                    <div class="record-num">
                      <span class="search-word">&lt;</span>
                      <span class="search-word">{{currentNum}}</span>
                      <span class="search-word">/</span>
                      <span class="search-word">{{tableData.length}}</span>
                      <span class="search-word">&gt;</span>
                    </div>
                  </div>
              </div>
            
            </div>    
          </el-form>
        </div>
        <div v-if="expendType == 2"  class="search-container " >
          <el-form ref="formsData1"  :model="form1" >
            <div class="clear" style="padding-bottom:7px;">
              <div class="left padding-l-15">
                  <span class="des-word">消耗品</span>
              </div>
              <div class="left">
                  <el-form-item label label-width="0" >
                      <CheckSelectSpecial
                      :selectId="expendManageIds"
                      :listData="expendManageParams"
                      style="width:110px;"
                      ></CheckSelectSpecial>
                  </el-form-item>
              </div>
              <div class="left padding-l-15">
                <span class="des-word">操作</span>
              </div>
              <div class="left">
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="date"
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="form1.timeStart"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="date"
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="form1.timeEnd"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-15">
                  <span class="des-word">人员</span>
                  </div>
                  <div class="left">
                  <el-form-item label label-width="0" >
                      <CheckSelectSpecial
                      @findStreetByTown="finUserByDepartId1"
                      :selectId="expendDepartId1"
                      :listData="expendDepartParams1"
                      style="width:110px;"
                      ></CheckSelectSpecial>
                  </el-form-item>
                  </div>
                  <div class="left padding-l-2">
                      <el-form-item label label-width="0" >
                          <CheckSelectSpecial
                          :selectId="expendUserId1"
                          :listData="expendUserParams1"
                          style="width:96px;"
                          ></CheckSelectSpecial>
                      </el-form-item>
                  </div>
                  
                  <div class="left padding-l-15">
                      <el-form-item label label-width="0" prop="hvaeSame">
                          <el-checkbox v-model="form1.hvaeSame" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                      </el-form-item>
                  </div>
                  <div class="left " style="position:relative;margin:-2px 0 0 -12px;" >
                      <span class="des-word">同类型同账号</span>
                      <span style="position:absolute;left:4px;top:20px;" class="record-word" >(最后消耗)</span>
                  </div>
                  <div class="left padding-l-15"  >
                      <el-form-item prop="word1" label-width="0">
                          <el-input  v-model.trim="form1.word" maxlength="30" title="消耗人员/账号/备注" style="width:180px;"  autocomplete="off" ></el-input>
                      </el-form-item>
                  </div>

                  <div class=" left padding-l-5" style="padding-top:3px;" >
                      <i class="search-btn" @click="searchExpendListData1"  >查询</i>
                  </div>
                  <div class="left padding-l-5" style="padding-top:3px;" >
                      <i class="claerlys" @click="clearForm1" ></i>
                  </div>
                  <div class="item padding-l-5 left" style="padding-top:4px;" >
                    <div class="record-num">
                      <span class="search-word">&lt;</span>
                      <span class="search-word">{{currentNum1}}</span>
                      <span class="search-word">/</span>
                      <span class="search-word">{{tableData1.length}}</span>
                      <span class="search-word">&gt;</span>
                    </div>
                  </div>
              </div>
            </div>    
          </el-form>
        </div>
      </div>

      <div  class="content clear" style="height:calc(100% - 100px)" >

        <div  id="finance-expend-container1" class="list-content" v-show="expendType == 1" >
          <PlTable
            :datas="tableData"
            :pagination-show="false"
            use-virtual
            empty-text=" "
            border
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName"
            @row-click="getRowDataByClick"
            :header-cell-class-name="headerRowClass"
            :row-height="rowHeight"
            :cell-class-name="finalCellStyle"
            :cell-style="cellStyle"
            ref="singleTable"
          >
            <template v-if="item.show" v-for="(item,index) in columnData">
              <PlTableColumn
                v-if="item.prop == 'check'"
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
              </PlTableColumn>
            
              <PlTableColumn
                v-else-if="item.prop == 'time'"
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
              </PlTableColumn>
               <PlTableColumn
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
                <template slot="header" slot-scope="scope">
                  <div class="clear" style="position:relative;z-index:10;height: 30px;display:inline-block;" >
                  
                    <span>{{item.label}}</span>
                    <span style="color:#999;position:absolute;top:12px;left:7px;;" >(当时)</span>
                  </div>
                </template>
                <template slot-scope="scope" style="height: 100%;">
                  <div style="position: absolute;top: 50%;margin-top: -10px;width: 100%;">
                    <div class="findparentclass" :style="{'color': scope.row.state == '正式离职' ? '#999999': '#336699','text-algin':'center','cursor':'pointer','z-index': '333','font-weight': 'bold'}" @click="editorExpend(scope.$index, scope.row)" >
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
                  <div  v-if='scope.row.jobTime1'  class="tdtopleft-icon" style="position: absolute;left: 0px;top: 0;color: #45865F;z-index: 332;">
                    <div style="transform:rotate(-53deg) scale(0.8);margin-top: -4px;margin-left: -12px;">
                      <p style="line-height: 12px;width: 37px;">{{scope.row.jobTime2}}</p>
                      <p style="line-height: 12px;width: 40px;">{{scope.row.jobTime1}}</p>
                    </div> 
                  </div>
                  <!-- 结束时间 -->
                  <div v-if='scope.row.stopTime1'  class="tdbottomright-icon" style="position: absolute;right: -4px;bottom: -3px;color: #C38281;z-index: 332;">
                    <div style="transform:rotate(-53deg) scale(0.8);margin-top: 5px;margin-left: 5px;">
                      <p style="line-height: 12px;width: 30px;">{{scope.row.stopTime1}}</p>
                      <p style="line-height: 12px;">{{scope.row.stopTime2}}</p>
                      <!-- <p style="line-height: 12px;">{{scope.row.firstTime.substring(5,7)}}</p><p style="line-height: 12px;">{{scope.row.firstTime.substring(0,4)}}</p> -->
                    </div>
                  </div>
                </template>
              </PlTableColumn>
              <PlTableColumn
                 label
                v-else-if="item.prop == 'count4'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :type="item.type"
                :ref="item.ref"
                :show="item.show"
                
                :align="item.align"
                :rowspan="2"
              >
                <template slot="header" slot-scope="scope">
                    <div class="clear" style="position:relative;top:10px;z-index:10;" >
                      <span>{{item.label}}</span>
                    </div>
                </template> 
                <PlTableColumn
                    v-for="item1 in item.child"
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                   
                    align="center"
                    >
                      
                      <PlTableColumn
                        v-for="item2 in item1.child"
                        :label="item2.label"
                        :prop='item2.prop'
                        :width='item2.width'
                      
                        align="center"
                        >   <PlTableColumn
                          v-for="item3 in item2.child"
                          :label="item3.label"
                          :prop='item3.prop'
                          :width='item3.width'
                        
                          align="center"
                          >
                          <!-- <template slot-scope="scope">
                            <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorExpend(scope.$index, scope.row)" >
                              {{ scope.row.user }}
                            </div>
                          </template> -->
                          
                        </PlTableColumn>  
                    </PlTableColumn>
                </PlTableColumn>
                
              </PlTableColumn>
              
              <PlTableColumn
                v-else-if="item.child && item.child.length>0 && item.prop != 'userOne'"
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
                <template slot="header" slot-scope="scope">
                    <div class="clear" >
                      <span>{{item.label}}</span>
                      <span class="pensail-icon right" @click="sourceDetail(item.id,item.label)" ></span>
                    </div>
                </template>
                <PlTableColumn
                    v-if='item.child&&item.child.length>0'
                    v-for="item1 in item.child"
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item.sortable"
                    :align="item.align"
                    >

                     <PlTableColumn
                        v-for="item2 in item1.child"
                        :label="item2.label"
                        :prop='item2.prop'
                        :width='item2.width'
                        align="center"
                        >
                        
                         <PlTableColumn
                            v-for="item3 in item2.child"
                            :label="item3.label"
                            :prop='item3.prop'
                            :width='item3.width'
                           
                            align="center"
                            >
                            
                        </PlTableColumn>
                    </PlTableColumn>

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
                  :fixed="item.fixed"
                  :align="item.align"
                  :show-overflow-tooltip="true"
                >
                </PlTableColumn>
              </PlTableColumn>
            </template>
          </PlTable>
        </div>
        <div id="finance-expend-container2"  class="list-content" v-show="expendType == 2" >
          <PlTable
            :datas="tableData1"
            :pagination-show="false"
            empty-text=" "
            border
            :row-class-name="tableRowClassName1"
            @row-click="getRowDataByClick1"
            :row-height="rowHeight"
          >
            <template v-if="item.show" v-for="(item,index) in columnData1">
              
              <PlTableColumn
                v-if="item.prop == 'timeStart'"
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
                  <div
                  
                    :style="{'font-weight':'700','color':scope.row.financeConsumeManageIsClosed=='1'?'#999':'#336699','text-algin':'center','cursor':'pointer'}"
                    @click="editorExpendDay(scope.$index, scope.row)"
                  >
                  {{scope.row.timeStart}}-{{scope.row.timeEnd}}
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
                :show-overflow-tooltip="true"
                :show="item.show"
                :fixed="item.fixed"
                :align="item.align"
                slot-scope="scope"
              ></PlTableColumn>
            </template>
          </PlTable>
        </div>
      </div>
      
    </div>
  </div>
</template>


<script>
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {expendList,expendListDay,getExpendParams,deletedExpendPerson} from '../../../service/expendData'
  import {quickDate} from '../../../utils/getQuickDate'
  import { PlTable, PlTableColumn } from 'pl-table';
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {financeExpendParam} from '../../../utils/expendParam'
  import ExpendManagePage from './expendManage'
  import EditorExpendPage from './editorExpend'
  import EditorExpendDayPage from './editorExpendDay'
  import BatchExpendPage from "./batchExpend";
  import BatchMonthPersonPage from "./batchMonthPerson";
  import ExpendSourcePage from "./expendSource";
  // 编辑
  import ColumPage from '../../../components/columnMoreHeader'

  //获取数据
  export default {
    data() {
      return {
        culumnTitle:'消耗管理',
        columnData: [],
        columnDataTemp:financeExpendParam.finaceExpendColumn,
        columnData1: [],
        sessionStr:'expend-list',
        columnValue:false,
        expendManageIds:'expendManageIds',
        
        rowHeight:27,
        currentNum:0,
        expendType:1,
        tableData:[],
        tableData1:[],
        currentNum:0,
        currentNum1:0,
        expendDepartId:'expendDepartId',
        expendUserId:'expendUserId',
        expendDepartId1:'expendDepartId1',
        expendUserId1:'expendUserId1',
        expendDepartParams:[],
        expendUserParams:[],
        expendDepartParams1:[],
        expendUserParams1:[],
        expendManageParams:[],
        expendDepartParamsTemp:[],
        expendManageParamsTemp:[],
        multipleSelection:[],
        active2:true,
        form:{
            hvaeClose:0,
            timeStart:'',
            timeEnd:'',
            word:'',
        },
        form1:{
            hvaeSame:0,
            timeStart:'',
            timeEnd:'',
            word:'',
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
      ExpendManagePage,
      BatchExpendPage,
      EditorExpendPage,
      EditorExpendDayPage,
      ExpendSourcePage,
      BatchMonthPersonPage
    },
    methods: {
      
      headerRowClass({row, column, rowIndex, columnIndex}){
        let className = "";
        debugger;
        if (column.property == 'count4') {
          className =  ' cell-expend ';
        }
        return className;
        
      },
      getExpendParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        getExpendParams().then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let time = quickDate.getTwoDateByDay(9);
            debugger;
            _this.form.timeStart = time.startTime.substring(0,7);
            _this.form.timeEnd = time.endTime.substring(0,7);
            let data = response.data;
            let manages = [];
            data.manages.forEach(item=>{
              if(item.isClosed==0){
                manages.push({
                  id:item.id,
                  name:item.name,
                  stateUser:0,
                })
              }else{
                manages.push({
                  id:item.id,
                  name:item.name,
                  stateUser:1,
                })
              }
            })
            let departTree = data.departTree;
            _this.expendManageParamsTemp = [{id:'-1',name:'全部',select:true}].concat(manages);
            if(departTree && departTree.length != 0){
               let arr = [{id:'-1',name:"全部",select:true}]; 
              for(let i = 0 ; i  < departTree.length ; i++){
                arr.push({
                  id:departTree[i].id,
                  name:departTree[i].label.replace(/&nbsp;/g,""),
                  select:departTree[i].select,
                  level:departTree[i].level,
                  state:departTree[i].state,
                })
              }
              _this.expendDepartParams = JSON.parse(JSON.stringify(arr));
              _this.expendDepartParamsTemp = JSON.parse(JSON.stringify(arr));
            }
            
            _this.expendUserParams =  [{id:'-1',name:'全部',select:true}];
            _this.getExpendData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      getExpendData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let timeStart = form.timeStart;
        let timeEnd = form.timeEnd;
        
        let expendDepartIds = this.getSelectIdByList(this.expendDepartParams);
        let expendUserIds = this.getSelectIdByList(this.expendUserParams);
        if(!timeStart){
          form.timeStart  = "";
        }
        if(!timeEnd){
          form.timeEnd  = "";
        }
        form.departIds = expendDepartIds;
        form.userIds = expendUserIds;
        expendList(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
           
            let data = response.data;
            let titles = data.titles;
            let list = data.list;
            _this.setTitle(titles); 
            _this.tableData = list;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      getExpendDayData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form1));
        let expendDepartIds = this.getSelectIdByList(this.expendDepartParams1);
        let expendUserIds = this.getSelectIdByList(this.expendUserParams1);
        let expendManageIds = this.getSelectIdByList(this.expendManageParams);
        form.departIds = expendDepartIds;
        form.userIds = expendUserIds;
        form.consumeIds = expendManageIds;
        if(form.timeStart == null){
          form.timeStart = ''
        };
        if(form.timeEnd==null){
          form.timeEnd = ''
        };
        expendListDay(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            
            let data = response.data;
            let list = data.list;
            _this.tableData1 = list;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      
      changeExpendType(type){
         let expendType = this.expendType;
         if(this.active2){
            let time = quickDate.getTwoDateByDay(9);
            this.expendManageParams = this.expendManageParamsTemp;
            this.expendDepartParams1 = this.expendDepartParamsTemp;
            this.expendUserParams1 =  [{id:'-1',name:'全部',select:true}];
            this.form1.timeStart = time.startTime
            this.form1.timeEnd = time.endTime
            this.columnData1 = financeExpendParam.finaceExpendDayColumn;
            this.getExpendDayData();
            this.active2 = false;
         }
      },
      sourceDetail(id,thisTitle){
        let _this = this;
        let title = "【"+thisTitle+"  总体原始" + "   元"+"---"+"个"+"---"+"天】 来源详情"
        let test = _this.$layer.iframe({
          content: {
            content: ExpendSourcePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{getId:id}//props
          },
          area:['600px','400px'],
          title:title,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        }); 
          
      },
      getSummaries(param) {
        let _this = this;
        let { columns, data } = param;
        const sums = [];
        
        columns.forEach((column, index) => {
          
           if (index === 0) {
            sums[2] = '总计\n测试';
            return;
          }
          
        });

        return sums;
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
      tableRowClassName({ row, rowIndex }) {
        // 把每一行的索引放进row
        row.index = rowIndex;
      },
      getRowDataByClick(row, column, event) {
        let _this = this;
        _this.currentNum = row.index + 1;
      },
      tableRowClassName1({ row, rowIndex }) {
        // 把每一行的索引放进row
        row.index = rowIndex;
        if(row.financeConsumeManageIsClosed == "1"){
          return 'isClosedStyle'
        }
      },
      getRowDataByClick1(row, column, event) {
        let _this = this;
        _this.currentNum1 = row.index + 1;
      },
      setTitle(titles){
        let firstTitles = titles[0];
        let fourTitles = titles[1];
        let numTitles1 = titles[2];
        let numTitles2 = titles[3];

        let columnData = JSON.parse(JSON.stringify(this.columnDataTemp));
        let arr = columnData.concat();
        let mapFourTitle = {};
        let mapFourTitle1 = {};
        let mapFourTitle2 = {};
        let str = []
        firstTitles.forEach(item => {
          mapFourTitle[item.prop] = [];
          str.push(item.prop);
        })
        str  = str.toString();
        fourTitles.forEach((item,index) => {
          debugger;
          let prop = item.prop.substring(item.prop.length-5,-1);
          if(item.prop && str.indexOf(prop) != -1){
            item.prop = prop +"_4"+item.prop.substring(item.prop.length-3);
            item.setId = "20300502100"+index;
            mapFourTitle[prop].push(item);
            
          }
        })
        numTitles1.forEach((item,index) => {
          let prop = item.prop.substring(item.prop.length-5,-1);
          if(item.prop && str.indexOf(prop) != -1){
            let currentProp = prop +"_4"+item.prop.substring(item.prop.length-3);
            item.prop = prop +"_3"+item.prop.substring(item.prop.length-3);
            item.setId = "20300502100100"+index;
            
            mapFourTitle1[currentProp] = item;
            
          }
        })
        numTitles2.forEach((item,index) => {
          let prop = item.prop.substring(item.prop.length-5,-1);
          if(item.prop && str.indexOf(prop) != -1){
            item.prop = prop +"_4"+item.prop.substring(item.prop.length-3);
            item.setId = "20300502100200"+index;
            mapFourTitle2[item.prop] = item;
            
          }
        })
        
        firstTitles.forEach((item,index)=>{
        
          if(index != 0){
            let child = [];
            
            child = mapFourTitle[item.prop]; 
            child.forEach(item1 => {
                item1.titleLabel = item.label;
                item1.fixed = false;
                let child1 = [mapFourTitle1[item1.prop]];
                let child2 = [mapFourTitle2[item1.prop]];
                child1[0].child = child2;
                item1.child = child1;
            })
            arr.push({
              id:item.id,
              type:'',
              ref:'',
              titleLabel:'',
              prop:item.prop,
              label:item.label,
              align:'center',
              sortable:false,
              show:true,
              fixed:false,
              setId:"203005021"+index,
              child:child,
            })
          }
        }) 
        this.columnData = arr;
      },
      newExpendPersonMonth(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: BatchExpendPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "批量新增消耗",
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

      newExpendMonth(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: BatchMonthPersonPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['350px','200px'],
          title: "新增多月人",
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
     
      deletedExpend(){
        let _this = this;
        let arr = this.multipleSelection;
        let select = arr.toString();
        if (select) {
          _this
            .myConfirm(
              "确定要删除消耗吗？",
              "dangerous-icon",
              "确认",
              "取消",
              "",
              "my-message"
            )
            .then(res => {
              _this.deletedExpendData();
            })
            .catch(err => {});
        } else {
          this.myAlert("请勾选要删除的消耗!", "dangerous-icon");
        }
        //
      },
      
      deletedExpendData() {
        let _this = this;
        let arr = this.multipleSelection;
        let id = arr.toString();
        let select = {
          id,
          deleted: 1
        };
        deletedExpendPerson(select).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this
              .myAlert("删除成功!", "success-icon")
              .then(res => {
                 let id = _this.multipleSelection;
                  let temp = _this.tableData.concat();
                  for(let i = 0 , len = id.length; i < len ; i++ ){
                    temp = _this.deletArrByValue(temp,id[i]);
                  }
                  _this.tableData = temp;
                  _this.currentNum = 0;
              })
              .catch(err => {});
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      },
       //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
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
      reloadListByStorage(){
        let currentColumnData = this.columnData;
        let sessionStr = this.sessionStr;
        
        let storage=window.localStorage;
        let titleData = storage.getItem(sessionStr);
        let storageColumn = JSON.parse(titleData);
        let columnData = JSON.parse(JSON.stringify(currentColumnData));
        let column = null;
        let storageMap = {};
        
        if(storageColumn){
          let getColumn = storageColumn.column;
          getColumn.forEach(item => {
            storageMap[item.setId] = item;
          })
          columnData.forEach(item => {
            let child = item.child;
            if(child){
              let flag = false;
              child.forEach(item1 => {
                if(item1.show){
                  flag = true;
                }
                item1.show = storageMap[item1.setId].show;
                item1.width = storageMap[item1.setId].width;
              })
              if(flag){
                item.show = true;
              }else{
                item.show = false;
              }
            }else{
              item.show = storageMap[item.setId].show;
              item.width = storageMap[item.setId].width;
            }
          })
          column = columnData;
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
          export_json_to_excel(tHeader, data, "消耗管理列表");
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      
      finUserByDepartId(){
        let _this = this;
        let id = this.getSelectIdByList(_this.expendDepartParams);
        if (id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function(response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr =  [{ id: "-1", name: "全部", select: true }];
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
              _this.expendUserParams = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          });
        } else {
          _this.expendUserParams = [{ id: "-1", name: "全部", select: true }];
        }
      },
      finUserByDepartId1(){
        let _this = this;
        let id = this.getSelectIdByList(_this.expendDepartParams1);
        if (id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function(response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr =  [{ id: "-1", name: "全部", select: true }];
              if(user && user.lengthg != 0){
                user.forEach(function(item){
                  if(item.doBusiness == 1 ) {
                    arr.push({
                      id: item.id,
                      name: item.name,
                    })
                  }
                })
              }
              _this.expendUserParams1 = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          });
        } else {
          _this.expendUserParams1 = [{ id: "-1", name: "全部", select: true }];
        }
      },
      searchExpendListData(){
        this.getExpendData();
      },
      searchExpendListData1(){
        this.getExpendDayData();
      },
     
      expendManage(){
        let _this = this;
        let layerId = _this.$layer.iframe({
            content: {
            content: ExpendManagePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{activeName:'single'}//props
            },
            
            area:['600px','450px'],
            title: "消耗品管理",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
        });
        
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      editorExpend(index ,row){
        let _this = this;
        let id = row.id;
        let time = row.time;
        let layerId = _this.$layer.iframe({
            content: {
            content: EditorExpendPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{myid:row.id,mytime:row.time,mythisindex:index}//props
            },
            
            area:['1050px','550px'],
            title: "消耗使用详情 【"+row.time+"&nbsp;&nbsp;&nbsp;&nbsp;"+row.user+"】",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
              if( this.initLeft != 0){
                  this.initLeft -= 10;
                  this.initTop -= 30;
                }
              }
            });
          let getLayerId = document.getElementById(layerId);
          let mygetLayerId = document.getElementById(layerId).getAttribute('id');
          document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
          document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
          let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
          _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      editorExpendDay(index,row){
        let _this = this;
        let title = row.financeConsumeManageIdName+"  "+ row.time;
        let id = row.id;
        let time = row.time;
        let layerId = _this.$layer.iframe({
            content: {
            content: EditorExpendDayPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{getId:id,getTime:time}//props
            },
            area:['500px','260px'],
            title: title,
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            
        });
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      expendRuleManage(){
          this.$router.push('/home/FinanceExpendRule');
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
        this.form.hvaeClose = 0;
        
        this.form.word = '';
        this.expendDepartParams=this.backSlect(this.expendDepartParams);
        this.expendUserParams=this.backSlect(this.expendUserParams);
        let time = quickDate.getTwoDateByDay(9);
        debugger;
        this.form.timeStart = time.startTime.substring(0,7);
        this.form.timeEnd = time.endTime.substring(0,7);
      },
      clearForm1(){
        this.form1.hvaeSame = 0;
        this.form1.word = '';
        this.expendDepartParams1=this.backSlect(this.expendDepartParams1);
        this.expendUserParams1=this.backSlect(this.expendUserParams1);
        this.expendManageParams=this.backSlect(this.expendManageParams);
        let time = quickDate.getTwoDateByDay(9);
        debugger;
        this.form1.timeStart = time.startTime.substring(0,7);
        this.form1.timeEnd = time.endTime.substring(0,7);
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
      finalCellStyle({row, column, rowIndex, columnIndex}){
        if(column.label=='消耗人员'){
          return 'myselfstyle'
        };
        if(row.state == "正式离职"){
          return 'usertdstyle'
        };
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        if(column.label=='消耗人员'){
          return {'line-height':this.rowHeight};
        }
      },
      changeTitle(count,needlayerid,upordown){
        let _this = this;
        let mycountnum = count;
        _this.$store.state.layerifranme.forEach(item=>{
          if(_this.tableData[mycountnum].id == item.thisrowid){
            if(upordown == 1){
              mycountnum = mycountnum - 1;
            };
            if(upordown == 2){
              mycountnum = mycountnum + 1;
            };
          }
        })
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "消耗使用详情 【"+_this.tableData[mycountnum].time+"&nbsp;&nbsp;&nbsp;&nbsp;"+_this.tableData[mycountnum].user+"】";
        _this.$refs.singleTable.setCurrentRow(_this.tableData[mycountnum]);

        let  callbackdata = {
          row: _this.tableData[mycountnum],
          thisindex:mycountnum,
        };
        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.tableData[mycountnum].id
          }
        })
        return callbackdata;
      },
    },
    mounted(){
      this.getExpendParamsData();
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
  /deep/ .isClosedStyle{
    color: #999 !important;
  }
  /deep/ .myselfstyle .cell{
      line-height: 100%!important;
      height: 100%!important;
  }
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
  /deep/ .content {
    .list-content {
      .el-table {
        .el-table__body-wrapper{
          height: calc(100% - 100px) !important;
        }
      }
    }
  }
</style>
<style >
  #finance-expend-container1 .el-table .el-table__body-wrapper {
    height: calc(100% - 101px) !important;
    overflow: auto;
}
</style>

