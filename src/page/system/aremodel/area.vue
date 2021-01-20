<template>
   <div class="area-container mycontailerclass1">
     <div class="top-container " >
       <div class="search-container mycontailerclass2">
         <div class="item left" @click="upfo" >
          <div class="left border-icon">
           <i class="down-icon up-down"></i>
          </div>
         </div>

         <div class="item left" @click="downfo" >
          <div class="left border-icon">
           <i class="up-icon up-down"></i>
           </div>
         </div>
         <div class="item left" >
           <i class="cut-icon cut"></i>
         </div>

         <div class="item left" @click="openDialog" >
           <div class="border-icon clear" > 
            <i class="fa fa-plus add"></i>
            <span>新增街镇</span>
           </div>  
         </div>
         <div class="item left"  @click="deletes">
           <div class="border-icon clear" > 
            <i class="fa fa-times delete"></i>
            删除街镇
           </div>  
         </div>

         <div class="item left clear" @click="merageStreet()">
           <div class="border-icon clear" > 
            <i class="merge-icon other left"></i>
            合并街镇
           </div> 
         </div>
         <div class="item left" >
           <i class="cut-icon cut"></i>
         </div>
         <div type="primary" icon="document" class="item left"  @click="exportToExcel">
           <div class="border-icon clear" > 
            <i class="leading-out-icon other" title="导出"></i>
           </div>  
         </div>
         <div class="item left" >
           <div class="record-num" >
             <span><</span>
             <span>{{currentNum}}</span>
             <span >/</span>
             <span>{{tableData.length}}</span>
             <span>></span>
           </div>
         </div>
         <div class="item left clear" @click="tabRemove('/home/areaDetail')" >
            <div class="border-icon clear" > 
              <i class="back-icon user left" ></i>
            </div>
         </div>
       </div>
     </div>
     <div class="area-content clear" >
       <div class="left-tree-content left" >
         <el-tree :data="treeData"
                  highlight-current
                  :props="defaultProps"
                  @node-click="gettreeData"
                  default-expand-all
                  ref="selectTree"
                  style="font-size: 13px"
                  :expand-on-click-node="false"
                  node-key="id"
         >
         </el-tree>
       </div>
        <div class="content clear left" style="height:100%;width: calc(100% - 160px);" >

          <div class="list-content" style="width:100%;margin:0;" >
       
          <el-table
            @row-click="getAreaClick"
            highlight-current-row
            empty-text=" "
            ref="multipleTable"
            :data="tableData"
           
            style="width: 100%;font-size: 12px"
            border

          >

            <el-table-column
              prop="no"
              label="序号"
              sortable
              align='center'
              width="90">
              <template slot-scope="scope">
                <div style="text-algin:center;cursor:pointer;" @click="Indexs(scope.$index, scope.row)" >
                  {{scope.row.no}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="label"
              label="街镇"
              width="120"
              align='center'
            >
              <template slot-scope="scope">
                <div style="color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                  {{ scope.row.label }}
                </div>
              </template>

            </el-table-column>
          </el-table>
        </div>
     </div>
     </div>
     <div class="component-container" >
       <NewAreaPage ref="addArea" ></NewAreaPage>
     </div>
     <div class="component-container" >
       <mergeArea v-model="mergedata" ref="mergeArea"></mergeArea>
     </div>
     <div class="component-container" >
       <deleteArea ref="deleteArea" @deletedData="deletedData" ></deleteArea>
     </div>
   
   </div>

</template>
<script>
import {areList, findbyId} from '../../../service/getData'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import NewAreaPage from './newArea'
import mergeArea from './mergeArea'
import deleteArea from './deleteArea'
import detailArea from './detailArea'
export default {
  components: {
    detailArea,
    deleteArea,
    NewAreaPage,
    mergeArea,
   },
  name: 'Header',
  data () {
    return {
      dialogVisible: false,
      MergeVisible: false,
      multipleSelection:"",
      currentNum: 0,
      linright: '',
      tableData: [],
      treeData: [ ],
      mergedata: {},
      serchid: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
  mounted () {
    this.test()
  },
  methods: {
    exportToExcel () {
      // excel数据导出
      require.ensure([], () => {
        const {
          // eslint-disable-next-line camelcase
          export_json_to_excel
        } = require('../../../assets/js/Export2Excel.js')
        const tHeader = ['序号', '街镇名称']
        const filterVal = ['no', 'label']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '地域字典列表')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 获取索引
    Indexs (index, row) {
      this.currentNum = index + 1
    },
    // 街镇详情
    handleEdit (index, row) {
      let _this = this
      this.currentNum = index + 1
      // _this.$refs['detailArea'].changedetail(row);
      this.currentPage = row;
      let layerId = _this.$layer.iframe({
        content: {
          content: detailArea, //传递的组件对象
          parent: this,//当前的vue对象
          data:{rowdata:row}//props
        },
        area:['350px','200px'],
        title:"街镇修改 【" + this.currentPage.label +"】",
        shadeClose: false,
        shade: true,//是否显示遮罩
        zIndex:19891110,
        cancel:()=>{//关闭事件

        }
      });
    },
    // 折叠
    upfo () {
      let self = this
      // 将没有转换成树的原数据
      let treeList = this.treeData
      for (let i = 0; i < treeList.length; i++) {
        // 将没有转换成树的原数据设置key为... 的展开
        self.$refs.selectTree.store.nodesMap[treeList[i].id].expanded = true
      }
    },
    //  全部折叠
    downfo () {
      let self = this
      let treeList = this.treeData
      for (let i = 0; i < treeList.length; i++) {
        self.$refs.selectTree.store.nodesMap[treeList[i].id].expanded = false
      }
    },
    // 初始列表调用接口
    test () {
      let _this = this
      areList().then(function (res) {
        var arr = res.data[0].children
        console.log(arr)
        _this.treeData = res.data
      })
    },
    // 搜索
    serch (val) {
      let _this = this
      let ppd = val
      findbyId(ppd).then(function (res) {
        let tab = res.data
        _this.tableData = tab
      })
    },
    // tree点击
    gettreeData (data) {
      let _this = this
      _this.mergedata = data
      if (data && data.level > 2) {
        var id = data.id
        findbyId(id).then(function (res) {
          let tab = res.data
          if (tab) {
            _this.tableData = tab
            _this.linrigh = tab.length
          }
        })
      } else {
        _this.tableData = []
      }
    },
    // 退出
    exter () {
      this.$router.back(-1)
      window.close()
    },
   
    // 点击新增地域弹框
    openDialog () {
      let place = this.mergedata
      // eslint-disable-next-line eqeqeq
      if (place.level == 2 || place.level == undefined) {
        this.myAlert("请选择一个区县","dangerous-icon");
      } else {
        if (place.label != undefined) {
          var tdata = this.tableData
          this.$refs.addArea.changedialog(tdata, place)// 通过data显式控制dialog
        }
      }
    },
    getAreaClick(row, event, column) {
      this.multipleSelection = row.id;
    },
    merageStreet () {
      let _this = this
      var merge = this.mergedata
      var tdata = this.tableData
      // eslint-disable-next-line eqeqeq
      if (merge.level == '2' || merge.level == undefined) {
          this.myAlert("请选择一个区县","dangerous-icon");
      } else {
        this.$refs.mergeArea.changeMerge(merge, tdata)
      }
    },
    deletes () {
      let md = this.mergedata.id
      var deid = this.multipleSelection
      if (deid.length > 8) {
        this.$refs.deleteArea.changedelete(deid, md)
      } else {
         this.myAlert("请选择一个街镇","dangerous-icon");
      }
    },
    deletedData(){
      let id = this.multipleSelection;
      let temp = this.tableData.concat();
      temp = this.deletArrByValue(temp,id);
      this.tableData = temp;
      this.currentNum = 0;
      this.multipleSelection = 0;
    },
    //删除数组中指定元素
    deletArrByValue(arr,id){
      return arr.filter(function(item){return item.id != id })
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
  .list-content .el-table{
    height:100%;
    .el-table__body-wrapper{
      height:100%;
    }
  }
 /deep/.el-table td .cell{
    color: #1B1B1B!important;
  }
  /deep/ .el-tree-node__label {
    font-size: 12px;
  }
  .el-tree{
    min-width: 100%;
    display: inline-block;
    background-color: #EEEEEE;
  }
  .area-container {
    height:100%;
    font-size: 12px;
    .top-container {
      height: 30px;
      width: calc(100% - 20px);
      margin: 0px auto 0px;
      .search-container {
        width: calc(100% + 2px);
        height: 30px;
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
          .cut-icon {
            background: url(../../../images/system/fenge.png) -100px -90px;
            width: 3px;
            height: 23px;
            display: block;
          }
          .rule-icon{
            background:url(../../../images/system/guize.png) -15px -15px;
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
    .area-content{
      width: calc(100% - 20px);
      margin: 6px auto 0px;
      height:calc(100% - 55px);
      .left-tree-content{
        width:150px;
        height:100%;
        margin-right:10px;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
        background-color: #EEEEEE;
        overflow:auto;
      }
      .right-list-content{
        width:calc(100% - 160px);
        height:100%;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
     
        border-radius:5px;
        background-color: rgba(192, 192, 192, 1);
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
<style >

 

   .el-button{
     text-align: center;
     font-size: 12px;
     border: 1px solid #666;
     border-radius: 3px;
     width: 51px;
     height: 20px;

   }


 .lerts1{
   border-width: 0px;
    margin-left: -6px;
    width: 310px;
    height: 145px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
   border-image: url("../../../images/iborder.png") 2 repeat !important;
  }
 .lerts2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
   border-image: url("../../../images/iborder.png") 2 repeat !important;
  }
  .lerts3{
    border-width: 0px;
    text-align: center;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-image: url("../../../images/iborder.png")  2 repeat ;
  }
</style>
