<template>
  <el-dialog :close-on-click-modal="false" v-dialogDrag title="以下是已有消耗人月,不能重复添加" width="350px"  @close="cancelData" :visible.sync="dialogAccount" :append-to-body='true' >
    <div class="" style="width:100%;" >
      <div class="pop-up" >
          <div class="pop-up-container " style="height: 112px;overflow: auto;">
            <div class="move-content" >
              <div v-html='thismsg' style="white-space: pre-wrap;line-height: 25px;padding-left: 20px;">
                {{thismsg}}
              </div>
            </div>
          </div>
          <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
            <span class="left" style="margin-left: 10px;">是否继续保存不重复的消耗人月?</span>
            <span class="right save-cancel-btn" @click="cancelData" style="padding: 3px 15px;">否</span>
            <span class="right save-cancel-btn" type="primary" @click="saveData" style="padding: 3px 15px;">是</span>
          </div>
        </div>
    </div>
  </el-dialog>
</template>
<script>

  import {bacthExpendMonthUser} from '../../../service/expendData'
  export default {
    props:["layerid"],
    data() {
      return {
        dialogAccount:false,
        thismsg:'',
        thisform:'',
      };
    },
    components:{

    },
    methods:{
      getData(thisform,thismsg){
        this.dialogAccount = true;
        this.thismsg = thismsg;
        this.thisform = thisform;
      },
      saveData(){
        let _this = this;
        bacthExpendMonthUser(this.thisform).then(function(res) {
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {

            _this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              _this.$parent.myparentfunc();
              _this.$parent.cancelData();
              _this.cancelData();
            })
            .catch(err => {});
          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      cancelData(){
        console.log('aaa');
        this.$layer.close(this.layerid);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .move-content {
    
    .remark{
      border:1px solid #aaa;
      border-radius:3px;
      font-size:12px;
    }
    .word{
      line-height:27px;
    }
    .padding-r-3{
        padding-right:3px;
    }
  }
  
</style>
