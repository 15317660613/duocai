<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="height: 164px;">
          <div class="move-content">
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:1px 0 0;" >

                <div class="clear" style="padding-top:5px;" >
                  <div class="left padding-r-3" style="width:65px;text-align:right;">
                      <span class="word "  >消耗品</span>
                  </div>

                    <div class="left require-form">
                        <el-form-item  >
                            <el-select @input="computeMoney(form)" v-model="form.financeConsumeManageId" placeholder="" style="width:120px;" >
                                <el-option    label="--" value="" ></el-option>
                                <el-option v-for="item in expendManageParams"   :label="item.name" :value="item.id" >
                                  <span v-if="item.isClosed" style="color: #999;">{{item.name}}</span>
                                  <span v-if="!item.isClosed">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                  </div>
                  <div class="clear">
                    <div class="left padding-r-3" style="width:65px;text-align:right;" >
                        <span class="word "  >标记/账号</span>
                    </div>
                    <div v-if="form.autoType == 2 " class="left padding-left-20" >
                            <el-form-item  >
                                <el-input  require-form  style="width:100px;" title="上限15个字" maxlength="15" v-model.trim="form.accountNumber" autocomplete="off"></el-input>
                            </el-form-item>
                    </div>
                    <div v-if="form.autoType == 1 " class="left padding-left-20" >
                        <el-form-item  >
                            <el-select v-model="form.accountNumber" placeholder="" style="width:100px;" >
                                    <el-option    label="--" value="" ></el-option>
                                    <el-option v-for="item in accountNumbers"   :label="item.name" :value="item.id" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="left " >
                        <el-form-item  >
                            <el-select v-model="form.autoType" placeholder="" style="width:50px;" >
                                <el-option    label="自动" value="1" >
                                </el-option>
                                <el-option    label="手动" value="2" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="left padding-r-3" style="width:90px;text-align:right;" >
                        <span class="word "  >权限/密码</span>
                    </div>
                     <div class="left " >
                        <el-form-item  >
                            <el-input   style="width:100px;" title="上限10个字" maxlength="10" v-model.trim="form.accountPasswd" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </div>

                <div class="clear" >
                     <div class="left padding-r-3" style="width:65px;text-align:right;" >
                        <span class="word "  >个数</span>
                    </div>
                    <div class="left require-form " >
                        <el-form-item  >
                            <el-select  @input="computeMoney(form)" v-model="form.value" placeholder="" style="width:120px;" >
                                <el-option    label="--" value="" >
                                </el-option>
                                <el-option    label="0" value="0" >
                                </el-option>
                                <el-option    label="1" value="1" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                     <div class="left padding-r-3" style="width:80px;text-align:right;" >
                        <span class="word "  >天数</span>
                    </div>
                    <div :class="{'left':true,'require-form':form.type == 1, 'padding-left-20':true}" >
                        <el-form-item  >
                            <el-select @input="computeDay(form)" v-model="form.timeStart" placeholder="" style="width:50px;" >
                                <el-option    label="--" value="" ></el-option>
                                <el-option v-for="item in dayParams"   :label="item.name" :value="item.id" ></el-option>
                                
                            </el-select>
                        </el-form-item>
                    </div>
                    <div :class="{'left':true,'require-form':form.type == 1, 'padding-left-5':true}" >
                        <el-form-item  >
                            <el-select @input="computeDay(form)" v-model="form.timeEnd" placeholder="" style="width:50px;" >
                                <el-option    label="--" value="" ></el-option>
                                <el-option v-for="item in dayParams"   :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="left " >
                        <el-form-item  >
                            <el-input   style="width:60px;" disabled="true" v-model.trim="form.days" autocomplete="off"></el-input>
                        </el-form-item>
                    </div> 
                     <div class="left padding-r-3" style="padding-left:2px;" >
                        <span class="word "  >天</span>
                    </div>
                </div>
                <div class="clear"  >
                     <div class="left padding-r-3" style="width:65px;text-align:right;" >
                        <span class="word "  >规则</span>
                    </div>
                    <div class="left require-form padding-left-20" >
                        <el-form-item  >
                            <el-select  @input="computeMoney(form)"  v-model="form.type" placeholder="" style="width:120px;" >
                                <el-option    label="--" value="" >
                                </el-option>
                                <el-option    label="按个数" :value="0" >
                                </el-option>
                                <el-option    label="按天数" :value="1" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                     <div class="left padding-r-3" style="width:80px;text-align:right;" >
                        <span class="word "  >金额</span>
                    </div>
                    <div class="left require-form" >
                        <el-form-item  >
                            <el-input   style="width:120px;" title="上限10位数" maxlength="13" v-model.trim="form.money" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                    <div class="left padding-r-3" style="padding-left:2px;" >
                        <span class="word "  >元</span>
                    </div>
                </div>    
                <div class="clear"  >
                  <div class="left padding-r-3" style="width:65px;text-align:right;" >
                    <span class="word"  >备注</span>
                  </div>
                  <div class="left" style="padding-top:7px;" >
                    <el-form-item   prop="remark" >
                      <el-input
                        type="textarea"
                        :rows="1"
                        style="width:370px;resize: none;"
                        maxLength="15"
                        title="上限15个字"
                        class="remark"
                        v-model="form.remark">
                      </el-input>
                    </el-form-item>
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
      <div class="clear footerabsoluteclass">
        <div class="left footerabsoluteclasschild" >
          <span class="record-word footerpaddingleft10">最后修改:</span>
          <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
          <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
        </div>
      </div>
   
  </div>
