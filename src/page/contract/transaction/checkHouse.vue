<template>
  <div class="" >

      <div class="pop-up" style="width:calc(100% - 20px);margin:0 10px;" >
        <div class="pop-up-container clear" style="width:calc(100% - 20px);" >
          <div class="left list-container list-content" >
            <div class="list-table" id="editorSchoolList" >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="338px"
                border
                @row-click="getRowDataByClick"
              >
                <el-table-column
                  prop="check"
                  width="25"
                  label="√"
                >
                  <template slot-scope="scope">
                    <div  >
                      <input v-model="houseId" type="radio" :value="scope.row.id"   />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="roomType"
                  label="交易"
                  sortable="true"
                  align="center"
                  width="50">
                </el-table-column>

                <el-table-column
                  prop="num"
                  label="自定"
                  width="50"
                  sortable="true"
                  align="center"
                >


                </el-table-column>
                <el-table-column
                  prop="adress"
                  label="地址"
                  width="150"
                  :show-overflow-tooltip="true"
                  sortable="true"
                  align="left"
                >
                </el-table-column>
                <el-table-column
                  prop="roomTotalArea"
                  label="面积"
                  width="50"
                  sortable="true"
                  align="right"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="levelName"
                  label="价格"
                  width="65"
                  sortable="true"
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
                    <el-select v-model="form.roomType"  placeholder="" style="width:100px;" >
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
                    <el-select v-model="form.roomSaleStateId"  placeholder="" style="width:100px;" >
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
                    <el-select v-model="form.num"  placeholder="" style="width:100px;" >
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
                    <el-input v-model="form.word4" title="房源编号/楼盘字典"  placeholder="" style="width:100px;" ></el-input>
                  </el-form-item>
                </div>

              </div>
            </el-form>
            <div class="item-earch-btn" @click="getRentListData"   >
              查询
            </div>
            <div class="item-earch-btn" @click="getMayRentListData"  >
              快查我的二手房
            </div>
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >确 定</span>
        </div>
      </div>

  </div>
</template>

<script>
  // 获取数据
  import {rentParam,rentList} from '../../../service/houseData'
  import {rentConstParam} from '../../../utils/rentParam'
  // 编辑租售
  export default {
    props:["getHouseId",'layerid'],
    data() {
      return {
        dialogRepeatRent:this.checkHouseValue,
        loading:false,
        multipleSelection:[],
        tableData:[],
        houseTradeParams:[],
        numParams:[],
        roomSaleStateIdParams:[],
        currentPage:null,
        word:"",
        formatter:"",
        houseId:this.getHouseId,
        form: {
          type:'-1',
          num: '-1',
          effectiveFlag:1,
          roomSaleStateId:"-1",
          roomType:'-1',
          word4:'',
           pairFlag:1,
        },
        formLabelWidth: '100px'
      };
    },
    components:{

    },
    methods:{
      getRowDataByClick (row, column, event) {
        let _this = this
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
      },
      
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
      getRentListData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        rentList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            _this.tableData = data;
            
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
            _this.tableData.forEach(item=>{
              item.num = Number(item.num);
              item.roomTotalArea = Number(item.roomTotalArea);
              item.levelName = Number(item.levelName);
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      reloadRentList(){
        this.reloadData();
      },
      reloadData(){
        this.getRentListData();
      },
      saveFormData(){
        let check = this.houseId;
        if(!check){
          this.myAlert("请选择房源","dangerous-icon");
        }else{
          let name = '';
          let houseElem = null;
          this.tableData.forEach(function(item){
            if(item.id == check){
              name = item.roomCode + item.adress + item.roomTotalArea;
              houseElem = item;
              return false;
            }
          })
          this.cancelData();
          this.$parent.setCheckHouseData2(houseElem);
        }
      },
      cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
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
        this.dialogRepeatRent = false;
        this.$refs.formsData.resetFields();
      }

    },
    mounted(){
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
    height:340px;
    overflow:auto;
    background:#C0C0C0;
    border:1px solid #797979;
    border-top-width:0;
    margin:0px 0 10px;
    border-radius:5px;
    .list-table{
      width:395px;
    }
  }
  .search-container{

    width:155px;
    border-width:0;
    .word{
      display:inline-block;
      line-height:27px;
      width:50px;
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
