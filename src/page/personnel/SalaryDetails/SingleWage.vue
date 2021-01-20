<template>
  <div style="padding: 0px 10px;width: 100%;">
      <div class="pop-up">
        <div class="pop-up-container" style="height:352px;position: relative;" >
          <el-form ref="formsData"  :model="form" >
            <div class="clear" >
              <div class="left center-fundation">
                <div class="clear" >
                  <div class="left" style="padding-left:10px">
                    <span class="des-word require-word" style="width: 60px;">选择年月</span>
                  </div>
                  <div class="left padding-l-2">
                    <el-form-item label label-width="0" prop="chooseTime">
                      <el-date-picker
                        size="mini"
                        type="month"
                        v-model="form.time"
                        style="width: 91px;"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="left" style="padding-left:80px;" >
                    <span class="des-word require-word" >单项</span>
                  </div>
                  <div class="left" style="padding: 0px 0px 0px 2px;">
                    <el-form-item  label-width="0">
                      <el-select    style="width:130px;"  v-model.trim="form.type" @change='selectChangemethods'>
                        <el-option v-for="item in singleChoose" :label="item.name" :value="item.name"  style="width: 125px;"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class=" left padding-l-5" style="margin-top:2px;"  >
                    <i class="search-btn" @click="searchSingleWageList">查询</i>
                  </div>
                </div>
                <div class="clear">
                  <div class="left padding-l-15" style="padding-left:15px" >
                    <span class="des-word" >部门人员</span>
                  </div>

                  <div class="left">
                    <el-form-item label label-width="0" prop="mydepartIds">
                      <CheckSelectSpecial
                        @findStreetByTown="finUserByDepart"
                        :selectId="mydepartIds"
                        :listData="executorList111"
                        style="width:100px;"
                      ></CheckSelectSpecial>
                    </el-form-item>
                  </div>
                  <div class="left padding-l-2">
                    <el-form-item label label-width="0" prop="userIds">
                      <CheckSelectSpecial
                        :selectId="userIds"
                        :listData="departParams111"
                        style="width:80px;"
                      ></CheckSelectSpecial>
                    </el-form-item>
                  </div>
                  <div class="left" style="padding-left: 10px;">  
                    <span class="des-word" style="width: 35px;">职位</span>
                  </div>
                  <div class="left padding-l-2" >
                    <el-form-item  label-width="0" prop="staffIds">
                      <CheckSelect :selectId="staffIds" :listData="staffIdParams111" style="width:90px;" ></CheckSelect>
                    </el-form-item>
                  </div>
                  <div class="left padding-l-15" >
                    <span class="des-word" >状态</span>
                  </div>
                  <div class="left padding-l-2" >
                    <el-form-item label="" label-width="0" prop="stateIds">
                      <CheckSelectSpecial :selectId="stateIds" :listData="userStateIdParams" style="width:82px;" ></CheckSelectSpecial>
                    </el-form-item>
                  </div>
                </div>


              </div>
            </div>
            <div class="break" >
            </div>
            <div class="left" style="margin: 5px;height: 277px;overflow-y: auto;width: 547px;">
              <div class="clear" v-for="item in singWageData">
                <div class="left" style="width: 130px;text-align: right;">
                  <span class="des-word" style="width: 120px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.user}}</span>
                </div>
                <div class="left " style="padding-left:3px;"  >
                  <el-form-item prop="word" label-width="0">
                    <el-input  v-if="item.manualType=='1'" :disabled="true"  title="上限10位数" maxlength="10" style="width:80px;" v-model='item.autoValue' autocomplete="off" ></el-input>
                    <el-input type="number" v-else title="上限10位数"  maxlength="10" style="width:80px;" v-model='item.manualValue' autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
                <div class="left" style="padding-left: 3px" >
                  <el-form-item  label-width="0">
                    <el-select    style="width:70px;"  v-model="item.manualType">
                      <el-option v-for="ii in autoORhand" :label="ii.name" :value="ii.id"  style="width: 70px;"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" style="width: 55px;">
                  <span class="des-word" >备注</span>
                </div>
                <div class="left " style="padding-left:3px;"  >
                  <el-form-item  label-width="0">
                    <el-input  title="上限100个字" maxlength="100" style="width:160px;" v-model='item.remark'  autocomplete="off" ></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            
          </el-form>
        </div>

        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="left" style="margin-left: 15px;">单项总计:  {{total}}</span>
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        </div>
      </div>

  </div>
</template>

<script>
import {findUserByDepartId} from "../../../service/organizeDate";
import { userSalaryUpdateIndividual,userSalarygetParams,userSalaryGetIndividualList } from "../../../service/SalaryDetails";
import { mySalaryDetailsListContent } from '../../../utils/mySalaryDetailsList';
import CheckSelectSpecial from '../../../components/checkSpecial'
import CheckSelect from "../../../components/check";
import {
  onleyInsert,
  allInsert
} from "../../../service/attendData";

