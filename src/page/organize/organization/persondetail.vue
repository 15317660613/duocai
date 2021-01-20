<template>
  <div class="" style="width:100%;margin:0 10px;" >
      <div class="pop-up" >
        <el-tabs type="border-card" v-model="activeName" @tab-click="changeTab" >
          <el-tab-pane label="基础信息" name="message" >
            <span slot="label"  >基础信息</span>
            <div class="" style="height:475px" >
              <div class="pop-up-container" style="height: 442px">
                <el-form :model="form"  ref="formsDatas" class="demo-ruleForm" >
                  <div class="clear" >  
                    <div class="clear left" >
                      <div class="clear " style="padding-top:5px;" >
                        <div class="left word-text3" >
                          <span class="word require-word" >姓名</span>
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
                            <el-select v-model="form.departName" class="" :disabled="true" style="width: 132px;">

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
                          <span  :class="{'word':true,'require-word':checkHouseValue1}"  >身份证号</span>
                        </div>  
                        <div class="left" >
                          <el-form-item  prop="names" >
                            <el-input @change="getAge" v-model.trim="form.idcard" title="上限18个字符" maxlength="18"style="width: 132px">
                            </el-input>
                          </el-form-item>   
                        </div>
                        <div class="left word-text4" >
                          <span  :class="{'word':true,'require-word':checkHouseValue2}"  >电话</span>
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
                      <span  :class="{'word':true,'require-word':checkHouseValue3}"  >家庭住址</span>
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
                      <span  :class="{'word':true,'require-word':checkHouseValue4}"  >农历生日</span>
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
              <div slot="footer" class="footer-btn clear" style="padding:5px 0;"  >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
                <span class="right save-cancel-btn" type="primary"  @click="saveData"  >保 存</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="状态职位" name="states" >
            <span slot="label" >状态职位</span>
            <div class="" style="height:475px" >
              <div class="pop-up-container" style="height: 442px">
                <el-form :model="form1"  ref="formsData"  style="height: 250px">
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
                        <div class="left" style="width:53px;text-align:right;" >
                          <span class="word " >密码</span>
                        </div>
                        <div class="left" >
                          <el-form-item >
                            <el-input     style="position: fixed;bottom: -9999px;" ></el-input>
                            <el-input   v-model="form1.accountPasswd" show-password auto-complete="new-password" style="width:130px;" ></el-input>
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
                              <i v-show="!item.disabled2 && !item.disabled5" class="account-minus-icon" @click="deletedUserTime(index)" ></i>
                            </span>
                          </div>  
                          <div class="left time-content " >
                            <div class="clear" >  
                              
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName1}}</span>
                              </div>
                              <div class="left" >  
                                <el-form-item  >
                                    <el-date-picker :disabled="item.disabled1"  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.entryTime" style="width: 90px;"></el-date-picker>
                                </el-form-item>
                              </div>
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName2}}</span>
                              </div> 
                              <div class="left" >   
                                <el-form-item >
                                    <el-date-picker :disabled="item.disabled2" value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.firstTime" style="width: 90px;"></el-date-picker>
                                  
                                </el-form-item>
                              </div>
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName3}}</span>
                              </div> 
                              <div class="left" >
                                <el-form-item >
                                    <el-date-picker :disabled="item.disabled3" value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.fullMemberTime" style="width: 90px;"></el-date-picker>
                                  
                                </el-form-item>
                              </div>  
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName4}}</span>
                              </div>
                              <div class="left" >   
                                <el-form-item >
                                    <el-date-picker :disabled="item.disabled4"  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.payOffTime" style="width: 90px;"></el-date-picker>
                                
                                </el-form-item>
                              </div>  
                              <div class="left word-text2" >  
                                  <span class="word " >{{changeName5}}</span>
                              </div> 
                              <div class="left" >  
                                <el-form-item >
                                    <el-date-picker :disabled="item.disabled5" value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.quitTime" style="width: 90px;"></el-date-picker>
                                  
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
                                  <el-date-picker  :disabled="item.isState1 == 0" value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.workingTime" style="width: 90px;"></el-date-picker>
                                  
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
                                  <el-date-picker  :disabled="item.isState2 == 0" value-format="yyyy-MM-dd" size="mini" type="date"   v-model="item.retirementTime" style="width: 90px;"></el-date-picker>
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
              <div slot="footer" class="footer-btn clear" style="padding:5px 0;"  >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
                <span class="right save-cancel-btn" type="primary"  @click="saveData"  >保 存</span>
              </div>
              
            </div>
          </el-tab-pane>
           <el-tab-pane label="相关数据" name="data" >
            <span slot="label" >相关数据</span>
            <div class="width_a" >
              <div class="pop-up-container" style="height: 440px;margin:0px;padding:15px 0 0 15px;overflow:auto;">
                 <div class="clear" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [房源记录]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count1}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [非有效]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count2}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [有效]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count3}}]
                      </div>  
                   </div> 
                   <div class="left clear " >
                      <div class="left  type-word-des3" >
                        [出售]
                      </div> 
                      <div class="left  type-word-des3 width_50" >
                         [{{form2.count4}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des3" >
                        [出租]
                      </div> 
                      <div class="left  type-word-des3 width_50" >
                         [{{form2.count5}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des3" >
                        [私盘]
                      </div> 
                      <div class="left  type-word-des3 width_50" >
                         [{{form2.count6}}]
                      </div>  
                   </div> 

                   <div class="left p-l-100"  >
                      <span class="save-btn" @click="changeOut('房源记录',1)" >转出</span>
                   </div>  
                 </div> 
                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [客源记录]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count7}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [非有效]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count8}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [有效]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count9}}]
                      </div>  
                   </div> 
                   <div class="left clear " >
                      <div class="left  type-word-des3" >
                        [求购]
                      </div> 
                      <div class="left  type-word-des3 width_50" >
                         [{{form2.count10}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des3" >
                        [求租]
                      </div> 
                      <div class="left  type-word-des3 width_50" >
                         [{{form2.count11}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des3" >
                        [私客]
                      </div> 
                      <div class="left  type-word-des3 width_50" >
                         [{{form2.count12}}]
                      </div>  
                   </div> 

                   <div class="left p-l-100"  >
                      <span class="save-btn" @click="changeOut('客源记录',2)" >转出</span>
                   </div>  
                 </div> 
                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [报备记录]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count13}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [等待]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count14}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [有效]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count15}}]
                      </div>  
                   </div> 
                   <div class="left clear " >
                      <div class="left  type-word-des3" >
                        [新房带看]
                      </div> 
                      <div class="left  type-word-des3 width_50" >
                         [{{form2.count16}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des3" >
                        [有效排卡]
                      </div> 
                      <div class="left  type-word-des3 width_50" >
                         [{{form2.count17}}]
                      </div>  
                   </div>
                   

                   <div class="left " style="padding-left:145px;"  >
                      <span class="save-btn" @click="changeOut('报备记录',3)" >转出</span>
                   </div>  
                 </div> 
                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [房源钥匙]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count18}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [非归还来源]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count19}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [实体钥匙]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count20}}]
                      </div>  
                   </div> 
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [密码钥匙]
                      </div> 
                      <div class="left  type-word-des3 width_50" >
                         [{{form2.count21}}]
                      </div>  
                   </div>
                   <div class="left " style="padding-left:191px;"  >
                      <span class="save-btn" @click="changeOut('房源钥匙',4)" >转出</span>
                   </div>  
                 </div>
                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [楼盘字典]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count22}}]
                      </div>  
                   </div>
                   
                   <div class="left " style="padding-left:521px;"  >
                      <span class="save-btn"  @click="changeOut('楼盘字典',5)" >转出</span>
                   </div>  
                 </div>
                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [项目信息]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count23}}]
                      </div>  
                   </div>
                   
                   <div class="left " style="padding-left:521px;"  >
                      <span class="save-btn"  @click="changeOut('项目信息',6)" >转出</span>
                   </div>  
                 </div>
                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [内部钥匙]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count24}}]
                      </div>  
                   </div>
                   
                   <div class="left " style="padding-left:521px;"  >
                      <span class="save-btn"  @click="changeOut('内部钥匙',7)" >转出</span>
                   </div>  
                 </div>
                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [外联记录]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count25}}]
                      </div>  
                   </div>
                   
                   <div class="left " style="padding-left:521px;"  >
                      <span class="save-btn"  @click="changeOut('外联记录',8)" >转出</span>
                   </div>  
                 </div>
                 <div class="clear type-word-des3" style="text-align:right;padding-right:70px;" >
                   注：绿色字体代表有效房源/客源/报备 对应数据，且以上数据不转出影响人员删除
                 </div> 
                 <div class="break" style="width:720px;" >
                 </div> 
                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [房源跟进]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count26}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [带看]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count27}}]
                      </div>  
                   </div>
                   
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [其他]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count28}}]
                      </div>  
                   </div>
                   <div class="left " style="padding-left:356px;"  >
                      <span class="save-btn"  @click="changeOut('房源跟进',9)" >转出</span>
                   </div>  
                 </div>  

                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [客源跟进]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count29}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [带看]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count30}}]
                      </div>  
                   </div>
                   
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [其他]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count31}}]
                      </div>  
                   </div>
                   <div class="left" style="padding-left:356px;"  >
                      <span class="save-btn"  @click="changeOut('客源跟进',10)" >转出</span>
                   </div>  
                 </div>
                  <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [销售管理]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count32}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [认筹]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count33}}]
                      </div>  
                   </div>
                   
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [认购]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count34}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [定金]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count35}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [签约]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count36}}]
                      </div>  
                   </div>
                   <div class="left " style="padding-left:192px;"  >
                      <span class="save-btn"  @click="changeOut('销售管理',11)" >转出</span>
                   </div>  
                 </div> 
                 <div class="clear p-t-5" >
                   <div class="left clear " >
                      <div class="left type-word-des1" >
                        [交易合同]
                      </div> 
                      <div class="left  type-word-des1 width_50" >
                         [{{form2.count37}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [A二级渠道]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count38}}]
                      </div>  
                   </div>
                   
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [B三级买卖]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count39}}]
                      </div>  
                   </div>
                   <div class="left clear " >
                      <div class="left  type-word-des2" >
                        [C三级租赁]
                      </div> 
                      <div class="left  type-word-des2 width_50" >
                         [{{form2.count40}}]
                      </div>  
                   </div>
                   
                   <div class="left" style="padding-left:178px;"   >
                      <span class="save-btn"  @click="changeOut('交易合同',12)" >转出</span>
                   </div>  
                 </div>
                 <div class="clear type-word-des3" style="text-align:right;padding-right:70px;" >
                   注：此4类数据不转出不影响删除该人员
                 </div> 
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
                      <span class="file-icon "  @click="isShowPhotoAndFile(elem.id)" style="border-width:0px;"  ></span> 
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
          <el-tab-pane label="职变信息" name="staff" >
            <span slot="label" >职变信息</span>
            <div class="width_a" >
              <div class="pop-up-container" style="height: 440px;margin:0px;overflow:auto;">
                <div v-for="(elem,index) in dutyList" label="" class="boo" style="margin-top: 15px;margin-left: 40px">
                    <div style="width: 640px;height: 85px;border: 1px solid #88898c;background:#F2F2F2;">
                          <span class="wt1" style="margin-left: 5px">{{elem.createBy}}</span>
                          <span class="wt1" style="margin-left: 20px">{{elem.createTime}}</span>
                      <div class="wt2" style="margin-top: 15px;margin-left: 5px">
                          将&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="wt2">{{elem.type}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="wt2">{{elem.oldName}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修改为 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="wt2">{{elem.newName}}</span>
                      </div>
                    </div>
                </div>
              </div>
              <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >

                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="saveData"  >保 存</span>
                
              </div>
            </div> 
          </el-tab-pane>
        </el-tabs>
        <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;bottom: 25px;position: absolute;" >
          <div class="left" style="padding-right:7px;"  >
            <i class="up-page-icon" @click="upPage($event)" ></i>
          </div>
          <div class="left" >
            <i class="down-page-icon" @click="downPage($event)" ></i>
          </div>
        </div>
      </div>
      <div class="clear footerabsoluteclass">
        <div class="left footerabsoluteclasschild" >
          <span class="record-word" style="margin-left: -10px;">首次录入:</span>
          <span v-if="form.createBy" class="record-word">{{form.createBy}}</span>
          <span v-if="form.createTime" class="record-word">{{form.createTime}}</span>
          <span class="record-word footerpaddingleft20" style="margin-left: -10px;">最后修改:</span>
          <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
          <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
        </div>
      </div>
  </div>
</template>

<script>
  import {userUpdate,userde,userchange,imageList,updateImages,updatePhoto,newUserImage,userAboutDataCount,userAboutDataChange} from '../../../service/organizeDate'
  import {getFilesList9,deletedFiles9,uploadFiles9,updateFileName9} from '../../../service/fileData'
  import stafffour from './stafffour'
  import FilePage from '../../../components/file'
  import ChangeResourcePage from './changeResource'
  import QuestionDesPage from './questionDes'
  export default {
    name: 'persondetail',
    components:{
      stafffour,
      FilePage,
      ChangeResourcePage,
      QuestionDesPage
    },
    props:['layerid','myrow','type',"mythisindex"],
    data(){
      return {
        checkHouseValue1:false,
        checkHouseValue2:false,
        checkHouseValue3:false,
        checkHouseValue4:false,
        closingTime:[],//工资封账时间记录
        changeName1:'入职',
        changeName2:'首上',
        changeName3:'转正',
        changeName4:'离职',
        changeName5:'止薪',
        active1:false,
        active2:false,
        active3:false,
        active4:false,
        formType:"",
        row:this.myrow,
        getId:this.myrow.id,
        thisindex:this.mythisindex,
        activeName:"message",
        personid:"",
        deids:"",
        dename:"",
        twoDates:[],
        numParams:[],

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
         departData:'',
         stateShow:true,
         stateDisabled:true,
         stateDisabledTwo:false,
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
          disabled1:false,
          disabled2:false,
          disabled3:false,
          disabled4:false,
          disabled5:false,
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
          disabled1:false,
          disabled2:false,
          disabled3:false,
          disabled4:false,
          disabled5:false,
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
            departId:"",
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
        form2:{
          count1:0,
          count2:0,
          count3:0,
          count4:0,
          count5:0,
          count6:0,
          count7:0,
          count8:0,
          count9:0,
          count10:0,
          count11:0,
          count12:0,
          count13:0,
          count14:0,
          count15:0,
          count16:0,
          count17:0,
          count18:0,
          count19:0,
          count20:0,
          count21:0,
          count22:0,
          count23:0,
          count24:0,
          count25:0,
          count26:0,
          count27:0,
          count28:0,
          count29:0,
          count30:0,
          count31:0,
          count32:0,
          count33:0,
          count34:0,
          count35:0,
          count36:0,
          count37:0,
          count38:0,
          count39:0,
          count40:0,
        },
        pform:{
          heton:"",
          hearr:[],
          pemark:"",
          awrr:[]
        },
        elem:{
          id:'',
          deleted:0, 
          entryTime:'',
          firstTime:'',
          fullMemberTime:'',
          payOffTime:'',
          quitTime:'',
         },
        avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg',
       
        alldate:[],
        photoList:[],
        imageTypeparams:[],
        elemPhoto:{
          id:'',
          deleted:'0',
          imageTypeId:'',
          deleted:0,
          userId:'',
          remark:'',
        },
        dutyList:[],
      }
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
      changeTab(tab){
        let name = tab.name;
        if(name == "message"){
          if(!this.active1){
            this.active1 = true;
            this.initMessage(row);
          }
        }else if(name == 'picture'){
          if(!this.active2){
            this.active2 = true;
            this.initPicture();
          }
        }else if(name == 'staff'){
          if(!this.active3){
            this.active3 = true;
            this.initDutyChange();
          }
        }else if(name == 'data'){
           if(!this.active4){
            this.active4 = true;
            this.initUserDataCount();
          }
        }

      },
       showpe(){
         this.initMessage(); 
         
       },

      initMessage(){
        let _this = this;
        let row = this.row;
        let id=""
        if(row.id!=undefined&&row.id!=null){
          id=row.id
          this.form.deppt=row.departName;
        }else{
          id=row
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        userde(id).then(function (res) {
          let params = res.data.params;
          let closingTime = res.data.closingTime;
          _this.closingTime = closingTime;
          _this.imageTypeparams = params.imageTypeparams;
          _this.educationIdParams = params.educationIdParams;
          _this.nationIdParams = params.nationIdParams;
          _this.politicalIdParams = params.politicalIdParams;
          _this.sourceIdParams = params.sourceIdParams;
          _this.technicalIdParams=params.technicalIdParams;
          let numParams = params.numParams;
          numParams.forEach(item => {
            item.id = item.name;
          })
          _this.numParams = numParams;
         
          let useTypeIdParams = params.useTypeIdParams;
          if(useTypeIdParams && useTypeIdParams.length != 0){
             useTypeIdParams.forEach(item => {
             
            })
          }
          _this.useTypeIdParams = params.useTypeIdParams;
          let stateIdParams = params.stateIdParams;
          _this.stateIdParams = stateIdParams;
          if(stateIdParams && stateIdParams.length != 0){
             stateIdParams.forEach(item => {
              
            })
          }
          _this.staffIdParams = params.staffIdParams;
          let systre=res.data.params.systemSet;
          for(var i=0;systre.length>i;i++){
            
              if(systre[i].paramName=="新增员工进行【黑名单】检查"&&systre[i].paramData=="true"){
                _this.form.blacklist=1
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
          let photo = res.data.user.photo ;
          if(  photo != '' && photo != null && photo != 'undefined'){
            _this.avatar =res.data.user.photo;
          }
         
         
          let user = res.data.user;
          let dates = res.data.dates;
          let form1 = _this.form1;
          for(let attr in user){
            if(user[attr] == null || user[attr] == 'undefined'){
              user[attr] = "";
            }
          }
          _this.form = user;
          if(user){
            for(let attr in form1){
              if(user[attr]){
                form1[attr] = user[attr];
              }
            }
          }
          closingTime = closingTime.toString();
          dates.forEach(item => {
            item.disabled1 = false;
            item.disabled2 = false;
            item.disabled3 = false;
            item.disabled4 = false;
            item.disabled5 = false;
            debugger;
            if(closingTime){
              if(item.firstTime && closingTime.indexOf(item.firstTime) != 1){
                item.disabled2 = true;
              }
              if(item.quitTime &&  closingTime.indexOf(item.quitTime) != 1){
                item.disabled5 = true;
                item.disabled2 = true;
              }
            }
            
          })
          _this.dates = dates;
          _this.getAge();
          _this.changeState();
          _this.$layer.closeAll("loading");
        })
      },
      initUserDataCount(){
        let _this=this;
        
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = this.form.id;
        userAboutDataCount(id).then(function (response) {
           _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
              let count = response.data;
              _this.form2 = count;
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
          
        })
      },

      initPicture(){
        let _this = this;
        let id = this.getId;
        imageList(id).then(function (res) {
          if(res.status==0){
            let photoList = res.data.userImage;
            _this.photoList = photoList;
          }else {
            _this.myAlert(res.msg)
          }
        })
      },
      
      changeOut(titleName,type){

        let _this = this;
        let userId = this.form.id;
        let name = this.form.name;
        let departName = this.form.departName;
        let layerId = _this.$layer.iframe({
          content: {
            content: ChangeResourcePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              type:type,
              userId:userId,
            }//props
          },
          area:['350px','200px'],
          title: "["+departName+"-"+name+"]"+"  ["+titleName+"]     转出"  ,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
        

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
      initDutyChange(){
        let _this = this;
        let getId = this.getId;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        userchange(getId).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            
            let dutyChange = response.data.userChange;
            _this.dutyList = dutyChange;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
       
      saveData(){
        let _this=this;
        let id = this.form.id;
        let name = this.form.name;
        let idcard = this.form.idcard;
        let phone = this.form.phone;
        let homeAddress = this.form.homeAddress;
        let lunarBirthday  = this.form.lunarBirthday ;
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
        let num = this.form.num;
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
        
        dates = JSON.stringify(this.dates);
        let form = JSON.parse(JSON.stringify(this.form));
        let form1 = JSON.parse(JSON.stringify(this.form1));
        if(!dates){
          dates = "";
        }
        form.dates = dates;
        let formData = Object.assign(form,form1); 
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        userUpdate(formData).then(function (res) {
          _this.$layer.closeAll("loading");
          if(res.status==0){
            _this.myAlert(res.msg,'success-icon').then(res => {
                if(_this.type==2){
                    _this.$parent.searchListData();
                    _this.cancelData();
                  }else if( _this.type==1){
                  _this.$parent.gettreeData(_this.form.departId);
                  _this.cancelData();
                }
              }).catch(err => {

              })
          }else{
            if(_this.form.name==""){
              _this.myAlert("姓名项为空!")
            }else{
              _this.myAlert(res.msg)
            }

          }
        })
       
        let photoList=JSON.stringify(this.photoList);
        updateImages(photoList).then(function (res) {

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
        this.row = callbackdata.row;
        this.thisindex = callbackdata.thisindex;
        this.showpe();
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
        this.row = callbackdata.row;

        this.thisindex = callbackdata.thisindex;
        this.showpe();
      }, 

    },
    mounted(){
      this.showpe();
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisrowid == _this.row.id&&item.oneORmore==2){
          _this.$store.state.layerifranme.splice(index,1);
          _this.$parent.shadenum();
        };
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      })
    },
  }
</script>

<style lang="scss" scoped>
  .width-60{
    width:55px;
  }
  .width-110{
    width:110px;
  }
  .time-content{
    background: #fff;
    width: 670px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top:8px;
  }
  .question-gold-icon{
    display: inline-block;
    height:15px;
    width:15px;
    background: url("../../../images/icon2.png") -368px -61px;
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
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    height:24px;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    //background:#F0F0F0;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }

  /deep/ .el-tabs--border-card>.el-tabs__content {
    padding:0 !important;
  }
  
  /deep/ .pop-up{
    padding:8px 8px 0;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/iborder.png")  2 repeat ;
    .pop-up-container {
      margin: 0px;
    }
    /deep/ .el-tabs__item {
      padding: 0 20px;
      height: 20px;
      line-height:18px;
      font-size:12px;
    }
    /deep/.el-dialog__wrapper .el-button--default {
      margin-right: 0px !important;
    }
  }
   
  .foot-btn{
    display:inline-block;
    padding:3px 15px;
    border:1px solid #797979;
    cursor:pointer;
    font-size:12px;
  }
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
  .type-word-des1{
    color:#484746;
    font-weight:700;
    line-height:24px;
  }
  .type-word-des2{
    color:#666;
    line-height:24px;
  }
  .type-word-des3{
    color:#088383;
    line-height:24px;
  }
  .width_50{
    width:50px;
    text-align:left;
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
</style>
