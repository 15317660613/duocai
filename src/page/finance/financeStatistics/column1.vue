<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'自选列-'+culumnTitle" width="350px"  @close="clearFormData" :visible.sync="dialogColumn" >
      <div class="pop-up" >
        <div class="pop-up-container  " id="finance-statistics-column" style="height:336px;margin: 10px;">
          <div class="move-content list-content clear">
            <div ref="test" class="left left-column ">
              <el-table
                :data="tableData"
                empty-text=" "
                :span-method="objectSpanMethod"
                border
                height="302"
                highlight-current-row
                :cell-class-name="rowClass"
                @row-click="getRowDataByClick"
              >
                <el-table-column
                  prop="num"
                  label="序号"
                  width="35"
                  align='center'
                >
                  <template slot-scope="scope">
                    <div  >
                      {{ scope.$index+1 }}
                    </div>
                  </template>

                </el-table-column>
                <el-table-column
                  prop="titleLabel"
                  label="列标题"
                  width="80"
                  align='center'
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.label == 'check'" >
                      选中
                    </div>

                    <div v-else >
                      {{scope.row.titleLabel}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="label"
                  label="分列"
                  width="80"
                  align='center'
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
                  align='center'
                >
                  <template slot-scope="scope">
                    <div  >
                      <el-input @blur="inputBlur(scope.row,scope.$index)"   :id="'width_'+scope.$index" maxLength="4" v-show="scope.row.editor"  v-model="scope.row.width" style="width:100%;hight:100%;"></el-input>
                      <span v-show="!scope.row.editor" >{{scope.row.width}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="show"
                  label="显示"
                  width="27"
                  align='center'
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
              <div class="clear" style="padding:10px 0 0 20px;height:10px;" >
               
              </div>
              <div class="clear" style="padding-left:20px;height:10px;" >
               
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
                  <el-input   v-model="height" maxLength="10" title="" autocomplete="off" style="width:40px;" ></el-input>
                </div>
              </div>
              <div class="item-earch-btn" @click="frozenColumn" >
                冻结选中
              </div>
              <div class="item-earch-btn" @click="cancelFrozenColumn" >
                取消冻结
              </div>
              <div class="item-earch-btn" @click="initSort" >
                默认排序
              </div>
              <div class="item-earch-btn"  @click="initCheck" >
                默认选中
              </div>
              <div class="item-earch-btn" style="margin-top:20px;" @click="saveData" >
                保存
              </div>
              <div class="item-earch-btn"  @click="dialogColumn = false" >
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
  export default {
    props:["columnVisible",'columnData','sessionStr','culumnTitle'],
    data() {
      return {
        dialogColumn:this.columnVisible,
        columnDataList:[],
        initColumnData:this.columnData,
        getColumnData:[],
        getSessionStr:this.sessionStr,
        currentRow:'',
        item:'',
        rowAndColumn:{},
        tableData:[],
        checkAll:0,
        height:27,
      };
    },
    methods: {
      showDialogView(columnData,sessionStr) {
        this.dialogColumn = true;
        if(columnData){
          this.initColumnData = columnData;
        }
        this.getSessionStr = sessionStr;
        this.setListData();
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }){

      },
      setListData() {
        let _this = this;
        let current_data = null;
        let storage = window.localStorage;
        let titleData = storage.getItem(this.getSessionStr);
        let columnData = JSON.parse(JSON.stringify(this.initColumnData));
        let sessionMap = '';
        if (titleData != null) {
          let data = JSON.parse(titleData)
          let column = data.column;
          _this.height = data.height;
          sessionMap = {},
          column.forEach(item =>{
            sessionMap[item.setId] = item;
          })
          current_data = columnData;
        } else {
          current_data = columnData;
        }

        let arr = [];
        let rowAndColumn = {};
        current_data.forEach(function (item) {
          item.editor = false;
          let titleLabel = item.titleLabel;
          let count = rowAndColumn[titleLabel];
          if(count == null || count == undefined){
              rowAndColumn[titleLabel] = 1;
          }else {
              count = count + 1;
               rowAndColumn[titleLabel] = count;
          }
          let child = item.child;
          if(child && item.prop != 'totalOne'){
            if(child.length != 0){
              child.forEach(item1 => {
                if(sessionMap){
                  item1.show = sessionMap[item1.id].show;
                  item1.width = sessionMap[item1.id].width;
                }
                arr.push(item1);
              })
            }
          }else if(item.prop != 'check'){
            arr.push(item);
          }
          
          
        })
        _this.rowAndColumn = rowAndColumn;
        _this.tableData = arr;
      },
      changeTableData(item, index, event) {
        this.tableData.forEach(function (item) {
          item.editor = false;
        })
        item.editor = true;
        document.getElementById("width_"+index).focus();
      },
      inputBlur(item) {
        item.editor = false;
        item.width = item.width.replace(/[^\.\d]/g, '');
        if (item.width == '') {
          item.width = 0;
        }
      },
      hideInput(item){
        item.editor = false;
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

      getRowDataByClick(row, event,column) {
        let _this = this
        _this.currentRow = row;
        this.tableData.forEach(function(item){
          item.editor = false;
        })
        if(event.label == "列宽"){
          row.editor = true;
        }

      },
      rowClass({row, index}) {
        let className = "";
        if (row && row.fixed) {
          className =  'frozen-column';
        }
        if(row && this.currentRow && this.currentRow.id == row.id){
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
      initSort(){
        let columnData = JSON.parse(JSON.stringify(this.initColumnData));
        let currentColumn = JSON.parse(JSON.stringify(this.tableData));
        let map = {};
        let arr = [];
        debugger;
        currentColumn.forEach(function(item){
            if(item) {
              map[item.id] = item;
            }
        })
        columnData.forEach(function(item){
          if(map[item.id]) {
            arr.push(map[item.id]);
          }
        })

        this.tableData = arr;
      },
      initCheck(){
        let columnData = JSON.parse(JSON.stringify(this.initColumnData));
        let currentColumn = JSON.parse(JSON.stringify(this.tableData));
        let map = {};
        let arr = [];
        columnData.forEach(function(item){
          if(item) {
            map[item.id] = item;
          }
        })
        currentColumn.forEach(function(item){
          debugger;
          if(item && map[item.id]) {
            item.show = map[item.id].show;
            arr.push(item);
          }
        })
        this.tableData = arr;
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
        debugger;
        let _this = this;
        let storage = window.localStorage;
        let height = this.height;
        let columList = JSON.parse(JSON.stringify(this.initColumnData));
        let arr = [];
        columList.forEach(function(item){
          if(item.prop == 'check' || item.prop == 'icon'){
            arr.push(item);
          }
        })
        let columnData = JSON.stringify({column:arr.concat(_this.tableData),height:Number(height)});

        storage.setItem(this.getSessionStr, columnData);
        this.$emit("reloadListByStorage");
        _this.clickSaveCallback();
       

      },
      clickSaveCallback() {
        this.dialogColumn = false;
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
  #finance-statistics-column {
     .el-table__body-wrapper{
        top:0px;
     }
     .list-content .el-table .el-table__body-wrapper {
        height:100% !important;
        overflow: auto;
     }
  }
  /deep/ .move-content {
    font-size:12px;
    padding:10px 0 2px 2px;
    /deep/ .el-table th>.cell {
      padding:0;
      text-align:center;
    }

    .el-dialog__wrapper{
      height: 276px ;
    }

    .el-dialog__wrapper .el-table{
      height: 302px ;
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
      margin: 10px;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      border-radius:5px;
      width:200px;
      height:307px;
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
