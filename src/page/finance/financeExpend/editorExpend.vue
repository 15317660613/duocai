<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 454px;">
          <div class="move-content" style="height:450px;padding:5px;" >
               <el-form ref="formsData"  :model="form" >
                <div class="clear" >
                    <div class="left" >
                        <i class="account-plus-icon" @click="addExpend" ></i>
                    </div> 
                   
                    <div class="left" style="padding-left:65px;font-weight:700;"  >
                        <span  style="font-weight:700;" >消耗品</span>
                    </div>
                    <div class="left" style="padding-left:115px;font-weight:700;" >
                        <span  style="font-weight:700;" >标记/账号</span>
                    </div>
                     <div class="left" style="padding-left:73px;font-weight:700;" >
                        <span  style="font-weight:700;" >权限/密码</span>
                    </div>
                     <div class="left" style="padding-left:48px;font-weight:700;" >
                        <span  style="font-weight:700;" >个数</span>
                    </div>
                     <div class="left" style="padding-left:98px;font-weight:700;" >
                        <span  style="font-weight:700;" >天数</span>
                    </div>
                     <div class="left" style="padding-left:140px;font-weight:700;" >
                        <span  style="font-weight:700;" >金额</span>
                    </div>
                    <div class="left" style="padding-left:140px;font-weight:700;" >
                        <span  style="font-weight:700;" >备注</span>
                    </div>
                </div>
                <div class="break" >

                </div>
                <div class="clear" style="padding-top:10px;height:420px;overflow:auto;" >
                    <div v-if="elem.deleted == 0" class="clear" v-for="(elem,index) in expendManage" >
                        <div class="left" style="padding:13px 5px 0 0; " >
                            <i class="account-minus-icon" @click="deletedExpend(elem,index)" ></i>
                        </div>
                        <div class="clear left elem-border" >
                            <div class="left padding-left-5 require-form" >
                                <el-form-item  >
                                    <el-select @input="computeMoney(elem)" v-model="elem.financeConsumeManageId" placeholder="" style="width:130px;" >
                                      <el-option    label="--" value="" ></el-option>
                                      <el-option  v-for="item in expendManageParams"  :label="item.name" :value="item.id" >
                                        <span v-if="item.isClosed" style="color: #999;">{{item.name}}</span>
                                        <span v-if="!item.isClosed">{{item.name}}</span>
                                      </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-if="elem.autoType == 2 " class="left padding-left-20" >
                                <el-form-item  >
                                    <el-input  require-form  style="width:100px;" title="上限15个字" maxlength="15" v-model.trim="elem.accountNumber" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                             <div v-if="elem.autoType == 1 " class="left padding-left-20" >
                                <el-form-item  >
                                    <el-select v-model="elem.accountNumberSelect" placeholder="" style="width:100px;" >
                                         <el-option    label="--" value="" ></el-option>
                                         <el-option v-for="item in accountNumbers"   :label="item.name" :value="item.id" >
                                      </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="left " >
                                <el-form-item  >
                                    <el-select v-model="elem.autoType" placeholder="" style="width:50px;" >
                                      <el-option    label="自动" value="1" >
                                      </el-option>
                                      <el-option    label="手动" value="2" >
                                      </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="left " >
                                <el-form-item  >
                                    <el-input   style="width:100px;" title="上限10个字" maxlength="10" v-model.trim="elem.accountPasswd" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="left require-form padding-left-20" >
                                <el-form-item  >
                                    <el-select  @input="computeMoney(elem)" v-model="elem.value" placeholder="" style="width:40px;" >
                                      <el-option    label="--" value="" >
                                      </el-option>
                                      <el-option    label="0" value="0" >
                                      </el-option>
                                      <el-option    label="1" value="1" >
                                      </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div :class="{'left':true,'require-form':elem.type == 1, 'padding-left-20':true}" >
                                <el-form-item  >
                                    <el-select @input="computeDay(elem)" v-model="elem.timeStart" placeholder="" style="width:50px;" >
                                      <el-option    label="--" value="" ></el-option>
                                      <el-option v-for="item in dayParams"   :label="item.name" :value="item.id" ></el-option>
                                      
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div :class="{'left':true,'require-form':elem.type == 1, 'padding-left-5':true}" >
                                <el-form-item  >
                                    <el-select @input="computeDay(elem)" v-model="elem.timeEnd" placeholder="" style="width:50px;" >
                                      <el-option    label="--" value="" ></el-option>
                                      <el-option v-for="item in dayParams"   :label="item.name" :value="item.id" ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="left " >
                                <el-form-item  >
                                    <el-input   style="width:60px;" :disabled="true" v-model.trim="elem.days" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="left require-form padding-left-20" >
                                <el-form-item  >
                                    <el-select  @input="computeMoney(elem)"  v-model="elem.type" placeholder="" style="width:60px;" >
                                      <el-option    label="--" value="" >
                                      </el-option>
                                      <el-option    label="按个数" :value="0" >
                                      </el-option>
                                      <el-option    label="按天数" :value="1" >
                                      </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="left require-form" >
                                <el-form-item  >
                                    <el-input   style="width:60px;" title="上限10位数" maxlength="13" @input="moneychangefunc(elem)" v-model.trim="elem.money" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="left padding-left-20" >
                                <el-form-item  >
                                    <el-input style="width:130px;"  title="上限15个字" maxlength="15" v-model.trim="elem.remark" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                        </div>        
                    </div>     
                </div> 
               </el-form>       
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 10px;" >
            <div class="left" style="padding-right:7px;"  >
              <i class="up-page-icon" @click="upPage($event)" ></i>
            </div>
            <div class="left" >
              <i class="down-page-icon" @click="downPage($event)" ></i>
            </div>
          </div>
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
      <div class="clear footerabsoluteclass">
        <div class="left footerabsoluteclasschild" >
          <span class="record-word" style="margin-left:0px;">首次录入:</span>
          <span v-if="form.CreateBy" class="record-word">{{form.CreateBy}}</span>
          <span v-if="form.CreateTime" class="record-word">{{form.CreateTime}}</span>
          <span class="record-word footerpaddingleft10">最后修改:</span>
          <span v-if="form.UpdateBy" class="record-word">{{form.UpdateBy}}</span>
          <span v-if="form.UpdateTime" class="record-word">{{form.UpdateTime}}</span>
        </div>
      </div>
  </div>
