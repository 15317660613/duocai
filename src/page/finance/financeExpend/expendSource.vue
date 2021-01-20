<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 304px;">
          <div class="move-content" style="padding:5px;" >
            <div class="clear" >
                <div class="left" style="width:100px;text-align:center;" >
                    <strong>收支流水号</strong>
                </div> 
                 <div class="left" style="width:180px;text-align:center;" >
                    <strong>收支操作日志</strong>
                </div> 
                <div class="left" style="width:50px;text-align:center;" >
                    <strong>金额</strong>
                </div>
                <div class="left" style="width:100px;text-align:center;" >
                    <strong>数量</strong>
                </div>
                 <div class="left" style="width:100px;text-align:center;" >
                    <strong>天数</strong>
                </div>    
            </div>
            <div class="break" >
                 
            </div> 
            <div class="clear" style="overflow:auto;height:187px;" >
                <el-form ref="formsData"  :model="form" >
                    <div class="clear " style="padding-top:5px;" v-for="(elem,index) in tableData" >
                        <div class="clear" >
                            <div class="left overflowEellipsis" style="width:100px;text-align:center;" >
                                <span>{{elem.financeExpenditureNumber}}</span>
                            </div> 
                            <div class="left overflowEellipsis" style="width:180px;text-align:center;" >
                                <span>{{elem.financeExpenditureUpdateBy}} {{elem.financeExpenditureUpdateTime}}</span>
                            </div>
                            <div class="left overflowEellipsis" style="width:50px;text-align:right;" >
                                <span>{{elem.price}}</span>
                            </div> 
                            <div class="left" style="width:100px;text-align:center;" >
                                <el-form-item  prop="num" >
                                <el-input
                                        style="width:80px;"
                                        @input="checkNum1(elem)"
                                        v-model.trim="elem.num"
                                        maxlength="10"
                                        title="上限10位数"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="left " style="width:100px;text-align:center;" >
                                <el-form-item>
                                <el-input
                                        style="width:80px;"
                                        @input="checkNum2(elem)"
                                        v-model.trim="elem.days"
                                        maxlength="10"
                                        title="上限10位数"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </div> 
                        <div class="clear" style="text-align:right;" >
                            <span class="record-word" >{{elem.updateBy}}</span>
                            <span class="record-word" >{{elem.updateTime}}</span>    
                        </div>    
                    
                    </div> 
                </el-form>            
            </div>     
          </div>
        </div>
        <div slot="footer" style="padding:5px 0px;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData" >确 定</span>
        </div>
      </div>
  </div>
</template>
<script>

  import {followList} from '../../../service/customerData'
  import {getExpendSourceData,modifyExpendSourceData} from '../../../service/expendData'
    
  export default {
    props:["layerid",'row','getId'],
    data() {
      return {
       
        id:0,
        processings:[],
        getIndex:this.index,
        getRow:this.row,
        followId:'',
        tableData:[],
        form:{
          remark:this.remark,
        },
      };
    },
    methods:{
      checkNum1(elem){
          elem.num= elem.num.replace(/[^\d]/g,'');
      },
      checkNum2(elem){
           elem.days= elem.days.replace(/[^\d]/g,'');
      },
      getDataList(){
        let _this =  this;
        this.$layer.loading({
        shade: true,//是否显示遮罩
        });
        let form = {financeConsumeManageId:this.getId};
        getExpendSourceData(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
                let list = response.data;
                
                _this.tableData = list;
            } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message+"！");
            }
        })
      },
      saveData(){
         let _this =  this;
        this.$layer.loading({
        shade: true,//是否显示遮罩
        });
        let financeConsumeAlls = JSON.stringify(_this.tableData);
        let form = {financeConsumeAlls:financeConsumeAlls};
        modifyExpendSourceData(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
                let list = response.data;
                _this.myAlert("数据保存成功",'success-icon').then(res => {
                  _this.$parent.searchExpendListData();
                  _this.cancelData();
                }).catch(err => {
                
                })
            } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message+"！");
            }
        })
         
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
        this.getDataList();
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    .followList{

      overflow:auto;
      .elemFollow{
        lien-height:20px;
        height:20px;
        border-bottom:1px solid #fff;
      }
    }
  }
  .click-check{
    background:#D7E8FC !important;
  }
</style>
