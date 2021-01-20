<template>
  <div class="building-container mycontailerclass1">
    <div class="top-container " >
      <div class="search-container clear mycontailerclass2">
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

        <div class="item left padding-l-10 clear"  @click="showNewSchool" >
          <div class="border-icon clear" > 
            <div class="left"  >
              <i class="fa fa-plus add"></i>
            </div>
            <div class="left"  >
              <span class="search-word" >新增学校</span>
            </div>
          </div>  
        </div>

        <div class="item left clear padding-l-10" @click="showDeletedSchool"  >
          <div class="border-icon clear" > 
            <div class="left"  >
              <i class="fa fa-times delete"  ></i>
            </div>
            <div class="left"  >
              <span class="search-word" >删除学校</span>
            </div>
          </div>  

        </div>
        <div class="left padding-l-10"  >
          <i class="cut-icon"></i>
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
            <i class="back-icon user left" @click="tabRemove('/home/school')" ></i>
          </div>  
        </div>
      </div>
      <div class="search-container" >
        <el-form v-model="form" class="clear" >
          <div class="left word-d padding-r-2 mt">
            类型
          </div>
          <div class="item left mt" >
            <el-form-item prop="type" >
              <CheckSelectSpecial :selectId="typeIds" :listData="typeParams" style="width:70px;" ></CheckSelectSpecial>
            </el-form-item>
          </div>
          <div class="left word-d padding-r-2 mt">
            性质
          </div>
          <div class="left item mt" >
            <el-form-item prop="characterId" >
              <CheckSelectSpecial :selectId="characterIds" :listData="characterParams" style="width:70px;" ></CheckSelectSpecial>
            </el-form-item>
          </div>
          <div class="left word-d padding-r-2 mt">
            级别
          </div>
          <div class="left item mt" >
            <el-form-item prop="level">
              <CheckSelectSpecial :selectId="levelIds" :listData="levelParams" style="width:70px;" ></CheckSelectSpecial>
            </el-form-item>
          </div>
          <div class="item left padding-l-10 padding-r-2 mt" style="" >
            <el-form-item prop="level">
              <el-input
                title="学校名称"
                v-model="form.word"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="item left padding-r-2 mt" style="padding-top:2px;" >
            <div class="search-btn" @click="searchSchoolData" >查询</div>
          </div>
          <div class="item left padding-r-2 mt" style="padding-top:2px;"  @click="cleard">
            <div class="claerlys"  ></div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="building-content clear" >
      <div class="left-tree-content left" style="background:#eee;" >
        <el-tree style="background:#eee;" :data="treeData"
                 :props="defaultProps"
                 @node-click="handleNodeClick"
                 :current-node-key="currentNodekey"
                 :default-expanded-keys="expandedkeys"
                 accordion
                 default-expand-all
                 highlight-current
                 ref="selectTree"
                 :expand-on-click-node="false"
                 node-key="id"
        >
        </el-tree>
      </div>
      <div class="list-container  list-content left"  >
        <div class="list-table" id="schoolList" >
          <el-table
            :data="tableData"
            empty-text=" "
            border
            height="100%"
            highlight-current-row
            @selection-change="handleSelectionChange"
            @row-click="getRowDataByClick"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              type="selection"
              width="30"
              ref="multipleTable">

            </el-table-column>
            <el-table-column
              prop="name"
              label="学校名称"
              sortable
              :show-overflow-tooltip="true"
              align="center"
              width="150">
              <template slot-scope="scope">
                <div style="color:#336699;text-algin:center;cursor:pointer;" @click="showEditorSchool(scope.$index, scope.row)" >
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="类型"
              align="center"
              sortable="true"
              width="80">
            </el-table-column>
            <el-table-column
              prop="levelName"
              label="级别"
              align="center"
              sortable="true"
              width="80">
            </el-table-column>
            <el-table-column
              prop="characterName"
              label="性质"
              sortable="true"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="villageNum"
              label="楼盘数"
              sortable="true"
              align="center"
              width="100">
            </el-table-column>
          </el-table>
        </div>

      </div>

    </div>
    <div class="component-container" >
      <NewSchoolPage @reloadSchoolList="reloadSchoolList" :newSchoolValue="newSchool" ref="newSchoolPage" ></NewSchoolPage>
    </div>
    <!-- <div class="component-container" >
      <editorSchoolPage @reloadSchoolList="reloadSchoolList" :activeName="activeName" :editorSchoolValue="editorSchool" ref="editorSchoolPage" ></editorSchoolPage>
    </div> -->

  </div>
</template>

