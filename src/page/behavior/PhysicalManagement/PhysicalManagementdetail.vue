<template>
  <div style="padding: 0 10px 10px;width: 100%;">
    <div class="pop-up">
      <div class="pop-up-container" style="height: 464px;overflow: auto;">
        <el-form :model="form" ref="formsDatas">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="item in listdata" :title="item.title" :name="item.id">
              <div class="mycontainer1">
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  >
                  <template v-for="(ii,index) in tableHead">
                    <el-table-column 
                      v-if="ii.prop=='bonus'"
                      :prop="ii.prop"
                      :label="ii.label"
                      :width="ii.width"
                      :align="ii.align"
                      >
                      <template slot-scope='scope'>
                        <el-input style="width: " v-model="scope.row.bonus" placeholder="请输入内容"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column 
                      v-else-if="ii.prop=='achievement'"
                      :prop="ii.prop"
                      :label="ii.label"
                      :width="ii.width"
                      :align="ii.align"
                      >
                      <template slot-scope='scope'>
                        <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="scope.row.timeStart" style="width: 100px;"></el-date-picker>
                        <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="scope.row.timeEnd" style="width: 100px;"></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column 
                      v-else
                      :prop="ii.prop"
                      :label="ii.label"
                      :width="ii.width"
                      :align="ii.align"
                      show-overflow-tooltip
                      >
                    </el-table-column>
                  </template>
                  
                </el-table>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
      <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
        <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {departparam,departcoopgetParams,departcoopinsert} from '../../../service/getdepartData'
  export default {
    props:['layerid'],
    data(){
      return{
        form:{

        },
        listdata:[
          {id:1,title:'2020年：20000.90元'},
          {id:2,title:'2020年：20000.90元'},
          {id:3,title:'2020年：20000.90元'},
        ],
        tableHead:[
          {prop:'time',label:'流水号',align:'center',width:'110'},
          {prop:'model',label:'项类',align:'center',width:'120'},
          {prop:'event',label:'缴费金额',align:'center',width:'85'},
          {prop:'achievement',label:'缴费起止',align:'center',width:'220'},
          {prop:'bonus',label:'缴费备注',align:'center',width:'200'}
        ],
        tableData:[
          {
            id:1,time:'2020-07-27',model:'当红的萨克大 大大啊大',event:'200000.00元',achievement:'2020-07-27   2020-07-27',bonus:'当红的萨克当红的萨克当红的萨克',timeStart:'2020-07-27',timeEnd:'2020-07-27'
          },
          {
            id:2,time:'2020-07-27',model:'当红的萨克大 大大啊大',event:'200000.00元',achievement:'2020-07-27   2020-07-27',bonus:'当红的萨克当红的萨克当红的萨克',timeStart:'2020-07-27',timeEnd:'2020-07-27'
          },
          {
            id:3,time:'2020-07-27',model:'当红的萨克大 大大啊大',event:'200000.00元',achievement:'2020-07-27   2020-07-27',bonus:'当红的萨克当红的萨克当红的萨克',timeStart:'2020-07-27',timeEnd:'2020-07-27',timeStart:'2020-07-27',timeEnd:'2020-07-27'
          },
          {
            id:4,time:'2020-07-27',model:'当红的萨克大 大大啊大',event:'200000.00元',achievement:'2020-07-27   2020-07-27',bonus:'当红的萨克当红的萨克当红的萨克',timeStart:'2020-07-27',timeEnd:'2020-07-27'
          }
        ],
        activeNames: ['1'],
        departs:[],
        stateParam:[],
      }
    },
    methods:{
      getParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true //是否显示遮罩
        });

        departcoopgetParams().then(function(res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {

          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      saveFormData(){

      },
      clearFormData(){
        this.$layer.close(this.layerid);
      },
      handleChange(val) {
        console.log(val);
      }
    },
    mounted(){
      // this.getParamsData();
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

<style lang="scss" scoped>
  /deep/ .el-collapse-item__header{
    background-color: #DCD9D3 !important;
  }
  /deep/ .el-collapse-item__wrap{
    background-color: #eee !important;
  }

  .mycontainer1 {
    background-color: #eee;
    /deep/ .el-table .is-center,.el-table  .is-leaf, .el-table tr td{
      background-color: #eee!important;
    }
    /deep/ .el-table, .el-table__expanded-cell{
      background-color: #eee;
    }
    /deep/ .el-table thead{
      color: #222;
      font-weight: bolder;
    }
    /deep/ .el-table td, .el-table th.is-leaf{
      border:none;
      padding: 3px 0px;
    }
    /deep/ .el-table::before{
      height: 0px;
    }
    /deep/ .el-table--scrollable-x .el-table__body-wrapper{
      overflow-x: hidden;
    }
    /deep/ .el-table th.is-leaf{
      border-bottom: 1px solid #888;
      padding: 3px 0px;
    }
    /deep/ .el-table .cell{
      white-space: nowrap;
    }
    /deep/ .el-table__header-wrapper, .el-table__body-wrapper{
      background-color: #eee !important;
    }
  }
  
</style>
