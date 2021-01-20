<template>
   <div class="pop-up" style="margin:0 10px;width:calc(100% - 20px);"  >
        <div class="pop-up-container" style="height:575px;" >
            <div class="left_box">
                <div class="address">
                    <el-tree style="background:#eee;width:150px;" :data="treeData"
                           
                            @node-click="getDataList"
                            default-expand-all
                            highlight-current
                            ref="selectTree"
                            :expand-on-click-node="false"
                            node-key="id"
                    >
                    </el-tree>
                </div>
                <div class="point">
                    <div class="Tips">
                        <ul>
                        <li  >
                            <div  class="box forSale">

                            </div>
                            <p>待售({{forSaleNum}})</p>
                        </li>
                        <li>
                            <div class="box onSale">

                            </div>
                            <p>在售({{onSaleNum}})</p>
                        </li>
                        <li>
                            <div class="box mySigned">

                            </div>
                            <p>我方已签约({{mySignedNum}})(认筹/下定/认购)</p>
                        </li>
                        <li>
                            <div class="box foreignSigned">

                            </div>
                            <p>外方已签约({{foreignSignedNum}})(认筹/下定/认购)</p>
                        </li>
                        <li>
                            <div class="box stagnation">

                            </div>
                            <p>停滞({{stagnationNum}})</p>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right_box" style="height:calc(100%);" >
                <div class="top-container border-black mycontailerclass2" >
                    <div class="search-container " style="border-bottom-width:0px;" >
                        <el-form ref="formsData"   >
                            <div  id="searchContent1"  style="height:27px;"  class="clear" >
                                <div  class="clear left click-btn " @click="showNewIdentifyRef">
                                  <div class="left icon-w-h"  >
                                    <i class="six-eleven-icon"></i>
                                  </div>
                                  <div class="left" style="line-height:12px;" >
                                      认筹
                                  </div>
                                </div>

                                <div  class="left clear click-btn "  @click="changeEvent(2)" >
                                    <div class="left icon-w-h"  >
                                      <i class="thirteen-eight-icon"></i>
                                    </div>
                                    <div class="left" style="line-height:12px;" >
                                      在售
                                    </div>
                                     
                                </div>
                                <div  class="left clear click-btn" @click="changeEvent(1)" >
                                    <div class="left icon-w-h"  >
                                      <i class="thirteen-seven-icon"></i>
                                    </div>
                                    <div class="left" style="line-height:12px;" >
                                      待售
                                    </div>
                                   
                                </div>
                               

                                <div  class="left clear click-btn"  @click="changeEvent(4)" >
                                    <div class="left icon-w-h" >
                                      <i class="thirteen-ten-icon" ></i>
                                    </div>
                                     <div class="left" style="line-height:12px;" >
                                      外方
                                    </div>   
                                    
                                </div>
                               
                                <div  class="left clear click-btn"  @click="changeEvent(5)" >
                                  <div class="left icon-w-h" >
                                    <i class="thirteen-nine-icon" ></i>
                                  </div>
                                  <div class="left" style="line-height:12px;" >
                                    停滞
                                  </div>
                                </div>
                            </div>

                        </el-form>
                    </div>
                </div>

                <div class="content clear specail-table" style="height:calc(100%)"  >
                    <div  class="list-content list-contanier" style="height:calc(100% - 38px) !important;margin-top:0px;" >
                        <el-table :data="tableData" height="520" border  row-key="id" :cell-style ="cellStyle" :cell-class-name="rowClass"  @cell-dblclick="cellDbclick" :header-cell-style="{background:'#DCD9D3',border:'1px solid #ccc',color:'#000'}" >
                        <template v-for="(item,index) in columnData" >
                            <el-table-column
                            v-if="item.field == 'floor'"
                            :prop="item.field"
                            label="楼层/单元"
                            width="80"
                            align="center"
                            >
                            </el-table-column>
                            <el-table-column
                            v-else
                            :prop="item.field"
                            :label="item.title"
                            :width="mapTitle[item.field]*70"
                            align="center"
                            >
                                <template style="background:#EEEEEE;" slot-scope="scope">
                                <div class="clear" :style="{'width':mapTitle[item.field]*70+'px'}" >  
                                  <div @dblclick="editorSale(item1.roomState,item1)" @click="getHouseNumId(item1)" class="left "  :style="{'width':'70px','height':'60px','border-right':(scope.row[item.field].length-1 != index1 ) ? '1px solid #FFF' : '',}"   v-for="(item1 , index1) in scope.row[item.field]" >
                                      <div :class="{'background1':item1.roomState == 1,'background2':item1.roomState == 2,'background3':item1.roomState == 3,'background4':item1.roomState == 4,'background5':item1.roomState == 5,'every-square':true }" >
                                      <div @click="" style="height:20px;line-height:20px;text-align:center;"  >{{item1.roomNum}}</div>
                                        <div class="">
                                            <div style="height:20px;line-height:20px;text-align:right;padding-right:2px;color:#AD5C33;" class="square">{{item1.area}}</div>
                                            <div style="height:20px;line-height:20px;text-align:right;padding-right:2px;color:#AD5C33;" class="price">{{item1.price}}</div>
                                        </div>
                                      </div>  
                                  </div>  
                                </div>  
                                </template>
                            </el-table-column>

                        </template> 
                        
                    </el-table>
                    </div>
                </div>
            </div>
            
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
              <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 10px;" >
                <div class="left" style="padding-right:7px;"  >
                  <i class="up-page-icon" @click="upPage($event)" ></i>
                </div>
                <div class="left" >
                  <i class="down-page-icon" @click="downPage($event)" ></i>
                </div>
              </div>
          </div>
        <div class="clear footerabsoluteclass">
          <div class="left footerabsoluteclasschild" >
            <span class="record-word footerpaddingleft10">最后修改:</span>
            <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
            <span v-if="form.updateTime" class="record-word footerpaddingleft10" style="margin-left: -15px;">最后修改时间:</span>
            <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
          </div>
    </div>
  </div>
