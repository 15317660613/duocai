<template>
  <div class="" style="margin:0 10px;width:100%;">
    
    <div class="pop-up" style="width:100%;padding:6px 0 0;">
        <div class="search-container" style="height:468px;margin:0 10px;overflow:auto;" >
            <el-form ref="formsData" :model="form">
            <div class="clear">
                <div class="left padding-l-15" style="padding-top:5px">
                <el-input v-model="departName" @input="querySearchAsync" placeholder="部门名称" style="width:130px;"></el-input>
                </div>
                <div class="left" style="padding:3px 0 0 100px">
                <span class="des-word require-word">选择年月</span>
                </div>
                <div class="left padding-l-2" style="padding-top:5px">
                <el-form-item label label-width="0" prop="time">
                    <el-date-picker
                        type="month"
                     
                    placeholder="选择日期"
                    value-format="yyyy-MM"
                    v-model="forms.time"
                    @change="changeTime"
                    style="width: 91px;"
                    ></el-date-picker>
                </el-form-item>
                </div>
            </div>

            <div
                class="search-container left"
                style="height:430px;overflow:auto;width:220px;margin:0;border-left:none;border-bottom:none;"
            >
                <el-tree
                :data="treeData"
                show-checkbox
                node-key="id"
                ref="newTopRightsTree"
                :check-strictly="true"
                @check="gettreeData"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps"
                style="background:#DCD9D3;font-size:12px;"
                ></el-tree>
            </div>

            <div class="left content">
                <div class="break"></div>
                <div style="widht:100%;height:350px;overflow:auto;" class="clear">

                <div class="left" v-for="(item,index) in tableData" :key="item.id" style="width: 100%;">
                    <p style="padding-top:10px;color:#999999;padding-left: 10px;">{{item.title}}</p>
                    <div class="clear">
                    <div style="width:100px;" class="left clear" v-for="(i,cindex) in item.person"  >
                        <div class="left"   >
                        
                        <el-checkbox 
                            style="font-size:12px;"
                            :disabled="i.green == 1 ? true:false"
                            :false-label="0" :true-label="1"
                            v-model='i.check'
                            @change="checkNum"
                        ></el-checkbox>
                        </div>
                        <div class="left" style="padding-left:3px;" >
                            <span :class="{'green-color':i.green == 1,'black-color':i.paramName == '正式离职',}" >{{i.name}}</span>
                        </div>
                    </div>
                    </div>
                    <div class="break"></div>
                </div>
                </div>
                <div style="padding-left:10px;">
                <p  ><div style="width: 12px;height: 12px;background: rgba(0, 204, 102, 1);margin-right: 5px;display: inline-block;"></div>该月已生成消耗</p>
                <p  ><div style="width: 12px;height: 12px;background: rgba(153, 153, 153, 1);margin-right: 5px;display: inline-block;"></div>正式离职</p>
                <p  ><div style="width: 12px;height: 12px;background: rgba(51, 51, 51, 1);margin-right: 5px;display: inline-block;"></div>常态在职，薪假在职，停薪在职，申离在职 <span style="float: right;margin-right: 15px;">总计 : {{totalcheckednum}} 人</span></p>
                </div>
            </div>
            </el-form>
        </div>
        <div class="clear" style="padding:5px 0;">
            <span
            class="right save-cancel-btn"
            
            @click="cancelData"
            >取 消</span>
            <span
            class="right save-cancel-btn"
            style=""
            type="primary"
            @click="saveUserData"
            >保 存</span>
            <el-checkbox class="right" style="margin:3px 30px 0 0;" @change="allCheck" :false-label="0" :true-label="1" v-model="checked">全选</el-checkbox>
        </div>
    </div>
   
  </div>
</template>

<script>
import {odeparttree} from "../../../service/organizeDate";
import {departTreeByWord } from "../../../service/getdepartData";
  import {findExpendUserByDepartId,bacthExpendUser} from '../../../service/expendData'
import CheckSelect from "../../../components/checkSpecial1";

