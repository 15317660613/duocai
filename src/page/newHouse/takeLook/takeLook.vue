<template>
  <div class="rent-container mycontailerclass1" id="rent-container" >
    <div class="top-container border-black" style="position: relative;" >
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2" style="line-height: initial;">
        <div class="clear" >
          <div class="item left m-t-5" style="margin-left: 10px" @click="deletedReportClick" >
            <i class="six-ten-icon" style="display: inline-block;"></i>
            <span>删除跟进</span>
          </div>
          <div class="left"  style="padding-left: 10px;margin-top: 3px;">
            <i class="cut-icon"></i>
          </div>

          <div class="item left m-t-5"  style="padding-left: 15px;" title="过滤选中">
            <i  @click="filterData"  class="one-Thirteen-icon"></i>
          </div>

          <div class="item left"    style="padding-left: 15px;margin-top: 3px;" title="自选列">
            <i @click="clickColumn" class="one-ten-icon"></i>
          </div>

          <div class="item left m-t-5" style="padding-left: 15px;" title="导出">
            <i @click="exportToExcel"  class="one-eleven-icon"></i>
          </div>
          <div class="item left m-t-5" style="margin-left: 10px;">
            <div class="record-num" >
              <span class="search-word" ><</span>
              <span class="search-word" >{{listnum}}</span>
              <span class="search-word" >/</span>
              <span class="search-word" >{{tableData.length}}</span>
              <span class="search-word" >></span>
            </div>
          </div>
          <div class="item left clear m-t-5"  @click="tabRemove('/home/takeLook')" style="padding-left: 15px;">
            <i class="one-twelve-icon"></i>
          </div>

        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" >
            <div class="left padding-l-15" >
              <span class="des-word" >带看时间</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-select @change="getQuickDate"  v-model="timetype"    style="width:65px;"   >
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

            <div class="left padding-l-15" >
              <span class="des-word" >带看员工</span>
            </div>
            <div class="left">
              <el-form-item  label-width="0">
                <CheckSelectSpecial  @findStreetByTown="finUserByDeparttwo"  :selectId="rep1" :listData="reportperson1" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="rep2" :listData="reportperson2" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-15"  >
              <span class="des-word" style="width:51px;text-align:right;" >带看项目</span>
            </div>
            <div class="left">
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="rstates1" @findStreetByTown="addressfindone" :listData="reportstate1" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="rstates2" @findStreetByTown="addressfindtwo" :listData="reportstate2" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left">
              <el-form-item  label-width="0">
                <CheckSelectSpecial :selectId="rstates3" :listData="reportstate3" style="width:100px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left " style="padding-left:30px;" >
              <el-form-item prop="word1" label-width="0">
                <el-input  v-model="form.word" maxlength="30" style="width:210px;" title="编号/项目名称/客户名/跟进内容" autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class=" left padding-l-5" @click="searchThisTableList" style="margin-top:1px;" >
              <i class="search-btn"  >查询</i>
            </div>
            <div class="left padding-l-5" @click="clearForm" style="margin:2px 0 0 -4px">
              <i class="claerlys"  ></i>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="content clear" style="height:calc(100% - 105px)">
      <div class="list-content"  style="height:100%">
        <PlTable
          :datas="tableData"
          :pagination-show="false"  
          empty-text=" "
          border
          height="100%"
          @row-click="rrDetil"
          :row-height="rowHeight"
           @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
          ref="singleTable"
        >
          <template v-if="item.show"  v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop=='remark'"
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
                  {{ scope.row.remark }}
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
              :show="item.show"
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
  import ColumPage from '../../../components/column'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import { getparams , firstHouseLookList,firstHouseBusinessCountLookList } from '../../../service/newHouse'
   import {findUserByDepartId} from "../../../service/organizeDate";
  import {findBuildingListByAreaId} from '../../../service/getData'
  import EditorReportPage from '../report/reportdetail'
  import { PlTable, PlTableColumn } from 'pl-table';
  import {takeLookparams} from '../../../utils/takeLookparam'
  import {quickDate} from '../../../utils/getQuickDate'
  export default {
      name: "report",
      components: {
        CheckSelectSpecial,
        PlTable,
        PlTableColumn,
        ColumPage
      },
      data(){
          return{
            columnData:takeLookparams.takeLookparam,
            culumnTitle:'带看记录',
            sessionStr:'takeLook-list',
            columnValue:false,
            rowHeight:27,
            upAndDown:1,
            listnum:0,
            tableData:[],
            multipleSelection:[],
            reportstate1:[],
            reportstate2:[],
            reportstate3:[],
            streetsall:[],
            rstates1:"rstates1",
            rstates2:"rstates2",
            rstates3:"rstates3",
            reportperson1:[],
            rep1:'rep1',
            reportperson2:[],
            rep2:'rep2',
            timetype:"13",
            form:{
              word:"",
              
              
              timeStart:"",
              timeEnd:"",
            },
            initLeft:0,//初始化详情弹窗的增加 left
            initTop:0,//初始化详情弹窗的增加 top
          }
      },
      
      methods:{
        
        getparamsfunc(form){
          let _this = this;
          _this.$layer.loading({
            shade: true,//是否显示遮罩
          });

          getparams(false,false).then(function(response){
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              _this.getQuickDate(13);
              let personArr1 = [{ id: "-1", name: "全部", select: true }];
              let personArr2 = [{ id: "-1", name: "全部", select: true }];
              let addressArr1 = [{ id: "-1", name: "全部", select: true }];
              let addressArr2 = [{ id: "-1", name: "全部", select: true }];
              let addressArr3 = [{ id: "-1", name: "全部", select: true }];
              if(data.departTree){
                for (let i = 0; i < data.departTree.length; i++) {
                  personArr1.push({
                    id: data.departTree[i].id,
                    name: data.departTree[i].label.replace(/&nbsp;/g, ""),
                    level: data.departTree[i].level,
                    select: false,
                    state:data.departTree[i].state,
                  })
                }
              };
              _this.reportperson1 = personArr1;
              _this.reportperson2 = personArr2;

              if(data.areas){
                for (let i = 0; i < data.areas.length; i++) {
                  addressArr1.push({
                    id: data.areas[i].id,
                    name: data.areas[i].label.replace(/&nbsp;/g, ""),
                    select: false
                  })
                }
              }
              
              _this.reportstate1 = addressArr1;
              _this.reportstate2 = addressArr2;
              _this.reportstate3 = addressArr3;

              _this.streetsall = data.streets;
              if(form){
                _this.linkhttpfunc(form);
              }else{
                _this.searchThisTableList();
              }
              

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        },

        //查询
        searchThisTableList(){
          let _this=this;
          let form = JSON.parse(JSON.stringify(_this.form));

          //部门
          let departIds = _this.getSelectIdByList(_this.reportperson1);
          form.departIds = departIds.toString();

          //人员
          let userIds = _this.getSelectIdByList(_this.reportperson2);
          form.userIds = userIds.toString();

          //区域
          let distrctIds = _this.getSelectIdByList(_this.reportstate1);
          form.distrctIds = distrctIds.toString();

          //街道
          let streetIds = _this.getSelectIdByList(_this.reportstate2);
          form.streetIds = streetIds.toString();

          //项目
          let projectIds = _this.getSelectIdByList(_this.reportstate3);
          form.projectIds = projectIds.toString();

          if(form.timeStart == null){
            form.timeStart = '';
          };
          if(form.timeEnd == null){
            form.timeEnd = '';
          }
          this.$layer.loading({
            shade: true,//是否显示遮罩
          });

         
          firstHouseLookList(form).then(function (response) {
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
        searchReport(){
          this.searchThisTableList();
        },
        //xiangqing
        sdestil(s,i){
          debugger;
          let _this = this;
          let thisifranmeisopen = false;
            let thisifranmeopennum = 0;
          _this.$store.state.layerifranme.forEach(item=>{
              if(item.thisrowid == i.id){
                try{
                  document.getElementById(item.childlayerid).focus();
                }catch(e){

                }
                thisifranmeisopen = true;
              };
              if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]){
                thisifranmeopennum = thisifranmeopennum + 1;
              }
            });
            
            if(thisifranmeopennum>=8){
              _this.myAlert("当前列表打开详情数量已达上限！",'dangerous-icon');
              return false;
            }
          let layerId = _this.$layer.iframe({
            content: {
              content: EditorReportPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{reportId:i.recordId,thisindex:s}//props
            },
            area:['800px','560px'],
            title: "报备修改 【 项目:"+i.proname+'&nbsp;&nbsp;&nbsp;&nbsp;'+'客户:'+i.cusname+"】",
            shadeClose: false,
            shade: false,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
              if( _this.initLeft != 0){
                _this.initLeft -= 10;
                _this.initTop -= 30;
              }
            },

          })
          let getLayerId = document.getElementById(layerId);
            getLayerId.style.left = "calc(50% + "+_this.initLeft+"px)";
            getLayerId.style.top =  "calc(50% + "+_this.initTop+"px)";
            _this.initLeft += 10;
            _this.initTop += 30;

          document.getElementById('thimyshade').style.display = "block";
          let mygetLayerId = document.getElementById(layerId).getAttribute('id');
          let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:i.recordId,oneORmore:2};
          _this.$store.commit('set_active_layerifranme',layerifranmedata);
          _this.$refs.singleTable.setCurrentRow(i);

        },
        finUserByDeparttwo(){
          let _this = this;
          let id = _this.getSelectIdByList(_this.reportperson1);
          this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          if(id){
            let form = {id,flag:3,isSelect:1,showLeave:1};
            findUserByDepartId(form).then(function (response) {
              _this.$layer.closeAll('loading');
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                let data = response.data;
                let user = data.user;
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
                _this.reportperson2 = arr;
              } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message + "！");
              }
            })
          }else{
            _this.reportperson2 = [{id:'-1',name:"全部",select:true}];
          }
        },

        addressfindone(){
          let _this = this;
          var myarray = _this.getSelectIdByList(_this.reportstate1).split(",");
          if(myarray){
            myarray.forEach(i=>{
              _this.streetsall.forEach(item=>{
                if(i==item.preId){
                  _this.reportstate2.push({
                    id:item.id,
                    name:item.label.replace(/&nbsp;/g, ""),
                    preId: item.preId,
                    select:false
                  });
                }
              })
            })
          }else{
            _this.reportperson2 = [{id:'-1',name:"全部",select:true}];
          }
        },

        addressfindtwo(){
          let _this = this;
          let id = _this.getSelectIdByList(_this.reportstate2);
          this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          if(id){
            findBuildingListByAreaId(id,'').then(function (response) {
              _this.$layer.closeAll('loading');
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                let data = response.data;
                data.forEach(item=>{
                  _this.reportstate3.push({
                    id:item.id,
                    name:item.name.replace(/&nbsp;/g, ""),
                    adress:item.adress ,
                    houseNumRule: item.houseNumRule,
                    seatNum: item.seatNum,
                    chooseHouse: item.chooseHouse,
                    chooseHouseNum: item.chooseHouseNum,
                    propertyUse: item.propertyUse,
                    propertyType: item.propertyType,
                    locked: item.locked,
                    remark: item.remark,
                    houseNumException:item. houseNumException,
                    select:false,
                  });
                })
                
              } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message + "！");
              }
            })
          }else{
            _this.reportstate3 = [{id:'-1',name:"全部",select:true}];
          }
        },
        //qingkon
        clearForm(){
          this.form.timeEnd=""
          this.form.timeStart=""
          this.timetype="13"
          this.getQuickDate(13);
          this.form.word=""
          this.reportperson1 = this.backSlect(this.reportperson1);
          this.reportperson2 = this.backSlect(this.reportperson2);
          this.reportstate1 = this.backSlect(this.reportstate1);
          this.reportstate2 = this.backSlect(this.reportstate2);
          this.reportstate3 = this.backSlect(this.reportstate3);
          
        },
        
        rrDetil(val,ss,nn){
          let _this = this
          _this.listnum =val.index + 1
        },
        tableRowClassName ({row, rowIndex}) {
          // 把每一行的索引放进row
          row.index = rowIndex
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
       

        deletedReportClick(){
          let _this =  this;
          let select = this.multipleSelection.toString();
          debugger;
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
              _this.addNewBuildingBtn();
            })

          }else{
            this.myAlert("请选择要删除的报备记录！",'dangerous-icon');
          }
        },
        //删除数组中指定元素
        deletArrByValue(arr,id){
          return arr.filter(function(item){return item.id != id })
        },
       
        reloadListByStorage(){
          let storage=window.localStorage;
          let titleData = storage.getItem(this.sessionStr);
          let storageColumn = JSON.parse(titleData);
          let columnData = JSON.parse(JSON.stringify(this.columnData));
          let column = null;
          if(storageColumn){
            column = storageColumn.column;
            this.rowHeight = storageColumn.height*1;
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
            this.rowspan();
          }else{
            this.myAlert('请选择需要过滤的数据!','dangerous-icon');
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
        exportToExcel () {
          // excel数据导出
          require.ensure([], () => {
            const {
              // eslint-disable-next-line camelcase
              export_json_to_excel
            } = require('../../../assets/js/Export2Excel.js')
            let tHeader = [];
            this.columnData.forEach(item => {
              tHeader.push(item.label);
            });
            let filterVal = [];
            this.columnData.forEach(item => {
              filterVal.push(item.prop);
            });
            const list = this.tableData;
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '带看记录')
          })
        },
        formatJson (filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
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
          getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="报备修改 【 项目:"+_this.tableData[mycountnum].proname+'&nbsp;&nbsp;&nbsp;&nbsp;'+'客户:'+_this.tableData[mycountnum].cusname+"】";
          _this.$refs.singleTable.setCurrentRow(_this.tableData[mycountnum]);

          let  callbackdata = {rowid: _this.tableData[mycountnum].recordId,thisindex:mycountnum,};
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

          firstHouseBusinessCountLookList(form).then(function(res) {
            _this.$layer.closeAll("loading");
            if (res.status == 500) {
              return false;
            } else if (res.status == 0) {
              _this.tableData = res.data.data;
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
            this.getparamsfunc(form);
          }
        }else{
          this.getparamsfunc();
        }
      },
      watch: {
        $route: {
          handler() {
            let form=this.$route.query.form;
            if(form){
              form = JSON.parse(form);
              if(form.needFlag){
                this.getparamsfunc(form);
              }
            }else{
              this.getparamsfunc();
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
