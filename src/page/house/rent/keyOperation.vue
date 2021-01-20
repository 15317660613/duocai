<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="钥匙状态历史详情" width="500px" @close="clearFormData" :visible.sync="dialogOperation" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 262px;">
          <div class="move-content" >
            <div    class="clear" >
              <div class="followList" style="height:258px;overflow:auto;" >
                <div v-for="item in processings" class="elemFollow clear" @click="getDeletedFollowId(item.id)" >

                  <div  style="padding-left:5px;" >
                    <span class="follow-word" >{{item}}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogOperation = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">刷 新</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {houseOperation} from "../../../service/houseData";
  export default {
    props:["keyOperationeVisible"],
    data() {
      return {
        dialogOperation:this.keyOperationeVisible,
        id:0,
        processings:[],
        form:{
          townId:0,
        },
      };
    },
    methods:{
      dialogShow(id){
        this.dialogOperation = true;
        this.id = id;
        this.getFollowList();
      },
      getFollowList(){
        let _this = this;
        let id = this.id;
        let type = "修改钥匙状态";
        houseOperation(id,type).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.processings = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      saveData(){
        let _this =  this;
        this.getFollowList();
      },
      clickSaveCallback(){

        this.clearFormData();
      },
      clearFormData(){

        this.form.townId = '';
        this.dialogOperation = false
      },
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
</style>
