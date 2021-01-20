<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 178px;"  >
          <div class="move-content" >
            <div class="clear" style="padding:10px 20px;" >
              <p style="padding-bottom:15px;"  >①同【结算年月】的工资【已封账】，单笔评价奖金和业绩分成不能修改/删除。</p>
              <p style="padding-bottom:15px;" >②评价奖金和业绩分成的【结算年月】不能选择工资已封账的结算年月。</p>
              <p>③单笔业绩右侧【保存】，可起到调整【已结算】的业绩的排列顺序。结算年月对应</p>
              <p>的工资已封账，单笔业绩分成后边保存消失，显示已封账提醒。</p>
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
