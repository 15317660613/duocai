<template>
  <div>
    <div class="pop-up" >
      <div class="pop-up-container" >

          <div class="clear " >
            <div class="left list-left-table " style="margin-right:15px;" >
              <div class="clear left-search" >
                <div class="left word2" >
                    楼层号
                </div >
                <div class="left" >
                  <el-form-item   >
                    <el-select v-model="form.plies1"      style="width:40px;" >
                      <el-option v-for="item in getPliesNumber" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left word2" >
                  -
                </div >
                <div class="left" >
                  <el-form-item   >
                    <el-select v-model="form.plies2"      style="width:40px;" >
                      <el-option v-for="item in getPliesNumber" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left word2" @click="lookThrouthPlies" >
                  预览
                </div >

              </div>
              <div class="list-content list-container" >
                <div class="list-table " >
                  <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    height="300px"
                    ref="table"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column
                      type="selection"
                      width="30"
                      ref="multipleTable">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="楼层号"
                      width="80"
                    >
                    </el-table-column>

                  </el-table>
                </div>
              </div>

            </div>
            <div class="left list-right-table left-border" style="padding-left:15px;" >
              <div class="clear left-search" >
                <div class="left word2" >
                  平层号
                </div >
                <div class="left" >
                  <el-form-item   >
                    <el-input v-model="form.doorNum1" autocomplete="off" style="width:40px;"></el-input>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left word2" >
                  -
                </div >
                <div class="left" >
                  <el-form-item   >
                    <el-input v-model="form.doorNum2" autocomplete="off" style="width:40px;"></el-input>
                  </el-form-item>
                </div>
                <div class="left word2" @click="lookThrouthDoor" >
                  预览
                </div >
              </div>
              <div class="list-content list-container" >
                <div class="list-table " >
                  <el-table
                    :data="tableData1"
                    border
                    ref="table1"
                    height="300px"
                    highlight-current-row
                    @row-click="dbClickEditor"
                    @selection-change="handleSelectionChange1"
                  >
                    <el-table-column
                      type="selection"
                      width="30"
                      ref="multipleTable1">

                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="平层号"
                      width="80"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="room"
                      label="房"
                      width="40"
                      >
                      <template slot-scope="scope">
                        <div>
                          <el-input :id="'room_'+scope.row.id" maxLength="2"  v-if="scope.row.edite1"  @blur="hideInput(scope.row,1)" @change="changeTableData" v-model="scope.row.room" style="width:100%;hight:100%;"></el-input>
                          <span v-else>{{scope.row.room}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="hall"
                      label="厅"
                      width="40"
                     >
                      <template slot-scope="scope">
                        <div>
                          <el-input :id="'hall_'+scope.row.id" maxLength="2"  v-if="scope.row.edite2"  @blur="hideInput(scope.row,2)" @change="changeTableData" v-model="scope.row.hall" style="width:100%;hight:100%;"></el-input>
                          <span v-else>{{scope.row.hall}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="wei"
                      label="卫"
                      width="40"
                     >
                      <template slot-scope="scope">
                        <div>
                          <el-input :id="'wei_'+scope.row.id" maxLength="2"  v-if="scope.row.edite3"  @blur="hideInput(scope.row,3)" @change="changeTableData" v-model="scope.row.wei" style="width:100%;hight:100%;"></el-input>
                          <span v-else>{{scope.row.wei}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="balcony"
                      label="阳"
                      width="40"
                    >
                      <template slot-scope="scope">
                        <div>
                          <el-input :id="'balcony_'+scope.row.id" maxLength="2" v-if="scope.row.edite4"  @blur="hideInput(scope.row,4)" @change="changeTableData" v-model="scope.row.balcony" style="width:100%;hight:100%;"></el-input>
                          <span v-else>{{scope.row.balcony}}</span>
                        </div>
                      </template>
                    </el-table-column>
                      <el-table-column
                        prop="buildArea"
                        label="建筑面积"
                        width="85"
                       >
                        <template slot-scope="scope">
                          <div>
                            <el-input :id="'buildArea_'+scope.row.id" maxLength="10"  v-if="scope.row.edite5" @blur="hideInput(scope.row,5)" @change="changeTableData" v-model="scope.row.buildArea" style="width:100%;hight:100%;"></el-input>
                            <span v-else>{{scope.row.buildArea}}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="inArea"
                        label="套内面积"
                        width="85"
                        >
                        <template slot-scope="scope">
                          <div>
                            <el-input :id="'inArea_'+scope.row.id" maxLength="10"  v-if="scope.row.edite6" @blur="hideInput(scope.row,6)"  @change="changeTableData" v-model="scope.row.inArea" style="width:100%;hight:100%;"></el-input>
                            <span v-else>{{scope.row.inArea}}</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="orientation"
                        label="朝向"
                        width="60"
                        >
                        <template slot-scope="scope">
                          <div>
                            <el-select
                              v-model="scope.row.orientation"
                              @change="changeTableData"
                               
                            >
                              <el-option v-for="item in orientationParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>

                          </div>
                        </template>
                      </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer clear">
      <div class="left word-special" >
        共有【0】个房号，和已有重复【0】个房号，已选中【0】个房号
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    props:["pliesNumber","doorNumber"],
    data() {
      return {
        dialogNewSchool:false,
        textarea2:"",
        getPliesNumber:this.pliesNumber,
        getDoorNumber:this.doorNumber,
        roomNumber:0,
        tableData:[],
        tableData1:[],
        multipleSelection:[],
        multipleSelection1:[],
        orientationParams:[],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          plies1:'1',
          plies2:'',
          doorNum1:1,
          doorNum2:1,
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '100px'
      };
    },
    components:{

    },
    methods:{
      modifyNumber(num1,num2,roomNumber,orientationParams){
        let _this = this;
        debugger;
        this.getPliesNumber = num1;
        this.getDoorNumber = num2;
        this.form.doorNum2 = num2;
        this.roomNumber = roomNumber;
        this.orientationParams = orientationParams;
        this.form.plies2 = num1;
        this.lookThrouthPlies();
        this.lookThrouthDoor();
      },
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },
      handleSelectionChange1(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection1 = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection1.push(item.id);
        });
        _this.multipleSelection1 = Array.from(new Set(_this.multipleSelection1));
      },
      //预览
      lookThrouthPlies(){

        let _this = this;
        let arr = [];
        let plies1 = _this.form.plies1;

        let plies2= _this.form.plies2;
        if(plies1){
          plies1 = plies1*1;
        }
        if(plies2){
          plies2 = plies2*1;
        }
        if(plies1 && plies2) {
          for (let i = plies1; i <= plies2; i++) {
            arr.push({id: i, name: i,});
          }
          _this.tableData = arr;
        }
        this.$nextTick(function () {
          this.tableData.forEach(row => {
            _this.$refs.table.toggleRowSelection(row,true);
          })
        })

      },
      selectAll(){

      },
      lookThrouthDoor(){
        let _this = this;
        let arr = [];
        let doorNum1 = _this.form.doorNum1;

        let doorNum2= _this.form.doorNum2;
        if(doorNum1){
          doorNum1 = doorNum1*1;
        }
        if(doorNum2){
          doorNum2 = doorNum2*1;
        }
        if(doorNum1 && doorNum2) {
          for (let i = doorNum1; i <= doorNum2; i++) {
            arr.push({
              id:i,
              name:i,
              room:'',
              hall:'',
              wei:'',
              balcony:'',
              buildArea:'',
              inArea:'',
              orientation:'',
              edite1:false,
              edite2:false,
              edite3:false,
              edite4:false,
              edite5:false,
              edite6:false,
            });
          }
          _this.tableData1 = arr;
        }
        this.$nextTick(function () {
          this.tableData1.forEach(row => {
            _this.$refs.table1.toggleRowSelection(row,true);
          })
        })
      },
      dbClickEditor(row, event,column){
        let _this = this;
        this.tableData1.forEach(function(item){
          item.edite1 = false;
          item.edite2 = false;
          item.edite3 = false;
          item.edite4 = false;
          item.edite5 = false;
          item.edite6 = false;
        })
        if(event.label == "房"){
          row.edite1 = true;

          this.$nextTick(function () {
            document.getElementById("room_" + row.id).focus();
          })
        }else if(event.label == "厅"){

          row.edite2 = true;
          this.$nextTick(function () {
            document.getElementById("hall_" + row.id).focus();
          })
        }else if(event.label == "卫"){

          row.edite3 = true;
          this.$nextTick(function () {
            document.getElementById("wei_" + row.id).focus();
          })
        }else if(event.label == "阳"){

          row.edite4 = true;
          this.$nextTick(function () {
            document.getElementById("balcony_" + row.id).focus();
          })
        }else if(event.label == "建筑面积"){
          row.edite5 = true;
          this.$nextTick(function () {
            document.getElementById("buildArea_" + row.id).focus();
          })
        }else if(event.label == "套内面积"){
          row.edite6 = true;
          this.$nextTick(function () {
            document.getElementById("inArea_" + row.id).focus();
          })
        }

      },
      hideInput(item,i){
        debugger;
        item["editor"+i] = false;
      },
      changeTableData(){
        this.$emit("saveHouseNumDataTable", this.tableData1);
      }
    },

  }
