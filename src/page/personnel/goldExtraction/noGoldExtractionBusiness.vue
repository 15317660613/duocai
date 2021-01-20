<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 278px;" >
          <div class="move-content" style="padding:5px;" >
            <div class="clear" >
                <div class="left" style="width:200px;text-align:center;" >
                    <strong>业务事件</strong>
                </div> 
                 <div class="left" style="width:200px;text-align:center;" >
                    <strong>备注</strong>
                </div>    
            </div>
            <div class="break" >
                 
            </div> 
            <div class="clear" style="overflow:auto;height:248px;" >
                <div class="clear " style="padding-top:5px;" v-for="(elem,index) in tableData" >
                    <div class="left overflowEellipsis" style="width:200px;text-align:center;" >
                        <span>{{elem.id}}</span>
                    </div> 
                    <div class="left overflowEellipsis" style="width:200px;text-align:center;" >
                        <span>{{elem.name}}</span>
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
  import {noGoldExtractionBusinessDetail} from "../../../service/goldExtractionData";
    
  export default {
    props:["layerid",'row','type'],
    data() {
      return {
        dialogHistoryFollow:this.followShowHistory,
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
     
      getDataList(){
        let _this =  this;
        this.$layer.loading({
        shade: true,//是否显示遮罩
        });
        let userId = this.getRow.userId;
        let time = this.getRow.time;
        let form = {userId:userId,time:time,model:2,type:this.type};
        noGoldExtractionBusinessDetail(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
                let list = response.data.list;
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
