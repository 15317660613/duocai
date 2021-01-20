<template>
  <div id="nav-bar" class="nav-bar clear ">
    <div id="bar-container" class="f_l" @click="thisactive1" tabindex="0" @focusout="blurfunc1">
      <el-menu v-bind:menu-trigger="hoverORclick"  :default-active="myactiveIndex" class="el-menu-demo" @open="handleOpen" mode="horizontal" @close="handleClose"  @select="handleSelect">
        <el-submenu
          v-for="(item, index) in navData"
          :key="item.title"

          :index="item.index"

        >
          <template slot="title">
            <div class="mymenuclass" style="margin-top: 2px;">
              <div v-if="index!=0" class="fffline" style="width: 1px;height: 10px;background: #fff;margin-top: 10px;float: left;">
                  
              </div>
              <span v-if="index==0" style="margin-left: 6px;" class="navtitlename">{{item.title}}</span>
              <span v-if="index!=0" class="navtitlename">{{item.title}}</span>
              <div v-if="index!=navData.length-1" class="999line" style="width: 1px;height: 10px;background: #999;margin-top: 10px;float: right;">
                
              </div>
            </div>
            
          </template>
          <el-menu-item
            v-for="(itemChild, indexChild) in item.childNav"
            :key="itemChild.title"
            @mouseover="mouseover3" 
            @mouseleave="leave3"
            @click="linkDetailPage(itemChild)"
            :index="item.index+'-'+itemChild.index" v-if="itemChild.type == 1" >
            {{itemChild.title}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
	  <div class="rightDiv clear" @click="thisactive2" tabindex="1" @focusout="blurfunc2">
      
      <div class="left closeiframeclass" @mouseover="mouseover1" @mouseleave="leave1">
        <i  class="ten-nine-icon "></i>
        <div class="closeiframeccontent" v-show="show1 == 1">
          <div class="every-code1">
            <p style="padding: 6px 0px;" @click="closeAllifranmefunc">关闭全部</p>
            <div style="padding: 0px 10px;height: 1px;background: #e4e4e4;width: 90%;margin-left: 5%;"></div>
            <div style="padding: 0px 10px;height: 1px;background: #ffffff;width: 90%;margin-left: 5%;"></div>
            <p style="padding: 6px 0px;" @click="closeotherifranmefunc">关闭其他</p>
          </div>
           
        </div>
      </div> 
      <div class="left" style="padding: 5px 8px;">
        <i class="ten-eight-icon"></i>
      </div>
     
      <div class="left" style="padding: 5px 8px;">
        <i class="ten-ten-icon "></i>
      </div>
      <div class="left " style="position:relative;padding:5px 35px 5px 8px;" >
        <i @mouseover="mouseover2" @mouseleave="leave2" class="code-icon "></i>
        <div v-show="show2 == 1" style="position:absolute;left:-17px;top:18px;z-index:10;background:#f2f6fcf7;" >
          <div class="every-code2" >
            <img src="../../images/android.png" style="width:160px;height:auto;" />
            <p class="every-code-text" >经纪管理系统(安卓)-1.1</p>
          </div>
          <div class="every-code2" >
            <img src="../../images/ios.png" style="width:160px;height:auto;" />
            <p class="every-code-text" >经纪管理系统(IOS))-1.1</p>
          </div> 
        </div>
      </div>
      <div class="left" style="padding: 5px 8px;">
        <span style="line-height:23px;height:23px;display:inline-block;color:rgb(123, 123, 121);" >{{userName}}</span>
      </div>
       <div class="left"  style="padding: 5px 8px;">
        <i class="ten-eleven-icon"></i>
      </div> 
	  </div>

  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import navData from "./navData"

  export default {
    components: {

    },
    name: 'Header',
    data() {
      return {
        show1:0, 
        show2:0,
        click1:0,  
	      userName: sessionStorage.getItem('userName'),
        navData:navData.navData,
        myactiveIndex: '1',
        hoverORclick:'click',
        mythisactive:'0',
      };
    },

    computed:{
      ...mapState({//获取数据
        openType:state=>state.openType,
        activeIndex:state=>state.activeIndex,
      }),
      options () {
        return this.$store.state.options;
      },
      
    },
    methods:{
      linkDetailPage(item){
        let openType = this.openType;
        let path = item.path;
        if(item.name == "manchoose"){
          this.$emit("showMange");
          return false;
        }
        if(openType ===1){
          let route = {
            title:item.title,
            route:path,
            name:item.name,
          }
          this.$router.push({path: path,});
        }else{
          this.$router.push({path:path,});
        }

      },
      mouseover1(){
        if(this.click1==1){
          this.show1 = 1;
        }
      },
      
      leave1(){
        this.show1 = 0;
      },
      mouseover2(){
        this.show2 = 1;
      },
      
      leave2(){
        this.show2 = 0;
      },

      mouseover3(){
        console.log('111');
      },
      
      leave3(){
        console.log('222');
      },
      thisactive1(){
        // if(this.hoverORclick == 'hover'){
        //   this.hoverORclick = 'click';
        // };
        // if(this.hoverORclick == 'click'){
        //   this.hoverORclick = 'click'
        // }
        this.hoverORclick = 'hover'
      },
      thisactive2(){
        if(this.show1 == 0){
          this.click1 = 1;
          this.show1 = 1;
        }else{
          this.show1 = 0;
        }
        
      },
      handleClose(key, keyPath){
        // console.log(key, keyPath);
      },
      handleOpen(key, keyPath){
        // console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      blurfunc1(){
        this.hoverORclick = 'click';
      },
      blurfunc2(){
        this.click1 = 0;
        this.show1 = 0;
      },
      closeAllifranmefunc(){
        let _this = this;
        _this.options.forEach(item=>{
          if(item.path){
            setTimeout(function(){ _this.$store.commit('delete_tabs', item.path); }, 10);
          }
        });
        this.$router.push({path: '/home/'})
        this.show1 = 0;
        _this.$store.state.layerifranme = [];
      },
      closeotherifranmefunc(){
        let _this = this;
        _this.options.forEach(item=>{
          if(item.path!=_this.activeIndex){
            setTimeout(function(){ _this.$store.commit('delete_tabs', item.path); }, 10);
          }
        });
        _this.$store.state.layerifranme.forEach((item,index)=>{
          if(item.thisactiveIndex!=_this.activeIndex.split('/')[2]){
            _this.$store.state.layerifranme.splice(index,1);
          }
        });
        this.$router.push({path: _this.activeIndex})
        this.show1 = 0;
      },
    },
    watch: {
      '$route'(to) {
        let flag = false;
        let meta = to.meta;
        if(meta.name != "projectCompare" && meta.name != "customerCompare" && meta.name != "houseCompare" && meta.name != "physical" && meta.name != "budget"&&
          meta.name != "weekcompare"&& meta.name != "monthcompare"&& meta.name != "seasoncompare"&& meta.name != "yearcompare"&& meta.name != "manchoose"&& meta.name != "AccumulationFund"&& meta.name != "SalaryDetails"&& meta.name != "InternalKeyKey"&& meta.name != "PhysicalProcedures"&& meta.name != "PhysicalAssets") {
          for (let option of this.options) {
            if (option.name === to.name) {
              flag = true;
              this.$store.commit('set_active_index', '/home/' + to.path.split('/')[2]);
              if(this.$store.state.layerifranme.length!=0){
                this.$store.state.layerifranme.forEach((item,index)=>{
                  if(item.thisactiveIndex==to.name){
                    document.getElementById(item.childlayerid).style.display = "block";
                    if(item.oneORmore==1){
                      document.getElementById(item.childlayerid+'_mask').style.display = "block";
                    }
                    
                  }else{
                    document.getElementById(item.childlayerid).style.display = "none";
                    if(item.oneORmore==1){
                      document.getElementById(item.childlayerid+'_mask').style.display = "none";
                    }
                  }
                });
              }
              
              break
            }
          }
          if (!flag) {
            this.$store.commit('add_tabs', {path: '/home/' + to.path.split('/')[2], meta: meta, name: to.name});
            this.$store.commit('set_active_index', '/home/' + to.path.split('/')[2]);
            this.$store.state.layerifranme.forEach((item,index)=>{
              document.getElementById(item.childlayerid).style.display = "none";
              if(item.oneORmore==1){
                document.getElementById(item.childlayerid+'_mask').style.display = "none";
              }
            });
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
   .rightDiv{
    position: absolute;
    right: 10px;
    top: 2px;
    vertical-align:middle;
    text-align:center;
    font-size: 12px;
    outline: none;
  }
  .padding-right-15{
    padding-right:15px;
  }
  .every-code1{
    
    min-width: 90px;
    background: #f0f0f0;
  }
  .every-code1 p:hover{
    color: rgba(51, 102, 153, 0.8);
    background: rgba(51, 102, 153, 0.15);
  }
  .every-code2{
    padding: 5px;
    border: 1px solid #ccc;
    margin: 8px;
    border-radius: 3px;
    .every-code-text{
      margin: 3px;
      text-align: center;
      font-size: 12px;
    }
  }
  .code-icon{
    background:url(../../images/cod-icon.png) ;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .window-icon{
    background:url(../../images/home/u103.png)  -15px -15px;;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .question-special-icon{
    background:url(../../images/home/u128.png)  -15px -15px;;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .news-icon{
    background:url(../../images/home/u3.png)  -15px -15px;;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .personal-icon{
    background:url(../../images/home/u102.png)  -15px -15px;;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .el-submenu__title {
    font-size: 12px;
    padding: 0 0 0 5px !important;
  }
  
  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom-width:0px;
  }

  .el-menu-item {
    font-size: 12px;
    padding:0 8px !important;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 23px;
    line-height: 23px;
    border-bottom: 2px solid transparent;
    color: #909399;
  }
  .el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
    background:rgba(0,0,0,0);
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: #000;
    text-align: center;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    color:rgba(51,102,153,0.8);
    background-color:rgba(51,102,153,0.15);
  }
  .el-menu.el-menu--horizontal {
    border-bottom-width:0px;
  }
  .el-menu{
    background:#f0f0f0;
  }
  .nav-bar{
    background:#f0f0f0;
    box-sizing: border-box;
    border: 1px solid rgba(174, 174, 174, 1);
    border-top-width:0px;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 12px;
    height:32px;
    .left-fa{
      line-height:36px;margin-left:20px;
    }
    #bar-container{
      padding-left:20px;
      .elem-bar{
        padding:5px;
        margin:5px;
      }
    }

  }
  /deep/ .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
    display: none;
  }
  /deep/ .el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 29px;
    line-height: 29px;
  }
  /deep/ .el-submenu__title{
    padding: 0px;
  }
  /deep/ .el-menu--popup-bottom-start{
    margin-top: 0px;
  }
  /deep/ .el-opened .el-submenu__title .mymenuclass .navtitlename{
    display: inline-block !important;
    border: 1px solid #000 !important;
    border-bottom: none !important;
    border-radius:3px !important;
  }
  /deep/ .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom: none;
  }
  /deep/ .closeiframeccontent{
    position:absolute;
    left:-1px;
    top:29px;
    z-index:10;
    background:#f2f6fcf7;
    border: 1px solid #999;
    border-radius: 5px;
    border-top: none;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  /deep/ .closeiframeclass{
    cursor: pointer;
    position:relative;
    padding: 5px 8px;
  }
  /deep/ .closeiframeclass:hover{
    border: 1px solid #999;
    border-radius: 3px;
    padding: 4px 7px 5px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom:none;
    background: #f2f2f2;
  }
  /deep/ .el-menu--horizontal>.el-submenu .el-submenu__title:hover{

  }
  /deep/ .navtitlename{
    padding: 5px 5px 6px;
    margin: 0px 5px;
  }
  /deep/ .navtitlename:hover{
    border: 1px solid #999;
    background: #f2f2f2;
    padding: 5px 4px 5px;
  }
</style>
<style lang="scss">
</style>
