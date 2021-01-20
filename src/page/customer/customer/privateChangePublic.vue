<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="form.type == 1 ?'私客转公客' : '公客转私客'" width="350px" @close="clearFormData" :visible.sync="dialogView" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 112px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class=" clear " style="padding:15px 50px;" >
                <div class="left  " >
                  <div class="clear padding-t-10" >
                      <div class="left type-width"  >
                          <span class="word-type" >请选择</span>
                          <span class="word-type" >转换类型</span>
                      </div>
                      <div class="left" >
                        <div class=" clear padding-t-2" >
                          <div class="left" >
                            <el-form-item  prop="type" >
                              <el-radio v-model="form.type" :label="1">&nbsp;</el-radio>
                            </el-form-item>
                          </div>
                          <div class="left" >
                            <span class="word-private-public" >私客转公客</span>
                          </div>
                        </div>
                        <div class=" clear " >
                          <div class="left" >
                            <el-form-item  prop="type" >
                              <el-radio v-model="form.type" :label="2">&nbsp;</el-radio>
                            </el-form-item>
                          </div>
                          <div class="left" >
                            <span class="word-private-public" >公客转私客</span>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogView = false">取 消</span>
          <span v-show="form.type == 1" style="padding: 3px 10px;" class="right save-cancel-btn" type="primary" @click="saveDataBtn">开始私客转公客</span>
          <span v-show="form.type == 2"  style="padding: 3px 10px;" class="right save-cancel-btn" type="primary" @click="saveDataBtn">开始公客转私客</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>

  import {privateChangePublic,privateChangePublicCount} from '../../../service/customerData'
  export default {
    props:["dialogVisible"],
    data() {
      return {
        dialogView:this.dialogVisible,
        titleName:'私盘转公盘',
        departTree:[],
        userList1:[],
        areaParams:[],
        tradeParams:[],
        roomSaleStateIdParams:[],
        dataParams:[],
        villages:[],
        
        form:{
          type:1,
          ids:'',
        },
      };
    },
    methods:{
      showDialogView(ids){
        this.dialogView = true;
        this.form.ids = ids;
      },
      
      saveDataBtn(){
        let _this =  this;
        let type = this.form.type;
        let typeName1 ='私客';
        let typeName2 = '公客';
        
        if(type == 2){
          typeName1 = '公客';
          typeName2 = '私客';
          this.titleName ='公客转私客';
        }else{
           this.titleName ='私客转公客';
        }
        _this.myConfirm("你确定要将"+typeName1+"转"+typeName2+"吗？", 'question-icon','是','否','').then(res => {
          _this.saveData();
        }).catch(err => {

        })

      },
      saveData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        privateChangePublic(form).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let message = response.msg;
            _this.myAlert(message, 'success-icon').then(res => {
              _this.$emit("reloadCustomerList",1);
              _this.clearFormData();
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
        this.$refs.formsData.resetFields();
        this.form.townId = '-1';
        this.dialogView = false;
        this.titleName ='私客转公客';
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    .cut-line-h{
      border-top:1px solid #797979;
      margin:10px 10px;
    }
    .padding-t-2{
      padding-top:2px;
    }
    .padding-t-10{
      padding-top:10px;
    }
    .padding-l-15{
      padding-left:15px;
    }
    .type-width {
        width:70px;
        padding-top:10px;
        .word-type {
          display: inline-block;
          color: #CC6600;
          line-height: 20px;
          text-align:center;
          width:70px;
        }
      }
   
      .word-private-public{
        display: inline-block;
        line-height: 27px;
        margin-left:-10px;
      }
      .left-icon{
        width:50px;
        height:100px;
        padding-left:20px;
      }
      .dangerous-word{
        width:110px;
        .green-word {
          color: #008000;
        }
      }
    .right-content{
      width:270px;
      .cut-line{
        border-right:1px solid #797979;
        padding-left:20px;
        width:1px;
        height:50px;
        margin-top:25px;
      }
      .select-des{
        width:130px;
        line-height:27px;
        display:inline-block;
        text-align:right;
        padding-right:5px;
      }
      .word-time{
        line-height:27px;
        display:inline-block;
        margin-left:-10px;
      }
    }
  }
  .padding1{
    padding-left:0px;
    display:inline-block;
    color:#000080;
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
    color:#000080;
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
    color:#000080;
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
    color:#000080;
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
    color:#000080;
  }
</style>
