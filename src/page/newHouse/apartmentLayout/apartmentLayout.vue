<template>
  <div class="depart-container mycontailerclass1">
    <div class="top-container " >
      <div class="search-container mycontailerclass2 clear" >
        <div class="item left" @click="editorProject" >
          <div class="border-icon clear" > 
            <span>查看项目</span>
          </div>  
        </div>
        <div class="item left" @click="deletedApartment">
          <div class="border-icon clear" > 
            <i class="fa fa-times delete"></i>
            删除户型
          </div>  
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class="left padding-l-5 padding-t-5" >
          <div class="border-icon clear" > 
            <i class="one-Thirteen-icon"   @click="filterData" ></i>
          </div>  
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class=" left" >
          <div class="border-icon clear" style="margin-top: 3px;"> 
            <i class="one-ten-icon" title="自选列" @click="clickColumn"></i>
          </div>  
        </div>
        <div type="primary" icon="document" class="item left" @click="exportToExcel">
          <div class="border-icon clear" > 
            <i class="leading-out-icon other"></i>
          </div>  
        </div>
        <div class="item left" >
          <div class="record-num" >
            <span><</span>
            <span>{{currentNum}}</span>
            <span >/</span>
            <span>{{tableData.length}}</span>
            <span>></span>
          </div>
        </div>
        <div class="item left clear"  @click="tabRemove('/home/apartmentLayout')">
          <div class="border-icon clear" > 
            <i class="back-icon user left" ></i>
          </div>  
        </div>
      </div>
    </div>
    <div class="top-container1">
      <div class="search-container clear " >
         <el-form ref="formsData" class="clear" :model="form" >
          <div class="left padding-l-15" >
            <span class="des-word" >地域</span>
          </div>
          <div class="left " >
            <el-form-item  label-width="0">
              <CheckSelectSpecial  @findStreetByTown="findStreetByTown"  class="left" :selectId="a1" :listData="alist1" style="width: 83px;" ></CheckSelectSpecial>
            </el-form-item>
          </div>
          <div class="left padding-l-2" >
            <el-form-item  label-width="0">
              <CheckSelectSpecial   :selectId="a2" :listData="alist2" style="width: 83px;" ></CheckSelectSpecial>
            </el-form-item>
          </div>
          <div class="left padding-l-15" >
            <span class="des-word" >项目状态</span>
          </div>
          <div class="left " >
            <el-form-item  label-width="0">
              <CheckSelectSpecial   :selectId="rcid" :listData="rective" style="width:63px;" ></CheckSelectSpecial>
            </el-form-item>
          </div>
          <div class="left padding-l-15" >
            <span class="des-word" >户型</span>
          </div>
          <div class="left " >
            <el-form-item  label-width="0">
              <CheckSelectSpecial  :selectId="apid" :listData="apart" style="width:63px;height: 22px;" ></CheckSelectSpecial>
            </el-form-item>
          </div>
          <div class="left padding-l-15" >
            <span class="des-word" >主力</span>
          </div>
          <div class="left " >
            <el-form-item  label-width="0">
              <el-select v-model="masp" style="width: 63px;height: 22px;">
              <el-option v-for="item in manp"  :label="item.name" :value="item.id" ></el-option>
            </el-select>
            </el-form-item>
          </div>
          <div class="left " style="padding-left:15px;"  >
            <el-form-item prop="word" label-width="0">
            <el-input title="楼盘名称/项目编号/销售地址/项目描述/佣金描述/适合人群/户型名称" v-model="desearch" style="width: 195px;" ></el-input>
            </el-form-item>
          </div>
          <div class=" left padding-l-5" style="margin-top:2px;"  >
            <i class="search-btn" @click="chaxun"   >查询</i>
          </div>

          <div class="left " style="margin-top:2px;"  >
            <i class="claerlys" @click="clearForm" ></i>
          </div>
         </el-form>  
      </div>
    </div>
    <div class="depart-content clear list-content list-container" >
      <div class="right-list-content left" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          @row-click="apartDetil"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          :cell-class-name="rowClass"
          :row-height="rowHeight"
          ref="singleTable"
        >
          <template v-if="item.show"  v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop=='check'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center"
              :type="item.type"
              :ref="item.ref"
              :fixed="item.fixed"
              :show-overflow-tooltip="true"
            >

            </PlTableColumn>
            <PlTableColumn
              v-else-if="item.prop=='roomShape'"
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
                <div  style="font-weight:700;color:rgb(51, 102, 153);text-algin:center;cursor:pointer;" @click="adetail(scope.$index, scope.row)" >
                  {{ scope.row.roomShape }}
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
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  // 自选列
  import ColumPage from '../../../components/column'

  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {apartparam,apartlist,delapart} from '../../../service/apartmentData'
  import {findbyId} from '../../../service/getData'
  import { PlTable, PlTableColumn } from 'pl-table';
  import {apartParamnes} from '../../../utils/apartparames'
  import apartcloum from './apartcloum'
  import EditorApartmentPage from './../project/editorApartment'
  import EditorProjectPage from '../project/editorProject'
  export default {
        name: "apartmentLayout",
        components: {
          CheckSelectSpecial,
          PlTable,
          PlTableColumn,
          ColumPage,
          EditorApartmentPage,
          EditorProjectPage
        },
        data(){
          return{
            editorApartmentValue:false,
            columnValue:false,
            sessionStr:'apartment-list',
            culumnTitle:'户型列表',
            columnData:apartParamnes.apaColumn,
            rowHeight:27,
            ids:[],
            sda:"",
            currentPage:{title:''},
            tableData:[],
            apnums:0,
            currentNum:0,
            multipleSelection:[],
            alist1:[],
            alist2:[{
              id:-1,
              name:"全部",
              select:true
            },],
            a1:"a1",
            a2:"a2",
            rective:[],
            rcid:"rcid",
            apart:[],
            apid:"apid",
            masp:-1,
            desearch:'',
            manp:[{
              id:-1,
              name:"全部",
            },{
              id:0,
              name:"主力户型",
            },{
              id:1,
              name:"非主力户型",
            },],
            form:{

            },
            initLeft:0,//初始化详情弹窗的增加 left
            initTop:0,//初始化详情弹窗的增加 top
          }
        },

        methods: {
          //导出
          exportToExcel () {
            // excel数据导出
            require.ensure([], () => {
              const {
                // eslint-disable-next-line camelcase
                export_json_to_excel
              } = require('../../../assets/js/Export2Excel.js')
              const tHeader = [' 项目名称','项目状态','户型名称','户型','面积(㎡)',' 用途',' 装修','参考均价','价格','适合人群','在售栋数','在售面积','在售套数','亮点介绍']
              const filterVal = ['projectName', 'projectState', 'typeName', 'roomShape',
                , 'areaLow', 'roomUseId', 'decorateId', 'avePrice', 'price',
                'suitableFor', 'saleBuildingCount','saleArea', 'saleHouseCount', 'highLightDesc']
              const list = this.tableData
              const data = this.formatJson(filterVal, list)
              export_json_to_excel(tHeader, data, '列表excel')
            })
          },
          formatJson (filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
          },
          apinit () {

            let _this = this
            let arr = [{id: '-1', name: "全部", select: true}];
            _this.alist2 = arr;
            let flag = true
            apartparam(flag).then(function (res) {

              let a1 = res.data.areas
              if (a1 && a1.length != 0) {
                let arr = [{id: '-1', name: "全部", select: true}];
                for (let i = 0; i < a1.length; i++) {
                  arr.push({
                    id: a1[i].id,
                    name: a1[i].label.replace(/&nbsp;/g, ""),
                    select: a1[i].select,
                  })
                }
                _this.alist1 = arr;
              }
              let pro = res.data.projectStateParams
              if (pro && pro.length != 0) {
                let arrs = [{id: '-1', name: "全部", select: true}];
                for (let i = 0; i < pro.length; i++) {
                  arrs.push({
                    id: pro[i].id,
                    name: pro[i].name.replace(/&nbsp;/g, ""),
                    select: pro[i].select,
                  })
                }
                _this.rective = arrs;
              }
              let ap = res.data.types
              if (ap && ap.length != 0) {
                let arrd = [{id: '-1', name: "全部", select: true}];
                for (let i = 0; i < ap.length; i++) {
                  arrd.push({
                    id: ap[i].id,
                    name: ap[i].name.replace(/&nbsp;/g, ""),
                    select: false,
                  })
                }
                _this.apart = arrd;
              }

            })
            let districtIds = -1
            let isHighQualitys = -1
            let projectStates = -1
            let streetIds = -1
            let typeName = -1
            let word = ""
            apartlist(districtIds, isHighQualitys, projectStates, streetIds, typeName, word).then(function (res) {

              _this.tableData = res.data
            })
          },
          //qingchu
          clearForm(){
            for(var i=0;this.alist1.length>i;i++){
              if(this.alist1[i].name=="全部"){
                this.alist1[i].select=true
              }else{
                this.alist1[i].select=false
              }
            }
            for(var i=0;this.alist2.length>i;i++){
              if(this.alist2[i].name=="全部"){
                this.alist2[i].select=true
              }else{
                this.alist2[i].select=false
              }
            }
            for(var i=0;this.rective.length>i;i++){
              if(this.rective[i].name=="全部"){
                this.rective[i].select=true
              }else{
                this.rective[i].select=false
              }
            }
            for(var i=0;this.apart.length>i;i++){
              if(this.apart[i].name=="全部"){
                this.apart[i].select=true
              }else{
                this.apart[i].select=false
              }
            }
            this.masp=-1
            this.desearch = "";

          },
          findStreetByTown () {
            let _this = this
            let ids = []
            for (var i = 0; this.alist1.length > i; i++) {
              if (this.alist1[i].select == true) {
                ids.push(this.alist1[i].id)
              }
            }
            ids = ids.toString()

            findbyId(ids).then(function (response) {
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                let data = response.data;
                let arr = [{id:'-1',name:'全部',select:true}];
                if(data && data.length){
                  data.forEach(function(item){
                    arr.push({
                      id: item.id,
                      name: item.label,
                      select:false,
                    })
                  })
                }
                _this.alist2 = arr;

              } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message+"！");
              }
            })
          },
          editorProject(){
            debugger;
            let _this = this;
            let select = this.multipleSelection;
            if(select && select.length == 1){
              let str = select.toString();
              let tableData = this.tableData;
              let projectId = "";
              let projectName = "";
              tableData.forEach(item => {
                if(item.id == str){
                    projectId = item.projectId;
                    projectName = item.projectName;
                    return false;
                }
              })
              let layerId = _this.$layer.iframe({
                content: {
                  content: EditorProjectPage, //传递的组件对象
                  parent: this,//当前的vue对象
                  data:{id:projectId,'activeName':'apartment'}//props
                },
                area:['800px','560px'],
                title: "项目信息 【"+projectName+"】",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                  
                }
              });
            }else{
              this.myAlert("选中，请选择一条户型再点击查看！","dangerous-icon");
            }  
          },
          //详情
          adetail (index, row) {
            let _this = this;
            this.ids.push(row.id);
            let layerId = _this.$layer.iframe({
              content: {
                content: EditorApartmentPage, //传递的组件对象
                parent: this,//当前的vue对象
                data:{id:row.id,projectId:row.projectId,typeName:row.typeName,thisindex:index}//props
              },
              area:['550px','250px'],
              title: "户型修改 【"+row.typeName+"】",
              shadeClose: false,
              shade: true,//是否显示遮罩
              zIndex:19891110,
              cancel:()=>{//关闭事件
                _this.currentPage = '';
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

            let mygetLayerId = document.getElementById(layerId).getAttribute('id');
            document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
            document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
            let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
            _this.$store.commit('set_active_layerifranme',layerifranmedata);
          },
          //获取下标
          apartDetil (row, column, event) {
            this.apnums = row.index + 1
            this.currentPage = row;
          },

          rowClass({row, index}) {
            let className = "";
             if(row.id == this.currentPage.id){
              className += 'page-check';
            }
            return className;
          },
          tableRowClassName ({row, rowIndex}) {
            // 把每一行的索引放进row
            row.index = rowIndex
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
          //过滤方法
          filterData () {
            let select = this.multipleSelection.toString();
            if (select) {
              let arr = [];
              this.tableData.forEach(function (item) {
                if (select.indexOf(item.id) != -1) {
                  arr.push(item);
                }
              })
              this.apnums = 0
              this.tableData = arr;
            }else{
              this.apnums = 0
              this.tableData = [];
            }
          },

          deletedApartment(){
            let _this =  this;
            let select = this.multipleSelection.toString();
            if(select){
              _this.myConfirm("【户型】删除后将不能还原！","question-icon",'是','否',"确定要永久删除选定的记录吗？").then(res => {
                delapart(select,1).then(function (response) {
                  if (response.status == 500) {
                    return false;
                  } else if (response.status == 0) {
                    _this.myAlert("删除成功！",'success-icon').then(res => {
                      let id = _this.multipleSelection;
                      let temp = _this.tableData.concat();
                      for(let i = 0 , len = id.length; i < len ; i++ ){
                        temp = _this.deletArrByValue(temp,id[i]);
                      }
                      _this.tableData = temp;
                      _this.currentNum = 0;
                      _this.multipleSelection = [];
                    }).catch(err => {

                    })
                  } else if (response.status == 1) {
                    let message = response.msg;
                    _this.myAlert(message + "！");
                  }
                })
              }).catch(err => {
                
              })

            }else{
              this.myAlert("请选择要删除的户型！",'dangerous-icon');
            }
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
          //...
          watchprojet(){

            this.$router.push('/home/editorApartment');
          },
          reloadApartmentList(){
            let _this = this;
            _this.apinit()
          },
          //查询
          chaxun(){

            let _this=this
            let districtIds = []
            for(var i=0;this.alist1.length>i;i++){
              if(this.alist1[i].select==true){
                districtIds.push(this.alist1[i].id)
              }
            }
            districtIds=districtIds.toString()
            let isHighQualitys = this.masp
            let projectStates = []
            for(var b=0;this.rective.length>b;b++){
              if(this.rective[b].select==true){
                projectStates.push(this.rective[b].id)
              }
            }
            projectStates=projectStates.toString()
            let streetIds =[]
            for(var d=0;this.alist2.length>d;d++){
              if(this.alist2[d].select==true){
                streetIds.push(this.alist2[d].id)
              }
            }
            streetIds=streetIds.toString()
             this.apnums = 0;
            let typeName = []
            for(var a=0;this.apart.length>a;a++){
              if(this.apart[a].select==true){
                typeName.push(this.apart[a].id)
              }
            }
            typeName=typeName.toString()
            let word = this.desearch
            apartlist(districtIds, isHighQualitys, projectStates, streetIds, typeName, word).then(function (res) {

              _this.tableData = res.data
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
          changeTitle(count,needlayerid){
            let _this = this;
            let currentData = this.tableData;
            _this.currentPage = currentData[count];
            let getLayerId = document.getElementById(needlayerid);
            getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="户型修改 【"+_this.currentPage.typeName+"】";
            this.$refs.singleTable.setCurrentRow(_this.currentPage);

            let  callbackdata = {
              row: _this.currentPage,
              thisindex:count,
            };
            return callbackdata;
          },
        },
        mounted(){
          this.reloadListByStorage();
          this.apinit();
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
    }
</script>

<style lang="scss" scoped>

  .mt{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  /deep/.right-list-content .el-table, .right-list-content .el-table__expanded-cell {
    background-color: #DCD9D3!important;
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
  /deep/ .el-table .cell.el-tooltip {
    min-width: inherit;
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
  .padding-l-2{
    padding-left:2px;
  }
  .padding-l-15{
    padding-left:15px;
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
            display:block;
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
          .zixuanlie-icon:hover{
            background:url(../../../images/yyf.png) -202px -15px;
            width:20px;
            height:20px;
            display:inline-block;
            border: 1px solid black;
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
            display:block;
          }
          
          .back-icon{
            background:url(../../../images/system/tuichu.png) -15px -15px;
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
      width: calc(100% - 20px);
      margin: 5px auto 0px;
      .search-container {
        width: calc(100% + 2px);
        .item{
          line-height:30px;
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
    .depart-content{
      width: calc(100% - 20px);
      margin: 5px auto 0px;
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
        height:calc(100% - 50px);
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

</style>
