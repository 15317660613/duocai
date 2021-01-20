<template>
  <div id="attend-container" class="rent-container attend-container mycontailerclass1">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear">
          <div class="left padding-l-10" @click="newAttend" style="cursor:pointer;">
            <div class="border-icon clear" > 
              <i class="fa fa-plus add"></i>
              <span>新增</span>
            </div>  
          </div>
          <div class="left padding-l-10" @click="deletedAttend" style="cursor:pointer;">
            <div class="border-icon clear" > 
              <i class="fa fa-times delete" style="color:#FF0000;"></i>
              <span>删除</span>
            </div>  
          </div>
          <div class="left padding-l-10" @click="filterData" style="cursor:pointer;">
            <div class="border-icon clear" > 
              <i class="filterchoose-icon" title="过滤选中"></i>
            </div> 
          </div>
          <div class="left padding-l-5">
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10">
            <div class="border-icon clear" > 
              <i class="cut-column-icon"></i>
            </div>  
          </div>
          <div class="left padding-l-10">
            <div class="border-icon clear" > 
              <i class="leading-out-icon" title="自选列" @click="clickColumn"></i>
            </div>  
          </div>
          <div type="primary" class="padding-l-10 left padding-t-2" @click="exportToExcel">
            <div class="border-icon clear" > 
              <i class="print-out-icon" title="导出"></i>
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
              <i class="back-icon user left" @click="tabRemove('/home/attendance')"></i>
            </div>

          </div>
        </div>
      </div>

      <div class="search-container" >
        <el-form ref="formsData" :model="form">
          <div class="clear" id="searchContent1">
            <div class="left padding-l-15">
              <span class="des-word">年月</span>
            </div>
            <div class="left">
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="timeStart">
                  <el-date-picker
                    type="month"
                    value-format="yyyy-MM"
                    v-model="form.timeStart"
                    style="width: 75px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="timeEnd">
                  <el-date-picker
                    type="month"
                    value-format="yyyy-MM"
                    v-model="form.timeEnd"
                    style="width: 75px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
           
            <div class="left" style="padding-left: 15px;">
              <span class="des-word">项目</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="addentObjectId">
                <CheckSelectSpecial
                  :selectId="addentObjectId"
                  :listData="addentObjectList"
                  style="width:90px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">
              <span class="des-word">人力状态</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="stateUser1">
                <CheckSelectSpecial
                  @findStreetByTown="finUserState"
                  :selectId="stateUser1"
                  :listData="stateParam"
                  style="width:80px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="stateUser2">
                <CheckSelectSpecial
                  :selectId="stateUser2"
                  :listData="userParams1"
                  style="width:80px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="stateUser3">
                <CheckSelectSpecial
                  :selectId="stateUser3"
                  :listData="userParams2"
                  style="width:80px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            
            <div class="left" style="padding-left: 15px;" >
              <span class="des-word">职位</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="staff">
                <CheckSelectSpecial :selectId="staff" :listData="staffList" style="width:90px;"></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">
              <span class="des-word">考勤人</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="executorId">
                <CheckSelectSpecial
                  @findStreetByTown="finUserState"
                  :selectId="executorId"
                  :listData="executorList"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="departId">
                <CheckSelectSpecial
                  :selectId="departId"
                  :listData="userParams"
                  style="width:80px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">
              <el-form-item prop="word" label-width="0">
                <el-input
                  v-model.trim="form.word"
                  title="姓名/考勤备注"
                  maxlength="30"
                  style="width:150px;"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-2" style="padding-top:1px;">
              <i @click="searchAttendDataList" class="search-btn" style="cursor:pointer;">查询</i>
            </div>
            <div class="left" style="padding-top:2px;">
              <i class="claerlys" @click="clearForm"></i>
            </div>
            <div class="left" style="margin-top:5px;">
              
            </div>
          </div>
          <div class="clear" id="searchContent2">
           
           
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear" style="height:calc(100% - 88px)" >
      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :cell-class-name="rowClass"
          :row-height="rowHeight"
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
                <div
                 
                  :style="{'color':scope.row.state =='正式离职' ? '#999' :'#336699','text-algin':'center','cursor':'pointer','z-index': '333','font-weight': 'bold','position':'relative','height':'25px'}"
                  
                >
                  <div v-if="scope.row.jobTime1 != ''" class="left-content" >
                    <span class="left-l-div" >
                    <span class="word-span-1" style="float: left;display:inline-block;">{{scope.row.jobTime1}}</span>
                    </span>
                    <span class="right-l-div" >
                    <span class="word-span" style="float: left;display:inline-block;">{{scope.row.jobTime2}}</span>
                    </span>
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

                  <span style="position:absolute;left:19px;top:3px;font-weight:700;" @click="editorAttend(scope.$index, scope.row)" >{{scope.row.user}}</span> 
                  <div v-if="scope.row.stopTime1 != ''" class="right-content-specail" >
                    <span class="left-r-div" >
                      <span class="word-r-span-1" style="float: left;display:inline-block;">{{scope.row.stopTime1}}</span>
                    </span>
                    <span class="right-r-div" >
                      <span class="word-r-span" style="float: left;display:inline-block;">{{scope.row.stopTime2}}</span>
                    </span>
                  </div>
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
            >
              <template slot="header">
                <span style="color: #999;transform: scale(0.8);display: inline-block;">(当时)</span>
                <span>{{item.label}}</span>
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
            >
              <template slot-scope="scope">
                <div>{{scope.row.state}}-{{scope.row.state2}}</div>
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
               :show-overflow-tooltip="true"
            >
             
              <template slot-scope="scope" style="height: 100%;">
                <div style="position:relative;" >
                  <div  style="text-algin:center;"  >
                    {{ scope.row[item.prop] }}
                  </div>
                  <div v-if="scope.row[item.prop] && item.prop.indexOf('号') != -1 && scope.row[item.prop].indexOf('正') ==  -1" class="" style="position:absolute;right:-5px;bottom:-2px;">
                    <i v-if="scope.row[item.prop] != null &&  scope.row[item.prop] != '--'" class="blue-icon"  @click="showAngle(scope.$index, scope.row,item.prop)"  ></i>
                  </div>
                </div>  
              </template>
            </PlTableColumn>
          </template>
        </PlTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import CheckSelectSpecial from "../../../components/checkSpecial";
