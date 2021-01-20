<template>
  <div style="padding: 0px 10px;width: 100%;">
    <div class="pop-up" style="padding-bottom: 27px;">
      <div class="search-container" style="height:310px;overflow:auto;padding-top: 20px;">
        <el-form ref="formsData" :model="form">
          <div class="clear">
            <div class="left" style="padding-left:34px">
              <span class="des-word require-word">奖罚人员</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="departId">
                <el-select
                  v-model="form.departId"
                  disabled
                  style="width:120px;"
                >
                  <el-option v-for="item in executorList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="userId">
                <el-select v-model="form.userId" disabled style="width:100px;">
                  <el-option v-for="item in userList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:59px">
              <span class="des-word require-word">奖罚</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="type">
                <el-select
                  :disabled="isClosingAccounts"
                  v-model="form.type"
                  @change="changetypefunc"
                  style="width:91px;"
                >
                  <el-option v-for="item in typelist" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="typeParam">
                <el-select :disabled="isClosingAccounts" v-model="form.typeParam" style="width:91px;">
                  <el-option v-for="item in typeParams" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:34px">
              <span class="des-word require-word">奖罚年月</span>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="time">
                <el-date-picker :disabled="isClosingAccounts" size="mini" type="month" v-model="form.time" value-format="yyyy-MM" style="width: 91px;"></el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:34px">
              <span class="des-word require-word">奖罚金额</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" prop="punishNum">
                <el-input
                  :disabled="isClosingAccounts"
                  type="text"
                  title="上限10位数"
                  style="width:91px;"
                  :maxlength="13"
                  v-model="form.punishNum"
                ></el-input>
                <span>元</span>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding:3px 0 0 41px">
              <span>奖罚备注</span>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" prop="punishReason">
                <el-input
                  :disabled="isClosingAccounts"
                  type="textarea"
                  :rows="4"
                  style="width:350px;padding-top:9px;"
                  title="上限1000个字"
                  :maxlength="1000"
                  v-model="form.punishReason"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div style="margin-top:5px">
        <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 10px;" >
          <div class="left" style="padding-right:7px;"  >
            <i class="up-page-icon" @click="upPage($event)" ></i>
          </div>
          <div class="left" >
            <i class="down-page-icon" @click="downPage($event)" ></i>
          </div>
        </div>
        <span
          class="right save-cancel-btn"
          style="margin-right:11px;padding: 2.4px 32px;"
          @click="cancelData"
        >取 消</span>
        <span
          class="right save-cancel-btn"
          style="padding: 2.4px 32px;"
          type="primary"
          @click="save"
        >保 存</span>
      </div>
    </div>
    <div class="clear footerabsoluteclass">
      <div class="left footerabsoluteclasschild" >
        <span class="record-word" style="margin-left:0px;">首次录入:</span>
        <span v-if="form.createBy" class="record-word">{{form.createBy}}</span>
        <span v-if="form.createTime" class="record-word">{{form.createTime}}</span>
        <span class="record-word footerpaddingleft10">最后修改:</span>
        <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
        <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { rewardUpdate, rewardDetial } from "../../../service/rewardData";
