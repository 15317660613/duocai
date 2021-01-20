<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="批量修改进程状态" width="350px" height="250px" @close="clearFormData" :visible.sync="dialogModifyProgress" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " >
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:10px 5px;" >
                <el-form-item label="进程状态" prop="num" >
                  <el-select v-model="form.num"   class="select" >
                    <el-option v-for="item in nums"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogModifyProgress = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {getProgress,modifyProgress} from "../../../service/houseData";
  export default {
    props:["modifyProgressVisible"],
    data() {
      return {
        dialogModifyProgress:this.modifyProgressVisible,
        nums:[],
        ids:'',
        form:{
          num:0,
        },
      };
    },
    methods:{
      showDialog(ids){
        this.dialogModifyProgress = true;
        this.ids = ids;
        this.getProgressData();
      },
      getProgressData(){
        let _this = this;
        getProgress().then(function(response) {
          if (response.status == 500) {
            return false;
          }else if(response.status == 0) {
            let data = response.data;
            _this.nums = data;
            _this.form.num = data[0].id;


          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      saveData(){
        let _this =  this;
        let ids = _this.ids;
        let index = _this.form.num;
        modifyProgress(ids,index).then(function(response) {
          if (response.status == 500) {
            return false;
          }else if(response.status == 0) {
            _this.myAlert("数据保存成功",'success-icon').then(res => {
              _this.clickSaveCallback();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })


      },
      clickSaveCallback(){
        this.$emit("findCustomerListByHouse");
        this.clearFormData();
      },
      clearFormData(){
        this.form.num = 1;
        this.dialogModifyProgress = false;

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