</template>


<script>
  import {maketDetail,maketDTree,updateMaketState} from "../../../service/marketControlData"
   import {identifyChipsParams} from "../../../service/salesControl";
  import NewIdentifyChipsPage from "../sell/newIdentifyChips";
  import EditorIdentifyChipsPage from '../sell/editorIdentifyChips'
  export default {
    props:['myid','layerid','mythisindex'],  
    data(){
     
      return{
        id:this.myid,
        thisindex:this.mythisindex,
        mapTitle:'',
        tableData: [],
        planList: [],
        columnData:[],
        houseNumId:"",
        roomState:"",
        currentId:"",
        color:'',
        forSaleNum:0,
        onSaleNum:0,
        mySignedNum:0,
        foreignSignedNum:0,
        stagnationNum:0,
        num:false,
        selectedItem: [],
        data:[],
        treeData:[],
        form:{
          updateBy:'',
          updateTime:'',
        },
      }
    },
    components:{
      NewIdentifyChipsPage,
      EditorIdentifyChipsPage
    },
    methods:{
      handleNodeClick(data) {
        console.log(data);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      getHouseNumId(item){
        if(item && item.id){
          this.houseNumId = item.id;
          this.roomState = item.roomState;
        };
      },
      getDataList(data){
        let _this = this;
        this.houseNumId = "";
        this.roomState = "";
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = data.id;
        this.currentId = id;
        maketDetail({id}).then(res=>{
          _this.$layer.closeAll("loading");
          let title = res.data.title;
          let data = res.data;
          let list = res.data.list;
          let mapTitle = {};
          if(title && title.length != 0){
            title.forEach(item =>{
              mapTitle[item.field] = 0;
            })
          }
          if(list && title.length != 0){
            list.forEach(item =>{
              
               for(let attr in mapTitle){
                 let item1 = mapTitle[attr];
                 if(typeof item[attr]  == 'object' && item1 < item[attr].length){
                   mapTitle[attr] = item[attr].length;
                 }
               }
            })
          }
          _this.mapTitle = mapTitle
           _this.tableData = list;
         
           
          if(title){
            _this.columnData = title;
          }else{
            _this.columnData = [];
          };
          _this.onSaleNum = data.num2
          _this.forSaleNum = data.num1
          _this.mySignedNum = data.num3
          _this.foreignSignedNum = data.num4
          _this.stagnationNum = data.num5
          _this.form.updateBy = data.updateBy;
          _this.form.updateTime = data.updateTime;
        })
      },

      reloadListData() {
        let _this = this;
        let id = this.currentId;
        if(!id){
          return false;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        
        
        maketDetail({id}).then(res=>{
          _this.$layer.closeAll("loading");
          let title = res.data.title;
          let data = res.data;
          let list = res.data.list;
          let mapTitle = {};
          if(title && title.length != 0){
            title.forEach(item =>{
              mapTitle[item.field] = 0;
            })
          }
          if(list && title.length != 0){
            list.forEach(item =>{
              
               for(let attr in mapTitle){
                 let item1 = mapTitle[attr];
                 if(typeof item[attr]  == 'object' && item1 < item[attr].length){
                   mapTitle[attr] = item[attr].length;
                 }
               }
            })
          }
          _this.mapTitle = mapTitle
           _this.tableData = list;
         
           
          if(title){
            _this.columnData = title;
          }else{
            _this.columnData = [];
          };
          _this.onSaleNum = data.num2
          _this.forSaleNum = data.num1
          _this.mySignedNum = data.num3
          _this.foreignSignedNum = data.num4
          _this.stagnationNum = data.num5
          _this.form.updateBy = data.updateBy;
          _this.form.updateTime = data.updateTime;
        })
      },

      showChange(){
        this.$refs.mychild.parentHandleclick();
      },
      cellStyle(roomState) {
        let className = '';
        
        if(roomState){
          if(roomState == 2){
            className="background:#fff;"
          }
          if(roomState == 1){
            className="background::rgba(192, 192, 255, 1);"
          }
          if(roomState == 3){
            className="background:rgba(255, 128, 128, 1);"
          }
          if(roomState == 4){
            className ="background:rgba(204, 153, 51, 1);"
          }
          if(roomState == 5){
            className = "background:red;"
          }
        }
          
        return className;
      },
      cellDbclick(row, column, cell, event){
        if(this.color==="purple"){
          this.$refs.mychild.parentHandleclick();
        }
        if(this.color==="#fff"){
          this.$refs.mychild.parentHandleclick();
        }
      },

       showNewIdentifyRef(){
        let _this = this;
        let  roomState = this.roomState;
        let houseNumId = this.houseNumId;
        if(roomState == 1 || roomState == 2){
          let layerId = _this.$layer.iframe({
            content: {
              content: NewIdentifyChipsPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{houseNumId:houseNumId}//props
            },
            area:['800px','560px'],
            title: "新增认筹",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件

            }
          });
        }else{
          this.myAlert("请选择在售或待售的房号！","dangerous-icon");
        }  
      },
      editorSale(state,row){
        let _this = this;
        this.currentPage = row;
        let adress = this.currentPage.adress;
        let customerName = this.currentPage.customerName; 
        if(!adress){
          adress = "";
        }
        if(!customerName){
          customerName = "";
        }
        if(state == 3){
          let layerId = _this.$layer.iframe({
            content: {
              content: EditorIdentifyChipsPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{id:row.prebuyId,}//props
            },
            area:['800px','560px'],
            title: "修改认筹 【项目:"+adress+'&nbsp;&nbsp;&nbsp;&nbsp;'+'客户:'+customerName+"】",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
              this.currentPage = '';
              if( _this.initLeft != 0){
                _this.initLeft -= 10;
                _this.initTop -= 30;
              }
            }
          })
        }
      },
     
      changeEvent(state){
        let _this = this;
        let ids = this.houseNumId;

        if(!ids){
          return false;
        }
        let form = {ids,state};
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        updateMaketState(form).then(function (response) {
           _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let msg = response.msg;
            _this.myAlert(msg,"success-icon").then(res => {
              _this.reloadListData();
            }).catch( res => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      rowClass ({ row, column, rowIndex, columnIndex }) {
        if ( columnIndex === 0) {
          return 'linght'
        }
      },

      reloadSaleList(){

      },
      detailRes(){
        let id = this.id;
        maketDetail({id}).then(res=>{
          let list=res.data.list
          this.onSaleNum=res.data.num2
          this.forSaleNum=res.data.num1
          this.mySignedNum=res.data.num3
          this.foreignSignedNum=res.data.num4
          this.stagnationNum=res.data.num5
          list.sort((a,b)=>{
            return a.id -b.id
          })
          this.tableData = list;
          this.planList = (list[0] && list[0]['planList']) || [];
        })
      },
      treeRes(){
        let id = this.id;
        
        maketDTree(id).then(res=>{
          let list=res.data
          this.treeData = list.tree;
        })
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
      upPage(e){
        let count = this.thisindex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata = this.$parent.changeTitle(count-1,needlayerid);
        this.thisindex = callbackdata.thisindex;
        this.id = callbackdata.rowid;
        this.detailRes()
        this.treeRes()
      },

      downPage(e){
        let count = this.thisindex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata = this.$parent.changeTitle(count+1,needlayerid);
        this.thisindex = callbackdata.thisindex;
        this.id = callbackdata.rowid;
        this.detailRes()
        this.treeRes()
      },
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
      this.detailRes()
      this.treeRes()
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
  .click-btn{
    border:1px solid #ccc;
    border-color:#fff #6f6d6d #6f6d6d #fff ;
    padding:2px 3px;
    margin:3px 5px;
    cursor:pointer;
  }
  .icon-w-h{
    width:15px;
    height:15px;
  }
  .pop-up-container{
    font-size: 12px;
    height: 100%;
    padding: 5px;
    display: flex;
    .every-square:hover{
      background:#D7E8FC !important;
    }
    .padding-l-15 {
      padding-left: 15px;
      display: flex;
    }
    .padding-l-10 {
      padding-left: 10px;
    }
    .padding-l-5 {
      padding-left: 5px;
    }
    .padding-l-2 {
      padding-left: 2px;
    }
    .search-btn,.claerlys{
      cursor:pointer;
    }
    .background1{
      background:rgba(192, 192, 255, 1);
    }
    .background2{
      background:#fff;
    }
    .background3{
      background:rgba(255, 128, 128, 1);
    }
    .background4{
      background:rgba(204, 153, 51, 1);
    }
    .background5{
      background:red;
    }
    .left_box{
      width: 120px;
      height: 100%;
      .address{
        width: 100%;
        height: 60%;
        background: #fff;
        border-radius: 10px;
        border: 1px solid #6f6d6d;
        overflow: auto;
        p{
          text-align: left;
        }
        span{
          display: block;
          text-align: left;
        }
      }
      .point{
        width: 100%;
        height: 38%;
        background: #f6f6f6;
        border-radius: 10px;
        border: 1px solid #6f6d6d;
        margin-top: 10px;
        padding: 5px;
        ul{
          li{
            display: flex;
            margin-top: 10px;
            .box{
              width: 15px;
              height: 15px;
              border:1px solid #000;
              margin-right:5px;
            }
            p{
              overflow:hidden;//隐藏文字
              text-overflow:ellipsis;//显示 ...
              width:100px;
            }
          }
          .forSale{
            background:rgba(192, 192, 255, 1) ;
          }
          .onSale{
            background:#fff ;
          }
          .foreignSigned{
            background:rgba(204, 153, 51, 1)
          }
          .mySigned{
            background:rgba(255, 128, 128, 1);
          }
          .stagnation{
            background:red;
          }
        }
      }
    }
    .right_box{
      width: 90%;
      .content{
        
        .itds{
          background: #EEEEEE;
          border:1px solid #fff;
        }
        .roomId{
          float: left;
        }
        .float_right{
          color:rgba(153, 51, 0, 0.317647058823529);
          .square{
            float: right;
          }
          .price{
            clear: both;
            text-align: right;
          }
        }
      }
      .back-icon{
        margin:5px 0 0 90px;
      }
      .add{
        color: #008000;
        font-size: 20px;
        margin:5px 5px 0 30px
      }
    }
  }
  .itds{
    border: 1px solid #fff;
  }
  .money-icon{
    background: url("../../../images/icon.png") -592px -174px;
    width: 20px;
    height: 22px;
    display: block;
    margin-top: 3px;
  }
  .onsale-icon{
    background: url(../../../images/icon.png) -62px -151px;
    width: 20px;
    height: 22px;
    display: block;
    margin-top: 3px;
  }
  .cut-icon {
    background: url("../../../images/system/fenge.png") -100px -90px;
    width: 3px;
    height: 27px;
    display: block;
  }

</style>

<style lang="scss">
 .specail-table .el-table .cell{
    padding:0px !important;
  }
.el-table th.gutter{
      display: none!important;
  }
</style>
