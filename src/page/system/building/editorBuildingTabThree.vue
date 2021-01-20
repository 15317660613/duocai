<template>
  <div class="" >
    <div class="pop-up" style="height: 562px;">
        <div class="pop-up-container clear" >
          <div class="left list-container list-content" >
            <div class="list-table school-table" id="editorSchoolList" >
              <el-table
                :data="tableData"
                height="540"
                border
                highlight-current-row
                v-loading="loading"
                @row-click="getRowDataByClick"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="30"
                  ref="multipleTable"
                >
                </el-table-column>
                <el-table-column
                  prop="townName"
                  label="城区"
                  :show-overflow-tooltip="true"
                  sortable="true"
                  align="center"
                  width="65">
                </el-table-column>

                <el-table-column
                  prop="schoolName"
                  label="学校名"
                  width="130"
                  :show-overflow-tooltip="true"
                  sortable="true"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                      {{ scope.row.schoolName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="typeName"
                  label="类型"
                  width="90"
                  :show-overflow-tooltip="true"
                  sortable="true"
                  align="center"
                >

                </el-table-column>
                <el-table-column
                  prop="levelName"
                  label="级别"
                  width="70"
                  :show-overflow-tooltip="true"
                  sortable="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="distanceName"
                  label="距离"
                  width="60"
                  :show-overflow-tooltip="true"
                  sortable="true"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="left search-container" >

            <div class="item-earch-btn" @click="jumpSchool"  >
              学校管理
            </div>
            <div class="item-earch-btn" @click="clickEditorSchool" >
              学校介绍
            </div>
            <div class="item-earch-btn" @click="showNewSchool" >
              加入学校
            </div>
            <div class="item-earch-btn" @click="deletedPropertyOwner" >
              删除学校
            </div>
            <div class="item-earch-btn" @click="reloadSchoolList"  >
              刷新
            </div>
          </div>
        </div>

      </div>
    <div slot="footer" class="dialog-footer clear">

      <div class="right clear" >

        <span class="save-cancel-btn right " style="margin-right:0px;"  @click="closeEditorBuilding">取 消</span>
        <span class="save-cancel-btn right" type="primary" @click="saveBuildingData">保 存</span>
        <div class="right" style="border:1px solid #666;padding:1px 0px 1px 1px;margin-right:10px;" >
          <i class="file-icon" @click="isShowPhotoAndFile"  ></i>
        </div>
      </div>
    </div>
    <div>
      <NewSchoolPage @reloadSchoolList="reloadSchoolList" :newSchoolValue="newSchool" ref="showNewSchool"></NewSchoolPage>
    </div>
    <div>
      <EditorSchoolPage :editorSchoolValue="editorSchool" ref="showEditorSchool"></EditorSchoolPage>
    </div>

    <div class="component-container" >
      <EditorSchoolDetailPage @reloadSchoolList="reloadSchoolList" :activeName="activeName" :editorSchoolValue="editorSchoolList" ref="schoolEditorFromSchool" ></EditorSchoolDetailPage>
    </div>
  </div>
</template>

<script>
  import {findSchoolByBuildingId,deletedNearbySchool}  from '../../../service/getData'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import NewSchoolPage from './newSchool'
  import EditorSchoolPage from './editorSchool'
  import EditorSchoolDetailPage from './editorSpecialSchool'
  export default {
    props:["propertyOwnerList"],
    data() {
      return {
        dialogPropertyOwnerList:this.propertyOwnerList,
        dialogDeleteSchool:false,
        buildingId:'',
        buildingName:'',
        newSchool:false,
        editorSchool:false,
        editorSchoolList:false,
        loading:false,
        activeName:'school',
        clickPage:'',
        multipleSelection:[],
        tableData:[],
        clickColumnId:'',
        word:"",
        formatter:"",
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '100px'
      };
    },
    components:{
      NewSchoolPage,
      EditorSchoolPage,
      EditorSchoolDetailPage
    },
    methods:{
      //查询
      searchSchoolList(id,shortName){
        let _this = this;
        _this.buildingName = shortName,
        _this.buildingId = id;
        let character = '';
        let level = '';
        let type = '';
        let word = '';
        _this.loading = true;
        findSchoolByBuildingId(id).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            _this.tableData = response.data.schools;
          }
          _this.loading = false;
        })
      },
      reloadSchoolList(){
        let _this = this;
        let id =  _this.buildingId;
        _this.loading = true;
        findSchoolByBuildingId(id).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            _this.tableData = response.data.schools;
            _this.$emit("setSchoolNum",_this.tableData.length);
          }
          _this.loading = false;
        })
      },
      jumpSchool(){
        this.$router.push({path:'/home/school'});
      },
      //新增学校
      showNewSchool(){
        let _this = this;
        let form = {
          id:_this.buildingId,
          buildingName:_this.buildingName,
        }
        let type = '楼盘';
        _this.$refs['showNewSchool'].newSchool(form,type,1);
      },
      handleEdit(index, row) {
        let _this = this;
        let id = row.id;
        let form = {
          id:_this.buildingId,
          buildingName:_this.buildingName,
        }
        let type = '楼盘';
        _this.$refs['showEditorSchool'].editorSchool(id,form,type);

      },
      //编辑学校
      clickEditorSchool(){
        let _this = this;
        let clickPage = _this.clickPage;
        debugger;
        if(clickPage) {
          let id = clickPage.schoolId;
          let name = clickPage.schoolName;
          _this.$refs['schoolEditorFromSchool'].editorSchool(id, name,'school');
        }else{
          _this.myAlert("请选择学校","dangerous-icon")
        }

      },

      getRowDataByClick(row){
        let _this = this;
        _this.clickColumnId = row.id;
        _this.clickPage = row;
      },
      //删除学校
      deletedPropertyOwner(){
        let _this = this;
        let ids = _this.multipleSelection;
        if(ids.length != 0){
          _this.myConfirm("警告：【附近学校】删除后将不能还原！", 'question-icon','是','否','确定要永久删除选定的【附近学校】吗？','my-message').then(res => {

            _this.remarkConfirm();
          }).catch(err => {

          })
        }else{
          this.myAlert('请选择要删除的学校','dangerous-icon');
        }
      },
      remarkConfirm(){
        let _this = this;
        let deleted = 1;
        let ids = _this.multipleSelection.toString();
        deletedNearbySchool(ids,deleted).then(function (response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            _this.saveDataSuccess();
          }else if(response.status == 1){
            let msg = response.msg;
            this.myAlert(msg,'dangerous-icon');
          }
        })
      },
      saveDataSuccess(){
        let _this =  this;
        _this.myAlert("学校删除成功",'success-icon').then(res => {
          _this.loading = true;
          let id = _this.multipleSelection;
          let temp = _this.tableData.concat();
          for(let i = 0 , len = id.length; i < len ; i++ ){
            temp = _this.deletArrByValue(temp,id[i]);
          }
          _this.tableData = temp;
          _this.$emit("setSchoolNum",_this.tableData.length);
          _this.loading = false;
        }).catch(err => {

        })

      },
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },

      showPropertyOwnerList() {
        let _this = this;
        _this.dialogPropertyOwnerList = true;
        _this.loading = true;
        let word = _this.word;
        if(word == null){
          word = "";
        }
        pedestalList(word).then(function (response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let data = response.data;
            if(data && data.length != 0){
              _this.tableData = data;
            }else{
              _this.tableData = [];
            }
          }else{

          }
          _this.loading = false;
        })
      },
      //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
      },
      closeEditorBuilding(){
        let _this = this;
        _this.$emit("closeBuilding");
      },
      saveBuildingData(){
        let _this = this;
        _this.$emit("saveBuilding");
      },
      isShowPhotoAndFile(){
         debugger;
         this.$emit("isShowPhotoAndFile");
      },
    },
    watch: {
      '$route'(to) {
        let flag = false;
        let meta = to.meta;
        for (let option of this.options ) {
          if (option.name === to.name) {
            flag = true;
            this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
            break
          }
        }
        if (!flag) {
          this.$store.commit('add_tabs', {path: '/' + to.path.split('/')[1], meta:meta,name:to.name});
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .el-tab-pane {
    .pop-up {
      padding: 0;
      .pop-up-container {
        border: 0px;
      }
    }
  }
  .school-table{

  }
  .file-icon{
    background:url(../../../images/icon.png) -336px -97px;
    width:25px;
    height:18px;
    display:block;
    cursor:pointer;
  }
  .list-container{
    height:545px;
    background:#C0C0C0;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-radius:5px;
    margin:10px;
    border-radius:5px;
    .list-table{
      width:400px;
    }
  }
  .search-container{
    padding:5px;
    width:120px;
    border-width:0;
    .item-earch-btn{
      width:108px;
      padding:0 5px ;
      font-size:12px;
      border: 1px solid #797979;
      line-height: 21px;
      margin-top: 10px;
      text-align: center;
      border-radius: 3px;
      cursor:pointer;
    }
  }

</style>
