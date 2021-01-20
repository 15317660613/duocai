<template>
  <div style="width:100%;padding:0 10px;">
      <div class="pop-up" >
        <div class="pop-up-container" style="height: 108px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
                <div class="" style="padding:10px 5px;" >
                  <el-form-item label="自定号" prop="townId" >
                    <el-select v-model="form.num"   class="select" >
                      <el-option v-for="item in nums"  :label="item.name" :value="item.name" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding: 3px 0px!important;">
          <span class="right  save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
  </div>
</template>
<script>
  import {paramList} from "../../../service/getData";
  import {firstHousechangeNum } from '../../../service/newHouse';
  export default {
    props:["layerid",'myids'],
    data() {
      return {
        nums:[],
        ids:this.myids,
        form:{
          num:'',
        },
      };
    },
    methods:{

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
        let form = {
          ids:_this.ids,
          num:_this.form.num,
        };
        firstHousechangeNum(form).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功", 'success-icon').then(res => {
              _this.$parent.searchNewHouseList();
              _this.clearFormData();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      clearFormData(){
        this.$layer.close(this.layerid);
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
      this.getNumData();
    },
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:30px 50px;
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
