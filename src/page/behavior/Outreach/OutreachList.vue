<template>
  <div class="page-container mycontailerclass1"  id="InsuranceMoney-container" >
    <div class="top-container border-black" >
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <div class="item left padding-l-10 clear"  @click="addOutreach" >
            <div class="border-icon clear" > 
              <div class="left" style="margin-right: 3px;margin-top: 5px;" >
                <i class="six-eleven-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >新增</span>
              </div>
            </div>  
          </div>

          <div class="item left clear padding-l-10" @click="deletedOutreachList">
            <div class="border-icon clear" > 
              <div class="left"  style="margin-right: 3px;margin-top: 6px;">
                <i class="six-ten-icon"  ></i>
              </div>
              <div class="left"  >
                <span class="search-word" >删除</span>
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
            <i class="cut-icon"></i>
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
              <i class="back-icon user left" @click="tabRemove('/home/OutreachList')" ></i>
            </div>
          </div>

        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear">
            <div class="left" style="padding-left: 10px;" >
              <span class="des-word" >日期</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-select   style="width:100px;"  v-model="mydateDefault" @change='selectChangemethods'>
                  <el-option v-for="item in mydate" :label="item.name" :value="item.id"  style="width: 100px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeStart" label-width="0">
                <el-date-picker size="mini" type="date"  value-format="yyyy-MM-dd" v-model="form.timeStart" style="width: 100px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeEnd" label-width="0">
                <el-date-picker size="mini" type="date"  value-format="yyyy-MM-dd" v-model="form.timeEnd" style="width: 100px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left" style="padding-left: 15px;">
              <span class="des-word" >类型</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <CheckSelect :selectId="stateIds" :listData="mytype" style="width:100px;" ></CheckSelect>
              </el-form-item>
            </div>
            <div class="left padding-l-15" style="padding-left:15px" >
              <span class="des-word" >负责人</span>
            </div>

            <div class="left">
              <el-form-item label label-width="0" prop="executorId">
                <CheckSelectSpecial
                  @findStreetByTown="finUserByDepart"
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
                  :listData="departParams"
                  style="width:96px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left " style="padding-left:15px;"  >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.words" title="外联名称/姓名/电话/备注"  maxlength="30" style="width:200px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-5" style="margin-top:2px;"  >
              <i class="search-btn" @click="searchInsuranceMoneyList">查询</i>
            </div>

            <div class="left " style="margin-top:3px;"  >
              <i class="claerlys" @click="clearForm" ></i>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear" style="height: calc(100% - 83px);" >


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
              v-else-if="item.prop == 'organizationName'"
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
                <div class="findparentclass" style="color:#336699;cursor:pointer;font-weight: bold;" @click="editorOutreach(scope.$index, scope.row)" >
                  {{ scope.row.organizationName }}
                </div>
              </template>
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

            </pl-table-column>
          </template>
        </PlTable>
      </div>
      
    </div>
  </div>
</template>


