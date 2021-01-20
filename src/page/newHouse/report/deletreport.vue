<template>
  <el-dialog
    v-dialogDrag
    :close-on-click-modal="false"
    style=" height:100%"
    overflow="auto"
    id="addons"
    title="删除报备"
    :visible.sync="delrepVisible"
    width="350px"
  >
    <div class="pop-up" >
      <div class="pop-up-container" style="height: 112px;">
        <div id="dest1">
          <div id="dest2">
            <div id="dest3" class="clear" >
              <i class="warnning"></i>
              <p style=" float:left;margin:20px 0 20px 5px;"><span  id="" >警告:删除后不能还原!<br/>确定要删除选定记录吗?</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="clear" >
          <span id="spanstyle" slot="footer" class="dialog-footer" style="margin: 1px 10px 1px 0px">
             <button class="buttons" type="primary" @click="suredelete">确 定</button>
             <button class="buttons" @click="delrepVisible=false">取 消</button>
          </span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import {deletereport} from '../../../service/reportData'
  export default {
    name: 'deletreport',
    data(){
      return{
        delrepVisible:false,
        dearr:[]
      }
    },
    methods:{
      showdebk(arr){
        debugger
        this.dearr=arr.toString()
        this.delrepVisible=true
      },
      suredelete(){
        let _this=this
        let  deleted=1
        let  id=this.dearr
        deletereport(id,deleted).then(function (res) {
          debugger
          if(res.status==0){
            _this.$emit("initrep")
            _this.myAlert(res.msg)
            _this.delrepVisible=false


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
