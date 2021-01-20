<template>
  <div class="depart-container mycontailerclass1">
    <div class="top-container " style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2 clear" style="height:32px;">
        <div class="item left p-l-10"  >
          <el-radio v-model="choosedetail" :label="1">
          <span class="m-l-5">部门明细</span></el-radio>
        </div>
        <div class="item left p-l-10"  >
          <el-radio @change="changechoose" v-model="choosedetail" :label="2">
          <span class="m-l-5">物理明细</span></el-radio>
        </div>
        <div class="item left p-l-10" >
          <i class="fa cut-icon cut"></i>
        </div>
        
        <div class="item left p-l-10 p-t-3">
          <div class="border-icon clear" > 
            <i class="one-Thirteen-icon" title="过滤选中" @click="filterData"></i>
          </div>  
        </div>

        <div class="item left p-l-10 p-t-2">
          <div class="border-icon clear" > 
            <i class="one-ten-icon" title="自选列" @click="clickColumn"></i>
          </div>  
        </div>

        <div class="item left p-l-10 p-t-2">
          <div class="border-icon clear" > 
            <i class="one-eleven-icon other" title="导出"  @click="exportToExcel" ></i>
          </div>  
        </div>

        <div class="item left p-l-10 p-t-3">
          <div class="border-icon clear" > 
            <i class="one-twelve-icon"  @click="tabRemove('/home/derpartment')"></i>
          </div>  
        </div>

        <div class="item left p-l-10" >
          <i class="fa cut-icon cut"></i>
        </div>

        <div class="item left p-l-10">
          <div class="record-num" >
            <span><</span>
            <span>{{numleft}}</span>
            <span >/</span>
            <span>{{tableData.length}}</span>
            <span>></span>
          </div>
        </div>
        


      </div>
      <div class="top-container1">
        <div class="search-container " >
          <el-form ref="formsData"  :model="form" >
            <div class="clear">
              <div class="left p-l-10" >
                <span class="des-word">部门状态</span>
              </div>
              <div class="left">
                <el-form-item>
                  <el-select v-model="sta1" style="width: 83px;height: 22px;">
                    <el-option v-for="item in starr1"  :label="item.name" :value="item.value" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left">
                <el-form-item>
                  <el-select @change="bumenchange" v-model="sta2"  style="width: 83px;height: 22px;">
                    <el-option v-for="item in starr2"  :label="item.name" :value="item.value" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="left p-l-10" >
                <span class="des-word">部门</span>
              </div>
              <div class="left">
                <el-form-item>
                  <CheckSelectSpecial @findStreetByTown="finUserState" :selectId="deid" class="left" :listData="delst" style="width: 83px;" ></CheckSelectSpecial>
                </el-form-item>
              </div>
              <div class="left">
                <el-form-item>
                  <CheckSelectSpecial  class="left" :selectId="duid" :listData="dulst" style="width: 83px;height: 22px;" ></CheckSelectSpecial>
                </el-form-item>
              </div>

              <div class="left p-l-10">
                <el-form-item>
                  <el-input v-model="desearch" style="width: 195px;" title="部门编号/部门名称/备注"></el-input>
                </el-form-item>
              </div>

              <div class=" left p-l-2 m-t-2" >
                <i class="search-btn" @click="searchdelist">查询</i>
              </div>

              <div class="left m-t-2">
                <i class="claerlys" @click="cleall" ></i>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    
    <div class="depart-content clear list-content list-container" >
      <div class="right-list-content left"  >
        <PlTable
          :datas="tableData"
          ref="singleTable"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          highlight-current-row
          @row-click="departDetil"
          :row-class-name="tableRowClassName"
          @selection-change="gettableData"
          :row-height="rowHeight"
        >
          <template v-if="item.show" v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop == 'name'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div  v-if="scope.row.state.indexOf('关闭')==-1" style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                  {{ scope.row.name }}
                </div>
                <div  v-if="scope.row.state.indexOf('关闭')!=-1" style="font-weight:700;color:#999;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                  {{ scope.row.name }}
                </div>
              </template>
            </PlTableColumn>
            <PlTableColumn
              v-else
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :show-overflow-tooltip="true"
            >
            </PlTableColumn>
          </template>

        </PlTable>
      </div>
    </div>
  </div>

