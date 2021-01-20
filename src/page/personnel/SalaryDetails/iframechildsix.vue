<template>
  <div style="width: 100%;padding: 0px 10px;">
    <div class="pop-up">
      <div class="pop-up-container" style="height:328px;overflow-y:auto;overflow-x:hidden;position: relative;padding: 5px;margin: 10px;" >
        <div class="mycontainer">
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column v-for="(item,index) in tableHead"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { userSalarygetBonus } from "../../../service/SalaryDetails"; 

  export default {
    props:['thistype','thisnum','thisuserId','thistime'],
    data() {
      return {
        tableData: [],
        tableHead:[
          {prop:'time',label:'业绩年月',align:'center',width:'100'},
          {prop:'model',label:'业务项目',align:'center',width:'100'},
          {prop:'event',label:'事件',align:'center',width:'150'},
          {prop:'achievement',label:'业绩',align:'center',width:'100'},
          {prop:'bonus',label:'金额',align:'center',width:'100'}
        ]
      }
    },
    components:{

    },
    methods:{
      getDetailsData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {
          type:_this.thistype,
          num:_this.thisnum,
          userId:_this.thisuserId,
          time:_this.thistime
        };
        userSalarygetBonus(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.tableData = data.list;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
    },
    mounted(){
      this.getDetailsData();
    }
  }
</script>
<style lang="scss" scoped>
  .mycontainer {
    background-color: #DCD9D3;
    /deep/ .el-table .is-center,.el-table  .is-leaf, .el-table tr td{
      background-color: #DCD9D3!important;
    }
    /deep/ .el-table, .el-table__expanded-cell{
      background-color: #DCD9D3;
    }
    /deep/ .el-table thead{
      color: #222;
      font-weight: bolder;
    }
    /deep/ .el-table td, .el-table th.is-leaf{
      border:none;
      padding: 3px 0px;
    }
    /deep/ .el-table::before{
      height: 0px;
    }
    /deep/ .el-table--scrollable-x .el-table__body-wrapper{
      overflow-x: hidden;
    }
    /deep/ .el-table th.is-leaf{
      border-bottom: 1px solid #888;
      padding: 3px 0px;
    }
    /deep/ .el-table .cell{
      white-space: nowrap;
    }
  }
  
</style>