<template>
  <div class="paramm mycontailerclass1">
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
        <div class="item left"  @click="addPara">
            <div class="left border-icon">
                <i class="fa fa-plus add"></i>
                <span>新增参数</span>
            </div>
        </div>
        <div class="item left" @click="delep">
            <div class="left border-icon">
                <i class="fa fa-times delete"></i>
                <span>删除参数</span>
            </div>
        </div>
        <div class="item left" >
          <i class="cut-icon cut"></i>
        </div>

        <div class="item left clear" @click="tabRemove('/home/paramsMatch')">
            <div class="left border-icon">
                <i class="back-icon user left"></i>
            </div>
          
        </div>
      </div>
    </div>
    <div class="paramm-content clear list-content list-container">
      <div class="left-tree-content left">
        <el-tree :data="data"
                 v-if="openOrNot"
                 :props="defaultProps"
                 @node-click="getparamTree"
                 :default-expand-all="defaultExpand"
                 :filter-node-method="filterNode"
                 node-key="navId"
                 ref="tree"
                 style="font-size: 13px !important;"
                 :expand-on-click-node="false"
        >
        </el-tree>
      </div>
      <div class="right-list-content left" >
        <el-table
          @row-click="rows"
          :data="tableData"
          style="width: 100%;font-size: 12px;height:100%;"
          empty-text=" "
          border
          highlight-current-row
          @selection-change="getleData"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            type="selection"

            class="checkinputs"
            prop="check"
            label=""
            width="38">
            <!--
            <template slot-scope="scope">
              <div  >
                <input type="checkbox" :checked="scope.row.check?true:false" @change="rows(this)" />
              </div>
            </template>
             -->
          </el-table-column>
          <el-table-column
            prop="num"
            label="序号"
            sortable
            align='center'
            width="90">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="name"
            label="参数名称"
            sortable
            align='center'
            width="120">
            <template slot-scope="scope">
              <div style="color:#336699;text-algin:center;cursor:pointer;" @click="handle(scope.$index, scope.row)" >
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            prop="remark"
            label="备注"
            width="300"
            :show-overflow-tooltip="true"
            >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin-top: 5px;margin-left: 8px">
      <span style="color: #999999;"> >>系统管理-参数管理(可配)</span>
    </div>
   <addParams ref="addParams"></addParams>
   <deletparam ref="deletparam"></deletparam>
    <mdetailpa ref="mdetailpa"></mdetailpa>
  </div>
</template>

