<template>
    <div class="params mycontailerclass1">
      <div class="top-container " >
        <div>
          <el-form ref="formsData"  :model="form" >
            <div class="clear search-container mycontailerclass2" style="height: 28px;">
              <div class="left" @click="recoveryData">
                <div class="left border-icon"  style="margin: 0px 5px 0px 10px;">
                  <span class="search-word left" >恢复</span>
                  <i class="recovery-icon left"  style="margin-left: 10px;"></i>
                </div>
              </div>
              <div class="left" >
                <i class="cut-icon cut"></i>
              </div>
              <div class="left" @click="deletedSalaryDetails">
                <div class="left border-icon"  style="margin: 0px 10px;">
                  <span class="search-word left" >彻底删除</span>
                  <i class="delete-icon left" style="margin-left: 10px;"></i>
                </div>
              </div>
              
              <div class="item left clear padding-l-10">
                <div class="left border-icon"  >
                  <i class="filterchoose-icon" title="过滤选中" @click="filterData" ></i>
                </div>
              </div>
              <div class="item left" >
                <i class="cut-icon cut"></i>
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
              <div class="item left clear" @click="tabRemove('/home/recycle')" >
                <div class="left border-icon">
                   <i class="back-icon user left"></i>
                </div>
              </div>
            </div>
            <div class="clear search-container" style="height: 35px;">
              <div class="left padding-l-15" style="margin-left: 10px;">
                <span class="des-word" >日期</span>
              </div>
              <div class="left " >
                <el-form-item label="" label-width="0">
                  <el-select @change="getQuickDate" v-model="quick"    style="width:85px;"   >
                    <el-option  label="自定义" value="1" ></el-option>
                    <el-option  label="今天" value="2" ></el-option>
                    <el-option  label="三天" value="3" ></el-option>
                    <el-option  label="七天" value="4" ></el-option>
                    <el-option  label="一月" value="5" ></el-option>
                    <el-option  label="三月" value="6" ></el-option>
                    <el-option  label="一年" value="7" ></el-option>
                    
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <el-form-item prop="timeStart" label-width="0">
                  <el-date-picker size="mini" :default-value="form.timeStart" type="date"   value-format="yyyy-MM-dd" v-model="form.timeStart" style="width: 90px;"></el-date-picker>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <el-form-item prop="timeEnd" label-width="0">
                  <el-date-picker size="mini" :default-value="form.timeEnd" type="date"   value-format="yyyy-MM-dd" v-model="form.timeEnd" style="width: 90px;"></el-date-picker>
                </el-form-item>
              </div>
              <!-- <div class="left" style="padding-left: 40px;" >
                <span class="des-word" >操作人</span>
              </div>
              <div class="left padding-l-2" >
                <el-form-item  label-width="0">
                  <el-select    style="width:100px;"  v-model="form.departdefault" @change='selectChangemethods(form.departdefault)'>
                    <el-option v-for="ii in departdata" :label="ii.name" :value="ii.id"  style="width: 100px;"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <el-form-item  label-width="0">
                  <el-select    style="width:100px;"  v-model="form.departpersondefault">
                    <el-option v-for="item in departpersondata" :label="item.name" :value="item.id"  style="width: 100px;"></el-option>
                  </el-select>
                </el-form-item>
              </div> -->
              <div class="left " style="padding-left:100px;"  >
                <el-form-item prop="word" label-width="0">
                  <el-input v-model.trim="form.word" :title="thistitle" maxlength="30" style="width:200px;"  autocomplete="off" ></el-input>
                </el-form-item>
              </div>
              <div class=" left padding-l-5" style="margin-top:2px;"  >
                <i class="search-btn" @click="searchtableList">查询</i>
              </div>

              <div class="left " style="margin-top:3px;"  >
                <i class="claerlys" @click="clearForm" ></i>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="params-content clear">
        <div class="left-tree-content left">
          <el-tree 
            :data="data"
            v-if="openOrNot"
            :props="defaultProps"
            @node-click="getparamTrees"
            :highlight-current="true"
            style="font-size: 13px !important;"
            :default-expand-all="false"
            :filter-node-method="filterNode"
            node-key="navId"
            ref="tree"
            :expand-on-click-node="true"
          >
          </el-tree>
        </div>
        <div class="right-list-content left">
          <div class="list-content" >
            <PlTable
              :datas="tableData"
              :pagination-show="false"
              empty-text=" "
              border
              use-virtual
              height="100%"
              :row-class-name="tableRowClassName"
              @header-click="selectionChange"
              @selection-change="handleSelectionChange"
              @row-click="getRowDataByClick"
              :row-height="rowHeight"
              :cell-class-name="rowClass"
              :cell-style="cellStyle"
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
                </pl-table-column>
              </template>
            </PlTable>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex';
  import { recyclefindRecycleList,recycledelete,recyclerecovery } from "../../../service/operationlogandrecyclebin";
  import { PlTable, PlTableColumn } from 'pl-table';
  import { mynavdata } from "../../../utils/operationlogandrecyclebin";
  import {odeparttree2,departperson} from "../../../service/organizeDate";
  import {quickDate} from '../../../utils/getQuickDate';
    export default {
      name: "paramsBase",
      data() {
          return {
              form:{
                timeStart:'',
                timeEnd:'',
                word:'',
                type:'',
              },
              formdepart:{
                state:"常态",
                type:'实',
                name:'',
              },
              departdata:[{id:'-1',name:'全部',select:true}],
              departpersondata:[{id:'-1',name:'全部',select:true}],
              openOrNot: true,
              input: '', //输入框
              tableData: [],
              multipleSelection:[],
              currentPage:'',
              currentNum:0,
              rowHeight:37,
              columnData:[],
              data: mynavdata.recycledata,
              defaultProps: {
                  id:'navId',
                  children: 'children',
                  label: 'label',
                  disabled:'navOffOn'
              },
              quick:'6',
              thistitle:''
          };
      },
      components: {
        PlTable, 
        PlTableColumn
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
        selectionChange(column, event){

        },
        rowClass({row, index}) {

        },
        cellStyle({row, column, rowIndex, columnIndex}){

        },
        // getparamsdata(){
        //   let _this = this;
        //   _this.$layer.loading({
        //     shade: true,//是否显示遮罩
        //   });
        //   let formdepart = JSON.parse(JSON.stringify(_this.formdepart));
        //   odeparttree2(formdepart).then(function (response) {

        //     _this.$layer.closeAll('loading');
        //     if(response.status == 500){
        //       return false;
        //     }else if(response.status == 0){
        //       _this.getQuickDate(6);
        //       let data = response.data;
        //       if(data){
        //         let initArr = [{id:'-1',name:'全部',select:true}];
        //         data.forEach(item=>{
        //           initArr.push({
        //             id:item.id,
        //             name:item.label.replace(/&nbsp;/g, ""),
        //             select:false
        //           })
        //         })
        //         _this.departdata = initArr;
        //         _this.form.departdefault = '-1';
        //         _this.form.departpersondefault = '-1';
        //       }
        //     }else if(response.status == 1){
        //       _this.myAlert(response.msg+"！");
        //     }
        //   })
        // },
        getparamTrees(val){
          console.log(val);
          this.tableData = [];
          if(val.children==undefined){
            console.log('111');
            this.form.type = val.label;
            if(val.label == '租售列表'){
              this.columnData = mynavdata.recyclethead_RentalList;
              this.thistitle = '删除人/房源编号';
            }else
            if(val.label == '钥匙管理'){
              this.columnData = mynavdata.recyclethead_KeyManagement;
              this.thistitle = '删除人';
            }else
            if(val.label == '项目列表'){
              this.columnData = mynavdata.recyclethead_ProjectList;
              this.thistitle = '删除人/项目名称';
            }else
            if(val.label == '户型列表'){
              this.columnData = mynavdata.recyclethead_HouseType;
              this.thistitle = '删除人/户型名称';
            }else
            if(val.label == '报备列表'){
              this.columnData = mynavdata.recyclethead_ReportList;
              this.thistitle = '删除人/报备编号';
            }else
            if(val.label == '销售管理'){
              this.columnData = mynavdata.recyclethead_SalesManagement;
              this.thistitle = '删除人/认购编号';
            }else
            if(val.label == '平台公司'){
              this.columnData = mynavdata.recyclethead_PlatformCompany;
              this.thistitle = '删除人/平台公司名称';
            }else
            if(val.label == '销售公司'){
              this.columnData = mynavdata.recyclethead_SaleCompany;
              this.thistitle = '删除人/销售公司名称';
            }else
            if(val.label == '客源列表'){
              this.columnData = mynavdata.recyclethead_ListCustomers;
              this.thistitle = '删除人/客源编号';
            }else
            if(val.label == '交易合同'){
              this.columnData = mynavdata.recyclethead_TransactionContract;
              this.thistitle = '删除人/合同编号';
            }else
            if(val.label == '合同财务'){
              this.columnData = mynavdata.recyclethead_ContractFinance;
              this.thistitle = '删除人/合同名称';
            }else
            if(val.label == '部门'){
              this.columnData = mynavdata.recyclethead_department;
              this.thistitle = '删除人/部门名称';
            }else
            if(val.label == '人员'){
              this.columnData = mynavdata.recyclethead_personnel;
              this.thistitle = '删除人/人员姓名';
            }else
            if(val.label == '职位'){
              this.columnData = mynavdata.recyclethead_position;
              this.thistitle = '删除人/职位编号/职位名称';
            }else
            if(val.label == '任务管理'){
              this.columnData = mynavdata.recyclethead_taskManagement;
              this.thistitle = '删除人/任务概念';
            }else
            if(val.label == '考勤明细'){
              this.columnData = mynavdata.recyclethead_AttendanceDetails;
              this.thistitle = '删除人/人员姓名';
            }else
            if(val.label == '奖罚明细'){
              this.columnData = mynavdata.recyclethead_DetailsPunishments;
              this.thistitle = '删除人/人员姓名';
            }else
            if(val.label == '险金明细-保险'){
              this.columnData = mynavdata.recyclethead_DetailsPremium_Insurance;
              this.thistitle = '删除人/人员姓名';
            }else
            if(val.label == '险金明细-公积金'){
              this.columnData = mynavdata.recyclethead_DetailsPremium_accumulationFund;
              this.thistitle = '删除人/人员姓名';
            }else
            if(val.label == '提金明细'){
              this.columnData = mynavdata.recyclethead_DetailsWithdrawal;
              this.thistitle = '删除人/人员姓名';
            }else
            if(val.label == '工资明细'){
              this.columnData = mynavdata.recyclethead_SalaryDetails;
              this.thistitle = '删除人/人员姓名';
            }else
            if(val.label == '收支管理'){
              this.columnData = mynavdata.recyclethead_RevenueEexpenditureManagement;
              this.thistitle = '删除人/流水号/事件';
            }else
            if(val.label == '消耗管理'){
              this.columnData = mynavdata.recyclethead_ConsumptionManagement;
              this.thistitle = '删除人/人员';
            }else
            if(val.label == '内部钥匙'){
              this.columnData = mynavdata.recyclethead_InternalKey;
              this.thistitle = '删除人/钥匙名称';
            }else
            if(val.label == '外联明细'){
              this.columnData = mynavdata.recyclethead_OutreachDetails;
              this.thistitle = '删除人/外联名称';
            }else
            if(val.label == '行政记录'){
              this.columnData = mynavdata.recyclethead_AdministrativeRecords;
              this.thistitle = '删除人/事件记录';
            }else
            if(val.label == '地域字典'){
              this.columnData = mynavdata.recyclethead_RegionalDictionary;
              this.thistitle = '删除人/地域名称';
            }else
            if(val.label == '楼盘'){
              this.columnData = mynavdata.recyclethead_PropertiesForSale;
              this.thistitle = '删除人/楼盘字典';
            }else
            if(val.label == '物业主'){
              this.columnData = mynavdata.recyclethead_PropertyOwner;
              this.thistitle = '删除人/物业主名称(简)';
            }else
            if(val.label == '学校字典'){
              this.columnData = mynavdata.recyclethead_SchoolDictionary;
              this.thistitle = '删除人/学校名称';
            }

            this.searchtableList();
          }
        },
        // selectChangemethods(val){
        //   let _this = this;
        //   if(form.timeStart==null||form.timeStart=="null"){
        //     form.timeStart = '';
        //   }
        //   if(form.timeEnd==null||form.timeEnd=="null"){
        //     form.timeEnd = '';
        //   };
        //   _this.$layer.loading({
        //     shade: true,//是否显示遮罩
        //   });
        //   departperson(val).then(function (response) {
        //     _this.$layer.closeAll('loading');
        //     if (response.status == 500) {
        //       return false;
        //     } else if (response.status == 0) {
        //       let data = response.data;
        //       let user = data.user;
        //       user = [{id:'-1',name:"全部",select:true}].concat(user);
        //       _this.departpersondata = user;
        //       _this.form.departpersondefault = '-1';
        //     } else if (response.status == 1) {
        //       let message = response.msg;
        //       _this.myAlert(message + "！");
        //     }
        //   })
        // },
        searchtableList(){
          let _this = this;
          let form = JSON.parse(JSON.stringify(_this.form));
          if(form.types==''){
            _this.myAlert("请选择需要查询的相关操作日志!", "dangerous-icon");
            return false;
          }
          _this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          recyclefindRecycleList(form).then(function (response) {
            _this.$layer.closeAll('loading');
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              _this.tableData = data;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        },
        clearForm(){
          let _this = this;
          _this.quick = '6';
          _this.getQuickDate(6);
          _this.form.word = '';
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
        //恢复
        recoveryData(){
          let _this = this;
          let ids = _this.multipleSelection;
          if(ids.length != 0){
            _this.myConfirm("提示：确定要恢复选定的数据吗？","question-icon",'是','否',"").then(res => {
              _this.recoveryDataSuccess();
            }).catch(err => {

            })
          }else{
            _this.myAlert("请选择要恢复的数据！")
          }
        },
        recoveryDataSuccess(){
          let _this = this;
          let deleted = 1;
          let form = {
            ids: _this.multipleSelection.toString(),
            type:_this.form.type
          };
          recyclerecovery(form).then(function (response) {
            if(response.status == 500){
              return false;
            }else if(response.status == 0){
              let data = response.data;
              _this.currentNum = 0;
              _this.myAlert("恢复成功",'success-icon').then(res => {
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
        //删除
        deletedSalaryDetails(){
          let _this = this;
          let ids = _this.multipleSelection;
          if(ids.length != 0){
            _this.myConfirm("警告：永久删除将不能被恢复！","question-icon",'是','否',"确定要删除选定记录吗？").then(res => {
              _this.deletedIMSuccess();
            }).catch(err => {

            })
          }else{
            _this.myAlert("请选择要删除的操作记录！")
          }

        },
        //删除数组中指定元素
        deletArrByValue(arr,id){
          return arr.filter(function(item){return item.id != id })
        },
        deletedIMSuccess(){
          let _this = this;
          let deleted = 1;
          let form = {
            ids: _this.multipleSelection.toString(),
            type:_this.form.type
          };
          recycledelete(form).then(function (response) {
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
        getRowDataByClick (row, column, event) {
          let _this = this;
          _this.currentNum =  row.index + 1;
          _this.currentPage = row;
        },
        //全选
        handleSelectionChange(elemCheckbox){
          let _this = this;
          //获取用户的选中
          _this.multipleSelection = [];
          elemCheckbox.forEach(item => {
            _this.multipleSelection.push(item.id);
          });
          _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
        },
        tableRowClassName ({row, rowIndex}) {
          row.index = rowIndex;
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
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
      mounted(){
        // this.getparamsdata();
        this.getQuickDate(6);
      }
    }
</script>

<style lang="scss" scoped>

  /deep/ .el-tree-node__label {
    font-size: 12px;
  }
  .el-tree{
    min-width: 100%;
    display: inline-block;
    background-color: #EEEEEE;
  }
  .params {
    height:100%;
    font-size: 12px;
    .top-container {
      height: 66px;
      width: calc(100% - 20px);
      margin: 0px auto 0px;
      .search-container {
        width: calc(100% + 2px);
        height: 28px;
        .delete-icon{
          cursor:pointer;
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(../../../images/custom-icon.png) -160px -527px;
        }
        .recovery-icon{
          cursor:pointer;
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url(../../../images/custom-icon.png) -130px -528px;
        }
        .item{
          line-height:20px;
          padding-left:15px;
          cursor:pointer;
          span{
            line-height:20px;
          }
          .cut-icon {
            background: url(../../../images/system/fenge.png) -100px -90px;
            width: 3px;
            height: 23px;
            display: block;
          }
          .back-icon{
            background:url(../../../images/system/tuichu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .user{
            margin-top:2px;
            font-size: 12px;
            color: #767575;
          }
          .cut{
            font-size: 12px;
            color: #C9C9C9;
          }
        }
      }
    }
    .params-content{
      width: calc(100% - 20px);
      margin: 7px auto 0px;
      height:calc(100% - 86px);
      .left-tree-content{
        width:180px;
        height:100%;
        margin-right:10px;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
        background-color: #EEEEEE;
        overflow:auto;
      }
      .right-list-content{
        width:calc(100% - 190px);
        height:100%;
      }
    }
  }
  .border-black{
    border:1px solid #6B6B6B;
    border-radius:5px;
  }

  .border-white{
    border:1px solid #fff;
    border-radius:5px;
  }

  .el-table__header-wrapper{
    background-color: rgba(192, 192, 192, 1) !important;
  }
  .el-table{
    background-color: rgba(192, 192, 192, 1) !important;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: rgba(192, 192, 192, 1) !important;
  }
  /deep/ .el-table,.el-table__expanded-cell {
    height: 100% !important;
  }
  /deep/ .list-content{
      height:100%!important;
      width: 100%;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      border-radius:5px;
      .plTableBox{
         height:100%!important;
         .ant-table-scroll{
           max-height:100%!important;
           .el-table{
             height:100%!important;
           }
         }
      }
    }
  /deep/ .plTableBox .el-table .el-table__header th{
    background-color: #DCD9D3;
  }
  /deep/ .right-list-content .el-table th .cell .el-checkbox__input .el-checkbox__inner:after{
    border-color: #000;
  }
  /*/deep/ .el-table__body-wrapper{
    height: calc(100% - 0px);
    overflow: auto;
  }*/
</style>
