<template>
  <div class="organ-container mycontailerclass1">
    <div class="top-container " >
      <div class="search-container mycontailerclass2 clear" style="height:32px;" >
        <div class="item left" @click="upfo">
          
          <i class="down-icon up-down"></i>
        </div>
        <div class="item left"  @click="downfo">
          <i class="up-icon up-down"></i>
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class="item left" @click="addDepart">
          <div class="border-icon clear" > 
            <i class="fa fa-plus add"></i>
            <span>新增部门</span>
          </div>  
        </div>
        <div class="item left" @click="deldepart">
          <div class="border-icon clear" > 
            <i class="fa fa-times delete"></i>
            删除部门
          </div>  
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class="item left" @click="addPerson">
          <div class="border-icon clear" > 
            <i class="fa fa-plus add"></i>
            <span>新增人员</span>
          </div>  
        </div>
        <div class="item left" @click="depeople">
          <div class="border-icon clear" > 
            <i class="fa fa-times delete"></i>
            删除人员
          </div>  
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class="item left" @click="depmove" >
          <div class="border-icon clear" > 
            <i class="thirteen-one-icon left" style="margin-top: 3px;"></i>
            <span class="left" style="margin-left: 5px;">部门调动</span>
          </div>  
        </div>
       
        <div class="item left" @click="prmove" >
          <div class="border-icon clear" > 
            <i class="thirteen-one-icon left" style="margin-top: 3px;"></i>
            <span class="left" style="margin-left: 5px;">人员调动</span>
          </div>  
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class="item left" @click="showLevelPerson"  >
          <div class="border-icon clear" > 
            <i class="thirteen-two-icon left" style="margin-top: 3px;"></i>
            <span class="left" style="margin-left: 5px;">显示离职员工</span>
          </div>  
        </div>
        
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class="item left" @click="filterData" >
          <div class="border-icon clear" > 
            <i class="one-Thirteen-icon" title="过滤选中" style="margin-top: 3px;"></i>
          </div>  
        </div>
        <div class="left " style="padding:3px 0 0 15px;"  >
          <div class="border-icon" >
            <i class="one-ten-icon " title="自选列" @click="clickColumn"  ></i>
          </div>
        </div>
       
        <div  type="primary" icon="document" class="item left" @click="exportToExcel">
          <div class="border-icon clear" > 
            <i class="leading-out-icon other" title="导出"></i>
          </div>  
        </div>
        <div class="item left" >
          <div class="record-num" >
            <span><</span>
            <span>{{numy}}</span>
            <span >/</span>
            <span>{{tableData.length}}</span>
            <span>></span>
          </div>
        </div>
        <div class="item left clear" @click="tabRemove('/home/organize')" >
          <div class="border-icon clear" > 
            <i class="back-icon user left" ></i>
          </div>  
        </div>
      </div>
    </div>
    <div class="organ-content clear" >
      <div class="left-tree-content left" style="background-color: #EEEEEE">
        <div style="border-bottom:1px solid rgb(204, 204, 204);height: 30px;">
          <div style="border-right:2px solid rgb(204, 204, 204);width: 50%;float: left;padding-left: 15px;padding-top: 10px;">
              <span class="treechoose" v-show="!showcolorwite" @click="showdepart">部门</span>
              <span class="treechoosen" v-show="showcolorwite" @click="showdepart">部门</span>
              <span class="treechoose">/</span>
              <span class="treechoosen" v-show="!showcolorwite" @click="showduty">职位</span>
              <span class="treechoose" v-show="showcolorwite" @click="showduty">职位</span>
          </div>
          <div v-show="quanxushi" style="width: 50%;float: left;padding-left: 15px;padding-top: 10px;">
              <span class="treechoose" v-show="!alls" @click="allde">全</span>
              <span class="treechoosen" v-show="alls" @click="allde">全</span>
              <span class="treechoose">/</span>
              <span class="treechoose" v-show="!tuth" @click="tuthde">主</span>
              <span class="treechoosen" v-show="tuth" @click="tuthde">主</span>
              <span class="treechoose">/</span>
              <span class="treechoose" v-show="!falls" @click="fallsde">辅</span>
              <span class="treechoosen" v-show="falls" @click="fallsde">辅</span>
          </div>
          <div v-show="quanxushi1" style="width: 50%;float: left;padding-left: 15px;padding-top: 10px;">
            <span class="treechooseno">全</span>

            <span class="treechooseno">/</span>

            <span class="treechooseno">主</span>

            <span class="treechooseno">/</span>

            <span class="treechooseno">辅</span>
          </div>
        </div>
        <div v-show="declose" style="padding-top: 10px;padding-left: 10px;clear: both">
          <input  v-model="isCloseDepart" value="1" type="checkbox" style="float: left" @change="searchDepart">
          <span style="float: left;margin-top: -3px">包含关闭部门</span>
        </div>
        <el-tree :data="treeData"
                 highlight-current
                 :props="defaultProps"
                 @node-click="gettreeData"
                 default-expand-all
                 ref="selectTree"
                 style="font-size: 13px;background-color: #EEEEEE"
                 :expand-on-click-node="false"
                 node-key="id"
        >
          <span slot-scope="{node,data}">
            <span v-if="deduchage">
              <span v-if="data.level==1&&data.type=='主'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#333','max-width':'125px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>
             <span v-if="data.level==2&&data.type=='主'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#333','max-width':'105px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>
             <span v-if="data.level==3&&data.type=='主'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#333','max-width':'87px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>
             <span v-if="data.level==4&&data.type=='主'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#333','max-width':'69px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>
             <span v-if="data.level==5&&data.type=='主'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#333','max-width':'51px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>

             <span v-if="data.level==1&&data.type=='辅'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#006666','max-width':'125px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>
             <span v-if="data.level==2&&data.type=='辅'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#006666','max-width':'105px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>
             <span v-if="data.level==3&&data.type=='辅'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#006666','max-width':'87px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>
             <span v-if="data.level==4&&data.type=='辅'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#006666','max-width':'69px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>
             <span v-if="data.level==5&&data.type=='辅'" :style="{'font-size': '12px','color': data.state == '关闭' ? '#999': '#006666','max-width':'51px','display':'inline-block','overflow':'hidden','white-space':'nowrap','text-overflow':'ellipsis'}">{{node.label}}</span>
            </span>
            <span v-else>
              {{node.label}}
            </span>

            <div style="width: 30px;float: right;" @click="detdeparts(data)">
             <span v-if="data.level==1&&node.isCurrent==true" class="pencil" style="margin-left: 98px"></span>
             <span v-else-if="data.level==2&&node.isCurrent==true" class="pencil" style="margin-left: 68px" ></span>
             <span v-else-if="data.level==3&&node.isCurrent==true" class="pencil" style="margin-left: 50px"></span>
             <span v-else-if="data.level==4&&node.isCurrent==true" class="pencil" style="margin-left: 32px"></span>
             <span v-else-if="data.level==5&&node.isCurrent==true" class="pencil" style="margin-left: 3px"></span>
            </div>
          </span>
        </el-tree>
      </div>
      <div class="content clear left list-content list-container" style="width:calc(100% - 210px)" >
        <div class="right-list-content  left" style="width:100%;height:300px;"  >
          <PlTable



           :datas="tableData"
            :pagination-show="false"
            empty-text=" "
            use-virtual
            border
            height="300"
            
            @selection-change="handleSelectionChange"
            @row-click="getRowDataByClick"
            :row-class-name="tableRowClassName"
            :cell-class-name="rowClass"
            :row-height="rowHeight"
            ref="singleTable"
          >
            <template v-if="item.show"  v-for="(item,index) in columnData" >
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
                  <div  style="font-weight:700;text-algin:center;cursor:pointer" @click="userDetail(scope.$index, scope.row)" >
                    {{ scope.row.name }}
                  </div>
                 
                </template>
              </PlTableColumn>
              <PlTableColumn
                v-else-if="item.label == '!'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :align="item.align"
                :type="item.type"
                :ref="item.ref"
                :sortable="item.sortable"
                :show="item.show"
                :fixed="item.fixed"
                slot-scope="scope"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <div v-if='scope.row.gender=="男"'  class="mans">
                  </div>
                  <div v-if='scope.row.gender=="女"'  class="womans">
                  </div>
                </template>
              </PlTableColumn>

              <PlTableColumn
                v-else-if="item.type == 'selection'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :align="item.align"
                :type="item.type"
                :ref="item.ref"
                :sortable="item.sortable"
                :show="item.show"
                :fixed="item.fixed"
                slot-scope="scope"
                :show-overflow-tooltip="true"
              >

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
                slot-scope="scope"
                :show-overflow-tooltip="true"

              >
                
              </PlTableColumn>

            </template>

          </PlTable>
        </div>
      </div>

    </div>
   
    <div class="component-container" >
      <deletdepart @reloadDepart="reloadDepart" ref="deletdepart"></deletdepart>
    </div>
    
    <div class="component-container" >
      <peoplede ref="peoplede"></peoplede>
    </div>
    
    <div class="component-container" >
      <departmoves ref="departmoves"></departmoves>
    </div>=
    <div class="component-container" >
      <permove ref="permove" @reloadUserList="reloadUserList" ></permove>
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {odeparttree,ostaffttree,findUserByDutyId,findUserByDepartId,dutytree,dutyperson} from '../../../service/organizeDate'
  import {orgnizetionParam} from '../../../utils/orgnizeparam'
  import { PlTable, PlTableColumn } from 'pl-table';

  import AddDepartPage from '../depart/adddepart'
  import deletdepart from './deletdepart'
  import NewPersonPage from './newPerson'
  import peoplede from './peoplede'
  import DepartDetailPage from '../depart/departdetail'
  import PersonDetailPage  from './persondetail'
  // 自选列
  import ColumPage from '../../../components/column'
  import departmoves from './departmoves'
  import permove from './permove'
  export default {
    components: {
      AddDepartPage,
      deletdepart,
      NewPersonPage,
      peoplede,
      DepartDetailPage,
      PersonDetailPage,
      ColumPage,
      departmoves,
      permove,
      PlTable, 
      PlTableColumn
    },
    name: 'organize',
    data(){
      return{
        columnData:orgnizetionParam.orColumn,
        sessionStr:'orgnize-list',
        culumnTitle:'组织机构列表',
        rowHeight:27,
        rentColumnValue:false,
        currentNum:"",
        deduchage:true,
        numy:0,
        clickDepartData:"",
        level:"",
        shixu:"",
        currentDepart:"",
        dearr:[],
        preIdd:"",
        newpid:"",
        newplabel:"",
        showcolorwite:false,
        showcolorwite1:false,
        alls:false,
        tuth:false,
        falls:false,
        isCloseDepart:'',
        quanxushi:true,
        quanxushi1:false,
        declose:true,
        treeData:[],
        tableData:[],
        multipleSelection:[],
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        defaultProps: {
          children: 'children',
          label: 'label',
          id:'id',
          level:'',
          preId:''
        },
      }
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
    mounted () {
      this.searchdelist();
    },
    methods:{
      searchdelist(){
        let _this=this
        this.showcolorwite=true
        this.showcolorwite1=false
        this.quanxushi=true
        this.quanxushi1=false
        this.alls=false
        this.tuth=true
        this.falls=false
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        odeparttree("常态","主").then(function (res) {
         _this.treeData=res.data
          _this.$layer.closeAll("loading");
        })
        this.reloadListByStorage();
      },
      rowClass({row, index}) {
      
        let className = "";
       
        if(row.isPublicAccount  == '1') {
          
          className =  ' user-color2 ';
        }
        if(row.doBusiness == '1') {
          className =  ' user-color3 ';
        }
        
        if(row.doManage == '1') {
          className =  ' user-color4 ';
        }
        
        if (row.paramName == '正式离职') {
          className =  ' user-color1 ';
        }
        return className;
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
          export_json_to_excel(tHeader, data, "组织机构");
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
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
      // 折叠
      upfo () {
        let self = this
        // 将没有转换成树的原数据
        let treeList = this.treeData
        for (let i = 0; i < treeList.length; i++) {
          // 将没有转换成树的原数据设置key为... 的展开
          self.$refs.selectTree.store.nodesMap[treeList[i].id].expanded = true
        }
      },
      //  全部折叠
      downfo () {
        let self = this
        let treeList = this.treeData
        for (let i = 0; i < treeList.length; i++) {
          self.$refs.selectTree.store.nodesMap[treeList[i].id].expanded = false
        }
      },
      //选部门树状数据
      showdepart(){
        this.deduchage=true
        this.preIdd=""
        this.showcolorwite=true
        this.showcolorwite1=false
        this.quanxushi=true
        this.quanxushi1=false
        this.declose=true
        this.clickDepartData = "";
        this.tableData=[];
        this.searchDepart()
      },
      //选职位树状数据
      showduty(){
        let _this=this
        this.deduchage=false
        this.preIdd=""
        this.showcolorwite1=true
        this.showcolorwite=false
        this.quanxushi=false
        this.quanxushi1=true
        this.declose=false;
        this.clickDepartData = "";
        this.tableData=[]
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        dutytree().then(function (res) {
          _this.treeData=res.data
          _this.$layer.closeAll("loading");
        })
      },
      //全
      allde(){
        this.alls=true;
        this.tuth=false;
        this.falls=false;
        this.searchDepart()
      },
      //实
      tuthde(){
        this.alls=false;
        this.tuth=true;
        this.falls=false;
        this.searchDepart()
      },
      //虚
      fallsde(){
        this.alls=false;
        this.tuth=false;
        this.falls=true;
        this.searchDepart()
      },
      //新增部门
      addDepart(){
        let _this = this;
        let dd=this.deduchage
        let clickDepartData = this.clickDepartData;
        let type = '';
        if(this.alls){
          type = '全'
        }else if(this.tuth){
          type = '主'
        }else{
          type = '辅'
        }
        
        if(clickDepartData){
          
          let id=this.preIdd
          let level=this.level;
          if(!level){
              level = 1;
          }else if(level == 1){
              level = 2;
          }else if(level == 2){
            level = 3;
          }else if(level == 3){
            level = 4;
          }else if(level == 4){
            level = 5;
          }else if(level == 5){
            level = 6;
          }
          if(level == 6){
             this.myAlert("五级部门不能增加子部门!",'dangerous-icon');
              return false;
          }
          let layerId = _this.$layer.iframe({
            content: {
              content: AddDepartPage, //传递的组件对象
              parent: this, //当前的vue对象
              data: {
                id,
                type,
                level,
                clickDepartData,
                myThisType:0,
              } //props
            },
            title:"新增部门",
            area: ["600px", "410px"],
            shadeClose: false,
            shade: true, //是否显示遮罩
            zIndex: 19891110,
            cancel: () => {
            }
          });
          let getLayerId = document.getElementById(layerId);
          let mygetLayerId = document.getElementById(layerId).getAttribute('id');
          document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
          document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
          let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
          _this.$store.commit('set_active_layerifranme',layerifranmedata);
        }else{
          let layerId = _this.$layer.iframe({
            content: {
              content: AddDepartPage, //传递的组件对象
              parent: this, //当前的vue对象
              data: {
                id:'',
                type:type,
                level:1,
                clickDepartData:{},
                myThisType:1,
              } //props
            },
            title:"新增部门",
            area: ["600px", "410px"],
            shadeClose: false,
            shade: true, //是否显示遮罩
            zIndex: 19891110,
            cancel: () => {
            }
          });
          let getLayerId = document.getElementById(layerId);
          let mygetLayerId = document.getElementById(layerId).getAttribute('id');
          document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
          document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
          let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
          _this.$store.commit('set_active_layerifranme',layerifranmedata);
        }
        
      },
      //删除部门
      deldepart(){
        let dd=this.deduchage
        let id=this.preIdd
        if(id&&dd==true){
          this.$refs.deletdepart.showde(id)
        }else{
          this.myAlert("请选择要删除的部门")
        }
      },
      //部门详情
      detdeparts(row){
        let type = "";
        let _this = this;
        if(this.alls){
          type = '全'
        }else if(this.tuth){
          type = '主'
        }else{
          type = '辅'
        }
        
        let layerId = _this.$layer.iframe({
          content: {
            content: DepartDetailPage, //传递的组件对象
            parent: this, //当前的vue对象
            data: {
              rowData:row,
              showUpAndDown:false,
              thistrue:false,
              type:type,
            } //props
          },
          title:"部门修改 【"+row.label+"】",
          area: ["600px", "550px"],
          shadeClose: false,
          shade: true, //是否显示遮罩
          zIndex: 19891110,
          cancel: () => {
          }
        });
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      //新增人员
      addPerson(){
         let _this = this;
        let dd=this.deduchage;
        let departValue=this.currentDepart;
        let departId=this.newpid;
        let departData=this.newplabel;
        console.log(departValue);
        if(departValue.state=='关闭'){
          this.myAlert("已关闭的部门不允许新增人员")
        }else
        if(departId !="" && departData != "" && dd){
          let layerId = _this.$layer.iframe({
            content: {
              content: NewPersonPage , //传递的组件对象
              parent: this,//当前的vue对象
              data:{
                departId:departId,
                departData:departData,
                departValue:departValue,
              }//props
            },
            area:['800px','560px'],
            title: "新增人员",
            tips: 1,
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
        }else{
          this.myAlert("请先选择部门")
        }

      },
      //删除人员
      depeople(){
        let neid=this.currentDepart
        let arr=this.dearr
        if(arr.length<1){
          this.myAlert("选择要删除的人员")
        }else {
          this.$refs.peoplede.dpshow(arr,neid)
        }

      },
      reloadDepart(){
        this.searchDepart();
      },
      //包含关闭,全虚实
      searchDepart(){
        
         let _this=this;
         let all = this.alls;
         let tuth = this.tuth;
         let falls = this.falls;
         let isCloseDepart=this.isCloseDepart;
         var state="";
         var type="";
         if(all){
            if(!isCloseDepart){
              state = "常态";
            }
         }else{
           if(tuth){
             type = "主";
           }
           if(falls){
              type = "辅";
           }
           if(!isCloseDepart){
              state = "常态";
            } 
         }
       
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        odeparttree(state,type).then(function (res) {
          _this.treeData=res.data
          _this.$layer.closeAll("loading");
        })
        this.preIdd=""
        if(type=="辅"){
          this.shixu=1
        }
        if(type=="主"){
          this.shixu=0
        }
        this.level=""
        this.newpid=""
      },
      //获取节点
      gettreeData(val,ss,nn){
        this.level=val.level
        this.clickDepartData = val;
        this.shixu=val.type
        this.currentDepart=val;
        let _this=this
        this.newpid=val.id
        this.newplabel=val.label
        if(val.level!=undefined){
          this.preIdd=val.id
        }
        let wic=this.deduchage
        let id=""
        if(val.id){
          id=val.id;
        }else{
          id=val
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        if(wic==false){
          let form = {id:id,};
          findUserByDutyId(form).then(function (res) {
            if(res.status==0){
              _this.tableData=res.data.user
            }
            _this.$layer.closeAll("loading");
          })
        }else {
           let form = {id:id}
           findUserByDepartId(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
               _this.tableData=response.data.user
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      showLevelPerson(val){
        let _this=this;
        let departData = _this.currentDepart;
        
        let wic=_this.deduchage;
        let id=""
        if(!departData.id){
          return false;
        }else{
          id=departData.id
        };
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        if(wic==false && id != ''){
          let form = {id:id,showLeave:1}
          findUserByDutyId(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
               _this.tableData=response.data.user
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else if(id != ''){
          let form = {id:id,showLeave:1}
          findUserByDepartId(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
               _this.tableData=response.data.user
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
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
      reloadUserList(){
        let _this=this;
        let departData = this.currentDepart;
        
        let wic=this.deduchage;
        let id=""
        if(departData.id){
          id=departData.id
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        if(wic==false && id != ''){
          let form = {id:id,};
          findUserByDutyId(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
               _this.tableData=response.data.user
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else if(id != ''){
          let form = {id:id,};
          findUserByDepartId(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
               _this.tableData=response.data.user
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      //人员详情
      userDetail (index, row) {
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
        };
        let layerId = _this.$layer.iframe({
          content: {
            content: PersonDetailPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{myrow:row,type:1,mythisindex:index}//props
          },
          area:['800px','560px'],
          title:"人员修改 【"+ row.departName +"&nbsp;&nbsp;&nbsp;&nbsp;"+ row.name+"】",
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
        getLayerId.style.left = "calc(50% + "+this.initLeft+"px)";
        getLayerId.style.top =  "calc(50% + "+this.initTop+"px)";
        this.initLeft += 10;
        this.initTop += 30;

        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.id,oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
        try{
          _this.$refs.singleTable.setCurrentRow(row);
        }catch(e){
          
        }
        
		
      },
      //获取下标
      getRowDataByClick(row, column, event){
        let _this = this
        _this.numy =row.index + 1
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      //人员调动
      prmove(){
        let arr=this.dearr
        let asa=[]
        if(arr.length<1){
          this.myAlert("选择要调转的人员")
        }else {
          for(var i=0;arr.length>i;i++){
              asa.push(arr[i].id)
          }
          this.$refs.permove.pesho(asa)
        }

      },
      //调动部门
      depmove(){
        let val=this.currentDepart
        if(val){
          if(val.type=="辅"){
            this.myAlert("辅部门不可调动！")
          }else{
            this.$refs.departmoves.demshow(val)
          }
          
        }else{
          this.myAlert("请选择部门")
        }

      },
     
      //过滤选择
      handleSelectionChange(val){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        val.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
        this.dearr=val
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
          this.numy = 0;
          this.tableData = arr;
        }else{
          this.myAlert('请选择需要过滤的数据!','dangerous-icon');
        }
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
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "人员修改 【"+ _this.tableData[mycountnum].departName +"-"+ _this.tableData[mycountnum].name+"】";
        _this.$refs.multipleTable.setCurrentRow(_this.tableData[mycountnum]);

        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.tableData[mycountnum].id
          }
        })

        let  callbackdata = {
          row: _this.tableData[mycountnum],
          thisindex:mycountnum,
        };
        return callbackdata;
      },
    }
  }
</script>

<style lang="scss" scoped>
 
 
  /deep/.right-list-content .el-table__body-wrapper{
    overflow: auto;
    height:calc(100% - 27px);
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
  
  .pencil{
    background:url(../../../images/qiet.png) -324px -175px;
    width:20px;
    height:20px;
    display:inline-block;
    float: right;
  }
  .mans{
    background:url(../../../images/qiet.png) -110px -230px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .womans{
    background:url(../../../images/qiet.png) -90px -230px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .el-tree{
    min-width: 100%;
    display: inline-block;
  }
  .treechoosen{
    font-size: 14px;
    font-family:'微软雅黑';
    color: #336699;
    cursor:pointer;
  }
  .treechoose{
    font-size: 14px;
    font-family:'微软雅黑';
    cursor:pointer;
  }
  .treechooseno{
    font-size: 14px;
    font-family:'微软雅黑';
    color: darkgray;
    cursor:pointer;
  }
  .organ-container {
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
            display:inline-block;
          }
          .move-icon{
            background:url(../../../images/system/loupandiaodong.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .cut-icon {
            background: url(../../../images/system/fenge.png) -100px -90px;
            width: 3px;
            height: 23px;
            display: block;
          }
          .merge-icon{
            background:url(../../../images/system/hebing.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .zhuanzy-icon{
            background:url(../../../images/system/zhuaziyuan.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .zhuanzy-icon:hover{
            background:url(../../../images/yyf.png) -242px -20px;
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
            background:url(../../../images/yyf.png) -202px -17px;
            width:20px;
            height:20px;
            display:inline-block;
            border: 1px solid;
          }
          .rule-icon{
            background:url(../../../images/system/guize.png) -15px -15px;
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
            border: 1px solid black;
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
    .organ-content{
      width: calc(100% - 20px);
      margin: 6px auto 0px;
      height:calc(100% - 55px);
      .left-tree-content{
        width:200px;
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
        width:calc(100% - 210px);
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat;
        border-radius:5px;
        background-color: rgba(192, 192, 192, 1);
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
<style >

  .el-tree-node:focus > .el-tree-node__content {
    background-color: #D7E8FC !important;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td {
    color: #fff;
    background-color: #D7E8FC!important;
  }

  .el-table__header-wrapper,.el-table__body-wrapper{
    background-color: rgba(192, 192, 192, 1) !important;
  }


  .lerts1{
    border-width: 0px;
    margin-left: -6px;
    width: 310px;
    height: 145px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-image: url("../../../images/iborder.png") 2 repeat !important;
  }
  .lerts2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-image: url("../../../images/iborder.png") 2 repeat !important;
  }
  .lerts3{
    border-width: 0px;
    text-align: center;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-image: url("../../../images/iborder.png")  2 repeat ;
  }
</style>