<script>
  import addParams from "./addParams";
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {paramList} from "../../../service/getData";
  import deletparam from "./deletparam";
  import mdetailpa from "./mdetailpa";
  export default {
        components: {mdetailpa,
            deletparam,
            addParams
           },
        name: "paramsMatch",
        data() {
            return {
                defaultExpand: true,
                openOrNot: true,
                input: '', //输入框
                tableData: [],
                lalist:"",
                data: [{
                    label: '公共参数',
                    id:71,
                    children: [
                       {
                            label: '物业用途',
                            id:72,
                        },{
                            id:73,
                            label: '物业类型'
                        },{
                            label: '来源',
                            id:74,
                        },{
                            id:75,
                            label: '装修'
                        },{
                            label: '房型',
                            id:76,
                        },{
                            label: '付款方式',
                            id:78,
                        },{
                            id:79,
                            label: '时效结佣'
                        },{
                            id:80,
                            label: '进度结佣'
                        },{
                            id:81,
                            label: '存出方式'
                        },{
                            id:82,
                            label: '存出账户'
                        },
                     ]
                },{
                    label: '房源管理',
                    expanded:false,
                    children: [
                        {
                            label:'证件'
                        },{
                            label:'产权'
                        },{
                            label:'现状'
                        },{
                            label:'付佣'
                        },{
                            label:'层数'
                        },{
                            label:'看房'
                        },{
                            label:'动机'
                        },{
                            label:'税费'
                        },{
                            label:'注'
                        },{
                            label:'尾款'
                        },
                    ]
                }, {
                    label: '新房管理',
                    id:1,
                    children: [
                       {
                            label: '报备方式',
                            id:26,
                        },{
                            id:27,
                            label: '派车类型'
                        },
                     ]
                },
                    {
                        label: '客源管理',
                        id:2,
                        children: [{
                                id:28,
                                label: '客户类别'
                            },{
                                id:29,
                                label: '客户现住'
                            },{
                                id:30,
                                label: '客户国籍'
                            },{
                                id:31,
                                label: '动机'
                            },{
                                id:32,
                                label: '客户期限'
                            },{
                                id:33,
                                label: '优惠'
                            },{
                                id:34,
                                label: '特点'
                            }
                        ]
                    },
                    {
                        label: '合同管理',
                        id:3,
                    children: [
                       {
                            id:35,
                            label: '放款进度'
                        },{
                            id:36,
                            label: '面签进度'
                        },
                      ]
                },
                    {
                        label: '组织管理',
                        id:4,
                        children: [
                           {
                                id:37,
                                label: '最高学历'
                            },{
                                id:38,
                                label: '民族'
                            },{
                                id:39,
                                label: '来源方式'
                            },{
                                id:40,
                                label: '政治面貌'
                            },{
                                id:41,
                                label: '技术职称'
                            },{
                                id:42,
                                label: '图文信息'
                            }
                        ]
                    },
                    {
                        label: '人事管理',
                        id:5,
                        children: [
                            {
                                id:43,
                                label: '任务类别1'
                            },{
                                id:44,
                                label: '任务类别2'
                            },{
                                id:45,
                                label: '任务类别3'
                            },{
                                id:46,
                                label: '常报1'
                            },{
                                id:47,
                                label: '常报2'
                            },{
                                id:48,
                                label: '常报3'
                            },{
                                id:49,
                                label: '任务序号'
                            },{
                                id:50,
                                label: '奖补类型',
                            },{
                                id:51,
                                label: '罚扣类型',
                            }
                        
                        ]
                    },{
                        label: '行物管理',
                        id:7,
                        children: [
                           {
                                id:52,
                                label: '维修家具',
                            },{
                                id:53,
                                label: '维修办公设备',
                            },{
                                id:54,
                                label: '维修网络通讯',
                            },{
                                id:55,
                                label: '维修电器',
                            },{
                                id:56,
                                label: '维修其他',
                            },{
                                id:57,
                                label: '证续类型',
                            },{
                                id:58,
                                label: '资产类型',
                            },{
                                id:59,
                                label: '外联类型',
                            },{
                                id:60,
                                label: '行政类型',
                            }
                        ]
                    },{
                        label: '人文管理',
                        id:8,
                        children: [
                            {
                                id:61,
                                label: '制度编号1',
                            },{
                                id:62,
                                label: '制度编号2',
                            },{
                                id:63,
                                label: '制度编号3',
                            },{
                                id:64,
                                label: '黑名类型',
                            }
                         ]
                    },{
                        label: '系统管理',
                        id:9,
                        children: [
                            {
                                id:65,
                                label: '地铁',
                            },{
                                id:66,
                                label: '环线',
                            },{
                                id:67,
                                label: '结构',
                            },{
                                id:68,
                                label: '学校类型',
                            },{
                                id:69,
                                label: '性质',
                            },{
                                id:70,
                                label: '级别',
                            }
                            ]
                         
                    }
                ],
                tab:[],
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

            handle(index, row){
                let _this =  this;
                this.linleft = index + 1;
                this.currentPage = row;
                let layerId = _this.$layer.iframe({
                  content: {
                    content: mdetailpa, //传递的组件对象
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
            //搜索
            serche(val){
                let _this=this
                paramList(val).then(function (res) {
                    _this.tableData=res.data
                })
            },
            rows(val){
                if(val!=null){
                    let ids=val.id
                    var arr=this.tab
                    if(arr.length==0){
                        arr.push(ids)
                        this.tab=arr
                    }else{
                        for(var i=0;arr.length>i;i++){
                           if(arr[i]==ids){
                               arr.splice(i, 1);
                               break
                           }else{
                               arr.push(ids)
                               break
                           }
                    }
                        this.tab=arr
                   }

                }
            },
            delep(){
                let del=this.lalist
                let dval=this.tab
                if(dval.length>0){
                    this.$refs.deletparam.changedelet(dval,del)
                }else{
                    this.$alert('<div class="pop-up" style="" >\n' +
                        '        <div class="pop-up-container">\n' +
                        '          <div class="clear" style="padding:15px 10px 15px 10px;;" >\n' +
                        '             <div class="left">\n'+
                        '               <i class="dangerous-icon" ></i>\n'+
                        '             </div>\n'+
                        '             <div class="left">\n'+
                        '                 <p style="margin-left:5px;font-size:12px;"><span id="" >请选择要删除的参数</span></p >\n' +
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
            getleData(val){
                this.tab=val
            },
            mdetail(val){
               // this.$refs.mdetailpa.changemParam(val)
            },
            getparamTree(val){
                let _this=this
                this.lalist=val.label
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
  // 多选
  .el-tree{
    min-width: 100%;
    display: inline-block;
    background-color: #EEEEEE;
  }
  /deep/ .el-checkbox__inner{
    background-color: #fff;
    border-color: #6c7c92;
    background-color: #DCDFE6;
    border-color: gray;
    width: 12px;
    height: 12px;
  }
  /deep/ .cell .el-checkbox__input .el-checkbox__inner {
    background-color: #fff;
    border-color: #6c7c92;
    background-color: #DCDFE6;
    border-color: gray;
    width: 12px;
    height: 12px;
  }
  /deep/ .el-checkbox {
    color: #a8a8a8;
  }
  /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #6c7c92;
  }
  /deep/ .el-checkbox__input .el-checkbox__inner::after {
    // 对号
    border: 1px solid #ededed;
    // 不覆盖下面的 会 导致对号变形
    box-sizing: content-box;
    content: "";
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    width: 3px;
    //
    transform: rotate(45deg) scaleY(1);
  }
  // 选中后
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #fff;
    border-color: #6c7c92;
    background-color: #DCDFE6;
    border-color: gray;
    width: 12px;
    height: 12px;
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner::after {
    border: 1px solid black;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    width: 3px;
    -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
  }
  /deep/ .el-checkbox__inner{
    background-color: #fff;
    border-color: #6c7c92;
    background-color: #DCDFE6;
    border-color: gray;
    width: 12px;
    height: 12px;
  }
  /deep/ .el-tree-node__label {
    font-size: 12px;
  }
  .paramm {
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
    .paramm-content{
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
  .paramm .el-table__body-wrapper{
    height:calc(100% - 27px);
  }
  .medlert1{
    border-width: 0px;
    margin-left: -6px;
    left: 0px;
    top: 0px;
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
  }
  .medlert2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3.5px;
    left: 0px;
    top: 0px;
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
  }
  .medlert3{
    border-width: 0px;
    text-align: center;
    left: 0px;
    top: 0px;
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
  }
</style>
