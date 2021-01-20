<template>
  <div style="width:100%;"  >
    <div class="pop-up-container" >
      <el-form :model="form"  ref="formsData" class="demo-ruleForm" style="height: 428px">
          <div style="width: 100%;float: left;margin-top: 10px;" >
            <span class="foss" style="margin-left: 5px">基础信息</span>
          </div>
          <div class="clear" style="width: 100%;">
            <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                <span class="des-word" >部门编号</span>
            </div> 
            <div class="left" > 
              <el-form-item   >
                <div style="float: left">
                  <el-select  :disabled="form.level != 1 ? true : false"   v-model="form.num1" placeholder=""  style="width: 60px">
                    <el-option
                      v-for="item in options1"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.label">{{item.label}}
                    </el-option>
                  </el-select>
                 
                </div>
                <div style="float: left">
                  <el-select  :disabled="form.level != 2 ? true : false"  v-model="form.num2" placeholder=""  style="width: 60px">
                    <el-option
                      v-for="item in options2"
                      :disabled="item.disabled"
                      :label="item.label"
                      :value="item.label">{{item.label}}
                    </el-option>
                  </el-select>
                 
                </div>
                <div style="float: left">
                  <el-select :disabled="form.level != 3 ? true : false" v-model="form.num3" placeholder=""  style="width: 60px">
                    <el-option
                      v-for="item in options3"
                      :disabled="item.disabled"
                      :label="item.label"
                      :value="item.label">{{item.label}}
                    </el-option>
                  </el-select>
                 
                </div>
                <div style="float: left">
                  <el-select :disabled="form.level != 4 ? true : false" v-model="form.num4"  placeholder=""  style="width: 60px">
                    <el-option
                      v-for="item in options4"
                      :disabled="item.disabled"
                      :label="item.label"
                      :value="item.label">{{item.label}}
                    </el-option>
                  </el-select>
                  
                </div>
                <div style="float: left">
                  <el-select :disabled="form.level != 5 ? true : false" v-model="form.num5"  placeholder="" style="width: 60px">
                    <el-option
                      v-for="item in options5"
                      :disabled="item.disabled"
                      :label="item.label"
                      :value="item.label">{{item.label}}
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="left" style="width:65px;padding-right:2px;text-align:center;" >
                <span class="des-word" >状态</span>
            </div>
            <div class="left" > 
              <div class="clear left">
                <el-form-item  prop="state" style="">
                  <el-select v-model="form.state" placeholder="" style="width:60px;">
                    <el-option v-for="item in chang"  :label="item.name" :value="item.value" ></el-option>
                  </el-select>
                </el-form-item>  
              </div>  
              <div class="clear left">
                <el-form-item  prop="value" style="">  
                  <el-select :disabled="form.preId=='' ? false : true" v-model="form.type" placeholder="" @change="clearss" style="width:40px;">
                    <el-option v-for="item in shixu"  :label="item.name" :value="item.value" ></el-option>
                  </el-select>
                </el-form-item>
              </div>  
            </div>  
          </div>
          <div class="clear" style="width: 100%;">
            <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                <span class="des-word require-word" >部门名称</span>
            </div>
            <div class="left" >  
              <el-form-item   >
                <el-input   v-model="form.name"  title="上限10个字" maxlength="10" style="width: 180px;float: left"></el-input>
              </el-form-item>
            </div>  
          </div>
          <div class="clear" v-show="form.type=='主'" >
              <div class="left" style="width:70px;text-align:right;padding-right:2px;" >
                  <span class="des-word" >业务设置</span>
              </div>  
              <div class="left clear" >
                <div class="left" >
                  <el-form-item  prop="doBusiness" >
                    <el-checkbox v-model="form.doBusiness"   type="checkbox"  :false-label="0" :true-label="1"  ></el-checkbox>
                  </el-form-item>
                 
                </div> 
                 <span class="left des-word" >挂房客</span>
              </div>
              <div class="left"  >
                <div class="left" >
                  <el-form-item  prop="businessCount" >
                    <el-checkbox v-model="form.businessCount"   type="checkbox"  :false-label="0" :true-label="1"  ></el-checkbox>
                  </el-form-item>
                 
                </div> 
                 <span class="left des-word" >业务统计</span>

                
              </div> 
              <div class="left" >
                <div class="left" >
                  <el-form-item  prop="achievementCount" >
                    <el-checkbox v-model="form.achievementCount"   type="checkbox"  :false-label="0" :true-label="1"  ></el-checkbox>
                  </el-form-item>
                 
                </div> 
                 <span class="left des-word" >业绩统计</span>
              </div>   
               
          </div>  
          <div class="clear" v-show="form.type=='主'" style="width: 100%;">
             <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                  <span class="des-word" >部门电话</span>
              </div>  
            <div class="left clear">
              <el-form-item >
                    <el-input @input="numck" v-model="form.phone" title="上限11位数" maxlength="11" style="width: 180px;"></el-input>
              </el-form-item>
            </div>  

            <div class="left clear" >
              <div class="left" style="padding:0 2px 0 10px;" >
                  <span class="des-word" >房/客源编号前缀</span>
              </div> 
               <div class="left" >
                <el-form-item label="" style="float: left;">
                  <el-input  @input="checkss"  v-model.trim="form.prefix" minlength="4"  title="只能输入4位大写字母，字母" maxlength="4" style="width:180px;float: left;"></el-input>
                </el-form-item>
              </div>  
            </div>
          </div>
          <div class="clear" v-show="form.type=='主'" style="width: 100%;">
             <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                  <span class="des-word" >部门地址</span>
              </div> 
              <div class="left" >
                <el-form-item >
                    <el-input  v-model="form.adress" title="上限30个字" maxlength="30" style="width: 463px;"></el-input>
                </el-form-item>
              </div>  
          </div>
          <div class="clear"  style="width: 100%;">
             <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                  <span class="des-word" >备注</span>
              </div> 
              <div class="left" >
                <textarea class="remark" type="textarea" v-model="form.remark" :rows="4" title="上限100个字" maxlength="100" style="width: 463px;height:95px;"></textarea>     
              </div>  
          </div>    
        </el-form>
     
    </div>
   
  </div>
