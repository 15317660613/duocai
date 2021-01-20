<template>
  <div class="" >
    <div>
      <el-dialog :close-on-click-modal="false" v-dialogDrag title="新增物业主" width="500px" @close="clearFormData" :visible.sync="dialogNewPropertyOwner" :append-to-body="true" >
        <div class="pop-up" >
          <div class="pop-up-container" style="height: 262px;">
            <el-form  :model="form"  ref="formdata" >
              <div class="clear" >
                <div class="left" style="padding-left:24px" >
                  <span class="require-word input-l-word" >名称(简)</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="shortName" >
                    <el-input v-model="form.shortName" maxlength="10" title="最多10个字" autocomplete="off" class="build-name" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item label="编号" prop="num"  label-width="80px">
                    <el-input @input="number"  v-model="form.num" maxlength="10" title="0-10位数" autocomplete="off" class="build-name" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item label="名称(全)" prop="name"   label-width="80px">
                    <el-input v-model="form.name" maxlength="100" title="最多100个字" autocomplete="off" class="name-width" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item label="法人代表" prop="representative"   label-width="80px">
                    <el-input v-model="form.representative" maxlength="10" title="最多10个字" autocomplete="off"  ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" style="padding-left:33px" >
                  <span class="require-word input-l-word" >联系人</span>
                </div>
                <div class="left" >
                  <el-form-item prop="userName"  >
                    <el-input v-model="form.userName" maxlength="10" title="最多10个字" autocomplete="off" class="build-name" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" style="padding-left:20px" >
                  <span class="require-word input-l-word" >联系电话</span>
                </div>
                <div class="left" >

                  <el-form-item prop="tel" >
                    <el-input @input="telNumber"  v-model="form.tel" maxlength="15" title="0-15位数" autocomplete="off" class="build-name" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item label="联系地址" prop="adress" label-width="80px">
                    <el-input v-model="form.adress" maxlength="1000" title="最多1000个字" autocomplete="off" class="name-width" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" style="border-width:0px;padding-bottom:10px;" >
                  <el-form-item label="简介备注" prop="remark"   label-width="80px">
                    <el-input
                      type="textarea"
                      title="最多1000个字"
                      maxlength="1000"
                      class=""
                      :rows="4"
                      style="width:360px;"
                      v-model="form.remark">
                    </el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer clear">
            <span class="right save-cancel-btn" style="margin-right:10px;" @click="dialogNewPropertyOwner = false">取 消</span>
            <span class="right save-cancel-btn" type="primary" @click="saveFormData">保 存</span>
          </div>

        </div>

      </el-dialog>

    </div>

  </div>
</template>

<script>
  import {newPropertyOwner,checkPropertyOwnerName,checkPropertyOwnerNum}  from '../../../service/getData'
  let repeatName = false;
  let repeatNum = false;
  export default {
    props:["newPropertyOwnerValue"],
    data() {

      return {
        dialogNewPropertyOwner:this.newPropertyOwnerValue,
        repeatName:repeatName,
        repeatNum:repeatNum,
        form: {
          id:'',
          shortName:"",
          num:"",
          name:"",
          representative:"",
          userName:"",
          tel:"",
          adress:"",
          remark:"",
          createBy:"aaa"
        },

      };
    },
    methods:{
      number(){
        this.form.num= this.form.num.replace(/[^\.\d]/g,'');
        this.form.num= this.form.num.replace('.','');
      },
      telNumber(){
        this.form.tel= this.form.tel.replace(/[^\.\d]/g,'');
        this.form.tel= this.form.tel.replace('.','');
      },
      newPropertyOwner(){
        this.dialogNewPropertyOwner = true;
      },
      saveFormData(){
        let _this =  this;
        let form = _this.form;
        let shortName = form.shortName;
        let userName = form.userName;
        let tel = form.tel;
        if(!shortName){
          _this.myAlert("名称(简)为空！",'dangerous-icon');
          return false;
        }
        if(!userName){
          _this.myAlert("联系人为空！",'dangerous-icon');
          return false;
        }if(!tel){
          _this.myAlert("联系电话为空！",'dangerous-icon');
          return false;
        }
        newPropertyOwner(form).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){

            _this.saveSuccess();
          }else{

          }
        })

      },

      saveSuccess(){
        let _this = this;
        _this.myAlert("新增成功",'success-icon').then(res => {
          _this.$parent.searchData();
          _this.clearFormData();
        }).catch(err => {
        })
      },

      //恢复初始数据
      clearFormData(formRule){
        this.$refs.formdata.resetFields();
        this.dialogNewPropertyOwner = false
      },

    }
  }
</script>

<style lang="scss" scoped>
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .input-l-word{
    display:inline-block;
    line-height:28px;
    padding-right:5px;
  }
  .name-width{
    width:360px
  }
  .remark{
    padding:2px 0;
  }
  /deep/ .el-textarea__inner{
    padding:5px;
    font-size:12px;
    border:1px solid #aaa;
  }
</style>
