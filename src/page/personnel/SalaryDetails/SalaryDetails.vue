<template>
  <div class="page-container mycontailerclass1"  id="SalaryDetails-container" >
    <div class="top-container border-black" >
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <label>
            <div class="left padding-l-10" >
              <el-radio @change="changeToSalaryDetailsPerson"  v-model="DPorPS" :label="1">&nbsp;</el-radio>
            </div>
            <div class="left" >
              人员
            </div>
          </label>
          <label>
            <div class="left padding-l-15"  >
              <el-radio  v-model="DPorPS" :label="2">&nbsp;</el-radio>
            </div>
            <div class="left" >
              部门
            </div>
          </label>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left padding-l-10 clear"  @click="newAddSalary" >
            <div class="border-icon clear" > 
              <div class="left m-t-5">
                <i class="six-eleven-icon"></i>
              </div>
              <div class="left p-l-5"  >
                <span class="search-word" >新增</span>
              </div>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left clear padding-l-10" @click="SingleWage">
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="SingleWage-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >单项工资</span>
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
              <i class="back-icon user left" @click="tabRemove('/home/SalaryDetails')" ></i>
            </div>  
          </div>

        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear">
            <div class="left padding-l-10" >
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
              <span class="des-word" >发领</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <CheckSelect :selectId="stateIdsDefault" v-model="stateParamsDefault" :listData="stateParams" style="width:80px;" ></CheckSelect>
              </el-form-item>
            </div> 

            <div class="left" style="padding-left: 15px;" >
              <span class="des-word" >封账</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-select    style="width:80px;"  v-model="isClosingAccountsParamsDefault" @change='selectChangemethods'>
                  <el-option v-for="item in isClosingAccountsParams" :label="item.name" :value="item.id"  style="width: 80px;"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left padding-l-15" style="padding-left:15px" >
              <span class="des-word" >部门</span>
            </div>

            <div class="left">
              <el-form-item label label-width="0" prop="executorId">
                <CheckSelectSpecial
                  :selectId="executorId"
                  :listData="executorList"
                  style="width:90px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left" style="margin-left: 5px;">
              <el-form-item  label-width="0">
                <el-radio-group v-model="form.myradio">
                  <el-radio @click.native.prevent="clickitem(1)" :label="1" style="color: #2c3e50;font-size: 12px;">是否包含下级</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            

            <div class="left " style="padding-left:15px;"  >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.word" title="部门" maxlength="30" style="width:150px;"  autocomplete="off" ></el-input>
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
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @row-click="getRowDataByClick"
          :cell-class-name="finalCellStyle"
          :row-height="rowHeight"
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
              v-else-if="item.prop == 'name'"
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
                
                <span  style="line-height: 40px;display: inline-block;">{{item.label}}</span>
                <span style="color: #999;transform: scale(0.8);display: inline-block;position: absolute;left: 0px;right: 0px;bottom: 0px;top: 0px;margin-top: 20px;">(含调动数据)</span>
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

            </pl-table-column>
          </template>
        </PlTable>
      </div>
    </div>
  </div>
</template>


