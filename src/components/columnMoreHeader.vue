<template>
  <div style="width: 100%;">
      <div class="pop-up" style="margin: 0px 10px;">
        <div class="pop-up-container" style="height: 346px;border:none;margin: 0px;">
          <div class="move-content list-content clear" >
            <div ref="test" class="left left-column" style="margin: 5px;" >
              <el-table
                :data="tableData"
                empty-text=" "
                :span-method="objectSpanMethod"
                border
                height="330"
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
                      {{ scope.row.index }}
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
                  width="40"
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
              
              <div class="item-earch-btn"  @click="initCheck" >
                默认选中
              </div>
              <div class="item-earch-btn" style="margin-top:60px;" @click="saveData" >
                保存
              </div>
              <div class="item-earch-btn"  @click="clearFormData" >
                取消
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    props:['columnData','sessionStr','culumnTitle','layerid'],
    data() {
      return {
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
        combineRowSpan:[]
      };
    },
    methods: {
      showDialogView(columnData) {
        if(columnData){
          this.initColumnData = columnData;
        }
        this.setListData();
      },
      // 控制合并单元格
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if ([0,1,2].includes(columnIndex)) {
          const _row = this.combineRowSpan[rowIndex] != undefined ? this.combineRowSpan[rowIndex] : 1;
          if(_row > 1 || _row == 0){
            const _col = _row > 0 ? 1 : 0;
            if(columnIndex == 0 || columnIndex == 1){
              return {
                rowspan: _row,
                colspan: 1
              };
            }
          }else{
            if(columnIndex == 0 ){
              return {
                rowspan: _row,
                colspan: 1
              };
            }else if(columnIndex == 2){
              return {
                rowspan: _row,
                colspan: 0
              };
            }else{
              return {
                rowspan: _row,
                colspan: 2
              };
            }
          }
          
        }
      },
      setListData() {
        debugger;
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
            sessionMap[item.id] = item;
          })
          current_data = columnData;
        } else {
          current_data = columnData;
        }

        let arr = [];
        let rowAndColumn = {};
        let columnRowArr = [];
        let countIndex = 0;
        current_data.forEach((item,index) => {
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
          
          
          if(child){
            if(child.length != 0){

              let len = child.length;
              child.forEach((item1,index1) => {
                if(sessionMap){
                  
                  item1.show = sessionMap[item1.id].show;
                  item1.width = sessionMap[item1.id].width;

                }
                if(index1 == 0){
                  countIndex ++;
                  item1.index = countIndex ;
                  columnRowArr.push(len);
                }else{
                  columnRowArr.push(0);
                }
                arr.push(item1);
              })
            }
            
          }else if(item.prop != 'check'){
            countIndex ++;
            item.index = countIndex ;
            if(sessionMap){
              debugger;
              item.fixed = sessionMap[item.id].fixed;
            }
            arr.push(item);
            columnRowArr.push(1);
          }
          
        })
        
        _this.combineRowSpan = columnRowArr;  
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
        let _this = this;
        let current_data = null;
        let storage = window.localStorage;
        let titleData = null;
        let columnData = JSON.parse(JSON.stringify(this.initColumnData));
        let sessionMap = '';
        if (titleData != null) {
          let data = JSON.parse(titleData)
          let column = data.column;
          _this.height = data.height;
          sessionMap = {},
          column.forEach(item =>{
            sessionMap[item.id] = item;
          })
          current_data = columnData;
        } else {
          current_data = columnData;
        }

        let arr = [];
        let rowAndColumn = {};
        let columnRowArr = [];
        let countIndex = 0;
        current_data.forEach((item,index) => {
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
          
          
          if(child){
            if(child.length != 0){

              let len = child.length;
              child.forEach((item1,index1) => {
                if(sessionMap){
                  console.log(sessionMap);
                  console.log(item1.id);
                  item1.show = sessionMap[item1.id].show;
                  item1.width = sessionMap[item1.id].width;
                }
                if(index1 == 0){
                  countIndex ++;
                  item1.index = countIndex ;
                  columnRowArr.push(len);
                }else{
                  columnRowArr.push(0);
                }
                arr.push(item1);
              })
            }
            
          }else if(item.prop != 'check'){
            countIndex ++;
            item.index = countIndex ;
            arr.push(item);
            columnRowArr.push(1);
          }
          
        })
        
        _this.combineRowSpan = columnRowArr;  
        _this.rowAndColumn = rowAndColumn;
        _this.tableData = arr;
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
        let columList = JSON.parse(JSON.stringify(this.initColumnData));
        let arr = [];
        columList.forEach(function(item){
          if(item.prop == 'check' || item.prop == 'icon'){
            arr.push(item);
          }
        })
        let columnData = JSON.stringify({column:arr.concat(_this.tableData),height:Number(height)});
        debugger;
        storage.setItem(this.getSessionStr, columnData);

        this.$parent.reloadListByStorage();
        _this.clearFormData();

      },
      clearFormData() {
        let _this = this;
        _this.$layer.close(_this.layerid);
      },

      swapArr(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      }
    },
    mounted(){
      this.showDialogView(this.columnData);
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
    },
  }
</script>

<style lang="scss" scoped>
  .move-content {
    font-size:12px;
    padding:0px 0 2px 2px;
    /deep/ .el-table th>.cell {
      padding:0;
      text-align:center;
    }

    .up-cion{
      background:url(../images/icon.png) -279px -230px;
      width:21px;
      height:21px;
      display:block;
    }
    .down-cion{
      background:url(../images/icon.png) -193px -195px;
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
      border-image: url("../images/system/border.png")  2 repeat ;
      border-radius:5px;
      width:310px;
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
