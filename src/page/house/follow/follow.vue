<template>
  <div id="follow-container" class="rent-container mycontailerclass1" >
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear" >
          <div class="left padding-l-10"  @click="deletedFollow" style="cursor:pointer;" >
            <div class="border-icon clear" > 
              <i class="fa fa-times delete" style="color:#FF0000;" ></i>
              <span>删除跟进</span>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-column-icon"></i>
          </div>
          <div class="left padding-l-10"  >
            <div class="border-icon clear" > 
              <i class="leading-out-icon" title="自选列" @click="clickColumn" ></i>
            </div>  
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
            <div class="border-icon clear" > 
              <i class="back-icon user left" @click="tabRemove('/home/follow')" ></i>
            </div>
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>

        </div>
      </div>
      <div class="search-container " style="height:;overflow:hidden;max-height:57px;" >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" >
            <div class="left padding-l-15" >
              <span class="des-word" >日期</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-select @change="getQuickDate" v-model="quick"    style="width:85px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="今天" value="2" ></el-option>
                  <el-option  label="昨天" value="21" ></el-option>
                  <el-option  label="三天" value="3" ></el-option>
                  <el-option  label="上周" value="16" ></el-option>
                  <el-option  label="本周" value="15" ></el-option>
                  <el-option  label="上月" value="17" ></el-option>
                  <el-option  label="本月" value="9" ></el-option>
                  
                  <el-option  label="上年" value="11" ></el-option>
                  <el-option  label="本年" value="12" ></el-option>
                  <el-option  label="自定义" value="1" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <el-date-picker size="mini" type="date" v-model="form.timeStart" style="width: 90px;"></el-date-picker>
              </el-form-item>

            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <el-date-picker size="mini" type="date" v-model="form.timeEnd" style="width: 90px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >交易</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="tradeId" :listData="tradeParams" style="width:85px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >状态</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="stateId" :listData="stateParams" style="width:94px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15"   >
              <el-form-item prop="word" label-width="0">
                <el-input v-model.trim="form.word" title="楼盘/业主姓名/跟进内容" maxlength="30" style="width:150px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-5" style="padding-top:3px;" >
              <i @click="searchFollowDataList" class="search-btn" style="cursor:pointer;" >查询</i>
            </div>
            <div class="left "  style="padding-top:3px;" >
              <i class="claerlys" @click="clearForm"  ></i>
            </div>
            <div class="left" style="margin-top:5px;" >
              <i :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}" @click="showSearch" ></i>
            </div>
          </div>
          <div class="clear position-t-8"  v-show="upAndDown==1">

            <div class="left padding-l-15" >
              <span class="des-word " >员工</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-select v-model="form.userType"    style="width:85px;"   >
                  <el-option  label="跟进员工" value="1" ></el-option>
                  <el-option  label="房源归属" value="2" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial  @findStreetByTown="finUserByDepart" :selectId="departId" :listData="departParams" style="width:90px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="userId" :listData="userParams" style="width:90px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >方式</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="processTypeId" :listData="processWayIdParams" style="width:85px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="typeId" :listData="typeParams" style="width:135px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear"  style="height:calc(100% - 125px)" >
      <div class="list-content" >
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :cell-class-name="rowClass"
           :cell-style="cellStyle"
          :row-height="rowHeight"
          ref="singleTable"
        >


          <template v-if="item.show" v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop == 'remark'"
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
                <div v-html="scope.row.remark" style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="getFollowEditor(scope.$index, scope.row)" >

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

            </PlTableColumn>
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
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {followListRouter,followParam,deletedFollow,sechouseBusinessCountProcessingList} from '../../../service/houseData'
  import {rentConstParam} from '../../../utils/rentParam'
  import {quickDate} from '../../../utils/getQuickDate'
  import CheckSelectSpecial from '../../../components/checkSpecial'  // 自选列
  import ColumPage from '../../../components/column'
  import { PlTable, PlTableColumn } from 'pl-table';
  // 编辑钥匙
  import EditorRentPage from '../rent/editorRent'
  //获取数据
  export default {
    data() {
      return {
        columnValue:false,
        currentPage:[],
        multipleSelection:[],
        tableData:[],
        columnData:rentConstParam.followColumn,
        sessionStr:'house-follow',
        currentNum:0,
        quick:'9',
        upAndDown:1,
        tradeId:'tradeId',
        stateId:'stateId',
        departId:'departId',
        userId:'userId',
        processTypeId:'processTypeId',
        typeId:'typeId',
        culumnTitle:"跟进列表",
        tradeParams:[],
        stateParams:[],
        departParams:[],
        userParams:[],
        processWayIdParams:[],
        rowHeight:27,
        typeParams:[],
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        form:{
          timeStart:'',
          timeEnd:'',
          userType:'1',
          word:'',
        },

      };
    },
    components:{
      CheckSelectSpecial,
      EditorRentPage,
      ColumPage,
      PlTable,
      PlTableColumn
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
      //获取跟进参数
      getFollowParamData(form){
        let _this = this;

        followParam().then(function(response) {

          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.getQuickDate(9);
            let arr = [{id:'-1',name:"全部",select:true}];
            let obj = rentConstParam.houseTradeParams;
            _this.tradeParams = arr.concat(obj);

            let stateParams = data.roomSaleStateIdParams;
            
            if(stateParams && stateParams.length != 0){
              arr = [{id:'-1',name:"全部",select:false}];
              for(let i = 0 ; i  < stateParams.length ; i++){
                let obj = {
                  id:stateParams[i].id,
                  name:stateParams[i].name,
                  select:stateParams[i].select,
                }
                if(stateParams[i].name == '有效'){
                  obj.select = true;
                }
                arr.push(obj);
              }
              _this.stateParams = arr;
            }

            let departTree = data.departTree;
            if(departTree && departTree.length != 0){
              arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < departTree.length ; i++){
                arr.push({
                  id:departTree[i].id,
                  name:departTree[i].label.replace(/&nbsp;/g,""),
                  select:departTree[i].select,
                  state:departTree[i].state,
                })
              }
              _this.departParams = arr;
            }
            _this.userParams = [{id:'-1',name:"全部",select:true}];

            let processWayIdParams = data.processWayIdParams;
            if(processWayIdParams && processWayIdParams.length != 0){
              arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < processWayIdParams.length ; i++){
                arr.push({
                  id:processWayIdParams[i].id,
                  name:processWayIdParams[i].name,
                  select:processWayIdParams[i].select,
                })
              }
              _this.processWayIdParams = arr;
            }

            arr = [{id:'-1',name:"全部",select:true}];
            obj = rentConstParam.houseTypeParams;
            _this.typeParams = arr.concat(obj);

            if(form){
              _this.linkhttpfunc(form);
            }else{
              _this.getFollowData();
            }
            
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
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
      //获取跟进数据
      getFollowData(){
        let _this = this;
        //加载动画
        _this.$layer.loading({
          shade:true,
        })
        let form = JSON.parse(JSON.stringify(_this.form));
        form.roomType = _this.getSelectIdByList(_this.tradeParams);
        form.roomSaleState = _this.getSelectIdByList(_this.stateParams);
        form.deptIds = _this.getSelectIdByList(_this.departParams);
        form.userIds = _this.getSelectIdByList(_this.userParams);
        form.processWay = _this.getSelectIdByList(_this.processWayIdParams);
        let typeParams = this.typeParams;
        let type = [];
        typeParams.forEach(item => {
          if(item.select){
            debugger;
             if(item.name && item.name.indexOf("修改") != -1){
                let name =  item.name.replace("修改","");
                type.push(name);
             }else{
                if(item.name == '全部'){
                  type.push('-1');
                }else{
                    type.push(item.name);
                }
                
             }
          }
        })
        form.type = type.toString();
        if(!form.timeStart){
          form.timeStart = "";
        }
        if(!form.timeEnd){
          form.timeEnd = "";
        }
        followListRouter(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
              let list = response.data.list;
              if(list.length != 0){
                  list.forEach(function(item){
                      let remark = item.remark;
                      if(remark){
                        let arr = remark.split("<br/>");
                        let count = 0;
                        let str = "";
                        if(arr.length != 0){
                          for(let i = 0 ; i < arr.length ; i++){
                            if(count + arr[i].length < 40){
                                if(i == 0){
                                  str =  arr[i];
                                }else{
                                    str = str+"<br/>" +arr[i];
                                }

                            }else{
                                let oneCount = 40 - count;
                                str = str + "<br/>" + arr[i].substring(0,oneCount)+"...";
                                break;
                            }
                            count += arr[i].length;
                          }
                          item.remark = str;
                        }
                      }

                  })
              }
              _this.tableData = list;
              _this.tableData.forEach(item=>{
                if(!item.roomId){
                  item.roomId==''
                }else{
                  item.roomId = Number(item.roomId);
                }
                
              })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
          _this.currentNum = 0;
        })
      },
      searchFollowDataList(){
        this.getFollowData();
      },
      reloadRentList(){
        this.getFollowData();
      },
      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          const tHeader = ['跟进时间', '方式', '跟进内容', '跟进人', '房源编号', '楼盘字典', '栋座位置', '房号', '交易','状态'];
          const filterVal = ['createTime','processWayId',
            'remark','emp2','roomCode','areaVillage','seat',
            'roomId','roomType','roomSaleStateId'];
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '跟进记录')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      
      cellStyle({row, column, rowIndex, columnIndex}){
       if(column.property == 'processWayId' && row.processWayId == '带看'){
         return {'color':'#B40000'}
       }
        if(column.property == 'processWayId' && row.processWayId == '申请'){
         return {'color':'#007878'}
       }
        if(column.property == 'processWayId' && row.processWayId == '保留'){
         return {'color':'#000096'}
       }

       if(column.property == 'roomType' && row.roomType == '出售'){
         return {'color':'#B40000'}
       }
        if(column.property == 'roomType' && row.roomType == '出租'){
         return {'color':'#009600'}
       }
       if(column.property == 'roomType' && row.roomType == '租售'){
         return {'color':'#007878'}
       }
       if(column.property == 'roomSaleStateId' &&( row.roomSaleStateId == '已租' || row.roomSaleStateId == '已售' || row.roomSaleStateId == '我租' || row.roomSaleStateId == '我售' )){
         return {'color':'#B40000'}
       }
       
      },
      //详情
      getFollowEditor(index,row){
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

        _this.currentPage = row;
        let tableData = this.tableData;
        let len = tableData.length;
        let ids = [];
        for(let i = 0 ;  i < len; i ++) {
          ids.push(tableData[i].houseId);
        }
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorRentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.houseId,address:row.areaVillage,activeName:'house',ids:ids.toString(),mythisindex:index}//props
          },
          area:['800px','560px'],
          title:"房源信息 【"+ row.areaVillage+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
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
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.houseId,oneORmore:2};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
        _this.$refs.singleTable.setCurrentRow(row);

      },
      changeTitle(count,needlayerid,upordown){
        let _this = this;
        // let currentData = _this.tableData;
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
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="房源信息 【"+_this.currentPage.areaVillage+"】";
        _this.$refs.singleTable.setCurrentRow(_this.currentPage);
        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.currentPage.houseId
          }
        })
        let  callbackdata = {
          rowid: tableData[mycountnum].houseId,
          thisindex:mycountnum,
        };
        return callbackdata;
      },
      rowClass({row, index}) {
        let className = "";
        if(row.roomSaleStateId == '无效'){
          className += " invoild-customer ";
        }
        
        if(row.id == this.currentPage.id){
          className += ' page-check';
        }
        return className;
      },
      deletedFollow(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if(select){
          _this.myConfirm("警告：房源跟进记录删除后不能还原", 'dangerous-icon','确认','取消','确定要永久删除选定的跟进记录吗？','my-message').then(res => {
            _this.deletedDataFollow();
          }).catch(err => {
          })
        }else{
          this.myAlert("请勾选要删除的跟进!",'dangerous-icon');
        }
      },
      deletedDataFollow(){

        let _this = this;
        let select = this.multipleSelection.toString();
        deletedFollow(select,1).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("删除成功!",'success-icon').then(res => {
              _this.getFollowData();
            }).catch(err => {
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
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
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      getRowDataByClick (row, column, event) {
        let _this = this;
        _this.currentNum = row.index + 1;
        _this.currentPage = row;
      },
      clearForm(){
        let _this = this;
        this.timeDisabled = false;
        this.quick = '9';
        this.form.timeStart = '';
        this.form.timeEnd= '';
        this.form.userType= '1';
        this.form.word= '';
        _this.getQuickDate(9);
        _this.tradeParams = _this.backSlect(_this.tradeParams);
        _this.stateParams = _this.backSlect(_this.stateParams);
        _this.departParams = _this.backSlect(_this.departParams);
        _this.userParams = _this.backSlect(_this.userParams);
        _this.processWayIdParams = _this.backSlect(_this.processWayIdParams);
        _this.typeParams = _this.backSlect(_this.typeParams);
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
      },

      //业务统计跳转
      linkhttpfunc(form){
        let _this = this;
        this.$layer.loading({
          shade: true //是否显示遮罩
        });

        sechouseBusinessCountProcessingList(form).then(function(res) {
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
    mounted(){
      this.reloadListByStorage();
      this.shadenum();
      let form=this.$route.query.form;
      if(form){
        form = JSON.parse(form);
        if(form.needFlag){
          this.getFollowParamData(form);
        }
      }else{
        this.getFollowParamData();
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
    watch: {
      $route: {
        handler() {
          let form=this.$route.query.form;
          if(form){
            form = JSON.parse(form);
            if(form.needFlag){
              this.getFollowParamData(form);
            }
          }else{
            this.getFollowParamData();
          }
        },
        deep: true,
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

    .house-list-icon{
      background:url(../../../images/icon.png) -182px -37px;
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

   
    .back-icon{
      background:url(../../../images/system/tuichu.png) -15px -15px;
      width:20px;
      height:20px;
      display:inline-block;
    }
    .des-word{
      line-height:30px;
      height:30px;
      display:inline-block;
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