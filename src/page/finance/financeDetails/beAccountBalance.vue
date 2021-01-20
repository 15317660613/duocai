<template>
  <div style="width:100%;padding:0 10px;">
     <div class="pop-up" >
        <div class="pop-up-container clear" style="margin-bottom:10px;" >
          <div class="left list-content  list-container" >
            <div class="list-table account-manage" style="width:501px;" >
                <el-table
                    :data="tableData"
                    :pagination-show="false"
                    empty-text=" "
                    border
                    style="height:373px;"
                   
                    
                >
                    <template v-if="item.show" v-for="(item,index) in columnData" >
                    

                    <el-table-column
                        v-if="item.prop == 'price'"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                        :type="item.type"
                        :ref="item.ref"
                        :sortable="item.sortable"
                        :show="item.show"
                        :fixed="item.fixed"
                        align="right"

                    >
                        <template slot-scope="scope" style="height: 100%;">
                        <div v-if="scope.row.price != '' && scope.row.price.indexOf('-') != -1" style="color:#CC3300;text-algin:right;"  >
                            {{ scope.row.price }}
                        </div>
                        <div v-else-if="scope.row.price != '' && scope.row.price.indexOf('-') == -1" style="color:#009933;text-algin:right;"  >
                            {{ scope.row.price }}
                        </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        v-else-if="item.prop != 'price' && item.prop != 'count2' && item.prop != 'check'"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                        :type="item.type"
                        :ref="item.ref"
                        :sortable="item.sortable"
                        :show="item.show"
                        slot-scope="scope"
                        :fixed="item.fixed"
                        :align="item.align"
                        :show-overflow-tooltip="true"
                    >

                    </el-table-column>
                    </template>
                </el-table>
            </div>
          </div>
         
        </div>
       
      </div>  
    
  </div>
</template>
<script>
  import {financeBeAccountList} from "../../../service/financeData"; 
  import {financeParam,} from "../../../utils/financeParams";
  export default {
    props:['checkFinance','itemClassTwo','itemClassFour','preId','expenditureIdType','expenditureDepartId','expenditureUserId','layerid'],
    
    data() {
      return {
        
        form:{

        },
        getCheckFinance:this.checkFinance,
        formsearch:{
          departdata:this.departId,
          departpersondata:this.userId,
        },
        tableData:[],
        columnData:financeParam.financeAccountColumn,
      };
    },
    components:{
     
    },
    methods:{

     
      getAccountListData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {
          id:this.preId,

        };
        financeBeAccountList(form).then(function (response) {
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
      
      saveData(){
        let _this = this;
        let getCheckFinance = this.getCheckFinance;
        if(getCheckFinance){
          let tableData = this.tableData;
          let elem = '';
          let financeDes = "";
          tableData.forEach(item => {
            if(item.id == getCheckFinance){
              elem = item;
              financeDes = item.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+item.event;
            }
          })
          _this.$parent.setAccountFinanceIds(getCheckFinance,elem,financeDes);
          _this.cancelData();
        }else{
          this.myAlert("请选择收支","dangerous-icon");
        }
        
        
      },
      cancelData(){
           this.$layer.close(this.layerid);
      },
      
      
    },
    mounted(){
      this.getAccountListData();
    }
  }
</script>

<style lang="scss" >
   .account-manage .el-table--scrollable-x .el-table__body-wrapper {
    height:93% !important;
    }
</style>
