<template>
  <div id="contract-finance-container" class="rent-container mycontailerclass1">
    <div class="top-container border-black">
      <div class="search-container mycontailerclass2">
        <div class="clear">
            <div class="left padding-l-10" @click="newExpendRule" style="cursor:pointer;">
                <i class="fa fa-plus add"></i>
                <span>新增年月规则</span>
            </div>
            <div class="left padding-l-10" @click="deletedExpendRule" style="cursor:pointer;">
                <i class="fa fa-times delete"></i>
                <span>删除年月规则</span>
            </div>
            
            <div class="left padding-l-5">
                <i class="cut-icon"></i>
            </div>
            
            <div type="primary" class="padding-l-10 left padding-t-2" @click="exportToExcel">
                <i class="print-out-icon"></i>
            </div>
            <div class="item padding-l-5 left">
                <div class="record-num">
                <span class="search-word">&lt;</span>
                <span class="search-word">{{currentNum}}</span>
                <span class="search-word">/</span>
                <span class="search-word">{{tableData.length}}</span>
                <span class="search-word">&gt;</span>
                </div>
            </div>

            <div class="item left clear padding-l-15">
                <i class="back-icon user left" @click="tabRemove('/home/FinanceExpendRule')"></i>
            </div> 
        </div>
      </div>
      <div class="search-container">
        <el-form ref="formsData" :model="form">
          <div class="clear" style="margin-top: 5px">
            <div class="left padding-l-15">
                <span class="des-word">消耗品</span>
            </div>
            <div class="left">
                <el-form-item label label-width="0" prop="executorId">
                    <CheckSelectSpecial
                    :selectId="expendManageIds"
                    :listData="expendManageParams"
                    style="width:110px;"
                    ></CheckSelectSpecial>
                </el-form-item>
            </div>
               
            <div class="left padding-l-15">
              <span class="des-word">消耗年月</span>
            </div>
            <div class="left">
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="timeStart">
                  <el-date-picker
                     type="month"
                     
                    placeholder="选择日期"
                    value-format="yyyy-MM"
                    v-model="form.timeStart"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="timeEnd">
                  <el-date-picker
                    type="month"
                     
                    placeholder="选择日期"
                    value-format="yyyy-MM"
                    v-model="form.timeEnd"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
                
                <div class="left padding-l-15"  >
                    <el-form-item prop="word1" label-width="0">
                        <el-input  v-model.trim="form.word" maxlength="30" title="消耗品/备注" style="width:180px;"  autocomplete="off" ></el-input>
                    </el-form-item>
                </div>

                <div class=" left padding-l-5" style="padding-top:1px;" >
                    <i class="search-btn" @click="searchExpendListData"  >查询</i>
                </div>
                <div class="left " style="padding:1px 0 0 2px;" >
                    <i class="claerlys" @click="clearForm" ></i>
                </div>
            </div>

          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear">
      <div class="list-content">
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="700px"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :cell-class-name="rowClass"
          :row-height="rowHeight"
           @header-click="headerClick"
        >
          <template v-if="item.show" v-for="(item,index) in columnData">
             <PlTableColumn
              v-if="item.prop == 'check'"
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
                 <div
                  
                  style="height:25px;text-algin:center;position:relative;"
                  
                >
                  <el-checkbox style="height:20px;"  v-model="scope.row.checked"  :false-label="0" :true-label="1"  ></el-checkbox>
                </div>  
              </template>
            </PlTableColumn>
            <PlTableColumn
              v-else-if="item.prop == 'time'"
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
                <div
                  v-html="scope.row.time"
                  :style="{'font-weight':'700','color':scope.row.financeConsumeManageIsClosed=='1'?'#999':'#336699','text-algin':'center','cursor':'pointer'}"
                  @click="editorExpendRule(scope.$index, scope.row)"
                ></div>
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
            ></PlTableColumn>
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
  import {expendManageDetail,expendRuleList,deletedExpendRule} from '../../../service/expendData'


  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import { quickDate } from "../../../utils/getQuickDate";
  import CheckSelectSpecial from "../../../components/checkSpecial"; 
  import { PlTable, PlTableColumn } from "pl-table";
  import {financeExpendParam} from '../../../utils/expendParam'
  import NewExpendRulePage from './newExpendRule'
  import EditorExpendRulePage from './editorExpendRule'
  //获取数据
  export default {
    data() {
      return {
        checotract:[],
        culumnTitle:'消耗规则管理',
        sessionStr:'expend-rule-list',
        rowHeight:27,
        clickTime:1,
        clickActive:false,
        tableData: [],
        columnData: financeExpendParam.finaceExpendRuleColumn,
        timeDisabled:false,
        expendManageIds:'expendManageIds',
        expendManageParams:[],
        currentNum:0,
        form: {
          timeStart:'',
          timeEnd:'',
          word:'',
        }
      };
    },
    components: {
      CheckSelectSpecial,
      PlTable,
      PlTableColumn,
      NewExpendRulePage,
      EditorExpendRulePage,
    },
    methods: {
      searchExpendListData(){
        this.getExpendRuleData();
      },
      newExpendRule(){
        let _this = this;
        let test = _this.$layer.iframe({
            content: {
            content: NewExpendRulePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{activeName:'single'}//props
            },
            
            area:['550px','250px'],
            title: "新增年月规则",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            
        });
      },
      editorExpendRule(index , row){
        let _this = this;
        let test = _this.$layer.iframe({
            content: {
              content: EditorExpendRulePage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{id:row.id}//props
            },
            
            area:['550px','250px'],
            title: row.financeConsumeManageName +"  "+ row.time,
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            
        });
      },
      
      deletedExpendRule(){
        let _this = this;
        let tableData = this.tableData;
        let arr = [];
        tableData.forEach(item =>{
          if(item.checked == 1){
            arr.push(item.id);
          }
        })
        let select = arr.toString();
        if (select) {
          _this
            .myConfirm(
              "确定要删除消耗规则吗？",
              "dangerous-icon",
              "确认",
              "取消",
              "",
              "my-message"
            )
            .then(res => {
              _this.deletedExpendRuleData();
            })
            .catch(err => {});
        } else {
          this.myAlert("请勾选要删除的消耗规则!", "dangerous-icon");
        }
        //
      },
      
      deletedExpendRuleData() {
        let _this = this;
        let tableData = this.tableData;
        let arr = [];
        tableData.forEach(item =>{
          if(item.checked == 1){
            arr.push(item.id);
          }
        })
        let id = arr.toString();
        let select = {
          id,
          deleted: 1
        };
        deletedExpendRule(select).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this
              .myAlert("删除成功!", "success-icon")
              .then(res => {
                  
                  let temp = _this.tableData.concat();
                  for(let i = 0 , len = arr.length; i < len ; i++ ){
                    temp = _this.deletArrByValue(temp,arr[i]);
                  }
                  _this.tableData = temp;
                  _this.currentNum = 0;
              })
              .catch(err => {});
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      },
       //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
      }, 
      headerClick(column, event){
        let clickTime = this.clickTime;
        if(column.property == 'check' && clickTime == 1){
          let tableData = this.tableData;
          if(this.clickActive){
            tableData.forEach(item =>{
              item.checked = 1;
            })
            this.clickActive = false;
          }else{
             tableData.forEach(item =>{
              item.checked = 0;
            })
            this.clickActive = true;
          }
          
        }
        if(clickTime == 2){
          this.clickTime = 1;
        }else{
           this.clickTime = 2;
        }
      },
      //
      getExpendData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        expendManageDetail().then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.getQuickDate(9);
            let data = response.data.list;
            let thismyselect = [];
            data.forEach(item=>{
              if(item.isClosed==0){
                thismyselect.push({
                  id:item.id,
                  name:item.name,
                  stateUser:0
                })
              }else{
                thismyselect.push({
                  id:item.id,
                  name:item.name,
                  stateUser:1,
                })
              }
            })
            _this.expendManageParams = [{id:'-1',name:'全部',select:true}].concat(thismyselect);
            _this.getExpendRuleData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      //
      getExpendRuleData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
        if(form.timeStart == null){
          form.timeStart = '';
        };
        if(form.timeEnd == null){
          form.timeEnd = '';
        };
        form.financeConsumeManageId = this.getSelectIdByList(this.expendManageParams);
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        expendRuleList(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            data.forEach(item => {
                item.checked = 0;
            })
            _this.tableData = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },  
      getQuickDate(value) {
        let time = quickDate.getTwoDateByDay(value);
        this.form.timeStart = time.startTime.substring(0,7);
        this.form.timeEnd = time.endTime.substring(0,7);
        
      },
     
      
    
      exportToExcel() {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require("../../../assets/js/Export2Excel.js");
          let tHeader = [];
          this.columnData.forEach(item => {
            tHeader.push(item.label);
          });
          let filterVal = [];
          this.columnData.forEach(item => {
            filterVal.push(item.prop);
          });
          const list = this.tableData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "消耗规则管理");
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },

     
      rowClass({ row, index }) {
        let className = "";

        if (row.id == this.tableData.id) {
          className += "page-check";
        }
        return className;
      },
     
      tableRowClassName({ row, rowIndex }) {
        // 把每一行的索引放进row
        row.index = rowIndex;
        if(row.financeConsumeManageIsClosed == "1"){
          return 'isClosedStyle'
        }
      },
      getRowDataByClick(row, column, event) {
        let _this = this;
        _this.currentNum = row.index + 1;
        _this.currentPage = row;
      },
      clearForm() {
        let _this = this;
      
        this.form.word = "";
        
        _this.getQuickDate(9);
       
      
        _this.expendManageParams = _this.backSlect(_this.expendManageParams);
      },
      //全选
      handleSelectionChange(elemCheckbox){
        let carr = [];
        carr=elemCheckbox;
        this.checotract=carr;
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = [];
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
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
      filterData() {
        let select = this.multipleSelection.toString();
        if (select) {
          let arr = [];
          this.tableData.forEach(function(item) {
            if (select.indexOf(item.index) != -1) {
              arr.push(item);
            }
          });
          this.currentNum = 0;
          this.tableData = arr;
        }else{
          this.myAlert('请选择需要过滤的数据!','dangerous-icon');
        }
      },
      backSlect(list) {
        let arr = [];
        list.forEach(function(item) {
          if (item.id != -1) {
            item.select = false;
          } else {
            item.select = true;
          }
          arr.push(item);
        });
        return arr;
      },
      tabRemove(targetName) {
        // 首页不可删除
        if (targetName == "/") {
          return;
        }
        this.$store.commit("delete_tabs", targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            this.$store.commit(
              "set_active_index",
              this.options[this.options.length - 1].path
            );
            this.$router.push({ path: this.activeIndex });
          } else {
            this.$router.push({ path: "/home/" });
          }
        }
      }
    },
    mounted() {
      this.getExpendData();
    },
    computed: {
      options() {
        return this.$store.state.options;
      },
      activeIndex: {
        get() {
          return this.$store.state.activeIndex;
        },
        set(val) {
          this.$store.commit("set_active_index", val);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  /deep/ .isClosedStyle{
    color: #999 !important;
  }
  .rent-container {
    font-size: 12px;
    height: 100%;
    .padding-l-15 {
      padding-left: 15px;
    }
    .padding-l-10 {
      padding-left: 10px;
    }
    .padding-l-5 {
      padding-left: 5px;
    }
    .padding-l-2 {
      padding-left: 2px;
    }
    .cut-icon {
      background: url(../../../images/system/fenge.png) -100px -90px;
      width: 3px;
      height: 23px;
      display: block;
    }
    .leading-out-icon {
      background: url(../../../images/icon.png) -126px -118px;
      width: 20px;
      height: 20px;
      display: block;
    }
    .print-out-icon {
      background: url(../../../images/system/daochu.png) -15px -15px;
      width: 20px;
      height: 20px;
      display: block;
    }

    .print-out-icon:hover,
    .leading-out-icon:hover {
      border: 1px solid #828382;
    }
    .back-icon {
      background: url(../../../images/system/tuichu.png) -15px -15px;
      width: 20px;
      height: 20px;
      display: inline-block;
    }
    .des-word {
      line-height: 30px;
      height: 30px;
      display: inline-block;
    }
    .content {
      height: calc(100% - 120px);
      width: 100%;
      .list-content {
        width: calc(100% - 20px);
        height: 100%;
        margin: 10px auto 0px;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png") 2 repeat;
        border-radius: 5px;
      }
    }
  }
</style>
<style lang="scss">
  .el-table th.gutter {
    display: none !important;
  }
</style>
