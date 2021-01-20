<template>
  <div class="buget-container mycontailerclass1" id="manpower-container" >
    <div class="top-container " style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>

      <div class="search-container mycontailerclass2 clear" style="height:32px;" >
        <div class="left p-l-10 p-t-2">
          <div class="border-icon clear" > 
            <i class="one-four-icon" title="选定人员改自定号" @click="modifyNumClick"></i>
          </div>  
        </div>
        <div class="left p-l-10 p-t-3">
          <div class="border-icon clear" > 
            <i class="one-Thirteen-icon" title="过滤选中" @click="filterData"></i>
          </div>  
        </div>
        <div class="left p-l-10 p-t-2">
          <div class="border-icon clear" > 
            <i class="one-ten-icon" title="自选列" @click="clickColumn"></i>
          </div>  
        </div>
        <div class="left p-l-10 p-t-3">
          <div class="border-icon clear" > 
            <i class="one-eleven-icon" title="导出"  @click="exportToExcel" ></i>
          </div>  
        </div>
        <div class="left p-l-10 p-t-3">
          <div class="border-icon clear" > 
            <i class="one-twelve-icon" @click="tabRemove('/home/manpowerlist')" ></i>
          </div>  
        </div>
        <div class="left p-l-10">
          <i class="cut-icon"></i>
        </div>
        <div class="left p-l-10">
          <div class="record-num">
            <span><</span>
            <span>{{this.currentNum}}</span>
            <span >/</span>
            <span>{{tableData.length}}</span>
            <span>></span>
          </div>
        </div>
        
      </div>
      <div class="clear search-container " >
        <el-form ref="formsData" :model="form">
          <div class="clear" >
            <div class="left p-l-15" >
              <span class="search-des-word" >日期</span>
            </div>
            <div class="left" >
              <el-form-item>
                <el-select v-model="form.timeType" style="width: 75px;">
                  <el-option v-for="item in timeTypeSelect1"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>  
            </div>
            <div class="left p-l-2" >
              <el-form-item>
                <el-select v-model="mandate2" style="width: 60px;" @change="wichdate">
                  <el-option v-for="item in timeTypeSelect2"  :label="item.name" :value="item.value" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-date-picker v-model="form.timeStart" value-format="yyyy-MM-dd" size="mini" type="date"    style="width: 95px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-date-picker  v-model="form.timeEnd"  value-format="yyyy-MM-dd" size="mini" type="date"    style="width: 95px;"></el-date-picker>
              </el-form-item>
            </div>



            <div class=" left "  style="padding-left:27px;" >
              <span class="search-des-word" >用工</span>
            </div>
            <div class=" left"  >
              <el-form-item>
                <el-select v-model="form.useTypeId" style="width: 65px;height: 22px;">
                  <el-option v-for="item in useTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class=" left p-l-15"  >
              <span class="search-des-word" >部门</span>
            </div>

            <div class=" left"  >
              <el-form-item>
                <CheckSelectSpecial  @findStreetByTown="findUsersByDepartIds" class="left" :selectId="din1" :listData="departParams" style="width: 83px;height: 22px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class=" left p-l-2"  >
              <el-form-item>
                <CheckSelectSpecial  class="" :selectId="din2" :listData="userParams" style="width: 83px;height: 22px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class=" left p-l-15"  >
              <span class="search-des-word" >职位</span>
            </div>
            <div class=" left"  >
              <el-form-item>
                <CheckSelectSpecial disabled="true"   class="" :selectId="j1" :listData="staffParams" style="width: 83px;height: 22px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class=" left p-l-15"  >
              <el-form-item>
                <el-input v-model="form.word" style="width: 133px;" title="姓名/电话"></el-input>
              </el-form-item>
            </div>
            <div class="left p-l-5" >
              <i @click="searchListData" class="search-btn" style="cursor:pointer;">查询</i>
            </div>
            <div class="left" style="padding-top:1px;">
              <i class="claerlys" @click="clearForm"></i>
            </div>
            
           
          </div> 
          <div class="clear" >
            <div class=" left p-l-15"  >
              <span class="search-des-word" >状态</span>
            </div>
            <div class=" left"  >
              <el-form-item>
                <CheckSelectSpecial  @findStreetByTown="changeStaff"  class="" :selectId="st1" :listData="stateParams"    style="width: 137px;height: 22px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class=" left p-l-2"  >
              <el-form-item>
                <CheckSelectSpecial  class="" :selectId="st2" :listData="stateParams2" style="width: 95px;height: 22px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class=" left p-l-2"  >
              <el-form-item>
                <CheckSelectSpecial :selectDisabled="staffSelect" ref="staffChild"  class="" :selectId="st3" :listData="stateParams3" style="width: 95px;height: 22px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class=" left p-l-15"  >
              <span class="search-des-word"  >自定号</span>
            </div>
            <div class=" left"  >
              <el-form-item>
                <CheckSelectSpecial    class="" :selectId="numIds" :listData="numParams" style="width: 65px;height: 22px;" ></CheckSelectSpecial>
              </el-form-item>

            </div>
          </div>   
        </el-form>
      </div>
    </div>
    <div class="buget-content clear list-content list-container" >
      <div  class="right-list-content left" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          @selection-change="handleSelectionChange"
          @row-click="mandetil"
          :row-class-name="tableRowClassName"
          :cell-class-name="rowClass"
          highlight-current-row
          :row-height="rowHeight"
          :cell-style="cellStyle"
          ref="singleTable"
        >
          <template v-if="item.show" v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop =='name'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :align="item.align"
              :fixed="item.fixed"
            >
             
              <template slot-scope="scope" style="height: 100%;">
                <div style="position: absolute;top: 50%;margin-top: -6px;width: 100%;">
                  <div class="findparentclass" :style="{'color':scope.row.stateName =='正式离职' ? '#999' :'#336699','text-algin':'center','cursor':'pointer','z-index': '333','font-weight': 'bold'}" @click="manpss(scope.$index, scope.row)" >
                    {{ scope.row.name }}
                  </div>
                  <!-- 状态 -->
                  <div v-if="scope.row.state3">
                    <div v-if="scope.row.state3.indexOf('强制')!=-1" class="nine-one-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -40px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('未办')!=-1" class="eight-eleven-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -11px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('黑名')!=-1" class="eight-nine-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: 20px;">
                    </div>
                  </div>
                  
                </div>
                <!-- 开始时间 -->
                <div  v-if='scope.row.jobTime1'  class="tdtopleft-icon" style="position: absolute;left: 0px;top: 0;color: #45865F;z-index: 332;">
                  <div style="transform:rotate(-53deg) scale(0.8);margin-top: -4px;margin-left: -12px;">
                    <p style="line-height: 12px;width: 37px;">{{scope.row.jobTime2}}</p>
                    <p style="line-height: 12px;width: 40px;">{{scope.row.jobTime1}}</p>
                  </div> 
                </div>
                <!-- 结束时间 -->
                <div v-if='scope.row.stopTime1'  class="tdbottomright-icon" style="position: absolute;right: -4px;bottom: -3px;color: #C38281;z-index: 332;">
                  <div style="transform:rotate(-53deg) scale(0.8);margin-top: 5px;margin-left: 5px;">
                    <p style="line-height: 12px;width: 30px;">{{scope.row.stopTime1}}</p>
                    <p style="line-height: 12px;">{{scope.row.stopTime2}}</p>
                    
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
            >
              <template v-if="item1.show" v-for="item1 in item.child" >
                <PlTableColumn
                    v-if='item.child&&item.child.length>0'
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item1.sortable"
                    :align="item1.align"
                    >
                   
                </PlTableColumn>
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
              :align="item.align"
              :fixed="item.fixed"
              show-overflow-tooltip
            >
            </PlTableColumn>
          </template>

        </PlTable>
      </div>
    </div>
    <div class="component-container" >
      <ModifyNumPage @searchListData="searchListData" :modifyNumVisible="modifyNumValue"  ref="modifyNum"  ></ModifyNumPage>
    </div>
  </div>
