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
  import { operationrecordrecordList } from "../../../service/SalaryDetails"; 

  export default {
    props:['thiswords','thisuserId'],
    data() {
      return {
        tableData: [],
        tableHead:[{
          id:111,prop:'things',label:'手动操作日志',align:'center',width:'250'
        },{
          id:222,prop:'name1',label:'手动后金额',align:'center',width:'150'
        },{
          id:333,prop:'name2',label:'手动前金额',align:'center',width:'150'
        }]
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
          types:'修改工资',
          userId:_this.thisuserId,
          words:_this.thiswords
        };
        operationrecordrecordList(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.tableData = data;
            _this.tableData.forEach(item=>{
              item.things = item.userName +"  "+item.time; 
              item.name2 = item.content.substring(item.content.indexOf('从“')+2,item.content.indexOf('”改为'));
              item.name1 = item.content.substring(item.content.indexOf('改为“')+3,item.content.lastIndexOf('”'));
            })
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