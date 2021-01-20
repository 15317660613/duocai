<template>
  <div class="page-container mycontailerclass1">
    <div class="top-container border-black" >
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <!-- <label> -->
            <div class="left padding-l-15"  >
              <el-radio  @change="changeToOtherPage" v-model="oneORtwo" :label="1">&nbsp;</el-radio>
            </div>
            <div class="left" >
              按人员
            </div>
          <!-- </label> -->
          <!-- <label> -->
            <div class="left padding-l-10" >
              <el-radio  v-model="oneORtwo" :label="2">&nbsp;</el-radio>
            </div>
            <div class="left" >
              按钥匙
            </div>
          <!-- </label> -->
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left padding-l-10 clear">
            <div class="left border-icon">
              <i class="six-eleven-icon left" style="margin-top: 5px;margin-right: 3px;" @click="addInternalKey"></i>
              <span class="search-word">新增</span>
            </div>
          </div>
          <div class="item left clear padding-l-10" @click="deletedRecordfunc">
            <div class="left border-icon">
              <i class="six-ten-icon left" style="margin-top: 6px;margin-right: 3px;"></i>
              <span class="search-word" >删除</span>
            </div>
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left clear padding-l-10">
            <div class="left border-icon"  >
              <i class="filterchoose-icon" title="过滤选中" @click="filterData" ></i>
            </div>
          </div>
          <div class="left padding-l-10" @click="exportToExcel"  >
            <div class="left border-icon"  >
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
            <i class="back-icon user left" @click="tabRemove('/home/InternalKeykey')" ></i>
          </div>

        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear">
            <div class="left padding-l-15" >
              <span class="des-word" >交付日期</span>
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
              <span class="des-word" >钥匙名称</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <CheckSelect :selectId="stateIds" :listData="paramIds" style="width:100px;" ></CheckSelect>
              </el-form-item>
            </div>
            <div class="left padding-l-15" style="padding-left:15px" >
              <span class="des-word" >部门人员</span>
            </div>

            <div class="left">
              <el-form-item label label-width="0" prop="executorId">
                <CheckSelectSpecial
                  @findStreetByTown="finUserByDepart"
                  :selectId="executorId"
                  :listData="deptIds"
                  style="width:110px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="departId">
                <CheckSelectSpecial
                  :selectId="departId"
                  :listData="userIds"
                  style="width:96px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left " style="padding-left:15px;"  >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.words" title="钥匙名称/负责人" maxlength="30" style="width:200px;"  autocomplete="off" ></el-input>
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

    <div class="content clear" style="height: calc(100% - 83px);">

      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          empty-text=" "
          border
          :span-method="objectSpanMethod"
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
              v-else-if="item.prop == 'keynameid'"
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
                <div class="findparentclass" style="color:#336699;text-algin:center;cursor: pointer;font-weight: bold;" @click="editorInternalKey(scope.$index, scope.row)" >
                  {{ scope.row.keynameid }}
                </div>
                <!-- <div v-if="scope.row.val" class="findparentclass" style="color:#336699;text-algin:center;cursor: pointer;font-weight: bold;" @click="editorInternalKey(scope.$index, scope.row)" >
                  {{ scope.row.val }}
                </div>
                <div v-else class="findparentclass" style="color:#336699;text-algin:center;cursor: pointer;font-weight: bold;" @click="editorInternalKey(scope.$index, scope.row)" >
                  {{ scope.row.paramId }}
                </div> -->
              </template>
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'userName'"
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
                <div class="findparentclass" v-if='scope.row.userName'>
                  {{ scope.row.userName }}
                </div>
                <div class="findparentclass" v-else>
                  {{ scope.row.userId }}
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

    <div class="component-container" >
      <ColumPage :culumnTitle="culumnTitle" @reloadListByStorage="reloadListByStorage" :columnData="columnData" :sessionStr="sessionStr" :columnVisible="columnValue"  ref="columnId"  ></ColumPage>
    </div>
  </div>
</template>