</template>
<script>
  import {editorExpend,modifyExpend} from '../../../service/expendData'
  export default {
    props:["layerid",'mytime','myid','mythisindex'],
    data() {
      return {
        expendManageParams:[],
        accountNumbers:[],
        rules:[],
        getId:this.myid,
        time:this.mytime,
        thisindex:this.mythisindex,
        processings:[],
        followId:'',
        form:{
          CreateBy:'',
          CreateTime:'',
          UpdateBy:'',
          UpdateTime:'',
        },
        elem:{
          id: "",
          deleted: 0,
          financeConsumeManageId: "",
          accountNumberSelect:"",
          accountNumber: "",
          accountPasswd: "",
          autoType: "1",
          value: "",
          timeEnd: "",
          timeStart: "",
          days: "",
          type: "",
          money: "",
          remark: "",
       },
        dayParams:[],
        expendManage:[],
        thismymoney:'',
      };
    },
    methods:{
      computeDay(elem){
        let timeEnd = elem.timeEnd;
        let timeStart = elem.timeStart;
        if(timeEnd != '' && timeStart != ''){
          elem.days = timeEnd*1 - timeEnd*1 +1;
        }else{
          elem.days = '';
        }
        this.computeMoney(elem);
      },
      moneychangefunc(item){
        console.log(item);
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(item.money)) {
          if (item.money == undefined || item.money == '') {
            this.thismymoney = '';
            return;
          }
          item.money = this.thismymoney;
        } else {
          this.thismymoney = item.money.replace(/^\./g, "")
        }
      },
      computeMoney(elem){
        let financeConsumeManageId = elem.financeConsumeManageId;
        let valueVal = elem.value;
        let timeEnd = elem.timeEnd;
        let timeStart = elem.timeStart;
        let type = elem.type;
        let rules = this.rules;
        let getValue1 = '';
  			let getValue2 = '';
        let thisRules = rules[financeConsumeManageId];
        if(thisRules){
            getValue1 = thisRules.day;
            getValue2 = thisRules.num;
        }
        if(timeStart != "" && timeEnd  != ""){
  				let days = timeEnd*1 - timeStart*1 +1;
  				elem.days = days;
  				if(type == 1){
  					let value = Math.round(days*(getValue1*1));
  					elem.money = value;
  				}else if(type == 0){
  					let value =  Math.round(getValue2*(valueVal*1));
  						elem.money = value;
  				}else{
  					
  						elem.money = 0;
  				}
   			}else{
   				if(type == 0){
   					let  value =  Math.round(getValue2*(valueVal*1));
   					elem.money = value;
   				}else{
   					dayVal.val("0");
   						elem.money = 0;
   				}
   				if(start == "" || end  == ""){
   					elem.days = 0;
   				}
   			}
      },
      checkNum(elem){
        elem.elem= elem.replace(/[^\d]/g,'');
      },
      addExpend(){
        this.expendManage.push({ 
            id: "",
            deleted: 0,
            financeConsumeManageId: "",
            accountNumber: "",
            accountPasswd: "",
            autoType: "2",
            value: "",
            timeEnd: "",
            timeStart: "",
            days: "",
            type: "",
            money: "",
            financeConsumeManageIsClosed:'0',
            remark: "",
          });
      },
      
      deletedExpend(elem,index){
        let id = elem.id;
        let deleted = elem.deleted;
        let expendManage = this.expendManage;
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
        let id = this.getId;
        let time = this.time;
        let form = {id:id,time:time};
        editorExpend(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            let arrDay = [];
            for(let i = 1; i < 31 ; i++){
              let name = i ;
              if(name < 10){
                name = "0"+ name;
              }
              let obj = {id:i+"",name:name};
              arrDay.push(obj);
            }
            _this.dayParams = arrDay;
            let params = response.data.params;
            let accountNumbers = params.accountNumbers;

            let rules = response.data.rules;
            let manages = params.manages;
            let expendParams = [];
            let expendParamsnew = [];
            _this.rules = rules;
            if(accountNumbers && accountNumbers.length != 0){
              let accountArr = [];
              for(let i = 0 ; i < accountNumbers.length != 0 ; i ++){
                accountArr.push({
                  id:accountNumbers[i],
                  name:accountNumbers[i],
                })
              }
              _this.accountNumbers = accountArr;
            }
            
            manages.forEach(item =>{
              if(rules[item.id]){
                if(item.isClosed == 1){
                  expendParams.push({
                    id:item.id,
                    name:item.name,
                    isClosed:true,
                  });
                  
                }else{
                  expendParams.push({
                    id:item.id,
                    name:item.name,
                    isClosed:false,
                  });
                }
              }
            })
            _this.expendManageParams = expendParams;
            _this.expendManage = data;
            _this.form = response.data.operate;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      checkExpendNameRule(){
        let flag = false;
        let expendManage = JSON.parse(JSON.stringify(this.expendManage));
        let nameMap = {};
        let count = 0;
        expendManage.forEach(item =>{
          if(item.deleted == 0){
            nameMap[item.financeConsumeManageId] = true;
            count ++;
            if(item.financeConsumeManageId == ''){
              this.myAlert("消耗品不能为空！","dangerous-icon");
              flag = true;
              return false;
            }
          }
        })
        let currentCount = 0;
        for(let attr in nameMap){
          currentCount ++;
        }
        if(count != currentCount){
          this.myAlert("消耗品不能重复！","dangerous-icon");
          flag = true;
        }
        return flag;
      },
      checkName1(){
        let flag = false;
        let expendManage = JSON.parse(JSON.stringify(this.expendManage));
        expendManage.forEach(item =>{
          if(item.deleted == 0){
            if(item.autoType != '2' && item.accountNumber == ''){
              this.myAlert("标记/账号不能为空！","dangerous-icon");
              flag = true;
            }
          }
        })
        return flag;
      },
      checkName2(){
        let flag = false;
        let expendManage = JSON.parse(JSON.stringify(this.expendManage));
        expendManage.forEach(item =>{
          if(item.deleted == 0){
            if(item.value == ''){
              this.myAlert("个数不能为空！","dangerous-icon");
              flag = true;
            }
          }
        })
        return flag;
      },
      checkName3(){
        let flag = false;
        let expendManage = JSON.parse(JSON.stringify(this.expendManage));
        expendManage.forEach(item =>{
          if(item.deleted == 0){
            if((item.timeEnd == '' || item.timeStart == '') && item.type == '1'){
               this.myAlert("天数不能为空！","dangerous-icon");
              flag = true;
            }
          }
        })
        return flag;
      },
      checkName4(){
        let flag = false;
        let expendManage = JSON.parse(JSON.stringify(this.expendManage));
        debugger;
        expendManage.forEach(item =>{
          if(item.deleted == 0){
            if(item.money == '' || item.type === ''){
              this.myAlert("金额不能为空！","dangerous-icon");
              flag = true;
            }
          }
        })
        return flag;
      },
      
     
      saveData(){
        let _this = this;
        let expendManage = JSON.stringify(_this.expendManage);
        if(this.checkExpendNameRule()){
          return false;
        }
        if(this.checkName1()){
          return false;
        }
        if(this.checkName2()){
          return false;
        }
        if(this.checkName3()){
          return false;
        }
        if(this.checkName4()){
          return false;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = this.getId;
        let time = this.time;
        let form = {consumeTree:expendManage,id:id,time:time};
        modifyExpend(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
             _this.myAlert("数据保存成功",'success-icon').then(res => {
		 
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
        let callbackdata = this.$parent.changeTitle(count - 1,needlayerid,1);
        this.getId = callbackdata.row.id;
        this.time = callbackdata.row.time;
        this.thisindex = callbackdata.thisindex;
        this.getExpendData();
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
        let callbackdata = this.$parent.changeTitle(count + 1,needlayerid,2);
        this.getId = callbackdata.row.id;
        this.time = callbackdata.row.time;
        this.thisindex = callbackdata.thisindex;
        this.getExpendData();
      },
    },
    mounted(){
       this.getExpendData(); 
    },
    watch: {
      'elem.money':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.elem.money = undefined;
            return;
          }
          this.elem.money = oldval
        } else {
          this.elem.money = newval.replace(/^\./g, "")
        }
      },
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisrowid == _this.getId){
          _this.$store.state.layerifranme.splice(index,1);
        }
      })
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
    .padding-left-5{
      padding-left:5px;
    }

    .padding-left-10{
      padding-left:10px;
    }
    .padding-left-20{
      padding-left:20px;
    }
  }
  .click-check{
    background:#D7E8FC !important;
  }
</style>
