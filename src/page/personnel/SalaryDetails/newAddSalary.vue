<template>
  <div style="width: 100%;padding: 0px 10px;">
      <div class="pop-up">
        <div class="pop-up-container" style="height:464px;overflow-y:auto;overflow-x:hidden;position: relative;" >
          <el-form ref="formsData"  :model="formNA" >
            <div class="clear" >
              <div class="left center-fundation"  >
                <div class="clear" >
                  <div class="left" >
                    <el-form-item  prop="projectName" style="height: 30px;margin: 3px 0 0 30px;">
                      <el-input class="specialinput" style="width: 120px;" v-model.trim="formIM.name"  maxlength="10"  title="部门名称"   autocomplete="off" @input="mydebounce(vm)"></el-input>
                    </el-form-item>
                  </div>
                  <div class="left" style="padding:3px 0 0 100px">
                    <span class="des-word require-word" style="width: 60px;">选择年月</span>
                  </div>
                  <div class="left padding-l-2" style="padding-top:5px">
                    <el-form-item label label-width="0" prop="chooseTime">
                      <el-date-picker
                        size="mini"
                        type="month"
                        v-model="formNA.time"
                        style="width: 91px;"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        @change="datechangefunc"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>


              </div>
              </div>
            <div class="break" >
            </div>
            <div
              class="search-container left"
              style="height:420px;overflow:auto;width:239px;margin:0;border-left:none;border-bottom:none;padding:12px;border-top:none;"
            >
              <el-tree
                :data="treeData"
                show-checkbox
                node-key="id"
                ref="tree"
                :check-on-click-node="true"
                :check-strictly="true"
                @check="gettreeData"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps"
                style="background:#DCD9D3"
              ></el-tree>
            </div>

            <div class="left" style="position: relative;">
              <div class="left content">  
                <div class="left" v-for="(item,index) in tableData" :key="item.id" style="width: 100%;">
                  <p style="padding-top:10px;color:#999999;padding-left: 10px;">{{item.title}}</p>
                  <div class="clear">
                    <el-checkbox-group v-model="choosePersonIds">
                      <div v-for="(i,cindex) in item.person">
                        <div class="left" v-if="i.yesORno=='yes'">
                          <el-checkbox 
                            disabled
                            :checked=true
                            :label="i.id" 
                            :key="i.id"
                            @change="checkbox(i.id,i.checked,index,cindex)"
                          >
                            <span  style="color: #00cc66;">{{i.name}}</span>
                          </el-checkbox>
                        </div>
                        <div class="left" v-else-if="i.state=='正式离职'" >
                          <el-checkbox 
                            :label="i.id" 
                            :key="i.id"
                            @change="checkbox(i.id,i.checked,index,cindex)"
                          >
                            <span  style="color: #999999;">{{i.name}}</span>
                        </el-checkbox>
                        </div>
                        <div class="left" v-else>
                          <el-checkbox
                            :label="i.id" 
                            :key="i.id"
                            @change="checkbox(i.id,i.checked,index,cindex)"
                          >
                            <span  style="color: #333333;">{{i.name}}</span>
                          </el-checkbox>
                        </div>
                      </div>
                    </el-checkbox-group>
                  </div>
                  <div class="break"></div>
                </div>
                
              </div>
              
            </div>
            
          </el-form>
          <div style="width: 490px;position: absolute;bottom: 0px;right:0;">
            <div style="height: 20px;line-height: 20px;">
              <div style="width: 12px;height: 12px;background: rgba(0, 204, 102, 1);margin-right: 5px;display: inline-block;"></div>
              <span>该月已生成工资</span>
            </div>
            <div style="height: 20px;line-height: 20px;">
              <div style="width: 12px;height: 12px;background: rgba(153, 153, 153, 1);margin-right: 5px;display: inline-block;"></div>
              <span>正式离职</span>
            </div>
            <div style="height: 20px;line-height: 20px;">
              <div style="width: 12px;height: 12px;background: rgba(51, 51, 51, 1);margin-right: 5px;display: inline-block;"></div><span>常态在职，薪假在职，停薪在职，申离在职</span> <span style="float: right;margin-right: 15px;">总共 : {{choosePersonIds.length}} 人</span>
            </div>
          </div>
        </div>

        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
          <!-- <el-checkbox class="right" style="margin:0px 30px 0 0;" @change='chooseAllPersson'>全选</el-checkbox> -->
          <el-checkbox class="right" style="margin:0px 30px 0 0;"   v-model="checkAll" @change="chooseAllPersson">全选</el-checkbox>
        </div>
      </div>

  </div>
</template>

<script>
import { odeparttree } from "../../../service/organizeDate";
import { userSalaryInsert,userSalaryGetUserList } from "../../../service/SalaryDetails"
import CheckSelect from "../../../components/check";
import { debounce } from "../../../utils/myself";
import {
  onleyInsert,
  allInsert
} from "../../../service/attendData";

