import Vue from 'vue' //引入vue
import Vuex from 'vuex' //引入vuex
//使用vuex
Vue.use(Vuex);
//创建Vuex实例
const store = new Vuex.Store({

  state: {
    openType: 1, //页面打开方式 1,tab页面，2，单页面
    options: [],
    thimyshade:false,
    activeIndex: '/',
    userInfo: {},
    layerifranme:[],
  },
  mutations: {
    // 添加tabs
    add_tabs(state, data) {
      this.state.options.push(data);
    },
    // 删除tabs
    delete_tabs(state, route) {
      let index = 0;
      for (let option of state.options) {
        if (option.path === route) {
          break;
        }
        index++;
      }
      this.state.options.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
      this.state.activeIndex = index;
    },
    // 保存当前模块弹窗
    set_active_layerifranme(state,mydata) {
      this.state.layerifranme.push(mydata);
    },
    // 设置详情信息
    save_detail_info(state, info) {
      this.state.userInfo = info;
    }
  }
})

export default store //导出store
