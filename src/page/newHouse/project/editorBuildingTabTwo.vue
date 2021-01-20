<template>
  <div class="" >
    <div class="pop-up" style="border-width:0px;" >
      <div class="pop-up-container clear" style="margin:0px;height: 440px;" >
        <div class="clear" >
          <div class="left list-content list-container" style="margin-left:0px;" >
            <div class="list-table" >
              <el-table
                :data="tableData"
                height="210"
                border
                highlight-current-row
                @selection-change="handleSelectionChange"
                @row-click="showFindUnitBySeartId"
              >

                <el-table-column
                  prop="name"
                  label="栋座名"
                  :show-overflow-tooltip="true"
                  sortable
                  align="center"
                  width="100">
                  <template slot-scope="scope">
                    <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                      {{ scope.row.name }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="pliesNumber"
                  label="总层"
                  width="50"
                  :show-overflow-tooltip="true"
                  sortable
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="stairsDoorNumber"
                  label="梯户"
                  width="70"
                  :show-overflow-tooltip="true"
                  sortable
                  align="center"
                >
                </el-table-column>
                <el-table-column
                prop="unitNumber"
                label="单元"
                width="50"
                :show-overflow-tooltip="true"
                sortable
                align="center"
                >
              </el-table-column>
                <el-table-column
                  prop="roomNum"
                  label="房数"
                  width="60"
                  :show-overflow-tooltip="true"
                  sortable
                  align="center"
                >
                </el-table-column>

              </el-table>
            </div>
          </div>
          <div class="left search-container" >

            <div class="item-earch-btn" @click="showNewPedestal" >
              新增栋座
            </div>
            <div v-if="haveSing === 0" class="item-earch-btn" @click="showAddSingPedestal" >
              加入[单栋]
            </div>
            <div v-if="haveSing === 1" class="item-earch-btn" style="color: rgb(163, 168, 166);" >
              加入[单栋]
            </div>
            <div class="item-earch-btn" @click="showBatchPedestal" >
              批量生成栋座
            </div>

            <div class="item-earch-btn"  @click="showDeletePedestal" >
              删除栋座
            </div>
          </div>
        </div>
        <div class="break">

        </div>
        <div class="clear" >
          <div class="left list-content list-container" style="height:180px;margin-left:0px;" >
            <div class="list-table"  >
              <el-table
                :data="tableData1"
                highlight-current-row
                height="175"
                border
                @row-click="getUnitElemData"
              >

                <el-table-column
                  prop="seatName"
                  label="栋座名"
                  :show-overflow-tooltip="true"
                  sortable
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="unit"
                  label="单元"
                  width="50"
                  :show-overflow-tooltip="true"
                  sortable
                  align="center"
                 >
                  <template slot-scope="scope">
                    <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorUnit(scope.$index, scope.row)" >
                      {{ scope.row.unit }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="roomNum"
                  label="房数"
                  width="50"
                  :show-overflow-tooltip="true"
                  sortable
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="floor"
                  label="楼层"
                  width="50"
                  :show-overflow-tooltip="true"
                  sortable
                  align="center"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="left search-container" >
            <div class="item-earch-btn" @click="newUnit" >
              新增单元
            </div>
            <div class="item-earch-btn" @click="showBatchHouseNum" >
              楼层房号设置
            </div>
            <div class="item-earch-btn" @click="deletUnitClick" >
              删除单元和房号
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <NewPedestalPage @reloadPedestal="reloadPedestal" :newPedestalValue="newPedestal" ref="showNewPedestal"></NewPedestalPage>
    </div>
    <div>
      <EditorPedestalPage :editorPedestalValue="editorPedestal" ref="showEditorPedestal"></EditorPedestalPage>
    </div>
    <div>
      <DeletePedestalPage :deletePedestalValue="deletePedestal" ref="showDeletePedestal"></DeletePedestalPage>
    </div>
    <div>
      <BatchPedestalPage :batchPedestalValue="batchPedestal" ref="showBatchPedestal"></BatchPedestalPage>
    </div>
    <div>
      <SingPedestalPage :singPedestalValue="singPedestal" ref="showSingPedestal"></SingPedestalPage>
    </div>
    <div>
      <BudingModifyPedestalPage :buildingModifyPedestalValue="buildingModifyPedestal" ref="showBuildingModifyPedestal"></BudingModifyPedestalPage>
    </div>
   
    <div>
      <NewUnitPage :newUnitValue="newUnitValue" ref="showNewUnit"></NewUnitPage>
    </div>
    <div>
      <EditorUnitPage :editorUnitValue="editorUnitValue" ref="showEditorUnit"></EditorUnitPage>
    </div>
  </div>
</template>

<script>
  import {pedestalList,deletedPedestal,newPedestal,findUnitBySeartId,deletedUnit} from '../../../service/newHouse'
  import NewPedestalPage from './newPedestal'
  import EditorPedestalPage from './editorPedestal'
  import DeletePedestalPage from './deletePedestal'
  import SingPedestalPage from './singPedestal'
  import BatchPedestalPage from './batchPedestal'
  import BudingModifyPedestalPage from './budingModifyPedestal'
  import BatchHouseNumPage from './batchHouseNum'
  import NewUnitPage from './newUnit'
  import EditorUnitPage from './editorUnit'

  export default {
    props:["propertyOwnerList"],
    data() {
      return {
        dialogPropertyOwnerList:this.propertyOwnerList,
        newPedestal:false,
        editorPedestal:false,
        deletePedestal:false,
        singPedestal:false,
        batchPedestal:false,
        buildingModifyPedestal:false,
        batchHouseNum:false,
        newUnitValue:false,
        editorUnitValue:false,
        unitDataPage:null,
        typeClick:1,
        multipleSelection:[],//
        clickColumnId:0,
        pedestalPage:'',
        pliesNumber:'',
        unitName:'',
        houseNum:'',
        haveSing:0,
        getProjectId:0,
        getBuildingName:'',
        tableData:[],
        tableData1:[],
        textarea2:"",
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
      NewPedestalPage,
      EditorPedestalPage,
      DeletePedestalPage,
      SingPedestalPage,
      BatchPedestalPage,
      BudingModifyPedestalPage,
      BatchHouseNumPage,
      NewUnitPage,
      EditorUnitPage,
    },
    methods:{
      getPedestalListData(id,name){
        debugger;
        let _this = this;
        let seatId = '';
        _this.getProjectId = id;
        _this.form.projectId = id;
        _this.clickColumnId = 0;
        if(name) {
          _this.getBuildingName = name;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        pedestalList(id,seatId).then(function(response){
          _this.$layer.closeAll("loading");
          if(response.status == 500){
            return false;
          }else{
            let data = response.data.seats;
            _this.tableData = data;
            _this.$emit("setBuildingNum",data.length);
            let flag = false;
            for(let i = 0 , len = data.length ; i < len ; i ++){
              if(data[i].name == "单栋"){
                _this.haveSing = 1;
                flag = true;
              }
            }
            if(!flag){
              _this.haveSing = 0;
            }
          }
        })
      },
      reloadPedestal(){
        let _this = this;
        let id = _this.getProjectId ;
        _this.getPedestalListData(id);
        this.pedestalPage = null;
        this.clickColumnId = null;
        this.tableData1 = [];
      },
      //新增栋座
      showNewPedestal(){
        let _this = this;
        let id = _this.getProjectId;
        _this.$refs['showNewPedestal'].newPedestal(id);
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
      //详情
      handleEdit(index, row){
        let _this =  this;
        _this.$refs['showEditorPedestal'].editorPedestal(row.id,row.name);
      },
      //编辑栋座
      showEditorPedestal(){
        let _this = this;
        let id = _this.clickColumnId;
        if(id) {
          _this.$refs['showEditorPedestal'].editorPedestal(id);
        }else{
          this.myAlert("请选择栋座！",'dangerous-icon','my-success');
        }
      },
      //删除栋座
      showDeletePedestal(){
        let _this = this;
        let pedestalPage = this.pedestalPage;
        if(pedestalPage) {
           let id = pedestalPage.id;
          _this.$refs['showDeletePedestal'].deletePedestal(id);
        }else{
          this.myAlert("请选择要删除的[栋座]！",'dangerous-icon');
        }
      },
      //加入单栋
      showAddSingPedestal(){
        let _this = this;
        let id = _this.getProjectId;
        let haveSing = _this.haveSing;
        if(!haveSing) {
          _this.$refs['showSingPedestal'].singPedestal(id);
        }else{

        }
      },
      //批量生成栋座
      showBatchPedestal(){
        let _this = this;
        let id = _this.getProjectId;
        let name = _this.getBuildingName;
        if(id) {
          _this.$refs['showBatchPedestal'].batchPedestal(id,name);
        }
      },
      //房源生成栋座
      showBuildingModifyPedestal(){
        let _this = this;
        let id = _this.getProjectId;
        let name = _this.getBuildingName;
        _this.$refs['showBuildingModifyPedestal'].buildingModifyPedestal(id,name);
      },
      //通过栋座查单元
      showFindUnitBySeartId(row, column, event){
        let _this = this;
        _this.clickColumnId = row.id;
        _this.pedestalPage = row;
        _this.typeClick = 1;
        let id = row.id;
        findUnitBySeartId(id).then(function(response){
          if(response.status == 500){

            return false;
          }else if(response.status == 0){
            let data = response.data;
            _this.tableData1 = data;
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }
        })
      },
      reloadListData(){
        let _this = this;
        let row = _this.pedestalPage;
        let id = row.id;
        let projectId = _this.getProjectId ;
        this.getPedestalListData(projectId);
        findUnitBySeartId(id).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let data = response.data;
            _this.tableData1 = data;
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }

        })
      },
      //批量生成房号
      showBatchHouseNum(){
        let _this = this;
        let clickColumnId = _this.clickColumnId;
        let name = _this.getBuildingName;
        let pedestalPage = _this.pedestalPage;
        if(!clickColumnId && pedestalPage){
          clickColumnId = pedestalPage.id;
        }
        let typeClick = _this.typeClick;
        if(typeClick == 1) {
          if (pedestalPage) {
            if (this.tableData1.length == 0) {
              _this.myAlert("该栋座没有单元!", 'dangerous-icon').then(res => {

              }).catch(err => {

              })
              return false;
            }
            _this.showBatchHoue(clickColumnId, name);
          } else {
            _this.myAlert("请选择栋座", "dangerous-icon");
          }
        }else{
          let unitDataPage = this.unitDataPage;
          if(unitDataPage){
            let unitId = unitDataPage.id;
            if (!unitId) {
              return false;
            }
            _this.showBatchHoue(clickColumnId, name,unitId);
          }else{
             _this.myAlert("请选择单元", "dangerous-icon");
          }
        }

      },
      showBatchHoue(clickColumnId, name,unitId){

        let _this = this;
        if(!unitId){
          unitId = "";
        }
        let test = _this.$layer.iframe({
          content: {
            content: BatchHouseNumPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              clickColumnId:clickColumnId,
              name:name,
              unitId:unitId,
            }//props
          },
          area:['800px','568px'],
          title: "房号设置",
          tips: 1,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            _this.reloadListData();
          }
        });
      },
      newUnit(){
        let setId = this.clickColumnId;

        if(setId) {
          this.$refs.showNewUnit.showDialog(this.getProjectId,setId);
        }else{
          this.myAlert("请选择栋座","dangerous-icon");
        }
      },
      editorUnit(index,row){
        this.$refs.showEditorUnit.showDialog(row.id,row.seatName);
      },
      getUnitElemData(row, column, event){
        this.unitDataPage = row;
        this.typeClick = 2;
      },
      deletUnitClick(){
        let _this = this;
        if(this.unitDataPage){
          let name = this.unitDataPage.unit;
          _this.myConfirm("确定要删除【"+name+"】的所有房号?", 'question-icon','是','否','房号删除后将不可恢复','my-success').then(res => {
            _this.myConfirm("再次确定要删除【"+name+"】的所有房号?", 'question-icon','是','否','','my-message').then(res => {
                _this.deletedUnitData();
            }).catch(err => {

            })
          }).catch(err => {

          })
          return false;

        }else{
          this.myAlert("请选择单元","dangerous-icon");
        }
      },
      deletedUnitData(){
        let _this = this;
        let id = this.unitDataPage.id;
        debugger;
        deletedUnit(id,1).then(function(response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){

            _this.myAlert("删除成功！",'success-icon').then(res => {

              let temp = _this.tableData1.concat();
              temp = _this.deletArrByValue(temp,id);

              _this.tableData1 = temp;
              _this.unitDataPage = null;
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
      showPropertyOwnerList(){
        this.dialogPropertyOwnerList = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pop-up{
    padding-bottom:0 !important;
    .pop-up-container{
    }
  }
  .padding-t-5{
    padding-top:5px;
  }
  .list-container{
    width:615px;
    overflow:auto;
    background:#C0C0C0;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:10px;
    border-radius:5px;
    .list-table{

    }
  }
  .building-icon{
    background:url(../../../images/system/tupian.png) -15px -15px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .search-container{
    padding:5px;
    width:120px;
    border-width:0px;
    .item-earch-btn{
      width:108px;
      padding:0 5px ;
      font-size:12px;
      border: 1px solid #797979;
      line-height: 21px;
      margin-top: 10px;
      text-align: center;
      border-radius: 3px;
      cursor:pointer;
    }
  }

</style>
