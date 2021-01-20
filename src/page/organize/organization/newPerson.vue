<template>
 <div class="" style="padding:0 10px;width:100%;" >
    
    <div class="pop-up" style="padding:10px;padding-bottom: 1px;" >
        <el-tabs type="border-card" v-model="activeName" @tab-click="changeTab" >
          <el-tab-pane label="基础信息" name="message" >
            <span slot="label"  >基础信息</span>
            <div class="width_a" >
              <div class="pop-up-container" style="height: 440px;margin:0px;">
                 <el-form :model="form"  ref="formsDatas" class="demo-ruleForm" >
                  <div class="clear" >  
                    <div class="clear left" >
                      <div class="clear " style="padding-top:5px;" >
                        <div class="left word-text3" >
                          <span class=" require-word word" >姓名</span>
                        </div>  
                        <div class="left" >
                          <el-form-item  prop="names" >
                            <el-input v-model.trim="form.name" title="上限10个字" maxlength="10" style="width: 100px">
                            </el-input> 
                          </el-form-item>   
                        </div>
                        <div  class="left" >
                          <el-form-item  prop="age" >
                            <el-input :disabled="true"  class="" v-model.trim="form.age" style="width: 30px;">
                            </el-input>
                          </el-form-item>    
                        </div>
                        <div class="left  word-text4" >
                          <span class="word" >部门</span>
                        </div>  
                        <div class="left" >
                          <el-form-item  prop="names" >
                            <el-select v-model="departData" class="" :disabled="true" style="width: 132px;margin-top: -13px;height: 21px;">

                            </el-select>
                          </el-form-item>   
                        </div>  
                      </div>
                      <div class="clear " >
                        <div class="left word-text3" >
                          <span class="word" >人员编号</span>
                        </div>  
                        <div class="left" >
                          <el-form-item  prop="names" >
                            <el-input @input="checkNum1" v-model.trim="form.num" title="必须5位数" maxlength="5"style="width: 132px">
                            </el-input> 
                          </el-form-item>   
                        </div>
                        <div class="left word-text4" >
                          <span class="word" >性别</span>
                        </div>  
                        <div class="left" >
                          <el-form-item  prop="names" >
                            <el-select v-model.trim="form.gender" style="width: 40px">
                              <el-option  value="男" label="男"  ></el-option>
                              <el-option  value="女" label="女"  ></el-option>
                            </el-select>
                          </el-form-item>   
                        </div>
                        <div class="left word-text6" >
                          <span class="word" >自定</span>
                        </div>  
                        <div class="left" >
                          <el-form-item  prop="names" >
                            <el-select v-model.trim="form.selfNum" style="width: 40px">
                              <el-option  value="" label=""  ></el-option>
                              <el-option  :value="elem.id" :label="elem.name"  v-for="elem in numParams" ></el-option>
                            </el-select>
                          </el-form-item>   
                        </div> 
                      </div> 
                      <div class="clear " >
                        <div class="left word-text3" >
                          <span :class="{'word':true,'require-word':checkHouseValue1 == 'true'}" class="word" >身份证号</span>
                        </div>  
                        <div class="left" >
                          <el-form-item  prop="names" >
                            <el-input @change="getAge" v-model.trim="form.idcard" title="上限18个字符" maxlength="18"style="width: 132px">
                            </el-input>
                          </el-form-item>   
                        </div>
                        <div class="left word-text4" >
                          <span :class="{'word':true,'require-word':checkHouseValue2 == 'true'}" >电话</span>
                        </div>  
                        <div class="left" >
                          <el-form-item  prop="names" >
                            <el-input @input="checkNum2" v-model.trim="form.phone" title="0-15位数" maxlength="15"style="width: 132px">
                            </el-input>
                          </el-form-item>   
                        </div> 
                      </div>   
                    </div>
                    <div class="clear left" style="padding-top:5px;" >
                      
                     
                      <div class="left" style="padding:10px 10px 0 55px" >
                        <div class="caption" style="color: black">头像</div>
                        <div  @click.stop="uploadHeadImg" class="caption" style="cursor:pointer;padding-top:20px;color:#5A81A6;">上传/修改</div>
                        <input style="display:none;" type="file" accept="image/*" @change="handleFile($event)" class="hiddenInput"/>
                      </div>
                      <div class="item_bock head_p left">
                        <div class="head_img">
                          <img :src="avatar"/>
                        </div>
                      </div>
                      
                    
                    </div>     
                  </div>         
                  
                  
                  <div  class="clear">
                    <div class="clear" >
                        <div class="left word-text3" >
                          <span class="word" >毕业院校</span>
                        </div> 
                        <div class="left" >
                          <el-form-item prop="school" >
                              <el-input v-model.trim="form.school" title="上限20个字,数字/字母/汉字" maxlength="20" style="width: 132px">
                              </el-input>
                          </el-form-item>
                        </div>
                        <div class="left word-text4" >
                          <span class="word" >所学专业</span>
                        </div> 
                        <div class="left"  > 
                          <el-form-item   prop="major" >
                            <el-input v-model.trim="form.major" title="上限10个字,数字/字母/汉字" maxlength="10"style="width: 132px">
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="left word-text5" >
                          <span class="word" >毕业时间</span>
                        </div>
                        <div class="left"  >
                          <el-form-item  prop="graduationTime" >
                            <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.graduationTime" style="width: 132px;"></el-date-picker>
                          </el-form-item>
                        </div>   
                    </div>
                      <div class="clear" >
                        <div class="left word-text3" >
                          <span class="word" >电子邮箱</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="email" >
                      
                              <el-input v-model.trim="form.email" title="上限30个字,数字/字母/汉字" maxlength="30" style="width: 132px">
                              </el-input>
                          </el-form-item>
                        </div>
                        <div class="left word-text4" >
                          <span class="word" >最高学历</span>
                        </div>
                        <div class="left"  > 
                          <el-form-item  prop="education" >
                            <el-select style="width: 132px" v-model="form.education" >
                              <el-option :id="coupon.id" :value="coupon.id" :label="coupon.name" :selected="coupon.select" v-for="coupon in educationIdParams" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left word-text5" >
                          <span class="word" >来源方式</span>
                        </div>
                        <div class="left"  > 
                          <el-form-item   prop="sourceId" >
                              <el-select style="width: 132px" v-model="form.sourceId" >
                                <el-option :id="so.id"  :value="so.id" :label="so.name" v-for="so in sourceIdParams" ></el-option>
                              </el-select>
                          </el-form-item>
                        </div>   
                    </div>  

                    <div class="clear" >
                        <div class="left word-text3" >
                          <span class="word" >籍贯</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="nativePlace" >
                            <el-input v-model.trim="form.nativePlace" title="上限30个字,数字/字母/汉字" maxlength="30"style="width: 132px">
                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="left word-text4" >
                          <span class="word" >民族</span>
                        </div>
                        <div class="left"  > 
                          <el-form-item   prop="nationId">
                            <el-select style="width: 132px" v-model="form.nationId" >
                              <el-option :id="na.id" :value="na.id" :label="na.name" v-for="na in nationIdParams" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left word-text5" >
                          <span class="word" >政治面貌</span>
                        </div>
                        <div class="left"  >
                          <el-form-item   prop="politicalId" >
                            <el-select style="width: 132px" v-model="form.politicalId" >
                              <el-option :id="po.id" :value="po.id" :label="po.name" v-for="po in politicalIdParams" ></el-option>
                            </el-select>
                          </el-form-item> 
                        </div>   
                    </div>
                  </div>
                  <div class="clear">
                    <div class="left word-text3" >
                      <span :class="{'word':true,'require-word':checkHouseValue3 == 'true'}" >家庭住址</span>
                    </div>
                    <div class="left" >
                      <el-form-item prop="homeAddress">
                      
                          <el-input v-model.trim="form.homeAddress" title="上限30个字,数字/字母/汉字" maxlength="30" style="width: 366px">
                          </el-input>
                      </el-form-item>
                    </div>
                    <div class="left word-text5" >
                      <span class="word" >技术职称</span>
                    </div>
                    <div class="left" >
                      <el-form-item  prop="technicalId" >
                        <el-select style="width: 132px" v-model="form.technicalId" >
                          <el-option :value="tech.id" :label="tech.name" v-for="tech in technicalIdParams" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>  
                  </div>
                  <div class="clear">
                    <div class="left word-text3" >
                      <span class="word" >银行卡号</span>
                    </div>
                    <div class="left " >
                      <el-form-item  prop="bank" >
                        <el-input v-model.trim="form.bank" title="银行名称,上限10个字" maxlength="10" style="width: 100px">
                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left " style="padding-left:2px;" >    
                      <el-form-item  prop="bankCardNumber" >
                          <el-input v-model.trim="form.bankCardNumber" title="银行卡号,上限30个字" maxlength="30" style="width: 264px">
                          </el-input>  
                      </el-form-item>
                    </div>
                    <div class="left word-text5" >
                      <span class="word" >阳历生日</span>
                    </div>
                    <div class="left " >    
                      <el-form-item  prop="birthday" >
                          <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="form.birthday" style="width: 132px;"></el-date-picker>
                      </el-form-item>
                    </div>  
                  </div>
                  <div class="clear" >  
                    <div class="left word-text3" >
                      <span class="word" >个人爱好</span>
                    </div> 
                    <div class="left " >
                      <el-form-item  prop="personalHobbies">
                        <el-input v-model.trim="form.personalHobbies" title="上限20个字,数字/字母/汉字" maxlength="20" style="width: 366px">
                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left word-text5" >
                      <span :class="{'word':true,'require-word':checkHouseValue4 == 'true'}" >农历生日</span>
                    </div>
                    <div class="left" >
                      <el-form-item  prop="lunarBirthday">
                        <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="form.lunarBirthday" style="width: 132px;"></el-date-picker>
                      </el-form-item> 
                    </div>   
                  </div> 
                  <div class="clear">
                    <div class="left word-text3" >
                      <span class="word" >个人签名</span>
                    </div>
                    <div class="left" >
                      <el-form-item  prop="personalSignature">
                        <el-input v-model.trim="form.personalSignature" title="上限20个字,数字/字母/汉字" maxlength="20" style="width: 606px">
                        </el-input>
                      </el-form-item>
                    </div>  
                  </div> 
                  <div class="clear" >
                    <div class="left word-text3" >
                      <span class="word" >基础备注</span>
                    </div>
                    <div class="left" style="padding-top:5px;" >
                      <el-form-item  prop="remarks" >
                        <textarea  v-model.trim="form.remarks" title="上限1000个字符" maxlength="1000" class="remark" style="width: 606px;height: 80px;vertical-align:top"></textarea>
                      </el-form-item>
                    </div>  
                  </div>
                </el-form>
              </div>
              <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="saveData"  >保 存</span>
              </div>
            </div>  
          </el-tab-pane>
          <el-tab-pane label="状态职位" name="states" >
            <span slot="label" >状态职位</span>
            <div class="width_a" >
              <div class="pop-up-container" style="height: 440px;margin:0px;">
                  <el-form :model="form1" :rules="rules" ref="formsData"  class="demo-ruleForm" style="height: 250px">
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
                        

                         <div class="left"  style="padding-left:30px;" >
                             <el-form-item  prop="isPublicAccount" >
                                <el-checkbox style="height:20px;"  v-model="form1.isPublicAccount"  :false-label="0" :true-label="1" ></el-checkbox>
                              </el-form-item>
                         </div>   
                         <div class="left word-check " >
                            <span class="" style="color:#AC3C3B;" >共享公共</span>
                         </div>
                         <div class="left"  style="padding-left:15px;" >
                             <el-form-item  prop="showAccountSet" >
                                <el-checkbox :disabled="stateDisabledTwo" style="height:20px;"  v-model="form1.showAccountSet"  :false-label="0" :true-label="1" ></el-checkbox>
                              </el-form-item>
                         </div>
                         <div class="left word-check" >
                            <span class=" " >参加职位账套设置及人事(批量)新增</span>
                         </div> 
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
                              <el-input v-model="form1.accountNumber" title="上限50个字" maxlength="50"   style="width:130px;" ></el-input>
                              <el-input     style="position: fixed;bottom: -9999px;" ></el-input>
                           </el-form-item>  
                         </div>
                          <div class="left word-text1" style="width:60px;" >
                            <span class="word " >密码</span>
                         </div>
                         <div class="left" >
                           <el-form-item >
                            <el-input     style="position: fixed;bottom: -9999px;" ></el-input>
                              <el-input   v-model="form1.accountPasswd" show-password auto-complete="new-password"  style="width:130px;" ></el-input>
                           </el-form-item>  
                         </div> 
                      </div> 
                      <div class="clear" >
                          <div class="left word-text1" >
                            <span class="word " >备注</span>
                         </div>
                         <div class="left" style="padding-top:7px;" >
                           <el-form-item >
                              <textarea v-model="form1.stateRemark" class="input" title="上限50个字" maxlength="50"   style="width:570px;height:85px;" ></textarea>
                           </el-form-item>  
                         </div>
                          
                      </div> 
                      <div class="break" >
                      </div> 
                      <div class="clear" style="height:243px;overflow:auto;" >
                        <div class="clear " v-if="item.deleted == 0" style="position:relative;padding-left:50px;" v-for="(item,index) in dates"  >
                          <div class="left" >
                            <span v-if="index == 0" style="position:absolute;left:28px;top:10px;" >
                              <i v-show="dates[dates.length -1].quitTime" class="account-plus-icon" @click="addUserTime" ></i>
                               
                              <i v-show="!dates[dates.length -1].quitTime" class="account-plus-icon" style="cursor: not-allowed;" ></i>
                            </span>
                            <span v-if="index != 0"  style="position:absolute;left:28px;top:10px;" >
                              <i class="account-minus-icon" @click="deletedUserTime(index)" ></i>
                            </span>
                          </div>  
                          <div class="left time-content " >
                            <div class="clear" >  
                              
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName1}}</span>
                              </div>
                              <div class="left" >  
                                <el-form-item  >
                                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.entryTime" style="width: 90px;"></el-date-picker>
                                </el-form-item>
                              </div>
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName2}}</span>
                              </div> 
                              <div class="left" >   
                                <el-form-item >
                                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.firstTime" style="width: 90px;"></el-date-picker>
                                  
                                </el-form-item>
                              </div>
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName3}}</span>
                              </div> 
                              <div class="left" >
                                <el-form-item >
                                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.fullMemberTime" style="width: 90px;"></el-date-picker>
                                  
                                </el-form-item>
                              </div>  
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName4}}</span>
                              </div>
                              <div class="left" >   
                                <el-form-item >
                                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.payOffTime" style="width: 90px;"></el-date-picker>
                                
                                </el-form-item>
                              </div>  
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName5}}</span>
                              </div> 
                              <div class="left" >  
                                <el-form-item >
                                    <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.quitTime" style="width: 90px;"></el-date-picker>
                                  
                                </el-form-item>
                              </div>
                            </div>
                            <div class="clear" >
                              <div class="left"  style="padding-left:13px;" >
                                <el-form-item  prop="isState2" >
                                  <el-checkbox  style="height:20px;"  v-model="item.isState1"  :false-label="0" :true-label="1" ></el-checkbox>
                                </el-form-item>
                              </div>  
                              <div class="left word-text2" style="width:35px;"  >
                                  <span class="word " >用工</span>
                              </div>
                              
                              <div class="left" >
                                <el-form-item >
                                  <el-date-picker :disabled="item.isState1 == 0" value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.workingTime" style="width: 90px;"></el-date-picker>
                                  
                                </el-form-item>  
                              </div>
                              <div class="left"  style="padding-left:10px;" >
                                <el-form-item  prop="isState2" >
                                  <el-checkbox  style="height:20px;"  v-model="item.isState2"  :false-label="0" :true-label="1" ></el-checkbox>
                                </el-form-item>
                              </div>
                              <div class="left word-text2"  style="width:35px;"  >
                                  <span class="word " >退工</span>
                              </div>
                              <div class="left" >
                                <el-form-item >
                                  <el-date-picker  :disabled="item.isState2 == 0"  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.retirementTime" style="width: 90px;"></el-date-picker>
                                </el-form-item>  
                              </div>
                              <div class="left" style="padding-left:200px;" >
                                <el-form-item  prop="isState1" >
                                  <el-checkbox  :disabled="stateDisabled" style="height:20px;"  v-model="item.statef"  :false-label="0" :true-label="1" ></el-checkbox>
                                  </el-form-item>
                              </div>   
                              <div class="left word-check" >
                                <span class=" " >强制</span>
                              </div>
                              <div class="left"  style="padding-left:12px;" >
                                <el-form-item  prop="isState2" >
                                  <el-checkbox :disabled="stateDisabled" style="height:20px;"  v-model="item.states"  :false-label="0" :true-label="1" ></el-checkbox>
                                  </el-form-item>
                              </div>   
                              <div class="left word-check" >
                                <span class=" " >未办</span>
                              </div>
                              <div class="left"  style="padding-left:12px;" >
                                <el-form-item  prop="isState3" >
                                  <el-checkbox :disabled="stateDisabled" style="height:20px;"  v-model="item.statet"  :false-label="0" :true-label="1" ></el-checkbox>
                                  </el-form-item>
                              </div>   
                              <div class="left word-check" >
                                <span class=" " >黑名</span>
                              </div> 
                            </div>  
                          </div>
                          <div v-if="index == 0" class="left" style="padding:10px 0 0 5px;" >
                              <i @click="showQuestion" class="question-gold-icon" ></i>
                          </div>      
                        </div>
                      </div>     
                  </el-form>
              </div>
              <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="saveData"  >保 存</span>
              </div>
            </div>    
          </el-tab-pane>
          <el-tab-pane label="图文信息" name="picture" >
            <span slot="label" >图文信息</span>
            <div class="width_a" >
              <div class="pop-up-container" style="height: 440px;margin:0px;padding-top:40px;overflow:auto;">
                <el-form   ref="formsData"  class="demo-ruleForm" style="height: 250px">
                  <div class="clear" v-if="elem.deleted == 0" v-for="(elem,index) in photoList" >
                     <div class="left" style="padding:6px 0 0 40px;" >
                         <i  @click="deletedPhoto(elem,index)" class="jian"></i>
                     </div>
                     <div class="left" >
                        <el-form-item  > 
                          <el-select v-model="elem.imageTypeId" class=""  style="width: 105px;">
                            <el-option :value="param.id" :label="param.name" v-for="(param ,index1) in imageTypeparams" ></el-option>
                          </el-select>
                        </el-form-item>  
                     </div>
                     <div class="left" style="padding-left:5px;" >
                        <el-form-item  > 
                             <el-input v-model="elem.remark" title="备注（上限100个字）,英文/数字/字母" maxLength="100" style="width: 470px;;"></el-input>
                        </el-form-item>  
                     </div>
                     <div class="left" style="padding:0px 0  0 5px;" > 
                      <span class="file-icon " @click="isShowPhotoAndFile(elem.id)" style="border-width:0px;"  ></span> 
                     </div> 
                  </div>
                </el-form> 
              </div>
              <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >

                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="saveData"  >保 存</span>
                <div class="right" style="padding-right:10px;"  >
                  <span class="foot-btn" style=""  @click="addPhone()"  >增加图文</span>
                </div>
              </div>
            </div>   
          </el-tab-pane>
        </el-tabs>      
      
    </div>
 </div>
