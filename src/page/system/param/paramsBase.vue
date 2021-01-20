<template>
    <div class="params mycontailerclass1">
      <div class="top-container " >
        <div class="search-container mycontailerclass2">
          <div class="item left" @click="open" >
            <div class="left border-icon">
              <i class="down-icon up-down"></i>
            </div>
          </div>
          <div class="item left" @click="close" >
            <div class="left border-icon">
              <i class="up-icon up-down"></i>
            </div>
          </div>
          <div class="item left" >
            <i class="cut-icon cut"></i>
          </div>
          <!-- <div class="item left"  @click="addPara">
            <i class="fa fa-plus add"></i>
            <span>新增参数</span>
          </div> -->
          <div class="item left clear" @click="tabRemove('/home/paramsBase')" >
            <i class="back-icon user left"></i>
          </div>
        
        </div>
      </div>
      <div class="params-content clear">
          <div class="left-tree-content left">
            <el-tree :data="data"
                     v-if="openOrNot"
                     :props="defaultProps"
                     @node-click="getparamTrees"
                      style="font-size: 13px !important;"
                     :default-expand-all="defaultExpand"
                     :filter-node-method="filterNode"
                     node-key="navId"
                     ref="tree"
                     :expand-on-click-node="false"
            >
            </el-tree>
          </div>
          <div class="right-list-content left" >
          <el-table
            @row-click="bdetail"
            :data="tableData"
            style="width: 100%;font-size: 12px;height: 100%;"
            id="fonts"
            empty-text=" "
            border
            highlight-current-row
            :default-sort = "{prop: 'date', order: 'descending'}"
          >

            <el-table-column
              prop="num"
              label="序号"
              sortable
              width="90">
            </el-table-column>
            <el-table-column
              prop="name"
              label="参数名称"
              sortable
              :show-overflow-tooltip="true"
              width="120">
              <template slot-scope="scope">
                <div style="color:#336699;text-algin:center;cursor:pointer;" @click="basenes(scope.$index, scope.row)" >
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              width="300"
              align='center'
              :show-overflow-tooltip="true"
              >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="margin-top: 5px;margin-left: 8px">
        <span style="color: #999999;"> >>系统管理-参数管理(基础)</span>
      </div>
      <bdetailpa ref="bdetailpa"></bdetailpa>
      <addParams ref="addParams"></addParams>
    </div>
</template>

