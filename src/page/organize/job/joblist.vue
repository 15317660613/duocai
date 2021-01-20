<template>
  <div class="job-container mycontailerclass1">
    <div class="top-container ">
      <div class="search-container mycontailerclass2" >
        <div class="item left"  @click="addjob" >
          <div class="border-icon clear" > 
            <i class="fa fa-plus add"></i>
            <span>新增职位</span>
          </div>  
        </div>
        <div class="item left"  @click="deletej" >
          <div class="border-icon clear" > 
            <i class="fa fa-times delete"></i>
            删除职位
          </div>  
        </div>
        <div class="item left" @click="addbook" >
          <div class="border-icon clear" > 
            <i class="fa fa-plus add"></i>
            <span>新增年月账套</span>
          </div>  
        </div>
        <div class="item left" @click="delbok" >
          <div class="border-icon clear" > 
            <i class="fa fa-times delete"></i>
            删除年月账套
          </div>  
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class="item left"   @click="filterData">
          <div class="border-icon clear" > 
            过滤选中
          </div>  
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class="item left">
          <div class="border-icon clear" > 
            <i class="zixuanlie-icon" title="自选列"  @click="clickColumn"></i>
          </div>  
        </div>
        <div class="item left" >
          <div class="record-num" >
            <span><</span>
            <span>{{this.lnums}}</span>
            <span >/</span>
            <span>{{tableData.length}}</span>
            <span>></span>
          </div>
        </div>
        <div class="item left clear" @click="tabRemove('/home/joblist')" >
          <div class="border-icon clear" > 
            <i class="back-icon user left" ></i>
          </div>  
        </div>
      </div>
      <div class="search-container " style="height: 38px;">
        <el-form ref="formsData"  :model="form" >
          <div class="item left"  >
            <el-form-item label="" label-width="0">
              <span  class="left" style="font-size: 12px;font-family: 微软雅黑;margin-top:6px">职位</span>
              <CheckSelectSpecial  class="left" :selectId="jobid" :listData="staffParams" style="width:90px;margin-top: 3px" ></CheckSelectSpecial>
            </el-form-item>
          </div>
          <div class="item left"  >
            <div class="left">
              <el-form-item prop="zttime" label-width="0">
                   <input  v-model="form.intime" @change="titlechange" class="left" style="margin-top: 11px" type="checkbox"/>
                    <span class="left" style="font-size: 12px;font-family: 微软雅黑;margin-top:6px">账套年月</span>
              </el-form-item>
            </div>

            <div class="dib left sdsd">
              <el-form-item style="margin-top: 3px" prop="timeStart" label-width="0">
                <el-date-picker v-model="form.starttime" size="mini" type="month"   value-format="yyyy-MM"  style="width: 100px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="dib left sdsd">
              <el-form-item style="margin-top: 3px" prop="timeEnd" label-width="0">
                <el-date-picker v-model="form.endtime" size="mini" type="month"   value-format="yyyy-MM"  style="width:100px;"></el-date-picker>
              </el-form-item>
            </div>
          </div>
          
          <div class="item left" style="margin-top:3px" >
            <el-form-item prop="sch" label-width="0">
              <el-input v-model="form.searchs" title="员工姓名/职位编号/职位名称/备注" style="width: 195px;"></el-input>
              
            </el-form-item>
          </div>
          <div class=" left padding-l-5" style="padding: 4px 0 0 3px;" >
            <i class="search-btn"  @click="search"  >查询</i>
          </div>
          <div class="left"  style="padding-top:5px;" >
            <i class="claerlys" @click="clearForm"  ></i>
          </div>
         
        </el-form>
      </div>
    </div>
    <div class="job-content clear list-content list-container" >
      <div class="right-list-content left" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          highlight-current-row
          @row-click="jobDetil"
          :row-class-name="tableRowClassName"
          @selection-change="gebleData"
          :row-height="rowHeight"
          :cell-class-name="rowClass"
          :cell-style="cellStyle"
          
          ref="singleTable"
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
                <div   style="font-weight:700;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                  {{ scope.row.name }}
                </div>
              </template>
            </PlTableColumn>
            <PlTableColumn
              v-else-if="item.prop == 'check1'"
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
                <div  >
                  <el-checkbox v-model="scope.row.check" :false-label="0" :true-label="1"   ></el-checkbox>
                </div>
              </template>
            </PlTableColumn>
            <PlTableColumn
              v-else-if="item.prop=='time'"
              :prop="item.prop"
              :label="item.label"
              width="80"
              :align="item.align"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div   style="font-weight:700;text-algin:center;cursor:pointer;" @click="timedetil(scope.$index, scope.row)" >
                  {{ scope.row.time }}
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
    <div class="component-container" >
      <deletjob @search="search" ref="deletjob"></deletjob>
    </div>
    <div class="component-container" >
      <addsbooks @search="search" ref="addsbooks"></addsbooks>
    </div>

   
    <div class="component-container" >
      <deletebook @search="search"  ref="deletebook"></deletebook>
    </div>
  </div>
