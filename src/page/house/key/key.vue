<template>
  <div class="rent-container mycontailerclass1">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear" >

          <div class="left padding-l-10"  @click="deletedKey" style="cursor:pointer;" >
            <div class="border-icon clear" > 
              <i class="fa fa-times delete" style="color:#FF0000;" ></i>
              <span>删除钥匙</span>
            </div>  
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-5 padding-t-5" >
            <div class="border-icon clear" > 
              <i class="one-Thirteen-icon" title="过滤选中"  @click="filterData" ></i>
            </div>  
          </div>
          <div class="left padding-l-5"  >
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
              <i class="back-icon user left" @click="tabRemove('/home/keyManage')" ></i>
            </div>  
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>

        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" >
            <div class="left padding-l-15" >
              <span class="des-word" >日期</span>
            </div>
            <div class="left " >
              <el-form-item prop="timeType" label-width="0">
                <el-select v-model="form.timeType"    style="width:85px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="外借日" value="1" ></el-option>
                  <el-option  label="归还日" value="2" ></el-option>
                  <el-option  label="收回日" value="3" ></el-option>
                </el-select>
              </el-form-item>

            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-select  @change="getQuickDate" v-model="quick"    style="width:85px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="今天" value="2" ></el-option>
                  <el-option  label="昨天" value="21" ></el-option>
                  <el-option  label="三天" value="3" ></el-option>
                  <el-option  label="上周" value="16" ></el-option>
                  <el-option  label="本周" value="15" ></el-option>
                  <el-option  label="上月" value="17" ></el-option>
                  <el-option  label="本月" value="9" ></el-option>
                  
                  <el-option  label="上年" value="11" ></el-option>
                  <el-option  label="本年" value="12" ></el-option>
                  <el-option  label="自定义" value="1" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-date-picker size="mini" type="date"   v-model="form.timeStart" style="width: 90px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <el-date-picker size="mini" type="date"   v-model="form.timeEnd" style="width: 90px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >类型</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-select  v-model="form.keyType"    style="width:110px;" >
                  <el-option v-for="item in keyTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >负责人</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial @findStreetByTown="finUserByDepart" :selectId="departIds" :listData="departParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="userId" :listData="userParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >状态</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="stateId" :listData="stateParams" style="width:90px;" ></CheckSelectSpecial>
              </el-form-item>

            </div>
            <div class="left padding-l-15" style=""  >
              <el-form-item prop="word3" label-width="0">
                <el-input v-model.trim="form.word"  title="房源编号/楼盘/负责人姓名" maxlength="30" style="width:140px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-5" style="padding-top:3px;" >
              <i class="search-btn" @click="searchKeyDataList" >查询</i>
            </div>
            <div class="left padding-l-5" style="padding-top:3px;" >
              <i class="claerlys" @click="clearForm" ></i>
            </div>
          </div>

        </el-form>
      </div>
    </div>

    <div class="content clear"   style="height:calc(100% - 100px)" >

      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          ref="singleTable"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :cell-class-name="rowClass"
          :row-height="rowHeight"
        >


          <template v-if="item.show" v-for="(item,index) in columnData" >

            <PlTableColumn
              v-if="item.prop == 'areaVillage'"
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
                <div style="color:#336699;text-algin:center;cursor:pointer;" @click="getKeyEditor(scope.$index, scope.row)" >
                  {{ scope.row.areaVillage }}
                </div>
              </template>
            </PlTableColumn>
            <PlTableColumn
              v-else-if="item.prop == 'lendDate1' || item.prop == 'lendDate2' || item.prop == 'lendDate3'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              slot-scope="scope"
              :align="item.align"
            >
              <template slot-scope="scope">
                <div style="text-algin:center;position:relative;height:100%;" >
                  <span v-if="item.prop == 'lendDate1'" >{{scope.row.lendDate1}}</span>
                  <span v-if="item.prop == 'lendDate2'" >{{scope.row.lendDate2}}</span>
                  <span v-if="item.prop == 'lendDate3'" >{{scope.row.lendDate3}}</span>
                  <div v-if="scope.row[item.prop] != null" class="" style="position:absolute;right:-5px;bottom:0px;">
                    <i class="blue-icon"  @click="showKeyFollow(scope.row)"  ></i>
                  </div>
                </div>
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
            >

            </PlTableColumn>
          </template>
        </PlTable>
      </div>
    </div>
    <div class="component-container" >
      <keyOperationPage    :keyOperationeVisible="keyOperationValue"  ref="keyOperationId" ></keyOperationPage>
    </div>
  </div>