</template>
<script>

  import {editorExpendDay,modifyExpendDay} from '../../../service/expendData'
  export default {
    props:["layerid",'getId','getTime'],
    data() {
      return {
        expendManageParams:[],
        accountNumbers:[],
        rules:[],
        id:0,
        processings:[],
        followId:'',
        form:{
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
            remark: "",
            updateBy:'',
            updateTime:'',
        },
      };
    },
    components:{
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
     
     
      //获取跟进参数
      getExpendData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = this.getId;
        let time = this.getTime;
        let form = {id:id,time:time};
        editorExpendDay(form).then(function(response) {
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
            _this.rules = rules;
            _this.accountNumbers = accountNumbers;
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
            let tree = response.data.tree;
            for(let attr in tree){
                if(tree[attr] == null){
                    tree[attr] = '';
                }
            }
            _this.form = tree;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      checkExpendNameRule(){
        let flag = false;
        let form = JSON.parse(JSON.stringify(this.form));
        let nameMap = {};
        if(form.financeConsumeManageId == ''){
            this.myAlert("消耗品不能为空！","dangerous-icon");
            flag = true;
            return false;
        }

        return flag;
      },
      checkName1(){
        let flag = false;
        let form = JSON.parse(JSON.stringify(this.form));
       
        if(form.autoType != '2' && form.accountNumber == ''){
            this.myAlert("标记/账号不能为空！","dangerous-icon");
            flag = true;
        }
        return flag;
      },
      checkName2(){
        let flag = false;
        let form = JSON.parse(JSON.stringify(this.form));
        
        if(form.value == ''){
            this.myAlert("个数不能为空！","dangerous-icon");
            flag = true;
        }
        return flag;
      },
      checkName3(){
        let flag = false;
        let form = JSON.parse(JSON.stringify(this.form));
        if((form.timeEnd == '' || form.timeStart == '') && form.type == '1'){
            this.myAlert("天数不能为空！","dangerous-icon");
            flag = true;
        }
        return flag;
      },
      checkName4(){
        let flag = false;
        let form = JSON.parse(JSON.stringify(this.form));
        if(form.money == '' ){
            this.myAlert("金额不能为空！","dangerous-icon");
            flag = true;
        }
        if(form.type === ''){
            this.myAlert("规则不能为空！","dangerous-icon");
            flag = true;
        }
        return flag;
      },
      
     
      saveData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form));
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
        
        modifyExpendDay(form).then(function(response) {
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
    },
    mounted(){
      this.getExpendData();
    },
    watch:{
      'form.money':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.money = undefined;
            return;
          }
          this.form.money = oldval
        } else {
          this.form.money = newval.replace(/^\./g, "")
        }
      },
      
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
