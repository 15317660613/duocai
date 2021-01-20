<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="width:100%;padding:9px 10px 33px;" >
      <el-tabs type="border-card" v-model="getActiveName"  @tab-click="changeTab"  >
        <el-tab-pane label="项目资料" name="project" >
          <span slot="label"  >项目资料</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0;" >
              <div class="pop-up-container" style="margin:0px;height:442px;overflow-y:auto;overflow-x:hidden;" >
                   <el-form ref="formsData"  :model="form" >
                  <div class="clear" >
                    <div class="left left-fundation"  >
                      <div class="clear" >
                  <span class="message-title" >
                    基础信息
                  </span>
                      </div>
                      <div class="img-style" >
                        <image src=""  style="" />
                      </div>
                    </div>
                    <div class="left center-fundation"  >
                      <div class="clear" >
                        <div class="left  padding-r-2 des-left-word"  >
                          <span class="word " >项目编号</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="projectCode" >
                            <el-input :disabled="true" style="width:100px;" v-model.trim="form.projectCode"  title="[自动编号]"  autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2 des-word" style="width:72px;"  >
                          <span class="word require-word" >项目名称</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="projectName" >
                            <el-input style="width:100px;" v-model.trim="form.projectName" maxlength="20" title="上限20个字"  autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear" >
                        <div class="left  padding-r-2 des-left-word" >
                          <span class="word require-word" >地域</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="districtId" >
                            <el-select @change="findStreeByTown" v-model="form.districtId"    style="width:100px;" >
                              <el-option v-for="item in areas"  :label="item.label" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="streetId" >
                            <el-select v-model="form.streetId"    style="width:170px;" >
                              <el-option v-for="item in streetArr"  :label="item.label" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear" >
                        <div class="left  padding-r-2 des-left-word" >
                          <span class="word " >信息负责人</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="responsibleEmpDepart" >
                            <el-select @change="findUserByDepart" v-model="form.responsibleEmpDepart"    style="width:100px;" >
                              <el-option  label=" " value="" ></el-option>
                              <el-option  v-for="item in departTree"  :label="item.name" :value="item.id">
                                <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                                  <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                                  <span v-if="item.state=='常态'">{{item.name}}</span>
                                </span>
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="responsibleEmp" >
                            <el-select v-model="form.responsibleEmp"    style="width:170px;" >
                              <el-option  label=" " value="" ></el-option>
                              <el-option v-for="item in userParams"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear" >
                        <div class="left  padding-r-2 des-left-word"  >
                          <span class="word special-color-word" >投&nbsp;资&nbsp;商</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="investor" >
                            <el-input v-model="form.investor" maxlength="20" title="上限20个字，数字/字母/汉字"    style="width:100px;" >

                            </el-input>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2 des-word" style="width:70px;"  >
                          <span class="word special-color-word" >开&nbsp;发&nbsp;商</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="developer" >
                            <el-input v-model="form.developer" maxlength="20" title="上限20个字，数字/字母/汉字"   style="width:100px;" >

                            </el-input>
                          </el-form-item>
                        </div>

                      </div>
                      <div class="clear" style="position:relative;" >
                        <div class="left  padding-r-2 des-left-word"    >
                          <span class="word special-color-word" >拿地日期</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="placeGetDate" >
                            <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.placeGetDate" style="width: 100px;"></el-date-picker>
                          </el-form-item>
                        </div>
                        <div class="clear" style="position: absolute;left: 173px;width: 351px;" >
                          <div class="left  padding-r-2 des-left-word"  >
                            <span class="word " >销售地址</span>
                          </div>
                          <div class="left padding-r-2" >
                            <el-form-item  prop="projectAddress" >
                              <el-input style="width:272px;" v-model.trim="form.projectAddress" maxlength="60" title="上限60个字" autocomplete="off"></el-input>
                            </el-form-item>
                          </div>
                        </div>


                      </div>
                    </div>
                    <div class="left right-fundation"  >
                      <div class="clear" >
                        <div class="left  padding-r-2 des-word" style="width:70px;"  >
                          <span class="word " >登记名称</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="registerName" >
                            <el-input style="width:100px;" v-model.trim="form.registerName"   maxlength="20" title="上限20个字" autocomplete="off"></el-input>
                          </el-form-item>
                        </div>

                      </div>
                      <div class="clear" >
                        <div class="left  padding-r-2 des-word"  style="width:70px;"  >
                          <span class="word " >自定号</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="num" >
                            <el-select v-model="form.num"    style="width:100px;" >
                              <el-option  label=" " value="" ></el-option>
                              <el-option v-for="item in numParams"  :label="item.name" :value="item.name" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>

                      </div>
                      <div class="clear" >
                        <div class="left  padding-r-2 des-word" style="width:70px;"  >
                          <span class="word special-color-word" >营销状态</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="projectState" >
                            <el-select v-model="form.projectState"    style="width:100px;" >
                              <el-option  label=" " value="" ></el-option>
                              <el-option v-for="item in projectStateParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>

                      </div>
                      <div class="clear" >
                        <div class="left  padding-r-2 des-word" style="width:70px;"  >
                          <span class="word special-color-word" >合作状态</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="projectState" >
                            <el-select v-model="form.cooperateState"    style="width:100px;" >
                              <el-option  label=" " value="" ></el-option>
                              <el-option v-for="item in cooperateStateParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="break" >
                  </div>
                  <div class="sell-content" >
                    <div class="clear" >
                  <span class="message-title" >
                    销售信息
                  </span>
                    </div>
                    <div class="clear" >
                      <div class="clear" style="position:relative;" >
                        <div style="position:absolute;right:20px;" >
                          <i @click="showMoreHouse" :class="{'up-show-icon':showHouse,'down-hide-icon':!showHouse}" ></i>
                        </div>
                        <div class="clear" style="border-bottom:1px solid #BCBCBC;width:680px;" >
                          <div class="left" >
                            <span class="des-type-word" >销售情况</span>
                          </div>
                          <div class="left clear" style="width:610px;" >
                            <div class="left clear every-check" v-for="(item,index) in countAllParams" >
                              <div class="left word" >
                                {{item}}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-show="showHouse == true" class="clear" style="width:600px;padding-left:60px;"  >
                          <div class="left clear every-check"  >
                            <div class="left word" style="color:#999999;padding-right:15px;" v-for="(item,index) in countParams" >
                              {{item}}
                            </div>
                          </div>

                        </div>
                      </div>
                      <div class="clear" >
                        <div class="left" >
                          <span class="des-type-word" >项目证件</span>
                        </div>
                        <div class="left clear" >
                          <div class="left clear every-check" v-for="(item ,index ) in documentsParams" >
                            <div class="left" >
                              <input type="checkbox" style="height:28px;"   v-model="item.check"  :value="item.id"  ></input>

                            </div>
                            <div class="left" >
                              <span class="check-des-word" >{{item.name}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="clear" >
                        <div class="left" >
                          <span class="des-type-word" >产品类型</span>
                        </div>
                        <div class="left clear" >
                          <div class="left clear every-check-special" v-for="(item ,index ) in typesParams" >
                            <div class="left" >

                              <input type="checkbox"   style="height:28px;"   v-model="item.check"  :value="item.id"  ></input>

                            </div>
                            <div class="left" >
                              <span class="check-des-word" >{{item.name}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="clear" >
                        <div class="left" >
                          <span class="des-type-word" >项目亮点</span>
                        </div>
                        <div class="left clear" >
                          <div class="left clear every-check-special" v-for="(item ,index ) in highlightsParams" >
                            <div class="left" >

                              <input type="checkbox"  style="height:28px;"   v-model="item.check" :value="item.id"  ></input>

                            </div>
                            <div class="left" >
                              <span class="check-des-word" >{{item.name}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="clear" >
                        <div class="left des-type-special-word"  >
                          <span class="word" >项目均价</span>
                        </div>
                        <div class="left padding-r-2"  >
                          <el-form-item  prop="avePriceLow" >
                            <el-input @input="checkNum1" style="width:80px;" title="上限10位数" maxlength="13" v-model.trim="form.avePriceLow" autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                        <div class="left " >
                          <el-form-item  prop="avePriceHigh" >
                            <el-input @input="checkNum2"  style="width:80px;" title="上限10位数" maxlength="13" v-model.trim="form.avePriceHigh" autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-2" >
                          <span class="word" >元/㎡</span>
                        </div>
                        <div class="left des-type-special-word" style="width:95px;" >
                          <span class="word" >主力面积</span>
                        </div>
                        <div class="left padding-r-2"  >
                          <el-form-item  prop="avePriceLow" >
                            <el-input @input="checkNum7" style="width:80px;" maxlength="13" title="上限10位数"  v-model.trim="form.areaLow" autocomplete="off" ></el-input>
                          </el-form-item>
                        </div>
                        <div class="left " >
                          <el-form-item  prop="avePriceHigh" >
                            <el-input @input="checkNum8"  style="width:80px;" maxlength="13" title="上限10位数"  v-model.trim="form.areaHigh" autocomplete="off"  ></el-input>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-2" >
                          <span class="word" >㎡</span>
                        </div>
                        <div class="left padding-r-2" style="width:72px;text-align:right;" >
                          <span class="word" >联系人</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="contactor" >
                            <el-input  style="width:100px;" maxlength="10" title="上限10个字，数字/字母/汉字" v-model.trim="form.contactor" autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear" >
                        <div class="left  padding-r-2" style="padding:0 5px;" >
                          <span class="word " >首开日期</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="startDate" >
                            <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.startDate" style="width: 100px;"></el-date-picker>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:41px;" >
                          <span class="word " >最晚交房</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="endDate" >
                            <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.endDate" style="width: 100px;"></el-date-picker>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-2" style="width:70px;text-align:right;" >
                          <span class="word" >产权年限</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="propertyYear" >
                            <el-input  style="width:100px;" maxlength="5" title="上限5个字，数字/汉字" v-model.trim="form.propertyYear" autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-2" style="width:73px;text-align:right;" >
                          <span class="word" >联系电话</span>
                        </div>
                        <div class="left" >
                          <el-form-item  prop="contactorPhone" >
                            <el-input @input="checkNum3"   style="width:100px;" maxlength="15" title="上限15位数" v-model.trim="form.contactorPhone" autocomplete="off"></el-input>
                          </el-form-item>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="break" >
                  </div>
                  <div class="clear plan-content" >
                    <div class="clear" >
                  <span class="message-title" >
                    规划信息
                  </span>
                    </div>
                    <div class="clear" >
                      <div class="left des-type-special-word" >
                        <span class="word" >占地面积</span>
                      </div>
                      <div class="left padding-r-2" >
                        <el-form-item  prop="coverArea" >
                          <el-input @input="checkNum4" title="上限10位数" maxlength="13" style="width:100px;" v-model.trim="form.coverArea" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>
                      <div class="left padding-r-2" >
                        <span class="word" >㎡</span>
                      </div>
                      <div class="left padding-r-2" style="width:76px;text-align:right;" >
                        <span class="word" >建筑面积</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="buildingArea" >
                          <el-input  @input="checkNum5" title="上限10位数" maxlength="13"  style="width:100px;" v-model.trim="form.buildingArea" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>
                      <div class="left" >
                        <span class="word" >㎡</span>
                      </div>
                      <div class="left padding-r-2" style="width:60px;text-align:right;" >
                        <span class="word" >建筑类型</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="buildingType" >
                          <el-input  style="width:270px;" maxlength="30" title="上限30个字，数字/字母/汉字" v-model.trim="form.buildingType" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>

                    </div>
                    <div class="clear" >
                      <div class="left des-type-special-word" >
                        <span class="word" >总户数</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="ownerCount" >
                          <el-input  style="width:100px;" title="上限4位数" maxlength="4" v-model.trim="form.ownerCount" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>

                      <div class="left padding-r-2" style="width:94px;text-align:right;" >
                        <span class="word" >停车位</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="parkingCount" >
                          <el-input  style="width:100px;" title="上限10位数" maxlength="10" v-model.trim="form.parkingCount" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>

                      <div class="left padding-r-2" style="width:73px;text-align:right;" >
                        <span class="word" >物业公司</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="propertyCompany" >
                          <el-input  style="width:271px;" maxlength="20" title="上限20个字，数字/汉字" v-model.trim="form.propertyCompany" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>

                    </div>
                    <div class="clear" >
                      <div class="left des-type-special-word" >
                        <span class="word" >绿化率</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="propertyGreen" >
                          <el-input  style="width:100px;" maxlength="5" title="上限2位数" v-model.trim="form.propertyGreen" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>

                      <div class="left padding-r-2" style="width:93px;text-align:right;" >
                        <span class="word" >燃气</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="propertyGas" >
                          <el-input  style="width:100px;" maxlength="10" title="上限10个字" v-model.trim="form.propertyGas" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>

                      <div class="left padding-r-2" style="width:73px;text-align:right;" >
                        <span class="word" >水</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="propertyWater" >
                          <el-input  style="width:100px;" maxlength="10" title="上限10个字符" v-model.trim="form.propertyWater" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>
                      <div class="left  padding-r-2" style="width:62px;text-align:right;" >
                        <span class="word" >物业费</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="propertyFee" >
                          <el-input @input="checkNum6"  style="width:110px;" maxlength="10" title="上限10位数" v-model.trim="form.propertyFee" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear" >
                      <div class="left des-type-special-word" >
                        <span class="word" >容积率</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="propertySpace" >
                          <el-input  style="width:100px;" maxlength="5" title="上限2位数" v-model.trim="form.propertySpace" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>

                      <div class="left padding-r-2" style="width:93px;text-align:right;" >
                        <span class="word" >供暖</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="propertyHot" >
                          <el-input  style="width:100px;" maxlength="10" title="上限10个字符" v-model.trim="form.propertyHot" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>

                      <div class="left padding-r-2" style="width:73px;text-align:right;" >
                        <span class="word" >电</span>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="propertyElectricity" >
                          <el-input  style="width:100px;" maxlength="10" title="上限10个字符" v-model.trim="form.propertyElectricity" autocomplete="off"></el-input>
                        </el-form-item>
                      </div>

                    </div>
                    <div class="clear" style="padding-bottom:10px;" >
                      <div class="left des-type-special-word" >
                        <span class="word" >项目描述</span>
                      </div>
                      <div class="left" style="padding-top:5px;" >
                        <textarea v-model="form.remark" maxlength="1000" title="上限1000个字，数字/字母/汉字" class="remark" style="width:638px;height:80px;" ></textarea>
                      </div>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>

          </div>
        </el-tab-pane>
        <el-tab-pane label="代理信息" name="agenct" >

          <span slot="label">代理信息</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0;" >
              <div class="pop-up-container " style="margin:0px;height:442px;overflow-y:auto;overflow-x:hidden;" >
                <div   class="clear" >
                  <el-form ref="formsData"  :model="form" >
                    <div class="clear" style="width:700px;" >
                      <div class="clear" >
                        <div class="left padding-r-2" style="width:70px;text-align:right;" >
                          <span class="word require-word" >合作方式</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="cooperationMode" >
                            <el-select :disabled="haveRecordNum"  v-model="form.cooperationMode"    style="width:115px;" >
                              <el-option   label="有平台" value="1" ></el-option>
                              <el-option   label="无平台" value="2" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2 " style="width:67px;text-align:right;" >
                          <span class="word " >启用销控</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="isStart" >
                            <el-select  v-model="form.isStart"    style="width:115px;" >
                              <el-option   label="是" value="1" ></el-option>
                              <el-option   label="否" value="2" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      
                    </div>
                  </el-form>

                </div>
                <div v-show="form.cooperationMode == 2" class="clear " >
                  <div  class="list-table list-content table-border" style="width:740px;"  >
                    <el-table
                      :data="tableDataSpecial1"
                      empty-text=" "
                      border
                      height="180"
                      highlight-current-row
                      @header-click="addAgenctCompanySpecial"
                    >

                      <el-table-column
                        prop="add"
                        label=""
                        align="center"
                        :render-header="renderHeaderSpecial"
                        width="35">
                        <template slot-scope="scope">
                          <i  class="deleted-icon" @click="deletedAgenctCompanyClick(scope.$index, scope.row,3)" >

                          </i>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="startTime"
                        label="启动时间"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="125">
                        <template slot-scope="scope">
                          <div style="position:relative;" >
                            <div style="text-algin:center;cursor:pointer;padding-left:15px;" @click="showEditorAgenctCompanySpecial(scope.$index, scope.row)" >
                              {{ scope.row.startTime }}
                            </div>
                            <div style="position:absolute;left:-5px;top:0px;" >
                              <i v-if="scope.row.index != null" :class="{'up-blue-icon':1}" ></i>
                              <span style="color:#fff;position:absolute;left:-5px;top:-3px;transform: rotate(-46deg);" ><span style="display:block;-webkit-transform:scale(0.8,0.8)" >{{scope.row.index}}</span></span>
                            </div>
                          </div>

                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="contactor"
                        label="报备联系人"
                        align="center"
                        sortable
                        :show-overflow-tooltip="true"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="contactPhone"
                        label="报备电话"
                        align="center"
                        sortable
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      
                      <el-table-column
                        prop="reportDays"
                        label="报备保护期"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="125">
                      </el-table-column>
                      <el-table-column
                        prop="arriveDays"
                        label="到场保护期"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="125">
                      </el-table-column>
                      <el-table-column
                        prop="reportWayId"
                        label="报备方式"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      

                      <el-table-column
                        prop="commTypeId"
                        label="佣金类型"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      <el-table-column
                        prop="commModeId"
                        label="佣金模式"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                     
                      <el-table-column
                        prop="contractStartDate"
                        label="合同开始"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      <el-table-column
                        prop="contractEndDate"
                        label="合同结束"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>

                    </el-table>
                  </div>
                </div>
                <div v-show="form.cooperationMode == 1" class="clear " >
                  <div  class="list-table list-content table-border" style="width:740px;"  >
                    <el-table
                      :data="tableData1"
                      empty-text=" "
                      border
                      height="180"
                      highlight-current-row
                      @header-click="addAgenctCompany"
                    >

                      <el-table-column
                        prop="add"
                        label=""
                        align="center"
                        :render-header="renderHeader"
                        width="35">
                        <template slot-scope="scope">
                          <i  class="deleted-icon" @click="deletedAgenctCompanyClick(scope.$index, scope.row,1)" >

                          </i>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="platformName"
                        label="平台公司"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="100">
                        <template slot-scope="scope">
                          <div style="position:relative;" >
                            <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;padding-left:15px;" @click="showEditorAgenctCompany(scope.$index, scope.row)" >
                              {{ scope.row.platformName }}
                            </div>
                            <div style="position:absolute;left:-5px;top:0px;" >
                              <i v-if="scope.row.index != null" :class="{'up-blue-icon':1}" ></i>
                              <span style="color:#fff;position:absolute;left:-5px;top:-3px;transform: rotate(-46deg);" ><span style="display:block;-webkit-transform:scale(0.8,0.8)" >{{scope.row.index}}</span></span>
                            </div>
                            <div style="position:absolute;right:-5px;bottom:0px;" >
                              <i :class="{'main-icon':scope.row.isMain == 1}" ></i>
                            </div>
                          </div>

                        </template>
                      </el-table-column>
                       <el-table-column
                        prop="startTime"
                        label="启动时间"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="120">
                        
                      </el-table-column>
                      <el-table-column
                        prop="contactor"
                        label="联系人"
                        align="center"
                        sortable
                        :show-overflow-tooltip="true"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="contactorPhone"
                        label="联系电话"
                        align="center"
                        sortable
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      
                      <el-table-column
                        prop="reportDays"
                        label="报备保护期"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="125">
                      </el-table-column>
                      <el-table-column
                        prop="arriveDays"
                        label="到场保护期"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="125">
                      </el-table-column>
                      <el-table-column
                        prop="reportWayId"
                        label="报备方式"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      

                      <el-table-column
                        prop="commTypeId"
                        label="佣金类型"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      <el-table-column
                        prop="commModeId"
                        label="佣金模式"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      <el-table-column
                        prop="contractStartDate"
                        label="合同开始"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      <el-table-column
                        prop="contractEndDate"
                        label="合同结束"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      

                    </el-table>
                  </div>
                </div>
                <div class="break" style="margin:8px;width:750px;"  ></div>
                <div class="clear" >
                  <div class="list-table list-content table-border" style="width:740px;"  >
                    <el-table
                      :data="tableData2"
                      empty-text=" "
                      border
                      :height="saleHeight"
                      highlight-current-row
                      @header-click="addSaleCompany"
                    >

                      <el-table-column
                        prop="add"
                        label=""
                        align="center"
                        :render-header="renderHeader"
                        width="35">
                        <template slot-scope="scope">
                          <i  class="deleted-icon" @click="deletedSaleCompanyClick(scope.$index, scope.row)" >

                          </i>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="contactCompany"
                        label="销售公司"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="90">
                        <template slot-scope="scope">
                          <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="showEditorSaleCompany(scope.$index, scope.row)" >
                            {{ scope.row.contactCompany }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="contactEmp"
                        label="销售人员"
                        sortable
                        :show-overflow-tooltip="true"
                        align="center"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="contactPhone"
                        label="销售电话"
                        sortable

                        align="center"
                        :show-overflow-tooltip="true"
                        width="85">
                      </el-table-column>
                      <el-table-column
                        prop="contactStartDate"
                        label="合同开始"
                        sortable
                        align="center"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="contactEndDate"
                        label="合同结束"
                        sortable
                        align="center"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="remark"
                        label="备注"
                        sortable
                        align="center"
                        :show-overflow-tooltip="true"
                        width="255">
                      </el-table-column>

                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="component-container" >
            <NewAgenctCompanyPage @reloadAgentCompanyList="reloadAgentCompanyList(1)"  :newAgenctCompanyVisible="newAgenctCompanyValue" ref="newAgenctCompany" ></NewAgenctCompanyPage>
          </div>
          <div class="component-container" >
            <EditorAgenctCompanyPage @reloadAgentCompanyList="reloadAgentCompanyList(1)"  :editorAgenctCompanyVisible="editorAgenctCompanyValue" ref="editorAgenctCompany" ></EditorAgenctCompanyPage>
          </div>
          <div class="component-container" >
            <NewSaleCompanyPage @reloadAgentCompanyList="reloadAgentCompanyList(2)"  :newSaleCompanyVisible="newSaleCompanyValue" ref="newSaleCompany" ></NewSaleCompanyPage>
          </div>
          <div class="component-container" >
            <EditorSaleCompanyPage @reloadAgentCompanyList="reloadAgentCompanyList(2)"  :editorSaleCompanyVisible="editorSaleCompanyValue" ref="editorSaleCompany" ></EditorSaleCompanyPage>
          </div>
          <div class="component-container" >
            <NewAgenctCompanySpecialPage @reloadAgentCompanyList="reloadAgentCompanyList(3)"  :newAgenctCompanySpecialVisible="newAgenctCompanySpecialValue" ref="newAgenctCompanySpecial" ></NewAgenctCompanySpecialPage>
          </div>
          <div class="component-container" >
            <EditorAgenctCompanySpecialPage @reloadAgentCompanyList="reloadAgentCompanyList(3)"  :editorAgenctCompanySpecialVisible="editorAgenctCompanySpecialValue" ref="editorAgenctCompanySpecial" ></EditorAgenctCompanySpecialPage>
          </div>
        </el-tab-pane>

        <el-tab-pane label="户型资料" name="apartment" >
          <span slot="label">户型资料</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0;" >
              <div class="pop-up-container" style="margin:0px;height:442px;overflow:auto;" >
                <el-form ref="formsData"  :model="form2" >
                  <div class="clear" style="position:relative;top:4px;" >
                    <div class="left" style="padding-left:270px;" >
                      <span class="record-word" >房</span>
                    </div>
                    <div class="left" style="padding-left:53px;" >
                      <span class="record-word" >厅</span>
                    </div>
                    <div class="left" style="padding-left:53px;" >
                      <span class="record-word" >卫</span>
                    </div>
                    <div class="left" style="padding-left:53px;" >
                      <span class="record-word" >阳</span>
                    </div>
                  </div>
                  <div class="clear" >
                    <div class="left  padding-r-2 des-word" style="width:70px;"  >
                      <span class="word " >户型名称</span>
                    </div>
                    <div class="left padding-r-2" >
                      <el-form-item  prop="typeName" >
                        <el-input :disabled="true" v-model="form2.typeName" maxlength="20" title="上限20个字"   style="width:100px;" >

                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left  padding-r-2 des-word" style="width:70px;"  >
                      <span class="word " >户型</span>
                    </div>
                    <div class="left -r-2" >
                      <el-form-item  prop="developer" >
                        <el-input :disabled="true" v-model="form2.roomShape1" maxlength="20" title="上限20个字"   style="width:65px;" >
                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left -r-2" >
                      <el-form-item  prop="roomShape2" >
                        <el-input :disabled="true" v-model="form2.roomShape2" maxlength="20" title="上限20个字"   style="width:65px;" >

                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left -r-2" >
                      <el-form-item  prop="roomShape3" >
                        <el-input :disabled="true" v-model="form2.roomShape3" maxlength="20" title="上限20个字"   style="width:65px;" >

                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left -r-2" >
                      <el-form-item  prop="roomShape4" >
                        <el-input :disabled="true" v-model="form2.roomShape4" maxlength="20" title="上限20个字"   style="width:65px;" >

                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left" style="padding:8px 1px 0 10px;" >
                      <input :disabled="true" type="checkbox" v-model="form2.isHighQuality"  value="1" >
                    </div>
                    <div class="left   des-word"   >
                      <span class="word " >主力户型</span>
                    </div>
                  </div>
                  <div class="clear" >

                    <div class="left  padding-r-2 des-word" style="width:70px;"  >
                      <span class="word " >面积</span>
                    </div>
                    <div class="left padding-r-2" >
                      <el-form-item  prop="areaLow" >
                        <el-input :disabled="true" v-model="form2.areaLow" maxlength="20" title="上限20个字"   style="width:90px;" >

                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2" >
                      <el-form-item  prop="areaHigh" >
                        <el-input :disabled="true" v-model="form2.areaHigh" maxlength="20" title="上限20个字"   style="width:90px;" >

                        </el-input>
                      </el-form-item>
                    </div>

                    <div class="left   " style="width:70px;"  >
                      <span class="word record-word" >㎡</span>
                    </div>
                  <div class="left  padding-r-2 des-word" style="width:89px;"  >
                    <span class="word " >均价</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="avePrice" >
                      <el-input :disabled="true" v-model="form2.avePrice" maxlength="20" title="上限20个字"   style="width:100px;" >

                      </el-input>
                    </el-form-item>
                  </div>
                  <div class="left " style=""  >
                    <span class="word record-word" >元/㎡</span>
                  </div>


                  </div>
                  <div class="clear" >
                    <div class="left padding-r-2"  style="width:70px;text-align:right;" >
                      <span class="word " >用途</span>
                    </div>
                    <div class="left">
                      <el-form-item  prop="roomUseId" >
                        <el-select :disabled="true" v-model="form2.roomUseId"    style="width:100px;" >
                          <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2" style="padding-left:43px;" >
                      <span class="word " >装修</span>
                    </div>
                    <div class="left">
                      <el-form-item  prop="decorateId" >
                        <el-select :disabled="true" v-model="form2.decorateId"    style="width:100px;" >
                           <el-option v-for="item in decorateIdParams"  :label="item.name" :value="item.id" ></el-option>
                          
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear" >
                    <div class="left  padding-r-2 des-word" style="width:70px;"  >
                      <span class="word " >在售栋数</span>
                    </div>
                    <div class="left padding-r-2" >
                      <el-form-item  prop="saleBuildingCount" >
                        <el-input :disabled="true" v-model="form2.saleBuildingCount" maxlength="20" title="上限20个字"   style="width:100px;" >

                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left  padding-r-2 des-word" style="width:70px;"  >
                      <span class="word " >在售面积</span>
                    </div>
                    <div class="left padding-r-2" >
                      <el-form-item  prop="saleBuildingCount" >
                        <el-input :disabled="true" v-model="form2.saleArea" maxlength="20" title="上限20个字"   style="width:100px;" >

                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="left  padding-r-2 des-word" style="width:70px;"  >
                      <span class="word " >在售套数</span>
                    </div>
                    <div class="left padding-r-2" >
                      <el-form-item  prop="saleHouseCount" >
                        <el-input :disabled="true" v-model="form2.saleHouseCount" maxlength="20" title="上限20个字"   style="width:100px;" >

                        </el-input>
                      </el-form-item>
                    </div>

                  </div>
                </el-form>
                <div class="list-table list-content table-border" style="width:660px;"  >
                  <el-table
                    :data="tableData"
                    empty-text=" "
                    border
                    height="270"
                    highlight-current-row
                    @row-click="getApartMent"
                    @header-click="addApartment"
                  >

                    <el-table-column
                      prop="add"
                      label=""
                      align="center"
                      :render-header="renderHeader"
                      width="35">
                      <template slot-scope="scope">
                        <i  class="deleted-icon" @click="deletedApartmentClick(scope.$index, scope.row)" >

                        </i>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="typeName"
                      label="户型名称"
                      sortable
                      :show-overflow-tooltip="true"
                      align="center"
                      width="80">
                      <template slot-scope="scope">
                        <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="showEditorApartment(scope.$index, scope.row)" >
                          {{ scope.row.typeName }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="roomShape1"
                      label="户型"
                      align="center"
                      sortable
                      :show-overflow-tooltip="true"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="areaLow"
                      label="面积"
                      align="right"
                      sortable
                      :show-overflow-tooltip="true"
                      width="60">
                    </el-table-column>
                    <el-table-column
                      prop="avePrice"
                      label="均价"
                      sortable
                      align="right"
                      :show-overflow-tooltip="true"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="saleBuildingCount"
                      label="在售栋数"
                      sortable
                      :show-overflow-tooltip="true"
                      align="center"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="saleArea"
                      label="在售面积"
                      sortable
                      :show-overflow-tooltip="true"
                      align="right"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="saleHouseCount"
                      label="在售套数"
                      sortable
                      :show-overflow-tooltip="true"
                      align="center"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="isHighQuality"
                      label="主力房"
                      sortable
                      :show-overflow-tooltip="true"
                      align="center"
                      width="80">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
          <div class="component-container" >
            <NewApartmentPage @reloadApartmentList="reloadApartmentList"  :newApartmentVisible="newApartmentValue" ref="newApartment" ></NewApartmentPage>
          </div>
        
        </el-tab-pane>
        <el-tab-pane label="栋座" name="pedestal" >
          <span slot="label">栋座[{{pedestalNum}}]</span>
          <EditorBuildingTabTwoPage  @setBuildingNum="setBuildingNum" ref="editorTabTwo"  :editorPedestal="true"  ></EditorBuildingTabTwoPage>
        </el-tab-pane>
        <!--
        <el-tab-pane label="新房配对" name="compare" >
          <span slot="label">新房配对</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="" style="padding:0 0px 0px;width:100%;" >
              <div class="pop-up" style="border-width:0;" >
                <div class="pop-up-container " style="margin:0px;height:442px;overflow:hidden;" >
                  <div  class="clear list-content list-container" >
                    <div class="left left-assocition" >
                      <el-table
                        :data="tableData3"
                        empty-text=" "
                        border
                        height="100%"

                        highlight-current-row
                        @selection-change="handleSelectionChange"
                      >
                        <el-table-column
                          type="selection"
                          width="30"
                          ref="multipleTable">

                        </el-table-column>
                        <el-table-column
                          prop="empId1"
                          label="员工"
                          align="center"
                          :show-overflow-tooltip="true"
                          sortable
                          width="105">
                        </el-table-column>
                        <el-table-column
                          prop="createTime"
                          label="标记日期"
                          align="center"
                          :show-overflow-tooltip="true"
                          sortable
                          width="105">
                        </el-table-column>
                        <el-table-column
                          prop="customerProperty1"
                          label="！"
                          width="30">
                          <template slot-scope="scope">
                            <div  style="position:relative;" >
                              <i :class="{'private-pan-icon':scope.row.customerProperty1 == '公客','public-pan-icon':scope.row.customerProperty1 == '私客'}" ></i>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="indexId"
                          label="顺位"
                          align="center"
                          :show-overflow-tooltip="true"
                          sortable
                          width="50">
                          <template slot-scope="scope">
                            <div @click="modifySequenceNum(scope.row.id,scope.row.customerId)" style="cursor:pointer;">
                              <span style="color:rgb(51, 102, 153);"  >
                                {{scope.row.indexId}}
                              </span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="processingStateId"
                          label="进程"
                          align="center"
                          :show-overflow-tooltip="true"
                          sortable
                          width="50">
                          <template slot-scope="scope">
                            <div @click="modifyProgressElem(scope.row.id,scope.row.customerId)" style="cursor:pointer;">
                              <span  style="color:rgb(51, 102, 153);"  >
                                {{scope.row.processingStateId}}
                              </span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="num"
                          label="自定"
                          align="center"
                          :show-overflow-tooltip="true"
                          sortable
                          width="50">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="客户姓名"
                          align="center"
                          :show-overflow-tooltip="true"
                          sortable
                          width="80">
                          <template slot-scope="scope">
                            <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorCustomer(scope.$index, scope.row)" >
                              {{ scope.row.name }}
                             </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="area"
                          label="面积"
                          align="right"
                          :show-overflow-tooltip="true"
                          sortable
                          width="70">
                        </el-table-column>
                        <el-table-column
                          prop="price"
                          label="价格"
                          align="right"
                          :show-overflow-tooltip="true"
                          sortable
                          width="80">
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
                        <div class="click-btn"  @click="pairHouse" >
                          <div class="left" >
                            <i class="association-icon" ></i>
                          </div>
                          <div class="left" style="padding-left:10px"  >
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
              <div slot="footer" class="footer-btn clear"  style="padding:5px 0;"  >

                <span class="right save-cancel-btn" style="margin-right:0px;"  @click="cancelData" >取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
                <div class="right foot-btn" style="padding:0px;margin-right:10px;border-width:0px;" >
                  <i class="file-icon" @click="showFilePage" ></i>
                </div>
              </div>
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
      <div class="" style="padding:0 0px 0px;width:100%;position: relative;position: absolute;bottom:20px;right: 20px;" >
        <div style="position:absolute;bottom:5px;left:33px;" >
          <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 7px;" >
            <div class="left" style="padding-right:7px;"  >
              <i class="up-page-icon" @click="upPage($event)" ></i>
            </div>
            <div class="left" >
              <i class="down-page-icon" @click="downPage($event)" ></i>
            </div>
          </div>
        </div>

        <div slot="footer" class="footer-btn clear"  style="padding:5px 0;"  >

          <span class="right save-cancel-btn" style="margin-right:0px;"  @click="cancelData" >取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
          <div class="right foot-btn" style="padding:0px;margin-right:10px;border-width:0px;" >
              <i class="file-icon"  @click="isShowPhotoAndFile" ></i>
            </div>
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
  //获取数据
  import {newHouseParam} from '../../../utils/newHouseParams'
  import {deletedHousePair} from '../../../service/customerData'
  import {editorHouse,modifyHouse,
          agenctList,deletedAgenctCompany,
          deletedSaleCompany,apartmentList,
          editorApartment,deletedApartment,

  } from '../../../service/newHouse'
  import {getFilesList2,deletedFiles2,uploadFiles2,updateFileName2} from '../../../service/fileData'
  import { houserFindCustomerList} from '../../../service/houseData'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {findbyId} from '../../../service/getData'

  import NewAgenctCompanyPage from './newAgenctCompany'
  import EditorAgenctCompanyPage from './editorAgenctCompany'

  import NewAgenctCompanySpecialPage from './newNoAgenctCompany'
  import EditorAgenctCompanySpecialPage from './editorNoAgenctCompany'

  import NewSaleCompanyPage from './newSaleCompany'
  import EditorSaleCompanyPage from './editorSaleCompany'

  import NewApartmentPage from './newApartment'
  import EditorApartmentPage from './editorApartment'

  import EditorBuildingTabTwoPage from './editorBuildingTabTwo'

  import ModifyProgressPage from './modifyProgress'
  import ModifySequencePage from './modifySequence'
  // 房源配对
  import CustomerPairPage from './customerPair'
  import ModifyNumPage from './modifyCustomerNum'

   import FilePage from '../../../components/file'

  // 编辑客源
  import EditorCustomerPage from '../../customer/customer/editorCustomer'

  export default {
    props:["id",'layerid','activeName',"thisindex"],
    data() {
      return {
        getActiveName:this.activeName,
        active1:true,
        active2:false,
        active3:false,
        active4:false,
        active5:false,
        showHouse:true,
        getIndex:this.thisindex,
        newAgenctCompanyValue:false,
        editorAgenctCompanyValue:false,
        newAgenctCompanySpecialValue:false,
        editorAgenctCompanySpecialValue:false,
        newSaleCompanyValue:false,
        editorSaleCompanyValue:false,
        newApartmentValue:false,
        editorApartmentValue:false,

        pairHouseValue:false,
        modifyProgressValue:false,
        modifySequenceValue:false,
        modifyNumValue:false,
        filePageValue:false,
        haveRecordNum:false,
        saleHeight:170,
        getId:this.id,
        pedestalNum:0,
        multipleSelection:[],
        tableData:[],
        tableData1:[],
        tableDataSpecial1:[],
        tableData2:[],
        tableData3:[],
        projectStateParams:[],
        cooperateStateParams:[],
        countAllParams:[],
        countParams:[],
        numParams:[],
        departTree:[],
        userParams:[],
        areas:[],
        streetArr:[],
        documentsParams:[],
        typesParams:[],
        highlightsParams:[],
        roomUseParams:[],
        decorateIdParams:[],
        form:{
          id:'',
          projectCode:'',
          projectName:'',
          districtId:'',
          streetId:'',
          responsibleEmpDepart:'',
          responsibleEmp:'',
          investor:'',
          developer:'',
          projectAddress:'',
          registerName:'',
          num:'',
          projectState:'',
          cooperateState:'',
          placeGetDate:'',
          areaLow:'',
          areaHigh:'',
          avePriceLow:'',
          avePriceHigh:'',
          description:'',
          contactor:'',
          contactorPhone:'',
          startDate:'',
          endDate:'',

          propertyYear:'',
          coverArea:'',
          buildingArea:'',
          buildingType:'',
          ownerCount:'',
          parkingCount:'',
          propertyCompany:'',
          propertyGreen:'',
          propertyGas:'',
          propertyWater:'',
          propertyFee:'',
          propertySpace:'',
          propertyHot:'',
          propertyElectricity:'',
          remark:'',
          num5:'',

          cooperationMode:'1',
          isStart:'2',

          contractStartDate:'',
          contractEndDate:'',
          reportType:'重复性',
          reportDuration:'',
          reportDays:'',
          reportDays1:'',
          reportWayId:'',

          arriveType:'重复性',
          arriveDuration:'',
          arriveDays:'',
          arriveDays1:'',
          reportRules:'全部号码',
          delegateContactorPhone:'',
          delegateContactor:'',
          commTypeId:'',
          commModeId:'',
          commTypeRemark:'',
          commCount:'',
          commDesc:'',
          bonus:'',
          saleIds:'',
        },
        commType:true,
        platformParams:[],
        reportWayIdParams:[],
        commTypeIdParams:[],
        commissionTypeRemarkParams1:[],
        commissionTypeRemarkParams2:[],
        commModeIdParams:[],
        saleParams:[],
        reportDurationParams:[],
        arriveDurationParams:[],
        connectionList:[],
        definedParams:newHouseParam.definedParams,
        reportRuleParams:newHouseParam.reportRuleParams,

        form2:{
          typeName:'',
          roomShape1:'',
          roomShape2:'',
          roomShape3:'',
          roomShape4:'',
          isHighQuality:'',
          saleBuildingCount:'',
          avePrice:'',
          price:'',
          saleArea:'',
          suitableFor:'',
          areaLow:'',
          areaHigh:'',
          saleHouseCount:'',
          highLightDesc:'',
        }
      };
    },
    components:{
      NewAgenctCompanyPage,
      EditorAgenctCompanyPage,
      NewAgenctCompanySpecialPage,
      EditorAgenctCompanySpecialPage,
      NewSaleCompanyPage,
      EditorSaleCompanyPage,
      NewApartmentPage,
      EditorApartmentPage,

      EditorBuildingTabTwoPage,

      CustomerPairPage,
      ModifyNumPage,
      ModifyProgressPage,
      ModifySequencePage,
      FilePage,
      EditorCustomerPage
    },
    methods:{
      isShowPhotoAndFile(){
        // this.$refs.FilePageId.showDialogVisible();
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: FilePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              recordId:_this.getId,
              getFilesByType:getFilesList2,
              deleteFiles:deletedFiles2,
              uploadFiles:uploadFiles2,
              updateFileName:updateFileName2,
              downLoadFiles:'/first_house/downloadReFiles',
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
      showFilePage(){
        //this.$refs.filePageId.showDialogVisible();
      },
      setBuildingNum(){

      },
      checkNum(item){
        this.form.commCount = this.form.commCount.replace(/[^\.\d]/g,'');
      },


      checkNum1(){
        this.form.avePriceLow= this.form.avePriceLow.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.avePriceHigh= this.form.avePriceHigh.replace(/[^\.\d]/g,'');
      },
      checkNum3(){
        this.form.contactorPhone= this.form.contactorPhone.replace(/[^\d]/g,'');
      },

      checkNum4(){
        this.form.coverArea= this.form.coverArea.replace(/[^\.\d]/g,'');
      },
      checkNum5(){
        this.form.buildingArea= this.form.buildingArea.replace(/[^\.\d]/g,'');
      },
      checkNum6(){
        this.form.propertyFee= this.form.propertyFee.replace(/[^\.\d]/g,'');
      },
      checkNum7(){
        this.form.areaLow= this.form.areaLow.replace(/[^\.\d]/g,'');
      },
      checkNum8(){
        this.form.areaHigh= this.form.areaHigh.replace(/[^\.\d]/g,'');
      },
      checkNumPhone(){
        this.form.reportPhone = this.form.reportPhone.replace(/[^\d]/g,'');
      },
      changeCommType(init){
        let commTypeId = this.form.commTypeId;
        let commTypeIdParams = this.commTypeIdParams;
        let paramName = "";
        commTypeIdParams.forEach(item => {
          if(commTypeId == item.id){
            paramName = item.name;
            return false;
          }
        })
        if(paramName == '时效结佣'){
          this.commType = true;
        }else if(paramName == '进度结佣'){
          this.commType = false;
        }
        if(!init){
          this.form.commTypeRemark = "";
        }  
      },
      showDialog(){
        this.dialogVisible = true;
      },
      changeTab(tab){
        let _this = this;
        let name = tab.name;
        if(name == "project"){
          if(!this.active1){
            this.active1 = true;
          }
        }else if(name == "agenct"){
          if(!this.active2){
            this.active2 = true;
            this.reloadAgentCompanyList();
          }
        }else if(name == "apartment"){
          if(!this.active3){
            this.active3 = true;
            this.reloadApartmentList();
          }
        }else if(name == "pedestal"){
          if(!this.active4){
            this.active4 = true;
            this.$refs.editorTabTwo.getPedestalListData(this.form.id,this.form.projectName);
          }
        }else if(name == "compare"){
          if(!this.active5){
            this.active5 = true;
            this.findCustomerListByHouse();
          }
        }

      },
      showMoreHouse(){
        this.showHouse = !this.showHouse;
      },
      getEditorData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = this.getId;
        editorHouse(id).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let form = response.data.houseBasic;
            let houseDelegate =  response.data.houseDelegate;
            let documents = form.documents;
            let types = form.types;
            let highlights = form.highlights;
            try{
              let pedestalNum = response.data.pedestalNum;
              _this.pedestalNum = pedestalNum;
            }catch(e){

            }

            let params = response.data.params;
            _this.projectStateParams = params.projectStateParams;
            _this.numParams = params.numParams;

            if(params.departTree) {
              let arr = [];
              let treeData = params.departTree
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  state:treeData[i].state,
                })
              }
              _this.departTree = arr;
            }
            _this.areas = params.areas;

            if(params.highlightsParams){
              let  highlightsParams = params.highlightsParams;
              highlightsParams.forEach(function(item){
                item.check = 0;
                if(highlights && highlights.indexOf(item.id) != -1){
                  item.check = 1;
                }
              })
              _this.highlightsParams = params.highlightsParams;
            }

            if(params.documentsParams){
              let  documentsParams = params.documentsParams;
              documentsParams.forEach(function(item){
                item.check = 0;
                if(documents && documents.indexOf(item.id) != -1){
                  item.check = 1;
                }
              })
              _this.documentsParams = params.documentsParams;
            }
            if(params.typesParams){
              let  typesParams = params.typesParams;
              typesParams.forEach(function(item){
                item.check = 0;
                if(types && types.indexOf(item.id) != -1){
                  item.check = 1;
                }
              })
              _this.typesParams = params.typesParams;
            }
            if(params.cooperateStateParams){
              let cooperateStateParams = params.cooperateStateParams;
              cooperateStateParams.forEach(function(item){
                item.check = 0;
              })
              _this.cooperateStateParams = params.cooperateStateParams;
            }
            let initArr = [{id:"0",label:" "}];
            let users1 = response.data.users;
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
              _this.userList1 = [{id:'',name:' '}].concat(arr);
            }
            _this.userParams = users1;
            if( response.data.params.streets &&  response.data.params.streets.length != 0) {
              _this.streetArr = initArr.concat( response.data.streets);
            }

            for(let arr in form ){
              if(form[arr] == null){
                form[arr] = "";
              }
              _this.form[arr] = form[arr];
            }

            let ufloorMarketing = response.data.ufloorMarketing;
            _this.countAllParams = ufloorMarketing.count;
            _this.countParams = ufloorMarketing.countAll;
            if(houseDelegate) {
              for (let arr in houseDelegate) {
                if (arr != 'id') {
                  if (houseDelegate[arr] == null) {
                    houseDelegate[arr] = "";
                  } else {
                    if (typeof houseDelegate[arr] == 'number') {
                      houseDelegate[arr] = houseDelegate[arr].toString();
                    }
                  }
                  _this.form[arr] = houseDelegate[arr];
                }
              }
              if (houseDelegate.reportType == "重复性") {
                _this.form.reportDays1 = houseDelegate.reportDays;
                _this.form.reportDays = '';
              }

              if (houseDelegate.arriveType == "重复性") {
                _this.form.arriveDays1 = houseDelegate.arriveDays;
                _this.form.arriveDays = '';
              }
            }
           
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      findStreeByTown(val){
        let _this = this;

        if(val){
          findbyId(val).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let initArr = [{id:"0",label:" "}];
              if(data && data.length != 0){
                _this.streetArr = initArr.concat(data);
                _this.form.streetId = '';
              }else{
                _this.streetArr = initArr;
                _this.form.streetId = '';
              }

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }
      },
      findUserByDepart(id){
        let _this = this;
        if(id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [];
              if(user && user.length != 0){
                user.forEach(function(item){
                  
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                })
              }
              _this.userParams = arr;
              if(user && user.length != 0) {
                _this.form["responsibleEmp"] = '';
              }else{
                _this.form["responsibleEmp"] = '';
              }
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      //保存数据
      saveFormData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        let streetId = form.streetId;
        let projectName = form.projectName;
        let documentsParams = this.documentsParams;
        let typesParams = this.typesParams;
        let highlightsParams = this.highlightsParams;
        let documentIds = [];
        let typesIds = [];
        let hightIds = [];
        if(projectName == ''){
          this.myAlert("项目名称不能为空！",'dangerous-icon');
          return false;
        }
        if(streetId == ''){
          this.myAlert("地域不能为空！",'dangerous-icon');
          return false;
        }
        documentsParams.forEach(function(item){
          if(item.check != '0'){
            documentIds.push(item.id);
          }
        })
        typesParams.forEach(function(item){
          if(item.check != '0'){
            typesIds.push(item.id);
          }
        })
        highlightsParams.forEach(function(item){
          if(item.check != '0'){
            hightIds.push(item.id);
          }
        })

        form.documents = documentIds.toString();
        form.types = typesIds.toString();
        form.highlights = hightIds.toString();
       
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        modifyHouse(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("保存成功！", 'success-icon').then(res => {
              _this.$parent.reloadProjectList(1);
              _this.$layer.close(_this.layerid);
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },
/*
*代理信息
*
*  */
      addAgenctCompany(column,event) {
        if (column && column.property == 'add') {
          this.$refs.newAgenctCompany.showDialog(this.form.id);
        }
      },
      addAgenctCompanySpecial(column,event) {
        if (column && column.property == 'add') {
          this.$refs.newAgenctCompanySpecial.showDialog(this.form.id);
        }
      },
      showEditorAgenctCompany(index,row){
        this.$refs.editorAgenctCompany.showDialog(row.id,this.form.id,row.platformName);
      },
      
      showEditorAgenctCompanySpecial(index,row){
        this.$refs.editorAgenctCompanySpecial.showDialog(row.id,this.form.id,this.form.projectName);
      },
      deletedAgenctCompanyClick(index,row,type){
        let _this = this;
        _this.myConfirm("警告：删除后不能还原！","question-icon",'是','否',"确定要将选定的记录吗？").then(res => {

          _this.deleteAgenctCompanyData(row.id,type);
        }).catch(err => {

        })
      },
      deletedAgenctCompanySpecialClick(){

      },
      deleteAgenctCompanyData(id,type){
        let _this = this;
        deletedAgenctCompany(id,1).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("删除成功",'success-icon').then(res => {
              _this.reloadAgentCompanyList(type);
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      addSaleCompany(column,event) {
        if (column && column.property == 'add') {
          this.$refs.newSaleCompany.showDialog(this.form.id);
        }
      },
      showEditorSaleCompany(index,row){
        this.$refs.editorSaleCompany.showDialog(row.id,this.form.id,row.contactCompany);
      },
      deletedSaleCompanyClick(index,row){
        let _this = this;
        _this.myConfirm("【销售公司】删除后将不能还原！","question-icon",'是','否',"确定要永久删除选定的记录吗？").then(res => {

          _this.deleteSaleCompanyData(row.id);
        }).catch(err => {

        })
      },
      deleteSaleCompanyData(id){
        let _this = this;
        deletedSaleCompany(id,1).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("删除成功",'success-icon').then(res => {
              _this.reloadAgentCompanyList(2);
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },


      reloadAgentCompanyList(type){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = this.getId;
        agenctList(id).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.delegateCList;
            let data1 = response.data.platforms;
            let data2 = response.data.noPlatforms;
            let params = response.data.params;
            
            let initArr = [{id:"0",name:" "}];
            let recordNum = response.data.recordNum;
            if(recordNum > 0){
              //有报备数据
              _this.haveRecordNum = true;
            }
            if(params.platformParams){
              let initArrSpecial = [{id:"0",platformCompany:" "}];

              _this.platformParams = initArrSpecial.concat(params.platformParams);
            }
            if(params.reportWayIdParams){
              _this.reportWayIdParams = initArr.concat(params.reportWayIdParams);
            }
            if(params.commTypeIdParams){
              _this.commTypeIdParams = initArr.concat(params.commTypeIdParams);
            }
            if(params.commissionTypeRemarkParams1){
              _this.commissionTypeRemarkParams1 = initArr.concat(params.commissionTypeRemarkParams1); 
            }
            if(params.commissionTypeRemarkParams2){
              _this.commissionTypeRemarkParams2 = initArr.concat(params.commissionTypeRemarkParams2); 
            }
            if(params.commModeIdParams){
              _this.commModeIdParams = initArr.concat(params.commModeIdParams);
            }
            if(params.reportDurationParams && params.reportDurationParams.length != 0 ){
              _this.reportDurationParams = params.reportDurationParams;
              _this.form.reportDuration = params.reportDurationParams[2].id;
            }
            if(params.arriveDurationParams && params.arriveDurationParams.length != 0){
              _this.arriveDurationParams = params.arriveDurationParams;
              let id = null;
              params.arriveDurationParams.forEach(function(item){
                  if(item.name == '第三天'){
                      id = item.id;
                  }
              })
              if(id){
                _this.form.arriveDuration = id;
              }else {
                _this.form.arriveDuration = params.arriveDurationParams[0].id;
              }
            }

            if(params.saleParams) {
              let saleParams = params.saleParams;
              saleParams.forEach(function (item) {
                item.check = 0;

              })
              _this.saleParams = params.saleParams;
            }
            if(!type ||  type == 1){
              if(data1){
                _this.tableData1 = data1;
              }else{
                _this.tableData1 = [];
              }
            }
            if(!type ||  type == 2){
              if(data){
                _this.tableData2 = data;
              }else{
                _this.tableData2 = [];
              }
            }
            if(!type ||  type == 3){
              if(data2){
                _this.tableDataSpecial1 = data2;
              }else{
                _this.tableDataSpecial1 = [];
              }
            }
            
             _this.changeCommType(true);
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

/*
*户型资料
*
*  */

      getApartMent(row, column, event){
        let _this = this;
        let id = row.id;
        editorApartment(id).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let initArr = [{id:"0",name:" "}];
            _this.roomUseParams = initArr.concat(params.roomUseParams);
            _this.decorateIdParams = initArr.concat(params.decorateIdParams);
            let form = response.data.houseType;
            for(let arr in form ){
              if(form[arr] == null || form[arr] == '-1'){
                form[arr] = "";
              }
            }
            if(form.isHighQuality == "0"){
              form.isHighQuality = '';
            }

            _this.form2 = form;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      addApartment(column,event){
        if(column && column.property == 'add'){
          this.$refs.newApartment.showDialog(this.form.id);
        }
      },
      //详情
      showEditorApartment(index,row){
        let _this = this;
        debugger;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorApartmentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,projectId:this.form.id,typeName:row.typeName,thisindex:index}//props
          },
          area:['550px','250px'],
          title: "修改户型 【"+row.typeName+"】",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            _this.currentPage = '';
            if( _this.initLeft != 0){
              _this.initLeft -= 10;
              _this.initTop -= 30;
            }
          }
        });
       
      },
      deletedApartmentClick(index,row){
        let _this = this;
        _this.myConfirm("【户型】删除后将不能还原！","question-icon",'是','否',"确定要永久删除选定的记录吗？").then(res => {

          _this.deleteApartmentData(row.id);
        }).catch(err => {

        })
      },
      deleteApartmentData(id){
        let _this = this;
        deletedApartment(id,1).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("删除成功",'success-icon').then(res => {
              _this.reloadApartmentList();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      renderHeader(h,para) {
        return (
          h('div',{'class':'add-icon',style: "margin-left: 5px;",})
        )
      },
      renderHeaderSpecial(h,para) {
        return (
          h('div',{'class':'add-icon',style: "margin-left: 5px;",})
        )
      },
      reloadApartmentList(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = this.getId;
        apartmentList(id).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.types;
            let type = response.data.type;
            if(data){
              data.forEach(item => {
                if(item.roomShape1 == '-1--1--1--1'){
                  item.roomShape1 = "";
                }
              })
              _this.tableData = data;
            }else{
              _this.tableData = [];
            }
           /* if(type) {
              _this.form2 = type;
            }*/
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      /*新房配对*/
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = [];
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },
      modifySequenceNum(id,customerId){
        this.$refs.modifySequence.showDialog(id,customerId);
      },
      modifyProgressElem(id){
        this.$refs.modifyProgress.showDialog(id);
      },
      modifyProgressState(){
        let selectId = this.multipleSelection;
        if(selectId.length == 0){
          this.myAlert("请选择客源",'dangerous-icon');
        }else {
          this.$refs.modifyProgress.showDialog(selectId.toString());
        }
      },
      modifyCustomerNum(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if(!select){
          this.myAlert("请选择客源",'dangerous-icon');
        }else {
          let arr = [] ;
          this.tableData3.forEach(function(item){
            if(select.indexOf(item.id) != -1){
              arr.push(item.customerId);
            }
          })
          this.$refs.modifyNumId.newModifyNum(arr.toString());
        }
      },
      pairHouse(){
        let _this = this;
        let getId = this.getId;
        let test = _this.$layer.iframe({
          content: {
            content: CustomerPairPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{getId:getId}//props
          },
          area:['675px','450px'],
          title: "标记配对",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });

      },
      deletedAssociation(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if(!select){
          this.myAlert("请选择客源",'dangerous-icon');
        }else{
          let houseId = this.form.id;
          this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          deletedHousePair(houseId,select).then(function (response) {
            _this.$layer.closeAll("loading");
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
      findCustomerListByHouse(){
        let _this = this;
        let id = _this.getId;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        houserFindCustomerList(id).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.tableData3 = response.data;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      editorCustomer(index, row){
        let _this = this;
        let ids = [];
        let currentData = this.tableData3;
        let len = currentData.length;
        for(let i = 0 ;  i < len; i ++){
          ids.push(currentData[i].customerId);
        }
        this.currentPage = row;
        _this.$layer.iframe({
          content: {
            content: EditorCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.customerId,name:row.name,activeName:'house',ids:ids.toString(),thisindex:index}//props
          },
          area:['800px','560px'],
          title:'客源信息',
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件

          }
        });
      },
      upPage(e){
        let count = this.getIndex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata = this.$parent.changeTitle(count,needlayerid,1);
        this.getId = callbackdata.id;
        this.getIndex = callbackdata.thisindex;
        this.getEditorData();
        let active = this.getActiveName;
        this.active1 = false;
        this.active2 = false;
        this.active3 = false;
        this.active4 = false;
        this.active5 = false;
        debugger;
        if(active == "compare"){
          this.active5 = false;
          this.findCustomerListByHouse();
        }else if(active == 'agenct'){
          this.active2 = false;
          this.reloadAgentCompanyList();
        }else if(active == 'apartment'){
          this.active3 = false;
          this.reloadApartmentList();
        }else if(active == "pedestal"){
          this.active4 = false;
          this.$refs.editorTabTwo.getPedestalListData(this.getId,this.form.projectName);
        }
      },
      downPage(e){
        let count = this.getIndex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata = this.$parent.changeTitle(count,needlayerid,2);
        this.getId = callbackdata.id;
        this.getIndex = callbackdata.thisindex;
        
        this.getEditorData();
        debugger;
        let active = this.getActiveName;
         this.active1 = false;
         this.active2 = false;
         this.active3 = false;
         this.active4 = false;
         this.active5 = false;
         
        if(active == "compare"){
          this.active5 = false;
          this.findCustomerListByHouse();
        }else if(active == 'agenct'){
          this.active2 = false;
          this.reloadAgentCompanyList();
        }else if(active == 'apartment'){
          this.active3 = false;
          this.reloadApartmentList();
        }else if(active == "pedestal"){
          this.active4 = false;
          this.$refs.editorTabTwo.getPedestalListData(this.getId,this.form.projectName);
        }
      },
    },
    mounted(){
      this.getEditorData();
      let active = this.getActiveName;
      if(active == "compare"){
        this.active5 = true;
        this.findCustomerListByHouse();
      }else if(active == 'agenct'){
        this.active2 = true;
        this.reloadAgentCompanyList();
      }else if(active == 'apartment'){
        this.active3 = true;
        this.reloadApartmentList();
      }
    },
    watch:{
      'form.avePriceLow':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.avePriceLow = undefined;
            return;
          }
          this.form.avePriceLow = oldval
        } else {
          this.form.avePriceLow = newval.replace(/^\./g, "")
        }
      },
      'form.avePriceHigh':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.avePriceHigh = undefined;
            return;
          }
          this.form.avePriceHigh = oldval
        } else {
          this.form.avePriceHigh = newval.replace(/^\./g, "")
        }
      },
      'form.areaLow':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.areaLow = undefined;
            return;
          }
          this.form.areaLow = oldval
        } else {
          this.form.areaLow = newval.replace(/^\./g, "")
        }
      },
      'form.areaHigh':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.areaHigh = undefined;
            return;
          }
          this.form.areaHigh = oldval
        } else {
          this.form.areaHigh = newval.replace(/^\./g, "")
        }
      },
      'form.coverArea':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.coverArea = undefined;
            return;
          }
          this.form.coverArea = oldval
        } else {
          this.form.coverArea = newval.replace(/^\./g, "")
        }
      },
      'form.buildingArea':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.buildingArea = undefined;
            return;
          }
          this.form.buildingArea = oldval
        } else {
          this.form.buildingArea = newval.replace(/^\./g, "")
        }
      },
      'form.propertyGreen':function(newval, oldval){
        var reg = /^(\d{0,2})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.propertyGreen = undefined;
            return;
          }
          this.form.propertyGreen = oldval
        } else {
          this.form.propertyGreen = newval.replace(/^\./g, "")
        }
      },
      'form.propertySpace':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.propertySpace = undefined;
            return;
          }
          this.form.propertySpace = oldval
        } else {
          this.form.propertySpace = newval.replace(/^\./g, "")
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
  @import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>
  @import '../../../style/project.scss'
</style>
<style lang="scss" scoped>
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

