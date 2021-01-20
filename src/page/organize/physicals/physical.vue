<template>
  <div class="page-container mycontailerclass1" style="height: 100%;">
    <div class="top-container border-black" >
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <div class="left p-l-10">
            <el-radio @change="changechoose" v-model="choosedetail" :label="1">
            <span class="m-l-5">部门明细</span></el-radio>
          </div>
          <div class="left p-l-10">
            <el-radio v-model="choosedetail" :label="2">
            <span class="m-l-5">物理明细</span></el-radio>
          </div>
         
          <div class="left p-l-10" >
            <i class="cut-icon cut"></i>
          </div>

          <div class="left p-l-10">
            <div class="left border-icon" @click="addphysical">
              <i class="six-eleven-icon left" style="margin-top: 5px;"></i>
              <span class="search-word p-l-5">新增物理单位</span>
            </div>
          </div>

          <div class="left p-l-10">
            <div class="left border-icon" @click="deletephy">
              <i class="six-ten-icon left" style="margin-top: 6px;"></i>
              <span class="search-word p-l-5">删除物理单位</span>
            </div>
          </div>

          <div class="left p-l-10">
            <div class="left border-icon">
              <i class="thirteen-one-icon left" style="margin-top: 5px;"></i>
              <span class="search-word p-l-5" @click="transferfunc">物理调动</span>
            </div>
          </div>

          <div class="left p-l-10">
            <i class="cut-icon cut"></i>
          </div>

          <div class="left p-l-10">
            <div class="left border-icon"  >
              <i class="filterchoose-icon" title="过滤选中" @click="filterData" ></i>
            </div>
          </div>

          <div class="left p-l-10" style="margin-top: 1px;">
            <div class="border-icon clear" > 
             <i class="one-ten-icon" title="自选列" @click="clickColumn"></i>
            </div> 
          </div>

          <div class="left p-l-10" style="margin-top: 1px;">
            <div class="border-icon clear" > 
              <i class="print-out-icon" title="导出" @click="exportToExcel"></i>
            </div> 
          </div>

          <div class="left p-l-10" style="margin-top: 1px;">
            <div class="border-icon clear" > 
             <i class="one-twelve-icon"  @click="tabRemove('/home/derpartment')"></i>
            </div> 
          </div>

          <div class="left p-l-10">
            <i class="cut-icon cut"></i>
          </div>

          <div class="left p-l-10" >
            <div class="record-num" >
              <span><</span>
              <span>{{currentNum}}</span>
              <span >/</span>
              <span>{{tableData.length}}</span>
              <span>></span>
            </div>
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
              <el-select v-model="form.state"  style="width:70px;">
                <el-option v-for="item in paramsunit" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="left">
            <el-form-item>
              <CheckSelectSpecial
                @findStreetByTown="paramsUnit2Func"
                :selectId="selectId1"
                :listData="departIds"
                style="width:100px;"
              ></CheckSelectSpecial>
            </el-form-item>
          </div>

          <div class="left">
            <el-form-item>
              <CheckSelectSpecial
                :selectId="selectId2"
                :listData="departCoopId"
                style="width:100px;"
              ></CheckSelectSpecial>
            </el-form-item>
          </div>

          <div class="left p-l-15">
            <el-form-item>
              <el-input title="物理名称/部门名称" v-model="form.word" style="width: 195px;"></el-input>
            </el-form-item>
          </div>

          <div class=" left p-l-5" style="padding-top:1px;">
            <i class="search-btn" @click="searchTableData" >查询</i>
          </div>

          <div class="left" style="padding-top:2px;padding-left: 2px;" >
            <i class="claerlys" @click="clearForm" ></i>
          </div>

        </div>
      </el-form>
    </div>
    <div class="content clear mycontent">
      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          empty-text=" "
          border
          height="100%"
          :span-method="objectSpanMethod"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :row-height="rowHeight"
        >
          <template v-if="item.show"  v-for="(item,index) in columnData">
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

            <PlTableColumn
              v-else-if="item.prop =='name'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div   style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                  {{ scope.row.name }}
                </div>
              </template>
            </PlTableColumn>

            <PlTableColumn
              v-else-if="!item.child&&item.prop!='fullName'"
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
              
            </PlTableColumn>

            <PlTableColumn
              v-else
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :show-overflow-tooltip="true"
              >
              <template v-if="item1.show" v-for="item1 in item.child">
                <PlTableColumn
                  v-if="!item1.child"
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
                    <!-- <span>{{item1.num}}</span> -->
                    <span>{{1+1}}</span>
                  </template>
                </PlTableColumn>

                <PlTableColumn
                  v-if="item1.child"
                  :label="item1.label"
                  :prop='item1.prop'
                  :width='item1.width'
                  :sortable="item1.sortable"
                  :align="item.align"
                  >
                  <template v-if="item2.show" v-for="item2 in item1.child">
                    <PlTableColumn
                      :label="item2.label"
                      :prop='item2.prop'
                      :width='item2.width'
                      :sortable="item2.sortable"
                      :align="item2.align"
                      >
                      <template slot="header">
                        <span>{{item2.label}}</span>
                      </template>
                      <template slot-scope="scope">
                        <!-- <span>{{item1.num}}</span> -->
                        <span>{{2+2}}</span>
                      </template>
                    </PlTableColumn>
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
  import {departmentParam} from '../../../utils/departparam'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {departperson,odeparttree} from '../../../service/organizeDate'
  import addphy from './addphy'
  import phymove from './phymove'
  import phydetail from './phydetail'
  import { PlTable, PlTableColumn } from 'pl-table';

  // 自选列
  import ColumPage from '../../../components/column'
  import {departcoopgetParams,departcoopdelete,departcoopgetPlaceByDepart,departcoopcoopList} from '../../../service/getdepartData'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  export default {
    data(){
      return{
        culumnTitle:'物理明细',
        sessionStr:'physical-list',
        rentColumnValue:false,
        rowHeight:27,
        choosedetail:2,
        columnData:departmentParam.phyColumn,
        tableData:[],
        multipleSelection:[],
        currentNum:0,
        selectId1:"selectId1",
        departIds:[],
        selectId2:"selectId2",
        departCoopId:[],
        state:"全部",
        paramsunit:[],
        spanArr:[],
        form:{
          state:-1,
          word:'',
        },
      }
    },
    
    components: {
      addphy,
      phydetail,
      ColumPage,
      CheckSelectSpecial,
      PlTable,
      PlTableColumn
    },

    methods:{
      // 单元格合并
      rowspan() {
        this.tableData.forEach((item,index) => {
          if( index === 0){
            this.spanArr.push(1);
            this.position = 0;
          }else{
            if(this.tableData[index].departName == this.tableData[index-1].departName ){
              this.spanArr[this.position] += 1;
              this.spanArr.push(0);
            }else{
              this.spanArr.push(1);
              this.position = index;
            }
          }
        })
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
         //合并第 一 二 列 内容相同的
        if( columnIndex === 0||columnIndex === 1){
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
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
            let arr1 = [{id:-1,name:'全部',select:true}];
            _this.paramsunit= arr1.concat(data.stateParams);
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
            _this.searchTableData()
          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      //切换
      changechoose(){
        this.$router.push('/home/derpartment');
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

      getSelectIdByList(list) {
        let arr = [];
        list.forEach(function(item) {
          if (item.select) {
            arr.push(item.id);
          }
        });
        return arr.toString();
      },
      //全选
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.tableData.forEach(ii=>{
            if(item.departName == ii.departName){
              _this.multipleSelection.push(ii.departName);
            }
          })
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },
      //详情
      handleEdit(index, row){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: phydetail, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              thismyid:row.id
            }//props
          },
          area:['800px','560px'],
          title: "物理单位修改 【"+row.name+"】",
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

      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },

      //查询
      searchTableData(){
        let _this=this;
        let form = JSON.parse(JSON.stringify(_this.form)); 
        form.departIds = _this.getSelectIdByList(_this.departIds);
        form.departCoopId = _this.getSelectIdByList(_this.departCoopId);
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        departcoopcoopList(form).then(function (res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            _this.spanArr = [];
            _this.tableData = res.data;
            _this.rowspan();
          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      //新增
      addphysical(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: addphy, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "新增物理单位",
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
      //删除
      deletephy(){
        let _this = this;
        let deid=_this.multipleSelection
        if(deid.length==0){
          _this.myAlert("请选择要删除的物理单位")
        }else {
          _this.myConfirm("确定要将选定物理单位放入回收站吗?","question-icon",'是','否').then(res => {
            _this.deletedIMSuccess();
          }).catch(err => {

          })
        }
      },

      deletedIMSuccess(){
        let _this = this;
        let deleted = 1;
        let id = _this.multipleSelection.toString();
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        departcoopdelete(deleted,id).then(function (response) {
          _this.$layer.closeAll('loading');
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            _this.currentNum = 0;
            let data = response.data;

            _this.myAlert("删除成功",'success-icon').then(res => {
              _this.getParamsData();
            }).catch(err => {

            })
          }else if(response.status == 1){
            _this.myAlert(response.msg+"！",'dangerous-icon');
          }
        })
      },

      // 物理名称调动
      transferfunc(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: phymove, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['550px','250px'],
          title: "物理名称调动",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });
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
          export_json_to_excel(tHeader, data, '物理明细')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //过滤方法
      filterData(){
        let select = this.multipleSelection.toString();
        if(select){
          this.spanArr = [];
          let arr = [];
          this.tableData.forEach(function(item){
            if(select.indexOf(item.departName) != -1){
              arr.push(item);
            }
          })
          this.currentNum = 0;
          this.tableData = arr;
          this.rowspan();
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

      //清空
      clearForm(){

      },
      tabRemove (targetName) {
        console.log(this.options);
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
      
    },

    mounted(){
      this.getParamsData();
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
    watch: {
      $route: {
        handler() {
          this.DPorPS = 2;
        },
        deep: true,
      }
    },
  }
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
    height: calc(100% - 72px) !important;
  }
</style>
