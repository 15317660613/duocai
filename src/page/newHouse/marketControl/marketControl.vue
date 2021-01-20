<template>
  <div class="rent-container mycontailerclass1" id="rent-container">
    <div class="top-container border-black" >

      <div class="search-container mycontailerclass2">
        <el-form ref="formsData"  :model="form" >

          <div  id="searchContent1"   class="clear" >

           <div class="left padding-l-5 padding-t-5" >
            <div class="border-icon clear" > 
              <i class="one-Thirteen-icon" title="过滤选中"  @click="filterData" ></i>
            </div>  
           </div>
           <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
           </div>
            <div type="primary"  class="padding-l-10 left padding-t-2" @click="exportToExcel" >
              <div class="border-icon clear" > 
                <i class="print-out-icon "></i>
              </div>  
            </div>

            <div class="padding-r-30 padding-l-10 left" >
              <div class="record-num" >
                <span>&lt;</span>
                <span>{{numleft}}</span><span>/</span><span>{{tableData.length}}</span>
                <span>&gt;</span>
              </div>
            </div>
            <div class="padding-t-2 left">
              <div class="border-icon clear" > 
                <i class="one-twelve-icon  padding-t-2" @click="tabRemove('/home/projectSales')"></i>
              </div>  
            </div>
          </div>

        </el-form>
      </div>
    </div>
    <div class="top-container border-black" >

      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >

          <div  id="searchContent1"   class="clear"  >

            <div class="left padding-l-15" >
              <span class="des-word" >日期</span>
            </div>
            <div class="left" >

              <el-form-item  label-width="0" prop="timeMode">
                <el-select v-model="form.timeMode" style="width:85px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="首开日期" value="1" ></el-option>
                  <el-option  label="最晚交房" value="2" ></el-option>
                </el-select>
              </el-form-item>
              <div class="left padding-l-2" >
                <el-form-item label="" label-width="0" prop="timeStart">
                  <el-date-picker size="mini" type="date"   v-model="form.timeStart" style="width: 90px;"></el-date-picker>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <el-form-item label="" label-width="0" prop="timeEnd">
                  <el-date-picker size="mini" type="date"   v-model="form.timeEnd" style="width: 90px;"></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >地域</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0" >
                <CheckSelectSpecial @findStreetByTown="findStreetByTown" :selectId="districtIds" :listData="areaParams"  style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" >
                <CheckSelectSpecial :selectId="streetIds" :listData="streetParams" style="width:110px;"></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >项目状态</span>
            </div>
            <div class="left" >
              <div class="left " >
                <el-form-item label="" label-width="0" >
                  <CheckSelectSpecial :selectId="projectStateIds" :listData="projectStateParams" style="width:90px;" ></CheckSelectSpecial>
                </el-form-item>
              </div>

            </div>
            <div class="left">
              <el-input v-model="form.word" title="项目名称" style="width:250px;margin:2px 0  0 50px" ></el-input>
            </div>
            <div class=" left padding-l-5" style="margin-top:2px;"  >
              <i class="search-btn" @click="searchKeyDataList" >查询</i>
            </div>
            <div class="left " style="margin-top:2px;"  >
              <i class="claerlys" @click="clearForm" ></i>
            </div>
            <!--<div class="left " style="margin-top:4px;" >
              <i :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}" @click="showSearch" ></i>
            </div>-->

          </div>
        </el-form>

      </div>
    </div>
    <div class="content clear" style="height:calc(100% - 100px)" >

      <div class="list-content" >
        <el-table
          @row-click="departDetil"
          highlight-current
          empty-text=""
          ref="multipleTable"
          highlight-current-row
          :data="tableData"
          use-virtual
          :row-class-name="tableRowClassName"
          @selection-change="gettableData"
          :cell-class-name="rowClass"
          style="width:100%;font-size: 12px;"
          border
          >
          <template v-if="item.show" v-for="(item,index) in columnData" >
            <el-table-column
              v-if="item.prop == 'name'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div   style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </template>

        </el-table>
      </div>
    </div>

  </div>
</template>


