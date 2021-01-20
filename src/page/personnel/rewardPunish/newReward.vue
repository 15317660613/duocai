<template>
  <div class="" >

      <div class="pop-up" style="width: 778px;margin: 0 10px;height: 510px;padding: 5px 10px;" >
        <el-tabs type="border-card" v-model="getActiveName" @tab-click="changeTab">
          <el-tab-pane label="单独新增奖罚" name="single">
            <span slot="label">单独新增奖罚</span>

            <div class="search-container" style="height:447px;overflow:auto;margin: 0px;width: 100%;">
              <el-form ref="formsData" :model="form">
                <div class="clear" style="padding-top:30px;">
                  <div class="left" style="padding-left:34px">
                    <span class="des-word require-word">奖罚人员</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="departId" >
                      <el-select @change="finUserState"  v-model="form.departId"    style="width:120px;" >
                        <el-option  v-for="item in executorList"  :label="item.name" :value="item.id">
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-l-2">
                    <el-form-item label label-width="0" prop="userId">
                      <el-select v-model="form.userId" style="width:100px;">
                        <template v-for="item in userList">
                            <el-option v-if="item.paramName=='正式离职'" :label="item.name" :value="item.id" style="width:100px;color: #999;"></el-option>
                            <el-option v-else :label="item.name" :value="item.id" style="width:100px;"></el-option>
                        </template>
                        
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2">
                    <el-checkbox
                      v-model="form.rewardChecked"
                      @change="finUserState"
                      class="left"
                      style="padding:3px 0 0 10px;"
                    ></el-checkbox>
                    <span class="left" style="padding:3px 0 0 5px;">显示离职人员</span>
                  </div>
                   <div class="left" style="padding-left:41px">
                    <span class="des-word require-word">奖罚年月</span>
                  </div>
                  <div class="left padding-l-2">
                    <el-form-item label label-width="0" prop="time">
                      <el-date-picker
                        size="mini"
                        type="month"
                        v-model="form.time"
                        value-format="yyyy-MM"
                        style="width: 91px;"
                      ></el-date-picker>
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
                        v-model="form.type"
                        @change="changetypefunc"
                        
                        style="width:120px;"
                      >
                        <el-option v-for="item in typelist" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-l-2">
                    <el-form-item label label-width="0" prop="typeParam">
                      <el-select v-model="form.typeParam"  style="width:100px;">
                        <el-option v-for="item in typeParams" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                   <div class="left" style="padding-left:143px">
                    <span class="des-word require-word">奖罚金额</span>
                  </div>
                  <div class="left">
                    <el-form-item label label-width="0" prop="punishNum">
                       <el-input
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
                          type="textarea"
                          :rows="7"
                          style="width:532px;padding-top:9px;"
                          title="上限500个字"
                          :maxlength="500"
                          v-model="form.punishReason"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
              </el-form>
            </div>
            <div style="margin-top:5px">
              <span
                class="right save-cancel-btn"
                style="margin-right:11px;padding: 2.4px 32px;"
                @click="cancelData"
              >取 消</span>
              <span
                class="right save-cancel-btn"
                style="padding: 2.4px 32px;"
                type="primary"
                @click="saveOnley"
              >保 存</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="批量新增奖罚" name="many">
            <span slot="label">批量新增奖罚</span>
            <div class="pop-up-container" style="height:447px;overflow-y:auto;overflow-x:hidden;position: relative;margin: 0px;" >
              <el-form ref="formsData"  :model="formNA" >
                <div class="clear" >
                  <div class="left center-fundation"  >
                    <div class="clear" >
                      <div class="left" >
                        <el-form-item  prop="projectName" style="height: 30px;margin: 3px 0 0 30px;">
                          <el-input  style="width: 120px;" v-model.trim="formIM.name"  maxlength="10"  title="部门名称"   autocomplete="off" @input="mydebounce(vm)"></el-input>
                        </el-form-item>
                      </div>
                      <div class="left" style="padding:3px 0 0 20px">
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
                      <div class="left" style="padding-left:20px;padding-top: 3px;">
                        <span class="des-word require-word">奖罚</span>
                      </div>
                      <div class="left"  style="padding-top:5px">
                        <el-form-item label label-width="0">
                          <el-select
                            v-model="formNA.type"
                            @change="changetypefunc1"
                            style="width:80px;"
                          >
                            <el-option v-for="item in typelist" :label="item.name" :value="item.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="left padding-l-2"  style="padding-top:5px">
                        <el-form-item label label-width="0" prop="typeParam">
                          <el-select v-model="formNA.typeParam" style="width:80px;">
                            <el-option v-for="item in typeParams1" :label="item.name" :value="item.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="left" style="padding-left:20px;padding-top: 3px;">
                        <span class="des-word require-word" style="width: 65px;">奖罚金额</span>
                      </div>
                      <div class="left" style="padding-top:5px">
                        <el-form-item  style="height: 30px;">
                          <el-input  style="" v-model.trim="formNA.punishNum"  maxlength="10"  title="上限10位数"   autocomplete="off" style="width:80px;"></el-input>
                        </el-form-item>
                      </div>
                      <div class="left" style="padding-top: 10px;">
                        <span>元</span>
                      </div>
                    </div>


                  </div>
                  </div>
                <div class="break" >
                </div>
                <div
                  class="search-container left"
                  style="height:380px;overflow:auto;width:239px;margin:0;border-left:none;border-bottom:none;padding:12px;border-top:none;"
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
                            <div class="left" v-if="i.state=='正式离职'" >
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
              <div style="width: 480px;position: absolute;bottom: 0px;right:0;">
                <div style="height: 20px;line-height: 20px;">
                  <div style="width: 12px;height: 12px;background: rgba(153, 153, 153, 1);margin-right: 5px;display: inline-block;"></div>
                  <span>正式离职</span>
                </div>
                <div style="height: 20px;line-height: 20px;">
                  <div style="width: 12px;height: 12px;background: rgba(51, 51, 51, 1);margin-right: 5px;display: inline-block;"></div><span>常态在职，薪假在职，停薪在职，申离在职</span> <span style="float: right;margin-right: 15px;">总共 : {{choosePersonIds.length}} 人</span>
                </div>
              </div>
            </div>

            <div  style="margin-top:5px">
              <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
              <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
              <!-- <el-checkbox class="right" style="margin:0px 30px 0 0;" @change='chooseAllPersson'>全选</el-checkbox> -->
              <el-checkbox class="right" style="margin:3px 10px 0 0;"   v-model="checkAll" @change="chooseAllPersson">全选</el-checkbox>
            </div>
          </el-tab-pane>
          
        </el-tabs>
      </div>

  </div>
