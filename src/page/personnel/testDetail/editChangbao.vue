<template>
  <div style="width:100%;padding:0 10px;">
      <div class="pop-up"  style="padding:0 0 5px 0">
        <div class="pop-up-container" style="height:104px;">
          <div class="move-content">
            <el-form ref="formsData" :model="form">
              <div style="padding:3px 7px;">
                <el-form-item label="常报" prop="townId">
                  <el-select style="width:80px;" v-model="form.newId1"  class="select">
                    <el-option style="width:100px;" v-for="item in myreportOneList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-select style="width:80px;" v-model="form.newId2"  class="select">
                    <el-option style="width:100px;" v-for="item in myreportTwoList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-select style="width:80px;" v-model="form.newId3"  class="select">
                    <el-option style="width:100px;" v-for="item in myreportThreeList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding-top: 5px;">
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
  </div>
</template>
<script>
import { taskgetparams } from "../../../service/testDetailData";
import { changeTask } from "../../../service/testDetailData";
export default {
  props: ["ids",'reportOneList','reportTwoList','reportThreeList','layerid'],
  data() {
    return {
      myreportOneList:[],
      myreportTwoList:[],
      myreportThreeList:[],
      form: {
        ids: "",
        newId1: "",
        newId2: "",
        newId3: "",
        type:1,
       
      }
    };
  },
  methods: {
    changedatafunc(){
      this.reportOneList.forEach(item=>{
        if(item.id == '-1'){
          item.name='不修改'
        }
      });
      this.myreportOneList = this.reportOneList;
      this.form.newId1 = '-1';

      this.reportTwoList.forEach(item=>{
        if(item.id == '-1'){
          item.name='不修改'
        }
      });
      this.myreportTwoList = this.reportTwoList;
      this.form.newId2 = '-1';

      this.reportThreeList.forEach(item=>{
        if(item.id == '-1'){
          item.name='不修改'
        }
      });
      this.myreportThreeList = this.reportThreeList;
      this.form.newId3 = '-1';
    },

    saveData() {
      let _this = this;
      let form=JSON.parse(JSON.stringify(this.form));
      form.ids = _this.ids;
      _this.$layer.loading({
        shade: true //是否显示遮罩
      });
      changeTask(form).then(function(response) {
        _this.$layer.closeAll('loading');
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this
            .myAlert("数据保存成功", "success-icon")
            .then(res => {
              _this.$parent.getTableData();
              _this.cancelData();
            })
            .catch(err => {});
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    cancelData(){
      this.$layer.close(this.layerid);
    },
  },
  mounted(){
    this.changedatafunc();
  },
};
</script>

<style lang="scss" scoped>
.move-content {
  padding: 20px 0 10px 0px;
  .title-word {
    line-height: 20px;
    font-size: 12px;
  }

  .select {
    width: 120px;
  }
  p {
    color: #990000;
    font-size: 12px;
  }
}
</style>
