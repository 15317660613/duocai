<template>
  <div class="" style="width:100%;padding:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container clear" style="margin-bottom:10px;height: 348px;" >
             <el-form ref="formsData"  :model="form" style="padding-left:25px" >
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总现金余额</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.allNum"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总收代收款</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true" title="上限30个字" maxlength="30"  v-model="form.incomeCollection"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总收入押金</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.totalCharge"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总收入欠款</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.borrowInMoney"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总未实付款</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.notActuallyPaid"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总未结年金</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.notPaidYearGold"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总未结月金</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.notPaidMonGold"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总补付余额</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.payTheBalance"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总未实收款</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.notReceived"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总交出押金</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.deposit"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总借出欠款</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.borrowOutmoney"   placeholder="" style="width:110px;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
                 <div class="clear" >
                    <div class="left  p-r-5" style="width:75px;text-align:right;" >
                        <span class="word " >总收付余额</span>
                    </div>
                    <div class="left padding-r-1" >
                        <el-form-item  prop="event" >
                            <el-input :disabled="true"   v-model="form.paymentBalance"   placeholder="" style="width:110px;text-align:center;text-align:center;"  ></el-input>
                    
                        </el-form-item>
                    </div>  
                 </div> 
             </el-form>    
        </div>
      </div>
  </div>
</template>
<script>

  import{getTotalCount}  from "../../../service/financeData";
  export default {
    props:["layerid",'type'],
    data() {
      return {
        form:{
          "notReceived":0.00,
          "incomeCollection": 0.00,
          "notActuallyPaid": 0.00,
          "totalCharge": 0.00,
          "borrowInMoney": 0.00,
          "deposit": 0.00,
          "borrowOutmoney": 0.00,
          "paymentBalance": 0.00,
          "notPaidMonGold": 0.00,
          "payTheBalance": 0.00,
          "allNum": 0.00,
          "notPaidYearGold": 0.00,
        }
      };
    },
    methods:{
      getDataList(){
        let _this =  this;
        this.$layer.loading({
        shade: true,//是否显示遮罩
        });
        let form = {type:this.type};
        getTotalCount().then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
               _this.form = response.data;
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

      height:135px;
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
  /deep/ .el-table th>.cell {
    padding:0;
    text-align:inherit;
    padding-right:10px;
    padding-left:10px;
  }
  /deep/.el-table th>.cell{
    text-align:inherit;
    padding:0;
    padding-right:10px;
    padding-left:10px;
  }
</style>
<style type="text/css">
  #questionFinancelist .el-table th.is-leaf{
      border-right-width:0px !important;
  }
  #questionFinancelist .el-table tr{
      background:#DCD9D3;
  }
  #questionFinancelist .el-table td {
    
    font-size: 12px;
    border-color: #DCD9D3 !important;
  }

</style>
