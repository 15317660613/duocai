<template>

    <div class="pop-up" style="width:100%;margin:0 10px;" >
      <div class="pop-up-container " >
        <div class="move-content" >
          <el-form ref="formsData"  :model="form">
            <div class="clear top-word"  >
              <div class="left word-q" style="" >
                <span class=" remark-word"  >区县</span>
              </div>
              <div class="left word-j" style="" >
                <span class=" remark-word"  >街镇</span>
              </div>
              <div class="left word-build clear" style="padding-left:25px;" >
                <span class=" remark-word left" >项目名称</span>
                <i class="project-icon left" @click="showCheckProject" ></i>
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
              <div class="left  padding-r-2" style="width:40px;text-align:right;" >
                <span class="word require-word" >地址</span>
              </div>
              <div class="left padding-r-2" >
                <el-form-item  prop="districtId" >
                  <el-select @change="findStreeByTown" v-model="form.districtId"  placeholder=""  style="width:92px;" >
                    <el-option v-for="item in areas"  :label="item.label" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <el-form-item  prop="streetId" >
                  <el-select v-model="form.streetId" @change="changeByStreet" placeholder=""   style="width:112px;" >
                    <el-option  v-for="item in streetArr" :label="item.label" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <el-form-item  prop="projectName" >
                  <el-autocomplete title="上限30个字" @select="getSelectBuilding" :maxlength="30" :fetch-suggestions="querySearchAsync" style="width:127px;" v-model.trim="form.projectName"  autocomplete="off"></el-autocomplete>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <el-form-item  prop="buildingName" >
                  <el-autocomplete   @select="getSelectSeat" :maxlength="4"  title="上限4字符"   :fetch-suggestions="getPedestalListData" style="width:81px;" v-model.trim="form.buildingName" autocomplete="off"></el-autocomplete>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <el-form-item  prop="buildingsUnitName" >
                  <el-autocomplete @select="getSelectUnit" :maxlength="4"  title="上限4字符"  :fetch-suggestions="getUnitListData" style="width:73px;" v-model.trim="form.buildingsUnitName"   autocomplete="off"></el-autocomplete>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <el-form-item  prop="buildingsUfloorName" >
                  <el-autocomplete  @select="getSelectHouse" @blur="checkHouuseNum" :maxlength="5" title="上限5字符"   :fetch-suggestions="getHouseListData" style="width:73px;" v-model.trim="form.buildingsUfloorName"    ></el-autocomplete>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <el-form-item  prop="floorCurrent" >
                  <el-input @input="checkFloowNum1"  title="上限4位数" :maxlength="4"  style="width:58px;" v-model.trim="form.floorCurrent"  autocomplete="off"></el-input>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <el-form-item  prop="floorAmount" >
                  <el-input @input="checkFloowNum2"  title="上限4位数" :maxlength="4"   style="width:63px;" v-model.trim="form.floorAmount"  autocomplete="off"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="clear" >
              <div class="left padding-r-2" style="width:40px;text-align:right;" >
                <span class="word" >户型</span>
              </div>
              <div class="left padding-r-2" >
                <el-form-item prop="room" >
                  <el-select v-model="form.room"  :disabled="isSchool"  placeholder=""    style="width:80px;" >
                    <el-option v-for="item in rentSelect.houses"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                  <span class="word" >房</span>
                </el-form-item>

              </div>
              <div class="left padding-r-2" >
                <el-form-item prop="hall" >
                  <el-select v-model="form.hall" :disabled="isSchool"  placeholder=""    style="width:80px;" >
                    <el-option v-for="item in rentSelect.houses"   :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                  <span class="word" >厅</span>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <el-form-item prop="wei" >
                  <el-select v-model="form.wei" :disabled="isSchool"   placeholder=""   style="width:80px;" >
                    <el-option v-for="item in rentSelect.houses"   :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                  <span class="word" >卫</span>
                </el-form-item>
              </div>
              <div class="left padding-r-2" >
                <el-form-item prop="balcony" >
                  <el-select v-model="form.balcony" :disabled="isSchool"  placeholder=""    style="width:80px;" >
                    <el-option v-for="item in rentSelect.houses"   :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                  <span class="word" >阳台</span>
                </el-form-item>
              </div>
              <div class="left padding-r-2" style="width:50px;text-align:right;" >
                <span class="word " >用途</span>
              </div>
              <div class="left" >
                <el-form-item prop="roomUseId" >
                  <el-select v-model="form.roomUseId" :disabled="isSchool"      style="width:80px;" >
                    <el-option v-for="item in purposes"   :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2"  style="width:60px;text-align:right;" >
                <span class="word" >项目编号</span>
              </div>
              <div class="left">
                <el-form-item prop="ItemNumber" >
                  <el-input :disabled="true" v-model="form.ItemNumber" placeholder="[自动编号]" style="width:100px"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="clear" >
              <div class="left padding-r-2" style="width:40px;text-align:right;" >
                <span class="word" >面积</span>
              </div>
              <div class="left" >
                <el-form-item prop="buildArea" >
                  <el-input
                    @input="checkNum1"
                    v-model="form.buildArea"
                    title="上限10位数"
                    :maxlength="13"
                    style="width:105px"
                  ></el-input>
                  <span>m²</span>
                </el-form-item>
              </div>
              <div class="left padding-r-2"  style="width:40px;text-align:right;" >
                <span class="word" >套内</span>
              </div>
              <div class="left" >
                <el-form-item prop="inArea" >
                  <el-input
                    title="上限10位数"
                    :maxlength="13"
                    @input="checkNum2"
                    v-model="form.inArea"
                    style="width:105px"
                  ></el-input>
                  <span>m²</span>
                </el-form-item>
              </div>
              <div class="left padding-r-2" style="width:40px;text-align:right;" >
                <span class="word" >朝向</span>
              </div>
              <div class="left" >
                <el-form-item prop="orientation" >
                  <el-select v-model="form.orientation" :disabled="isSchool"  placeholder=""    style="width:80px;" >
                    <el-option v-for="item in Orientations"   :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="left padding-r-2" style="width:45px;text-align:right;" >
                <span class="word" >状态</span>
              </div>
              <div class="left" >
                <el-form-item prop="roomStateId" >
                  <el-select v-model="form.roomStateId" :disabled="isSchool"      style="width:80px;" >
                    <el-option v-for="item in roomStateIdParams"   :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

            </div>
            <div class="break"></div>

            <div class="contents">
              <div class="left_content side">
                <div class=" clear">
                  <div class="left padding-r-2" style="width:65px;text-align:right;" >
                    <span class="word" >客源编号</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="PassengerNumber" >
                      <el-input :disabled="true" v-model="form.PassengerNumber"   style="width:100px;"></el-input>
                    </el-form-item>
                  </div>
                  <div class="left" >
                    <i @click="showCheckCustomer" class="customer-icon" ></i>
                  </div>
                  <div class="left padding-r-2" style="width:47px;text-align:right;" >
                    <span class="word  require-word" >客户</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="customerName" >
                      <el-input :disabled="true" v-model="form.customerName" title="上限50个字" style="width:130px;"   :maxlength="50"></el-input>
                    </el-form-item>
                  </div>

                </div>
                <div class=" clear">

                  <div class="left padding-r-2" style="width:65px;text-align:right;" >
                    <span class="word" >报备编号</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="NewspaperNumber" >
                      <el-input :disabled="true" v-model="form.NewspaperNumber" title="[自动编号]" style="width:130px;"></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" style="width:42px;text-align:right;" >
                    <span class="word" >手机</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="phone" >
                      <el-input :disabled="true"  v-model="form.phone" title="上限15位数" style="width:130px;"   :maxlength="15"></el-input>
                    </el-form-item>
                  </div>

                </div>

                <div class=" clear">

                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >身份证</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="idCard" >
                      <el-input :disabled="true" v-model="form.idCard" title="上限18个字符" style="width:302px;"   :maxlength="18"></el-input>
                    </el-form-item>
                  </div>

                </div>
                <div class=" clear">

                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >现住址</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="Newaddress" >
                      <el-input :disabled="true" v-model="form.Newaddress" title="上限50个字" style="width:300px;"   :maxlength="50"></el-input>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear " >
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >成交部门1</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="dealDept1Id" >
                      <el-select @change="findUserByDepart(1)"  v-model="form.dealDept1Id"  placeholder=""  style="width:130px;" >
                        <el-option  v-for="item in departTree"  :label="item.name" :value="item.id" >
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" @click="valueChange(item)" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  style="width:38px;text-align:right;" >
                    <span class="word" >{{userName1}}</span>
                  </div>
                  <div class="left padding-r-1" >
                    <el-form-item  prop="dealEmp1Id" >
                      <el-select   v-model="form.dealEmp1Id"  placeholder=""  style="width:130px;" >
                        <el-option v-for="item in userList1"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear " >
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >成交部门2</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="dealDept2Id" >
                      <el-select @change="findUserByDepart(2)" v-model="form.dealDept2Id" placeholder=""   style="width:130px;" >
                        <el-option v-for="item in departTree"  :label="item.name" :value="item.id" >
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" @click="valueChange(item)" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  style="width:38px;text-align:right;" >
                    <span class="word" >{{userName2}}</span>
                  </div>
                  <div class="left padding-r-1" >
                    <el-form-item  prop="dealEmp2Id" >
                      <el-select   v-model="form.dealEmp2Id"  placeholder=""  style="width:130px;" >
                        <el-option v-for="item in userList2"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear " >
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >成交部门3</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="dealDept3Id" >
                      <el-select @change="findUserByDepart(3)" v-model="form.dealDept3Id" placeholder=""   style="width:130px;" >
                        <el-option v-for="item in departTree"  :label="item.name" :value="item.id" >
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" @click="valueChange(item)" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  style="width:38px;text-align:right;" >
                    <span class="word" >{{userName3}}</span>
                  </div>
                  <div class="left padding-r-1" >
                    <el-form-item  prop="dealEmp3Id" >
                      <el-select v-model="form.dealEmp3Id"  placeholder=""  style="width:130px;" >
                        <el-option v-for="item in userList3"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div class="right_content">
                <div class="Information">
                  无产权信息
                </div>
              </div>
            </div>


            <div class="break"></div>

            <div class="contents">
              <div class="left_content side">
                <div class="clear">
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >认筹日期</span>
                  </div>
                  <div class="left" >
                    <el-form-item label="" label-width="0" prop="prebuyDate">
                      <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd"     v-model="form.prebuyDate" style="width: 100px;"></el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  style="width:81px;text-align:right;" >
                    <span class="word" >认筹金</span>
                  </div>
                  <div class="left text-input" >
                    <el-form-item prop="prebuyPrice" >
                      <el-input @input="checkNum3" title="上限10位数"
                                :maxlength="13" v-model="form.prebuyPrice"  style="width:110px;"  ></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear">
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >认购总价</span>
                  </div>
                  <div class="left text-input" >
                    <el-form-item prop="prebuyAmount" >
                      <el-input @input="checkNum4" title="上限10位数"
                                :maxlength="13" v-model="form.prebuyAmount"  style="width:110px;"  ></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  style="width:55px;text-align:right;" >
                    <span class="word" >代理佣金</span>
                  </div>
                  <div class="left text-input" >
                    <el-form-item prop="delegatePrice" >
                      <el-input @input="checkNum5"  title="上限10位数"
                                :maxlength="13" v-model="form.delegatePrice"  style="width:110px;"  ></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear">
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >折扣描述</span>
                  </div>
                  <div class="left" style="padding-top:5px;" >
                    <el-form-item prop="discountDesc1" >
                      <textarea title="上限300个字"
                                :maxlength="300" class="remark" v-model="form.discountDesc1"  style="width:282px;height:68px;" type="textarea" min-height="108px"></textarea>
                    </el-form-item>
                  </div>
                </div>

              </div>
              <div class="right_contents">
                <div class="clear">
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >认购编号</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="prepurchaseNum" >
                      <el-input :disabled="true" v-model="form.prepurchaseNum"  style="width:90px;"   placeholder="[自动编号]" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  style="width:81px;text-align:right;" >
                    <span class="word" >认购日期</span>
                  </div>
                  <div class="left" >
                    <el-form-item label="" label-width="0" prop="prepurchaseDate">
                      <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd"  default-value v-model="form.prepurchaseDate" style="width: 110px;"></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear">
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word">认购定金</span>
                  </div>
                  <div class="left text-input" >
                    <el-form-item prop="prepurchasePay" >
                      <el-input @input="checkNum6" title="上限10位数"
                                :maxlength="13" v-model="form.prepurchasePay"  style="width:90px;"   ></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word">预交首付</span>
                  </div>
                  <div class="left text-input" >
                    <el-form-item label="" label-width="0" prop="firstAmount">
                      <el-input @input="checkNum7" title="上限10位数"
                                :maxlength="13" v-model="form.firstAmount"  style="width:110px;"  ></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear">
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >付款方式</span>
                  </div>
                  <div class="left" >
                    <el-form-item prop="payWayId" >
                      <el-select v-model="form.payWayId" :disabled="isSchool"      style="width:90px;" >
                        <el-option v-for="item in PaymentMethods"   :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2"  style="width:81px;text-align:right;" >
                    <span class="word" >成交总价</span>
                  </div>
                  <div class="left text-input" >
                    <el-form-item label="" label-width="0">
                      <el-input @input="checkNum8"  title="上限10位数"
                                :maxlength="13" v-model="form.totalPrice"  style="width:110px;"  ></el-input>
                      <span>元</span>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear">
                  <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                    <span class="word" >折扣描述</span>
                  </div>
                  <div class="left" style="padding-top:5px;" >
                    <el-form-item prop="discountDesc2" >
                      <textarea title="上限300个字"
                                :maxlength="300" class="remark" v-model="form.discountDesc2"  style="width:280px;" type="textarea" min-height="111px"></textarea>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>

          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
        <span class="right save-cancel-btn"  @click="cancelData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="saveFormData">保 存</span>
      </div>
    </div>


