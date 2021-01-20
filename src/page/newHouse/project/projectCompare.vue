<template>
  <div class="rent-container mycontailerclass1">
    <div class="top-container border-black" >
      <div class="search-container mycontailerclass2">
        <div class="clear" >
          <div class="left padding-l-15"  >
            <el-radio @change="changeToProject"  v-model="rendOrCustomer" :label="1">&nbsp;</el-radio>
          </div>
          <div class="left" >
            项目列表
          </div>
          <div class="left padding-l-10" >
            <el-radio  v-model="rendOrCustomer" :label="2">&nbsp;</el-radio>
          </div>

          <div class="left" >
            项对列表
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-5" @click="filterData"  >
            过滤选中
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-column-icon"></i>
          </div>
          <div class="left padding-l-10"  >
            <i class="leading-out-icon" title="自选列" @click="rentColumn"  ></i>
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
            <i class="back-icon user left" @click="tabRemove('/home/project')" ></i>
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>

        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" style="margin-top: 5px;margin-bottom: 5px">
            <div class="left padding-l-15" >
              <span class="des-word" >标记日期</span>
            </div>
            <div class="left " >
              <el-form-item prop="quick" label-width="0">
                <el-select @change="getQuickDate" v-model="quick"    style="width:85px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="今天" value="2" ></el-option>
                  <el-option  label="三天" value="3" ></el-option>
                  <el-option  label="七天" value="4" ></el-option>
                  <el-option  label="一月" value="5" ></el-option>
                  <el-option  label="三月" value="6" ></el-option>
                  <el-option  label="一年" value="7" ></el-option>
                  <el-option  label="自定义" value="1" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd" v-model="form.timeStart" style="width: 90px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd" v-model="form.timeEnd" style="width: 90px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >标记员工</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial @findStreetByTown="finUserByDepart" :selectId="departIds" :listData="departParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="userId" :listData="userParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >进程</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="processId" :listData="processParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >状态</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-select v-model="form.state"    style="width:85px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="有效" value="1" ></el-option>
                  <el-option  label="无效" value="2" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-15" style="padding-top:2px;" >
              <el-checkbox v-model="form.removal" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
            </div>
            <div class="left" style="margin-left:-10px;margin-top:3px;" >
              客源去重
            </div>
            <div class="left " style="padding-left:30px;" >
              <el-form-item label="" label-width="0">
                <el-input v-model.trim="form.word" maxlength="30" title="项目编号、项目名称, 户型" style="width:145px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-2" style="padding-top:1px;" >
              <i class="search-btn" @click="getHouseCompareData"  >查询</i>
            </div>
            <div class="left padding-l-2"  style="padding-top:2px;" >
              <i class="claerlys"  @click="clearForm"  ></i>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear" >

      <div class="list-content" >
        <el-table
          :data="tableData"
          border
          height="100%"
          :row-style="rowStyle"
          :cell-class-name="rowClass"
          @row-click="getRowDataByClick"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
        >
          <template v-if="item.show" v-for="(item,index) in columnData" >
            <el-table-column
              v-if="item.prop == 'house'"
              :width="item.width"
              :prop="item.prop"
              :label="item.label"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
            >
              <template  slot-scope="scope">
                <div style="">
                  <div class="" style="width:120px;text-align:center;" >
                    <i class="building-list-icon" ></i>
                  </div>
                  <div style="width:120px;line-height:18px;text-align:center;padding-bottom:14px;" >
                    <span @click="editorRent(scope.$index, scope.row)" v-html="scope.row.houseAddress" style="cursor:pointer;color:#336699;font-weight:700" > </span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
            >
            </el-table-column>


          </template>
          <el-table-column
            :width="contentWidth"
            prop="customer1"
            label="客源信息"
            sortable=true
          >
            <template  slot-scope="scope">
              <div class="clear" style="height:118px;">
                <div  v-for="(item , index) in scope.row.buyList" class="left" style="width:135px;height:118px;border-right:1px solid #fff;position:relative;" >
                  <div v-if="item.name" class="clear" >
                    <div class="clear" style="height:18px;" >
                      <div class="left" >
                          <span @click="modifySequenceNum(item.id,item.customerId)" style="cursor:pointer;display:inline-block;width:20px;height:20px;background:#BE8F0D;color:#fff;font-weight:700;text-align:center;line-height:20px;border-radius:10px;" >
                            {{item.indexId}}
                          </span>
                      </div>
                      <div @click="modifyCustomerNum(item.customerId)" class="right" style="cursor:pointer;font-weight:700;font-size:14px;padding:2px;" >
                        {{item.num}}
                      </div>
                    </div>
                    <div style="position:relative" >
                      <div style="position:absolute;top:-5px;left:40px;" >
                        {{item.customerType}}
                      </div>
                      <div style="padding-left:48px;" >
                        <i :class="{'sex-icon':item.gender == '女','male-sex-icon':item.gender == '男'}" ></i>
                      </div>
                    </div>
                    <div class="clear" style="padding-top:3px;" >
                      <div @click="modifyProgressElem(item.id)" class="left" style="cursor:pointer;padding-left:18px;font-size:14px;line-height:18px;height:18px;font-weight:700" >
                        {{item.processingStateId}}
                      </div>
                      <div @click="editorCustomer(item.customerId,item.name,scope.row)"  class="left" style="cursor:pointer;color:#336699;font-weight:700;background:#fff;line-height:18px;height:18px;width:70px;text-align:center;border-radius:3px;" >
                        {{item.name}}
                      </div>
                      <div class="left" >
                        <i @click="removeCompareClick(scope.row.id,item.id)" class="remove-buy-icon" ></i>
                      </div>
                    </div>
                    <div class="clear" style="text-align:center;height:23px;" >
                        <span class="left" style="color:#666;padding-left:10px;" >
                          {{item.num}}
                        </span>
                      <span class="left" style="color:#666;" >
                          {{item.createBy}}
                        </span>
                    </div>
                    <div class="clear" style="text-align:center;line-height:12px;" >
                        <span style="color:#999;" >
                          {{item.createTime}}
                        </span>
                    </div>
                  </div>
                  <div v-else="item.num" class="left" style="width:135px;height:118px;border-right:1px solid #fff;" >

                  </div>

                </div>
                <div class="left clear " style="width:120px;height:118px;" >
                  <div class="left" >
                    <div class="clear" style="height:118px;width:80px" >
                      <div  class="clear" v-for="(value, key,index) in scope.row.processing" style="padding:2px 5px;" >
                        <div class="left" >
                          {{key}}:
                        </div>
                        <div class="left" >
                          {{value}}个
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="left" style="height:118px;width:40px;" >
                    <i @click="moreCompareClick(scope.row)" class="more-icon" ></i>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="component-container" >
      <ModifyProgressPage @findCustomerListByHouse="findCustomerListByHouse" :modifyProgressVisible="modifyProgressValue"  ref="modifyProgress" ></ModifyProgressPage>
    </div>
    <div class="component-container" >
      <ModifySequencePage  @findCustomerListByHouse="findCustomerListByHouse"  :modifySequenceVisible="modifySequenceValue"  ref="modifySequence" ></ModifySequencePage>
    </div>

    <div class="component-container" >
      <ModifyNumPage  @findCustomerListByHouse="findCustomerListByHouse"   :modifyNumVisible="modifyNumValue"  ref="modifyNumId" ></ModifyNumPage>
    </div>
    <div class="component-container" >
      <ColumPage :culumnTitle="culumnTitle" @reloadListByStorage="reloadListByStorage" :columnData="columnData" :sessionStr="sessionStr"  :columnVisible="rentColumnValue"  ref="rentColumnId"  ></ColumPage>
    </div>
  </div>