</template>

<script>
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {quickDate} from '../../../utils/getQuickDate'
  import {departparam,departlist,leveldepart} from '../../../service/getdepartData'
  import {departperson,userde,dutytree,manpowerListData} from '../../../service/organizeDate'
  import {manpower} from '../../../utils/manpower'
  //自选列
  import ColumPage from "../../../components/columnMoreHeader";
  import { PlTable, PlTableColumn } from 'pl-table';
  import PersonDetailPage  from '../organization/persondetail'
  import mancluom from './mancluom'
   // 修改自定号
  import ModifyNumPage from './modifyNum'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name: 'manpowerlist',
    components: {
      CheckSelectSpecial,
      PersonDetailPage,
      ModifyNumPage,
      ColumPage,
      PlTable,
      PlTableColumn
    },
    data(){
      return{
        columnData:manpower.mpColumn,
        columnValue:false,

        culumnTitle:'人力明细',
        sessionStr:'manpower-list',
        rowHeight:27,
        tableData:[],
        staffSelect:true,
        modifyNumValue:false,
        currentNum:0,
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        numParams:[],
        numIds:"numIds",
        multipleSelection: [],
        timeTypeSelect1:[{
          id:"1",
          name:"入职时间",
        },{
          id:"2",
          name:"离职时间",
        },{
          id:"3",
          name:"用工时间",
        },{
          id:"4",
          name:"退工时间",
        },{
          id:"5",
          name:"阳历生日",
        },{
          id:"6",
          name:"农历生日",
        },],
        mandate2:-1,
        timeTypeSelect2:[{
          id:1,
          name:"全部",
          value:-1
        },{
          id:2,
          name:"今天",
          value:2
        },{
          id:3,
          name:"三天",
          value:3
        },{
          id:4,
          name:"上周",
          value:9
        },{
          id:5,
          name:"本周",
          value:10
        },{
          id:6,
          name:"上月",
          value:11
        },{
          id:7,
          name:"本月",
          value:12
        },{
          id:8,
          name:"上年",
          value:13
        },{
          id:9,
          name:"本年",
          value:14
        },{
          id:10,
          name:"自定义",
          value:1
        },],
        form:{
          word:"",
          timeType:"1",
          timeStart:"",
          timeEnd:"",
          useTypeId:"-1",
        },
        useTypeIdParams:[],
        departParams:[],
        din1:"din1",
        userParams:[{id:'-1',name:"全部",select:true}],
        din2:"din2",
        stateParams:[],
        stateParams2:[{
          id:1,
          name:"兼",
          select:false
        },{
          id:2,
          name:"习",
          select:false
        },{
          id:3,
          name:"试",
          select:false
        },{
          id:4,
          name:"正",
          select:false
        },],
        stateParams3:[{
          id:1,
          name:"空",
          select:false
        },{
          id:2,
          name:"强制",
          select:false
        },{
          id:3,
          name:"未办",
          select:false
        },{
          id:4,
          name:"黑名",
          select:false
        },],
        st1:"st1",
        st2:"st2",
        st3:"st3",
        staffParams:[],
        j1:"j1",
      }
    },

    methods:{
      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          const tHeader = ['人员编号','部门姓名','性别','身份证号','电话','状态','职位','所学专业','最高学历','毕业院校','电子邮箱','籍贯','民族','家庭住址','毕业时间','来源方式','政治面貌','阴历生日','农历生日','用工','用工时间','退工时间','入职时间','首上时间','转正时间','离职时间','止薪时间']
          const filterVal = ['id', 'departName','name','gender','idcard','phone','stateName','staffName','major','education','school','email','nativePlace','nationId','homeAddress','graduationTime',
            'sourceName','politicalName','birthday','lunarBirthday','usedTypeName','useTime','returnUseTime','onBoardingDate','firstDate','empStartDate','leaveDate','salaryEndDate',]
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //时间
      wichdate(value){
        let time = quickDate.getTwoDateByDay(value);
        this.form.timeStart = time.startTime;
        this.form.timeEnd = time.endTime;
        if(value != 1){
          this.timeDisabled = true;
        }else{
          this.timeDisabled = false;
        }
      },
      findUsersByDepartIds(){

        let _this=this
        let sw = [{id:'-1',name:"全部",select:true}];
        let iis=[]
        for(var i=0;this.departParams.length>i;i++){
          if(this.departParams[i].select==true){
            iis.push(this.departParams[i].id)
          }
          if(this.departParams[0].select==true){
            _this.userParams = sw;
          }
        }
        let id=iis.toString()
        departperson(id).then(function (res) {

          let da=res.data.user
          if(da && da.length != 0){
            let arr = [{id:'-1',name:"全部",select:true}];
            for(let i = 0 ; i  < da.length ; i++){
              arr.push({
                id:da[i].id,
                name:da[i].name.replace(/&nbsp;/g,""),
                select:da[i].select,
              })
            }
            _this.userParams = arr;
          }
        })
      },
      changeStaff(){
        
        for(var i=0;this.stateParams.length>i;i++){
          if(this.stateParams[i].name=="正式离职"&&this.stateParams[i].select==true){
             this.$refs.staffChild.getDisabled = false;
              break;
          }else {
            this.$refs.staffChild.getDisabled = true;
          }
        }
      },
      //批量修改自定号
      modifyNumClick(){
        let select = this.multipleSelection.toString();
        if(select){
          this.$refs['modifyNum'].newModifyNum(select);
        }else{
          this.myAlert("请选择人员！",'dangerous-icon');
        }
      },
      handleSelectionChange(elemCheckbox) {
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = [];
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
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
      //下拉
      gont(){
        let _this=this

        let arr = [{id:'-1',name:"全部",select:true}];
        _this.userParams = arr;
        departparam().then(function (res) {

          let staff=res.data
          if(staff && staff.length != 0){
            let arr = [{id:'-1',name:"全部",select:true}];
            for(let i = 0 ; i  < staff.length ; i++){
              arr.push({
                id:staff[i].id,
                name:staff[i].name.replace(/&nbsp;/g,""),
                select:staff[i].select,
                state:staff[i].state,
              })
            }
            _this.departParams = arr;
          }
        })

       
        let idd="661859895682928640"
        userde(idd).then(function (res) {
          let params = res.data.params;
          let useTypeIdParams = params.useTypeIdParams;
          let staffIdParams = params.staffIdParams;
          let numParams = params.numParams;
          let stateIdParams = params.stateIdParams;
          let imageTypeparams = params.imageTypeparams;
          numParams.forEach(item => {
            item.id = item.name;
            item.select = false;
          })
          _this.numParams = [{id:'-1',name:"全部",select:true}].concat(numParams);
         
          _this.useTypeIdParams = [{id:'-1',name:"全部"}].concat(useTypeIdParams);
          
          if(stateIdParams && stateIdParams.length != 0){
            let initArrSpecial = [{id:'-1',name:"全部",select:false},{
              id:'-4',name:"空",select:false
            }];
            stateIdParams.forEach(function(item){
              let obj = {
                id:item.id,
                name:item.name,
                select:false,
              }
              if(item.name == "常态在职"||item.name == "薪假在职"||item.name == "停薪在职"||item.name == "申离在职"){
                obj.select = true;
              }
              initArrSpecial.push(obj);
            })
            _this.stateParams = initArrSpecial;

          }
          _this.stateParams2 = [{id:'-1',name:"全部",select:true}].concat(_this.stateParams2);

          _this.stateParams3 = [{id:'-1',name:"全部",select:true}].concat(_this.stateParams3);
          if(staffIdParams && staffIdParams.length != 0){
            staffIdParams.forEach(item => {
              if(item.label){
                item.name = item.label;
              }
            })
          }
          _this.staffParams =  [{id:'-1',name:"全部",select:true}].concat(staffIdParams);
          //添加图文参数自选列；
          let columnData = _this.columnData;
          if(imageTypeparams && imageTypeparams.length != 0){
            
            let arr = [];
            imageTypeparams.forEach((item,index) => {
              let obj = {
                id:2019110053+index,
                pre:20191107,
                titleLabel:'图文信息',
                type:'',
                width:'75',
                ref:'',
                prop:item.id,
                label:item.name,
                align:'center',
                sortable:true,
                show:false,
                fixed:false
              }
              arr.push(obj);
            })
            columnData[6].child = arr;
          }
          _this.columnData = columnData;
          _this.reloadListByStorage();
          _this.searchListData();
        })
        
       
        

      },
      //获取下标
      mandetil(row, column, event){

        let _this = this
        _this.currentNum =row.index + 1
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
     
      rowClass({row, column, rowIndex, columnIndex}) {
        let className = "";
        if (row.stateName == '正式离职') {
          className =  'leave-user';
        };
        if(column.label=='部门人员'){
          return 'myselfstyle'
        };
        return className;
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        if(column.label=='部门人员'){
          return {'line-height':this.rowHeight};
        }
      },
     
      //人员详情
      manpss (index, row) {
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
            content: PersonDetailPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{myrow:row,type:2,mythisindex:index}//props
          },
          area:['800px','560px'],
          title:"人员修改 【"+ row.name+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
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
        
        document.getElementById('thimyshade').style.display = "block";
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.id,oneORmore:2};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
        _this.$refs.singleTable.setCurrentRow(row);
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
      clearForm(){
        
        this.form.word = "";
        this.form.timeType = "1";
        this.form.timeStart = "";
        this.form.timeEnd = "";
        this.form.useTypeId = "-1";

        this.departParams = this.backSlect(this.departParams);
        this.userParams = this.backSlect(this.userParams);
        let stateParams = this.stateParams;
        let arr = []
        stateParams.forEach(function(item){
          let obj = {
            id:item.id,
            name:item.name,
            select:false,
          }
          if(item.name == "常态在职"||item.name == "薪假在职"||item.name == "停薪在职"||item.name == "申离在职"){
            obj.select = true;
          }
          arr.push(obj);
        })
        this.stateParams = arr;
        this.staffSelect = true;
        this.stateParams2 = this.backSlect(this.stateParams2);
        this.stateParams3 = this.backSlect(this.stateParams3);

        this.staffParams = this.backSlect(this.staffParams);
        this.numParams = this.backSlect(this.numParams);
      },
      //查询
      searchListData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(this.form));
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.uIds = this.getSelectIdByList(this.userParams);

        form.stateIds = this.getSelectIdByList(this.stateParams);
        form.stateIds2 = this.getSelectIdByList(this.stateParams2);
        form.stateIds3 = this.getSelectIdByList(this.stateParams3);

        form.staffIds = this.getSelectIdByList(this.staffParams);
        form.num = this.getSelectIdByList(this.numParams);
        let timeStart = form.timeStart;
        let timeEnd = form.timeEnd;
        if(!timeStart){
          form.timeStart = "";
        }
        if(!timeEnd){
          form.timeEnd = "";
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        
        manpowerListData(form).then(function (response) {
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
          area:['450px','400px'],
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
        let storageMap = {};
        
        if(storageColumn){
          let getColumn = storageColumn.column;
          getColumn.forEach(item => {
            storageMap[item.id] = item;
          })
          columnData.forEach(item => {
            let child = item.child;
            
            if(child){
              let flag = false;
              child.forEach(item1 => {
                if(storageMap[item1.id]){
                  item1.show = storageMap[item1.id].show;
                  item1.width = storageMap[item1.id].width;
                }
               
                if(item1.show){
                  flag = true;
                }
              })
              if(flag){
                item.show = true;
              }else{
                item.show = false;
              }
            }else{
              if(storageMap[item.id]){
                item.show = storageMap[item.id].show;
                item.width = storageMap[item.id].width;
              }  
            }
          })
          column = columnData;
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
        this.$nextTick(function () {
          this.columnData = column;
        })
        
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
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = "人员修改 【"+ _this.tableData[mycountnum].name+"】";
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
      this.gont();
      this.shadenum();
    },

  }
</script>

<style lang="scss" scoped>
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
  .padding-l-10{
    padding-left:10px;
  }
  /deep/ .myselfstyle .cell{
    
      line-height: 100%!important;
      height: 100%!important;
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
  .search-des-word{
    height:27px;
    
    padding-right:2px;
    line-height:27px;
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
  .buget-container {
    height:100%;
    font-size: 12px;
    .top-container {
      width: calc(100% - 20px);
      margin: 0px auto 0px;
      .search-container {
        width:100%;
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
          .cut-icon {
            background: url(../../../images/system/fenge.png) -100px -90px;
            width: 3px;
            height: 23px;
            display: block;
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
      height: 33px;
      width: calc(100% - 20px);
      margin: 5px auto 0px;
      .search-container {
        width:100%;
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
    .buget-content{
      width: calc(100% - 20px);
      margin: 5px auto 0px;
      height:calc(100% - 80px);
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
        height:calc(100% - 27px);
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
  
  /deep/ #manpower-container .list-content .el-table {
    height: calc(100vh - 222px) !important;
    .el-table__body-wrapper {
      height: calc(100% - 27px) !important;
      .el-table__virtual-wrapper {
        height: 100% !important;
      }
    }
  }

</style>
