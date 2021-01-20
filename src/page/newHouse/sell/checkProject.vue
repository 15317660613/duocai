<template>
  <div class="" style="width:100%;margin:0 10px;" >

      <div class="pop-up" >
        <div class="pop-up-container clear" >
          <div class="left list-container list-content" style="margin:5px 5px 0;" >
            <div class="list-table " id="editorSchoolList"  >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="328px"
                border

                @row-click="getRowDataByClick"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  prop="check"
                  width="30"
                  label="√"
                >
                  <template slot-scope="scope">
                    <div  >
                      <input v-model="projectId" type="radio" :value="scope.row.id"   />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="projectName"
                  label="项目名称"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  width="100">
                  <!-- <template slot-scope="scope">
                    <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorProject(scope.$index, scope.row)" >
                      {{ scope.row.projectName }}
                    </div>
                  </template> -->
                </el-table-column>

                <el-table-column
                  prop="projectCode"
                  label="项目编号"
                  width="80"
                  align="center"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="area"
                  label="区县"
                  width="100"
                  align="left"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="projectState"
                  label="进度"
                  width="50"
                  align="center"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="startDate"
                  label="开盘日期"
                  width="80"
                  align="left"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="endDate"
                  label="最晚交房"
                  width="80"
                  align="left"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="left search-container" >
            <el-form ref="formsData" :model="form">
              <div class="clear" >
                <div class="left" >
                  <span class="word" >进度</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="projectState" >
                    <el-select v-model="form.projectState"    style="width:110px;" >
                      <el-option v-for="item in projectStateParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="clear" >

                <div class="left" style="padding-left:35px;" >
                  <el-form-item  prop="word1" >
                    <el-input v-model="form.word1" title="项目名称/项目编号"    style="width:110px;" ></el-input>
                  </el-form-item>
                </div>

              </div>
            </el-form>
            <div class="item-earch-btn" @click="getRentListData"   >
              查询
            </div>
            <div class="item-earch-btn" @click="getMayRentListData(1)"   >
              快查我的房源
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        </div>
      </div>

  </div>
</template>

<script>
  // 获取数据
  import {getparams,newHouseList} from '../../../service/newHouse'
  import {rentConstParam} from '../../../utils/rentParam'
  import EditorProjectPage from '../project/editorProject'
  export default {
    props:['districtId','streetId','projectIdParent','customerId','layerid'],
    data() {
      return {
        dialogVisible:this.checkProjectDialog,
        multipleSelection:[],
        tableData:[],
        projectStateParams:[],
        word:"",
        projectId:this.projectIdParent,
        setDistrictId:'-1',
        setStreetId:this.streetId,
        form: {
          districtId:'-1',
          streetId:'-1',
          projectState: '-1',
        
          word:'',
          effectiveFlag:1,
          
        },
        formLabelWidth: '100px'
      };
    },
    components:{
      EditorProjectPage,
    },
    methods:{


      //获取参数
      getRentParam(){
        let _this = this;
        getparams().then(function(response){
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


            _this.getRentListData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },

      //查询
      getRentListData(type){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
        let customerId = this.customerId;
        if(customerId){
          form.customerId = customerId;
        }
        
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        form.streetId = '-1';
        newHouseList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            _this.tableData = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      getMayRentListData(){
        let _this = this;
        let form = {};
        form.myCreate =1;
        form.pairFlag = 1;
        newHouseList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            _this.tableData = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      editorProject(index, row){
        let _this = this;
        this.currentPage = row;
        let test = _this.$layer.iframe({
          content: {
            content: EditorProjectPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,'activeName':'project'}//props
          },
          area:['800px','560px'],
          title: "项目信息 【"+this.currentPage.projectName+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },
      getRowDataByClick(row){
        let _this = this;
        _this.clickColumnId = row.id;
      },
      handleSelectionChange(elemCheckbox){

      },
      saveFormData(){

        let check = this.projectId;
        if(check == '' ){
          this.myAlert("请选择项目","dangerous-icon");
        }else{
          let elem = '';
          this.tableData.forEach(function(item){
            if(item.id == check){
              elem = item;
              return false;
            }
          })

          this.$parent.setCheckData(check,elem);
          this.cancelData();
        }
      },
      checkValueInArr(arr,value){
        let flag = false;
        let elem = null;
        for(let i = 0 ; i < arr.length ; i++){
          if(arr[i].id == value){
            flag = true;
            elem = arr[i];
            break;
          }
        }
        return {flag:flag,elem:elem} ;
      },
      cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },
      clearFormData(){
        this.word = "";
        this.projectId = '';
        this.projectState = '-1';
        this.form.word = '';
        this.dialogVisible = false;
      }

    },
    mounted(){
        let _this = this;
        this.form.districtId = this.setDistrictId;
        this.form.streetId = this.setStreetId;
        this.getRentParam();
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
  .list-container{
    height:340px;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-radius:5px;
    .list-table{
      width:370px;
    }
  }
  .search-container{
    padding:5px;
    width:160px;
    border-width:0;
    .word{
      display:inline-block;
      line-height:27px;
      width:35px;
      text-align:right;
      padding-right:5px;
    }
    .item-earch-btn{
      width:108px;
      padding:0 5px ;
      font-size:12px;
      border: 1px solid #797979;
      line-height: 21px;
      margin: 10px 0 0 35px;
      text-align: center;
      border-radius: 3px;
      cursor:pointer;
    }
  }

</style>