</template>


<script>
  /*获取数据
  *
  * */
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {houseParirsParams,customerCompareList,removeCompare} from '../../../service/houseData'
  import {projectCompareList} from '../../../service/newHouse'
  import {departperson} from "../../../service/organizeDate";
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import ModifyProgressPage from './modifyProgress'
  import ModifySequencePage from './modifySequence'
  import ModifyNumPage from './modifyCustomerNum'
  // 编辑租售
  import EditorProjectPage from './editorProject'
  // 编辑客源
  import EditorCustomerPage from '../../customer/customer/editorCustomer'
  import {quickDate} from '../../../utils/getQuickDate'

  // 自选列
  import ColumPage from '../../../components/column'
  //获取数据
  export default {
    data() {
      return {
        rendOrCustomer:2,
        currentNum:0,
        modifyNumValue:false,
        modifyProgressValue:false,
        modifySequenceValue:false,
        rentColumnValue:false,
        moreCompareValue:false,
        rentColumnValue:false,
        multipleSelection:[],
        select:'depart',
        sessionStr:'project-compare',
        culumnTitle:'项对列表',
        maxNum:0,
        tableData:[],
        departParams:[],
        userParams:[{id:'-1',name:"全部",select:true}],
        processParams:[],
        stateParams:[],
        contentWidth:0,
        currentPage:'',
        departIds:'departIds',
        userId:'userId',
        processId:'processId',
        quick:'4',
        columnDataInit1:{
          id:20191201,
          type:'selection',
          prop:'check',
          label:'',
          width:'35',
          ref:'',
          sortable:false,
          show:true,
        },
        columnDataInit2:{
          id:20191202,
          type:'',
          prop:'house',
          label:'项目信息',
          width:'130',
          ref:'',
          sortable:false,
          show:true,
          fixed:false,
        },
        columnDataInit3:{
          id:20191203,
          type:'',
          prop:'customer1',
          label:'客源信息',
          width:'130',
          ref:'',
          sortable:false,
          show:true,
          fixed:false,
        },
        columnData:[
          {
            id:20191201,
            type:'selection',
            prop:'check',
            label:'',
            width:'35',
            ref:'',
            sortable:false,
            show:true,
            fixed:false,
          },
          {
            id:20191202,
            type:'',
            prop:'house',
            label:'项目信息',
            width:'130',
            ref:'',
            sortable:false,
            show:true,
            fixed:false,
          },
        ],
        form:{

          timeStart:'',
          timeEnd:'',
          state:'-1',
          word:'',
          removal:0,
        },

      };
    },
    components:{
      CheckSelectSpecial,
      ModifyNumPage,
      ModifyProgressPage,
      ModifySequencePage,
      EditorProjectPage,
      ColumPage
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
      changeToProject(){
        this.$router.push('/home/project');
      },
      editorRent(index, row){
        let _this = this;
        let ids = [];
        let currentData = this.tableData;
        let len = currentData.length;
        for(let i = 0 ;  i < len; i ++){
          ids.push(currentData[i].id);
        }
        this.currentPage = row;
        let test = _this.$layer.iframe({
          content: {
            content: EditorProjectPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,address:row.houseAddress,activeName:'project',ids:ids.toString(),currentIndex:index}//props
          },
          area:['800px','560px'],
          title:"项目信息 【"+ this.currentPage.houseAddress.replace("<br/>","")+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },
      editorCustomer(id,name,row){
        let _this = this;
        let ids = [id];

        let index = 0;
        this.currentPage = row;
        _this.$layer.iframe({
          content: {
            content: EditorCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:id,name:id,activeName:'house',ids:ids.toString(),currentIndex:index}//props
          },
          area:['800px','560px'],
          title:'客源信息',
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件

          }
        });
      },
      changeTitle(count){
        let _this = this;
        let currentData = this.tableData;

        _this.currentPage = currentData[count];
      },
      rowClass({row, index}) {
        let className = "";

        if(row.id == this.currentPage.id){
          className += 'page-check';
        }
        return className;
      },
      getHouseCompareParams(){
        let _this = this;
        houseParirsParams().then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.getQuickDate(4);
            let departTree = data.departTree;
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
              _this.userParams = [{id:'-1',name:"全部",select:true}];
            }
            let processingStateParams = data.processingStateParams;
            if(processingStateParams && processingStateParams.length != 0){
              let arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < processingStateParams.length ; i++){
                arr.push({
                  id:processingStateParams[i].id,
                  name:processingStateParams[i].name,
                  select:processingStateParams[i].select,
                })
              }
              _this.processParams = arr;
            }
            _this.getHouseCompareData();

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      //获取房对数据
      getHouseCompareData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
        form.deptIds = _this.getSelectIdByList(_this.departParams);
        form.userIds = _this.getSelectIdByList(_this.userParams);
        form.processingStateIds = _this.getSelectIdByList(_this.processParams);
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        projectCompareList(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            let title = response.data.title;
            let titleArr = [_this.columnDataInit1];
            title.forEach(function(item,index){
              let width = "75";
              if(item.title == "房自定号"){
                width = "80";
                item.title = "项自定"
              }
              titleArr.push({
                id:"201912"+index+3,
                type:'',
                width:width,
                ref:'',
                prop:item.field,
                label:item.title,
                sortable:false,
                fixed:false,
                show:true,
              })
            })
            titleArr.push(_this.columnDataInit2);
            _this.columnData = titleArr;

            _this.maxNum = response.data.maxNum;
            _this.contentWidth = (response.data.maxNum*1+1)*135+'px';
            let arr = [];
            data.forEach(function(item){

              _this.setArrList(item,_this.maxNum,item);
              arr.push(item);
            })

            _this.tableData = arr;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      //自选列
      rentColumn(){
        this.$refs["rentColumnId"].showDialogView(this.columnData);
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
      clearForm(){
        let _this = this;
        this.timeDisabled = false;
        this.quick = '4';
        this.form.timeStart = '';
        this.form.timeEnd= '';
        this.form.word= '';

        this.form.state = '-1';
        this.form.removal = 0;
        this.form.firstRemoval = 0;
        _this.getQuickDate(4);
        _this.departParams = _this.backSlect(_this.departParams);
        _this.userParams = _this.backSlect(_this.userParams);
        _this.processParams = _this.backSlect(_this.processParams);
      },
      setArrList(item,num,arr){
        let buyList = [];
        for(let i = 1 ; i <= num ; i++){
          buyList.push(item['pair'+i]);
        }
        arr.buyList = buyList;
      },
      modifyCustomerNum(id){
        debugger;
          this.$refs.modifyNumId.newModifyNum(id);
      },
      modifyProgressElem(id){
        this.$refs.modifyProgress.showDialog(id);
      },
      modifySequenceNum(id,customerId){
        this.$refs.modifySequence.showDialog(id,customerId);
      },
      removeCompareClick(houseId,ids){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        removeCompare(houseId,ids).then(function(response) {
          _this.$layer.closeAll("loading");4
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("解除配对成功!",'success-icon').then(res => {
              _this.getHouseCompareData();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      rowStyle({ row, rowIndex}) {
        if (rowIndex === 0) {
          return {'color':'green!important;'};
        } else {
          return ''
        }
      },
      finUserByDepart(){
        let _this = this;
        let id = this.getSelectIdByList(_this.departParams);
        if(id){
          departperson(id).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              user = [{id:'-1',name:"全部",select:true}].concat(user);
              _this.userParams = user;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.userParams = [{id:'-1',name:"全部",select:true}];
        }

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
      getRowDataByClick (row, column, event) {
        let _this = this
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
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
      moreCompareClick(row){
        let _this = this;
        _this.$layer.iframe({
          content: {
            content: EditorProjectPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,address:row.address,activeName:'compare',}//props
          },
          area:['800px','560px'],
          title: "项目信息 【"+ this.currentPage.houseAddress.replace("<br/>","")+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件

          }
        });
      },

      findCustomerListByHouse(){
        this.getHouseCompareData();
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
      this.getHouseCompareParams();
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
    .well-icon{
      background:url(../../../images/icon.png) -170px -5px;
      width:20px;
      height:20px;
      display:block;
    }

    .light-icon{
      background:url(../../../images/icon.png) -342px -2px;
      width:20px;
      height:20px;
      display:block;
    }

    .building-list-icon{
      background:url(../../../images/icon.png) -94px -144px;
      width:40px;
      height:40px;
      display:block;
      margin: 10px 30px 15px 40px;
    }

    .editor-icon{
      background:url(../../../images/icon.png) -112px -40px;
      width:20px;
      height:22px;
      display:block;
    }

    .use-icon{
      background:url(../../../images/icon.png) -114px -80px;
      width:20px;
      height:20px;
      display:block;
    }

    .change-icon{
      background:url(../../../images/icon.png) -312px -0px;
      width:20px;
      height:22px;
      display:block;
    }

    .user-house-icon{
      background:url(../../../images/icon.png) -140px -42px;
      width:20px;
      height:22px;
      display:block;
    }

    .change-type-icon{
      background:url(../../../images/icon.png) -35px -76px;
      width:20px;
      height:20px;
      display:block;
    }

    .leading-out-icon{
      background:url(../../../images/icon.png) -126px -118px;
      width:20px;
      height:20px;
      display:block;
    }
    .sex-icon{
      background:url(../../../images/icon.png) -3px -111px;
      width:33px;
      height:34px;
      display:block;
    }
    .male-sex-icon{
      background:url(../../../images/icon.png) -42px -109px;
      width:33px;
      height:34px;
      display:block;
    }
    .remove-buy-icon{
      background:url(../../../images/cuohao.png) -15px -16px;
      width:20px;
      height:20px;
      display:block;
      cursor:pointer;
    }
    .print-out-icon{
      background:url(../../../images/system/daochu.png) -15px -15px;
      width:20px;
      height:20px;
      display:block;
    }
    .more-icon{
      background:url(../../../images/icon2.png)  -38px -16px;
      width:10px;
      height:20px;
      display:block;
      margin: 52px 0 0 27px;
      cursor:pointer;
    }
    .more-icon:hover{
      background:url(../../../images/icon2.png) -21px -16px;
      width:10px;
      height:20px;
      display:block;
      margin: 52px 0 0 27px;
      cursor:pointer;
    }
    .print-out-icon:hover,.leading-out-icon:hover,
    .change-type-icon:hover,.user-house-icon:hover,
    .change-icon:hover,.use-icon:hover,.house-icon:hover,.light-icon:hover,.well-icon:hover,.editor-icon:hover{
      border:1px solid #828382;
    }
    .back-icon{
      background:url(../../../images/system/tuichu.png) -15px -15px;
      width:20px;
      height:20px;
      display:inline-block;
    }
    .word{

    }
    .content{
      height: calc(100% - 90px);
      width:100%;
      .list-content{
        width: calc(100% - 20px);
        height:100%;
        margin: 10px auto 0px;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
      }
    }

  }

</style>
