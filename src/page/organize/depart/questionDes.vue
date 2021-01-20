<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 178px;"  >
          <div class="move-content" >
            <div class="clear" style="padding:20px 10px;" >
              <p style="padding-bottom:15px;" >①个人账套中-部门管理业绩设置部门时，该部门是否出现在部门选择范围内(下拉框中)</p>
              <p style="padding-bottom:15px;">②单笔业绩分成选择业绩归属部门时，该部门是否出现在部门选择范围内(下拉框中)</p>
              <p style="padding-bottom:15px;" >③统计管理选择【按部门】统计查询时，该部门是否出现在部门选择范围内(下拉框中)</p>
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
