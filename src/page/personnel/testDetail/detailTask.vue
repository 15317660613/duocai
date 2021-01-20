<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="padding:0 0 29px 0">
      <div class="search-container" style="height:458px;overflow:auto">
        <el-form ref="formsData" :model="form">
          <div class="clear">
            <div class="left" style="padding-left:40px">
              <span class="des-word require-word">规划</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0">
                <el-select v-model="form.taskTimeYear" style="width:100px;">
                  <el-option v-for="item in yearParam" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.taskTimeMonth" style="width:100px;">
                  <el-option v-for="item in mounths" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-10">
              <span class="des-word require-word">执行人</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0">
                <el-select
                  @change="finUserState"
                  v-model="form.departId"
                  style="width:100px;"
                >
                  <el-option v-for="item in executorList" :label="item.name" :value="item.id">
                    <span test  :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}">
                      <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                      <span v-if="item.state=='常态'">{{item.name}}</span>
                    </span>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.userId"  style="width:100px;">
                  <el-option v-for="item in userParams" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:40px">
              <span class="des-word require-word">常报</span>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.reportOneId"  style="width:100px;">
                  <el-option v-for="item in reportOneList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.reportTwoId"  style="width:100px;">
                  <el-option v-for="item in reportTwoList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.reportThreeId"  style="width:100px;">
                  <el-option v-for="item in reportThreeList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left" style="padding-left:19px">
              <span class="des-word require-word">序号</span>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.num"  style="width:100px;">
                  <el-option v-for="item in nums" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:40px">
              <span class="des-word require-word">类别</span>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.taskTypeOne" style="width:50px;" @change='taskTypeOnechange'>
                  <el-option v-for="item in taskTypeOneList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-input disabled v-model.trim="form.taskTypeOneRemark" style="width:100px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.taskTypeTwo"  style="width:50px;" @change='taskTypeTwochange'>
                  <el-option v-for="item in taskTypeTwoList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-input disabled v-model.trim="form.taskTypeTwoRemark" style="width:100px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.taskTypeThree"  style="width:50px;" @change='taskTypeThreechange'>
                  <el-option v-for="item in taskTypeThreeList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-input disabled v-model.trim="form.taskTypeThreeRemark" style="width:100px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:22px">
              <span class="des-word">任务状态</span>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.taskState" @change="taskChange"  style="width:100px;">
                  <el-option  v-for="item in taskStateList" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left" style="padding-left:54px">
              <span class="des-word">完成状态</span>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0">
                <el-select v-model="form.finishState"  style="width:100px;">
                  <el-option :disabled="item.disabled" v-for="item in finishStates" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-r-2">
              <el-checkbox v-model="form.taskStrategy" class="left" style="padding:3px 0 0 56px;"></el-checkbox>
              <span class="left" style="padding:3px 0 0 5px;">战略任务</span>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:14px">
              <span class="des-word require-word">任务概念</span>
            </div>
            <div class="left padding-r-2">
              <el-form-item>
                <el-input
                  v-model="form.taskConcept"
                  style="width:462px;margin-top:7px;"
                  type="textarea"
                  :rows="2"
                  title="上限100个字"
                  min-height="150px"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:21px">
              <span class="des-word">任务备注</span>
            </div>
            <div class="left padding-r-2" v-watermark="{text:'水印名称',textColor:'rgba(180, 180, 180, 0.3)'}">
              <el-form-item >
                <el-input
                  v-model="form.remark"
                  style="width:462px;margin-top:7px; "
                  type="textarea"
                  title="上限500个字"
                  :rows="3"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:21px">
              <span class="des-word">执行方略</span>
            </div>
            <div class="left padding-r-2">
              <el-form-item>
                <el-input
                  v-model="form.executeRecord"
                  style="width:462px;margin-top:7px; "
                  type="textarea"
                  title="上限500个字"
                  :rows="3"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="padding-left:21px">
              <span class="des-word">灵感记录</span>
            </div>
            <div class="left padding-r-2">
              <el-form-item >
                <el-input
                  v-model="form.taskRecord"
                  style="width:462px;margin-top:7px; "
                  type="textarea"
                  title="上限500个字"
                  :rows="3"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div style="padding-top:5px">
        <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-left: 10px;" >
          <div class="left" style="padding-right:7px;"  >
            <i class="up-page-icon" @click="upPage($event)" ></i>
          </div>
          <div class="left" >
            <i class="down-page-icon" @click="downPage($event)" ></i>
          </div>
        </div>
        <span class="right save-cancel-btn" style="margin-right:9px;padding: 2.4px 32px;" @click="cancelData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="savetBonus">保 存</span>
         <div class="right foot-btn" style="padding:0px;border-width:0px;margin-right:10px;" >
            <i class="file-icon"  @click="isShowPhotoAndFile"  ></i>
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
import {
  taskgetparams,
  detailTask,
  updateTask
} from "../../../service/testDetailData";
import { testParam } from "../../../utils/testDetailParam";
import {findUserByDepartId} from "../../../service/organizeDate";
 import {getFilesList5,deletedFiles5,uploadFiles5,updateFileName5} from '../../../service/fileData'
		
  import FilePage from '../../../components/file'
