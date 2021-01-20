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
                <el-form-item label label-width="0" prop="taskTimeYear">
                  <el-select v-model="form.taskTimeYear"  style="width:100px;">
                    <el-option v-for="item in yearParam" style="width:100px;" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="taskTimeMonth">
                  <el-select v-model="form.taskTimeMonth"  style="width:100px;">
                    <el-option v-for="item in mounths" style="width:100px;" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-10">
                <span class="des-word require-word">执行人</span>
              </div>
              <div class="left">
                <el-form-item label label-width="0" prop="departId">
                  <el-select @change="finUserState" v-model="form.departId" style="width:100px;">
                    <el-option v-for="item in executorList" :label="item.name" :value="item.id">
                      <span test  :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5}">
                        <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                        <span v-if="item.state=='常态'">{{item.name}}</span>
                    </span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="userId">
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
                <el-form-item label label-width="0" prop="reportOneId">
                  <el-select v-model="form.reportOneId"  style="width:100px;">
                    <el-option v-for="item in reportOneList" style="width:100px;" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="reportTwoId">
                  <el-select v-model="form.reportTwoId"  style="width:100px;">
                    <el-option v-for="item in reportTwoList" style="width:100px;" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="reportThreeId">
                  <el-select v-model="form.reportThreeId"  style="width:100px;">
                    <el-option v-for="item in reportThreeList" style="width:100px;" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left" style="padding-left:19px">
                <span class="des-word require-word">序号</span>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="num">
                  <el-select v-model="form.num"  style="width:100px;">
                    <el-option v-for="item in nums" style="width:100px;" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="clear">
              <div class="left" style="padding-left:40px">
                <span class="des-word require-word">类别</span>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="taskTypeOne">
                  <el-select v-model="form.taskTypeOne"  style="width:50px;" @change='taskTypeOnechange'>
                    <el-option v-for="item in taskTypeOneList" style="width:50px;" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0">
                  <el-input disabled v-model.trim="form.taskTypeOneName" style="width:100px;" autocomplete="off"></el-input>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="taskTypeTwo">
                  <el-select v-model="form.taskTypeTwo"  style="width:50px;" @change='taskTypeTwochange'>
                    <el-option v-for="item in taskTypeTwoList" style="width:50px;" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0">
                  <el-input disabled v-model.trim="form.taskTypeTwoName" style="width:100px;" autocomplete="off"></el-input>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="taskTypeThree">
                  <el-select v-model="form.taskTypeThree"  style="width:50px;" @change='taskTypeThreechange'>
                    <el-option v-for="item in taskTypeThreeList" :label="item.name" :value="item.id" style="width:50px;"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0">
                  <el-input disabled v-model.trim="form.taskTypeThreeName" style="width:100px;" autocomplete="off"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="clear">
              <div class="left" style="padding-left:22px">
                <span class="des-word">任务状态</span>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="taskState">
                  <el-select
                    v-model="form.taskState"
                    @change="taskChange"
                    
                    style="width:100px;"
                  >
                    <el-option v-for="item in taskStateList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left" style="padding-left:54px">
                <span class="des-word">完成状态</span>
              </div>
              <div class="left padding-l-2">
                <el-form-item label label-width="0" prop="finishState">
                  <el-select v-model="form.finishState"  style="width:100px;">
                    <el-option :disabled="item.disabled" v-for="item in finishStates" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2">
                <el-checkbox v-model="form.taskChecked" class="left" style="padding:3px 0 0 56px;"></el-checkbox>
                <span class="left" style="padding:3px 0 0 5px;">战略任务</span>
              </div>
            </div>
            <div class="clear">
              <div class="left" style="padding-left:14px">
                <span class="des-word require-word">任务概念</span>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="taskConcept">
                  <el-input
                    v-model="form.taskConcept"
                    style="width:462px;margin-top:7px;"
                    type="textarea"
                    title="上限100个字"
                    :maxlength="100"
                    min-height="150px"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="clear">
              <div class="left" style="padding-left:21px">
                <span class="des-word">任务备注</span>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="remark">
                  <el-input
                    v-model="form.remark"
                    style="width:462px;margin-top:7px; "
                    type="textarea"
                    title="上限500个字"
                    :maxlength="500"
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
                <el-form-item prop="executeRecord">
                  <el-input
                    v-model="form.executeRecord"
                    style="width:462px;margin-top:7px; "
                    type="textarea"
                    title="上限500个字"
                    :rows="3"
                    :maxlength="500"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="clear">
              <div class="left" style="padding-left:21px">
                <span class="des-word">灵感记录</span>
              </div>
              <div class="left padding-r-2">
                <el-form-item prop="taskRecord">
                  <el-input
                    v-model="form.taskRecord"
                    style="width:462px;margin-top:7px; "
                    type="textarea"
                    title="上限500个字"
                    :maxlength="500"
                    :rows="3"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div style="padding-top:5px">
          <span class="right save-cancel-btn" style="margin-right:9px;padding: 2.4px 32px;" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" style="padding: 2.4px 32px;" type="primary" @click="savetBonus">保 存</span>
        </div>
      </div>
  </div>
