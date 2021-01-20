<template>
  <div style="width:100%;margin:0 10px;" >
    <div class="pop-up"  >
      <div class="pop-up-container clear" style="height: 464px;">
        <el-form :model="form" :rules="rules" ref="formsDatas" class="demo-ruleForm cr" style="margin-top:5px;width:100%;">
            <div class="clear " >
              <div class="clear width_a" >
                <div class="clear left time"  >
                  <div class="left  padding-r-2"style="width:65px;text-align:right;" >
                    <span class="word require-word" >报备时间</span>
                  </div>
                  <div class="left  padding-r-2" > 
                    <el-form-item  prop="timeStart" >
                        <el-date-picker type="datetime" style="width:150px;"  v-model="form.reportDate"  :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" ></el-date-picker>
                        
                    </el-form-item>
                  </div>   
                </div>
                
                <div class="left  padding-r-2" style="width:134px;text-align:right;" >
                  <span class="word " >报备剩余</span>
                </div>  
                <div class="left  padding-r-2" >
                  <el-form-item   prop="as" >
                    <el-input v-model="form.asurplus1" :disabled="true"  style="width:150px;"></el-input>
                  </el-form-item>
                </div> 
                <div class="left  padding-r-2" style="width:95px;text-align:right;" >
                  <span class="word " >报备截止</span>
                </div>  
                <div class="left  padding-r-2" >
                  <el-form-item   prop="as" >
                    <el-input v-model="form.asurplus2" :disabled="true"   style="width:150px;"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <div class="clear" >
                    <div class="left  padding-r-2" style="width:65px;text-align:right;" >
                      <span class="word require-word" >项目名称</span>
                    </div>
                    <div class="left  padding-r-2"  >
                      <el-form-item   prop="pname" >
                        <el-input v-model="form.projectName" :disabled="true" class="fll" style="width: 150px;"></el-input>
                      </el-form-item>
                    </div>
                    <div class="left" >
                        <i class="xiang fll"  @click="checkProject"></i>
                    </div>
                  </div>  
                  <div class="clear width_a"  >
                    <div class="left  padding-r-2" style="width:65px;text-align:right;" >
                      <span class="word require-word" >客户名称</span>
                    </div>
                    <div class="left  padding-r-2" >
                      <el-form-item  prop="cname" >
                        <el-input v-model="form.customerName" :disabled="true"  style="width: 150px;"></el-input>
                      
                      </el-form-item>
                    </div>  
                    <div class="left" >
                      <i class="ke fll" style="margin-left: 0px;" @click="choosecus"></i>
                    </div>  
                  </div>
                  <div class="clear width_a" >
                    <div class="left  padding-r-2" style="width:65px;text-align:right;" >
                      <span class="word require-word" >平台公司</span>
                    </div>
                    <div class="left  padding-r-2" >
                      <el-form-item  prop="pacampany" >
                        <el-select v-if="platformType == 2" :disabled="true" v-model="form.platformCompany" style="width: 150px;color: #828382">
                          <el-option v-for="item in platformsParams"  :label="item.platformName" :value="item.id" ></el-option>
                        </el-select>
                        <el-select v-else v-model="form.platformCompany" @change="pingsper" style="width: 150px">
                          <el-option v-for="item in platformsParams"  :label="item.platformName" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear width_a" >
                    <div class="left  padding-r-2" style="width:65px;text-align:right;" >
                      <span class="word " >销售公司</span>
                    </div> 
                    <div class="left  padding-r-2" >
                      <el-form-item  prop="salcampany">
                        <el-select v-model="form.delegateId" @change="xiaosper" style="width: 150px">
                          <el-option v-for="item in contactCompanyParams"  :label="item.contactCompany" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear width_a" style="padding-bottom:9px;" >
                    <div class="left  padding-r-2" style="width:65px;text-align:right;" >
                      <span class="word require-word" >报备部门</span>
                    </div> 
                    <div class="left  padding-r-2" >  
                      <el-form-item   prop="redepart" >
                        <el-select v-model="form.reportDeptId" style="width: 150px" @change="rpphone">
                          <el-option  v-for="item in reportDepartParams"  :label="item.name" :value="item.id">
                            <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                              <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                              <span v-if="item.state=='常态'">{{item.name}}</span>
                            </span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>   
                  </div>   
                 
                  
                   
                  <div class="break" style="width:100%;margin:2px 10px 2px 10px;" >
                  </div>  
                  <div class="clear_f"  >
                    <div class="left  padding-r-2" style="width:65px;text-align:right;" >
                      <span class="word " >报备编号</span>
                    </div> 
                    <div class="left  padding-r-2" >
                    <el-form-item  class="" prop="num">
                      <el-input v-model="form.reportnum" :disabled="true" placeholder="[自动编号]" style="width: 150px;color: dodgerblue"></el-input>
                    </el-form-item>
                   </div> 
                 </div>
                 <div class="clear" >
                  <div class="left  padding-r-2" style="width:65px;text-align:right;" >
                    <span class="word " >报备状态</span>
                  </div>
                  <div class="left  padding-r-2" style="padding-top:7px;" >
                      <input @change="changeState" v-model="form.reportResult" type="radio" name="ra" value="1">
                  </div> 
                  <div class="left  padding-r-2" > 
                     <span class="word " >有效</span>
                  </div>
                   <div class="left  padding-r-2" style="padding-top:7px;" >
                      <input @change="changeState" v-model="form.reportResult" type="radio" name="ra" value="0">
                  </div> 
                  <div class="left  padding-r-2" > 
                     <span class="word " >失败</span>
                  </div>
                   <div class="left  padding-r-2" style="padding-top:7px;" >
                      <input @change="changeState" v-model="form.reportResult" type="radio" name="ra" value="2">
                  </div> 
                  <div class="left  padding-r-2" > 
                     <span class="word " >等待</span>
                  </div>
                   <div class="left  padding-r-2" style="padding-top:7px;" >
                      <input @change="changeState" v-model="form.reportResult" type="radio" name="ra" value="3">
                  </div> 
                  <div class="left  padding-r-2" > 
                     <span class="word " >无效</span>
                  </div>   
                   
                 </div>
                 
                 <div style="width: 100%">
                    
                  <div class="left  padding-r-2" style="width:65px;text-align:right;" >
                    <span class="word " >报备备注</span>
                  </div>
                  <div class="left  padding-r-2 nomoretime" style="padding-top:5px;" > 
                   <el-form-item  prop="premark1"  >
                       <textarea class="remark" v-model.trim="form.remark" title="上限300个字符" maxlength="300" style="width:180px;height: 120px;vertical-align:top"></textarea>
                   </el-form-item>
                  </div> 
                 </div> 
                </div>
                <div class="left" >
                <div class="clear time" >
                  <div class="left  padding-r-2" style="width:105px;text-align:right;" >
                    <span class="word " >到场剩余</span>
                  </div> 
                  <div class="left  padding-r-2" >
                    <el-form-item  prop="rs" >
                      <el-input v-model="form.rsurplus2" :disabled="true"  style="width: 150px;"></el-input>
                    </el-form-item>
                  </div> 
                  <div class="left  padding-r-2" style="width:95px;text-align:right;" >
                    <span class="word " >到场截止</span>
                  </div> 
                  <div class="left  padding-r-2" >
                    <el-form-item  prop="rs" >
                      <el-input v-model="form.rsurplus2" :disabled="true"  style="width: 150px;"></el-input>
                    </el-form-item>
                  </div> 
                </div>
                  <div class="clear width_a"  >
                  
                  <div class="left  padding-r-2" style="width:105px;text-align:right;" >
                    <span class="word" >客户手机</span>
                  </div>
                  <div class="left  padding-r-2" >
                    <el-form-item  prop="cphone" >
                      <el-input v-model="form.custphone" :disabled="true" style="width: 150px;color: #828382"></el-input>
                    </el-form-item>
                  </div> 

                  <div class="left  padding-r-2" style="width:95px;text-align:right;" >
                    <span class="word" >身份证号</span>
                  </div> 
                  <div class="left  padding-r-2" >
                    <el-form-item   prop="cid" >
                      <el-input v-model="form.custid" :disabled="true" style="width: 150px;color: #828382"></el-input>
                    </el-form-item>
                  </div>  
                </div>
              
                <div class="clear width_a" >
                  <div class="left  padding-r-2" style="width:105px;text-align:right;" >
                    <span  v-if="platformType==1" class="word require-word" >平台人员</span>
                    <span v-else  class="word" >报备联系</span>
                  </div>
                  <div class="left  padding-r-2" >
                    <el-form-item    >
                      <el-select v-if="platformType==2" v-model="form.platformEmpId" style="width: 150px" @change="getPlatformsUserPhone">
                        <el-option v-for="item in platformsUserParams"  :label="item.contactor" :value="item.id" ></el-option>
                      </el-select>
                     
                      <el-select v-else v-model="form.platformEmpId" style="width: 150px" @change="getPlatformsUserPhone">
                        <el-option v-for="item in platformsUserParams"  :label="item.contactEmp" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div> 
                  <div class="left  padding-r-2" style="width:95px;text-align:right;" >
                    <span  v-if="platformType==1" class="word " >平台人员电话</span>
                    <span v-else  class="word" >报备电话</span>
                  </div> 
                  <div class="left  padding-r-2" >
                    
                    <el-form-item  prop="platformEmpPhone" >
                      <el-input v-model="form.platformEmpPhone" :disabled="true" style="width: 150px;color: #828382"></el-input>
                    </el-form-item>
                  </div>  
                </div>
                <div class="clear width_a" >
              
                <div class="left  padding-r-2" style="width:105px;text-align:right;" >
                  <span class="word " >销售人员</span>
                </div> 
                <div class="left  padding-r-2" >  
                  <el-form-item   prop="sapeople" >
                    <el-select v-model="form.delegateEmpId"  @change="xphones" style="width: 150px">
                      <el-option v-for="item in xiaoren"  :label="item.contactEmp" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div> 
                <div class="left  padding-r-2" style="width:95px;text-align:right;" >
                  <span class="word " >销售人电话</span>
                </div> 
                <div class="left  padding-r-2" >  
                  <el-form-item  prop="saphone" >
                    <el-input v-model="form.delegateEmpPhone" :disabled="true" style="width: 150px;"></el-input>
                  </el-form-item>
                </div>  
              </div>
              <div class="clear width_a" >
                
                <div class="left  padding-r-2" style="width:105px;text-align:right;" >
                  <span class="word require-word" >报备人员</span>
                </div>  
                <div class="left  padding-r-2" >   
                  <el-form-item  prop="cphone" >
                    <el-select v-model="form.reportPersonId" style="width: 150px" @change="reportfinal">
                      <el-option v-for="item in reportUsers"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div> 
                <div class="left  padding-r-2" style="width:95px;text-align:right;" >
                  <span class="word " >报备人电话</span>
                </div>  
                <div class="left  padding-r-2" >    
                  <el-form-item   prop="cid"  >
                    <el-input v-model="form.reportPersonPhone" :disabled="true"  abled style="width: 150px;"></el-input>
                  </el-form-item>
                </div>  
              </div>
              
              
              <div class="clear tab-border" style="overflow: auto;height: 276px;width:495px;">
            <el-tabs type="border-card" v-model="activeName"  >
              <el-tab-pane label="带看" name="building" style="postion:relative;" >
                <span slot="label"  >带看</span>
                  <i  class="jia" v-if="form.reportResult == 1" style="position:absolute;top:-20px;z-index:10"   @click="adds(lookList.length)"></i>
                  <div class=""  style="width: 98%;padding-top: 8px;border: 1px solid #999;height: 235px;overflow:auto;" >  
                    <div class=""  v-show="item.deleted==0" v-for="(item,index) in lookList" style="padding-top:8px;" > 
                      <div class="clear">
                        
                        <div class="left clear padding-r-2" style="width:25px;text-align:right;" >
                          
                        
                          <div class="right" style="padding-top:5px;" >    
                          
                            <i  class="jian"  @click="deletedLookThrought(item,index)"></i>
                          </div>  
                        </div> 
                        
                        <div class="left  padding-r-2" >  
                          <el-form-item   prop="date" >     
                            <el-date-picker type="datetime" style="width:125px;" :disabled="true" v-model="item.date" size="mini" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" ></el-date-picker> 
                           
                          </el-form-item> 
                        </div>
                      </div>
                      <div class="clear" > 
                        <div class="left  padding-r-2" style="width:25px;height:20px;text-align:right;" >
                        </div>
                        <div class="left  padding-r-2" style="padding-top:3px;" > 
                          <el-form-item prop="remark" >
                            <textarea class="remark" v-model="item.remark" title="上限100个字符" maxlength="100" style="width:420px;height: 60px;vertical-align:top"></textarea>
                          </el-form-item>
                        </div>  
                      </div>  
                    </div>
                  </div>  
              </el-tab-pane>
              <el-tab-pane label="排卡"  name="pedestal" >
                <span slot="label"  >排卡</span>
                <div class=""  style="width: 98%;padding-top: 8px;border: 1px solid #999;height: 235px;overflow:auto;" > 
                    <div class="clear">
                      
                      <div class="left clear padding-r-2" >
                        <div class="left padding-r-2" style="width:30px;text-align:right;"  >    
                          <span class="word "  >状态</span>
                        </div>
                        <div class="left" >
                           <el-form-item >
                            <el-select  @change="changeCardState"    v-model="card.haveCard"   style="width: 60px;">
                            
                              <el-option value="0" label="不统计"  ></el-option>
                              <el-option value="1" label="统计"  ></el-option>
                            </el-select>
                           </el-form-item>  
                         </div>  
                        <div class="left padding-r-2" style="width:40px;text-align:right;"  >    
                          <span class="word "  >剩余</span>
                        </div>
                        <div class="left  padding-r-2"  >
                          <el-form-item  class="" prop="num">
                            <el-input  v-model="card.openDateOver" :disabled="true" style="width: 150px;"></el-input>
                          </el-form-item>
                        </div>  
                        <div class="left" >
                           <el-form-item >
                            <el-select   :disabled="cardStateDisabled || form.reportResult != 1 || isCardTimeLast"   v-model="card.state"   style="width: 50px;">
                            
                              <el-option value="有效" label="有效"  ></el-option>
                              <el-option value="无效" label="无效"  ></el-option>
                            </el-select>
                           </el-form-item>  
                         </div>
                        
                      </div> 
                    </div>
                    <div class="clear" >
                      <div class="left padding-r-2" style="width:30px;text-align:right;"   >    
                        <span class="word "  >排卡</span>
                      </div>
                      <div class="left  padding-r-2" >  
                        <el-form-item   prop="date" >
                          <el-date-picker type="datetime" style="width:135px;" :disabled="cardStateDisabled || form.reportResult != 1" @change="checkCardTime(1)" v-model="card.cardDate" size="mini" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" ></el-date-picker>
                         </el-form-item> 
                      </div>
                        <div class="left padding-r-2" style="width:30px;text-align:right;"   >    
                        <span class="word "  >开盘</span>
                      </div>
                      <div class="left  padding-r-2" >  
                        <el-form-item   prop="date" >  
                          <el-date-picker type="datetime" style="width:135px;" :disabled="cardStateDisabled || form.reportResult != 1"  @change="checkCardTime(2)"  v-model="card.openDate"  size="mini" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" ></el-date-picker>
                        </el-form-item> 
                      </div>
                    </div>  
                    <div class="clear" > 
                      <div class="left  padding-r-2" style="width:30px;text-align:right;"  >    
                      <span class="word " >备注</span>
                      </div>   
                      <div class="left  padding-r-2" style="padding-top:3px;" > 
                        <el-form-item prop="remark" >
                          <textarea class="remark" v-model="card.remark" title="上限100个字符" maxlength="100" style="width:392px;height: 60px;vertical-align:top"></textarea>
                        </el-form-item>
                      </div>  
                    </div>  
                  </div>
              </el-tab-pane>
              
            </el-tabs> 
          </div>
                </div>
              </div>  
            </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
      </div>
    </div>
   
  </div>
