<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="批量修改自定号" width="350px"  @close="clearFormData" :visible.sync="dialogModifyNum" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 112px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:20px 55px;" >
                <el-form-item label="自定号" prop="townId" >
                  <el-select v-model="form.num" class="select" style="width: 120px;">
                    <el-option v-for="item in nums"  :label="item.name" :value="item.name" ></el-option>
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
  import {paramList} from "../../../service/getData";
  import {modifyNum} from "../../../service/customerData";
  export default {
    props:["modifyNumVisible"],
    data() {
      return {
        dialogModifyNum:this.modifyNumVisible,
        nums:[],
        ids:'',
        form:{
          num:'',
        },
      };
    },
    methods:{
      newModifyNum(ids){
        this.dialogModifyNum = true;
        this.ids = ids;
        this.getNumData();
      },

      getNumData(){
        let _this = this;
        paramList('自定号').then(function(response) {
          if (response.status == 500) {
            return false;
          }else if(response.status == 0) {
            let data = response.data;
            let arr = [];

            _this.nums = data;
            _this.form.num = data[0].name;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      saveData() {
        let _this = this;
        let ids = _this.ids;
        let num = _this.form.num;
        modifyNum(ids, num).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功", 'success-icon').then(res => {
              _this.$emit("reloadCustomerList",1);
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
