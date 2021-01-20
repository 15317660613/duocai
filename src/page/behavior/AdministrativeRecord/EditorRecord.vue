<template>
  <div style="width:100%;margin:0 10px;">
    <div class="pop-up">
      <div class="pop-up-container" style="height:300px;overflow-y:auto;overflow-x:hidden;" >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" style="padding-top: 5px;">
            <div class="left" style="padding-left: 5px;" >
              <span class="des-word require-word" style="width: 60px;" >事件记录</span>
            </div>
            <div class="left" >
              <el-form-item  label-width="0">
                <el-input v-model.trim="form.event" title="上限20个字" maxlength="20" style="width:475px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear" >
            <div class="left" style="padding-left: 15px;">
              <span class="des-word require-word" style="width: 50px;">类型</span>
            </div>
            <div class="left">
              <el-form-item  label-width="0">
                <el-select    style="width:85px;"  v-model="form.type" @change='selectChangemethods()'>
                  <el-option v-for="item in mytypedata" :label="item.name" :value="item.id"  style="width: 100px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left" style="padding-left: 5px;">
              <span class="des-word require-word" style="width: 60px;">发出时间</span>
            </div>
            <div class="left" >
              <el-form-item label-width="0">
                <el-date-picker size="mini" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="form.startTime" style="width: 130px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left"  style="padding-left: 5px;">
              <span class="des-word require-word" style="width: 60px;">收回时间</span>
            </div>
            <div class="left" >
              <el-form-item label-width="0">
                <el-date-picker size="mini" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="form.endTime" style="width: 130px;"></el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="clear" >
            <div class="left padding-l-15" style="padding-left:10px" >
              <span class="des-word require-word" >行政人</span>
            </div>
            <div class="left">
                <el-form-item  label-width="0">
                  <el-select   style="width:100px;"  v-model="form.administratorDepartId" @change="departpersonchooseone">
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
                  <el-select   style="width:105px;"  v-model="form.administrator">
                    <el-option v-for="item in administratorUsers" :label="item.name" :class="{'leave-user':item.stateUser == 1}"  :value="item.id"  style="width: 100px;"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            <div class="left" style="padding-left: 5px;">
              <span class="des-word require-word" >执行人</span>
            </div>

            <div class="left">
              <el-form-item label label-width="0">
                <el-select   style="width:105px;"  v-model="form.executorDepartId" @change="departpersonchoosetwo">
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
                <el-select   style="width:105px;"  v-model="form.executor">
                  <el-option v-for="item in executorUsers" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"   style="width: 100px;"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear" >
            <div class="left" style="padding-left:15px">
              <span class="des-word" style="width: 52px;">备注</span>
            </div>
            <div class="left ">
              <el-form-item  label-width="0">
                <el-input type="textarea" :rows="4" v-model.trim="form.remark" title="上限1000个字,数字/字母/汉字" maxlength="1000" style="width:475px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
      </div>
        </el-form>
      </div>
      <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
        <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 10px;" >
          <div class="left" style="padding-right:7px;"  >
            <i class="up-page-icon" @click="upPage($event)" ></i>
          </div>
          <div class="left" >
            <i class="down-page-icon" @click="downPage($event)" ></i>
          </div>
        </div>
        <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        <div class="right" style="padding:1px 0px 2px 1px;margin-right:10px;" >
          <i class="file-icon" @click="isShowPhotoAndFile" ></i>
        </div>
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
  //获取数据
  import { mapState,mapGetters,mapActions,mapMutations } from 'vuex'
  import { administrativegetAdparam,administrativeupdetail,administrativeardetail } from "../../../service/AdministrativeRecord";
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {getFilesList7,deletedFiles7,uploadFiles7,updateFileName7} from '../../../service/fileData'
  import ShowPhotoAndFilePage from "../../../components/file.vue";
  import FilePage from '../../../components/file'
