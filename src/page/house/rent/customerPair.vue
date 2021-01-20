<template>
  <div class="" >

      <div class="pop-up" style="margin:0 10px;" >
        <div class="pop-up-container clear" >
          <div class="left list-container list-content" >
            <div class="list-table" id="editorSchoolList" >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="338px"
                ref="table"
                border
                v-loading="loading"
                @row-click="getRowDataByClick"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="30"
                  ref="multipleTable"
                  :selectable="checkSelectable"
                  disabled="true"
                >
                </el-table-column>
                <el-table-column
                  prop="customerType"
                  label="交易"
                  width="35">
                </el-table-column>
                <el-table-column
                  prop=""
                  label="!"
                  width="35">
                  <template slot-scope="scope">
                    <i  :class="{'public-icon':scope.row.customerProperty1 == '公客','private-icon':scope.row.customerProperty1 == '私客'}" >

                    </i>

                  </template>

                </el-table-column>
                <el-table-column
                  prop="num"
                  label="自定"
                  width="50"
                  align="center"
                  sortable="true"
                >

                </el-table-column>
                <el-table-column
                  prop="name"
                  label="客户姓名"
                  width="90"
                  align="center"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorCustomer(scope.$index, scope.row)" >
                      {{ scope.row.name }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="phoneNum"
                  label="电话"
                  width="90"
                  align="center"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="area"
                  label="面积"
                  width="70"
                  align="right"
                  sortable="true"
                  :show-overflow-tooltip="true"
                >

                </el-table-column>
                <el-table-column
                  prop="price"
                  label="价格"
                  width="80"
                  align="right"
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
                  <el-form-item  prop="customerType" >
                    <el-select v-model="form.customerType"    style="width:120px;" >
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
                    <el-select v-model="form.num"    style="width:50px;" >
                      <el-option v-for="item in numParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item  prop="customerProperty2" >
                    <el-select v-model="form.customerProperty2"    style="width:70px;" >
                      <el-option v-for="item in customerTypeParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <span class="word" >智能</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="word2" >
                    <el-input v-model="form.word2" title="客源编号/客户"    style="width:120px;" ></el-input>
                  </el-form-item>
                </div>

              </div>
            </el-form>
            <div class="item-earch-btn" @click="getCustomerListData"   >
              查询
            </div>
            <div class="item-earch-btn" @click="getMyCustomerListData"   >
              快查我的房源
            </div>
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogRepeatRent = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >标 记</span>
        </div>
      </div>
  </div>
</template>

<script>
  // 获取数据
  import {customerList,labelHouse,customerParams} from '../../../service/customerData'
  import {customerConstParam} from '../../../utils/customerParam'
  // 编辑客源
  import EditorCustomerPage from '../../customer/customer/editorCustomer'
  export default {
    props:["getHouseId","layerid"],
    data() {
      return {
        loading:false,
        havePairIds:null,
        multipleSelection:[],
        tableData:[],
        houseTradeParams:[],
        numParams:[],
        customerTypeParams:[],
        customerSaleStateIdParams:[],
        currentPage:'',
        word:"",
        formatter:"",
        houseId:'',
        form: {
          pairId:'',
          num: '-1',
          roomSaleStateId:"-1",
          customerType:'-1',
          customerProperty2:'-1',
          word2:'',
        },
        formLabelWidth: '100px'
      };
    },
    components:{
      EditorCustomerPage,
    },
    methods:{
      dialogShow(houseId){

      },
      checkSelectable(row) {
        return row.check == 0;
      },
      //获取参数
      getCustomerParam(){
        let _this = this;
        customerParams().then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{id:"-1",name:"全部",select:true}];

            if(data.numParams){
              let arr = [{id:"-1",name:"全部",select:true}];
              data.numParams.forEach(function(item){
                if(item){
                  arr.push({id:item.name,name:item.name})
                }
              })
              _this.numParams = arr;
            }

            //状态
            if(data.customerSaleStateIdParams){
              _this.customerSaleStateIdParams = initArr.concat(data.customerSaleStateIdParams);
            }
            ;
            _this.houseTradeParams = initArr.concat(customerConstParam.tradeParams);
            _this.customerTypeParams = initArr.concat(data.customerProperty2Params);
            _this.getCustomerListData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      editorCustomer(index, row){
        let _this = this;
        let ids = [];
        let currentData = this.tableData;
        let len = currentData.length;
        for(let i = 0 ;  i < len; i ++){
          ids.push(currentData[i].id);
        }
        this.currentPage = row;
        _this.$layer.iframe({
          content: {
            content: EditorCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,name:row.name,activeName:'house',ids:ids.toString(),currentIndex:index}//props
          },
          area:['800px','560px'],
          title:'客源信息',
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件

          }
        });
      },
      changeTitle(count){
        let _this = this;
        let currentData = this.currentData;
        _this.currentPage = currentData[count];
      },

      //查询
      getCustomerListData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        form.pairFlag = 1;

        customerList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            _this.tableData = data;
            let havePairIds = response.data.havePairIds.toString();
            _this.havePairIds = havePairIds;
            _this.$nextTick(function () {
              _this.tableData.forEach(row => {
                if(havePairIds.indexOf(row.id) != -1) {
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
      getMyCustomerListData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {};
        form.myCreate =1;
        form.pairFlag = 1;
        customerList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            _this.tableData = data;
            let havePairIds = response.data.havePairIds.toString();
            _this.havePairIds = havePairIds;
            _this.$nextTick(function () {
              _this.tableData.forEach(row => {
                if(havePairIds.indexOf(row.id) != -1) {
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
        let checkArr = this.multipleSelection;
        let check = this.multipleSelection.toString();
        let _this = this;
        let havePairIds = this.havePairIds;
        let arr = [];
        if(!check){
          this.myAlert("请选择客源",'dangerous-icon');
          return false;
        }

        if(havePairIds){
          for(let i = 0 ; i < checkArr.length ; i++){
            if(havePairIds.indexOf(checkArr[i]) == -1){
              arr.push(checkArr[i]);
            }
          }
        }else{
          arr = checkArr.concat();
        }

        if(havePairIds && arr.length == 0){
          this.myAlert("请选择客源",'dangerous-icon');
          return false;
        }else{
          let houseId = this.houseId;
          labelHouse(houseId,arr.toString()).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {

              _this.myAlert("标记配对成功！",'success-icon').then(res => {
                _this.dialogRepeatRent = false;
                _this.clearFormData();
                _this.$parent.findCustomerListByHouse();
              }).catch(err => {

              })
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },

      clearFormData(){
        this.$layer.close(this.layerid);
      }

    },
    mounted(){
      this.houseId = this.getHouseId;
      this.form.pairId = this.getHouseId;
      this.getCustomerParam();
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
      width:422px;
    }
  }
  .public-customer-icon{

     /* background: url(../../../images/icon.png) -342px -2px;
      width: 20px;
      height: 20px;
      display: block;*/
  }
  .search-container{
    padding:0 0 0 8px;
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
  /deep/.pop-up-container .list-content .el-table .el-table__body-wrapper {
    height:97% !important;
  }

</style>
