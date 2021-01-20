<template>
  <div  style="padding:0 10px;width:100%;" >
    <div class="pop-up" >
      <div class="pop-up-container" style="height: 312px;">
        <el-form :model="form"  ref="formsData" class="demo-ruleForm" style="height: 250px">
          <div class="clear" style="width: 100%;">
            <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                <span class="des-word" >部门编号</span>
            </div>  
            <div class="left clear" >
              
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
            <div class="left" style="width:65px;padding-right:2px;text-align:right;" >
                <span class="des-word" >状态</span>
            </div>
            <div class="left" > 
              <div class="clear left">
                <el-form-item>
                  <el-select v-model="form.state" placeholder="" style="width:60px;">
                    <el-option v-for="item in chang"  :label="item.name" :value="item.value" ></el-option>
                  </el-select>
                </el-form-item>  
              </div>  
              <div class="clear left">
                <el-form-item >  
                  <el-select :disabled="mytrueORfalse" v-model="form.type" placeholder="" @change="clearss" style="width:40px;">
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
               <div class="clear" >
                <div class="left" style="width:70px;text-align:right;padding-right:2px;" >
                    <span class="des-word" >业务设置</span>
                </div> 
                <div class="left clear" >
                  <div class="left" >
                    <el-form-item  prop="doBusiness" >
                      <el-checkbox :disabled="doBusinessDisabled" v-model="form.doBusiness"   type="checkbox"  :false-label="0" :true-label="1"  ></el-checkbox>
                    </el-form-item>
                    
                  </div> 
                  <div class="left p-l-2" >
                    <span class=" des-word" >统计管理</span>
                  </div>  
                  <div class="left" style="padding-top:7px;" >
                      <i @click="showQuestion" class="question-gold-icon" ></i>
                  </div> 
                </div>
              </div>   
              <div class="clear" style="padding:0px 0 0 70px;position:relative;top:-7px;"  >
                <span style="color:#999;" >（必须上级部门先设置）</span>
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
                <div class="left" style="padding:0 2px 0 0px;width: 113px;text-align:right;" >
                    <span v-if="form.doBusiness==1" class="des-word require-word" >房/客源编号前缀</span>
                    <span v-if="form.doBusiness==0" class="des-word" >房/客源编号前缀</span>
                </div> 
                <div class="left" >
                <el-form-item label="" style="float: left;">
                  <el-input  @input="checkss"  v-model.trim="form.prefix" minlength="4"  title="只能输入4位大写字母" maxlength="4" style="width:170px;float: left;"></el-input>
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
              <div class="left" style="padding-top:5px;" >
                <textarea class="remark" type="textarea" v-model="form.remark" :rows="4" title="上限100个字" maxlength="100" style="width: 463px;height:95px;"></textarea>     
              </div>  
          </div>    
        </el-form>
      </div>
      <div slot="footer" style="padding:5px 0px;" class="dialog-footer clear">
        <span class="right save-cancel-btn" @click="closeData" >取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
      </div>

    </div>
  </div>  
</template>

