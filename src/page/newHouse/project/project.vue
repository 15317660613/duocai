<template>
  <div class="page-container mycontailerclass1"  id="project-container">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear" >
          <!--
          <div class="left padding-l-15"  >
            <el-radio  v-model="projectOrCompare" :label="1">&nbsp;</el-radio>
          </div>
          <div class="left" >
            项目列表
          </div>
          <div class="left padding-l-10" >
            <el-radio @change="changeToProjectCompare" v-model="projectOrCompare" :label="2">&nbsp;</el-radio>
          </div>
          <div class="left" >
            项对列表
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          -->
          <div class="item left padding-l-10 clear"  @click="addProject" >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="fa fa-plus add"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >新增项目</span>
              </div>
            </div>  
          </div>

          <div class="item left clear padding-l-10" @click="deletedProject"  >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="fa fa-times delete"  ></i>
              </div>
              <div class="left"  >
                <span class="search-word" >删除项目</span>
              </div>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10"   style="margin-top: 2px;">
            <div class="border-icon clear" > 
              <i class="one-four-icon" title="选定项目改自定号" @click="modifyNumClick"></i>
            </div>  
          </div>
          <div class="left padding-l-10"   >
            <div class="border-icon clear" > 
              <i class="platform-icon" title="平台公司" @click="platformCompanyShow" ></i>
            </div>  
          </div>
          <div class="left padding-l-10" style="padding-top: 4px;">
            <div class="border-icon clear" > 
              <i class="one-Thirteen-icon" title="过滤选中"  @click="filterData" ></i>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <div class="border-icon clear" > 
              <i class="leading-out-icon" title="自选列" @click="clickColumn" ></i>
            </div>  
          </div>
          <div class="left padding-l-10" @click="exportToExcel"  style="padding-top: 2px;">
            <div class="border-icon clear"> 
              <i class="print-out-icon" title="导出"  ></i>
            </div>  
          </div>
          <div class="left padding-l-10 " style="margin-top: 3px;">
            <div class="border-icon clear"> 
              <i class="one-twelve-icon" @click="tabRemove('/home/project')" ></i>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left p-l-10" >
            <div class="record-num" >
              <span class="search-word" ><</span>
              <span class="search-word" >{{currentNum}}</span>
              <span class="search-word" >/</span>
              <span class="search-word" >{{tableData.length}}</span>
              <span class="search-word" >></span>
            </div>
          </div>
        </div>
      </div>
      <div class="search-container " style="overflow:hidden;max-height:59px;" >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" >
            <div class="left padding-l-15" >
              <span class="des-word" >日期</span>
            </div>
            <div class="left " >
              <el-form-item label="" prop="timeMode" label-width="0">
                <el-select v-model="form.timeMode"    style="width:80px;"   >

                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="首开日期" value="1" ></el-option>
                  <el-option  label="最晚交房" value="2" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeStart" label-width="0">
                <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd" v-model="form.timeStart" style="width: 100px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeEnd" label-width="0">
                <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd" v-model="form.timeEnd" style="width: 100px;"></el-date-picker>
              </el-form-item>
            </div>

            <div class="left p-l-15">
              <span class="des-word" >排卡</span>
            </div>
            <div class="left ">
              <el-form-item label="" prop="haveCard" label-width="0">
                <el-select v-model="form.haveCard"    style="width:70px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="是" value="1" ></el-option>
                  <el-option  label="否" value="0" ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
              <span class="des-word" >营销状态</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="stateIds" :listData="projectStateParams" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left " style="padding-left:40px;" >
              <span class="des-word" >佣金</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                  <CheckSelectSpecial :selectId="commTypes" :listData="commTypeIdParams" style="width:85px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <el-select v-model="form.commModeId"    style="width:50px;"   >
                  <el-option v-for="item in commModeIdParams"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="commCountLow" label-width="0">
                <el-input @input="checkNum1"  maxLength="13" title="上限10位数" v-model="form.commCountLow"    style="width:50px;"   ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <span class="des-word" >-</span>
            </div>
            <div class="left " >
              <el-form-item prop="commCountUp"  label-width="0">
                <el-input @input="checkNum2"  v-model="form.commCountUp"  maxLength="13" title="上限10位数" style="width:50px;"   ></el-input>
              </el-form-item>
            </div>
            <div class="left " style="padding-left:15px;"  >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.word" title=" 项目名称/项目编号/项目自定号/平台公司/销售公司/销售地址" maxlength="30" style="width:160px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-5" style="margin-top:2px;"  >
              <i class="search-btn" @click="searchNewHouseList"   >查询</i>
            </div>

            <div class="left " style="margin-top:2px;">
              <i class="claerlys" @click="clearForm" ></i>
            </div>
            <div class="left " style="margin-top:4px;" >
              <i :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}" @click="showSearch" ></i>
            </div>

          </div>
          <div class="clear position-t-5" id="project-search" >
            <div class="left padding-l-15" >
              <span class="des-word" >地域</span>
            </div>
            <div class="left " >
              <el-form-item  label-width="0">
                <CheckSelectSpecial  @findStreetByTown="findStreetByTown" :selectId="townSelectIds" :listData="areaParams" style="width:140px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="streetSelectIds" :listData="streetParams" style="width:141px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
              <span class="des-word" >自定</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="numSelectIds" :listData="numParams" style="width:70px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
              <span class="des-word" >产品类型</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="productSelectTypeIds" :listData="typesParams" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >平台公司</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="platformIds" :listData="platformParams" style="width:120px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear" style="height:calc(100% - 125px)" >

      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          style="height:100%;"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @row-click="getRowDataByClick"
          :cell-class-name="rowClass"
          :cell-style="cellStyle"
          :row-height="rowHeight"
          ref="singleTable"
        >
          <template v-if="item.show" v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop == 'check'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"

              :align="item.align"
            >


            </PlTableColumn>

            <pl-table-column
              v-else-if="item.prop == 'projectName'"
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
                <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorProject(scope.$index, scope.row)" >
                  {{ scope.row.projectName }}
                </div>
              </template>
            </pl-table-column>

            <pl-table-column
              v-else
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              slot-scope="scope"
              :fixed="item.fixed"
              :align="item.align"
            >

            </pl-table-column>
          </template>
        </PlTable>
      </div>
    </div>
  </div>