export default {
  props:['layerid'],
  data() {
    return {
      mydepartIds:'mydepartIds',
      singleChoose:mySalaryDetailsListContent.iframechildsingleWagedata,
      input111:'',
      input222:'',
      autoORhand:[{id:'1',name:'自动'},{id:'2',name:'手动'}],
      autoORhandDefault:'1',
      executorList111:[{ id: "-1", name: "全部", select: true }],
      stateIds:'stateIds',
      departParams111:[],
      userIds:'userIds',
      staffIds:'staffIds',
      staffIdParams111:[],
      userStateIdParams:[],
      singWageData:[],
      total:'',
      form:{
        time:'',
        type:''
      }
    };
  },
  components: {
    CheckSelect,
    CheckSelectSpecial
  },
  methods: {
    selectChangemethods(){

    },
    getSelectIdByList(list){
      let arr = [];
      if(list && list.length != 0) {
        list.forEach(function (item) {
          if (item.select) {
            arr.push(item.id);
          }
        })
      }
      return arr.toString();
    },
    finUserByDepart(){
      let _this = this;
      let id = _this.getSelectIdByList(_this.executorList111);
      if(id){
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            console.log('111');
            let data = response.data;
            if (data.user) {
              let arr = [{ id: "-1", name: "全部", select: true }];
              let treeData = data.user;
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].name,
                  select: false
                });
              }
              _this.departParams111 = arr
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      }else{

      }

    },
    getParamsData(val, ss){
      let _this = this;
      userSalarygetParams().then(function(response){
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let arr = [{ id: "-1", name: "全部", select: true }];
          if (data.departTree) {
            
            let treeData = data.departTree;
            for (let i = 0; i < treeData.length; i++) {
              arr.push({
                id: treeData[i].id,
                name: treeData[i].label.replace(/&nbsp;/g, ""),
                level: treeData[i].level,
                select: false,
                state: treeData[i].state,
              });
            }
            _this.executorList111 = arr;
            _this.departParams111 =  [{ id: "-1", name: "全部", select: true }];
          }else{
            _this.executorList111 = arr;
          }
          
          if(data.staffIdParams){
            let initArr = [{ id: "-1", name: "全部", select: true }];
            for (let i = 0; i < data.staffIdParams.length; i++) {
              initArr.push({
                id: data.staffIdParams[i].id,
                name: data.staffIdParams[i].label.replace(/&nbsp;/g, ""),
                level: data.staffIdParams[i].level,
                select: false
              });
            }
            _this.staffIdParams111 = initArr;
          }
          // 状态
          if(data.userStateIdParams){
            let initArr = [{ id: "-1", name: "全部", select: true }];
            let userStateIdParams = data.userStateIdParams;
            userStateIdParams.forEach(item => {
              if(item.name == '常态在职' ||  item.name == '薪假在职' ||  item.name == '停薪在职' ||  item.name == '申离在职' ||  item.name == '正式离职'){
                let obj ={ 
                  id: item.id,
                  name: item.name,
                  select: item.select
                };
                initArr.push(obj);
              }  
            });
            _this.userStateIdParams = initArr;
          }
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message+"！");
        }
      })

    },
    searchSingleWageList(){
      let _this = this;
      this.$layer.loading({
        shade: false,//是否显示遮罩
      });
      if(_this.form.time==''){
        _this.myAlert("日期不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.form.type==''){
        _this.myAlert("单项不能为空!", "dangerous-icon");
        return false;
      };
      let form = JSON.parse(JSON.stringify(_this.form));
      
      //部门
      let departIds = _this.getSelectIdByList(_this.executorList111);
      form.departIds = departIds.toString();
      //人员
      let userIds = _this.getSelectIdByList(_this.departParams111);
      form.userIds = userIds.toString();
      //职位
      let staffIds = _this.getSelectIdByList(_this.staffIdParams111);
      form.staffIds = staffIds.toString();
      //状态
      let stateIds = _this.getSelectIdByList(_this.userStateIdParams);
      form.stateIds = stateIds.toString();

      userSalaryGetIndividualList(form).then(res => {
        _this.$layer.closeAll("loading");
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          let data = res.data;
          _this.singWageData = data.list;
          _this.total = data.total;
        } else if (res.status === 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      })
    },
    saveFormData(){
      let _this = this;
      let form = JSON.parse(JSON.stringify(_this.form));
      form.details = JSON.stringify(_this.singWageData);
      userSalaryUpdateIndividual(form).then(res => {
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          this.clearFormData();
          this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              this.$parent.searchSalaryDetailsList();
              this.$layer.close(this.layerid);
            })
            .catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      })
    },
    clearFormData() {
      this.$layer.close(this.layerid);
    }
  },
  mounted() {
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
<style type="text/css" scoped="">
  /deep/ .search-container {
    width: calc(100% - 10px);
    margin: 5px auto 0 5px;
    border-style: 2px solid;
    line-height: 23px;
  }
  /deep/ .search-btn{
    border: 1px solid #797979;
    border-radius: 5px;
    background: #E4E4E4;
    padding: 0px 10px;
    line-height: 18px;
    margin-top: 3px;
    font-size: 12px;
    display: block;
    cursor: pointer;
  }
</style>
<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>