export default {
  props:['myid','mythisindex','layerid'],
  data() {
    return {
      id:this.myid,
      thisindex:this.mythisindex,
      form:{
        event:'',
        type:'-1',
        startTime:'',
        endTime:'',
        remark:'',
        administrator:'',
        administratorDepartId:'',
        executor:'',
        executorDepartId:'',
      },
      mytypedata:[],
      departdefaulttwo:'',
      departDataone:[],
      departDatatwo:[],
      alluserdata:[],
      administratorUsers:[],
      executorUsers:[],
      currentPage:'',
    };
  },
  components: {
    FilePage
  },
  methods: {
    getParamsData(){
      let _this = this;
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      administrativeardetail(_this.myid).then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          if(data.params.users){
            _this.alluserdata = data.params.users;
          };
          let Arr  = [{id:'-1',name:'   ',select:true}];
          if(data.params.recordParams){
            data.params.recordParams.forEach((item,index)=>{

              // if(index==0){
              //   item.select = true;
              //   _this.form.type = item.id;
              // }
              Arr.push({
                id:item.id,
                name:item.name.replace(/&nbsp;/g, ""),
                select:false
              })
            })
            _this.mytypedata = Arr;
          };

          let initArr1  = [{id:'-1',name:'   ',select:true}];
          if(data.params.departTree){
            data.params.departTree.forEach(item => {
              initArr1.push({
                id:item.id,
                name:item.label.replace(/&nbsp;/g, ""),
                select:false,
                state:item.state,
                level:item.level
              })
            })
            _this.departDataone = initArr1;
          }

          let initArr2  = [{id:'-1',name:'   ',select:true}];
          if(data.params.departTree){
            data.params.departTree.forEach(item => {
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
          let administratorUsers = data.administratorUsers;
          if(administratorUsers && administratorUsers.length != 0){
            
            let arr = [];
            administratorUsers.forEach(function(item){
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
            _this.administratorUsers = arr;
          }
          
          let executorUsers = data.executorUsers;
          if(executorUsers && executorUsers.length != 0){
            
            let arr = [];
            executorUsers.forEach(function(item){
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
            _this.executorUsers = arr;
          }

          _this.form = data.AdministrativeRecord;
          // _this.getRecordDetail();
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })
    },
    getRecordDetail(){
      let _this = this;
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      administrativeardetail(_this.myid).then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })
    },
    selectChangemethods(val){},
    departpersonchooseone(value){
      let _this = this;
      let id = _this.form.administratorDepartId;
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
            
            _this.administratorUsers =  arr;
            _this.form.administrator = ' ';
          } else if (response.status == 1) {

            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }else{
        _this.administratorUsers =  [];
        _this.form.administrator = ' ';
      }
    },

    departpersonchoosetwo(){
      let _this = this;
      let id = this.form.executorDepartId;
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
            
            _this.executorUsers =  arr;
            _this.form.executor = ' ';
          } else if (response.status == 1) {

            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }else{
        _this.executorUsers =  [];
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
      
      if (form.administrator == '') {
        _this.myAlert("行政人人员不能为空!", "dangerous-icon");
        return false;
      };
      
      if (form.executor == '') {
        _this.myAlert("执行人人员不能为空!", "dangerous-icon");
        return false;
      };
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      
      administrativeupdetail(form).then(function(response){
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
    isShowPhotoAndFile(){
      // this.$refs.FilePageId.showDialogVisible();
      let _this = this;
      let test = _this.$layer.iframe({
        content: {
          content: FilePage, //传递的组件对象
          parent: this,//当前的vue对象
          data:{
            recordId:_this.id,
            getFilesByType:getFilesList7,
            deleteFiles:deletedFiles7,
            uploadFiles:uploadFiles7,
            updateFileName:updateFileName7,
            downLoadFiles:'/administrative/downloadReFiles',
          }//props
        },
        area:['800px','560px'],
        title: "图照",
        shadeClose: false,
        shade: true,//是否显示遮罩
        zIndex:19891110,
        cancel:()=>{//关闭事件
          this.currentPage = '';
        }
      });
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
      let callbackdata = this.$parent.changeTitle(count-1,needlayerid,1);
      this.getId = callbackdata.rowid;
      this.thisindex = callbackdata.thisindex;
      this.getParamsData();
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
      let callbackdata = this.$parent.changeTitle(count+1,needlayerid,2)
      this.getId = callbackdata.rowid;
      this.thisindex = callbackdata.thisindex;
      this.getParamsData();
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