</template>
<script>
  import {departmentParam} from '../../../utils/departparam'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {departparam,getdepartlist,leveldepart} from '../../../service/getdepartData'
  import DepartDetailPage from './departdetail'
  import { PlTable, PlTableColumn } from 'pl-table';
  import {changedparam} from '../../../service/organizeDate'
  // 自选列
  import ColumPage from '../../../components/column'
  export default {
    name: 'derpartment',
    components: {
      CheckSelectSpecial,
      DepartDetailPage,
      ColumPage,
      PlTable,
      PlTableColumn
    },
    data(){

      return{
        culumnTitle:'部门明细',
        rentColumnValue:false,
        sessionStr:'depart-list',
        rowHeight:27,
        choosedetail:1,
        columnData:departmentParam.deColumn,
        tableData:[],
        multipleSelection:[],
        numleft:0,
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        form:{

        },
        starr1:[
          {
            value:"-1",
            name:"全部"
          },{
          value:"常态",
          name:"常态"
         },
          {
            value:"关闭",
            name:"关闭",
          }],
        starr2:[{
          value:"-1",
          name:"全部"
        },{
            value:"1",
            name:"主",
          },{
          value:"0",
          name:"辅"
        }],
        delst:[
          
          {
            id:1,
            name:"层级一",
            level:1,
            select:false,
          },{
          id:2,
          name:"层级二",
          level:2,
          select:false,
        },{
          id:3,
          name:"层级三",
          level:3,
          select:false,
        },{
          id:4,
          name:"层级四", 
          level:4,
          select:false,
        },{
          id:5,
          name:"层级五",
          level:5,
          select:false,
        }],
        dulst:[],
        dulst1:[],
        dulst2:[],
        dulst3:[],
        dulst4:[],
        dulst5:[],
        deid:"deid",
        duid:"duid",
        sta1:"常态",
        sta2:"-1",
        desearch:""
      }
    },
    
    methods:{
      getDataParams(){
        let _this=this;
        let type = _this.sta2;
        this.$layer.loading({
          shade: true //是否显示遮罩
        });
        changedparam(type).then(function (res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if(res.status == 0){
            let staff=res.data
            _this.delst = [{id:'-1',name:"全部",select:true}].concat(_this.delst);

            staff.dept1.forEach(item=>{
              _this.dulst1.push({
                id:item.id,
                name:item.name,
                select:false,
              })
            });
            staff.dept2.forEach(item=>{
              _this.dulst2.push({
                id:item.id,
                name:item.name,
                select:false,
              })
            });
            staff.dept3.forEach(item=>{
              _this.dulst3.push({
                id:item.id,
                name:item.name,
                select:false,
              })
            });
            staff.dept4.forEach(item=>{
              _this.dulst4.push({
                id:item.id,
                name:item.name,
                select:false,
              })
            });
            staff.dept5.forEach(item=>{
              _this.dulst5.push({
                id:item.id,
                name:item.name,
                select:false,
              })
            });

            _this.dulst = [{id:'-1',name:"全部",select:true}].concat(_this.dulst1,_this.dulst2,_this.dulst3,_this.dulst4,_this.dulst5);
            _this.searchdelist();
          }else if (res.status == 1) {
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
          const tHeader = ['部门编号', '部门名称', '部门状态', '预算单位', '物理名称', '备注']
          const filterVal = ['num', 'label']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //部门下拉切换
      bumenchange(){
        let _this=this
        let state=this.sta1
        let type=this.sta2
        if(type==-1){
              type=""
        }else if(type==0){
              type="辅"
        }else if(type==1){
              type="主"
        }
        let isBusiness=""
        odeparttree(state,type,isBusiness).then(function (res) {
          let staff=res.data
          if(staff && staff.length != 0){
            let arr = [{id:'-1',name:"全部",select:true}];
            for(let i = 0 ; i  < staff.length ; i++){
              arr.push({
                id:staff[i].id,
                name:staff[i].label.replace(/&nbsp;/g,""),
                select:staff[i].select,
              })
            }
            _this.dulst = arr;
          }
        })
      },
      //
      levelchange(){
        let _this=this
        let de=this.delst
        let arr=[]
        for(var i=0;de.length>i;i++){
          if(de[i].select==true){
            arrsss.push(de[i].level)
          }
        }
        let level=arr.toString()
        leveldepart(level).then(function (res) {
          let staff=res.data
          if(staff && staff.length != 0){
            let arr = [{id:'-1',name:"全部",select:true}];
            for(let i = 0 ; i  < staff.length ; i++){
              arr.push({
                id:staff[i].id,
                name:staff[i].name.replace(/&nbsp;/g,""),
                select:staff[i].select,
              })
            }
            _this.dulst = arr;

          }
        })
      },
      //切换路由
      changechoose(){
        this.$router.push('/home/physical');
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
        //this.getRentParam();
      },
      //获取下标
      departDetil(row, column, event){
        let _this = this
        _this.numleft =row.index + 1
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex;
        if(row.state.indexOf('关闭') != -1){
          return 'isClosingAccountsStyle'
        }
      },
      //
      handleEdit(index,row){
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
           content: DepartDetailPage, //传递的组件对象
           parent: this, //当前的vue对象
           data: {
              mythisindex:index,
              rowData:row,
              showUpAndDown:true,
              thistrue:true,
              type:'全',
           } //props
         },
         title:'部门修改 【'+row.name+'】',
         area: ["600px", "550px"],
         shadeClose: false,
         shade: false, //是否显示遮罩
         zIndex: 19891110,
         cancel: () => {
         if( _this.initLeft != 0){
              _this.initLeft -= 10;
              _this.initTop -= 30;
            }
          }
        });
        let getLayerId = document.getElementById(layerId);
        getLayerId.style.left = "calc(50% + "+_this.initLeft+"px)";
        getLayerId.style.top =  "calc(50% + "+_this.initTop+"px)";
        _this.initLeft += 10;
        _this.initTop += 30;

        document.getElementById('thimyshade').style.display = "block";
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.id,oneORmore:2};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
        _this.$refs.singleTable.setCurrentRow(row);
      },
      gettableData(val){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        val.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));

      },
      //过滤方法
      filterData(){
        let select = this.multipleSelection.toString();
        if(select){
          let arr = [];
          this.tableData.forEach(function(item){
            if(select.indexOf(item.id) != -1){
              arr.push(item);
            }
          })
          this.numleft=0
          this.tableData = arr;
        }else{
          this.myAlert('请选择需要过滤的数据!','dangerous-icon');
        }
      },
      //清楚
      cleall(){
        this.sta1="-1"
        this.sta2="-1"
        this.desearch=""
        for(var i=0;this.delst.length>i;i++){
          this.delst[i].select=false
          if(this.delst[i].id==-1){
            this.delst[i].select=true
          }

        }
        for(var i=0;this.dulst.length>i;i++){
          this.dulst[i].select=false
          if(this.dulst[i].id==-1){
            this.dulst[i].select=true

          }
        }

      },
      //查询
      searchdelist(){
        let _this=this
        let form = {
          departIds:[],
          levels:[],
          state:this.sta1,
          type:'',
          word:this.desearch
        }
        _this.delst.forEach(item=>{
          if(item.select == true){
            form.levels.push(item.id);
          }
        })
        _this.dulst.forEach(item=>{
          if(item.select == true){
            form.departIds.push(item.id);
          }
        })
        let type=this.sta2
        if(type==0){
          form.type = "辅"
        }else if(type==1){
          form.type = "主"
        }else{
          form.type = "-1"
        }
        
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        
        getdepartlist(form).then(function (res) {
          _this.$layer.closeAll("loading");
          _this.tableData=res.data
        })
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
      finUserState() {
        let _this = this;
        let mydulst = [{id:'-1',name:"全部",select:true}];
        _this.delst.forEach((item,index)=>{
          if(item.select==true&&item.id==1){
            console.log('132');
            mydulst = mydulst.concat(_this.dulst1);
          };
          if(item.select==true&&item.id==2){
            mydulst = mydulst.concat(_this.dulst2);
          };
          if(item.select==true&&item.id==3){
            mydulst = mydulst.concat(_this.dulst3);
          };
          if(item.select==true&&item.id==4){
            mydulst = mydulst.concat(_this.dulst4);
          };
          if(item.select==true&&item.id==5){
            mydulst = mydulst.concat(_this.dulst5);
          };
          if(item.select==true&&item.id=='-1'){
            mydulst = mydulst.concat(_this.dulst1,_this.dulst2._this.dulst3,_this.dulst4,_this.dulst5);
          };
        });
        _this.dulst = mydulst;
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
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = '部门修改 【'+_this.tableData[mycountnum].name+'】';
        _this.$refs.singleTable.setCurrentRow(_this.tableData[mycountnum]);

        let  callbackdata = {
          row: _this.tableData[mycountnum],
          thisindex:mycountnum,
        };
        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.tableData[mycountnum].id
          }
        })
        return callbackdata;
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
      this.getDataParams();
      this.shadenum();
    },
  }
