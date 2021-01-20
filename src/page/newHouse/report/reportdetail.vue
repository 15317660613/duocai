<template>
  <div style="margin:0 10px;width:100%;" >
    <div class="pop-up"  >
      <div class="pop-up-container clear" style="height: 460px;">
        <el-form :model="form" ref="formsDatas"  class="demo-ruleForm cr" style="margin-top:5px;">
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
                  <div class="clear width_a" style="padding-botom:8px;" >
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
                      <el-input v-model="form.reportNum" :disabled="true" style="width: 150px;color: dodgerblue"></el-input>
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
                   <div class="clear width_a"  >
                  
                  <div class="left  padding-r-2" style="width:105px;text-align:right;" >
                    <span class="word" >客户手机</span>
                  </div>
                  <div class="left  padding-r-2" >
                    <el-form-item  prop="cphone" >
                      <el-input v-model="form.customerPhone" :disabled="true" style="width: 150px;color: #828382"></el-input>
                    </el-form-item>
                  </div> 

                  <div class="left  padding-r-2" style="width:95px;text-align:right;" >
                    <span class="word" >身份证号</span>
                  </div> 
                  <div class="left  padding-r-2" >
                    <el-form-item   prop="cid" >
                      <el-input v-model="form.customerCard" :disabled="true"  style="width: 150px;color: #828382"></el-input>
                    </el-form-item>
                  </div>  
                </div>
              
                <div class="clear width_a" >
                  <div class="left  padding-r-2" style="width:105px;text-align:right;" >
                    <span  v-if="platformType==1" class="word require-word" >平台人员</span>
                    <span v-else  class="word require-word" >报备联系</span>
                  </div>
                  <div class="left  padding-r-2" >
                    <el-form-item    >
                      <el-select v-if="platformType==2" v-model="form.platformEmpId" style="width: 150px" @change="getPlatformsUserPhone(1)">
                        <el-option v-for="item in platformsUserParams"  :label="item.contactor" :value="item.id" ></el-option>
                      </el-select>
                      <el-select v-else v-model="form.platformEmpId" style="width: 150px" @change="getPlatformsUserPhone(2)">
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
                      <el-option v-for="item in reportUsers"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                    </el-select>
                  </el-form-item>
                </div> 
                <div class="left  padding-r-2" style="width:95px;text-align:right;" >
                  <span class="word " >报备人电话</span>
                </div>  
                <div class="left  padding-r-2" >    
                  <el-form-item   prop="cid"  >
                    <el-input v-model="form.reportPersonPhone" :disabled="true"  style="width: 150px;"></el-input>
                  </el-form-item>
                </div>  
              </div>
              
              <div class="clear time" >
                <div class="left  padding-r-2" style="width:105px;text-align:right;" >
                  <span class="word " >到场剩余</span>
                </div> 
                <div class="left  padding-r-2" >
                  <el-form-item  prop="rs" >
                    <el-input v-model="form.arriveDuration" :disabled="true"  style="width: 150px;"></el-input>
                  </el-form-item>
                </div> 
                <div class="left  padding-r-2" style="width:95px;text-align:right;" >
                  <span class="word " >到场截止</span>
                </div> 
                <div class="left  padding-r-2" >
                  <el-form-item  prop="rs" >
                    <el-input v-model="form.arriveDays" :disabled="true"  style="width: 150px;"></el-input>
                  </el-form-item>
                </div> 
              </div>
              <div class="clear tab-border" style="height: 245px;width:495px;">
            <el-tabs type="border-card" v-model="activeName" >
              <el-tab-pane label="带看" name="building" >
                <span slot="label"  >带看</span>
                 <i  class="jia" v-if="form.reportResult == 1" style="position:absolute;top:-20px;z-index:10"   @click="adds(lookList.length)"></i>
                 <div class=""  style="width: 98%;padding-top: 8px;border: 1px solid #999;height: 230px;overflow:auto;" >  
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
                <div class=""  style="width: 98%;padding-top: 8px;border: 1px solid #999;height: 230px;overflow:auto;" > 
                     <div class="clear">
                      
                      <div class="left clear padding-r-2" >
                        <div class="left padding-r-2" style="width:30px;text-align:right;"  >    
                          <span class="word "  >状态</span>
                        </div>
                        <div class="left" >
                           <el-form-item >
                            <el-select    @change="changeCardState"     v-model="card.haveCard"   style="width: 60px;">
                            
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
                            <el-input v-model="card.openDateOver" :disabled="true" style="width: 150px;"></el-input>
                          </el-form-item>
                        </div>  
                        <div class="left" >
                           <el-form-item >
                            <el-select    :disabled="cardStateDisabled || form.reportResult != 1 || isCardTimeLast"    v-model="card.state"   style="width: 50px;">
                            
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
                          <textarea  class="remark" v-model="card.remark" title="上限100个字符" maxlength="100" style="width:392px;height: 60px;vertical-align:top"></textarea>
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
          <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 10px;" >
            <div class="left" style="padding-right:7px;"  >
              <i class="up-page-icon" @click="upPage($event)" ></i>
            </div>
            <div class="left" >
              <i class="down-page-icon" @click="downPage($event)" ></i>
            </div>
          </div>
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
          <div class="right foot-btn" style="padding:0px;border-width:0;margin-right:10px;" >
              <i class="file-icon"  @click="isShowPhotoAndFile" ></i>
          </div>
      </div>
     </div>
    
    <div class="clear footerabsoluteclass">
      <div class="left footerabsoluteclasschild" >
        <span class="record-word" style="margin-left:0px;">首次录入:</span>
        <span v-if="form.createBy" class="record-word">{{form.createBy}}</span>
        <span v-if="form.createTime" class="record-word">{{form.createTime}}</span>
        <span class="record-word footerpaddingleft10">最后修改:</span>
        <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
        <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
      </div>
    </div>
  </div>

