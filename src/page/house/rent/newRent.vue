<template>
  <div class="" >
     <div class="pop-up" style="margin:0 10px;"  >
        <div class="pop-up-container" style="height: 464px;">
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
                <i class="school-icon left"  style="margin-top:3px;"  @click="showSchool" ></i>
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
              <div class="left  padding-r-2" style="width:47px;text-align:right;" >
                <span class="word require-word" >地址</span>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="districtId"   label=""  label-width="0">
                  <el-select @change="findStreeByTown" v-model="form.districtId"    style="width:92px;" >
                    <el-option v-for="item in areas" style="width:100%;"  :label="item.label" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="streetId" >
                  <el-select v-model="form.streetId" @change="changeByStreet"    style="width:112px;" >
                    <el-option  v-for="item in streetArr" :label="item.label" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="areaVillage" >
                  <el-autocomplete title="上限30个字" maxlength="30" @select="getSelectBuilding" :fetch-suggestions="querySearchAsync" style="width:127px;" v-model.trim="form.areaVillage"  autocomplete="off"></el-autocomplete>
                </el-form-item>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="seat" >
                  <el-autocomplete   @select="getSelectSeat" maxlength="4" title="上限4字符" @change="setFloorDisalbed"  :fetch-suggestions="getPedestalListData" style="width:81px;" v-model.trim="form.seat" autocomplete="off"></el-autocomplete>
                </el-form-item>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="unit" >
                  <el-autocomplete @select="getSelectUnit" maxlength="4"  title="上限4字符"  :fetch-suggestions="getUnitListData" style="width:73px;" v-model.trim="form.unit"   autocomplete="off"></el-autocomplete>
                </el-form-item>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="roomId" >
                  <el-autocomplete  @select="getSelectHouse" title="上限5字符" maxlength="5"   @change="setFloorCurrentDisalbed" :fetch-suggestions="getHouseListData" style="width:73px;" v-model.trim="form.roomId"    ></el-autocomplete>
                </el-form-item>
              </div>
              <div class="left padding-r-1" >
                <el-form-item  prop="floorCurrent" >
                  <el-input @input="checkFloowNum1"   title="上限4位数" maxLength="4"  style="width:69px;" v-model.trim="form.floorCurrent"  autocomplete="off"></el-input>
                </el-form-item>
              </div>
              <div class="left padding-r-1-2" >
                <el-form-item  prop="floorAmount" >
                  <el-input @input="checkFloowNum2"     title="上限4位数" maxLength="4"   style="width:70px;" v-model.trim="form.floorAmount"  autocomplete="off"></el-input>
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
                  <el-select v-model="form.roomShape3" placeholder="卫"   style="width:50px;" >
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
              <div class="left  padding-r-2" style="padding-left:12px;" >
                <span class="word" >朝向</span>
              </div>
              <div class="left padding-r-1" style="" >
                <el-form-item  prop="roomDirectionId" >
                  <el-select v-model="form.roomDirectionId"    style="width:70px;" >
                    <el-option v-for="item in roomDirectionParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left  padding-r-2"  style="padding-left:12px;" >
                <span class="word" >编号</span>
              </div>
              <div class="left padding-r-1" style="" >
                <el-form-item  prop="" >
                <el-input disabled="true"  v-model="name"   placeholder="【自动编号】" style="width:85px;"  ></el-input>
                </el-form-item>

              </div>
              <div class="left  padding-r-2"  style="padding-left:12px;" >
                <span class="word greent-word " >自定号</span>
              </div>
              <div class="left padding-r-1" style="" >
                <el-form-item  prop="num" >
                  <el-select v-model="form.num" placeholder=""   style="width:67px;" >
                    <el-option v-for="item in numParams"  :label="item.name" :value="item.name" ></el-option>
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
                  <el-input @input="checkArea" title="上限10位数" maxLength="13"   v-model="form.roomTotalArea"     style="width:70px;"  ></el-input>
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
                  <el-input @input="checkInnerArea" title="上限10位数" maxLength="10"  v-model="form.roomInnerArea"     style="width:70px;"  ></el-input>
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

              <div class="left  padding-r-2" style="padding-left:10px;" >
                <span class="word" >用途</span>
              </div>
              <div class="left padding-r-1" style="" >
                <el-form-item  prop="roomUseId" >
                  <el-select disabled="true" v-model="form.roomUseId"    style="width:70px;" >
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

              <div class="left  padding-r-2" style="width:51px;text-align:right;" >
                <span :class="{'word':true,'require-word':checkHouseValue8 == 'true'}" >来 <span style="display:inline-block;width:6px;height:20px;" ></span> 源</span>
              </div>

              <div class="left padding-r-1" style="" >
                <el-form-item  prop="source" >
                  <el-select v-model="form.source"    style="width:67px;" >
                    <el-option v-for="item in sourceParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="break" >

            </div>
            <div class="clear" >
              <div class="left clear left-content" >
                <div class="clear" >
                  <div class="left  padding-r-2" style="padding-left:12px;width:46px;height:20px;" >
                    <i @click="saleAndRentChange" :class="{'sale-icon':this.form.roomType==1,'rent-icon':this.form.roomType==2,'rent-sale-icon':this.form.roomType==3}"  ></i>
                  </div>
                  <div class="left "  >
                    <el-form-item  prop="roomSaleStateId" >
                      <el-select class="special-select-color" v-model="form.roomSaleStateId"    style="width:67px;" >
                        <el-option v-for="item in roomSaleStateIdParams"  :label="item.name" :value="item.id" >
                          <span class="greent-word" >{{item.name}}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left " style="padding-left:4px;" >
                    <el-form-item  prop="roomProperty1" >
                      <el-select class="special-select-color"  v-model="form.roomProperty1"    style="width:67px;" >
                        <el-option :disabled="item.disabled" v-for="item in roomProperty1Params"  :label="item.name" :value="item.id" >
                          <span class="greent-word" >{{item.name}}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left " style="padding-left:5px;" >
                    <el-form-item  prop="roomProperty2" >
                      <el-select class="special-select-color"  v-model="form.roomProperty2"    style="width:67px;color:#088383" >
                        <el-option v-for="item in roomProperty2Params"  :label="item.name" :value="item.id" >
                          <span class="greent-word" >{{item.name}}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left  padding-r-2"  style="padding-left:48px;" >
                    <span class="word greent-word" >{{authorizeName}}</span>
                  </div>
                  <div class="left padding-r-1" style="" >
                    <el-form-item  prop="roomProperty3" >
                      <el-select v-model="form.roomProperty3"    style="width:72px;" >
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
                      <el-input @input="calculateSale" :disabled="saleDisabled" style="width:70px;" v-model.trim="form.salePrice" title="上限6位数" maxLength="9" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-1" style="" >
                    <el-form-item  prop="salePriceUnit" >
                      <el-select disabled="true" v-model="form.salePriceUnit"    style="width:68px;" >
                        <el-option v-for="item in salePriceParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left " style="padding-left:3px;" >
                    <el-form-item  prop="salePriceArea" >
                      <el-input  disabled="true" style="width:70px;" v-model.trim="form.salePriceArea" title="上限10位数" maxLength="10" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                  <div class="left  "  style="padding-left:2px;" >
                    <span class="remark-word" >/㎡</span>
                  </div>
                  <div class="left  padding-r-2"  style="padding-left:27px;" >
                    <span class="word greent-word" >编号</span>
                  </div>
                  <div class="left padding-r-1" style="" >
                    <el-form-item  prop="roomDelegateNum" >
                      <el-input v-model="form.roomDelegateNum" title="上限50个字" maxlength="50"   style="width:165px;" ></el-input>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear" >
                  <div class="left  padding-r-2" style="padding-left:12px;width:46px;text-align:right;" >
                    <span :class="{'require-word':this.form.roomType==3  && checkHouseValue5 == 'true','require-word-i':this.form.roomType==2  && checkHouseValue5 == 'true','word':true}"  >租价</span>
                  </div>
                  <div class="left "  >
                    <el-form-item  prop="rentPrice" >
                      <el-input @input="calculateRent"   :disabled="rentDisabled" style="width:70px;" v-model.trim="form.rentPrice" title="上限6位数" maxLength="9" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-1" style="" >
                    <el-form-item  prop="rentPriceUnit" >
                      <el-select :disabled="rentDisabled" v-model="form.rentPriceUnit"    style="width:68px;" >
                        <el-option v-for="item in rentPriceParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left " style="padding-left:3px;" >
                    <el-form-item  prop="rentPriceArea" >
                      <el-input  disabled="true" style="width:70px;" v-model.trim="form.rentPriceArea" title="上限10位数" maxLength="10" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                  <div class="left  "  style="padding-left:2px;" >
                    <span class="remark-word" >/㎡</span>
                  </div>
                  <div class="left  padding-r-2"  style="padding-left:27px;" >
                    <span class="word" >税费</span>
                  </div>
                  <div class="left padding-r-1" style="" >
                    <el-form-item  prop="roomTaxTypeId" >
                      <el-select v-model="form.roomTaxTypeId"    style="width:72px;" >
                        <el-option v-for="item in roomTaxTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-1" style="" >
                    <el-form-item  prop="roomTax" >
                      <el-input  @input="checkNum4" style="width:92px;" v-model.trim="form.roomTax" title="上限10位数" maxLength="10" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>


                </div>
                <div class="clear" >
                  <div class="left  padding-r-2" style="padding-left:12px;width:46px;text-align:right;" >
                    <span class="word greent-word" >注</span>
                  </div>
                  <div class="left clear " style="margin-top:3px;" >
                      <el-form-item style="width:180px;" >
                        <CheckSelect :selectId="commTypes1" :listData="commTypesParams" style="width:180px;" ></CheckSelect>
                      </el-form-item>
                       <el-form-item style="width:180px;" >
                        <CheckSelect :selectId="commTypes1" :listData="commTypesParams" style="width:180px;" ></CheckSelect>
                      </el-form-item>
                  </div>
                  <div class="left  padding-r-2"  style="padding-left:18px;" >
                    <span class="word" >尾款</span>
                  </div>
                  <div class="left padding-r-1" style="" >
                    <el-form-item  prop="restPriceId" >
                      <el-select v-model="form.restPriceId"    style="width:68px;" >
                        <el-option v-for="item in restPriceIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2 "  style="padding-left:4px;" >
                    <span class="word" >动机</span>
                  </div>
                  <div class="left padding-r-1" style="" >
                    <el-form-item  prop="motiveId" >
                      <el-select v-model="form.motiveId"    style="width:68px;" >
                        <el-option v-for="item in motiveIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left  " style="" >
                    <div class="clear" >

                    </div>
                    <div class="clear" >
                      <div class="left padding-r-2 "  style="padding-left:21px;" >
                        <i @click="showRepeatRentPage" class="repeat-icon" ></i>
                      </div>
                      <div class="left padding-r-1" style="" >
                        <el-form-item  prop="repeatHouseId" >
                          <el-select v-model="form.repeatHouseId"    style="width:167px;" >
                            <el-option v-for="item in repeatParams"  :label="item.name" :value="item.id" ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>

                    </div>

                  </div>
                </div>
                <div class="break" >

                </div>
                <div class="clear" >
                  <div class="left" >
                    <div class="clear" >
                      <div class="left  padding-r-2"  style="padding-left:13px;" >
                        <span class="word require-word" >业主</span>
                      </div>
                      <div class="left padding-r-1" style="" >
                        <el-form-item  prop="ownerName" >
                          <el-input @input="checkOwnerName" title="上限50个字，数字/字母/汉字" maxlength="50"  v-model="form.ownerName" style="width:75px;" ></el-input>
                        </el-form-item>
                      </div>
                      <div class="clear left" style="padding-left:9px;" >
                        <div class="left padding-r-2 "  style="" >
                          <span class="word" >{{nativeName}}</span>
                        </div>
                        <div class="left padding-r-1" style="" >
                          <el-form-item  prop="nationalId" >
                            <el-select v-model="form.nationalId"    style="width:75px;" >
                              <el-option v-for="item in nationalIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                    <div class="clear" >
                      <div class="left padding-r-2 "  style="padding-left:7px;" >
                        <span class="word" >联系人</span>
                      </div>
                      <div class="left padding-r-2" style="padding-top:2px;" >

                           <textarea
                             type="textarea"
                             style="width:185px;height:90px;"
                             maxLength="50"
                             title="上限50个字"
                             class="remark"
                             v-model="form.contactor">
                           </textarea>
                      </div>
                    </div>
                    <div class="clear" >
                      <div class="left  padding-r-2" style="width:45px;text-align:right;" >
                        <span class="word" >证件</span>
                      </div>
                      <div class="left padding-r-1" >
                        <el-form-item  prop="certificateTypeId" >
                          <el-select v-model="form.certificateTypeId"    style="width:115px;" >
                            <el-option v-for="item in certificateTypeIdParams"  :label="item.name" :value="item.id" ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="left padding-r-1" style="" >
                        <el-form-item  prop="roomCertificate" >
                          <el-select placeholder=""  v-model="form.roomCertificate"    style="width:70px;" >
                            <el-option v-for="item in premisesParams"  :label="item.name" :value="item.id" ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear" >
                       <div class="left padding-r-1" style="padding-left:45px;" >
                        <el-form-item  prop="roomCertText" >
                          <el-input maxLength="20" title="上限20个字" v-model="form.roomCertText"  style="width:185px;" ></el-input>
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
                           <textarea
                             style="width:204px;height:145px;"
                             type="textarea"
                             height="60px"
                             maxLength="100"
                             title="上限100个字"
                             class="remark"
                             v-model="form.contactInfo">
                           </textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="left right-content" >
                <div class="clear padding-t-6" >
                  
                  <div class="left  padding-r-2" style="width:35px;text-align:right;" >
                    <span class="word" >现状</span>
                  </div>
                  <div class="left padding-r-1" >
                    <el-form-item  prop="roomStateId" >
                      <el-select v-model="form.roomStateId"    style="width:80px;" >
                        <el-option v-for="item in roomStateIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left  padding-r-2" style="padding-left:22px;" >
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
                  <div class="left  padding-r-2" style="width:35px;text-align:right;" >
                    <span class="word" >付款1</span>
                  </div>
                  <div class="left padding-r-1" >
                    <el-form-item  prop="roomStateId" >
                      <el-select v-model="form.roomStateId"    style="width:80px;" >
                        <el-option v-for="item in roomStateIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left  padding-r-2" style="padding-left:22px;" >
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
                  <div class="left  padding-r-2" style="width:35px;text-align:right;" >
                    <span :class="{'word':true,'require-word':checkHouseValue3 == 'true'}" >装修</span>
                  </div>

                  <div class="left padding-r-1" >
                    <el-form-item  prop="decorateId" >
                      <el-select v-model="form.decorateId"    style="width:80px;" >
                        <el-option v-for="item in decorateIdParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left  padding-r-2" style="padding-left:22px;" >
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
                  <div class="left  padding-r-2" style="width:35px;text-align:right;" >
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
                    <span class="word" >:0把</span>
                  </div>
                </div>
                <div class="break" >
                </div>
                <div class="clear padding-t-10"  >
                  <div class="left  padding-r-2" style="padding-left:10px;" >
                    <span class="word" >备注</span>
                  </div>
                  <div class="left">
                      <textarea
                        type="textarea"
                        style="width:210px;height:100px;"
                        maxLength="300"
                        title="上限300个字"
                        class="remark"
                        v-model="form.remark">
                      </textarea>
                  </div>
                </div>
                <div class="clear " >
                  <div class="left  padding-r-2" style="padding-left:5px;" >
                    <span class="word" >{{peopleName1}}</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="depart1" >
                      <el-select placeholder=""  @change="findUserByDepart(1)"  v-model="form.depart1"    style="width:100px;" >
                        <el-option  v-for="item in departTree"  :label="item.name" :value="item.id" >
                          <span test  :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" @click="valueChange(item)" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-1" >
                    <el-form-item  prop="empId1" >
                      <el-select placeholder=""    v-model="form.empId1"    style="width:100px;" >
                        
                        <el-option v-for="item in userList1"  :label="item.name" :value="item.id"  :class="{'leave-user':item.stateUser == 1}" >{{item.name}}</el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear " >
                  <div class="left  padding-r-2" style="padding-left:5px;" >
                    <span class="word" >{{peopleName2}}</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="depart2" >
                      <el-select placeholder=""  @change="findUserByDepart(2)" v-model="form.depart2"    style="width:100px;" >
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
                        <el-option v-for="item in userList2"  :label="item.name" :value="item.id"  :class="{'leave-user':item.stateUser == 1}" >{{item.name}}</el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear " >
                  <div class="left  padding-r-2" style="padding-left:5px;" >
                    <span class="word" >{{peopleName3}}</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="depart3" >
                      <el-select placeholder="" @change="findUserByDepart(3)" v-model="form.depart3"    style="width:100px;" >
                        <el-option   v-for="item in departTree"  :label="item.name" :value="item.id" >
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
                        <el-option v-for="item in userList3"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" >{{item.name}}</el-option>
                      </el-select>
                    </el-form-item>
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

  import {findbyId,findBuildingByWord,findBuildingListByAreaId,pedestalList,findUnitBySeartId,findSeatHouseNum} from '../../../service/getData'
  import {rentConstParam} from '../../../utils/rentParam'
  import {rentParam,rentNewAdd} from '../../../service/houseData'
  import {findUserByDepartId} from "../../../service/organizeDate";
  // 编辑楼盘字段
  import EditorBuildingPage from '../../system/building/editorBuilding'
  // 新增楼盘字段
  import NewBuildingPage from '../../system/building/newBuilding'
  import TreeSelect from './tree'
  import RepeatRentPage from './repeatRent'
  import EditorRentPage from './editorRent'
  import CheckSelect from "../../../components/checkSpecial1";
  let streetId = null;
  let repeatName = null;

  export default {
    props:["layerid"],
    data() {
      return {
        dialogFormVisible:this.newRentVisible,
        buildingShowEdiotrValue:false,
        buildingShowValue:false,
        repeatRent:false,
        loading:false,
        select:'select',
        clickStreet:'',
        name:'',
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
        currentBuilding:null,
        currentSeat:null,
        currentUnit:null,
        currentHouseNum:null,
        floorDisabled:false,
        floorCurrentDisabled:false,

        saleDisabled:false,
        rentDisabled:true,
        commTypes1:"commTypes1",
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
        form: {
          id:"",
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
          roomShape1:'',
          roomShape2:'',
          roomShape3:'',
          roomShape4:'',
          roomShapeId:"0",
          roomDirectionId:"0",
          num:"",
          numId:'',
          roomTotalArea:'0.00',
          roomInnerArea:'0.00',
          roomTypeId:"0",
          roomUseId:"0",
          buildingYear:"0",
          source:"0",
          roomType:1,
          roomSaleStateId:"0",
          roomProperty1:"0",
          roomProperty2:"0",
          roomProperty3:"0",
          roomDelegateDate:'',
          salePrice:'0.00',
          salePriceUnit:'万元',
          salePriceArea:'0.00',
          roomTax:"0.00",
          roomTaxTypeId:"0",
          rentPrice:'0.00',
          rentPriceUnit:'',
          rentPriceArea:'0.00',
          restPriceId:"0",
          commTypesStr:'',
          roomDelegateNum:'',
          motiveId:"0",
          repeatHouseId:"",
          repeatIdsStr:'',
          ownerName:'',
          ownerPhone:'',
          contactor:'',
          roomCertText:"",
          roomCertificate:'',
          nationalId:"0",
          contactInfo:"",
          certificateTypeId:"0",
          housePropertyId:"0",
          roomStateId:"0",
          paymentId:"0",
          decorateId:"0",
          commissionId:"0",
          keysId:"0",
          remark:'',
          depart1:'',
          depart2:'',
          depart3:'',
          empId1:"",
          empId2:"",
          empId3:"",
          createBy:'aaa',
        },

        formLabelWidth: '78px'
      };
    },
    components:{
      EditorBuildingPage,
      NewBuildingPage,
      TreeSelect,
      RepeatRentPage,
      CheckSelect
    },
    methods:{
      checkOwnerName(){
        this.form.ownerName= this.form.ownerName.replace(/[^a-zA-Z\u4e00-\u9fa5]/g,'');
      },
      checkPhone(){
        this.form.ownerPhone= this.form.ownerPhone.replace(/[^\d]/g,'');
      },
      checkNum1(){
        this.form.seat= this.form.seat.replace(/[^\.\d]/g,'');
        this.form.seat= this.form.seat.replace('.','');
      },
      checkNum2(){

      },
      checkNum3(){
        this.form.roomId= this.form.roomId.replace(/[^\.\d]/g,'');
        this.form.roomId= this.form.roomId.replace('.','');
      },
      checkNum4(){
        this.form.roomTax= this.form.roomTax.replace(/[^\.\d]/g,'');
        this.form.roomTax= this.form.roomTax.replace('.','');
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
        this.form.salePrice= this.form.salePrice.replace(/[^\.\d]/g,'');

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
        this.form.rentPrice= this.form.rentPrice.replace(/[^\.\d]/g,'');

        let roomTotalArea = this.form.roomTotalArea;
        let rentPrice = this.form.rentPrice;
        let rentPriceArea = this.form.rentPriceArea;
        if(roomTotalArea == '' || roomTotalArea == '0.0' || roomTotalArea*1 == 0 ) {
          this.form.rentPriceArea = '';
        }else  if( roomTotalArea && rentPrice){
          this.form.rentPriceArea = ((rentPrice*1) / (roomTotalArea*1) ).toFixed(2);
        }else{
          this.form.rentPriceArea = "";
        }
      },
      newRent(){

        

        this.getRentParam();
      },
      //获取参数
      getRentParam(){

        let _this = this;
        rentParam().then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{id:"0",name:" "}];

            _this.areas = data.areas;
            if(data.areas && data.areas.length != 0){
              _this.form.districtId = data.areas[0].id;
            }


            if(data.areas){

              let arr = data.areas;
              arr.forEach(function(item){
                if(item.name == "津南"){
                  _this.form.districtId = item.id;
                }
              })
            }
            let streetArr = data.defaultStreetList;
            let specialArr = [{id:"-1",label:"全部"}];
            if(streetArr && streetArr.length != 0){
              streetArr.forEach(function(item){
                item.label = item.name;
              })
              _this.streetArr = specialArr.concat(streetArr);
            }


            if(data.roomShapeParams){
              _this.roomShapeParams = initArr.concat(data.roomShapeParams);
            }
            if(data.roomDirectionParams){
              _this.roomDirectionParams = initArr.concat(data.roomDirectionParams);
            }

            //类型
            if(data.roomTypeIdParams){
              _this.roomTypeIdParams = initArr.concat(data.roomTypeIdParams);
              if(data.roomTypeIdParams.length != 0) {
                _this.form.roomTypeId = data.roomTypeIdParams[0].id;
              }
            }
            //用途
            if(data.roomUseParams){
              _this.roomUseParams = initArr.concat(data.roomUseParams);
              if(data.roomUseParams.length != 0) {
                _this.form.roomUseId = data.roomUseParams[0].id;
              }
            }
            //建年
            _this.yearParams = initArr.concat(rentConstParam.yearParams);
            //来源
            if(data.sourceParams){
              _this.sourceParams = initArr.concat(data.sourceParams);
            }
            if(data.numParams){
              _this.numParams = [{id:'',name:''}].concat(data.numParams);
            }
            //状态
            if(data.roomSaleStateIdParams){
              _this.roomSaleStateIdParams = data.roomSaleStateIdParams;
              
              if(data.roomSaleStateIdParams.length != 0){
                data.roomSaleStateIdParams.forEach(item => {
                  if(item.name == '有效'){
                    _this.form.roomSaleStateId = item.id;
                  }  
                })
              }
              
            }
            //盘制
            if(data.roomProperty1Params){
              _this.roomProperty1Params = data.roomProperty1Params;
              if(data.roomProperty1Params.length != 0){
                data.roomProperty1Params.forEach(item => {
                  if(item.name == '私盘'){
                    _this.form.roomProperty1 = item.id;
                  }  
                })
              }
            }
            //房源分类
            if(data.roomProperty2Params){
              _this.roomProperty2Params = data.roomProperty2Params;
              if(data.roomProperty2Params.length != 0){
                data.roomProperty2Params.forEach(item => {
                  if(item.name == '常态'){
                    _this.form.roomProperty2 = item.id;
                  }  
                })
              }
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
              let arr = data.nationalIdParams;
              arr.forEach(function(item){
                if(item.name == "中国"){
                  _this.form.nationalId = item.id;
                }
              })
            }
            if(data.departTree){
              let arr = [];
              let treeData = data.departTree
              for(let i = 0 ; i < treeData.length; i++){
                arr.push({
                  id:treeData[i].id,
                  name:treeData[i].label.replace(/&nbsp;/g,""),
                  level:treeData[i].level,
                  state:treeData[i].state,
                })
              }
              _this.departTree = arr;
              try {
                let defaultUserId = data.defaultUserId;
                let defaultDeptId = data.defaultDepartId;
                let defaultUserList = data.defaultUserList;

               
                if(defaultDeptId != -1){
                  _this.userList1 = defaultUserList;
                  _this.form.empId1 = defaultUserId;
                  _this.form.depart1 = defaultDeptId;
                }
               
              }catch(e){

              }

              let systemSet = response.data.systemSet;
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


              if(privateHouse == "true"){
                let arr = _this.roomProperty1Params;
                arr.forEach(function(item){
                  if(item.name == "私盘"){
                    _this.form.roomProperty1 = item.id;
                  }
                })
              }
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

            }

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
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
        }

        if( id != ''){
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
        this.form.floorAmount = item.pliesNumber;
        this.floorDisabled = true;
      },
      //单元
      getUnitListData(queryString, cb){
        let _this = this;
        let seatId = '';
        let id = "";
        if(_this.currentSeat){
          id = _this.currentSeat.id;
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
        if(seatId) {
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
        }else{
          cb([]);
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
              content: EditorBuildingPage, //传递的组件���象
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
        if(check){
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
        }
      },

      showRepeatRentPage(){
        let _this = this;
        let repeat = this.repeatParams;
        let id = this.form.id;
        let test = _this.$layer.iframe({
          content: {
            content: RepeatRentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:id,repeat:repeat}//props
          },
          area:['600px','450px'],
          title: "选择房源",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },

      findUserByDepart(value){
        let _this = this;
        let id = null;
        let userList = "";
        if(value == 1){
          id = this.form.depart1;
          userList = "userList1";
        }else if(value == 2){
          id = this.form.depart2;
          userList = "userList2";
        }else if(value == 3){
          id = this.form.depart3;
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
              _this.form["empId"+value] = ' ';
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
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
        if(districtId == '' || streetId == '-1' ){
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
        if(checkHouseValue1 == 'true' && seat == ''){
         this.myAlert("栋座为空！",'dangerous-icon');
        }
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
        
        if(currentBuilding && roomId != "") {
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
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form)) ;
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
        rentNewAdd(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.dialogFormVisible = false;
            _this.myConfirm("房源记录保存成功！", 'question-icon','是','否','继续添加新的【房源】记录？').then(res => {

              _this.$parent.reloadRentList(2);
              _this.cancelData();
            }).catch(err => {
              _this.$parent.reloadRentList(1);
               _this.cancelData();
            })
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangouser-icon');
          }
        })
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
      saveSuccess(){
        var _this = this;
        _this.$parent.newRent();

      },
      getStreetId(value){
        streetId = value;
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
      getNameByIdFromList(list,id,type){
        let name = "";
        list.forEach(function(item){
          if(item.id == id){
            name = item[type];
          }
        })
        return name ;
      },
      //恢复初始数据
      clearFormData(formRule){
        this.$refs.formsData.resetFields();
        this.form.roomType = 1;
        this.saleDisabled = false;
        this.rentDisabled = true;
        this.dialogFormVisible = false;
        this.form.areaVillage = "";
        this.form.areaVillageId = "";
      },

    },
    mounted(){
      this.newRent();
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
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
    },
  }
</script>

<style lang="scss" scoped>
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
    top:6px;
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

  .rent-icon{
    background:url(../../../images/icon3.png) -102px -14px;
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
    height:290px;
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
    height:290px;
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
    width:69px;
    text-align:center;
  }
  .word-zc{
    width:69px;
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
    line-height:27px;
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
  /deep/ .el-textarea__inner{
    padding:5px;
    font-size:12px;
    border:1px solid #aaa;
  }

</style>
<style lang="scss">
  .special-select-color  .el-input__inner{
    color:#088383;
  }
</style>
