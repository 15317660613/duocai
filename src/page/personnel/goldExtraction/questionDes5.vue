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
                    prop="type"
                    label="类型"
                    sortable="true"
                    align="center"
                    :show-overflow-tooltip="true"
                    width="120">
                    </el-table-column>

                    <el-table-column
                    prop="price"
                    label="金额"
                    width="70"
                    sortable="true"
                    align="right"
                    :show-overflow-tooltip="true"

                    >
                     </el-table-column>
                    <el-table-column
                    prop="opr"
                    label="操作日志"
                    width="225"
                    sortable="true"
                    align="left"
                    :show-overflow-tooltip="true"

                    >

                    </el-table-column>
                     <el-table-column
                    prop="event"
                    label="事件"
                    width="115"
                    sortable="true"
                    align="right"
                    :show-overflow-tooltip="true"

                    >
                      
                    </el-table-column>
                    
                </el-table>
               </div>     
           </div>
        </div>
      </div>
  </div>
</template>
<script>

  import {goldExtractionTotalDebt} from "../../../service/goldExtractionData";
  export default {
    props:["layerid",'type','id'],
    data() {
      return {
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
        let form = {id:this.id};
        goldExtractionTotalDebt(form).then(function (response) {
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
          
          this.cancelData();
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
       this.getDataList(); 
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
  #questionFinancelist th.is-leaf{
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
