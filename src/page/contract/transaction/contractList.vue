<template>
  <div id="follow-container" class="rent-container mycontailerclass1">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear">
          <div class="left padding-l-10" @click="newContract" style="cursor:pointer;">
            <div class="border-icon clear" >
              <i class="fa fa-plus add"></i>
              <span>新增合同</span>
            </div>  
          </div>
          <div class="left padding-l-10" @click="deletedFollow" style="cursor:pointer;">
            <div class="border-icon clear" >
              <i class="fa fa-times delete" style="color:#FF0000;"></i>
              <span>删除合同</span>
            </div>  
          </div>
          <div class="left p-l-10">
            <i class="cut-icon"></i>
          </div>
          <div class="left p-l-10 p-t-2">
            <div class="border-icon clear" >
              <i class="one-four-icon" title="选定合同改自定号"   @click="modifyNumClick"></i>
            </div>  
          </div>
          <div class="left p-l-10 p-t-3">
            <div class="border-icon clear" > 
              <i class="one-Thirteen-icon" title="过滤选中"  @click="filterData" ></i>
            </div>  
          </div>
          <div class="left p-l-10">
            <div class="border-icon clear" > 
              <i class="leading-out-icon" title="自选列" @click="clickColumn"></i>
            </div>  
          </div>
          <div type="primary" class="p-l-10 left p-t-2">
            <div class="border-icon clear" > 
              <i class="print-out-icon" title="导出"  @click="exportToExcel"></i>
            </div>  
          </div>
          <div class="item left clear p-l-10 p-t-3">
            <div class="border-icon clear" > 
              <i class="one-twelve-icon" @click="tabRemove('/home/transactionContract')"></i>
            </div>  
          </div>
          <div class="left p-l-10">
            <i class="cut-icon"></i>
          </div>
          <div class="item p-l-10 left">
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
      <div class="search-container" style="max-height:58px;overflow:hidden;" >
        <el-form ref="formsData" :model="form">
          <div class="clear" id="searchContent1">
            <div class="left padding-l-15">
              <span class="des-word">日期</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="quick">
                <el-select v-model="form.timeMode" placeholder style="width:85px;">
                  <el-option label="全部" value="-1"></el-option>
                  <el-option label="提交日" value="1"></el-option>
                  <el-option label="签约日" value="2"></el-option>
                  <el-option label="结款日" value="3"></el-option>
                  <el-option label="结佣日" value="4"></el-option>
                  <el-option label="结盘日" value="5"></el-option>
                  
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="timeStart">
                <el-date-picker
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  v-model="form.timeStart"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="timeEnd">
                <el-date-picker
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  v-model="form.timeEnd"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>

            <div class="left padding-l-15">
              <span class="des-word">业类</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="Industry">
                <CheckSelectSpecial :selectId="Industry" :listData="Category" style="width:90px;"></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-15">
              <span class="des-word">状态</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="stateParamId">
                <CheckSelectSpecial
                  :selectId="stateParamId"
                  :listData="stateParamList"
                  style="width:85px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-15">
              <el-form-item label label-width="0" prop="searchType">
                <el-select v-model="form.wordType" placeholder style="width:85px;">
                  <el-option label="(智能)" value="-1"></el-option>
                  <el-option label="合同编号" value="1"></el-option>
                  <el-option label="房产证号" value="2"></el-option>
                  <el-option label="房源编号" value="3"></el-option>
                  <el-option label="区县" value="4"></el-option>
                  <el-option label="街镇" value="5"></el-option>
                  <el-option label="房源地址" value="6"></el-option>
                  <el-option label="业主姓名" value="7"></el-option>
                  <el-option label="客户姓名" value="8"></el-option> 
                  <el-option label="客户身份证" value="9"></el-option> 
                  <el-option label="客户电话" value="10"></el-option> 
                </el-select>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item prop="word" label-width="0">
                <el-input
                  v-model.trim="form.word"
                  title="合同编号,房源编号,客源编号,楼盘名,位置,业主名,客户名称,电话,身份证,备注"
                  maxlength="30"
                  style="width:150px;"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>

            <div class="left padding-l-5" >
              <i @click="searchConteactDataList" class="search-btn" style="cursor:pointer;">查询</i>
            </div>
            <div class="left" style="padding-top:1px;">
              <i class="claerlys" @click="clearForm"></i>
            </div>
            <div class="left" style="margin-top:3px;">
              <i
                :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}"
                @click="showSearch"
              ></i>
            </div>
          </div>
          <div class="clear position-t-5" style id="searchContent2">
            <div class="left padding-l-15">
              <span class="des-word">地域</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="districtIds">
                <CheckSelectSpecial
                  @findStreetByTown="findStreetByTown"
                  :selectId="districtIds"
                  :listData="areaParams"
                  style="width:145px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="streetIds">
                <CheckSelectSpecial
                  :selectId="streetIds"
                  :listData="streetParams"
                  style="width:143px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-15">
              <span class="des-word">自定</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="numberId">
                <CheckSelectSpecial :selectId="numberId" :listData="numberList" style="width:90px;"></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-15">
              <span class="des-word">员工</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="userType">
                <el-select v-model="form.userType" placeholder style="width:85px;">
                  <el-option label="签约人" value="1"></el-option>
                  <el-option label="签约经理" value="2"></el-option>
                  <el-option label="业绩人" value="3"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" prop="departId">
              <el-form-item label label-width="0">
                <CheckSelectSpecial
                  @findStreetByTown="finUserByDepart"
                  :selectId="departId"
                  :listData="departParams"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="userId">
                <CheckSelectSpecial :selectId="userId" :listData="userParams" style="width:100px;"></CheckSelectSpecial>
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
          use-virtual
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :cell-class-name="rowClass"
          :row-height="rowHeight"
          :cell-style="cellStyle"
          ref="singleTable"
        >
          <template v-if="item.show" v-for="(item,index) in columnData">
            <PlTableColumn
              v-if="item.prop == 'roomAddress'"
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
                  v-html="scope.row.roomAddress"
                  style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;"
                  @click="editorContract(scope.$index, scope.row,'house')"
                ></div>
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
/*获取数据
 *
 * */
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {findUserByDepartId} from "../../../service/organizeDate";