<script>
  //获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {edtiorSchool,buildingList,schoolList,deletedSchool,areList} from '../../../service/getData'
  import NewSchoolPage from './newSchool'
  import EditorSchoolPage from './editorSchool'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  export default {
    data() {
      return {
        buildingShowValue:false,
        buildingShowEdiotrValue:false,
        buildingMoveValue:false,
        buildingNumSettingValue:false,
        newSchool:false,
        editorSchool:false,
        loading:false,
        activeName:'school',
        currentNum:0,
        areaLevel:"",
        areaids:"",
        areaname:"",
        currentPage:"",
        checkArr:[],
        input: '', //输入框
        treeData:[],
        tableData:[],
        typeParams:[],
        characterParams:[],
        levelParams:[],
        multipleSelection:[],//全
        typeIds:"typeIds",
        characterIds:"characterIds",
        levelIds:"levelIds",
        form:{
          type:'',
          characterId:'',
          levelParams:'',
          level:'',
          word:'',
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentNodekey: "", //默认选中的节点树
        expandedkeys: [], //默认展开的节点树
      };
    },
    components:{
      NewSchoolPage,
      EditorSchoolPage,
      areList,
      CheckSelectSpecial
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
      handleCheck(index, row,value){
        let _this = this;
        let id =row.id;

      },

      //点击显示新增学校
      showNewSchool(){
        var _this =  this;
        let id = this.areaids;
        let name = this.areaname;
        let level = this.areaLevel;
        if(id){
          _this.$refs['newSchoolPage'].newSchool(id,level);
        }else{
          this.myAlert("请选择区县")
        }

      },
      //删除
      showDeletedSchool(){
        let _this = this;
        let id = '';
        let deleted = 1;
        let multipleSelection = _this.multipleSelection;
        if(multipleSelection.length != 0){
          _this.myConfirm("是否将该学校从学校字典中删除？","question-icon",'是','否').then(res => {
            _this.saveData();
          }).catch(err => {

          })
        }else{
          _this.myAlert("请选择学校名称")
        }
      },

      saveData(){
        let _this = this;
        let id = '';
        let deleted = 1;
        let multipleSelection = _this.multipleSelection;

        id = multipleSelection.toString();
        deletedSchool(id,deleted).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            _this.myAlert("删除成功！",'success-icon').then(res => {
              let tableData = _this.tableData;
              for(let i = 0 ; i < multipleSelection.length != 0 ; i++){
                tableData = _this.deletArrByValue(tableData,multipleSelection[i]);
              }

              _this.tableData = tableData;
              _this.multipleSelection = [];
              _this.currentNum = 0;
            }).catch(err => {

            })
          }
        })
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex;
      },
      getRowDataByClick (row, column, event) {
        this.currentNum = row.index + 1;
        this.currentPage = row;
      },
      //点击显示编辑学校
      showEditorSchool(index, row){

        let _this = this
        let layerId = this.$layer.iframe({
          content: {
            content: EditorSchoolPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{myid:row.id,myname:row.name,activeName:'school'}//props
          },
          type:2,
          area:['500px','350px'],
          title: '学校字典 【'+row.name+'】',
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891111,
          cancel:()=>{//关闭事件

          }
        });
      },

      //查询
      searchSchoolData(){
        let _this = this;
        var areaId = this.areaids;
        let type = this.getSelectIdByList(this.typeParams);
        let character = this.getSelectIdByList(this.characterParams);
        let level = this.getSelectIdByList(this.levelParams);
        let word = this.form.word;
        if(!word){
          word = "";
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        schoolList(character,level,type,word,areaId).then(function(response){
          _this.$layer.closeAll("loading");
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            _this.currentNum = 0;
            _this.tableData = response.data;
          }
        })
      },
      reloadSchoolList(){
        this.searchSchoolData();
      },
      //清空
      cleard(){
        this.typeParams = this.backSlect(this.typeParams);
        this.characterParams = this.backSlect(this.characterParams);
        this.levelParams = this.backSlect(this.levelParams);
        this.form.word="";
      },
      handleNodeClick(data) {
        let _this = this;
        //加载动画
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let type = this.getSelectIdByList(this.typeParams);
        let character = this.getSelectIdByList(this.characterParams);
        let level = this.getSelectIdByList(this.levelParams);
        let areaId = data.id;
        this.areaids=data.id;
        this.areaname=data.label;
        this.areaLevel = data.level;
        let word = this.word;
        if(!word){
          word = "";
        }
        schoolList(character,level,type,word,areaId).then(function(response){
          _this.$layer.closeAll("loading");
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            //添加左侧树状图
            _this.tableData = response.data;
          }
        })


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
      //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
      },
      formatter(row, column) {
        return row.address;
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
    mounted(){
      let _this = this;
      edtiorSchool(1).then(function(response){
        if(response.status == 500){
          return false;
        }else if(response.status == 0) {
          let params = response.data.params;
          _this.towns = params.towns;
          _this.typeParams = [{id:'-1',name:'全部',select:true,}].concat(params.typeParams);
          _this.characterParams = [{id:'-1',name:'全部',select:true,}].concat(params.characterParams);
          _this.levelParams = [{id:'-1',name:'全部',select:true,}].concat(params.levelParams);
        }
      })
      areList().then(function(response){
        if(response.status == 500){
          return false;
        }else if(response.status == 0) {
          //添加左侧树状图
          _this.treeData = response.data;
        }
      })
    },
  };
</script>

<style lang="scss" scoped>
  .mt{
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .building-container {
    height:100%;
    .top-container {

      .word-d{
        line-height: 27px;
        margin-left: 10px;
        font-size:12px;
      }
      .padding-r-2{
        padding-right:2px;
      }
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
          line-height:20px;
          font-size:12px;
          padding-left:2px;
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



        .up-icon{
          background:url(../../../images/system/shangla.png) -15px -15px;
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
        .claerlys{
          background:url(../../../images/system/qingkong.png) -13px -13px;
          width:26px;
          height:22px;
          display:inline-block;
        }
        .up-down{
          font-size:18px;
          margin-top:1px;
          color:#336699;
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
        .search-btn{
          border:1px solid #797979;
          border-radius:5px;
          background:#E4E4E4;
          padding:0px 10px;
          line-height:18px;
          margin-top:2px;
          font-size:12px;
        }
      }
    }
    .building-content{
      width: calc(100% - 20px);
      margin: 5px auto 0px;
      height:calc(100% - 115px);
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
        /deep/ .el-tree-node__label {
          font-size: 12px;
        }

      }
      .list-container{
        width:calc(100% - 160px);
        height:100%;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
        .list-table{
          height:100%;
        }
      }
    }
  }
  .border-black{
    border-radius:5px;
  }

  .border-white{
    border:1px solid #fff;
    border-radius:5px;
  }
</style>