</script>

<style lang="scss" scoped>

  /deep/ .right-table .el-table .cell{
    padding:0 !important;
  }
  /deep/ .right-table .has-gutter .cell{
    padding:5px 0 0 5px !important;
  }
   /deep/ .right-table .el-input__inner {
    padding: 0 5px 0 5px;
    border-radius:0;
    border-color:#fff;
  }
   /deep/.right-table .el-checkbox{
     padding-left:10px;
   }
  /deep/ .right-table .el-input__icon {
    line-height: 24px;
  }
  .pop-up{
    padding-bottom:0 !important;
    .pop-up-container{
      border-width:0px;
    }
  }
  .word2{
    line-height:30px;
  }
  .padding-t-5{
    padding-top:5px;
  }
  .left-border{
    border-width: 0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-left-width:2px;
  }

  .list-container{
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-radius:5px;
    .list-left-table{
      width:160;
      margin:10px 0 10px 10px;
      padding-right:10px;
      .list-table{
        background:#C0C0C0;

        border-radius:5px;
        height:270px;
      }
    }
  }
  .list-right-table{
    width:542px;
    margin:0px 10px 10px 0px;
    padding-left:10px;
    height:330px;
    .list-table{
      background:#C0C0C0;

      border-radius:5px;

    }
  }
  .word-special{
    font-size:12px;
    color:#800000;
  }



</style>
