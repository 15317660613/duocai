<template>
  <div class="" style="width:100%;margin:0 10px;" >
     <div class="pop-up" >
        <div class="pop-up-container clear" style="height:478px;overflow:auto;margin-bottom:10px;" >
             <el-form ref="formsData"  :model="form" >
                <div class="clear" style="padding:10px;" >
                    <div class="clear" >
                        <span>经纪业务</span>
                    </div>
                    <div class="clear" v-for="(elem,index) in tableData" > 
                        <div class="clear left" style="width:105px;text-align:center;height:54px;line-height:54px;" > 
                            <span class="des-word" >{{elem.user}}</span>
                        </div>
                        <div class="clear left" > 
                            <div class="clear" > 
                                <div class="left" style="padding:7px 3px 0 0;" > 
                                    <i class="year-icon" ></i>
                                </div>
                                <div class="left" > 
                                    <span class="des-word" >应计业绩</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_y_num1"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="left padding-left-10" > 
                                    <span class="des-word" >已结业绩</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_y_num2"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-10" > 
                                    <span class="des-word" >未结业绩</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_y_num3"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-30" > 
                                    <span class="des-word" >应计年提成</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_y_num4"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-10" > 
                                    <span class="des-word" >已结年提成</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_y_num5"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-10" > 
                                    <span class="des-word" >未结年提成</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_y_num6"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-1" > 
                                    <span class="des-word" >元</span>
                                </div>  
                            </div> 
                             <div class="clear" > 
                                <div class="left" style="padding:7px 3px 0 0;" > 
                                    <i class="month-icon" ></i>
                                </div>
                                <div class="left" > 
                                    <span class="des-word" >应计业绩</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_m_num1"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="left padding-left-10" > 
                                    <span class="des-word" >已结业绩</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_m_num2"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-10" > 
                                    <span class="des-word" >未结业绩</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_m_num3"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-30" > 
                                    <span class="des-word" >应计月提成</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_m_num4"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-10" > 
                                    <span class="des-word" >已结月提成</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_m_num5"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-10" > 
                                    <span class="des-word" >未结月提成</span>
                                </div>
                                <div class="left padding-left-1" > 
                                   <el-form-item  >
                                        <el-input disabled="true"   style="width:55px;" v-model.trim="elem.type1_m_num6"  autocomplete="off"></el-input>
                                    </el-form-item>
                                </div> 
                                <div class="left padding-left-1" > 
                                    <span class="des-word" >元</span>
                                </div>  
                            </div> 
                        </div> 
                    </div>    
                </div>
             </el-form>    
        </div>
    </div>
   
  </div>
</template>

<script>
  import {goldExtractionBusinessDetail} from "../../../service/goldExtractionData";
 
  export default {

    props:["layerid","rowData"],
    data() {
      return {
         getRowData:this.rowData, 
         tableData:[],
         form:{},
      };
    },
    components:{
        
    },
    methods:{
        getGoldExtractionData(){
            let _this =  this;
            this.$layer.loading({
            shade: true,//是否显示遮罩
            });
            let userId = this.getRowData.userId;
            let time = this.getRowData.time;
            let id = this.getRowData.id;
            let form = {userId:userId,time:time,flag:1};
            goldExtractionBusinessDetail(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
                let list = response.data.list;
                if(list && list.length != 0){
                    _this.tableData = list;
                }else{  
                     _this.tableData = [];
                }
                
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
        
        this.getGoldExtractionData();
    }
  }
</script>

<style lang="scss" scoped>
  
  .elem-border{
    padding:10px 5px;
    margin-bottom:10px;  
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  .month-icon{
      width:14px;
      height:14px;
      display: inline-block;
      background:url("../../../images/icon2.png") -18px -81px no-repeat;
  }
  .year-icon{
      width:14px;
      height:14px;
      display: inline-block;
      background:url("../../../images/icon2.png") -49px -81px no-repeat;
  }
  .required-word::after{
      content:'*';
      color:#F72F2E;
  }
  .des-word{
      display: inline-block;
      line-height:27px;
      height:27px;
  }
  .type-des-word{
    display: inline-block;
    color:#AC3C3B;
    font-weight:700;
  }
  .padding-left-1{
      padding-left:1px;
  }
  .padding-left-5{
      padding-left:5px;
  }
  .padding-left-10{
      padding-left:10px;
  }
  .padding-left-30{
      padding-left:30px;
  }
  .save-btn{
    display: inline-block;
     padding:2px 5px;  
    border-width: 2px;
    border-style: solid;
    cursor:pointer;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  .question-gold-icon{
    display: inline-block;
    height:15px;
    width:15px;
    background: url("../../../images/icon2.png") -368px -61px;
  }
  .check-gold-icon{
    display: inline-block;
    height:18px;
    width:18px;
    background: url("../../../images/icon2.png") -256px -61px;
  }
  .synchron-gold-icon{
    display: inline-block;
    height:20px;
    width:20px;
    background: url("../../../images/icon2.png") -291px -59px;
  }
  .synchron-disabled-gold-icon{
    display: inline-block;
    height:20px;
    width:20px;
    background: url("../../../images/icon2.png") -331px -60px;
  }
  .angle-disabled-gold-icon{
    display: inline-block;
    height:18px;
    width:18px;
    background: url("../../../images/icon2.png") -392px -57px;
  }
  
</style>