</template>

<script>
import { odeparttree, findUserByDepartId } from "../../../service/organizeDate";
import { rewardInserts,rewardGetUserList,rewardgetparams,rewardInsert } from "../../../service/rewardData"
import CheckSelect from "../../../components/check";
import { debounce } from "../../../utils/myself";
export default {
  props:['layerid'],
  data() {
    return {
      vm: this,
      getActiveName:'single',
      activeTag1:true,
      activeTag2:false,
      executorList: [],
      userList: [],
      typelist:[],
      typeParams:[],
      typeParams1:[],
      typeParamsAll:[],
      treeData:[],
      checked:false,
      departName: "",
      form: {
        userId: "",
        departId: "",
        time:"",
        punishReason:"",
        punishNum:"",
        rewardChecked:false,
        type:"",
        typeParam:"",
      },


      checkAll: false,
      isIndeterminate:true,
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
        type:'',
        typeParam:'',
        punishNum:'',
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

    getParams() {
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      rewardgetparams().then(res => {
        this.$layer.closeAll("loading");
        if (res.status === 500) {
          return false;
        } else if (res.status === 0) {
          let data = res.data;
          if (data.departTree) {
            let arr = [{ id: "-1", name: "全部", select: true }]
            let mydepartData = data.departTree;
            for (let i = 0; i < mydepartData.length; i++) {
              arr.push({
                id: mydepartData[i].id,
                name: mydepartData[i].label.replace(/&nbsp;/g, ""),
                level: mydepartData[i].level,
                select: false,
                state:mydepartData[i].state,
              });
            }
            this.executorList = arr;
            this.form["departId"] = "-1";
            this.userList = [{ id: "-1", name: " ", select: true }];
            this.form["userId"] = "-1";
          }
          if (data.typeParams) {
            let addentObject = data.typeParams;
            let arr = [{ id: "-1", name: "  ", select: true }];
            let arr1 = [{ id: "-1", name: "  ", select: true }];
            addentObject.forEach(item => {
              arr.push({
                id: item.id,
                name: item.name,
                select: item.select
              });
              if(item.children){
                item.children.forEach(ii=>{
                  arr1.push({
                    id:ii.id,
                    name:ii.name.replace(/&nbsp;/g,""),
                    select:false,
                    parentId:item.id,
                  })
                })
              }
              
            });
            this.typelist = arr;
            this.typeParamsAll = arr1;
            this.typeParams = [{ id: "-1", name: "  ", select: true }];
            this.form.type = "-1";
            this.form.typeParam = "-1";
          }
        }
      });
    },
    changetypefunc(){
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
    changetypefunc1(){
      let _this = this;
      let arr = [{ id: "-1", name: "  ", select: true }];
      _this.formNA.typeParam = '';
      _this.typeParamsAll.forEach(item=>{
        if(item.parentId==_this.formNA.type){
          arr.push(item);
        }
      })
      _this.typeParams1 = arr;
    },
    saveOnley() {
      let _this = this;
      let form = JSON.parse(JSON.stringify(this.form));
      if(form.departId=='-1'){
        _this.myAlert("部门不能为空!", "dangerous-icon");
        return false;
      };
      if(form.userId=='-1'){
        _this.myAlert("人员不能为空!", "dangerous-icon");
        return false;
      };
      if(form.time==''||form.time==null){
        _this.myAlert("奖罚年月不能为空!", "dangerous-icon");
        return false;
      };
      if(form.type=='-1'){
        _this.myAlert("奖罚类型不能为空!", "dangerous-icon");
        return false;
      };
      if(form.typeParam=='-1'||form.typeParam==''){
        _this.myAlert("奖罚类型不能为空!", "dangerous-icon");
        return false;
      };
      
      if(form.punishNum==''){
        _this.myAlert("奖罚金额不能为空!", "dangerous-icon");
        return false;
      };

      _this.$layer.loading({
        shade: true //是否显示遮罩
      });
      
      rewardInsert(form).then(res => {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {    
          return false;
        } else if (res.status === 0) {
          _this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              _this.$parent.getTableData();
              _this.cancelData();
            })
            .catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    finUserState() {
      let _this = this;
      let id = this.form.departId;
      let thisshowLeave;
      let form = {
        id,
        isSelect:1,
        flag:3
      }
      if(_this.form.rewardChecked) {
        form.showLeave = 1;
      };
      
      findUserByDepartId(form).then(function (response) {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let user = data.user;
          let arr = [{id:'-1',name:' ',select:true}];
          if(user && user.length != 0){
            user.forEach(function(item){
              if(item.doBusiness == 1 ) {
                arr.push({
                  id: item.id,
                  name: item.name.replace(/&nbsp;/g,""),
                  select:false,
                  paramName:item.paramName
                })
              }
            })
          }
          _this.userList =  arr;

          _this.form.userId = '-1';

        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      })
    },
    
    cancelData() {
      this.$layer.close(this.layerid);
    },


    changeTab(){
      if(this.getActiveName=="many"&&this.activeTag2==false){
        this.querySearchAsync();
        this.activeTag2=true;
      };
    },
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
      this.totalcheckednum = this.choosePersonIds.length;
      console.log(this.choosePersonIds);
    },
    chooseAllPersson(val){
      this.choosePersonIds = [];
      if(this.checkAll==true){
        this.checkAll=true;
        this.isIndeterminate = false;
        this.tableData.forEach(item=>{
          item.person.forEach(el=>{
            this.choosePersonIds.push(el.id);
            el.checked = true;
          })
        })
      }else{
        this.checkAll=false;
        this.isIndeterminate = true;
        
        this.tableData.forEach(item=>{
          item.person.forEach(el=>{
            el.checked = false;
          })
        })
      }
      this.totalcheckednum = this.choosePersonIds.length;
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
      this.$refs.tree.setCheckedKeys([]);
      this.tableData = [];
      this.choosePersonIds = [];
      this.lastTime = now;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      odeparttree("常态","主",'',this.formIM.name).then( (res) =>{
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          if(res.data){
            res.data.forEach(item=>{
              item.label = item.label.replace(/&nbsp;/g, "");
            })
          }
          this.treeData= res.data;
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
        // type:_this.formNA.type,
      }
      let filterArr = _this.tableData.filter((item)=>item.departmentId!=val.id);
      if(filterArr.length==_this.tableData.length){
        
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        rewardGetUserList(dataform).then( (res)=> {
          _this.$layer.closeAll('loading');
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            if(res.data.users){
              _this.checkAll = false;
              let nameArr=[];
              _this.choosePersonIds = _this.choosePersonIds;
              if(res.data.haveUserIds){
                _this.myhaveUserIds = res.data.haveUserIds;
              }
              res.data.users.forEach(item1=>{
                _this.Arrlength.push(item1.id);
                nameArr.push({
                  name:item1.name,
                  id:item1.id,
                  checked:false,
                  state:item1.paramName,
                });
                
              });
              if(res.data.users.length!=0){
                _this.tableData.push({
                  title:res.data.users[0].departName,
                  person:nameArr,
                  departmentId:val.id
                })
              }
              
              console.log( _this.tableData);
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
      if(_this.formNA.type==''||_this.formNA.type=='-1'){
        _this.myAlert("奖罚类型不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.formNA.typeParam==''||_this.formNA.typeParam=='-1'){
        _this.myAlert("奖罚类型不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.formNA.punishNum==''){
        _this.myAlert("奖罚金额不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.choosePersonIds.length==0){
        _this.myAlert("请选择人员!", "dangerous-icon");
        return false;
      };
      console.log(_this.form);
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      for (let i = 0; i < _this.myhaveUserIds.length; i++) {
        for (let j = 0; j < _this.choosePersonIds.length; j++) {
           if(_this.myhaveUserIds[i] == _this.choosePersonIds[j]){
              _this.choosePersonIds.splice(j,1);
            }
        }
      }
      _this.formNA.userIds = _this.choosePersonIds.toString();
      rewardInserts(_this.formNA).then(res => {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          _this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              _this.$parent.getTableData();
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
    }, 
  },
  mounted() {
   this.getParams();
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
    'formNA.punishNum':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.formNA.punishNum = undefined;
          return;
        }
        this.formNA.punishNum = oldval
      } else {
        this.formNA.punishNum = newval.replace(/^\./g, "")
      }
    },
    
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
    height:330px;
    width: 494px;
    position: relative;
    padding: 0px 20px 20px 20px;
    overflow-y: auto;
  }
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
<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>