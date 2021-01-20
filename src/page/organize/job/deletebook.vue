<template>
  <el-dialog
    v-dialogDrag
    :close-on-click-modal="false"
    style=" height:100%"
    overflow="auto"
    id="addons"
    title="删除职务账套"
    :visible.sync="delbookVisible"
    width="350px"
  >
    <div class="pop-up" >
      <div class="pop-up-container" style="height: 112px;">
        <div id="dest1">
          <div id="dest2">
            <div id="dest3" class="clear" style="margin-top: 15px;">
              <i class="warnning"></i>
              <p style=" float:left;margin:20px 0 8px 5px;"><span  id="" >警告：职位账套删除后不能还原！</span></p>
              <p style=" float:left;margin:0px 0 22px 64px;"><span  id="" >确定要将选定的职位账套永久删除吗？</span></p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
        <span class="right save-cancel-btn" @click="delbookVisible=false">取 消</span>
        <span class="right save-cancel-btn" type="primary"  @click="saveData">确 定</span>
      </div>
      
    </div>
  </el-dialog>
</template>

<script>
  import {delbook} from '../../../service/jobData'

  export default {
    name: 'deletebook',
    data(){
      return{
        delbookVisible:false,
        dearr:[]
      }
    },
    methods:{
      showdebk(arr){
        debugger
        this.dearr=arr;
        this.delbookVisible=true
      },
      saveData(){
        let _this=this
        let  deleted=1
        let  ids=this.dearr;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        delbook(ids).then(function (res) {
          _this.$layer.closeAll("loading");
          if(res.status==0){
             _this.myAlert("删除成功",'success-icon').then(res => {
                 _this.$emit("search");
                 _this.delbookVisible=false;
              }).catch(err => {

              })
           }else{
             _this.myAlert(res.msg,'dangerous-icon').then(res => {
               _this.delbookVisible=false;
             }).catch(err => {

             })
           }
        })

      }

    }

  }
</script>

<style scoped>
  .warnning{
    float: left;
    margin-top: 16px;
    margin-left: 40px;
    width:20px;
    height:20px;
    display:inline-block;
    background:url(../../../images/system/jinggao.png) -15px -15px;
  }
  select {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: black;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: menulist;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    background-color: white;
    cursor: default;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(169, 169, 169);
    border-image: initial;
  }
  input {
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
  #dest1{
    border-width: 0px;
    margin-left: -6px;
  }
  #dest2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3.5px;
  }
  #dest3{
    border-width: 0px;
    text-align: center;

  }
  .buttons{
    border-width: 0px;
    left: 0px;
    top: 0px;
    width: 57px;
    height: 23px;
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
  #addin1{
    left: 0px;
    top: 0px;
    width: 100px;
    height: 20px;
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-decoration: none;
    color: #CCCCCC;
    text-align: left;
  }
  #addin2{
    left: 0px;
    top: 0px;
    width: 100px;
    height: 20px;
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-decoration: none;
    color: #CCCCCC;
    text-align: left;
  }
  #writ1{
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #999999;
    margin-left: 93px;
    margin-top: 5px;
  }
  #writ2{
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    margin-left: 36px;
    margin-top: 5px;
  }
  #writ3{
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    margin-left: 36px;
    margin-top: 11px;
  }
  #spanstyle{
    float: right;
    margin-right: 3px;
    margin-top: -4px;
  }
  #addons{
    border-width: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 8px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
</style>
