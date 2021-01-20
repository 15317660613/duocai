<template>
  <div class="buget-container">
    <div class="top-container " >
      <div class="search-container " >
        <div class="item left"  >
          <el-radio  @change="changechoose(1)" v-model="choosedetail" :label="1">&nbsp;</el-radio>
          <span>部门明细</span>
        </div>
        <div class="item left"  >
          <el-radio  @change="changechoose(2)" v-model="choosedetail" :label="2">&nbsp;</el-radio>
          <span>物理明细</span>
        </div>
        <div class="item left"  >
          <el-radio   v-model="choosedetail" :label="3">&nbsp;</el-radio>
          <span>预算明细</span>
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>

        <div class="item left"  @click="setsup">
          <i class="fa fa-plus add"></i>
          <span>设置预算单位</span>
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>
        <div class="item left" @click="filterData" >
          过滤选中
        </div>

        <div type="primary" icon="document" class="item left"  @click="exportToExcel" >
          <i class="leading-out-icon other"></i>
        </div>
        <div class="item left" >
          <div class="record-num" >
            <span><</span>
            <span>{{this.nonum}}</span>
            <span >/</span>
            <span>{{tableData.length}}</span>
            <span>></span>
          </div>
        </div>
        <div class="item left clear"  @click="tabRemove('/home/derpartment')" >
          <i class="back-icon user left" ></i>
        </div>


      </div>
    </div>
    <div class="top-container1">
      <div class="search-container " >
        <div class="item left mt"  >
          <span>显示</span>
          <el-select @change="changelist" v-model="selshow" style="width: 83px;height: 22px;">
            <el-option v-for="item in showarr"  :label="item.name" :value="item.value" ></el-option>
          </el-select>
        </div>
        <div class="item left mt"  >
          <span v-if="selshow==1" class="left" style="margin-top: 4px;margin-right: 3px">预算单位</span>
          <span v-if="selshow==2" class="left" style="margin-top: 4px;margin-right: 3px">年份</span>
          <CheckSelectSpecial  v-if="selshow==2" class="left" :selectId="daids" :listData="dateu" style="width: 83px;height: 22px;" ></CheckSelectSpecial>
          <CheckSelectSpecial  v-if="selshow==1" @findStreetByTown="cahn" class="left" :selectId="ysid1" :listData="ylst1" style="width: 83px;height: 22px;" ></CheckSelectSpecial>
          <CheckSelectSpecial  v-if="selshow==1" class="left" :selectId="ysid2" :listData="ylst2" style="width: 83px;height: 22px;" ></CheckSelectSpecial>
          <el-select v-if="selshow==1" v-model="ys3" style="width: 83px;height: 22px;">
            <el-option v-for="item in ylst3"  :label="item.name" :value="item.value" ></el-option>
          </el-select>
        </div>

        <div class="item left mt"  >
          <el-input title="部门名称/物理名称" v-model="sword" style="width: 195px;"></el-input>
          <button class="serc" style="width: 56px;border:1px solid  #aaaaaa" @click="changelist">查询</button>
        </div>
        <div class="item left mt" @click="cleas" style="margin-left:-15px;">
          <div style="margin-top: 2px;" class="claerlys"  ></div>
        </div>
      </div>
    </div>
    <div class="buget-content clear list-content list-container" >
      <div  class="right-list-content left" >
        <el-table
          highlight-current-row
          :row-class-name="tableRowClassName"
          @selection-change="gettableDatas"
          @row-click="mandetil"
          empty-text=" "
          :row-style="{height:0+'px'}"
          :cell-style="{padding:0+'px'}"
          ref="multipleTable"
          :data="tableData"
          style="width: 100%;font-size: 12px"
          border
        >

          <el-table-column
            type="selection"
            class="checkinputs"
            prop="check"
            label=""
            width="38">
          </el-table-column>
            <el-table-column
              width="130"
              prop="name"
              colspan="1"
              label="预算单位"
              sortable=true
            >

            </el-table-column>
          <el-table-column
            prop="customer1"
            label="年份"
            sortable=true
          >
            <template  slot-scope="scope">
              <div class="clear" style="height:15px;">
                <div  v-for="(item , index) in scope.row.datas" class="left" style="width:135px;border-right:1px solid #fff;position:relative;" >
                     {{item.label}}

                </div>
              </div>
            </template>
          </el-table-column>


        </el-table>
      </div>
    </div>


    <div class="component-container" >
      <setup ref="setup"></setup>
    </div>

  </div>