</template>

<script>
  import {departTree} from '../../../service/getdepartData'
  import {findUserByDepartId} from '../../../service/organizeDate'
  import {addreport,reportAddCard,getLoginUserMessage,getDelegates,getPlatformsUser} from '../../../service/reportData'
  import CheckProjectPage   from './cooseproject'
  import CheckCustomerPage   from './choosecuster'
  import {editorPlaformCompany,editorSaleCompany} from '../../../service/newHouse'

  export default {
    name: 'newreport',
    components: {
      CheckProjectPage,
      CheckCustomerPage,
    },
      props:['layerid'],
    data(){
      return{
        dialogpc:false,
        newrepVisible:false,
        projectId:'',
        customerId:'',
        platformType:1, // 合作方式标识 1有平台2无平台
        activeName:'building',
        cardStateDisabled:true, //报备状态为无效时 排卡，备注禁用
        isCardTimeLast:false,//排卡剩余禁用
        reportDepartParams:[],
        reportUsers:[],
        platformsParams:[],
        platformsUserParams:[],
        contactCompanyParams:[],
        xiaoren:[],
        departTree:[],
        cardUser:[],
        defaultUserList:"",
        defaultDepartId:"",
        defaultUserId:[],
        platformStartTime:'',
        pickerOptions: { //大于当前月分的日期不可选
          disabledDate: (time) => {
              return time.getTime() > Date.now();
          }
        },
        card:{
          state:"无效",
          haveCard:"0",
          cardDate:"",
          openDate:"",
          departId:"",
          empId:"",
          openDateOver:"",
          remark:"",
          recordId:"",
          id:"",
        },
        lookList:[],
        elemData:{
          departId:"",
          empId:"",
          date:"",
          remark:"",
          deleted:0,
          dep:[],
          users:[],
        },
        form:{
          reportDate:'',
          projectName:"",
          customerName:"",
          custphone:"",
          custid:"",
          platformCompany:"",
          platformEmpId:"",
          platformEmpPhone:"",
          delegateContactor:"",
          delegateContactorPhone:"",
          delegateId:"",
          delegateEmpId:"",
          delegateEmpPhone:"",
          reportDeptId:"",
          reportPersonId:'',
          reportPersonPhone:"",
          asurplus1:"",
          asurplus2:"",
          rsurplus1:"",
          rsurplus2:"",
          reportnum:"",
          remark:"",
          reportResult:"1",
          bumen:"",
          ren:"",
          date:"",
          arremark:""
        },
        rules:{
         
        }
      }
    },
    methods:{
      changeTab(){

      },
      checkCardTime(type){
        let getCard = JSON.parse(JSON.stringify(this.card));
        let cardDate = getCard.cardDate;
        let openDate = getCard.openDate;
        let reportDate = this.form.reportDate;
        if(!cardDate){
          getCard.getCard = "";
        }
        if(!openDate){
          getCard.openDate = "";
        }
        if(type == 1){
          if(reportDate && cardDate){
            let time1 = new Date(reportDate).getTime();
            let time2 = new Date(cardDate).getTime();
            if(time2 < time1){
              this.myAlert("排卡时间必须大于报备时间！",'dangerous-icon');
              
            }
          }
        }
        
        if(openDate){
          let openTime1 = new Date(openDate).getTime();
          let currentTime = new Date().getTime();
          if(currentTime < openTime1){
            let lastTime = openTime1 - currentTime;
            let getTime = this.SecondToDate(lastTime/1000);
            this.card.openDateOver = getTime;
            this.isCardTimeLast = false;
            this.card.state ="有效";
          }else{
            this.card.openDateOver = "0分钟";
            this.card.state ="无效"
            this.isCardTimeLast = true;
          }
        }else{
            this.card.openDateOver = "";
            this.isCardTimeLast = true;
        }
        if(cardDate && openDate ){
            let cardTime = new Date(cardDate).getTime();
            let openTime = new Date(openDate).getTime();
            if(cardTime > openTime){
              this.myAlert("开盘时间必须大于排卡时间！",'dangerous-icon');  
              return false;
            }
        }
        if(!cardDate){
          this.card.openDateOver = "";
          this.card.state ="无效";
          this.isCardTimeLast = true;
        }
      },
      SecondToDate(msd) {
        let  time =msd;
        if (null != time && "" != time) {
            if (time > 60 && time < 60 * 60) {
                time = parseInt(time / 60.0) + "分钟" 
            }else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                    parseInt(time / 3600.0)) * 60) + "分钟" 
            }else if (time >= 60 * 60 * 24) {
                time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
                    parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
                    parseInt(time / 3600.0)) * 60) + "分钟"
            }
        }
        return time;
      },
      changeCardState(){
        let haveCard = this.card.haveCard;
        if(haveCard == 0){
          this.cardStateDisabled = true;
          this.card.state = "无效";
        }else{
          this.cardStateDisabled = false;
          this.card.state = "有效";
        }
      },
      changeState(){
        let reportResult = this.form.reportResult;
        if(reportResult != 1){
          let arr = [];
          this.lookList.forEach(item => {
             item.deleted = 1;
             arr.push(item);
          })
          this.lookList = arr;
        }else{
          let arr = [];
          this.lookList.forEach(item => {
             item.deleted = 0;
             arr.push(item);
          })
          this.lookList = arr;
        }

        if(reportResult == 3){
          this.card.state = '无效';
        }
      },
      curentTime(){
          var now = new Date();
          var year = now.getFullYear();       //年
          var month = now.getMonth() + 1;     //月
          var day = now.getDate();            //日

          var hh = now.getHours();            //时
          var mm = now.getMinutes();          //分
          var ss = now.getSeconds();
          var clock = year+"-";
          if(month < 10)
            clock += "0";
          clock += month + "-";
          if(day < 10)
            clock += "0";
          clock += day + " ";
          if(hh < 10)
            clock += "0";
          clock += hh + ":";
          if (mm < 10) clock += '0';
          clock += mm + ":";
          if (ss < 10) clock += '0';
          clock += ss;

          return clock;
      },
      shownewre(){
        let _this=this
        this.newrepVisible=true
        departTree(1,'常态','主').then(function (res) {
          let arr = [];
          res.data.forEach(item=>{
            arr.push({
              id:item.id,
              name:item.label,
              level:item.level,
              state:item.state,
            })
          })
          _this.reportDepartParams=arr;
          _this.departTree = arr;
        })
        _this.elemData.date = _this.curentTime();
      },
      
      //gei报备人赋值
      rpphone(){
        let _this=this
        let id = this.form.reportDeptId;
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let user = response.data.user;
            let userArr = [];
            user.forEach(item => {
              if(item.doBusiness == 1){
                userArr.push(item);
              }
            })
             _this.reportUsers = userArr;
             _this.form.reportPersonId = "";
             _this.form.reportPersonPhone = "";
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        })
      },
      //...
      reportfinal(){
        let sp=this.form.reportPersonId
        if(this.reportUsers){
          for(var i=0;this.reportUsers.length>i;i++){
            if(sp==this.reportUsers[i].id){
              this.form.reportPersonPhone=this.reportUsers[i].phone
            }
          }
        }

      },
      

      //jia
      adds(i){
        let _this=this
        var  obj=JSON.parse(JSON.stringify(this.elemData))
        this.lookList.unshift(obj)
       
      },
      deletedLookThrought(row,index1){
        let lookList = this.lookList;
        let arr = [];
        lookList.forEach((item,index) => {
          if(index1 != index){
            arr.push(item);
          }
        })
        this.lookList = arr;
      },
      
      //选择项目
      checkProject(){
        let _this = this;
        let projectId = this.projectId;
        let test = _this.$layer.iframe({
          content: {
            content: CheckProjectPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{projectId:projectId}//props
          },
          area:['600px','450px'],
          title: "选择项目",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });
      },
      //选人
      choosecus(){
         let _this = this;
        let customerId = this.customerId;
        let test = _this.$layer.iframe({
          content: {
            content: CheckCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{customerId:customerId}//props
          },
          area:['600px','450px'],
          title: "选择客源",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });
      },
      //客户赋值
      cusr(i){
        this.customerId=i.id;
        this.form.customerName=i.name;
        this.form.custphone=i.phoneNum;
        this.form.custid=i.idCard;
      },
      //项目赋值
      prona(projectData){
        let _this = this;
        this.form.projectName = projectData.projectName
        this.projectId = projectData.id;
        let reportDate = this.form.reportDate;
        //加载动画
        _this.$layer.loading({
          shade:true,
        })
        let form = {id:projectData.id,reportDate:reportDate,};

        getDelegates(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let delegateCList = response.data.delegateCList;
            let platformStartTime = response.data.platformStartTime;
            if(platformStartTime){
              _this.platformStartTime = platformStartTime;
            }else{
              _this.platformStartTime = "";
            }
            let cooperationMode = response.data.houseDelegate.cooperationMode;
            let platforms = response.data.platforms;
            _this.contactCompanyParams = delegateCList;
            _this.platformsParams = platforms;
            
            _this.form.platformEmpId = "";
            _this.form.platformEmpPhone = "";
            if(cooperationMode == 1){
              _this.platformType=1;
              _this.form.platformCompany = "";
              
            }else{
              
              _this.platformType=2;
              _this.form.platformCompany="无平台";
              _this.pingsper();
            }
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangouser-icon');
          }
        })
      },
      //获取平台人
      pingsper(){
        let _this=this;
        let id="";
        let platformType = this.platformType;
        let noPlatform = 1;
        if(platformType == 1){
          let ids=this.form.platformCompany;
          for(var i=0;this.platformsParams.length>i;i++){
            if(this.platformsParams[i].id==ids){
                id=this.platformsParams[i].platformId
            }
          }
        }else{
          id = this.projectId;
          noPlatform = 2;
        }
        
        //加载动画
        _this.$layer.loading({
          shade:true,
        })
        let form = {id,noPlatform};
        getPlatformsUser(form).then(function (response) {
           _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let emps = response.data.emps;
            _this.platformsUserParams = emps;
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangouser-icon');
          }
          
        })
      },
      //平台电话
      getPlatformsUserPhone(){
        let platformEmpId = this.form.platformEmpId;
        let platformsUserParams = this.platformsUserParams;
        debugger;
        if(platformsUserParams && platformsUserParams.length != 0){
          platformsUserParams.forEach(item => {
            if(item.id == platformEmpId){
              this.form.platformEmpPhone = item.contactPhone;
            }
          })
        }else{
          this.form.platformEmpPhone = "";
        }
        
        
      },
      //获取销售人
      xiaosper(){
        let _this=this
        let id=this.form.delegateId
        editorSaleCompany(id).then(function (res) {
          
          _this.xiaoren=res.data.emps
        })
      },
      //获取销售电话
      xphones(){
        let sp=this.form.delegateEmpId
        if(this.xiaoren){
          for(var i=0;this.xiaoren.length>i;i++){
             if(sp==this.xiaoren[i].id){
               this.form.delegateEmpPhone=this.xiaoren[i].contactPhone
             }
          }
        }
      },
     
     
     //保存
      saveFormData(){
       
        let _this=this
        let reportDate=this.form.reportDate.toString()
        let projectId=this.projectId
        let customerId=this.customerId
        let customerPhone=this.form.custphone
        let customerCard=this.form.custid
        let platformId="";
        let platformType = this.platformType;
        if(platformType == 2){
          platformId=-1
        }else{
          platformId=this.form.platformCompany
        }

        let platformEmpId=this.form.platformEmpId;
        let platformEmpPhone=this.form.platformEmpPhone;
        let delegateContactor = this.form.delegateContactor;
        let delegateContactorPhone = this.form.delegateContactorPhone;
        let delegateId=this.form.delegateId
        let delegateEmpId=this.form.delegateEmpId
        let delegateEmpPhone= this.form.delegateEmpPhone
        let reportDeptId= this.form.reportDeptId
        let reportPersonId= this.form.reportPersonId
        let reportPersonPhone= this.form.reportPersonPhone
        let arriveDays=""
        let arriveDuration=""
        let reportDays=""
        let reportDuration=""
        let reportNum= this.form.reportnum
        let remark= this.form.remark
        let reportResult= this.form.reportResult
        let emps=JSON.stringify(this.lookList);
        let projectName = this.form.projectName;
        let customerName = this.form.customerName;
        let platformCompany = this.form.platformCompany;
        let times = this.form.reportDate;
        let state = this.card.state;
        let lookList = this.lookList;
        let platformStartTime = this.platformStartTime;
        if(projectName == ''){
          this.myAlert("项目名称不能为空！",'dangerous-icon');
          return false;
        }
        if(customerName == ''){
          this.myAlert("客户名称不能为空！",'dangerous-icon');
          return false;
        }
        if(platformCompany == ''){
          this.myAlert("平台公司不能为空！",'dangerous-icon');
          return false;
        }
        if(platformType == 1){
          if(platformEmpId == ''){
            this.myAlert("平台人员不能为空！",'dangerous-icon');
            return false;
          }
        }else{
          if(platformEmpId == ''){
            this.myAlert("报备联系人不能为空！",'dangerous-icon');
            return false;
          }
        }
        if(reportDeptId == '' || reportDeptId == null){
          this.myAlert("报备部门不能为空！",'dangerous-icon');
          return false;
        }
        if(reportPersonId == '' || reportPersonId == null){
          this.myAlert("报备人员不能为空！",'dangerous-icon');
          return false;
        }
        if(reportDate == ''){
          this.myAlert("报备时间不能为空！",'dangerous-icon');
          return false;
        }
        
        if(platformStartTime && reportDate){
          let time1 = new Date(platformStartTime).getTime();
          let time2 = new Date(reportDate).getTime();
          if(time1 > time2){
             this.myAlert("没有该报备时间段的平台规则，请修改报备时间！","dangerous-icon");
             return false;
          }
        }
        let flag = false;
        lookList.forEach(item => {
          if(item.deleted == 0){
            let date = item.date;
            let remark = item.remark;
            if(!date){
              _this.myAlert("带看日期不能为空！",'dangerous-icon');
              flag = true;
              return false;
            }
            if(!remark){
              _this.myAlert("带看内容不能为空！",'dangerous-icon');
               flag = true;
              return false;
            }
          }

        })
        if( flag ){
          return false;
        }
        let getCard = JSON.parse(JSON.stringify(this.card));
        let cardDate = getCard.cardDate;
        let openDate = getCard.openDate;
        let haveCard = getCard.haveCard;
        if(!cardDate){
          getCard.getCard = "";
        }
        if(!openDate){
          getCard.openDate = "";
        }
        if(haveCard == '1'){
          if(!cardDate){
             _this.myAlert("排卡时间不能为空！",'dangerous-icon');  
              return false;
          }
          if(!openDate){
             _this.myAlert("开盘时间不能为空！",'dangerous-icon');  
              return false;
          }
        }
        if(reportResult == 1){
          if(cardDate  && openDate ){
              let cardTime = new Date(cardDate).getTime();
              let openTime = new Date(openDate).getTime();
              if(cardTime > openTime){
                _this.myAlert("开盘时间必须大于排卡时间！",'dangerous-icon');  
                return false;
              }
          }
        } 
        let openDateOver = this.card.openDateOver;
        if(state == '有效' &&(openDateOver == '0分钟' || openDateOver == '')){
           _this.myAlert("排卡剩余为0分钟,排卡剩余状态不能为有效！",'dangerous-icon');  
          return false;
        } 
        if(reportDate && cardDate){
          let time1 = new Date(reportDate).getTime();
          let time2 = new Date(cardDate).getTime();
          if(time2 < time1){
            this.myAlert("排卡时间必须大于报备时间！",'dangerous-icon');
            return false;
          }
        }
        let card = JSON.stringify([getCard]);
        addreport(arriveDays,arriveDuration,customerCard,customerId, customerPhone
          ,delegateEmpId,delegateEmpPhone,delegateId,emps,platformEmpId,platformEmpPhone, platformId,
          projectId,remark,reportDate,reportDays,reportDeptId,reportDuration,reportNum,reportPersonId,
          reportPersonPhone,reportResult, delegateContactor,
          delegateContactorPhone,card).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("保存成功！", 'success-icon').then(res => {
              _this.$parent.searchReport();
               _this.cancelData();
            }).catch(err => {

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
      this.shownewre();
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

<style scoped>
  /deep/.time .el-input--mini .el-input__icon{
    background: url(/static/images/icon.3def815.png) -137px -80px!important;
  }
  .el-picker-panel__footer .el-button{
    height:0px !important;
  }
  .tab-border{
   
    border-width: 2px;
    border-width: 2px 0 0 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png") 2 repeat;
    margin: 10px 0 0 10px;
    padding:10px 0 0 10px;
  }
  .jia{
    background:url(../../../images/qiet.png) -213px -174px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .jian{
    background:url(../../../images/qiet.png) -242px -174px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .xiang {
    background: url(../../../images/xiangmu.png) 0px  4px no-repeat;
    width: 22px;
    height: 23px;
    display: block;
  }
  .ke {
    background: url(../../../images/qiet.png) -365px -140px;
    width: 23px;
    height: 22px;
    display: block;
  }
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .word{
    font-size:12px;
    line-height:27px;
    display:inline-block;
  }
  .padding-r-2{
    padding-right:2px;
  }
  .left-content{
    border-width:0px;
    border-right-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
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
