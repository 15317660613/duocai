<template>
  <div style="padding: 0 10px 10px;width: 100%;">
    <div class="pop-up">
      <div class="pop-up-container" style="height: 454px;overflow: auto;">
        <div class="mycontainer">
          <el-table
            :data="tableData"
            style="width: 100%"
            >
            <template v-for="(item,index) in tableHead">
              <el-table-column 
                v-if="item.prop=='icon'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :align="item.align"
                >
                <template slot="header">
                  <i class="three-eight-icon"></i>
                </template>
                <template slot-scope="scope">
                  <i class="three-nine-icon"></i>
                </template>
              </el-table-column>

              <el-table-column 
                v-if="item.prop=='type'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :align="item.align"
                >
                <template slot-scope="scope">
                  <el-select v-model="scope.row.type">
                    <el-option
                      v-for="ii in options"
                      :key="ii.id"
                      :label="ii.name"
                      :value="ii.id">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column 
                v-if="item.prop=='num'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :align="item.align"
                >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.num"></el-input>
                </template>
              </el-table-column>

              <el-table-column 
                v-if="item.prop=='remark'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :align="item.align"
                >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark"></el-input>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>
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
        tableHead:[
          {prop:'icon',label:'',align:'center',width:'40'},
          {prop:'type',label:'资产类型 ',align:'center',width:'120'},
          {prop:'num',label:'数量',align:'center',width:'90'},
          {prop:'remark',label:'备注',align:'center',width:'300'},
        ],
        tableData:[
          {
            id:1,type:1,num:1,remark:'111',
          },{
            id:2,type:2,num:2,remark:'222',
          },{
            id:3,type:3,num:3,remark:'333',
          },{
            id:4,type:4,num:4,remark:'444',
          },
        ],
        options:[
          {id:1,name:'电卡',select:true},
          {id:2,name:'水卡',select:true},
          {id:3,name:'燃气卡',select:true},
          {id:4,name:'供热卡',select:true},
          {id:5,name:'办公桌',select:true},
          {id:6,name:'塑料等',select:true},
          {id:7,name:'会议椅',select:true},
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
  /deep/ .three-eight-icon,.three-nine-icon{
    display: inline-block;
    margin-top: 5px;
  }
  .mycontainer {
    background-color: #DCD9D3;
    /deep/ .el-table .is-center,.el-table  .is-leaf, .el-table tr td{
      background-color: #DCD9D3!important;
    }
    /deep/ .el-table, .el-table__expanded-cell{
      background-color: #DCD9D3;
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
  }
</style>
