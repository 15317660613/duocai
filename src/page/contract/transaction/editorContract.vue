<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="width:100%;padding:5px 10px 0;height: 510px;">
      <el-tabs type="border-card" v-model="getActiveName" @tab-click="changeTab">
        <el-tab-pane label="基础信息" name="house">
          <span slot="label">基础信息</span>
          <div class>
            <div class="pop-up" style="width:100%;margin:0px;">
              <div class="pop-up-container" style="width:calc(100% - 20px);">
                <el-form ref="formsData" :model="form">
                  <div class="clear">
                    <div class="left padding-r-2" style="width:60px;text-align:right;">
                      <span class="word require-word">合同编号</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-input
                        :disabled="true"
                        v-model="form.contractCode"
                        placeholder="【自动编号】"
                        style="width:150px;"
                      ></el-input>
                    </div>
                    <div class="left padding-r-2" style="width:50px;text-align:right;">
                      <span class="word">业类</span>
                    </div>
                    <div class="left padding-r-1">
                      <el-form-item prop="businessType">
                        <el-select :disabled="finishDisabled || frozenAndInvoildDisalbed || finishedDisabled" @change="getBuyTypeName" v-model="form.businessType" placeholder style="width:92px;">
                          <el-option
                            v-for="item in businessTypeParams"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2" style="width:70px;text-align:right;">
                      <span class="word">房产证号</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="realEstateNum">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          @input="checkWord"
                          title="上限50个字,数字/字母/汉字"
                          maxlength="50"
                          v-model="form.realEstateNum"
                          style="width:150px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2" style="width:45px;text-align:right;">
                      <span class="word">状态</span>
                    </div>
                    <div class="left padding-r-1">
                      <el-form-item prop="stateId">
                        <el-select @change="changeFrozenAninvoild"  v-model="form.stateId" placeholder style="width:90px;">
                          <el-option
                            v-for="item in stateIdParams"
                            :label="item.name"
                            :value="item.id"
                            :disabled="!finishDisabled && item.name == '作废'"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear" style="position:relative;">
                    <div class="left padding-r-2" style="width:60px;text-align:right;">
                      <span  :class="{'word':true,'require-word':true}"   >{{houseAddressName}}</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style="padding-right:13px;">
                      <el-form-item prop="roomAddress">
                        <el-input
                         :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="（手动输入时）上限50个字"
                          maxlength="50"
                          v-model="form.roomAddress"
                          style="width:270px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div style="position:absolute;top:6px;left:330px;">
                      <i class="house-special-icon" @click="showCheckHouse"></i>
                    </div>

                    <div class="left padding-r-2" style="width:80px;text-align:right;">
                      <span class="word require-word" style="white-space: pre-wrap;">签  约  日</span>
                    </div>
                    <div class="left padding-r-1">
                      <el-form-item prop="contractDate">
                        <el-date-picker
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          size="mini"
                          value-format="yyyy-MM-dd"
                          type="date"
                          placeholder="选择日期"
                          v-model="form.contractDate"
                          style="width: 150px;"
                        ></el-date-picker>
                      </el-form-item>
                    </div>

                    <div class="left padding-r-2" style="width:45px;text-align:right;">
                      <span class="word">面积</span>
                    </div>
                    <div class="left padding-r-1 l-h-27 text-input" style>
                      <el-form-item prop="roomArea">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限10位数"
                          maxlength="10"
                          @input="checkNum1"
                          v-model="form.roomArea"
                          style="width:90px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left">
                      <span class="word">㎡</span>
                    </div>
                  </div>
                  <div class="clear" style="position:relative;">
                    <div class="left padding-r-2" style="width:60px;text-align:right;">
                      <span class="word">{{houseNumName}}</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="roomNum">
                        <el-input :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" class v-model="form.roomNum" style="width:122px;"></el-input>
                      </el-form-item>
                    </div>
                    <div style="position:absolute;left:192px;top:11px;" >
                      <i :class="{'new-house-icon':houseIconType == 1,'rent-house-icon':houseIconType == 3,'sale-house-icon':houseIconType == 2,}" ></i>
                    </div>

                    <div class="left padding-r-2" style="width:74px;text-align:right;">
                      <span :class="{'word':true,'require-word':true}" >{{saleName}}</span>
                    </div>
                    <div class="left padding-r-1 l-h-27 text-input" style>
                      <el-form-item prop="price">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限10位数"
                          maxlength="13"
                          @input="checkNum2"
                          v-model="form.price"
                          style="width:82px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left">
                      <span class="word">元</span>
                    </div>
                    <div class="left padding-r-2" style="width:72px;text-align:right;">
                      <span class="word">签约人员</span>
                    </div>
                    <div class="left padding-r-1">
                      <el-form-item prop="contractEmpDepartId">
                        <el-select
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          @change="findUserByDepart(1)"
                          v-model="form.contractEmpDepartId"
                          placeholder
                          style="width:92px;"
                        >
                          <el-option  v-for="item in departTree"  :label="item.name" :value="item.id">
                            <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                              <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                              <span v-if="item.state=='常态'">{{item.name}}</span>
                            </span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1">
                      <el-form-item prop="contractEmpId">
                        <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" v-model="form.contractEmpId" placeholder style="width:92px;">
                          <el-option v-for="item in userList1" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>

                    <div class="left padding-r-2" style="width:45px;text-align:right;">
                      <span class="word" style="white-space: pre-wrap;">用    途</span>
                    </div>
                    <div class="left padding-r-1">
                      <el-form-item prop="roomUseId">
                        <el-select
                          :disabled="true"
                      
                          v-model="form.roomUseId"
                          placeholder
                          style="width:65px;"
                        >
                          <el-option
                            v-for="item in roomUseParams"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear">
                    <div class="left padding-r-2" style="width:60px;text-align:right;">
                      <span class="word">{{buyTypeName}}</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item  prop="businessNum">
                        <el-input :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" v-model="form.businessNum" style="width:122px;"></el-input>
                      </el-form-item>
                    </div>

                    <div class="left padding-r-2" style="width:74px;text-align:right;">
                      <span class="word">单价</span>
                    </div>
                    <div class="left padding-r-1 l-h-27 text-input" style>
                      <el-form-item  prop="unitPrice">
                        <el-input
                         :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限10位数"
                          maxlength="13"
                          @input="checkNum3"
                          v-model="form.unitPrice"
                          style="width:93px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2" style="width:73px;text-align:right;">
                      <span class="word">签约经理</span>
                    </div>
                    <div class="left padding-r-1">
                      <el-form-item  prop="contractLeaderDepartId">
                        <el-select
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          @change="findUserByDepart(2)"
                          v-model="form.contractLeaderDepartId"
                          placeholder
                          style="width:92px;"
                        >
                          <el-option  v-for="item in departTree"  :label="item.name" :value="item.id">
                            <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                              <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                              <span v-if="item.state=='常态'">{{item.name}}</span>
                            </span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-1">
                      <el-form-item prop="contractLeaderId">
                        <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" v-model="form.contractLeaderId" placeholder style="width:92px;">
                          <el-option v-for="item in userList2" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"  ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>

                    <div class="left padding-r-2" style="width:44px;text-align:right;">
                      <span class="word">自定号</span>
                    </div>
                    <div class="left padding-r-1">
                      <el-form-item prop="num">
                        <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" v-model="form.num" placeholder style="width:66px;">
                          <el-option v-for="item in numParams" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="break"></div>
                  <div class="clear" style="position:relative;">
                    <div class="left padding-r-2" style="width:60px;text-align:right;">
                      <span class="word require-word">{{propertyName}}</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="ownerName">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限25个字"
                          maxlength="25"
                          v-model="form.ownerName"
                          style="width:150px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2" style="width:47px;text-align:right;">
                      <span :class="{'word':true,'require-word':checkContractValue3 == 'true'}"   >手机</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="ownerPhone">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限15位数"
                          maxlength="15"
                          @input="checkNum4"
                          v-model="form.ownerPhone"
                          style="width:92px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2" style="width:73px;text-align:right;">
                      <span :class="{'word':true,'require-word':true}" >客户姓名</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style="padding-right:23px;">
                      <el-form-item prop="customerName">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限25个字"
                          maxlength="25"
                          v-model="form.customerName"
                          style="width:130px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div style="position:absolute;top:6px;left:563px;">
                      <i class="customer-special-icon" @click="showCheckCustomer"></i>
                    </div>
                    <div class="left padding-r-2" style="width:41px;text-align:right;">
                      <span class="word">手机</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="customerPhone">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限15位数"
                          maxlength="15"
                          @input="checkNum5"
                          v-model="form.customerPhone"
                          style="width:100px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear">
                    <div class="left padding-r-2" style="width:60px;text-align:right;">
                      <span class="word">{{saleAddressName}}</span>
                    </div>
                    <div class="left l-h-27" style>
                      <el-form-item prop="ownerAddress">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限50个字"
                          maxlength="50"
                          v-model="form.ownerAddress"
                          style="width:213px;"
                        ></el-input>
                      </el-form-item>
                    </div>

                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="ownerSource">
                        <el-input :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" title="来源" v-model="form.ownerSource" style="width:77px;"></el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2" style="width:73px;text-align:right;">
                      <span class="word">客源编号</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="customerCode">
                        <el-input :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" v-model="form.customerCode" style="width:93px;"></el-input>
                      </el-form-item>
                    </div>
                    <div class="left padding-r-2" style="width:61px;text-align:right;">
                      <span class="word">联系地址</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="customerAddress">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限50个字"
                          maxlength="50"
                          v-model="form.customerAddress"
                          style="width:140px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="clear">
                    <div class="left padding-r-2" style="width:60px;text-align:right;">
                      <span :class="{'word':true,'require-word':checkContractValue4 == 'true'}"   >身份证号</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="ownerId">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限18个字"
                          maxlength="18"
                          v-model="form.ownerId"
                          style="width:290px;"
                        ></el-input>
                      </el-form-item>
                    </div>

                    <div class="left padding-r-2" style="width:73px;text-align:right;">
                      <span class="word">身份证号</span>
                    </div>
                    <div class="left padding-r-1 l-h-27" style>
                      <el-form-item prop="customerIdCard">
                        <el-input
                          :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                          title="上限18个字"
                          maxlength="18"
                          v-model="form.customerIdCard"
                          style="width:295px;"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                 
                  <div class="clear">
                    <div class="left clear left-content" style="width:370px;" >
                      <div class="break" >

                      </div>
                      <div class="clear">
                        <!--<div class="no-data-word" >
                          【无跟进记录或跟进记录被屏蔽】
                        </div>-->
                        <div class="clear">
                          <div class="followList" style="height:198px;color: #666;">
                            <div
                              v-for="item in processings"
                              
                              :class="{'elemFollow':true,'clear':true,'click-check':item.id == deletedFollowId}"
                              @click="getDeletedFollowId(item.id)"
                            >
                              <div class="left overflowEellipsis" style="width:150px;padding-left:5px;">
                                <span
                                  @click="editorFollowPage(item.id)"
                                  v-html="item.remark"
                                  style="cursor:pointer;"
                                  class="follow-word"
                                ></span>
                              </div>
                              <div class="left overflowEellipsis" style="width:75px;">
                                <span class="follow-word">{{item.createBy}}</span>
                              </div>
                              <div class="left overflowEellipsis" style="width:105px;">
                                <span class="follow-word">{{item.createTime}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                     <div class="left right-content" >
                      <div class="clear " v-if="!typeHide" >
                          <div class="left  padding-r-2" style="width:55px;text-align:right;" >
                            <span class="word " >佣金类型</span>
                          </div>
                          <div class="left padding-r-1" >
                            <el-form-item  prop="commissionType" >
                              <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"  @change="changeCommissionType" v-model="form.commissionType"  placeholder="" style="width:90px;" >
                                <el-option v-for="item in commissionTypeParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-1" >
                            <el-form-item  prop="commissionTypeRemark" >
                              <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" v-model="form.commissionTypeRemark"  placeholder="" style="width:202px;" >
                                <el-option v-for="item in commissionTypeRemarkParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                      </div>
                      <div class="clear"  v-if="!typeHide" >
                          <div class="left  padding-r-2" style="width:55px;text-align:right;" >
                            <span class="word " >佣金模式</span>
                          </div>
                          <div class="left padding-r-1" >
                            <el-form-item  prop="commissionModel"  >
                              <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" @change="changeUnit"  v-model="form.commissionModel"  placeholder="" style="width:90px;" >
                                <el-option v-for="item in commissionModelParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-1" >
                            <el-form-item  prop="commissionModelRemark" >
                              <el-input :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled" @input="checkModelRemark" title="上限10位数" maxlength="13"  v-model="form.commissionModelRemark"    style="width:193px;"  ></el-input>
                            </el-form-item>
                          </div>
                          <div class="left" >
                            <span class="word" v-if="unitMoneyOrProperty" >元</span>
                            <span class="word" v-else >%</span>
                          </div>
                      </div>
                      <div class="clear " style="padding-top:5px;"  >
                        <div class="left  padding-r-2"  style="width:55px;text-align:right;" >
                          <span class="">备注</span>
                        </div>
                        <div class="left">
                            <textarea
                              type="textarea"
                              style="width:294px;height:158px;"
                              maxLength="1000"
                              title="上限1000个字"
                              class="remark"
                              :disabled="finishDisabled  || frozenAndInvoildDisalbed || finishedDisabled"
                              v-model="form.remark">
                            </textarea>
                        </div>
                      </div>
                  </div>
                  
                  </div>
                </el-form>
              </div>
            </div>
          </div>
          <div class="component-container">
            <NeWFollowPage
              @getFollowList="getFollowList"
              :followShowNew="newShowFollowValue"
              ref="newFollow"
            ></NeWFollowPage>
          </div>
          <div class="component-container">
            <EditorFollowPage
              @getFollowList="getFollowList"
              :followShowEditor="editorShowFollowValue"
              ref="editorFollow"
            ></EditorFollowPage>
          </div>
        </el-tab-pane>
        <el-tab-pane label="财务收付" name="finance">
          <span slot="label">财务收付</span>
          <div class>
            <div class="pop-up" style="width:100%;margin:0px;height:448px;">
              <div class="pop-up-container clear" style="width:100%;margin:10px 0 0 0px;">
                <div class="left">
                  <div class="clear" style="padding-bottom:10px;">
                    <div
                      class="list-table finance-table list-content table-border"
                      style="margin-left:0;height:205px;width:550px;"
                    >
                      <el-table
                        :data="tableData3"
                        highlight-current-row
                        border
                        height="240"
                        @row-click="getRowDataByClick1"
                      >
                        <el-table-column
                          prop="businessType1"
                          label="收付"
                          width="75"
                          sortable="true"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="getPayDate"
                          label="收付日期"
                          width="85"
                          sortable="true"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="businessType2"
                          label="业类"
                          width="100"
                          sortable="true"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div
                              v-if="scope.row.businessType2 != null"
                              style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;"
                              @click="editorShuoldFinance(scope.$index, scope.row)"
                            >
                              <div style="text-algin:center;position:relative;height:100%;" >
                                <span  >{{scope.row.businessType2}}</span>
                                <div v-if="scope.row.isAchievement == 1" class="" style="position:absolute;left:-5px;top:0px;">
                                  <i class="calculate-icon"  ></i>
                                </div>
                              </div>
                              
                            </div>
                            
                           
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="sourceGetAmount"
                          label="应收金额"
                          width="100"
                          sortable="true"
                          align="right"
                        >
                         <template slot-scope="scope">
                            
                              <div
                              v-html="scope.row.sourceGetAmount"
                              style="font-weight:700;color:#009933;text-algin:center;"
                              ></div>
                           </template>
                        </el-table-column>
                        <el-table-column
                          prop="sourceGetId"
                          label="收方"
                          width="90"
                          sortable="true"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="targetPayAmount"
                          label="应付金额"
                          width="100"
                          sortable="true"
                          align="right"
                        >
                           <template slot-scope="scope">
                              <div
                              v-html="scope.row.targetPayAmount"
                              style="font-weight:700;color:#CC3300;text-algin:center;"
                              ></div>
                           </template>
                        </el-table-column>
                        <el-table-column
                          prop="targetPayId"
                          label="付方"
                          width="65"
                          sortable="true"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="remark"
                          label="备注"
                          width="120"
                          sortable="true"
                          align="center"
                        ></el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div class="clear" style="padding-bottom:10px;">
                    <div
                      class="list-table finance-table list-content table-border"
                      style="margin-left:0;height:205px;width:550px;"
                    >
                      <el-table
                        :data="tableData4"
                        highlight-current-row
                        border
                        height="240"
                        @row-click="getRowDataByClick2"
                      >
                        <el-table-column
                          prop="businessType1"
                          label="收付"
                          width="60"
                          sortable="true"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="getPayDate"
                          label="收付日期"
                          width="85"
                          sortable="true"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="businessType2"
                          label="业类"
                          width="90"
                          sortable="true"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <div
                              v-if="scope.row.businessType2 != null"
                              style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;"
                              @click="editorRealFinance(scope.$index, scope.row)"
                            >
                              <div style="text-algin:center;position:relative;height:100%;" >
                                <span  >{{scope.row.businessType2}}</span>
                                <div v-if="scope.row.isAchievement == 1" class="" style="position:absolute;left:-5px;top:0px;">
                                  <i class="calculate-icon"  ></i>
                                </div>
                              </div>
                            </div>
                            
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="sourceGetAmount"
                          label="实收金额"
                          width="80"
                          sortable="true"
                          align="right"
                        >
                          <template slot-scope="scope">
                            <div class="clear" >
                              <div class="left" >
                                <i :class="{'seven-one-icon':scope.row.beAccount == 3,'seven-two-icon':scope.row.beAccount == 2,'seven-three-icon':scope.row.beAccount == 4}"  ></i>
                      
                              </div>
                              <div
                              class="left"
                              v-html="scope.row.sourceGetAmount"
                              style="font-weight:700;color:#009933;text-algin:center;"
                              ></div>
                            </div>  
                             
                           </template>
                        </el-table-column>
                        <el-table-column
                          prop="sourceGetId"
                          label="收方"
                          width="65"
                          sortable="true"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="sourceGetAmount"
                          label="实付金额"
                          width="80"
                          sortable="true"
                          align="right"
                        >
                          <template slot-scope="scope">
                            <div class="clear" >
                              
                              <div
                              class=""
                              v-html="scope.row.targetPayAmount"
                              style="font-weight:700;color:#CC3300;text-algin:center;"
                              ></div>
                            </div>  
                           </template>
                        </el-table-column>
                        <el-table-column
                          prop="targetPayId"
                          label="付方"
                          width="70"
                          sortable="true"
                          align="center"
                        ></el-table-column>
                        <el-table-column
                          prop="managerId"
                          label="财务人"
                          width="100"
                          sortable="true"
                          align="center"
                          :show-overflow-tooltip="true"
                        ></el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
                <div class="left">
                  <el-form ref="formsData1" :model="form1">
                    <div class="clear">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">业类</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="decorateId">
                          <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed"  @change="changBusiness" v-model="form1.businessType1" placeholder style="width:84px;">
                            <el-option
                             
                              label=" "
                              value=""
                            ></el-option>
                            <el-option
                              v-for="item in financeBusinessType1Params"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="decorateId">
                          <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed" v-model="form1.businessType2" placeholder style="width:65px;">
                            <el-option
                              label=" "
                              value=""
                            ></el-option>
                            <el-option
                              v-for="item in financeBusinessType2Params"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">对方</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="decorateId">
                          <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed" v-model="form1.source" placeholder style="width:150px;">
                            <el-option label=" " value="-1" ></el-option>
                            <el-option
                              v-for="item in sourceGetIdParams"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear" style="padding-left:35px;">
                      <div class="left">
                        <span
                          class="click-btn"
                          style="width:124px;"
                          @click="getShouldAndRealListData"
                        >查询</span>
                      </div>
                      <div class="left" style="padding-top:3px;" @click="clfince">
                        <i class="claerlys" ></i>
                      </div>
                    </div>
                    <div class="clear" style="padding-left:35px;">
                        <div   class="clear" >
                          <div v-if="!finishDisabled && !frozenAndInvoildDisalbed" class="left"  >
                            <span
                              class="click-btn"
                              @click="showNewShouldFinance"
                              style="width:124px;"
                            >新增应收应付</span>
                          </div>
                          <div v-else class="left">
                            <span
                              class="click-btn"
                              style="width:124px;cursor:not-allowed;"
                            >新增应收应付</span>
                          </div>
                          <div v-if="!finishDisabled && !frozenAndInvoildDisalbed" class="left" >
                            <span @click="deletedFinance(1)" class="click-btn" style="width:24px;border-left-width:0;">删</span>
                          </div>
                          <div v-else class="left" >
                            <span  class="click-btn" style="width:24px;cursor:not-allowed;border-left-width:0;">删</span>
                          </div>
                        </div>
                        
                    </div>
                    <div  class="clear" style="padding-left:35px;">
                       <div   class="clear" >
                        <div v-if="!finishDisabled &&  !frozenAndInvoildDisalbed" class="left">
                          <span
                            class="click-btn"
                            @click="showNewRealFinance"
                            style="width:124px;"
                          >新增实收实付</span>
                        </div>
                        <div v-else class="left">
                          <span
                            class="click-btn"
                            style="width:124px;cursor:not-allowed;"
                          >新增实收实付</span>
                        </div>
                        <div v-if="!finishDisabled && !frozenAndInvoildDisalbed" class="left">
                          <span @click="deletedFinance(2)" class="click-btn" style="width:24px;border-left-width:0;">删</span>
                        </div>
                        <div v-else class="left">
                          <span class="click-btn" style="width:24px;border-left-width:0;cursor:not-allowed;">删</span>
                        </div>
                      </div>
                         
                    </div>
                    <div class="clear">
                      <span
                        style="display:inline-block;padding-top:8px;line-height:20px;width:188px;text-align:center;"
                      >收方总额</span>
                    </div>
                    <div class="clear">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">应收</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="financeNum1">
                          <el-input
                            :disabled="true"
                            style="width:150px;"
                            v-model.trim="financeNum1"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">实收</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="financeNum2">
                          <el-input
                            :disabled="true"
                            style="width:150px;"
                            v-model.trim="financeNum2"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">未收</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="financeNum3">
                          <el-input
                             :disabled="true"
                            style="width:150px;"
                            v-model.trim="financeNum3"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear">
                      <span
                        style="display:inline-block;line-height:20px;width:188px;text-align:center;"
                      >付方总额</span>
                    </div>
                    <div class="clear">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">应付</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="financeNum4">
                          <el-input
                             :disabled="true"
                            style="width:150px;"
                            v-model.trim="financeNum4"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">实付</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="financeNum5">
                          <el-input
                             :disabled="true"
                            style="width:150px;"
                            v-model.trim="financeNum5"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">未付</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="financeNum6">
                          <el-input
                             :disabled="true"
                            style="width:150px;"
                            v-model.trim="financeNum6"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear" style="padding-top:10px;">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">结佣</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="finishSalary">
                          <el-select :disabled="finishDisabled || frozenAndInvoildDisalbed || balanceFlag" @change="setFinishSalaryType" v-model="form1.finishSalary" placeholder style="width:60px;">
                            <el-option
                              v-for="item in finishSalaryParams"
                              :disabled="item.disabled"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="decorateId">
                          <el-date-picker
                            :disabled="!finishedDisabled || frozenAndInvoildDisalbed || balanceFlag"
                            size="mini"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"
                            v-model="form1.finishSalaryDate"
                            style="width: 90px;"
                          ></el-date-picker>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="clear" style="padding-top:10px;">
                      <div class="left padding-r-2" style="width:35px;text-align:center;">
                        <span class="word">结盘</span>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="finishEnd">
                          <el-select  @change="setFinishEndType" v-model="form1.finishEnd" placeholder style="width:60px;">
                            <el-option
                              v-for="item in finishEndParams"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="left padding-r-1">
                        <el-form-item prop="decorateId">
                          <el-date-picker
                            size="mini"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"
                            :disabled="!finishDisabled || frozenAndInvoildDisalbed"
                            v-model="form1.finishEndDate"
                            style="width: 90px;"
                          ></el-date-picker>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          
        </el-tab-pane>

        <el-tab-pane label="业绩分成" name="key">
          <span slot="label">业绩分成</span>
          <div class>
            <div class="pop-up" style="width:100%;margin:0px;height:448px;">
              <div class="pop-up-container" style="width:auto;margin:0">
                <el-form ref="formsData" :model="form">
                  <div class="title clear">
                    <div class="left clear">

                       

                      <span
                         v-if="!finishDisabled  && !frozenAndInvoildDisalbed"
                        class="left save-cancel-btn"
                        style="margin:10px 10px 0 0px"
                        @click="addPerformance"
                      >新增业绩分成</span>
                       <span
                          v-else 
                         
                          class="left save-cancel-btn"
                          style="margin:10px 10px 0 0px;cursor:not-allowed;"
                        >新增业绩分成</span>

                      <span
                         v-if="!finishDisabled  && !frozenAndInvoildDisalbed"
                        class="left save-cancel-btn"
                        style="margin:10px 0 0 10px"
                        @click="deletedPerforMance"
                      >删除业绩分成</span>
                      <span
                          v-else 
                         
                          class="left save-cancel-btn"
                          style="margin:10px 10px 0 0px;cursor:not-allowed;"
                        >新增业绩分成</span>
                    </div>
                    <div class="left">
                      <span style="margin:12px 5px 0 150px;display:block;">按</span>
                    </div>
                    <div class="left">
                      <el-form-item label label-width="0">
                        <el-select
                          v-model="form.classifiyType"
                          placeholder=""
                           :disabled="true"
                          style="width:100px;margin:8px 0 0 0px;"
                        >
                          <el-option
                            
                            v-for="item in businessTypeParams"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left">
                      <el-form-item >
                        <el-select
                          v-model="commission"
                           :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                          placeholder
                          style="width:100px;margin:8px 0 0 0px;"
                        >
                          <el-option
                            v-for="item in businessTypeParams2"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left">
                      <span style="margin:13px 5px 0px;display:block;" >统计单数</span>
                    </div>
                  </div>
                  <div class="clear" style="padding-bottom:10px;">
                    <div
                      class="list-table performance-table list-content table-border"
                      style="height:400px;width:745px;margin-left:0"
                    >
                      <el-table
                        :data="tableDataPerformance1"
                        highlight-current-row
                        border
                        height="395px"
                        :row-class-name="tableRowClassName"
                        @row-click="getRowDataByClick"
                        @selection-change="handleSelectionChange"
                        :pagination-show="false"
                       
                      >
                          <el-table-column
                            type="selection"
                            prop="check"
                            label=""
                            sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="30"
                           
                          >
                           
                          </el-table-column>
                          <el-table-column
                            prop="userName"
                            label="分成人"
                            sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="160"
                          >
                            <template slot-scope="scope">
                              <div
                               
                                style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;"
                                @click="editorPerformance(scope.$index, scope.row,1)"
                              >
                                {{scope.row.userName}}
                              </div>
                            </template>
                          </el-table-column>
                            <el-table-column
                            prop="category"
                            label="业类"
                            sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="50"
                          >
                            
                          </el-table-column>
                           </el-table-column>
                            <el-table-column
                            prop="proportion"
                            label="比例"
                            sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="70"
                          >
                            
                          </el-table-column>
                        

                           <el-table-column
                            prop="receivable"
                            label="应收业绩"
                             sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="90"
                          >
                            <template slot-scope="scope">
                              <div
                               
                                style="color:#333333;font-weight:700;text-algin:center;cursor:pointer;"
                               
                              >
                                {{scope.row.receivable}}
                              </div>
                            </template>
                          </el-table-column> 
                           <el-table-column
                            prop="receipts"
                            label="实收业绩"
                             sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="90"
                          >
                            <template slot-scope="scope">
                              <div
                               
                                style="color:#333333;font-weight:700;text-algin:center;cursor:pointer;"
                               
                              >
                                {{scope.row.receipts}}
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="patternLevel"
                            label="模式"
                             sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="90"
                          >
                           
                          </el-table-column>
                           <el-table-column
                          
                            prop="deduct"
                            label="特殊扣除"
                            sortable
                            :show-overflow-tooltip="true"
                            align="right"
                            width="70"
                          >
                            <template slot-scope="scope">
                              <div style="color:#D87453;text-algin:right;cursor:pointer;" >
                                {{scope.row.deduct}}
                              </div>
                            </template>
                          </el-table-column> 
                           <el-table-column
                            
                            prop="bonus"
                            label="应计提金"
                            sortable
                            :show-overflow-tooltip="true"
                            align="right"
                            width="90"
                          > 
                            <template slot-scope="scope">
                              <div
                                class="clear"
                                style="font-weight:700;color:#009933;text-algin:right;cursor:pointer;"
                               
                              >
                                {{scope.row.bonus}}
                              </div>
                            </template>
                          </el-table-column>
                          
                         
                          <el-table-column
                            prop="type"
                            label="方式"
                             sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="50"
                          >
                           
                          </el-table-column>
                          <el-table-column
                            prop="balanceTime"
                            label="结算年月"
                             sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="85"
                          >
                           
                          </el-table-column>
                           <el-table-column
                            prop="firstBalance"
                            label="首次结算"
                             sortable
                            :show-overflow-tooltip="true"
                            align="right"
                            width="85"
                          >
                             <template slot-scope="scope">
                             
                              <div
                                
                                class="clear"
                                style="font-weight:700;color:#009933;text-algin:right;"
                               
                              >
                                {{scope.row.firstBalance}}
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column
                            
                            prop="totilBalance"
                            label="总补结算"
                             sortable
                            :show-overflow-tooltip="true"
                            align="right"
                            width="100"
                          >
                            <template slot-scope="scope">
                              <div class="clear" >
                                <div
                                  v-if="scope.row.totilBalance != null"
                                  class="clear left"
                                  style="font-weight:700;color:#009933;text-algin:right;cursor:pointer;"
                                
                                >
                                  <span style="margin:5px 2px 0 0;display:inline-block;" class="question-icon left" @click="calculation(scope.row.id)"></span>
                                  <span class="left" >  </span>
                                </div>
                                <div
                                  
                                  class="clear left"
                                  style="font-weight:700;color:#009933;text-algin:right;"
                                
                                >
                                  {{scope.row.totilBalance}}
                                </div>
                              </div>  
                            </template>
                          </el-table-column>  
                          <el-table-column
                            prop="isCalculateSalary"
                            label="计工资"
                             sortable
                            :show-overflow-tooltip="true"
                            align="center"
                            width="60"
                          ></el-table-column>
                       
                      </el-table>
                    </div>
                  </div>
                 
                </el-form>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="houseIconType == 1" label="新房进度" name="newHouse">
          <span slot="label">新房进度</span>
          <div class>
            <div class="pop-up" style="width:100%;margin:0px;height:448px;">
              <div class="pop-up-container" style="width:calc(100% - 20px);">
                <el-form ref="formsData1" :model="form3" >
                  <div class="clear">
                    <div>
                      <span class="left" style="margin:13px 5px 0 10px">负责人</span>
                    </div>
                    <div class="left">
                      <el-form-item label label-width="0">
                        <el-select
                           :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                          v-model="form3.empDepartId"
                          style="width:100px;margin-top: 10px;"
                          @change="findUserByDepart(3)"
                          placeholder
                        >
                          <el-option  label="" value="" ></el-option>
                          <el-option  v-for="item in departEmpIdParams"  :label="item.name" :value="item.id">
                            <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                              <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                              <span v-if="item.state=='常态'">{{item.name}}</span>
                            </span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="left">
                      <el-form-item label label-width="0">
                        <el-select
                        :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                          v-model="form3.empId"
                          placeholder
                          style="width:100px;margin-top: 10px;"
                        >
                          <el-option v-for="item in empIdParams"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                        </el-select>

                      </el-form-item>
                    </div>
                    <div class="left padding-r-2 des-word" style="padding:18px 0 0 10px">
                      <i class="left question-icon" @click="historyClick"></i>
                    </div>
                  </div>
                  <div class="clear">
                    <div class="information" style="padding:10px">
                      <div class="clear">
                        <h2 style="font-size:15px;font-weight:blod">基础信息</h2>
                      </div>
                      <div class="clear">
                        <div class="left padding-l-10 padding-r-2 padding-t-3">
                          <span>合同价格</span>
                        </div>
                        <div class="left padding-r-2">
                          <el-form-item prop="contractPrice" label-width="0">
                            <el-input
                             :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                              @input="checkFourNum1"
                              v-model.trim="form3.contractPrice"
                              title="上限10位数"
                              maxlength="13"
                              style="width:100px;"
                              autocomplete="off"
                            ></el-input>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-15 padding-t-3">
                          <span>元</span>
                        </div>
                        <div class="left padding-r-2 padding-t-3">
                          <span>商品房合同编号</span>
                        </div>
                        <div class="left">
                          <el-form-item prop="contractNum" label-width="0">
                            <el-input
                             :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                              @input="checkFourNum2"
                              v-model.trim="form3.contractNum"
                              title="上限20位数"
                              maxlength="20"
                              style="width:100px;"
                              autocomplete="off"
                            ></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear">
                        <div class="left padding-l-10 padding-r-2 padding-t-3">
                          <span>付款方式</span>
                        </div>
                        <div class="left padding-r-29">
                          <el-form-item label prop="payWayId" label-width="0">
                            <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed" @change="setPayname" v-model="form3.payWayId" placeholder style="width:100px;">
                              <el-option v-for="item in payWayIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="first" style="width:auto;height:auto">
                          <div class="left padding-r-2 padding-t-3">
                            <span>首付款</span>
                          </div>
                          <div class="left padding-r-2">
                            <el-form-item prop="payInAdvance" label-width="0">
                              <el-input
                               :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                                @input="checkFourNum3"
                                v-model.trim="form3.payInAdvance"
                                title="上限10位数"
                                maxlength="10"
                                style="width:100px;"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-15 padding-t-3">
                            <span>元</span>
                          </div>
                        </div>
                        <div class="second" v-if="payType == '商贷' || payType=='组合贷'">
                          <div class="left padding-r-2 padding-t-3">
                            <span>商贷</span>
                          </div>
                          <div class="left padding-r-2">
                            <el-form-item prop="businessLoan" label-width="0">
                              <el-input
                                :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                                @input="checkFourNum4"
                                v-model.trim="form3.businessLoan"
                                title="上限10位数"
                                maxlength="10"
                                style="width:100px;"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-15 padding-t-3">
                            <span>元</span>
                          </div>
                        </div>
                        <div class="thirds" v-if="payType == '公贷' || payType=='组合贷'">
                          <div class="left padding-r-2 padding-t-3">
                            <span>公贷</span>
                          </div>
                          <div class="left padding-r-2">
                            <el-form-item prop="governmentLoan" label-width="0">
                              <el-input
                                :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                                @input="checkFourNum5"
                                v-model.trim="form3.governmentLoan"
                                title="上限10位数"
                                maxlength="10"
                                style="width:100px;"
                                autocomplete="off"
                              ></el-input>
                            </el-form-item>
                          </div>
                          <div class="left padding-r-15 padding-t-3">
                            <span>元</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="clear">
                    <div class="progress">
                      <div class="clear">
                        <h2 style="font-size:15px;font-weight:blod">手续进度</h2>
                      </div>
                      <div class="clear">
                        <div class="left padding-l-10 padding-r-2 padding-t-3">
                          <span>备案登记</span>
                        </div>
                        <div class="left padding-r-2" style="position: relative;">
                          <el-form-item prop="registration" label-width="0">
                            <el-date-picker :disabled="finishDisabled  || frozenAndInvoildDisalbed" size="mini" value-format="yyyy-MM-dd" type="date"
                              v-model.trim="form3.registration"
                              style="width:100px;"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear">
                        <div class="left padding-l-10 padding-r-2 padding-t-3">
                          <span>面签进度</span>
                        </div>
                        <div class="left padding-r-2">
                          <el-form-item prop="faceSignCompany" label-width="0">
                            <el-input
                              :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                              v-model.trim="form3.faceSignCompany"
                              title="单位  上限20个字"
                              maxlength="20"
                              placeholder='单位'
                              style="width:100px;"
                              autocomplete="off"
                            ></el-input>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-2">
                          <el-form-item prop="faceSignName" label-width="0">
                            <el-input
                              :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                              v-model.trim="form3.faceSignName"
                              title="姓名  上限20个字"
                              maxlength="20"
                              placeholder='姓名'
                              style="width:100px;"
                              autocomplete="off"
                            ></el-input>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-29">
                          <el-form-item prop="faceSignPhone" label-width="0">
                            <el-input
                              :disabled="finishDisabled  || frozenAndInvoildDisalbed"
                              v-model.trim="form3.faceSignPhone"
                              title="电话  上限20个字"
                              maxlength="20"
                              placeholder='电话'
                              style="width:100px;"
                              autocomplete="off"
                            ></el-input>
                          </el-form-item>
                        </div>
                        <div class="left">
                          <el-form-item label prop="faceSignStateId" label-width="0">
                            <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed" v-model="form3.faceSignStateId" placeholder style="width:100px;">
                              <el-option v-for="item in faceSignStateIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="left padding-r-2" style="position: relative;">
                          <el-form-item prop="faceSignDate" label-width="0">
                            <el-date-picker :disabled="finishDisabled  || frozenAndInvoildDisalbed" size="mini" value-format="yyyy-MM-dd" type="date"
                              v-model.trim="form3.faceSignDate"
                              style="width:100px;"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear">
                        <div class="left padding-l-10 padding-r-2 padding-t-3">
                          <span>放款进度</span>
                        </div>
                        <div class="left padding-r-2">
                          <el-form-item label prop="loanStateId" label-width="0">
                            <el-select :disabled="finishDisabled  || frozenAndInvoildDisalbed" v-model="form3.loanStateId" placeholder style="width:100px;">
                              <el-option v-for="item in loanStateIdParams"  :label="item.name" :value="item.id" ></el-option>
                            </el-select>

                          </el-form-item>
                        </div>
                        <div class="left" style="position: relative;">
                          <el-form-item prop="loanDate" label-width="0">
                            <el-date-picker :disabled="finishDisabled  || frozenAndInvoildDisalbed" size="mini" value-format="yyyy-MM-dd" type="date"
                              v-model="form3.loanDate"
                              style="width:100px;"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear">
                        <div class="left padding-l-10 padding-r-2 padding-t-3">
                          <span>房屋验收</span>
                        </div>
                        <div class="left padding-r-2" style="position: relative;">
                          <el-form-item prop="verifyingDate" label-width="0">
                            <el-date-picker :disabled="finishDisabled  || frozenAndInvoildDisalbed" size="mini" value-format="yyyy-MM-dd" type="date"
                              v-model.trim="form3.verifyingDate"

                              style="width:100px;"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="clear">
                        <div class="left padding-l-10 padding-r-2 padding-t-3">
                          <span>产权办理</span>
                        </div>
                        <div class="left padding-r-2" style="position: relative;">
                          <el-form-item prop="propertyDate" label-width="0">
                            <el-date-picker :disabled="finishDisabled  || frozenAndInvoildDisalbed" size="mini" value-format="yyyy-MM-dd" type="date"
                              v-model.trim="form3.propertyDate"
                              style="width:100px;"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="footer-btn clear">
        <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;" >
          <div class="left" style="padding-right:7px;"  >
            <i class="up-page-icon" @click="upPage($event)" ></i>
          </div>
          <div class="left" >
            <i class="down-page-icon" @click="downPage($event)" ></i>
          </div>
        </div>
        <div class="left" style="padding-left:185px;">
          <span
            v-if="!finishDisabled  &&  !frozenAndInvoildDisalbed  "
            class="foot-btn"
            style="border-right-width:0px;"
            @click="showNewFollowPage"
          >写跟进</span>
          <span
            v-else
            class="foot-btn"
            style="border-right-width:0px;color:#999;cursor:not-allowed"
           
          >写跟进</span>
        </div>
        <div class="left">
        
          <span 
            v-if="!finishDisabled  && !frozenAndInvoildDisalbed  "
            class="foot-btn" style @click="deletedFollow">删</span>
           <span 
            v-else
            class="foot-btn" style="color:#999;cursor:not-allowed" >删</span>  
        </div>
        <div class="right clear">
          <div class="left foot-btn" style="padding:0px;border-width:0px;margin-right:10px;" >
            <i class="file-icon"  @click="isShowPhotoAndFile"  ></i>
          </div>
          <span
            class="right save-cancel-btn"
            style="margin-right:0px;"
            @click="cancelData"
          >取 消</span>
          <span class="right save-cancel-btn" @click="saveFormData" type="primary">保 存</span>
        </div>
      </div>
    </div>

    <div class="clear footerabsoluteclass">
      <div class="left footerabsoluteclasschild" >
        <span class="record-word" style="" >录入:</span>
        <span class="record-word" >{{form.createBy}}</span>
        <span class="record-word footerpaddingleft10">录入时间:</span>
        <span class="record-word" >{{form.createTime}}</span>
        <span class="record-word footerpaddingleft20">最后修改:</span>
        <span class="record-word" >{{form.updateBy}}</span>
        <span class="record-word footerpaddingleft10">最后修改时间:</span>
        <span class="record-word" >{{form.updateTime}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ediotrContract,
  modifyContract,
  contractFinanceList,
  deletedContractFinance
} from "../../../service/contractSpecial";
import { findUserByDepartId } from "../../../service/organizeDate";
import CheckCustomerPage from "./checkCustomer";
import CheckProjectPage from "./checkProject";
import CheckHousePage from "./checkHouse";
import { PlTable, PlTableColumn } from "pl-table";
import { contractParam } from "../../../utils/contractParam";
import Newperformance from "./newperformance";
import EditorperformancePage from "./editorPerformance";
import { achievementList,deltBonus} from "../../../service/contractData";
import { findFollowByContractId,deletedFollow} from "../../../service/contractSpecial";
import {getFilesList4,deletedFiles4,uploadFiles4,updateFileName4} from '../../../service/fileData'
import NeWFollowPage from "./newFollow";
import EditorFollowPage from "./editorFollow";
import NewShouldFinancePage from "./newShouldFinance";
import EditorShouldFinancePage from "./editorShouldFinance";
import NewRealFinancePage from "./newRealFinance";
import EditorRealFinancePage from "./editorRealFinance";
import History from "./history";
import Calculation from "./calculation";
import {findChildParams} from "../../../service/getData";
 import FilePage from '../../../components/file'
export default {
  props: ["id", "ids", "layerid", "activeName", "currentIndex"],
  data() {
    return {
      getActiveName: this.activeName,
      getCurentIndex: this.currentIndex,
      unitMoneyOrProperty:false,
      houseIconType:1,
      titlename:'',
      newShowFollowValue: false,
      editorShowFollowValue: false,
      newShowShoudFinance: false,
      editorShowShoudFinance: false,
      newShowRealFinace: false,
      editorShowRealFinace: false,
      active1: false,
      active2: false,
      active3: false,
      active4: false,
      finishedDisabled:false,//已结佣标识
      finishDisabled:false,// 已结盘禁止基础标识
      noFinishDisabled:false, //未结佣标识
      frozenAndInvoildDisalbed:false, //冻结、作废状态设置
      checkContractValue1:"false",
      checkContractValue2:"false",
      checkContractValue3:"false",
      checkContractValue4:"false",
      checkContractValue5:"false",
      checkContractValue6:"false",
      typeHide:false,
      commissionTypeParams:[],
      commissionTypeRemarkParams:[],
      commissionTypeRemarkParams1:[],
      commissionTypeRemarkParams2:[],
      commissionModelParams:[],
      tableDataPerformance1: [],
      tableDataPerformance2: [],
      tableData3: [],
      tableData4: [],
      currentPage: [],
      currentNum: 0,
      shouldClickId:'',
      realClickId:'',
      multipleSelection: [],
      columnData: contractParam.contractCommission,
      columnData1: contractParam.contractPerson,
      getId: this.id,
      deletedFollowId: 0,

      processings: [],
      businessTypeParams: [],
      businessTypeParams2:[],
      finishSalaryParams:[],
      finishEndParams:[],
      sourceGetIdParams:[{id:'2',name:'业主/客户'},{id:"3",name:'第三方'}],
      numParams: [],
      roomUseParams: [],
      stateIdParams: [],
      departTree: [],
      userList1: [],
      userList2: [],
      financeNum1: 0,
      financeNum2: 0,
      financeNum3: 0,
      financeNum4: 0,
      financeNum5: 0,
      financeNum6: 0,
      balanceFlag:false,
      decorateIdParams1: [],
      decorateIdParams2: [],
      buyTypeName:'认购编号',
      payType:'全款',
      saleName:'售价',
      houseAddressName:'新房地址',
      houseNumName:'项目编号',
      propertyName:'开发商',
      saleAddressName:'销售地址',
      departEmpIdParams:[],
      empIdParams:[],
      payWayIdParams:[],
      faceSignStateIdParams:[],
      loanStateIdParams:[],
      multipleTable1:[],
      financeBusinessType1Params:[],
      financeBusinessType2Params:[],
      commission: "",
      form: {
        id: "",
        contractCode: "",
        businessType: "",
        realEstateNum: "",
        stateId: "",
        roomAddress: "",
        contractDate: "",
        roomArea: "0.00",
        roomNum: "",
        roomId:"",
        price: "0",

        contractEmpDepartId: "",
        contractEmpId: "",

        roomUseId: "",

        businessNum: "",
        unitPrice: "0.00",

        contractLeaderDepartId: "",
        contractLeaderId: "",
        num: "",

        ownerName: "",
        ownerPhone: "",

        customerName: "",
        customerPhone: "",

        ownerAddress: "",
        ownerSource: "",
        customerCode: "",
        customerAddress: "",
        ownerId: "",
        customerIdCard: "",
        customerId:"",
        remark: "",

        createBy: "",
        updateBy: "",
        updateTime: "",
        classifiyType: "",
        

        departEmpId: "",
        empId: "",
        contractPrice: "",
        contractNum: "",
        payWayId: "",
        payInAdvance: "",
        businessLoan: "",
        governmentLoan: "",
        registration: "",
        faceSignCompany: "",
        faceSignName: "",
        faceSignPhone: "",
        faceSignStateId: "",
        faceSignDate: "",
        loanStateId: "",
        loanDate: "",
        propertyDate: "",
        management: "",
        commissionType:'',
        commissionTypeRemark:'',
        commissionModel:'',
        commissionModelRemark:'',

      },
      form1: {
        source:"",
        businessType1: "",
        businessType2: "",
        id:'',
        finishSalary: "",
        finishSalaryDate: "",
        finishEnd: "",
        finishEndDate: "",
      },
      form3:{
        id:'',
        empDepartId: "",
        empId: "",
        contractPrice: "",
        contractNum: "",
        payWayId: "",
        payInAdvance: "",
        businessLoan: "",
        governmentLoan: "",
        registration: "",
        faceSignCompany: "",
        faceSignName: "",
        faceSignPhone: "",
        faceSignStateId: "",
        faceSignDate: "",
        loanStateId: "",
        loanDate: "",
        propertyDate: "",
        verifyingDate: "",
      }
    };
  },
  components: {
    PlTable,
    PlTableColumn,
    Newperformance,
    EditorperformancePage,
    CheckCustomerPage,
    CheckProjectPage,
    CheckHousePage,
    NeWFollowPage,
    EditorFollowPage,
    NewShouldFinancePage,
    NewRealFinancePage,
    EditorShouldFinancePage,
    EditorRealFinancePage,
    History,
    FilePage,
  },
  methods: {

    isShowPhotoAndFile(){
      // this.$refs.FilePageId.showDialogVisible();
      let frozenAndInvoildDisalbed = this.frozenAndInvoildDisalbed;
      let finishDisabled = this.finishDisabled; // 结盘
      if(finishDisabled){
        frozenAndInvoildDisalbed = finishDisabled;
      }
     
      let _this = this;
      let test = _this.$layer.iframe({
        content: {
          content: FilePage, //传递的组件对象
          parent: this,//当前的vue对象
          data:{
            recordId:_this.getId,
            getFilesByType:getFilesList4,
            deleteFiles:deletedFiles4,
            uploadFiles:uploadFiles4,
            updateFileName:updateFileName4,
            downLoadFiles:'/contract/downloadReFiles',
            frozenAndInvoildDisalbed:frozenAndInvoildDisalbed,//合同状态冻结作废判断；
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
    checkModelRemark(){
      this.form.commissionModelRemark = this.form.commissionModelRemark.replace(/[^\.\d]/g,'');
    },
    changeUnit(){
      let commissionModel = this.form.commissionModel;
      let commissionModelParams = this.commissionModelParams;
      let paramName = "";
      commissionModelParams.forEach(item => {
        if(commissionModel == item.id){
          paramName = item.name;
          return false;
        }
      })
      if(paramName == '金额'){
        this.unitMoneyOrProperty = true;
      }else if(paramName == '比例'){
        this.unitMoneyOrProperty = false;
      }
    },
    changeFrozenAninvoild(){
      let stateIdParams = this.stateIdParams;
      let stateId = this.form.stateId;
      let name = "";
      stateIdParams.forEach(item => {
        if(item.id == stateId){
          name = item.name;
        }
      })
      if(name == '冻结' || name == "作废"){
        this.frozenAndInvoildDisalbed = true; 
      }else{
        this.frozenAndInvoildDisalbed = false;
      }
      
    },
    clfince(){
       this.form1.businessType1="";
       this.form1.businessType2="";
       this.form1.source="";
    },
    historyClick() {
      let _this = this;
      let test = _this.$layer.iframe({
        content: {
          content: History, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            activeName: "house",
            id:this.form.id,
            type:'',
          } //props
        },
        area: ["600px", "400px"],
        title: "历史修改记录",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          this.currentPage = "";
        }
      });
    },
    showNewShouldFinance() {
      let _this = this;
      let contractId = this.getId;
      let businessType = this.form.businessType;
      let layerId = _this.$layer.iframe({
        content: {
          content: NewShouldFinancePage, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            contractId,
            businessType,
          } //props
        },
        area: ["600px", "220px"],
        title: "新增应收应付",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          
        }
      })
    },
    showNewRealFinance() {
      let _this = this;
      let contractId = this.getId;
      let businessType = this.form.businessType;
      let contractCode = this.form.contractCode;
      let roomAddress = this.form.roomAddress;
      let layerId = _this.$layer.iframe({
        content: {
          content: NewRealFinancePage, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            contractId, businessType,contractCode,roomAddress
          } //props
        },
        area: ["650px", "400px"],
        title: "新增实收实付",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          
        }
      })
    },
    editorShuoldFinance(index, row) {
      let _this = this;
      let contractId = this.getId;
      let businessType = this.form.businessType;
      let id = row.id;
      let finishDisabled = this.finishDisabled ;//结佣的禁止标识
      let frozenAndInvoildDisalbed = this.frozenAndInvoildDisalbed;
      if(frozenAndInvoildDisalbed){
        finishDisabled = frozenAndInvoildDisalbed;
      }
      let titlename = this.form.roomAddress;
      let layerId = _this.$layer.iframe({
        content: {
          content: EditorShouldFinancePage, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            contractId, businessType,id,finishDisabled
          } //props
        },
        area: ["600px", "220px"],
        title: "编辑应收应付 【"+titlename+"】",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          
        }
      })
    },
    editorRealFinance(index, row) {
      let _this = this;
      let contractId = this.getId;
      let businessType = this.form.businessType;
      let contractCode = this.form.contractCode;
      let roomAddress = this.form.roomAddress;
      let financeId = row.id;
      let finishDisabled = this.finishDisabled ;//结盘 
      let frozenAndInvoildDisalbed = this.frozenAndInvoildDisalbed //冻结，作废的禁止标识
      if(frozenAndInvoildDisalbed){
        finishDisabled = frozenAndInvoildDisalbed;
      }
      let titlename = this.form.roomAddress;
      let layerId = _this.$layer.iframe({
        content: {
          content: EditorRealFinancePage, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            contractId, businessType,contractCode,roomAddress,financeId,finishDisabled
          } //props
        },
        area: ["650px", "400px"],
        title:"编辑实收实付 【"+titlename+"】",
        shadeClose: false,
        shade: false, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          
        }
      })
    },
    deletedFinance(type){
      let _this = this;
      if(type == 1){

        if(!_this.shouldClickId){
          _this.myAlert("请选择应收应付",'dangerous-icon');
          return false;
        }
        let tableData3 = this.tableData3;
        let clickData = '';
        tableData3.forEach(item => {
          if(item.id ==  _this.shouldClickId){
            clickData = item;
          }
        })
        if(clickData){
           let tbNum = clickData.tbNum;
           let salaryCloseFlag = clickData.salaryCloseFlag;
           if(tbNum > 0 && salaryCloseFlag == 0){
             _this.myConfirm("此财务有关联的业绩分成，", 'question-icon','是','否','确定要删除吗？','my-message').then(res => {
              _this.deletedFinanceData(type);
            }).catch(err => {
            })
           }else if(tbNum > 0 && salaryCloseFlag != 0){
             _this.myAlert("此财务关联的同项类业绩分成已结算，工资已封账，不允许删除！", 'question-icon').then(res => {
             
            }).catch(err => {
            })
           }else{
            _this.myConfirm("警告：【应收应付】删除后将不能还原！", 'question-icon','是','否','确定要永久删除选定的记录吗？','my-message').then(res => {
              _this.deletedFinanceData(type);
            }).catch(err => {
            })
           }
           
        }
       
      }else{
        if(!_this.realClickId){
          _this.myAlert("请选择实收实付",'dangerous-icon');
          return false;
        }

        let tableData4 = this.tableData4;
        let clickData = '';
        tableData4.forEach(item => {
          if(item.id ==  _this.realClickId){
            clickData = item;
          }
        })
        
        if(clickData){
           let beAccount = clickData.beAccount;
           let tbNum = clickData.tbNum;
           let salaryCloseFlag = clickData.salaryCloseFlag;
           let isClosingAccounts = clickData.isClosingAccounts;
           if(beAccount == 2 || beAccount == 4){
            _this.myAlert("该笔财务已被平账，不可删除！", 'question-icon').then(res => {
             
            }).catch(err => {
            })
           }
           if(tbNum > 0 && salaryCloseFlag == 0){
             _this.myConfirm("此财务有关联的业绩分成，", 'question-icon','是','否','确定要删除吗？','my-message').then(res => {
              _this.deletedFinanceData(type);
            }).catch(err => {
            })
           }else if(isClosingAccounts != 0){
            _this.myAlert("【收支】已封账不允许删除！", 'dangerous-icon').then(res => {
             
            }).catch(err => {
            })
           }else if(tbNum > 0 && salaryCloseFlag != 0){
             _this.myAlert("此财务关联的同项类业绩分成已结算，工资已封账，不允许删除！", 'question-icon').then(res => {
             
            }).catch(err => {
            })
           }else{
            _this.myConfirm("【实收实付】删除后将不能还原！", 'question-icon','是','否','确定要永久删除选定的记录吗？','my-message').then(res => {
              _this.deletedFinanceData(type);
            }).catch(err => {
            })
           }
           
        }

        
      }
    },
    deletedFinanceData(type){
      let _this = this;
      let id = null;
      let financeData = null;
      if(type == 1){
          id = this.shouldClickId;
          let tableData3 = this.tableData3;
          tableData3.forEach(item => {
            if(item.id == id){
              financeData = item;
            }
          })
      }else{
          id = this.realClickId;
          let tableData4 = this.tableData4;
          tableData4.forEach(item => {
            if(item.id == id){
              financeData = item;
            }
          })
      }
      
      if(financeData){
        if(financeData.tbNum > 0){
           _this.myConfirm("此财务有关联的业绩提成，确定要删除吗？", 'question-icon','确定','取消','','my-message').then(res => {
            _this.$layer.loading({
              shade: true,//是否显示遮罩
            });
            deletedContractFinance(id,1).then(function(response) {
              _this.$layer.closeAll("loading");
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                _this.myConfirm("删除成功！", 'success-icon').then(res => {
                    if(type == 1){
                        _this.shouldClickId = '';
                    }else{
                      _this.realClickId = '';
                    }
                    _this.getShouldAndRealListData();
                }).catch(err => {
                })
              } else if (response.status == 1){
                _this.myAlert(response.msg,'dangerous-icon');
              }
            })
          }).catch(err => {
            
          })
          return false;
        }
      }
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      deletedContractFinance(id,1).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.myConfirm("删除成功！", 'success-icon').then(res => {
              if(type == 1){
                  _this.shouldClickId = '';
              }else{
                _this.realClickId = '';
              }
              _this.getShouldAndRealListData();
          }).catch(err => {
          })
        } else if (response.status == 1){
          _this.myAlert(response.msg,'dangerous-icon');
        }
      })
    },
    getRowDataByClick1(row, column, event){
      this.shouldClickId =row.id;
    },
    getRowDataByClick2(row, column, event){
      this.realClickId =row.id;
    },
    getShouldAndRealListData() {
      let _this = this;
      let id = _this.getId;
      let form = JSON.parse(JSON.stringify(_this.form1));
      _this.$layer.loading({
        shade: true //是否显示遮罩
      });
      form.id = id;
      contractFinanceList(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data;
          let list1 = data.list1;
          let list2 = data.list2;
          if (list1 && list1.length != 0) {
            _this.tableData3 = list1;
          } else {
            _this.tableData3 = [];
          }
          if (list2 && list2.length != 0) {
            list2.forEach(item => {
              if(item.businessType2 && (item.businessType2).indexOf("X") != -1){
                let over = Number(item.over);
                let sourceGetAmount = Number(item.sourceGetAmount);
                if(over != NaN && sourceGetAmount != NaN){
                  if(over == sourceGetAmount ){
                    item.beAccount = 3;
                  }else if(over == 0 && sourceGetAmount != 0){
                    item.beAccount = 2;
                  }else if(sourceGetAmount > over){
                    item.beAccount = 4;
                  }
                } 
                
              }else{
                item.beAccount = 0;
              }
            })
            _this.tableData4 = list2;
          } else {
            _this.tableData4 = [];
          }
          _this.financeNum1 = data.num1;
          _this.financeNum2 = data.num2;
          _this.financeNum3 = data.num3;
          _this.financeNum4 = data.num4;
          _this.financeNum5 = data.num5;
          _this.financeNum6 = data.num6;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    checkWord() {
      this.form.realEstateNum = this.form.realEstateNum.replace(
        /[^a-zA-Z\u4E00-\u9FA5\d]/g,
        ""
      );
    },
    checkNum1() {
      this.form.roomArea = this.form.roomArea.replace(/[^\.\d]/g, "");
    },
    checkNum2() {
      this.form.price = this.form.price.replace(/[^\.\d]/g, "");
    },
    checkNum3() {
      this.form.unitPrice = this.form.unitPrice.replace(/[^\.\d]/g, "");
    },
    checkNum4() {
      this.form.ownerPhone = this.form.ownerPhone.replace(/[^\d]/g, "");
    },
    checkNum5() {
      this.form.customerPhone = this.form.customerPhone.replace(/[^\d]/g, "");
    },
    checkFourNum1() {
      this.form3.contractPrice = this.form3.contractPrice.replace(/[^\d]/g, "");
    },
    checkFourNum2() {
      this.form3.contractNum = this.form3.contractNum.replace(/[^\d]/g, "");
    },
    checkFourNum3() {
      this.form3.payInAdvance = this.form3.payInAdvance.replace(/[^\d]/g, "");
    },
    checkFourNum4() {
      this.form3.businessLoan = this.form3.businessLoan.replace(/[^\d]/g, "");
    },
    checkFourNum5() {
      this.form3.governmentLoan = this.form3.governmentLoan.replace(/[^\d]/g, "");
    },
    getBuyTypeName(){
      let _this = this;
      let businessTypeParams = this.businessTypeParams;
      let businessType = this.form.businessType;

      if(businessTypeParams && businessTypeParams.length != 0){
        businessTypeParams.forEach(function(item){
          if(item.id == businessType){
            if(item.name.indexOf('A') != -1){
              _this.buyTypeName = '认购编号';
              _this.houseIconType = 1; 
               _this.saleName ="售价" ;
               _this.houseAddressName = '新房地址';
               _this.houseNumName = '项目编号';
               _this.propertyName = '开发商';
               _this.saleAddressName  = '销售地址';
               _this.typeHide = false;   
            }else{
              _this.typeHide = true;  
              _this.buyTypeName = '委托编号';
              _this.houseAddressName = '房源地址';
              _this.houseNumName = '房源编号';
              _this.propertyName = '业主姓名';
              _this.saleAddressName  = '联系地址';
              if(item.name.indexOf('B') != -1){
                _this.houseIconType = 2; 
                _this.saleName ="售价" 
              }else{
                _this.houseIconType = 3;
                _this.saleName ="租价" 
              }
            }
          }
        })
      }
    },
    changeCommissionType(init){
      let commissionType = this.form.commissionType;
      let commissionTypeParams = this.commissionTypeParams;
      let commissionTypeRemarkParams1 = this.commissionTypeRemarkParams1;
      let commissionTypeRemarkParams2 = this.commissionTypeRemarkParams2;
      if(init != true){
        this.form.commissionTypeRemark = "";
      }  
      let name ="";
      commissionTypeParams.forEach(item => {
        if(item.id == commissionType){
          name = item.name;
        }  
      })
        if(name == '' || name == '时效结佣'){
          this.commissionTypeRemarkParams = JSON.parse(JSON.stringify(commissionTypeRemarkParams1));
          return false;
        }else{
          this.commissionTypeRemarkParams = JSON.parse(JSON.stringify(commissionTypeRemarkParams2));
          return false;
        }
    },
    getContractParam() {
      let _this = this;
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      let getId = this.getId;
      ediotrContract(getId).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let params = response.data.params;
          let initArr = [{ id: "0", name: " " }];
          let businessTypeParams = params.businessTypeParams;
          let financeBusinessType1Params = params.financeBusinessType1Params;
          let numParams = params.numParams;
          let roomUseParams = params.roomUseParams;
          let stateIdParams = params.stateIdParams;
          let finishSalaryParams = params.finishSalaryParams;
          let finishEndParams = params.finishEndParams;
          let payWayIdParams = params.payWayIdParams;
          let faceSignStateIdParams = params.faceSignStateIdParams;
          let loanStateIdParams =  params.loanStateIdParams;


          let commissionTypeParams = params.commissionTypeParams;
          let commissionTypeRemarkParams1 = params.commissionTypeRemarkParams1;
          let commissionTypeRemarkParams2 = params.commissionTypeRemarkParams2;
          
          _this.commissionTypeParams = [{id: "", name: " "}].concat(commissionTypeParams);
          _this.commissionTypeRemarkParams1 = [{id: "", name: " "}].concat(commissionTypeRemarkParams1);
          _this.commissionTypeRemarkParams2 = [{id: "", name: " "}].concat(commissionTypeRemarkParams2);
          _this.commissionTypeRemarkParams = [{id: "", name: " "}].concat(JSON.parse(JSON.stringify(commissionTypeRemarkParams1)));
           
          let commissionModelParams = params.commissionModelParams;
          _this.commissionModelParams = commissionModelParams;

          _this.form.commissionModel = response.data.contractBasic.commissionModel;
          _this.commissionModelParams.forEach(item=>{
            if(_this.form.commissionModel == item.id){
              if(item.name=='比例'){
                _this.unitMoneyOrProperty = false;
              }else{
                _this.unitMoneyOrProperty = true;
              }
            }
          })
          
          financeBusinessType1Params.forEach(item =>{
            let remark = item.remark;
            if(remark != null){
              item.name = item.name + remark;
            }
              
          })
          _this.financeBusinessType1Params = financeBusinessType1Params;
          _this.form.contractDate = _this.getCurrentDate();
          if (businessTypeParams) {
            businessTypeParams.forEach(item =>{
              let remark = item.remark;
              if(remark != null){
                item.name = item.name + remark;
              }
                
            })
           
            _this.businessTypeParams = initArr.concat(businessTypeParams);
          }
          if (numParams) {
            let arr = [];
            numParams.forEach(item =>{
                arr.push({id:item.name,name:item.name})
            })
            _this.numParams = initArr.concat(arr);
          }
          if (roomUseParams) {
            _this.roomUseParams = initArr.concat(roomUseParams);
          }
          if (stateIdParams) {
            _this.stateIdParams = initArr.concat(stateIdParams);
            if (stateIdParams.length != 0) {
              _this.form.stateId = stateIdParams[0].id;
            }
          }
          let salaryCloseFlag = response.data.salaryCloseFlag;
          let balanceFlag = response.data.balanceFlag;
          if(balanceFlag != 0){
            _this.balanceFlag = true;
          }
          if(finishSalaryParams && finishSalaryParams.length != 0) {
            finishSalaryParams.forEach(item => {
                if(salaryCloseFlag && (item.name =='未结佣' || item.name == '可结佣')){
                  item.disabled = true;
                }else{
                  item.disabled = false;
                }
            })
            _this.finishSalaryParams = finishSalaryParams;
          }
          if (finishEndParams && finishEndParams.length != 0) {
            _this.finishEndParams = finishEndParams;
          }
          let contractEmps = response.data.contractEmps;
          if (contractEmps && contractEmps.length != 0) {
            let arr = [];
            contractEmps.forEach(function(item){
              if(item.doBusiness == 1){
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
            _this.userList1 = arr;
          }
          let contractLeaders = response.data.contractLeaders;
          if (contractLeaders && contractLeaders.length != 0) {
            let arr = [];
            contractLeaders.forEach(function(item){
              if(item.doBusiness == 1){
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
            _this.userList2 = arr;
          }
          if(payWayIdParams && payWayIdParams.length != 0){
            _this.payWayIdParams = payWayIdParams;
            _this.form.payWayId = _this.payWayIdParams[0].id;
          }else{
            _this.payWayIdParams = [
              {id:'1',name:'全款'},{id:'2',name:'商贷'},{id:'3',name:'公贷'},{id:'4',name:'组合贷'}
            ]
            _this.form.payWayId = _this.payWayIdParams[0].id;
          }
          if(faceSignStateIdParams && faceSignStateIdParams.length != 0){
            _this.faceSignStateIdParams = faceSignStateIdParams;
          }else{
            _this.faceSignStateIdParams = [
              {id:'0',name:'空'},{id:'2',name:'网签完毕'},{id:'3',name:'关联中'},{id:'4',name:'网签已约'},{id:'4',name:'无此环节'}
            ]
          }
          if(loanStateIdParams && loanStateIdParams.length != 0){
            _this.loanStateIdParams = loanStateIdParams;
          }else{
            _this.loanStateIdParams = [
              {id:'1',name:'合批到位'},{id:'2',name:'放款完毕'}
            ]
          }

          if (params.departTree) {
            let arr = [];
            let treeData = params.departTree;
            for (let i = 0; i < treeData.length; i++) {
              arr.push({
                id: treeData[i].id,
                name: treeData[i].label.replace(/&nbsp;/g, ""),
                level: treeData[i].level,
                state:treeData[i].state
              });
            }
            _this.departTree = arr;
            _this.departEmpIdParams = arr;
            try {
            } catch (e) {}
          }
          let systemSet =  params.systemSet;
          if(systemSet && systemSet.length != 0){
            systemSet.forEach(item =>{
                if(item.paramName == '新增合同必须选择【关联房源】' && item.paramData == 'true'){
                  _this.checkContractValue1 = 'true';
                }
                if(item.paramName == '新增合同必须选择【关联客源】' && item.paramData == 'true' ){
                  _this.checkContractValue2 = 'true';
                }
                if(item.paramName == '合同【电话】必填' && item.paramData == 'true' ){
                  _this.checkContractValue3 = 'true';
                }
                if(item.paramName == '合同【身份证】必填' && item.paramData == 'true' ){
                  _this.checkContractValue4 = 'true';
                }
                if(item.paramName == '业绩分成【同步人】必填' && item.paramData == 'true'){
                  _this.checkContractValue5 = 'true';
                }
            })
          }
          //数据
          let contractBasic = response.data.contractBasic;
          for (let attr in contractBasic) {
            if (contractBasic[attr] == null) {
               contractBasic[attr] = '';
            }
          }
          
           _this.form = contractBasic;
          
          if(businessTypeParams){
             let businessType = contractBasic.businessType;
             _this.form.classifiyType = businessType;
             _this.getChildrenParamsList();
          }

          let firstHouseProcess = response.data.firstHouseProcess;
          if(firstHouseProcess){
            for (let attr in firstHouseProcess) {
              if (firstHouseProcess[attr] == null) {
                  firstHouseProcess[attr] = ''
              }
            }
             _this.form3 = firstHouseProcess;
          }  
          let firstHouseProcessUsers = response.data.firstHouseProcessUsers;
          if(firstHouseProcessUsers && firstHouseProcessUsers.length != 0){
            let arr = [];
            firstHouseProcessUsers.forEach(function(item){
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
            _this.empIdParams = arr;
          }
          
         
          _this.form1.finishSalary = _this.form.finishSalary;
          _this.form1.finishSalaryDate = _this.form.finishSalaryDate;
          _this.form1.finishEnd = _this.form.finishEnd; 
          _this.form1.finishEndDate = _this.form.finishEndDate;
          _this.form1.businessType1 = _this.financeBusinessType1Params[0].id;

         
          
          // 应收应付， 实收实付 搜索条件
          _this.changBusiness(1);

          //更换 租 售 新 ，提示字体
          _this.getBuyTypeName();

          _this.changeCommissionType(true);
         
          // 已结佣禁止
          _this.setFinishSalaryType();
          //已结盘禁用
          _this.setFinishEndType();

          //合同状态冻结，作废禁止
          _this.changeFrozenAninvoild();
          //跟进
          let processings = response.data.processings;
          
          if (processings) {
            _this.processings = processings;
          } else {
            _this.processings = [];
          }
        }
      });
    },
    getChildrenParamsList(){
      let _this = this;
      let id = _this.form.classifiyType;

      let financeBusinessType1Params = this.financeBusinessType1Params;
      let children = [];
      financeBusinessType1Params.forEach(item => {
        if(item.id == id){
          children = item.children;
        }
      })
      children = JSON.parse(JSON.stringify(children));
      let arr = [];
      if(children && children.length !=0){
        children.forEach(item =>{
          let remark = item.remark;
          if(remark != null){
            item.name = item.name + remark;
          }
            
        })
        
        _this.businessTypeParams2 = [{id:'',name:' '}].concat(children);

        try{
            _this.commission = children[0].id;
        }catch(e){

        }
      }else{
          _this.form1.businessType2 = '';
      }
    },
    showCheckCustomer() {
      let _this = this;
      let customerId = this.form.customerId;
      let test = _this.$layer.iframe({
        content: {
          content: CheckCustomerPage, //传递的组件对象
          parent: this, //当前的vue对象
          data: { customerIdParent: customerId } //props
        },
        area: ["600px", "450px"],
        title: "选择客源",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 19891110,
        cancel: () => {
          //关闭事件
        }
      });
    },
    changBusiness(init){
        let _this = this;
        let id = this.form1.businessType1;
        let financeBusinessType1Params = this.financeBusinessType1Params;
        let children = [];
        let arr = [];
         
        financeBusinessType1Params.forEach(item => {
          if(item.id == id){
            children = item.children;
          }
        })
        children = JSON.parse(JSON.stringify(children));
        if(children && children.length !=0){
          children.forEach(item =>{
            let remark = item.remark;
            if(remark != null){
              item.name = item.name + remark;
            }
              
          })
          
          _this.financeBusinessType2Params = children;
          if(init){
            _this.form1.businessType2 = children[0].id;
          }else{
              _this.form1.businessType2 = '';
          }
        }else{
           _this.form1.businessType2 = '';
        }
        
         
    },

    showCheckHouse(){
      let _this = this;
      let roomId = this.form.roomId;
      let businessType = this.form.businessType;
      let params = this.businessTypeParams;
      let houseName = null;
      if(params && params.length != 0){
        params.forEach(function(item){
            if(item.id == businessType){
              houseName = item.name;
            }
        })
      }
      if(houseName){
          if(houseName.indexOf('A') != -1){
            let test = _this.$layer.iframe({
              content: {
                content: CheckProjectPage, //传递的组件对象
                parent: this,//当前的vue对象
                data:{getHouseId:roomId}//props
              },
              area:['600px','450px'],
              title: "选择新房",
              shadeClose: false,
              shade: true,//是否显示遮罩
              zIndex:19891110,
              cancel:()=>{//关闭事件

              }
            });
          }else{
            _this.$layer.iframe({
              content: {
                content: CheckHousePage, //传递的组件对象
                parent: this,//当前的vue对象
                data:{getHouseId:roomId}//props
              },
              area:['600px','450px'],
              title: "选择二手房",
              shadeClose: false,
              shade: true,//是否显示遮罩
              zIndex:19891110,
              cancel:()=>{//关闭事件

              }
            });
          }
      }

    },
    setCheckCustomerData(elem) {
      this.form.customerId = elem.id;
      if (elem) {
        if (elem.name != null) {
          this.form.customerName = elem.name;
        } else {
          this.form.customerName = "";
        }
        if (elem.phoneNum != null) {
          this.form.customerPhone = elem.phoneNum;
        } else {
          this.form.customerPhone = "";
        }
        if (elem.customerCode != null) {
          this.form.customerCode = elem.customerCode;
        } else {
          this.form.customerCode = "";
        }
        if (elem.comment != null) {
          this.form.customerAddress = elem.comment;
        } else {
          this.form.customerAddress = "";
        }
        if (elem.idCard != null) {
          this.form.customerIdCard = elem.idCard;
        } else {
          this.form.customerIdCard = "";
        }
      }
    },
    setCheckHouseData1(elem) {
      this.form.roomId = elem.id;
      if (elem.projectAddress != null) {
        this.form.roomAddress = elem.projectAddress;
      } else {
        this.form.roomAddress = "";
      }
      if (elem.projectCode != null) {
        this.form.roomNum = elem.projectCode;
      } else {
        this.form.roomNum = "";
      }

      if(elem.prepurchaseNum != null) {
        this.form.businessNum = elem.prepurchaseNum;
      } else {
        this.form.businessNum = "";
      }
      if (elem.roomType) {
        let roomType = elem.roomType;
        if (roomType == "出租" || roomType == "租售") {
          if (elem.rentPriceArea != null) {
            this.form.unitPrice = elem.rentPriceArea;
          } else {
            this.form.unitPrice = "";
          }
          if (elem.rentPrice != null) {
            this.form.price = elem.rentPrice;
          } else {
            this.form.price = "";
          }
        } else if (roomType == "出售") {
          if (elem.salePriceArea != null) {
            this.form.unitPrice = elem.salePriceArea;
          } else {
            this.form.unitPrice = "";
          }
          if (elem.salePrice != null) {
            this.form.price = elem.salePrice;
          } else {
            this.form.price = "";
          }
        } else {
        }
      }
    },
    setCheckHouseData2(elem) {
      this.form.roomId = elem.id;
      if (elem.adress != null) {
        this.form.roomAddress = elem.adress;
      } else {
        this.form.roomAddress = "";
      }
      if (elem.roomCode != null) {
        this.form.roomNum = elem.roomCode;
      } else {
        this.form.roomNum = "";
      }

      if (elem.roomDelegateNum != null) {
        this.form.businessNum = elem.roomDelegateNum;
      } else {
        this.form.businessNum = "";
      }
      if (elem.roomType) {
        let roomType = elem.roomType;
        if (roomType == "出租" || roomType == "租售") {
          if (elem.rentPriceArea != null) {
            this.form.unitPrice = elem.rentPriceArea;
          } else {
            this.form.unitPrice = "";
          }
          if (elem.rentPrice != null) {
            this.form.price = elem.rentPrice;
          } else {
            this.form.price = "";
          }
        } else if (roomType == "出售") {
          if (elem.salePriceArea != null) {
            this.form.unitPrice = elem.salePriceArea;
          } else {
            this.form.unitPrice = "";
          }
          if (elem.salePrice != null) {
            this.form.price = elem.salePrice;
          } else {
            this.form.price = "";
          }
        } else {
        }
      }
    },
    findUserByDepart(value) {
      let _this = this;
      let id = null;
      let userList = "";
      if (value == 1) {
        id = this.form.contractEmpDepartId;
        userList = "userList1";
      } else if (value == 2) {
        id = this.form.contractLeaderDepartId;
        userList = "userList2";
      }else if(value == 3){
        id = this.form3.empDepartId;
        userList = "empIdParams";
      }
      if (id) {
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let user = data.user;
            let arr = [];
            if (user && user.length != 0) {
              if(user && user.length != 0){
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
                    arr.push(item);
                  }
                })
              }
            }

            _this[userList] = arr;
            if (value == 1) {
              _this.form["contractEmpId"] = "";
            } else if(value == 2) {
              _this.form["contractLeaderId"] = "";
            }else if(value == 3){
              _this.form3["empId"] = "";
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      }
    },
    //已结佣不能操作基础数据
    setFinishSalaryType(init){
      let finishSalary = this.form1.finishSalary;
      let finishSalaryParams = this.finishSalaryParams;
      let name = '';
      
      finishSalaryParams.forEach(item => {
        if(item.id == finishSalary){
          name = item.name;
          return false;
        }
      })
      if(name == '已结佣'){
        
        this.noFinishDisabled = false; //未结佣标识
        this.finishedDisabled = true; //已结佣标识
        if(init != true){
          let time = this.getCurrentDate();
          this.form1.finishSalaryDate = time;
        }
        
      }else{
        this.finishedDisabled = false;
        
        this.noFinishDisabled = true;
        
      }

    },  
     //已结盘不能操作基础数据
    setFinishEndType(init){
      let finishEnd = this.form1.finishEnd;
      let finishEndParams = this.finishEndParams;
      let name = '';
      
      finishEndParams.forEach(item => {
        if(item.id == finishEnd){
          name = item.name;
          return false;
        }
      })
      if(name == '已结盘'){
        
        
        if(init != true){
          let time = this.getCurrentDate();
          this.form1.finishEndDate = time;
        } 
        this.finishDisabled = true; 
      }else{
        
        this.finishDisabled = false;
      }

    },  
    getCurrentDate(){
      let date = new Date();
      let year = date .getFullYear();
      let month = date .getMonth()+1;
      if(month*1 < 10){
        month = "0"+month;
      }
      let day = date .getDate();
      if(day*1 < 10){
        day = "0"+day;
      }
      let currentDate = year +"-"+month+"-"+day;
      return currentDate;
    },
    editorFollowPage(id) {
      let roomAddress = this.form.roomAddress;
      let finishDisabled = this.finishDisabled ;//结佣的禁止标识
      let frozenAndInvoildDisalbed = this.frozenAndInvoildDisalbed;
      if(frozenAndInvoildDisalbed){
        finishDisabled = frozenAndInvoildDisalbed;
      }
      let contractName = "[" + roomAddress + "]";
      let num = this.checkHouseValue10;
      this.$refs["editorFollow"].showFollowVisible(
        this.getId,
        id,
        contractName,
        num,
        finishDisabled,
      );
    },
    
    showNewFollowPage() {
      let roomAddress = this.form.roomAddress;

      let contractName = "[" + roomAddress + "]";
      let num = this.checkHouseValue10;
      this.$refs["newFollow"].showFollowVisible(this.getId, contractName);
    },
    
    getDeletedFollowId(id) {
      this.deletedFollowId = id;
    },
    
    deletedFollow() {
      let _this = this;
      let deletedFollowId = this.deletedFollowId;
      if (deletedFollowId) {
        _this
          .myConfirm(
            "警告：合同跟进记录删除后不能还原！",
            "question-icon",
            "确认",
            "取消",
            "确定要永久删除选定的记录吗？",
            "my-message"
          )
          .then(res => {
            _this.sureDeletedFollow();
          })
          .catch(err => {});
      } else {
        this.myAlert("请选择要删除的跟进", "dangerous-icon");
      }
    },
    sureDeletedFollow() {
      let _this = this;
      let deletedFollowId = this.deletedFollowId;

      deletedFollow(deletedFollowId, 1).then(function(response) {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this.deletedFollowId = 0;
          _this.myAlert("删除成功", "success-icon").then(res => {
              _this.getFollowList();
            })
            .catch(err => {});
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    getFollowList(selectType = "") {
      let _this = this;
      let id = _this.form.id;
      let type = "写入跟进";
      if (selectType) {
        type = selectType;
      }
      let form = {id:id}
      findFollowByContractId(form).then(function(response) {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          let data = response.data.processings;
          _this.processings = data;
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    saveFormData() {
      let _this = this;
      let form = JSON.parse(JSON.stringify(_this.form));
      let roomAddress = form.roomAddress;
      let price = form.price;
      let ownerName = form.ownerName;
      let customerName = form.customerName;
      let ownerPhone = form.ownerPhone;
      let ownerId = form.ownerId;
      let contractDate = form.contractDate;
      let checkContractValue1 = this.checkContractValue1;
      let checkContractValue2 = this.checkContractValue2;
      let checkContractValue3 = this.checkContractValue3;
      let checkContractValue4 = this.checkContractValue4;
      if(!roomAddress ){
        this.myAlert("房源地址为空！",'dangerous-icon');
        return false;
      }
      if(!contractDate){
        this.myAlert("签约日为空！",'dangerous-icon');
        return false;
      }
      if(!price ){
        this.myAlert("售价不能为空！",'dangerous-icon');
        return false;
      }
      if(!ownerName){
        this.myAlert("业主姓名不能为空！",'dangerous-icon');
        return false;
      }
      if(!ownerPhone &&  checkContractValue3 == 'true'){
        this.myAlert("手机号不能为空！",'dangerous-icon');
        return false;
      }
      if(!ownerId &&  checkContractValue4 == 'true'){
        this.myAlert("身份证号号不能为空！",'dangerous-icon');
        return false;
      }
      if(!customerName ){
        this.myAlert("客户姓名不能为空！",'dangerous-icon');
        return false;
      }
      let form3 = JSON.stringify(this.form3);
      form.firstHouseProcess = form3; 
      form.finishSalary = _this.form1.finishSalary;
      form.finishSalaryDate = _this.form1.finishSalaryDate;
      form.finishEnd = _this.form1.finishEnd;
      form.finishEndDate = _this.form1.finishEndDate;
      form.businessType2 = _this.commission;
      this.$layer.loading({
        shade: true //是否显示遮罩
      });

      modifyContract(form).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          _this
            .myAlert("合同保存成功！", "success-icon")
            .then(res => {
              _this.$parent.reloadContractList(2);
              _this.cancelData();
            })
            .catch(err => {
              _this.$parent.reloadContractList(1);
              _this.cancelData();
            });
        } else if (response.status == 1) {
          _this.myAlert(response.msg, "dangouser-icon");
        }
      });
    },
    cancelData() {
      let _this = this;
      _this.$layer.close(_this.layerid);
    },
    getCurrentDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month * 1 < 10) {
        month = "0" + month;
      }
      let day = date.getDate();
      if (day * 1 < 10) {
        day = "0" + day;
      }
      let currentDate = year + "-" + month + "-" + day;
      return currentDate;
    },

    getPerformance() {
      let _this = this;
      _this.$layer.loading({
        shade: true
      });
      let id = {
        id: this.getId
      };
      achievementList(id).then(function(response) {
        _this.$layer.closeAll("loading");
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
           
            _this.$set(_this,'tableDataPerformance1',response.data.list1);
            _this.$set(_this,'tableDataPerformance2',response.data.list2);
            
            _this.$forceUpdate()
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
        _this.currentNum = 0;
      });
    },
    addPerformance(index, row) {
      let _this = this;
      this.currentPage = row;
      
      let test = _this.$layer.iframe({
        content: {
          content: Newperformance, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            activeName: "house",
            currentIndex: index,
            businessType:this.form.businessType,
            contractId:this.form.id,
            baTime:this.form.contractDate,
            businessPersonAuth:this.checkContractValue5,
            noFinishDisabled:this.noFinishDisabled,//未结佣标识

          } //props
        },
        area: ["500px", "350px"],
        title: "新增业绩",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          this.currentPage = "";
        }
      });
    },
    editorPerformance(index, row,type) {
      //type 1 业绩 2，被同步人业绩；
      let _this = this;
      let title = "修改业绩 " + "【"+row.userName+"】";
      if(type == 2){
        title = "修改被同步人业绩 【"+ ""+row.userName+"】";
      }
      let finishDisabled = this.finishDisabled ;//结佣的禁止标识
      let frozenAndInvoildDisalbed = this.frozenAndInvoildDisalbed;
      if(frozenAndInvoildDisalbed){
        finishDisabled = frozenAndInvoildDisalbed;
      }
      let test = _this.$layer.iframe({
        content: {
          content: EditorperformancePage, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            activeName: "house",
            currentIndex: index,
            businessType:this.form.businessType,
            contractId:this.form.id,
            baTime:this.form.contractDate,
            businessPersonAuth:this.checkContractValue5,
            row:row,
            noFinishDisabled:this.noFinishDisabled,//未结佣标识
            finishDisabled:finishDisabled,//已结盘标识；
            type:type
          } //props
        },
        area: ["500px", "358px"],
        title: title,
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          this.currentPage = "";
        }
      });
    },
    calculation(id) {
      let _this = this;
      let test = _this.$layer.iframe({
        content: {
          content: Calculation, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            activeName: "house",
            id:id,
          } //props
        },
        area:['550px','250px'],
        title: "总补结算详情",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件
          
        }
      });
    },
    handleSelectionChange(elemCheckbox) {
      let _this = this;
      //获取用户的选中
      _this.multipleSelection = [];
      elemCheckbox.forEach(item => {
        _this.multipleSelection.push(item.id);
      });
      _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
    },
    deletedPerforMance(){
      let _this = this;
      let arr = this.multipleSelection.length;
      if (arr) {
        _this
          .myConfirm(
            "警告：删除[人笔业绩记录]后 不能还原！",
            "question-icon",
            "确认",
            "取消",
            "确定要永久删除选定的记录吗？",
            "my-message"
          )
          .then(res => {
            _this.sureDeletedBonus();
          })
          .catch(err => {});
      } else {
        this.myAlert("请选择要删除的人笔业绩记录", "dangerous-icon");
      }
    },
    sureDeletedBonus() {
      let _this = this;
      let arr = this.multipleSelection.toString();
      let form = {id:arr,deleted:1};
      deltBonus(form).then(function(response) {
        if (response.status == 500) {
          return false;
        } else if (response.status == 0) {
          
          _this
            .myAlert("删除成功", "success-icon")
            .then(res => {
                _this.getPerformance();
            })
            .catch(err => {});
        } else if (response.status == 1) {
          let message = response.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    
    cancelData() {
      this.$layer.close(this.layerid);
    },
    changeTab(tab) {
      let _this = this;
      let label = tab.label;
      if (label == "基础信息") {
        if (!this.active1) {
          _this.getContractParam();
          this.active1 = true;
          
        }
      } else if (label == "财务收付") {
        if (!this.active2) {
          _this.getShouldAndRealListData();
          this.active2 = true;
        }
      } else if (label == "业绩分成") {
        if (!this.active3) {
          this.getPerformance();
          this.active3 = true;
        }
      } else if (label == "新房进度") {
        if (!this.active4) {
          _this.getContractParam();
          this.active4 = true;
        }
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    getRowDataByClick(row, column, event) {
      let _this = this;
      _this.currentNum = row.index + 1;
      _this.currentPage = row;
    },
   

    tableRowClassNameSpecial({ row, rowIndex }) {
      
    },
    getRowDataByClickSpecial(row, column, event) {
      
    },
   
    
    setPayname(){
        let _this = this;
        let payWayId = this.form.payWayId;
        let payWayIdParams = this.payWayIdParams;
        if(payWayIdParams && payWayIdParams.length != 0){
          payWayIdParams.forEach(function(item){
              
            if(item.id == payWayId){
              _this.payType = item.name;
            }
          })
        }
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
      
      if(this.getActiveName == 'house'){
        this.getId = callbackdata.rowid;
        this.getContractParam();
        this.active1 = true;
        this.active2 = false;
        this.active3 = false;
        this.active4 = false;
      }else if(this.getActiveName == 'finance'){
        this.getId = callbackdata.rowid;
        this.getShouldAndRealListData();
        this.active2 = true;
        this.active1 = false;
        this.active3 = false;
        this.active4 = false;
      }else if(this.getActiveName == 'key'){
        this.getId = callbackdata.rowid;
        this.getPerformance();
        this.active3 = true;
        this.active1 = false;
        this.active2 = false;
        this.active4 = false;
      }else if(this.getActiveName == 'newHouse'){
        this.getId = callbackdata.rowid;
        this.getContractParam();
        this.active4 = true;
        this.active1 = false;
        this.active2 = false;
        this.active3 = false;
      }

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
      
      if(this.getActiveName == 'house'){
        this.getId = callbackdata.rowid;
        this.getContractParam();
        this.active1 = true;
        this.active2 = false;
        this.active3 = false;
        this.active4 = false;
      }else if(this.getActiveName == 'finance'){
        this.getId = callbackdata.rowid;
        this.getShouldAndRealListData();
        this.active2 = true;
        this.active1 = false;
        this.active3 = false;
        this.active4 = false;
      }else if(this.getActiveName == 'key'){
        this.getId = callbackdata.rowid;
        this.getPerformance();
        this.active3 = true;
        this.active1 = false;
        this.active2 = false;
        this.active4 = false;
      }else if(this.getActiveName == 'newHouse'){
        this.getId = callbackdata.rowid;
        this.getContractParam();
        this.active4 = true;
        this.active1 = false;
        this.active2 = false;
        this.active3 = false;
      }
    },
  },
  mounted() {
    if(this.getActiveName == 'house'){
      this.getContractParam();
      this.active1 = true;
    }else if(this.getActiveName == 'finance'){
      this.getContractParam();
      this.getShouldAndRealListData();
      this.active1 = true;
      this.active2 = true;
    }else if(this.getActiveName == 'newHouse'){
      this.getContractParam();
      this.active1 = true;
      this.active4 = true;
    }
  },
  watch:{
    'form.roomArea':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form.roomArea = undefined;
          return;
        }
        this.form.roomArea = oldval
      } else {
        this.form.roomArea = newval.replace(/^\./g, "")
      }
    },
    'form.price':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form.price = undefined;
          return;
        }
        this.form.price = oldval
      } else {
        this.form.price = newval.replace(/^\./g, "")
      }
    },
    'form.unitPrice':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form.unitPrice = undefined;
          return;
        }
        this.form.unitPrice = oldval
      } else {
        this.form.unitPrice = newval.replace(/^\./g, "")
      }
    },
    'form3.contractPrice':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form3.contractPrice = undefined;
          return;
        }
        this.form3.contractPrice = oldval
      } else {
        this.form3.contractPrice = newval.replace(/^\./g, "")
      }
    },
    'form3.payInAdvance':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form3.payInAdvance = undefined;
          return;
        }
        this.form3.payInAdvance = oldval
      } else {
        this.form3.payInAdvance = newval.replace(/^\./g, "")
      }
    },
    'form.commissionModelRemark':function(newval, oldval){
      var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
      if (!reg.test(newval)) {
        if (newval == undefined) {
          this.form.commissionModelRemark = undefined;
          return;
        }
        this.form.commissionModelRemark = oldval
      } else {
        this.form.commissionModelRemark = newval.replace(/^\./g, "")
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
};
</script>
<style lang="scss" scoped>
@import "../../../style/contract.scss";
.information {
  width: 99%;
  background: #ccc;
  border-radius: 10px;
  border: 0;
  height: 100px;
  margin: 2px auto;
  border: 1px dashed #000;
}
.progress {
  width: 99%;
  margin: 2px auto;
  padding: 10px;
}
/deep/ .el-tabs--border-card > .el-tabs__header {
  background: #dcd9d3;
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  border-width: 2px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-style: solid;
  border-image: url("../../../images/system/border.png") 2 repeat;
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border-width: 2px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-style: solid;
  border-image: url("../../../images/system/border.png") 2 repeat;
}

/deep/ .el-tabs__nav .is-active {
  height: 24px !important;
  border: none;
}
/deep/ .el-tabs__nav-scroll {
  height: 24px !important;
}
/deep/ .el-tabs--border-card {
  background: #dcd9d3;
  border-width: 0;
}
/deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 0 !important;
}
.title {
  width: 100%;
  height: 40px;
}

