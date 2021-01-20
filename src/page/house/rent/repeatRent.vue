<template>
  <div class="" >
      <div class="pop-up" style="margin:0 10px;" >
        <div class="pop-up-container clear" >
          <div class="left list-container list-content" >
            <div class="list-table " id="editorSchoolList" style="width: 354px;">
              <el-table
                :data="tableData"
                style="width: 100%"
                height="348px"
                ref="table"
                border
                @row-click="getRowDataByClick"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="30"
                  ref="multipleTable"
                >
                </el-table-column>
                <el-table-column
                  prop="roomType"
                  label="交易"
                  :sortable="true"
                  width="50">
                </el-table-column>

                <el-table-column
                  prop="num"
                  label="自定"
                  width="50"
                  align="center"
                  :sortable="true"
                >

                </el-table-column>
                <el-table-column
                  prop="roomTotalArea"
                  label="面积"
                  width="50"
                  align="center"
                  :show-overflow-tooltip="true"
                  :sortable="true"
                  :sort-method="sortmethod1"
                >

                </el-table-column>
                <el-table-column
                  prop="levelName"
                  label="价格"
                  width="70"
                  align="right"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.roomType == '出租'" >
                      {{scope.row.rentPrice}}
                    </div>
                    <div v-if="scope.row.roomType == '出售'" >
                      {{scope.row.salePrice}}
                    </div>
                    <div v-if="scope.row.roomType == '租售'" >
                      {{scope.row.salePrice}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="adress"
                  label="地址"
                  width="180"
                  align="left"
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
                      <span class="word" >交易</span>
                    </div>

                    <div class="left" >
                      <el-form-item  prop="roomType" >
                        <el-select v-model="form.roomType"    style="width:120px;" >
                          <el-option v-for="item in houseTradeParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                </div>
                <div class="clear" >
                <div class="left" >
                  <span class="word" >状态</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="roomSaleStateId" >
                    <el-select v-model="form.roomSaleStateId"    style="width:120px;" >
                      <el-option v-for="item in roomSaleStateIdParams"  :label="item.name" :value="item.id" ></el-option>
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
                    <el-select v-model="form.num"    style="width:120px;" >
                      <el-option v-for="item in numParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>

              </div>
                <div class="clear" >
                <div class="left" >
                  <span class="word" >智能</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="word4" >
                      <el-input v-model="form.word4" title="房源编号/楼盘字典"    style="width:120px;" ></el-input>
                  </el-form-item>
                </div>

              </div>
            </el-form>
              <div class="item-earch-btn" @click="getRentListData"   >
                查询
              </div>
              <div class="item-earch-btn" @click="getMayRentListData(1)"   >
                快查我的房源
              </div>
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >确定</span>
        </div>
      </div>
  </div>
</template>

<script>
  // 获取数据
  import {rentList,rentParam} from '../../../service/houseData'
  import {rentConstParam} from '../../../utils/rentParam'
  // 编辑租售

  export default {
    props:["repeat","layerid","id"],
    data() {
      return {
        dialogRepeatRent:this.repeatRentValue,
        multipleSelection:[],
        tableData:[],
        houseTradeParams:[],
        numParams:[],
        roomSaleStateIdParams:[],
        word:"",
        formatter:"",
        customerId:'',
        currentPage:'',
        form: {
          num: '-1',
          roomSaleStateId:"-1",
          roomType:'-1',
          word4:'',
        },
        formLabelWidth: '100px'
      };
    },
    components:{

    },
    methods:{


      //获取参数
      getRentParam(){
        let _this = this;
        rentParam().then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{id:"-1",name:"全部",select:true}];

            if(data.numParams){
              _this.numParams = initArr.concat(data.numParams);
            }

            //状态
            if(data.roomSaleStateIdParams){
              _this.roomSaleStateIdParams = initArr.concat(data.roomSaleStateIdParams);
            }
            _this.houseTradeParams = initArr.concat(rentConstParam.houseTradeParams);
           
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
        form.pairFlag = 1;
        if(type == 1){
          form.myCreate =1;
        }
        rentList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            let arr = [];
            let houseId = _this.id;
            data.forEach(item => {
              if(item.id != houseId){
                arr.push(item);
              }
            })
            _this.tableData = arr;
            let repeat = _this.repeat;
            let ids = [];

            if(repeat && repeat.length != 0){
              repeat.forEach(function(item){
                ids.push(item.id);
              });
            }
            ids = ids.toString();
            _this.$nextTick(function () {
              _this.tableData.forEach(row => {
                if(ids.indexOf(row.id) != -1) {
                  row.check = 1;
                  _this.$refs.table.toggleRowSelection(row, true);
                }else{
                  row.check = 0;
                }
              })
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
        rentList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            _this.tableData = data;
            let repeat = _this.repeat;
            let ids = [];

            if(repeat && repeat.length != 0){
                repeat.forEach(function(item){
                   ids.push(item.id);
                });
            }
            ids = ids.toString();
            _this.$nextTick(function () {
              _this.tableData.forEach(row => {
                if(ids.indexOf(row.id) != -1) {
                  row.check = 1;
                  _this.$refs.table.toggleRowSelection(row, true);
                }else{
                  row.check = 0;
                }
              })
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
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },
      saveFormData(){
          let check = this.multipleSelection;
          
          let arr = [];
          for(let j = 0 ; j < check.length ; j++){
            let obj = this.checkValueInArr(this.tableData,check[j]);
            if(obj.flag){
              arr.push(obj.elem);
            }
          }
          this.$layer.close(this.layerid);
          this.$parent.setRepeatData(arr);
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
      clearFormData(){
        this.$layer.close(this.layerid);
      },
      sortmethod1(a,b){
        return (Number(a.roomTotalArea) - Number(b.roomTotalArea))
      } 
    },
    mounted(){
      let _this = this;

      this.getRentParam();
    },

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
    height:350px;
    background:#C0C0C0;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-radius:5px;
    .list-table{
      width:380px;
    }
  }
  .search-container{
    padding:5px;
    width:180px;
    border-width:0;
    .word{
      display:inline-block;
      line-height:27px;
      width:45px;
      text-align:right;
      padding-right:5px;
    }
    .item-earch-btn{
      width:108px;
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
