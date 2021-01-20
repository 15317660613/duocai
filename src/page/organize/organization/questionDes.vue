<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 108px;"  >
          <div class="move-content" >
            <div class="clear" style="padding:20px 15px;" >
              <p>【首上时间、止薪时间】不能选择【已封账】的工资年月</p>
              <p>【首上时间、止薪时间】所在月的工资【已封账】，不允许删除</p>
             
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
