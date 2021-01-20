<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 178px;"  >
          <div class="move-content" >
            <div class="clear" style="padding:20px 10px;" >
              <p>1、若无上限的值不为空时，实际业绩超过账套设置的业绩档位的最大值，超出最大值的部</p>
              <p style="padding-bottom:15px;">分不计业绩提成。(业绩分档直提：业绩提成按照最后一个档位的最大值乘以比例计算)</p>
              <p>2、如果实际业绩在上一个档位的最大值和下一个档位的最小值之间，则业绩四舍五入进行</p>
              <p style="padding-bottom:15px;">计算。</p>
             
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        id:0,
        processings:[],
        followId:'',
        form:{
          townId:0,
        },
      };
    },
    methods:{
      dialogShow(id){
        this.dialogHistoryFollow = true;
      },
     
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
