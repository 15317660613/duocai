<template>
  <div class="" style="margin:0 10px;width:100%;">
    
    <div class="pop-up" style="width:100%;padding:6px 0 0;">
        <div class="search-container" style="height:358px;margin:0 10px;overflow:auto;" >
            <el-form ref="formsData" :model="form">
            <div class="clear">
                <div class="left padding-l-15" style="padding-top:5px">
                <el-input v-model="departName" @input="querySearchAsync" title="部门名称" style="width:130px;"></el-input>
                </div>
               
            </div>

            <div
                class="search-container left"
                style="height:320px;overflow:auto;width:190px;margin:0;border-left:none;border-bottom:none;"
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
                <div style="widht:100%;height:238px;overflow:auto;" class="clear">

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
                <p  ><div style="width: 12px;height: 12px;background: rgba(0, 204, 102, 1);margin-right: 5px;display: inline-block;"></div>已同步人员</p>
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
            @click="saveData"
            >保 存</span>
            <el-checkbox class="right" style="margin:3px 30px 0 0;" @change="allCheck" :false-label="0" :true-label="1" v-model="checked">全选</el-checkbox>
        </div>
    </div>
   
  </div>
</template>

<script>
import {findUpDepartByDepartId,departperson} from "../../../service/organizeDate";
import {departTreeByWord } from "../../../service/getdepartData";
import {findUsersByDepartIdsBouns,saveBatchBouns} from "../../../service/goldExtractionData";
import CheckSelect from "../../../components/checkSpecial1";

export default {
  props: ["userId","layerid",'chiefIds','chiefNames','chiefDepartIds','index'],
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
      param:"",
      choosePersonIds:'',
      lastTime:0,
      getChiefIds:this.chiefIds,
      getChiefNames:this.chiefNames,
      getChiefDepartIds:this.chiefDepartIds,
      departName:'',
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
      tableData:[],
      active1: false,
      active2: false
    };
  },
  components: {
    CheckSelect
  },
  methods: {
   
    getTreeDateDepart(){
      let _this = this;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      let word = this.departName;
      if(word == null || word == ''){
        word = '';
      }
      let form = {userId:this.userId,needSame:1,word:word};
      findUpDepartByDepartId(form).then((response) =>{
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
    getUserData(){
      let _this = this;
      let getChiefDepartIds = this.getChiefDepartIds;
      let form = {userId:this.userId,id:getChiefDepartIds,time:1};
      findUsersByDepartIdsBouns(form).then(function (response) {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let user = response.data.users;
          let haveUserIds = _this.getChiefIds;
          let userMap = {};
          if(user && user.length!= 0){
             user.forEach(item=>{
               if(!userMap[item.departName]){
                 let arr = [];
                 arr.push(item);
                 userMap[item.departName] = arr;
               }else{
                 let getUserArr = userMap[item.departName];
                 getUserArr.push(item);
               }
             })
          }
          let setArr = [];
          for(let attr in userMap){
            let getuser = userMap[attr];
            if(getuser && getuser.length != 0){
              getuser.forEach(item=>{
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
              let obj = {title:attr,id:0,person:getuser};
              setArr.push(obj);
            }
                
          }
          _this.tableData = setArr; 
          _this.checkNum();
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
      
      if(str){
        if(str.indexOf(id) != -1){
          let form = {userId:this.userId,id:id,time:1};
          findUsersByDepartIdsBouns(form).then( (response)=> {
            this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              if(response.status==0){
                let tableData = this.tableData;
                let user = response.data.users;
                let haveUserIds = this.getChiefIds;
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
                  let flag = false;
                  this.tableData.forEach(item =>{
                    if(item.title == title){
                      flag = true;
                    }
                  })
                  if(!flag){
                    this.tableData.push(obj); 
                    this.checkNum();
                  }
                  
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
        shade: true,//是否显示遮罩
      });
      let word = this.departName;
      if(word == null || word == ''){
        word = '';
      }
      let form = {userId:this.userId,needSame:1,word:word};
      findUpDepartByDepartId(form).then((response) =>{
        this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          this.treeData=response.data;
          _this.tableData = [];
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
        
      })
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
    saveData(){
      let tableData = this.tableData;
      let getChiefIds = [];
      let getChiefNames = [];
      let departIds = {};
      tableData.forEach(item =>{
        let person = item.person;
        if(person && person.length != 0){
           person.forEach(item1=>{
             if(item1.check == 1){
              getChiefIds.push(item1.id);
              getChiefNames.push(item1.name);
              departIds[item1.departId] = true;
            }
           })
        }
        
      })
      let getChiefDepartIds = [];
      for(let attr in departIds){
        getChiefDepartIds.push(attr);
      }
      this.$parent.setElemSynchro(getChiefIds.toString(),getChiefNames.toString(),getChiefDepartIds.toString(),this.index);
      this.cancelData();
    },
    cancelData(){
      this.$layer.close(this.layerid);
    },

    
  },
  mounted(){
    this.getTreeDateDepart();
    if(this.getChiefIds){
      this.getUserData();
    }
  }

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
  height: 245px;
  width: 510px;
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
