<template>
  <div style="width:100%;"  >
    <div class="pop-up-container clear" >
      <div class="left list-container list-content" style="height:428px;" >
        <div class="list-table" id="editorSchoolList" style="height:402px;margin:5px;" >
          <el-table
            :data="phyform.tableDatas"
            highlight-current
            empty-text=" "
            ref="multipleTable"
            highlight-current
            @header-click="head"
            border
            height="398"
             :cell-style="cellStyle"
          >
            <el-table-column
              prop="district"
              label="区县"
              align='center'
              sortable
              show-overflow-tooltip
              width="80">

            </el-table-column>
            <el-table-column
              prop="street"
              label="街镇"
              align='center'
              show-overflow-tooltip
              width="100">
              <template slot-scope="scope">
                <div  style="border-right: none;">
                  {{scope.row.street}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="showHouse"
              label="查看 房源"
              :render-header="renderHeader"
              width="60"
              align='center'
            >
              <template slot-scope="scope">
                <div  style="border-left: 1px solid;margin-left: -5px">
                  <!-- <input v-model="scope.row.showHouse" type="checkbox" value="1" /> -->
                  <el-checkbox v-model="scope.row.showHouse" type="checkbox" :false-label="0" :true-label="1"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="showCustomer"
              label="查看 客源"
              :render-header="renderHeader"
              width="60"
              align='center'
            >
              <template slot-scope="scope">
                <div  style="margin-left: -5px">
                  <!-- <input v-model="scope.row.showCustomer" type="checkbox" value="1" /> -->
                  <el-checkbox v-model="scope.row.showCustomer" type="checkbox" :false-label="0" :true-label="1"></el-checkbox>
                </div>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>
      <!--
      <div class="clear left " style="margin-top: 82px;margin-left: 25px">
        <el-form ref="formsData"  :model="phyform" >
          <input v-model="phyform.alls" class=" flst"  type="checkbox" @change="changed" />
          <div class="flst " style="margin-top: -3px;display: inline-block">
            <span>全部</span>
          </div>

          <div class="clears " style="padding-top: 11px" >
            <input class="flst "  type="checkbox" />
            <div class=" flst" style="margin-top: -3px;"> <span >选中区域全选</span></div>
          </div>
          <div class="clear" style="padding-top: 11px" >
            <div class="left"  >
              <el-form-item  prop="ern" >
                <el-select v-model="phyform.ern" class=" flst" style="width: 80px">
                  <el-option  :value="na.value" :label="na.name" v-for="na in phyform.sso" ></el-option>
                </el-select>
              </el-form-item>  
            </div>  
            <div class="flst che left" @click="chaphy" style="margin:4px 0 0 5px;cursor:pointer;" >
              <span>查</span>
            </div>
           
          </div>
        </el-form>   
    
   
      </div>
      -->
    </div>
    <!-- <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
      <span class="right save-cancel-btn" style="margin-right:0px;" @click="close" >取 消</span>
      <span class="right save-cancel-btn" type="primary" @click="saveData"  >保 存</span>
    </div> -->

  </div>
</template>

<script>

  export default {
    name: 'detailthree',
    props:["editorBuilding","departid","pform"],
    data(){
      return{
        phyform:this.pform,
        check:1,
      }
    },
    methods:{
      //表头格式
      renderHeader(h, {column}) {
        let header = column.label.substr(0,2);
        let headers = column.label.substr(2);
        return [h('p', [
          h('p', {}, header),
          h('span', {}, headers)
        ])];
      },
      changed(){
        let cc=this.phyform.alls
        this.$emit('allchoose',cc)

      },
      cellStyle({row, column, rowIndex, columnIndex}){
       
        if(column.property == 'street'){
          return ;
        }
        
      },
      chaphy(){
        this.$emit('surches')
      },
      head(sa,ba){
        let index=ba.currentTarget.cellIndex
         index=index-1
        let check = this.check;
        if(check == 1){
          this.check = 0;
          this.$emit('sdchoose',index,check);
        }else{
          this.check = 1;
          this.$emit('sdchoose',index,check);
        }
        
        
      },
      //保存
      saveData(){
        this.$emit('updates')
      },
      //关闭
      close(){
        this.$emit('closeDialog');
      },

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
  .che{
    width: 30px;
    height: 20px;
    margin-left: 20px;
    background-color: white;
    text-align: center;
    border: 1px solid;
  }
  .flst{
    float: left;
  }
  .clears{
    clear: both;
  }
  span{
    font-family: '微软雅黑';
    font-size: 12px;
  }
  .list-table{
    border-width:2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
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
  .sel {
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
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
    width: 98px;
    height: 22px;

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
</style>