<script>
  // 获取数据
  
  import {InsuranceMoney,InsuranceMoneyParams } from "../../../service/InsuranceMoney"; 
  import {userSalarygetParams,userInsuranceTaskList,userSalaryDelete } from '../../../service/SalaryDetails';
  
  // 自选列
  import ColumPage from '../../../components/column'

  import CheckSelect from '../../../components/check'
  import CheckSelectSpecial from '../../../components/checkSpecial'

  import { PlTable, PlTableColumn } from 'pl-table';
  import {SalaryDetailsList} from '../../../utils/SalaryDetailsList'
  import newAddSalary from './newAddSalary'
  import SingleWage from './SingleWage';
  import {quickDate} from '../../../utils/getQuickDate'

  // 个人模拟数据
  import { mySalaryDetailsListContent } from '../../../utils/mySalaryDetailsList';

  export default {
    data() {
      return {
        stateParams:[],
        stateIdsDefault:'stateIdsDefault',
        executorId: "executorId",
        isClosingAccountsParamsDefault:'全部',
        stateParamsDefault:'全部',
        isClosingAccountsParams:[],
        executorList: [],
        form:{
          timeStart:'',
          timeEnd:'',
          word:'',
          type:"1",
          myradio:'',  
        },
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        columnValue:false,
        DPorPS:2,
        currentNum:0,
        rowHeight:27,
        culumnTitle:'工资明细',
        sessionStr:'SalaryDetails-list',
        tableData:[],
        // tableData:mySalaryDetailsListContent.mySalaryDetailsList,
        columnData:SalaryDetailsList.SalaryDetailsDepart,
        currentPage:'',
        columnDatatotal:{},
        multipleSelection:[],
        
        stateParams:[],
        
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
    },
    methods:{
      clickitem (e) {
        e == this.form.myradio ? this.form.myradio = ' ' : this.form.myradio = e
        console.log(this.form.myradio);
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
      finalCellStyle({row, column, rowIndex, columnIndex}){
        if(column.property == "user"){
          return 'usertdstyle'
        }
      },
      changeToSalaryDetailsPerson(){

        this.$router.push('/home/SalaryDetailsPerson');
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
            let initArr = [{id:"-1",name:"全部",select:true}];
            // if(data.stateParams){
            //   _this.stateParams = initArr.concat(data.stateParams);
            // }
            if(data.isClosingAccountsParams){
              _this.isClosingAccountsParams = initArr.concat(data.isClosingAccountsParams);
              _this.isClosingAccountsParamsDefault = '-1';
            }else{
              _this.isClosingAccountsParams = initArr;
            }
            if(data.stateParams){
              _this.stateParams = initArr.concat(data.stateParams);
              _this.stateParamsDefault = '-1';
            }else{
              _this.stateParams = initArr;
            }

            if (data.departTree) {
              let arr = [{ id: "-1", name: "全部", select: true }];
              let treeData = data.departTree;
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  select: false
                });
              }
              _this.executorList = arr;
            }
            _this.searchSalaryDetailsList();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      searchSalaryDetailsList(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
        
        let isClosingAccounts = _this.isClosingAccountsParamsDefault;

        if(isClosingAccounts == '全部'){
          form.isClosingAccounts = '-1'
        }else{
          form.isClosingAccounts = isClosingAccounts.toString();
        }
        

        let salaryState = _this.getSelectIdByList(_this.stateParams);
        console.log(salaryState);
        form.salaryState = salaryState.toString();

        let departIds = _this.getSelectIdByList(_this.executorList);
        form.departIds = departIds.toString();

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

                  ii.label = columnDatatotal[ii.prop];
                })
              }
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      //新增项目
      newAddSalary(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: newAddSalary, //传递的组件对象
            parent: this,//当前的vue对象
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
      SingleWage(){
        // this.myAlert("111");
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: SingleWage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['600px','450px'],
          title: "操作单项工资",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },
      clearForm(){
        let _this = this;
        _this.getQuickDate(18);
        _this.form.word = '';
        _this.form.myradio = '2';
        _this.isClosingAccountsParamsDefault = '-1';
        _this.stateParams = _this.backSlect(_this.stateParams);
        _this.executorList = _this.backSlect(_this.executorList);

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
          export_json_to_excel(tHeader, data, '工资列表(部门)')
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
        console.log(row.index,this.tableData);
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
      }
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
      this.getParamsData();
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
  /*/deep/ .mycontent .el-table,.el-table__expanded-cell {
    height: calc(100vh - 170px) !important;
  }*/
  /deep/ .usertdstyle .pl-table-beyond{
    height: 100%;
  }
  /deep/ .el-radio__label{
    font-size: 12px;
    color: #2c3e50;
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

  }
  /deep/ .mycontent .el-table .el-table__body-wrapper{
    height: calc(100% - 52px) !important;
  }
  /deep/ .mycontent .plTableBox .el-table .el-table__header th{
    background-color: #DCD9D3;
  }
</style>
