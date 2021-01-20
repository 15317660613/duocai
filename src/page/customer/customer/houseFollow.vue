<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'客源全部跟进 【'+titlename+'】'" width="500px" @close="clearFormData" :visible.sync="dialogHistoryFollow" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 262px;">
          <div class="move-content" >
            <div    class="clear" >
              <div class="followList" style="height:257px;overflow:auto;" >
                <div v-for="item in processings" :class="{'elemFollow':true,'clear':true,'click-check':item.id == followId}" @click="getFollowId(item.id)" >
                  <div class="left overflowEellipsis" style="width:270px;height:18px;padding-left:5px;"  >
                    <span v-html="item.remark" @click="editorFollowPage(item.id)" style="cursor:pointer;":class="{'follow-word':true,'blur-word':item.type == '带看','survey-word':item.type == '勘察'}"   ></span>
                  </div>
                  <div class="left break-left overflowEellipsis" style="width:80px;height:20px;text-align:right;padding-right:5px;" >
                    <span class="follow-word" >{{item.createBy}}</span>
                  </div>
                  <div class="left overflowEellipsis" style="width:80px;text-align:left;" >
                    <span class="follow-word" >{{item.createTime}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogHistoryFollow = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="reloadData">刷 新</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {followList} from '../../../service/customerData'
  export default {
    props:["followShowHouse"],
    data() {
      return {
        dialogHistoryFollow:this.followShowHouse,
        id:0,
        titlename:'',
        processings:[],
        followId:'',
        form:{
          townId:0,
        },
      };
    },
    methods:{
      dialogShow(id,titlename){
        this.dialogHistoryFollow = true;
        this.id = id;
        this.titlename = titlename;
        this.getFollowList();
      },
      getFollowId(id){
        this.followId = id;
      },
      getFollowList(){
        let _this = this;
        let id = this.id;
        let type = "全部跟进";
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        followList(id,type).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let processings = response.data;
            if(processings && processings.length != 0){
              processings.forEach(function(item){
                if(item.remark && item.remark.length > 20){
                  item.remark = item.remark.substring(0,20)+"...";
                }
              })
              _this.processings = processings;
            }else {
              _this.processings = [];
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      reloadData(){
        let _this =  this;
        this.getFollowList();
      },
      clickSaveCallback(){
        this.boxMessage.dialogVisible = false;
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
    .followList{
      height:135px;
      overflow:auto;
      .elemFollow{
        line-height:20px;
        background:#FBFBFB;
        border-bottom:1px solid #797979;
      }
    }
  }
  .click-check{
    background:#D7E8FC !important;
  }
  .blur-word{
    color:#0033cc;
  }
</style>
