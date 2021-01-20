<template>
  <div id="follow-container" class="rent-container mycontailerclass1">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear">
          
          <div class="left" @click="newReward" style="cursor:pointer;padding-left: 5px;">
            <div class="border-icon clear" > 
              <i class="fa add-icon left"></i>
              <span>新增</span>
            </div>  
          </div>
         
          <div class="left padding-l-10" @click="deletedReward" style="cursor:pointer;">
            <div class="border-icon clear" > 
              <i class="fa delete-icon left" style="color:#FF0000;"></i>
              <span left>删除</span>
            </div>
          </div>
          
          <div class="left padding-l-10" style="cursor:pointer;">
            <div class="border-icon clear" > 
              <i class="filterchoose-icon" title="过滤选中" @click="filterData" ></i>
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
              <i class="back-icon user left" @click="tabRemove('/home/rewardPunish')"></i>
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
                <el-form-item>
                  <el-date-picker
                    size="mini"
                    type="month"
                    :default-value="form.timeStart"
                    v-model="form.timeStart"
                    value-format="yyyy-MM"
                    style="width: 80px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item>
                  <el-date-picker
                    size="mini"
                    type="month"
                    :default-value="form.timeEnd"
                    value-format="yyyy-MM"
                    v-model="form.timeEnd"
                    style="width: 80px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="left" style="padding-left:15px">
              <span class="des-word">类型</span>
            </div>
            <div class="left">
              <el-form-item label label-width>
                <el-select    style="width:80px;"  v-model="typeParamsdefault" @change='rewardTypefunc'>
                  <el-option v-for="item in typeParams" :label="item.name" :value="item.id"  style="width: 80px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
             <div class="left">
              <el-form-item label label-width="0" prop="typeParam">
                <CheckSelectSpecial
                  :selectId="typeParam"
                  :listData="typeList"
                  style="width:80px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">
              <span class="des-word">人力状态</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="stateUser1">
                <CheckSelectSpecial
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

            <div class="left" style="padding-left:15px">
              <span class="des-word">职位</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="staff">
                <CheckSelectSpecial :selectId="staff" :listData="staffList" style="width:80px;"></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left" style="padding-left: 15px;">
              <span class="des-word">奖罚人</span>
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
                  :listData="departParams"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 15px;">
              <el-form-item prop="word" label-width="0">
                <el-input
                  v-model.trim="form.word"
                  title="姓名/奖罚备注"
                  maxlength="30"
                  style="width:150px;"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-5" style="padding-top:2px;">
              <i @click="searchConteactDataList" class="search-btn" style="cursor:pointer;">查询</i>
            </div>
            <div class="left" style="padding-top:3px;">
              <i class="claerlys" @click="clearForm"></i>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear mycontent">
      <div class="list-content">
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :cell-class-name="finalCellStyle"
          :cell-style="cellStyle"
          :row-height="rowHeight"
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
            >
              <template slot="header">
                  <span style="color: #999;transform: scale(0.8);display: inline-block;">(当时)</span>
                  <span>{{item.label}}</span>
              </template>
              <template slot-scope="scope" style="height: 100%;">
                <div style="position: absolute;top: 50%;margin-top: -6px;width: 100%;">
                  <div class="findparentclass" style="text-algin:center;cursor:pointer;z-index: 333;color:#336699;font-weight: bold;" @click="editorReward(scope.$index, scope.row)" >
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
              v-else-if="item.prop == 'punishNum'"
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
                <div v-if="scope.row.type">
                  <div v-if="scope.row.type.indexOf('奖补')!=-1" style="color:#009933;">
                    +{{ scope.row.punishNum }}
                  </div>
                  <div v-if="scope.row.type.indexOf('扣款')!=-1" style="color:#CC3300;">
                    -{{ scope.row.punishNum }}
                  </div>
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
            >
              <template slot-scope="scope">
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
            >
              <template slot="header" >
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
            ></PlTableColumn>
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
import { rewardParam } from "../..//../utils/rewardParam";
import ColumPage from "../../../components/column";
import {
  rewardList,
  rewardgetparams,
  rewardDel
} from "../../../service/rewardData";
import { staffList } from "../../../service/testDetailData";
import {findUserByDepartId} from "../../../service/organizeDate";
import NewRewardPage from "./newReward";
import DetailRewardPage from "./detailReward";
import {quickDate} from '../../../utils/getQuickDate';
import { orgnizetionParam } from "../../../utils/orgnizeparam";
export default {
  data() {
    return {
      currentNum: 0,
      tableData: [],
      columnData: rewardParam.rewardList,
      newRewardValue: false,
      addentObjectId: "addentObjectId",
      stateUser1: "stateUser1",
      stateUser2: "stateUser2",
      stateUser3: "stateUser3",
      executorId: "executorId",
      staff: "staff",
      sessionStr:"reward-list",
      activeName: "single",
      departId: "departId",
      rewardType:"rewardType",
      typeParam:"typeParam",
      typeList:[],
      typeListAll:[],
      culumnTitle: "奖罚明细",
      columnValue: false,
      rowHeight:27,
      multipleSelection: [],
      currentPage: [],
      staffList: [],
      executorList: [],
      departParams: [],
      typeParams:[],
      typeParamsdefault:'',
      stateParam: [],
      upAndDown: 1,
      userParams1: orgnizetionParam.orgnizetionStateTwo,
      userParams2: orgnizetionParam.orgnizetionStateThree,
      form: {
        timeStart: "",
        timeEnd: "",
        word: ""
      },
      initLeft:0,//初始化详情弹窗的增加 left
      initTop:0,//初始化详情弹窗的增加 top
    };
  },
  components: {
    CheckSelectSpecial,
    PlTable,
    PlTableColumn,
    ColumPage,
    NewRewardPage,
    DetailRewardPage
  },
  methods: {
    getParams() {
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      rewardgetparams().then(res => {
        this.$layer.closeAll("loading");
        if (res.status === 500) {
          return false;
        } else if (res.status === 0) {
          this.getQuickDate(20);
          let data = res.data;
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
          this.departParams=[{ id: "-1", name: "全部", select: true }];
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
          if (data.typeParams) {
            let typeParams = data.typeParams;
            let arr = [{ id: "-1", name: "全部", select: true }];
            typeParams.forEach(item => {
              arr.push({
                id: item.id,
                name: item.name.replace(/&nbsp;/g, ""),
                select: item.select
              });
              if(item.children){
                item.children.forEach(ii=>{
                  this.typeListAll.push({
                    id: ii.id,
                    parentId:item.id,
                    name: ii.name.replace(/&nbsp;/g, ""),
                    select: false
                  })
                })
                
              }
            });
            this.typeParams = arr;
            this.typeParamsdefault = '-1';
            this.typeList = [{ id: "-1", name: "全部", select: true }];
          }else{
            this.typeParams = [{ id: "-1", name: "全部", select: true }];
            this.typeList = [{ id: "-1", name: "全部", select: true }];
          }

          if (data.userStateIdParams) {
            let userState = data.userStateIdParams;
            let arr = [{ id: "-1", name: "全部", select: true }];
            userState.forEach(item => {
              if(item.name=='常态在职'||item.name=='薪假在职'||item.name=='停薪在职'||item.name=='申离在职'||item.name=='正式离职'){
                arr.push({
                  id: item.id,
                  name: item.name,
                  select: item.select
                });
              }
            });
            this.stateParam = arr;
          }
          if(data.staffIdParams){
            let arr2 = [{ id: "-1", name: "全部", select: true }];
            data.staffIdParams.forEach(item=>{
              arr2.push({
                id: item.id,
                name: item.label.replace(/&nbsp;/g, ""),
                select: false
              });
            })
            this.staffList = arr2;
          }
          this.getTableData();
        } else if (res.status == 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      });
    },
    getTableData() {
      let _this = this;
      
      let form = JSON.parse(JSON.stringify(_this.form));
      let staffList = this.getSelectIdByList(this.staffList);
      let executorList = this.getSelectIdByList(this.executorList);
      let departParams = this.getSelectIdByList(this.departParams);
      let state1=this.getSelectIdByList(this.stateParam)
      let state2=this.getSelectIdByList(this.userParams1)
      let state3=this.getSelectIdByList(this.userParams2)
      let typeParam=this.getSelectIdByList(this.typeList);
      form.stateIds=state1.toString()
      form.stateIds2=state2.toString()
      form.stateIds3=state3.toString()
      form.type = this.typeParamsdefault;
      form.departIds = executorList.toString();
      form.userIds = departParams.toString();
      form.staffId = staffList.toString();
      form.typeParam = typeParam.toString();
      if(form.timeStart==null||form.timeStart=="null"){
        form.timeStart="";
      };
      if(form.timeEnd==null||form.timeEnd=="null"){
        form.timeEnd="";
      };
      //加载动画
      _this.$layer.loading({
        shade: true
      });
      rewardList(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          console.log('dsaada');
          _this.tableData = response.data.list;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
        _this.currentNum = 0;
      });
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
    newReward() {
      let _this = this;
      let layerId = _this.$layer.iframe({
        content: {
          content: NewRewardPage, //传递的组件对象
          parent: _this,//当前的vue对象
          data:{}//props
        },
        area:['800px','560px'],
        title: "新增奖罚",
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
    editorReward(index,row){
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
          content: DetailRewardPage, //传递的组件对象
          parent: _this,//当前的vue对象
          data:{myid:row.id,mythisindex:index}//props
        },
        area:['600px','400px'],
        title: "奖罚修改 【"+row.user+'&nbsp;&nbsp;&nbsp;&nbsp;'+row.time+"】",
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
    //自选列
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
    finalCellStyle({row, column, rowIndex, columnIndex}){
      if(row.state == "正式离职"&&column.label=='奖罚人员'){
        return 'specialstyle'
      }
      if(row.state == "正式离职"){
        return 'usertdstyle'
      };
      if(column.label=='奖罚人员'){
        return 'myselfstyle'
      };
    },
    cellStyle({row, column, rowIndex, columnIndex}){
      if(column.label=='奖罚人员'){
        return {'line-height':this.rowHeight};
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    getRowDataByClick(row, column, event) {
      let _this = this;
      console.log(_this.tableData);
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
      this.getQuickDate(20);
      this.typeParamsdefault = '-1';
      this.typeList = [{ id: "-1", name: "全部", select: true }];
      this.staffList=this.backSlect(this.staffList)
      this.executorList=this.backSlect(this.executorList)
      this.departParams=this.backSlect(this.departParams)
      this.stateParam=this.backSlect(this.stateParam)
      this.userParams1=this.backSlect(this.userParams1)
      this.userParams2=this.backSlect(this.userParams2)
      this.departParams=this.backSlect(this.departParams)
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
    searchConteactDataList() {
      this.currentNum = 0;
      this.getTableData();
    },
    finUserState() {
      let _this = this;
      let id = this.getSelectIdByList(_this.executorList);
      if (id) {
        _this.$layer.loading({
          shade:true
        });
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function(response) {
          _this.$layer.closeAll('loading');
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
        });
      }
    },
    rewardTypefunc(val){
      console.log(val);
      console.log(this.typeListAll);
      this.typeListAll.forEach(item=>{
        if(item.parentId==val){
          this.typeList.push({
            id:item.id,
            name:item.name.replace(/&nbsp;/g, ""),
            select:false
          })
        }
      })
      console.log(this.typeList);
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
    
    deletedReward() {
      let _this = this;
      let select = this.multipleSelection.toString();
      if (select) {
        _this
          .myConfirm(
            "警告：奖罚删除后不能还原",
            "dangerous-icon",
            "确认",
            "取消",
            "确定要永久删除选定的奖罚吗？",
            "my-message"
          )
          .then(res => {
            _this.deletedDataReward();
          })
          .catch(err => {});
      } else {
        this.myAlert("请勾选要删除的奖罚!", "dangerous-icon");
      }
    },
    //删除数组中指定元素
    deletArrByValue(arr,id){
      return arr.filter(function(item){return item.id != id })
    },
    deletedDataReward() {
      let _this = this;
      let id = this.multipleSelection.toString();
      let select = {
        id,
        deleted: 1
      };
      rewardDel(select).then(function(response) {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this
            .myAlert("删除成功!", "success-icon")
            .then(res => {
              // _this.getTableData();
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
        export_json_to_excel(tHeader, data, "奖罚明细");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    filterData() {
      let select = this.multipleSelection.toString();
      console.log(select)
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
      getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "奖罚修改 【"+_this.tableData[mycountnum].user+'&nbsp;&nbsp;&nbsp;&nbsp;'+_this.tableData[mycountnum].time+"】";
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
  /deep/ .mycontent .el-table,.el-table__expanded-cell {
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
  .content {
    height: calc(100% - 88px);
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
}
</style>