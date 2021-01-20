<template>
  <div style="width:100%;padding:0 10px;">
     <div class="pop-up" >
        <div class="pop-up-container clear" >
          <div class="left list-content  list-container" >
            <div class="list-table account-manage" style="width:501px;" >
                <el-table
                :data="tableData"
                :pagination-show="false"
                empty-text=" "
                border
                @selection-change="handleSelectionChange"
                ref="table"
                style="height:350px;"
              >
                <el-table-column
                  prop="check"
                  width="30"
                  label="选中"
                  align="center"
                  type="selection"
                  ref="multipleTable"
                >
                  
                </el-table-column>

                  <el-table-column
                  prop="sourceGetId"
                  label="收方"
                  width="80"
                  sortable="true"
                  align="center"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                
                <el-table-column
                  prop="sourceGetAmount"
                  label="实收金额"
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
                  prop="over2"
                  label="未平金额"
                  width="70"
                  sortable="true"
                  align="right"
                  :show-overflow-tooltip="true"
                >
                 <template slot-scope="scope" style="height: 100%;">
                  <div style="color:rgb(0, 0, 255);text-algin:right;"  >
                      {{ scope.row.over2 }}
                  </div>
                </template>
                </el-table-column>
                
                <el-table-column
                  prop="getPayDate"
                  label="收付日期"
                  width="100"
                  sortable="true"
                  align="center"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="managerId"
                  label="财务人"
                  width="110"
                  sortable="true"
                  align="center"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                
                <el-table-column
                  prop="sourceGetType"
                  label="方式"
                  width="90"
                  sortable="true"
                  align="center"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>

              </el-table>
            </div>
          </div>
         
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
           <div class="left mark-des-word" style="padding:0px 0 0 5px ;" >
            勾选的平账数据以【收付日期】正序进行平账
          </div>  
          <span class="right save-cancel-btn"  @click="cancelData" >取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData" >确 定</span>
        </div>
      </div>  
    
  </div>
</template>

<script>
// 获取数据
  import {contractAccountFinance} from '../../../service/contractSpecial'
  export default {
    props:["businessType2","contractId","businessName1","businessName2","sourceGetId","sourceGetName","thisFinanceId","fid","layerid"],

    data() {
      return {
        dialogAccount:this.dialogAccountValue,
        multipleSelection:[],
        tableData:[],
        financeId:'',
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
     
      //查询
      getAccountListData(businessType2,contractId){
        let _this = this;
        let sourceGetId = this.sourceGetId;
        let sourceGetName = this.sourceGetName;
        if(!sourceGetId){
          sourceGetId = "";
        }
        if(!sourceGetName){
          sourceGetName = "";
        }
        debugger;
        let form = {
          businessType2:businessType2,
          contractId:contractId,
          fId:this.thisFinanceId,
          sourceGetId:sourceGetId,
          sourceGetName:sourceGetName,
        };
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        contractAccountFinance(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.tableData = data;
            let fid = _this.fid;
            if(fid){
              _this.$nextTick(function () {
                _this.tableData.forEach(row => {
                
                  if(fid.indexOf(row.id) != -1){
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
      reloadData(){
        this.getRentListData();
      },
      saveData(){
        let check = this.financeId;

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
            let expenditureId1 = item.sourceGet1 + "_" + item.sourceGetId2; 
            if(arr.indexOf(item.id) != -1){
              if(count == 0){
                elem = item;
                count = 1;
                 mapDifferent[expenditureId1] = 1; 
                 expenditureId = expenditureId1;
              }else{
                 mapDifferent[expenditureId1] = mapDifferent[expenditureId1] +1; 
              }
              checkFinanceArr.push(item);  
            }
          })
          if(mapDifferent[expenditureId] != multipleSelection.length ){
             this.myAlert("所选择的被平账数据的收付方必须一致，请重新选择！",'dangerous-icon');
             return false;
          }else{
            this.$parent.setCheckData(elem,checkFinanceArr);
            this.cancelData();
          } 
         
            
        }else{ 
          this.myAlert("请选择财务","dangerous-icon");
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
      this.financeId = this.fid;
      
      this.getAccountListData(this.businessType2,this.contractId);
    }
  }
</script>
<style lang="scss" >
   .account-manage .el-table--scrollable-x .el-table__body-wrapper {
    height:92% !important;
    }
</style>