<script>
  // 获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex';
  import { InternalKeydata } from "../../../utils/InternalKey";
  import { internalKeyfindListkey,internalKeygetKparam,internalKeydelete } from "../../../service/InternalKey";
  import {findUserByDepartId} from "../../../service/organizeDate";

  // 自选列
  import ColumPage from '../../../components/column'
  import CheckSelect from '../../../components/check'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import newAddInternalKey from "./newAddInternalKey";
  import EditorInternalKeyKeyPage from "./EditorInternalKeyKey";
  import { PlTable, PlTableColumn } from 'pl-table';
  import {quickDate} from '../../../utils/getQuickDate';

  export default {
    data() {
      return {
        paramIds:[],
        stateIds:'stateIds',
        departId:'departId',
        executorId: "executorId",
        deptIds: [],  
        userIds:[],
        form:{
          timeStart:'',
          timeEnd:'',
          words:'',
          view:"2"
        },


        platformCompanyValue:false,
        columnValue:false,
        oneORtwo:2,

        currentNum:0,
        rowHeight:27,
        culumnTitle:'内部钥匙',
        sessionStr:'InternalKey-list',
        tableData:[],
        columnData:InternalKeydata.InternalKeyKeyThead,
        currentPage:'',      
        multipleSelection:[], 
        multipleSelection11:[], 
        spanArr:[],
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
      newAddInternalKey,
      EditorInternalKeyKeyPage
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
      rowspan() {
        this.spanArr = [];
        this.tableData.forEach((item,index) => {
          if( index === 0){
            this.spanArr.push(1);
            this.position = 0;
          }else{
            if(this.tableData[index].paramId === this.tableData[index-1].paramId ){
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
         //合并第二列 内容相同的
        if( columnIndex === 0||columnIndex === 1||columnIndex === 2){
            const _row = this.spanArr[rowIndex];
            const _col = _row>0 ? 1 : 0;
            return {
                rowspan: _row,
                colspan: _col
            }
        }
      },
      changeToOtherPage(){
        this.$router.push('/home/InternalKey');
      },
      getParamsData(){
        let _this = this;
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        internalKeygetKparam().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.getQuickDate(5);
            let data = response.data;
            let initArr = [{id:"-1",name:"全部",select:true}];
            _this.userIds = [{id:'-1',name:"全部",select:true}];
            if(data.keyname){
              data.keyname.forEach(item=>{
                initArr.push({
                  id:item.id,
                  name:item.value,
                  select:false
                })
              })
              _this.paramIds = initArr;
              // _this.rowspan();
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
              _this.deptIds = arr;
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
        form.deptIds = _this.getSelectIdByList(_this.deptIds);
        form.paramIds = _this.getSelectIdByList(_this.paramIds);
        form.userIds = _this.getSelectIdByList(_this.userIds)
        if(form.timeStart == null){
          form.timeStart = '';
        };
        if(form.timeEnd == null){
          form.timeEnd = '';
        }
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        internalKeyfindListkey(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.currentNum = 0;
            let data = response.data;
            _this.tableData = [];
            //数组对象方法排序:从小到大
            function sortByKey(array,key){
                return array.sort(function(a,b){   
                  var x=a[key];//如果要从大到小,把x,y互换就好
                  var y=b[key];
                  return ((x<y)?-1:((x>y)?1:0));
               });
            }

            data.klist.forEach(item=>{
              item.alnum = Number(item.alnum);
              item.num = Number(item.num);
            });
            
            _this.tableData = sortByKey(data.klist,'paramId');

            _this.rowspan();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      finUserByDepart(){
        let _this = this;
        let id = _this.getSelectIdByList(_this.deptIds);
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
              let arr =  [{id:'-1',name:"全部",select:true}];
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
              _this.userIds = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.userIds = [{id:'-1',name:"全部",select:true}];
        }

      },
      //新增
      addInternalKey(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: newAddInternalKey, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['600px','550px'],
          title: "新增钥匙",
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
      // 修改
      editorInternalKey(index, row){
        let _this = this;

        this.currentPage = row;
        // let thisname = '';
        // if(row.val){
        //   thisname = row.val;
        // }else{
        //   thisname = row.paramId;
        // }
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorInternalKeyKeyPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{itemval:row.keynameid,paramId:row.paramId,mykeynameid:row.keynameid,mythisindex:index,myid:row.id}//props
          },
          area:['600px','550px'],
          title:"钥匙修改 【" + row.keynameid  + "】",
          shadeClose: false,
          shade: true,//是否显示遮罩
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
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },

      //删除项目
      deletedRecordfunc(){
        let _this = this;
        let ids = _this.multipleSelection.toString();
        if(ids.length != 0){
          _this.myConfirm("警告：确定要将选定的钥匙放入回收站吗？","question-icon",'是','否').then(res => {
            _this.deletedIMSuccess();
          }).catch(err => {

          })
        }else{
          _this.myAlert("请选择要删除的钥匙！")
        }
      },

      deletedIMSuccess(){
        let _this = this;
        let deleted = 1;
        let id = _this.multipleSelection.toString();
        let keynameid = _this.multipleSelection11.toString();
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        internalKeydelete(id,keynameid,deleted).then(function (response) {
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
            _this.myAlert(response.msg+"！");
          }
        })
      },

      clearForm(){
        let _this = this;
        _this.getQuickDate(5);
        _this.form.words = '';
        _this.paramIds = _this.backSlect(_this.paramIds);
        _this.deptIds = _this.backSlect(_this.deptIds);
        _this.userIds = _this.backSlect(_this.userIds);

      },

      filterData(){
        let select = this.multipleSelection.toString();
        if(select){
          this.spanArr = [];
          let arr = [];
          this.tableData.forEach(function(item){
            if(select.indexOf(item.id) != -1){
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
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //全选
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = [];
        _this.multipleSelection11 = [];
        elemCheckbox.forEach(item => {
          _this.tableData.forEach(ii=>{
            if(item.paramId == ii.paramId){
              _this.multipleSelection.push(ii.id);
              _this.multipleSelection11.push(ii.keynameid);
            }
          })
          // _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
        _this.multipleSelection11 = Array.from(new Set(_this.multipleSelection11));
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
      
      // rowClass({row, index}) {
      //   let className = "";
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
      },
      changeTitle(count,needlayerid,upordown){
        let _this = this;
        let mycountnum = count;
        if(mycountnum> _this.tableData.length-1||mycountnum<0){
          if(upordown==1){
            mycountnum = 0;
          };
          if(upordown==2){
            mycountnum = _this.tableData.length-1;
          }
        }
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "钥匙修改 【" + _this.tableData[mycountnum].keynameid  + "】";
        _this.$refs.singleTable.setCurrentRow(_this.tableData[mycountnum]);

        let  callbackdata = {
          row: _this.tableData[mycountnum],
          thisname:_this.tableData[mycountnum].keynameid,
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
    watch: {
      $route: {
        handler() {
          this.oneORtwo = 2;
        },
        deep: true,
      }
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
   /deep/ .el-table .el-table__body-wrapper{
    height: calc(100vh - 150px) !important;
     .el-table__virtual-wrapper{
       height:100% !important;
     }
  }
  /deep/ .plTableBox .el-table .el-table__header th{
    background-color: #DCD9D3;
  }
</style>
