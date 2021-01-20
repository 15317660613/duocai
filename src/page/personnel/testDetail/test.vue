<template>
  <div id="follow-container" class="rent-container mycontailerclass1">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2" style="margin: 0px 10px;">
        <div class="clear">
          <div class="clear left" style="cursor: pointer;" @click="newTask">
            <div class="border-icon clear" > 
              <div class="left padding-l-10" style="margin-top: 5px;">
                <i class="six-eleven-icon"></i>
              </div>
              <div class="left padding-l-5" >
                <span>新增</span>
              </div>
            </div>  
          </div>
          <div class="clear left" style="cursor: pointer;" @click="deletedTask">
            <div class="border-icon clear" > 
              <div class="left padding-l-10" style="margin-top: 6px;">
                  <i class="six-ten-icon"></i>
                </div>
              <div class="left padding-l-5" >
                <span>删除</span>
              </div>
            </div>  
          </div>
          <div class="left padding-l-5">
            <i class="cut-icon"></i>
          </div>
           <div class="clear left" style="cursor: pointer;" @click="confirmation(1)">
            <div class="border-icon clear" > 
              
              <div class="left padding-l-10" style="margin-top: 3px;">
                <i class="eleven-one-icon"></i>
              </div>
              <div class="left padding-l-5">
                <span>申请确认</span>
              </div>
            </div>  
          </div>
          <div class="clear left" style="cursor: pointer;"  @click="confirmation(2)">
            <div class="border-icon clear" > 
              <div class="left padding-l-10" style="margin-top: 3px;">
                <i class="eleven-two-icon"></i>
              </div>
              <div class="left padding-l-5">
                <span>已确认</span>
              </div>
            </div>  
          </div>
          <div class="clear left" style="cursor: pointer;" @click="confirmation(3)">
            <div class="border-icon clear" > 
              <div class="left padding-l-10" style="margin-top: 3px;">
                <i class="eleven-three-icon"></i>
              </div>
              <div class="left padding-l-5">
                <span>申请完成</span>
              </div>
            </div>  
          </div>
          <div class="clear left" style="cursor: pointer;" @click="confirmation(4)">
            <div class="border-icon clear" > 
              <div class="left padding-l-10" style="margin-top: 3px;">
                <i class="eleven-four-icon"></i>
              </div>
              <div class="left padding-l-5">
                <span>已完成</span>
              </div>
            </div> 
          </div>
           <div class="clear left" style="cursor: pointer;" @click="categoryClick">
            <div class="border-icon clear" > 
              <div class="left padding-l-10" style="margin-top: 3px;">
                <i class="eleven-five-icon"></i>
              </div>
              <div class="left padding-l-5">
                <span>类别</span>
              </div>
            </div> 
          </div>
          <div class="clear left" style="cursor: pointer;" @click="changBaoClick">
            <div class="border-icon clear" > 
              <div class="left padding-l-10" style="margin-top: 3px;">
                <i class="eleven-six-icon"></i>
              </div>
              <div class="left padding-l-5">
                <span>常报</span>
              </div>
            </div>  
          </div>
          <div class="left padding-l-5">
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10" style="margin-top: 3px;">
            <div class="border-icon clear" > 
             <i class="one-Thirteen-icon" title="过滤选中" @click="filterData" ></i>
            </div> 
          </div>
          <div class="left padding-l-10">
            <i class="cut-column-icon"></i>
          </div>
          <div class="left padding-l-10">
            <div class="border-icon clear" > 
             <i class="leading-out-icon" title="自选列" @click="clickColumn"></i>
            </div> 
          </div>
          <div type="primary" class="padding-l-10 left padding-t-2" >
            <i class="print-out-icon" title="导出" @click="exportToExcel"></i>
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
              <i class="back-icon user left" @click="tabRemove('/home/testDetails')"></i>
            </div>  
          </div>
        </div>
      </div>
      <div class="search-container">
        <el-form ref="formsData" :model="form">
          <div class="clear" id="searchContent1">
            <div class="left" style="padding-left:15px">
              <span class="des-word">任务规划</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="taskYear1">
                <el-select v-model="form.taskYear1"  style="width:70px;">
                  <el-option v-for="item in yearParam" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="taskMonth1">
                <el-select v-model="form.taskMonth1"  style="width:70px;">
                  <el-option v-for="item in mounths" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <span>-</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="taskYear2">
                <el-select v-model="form.taskYear2"  style="width:70px;">
                  <el-option v-for="item in yearParam" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="taskMonth2">
                <el-select v-model="form.taskMonth2"  style="width:70px;">
                  <el-option v-for="item in mounths" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">
              <span class="des-word">类别</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="taskTypeOne">
                <CheckSelectSpecial
                  @findStreetByTown="findStreetByTown"
                  :selectId="taskTypeOne"
                  :listData="taskTypeOneList"
                  style="width:70px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="taskTypeTwo">
                <CheckSelectSpecial
                  :selectId="taskTypeTwo"
                  :listData="taskTypeTwoList"
                  style="width:70px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="taskTypeThree">
                <CheckSelectSpecial
                  :selectId="taskTypeThree"
                  :listData="taskTypeThreeList"
                  style="width:70px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:15px">
              <span class="des-word">常报</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="reportOneId">
                <CheckSelectSpecial
                  :selectId="reportOneId"
                  :listData="reportOneList"
                  style="width:70px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="reportTwoId">
                <CheckSelectSpecial
                  :selectId="reportTwoId"
                  :listData="reportTwoList"
                  style="width:70px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="reportThreeId">
                <CheckSelectSpecial
                  :selectId="reportThreeId"
                  :listData="reportThreeList"
                  style="width:70px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:15px">
              <el-form-item prop="word" label-width="0">
                <el-input
                  v-model.trim="form.word"
                  title="任务概念/任务备注/执行人/灵感记录"
                  maxlength="30"
                  style="width:150px;"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-5" style="padding-top:1px;">
              <i @click="searchConteactDataList" class="search-btn" style="cursor:pointer;">查询</i>
            </div>
            <div class="left" style="padding-top:2px;">
              <i class="claerlys" @click="clearForm"></i>
            </div>
            <div class="left" style="margin-top:4px;">
              <i
                :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}"
                @click="showSearch"
              ></i>
            </div>
          </div>

          <div class="clear" style id="searchContent2">
            <div class="left padding-l-15">
              <span class="des-word">人力状态</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="stateUser1">
                <CheckSelectSpecial
                  @change="stues"
                  :selectId="stateUser1"
                  :listData="stateParam"
                  style="width:96px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="stateUser2">
                <CheckSelectSpecial
                  :selectId="stateUser2"
                  :listData="userParams1"
                  style="width:96px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="stateUser3">
                <CheckSelectSpecial
                  :selectId="stateUser3"
                  :listData="userParams2"
                  style="width:96px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:15px">
              <span class="des-word">职位</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="staff">
                <CheckSelectSpecial :selectId="staff" :listData="staffList" style="width:110px;"></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:15px">
              <span class="des-word">执行人</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="executorId">
                <CheckSelectSpecial
                  @findStreetByTown="finUserState"
                  :selectId="executorId"
                  :listData="executorList"
                  style="width:110px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="departId">
                <CheckSelectSpecial
                  :selectId="departId"
                  :listData="userParams"
                  style="width:110px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:20px">
              <span class="des-word">任务状态</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="taskState">
                <CheckSelectSpecial
                  :selectId="taskState"
                  :listData="taskStateList"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:20px">
              <span class="des-word">完成状态</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="finishStateId">
                <CheckSelectSpecial
                  :selectId="finishStateId"
                  :listData="finishStates"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear">
      <div class="list-content">
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          empty-text=" "
          border
          use-virtual
          height="100%"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :cell-class-name="finalCellStyle"
          :row-height="rowHeight"
          :cell-style="cellStyle"
          ref="singleTable"
        >
          <template v-if="item.show" v-for="(item,index) in columnData">
            <PlTableColumn
              v-if="item.prop == 'user'"
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
              <template slot="header" slot-scope="scope">
                  <span style="color: #999;transform: scale(0.8);display: inline-block;">(当时)</span>
                  <span>{{item.label}}</span>
              </template>
              <template slot-scope="scope" style="height: 100%;">
                <div style="position: absolute;top: 50%;margin-top: -6px;width: 100%;">
                  <div class="findparentclass">
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
              v-else-if="item.prop == 'taskConcept'"
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
            <template slot-scope="scope" style="height: 100%;">
              <div style="position: absolute;top: 50%;margin-top: -6px;width: 100%;overflow: hidden;left: 0px;">
                <div class="findparentclass" style="color:#336699;text-algin:center;cursor:pointer;z-index: 333;" @click="editorTask(scope.$index, scope.row)" >
                  {{ scope.row.taskConcept }}
                </div>
              </div>
              <!-- 战略 -->
              <div  v-if='scope.row.taskStrategy=="1"'  class="nine-seven-icon" style="position: absolute;left: 0px;top: 0;color: #45865F;z-index: 332;">
                
              </div>
            </template>
            </PlTableColumn>

            <PlTableColumn
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
              slot-scope="scope"
              show-overflow-tooltip

            >
            <template slot-scope="scope" style="height: 100%;">
              <div>
                {{scope.row.state}}-{{scope.row.state2}}
              </div>
            </template>
            </PlTableColumn>

            <PlTableColumn
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
              slot-scope="scope"
              show-overflow-tooltip

            >
            <template slot="header">
              <span style="color: #999;transform: scale(0.8);display: inline-block;">(当时)</span>
              <span>{{item.label}}</span>
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
              :fixed="item.fixed"
              :align="item.align"
              slot-scope="scope"
              show-overflow-tooltip
            ></PlTableColumn>
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {findUserByDepartId} from "../../../service/organizeDate";
import {
  taskList,
  taskgetparams,
  delTask,
  batchUpdateInsuranceTask,
} from "../../../service/testDetailData";
import { testParam } from "../../../utils/testDetailParam";
import CheckSelectSpecial from "../../../components/checkSpecial"; // 自选列
import ColumPage from "../../../components/column";
import { PlTable, PlTableColumn } from "pl-table";
import EditCategory from "./editCategory";
import EditChangbao from "./editChangbao";
import NewTaskPage from "./newtask";
import DetailTask from "./detailTask";
import { orgnizetionParam } from "../../../utils/orgnizeparam";

