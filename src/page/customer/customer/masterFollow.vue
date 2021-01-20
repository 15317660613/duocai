<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="查看业主操作日志【最近三天】" width="500px" @close="clearFormData" :visible.sync="dialogHistoryFollow" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 308px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:10px 5px;" >

              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogHistoryFollow = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">刷 新</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {followList} from '../../../service/customerData'
  export default {
    props:["followShowMaster"],
    data() {
      return {
        dialogHistoryFollow:this.followShowMaster,
        form:{
          townId:0,
        },
      };
    },
    methods:{
      dialogShow(){
        this.dialogHistoryFollow = true;
      },
      saveData(){
        let _this =  this;
      },
      clickSaveCallback(){
        this.boxMessage.dialogVisible = false;
        this.clearFormData();
      },
      clearFormData(){

        this.form.townId = '';
        this.dialogModifyNum = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 10px 10px;
    .title-word{
      line-height:20px;
      font-size:12px;
    }

    .select {
      width: 120px;
    }
    p{
      color:#990000;
      font-size:12px;
    }
  }
</style>
