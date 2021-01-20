<template>
  <div class="" style="margin:0 10px;" >

      <div class="pop-up" >
        <div class="pop-up-container clear" >
          <div class="left list-container list-content" >
            <div class="list-table" id="editorSchoolList" >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="338px"
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


                </el-table-column>
                <el-table-column
                  prop="customerCode"
                  label="客户编号"
                  width="120"
                  align="left"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="客户"
                  width="90"
                  align="center"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>

                <el-table-column
                  prop="customerType"
                  label="交易"
                  align="center"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  width="50">
                </el-table-column>

                <el-table-column
                  prop=""
                  label="区县"
                  width="50"
                  align="center"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="customerSaleStateId"
                  label="状态"
                  width="65"
                >

                </el-table-column>
                <el-table-column
                  prop="delegateDate"
                  label="委托日"
                  width="80"
                  align="center"
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
                  <span class="word" >交易</span>
                </div>

                <div class="left" >
                  <el-form-item  prop="roomType" >
                    <el-select v-model="form.roomType"  placeholder="" style="width:120px;" >
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
                    <el-select v-model="form.roomSaleStateId"  placeholder="" style="width:120px;" >
                      <el-option v-for="item in customerSaleStateIdParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>

              </div>

              <div class="clear" >

                <div class="left" style="padding-left:35px;" >
                  <el-form-item  prop="word2" >
                    <el-input v-model="form.word2" title="客源编号/客户名称" placeholder="" style="width:120px;" ></el-input>
                  </el-form-item>
                </div>

              </div>
            </el-form>
            <div class="item-earch-btn" @click="getRentListData"   >
              查询
            </div>
            <div class="item-earch-btn" @click="getMayRentListData"  >
              快查我的客源
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
  import {customerParams,customerList} from '../../../service/customerData'
  import {customerConstParam} from '../../../utils/customerParam'

  export default {
    props:["checkHouseValue",'layerid','customerIdParent'],
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
        customerId:this.customerIdParent,
        currentPage:'',
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
      getMayRentListData(){
        let _this = this;
        let form = {};
        form.myCreate =1;
        customerList(form).then(function (response) {
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
      reloadData(){
        this.getRentListData();
      },
      saveFormData(){
        let check = this.customerId;
        if(check == '' ){
          this.myAlert("请选择客源","dangerous-icon");
        }else{
          let elem = '';
          let houseElem = null;
          this.tableData.forEach(function(item){
            if(item.id == check){
              elem = item;
              houseElem = item;
              return false;
            }
          })
          this.$parent.setCheckCustomerData(houseElem);
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
        this.dialogRepeatRent = false;
        this.$refs.formsData.resetFields();
      }

    },
    mounted(){
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
    overflow:auto;
    background:#C0C0C0;
    border:1px solid #797979;
    border-top-width:0;
    margin:0px 0 10px;
    border-radius:5px;
    .list-table{
      width:380px;
    }
  }
  .search-container{
    padding:5px;
    width:165px;
    border-width:0;
    .word{
      display:inline-block;
      line-height:27px;
      width:35px;
      text-align:right;
      padding-right:5px;
    }
    .item-earch-btn{
      width:108px;
      padding:0 5px ;
      font-size:12px;
      border: 1px solid #797979;
      line-height: 21px;
      margin: 10px 0 0 35px;
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
