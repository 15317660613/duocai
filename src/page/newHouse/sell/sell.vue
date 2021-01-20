<template>
  <div id="sell-container" class="rent-container mycontailerclass1">
    <div class="top-container border-black">
      <div class="search-container mycontailerclass2">
        <div class="clear" >
          <div class="item left padding-l-10 clear" style=""  @click="showNewIdentifyRef"    >
            <div class="border-icon clear" > 
              <div class="left" style="padding: 5px 2px 0 0;" >
                <i class="six-eleven-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >新增</span>
              </div>
            </div>  
          </div>
          <div class="left padding-l-10" style="cursor:pointer;" @click="deletedFollow"  >
            <div class="border-icon clear" > 
              <div class="left" style="padding: 5px 2px 0 0;" >
                <i class="six-ten-icon"  ></i>
              </div>  
              <div class="left" >
                <span>删除</span>
              </div>  
            </div>  
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10" style="padding-top:1px;" >
            <div class="border-icon clear" > 
              <i class="one-ten-icon" title="自选列" @click="clickColumn" ></i>
            </div>  
          </div>
          <div class="left padding-l-10" style="padding-top:2px;" >
            <div class="border-icon clear" > 
              <i @click="exportToExcel" class="one-eleven-icon" title="导出"  ></i>
            </div>  
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left"  >
            <div class="record-num" >
              <span class="search-word" ><</span>
              <span class="search-word" >{{currentNum}}</span>
              <span class="search-word" >/</span>
              <span class="search-word" >{{tableData.length}}</span>
              <span class="search-word" >></span>
            </div>
          </div>
          <div class="item left clear" style="padding-top:3px;" >
            <div class="border-icon clear" > 
              <i class="one-twelve-icon user left" @click="tabRemove('/home/projectSell')" ></i>
            </div>
          </div>


        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear">
            <div class="left padding-l-15" >
              <span class="des-word" >日期</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-select  v-model="form.timeMode"    style="width:85px;"   >
                   <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="认筹日期" value="1" ></el-option>
                  <el-option  label="认购日期" value="2" ></el-option>
                 

                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <el-date-picker size="mini" type="date"   v-model="form.timeStart" style="width: 90px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <el-date-picker size="mini" type="date"   v-model="form.timeEnd" style="width: 90px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >成交员工</span>
            </div>

            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial  @findStreetByTown="finUserByDepart" :selectId="departId" :listData="departParams" style="width:90px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="userId" :listData="userParams" style="width:90px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
              <span class="des-word" >状态</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="stateId" :listData="stateParams" style="width:85px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15"   >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.word" title="项目名称/项目编号/报备编号/认购编号/客户名称" maxlength="30" style="width:150px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-5" style="padding-top:3px;" >
              <i @click="searchFollowDataList" class="search-btn" style="cursor:pointer;" >查询</i>
            </div>
            <div class="left padding-l-2"  style="padding-top:3px;" >
              <i class="claerlys" @click="clearForm"  ></i>
            </div>

          </div>

        </el-form>
      </div>
    </div>

    <div class="content clear" style="height:calc(100% - 95px)" >

      <div class="list-content" >
        <PlTable




          :datas="tableData"
          :pagination-show="false"
          empty-text=" "
          use-virtual
          border
          height="100%"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @row-click="getRowDataByClick"
          :cell-class-name="rowClass"
          :row-height="rowHeight"
          ref="singleTable"
        >


          <template v-if="item.show" v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop == 'adress'"
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
                <div v-html="scope.row.adress" style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorSale(scope.$index, scope.row)" >

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
  </div>
</template>