</template>

<script>
  import {departdet} from '../../../service/getdepartData'
  import {departinsert} from '../../../service/organizeDate'

  export default {
    name: 'detailone',
    props:["editorBuilding","departid","form","setShowUpAndDown","thisindex"],
    data() {
      return {
        messageform:{
          torfn:'',
        },
        mycheckList:[],
        showUpAndDown:this.setShowUpAndDown,
        dialogFormEditorBuilding:this.editorBuilding,
        
      };
    },
    components:{

    },
    methods:{
      //校验
      numck(){
        this.form.phone=this.form.phone.replace(/[^\.\d]/g,'');
        this.form.telephonen=this.form.telephonen.replace('.','');
      },
      checkss(){
        this.form.prefix=this.form.prefix.replace(/[^\s+A-Z]/g,'')
      },
     
      
    
    },
    
  
    mounted(){
      this.messageform = this.form;
      console.log(this.messageform);
      if(this.messageform.ckdon=="1"){
        this.mycheckList.push('挂房客');
      };
      if(this.messageform.businessCount=="1"){
        this.mycheckList.push('业务统计');
      };
      if(this.messageform.achievementCount=="1"){
        this.mycheckList.push('业绩统计');
      }
      console.log(this.mycheckList);
    },
    watch: {
      form: {
        handler (newValue, oldValue) {
          this.messageform=newValue;
          console.log(this.messageform);
          this.mycheckList = [];
          if(this.messageform.ckdon=="1"){
            this.mycheckList.push('挂房客');
          };
          if(this.messageform.businessCount=="1"){
            this.mycheckList.push('业务统计');
          };
          if(this.messageform.achievementCount=="1"){
            this.mycheckList.push('业绩统计');
          }
        },
        deep:true
      }
    }
  }
</script>

<style scoped>
  /deep/#grey.pop-up .pop-up-container/deep/.el-input__inner{
    background-color: #A8A7A7;
  }
  .des-word{
    line-height:27px;
    color:#333;
  }
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .down-page-icon{
    background:url(../../../images/icon.png) -81px -118px;
    width:17px;
    height:17px;
    display:block;
    cursor:pointer;
  }
  .up-page-icon{
    background:url(../../../images/icon.png) -105px -120px;
    width:17px;
    height:17px;
    display:block;
    cursor:pointer;
  }
  .foss{
    border-width: 0px;
    left: 32px;
    top: 70px;
    width: 49px;
    height: 15px;
    font-size: 12px;
    color: #990000;
  }
  .pop-up .pop-up-container /deep/ .el-form-item__label {
    width: 68px!important;
  }
  span{
    font-family: '微软雅黑';
    font-size: 12px;
  }
  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }

  .inputs {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
    width: 98px;
    height: 22px;
    background-color: #E6E6E6;
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-decoration: none;
    color: #000000;
    text-align: left;
  }
  .nss{
    color: #000000;
    text-align: left;
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    line-height: normal;

  }
  /deep/ .mycheckList .el-checkbox__label{
    font-size: 12px;
  }
</style>
