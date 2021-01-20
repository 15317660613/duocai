<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="width:100%;padding:10px 10px 0;" >
      <el-tabs type="border-card" v-model="getActiveName"  @tab-click="changeTab"  >
        <el-tab-pane label="收支" name="budget"  >
          <span slot="label"  >收支</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;"  >
              <div class="pop-up-container" style="margin:0px;height: 330px;" >
                <div class="content clear" style="height:100%;" >
                  <div class="list-content account-manage" style="width:100% !important;margin:0;border-width:0px;" >
                    <el-table
                      :data="tableData1"
                      :pagination-show="false"
                      empty-text=" "
                      border
                      height="100%"
                       @selection-change="handleSelectionChange1"
                       ref="table1"
                     
                    >
                      
                        <el-table-column
                         
                          prop="check"
                          label="√"
                          width="30"
                          align="center"
                          type="selection"
                          ref="multipleTable"
                        >
                        
                        </el-table-column>

                        
                        <el-table-column
                          prop="number"
                          label="收支流水号"
                          width="125"
                          sortable="false" 
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="event"
                          label="事件"
                          width="125"
                          sortable="false" 
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="price"
                          label="欠款金额"
                          width="70"
                          sortable="false" 
                          align="right"
                        >
                        <template slot-scope="scope" style="height: 100%;">
                          <div style="color:rgb(0, 204, 102);text-algin:right;"  >
                              {{ scope.row.price }}
                          </div>
                        </template>
                        </el-table-column>
                        <el-table-column
                          prop="count2"
                          label="未平金额"
                          width="70"
                          sortable="false" 
                          align="right"
                        >
                          <template slot-scope="scope" style="height: 100%;">
                            <div style="color:rgb(0, 0, 255);text-algin:right;"  >
                                {{ scope.row.count2 }}
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="time"
                          label="收支时间"
                          width="80"
                          sortable="false" 
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="financeUserId"
                          label="财务人"
                          width="125"
                          sortable="false" 
                          align="center"
                           :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="expenditureId"
                          label="收支对方"
                          width="125"
                          sortable="false" 
                          align="center"
                           :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" style="padding:5px 0;position:relative;" class="footer-btn clear"  >
              <div class="left mark-des-word" style="padding:0px 0 0 5px ;" >
                勾选的平账数据以【收支时间/工资时间】正序进行平账
              </div> 
              <span class="right save-cancel-btn" style="padding:3px 10px;margin-right:0;"   @click="cancelData" >取 消</span>
              <span class="right save-cancel-btn" style="padding:3px 10px;" type="primary" @click="saveData" >保 存</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工资" name="wages" >
          <span slot="label"  >工资</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;"  >
              <div class="pop-up-container" style="margin:0px;height: 330px;" >
                <div class="content clear" style="height:100%;" >
                  <div class="list-content account-manage" style="width:100% !important;margin:0;border-width:0px;" >
                    <el-table
                      :data="tableData2"
                      :pagination-show="false"
                      empty-text=" "
                      border
                      height="100%"
                      @selection-change="handleSelectionChange2"
                       ref="table2"
                     
                    >
                     
                        <el-table-column
                         
                          prop="check"
                          label="√"
                          width="30"
                          align="center"
                          type="selection"
                          ref="multipleTable"
                        >
                        </el-table-column>

                        <el-table-column
                          prop="financeUserId"
                          label="部门人员"
                          width="140"
                          sortable="false" 
                          align="center"
                           :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="time"
                          label="工资年月"
                          width="100"
                          sortable="false" 
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="price"
                          label="欠款金额"
                          width="70"
                          sortable="false" 
                          align="right"
                        >
                        <template slot-scope="scope" style="height: 100%;">
                          <div style="color:rgb(0, 204, 102);text-algin:right;"  >
                              {{ scope.row.price }}
                          </div>
                        </template>

                        </el-table-column>


                        <el-table-column
                          prop="count2"
                          label="未平金额"
                          width="70"
                          sortable="false" 
                          align="right"
                        >
                         <template slot-scope="scope" style="height: 100%;">
                            <div style="color:rgb(0, 0, 255);text-algin:right;"  >
                                {{ scope.row.count2 }}
                            </div>
                          </template>

                        </el-table-column>

                        <el-table-column
                          prop="event"
                          label="备注"
                          width="140"
                          sortable="false" 
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="expenditureId"
                          label="操作日志"
                          width="140"
                          sortable="false" 
                          align="center"
                           :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" style="padding:5px 0;position:relative;" class="footer-btn clear"  >
              <div class="left mark-des-word" style="padding:0px 0 0 5px ;" >
                勾选的平账数据以【收支时间/工资时间】正序进行平账
              </div> 
              <span class="right save-cancel-btn" style="padding:3px 10px;margin-right:0;" @click="cancelData" >取 消</span>
              <span class="right save-cancel-btn" style="padding:3px 10px;"  type="primary" @click="saveData1" >保 存</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>

 
  import {financeAccountListType,getfinanceParams} from "../../../service/financeData"; 
  import {financeParam,} from "../../../utils/financeParams";
 
  import {findUserByDepartId} from "../../../service/organizeDate";
  
  export default {
    props:['checkFinance','checkSalary','itemClassTwo','itemClassFour','financeId','preId','expenditureIdType','expenditureDepartId','expenditureUserId','layerid'],
    data() {
      return {
        getActiveName:'budget',
        multipleSelection1:[],
        multipleSelection2:[],
        form:{

        },
        formSearch:{
          departId:'',
          userId:'-1',
        },
        getCheckFinance:this.checkFinance,
        getCheckSalary:this.checkSalary,
        columnData1:financeParam.accountSpecialColumn1,
        columnData2:financeParam.accountSpecialColumn2,
        active1:true,
        active2:false,
       
        tableData1:[],
        tableData2:[],
        departDataparams:[],
        userParams:[],
       
      };
    },
    components:{
    },
    methods:{
        //全选
       handleSelectionChange1(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection1 = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection1.push(item.id);
        });
        _this.multipleSelection1 = Array.from(new Set(_this.multipleSelection1));
      },
      handleSelectionChange2(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection2 = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection2.push(item.id);
        });
        _this.multipleSelection2 = Array.from(new Set(_this.multipleSelection2));
      },
       getParamsData(){
        let _this = this;
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
       
        getfinanceParams().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let departTree = data.departTree;
            if(departTree){
              let arr1 = [];
              for (let i = 0; i < departTree.length; i++) {
                arr1.push({
                  id: departTree[i].id,
                  name: departTree[i].label.replace(/&nbsp;/g, ""),
                  select: departTree[i].select
                });
              }
              _this.departDataparams = arr1;
             
              _this.userParams = [{ id: "-1", name: "全部", select: true }];
              _this.initDataList(1);
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      initDataList(type){
        let _this = this;
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let preId = this.preId;
        let itemClassTwoId = this.itemClassTwo;
        let itemClassFourId = this.itemClassFour;
        let expenditureUserId = this.expenditureUserId;
       
        let getCheckFinance = this.getCheckFinance;
        let getCheckSalary = this.getCheckSalary;

        let financeId = this.financeId;
        if(!financeId){
          financeId = "";
        }
        let form = "";
        
        if(type == 1){
          form = {
            type:type,
            preId:preId,
            financeId:financeId,
            itemClassTwoId:itemClassTwoId,
            itemClassFourId:itemClassFourId,
            expenditureIdType:this.expenditureIdType,
            expenditureDepartId:this.expenditureDepartId,
            userIds:expenditureUserId,
          };
        }else{
          let multipleSelection1 = this.multipleSelection1;
          if(multipleSelection1 && multipleSelection1.length == 0){
            form = {
              type:type,
              preId:preId,
              financeId:financeId,
              itemClassTwoId:itemClassTwoId,
              itemClassFourId:itemClassFourId,
              expenditureIdType:this.expenditureIdType,
              expenditureDepartId:this.expenditureDepartId,
              userIds:expenditureUserId,
            };
          }else{
            let tableData1 = this.tableData1;
            let userIds = [];
            multipleSelection1 = multipleSelection1.toString();
            tableData1.forEach(item => {
              if(multipleSelection1.indexOf(item.id) != -1){
                userIds.push(item.expenditureUserId);
              }
            })
            form = {
              type:type,
              preId:preId,
              financeId:financeId,
              itemClassTwoId:itemClassTwoId,
              itemClassFourId:itemClassFourId,
              userIds:userIds,
            };
          }
          
        }
        
        financeAccountListType(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let list = response.data.list;
            if(type == 1){
              _this.tableData1 = list;
              if(getCheckFinance){
                _this.$nextTick(function () {
                  _this.tableData1.forEach(row => {
                    if(getCheckFinance.indexOf(row.id) != -1){
                      _this.$refs.table1.toggleRowSelection(row, true);
                    }
                  })  
                })
              }  

            }else{
              _this.tableData2 = list;
              if(getCheckSalary){
                _this.$nextTick(function () {
                  _this.tableData2.forEach(row => {
                    if(getCheckSalary.indexOf(row.id) != -1){
                      _this.$refs.table2.toggleRowSelection(row, true);
                    }
                  })  
                })
              }  
            }
           
            
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })  
      },
      changeTab(tab) {
      let _this = this;
      let label = tab.label;
      if (label == "收支") {
        
      } else if (label == "工资") {
        
          this.active2 = true;
          this.initDataList(2);
        
      }
    },
    
     
      clearForm(){
         this.formSearch.departId = '-1';
         this.formSearch.userId = '-1';
      },
      saveData(){
        let _this = this;
        let multipleSelection1 = this.multipleSelection1;
        let multipleSelection2 = this.multipleSelection2;
        if(multipleSelection1 && multipleSelection1.length != 0){
          let tableData1 = this.tableData1;
          let tableData2 = this.tableData2;
          let arr1 = multipleSelection1.toString();
          let arr2 = multipleSelection2.toString();
          let getCheckFinance = arr1;
          let getCheckSalary = arr2;
          let elem1 = null;
          let elem2 = null;
          let financeDes = "";
          let count1 = 0;
          let checkFinanceArr = [];
          let mapDifferent1 = {};
          let expenditureId1 = "";

          let count2 = 0;
          let checkSalaryArr = [];
          let mapDifferent2 = {};
          let expenditureId2 = "";

          tableData1.forEach(item => {
            if(arr1.indexOf(item.id) != -1){
              if(count1 == 0){
                let event = item.event;
                if(!item.event){
                  event = "";
                }
                elem1 = item;
                financeDes = item.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+event;
                count1 = 1;
                mapDifferent1[item.expenditureUserId] = 1; 
                expenditureId1 = item.expenditureUserId;
              }else{
                mapDifferent1[item.expenditureUserId] = mapDifferent1[item.expenditureUserId] +1; 
              }
              checkFinanceArr.push(item);  
            }
          })
          tableData2.forEach(item => {
            if(arr2.indexOf(item.id) != -1){
              let event = item.event;
              if(!item.event){
                event = "";
              }
              if(count2 == 0){
                elem2 = item;
                financeDes = item.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+event;
                count2 = 1;
                mapDifferent2[item.expenditureUserId] = 1; 
                expenditureId2 = item.expenditureUserId;
              }else{
                mapDifferent2[item.expenditureUserId] = mapDifferent2[item.expenditureUserId] +1; 
              }
              checkSalaryArr.push(item);  
            }
          })
          if(((expenditureId1 != "" && expenditureId2 == "") || (expenditureId1 != "" && expenditureId2 != "" && expenditureId1 != expenditureId2)) &&  mapDifferent1[expenditureId1] != multipleSelection1.length ){
             this.myAlert("所选择的被平账数据的收方必须一致，请重新选择！",'dangerous-icon');
             return false;
          }else{
            _this.$parent.setAccountFinanceIdsAndSalaryIds(elem1,elem2,financeDes,checkFinanceArr,checkSalaryArr);
            _this.cancelData();
          }  
        }else{
          this.myAlert("请选择收支","dangerous-icon");
        }
      },
       saveData1(){
        let _this = this;
        let multipleSelection1 = this.multipleSelection1;
        let multipleSelection2 = this.multipleSelection2;
        if(multipleSelection2 && multipleSelection2.length != 0){
          let tableData1 = this.tableData1;
          let tableData2 = this.tableData2;
          let arr1 = multipleSelection1.toString();
          let arr2 = multipleSelection2.toString();
          let getCheckFinance = arr1;
          let getCheckSalary = arr2;
          let elem1 = null;
          let elem2 = null;
          let financeDes = "";
          let count1 = 0;
          let checkFinanceArr = [];
          let mapDifferent1 = {};
          let expenditureId1 = "";

          let count2 = 0;
          let checkSalaryArr = [];
          let mapDifferent2 = {};
          let expenditureId2 = "";

          tableData1.forEach(item => {
            if(arr1.indexOf(item.id) != -1){
              if(count1 == 0){
                let event = item.event;
                if(!item.event){
                  event = "";
                }
                elem1 = item;
                financeDes = item.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+event;
                count1 = 1;
                mapDifferent1[item.expenditureId] = 1; 
                expenditureId1 = item.expenditureUserId;
              }else{
                mapDifferent1[item.expenditureId] = mapDifferent1[item.expenditureId] +1; 
              }
              checkFinanceArr.push(item);  
            }
          })
          tableData2.forEach(item => {
            if(arr2.indexOf(item.id) != -1){
              if(count2 == 0){
                let event = item.event;
                if(!item.event){
                  event = "";
                }
                elem2 = item;
                financeDes = item.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+event;
                count2 = 1;
                mapDifferent2[item.expenditureId] = 1; 
                expenditureId2 = item.expenditureUserId;
              }else{
                mapDifferent2[item.expenditureId] = mapDifferent2[item.expenditureId] +1; 
              }
              checkSalaryArr.push(item);  
            }
          })
          if(((expenditureId1 != "" && expenditureId2 == "") || (expenditureId1 != "" && expenditureId2 != "" && expenditureId1 != expenditureId2)) &&  mapDifferent2[expenditureId2] != multipleSelection2.length ){
             this.myAlert("所选择的被平账数据的收方必须一致，请重新选择！",'dangerous-icon');
             return false;
          }else{
            _this.$parent.setAccountFinanceIdsAndSalaryIds(elem1,elem2,financeDes,checkFinanceArr,checkSalaryArr);
            _this.cancelData();
          }  
        }else{
          this.myAlert("请选择工资","dangerous-icon");
        }
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
      
      
    },
    mounted(){
      this.getParamsData();
    }
  }
</script>

<style lang="scss" scoped>
   .des-word{
    line-height: 28px;
  }
  .search-btn {
    border: 1px solid #797979;
    border-radius: 5px;
    background: #E4E4E4;
    padding: 0px 10px;
    line-height: 18px;
    margin-top: 3px;
    font-size: 12px;
    display: block;
    cursor: pointer;
  }
  .account-manage .el-table--scrollable-x .el-table__body-wrapper {
    height:89% !important;
  }
</style>
