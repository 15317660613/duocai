<template>
  <div class="" style="height:475px" >
    <div class="pop-up-container" style="height: 442px">
      <el-form :model="form1"  ref="formsData"  class="demo-ruleForm" style="height: 250px">
          <div class="clear" >
              <div class="left word-text1" >
                <span class="word require-word" >状态</span>
              </div>
              <div class="left" >
                <el-form-item >
                  <el-select @change="changeState" v-model="form1.stateId" placeholder=""  style="width: 90px;">
                    <el-option  label="" value="" ></el-option>
                    <el-option  :value="elem.id" :label="elem.name" v-for="(elem,index) in stateIdParams" ></el-option>
                  </el-select>
                </el-form-item>  
              </div> 
              <div class="left" v-show="stateShow" >
                <el-form-item  >
                  <el-select  v-model="form1.stateSec"  placeholder=""    style="width: 40px;">
                    <el-option  label="" value="" ></el-option>
                    <el-option  :value="elem.id" :label="elem.name" v-for="(elem,index) in stateParams2" ></el-option>
                  </el-select>
                </el-form-item>  
              </div>   
              <div class="left" style="padding-left:12px;" >
                  <el-form-item  prop="isState1" >
                    <el-checkbox  :disabled="stateDisabled" style="height:20px;"  v-model="form1.isState1"  :false-label="0" :true-label="1" ></el-checkbox>
                  </el-form-item>
              </div>   
              <div class="left word-check" >
                <span class=" " >强制</span>
              </div>
              <div class="left"  style="padding-left:12px;" >
                  <el-form-item  prop="isState2" >
                    <el-checkbox :disabled="stateDisabled" style="height:20px;"  v-model="form1.isState2"  :false-label="0" :true-label="1" ></el-checkbox>
                  </el-form-item>
              </div>   
              <div class="left word-check" >
                <span class=" " >未办</span>
              </div>
              <div class="left"  style="padding-left:12px;" >
                  <el-form-item  prop="isState3" >
                    <el-checkbox :disabled="stateDisabled" style="height:20px;"  v-model="form1.isState3"  :false-label="0" :true-label="1" ></el-checkbox>
                  </el-form-item>
              </div>   
              <div class="left word-check" >
                <span class=" " >黑名</span>
              </div> 

              <div class="left"  style="padding-left:50px;" >
                  <el-form-item  prop="isPublicAccount" >
                    <el-checkbox style="height:20px;"  v-model="form1.isPublicAccount"  :false-label="0" :true-label="1" ></el-checkbox>
                  </el-form-item>
              </div>   
              <div class="left word-check " >
                <span class="" style="color:#AC3C3B;" >共享公共</span>
              </div>
              <div class="left"  style="padding-left:15px;" >
                  <el-form-item  prop="showAccountSet" >
                    <el-checkbox style="height:20px;"  v-model="form1.showAccountSet"  :false-label="0" :true-label="1" ></el-checkbox>
                  </el-form-item>
              </div>
              <div class="left word-check" >
                <span class=" " >显示到账套设置及批量新增</span>
              </div> 
          </div>

          <div class="clear" >
            <div class="left word-text1" >
                <span class="word " >用工</span>
              </div>
              <div class="left" >
                <el-form-item >
                  <el-select v-model="form1.usedTypeId"  placeholder=""   style="width: 90px;">
                  <el-option  :value="elem.id" :label="elem.name" v-for="(elem,index) in useTypeIdParams" ></el-option>
                  </el-select>
                </el-form-item>  
              </div> 
              <div class="left" style="padding-left:120px;" >
                <span class="word " >用工时间</span>
              </div>
              <div class="left" >
                <el-form-item >
                
                  <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="form1.useTime" style="width: 92px;"></el-date-picker>
                  
                </el-form-item>  
              </div>
              <div class="left" style="padding-left:120px;" >
                <span class="word " >退工时间</span>
              </div>
              <div class="left" >
                <el-form-item >
                  <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="form1.returnUseTime" style="width: 92px;"></el-date-picker>
                </el-form-item>  
              </div>
          </div> 
          <div class="clear" >
            <div class="clear " v-if="item.deleted == 0" style="position:relative;padding-left:50px;" v-for="(item,index) in dates"  >
              <div class="left" >
                <span v-if="index == 0" style="position:absolute;left:38px;top:6px;" >
                  <i class="account-plus-icon" @click="addUserTime" ></i>
                </span>
                <span v-if="index != 0"  style="position:absolute;left:38px;top:6px;" >
                  <i class="account-minus-icon" @click="deletedUserTime(index)" ></i>
                </span>
              </div>
              <div class="left word-text2" >  
                  <span class="word " >入职</span>
              </div>
              <div class="left" >  
                <el-form-item  >
                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.entryTime" style="width: 90px;"></el-date-picker>
                </el-form-item>
              </div>
              <div class="left word-text2" >  
                  <span class="word " >首上</span>
              </div> 
              <div class="left" >   
                <el-form-item >
                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.firstTime" style="width: 90px;"></el-date-picker>
                  
                </el-form-item>
              </div>
              <div class="left word-text2" >  
                  <span class="word " >转正</span>
              </div> 
              <div class="left" >
                <el-form-item >
                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.fullMemberTime" style="width: 90px;"></el-date-picker>
                  
                </el-form-item>
              </div>  
              <div class="left word-text2" >  
                  <span class="word " >离职</span>
              </div>
              <div class="left" >   
                <el-form-item >
                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.payOffTime" style="width: 90px;"></el-date-picker>
                
                </el-form-item>
              </div>  
              <div class="left word-text2" >  
                  <span class="word " >止薪</span>
              </div> 
                <div class="left" >  
                <el-form-item >
                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.quitTime" style="width: 90px;"></el-date-picker>
                  
                </el-form-item>
                </div>  
            </div>
          </div>
          <div class="break" >
          </div> 
          <div class="clear" >
              <div class="left word-text1" >
                <span class="word " >职位</span>
              </div>
              <div class="left" >
                <el-form-item >
                  <el-select v-model="form1.staffId" placeholder=""   style="width: 130px;">
                  <el-option  :value="elem.id" :label="elem.label" v-for="(elem,index) in staffIdParams" ></el-option>
                  </el-select>
                </el-form-item>  
              </div> 
              <div class="left" style="padding-left:30px;" >
                  <el-form-item  prop="isAllowPc" >
                    <el-checkbox style="height:20px;"  v-model="form1.isAllowPc"  :false-label="0" :true-label="1" ></el-checkbox>
                  </el-form-item>
              </div>   
              <div class="left word-check" >
                <span class=" " >允许web端登录</span>
              </div>
              <div class="left" style="padding-left:30px;" >
                  <el-form-item  prop="isAllowMobile" >
                    <el-checkbox style="height:20px;"  v-model="form1.isAllowMobile"  :false-label="0" :true-label="1" ></el-checkbox>
                  </el-form-item>
              </div>
              <div class="left word-check" >
                <span class=" " >允许手机端登录</span>
              </div> 
          </div>
          <div class="clear" >
              <div class="left word-text1" >
                <span class="word " >账号</span>
              </div>
              <div class="left" >
                <el-form-item >
                  <el-input v-model="form1.accountNumber"  style="position:fixed;bottom:-9999px" ></el-input>
                  <el-input v-model="form1.accountNumber" title="上限50个字" maxlength="50"   style="width:130px;" ></el-input>
                </el-form-item>  
              </div>
              <div class="left" >
                <span class="word " >密码</span>
              </div>
              <div class="left" >
                <el-form-item >
                    <el-input   v-model="form1.accountPasswd" show-password style="position:fixed;bottom:-9999px" ></el-input>
                  <el-input   v-model="form1.accountPasswd" show-password style="width:130px;" ></el-input>
                </el-form-item>  
              </div> 
          </div> 
          <div class="clear" >
              <div class="left word-text1" >
                <span class="word " >备注</span>
              </div>
              <div class="left" style="padding-top:7px;" >
                <el-form-item >
                  <textarea v-model="form1.stateRemark" class="remark" title="上限50个字" maxlength="50"   style="width:570px;height:85px;" ></textarea>
                </el-form-item>  
              </div>
              
          </div>       
      </el-form>
    </div>
    <div slot="footer" class="footer-btn clear" style="padding:5px 0;"  >
      <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
      <span class="right save-cancel-btn" type="primary"  @click="saveData"  >保 存</span>
    </div>
    
  </div>
