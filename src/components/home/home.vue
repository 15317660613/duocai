<template>
  <div class="box" >
    <div class="content-container">
      <div class="header-nav" >
        <Navbar @showMange="showMange" ></Navbar>
      </div>
      <div v-if="openType === 1" class="open-type-one" >
        <Tabs  >

        </Tabs>
      </div>
       <div v-if="openType === 2" class="open-type-two" >
         <router-view></router-view>
      </div>
      
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex'
  import Navbar from '../common/Navbar'
  import Tabs from '../common/section'
  import  ManChoosePage from "../../page/organize/mangent/manchoose"
  export default {
    name: 'Header',
    data () {
      return {

      }
    },
    computed:{
      ...mapState({//获取数据
        openType:state=>state.openType,
      }),
    },
    methods:{
      showMange(){
        let _this = this;
        let layerId = this.$layer.iframe({
          content: {
            content: ManChoosePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['600px','550px'],
          title: "管理选项",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      addFun(){
         this.$store.dispatch("addFun");
      },
      reductionFun(){
        this.$store.dispatch("reductionFun");
      }
    },
    components:{
      Navbar,
      Tabs,
      ManChoosePage
    },
  }
</script>
<style lang="scss" >
  .box{
    display: flex;
    height: 100%;
    width:100%;
    .content-container{
      width:100%;
      height:100%;
      .open-type-one{
        width:100%;
        height:calc(100% - 24px);
        background:#DCD9D3;
      }
      .open-type-two{

      }
    }
  }
  .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 ;
  }


</style>