<script>
  // 获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {externalConnectiongetWparam,externalConnectionfindConnectionlist,externalConnectiondeleteConnection} from "../../../service/OutreachList";
  import {findUserByDepartId} from "../../../service/organizeDate";

  // 表头数据
  import { Outreachlistmythead } from "../../../utils/Outreach"

  // 新增外联
  import newAddOutreachpage from "./newAddOutreach";

  // 修改外联
  import EditorOutreachPage from "./Outreachdetail"
  // 自选列
  import ColumPage from '../../../components/column'
  import CheckSelect from '../../../components/check'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import { PlTable, PlTableColumn } from 'pl-table';
  import {quickDate} from '../../../utils/getQuickDate';

  export default {
    data() {
      return {
        mytype:[],
        mydate: [
          {
            id: 1,
            name: "预办日",
            select: false
          },
          {
            id: 2,
            name: "创建日",
            select: false
          },
          {
            id: 3,
            name: "事件日",
            select: false
          }
        ],
        form:{
          words:'',
          timeStart:'',
          timeEnd:''
        },

        stateIds:'stateIds',
        departId:'departId',
        executorId: "executorId",
        mydateDefault:1,
        executorList: [],
        departParams:[],
        

        platformCompanyValue:false,
        columnValue:false,
        currentNum:0,
        rowHeight:27,
        culumnTitle:'外联明细',
        sessionStr:'OutreachList-list',
        tableData:[],
        currentPage:'',       
        multipleSelection:[],
        columnData:Outreachlistmythead.OutreachlistThead,
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
      };
    },
    components:{
      PlTable,
      PlTableColumn,
      ColumPage,
      CheckSelect,
      CheckSelectSpecial,
      newAddOutreachpage,
      EditorOutreachPage
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
      changeToAccumulationFund(){
        this.$router.push('/home/AccumulationFund');
      },
      selectChangemethods(){

      },
      getParamsData(){
        let _this = this;
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        externalConnectiongetWparam().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.getQuickDate(19);
            let data = response.data;
            let initArr = [{id:"-1",name:"全部",select:true}];

            if(data.externalParams){
              _this.mytype = initArr.concat(data.externalParams);
            }

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
            _this.departParams = [{id:'-1',name:"全部",select:true}];
            _this.searchInsuranceMoneyList();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      searchInsuranceMoneyList(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
        
        form.timeType = _this.mydateDefault;

        let mytype = _this.getSelectIdByList(_this.mytype);
        form.cotypes = mytype.toString();

        let executorList = _this.getSelectIdByList(_this.executorList);
        form.deptIds = executorList.toString();

        let departParams = _this.getSelectIdByList(_this.departParams);
        form.userIds = departParams.toString();

        form.words = _this.form.words;
        if(form.timeStart==null||form.timeStart=="null"){
          form.timeStart = '';
        }
        if(form.timeEnd==null||form.timeEnd=="null"){
          form.timeEnd = '';
        };
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        externalConnectionfindConnectionlist(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.currentNum = 0;
            let data = response.data;
            _this.tableData = data.connectelist;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },


      finUserByDepart(){
        let _this = this;
        let id = _this.getSelectIdByList(_this.executorList);
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            _this.$layer.closeAll('loading');
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
             
              _this.departParams = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.departParams = [{id:'-1',name:"全部",select:true}];
        }
      },
      //新增
      addOutreach(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: newAddOutreachpage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['600px','400px'],
          title: "新增外联",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
            _this.searchInsuranceMoneyList();
          }
        });
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      //修改
      editorOutreach(index, row){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorOutreachPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{myid:row.id,mythisindex:index}//props
          },
          area:['600px','400px'],
          title:"外联修改 【" + row.organizationName + "】",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            // _this.searchInsuranceMoneyList();
            if( _this.initLeft != 0){
              _this.initLeft -= 10;
              _this.initTop -= 30;
            }
          }
        });
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      // 过滤选中
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

      //删除项目
      deletedOutreachList(){
        let _this = this;
        let id = _this.multipleSelection;
        if(id.length != 0){
          _this.myConfirm("警告：确定要将外联放入回收站吗?","question-icon",'是','否',"").then(res => {
            _this.deletedIMSuccess();
          }).catch(err => {

          })
        }else{
          _this.myAlert("请选择要删除的外联记录！")
        }
      },

      deletedIMSuccess(){
        let _this = this;
        let deleted = 1;
        let id = _this.multipleSelection.toString();
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        externalConnectiondeleteConnection(id,deleted).then(function (response) {
          _this.$layer.closeAll('loading');
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
      clearForm(){
        let _this = this;
        _this.getQuickDate(19);
        _this.form.words = '';
        _this.mytype = _this.backSlect(_this.mytype);
        _this.useParamsdefault = '-1';
        _this.executorList = _this.backSlect(_this.executorList);
        _this.departParams = _this.backSlect(_this.departParams);
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
          export_json_to_excel(tHeader, data, '外联明细')
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
        let _this = this;
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
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
      },
      changeTitle(count,needlayerid,upordown){
        let _this = this;
        let mycountnum = count;
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "外联修改 【"+ _this.tableData[mycountnum].organizationName + "】";
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
      this.getParamsData();
      this.reloadListByStorage();
    },
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-table,.el-table__expanded-cell {
    height: 100% !important;
  }
  /deep/ .usertdstyle .pl-table-beyond{
    height: 100%;
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
    .content{
      height: calc(100% - 120px);
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
   /deep/.list-content .el-table .el-table__body-wrapper{
    height: calc(100vh - 163px) !important;
     .el-table__virtual-wrapper{
       height:100% !important;
     }
  }
  /deep/ .plTableBox .el-table .el-table__header th{
    background-color: #DCD9D3;
  }
</style>