</template>

<script>
  import {rentParam} from "../../../service/houseData";
  import {rentConstParam} from "../../../utils/rentParam";
  import {findbyId} from '../../../service/getData'
  import {newHouseList,pedestalList,findUnitBySeartId,findSeatHouseNum} from '../../../service/newHouse'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {addIdentifyChips,identifyChipsParams,getInitIdentifyChipsParams} from "../../../service/salesControl";
  import CheckProjectPage from './checkProject'
  import CheckCustomerPage from './checkCustomer'

  export default {

    props:["dialogNewIdentify",'layerid','houseNumId'],
    data(){
      return{
        isShow:this.dialogNewIdentify,
        checkProjectValue:false,
        checkCustomerValue:false,
        halls:[],
        states:[],
        options:[],
        purposes:[],
        balconys:[],
        Orientations:[],
        defences:[],
        isSchool:false,
        houses:[],
        restaurants: [],
        state: '',
        timeout:  null,
        isBuilding:false,
        Transactions:[],
        Transactions2:[],
        Transactions3:[],
        userList1:[],
        userList2:[],
        userList3:[],
        departTree:[],
        PaymentMethods:[],
        streetTowns:[],
        areas:[],
        roomStateIdParams:[],
        currentBuilding:null,
        currentSeat:null,
        currentUnit:null,
        currentHouseNum:null,
        rentSelect:rentConstParam,
        streetArr:[{id:"-1",label:"全部"}],
        userName1:'人员1',
        userName2:'人员2',
        userName3:'人员3',
        form: {
          roomNum:"",

          districtId:'',//区县
          streetId:"",//街镇
          projectId:"", //项目名称
          projectName:"",
          buildingId:"",//栋座
          buildingName:"",
          buildingsUnitId:"", //单元
          buildingsUnitName:"",
          buildingsUfloorId:"", //房号
          buildingsUfloorName:"",
          floorCurrent:"",//楼层
          floorAmount:"", //总楼层
          PassengerNumber:"",//客源编号
          buildArea:"",//面积
          inArea:"",//套内
          phone:"",//手机
          idCard:"",//身份证
          Newaddress:"", //现住址
          room:"",//房
          hall:"",//厅
          wei:"",//卫
          balcony:"",//阳台
          roomUseId:"",//用途
          ItemNumber:"",//项目编号
          orientation:"",//朝向
          roomStateId:"667844511615299584",//状态
          customerId:"",//客户
          customerName:"",
          NewspaperNumber:"",// 报备编号
          prebuyDate:"",// 日期
          dealDept1Id:"",//成交部门1
          dealDept2Id:"",//成交部门2
          dealDept3Id:"",//成交部门3
          dealEmp1Id:"",//人员1
          dealEmp2Id:"",//人员2
          dealEmp3Id:"",//人员3
          prebuyPrice:"0.00",//认筹金
          prebuyAmount:'0.00',//认筹总价
          delegatePrice:"0.00",//代理佣金
          discountDesc1:"",//折扣描述
          prepurchaseNum:"",//  认购编号
          prepurchaseDate:"",//认购日期
          prepurchasePay:"0.00",//认购定金
          firstAmount:"0.00",//预交首付
          payWayId:"",//付款方式
          totalPrice:"0.00",//成交总价
          discountDesc2:"",//折扣描述2
        },
      }
    },
    components: {
      CheckProjectPage,
      CheckCustomerPage,
    },
    methods:{
      checkNum1(){
        this.form.buildArea= this.form.buildArea.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.inArea= this.form.inArea.replace(/[^\.\d]/g,'');
      },
      checkNum3(){
        this.form.prebuyPrice= this.form.prebuyPrice.replace(/[^\.\d]/g,'');
      },
      checkNum4(){
        this.form.prebuyAmount= this.form.prebuyAmount.replace(/[^\.\d]/g,'');
      },
      checkNum5(){
        this.form.delegatePrice= this.form.delegatePrice.replace(/[^\.\d]/g,'');
      },
      checkNum6(){
        this.form.prepurchasePay= this.form.prepurchasePay.replace(/[^\.\d]/g,'');
      },
      checkNum7(){
        this.form.firstAmount= this.form.firstAmount.replace(/[^\.\d]/g,'');
      },
      checkNum8(){
        this.form.totalPrice= this.form.totalPrice.replace(/[^\.\d]/g,'');
      },
      checkHouuseNum(){
        
      },
      showCheckProject(){
        let _this = this;
        let districtId = this.form.districtId;
        let streetId = this.form.streetId;
        let projectId = this.form.projectId;
        let customerId = this.form.customerId;
        let test = _this.$layer.iframe({
          content: {
            content: CheckProjectPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{'districtId':districtId,'streetId':streetId,'projectIdParent':projectId,"customerId":customerId}//props
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

      setCheckData(projectId,elem){
        let districtId = elem.districtId;
        let streetId = elem.streetId;
        this.form.projectId = projectId;
        this.form.projectName = elem.projectName;//项目名称
        if(districtId){
          this.form.districtId = districtId;
          this.findStreeByTown(districtId,true);
        }
        if(streetId){
          this.form.streetId = streetId;
        }
      },
      showCheckCustomer(){
          let _this = this;
          let customerId = this.form.customerId;
          let projectId = this.form.projectId;
          let test = _this.$layer.iframe({
            content: {
              content: CheckCustomerPage, //传递的组件对象
              parent: this,//当前的vue对象
              data:{customerIdParent:customerId,projectId:projectId}//props
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
      setCheckCustomerData(customerId,elem){
        this.form.customerId = customerId;
       // PassengerNumber:""//客源编号
       debugger;
        this.form.PassengerNumber = elem.customerCode;
        this.form.idCard = elem.idCard;
        this.form.Newaddress = elem.currentAddress;
        this.form.customerName = elem.name;
        this.form.phone = elem.phoneNum;

      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      querySearchAsync(queryString, cb){
        let _this = this;
        let id = '';
        if(_this.form.streetId){
          id = _this.form.streetId;
        }
        let districtId = _this.form.districtId;
        let customerId = _this.form.customerId;
        let word = queryString;
        let form = {word:word,effectiveFlag:1,};
        if(customerId){
          form = {word:word,effectiveFlag:1,customerId:customerId,};
        }
        if(word){
          newHouseList(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data.list;
              if(data){
                let arr = [];
                for(let i = 0 ; i < data.length ; i++){
                  arr.push({value:data[i].projectName,id:data[i].id,streetId:data[i].streetId,districtId:data[i].districtId});
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
      getSelectBuilding(item){
        this.currentBuilding = item;
        this.form.projectId = item.id;
        this.form.districtId = item.districtId;
        this.form.streetId = item.streetId;
        this.form.buildingsUfloorId = '';
        this.form.buildingId = '';
        this.form.buildingsUnitId = '';

        this.form.buildingsUnitId = "";//单元
        this.form.buildingsUnitName = "";
        this.findStreeByTown(item.districtId,true);
      },
      //新增认筹
      saveFormData(){
        let _this =  this;
        let buildArea=this.form.buildArea
        let inArea=this.form.inArea
        let districtId = this.form.districtId;
        let streetId = this.form.streetId;
        let projectId  = this.form.projectId;
        let seatId = this.form.buildingId;
        let unitId = this.form.buildingsUnitId;
        let buildingsUfloorId = this.form.buildingsUfloorId;
        let floorCurrent=this.form.floorCurrent
        let floorAmount=this.form.floorAmount
        let title=""
        let projectName = this.form.projectName;
        let customerName = this.form.customerName;
        buildArea=parseInt(buildArea)
        inArea=parseInt(inArea)
         if(inArea>buildArea){
           this.myAlert("套内面积不能大于面积",'dangerous-icon');
           return false;
         }
        
        if(projectId == '' ){
          this.myAlert("您必须先选择一个【项目】！",'dangerous-icon','my-message',);
          return false;
        }else{
          title = this.form.projectName;
          if(this.currentBuilding) {
            let value = this.currentBuilding.value;
            if (title != value) {
              this.myAlert("您必须先选择一个【项目】！", 'dangerous-icon', 'my-message',);
              return false;
            }
          }
        }
        title = this.form.buildingName;
        if(!title){
          this.myAlert("请填写栋座",'dangerous-icon');
          return false;
        }else{
          
        }
        title = this.form.buildingsUnitName;
        if(!title){
          this.myAlert("请填写单元",'dangerous-icon');
          return false;
        }else{
          
        }
        if(floorCurrent === ''){
          this.myAlert("楼层不能为空！",'dangerous-icon');
          return false;
        }
        if( floorAmount === ''){
          this.myAlert("总层不能为空！",'dangerous-icon');
          return false;
        }
        if(customerName == ''){
          this.myAlert("客户不能为空！",'dangerous-icon');
          return false;
        }
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        let dealEmp1Id = form.dealEmp1Id;
        if(!dealEmp1Id){
           this.myAlert("成交人员不能为空！", 'dangerous-icon');
           return false;
        }
        for(let attr in form){
          if(form[attr] == null){
            form[attr] = "";
          }
        }
        if(!form.room){
          form.room = '0';
        }
        if(!form.hall){
          form.hall = '0';
        }
        if(!form.wei){
          form.wei = '0';
        }
        if(!form.balcony){
          form.balcony = '0';
        }
        addIdentifyChips(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.dialogFormVisible = false;
            _this.myAlert("数据保存成功！", 'success-icon').then(res => {

              _this.$parent.reloadSaleList();
              _this.cancelData();
            }).catch(err => {
            })
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangouser-icon');
          }
        })
      },
      cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },

      //获取参数
      getRentParam(){

        let _this = this;
        identifyChipsParams().then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let initArr = [{id:"0",name:" "}];

            _this.areas = data.areas;
            if(data.areas && data.areas.length != 0){
              _this.form.districtId = "";
            }


            if(data.areas){

              let arr = data.areas;

              arr.forEach(function(item,index){
                if(index == 0){
                  _this.form.districtId = item.id;
                }
              })
            }
            let streetArr = data.streets;
            let specialArr = [{id:"-1",label:"全部"}];
            if(streetArr && streetArr.length != 0){
              streetArr.forEach(function(item){
                item.label = item.label;
              })
              _this.streetArr = specialArr.concat(streetArr);
            }

            //用途
            if(data.roomUseParams){
              _this.purposes = initArr.concat(data.roomUseParams);
              if(data.roomUseParams.length != 0) {
                _this.form.roomUseId = data.roomUseParams[0].id;
              }
            }
            if(data.roomShapeParams){
              _this.roomShapeParams = initArr.concat(data.roomShapeParams);
            }
            if(data.roomDirectionParams){
              _this.Orientations = initArr.concat(data.roomDirectionParams);
            }

          
            //现状
            if(data.roomStateIdParams){
              _this.roomStateIdParams = initArr.concat(data.roomStateIdParams);
            }
            //付款
            if(data.paymentIdParams){
                
              _this.PaymentMethods = initArr.concat(data.paymentIdParams);
              _this.form.payWayId = data.paymentIdParams[0].id;
              for(var i=0;data.paymentIdParams.length>i;i++){
                if( data.paymentIdParams[i].name=="一次付清"){
                  data.paymentIdParams[i].name="一次性付清"
                }

              }
            }
            let systemSet = data.systemSet;
            try{
              systemSet.forEach(item => {
                if(item.paramName == '成交人1改名'){
                  _this.userName1  = item.paramData.substr(0,3);
                }else if(item.paramName == '成交人2改名'){
                  _this.userName2  = item.paramData.substr(0,3);
                }else if(item.paramName == '成交人3改名'){
                  _this.userName3  = item.paramData.substr(0,3);
                }
              })
              
              
            }catch(e){

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
              try {
                let defaultUserId = data.defaultUserId;
                let defaultDeptId = data.defaultDepartId;
                let defaultUserList = data.defaultUserList;
                if(defaultDeptId != -1){
                  _this.userList1 = defaultUserList;
                  if(defaultUserId){
                    _this.form.dealEmp1Id = defaultUserId;
                  }
                  if(defaultDeptId){
                    _this.form.dealDept1Id = defaultDeptId;
                  }
                }  

              }catch(e){

              }
            }

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      //获取参数
      getRentParam1(){

        let _this = this;
        let houseNumId = this.houseNumId;
        getInitIdentifyChipsParams(houseNumId).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.params;
            let initArr = [{id:"0",name:" "}];

            _this.areas = data.areas;
            if(data.areas && data.areas.length != 0){
              _this.form.districtId = "";
            }
            if(data.areas){

              let arr = data.areas;

              arr.forEach(function(item,index){
                if(index == 0){
                  _this.form.districtId = item.id;
                }
              })
            }
            let streetArr = response.data.streets;
            let specialArr = [{id:"-1",label:"全部"}];
            if(streetArr && streetArr.length != 0){
              streetArr.forEach(function(item){
                item.label = item.label;
              })
              _this.streetArr = specialArr.concat(streetArr);
            }

            //用途
            if(data.roomUseParams){
              _this.purposes = initArr.concat(data.roomUseParams);
              if(data.roomUseParams.length != 0) {
                _this.form.roomUseId = data.roomUseParams[0].id;
              }
            }
            if(data.roomShapeParams){
              _this.roomShapeParams = initArr.concat(data.roomShapeParams);
            }
            if(data.roomDirectionParams){
              _this.Orientations = initArr.concat(data.roomDirectionParams);
            }

          
            //现状
            if(data.roomStateIdParams){
              _this.roomStateIdParams = initArr.concat(data.roomStateIdParams);
            }
            //付款
            if(data.paymentIdParams){
                
              _this.PaymentMethods = initArr.concat(data.paymentIdParams);
              _this.form.payWayId = data.paymentIdParams[0].id;
              for(var i=0;data.paymentIdParams.length>i;i++){
                if( data.paymentIdParams[i].name=="一次付清"){
                  data.paymentIdParams[i].name="一次性付清"
                }

              }
            }
            

            if(data.departTree){
              let arr = [];
              let treeData = data.departTree
              for(let i = 0 ; i < treeData.length; i++){
                arr.push({
                  id:treeData[i].id,
                  name:treeData[i].label.replace(/&nbsp;/g,""),
                  level:treeData[i].level,
                })
              }
              _this.departTree = arr;
              try {
                let defaultUserId = data.defaultUserId;
                let defaultDeptId = data.defaultDepartId;
                let defaultUserList = data.defaultUserList;
                if(defaultDeptId != -1){
                  _this.userList1 = defaultUserList;
                  if(defaultUserId){
                    _this.form.dealEmp1Id = defaultUserId;
                  }
                  if(defaultDeptId){
                    _this.form.dealDept1Id = defaultDeptId;
                  }
                }  
                let firstHouseBasic = response.data.firstHouseBasic;
                let ufloor = response.data.ufloor;
                if(firstHouseBasic){
                  let districtId = firstHouseBasic.districtId;
                  let streetId = firstHouseBasic.streetId;
                  let projectName = firstHouseBasic.projectName;
                  let id = firstHouseBasic.id;
                  _this.form.districtId = districtId;
                  _this.form.streetId = streetId;
                  _this.form.projectName = projectName;
                  _this.form.projectId = id;
                } 
                if(ufloor){
                  let buildingsId = ufloor.buildingsId;
                  let buildingName = response.data.buildingName;
                  _this.form.buildingId = buildingsId;
                  _this.form.buildingName = buildingName;

                  let unitId = ufloor.unitId;
                  let unitName = response.data.unitName;
                  _this.form.buildingsUnitId = unitId;
                  _this.form.buildingsUnitName = unitName;

                  let roomNum = ufloor.roomNum;
                  let id = ufloor.id;
                  _this.form.buildingsUfloorId = id;
                  _this.form.buildingsUfloorName = roomNum;

                }
              }catch(e){

              }
            }

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      checkFloowNum1(value){
        this.form.floorCurrent= this.form.floorCurrent.replace(/[^\.\d]/g,'');

      },
      checkFloowNum2(value){
        this.form.floorAmount= this.form.floorAmount.replace(/[^\.\d]/g,'');

      },
      findStreeByTown(val,noSetValue){
        let _this = this;
        debugger;
        if(!noSetValue){
         this.form.streetId = '-1';
         this.form.projectId = '';
         this.form.projectName = ''; 
        }
        
        this.form.seatId = '';
        this.form.unitId = '';
        this.form.buildingsUfloorId = '';
        this.form.buildingsUfloorName = '';
        
        this.form.buildingId = '';
        this.form.buildingName = '';
        this.form.buildingsUnitId = '';
        this.form.buildingsUnitName = '';

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
        
        this.form.projectName = '';
        this.form.buildingId = '';
        this.form.buildingsUnitId = '';
        this.form.buildingsUnitName = '';
        this.form.buildingsUfloorId = '';
        this.form.buildingsUfloorName = '';
      },
     
      //栋座
      getPedestalListData(queryString, cb){
        let _this = this;
        let seatId = '';
        let id = "";
        if(_this.currentBuilding){
          id = _this.currentBuilding.id;
        }else if(_this.form.projectId){
          id = _this.form.projectId;
        }

        if( id != ''){
          pedestalList(id,seatId,queryString).then(function(response){

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
      getSelectSeat(item){
        this.currentSeat = item;
        this.form.buildingId = item.id;
        this.form.buildingName = item.value;
        this.form.buildingsUfloorId = '';
        this.form.buildingsUnitId = '';
        this.form.buildingsUnitName = "";
        this.form.buildingsUfloorName = "";
        this.form.floorAmount = item.pliesNumber;
      },
      //单元
      getUnitListData(queryString, cb){
        console.log(queryString)
        let _this = this;
        let id = "";
        if(_this.currentSeat){
          id = _this.currentSeat.id;
        }
        if(queryString != null && id != ''){
          findUnitBySeartId(id).then(function(response){
            console.log(response.data)
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              if(data){
                let arr = [];
                for(let i = 0 ; i < data.length; i++){
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
        this.form.buildingsUnitId = item.id;
        this.form.buildingsUnitName = item.value;
        this.form.buildingsUfloorId = '';
        this.form.buildingsUfloorName = '';
      },

      getHouseListData(queryString, cb){

        var _this = this;
        let showAll = 1;
        let unitId = this.form.buildingsUnitId;
        let seatId = this.form.buildingId;
        if(unitId && seatId) {
          findSeatHouseNum(seatId, showAll, unitId, queryString).then(function (response) {
            console.log(response.data)
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
              _this.myAlert(message + "！");
            }
          })
        }else{
          cb([]);
        }
      },

      getSelectHouse(item){
        console.log(item)
        this.currentHouseNum = item;
        this.form.buildingsUfloorId = item.id;
        this.form.buildingsUfloorName = item.value;
        this.form.floorCurrent = item.floor;
      },
      findUserByDepart(value){
        let _this = this;
        let id = null;
        let userList = "";
        if(value == 1){
          id = this.form.dealDept1Id;
          userList = "userList1";
        }else if(value == 2){
          id = this.form.dealDept2Id;
          userList = "userList2";
        }else if(value == 3){
          id = this.form.dealDept3Id;
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
              let userArr = [{id:'',name:' '}];
              user.forEach(item => {
                if(item.doBusiness == 1){
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  userArr.push(item);
                }
              })
             
              _this[userList] =  userArr;
              _this.form["dealEmp"+value+"Id"] = '';
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
     
      valueChange(){

      }
    },
    mounted() {
      let houseNumId = this.houseNumId;
      if(houseNumId){
        this.getRentParam1();
      }else{
        this.getRentParam();
      }
    },
    watch:{
      'form.buildArea':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.buildArea = undefined;
            return;
          }
          this.form.buildArea = oldval
        } else {
          this.form.buildArea = newval.replace(/^\./g, "")
        }
      },
      'form.inArea':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.inArea = undefined;
            return;
          }
          this.form.inArea = oldval
        } else {
          this.form.inArea = newval.replace(/^\./g, "")
        }
      },
      'form.prebuyPrice':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.prebuyPrice = undefined;
            return;
          }
          this.form.prebuyPrice = oldval
        } else {
          this.form.prebuyPrice = newval.replace(/^\./g, "")
        }
      },
      'form.prebuyAmount':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.prebuyAmount = undefined;
            return;
          }
          this.form.prebuyAmount = oldval
        } else {
          this.form.prebuyAmount = newval.replace(/^\./g, "")
        }
      },
      'form.delegatePrice':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.delegatePrice = undefined;
            return;
          }
          this.form.delegatePrice = oldval
        } else {
          this.form.delegatePrice = newval.replace(/^\./g, "")
        }
      },
      'form.firstAmount':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.firstAmount = undefined;
            return;
          }
          this.form.firstAmount = oldval
        } else {
          this.form.firstAmount = newval.replace(/^\./g, "")
        }
      },
      'form.totalPrice':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.totalPrice = undefined;
            return;
          }
          this.form.totalPrice = oldval
        } else {
          this.form.totalPrice = newval.replace(/^\./g, "")
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
  .contents{
    display: flex;
    width: 100%;
    height: 100%;
    .left_content{
      width: 50%;
      border-width: 0px;
      border-right-width:2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;

    }
    .right_content{
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .Information{
        width: 90%;
        height:90%;
        border: 1px solid rgb(121, 121, 121);
        border-radius: 5px;
        color:rgb(153, 153, 153);
        background: #dedede;
        text-align: center;
        line-height: 156.8px;
      }
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
  .word{
    line-height:27px;
  }
  .input-word{
    line-height:27px;
    padding-right:2px;
    display:inline-block;
  }
  .top-word{
    position:relative;
    top:6px;
  }
  .remark-word{
    display:inline-block;
    font-size:12px;
    color:#999;
    line-height: 27px;
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
  .padding1{
    padding-left:0px;
    display:inline-block;
  }
  .padding-r-2{
    padding-right:2px;
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
  .project-icon{
    background:url(../../../images/icon.png) -305px -144px;
    width:25px;
    height:23px;
    display:block;
    cursor:pointer;
  }
  .customer-icon{
    background:url(../../../images/icon.png) -364px -139px;
    width:25px;
    height:23px;
    display:block;
    cursor:pointer;
  }
</style>
<style>
  tr {
    pointer-events: auto;
  }
</style>