export default {
  props: ["myid","layerid","mythisindex"],
  data() {
    return {
      yearParam: [],
      thisindex:this.mythisindex,
      mounths: [],
      id:this.myid,
      userParams: [],
      executorList: [],
      reportOneList: [],
      reportTwoList: [],
      reportThreeList: [],
      taskStateList: [],
      taskTypeOneList: [],
      taskTypeTwoList: [],
      taskTypeThreeList: [],
      finishStates: [],
      
      taskTypeOneRemarkList:[{
        id:1,
        name:"核心主线与阶段重点",
        select:false
      }],
      taskTypeTwoRemarkList:[{
        id:1,
        name:"核心主线与阶段重点",
        select:false
      }],
      taskTypeThreeRemarkList:[{
        id:1,
        name:"核心主线与阶段重点",
        select:false
      }],
      nums: [],
      form: {
        taskTypeOneName:'',
      }
    };
  },
  components:{
    FilePage
  },
  methods: {
    isShowPhotoAndFile(){
      // this.$refs.FilePageId.showDialogVisible();
      let _this = this;
      let test = _this.$layer.iframe({
        content: {
          content: FilePage, //传递的组件对象
          parent: this,//当前的vue对象
          data:{
            recordId:_this.id,
            getFilesByType:getFilesList5,
            deleteFiles:deletedFiles5,
            uploadFiles:uploadFiles5,
            updateFileName:updateFileName5,
              downLoadFiles:'/userConceptTask/downloadReFiles',
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
    getDetailsData() {
      let myform = {
        id:this.id
      };
      detailTask(myform).then(res => {
        if (res.status == 500) {
          return false;
        } else if (res.status == 0) {
          let data = res.data;
          if(data.params.years){
            let arr = [{ id: "", name: "  ", select: true }];
            let taskyears = data.params.years;
            for (let i = 0; i < taskyears.length; i++) {
              arr.push({
                id: taskyears[i].id,
                name: taskyears[i].name,
                select: taskyears[i].select
              });
            }
            this.yearParam = arr;
          }
          if (data.params.taskTimeMonthParams) {
            let arr = [{ id: "", name: "  ", select: true }];
            let taskTimeMonth = data.params.taskTimeMonthParams;
            for (let i = 0; i < taskTimeMonth.length; i++) {
              arr.push({
                id: taskTimeMonth[i].id,
                name: taskTimeMonth[i].name,
                select: taskTimeMonth[i].select
              });
            }
            this.mounths = arr;
          }

          if (data.params.departTree) {

            let arr = [{ id: "-1", name: "全部", select: true }]
            let mydepartData = data.params.departTree;
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
          }

          if (data.users) {
            let arr = [{ id: "", name: "  ", select: true }];
            let usersData = data.users;
            usersData.forEach(function(item){
              
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
            this.userParams = arr;
          }
          if (data.params.numParams) {
            let arr = [{ id: "", name: "  ", select: true }];
            let num = data.params.numParams;
            for (let i = 0; i < num.length; i++) {
              arr.push({
                id: num[i].id,
                name: num[i].name,
                select: num[i].select
              });
            }
            this.nums = arr;
          }
          if (data.params.reportOneIdParams) {
            let arr = [{ id: "", name: "  ", select: true }];
            let reportOne = data.params.reportOneIdParams;
            for (let i = 0; i < reportOne.length; i++) {
              arr.push({
                id: reportOne[i].id,
                name: reportOne[i].name,
                select: reportOne[i].select
              });
            }
            this.reportOneList = arr;
          }
          if (data.params.reportTwoIdParams) {
            let arr = [{ id: "", name: "  ", select: true }];
            let reportTwo = data.params.reportTwoIdParams;
            for (let i = 0; i < reportTwo.length; i++) {
              arr.push({
                id: reportTwo[i].id,
                name: reportTwo[i].name,
                select: reportTwo[i].select
              });
            }
            this.reportTwoList = arr;
          }
          if (data.params.reportThreeIdParams) {
            let arr = [{ id: "", name: "  ", select: true }];
            let reportThree = data.params.reportThreeIdParams;
            for (let i = 0; i < reportThree.length; i++) {
              arr.push({
                id: reportThree[i].id,
                name: reportThree[i].name,
                select: reportThree[i].select
              });
            }
            this.reportThreeList = arr;
          }

          if (data.params.taskStateParams) {
            let arr = [{ id: "", name: "  ", select: true }];
            let taskState = data.params.taskStateParams;
            for (let i = 0; i < taskState.length; i++) {
              arr.push({
                id: taskState[i].id,
                name: taskState[i].name,
                select: taskState[i].select
              });
            }

            this.taskStateList = arr;
          }
          if (data.params.finishStateParams) {
            let arr = [];
            let finishId = data.params.finishStateParams;
            for (let i = 0; i < finishId.length; i++) {
              arr.push({
                id: finishId[i].id,
                name: finishId[i].name,
                select: finishId[i].select
              });
            }
            this.finishStates = arr;
          }
          if (data.params.finishStateParams) {
            let arr = [];
            let finishId = data.params.finishStateParams;
            finishId.forEach(ii=>{
              if(ii.name=='已申请'||ii.name=='已完成'||ii.name=='已失败'||ii.name=='已暂停'){
                arr.push({
                  id: ii.id,
                  name: ii.name,
                  select: ii.select,
                  disabled:true
                });
              }else{
                arr.push({
                  id: ii.id,
                  name: ii.name,
                  select: ii.select,
                  disabled:false
                });
              }
            })
            this.finishStates = arr;
            this.finishStates.forEach(item=>{
              if(item.name=='未完成'){
                this.form.finishState = item.id;
              }
            })
          }

          if (data.params.taskTypeOneParams) {
            let arr = [{ id: "", name: "  ", select: true }];
            let taskTypeOne = data.params.taskTypeOneParams;
            for (let i = 0; i < taskTypeOne.length; i++) {
              arr.push({
                id: taskTypeOne[i].id,
                name: taskTypeOne[i].name,
                select: taskTypeOne[i].select,
                remark:taskTypeOne[i].remark,
              });
            }
            this.taskTypeOneList = arr;
          }
          if (data.params.taskTypeTwoParams) {
            let arr = [{ id: "", name: "  ", select: true }];
            let taskTypeTwo = data.params.taskTypeTwoParams;
            for (let i = 0; i < taskTypeTwo.length; i++) {
              arr.push({
                id: taskTypeTwo[i].id,
                name: taskTypeTwo[i].name,
                select: taskTypeTwo[i].select,
                remark:taskTypeTwo[i].remark,
              });
            }
            this.taskTypeTwoList = arr;
          }
          if (data.params.taskTypeThreeParams) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let taskTypeThree = data.params.taskTypeThreeParams;
            for (let i = 0; i < taskTypeThree.length; i++) {
              arr.push({
                id: taskTypeThree[i].id,
                name: taskTypeThree[i].name,
                select: taskTypeThree[i].select,
                remark:taskTypeThree[i].remark,
              });
            }
            this.taskTypeThreeList = arr;
          }
          this.form = data.task;
          // let thismydata = data.task;
          // for(let attr in thismydata){
          //   if(thismydata[attr] != null){
          //     this.form[attr] =  thismydata[attr];
          //   }
          // }
          if(this.form.taskStrategy){
            this.form.taskStrategy = true;
          }else{
            this.form.taskStrategy = false;
          }
          this.taskChange(this.form.taskState);
        } else if (res.status == 1) {
          let message = response.msg;
          this.myAlert(message + "！");
        }
      });
    },
    savetBonus() {
      let _this = this;
      if (!_this.form.taskTimeYear) {
        _this.myAlert("规划年不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.taskTimeMonth) {
        _this.myAlert("规划月不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.departId) {
        _this.myAlert("部门不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.userId) {
        _this.myAlert("人员不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.reportOneId) {
        _this.myAlert("常报不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.reportTwoId) {
        _this.myAlert("常报不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.reportThreeId) {
        _this.myAlert("常报不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.num) {
        _this.myAlert("序号不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.taskTypeOne) {
        _this.myAlert("类别不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.taskTypeTwo) {
        _this.myAlert("类别不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.taskTypeThree) {
        _this.myAlert("类别不能为空", "dangerous-icon");
        return false;
      }
      if (!_this.form.taskConcept) {
        _this.myAlert("任务概念不能为空", "dangerous-icon");
        return false;
      }

      _this.$layer.loading({
        shade: true //是否显示遮罩
      });
      let form = JSON.parse(JSON.stringify(_this.form));
      if(form.taskStrategy){
        form.taskStrategy = 1;
      }else{
        form.taskStrategy = 0;
      }
      delete form.taskStateUser;
      delete form.finishStateUser;
      updateTask(form).then(res => {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status == 0) {
          this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              _this.$parent.getTableData();
              _this.cancelData();

            })
            .catch(err => {});
        } else if (res.statue == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    taskChange(val) {
      let _this = this;
      let taskName = '';
      let arr111 = [];
      _this.taskStateList.forEach(item=>{
        if(item.id == val){
          taskName = item.name;
        }
      });

      if(taskName=='未确认'||taskName == "已申请"){
        _this.finishStates.forEach(ii=>{
          if(ii.name=='已申请'||ii.name=='已完成'||ii.name=='已失败'||ii.name=='已暂停'){
            arr111.push({
              id:ii.id,
              name:ii.name,
              select:false,
              disabled:true
            })
          }else if(ii.name=='未完成'){
            arr111.push({
              id:ii.id,
              name:ii.name,
              select:true,
              disabled:false
            })
          }else{
            arr111.push({
              id:ii.id,
              name:ii.name,
              select:false,
              disabled:false
            })
          }
        }) 

      }else{
        _this.finishStates.forEach(ii=>{
          arr111.push({
            id:ii.id,
            name:ii.name,
            select:false,
            disabled:false
          })
        })
        
      }
      _this.finishStates = arr111;
      _this.finishStates.forEach(item=>{
        if(item.select){
          _this.form.finishState = item.id;
        }
      })
    },
    taskTypeOnechange(val){
      this.taskTypeOneList.forEach(item=>{
        if(item.id == val){
          this.form.taskTypeOneRemark = item.remark;
        }
      })
    },
    taskTypeTwochange(val){
      this.taskTypeTwoList.forEach(item=>{
        if(item.id == val){
          this.form.taskTypeTwoRemark = item.remark;
        }
      })
    },
    taskTypeThreechange(val){
      this.taskTypeThreeList.forEach(item=>{
        if(item.id == val){
          this.form.taskTypeThreeRemark = item.remark;
        }
      })
    },
    finUserState() {
      let _this = this;
      let id = this.form.departId;
      if (id) {
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let user = data.user;
            let arr = [{ id: "", name: "  ", select: true }];
            if (user && user.length != 0) {
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
            _this.userParams = arr;
            _this.form["userId"] = "";
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      }
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
        this.id = callbackdata.row.id;
        this.thisindex = callbackdata.thisindex;
        this.getDetailsData();
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
        this.id = callbackdata.row.id;
        this.thisindex = callbackdata.thisindex;
        this.getDetailsData();
      }, 
  },
  mounted() {
    this.getDetailsData();
  },
  beforeDestroy(){
    let _this = this;
    _this.$store.state.layerifranme.forEach((item,index)=>{
      if(item.thisrowid == _this.id){
        _this.$store.state.layerifranme.splice(index,1);
      }
    })
    _this.$parent.shadenum();
  },
};
</script>

<style lang="scss" scoped>
.require-word:before {
  content: "*";
  color: #f56c6c;
  margin-right: 1px;
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
/deep/ .el-textarea textarea{
  resize: none!important;
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