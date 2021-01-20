<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 178px;" >
          <div class="move-content" style="height:219px;padding:5px;" >
            <div class="clear" >
                <div class="left" style="width:220px;text-align:center;" >
                    <strong>补结算年月</strong>
                </div> 
                 <div class="left" style="width:230px;text-align:center;" >
                    <strong>补结算金额</strong>
                </div>    
            </div>
            <div class="break" >
                 
            </div> 
            <div class="clear" style="overflow:auto;height:190px;" >
                <div class="left" style="width:220px;text-align:center;" >
                    <span></span>
                </div> 
                 <div class="left" style="width:230px;text-align:center;" >
                    <span></span>
                </div>    
            </div>     
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import {goldExtractNoFirstBalance} from "../../../service/goldExtractionData";
    
  export default {
    props:["layerid",'id'],
    data() {
      return {
        dialogHistoryFollow:this.followShowHistory,
        id:0,
        processings:[],
        getIndex:this.index,
        followId:'',
        form:{
          remark:this.remark,
        },
      };
    },
    methods:{
     
      getDataList(){
        let _this =  this;
        this.$layer.loading({
        shade: true,//是否显示遮罩
        });
        let id = this.id;
        let form = {id:id};
        goldExtractNoFirstBalance(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
                let list = response.data.list;

            } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message+"！");
            }
        })
      },
      saveData(){
          this.$parent.setElemRemark(this.form.remark,this.index);
          this.cancelData();
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
       this.getDataList(this.id); 
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
</style>
