<template>
  <div style="width:100%;padding:0 10px;" >
    <div class="pop-up" style="width:100%;padding:5px 10px 0;" >
      <el-tabs type="border-card" v-model="getActiveName"  @tab-click="changeTab"  >
        <el-tab-pane label="客源详情" name="house" >
          <span slot="label"  >客源详情</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;" >
              <div class="pop-up-container" style="margin:0px;height:446px;" >
                <el-form ref="formsData"  :model="form" >
                  <div class="" >
                    <div class="clear" >
                      <div class="left" >
                        <div class="left  padding-r-2" style="padding-left:13px;" >
                          <span class="word require-word" >客户</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="name" >
                            <el-input style="width:158px;" v-model.trim="form.name"  title="上限50个字" maxlength="50"  autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:13px;" >
                          <span class="word require-word" >手机号</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="phoneNum" >
                            <el-input @blur="checkCustomerPhone" style="width:120px;" v-model.trim="form.phoneNum"   title="上限15位数" maxlength="15" autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:49px;" >
                          <span class="word " >客户编号</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="customerCode" >
                            <el-input :disabled="true" v-model="form.customerCode" style="width:100px;"   title="[自动编号]"  autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2"  style="padding-left:10px;" >
                          <span class="word greent-word " >自定号</span>
                        </div>
                        <div class="left padding-r-1" style="" >
                          <el-form-item  prop="num" >
                            <el-select v-model="form.num" style="width:100px;" >
                              <el-option v-for="item in numParams"  :label="item.name" :value="item.name" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>

                      </div>
                    </div>

                    <div class="clear" >
                      <div class="left clear" >
                        <div class="left" >
                          <div class="clear" >
                            <div class="left  padding-r-2" style="padding-left:7px;" >
                              <span class="word " >联系人</span>
                            </div>
                            <div class="left" >
                              <el-form-item  prop="contactor" >
                                <el-input style="width:158px;" v-model.trim="form.contactor" title="上限50个字" maxlength="50" autocomplete="off"></el-input>
                              </el-form-item>
                            </div>
                          </div>
                          <div class="clear" >
                            <div class="left  padding-r-2" style="padding-left:7px;" >
                              <span class="word " >身份证</span>
                            </div>
                            <div class="left" >
                              <el-form-item  prop="idCard" >
                                <el-input  @blur="checkCustomerIdCard" style="width:158px;" v-model.trim="form.idCard"   title="上限18个字符" maxlength="18" autocomplete="off"></el-input>
                              </el-form-item>
                            </div>
                          </div>
                          <div class="clear" >
                            <div class="left  padding-r-2" style="padding-left:7px;" >
                              <span class="word " >现住址</span>
                            </div>
                            <div class="left" >
                              <el-form-item  prop="currentAddress" >
                                <el-input style="width:158px;" v-model.trim="form.currentAddress"  title="上限50个字" maxlength="50"  autocomplete="off"></el-input>
                              </el-form-item>
                            </div>
                          </div>
                        </div>
                        <div class="left" >
                          <div class="clear" >
                            <div class="left  padding-r-2" style="padding-left:32px;" >
                              <span class="word " >联系</span>
                            </div>
                            <div class="left" style="padding-top:2px;" >
                              <textarea v-model="form.comment" class="remark" title="上限250个字" maxlength="250" style="width:170px;height:52px;" ></textarea>
                            </div>
                          </div>
                          <div class="clear" >
                            <div class="left  padding-r-2" style="width:57px;text-align:right;" >
                              <span :class="{'word':true,'require-word':checkHouseValue5 == 'true'}" >来源</span>
                            </div>
                            <div class="left" >
                              <el-form-item  prop="source" >
                                <el-select v-model="form.source" style="width:120px;" >
                                  <el-option v-for="item in sourceParams"  :label="item.name" :value="item.id" ></el-option>
                                </el-select>

                              </el-form-item>

                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="left clear" >
                        <div class="clear" >
                          <div class="left  padding-r-2" style="width:48px;text-align:right;" >
                            <span :class="{'word':true,'require-word':checkHouseValue6 == 'true'}" >类别</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="category" >
                              <el-select v-model="form.category"  style="width:100px;" >
                                <el-option v-for="item in categoryParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-2 "  style="padding-left:21px;" >
                            <span class="word" >动机</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="motiveId" >
                              <el-select v-model="form.motiveId"  style="width:100px;" >
                                <el-option v-for="item in motiveIdParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                        </div>
                        <div class="clear" >
                          <div class="left  padding-r-2" style="padding-left:23px;" >
                            <span class="word" >国籍</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="nationalId" >
                              <el-select v-model="form.nationalId" style="width:100px;" >
                                <el-option v-for="item in nationalIdParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-2 "  style="padding-left:21px;" >
                            <span class="word" >现住</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="livingTypeId" >
                              <el-select v-model="form.livingTypeId"  style="width:100px;" >
                                <el-option v-for="item in livingTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                        </div>
                        <div class="clear" >
                          <div class="left  padding-r-2" style="padding-left:23px;" >
                            <span class="word" >性别</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="gender" >
                              <el-select v-model="form.gender"  style="width:100px;" >

                                <el-option   label="男" value="男" ></el-option>
                                <el-option   label="女" value="女" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-2 "  style="width:47px;text-align:right;" >
                            <span :class="{'word':true,'require-word':checkHouseValue10 == 'true'}"  >期限</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="duration" >
                              <el-select v-model="form.duration"  style="width:100px;" >
                                <el-option v-for="item in durationParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="break" >

                  </div>
                  <div class="clear" >
                    <div class="left clear left-content" >
                      <div v-show="moreFollow == 1" >
                        <div class="clear"style="padding-top:6px;position:relative;" >
                          <div class="left  padding-r-2" style="padding-left:12px;width:46px;height:20px;" >
                            <i @click="saleAndRentChange" :class="{'buy-icon':this.form.customerType==1,'rent-icon':this.form.customerType==2,'rent-buy-icon':this.form.customerType==3}"  ></i>
                          </div>
                          <div class="left" style="position: absolute;left: 40px;" >
                            <span :class="{'word':true,'require-word':checkHouseValue3 == 'true'}"  ></span>
                          </div>
                          <div class="left "  >
                            <el-form-item  prop="customerSaleStateId" >
                              <el-select class="" v-model="form.customerSaleStateId" style="width:50px;" >
                                <el-option v-for="item in customerSaleStateIdParams"  :label="item.name" :value="item.id" >
                                  <span class="" >{{item.name}}</span>
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left " style="padding-left:2px;" >
                            <el-form-item  prop="customerProperty1" >
                              <el-select class=""  v-model="form.customerProperty1" style="width:50px;" >
                                <el-option v-for="item in customerProperty1Params"  :label="item.name" :value="item.id" >
                                  <span class="" >{{item.name}}</span>
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left " style="padding-left:2px;" >
                            <el-form-item  prop="customerProperty2" >
                              <el-select class=""  v-model="form.customerProperty2"  style="width:50px;" >
                                <el-option v-for="item in customerProperty2Params"  :label="item.name" :value="item.id" >
                                  <span class="" >{{item.name}}</span>
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left  padding-r-2"  style="padding-left:10px;" >
                            <span class="word greent-word" >委托</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="delegateType" >
                              <el-select v-model="form.delegateType"  style="width:100px;" >
                                <el-option  v-for="item in delegateTypeParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="delegateDate" >
                              <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"  v-model="form.delegateDate" style="width: 92px;"></el-date-picker>
                            </el-form-item>
                          </div>
                        </div>
                        <div class="clear" >
                          <div class="left  padding-r-2" style="padding-left:13px;width:46px;text-align:right;" >
                            <span class="word"  >地址</span>
                          </div>
                          <div class="left" style="" >
                            <el-form-item >
                              <CheckSelect  @changeSelect="findStreetByTown" :selectId="townId" :listData="townParams" style="width:70px;" ></CheckSelect>
                            </el-form-item>
                          </div>
                          <div class="left " >
                            <el-form-item label="" >
                              <CheckSelect :selectId="streetId" :listData="streetParams" style="width:80px;" ></CheckSelect>
                            </el-form-item>
                          </div>
                          <div class="left " style="padding-left:2px;" >
                            <el-form-item  prop="address" >
                              <el-input   style="width:120px;" v-model.trim="form.address" title="上限20个字符" maxlength="20" autocomplete="off"></el-input>
                            </el-form-item>
                          </div>

                          <div class="left  padding-r-2"  style="padding-left:7px;" >
                            <span class="word" >特点</span>
                          </div>

                          <div class="left padding-r-1" style="" >
                            <el-form-item >
                              <CheckSelect :selectId="featureId" :listData="characteristicParams" style="width:76px;" ></CheckSelect>
                            </el-form-item>
                          </div>
                        </div>
                        <div class="clear" >
                          <div class="left  padding-r-2" style="padding-left:13px;width:46px;text-align:right;" >
                            <span class="word" >房型</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="roomShapeId" >
                              <el-select  v-model="form.roomShapeId"   style="width:140px;" >
                                <el-option v-for="item in roomShapeIdParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>


                          <div class="left  padding-r-2"  style="padding-left:15px;" >
                            <span class="word" >贷款资格</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="loanQualification" >
                              <el-select v-model="form.loanQualification"   style="width:55px;" >
                                <el-option  label=" " value="0" ></el-option>
                                <el-option  label="有" value="有" ></el-option>
                                <el-option  label="无" value="无" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left  padding-r-2"  style="padding-left:15px;" >
                            <span class="word" >购房资格</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="buyQualification" >
                              <el-select v-model="form.buyQualification" style="width:55px;" >
                                <el-option  label=" " value="0" ></el-option>
                                <el-option  label="有" value="有" ></el-option>
                                <el-option  label="无" value="无" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                        </div>
                        <div class="clear" >
                          <div class="left  padding-r-2" style="padding-left:13px;width:46px;text-align:right;" >
                            <span :class="{'word':true,'require-word':checkHouseValue4 == 'true'}" >面积</span>
                          </div>
                          <div class="left padding-r-1" >
                            <el-form-item  prop="area1" >
                              <el-input @input="checkNum1" title="上限10位数" maxlength="13"   v-model="form.area1" style="width:60px;"  ></el-input>
                            </el-form-item>
                          </div>
                          <div class="left " style="width:10px;text-align:center;line-height:28px;" >
                            -
                          </div>
                          <div class="left padding-r-1" >
                            <el-form-item  prop="area2" >
                              <el-input @input="checkNum2" title="上限10位数" maxlength="13"   v-model="form.area2" style="width:60px;"  ></el-input>
                            </el-form-item>
                          </div>
                          <div class="left  padding-r-1"  >
                            <span class="remark-word" >㎡</span>
                          </div>
                          <div class="left  padding-r-2" style="width:44px;text-align:right;" >
                            <span :class="{'word':true,'require-word':checkHouseValue2 == 'true'}" >价格</span>
                          </div>
                          <div class="left padding-r-1" >
                            <el-form-item  prop="price1" >
                              <el-input @input="checkNum3" title="上限6位数" maxlength="9"     v-model="form.price1"  style="width:60px;"  ></el-input>
                            </el-form-item>
                          </div>
                          <div class="left " style="width:10px;text-align:center;line-height:28px;" >
                            -
                          </div>
                          <div class="left padding-r-1" >
                            <el-form-item  prop="price2" >
                              <el-input   @input="checkNum4" title="上限6位数" maxlength="9"  v-model="form.price2"  style="width:60px;"  ></el-input>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-1" >
                            <el-form-item  prop="unit" >
                              <el-select v-model="form.unit" style="width:60px;" >

                                <el-option label="万元" value="万元" ></el-option>
                                <el-option label="元" value="元" ></el-option>
                              </el-select>

                            </el-form-item>
                          </div>

                        </div>

                        <div class="break" >

                        </div>
                      </div>
                      <div class="clear" >
                        <!--<div class="no-data-word" >
                          【无跟进记录或跟进记录被屏蔽】
                        </div>-->
                        <div   v-show="followOrMaster == 2 " class="clear" >
                          <div class="followList" :style="{'height':moreFollow == 1 ? '190px' : '320px','color':'#666'}" >
                            <div v-for="item in processings" :class="{'elemFollow':true,'clear':true,'click-check':item.id == deletedFollowId}" @click="getDeletedFollowId(item.id)" >
                              <div class="left overflowEellipsis" style="width:235px;height:16px;padding-left:5px;"  >
                                <span @click="editorFollowPage(item.id)" v-html="item.remark" style="cursor:pointer;"  :class="{'follow-word':true,'blur-word':item.type == '带看','survey-word':item.type == '勘察'}" ></span>
                              </div>
                              <div class="left break-left overflowEellipsis" style="width:80px;text-align:right;padding-right:5px;" >
                                <span class="follow-word" >{{item.createBy}}</span>
                              </div>
                              <div class="left overflowEellipsis" style="width:80px;text-align:left;" >
                                <span class="follow-word" >{{item.createTime}}</span>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="left right-content" >
                      <div class="clear padding-t-6" >
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word" >用途</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="roomUseId" >
                            <el-select :disabled="true" v-model="form.roomUseId" style="width:100px;" >
                              <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:20px;" >
                          <span class="word" >楼层</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="floor" >
                            <el-input v-model="form.floor"  title="上限10位数" maxlength="10"  style="width:100px;" ></el-input>

                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word" >类型</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="roomTypeId" >
                            <el-select v-model="form.roomTypeId"  style="width:100px;" >
                              <el-option v-for="item in roomTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:20px;" >
                          <span class="word" >朝向</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="roomDirectionId" >
                            <el-select v-model="form.roomDirectionId" style="width:100px;" >
                              <el-option v-for="item in roomDirectionIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word" >装修</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="decorateId" >
                            <el-select v-model="form.decorateId"  style="width:100px;" >
                              <el-option v-for="item in decorateIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:20px;" >
                          <span class="word" >{{checkHouseName4}}</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="paymentId" >
                            <el-select v-model="form.paymentId" style="width:100px;" >
                              <el-option v-for="item in paymentIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word" >优惠</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="preferentialId" >
                            <el-select v-model="form.preferentialId" style="width:100px;" >
                              <el-option v-for="item in preferentialIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:20px;" >
                          <span class="word" >{{checkHouseName3}}</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="commissionId" >
                            <el-select v-model="form.commissionId" style="width:100px;" >
                              <el-option v-for="item in commissionIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>

                      </div>
                      <div class="break" >
                      </div>
                      <div class="clear padding-t-10"  >
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word greent-word" >备注</span>
                        </div>
                        <div class="left">
                      <textarea
                        type="textarea"
                        style="width:247px;height:105px;"
                        maxLength="300"
                        title="上限300个字"
                        class="remark"
                        v-model="form.remark">
                      </textarea>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="width:41px;text-align:right;" >
                          <span class="word" >{{checkHouseName1}}</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="deptId1" >
                            <el-select @change="findUserByDepart(1)"  v-model="form.deptId1" style="width:128px;" >
                              <el-option  v-for="item in departTree"  :label="item.name" :value="item.id" >
                                <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" @click="valueChange(item)" >
                                  <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                                  <span v-if="item.state=='常态'">{{item.name}}</span>
                                </span>
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="empId1" >
                            <el-select   v-model="form.empId1" style="width:118px;" >
                              <el-option v-for="item in userList1"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="width:41px;text-align:right;" >
                          <span class="word" >{{checkHouseName2}}</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="deptId2" >
                            <el-select @change="findUserByDepart(2)" v-model="form.deptId2" style="width:128px;" >
                              <el-option v-for="item in departTree"  :label="item.name" :value="item.id" >
                                <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" @click="valueChange(item)" >
                                  <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                                  <span v-if="item.state=='常态'">{{item.name}}</span>
                                </span>
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>

                        <div class="left padding-r-1" >
                          <el-form-item  prop="empId2" >
                            <el-select   v-model="form.empId2" style="width:118px;" >
                              <el-option v-for="item in userList2"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>

                    </div>
                  </div>
                </el-form>
              </div>
            </div>
            <div slot="footer" class="footer-btn clear"  >
              <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;" >
                <div class="left" style="padding-right:7px;"  >
                  <i class="up-page-icon" @click="upPage($event)" ></i>
                </div>
                <div class="left" >
                  <i class="down-page-icon" @click="downPage($event)" ></i>
                </div>
              </div>
              <div class="left" >
                <el-select v-model="modifyType"  style="width:105px;" @visible-change="lookFollowByTypeSpecial"  >
                  <el-option  label="写入跟进" value="2" ></el-option>
                  <el-option  label="带看跟进" value="6" ></el-option>
                  <el-option  label="全部跟进" value="1" ></el-option>
                </el-select>
              </div>
              <div class="left" style="padding-left:2px;" >
                <span class="foot-btn" style="border-right-width:0px;" @click="showNewFollowPage" >写跟进</span>
              </div>
              <div class="left" >
                <span class="foot-btn" style="border-right-width:0px;" @click="deletedFollow" >删</span>
              </div>
              <div v-show="followOrMaster == 1" class="left foot-btn" style="padding:5px" >
                <i class="show-disabled-icon" ></i>
              </div>
              <div v-show="followOrMaster == 2" @click="lookMoreFollow" class="left foot-btn" style="padding:0px;border-width:0px;" >
                <i :class="{'show-icon':this.moreFollow==2,'hide-icon':this.moreFollow==1}" ></i>
              </div>

              <div class="left" style="padding-left:155px;" >
                <span class="foot-btn" style="border-color:#999;color:#999999;"  >看客户</span>
              </div>
              <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
              <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
            </div>


          
           
            <div class="component-container" >
              <MasterFollowPage :followShowMaster="masterFollowValue"  ref="masterFollow" ></MasterFollowPage>
            </div>
            <div class="component-container" >
              <HistoryFollowPage :followShowHistory="historyFollowValue"  ref="historyFollow" ></HistoryFollowPage>
            </div>
            <div class="component-container" >
              <HouseFollowPage :followShowHouse="houseFollowValue"  ref="houseFollow" ></HouseFollowPage>
            </div>
          </div>
        </el-tab-pane>
        <!--
        <el-tab-pane label="客源配对" name="pedestal" >

          <span slot="label">客源配对</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;" >
              <div class="pop-up-container " style="margin:0px;height:436px;" >
                <div  class="clear list-content" >
                  <div class="left left-assocition" >
                    <el-table
                      :data="tableData"
                      empty-text=" "
                      border
                      height="400px"
                      :loading="loading"
                      highlight-current-row
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column
                        type="selection"
                        width=30
                        ref="multipleTable">

                      </el-table-column>
                      <el-table-column
                        prop="houseType"
                        label="交易"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="50">

                      </el-table-column>

                      <el-table-column
                        prop="indexId"
                        label="顺位"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="50">
                        <template slot-scope="scope">
                          <div @click="modifySequenceNum(scope.row.id,scope.row.customerId)" style="cursor:pointer;">
                              <span style="font-weight:700;color:rgb(51, 102, 153);"  >
                                {{scope.row.indexId}}
                              </span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="processingStateId"
                        label="进程"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="50">
                        <template slot-scope="scope">
                          <div @click="modifyProgressElem(scope.row.id,scope.row.customerId)" style="cursor:pointer;">
                              <span  style="font-weight:700;color:rgb(51, 102, 153);"  >
                                {{scope.row.processingStateId}}
                              </span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="num"
                        label="自定"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="50">
                        <template slot-scope="scope">
                          <div @click="modifyCustomerNumElem(scope.row.houseId,scope.row.customerId)" style="cursor:pointer;">
                              <span  style="font-weight:700;color:rgb(51, 102, 153);"  >
                                {{scope.row.num}}
                              </span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="area"
                        label="地址"
                        sortable
                        :show-overflow-tooltip="true"
                        align="left"
                        width="190">
                        <template slot-scope="scope">
                          <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorRent(scope.$index, scope.row)" >
                            {{ scope.row.area }}
                          </div>
                        </template>
                      </el-table-column>

                      <el-table-column
                        prop="name"
                        label="员工"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="105">
                      </el-table-column>
                      <el-table-column
                        prop="createTime"
                        label="标记日期"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="90">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="left right-assocition" >
                    <div class="clear" >
                      <div class="click-btn" @click="modifyProgressState" >
                        批量修改进程状态
                      </div>
                    </div>
                    <div class="clear" >
                      <div class="click-btn" @click="modifyCustomerNum" >
                        批量修改自定号
                      </div>
                    </div>
                    <div class="clear" >
                      <div class="click-btn" @click="pairHouse" >
                        <div class="left" style="padding-left:5px;" >
                          <i class="association-icon" ></i>
                        </div>
                        <div class="left" style="padding-left:10px"   >
                          标记配对
                        </div>
                      </div>
                    </div>
                    <div class="clear" >
                      <div class="click-btn" @click="deletedAssociation" >
                        解除配对
                      </div>
                    </div>
                    <div class="clear" >
                      <div class="click-btn" @click="reloadAssociation" >
                        刷新
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" class="footer-btn clear"  >
              <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;" >
                <div class="left" style="padding-right:7px;"  >
                  <i class="up-page-icon" @click="upPage" ></i>
                </div>
                <div class="left" >
                  <i class="down-page-icon" @click="downPage" ></i>
                </div>
              </div>
              <div class="left" >
                <el-select v-model="modifyType"   style="width:105px;" @change="lookFollowByType" >
                  <el-option  label="全部跟进" value="1" ></el-option>
                  <el-option  label="写入跟进" value="2" ></el-option>
                  <el-option  label="修改跟进" value="3" ></el-option>
                  <el-option  label="带看跟进" value="6" ></el-option>
                  <el-option  label="历史跟进" value="5" ></el-option>

                </el-select>
              </div>
              <div class="left" style="padding-left:15px;" >
                <span class="foot-btn" style="border-right-width:0px;" @click="showNewFollowPage" >写跟进</span>
              </div>
              <div class="left" >
                <span class="foot-btn" style="color:#A6A9AC;border-right-width:0px;"  >删</span>
              </div>

              <div  class="left foot-btn" style="padding:5px;" >
                <i class="show-disabled-icon" ></i>
              </div>


              <div class="left" style="padding-left:175px;" >
                <span class="foot-btn" style="border-color:#999;color:#999999;"  >看客户</span>
              </div>

              <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
              <span class="right save-cancel-btn"  type="primary" @click="saveFormData" >保 存</span>
            </div>
          </div>
          <div class="component-container" >
            <ModifyProgressPage @findCustomerListByHouse="findCustomerListByHouse" :modifyProgressVisible="modifyProgressValue"  ref="modifyProgress" ></ModifyProgressPage>
          </div>
          <div class="component-container" >
            <ModifySequencePage  @findCustomerListByHouse="findCustomerListByHouse"  :modifySequenceVisible="modifySequenceValue"  ref="modifySequence" ></ModifySequencePage>
          </div>

          <div class="component-container" >
            <ModifyNumPage  @findCustomerListByHouse="findCustomerListByHouse"   :modifyNumVisible="modifyNumValue"  ref="modifyNumId" ></ModifyNumPage>
          </div>




        </el-tab-pane>
        -->

      </el-tabs>
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
  import {findbyId} from '../../../service/getData'
  import {rentConstParam} from '../../../utils/rentParam'
  import {editorCustomer,modifyCustomer,checkPhone,checkIdCard,checkBlack,followList,deletedFollow,customerFindPairList} from '../../../service/customerData'
  import {rentEditor,rentModify,lookMaster} from '../../../service/houseData'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {deletedCustomerPair} from '../../../service/customerData'
  import CheckSelect from "../../../components/checkSpecial1";
  // 编辑租售
  import EditorRentPage from '../../house/rent/editorRent'

  import NeWFollowPage from './newFollow'
  import EditorFollowPage from './editorFollow'
  import MasterFollowPage from './masterFollow'
  import HistoryFollowPage from './historyFollow'
  import HouseFollowPage from './houseFollow'
  import ModifyProgressPage from './modifyProgress'
  import ModifySequencePage from './modifySequence'
  // 房源配对
  import HousePairPage from './housePair'
  import ModifyNumPage from './modifyNum'

  let streetId = null;
  let repeatName = null;

  export default {
    props:['id','ids','layerid','activeName','currentIndex','mytitlename'],
    data() {
      return {

        getId:this.id,
        titlename:this.mytitlename,
        getCurentIndex:this.currentIndex,
        active1:false,
        acitve2:false,
        getIds:this.ids.split(","),
        getActiveName:this.activeName,
        dialogFormVisible:this.newRentVisible,

        buildingShowEdiotrValue:false,
        repeatRent:false,
        newShowFollowValue:false,
        editorShowFollowValue:false,
        historyFollowValue:false,
        houseFollowValue:false,
        masterFollowValue:false,
        pairHouseValue:false,
        modifyProgressValue:false,
        modifySequenceValue:false,
        keyOperationValue:false,
        modifyNumValue:false,
        loading:false,
        currentPage:null,
        tableData:[],
        multipleSelection:[],
        multipleSelection1:[],
        keyNum:0,
        select:'select',
        modifyType:'2',
        name:'',
        followOrMaster:2,
        followOrMasterName:"看业主",
        moreFollow:1,

        deletedFollowId:0,

        isCheckPhone:false,
        isCheckIdCard:false,
        idCardMessage:'',
        phoneMessage:'',
        townId:'townId',
        streetId:'streetId',
        featureId:'featureId',
        checkHouseValue1:"false",
        checkHouseValue2:"false",
        checkHouseValue3:"false",
        checkHouseValue4:"false",
        checkHouseValue5:"false",
        checkHouseValue6:"false",
        checkHouseValue7:"false",
        checkHouseValue8:"false",
        checkHouseValue9:"false",
        checkHouseValue10:"false",
        checkHouseValue11:"false",
        checkHouseValue12:"false",
        checkHouseName1:"员工1",
        checkHouseName2:"员工2",
        checkHouseName3:"付款",
        checkHouseName4:"付佣",
        townParams:[],
        streetParams:[],

        buyDisabled:'',
        rentDisabled:'',
        sourceParams:[],
        roomUseParams:[], //住宅
        numParams:[],      //自定号
        categoryParams:[], //类型
        motiveIdParams:[],    //动机
        livingTypeIdParams:[],
        nationalIdParams:[],  // 国籍
        durationParams:[], //期限
        customerSaleStateIdParams:[],   // 状态
        customerProperty1Params:[],
        customerProperty2Params:[],
        delegateTypeParams:[],   // 委托
        characteristicParams:[], //特点
        roomShapeIdParams:[],         // 房型
        roomUseParams:[],
        roomTypeIdParams:[],
        roomDirectionIdParams:[], //
        decorateIdParams:[], //
        paymentIdParams:[],  //

        preferentialIdParams:[], //
        commissionIdParams:[], //

        areas:[],        //地域
        decorateIdParams:[], //装修
        departTree:[],       // 部门

        userList1:[],
        userList2:[],
        processings:[],
        form: {
          customerCode:'',
          customerType:1,
          name:'',
          phoneNum:'',
          contactor:'',
          comment:'',
          idCard:'',
          currentAddress:'',
          source:'',

          num:' ',
          category:'0',
          motiveId:'0',
          nationalId:'0',
          gender:'0',
          livingTypeId:'0',
          duration:'0',

          customerSaleStateId:'0',
          customerProperty1:'0',
          customerProperty2:'0',
          delegateType:'0',
          delegateDate:'',

          towns:'0',
          streets:'0',
          address:'',
          features:'0',
          roomShapeId:'0',
          loanQualification:'0',
          buyQualification:'0',

          area1:'',
          area2:'',

          price1:'',
          price2:'',
          unit:'万元',

          roomUseId:'0',
          floor:'',
          roomTypeId:'0',
          roomDirectionId:'0',
          decorateId:'0',
          paymentId:'0',
          preferentialId:'0',
          commissionId:'0',
          remark:'',
          deptId1:'',
          deptId2:'',
          empId1:'',
          empId2:'',
          createTime:"",
          createBy:"",
          updateBy:"",
          updateTime:"",
        },

      };
    },
    components:{
      NeWFollowPage,
      EditorFollowPage,
      MasterFollowPage,
      HistoryFollowPage,
      HouseFollowPage,
      HousePairPage,
      ModifyNumPage,
      ModifyProgressPage,
      ModifySequencePage,
      CheckSelect,
      EditorRentPage
    },
    methods:{
      checkNum1(){
        this.form.area1= this.form.area1.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.area2= this.form.area2.replace(/[^\.\d]/g,'');
      },
      checkNum3(){
        this.form.price1= this.form.price1.replace(/[^\.\d]/g,'');
      },
      checkNum4(){
        this.form.price2= this.form.price2.replace(/[^\.\d]/g,'');
      },
      upPage(e){
        let count = this.getCurentIndex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata =  this.$parent.changeTitle(count,needlayerid,1);
        this.getCurentIndex = callbackdata.thisindex;
        this.getId = callbackdata.rowid;
        this.getCustomerEditor();
        this.findCustomerListByHouse();

      },
      downPage(e){
        let count = this.getCurentIndex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata =  this.$parent.changeTitle(count,needlayerid,2);
        this.getCurentIndex = callbackdata.thisindex;
        this.getId = callbackdata.rowid;
        this.getCustomerEditor();
        this.findCustomerListByHouse();
      },
      changeTab(tab){
        let _this = this;
        let label = tab.label;

        if(label == "客源详情"){
          if(!this.active1) {
            this.getCustomerEditor();
            this.active1 = true;
          }
        }else if(label == "客源配对"){
          if(!this.active2) {
            _this.findCustomerListByHouse();
            this.active2 = true;
          }
        }
      },
      findCustomerListByHouse(){
        let _this = this;
        let  id = _this.getId;

        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        customerFindPairList(id).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.tableData = response.data;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      modifyProgressState(){
        let selectId = this.multipleSelection;
        if(selectId.length == 0){
          this.myAlert("请选择房对信息",'dangerous-icon');
        }else {
          this.$refs.modifyProgress.showDialog(selectId.toString());
        }
      },
      modifyProgressElem(id){
        this.$refs.modifyProgress.showDialog(id);
      },
      //全选
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = [];
        _this.multipleSelection1 = [],
          elemCheckbox.forEach(item => {
            _this.multipleSelection.push(item.id);
            _this.multipleSelection1.push(item.houseId);
          });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
        _this.multipleSelection1 = Array.from(new Set(_this.multipleSelection1));
      },
      modifySequenceNum(id,customerId){
        this.$refs.modifySequence.showDialog(id,customerId);
      },

      modifyCustomerNum(){
        let _this = this;
        let select = this.multipleSelection1.toString();
        if(!select){
          this.myAlert("请选择房源",'dangerous-icon');
        }else {
          this.$refs.modifyNumId.newModifyNum(select);
        }
      },
      modifyCustomerNumElem(id){

        this.$refs.modifyNumId.newModifyNum(id);

      },
      signAssociation(){

      },
      deletedAssociation(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if(!select){
          this.myAlert("请选择房对信息",'dangerous-icon');
        }else{
          let customerId = this.getId;

          deletedCustomerPair(customerId,select).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              _this.myAlert("解除配对成功！",'success-icon').then(res => {
                _this.reloadAssociation();
              }).catch(err => {

              })
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }

      },
      reloadAssociation(){
        this.findCustomerListByHouse();
      },
      reloadRentList(){
        this.findCustomerListByHouse();
      },
      valueChange(){

      },
      checkPhoneNum(){
        let _this = this;
        let phone = _this.form.phoneNum;
        let phoneReg = /[^\.\d]/g;
        if (!phoneReg.test(phone)){
          _this.form.phoneNum =  _this.form.phoneNum.replace(/[^\.\d]/g,'');
          return true;
        }else{
          return false;
        }
      },
      checkCustomerPhone(){
        let _this =  this;
        let id = '';
        let phone = _this.form.phoneNum;
        _this.checkPhoneNum();
        checkPhone(id,phone).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.isCheckPhone = false;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.isCheckPhone = true;
            _this.phoneMessage = message;
          }
        })
      },
      checkIdCardNum(idCard){
        let _this = this;
        var idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!idcardReg.test(idCard)) {
          _this.myAlert('身份证输入不合法！','dangerous-icon');
          return true;
        }else{
          return false;
        }
      },
      checkCustomerIdCard(){
        let _this = this;
        let id = "";
        let idCard = _this.form.idCard;
        if(_this.checkIdCardNum(idCard)){
          return false;
        }
        checkIdCard(id,idCard).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.isCheckIdCard = false;
          } else if (response.status == 1) {
            _this.myAlert(message + "！");
            _this.isCheckIdCard = true;
            _this.idCardMessage = message;
          }
        })
      },
      checkBlackName(){
        let _this = this;
        let id = "";
        let phone = this.form.phoneNum;
        let idCard = this.form.idCard;
        checkBlack(phone,idCard).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.saveData();
          } else if (response.status == 1) {

            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      //获取参数
      getCustomerEditor(){
        let _this = this;
        let id = this.getId;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        editorCustomer(id).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            debugger;
            let data = response.data.params;
            let users1 = response.data.users1;
            let users2 = response.data.users2;
            if(users1 && users1.length != 0){
              let arr = [];
              users1.forEach(function(item){
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
              _this.userList1 = [{id:'0',name:' '}].concat(arr);
            }
            if(users2 && users2.length != 0){
              let arr = [];
              users2.forEach(function(item){
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
              _this.userList2 = [{id:'0',name:' '}].concat(arr);
            }
            let initArr = [{id:"0",name:" "}];
            if(data.roomUseParams){
              _this.roomUseParams = initArr.concat(data.roomUseParams);//住宅
            }
            if(data.numParams){
              _this.numParams = initArr.concat(data.numParams);  //自定号
            }
            if(data.categoryParams){
              _this.categoryParams = initArr.concat(data.categoryParams);
            }
            if(data.livingTypeIdParams){
              _this.livingTypeIdParams = initArr.concat(data.livingTypeIdParams);
            }
            if(data.durationParams){
              _this.durationParams = initArr.concat(data.durationParams);
            }

            if(data.motiveIdParams){
              _this.motiveIdParams = initArr.concat(data.motiveIdParams);//动机
            }

            if(data.nationalIdParams){
              _this.nationalIdParams = [].concat(data.nationalIdParams);// 国籍
            }
            if(data.delegateTypeParams){
              _this.delegateTypeParams = initArr.concat(data.delegateTypeParams);//委托
            }
            if(data.customerSaleStateIdParams){
              _this.customerSaleStateIdParams = [].concat(data.customerSaleStateIdParams);//状态
            }
            if(data.customerProperty1Params){
              _this.customerProperty1Params = [].concat(data.customerProperty1Params);
            }
            if(data.customerProperty2Params){
              _this.customerProperty2Params = [].concat(data.customerProperty2Params);
            }
            if(data.characteristicParams) {
              let featureIds = response.data.featureIds;
              let characteristicParams = data.characteristicParams;
              let arr = [];
              characteristicParams.forEach(function (item) {
                let obj = {
                  id: item.id,
                  name: item.name,
                  select: false,
                };

                if (featureIds && featureIds.toString().indexOf(item.id) != -1) {
                  obj.select = true;
                }
                arr.push(obj);
              })
              _this.characteristicParams = arr;
            }

            if(data.areas){
              let areas = data.areas;
              let arr = [];
              let townIds = response.data.townIds;
              areas.forEach(function(item){
                let obj = {
                  id:item.id,
                  name:item.label,
                  select:false,
                };

                if(townIds && townIds.toString().indexOf(item.id) != -1){
                  obj.select = true;
                }
                arr.push(obj);
              })
              _this.townParams = arr;//地域
            }
            if(response.data.streetIds){
              let streets = response.data.streets
              let arr = [];
              let streetIds = response.data.streetIds;
              streets.forEach(function(item){
                let obj = {
                  id:item.id,
                  name:item.label,
                  select:false,
                };
                if(streetIds && streetIds.toString().indexOf(item.id) != -1){
                  obj.select = true;
                }
                arr.push(obj);
              })
              _this.streetParams = arr;//地域
            }
            if(data.sourceParams){
              _this.sourceParams = initArr.concat(data.sourceParams);//来源
            }
            if(data.roomShapeIdParams){
              _this.roomShapeIdParams = initArr.concat(data.roomShapeIdParams);//房型
            }
            if(data.roomUseParams){
              _this.roomUseParams = initArr.concat(data.roomUseParams);
            }
            if(data.roomTypeIdParams){
              _this.roomTypeIdParams = [].concat(data.roomTypeIdParams);
            }
            if(data.roomDirectionIdParams) {
              _this.roomDirectionIdParams = initArr.concat(data.roomDirectionIdParams);
            }
            if(data.decorateIdParams){
              _this.decorateIdParams = initArr.concat(data.decorateIdParams);//装修
            }
            if(data.paymentIdParams) {
              _this.paymentIdParams = initArr.concat(data.paymentIdParams);
            }
            if(data.preferentialIdParams) {
              _this.preferentialIdParams = initArr.concat(data.preferentialIdParams);
            }
            if(data.commissionIdParams) {
              _this.commissionIdParams = initArr.concat(data.commissionIdParams);
            }
            if(data.departTree){
              let arr = [];
              let treeData = data.departTree
              for(let i = 0 ; i < treeData.length; i++){
                arr.push({
                  id:treeData[i].id,
                  name:treeData[i].label.replace(/&nbsp;/g,""),
                  level:treeData[i].level,
                  state:treeData[i].state
                })
              }
              _this.departTree = arr; // 部门
            }
            let systemSet = data.systemSet;
            if(systemSet && systemSet.length != 0){
              systemSet.forEach(function(item){
                if(item.paramName == '客源【价格】必填'){
                  _this.checkHouseValue2 = item.paramData;
                }
                if(item.paramName == '客源【状态】必填'){
                  _this.checkHouseValue3 = item.paramData;
                }
                if(item.paramName == '客源【面积】必填'){
                  _this.checkHouseValue4 = item.paramData;
                }
                if(item.paramName == '客源【来源】必填'){
                  _this.checkHouseValue5 = item.paramData;
                }
                if(item.paramName == '客源【类别】必填'){
                  _this.checkHouseValue6 = item.paramData;
                }
                if(item.paramName == '客源【意向】必填'){
                  _this.checkHouseValue7 = item.paramData;
                }
                if(item.paramName == '电话查重警告'){
                  _this.checkHouseValue8 = item.paramData;
                }
                if(item.paramName == '身份证查重警告'){
                  _this.checkHouseValue9 = item.paramData;
                }
                if(item.paramName == '客源【期限】必填'){
                  _this.checkHouseValue10 = item.paramData;
                }
                if(item.paramName == '重复客源拒绝保存'){
                  _this.checkHouseValue11 = item.paramData;
                }
                if(item.paramName == '新增客源进行【黑名单】检查'){
                  _this.checkHouseValue12 = item.paramData;
                }

                if(item.paramName == '归属人1改名'){
                  _this.checkHouseName1 = item.paramData.substr(0,3);
                }
                if(item.paramName == '归属人2改名'){
                  _this.checkHouseName2 = item.paramData.substr(0,3);
                }
                if(item.paramName == '付款改名f4'){
                  _this.checkHouseName3 = item.paramData.substr(0,2);
                }
                if(item.paramName == '付佣改名f4'){
                  _this.checkHouseName4 = item.paramData.substr(0,2);
                }
              })
            }

            let basic = response.data.customerBasic;

            for(let attr in basic){
              if(basic[attr] != null && basic[attr] != '0'){
                if(typeof basic[attr] == 'string' || typeof basic[attr] == 'number' ){
                  _this.form[attr] = basic[attr].toString();
                }else{
                  _this.form[attr] = basic[attr];
                }
              }
            }

            //跟进
            let processings = response.data.processings;
            if(processings && processings.length != 0){
              processings.forEach(function(item){
                if(item.remark && item.remark.length > 20){
                  item.remark = item.remark.substring(0,20)+"...";
                }
              })
              _this.processings = processings;
            }else {
              _this.processings = [];
            }
            /*
             let roomType = _this.form.roomType;
             if(roomType == 1){
             _this.saleDisabled = false;
             _this.rentDisabled = true;
             }else if(roomType == 2){
             _this.saleDisabled = true;
             _this.rentDisabled = false;
             }else if(roomType == 3){
             _this.saleDisabled = false;
             _this.rentDisabled = false;
             }

             */

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
          _this.$layer.closeAll("loading");
        })
      },
      //切换图标
      saleAndRentChange(){
        let customerType = this.form.customerType;
        let buyDisabled = this.buyDisabled;
        let rentDisabled=  this.rentDisabled;
        if(customerType == 1){
          this.form.customerType = 2;
          this.buyDisabled = true;
          this.rentDisabled = false;
        }else if(customerType == 2){
          this.form.customerType = 3;
          this.buyDisabled = false;
          this.rentDisabled = false;
        }else if(customerType == 3){
          this.form.customerType = 1;
          this.buyDisabled = false;
          this.rentDisabled = true;
        }
      },
      //地域查询街镇
      findStreetByTown(val){
        let _this = this;
        let ids = _this.getSelectIdByList(_this.townParams);
        if(ids){
          findbyId(ids).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let arr = [];
              data.forEach(function(item){
                arr.push({
                  id:item.id,
                  name:item.label,
                  select:false,
                })
              })
              _this.streetParams = arr;//地域

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }

      },

      findUserByDepart(value){
        let _this = this;
        let id = null;
        let userList = "";
        if(value == 1){
          id = this.form.deptId1;
          userList = "userList1";
        }else if(value == 2){
          id = this.form.deptId2;
          userList = "userList2";
        }
        if(id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'0',name:' '}];
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
              _this[userList] =  arr;
              _this.form["empId"+value] = '0';
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      showNewFollowPage(){
        let name = this.form.name;
        let paste = this.checkHouseValue1;
        let customerType = this.form.customerType;
        let layerId = this.$layer.iframe({
          content: {
            content: NeWFollowPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{thisId:this.getId,name:name,paste:paste,customerType:customerType}//props
          },
          area:['500px','350px'],
          title: "客源跟进【"+name+"】",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
       });
      },


      editorFollowPage(id){
        
        // this.$refs["editorFollow"].showFollowVisible(customerId,name,id,paste);

        let _this = this;
        let customerId = _this.getId;
        let name = _this.form.name;
        let paste = _this.checkHouseValue1;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorFollowPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{mycustomerId:customerId,myname:name,myid:id,mypaste:paste}//props
          },
          area:['500px','350px'],
          title:"客源跟进 【" + name + "】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });
      },
      getDeletedFollowId(id){
        this.deletedFollowId = id;
      },
      deletedFollow(){
        let _this = this;
        let deletedFollowId = this.deletedFollowId;
        if(deletedFollowId){
          _this.myConfirm("警告：客源跟进记录删除后不能还原！", 'question-icon','确认','取消','确定要永久删除选定的跟进记录吗？','my-message').then(res => {
            _this.sureDeletedFollow();
          }).catch(err => {

          })
        }else{
          this.myAlert("请选择要删除的跟进",'dangerous-icon');
        }

      },
      sureDeletedFollow(){
        let _this = this;
        let deletedFollowId = this.deletedFollowId;

        deletedFollow(deletedFollowId,1).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.deletedFollowId = 0;
            _this.myAlert("删除成功",'success-icon').then(res => {
              _this.getFollowList();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      getFollowList(selectType = ""){
        let _this = this;
        let id = _this.getId;
        let type = "写入跟进";
        let modifyType = this.modifyType;
        if(modifyType == 2){
          type = '写入跟进';
        }else if(modifyType == 6){
          type = '带看跟进';
        }
        if(selectType){
          type = selectType;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        followList(id,type).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            //跟进
            let processings = response.data;
            if(processings && processings.length != 0){
              processings.forEach(function(item){
                if(item.remark && item.remark.length > 20){
                  item.remark = item.remark.substring(0,20)+"...";
                }
              })
              _this.processings = processings;
            }else {
              _this.processings = [];
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      lookMasterFollow(id){
        this.$refs.masterFollow.dialogShow(id,this.form.name);
      },
      lookHistoryFollow(id){
        this.$refs.historyFollow.dialogShow(id,this.form.name);
      },
      lookHouseFollow(id){
        this.$refs.houseFollow.dialogShow(id,this.form.name);
      },
      lookFollowByType(value){
        if(value == 2){
          this.getFollowList('写入跟进');
        }else if(value == 6){
          this.getFollowList('修改跟进');
        }else if(value == 1){
          this.lookHouseFollow(this.getId,this.titlename);
        }
      },

      lookFollowByTypeSpecial(state){
        if(!state){
          this.lookFollowByType(this.modifyType);
        }
      },



      lookMoreFollow(){
        let moreFollow = this.moreFollow;
        if(moreFollow == 1){
          this.moreFollow = 2;
        }else{
          this.moreFollow =1;
        }
      },
      saveFormData(){
        let _this =  this;
        let name = _this.form.name;
        let phoneNum = _this.form.phoneNum;
        let empId1 = _this.form.empId1;
        let idCard = _this.form.idCard;
        let source = _this.form.source;
        let category = _this.form.category;
        let price1 = _this.form.price1;
        let price2 = _this.form.price2;
        let area1 = _this.form.area1;
        let area2 = _this.form.area2;
        let duration = _this.form.duration;
        let checkHouseValue1 = _this.checkHouseValue1;
        let checkHouseValue2 = _this.checkHouseValue2;
        let checkHouseValue3 = _this.checkHouseValue3;
        let checkHouseValue4 = _this.checkHouseValue4;
        let checkHouseValue5 = _this.checkHouseValue5;
        let checkHouseValue6 = _this.checkHouseValue6;
        let checkHouseValue7 = _this.checkHouseValue7;
        let checkHouseValue8 = _this.checkHouseValue8;
        let checkHouseValue9 = _this.checkHouseValue8;
        let checkHouseValue10 = _this.checkHouseValue10;
        let checkHouseValue11 = _this.checkHouseValue11;
        let checkHouseValue12 = _this.checkHouseValue12;
        if(!name){
          _this.myAlert("客户不能为空！",'dangerous-icon');
          return false;
        }
        if(!phoneNum){
          _this.myAlert("手机号不能为空！",'dangerous-icon');
          return false;
        }

        if(checkHouseValue6 == 'true' && (category == "0" || category== "" )){
          this.myAlert("类别不能为空！",'dangerous-icon');
          return false;
        }
        if(checkHouseValue5 == 'true' && (source == "" || source== "0" )){
          this.myAlert("来源不能为空！",'dangerous-icon');
          return false;
        }
        if(checkHouseValue10 == 'true' && (duration == "0" || duration== "" )){
          this.myAlert("期限不能为空！",'dangerous-icon');
          return false;
        }


        if(checkHouseValue4 == 'true' && (area1 == '' || area1 == '0.00' || area1 == '0.0' ||
          area2 == '' || area2 == '0.00' || area2 == '0.0')){
          this.myAlert("面积不能为空！",'dangerous-icon');
          return false;
        }
        if(checkHouseValue2 == 'true' && (price1 == '' || price1 == '0.00' || price1 == '0.0' ||
          price2 == '' || price2 == '0.00' || price2 == '0.0')){
          this.myAlert("价格不能为空！",'dangerous-icon');
          return false;
        }


        if(empId1 == '0' ||  empId1 == ''){
          _this.myAlert("员工1不能为空！",'dangerous-icon');
          return false;
        }
        if(idCard &&  _this.checkIdCardNum(idCard)){
          return false;
        }
        if(checkHouseValue11 == "true"){
          if(_this.isCheckPhone){
            let phoneMessage = _this.phoneMessage;
            _this.myAlert(phoneMessage,"dangerous-icon").then(res => {
              return false;
            }).catch(err => {
              return false;
            })
            return false;
          }
          if(_this.isCheckIdCard){
            let idCardMessage = _this.idCardMessage;
            _this.myAlert(idCardMessage,"dangerous-icon").then(res => {
              return false;
            }).catch(err => {
              return false;
            })
            return false;
          }
        }

        if(checkHouseValue8 == 'true' && _this.isCheckPhone){
          _this.myConfirm("手机号重复！", 'question-icon','是','否','继续保存').then(res => {
            if(checkHouseValue9 == 'true' && _this.isCheckIdCard){
              _this.myConfirm("身份证号重复！", 'question-icon','是','否','继续保存').then(res => {
                if(checkHouseValue12 == "true"){
                  _this.checkBlackName();
                }else{

                }
              }).catch(err => {
              })
              return false;
            }else{
              if(checkHouseValue12 == "true"){
                _this.checkBlackName();
              }else{

              }
            }
          }).catch(err => {
          })
          return false;
        }else{
          if(checkHouseValue9 == 'true' && _this.isCheckIdCard){
            _this.myConfirm("身份证号重复！", 'question-icon','是','否','继续保存').then(res => {
              if(checkHouseValue12 == "true"){
                _this.checkBlackName();
              }else{

              }
            }).catch(err => {
            })
            return false;
          }else{
            if(checkHouseValue12 == "true"){
              _this.checkBlackName();
            }else{
              _this.saveData();
            }
          }
        }
      },
      saveData(){
        let _this = this;

        let townIds = _this.getSelectIdByList(_this.townParams);
        let streestIds = _this.getSelectIdByList(_this.streetParams);
        let form = JSON.parse(JSON.stringify(_this.form));
        form.features   = _this.getSelectIdByList(_this.characteristicParams);
        form.towns = townIds;
        form.streets = streestIds;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        modifyCustomer(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {

            _this.myAlert("客源保存成功！", 'success-icon',).then(res => {
              _this.clearFormData();
              _this.$parent.reloadCustomerList(3,_this.getId);
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
      getStreetId(value){
        streetId = value;
      },
      //恢复初始数据
      clearFormData(formRule){
        this.$refs.formsData.resetFields();
        this.form.roomType = 1;
        this.saleDisabled = false;
        this.rentDisabled = true;
        this.$layer.close(this.layerid);
      },
      pairHouse(){
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: HousePairPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{'getCustomerId':this.getId}//props
          },
          area:['656px','448px'],
          title: "标记配对",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });
      },

     
      addOrDeletedKey(item){
        if(item.isAdd){
          let obj = JSON.parse(JSON.stringify(this.elemKey));
          this.form1.push(obj);
        }else{
          item.deleted = 1;
        }
      },
      addKey(){
        let obj = JSON.parse(JSON.stringify(this.elemKey));
        this.form1.push(obj);
      },
      //通过id获取name
      getNameFromList(list,id,type){
        let name = "";
        if(list && list.length != 0){
          list.forEach(function(item){
            if(item.id == id ){
              name = item[type];
            }
          })
        }
        return name;
      },
      //通过name获取id
      getIdFromList(list,name){
        let id = 0;
        if(list && list.length != 0){
          list.forEach(function(item){
            if(item.name == name ){
              id = item.id;
            }
          })
        }
        return id;
      },
      showKeyFollow(item){
        this.$refs.keyOperationId.dialogShow(item.id);
      },
      getSelectIdByList(list){
        let arr = [];
        if(list && list.length != 0) {
          list.forEach(function (item) {
            if (item.select) {
              arr.push(item.id);
            }
          })
        }
        return arr.toString();
      },
      editorRent(index, row){
        let _this = this;
        let ids = [];
        let currentData = this.tableData;
        let len = currentData.length;
        for(let i = 0 ;  i < len; i ++){
          ids.push(currentData[i].houseId);
        }
        this.currentPage = row;
        let test = _this.$layer.iframe({
          content: {
            content: EditorRentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.houseId,address:row.area,activeName:'house',ids:ids.toString(),currentIndex:index}//props
          },
          area:['800px','560px'],
          title: "房源信息 【"+this.currentPage.area+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },
    },
    mounted(){

      if(this.getActiveName == 'house'){
        this.getCustomerEditor();
        this.active1 = true ;
      }else {
        this.findCustomerListByHouse();
        this.active2 = true;
      }
    },
    watch:{
      'form.area1':function(newval, oldval){
        var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.area1 = undefined;
            return;
          }
          this.form.area1 = oldval
        } else {
          this.form.area1 = newval.replace(/^\./g, "")
        }
      },
      'form.area2':function(newval, oldval){
        var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.area2 = undefined;
            return;
          }
          this.form.area2 = oldval
        } else {
          this.form.area2 = newval.replace(/^\./g, "")
        }
      },
      'form.price1':function(newval, oldval){
        var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.price1 = undefined;
            return;
          }
          this.form.price1 = oldval
        } else {
          this.form.price1 = newval.replace(/^\./g, "")
        }
      },
      'form.price2':function(newval, oldval){
        var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.price2 = undefined;
            return;
          }
          this.form.price2 = oldval
        } else {
          this.form.price2 = newval.replace(/^\./g, "")
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
      _this.$parent.shadenum();
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../../style/customer.scss'
</style>
<style lang="scss">
  .special-select-color  .el-input__inner{
    color:#088383;
  }
</style>
