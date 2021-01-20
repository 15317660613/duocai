<template>
  <div class="building-container mycontailerclass1">

    <div class="top-container ">
      <div class="search-container mycontailerclass2" >
        <div class="item left padding-l-10" @click="unFoldAll" >
          <div class="left border-icon">
          <i class="down-icon up-down"></i>
          </div>
        </div>

        <div class="item left padding-l-10" @click="collapseAll" >
          <div class="left border-icon">
          <i class="up-icon up-down"></i>
          </div>
        </div>
        <div class="left padding-l-10"  >
          <i class="cut-icon"></i>
        </div>
        <div class="item left padding-l-10 clear"  @click="showNewBuilding" >
          <div class="border-icon clear" > 
            <div class="left"  >
              <i class="fa fa-plus add"></i>
            </div>
            <div class="left"  >
              <span class="search-word" >新增楼盘</span>
            </div>
          </div>  
        </div>

        <div class="item left clear padding-l-10" @click="showDeletedBuilding"  >
          <div class="border-icon clear" > 
            <div class="left"  >
              <i class="fa fa-times delete"  ></i>
            </div>
            <div class="left"  >
              <span class="search-word" >删除楼盘</span>
            </div>
          </div>
        </div>
        <div class="left padding-l-10"  >
          <i class="cut-icon"></i>
        </div>
        <div class="item left clear padding-l-10" @click="findRepeatBuildingList"  >
          <div class="border-icon clear" > 
            <i class="search-icon other left"></i>
            <span class="search-word" >查重</span>
          </div>  
        </div>
        <div class="item left clear padding-l-10" @click="showMoveBuilding" >
          <div class="border-icon clear" > 
            <i class="move-icon other left"  ></i>
            <span class="search-word" >楼盘调动</span>
          </div>  
        </div>
        <div class="item left clear padding-l-10" @click="showMergeBuilding" >
          <div class="border-icon clear" > 
            <i class="merge-icon other left"></i>
            <span class="search-word" >合并</span>
          </div>  
        </div>
        <div class="item left clear padding-l-10" @click="showBuildingNumSetting" >
          <div class="border-icon clear" > 
            <i class="rule-icon other left"></i>
            <span class="search-word" >规则</span>
          </div>  
        </div>
        <div class="left padding-l-10"  >
          <i class="cut-icon"></i>
        </div>
        <div class="item left clear padding-l-10" @click="jumpSchool"  >
          <div class="border-icon clear" > 
            <i class="school-icon other left"></i>
            <span class="search-word" >学校</span>
          </div>  
        </div>
        <div class="item left clear padding-l-10"  @click="isShowPropertyOwnerList" >
          <div class="border-icon clear" > 
            <i class="owner-icon other left"></i>
            <span class="search-word" >物业主</span>
          </div>  
        </div>
        <div class="left padding-l-10"  >
          <i class="cut-icon"></i>
        </div>
        <div class="item left padding-l-10"  @click="exportToExcel"  >
          <div class="border-icon clear" > 
            <i class="leading-out-icon other" title="导出"></i>
          </div>  
        </div>
        <div class="item left padding-l-10" >
          <div class="record-num" >
            <span class="search-word" ><</span>
            <span class="search-word" >{{currentNum}}</span>
            <span class="search-word" >/</span>
            <span class="search-word" >{{tableData.length}}</span>
            <span class="search-word" >></span>
          </div>
        </div>
        <div class="item left clear padding-l-10" >
          <div class="border-icon clear" > 
            <i class="back-icon user left" @click="tabRemove('/home/building')" ></i>
          </div>  
        </div>
        <div class="item left padding-l-10" >

          <el-input
            v-model="word"
            title="楼盘名称"
          >
          </el-input>
        </div>
        <div class="item left padding-l-10" @click="searchData" >
          <div class="search-btn" >查询</div>
        </div>
        <div class="left padding-l-2" style="padding-left:2px;" >
          <i class="claerlys" @click="clearForm" ></i>
        </div>
      </div>
    </div>
    <div class="building-content clear" >
      <div class="left-tree-content left" style="background:#eee;" >
        <el-tree style="background:#eee;" :data="treeData"
                 :props="defaultProps"
                 @node-click="handleNodeClick"
                 default-expand-all
                 highlight-current
                 ref="selectTree"
                 :expand-on-click-node="false"
                 node-key="id"
        >
        </el-tree>
      </div>
      <div class="right-list-content left" >
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          height="100%"
          highlight-current-row
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          ref="singleTable"
        >
          <el-table-column
            width="35"
            label="*"
          >
            <template slot-scope="scope">
              <div style="color:#336699;text-algin:center;cursor:pointer;">
                <span class="locked-icon" v-if="scope.row.locked == 1" >

                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="楼盘字典"
            width="190"
            align="left"
            :show-overflow-tooltip="true"
            sortable="true"
          >
            <template slot-scope="scope">
              <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="showEditorBuilding(scope.$index, scope.row)" >
                <span style="font-weight:700" >{{scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="adress"
            label="详细地址"
            width="210"
            align="left"
            sortable="true"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="houseNumRule"
            label="房规"
            width="60"
            sortable="true"
            align="center"
          >

          </el-table-column>
          <el-table-column
            prop="seatNum"
            label="栋数"
            width="60"
            sortable="true"
            align="center"
          >
          </el-table-column>


          <el-table-column
            prop="chooseHouse"
            label="选栋"
            width="50"

            align="center"
          >
            <template slot-scope="scope">
              <div  >
                <input disabled="true" type="checkbox" :checked="scope.row.chooseHouse?true:false"  />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="chooseHouseNum"
            label="选房"
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              <div  >
                <input disabled="true" type="checkbox" :checked="scope.row.chooseHouseNum?true:false" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="propertyUse"
            label="用途"
            width="90"
            sortable="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="propertyType"
            label="类型"
            width="90"
            sortable="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="180"
            sortable="true"
            align="left"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
   
    <div class="component-container" >
      <MoveBuildingPage :buildingMove="buildingMoveValue" ref="moveBuilding" ></MoveBuildingPage>
    </div>
    <div class="component-container" >
      <MergeBuildingPage :buildingShowMerge="buildingShowMergeValue"  ref="mergeBuilding" ></MergeBuildingPage>
    </div>
    <div class="component-container" >
      <BuildingNumSettingPage :buildingNumSettingShow="buildingNumSettingValue" ref="buildingNumSetting" ></BuildingNumSettingPage>
    </div>
    <div class="component-container" >
      <MoveBuildingPage :buildingMove="buildingMoveValue" ref="moveBuilding" ></MoveBuildingPage>
    </div>
    <div class="component-container" >
      <NewSchoolPage :schoolNewShow="newSchoolValue" ref="newBuildingSchool" ></NewSchoolPage>
    </div>

    <div class="component-container" >
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleAreaDangerous"
        width="350px"
      >
        <div>
          <div class="pop-up" style="padding-bottom:5px;">
            <div class="pop-up-container" style="height:112px;line-height:50px;padding-left:30px;" >
              请选择地域
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="right" type="primary" @click="dialogVisibleAreaDangerous = false">确 定</el-button>

              </span>
          </div>
        </div>

      </el-dialog>
    </div>
  </div>
</template>

<script>
  //获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

  import {buildingList, findRepeatBuilding,deletedBuilding, findBuildingListByAreaId} from '../../../service/getData'
  // 新增楼盘字段
  import NewBuildingPage from './newBuilding'
  // 编辑楼盘字段
  import EditorBuildingPage from './editorBuilding'
  // 合并楼盘字段
  import MergeBuildingPage from './mergeBuilding'
  // 楼盘字典调动
  import MoveBuildingPage from './moveBuilding'
  // 批量设置房号
  import BuildingNumSettingPage from './buildingNumSetting'
  // 学校
  import NewSchoolPage from './newBuildingSchool'
  // 物业主列表
  import PropertyOwnerListPage from './propertyOwnerList'

  export default {
    data () {
      return {
        dialogVisibleDangerous: false,
        dialogVisibleAreaDangerous: false,
        buildingShowValue: false,
        buildingShowMergeValue: false,
        buildingShowEdiotrValue: false,
        buildingMoveValue: false,
        buildingNumSettingValue: false,
        newSchoolValue: false,
        dialogPropertyOwnerList: false,
        dialogVisibleDeleted: false,
        treePage:'',
        multipleSelection: [],
        clickColumnId: 0,
        clickLevel:0,
        clickColumnName: '',
        clickStreet: 0,
        getStreetId:'',
        clickStreetName: '',
        currentPage:'',
        loading: false,
        listNum: 0,
        currentNum: 0,
        word: '', // 输入框
        tableData: [],
        treeData: [],
        boxMessage: {
          boxWidth: 280,
          boxHeight: 150,
          title: '',
          icon: 'dangerous-icon',
          message: '请选择要删除的楼盘字典',
          dialogVisible: false,
          clickSaveCallback: 'clickSaveCallback'
        },
        boxMessage1: {
          boxWidth: 320,
          boxHeight: 150,
          title: '',
          icon: 'question-special-icon',
          message: '确定要将选定楼盘字典放入回收站吗？',
          dialogVisible: false,
          clickSaveCallback: 'clickSaveCallbackRemark'
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
      }
    },
    components: {
      NewBuildingPage,
      EditorBuildingPage,
      MoveBuildingPage,
      MergeBuildingPage,
      BuildingNumSettingPage,
      NewSchoolPage,
      PropertyOwnerListPage
    },
    methods: {
      //  全部展开
      unFoldAll () {
        let self = this
        // 将没有转换成树的原数据
        let treeList = this.treeData
        for (let i = 0; i < treeList.length; i++) {
          // 将没有转换成树的原数据设置key为... 的展开
          self.$refs.selectTree.store.nodesMap[treeList[i].id].expanded = true
        }
      },
      //  全部折叠
      collapseAll () {
        let self = this
        let treeList = this.treeData
        for (let i = 0; i < treeList.length; i++) {
          self.$refs.selectTree.store.nodesMap[treeList[i].id].expanded = false
        }
      },

      // 点击显示新增楼盘
      showNewBuilding () {
        let _this = this;
        if(_this.clickLevel){
          if (_this.clickStreet != 0 ) {
            let id = '';
            let getStreetId = _this.getStreetId;
            let clickLevel = _this.clickLevel;
            let layerId = this.$layer.iframe({
              content: {
                content: NewBuildingPage, //传递的组件对象
                parent: this,//当前的vue对象
                data:{
                  level:clickLevel,
                  streetId:getStreetId,
                  townId:_this.clickStreet,
                }//props
              },
              type:2,
              area:['600px','658px'],
              title: '新增楼盘',
              shadeClose: false,
              shade: true,//是否显示遮罩
              zIndex:19891111,
              cancel:()=>{//关闭事件
                
              }
            });
            let getLayerId = document.getElementById(layerId);
            let mygetLayerId = document.getElementById(layerId).getAttribute('id');
            document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
            document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
            let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
            _this.$store.commit('set_active_layerifranme',layerifranmedata);
            
          } else {
            _this.myAlert("请选择【区县】或【街镇】");
          }
        }else{
          _this.myAlert("请选择【区县】或【街镇】");
        }

      },
      addNewBuildingInPage(type,id,name){
        this.searchData();

        if(type == 1) {
          this.showNewBuilding();
        }else if(type == 2){
          let _this = this;
          let index = 0;
          let layerId = this.$layer.iframe({
            content: {
              content: EditorBuildingPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{areaVillageId:id,areaVillage:name,thistrue:false,tabactive:'pedestal',currentIndex:index}//props
            },
            type:2,
            area:['600px','680px'],
            title: '楼盘修改 【'+name+'】',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
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
          
        }
      },
      // 删除楼盘
      showDeletedBuilding (row, column, cell, event) {
        let _this = this
        let id = _this.clickColumnId
        let deleted = 0
        if (id) {
          _this.myConfirm("确定要将楼盘字典放入回收站吗？","question-icon",'是','否').then(res => {
            _this.clickSaveCallbackRemark();
          }).catch(err => {

          })
        } else {
          _this.myAlert("请选择要删除的楼盘字典！");
        }
      },
      clickSaveCallbackRemark () {
        let _this = this;
        let id = _this.clickColumnId;
        let deleted = 1;
        deletedBuilding(id, deleted).then(function (response) {

          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("删除成功",'success-icon').then(res => {
              let temp = _this.tableData.concat();
              temp = _this.deletArrByValue(temp, id);
              _this.tableData = temp;
              // 行索引更新
              _this.currentNum = 0;
            }).catch(err => {

            })


          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      clickSaveCallback () {
        this.boxMessage.dialogVisible = false;
      },
      // 点击显示编辑楼盘
      showEditorBuilding (index, row) {
        let _this = this
        let name = row.name
        _this.currentPage = row;
        let layerId = this.$layer.iframe({
          content: {
            content: EditorBuildingPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{areaVillageId:row.id,areaVillage:name,thistrue:false,tabactive:'building',currentIndex:index}//props
          },
          type:2,
          area:['600px','680px'],
          title: '楼盘修改 【'+name+'】',
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891111,
          cancel:()=>{//关闭事件
            this.currentPage = '';
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

      // 点击楼盘调动
      showMoveBuilding () {
        let _this = this
        let clickColumnId = _this.clickColumnId
        let clickColumnName = _this.clickColumnName
        let clickStreet = _this.clickStreet
        let clickStreetName = _this.clickStreetName
        if (clickColumnId && clickStreet) {
          _this.$refs['moveBuilding'].moveBuilding({clickColumnId, clickColumnName, clickStreet, clickStreetName})
        } else {
          this.myAlert("请选择楼盘！",'dangerous-icon');
        }
      },
      showMergeBuilding () {
        debugger;
        let _this = this;
        let clickColumnId = _this.clickColumnId;
        let clickStreet = _this.clickStreet;
        let currentPage = _this.currentPage;
        if (clickColumnId && clickStreet) {
          _this.$refs['mergeBuilding'].newMergeBuilding(clickColumnId);
        } else {
          this.myAlert("请选择楼盘！",'dangerous-icon');
        }

      },
      // 新增学校
      showNewSchool () {
        let _this = this
        _this.$refs['newBuildingSchool'].newSchool()
      },

      //重复楼盘
      findRepeatBuildingList(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        findRepeatBuilding().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            if(data.length != 0) {
              _this.tableData = response.data;
            }else {
              _this.myAlert("在当前楼盘字典中未找到重盘!",'dangerous-icon','my-message','请确定是否以【楼盘字典】列进行排序');
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      // 规则页面
      showBuildingNumSetting () {
        let _this = this;
        _this.$refs['buildingNumSetting'].isShowBuildingNumSetting();
      },
      jumpSchool(){
        this.$router.push({path:'/home/school'});
      },
      // 物业主列表
      isShowPropertyOwnerList () {
        let _this = this
        // _this.$refs['showPropertyOwnerList'].showPropertyOwnerList(true,1)
        let layerId = _this.$layer.iframe({
          content: {
            content: PropertyOwnerListPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['600px','450px'],
          title: "操作单项工资",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891113,
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
      handleClose () {

      },
      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          const tHeader = ['楼盘字典', '详细地址', '房规', '栋数', '选栋', '选房', '用途', '类型', '备注']
          const filterVal = ['name', 'adress', 'houseNumRule', 'seatNum', 'chooseHouse', 'chooseHouseNum', 'propertyUse', 'propertyType', 'remark']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '楼盘字典')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      searchData () {
        let _this = this
        _this.currentNum = 0
        let id = "";
        if(this.treePage){
          id = this.treePage.id;
        }
        let word = _this.word;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        findBuildingListByAreaId(id, word).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            _this.dialogVisibleDangerous = true;
            return false;
          }
          _this.tableData = response.data;
          _this.listNum = response.data.length;

        })
      },
      clearForm(){
        this.word = "";
      },
      reloadList(){
        this.searchData();
      },
      handleNodeClick (data) {
        var _this = this;
        let id = data.id;
        let level = data.level;
        let preId = data.preId;
        let name = data.label;
        _this.treePage = data;
        _this.clickLevel = level;

        if (level == 4) {
          // 修改 clickStreet
          _this.clickStreet = preId;
          _this.getStreetId = id;
          _this.clickStreetName = name
          let word = ''
          this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          findBuildingListByAreaId(id, word).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              _this.dialogVisibleDangerous = true
              return false
            }
            _this.tableData = response.data
            _this.listNum = response.data.length

          })
        } else if (level == 3) {
          // 修改 clickStree
          _this.clickStreet = id
          _this.clickStreetName = name
          let word = ''
          this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          findBuildingListByAreaId(id, word).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              _this.dialogVisibleDangerous = true
              return false
            }
            _this.tableData = response.data
            _this.listNum = response.data.length

          })
        } else {
          _this.clickStreet = 0
          _this.clickStreetName = ''
          _this.tableData = []

        }
      },

      handleSelectionChange (elemCheckbox) {
        let _this = this
        // 获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id)
        })
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection))
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      getRowDataByClick (row, column, event) {
        let _this = this
        _this.clickColumnId = row.id
        _this.clickColumnName = row.name
        _this.currentNum = row.index + 1;
      debugger;
        this.currentPage = row;
      },

      // 删除数组中指定元素
      deletArrByValue (arr, id) {
        return arr.filter(function (item) { return item.id != id })
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
      changeTitle(ids,count,needlayerid){
        let _this = this;
        let currentData = _this.tableData;
        _this.currentPage = currentData[count];
        
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="房源信息 【"+_this.currentPage.name+"】";
        _this.$refs.singleTable.setCurrentRow(_this.currentPage);
       
        let  callbackdata = {areaVillageId:_this.currentPage.id,areaVillage:_this.currentPage.name,thistrue:false,tabactive:'building',currentIndex:count}
        return callbackdata;
      },
    },
    filters: {
      ellipsis(value) {
        if (!value) return "";
        if (value.length > 15) {
          return value.slice(0, 15) + "...";
        }
        return value;
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
    mounted () {
      let _this = this
      buildingList().then(function (response) {
        if (response.status == 500) {
          _this.dialogVisibleDangerous = true
          return false
        }
        // 添加左侧树状图
        _this.treeData = response.data
      })
    }
  }
</script>

<style lang="scss" scoped>
   .mt{
     margin-top: 5px;
     margin-bottom: 5px;
   }
  .building-container {
    height:100%;
    .top-container {
      width: 100%;
      margin: 0px auto 0px;
      .search-container {
        width: calc(100% - 20px);
        margin: 10px auto 0;
        height: 30px;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        background:#DCD9D3;
        .padding-l-10{
          padding-left:10px;
        }
        .cut-icon {
          background: url(../../../images/system/fenge.png) -100px -90px;
          width: 3px;
          height: 23px;
          display: block;
        }
        .item{
          line-height:20px;
          cursor:pointer;
          .search-word{
            line-height:23px;
            font-size:12px;
            display:inline-block;
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
          .rule-icon{
            margin-top:2px;
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
          .back-icon{
            background:url(../../../images/system/tuichu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .up-down{
            font-size:18px;
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
            font-size:12px;
          }
          .other{
            margin-top:2px;
            font-size: 18px;
            color: #AB5F39;
          }
          .user{
            margin-top:2px;
            font-size: 18px;
            color: #767575;
          }
          .cut{
            font-size: 23px;
            color: #C9C9C9;
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
        }
      }
    }
    .building-content{
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
        width:calc(100% - 160px);
        height:100%;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
        .locked-icon{
          background:url(../../../images/system/fengpan.png) -15px -15px;
          width:20px;
          height:20px;
          display:inline-block;
        }
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
  //树状图样式
  /deep/ .el-tree-node__label {
    font-size: 12px;
  }
</style>
