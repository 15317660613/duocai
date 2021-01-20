<template>
  <div class="" style="width:100%;margin:0 10px;" >
     <div class="pop-up" >
        <div class="pop-up-container clear" style="height:574px;" >
             <el-form ref="formsData"  :model="form" >
                <div class="clear" style="padding:10px;" >
                    <div class="right clear" >
                        <div class="left clear padding-left-20" >
                            <div class="left" >
                                <span class="des-word" >同步规则说明</span>
                            </div> 
                            <div class="left" style="padding-top:5px;" >
                                <i @click="showQuestion1" class="question-gold-icon" ></i>
                            </div> 
                        </div> 
                        <div class="left padding-left-20" >
                            <div class="left" >
                                <span class="des-word" >模式规则说明</span>
                            </div> 
                            <div class="left" style="padding-top:5px;" >
                                <i @click="showQuestion2"  class="question-gold-icon" ></i>
                            </div> 
                        </div> 
                        <div class="left padding-left-20" >
                            <div class="left" >
                                <span class="des-word" >封账规则说明</span>
                            </div> 
                            <div class="left" style="padding-top:5px;" >
                                <i @click="showQuestion3" class="question-gold-icon" ></i>
                            </div> 
                        </div> 
                     </div> 
                </div>
                <div class="break" ></div> 
                <div class="clear" style="height:515px;overflow:auto;"  >
                    <div class="clear" >
                        <div class="clear" style="padding-top:5px;" >
                          <div class="left" >
                            <i class="account-plus-icon left" style="margin-left: 10px" @click="addBounsReward"></i>
                            <span class="type-des-word left" style="margin-left: 5px">评价奖金</span>
                          </div>
                        </div>
                        <div class="clear" v-if="tBonus1 && tBonus1.length != 0" >
                            <div class="clear" style="padding-bottom:5px;" >
                                <div class="left" style="padding-left:127px;" >
                                    <span>应计奖金</span>
                                </div> 
                                <div class="left" style="padding-left:60px;" >
                                    <span>方式</span>
                                </div> 
                                <div class="left"  style="padding-left:50px;" >
                                    <span>结算年月</span>
                                </div> 
                                <div class="left" style="padding-left:42px;" >
                                    <span>结算奖金</span>
                                </div> 
                                <div class="left" style="padding-left:255px;" >
                                    <span>备注</span>
                                </div> 
                            </div>
                            <div class="clear" >
                                <div v-if="elem.deleted == 0" class="clear " v-for="(elem ,index) in tBonus1"  >
                                    <div class="left" style="padding:15px 5px 0 0;" >
                                         <i class="account-minus-icon left" style="margin-left: 10px" @click="deletedBounsReward(elem,index)"></i>
                                    </div>
                                    <div  class="left elem-border clear" >
                                        <div class="left" style="width:65px;padding: 5px 0 0 25px;" >
                                            <i @click="goldExtractSet" class="reward-icon" ></i>
                                        </div> 
                                        <div class="left" >
                                            <el-form-item  >
                                                <el-select @change="changeLevel(elem)"  v-model="elem.starLevel"    style="width:50px;" >
                                                    <el-option  v-for="item in starParams"  :label="item.name" :value="item.id" ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                        <div class="left padding-left-1" >
                                            <el-form-item  >
                                                <el-input :disabled="true"  style="width:60px;" v-model.trim="elem.bonus" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                         <div class="left" style="padding-left:10px;" >
                                            <el-form-item  >
                                                <el-select  @change="changeLevel(elem)"   v-model="elem.type"    style="width:45px;" >
                                                    <el-option  v-for="item in timeParams"  :label="item.name" :value="item.id" ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                       
                                        <div class="left " style="padding-left:12px;" >
                                            <el-form-item  >
                                                <el-checkbox  style="height:20px;"   v-model="elem.check"  :false-label="0" :true-label="1"  ></el-checkbox>
                  
                                            </el-form-item>
                                        </div>
                                        <div class="left padding-left-1" >
                                            <el-form-item  >
                                               <el-date-picker 
                                                type="month"
                                                 
                                                 
                                                value-format="yyyy-MM"
                                                v-model="elem.balanceTime" 
                                                :picker-options="pickerOptions"
                                                style="width: 80px;"
                                             ></el-date-picker>
                   
                                            </el-form-item>
                                        </div>
                                         <div class="left padding-left-10" >
                                            <el-form-item  >
                                                <el-input   :disabled="true"  style="width:78px;" v-model.trim="elem.balanceBonus"  autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                         <div class="left " style="padding-left:20px;" >
                                            <el-form-item  >
                                                <el-input   style="width:483px;" v-model.trim="elem.explainRemark" title="上限100个字" maxLength="100" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                         <div class="left padding-left-10" style="padding-left:15px;" >
                                            <el-form-item  >
                                                <el-checkbox  style="height:20px;"   v-model="elem.isCalculateSalary"  :false-label="0" :true-label="1"  ></el-checkbox>
                  
                                            </el-form-item>
                                        </div>
                                        <div class="left padding-left-5" >
                                            <span class="des-word" >计工资</span>
                                        </div> 
                                    </div>
                                    <div class="left padding-left-5" style="padding-top:15px;" >
                                        <span @click="saveReward(elem,index)" class="save-btn" >保存</span>
                                    </div>          
                                </div>    
                            </div>
                        </div>    
                    </div>
                     <div class="clear" >
                        <div class="clear" style="padding-top:5px;" >
                          <div class="left" style="padding-left:25px;" >
                            
                            <span class="type-des-word left" style="margin-left: 5px">部门管理业绩</span>
                          </div>
                        </div>
                        <div class="clear" >
                            <div class="clear" style="padding-bottom:5px;" >
                                <div class="left" style="padding-left:160px;" >
                                    <span>业类事件</span>
                                </div> 
                                
                                <div class="left"  style="padding-left:115px;" >
                                    <span>分成比例/应计业绩</span>
                                </div> 
                                
                               <div class="left" style="padding-left:60px;" >
                                    <span class="required-word" >模式</span>
                                </div> 
                                <div class="left" style="padding-left:55px;" >
                                    <span>特殊扣除</span>
                                </div>
                                <div class="left" style="padding-left:25px;" >
                                    <span>应计提成</span>
                                </div>
                                 
                                <div class="left" style="padding-left:25px;" >
                                    <span>方式</span>
                                </div>
                                <div class="left" style="padding-left:50px;" >
                                    <span>结算年月</span>
                                </div>
                                <div class="left" style="padding-left:55px;" >
                                    <span>首次结算</span>
                                </div>
                                
                                <div class="left" style="padding-left:55px;" >
                                    <span>计工资</span>
                                </div>
                            </div>
                            <div class="clear" >
                                <div class="clear " v-for="(elem ,index) in tBonus3"  >
                                    <div class="left" style="padding:15px 5px 0 0;" >
                                         <i :class="{'check-gold-icon':false,'left':true}" style="margin-left: 10px;display:inline-block;width:18px;height:18px;" ></i>
                                    </div>
                                    <div class="left elem-border clear" style="position:relative;" >
                                        <div class="left" style="width:66px;padding: 5px 0 0 25px;" >
                                            <i @click="goldExtractSet" class="manage-icon" ></i>
                                        </div>      
                                        <div class="left" >
                                            <el-form-item  >
                                                <el-select  :disabled="true" :title="elem.categoryName"   v-model="elem.categoryOne"    style="width:40px;" >
                                                    <el-option  v-for="item in categoryOneParams"  :label="item.name" :value="item.id" ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>

                                        <div class="left padding-left-1" >
                                            <el-form-item  >
                                                <el-input  :disabled="true"   style="width:150px;" v-model.trim="elem.roomAddress"  autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                        
                                       
                                         <div class="left " style="padding-left:15px;" >
                                            <el-form-item  >
                                                <el-input  :disabled="true"  style="width:50px;" v-model.trim="elem.proportion"  autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="left" style="padding-left:1px;" >
                                            <el-form-item  >
                                                <el-input  :disabled="true"  style="width:70px;" v-model.trim="elem.receivable" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="left" style="padding-left:17px;" >
                                            <el-form-item  >
                                                <el-select  :disabled="elem.showClose == '1'"  v-model="elem.patternLevel"    style="width:95px;" >
                                                    <el-option  v-for="item in patternLevelParams1"  :label="item.name" :value="item.id" ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>

                                        <div class="left " style="padding-left:12px;"  >
                                            <el-form-item  >
                                                <el-input  :disabled="elem.showClose == '1'"  style="width:70px;" v-model.trim="elem.deduct" title="上限10位数" maxLength="10" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                         <div class="left" style="padding-left:10px;" >
                                            <el-form-item  >
                                                <el-input  :disabled="true"    style="width:60px;" v-model.trim="elem.bonus"  autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                       
                                        <div class="left" style="padding-left:10px;"  >
                                            <el-form-item  >
                                                <el-select   :disabled="elem.showClose == '1'" v-model="elem.type"    style="width:45px;" >
                                                    <el-option  v-for="item in timeParams"  :label="item.name" :value="item.id" ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                        <div class="left " style="padding:0 1px 0 20px;" >
                                            <el-form-item  >
                                                <el-checkbox  :disabled="elem.showClose == '1'"  style="height:20px;"   v-model="elem.check"  :false-label="0" :true-label="1"  ></el-checkbox>
                  
                                            </el-form-item>
                                        </div>    
                                        <div class="left " >
                                            <el-form-item  >
                                                <el-date-picker
                                                type="month"
                                                 
                                                 :disabled="elem.showClose == '1'" 
                                                value-format="yyyy-MM"
                                                v-model="elem.balanceTime"
                                                :picker-options="pickerOptions"
                                                 style="width: 80px;"
                                                 ></el-date-picker>
                   
                                            </el-form-item>
                                        </div>
                                         <div class="left padding-left-1 text-input is-greent" style="padding-left:10px;position:relative;" >
                                            <el-form-item  >
                                                <el-input :disabled="true"   style="width:90px;" v-model.trim="elem.balanceBonus"  autocomplete="off"></el-input>
                                            </el-form-item>
                                            <div class="left" style="padding:6px 2px 0;position:absolute;left:5px;top:1px;left:12px;"  >
                                                <i @click="goleElemQuestion(elem.id,elem.balanceBonus)" class="question-gold-icon" ></i> 
                                            </div>
                                        </div>
                                         
                                        
                                         <div class="left " style="padding-left:15px;" >
                                            <el-form-item  >
                                                <el-checkbox  :disabled="elem.showClose == '1'" style="height:20px;"   v-model="elem.isCalculateSalary"  :false-label="0" :true-label="1"  ></el-checkbox>
                  
                                            </el-form-item>
                                        </div>
                                        <div class="left padding-left-5" >
                                            <span class="des-word" >计工资</span>
                                        </div> 
                                        <div class="" style="position:absolute;right:0px;bottom:-3px;" >
                                           <i @click="goldElemRemark(elem.explainRemark,index)" class="angle-disabled-gold-icon" ></i>
                                        </div> 
                                    </div>
                                    <div class="left padding-left-5" style="padding-top:15px;" >
                                        <span v-if="elem.showClose == '0'" @click="saveBusinessSpecail(elem,index)" class="save-btn" >保存</span>
                                        <span v-else  style="font-weight:700;color:#6FB984;" >已封账</span>
                                    </div>          
                                </div>    
                            </div>
                        </div>    
                    </div> 
                     <div class="clear" >
                        <div class="clear" style="padding-top:5px;" >
                          <div class="left" style="padding-left:25px;" >
                            
                            <span class="type-des-word left" style="margin-left: 5px">个人业务业绩</span>
                          </div>
                        </div>
                        <div class="clear" >
                            <div class="clear" style="padding-bottom:5px;" >
                                <div class="left" style="padding-left:160px;" >
                                    <span>业类事件</span>
                                </div> 
                                
                                <div class="left"  style="padding-left:115px;" >
                                    <span>分成比例/应计业绩</span>
                                </div> 
                                
                               <div class="left" style="padding-left:60px;" >
                                    <span class="required-word" >模式</span>
                                </div> 
                                <div class="left" style="padding-left:55px;" >
                                    <span>特殊扣除</span>
                                </div>
                                <div class="left" style="padding-left:25px;" >
                                    <span>应计提成</span>
                                </div>
                                 
                                <div class="left" style="padding-left:25px;" >
                                    <span>方式</span>
                                </div>
                                <div class="left" style="padding-left:50px;" >
                                    <span>结算年月</span>
                                </div>
                                <div class="left" style="padding-left:55px;" >
                                    <span>首次结算</span>
                                </div>
                                
                                <div class="left" style="padding-left:55px;" >
                                    <span>计工资</span>
                                </div>
                            </div>
                            <div class="clear" >
                                <div class="clear " v-for="(elem ,index) in tBonus2"  >
                                    <div class="left" style="padding:15px 5px 0 0;" >
                                         <i :class="{'check-gold-icon':false,'left':true}" style="margin-left: 10px;display:inline-block;width:18px;height:18px;" ></i>
                                    </div>
                                    <div class="left elem-border clear" style="position:relative;" >
                                        <div class="left" style="width:66px;padding: 5px 0 0 25px;" >
                                            <i @click="goldExtractSet" class="business-icon" ></i>
                                        </div>      
                                        <div class="left" >
                                            <el-form-item  >
                                                <el-select  :disabled="true" :title="elem.categoryName"   v-model="elem.categoryOne"    style="width:40px;" >
                                                    <el-option  v-for="item in categoryOneParams"  :label="item.name" :value="item.id" ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>

                                        <div class="left padding-left-1" >
                                            <el-form-item  >
                                                <el-input  :disabled="true"   style="width:150px;" v-model.trim="elem.roomAddress"  autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                        
                                       
                                         <div class="left " style="padding-left:15px;" >
                                            <el-form-item  >
                                                <el-input  :disabled="true"  style="width:50px;" v-model.trim="elem.proportion"  autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="left" style="padding-left:1px;" >
                                            <el-form-item  >
                                                <el-input  :disabled="true"  style="width:70px;" v-model.trim="elem.receivable" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="left" style="padding-left:17px;" >
                                            <el-form-item  >
                                                <el-select  :disabled="elem.showClose == '1'"  v-model="elem.patternLevel"    style="width:95px;" >
                                                    <el-option  v-for="item in patternLevelParams"  :label="item.name" :value="item.id" ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>

                                        <div class="left " style="padding-left:12px;"  >
                                            <el-form-item  >
                                                <el-input   :disabled="elem.showClose == '1'" style="width:70px;" v-model.trim="elem.deduct" title="上限10位数" maxLength="10" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                         <div class="left" style="padding-left:10px;" >
                                            <el-form-item  >
                                                <el-input  :disabled="true"    style="width:60px;" v-model.trim="elem.bonus"  autocomplete="off"></el-input>
                                            </el-form-item>
                                        </div>
                                       
                                        <div class="left" style="padding-left:10px;"  >
                                            <el-form-item  >
                                                <el-select  :disabled="elem.showClose == '1'"  v-model="elem.type"    style="width:45px;" >
                                                    <el-option  v-for="item in timeParams"  :label="item.name" :value="item.id" ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                        <div class="left " style="padding:0 1px 0 20px;" >
                                            <el-form-item  >
                                                <el-checkbox  :disabled="elem.showClose == '1'" style="height:20px;"   v-model="elem.check"  :false-label="0" :true-label="1"  ></el-checkbox>
                  
                                            </el-form-item>
                                        </div>    
                                        <div class="left " >
                                            <el-form-item  >
                                                <el-date-picker
                                                type="month"
                                                 
                                                 :disabled="elem.showClose == '1'" 
                                                value-format="yyyy-MM"
                                                v-model="elem.balanceTime"
                                                :picker-options="pickerOptions"
                                                 style="width: 80px;"
                                                 ></el-date-picker>
                   
                                            </el-form-item>
                                        </div>
                                         <div class="left padding-left-1 text-input is-greent" style="padding-left:10px;position:relative;" >
                                            <el-form-item  >
                                                <el-input :disabled="true"   style="width:90px;" v-model.trim="elem.balanceBonus"  autocomplete="off"></el-input>
                                            </el-form-item>
                                            <div class="left" style="padding:6px 2px 0;position:absolute;left:5px;top:1px;left:12px;"  >
                                                <i @click="goleElemQuestion(elem.id,elem.balanceBonus)" class="question-gold-icon" ></i> 
                                            </div>
                                        </div>
                                         
                                        
                                         <div class="left " style="padding-left:15px;" >
                                            <el-form-item  >
                                                <el-checkbox :disabled="elem.showClose == '1'"  style="height:20px;"   v-model="elem.isCalculateSalary"  :false-label="0" :true-label="1"  ></el-checkbox>
                  
                                            </el-form-item>
                                        </div>
                                        <div class="left padding-left-5" >
                                            <span class="des-word" >计工资</span>
                                        </div> 
                                        <div class="" style="position:absolute;right:0px;bottom:-3px;" >
                                           <i @click="goldElemRemark(elem.explainRemark,index)" class="angle-disabled-gold-icon" ></i>
                                        </div> 
                                    </div>
                                    <div class="left padding-left-5" style="padding-top:15px;" >
                                        <span v-if="elem.showClose == '0'" @click="saveBusiness(elem,index)" class="save-btn" >保存</span>
                                        <span v-else  style="font-weight:700;color:#6FB984;" >已封账</span>
                                    </div>          
                                </div>    
                            </div>
                        </div>    
                    </div>
                </div>   
             </el-form>    
        </div>
        <div slot="footer" style="padding:5px 0px;" class="dialog-footer clear">
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
  import {goldExtractEditor,goldExtractModify} from "../../../service/goldExtractionData";
  import GoldExtractionSetPage from "./goldExtractionSet";
  import QuestionDes1Page from "./questionDes1";
  import QuestionDes2Page from "./questionDes2";
  import QuestionDes3Page from "./questionDes3";
  import GoldElemSynchroPage from "./goldElemSynchro";
  import GoldElemQuestionPage from "./goldElemQuestion";
  import GoldRemarkPage from "./goldRemark";
  export default {

    props:["layerid","rowData",'mythisindex'],
    data() {
      return {
         departTree:[],
         getRowData:this.rowData,
         thisindex:this.mythisindex,
         deptId:'',
         userId:'',
         starParams:[], 
         categoryOneParams:[],
         patternLevelParams:[],
         patternLevelParams1:[],
         timeParams:[
             {id:'月',name:'月'},
             {id:'年',name:'年'},
         ],
         elemReward:{
            id:'',
            deleted:'0', 
            starLevel:'',
            bonus:'',
            type:'月',
            check:'0',
            balanceTime:'',
            remark:'',
            isCalculateSalary:'0',
         },
         form:{
            userId:'', 
            roomDelegateDate:'',
            chooseHouseNum:0,
            salePrice:'',
            createBy:'',
            createTime:'',
            updateBy:'',
            updateTime:'',
         },
         tBonus1:[],
         tBonus2:[],
         tBonus3:[],
         pickerOptions: { //大于当前月分的日期不可选
                disabledDate: (time) => {
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    var currentdate = year.toString()  + month.toString();

                    var timeyear = time.getFullYear();
                    var timemonth = time.getMonth() + 1;
                    if (timemonth >= 1 && timemonth <= 9) {
                        timemonth = "0" + timemonth;
                    }
                    var timedate = timeyear.toString() + timemonth.toString();
                    return currentdate < timedate;
                }
        },
      };
    },
    components:{
        GoldExtractionSetPage,
        QuestionDes1Page,
        QuestionDes2Page,
        QuestionDes3Page,
        GoldElemSynchroPage,
        GoldElemQuestionPage,
        GoldRemarkPage
    },
    methods:{
        getGoldExtractionData(){
            let _this =  this;
            this.$layer.loading({
            shade: true,//是否显示遮罩
            });
            let userId = this.getRowData.userId;
            let time = this.getRowData.time;
            let id = this.getRowData.id;
            let form = {id:id};
            goldExtractEditor(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
                let params = response.data.params;
                let stars = response.data.stars;
                let categoryOneParams = params.categoryOneParams;
                let patternLevelParams = response.data.models;
                let patternLevelParams1 = response.data.models1;
                let arr = [];
                if(patternLevelParams && patternLevelParams){
                    for(let attr in patternLevelParams){
                        let elemArr = patternLevelParams[attr];
                        if(elemArr && elemArr.length != 0){
                            elemArr.forEach(item =>{
                                arr.push({id:item.id,name:item.name});
                            })
                        }
                    }
                }
                _this.patternLevelParams = arr;
                let arrSpecial = [];
                if(patternLevelParams1 && patternLevelParams1){
                    for(let attr in patternLevelParams1){
                        let elemArr = patternLevelParams1[attr];
                        if(elemArr && elemArr.length != 0){
                            elemArr.forEach(item =>{
                                arrSpecial.push({id:item.id,name:item.name});
                            })
                        }
                    }
                }
                _this.patternLevelParams1 = arrSpecial;
                _this.starParams = stars;
                _this.categoryOneParams = categoryOneParams;
               let tBonus1 = response.data.tBonus1;
               let arr1 = [];
                tBonus1.forEach(item =>{
                    if(item.isCalculateSalary == '1'){
                        item.isCalculateSalary = 1;
                    }else{
                        item.isCalculateSalary = 0;
                    }
                    if(item.balanceTime){
                        item.check = 1;
                    }else{
                        item.check = 0;
                    }
                    arr1.push(item);
                })
                _this.tBonus1 = arr1;
               
                let arr2 = [];
                let tBonus2 = response.data.tBonus2;
                tBonus2.forEach(item =>{
                    if(item.isCalculateSalary == '1'){
                        item.isCalculateSalary = 1;
                    }else{
                        item.isCalculateSalary = 0;
                    }
                   
                    if(item.balanceTime){
                        item.check = 1;
                    }else{
                        item.check = 0;
                    }
                    arr2.push(item);
                })
                _this.tBonus2 = arr2;

                let arr3 = [];
                let tBonus3 = response.data.tBonus3;
                tBonus3.forEach(item =>{
                    if(item.isCalculateSalary == '1'){
                        item.isCalculateSalary = 1;
                    }else{
                        item.isCalculateSalary = 0;
                    }
                    
                    if(item.balanceTime){
                        item.check = 1;
                    }else{
                        item.check = 0;
                    }
                    arr3.push(item);
                })
                _this.tBonus3 = arr3;

                
                let user = response.data.user;
                _this.form.createBy = user.createBy;
                _this.form.createTime = user.createTime;
                _this.form.updateBy = user.updateBy;
                _this.form.updateTime = user.updateTime;
                _this.form.userId = user.userId;
            } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message+"！");
            }
            })
        },
        goldExtractSet(){
            let userTimeId = this.getRowData.userTimeId;
            debugger;
            let test = this.$layer.iframe({
                content: {
                    content:GoldExtractionSetPage, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{
                        userTimeId:userTimeId,
                        rowData:this.getRowData
                    }//props
                },
                area:['600px','450px'],
                title: "评价提金查看",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        showQuestion1(){
            let test = this.$layer.iframe({
                content: {
                    content: QuestionDes1Page, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{}//props
                },
                area:['550px','250px'],
                title: "同步规则说明",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        showQuestion2(){
            let test = this.$layer.iframe({
                content: {
                    content: QuestionDes2Page, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{}//props
                },
                area:['550px','250px'],
                title: "模式规则说明",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        showQuestion3(){
            let test = this.$layer.iframe({
                content: {
                    content: QuestionDes3Page, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{}//props
                },
                area:['550px','250px'],
                title: "封账规则说明",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        goldElemSynchro(elem,index){
            let chiefIds = elem.chiefIds;
            let chiefNames = elem.chiefNames;
            let chiefDepartIds = elem.chiefDepartIds;
            let userId = this.getRowData.userId;
            if(!chiefDepartIds){
                chiefDepartIds = '';
            }
            let test = this.$layer.iframe({
                content: {
                    content: GoldElemSynchroPage, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{userId:userId,chiefIds:chiefIds,chiefNames:chiefNames,chiefDepartIds:chiefDepartIds,index:index}//props
                },
                area:['750px','450px'],
                title: "同步",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        setElemSynchro(getChiefIds,getChiefNames,getChiefDepartIds,index){
            let tBonus2 = this.tBonus2;
            tBonus2.forEach((item,index1)=> {
               if(index == index1){
                   item.chiefIds = getChiefIds;
                   item.chiefNames = getChiefNames;
                   item.chiefDepartIds = getChiefDepartIds;
               }
            })
        },
        goleElemQuestion(id,balanceOldBonus){
            if(!balanceOldBonus){
                balanceOldBonus = "";
            }
            let test = this.$layer.iframe({
                content: {
                    content: GoldElemQuestionPage, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{id:id}//props
                },
                area:['514px','296px'],
                title: this.deptId +"-"+this.userId +"   " +balanceOldBonus,
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        goldElemRemark(remark,index){
            if(!remark){
                remark = "";
            }
            let test = this.$layer.iframe({
                content: {
                    content: GoldRemarkPage, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{remark:remark,index:index}//props
                },
                area:['350px','200px'],
                title: "提成备注",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        setElemRemark(remark,index){
            if(remark){
                let tBonus2 = this.tBonus2;
                tBonus2.forEach((item,index1) =>{
                    if(index == index1){
                        item.explainRemark = remark;
                    }
                })
            }else{
                let tBonus2 = this.tBonus2;
                tBonus2.forEach((item,index1) =>{
                    if(index == index1){
                        item.explainRemark = "";
                    }
                })
            }
        },
        //添加评价奖金
        addBounsReward(){
            this.tBonus1.push( JSON.parse(JSON.stringify(this.elemReward)));
        },
        changeLevel(elem){
           let starLevel = elem.starLevel;
           let type = elem.type;
           let bonus = "";
           let starParams = this.starParams;
           starParams.forEach(item =>{
               if(item.id == starLevel){
                   if(type == '月'){
                       bonus = item.lowerLimit;
                   }else{
                       bonus = item.upperLimit;
                   }
               }
           }) 
           elem.bonus = bonus;
        },
        
        deletedBounsReward(elem,index){
            debugger;
            if(elem.id != ''){
                elem.deleted = 1;
            }else{
                let arr = [];
                let tBonus1 = this.tBonus1;
                if(tBonus1 && tBonus1.length != 0){
                    tBonus1.forEach((item,index1) =>{
                        if(index  != index1){
                            arr.push(item);
                        }
                    })
                }
                this.tBonus1 = arr;
            }
        },
        saveReward(elem,index){
            let _this =  this;
            let userId = this.getRowData.userId;
            let time = this.getRowData.time;
            let tBonus1 = [elem];
            tBonus1 = JSON.stringify(tBonus1);
            let form = {
                userId:userId,
                time:time,
                tBonus1:tBonus1,
            };
            this.$layer.loading({
            shade: true,//是否显示遮罩
            });
            goldExtractModify(form).then(function(response){
                 _this.$layer.closeAll("loading");
                if (response.status == 500) {
                    return false;
                } else if (response.status == 0) {
                    _this.myAlert("数据保存成功",'success-icon').then(res => {
                        _this.getGoldExtractionData();
                    }).catch(err => {
                    })
                } else if (response.status == 1) {
                    let message = response.msg;
                    _this.myAlert(message + "！");
                }
            })
        },
        saveBusiness(elem,index){
            let _this =  this;
            let userId = this.getRowData.userId;
            let time = this.getRowData.time;
            let tBonus2 = [elem];
            tBonus2 = JSON.stringify(tBonus2);
            
            let form = {
                userId:userId,
                time:time,
                tBonus2:tBonus2,
            };
            this.$layer.loading({
            shade: true,//是否显示遮罩
            });
            goldExtractModify(form).then(function(response){
                 _this.$layer.closeAll("loading");
                if (response.status == 500) {
                    return false;
                } else if (response.status == 0) {
                    _this.myAlert("数据保存成功",'success-icon').then(res => {
                         _this.getGoldExtractionData();
                    }).catch(err => {
                    })
                } else if (response.status == 1) {
                    let message = response.msg;
                    _this.myAlert(message + "！");
                }
            })
        },
        saveBusinessSpecial(elem,index){
            let _this =  this;
            let userId = this.getRowData.userId;
            let time = this.getRowData.time;
            let tBonus3 = [elem];
            tBonus2 = JSON.stringify(tBonus3);
            
            let form = {
                userId:userId,
                time:time,
                tBonus3:tBonus3,
            };
            this.$layer.loading({
            shade: true,//是否显示遮罩
            });
            goldExtractModify(form).then(function(response){
                 _this.$layer.closeAll("loading");
                if (response.status == 500) {
                    return false;
                } else if (response.status == 0) {
                    _this.myAlert("数据保存成功",'success-icon').then(res => {
                         _this.getGoldExtractionData();
                    }).catch(err => {
                    })
                } else if (response.status == 1) {
                    let message = response.msg;
                    _this.myAlert(message + "！");
                }
            })
        },
        saveFormData(){
            let _this =  this;
            let userId = this.getRowData.userId;
            let time = this.getRowData.time;
            let tBonus1 =  JSON.parse(JSON.stringify(this.tBonus1));
            let tBonus2 =  JSON.parse(JSON.stringify(this.tBonus2));
            let tBonus3 =  JSON.parse(JSON.stringify(this.tBonus3));
            tBonus1 = JSON.stringify(this.tBonus1);
            tBonus2 = JSON.stringify(this.tBonus2);
            tBonus3 = JSON.stringify(this.tBonus3);
            let form = {
                userId:userId,
                time:time,
                
            };
            if(tBonus1){
                form.tBonus1 = tBonus1;
            }
            if(tBonus2){
                form.tBonus2 = tBonus2;
            }
            if(tBonus3){
                form.tBonus3 = tBonus3;
            }
            this.$layer.loading({
            shade: true,//是否显示遮罩
            });
            goldExtractModify(form).then(function(response){
                 _this.$layer.closeAll("loading");
                if (response.status == 500) {
                    return false;
                } else if (response.status == 0) {
                    _this.myAlert("数据保存成功",'success-icon').then(res => {
                        _this.$parent.searchGoldExtractionListData();
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
          let callbackdata = this.$parent.changeTitle(count,needlayerid,1);
          this.getRowData = callbackdata.row;
          this.thisindex = callbackdata.thisindex;
          this.getGoldExtractionData();
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
          let callbackdata = this.$parent.changeTitle(count,needlayerid,2)
          this.getRowData = callbackdata.row;
          this.thisindex = callbackdata.thisindex;
          this.getGoldExtractionData();
        },
    },
    mounted(){
        let user = this.rowData.user.split("-");
        if(user){
            this.departTree = [{id:user[0],name:user[0]}];
            this.deptId = user[0];
            this.userList = [{id:user[1],name:user[1]}];
            this.userId = user[1];
        }
        this.getGoldExtractionData();
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisrowid == _this.getRowData.id){
          _this.$store.state.layerifranme.splice(index,1);
        }
      })
      _this.$parent.shadenum();
    },
  }
</script>

<style lang="scss" scoped>
  .look-btn{
    display:inline-block;
    padding:3px 6px;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  .elem-border{
    padding:10px 5px;
    margin-bottom:10px;  
    border-width: 2px;
    border-style: solid;

    border-image: url("../../../images/system/border.png")  2 repeat ;
    background:#F2F2F2;
  }
  .required-word::after{
      content:'*';
      color:#F72F2E;
  }
  .des-word{
      display: inline-block;
      line-height:27px;
      height:27px;
  }
  .type-des-word{
    display: inline-block;
    color:#AC3C3B;
    font-weight:700;
  }
  .padding-left-1{
      padding-left:1px;
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
  .save-btn{
    display: inline-block;
     padding:2px 5px;  
    border-width: 2px;
    border-style: solid;
    cursor:pointer;
    background:#EBEBEB;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  .question-gold-icon{
    display: inline-block;
    height:15px;
    width:15px;
    background: url("../../../images/icon2.png") -368px -61px;
  }
  .check-gold-icon{
    display: inline-block;
    height:18px;
    width:18px;
    background: url("../../../images/icon2.png") -256px -61px;
  }
  .synchron-gold-icon{
    display: inline-block;
    height:20px;
    width:20px;
    background: url("../../../images/icon2.png") -291px -59px;
  }
  .synchron-disabled-gold-icon{
    display: inline-block;
    height:20px;
    width:20px;
    background: url("../../../images/icon2.png") -331px -60px;
  }
  .angle-disabled-gold-icon{
    display: inline-block;
    height:18px;
    width:18px;
    background: url("../../../images/icon2.png") -392px -57px;
  }
  .reward-icon{
    display: inline-block;
    height:18px;
    width:18px;
    background: url("../../../images/icon2.png")  -162px -140px;
  }
  .manage-icon{
    display: inline-block;
    height:18px;
    width:18px;
    background: url("../../../images/icon2.png") -95px -141px;
  }
  .business-icon{
    display: inline-block;
    height:18px;
    width:18px;
    background: url("../../../images/icon2.png") -128px -141px;
  }
  .is-greent{
    input{
      color:#009933 !important;
      font-weight:700;
      text-align:right;
    }
    
  }
</style>
