<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="选择客源" width="600px"  @close="clearFormData" :visible.sync="dialogRepeatRent" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container clear" style="height: 362px;margin-bottom: 0px;">
          <div class="left list-container list-content" >
            <div class="list-table" id="editorSchoolList" >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="352px"
                border
                v-loading="loading"

              >
                <el-table-column
                  prop="check"
                  width="30"
                  label="√"
                >
                  <template slot-scope="scope">
                    <div  >
                      <input v-model="customerId" type="radio" :value="scope.row.id"   />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="customerType"
                  label="交易"
                  sortable="true"
                  align="center"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop=""
                  label="!"
                  width="35">
                  <template slot-scope="scope">
                    <div  style="padding-left:5px;position:relative;" >
                      <i :class="{'private-pan-icon':scope.row.customerProperty1 == '公客','public-pan-icon':scope.row.customerProperty1 == '私客'}" ></i>
                    </div>
                  </template>
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
                    prop="name"
                    label="客户姓名"
                    width="120"
                    sortable="true"
                    align="left"
                    :show-overflow-tooltip="true"
                  >
                  </el-table-column>


                <el-table-column
                  prop="area"
                  label="面积"
                  width="50"
                  sortable="true"
                  align="right"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="price"
                  label="价格"
                  width="65"
                  sortable="true"
                  align="right"
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
                      <el-option v-for="item in customerSaleStateIdParams"  :label="item.name" :value="item.id" ></el-option>
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
                <div class="left " style="padding-left:45px;"  >
                  <el-checkbox v-model="form.check" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
                </div>
                <div class="left" style="margin-left:-10px;" >
                  优质客
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <span class="word" >智能</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="word2" >
                    <el-input v-model="form.word2" title="客源编号/客户"   style="width:120px;" ></el-input>
                  </el-form-item>
                </div>

              </div>
            </el-form>
            <div class="item-earch-btn" @click="getRentListData"   >
              查询
            </div>
            <div class="item-earch-btn"  @click="getMyCustomerListData" >
              快查我的客源
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
  import {customerParams,customerList} from '../../../service/customerData'
  import {customerConstParam} from '../../../utils/customerParam'
  export default {
    props:["checkHouseValue"],
    data() {
      return {
        dialogRepeatRent:this.checkHouseValue,
        checkCustomer:this.checkCustomer,
        loading:false,
        multipleSelection:[],
        tableData:[],
        houseTradeParams:[],
        numParams:[],
        customerSaleStateIdParams:[],
        word:"",
        formatter:"",
        customerId:'',
        form: {
          num: '-1',
          roomSaleStateId:"-1",
          roomType:'-1',
          word2:'',
          check:0,
        },
        formLabelWidth: '100px'
      };
    },
    components:{

    },
    methods:{
      dialogShow(customerId){
        this.dialogRepeatRent = true;
        if(customerId) {
          this.customerId = customerId;
        }
        this.getRentParam();
      },

      //获取参数
      getRentParam(){
        let _this = this;
        customerParams().then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{id:"-1",name:"全部",select:true}];

            if(data.numParams){
              _this.numParams = initArr.concat(data.numParams);
            }

            //状态
            if(data.customerSaleStateIdParams){
              _this.customerSaleStateIdParams = initArr.concat(data.customerSaleStateIdParams);
            }
            _this.houseTradeParams = initArr.concat(customerConstParam.tradeParams);
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
        let check = this.form.check;
        if(check == 1) {
          form.customerProperty2 = 1;
        }
        
        customerList(form).then(function (response) {
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
        let form = {};
        form.myCreate =1;
        customerList(form).then(function (response) {
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
        let check = this.customerId;
        let customerData = null;
        if(check == '' ){
          this.myAlert("请选择客源","dangerous-icon");
        }else{
          let name = '';
          this.tableData.forEach(function(item){
            if(item.id == check){
              name = item.name;
              customerData = item;
              return false;
            }
          })
          this.clearFormData();
          this.$emit("setCheckData",check,name,customerData);
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
    height:354px;
    overflow:auto;
    background:#C0C0C0;
    border:1px solid #797979;
    border-top-width:0;
    margin:0px 0 10px;
    border-radius:5px;
    .list-table{
      width:370px;
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
  .public-pan-icon{
    background:url(../../../images/icon.png) -322px -230px;
    width:20px;
    height:20px;
    display:block;
  }
  .private-pan-icon{
    background:url(../../../images/icon.png) -344px -230px;
    width:20px;
    height:20px;
    display:block;
  }
</style>
