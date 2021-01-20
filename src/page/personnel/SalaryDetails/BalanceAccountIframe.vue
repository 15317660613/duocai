<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="width:100%;padding:10px 10px;" >
      <el-tabs type="border-card" v-model="getActiveName"  @tab-click="changeTab"  >
        <el-tab-pane label="收支" name="Budget"  >
          <span slot="label"  >收支</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;"  >
              <div class="pop-up-container" style="margin:0px;height: 360px;" >
                <div class="content clear" >
                  <div class="list-content mytableclass myspeicalcalss" style="height: 346px!important">
                    <PlTable
                      :datas="tableData1"
                      :pagination-show="false"
                      use-virtual
                      empty-text=" "
                      border
                      height="100%"
                      :row-height="rowHeight"
                    >
                      <template v-if="item.show" v-for="(item,index) in columnData1" >
                        
                        <PlTableColumn
                          v-if="item.prop == 'check'"
                          :prop="item.prop"
                          :label="item.label"
                          :width="item.width"
                          :type="item.type"
                          :ref="item.ref"
                          :sortable="item.sortable" 
                          :align="item.align"
                          >
                          <template slot-scope="scope" style="height: 100%;">
                            <el-radio :label="scope.row.id" v-model="radioId1">&nbsp;</el-radio>
                          </template>
                        </PlTableColumn>
                        <pl-table-column
                          v-else-if="item.prop=='price'"
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
                          >
                          <template slot-scope="scope" style="height: 100%;">
                            <span style="color: #00cc66;">+{{scope.row.price}}</span>
                          </template>
                        </pl-table-column>
                        <pl-table-column
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
                          >
                        </pl-table-column>
                      </template>
                    </PlTable>
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
              <div class="pop-up-container" style="margin:0px;height: 360px;" >
                <div class="content clear" >
                  <div class="list-content mytableclass myspeicalcalss" style="height: 346px!important">
                    <PlTable
                      :datas="tableData2"
                      :pagination-show="false"
                      use-virtual
                      empty-text=" "
                      border
                      height="100%"
                      :row-height="rowHeight"
                    >
                      <template v-if="item.show" v-for="(item,index) in columnData2" >


                        <PlTableColumn
                          v-if="item.prop == 'check'"
                          :prop="item.prop"
                          :label="item.label"
                          :width="item.width"
                          :type="item.type"
                          :ref="item.ref"
                          :sortable="item.sortable" 
                          :align="item.align"
                          >
                          <template slot-scope="scope" style="height: 100%;">
                            <el-radio :label="scope.row.id" v-model="radioId1">&nbsp;</el-radio>
                          </template>
                        </PlTableColumn>

                        <pl-table-column
                          v-else-if="item.prop=='price'"
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
                          >
                          <template slot-scope="scope" style="height: 100%;">
                            <span style="color: #cc3300;">{{scope.row.price}}</span>
                          </template>
                        </pl-table-column>

                        <pl-table-column
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
                          >
                        </pl-table-column>
                      </template>
                    </PlTable>
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

  import {SalaryDetailsList} from '../../../utils/SalaryDetailsList'
  import { PlTable, PlTableColumn } from 'pl-table';

  //获取数据
  import { financeExpendituregetBeReconciliationList2,userSalaryUpdate } from "../../../service/SalaryDetails";
  import {findUserByDepartId} from "../../../service/organizeDate";
  
  export default {
    props:['rowdata'],
    data() {
      return {
        getActiveName:'Budget',
        tableData1:[],
        tableData2:[],
        activeTag1:true,
        activeTag2:false,
        rowHeight:27,
        columnData1:SalaryDetailsList.BalanceAccountIframeBudget,
        columnData2:SalaryDetailsList.BalanceAccountIframewages,
      };
    },
    components:{
      PlTable,
      PlTableColumn,
    },
    methods:{

      changeTab(){
        if(this.getActiveName=="wages"&&this.activeTag2==false){
          this.searctabledatafunc();
          this.activeTag2=true;
        };
        
      },

      searctabledatafunc(){
        let _this = this;
        console.log(_this.rowdata);
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {};
        if(_this.getActiveName=='Budget'){
          form.id = _this.rowdata.id;
          form.type = '1';
        }else{
          form.type = '2';
          form.id = _this.rowdata.id;
        }
        
        financeExpendituregetBeReconciliationList2(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            if(_this.getActiveName=='Budget'){
              _this.tableData1 = data.list;
              _this.radioId1 = _this.thisradioId1;
              _this.tableData1.forEach(item=>{
                if(item.id == _this.radioId1){
                  _this.thisnum1 = item.count;
                }
              })
            }else{
              _this.tableData2 = data.list;
              _this.radioId2 = _this.thisradioId2;

              _this.tableData2.forEach(item=>{
                if(item.id == _this.radioId2){
                  _this.thisnum2 = item.count;
                  
                }
              })
            }
          // debugger;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
    },
    mounted(){
      this.searctabledatafunc();
    }
  }
</script>
<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>

<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>
<style lang="scss" scoped>
  /deep/ .el-select .el-input .el-select__caret{
    height: 40px;
  }
  .mydes-word{
    line-height: 40px;
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
  .el-form-item{
    margin-bottom: 0px;
  }
  /deep/ .usertdstyle .pl-table-beyond{
    height: 100%;
  }
  /deep/ .el-input__inner{
    padding-right: 0px!important;
  }
</style>
