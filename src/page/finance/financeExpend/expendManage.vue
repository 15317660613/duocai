<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container " >
          <div class="move-content" style="height:350px;padding:5px;" >
               <el-form ref="formsData"  :model="form" >
                <div class="clear" >
                    <div class="left" >
                        <i class="account-plus-icon" @click="addExpend" ></i>
                    </div> 
                    <div class="left" style="padding-left:40px;font-weight:700;" >
                        <span style="font-weight:700;" >编号</span>
                    </div>
                    <div class="left" style="padding-left:70px;font-weight:700;"  >
                        <span  style="font-weight:700;" >消耗品</span>
                    </div>
                    <div class="left" style="padding-left:160px;font-weight:700;" >
                        <span  style="font-weight:700;" >备注</span>
                    </div>
                </div>
                <div class="break" >

                </div>
                <div class="clear" style="padding-top:10px;height:316px;overflow:auto;" >
                    <div v-if="elem.deleted == 0" class="clear" v-for="(elem,index) in expendManage" >
                        <div class="left" style="padding:13px 5px 0 0; " >
                            <i class="account-minus-icon" @click="deletedExpend(elem,index)" ></i>
                        </div>
                        <div class="clear left elem-border" >
                            <div class="left padding-left-10 require-form" >
                                <el-form-item  >
                                    <el-input @input="checkNum(elem)"  style="width:60px;"  title="上限3位数" maxlength="3" v-model.trim="elem.num" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="left padding-left-10 require-form" >
                                <el-form-item  >
                                    <el-input   style="width:120px;" title="上限15个字" maxlength="15" v-model.trim="elem.name" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="left padding-left-10" >
                                <el-form-item  >
                                    <el-input style="width:200px;"  title="上限100个字" maxlength="100" v-model.trim="elem.remark" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="left padding-left-10" >
                                <el-form-item  >
                                    <el-checkbox  style="height:20px;"   v-model="elem.isClosed"  :false-label="0" :true-label="1"  ></el-checkbox>
        
                                </el-form-item>
                            </div>
                            <div class="left padding-left-5" style="padding-right:10px;"  >
                                <span class="des-word" >关闭</span>
                            </div> 
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
  </div>
</template>
<script>
  import {expendManageDetail,addAndUpdateExpendManage} from '../../../service/expendData'
  export default {
    props:["layerid",'remark','index'],
    data() {
      return {
        dialogHistoryFollow:this.followShowHistory,
        id:0,
        processings:[],
        getIndex:this.index,
        followId:'',
        form:{
          remark:this.remark,
        },
        expendManage:[
          
        ]
      };
    },
    methods:{
      checkNum(elem){
        // elem.elem= elem.replace(/[^\d]/g,'');
      },
      addExpend(){
        this.expendManage.push({ 
            id:'',
            deleted:0,
            name:'',
            num:'',
            remark:'',
            
          });
      },
      
      deletedExpend(elem,index){
        let id = elem.id;
        let deleted = elem.deleted;
        let useNum = elem.useNum;
        let expendManage = this.expendManage;
        if(useNum && useNum > 0){
          this.myAlert("消耗品已被使用，不允许删除","dangerous-icon");
          return false;
        }
        elem.deleted = 1;
        if(!id){
          let arr = [];
          expendManage.forEach((item,index1) =>{
            if(idnex != index1){
              arr.push(item);
            }
          })
        }
      },
      //获取跟进参数
      getExpendData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        expendManageDetail().then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            _this.expendManage = data;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      checkNumRule(){
        let flag = false;
        let expendManage = JSON.parse(JSON.stringify(this.expendManage));
        let nameMap = {};
        let count = 0;
        console.log(expendManage);
        expendManage.forEach(item =>{
          if(item.deleted == 0){
            nameMap[item.name] = true;
            count ++;
            if(item.num == ''){
              this.myAlert("编号不能为空！","dangerous-icon");
              flag = true;
              return false;
            }else{
               if(!/\d{3}/.test(item.num)){
                 this.myAlert("编号必须为3位数！","dangerous-icon");
                 flag = true;
                 return false;
               }
            };
            if(!item.name){
              this.myAlert("消耗品名称不能为空！","dangerous-icon");
            }
          }
        })
        let currentCount = 0;
        for(let attr in nameMap){
          currentCount ++;
        }
        if(count != currentCount){
          this.myAlert("消耗品名称重复！","dangerous-icon");
          flag = true;
        }
        return flag;
      },
      checkName(){
        let flag = false;
        let expendManage = JSON.parse(JSON.stringify(this.expendManage));
        expendManage.forEach(item =>{
          if(item.deleted == 0){
            if(item.name == ''){
              flag = true;
            }
          }
        })
        return flag;
      },

      saveData(){
        let _this = this;
        let expendManage = JSON.stringify(_this.expendManage);
        if(this.checkNumRule()){
          return false;
        }
        if(this.checkName()){
          return false;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {manages:expendManage};
        addAndUpdateExpendManage(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
             _this.myAlert("数据保存成功",'success-icon').then(res => {
		          _this.$parent.searchExpendListData();
              _this.cancelData();
            }).catch(err => {
             
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
          
      },
      cancelData(){
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
    .elem-border{
      padding:5px 5px;
      margin-bottom:10px;  
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
    }
    .padding-left-10{
      padding-left:10px;
    }
  }
  .click-check{
    background:#D7E8FC !important;
  }
</style>
