<template>
  <div class="" >
    <el-dialog v-dialogDrag  :title="'学校字典 【'+titlename+'】'" width="500px" :visible.sync="dialogEditorSchool" :append-to-body="true" >
      <div class="pop-up" >
        <el-tabs type="border-card" v-model="getActiveName" >
          <el-tab-pane label="学校详情" name="school" >
            <span slot="label">学校详情</span>
            <div class="" >
              <div class="pop-up-container" style="height:241px;" >
                <div class="move-content" >
                  <el-form ref="formsData" :model="form">
                    <div class="clear" >
                      <div class="left" style="padding-left:10px" >
                        <span class="require-word input-l-word" >学校名称</span>
                      </div>
                      <div class="left" >
                        <el-form-item prop="name">
                          <el-input v-model="form.name" maxlength="20" title="最多20个字" autocomplete="off" style="width:290px" ></el-input>
                        </el-form-item>
                      </div>

                    </div>
                    <div class="clear" >
                      <div class="left" >
                        <el-form-item prop="areaId" label="学校地址"  label-width="68px">
                          <el-select v-model="form.areaId"      style="width:70px;" >
                            <el-option v-for="item in towns"  :label="item.label" :value="item.id" ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="left" >
                        <el-form-item prop="adress" >
                          <el-input v-model="form.adress" maxlength="80" title="最多80个字" autocomplete="off" style="width:220px" ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear" >
                      <div class="left" >
                        <el-form-item prop="type" label="学校类型"  label-width="68px">
                          <el-select v-model="form.type"      style="width:70px;" >
                            <el-option v-for="item in typeParams"  :label="item.name" :value="item.id" ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="left" >
                        <el-form-item prop="characterId" label="性质"  label-width="40px">
                          <el-select v-model="form.characterId"      style="width:70px;" >
                            <el-option v-for="item in characterParams"  :label="item.name" :value="item.id" ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="left" >
                        <el-form-item prop="level" label="级别"  label-width="40px">
                          <el-select v-model="form.level"      style="width:70px;" >
                            <el-option v-for="item in levelParams"  :label="item.name" :value="item.id" ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear" >
                      <div class="left" style="padding-top:5px;" >
                        <el-form-item label="学校介绍" label-width="68px"  prop="introduce">
                          <el-input
                            type="textarea"
                            title="最多1000个字"
                            maxLength="1000"
                            class=""
                            :rows="4"
                            style="width:290px;"
                            v-model="form.introduce">
                          </el-input>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form>
                </div>
              </div>
              <div slot="footer" class="dialog-footer clear">
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="dialogEditorSchool = false">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附近楼盘" name="building"  >
            <span slot="label">附近楼盘</span>
            <div class="" >
              <div class="pop-up-container clear" style="height: 241px;">
                <div class="left list-content list-container" >
                  <div class="list-table" id="editorSchoolList" >
                    <el-table
                      :data="tableData"
                      style="width: 100%"
                      height="100%"
                      border

                      highlight-current-row
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column
                        type="selection"
                        width="30"
                        ref="multipleTable">
                      </el-table-column>
                      <el-table-column
                        prop="townName"
                        label="城区"
                        width="73">
                      </el-table-column>

                      <el-table-column
                        prop="streetName"
                        label="片区"
                        width="73"
                        :show-overflow-tooltip="true"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="villageName"
                        label="附近楼盘"
                        width="100"
                        :show-overflow-tooltip="true"
                      >
                        <template slot-scope="scope">
                          <div style="color:#336699;text-algin:center;cursor:pointer;" @click="showEditorBuilding(scope.$index, scope.row)" >
                            {{ scope.row.villageName }}
                            </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="distanceName"
                        label="距离"
                        width="60"
                      >
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="left school-search-container" >

                  <div class="item-earch-btn" @click="showNewNearbySchool"  >
                    加入
                  </div>
                  <div class="item-earch-btn" @click="isDeletedNearbyBuilding" >
                    删除
                  </div>
                </div>
              </div>
              <div slot="footer" class="dialog-footer clear" style="width:100%;">
                <span class="right save-cancel-btn" @click="dialogEditorSchool = false">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

    </el-dialog>
    <div class="component-container" >
      <EditorBuildingPage  @reloadList="reloadSchoolList" :buildingShowEditor="buildingShowEdiotrValue"  ref="editorBuilding" ></EditorBuildingPage>
    </div>
    <div class="component-container" >
      <NewSchoolPage :newSchoolValue="newNearbySchool" ref="showNewSchool"></NewSchoolPage>
    </div>
    <div class="component-container" >
      <EditorSchoolPage :editorSchoolValue="editorNearbySchool" ref="showEditorSchool"></EditorSchoolPage>
    </div>

  </div>
</template>

