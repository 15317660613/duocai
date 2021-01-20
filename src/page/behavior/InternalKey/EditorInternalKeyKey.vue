<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container" style="height:450px;overflow-y:auto;overflow-x:hidden;" >
          <el-form ref="formsData"  :model="form" >
            <div class="clear" style="padding-top: 3px;">
              <div class="left" style="padding-left: 10px;" >
                <div class="left" style="margin-top: 8px;" >  
                  <i class="smalladd-icon" @click="addIKthings()"></i>
                </div>
                <span class="des-word require-word" style="width: 60px;" >钥匙名称</span>
              </div>
              <div class="left" >
                <el-form-item  label-width="0">
                  <el-input v-model.trim="form.value" title="上限15个字" maxlength="15" style="width:442px;"  autocomplete="off" ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="break" style="margin-top: 5px;"></div>
            <div class="clear" v-for="(item,index) in form.keys" v-if="item.deleted==0">
              <div class="clear">
                <div class="left" v-model="item.id" style="margin-top: 8px;padding-left: 10px;" @click="deletedOutreachthings(item)">
                  <i class="smalldelete-icon"></i>
                </div>
                <div class="left" >
                  <span class="des-word require-word"  style="width: 37px;">数量</span>
                </div>
                <div class="left" >
                  <el-form-item  label-width="0">
                    <el-input v-model.trim="item.num" onkeyup="value=value.replace(/[^\d]/g,'')" title="0-10位数" maxlength="10" style="width:50px;"  autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word require-word" style="width: 50px;">负责人</span>
                </div>
                <div class="left">
                  <el-form-item  label-width="0">
                    <el-select    style="width:60px;"  v-model="item.type" @change='selectChangemethods(item,index)'>
                      <el-option v-for="i in mypersondata" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-if="item.type==2" class="left">
                  <el-form-item  label-width="0">
                    <el-select    style="width:80px;"  v-model="item.departId" @change='selectChangedepart(item,item.departId)'>
                      <el-option  v-for="j in departdata"  :label="j.name" :value="j.id">
                        <span test :class="{padding1:j.level == 1,padding2:j.level == 2,padding3:j.level == 3,padding4:j.level == 4,padding5:j.level == 5,}" >
                          <span v-if="j.state=='关闭'" style="color: #999;">{{j.name}}</span>
                          <span v-if="j.state=='常态'">{{j.name}}</span>
                        </span>
                      </el-option>
                    </el-select>
                    <el-select    style="width:70px;"  v-model="item.userId">
                      <el-option v-for="k in item.departpersondata" :label="k.name" :value="k.id" :class="{'leave-user':k.stateUser == 1}"  ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-else class="left">
                  <el-form-item  label-width="0">
                    <el-input v-model.trim="item.userId" title="上限10个字" maxlength="10" style="width:154px;"  autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word require-word" style="width: 62px;">交付日期</span>
                </div>
                <div class="left" >
                  <el-form-item label-width="0">
                    <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="item.time" style="width: 90px;"></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="clear">
                <div class="left" style="padding-left:15px">
                  <span class="des-word" style="width: 52px;">备注</span>
                </div>
                <div class="left ">
                  <el-form-item  label-width="0">
                    <el-input type="textarea" :rows="3" v-model.trim="item.remark" title="备注" maxlength="100" style="width:462px;"  autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="break" style="margin-top: 5px;"></div>
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
  import { internalKeyinkeyDetail,internalKeygetKparam,internalKeyupdatekey } from "../../../service/InternalKey";
  import {findUserByDepartId} from "../../../service/organizeDate";

