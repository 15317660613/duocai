<template>
  <div class="rent-container mycontailerclass1" id="rent-container" >
    <div class="top-container border-black" style="position: relative;" >
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <div class="item left"  style="margin-left: 20px" @click="addreport">
            <div class="border-icon clear" > 
              <i class="fa fa-plus add"></i>
              <span>新增报备</span>
            </div>  
          </div>
          <div class="item left" style="margin-left: 10px" @click="deletedReportClick" >
            <div class="border-icon clear" > 
              <i class="fa fa-times delete"></i>
              删除报备
            </div>  
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left" style="margin-left: 5px">
            <div class="border-icon clear" > 
              <i class="leading-out-icon" title="自选列" @click="clickColumn"></i>
            </div>  
          </div>
          <div class="item left" style="margin-left: 10px">
            <div class="record-num" >
              <span class="search-word" ><</span>
              <span class="search-word" >{{listnum}}</span>
              <span class="search-word" >/</span>
              <span class="search-word" >{{tableData.length}}</span>
              <span class="search-word" >></span>
            </div>
          </div>
          <div class="item left clear"  @click="tabRemove('/home/report')" >
            <div class="border-icon clear" > 
              <i class="back-icon user left"></i>
            </div>  
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
              <el-form-item label="" prop="timeMode" label-width="0">
                <el-select v-model="form.timeMode"    style="width:85px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="报备剩余" value="1" ></el-option>
                  <el-option  label="到场剩余" value="2" ></el-option>
                  <el-option  label="报备时间" value="3" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left " >
              <el-form-item label="" prop="timetype" label-width="0">
                <el-select @change="getQuickDate"  v-model="form.timetype"    style="width:65px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="今天" value="2" ></el-option>
                  <el-option  label="昨天" value="10" ></el-option>
                  <el-option  label="三天" value="3" ></el-option>
                  <el-option  label="上周" value="16" ></el-option>
                  <el-option  label="本周" value="15" ></el-option>
                  <el-option  label="上月" value="14" ></el-option>
                  <el-option  label="本月" value="13" ></el-option>
                  <el-option  label="上年" value="11" ></el-option>
                  <el-option  label="本年" value="12" ></el-option>
                  <el-option  label="自定义" value="" ></el-option>

                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeStart" label-width="0">
                <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd" v-model="form.timeStart" style="width: 90px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeEnd" label-width="0">
                <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd" v-model="form.timeEnd" style="width: 90px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left padding-l-15"  >
              <span class="des-word" style="width:51px;text-align:right;" >报备状态</span>
            </div>
            <div class="left ">
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="rstates" :listData="reportstate" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >报备人员</span>
            </div>
            <div class="left" >
              <el-form-item  label-width="0">
                <CheckSelectSpecial  @findStreetByTown="changere2"  :selectId="rep1" :listData="reportperson1" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left" >
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="rep2" :listData="reportperson2" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >排卡状态</span>
            </div>
            <div class="left ">
              <el-form-item label="" prop="haveCard" label-width="0">
                <el-select v-model="form.haveCard"    style="width:85px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="统计" value="1" ></el-option>
                  <el-option  label="不统计" value="0" ></el-option>
                </el-select>
              </el-form-item>
            </div>
           <!--<div class="left padding-l-15" style="margin-left: 100px" >
              <span class="des-word" >项目状态</span>
            </div>
            <div class="left " style="margin-top: 2px">
              <el-form-item prop="roomShape" label-width="0">
                <CheckSelectSpecial :selectId="proid" :listData="prostate" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >销售人员</span>
            </div>
            <div class="left " style="margin-top: 3px">
              <CheckSelectSpecial @findStreetByTown="changere1" :selectId="sa1" :listData="saleman1" style="width:100px;" ></CheckSelectSpecial>
            </div>
            <div class="left " style="margin-top: 3px">
              <CheckSelectSpecial :selectId="sa2" :listData="saleman2" style="width:100px;" ></CheckSelectSpecial>
            </div>
            -->

            <div class="left " style="padding-left:30px;" >
              <el-form-item prop="word1" label-width="0">
                <el-input  v-model="form.word" maxlength="30" style="width:210px;" title="项目名称/客户名称/平台公司/销售公司/报备人员/电话" autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-5" @click="searchReport" style="margin-top:1px;" >
              <i class="search-btn"  >查询</i>
            </div>
            <div class="left padding-l-5" @click="qin" style="margin:2px 0 0 -4px">
              <i class="claerlys"  ></i>
            </div>
            <!--<div class="left padding-l-5" style="margin-top:1px;" >
              <i :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}" @click="showSearch" ></i>
            </div>-->
          </div>
          <div  id="searchContent1"   class="clear" >

            <!--<div class="left padding-l-15" >
              <span class="des-word" >地域</span>
            </div>
            <div class="left" style="margin-top: 3px">
              <CheckSelectSpecial @findStreetByTown="arechange"  :selectId="a1" :listData="areadata1" style="width:130px;" ></CheckSelectSpecial>
            </div>
            <div class="left" style="margin-top: 3px">
              <CheckSelectSpecial :selectId="a2" :listData="areadata2" style="width:130px;" ></CheckSelectSpecial>
            </div>
            <div class="left padding-l-15" style="margin-left: 10px">
              <span class="des-word" >产品类型</span>
            </div>
            <div class="left" style="margin-top: 3px">
              <CheckSelectSpecial :selectId="duct" :listData="product" style="width:100px;" ></CheckSelectSpecial>
            </div>
            -->


          </div>

        </el-form>
      </div>
    </div>  
    <div class="content clear" style="height:calc(100% - 95px)">
      <div class="list-content"  style="height:100%">
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          empty-text=" "
          use-virtual
          border
          height="100%"
          @selection-change="handleSelectionChange"
          @row-click="getRowDataByClick"
          :row-class-name="tableRowClassName"
          
          :row-height="rowHeight"
          ref="singleTable"
        >
          <template v-if="item.show"  v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop=='customerName'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :fixed="item.fixed"
              :align="item.align"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div   style="font-weight:700;color:#336699;text-algin:left;cursor:pointer;" @click="sdestil(scope.$index, scope.row)" >
                  {{ scope.row.customerName }}
                </div>
              </template>
            </PlTableColumn>
            <PlTableColumn
              v-else
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :fixed="item.fixed"
              :align="item.align"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              style="width:100px;position:relative;"
              :style="{'line-height':rowHeight+'px'}"
              :show-overflow-tooltip="true"
            >

            </PlTableColumn>
          </template>

        </PlTable>
      </div>
    </div>
    <div class="component-container" >
      <deletreport  @initrep="initrep" ref="deletreport"></deletreport>
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {findUserByDepartId,departTree2} from "../../../service/organizeDate";
  import {apartparam} from '../../../service/apartmentData'
  import {findbyId} from '../../../service/getData'
  import { PlTable, PlTableColumn } from 'pl-table';
  import {reportparames} from '../../../utils/reportparames'
  import {relist,deletereport,firsthouseBusinessCountRecordList} from '../../../service/reportData'
  import  NewReportPage from './newreport'
  import  EditorReportPage from './reportdetail'
  import  deletreport from './deletreport'
  import ColumPage from '../../../components/column'
  import {quickDate} from '../../../utils/getQuickDate'
  export default {
      name: "report",
      components: {
        CheckSelectSpecial,
        PlTable,
        PlTableColumn,
        NewReportPage,
        EditorReportPage,
        deletreport,
        ColumPage
      },
      data(){
          return{
            columnData:reportparames.repColumn,
            culumnTitle:'报备',
            sessionStr:'report-list',
            columnValue:false,
            rowHeight:27,
            upAndDown:1,
            vaa:[],
            listnum:0,
            tableData:[],
            multipleSelection:[],
            reportstate:[{id: '-1', name: "全部", select: true},
             {
              id:'1',
              name:'有效',
              select:false
            },
            {
              id:'0',
              name:'失败',
              select:false
            },
            {
              id:'2',
              name:'等待',
              select:false
            },
            {
              id:'3',
              name:'无效',
              select:false
            }],
            rstates:"rstates",
            reportperson1:[],
            rep1:'rep1',
            reportperson2:[],
            rep2:'rep2',
            haveCard:'haveCard',
            product:[{id: '-1', name: "全部", select: true},{
              id:'1',
              name:'普通住宅',
              select:false
            },{
              id:'2',
              name:'中高等档宅',
              select:false
            },{
              id:'3',
              name:'豪宅',
              select:false
            },{
              id:'4',
              name:'公寓',
              select:false
            },{
              id:'5',
              name:'写字楼',
              select:false
            },{
              id:'2',
              name:'别墅',
              select:false
            },{
              id:'6',
              name:'商铺',
              select:false
            },{
              id:'7',
              name:'海景房',
              select:false
            },{
              id:'8',
              name:'其他',
              select:false
            },],
            duct:'duct',
            areadata1:[],
            a1:'a1',
            areadata2:[],
            a2:'a2',
            prostate:[{id: '-1', name: "全部", select: true},{
              id:'1',
              name:'在售',
              select:false
            },{
              id:'2',
              name:'待售',
              select:false
            },{
              id:'3',
              name:'售罄',
              select:false
            },],
            proid:'proid',
            saleman1:[],
            sa1:'sa1',
            saleman2:[],
            sa2:'sa2',
            form:{
              word:"",
              timeMode:'-1',
              timetype:"3",
              timeStart:"",
              timeEnd:"",
              haveCard:'-1',
            },
            initLeft:0,//初始化详情弹窗的增加 left
            initTop:0,//初始化详情弹窗的增加 top
          }
      },
      
      methods:{
        showSearch(){
          let rent = document.getElementById("rent-container");
          if(this.upAndDown == 1){
            this.upAndDown = 2;

           // rent.getElementsByClassName("content")[0].style.height="calc(100% - 70px)";
           // rent.getElementsByClassName("el-table")[0].style.height="calc(100% - 70px)";
            document.getElementById("searchContent1").style.display = "none";


          }else{
            this.upAndDown = 1;
            //rent.getElementsByClassName("content")[0].style.height="calc(100% - 150px)";
            //rent.getElementsByClassName("el-table")[0].style.height="calc(100% - 150px)";
            document.getElementById("searchContent1").style.display = "block";
          }
        },
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
        initrep(form){
          let _this=this
          this.getQuickDate(3);
          let flag = true
          let arra1 = [{id: '-1', name: "全部", select: true}];
          let arra2 = [{id: '-1', name: "全部", select: true}];
          let arra3 = [];
          for (let i = 0; i <this.reportstate.length; i++) {
            arra3.push({
              id:this.reportstate[i].id,
              name:this.reportstate[i].name.replace(/&nbsp;/g, ""),
              select:this.reportstate[i].select,
            })
          }
          let arra4 = [{id: '-1', name: "全部", select: true}];
          let arra5 = [];
          for (let i = 0; i <this.product.length; i++) {
            arra5.push({
              id:this.product[i].id,
              name:this.product[i].name.replace(/&nbsp;/g, ""),
              select:this.product[i].select,
            })
          }
          let arra6 = [];
          for (let i = 0; i <this.prostate.length; i++) {
            arra6.push({
              id:this.prostate[i].id,
              name:this.prostate[i].name.replace(/&nbsp;/g, ""),
              select:this.prostate[i].select,
            })
          }
          this.areadata2=arra1
          this.saleman2=arra2
          this.reportstate=arra3
          this.reportperson2=arra4
          this.product=arra5
          this.prostate=arra6
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
             _this.areadata1 = arr;
            }
          })
          let myform = {
            state:'',
            type:'主',
            isBusiness:'1',
            name:'',
          };
          departTree2(myform).then(function (res) {
            console.log(res);
            let staff=res.data
            if(staff && staff.length != 0){
              let arrs = [{id:'-1',name:"全部",select:true}];
              let arrs2 = [{id:'-1',name:"全部",select:true}];
              // for(let i = 0 ; i  < staff.length ; i++){
              //   arrs.push({
              //     id:staff[i].id,
              //     name:staff[i].label.replace(/&nbsp;/g,""),
              //     select:staff[i].select,
              //     level:staff[i].level,
              //     state:staff[i].state,
              //   })
              // }
              for(let i = 0 ; i  < staff.length ; i++){
                arrs2.push({
                  id:staff[i].id,
                  name:staff[i].label.replace(/&nbsp;/g,""),
                  select:staff[i].select,
                  level:staff[i].level,
                  state:staff[i].state,
                })
              }
              _this.saleman1 = arrs;
              _this.reportperson1 = arrs2;
            }
          })
         //.....
          let reportDepartIds=-1
          let reportEmpIds=-1
          let reportStates=-1
          let timeEnd=this.form.timeEnd;
          let timeStart=this.form.timeStart;
          let timeMode='-1';
          let word=""
          let haveCard = this.form.haveCard;

          if(form){
            _this.linkhttpfunc(form);
          }else{
            relist(reportDepartIds,reportEmpIds,reportStates,timeEnd,timeStart,timeMode,word,haveCard).then(function (res) {
              _this.tableData=res.data.list
            })
          }
          
          },
        changere1(){
         
          let _this = this
          let ids = []
            for (var i = 0; this.saleman1.length > i; i++) {
              if (this.saleman1[i].select == true) {
                ids.push(this.saleman1[i].id)
              }
            }
          let id = ids.toString();
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (res) {
           
            let user=res.data.user
            let arr = [{id:'-1',name:"全部",select:true}];
            if(user && user.length != 0){
              user.forEach(function(item){
                if(item.doBusiness == 1 ) {
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                }  
                
              })
            }
            _this.saleman2 = arr;
          })
        },
        changere2(){
          
          let _this = this
          let ids = []
          for (var i = 0; this.reportperson1.length > i; i++) {
            if (this.reportperson1[i].select == true) {
              ids.push(this.reportperson1[i].id)
            }
          }
          let id = ids.toString();
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (res) {
            
            let user=res.data.user
            let arr = [{id:'-1',name:"全部",select:true}];
            if(user && user.lengthg != 0){
              user.forEach(function(item){
                if(item.doBusiness == 1 ) {
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                }  
                
              })
            }
            _this.reportperson2 = arr;
          })
        },
        arechange(){
          let _this = this
          let ids = []
          for (var i = 0; this.areadata1.length > i; i++) {
            if (this.areadata1[i].select == true) {
              ids.push(this.areadata1[i].id)
            }
          }
          ids = ids.toString()

          findbyId(ids).then(function (res) {
            let a2 = res.data
            if (a2 && a2.length != 0) {
              let arr = [{id: '-1', name: "全部", select: true}];
              for (let i = 0; i < a2.length; i++) {
                arr.push({
                  id: a2[i].id,
                  name: a2[i].label.replace(/&nbsp;/g, ""),
                  select: a2[i].select,
                })
              }
              _this.areadata2 = arr;
            }
          })

        },
        //qingkon
        qin(){
          this.form.timeEnd=""
          this.form.timeStart=""
          this.form.timetype="3"
          this.getQuickDate(3);
          this.form.timeMode="-1";
          this.form.haveCard = "-1";
          this.form.word="";
          for(var i=0;this.reportstate.length>i;i++){
            if(this.reportstate[i].name=="全部"){
              this.reportstate[i].select=true
            }else{
              this.reportstate[i].select=false
            }
          }

          for(var a=0;this.reportperson1.length>a;a++){
            if(this.reportperson1[a].name=="全部"){
              this.reportperson1[a].select=true
            }else{
              this.reportperson1[a].select=false
            }
          }

          for(var b=0;this.reportperson2.length>b;b++){
            if(this.reportperson2[b].name=="全部"){
              this.reportperson2[b].select=true
            }else{
              this.reportperson2[b].select=false
            }
          }
        },
        //查询
        searchReport(){
          let _this=this;
          this.listnum = 0;
          let reportDepartIds=[]
          let reportEmpIds=[]
          let reportStates=[]
          let timeEnd=this.form.timeEnd
          let timeStart=this.form.timeStart
          let timeMode=this.form.timeMode
          let word=this.form.word;
          let haveCard = this.form.haveCard;
           this.listName = 0;
          for(var i=0;this.reportstate.length>i;i++){
            if(this.reportstate[i].select==true){
              reportStates.push(this.reportstate[i].id)
            }
          }
          reportStates=reportStates.toString()
          for(var a=0;this.reportperson1.length>a;a++){
            if(this.reportperson1[a].select==true){
              reportDepartIds.push(this.reportperson1[a].id)
            }
          }
          reportDepartIds=reportDepartIds.toString()
          for(var b=0;this.reportperson2.length>b;b++){
            if(this.reportperson2[b].select==true){
              reportEmpIds.push(this.reportperson2[b].id)
            }
          }
          this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          reportEmpIds=reportEmpIds.toString();

          relist(reportDepartIds,reportEmpIds,reportStates,timeEnd,timeStart,timeMode,word,haveCard).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              _this.tableData=response.data.list;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
            
          })
        },
        getRowDataByClick(val,ss,nn){
          let _this = this
          _this.listnum =val.index + 1
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
       //新增报备
        addreport(){
          let _this = this;
          let layerId = _this.$layer.iframe({
            content: {
              content: NewReportPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{}//props
            },
            area:['800px','560px'],
            title: "新增报备",
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

        deletedReportClick(){
          let _this =  this;
          let select = this.multipleSelection.toString();
          if(select){
            _this.myConfirm("警告:删除后不能还原!", 'question-icon','确定','取消','确定要删除选定记录吗?','my-message').then(res => {
              deletereport(select,1).then(function (response) {
                if (response.status == 500) {
                  return false;
                } else if (response.status == 0) {
                  _this.myAlert("删除成功！",'success-icon').then(res =>{
                      let id = _this.multipleSelection;
                      let temp = _this.tableData.concat();
                      for(let i = 0 , len = id.length; i < len ; i++ ){
                        temp = _this.deletArrByValue(temp,id[i]);
                      }
                      _this.tableData = temp;

                      _this.listnum = 0;
                      _this.multipleSelection = [];
                  });
                } else if (response.status == 1) {
                  let message = response.msg;
                  _this.myAlert(message + "！");
                }
              })
            }).catch(err => {
             
            })

          }else{
            this.myAlert("请选择要删除的报备记录！",'dangerous-icon');
          }
        },
        //删除数组中指定元素
        deletArrByValue(arr,id){
          return arr.filter(function(item){return item.id != id })
        },
       //xiangqing
        sdestil(s,i){
          let _this = this;
          
          let thisifranmeisopen = false;
          let thisifranmeopennum = 0;
          _this.$store.state.layerifranme.forEach(item=>{
            if(item.thisrowid == i.id){
              try{
                document.getElementById(item.childlayerid).focus();
                thisifranmeisopen = true;
              }catch(e){

              }
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
              content: EditorReportPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{reportId:i.id,thisindex:s}//props
            },
            area:['800px','560px'],
            title: "报备修改 【 项目:"+i.projectName+'&nbsp;&nbsp;&nbsp;&nbsp;'+'客户:'+i.customerName+"】",
            shadeClose: false,
            shade: false,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
              if( this.initLeft != 0){
                this.initLeft -= 10;
                this.initTop -= 30;
              }
            }
          })
          let getLayerId = document.getElementById(layerId);
            getLayerId.style.left = "calc(50% + "+this.initLeft+"px)";
            getLayerId.style.top =  "calc(50% + "+this.initTop+"px)";
            this.initLeft += 10;
            this.initTop += 30;

          document.getElementById('thimyshade').style.display = "block";
          let mygetLayerId = document.getElementById(layerId).getAttribute('id');
          let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:i.id,oneORmore:2};
          _this.$store.commit('set_active_layerifranme',layerifranmedata);
          _this.$refs.singleTable.setCurrentRow(i);
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
          getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="报备修改 【 项目:"+_this.tableData[mycountnum].projectName+'&nbsp;&nbsp;&nbsp;&nbsp;'+'客户:'+_this.tableData[mycountnum].customerName+"】";
          _this.$refs.singleTable.setCurrentRow(_this.tableData[mycountnum]);

          let  callbackdata = {rowid: _this.tableData[mycountnum].id,thisindex:mycountnum,};

          _this.$store.state.layerifranme.forEach(item=>{
            if(needlayerid == item.childlayerid){
              item.thisrowid =  _this.tableData[mycountnum].id
            }
          })
          return callbackdata;
        },
        //业务统计跳转
        linkhttpfunc(form){
          let _this = this;
          this.$layer.loading({
            shade: true //是否显示遮罩
          });

          firsthouseBusinessCountRecordList(form).then(function(res) {
            _this.$layer.closeAll("loading");
            if (res.status == 500) {
              return false;
            } else if (res.status == 0) {
              _this.tableData = res.data.list;
            } else if (res.status == 1) {
              let message = res.msg;
              _this.myAlert(message + "！");
            }
          });
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
        this.reloadListByStorage()
        this.shadenum();
        let form=this.$route.query.form;
        if(form){
          form = JSON.parse(form);
          if(form.needFlag){
            this.initrep(form);
          }
        }else{
          this.initrep()
        }
      },
      watch: {
        $route: {
            handler() {
              let form=this.$route.query.form;
              if(form){
                form = JSON.parse(form);
                if(form.needFlag){
                  this.initrep(form);
                }
              }else{
                this.initrep()
              }
              //深度监听，同时也可监听到param参数变化
            },
            deep: true,
        }
      } 
    }
</script>

<style lang="scss" scoped>
  /deep/.right-list-content .el-table, .right-list-content .el-table__expanded-cell {
    background-color: #DCD9D3!important;

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
    .search-btn,.claerlys{
      cursor:pointer;
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
