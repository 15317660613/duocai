<template>
  <div style="width:100%;padding:0 10px;">
     <div class="pop-up" >
        <div class="pop-up-container clear" style="margin-bottom:10px;" >
          <div class="left list-content  list-container" >
            <div class="list-table beaccount-manage" style="width:501px;" >
                <el-table
                :data="tableData"
                style="height:374px;"
                :pagination-show="false"
                empty-text=" "
                border

              >
                 <el-table-column
                  prop="sourceGetId"
                  label="付方"
                  width="100"
                  sortable="true"
                  align="center"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="sourceGetAmount"
                  label="实付金额"
                  width="70"
                  sortable="true"
                  align="right"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope" style="height: 100%;">
                    <div style="color:rgb(0, 204, 102);text-algin:right;"  >
                        {{ scope.row.sourceGetAmount }}
                    </div>
                  </template>

                </el-table-column>
                

               
                <el-table-column
                  prop="getPayDate"
                  label="收付日期"
                  width="80"
                  sortable="true"
                  align="center"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="managerId"
                  label="财务人"
                  width="120"
                  sortable="true"
                  align="center"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="sourceGetType"
                  label="方式"
                  width="100"
                  sortable="true"
                  align="center"
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
  // 获取数据
  import {contractBeAccountFinance} from '../../../service/contractSpecial'
  export default {
    props:["businessType2","contractId","businessName1","businessName2","financeId","layerid"],

    data() {
      return {
        dialogAccount:this.dialogAccountValue,
        tableData:[],
        titlename:'',
        form: {
          num: '-1',
          roomSaleStateId:"-1",
          roomType:'-1',
          word:'',
          check:0,
        },
        formLabelWidth: '100px'
      };
    },
    components:{

    },
    methods:{
      

      //查询
      getAccountListData(financeId){
        let _this = this;

        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        contractBeAccountFinance(financeId).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.tableData = data;
            _this.tableData.forEach(item=>{
              item.targetPayAmount = Number(item.targetPayAmount);
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      reloadData(){
        this.getRentListData();
      },
      saveData(){
        let check = this.customerId;
        if(check == '' ){
          this.myAlert("请选择客源","dangerous-icon");
        }else{
          let name = '';
          this.tableData.forEach(function(item){
            if(item.id == check){
              name = item.name;
              return false;
            }
          })
          this.$parent.setCheckData(check,name);
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
        this.$layer.close(this.layerid);
      }

    },
    mounted(){
      this.getAccountListData(this.financeId);
    }
  }
</script>
<style lang="scss" >
   .beaccount-manage  .el-table__body-wrapper {
    height:93% !important;
    }
</style>
