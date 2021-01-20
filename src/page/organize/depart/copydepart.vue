<template>
  <el-dialog
    v-dialogDrag
    style=" height:100%"
    overflow="auto"
    id="addons"
    :close-on-click-modal="false"
    title="复制到他部"
    :visible.sync="cpdpartVisible"
    :append-to-body='true'
    width="280px"
  >
    <div class="pop-up" >
      <div style="margin-left: 10px;margin-top: 10px">
        <span>将【行政部】行政跨部权限保存到：</span>
      </div>
      <div class="pop-up-container" style="margin-top: 10px">

        <div class="clears" style="width: 100%;font-size: 12px;height: 337px">
          <el-tree :data="treeData"
                   highlight-current
                   default-expand-all
                   ref="selectTree"
                   style="font-size: 13px;background-color: #EEEEEE"
                   :expand-on-click-node="false"
                   node-key="id"
          >
           </el-tree>

        </div>
      </div>
      <div class="clear" style="margin-left: 10px" >
              <span   slot="footer" class="dialog-footer">
                <div class="flst clears" style="margin-top: 10px">
                  <input class="input flst" style="width: 80px;" type="text" title="查询部门"/>
                    <div class="flst che" >
                       <span>查</span>
                    </div>
                  </div>
                <button style="margin-left: 30px" class="buttons" type="primary"  >保存</button>
                <button class="buttons" @click="this.cpdpartVisible=false">取 消</button>
              </span>
      </div>
    </div>


  </el-dialog>
</template>

<script>
  import {odeparttree} from '../../../service/organizeDate'
  import ElTreeSelect from '../../house/rent/tree'
  export default {
    name: 'copydepart',
    components: {ElTreeSelect},
    data(){
      return{
        cpdpartVisible:false,
        treeData:[]
      }
    },
    methods:{
      showcopy(){
        debugger
        let _this=this
        odeparttree(0,0).then(function (res) {
          debugger
            _this.treeData=res.data
        })
        this.cpdpartVisible=true
      }


    }
  }
</script>

<style scoped>
  .input {
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
    height: 20px;

    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-decoration: none;
    color: #000000;
    text-align: left;
  }
  .che{
    width: 30px;
    height: 20px;
    background-color: rgba(204, 204, 204, 1);
    text-align: center;
    border: 1px solid;
  }
  .flst{
    float: left;
  }
  .clears{
    clear: both;
  }
  .buttons{
    border-width: 0px;
    margin-top: 10px;
    margin-bottom:10px ;
    width: 47px;
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
