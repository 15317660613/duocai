<template>
  <div id="contract-finance-container" class="rent-container mycontailerclass1">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear">
          <div class="left padding-l-10" @click="lookContract"  style="cursor:pointer;">
            <div class="border-icon clear" > 
              <span>查看合同</span>
            </div>  
          </div>
          <div class="left padding-l-10" >
            <el-dropdown  placement="bottom">
              <div class="border-icon clear" > 
                <span class="el-dropdown-link" >
                  快查收付款<i class="el-icon-arrow-down "></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  <el-dropdown-item @click.native="quickSearch(1)"  icon="el-icon-plus">全部应收款</el-dropdown-item>
                  <el-dropdown-item @click.native="quickSearch(2)" icon="el-icon-close" >全部应付款</el-dropdown-item>
                </el-dropdown-menu>
              </div>  
            </el-dropdown>
          </div>

          <div class="left padding-l-5">
            <i class="cut-icon"></i>
          </div>

         <div class="left padding-l-5 padding-t-5" >
            <div class="border-icon clear" > 
              <i class="one-Thirteen-icon" title="过滤选中"  @click="filterData" ></i>
            </div>  
          </div>
          <div class="left padding-l-5">
            <i class="cut-icon"></i>
          </div>

          <div class="left padding-l-10">
            <div class="border-icon clear" > 
              <i class="leading-out-icon" title="自选列" @click="clickColumn"></i>
            </div>  
          </div>
          <div type="primary" class="padding-l-10 left padding-t-2" @click="exportToExcel">
            <div class="border-icon clear" > 
              <i class="print-out-icon" title="导出"></i>
            </div>
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
             <div class="border-icon clear" > 
              <i class="back-icon user left" @click="tabRemove('/home/shouldFinance')"></i>
             </div> 
          </div>
        </div>
      </div>
      <div class="search-container" style="max-height:58px;overflow:hidden;" >
        <el-form ref="formsData" :model="form">
          <div class="clear">
            <div class="left padding-l-15">
              <span class="des-word">日期</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0">
                <el-select  v-model="form.timeMode" placeholder style="width:85px;">
                  <el-option label="收付日" value="1"></el-option>
                  <el-option label="录入日" value="2"></el-option>
                  <el-option label="结佣日" value="4"></el-option>
                  <el-option label="结盘日" value="5"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <el-select @change="getQuickDate" v-model="quick"  placeholder="" style="width:75px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="今天" value="2" ></el-option>
                  <el-option  label="三天" value="3" ></el-option>
                  <el-option  label="七天" value="4" ></el-option>
                  <el-option  label="本月" value="9" ></el-option>
                  <el-option  label="一月" value="5" ></el-option>
                  <el-option  label="三月" value="6" ></el-option>
                  <el-option  label="一年" value="7" ></el-option>
                  <el-option  label="自定义" value="1" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-date-picker
                  size="mini"
                  type="date"
                   
                  placeholder=""
                  :disabled="timeDisabled"
                  v-model="form.timeStart"
                  style="width: 90px;"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-date-picker
                  size="mini"
                  type="date"
                   
                  placeholder=""
                  :disabled="timeDisabled"
                  v-model="form.timeEnd"
                  style="width: 90px;"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word " >合同状态</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
               
                <CheckSelectSpecial :selectId="stateIds" :listData="stateIdParams" style="width:85px;" ></CheckSelectSpecial>
              </el-form-item>
              
            </div>
            <div class="left padding-l-15">
              <span class="des-word">业类</span>
            </div>
            <div class="left">
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial @findStreetByTown="findParamsByType" :selectId="businessType1Ids" :listData="businessType1Params" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>

            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <CheckSelectSpecial
                  :selectId="businessType2Ids"
                  :listData="businessType2Params"
                  style="width:110px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item prop="word" label-width="0">
                <el-input
                  v-model.trim="form.word"
                  title="合同编号/地址/电话/备注"
                  maxlength="30"
                  style="width:150px;"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-5" style="padding-top:3px;">
              <i @click="searchConteactDataList" class="search-btn" style="cursor:pointer;">查询</i>
            </div>
            <div class="left" style="padding-top:3px;">
              <i class="claerlys" @click="clearForm"></i>
            </div>
            <div class="left" style="margin-top:5px;">
              <i
                :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}"
                @click="showSearch"
              ></i>
            </div>

          </div>
          <div class="clear position-t-7" >
            <div class="left padding-l-15">
              <span class="des-word">收付</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0">
                <el-select v-model="form.financeType" placeholder style="width:85px;">
                  <el-option label="全部" value="-1"></el-option>
                  <el-option label="应收" value="2"></el-option>
                  <el-option label="应付" value="3"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-15">
              <span class="des-word">收方</span>
            </div>
            <div class="left padding-l-2">
              <div class="left" >
                <el-form-item label label-width="0">
                  <CheckSelect :selectId="sourceGetIds1" :listData="sourceGetIdParams1" style="width:78px;" ></CheckSelect>
                </el-form-item>
              </div>

            </div>

            <div class="left padding-l-15">
              <span class="des-word">付方</span>
            </div>

            <div class="left">
              <el-form-item label label-width="0">
                <CheckSelect
                  :selectId="sourceGetIds2"
                  :listData="sourceGetIdParams2"
                  style="width:78px;"
                ></CheckSelect>
              </el-form-item>
            </div>
            <div class="left p-l-25">
              <span class="des-word">计业绩</span>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.isAchievement" placeholder style="width:85px;">
                  <el-option label="全部" value="-1"></el-option>
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
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
          ref="singleTable"
        >
          <template v-if="item.show" v-for="(item,index) in columnData">
            <PlTableColumn
              v-if="item.prop == 'businessType1'"
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
                  
                  style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;"
                  @click="editorShuoldFinance(scope.$index, scope.row)">
                    <div style="font-weight:700;text-algin:center;position:relative;height:100%;" >
                        <span  >{{scope.row.businessType1}}</span>
                        <div v-if="scope.row.isAchievement == 1" class="" style="position:absolute;left:-5px;top:0px;">
                          <i class="calculate-icon"  ></i>
                        </div>
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
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import { findUserByDepartId } from "../../../service/organizeDate";
  import {contractFinanceListSpecial,financeParams,contractParams} from "../../../service/contractSpecial";
  import { contractParam } from "../../../utils/contractParam";
  import { quickDate } from "../../../utils/getQuickDate";
  import CheckSelectSpecial from "../../../components/checkSpecial"; //
  import CheckSelect from "../../../components/check"; //
  import ColumPage from "../../../components/column";
  import { PlTable, PlTableColumn } from "pl-table";
  import EditorContractPage from "../transaction/editorContract";
  import EditorShouldFinancePage from "./editorShouldFinance";
  //获取数据
  export default {
    data() {
      return {
        checotract:[],
        culumnTitle:'应收应付',
        sessionStr:'should-finance-list',
        columnValue: false,
        editorShowShoudFinance:false,
        currentPage: [],
        multipleSelection: [],
        tableData: [],
        columnData: contractParam.shouldFinanceColumn,
        sessionStr: "should-finance-follow",
        upAndDown:1,
        rowHeight:27,
        timeDisabled:true,
        departTree:[],
        stateIdParams:[],
        businessType1Ids:'business1',
        businessType2Ids:'business2',
        sourceGetIds1:'source1',
        sourceGetIds2:'source2',
        stateIds:'stateIds',
        sourceGetIdParams1:[],
        sourceGetIdParams2:[],
        businessType1Params:[],
        businessType2Params:[],
        contratStateParams:[],
        currentNum:0,
        quick:'9',
        form: {
          type:1,
          timeMode:'1',
          timeStart:'',
          timeEnd:'',
          states:'-1',
          word:'',
          financeType:'-1',
          isAchievement:'-1',
        },
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
      };
    },
    components: {
      CheckSelectSpecial,
      CheckSelect,
      ColumPage,
      PlTable,
      PlTableColumn,
      EditorContractPage,
      EditorShouldFinancePage,
    },
    methods: {
      lookContract(){
        let _this = this;
        let look= _this.checotract
        if(look.length>1){
            this.myAlert("只能选择一笔财务数据!")
        }
        if(look.length<1){
            this.myAlert("请选择应收应付数据!");   
        }
        if(look.length == 1){
         this.editorFinance(0,look[0]);
        }
      },
      getShouldAndRealListData(){

      },
      

      quickSearch(type){
      
        let _this = this;
        //加载动画
        _this.$layer.loading({
          shade: true
        });
        let form = {};
        if(type ==1 ){
          form = {type:1,financeType:2};
        }else{
          form = {type:1,financeType:3};
        }
        contractFinanceListSpecial(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.tableData = response.data.list;
            _this.tableData.forEach(item=>{
              item.sourceGetAmount = Number(item.sourceGetAmount);
              item.targetPayAmount = Number(item.targetPayAmount);
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
          _this.currentNum = 0;
        });
      },
      editorShuoldFinance(index, row) {
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
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorShouldFinancePage, //传递的组件对象
            parent: this, //当前的vue对象
            data: {
              id:row.id,
              contractId: row.contractId,
              businessType:'',
              currentIndex: index
            } //props
          },
          area: ["600px", "220px"],
          title:"应收应付修改 【"+row.roomAddress+"】",
          shadeClose: false,
          shade: false, //是否显示遮罩
          zIndex: 19891110,
          cancel: () => {
            //关闭事件
            this.currentPage = "";
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
          let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.id,oneORmore:2};
          _this.$store.commit('set_active_layerifranme',layerifranmedata);
          _this.$refs.singleTable.setCurrentRow(row);
      },
      reloadContractList() {
        this.getFinanceData();
      },
      getQuickDate(value) {
        let time = quickDate.getTwoDateByDay(value);
        this.form.timeStart = time.startTime;
        this.form.timeEnd = time.endTime;
        if (value != 1) {
          this.timeDisabled = true;
        } else {
          this.timeDisabled = false;
        }
      },
      modifyNumClick() {
        let select = this.multipleSelection.toString();
        if (select) {
          this.$refs["modifyNum"].newModifyNum(select);
        } else {
          this.myAlert("请选择合同！", "dangerous-icon");
        }
      },
      findParamsByType(){
        let businessType1Params = this.businessType1Params;
        let child = [];
        businessType1Params.forEach(item => {
          if(item.select){
            let elemChild = item.children;
            elemChild.forEach(item =>{
              let remark = item.remark;
              if(remark != null){
                item.name = item.name + remark;
              }
                
            })
            if(elemChild){
              child = child.concat(elemChild);
            }
          }
        })
        let initArr = [{id:"-1",name:"全部",select:true}];
        child.forEach(item=>{
          initArr.push({
            id:item.id,
            name:item.name,
            select:false,
          })
        }) 
        this.businessType2Params  = initArr; 
      },
      //获取跟进参数
      getFollowParamData() {
        let _this = this;

        financeParams('').then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.getQuickDate(9);
            let initArr = [{id:"-1",name:"全部",select:true}];
            let sourceGetIdParams = data.sourceGetIdParams;
            let businessType1Params = data.businessType1Params;
            if(sourceGetIdParams && sourceGetIdParams.length != 0){
              _this.sourceGetIdParams1 = JSON.parse(JSON.stringify(initArr.concat(sourceGetIdParams)));
              _this.sourceGetIdParams2 = JSON.parse(JSON.stringify(initArr.concat(sourceGetIdParams)));
            }
            if(businessType1Params && businessType1Params.length != 0){
              businessType1Params.forEach(item =>{
                let remark = item.remark;
                if(remark != null){
                  item.name = item.name + remark;
                }
                 
              })
              _this.businessType1Params = JSON.parse(JSON.stringify(initArr.concat(businessType1Params)));
              _this.businessType2Params = JSON.parse(JSON.stringify(initArr));
            }
            _this.contratStateParams = initArr;

            _this.getFinanceData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
        contractParams().then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
           
            let stateIdParams = data.stateIdParams;
            let finishEndParams = data.finishEndParams;
            let finishSalaryParams = data.finishSalaryParams;
            _this.stateIdParams = [{id:"-1",name:"全部",select:true}].concat(stateIdParams).concat(finishEndParams).concat(finishSalaryParams);
            _this.getFinanceData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      finUserByDepart() {
        let _this = this;
        let id = this.getSelectIdByList(_this.departParams);
        if (id) {
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
        } else {
          _this.userParams = [{ id: "-1", name: "全部", select: true }];
        }
      },
      //获取合同数据
      getFinanceData() {
        let _this = this;
        //加载动画
        _this.$layer.loading({
          shade: true
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let sourceGetIdIds = _this.getSelectIdByList(_this.sourceGetIdParams1);
        let targetPayIdIds = _this.getSelectIdByList(_this.sourceGetIdParams2);
        let businessType1Ids= _this.getSelectIdByList(_this.businessType1Params);
        let businessType2Ids= _this.getSelectIdByList(_this.businessType2Params);
        let stateIds= _this.getSelectIdByList(_this.stateIdParams);
        form.sourceGetIdIds = sourceGetIdIds;
        form.targetPayIdIds = targetPayIdIds;
        form.businessType1Ids = businessType1Ids;
        form.businessType2Ids = businessType2Ids;
        form.stateIds = stateIds;
        contractFinanceListSpecial(form).then(function(response) {
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
        });
      },
      editorFinance(index, row) {
          debugger
          let _this = this;
          let ids = [];
          console.log(row);
          let currentData = this.currentData;
          
          this.currentPage = row;
          let test = _this.$layer.iframe({
            content: {
              content: EditorContractPage, //传递的组件对象
              parent: this, //当前的vue对象
              data: {
                id: row.contractId,
                address: row.roomAddress,
                activeName: "finance",
                ids: ids.toString(),
                currentIndex: index
              } //props
            },
            area: ["800px", "560px"],
            title:
              "合同信息 【出售:"+row.roomAddress +'&nbsp;&nbsp;&nbsp;&nbsp;'+
              "业主:" +row.ownerName +'&nbsp;&nbsp;&nbsp;&nbsp;'+
              "客户:" + row.customerName+"】",
            shadeClose: false,
            shade: false, //是否显示遮罩
            zIndex: 19891110,
            cancel: () => {
              //关闭事件
              this.currentPage = "";
            }
          });
      },
      searchConteactDataList() {
        this.getFinanceData();
      },
      reloadFinanceList() {
        this.getFinanceData();
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
          export_json_to_excel(tHeader, data, "应收应付");
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
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
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "应收应付修改 【"+_this.tableData[mycountnum].roomAddress+"】";
        _this.$refs.singleTable.setCurrentRow(_this.tableData[mycountnum]);

        let  callbackdata = {
          row: _this.tableData[mycountnum],
          thisindex:count,
        };
        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.tableData[mycountnum].id
          }
        })
        
        return callbackdata;
      },
      rowClass({ row, index }) {
        let className = "";

        if (row.id == this.currentPage.id) {
          className += "page-check";
        }
        return className;
      },

      //自选列
      clickColumn() {
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
      showSearch() {
        let rent = document.getElementById("follow-container");
        if (this.upAndDown == 1) {
          this.upAndDown = 2;

          rent.getElementsByClassName("content")[0].style.height =
            "calc(100% - 70px)";
          rent.getElementsByClassName("el-table")[0].style.height =
            "calc(100% - 70px)";
          document.getElementById("searchContent1").style.display = "none";
          document.getElementById("searchContent2").style.display = "none";
        } else {
          this.upAndDown = 1;
          rent.getElementsByClassName("content")[0].style.height =
            "calc(100% - 150px)";
          rent.getElementsByClassName("el-table")[0].style.height =
            "calc(100% - 150px)";
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

      findStreetByTown() {
        let _this = this;
        let ids = [];
        let areaParams = this.areaParams;

        /*ids = ids.toString();
        findbyId(ids).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let arr = [{ id: "-1", name: "全部", select: true }];
            if (data && data.length) {
              data.forEach(function(item) {
                arr.push({
                  id: item.id,
                  name: item.label,
                  select: false
                });
              });
            }
            _this.streetParams = arr;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });*/
      },

      tableRowClassName({ row, rowIndex }) {
        // 把每一行的索引放进row
        row.index = rowIndex;
      },
      getRowDataByClick(row, column, event) {
        debugger
        let _this = this;
        _this.currentNum = row.index + 1;
        _this.currentPage = row;
      },
      clearForm() {
        let _this = this;
        this.timeDisabled = true;
        this.quick = "9";
        this.form.timeStart = "";
        this.form.timeEnd = "";
        this.form.word = "";
        this.form.timeMode = '1';
        this.form.states = '-1';
        this.form.financeType = '-1';
        this.form.isAchievement = "-1";
        _this.getQuickDate(9);
        _this.sourceGetIdParams1 = _this.backSlect(_this.sourceGetIdParams1);
        _this.sourceGetIdParams2 = _this.backSlect(_this.sourceGetIdParams2);
        _this.businessType1Params = _this.backSlect(_this.businessType1Params);
        _this.businessType2Params = _this.backSlect(_this.businessType2Params);
        let businessType1Ids= _this.getSelectIdByList(_this.businessType1Params);
        let businessType2Ids= _this.getSelectIdByList(_this.businessType2Params);
        _this.stateIdParams = _this.backSlect(_this.stateIdParams);
      },
      //全选
      handleSelectionChange(elemCheckbox) {
        debugger
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
            if (select.indexOf(item.id) != -1) {
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
    mounted() {
      this.reloadListByStorage();
      this.shadenum();
      this.getFollowParamData();
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
        margin: 5px auto 0px;
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