import {
  followListRouter,
  followParam,
  deletedFollow
} from "../../../service/houseData";
import {
  contractList,
  contractGetParams,
  delcontract
} from "../../../service/contractData";
import { contractParam } from "../../../utils/contractParam";
import { quickDate } from "../../../utils/getQuickDate";
import CheckSelectSpecial from "../../../components/checkSpecial"; // 自选列
import ColumPage from "../../../components/column";
import { PlTable, PlTableColumn } from "pl-table";
import { getparams } from "../../../service/newHouse";
import { findbyId } from "../../../service/getData";

import NewContractPage from "./newContract";
import ModifyContractNumPage from "./modifyContractNum";
//
import EditorContractPage from "./editorContract";
//获取数据
export default {
  data() {
    return {
      columnValue: false,
      currentPage: [],
      multipleSelection: [],
      tableData: [],
      columnData: contractParam.contractColumn,
      sessionStr: "contract-list",
      currentNum: 0,
      quick: "2",
      upAndDown: 1,
      tradeId: "tradeId",
      stateId: "stateId",
      departId: "departId",
      districtIds: "districtIds",
      streetIds: "streetIds",
      userId: "userId",
      processTypeId: "processTypeId",
      typeId: "typeId",
      Industry: "Industry",
      departIds: "departIds",
      userIds: "userIds",
      numberId: "numberId",
      stateParamId: "stateParamId",
      culumnTitle: "交易合同",
      rowHeight:27,
      modifyNumValue: false,
      initLeft:0,//初始化详情弹窗的增加 left
      initTop:0,//初始化详情弹窗的增加 top
      numberList: [],
      stateParamList: [],
      areaParams: [],
      streetParams: [],
      tradeParams: [],
      stateParams: [],
      userList: [],
      departParams: [],
      departList: [],
      Category: [],
      userParams: [],
      processWayIdParams: [],
      typeParams: [],
      currentData: [],

      form: {
        timeMode:"2",
        timeStart: "",
        timeEnd: "",
        userType: "1",
        word: "",
        wordType: "-1"
      }
    };
  },
  components: {
    CheckSelectSpecial,
    EditorContractPage,
    ColumPage,
    PlTable,
    PlTableColumn,
    ModifyContractNumPage,
    NewContractPage
  },
  methods: {
    newContract() {
      let _this = this;
      let layerId = _this.$layer.iframe({
        content: {
          content: NewContractPage, //传递的组件对象
          parent: this, //当前的vue对象
          data: {} //props
        },
        area: ["800px", "560px"],
        title: "新增合同",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 19891110,
        cancel: () => {
          //关闭事件
        }
      });
      let getLayerId = document.getElementById(layerId);
      let mygetLayerId = document.getElementById(layerId).getAttribute('id');
      document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
      document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
      let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
      _this.$store.commit('set_active_layerifranme',layerifranmedata);
    },
    reloadContractList(type,row) {
      this.getFollowData();
      if(type == 2){
        this.editorContract(1,row,'finance');
      }
    },
    getQuickDate(value) {
      let time = quickDate.getTwoDateByDay(value);
      this.form.timeStart = time.startTime;
      this.form.timeEnd = time.endTime;
      if (value != 1) {
        this.timeDisabled = true;
      } else {
        this.timeDisabled = false;
      }
    },
    modifyNumClick() {
      let ids = this.multipleSelection.toString();
      if (ids) {
        
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: ModifyContractNumPage, //传递的组件对象
            parent: this, //当前的vue对象
            data: {ids:ids} //props
          },
          area: ["350px", "200px"],
          title: "选定合同改自定号",
          shadeClose: false,
          shade: true, //是否显示遮罩
          zIndex: 19891110,
          cancel: () => {
            //关闭事件
          }
        });
        
      } else {
        this.myAlert("请选择合同！", "dangerous-icon");
      }
    },
    
    getContract() {
      contractGetParams().then(res => {
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {

          let data = res.data;
          let time = quickDate.getTwoDateByDay(6);
          this.form.timeStart = time.startTime;
          this.form.timeEnd = time.endTime;
          if (data.businessTypeParams) {
            let business = data.businessTypeParams;
            let arr = [{ id: "-1", name: "全部", select: true }];
            for (let i = 0; i < business.length; i++) {
              arr.push({
                id: business[i].id,
                name: business[i].name+business[i].remark,
                select: business[i].select
              });
            }
            this.Category = arr;
          }
          if (data.numParams) {
            let num = data.numParams;
            let arr = [{ id: "-1", name: "全部", select: true },{id:'0',name:'空',select:false}];
            for (let i = 0; i < num.length; i++) {
              arr.push({
                id: num[i].name,
                name: num[i].name,
                select: num[i].select
              });
            }
            this.numberList = arr;
          }
           

          let defaultUserList = data.defaultUserList;
          let defaultDepartId = data.defaultDepartId;
          let defaultUserId = data.defaultUserId;
          if(data.departTree) {
            let arr = [{id:"-1",name:"全部",select:true}];
            if(defaultDepartId){
              arr = [{id:"-1",name:"全部",select:false}];
            }else{
              arr = [{id:"-1",name:"全部",select:true}];
            }
            
            let treeData = data.departTree
            for (let i = 0; i < treeData.length; i++) {
              let obj = {
                id: treeData[i].id,
                name: treeData[i].label.replace(/&nbsp;/g, ""),
                level: treeData[i].level,
                select:false,
              };
              if(defaultDepartId && defaultDepartId == treeData[i].id ){
                obj.select = true;
              }
              arr.push(obj);
            }
            this.departList = arr;
          }
          let departTree = data.departTree;
          if (departTree && departTree.length != 0) {
            arr = [{ id: "-1", name: "全部", select: true }];
            for (let i = 0; i < departTree.length; i++) {
              arr.push({
                id: departTree[i].id,
                name: departTree[i].label.replace(/&nbsp;/g, ""),
                level: departTree[i].level,
                select: departTree[i].select,
                state:departTree[i].state,
              });
            }
            this.departParams = arr;
          }
          this.userParams = [{ id: "-1", name: "全部", select: true }];
          var arr = [{id:'-1',name:'全部',select:true}];
          if(defaultUserList && defaultUserList.length != 0){
            if(defaultUserId){
              arr = [{id:'-1',name:'全部',select:false}];
            }else{
              arr = [{id:'-1',name:'全部',select:true}];
            }
            defaultUserList.forEach(item =>{
              let obj = {
                id:item.id,
                name:item.name,
                select:false
              }
              if(defaultUserId && defaultUserId == item.id){
                obj.select = true;
              }
              arr.push(obj);
            })
          }
          this.userList = arr;
          
          if (data.stateIdParams) {
            let state = data.stateIdParams;
            let arr = [{ id: "-1", name: "全部", select: true }];
            for (let i = 0; i < state.length; i++) {
              arr.push({
                id: state[i].id,
                name: state[i].name,
                select: state[i].select
              });
            }
            this.stateParamList = arr.concat(data.finishSalaryParams).concat(data.finishEndParams);
          }
          this.getParamsData();
          this.getFollowData();
        } else if (res.status === 1) {
          let message = response.msg;
          this.myAlert(message + "！");
        }
      });
    },
    getParamsData() {
      let _this = this;
      this.$layer.loading({
        shade: true //是否显示遮罩
      });

      getparams(true).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let areaList = data.areas;
          if (areaList && areaList.length != 0) {
            let arr = [{ id: "-1", name: "全部", select: true }];
            for (let i = 0; i < areaList.length; i++) {
              arr.push({
                id: areaList[i].id,
                name: areaList[i].label
              });
            }

            _this.areaParams = arr;
          }
          _this.streetParams = [{ id: "-1", name: "全部", select: true }];
         
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    finUserDepart() {
      let _this = this;
      let id = this.getSelectIdByList(_this.departList);
      if (id) {
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function(response) {
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
            _this.userList = arr;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      } else {
        _this.userList = [{ id: "-1", name: "全部", select: true }];
      }
    },
    finUserByDepart() {
      let _this = this;
      let id = this.getSelectIdByList(_this.departParams);
      if (id) {
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
      } else {
        _this.userParams = [{ id: "-1", name: "全部", select: true }];
      }
    },
    //获取合同数据
    getFollowData() {
      let _this = this;
      //加载动画
      _this.$layer.loading({
        shade: true
      });
      let form = JSON.parse(JSON.stringify(_this.form));
      form.businessTypes = _this.getSelectIdByList(_this.Category);
      form.num=_this.getSelectIdByList(_this.numberList);
      form.numDeaprtId=_this.getSelectIdByList(_this.departList);
      form.numEmpId=_this.getSelectIdByList(_this.userList);
      form.deptIds = _this.getSelectIdByList(_this.departParams);
      form.userIds = _this.getSelectIdByList(_this.userParams);
      form.streetIds = _this.getSelectIdByList(_this.streetParams);
      form.townIds = _this.getSelectIdByList(_this.areaParams);
      form.states = _this.getSelectIdByList(_this.stateParamList);
      
      contractList(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.tableData = response.data.list;
          _this.tableData.forEach(item=>{
            item.price = Number(item.price);
            item.unitPrice = Number(item.unitPrice);
            item.roomArea = Number(item.roomArea);
          })
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
        _this.currentNum = 0;
      });
    },
    searchConteactDataList() {
      this.getFollowData();
    },
    reloadRentList(type,id) {
      this.getFollowData();
      if(type == 2){

      }
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
        export_json_to_excel(tHeader, data, "交易合同列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    editorContract(index, row,tab) {
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

      let ids = [];
      let currentData = this.currentData;
      let len = currentData.length;
      for (let i = 0; i < len; i++) {
        ids.push(currentData[i].id);
      }
      this.currentPage = row;
      let layerId = _this.$layer.iframe({
        content: {
          content: EditorContractPage, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            id: row.id,
            address: row.roomAddress,
            activeName: tab,
            ids: ids.toString(),
            currentIndex: index
          } //props
        },
        area: ["800px", "560px"],
        title:
          "合同信息 【房源地址:"+row.roomAddress +'&nbsp;&nbsp;&nbsp;&nbsp;'+
            "业主:" +row.ownerName +'&nbsp;&nbsp;&nbsp;&nbsp;'+
            "客户:" + row.customerName+"】",
        shadeClose: false,
        shade: false, //是否显示遮罩
        zIndex: 19891110,
        cancel: () => {
          //关闭事件
          this.currentPage = "";
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
    },
    changeTitle(count,needlayerid,upordown){
      let _this = this;
      let mycountnum = 0;
      let currentId =  _this.tableData[count].id;
      let tableData = _this.tableData;
      let saveData = _this.$store.state.layerifranme;
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
      getLayerId.getElementsByClassName('lv-title')[0].innerHTML =
            "合同信息 【房源地址:"+_this.tableData[mycountnum].roomAddress +'&nbsp;&nbsp;&nbsp;&nbsp;'+
            "业主:" +_this.tableData[mycountnum].ownerName +'&nbsp;&nbsp;&nbsp;&nbsp;'+
            "客户:" + _this.tableData[mycountnum].customerName+"】";
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
      console.log(_this.$store.state.layerifranme);
      return callbackdata;
    },
    rowClass({ row, index }) {
      let className = "";

      if (row.id == this.currentPage.id) {
        className += "page-check ";
      }
      if (row.finishSalary == '已结佣') {
        className =  ' finish-salary-state ';
      }
      if (row.finishEnd == '已结盘') {
         className =  ' finish-end-state ';
      }
      return className;
    },
    cellStyle({row, column, rowIndex, columnIndex}){
       
       if(column.property == 'businessType' && row.businessType.indexOf('B') != -1){
         return {'color':'#007878'}
       }else if(column.property == 'businessType' && row.businessType.indexOf('C') != -1){
         return {'color':'#B40000'}
       }
        
      },
    deletedFollow() {
      let _this = this;
      let select = this.multipleSelection.toString();
      if (select) {
        _this
          .myConfirm(
            "警告：删除交易合同会将其【业绩分成】和【跟进记录】一起删除！",
            "dangerous-icon",
            "确认",
            "取消",
            "确定要将选定的交易合同放入回收站吗？",
            "my-message"
          )
          .then(res => {
            _this.deletedDataFollow();
          })
          .catch(err => {});
      } else {
        this.myAlert("请勾选要删除的合同!", "dangerous-icon");
      }
    },
    deletedDataFollow() {
      let _this = this;
      let select = this.multipleSelection.toString();
      let id = {
        id: select,
        deleted: 1
      };
      delcontract(id).then(function(response) {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this
            .myAlert("删除成功!", "success-icon")
            .then(res => {
              _this.getFollowData();
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
      if (this.upAndDown == 2) {
        this.upAndDown = 1;
        rent.getElementsByClassName("content")[0].style.height =
          "calc(100% - 150px)";
        rent.getElementsByClassName("el-table")[0].style.height =
          "calc(100% - 150px)";
        document.getElementById("searchContent2").style.display = "block";
      } else {
        this.upAndDown = 2;
        rent.getElementsByClassName("content")[0].style.height =
          "calc(100% - 70px)";
        rent.getElementsByClassName("el-table")[0].style.height =
          "calc(100% - 70px)";
        document.getElementById("searchContent2").style.display = "none";
      }
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
    
    findStreetByTown() {
      let _this = this;
      let ids = [];
      let areaParams = this.areaParams;
      if (areaParams) {
        areaParams.forEach(function(item) {
          if (item.select && item.id != "-1") {
            ids.push(item.id);
          }
        });
      }
      ids = ids.toString();
      findbyId(ids).then(function(response) {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let arr = [{ id: "-1", name: "全部", select: true }];
          if (data && data.length) {
            data.forEach(function(item) {
              arr.push({
                id: item.id,
                name: item.label,
                select: false
              });
            });
          }
          _this.streetParams = arr;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
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
    clearForm() {
      let _this = this;
      this.getQuickDate(4);

      

      this.form.timeMode = "2";
     
      this.form.userType = "1";
      this.form.word = "";
      this.form.wordType = "-1";

      let time = quickDate.getTwoDateByDay(6);
      this.form.timeStart = time.startTime;
      this.form.timeEnd = time.endTime;
      this.Category = _this.backSlect(_this.Category);
      this.numberList = _this.backSlect(_this.numberList);
      this.departList  =_this.backSlect(_this.departList);
      this.userList  =_this.backSlect(_this.userList);
      this.userParams  = _this.backSlect(_this.userParams);
      this.streetParams  = _this.backSlect(_this.streetParams);
      this.areaParams  = _this.backSlect(_this.areaParams);
      this.stateParamList  = _this.backSlect(_this.stateParamList);
      this.departParams = _this.backSlect(_this.departParams);
    },
    //全选
    handleSelectionChange(elemCheckbox) {
      let _this = this;
      //获取用户的选中
      _this.multipleSelection = [];
      elemCheckbox.forEach(item => {
        _this.multipleSelection.push(item.id);
      });
      _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
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
      let arr = [];
      if (select) {
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
      list.forEach(item => {
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
    this.getContract();
    
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
    height: calc(100% - 120px);
    width: 100%;
    .list-content {
      width: calc(100% - 20px);
      height: 100%;
      margin: 5px auto 0px;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png") 2 repeat;
      border-radius: 5px;
      .el-table{
        .el-table__body-wrapper{
          height: calc(100% - 27px) !important;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-table th.gutter {
  display: none !important;
}
</style>