import { PlTable, PlTableColumn } from "pl-table";
import {quickDate} from '../../../utils/getQuickDate'
import {orgnizetionParam} from '../../../utils/orgnizeparam'
import { attendParam } from "../..//../utils/attendParam";
import ColumPage from "../../../components/column";
import {
  getattendParams,
  getattendList,
  delAttend
} from "../../../service/attendData";
import { findUserByDepartId } from "../../../service/organizeDate";
import NewAttendPage from "./newAttendPage";
import DetailAttendPage from "./detailAttendPage";
import EveryAttendPage from "./everyAttendance";
export default {
  data() {
    return {
      currentNum: 0,
      tableData: [],
      columnData: attendParam.attendList,
      newAttendValue: false,
      addentObjectId: "addentObjectId",
      stateUser1: "stateUser1",
      stateUser2: "stateUser2",
      stateUser3: "stateUser3",
      executorId: "executorId",
      staff: "staff",
      sessionStr:"attend-list",
      activeName: "single",
      departId: "departId",
      culumnTitle: "考勤明细",
      columnValue: false,
      rowHeight:27,
      currentNum: 0,
      multipleSelection: [],
      currentPage: [],
      staffList: [],
      executorList: [],
      userParams: [],
      stateParam: [],
      addentObjectList: [],
      upAndDown: 1,
      userParams1:orgnizetionParam.orgnizetionStateTwo,
      userParams2:orgnizetionParam.orgnizetionStateThree,
      initLeft:0,//初始化详情弹窗的增加 left
      initTop:0,//初始化详情弹窗的增加 top
      form: {
        timeStart: "",
        timeEnd: "",
        word: ""
      }
    };
  },
  components: {
    CheckSelectSpecial,
    PlTable,
    PlTableColumn,
    ColumPage,
    NewAttendPage,
    DetailAttendPage,
    EveryAttendPage
  },
  methods: {
    editorAttend(index,row){
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
      let attendId = row.id;
      let layerId = _this.$layer.iframe({
        content: {
          content: DetailAttendPage, //传递的组件对象
          parent: this,//当前的vue对象
          data:{activeName:'single',attendId:attendId,mythisindex:index}//props
        },
        area:['800px','560px'],
        title: "考勤修改 【" + row.user + '&nbsp;&nbsp;&nbsp;&nbsp;' + row.time + "】",
        shadeClose: false,
        shade: false,//是否显示遮罩
        zIndex:19891110,
        cancel:()=>{//关闭事件
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
    showAngle(index,row,title){
      let _this = this;
      let attendId = row.id;
      let test = _this.$layer.iframe({
        content: {
          content: EveryAttendPage, //传递的组件对象
          parent: this,//当前的vue对象
          data:{activeName:'single',attendId:attendId,title:title}//props
        },
        area:['350px','200px'],
        title: title,
        shadeClose: false,
        shade: true,//是否显示遮罩
        zIndex:19891110,
        cancel:()=>{//关闭事件
            
          }
        });
    },
    getAttendData() {
      let _this = this;
      //加载动画
      _this.$layer.loading({
        shade: true
      });
      let form = JSON.parse(JSON.stringify(_this.form));
      let staffList = this.getSelectIdByList(this.staffList);
      let executorList = this.getSelectIdByList(this.executorList);
      let userParams = this.getSelectIdByList(this.userParams);
      let addentObjectList = this.getSelectIdByList(this.addentObjectList);
      let state1=this.getSelectIdByList(this.stateParam)
      let state2=this.getSelectIdByList(this.userParams1)
      let state3=this.getSelectIdByList(this.userParams2)
      form.stateIds=state1.toString()
      form.stateIds2=state2.toString()
      form.stateIds3=state3.toString()
      form.paramIds = addentObjectList.toString();
      form.departIds = executorList.toString();
      form.userIds = userParams.toString();
      form.staffId = staffList.toString();
      if(form.timeStart==null){
        form.timeStart = '';
      };
      if(form.timeEnd==null){
        form.timeEnd = '';
      };
      getattendList(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.tableData = response.data.list;
          _this.$nextTick(function () {
            let attend = document.getElementById("attend-container");
             attend.getElementsByClassName("el-table")[0].style.height="calc(100vh - 120px)";
          })
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
        _this.currentNum = 0;
      });
    },
    changeModifyData(id){
      let _this = this;
      let form = {id};
      //加载动画
      _this.$layer.loading({
        shade: true
      });
      getattendList(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data.list;
          let currentData = _this.tableData;
          let arr = [];
          currentData.forEach(function(item){
            if(item.id == data[0].id){
              arr.push(data[0]);
            }else{
              arr.push(item);
            }
          })
          _this.tableData = arr;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
        _this.currentNum = 0;
      });
    },
    getsaff() {
      staffList().then(res => {
        if (res.status == 500) {
          return false;
        } else if (res.status == 0) {
          let data = res.data;
          let arr = [{ id: "-1", name: "全部", select: true }];
          for (let i = 0; i < data.length; i++) {
            arr.push({
              id: data[i].id,
              name: data[i].name,
              select: data[i].select
            });
          }
          this.staffList = arr;
        } else if (res.data == 1) {
          let message = response.msg;
          this.myAlert(message + "！");
        }
      });
    },
    getParams() {
      let _this = this;
      //加载动画
      _this.$layer.loading({
        shade: true
      });
      getattendParams().then(res => {
         _this.$layer.closeAll("loading");
        if (res.status === 500) {
          return false;
        } else if (res.status === 0) {
          let data = res.data;
          let time = quickDate.getTwoDateByDay(5);
          let startTime = time.startTime ;
          let endTime =  time.endTime;
          if(startTime){
            startTime = startTime.substring(0,7);
          }
           if(endTime){
            endTime = endTime.substring(0,7);
          }
          this.form.timeStart = endTime;
          this.form.timeEnd = endTime;
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
            this.executorList = arr;
          }
          this.userParams=[{ id: "-1", name: "全部", select: true }];
          let stt2 = this.userParams1;
          if (stt2 && stt2.length != 0) {
            let arr1 = [{ id: "-1", name: "全部", select: true }];
            for (let i = 0; i < stt2.length; i++) {
              arr1.push({
                id: stt2[i].id,
                name: stt2[i].name.replace(/&nbsp;/g, ""),
                select: stt2[i].select
              });
            }
            this.userParams1 = arr1;
          }
          let stt3 = this.userParams2;
          if (stt3 && stt3.length != 0) {
            let arr2 = [{ id: "-1", name: "全部", select: true }];
            for (let i = 0; i < stt3.length; i++) {
              arr2.push({
                id: stt3[i].id,
                name: stt3[i].name.replace(/&nbsp;/g, ""),
                select: stt3[i].select
              });
            }
            this.userParams2 = arr2;
          }
          if (data.paramIdParams) {
            let addentObject = data.paramIdParams;
            let arr = [{ id: "-1", name: "全部", select: true }];
            addentObject.forEach(item => {
              arr.push({
                id: item.id,
                name: item.name,
                select: item.select
              });
            });
            this.addentObjectList = arr;
          }
          if (data.userStateIdParams) {
            let userState = data.userStateIdParams;
            let arr = [{ id: "-1", name: "全部", select: true }];
            userState.forEach(item => {
              if(item.name == '常态在职' ||  item.name == '薪假在职' ||  item.name == '停薪在职' ||  item.name == '申离在职' ||  item.name == '正式离职'){
                let obj ={ 
                  id: item.id,
                  name: item.name,
                  select: item.select,
                  state: item.state
                };
                arr.push(obj);
              }  
            });
            this.stateParam = arr;
          }
          let staffIdParams = data.staffIdParams;
          let staffArr = [{ id: "-1", name: "全部", select: true }];
          staffIdParams.forEach(item => {
            staffArr.push({
                id:item.id,
                name:item.label,
                select:false,
            })
          })
          _this.staffList = staffArr;
          this.getAttendData();
        } else if (res.status == 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      });
    },
    rowClass({ row, index }) {
      let className = "";
       if(row.state == '正式离职'){
          className += " leave-user ";
        }
      if (row.id == this.currentPage.id) {
        className += "page-check";
      }
      return className;
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    getRowDataByClick(row, column, event) {
      let _this = this;
      _this.currentNum = row.index + 1;
      _this.currentPage = row;
    },
    handleSelectionChange(elemCheckbox) {
      let _this = this;
      //获取用户的选中
      _this.multipleSelection = [];
      elemCheckbox.forEach(item => {
        _this.multipleSelection.push(item.id);
      });
      _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
    },
    clearForm() {
      debugger;
      let time = quickDate.getTwoDateByDay(5);
      let startTime = time.startTime ;
      let endTime =  time.endTime;
      if(startTime){
        startTime = startTime.substring(0,7);
      }
        if(endTime){
        endTime = endTime.substring(0,7);
      }
      this.form.timeStart = endTime;
      this.form.timeEnd = endTime;
      this.addentObjectList=this.backSlect(this.addentObjectList)
      this.staffList=this.backSlect(this.staffList)
      this.executorList=this.backSlect(this.executorList)
      this.userParams=this.backSlect(this.userParams)
      this.stateParam=this.backSlect(this.stateParam)
      this.userParams1=this.backSlect(this.userParams1)
      this.userParams2=this.backSlect(this.userParams2)
      this.userParams=this.backSlect(this.userParams)
      this.form.word = '';
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
    showSearch() {
      let rent = document.getElementById("follow-container");
      if (this.upAndDown == 1) {
        this.upAndDown = 2;

        rent.getElementsByClassName("content")[0].style.height =
          "calc(100% - 70px)";
        rent.getElementsByClassName("el-table")[0].style.height =
          "calc(100% - 70px)";
        document.getElementById("searchContent2").style.display = "none";
      } else {
        this.upAndDown = 1;
        rent.getElementsByClassName("content")[0].style.height =
          "calc(100% - 150px)";
        rent.getElementsByClassName("el-table")[0].style.height =
          "calc(100% - 150px)";
        document.getElementById("searchContent2").style.display = "block";
      }
    },
    searchAttendDataList() {
      this.getAttendData();
    },
    finUserState() {
      let _this = this;
      let id = this.getSelectIdByList(_this.executorList);
      if (id) {
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let user = data.user;
            let arr = [{ id: "-1", name: "全部", select: true }];
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
        });
      }
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
    newAttend() {
      let _this = this;
      let layerId = _this.$layer.iframe({
        content: {
          content: NewAttendPage, //传递的组件对象
          parent: this,//当前的vue对象
          data:{activeName:'single'}//props
        },
        type: 1,
        shade: false,
        area:['800px','560px'],
        title: "新增考勤",
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
    deletedAttend() {
      let _this = this;
      let select = this.multipleSelection.toString();
      if (select) {
        _this
          .myConfirm(
            "警告：考勤删除后不能还原",
            "dangerous-icon",
            "确认",
            "取消",
            "确定要永久删除选定的考勤吗？",
            "my-message"
          )
          .then(res => {
            _this.deletedDataAttend();
          })
          .catch(err => {});
      } else {
        this.myAlert("请勾选要删除的考勤!", "dangerous-icon");
      }
    },
    deletedDataAttend() {
      let _this = this;
      let id = this.multipleSelection.toString();
      let select = {
        id,
        deleted: 1
      };
      delAttend(select).then(function(response) {
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
            }).catch(err => {});
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
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
        export_json_to_excel(tHeader, data, "考勤明细列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    filterData() {
      let select = this.multipleSelection.toString();
      if (select) {
        let arr = [];
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
    //删除删除数组中指定元素
    deletArrByValue(arr,id){
      return arr.filter(function(item){return item.id != id })
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
      getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "考勤修改 【" + _this.tableData[mycountnum].user + '&nbsp;&nbsp;&nbsp;&nbsp;' + _this.tableData[mycountnum].time + "】";
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
  mounted() {
    this.reloadListByStorage();
    this.shadenum();
    this.getParams();
   
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
  .cut-icon {
    background: url(../../../images/system/fenge.png) -100px -90px;
    width: 3px;
    height: 23px;
    display: block;
  }
  .search-container /deep/ .el-input__prefix {
    /*left: 51px;*/
  }
  .content {
    
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
  }
  .right-content-specail{
      background:url(../../../images/right-icon.png) no-repeat;
      position: absolute;
      width:27px;
      height:25px;
      right:-5px;
      top:0px;
    }
   .left-content{
      background:url(../../../images/left-icon.png) no-repeat;
      position: absolute;
      width:27px;
      height:25px;
      left:-5px;
      top:0px;
    }
    .left-r-div{
    transform: rotate(308deg);
    display: inline-block;
    left: -10px;
    top: 4px;
    position: absolute;
      
    }
    .right-r-div{
     
    transform: rotate(311deg);
    display: inline-block;
    left:  -3px;
    top: 8px;
    position: absolute;
      
    }
    .left-l-div{
     
    transform: rotate(-51deg);
    display: inline-block;
    left: -12px;
    top: 3px;
    position: absolute;
    }
    .right-l-div{
     
    transform: rotate(-55deg);
    display: inline-block;
    left: -18px;
    top: -3px;
    position: absolute;
    width: 48px;
    display: inline-block;
      
    }
    .word-span-1{
        font-weight: 700;
       width: 50px;
      display:inline-block;
      color: #227643;
      transform: scale(0.4);
      -webkit-transform: scale(0.4);
      height: 20px;
      font-size: 20px;
    }
    .word-span{
        font-weight: 700;
       width: 48px;
      display:inline-block;
      color: #227643;
      transform: scale(0.5);
      -webkit-transform: scale(0.5);
      height: 20px;
      font-size: 20px;
    }
    .word-r-span-1{
        font-weight: 700;
       width: 50px;
      display:inline-block;
      color: #C66C6D;
      transform: scale(0.4);
      -webkit-transform: scale(0.4);
      height: 20px;
      font-size: 20px;
    }
    .word-r-span{
        font-weight: 700;
      width: 48px;
      color: #C66C6D;
      transform: scale(0.5);
      -webkit-transform: scale(0.5);
      height: 20px;
      font-size: 20px;
    }
    .right-l-div-w {
      transform: rotate(-45deg);
      display: inline-block;
      left: -18px;
      top: -4px;
      position: absolute;
      width: 48px;
      display: inline-block;
    }
    .right-r-div-w{
      transform: rotate(307deg);
      display: inline-block;
      left: -4px;
      top: 9px;
      position: absolute;
    }
    .delisting{width:22px;height:22px;display:inline-block;background:url(../../../images/icon2.png) -347px -95px no-repeat;}
    .payoff{width:22px;height:22px;display:inline-block;background:url(../../../images/icon2.png) -302px -95px no-repeat;}
    .force{width:22px;height:22px;display:inline-block;background:url(../../../images/icon2.png) -261px -95px no-repeat;}
  
}

</style>
