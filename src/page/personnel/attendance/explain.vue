<template>
  <div class>
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      title="【实际出勤天数】 说明"
      width="550px"
      @close="clearFormData"
      :visible.sync="dialogNewFollow"
      :append-to-body="true"
    >
      <div class="pop-up" style="width:100%;padding:10px;">
      <div class="search-container" style="height:186px;width:auto;margin:0;padding:10px">
          <div>
              1、实际出勤天数=当月应出勤天数(基础薪酬设置)-请假-旷工-缺卡-入离职当月的非在职天数。
          </div>
      </div>
    </div>
  
  </el-dialog>
  </div>
  
</template>
<script>
export default {
    props:['newAttendVisible'],
  data() {
    return {
      
        dialogNewFollow:this.newAttendVisible
      
    };
  },
  methods: {
      explains(){
         this.dialogNewFollow = true;
      },
      clearFormData(){
          this.dialogNewFollow = false;
      }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 40px;
  .left {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/deep/ .side{
  width: 500px;
  border-width: 0px;
  border-right-width: 2px;
  border-top-width: 0px;
  border-style: solid;
  -o-border-image: url("../../../images/system/border.png") 2 repeat;
  border-image: url("../../../images/system/border.png") 2 repeat;
}


.padding-r-10 {
  padding-right: 10px;
}
.break {
  border-width: 2px;
  border-top-width: 0px;
  border-style: solid;
  border-image: url("../../../images/system/border.png") 2 repeat;
  margin: 8px 0 0;
}
</style>

