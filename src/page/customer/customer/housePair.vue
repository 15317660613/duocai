<template>
  <div class="" >
      <div class="pop-up" style="margin:0 10px;" >
        <div class="pop-up-container clear" >
          <div class="left  list-container list-content" >
            <div class="list-table" id="editorSchoolList" >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="338px"
                border
                highlight-current-row
                @row-click="getRowDataByClick"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="35"
                  ref="multipleTable"
                >
                </el-table-column>
                <el-table-column
                  prop="roomType"
                  label="交易"
                  sortable
                  :show-overflow-tooltip="true"
                  align="center"
                  width="50">
                </el-table-column>

                <el-table-column
                  prop="num"
                  label="自定"
                  sortable
                  :show-overflow-tooltip="true"
                  align="center"
                  width="50"
                >

                </el-table-column>
                <el-table-column
                  prop="roomTotalArea"
                  label="面积"
                  width="50"
                  sortable
                  :show-overflow-tooltip="true"
                  align="right"
                >
                  <template slot-scope="scope">
                    <div v-if="scope.row.roomTotalArea != ''" >
                      {{scope.row.roomTotalArea}}㎡
                    </div>

                  </template>

                </el-table-column>
                <el-table-column
                  prop="price"
                  label="价格"
                  width="65"
                  sortable
                  :show-overflow-tooltip="true"
                  align="right"
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
                  sortable
                  :show-overflow-tooltip="true"
                  align="left"
                >
                  <template slot-scope="scope">
                    <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorRent(scope.$index, scope.row)" >
                      {{ scope.row.adress }}
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
                  <el-form-item  prop="type" >
                    <el-select v-model="form.type" style="width:60px;" >
                      <el-option  label="全部" :value="-1" ></el-option>
                      <el-option  label="新房" :value="1" ></el-option>
                      <el-option  label="租售" :value="2" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item  prop="roomTypeIds" >
                    <el-select v-model="form.roomTypeIds" style="width:60px;" >
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
                    <el-select v-model="form.num"  style="width:60px;" >
                      <el-option v-for="item in numParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item  prop="roomProperty2" >
                    <el-select v-model="form.roomProperty2" style="width:60px;" >
                      <el-option v-for="item in roomProperty2Params"  :label="item.name" :value="item.id" ></el-option>
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
                    <el-input v-model="form.word1" title="房源编号/楼盘字典/项目名称/项目编号"  style="width:120px;" ></el-input>
                  </el-form-item>
                </div>

              </div>
            </el-form>
            <div class="item-earch-btn" @click="getRentListData"   >
              查询
            </div>
            <div class="item-earch-btn" @click="getMyListData"  >
              快查我的房源
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding:5px 0;">
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        </div>
      </div>

  </div>
</template>

<script>

  // 获取数据
  import {lableCompare,rentParam} from '../../../service/houseData'
  import {labelCustomer} from '../../../service/customerData'
  import {rentConstParam} from '../../../utils/rentParam'
  // 编辑租售
  import EditorRentPage from '../../house/rent/editorRent'
  export default {
    props:["getCustomerId",'layerid'],
    data() {
      return {
        dialogRepeatRent:this.pairHouseVisible,
        multipleSelection:[],
        tableData:[],
        houseTradeParams:[],
        numParams:[],
        roomSaleStateIdParams:[],
        roomProperty2Params:[],
        word:"",
        formatter:"",
        customerId:this.getCustomerId,
        currentPage:'',
        form: {
          type:-1,
          num: '-1',
          roomProperty2:'-1',
          roomSaleStateId:"-1",
          roomTypeIds:'-1',
          word1:'',
          pairFlag:1,
        },
        formLabelWidth: '100px'
      };
    },
    components:{
      EditorRentPage,
    },
    methods:{
      dialogShow(customerId){
        this.dialogRepeatRent = true;
        this.customerId = customerId;

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
                let arr = [];
                data.numParams.forEach(function(item){
                    arr.push({
                       id: item.name,
                       name: item.name,
                     }
                    )
                })
              _this.numParams = initArr.concat(arr);
            }

            //状态
            if(data.roomSaleStateIdParams){
              _this.roomSaleStateIdParams = initArr.concat(data.roomSaleStateIdParams);
            }
            if(data.roomProperty2Params){
              _this.roomProperty2Params = initArr.concat(data.roomProperty2Params);
            }

            _this.houseTradeParams = initArr.concat(rentConstParam.houseTradeParams);
            _this.getRentListData();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      editorRent(index, row){
        let _this = this;
        let ids = [];
        let currentData = this.tableData;
        let len = currentData.length;
        for(let i = 0 ;  i < len; i ++){
          ids.push(currentData[i].id);
        }
        this.currentPage = row;
        let test = _this.$layer.iframe({
          content: {
            content: EditorRentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,address:row.adress,activeName:'house',ids:ids.toString(),currentIndex:index}//props
          },
          area:['800px','560px'],
          title: "房源信息 【"+this.currentPage.adress+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
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
      //查询
      getMyListData(){
        let _this = this;
        let form = {myCreate:1};
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
        let check = this.multipleSelection.toString();
        let _this = this;
        if(!check){
          this.myAlert("请选择房源",'dangerous-icon');
          return false;
        }
        let customerId = this.customerId;
        labelCustomer(customerId,check).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.dialogRepeatRent = false;
            _this.myAlert("标记配对成功！",'success-icon').then(res => {

              _this.$parent.findCustomerListByHouse();
              _this.cancelData();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      cancelData(){
        this.$layer.close(this.layerid);
      },

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
      width:420px;
    }
  }
  .search-container{
    padding:5px 0 0 5px;
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