<script>
  import {edtiorSchool,deletedNearbySchool,modifySchool} from '../../../service/getData'
  //附近学校组件
  import NewSchoolPage from './newSchool'
  import EditorSchoolPage from './editorSchool'
  // 编辑楼盘字段
  import EditorBuildingPage from './editorBuilding'
  export default {
    props:["editorSchoolValue",'activeName'],
    data() {
      return {
        dialogEditorSchool:this.editorSchoolValue,
        titlename:'',
        newNearbySchool:false,
        editorNearbySchool:false,
        buildingShowEdiotrValue:false,
        clickPage:'',
        getActiveName:this.activeName,
        towns:[],
        typeParams:[],
        characterParams:[],
        levelParams:[],
        tableData:[],
        multipleSelection:[],
        loading:false,
        form: {
          name:'',
          areaId:'',
          adress:'',
          type:'',
          characterId:'',
          level:'',
          introduce:'',
          deleted:0,
          createBy:'aaa',
        },

        formLabelWidth: '100px'
      };
    },
    components:{
      NewSchoolPage,
      EditorSchoolPage,
      EditorBuildingPage
    },
    methods:{
      editorSchool(id,name,activeName){
        this.dialogEditorSchool = true;
        this.getActiveName = activeName;
        this.titlename  = name;
        this.getEditorSchool(id,name);
      },
      reloadSchoolList(){
        let _this = this;
        let id = _this.schoolId;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        edtiorSchool(id).then(function(response){
          _this.$layer.closeAll("loading");
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            let params = response.data.params;
            _this.form = response.data.school;
            _this.towns = params.towns;
            _this.typeParams = params.typeParams;
            _this.characterParams = params.characterParams;
            _this.levelParams = params.levelParams;
            _this.tableData = response.data.villageList;
          }
        })
      },
      getEditorSchool(id,name){
        let _this = this;
        _this.schoolId = id;
        edtiorSchool(id).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            let params = response.data.params;
            _this.form = response.data.school;
            _this.towns = params.towns;
            _this.typeParams = params.typeParams;
            _this.characterParams = params.characterParams;
            _this.levelParams = params.levelParams;
            _this.tableData = response.data.villageList;
          }
        })
      },
      //新增学校
      showNewNearbySchool(){
        let _this = this;
        let form = _this.form;
        let type = '学校';
        _this.$refs['showNewSchool'].newSchool(form,type);
      },

      //编辑学校
      showEditorBuilding(index, row){
        let _this =  this;
        let id = row.villageId;
        let villageName = row.villageName;

        _this.$refs['editorBuilding'].isShowEditorBuilding(id, villageName);
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
      isDeletedNearbyBuilding(){
        let _this = this;
        let id = _this.multipleSelection;
        if(id.length != 0){
          _this.myConfirm("警告：附近楼盘删除后不能还原！","question-icon",'是','否','确定要永久删除选定的附近楼盘吗？').then(res => {
            _this.deletedNearbyBuilding();
          }).catch(err => {

          })
        }else{
          this.myAlert("请选择楼盘！",'dangerous-icon');
        }

      },
      deletedNearbyBuilding(){
        let _this = this;
        let id = _this.multipleSelection.toString();
        let deleted = 1;
        deletedNearbySchool(id,deleted).then(function(response){
          if(response.status == 500){
            return false;
          }else{
            _this.myAlert("删除成功！",'dangerous-icon').then(res => {
              let id = _this.multipleSelection;
              let temp = _this.tableData.concat();
              for(let i = 0 , len = id.length; i < len ; i++ ){
                temp = _this.deletArrByValue(temp,id[i]);
              }
              _this.tableData = temp;
            }).catch(err => {

            })
          }
        })
      },

      saveData(){
        let _this =  this;
        let name = _this.form.name;
        if(name == ''){
          _this.myAlert("学校名称为空！",'dangerous-icon');
          return false;
        }
        let form = _this.form;
        for(let arr in form){
          if(form[arr] == null ){
            form[arr] = "";
          }
        }
        modifySchool(form).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功！", 'success-icon').then(res => {
              _this.$emit("reloadSchoolList");
              _this.clearFormData();
            }).catch(err => {
            })
          } else if (response.status == 0){
            _this.myAlert(response.status,'dangouser-icon');
          }
        })

      },
      clearFormData(){
        this.$refs.formsData.resetFields();
        this.dialogEditorSchool = false
      },
      //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
      }
    },

  }
</script>

<style lang="scss" scoped>
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .input-l-word{
    display:inline-block;
    line-height:28px;
    padding-right:5px;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header {
    background:#DCD9D3;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    height: 24px;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    //background:#F0F0F0;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  /deep/ .el-tabs--border-card {
    background:#DCD9D3;
    border-width:0;
  }
  /deep/ .el-tabs--border-card>.el-tabs__content {
    padding:0 !important;
  }
  .pop-up{
    padding: 8px 8px 0;
    .el-tabs--border-card {
      background: #DCD9D3;
    }
    .pop-up-container{
      margin:0px;
    }
    /deep/ .el-tabs--border-card>.el-tabs__content {
      padding: 0px;
    }
    /deep/ .el-tabs__item {
      padding: 0 20px;
      height: 20px;
      line-height:18px;
      font-size:12px;
    }
    .list-container{
      height:220px;
      overflow:auto;
      background:#C0C0C0;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      border-radius:5px;
      margin:10px;
      margin-right:0px;
      .list-table{
        width:375px;
        height:100%;
      }
    }
    .school-search-container{
      padding:10px 5px;
      .item-earch-btn{
        border: 1px solid #797979;
        line-height: 18px;
        margin-top: 10px;
        text-align: center;
        border-radius: 3px;
        cursor:pointer;
        font-size:12px;
        padding:0px 15px;
      }
    }
  }

  .move-content {
    padding:10px 0 10px 10px;
    .title-word{
      line-height:20px;
      font-size:12px;
    }
    .mearsure-unit{
      line-height:28px;
      color:#606266;
      font-size:12px;
      padding-left:5px;
    }
    .select {
      width: 120px;
    }
    p{
      color:#DCA96D;
      font-size:12px;
    }
  }
  /deep/ .el-textarea__inner{
    padding:5px;
    font-size:12px;
    border:1px solid #aaa;
  }
</style>
