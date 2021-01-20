<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 328px;" >
          <div class="move-content" style="height:424px;padding:5px;" >
            <div class="clear" >
                <div class="left" style="width:270px;text-align:center;" >
                    <strong>历史修改记录</strong>
                </div> 
                 <div class="left" style="width:100px;text-align:center;" >
                    <strong>操作人</strong>
                </div> 
                <div class="left" style="width:166px;text-align:center;" >
                    <strong>操作时间</strong>
                </div> 
            </div>
            <div class="break" >
                 
            </div> 
            <div class="clear" style="overflow:auto;height:307px;" >
                <div class="clear " style="padding-top:5px;" v-for="(elem,index) in tableData" >
                    <div class="left" style="width:80px;text-align:center;color:#A72E2D;" >
                        <span>{{elem.time}}</span>
                    </div> 
                    <div class="left" style="width:180px;text-align:center;" >
                        <span>{{elem.model}}</span>
                    </div>
                    <div class="left" style="width:80px;text-align:center;" >
                        <span>{{elem.bonus}}</span>
                    </div> 
                    
                </div>         
            </div>     
          </div>
        </div>
      </div>
  </div>
</template>
<script>

  import {followList} from '../../../service/customerData'
  import {goldExtractionPersonTotalAngle} from "../../../service/goldExtractionData";
    
  export default {
    props:["layerid",'row','type'],
    data() {
      return {
        id:0,
        processings:[],
        getRow:this.row,
        followId:'',
        tableData:[],
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
        let userId = this.getRow.userId;
        let time = this.getRow.time;
        let form = {userId:userId,time:time,model:2,type:this.type};
        goldExtractionPersonTotalAngle(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
                let list = response.data.list;
                list.forEach(item =>{
                  if(item.explainRemark && item.explainRemark.length >= 15){
                    item.explainRemark = item.explainRemark.substring(0,15)+"...";
                  }
                })
                _this.tableData = list;
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
       // this.getDataList(this.id); 
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
