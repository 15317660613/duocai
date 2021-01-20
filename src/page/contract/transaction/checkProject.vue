<template>
  <div class="" style="width:100%;margin:0 10px;" >

      <div class="pop-up" >
        <div class="pop-up-container clear" >
          <div class="left list-container list-content" style="margin:5px 5px 0;" >
            <div class="list-table " id="editorSchoolList"  >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="336px"
                border
                ref="table"
                @row-click="getRowDataByClick"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  prop="check"
                  width="30"
                  label="√"
                >
                  <template slot-scope="scope">
                    <div  >
                      <input v-model="projectId" type="radio" :value="scope.row.id"   />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="自定"
                  sortable="true"

                  align="center"
                  :show-overflow-tooltip="true"
                  width="50">

                </el-table-column>
                <el-table-column
                  prop="projectName"
                  label="项目"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  width="100">
                </el-table-column>

                <el-table-column
                  prop="coverArea"
                  label="面积"
                  width="60"
                  align="right"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="registerName"
                  label="栋座-单元-房号"
                  width="120"
                  align="left"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>

              </el-table>
            </div>
          </div>
          <div class="left search-container" >
            <el-form ref="formsData" :model="form">
              <div class="clear" >
                <div class="left" >
                  <span class="word" >项目</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="firstHouseId" >
                    <el-select @change="getPedestalListData" v-model="form.firstHouseId"  placeholder="" style="width:130px;" >
                      <el-option v-for="item in houseParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <span class="word" >栋座</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="firstHousebuildingId" >
                    <el-select @change="getUnitListData" v-model="form.firstHousebuildingId"  placeholder="" style="width:50px;" >
                      <el-option  label="全部" value="-1" ></el-option>
                      <el-option v-for="item in pedetalParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="word" style="width:30px;padding-right:2px;" >单元</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="firstHousebuildingUnitId" >
                    <el-select v-model="form.firstHousebuildingUnitId"  placeholder="" style="width:50px;" >
                       <el-option  label="全部" value="-1" ></el-option>
                      <el-option v-for="item in unitParams"  :label="item.unit" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <span class="word" >状态</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="projectState" >
                    <el-select v-model="form.projectState"  placeholder="" style="width:130px;" >
                      <el-option v-for="item in projectStateParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <span class="word" >自定号</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="num" >
                    <el-select v-model="form.num"  placeholder="" style="width:130px;" >
                      <el-option v-for="item in numParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >

                <div class="left clear" style="padding-left:45px;" >
                  <el-form-item  prop="word" >
                    <div class="left" style="margin-left: -45px">
                      <span class="word" >智能</span>
                    </div>
                    <el-input class="left" v-model="form.word" title="房号"  placeholder="" style="width:130px;" ></el-input>
                  </el-form-item>
                </div>

              </div>
            </el-form>
            <div class="item-earch-btn" @click="getRentListData"   >
              查询
            </div>

          </div>
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >确 定</span>
        </div>
      </div>

  </div>
</template>

