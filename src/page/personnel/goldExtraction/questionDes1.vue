<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 178px;"  >
          <div class="move-content" >
            <div class="clear" style="padding:10px 15px;" >
              <p>①业绩分成每月数据是根据合同基本信息中的签约日同步过来的，合同签约日若修改，会导致分成人的业绩分成同步修改为签约日所在月。</p>
              <p>②从合同业绩分成同步过来的业绩分成可以修改【模式】、【特殊扣除】、【方式】、【结算年月】、【计工资】。</p>
              <p>③如果【主同步人】业绩已结算，【被同步人】被同步的该笔业绩显示绿色对勾作为可结算提示</p>
              <p>④【被同步人】增加删除业绩分成需在个人账套-评金提金设置-部门管理业绩设置中修改，或者在合同业绩分成详情-业绩归属部门中修改。</p>
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
