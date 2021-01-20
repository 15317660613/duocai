<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="自选列" width="340px" height="250px" @close="clearFormData" :visible.sync="phycolumn" >
      <div class="pop-up" >
        <div class="pop-up-container " >
          <div class="move-content list-content clear" >
            <div ref="test" class="left left-column"  >
              <el-table
                :data="tableData"
                empty-text=" "
                border
                height="376"
                highlight-current-row
                :cell-class-name="rowClass"
                @row-click="getRowDataByClick"
              >
                <el-table-column
                  prop="num"
                  label="序号"
                  width="35"

                >
                  <template slot-scope="scope">
                    <div  >
                      {{ scope.$index+1 }}
                    </div>
                  </template>

                </el-table-column>
                <el-table-column
                  prop="label"
                  label="列表标题"
                  width="70"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.label == 'check'" >
                      选中
                    </div>

                    <div v-else >
                      {{scope.row.label}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="width"
                  label="列宽"
                  width="45"
                >
                  <template slot-scope="scope">
                    <div @click="changeTableData(scope.row,scope.$index,$event)" >
                      <el-input @blur="inputBlur(scope.row)"  :ref="'width'+scope.$index" maxLength="4" v-show="scope.row.editor"  v-model="scope.row.width" style="width:100%;hight:100%;"></el-input>
                      <span v-show="!scope.row.editor" >{{scope.row.width}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="show"
                  label="显示"
                  width="40"
                >
                  <template slot-scope="scope">

                    <div  >
                      <el-checkbox
                        :checked="scope.row.show"
                        v-model="scope.row.show">
                      </el-checkbox>
                    </div>
                  </template>
                </el-table-column>


              </el-table>

            </div>
            <div class="right right-column" >
              <div class="clear" style="padding:10px 0 0 20px;" >
                <i class="up-cion" @click="upColumn" ></i>
              </div>
              <div class="clear" style="padding-left:20px;" >
                <i class="down-cion"  @click="downColumn" ></i>
              </div>
              <div class="clear" style="padding-top:5px;" >
                <div class="left" >
                  <el-checkbox  v-model="checkAll" @change="checkAllData"  :false-label="0" :true-label="1"  ></el-checkbox>
                </div>
                <div class="left" style="padding-left:5px;line-height:18px;" >
                  <span>全选</span>
                </div>
              </div>
              <div class="clear" style="padding-top:10px;" >
                <div class="left" style="padding-right:5px;line-height:18px;" >
                  <span>行高</span>
                </div>
                <div class="left" >
                  <el-input   v-model="input" maxLength="10" title="" autocomplete="off" style="width:40px;" ></el-input>
                </div>
              </div>
              <div class="item-earch-btn" @click="frozenColumn" >
                冻结选中
              </div>
              <div class="item-earch-btn" @click="cancelFrozenColumn" >
                取消冻结
              </div>
              <div class="item-earch-btn" >
                默认排序
              </div>
              <div class="item-earch-btn" >
                默认选中
              </div>
              <div class="item-earch-btn" style="margin-top:60px;" @click="saveData" >
                保存
              </div>
              <div class="item-earch-btn"  @click="phycolumn = false" >
                取消
              </div>
            </div>
          </div>
        </div>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  import {departmentParam} from '../../../utils/departparam'
  export default {
    name: 'phyclumn',
    props:['columnData'],
    data(){
      return{
        phycolumn:false,
        columnDataList:this.columnData,
        currentRow:'',
        item:'',
        tableData:[],
        checkAll:0,
        input:'',

      }
    },
    methods:{
      physhow(){
        this.phycolumn=true
        this.setListData();
      },
      setListData() {
        let _this = this;
        let current_data = null;
        let storage = window.localStorage;
        let titleData = storage.getItem("phy-list");
        let columnData =departmentParam.phyColumn;
        if (titleData != null) {
          let column = JSON.parse(titleData).column;
          _this.height = column.height;
          current_data = column;
        } else {
          current_data = columnData;
        }
        current_data.forEach(function (item) {
          item.editor = false;
        })
        _this.tableData = current_data;
      },
      changeTableData(item, index, event) {
        this.tableData.forEach(function (item) {
          item.editor = false;
        })
        item.editor = true;
      },
      inputBlur(item) {
        item.editor = false;
        item.width = item.width.replace(/[^\.\d]/g, '');
        if (item.width == '') {
          item.width = 0;
        }
      },
      checkAllData(){
        let check = this.checkAll;
        if(check == 1){
          this.tableData.forEach(function(item){
            item.show = true;
          })
        }else{
          this.tableData.forEach(function(item){
            item.show = false;
          })
        }
      },

      getRowDataByClick(row, column, event) {
        let _this = this
        _this.currentRow = row;

      },
      rowClass({row, index}) {
        let className = "";
        if (row.fixed) {
          className =  'frozen';
        }
        if(this.currentRow && this.currentRow.id == row.id){
          className  = className + " check"
        }
        return className;
      },
      upColumn() {
        let _this = this;
        let row = this.currentRow;
        let upRow = '';
        let count = '';
        let count1 = '-1';
        let list = JSON.parse(JSON.stringify(_this.tableData));
        list.forEach(function(item,index){
          if(row.id == item.id){
            count = index;
            return false;
          }
        })
        if(count  != 0){
          count1 =count -1;
        }
        if(count1 != '-1'){
          let arr = this.swapArr(list,count,count1);
          _this.tableData = arr;
        }

      },
      downColumn() {
        let _this = this;
        let row = this.currentRow;
        let downRow = '';
        let count = '';
        let count1 = '-1';
        let list = JSON.parse(JSON.stringify(_this.tableData));
        list.forEach(function(item,index){
          if(row.id == item.id){
            count = index;
            return false;
          }
        })
        if(count  != list.length){
          count1 = count +1;
        }
        if(count1 != '-1'){
          let arr = this.swapArr(list,count1,count);
          _this.tableData = arr;
        }
      },
      frozenColumn() {
        let row = this.currentRow;
        let arr = [];
        if (row) {
          this.tableData.forEach(function (item) {

            if (item.id == row.id) {
              item.fixed = true;
            } else {
              item.fixed = false;
            }
            arr.push(item);
          })
          this.tableData = arr;
        }
      },
      cancelFrozenColumn() {
        let arr = [];
        this.tableData.forEach(function (item) {
          item.fixed = false;
          arr.push(item);
        })
        this.tableData = arr;
        this.currentRow = '';
      },
      saveData() {
        let _this = this;
        let storage = window.localStorage;
        let height = this.height;
        let columnData = JSON.stringify({column:_this.tableData,height:height});
        storage.setItem("phy-list", columnData);
        _this.clickSaveCallback();
        this.$emit("reloadList");

      },
      clickSaveCallback() {
        this.phycolumn = false;
        this.clearFormData();
      },
      clearFormData() {

      },

      swapArr(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      }





    }

  }
</script>

<style lang="scss" scoped>
  .move-content {
    font-size:12px;
    padding:10px 0 2px 2px;
    /deep/ .el-table th>.cell {
      padding:0;
      text-align:center;
    }
    .up-cion{
      background:url(../../../images/icon.png) -279px -230px;
      width:21px;
      height:21px;
      display:block;
    }
    .down-cion{
      background:url(../../../images/icon.png) -193px -195px;
      width:21px;
      height:21px;
      display:block;
    }
    .title-word{
      line-height:20px;
      font-size:12px;
    }
    .left-column{
      margin: 10px auto 0px;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      border-radius:5px;
      width:190px;
      height:380px;
      margin-bottom:10px;
    }
    .right-column{

      padding-right:8px;
      .item-earch-btn{
        width: 70px;
        font-size: 12px;
        border: 1px solid #797979;
        line-height: 21px;
        margin-top: 10px;
        text-align: center;
        border-radius: 3px;
        cursor:pointer;
      }
    }
  }
</style>
