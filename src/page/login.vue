<template>
    <div class="login-container">
      <el-form ref="formsData" :rules="rules" :model="form" >
        <div class="clear" >
          <div class="first left">
            <el-form-item  class="left" label="用户"   :label-width="formLabelWidth">
              <el-input v-model="form.accountNumber" id="accountNumber" autocomplete="off" style="width:170px;" ></el-input>
            </el-form-item>
            <el-button class="left" @click="toLogin" id="toLogin">登录</el-button>
          </div>
        </div>
        <div class="clear" >
          <div class="second left">
            <el-form-item  class="left" label="密码"   :label-width="formLabelWidth">
              <el-input type="password" v-model="form.accountPasswd" id="accountPasswd" autocomplete="off" style="width:170px;"></el-input>
            </el-form-item>
            <el-button class="left" @click="toColse" >放弃</el-button>
          </div>
        </div>
      </el-form>
    </div>
</template>

<script>
  import {login} from '../service/getData'
  export default {
    name: 'login',
    data() {
      return {
        form: {
          accountNumber:"",
          accountPasswd:"",
          lockedTime:0
        },
        rules: {
          accountNumber:[
            { required: true, message: '用户名不能为空!', trigger: 'blur' }
          ],
          accountPasswd:[
            { required: true, message: '密码不能为空!', trigger: 'blur' }
          ]
        },
        formLabelWidth: '100px'
      }
    },
    methods: {
      toLogin () {
        let _this =  this;
        var flag = false;
        this.$refs["formsData"].validate((valid) => {
          if (valid) {
          } else {
            flag = true;
            return false;
          }
        });
        let form = _this.form;
        login(form).then(function(response){
          if(response.status == 500){
            return false;
          }else{
            if (response.status == 0){
              sessionStorage.setItem("userName", response.data.name);
              sessionStorage.setItem("userId", response.data.id);
              sessionStorage.setItem("token", response.data.token);
              _this.$router.push("/home");
            } else{
              _this.myAlert(response.msg,"dangerous-icon");
            }
          }
        })
      },
      toColse () {
        window.opener = null
        window.open('', '_self')
        window.close()
      }
    }
  }
</script>

<style lang="scss" scoped>
    /deep/ .el-input__inner{
       height: 25px;
       BORDER-TOP-STYLE: none;
       BORDER-RIGHT-STYLE: none;
       BORDER-LEFT-STYLE: none;
       BORDER-BOTTOM-STYLE:solid;
       border-bottom-color: #606266;
       BACKGROUND-COLOR: transparent;
       border-radius:0px;
    }
    /deep/ .el-button {
      padding: 4px 15px;
      margin-top: 8px;
      margin-left: 12px;
      background: #E1DFE0;
    }

    /deep/ .el-form-item__label{
      font-weight: 800;
    }
    .adlert1{
      border-width: 0px;
      margin-left: -6px;
      left: 0px;
      top: 0px;
      width: 310px;
      height: 145px;
      background: inherit;
      background-color: rgba(220, 217, 211, 1);
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(121, 121, 121, 1);
      border-radius: 2px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    .adlert2{
      border-width: 0px;
      margin-top: 6px;
      margin-left: 3.5px;
      left: 0px;
      top: 0px;
      width: 301px;
      height: 101px;
      background: inherit;
      background-color: rgba(220, 217, 211, 1);
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(121, 121, 121, 1);
      border-radius: 2px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    .adlert3{
      border-width: 0px;
      text-align: center;
      left: 0px;
      top: 0px;
      width: 301px;
      height: 101px;
      background: inherit;
      background-color: rgba(255, 255, 255, 0);
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(255, 255, 255, 1);
      border-radius: 2px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    .login-container{
        width: 512px;
        height: 315px;
        margin:0 auto;
        background:url(../images/beijing.png);

        .first{
          margin-top: 135px;
          margin-left: 120px;
          height: 25px;
        }
        .second{
          margin-top: 20px;
          margin-left: 120px;
          height: 25px;
        }

    }
</style>