</template>

<script>
  import {departmentParam} from '../../../utils/departparam'
  import {departperson} from '../../../service/organizeDate'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {cblist} from '../../../service/getdepartData'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {phyparam,departcoopgetPlaceByDepart} from '../../../service/getdepartData'
  import setup from './setup'
  export default {
    name: 'budget',
    components: {
      setup,CheckSelectSpecial
    },
    data(){
      return{
        choosedetail:3,
        columnData:departmentParam.bugtColumn,
        dateu:[],
        daids:"daids",
        tableData:[],
        titles:[],
        ylst1:[],
        ylst2:[],
        ylst3:[
          {
            value:-1,
            name:"全部"
          },
          {
            value:1,
            name:"只显示部门"
          },
          {
            value:2,
            name:"只显示物理场地",
          }
        ],
        ysid1:"ysid1",
        ysid2:"ysid2",
        ys3:-1,
        sword:"",
        nonum:0,
        multipleSelection:[],
        ssearr:"",
        showarr:[
         {
            value:1,
            name:"预算单位"
          },
          {
            value:2,
            name:"年份",
          }],
        selshow:1,
      }
    },
    computed: {
      options () {
        return this.$store.state.options;
      },
      activeIndex: {
        get () {
          return this.$store.state.activeIndex;
        },
        set (val) {
          this.$store.commit('set_active_index', val);
        }
      }
    },
    mounted(){
      this.gont()
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      let _this=this
      let  departIds=""
      let  placeIds=""
      let  showType=1
      let  type=""
      let  word=""
      cblist(departIds,placeIds,showType,type,word).then(function (res) {
        debugger
             _this.titles=res.data.list
             _this.tableData=res.data.list
             _this.$layer.closeAll("loading");
      })
    },
    methods:{
      //导出
      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          const tHeader = ['预算单位', '年份']
          const filterVal = ['name', 'customer1']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      changechoose(i){
        if(i==1){
          this.$router.push('/home/derpartment');
        }
        if(i==2){
          this.$router.push('/home/physical');
        }

      },
      //获取下标
      mandetil(row, column, event){
          debugger
        let _this = this
        _this.nonum =row.index + 1
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      //获取节点
      gettableData(val){
        debugger
        var arr=[]
        for(var i=0;val.length>i;i++){
          arr.push(val[i].id)
        }
        this.ssearr=arr
      },
      //搜索
      changelist(){
        let _this=this
        let arr1=[]
        let arr2=[]
        let p1=this.ylst1
        let p2=this.ylst2
        for(var i=0;p1.length>i;i++){
          if(p1[i].select==true){
            arr1.push(p1[i].id)
          }
        }
        for(var i=0;p2.length>i;i++){
          if(p2[i].select==true){
            arr2.push(p2[i].id)
          }
        }
        arr1=arr1.toString()
        arr2=arr2.toString()
        let  departIds=arr1
        let  placeIds=arr2
        let  showType=this.selshow
        let  type=this.ys3
        let  word=this.sword
        cblist(departIds,placeIds,showType,type,word).then(function (res) {
          debugger
          _this.tableData=res.data.list
          let dts=res.data.list
          for(var i=0;dts.length>i;i++){
            _this.dateu.push({
              id:dts[i].name,
              name:dts[i].name.replace(/&nbsp;/g,""),
              select:false,
              }
            )
          }

        })
      },
      cahn(){
        debugger
        let _this=this
        let iis=[]
        for(var i=0;this.ylst1.length>i;i++){
          if(this.ylst1[i].select==true){
            iis.push(this.ylst1[i].id)
          }
        }
        let id=iis.toString()
        departperson(id).then(function (res) {
          debugger
          let da=res.data.user
          if(da && da.length != 0){
            let arr = [{id:'-1',name:"全部",select:true}];
            for(let i = 0 ; i  < da.length ; i++){
              arr.push({
                id:da[i].id,
                name:da[i].name.replace(/&nbsp;/g,""),
                select:da[i].select,
              })
            }
            _this.ylst2 = arr;
          }
        })
      },
      //下拉
      gont(){
        debugger
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let _this=this
        phyparam().then(function (res) {
          debugger
          _this.chang=res.data.stateParams
          let departTree = res.data.departs;
          if(departTree && departTree.length != 0){
            let arr = [{id:'-1',name:"全部",select:true}];
            for(let i = 0 ; i  < departTree.length ; i++){
              arr.push({
                id:departTree[i].id,
                name:departTree[i].label.replace(/&nbsp;/g,""),
                select:false,
              })
            }
            _this.ylst1 = arr;
            _this.$layer.closeAll("loading");
          }
        })
        let ids=[]
        let ylst1=_this.ylst1
        for(let i = 0 ; i  < ylst1.length ; i++){
          if(ylst1[i].select==true){
            ids.push(ylst1[i].id)
          }
        }
        let ss=ids.toString()
        departcoopgetPlaceByDepart(ss).then(function (res) {
          debugger
          let da=res.data
          let arr = [{id:'-1',name:"全部",select:true}];
          for(let i = 0 ; i  < da.length ; i++){
            arr.push({
              id:da[i].id,
              name:da[i].name.replace(/&nbsp;/g,""),
              select:da[i].select,
            })
          }
          _this.ylst2= arr;
        })

      },
      //过滤选择
      gettableDatas(val){
        debugger
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        val.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
        this.ssearr=val
      },
      //过滤方法
      filterData(){
        let select = this.multipleSelection.toString();
        if(select){
          let arr = [];
          this.tableData.forEach(function(item){
            if(select.indexOf(item.id) != -1){
              arr.push(item);
            }
          })
          this.nonum = 0;
          this.tableData = arr;
        }else{
          this.myAlert('请选择需要过滤的数据!','dangerous-icon');
        }
      },
      setsup(){
        this.$refs.setup.showset()
      },
      cleas(){
        this.sword=""
        this.selshow=1
        for(var i=0;this.ylst1.length>i;i++){
          if(this.ylst1[i].name=="全部"){
            this.ylst1[i].select=true
          }else{
            this.ylst1[i].select=false
          }
        }
        for(var i=0;this.ylst2.length>i;i++){
          if(this.ylst2[i].name=="全部"){
            this.ylst2[i].select=true
          }else{
            this.ylst2[i].select=false
          }
        }



      },
      tabRemove (targetName) {
        // 首页不可删除
        if (targetName == '/') {
          return;
        }
        this.$store.commit('delete_tabs', targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            this.$store.commit('set_active_index', this.options[this.options.length-1].path);
            this.$router.push({path: this.activeIndex});
          } else {
            this.$router.push({path: '/home/'});
          }
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  .mt{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  /deep/.list-content .el-table .el-table__body-wrapper{
    overflow: auto;
  }
  /deep/.el-table .cell{
    color: black;
  }
  /deep/.list-content .el-table th .cell .el-checkbox__input .el-checkbox__inner::after {
    border-color: #000;
    border-width: 0px 1px 1px 0px !important;
    background: #DCD9D3;
    -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
  }
  .content{
    height: calc(100% - 150px);
    width:100%;
    .list-content{
      width: calc(100% - 20px);
      height:100%;
      margin: 10px auto 0px;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      border-radius:5px;
    }
  }
  /deep/.el-table thead {
    color: black;

  }
  /deep/ .el-tree-node__label {
    font-size: 12px;
  }
  /deep/.el-radio{
    margin-right: 0px;
  }
  .right-list-content .el-table, .right-list-content .el-table__expanded-cell {
    background-color: #DCD9D3;
  }
  .serc{

    border-width: 1px;
    border-style: solid;
    border-color: rgb(174, 174, 174);
    border-radius: 5px;
  }
  .el-tree{
    min-width: 100%;
    display: inline-block;
  }
  .buget-container {
    height:100%;
    border:1px solid #fff;
    font-size: 12px;
    .top-container {
      height: 25px;
      width: calc(100% - 20px);
      margin: 10px auto 0px;
      .search-container {
        width: calc(100% + 2px);
        height: 25px;
        .item{
          line-height:20px;
          padding-left:15px;
          cursor:pointer;
          span{
            line-height:20px;
          }
          .down-icon{
            background:url(../../../images/system/xiala.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .cut-icon {
            background: url(../../../images/system/fenge.png) -100px -90px;
            width: 3px;
            height: 23px;
            display: block;
          }
          .search-icon{
            background:url(../../../images/system/chachong.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .move-icon{
            background:url(../../../images/system/loupandiaodong.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .merge-icon{
            background:url(../../../images/system/hebing.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .merge-icon:hover{
            background:url(../../../images/system/meyin.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .rule-icon{
            background:url(../../../images/system/guize.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .zixuanlie-icon{
            background:url(../../../images/qiet.png) -125px -120px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .zixuanlie-icon:hover{
            background:url(../../../images/yyf.png) -202px -15px;
            width:20px;
            height:20px;
            display:inline-block;
            border: 1px solid black;
          }
          .up-icon{
            background:url(../../../images/system/shangla.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .school-icon{
            background:url(../../../images/system/xuexiao.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .owner-icon{
            background:url(../../../images/system/wuyezhu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .leading-out-icon{
            background:url(../../../images/system/daochu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .leading-out-icon:hover{
            background:url(../../../images/yyf.png) -43px -9px;
            width:20px;
            height:20px;
            display:inline-block;
            border: 1px solid black;
          }
          .back-icon{
            background:url(../../../images/system/tuichu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .back-icon:hover{
            background:url(../../../images/yyf.png) -956px -53px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .up-down{
            font-size:12px;
            margin-top:1px;
            color:#336699;
          }
          .search-btn{
            border:1px solid #797979;
            border-radius:5px;
            background:#E4E4E4;
            padding:0px 10px;
            line-height:18px;
            margin-top:2px;
          }
          .other{
            margin-top:2px;
            font-size: 12px;
            color: #AB5F39;
          }
          .user{
            margin-top:2px;
            font-size: 12px;
            color: #767575;
          }
          .cut{
            font-size: 12px;
            color: #C9C9C9;
          }
          .add {
            font-size:12px;
            color: #008000;
            margin-top:3px;
          }
          .delete{
            font-size:12px;
            color: #FF0000;
            margin-top:3px;
          }
        }
      }
    }
    .top-container1 {
      height: 38px;
      width: calc(100% - 20px);
      margin: 10px auto 0px;
      .search-container {
        width: calc(100% + 2px);
        height: 43px;
        .item{
          line-height:30px;
          padding-left:15px;
          cursor:pointer;
          span{
            line-height:20px;
          }
          .down-icon{
            background:url(../../../images/system/xiala.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .search-icon{
            background:url(../../../images/system/chachong.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .move-icon{
            background:url(../../../images/system/loupandiaodong.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .merge-icon{
            background:url(../../../images/system/hebing.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .claerlys{
            background:url(../../../images/system/qingkong.png) -13px -13px;
            width:26px;
            height:22px;
            display:inline-block;
          }
          .merge-icon:hover{
            background:url(../../../images/system/meyin.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .rule-icon{
            background:url(../../../images/system/guize.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .zixuanlie-icon{
            background:url(../../../images/qiet.png) -125px -120px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .zixuanlie-icon:hover{
            background:url(../../../images/yyf.png) -201px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .up-icon{
            background:url(../../../images/system/shangla.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .school-icon{
            background:url(../../../images/system/xuexiao.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .owner-icon{
            background:url(../../../images/system/wuyezhu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .leading-out-icon{
            background:url(../../../images/system/daochu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .leading-out-icon:hover{
            background:url(../../../images/yyf.png) -43px -9px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .back-icon{
            background:url(../../../images/system/tuichu.png) -15px -15px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .back-icon:hover{
            background:url(../../../images/yyf.png) -956px -53px;
            width:20px;
            height:20px;
            display:inline-block;
          }
          .up-down{
            font-size:12px;
            margin-top:1px;
            color:#336699;
          }
          .search-btn{
            border:1px solid #797979;
            border-radius:5px;
            background:#E4E4E4;
            padding:0px 10px;
            line-height:18px;
            margin-top:2px;
          }
          .other{
            margin-top:2px;
            font-size: 12px;
            color: #AB5F39;
          }
          .user{
            margin-top:2px;
            font-size: 12px;
            color: #767575;
          }
          .cut{
            font-size: 12px;
            color: #C9C9C9;
          }
          .add {
            font-size:12px;
            color: #008000;
            margin-top:3px;
          }
          .delete{
            font-size:12px;
            color: #FF0000;
            margin-top:3px;
          }
        }
      }
    }
    .buget-content{
      width: calc(100% - 20px);
      margin: 10px auto 0px;
      height:calc(100% - 55px);
      .left-tree-content{
        width:150px;
        height:100%;
        margin-right:10px;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
        background:#fff;
        overflow:auto;
      }
      .right-list-content{
        width:100%;
        height:calc(100% - 40px);
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
        background-color: #DCD9D3;
      }
    }
  }
  .border-black{
    border:1px solid #6B6B6B;
    border-radius:5px;
  }

  .border-white{
    border:1px solid #fff;
    border-radius:5px;
  }

</style>