</template>

<script>
  import {jobParam} from '../../../utils/jobparam'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {getsparam} from '../../../service/jobData'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {dutytree} from '../../../service/organizeDate'
  import {staffList} from '../../../service/jobData'
  import addjob from './addjob'
  import deletjob from  './deletjob'
  import jobdetail from './jobdetail'
  import  addsbooks from './addsbooks'
  import { PlTable, PlTableColumn } from 'pl-table';

  // 自选列
  import ColumPage from '../../../components/column'
  import  AccountBookPage from './sbooks'
  import  deletebook from './deletebook'
  import {dejobs} from '../../../service/jobData'
  export default {
    name: 'joblist',
    components:{
      CheckSelectSpecial,
      addjob,
      deletjob,
      jobdetail,
      addsbooks,
      ColumPage,
      AccountBookPage,
      deletebook,
      PlTable,
      PlTableColumn
    },
    data(){
      return{
        culumnTitle:'职位明细',
        sessionStr:'duty-list',
        rentColumnValue:false,
        rowHeight:27,
        lnums:0,
        stfftim:[],
        multipleSelection:[],
        tableData:[],
        columnData:jobParam.jobColumn,
        staffParams:[],
        jobid:"jobid",
        vaa:[],
        form:{
          
          intime:false,
          starttime:"",
          endtime:"",
          searchs:""
        },
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
      }
    },
    
    methods:{
         initstafflist(){
           let _this=this
           this.$layer.loading({
             shade: true,//是否显示遮罩
           });
           dutytree().then(function (res) {
             let staff=res.data
             if(staff && staff.length != 0){
               let arr = [{id:'-1',name:"全部",select:true}];
               for(let i = 0 ; i  < staff.length ; i++){
                 arr.push({
                   id:staff[i].id,
                   name:staff[i].label.replace(/&nbsp;/g,""),
                   select:staff[i].select,
                   state:staff[i].state,
                 })
               }
               _this.staffParams = arr;

             }
           })
           getsparam().then(function (res) {
             
             let  nowDate = new Date();
             let date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate(),
              }
              if(date.month<9){
                date.month="0"+date.month
              }
              let systemDate = date.year + '-' +  date.month ;
              _this.form.starttime=systemDate
              _this.form.endtime=systemDate
              _this.search();
             _this.$layer.closeAll("loading");
           })

          
           
          
         },
      //获取下标
     jobDetil(row, column, event){
        let _this = this
        _this.lnums =row.index + 1
       this.stfftim.push(row.staffTimeId)
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
     
      //账套详情
      timedetil(index,row){
        let _this = this;  

        let layerId = _this.$layer.iframe({
          content: {
            content: AccountBookPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{accountData:row,mythisindex:index}//props
          },
          area:['800px','560px'],
          title: "账套修改 【" +row.name +"&nbsp;&nbsp;&nbsp;&nbsp;" + row.time+"】",
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
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      //删除年月账套
      delbok(){
        let arr = [];
        let tableData = this.tableData;
        tableData.forEach(item => {
          if(item.check){
            if(item.staffTimeId){
               arr.push(item.staffTimeId);
            }
          }
        })
        if(arr.length == 0){
          this.myAlert("请选择年月账套！");
          return false;
        }
        this.$refs.deletebook.showdebk(arr.toString());
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
        //账套显示
        titlechange(){

        },
      //新增职位
        addjob(){
          let _this = this;
          
          let layerId = _this.$layer.iframe({
            content: {
              content: addjob, //传递的组件对象
              parent: this, //当前的vue对象
              data: {
              } //props
            },
            title:"新增职位",
            area: ["550px", "250px"],
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
     //点击
      gebleData(val,ss,nn){
        let _this = this;
        this.vaa=val
        for(var i=0;this.vaa.length>i;i++){
          this.stfftim.push(this.vaa[i].staffTimeId)
        }
        if(this.vaa.length==0){
          this.stfftim=[]
        }
        
        //获取用户的选中
        _this.multipleSelection = []
        val.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
        this.vaa=val
      },
      //删除职位
      deletej(){
          let _this=this
           var arr=[]
            let jjob= this.vaa
           if(jjob.length>0){
             for(var i=0;jjob.length>i;i++){
              arr.push(jjob[i].id)
             }
             let ids=arr.toString()
             let  deleted=1
             this.$refs.deletjob.showdejob(arr)

           }
      },
      //职位明细
      handleEdit(index, row){

         // this.$refs.jobdetail.showdetailjob(row.id);
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: jobdetail, //传递的组件对象
            parent: this, //当前的vue对象
            data: {
              myid:row.id,
              mythisindex:index,
            } //props
          },
          title:'职位修改 【'+row.name+'】',
          area: ["550px", "250px"],
          shadeClose: false,
          shade: true, //是否显示遮罩
          zIndex: 19891110,
          cancel: () => {
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
      //新增账套
      addbook(){
         this.$refs.addsbooks.showbk()
      },
      rowClass({row, index}) {
        let className = "";
        if(row.doBusiness  == '是') {
          
          className =  ' job-color1 ';
        }
        if(row.doManage == '是') {
          className =  ' job-color2 ';
        }
        
        if(row.state == '关闭') {
          className =  ' job-color3 ';
        }
        
        return className;
      },
      cellStyle({row, column, rowIndex, columnIndex}){
       if(column.property == 'name'){
         return {'color':"#336699"}
       }
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
          this.tableData = arr;
        }else{
          this.myAlert('请选择需要过滤的数据!','dangerous-icon');
        }
      },
     //清空
      clearForm(){
         
          this.form.intime=false
          this.form.starttime=""
          this.form.endtime=""
          this.form.searchs=""
      },
     //查询
      search(){
        let _this =  this;
        this.lnums = 0;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let tru=this.form.intime
        let title=this.columnData
        if(tru==true){
          for(var i=0;title.length>i;i++){
            title[i].show=true
          }

        }else if(tru==false){
          for(var i=0;title.length>i;i++){
            if((title[i].label=="√")||(title[i].label=="账套年月")||(title[i].label=="账套人数")||(title[i].label=="底薪")||(title[i].label=="保险(公司)")
              ||(title[i].label=="保险(个人)")||(title[i].label=="公积金(公司)")||(title[i].label=="公积金(个人)")||(title[i].label=="请假")||(title[i].label=="旷工")
              ||(title[i].label=="缺卡")||(title[i].label=="时次")||(title[i].label=="迟到")||(title[i].label=="早退")){
              title[i].show=false
            }
          }
        }
        this.columnData=title

        let bo=[]
        let arr=this.staffParams
        for(let i = 0 ; i  < arr.length ; i++){
            if(arr[i].select==true){
             bo.push(arr[i].id)
            }
        }
        let word=""
        if(this.form.searchs){
          word=this.form.searchs
        }

        let needAccount=this.form.intime
        if(needAccount==true){
          needAccount=1
        }else{
          needAccount=0
        }
        
       
        let timeStart=this.form.starttime
        let timeEnd=this.form.endtime
        if(timeStart==null){
          timeStart=""
        }
        if(timeEnd==null){
          timeEnd=""
        }
        let staffIds=bo.toString();
        let form = {needAccount,staffIds,timeEnd, timeStart,word};
        staffList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            data.forEach(item => {
              item.check = 0;
            })
            _this.tableData = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
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
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "账套修改 【" +_this.tableData[mycountnum].name +"&nbsp;&nbsp;&nbsp;&nbsp;" + _this.tableData[mycountnum].time+"】";
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
    },
    mounted () {
      this.initstafflist();
      this.reloadListByStorage();
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
  /deep/.list-content .el-table .el-table__body-wrapper {
    overflow: auto;
  }
  /deep/.el-table--scrollable-x .el-table__body-wrapper {
    overflow: auto;
  }
  /deep/.el-table .cell.el-tooltip {
    color: black;
  }
  /deep/.list-content .el-table th .cell .el-checkbox__input .el-checkbox__inner::after {
    border-color: #000;
    border-width: 0px 1px 1px 0px !important;
    background: #DCD9D3 ;
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
  .job-container {
    height:100%;
    font-size: 12px;
    .top-container {
      width: calc(100% - 20px);
      margin: 0px auto 0px;
      .search-container {
        width: calc(100% + 2px);
        height: 30px;
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
            display:inline-block;
          }
          .merge-icon{
            background:url(../../../images/system/hebing.png) -15px -15px;
            width:20px;
            height:20px;
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
    .top-container1 {
      height: 38px;
      width: calc(100% - 20px);
      margin: 10px auto 0px;
      .search-container {
        width: calc(100% + 2px);
        height: 38px;
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
    .job-content{
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

</style>
