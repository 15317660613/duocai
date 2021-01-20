<template>
  <div class="" style="margin:0 10px;width:100%;" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 110px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
                <div class="" style="padding:10px 5px;" >
                  <el-form-item label="自定号" prop="townId" >
                    <el-select v-model="form.num" placeholder="" class="select" >
                      <el-option v-for="item in nums"  :label="item.name" :value="item.name" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right  save-cancel-btn" style="margin-right:5px;" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
  </div>
</template>
<script>
  import { contractParams } from "../../../service/contractSpecial";
  import {modifycontractNum} from "../../../service/contractData";
  export default {
    props:["layerid","ids"],
    data() {
      return {
        nums:[],
        form:{
          num:'',
        },
      };
    },
    methods:{
      newModifyNum(){
        this.getNumData();
      },

      getNumData(){
        let _this = this;
        contractParams().then(function(response) {
          if (response.status == 500) {
            return false;
          }else if(response.status == 0) {
            let data = response.data;
            let numParams = data.numParams;
            if (numParams) {
              let arr = [];
              numParams.forEach(item =>{
                  arr.push({id:item.name,name:item.name})
              })
              _this.numParams = arr;
            }
            _this.nums = numParams;
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
        let form = {ids:ids,num:num};
        modifycontractNum(form).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功", 'success-icon').then(res => {
               
              _this.$parent.getFollowData();
              _this.cancelData();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },
    },
    mounted(){
        this.getNumData();
    },

  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:20px 50px;
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
