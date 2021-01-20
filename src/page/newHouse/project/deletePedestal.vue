<template>
  <div class="" >
    <el-dialog title="删除栋座" width="350px" :visible.sync="dialogDeletePedestal" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 112px;">
          <div class="move-content" >

            <div class="clear" >
              <div class="left message-icon" >
                <p>警告：删除【栋座】将删除其关联【房号】记录</p>
                <p>确定要永久删除选定的栋座吗？</p>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn"  @click="dialogDeletePedestal = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">确 定</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {deletedPedestal} from '../../../service/newHouse'
  export default {
    props:["deletePedestalValue"],
    data() {
      return {
        dialogDeletePedestal:this.deletePedestalValue,
        textarea2:"",
        deletedId:"",
        formLabelWidth: '100px'
      };
    },
    methods:{
      deletePedestal(id){
        this.dialogDeletePedestal = true;
        this.deletedId = id;
      },
      //删除物业主
      saveData(){
        let _this = this;
        _this.dialogDeletePedestal = false;
        _this.myConfirm("[栋座]删除后将不能还原！", 'question-icon','是','否','确定要永久删除选定的栋座吗？').then(res => {

          _this.remarkConfirm();
        }).catch(err => {

        })
      },
      remarkConfirm(){
        let _this = this;
        let deleted = 1;
        let id = _this.deletedId;
        deletedPedestal(id,deleted).then(function (response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            _this.saveDataSuccess();
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }
        })
      },
      saveDataSuccess(){
        let _this =  this;
        _this.myAlert("栋座删除成功",'success-icon').then(res => {

          _this.$parent.reloadPedestal();
        }).catch(err => {
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:30px 0 10px 0px;
    .message-icon{
      background:url(../../../images/system/jinggao.png) no-repeat;
      background-size:70px;
      width:300px;
      height:60px;
      font-size:12px;
      background-position: -15px -20px;
      line-height: 100px;
      padding-left: 40px;
      p{
        line-height:25px;
      }
    }
  }
</style>
