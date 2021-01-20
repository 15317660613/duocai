<template>
  <div style="padding: 0 10px;width: 100%">
    <div class="pop-up">
      <div class="pop-up-container" style="height:300px;overflow-y:auto;overflow-x:hidden;" >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" style="padding-top: 5px;">
            <div class="left" style="padding-left: 5px;" >
              <span class="des-word require-word" style="width: 60px;" >事件记录</span>
            </div>
            <div class="left" >
              <el-form-item  label-width="0">
                <el-input v-model.trim="form.event" title="上限20个字" maxlength="20" style="width:464px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left: 15px;">
              <span class="des-word require-word" style="width: 50px;">类型</span>
            </div>
            <div class="left">
              <el-form-item  label-width="0">
                <el-select  style="width:95px;"  v-model="form.type" @change='selectChangemethods()'>
                  <el-option v-for="item in mytypedata" :label="item.name" :value="item.id"  style="width: 95px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left" style="padding-left: 0px;">
              <span class="des-word require-word" style="width: 60px;">发出时间</span>
            </div>
            <div class="left" >
              <el-form-item label-width="0">
                <el-date-picker size="mini" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="form.startTime" style="width: 125px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left"  style="padding-left: 0px;">
              <span class="des-word require-word" style="width: 60px;">收回时间</span>
            </div>
            <div class="left" >
              <el-form-item label-width="0">
                <el-date-picker size="mini" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="form.endTime" style="width: 125px;"></el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left padding-l-15" style="padding-left:10px" >
              <span class="des-word require-word" >行政人</span>
            </div>
            <div class="left">
                <el-form-item  label-width="0">
                  <el-select  style="width:100px;"  v-model="departdefaultone" @change="departpersonchooseone">
                    <el-option  v-for="item in departDataone"  :label="item.name" :value="item.id">
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
                  <el-select  style="width:100px;"  v-model="form.administrator">
                    <el-option v-for="item in departPersonDataone" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"  style="width: 100px;"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            <div class="left" style="padding-left: 10px;">
              <span class="des-word require-word" >执行人</span>
            </div>

            <div class="left">
              <el-form-item label label-width="0">
                <el-select  style="width:100px;"  v-model="departdefaulttwo" @change="departpersonchoosetwo">
                  <el-option  v-for="item in departDatatwo"  :label="item.name" :value="item.id">
                      <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                        <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                        <span v-if="item.state=='常态'">{{item.name}}</span>
                      </span>
                    </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select  style="width:100px;"  v-model="form.executor">
                  <el-option v-for="item in departPersonDatatwo" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"   style="width: 100px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:15px">
              <span class="des-word" style="width: 52px;">备注</span>
            </div>
            <div class="left ">
              <el-form-item  label-width="0">
                <el-input type="textarea" :rows="6" v-model.trim="form.remark" title="上限1000个字,数字/字母/汉字" maxlength="1000" style="width:464px;"  autocomplete="off" ></el-input>
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
  //获取数据
  import { mapState,mapGetters,mapActions,mapMutations } from 'vuex'
  import { administrativegetAdparam,administrativeinsertrecord } from "../../../service/AdministrativeRecord";
  import {findUserByDepartId} from "../../../service/organizeDate";

  import ShowPhotoAndFilePage from "../../../components/file.vue";
export default {
  props:['layerid'],
  data() {
    return {
      form:{
        event:'',
        type:'-1',
        startTime:'',
        endTime:'',
        remark:'',
        administrator:'',
        executor:'',
      },
      mytypedata:[],
      departdefaultone:'',
      departdefaulttwo:'',
      departDataone:[],
      departDatatwo:[],
      alluserdata:[],
      departPersonDataone:[],
      departPersonDatatwo:[],
      currentPage:'',
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
      administrativegetAdparam().then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let Arr  = [{id:'-1',name:'   ',select:true}];
          if(data.recordParams){
            data.recordParams.forEach((item,index)=>{
              Arr.push({
                id:item.id,
                name:item.name.replace(/&nbsp;/g, ""),
                select:false
              })
            })
            _this.mytypedata = Arr;
          };

          let initArr1  = [{id:'-1',name:'   ',select:true}];
          if(data.departTree){
            data.departTree.forEach(item => {
              initArr1.push({
                id:item.id,
                name:item.label.replace(/&nbsp;/g, ""),
                select:false,
                state:item.state,
                level:item.level,
              })
            })
            _this.departDataone = initArr1;
          }

          let initArr2  = [{id:'-1',name:'   ',select:true}];
          if(data.departTree){
            data.departTree.forEach(item => {
              initArr2.push({
                id:item.id,
                name:item.label.replace(/&nbsp;/g, ""),
                select:false,
                state:item.state,
                level:item.level,
              })
            })
            _this.departDatatwo = initArr2;
          };
          if(data.users){
            _this.alluserdata = data.users;
          };
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })
    },
    selectChangemethods(val){},
   


    departpersonchooseone(value){
      let _this = this;
      let id = _this.departdefaultone;
      if(id) {
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let user = data.user;
            let arr = [{id:'',name:' '}];
            if(user && user.length != 0){
              user.forEach(function(item){
                if(item.doBusiness == 1 ) {
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                }
              })
            }
            
            _this.departPersonDataone =  arr;
            _this.form.administrator = ' ';
          } else if (response.status == 1) {

            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }else{
        _this.departPersonDataone =  [];
        _this.form.administrator = ' ';
      }
    },

    departpersonchoosetwo(){
      let _this = this;
      let id = _this.departdefaulttwo;
      if(id) {
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let user = data.user;
            let arr = [{id:'',name:' '}];
            if(user && user.length != 0){
              user.forEach(function(item){
                if(item.doBusiness == 1 ) {
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                }
              })
            }
            
            _this.departPersonDatatwo =  arr;
            _this.form.executor = ' ';
          } else if (response.status == 1) {

            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }else{
        _this.departPersonDatatwo =  [];
        _this.form.executor = ' ';
      }
    },
    clearFormData(){
      this.$layer.close(this.layerid);
    },
    saveFormData(){
      let _this = this;
      
      let form = JSON.parse(JSON.stringify(_this.form));
      if (form.event == '') {
        _this.myAlert("事件记录不能为空!", "dangerous-icon");
        return false;
      };
      if (form.type == '-1') {
        _this.myAlert("类型不能为空!", "dangerous-icon");
        return false;
      };
      if (form.startTime == '') {
        _this.myAlert("发出时间不能为空!", "dangerous-icon");
        return false;
      };
      if (form.endTime == '') {
        _this.myAlert("收回时间不能为空!", "dangerous-icon");
        return false;
      };
      if (_this.departdefaultone == '') {
        _this.myAlert("行政人部门不能为空!", "dangerous-icon");
        return false;
      };
      if (form.administrator == '') {
        _this.myAlert("行政人人员不能为空!", "dangerous-icon");
        return false;
      };
      if (_this.departdefaulttwo == '') {
        _this.myAlert("执行人部门不能为空!", "dangerous-icon");
        return false;
      };
      if (form.executor == '') {
        _this.myAlert("执行人人员不能为空!", "dangerous-icon");
        return false;
      };
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      
      administrativeinsertrecord(form).then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.clearFormData();
          _this.myAlert("数据保存成功！", "success-icon")
          .then(res => {
            _this.$parent.searchThisTableList();
            _this.clearFormData();
          })
          .catch(err => {});

        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      })
    },
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