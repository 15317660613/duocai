<template>
  <div style="margin:0 10px;width:100%;">
    <div class="pop-up" >
      <div class="pop-up-container" style="height: 158px;">
        <el-form :model="form"  ref="form"  class="demo-ruleForm">
          
          <div class="clear" style="" >
            <div class="left p-r-3" style="width:50px;text-align:right;" >
              <span class="word require-word" >编号</span>
            </div>
            <div class="left">
              <el-form-item  prop="num" >
                <el-input  @input="checkNum" v-model="form.num" title="必须3位数" maxlength="3" style="width: 120px"></el-input>
              </el-form-item>
            </div >
            <div class="left p-r-3" style="width:120px;text-align:right;" >
              <span class="word require-word" >职位名称</span>
            </div>
            <div class="left" >
              <el-form-item  prop="name" >
                <el-input  v-model="form.name" title="上限5个字"  maxlength="5" style="width: 120px"></el-input>
              </el-form-item> 
            </div>  
          </div>        
          <div class="clear" >
            <div class="left p-r-3"  style="padding-left:50px;" >
                <el-form-item  prop="doManage" >
                  <el-checkbox style="height:20px;"  v-model="form.doManage"  :false-label="0" :true-label="1" ></el-checkbox>
                </el-form-item>
            </div>   
            <div class="left word" >
              <span class=""  >做管理</span>
            </div>
            <div class="left p-r-3"  style="padding-left:15px;" >
                <el-form-item  prop="doBusiness" >
                  <el-checkbox style="height:20px;"  v-model="form.doBusiness"  :false-label="0" :true-label="1" ></el-checkbox>
                </el-form-item>
            </div>
            <div class="left word " >
              <span class="" >挂房客及统计管理</span>
            </div>
            
            <div class="left" style="padding-top:7px;" >
                <i @click="showQuestion" class="question-gold-icon" ></i>
            </div> 
          </div>
          <div class="clear" >
            <div class="left p-r-3" style="width:50px;text-align:right;" >
              <span class="word " >备注</span>
            </div>
            <div class="left" style="padding-top:4px;" >
              <el-form-item >
                <textarea v-model="form.remark" class="remark" title="上限1000个字" maxlength="100"   style="width:357px;height:80px;" ></textarea>
              </el-form-item>  
            </div>
          </div>  
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer clear" style="padding: 3px 0px;">
        <span class="right save-cancel-btn" @click="cancelData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
      </div>
      <div class="clear footerabsoluteclass">
        <div class="left footerabsoluteclasschild" >
          <span class="record-word" style="margin-left:0px;">首次录入:</span>
          <span v-if="form.createBy" class="record-word">{{form.createBy}}</span>
          <span v-if="form.createTime" class="record-word">{{form.createTime}}</span>
          <span class="record-word footerpaddingleft10">最后修改:</span>
          <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
          <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {jobDetail,updateJob} from '../../../service/jobData'
  import QuestionDes1Page from './questionDes1'
  export default {
    name: 'jobdetail',
    props:["layerid","mythisindex","myid"],
    data(){
      return{
        destaffVisible:false,
        id:this.myid,
        thisindex:this.mythisindex,
        iad:"",
       
        form:{
          num:"",
          name:"",
          doManage:0,
          doBusiness:0,
          remark:"",
          state:0,
          createBy:"",
          createTime:"",
          updateBy:"",
          updateTime:"",
        },
        
      }
    },
    components:{
      QuestionDes1Page
    },
    methods:{
      checkNum(){
        this.form.num= this.form.num.replace(/[^\d]/g,'');
      },
      showQuestion(){
        let layerId = this.$layer.iframe({
            content: {
                content: QuestionDes1Page, //传递的组件对象
                parent: this,//当前的vue对象
                data:{}//props
            },
            area:['550px','250px'],
            title: "职位【挂房客及统计管理】说明",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
            }
        });
      },
      showDetailJob(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = this.id;
        jobDetail(id).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
              let staff = response.data.staff;
              for(let attr in staff){
                if(staff[attr] == null){
                  staff[attr] = "";
                }
              }
              _this.form = staff;
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        })
      },

      saveData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(this.form));
        let name = form.name;
        let num = form.num;
        if(name==null||name==""){
          this.myAlert("职位名称不能为空！","dangerous-icon");
          return false
        }
        if(num==null||num==""){
          this.myAlert("编号不能为空！","dangerous-icon");
          return false
        }else{
          if(!/\d{3}/.test(num)){
            this.myAlert("编号必须为3位数！","dangerous-icon");
            return false
          }
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        updateJob(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功！","success-icon").then(res => {
              _this.$parent.initstafflist();
              _this.cancelData();
            }).catch(res => {

            })
            
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        })
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
      this.showDetailJob();
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
  .question-gold-icon{
    display: inline-block;
    height:15px;
    width:15px;
    background: url("../../../images/icon2.png") -368px -61px;
  }
</style>
