<template>
  <div class="tabs-content" >
    <div class="template-tabs nav-template-tabs" style="margin: 0px 10px;padding-top: 5px;">
      <el-tabs
        v-model="activeIndex"
        type="card"
        closable
        @tab-click="tabClick"
        @tab-remove="tabRemove"
        v-if="options.length != 0 "
        >
        <el-tab-pane
          :key="item.meta.name"
          v-for="(item, index) in options"
          :label="item.meta.title"
          :name="item.path" v-if="item.path != '/home/'">
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-wrap">
      <keep-alive>
        <router-view ></router-view>
      </keep-alive>  
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    data(){
      return {
      };
    },
    methods:{
      // tab切换时，动态的切换路由
      tabClick (tab) {
        let path = this.activeIndex;
        this.$router.push({path: path});
      },
      tabRemove (targetName) {
        // 首页不可删除
        if(targetName == '/') {
          return;
        }
        let arr = [];
        let _this = this;
        let data = JSON.parse(JSON.stringify(this.$store.state.layerifranme));
        let str = this.activeIndex.split('/')[2];
        for(let i = 0 , len = data.length ; i < len ; i++ ){
          if(data[i].thisactiveIndex == str){
            _this.$layer.close(data[i].childlayerid);
          }else{
            arr.push(data[i]);
          }
        }
       

        this.$store.state.layerifranme = arr;
        this.$store.commit('delete_tabs', targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            let currentOption = this.options[this.options.length-1];
            this.$store.commit('set_active_index', currentOption.path);
            this.$router.push({path: this.activeIndex});
            this.$store.state.layerifranme.forEach((item,index)=>{
              if(item.thisactiveIndex == currentOption.name){
                document.getElementById(item.childlayerid).style.display = "block";
              }else{
                document.getElementById(item.childlayerid).style.display = "none";
              }
            });
          } else {
            this.$router.push({path: '/home/'});
          }
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

  };
</script>
<style lang="scss" >
  .tabs-content {
    height:100%;
    .template-tabs {
      .el-tabs__item {
        padding: 0 8px;
        height: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 23px;
        display: inline-block;
        list-style: none;
        font-size: 12px;
        font-weight: 500;
        color: #303133;
        border-radius: 7px;
        background: #f0f0f0;
        position: relative;
      }
    }
    .content-wrap {
      height: calc(100% - 24px);
    }
  }
</style>