import { departperson } from "../../../service/organizeDate";
export default {
  props: ['myid','mythisindex','layerid'],
  data() {
    return {
      getId:this.myid,
      thisindex:this.mythisindex,
      executorList: [],
      typeParams: [],
      typeParamsAll:[],
      userList: [],
      typelist:[],
      isClosingAccounts:false,
      form: {
        departId: "",
        typeParam: "",
        userId: "",
        type: "",
        time: "",
        punishNum: "",
        punishReason: ""
      }
    };
  },
  methods: {
    changetypefunc() {
      let _this = this;
      let arr = [{ id: "-1", name: "  ", select: true }];
      _this.form.typeParam = '';
      _this.typeParamsAll.forEach(item=>{
        if(item.parentId==_this.form.type){
          arr.push(item);
        }
      })
      _this.typeParams = arr;
    },
    detailReward() {
      let _this = this;
      
      rewardDetial(_this.getId).then(res => {
        if (res.status === 500) {
          return false;
        } else if (res.status === 0) {
          let data = res.data;
          if (data.params.departTree) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let treeData = data.params.departTree;
            for (let i = 0; i < treeData.length; i++) {
              arr.push({
                id: treeData[i].id,
                name: treeData[i].label.replace(/&nbsp;/g, ""),
                level: treeData[i].level,
                select: false
              });
            }
            _this.executorList = arr;
          };
          if(data.users){
            let arr1 = [{ id: "-1", name: "  ", select: true }];
            data.users.forEach(item=>{
              arr1.push({
                id: item.id,
                name: item.name.replace(/&nbsp;/g, ""),
                select: false
              });
            })
            _this.userList = arr1;
          }
          if(data.params.typeParams){
            let arr2 = [{ id: "-1", name: "  ", select: true }];
            let arr3 = [{ id: "-1", name: "  ", select: true }];
            data.params.typeParams.forEach(item=>{
              arr2.push({
                id:item.id,
                name:item.name.replace(/&nbsp;/g, ""),
                select:false
              })
              if(item.children){
                item.children.forEach(ii=>{
                  arr3.push({
                    id:ii.id,
                    parentId:item.id,
                    name:ii.name.replace(/&nbsp;/g, ""),
                    select:false
                  })
                })
              }
              
            })
            _this.typelist = arr2;
            _this.typeParamsAll = arr3;
          };

          _this.form = data.punish;
          if(data.punish.isClosingAccounts=='1'){
            _this.isClosingAccounts = true;
          }else{
            _this.isClosingAccounts = false;
          }
          if(_this.typeParamsAll.length!=0){
            let arr4 = [{ id: "-1", name: "  ", select: true }];
            _this.typeParamsAll.forEach(item=>{
            if(item.parentId == _this.form.type){
              arr4.push(item);
              }
            })
            _this.typeParams = arr4;
          }
          
          console.log(_this.typeParams);
          
          
        }
      });
    },
    save() {
      let _this = this;
      console.log(_this.form);
      if(_this.form.departId==''){
        _this.myAlert("部门不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.form.userId==''){
        _this.myAlert("人员不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.form.type=='-1'){
        _this.myAlert("奖罚类型不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.form.typeParam=='-1'||_this.form.typeParam==''){
        _this.myAlert("奖罚类型不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.form.time==''||_this.form.time==null){
        _this.myAlert("奖罚年月不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.form.punishNum==''){
        _this.myAlert("奖罚金额不能为空!", "dangerous-icon");
        return false;
      };
      
      //加载动画
      _this.$layer.loading({ 
        shade: true
      });
      let form = {
        departId: _this.form.departId,
        typeParam:  _this.form.typeParam,
        userId:  _this.form.userId,
        type:  _this.form.type,
        time:  _this.form.time,
        punishNum:  _this.form.punishNum,
        punishReason:  _this.form.punishReason,
        userTimeId:_this.form.userTimeId,
        id:_this.getId
      }
      rewardUpdate(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.myAlert("数据保存成功！", "success-icon")
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
    cancelData() {
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
      let callbackdata = this.$parent.changeTitle(count,needlayerid,1);
      this.getId = callbackdata.rowid;
      this.thisindex = callbackdata.thisindex;
      this.detailReward();
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
      let callbackdata = this.$parent.changeTitle(count,needlayerid,2)
      this.getId = callbackdata.rowid;
      this.thisindex = callbackdata.thisindex;
      this.detailReward();
    },
  },
  mounted() {
    this.detailReward();
  },
  watch:{
    'form.punishNum':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form.punishNum = undefined;
          return;
        }
        this.form.punishNum = oldval
      } else {
        this.form.punishNum = newval.replace(/^\./g, "")
      }
    },
    
  },
  beforeDestroy(){
    let _this = this;
    _this.$store.state.layerifranme.forEach((item,index)=>{
      if(item.thisrowid == _this.getId){
        _this.$store.state.layerifranme.splice(index,1);
      }
    })
    _this.$parent.shadenum();
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-input.is-disabled .el-input__inner{
  text-align:center;
  height:20px !important;
}
.require-word:before {
  content: "*";
  color: #f56c6c;
  margin-right: 1px;
}
.padding-l-15 {
  padding-left: 15px;
}
.padding-l-5 {
  padding-left: 5px;
}
.padding-l-2 {
  padding-left: 2px;
}
.padding-l-10 {
  padding-left: 10px;
}
</style>