<template>
  <div style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
      <div class="pop-up-container " >
        <el-form :model="form"  ref="form"   style="" >
            <div class="clear" style="height:100px;padding-top:30px;" >
                <div class="left" >
                    <span class="des-word"  style="width: 60px;">转入人</span>
                </div>
                <div class="left" >
                    <el-form-item label="" >
                    <el-select style="width: 110px;" v-model="form.depart" @change="findUserByDepart()">
                        <el-option  v-for="item in departParams"  :label="item.name" :value="item.id" >
                        <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}"  >
                          <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                          <span v-if="item.state=='常态'">{{item.name}}</span>
                        </span>
                        </el-option>
                    </el-select>
                    </el-form-item>  
                </div>
                <div class="left" >
                    <el-form-item  label="" >
                    <el-select style="width: 110px;" v-model="form.inUserId">
                    <el-option
                        v-for="item in userParams"
                        :id="item.id"
                        :label="item.name"
                        :value="item.id"
                        :class="{'leave-user':item.stateUser == 1}" 
                    >{{item.name}}
                    </el-option>
                    </el-select>
                </el-form-item>
                </div>    
            </div>
        </el-form>
      </div>
       <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="save-cancel-btn right "  @click="cancelData"  >取 消</span>
          <span class="save-cancel-btn right" type="primary"  @click="saveData" >转出资源</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {OwnerUserdparam,userAboutDataChange,findUserByDepartId} from '../../../service/organizeDate'
  
  export default {
    props:['layerid','type','userId'],
    data(){
      return{
        departParams:[],
        userParams:[],
        form:{
          depart:'',
          user:'',
          outUserId:this.userId,
          inUserId:'',
          type:this.type,
        }
      }
    },
   
    methods:{
      
      initParams(){
        let _this=this
        OwnerUserdparam().then(function (res) {
          if(res.data.departTree){
            let arr = [];
            let treeData = res.data.departTree
            for(let i = 0 ; i < treeData.length; i++){
              arr.push({
                id:treeData[i].id,
                name:treeData[i].label.replace(/&nbsp;/g,""),
                level:treeData[i].level,
                state:treeData[i].state
              })
            }
            _this.departParams = arr;
          }
         
        })

      },
      findUserByDepart(){
        let _this = this;
        let id = this.form.depart;
        let form = {id,flag:3,isSelect:1}
        
        findUserByDepartId(form).then(function (response) {
          if(response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let user = response.data.user;
            if(user && user.length != 0){
              let arr = [];
              let type = _this.type;
              if(type == 1 || type == 2 || type ==3 || type == 11 || type == 12){
                user.forEach(function(item){
                  if(item.doBusiness == 1){
                    let obj = {
                        id: item.id,
                        name: item.name,
                        stateUser:0,
                    }
                    if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                    }
                    arr.push(obj);
                  } 
                })
              }else{
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
              
              _this.userParams = [{id:'',name:' '}].concat(arr);
            }else{
              _this.userParams = [{id:'',name:' '}];
            }
            _this.form.inUserId = "";
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      
      saveData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(this.form));
        let inUserId = form.inUserId;
        if(!inUserId){
            this.myAlert("转入人不能为空！","dangerous-icon");
            return false;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        userAboutDataChange(form).then(function (response) {
           _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功！","success-icon").then(res => {
              _this.$parent.initUserDataCount();
              _this.cancelData();
            }).catch(res => {

            })
            
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
          
        })
      },

      cancelData(){
        this.$layer.close(this.layerid);
      },

    },
    mounted(){
      this.initParams();
    }
  }
</script>

<style scoped>
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
  .border-right{
    border-width: 0 2px 0 0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
   
  }
  .pop-up .pop-up-container /deep/ .el-form-item__label {
    width:88px!important;
    font-family: '微软雅黑';
    font-size: 12px;
  }
  .span{
    font-family: '微软雅黑';
    font-size: 12px;
    font-family: "思源黑体 CN Regular", "思源黑体 CN";
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    //color: rgb(8, 131, 131);
    border-width: 0px;
  }
  .des-word{
    display:inline-block;
    text-align:right;
    padding-right:2px;
  }
</style>
