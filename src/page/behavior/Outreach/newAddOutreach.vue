<template>
  <div class="" style="padding: 0 10px 10px;width: 100%;">
    <div class="pop-up">
        <div class="pop-up-container" style="height:302px;overflow-y:auto;overflow-x:hidden;position: relative;" >
          <el-form ref="formsData"  :model="form" >
            <div class="clear">
              <div class="left" style="padding-left: 25px;" >
                <span class="des-word require-word" >类型</span>
              </div>
              <div class="left" >
                <el-form-item  label-width="0">
                  <el-select  style="width:110px;"  v-model="form.typeId">
                    <el-option v-for="item in mytype" :label="item.name" :value="item.id"  style="width: 100px;"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clear">
              <div class="left" style="padding-left: 20px;" >
                <span class="des-word require-word" style="width: 60px;">外联名称</span>
              </div>
              <div class="left" >
                <el-form-item  label-width="0">
                  <el-input v-model.trim="form.organizationName" title="上限10个字"  maxlength="10" style="width:110px;"  autocomplete="off" ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="des-word require-word" >联系人</span>
              </div>
              <div class="left" >
                <el-form-item  label-width="0">
                  <el-input v-model.trim="form.name" title="上限4个字" maxlength="4" style="width:100px;"  autocomplete="off" ></el-input>
                </el-form-item>
              </div>
              <div class="left">
                <span class="des-word require-word" >电话</span>
              </div>
              <div class="left" >
                <el-form-item  label-width="0">
                  <el-input v-model.trim="form.tel" onkeyup="value=value.replace(/[^\d]/g,'')" title="0-15位数字" maxlength="15" style="width:120px;"  autocomplete="off" ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="clear">
              <div class="left padding-l-15" style="padding-left:25px" >
                <span class="des-word require-word" >负责人</span>
              </div>

              <div class="left">
                <el-form-item  label-width="0">
                  <el-select   style="width:120px;"  v-model="departdefault" @change="departpersonchoose">
                    <el-option  v-for="item in departdata"  :label="item.name" :value="item.id">
                      <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                        <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                        <span v-if="item.state=='常态'">{{item.name}}</span>
                      </span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item  label-width="0">
                  <el-select  style="width:120px;"  v-model="form.adminId">
                    <el-option v-for="item in departpersondata" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"   style="width: 100px;"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left" style="padding:0px 0 0 30px">
                <span class="des-word" style="width: 60px;">预办</span>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0">
                  <el-date-picker
                    size="mini"
                    type="date"
                    v-model="form.time"
                    style="width: 110px;"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="clear" style="margin-top: 3px;">
              <div class="left" style="padding:3px 0 0 28px">
                <span class="des-word" style="width: 52px;">备注</span>
              </div>
              <div class="left ">
                <el-form-item prop="word1" label-width="0">
                  <el-input type="textarea" :rows="4" v-model.trim="form.remark" title="上限100个字" maxlength="100" style="width:440px;"  autocomplete="off" ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="break" style="margin-top: 5px;"></div>
            <div class="clear">
              <div class="item left clear" style="margin:10px 0px 0px 50px;" @click="addOutreachthings()" >
                <div class="left" style="margin-top: 5px;" >
                  <i class="smalladd-icon"></i>
                </div>
                <div class="left" style="margin: 3px 0px 0px 10px;" >
                  <span class="search-word">事件</span>
                </div>
              </div>
            </div>
            <div  class="clear" v-model="thingsdata" v-if="thingsdata.length>0&&item.deleted==0" v-for="item in thingsdata" style="margin: 10px 0px 0px 50px;">
              <div class="left" v-model="item.id" style="margin-top: 6px;" @click="deletedOutreachthings(item.myid)">
                <i class="smalldelete-icon"></i>
              </div>
              <div class="left padding-l-2" style="margin-left: 10px;">
                <el-form-item label label-width="0">
                  <el-date-picker
                    size="mini"
                    type="date"
                    v-model="item.time"
                    style="width: 110px;"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="left" style="margin-left: 10px;">
                <el-form-item  label-width="0">
                  <el-input v-model.trim="item.remark" title="上限100个字"  maxlength="100" style="width:323px;"  autocomplete="off" ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        </div>
      </div>
      
  </div>
</template>