</template>

<script>
 
  export default {
    name: 'statetwo',
    props:[],
    data(){
       return{
         staffIdParams:[],
         stateIdParams:[], 
         stateParams2:[],
         useTypeIdParams:[],
         stateShow:true,
         stateDisabled:true,
         dates:[{
          id:'',
          deleted:0, 
          entryTime:'',
          firstTime:'',
          fullMemberTime:'',
          payOffTime:'',
          quitTime:'',
         },],
        elemDate:{
          id:'',
          deleted:0, 
          entryTime:'',
          firstTime:'',
          fullMemberTime:'',
          payOffTime:'',
          quitTime:'',
         },
         form1:{
          stateId:"",
          stateSec:"",
          isState1:0,
          isState2:0,
          isState3:0,
          isPublicAccount:0,
          showAccountSet:0,
          usedTypeId:"",
          useTime:"",
          returnUseTime:"",
          staffId:"",
          isAllowPc:0,
          isAllowMobile:0,
          accountNumber:"",
          accountPasswd:"",
          stateRemark:"",		
        },
       } 
    },
    methods:{
      changeState(){
        let stateIdParams = this.stateIdParams;
        let stateId = this.form1.stateId;
        let stateName = "";
        stateIdParams.forEach(item => {
          if(item.id == stateId){
            stateName = item.name;
          }
        })
        if(stateName == "常态在职" || stateName == "薪假在职" || stateName == '停薪在职' || stateName =='申离在职'){
          this.stateShow = true;
        }else{
          this.stateShow = false;
          this.form1.stateSec = "";
          
        }

        if(stateName == '正式离职'){
          this.stateDisabled = false;
        }else{
          this.stateDisabled = true;
          this.form1.isState1 = 0;
          this.form1.isState2 = 0;
          this.form1.isState3 = 0;
        }
      },
      addUserTime(){
        let dates = this.dates;
        dates.push(JSON.parse(JSON.stringify(this.elemDate)));
        this.dates = dates;
      },
     
      deletedUserTime(index){
        let dates = this.dates;
        let arr = [];
        dates.forEach((item,index1) =>{
          if(index == index1){
              item.deleted = 1;
          }
          if(index != index1){
            arr.push(item);
          }else{
            if(index == index1 && item.id != ''){
              arr.push(item);
            }
          }
        })
        this.dates = arr;
      },
      saveData(){
        this.$emit("saveData");
      },
      cancelData(){
         this.$emit("cancelData");
      },
     
    }
  }
</script>

<style lang="scss" scoped>
  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }
  .word{
    line-height:27px;
  }
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .word-text1{
    width:90px;
    text-align:right;
    padding-right:5px;

  }
   .word-text2{
    width:40px;
    text-align:right;
    padding-right:5px;

  }
  .word-check{
    padding:6px 0 0 3px;
  }
</style>
