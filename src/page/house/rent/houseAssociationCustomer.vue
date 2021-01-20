<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="房配客" width="350px" @close="clearFormData" :visible.sync="dialogModifyNum" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 312px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">

              <div class="" style="padding:10px 5px;" >
                <el-form-item label="自定号" prop="townId" >
                  <el-select v-model="form.townId"   class="select" >
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogModifyNum = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {findbyId,moveBuilding} from "../../../service/getData";
  export default {
    props:["modifyNumVisible"],
    data() {
      return {
        dialogModifyNum:this.modifyNumVisible,
        form:{
          townId:0,
        },
      };
    },
    methods:{
      newModifyNum(){
        this.dialogModifyNum = true;
      },
      saveData(){
        let _this =  this;
        let id = _this.form.clickColumnId;
        let newTownId = _this.form.newTownId;
        let newStreetId = _this.form.newStreetId;

        moveBuilding(id,newTownId,newStreetId).then(function(response){

        })
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