export default {
  props:['itemval','paramId','mykeynameid','mythisindex','layerid','myid'],
  data() {
    return {
      keynameid:this.mykeynameid,
      thisindex1:this.mythisindex,
      getId:this.myid,
      requestform:{
        view:2,
        paramId:this.paramId,
      },
      thisindex:0,
      form:{
        keys:[],
        view:'2',
        id:this.paramId,
        value:this.itemval,
        createBy:'',
        createTime:'',
        updateBy:'',
        updateTime:'',
      },
      mypersondata:[{id:'2',name:'内部',select:true},{id:'1',name:'自定义',select:false}],
      departdata:[],
    };
  },
  components: {

  },
  methods: {
    getdepartdata(){
      let _this = this;
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      internalKeygetKparam().then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let Arr  = [{id:'-1',name:'   ',select:true}];
          if(data.departTree){
            data.departTree.forEach(item => {
              Arr.push({
                id:item.id,
                name:item.label.replace(/&nbsp;/g, ""),
                select:false,
                state:item.state,
                level:item.level
              })
            })
            _this.departdata = Arr;
          }
          _this.getinternalKeyinkeyDetail();
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })
    },
    getinternalKeyinkeyDetail(){
      let _this = this;
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      let requestform = JSON.parse(JSON.stringify(_this.requestform));
      internalKeyinkeyDetail(requestform).then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          if(data.dedate.length>0){
            _this.form.keys = data.dedate;
            _this.form.createBy = data.operate.createBy;
            _this.form.createTime = data.operate.createTime;
            _this.form.updateBy = data.operate.updateBy;
            _this.form.updateTime = data.operate.updateTime;
            _this.thisindex = data.dedate.length;
            _this.form.keys.forEach(item=>{
              item.departpersondata=[];
              data.param.users.forEach(ii=>{
                if(item.departId&&item.departId == ii.departId){
                  item.departpersondata.push({
                    id:ii.id,
                    name:ii.name.replace(/&nbsp;/g, ""),
                    select:false
                  })
                }
              })
            })
          };
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })
    },
    selectChangedepart(item,val){
      let _this = this;
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      item.departpersondata = [];
      item.userId = '';
      let id = val;
      if(id){
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (response) {
          _this.$layer.closeAll('loading');
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let arr  = [{id:'-1',name:'   ',select:true}];
            let user = data.user;
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
            item.departpersondata = arr;
            _this.$forceUpdate();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }
    },

    deletedOutreachthings(val){
      val.deleted = 1;
      let _this = this;
      _this.thisindex = _this.thisindex-1;
    },
    addIKthings(){
      let _this = this;
      _this.form.keys.push({
        type:'2',
        userId:'',
        time:'',
        remark:'',
        departId:'-1',
        num:'',
        id:'',
        deleted:0,
        paramId:_this.name,
        departpersondata:[],
      })
      _this.thisindex = _this.thisindex+1;
    },
    selectChangemethods(item,index){
      let _this = this;
      _this.form.keys[index].userId = '';
      _this.form.keys[index].departId = '';
    },
    saveFormData(){
      let _this = this;
      let myckeck = true;
      let form = JSON.parse(JSON.stringify(_this.form));
      if (_this.form.value == '') {
        myckeck = false;
        _this.myAlert("钥匙名称不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.thisindex==0){
        _this.thisindex = 0;
        _this.myAlert("请点击增加按钮,增加数量,负责人和交付日期!", "dangerous-icon");
        return false;
      };
      _this.form.keys.forEach(item=>{
        if(item.num==''){
          myckeck = false;
          _this.myAlert("数量不能为空!", "dangerous-icon");
          return false;
        };
        if(item.type==2){
          if(item.departId=='-1'){
            myckeck = false;
            _this.myAlert("部门不能为空!", "dangerous-icon");
            return false;
          };
          if(item.userId==''){
            myckeck = false;
            _this.myAlert("人员不能为空!", "dangerous-icon");
            return false;
          };
        }else{
          if(item.userId==''){
            myckeck = false;
            _this.myAlert("人员不能为空!", "dangerous-icon");
            return false;
          };
        }
        
        if(item.time==''){
          myckeck = false;
          _this.myAlert("交付日期不能为空!", "dangerous-icon");
          return false;
        };
      });

      if(!myckeck){return false};

      let submitform = [];
      _this.form.keys.forEach(item=>{
        submitform.push({
          myid:item.myid,
          type:item.type,
          userId:item.userId,
          time:item.time,
          remark:item.remark,
          num:item.num,
          deleted:item.deleted,
          paramId:_this.name,
          view:'2',
          createBy:'',
          createTime:'',
          updateBy:'',
          id:item.id,
          keynameid:_this.keynameid,
        })
      });
      form.keys = JSON.stringify(submitform);
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      internalKeyupdatekey(form).then(function(response){
        _this.$layer.closeAll('loading');
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.clearFormData();
          _this.myAlert("数据保存成功！", "success-icon")
          .then(res => {
            _this.$parent.getParamsData();
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
    },
    upPage(e){
      let count = this.thisindex1;
      let needlayerid;
      e.path.forEach(item=>{
        if(item.id){
          if(item.id.indexOf('notification')!=-1){
            needlayerid = item.id;
          }
        }
      });
      let callbackdata = this.$parent.changeTitle(count-1,needlayerid,1);
      this.keynameid = callbackdata.row.keynameid;
      this.requestform.paramId = callbackdata.row.paramId;
      this.name = callbackdata.thisname;
      this.thisindex1 = callbackdata.thisindex;
      this.getdepartdata();
    },

    downPage(e){
      let count = this.thisindex1;
      let needlayerid;
      e.path.forEach(item=>{
        if(item.id){
          if(item.id.indexOf('notification')!=-1){
            needlayerid = item.id;
          }
        }
      });
      let callbackdata = this.$parent.changeTitle(count+1,needlayerid,2)
      this.keynameid = callbackdata.row.keynameid;
      this.requestform.paramId = callbackdata.row.paramId;
      this.name = callbackdata.thisname;
      this.thisindex1 = callbackdata.thisindex;
      this.getdepartdata();
    },
  },
  mounted(){   
    this.getdepartdata();
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