.click-check{
  background:#D7E8FC !important;
}

.question-icon {
  cursor: pointer;
}
.foot-btn {
  display: inline-block;
  padding: 2px 15px;
  border: 1px solid #797979;
  cursor: pointer;
  font-size: 12px;
}
.pop-up {
  padding-bottom: 0 !important;
  .pop-up-container {
    border-width: 0px;
    padding: 0 5px;
  }
}
.padding-l-10 {
  padding-left: 10px;
}
.pop-up-container .el-select dropdown-list .el-select__tags {
  display: none;
}
.padding-t-5 {
  padding-top: 5px;
}
.padding-t-10 {
  padding-top: 10px;
}
.padding-r-29 {
  padding-right: 29px;
}
.padding-t-6 {
  padding-top: 6px;
}
.padding-t-3 {
  padding-top: 3px;
}
.padding-t-2 {
  padding-top: 2px;
}
.padding-r-2 {
  padding-right: 2px;
}
.padding-r-1 {
  padding-right: 1px;
}
.padding-r-15 {
  padding-right: 15px;
}

.footer-btn {
  padding: 5px 0;
}
.cancel-btn {
  display: inline-block;
  line-height: 18px;
  height: 20px;
  margin: 0 0px 0 5px;
  padding: 0px 12px;
  font-size: 12px;
  border: 1px solid #666;
  border-radius: 3px;
  color: #333333;
  background-color: #dfdad5;
}
/deep/ .el-textarea__inner {
  padding: 5px;
  font-size: 12px;
  border: 1px solid #aaa;
}
/deep/ .el-select .el-input .el-select__caret {
  height: 30px;
}
/deep/ .finance-table .el-table {
  height: 201px !important;
}
/deep/ .performance-table .el-table {
  height: 395px !important;
}

.el-icon-date {
  background: url(../../../images/icon.png) -143px -80px;
  width: 21px;
  height: 23px;
  position: absolute;
  right: -1px;
  z-index: 999;
  top: 1px;
}
.record-word {
  font-size: 12px;
  color: #a6a9ac;
  display: inline-block;
  padding-right: 2px;
}
/deep/ .list-content .el-table th > .cell {
  background: #dfdad5 !important;
}
.question-icon {
  background: url(../../../images/icon2.png) -367px -62px;
  width: 15px;
  height: 15px;
  display: block;
  cursor: pointer;
}
.question-icon:hover {
  background: url(../../../images/icon2.png) -367px -62px;
  width: 15px;
  height: 15px;
  display: block;
  cursor: pointer;
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
<style lang="scss">
.special-select-color .el-input__inner {
  color: #088383;
}
</style>
