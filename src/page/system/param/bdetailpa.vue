<template>
    <div style="width:100%;margin:0 10px;">
      <div class="pop-up">
        <div class="pop-up-container" style="height:108px;" >
          <el-form :model="form" ref="formData" class="demo-ruleForm">
            <div class="clear" >
              <div class="left" style="width:60px;padding-right:5px;text-align:right;" >
                  <span class="word" >参数类型</span>
              </div> 
              <div class="left">
                <el-form-item  prop="type" >
                  <el-input disabled="true" v-model="form.type" id="type" style="width: 90px;" ></el-input>
                </el-form-item>
              </div>
              <div class="left" style="width:70px;padding-right:5px;text-align:right;" >
                  <span class="word " >序号</span>
              </div> 
              <div class="left">
                <el-form-item prop="num" >
                    <el-input disabled="true" v-model="form.num" title="必须2位数字" maxlength="2" style="width: 70px;" @change="numCheck" ></el-input>
                </el-form-item>
              </div>    
            </div>  
            <div class="clear" >
              <div class="left" style="width:60px;padding-right:5px;text-align:right;" >
                  <span class="word" >参数名称</span>
              </div> 
              <div class="left">
                <el-form-item prop="name" >
                    <el-input disabled="true" v-model="form.name" title="上限20个字符" maxlength="20" style="width: 229px;"></el-input>
                </el-form-item>
              </div>  
            </div>  
            <div class="clear" >
              <div class="left" style="width:60px;padding-right:5px;text-align:right;" >
                  <span class="word" >备注</span>
              </div> 
              <div class="left" style="padding-top:5px;" >
                <textarea v-model="form.remark" title="上限100个字符" class="remark" maxlength="100" style="width: 229px;height: 35px;"></textarea>
              </div>  
            </div> 
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding: 3px 0px;">
          <span class="right save-cancel-btn"  @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary"  @click="saveData()" >保 存</span>
        </div>
      </div>
  </div>
</template>

<script>
    import {pdetail} from "../../../service/getData";
    import {upparam} from "../../../service/getData";
    export default {
        name: "bdetailpa",
        props:['rowData','layerid'],
        data(){
            return{
              bparamVisible:false,
              formLabelWidth: '100px',
              
              pids:"",
              form:{
                id:"",
                type:"",
                name:"",
                num:"",
                remark:"",
              },
                
            }
        },

        methods:{
          numCheck(){
              this.form.num= this.form.num.replace(/[^\d]/g,'');
          },
          changemParams(){
            let _this=this;
            this.bparamVisible = true;
            let id= this.rowData.id;
            this.$layer.loading({
              shade: true,//是否显示遮罩
            });
            pdetail(id).then(function (response) {
              _this.$layer.closeAll("loading");
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                  _this.form = response.data;
              } else if (response.status == 1){
                _this.myAlert(response.msg,'dangouser-icon');
              }
            })
          },
           

          //确定按钮
          saveData(form){
            let _this=this;
            let type=this.form.type
            let num=this.form.num
            let name=this.form.name
            let remark= this.form.remark
            let id=this.form.id;
            
            this.$layer.loading({
              shade: true,//是否显示遮罩
            });
            upparam(id,name,type,num,remark,"lsy").then(function (response) {
              _this.$layer.closeAll("loading");
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                _this.myAlert("数据保存成功！", 'success-icon').then(res => {
                  _this.$parent.serche(type)
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
          }
        },
        mounted(){
          this.changemParams();
        }
    }
</script>

<style scoped>
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .word{
    font-size:12px;
    line-height:27px;
    display:inline-block;
  }
</style>
