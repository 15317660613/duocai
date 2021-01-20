<template>
  <div class="page-container mycontailerclass1" style="height: 100%;">
    <div class="top-container border-black" >
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <div class="left m-l-15">
            <el-radio @change="changeToOtherPage" v-model="DPorPS" :label="1"><span class="m-l-5">物理缴费</span></el-radio>
          </div>
          <div class="left m-l-15">
            <el-radio @change="changeToOtherPage" v-model="DPorPS" :label="2"><span class="m-l-5">物理手续</span></el-radio>
          </div>
          <div class="left m-l-15">
            <el-radio @change="changeToOtherPage" v-model="DPorPS" :label="3"><span class="m-l-5">物理资产</span></el-radio>
          </div>
          <div class="left p-l-15">
            <i class="cut-icon"></i>
          </div>
          <div class="left p-l-15">
            <div class="border-icon clear" > 
             <i class="one-ten-icon" title="自选列" @click="clickColumn"></i>
            </div> 
          </div>
          <div class="left p-l-15">
            <div class="border-icon clear" > 
              <i class="print-out-icon" title="导出" @click="exportToExcel"></i>
            </div> 
          </div>
          <div class="left p-l-15" style="margin-top: 1px;">
            <div class="border-icon clear" > 
             <i class="one-twelve-icon" title="" @click="tabRemove('/home/PhysicalManagementList')"></i>
            </div> 
          </div>
          <div class="left p-l-15">
            <div class="border-icon clear" > 
              <i class="one-one-icon" title="导出" @click="opendetail"></i>
            </div> 
          </div>
          <div class="left p-l-15">
            <i class="cut-icon"></i>
          </div>
          <div class="item p-l-15 left">
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
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear">
            <div class="left" style="padding-left:15px">
              <span class="des-word">物理单位</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" >
                <el-select v-model="form.unit1" @change="paramsUnit1Func"  style="width:70px;">
                  <el-option v-for="item in paramsUnit1" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left">
              <el-form-item>
                <CheckSelectSpecial
                  @findStreetByTown="paramsUnit2Func"
                  :selectId="stateUser1"
                  :listData="paramsUnit2"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item>
                <CheckSelectSpecial
                  :selectId="stateUser2"
                  :listData="paramsUnit3"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class=" left p-l-5" style="padding-top:1px;" >
              <i class="search-btn" @click="searchTableData"  >查询</i>
            </div>
            <div class="left" style="padding-top:2px;padding-left: 2px;" >
              <i class="claerlys" @click="clearForm" ></i>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear mycontent">
      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
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
              v-else-if="item.prop == 'depart'"
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
              <template slot-scope="scope" style="height: 100%;">
                <div class="findparentclass" style="color:#336699;cursor:pointer;font-weight: bold;" @click="editorPhysicalProcedures(scope.$index, scope.row)" >
                  {{ scope.row.depart }}
                </div>
              </template>
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop=='unit'||item.prop=='date'"
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
               <template v-for="item1 in item.child">
                <PlTableColumn
                  :label="item1.label"
                  :prop='item1.prop'
                  :width='item1.width'
                  :sortable="item1.sortable"
                  :align="item.align"
                  >
                  <template slot="header">
                    <span>{{item1.label}}</span>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row[item1.count1total]}}</span>
                  </template>
                </PlTableColumn>
               </template>
            </pl-table-column>
          </template>
        </PlTable>
      </div>
    </div>
  </div>
</template>


<script>
  // 获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex';

  // 自选列
  import ColumPage from '../../../components/column'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import { PlTable, PlTableColumn } from 'pl-table';
  import {quickDate} from '../../../utils/getQuickDate';
  import PhysicalProceduresdetail from './PhysicalProceduresdetail'
  // 表头数据
  import { PhysicalManagementParam } from "../../../utils/PhysicalManagement"

  export default {
    data() {
      return {
        DPorPS:2,
        culumnTitle:'物理手续',
        sessionStr:'PhysicalManagementList',
        columnData:PhysicalManagementParam.PhysicalProcedures,
        rowHeight:27,
        currentNum:0,
        stateUser1:'stateUser1',
        stateUser2:'stateUser2',
        tableData:[],
        paramsUnit2:[],
        paramsUnit3:[],
        columnValue:false,
        paramsUnit1:[
          { id: -1, name: "全部", select: true },
          { id: 1, name: "常态", select: false },
          { id: 2, name: "商谈", select: false },
          { id: 3, name: "废弃", select: false },
        ],
        form:{
          unit1:'',
        },
      };
    },
    components:{
      PlTable,
      PlTableColumn,
      ColumPage,
      CheckSelectSpecial,
    },
    methods:{
      paramsUnit2Func(){

      },
      paramsUnit1Func(){

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
      // 物理资产详情
      opendetail(){
        let _this = this;
        let asd = 'dsad';
        let layerId = _this.$layer.iframe({
          content: {
            content: PhysicalProceduresdetail, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['600px','550px'],
          title: "资产修改 【"+asd+"】",
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
      searchTableData(){

      },
      clearForm(){

      },
      editorPhysicalProcedures(){

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
          export_json_to_excel(tHeader, data, '内部钥匙')
        })
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
      changeToOtherPage(){
        if(this.DPorPS==1){
          this.$router.push('/home/PhysicalManagementList');
        };
        if(this.DPorPS==3){
          this.$router.push('/home/PhysicalAssets');
        };
        
      },
    },
    mounted(){
      this.reloadListByStorage();
    },
    watch: {
      $route: {
        handler() {
          this.DPorPS = 2;
        },
        deep: true,
      }
    },
  };
</script>

<style lang="scss" scoped>
  /deep/ .mycontent{
    height: calc(100% - 87px);
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
  /deep/ .mycontent .el-table .el-table__body-wrapper {
    height: calc(100% - 45px) !important;
  }
</style>