</script>

<style lang="scss" scoped>
  .mt{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  /deep/.list-content .el-table .el-table__body-wrapper{
        overflow: auto;
  }
  
  /deep/.el-table .cell.el-tooltip {
    color: black;
  }
  /deep/.list-content .el-table th .cell .el-checkbox__input .el-checkbox__inner::after {
    border-color: #000;
    border-width: 0px 1px 1px 0px !important;
    background: #DCD9D3;
    -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
  }
  .content{
    height: calc(100% - 150px);
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
  /deep/.el-table thead {
    color: black;

  }
  /deep/ .el-tree-node__label {
    font-size: 12px;
  }
  /deep/.el-radio{
    margin-right: 0px;
  }
  .right-list-content .el-table, .right-list-content .el-table__expanded-cell {
    background-color: #DCD9D3;
  }
  .serc{

    border-width: 1px;
    border-style: solid;
    border-color: rgb(174, 174, 174);
    border-radius: 5px;
  }
  .el-tree{
    min-width: 100%;
    display: inline-block;
  }
  .depart-container {
    height:100%;
    font-size: 12px;
    .top-container {
      width: calc(100% - 20px);
      margin: 0px auto 0px;
      .search-container {
        width: calc(100% + 2px);
        .item{
          line-height:20px;
          padding-left:15px;
          cursor:pointer;
          span{
            line-height:20px;
          }
          .down-icon{
            background:url(../../../images/system/xiala.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .search-icon{
            background:url(../../../images/system/chachong.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .cut-icon {
            background: url(../../../images/system/fenge.png) -100px -90px;
            width: 3px;
            height: 23px;
            display: block;
          }
          .move-icon{
            background:url(../../../images/system/loupandiaodong.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .merge-icon{
            background:url(../../../images/system/hebing.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .merge-icon:hover{
            background:url(../../../images/system/meyin.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .rule-icon{
            background:url(../../../images/system/guize.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .zixuanlie-icon{
            background:url(../../../images/qiet.png) -125px -120px;
            width:20px;
            height:20px;
            display:block;
          }
          
          .up-icon{
            background:url(../../../images/system/shangla.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .school-icon{
            background:url(../../../images/system/xuexiao.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .owner-icon{
            background:url(../../../images/system/wuyezhu.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .leading-out-icon{
            background:url(../../../images/system/daochu.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .leading-out-icon:hover{
            background:url(../../../images/yyf.png) -43px -9px;
            width:20px;
            height:20px;
            display:block;
            border: 1px solid black;
          }
          .back-icon{
            background:url(../../../images/system/tuichu.png) -15px -15px;
            width:20px;
            height:20px;
            display:block;
          }
          .back-icon:hover{
            background:url(../../../images/yyf.png) -956px -53px;
            width:20px;
            height:20px;
            display:block;
          }
          .up-down{
            font-size:12px;
            margin-top:1px;
            color:#336699;
          }
          .search-btn{
            border:1px solid #797979;
            border-radius:5px;
            background:#E4E4E4;
            padding:0px 10px;
            line-height:18px;
            margin-top:2px;
          }
          .other{
            margin-top:2px;
            font-size: 12px;
            color: #AB5F39;
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
          .add {
            font-size:12px;
            color: #008000;
            margin-top:3px;
          }
          .delete{
            font-size:12px;
            color: #FF0000;
            margin-top:3px;
          }
        }
      }
    }
    .top-container1 {
      .search-container {
        width: calc(100% + 2px);
        height: 38px;
        .item{
          line-height:22px;
          padding-left:15px;
          cursor:pointer;
          span{
            line-height:20px;
          }
          .down-icon{
            background:url(../../../images/system/xiala.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .search-icon{
            background:url(../../../images/system/chachong.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .move-icon{
            background:url(../../../images/system/loupandiaodong.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .merge-icon{
            background:url(../../../images/system/hebing.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .claerlys{
            background:url(../../../images/system/qingkong.png) -13px -13px;
            width:26px;
            height:22px;
            display:inline-block;
          }
          .merge-icon:hover{
            background:url(../../../images/system/meyin.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .rule-icon{
            background:url(../../../images/system/guize.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .zixuanlie-icon{
            background:url(../../../images/qiet.png) -125px -120px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .zixuanlie-icon:hover{
            background:url(../../../images/yyf.png) -201px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .up-icon{
            background:url(../../../images/system/shangla.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .school-icon{
            background:url(../../../images/system/xuexiao.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .owner-icon{
            background:url(../../../images/system/wuyezhu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .leading-out-icon{
            background:url(../../../images/system/daochu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .leading-out-icon:hover{
            background:url(../../../images/yyf.png) -43px -9px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .back-icon{
            background:url(../../../images/system/tuichu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .back-icon:hover{
            background:url(../../../images/yyf.png) -956px -53px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .up-down{
            font-size:12px;
            margin-top:1px;
            color:#336699;
          }
          .search-btn{
            border:1px solid #797979;
            border-radius:5px;
            background:#E4E4E4;
            padding:0px 10px;
            line-height:18px;
            margin-top:2px;
          }
          .other{
            margin-top:2px;
            font-size: 12px;
            color: #AB5F39;
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
          .add {
            font-size:12px;
            color: #008000;
            margin-top:3px;
          }
          .delete{
            font-size:12px;
            color: #FF0000;
            margin-top:3px;
          }
        }
      }
    }
    /deep/ .el-table .el-table__body-wrapper{
      height: calc(100vh - 176px) !important;
    }
    .depart-content{
      width: calc(100% - 20px);
      margin: 10px auto 0px;
      height:calc(100% - 55px);
      .left-tree-content{
        width:150px;
        height:100%;
        margin-right:10px;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
        background:#fff;
        overflow:auto;
      }
      .right-list-content{
        width:100%;
        height:calc(100% - 40px);
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
        background-color: #DCD9D3;
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

  /deep/ .el-table .isClosingAccountsStyle td{
    color: #999 !important;
  }
</style>
