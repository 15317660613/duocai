<template>
  <div class="" >
    <el-dialog title="加入 【单栋】" width="350px" :visible.sync="dialogSingPedestal" append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 112px;">
          <div class="move-content" >

            <div class="clear" >
              <div class="left message-icon" >
                成功加入单栋记录
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogSingPedestal = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData">确 定</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {addPedestal} from '../../../service/newHouse'
  export default {
    props:["singPedestalValue"],
    data() {
      return {
        dialogSingPedestal: this.singPedestalValue,
        textarea2: "",
        form:{
          name: '',
          special: '',
          projectId: 0,
          pliesNumber: 0,
          stairsNumber: 0,
          doorNumber: 0,
          unitType: '',
          unitNumber: 0,
          liableDepart: '',
          liablePerson: '',
          createBy: 'aaa',
          deleted: 0,
        },
        formLabelWidth: '100px'
      };
    },
    methods:{
      singPedestal(id){
        this.dialogSingPedestal = true;
        this.form.projectId = id;
      },
      saveFormData(){
        let _this =  this;

        let form = _this.form;
        form.name="单栋";
        addPedestal(form).then(function(response){
          if(response.status == 500){
            return false;
          }else{
            let id = _this.form.villageId;
            _this.dialogSingPedestal = false;
            _this.$parent.reloadPedestal();
          }
        })

      },

    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 10px 10px;
    .message-icon{
      background:url(../../../images/system/success.png) no-repeat;
      background-size:70px;
      height:100px;
      font-size:12px;
      background-position: 25px 14px;
      line-height:100px;
      padding-left:80px;
      margin-left:30px;

    }
  }
</style>
