<template>
  <div style="width:100%;padding:0 10px;">
      <div class="pop-up">
        <div class="pop-up-container" style="height:108px;">
          <div class="move-content">
            <el-form ref="formsData" :model="form">
              <div class style="padding:3px 0px;">
                <el-form-item label="类别1" prop="townId">
                  <el-select style="width:100px;" v-model="form.newId1" class="select" @change="taskTypeOneListchange">
                    <el-option style="width:100px;" v-for="item in mytaskTypeOneList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                    <el-input
                    v-model.trim="word1"
                    title="概念/备注/执行/灵感"
                    maxlength="30"
                    disabled
                    style="width:140px;"
                    autocomplete="off"
                  ></el-input>

                </el-form-item>


                
              </div>
              <div class style="padding:3px 0px;">
                <el-form-item label="类别2" prop="townId">
                  <el-select style="width:100px;" v-model="form.newId2" class="select" @change="taskTypeTwoListchange">
                    <el-option style="width:100px;" v-for="item in mytaskTypeTwoList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-input
                    v-model.trim="word2"
                    title="概念/备注/执行/灵感"
                    maxlength="30"
                    disabled
                    style="width:140px;"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>

                  
              </div>
              <div class style="padding:3px 0px;">
                <el-form-item label="类别3" prop="townId">
                  <el-select style="width:100px;" v-model="form.newId3" class="select" @change="taskTypeThreeListchange">
                    <el-option style="width:100px;" v-for="item in mytaskTypeThreeList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                    <el-input
                    v-model.trim="word3"
                    title="概念/备注/执行/灵感"
                    maxlength="30"
                    disabled
                    style="width:140px;"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>

                

              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding: 3px 0px;">
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
  props: ["ids",'taskTypeOneList','taskTypeTwoList','taskTypeThreeList','layerid'],
  data() {
    return {
      word1:"",
      word2:"",
      word3:"",
      mytaskTypeOneList:[],
      mytaskTypeTwoList:[],
      mytaskTypeThreeList:[],
      form: {
        ids: "",
        newId1: "",
        newId2: "",
        newId3: "",
        type:2,
       
      }
    };
  },
  methods: {
    changedatafunc(){
      this.taskTypeOneList.forEach(item=>{
        if(item.id == '-1'){
          item.name='不修改'
        }
      });
      this.mytaskTypeOneList = this.taskTypeOneList;
      this.form.newId1 = '-1';

      this.taskTypeTwoList.forEach(item=>{
        if(item.id == '-1'){
          item.name='不修改'
        }
      });
      this.mytaskTypeTwoList = this.taskTypeTwoList;
      this.form.newId2 = '-1';

      this.taskTypeThreeList.forEach(item=>{
        if(item.id == '-1'){
          item.name='不修改'
        }
      });
      this.mytaskTypeThreeList = this.taskTypeThreeList;
      this.form.newId3 = '-1';
      debugger;
    },
    taskTypeOneListchange(){
      console.log(this.taskTypeOneList);
      this.taskTypeOneList.forEach(item=>{
        if(item.id == this.form.newId1){
          this.word1 = item.remark;
        }
      })
    },
    taskTypeTwoListchange(){
      this.taskTypeTwoList.forEach(item=>{
        if(item.id == this.form.newId2){
          this.word2 = item.remark;
        }
      })
    },
    taskTypeThreeListchange(){
      this.taskTypeThreeList.forEach(item=>{
        if(item.id == this.form.newId3){
          this.word3 = item.remark;
        }
      })
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
  padding-left:10px;
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