<script>
  import bdetailpa from "./bdetailpa";
  import addParams from "./addParams";
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {paramList} from "../../../service/getData";
    export default {
        name: "paramsBase",
        components: {bdetailpa,addParams},
        data() {
            return {
                defaultExpand: true,
                openOrNot: true,
                input: '', //输入框
                tableData: [],
                data: [{
                    label: '公共参数',
                    id:9,
                    children: [
                        {
                            id:72,
                            label:'自定号'
                        },{
                            id:73,
                            label:'栋座名称'
                        }, {
                            id:74,
                            label:'朝向'
                        }, {
                            id:75,
                            label:'跟进时间方式'
                        }, {
                            id:76,
                            label:'佣金类型'
                        },{
                            id:77,
                            label:'佣金模式'
                        },{
                            id:78,
                            label:'业类项类',
                            children: [
                              {
                                id:79,
                                label:'收'
                              }, 
                              {
                                id:80,
                                label:'付/支'
                              },
                            ]
                        },{
                            id:81,
                            label:'财务收付方'
                        },{
                            id:82,
                            label:'人员状态'
                        },{
                            id:83,
                            label:'部门/职位状态'
                        },{
                            id:84,
                            label:'任务/行物完成状态'
                        }
                    ]
                },{
                    label: '房源管理',
                    id:1,
                    children: [{
                            id:36,
                            label:'交易'
                        },{
                            id:37,
                            label:'房源状态'
                        },{
                            id:38,
                            label:'盘制'
                        },{
                            id:39,
                            label:'房源分类'
                        },{
                            id:40,
                            label:'委托'
                        },{
                            id:41,
                            label:'钥匙类型',
                        },{
                            id:42,
                            label:'钥匙状态',
                        }
                    ]
                }, {
                    label: '新房管理',
                    id:2,
                    children: [
                        {
                            id:43,
                            label: '营销状态',
                        },{
                            id:44,
                            label: '合作状态'
                        },{
                            id:45,
                            label: '项目证件'
                        },{
                            id:46,
                            label:'项目亮点'
                        },{
                            id:47,
                            label:'产品类型'
                        },{
                            id:48,
                            label: '报备保护期'
                        },{
                            id:49,
                            label: '到场保护期'
                        },{
                            id:120,
                            label: '报备状态'
                        },{
                            id:121,
                            label: '销售状态'
                        }
                    ]
                },
                    {
                        label: '客源管理',
                        id:3,
                        children: [
                            {
                                id:50,
                                label: '客户交易'
                            },{
                                id:51,
                                label: '客户状态'
                            },{
                                id:52,
                                label: '客制'
                            },{
                                id:53,
                                label: '分类'
                            },{
                                id:54,
                                label: '购房资格'
                            },{
                                id:55,
                                label: '贷款资格',
                            },{
                                id:122,
                                label: '客户委托',
                            }
                        ]
                    },
                    {
                        label: '合同管理',
                        id:4,
                        children: [
                            {
                                id:56,
                                label: '结佣状态'
                            },{
                                id:57,
                                label: '结盘状态'
                            },{
                                id:58,
                                label: '合同状态'
                            }
                        ]
                    },
                    {
                        label: '组织管理',
                        id:6,
                        children: [
                            {
                                id:59,
                                label: '物理单位状态'
                            },{
                                id:60,
                                label: '提成模式'
                            }
                        ]
                    },
                    {
                        label: '人事管理',
                        id:7,
                        children: [
                           {
                                id:61,
                                label: '任务规划'
                            },{
                                id:62,
                                label: '任务状态'
                            },{
                                id:63,
                                label: '考勤项目',
                            },{
                                id:64,
                                label: '奖罚',
                            },{
                                id:65,
                                label: '险金状态',
                            },{
                                id:66,
                                label: '持卡状态',
                            },{
                                id:67,
                                label: '用工状态',
                            },{
                                id:68,
                                label: '缴存状态',
                            }
                         ]
                    },{
                        label: '财务管理',
                        id:8,
                        children: [
                            {
                                id:69,
                                label: '收付'
                            }
                        ]
                    },{
                        label: '人文管理',
                        id:10,
                        children: [
                            {
                                id:70,
                                label: '制度公告',
                            },{
                                id:71,
                                label: '分享平台',
                            },{
                                id:72,
                                label: '投诉建议',
                            }
                        ]
                    },
                ],
                defaultProps: {
                    id:'navId',
                    children: 'children',
                    label: 'label',
                    disabled:'navOffOn'

                }
            };
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
        methods:{
          addPara(){
            let inpara=this.input
            if(inpara) {
              this.$refs.addParams.changeParam(inpara)
            }else{
              this.$alert('<div class="pop-up" style="" >\n' +
                '        <div class="pop-up-container">\n' +
                '          <div class="clear" style="padding:15px 10px 15px 10px;;" >\n' +
                '             <div class="left">\n'+
                '               <i class="dangerous-icon" ></i>\n'+
                '             </div>\n'+
                '             <div class="left">\n'+
                '                 <p style="margin-left:5px;font-size:12px;"><span id="" >请选择要新增的参数</span></p >\n' +
                '             </div>\n'+
                '          </div>\n' +
                '        </div>\n' +
                '        <div class="clear" style="width:100%;height:30px;" >\n' +
                '        </div>\n' +
                '      </div>', ' ', {
                dangerouslyUseHTMLString: true
              });
            }
          },

          filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            close() {
                this.defaultExpand = false
                this.openOrNot = false;
                setTimeout(() => {
                    this.openOrNot = true;
                }, 10);
            },
            open() {

                this.defaultExpand = true
                this.openOrNot = false;
                setTimeout(() => {
                    this.openOrNot = true;
                }, 10);
            },
          //搜索
          serche(val){
            let _this=this
            paramList(val).then(function (res) {
              _this.tableData=res.data
            })
          },
            basenes(index, row){
                let _this =  this;
                // _this.$refs['bdetailpa'].changemParams(row);
                this.linleft = index + 1;
                this.currentPage = row;
                let layerId = _this.$layer.iframe({
                  content: {
                    content: bdetailpa, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{rowData:row}//props
                  },
                  area:['350px','200px'],
                  title:"参数修改 【" + this.currentPage.name +"】",
                  shadeClose: false,
                  shade: true,//是否显示遮罩
                  zIndex:19891110,
                  cancel:()=>{//关闭事件

                  }
                });
            },
            bdetail(val){
                //this.$refs.bdetailpa.changemParams(val)
            },
            getparamTrees(val){
                let _this=this
                if(val.children==undefined){
                    let les=val.label
                    this.input=les
                    paramList(les).then(function (res) {
                        _this.tableData=res.data
                    })
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
   

  /deep/ .el-tree-node__label {
    font-size: 12px;
  }
  .el-tree{
    min-width: 100%;
    display: inline-block;
    background-color: #EEEEEE;
  }
    .params {
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
                  .rule-icon{
                    background:url(../../../images/system/guize.png) -15px -15px;
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
                  .back-icon{
                    background:url(../../../images/system/tuichu.png) -15px -15px;
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
    .params-content{
      width: calc(100% - 20px);
      margin: 5px auto 0px;
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
<style>
  .el-table__header-wrapper{
    background-color: rgba(192, 192, 192, 1) !important;
  }
  .el-table{
    background-color: rgba(192, 192, 192, 1) !important;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: rgba(192, 192, 192, 1) !important;
  }
  .params .el-table__body-wrapper{
    height:calc(100% - 27px);
  }
</style>