<script>
  // 获取数据
  import {getparams,newHouseList,pedestalList,findUnitBySeartId} from '../../../service/newHouse'
  import {contractGetFirstHouseList} from '../../../service/contractSpecial'
  
  import {rentConstParam} from '../../../utils/rentParam'

  export default {
    props:['getHouseId','streetId','projectIdParent','layerid'],
    data() {
      return {
        dialogVisible:this.checkProjectDialog,
        multipleSelection:[],
        tableData:[],
        houseParams:[],
        unitParams:[],
        pedetalParams:[],
        projectStateParams:[],
        numParams:[],
        word:"",
        projectId:this.projectIdParent,
        setStreetId:this.streetId,
        houseId:this.getHouseId,
        form: {
         
          firstHouseId:'-1',
          firstHousebuildingId:'-1',
          firstHousebuildingUnitId:'-1',
          projectState: '-1',
          num:'-1',
          needInfo:1,
          word:'',
        },
        formLabelWidth: '100px'
      };
    },
    components:{

    },
    methods:{

      //栋座
      getPedestalListData(){
        let _this = this;
        let seatId = '';
        let id = this.form.firstHouseId;
        
        if( id != ''){
          pedestalList(id,seatId,'').then(function(response){

            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data.seats;
              _this.pedetalParams = data;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }

      },
      //单元
      getUnitListData(){
        let _this = this;
        let id = this.form.firstHousebuildingId;
        findUnitBySeartId(id).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.unitParams = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      //获取参数
      getRentParam(){
        let _this = this;

        getparams(true,true).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{id:"-1",name:"全部",select:true}];
            if(data.houseNames){
              let initArrSpecial = [];
              data.houseNames.forEach(function(item){
                let obj = {
                  id:item.id,
                  name:item.label,
                  select:false,
                }
                initArrSpecial.push(obj);
              })
              _this.houseParams = initArrSpecial;
              _this.form.firstHouseId = initArrSpecial[0].id;
            }
            let numParams = data.numParams;
            if(numParams && numParams.length){
                let arr = [{id:"-1",name:"全部",select:true}];
              numParams.forEach(function(item){
                  arr.push({
                    id:item.name,
                    name:item.name,
                  })
              })
              _this.numParams = arr;
            }
            let projectStateParams = data.projectStateParams;
            _this.projectStateParams = [{id:"-1",name:"全部",select:true}].concat(projectStateParams);


            _this.getRentListData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
     
      //查询
      getRentListData(type){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        
        contractGetFirstHouseList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.ret;
            _this.tableData = data;
            _this.tableData.forEach(item=>{
              item.num = Number(item.num);
              item.coverArea = Number(item.coverArea);
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      getMayRentListData(){
        let _this = this;
        let form = {};
        form.myCreate =1;
        form.pairFlag = 1;
        newHouseList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            _this.tableData = data;
            _this.tableData.forEach(item=>{
              item.num = Number(item.num);
              item.coverArea = Number(item.coverArea);
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      getRowDataByClick(row){
        let _this = this;
        _this.clickColumnId = row.id;
      },
      handleSelectionChange(elemCheckbox){

      },
      saveFormData(){
        let check = this.projectId;
        if(!check){
          this.myAlert("请选择项目","dangerous-icon");
        }else{
          let elem = '';
          let houseElem = null;
          this.tableData.forEach(function(item){
            if(item.id == check){
              elem = item;
              houseElem = item;
              houseElem.projectAddress = item.projectName + "  " + item.registerName;
              return false;
            }
          })

          this.$parent.setCheckHouseData1(houseElem);
          this.cancelData();
        }
      },
      checkValueInArr(arr,value){
        let flag = false;
        let elem = null;
        for(let i = 0 ; i < arr.length ; i++){
          if(arr[i].id == value){
            flag = true;
            elem = arr[i];
            break;
          }
        }
        return {flag:flag,elem:elem} ;
      },
      cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },
      clearFormData(){
        this.word = "";
        this.projectId = '';
        this.projectState = '-1';
        this.form.word = '';
        this.dialogVisible = false;
      }

    },
    mounted(){
        let _this = this;
        this.form.districtId = this.setDistrictId;
        this.form.streetId = this.setStreetId;
        this.getRentParam();
    }
  }
</script>

<style lang="scss" scoped>
  .el-tab-pane {
    .pop-up {
      padding: 0;
      .pop-up-container {
        border: 0px;
      }
    }
  }
  .list-container{
    height:340px;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-radius:5px;
    .list-table{
      width:350px;
    }
  }
  .search-container{
    padding:5px;
    width:185px;
    border-width:0;
    .word{
      display:inline-block;
      line-height:27px;
      width:45px;
      text-align:right;
      padding-right:5px;
    }
    .item-earch-btn{
      width:130px;
      padding:0 5px ;
      font-size:12px;
      border: 1px solid #797979;
      line-height: 21px;
      margin: 10px 0 0 45px;
      text-align: center;
      border-radius: 3px;
      cursor:pointer;
    }
  }

</style>
