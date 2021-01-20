<template>
  <div class="page-container mycontailerclass1"  id="SalaryDetails-container">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear" >
          <label>
            <div class="left padding-l-10" >
              <el-radio   v-model="DPorPS" :label="1">&nbsp;</el-radio>
            </div>
            <div class="left" >
              人员
            </div>
          </label>
          <label>
            <div class="left padding-l-15"  >
              <el-radio @change="changeToSalaryDetails" v-model="DPorPS" :label="2">&nbsp;</el-radio>
            </div>
            <div class="left" >
              部门
            </div>
          </label>
          <div class="left padding-l-10">
            <i class="cut-icon"></i>
          </div>
          <div class="item left padding-l-10 clear"  @click="newAddSalary" >
            <div class="left border-icon"  >
              <i class="fa add-icon left"></i>
              <span class="search-word" >新增</span>
            </div>
          </div>

          <div class="item left clear padding-l-10" @click="deletedSalaryDetails">
            <div class="left border-icon"  >
              <i class="fa delete-icon left"></i>
              <span class="search-word" >删除</span>
            </div>
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>

          <div class="item left clear padding-l-10" @click="SingleWage">
            <div class="left border-icon"  >
              <i class="SingleWage-icon left"></i>
              <span class="search-word" >单项工资</span>
            </div>
          </div>
          <div class="item left clear padding-l-10" @click="SalaryPayment">
            <div class="left border-icon">
              <i class="SalaryPayment-icon left"  ></i>
              <span class="search-word" >工资封账</span>
            </div>
          </div>
          <div class="item left clear padding-l-10" @click="CancellationAccounts">
            <div class="left border-icon">
              <i class="CancellationAccounts-icon left"></i>
              <span class="search-word" >取消封账</span>
            </div>
          </div>
          <div class="item left clear padding-l-10" @click="Issuedfunc">
            <div class="left border-icon">
              <i class="HaveBeenIssued-icon left"></i>
              <span class="search-word" >已发放</span>
            </div>
          </div>

          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left clear padding-l-10">
            <div class="left border-icon">
              <i class="filterchoose-icon" title="过滤选中" @click="filterData" ></i>
            </div>
          </div>
          <div class="left padding-l-10">
            <div class="left border-icon">
              <i class="leading-out-icon" title="自选列" @click="clickColumn" ></i>
            </div>
          </div>
          <div class="left padding-l-10" @click="exportToExcel"  >
            <div class="left border-icon">
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
            <i class="back-icon user left" @click="tabRemove('/home/SalaryDetailsPerson')" ></i>
          </div>

        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" style="margin-top: 0px">
            <div class="left padding-l-10" >
              <span class="des-word" >年月</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeStart" label-width="0">
                <el-date-picker size="mini" :default-value="form.timeStart" type="month"   value-format="yyyy-MM" v-model="form.timeStart" style="width: 80px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeEnd" label-width="0">
                <el-date-picker size="mini" :default-value="form.timeEnd" type="month"   value-format="yyyy-MM" v-model="form.timeEnd" style="width: 80px;"></el-date-picker>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">
              <span class="des-word" >发领</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0" prop="stateIdsDefault">
                <CheckSelectSpecial :selectId="stateIdsDefault" :listData="stateParams" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            
            <div class="left" style="padding-left: 15px;" >
              <span class="des-word" >封账</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-select    style="width:80px;"  v-model="form.isClosingAccounts" @change='selectChangemethods'>
                  <el-option v-for="item in isClosingAccountsParams" :label="item.name" :value="item.id"  style="width: 80px;"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
              <span class="des-word" >人力状态</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" prop="departIds">
                <CheckSelectSpecial :selectId="departIds" :listData="userStateIdParams" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" prop="userId">
                <CheckSelectSpecial :selectId="userId" :listData="userParams1" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" prop="numSelectIds">
                <CheckSelectSpecial :selectId="numSelectIds" :listData="userParams2" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;" >
              <span class="des-word" >职位</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" prop="positionbind">
                <CheckSelectSpecial :selectId="positionbind" :listData="staffIdParams" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            
            <div class="left padding-l-15" style="padding-left:15px" >
              <span class="des-word" >工资人</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="executorId">
                <CheckSelectSpecial @findStreetByTown="finUserByDepart" :selectId="executorId" :listData="executorList" style="width:90px;"></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" prop="departSelectIds">
                <CheckSelectSpecial :selectId="departSelectIds" :listData="departParamsperson" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left " style="padding-left:12px;"  >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.word" title="姓名/备注"  maxlength="30" style="width:100px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-5" style="margin-top:2px;"  >
              <i class="search-btn" @click="searchSalaryDetailsList">查询</i>
            </div>
            <div class="left " style="margin-top:3px;"  >
              <i class="claerlys" @click="clearForm" ></i>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear mycontent" >

      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          empty-text=" "
          border
          height="100%"
          use-virtual
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
              show-overflow-tooltip
            >
              <template slot="header">
                <span style="color: #999;transform: scale(0.8);display: inline-block;">(当时)</span>
                <span>{{item.label}}</span>
              </template>
              <template slot-scope="scope" style="height: 100%;">
                <div style="position: absolute;top: 50%;margin-top: -6px;width: 100%;">
                  <div class="findparentclass" style="color:#336699;text-algin:center;cursor:pointer;z-index: 333;font-weight: bold;" @click="editorSalaryDetails(scope.$index, scope.row)" >
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
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'num5'||item.prop == 'num9'||item.prop == 'num10'||item.prop == 'num11'||item.prop == 'num12'||item.prop == 'num13'||item.prop == 'num14'||item.prop == 'num15'||item.prop == 'num16'||item.prop == 'num17'||item.prop == 'num18'||item.prop == 'num23'||item.prop == 'num28'||item.prop == 'num29'||item.prop == 'num30'||item.prop == 'num31'||item.prop == 'num32'||item.prop == 'num33'||item.prop == 'num34'||item.prop == 'num35'||item.prop == 'num36'||item.prop == 'num37'"
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
              
              <template v-for="item1 in item.child" v-if="item1.show">
                <PlTableColumn
                  v-if='item.child||item.child.length>0 '
                  :label="item1.label"
                  :prop='item1.prop'
                  :width='item1.width'
                  :sortable="item1.sortable"
                  :align="item.align"
                  show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <div style="position: absolute;width: 100%;top: 50%;margin-top: -6px;">
                        {{ scope.row[item.prop] }}
                      </div>
                      <div v-if="scope.row[item.prop+'Reamrk']" class="orange-icon" style="position: absolute;top: 0px;right: 0px;" :title="scope.row[item.prop+'Reamrk']">

                      </div>
                    </template>
                </PlTableColumn>
              </template> 
            </pl-table-column>


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
              :show-overflow-tooltip="true"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.state}}-{{scope.row.state2}}
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
              :show-overflow-tooltip="true"
              show-overflow-tooltip
            >
              <template slot="header">
                <span style="color: #999;transform: scale(0.8);display: inline-block;">(当时)</span>
                <span>{{item.label}}</span>
              </template>

            </pl-table-column>

             <!-- 当月考勤扣款 -->
            <pl-table-column
              v-else-if="item.prop == 'num6'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              show-overflow-tooltip
            >
              
              <template v-for="item1 in item.child" v-if="item1.show">
                <PlTableColumn
                  v-if='item.child||item.child.length>0 '
                  :label="item1.label"
                  :prop='item1.prop'
                  :width='item1.width'
                  :sortable="item1.sortable"
                  :align="item.align"
                  show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <div style="position: absolute;width: 100%;top: 50%;margin-top: -6px;">
                        {{ scope.row.num6 }}
                      </div>
                      <div v-if="scope.row.num6Reamrk" class="orange-icon" style="position: absolute;top: 0px;right: 0px;" :title='scope.row.num6Reamrk'>

                      </div>
                      <div v-if="scope.row.num6!=''&&scope.row.num6!=0" class="blue-icon" style="position: absolute;bottom: 0px;right: 0px;" @click="openDailyAttendance(scope.$index, scope.row)">

                    </div>
                  </template>
                </PlTableColumn>
              </template> 
            </pl-table-column>


            <!-- num7当月奖罚扣款 -->
            <pl-table-column
              v-else-if="item.prop == 'num7'||item.prop == 'num8'||item.prop == 'num19'||item.prop == 'num20'||item.prop == 'num21'||item.prop == 'num22'||item.prop == 'num24'||item.prop == 'num25'||item.prop == 'num26'||item.prop == 'num27'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              show-overflow-tooltip
            >
              <template v-for="item1 in item.child" v-if="item1.show">
                <PlTableColumn
                  v-if='item.child||item.child.length>0 '
                  :label="item1.label"
                  :prop='item1.prop'
                  :width='item1.width'
                  :sortable="item1.sortable"
                  :align="item.align"
                  show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <div style="position: absolute;width: 100%;top: 50%;margin-top: -6px;">
                        {{ scope.row[item.prop] }}
                      </div>
                      <div v-if="scope.row[item.prop+'Reamrk']" class="orange-icon" style="position: absolute;top: 0px;right: 0px;" :title="scope.row[item.prop+'Reamrk']">

                      </div>
                      <div v-if="scope.row[item.prop]!=''&&scope.row[item.prop]!=0" class="blue-icon" style="position: absolute;bottom: 0px;right: 0px;" @click="openSalaryDetailsIframeChild1(scope.$index, scope.row,item.label,item.prop)">

                      </div>
                    </template>
                </PlTableColumn>
              </template> 
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'isClosingAccounts'"
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
              <template v-for="item1 in item.child" v-if="item1.show">
                <PlTableColumn
                  v-if='item.child||item.child.length>0 '
                  :label="item1.label"
                  :prop='item1.prop'
                  :width='item1.width'
                  :sortable="item1.sortable"
                  :align="item.align"
                  show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <div style="position: absolute;width: 100%;top: 50%;margin-top: -6px;">
                        {{ scope.row.isClosingAccounts }}
                      </div>
                      <div v-if="scope.row.closeRemark" class="orange-icon" style="position: absolute;top: 0px;right: 0px;" :title='scope.row.closeRemark'>

                      </div>
                    </template>
                </PlTableColumn>
              </template> 
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'salaryState'"
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
              
              <template v-for="item1 in item.child" v-if="item1.show">
                <PlTableColumn
                  v-if='item.child||item.child.length>0 '
                  :label="item1.label"
                  :prop='item1.prop'
                  :width='item1.width'
                  :sortable="item1.sortable"
                  :align="item.align"
                  show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <div style="position: absolute;width: 100%;top: 50%;margin-top: -6px;">
                        {{ scope.row.salaryState }}
                      </div>
                      <div v-if="scope.row.stateRemark" class="orange-icon" style="position: absolute;top: 0px;right: 0px;" :title='scope.row.stateRemark'>

                      </div>
                    </template>
                </PlTableColumn>
              </template> 
            </pl-table-column>

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
              slot-scope="scope"
              show-overflow-tooltip
            >
               <template v-if="item1.show" v-for="item1 in item.child" >
                <PlTableColumn
                    v-if='item.child||item.child.length>0 '
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item1.sortable"
                    :align="item.align"
                    show-overflow-tooltip
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
          </template>
        </PlTable>
      </div>
    </div>
  </div>
