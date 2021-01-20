<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="修改顺位号" width="350px" height="250px" @close="clearFormData" :visible.sync="dialogModifySequence" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " >
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:10px 5px;" >
                <el-form-item label="顺位号" prop="num" >
                  <el-select v-model="form.num"   class="select" >
                    <el-option v-for="item in nums"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogModifySequence = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {getSequence,modifySequence} from "../../../service/houseData";
  export default {
    props:["modifySequenceVisible"],
    data() {
      return {
        dialogModifySequence:this.modifySequenceVisible,
        nums:[],
        id:0,
        form:{
          num:1,
        },
      };
    },
    methods:{
      showDialog(id,customerId){
        this.dialogModifySequence = true;
        this.id = id;
        this.getSequence(id,customerId);
      },
      getSequence(id,customerId){
        let _this = this;
        getSequence(customerId).then(function(response) {
          if (response.status == 500) {
            return false;
          }else if(response.status == 0) {
            let index = response.data;
            let arr =  [];
            for(let i = 1 ; i <= index ; i++){
              arr.push({
                id:i,
                name:i,
              })
            }
            _this.nums = arr;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      saveData(){
        let _this =  this;
        let id = _this.id;
        let index = _this.form.num;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        modifySequence(id,index).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          }else if(response.status == 0) {
            _this.myAlert("保存成功！",'success-icon').then(res => {
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
        this.dialogModifySequence = false;

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
