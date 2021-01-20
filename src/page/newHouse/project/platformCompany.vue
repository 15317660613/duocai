<template>
  <div style="width: 100%;">
    <div class="pop-up" style="margin: 0px 10px;">
      <div class="pop-up-container clear" style="height: 356px;">
        <div class="left list-content  list-container" >
          <div class="list-table" >
            <el-table
              :data="tableData"
              style="width: 100%"
              height="350"
              border

              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="30"
                ref="multipleTable">

              </el-table-column>
              <el-table-column
                prop="platformCompany"
                label="平台公司"
                :show-overflow-tooltip="true"
                align='center'
                width="80">
                <template slot-scope="scope">
                  <div style="color:#336699;text-algin:center;cursor:pointer;" @click="showEditorPlaformCompany(scope.$index, scope.row)" >
                    {{ scope.row.platformCompany }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="empNum"
                label="联系人员"
                width="80"
                :show-overflow-tooltip="true"
                align='center'
              >

              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                width="195"
                :show-overflow-tooltip="true"
                align='center'
              >
              </el-table-column>
              <el-table-column
                prop="updateBy"
                label="修改人"
                width="150"
                :show-overflow-tooltip="true"
                align='center'
              >
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>
      <div slot="footer" class="dialog-footer clear" style="padding-bottom: 2px;">
        <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="deletedPropertyOwner" >删 除</span>
        <span class="right save-cancel-btn" type="primary" @click="showNewPlaformCompany"  >新 增</span>
        <span class="right save-cancel-btn" type="primary" @click="reloadPlaformCompany" >刷 新</span>
      </div>
    </div>
    <div class="component-container" >
      <NewPlaformCompanyPage @reloadPlaformCompany="reloadPlaformCompany" :newPlatformCompanyVisible="newPlatformCompanyValue" ref="newPlatformCompany" ></NewPlaformCompanyPage>
    </div>
    <div class="component-container" >
      <EditorPlaformCompanyPage @reloadPlaformCompany="reloadPlaformCompany"  :editorPlatformCompanyVisible="editorPlatformCompanyValue" ref="editorPlatformCompany" ></EditorPlaformCompanyPage>
    </div>

  </div>
</template>

<script>

  import {plaformCompanyList,deletedPlaformCompany} from '../../../service/newHouse'
  import NewPlaformCompanyPage from './newPlaformCompany'
  import EditorPlaformCompanyPage from './editorPlaformCompany'
  export default {
    props:["layerid"],
    data() {
      return {
        tableData:[],
        multipleSelection:[],
        newPlatformCompanyValue:false,
        editorPlatformCompanyValue:false,
      };
    },
    components:{
      NewPlaformCompanyPage,
      EditorPlaformCompanyPage,
    },
    methods:{
      getPlaformCompanyList(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        plaformCompanyList().then(function (response) {

          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
              _this.tableData = response.data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      reloadPlaformCompany(){
        this.getPlaformCompanyList();
      },
      //新增平台公司
      showNewPlaformCompany(){
        let _this = this;
        this.$refs.newPlatformCompany.showDialog();
      },
      //编辑平台公司
      showEditorPlaformCompany(index, row){
        let _this = this;
        let id = row.id;
        this.$refs.editorPlatformCompany.showDialog(id,row.platformCompany);
      },

      //删除平台公司
      deletedPropertyOwner(){
        let _this = this;
        let ids = _this.multipleSelection;
        if(ids.length != 0){
          _this.myConfirm("警告：删除后将不能还原！","question-icon",'是','否',"确定要删除选定记录吗？").then(res => {
            _this.saveSuccess();
          }).catch(err => {

          })
        }else{
          _this.myAlert("请选择要删除的平台公司！")
        }
      },

      saveSuccess(){
        let _this = this;
        let deleted = 1;
        let ids = _this.multipleSelection.toString();
        deletedPlaformCompany(ids,deleted).then(function (response) {
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

      //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
      },
      clearFormData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
      this.getPlaformCompanyList();
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
    },
  }
</script>

<style lang="scss" scoped>
  .list-container{

    height:350px;
    background:#C0C0C0;

    border-radius:5px;
    margin:0 0 10px;
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
