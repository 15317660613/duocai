<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="margin-bottom:10px;height: 114px;"  >
          <div class="move-content" >
            <div class="clear" style="padding:10px 0 0 0px;" >
              <div class="left" style="padding:30px 10px 0 10px ;" >
                <i class="dangerous-icon" ></i>
              </div>
              <div class="left" >
                  <p  >警告：该部门已被账套-部门管理业绩设置或</p>
                  <p >部门下产生相关业绩</p>
                  <p style="padding-bottom:10px;" >不允许勾掉【统计管理】的操作</p>
                  <p  >请先修改账套-部门管理业绩设置，</p>
                  <p  >或业绩分成归属部门！</p>
              </div>    
            </div>
          </div>
        </div>
        
        <div slot="footer" class="dialog-footer clear" style="margin-top:-5px;padding-bottom:5px;" >
          <span class="right save-cancel-btn" @click="cancelData">确 定</span>
        </div>
      </div>
     
  </div>
</template>
<script>

  export default {
    props:["layerid"],  
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
      cancelData(){
          this.$layer.close(this.layerid);
      }
     
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
