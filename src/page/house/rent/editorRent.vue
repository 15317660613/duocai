<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="width:100%;padding:10px 10px 0;height: 510px;" >
      <el-tabs type="border-card" v-model="getActiveName"  @tab-click="changeTab"  >
        <el-tab-pane label="房源详情" name="house"  >
          <span slot="label"  >房源详情</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;"  >
              <div class="pop-up-container" style="margin:0px;" >
                <el-form ref="formsData"  :model="form" >
                  <div class="clear top-word"  >
                    <div class="left word-q" style="" >
                      <span class=" remark-word"  >区县</span>
                    </div>
                    <div class="left word-j" style="" >
                      <span class=" remark-word"  >街镇</span>
                    </div>
                    <div class="left word-build clear" style="padding-left:25px;" >
                      <span class=" remark-word left" >楼盘</span>
                      <i class="building-icon left" style="margin-top:3px;" @click="showbuilding" ></i>
                      <i class="school-icon left" style="margin-top:3px;" @click="showSchool" ></i>
                    </div>
                    <div class="left word-ped"  style="" >
                      <span class=" remark-word" >栋座</span>
                    </div>
                    <div class="left word-unit" style="" >
                      <span class=" remark-word" >单元</span>
                    </div>
                    <div class="left word-houes" style="" >
                      <span class=" remark-word" >房号</span>
                    </div>
                    <div class="left word-c" style=""  >
                      <span class=" remark-word" >楼层</span>
                    </div>
                    <div class="left word-zc" style=""  >
                      <span class=" remark-word" >总层</span>
                    </div>
                  </div>
                  <div class="clear " >
                    <div class="left  padding-r-2" style="padding-left:13px;" >
                      <span class="word require-word" >地址</span>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="districtId" >
                        <el-select @change="findStreeByTown" v-model="form.districtId"    style="width:92px;" >
                          <el-option v-for="item in areas"  :label="item.label" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="streetId" >
                        <el-select @change="changeByStreet" v-model="form.streetId"    style="width:112px;" >
                          <el-option  v-for="item in streetArr" :label="item.label" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="areaVillage" >
                        <el-autocomplete  @select="getSelectBuilding" :fetch-suggestions="querySearchAsync" style="width:127px;" v-model.trim="form.areaVillage"  title="上限30个字" maxlength="30" autocomplete="off"></el-autocomplete>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="seat" >
                        <el-autocomplete  @select="getSelectSeat" @change="setFloorDisalbed" :fetch-suggestions="getPedestalListData" style="width:81px;" v-model.trim="form.seat"  title="上限4字符" maxlength="4"   autocomplete="off"></el-autocomplete>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="unit" >
                        <el-autocomplete @select="getSelectUnit" :fetch-suggestions="getUnitListData" style="width:73px;" v-model.trim="form.unit" title="上限4字符" maxlength="4"  autocomplete="off"></el-autocomplete>
                      </el-form-item>
                    </div>

                    <div class="left padding-r-1" >
                      <el-form-item  prop="roomId" >
                        <el-autocomplete  @select="getSelectHouse"  @change="setFloorCurrentDisalbed" title="上限5位数" maxLength="5"     :fetch-suggestions="getHouseListData" style="width:73px;" v-model.trim="form.roomId"    ></el-autocomplete>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="floorCurrent" >
                        <el-input @change="checkFloowNum1"  style="width:69px;" v-model.trim="form.floorCurrent" title="上限4位数" maxLength="4"  autocomplete="off"></el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1-2" >
                      <el-form-item  prop="floorAmount" >
                        <el-input @change="checkFloowNum2"   style="width:69px;" v-model.trim="form.floorAmount" title="上限4位数" maxLength="4"  autocomplete="off"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear " >
                    <div class="left  padding-r-2" style="width:47px;text-align:right;" >
                      <span :class="{'word':true,'require-word':checkHouseValue2 == 'true'}" >房型</span>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="roomShape1" >
                        <el-select v-model="form.roomShape1" placeholder="房"   style="width:50px;" >
                          <el-option v-for="item in rentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="roomShape2" >
                        <el-select v-model="form.roomShape2" placeholder="厅"  style="width:50px;" >
                          <el-option v-for="item in rentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="roomShape3" >
                        <el-select v-model="form.roomShape3" placeholder="卫"  style="width:50px;" >
                          <el-option v-for="item in rentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="roomShape4" >
                        <el-select v-model="form.roomShape4" placeholder="阳台"  style="width:50px;" >
                          <el-option v-for="item in rentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left " style="padding-left:10px;" >
                      <el-form-item  prop="roomShapeId" >
                        <el-select v-model="form.roomShapeId"    style="width:140px;" >
                          <el-option v-for="item in roomShapeParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left  padding-r-2" style="padding-left:13px;" >
                      <span class="word" >朝向</span>
                    </div>
                    <div class="left padding-r-1" style="" >
                      <el-form-item  prop="roomDirectionId" >
                        <el-select v-model="form.roomDirectionId"    style="width:70px;" >
                          <el-option v-for="item in roomDirectionParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left  padding-r-2"  style="padding-left:13px;" >
                      <span class="word" >编号</span>
                    </div>
                    <div class="left padding-r-1" style="" >
                      <el-input :disabled="true"  v-model="form.roomCode"   title="【自动编号】" style="width:85px;"  ></el-input>


                    </div>
                    <div class="left  padding-r-2"  style="padding-left:13px;" >
                      <span class="word greent-word " >自定号</span>
                    </div>
                    <div class="left padding-r-1" style="" >
                      <el-form-item  prop="num" >
                        <el-select placeholder="" v-model="form.num"    style="width:61px;" >

                          <el-option v-for="item in numParams"  :label="item.name" :value="item.name" >

                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear " >
                    <div class="left  padding-r-2" style="width:47px;text-align:right;" >
                      <span :class="{'word':true,'require-word':checkHouseValue4 == 'true'}" >{{areaName}}</span>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="roomTotalArea" >
                        <el-input @input="checkArea" title="上限10位数" maxLength="10" v-model="form.roomTotalArea"      style="width:70px;"  ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left  padding-r-1"  >
                      <span class="remark-word" >㎡</span>
                    </div>
                    <div class="left  padding-r-2" style="padding-left:10px;" >
                      <span class="word" >套内</span>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="roomInnerArea" >
                        <el-input @input="checkInnerArea" title="上限10位数" maxLength="10"    v-model="form.roomInnerArea"     style="width:70px;"  ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1"  >
                      <span class="remark-word" >㎡</span>
                    </div>
                    <div class="left  padding-r-2" style="padding-left:10px;" >
                      <span class="word" >类型</span>
                    </div>
                    <div class="left padding-r-1" >
                      <el-form-item  prop="roomTypeId" >
                        <el-select v-model="form.roomTypeId"    style="width:115px;" >
                          <el-option v-for="item in roomTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>

                    <div class="left  padding-r-2" style="padding-left:12px;" >
                      <span class="word" >用途</span>
                    </div>
                    <div class="left padding-r-1" style="" >
                      <el-form-item  prop="roomUseId" >
                        <el-select :disabled="true"   v-model="form.roomUseId"    style="width:70px;" >
                          <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2 "  style="padding-left:12px;" >
                      <span class="word" >建年</span>
                    </div>
                    <div class="left padding-r-1" style="" >
                      <el-form-item  prop="buildingYear" >
                        <el-select v-model="form.buildingYear"    style="width:84px;" >
                          <el-option v-for="item in yearParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left  padding-r-2" style="width:52px;text-align:right;" >
                      <span :class="{'word':true,'require-word':checkHouseValue8 == 'true'}" >来 <span style="display:inline-block;width:6px;height:20px;" ></span> 源</span>
                    </div>
                    <div class="left padding-r-1" style="" >
                      <el-form-item  prop="source" >
                        <el-select v-model="form.source"    style="width:61px;" >
                          <el-option v-for="item in sourceParams"  :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="break" >

                  </div>
                  <div class="clear" >
                    <div class="left clear left-content" >
                      <div v-show="moreFollow == 1" >
                        <div class="clear" >
                          <div class="left  padding-r-2" style="padding-left:12px;width:46px;height:20px;" >
                            <i @click="saleAndRentChange" :class="{'sale-icon':this.form.roomType==1,'rent-icon':this.form.roomType==2,'rent-sale-icon':this.form.roomType==3}"  ></i>
                          </div>
                          <div class="left "  >
                            <el-form-item  prop="roomSaleStateId" >
                              <el-select  class="special-select-color" v-model="form.roomSaleStateId"    style="width:67px;" >
                                <el-option v-for="item in roomSaleStateIdParams"  :label="item.name" :value="item.id" >
                                  <span class="greent-word" >{{item.name}}</span>
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left " style="padding-left:10px;" >
                            <el-form-item  prop="roomProperty1" >
                              <el-select class="special-select-color" v-model="form.roomProperty1"    style="width:67px;" >
                                <el-option v-for="item in roomProperty1Params"  :label="item.name" :value="item.id" >
                                  <span class="greent-word" >{{item.name}}</span>
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left " style="padding-left:10px;" >
                            <el-form-item  prop="roomProperty2" >
                              <el-select class="special-select-color" v-model="form.roomProperty2"    style="width:67px;color:#088383" >
                                <el-option v-for="item in roomProperty2Params"  :label="item.name" :value="item.id" >
                                  <span class="greent-word" >{{item.name}}</span>
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left  padding-r-2"  style="padding-left:32px;" >
                            <span class="word greent-word" >委托</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="roomProperty3" >
                              <el-select  v-model="form.roomProperty3"    style="width:75px;" >
                                <el-option  v-for="item in roomProperty3Params"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="roomDelegateDate" >
                              <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.roomDelegateDate" style="width: 92px;"></el-date-picker>
                            </el-form-item>
                          </div>
                        </div>
                        <div class="clear" >
                          <div class="left  padding-r-2" style="padding-left:12px;width:46px;text-align:right;" >
                            <span :class="{'require-word-i':this.form.roomType==1  && checkHouseValue5 == 'true','require-word':this.form.roomType==3  && checkHouseValue5 == 'true' ,'word':true}"  >售价</span>
                          </div>
                          <div class="left "  >
                            <el-form-item  prop="salePrice" >
                              <el-input  @input="calculateSale" :disabled="saleDisabled" style="width:70px;" v-model.trim="form.salePrice" title="上限6位数" maxLength="9" autocomplete="off"></el-input>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="salePriceUnit" >
                              <el-select :disabled="true"   v-model="form.salePriceUnit"    style="width:74px;" >
                                <el-option v-for="item in salePriceParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left " style="padding-left:8px;" >
                            <el-form-item  prop="salePriceArea" >
                              <el-input :disabled="true"   style="width:68px;" v-model.trim="form.salePriceArea" maxlength="30" title="" autocomplete="off"></el-input>
                            </el-form-item>
                          </div>
                          <div class="left  "  style="padding-left:2px;" >
                            <span class="remark-word" >/㎡</span>
                          </div>
                          <div class="left  padding-r-2"  style="padding-left:14px;" >
                            <span class="word greent-word" >编号</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="roomDelegateNum" >
                              <el-input v-model="form.roomDelegateNum"  title="上限50个字" maxlength="50"   style="width:168px;" ></el-input>
                            </el-form-item>
                          </div>

                        </div>
                        <div class="clear" >
                          <div class="left  padding-r-2" style="padding-left:12px;width:46px;text-align:right;" >
                            <span :class="{'require-word':this.form.roomType==3  && checkHouseValue5 == 'true','require-word-i':this.form.roomType==2  && checkHouseValue5 == 'true','word':true}"  >租价</span>
                          </div>
                          <div class="left "  >
                            <el-form-item  prop="rentPrice" >
                              <el-input @input="calculateRent" :disabled="rentDisabled" style="width:70px;" v-model.trim="form.rentPrice" title="上限6位数" maxLength="9" autocomplete="off"></el-input>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="rentPriceUnit" >
                              <el-select :disabled="rentDisabled" v-model="form.rentPriceUnit"    style="width:74px;" >
                                <el-option v-for="item in rentPriceParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left " style="padding-left:8px;" >
                            <el-form-item  prop="rentPriceArea" >
                              <el-input   :disabled="true"   style="width:68px;" v-model.trim="form.rentPriceArea" maxlength="30" title="" autocomplete="off"></el-input>
                            </el-form-item>
                          </div>
                          <div class="left  "  style="padding-left:2px;" >
                            <span class="remark-word" >/㎡</span>
                          </div>
                          <div class="left  padding-r-2"  style="padding-left:14px;" >
                            <span class="word" >税费</span>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="roomTaxTypeId" >
                              <el-select v-model="form.roomTaxTypeId"    style="width:75px;" >
                                <el-option v-for="item in roomTaxTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-1" style="" >
                            <el-form-item  prop="roomTax" >
                              <el-input style="width:92px;" v-model.trim="form.roomTax" title="上限10位数" maxLength="10" autocomplete="off"></el-input>
                            </el-form-item>
                          </div>


                        </div>
                        <div class="clear" >
                          <div class="left  " style="padding-left:22px;" >
                            <span class="word greent-word" >注：</span>
                          </div>
                          <div class="left padding-l-10  clear checkContent" style="margin-top:3px;" >
                            <div  v-for="item in commTypesParams" style="height:25px;"  class="left clear" >
                              <div class="left" style="position:relative;" >
                                <el-form-item  prop="item.check" >
                                  <input type="checkbox" v-model="item.check"  :value="1" ></input>
                                </el-form-item>
                              </div>
                              <div class="left zhu-word" >{{item.name}}
                              </div>
                            </div>

                          </div>
                          <div class="left clear " style="" >
                            <div class="clear left" >
                              <div class="left  padding-r-2"  style="padding-left:15px;" >
                                <span class="word" >尾款</span>
                              </div>
                              <div class="left padding-r-1" style="" >
                                <el-form-item  prop="restPriceId" >
                                  <el-select v-model="form.restPriceId"    style="width:68px;" >
                                    <el-option v-for="item in restPriceIdParams"  :label="item.name" :value="item.id" ></el-option>
                                  </el-select>
                                </el-form-item>
                              </div>
                            </div>
                            <div class="clear left" >
                              <div class="left padding-r-2 "  style="padding-left:6px;" >
                                <span class="word" >动机</span>
                              </div>
                              <div class="left padding-r-1" style="" >
                                <el-form-item  prop="motiveId" >
                                  <el-select v-model="form.motiveId"    style="width:68px;" >
                                    <el-option v-for="item in motiveIdParams"  :label="item.name" :value="item.id" ></el-option>
                                  </el-select>
                                </el-form-item>
                              </div>
                            </div>
                            <div class="clear" >
                              <div class="left padding-r-2 "  style="padding-left:18px;" >
                                <i @click="showRepeatRentPage" class="repeat-icon" ></i>
                              </div>
                              <div class="left padding-r-1" style="" >
                                <el-form-item  prop="repeatHouseId" >
                                  <el-select v-model="form.repeatHouseId"    style="width:168px;" >
                                    <el-option v-for="item in repeatParams"  :label="item.name" :value="item.id" ></el-option>
                                  </el-select>
                                </el-form-item>
                              </div>

                            </div>

                          </div>
                        </div>
                        <div class="break" >

                        </div>
                      </div>
                      <div   v-show="followOrMaster == 1 " class="clear" >
                        <div class="left" >
                          <div class="clear" >
                            <div class="left  padding-r-2"  style="padding-left:13px;" >
                              <span class="word require-word" >业主</span>
                            </div>
                            <div class="left padding-r-1" style="" >
                              <el-form-item  prop="ownerName" >
                                <el-input @input="checkOwnerName" title="上限50个字" maxlength="50" v-model.trim="form.ownerName" style="width:122px;" ></el-input>
                              </el-form-item>
                            </div>
                          </div>
                          <div class="clear" >
                            <div class="left padding-r-2 "  style="padding-left:7px;" >
                              <span class="word" >联系人</span>
                            </div>
                            <div class="left padding-r-2" style="padding-top:2px;" >
                              <el-form-item  prop="contactor" >
                                <textarea
                                  type="textarea"
                                  style="width:185px;height:50px;"
                                  maxLength="50"
                                  title="上限50个字"
                                  class="remark"
                                  v-model="form.contactor">
                                </textarea>
                              </el-form-item>
                            </div>
                          </div>
                          <div class="clear" >
                            <div class="left padding-r-2 "  style="padding-left:7px;" >
                              <span class="word" >{{propertyName}}</span>
                            </div>
                            <div class="left padding-r-1" style="" >
                              <el-form-item  prop="roomCertificate" >
                                <el-select placeholder="" v-model="form.roomCertificate"    style="width:53px;" >
                                  <el-option v-for="item in premisesParams"  :label="item.name" :value="item.id" ></el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                            <div class="left padding-r-1" style="" >
                              <el-form-item  prop="roomCertText" >
                                <el-input maxLength="20" title="上限20个字" v-model="form.roomCertText"  style="width:129px;" ></el-input>
                              </el-form-item>
                            </div>
                          </div>
                          <div class="clear" >
                            <div class="left padding-r-2 "  style="padding-left:20px;" >
                              <span class="word" >{{nativeName}}</span>
                            </div>
                            <div class="left padding-r-1" style="" >
                              <el-form-item  prop="nationalId" >
                                <el-select v-model="form.nationalId"    style="width:53px;" >
                                  <el-option v-for="item in nationalIdParams"  :label="item.name" :value="item.id" ></el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                          </div>
                        </div>
                        <div class="left" style="padding-left:15px;" >
                          <div class="clear" >
                            <div class="left  padding-r-2" style="width:40px;text-align:right;" >
                              <span :class="{'word':true,'require-word':checkHouseValue9 == 'true'}" >手机</span>
                            </div>
                            <div class="left padding-r-1" style="" >
                              <el-form-item  prop="ownerPhone" >
                                <el-input @input="checkPhone" v-model="form.ownerPhone" maxLength="15" title="上限15位数" style="width:122px;" ></el-input>
                              </el-form-item>
                            </div>
                          </div>
                          <div class="clear" style="padding-top:2px;" >
                            <div class="left padding-r-2 "  style="padding-left:15px;" >
                              <span class="word" >联系</span>
                            </div>
                            <div class="left padding-r-2" style="" >
                              <el-form-item  prop="contactInfo" >
                                <textarea
                                  style="width:204px;height:105px;"
                                  type="textarea"
                                  height="60px"
                                  maxLength="100"
                                  title="上限100个字"
                                  class="remark"
                                  v-model="form.contactInfo">
                                </textarea>
                              </el-form-item>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div   v-show="followOrMaster == 2 " class="clear" >
                        <div class="followList" :style="{'height':moreFollow == 1 ? '165px' : '310px','color':'#666'}" >
                          <div v-for="item in processings" :class="{'elemFollow':true,'clear':true,'click-check':item.id == deletedFollowId}" @click="getDeletedFollowId(item.id)" >
                            <div class="left overflowEellipsis" style="width:310px;padding-left:5px;"  >
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
                    <div class="left right-content" >
                      <div class="clear padding-t-6" >
                        <div class="left  padding-r-2" style="padding-left:10px;" >
                          <span class="word" >证件</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="certificateTypeId" >
                            <el-select v-model="form.certificateTypeId"    style="width:80px;" >
                              <el-option v-for="item in certificateTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word" >产权</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="housePropertyId" >
                            <el-select v-model="form.housePropertyId"    style="width:80px;" >
                              <el-option v-for="item in housePropertyIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="padding-left:10px;" >
                          <span class="word" >现状</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="roomStateId" >
                            <el-select v-model="form.roomStateId"    style="width:80px;" >
                              <el-option v-for="item in roomStateIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word" >{{payName}}</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="paymentId" >
                            <el-select v-model="form.paymentId"    style="width:80px;" >
                              <el-option v-for="item in paymentIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="width:36px;text-align:right;" >
                          <span :class="{'word':true,'require-word':checkHouseValue3 == 'true'}" >装修</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="decorateId" >
                            <el-select v-model="form.decorateId"    style="width:80px;" >
                              <el-option v-for="item in decorateIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word" >{{commissionName}}</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="commissionId" >
                            <el-select v-model="form.commissionId"    style="width:80px;" >
                              <el-option v-for="item in commissionIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="padding-left:10px;" >
                          <span class="word" >看房</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="keysId" >
                            <el-select v-model="form.keysId"    style="width:80px;" >
                              <el-option v-for="item in keysIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left" style="padding-left:15px;" >
                          <i class="key-icon" ></i>
                        </div>
                        <div class="left" style="padding-left:5px;" >
                          <span class="word" >:{{keyNum}}把</span>
                        </div>
                      </div>
                      <div class="break" >
                      </div>
                      <div class="clear padding-t-10"  >
                        <div class="left  padding-r-2" style="padding-left:10px;" >
                          <span class="word" >备注</span>
                        </div>
                        <div class="left">
                          <el-form-item   prop="remark" >
                            <textarea
                              type="textarea"
                              style="width:210px;"
                              :rows="3"
                              maxLength="300"
                              title="上限300个字"
                              class="remark"
                              v-model="form.remark">
                            </textarea>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " style="margin-top:-10px;" >
                        <div class="left  padding-r-2" style="padding-left:5px;" >
                          <span class="word" >{{peopleName1}}</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="deptId1" >
                            <el-select placeholder=""  @change="findUserByDepart(1)"  v-model="form.deptId1"    style="width:100px;" >
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
                            <el-select placeholder=""   v-model="form.empId1"    style="width:100px;" >

                              <el-option v-for="item in userList1"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="padding-left:5px;" >
                          <span class="word" >{{peopleName2}}</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="deptId2" >
                            <el-select placeholder=""  @change="findUserByDepart(2)" v-model="form.deptId2"    style="width:100px;" >
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
                            <el-select placeholder=""    v-model="form.empId2"    style="width:100px;" >
                              <el-option v-for="item in userList2"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear " >
                        <div class="left  padding-r-2" style="padding-left:5px;" >
                          <span class="word" >{{peopleName3}}</span>
                        </div>
                        <div class="left padding-r-2" >
                          <el-form-item  prop="deptId3" >
                            <el-select placeholder=""  @change="findUserByDepart(3)" v-model="form.deptId3"    style="width:100px;" >
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
                          <el-form-item  prop="empId3" >
                            <el-select placeholder=""  v-model="form.empId3"    style="width:100px;" >
                              <el-option v-for="item in userList3"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
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
                  <i class="up-page-icon" @click="upPage" ></i>
                </div>
                <div class="left" >
                  <i class="down-page-icon" @click="downPage" ></i>
                </div>
              </div>
              <div class="left" >
                <el-select v-model="modifyType"    style="width:105px;" @visible-change="lookFollowByTypeSpecial"  >
                 
                  <el-option  label="写入跟进" value="2" ></el-option>
                  <el-option  label="带看跟进" value="6" ></el-option>
                  <el-option  label="勘察跟进" value="7" ></el-option>
                  <el-option  label="全部跟进" value="1" ></el-option>
                  <el-option  label="查看业主" value="4" ></el-option>
                  
                </el-select>
              </div>
              <div class="left" style="padding-left:15px;" >
                <span class="foot-btn" style="border-right-width:0px;" @click="showNewFollowPage" >写跟进</span>
              </div>
              <div class="left" >
                <span class="foot-btn" style="border-right-width:0px;" @click="deletedFollow" >删</span>
              </div>
              <div v-show="followOrMaster == 1" class="left foot-btn" style="padding:6px 5px;" >
                <i class="show-disabled-icon" ></i>
              </div>
              <div v-show="followOrMaster == 2" @click="lookMoreFollow" class="left foot-btn" style="padding:0px;border-width:0px;" >
                <i :class="{'show-icon':this.moreFollow==2,'hide-icon':this.moreFollow==1}" ></i>
              </div>
              <div class="left" @click="showFollowOrMaster"  style="padding-left:10px;" >
                <span class="foot-btn" >{{followOrMasterName}}</span>
              </div>
              <div class="left foot-btn" style="padding:0px;border-width:0px;margin-left:10px;" >
                <i class="file-icon"  @click="isShowPhotoAndFile"  ></i>
              </div>
              <div class="left" style="padding-left:10px;"  >
                <span class="foot-btn" style="color:#B5B6B6;"    >增加钥匙</span>
              </div>
              <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
              <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
            </div>

            
            <div class="component-container" >
              <EditorFollowPage @getFollowList="getFollowList" :followShowEditor="editorShowFollowValue"  ref="editorFollow" ></EditorFollowPage>
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
        <el-tab-pane label="房源配对" name="pedestal"  >

          <span slot="label">房源配对</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;" >
              <div class="pop-up-container " style="margin:0px;height:415px;" >
                <div  class="clear list-content list-container" >
                  <div class="left left-assocition" >
                    <el-table
                      :data="tableData"
                      empty-text=" "
                      border
                      height="100%"
                    
                      highlight-current-row
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column
                        type="selection"
                        width=35
                          ref="multipleTable">

                      </el-table-column>
                      <el-table-column
                        prop="customerSaleStateId"
                        label="交易"

                        width="30">
                        <template slot-scope="scope">
                          <div v-if="scope.row.customerType == 1"  style="position:relative;" >
                            求租
                        </div>
                          <div v-if="scope.row.customerType == 2"  style="position:relative;" >
                            求购
                          </div>
                          <div v-if="scope.row.customerType == 3"  style="position:relative;" >
                            租购
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="customerProperty1"
                        label="！"
                        align="center"
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
                        sortable="true"
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
                        sortable="true"
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
                        sortable="true"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        align="center"
                        label="客户姓名"
                        sortable="true"
                        :show-overflow-tooltip="true"
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
                        sortable="true"
                        :show-overflow-tooltip="true"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="price"
                        label="价格"
                        align="right"
                        sortable="true"
                        :show-overflow-tooltip="true"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="createByName"
                        label="员工"
                        align="center"
                        sortable="true"
                        :show-overflow-tooltip="true"
                        width="105">
                        <template slot-scope="scope">
                          <div style="text-algin:center;" >
                            {{ scope.row.createByDeptName }}-{{ scope.row.createByName }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="createTime"
                        label="标记日期"
                        align="center"
                        sortable="true"
                        :show-overflow-tooltip="true"
                        width="105">
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
            <div slot="footer" class="footer-btn clear"  >
              <div class="left clear" style="padding:3px 2px;border-radius:3px;border:1px solid #797979;margin-right:20px;" >
                <div class="left" style="padding-right:5px;" >
                  <i class="up-page-icon" @click="upPageSpecial" ></i>
                </div>
                <div class="left" >
                  <i class="down-page-icon" @click="downPageSpecial" ></i>
                </div>
              </div>
              <div class="left" >
                <el-select v-model="modifyType"    style="width:105px;" @change="lookFollowByType" >
                  <el-option  label="全部跟进" value="1" ></el-option>
                  <el-option  label="写入跟进" value="2" ></el-option>
                  <el-option  label="修改跟进" value="3" ></el-option>
                  <el-option  label="查看业主" value="4" ></el-option>
                  <el-option  label="带看跟进" value="6" ></el-option>
                  <el-option  label="历史跟进" value="5" ></el-option>

                </el-select>
              </div>
              <div class="left" style="padding-left:15px;" >
                <span class="foot-btn" style="border-right-width:0px;" @click="showNewFollowPage" >写跟进</span>
              </div>
              <div class="left" >
                <span class='gray foot-btn' style="border-right-width:0px"  >删</span>
              </div>
              <div class='gray foot-btn left' style="padding:6px 5px;" >
                <i class="show-disabled-icon" ></i>
              </div>

              <div class="left"   style="padding-left:10px;" >
                <span  class='gray foot-btn' >{{followOrMasterName}}</span>
              </div>
              <div class="left foot-btn" style="padding:0px;border-width:0px;margin-left:10px;" >
                <i class="file-icon"  ></i>
              </div>
              <div class="left" style="padding-left:10px;"  >
                <span class="foot-btn" style="color:#B5B6B6;"    >增加钥匙</span>
              </div>
              <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
              <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
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
        <el-tab-pane label="房源钥匙" name="key" >
          <span slot="label">房源钥匙</span>
          <div class="" style="padding:0 0px 0px;width:100%;" >
            <div class="pop-up" style="border-width:0px;" >
              <div class="pop-up-container" style="margin:0px;height:438px;overflow:auto;" >
                <el-form ref="formsData1"   >
                  <div v-for="(key , index) in form1" v-if="key.deleted == 0" class="clear " >
                    <div class="left left-add" style="padding:15px;" >
                      <i class="deleted-icon" @click="addOrDeletedKey(key)" ></i>
                    </div>
                    <div class="left keyList"  >
                      <div class="clear" >
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word" >钥匙类型</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="keyType" >
                            <el-select @change="changeKeyType(key)" v-model="key.keyType"    style="width:80px;" >
                              <el-option v-for="item in keyTypeParams"  :label="item.name" :value="item.name" ></el-option>
                              <el-input   style="position:fixed;bottom:-99999px;" ></el-input>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div v-show="key.keyType != '实体钥匙'"  class="left padding-r-1" >
                          <el-form-item  prop="keyPsd" >
                            <el-input   v-model="key.keyPsd" auto-complete="new-password" show-password  style="width:100px;" ></el-input>
                             <el-input  show-password  auto-complete="new-password"  style="position:fixed;bottom:-99999px;" ></el-input>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span class="word require-word" >负责人</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="deptId" >
                            <el-select @change="findUserKeyByDepartId(key)"  v-model="key.deptId"    style="width:80px;" >
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
                          <el-form-item  prop="empId" >
                            <el-select @change="setUserPhone(key)" v-model="key.empId"    style="width:80px;" >
                              <el-option v-for="item in key.users"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-1" style="line-height:27px;" >
                          <span  >{{key.phone}}</span>
                        </div>
                      </div>
                      <div  class="clear"  >
                        <div class="left  padding-r-2" style="padding-left:40px;position:relative;" >
                          <i class="question-icon" style="position:absolute;left:15px;top:5px;" @click="showKeyFollow(key)" ></i>
                          <span class="word" >状态</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="keyState" >
                            <el-select @change="getState(key)" :disabled="key.keyType == '密码钥匙' ? true : false" v-model="key.keyState"    style="width:80px;" >
                              <el-option v-for="item in keyStateParams"  :label="item.name" :value="item.name" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>

                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span v-show="key.keyState == '外借同行'" class="word require-word" >外借日</span>
                          <span v-show="key.keyState == '归还来源'" class="word require-word" >归还日</span>
                          <span v-show="key.keyState == '收回可用'" class="word require-word" >收回日</span>
                          <span v-show="key.keyState == '内借同司'" class="word require-word" >内借日</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="lendDate" >
                            <el-date-picker size="mini" value-format="yyyy-MM-dd HH:mm" type="datetime" format="yyyy-MM-dd HH:mm"  v-model="key.lendDate" style="width: 130px;"></el-date-picker>
                          </el-form-item>
                        </div>
                        <div class="left  padding-r-2" style="padding-left:15px;" >
                          <span v-show="key.keyState == '外借同行'" class="word require-word" >外借人</span>
                          <span v-show="key.keyState == '归还来源'" class="word require-word" >归还人</span>
                          <span v-show="key.keyState == '收回可用'" class="word require-word" >收回人</span>
                          <span v-show="key.keyState == '内借同司'" class="word require-word" >内借人</span>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="lender" >
                            <el-input v-model="key.lender"    title="上限15个字" style="width:100px;" ></el-input>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-1" >
                          <el-form-item  prop="lenderPhone" >
                            <el-input v-model="key.lenderPhone" maxLength="15" title="电话"   style="width:100px;" ></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear" >
                        <div class="left  padding-r-2" style="padding-left:40px;" >
                          <span class="word" >备注</span>
                        </div>

                        <div class="left padding-r-1" style="padding-top:3px;" >
                            <textarea
                              style="width:600px;height:48px;"
                              maxLength="100"
                              title="上限100个字"
                              class="remark"
                              v-model="key.remark">
                            </textarea>
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
                <el-select v-model="modifyType"    style="width:105px;" @visible-change="lookFollowByTypeSpecial" >
                   <el-option  label="写入跟进" value="2" ></el-option>
                  <el-option  label="带看跟进" value="6" ></el-option>
                  <el-option  label="勘察跟进" value="7" ></el-option>
                  <el-option  label="全部跟进" value="1" ></el-option>
                  <el-option  label="查看业主" value="4" ></el-option>

                </el-select>
              </div>
              <div class="left" style="padding-left:15px;" >
                <span class="foot-btn" style="border-right-width:0px;" @click="showNewFollowPage" >写跟进</span>
              </div>
              <div class="left" >
                <span class='gray foot-btn' style="border-right-width:0px"  >删</span>
              </div>
              <div class='gray foot-btn left' style="padding:6px 5px;" >
                <i class="show-disabled-icon" ></i>
              </div>

              <div class="left"   style="padding-left:10px;" >
                <span  class='gray foot-btn' >{{followOrMasterName}}</span>
              </div>
              <div class="left foot-btn" style="padding:0px;border-width:0px;margin-left:10px;" >
                <i class="file-icon"  @click="isShowPhotoAndFile"  ></i>
              </div>
              <div class="left" style="padding-left:10px;"  >
                <span class="foot-btn" style=""  @click="addKey(key)"  >增加钥匙</span>
              </div>
              <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
              <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
            </div>
          </div>
          <div class="component-container" >
            <keyOperationPage    :keyOperationeVisible="keyOperationValue"  ref="keyOperationId" ></keyOperationPage>
          </div>

        </el-tab-pane>
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
  import {findbyId,findBuildingByWord,findBuildingListByAreaId,pedestalList,findUnitBySeartId,findSeatHouseNum} from '../../../service/getData'
  import {rentConstParam} from '../../../utils/rentParam'
  import {rentEditor,rentModify,lookMaster,followList,deletedFollow,houserFindCustomerList,houseKey} from '../../../service/houseData'
  import {getFilesList1,deletedFiles1,uploadFiles1,updateFileName1} from '../../../service/fileData'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {deletedHousePair} from '../../../service/customerData'


  // 编辑楼盘字段
  import EditorBuildingPage from '../../system/building/editorBuilding'
  // 新增楼盘字段
  import NewBuildingPage from '../../system/building/newBuilding'
  import RepeatRentPage from './repeatRent'
  import NeWFollowPage from './newFollow'
  import EditorFollowPage from './editorFollow'
  import MasterFollowPage from './masterFollow'
  import HistoryFollowPage from './historyFollow'
  import HouseFollowPage from './houseFollow'
  import ModifyProgressPage from './modifyProgress'
  import ModifySequencePage from './modifySequence'
  // 房源配对
  import CustomerPairPage from './customerPair'
  // 编辑客源
  import EditorCustomerPage from '../../customer/customer/editorCustomer'
  //钥匙
  import keyOperationPage from './keyOperation'
  import ModifyNumPage from './modifyCustomerNum'
  import FilePage from '../../../components/file' 
  let streetId = null;
  let repeatName = null;

  export default {
    props:['id','ids','layerid','activeName','mythisindex'],
    data() {
      return {
        getId:this.id,
        thisindex:this.mythisindex,
        active1:false,
        acitve2:false,
        active3:false,
        getIds:this.ids.split(","),
        currentPage:null,
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
        modifyNumValue:false,
        keyOperationValue:false,
        floorDisabled:false,
        floorCurrentDisabled:false,
        tableData:[],
        multipleSelection:[],
        multipleSelection1:[],
        keyNum:0,
        heightNum:0,
        select:'select',
        modifyType:'2',
        name:'',
        followOrMaster:2,
        followOrMasterName:"看业主",
        moreFollow:1,
        repeatRent:false,
        areas:[],
        streetArr:[{id:"-1",label:"全部"}],
        citys:[],
        selectArr:[],
        rentSelect:rentConstParam,
        roomShapeParams:[],
        roomDirectionParams:[],
        roomTypeIdParams:[],
        roomUseParams:[],
        yearParams:[],
        sourceParams:[],
        numParams:[],
        roomSaleStateIdParams:[],
        roomProperty1Params:[],
        roomProperty2Params:[],
        roomProperty3Params:[],
        salePriceParams:rentConstParam.salePriceParams,
        rentPriceParams:[],
        roomTaxTypeIdParams:[],
        restPriceIdParams:[],
        motiveIdParams:[],
        repeatParams:[],
        certificateTypeIdParams:[],
        housePropertyIdParams:[],
        roomStateIdParams:[],
        restPriceIdParams:[],
        motiveIdParams:[],
        commTypesParams:[],
        certificateTypeIdParams:[],
        housePropertyIdParams:[],
        roomStateIdParams:[],
        paymentIdParams:[],
        decorateIdParams:[],
        commissionIdParams:[],
        keysIdParams:[],
        premisesParams:[],
        nationalIdParams:[],
        departTree:[],
        userList1:[],
        userList2:[],
        userList3:[],
        processings:[],
        currentBuilding:null,
        currentSeat:null,
        currentUnit:null,
        currentHouseNum:null,
        saleDisabled:false,
        rentDisabled:true,
        deletedFollowId:0,
        
        nativeName:"国籍",
        areaName:"面积",
        commissionName:"付佣",
        payName:"付款",
        peopleName1:"员工1",
        peopleName2:"员工2",
        peopleName3:"员工3",
        authorizeName:"委托",
        propertyName:"房产证",
        checkHouseValue1:"false",
        checkHouseValue2:"false",
        checkHouseValue3:"false",
        checkHouseValue4:"false",
        checkHouseValue5:"false",
        checkHouseValue6:"false",
        checkHouseValue7:"false",
        checkHouseValue8:"false",
        checkHouseValue9:"false",
        checkHouseValue10:'',
        checkHouseValue11:'',
        initForm:null,
        initKeyForm:null,
        form: {
          id:0,
          townName:'',
          streetName:'',
          areaVillage:'',
          seat:'',
          unit:'',
          roomNum:'',
          districtId:'',
          streetId:"-1",
          areaVillageId:'',
          seatId:'',
          unitId:'',
          roomId:'',
          floorCurrent:"0",
          floorAmount:"0",
          roomShape1:'-1',
          roomShape2:'-1',
          roomShape3:'-1',
          roomShape4:'-1',
          roomShapeId:"0",
          roomDirectionId:"0",
          roomCode:'',
          num:"",
          numId:'',
          roomTotalArea:'',
          roomInnerArea:'',
          roomTypeId:"0",
          roomUseId:"0",
          buildingYear:"0",
          source:"0",
          roomSaleStateId:"0",
          roomProperty1:"0",
          roomProperty2:"0",
          roomProperty3:"0",
          roomType:1,
          roomDelegateDate:'',
          salePrice:'',
          salePriceUnit:'1',
          salePriceArea:'',
          roomTax:"0",
          roomTaxTypeId:"0",
          rentPrice:'',
          rentPriceUnit:'1',
          rentPriceArea:'',
          restPriceId:"0",
          roomDelegateNum:'',
          commTypesStr:'',
          motiveId:"0",
          repeatHouseId:"",
          repeatIdsStr:'',
          ownerName:'',
          ownerPhone:'',
          contactor:'',
          roomCertText:"0",
          roomCertificate:'',
          nationalId:"0",
          contactInfo:"0",
          certificateTypeId:"0",
          housePropertyId:"0",
          roomStateId:"0",
          paymentId:"0",
          decorateId:"0",
          commissionId:"0",
          keysId:"0",
          remark:'',
          deptId1:'',
          deptId2:'',
          deptId3:'',
          empId1:"",
          empId2:"",
          empId3:"",
          createTime:"",
          createBy:"",
          updateBy:"",
          updateTime:"",
        },
        elemKey:{
          id:0,
          houseId:'',
          keyTypeId:0,
          keyPsd:'',
          empId:'0',
          state:0,
          keyState:'外借同行',
          phone:'',
          lendDate:'',
          lender:'',
          lenderPhone:'',
          keyType:'实体钥匙',
          remark:'',
          users:[{id:"0",name:" "}],
          deleted:0,
          departId:'',
          isAdd:false,

        },
        keyStateParams:[],
        keyTypeParams:[],
        form1:[

        ],
        
        formLabelWidth: '78px'
      };
    },
    components:{
      EditorBuildingPage,
      NewBuildingPage,
      RepeatRentPage,
      NeWFollowPage,
      EditorFollowPage,
      MasterFollowPage,
      HistoryFollowPage,
      HouseFollowPage,
      CustomerPairPage,
      ModifyNumPage,
      ModifyProgressPage,
      ModifySequencePage,
      keyOperationPage,
      EditorCustomerPage,
      FilePage
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
              getFilesByType:getFilesList1,
              deleteFiles:deletedFiles1,
              uploadFiles:uploadFiles1,
              updateFileName:updateFileName1,
              downLoadFiles:'/sec_house/downloadReFiles',
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
      checkOwnerName(){

        this.form.ownerName= this.form.ownerName.replace(/[^a-zA-Z\u4e00-\u9fa5]/g,'');
      },
      checkPhone(){
        this.form.ownerPhone= this.form.ownerPhone.replace(/[^\.\d]/g,'');
        this.form.ownerPhone= this.form.ownerPhone.replace('.','');
      },
      changeKeyType(key){
        if(key && key.keyType == '密码钥匙'){
          key.keyState = '收回可用';
        }else{
          key.keyState = '外借同行';
        }
      },
      setUserPhone(key){
        if(key.users && key.users.length != 0){

          let empId = key.empId;
          let phone = '';
          key.users.forEach(function(item){
            if(item.id == empId){
              phone = item.phone;
            }
          })
          key.phone = phone;
        }
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
        })
        let callbackdata = this.$parent.changeTitle(count,needlayerid,1);
        this.thisindex = callbackdata.thisindex;
        this.getId = callbackdata.rowid;

        if(this.getActiveName == 'house') {
          this.getRentEditor();
        }else if(this.getActiveName == 'pedestal'){
          this.findCustomerListByHouse();
        }else{
          this.getHouseKeyData();
        }

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
        })
        let callbackdata = this.$parent.changeTitle(count,needlayerid,2);
        this.thisindex = callbackdata.thisindex;
        this.getId = callbackdata.rowid;

        if(this.getActiveName == 'house') {
          this.getRentEditor();
        }else if(this.getActiveName == 'pedestal'){
          this.findCustomerListByHouse();
        }else{
          this.getHouseKeyData();
        }
      },
      upPageSpecial(){
        this.upPage();
      },
      downPageSpecial(){
        this.downPage();
      },
      getState(key){
        console.log(key)
      },
      changeTab(tab){
        let _this = this;
        let label = tab.label;
        if(label == "房源详情"){
          if(!this.active1){
            this.getRentEditor();
            this.active1 = true;

          }
        }else if(label == "房源配对"){
          if(!this.active2) {
            _this.findCustomerListByHouse();
            this.active2 = true;

          }
        }else if(label == "房源钥匙"){
          if(_this.keyStateParams.length == 0) {
            if(!this.active3) {
              _this.getHouseKeyData();
              this.active3 = true;

            }
          }
        }
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
          this.myAlert("请选择客源",'dangerous-icon');
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
        _this.multipleSelection = []
        _this.multipleSelection1 = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
          _this.multipleSelection1.push(item.customerId);
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
          this.myAlert("请选择客源",'dangerous-icon');
        }else {
          let arr = [] ;
          this.tableData.forEach(function(item){
            if(select.indexOf(item.id) != -1){
              arr.push(item.customerId);
            }
          })
          this.$refs.modifyNumId.newModifyNum(select);
        }
      },
      signAssociation(){

      },
      deletedAssociation(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if(!select){
          this.myAlert("请选择客源",'dangerous-icon');
        }else{
          let houseId = this.form.id;

          deletedHousePair(houseId,select).then(function (response) {
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
      reloadCustomerList(){
        this.findCustomerListByHouse();
      },
      valueChange(){

      },
      checkFloowNum1(value){
        this.form.floorCurrent= this.form.floorCurrent.replace(/[^\.\d]/g,'');

      },
      checkFloowNum2(value){
        this.form.floorAmount= this.form.floorAmount.replace(/[^\.\d]/g,'');

      },
      checkArea(){
        this.form.roomTotalArea= this.form.roomTotalArea.replace(/[^\.\d]/g,'');
        this.calculateSale();
        this.calculateRent();
      },
      checkInnerArea(){
        this.form.roomInnerArea= this.form.roomInnerArea.replace(/[^\.\d]/g,'');

      },

      calculateSale(){
        let roomTotalArea = this.form.roomTotalArea;
        let salePrice = this.form.salePrice;
        let salePriceArea = this.form.salePriceArea;
        if(roomTotalArea == '' || roomTotalArea == '0.0' || roomTotalArea*1 == 0 ) {
          this.form.salePriceArea = '';
        }else if( roomTotalArea && salePrice){
          this.form.salePriceArea =((salePrice*1) / (roomTotalArea*1)*10000 ).toFixed(2);
        }else{
          this.form.salePriceArea = "";
        }

      },
      calculateRent(){
        let roomTotalArea = this.form.roomTotalArea;
        let rentPrice = this.form.rentPrice;
        let rentPriceArea = this.form.rentPriceArea;
        if(roomTotalArea == '' || roomTotalArea == '0.0' || roomTotalArea*1 == 0 ) {
          this.form.rentPriceArea = '';
        }else if( roomTotalArea && rentPrice){
          this.form.rentPriceArea = ((rentPrice*1) / (roomTotalArea*1) ).toFixed(2);
        }else{
          this.form.rentPriceArea = "";
        }
      },
      //获取参数
      getRentEditor(){
        let _this = this;
        let id = this.getId;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        rentEditor(id).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.params;
            let initArr = [{id:"0",name:" "}];
            _this.areas = data.areas;
            if(data.roomShapeParams){
              _this.roomShapeParams = initArr.concat(data.roomShapeParams);
            }
            let streets = response.data.streets;
            let arr = [{id:"-1",label:"全部"}];

            _this.streetArr = arr.concat(streets);
            if(data.roomDirectionParams){
              _this.roomDirectionParams = initArr.concat(data.roomDirectionParams);
            }

            let users1 = response.data.users1;
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
            let users2 = response.data.users2;
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
              _this.userList2 = [{id:'',name:' '}].concat(arr);
            }
            let users3 = response.data.users3;
            if(users3 && users3.length != 0){
              let arr = [];
              users3.forEach(function(item){
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
              _this.userList3 = [{id:'',name:' '}].concat(arr);
            }
            //类型
            if(data.roomTypeIdParams){
              _this.roomTypeIdParams = initArr.concat(data.roomTypeIdParams);
            }
            //用途
            if(data.roomUseParams){
              _this.roomUseParams = initArr.concat(data.roomUseParams);
            }
            //建年
            _this.yearParams = initArr.concat(rentConstParam.yearParams);
            //来源
            if(data.sourceParams){
              _this.sourceParams = initArr.concat(data.sourceParams);
            }
            if(data.numParams){

              _this.numParams = [].concat(data.numParams);
            }
            //状态
            if(data.roomSaleStateIdParams){
              _this.roomSaleStateIdParams = data.roomSaleStateIdParams;
            }
            //盘制
            if(data.roomProperty1Params){
              _this.roomProperty1Params = data.roomProperty1Params;
            }
            //房源分类
            if(data.roomProperty2Params){
              _this.roomProperty2Params = data.roomProperty2Params;
            }
            //委托
            if(data.roomProperty3Params){
              _this.roomProperty3Params = initArr.concat(data.roomProperty3Params);
            }
            //税费
            if(data.roomTaxTypeIdParams){
              _this.roomTaxTypeIdParams = initArr.concat(data.roomTaxTypeIdParams);

            }
            //尾款
            if(data.restPriceIdParams){
              _this.restPriceIdParams = initArr.concat(data.restPriceIdParams);
            }
            //动机
            if(data.motiveIdParams){
              _this.motiveIdParams = initArr.concat(data.motiveIdParams);
            }
            if(data.commTypesParams){
              let  commTypesParams = data.commTypesParams;
              commTypesParams.forEach(function(item){
                item.check = 0;
              })
              _this.commTypesParams = data.commTypesParams;
            }
            if(response.data.repeats && response.data.repeats.length != 0  ){
              let repeatIdsStr = [];
              let repeatParams = response.data.repeats;
              repeatParams.forEach(item => {
                repeatIdsStr.push(item.id);
              })
              _this.form.repeatIdsStr = repeatIdsStr.toString();
              _this.repeatParams = repeatParams;
              _this.repeatHouseId = repeatParams[0].id;
            }else{
              _this.repeatHouseId = "";
            }
            //证件
            if(data.certificateTypeIdParams){
              _this.certificateTypeIdParams = initArr.concat(data.certificateTypeIdParams);
            }
            //产权
            if(data.housePropertyIdParams){
              _this.housePropertyIdParams = initArr.concat(data.housePropertyIdParams);
            }
            //现状
            if(data.roomStateIdParams){
              _this.roomStateIdParams = initArr.concat(data.roomStateIdParams);
            }
            //付款
            if(data.paymentIdParams){
              _this.paymentIdParams = initArr.concat(data.paymentIdParams);

            }
            //装修
            if(data.decorateIdParams){
              _this.decorateIdParams = initArr.concat(data.decorateIdParams);

            }
            //付佣
            if(data.commissionIdParams){
              _this.commissionIdParams = initArr.concat(data.commissionIdParams);
            }
            //看房
            if(data.keysIdParams){
              _this.keysIdParams = initArr.concat(data.keysIdParams);
            }

            //房产证
            _this.premisesParams = initArr.concat(rentConstParam.premisesParams);
            //国籍
            if(data.nationalIdParams){
              _this.nationalIdParams = initArr.concat(data.nationalIdParams);
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
              _this.departTree = arr;
            }

            let systemSet = response.data.params.systemSet;
            try{
              _this.nativeName  = systemSet["国籍改名"].substr(0,2);
              _this.areaName = systemSet["面积改名"].substr(0,2);
              _this.commissionName = systemSet["付佣改名"].substr(0,2);
              _this.payName	= systemSet["付款改名"].substr(0,2);
              _this.peopleName1	= systemSet["归属人1改名"].substr(0,3);
              _this.peopleName2	= systemSet["归属人2改名"].substr(0,3);
              _this.peopleName3	= systemSet["归属人3改名"].substr(0,3);
              //_this.authorizeName	= systemSet["委托编号"];
              _this.propertyName	= systemSet["房产证改名"].substr(0,3);
              //默认私盘
              let privateHouse = systemSet["新增房源默认为【私盘】"];
              let checkHouse =  systemSet["新增房源可选【公盘/私盘】"];

              _this.checkHouseValue1 =  systemSet["房源【栋座】必填（住宅）"];
              _this.checkHouseValue2 =  systemSet["房源【房型】必填（住宅）"];
              _this.checkHouseValue3 =  systemSet["【装修】必填"];
              _this.checkHouseValue4 =  systemSet["房源【面积】必填"];
              _this.checkHouseValue5 =  systemSet["房源【价格】必填"];
              _this.checkHouseValue6 =  systemSet["房源【楼层】必填"];
              _this.checkHouseValue7 =  systemSet["房源【总层】必填"];
              _this.checkHouseValue8 =  systemSet["【来源】必填"];
              _this.checkHouseValue9 =  systemSet["房源业主【手机】必填"];
              _this.checkHouseValue10 =  systemSet["跟进字数"];
              _this.checkHouseValue11 =  systemSet["写跟进不可粘贴复制"];

              let unit = systemSet["租金单价单位1"];
              let select1 = systemSet["单选框里的下拉1"];
              let rentParams = rentConstParam.rentPriceParams;
              let arrRent = [];
              if(unit == 2){
                  rentParams.forEach(item => {
                    if(item.id == '元/天' || item.id == '万元/天'){
                      arrRent.push(item);
                    }  
                  })
                  _this.form.rentPriceUnit ="元/天";
              }else{
                  rentParams.forEach(item => {
                    if(item.id == '元/月' || item.id == '万元/月'){
                      arrRent.push(item);
                    }  
                  })
                   _this.form.rentPriceUnit ="元/月";
              }
              _this.rentPriceParams = arrRent;
              if(checkHouse == "false"){
                let arr = _this.roomProperty1Params;
                let currentArr = [];
                arr.forEach(function(item){
                  let obj = {
                    id:item.id,
                    name:item.name,
                    disabled:false,
                  }
                  if(item.name == "公盘" || item.name == "私盘"){
                    obj.disabled = true;
                  }
                  currentArr.push(obj);
                })
                _this.roomProperty1Params = currentArr;

              }
            }catch(e){
              
            }
            //数据
            //钥匙
            _this.keyNum = response.data.keyNum;
            let basic = response.data.basic;
            for(let attr in basic){

              if(basic[attr] != null && basic[attr] != 'null'){
                _this.form[attr]  = basic[attr];
                if(basic[attr] != '0'){
                  if( typeof basic[attr] == 'number' ){
                    _this.form[attr] = basic[attr].toString();
                  }
                }
              }
              
              if(attr == 'commTypes'){
                let commTypes = basic[attr];
                if(commTypes){
                  commTypes = commTypes.toString();
                  if(commTypes) {
                    _this.commTypesParams.forEach(function (item) {
                      if (commTypes.indexOf(item.id) != -1){
                        item.check = item.id;
                      }else{
                        item.check = 0;
                      }
                    })
                  }
                }
              }
              _this.initForm = JSON.parse(JSON.stringify(_this.form));
            }
            let floorCurrent = basic.floorCurrent;
            let floorCufloorAmountrrent = basic.floorAmount;
            //总层，楼层清空标识
            if(floorCurrent){
               _this.floorDisabled = true;
            }
            if(floorCufloorAmountrrent){
              _this.floorCurrentDisabled = true;
            }
           
            if(response.data.repeats && response.data.repeats.length != 0 ){
              let repeatParams = response.data.repeats;
              _this.repeatHouseId = repeatParams[0].id;
            }
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
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
          _this.$layer.closeAll("loading");
        })
      },
      //地域查询街镇
      findStreeByTown(val,noSetValue){
        let _this = this;
        this.form.seatId = '';
        this.form.unitId = '';
        this.form.roomId = '';
        this.form.seat = '';
        this.form.unit = '';
        if(!noSetValue){
          this.form.areaVillage = '';
          this.form.areaVillageId = '';
        }
        //总层，楼层清空标识
        this.floorCurrentDisabled = false;
        this.floorDisabled = false;
        if(val){
          findbyId(val).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let initArr = [{id:"-1",label:"全部"}];
              if(data){
                _this.streetArr = initArr.concat(data);
                if(!noSetValue){
                  _this.form.streetId = "-1";
                }  
              }

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }
      },
      changeByStreet(){
        this.form.areaVillageId = '';
        this.form.seatId = '';
        this.form.unitId = '';
        this.form.roomId = '';
        this.form.areaVillage = '';
        this.form.seat = '';
        this.form.unit = '';
        //总层，楼层清空标识
        this.floorCurrentDisabled = false;
        this.floorDisabled = false;
      },
    //楼盘搜索
      querySearchAsync(queryString, cb){
        let _this = this;
        let id = '';
        if(_this.form.streetId){
          id = _this.form.streetId;
          if(id == -1){
            id = "";
          }
        }
        //清除之前的数据；
        this.clearSelectBuilding();
        let word = queryString;
        let districtId = this.form.districtId;
        if(word != ""){
          findBuildingByWord("","",word).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data.list;
              if(data){
                let arr = [];
                for(let i = 0 ; i < data.length ; i++){
                  arr.push({value:data[i].name,id:data[i].id,houseNumRule:data[i].houseNumRule,chooseHouse:data[i].chooseHouse,chooseHouseNum:data[i].chooseHouseNum,streetId:data[i].streetId,townId:data[i].townId});
                }
                cb(arr);
              }

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }else{
          cb([]);
        }  
      },
      clearSelectBuilding(){
        this.currentBuilding = '';
        this.form.areaVillageId = '';
        this.form.seatId = '';
        this.form.unitId = '';
        this.form.roomId = '';
        this.form.seat = '';
        this.form.unit = '';
        
      },
      getSelectBuilding(item){
        this.currentBuilding = item;
        this.form.areaVillageId = item.id;
        this.form.districtId = item.townId;
        this.form.streetId = item.streetId;
        this.form.seatId = '';
        this.form.unitId = '';
        this.form.roomId = '';
        this.form.seat = '';
        this.form.unit = '';
         //总层，楼层清空标识
        this.floorCurrentDisabled = false;
        this.floorDisabled = false;
        this.findStreeByTown(item.townId,true);
      },
      //栋座
      getPedestalListData(queryString, cb){
        let _this = this;
        let seatId = '';
        
        let id = "";
        if(_this.currentBuilding){
          id = _this.currentBuilding.id;
        }else if(_this.form.areaVillageId){
          id = _this.form.areaVillageId;
        }

        if(id != ''){
          pedestalList(id,queryString).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data.seats;
              if(data){
                let arr = [];
                for(let i = 0 ; i < data.length ; i++){
                  arr.push({value:data[i].name,id:data[i].id,pliesNumber:data[i].pliesNumber});
                }
                cb(arr);
              }
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }else{
          cb([]);
        }

      },
      setFloorDisalbed(){
        this.floorDisabled = false;
      },
      getSelectSeat(item){
        this.currentSeat = item;
        this.form.seatId = item.id;
        this.form.unitId = '';
        this.form.roomId = '';
        this.form.unit = '';
        this.floorDisabled = true;
      },
      //单元
      getUnitListData(queryString, cb){
        let _this = this;
        let seatId = '';
        let id = "";
        if(_this.currentSeat){
          id = _this.currentSeat.id;
        }else if(_this.form.seatId){
          id = _this.form.seatId;
        }
        if(queryString != null && id != ''){
          findUnitBySeartId(id).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              if(data){
                let arr = [];
                for(let i = 0 ; i < data.length ; i++){
                  arr.push({value:data[i].unit,id:data[i].id,roomNum:data[i].roomNum});
                }
                cb(arr);
              }
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }else{
          cb([]);
        }

      },
      getSelectUnit(item){
        this.currentUnit = item;
        this.form.roomNum = item.roomNum;
        this.form.unitId = item.id;
        this.form.roomId = '';
      },
      getHouseListData(queryString, cb){
        var _this = this;
        let showAll = 0;
        let unitId = this.form.unitId;
        let seatId = this.form.seatId;
        
        if (seatId) {
          findSeatHouseNum(seatId, showAll, unitId, queryString).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data.rooms;
              if (data) {
                let arr = [];
                for (let i = 0; i < data.length; i++) {
                  arr.push({value: data[i].roomNum, id: data[i].id, floor: data[i].floor});
                }
                cb(arr);
              }
            } else if (response.status == 1) {
              let message = response.msg;
              //_this.myAlert(message + "！");
            }
          })
        }
      },
      setFloorCurrentDisalbed(){
        this.floorCurrentDisabled = false;
      },
      getSelectHouse(item){
        this.currentHouseNum = item;
        this.form.roomId = item.value;
        this.form.floorCurrent = item.floor;
        this.floorCurrentDisabled = true;
      },
      saleAndRentChange(){
        let roomType = this.form.roomType;
        let saleDisabled = this.saleDisabled;
        let rentDisabled=  this.rentDisabled;
        if(roomType == 1){
          this.form.roomType = 2;
          this.saleDisabled = true;
          this.rentDisabled = false;
        }else if(roomType == 2){
          this.form.roomType = 3;
          this.saleDisabled = false;
          this.rentDisabled = false;
        }else if(roomType == 3){
          this.form.roomType = 1;
          this.saleDisabled = false;
          this.rentDisabled = true;
        }
      },

      showbuilding(){
        let _this = this;
        let districtId = this.form.districtId;
        let streetId = this.form.streetId;
        let areaVillage = this.form.areaVillage;
        let areaVillageId = this.form.areaVillageId;
        if(areaVillage && areaVillageId){
          // this.$refs['editorBuilding'].isShowEditorBuilding(areaVillageId,areaVillage,true);
          let test = this.$layer.iframe({
            content: {
              content: EditorBuildingPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{areaVillageId:areaVillageId,areaVillage:areaVillage,thistrue:true,tabactive:'building'}//props
            },
            type:2,
            area:['600px','680px'],
            title: '楼盘字典 '+ ' 【'+this.form.areaVillage+'】',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        }else{
          if(streetId != -1 && areaVillage != ''){
           let layerId = this.$layer.iframe({
            content: {
              content: NewBuildingPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{
                level:3,
                townId:districtId,
                name:areaVillage,
                streetId:streetId,
              }//props
            },
            type:2,
            area:['600px','658px'],
            title: '新增楼盘',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              
            }
          });
          }else if(streetId == -1 && areaVillage != ''){
            let layerId = this.$layer.iframe({
              content: {
                content: NewBuildingPage, //传递的组件对象
                parent: this,//当前的vue对象
                data:{
                  level:3,
                  townId:districtId,
                  name:areaVillage,
                  streetId:'',
                }//props
              },
              type:2,
              area:['600px','658px'],
              title: '新增楼盘',
              shadeClose: false,
              shade: true,//是否显示遮罩
              zIndex:19891111,
              cancel:()=>{//关闭事件
                
              }
            });
          }
        }

      },
      addHouseBuilding(id,buildingData,type){
        this.form.areaVillageId = id;
        this.form.areaVillage =  buildingData.name;
        this.form.streetId = buildingData.streetId;
        let obj  = {
          value:buildingData.name,
          id:id,
          houseNumRule:buildingData.houseNumRule,
          chooseHouse:buildingData.chooseHouse,
          chooseHouseNum:buildingData.chooseHouseNum,
        };
        this.currentBuilding = obj;
        if(type == 2){
          this.$refs['editorBuilding'].isShowEditorPedestal(id, buildingData.name);
        }
      },
      showSchool(){
        let _this = this;
        let currentBuilding = this.currentBuilding;
        let areaVillageId = this.form.areaVillageId;
        let areaVillage = this.form.areaVillage;
        if(areaVillageId && areaVillage != ''){
          // _this.$refs['editorBuilding'].isShowEditorSchool(areaVillageId, areaVillage);
          let test = this.$layer.iframe({
            content: {
              content: EditorBuildingPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{areaVillageId:areaVillageId,areaVillage:areaVillage,thistrue:true,tabactive:'school'}//props
            },
            type:2,
            area:['600px','680px'],
            title: '楼盘字典 '+ ' 【'+this.form.areaVillage+'】',
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891111,
            cancel:()=>{//关闭事件
              this.currentPage = '';
            }
          });
        }
      },
      setRepeatData(check){
        let _this = this;
        if(check && check.length != 0){
          let arr = [];
          check.forEach(function(item,index){
            if(index == 0) {
              _this.form.repeatHouseId = item.id;
            }
            arr.push({
              id: item.id,
              name: item.roomCode,
            })
          })
          this.repeatParams = arr;
        }else{
          this.repeatParams = [];
          this.form.repeatHouseId = "";
        }
      },

      showRepeatRentPage(){
        let _this = this;
        let repeat = this.repeatParams;
        let id = this.form.id;
        _this.$layer.iframe({
          content: {
            content: RepeatRentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              repeat:repeat,
              id:id,
            }//props
          },
          area:['600px','450px'],
          title:'选择房源',
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件

          }
        });
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
        }else if(value == 3){
          id = this.form.deptId3;
          userList = "userList3";
        }
        if(id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'',name:' '}];
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

              _this.form["empId"+value] = '';

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      showNewFollowPage(){
        let areaVillage = this.form.areaVillage;
        let seat = this.form.seat;
        let unit = this.form.unit;
        let roomNum = this.form.roomId;
        let houseName = "["+areaVillage+seat+unit+roomNum+"]";
        let num = this.checkHouseValue10;
        let paste = this.checkHouseValue11;
        let roomType = this.form.roomType;
       
        let layerId = this.$layer.iframe({
          content: {
            content: NeWFollowPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{thisid:this.form.id,thishouseName:houseName,thisnum:num,thispaste:paste,roomType:roomType}//props
          },
          area:['500px','350px'],
          title: "房源跟进【"+this.form.areaVillage+"】",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });
      },


      editorFollowPage(id){
        let houseId = this.form.id;
        let areaVillage = this.form.areaVillage;
        let seat = this.form.seat;
        let unit = this.form.unit;
        let roomNum = this.form.roomId;
        let houseName = "["+areaVillage+seat+unit+roomNum+"]";
        let num = this.checkHouseValue10;
        let paste = this.checkHouseValue11;
        let roomType = this.form.roomType;
        this.$refs["editorFollow"].showFollowVisible(houseId,id,houseName,num,paste,roomType);
      },
      getDeletedFollowId(id){
        this.deletedFollowId = id;
      },
      deletedFollow(){
        let _this = this;
        let deletedFollowId = this.deletedFollowId;
        if(deletedFollowId){
          _this.myConfirm("警告：房源跟进记录删除后不能还原！", 'question-icon','确认','取消','确定要永久删除选定的跟进记录吗？','my-message').then(res => {
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
        let id = _this.form.id;
        let type = "写入跟进";
        let modifyType = this.modifyType;
        if(modifyType == 7){
          type = '勘察跟进';
        }else if(modifyType == 2){
          type = '写入跟进';
        }else if(modifyType == 6){
          type = '带看跟进';
        }
        if(selectType){
          type = selectType;
        }
        followList(id,type).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
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
      lookMasterFollow(id,houseName){
        this.$refs.masterFollow.dialogShow(id,houseName);
      },
      lookHistoryFollow(id,houseName){
        this.$refs.historyFollow.dialogShow(id,houseName);
      },
      lookHouseFollow(id,houseName){
        this.$refs.houseFollow.dialogShow(id,houseName);
      },
      lookFollowByType(value){
        let areaVillage = this.form.areaVillage;
        let seat = this.form.seat;
        let unit = this.form.unit;
        let roomNum = this.form.roomId;
        let houseName = areaVillage +"-" +seat+unit+"-"+roomNum;
        if(value == 7){
          this.getFollowList('勘察跟进');
        }else if(value == 2){
          this.getFollowList('写入跟进');
        }else if(value == 6){
          this.getFollowList('带看跟进');
        }else if(value == 4){
          this.lookMasterFollow(this.form.id,houseName);
        }else if(value == 1){
          this.lookHouseFollow(this.form.id,houseName);
        }
      },

      lookFollowByTypeSpecial(state){
        debugger;
        if(!state){
          this.lookFollowByType(this.modifyType);
        }
      },
 

      showFollowOrMaster(){
        let _this = this;
        let id = this.form.id;
        let followOrMaster = _this.followOrMaster;
        if(followOrMaster == 2){

          lookMaster(id).then(function(response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              if(true){
                _this.followOrMaster = 1;
                _this.followOrMasterName = "看跟进";
                _this.moreFollow = 1;
              }
            } else if (response.status == 1){
              _this.myAlert(response.msg,'dangerous-icon');
            }
          })
        }else{
          _this.followOrMaster = 2;
          _this.followOrMasterName = "看业主";
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
        let districtId = this.form.districtId;
        let streetId = this.form.streetId;
        let areaVillageId  = this.form.areaVillageId;
        let seatId = this.form.seatId;
        let unitId = this.form.unitId;
        let roomId = this.form.roomId;

        let roomType = this.form.roomType;

        let salePrice = this.form.salePrice;
        let salePriceArea = this.form.salePriceArea;

        let rentPrice = this.form.rentPriceArea;
        let rentPriceArea = this.form.rentPriceArea;

        let ownerName = this.form.ownerName;
        let ownerPhone = this.form.ownerPhone;
        let empId1 = this.form.empId1;
        let floorAmount = this.form.floorAmount*1;
        let floorCurrent = this.form.floorCurrent*1;
        let roomTotalArea = this.form.roomTotalArea*1;
        let roomInnerArea = this.form.roomInnerArea*1;


        let checkHouseValue1 = this.checkHouseValue1;
        let seat = this.form.seat;
        let checkHouseValue2 = this.checkHouseValue2;
        let roomShape1 = this.form.roomShape1;
        let roomShape2 = this.form.roomShape2;
        let roomShape3 = this.form.roomShape3;
        let roomShape4 = this.form.roomShape4;
        let roomShapeId = this.form.roomShapeId;

        let checkHouseValue3 = this.checkHouseValue3;
        let decorateId = this.form.decorateId;

        let checkHouseValue4 = this.checkHouseValue4;

        let checkHouseValue5 = this.checkHouseValue5;

        let checkHouseValue6 = this.checkHouseValue6;

        let checkHouseValue7 = this.checkHouseValue7;

        let checkHouseValue8 = this.checkHouseValue8;
        let source = this.form.source;

        let checkHouseValue9 = this.checkHouseValue9;
        let currentBuilding = this.currentBuilding;
        let currentHouseNum = this.currentHouseNum;
        let title = "";
        let areaVillage = this.form.areaVillage;
        if(districtId == '' || streetId == '-1'){
          this.myAlert("地域为空！",'dangerous-icon');
          return false;
        }

        if(areaVillageId == '' ){
          this.myAlert("您必须先选择一个【楼盘字典】！",'dangerous-icon','my-message','如果是新的楼盘字典，请预先保存到楼盘字典库中');
          return false;
        }else{
          title = this.form.areaVillage;
          if(this.currentBuilding) {
            let value = this.currentBuilding.value;
            if (title != value) {
              this.myAlert("您必须先选择一个【楼盘字典】！", 'dangerous-icon', 'my-message', '如果是新的楼盘字典，请预先保存到楼盘字典库中');
              return false;
            }
          }
        }
        title = this.form.seat;
        if(!title && checkHouseValue1 == 'true'){
          this.myAlert("请填写栋座",'dangerous-icon');
          return false;
        }
        title = this.form.unit;
        if(!title && checkHouseValue1 == 'true'){
          this.myAlert("请填写单元",'dangerous-icon');
          return false;
        }


        

        if(roomId == '' || roomId == null){
          this.myAlert("房号不能为空！",'dangerous-icon');
          return false;
        }

        if(currentBuilding) {
          let rule = currentBuilding.houseNumRule;
          if (rule == 1) {
            if (roomId && !/^[0-9a-zA-Z]*$/g.test(roomId)) {
              this.myAlert("输入房号：不符合["+areaVillage+"]的房号规则和例外规则", 'dangerous-icon','my-big-message','房号规则是：【字母、数字任意组合】例如：601、18D');
              return false;
            }
          } else if (rule == 2) {
            if (roomId && !/^[0-9|a-zA-Z|\W]*$/g.test(roomId)) {
              this.myAlert("输入房号：不符合["+areaVillage+"]的房号规则和例外规则", 'dangerous-icon','my-big-message','房号规则是：【字母、数字、字符任意组合】例如：601、18-D');
              return false;
            }
          } else if (rule == 3) {
            let current = floorCurrent;
            if(current < 10){
              current = "0"+current;
            }
            if(!roomId || roomId.substr(0,2) != current ||  (!/^[0-9]{2}$/g.test(roomId.substr(2)))){
              this.myAlert("输入房号：不符合["+areaVillage+"]的房号规则和例外规则", 'dangerous-icon','my-big-message','房号规则是：【楼层（2位）+房间号（数字）】例如：0601、1804');
              return false;
            }
          } else if (rule == 4) {
            let current = floorCurrent;
            if(current < 10){
              current = "0"+current;
            }
            if(!roomId || roomId.substr(0,2) != current ||  (!/^[a-zA-Z]{1}$/g.test(roomId.substr(2)))){
              this.myAlert("输入房号：不符合["+areaVillage+"]的房号规则和例外规则", 'dangerous-icon','my-big-message','房号规则是：【楼层（2位）+房间号（字母）】例如：06A、18D');
              return false;
            }
          } else if (rule == 5) {
            let current = floorCurrent;
            if(current < 10){
              current = "0"+current;
            }
            if(!roomId || roomId.substr(0,2) != current ||  (!/^[0-9a-zA-Z]{1}$/g.test(roomId.substr(2)))){
              this.myAlert("输入房号：不符合["+areaVillage+"]的房号规则和例外规则", 'dangerous-icon','my-big-message','房号规则是：【楼层（2位）+房间号（数字/字母）】例如：06A、18D');
              return false;
            }
          }
        }
        /*if(checkHouseValue1 == 'true' && seat == ''){
         this.myAlert("栋座为空！",'dangerous-icon');
         }*/
        if(checkHouseValue6 == 'true' && floorCurrent == ''){
          this.myAlert("楼层为空！",'dangerous-icon');
          return false;
        }
        if(checkHouseValue7 == 'true' &&  floorAmount == ''){
          this.myAlert("总层为空！",'dangerous-icon');
          return false;
        }
        if(floorAmount < floorCurrent){
          this.myAlert("楼层应小于等于总层数",'dangerous-icon');
          return false;
        }

        if(roomTotalArea < roomInnerArea){
          this.myAlert("面积应大于等于套内面积",'dangerous-icon');
          return false;
        }

       if(checkHouseValue2 == 'true' && (
          (!((roomShape1 != '-1' && roomShape1 != '0') &&  roomShape2 != '-1' && roomShape3 != '-1' && roomShape4 != '-1' ) && 
          !((roomShape2 != '-1' && roomShape2 != '0') &&  roomShape1 != '-1' && roomShape3 != '-1' && roomShape4 != '-1' ) && 
          !((roomShape3 != '-1' && roomShape3 != '0') &&  roomShape1 != '-1' && roomShape2 != '-1' && roomShape4 != '-1' ) && 
          !((roomShape4 != '-1' && roomShape4 != '0') &&  roomShape1 != '-1' && roomShape2 != '-1' && roomShape3 != '-1' )) || 
           roomShapeId == '0')
        ){
          this.myAlert("房型为空！",'dangerous-icon');
          return false;
        }

        if(checkHouseValue4 == 'true' && roomTotalArea == ''){
          this.myAlert("面积为空！",'dangerous-icon');
          return false;
        }

        if( checkHouseValue8 == 'true' &&  source == '0'){
          this.myAlert("来源为空！",'dangerous-icon');
          return false;
        }

        if(roomType == 1){
          if(checkHouseValue5 == "true" && (!(salePrice && salePrice !='0.00' && salePrice != '0')  || !salePriceArea)){
            this.myAlert("售价为空！",'dangerous-icon');
            return false;
          }
        }else if(roomType == 2){
          if(checkHouseValue5 == "true" && (!(rentPrice && rentPrice !='0.00' && rentPrice != '0')  || !rentPriceArea)){
            this.myAlert("租价为空！",'dangerous-icon');
            return false;
          }
        }else{
          if(checkHouseValue5 == "true" && (!(salePrice && salePrice !='0.00' && salePrice != '0') || !salePriceArea)){
            this.myAlert("售价为空！",'dangerous-icon');
            return false;
          }
          if(checkHouseValue5 == "true" &&(!(rentPrice && rentPrice !='0.00' && rentPrice != '0') || !rentPriceArea)){
            this.myAlert("租价为空！",'dangerous-icon');
            return false;
          }
        }
        if(checkHouseValue3 == 'true' && decorateId == '0'){
          this.myAlert("装修为空！",'dangerous-icon');
          return false;
        }

        if(!ownerName){
          this.myAlert("业主为空！",'dangerous-icon');
          return false;
        }
        if(checkHouseValue9 == 'true' && ownerPhone == ''){
          this.myAlert("手机为空！",'dangerous-icon');
          return false;
        }

        if(!empId1){
          this.myAlert("员工1为空！",'dangerous-icon');
          return false;
        }

        let form = JSON.parse(JSON.stringify(_this.form)) ;
        if(_this.keyStateParams.length != 0) {
          let form1 = this.form1;
          for(let i = 0 ; i < form1.length ; i++){
            let keyType = form1[i].keyType;
            let keyState = form1[i].keyState;
            form1[i].keyTypeId = _this.getIdFromList(_this.keyTypeParams,keyType);
            form1[i].state = _this.getIdFromList(_this.keyStateParams,keyState);
            if(form1[i].deleted == 0){
              if(form1[i].keyType == '密码钥匙' && form1[i].keyState == '收回可用'){
                if(form1[i].lendDate == '') {
                  this.myAlert("钥匙收回日为空", 'dangerous-icon');
                  return false;
                }
                if(form1[i].lender == '') {
                  this.myAlert("钥匙收回人为空", 'dangerous-icon');
                  return false;
                }
              }
              if(form1[i].keyType == '密码钥匙'){
                if(form1[i].keyPsd == '') {
                  this.myAlert("密码为空", 'dangerous-icon');
                  return false;
                }
              }
              if(form1[i].empId == '0'){
                this.myAlert("钥匙负责人为空",'dangerous-icon');
                return false;
              }
              if(form1[i].keyType == '实体钥匙' && form1[i].keyState == '外借同行'){
                if(form1[i].lendDate == '') {
                  this.myAlert("钥匙外借日为空", 'dangerous-icon');
                  return false;
                }
                if(form1[i].lender == '') {
                  this.myAlert("钥匙外借人为空", 'dangerous-icon');
                  return false;
                }
              }
              if(form1[i].keyType == '实体钥匙' && form1[i].keyState == '归还来源'){
                if(form1[i].lendDate == '') {
                  this.myAlert("钥匙归还日为空", 'dangerous-icon');
                  return false;
                }
                if(form1[i].lender == '') {
                  this.myAlert("钥匙归还人为空", 'dangerous-icon');
                  return false;
                }
              }
              if(form1[i].keyType == '实体钥匙' && form1[i].keyState == '收回可用'){
                if(form1[i].lendDate == '') {
                  this.myAlert("钥匙收回日为空", 'dangerous-icon');
                  return false;
                }
                if(form1[i].lender == '') {
                  this.myAlert("钥匙收回人为空", 'dangerous-icon');
                  return false;
                }
              }
              
            }  
          }
         
        }
        let commTypesParams = this.commTypesParams;
        let repeatParams = this.repeatParams;
        let repeatIdsStr = [];
        let commTypesStr = [];
        commTypesParams.forEach(function(item){
          if(item.check != '0'){
            commTypesStr.push(item.id);
          }
        })
        repeatParams.forEach(function(item){
          repeatIdsStr.push(item.id);
        })

        form.commTypesStr = commTypesStr.toString();
        form.repeatIdsStr = repeatIdsStr.toString();
        let townName = '';
        let streetName = '';
        townName = this.getNameFromList(this.areas,this.form.districtId,'label');
        streetName = this.getNameFromList(this.streetArr,this.form.streetId,'label');
        form.townName = townName;
        form.streetName = streetName;

        //比较基础详情，和钥匙详情数据是否有改动；
        let form1 = JSON.parse(JSON.stringify(this.form1));
        let initForm = this.initForm;
        let initKeyForm = this.initKeyForm;
        let initKeyFormMap = {};
        if(initKeyForm){
          initKeyForm.forEach(item => {
            initKeyFormMap[item.id] = item;
          })
        }
        let keyUpdate = 0;
        let keyArr = [];
        if(form1 && form1.length != 0){
          form1.forEach(item => {
              let initKey = initKeyFormMap[item.id];
              if(initKey){
                keyArr.push(_this.$utils.checkObjDataDifferent(item,initKey));
                if(item.isUpdate){
                  keyUpdate = 1;
                }
              }else{
                keyArr.push(item);
              }
          })
        }
        let keys = JSON.stringify(keyArr);
        let updateForm = _this.$utils.checkObjDataDifferent(form,initForm);
        if(keyUpdate){
          updateForm.isUpdate = 1;
        }
        updateForm.keys = keys;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        rentModify(updateForm).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {

            _this.myAlert("房源记录保存成功！", 'success-icon').then(res => {
              
              _this.$parent.reloadRentList(3,_this.form.id);
              _this.$layer.close(_this.layerid);

            }).catch(err => {

            })
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        })
      },
    
      cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
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
        this.dialogFormVisible = false;
      },
      pairHouse(){
        let _this = this;
        let customerId = this.form.customerId;
        let test = _this.$layer.iframe({
          content: {
            content: CustomerPairPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{getHouseId:this.form.id}//props
          },
          area:['654px','450px'],
          title: "标记配对",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });
      },
      getHouseKeyData(){
        let _this = this;
        let id = '';
        if(this.getId){
          id = this.getId;
        }else{
          id = this.form.id;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        houseKey(id).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let type = response.data.params.keyTypeIdParams;
            let state = response.data.params.stateParams;
            _this.keyStateParams = state;
            _this.keyTypeParams = type;
            let keys = response.data.keys;
            if(keys && keys.length != 0){
              keys.forEach(function(item,index){
                if(index == 0 ){
                  item.isAdd = true;
                }else{
                  item.isAdd = false;
                }
                let empId = item.empId;
                let users = item.users;
                if(users && users.length != 0){
                  users.forEach(function(item1){
                    if(item1.id == empId){
                      item.phone = item1.phone;
                    }
                  })
                }
              })
              _this.initKeyForm = JSON.parse(JSON.stringify(keys));
              _this.form1 = keys;
            }else{
              _this.form1 = [];
            }
          } else if (response.status == 1){
            _this.myAlert(response.status,'dangouser-icon');
          }
        })
      },
      findUserKeyByDepartId(item){
        let id = item.deptId;
        item.phone = '';
        if(id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'',name:' '}];
              if(user && user.length != 0){
                user.forEach(function(item){
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
                })
              }
              item.users = arr;
              item.empId = '';

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          let user = [{id: '0', name: ' '}];
          item.users = user;
        }
      },
      addOrDeletedKey(item){
        let _this = this;
        this.myConfirm("警告：【房源钥匙】删除后将不能还原！", 'dangerous-icon','确认','取消','确定要永久删除选定的记录吗？','my-message').then(res => {
          _this.myAlert("删除成功！", 'success-icon').then(res => {
            item.deleted = 1;
          }).catch(err => {

          })

        }).catch(err => {
        })

      },
      addKey(){
        let obj = JSON.parse(JSON.stringify(this.elemKey));

        this.form1.unshift(obj);
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
      trimclick(){

      },
      editorCustomer(index, row){
        let _this = this;
        let ids = [];
        let tableData = this.tableData;
        let len = tableData.length;
        for(let i = 0 ;  i < len; i ++){
          ids.push(tableData[i].customerId);
        }
        this.currentPage = row;
        _this.$layer.iframe({
          content: {
            content: EditorCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.customerId,name:row.name,activeName:'house',ids:ids.toString(),currentIndex:index}//props
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
    },
    mounted(){
      if(this.getActiveName == 'house'){
        this.getRentEditor();
        this.active1 = true ;
      }else if(this.getActiveName == 'pedestal') {
        this.findCustomerListByHouse();
        this.active2 = true;
      }else {
        this.getRentEditor();
        this.getHouseKeyData();
        this.active3 = false;
      }
    },
    watch:{
      'form.salePrice':function(newval, oldval){
        var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.salePrice = undefined;
            return;
          }
          this.form.salePrice = oldval
        } else {
          this.form.salePrice = newval.replace(/^\./g, "")
        }
      },
      'form.rentPrice':function(newval, oldval){
        var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.rentPrice = undefined;
            return;
          }
          this.form.rentPrice = oldval
        } else {
          this.form.rentPrice = newval.replace(/^\./g, "")
        }
      },
      'form.roomTotalArea':function(newval, oldval){
        var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.roomTotalArea = undefined;
            return;
          }
          this.form.roomTotalArea = oldval
        } else {
          this.form.roomTotalArea = newval.replace(/^\./g, "")
        }
      },
      'form.roomInnerArea':function(newval, oldval){
        var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.roomInnerArea = undefined;
            return;
          }
          this.form.roomInnerArea = oldval
        } else {
          this.form.roomInnerArea = newval.replace(/^\./g, "")
        }
      },
      'form.roomTax':function(newval, oldval){
        var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.roomTax = undefined;
            return;
          }
          this.form.roomTax = oldval
        } else {
          this.form.roomTax = newval.replace(/^\./g, "")
        }
      },
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisrowid == _this.getId){
          _this.$store.state.layerifranme.splice(index,1);
        }
      });
      _this.$parent.shadenum();
    },
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-tabs--border-card>.el-tabs__header {
    background:#DCD9D3;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;

  }
  

  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }


  /deep/ .el-tabs__nav .is-active{
    height:24px!important;
    border: none;
  }
  /deep/ .el-tabs__nav-scroll{
    height:24px!important;
  }
  /deep/ .el-tabs--border-card {
    background:#DCD9D3;
    border-width:0;
  }
  /deep/ .el-tabs--border-card>.el-tabs__content {
    padding:0 !important;
  }
  .followList{
    margin:5px 10px 0;
    border:1px solid #797979;
    height:135px;
    overflow:auto;
    background:#C0C0C0;
    .elemFollow{
      padding: 2px;
      line-height: 16px;
      border-bottom: 1px solid #ccc;
      font-size: 12px;
      background: #fbfbfb;

    }
  }
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .require-word-i:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .greent-word{
    color:#088383;
  }
  .top-word{
    position:relative;
    top:8px;
  }
  .zhu-word{
    display:inline-block;
    line-height:23px;
    margin-left:-3px;
    padding: 0 5px;
  }
  .sale-icon{
    background:url(../../../images/icon3.png) -186px -14px;
    width:28px;
    height:30px;
    display:block;
    cursor:pointer;
  }
  .sale-icon:hover{
    background:url(../../../images/icon3.png) -186px -57px;
    width:28px;
    height:30px;
    display:block;
    cursor:pointer;
  }

  .rent-icon{
    background:url(../../../images/icon3.png) -102px -14px;
    width:29px;
    height:28px;
    display:block;
    cursor:pointer;
  }
  .rent-icon:hover{
    background:url(../../../images/icon3.png) -102px -57px;
    width:29px;
    height:28px;
    display:block;
    cursor:pointer;
  }
  
  .rent-sale-icon{
    background:url(../../../images/icon3.png) -18px -14px;
    width:29px;
    height:28px;
    display:block;
    cursor:pointer;
  }
  .rent-sale-icon:hover{
    background:url(../../../images/icon3.png) -18px -57px;
    width:29px;
    height:28px;
    display:block;
    cursor:pointer;
  }

  .key-icon{
    background:url(../../../images/icon.png) -223px -4px;
    width:20px;
    height:20px;
    display:block;
  }
  .repeat-icon{
    background:url(../../../images/icon.png) -338px -143px;
    width:21px;
    height:22px;
    display:block;
    cursor:pointer;
  }
  .repeat-icon:hover{
    background:url(../../../images/yyf.png) -302px -140px;
    width:21px;
    height:22px;
    display:block;
    cursor:pointer;
  }
 
  .building-icon{
    background:url(../../../images/icon.png) -228px -197px;
    width:18px;
    height:17px;
    display:block;
    cursor:pointer;
  }
  .building-icon:hover{
    border:1px solid #797979;
  }
  .school-icon{
    background:url(../../../images/icon.png) -160px -40px;
    width:18px;
    height:17px;
    display:block;
    cursor:pointer;
  }
  .school-icon:hover{
    border:1px solid #797979;
  }

  .show-disabled-icon{
    background:url(../../../images/icon.png) -202px -150px;
    width:16px;
    height:10px;
    display:block;
    cursor:pointer;
  }
  
  
  .association-icon{
    background:url(../../../images/icon.png) -5px -151px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
  .public-icon{
    background:url(../../../images/icon.png) -213px -172px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
  .private-icon{
    background:url(../../../images/icon.png) -213px -172px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
  .add-icon{
    background:url(../../../images/icon.png) -213px -172px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
  .deleted-icon{
    background:url(../../../images/icon.png) -240px -172px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
  .public-pan-icon{
    background:url(../../../images/icon.png) -322px -230px;
    width:20px;
    height:20px;
    display:block;
  }
  .private-pan-icon{
    background:url(../../../images/icon.png) -344px -230px;
    width:20px;
    height:20px;
    display:block;
  }
  .click-check{
    background:#D7E8FC !important;
  }
  .question-icon{
    cursor:pointer;
  }
  .foot-btn{
    display:inline-block;
    padding:3px 15px;
    border:1px solid #797979;
    cursor:pointer;
    font-size:12px;
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
  .building .pop-up{
    padding-bottom:0 !important;
    .pop-up-container{
      border-width:0px;
      padding:0 5px;
    }
  }
  .padding-l-10{
    padding-left:10px;
  }
  .pop-up-container .el-select dropdown-list .el-select__tags {
    display: none;

  }
  .left-content{
    height:320px;
    width:500px;
    border-width:0px;
    border-right-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    .checkContent{
      width:238px;
      border-radius:5px;
      border:1px solid #999;
      background:#fff;

    }
  }
  .right-content{
    height:295px;
    width:250px;
  }
  .word-q{
    padding-left:48px;
    width:140px;
    text-align:center;
  }
  .word-j{
    width:112px;
    text-align:center;
  }
  .word-build{
    width:127px;
    text-align:center;
  }
  .word-ped{
    width:81px;
    text-align:center;
  }
  .word-unit{
    width:73px;
    text-align:center;
  }
  .word-houes{
    width:73px;
    text-align:center;
  }
  .word-c{
    width:58px;
    text-align:center;
  }
  .word-zc{
    width:63px;
    text-align:center;
  }
  .remark-word{
    display:inline-block;
    font-size:12px;
    color:#999;
    line-height: 27px;
  }
  .word{
    font-size:12px;
    line-height:26px;
    display:inline-block;
  }

  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }
  .padding-t-10{
    padding-top:10px;
  }
  .padding-t-6{
    padding-top:6px;
  }
  .padding-t-2{
    padding-top:2px;
  }
  .padding-r-2{
    padding-right:2px;
  }
  .padding-r-1{
    padding-right:1px;
  }
  .footer-btn{
    padding:5px 0;
  }
  .save-btn{
    display: inline-block;
    line-height:18px;
    height:20px;
    margin: 0 5px;
    padding: 0px 12px;
    font-size: 12px;
    border: 1px solid #666;
    border-radius: 3px;
    color: #333333;
    background-color: #DFDAD5;

  }
  .cancel-btn{
    display: inline-block;
    line-height:18px;
    height:20px;
    margin: 0 0px 0 5px;
    padding: 0px 12px;
    font-size: 12px;
    border: 1px solid #666;
    border-radius: 3px;
    color: #333333;
    background-color: #DFDAD5;
  }
  /deep/ .el-textarea__inner{
    padding:5px;
    font-size:12px;
    border:1px solid #aaa;
  }
  .blur-word{
    color:#0033cc;
  }
  .survey-word{
    color:#088383;
  }
  .left-add{

    height:50px;
  }
  .left-assocition{
    width:619px;
    margin:5px;
    border:1px solid #aaa;
    height:405px;
  }
  .right-assocition{
    width:120px;
    .click-btn{
      width:113px;
      height:23px;
      font-size:12px;
      line-height:23px;
      text-align:center;
      border:1px solid #666;
      margin: 10px 0 0 5px;
      cursor:pointer;
    }
  }
  .keyList{
    margin-top:10px;
    padding:5px;
    border-width: 2px;
    border-style: solid;

    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  .remark{
    padding:3px;
    border:1px solid #aaa;
    border-radius:5px;
    font-size:12px;
    color:#333;
  }
  .record-word{
    font-size:12px;
    color:#999;
    display:inline-block;
    padding-right:2px;
  }

  .gray{
    color:#B5B6B6;
  }
  /deep/.pop-up-container .list-content .el-table .el-table__body-wrapper {
    height:94% !important;
  }
</style>
<style lang="scss">
  .special-select-color  .el-input__inner{
    color:#088383;
  }
</style>