<script>
  import {addDepart} from '../../../service/organizeDate'
  import {departParam} from '../../../service/getdepartData'
  import QuestionDesPage from './questionDes'
  export default {
    name: 'adddepart',
    props:['layerid','id','type','level','clickDepartData','myThisType'],
    data(){
      return{
        newDepartVisible:false,
       
        newlevel:"",
        mytrueORfalse:false,
        doBusinessDisabled:false,
        achievementCountDisabled:false,
        businessCountDisabled:false,
        shixu:[
          {value:"主",name:"主"},
          {value:"辅",name:"辅"},
        ],
        chang:[
          {value:"常态",name:"常态"},
          {value:"关闭",name:"关闭"},
        ],
        options1: [],
        options2: [],
        options3: [],
        options4: [],
        options5: [],
        form:{
          id:'',
          preId:"",
          level:'',
          num1:'00',
          num2:'00',
          num3:'00',
          num4:'00',
          num5:'00',
          state:'常态',
          type:'主',
          name:'',
          doBusiness:0,
          businessCount:0,
          achievementCount:0,
          phone:'',
          prefix:'',
          adress:'',
          remark:'',

        },
       
      }
    },
    components:{
      QuestionDesPage
    },
    methods:{
       //校验
      numck(){
        this.form.phone=this.form.phone.replace(/[^\.\d]/g,'');
      },
      checkss(){
        this.form.prefix=this.form.prefix.replace(/[^\s+A-Z]/g,'')
      },
      showQuestion(){
         let layerId = this.$layer.iframe({
            content: {
                content: QuestionDesPage, //传递的组件对象
                parent: this,//当前的vue对象
                data:{}//props
            },
            area:['550px','250px'],
            title: "部门【统计管理】说明",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
            }
        });
      },
      shownewde(id,type,level,departData,myThisType){
        let _this = this;
        this.newDepartVisible=true;
        this.setNumOption();
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let mytype = type;
        let preId = id;
        let form = null;
        let currentType = "";
        if(type == '全'){
          currentType = '主';
        }else{
          currentType = type;
        }
       // if(level == 1){
          form = {level,type:currentType,preId2:preId};
        /*}else{
          form = {level,type:currentType,preId:preId};
        }*/
       
        departParam(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
             let data = response.data;
             let nums = response.data.nums;
             if(nums){
                 if(level == 1){
                   let options1 = _this.options1.concat();
                   options1.forEach(function(item){
                       if(nums.indexOf(item.label) != -1){
                           item.disabled = true;
                       }
                   })
                   _this.options1 = options1;
                 }
               if(level == 2){
                 let options2 = _this.options2.concat();
                 options2.forEach(function(item){
                   if(nums.indexOf(item.label) != -1){
                     item.disabled = true;
                   }
                 })
                 _this.options2 = options2;
               }
               if(level == 3){
                 let options3 = _this.options3.concat();
                 options3.forEach(function(item){
                   if(nums.indexOf(item.label) != -1){
                     item.disabled = true;
                   }
                 })
                 _this.options3 = options3;
               }
               if(level == 4){
                 let options4 = _this.options4.concat();
                 options4.forEach(function(item){
                   if(nums.indexOf(item.label) != -1){
                     item.disabled = true;
                   }
                 })
                 _this.options4 = options4;
               }
               if(level == 5){
                 let options5 = _this.options5.concat();
                 options5.forEach(function(item){
                   if(nums.indexOf(item.label) != -1){
                     item.disabled = true;
                   }
                 })
                 _this.options5 = options5;
               }
             }
            _this.form.level = level;
           
            if(departData){
              let num1 = departData.num1;
              if(num1 != null){
                _this.form.num1 = num1;
              }
              let num2 = departData.num2;
              if(num2 != null){
                _this.form.num2 = num2;
              }
              let num3 = departData.num3;
              if(num3 != null){
                _this.form.num3 = num3;
              }
              let num4 = departData.num4;
              if(num4 != null){
                _this.form.num4 = num4;
              }
              let num5 = departData.num5;
              if(num5 != null){
                _this.form.num5 = num5;
              }
            }

            if(type=='主'){
              _this.form.type="主"
            }
            if(type=="辅"){
              _this.form.type="辅"
            }
            if(type=='全'&&id!=''){
              _this.form.type = departData.type
            }
            
            _this.form.preId = id;
            if(id==''&&type=='全'){
              _this.mytrueORfalse = false;
            }else{
              _this.mytrueORfalse = true;
            }

            if(level == 2){
              let pre = data.pre;
              if(pre){
                let preDoBusiness = pre.doBusiness;
                if(preDoBusiness != 1){
                  _this.doBusinessDisabled = true;
                }
                
              }
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      setNumOption(){
        let arr = [];
        for(let i = 1 ; i <= 30 ; i ++){
          let name = i ;
          if(name < 10){
            name = "0"+i;
          }else{
            name = ""+i;
          }
          let obj = {
            id:i,
            label:name
          }
          arr.push(obj);
        }
        this.options1 = JSON.parse(JSON.stringify(arr));
        this.options2 = JSON.parse(JSON.stringify(arr));
        this.options3 = JSON.parse(JSON.stringify(arr));
        this.options4 = JSON.parse(JSON.stringify(arr));
        this.options5 = JSON.parse(JSON.stringify(arr));
      },
     
      
      saveData(){
        let _this=this;
        let form = JSON.parse(JSON.stringify(this.form));
        let name = form.name ;
        let level = form.level;
        if(name == ''){
          this.myAlert("部门名称不能为空！","dangerous-icon");
          return false;
        }
        if(form.doBusiness=='1'&&form.prefix==''){
          console.log('11231');
          this.myAlert("房/客源编号前缀不能为空！","dangerous-icon");
          return false;
        }

        if(level == 1){
            form.level = '';
        }else if(level == 2){
          form.level = 1;
        }else if(level == 3){
          form.level = 2;
        }else if(level == 4){
          form.level = 3;
        }else if(level == 5){
          form.level = 4;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        addDepart(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert(response.msg,'success-icon').then(res => {
              
              _this.$parent.searchDepart();
              _this.closeData();
            }).catch(err => {
              
            })
            
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        })
      },
     
      //清除
      clearss(){
        this.form.num1 = "00";
        this.form.num2 = "00";
        this.form.num3 = "00";
        this.form.num4 = "00";
        this.form.num5 = "00";
        this.shownewde('',this.form.type,1,{},1);
        this.mytrueORfalse = false;
      },
      closeData(){
         this.$layer.close(this.layerid);
      },
    },
    mounted(){
      let id = this.id;
      let type = this.type;
      let level = this.level;
      let departData = this.clickDepartData;
      let myThisType = this.myThisType;
      this.shownewde(id,type,level,departData,myThisType);
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
    },
  }
</script>

<style scoped>
  .pop-up .pop-up-container /deep/ .el-form-item__label {
      width: 68px!important;
  }
  span{
    font-family: '微软雅黑';
    font-size: 12px;
  }
  .des-word{
    line-height:27px;
  }
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
   .question-gold-icon{
    display: inline-block;
    height:15px;
    width:15px;
    background: url("../../../images/icon2.png") -368px -61px;
  }
</style>
