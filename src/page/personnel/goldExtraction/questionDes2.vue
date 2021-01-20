<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 178px;"  >
          <div class="move-content" >
            <div class="clear" style="padding:10px 20px;" >
              <p style="padding-bottom:15px;">①被同步过来的部门管理业绩，模式默认显示模式下拉中的第一个模式。</p>
              <p style="padding-bottom:15px;" >②部门管理业绩和个人业务业绩的模式只能选择在账套中设置的业绩模式。</p>
              <p >③单笔业绩未封账前可任意切换提金模式（切换模式只针对于个人），相同模式的业绩</p>
              <p>排列在一起。</p>
              
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
