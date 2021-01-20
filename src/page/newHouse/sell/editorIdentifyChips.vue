  <template>

  <div class="pop-up" style="width:100%;margin:0 10px;" >
    <div class="pop-up-container " style="height: 467px;">
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
                <el-select @change="findStreeByTown" v-model="form.districtId"    style="width:92px;" >
                  <el-option v-for="item in areas"  :label="item.label" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-r-2" >
              <el-form-item  prop="streetId" >
                <el-select v-model="form.streetId" @change="changeByStreet"    style="width:112px;" >
                  <el-option  v-for="item in streetArr" :label="item.label" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-r-2" >
              <el-form-item  prop="projectName" >
                <el-autocomplete title="上限30个字" @select="getSelectBuilding" :maxLength="30" :fetch-suggestions="querySearchAsync" style="width:127px;" v-model.trim="form.projectName"  autocomplete="off"></el-autocomplete>
              </el-form-item>
            </div>
            <div class="left padding-r-2" >
              <el-form-item  prop="buildingName" >
                <el-autocomplete   @select="getSelectSeat" :maxLength="4"  title="上限4字符"   :fetch-suggestions="getPedestalListData" style="width:81px;" v-model.trim="form.buildingName" autocomplete="off"></el-autocomplete>
              </el-form-item>
            </div>
            <div class="left padding-r-2" >
              <el-form-item  prop="buildingsUnitName" >
                <el-autocomplete @select="getSelectUnit" :maxLength="4"  title="上限4字符"  :fetch-suggestions="getUnitListData" style="width:73px;" v-model.trim="form.buildingsUnitName"   autocomplete="off"></el-autocomplete>
              </el-form-item>
            </div>
            <div class="left padding-r-2" >
              <el-form-item  prop="buildingsUfloorName" >
                <el-autocomplete  @select="getSelectHouse" @blur="checkHouuseNum" :maxLength="5" title="上限5字符"   :fetch-suggestions="getHouseListData" style="width:73px;" v-model.trim="form.buildingsUfloorName"    ></el-autocomplete>
              </el-form-item>
            </div>
            <div class="left padding-r-2" >
              <el-form-item  prop="floorCurrent" >
                <el-input @input="checkFloowNum1"  title="上限4位数" :maxLength="4"  style="width:58px;" v-model.trim="form.floorCurrent"  autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left padding-r-2" >
              <el-form-item  prop="floorAmount" >
                <el-input @input="checkFloowNum2"  title="上限4位数" :maxLength="4"   style="width:63px;" v-model.trim="form.floorAmount"  autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear" >
            <div class="left padding-r-2" style="width:40px;text-align:right;" >
              <span class="word" >户型</span>
            </div>
            <div class="left padding-r-2" >
              <el-form-item prop="room" >
                <el-select v-model="form.room"  :disabled="isSchool"      style="width:80px;" >
                  <el-option v-for="item in rentSelect.houses"  :label="item.label" :value="item.id" ></el-option>
                </el-select>
                <span class="word" >房</span>
              </el-form-item>

            </div>
            <div class="left padding-r-2" >
              <el-form-item prop="hall" >
                <el-select v-model="form.hall" :disabled="isSchool"      style="width:80px;" >
                  <el-option v-for="item in rentSelect.houses"   :label="item.name" :value="item.id" ></el-option>
                </el-select>
                <span class="word" >厅</span>
              </el-form-item>
            </div>
            <div class="left padding-r-2" >
              <el-form-item prop="wei" >
                <el-select v-model="form.wei" :disabled="isSchool"      style="width:80px;" >
                  <el-option v-for="item in rentSelect.houses"   :label="item.name" :value="item.id" ></el-option>
                </el-select>
                <span class="word" >卫</span>
              </el-form-item>
            </div>
            <div class="left padding-r-2" >
              <el-form-item prop="balcony" >
                <el-select v-model="form.balcony" :disabled="isSchool"      style="width:80px;" >
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
                <el-input :disabled="true" v-model="form.ItemNumber" title="[自动编号]" style="width:100px"></el-input>
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
                  v-model="form.buildArea"
                  @input="checkNum1"
                  title="上限10位数"
                  :maxLength="10"
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
                  v-model="form.inArea"
                  @input="checkNum2"
                  title="上限10位数"
                  :maxLength="10"
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
                <el-select v-model="form.orientation" :disabled="isSchool"      style="width:80px;" >
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
                    <el-input :disabled="true" v-model="form.customerCode"   style="width:100px;"></el-input>
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
                    <el-input :disabled="true" v-model="form.customerName" title="上限50个字" style="width:130px;" :maxLength="50"></el-input>
                  </el-form-item>
                </div>

              </div>
              <div class=" clear">

                <div class="left padding-r-2" style="width:65px;text-align:right;" >
                  <span class="word" >报备编号</span>
                </div>
                <div class="left" >
                  <el-form-item prop="NewspaperNumber" >
                    <el-input :disabled="true" v-model="form.reportNum" title="[自动编号]" style="width:130px;"></el-input>
                  </el-form-item>
                </div>
                <div class="left padding-r-2" style="width:42px;text-align:right;" >
                  <span class="word" >手机</span>
                </div>
                <div class="left" >
                  <el-form-item prop="phone" >
                    <el-input :disabled="true" v-model="form.customerPhone" title="上限15位数" style="width:130px;"   :maxLength="15"></el-input>
                  </el-form-item>
                </div>

              </div>

              <div class=" clear">

                <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                  <span class="word" >身份证</span>
                </div>
                <div class="left" >
                  <el-form-item prop="idCard" >
                    <el-input :disabled="true" v-model="form.customerCard" title="上限18个字符" style="width:302px;"   :maxLength="18"></el-input>
                  </el-form-item>
                </div>

              </div>
              <div class=" clear">

                <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                  <span class="word" >现住址</span>
                </div>
                <div class="left" >
                  <el-form-item prop="Newaddress" >
                    <el-input :disabled="true" v-model="form.currentAddress" title="上限50个字" style="width:300px;"   :maxLength="50"></el-input>
                  </el-form-item>
                </div>

              </div>
              <div class="clear " >
                <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                  <span class="word" >成交部门1</span>
                </div>
                <div class="left padding-r-2" >
                  <el-form-item  prop="dealDept1Id" >
                    <el-select @change="findUserByDepart(1)"  v-model="form.dealDept1Id"    style="width:130px;" >
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
                    <el-select   v-model="form.dealEmp1Id"    style="width:130px;" >
                      <el-option v-for="item in userList1"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
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
                    <el-select @change="findUserByDepart(2)" v-model="form.dealDept2Id"    style="width:130px;" >
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
                    <el-select   v-model="form.dealEmp2Id"    style="width:130px;" >
                      <el-option v-for="item in userList2"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
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
                    <el-select @change="findUserByDepart(3)" v-model="form.dealDept3Id"    style="width:130px;" >
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
                    <el-select v-model="form.dealEmp3Id"    style="width:130px;" >
                      <el-option v-for="item in userList3"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="right_content">
              <div class="clear" >
                <div class="list-table list-content table-border" style="width:360px;"  >
                  <el-table
                    :data="tableData"
                    empty-text=" "
                    border
                    height="185"
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
                      prop="name"
                      label="客户信息"
                      sortable
                      :show-overflow-tooltip="true"
                      align="center"
                      width="90">
                      <template slot-scope="scope">
                        <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="showEditorSaleCompany(scope.$index, scope.row)" >
                          {{ scope.row.name }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="gender"
                      label="性别"
                      align="center"
                      sortable="true"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="propertyRight"
                      label="产权"
                      align="center"
                      sortable="true"
                      :show-overflow-tooltip="true"
                      width="85">
                    </el-table-column>
                    <el-table-column
                      prop="contactStartDate"
                      label="国籍"
                      sortable="true"
                      align="center"
                      width="85">
                    </el-table-column>
                    <el-table-column
                      prop="idCard"
                      label="身份证"
                      sortable="true"
                      align="center"
                      width="85">
                    </el-table-column>
                    <el-table-column
                      prop="phone"
                      label="手机"
                      sortable="true"
                      align="center"
                      :show-overflow-tooltip="true"
                      width="100">
                    </el-table-column>

                  </el-table>
                </div>
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
                    <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd"     v-model="form.prebuyDate" style="width: 110px;"></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-r-2"  style="width:62px;text-align:right;" >
                  <span class="word" >认筹金</span>
                </div>
                <div class="left text-input" >
                  <el-form-item prop="prebuyPrice" >
                    <el-input @input="checkNum3"
                              title="上限10位数"
                              :maxLength="13" v-model="form.prebuyPrice"  style="width:110px;"  ></el-input>
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
                    <el-input @input="checkNum4"
                              title="上限10位数"
                              :maxLength="13" v-model="form.prebuyAmount"  style="width:90px;"  ></el-input>
                    <span>元</span>
                  </el-form-item>
                </div>
                <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                  <span class="word" >代理佣金</span>
                </div>
                <div class="left text-input" >
                  <el-form-item prop="delegatePrice" >
                    <el-input @input="checkNum1"
                              title="上限10位数"
                              :maxLength="13" v-model="form.delegatePrice"  style="width:110px;"  ></el-input>
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
                    <textarea
                              title="上限300个数"
                              :maxLength="300" class="remark" v-model="form.discountDesc1"  style="width:282px;height:68px;" type="textarea" min-height="108px"></textarea>
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
                    <el-input :disabled="true" v-model="form.prepurchaseNum"  style="width:90px;"  title="[自动编号]" ></el-input>
                  </el-form-item>
                </div>
                <div class="left padding-r-2"  style="width:81px;text-align:right;" >
                  <span class="word" >认购日期</span>
                </div>
                <div class="left" >
                  <el-form-item label="" label-width="0" prop="prepurchaseDate">
                    <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd"   v-model="form.prepurchaseDate" style="width: 110px;"></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="clear">
                <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                  <span class="word">认购定金</span>
                </div>
                <div class="left text-input" >
                  <el-form-item prop="prepurchasePay" >
                    <el-input @input="checkNum6"
                              title="上限10位数"
                              :maxLength="13" v-model="form.prepurchasePay"  style="width:90px;"   ></el-input>
                    <span>元</span>
                  </el-form-item>
                </div>
                <div class="left padding-r-2"  style="width:65px;text-align:right;" >
                  <span class="word">预交首付</span>
                </div>
                <div class="left text-input" >
                  <el-form-item label="" label-width="0" prop="firstAmount">
                    <el-input @input="checkNum7"
                              title="上限10位数"
                              :maxLength="13" v-model="form.firstAmount"  style="width:90px;"  ></el-input>
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
                    <el-input @input="checkNum8"
                              title="上限10位数"
                              :maxLength="13" v-model="form.totalPrice"  style="width:90px;"  ></el-input>
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
                    <textarea class="remark" v-model="form.discountDesc2"  style="width:280px;" type="textarea" min-height="111px"></textarea>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>

        </el-form>
      </div>
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
      <span class="right save-cancel-btn"  @click="cancelData">取 消</span>
      <span class="right save-cancel-btn" type="primary" @click="saveFormData">保 存</span>
    </div>
    <div class="component-container" >
      <NewCustomerMessagePage @reloadMessageList="reloadMessageList" :newCustomerMessageVisible="newCustomerMessageValue" ref="newCustomerMessage" ></NewCustomerMessagePage>
    </div>
    <div class="component-container" >
      <EdiotrCustomerMessagePage @reloadMessageList="reloadMessageList" :editorCustomerMessageVisible="editorCustomerMessageValue" ref="editorCustomerMessage" ></EdiotrCustomerMessagePage>
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
  import {rentParam} from "../../../service/houseData";
  import {rentConstParam} from "../../../utils/rentParam";
  import {findbyId} from '../../../service/getData'
  import {newHouseList,pedestalList,findUnitBySeartId,findSeatHouseNum} from '../../../service/newHouse'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {editorIdentifyChips,modifyIdentifyChips,prebuyEmpList,deletedPrebuyEmp} from "../../../service/salesControl";
  import CheckProjectPage from './checkProject'
  import CheckCustomerPage from './checkCustomer'

  import NewCustomerMessagePage from './newCustomerMessage'
  import EdiotrCustomerMessagePage from './editorCustomerMessage'
  export default {

    props:["id",'layerid',"thisindex"],
    data(){
      return{
        getId:this.id,
        checkProjectValue:false,
        checkCustomerValue:false,
        newCustomerMessageValue:false,
        editorCustomerMessageValue:false,
        tableData:[],
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
          customerCode:"",//客源编号
          buildArea:"",//面积
          inArea:"",//套内
          customerPhone:"",//手机
          customerCard:"",//身份证
          currentAddress:"", //现住址
          room:"",//房
          hall:"",//厅
          wei:"",//卫
          balcony:"",//阳台
          roomUseId:"",//用途
          ItemNumber:"",//项目编号
          orientation:"",//朝向
          roomStateId:"",//状态
          customerId:"",//客户
          customerName:"",
          reportNum:"",// 报备编号
          prebuyDate:"",//认筹日期
          dealDept1Id:"",//成交部门1
          dealDept2Id:"",//成交部门2
          dealDept3Id:"",//成交部门3
          dealEmp1Id:"",//人员1
          dealEmp2Id:"",//人员2
          dealEmp3Id:"",//人员3
          prebuyPrice:"",//认筹金
          prebuyAmount:'',//认筹总价
          delegatePrice:"",//代理佣金
          discountDesc1:"",//折扣描述
          prepurchaseNum:"",//  认购编号
          prepurchaseDate:"",//认购日期
          prepurchasePay:"",//认购定金
          firstAmount:"",//预交首付
          payWayId:"",//付款方式
          totalPrice:"",//成交总价
          discountDesc2:"",//折扣描述2
        },
      }
    },
    components: {
      CheckProjectPage,
      CheckCustomerPage,
      NewCustomerMessagePage,
      EdiotrCustomerMessagePage,
    },
    methods:{
      reloadCustomerMessage(){

      },
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
            data:{'districtId':districtId,'streetId':streetId,'projectIdParent':projectId,customerId:customerId}//props
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
        this.form.customerCode = elem.customerCode;
        this.form.customerCard = elem.customerCard;
        this.form.currentAddress = elem.currentAddress;
        this.form.customerName = elem.name;
        this.form.customerPhone = elem.customerPhone;
        this.form.reportNum = elem.reportNum;

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
        let word = queryString;
        let form = {needInfo:1,word:word,flag:'1',};
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
      //新增认筹
      saveFormData(){
        let _this =  this;
        let districtId = this.form.districtId;
        let streetId = this.form.streetId;
        let projectId  = this.form.projectId;
        let seatId = this.form.buildingId;
        let unitId = this.form.buildingsUnitId;
        let buildingsUfloorId = this.form.buildingsUfloorId;
        let floorCurrent=this.form.floorCurrent
        let floorAmount=this.form.floorAmount;
        let customerName = this.form.customerName;
        let title=""
        let projectName = this.form.projectName;

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
          this.myAlert("楼层为空！",'dangerous-icon');
          return false;
        }
        if( floorAmount === ''){
          this.myAlert("总层为空！",'dangerous-icon');
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
        modifyIdentifyChips(form).then(function(response){
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
      renderHeader(h,para) {
        return (
          h('div',{'class':'add-icon',style: "margin-left: 5px;",})
        )
      },
      addSaleCompany(column,event) {
        if (column && column.property == 'add') {
          this.$refs.newCustomerMessage.showDialog(this.form.id);
        }
      },
      showEditorSaleCompany(index,row){
        this.$refs.editorCustomerMessage.showDialog(row.id,this.form.id,row.name);
      },
      deletedSaleCompanyClick(index,row){
        let _this = this;
        _this.myConfirm("警告：删除后不能还原！","question-icon",'是','否',"确定要将选定的记录吗？").then(res => {

          _this.deleteSaleCompanyData(row.id);
        }).catch(err => {

        })
      },
      deleteSaleCompanyData(id){
        let _this = this;
        deletedPrebuyEmp(id,1).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("删除成功",'success-icon').then(res => {
              _this.reloadMessageList(2);
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      reloadMessageList(){
        let _this = this;
        let id = _this.form.id;
        let form = {id:id};
        prebuyEmpList(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.tableData = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      //获取参数
      getRentParam(){

        let _this = this;
        let id = _this.getId;
        editorIdentifyChips(id).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let initArr = [{id:"0",name:" "}];

            _this.areas = params.areas;
            if(params.areas && params.areas.length != 0){
              _this.form.districtId = params.areas[0].id;
            }


            if(params.areas){

              let arr = params.areas;
              arr.forEach(function(item){
                if(item.name == "津南"){
                  _this.form.districtId = item.id;
                }
              })
            }
            let streets = response.data.streets;
            let arr = [{id:"-1",label:"全部"}];

            _this.streetArr = arr.concat(streets);



            if(params.roomShapeParams){
              _this.roomShapeParams = initArr.concat(params.roomShapeParams);
            }
            if(params.roomDirectionParams){
              _this.Orientations = initArr.concat(params.roomDirectionParams);
            }

            //用途
            if(params.roomUseParams){
              _this.purposes = initArr.concat(params.roomUseParams);
              if(params.roomUseParams.length != 0) {
                _this.form.roomUseId = params.roomUseParams[0].id;
              }
            }

            if(params.numParams){
              _this.numParams = [{id:'',name:''}].concat(params.numParams);
            }
            //状态
            if(params.roomSaleStateIdParams){
              _this.states = initArr.concat(params.roomSaleStateIdParams);
              _this.form.roomStateId = params.roomSaleStateIdParams[0].id;
            }



            //现状
            if(params.roomStateIdParams){
              _this.roomStateIdParams = initArr.concat(params.roomStateIdParams);
            }

            //付款
            if(params.paymentIdParams){
              _this.PaymentMethods = initArr.concat(params.paymentIdParams);
            }

            if(params.departTree){
              let arr = [];
              let treeData = params.departTree
              for(let i = 0 ; i < treeData.length; i++){
                arr.push({
                  id:treeData[i].id,
                  name:treeData[i].label.replace(/&nbsp;/g,""),
                  level:treeData[i].level,
                  state:treeData[i].state
                })
              }
              _this.departTree = arr;

              let users1 = response.data.users1;
              if(users1 && users1.length != 0){
                let arr = [{id:"0",name:" "}];
                users1.forEach(function(item){
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
                _this.userList1 = arr;
              }
              let users2 = response.data.users2;
              if(users2 && users2.length != 0){
                let arr = [{id:"0",name:" "}];
                users2.forEach(function(item){
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
                _this.userList2 = arr;
              }
              let users3 = response.data.users3;
              if(users3 && users3.length != 0){
                let arr = [{id:"0",name:" "}];
                users3.forEach(function(item){
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
                _this.userList3 = arr;
              }

              let systemSet = params.systemSet;
              if(systemSet) {
                systemSet.forEach(item => {
                  if(item.paramName == '成交人1改名'){
                    _this.userName1  = item.paramData.substr(0,3);
                  }else if(item.paramName == '成交人2改名'){
                    _this.userName2  = item.paramData.substr(0,3);
                  }else if(item.paramName == '成交人3改名'){
                    _this.userName3  = item.paramData.substr(0,3);
                  }
                })
                
              }

              let prebuy = response.data.prebuy;
              if(prebuy){
                for(let attr in prebuy){
                  if(prebuy[attr] != null && prebuy[attr] != 'null'){
                    _this.form[attr] = prebuy[attr];
                  }
                }
              }
              let emps = response.data.emps;
              if(emps){
                _this.tableData = emps;
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
        this.form.projectId = '';
        this.form.buildingsUfloorId = '';
        this.form.projectName = '';
        this.form.buildingId = '';
        this.form.buildingsUnitId = '';
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
           cb(arr);
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
           cb(arr);
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
           cb(arr);
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
              let arr = [{id:"0",name:" "}];
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
              _this[userList] =  arr;
              _this.form["dealEmp"+value+"Id"] = '';
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      clearFormData(){
        this.isShow=false
        this.$nextTick(()=>{
          this.$refs.formsData.resetFields();
        })

      },
      valueChange(){

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
        let callbackdata = this.$parent.changeTitle(count-1,needlayerid);
        this.thisindex = callbackdata.thisindex;
        this.getId = callbackdata.rowid;
        this.getRentParam();
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
        let callbackdata = this.$parent.changeTitle(count+1,needlayerid);
        this.thisindex = callbackdata.thisindex;
        this.getId = callbackdata.rowid;
        this.getRentParam();
      },
    },
    mounted() {
      this.getRentParam();
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
      'form.prepurchasePay':function(newval,oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.prepurchasePay = undefined;
            return;
          }
          this.form.prepurchasePay = oldval
        } else {
          this.form.prepurchasePay = newval.replace(/^\./g, "")
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
      .list-content{
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
      
      } 
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
