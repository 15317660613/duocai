<template>
  <div>
    <div class="pop-up"  >
      <div class="pop-up-container" >

        <div class="clear list-container list-content" >
          <div class="clear left-search" >
            <div class="left word2" >
              楼层号
            </div >
            <div class="left" >
              <el-form-item   >
                <el-select  v-model="form.plies1"      style="width:40px;" >
                  <el-option v-for="item in getPliesNumber" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left word2" >
              -
            </div >
            <div class="left" >
              <el-form-item   >
                <el-select v-model="form.plies2"      style="width:40px;" >
                  <el-option v-for="item in getPliesNumber" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left word2" style="padding-left:20px;" >
              平层号
            </div >
            <div class="left" >
              <el-form-item   >
                <el-input @input="checkNum1" v-model="form.doorNum1" autocomplete="off" style="width:40px;"></el-input>
                </el-select>
              </el-form-item>
            </div>
            <div class="left word2" >
              -
            </div >


            <div class="left" >
              <el-form-item   >
                <el-input @input="checkNum2" v-model="form.doorNum2" autocomplete="off" style="width:40px;"></el-input>
              </el-form-item>
            </div>

            <div class="left" >
              <span style="color:rgb(182, 181, 178);display:inline-block;padding-left:20px;line-height:27px;" >{{tableData.length}}</span>
            </div>
            <div class="item-earch-btn left" style="width:80px;margin-left:90px;" @click="lookThrought" >
              列表预览
            </div>

            <div class="item-earch-btn right" style="width:80px; margin-left:140px;" @click="addHouseNumBatch"  >
              正式生成房号
            </div>
          </div>

          <div v-show="showTable" class="list-table" >
            <el-table
              :data="tableData"
              border
              height="356px"
              ref="table"
              @cell-click="dbClickEditor"
              :cell-class-name="rowClass"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="30"
                ref="multipleTable">
              </el-table-column>
              <el-table-column
                prop="villageName"
                label="楼盘字典"
                width="80"
                align="center"
                sortable="true"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="villageSeatName"
                label="栋座"
                width="80"
                sortable="true"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="villageUnitName"
                label="单元"
                width="80"
                align="center"
                sortable="true"
              >
              </el-table-column>
              <el-table-column
                prop="floor"
                label="楼层"
                width="50"
                align="center"
                sortable="true"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="楼层别名"
                width="70"
                align="center"
                sortable="true"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input :id="scope.row.id" maxLength="10"  v-if="scope.row.editor" @blur="hideInput(scope.row)" @change="changeTableData(scope.row)" v-model="scope.row.name" style="width:100%;hight:100%;"></el-input>
                    <span style="height:20px;text-align:center;display:inline-block;width:35px;border-bottom:1px solid #B6B5B2;" v-else>{{scope.row.name}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="roomNum"
                label="房号"
                width="50"
                align="center"
                sortable="true"
                :show-overflow-tooltip="true"
              >
              </el-table-column>

            </el-table>
          </div>
          <div v-show="!showTable" class="list-table" >
            <el-table
              :data="tableData1"
              border
              height="100%"
              ref="table1"
              :cell-style = "cellStyle"
            >
              <template v-for="(item,index) in columnData" >
                <el-table-column
                  v-if="item.prop == 'build'"
                  :prop="item.prop"
                  :label="item.label"
                  width="80"
                  align="center"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  v-else
                  :prop="item.prop"
                  :label="item.label"
                  width="80"
                  align="center"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </template>

            </el-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {findSeatHouseNum,batchNewHouseNum}  from '../../../service/newHouse'
  export default {
    data() {
      return {
        dialogNewSchool:false,
        showTable:true,
        textarea2:"",
        formatter:"",
        tableData:[],
        tableData1:[],
        getParentTableData:[],

        multipleSelection:[],
        orientationParams:[],
        currentRoom:[],
        repeatCount:0,
        villageName:"",
        villageSeatName:"",
        villageUnitName:"",
        unitId: "",
        projectId:"",
        buildingsId:"",
        floorMin:"",
        floorMax:"",
        doorNumber:'',
        rule:'',
        getPliesNumber:0,
        currentRoomIds:"",
        repeatCount:0,
        columnData:[{prop:"build",label:"楼层/平层"}],
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
      checkNum1(){
        this.form.doorNum1= this.form.doorNum1.replace(/[^\d]/g,'');
        let doorNum1 = this.form.doorNum1;
        let doorNum2 = this.form.doorNum2;
        if(!doorNum1 || !doorNum2){
          this.myAlert("请填写正确的平层号范围！","dangerous-icon");
          return false;
        }else{
          if(doorNum1*1 > doorNum2*1){
            this.myAlert("请填写正确的平层号范围！","dangerous-icon");
            return false;
          }
        }
        let doorNum = doorNum2*1 - doorNum1*1;
        this.$emit("setDoorNum",doorNum);
      },
      checkNum2(){
        this.form.doorNum2= this.form.doorNum2.replace(/[^\d]/g,'');
        let doorNum1 = this.form.doorNum1;
        let doorNum2 = this.form.doorNum2;
        if(!doorNum1 || !doorNum2){
          this.myAlert("请填写正确的平层号范围！","dangerous-icon");
          return false;
        }else{
          if(doorNum1*1 > doorNum2*1){
            this.myAlert("请填写正确的平层号范围！","dangerous-icon");
            return false;
          }
        }
        let doorNum = doorNum2*1 - doorNum1*1;
        this.$emit("setDoorNum",doorNum);
      },

      setParamData(parentTableData){
        this.getParentTableData = parentTableData;
      },
      setUnitData(obj){
        this.villageName = obj.villageName;
        this.villageSeatName = obj.villageSeatName;
        this.villageUnitName = obj.villageUnitName;
        this.doorNumber = obj.doorNumber;
        this.rule = obj.rule;
        this.unitId = obj.unitId;
        this.projectId = obj.projectId;
        this.buildingsId = obj.buildingsId;
        this.floorMin = obj.floorMin*1;
        this.floorMax = obj.floorMax*1;
        if(obj.floorMax != null && this.floorMin != null ){
          let floorMin = obj.floorMin*1;
          let floorMax = obj.floorMax*1;
          let arr = [];
          for( let i = floorMin; i <= floorMax ; i++ ){
            if(i != 0){
              arr.push({
                id:i,
                name:i
              })
            }
          }
          this.getPliesNumber = arr;
          this.form.plies1 = obj.floorMin*1;
          this.form.plies2 = obj.floorMax*1;
          if(obj.doorNumber){
            this.form.doorNum2 = obj.doorNumber*1;
          }
        }
      },

      lookThrought(){
        let _this = this;
        let doorNum1 = this.form.doorNum1;
        let doorNum2 = this.form.doorNum2;
        if(!doorNum1 || !doorNum2){
          this.myAlert("请填写正确的平层号范围！","dangerous-icon");
          return false;
        }else{
          if(doorNum1*1 > doorNum2*1){
            this.myAlert("请填写正确的平层号范围！","dangerous-icon");
            return false;
          }
        }
        let doorNum = doorNum2*1 - doorNum1*1;
        this.$emit("setDoorNum",doorNum);
        this.showTable = true;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        let seatId = this.buildingsId;
        let showAll = 1;
        let unitId = this.unitId;
        findSeatHouseNum(seatId,showAll,unitId).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let rooms = response.data.rooms;
            _this.currentRoom = rooms;
            let arr = [];
            rooms.forEach(function(item){
              arr.push(item.roomName);
            })
            _this.currentRoomIds = arr.toString();
            _this.setListData();
          }
        })
      },
      setChangeRule(rule){
        this.rule = rule;
      },
      setListData(){
        let _this = this;
        let plies1 = this.form.plies1*1;
        let plies2 = this.form.plies2*1;
        let doorNum1 = this.form.doorNum1*1;
        let doorNum2 = this.form.doorNum2*1;
        let villageName = this.villageName;
        let villageSeatName = this.villageSeatName;
        let villageUnitName = this.villageUnitName;
        let unitId = this.unitId;
        let projectId =  this.projectId;
        let buildingsId =  this.buildingsId;
        let doorNumber = this.doorNumber;
        let rule = this.rule;
        let arr = [];
        let mapCurrentRoom = {};
        let currentRoom = this.currentRoom;
        currentRoom.forEach(item => {
          mapCurrentRoom[item.roomName] = item;
        })
        debugger;
        for(let i = plies1; i <= plies2 ; i ++){
          if(i != 0){
            for(let j = doorNum1 ; j <= doorNum2 ; j++){
              let roomNum = '';
              let floor = i;
              let str1 = 0;
              let str2 = 0;
              if(rule == 1) {
               
                if (i < 10 && i >= 1) {
                  str1 = "0" + i;
                } else if (i < 0) {
                  str1 = "B" + Math.abs(i);
                }else {
                  str1 = i;
                }
                if (j < 10) {
                  str2 = "0" + j
                } else {
                  str2 = j
                }
                roomNum = str1+"" + str2;
              }else{
                let num = i;
                debugger;
                num = (i - 1)*((doorNum2*1-doorNum1*1+1))+j;
                if (num < 10 && num >= 1) {
                  str2 = "0" + num;
                } else if(num == 0){
                  str2 = "01"
                }else {
                  str2 = num+"";
                }
                if (i < 10) {
                  str1 = "0" + i
                } else {
                  str1 = i+"";
                }
                roomNum = str1+ "" + str2;
              }
              let obj = null;
              if(mapCurrentRoom[roomNum]){
                obj = {
                  id:mapCurrentRoom[roomNum].id,
                  doorNum:j,
                  str1:str1,
                  str2:str2,
                  villageName:villageName,
                  villageSeatName:villageSeatName,
                  villageUnitName:villageUnitName,
                  name:mapCurrentRoom[roomNum].name,
                  roomName:roomNum,
                  unitId: unitId,
                  projectId:projectId,
                  buildingsId:buildingsId,
                  floor: floor,
                  hasSaveData:1,
                  roomNum: mapCurrentRoom[roomNum].roomNum,
                  oldRoomNum:roomNum,
                  editor:false,
                }
              }else{
                obj = {
                  id:"_"+i+"_"+j,
                  doorNum:j,
                  str1:str1,
                  str2:str2,
                  villageName:villageName,
                  villageSeatName:villageSeatName,
                  villageUnitName:villageUnitName,
                  name:'',
                  unitId: unitId,
                  projectId:projectId,
                  buildingsId:buildingsId,
                  floor: floor,
                  hasSaveData:0,
                  roomName:roomNum,
                  roomNum: roomNum ,
                  oldRoomNum:roomNum,
                  editor:false,
                }
              }
              
              arr.push(obj);
            }
          }

        }
       
        
        _this.tableData = arr;
        this.$nextTick(function () {
          let count = 0;
          let arr = [];
          this.tableData.forEach(row => {
            let currentRoomIds = _this.currentRoomIds;
            if(!currentRoomIds){
              _this.$refs.table.toggleRowSelection(row, true);
              arr.push(row);
            }else {
              if (currentRoomIds && currentRoomIds.indexOf(row.roomName) == -1) {
                _this.$refs.table.toggleRowSelection(row, true);
                arr.push(row);
              } else {
                count++;
              }
            }
          })
          _this.repeatCount = count;
          _this.$emit("setRepeatCount",count);
        })
      },
      dbClickEditor(row, event,column) {
        row.editor = true;
        this.$nextTick(function () {
          document.getElementById(row.id).focus();
        })

      },
      hideInput(row){
        row.editor = false;
        let doorNum = row.doorNum;
        let rule = this.rule;
        if(row.name != '' && rule == 1){
          let str2 = '';
          let str1 = '';
          let str = '';
          if(doorNum < 10){
            str2 = "0"+doorNum;
          }else{
            str2 = doorNum;
          }
          row.roomNum = row.name + str2;
        }else{
          row.roomNum = row.str1 + row.str2;
        }
      },
      changeTableData(){

      },
     
      addHouseNumBatch(){
        let _this = this;
        let villageName = this.villageName;
        let villageSeatName= this.villageSeatName;
        let villageUnitName= this.villageUnitName;
        let unitId = this.unitId;
        let projectId = this.projectId;
        let buildingsId = this.buildingsId;
        let tableData = JSON.parse(JSON.stringify(this.tableData));
        let select = this.multipleSelection.toString();
        let rooms = [];
        tableData.forEach(row => {
          if (select && select.indexOf(row.oldRoomNum) != -1 ) {
            if(row.hasSaveData != 1){
              row.id = "";
            }
            rooms.push(row);
          }
        })
        let form = {
          villageName:villageName,
          villageSeatName:villageSeatName,
          villageUnitName:villageUnitName,
          name:'',
          villageUnitId: unitId,
          villageId:projectId,
          villageSeatId:buildingsId,
          rooms:JSON.stringify(rooms),
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        batchNewHouseNum(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let title = villageName+villageSeatName+villageUnitName;
            let num = rooms.length;
            _this.myAlert("成功生成【"+title+"】"+num+"个房号！",'success-icon').then(res => {

            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      rowClass({row, index}){
        let className = "";
        let currentRoomIds = this.currentRoomIds;
        if (row.hasSaveData == 1 ) {
          className =  'repest-house-num';
        }
        
        if (row.hasSaveData == 0 && currentRoomIds.length != 0 && currentRoomIds.indexOf(row.roomNum) != -1 ) {
          className =  'repest-house-num-current';
        }
        return className;
      },
      cellStyle({row, column}) {
        let className = '';
        let currentRoom = this.currentRoom;
        let map = {};
        currentRoom.forEach(function(item){
          map["_"+item.roomNum] = true;
        })
        if(column.property == "build"){
          className = 'background:#CCCCCC';
        }else{

          if(map["_"+row[column.property]]){
            className = "background:#FF8080;"
          }
        }
        return className;
      },
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.oldRoomNum);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },
      checkAllSelect(value){
        let _this = this;
        let check = this.checked1;
        if(check){
          this.$nextTick(function () {
            this.tableData.forEach(row => {
              _this.$refs.table.toggleRowSelection(row, true);
            })
          })
        }else{
          this.$nextTick(function () {
            this.tableData.forEach(row => {
              _this.$refs.table.toggleRowSelection(row, false);
            })
          })
        }
      },
      checkSelect(){
        let _this = this;
        let check = this.checked2;
        let select = _this.multipleSelection.toString();
        let arr = [];
        if(check) {
          this.tableData.forEach(row => {
            if (select.indexOf(row.roomNum) != -1) {
              arr.push(row);
            }
          })
          this.tableData = arr;
          this.$nextTick(function () {
            this.tableData.forEach(row => {
              _this.$refs.table.toggleRowSelection(row, true);
            })
          })
        }

      },
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
  .item-earch-btn{
    border: 1px solid #797979;
    line-height: 21px;
    margin-left:10px;
    text-align: center;
    border-radius: 3px;
    cursor:pointer;
  }
  .list-container{
    .list-table{
      background:#C0C0C0;
      border:1px solid #797979;
      height:358px;
    }
  }
  .l-h-30{
    line-height:30px;
  }
  .word-special{
    font-size:12px;
    color:#800000;
  }



</style>
