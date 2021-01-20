<template>
   <div class="" style="width:100%;margin:0 10px;" >
    
      <div class="pop-up" >
        <div class="pop-up-container clear" style="height:354px" >
          <div class="left list-content  list-container" >
            <div class="list-table" style="width:390px;" >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="320"
                border
                @selection-change="selectchange"
              >
                <el-table-column
                  prop="check"
                  width="30"
                  label="√"
                >
                  <template slot-scope="scope">
                    <div  >
                      <input v-model="propertyOwnerId" type="radio" :value="scope.row.id"  @click="radio(scope.row)" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="customerCode"
                  label="客户编号"
                  :show-overflow-tooltip="true"
                  align='center'
                  width="60">

                </el-table-column>
                <el-table-column
                  prop="name"
                  label="客户"
                  width="60"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                  <template slot-scope="scope">
                    <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                      {{ scope.row.name }}
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="customerType"
                  label="交易"
                  width="60"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="area"
                  label="区县"
                  width="60"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="customerSaleStateId"
                  label="状态"
                  width="60"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="delegateDate"
                  label="委托日"
                  width="60"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="left clear " style="padding:10px 0px 0px 15px;" >
            <el-form class=" clear "  ref="formsData"  :model="forms" >

              <el-form-item  prop="word" >
                <span class="left" style="margin-left: -25px">交易</span>
                <el-select  v-model="forms.roomType" style="width:100px;" >
                  <el-option :id="stt.id" :value="stt.id" :label="stt.name" v-for="stt in prees1" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="word" >
                <span class="left" style="margin-left: -25px">状态</span>
                <el-select  v-model="forms.roomSaleStateId" style="width:100px;" >
                  <el-option :id="stt.id" :value="stt.id" :label="stt.name" v-for="stt in customerSaleStateIdParams" ></el-option>
                </el-select>
              </el-form-item>

              <div >
                <el-form-item  prop="word" >
                  <el-input  title="客源编号/客户名称" v-model="forms.word1" autocomplete="off" style="width:100px;" >
                  </el-input>
                </el-form-item>
              </div>
            </el-form>
            <div class="item-earch-btn"  @click="getCustomerDataList">
              查询
            </div>
            <div class="item-earch-btn"  @click="getMyCustomerListData">
              快查我的客源
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
          <span class="right save-cancel-btn"  @click="cancelData" >取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData" >确 定</span>
        </div>
      </div>
   
  </div>
</template>

<script>
  import {customerList,customerParams} from '../../../service/customerData'
  export default {
    name: 'choosecuster',
    props:['layerid','customerId'],
    data(){
      return{
        cusrt:"",
        prees1:[{
          id:-1,
          name:"全部"
        },{
          id:2,
          name:"求购"
        },{
          id:1,
          name:"求租"
        },{
          id:3,
          name:"租购"
        },],
        customerSaleStateIdParams:[],
        custsdialog:false,
        tableData:[],
        propertyOwnerId:this.customerId,
        forms:{
          roomSaleStateId:-1,
          roomType:-1,
          word1:"",
        }
      }
    },
   methods:{
     
     showcject(){
       let _this=this;
        debugger;
       customerParams(true).then(function(response){
         if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let customerSaleStateIdParams = response.data.customerSaleStateIdParams;
            _this.customerSaleStateIdParams = [{id:-1,name:"全部"}].concat(customerSaleStateIdParams);
            
            _this.getCustomerDataList();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
         
        })
     },
     getCustomerDataList(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.forms));
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
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
     clearFormData(){

     },
     selectchange(exe){

     },
     radio(id){
       this.cusrt=id
     },
     saveData(){
       if(this.cusrt!=""){
         this.$parent.cusr(this.cusrt);
         this.cancelData();
       }else{
         this.myAlert("请选择客源")
       }

     },
     cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },


   },
   mounted(){
     this.showcject();
   }

  }
</script>

<style lang="scss" scoped>
  .list-container{

    height:325px;
    background:#C0C0C0;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-radius:5px;
    margin:10px;
    border-radius:5px;

  }
  .item-earch-btn{
    border: 1px solid #666;
    line-height: 21px;
    margin-top: 10px;
    text-align: center;
    border-radius: 3px;
    cursor:pointer;
  }
  .search-container{
    padding:10px;

  }
  .buttons{
    border-width: 0px;
    margin-top: 10px;
    margin-bottom:10px ;
    width: 87px;
    height: 20px;
    background: inherit;
    background-color: rgba(223, 218, 213, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(102, 102, 102, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #1E1E1E;
  }
</style>
