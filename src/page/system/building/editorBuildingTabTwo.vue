<template>
  <div class="" >
    <div class="pop-up" style="height: 562px;">
      <div class="pop-up-container clear" >
        <div class="clear" >
          <div class="left list-content list-container" style="margin-left:0px;" >
            <div class="list-table" >
              <el-table
                :data="tableData"
                height="230"
                border
                v-loading="loading"
                highlight-current-row

                @row-click="showFindUnitBySeartId"
              >

                <el-table-column
                  prop="name"
                  label="栋座名称"
                  :show-overflow-tooltip="true"
                  sortable="true"
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
                  width="45"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="stairsDoorNumber"
                  label="梯户"
                  width="55"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                prop="unitNumber"
                label="单元"
                width="55"
                sortable="true"
                :show-overflow-tooltip="true"
                >
              </el-table-column>
                <el-table-column
                  prop="roomNum"
                  label="房号"
                  width="60"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="liablePerson"
                  label="责任人"
                  width="130"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  align="center"
                  >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="left search-container" >

            <div class="item-earch-btn" @click="reloadPedestal" >
              刷新栋座
            </div>

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
            <div class="item-earch-btn" @click="showBuildingModifyPedestal" >
              房源更改栋座
            </div>

            <div class="padding-t-5" style="width:108px;line-height:20px;font-size:12px;color:#999999;" >
              如果楼盘没有分栋座，请使用

              【加入单栋】按钮添加一条【单栋】记录
            </div>
          </div>
        </div>
        <div class="break">

        </div>
        <div class="clear" >
          <div class="left list-content list-container" style="height:137px;margin-left:0px;" >
            <div class="list-table"  >
              <el-table
                :data="tableData1"
                highlight-current-row
                height="133"
                border
                @row-click="getUnitId"
              >

                <el-table-column
                  prop="seatName"
                  label="栋座名称"
                  :show-overflow-tooltip="true"
                  sortable="true"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="unit"
                  label="单元"
                  width="80"
                  sortable="true"
                  :show-overflow-tooltip="true"
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
                  width="80"
                  :show-overflow-tooltip="true"
                  sortable="true"
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
    <div slot="footer" class="dialog-footer clear">

      <div class="right clear" style="margin-top: 3px;">

        <span class="save-cancel-btn right " style="margin-right:0px;"  @click="closeEditorBuilding" >取 消</span>
        <span class="save-cancel-btn right" type="primary" @click="saveBuildingData">保 存</span>
        <div class="right" style="border:1px solid #666;padding:1px 0px 1px 1px;margin-right:10px;" >
          <i class="file-icon" @click="isShowPhotoAndFile" ></i>
        </div>
      </div>
    </div>
    <div>
      <NewPedestalPage :newPedestalValue="newPedestal" ref="showNewPedestal"></NewPedestalPage>
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
  import {pedestalList,deletedPedestal,newPedestal,findUnitBySeartId,deletedUnit} from '../../../service/getData'
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
        multipleSelection:[],//
        clickColumnId:0,
        clickUnitColumnId:0,
        typeClick:1,
        unitDataPage:'',
        pedestalPage:'',
        pliesNumber:'',
        unitName:'',
        houseNum:'',
        haveSing:0,
        getBuildingId:0,
        getBuildingName:'',
        loading:false,
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
      EditorUnitPage
    },
    methods:{
      getPedestalListData(id,name){
        let _this = this;
        let seatId = '';
        _this.getBuildingId = id;
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
          _this.loading = false;
        })
      },
      reloadPedestal(){
        let _this = this;
        let id = _this.getBuildingId ;
        _this.getPedestalListData(id);
      },
      //新增栋座
      showNewPedestal(){
        let _this = this;
        let id = _this.getBuildingId;
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
        let id = _this.clickColumnId;
        if(id) {
          _this.$refs['showDeletePedestal'].deletePedestal(id);
        }else{
          this.myAlert("请选择要删除的[栋座]！",'dangerous-icon');
        }
      },
      //加入单栋
      showAddSingPedestal(){
        let _this = this;
        let id = _this.getBuildingId;
        let haveSing = _this.haveSing;
        if(!haveSing) {
          _this.$refs['showSingPedestal'].singPedestal(id);
        }else{

        }
      },
      //批量生成栋座
      showBatchPedestal(){
        let _this = this;
        let id = _this.getBuildingId;
        let name = _this.getBuildingName;
        if(id) {
          _this.$refs['showBatchPedestal'].batchPedestal(id,name);
        }
      },
      //房源生成栋座
      showBuildingModifyPedestal(){
        let _this = this;
        let id = _this.getBuildingId;
        let name = _this.getBuildingName;
        _this.$refs['showBuildingModifyPedestal'].buildingModifyPedestal(id,name);
      },
      //通过栋座查单元
      getUnitId(row, column, event){
        let _this = this;
        _this.clickUnitColumnId = row.id;
        _this.unitDataPage = row;
        this.typeClick = 2;
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
        let id = _this.clickColumnId;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        findUnitBySeartId(id).then(function(response){
          _this.$layer.closeAll("loading");
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
        let typeClick = _this.typeClick;
        if(typeClick == 1) {
          if (clickColumnId) {
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

      showPropertyOwnerList(){
        this.dialogPropertyOwnerList = true;
      },
      newUnit(){

        let setId = this.clickColumnId;

        if(setId) {
          this.$refs.showNewUnit.showDialog(this.getBuildingId,setId);
        }else{
          this.myAlert("请选择栋座","dangerous-icon");
        }
      },
      editorUnit(index,row){
        this.$refs.showEditorUnit.showDialog(row.id,row.unit);
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
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        deletedUnit(id,1).then(function(response) {
          _this.$layer.closeAll("loading");
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
      isShowPhotoAndFile(){
         this.$emit("isShowPhotoAndFile");
      },
      closeEditorBuilding(){
        let _this = this;
        _this.$emit("closeBuilding");
      },
      saveBuildingData(){
        let _this = this;
        _this.$emit("saveBuilding");
      },
    }
  }
</script>

<style lang="scss" scoped>
  .pop-up{
    padding-bottom:0 !important;
    .pop-up-container{
      border-width:0px;
    }
  }
  .padding-t-5{
    padding-top:5px;
  }
  .list-container{
    width:410px;
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
  .file-icon{
    background:url(../../../images/icon.png) -336px -97px;
    width:25px;
    height:18px;
    display:block;
    cursor:pointer;
  }
  .search-container{
    padding:5px;
    width:111px;
    border-width:0px;
    .item-earch-btn{
      width:108px;
      padding:0 5px ;
      font-size:12px;
      border: 1px solid #797979;
      line-height: 21px;
      margin-top: 5px;
      text-align: center;
      border-radius: 3px;
      cursor:pointer;
    }
  }

</style>
