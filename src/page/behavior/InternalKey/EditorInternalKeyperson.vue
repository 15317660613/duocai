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
                <span class="des-word require-word" style="width: 90px;" >增加钥匙名称</span>
              </div>
            </div>
            <div class="break" style="margin-top: 5px;"></div>
            <div class="clear" v-for="item in form.keys" v-if="form.keys.length>0&&item.deleted==0">
              <div class="clear">
                <div class="left" v-model="item.myid" style="margin-top: 8px;padding-left: 10px;" @click="deletedOutreachthings(item)">
                  <i class="smalldelete-icon"></i>
                </div>
                <div class="left" >
                  <span class="des-word require-word" style="width: 65px;">钥匙名称</span>
                </div>
                <div class="left">
                  <el-form-item  label-width="0">
                    <el-select  style="width:140px;"  v-model="item.paramId" @change='selectChangemethods(item)'>
                      <el-option v-for="i in keynamedata" :label="i.name" :value="i.id"  style="width: 100px;"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word require-word"  style="width: 60px;">数量</span>
                </div>
                <div class="left" >
                  <el-form-item  label-width="0">
                    <el-input v-model.trim="item.num"  onkeyup="value=value.replace(/[^\d]/g,'')" title="0-10位数" maxlength="10" style="width:60px;"  autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word require-word" style="width: 90px;">交付日期</span>
                </div>
                <div class="left" >
                  <el-form-item label-width="0">
                    <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="item.time" style="width: 90px;"></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="clear">
                <div class="left" style="padding-left:43px">
                  <span class="des-word" style="width: 49px;">备注</span>
                </div>
                <div class="left ">
                  <el-form-item  label-width="0">
                    <el-input type="textarea" :rows="3" v-model.trim="item.remark" title="上限100个字" maxlength="100" style="width:440px;"  autocomplete="off" ></el-input>
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
  props:['myid','myuserId','mytype','mythisindex','layerid'],
  data() {
    return {
      getId:this.myid,
      thisindex1:this.mythisindex,
      type:this.mytype,
      requestform:{
        view:1,
        userId:this.myuserId
      },
      form:{
        view:'1',
        keys:[],
        createBy:'',
        createTime:'',
        updateBy:'',
        updateTime:'',
      },
      thisindex:0,
      keynamedata:[],
      departdata:[],
      departId:'',
      myparam:{},
    };
  },
  components: {

  },
  methods: {
    getparamsdata(){
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
          if(data.keyname){
            data.keyname.forEach(item => {
              Arr.push({
                id:item.id,
                name:item.value,
                select:false
              })
            })
            _this.keynamedata = Arr;
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
          if(data.dedate){
            _this.form.keys = data.dedate;
            _this.form.createBy = data.operate.createBy;
            _this.form.createTime = data.operate.createTime;
            _this.form.updateBy = data.operate.updateBy;
            _this.form.updateTime = data.operate.updateTime;
            _this.thisindex = data.dedate.length;
            _this.form.keys.forEach(item=>{
              item.myid = _this.thisindex;
              _this.departId = item.departId;
            })
          };
          if(data.param){
            _this.myparam = data.param;
          }
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })
    },
    selectChangedepart(item,val){
      let _this = this;
      item.departpersondata = [];
      item.userId = '';
      let id = val;
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
            let initArr  = [{id:'-1',name:'   ',select:true}];
            data.user.forEach(item => {
              initArr.push({
                id:item.id,
                name:item.name.replace(/&nbsp;/g, ""),
                select:false
               })
            })
            item.departpersondata = initArr;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }

    },
    deletedOutreachthings(val){
      let _this = this;
      val.deleted = 1;
      _this.thisindex = _this.thisindex-1;
    },
    addIKthings(){
      console.log(this.getId);
      let _this = this;
      _this.form.keys.push({
        myid:_this.thisindex,
        time:'',
        remark:'',
        num:'',
        deleted:0,
        paramId:'',
        userId:_this.myuserId,
        type:_this.type,
        createBy:'',
        createTime:'',
        updateBy:'',
        updateTime:'',
      })
      _this.thisindex = _this.thisindex+1;
    },
    selectChangemethods(val){
      let _this = this;
      if(val){
        _this.keynamedata.forEach(item=>{
          if(item.value == val.paramId){
            val.keynameid=item.id
          }
        })
      }
    },
    saveFormData(){
      let _this = this;
      
      let myckeck = true;
      let form = JSON.parse(JSON.stringify(_this.form));
      if(_this.thisindex==0){
        _this.thisindex = 0;
        _this.myAlert("请点击增加按钮,录入钥匙名称,数量和交付日期!", "dangerous-icon");
        return false;
      }
      _this.form.keys.forEach(item=>{
        if(item.paramId==''){
          myckeck = false;
          _this.myAlert("钥匙名称不能为空!", "dangerous-icon");
          return false;
        };
        if(item.num==''){
          myckeck = false;
          _this.myAlert("数量不能为空!", "dangerous-icon");
          return false;
        };
        
        if(item.time==''){
          myckeck = false;
          _this.myAlert("交付日期不能为空!", "dangerous-icon");
          return false;
        };
      });

      if(!myckeck){return false};
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      form.keys = JSON.stringify(form.keys);
      internalKeyupdatekey(form).then(function(response){
        _this.$layer.closeAll('loading');
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
      this.requestform.userId = callbackdata.row.userId;
      this.type = callbackdata.row.type;
      this.thisindex1 = callbackdata.thisindex;
      this.getparamsdata();
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
      this.requestform.userId = callbackdata.row.userId;
      this.type = callbackdata.row.type;
      this.thisindex1 = callbackdata.thisindex;
      this.getparamsdata();
    },
  },
  mounted(){
    this.getparamsdata();
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