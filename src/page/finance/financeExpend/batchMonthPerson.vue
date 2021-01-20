<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="height: 104px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:1px 0 0;" >
                  <div class="clear" style="padding-top:20px;" >
                    <div class="left padding-r-3" style="width:85px;text-align:right;" >
                      <span class="word "  >消耗年月</span>
                    </div>
                    <div class="left  ">
                      <el-form-item  prop="num" >
                          <el-date-picker
                          type="month"
                           
                          placeholder="选择日期"
                          value-format="yyyy-MM"
                          v-model="form.timeStart"
                          style="width: 95px;" >
                          ></el-date-picker>
                      </el-form-item>
                    </div>
                    
                    <div class="left  ">
                      <el-form-item  prop="day" >
                          <el-date-picker
                          type="month"
                           
                          placeholder="选择日期"
                          value-format="yyyy-MM"
                          v-model="form.timeEnd"
                          style="width: 95px;" >
                          ></el-date-picker>
                      </el-form-item>
                    </div>
                  
                  </div>
                  <div class="clear" >
                    <div class="left padding-r-3" style="width:85px;text-align:right;" >
                      <span class="word "  >部门人员</span>
                    </div>
                    <div class="left ">
                      <CheckSelect :selectId="expendDepartId" @changeSelect="finUserByDepartId" :listData="expendDepartParams" style="width:95px;" ></CheckSelect>
                    </div>
                    
                    <div class="left">
                      <CheckSelect :selectId="expendUserId" :listData="expendUserParams" style="width:95px;" ></CheckSelect>
                    </div>
                  
                  </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>

    <batchMonthPersonIframe v-model="mergedata" ref="mergeArea"></batchMonthPersonIframe> 
  </div>
</template>
<script>

  import {getExpendParams,bacthExpendMonthUser,financeConsumeInsertMoreMonCount} from '../../../service/expendData'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import CheckSelectSpecial from '../../../components/checkSpecial';
  import CheckSelect from "../../../components/checkSpecial1";;
  import batchMonthPersonIframe from './batchMonthPersonIframe';
  export default {
    props:["id","layerid"],
    data() {
      return {
        expendDepartId:'expendDepartId11',
        expendUserId:'expendUserId11',
        mergedata:{},
        expendDepartParams:[],
        expendUserParams:[],
        form:{
           timeStart:'',
           timeEnd:'',
        },
      };
    },
    components:{
      CheckSelectSpecial,
      CheckSelect,
      batchMonthPersonIframe
    },
    methods:{
       
       //获取参数
      getExpendData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        
        getExpendParams().then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let departTree = data.departTree;
            if(departTree && departTree.length != 0){
               let arr = []; 
              for(let i = 0 ; i  < departTree.length ; i++){
                arr.push({
                  id:departTree[i].id,
                  name:departTree[i].label.replace(/&nbsp;/g,""),
                  select:departTree[i].select,
                  level:departTree[i].level,
                  state:departTree[i].state,
                })
              }
               _this.expendDepartParams = JSON.parse(JSON.stringify(arr));
            }   
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      finUserByDepartId(){
        let _this = this;
        let id = this.getSelectIdByList(_this.expendDepartParams);
        if (id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function(response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr =  [];
              if(user && user.lengthg != 0){
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
              _this.expendUserParams = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          });
        } else {
          _this.expendUserParams = [];
        }
      },
      getSelectIdByList(list){
        let arr = [];
        list.forEach(function(item){
          if(item.select){
            arr.push(item.id);
          }
        })
        return arr.toString();
      },
      saveData(){
        let _this =  this;
        let form = JSON.parse(JSON.stringify(_this.form));
        let timeStart = form.timeStart;
        let timeEnd = form.timeEnd;
        let expendUserParams = this.getSelectIdByList(this.expendUserParams);
        if(!timeStart || !timeStart){
           _this.myAlert("消耗年月不能为空！",'dangerous-icon');
          return false;
        }
        if(expendUserParams == ""){
          _this.myAlert("部门人员不能为空！",'dangerous-icon');
          return false;
        }
        form.userIds = expendUserParams;
        financeConsumeInsertMoreMonCount(form).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.saveData1();
            
          } else if (response.status == 1) {
            let thisform = form;
            _this.$refs.mergeArea.getData(thisform,response.msg);
            // let test = _this.$layer.iframe({
            //   content: {
            //     content: batchMonthPersonIframe, //传递的组件对象
            //     parent: this,//当前的vue对象
            //     data:{thismsg:response.msg,thisform:form}//props
            //   },
            //   area:['350px','200px'],
            //   title:'以下是已有消耗人月,不能重复添加',
            //   shadeClose: false,
            //   shade: true,//是否显示遮罩
            //   zIndex:19891110,
            //   cancel:()=>{//关闭事件
                
            //   }
            // }); 
          }
        })
        
      },
      saveData1(){
        let _this =  this;
        let form = JSON.parse(JSON.stringify(_this.form));
        let timeStart = form.timeStart;
        let timeEnd = form.timeEnd;
        let expendUserParams = this.getSelectIdByList(this.expendUserParams);
        form.userIds = expendUserParams;
        bacthExpendMonthUser(form).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            
            _this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              _this.$parent.getExpendData();
              _this.cancelData();
            })
            .catch(err => {});
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      myparentfunc(){
        this.$parent.getExpendData();
      },
      cancelData(){
        console.log('dasda');
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
        this.getExpendData();
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
    },
  }
</script>

<style lang="scss" scoped>
  .move-content {
    
    .remark{
      border:1px solid #aaa;
      border-radius:3px;
      font-size:12px;
    }
    .word{
      line-height:27px;
    }
    .padding-r-3{
        padding-right:3px;
    }
  }
  
</style>