export default {
  props:['layerid'],
  data() {
    return {
      vm: this,
      checkAll: false,
      treeData:[],
      totalcheckednum:0,
      Arrlength:[],
      departName: "",
      lastTime:0,
      defaultProps: {
        children: "children",
        label: "label"
      },
      choosePersonIds:[],
      formIM:{
        state:"常态",
        name:'',
        type:'主'
      },
      formNA:{
        time:'',
        userIds:'',
      },
      userId:[],
      tableData:[],
      myhaveUserIds:[],
    };
  },
  components: {
    CheckSelect
  },
  methods: {
    datechangefunc(){
      this.$refs.tree.setCheckedKeys([]);
      this.tableData = [];
      this.choosePersonIds = [];
    },
    checkbox(val,checked,index,cindex){
      if(checked==false){
        if(this.Arrlength.length == this.choosePersonIds.length){
          this.checkAll = true;
        }else{
          this.checkAll = false;
        }
        this.tableData[index].person[cindex].checked=true;
        
      }else{
        checked=false
        this.checkAll = false;
        this.tableData[index].person[cindex].checked=false;

        for(var i=0; i < this.choosePersonIds.length; i++){
          if(this.choosePersonIds[i] == val){ 
            let num = this.choosePersonIds.splice( i, 1 ); 
          }
        }
      }
    },
    chooseAllPersson(val){
      
      if(this.checkAll==true){
        this.choosePersonIds = [];
        this.checkAll=true;
        this.tableData.forEach(item=>{
          item.person.forEach(el=>{
            this.choosePersonIds.push(el.id);
            el.checked = true;
          })
        })
      }else{
        this.choosePersonIds = [];
        this.checkAll=true;
        this.checkAll=false;
        this.tableData.forEach(item=>{
          item.person.forEach(el=>{
            if(this.myhaveUserIds.indexOf(el.id)!=-1){
              el.checked = true;
              this.choosePersonIds.push(el.id);
            }else{
              el.checked = false;
            }
            
          })
        })
      }
      
    },
    mydebounce: debounce((vm) => {
      let _this = vm;
      _this.$refs.tree.setCheckedKeys([]);
      _this.tableData = [];
      _this.choosePersonIds = [];
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      odeparttree("常态","主",'',_this.formIM.name).then( (res) =>{
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          if(res.data){
            res.data.forEach(item=>{
              item.label = item.label.replace(/&nbsp;/g, "");
            })
          }
          _this.treeData= res.data;
        } else if (res.status === 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      })
      },500,true
    ),
    querySearchAsync(){
      let now = new Date();

      this.lastTime = now;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      odeparttree("常态","主",'',this.formIM.name).then( (res) =>{
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          this.treeData=res.data;
        } else if (res.status === 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
        console.log('adsa');
      })
    },
    gettreeData(val, ss){
      let _this = this;
      let id="";
      if(val.id){
       id=val.id
      }else{
        id=val
      }
      if(_this.formNA.time==''){
        _this.myAlert("日期不能为空!", "dangerous-icon");
        this.$refs.tree.setCheckedKeys([]);
        return false;
      };
      let dataform = {
        id:id,
        time:_this.formNA.time,
      }
      let filterArr = _this.tableData.filter((item)=>item.departmentId!=val.id);
      if(filterArr.length==_this.tableData.length){
        
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        userSalaryGetUserList(dataform).then( (res)=> {
          _this.$layer.closeAll('loading');
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            if(res.data.users){
              _this.checkAll = false;
              let nameArr=[];
              if(res.data.haveUserIds){
                _this.myhaveUserIds = res.data.haveUserIds;
              }
              _this.totalcheckednum = _this.myhaveUserIds.length;
              res.data.users.forEach(item1=>{
                _this.Arrlength.push(item1.id);
                if(res.data.haveUserIds.indexOf(item1.id)==-1){
                  nameArr.push({
                    name:item1.name,
                    id:item1.id,
                    checked:false,
                    state:item1.paramName,
                    yesORno:'no'
                  });
                }else{
                  nameArr.push({
                    name:item1.name,
                    id:item1.id,
                    checked:false,
                    state:item1.paramName,
                    yesORno:'yes'
                  });
                }
              });
              
              _this.tableData.push({
                title:res.data.users[0].departName,
                person:nameArr,
                departmentId:val.id
              })
            }
          } else if (res.status === 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
          _this.checkAll = false;
          
        })

      }else{
        console.log('222');
        _this.tableData = filterArr;
        if(_this.checkAll == true){
          _this.checkAll = true;
          _this.Arrlength = [];
          _this.choosePersonIds = [];
          _this.tableData.forEach(item=>{
            item.person.forEach(el=>{
              _this.choosePersonIds.push(el.id);
              _this.Arrlength.push(el.id);
            })
          })
        }else{
          _this.checkAll = false;
          _this.Arrlength = [];
          _this.tableData.forEach(item=>{
            item.person.forEach(el=>{
              _this.Arrlength.push(el.id);
            })
          })
        }
        console.log(_this.Arrlength.length,_this.choosePersonIds.length);
      }
    },

    saveFormData(){
      let _this = this;
      if(_this.formNA.time==''){
        _this.myAlert("日期不能为空!", "dangerous-icon");
        return false;
      };

      let mythisids = [];
      _this.choosePersonIds.forEach(item=>{
        mythisids.push(item)
      });
      for (let i = 0; i < _this.myhaveUserIds.length; i++) {
        for (let j = 0; j < mythisids.length; j++) {
           if(_this.myhaveUserIds[i] == mythisids[j]){
              mythisids.splice(j,1);
            }
        }
      }
      if(mythisids.length==0){
        _this.myAlert("请选择人员!", "dangerous-icon");
        return false;
      };
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      _this.formNA.userIds = mythisids.toString();
      
      userSalaryInsert(_this.formNA).then(res => {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          _this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              _this.$parent.searchSalaryDetailsList();
              _this.clearFormData();
            })
            .catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      })
    },
    clearFormData() {
      this.$layer.close(this.layerid);
    }
  },
  mounted() {
   this.querySearchAsync();
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
  /deep/ .el-checkbox__label {
      font-size: 12px;
      margin-right:20px;
  }
  .content {
    height:300px;
    width: 500px;
    position: relative;
    padding: 0px 20px 20px 20px;
    overflow-y: auto;
  }
</style>
<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>