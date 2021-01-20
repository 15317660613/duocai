<template>
  <div style="padding: 0 10px 10px;width: 100%;">
    <div class="pop-up" >
        <div class="pop-up-container" style="height:445px;overflow-y:auto;overflow-x:hidden;" >
          <el-form ref="_this.form"  :model="form" >
            <div class="clear" style="padding-top: 3px;">
              <div class="left" style="padding-left: 10px;" >
                <div class="left" style="margin-top: 8px;" >  
                  <i class="smalladd-icon" @click="addIKthings()"></i>
                </div>
                <span class="des-word require-word" style="width: 60px;" >钥匙名称</span>
              </div>
              <div class="left" >
                <el-form-item  label-width="0">
                  <el-input v-model.trim="form.value"  title="上限15个字" maxlength="15" style="width:453px;"  autocomplete="off" ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="break" style="margin-top: 5px;"></div>
            <div class="clear" v-if="form.keys.length>0" v-for="item in form.keys">
              <div class="clear">
                <div class="left" v-model="item.id" style="margin-top: 8px;padding-left: 10px;" @click="deletedOutreachthings(item.myid)">
                  <i class="smalldelete-icon"></i>
                </div>
                <div class="left" >
                  <span class="des-word require-word"  style="width: 37px;">数量</span>
                </div>
                <div class="left" >
                  <el-form-item  label-width="0">
                    <el-input v-model="item.num" type="number" title="0-10位数" maxlength="10" style="width:50px;"  autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="des-word require-word" style="width: 50px;">负责人</span>
                </div>
                <div class="left">
                  <el-form-item  label-width="0">
                    <el-select    style="width:60px;"  v-model="item.type" @change='selectChangemethods(item.type)'>
                      <el-option v-for="i in mypersondata" :label="i.name" :value="i.id"  style="width: 100px;"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-if="item.type==2" class="left">
                  <el-form-item  label-width="0">
                    <el-select    style="width:80px;"  v-model="item.departdefault" @change='selectChangedepart(item,item.departdefault)'>
                      <el-option  v-for="j in departdata"  :label="j.name" :value="j.id" style="width:120px;">
                        <span test :class="{padding1:j.level == 1,padding2:j.level == 2,padding3:j.level == 3,padding4:j.level == 4,padding5:j.level == 5,}" >
                          <span v-if="j.state=='关闭'" style="color: #999;">{{j.name}}</span>
                          <span v-if="j.state=='常态'">{{j.name}}</span>
                        </span>
                      </el-option>
                    </el-select>
                    <el-select    style="width:80px;"  v-model="item.userId">
                      <el-option v-for="k in item.departpersondata" :label="k.name" :value="k.id" :class="{'leave-user':k.stateUser == 1}"  ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-else class="left" style="margin-top: 3px;">
                  <el-input v-model.trim="item.userId"  title="上限10个字" maxlength="10" style="width:130px;"  autocomplete="off" ></el-input>
                </div>
                <div class="left" >
                  <span class="des-word require-word" style="width: 62px;">交付日期</span>
                </div>
                <div class="left" >
                  <el-form-item label-width="0">
                    <el-date-picker size="mini" type="date"  value-format="yyyy-MM-dd" v-model="item.time" style="width: 90px;"></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="clear">
                <div class="left" style="padding-left:15px">
                  <span class="des-word" style="width: 48px;">备注</span>
                </div>
                <div class="left ">
                  <el-form-item  label-width="0">
                    <el-input type="textarea" :rows="3" v-model.trim="item.remark" title="上限100个字" maxlength="100" style="width:476px;"  autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="break" style="margin-top: 5px;"></div>
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
  import { internalKeyinsertKeys,internalKeygetKparam } from "../../../service/InternalKey";
  import {findUserByDepartId} from "../../../service/organizeDate";
export default {
  props:['layerid'],
  data() {
    return {
      myvalue:'',
      form:{
        value:'',
        keys:[{
          myid:this.thisindex,
          type:'2',
          userId:'',
          time:'',
          remark:'',
          departdefault:'-1',
          num:'',
          deleted:0,
          departpersondata:[]
        }],
      },
      thisindex:0,
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
                level:item.level,
              })
            })
            _this.departdata = Arr;
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
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }

    },
    deletedOutreachthings(val){
      let _this = this;
      _this.form.keys.forEach(function(item,index){
        if(item.myid==val){
          _this.form.keys.splice(index,1);
        }
      })
    },
    addIKthings(){
      let _this = this;
      if(_this.form.value==''){
        _this.myAlert("钥匙名称不能为空!", "dangerous-icon");
        return false;
      }
      
      _this.form.keys.push({
        myid:_this.thisindex,
        type:'2',
        userId:'',
        time:'',
        remark:'',
        departdefault:'-1',
        num:'',
        deleted:0,
        paramId:_this.form.value,
        departpersondata:[],
      })
      _this.thisindex = _this.thisindex+1;
    },
    selectChangemethods(val){
      if(val == 0){

      }
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
      if(_this.form.keys.length == 0){
        myckeck = false;
        _this.myAlert("请点击增加按钮,录入数量,负责人,交付日期!", "dangerous-icon");
        return false;
      };
      _this.form.keys.forEach(item=>{
        if(item.num==''){
          myckeck = false;
          _this.myAlert("数量不能为空!", "dangerous-icon");
          return false;
        };
        if(item.type=='2'){
          if(item.departdefault=='-1'){
            myckeck = false;
            _this.myAlert("部门不能为空!", "dangerous-icon");
            return false;
          };
          if(item.userId==''){
            myckeck = false;
            _this.myAlert("人员不能为空!", "dangerous-icon");
            return false;
          };
        };
        if(item.type=='1'){
          if(item.userId==''){
            myckeck = false;
            _this.myAlert("负责人名称不能为空!", "dangerous-icon");
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
          paramId:_this.form.value,
          keynameid:_this.myvalue
        })
      });
      form.keys = JSON.stringify(submitform);
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      console.log(_this.form);
      console.log(form);
      internalKeyinsertKeys(form).then(function(response){
        _this.$layer.closeAll('loading');
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
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