</template>

<script>
import {
  taskgetparams,
  insertTask,
  taskList
} from "../../../service/testDetailData";
import { testParam } from "../../../utils/testDetailParam";
import {findUserByDepartId} from "../../../service/organizeDate";
export default {
  props: ["TaskShowNew",'layerid'],
  data() {
    return {
      yearParam: [],
      mounths: [],
      yearParam: testParam.yearParams,
      userParams: [],
      executorList: [],
      reportOneList: [],
      reportTwoList: [],
      reportThreeList: [],
      taskTypeOneList: [],
      taskTypeTwoList: [],
      taskTypeThreeList: [],
      taskStateList: [],
      nums: [],
      finishStates: [],
      form: {
        taskTimeYear: "",
        taskTimeMonth: "",
        departId: "",
        userId: "",
        reportOneId: "",
        reportTwoId: "",
        reportThreeId: "",
        taskState: "",
        finishState: "",
        taskChecked: false,
        taskConcept: "",
        taskRecord: "",
        taskStrategy:false,
        executeRecord: "",
        remark: "",
        taskTypeOneName: "",
        taskTypeTwoName: "",
        taskTypeThreeName: "",
        taskTypeOne: "",
        taskTypeTwo: "",
        taskTypeThree: "",
        num: ""
      }
    };
  },
  methods: {
    getParams() {
      let _this = this;
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      taskgetparams().then(res => {
        _this.$layer.closeAll('loading');
        if (res.status == 500) {
          return false;
        } else if (res.status == 0) {
          let data = res.data;
          if (data.taskTimeMonthParams) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let taskTimeMonth = data.taskTimeMonthParams;
            for (let i = 0; i < taskTimeMonth.length; i++) {
              arr.push({
                id: taskTimeMonth[i].id,
                name: taskTimeMonth[i].name,
                select: taskTimeMonth[i].select
              });
            }
            _this.mounths = arr;
          }

          if (data.departTree) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let treeData = data.departTree;
            for (let i = 0; i < treeData.length; i++) {
              arr.push({
                id: treeData[i].id,
                name: treeData[i].label.replace(/&nbsp;/g, ""),
                level: treeData[i].level,
                select: false,
                state:treeData[i].state,
              });
            }
            _this.executorList = arr;
          }
          if (data.numParams) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let num = data.numParams;
            for (let i = 0; i < num.length; i++) {
              arr.push({
                id: num[i].id,
                name: num[i].name,
                select: num[i].select
              });
            }
            _this.nums = arr;
          }
          if (data.reportOneIdParams) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let reportOne = data.reportOneIdParams;
            for (let i = 0; i < reportOne.length; i++) {
              arr.push({
                id: reportOne[i].id,
                name: reportOne[i].name,
                select: reportOne[i].select
              });
            }
            _this.reportOneList = arr;
          }

          if (data.reportTwoIdParams) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let reportTwo = data.reportTwoIdParams;
            for (let i = 0; i < reportTwo.length; i++) {
              arr.push({
                id: reportTwo[i].id,
                name: reportTwo[i].name,
                select: reportTwo[i].select
              });
            }
            _this.reportTwoList = arr;
          }

          if (data.reportThreeIdParams) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let reportThree = data.reportThreeIdParams;
            for (let i = 0; i < reportThree.length; i++) {
              arr.push({
                id: reportThree[i].id,
                name: reportThree[i].name,
                select: reportThree[i].select
              });
            }
            _this.reportThreeList = arr;
          }

          if (data.taskStateParams) {
            let arr = [];
            let taskState = data.taskStateParams;
            for (let i = 0; i < taskState.length; i++) {
              arr.push({
                id: taskState[i].id,
                name: taskState[i].name,
                select: taskState[i].select
              });
            }
            _this.taskStateList = arr;
            _this.taskStateList.forEach(item=>{
              if(item.name=='未确认'){
                _this.form.taskState = item.id;
              }
            })
          }
          if (data.finishStateParams) {
            let arr = [];
            let finishId = data.finishStateParams;
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
            _this.finishStates = arr;
            _this.finishStates.forEach(item=>{
              if(item.name=='未完成'){
                _this.form.finishState = item.id;
              }
            })
          }

          if (data.taskTypeOneParams) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let taskTypeOne = data.taskTypeOneParams;
            for (let i = 0; i < taskTypeOne.length; i++) {
              arr.push({
                id: taskTypeOne[i].id,
                name: taskTypeOne[i].name,
                remark:taskTypeOne[i].remark,
                select: taskTypeOne[i].select
              });
            }
            _this.taskTypeOneList = arr;
          }
          if (data.taskTypeTwoParams) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let taskTypeTwo = data.taskTypeTwoParams;
            for (let i = 0; i < taskTypeTwo.length; i++) {
              arr.push({
                id: taskTypeTwo[i].id,
                name: taskTypeTwo[i].name,
                remark:taskTypeTwo[i].remark,
                select: taskTypeTwo[i].select
              });
            }
            _this.taskTypeTwoList = arr;
          }
          if (data.taskTypeThreeParams) {
            let arr = [{ id: "-1", name: "  ", select: true }];
            let taskTypeThree = data.taskTypeThreeParams;
            for (let i = 0; i < taskTypeThree.length; i++) {
              arr.push({
                id: taskTypeThree[i].id,
                name: taskTypeThree[i].name,
                remark:taskTypeThree[i].remark,
                select: taskTypeThree[i].select
              });
            }
            _this.taskTypeThreeList = arr;
          }
          if(data.years){
            let arr = [{ id: "-1", name: "  ", select: true }];
            data.years.forEach(item=>{
              arr.push({
                id: item.id,
                name: item.name,
                select: false
              });
            })
            _this.yearParam = arr;
          }
          _this.userParams = [{ id: "-1", name: "  ", select: true }];

        } else if (res.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    taskTypeOnechange(val,item){
      this.taskTypeOneList.forEach(item=>{
        if(item.id == val){
          this.form.taskTypeOneName = item.remark;
        }
      })
      
    },
    taskTypeTwochange(val){
      this.taskTypeTwoList.forEach(item=>{
        if(item.id == val){
          this.form.taskTypeTwoName = item.remark;
        }
      })
    },
    taskTypeThreechange(val){
      this.taskTypeThreeList.forEach(item=>{
        if(item.id == val){
          this.form.taskTypeThreeName = item.remark;
        }
      })
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
      // let taskName = "";
      // this.taskStateList.forEach(item => {
      //   if (this.form.taskState === item.id) {
      //     taskName = item.name;
      //   }
      // });
      // taskgetparams().then(res => {
      //   if (res.status == 500) {
      //     return false;
      //   } else if (res.status == 0) {
      //     let data = res.data;
      //     if (data.finishStateParams) {
      //       let arr = [{ id: "-1", name: "  ", select: true }];
      //       let finishId = data.finishStateParams;
      //       if (taskName == "已确认") {
      //         for (let i = 0; i < finishId.length; i++) {
      //           if (
      //             finishId[i].name == "未完成" ||
      //             finishId[i].name == "已完成" ||
      //             finishId[i].name == "已失败" ||
      //             finishId[i].name == "已暂停" ||
      //             finishId[i].name == "未下达" 
      //           ) {
      //             arr.push({
      //               id: finishId[i].id,
      //               name: finishId[i].name,
      //               select: finishId[i].select
      //             });
      //           }
      //         }
      //         this.finishStates = arr;
      //       } else if(taskName == "未确认" || taskName == "已申请"){
      //         for (let i = 0; i < finishId.length; i++) {
      //           if (finishId[i].name == "未完成" || finishId[i].name == "未下达") {
      //             arr.push({
      //               id: finishId[i].id,
      //               name: finishId[i].name,
      //               select: finishId[i].select
      //             });
      //           }
      //         }
      //         this.finishStates = arr;
      //       }else if(taskName == "  "){
      //         for (let i = 0; i < finishId.length; i++) {
                
      //             arr.push({
      //               id: finishId[i].id,
      //               name: finishId[i].name,
      //               select: finishId[i].select
      //             });
                
      //         }
      //         this.finishStates = arr;
      //       }
      //     }
      //   }
      // });
    },
    savetBonus() {
      console.log(this.form);
      let taskTimeYear = this.form.taskTimeYear;
      let taskTimeMonth = this.form.taskTimeMonth;
      let departId = this.form.departId;
      let userId = this.form.userId;
      let reportOneId = this.form.reportOneId;
      let reportTwoId = this.form.reportTwoId;
      let reportThreeId = this.form.reportThreeId;
      let taskState = this.form.taskState;
      let finishState = this.form.finishState;
      let taskConcept = this.form.taskConcept;
      let num = this.form.num;
      let taskTypeOne = this.form.taskTypeOne;
      let taskTypeTwo = this.form.taskTypeTwo;
      let taskTypeThree = this.form.taskTypeThree;
      if (!taskTimeYear) {
        this.myAlert("规划年不能为空", "dangerous-icon");
        return false;
      }
      if (!taskTimeMonth) {
        this.myAlert("规划月不能为空", "dangerous-icon");
        return false;
      }
      if (!departId) {
        this.myAlert("部门不能为空", "dangerous-icon");
        return false;
      }
      if (!userId) {
        this.myAlert("人员不能为空", "dangerous-icon");
        return false;
      }
      if (!reportOneId) {
        this.myAlert("常报不能为空", "dangerous-icon");
        return false;
      }
      if (!reportTwoId) {
        this.myAlert("常报不能为空", "dangerous-icon");
        return false;
      }
      if (!reportThreeId) {
        this.myAlert("常报不能为空", "dangerous-icon");
        return false;
      }
      if (!num) {
        this.myAlert("序号不能为空", "dangerous-icon");
        return false;
      }
      if (!taskTypeOne) {
        this.myAlert("类别不能为空", "dangerous-icon");
        return false;
      }
      if (!taskTypeTwo) {
        this.myAlert("类别不能为空", "dangerous-icon");
        return false;
      }
      if (!taskTypeThree) {
        this.myAlert("类别不能为空", "dangerous-icon");
        return false;
      }
      if (!taskConcept) {
        this.myAlert("任务概念不能为空", "dangerous-icon");
        return false;
      }
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      let form = JSON.parse(JSON.stringify(this.form));
      if(form.taskStrategy){
        form.taskStrategy = 1;
      }else{
        form.taskStrategy = 0;
      }
      delete form.taskStateUser;
      delete form.finishStateUser;
      insertTask(form).then(res => {
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status == 0) {
          this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              this.$parent.getTableData();
              this.cancelData();
            })
            .catch(err => {});
        } else if (res.statue == 1) {
          let message = response.msg;
          this.myAlert(message + "！");
        }
      });
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
            let user = response.data.user;
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
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
    },
  },
  mounted() {
    this.getParams();
  }
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