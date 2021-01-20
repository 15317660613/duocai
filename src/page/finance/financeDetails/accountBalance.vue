<template>
  <div style="width:100%;padding:0 10px;">
     <div class="pop-up" >
        <div class="pop-up-container clear gutter-list " >
          <div class="left list-content  list-container" >
            <div class="list-table account-manage" style="width:501px;" >
                <el-table
                    :data="tableData"
                    
                    empty-text=" "
                    border
                    style="height:350px;"
                    @selection-change="handleSelectionChange"
                    ref="table"
                >
                    <template v-if="item.show" v-for="(item,index) in columnData" >
                    <el-table-column
                        v-if="item.prop == 'check'"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                        type="selection"
                        ref="multipleTable"
                        :sortable="item.sortable" 
                        :align="item.align"
                    >
                    </el-table-column>

                    <el-table-column
                        v-else-if="item.prop == 'price'"
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
                      v-else-if="item.prop == 'count2'"
                      :prop="item.prop"
                      :label="item.label"
                      :width="item.width"
                      :sortable="item.sortable" 
                      align="right"
                    >
                      <template slot-scope="scope" style="height: 100%;">
                        <div style="color:rgb(0, 0, 255);text-algin:right;"  >
                            {{ scope.row.count2 }}
                        </div>
                      </template>

                    </el-table-column>


                    <el-table-column
                        v-else
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
        <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
          <div class="left mark-des-word" style="padding:0px 0 0 5px ;" >
            勾选的平账数据以【收支时间】正序进行平账
          </div>  
          <span v-if="!financeId" class="right save-cancel-btn"  @click="cancelData" >取 消</span>
          <span v-if="!financeId" class="right save-cancel-btn" type="primary" @click="saveData" >确 定</span>
        </div>
      </div>  
    
  </div>
</template>
<script>
  import {financeAccountList} from "../../../service/financeData"; 
  import {financeParam,} from "../../../utils/financeParams";
  export default {
    props:['checkFinance','itemClassTwo','itemClassFour','financeId','preId','expenditureIdType','expenditureDepartId','expenditureUserId','layerid'],
    
    data() {
      return {
        multipleSelection:[],
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

      //全选
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },
      getAccountListData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        debugger;
        let form = {
          itemClassTwoId:this.itemClassTwo,
          itemClassFourId:this.itemClassFour,
          preId:this.preId,
          financeId:this.financeId,
          expenditureIdType:this.expenditureIdType,
          expenditureDepartId:this.expenditureDepartId,
          userId:this.expenditureUserId,
         
        };
        financeAccountList(form).then(function (response) {
          _this.$layer.closeAll("loading");  
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            _this.tableData = data;
            let getCheckFinance = _this.getCheckFinance;
            if(getCheckFinance){
              _this.$nextTick(function () {
                _this.tableData.forEach(row => {
                
                  if(getCheckFinance.indexOf(row.id) != -1){
                    _this.$refs.table.toggleRowSelection(row, true);
                  }
                })  
              })
            }  
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })

      },
      
      saveData(){
        let _this = this;
        let multipleSelection = this.multipleSelection;
        if(multipleSelection && multipleSelection.length != 0){
          let tableData = this.tableData;
          let elem = '';
          let financeDes = "";
          let arr = multipleSelection.toString();
          let getCheckFinance = arr;
          let count = 0;
          let checkFinanceArr = [];
          let mapDifferent = {};
          let expenditureId = "";
          tableData.forEach((item,index )=> {
            if(arr.indexOf(item.id) != -1){
              if(count == 0){
                elem = item;
                financeDes = item.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+item.event;
                count = 1;
                mapDifferent[item.expenditureId] = 1; 
                expenditureId = item.expenditureId;
              }else{
                mapDifferent[item.expenditureId] = mapDifferent[item.expenditureId] +1; 
              }
              checkFinanceArr.push(item);  
            }
          })
          if(mapDifferent[expenditureId] != multipleSelection.length ){
             this.myAlert("所选择的被平账数据的收方必须一致，请重新选择！",'dangerous-icon');
             return false;
          }else{
            _this.$parent.setAccountFinanceIds(getCheckFinance,elem,financeDes,checkFinanceArr);
            _this.cancelData();
          }  
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
    .account-manage .list-content .el-table th.gutter{
      display:inline !important;
    }
</style>