</template>


<script>
  // 获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {findbyId} from '../../../service/getData'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {getparams,newHouseList,deletedProject,firstHouseBusinessCountHouseList} from '../../../service/newHouse'

  // 自选列
  import ColumPage from '../../../components/column'

  import CheckSelect from '../../../components/check'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import ModifyNumPage from './modifyNum'
  import { PlTable, PlTableColumn } from 'pl-table';
  import {newHouseParam} from '../../../utils/newHouseParams'
  import NewProjectPage from './newProject'
  import EditorProjectPage from './editorProject'
  import platformCompanyPage from './platformCompany'

  export default {
    data() {
      return {
        newProjectValue:false,
        editorProjectValue:false,
        platformCompanyValue:false,
        columnValue:false,
        upAndDown:1,
        projectOrCompare:1,
        currentNum:0,
        rowHeight:27,
        culumnTitle:'项目列表',
        sessionStr:'project-list',
        tableData:[],
        columnData:newHouseParam.newHouseColumn,
        currentPage:'',
        stateIds:'stateIds',
        commTypes:'commTypes',
        townSelectIds:'townSelectIds',
        streetSelectIds:'streetSelectIds',
        productSelectTypeIds:'productSelectTypeIds',
        platformIds:'platformIds',
        departIds:'departIds',
        userId:'userId',
        numSelectIds:'numSelectIds',
        defaultUserList:[],
        defaultDepartId:'',
        defaultUserId:'',
            
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        multipleSelection:[],
        projectStateParams:[],
        numParams:[],
        platformParams:[],
        commTypeIdParams:[],
        commModeIdParams:[],
        departParams:[],
        userParams:[],
        areaParams:[],
        streetParams:[],
        documentsParams:[],
        typesParams:[],
        highlightsParams:[],
        roomUseParams:[],
        stateParams:[],
        form:{
          needInfo:1,
          timeMode:'-1',
          timeStart:'',
          timeEnd:'',
          commModeId:'-1',
          commCountLow:'',
          commCountUp:'',
          haveCard:'-1',
          word:'',
        },
      };
    },
    components:{
      PlTable,
      PlTableColumn,
      ColumPage,
      CheckSelect,
      CheckSelectSpecial,
      NewProjectPage,
      EditorProjectPage,
      platformCompanyPage,
    },
    methods:{
      checkNum1(){
        this.form.commCountLow= this.form.commCountLow.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.commCountUp= this.form.commCountUp.replace(/[^\.\d]/g,'');
      },
      changeToProjectCompare(){
        this.$router.push('/home/projectCompare');
      },
      getParamsData(form){
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
              let initArrSpecial = [{id:"-1",name:"全部",select:false}];
              data.projectStateParams.forEach(function(item){
                let obj = {
                  id:item.id,
                  name:item.name,
                  select:false,
                }
                if(item.name == "在售"){
                  obj.select = true;
                }
                initArrSpecial.push(obj);
              })
              _this.projectStateParams = initArrSpecial;
            }
            if(data.commTypeIdParams){
              _this.commTypeIdParams = [{id:"-1",name:"全部",select:true}].concat(data.commTypeIdParams);
            }

            if(data.commModeIdParams){
              _this.commModeIdParams = [{id:"-1",name:"全部",select:true}].concat(data.commModeIdParams);
            }
            if(data.platformList){
              let arr = [];
              data.platformList.forEach(function(item){
                arr.push({
                  id:item.id,
                  name:item.platformCompany,
                  select:false,
                })
              })
              _this.platformParams = [{id:"-1",name:"全部",select:true}].concat(arr);
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
            if(data.typesParams){
              _this.typesParams = [{id:"-1",name:"全部",select:true}].concat(data.typesParams);
            }
            if(data.numParams){
              let initArrNum = [{id:"-1",name:"全部",select:true},{id:'0',name:'空',select:false}];
              data.numParams.forEach(function(item){
                initArrNum.push({
                  id:item.name,
                  name:item.name,
                  select:false,
                })
              })
              _this.numParams = initArrNum;
            }
            let defaultUserList = data.defaultUserList;
            let defaultDepartId = data.defaultDepartId;
            let defaultUserId = data.defaultUserId;
            _this.defaultUserList = defaultUserList;
            _this.defaultDepartId = defaultDepartId;
            _this.defaultUserId = defaultUserId;
            if(data.departTree) {
              let arr = [{id:"-1",name:"全部",select:true}];
              if(defaultDepartId){
                arr = [{id:"-1",name:"全部",select:false}];
              }else{
                 arr = [{id:"-1",name:"全部",select:true}];
              }
             
              let treeData = data.departTree
              for (let i = 0; i < treeData.length; i++) {
                let obj = {
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  select:false,
                };
                if(defaultDepartId && defaultDepartId == treeData[i].id ){
                  obj.select = true;
                }
                arr.push(obj);
              }
              _this.departParams = arr;
            }
            var arr = [{id:'-1',name:'全部',select:true}];
            if(defaultUserList && defaultUserList.length != 0){
              if(defaultUserId){
                arr = [{id:'-1',name:'全部',select:false}];
              }else{
                arr = [{id:'-1',name:'全部',select:true}];
              }
              defaultUserList.forEach(item =>{
                let obj = {
                  id:item.id,
                  name:item.name,
                  select:false
                }
                if(defaultUserId && defaultUserId == item.id){
                  obj.select = true;
                }
                arr.push(obj);
              })
            }
            _this.userParams = arr;

            if(form){
              _this.linkhttpfunc(form);
            }else{
              _this.searchNewHouseList();
            }
            
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      cellStyle({row, column, rowIndex, columnIndex}){
        
        if(column.property == 'projectState' && (row.projectState == '售罄')){
          return {'color':"#B40000"}
        }
        if(column.property == 'projectState' && (row.projectState == '待售')){
          return {'color':"#000096"}
        }
      },
      searchNewHouseList(){
        let _this = this;
        this.currentNum =0;
        let form = JSON.parse(JSON.stringify(_this.form));
        let projectState = this.getSelectIdByList(this.projectStateParams);
        let commTypeId = this.getSelectIdByList(this.commTypeIdParams);
        let districtId = this.getSelectIdByList(this.areaParams);
        let streetId = this.getSelectIdByList(this.streetParams);
        let types = this.getSelectIdByList(this.typesParams);
        let platforms = this.getSelectIdByList(this.platformParams);
        let departIds = this.getSelectIdByList(this.departParams);
        let userIds = this.getSelectIdByList(this.userParams);
        let num = this.getSelectIdByList(this.numParams);
        
        form.projectState = projectState.toString();
        form.commTypeId = commTypeId.toString();
        form.districtId = districtId.toString();
        form.streetId = streetId.toString();
        form.types = types.toString();
        form.platforms = platforms.toString();
        form.numsDepartIds = departIds.toString();
        form.numsEmpIds = userIds.toString();
        form.num = num.toString();
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        newHouseList(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            _this.tableData = data;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      //批量修改自定号
      modifyNumClick(){
        let _this = this;
        let select = _this.multipleSelection.toString();
        if(select){
          let layerId = _this.$layer.iframe({
            content: {
              content: ModifyNumPage, //传递的组件对象
              parent: _this,//当前的vue对象
              data:{
                myids:select
              }//props
            },
            area:['350px','200px'],
            title: "选定项目改自定号",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
              
            }
          });
        }else{
          _this.myAlert("请选择项目！",'dangerous-icon');
        }
      },
      //查街镇
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
      finUserByDepart(){
        let _this = this;
        let id = this.getSelectIdByList(_this.departParams);
        if(id){
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
        }else{
          _this.userParams = [{id:'-1',name:"全部",select:true}];
        }

      },
      //新增项目
      addProject(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: NewProjectPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "新增项目",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });

        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      editorProject(index, row){
        let _this = this;
        this.currentPage = row;
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
            content: EditorProjectPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,'activeName':'project',thisindex:index,}//props
          },
          area:['800px','560px'],
          title: "项目信息 【"+this.currentPage.projectName+"】",
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
      platformCompanyShow(){
        // this.$refs.plaformCompany.showDialog();
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: platformCompanyPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              columnData:_this.columnData,
              sessionStr:_this.sessionStr,
            }//props
          },
          area:['600px','450px'],
          title: "平台公司列表",
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
      },
      reloadProjectList(type,projectId,projectName){
        debugger;
        let _this = this;
        if(type == 1){
          this.searchNewHouseList();
        }else if(type == 2){
          this.searchNewHouseList();
          let test = _this.$layer.iframe({
            content: {
              content: EditorProjectPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{id:projectId,'activeName':'agenct'}//props
            },
            area:['800px','560px'],
            title: "项目信息 【"+projectName+"】",
            shadeClose: false,
            shade: false,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });

        }
      },

      //删除项目
      deletedProject(){
        let _this = this;
        let ids = _this.multipleSelection;
        if(ids.length != 0){
          _this.myConfirm("警告：新房删除后将不能还原！","question-icon",'是','否',"确定要删除选定记录吗？").then(res => {
            _this.saveSuccess();
          }).catch(err => {

          })
        }else{
          _this.myAlert("请选择要删除的新房！")
        }
      },

      saveSuccess(){
        let _this = this;
        let deleted = 1;
        let ids = _this.multipleSelection.toString();
        deletedProject(ids,deleted).then(function (response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let data = response.data;

            _this.myAlert("删除成功",'success-icon').then(res => {
              let id = _this.multipleSelection;
              let temp = _this.tableData.concat();
              for(let i = 0 , len = id.length; i < len ; i++ ){
                temp = _this.deletArrByValue(temp,id[i]);
              }
              _this.tableData = temp;
            }).catch(err => {

            })
          }else if(response.status == 1){
            _this.myAlert(response.msg+"！");
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

        this.form.timeMode = "-1" ;

        this.form.timeStart = '';
        this.form.timeEnd = '';
        this.form.commModeId = '-1';
        this.form.haveCard = '-1';
        this.form.commCountLow = '';
        this.form.commCountUp = '';
        this.form.word = '';
        let projectStateParams = _this.projectStateParams;
        let initArrSpecial = [{id:"-1",name:"全部",select:false}];
        projectStateParams.forEach(function(item){
          if(item.name != '全部'){
            let obj = {
              id:item.id,
              name:item.name,
              select:false,
            }
            if(item.name == "在售"){
              obj.select = true;
            }
            initArrSpecial.push(obj);
          }
        })
        
        _this.projectStateParams = initArrSpecial;
        _this.commTypeIdParams = _this.backSlect(_this.commTypeIdParams);
        _this.areaParams = _this.backSlect(_this.areaParams);
        _this.streetParams = _this.backSlect(_this.streetParams);
        _this.typesParams = _this.backSlect(_this.typesParams);
        _this.platformParams = _this.backSlect(_this.platformParams);
        
        let defaultUserList = this.defaultUserList;
        let defaultDepartId = this.defaultDepartId;
        let defaultUserId = this.defaultUserId;
       
        let arr = [{id:"-1",name:"全部",select:true}];
        if(defaultDepartId){
          arr = [{id:"-1",name:"全部",select:false}];
        }else{
            arr = [{id:"-1",name:"全部",select:true}];
        }
        
        let departParams = this.departParams;
        departParams.forEach(item => {
          if(item.id != -1){
            let obj = {
              id: item.id,
              name: item.name,
              level: item.level,
              select:false,
            };
            if(defaultDepartId && defaultDepartId == item.id ){
              obj.select = true;
            }
            arr.push(obj);
          }  
        })
        _this.departParams = arr;   


        var arr1 = [{id:'-1',name:'全部',select:true}];
        if(defaultUserList && defaultUserList.length != 0){
          if(defaultUserId){
            arr1 = [{id:'-1',name:'全部',select:false}];
          }else{
            arr1 = [{id:'-1',name:'全部',select:true}];
          }
          defaultUserList.forEach(item =>{
            if(item.id != -1){
              let obj = {
                id:item.id,
                name:item.name,
                select:false
              }
              if(defaultUserId && defaultUserId == item.id){
                obj.select = true;
              }
              arr1.push(obj);
            }  
          })
        }
        _this.userParams = arr1;
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
      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          const tHeader = ['项目名称','项目编号','登记名称','自定号','地域','负责人','项目状态',
            '投资商','开发商','拿地日期','销售地址','项目均价','联系人','项目证件',
            '首开日期','最晚交房','产权年限','联系电话','占地面积','建筑面积','建筑类型',
            '总户数','今日带看','总带看量'
          ];
          const filterVal = ['projectName','projectCode','registerName','num','area','responsibleEmp','projectState',
            'investor','developer','placeGetDate','projectAddress','avePrice','contactor','documents',
            'startDate','endDate','propertyYear','contactorPhone','coverArea','buildingArea','buildingType',
            'ownerCount','todayShow','allShow'
          ];
          const list = this.tableData;
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '项目列表')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
      rowClass({row, index}) {
        let className = "";

        return className;
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
        _this.currentPage = tableData[mycountnum];
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="项目信息 【"+_this.currentPage.projectName+"】";
        _this.$refs.singleTable.setCurrentRow(_this.currentPage);
        let  callbackdata = {id: _this.currentPage.id,thisindex:mycountnum,};


        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.currentPage.id
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

        firstHouseBusinessCountHouseList(form).then(function(res) {
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
      this.reloadListByStorage();
      this.shadenum();
      let form=this.$route.query.form;
      if(form){
        form = JSON.parse(form);
        if(form.needFlag){
          this.getParamsData(form);
        }
      }else{
        this.getParamsData();
      }
    },
    watch: {
      $route: {
        handler() {
          let form=this.$route.query.form;
          if(form){
            form = JSON.parse(form);
            if(form.needFlag){
              this.getParamsData(form);
            }
          }else{
            this.getParamsData();
          }
          //深度监听，同时也可监听到param参数变化
        },
        deep: true,
      },
      'form.commCountLow':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.commCountLow = undefined;
            return;
          }
          this.form.commCountLow = oldval
        } else {
          this.form.commCountLow = newval.replace(/^\./g, "")
        }
      },
      'form.commCountUp':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.commCountUp = undefined;
            return;
          }
          this.form.commCountUp = oldval
        } else {
          this.form.commCountUp = newval.replace(/^\./g, "")
        }
      },
    } 
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-table,.el-table__expanded-cell {
    height: 100% !important;
  }
 /deep/ .el-table--scrollable-x .el-table__body-wrapper {
    height: 96% !important;
  }
  .page-container {
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
    .add {
      font-size:18px;
      color: #008000;
      margin-top:3px;
    }
    .delete{
      font-size:18px;
      color: #FF0000;
      margin-top:3px;
    }
    .search-btn,.claerlys{
      cursor:pointer;
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
