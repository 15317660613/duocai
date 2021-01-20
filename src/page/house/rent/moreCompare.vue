<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="更多房对" width="516px" height="250px" @close="clearFormData" :visible.sync="dialogModifyNum" >
      <div class="pop-up" >
        <div class="pop-up-container " >
          <div class="move-content" >
            <div class="" style="height:260px;" >
                <el-table
                  :data="tableData"
                  empty-text=" "
                  border
                  height="100%"
                  :loading="loading"
                  highlight-current-row
                >

                  <el-table-column
                    prop=""
                    label="交易"

                    width="35">

                  </el-table-column>

                  <el-table-column
                    prop="indexId"
                    label="顺位"
                    width="40">

                  </el-table-column>
                  <el-table-column
                    prop="processingStateId"
                    label="进程"
                    width="40">

                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="自定"
                    width="40">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="客户"
                    width="80">
                  </el-table-column>

                  <el-table-column
                    prop="villageNum"
                    label="员工"
                    width="105">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="标记日期"
                    width="105">
                  </el-table-column>
                </el-table>
            </div>
          </div>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {houserFindCustomerList} from "../../../service/houseData";
  export default {
    props:["moreCompareVisible"],
    data() {
      return {
        dialogModifyNum:this.moreCompareVisible,
        loading:false,
        tableData:[],
        form:{
          id:0,
        },
      };
    },
    methods:{
      dialogShow(id){
        this.dialogModifyNum = true;
        this.form.id = id;
        this.findCustomerListByHouse();
      },

      findCustomerListByHouse(){
        let _this = this;
        let id = _this.form.id;
        houserFindCustomerList(id).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.tableData = response.data;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      clearFormData(){

        this.form.townId = '';
        this.dialogModifyNum = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px;
  }
</style>
