<template>
  <div class="" style="height:475px" >
    <div class="pop-up-container" style="height: 442px;overflow-y:auto;" >
      
    </div>
     <div slot="footer" class="footer-btn clear" style="padding:5px 0;"  >
      <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
      <span class="right save-cancel-btn" type="primary" @click="saveData"  >保 存</span>
    </div>
   
  </div>
</template>

<script>
  import {pepicture} from '../../../service/organizeDate'

  export default {
    name: 'picturethree',
    props:["personid","pform"],
    data(){
      return{
        pformlist:this.pform,
        dd:{
          createBy: "",
          createTime: "",
          data: "",
          deleted: 0,
          deletedBy: null,
          deletedTime: null,
          id: "",
          imageTypeId: "",
          obj: null,
          remark: null,
          updateBy: null,
          updateTime: null,
          userId: this.personid
        },
        rules:{

        },
      }
    },
    methods:{
      cancelData(){
         this.$emit("cancelData");
      },
      upPage(){
        this.$emit("upPage");
      },
      downPage(){
        this.$emit("downPage");
      },
       add(is){
         var  obj=JSON.parse(JSON.stringify(this.dd))
         this.pformlist.awrr.push(obj)
       },
        less(is,index){
          this.pformlist.awrr[index].deleted=1
       },
      saveData(){
        this.$emit('alldate')
      }
    },

    watch: {
      form: {
        handler (newValue, oldValue) {
          debugger
          this.pformlist=newValue
        }
      }
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
  .jia{
     background:url(../../../images/qiet.png) -213px -174px;
     width:20px;
     height:20px;
     display:inline-block;
   }
  .jian{
    background:url(../../../images/qiet.png) -242px -174px;
    width:20px;
    height:20px;
    display:inline-block;
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
