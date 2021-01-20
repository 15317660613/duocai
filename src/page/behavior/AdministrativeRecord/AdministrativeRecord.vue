<template>
  <div class="page-container mycontailerclass1"  id="InsuranceMoney-container" >
    <div class="top-container border-black" >
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <div class="item left padding-l-10 clear"  @click="newAddRecordfunc" >
            <div class="border-icon clear" > 
              <div class="left"  style="margin-right: 3px;margin-top: 5px;">
                <i class="six-eleven-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >新增</span>
              </div>
            </div>  
          </div>

          <div class="item left clear padding-l-10" @click="deletedOutreachList">
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="six-ten-icon"  style="margin-right: 3px;margin-top: 6px;"></i>
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
              <i class="back-icon user left" @click="tabRemove('/home/AdministrativeRecord')" ></i>
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
                <el-select    style="width:100px;"  v-model="form.timeType" @change='selectChangemethods'>
                  <el-option v-for="item in mydate" :label="item.name" :value="item.id"  style="width: 100px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeStart" label-width="0">
                <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="form.timeStart" style="width: 100px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeEnd" label-width="0">
                <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="form.timeEnd" style="width: 100px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left" style="padding-left: 15px;">
              <span class="des-word" >类型</span>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="stateIds">
                <CheckSelectSpecial
                  :selectId="stateIds"
                  :listData="retypes"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" style="padding-left:15px" >
              <span class="des-word" >行政人</span>
            </div>

            <div class="left">
              <el-form-item label label-width="0" prop="executorIdone">
                <CheckSelectSpecial
                  @findStreetByTown="finUserByDepartone"
                  :selectId="executorIdone"
                  :listData="adeptIds"
                  style="width:110px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="departIdone">
                <CheckSelectSpecial
                  :selectId="departIdone"
                  :listData="auserIds"
                  style="width:96px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" style="padding-left:15px" >
              <span class="des-word" >执行人</span>
            </div>

            <div class="left">
              <el-form-item label label-width="0" prop="executorIdtwo">
                <CheckSelectSpecial
                  @findStreetByTown="finUserByDeparttwo"
                  :selectId="executorIdtwo"
                  :listData="edeptIds"
                  style="width:110px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="departId2">
                <CheckSelectSpecial
                  :selectId="departId2"
                  :listData="euserIds"
                  style="width:96px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left " style="padding-left:15px;"  >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.words" title="事件记录/备注" maxlength="30" style="width:200px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-5" style="margin-top:2px;"  >
              <i class="search-btn" @click="searchThisTableList">查询</i>
            </div>

            <div class="left " style="margin-top:3px;"  >
              <i class="claerlys" @click="clearForm" ></i>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear" >


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
              v-else-if="item.prop == 'event'"
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
                  {{ scope.row.event }}
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
  import {administrativegetAdparam,administrativefindAdrecordlist,administrativedeletere} from "../../../service/AdministrativeRecord";
  import {findUserByDepartId} from "../../../service/organizeDate";

  // 表头数据
  import { AdministrativeRecorddata } from "../../../utils/AdministrativeRecord"

  // 新增记录
  import newAddRecordpage from "./newAddRecord";

  // 修改记录
  import EditorRecordPage from "./EditorRecord";

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
            id: '1',
            name: "录入日",
            select: false
          },
          {
            id: '2',
            name: "发出日",
            select: false
          },
          {
            id: '3',
            name: "收回日",
            select: false
          }
        ],
        form:{
          words:'',
          timeStart:'',
          timeEnd:'',
          timeType:'1',
          
        },
        retypes:[],
        stateIds:'stateIds',
        departIdone:'departIdone',
        departId2:'departId2',
        executorIdone: "executorIdone",
        executorIdtwo: "executorIdtwo",
        mydateDefault:-1,
        adeptIds:[],
        edeptIds:[],
        auserIds:[],
        euserIds:[],

        platformCompanyValue:false,
        columnValue:false,
        currentNum:0,
        rowHeight:27,
        culumnTitle:'行政记录',
        sessionStr:'OutreachList-list',
        tableData:[],
        currentPage:'',       
        multipleSelection:[],
        columnData:AdministrativeRecorddata.AdministrativeRecordThead,
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
      newAddRecordpage,
      EditorRecordPage
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
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        administrativegetAdparam().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.getQuickDate(19);
            let data = response.data;
            let initArr = [{id:"-1",name:"全部",select:true}];

            if(data.recordParams){
              _this.retypes = initArr.concat(data.recordParams);
            };

            if (data.departTree) {
              let arrone = [{ id: "-1", name: "全部", select: true }];
              let arrtwo = [{ id: "-1", name: "全部", select: true }];
              let treeData = data.departTree;
              for (let i = 0; i < treeData.length; i++) {
                arrone.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  select: false,
                  state:treeData[i].state,
                });
                arrtwo.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  select: false,
                  state:treeData[i].state,
                });
              }
              _this.adeptIds = arrone;
              _this.edeptIds = arrtwo;
              let myauserIds = [{ id: "-1", name: "全部", select: true }];
              let myeuserIds = [{ id: "-1", name: "全部", select: true }];
              _this.auserIds = myauserIds;
              _this.euserIds = myeuserIds;
            }

            _this.searchThisTableList();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      searchThisTableList(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));

        let retypes = _this.getSelectIdByList(_this.retypes);
        form.retypes = retypes.toString();

        let adeptIds = _this.getSelectIdByList(_this.adeptIds);
        form.adeptIds = adeptIds.toString();

        let auserIds = _this.getSelectIdByList(_this.auserIds);
        form.auserIds = auserIds.toString();

        let edeptIds = _this.getSelectIdByList(_this.edeptIds);
        form.edeptIds = edeptIds.toString();

        let euserIds = _this.getSelectIdByList(_this.euserIds);
        form.euserIds = euserIds.toString();

        if(form.timeStart==null||form.timeStart=="null"){
          form.timeStart='';
        }
        if(form.timeEnd==null||form.timeEnd=="null"){
          _this.form.timeEnd='';
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        administrativefindAdrecordlist(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.currentNum = 0;
            let data = response.data;
            _this.tableData = data.recordlist;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },


      finUserByDepartone(){
        let _this = this;
        let id = _this.getSelectIdByList(_this.adeptIds);
        this.$layer.loading({
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
              let arr  = [{id:'-1',name:"全部",select:true}];
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
              _this.auserIds = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.auserIds = [{id:'-1',name:"全部",select:true}];
        }

      },
      finUserByDeparttwo(){
        let _this = this;
        let id = _this.getSelectIdByList(_this.edeptIds);
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr  = [{id:'-1',name:"全部",select:true}];
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
              _this.euserIds = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.euserIds = [{id:'-1',name:"全部",select:true}];
        }

      },

      //新增
      newAddRecordfunc(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: newAddRecordpage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['600px','400px'],
          title: "新增记录",
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
      //修改
      editorOutreach(index, row){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorRecordPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{myid:row.id,mythisindex:index}//props
          },
          area:['600px','400px'],
          title:"记录修改 【" + row.event +"】",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            if( this.initLeft != 0){
              this.initLeft -= 10;
              this.initTop -= 30;
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
      platformCompanyShow(){
        this.$refs.plaformCompany.showDialog();
      },
      reloadProjectList(type){
        if(type == 1){
          this.searchThisTableList();
        }else if(type == 2){

        }
      },

      //删除项目
      deletedOutreachList(){
        let _this = this;
        let id = _this.multipleSelection;
        if(id.length != 0){
          _this.myConfirm("警告：行政记录删除后不能还原！","question-icon",'是','否',"确定要永久删除选定的行政记录吗？").then(res => {
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
        administrativedeletere(id,deleted).then(function (response) {
          _this.$layer.closeAll("loading");
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            _this.currentNum = 0;
            let data = response.data;

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
        _this.form.timeType = '1';
        _this.retypes = _this.backSlect(_this.retypes);
        
        _this.adeptIds = _this.backSlect(_this.adeptIds);
        _this.auserIds = [{id:'-1',name:"全部",select:true}];
        _this.edeptIds = _this.backSlect(_this.edeptIds);
        _this.euserIds = [{id:'-1',name:"全部",select:true}];
        
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
      changeTitle(count,needlayerid,upordown){
        let _this = this;
        let mycountnum = count;
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "记录修改 【" + _this.tableData[mycountnum].event +"】";
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
    watch:{

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
   /deep/ .el-table .el-table__body-wrapper{
    height: calc(100vh - 167px) !important;
     .el-table__virtual-wrapper{
       height:100% !important;
     }
  }
  /deep/ .plTableBox .el-table .el-table__header th{
    background-color: #DCD9D3;
  }
</style>
