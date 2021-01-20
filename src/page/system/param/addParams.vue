<template>
  <div>
    <el-dialog
      v-dialogDrag
      @close="clearFormData"
      style=" height:100%"
      overflow="auto"
      :close-on-click-modal="false"
      id="addons"
      title="新增参数"
      :visible.sync="paramVisible"
      width="350px"

    >
      <div class="pop-up" >
        <div class="pop-up-container" style="height: 112px;">
          <el-form :model="form" ref="formData" class="demo-ruleForm">
            <div class="clear" >
              <div class="left" style="width:60px;padding-right:5px;text-align:right;" >
                  <span class="word" >参数类型</span>
              </div> 
              <div class="left">
                <el-form-item  prop="type" >
                  <el-input disabled="true" v-model="form.type" id="type" style="width: 80px;" ></el-input>
                </el-form-item>
              </div>
              <div class="left" style="width:70px;padding-right:5px;text-align:right;" >
                  <span class="word require-word" >序号</span>
              </div> 
              <div class="left">
                <el-form-item prop="num" >
                    <el-input v-model="form.num" title="必须2位数字" maxlength="2" style="width: 80px;" @change="numck"></el-input>
                </el-form-item>
              </div>    
            </div>  
            <div class="clear" >
              <div class="left" style="width:60px;padding-right:5px;text-align:right;" >
                  <span class="word require-word" >参数名称</span>
              </div> 
              <div class="left">
                <el-form-item prop="name" >
                    <el-input v-model="form.name" title="上限20个字符" maxlength="20" style="width: 229px;"></el-input>
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
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn"  @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary"  @click="saveData()" >保 存</span>
        </div>

      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {addparam} from "../../../service/getData";

  export default {
        name: "addParams",
        data(){
            return{
                paramVisible:false,
                formLabelWidth: '100px',
                
                form:{
                    type:"",
                    name:"",
                    num:"",
                    remark:"",
                },
               
            }
        },
        methods:{
            
            numck(){
                this.form.num= this.form.num.replace(/[^\.\d]/g,'');
                this.form.num= this.form.num.replace('.','');
            },
            changeParam(inpara){
                this.form.type=inpara
                this.paramVisible=true
            },
           
            
            //确定按钮
            saveData(){
              let _this=this
              let type=this.form.type
              let num=this.form.num+"";
              let name=this.form.name
              let remark= this.form.remark
              if(!num){
                this.myAlert("序号不能为空!","dangerous-icon");
                return false;
              }
              if(num && num.length != 2){
                this.myAlert("序号两位数!","dangerous-icon");
                return false;
              }
              if(!name){
                this.myAlert("名称不能为空!","dangerous-icon");
                return false;
              }

              addparam(name,type,num,remark,"lsy").then(function (response) {
                if (response.status == 500) {
                  return false;
                } else if (response.status == 0) {
                  _this.myAlert("数据保存成功！","success-icon").then(res => {
                    
                    _this.$parent.serche(type)
                    _this.clearFormData();
                  }).catch(res => {

                  })
                  
                } else if (response.status == 1) {
                  let message = response.msg;
                  _this.myAlert(message + "！");
                }   
                    
              })
                   
            },
            //恢复初始数据
            clearFormData(){
              this.$refs.formData.resetFields();
              this.paramVisible = false
            },
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
