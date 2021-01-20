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
              <i class="one-eleven-icon" title="导出" @click="exportToExcel"></i>
            </div> 
          </div>
          <div class="left p-l-15">
            <div class="border-icon clear" > 
              <i class="one-one-icon" title="导出" @click="opendetail"></i>
            </div> 
          </div>
          <div class="left p-l-15" style="margin-top: 1px;">
            <div class="border-icon clear" > 
             <i class="one-twelve-icon" title="" @click="tabRemove('/home/PhysicalManagementList')"></i>
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
                <el-select v-model="form.state" @change="paramsUnit1Func"  style="width:70px;">
                  <el-option v-for="item in paramsUnit1" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left">
              <el-form-item>
                <CheckSelectSpecial
                  @findStreetByTown="paramsUnit2Func"
                  :selectId="stateUser1"
                  :listData="departIds"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item>
                <CheckSelectSpecial
                  :selectId="stateUser2"
                  :listData="departCoopId"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:15px">
              <span class="des-word">日期</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" >
                <el-select v-model="form.timeMode"  style="width:100px;">
                  <el-option v-for="item in paramsDate" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left p-l-5">
              <el-form-item label label-width="0" >
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="form.timeStart"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>

            <div class="left p-l-5">
              <el-form-item label label-width="0" >
                <el-date-picker
                  type="date"  
                  value-format="yyyy-MM-dd"
                  v-model="form.timeEnd"
                  style="width: 100px;"
                ></el-date-picker>
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
                <div class="findparentclass" style="color:#336699;cursor:pointer;font-weight: bold;" @click="editorPhysicalManagement(scope.$index, scope.row)" >
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
   // 表头数据
  import { PhysicalManagementParam } from "../../../utils/PhysicalManagement"
  import PhysicalManagementdetail from './PhysicalManagementdetail'
  import { departcoopgetParams,departcoopgetPlaceByDepart,departcoopgetPhysicalList } from '../../../service/PhysicalManagement';

  export default {
    data() {
      return {
        DPorPS:1,
        culumnTitle:'物理缴费',
        sessionStr:'PhysicalManagementList',
        columnData:PhysicalManagementParam.PhysicalManagementList,
        currentNum:0,
        tableData:[],
        rowHeight:27,
        columnValue:false,
        stateUser1:'stateUser1',
        stateUser2:'stateUser2',
        form:{
          state:-1,
          timeMode:1,
          timeStart:'',
          timeEnd:'',
        },
        paramsUnit1:[],
        departIds:[{id:-1,name:'全部',select:true}],
        departCoopId:[{id:-1,name:'全部',select:true}],
        paramsDate:[
          { id: 1, name: "缴费起始日", select: false },
          { id: 2, name: "缴费截止日", select: false },
        ],
      };
    },
    components:{
      PlTable,
      PlTableColumn,
      ColumPage,
      CheckSelectSpecial,
    },
    methods:{
      getParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true //是否显示遮罩
        });

        departcoopgetParams().then(function(res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            let data = res.data;
            // 物理单位
            let arr1 = [{id:-1,name:'全部',select:true}];
            _this.paramsUnit1= arr1.concat(data.stateParams);

            // 部门
            let arr2 = [{id:-1,name:'全部',select:true}];
            data.departs.forEach(item=>{
              arr2.push({
                id:item.id,
                name: item.label.replace(/&nbsp;/g, ""),
                level: item.level,
                select: false,
                state:item.state,
              })
            })
            _this.departIds = arr2;
            _this.getQuickDate(5);
            _this.searchTableData();
          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      paramsUnit1Func(){

      },
      paramsUnit2Func(){
        let _this = this;
        let id = this.getSelectIdByList(_this.departIds);
        if (id) {
          _this.$layer.loading({
            shade: true
          });
          departcoopgetPlaceByDepart(id).then(function(res) {
            _this.$layer.closeAll('loading');
            if (res.status == 500) {
              return false;
            } else if (res.status == 0) {
              let data = res.data;
              let arr3 = [{id:-1,name:'全部',select:true}];
              data.forEach(item=>{
                arr3.push({
                  id:item.id,
                  name: item.name.replace(/&nbsp;/g, ""),
                  select: false,
                })
              })
              _this.departCoopId = arr3;
            } else if (res.status == 1) {
              let message = res.msg;
              _this.myAlert(message + "！");
            }
          });
        }
      },

      searchTableData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form)); 
        form.departIds = _this.getSelectIdByList(_this.departIds);
        form.departCoopId = _this.getSelectIdByList(_this.departCoopId);
        if(form.timeStart==null||form.timeStart=="null"){
          form.timeStart = '';
        }
        if(form.timeEnd==null||form.timeEnd=="null"){
          form.timeEnd = '';
        };
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        departcoopgetPhysicalList(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      // 物理缴费详情
      opendetail(){
        let _this = this;
        let asd = 'dsad';
        let layerId = _this.$layer.iframe({
          content: {
            content: PhysicalManagementdetail, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "缴费修改 【"+asd+"】",
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
      clearForm(){

      },
      editorPhysicalManagement(){

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
      changeToOtherPage(){
        if(this.DPorPS==2){
          this.$router.push('/home/PhysicalProcedures');
        };
        if(this.DPorPS==3){
          this.$router.push('/home/PhysicalAssets');
        };
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
          const list = this.tableData;
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '内部钥匙')
        })
      },
    },
    mounted(){
      this.getParamsData();
      this.reloadListByStorage();
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
