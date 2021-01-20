<template>
  <div class="rent-container mycontailerclass1" id="rent-container" style="margin-top: 24px!important;">
   <div class="left_box">
        <div class="address">
            <p style="text-align:center">+{{data.title}}</p>
            <p v-for="el in data.tree" :key="el.id">
                <span @click="getDataList(item.id)" style="padding-left:10px;cursor:pointer;text-align:center" v-for="item in el.children" :key="item.id">-{{item.label}}</span>
            </p>
        </div>
        <div class="point">
          <div class="Tips">
            <ul>
              <li>
                <div class="box forSale">

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
                <p>外方已签约({{foreignSignedNum}})(认筹/下定/认购</p>
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
    <div class="right_box" style="height:calc(100%);width: calc(100% - 10px);" >

      <div class="top-container border-black mycontailerclass2" >

        <div class="search-container " >
          <el-form ref="formsData"   >

            <div  id="searchContent1"  style="height:27px;"  class="clear" >

              <div style="cursor:pointer;" class="item left " @click="showNewIdentifyRef">
                <div class="left"  >
                  <i class="fa fa-plus add"></i>
                </div>
                <div class="left" >
                  <span class="des-word" >认筹</span>
                </div>
              </div>

              <div style="cursor:pointer;" class="left padding-l-15" >
                <div class="left"  >
                  <i class="onsale-icon"></i>
                </div>

                <span class="des-word"  @click="changeEvent('在售')">在售</span>
              </div>
              <div style="cursor:pointer;" class="left padding-l-15" >
                <div class="left"  >
                  <i class="money-icon"></i>
                </div>
                <span class="des-word"   @click="changeEvent('待售')">待售</span>
              </div>
              <div style="cursor:pointer;" class="left padding-l-15" >
                <span class="des-word" @click="changeEvent('我方')">我方</span>
              </div>
              <div style="padding-left:10px;padding-top:3px;"  class="left"  >
                <i class="cut-icon"></i>
              </div>

              <div  class="left" style="padding-left:10px;cursor:pointer;" >

                <span class="des-word" @click="changeEvent('外方')">外方</span>
              </div>
              <div style="padding-left:10px;padding-top:3px;"  class="left"  >
                <i class=" cut-icon"></i>
              </div>
              <div  class="left" style="padding-left:10px;cursor:pointer;" >
                <span style="cursor:pointer;" class="des-word" @click="changeEvent('停滞')" >停滞</span>
              </div>
              <div class="icon">
                <i class="back-icon" @click="tabRemove('/home/projectSalesDetail')"></i>
              </div>
            </div>

          </el-form>
        </div>
      </div>

      <div class="content clear" style="height:calc(100%)" >
        <div class="list-content list-contanier" style="width:calc(100% - 10px);height:calc(100% - 55px)" >
            <el-table :data="tableData" height="100%" border  row-key="id" :cell-style ="cellStyle" :cell-class-name="rowClass"  @cell-dblclick="cellDbclick" :header-cell-style="{background:'#DCD9D3',border:'1px solid #ccc',color:'#000'}" >
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
                  :width='mapTitle[item.field]*70+5'
                  align="center"
                >
                    <template style="background:#EEEEEE;" slot-scope="scope">
                      <div class="left every-square" :style="{'width':'70px','height':'60px','border-right':(scope.row[item.field].length-1 != index1 || scope.row[item.field].length == 1) ? '1px solid #FFF' : '',}"   v-for="(item1 , index1) in scope.row[item.field]" >
                        <div :class="{'background1':item1.roomState == 1,'background2':item1.roomState == 2,'background3':item1.roomState == 3,'background4':item1.roomState == 4,'background5':item1.roomState == 5 }" >
                          <div style="height:20px;line-height:20px;text-align:center;"  >{{item1.roomNum}}</div>
                          <div class="">
                            <div style="height:20px;line-height:20px;text-align:right;padding-right:2px;color:#AD5C33;" class="square">{{item1.area}}</div>
                            <div style="height:20px;line-height:20px;text-align:right;padding-right:2px;color:#AD5C33;" class="price">{{item1.price}}</div>
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
</template>


<script>
  import {maketDetail,maketDTree} from "../../../service/marketControlData"
   import {identifyChipsParams} from "../../../service/salesControl";
  import NewIdentifyChipsPage from "../sell/newIdentifyChips";
  export default {
    data(){
      return{
        dialogNewBuildingSchool:false,
        mapTitle:'',
        tableData: [],
        planList: [],
        columnData:[],
        color:'',
        forSaleNum:0,
        onSaleNum:0,
        mySignedNum:0,
        foreignSignedNum:0,
        stagnationNum:0,
        num:false,
        selectedItem: [],
        data:[],
      }
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
      getDataList(id){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        maketDetail({id}).then(res=>{
          _this.$layer.closeAll("loading");
          let title = res.data.title;

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
          }
        })
      },
      handleSelect(item) {
        console.log(item);
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
        let test = _this.$layer.iframe({
          content: {
            content: NewIdentifyChipsPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "新增认筹",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });
      },
      reloadSaleList(){

      },
      changeEvent(name){


      },

      rowClass ({ row, column, rowIndex, columnIndex }) {
        if ( columnIndex === 0) {
          return 'linght'
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
      },
      detailRes(){
        let id=this.$route.query.id
        let obj={
          id
        }
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
      let id=this.$route.query.id
        let obj={
          id
        }
        maketDTree({id}).then(res=>{
          let list=res.data
          this.data=list
        })
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
    components:{
      NewIdentifyChipsPage
    }
  }
</script>

<style lang="scss" scoped>
  .rent-container{
    font-size: 12px;
    height: 100%;
    padding: 5px;
    display: flex;
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
    .every-square:active{
      background:#008000 !important;
    }
    .left_box{
      width: 200px;
      height: 100%;
      .address{
        width: 100%;
        height: 60%;
        background: #fff;
        border-radius: 10px;
        border: 1px solid #6f6d6d;
        padding: 20px;
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
        padding: 20px;
        ul{
          li{
            display: flex;
            margin-top: 10px;
            .box{
              width: 20px;
              height: 20px;
              border:1px solid #000;
              margin-right: 10px;
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
        margin:5px 0 0 5px;
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
.el-table th.gutter{
      display: none!important;
  }
</style>