<script>
  // 获取数据
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import { externalConnectiongetWparam,externalConnectioninsertConnection } from "../../../service/OutreachList";
import {findUserByDepartId} from "../../../service/organizeDate";
export default {
  props:['layerid'],
  data() {
    return {
      form:{
        typeId:'',
        organizationName:'',
        name:'',
        tel:'',
        time:'',
        remark:'',
        adminId:'',
      },
      departdefault:'',
      departpersondata:[],
      departdata:[],
      mytype:[],
      thingsdata:[],
      thingsdataIds:0,
    };
  },
  components: {
  },
  methods: {
    getParamsData(){
      let _this = this;
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });

      externalConnectiongetWparam().then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let Arr  = [{id:'-1',name:'   ',select:true}];
          if(data.externalParams){
            _this.mytype = Arr.concat(data.externalParams);
          }else{
            _this.mytype = Arr;
          }
          let initArr  = [{id:'-1',name:'   ',select:true}];
          if(data.departTree){
            data.departTree.forEach(item => {
              initArr.push({
                id:item.id,
                name:item.label.replace(/&nbsp;/g, ""),
                select:false,
                state:item.state,
                level:item.level,
              })
            })
            _this.departdata = initArr;
          }
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })
    },
    departpersonchoose(){
      let _this = this;
      _this.departpersondata = [];
      _this.form.adminId = '';
      let id = _this.departdefault;
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      if(id){
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (response) {
          _this.$layer.closeAll('loading');
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let user = data.user;
            let arr = [];
            if(user && user.length != 0){
              user.forEach(function(item){
                let obj = {
                  id: item.id,
                  name: item.name,
                  stateUser:0,
                }
                if(item.paramName == '正式离职'){
                  obj.stateUser  = 1;
                }
                arr.push(obj);
              })
            }
            _this.departpersondata = arr;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }
    },
    addOutreachthings(){
      let _this = this;
      _this.thingsdata.push({
        myid:_this.thingsdataIds++,
        time:'',
        remark:'',
        deleted:0,
        id:null,
        externalConnectionId:''
      })
    },
    deletedOutreachthings(val){
      let _this = this;
      _this.thingsdata.forEach(function(item,index){
        if(item.myid==val){
          item.deleted = 1
        }
      })
    },
    saveFormData(){
      let _this = this;
      let thistrue = true;
      let form = JSON.parse(JSON.stringify(_this.form));
      if (form.typeId == '') {
        _this.myAlert("类型不能为空!", "dangerous-icon");
        return false;
      };
      if (form.organizationName == '') {
        _this.myAlert("外联名称不能为空!", "dangerous-icon");
        return false;
      };
      if (form.name == '') {
        _this.myAlert("联系人不能为空!", "dangerous-icon");
        return false;
      };
      if (form.tel == '') {
        _this.myAlert("电话不能为空!", "dangerous-icon");
        return false;
      };
      if (_this.departdefault == '') {
        _this.myAlert("部门不能为空!", "dangerous-icon");
        return false;
      };
      if (form.adminId == '') {
        _this.myAlert("人员不能为空!", "dangerous-icon");
        return false;
      };
      _this.thingsdata.forEach(item=>{
        if(item.time==null||item.time=="null"){
          item.time = ''
        };
        if(item.time==''&&item.remark==''){
          _this.myAlert("请填写事件时间或内容!", "dangerous-icon");
          thistrue = false;
          return false;
        };

      });
      if(thistrue==false){
        return false;
      };
      if(form.time==null||form.time=="null"){
        form.time=''
      };
      form.event = JSON.stringify(_this.thingsdata);
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      externalConnectioninsertConnection(form).then(function(response){
        _this.$layer.closeAll('loading');
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.myAlert("数据保存成功！", "success-icon")
          .then(res => {
            _this.$parent.searchInsuranceMoneyList();
            _this.clearFormData();
          })
          .catch(err => {});

        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      })
    },
    
    clearFormData(){
      this.$layer.close(this.layerid);
    }
  },
  mounted(){
    this.getParamsData();
  },
  beforeDestroy(){
    let _this = this;
    _this.$store.state.layerifranme.forEach((item,index)=>{
      if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
        _this.$store.state.layerifranme.splice(index,1);
      }
    }); 
  },
  
};
</script>

<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>
<style lang="scss" scoped>
  .padding1{
    padding-left:0px;
    display:inline-block;
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
  }
</style>