</template>


<script>
  // 获取数据
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {
    userSalarygetParams,
    userInsuranceTaskList,
    userSalaryDelete,
    userSalaryUpdateClose,
    userSalaryUpdateState } from '../../../service/SalaryDetails';



  // 自选列
  import ColumPage from '../../../components/column';

  import CheckSelect from '../../../components/check';
  import CheckSelectSpecial from '../../../components/checkSpecial';

  import { PlTable, PlTableColumn } from 'pl-table';
  import {SalaryDetailsList} from '../../../utils/SalaryDetailsList';
  import newAddSalary from './newAddSalary';
  import SingleWage from './SingleWage';
  import openDailyAttendance from './openDailyAttendance';

  // 第一层弹窗
  import SalaryDetailsIframepage from './SalaryDetailsIframe'

  import iframechildtwo from './iframechildtwo.vue';
  import iframechildsix from './iframechildsix';
  import iframechildseven from './iframechildseven';
  // 个人模拟数据
  import { mySalaryDetailsListContent } from '../../../utils/mySalaryDetailsList';
  import {quickDate} from '../../../utils/getQuickDate';
  import { orgnizetionParam } from "../../../utils/orgnizeparam";

  export default {
    data() {
      return {
        stateParams:[],
        insuranceMoneyuseParams:[],
        stateIdsDefault:'stateIdsDefault',
        departIds:'departIds',
        defaulttimeStart:new Date(),
        departId:'departId',
        userId:'userId',
        numSelectIds:'numSelectIds',
        departSelectIds:'departSelectIds',
        useTimeIds:'useTimeIds',
        executorId: "executorId",
        bumenrenyuan:[],
        positionbind:'positionbind',
        
        isClosingAccountsParams:[
          {id:"-1",name:"全部",select:true},
          {id:"0",name:"未封账",select:false},
          {id:"1",name:"已封账",select:false}
        ],
        userStateIdParams:[],
        executorList: [],
        departParams:[],
        staffIdParams:[],
        departParamsperson:[{ id: "-1", name: "全部", select: true }],
        userParams1: orgnizetionParam.orgnizetionStateTwo,
        userParams2: orgnizetionParam.orgnizetionStateThree,
        form:{
          timeStart:'',
          timeEnd:'',
          word:'',
          type:"2",
          isClosingAccounts:'-1',  
        },
        columnValue:false,
        upAndDown:1,
        DPorPS:1,
        currentNum:0,
        rowHeight:27,
        culumnTitle:'工资明细',
        sessionStr:'SalaryDetailsPerson-list',
        tableData:[],
        columnData:SalaryDetailsList.SalaryDetailsPerson,
        currentPage:'',
        multipleSelection:[],
        multipleSelection11:[],
        multipleSelection22:[],
        columnDatatotal:{},
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
      newAddSalary,
      SingleWage,
      SalaryDetailsIframepage,
      iframechildtwo,
      iframechildsix,
      iframechildseven,
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
        if(column.label=='底薪'||column.label=='当月考勤-扣款'||column.label=='当月奖罚-奖补'||column.label=='总基本当月'||column.label=='当月提成应计（年）'||column.label=='当月奖金应计（月）'||column.label=='当月提成应计（月）'||column.label=='保险（公司）'||column.label=='公积金（公司）'||column.label=='保险（个人）'||column.label=='公积金（个人）'||column.label=='总应计当月'||column.label=='总人力当月'||column.label=='当月奖金结算（年）'||column.label=='当月提成结算（年）'||column.label=='当月奖金结算（月）'||column.label=='当月提成结算（月）'||column.label=='总结算当月'||column.label=='往月奖金结算（年）'||column.label=='往月提成结算（年）'||column.label=='往月奖金结算（月）'||column.label=='往月提成结算（月）'||column.label=='往月补充扣款'||column.label=='往月补充奖补'||column.label=='总税前应发'||column.label=='个所税'||column.label=='总税后应发'||column.label=='总人力实际'||column.label=='处置欠款'||column.label=='总最终发放'||column.label=='代补扣额'||column.label=='总实际发放'||column.label=='工资封账'||column.label=='发放领取'){
          return 'num6style'
        };
        if(column.label=='当月奖罚-扣款'){
          return 'num7style'
        };
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        if(column.label=='部门-人员'){
          return {'line-height':this.rowHeight};
        }
      },
      changeToSalaryDetails(){

        this.$router.push('/home/SalaryDetails');
      },
      selectChangemethods(){
        console.log(this.isClosingAccountsParams)
      },
      getParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        userSalarygetParams().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.getQuickDate(18);
            let data = response.data;
            let initArr1 = [{id:"-1",name:"全部",select:true}];
            let initArr2 = [{id:"-1",name:"全部",select:true}];
            let initArr3 = [{id:"-1",name:"全部",select:true}];

            if(data.stateParams){
              _this.stateParams = initArr2.concat(data.stateParams);
            }else{
              _this.stateParams = initArr2;
            }

            if(data.userStateIdParams){
              data.userStateIdParams.forEach(item=>{
                if(item.name=='常态在职'||item.name=='薪假在职'||item.name=='停薪在职'||item.name=='申离在职'||item.name=='正式离职'){
                  initArr3.push({
                    id: item.id,
                    name: item.name.replace(/&nbsp;/g, ""),
                    select: false
                  });
                }
              })
              _this.userStateIdParams = initArr3;
            };

            if(data.staffIdParams){
              let arr2 = [{ id: "-1", name: "全部", select: true }];
              for (let i = 0; i < data.staffIdParams.length; i++) {
                arr2.push({
                  id: data.staffIdParams[i].id,
                  name: data.staffIdParams[i].label.replace(/&nbsp;/g, ""),
                  select: data.staffIdParams[i].select
                });
              }
              _this.staffIdParams = arr2;
            }else{
              _this.staffIdParams = initArr;
            }

            let arr1 = [{ id: "-1", name: "全部", select: true }];
            _this.userParams1 = arr1.concat(_this.userParams1);

            let arr2 = [{ id: "-1", name: "全部", select: true }];
            _this.userParams2 = arr2.concat(_this.userParams2);

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
            _this.departParamsperson = [{ id: "-1", name: "全部", select: true }];
            _this.searchSalaryDetailsList();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      searchSalaryDetailsList(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        
        //发放领取
        let salaryState = _this.getSelectIdByList(_this.stateParams);
        form.salaryState = salaryState.toString();

        //人员状态1
        let stateIds = _this.getSelectIdByList(_this.userStateIdParams);
        form.stateIds = stateIds.toString();
        
        //人员状态2
        let stateIds2 = _this.getSelectIdByList(_this.userParams1);
        form.stateIds2 = stateIds2.toString();

        //人员状态3
        let stateIds3 = _this.getSelectIdByList(_this.userParams2);
        form.stateIds3 = stateIds3.toString();

        //职位
        let staffId = _this.getSelectIdByList(_this.staffIdParams);
        form.staffId = staffId.toString();

        //部门
        let departIds = _this.getSelectIdByList(_this.executorList);
        form.departIds = departIds.toString();

        //人员
        let userIds = _this.getSelectIdByList(_this.departParamsperson);
        form.userIds = userIds.toString();

        if(form.timeStart==null||form.timeStart=="null"){
          form.timeStart = '';
        }
        if(form.timeEnd==null||form.timeEnd=="null"){
          form.timeEnd = '';
        };

        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        userInsuranceTaskList(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.currentNum = 0;
            _this.tableData = data.list;

            if(response.data.list.length!=0){
              for(let i = 1;i<38;i++){
                if(i!=22){
                  _this.columnDatatotal['num'+i+"total"] = response.data['num'+i];
                }
              }
            }else{
              for(let i = 1;i<38;i++){
                _this.columnDatatotal['num'+i+"total"] = '0.00';
              }
            }

            _this.columnData.forEach(item=>{
              if(item.child){
                item.child.forEach(ii=>{
                  ii.label = _this.columnDatatotal[ii.prop];
                })
              }
            })

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },

      openSalaryDetailsIframeChild1(index, row, label, prop){
        console.log(label);
        let thismypage;
        let thisrownum;
        let thismytype;
        if(prop=='num7'){
          thismypage = iframechildtwo;
          thisrownum = row.num7; 
          thismytype = '2';
        }else if(prop=='num8'){
          thismypage = iframechildtwo;
          thisrownum = row.num8; 
          thismytype = '1';
        }else if(prop=='num19'){
          thismypage = iframechildseven;
          thisrownum = row.num19; 
          thismytype = label;
        }else if(prop=='num20'){
          thismypage = iframechildsix;
          thisrownum = row.num20; 
          thismytype = label;
        }else if(prop=='num21'){
          thismypage = iframechildseven;
          thisrownum = row.num21; 
          thismytype = label;
        }else if(prop=='num22'){
          thismypage = iframechildsix;
          thisrownum = row.num22; 
          thismytype = label;
        }else if(prop=='num24'){
          thismypage = iframechildseven;
          thisrownum = row.num24; 
          thismytype = label;
        }else if(prop=='num25'){
          thismypage = iframechildsix;
          thisrownum = row.num25; 
          thismytype = label;
        }else if(prop=='num26'){
          thismypage = iframechildseven;
          thisrownum = row.num26; 
          thismytype = label;
        }else if(prop=='num27'){
          thismypage = iframechildseven;
          thisrownum = row.num27; 
          thismytype = label;
        }
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: thismypage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{thisnum:thisrownum,thistime:row.time,thisuserId:row.userId,thistype:thismytype}//props
          },
          type:2,
          area:['600px','400px'],
          title: label+'---'+thisrownum+'元',
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891111,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
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
              _this.departParamsperson = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.departParamsperson = [{id:'-1',name:"全部",select:true}];
        }

      },
      //新增
      newAddSalary(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: newAddSalary, //传递的组件对象
            parent: _this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "批量新增工资人月",
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
      //修改
      editorSalaryDetails(index, row){
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
        let layerId = _this.$layer.iframe({
          content: {
            content: SalaryDetailsIframepage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
                  rowdata:row,
                  mythisindex:index,
                }//props
          },
          area:['800px','560px'],
          title:"工资修改 【" + row.user +"&nbsp;&nbsp;&nbsp;&nbsp;"+ row.time + "】",
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
      reloadProjectList(type){
        if(type == 1){
          this.searchSalaryDetailsList();
        }else if(type == 2){

        }
      },
      //操作单项工资
      SingleWage(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: SingleWage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['600px','450px'],
          title: "操作单项工资",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891113,
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
      // 工资封账
      SalaryPayment(){
        let _this = this;
        let ids = _this.multipleSelection;
        console.log(ids);
        if(ids.length != 0){
          _this.myConfirm("确定要将选定的人月工资封账吗?","question-icon",'是','否',"").then(res => {
            _this.SalaryPaymentfunc();
          }).catch(err => {

          })
        }else{
          _this.myAlert("请选择要封账的人月工资！")
        }
      },
      SalaryPaymentfunc(){
        let _this = this;
        let close = 1;
        let userTimeIds = _this.multipleSelection11.toString();
        let myform = {};
        myform.userTimeIds = userTimeIds;
        myform.close = close;
        userSalaryUpdateClose(myform).then(function (response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let data = response.data;

            _this.myAlert("封账成功",'success-icon').then(res => {
              _this.searchSalaryDetailsList();
            }).catch(err => {

            })
          }else if(response.status == 1){
            _this.myAlert(response.msg+"！");
          }
        })
      },

      // 取消封账
      CancellationAccounts(){
        let _this = this;
        let ids = _this.multipleSelection;
        console.log(ids);
        if(ids.length != 0){
          _this.myConfirm("确定要将选定的人月工资取消封账吗?","question-icon",'是','否',"").then(res => {
            _this.CancellationAccountsfunc();
          }).catch(err => {

          })
        }else{
          _this.myAlert("请选择要取消封账的人月工资！")
        }
      },
      CancellationAccountsfunc(){
        let _this = this;
        let close = 0;
        let userTimeIds = _this.multipleSelection11.toString();
        let myform = {};
        myform.userTimeIds = userTimeIds;
        myform.close = close;
        userSalaryUpdateClose(myform).then(function (response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let data = response.data;

            _this.myAlert("取消成功",'success-icon').then(res => {
              _this.searchSalaryDetailsList();
            }).catch(err => {

            })
          }else if(response.status == 1){
            _this.myAlert(response.msg+"！");
          }
        })
      },
      //当月考勤扣款详情(点击列表中的蓝色叹号进入)
      openDailyAttendance(index,row){
        let test = this.$layer.iframe({
          content: {
            content: openDailyAttendance, //传递的组件对象
            parent: this,//当前的vue对象
            data:{thisrow:row}//props
          },
          area:['800px','560px'],
          title: "当月考勤扣款---"+row.time+"---"+row.user+"---"+row.num7+"元",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891113,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },
      //已发放
      Issuedfunc(){
        let _this = this;
        let ids = _this.multipleSelection;
        console.log(_this.multipleSelection22);
        let alertmsg = '';
        let successnum = 0;
        let failnum = 0;
        let failisClosingAccounts = 0;
        let isClosingAccountsalertmsg = '';
        _this.multipleSelection22.forEach(item=>{
          if(item.salaryState=="已发放"){
            failnum = failnum+1;
            alertmsg += item.name+"/";
          }else if(item.isClosingAccounts=="未封账"){
            failisClosingAccounts = failisClosingAccounts+1;
            isClosingAccountsalertmsg += item.name+'/';
          }else{
            successnum = successnum+1;
          }
        });
        if(ids.length != 0){
          if(failisClosingAccounts!=0){
            _this.myAlert(successnum+"条成功，"+failisClosingAccounts+"条失败！"+isClosingAccountsalertmsg+"该年月对应的工资未封账，不允许操作已发放！");
          }else{
            if(failnum != 0){
              _this.myAlert(successnum+"条成功，"+failnum+"条失败！"+alertmsg+"该年月对应的工资已发放，不允许操作已发放！");
            }else{
              _this.myConfirm("确认发放?","question-icon",'是','否',"").then(res => {
                _this.IssuedfuncSuccess();
              }).catch(err => {

              })
            }
          }
          
          
        }else{
          _this.myAlert("请选择要发放的工资记录！");
        }
      },
      IssuedfuncSuccess(){
        let _this = this;
        userSalaryUpdateState(_this.multipleSelection.toString()).then(function (response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let data = response.data;

            _this.myAlert("发放成功",'success-icon').then(res => {
              _this.searchSalaryDetailsList();
            }).catch(err => {

            })
          }else if(response.status == 1){
            _this.myAlert(response.msg+"！");
          }
        })
      },
      //删除项目
      deletedSalaryDetails(){
        let _this = this;
        let ids = _this.multipleSelection;

        let successnum = 0;
        let failisClosingAccounts = 0;
        let isClosingAccountsalertmsg = '';
        _this.multipleSelection22.forEach(item=>{
          if(item.isClosingAccounts=="已封账"){
            failisClosingAccounts = failisClosingAccounts+1;
            isClosingAccountsalertmsg += item.name+'/';
          }else{
            successnum = successnum+1;
          }
        });
        if(ids.length != 0){
          if(failisClosingAccounts!=0){
            _this.myAlert(successnum+"条成功，"+failisClosingAccounts+"条失败！"+isClosingAccountsalertmsg+"该年月对应的工资已封账，不允许删除工资！");
          }else{
            _this.myConfirm("警告：工资记录删除后将不能还原！","question-icon",'是','否',"确定要删除选定记录吗？").then(res => {
              _this.deletedSDSuccess();
            }).catch(err => {

            })
          }
          
        }else{
          _this.myAlert("请选择要删除的工资记录！")
        }
      },

      deletedSDSuccess(){
        let _this = this;
        let form = {
          deleted:1,
          id: _this.multipleSelection.toString(),
        };
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        userSalaryDelete(form).then(function (response) {
          _this.$layer.closeAll('loading');
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
      clearForm(){
        let _this = this;
        _this.getQuickDate(18);
        _this.form.word = '';
        _this.isClosingAccounts = '-1';

        _this.stateParams =  _this.backSlect(_this.stateParams);
        _this.userStateIdParams = _this.backSlect(_this.userStateIdParams);
        _this.userParams1 = _this.backSlect(_this.userParams1);
        _this.userParams2 = _this.backSlect(_this.userParams2);

        _this.staffIdParams = _this.backSlect(_this.staffIdParams);
        _this.executorList = _this.backSlect(_this.executorList);
        
        _this.departParamsperson = _this.backSlect(_this.departParamsperson);

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
          this.rowHeight = storageColumn.height*1;
        }else{
          column = columnData;
        }
        let count = '';
        column.forEach(function(item,index){
          if(item.fixed && item.fixed != 'false'){
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
        debugger;
        this.$nextTick(function () {
          this.columnData = column;
        })
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
          const list = this.tableData;
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '工资明细(人员)')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //全选
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = [];
        _this.multipleSelection11 = [];
        _this.multipleSelection22 = [];
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
          _this.multipleSelection11.push(item.userTimeId);
          _this.multipleSelection22.push({
            id:item.id,
            name:item.user,
            salaryState:item.salaryState,
            isClosingAccounts:item.isClosingAccounts
          });
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
        _this.multipleSelection11 = Array.from(new Set(_this.multipleSelection11));
      },
      tableRowClassName ({row, rowIndex}) {

        // 把每一行的索引放进row
        row.index = rowIndex;
        if(row.isClosingAccounts == "已封账"){
          return 'isClosingAccountsStyle'
        }
      },
      getRowDataByClick (row, column, event) {
        let _this = this;
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
      },
      
      // rowClass({row, index}) {
      //   let className = "";
      //   console.log(index);
      //   return className;
      // },
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
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "工资修改 【" + _this.tableData[mycountnum].user +"&nbsp;&nbsp;&nbsp;&nbsp;"+ _this.tableData[mycountnum].time + "】";
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
    //实例被挂载后
    mounted(){
      this.reloadListByStorage();
      this.shadenum();
      this.getParamsData();
    },
    watch: {
      $route: {
        handler() {
          this.DPorPS = 1;
        },
        deep: true,
      }
    },
  };
</script>

<style lang="scss" scoped>
  /deep/ .mycontent .el-table,.el-table__expanded-cell {
    height: 100% !important;
  }
  /deep/ .isClosingAccountsstyle{
    background-color: #E4E4E4;
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
  /deep/ .num6style .cell{
    line-height: 100%!important;
    height: 100%!important; 
  }

  /deep/ .num7style .cell{
    line-height: 100%!important;
    height: 100%!important; 
  }

  /deep/ .mycontent .el-table tbody .isClosingAccountsStyle {
    background-color: #E4E4E4;
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
    .mycontent{
      height: calc(100% - 88px);
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
  /deep/ .mycontent .plTableBox .el-table .el-table__header th{
    background-color: #DCD9D3;
  }
  /deep/ .mycontent .el-table .el-table__body-wrapper{
    height: calc(100% - 52px) !important;
  }
</style>

