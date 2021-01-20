<template>
    <div class="params mycontailerclass1">
      <div class="top-container " >
        <div class="">
          <el-form ref="formsData"  :model="form" >
            <div class="clear search-container mycontailerclass2" style="height: 28px;">
              <div class="left" @click="deletedSalaryDetails">
                <div class="left border-icon"  style="margin: 0px 10px;">
                  <span class="search-word left" >删除</span>
                  <i class="delete-icon left"  style="margin-left: 10px;"></i>
                </div>
              </div>
              <div class="left" >
                <i class="cut-icon cut"></i>
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
              <div class="item left clear" @click="tabRemove('/home/operationlog')" >
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
                <el-form-item prop="TimeStart" label-width="0">
                  <el-date-picker size="mini" :default-value="form.TimeStart" type="date"   value-format="yyyy-MM-dd" v-model="form.TimeStart" style="width: 100px;"></el-date-picker>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <el-form-item prop="TimeEnd" label-width="0">
                  <el-date-picker size="mini" :default-value="form.TimeEnd" type="date"   value-format="yyyy-MM-dd" v-model="form.TimeEnd" style="width:100px;"></el-date-picker>
                </el-form-item>
              </div>
              <div class="left" style="padding-left: 40px;" >
                <span class="des-word" >操作人</span>
              </div>
              <div class="left padding-l-2" >
                <el-form-item  label-width="0">
                  <el-select    style="width:100px;"  v-model="form.deptId" @change='selectChangemethods(form.deptId)'>
                    <el-option v-for="ii in departdata" :label="ii.name" :value="ii.id"  style="min-width: 100px;">
                      <span :class="{padding1:ii.level == 1,padding2:ii.level == 2,padding3:ii.level == 3,padding4:ii.level == 4,padding5:ii.level == 5,}" >{{ii.name}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <el-form-item  label-width="0">
                  <el-select    style="width:100px;"  v-model="form.userId">
                    <el-option v-for="item in departpersondata" :label="item.name" :value="item.id"  style="width: 100px;"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left " style="padding-left:20px;"  >
                <el-form-item prop="word" label-width="0">
                  <el-input v-model.trim="form.words" title="操作人/操作内容" maxlength="30" style="width:200px;"  autocomplete="off" ></el-input>
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
              @row-click="getRowDataByClick"
              @selection-change="handleSelectionChange"
              :cell-class-name="rowClass"
              :row-height="rowHeight"
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
  import { operationrecorddelteOprecord,operationrecordrecordList } from "../../../service/operationlogandrecyclebin";
  import { PlTable, PlTableColumn } from 'pl-table';
  import { mynavdata } from "../../../utils/operationlogandrecyclebin";
  import {departTree2,departperson} from "../../../service/organizeDate";
  import {quickDate} from '../../../utils/getQuickDate';
    export default {
      name: "paramsBase",
      data() {
          return {
              form:{
                TimeStart:'',
                TimeEnd:'',
                deptId:'全部',
                userId:'全部',
                words:'',
                types:'',
              },
              formdepart:{
                state:"常态",
                type:'主',
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
              columnData:mynavdata.operationlogthead,
              data: mynavdata.navdata,
              defaultProps: {
                  id:'navId',
                  children: 'children',
                  label: 'label',
                  disabled:'navOffOn'
              },
              quick:'6'
          };
      },
      components: {
        PlTable, 
        PlTableColumn
      },
      
      methods:{
        getQuickDate(value){
          let time = quickDate.getTwoDateByDay(value);
          this.form.TimeStart = time.startTime;
          this.form.TimeEnd = time.endTime;
          if(value != 1){
            this.timeDisabled = true;
          }else{
            this.timeDisabled = false;
          }
        },
        rowClass({row, index}) {

        },
        cellStyle({row, column, rowIndex, columnIndex}){

        },
        getparamsdata(){
          let _this = this;
          _this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          let formdepart = JSON.parse(JSON.stringify(_this.formdepart));
          departTree2(formdepart).then(function (response) {

            _this.$layer.closeAll('loading');
            if(response.status == 500){
              return false;
            }else if(response.status == 0){
              _this.getQuickDate(6);
              let data = response.data;
              if(data){
                let initArr = [{id:'-1',name:'全部',select:true}];
                data.forEach(item=>{
                  initArr.push({
                    id:item.id,
                    name:item.label.replace(/&nbsp;/g, ""),
                    select:false,
                    level:item.level
                  })
                })
                _this.departdata = initArr;
                _this.form.deptId = '-1';
                _this.form.userId = '-1';
              }
            }else if(response.status == 1){
              _this.myAlert(response.msg+"！");
            }
          })
        },
        getparamTrees(val){
          console.log(val);
          if(val.children==undefined){
            console.log('111');
            this.form.types = val.label;
            this.tableData = [];
            this.searchtableList();
          }
        },
        selectChangemethods(val){
          let _this = this;
          if(_this.form.TimeStart==null||_this.form.TimeStart=="null"){
            _this.form.TimeStart = '';
          }
          if(_this.form.TimeEnd==null||_this.form.TimeEnd=="null"){
            _this.form.TimeEnd = '';
          };
          _this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          departperson(val).then(function (response) {
            _this.$layer.closeAll('loading');
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              user = [{id:'-1',name:"全部",select:true}].concat(user);
              _this.departpersondata = user;
              _this.form.userId = '-1';
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        },
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
          operationrecordrecordList(form).then(function (response) {
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
          _this.getQuickDate(6);
          _this.form.deptId = '-1';
          _this.form.userId = '-1';
          _this.form.words = '';
        },
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
        deletedSalaryDetails(){
          let _this = this;
          let ids = _this.multipleSelection;
          if(ids.length != 0){
            _this.myConfirm("警告：操作记录删除后将不能还原！","question-icon",'是','否',"确定要删除选定记录吗？").then(res => {
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
          let ids = _this.multipleSelection.toString();
          console.log(ids);
          operationrecorddelteOprecord(ids).then(function (response) {
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
        this.getparamsdata();
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
    height: calc(100% - 28px);
    overflow: auto;
  }*/
</style>
