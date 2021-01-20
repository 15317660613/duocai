<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: height:112px;">
          <div class="move-content" style="padding:5px;" >
              <textarea v-model="form.remark" title="上限100个字" maxlength="100" class="remark" style="width:310px;height:120px;" ></textarea>
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
  </div>
</template>
<script>

  import {followList} from '../../../service/customerData'

  export default {
    props:["layerid",'remark','index'],
    data() {
      return {
        dialogHistoryFollow:this.followShowHistory,
        id:0,
        processings:[],
        getIndex:this.index,
        followId:'',
        form:{
          remark:this.remark,
        },
      };
    },
    methods:{
      dialogShow(id){
        this.dialogHistoryFollow = true;
      },
      saveData(){
          this.$parent.setElemRemark(this.form.remark,this.index);
          this.cancelData();
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
        
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