<script>
  /*获取数据
  *
  * */
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {followListRouter} from '../../../service/houseData'
  import {quickDate} from '../../../utils/getQuickDate'
  import CheckSelectSpecial from '../../../components/checkSpecial'  // 自选列
  import ColumPage from '../../../components/column'
  import { PlTable, PlTableColumn } from 'pl-table'
  import  NewIdentifyChipsPage from './newIdentifyChips'
  import  EditorIdentifyChipsPage from './editorIdentifyChips'

  import {saleparames} from '../../../utils/saleparames'
  import  {salemangent,deletedIdentifyChips,identifyChipsParams} from '../../../service/salesControl'

  //获取数据
  export default {
    data() {
      return {
        columnValue:false,
        dialogNewIdentify:false,
        dialogEditorIdentify:false,
        currentPage:[],
        multipleSelection:[],
        tableData:[],
        columnData:saleparames.saleColumn,
        sessionStr:'sale-follow',
        currentNum:0,
        quick:'4',
        upAndDown:1,
        tradeId:'tradeId',
        stateId:'stateId',
        departId:'departId',
        userId:'userId',
        processTypeId:'processTypeId',
        typeId:'typeId',
        culumnTitle:"销售管理",
        rowHeight:27,
        stateParams:[],
        departParams:[],
        userParams:[],
       
      
        currentPage:[],
        form:{
          timeMode:'-1',
          timeStart:'',
          timeEnd:'',
          userType:'1',
          word:'',
        },
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
      };
    },
    components:{
      CheckSelectSpecial,
      ColumPage,
      PlTable,
      PlTableColumn,
      NewIdentifyChipsPage,
      EditorIdentifyChipsPage
    },
    methods: {

      showNewIdentifyRef(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: NewIdentifyChipsPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "新增认筹",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });

        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      editorSale(index, row){
        let _this = this;
        this.currentPage = row;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorIdentifyChipsPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,thisindex:index}//props
          },
          area:['800px','560px'],
          title: "修改认筹 【项目:"+this.currentPage.adress+'&nbsp;&nbsp;&nbsp;&nbsp;'+'客户:'+this.currentPage.customerName+"】",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
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
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.id,oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
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
      //获取参数
      getFollowParamData(){
        let _this = this;

        identifyChipsParams().then(function(response) {

          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;

            let arr = [{id:'-1',name:"全部",select:true}];
           

            let roomStateIdParams = data.roomStateIdParams;
            if(roomStateIdParams && roomStateIdParams.length != 0){
              arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < roomStateIdParams.length ; i++){
                arr.push({
                  id:roomStateIdParams[i].id,
                  name:roomStateIdParams[i].name,
                  select:roomStateIdParams[i].select,
                })
              }
              _this.stateParams = arr;
            }

            let departTree = data.departTree;
            if(departTree && departTree.length != 0){
              arr = [{id:'-1',name:"全部",select:true}];
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
            _this.userParams = [{id:'-1',name:"全部",select:true}];

            _this.getFollowData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
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
      //获取跟进数据
      getFollowData(){

        let _this = this;
        //加载动画
        _this.$layer.loading({
          shade:true,
        })
        let form = JSON.parse(JSON.stringify(_this.form));
       
        form.roomStateIds = _this.getSelectIdByList(_this.stateParams);
        form.departIds = _this.getSelectIdByList(_this.departParams);
        form.empIds = _this.getSelectIdByList(_this.userParams);
       
        salemangent(form).then(function(response) {

          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.tableData = response.data.list;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
          _this.currentNum = 0;
        })
      },
      searchFollowDataList(){
        this.getFollowData();
      },
      reloadSaleList(){
        this.getFollowData();
      },
      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          const tHeader = ['跟进时间', '方式', '跟进内容', '跟进人', '房源编号', '楼盘字典', '栋座位置', '房号', '交易','状态'];
          const filterVal = ['createTime','processWayId',
            'remark','emp2','roomCode','areaVillage','seat',
            'roomId','roomType','roomSaleStateId'];
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '销售管理')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

      changeTitle(count,needlayerid){
        let _this = this;
        let currentData = this.tableData;
        _this.currentPage = currentData[count];
        
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="修改认筹 【项目:"+_this.currentPage.adress+'&nbsp;&nbsp;&nbsp;&nbsp;'+'客户:'+_this.currentPage.customerName+"】";
        _this.$refs.singleTable.setCurrentRow(_this.currentPage);

        let  callbackdata = {
          rowid: _this.currentPage.id,
          thisindex:count,
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
      deletedFollow(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if(select){
          _this.myConfirm("警告：记录删除后不能还原", 'dangerous-icon','确认','取消','确定要删除选定记录吗？','my-success').then(res => {
            _this.deletedDataFollow();
          }).catch(err => {
          })
        }else{
          this.myAlert("请勾选要删除的记录!",'dangerous-icon');
        }
      },
      deletedDataFollow(){

        let _this = this;
        let select = this.multipleSelection.toString();
        deletedIdentifyChips(select,1).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("删除成功!",'success-icon').then(res => {
              _this.getFollowData();
            }).catch(err => {
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
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
      showSearch(){
        let rent = document.getElementById("follow-container");
        if(this.upAndDown == 1){
          this.upAndDown = 2;

          rent.getElementsByClassName("content")[0].style.height="calc(100% - 70px)";
          rent.getElementsByClassName("el-table")[0].style.height="calc(100% - 70px)";
          document.getElementById("searchContent1").style.display = "none";
          document.getElementById("searchContent2").style.display = "none";

        }else{
          this.upAndDown = 1;
          rent.getElementsByClassName("content")[0].style.height="calc(100% - 150px)";
          rent.getElementsByClassName("el-table")[0].style.height="calc(100% - 150px)";
          document.getElementById("searchContent1").style.display = "block";
          document.getElementById("searchContent2").style.display = "block";
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
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      getRowDataByClick (row, column, event) {
        let _this = this;
        _this.currentNum = row.index + 1;
        _this.currentPage = row;
      },
      clearForm(){
        let _this = this;
        this.timeDisabled = false;
        this.form.timeStart = '';
        this.form.timeEnd = '';
        this.form.timeMode = '-1';
        this.form.userType= '1';
        this.form.word= '';

        
        _this.stateParams = _this.backSlect(_this.stateParams);
        _this.departParams = _this.backSlect(_this.departParams);
        _this.userParams = _this.backSlect(_this.userParams);
       
       
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
      }
    },
    mounted(){
      this.reloadListByStorage();
      this.getFollowParamData();
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

    .des-word{
      line-height:30px;
      height:30px;
      display:inline-block;
    }
    
  }
 
 
</style>
