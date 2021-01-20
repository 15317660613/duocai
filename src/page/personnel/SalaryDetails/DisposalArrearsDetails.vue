<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="width:100%;padding:10px 10px 0;" >
      <el-tabs type="border-card" v-model="getActiveName"  @tab-click="changeTab"  >
        <el-tab-pane label="收支" name="Budget"  >
          <span slot="label"  >收支</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;"  >
              <div class="pop-up-container" style="margin:0px;height: 334px;" >
                <div class="content clear" >
                  <div class="list-content mytableclass myspeicalcalss" style="height: 320px !important">
                    <PlTable
                      :datas="tableData1"
                      :pagination-show="false"
                      use-virtual
                      empty-text=" "
                      border
                      ref="table1"
                      height="100%"
                      :row-class-name="tableRowClassName"
                      @row-click="getRowDataByClick1"
                      :cell-class-name="finalCellStyle"
                      @selection-change="handleSelectionChange1"
                      :row-height="rowHeight1"
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
                        </PlTableColumn>

                        <PlTableColumn
                          v-else-if="item.prop == 'user'"
                          :prop="item.prop"
                          :label="item.label"
                          :width="item.width"
                          :type="item.type"
                          :ref="item.ref"
                          :sortable="item.sortable"
                          :show="item.show"
                          :fixed="item.fixed"
                          :align="item.align"
                          >
                          <template slot-scope="scope" style="height: 100%;">
                            <div class="findparentclass" style="color:#336699;text-algin:center;cursor:pointer;font-weight: bold;" @click="editorSalaryDetails(scope.$index, scope.row)" >
                              {{ scope.row.user }}
                            </div>
                          </template>
                        </PlTableColumn>

                        <PlTableColumn
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
                        </PlTableColumn>
                      </template>
                    </PlTable>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" class="footer-btn clear" style="padding: 3px 0px;">
              <span class="m-l-15" style="color: #009933;font-weight: bold;"> 勾选的平账数据以【收支时间/工资年月】正序进行平账 </span>
              <span class="right save-cancel-btn" style="padding: 3px 10px;" @click="cancelData" >取 消</span>
              <span v-if="inputtrueorfalse"  class="right save-cancel-btn" style="padding: 3px 10px;color: #999;">保 存</span>
              <span v-if="!inputtrueorfalse" class="right save-cancel-btn" style="padding: 3px 10px;" type="primary" @click="saveFormData" >保 存</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工资" name="wages" >
          <span slot="label"  >工资</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;"  >
              <div class="pop-up-container" style="margin:0px;height: 334px;" >
                <div class="content clear" >
                  <div class="list-content mytableclass myspeicalcalss" style="height: 320px!important">
                    <PlTable
                      :datas="tableData2"
                      :pagination-show="false"
                      use-virtual
                      empty-text=" "
                      border
                      height="100%"
                      ref="table2"
                      :row-class-name="tableRowClassName"
                      @row-click="getRowDataByClick2"
                      :cell-class-name="finalCellStyle"
                      @selection-change="handleSelectionChange2"
                      :row-height="rowHeight2"
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

                        </PlTableColumn>

                        <PlTableColumn
                          v-else-if="item.prop == 'user'"
                          :prop="item.prop"
                          :label="item.label"
                          :width="item.width"
                          :type="item.type"
                          :ref="item.ref"
                          :sortable="item.sortable"
                          :show="item.show"
                          :fixed="item.fixed"
                          :align="item.align"
                          show-overflow-tooltip
                        >
                          <template slot-scope="scope" style="height: 100%;">
                            <div class="findparentclass" style="color:#336699;text-algin:center;cursor:pointer;" @click="editorSalaryDetails(scope.$index, scope.row)" >
                              {{ scope.row.user }}
                            </div>
                          </template>
                        </PlTableColumn>

                        <PlTableColumn
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
                          show-overflow-tooltip
                        >

                        </PlTableColumn>
                      </template>
                    </PlTable>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" class="footer-btn clear" style="padding: 3px 0px;">
              <span class="m-l-15" style="color: #009933;font-weight: bold;"> 勾选的平账数据以【收支时间/工资年月】正序进行平账 </span>
              <span class="right save-cancel-btn" style="padding: 3px 10px;" @click="cancelData" >取 消</span>
              <span v-if="inputtrueorfalse"  class="right save-cancel-btn" style="padding: 3px 10px;color: #999;">保 存</span>
              <span v-if="!inputtrueorfalse" class="right save-cancel-btn" style="padding: 3px 10px;" type="primary" @click="saveFormData" >保 存</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {SalaryDetailsList} from '../../../utils/SalaryDetailsList'
  import { PlTable, PlTableColumn } from 'pl-table';
  //获取数据
  import { financeExpendituregetReconciliationList2,userSalaryUpdate } from "../../../service/SalaryDetails";
  import {findUserByDepartId,departTree2} from "../../../service/organizeDate";
  
  export default {
    props:['userId','departId','layerid','id','thisnum','inputtrueorfalse','thisfinanceIds','thissalaryIds'],
    data() {
      return {
        getActiveName:'Budget',
        form:{

        },
        activeTag1:true,
        activeTag2:false,
        tableData1:[],
        thisnum1:0,
        thisnum2:0,
        totalnum1:0,
        totalnum2:0,
        rowHeight1:27,
        columnData1:SalaryDetailsList.DisposalArrearsBudget,
        tableData2:[],
        rowHeight2:27,
        columnData2:SalaryDetailsList.DisposalArrearswages,
        departdataParams:[],
        departpersondataParams:[],
        multipleSelection1:[],
        multipleSelection2:[],
        currentNum:0,
        currentPage:'',
      };
    },
    components:{
      PlTable, 
      PlTableColumn
    },
    methods:{
      changeTab(){
        // if(this.getActiveName=="wages"&&this.activeTag2==false){
        //   this.searctabledatafunc();
        //   this.activeTag2=true;
        // };
      },
      searctabledatafunc1(){
        let _this = this;
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {
          userId:_this.userId,
          debtId:_this.id,
          type:'1',
        };
        financeExpendituregetReconciliationList2(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.tableData1 = data.list;
            if(_this.thisfinanceIds){
              _this.multipleSelection1 = _this.thisfinanceIds.split(',');
            }else{
              _this.multipleSelection1 = [];
            }
            
            _this.tableData1.forEach(item=>{
              if(_this.multipleSelection1.indexOf(item.id)!=-1){
                _this.$nextTick(function () {
                　　_this.$refs.table1.toggleRowSelection([{row:item, selected:true}]);
                })
              }
            })
          // debugger;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      searctabledatafunc2(){
        let _this = this;
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {
          userId:_this.userId,
          debtId:_this.id,
          type:'2',
        };
        financeExpendituregetReconciliationList2(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.tableData2 = data.list;
            if(_this.thissalaryIds){
              _this.multipleSelection2 = _this.thissalaryIds.split(',');
            }else{
              _this.multipleSelection2 = [];
            }

            _this.tableData2.forEach(item=>{
              if(_this.multipleSelection2.indexOf(item.id)!=-1){
                _this.$nextTick(function () {
                　　_this.$refs.table2.toggleRowSelection([{row:item, selected:true}]);
                })
              }
            })
          // debugger;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
      saveFormData(){
        let _this = this;
        let choosed1 = _this.multipleSelection1.length;
        let choosed2 =_this.multipleSelection2.length;
        if(choosed1||choosed2){
          if(Number(_this.totalnum1)+Number(_this.totalnum2) < Number(_this.thisnum)){
            _this.myAlert("主平账数值不能大于所勾选被平账数据的未平账部分的绝对值总和!", "dangerous-icon");
            return false;
          }
          _this.$parent.fathermethods(
            _this.id,
            _this.multipleSelection1.toString(),
            _this.multipleSelection2.toString(), 
            Number(_this.thisnum1)+Number(_this.thisnum2),
            Number(_this.totalnum1)+Number(_this.totalnum2)
          );
        }else{
          _this.myAlert("请选择需要平账的数据!", "dangerous-icon");
          return false;
        }
        _this.$layer.close(_this.layerid);
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex;
      },
      getRowDataByClick1 (row, column, event) {
        let _this = this;
        _this.radioId1 = row.id;
        _this.thisnum1 = row.count;
        _this.totalnum1 = row.price;
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
      },
      getRowDataByClick2 (row, column, event) {
        let _this = this;
        _this.radioId2 = row.id;
        _this.thisnum2 = row.count;
        _this.totalnum2 = row.price;
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
      },
      finalCellStyle({row, column, rowIndex, columnIndex}){
        if(column.property == "user"){
          return 'usertdstyle'
        }
      },
      //全选(收支)
      handleSelectionChange1(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection1 = [];
        _this.thisnum1 = 0;
        _this.totalnum1 = 0;
        elemCheckbox.forEach(item => {
          _this.multipleSelection1.push(item.id);
          _this.thisnum1 = Number(_this.thisnum1) + Number(item.count);
          _this.totalnum1 = Number(_this.totalnum1) + Number(item.price);
        });
        _this.multipleSelection1 = Array.from(new Set(_this.multipleSelection1));
        console.log(_this.multipleSelection1);
      },
      //全选(工资)
      handleSelectionChange2(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection2 = []
        _this.thisnum2 = 0;
        _this.totalnum2 = 0;
        elemCheckbox.forEach(item => {
          _this.multipleSelection2.push(item.id);
          _this.thisnum2 = Number(_this.thisnum2) + Number(item.count);
          _this.totalnum2 = Number(_this.totalnum2) + Number(item.price);
        });
        _this.multipleSelection2 = Array.from(new Set(_this.multipleSelection2));
      },
    },
    mounted(){
      this.searctabledatafunc1();
      this.searctabledatafunc2();
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
  /deep/ .mytableclass .el-table .el-table__body-wrapper{
    height: calc(100vh - 765px) !important;
     .el-table__virtual-wrapper{
       height:100% !important;
     }
  }
  /deep/ .el-input__inner{
    padding-right: 0px!important;
  }
  /deep/ .myspeicalcalss .el-table .el-table__body-wrapper{
    height: 288px!important;
  }
</style>
