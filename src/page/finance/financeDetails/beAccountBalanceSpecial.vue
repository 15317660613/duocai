<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="width:100%;padding:10px 10px 10px;" >
      <el-tabs type="border-card" v-model="getActiveName"  @tab-click="changeTab"  >
        <el-tab-pane label="收支" name="budget"  >
          <span slot="label"  >收支</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;"  >
              <div class="pop-up-container" style="margin:0px;height: 355px;" >
                <div class="content clear" style="height:100%;" >
                  <div class="list-content account-manage" style="width:100% !important;margin:0;border-width:0px;" >
                    <el-table
                      :data="tableData1"
                      :pagination-show="false"
                      empty-text=" "
                      border
                      height="100%"
                     
                    >
                      
                       
                        
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
                          label="金额"
                          width="80"
                          sortable="false" 
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
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="工资" name="wages" >
          <span slot="label"  >工资</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;"  >
              <div class="pop-up-container" style="margin:0px;height: 355px;" >
                <div class="content clear" style="height:100%;" >
                  <div class="list-content account-manage" style="width:100% !important;margin:0;border-width:0px;" >
                    <el-table
                      :data="tableData2"
                      :pagination-show="false"
                      empty-text=" "
                      border
                      height="100%"
                     
                    >
                     <el-table-column
                        prop="financeUserId"
                        label="部门人员"
                        width="160"
                        sortable="false" 
                        align="center"
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
                        label="金额"
                        width="100"
                        sortable="false" 
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
                        width="200"
                        sortable="false" 
                        align="center"
                      >
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>

 
  import {financeBeAccountListType,getfinanceParams} from "../../../service/financeData"; 
  import {financeParam,} from "../../../utils/financeParams";
 
  import {findUserByDepartId} from "../../../service/organizeDate";
  
  export default {
    props:['checkFinance','checkSalary','itemClassTwo','itemClassFour','preId','expenditureIdType','expenditureDepartId','expenditureUserId','layerid'],
    data() {
      return {
        getActiveName:'budget',
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
        debugger;
        if(type == 2){
          let tableData1 = this.tableData1;
          let getCheckFinance = this.getCheckFinance;
          if(getCheckFinance){
            tableData1.forEach(item => {
              if(getCheckFinance == item.id){
                if(!expenditureUserId){
                  expenditureUserId = item.expenditureUserId;
                }
              }
            })
          }
        }else{
          let tableData2 = this.tableData2;
          let getCheckSalary = this.getCheckSalary;
          if(getCheckSalary){
            tableData2.forEach(item => {
              if(getCheckSalary == item.id){
                if(!expenditureUserId){
                  expenditureUserId = item.expenditureUserId;
                }
              }
            })
          }
        }
       
        let form = {
          type:type,
          id:preId,
          
        };
        financeBeAccountListType(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let list = response.data.list;
            if(type == 1){
               _this.tableData1 = list;
            }else{
               _this.tableData2 = list;
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
         this.initDataList(1);
        this.active1 = true;
      } else if (label == "工资") {
        
          this.active2 = true;
          this.initDataList(2);
      }
    },
      selectChangemethods(){
        let _this = this;
        let id = this.formSearch.departId;
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let user = data.user;
              let arr = [{id:'-1',name:'全部'}];
              if(user && user.length != 0){
                user.forEach(function(item){
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                    phone:item.phone,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                })
              }
            _this.userParams = arr;
            _this.formSearch.userId = '-1'; 
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })

      },
      searchData(){
        let _this = this;
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let preId = this.preId;
        let itemClassTwoId = this.itemClassTwo;
        let itemClassFourId = this.itemClassFour;
        let userId = this.formSearch.userId;
        let departId = this.formSearch.departId;
        let getActiveName = this.getActiveName;
        let type = 1;
        if(getActiveName == 'wages'){
          type = 2;
        }
        let form = {type:type,preId:preId,itemClassTwoId:itemClassTwoId,itemClassFourId:itemClassFourId,departId:departId,userId:userId};
        if(userId == '-1'){
          form = {type:type,preId:preId,itemClassTwoId:itemClassTwoId,itemClassFourId:itemClassFourId};
        }
        financeAccountListType(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let list = response.data.list;
            debugger;
            if(getActiveName == 'wages'){
                _this.tableData2 = list;
            }else{
                 _this.tableData1 = list;
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })  
          
      },
      clearForm(){
         this.formSearch.departId = '-1';
         this.formSearch.userId = '-1';
      },
      saveData(){
        let _this = this;
        let getCheckFinance = this.getCheckFinance;
        let getCheckSalary = this.getCheckSalary;
        if(getCheckFinance){
          let tableData1 = this.tableData1;
          let tableData2 = this.tableData2;

          let elem1 = null;
          let elem2 = null;
          let financeDes = "";
          tableData1.forEach(item => {
            if(item.id == getCheckFinance){
              elem1 = item;
              financeDes = item.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+item.event;
            }
          })
          tableData2.forEach(item => {
            if(item.id == getCheckSalary){
              elem2 = item;
              financeDes = item.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+item.event;
            }
          })

          _this.$parent.setAccountFinanceIdsAndSalaryIds(elem1,elem2,financeDes);
          _this.cancelData();
        }else{
          this.myAlert("请选择收支","dangerous-icon");
        }
      },
       saveData1(){
        let _this = this;
        let getCheckFinance = this.getCheckFinance;
        let getCheckSalary = this.getCheckSalary;
        if(getCheckSalary){
          let tableData1 = this.tableData1;
          let tableData2 = this.tableData2;

          let elem1 = null;
          let elem2 = null;
          let financeDes = "";
          tableData1.forEach(item => {
            if(item.id == getCheckFinance){
              elem1 = item;
              financeDes = itme.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+item.event;
            }
          })
          tableData2.forEach(item => {
            if(item.id == getCheckSalary){
              elem2 = item;
              financeDes = itme.financeUserId  +"   "+ item.time +"    "+ item.price +"    "+item.event;
            }
          })

          _this.$parent.setAccountFinanceIdsAndSalaryIds(elem1,elem2,financeDes);
          _this.cancelData();
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
