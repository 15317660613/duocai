<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="物业主列表" width="600px" :visible.sync="dialogPropertyOwnerList" @close="clearFormData" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container clear" style="height: 396px;">
          <div class="left list-content  list-container" >
            <div class="list-table" >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="370"
                border
                v-loading="loading"
                highlight-current-row
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  prop="check"
                  width="30"
                  label="√"
                >
                  <template slot-scope="scope">
                    <div  >
                      <input v-model="propertyOwnerId" type="radio" :value="scope.row.id"   />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="编号"
                  sortable
                  :show-overflow-tooltip="true"
                  align="center"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="shortName"
                  label="物业主"
                  width="120"
                  sortable
                  :show-overflow-tooltip="true"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div style="color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                      {{ scope.row.shortName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="userName"
                  label="联系人"
                  width="80"
                  sortable
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="tel"
                  label="联系人电话"
                  width="90"
                  sortable
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="left " style="padding:10px 10px 0 0;" >
            <el-form ref="formsData"  :model="form" >
              <div >
                <el-form-item  prop="word" >
                  <el-input v-model="word" title="物业主"  autocomplete="off" style="width:100px;" >
                  </el-input>
                </el-form-item>
              </div>
            </el-form>
            <div class="item-earch-btn" @click="searchData" >
              查询
            </div>
            <div  class="item-earch-btn"  style="background:#DFDAD5;color:#999;cursor:not-allowed" >
              新增物业主
            </div>
            <div  class="item-earch-btn"  style="background:#DFDAD5;color:#999;cursor:not-allowed" >
              删除物业主
            </div>
            <div class="item-earch-btn" @click="checkPropertyOwner"  >
              选中物业主
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <div>
      <NewPropertyOwnerPage :newPropertyOwnerValue="newPropertyOwner" ref="showNewPropertyOwner"></NewPropertyOwnerPage>
    </div>
    <div>
      <EditorPropertyOwnerPage :editorPropertyOwnerVlue="editorPropertyOwner" ref="showEditorPropertyOwner"></EditorPropertyOwnerPage>
    </div>


  </div>
</template>

<script>
  import {propertyOwnerList,deletedPropertyOwner}  from '../../../service/getData'
  import NewPropertyOwnerPage from './newPropertyOwner'
  import EditorPropertyOwnerPage from './editorPropertyOwner'
  export default {
    props:["propertyOwnerList"],
    data() {
      return {
        dialogPropertyOwnerList:this.propertyOwnerList,
        newPropertyOwner:false,
        editorPropertyOwner:false,
        dialogVisibleDeleted:false,
        notes:"",
        loading:false,
        multipleSelection:[],
        tableData:[],
        word:"",
        propertyOwnerId:'',
        form: {
          word: '',
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
      NewPropertyOwnerPage,
      EditorPropertyOwnerPage
    },
    methods:{
      //查询
      searchData(){
        let _this = this;
        _this.showPropertyOwnerList();
      },
      //新增物业主
      showNewPropertyOwner(){
        let _this = this;
        _this.$refs['showNewPropertyOwner'].newPropertyOwner(true);
      },
      //编辑物业主
      handleEdit(index, row){
        let _this = this;
        let id = row.id;
        _this.$refs['showEditorPropertyOwner'].editorPropertyOwner(id);
      },

      //删除物业主
      deletedPropertyOwner(){
        let _this = this;
        let ids = _this.multipleSelection;
        if(ids.length != 0){
          _this.myConfirm("确定要将选定的物业主删除吗？","question-icon",'是','否').then(res => {
            _this.saveSuccess();
          }).catch(err => {

          })
        }else{
          _this.myAlert("请选择要删除的物业主！")
        }
      },
      checkPropertyOwner () {
        if(this.propertyOwnerId == ''){
          this.myAlert("请选择物业主！","dangerous-icon");
        }else{
          let name = '';
          let id = this.propertyOwnerId;
          let phone = '';
          this.tableData.forEach(function(item){
            if(item.id == id){
              name = item.shortName;
              phone = item.tel;
              return false;
            }
          })
          this.clearFormData();
          this.$emit("setProperty",id,name,phone);
        }
      },

      saveSuccess(){
        let _this = this;
        let deleted = 1;
        let ids = _this.multipleSelection.toString();
        deletedPropertyOwner(ids,deleted).then(function (response) {
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


      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },
      showPropertyOwnerList(propertyOwnerId) {

        let _this = this;
        _this.dialogPropertyOwnerList = true;
        if(propertyOwnerId){
            _this.propertyOwnerId = propertyOwnerId;
        }
        let word = _this.word;
        if(word == null){
          word = "";
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        propertyOwnerList(word).then(function (response) {
          _this.$layer.closeAll("loading");
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
        })
      },
      saveFormData(){
        let tableData = this.tableData;
        let propertyOwnerId = this.propertyOwnerId;
        let currentData = null;
        tableData.forEach(item => {
          if(item.id == propertyOwnerId){
            currentData = item;
          }
        })
        this.myAlert("数据保存成功！","success-icon").then(res=> {
          this.$meit("savePropertyData",currentData);
          this.clearFormData();
        }).catch(res =>{

        })
      },
      //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
      },
      clearFormData(){
        this.word = "";
        this.dialogPropertyOwnerList = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-container{

    height:374px;
    background:#C0C0C0;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-radius:5px;
    margin:10px;
    border-radius:5px;

  }
  .item-earch-btn{
    border: 1px solid #666;
    line-height: 21px;
    margin-top: 10px;
    text-align: center;
    border-radius: 3px;
    cursor:pointer;
  }
  .search-container{
    padding:10px;

  }

</style>