<script>

  import { PlTable, PlTableColumn } from 'pl-table';
  import {maketList} from "../../../service/marketControlData"
   import {identifyChipsParams} from "../../../service/salesControl";
  import {departmentParam} from "../../../utils/departparam";
  import CheckSelectSpecial from '../../../components/checkSpecial';
  import {getparams} from '../../../service/newHouse'
  import {findbyId} from "../../../service/getData";
  import EditorMarketControlPage from './editorMarketControl';
  export default {
    data() {
      return{
        columnData:departmentParam.marketControl,
        numleft:0,
        multipleSelection:[],
        projectStateParams:[],
        areaParams:[],
        streetParams:[],
        currentPage:{title:''},
        upAndDown:1,
        projectStateIds:"projectStateIds",
        districtIds:'districtIds',
        streetIds:"streetIds",
        form:{
          timeMode:"-1",
          timeStart:'',
          timeEnd:"",
          word:'',
        },
        tableData:[],
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
      }
    },
    components:{
      PlTable,
      PlTableColumn,
      CheckSelectSpecial,
      EditorMarketControlPage
    },
    methods:{
      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          let tHeader=[]
          this.columnData.forEach(item=>{
            tHeader.push(item.label)
          })
          let filterVal=[]
          this.columnData.forEach(item=>{
            filterVal.push(item.prop)
          })
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '项目销控列表')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

      //获取下标
      departDetil(row, column, event){
        this.numleft =row.index + 1
        this.currentPage = row;
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      gettableData(val){
        // debugger
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        val.forEach(item => {
          _this.multipleSelection.push(item.index);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },
      //过滤方法
      filterData(){
        let select = this.multipleSelection.toString()
        if(select){
          let arr = [];
          this.tableData.forEach(function(item){
            if(select.indexOf(item.index) != -1){
              arr.push(item);
            }
          })
          this.numleft=0
          this.tableData = arr;
        }else{
          this.myAlert('请选择需要过滤的数据!','dangerous-icon');
        }
      },
      handleEdit(index,row){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorMarketControlPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{myid:row.id,mythisindex:index}//props
          },
          area:['1150px','670px'],
          title: "销控信息 【"+row.name+"】",
          tips: 1,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
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
      marketResList(){
        maketList().then((response)=>{
          this.tableData=response.data
        })
      },
      getParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        getparams(true).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{id:"-1",name:"全部",select:true}];
            if(data.projectStateParams){
              let initArrSpecial = [{id:"-1",name:"全部",select:true}];
              data.projectStateParams.forEach(function(item){
                let obj = {
                  id:item.id,
                  name:item.name,
                  select:false,
                }
                
                initArrSpecial.push(obj);
              })
              _this.projectStateParams = initArrSpecial;
            }

            let areaList = data.areas;
            if(areaList && areaList.length != 0){
              let arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < areaList.length ; i++){
                arr.push({
                  id:areaList[i].id,
                  name:areaList[i].label,
                })
              }

              _this.areaParams = arr;
            }
            _this.streetParams = initArr;
            if(data.departTree) {
              let arr = [{id:"-1",name:"全部",select:true}];
              let treeData = data.departTree
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  select:false,
                })
              }
              _this.departParams = arr;
            }
            _this.userParams = [{id:'-1',name:'全部',select:true}]
            _this.searchKeyDataList();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      searchKeyDataList(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(this.form));
        let districtIds= this.getSelectIdByList( this.areaParams);
        let streetIds= this.getSelectIdByList( this.streetParams);
        let projectStateIds= this.getSelectIdByList( this.projectStateParams);
        this.numleft= 0;
        form.districtIds=districtIds
        form.streetIds=streetIds
        form.projectStateIds=projectStateIds;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        maketList(form).then((response)=>{
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
          return false;
          } else if (response.status == 0) {
            this.tableData=response.data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      rowClass({row, index}) {
        let className = "";
         if(row.id == this.currentPage.id){
          className += 'page-check';
        }
        return className;
      },
      findStreetByTown(){
        let _this = this;
        let ids = [];
        let areaParams = this.areaParams;
        if(areaParams){
          areaParams.forEach(function(item){
            if(item.select && item.id != '-1'){
              ids.push(item.id);
            }
          })
        }
        ids = ids.toString();
        findbyId(ids).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let arr = [{id:'-1',name:'全部',select:true}];
            if(data && data.length){
              data.forEach(function(item){
                arr.push({
                  id:item.id,
                  name:item.label,
                  select:false,
                })
              })
            }
            _this.streetParams = arr;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      showSearch(){
        let rent = document.getElementById("project-container");
        if(this.upAndDown == 1){
          this.upAndDown = 2;
          rent.getElementsByClassName("content")[0].style.height="calc(100% - 105px)";
          rent.getElementsByClassName("el-table")[0].style.height="calc(100% - 105px)";
          document.getElementById("project-search").style.display = "none";
        }else{
          this.upAndDown = 1;
          rent.getElementsByClassName("content")[0].style.height="calc(100% - 135px)";
          rent.getElementsByClassName("el-table")[0].style.height="calc(100% - 135px)";
          document.getElementById("project-search").style.display = "block";
        }
      },
      clearForm(){
        let _this = this;
        this.form.timeStart = '';
        this.form.timeEnd= '';
        this.form.word= '';
        this.form.timeMode='-1';
        _this.projectStateParams = _this.backSlect(_this.projectStateParams);
        _this.areaParams = _this.backSlect(_this.areaParams);
        _this.streetParams = _this.backSlect(_this.streetParams);
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
      changeTitle(count,needlayerid){
        let _this = this;
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "销控信息 【"+_this.tableData[count].name+"】";
        _this.$refs.multipleTable.setCurrentRow(_this.tableData[count]);

        let  callbackdata = {rowid: _this.tableData[count].id,thisindex:count,};
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
    
    this.getParamsData()
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
    .padding-r-30{
      padding-right: 30px;
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
    .search-btn,.claerlys{
      cursor:pointer;
    }
    .padding-t-2{
          padding-top: 2px;
    }

    .left{
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .icon {
      padding-left: 20px;

      span{
        display: block;
        width: 20px;
        height: 20px;
        background-size: 400px 291px;
        background-image: url("../../../images/icon.png") no-repeat;
      }
    }
  }
  
</style>
<style>
  .btn{
    background: none;
    border:1px solid #333;
    padding:3px 17px;
    margin-left: 20px;
  }
  .checkout{
    display: inline-block;
  }

</style>

