<template>
  <div class="" style="height: 475px" >
    <div class="pop-up-container" style="height: 442px;overflow-y:auto;">
      <el-form :model="dform" ref="formsData" label-width="60px" class="demo-ruleForm" style="height: 250px">
         <el-form-item v-for=" chan in dform.change" label="" class="boo" style="width: 644px;height: 86px;margin-top: 20px;margin-left: 20px">
             <div style="width: 642px;height: 85px;border: 1px solid #88898c;margin-left: -60px">
                   <span class="wt1" style="margin-left: 5px">{{chan.createBy}}</span>
                   <span class="wt1" style="margin-left: 20px">{{chan.createTime}}</span>
               <div class="wt2" style="margin-top: 15px;margin-left: 5px">
                   将&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="wt2">{{chan.type}}</span>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="wt2">{{chan.oldName}}</span>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修改为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="wt2">{{chan.newName}}</span>
               </div>
             </div>
         </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="footer-btn clear" style="padding:5px 0;"  >
      <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
      <span class="right save-cancel-btn" type="primary" @click="saveData"  >保 存</span>
    </div>
   
  </div>
</template>

<script>
  import {userchange} from '../../../service/organizeDate'
  export default {
    name: 'stafffour',
    props:["personid"],
    data(){
      return{
        dform:{
              change:[]
        }
      }
    },
    methods:{
        initd(id){
          let _this=this
          let ids=""
          if(id.id){
            ids=id.id
          }else{
            ids=id
          }
           
         
        },
        saveData(){

        },
        cancelData(){
          this.$emit("cancelData");
        },
        upPage(){
          this.$emit("upPage");
        },
        downPage(){
          this.$emit("downPage");
        },

    },
    mounted(){
      let id=this.personid
      this.initd(id)

    }

  }
</script>

<style scoped>
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
  /deep/.pop-up .pop-up-container .el-input__prefix {
    left: 100px;
  }
  /deep/.sdsd .el-input__prefix {
    margin-left: 43px;
  }
  .boo{
    width: 644px;
    height: 76px;
    background: inherit;
    background-color:#F0F0F0;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
   .wt1{
     font-size: 12px;
     color: #666666;
     font-family:'微软雅黑';
   }
   .wt2{
     font-size: 12px;
     color: #999999;
     font-family:'微软雅黑';
   }


  .head_img img{
    width:73px;
    height:73px;

    /*border-radius:50px*/
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
  }
  .nn{
    font-size:12px;
    -webkit-transform:scale(0.84);
    color: #999999;
  }

  .fll{
    float: left;
  }
  .cr{
    clear: both;
  }
  .dib{
    display: inline-block;
  }

  .selectno {
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
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 0px;
    border-width: 1px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
  }
  .ffinput{
    position: absolute;
    width: 29px;
    height: 20px;

    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-decoration: none;
    color: #000000;
    text-align: center;
    padding: 1px 0px 1px 0px;
    box-sizing: border-box;
  }
  .conr{
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    line-height: normal;
  }
  span{
    font-family: '微软雅黑';
    font-size: 12px;
  }
  .buttons{
    border-width: 0px;
    margin-top: 10px;
    margin-bottom:10px ;
    width: 87px;
    height: 20px;
    background: inherit;
    background-color: rgba(223, 218, 213, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(102, 102, 102, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #1E1E1E;
  }
</style>