</template>

<script>
  import {addperparam,addperson,updatePhoto,newUserImage,updateImages} from '../../../service/organizeDate'
  import {getFilesList9,deletedFiles9,uploadFiles9,updateFileName9} from '../../../service/fileData'
  import statetwo from './statetwo'
  import picturethree from './picturethree';
  import FilePage from '../../../components/file'
  import QuestionDesPage from './questionDes'
  export default {
    props:["layerid","departId","departData","departValue"],
    name: 'addperson',
    data() {
      return {
        newpersonVisible:false,
        departId:"",
        newdelabel:"",
        stateShow:true,
        stateDisabled:true,
        stateDisabledTwo:false,
        checkHouseValue1:false,
        checkHouseValue2:false,
        checkHouseValue3:false,
        checkHouseValue4:false,
        changeName1:'入职',
        changeName2:'首上',
        changeName3:'转正',
        changeName4:'离职',
        changeName5:'止薪',
        numParams:[],
        activeName:'message',
        sformlist:{

        },
        useTypeIdParams:[],
        stateIdParams:[],
        staffIdParams:[],
        educationIdParams:[],
        nationIdParams:[],
        sourceIdParams:[],
        politicalIdParams:[],
        technicalIdParams:[],
        stateParams2:[
          {
            id:"兼",
            name:"兼"
          }, {
            id:"习",
            name:"习"
          }, {
            id:"试",
            name:"试"
          }, {
            id:"正",
            name:"正"
          }
        ],
        imageTypeparams:[],
        photoList:[],
        elemPhoto:{
          id:'',
          deleted:'0',
          imageTypeId:'',
          remark:'',
        },
        dates:[{
          id:'',
          deleted:0, 
          entryTime:'',
          firstTime:'',
          fullMemberTime:'',
          payOffTime:'',
          quitTime:'',
          isState1:0,
          workingTime:'',
          isState2:0,
          retirementTime:'',
          statef:0,
          states:0,
          statet:0,
         },],
        elemDate:{
          id:'',
          deleted:0, 
          entryTime:'',
          firstTime:'',
          fullMemberTime:'',
          payOffTime:'',
          quitTime:'',
          isState1:0,
          workingTime:'',
          isState2:0,
          retirementTime:'',
          statef:0,
          states:0,
          statet:0,
         },
        form:{
          id:"",
          selfNum:"",
          file:"",
          name:"",
          age:"",
          idcard:"",
          phone:"",
          departName:"",
          gender:"男",
          num:"",
          school:"",
          email:"",
          nativePlace:"",
          major:"",
          graduationTime:"",
          homeAddress:"",
          bank:"",
          personalHobbies:"",
          bankCardNumber:"",
          birthday:"",
          lunarBirthday:"",
          personalSignature:"",
          remarks:"",
         
          education: '',
         
          nationId: '1021',
          
          sourceId:'',
         
          politicalId:'',
         
          technicalId:""
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
        rules:{
          names:[
            { required: true, message: ' ', trigger: ' ' },
          ],
          departs:[
            { required: true, message: ' ', trigger: ' ' },
          ],
         
          lunarBirthday:[
            { required: false, message: ' ', trigger: ' ' },
          ],
          idcard:[
            { required: false, message: ' ', trigger: ' ' },
          ],
          address:[
            { required: false, message: ' ', trigger: ' ' },
          ],
          phones:[
            { required: false, message: ' ', trigger: ' ' },
          ],
        },

        avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
        
      }
    },
    components:{
      statetwo,
      picturethree,
      FilePage,
      QuestionDesPage
    },
   

    methods:{
      checkNum1(){
        this.form.num= this.form.num.replace(/[^\d]/g,'');
      },
      checkNum2(){
        this.form.phone= this.form.phone.replace(/[^\d]/g,'');
      },
      showQuestion(){
        let test = this.$layer.iframe({
            content: {
                content: QuestionDesPage, //传递的组件对象
                parent: this,//当前的vue对象
                data:{}//props
            },
            area:['420px','180px'],
            title: "【首上时间、止薪时间】说明",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
            }
        });
      },
      getParams(){
        let _this=this;
        addperparam(1).then(function (res) {
          let params = res.data;
          let numParams = params.numParams;
          _this.imageTypeparams = params.imageTypeparams;
          _this.educationIdParams = params.educationIdParams
          _this.nationIdParams = params.nationIdParams
          _this.politicalIdParams = params.politicalIdParams
          _this.sourceIdParams = params.sourceIdParams
          _this.technicalIdParams=res.data.technicalIdParams;
          
          _this.form.id = res.data.unid;
          numParams.forEach(item => {
            item.id = item.name;
          })
          _this.numParams = numParams;
          let useTypeIdParams = params.useTypeIdParams;
          if(useTypeIdParams && useTypeIdParams.length != 0){
             useTypeIdParams.forEach(item => {
              if(item.name == '已用工'){
                // _this.form1.usedTypeId = item.id;
              }
            })
          }
          _this.useTypeIdParams = params.useTypeIdParams;
          let stateIdParams = params.stateIdParams;
          _this.stateIdParams = stateIdParams;
          if(stateIdParams && stateIdParams.length != 0){
             stateIdParams.forEach(item => {
              if(item.name == '常态在职'){
                // _this.form1.stateId = item.id;
                // _this.form1.stateSec = "兼";
              }
            })
          }
         

          
          _this.staffIdParams = params.staffIdParams;
          let systre=res.data.systemSet
          for(var i=0;systre.length>i;i++){
            if(systre[i].paramName=="新增员工进行【黑名单】检查"&&systre[i].paramData=="true"){

            }
            if(systre[i].paramName=="员工【电话】必填"&&systre[i].paramData=="true"){
              _this.checkHouseValue2 = true;
            }
            if(systre[i].paramName=="员工【地址】必填"&&systre[i].paramData=="true"){
              _this.checkHouseValue3 = true;
            }
            if(systre[i].paramName=="员工【农历生日】必填"&&systre[i].paramData=="true"){
              _this.checkHouseValue4 = true;
            }
            if(systre[i].paramName=="员工【身份证】必填"&&systre[i].paramData=="true"){
              _this.checkHouseValue1 = true;
            }

            if(systre[i].paramName=="入职改名"){
              _this.changeName1 = systre[i].paramData;
            }
            if(systre[i].paramName=="首上改名"){
              _this.changeName2 = systre[i].paramData;
            }
            if(systre[i].paramName=="转正改名"){
              _this.changeName3 = systre[i].paramData;
            }
            if(systre[i].paramName=="离职改名"){
              _this.changeName4 = systre[i].paramData;
            }
            if(systre[i].paramName=="止薪改名"){
              _this.changeName5 = systre[i].paramData;
            }
          }
        })
      },
      isShowPhotoAndFile(id){
        // this.$refs.FilePageId.showDialogVisible();
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: FilePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              recordId:id,
              getFilesByType:getFilesList9,
              deleteFiles:deletedFiles9,
              uploadFiles:uploadFiles9,
              updateFileName:updateFileName9,
              downLoadFiles:'/user/downloadReFiles',
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

        if(stateName == "常态在职" || stateName == "薪假在职" || stateName == '停薪在职' || stateName =='申离在职' || stateName == '正式离职'){
             this.stateDisabledTwo = false;

        }else{
             this.stateDisabledTwo = true;
             this.form1.showAccountSet = 0;
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
      addPhone(){
        let _this = this;
        let id = this.form.id;
        newUserImage(id).then(function (res) {
          if(res.status==0){
            let thisDataId  =  res.data.id; 
            let data = JSON.parse(JSON.stringify(_this.elemPhoto));  
            data.id = thisDataId;
            data.userId = _this.form.id;   
            _this.photoList.push(data);
          }else {
            _this.myAlert(res.msg)
          }
        })  
          
      },
      deletedPhoto(elem){
        elem.deleted = 1;
      },
     
      changeTab(){

      },
      // 打开图片上传
      uploadHeadImg() {
        this.$el.querySelector('.hiddenInput').click()
      },
      // 将头像显示
      handleFile(e) {
        let _this = this;
        let fileCurrent = e.target.files[0];
        this.form.file= e.target.files;
        let $target = e.target || e.srcElement
        let file = $target.files[0]
        var reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement;
            if(file){ 
            let fileForm = {
              file:fileCurrent,
              id:_this.form.id,
            }
            updatePhoto(fileForm).then(function (res) {
              if(res.status==0){
                let data = res.data;
                _this.form.photo = data;
                _this.avatar = data;
              }else {
                _this.myAlert(res.msg)
              }
            })
          }  
          
        }
        reader.readAsDataURL(file);
      },
      //年龄显示
      getAge(){
        let dat=this.form.idcard
        let d1=""
        let d2=""
        let d3=""
        if(dat.length==18){
          dat=dat.substr(6)
          dat=dat.substr(0,8)
          d1=dat.substr(0,4)
          dat=dat.substr(4)
          d2=dat.substr(0,2)
          d3=dat.substr(2)
          dat=d1+"-"+d2+"-"+d3

          let birthdays = new Date(dat.replace(/-/g, "/"));
          let d = new Date();
          let age =
            d.getFullYear() -
            birthdays.getFullYear() -
            (d.getMonth() < birthdays.getMonth() ||
            (d.getMonth() == birthdays.getMonth() &&
            d.getDate() < birthdays.getDate())
              ? 1
              : 0);
          if(!isNaN(age)){
            this.form.age = age;
          }
        }
      },
      
      saveData(){
        let _this=this
        let photo = this.form.photo;
        let createBy="lsy"
        let name=this.form.name
        let idcard=this.form.idcard
        let phone=this.form.phone
        let departId=this.departId
        let gender=this.form.gender
        let num=this.form.num;
        let school=this.form.school
        let email=this.form.email
        let nativePlace=this.form.nativePlace
        let major=this.form.major
        let graduationTime=this.form.graduationTime
        let homeAddress=this.form.homeAddress
        let bank=this.form.bank
        let personalHobbies=this.form.personalHobbies
        let bankCardNumber=this.form.bankCardNumber
        let birthday=this.form.birthday
        let lunarBirthday=this.form.lunarBirthday
        let personalSignature=this.form.personalSignature
        let remarks=this.form.remarks
        let education=this.form.education
        let nationId=this.form.nationId
        let sourceId=this.form.sourceId
        let politicalId=this.form.politicalId
        let technicalId=this.form.technicalId 
        let selfNum = this.form.selfNum;
        let id = this.form.id;
        let stateId = this.form1.stateId;
        let stateSec = this.form1.stateSec;
        let isState1 = this.form1.isState1;
        let isState2 = this.form1.isState2;
        let isState3 = this.form1.isState3;  
        let stateIdParams = this.stateIdParams;
        let stateName = "";
        let checkHouseValue1 = this.checkHouseValue1;
        let checkHouseValue2 = this.checkHouseValue2;
        let checkHouseValue3 = this.checkHouseValue3;
        let checkHouseValue4 = this.checkHouseValue4;
        stateIdParams.forEach(item => {
          if(item.id == stateId){
            stateName = item.name;
          }
        })
        if(name == ""){
          _this.myAlert("姓名不能为空!","dangerous-icon");
          return false;
        }
        if(stateName == ""){
           _this.myAlert("状态不能为空！")
          return false;
        }else if(stateName == "常态在职" || stateName == "薪假在职" || stateName == '停薪在职' || stateName =='申离在职'){
          if(!stateSec){
            _this.myAlert("状态不能为空！")
            return false;
          }
          
        }
        if(stateName == "常态在职" || stateName == "薪假在职" || stateName == '停薪在职' || stateName =='申离在职' || stateName =='正式离职'){
          
          if(!num ||  num == ''){
            _this.myAlert("人员编号不能为空！")
            return false;
          }
        }
        if(checkHouseValue1 && idcard==""){
          _this.myAlert("身份证不能为空!","dangerous-icon");
          return false;
        }
        if(checkHouseValue2 && phone==""){
          _this.myAlert("电话不能为空!","dangerous-icon");
          return false;
        }
        if(checkHouseValue3 && homeAddress==""){
          _this.myAlert("家庭地址不能为空!","dangerous-icon");
          return false;
        }
        if(checkHouseValue4 && lunarBirthday==""){
          _this.myAlert("农历生日不能为空!","dangerous-icon");
          return false;
        } 
        let dates = this.dates;
        let flag1 = false;
        let flag2 = false;
        if(dates && dates.length != 0){
          dates.forEach(item => {
            if(typeof item == 'object'){
              for(let attr in item){
                if(item[attr] == null){
                  item[attr] = "";
                }
              }
            }
            
            if(stateName == '常态在职' && item.deleted == 0){
               if(item.entryTime && item.firstTime){
                 flag1 = true;
               }
            }else  if(stateName == '正式离职' && item.deleted == 0){
              if(item.quitTime ||  (item.statef == 1 || item.states == 1 || item.statet == 1 )){
                 flag2 = true;
               }
            }
          })
        }
        if(stateName == '常态在职'  && !flag1){
          _this.myAlert("选择【常态在职】时必须填写【入职、首上】时间!","dangerous-icon");
          return false;
        }
        if(stateName == '正式离职' && !flag2){
          _this.myAlert("选择【正式离职】时必须填写【止薪】时间，【离职时间】和【强制未办黑名】至少填写一个!","dangerous-icon");
          return false;
        } 
        dates = JSON.stringify(dates);
        let form1 = JSON.parse(JSON.stringify(this.form1));
        if(!dates){
          dates = "";
        }
        let form = {id,createBy,name,num,idcard,departId,gender,phone,school,
          major,graduationTime,email, education,sourceId,nativePlace, politicalId,homeAddress,
          technicalId,bank,bankCardNumber,birthday,lunarBirthday,personalHobbies,personalSignature,remarks,selfNum,dates,nationId,photo};
        form = Object.assign(form1,form);  
        addperson(form).then(function (res) {
          if(res.status==0){
            _this.myAlert("新增人员成功","success-icon").then(res => {
              
              let ne=_this.departValue;
              _this.$parent.gettreeData(ne);
              _this.cancelData();
            }).catch(res => {
            })
          }else {
            _this.myAlert(res.msg)
          }
        })

        let photoList=JSON.stringify(this.photoList);
        updateImages(photoList).then(function (res) {

        })
      },
      
	  cancelData(){
        this.$layer.close(this.layerid);
      },

  },
  mounted () {
     this.getParams();
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
  
  .foot-btn{
    display:inline-block;
    padding:3px 15px;
    border:1px solid #797979;
    cursor:pointer;
    font-size:12px;
  }
  .question-gold-icon{
    display: inline-block;
    height:15px;
    width:15px;
    background: url("../../../images/icon2.png") -368px -61px;
  }
  .time-content{
    background: #fff;
    width: 670px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top:8px;
  }
  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }
  .word{
    line-height:28px;
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
  .word-text3{
    width:85px;
    text-align:right;
    padding-right:5px;

  }
  .word-text4{
    width:102px;
    text-align:right;
    padding-right:5px;

  }
  .word-text5{
    width:107px;
    text-align:right;
    padding-right:5px;

  }
  .word-text6{
    width:51px;
    text-align:right;
    padding-right:5px;

  }
  .word-check{
    padding:6px 0 0 3px;
  }
  .head_p {
    height:50px;
  }
  .head_img{
    width:75px;
    height: 75px;
    border: 1px solid #797979;
    
  }
  .jian{
    background:url(../../../images/qiet.png) -242px -174px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .head_img img{
    width:73px;
    height:73px;
  }
  .setting_right{
    display: flex;
    height: 37px;
    justify-content: flex-end;
    align-items: center;
  }
  .hiddenInput{
    display: none;
  }
  

 
  
</style>
