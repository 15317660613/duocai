<template>
  <div>
    <div class="pop-up" >
      <div class="pop-up-container" style="margin-top:0px;" >

        <div class="clear list-container list-content"  >
          <div class="clear" style="padding-bottom:5px;" >
            <div class="left" >
              <span class="word" style="color:#B6B5B2;padding-top:10px;width:500px;text-align:center;display:inline-block;" >【列表修改自动保存】</span>
            </div>
            <div class="right" >
              <div class="left item-earch-btn"  @click="reloadListData"  >
                刷新
              </div>
               <div class="left item-earch-btn"  @click="showEditorHouseNum"  >
                设置
              </div>
               <div class="left item-earch-btn"  @click="showNewHouseNum"  >
                新增
              </div>
               <div class="left item-earch-btn"  @click="showDeleteHouseNum"  >
                删除
              </div>
            </div>

          </div>
          <div class="list-table" style="height:367px;" >
            <el-table
              :data="tableData"
              style="width: 100%"
              border
              height="100%"
              :loading="loading"
              @cell-click="dbClickEditor"
              @row-click="getRowDataByClick"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="30"
                ref="multipleTable">
              </el-table-column>
              <el-table-column
                prop="unitName"
                label="单元"
                width="70"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >

              </el-table-column>
              <el-table-column
                prop="floor"
                label="楼层"
                width="50"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input :id="'floor_'+scope.row.id" maxLength="5"  v-if="scope.row.edite1"  @blur="hideInput(scope.row,1)" @change="changeTableData" v-model="scope.row.floor" style="width:100%;hight:100%;"></el-input>
                    <span style="height:20px;text-align:center;display:inline-block;width:35px;border-bottom:1px solid #B6B5B2;" v-else>{{scope.row.floor}}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                prop="name"
                label="别名"
                width="50"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >
               
              </el-table-column>

              <el-table-column
                prop="roomNum"
                label="房号"
                width="50"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >
                <template slot-scope="scope">
                  <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                    {{ scope.row.roomNum }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="room"
                label="房"
                width="50"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input :id="'room_'+scope.row.id" maxLength="2"  v-if="scope.row.edite2"  @blur="hideInput(scope.row,2)" @change="changeTableData(scope.row)" v-model="scope.row.room" style="width:70%;hight:100%;"></el-input>
                    <span style="height:20px;text-align:center;display:inline-block;width:35px;border-bottom:1px solid #B6B5B2;" v-else>{{scope.row.room}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="hall"
                label="厅"
                width="50"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input :id="'hall_'+scope.row.id" maxLength="2"  v-if="scope.row.edite3"  @blur="hideInput(scope.row,3)" @change="changeTableData(scope.row)" v-model="scope.row.hall" style="width:70%;hight:100%;"></el-input>
                    <span style="height:20px;text-align:center;display:inline-block;width:35px;border-bottom:1px solid #B6B5B2;" v-else>{{scope.row.hall}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="wei"
                label="卫"
                width="50"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input :id="'wei_'+scope.row.id" maxLength="2"  v-if="scope.row.edite4"  @blur="hideInput(scope.row,4)" @change="changeTableData(scope.row)" v-model="scope.row.wei" style="width:70%;hight:100%;"></el-input>
                    <span style="height:20px;text-align:center;display:inline-block;width:35px;border-bottom:1px solid #B6B5B2;" v-else>{{scope.row.wei}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="balcony"
                label="阳"
                width="50"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input :id="'balcony_'+scope.row.id" maxLength="2" v-if="scope.row.edite5"  @blur="hideInput(scope.row,5)" @change="changeTableData(scope.row)" v-model="scope.row.balcony" style="width:70%;hight:100%;"></el-input>
                    <span style="height:20px;text-align:center;display:inline-block;width:35px;border-bottom:1px solid #B6B5B2;" v-else>{{scope.row.balcony}}</span>
                  </div>
                </template>
              </el-table-column>
              
              <el-table-column
                prop="buildArea"
                label="建筑面积"
                width="85"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input :id="'buildArea_'+scope.row.id" maxLength="10"  v-if="scope.row.edite8" @blur="hideInput(scope.row,8)" @change="changeTableData(scope.row)" v-model="scope.row.buildArea" style="width:100%;hight:100%;"></el-input>
                    <span style="height:20px;text-align:center;display:inline-block;width:60px;border-bottom:1px solid #B6B5B2;" v-else>{{scope.row.buildArea}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="inArea"
                label="套内面积"
                width="85"
                align="center"
                :show-overflow-tooltip="true"
                sortable="true"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input :id="'inArea_'+scope.row.id" maxLength="10"  v-if="scope.row.edite9" @blur="hideInput(scope.row,9)"  @change="changeTableData(scope.row)" v-model="scope.row.inArea" style="width:100%;hight:100%;"></el-input>
                    <span style="height:20px;text-align:center;display:inline-block;width:60px;border-bottom:1px solid #B6B5B2;" v-else>{{scope.row.inArea}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="orientationName"
                label="朝向"
                width="60"
                align="center"

              >
                <template slot-scope="scope">
                  <div>
                    <el-select
                      v-model="scope.row.orientation"
                      @change="changeTableData(scope.row,1)"
                       
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

    <div>
      <NewHouseNumPage :newHouseNumValue="newHouseNum" ref="showNewHouseNum" ></NewHouseNumPage>
    </div>
    <div>
      <EditorHouseNumPage :editorHouseNumValue="editorHouseNum" ref="showEditorHouseNum" ></EditorHouseNumPage>
    </div>
    <div>
      <ModifyHouseNumPage :modifyHouseNumValue="modifyHouseNum" ref="showModifyHouseNum" ></ModifyHouseNumPage>
    </div>

  </div>
</template>

<script>
  import {findSeatHouseNum,deletedHouseNum,modifyHouseNum}  from '../../../service/getData'
  import NewHouseNumPage from './newHouseNum'
  import EditorHouseNumPage from './editorHouseNum'
  import ModifyHouseNumPage from './modifyHouseNum'

  export default {
    data() {
      return {
        newHouseNum:false,
        editorHouseNum:false,
        modifyHouseNum:false,
        mytitlename:'',
        multipleSelection:[],
        orientationParams:[],
        textarea2:"",
        formatter:"",
        buildingParam:'',
        tableData:[],
        loading:false,
        clickColumnId:0,
        checked:0,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '100px'
      };
    },
    components:{
      NewHouseNumPage,
      EditorHouseNumPage,
      ModifyHouseNumPage,
    },
    methods:{
      setParamData(obj){
        let _this = this;
        this.buildingParam = obj;
        let seatId = obj.villageSeatId;
        let showAll = this.checked;
        let unitId = obj.unit;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        findSeatHouseNum(seatId,1,unitId).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let rooms = response.data.rooms;

            let orientationParams = _this.orientationParams;
            if(orientationParams.length == 0){
              _this.orientationParams = params.orientationParams;
            }
            _this.mytitlename = response.data.seatName;
            rooms.forEach(function(item){
              item.edite1 = false;
              item.edite2 = false;
              item.edite3 = false;
              item.edite4 = false;
              item.edite5 = false;
              item.edite6 = false;
              item.edite7 = false;
              item.edite8 = false;
              item.edite9 = false;
              if(item.buildArea  == "null") {
                item.buildArea = "";
              }
              if(item.inArea == "null") {
                item.inArea = "";
              }

            })
            _this.tableData = rooms;
          }
        })
      },
      //刷新
      reloadListData(){
        let _this = this;
        let obj =  _this.buildingParam ;
        let seatId = obj.villageSeatId;
        let showAll = this.checked;
        let unitId = obj.unit;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        findSeatHouseNum(seatId,showAll,unitId).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let rooms = response.data.rooms;

            rooms.forEach(function(item){
              item.edite1 = false;
              item.edite2 = false;
              item.edite3 = false;
              item.edite4 = false;
              item.edite5 = false;
              item.edite6 = false;
              item.edite7 = false;
              item.edite8 = false;
              item.edite9 = false;
              if(item.buildArea  == "null") {
                item.buildArea = "";
              }
              if(item.inArea == "null") {
                item.inArea = "";
              }

            })
            _this.tableData = rooms;
          }
        })
      },
      //新增房号
      showNewHouseNum(){
        let buildingParam = this.buildingParam;
        this.$refs['showNewHouseNum'].newHouseNum(buildingParam);
      },
      //编辑房号
      handleEdit(index, row){
        let _this =  this;
        let buildingParam = this.buildingParam;
        let id = row.id;
        this.$refs['showEditorHouseNum'].editorHouseNum(buildingParam,id);

      },
      showEditorHouseNum(){
        let _this = this;
        let select = this.multipleSelection.toString();

        let buildingParam = this.buildingParam;
        let projectId = buildingParam.villageId;
        let titlename = _this.mytitlename; 

        if(select){
          this.$refs['showModifyHouseNum'].modifyHouseNum(select,projectId,titlename);
        }else{
          this.myAlert("请选择房号",'dangerous-icon');
        }

      },
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
      getRowDataByClick(row, column, event){
        let _this = this;
        _this.clickColumnId = row.id;
      },
      //删除房号
      showDeleteHouseNum(){
        let _this = this;
        let select = this.multipleSelection.toString();

        if(select){
          let title = [];
          let tableData = this.tableData;

          tableData.forEach(function(item){
            if(select.indexOf(item.id) != -1){
              title.push(item.roomNum);
            }
          })
          title = title.toString();
          _this.myConfirm("警告：已生成的【房号】删除后将不能还原！", 'question-icon','确定','取消','需要时必须重新生成!<br/>确定要永久删除选定的房号吗？','my-message').then(res => {

            _this.deletedHouseNumData();
          }).catch(err => {

          })
        }else{
          this.myAlert("请选择房号",'dangerous-icon');
        }

      },
      deletedHouseNumData(){
        let _this = this;
        let select = this.multipleSelection.toString();
        deletedHouseNum(select,1).then(function(response) {

          if(response.status == 500){
            return false;
          }else if(response.status == 0){

            _this.myAlert("删除成功！",'success-icon').then(res => {
              let id = _this.multipleSelection;
              let temp = _this.tableData.concat();
              for(let i = 0 , len = id.length; i < len ; i++ ){
                temp = _this.deletArrByValue(temp,id[i]);
              }
              _this.tableData = temp;
            }).catch(err => {

            })
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }
        })
      },
      //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
      },
      dbClickEditor(row, event,column){
        let _this = this;
        this.tableData.forEach(function(item){
          item.edite1 = false;
          item.edite2 = false;
          item.edite3 = false;
          item.edite4 = false;
          item.edite5 = false;
          item.edite6 = false;
          item.edite7 = false;
          item.edite8 = false;
          item.edite9 = false;
        })
        if(event.label == "楼层"){
          row.edite1 = true;

          this.$nextTick(function () {
            document.getElementById("floor_" + row.id).focus();
          })
        }else if(event.label == "房"){
          row.edite2 = true;

          this.$nextTick(function () {
            document.getElementById("room_" + row.id).focus();
          })
        }else if(event.label == "厅"){

          row.edite3 = true;
          this.$nextTick(function () {
            document.getElementById("hall_" + row.id).focus();
          })
        }else if(event.label == "卫"){

          row.edite4 = true;
          this.$nextTick(function () {
            document.getElementById("wei_" + row.id).focus();
          })
        }else if(event.label == "阳"){

          row.edite5 = true;
          this.$nextTick(function () {
            document.getElementById("balcony_" + row.id).focus();
          })
        }else if(event.label == "总价（万元）"){
          row.edite6 = true;
          this.$nextTick(function () {
            document.getElementById("price_" + row.id).focus();
          })
        }else if(event.label == "单价(元/㎡)"){
          row.edite7 = true;
          this.$nextTick(function () {
            document.getElementById("unitPrice_" + row.id).focus();
          })
        }else if(event.label == "建筑面积"){
          row.edite8 = true;
          this.$nextTick(function () {
            document.getElementById("buildArea_" + row.id).focus();
          })
        }else if(event.label == "套内面积"){
          row.edite9 = true;
          this.$nextTick(function () {
            document.getElementById("inArea_" + row.id).focus();
          })
        }

      },
      hideInput(item,i){
        let _this = this;
        item["edite"+i] = false;
        let current = JSON.parse(JSON.stringify(item));
        let orientation = current.orientation;
        if(orientation == undefined){
          current.orientation = "";
        }
        modifyHouseNum(current).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){

            /*_this.myAlert("数据保存成功！",'success-icon').then(res => {

             }).catch(err => {
             })*/
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }
        })
      },
      changeTableData(item,flag){
        let _this = this;
        if(flag) {
          modifyHouseNum(item).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {

              /*_this.myAlert("数据保存成功！", 'success-icon').then(res => {

               }).catch(err => {
               })*/
            } else if (response.status == 1) {
              let msg = response.msg
              _this.myAlert(msg + "！", 'dangerous-icon');
            }
          })
        }
      },
      callbackDeleted(){
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pop-up{
    padding-bottom:10px;
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
    .list-table{
      background:#C0C0C0;
      border:1px solid #797979;
      height:358px;
    }
  }
  .item-earch-btn{
    border: 1px solid #797979;
    line-height: 21px;
    margin:5px 5px 0;
    text-align: center;
    border-radius: 3px;
    cursor:pointer;
    padding:0 10px;
  }
  .l-h-30{
    line-height:30px;
  }
  .word-special{
    font-size:12px;
    color:#800000;
  }

</style>