export default {
  props: ["layerid"],
  data() {
    return {
      paramIdParams:[],
      executorList: [],
      userList: [],
      nums:[{id:'0.5',name:'0.5'},{id:'1',name:'1'}],
      addentOneList: [],
      paramMap:{},
      treeData:[],
      checked: 0,
      totalcheckednum:0,
      departName: "",
      param:"",
      choosePersonIds:'',
      lastTime:0,
      defaultProps: {
        children: "children",
        label: "label"
      },

      elemDay: {
        day:'',
        remark:'',
        show:'1',
        child:[]
      },
     
      forms:{

      },
      paramMap:{},
      form: {
       
        time: "",
        departId: "",
        userId: "",
        id: "",

        days: [


        ]
      },
      userId:[],
      tableData:[],
      active1: false,
      active2: false
    };
  },
  components: {
    CheckSelect
  },
  methods: {
    newAttend() {
       this.getTreeDateDepart();
    },
   
    getTreeDateDepart(){
      let _this = this;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      odeparttree("常态","主").then((response) =>{
        this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          this.treeData=response.data;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
        
      })
    },
    
    changeTime(){
      this.tableData = [];
      this.$nextTick(() => {
          this.$refs.newTopRightsTree.setCheckedKeys([]);
          this.checkNum();
      });
      
    },
    allCheck(){
        if(this.checked == 1){
            let tableData = this.tableData;
            tableData.forEach(item=>{
                let person = item.person;
                if(person && person.length != 0){
                    person.forEach(item1 =>{
                        debugger;
                        if(item1.green != 1){
                            item1.check =1;
                        }
                    })
                }
            })
        }else{
            let tableData = this.tableData;
            tableData.forEach(item=>{
                let person = item.person;
                if(person && person.length != 0){
                    person.forEach(item1 =>{
                        if(item1.green != 1){
                            item1.check =0;
                        }
                    })
                }
            })
        }
        this.checkNum();
    },
    gettreeData(arg1,arg2){
      let id = arg1.id;
      let title = arg1.label;
      let checkedKeys = arg2.checkedKeys;
      let str = checkedKeys.toString();
      let time = this.forms.time;
      if(!time){
        this.myAlert("年月不能为空！", "dangerous-icon");
        return false;
      }
      if(str){
        if(str.indexOf(id) != -1){
          let form = {id:id,time:time};
          findExpendUserByDepartId(form).then( (response)=> {
            this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              if(response.status==0){
                let tableData = this.tableData;
                let user = response.data.users;
                let haveUserIds = response.data.haveUserIds;
                if(user && user.length != 0){
                  user.forEach(item=>{
                    if(haveUserIds){
                      let str = haveUserIds.toString();
                      if(str.indexOf(item.id) != -1){
                        item.green = 1;
                        item.check = 1;
                      }else{
                        item.green = 0;
                        item.check = 0;
                      }
                    }
                  })
                  let obj = {title:title,id:id,person:user};
                  this.tableData.push(obj); 
                  this.checkNum();
                }
                
              }
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
           let tableData = this.tableData;
           let arr = [];
           tableData.forEach(item =>{
             if(id != item.id){
               arr.push(item);
             }
           })
           this.tableData = arr;
        }
      }else{
        this.tableData = [];
      }
      
    },
    querySearchAsync(){
      let _this = this;
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      let now = new Date();
      let form = {name:this.departName};
      if (now - this.lastTime  > 500) {
        this.lastTime = now;
        departTreeByWord(form).then( (res) =>{
          this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status === 0) {
            this.treeData= res.data;
            this.changeTime();
            this.$layer.closeAll("loading");
          } else if (res.status === 1) {
            let message = res.msg;
            this.myAlert(message + "！");
          }
        })
      }
    },
    checkNum(){
        let count = 0;
        let tableData =  this.tableData;
       
        tableData.forEach(item =>{
            if(item.person && item.person.length != 0){
                let person = item.person;
                person.forEach(item1 =>{
                    if(item1.check == 1){
                        count ++;
                    }
                })
            }
        })
        this.totalcheckednum = count ;
    },
    saveUserData() {
      let _this = this;
     
      let form = JSON.parse(JSON.stringify(this.forms));
      let tableData = this.tableData;
      let users = [];
      tableData.forEach(item =>{
        if(item && item.person){
          let person = item.person;
          if(person && person.length != 0){
             person.forEach(item1 =>{
               if(item1.green != 1 && item1.check == 1){
                 users.push(item1.id);
               }
             })
          }
        }
      })
      let time = this.forms.time;
      debugger;
      if(!form.time){
        this.myAlert("日期不能为空！", "dangerous-icon");
        return false;
      }
      if(users.length == 0){
         this.myAlert("人员不能为空！", "dangerous-icon");
        return false;
      }
      let userIds = users.toString();
      let obj = {time:time,userIds:userIds};
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      bacthExpendUser(obj).then(res => {
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          this.myAlert("数据保存成功！", "success-icon").then(res => {
              _this.cancelData();
            }).catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      });
    },
    cancelData() {
      this.$layer.close(this.layerid);
    },
  },
  mounted(){
    this.newAttend();
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
/deep/ .el-tabs--border-card > .el-tabs__header {
  background: #dcd9d3;
}

/deep/ .pop-up .el-tabs--border-card>.el-tabs__header .el-tabs__item{
  background:url("../../../images/weixuanzhong1.png");
  border-width:0 !important;
  height:24px;
  padding-left:20px !important;
  span{
    position:relative;
    text-align:center;
    display:inline-block;
    top:3px;
    width:107px;
  }
}
.black-color{
  color:rgb(153, 153, 153);
}
.green-color{
  color:rgb(0, 204, 102);
}

/deep/ .pop-up .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background:url("../../../images/xuanzhong1.png");
  color: #909399;
  border-width:0px !important;
  height:24px;
}

/deep/ .el-tabs__nav .is-active {
  height: 24px !important;
  border: none;
}
/deep/ .el-tabs__nav-scroll {
  height: 24px !important;
}
/deep/ .el-tabs--border-card {
  background: #dcd9d3;
  border-width: 0;
}
/deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 0 !important;
}
/deep/ .break {
  border-width: 2px;
  border-top-width: 0px;
  border-style: solid;
  border-image: url("../../../images/system/border.png") 2 repeat;
  margin: 3px 0 0;
}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #00cc66;
}
.styles {
  padding: 3px 0px 0px 132px !important;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.content {
  height:382px;
  width: 497px;
  position: relative;
  padding: 0px 0px 0px 10px;
}
.require-word:before {
  content: "*";
  color: #f56c6c;
  margin-right: 1px;
}
.padding-l-15 {
  padding-left: 15px;
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
</style>