</template>


<script>
  /*获取数据
  *
  * */
  // 获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {keyParams,keyList,deletedKey} from '../../../service/houseData'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import { PlTable, PlTableColumn } from 'pl-table';

  import {rentConstParam} from '../../../utils/rentParam'


  import CheckSelectSpecial from '../../../components/checkSpecial'
  // 编辑钥匙
  import EditorRentPage from '../rent/editorRent'
  // 自选列
  import ColumPage from '../../../components/column'
  //钥匙
  import keyOperationPage from '../rent/keyOperation'
  import {quickDate} from '../../../utils/getQuickDate'
  export default {
    data() {
      return {
        currentPage:[],
        columnValue:false,
        keyOperationValue:false,
        sessionStr:'house-key',
        rowHeight:27,
        tableData:[],
        columnData:rentConstParam.keyColumn,
        currentNum:0,
        departParams:[],
        userParams:[],
        keyTypeIdParams:[],
        stateParams:[],
        multipleSelection:[],
        culumnTitle:'钥匙管理',
        departIds:'departIds',
        userId:'userId',
        typeId:'typeId',
        stateId:'stateId',
        quick:'9',
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        form:{
          timeType:'-1',
          timeStart:'',
          timeEnd:'',
          keyType:'-1',
          word:'',
        },
      };
    },
    components:{
      CheckSelectSpecial,
      EditorRentPage,
      keyOperationPage,
      ColumPage,
      PlTable,
      PlTableColumn
    },
    methods: {
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
      getKeyParams() {
        let _this = this;
        keyParams().then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let departTree = data.departTree;
            _this.getQuickDate(9);
            if(departTree && departTree.length != 0){
              let arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < departTree.length ; i++){
                arr.push({
                  id:departTree[i].id,
                  name:departTree[i].label.replace(/&nbsp;/g,""),
                  select:departTree[i].select,
                  state:departTree[i].state,
                })
              }
              _this.departParams = arr;
            }
            let keyTypeIdParams = data.keyTypeIdParams;
            if(keyTypeIdParams && keyTypeIdParams.length != 0){
              let arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < keyTypeIdParams.length ; i++){
                arr.push({
                  id:keyTypeIdParams[i].id,
                  name:keyTypeIdParams[i].name,
                  select:keyTypeIdParams[i].select,
                })
              }
              _this.keyTypeIdParams = arr;
            }
            let stateParams = data.stateParams;
            if(stateParams && stateParams.length != 0){
              let arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < stateParams.length ; i++){
                arr.push({
                  id:stateParams[i].id,
                  name:stateParams[i].name,
                  select:stateParams[i].select,
                })
              }
              _this.stateParams = arr;
            }
            _this.userParams = [{id:'-1',name:"全部",select:true}];
            _this.getKeyData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      //获取钥匙数据
      getKeyData(){
        let _this = this;
        //加载动画
        _this.$layer.loading({
          shade:true,
        })
        let form = JSON.parse(JSON.stringify(_this.form));

        form.deptIds = _this.getSelectIdByList(_this.departParams);
        form.userIds = _this.getSelectIdByList(_this.userParams);
        form.state = _this.getSelectIdByList(_this.stateParams);
        if(!form.timeStart){
          form.timeStart = "";
        }
        if(!form.timeEnd){
          form.timeEnd = "";
        }
        keyList(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.tableData = response.data.list;
            _this.currentNum = 0;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      searchKeyDataList(){
        this.getKeyData();
      },
      reloadRentList(){
        this.getKeyData();
      },
      //钥匙详情
      getKeyEditor(index,row){
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

        let tableData = this.tableData;
        let len = tableData.length;
        let ids = [];
        for(let i = 0 ;  i < len; i ++) {
          ids.push(tableData[i].houseId);
        }
        this.currentPage = row;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorRentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.houseId,address:row.areaVillage,activeName:'key',ids:ids.toString(),mythisindex:index}//props
          },
          area:['800px','560px'],
          title:"房源信息 【"+ this.currentPage.areaVillage+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件
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
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.houseId,oneORmore:2};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
        _this.$refs.singleTable.setCurrentRow(row);
      },
      changeTitle(count,needlayerid,upordown){
        let _this = this;
        let mycountnum = 0;
        let currentId =  _this.tableData[count].id;
        let tableData = this.tableData;
        let saveData = this.$store.state.layerifranme;
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
        _this.currentPage = tableData[mycountnum];
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="房源信息 【"+_this.currentPage.areaVillage+"】";
        _this.$refs.singleTable.setCurrentRow(_this.currentPage);

        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.currentPage.id
          }
        });
        let  callbackdata = {
          rowid: tableData[mycountnum].houseId,
          thisindex:mycountnum,
        };
        return callbackdata;
      },
      rowClass({row, index}) {
        let className = "";
        if(row.id == this.currentPage.id){
          className += 'page-check';
        }
        return className;
      },
      showKeyFollow(item){
        this.$refs.keyOperationId.dialogShow(item.id);
      },
      finUserByDepart(){
        let _this = this;
        let id = this.getSelectIdByList(_this.departParams);
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'-1',name:"全部",select:true}];
              if(user && user.lengthg != 0){
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
        }else{
          _this.userParams = [{id:'-1',name:"全部",select:true}];
        }

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
      deletedKey(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if(select){
          this.myConfirm("警告：【房源钥匙】删除后将不能还原！", 'dangerous-icon','确认','取消','确定要永久删除选定的记录吗？','my-message').then(res => {
            _this.deletedDataKey();
          }).catch(err => {
          })
        }else{
          this.myAlert("请选择钥匙!",'dangerous-icon');
        }
      },
      deletedDataKey(){
        let _this = this;
        let select = this.multipleSelection.toString();
        deletedKey(select).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("删除成功!",'success-icon').then(res => {
              _this.getKeyData();
            }).catch(err => {
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          const tHeader = ['地域', '房源详情', '类型', '钥匙负责人', '状态', '外借人', '外借日', '收回人', '收回日','归还人','归还日'];
          const filterVal = ['areaVillage','roomSaleStateId',
            'keyTypeId','emp','state','lender1','lendDate1',
            'lender2','lendDate2','lender3','lendDate3'];
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '钥匙管理')
        })
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
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex;
      },
      getRowDataByClick (row, column, event) {
        let _this = this
        _this.currentNum = row.index + 1;
        _this.currentPage = row;
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
      getSelectIdByList(list){
        let arr = [];
        list.forEach(function(item){
          if(item.select){
            arr.push(item.id);
          }
        })
        return arr.toString();
      },
      clearForm(){
        let _this = this;
        this.form.timeType = '-1';
        this.timeDisabled = false;
        this.quick = '9';
        this.form.timeStart = '';
        this.form.timeEnd= '';
        this.form.keyType= '-1';
        this.form.word= '';
        _this.getQuickDate(9);

        _this.departParams = _this.backSlect(_this.departParams);
        _this.userParams = _this.backSlect(_this.userParams);

        _this.stateParams = _this.backSlect(_this.stateParams);
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
    mounted(){
      this.reloadListByStorage();
      this.shadenum();
      this.getKeyParams();
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
  };
</script>

<style lang="scss" scoped>

  .rent-container {
    font-size:12px;
    height:100%;
    .padding-l-15{
      padding-left:15px;
    }
    .padding-l-10{
      padding-left:10px;
    }
    .padding-l-5{
      padding-left:5px;
    }
    .padding-l-2{
      padding-left:2px;
    }
    .cut-icon{
      background:url(../../../images/system/fenge.png) -100px -90px;
      width:3px;
      height:23px;
      display:block;
    }


    .back-icon{
      background:url(../../../images/system/tuichu.png) -15px -15px;
      width:20px;
      height:20px;
      display:inline-block;
    }
    .down-angle-icon{
      background:url(../../../images/icon2.png) -261px -22px;
      width:8px;
      height:10px;
      display:block;
      cursor:pointer;
    }
    .leading-out-icon{
      background:url(../../../images/icon.png) -126px -118px;
      width:20px;
      height:20px;
      display:block;
    }

    .print-out-icon{
      background:url(../../../images/system/daochu.png) -15px -15px;
      width:20px;
      height:20px;
      display:block;
    }

    .des-word{
      line-height:30px;
      height:30px;
      display:inline-block;
    }
    .content{
      width:100%;
      .list-content{
        height:100%!important;
        width: calc(100% - 20px);
        margin: 5px auto 0px;
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
    }

  }

</style>
