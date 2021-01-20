<template>
  <div class="" style="width:100%;padding:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container clear" style="margin-bottom:10px;height: 328px;" >
          <div class="left list-container list-content" style="width:100%;" >
            <div class="list-table" id="questionFinancelist" >
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    height="324px"
                    border
                    highlight-current-row
                >
                    
                    <el-table-column
                    prop="paramName"
                    label="方式"
                    sortable="true"
                    align="center"
                    :show-overflow-tooltip="true"
                    width="130">
                    </el-table-column>

                    <el-table-column
                    prop="allMoney"
                    label="金额"
                    width="140"
                    sortable="true"
                    align="right"
                    header-align="right"
                    :show-overflow-tooltip="true"

                    >
                     </el-table-column>
                    <el-table-column
                    prop="noInMoney"
                    label="收未到账"
                    width="140"
                    sortable="true"
                    align="right"
                    header-align="right"
                    :show-overflow-tooltip="true"

                    >
                      <template slot-scope="scope" style="height: 100%;">
                        <div style="position:relative;" >
                         
                          <div   class="" style="color:#9F9F9E;text-algin:right;width: 100%;" >
                            {{ scope.row.noInMoney }}
                          </div>
                        
                        </div>  
                      </template>
                    </el-table-column>
                     <el-table-column
                    prop="noOutMoney"
                    label="支未到账"
                    width="140"
                    sortable="true"
                    align="right"
                    header-align="right"
                    :show-overflow-tooltip="true"

                    >
                       <template slot-scope="scope" style="height: 100%;">
                        <div style="position:relative;" >
                         
                          <div   class="" style="color:#9F9F9E;text-algin:right;width: 100%;" >
                            {{ scope.row.noOutMoney }}
                          </div>
                        
                        </div>  
                      </template>
                    </el-table-column>
                    
                </el-table>
               </div>     
           </div>
        </div>
      </div>
  </div>
</template>
<script>

  import{getFinanceBudgetCount}  from "../../../service/financeStatistics";
  export default {
    props:["layerid",'type'],
    data() {
      return {
        id:0,
        processings:[],
        getIndex:this.index,
        getRow:this.row,
        followId:'',
        tableData:[],
        form:{
          remark:this.remark,
        },
      };
    },
    methods:{
     
      getDataList(){
        let _this =  this;
        this.$layer.loading({
        shade: true,//是否显示遮罩
        });
        let form = {type:this.type};
        getFinanceBudgetCount(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
                let list = response.data.list;
                
                _this.tableData = list;
            } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message+"！");
            }
        })
      },
      saveData(){
          this.$parent.setElemRemark(this.form.remark,this.index);
          this.cancelData();
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
       this.getDataList(this.id); 
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    .followList{

      height:135px;
      overflow:auto;
      .elemFollow{
        lien-height:20px;
        height:20px;
        border-bottom:1px solid #fff;
      }
    }
  }
  .click-check{
    background:#D7E8FC !important;
  }
  /deep/ .el-table th>.cell {
    padding:0;
    text-align:inherit;
    padding-right:10px;
    padding-left:10px;
  }
  /deep/.el-table th>.cell{
    text-align:inherit;
    padding:0;
    padding-right:10px;
    padding-left:10px;
  }
</style>
<style type="text/css">
  #questionFinancelist .el-table th.is-leaf{
      border-right-width:0px !important;
  }
  #questionFinancelist .el-table tr{
      background:#DCD9D3;
  }
  #questionFinancelist .el-table td {
    
    font-size: 12px;
    border-color: #DCD9D3 !important;
  }

</style>