</template>

<script>
  import {departparam} from '../../../service/getdepartData'
  import {findUserByDepartId,odeparttree} from '../../../service/organizeDate'
  import {updreport,reportdetailn,getDelegates,getPlatformsUser} from '../../../service/reportData'
  import CheckProjectPage   from './cooseproject'
  import CheckCustomerPage   from './choosecuster'
  import {agenctList} from '../../../service/newHouse'
  import {editorPlaformCompany,editorSaleCompany} from '../../../service/newHouse'
  import {getFilesList3,deletedFiles3,uploadFiles3,updateFileName3} from '../../../service/fileData'
  import FilePage from '../../../components/file'
  export default {
    name: 'reportdetail',
    components: {
      CheckProjectPage,
      CheckCustomerPage,
    },
    props:['reportId','layerid',"thisindex"],
    data(){
      return{
        dialogpc:false,
        getReportId:this.reportId,
        detreportVisible:false,
        cardStateDisabled:false, //报备状态为无效时 排卡，备注禁用
        projectId:'',
        customerId:'',
        activeName:'building',
        isCardTimeLast:false,
        id:"",
        nes1:[],
        nes2:[],
        platformType:1,
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
        reportResult:'',//保存报备初始化状态；
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
        },
        lookList:[{
          departId:"",
          empId:"",
          date:"",
          remark:"",
          deleted:0,
          dep:[],
          users:[],
        }],
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
          id:"",
          platformId:'',
          reportDate:'',
          projectName:"",
          customerName:"",
          customerPhone:"",
          customerCard:"",
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
          reportDuration:"",
          reportDays:"",
          arriveDuration:"",
          arriveDays:"",
          reportNum:"",
          remark:"",
          reportResult:"1",
          bumen:"",
          ren:"",
          date:"",
          arremark:"",
          createBy:'',
          createTime:'',
          updateBy:'',
          updateTime:'',
        }
      }
    },
    components:{
      FilePage
    },
    methods:{

      changeCardState(init){
        let haveCard = this.card.haveCard;
        if(haveCard == 0){
          this.cardStateDisabled = true;
          this.card.state = "无效";
        }else{
          this.cardStateDisabled = false;
          if(!init){
            this.card.state = "有效";
          }  
        }
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
      isShowPhotoAndFile(){
        // this.$refs.FilePageId.showDialogVisible();
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: FilePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              recordId:this.getReportId,
              getFilesByType:getFilesList3,
              deleteFiles:deletedFiles3,
              uploadFiles:uploadFiles3,
              updateFileName:updateFileName3,
              downLoadFiles:'/first_house/downloadReFiles2',
            }//props
          },
          area:['800px','560px'],
          title: "图照",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },
      redshow(){
        let _this=this;
        let id= this.getReportId;
        reportdetailn(id).then(function (res) {
          if(res.data){
             let arrf = []
            let data = res.data; 
            let platformStartTime = res.data.platformStartTime;
            if(platformStartTime){
              _this.platformStartTime = res.data.platformStartTime;
            }
            for(var i=0;res.data.departTree.length>i;i++){
              arrf.push({
                id:res.data.departTree[i].id,
                name:res.data.departTree[i].label.replace(/&nbsp;/g,""),
                select:res.data.departTree[i].select,
                type:res.data.departTree[i].type,
                state:res.data.departTree[i].state,
              })
            }
            _this.reportDepartParams=arrf;
            _this.platformsParams=res.data.platforms;
            _this.platformsUserParams=res.data.platformEmps
            let ss= res.data.delegateCList
            
            for(var i=0;ss.length>i;i++){
              let aa=_this.nes1.indexOf(ss[i].contactCompany)
              if(aa==-1){
                _this.nes1.push(ss[i].contactCompany)
                _this.nes2.push({ id:ss[i].id,
                  contactCompany:ss[i].contactCompany})
              }
            }

           
            let houseRecord = res.data.houseRecord;
            _this.projectId = houseRecord.projectId;
            _this.customerId = houseRecord.customerId;
            for(let attr in houseRecord){
              if(houseRecord[attr] == null ||  houseRecord[attr] == 'null'){
                houseRecord[attr] = '';
              }else{
                _this.form[attr] = houseRecord[attr];
              }
            } 
            
            _this.reportResult = houseRecord.reportResult;
            _this.reportResultInit = houseRecord.reportResult;
            _this.contactCompanyParams= _this.nes2
            _this.nes1=[]
            _this.nes2=[]
            _this.xiaoren=res.data.delegateCemps
            _this.lookList=res.data.emps
            _this.id=houseRecord.id;
            let cooperationMode = res.data.houseDelegate.cooperationMode;
            if(cooperationMode == 2){
              _this.platformType=2;
              _this.form.platformCompany="无平台";
            }else{
              _this.platformType=1;
               _this.form.platformCompany=houseRecord.platformId;
            }  
            let user = res.data.reportUsers;
            let arr = [];
            if(user && user.length != 0){
              user.forEach(function(item){
                if(item.doBusiness == 1 ) {
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
            }
            _this.reportUsers = arr;
            let departTree = res.data.departTree;
            if(departTree){
              let arr = [];
              let treeData = departTree
              for(let i = 0 ; i < treeData.length; i++){
                arr.push({
                  id:treeData[i].id,
                  label:treeData[i].label.replace(/&nbsp;/g,""),
                  level:treeData[i].level,
                })
              }
              _this.departTree = arr;
            } 
          
            let card = res.data.cards;
            for(let attr in card){
              if(card[attr] == null){
                 card[attr] = '';
              }
            } 
            if(card){
              let users = card.users;
              _this.cardUser = users;
               _this.card = card;
               let state = card.state;
               let openDateOver = card.openDateOver;
               if(state == '无效' && (openDateOver == '' || openDateOver == '0分钟') ){
                 _this.isCardTimeLast = true;
               }
              
            }
            // 排卡状态 否是禁用
            _this.changeCardState(true);
           
          }
          _this.changeState();
          _this.elemData.date = _this.curentTime();
        })
         
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
            let arr = [];
            if(user && user.lengthg != 0){
              user.forEach(function(item){
                if(item.doBusiness == 1 ) {
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                     phone:item.phone,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                }  
                
              })
            }
            
            _this.reportUsers = arr;
            _this.form.reportPersonId = "";
            _this.form.reportPersonPhone = "";
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        })
      },
      //...
      reportfinal(){
        let sp=this.form.reportPersonId;
        let reportUsers = this.this.reportUsers;
         if(reportUsers && reportUsers.length != 0){
          for(var i = 0; reportUsers.length > i; i++ ){
            if( sp== reportUsers[i].id){
              this.form.reportPersonPhone= reportUsers [i].phone;
              break;
            }
          }
        }

      },
      //给人赋值
      pepls(elem){
        let _this=this;
        let id = elem.departId;
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (response) {
          let user = response.data.user;
          let arr = [];
          if(user && user.length != 0){
            user.forEach(function(item){
              if(item.doBusiness == 1 ) {
                arr.push({
                  id: item.id,
                  name: item.name,
                })
              }
            })
          }
          
          elem.users = arr;
          elem.empId = '';
        })
      },
      departFindUser(){
        let _this=this
        let id = this.card.departId;
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
            
            _this.cardUser = userArr;
            _this.card.empId = "";
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        })
      },
      changeState(){
        let reportResult = this.form.reportResult;
        let arriveDuration = this.form.arriveDuration;
        let reportDuration = this.form.reportDuration;
        let reportDate = this.form.reportDate;
        let reportResultInit = this.reportResultInit;
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

        if(reportResult != 3 && reportResultInit == 3){
          if(arriveDuration == "0分钟" || reportDuration == "0分钟"){
              
              this.myAlert("报备剩余或到场剩余已到期，【无效报备】不可修改为其他报备状态!","dangerous-icon").then(res => {
                this.form.reportResult = '3';
              }).catch(err => {
                
              });
              
          }
        }
      },
      //jia
      adds(i){
        let  obj=JSON.parse(JSON.stringify(this.elemData));
        let defaultDepartId = this.defaultDepartId;
        let defaultUserId = this.defaultUserId;
        let defaultUserList = this.defaultUserList;
        let reportDeptId = this.form.reportDeptId;
        let reportPersonId = this.form.reportPersonId;
        let reportUsers = this.reportUsers;
        if(reportPersonId){
          obj.departId = reportDeptId;
          obj.empId = reportPersonId;
          obj.users = reportUsers;
        }else{
          obj.departId = defaultDepartId;
          obj.empId = defaultUserId;
          obj.users = defaultUserList;
        }
        
        this.lookList.unshift(obj)
        
      },
      deletedLookThrought(row,index1){
        let lookList = this.lookList;
        let arr = [];
        lookList.forEach((item,index) => {
          if(item.id){
            if(index1 != index){
              arr.push(item);
            }else{
              item.deleted = 1;
              arr.push(item);
            }
          }else{
            if(index1 != index){
              arr.push(item);
            }
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
        this.customerId=i.id
        this.form.customerName=i.name
        this.form.customerPhone=i.phoneNum
        this.form.customerCard=i.idCard
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
          _this.xiaoren=res.data.emps;
          _this.form.delegateEmpId = "";
          _this.form.delegateEmpPhone = "";
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
        let projectId=this.projectId;
        let customerId=this.customerId;
        let customerPhone=this.form.customerPhone
        let customerCard=this.form.customerCard
        let platformId="";
        let platformType = this.platformType;
        let platformCompany = this.form.platformCompany;
        if(platformType == 2){
          platformId= this.form.platformId;
        }else{
          platformId=this.form.platformCompany;
        }
       
        let platformEmpPhone=this.form.platformEmpPhone
        let delegateContactor = this.form.delegateContactor;
        let delegateContactorPhone = this.form.delegateContactorPhone;
        let delegateId=this.form.delegateId
        let delegateEmpId=this.form.delegateEmpId
        let delegateEmpPhone= this.form.delegateEmpPhone
        let reportDeptId= this.form.reportDeptId
        let reportPersonId= this.form.reportPersonId
        let reportPersonPhone= this.form.reportPersonPhone
        let id=this.id
        let arriveDays=_this.form.arriveDays
        let arriveDuration=_this.form.arriveDuration
        let reportDays=_this.form.reportDays
        let reportDuration=_this.form.reportDuration
        let reportNum= this.form.reportNum
        let remark= this.form.remark
        let reportResult= this.form.reportResult;
        let reportResultInit = this.reportResult;
        let emps=JSON.stringify(this.lookList)
        let projectName = this.form.projectName;
        let customerName = this.form.customerName;
        let platformEmpId = this.form.platformEmpId;
        let lookList = this.lookList;
        let state = this.card.state;
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
          if(cardDate  && openDate){
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
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        updreport(id,arriveDays,arriveDuration,customerCard,customerId, customerPhone
          ,delegateEmpId,delegateEmpPhone,delegateId,emps,platformEmpId,platformEmpPhone, platformId,
          projectId,remark,reportDate,reportDays,reportDeptId,reportDuration,reportNum,reportPersonId,
          reportPersonPhone,reportResult, delegateContactor,
          delegateContactorPhone,card).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              _this.myAlert("保存成功！", 'success-icon').then(res => {
                _this.$parent.searchReport();
                _this.cancelData();
              }).catch(err => {

              })
            
            } else if (response.status == 1){
              _this.myAlert(response.msg,'dangouser-icon');
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
        let callbackdata = this.$parent.changeTitle(count,needlayerid,1);
        this.thisindex = callbackdata.thisindex;
        this.getReportId = callbackdata.rowid;
        this.redshow();
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
        let callbackdata = this.$parent.changeTitle(count,needlayerid,2);
        this.thisindex = callbackdata.thisindex;
        this.getReportId = callbackdata.rowid;
        this.redshow();
      },
    },
    mounted(){
      this.redshow();
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisrowid == _this.getReportId){
          _this.$store.state.layerifranme.splice(index,1);
        }
      })
      _this.$parent.shadenum();
    },
  }
</script>

<style scoped>
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
