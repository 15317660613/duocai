<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 178px;"  >
          <div class="move-content" >
            <div class="clear" style="padding:10px 8px;" >
              <p>1、新增/修改   ①【房源归属人123】   ②【客源归属人12】   ③【报备详情-内部人员/带看/排卡】④【认筹详情-成交人员123】⑤【合同详情-签约人员/签约经理】</p>
              <p style="padding-bottom:15px;">选择人员时，该职位关联人员是否出现在人员选择范围内</p>
              <p style="padding-bottom:15px;" >2、统计管理选择【按人员】统计查询时，该职位关联人员是否出现在人员选择范围内</p>
              <p style="padding-bottom:15px;">3、统计管理选择【按职位】统计查询时，该职位是否出现在职位选择范围内</p>
              <p >4、当本功能处于选中时且本职位关联人员有上述5种资源时，不允许勾掉【挂房客及统计管</p>
              <p >理】 的操作</p>
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
