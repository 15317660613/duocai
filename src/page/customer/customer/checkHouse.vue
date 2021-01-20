<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="选择房源" width="600px"  @close="clearFormData" :visible.sync="dialogRepeatRent" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container clear" style="height: 362px;">
          <div class="left list-container list-content" style="width: 380px;">
            <div class="list-table" id="editorSchoolList" >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="338"
                border
                v-loading="loading"
                highlight-current-row
              >
                <el-table-column
                  prop="check"
                  width="30"
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
                  :show-overflow-tooltip="true"
                  width="50">
                </el-table-column>

                <el-table-column
                  prop="num"
                  label="自定"
                  width="50"
                  sortable="true"
                  align="center"
                  :show-overflow-tooltip="true"

                >

                </el-table-column>
                <el-table-column
                  prop="roomTotalArea"
                  label="面积"
                  width="80"
                  sortable="true"
                  align="right"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="levelName"
                  label="价格"
                  width="80"
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
                <el-table-column
                  prop="adress"
                  label="地址"
                  width="190"
                  :show-overflow-tooltip="true"
                  sortable="true"
                  align="left"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="left search-container" style="width: 170px;">
            <el-form ref="formsData" :model="form">
              <div class="clear" >
                <div class="left" >
                  <span class="word"  >交易</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="cityId" >
                    <el-select  @change="changeType" v-model="form.type"  style="width:60px;" >
                      <el-option v-for="item in houseTradeParams1"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item  prop="roomType" >
                    <el-select :disabled="typeDisabled" v-model="form.roomType" style="width:60px;" >
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
                    <el-select v-model="form.roomSaleStateId" style="width:120px;" >
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
                    <el-select v-model="form.num" style="width:120px;" >
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
                  <el-form-item  prop="word1" >
                    <el-input v-model="form.word1" title="房源编号/楼盘字典/项目名称" style="width:120px;" ></el-input>
                  </el-form-item>
                </div>

              </div>
            </el-form>
            <div class="item-earch-btn" @click="getRentListData"   >
              查询
            </div>
            <div class="item-earch-btn" @click="getMyCustomerListData"  >
              快查我的房源
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogRepeatRent = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >确 定</span>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  // 获取数据
  import {rentParam,rentList,lableCompare} from '../../../service/houseData'
  import {rentConstParam} from '../../../utils/rentParam'
  export default {
    props:["checkHouseValue"],
    data() {
      return {
        dialogRepeatRent:this.checkHouseValue,
        loading:false,
        typeDisabled:false,
        multipleSelection:[],
        tableData:[],
        houseTradeParams:[],
        houseTradeParams1:[],
        numParams:[],
        roomSaleStateIdParams:[],
        word:"",
        formatter:"",
        houseId:'',
        form: {
          type:'-1',
          num: '-1',
          searchFlag:1,
          effectiveFlag:1,
          roomSaleStateId:"-1",
          customerId:'',
          roomType:'-1',
          pairFlag:1,
          word1:'',
        },
        formLabelWidth: '100px'
      };
    },
    components:{

    },
    methods:{
      dialogShow(customerId,houseId){

        this.dialogRepeatRent = true;
        this.form.customerId = customerId;
        this.houseId = houseId;
        this.getRentParam();
      },
      changeType(){
        let type = this.form.type;
        if(type == 1){
          this.typeDisabled = true;
          this.form.roomType = '-1';
        }else{
          this.typeDisabled = false;
        }
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
              let arr = [{id:"-1",name:"全部",select:true}];
              let numParams = data.numParams;
              if(numParams && numParams.length != 0){
                 numParams.forEach(function(item){
                   arr.push({
                     id:item.name,
                     name:item.name,
                     select:false,
                   })
                 })
              }
             
              _this.numParams = arr;
            }

            //状态
            if(data.roomSaleStateIdParams){
              _this.roomSaleStateIdParams = initArr.concat(data.roomSaleStateIdParams);
            }
            _this.houseTradeParams = initArr.concat(rentConstParam.houseTradeParams);
            _this.houseTradeParams1 = initArr.concat(rentConstParam.houseTradeParamsType);

            _this.getRentListData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      editorHouse(){

      },
      //查询
      getRentListData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        lableCompare(form).then(function (response) {
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
      getMyCustomerListData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let type = this.form.type;
        let form = {};
        form.myCreate =1;
        form.type = type;
        lableCompare(form).then(function (response) {
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
      reloadData(){
        this.getRentListData();
      },
      saveFormData(){
        let check = this.houseId;
        let rentData = null;
        if(check == '' ){
          this.myAlert("请选择房源","dangerous-icon");
        }else{
          let name = '';
          this.tableData.forEach(function(item){
            if(item.id == check){
              name = item.adress +"  " ;
              rentData = item;
              return false;
            }
          })
          this.clearFormData();
          this.$emit("setCheckData",check,name,rentData);
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
      clearFormData(){
        this.dialogRepeatRent = false;
        this.$refs.formsData.resetFields();
      }

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
    background:#C0C0C0;
    border:1px solid #797979;
    border-top-width:0;
    margin:0px 0 10px;
    border-radius:5px;
    
  }
  .search-container{
    padding:5px 0 0 5px;
    border-width:0;
    .word{
      display:inline-block;
      line-height:27px;
      width:42px;
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
