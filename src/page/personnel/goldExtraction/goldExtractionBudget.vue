<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 112px;">
          <div class="move-content" >
              <el-form ref="formsData"  :model="form" >
                  <div class="clear" style="padding:20px 0 0 30px;"  >
                    <div class="left" >
                        <span style="display:inline-block;line-height:27px" >结算年月</span>
                    </div>
                    <div class="left" >
                        <el-form-item   >
                            <el-date-picker 
                            type="month"
                             
                             
                            value-format="yyyy-MM"
                            v-model="form.time" 
                            style="width: 90px;"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                </div>            
              </el-form>   
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

  import {goldExtractionBudgetTime} from '../../../service/goldExtractionData'

  export default {
    props:["layerid",'ids','model'],
    data() {
      return {
       
        form:{
          time:'',
        },
      };
    },
    methods:{
      dialogShow(id){
        this.dialogHistoryFollow = true;
      },
      saveData(){
          let _this = this;
          let time = this.form.time;
          if(!time){
            this.myAlert("结算年月不能为空！",'dangerous-icon');
            return false;
          }
        _this.myConfirm("确定要将选定的提金结算到该年月吗？", 'question-icon','是','否').then(res => {
            _this.saveDatatoBack();
        }).catch(err => {
            
        })
          
      },
      saveDatatoBack(){
          let _this = this;
          let time = this.form.time;
          let ids = this.ids;
          let model = this.model;
          let form = {
              time:time,
              ids:ids,
              model:model,
          }
          goldExtractionBudgetTime(form).then(function(response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {

                _this.myAlert("数据保存成功！", 'success-icon',).then(res => {
                    _this.$parent.searchGoldExtractionListData();
                    _this.cancelData();
                }).catch(err => {
                })
            } else if (response.status == 1){
                _this.myAlert(response.msg,'dangouser-icon');
            }
        })
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
