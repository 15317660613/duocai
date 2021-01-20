<template>
  <div style="padding: 0px 10px;">
      <div class="pop-up" style="padding:0 10px;width: 100%;" >
        <div class="pop-up-container" style="height:168px;line-height: 35px;" >
          1.实际出勤天数=当月应出勤天数(基础薪酬设置)-请假-旷工-缺卡-入离职当月的非在职天数.
        </div>
      </div>

  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  }
};
</script>
<style type="text/css" scoped="">
  /deep/ .pop-up .pop-up-container{
    margin: 10px 10px;
    padding: 15px;
  }
</style>
<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>