//获取数据
export default {
  data() {
    return {
      taskList:[],
      columnValue: false,
      newShowTaskValue: false,
      detailShowTaskValue: false,
      currentPage: [],
      multipleSelection: [],
      tableData: [],
      yearParam: [],
      columnData: testParam.testList,
      sessionStr: "task-list",
      currentNum: 0,
      upAndDown: 1,
      tradeId: "tradeId",
      staff: "staff",
      departId: "departId",
      districtIds: "districtIds",
      streetIds: "streetIds",
      userId: "userId",
      processTypeId: "processTypeId",
      typeId: "typeId",
      culumnTitle: "任务列表",
      initLeft:0,//初始化详情弹窗的增加 left
      initTop:0,//初始化详情弹窗的增加 top
      modifyNumValue: false,
      rowHeight:47,
      areaParams: [],
      streetParams: [],
      tradeParams: [],
      staffList: [],
      userParams: [{ id: "-1", name: "全部", select: true }],
      userParams1: [],
      userParams2: [],
      processWayIdParams: [],
      typeParams: [],
      currentData: [],
      stateParam: [],
      taskStateList: [],
      stateUser: "stateUser",
      mounths: [],
      executorList: [],
      finishStates: [],
      reportOneList: [],
      reportTwoList: [],
      reportThreeList: [],
      taskTypeOneList: [],
      taskTypeTwoList: [],
      taskTypeThreeList: [],
      lizhi1: "",
      userParams1: orgnizetionParam.orgnizetionStateTwo,
      userParams2: orgnizetionParam.orgnizetionStateThree,
      stateUser1: "stateUser1",
      stateUser2: "stateUser2",
      stateUser3: "stateUser3",
      executorId: "executorId",
      finishStateId: "finishStateId",
      taskState: "taskState",
      taskTypeTwo: "taskTypeTwo",
      taskTypeOne: "taskTypeOne",
      taskTypeThree: "taskTypeThree",
      reportOneId: "reportOneId",
      reportTwoId: "reportTwoId",
      reportThreeId: "reportThreeId",
      form: {
        taskYear1: "",
        taskYear2: "",
        taskMonth1: "",
        taskMonth2: "",
        word: ""
      },
      mytaskYear1: "",
      mytaskYear2: "",
      mytaskMonth1: "",
      mytaskMonth2: "",
    };
  },
  components: {
    CheckSelectSpecial,
    ColumPage,
    PlTable,
    PlTableColumn,
    EditCategory,
    EditChangbao,
    NewTaskPage,
    DetailTask
  },
  methods: {

    //获取参数集合
    getParamsData() {
      let _this = this;
      this.$layer.loading({
        shade: true //是否显示遮罩
      });

      taskgetparams().then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          console.log(data);
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

          _this.userParams = [{ id: "-1", name: "全部", select: true }];

          if (data.taskTimeMonthParams) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            let taskTimeMonth = data.taskTimeMonthParams;
            for (let i = 0; i < taskTimeMonth.length; i++) {
              arr.push({
                id: taskTimeMonth[i].id,
                name: taskTimeMonth[i].name,
                select: taskTimeMonth[i].select
              });
            }
            _this.mounths = arr;
          }

          if (data.taskStateParams) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            let taskState = data.taskStateParams;
            for (let i = 0; i < taskState.length; i++) {
              arr.push({
                id: taskState[i].id,
                name: taskState[i].name,
                select: taskState[i].select
              });
            }
            _this.taskStateList = arr;
          }

          if (data.userStateIdParams) {
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
            _this.stateParam = arr;
          }
          

          if (data.finishStateParams) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            let finishId = data.finishStateParams;
            for (let i = 0; i < finishId.length; i++) {
              arr.push({
                id: finishId[i].id,
                name: finishId[i].name,
                select: finishId[i].select
              });
            }
            _this.finishStates = arr;
          }

          if (data.reportOneIdParams) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            let reportOne = data.reportOneIdParams;
            for (let i = 0; i < reportOne.length; i++) {
              arr.push({
                id: reportOne[i].id,
                name: reportOne[i].name,
                select: reportOne[i].select
              });
            }
            _this.reportOneList = arr;
          }

          if (data.reportTwoIdParams) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            let reportTwo = data.reportTwoIdParams;
            for (let i = 0; i < reportTwo.length; i++) {
              arr.push({
                id: reportTwo[i].id,
                name: reportTwo[i].name,
                select: reportTwo[i].select
              });
            }
            _this.reportTwoList = arr;
          }

          if (data.reportThreeIdParams) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            let reportThree = data.reportThreeIdParams;
            for (let i = 0; i < reportThree.length; i++) {
              arr.push({
                id: reportThree[i].id,
                name: reportThree[i].name,
                select: reportThree[i].select
              });
            }
            _this.reportThreeList = arr;
          }

          if (data.taskTypeOneParams) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            let taskTypeOne = data.taskTypeOneParams;
            for (let i = 0; i < taskTypeOne.length; i++) {
              arr.push({
                id: taskTypeOne[i].id,
                name: taskTypeOne[i].name,
                select: taskTypeOne[i].select,
                remark:taskTypeOne[i].remark,
              });
            }
            _this.taskTypeOneList = arr;
          }
          if (data.taskTypeTwoParams) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            let taskTypeTwo = data.taskTypeTwoParams;
            for (let i = 0; i < taskTypeTwo.length; i++) {
              arr.push({
                id: taskTypeTwo[i].id,
                name: taskTypeTwo[i].name,
                select: taskTypeTwo[i].select,
                remark:taskTypeTwo[i].remark,
              });
            }
            _this.taskTypeTwoList = arr;
          }
          if (data.taskTypeThreeParams) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            let taskTypeThree = data.taskTypeThreeParams;
            for (let i = 0; i < taskTypeThree.length; i++) {
              arr.push({
                id: taskTypeThree[i].id,
                name: taskTypeThree[i].name,
                select: taskTypeThree[i].select,
                remark:taskTypeThree[i].remark,
              });
            }
            _this.taskTypeThreeList = arr;
          }
          if(data.staffIdParams){
            let arr = [{ id: "-1", name: "全部", select: true }];
            let staffIdParams = data.staffIdParams;
            for (let i = 0; i < staffIdParams.length; i++) {
              arr.push({
                id: staffIdParams[i].id,
                name: staffIdParams[i].label.replace(/&nbsp;/g,''),
                select: staffIdParams[i].select
              });
            }
            _this.staffList = arr;
          }
          if(data.years){
            _this.yearParam = data.years;
          }
          let myarr1 = [{ id: "-1", name: "全部", select: true }];
          let myarr2 = [{ id: "-1", name: "全部", select: true }];
          _this.userParams1 = myarr1.concat(_this.userParams1);
          _this.userParams2 = myarr2.concat(_this.userParams2);
          _this.form.taskYear1 = data.yearNow;
          _this.form.taskYear2 = data.yearNow;
          if(!data.monthNow){
            _this.form.taskMonth1 = '-1';
            _this.form.taskMonth2 = '-1';
          }else{
            _this.form.taskMonth1 = data.monthNow;
            _this.form.taskMonth2 = data.monthNow;
          }
          _this.mytaskYear1 = _this.form.taskYear1;
          _this.mytaskYear2 = _this.form.taskYear2;
          _this.mytaskMonth1 = _this.form.taskMonth1;
          _this.mytaskMonth2 = _this.form.taskMonth2;

          _this.getTableData();
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },

    //获取表格数据
    getTableData() {
      let _this = this;
      //加载动画
      _this.$layer.loading({
        shade: true
      });
      let form = JSON.parse(JSON.stringify(_this.form));
      let taskStateList = this.getSelectIdByList(this.taskStateList);
      let finishState = this.getSelectIdByList(this.finishStates);
      let reportOneId = this.getSelectIdByList(this.reportOneList);
      let reportTwoId = this.getSelectIdByList(this.reportTwoList);
      let reportThreeId = this.getSelectIdByList(this.reportThreeList);
      let taskTypeOne = this.getSelectIdByList(this.taskTypeOneList);
      let taskTypeTwo = this.getSelectIdByList(this.taskTypeTwoList);
      let taskTypeThree = this.getSelectIdByList(this.taskTypeThreeList);
      let executorList = this.getSelectIdByList(this.executorList);
      let userParams = this.getSelectIdByList(this.userParams);
      let staffList = this.getSelectIdByList(this.staffList);
      let stateParamList = this.getSelectIdByList(this.stateParam);
      let stateParamList2 = this.getSelectIdByList(this.userParams1);
      let stateParamList3 = this.getSelectIdByList(this.userParams2);

      form.finishState = finishState.toString();
      form.taskState = taskStateList.toString();
      form.departIds=executorList.toString()
      form.userIds=userParams.toString()
      form.staffId=staffList.toString()
      form.taskTypeOne = taskTypeOne.toString();
      form.taskTypeTwo = taskTypeTwo.toString();
      form.taskTypeThree = taskTypeThree.toString();
      form.stateIds = stateParamList.toString();
      form.stateIds2 = stateParamList2.toString();
      form.stateIds3 = stateParamList3.toString();
      form.reportOneId = reportOneId.toString();
      form.reportTwoId = reportTwoId.toString();
      form.reportThreeId = reportThreeId.toString();

      taskList(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.tableData = response.data.list;
          console.log(_this.tableData);
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
        _this.currentNum = 0;
      });
    },
    finUserState() {
      let _this = this;
      let id = this.getSelectIdByList(_this.executorList);
      if (id) {
        _this.$layer.loading({
          shade: true
        });
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
            _this.userParams = arr;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }else{
        _this.userParams = [{id:'-1',name:"全部",select:true}];
      }
    },
    newTask() {
      let _this = this;
      let layerId = _this.$layer.iframe({
        content: {
          content: NewTaskPage, //传递的组件对象
          parent: _this, //当前的vue对象
          data: {} //props
        },
        area: ["600px", "550px"],
        title: "新增任务",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          this.currentPage = "";
        }
      });
      let getLayerId = document.getElementById(layerId);
      let mygetLayerId = document.getElementById(layerId).getAttribute('id');
      document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
      document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
      let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
      _this.$store.commit('set_active_layerifranme',layerifranmedata);
    },
    editorTask(index, row) {
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
          content: DetailTask, //传递的组件对象
          parent: _this, //当前的vue对象
          data: {
            myid: row.id,
            mythisindex:index,
          } //props
        },
        area: ["600px", "550px"],
        title: "任务修改 【" + row.taskTime + '&nbsp;&nbsp;&nbsp;&nbsp;' + row.user + "】",
        shadeClose: false,
        shade: false, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
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
    categoryClick() {
      let select = this.multipleSelection.toString();
      if (select) {
        let test = this.$layer.iframe({
          content: {
            content: EditCategory, //传递的组件对象
            parent: this, //当前的vue对象
            data: {
              ids:this.multipleSelection,
              taskTypeOneList:this.taskTypeOneList,
              taskTypeTwoList:this.taskTypeTwoList,
              taskTypeThreeList:this.taskTypeThreeList,
            } //props
          },
          area: ["350px", "200px"],
          title: "批量修改类别",
          shadeClose: false,
          shade: true, //是否显示遮罩
          zIndex: 198911100,
          cancel: () => {
            //关闭事件
            this.currentPage = "";
          }
        });
      } else {
        this.myAlert("请勾选要修改的任务！", "dangerous-icon");
      }
    },
    changBaoClick() {
      let select = this.multipleSelection.toString();
      if (select) {
        let test = this.$layer.iframe({
          content: {
            content: EditChangbao, //传递的组件对象
            parent: this, //当前的vue对象
            data: {
              ids:this.multipleSelection,
              reportOneList:this.reportOneList,
              reportTwoList:this.reportTwoList,
              reportThreeList:this.reportThreeList,
            } //props
          },
          area: ["350px", "200px"],
          title: "批量修改常报",
          shadeClose: false,
          shade: true, //是否显示遮罩
          zIndex: 198911100,
          cancel: () => {
            //关闭事件
            this.currentPage = "";
          }
        });
      } else {
        this.myAlert("请勾选要修改的任务！", "dangerous-icon");
      }
    },
    confirmation(val) {
      let _this = this;
      let select = _this.multipleSelection.toString();
      console.log(select);
      if (select) {
        if(val==1||val==3){
          _this.myConfirm('确定将选中的任务修改为【已申请】吗?', "dangerous-icon", "确认", "取消")
          .then(res => {
            _this.changestatefunc(val);
          })
          .catch(err => {});
        };
        if(val==2){
          _this.myConfirm('确定将选中的任务修改为【已确认】吗?', "dangerous-icon", "确认", "取消")
          .then(res => {
            _this.changestatefunc(val);
          })
          .catch(err => {});
        };
        if(val==4){
          _this.myConfirm('确定将选中的任务修改为【已完成】吗?', "dangerous-icon", "确认", "取消")
          .then(res => {
            _this.changestatefunc(val);
          })
          .catch(err => {});
        }
      } else {
        _this.myAlert("请勾选要修改的任务！", "dangerous-icon");
      }
    },
    changestatefunc(val){
      let _this = this;
      _this.$layer.loading({
        shade: true
      });
      let form = {
        taskList:JSON.stringify(_this.taskList),
        type:val
      }
      batchUpdateInsuranceTask(form).then(function(response) {
        _this.$layer.closeAll('loading');
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.myAlert("批量修改成功!", "success-icon")
          .then(res => {
            _this.getTableData();
          })
          .catch(err => {});

        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    stues() {
      for (var i = 0; this.stateParam.length > i; i++) {
        if (
          this.stateParam[i].name == "正式离职" &&
          this.stateParam[i].select == true
        ) {
          this.lizhi1 = 1;
        } else {
          this.lizhi1 = 0;
        }
      }
    },
    
    searchConteactDataList() {
      this.currentNum = 0;
      this.getTableData();
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
        export_json_to_excel(tHeader, data, "任务明细");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    deletedTask() {
      let _this = this;
      let select = this.multipleSelection.toString();
      if (select) {
        _this
          .myConfirm(
            "确定要将选定的任务放入回收站吗?",
            "dangerous-icon",
            "确认",
            "取消",
            "",
            "my-message"
          )
          .then(res => {
            _this.deletedDataTask();
          })
          .catch(err => {});
      } else {
        this.myAlert("请勾选要删除的任务!", "dangerous-icon");
      }
    },
    //删除数组中指定元素
    deletArrByValue(arr,id){
      return arr.filter(function(item){return item.id != id })
    },
    deletedDataTask() {
      let _this = this;
      let ids = this.multipleSelection.toString();
      let select = {
        ids,
        deleted: 1
      };
      _this.$layer.loading({
        shade: true //是否显示遮罩
      });
      delTask(select).then(function(response) {
        _this.$layer.closeAll('loading');
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
            })
            .catch(err => {});
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    //自选列
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
    showSearch() {
      let rent = document.getElementById("follow-container");
      if (this.upAndDown == 1) {
        this.upAndDown = 2;

        rent.getElementsByClassName("content")[0].style.height = "calc(100% - 87px)";
        document.getElementById("searchContent2").style.display = "none";
      } else {
        this.upAndDown = 1;
        rent.getElementsByClassName("content")[0].style.height = "calc(100% - 117px)";
        document.getElementById("searchContent2").style.display = "block";
      }
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
    
    findStreetByTown() {},

    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
      if(row.finishState=='已完成'){
        return 'CompletedbackgroundColor';
      };
      if(row.finishState=='已暂停'){
        return 'PausedbackgroundColor';
      };
      if(row.finishState=='已失败'){
        return 'FailedbackgroundColor';
      };
      if(row.taskState=='已确认'){
        return 'ConfirmedbackgroundColor';
      };
      if(row.state=='正式离职'){
        return 'OfficialRresignationColor';
      };
      
      
    },
    getRowDataByClick(row, column, event) {
      let _this = this;
      _this.currentNum = row.index + 1;
      _this.currentPage = row;
    },
    clearForm() {
      let _this = this;
      _this.mounths = _this.backSlect(_this.mounths);
      _this.executorList = _this.backSlect(_this.executorList);
      _this.userParams = _this.backSlect(_this.userParams);
      _this.finishStates = _this.backSlect(_this.finishStates);
      _this.reportOneList = _this.backSlect(_this.reportOneList);
      _this.reportTwoList = _this.backSlect(_this.reportTwoList);
      _this.reportThreeList = _this.backSlect(_this.reportThreeList);
      _this.taskTypeOneList = _this.backSlect(_this.taskTypeOneList);
      _this.taskTypeTwoList = _this.backSlect(_this.taskTypeTwoList);
      _this.taskTypeThreeList = _this.backSlect(_this.taskTypeThreeList);
      _this.staffList = _this.backSlect(_this.staffList);
      _this.stateParam = _this.backSlect(_this.stateParam);
      _this.userParams1 = _this.backSlect(_this.userParams1);
      _this.userParams2 = _this.backSlect(_this.userParams2);
      _this.taskStateList = _this.backSlect(_this.taskStateList);
      _this.form.taskYear1 =  _this.mytaskYear1;
      _this.form.taskYear2 =  _this.mytaskYear1;
      _this.form.taskMonth1 = _this.mytaskMonth1;
      _this.form.taskMonth2 = _this.mytaskMonth1;
      _this.form.word = "";
    },
    //全选
    handleSelectionChange(elemCheckbox) {
      let _this = this;
      //获取用户的选中
      _this.multipleSelection = [];
      _this.taskList = [];
      elemCheckbox.forEach(item => {
        _this.multipleSelection.push(item.id);
        _this.taskList.push({
          id:item.id,
          userId:item.userId,
          taskState:item.taskState
        });
      });
      _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      _this.taskList = Array.from(new Set(_this.taskList));
    },
    getSelectIdByList(list) {
      let arr = [];
      list.forEach(function(item) {
        if (item.select) {
          arr.push(item.id);
        }
      });
      return arr.toString();
    },
    filterData() {
      let select = this.multipleSelection.toString();
      if (select) {
        let arr = [];
        console.log(this.tableData);
        this.tableData.forEach(function(item) {
          if (select.indexOf(item.id) != -1) {
            arr.push(item);
          }
        });
        this.currentNum = 0;
        this.tableData = arr;
      }else{
        this.myAlert('请选择需要过滤的数据!','dangerous-icon');
      }
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
    tabRemove(targetName) {
      // 首页不可删除
      if (targetName == "/") {
        return;
      }
      this.$store.commit("delete_tabs", targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit(
            "set_active_index",
            this.options[this.options.length - 1].path
          );
          this.$router.push({ path: this.activeIndex });
        } else {
          this.$router.push({ path: "/home/" });
        }
      }
    },
    finalCellStyle({row, column, rowIndex, columnIndex}){
      if(column.label=='执行人'||column.label=='任务概念'){
        return 'myselfstyle'
      };
    },
    cellStyle({row, column, rowIndex, columnIndex}){
      if(column.label=='执行人'||column.label=='任务概念'){
        return {'line-height':this.rowHeight};
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
      getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "任务修改 【" + _this.tableData[mycountnum].taskTime + '&nbsp;&nbsp;&nbsp;&nbsp;' + _this.tableData[mycountnum].user + "】";
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
  mounted() {
    
    this.reloadListByStorage();
    this.shadenum();
    this.getParamsData();
  },
  computed: {
    options() {
      return this.$store.state.options;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

    /deep/ .el-table .CompletedbackgroundColor {
      background-color: #d4f2d5 !important;
    }
    /deep/ .el-table .PausedbackgroundColor {
      background-color: #fff5f3 !important;
    }
    /deep/ .el-table .FailedbackgroundColor {
      background-color: #ebf3f6 !important;
    }
    /deep/ .el-table .ConfirmedbackgroundColor {
      background: #dddddd !important;
    }
    /deep/ .el-table .OfficialRresignationColor {
      color: #999999 !important;
    }
    
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

.rent-container {
  font-size: 12px;
  height: 100%;
  .padding-l-15 {
    padding-left: 15px;
  }
  .padding-l-10 {
    padding-left: 10px;
  }
  .padding-l-5 {
    padding-left: 5px;
  }
  .padding-l-2 {
    padding-left: 2px;
  }
  .cut-icon {
    background: url(../../../images/system/fenge.png) -100px -90px;
    width: 3px;
    height: 23px;
    display: block;
  }
  .leading-out-icon {
    background: url(../../../images/icon.png) -126px -118px;
    width: 20px;
    height: 20px;
    display: block;
  }
  .print-out-icon {
    background: url(../../../images/system/daochu.png) -15px -15px;
    width: 20px;
    height: 20px;
    display: block;
  }

  .print-out-icon:hover,
  .leading-out-icon:hover {
    border: 1px solid #828382;
  }
  .back-icon {
    background: url(../../../images/system/tuichu.png) -15px -15px;
    width: 20px;
    height: 20px;
    display: inline-block;
  }
  .des-word {
    line-height: 30px;
    height: 30px;
    display: inline-block;
  }
  /deep/ .content {
    height: calc(100% - 117px);
    width: 100%;
    .list-content {
      width: calc(100% - 20px);
      height: 100%;
      margin: 5px auto 0px;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png") 2 repeat;
      border-radius: 5px;
    }
    .el-table{
      height: 100%!important;
    }
  }
}
</style>
<style lang="scss">
.el-table th.gutter {
  display: none !important;
}
</style>
