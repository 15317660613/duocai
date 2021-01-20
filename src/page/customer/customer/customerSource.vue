<template>
  <div id="customer-container" class="page-container mycontailerclass1">
    <div  class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear" >
          <!--
          <div class="left padding-l-15"  >
            <el-radio  v-model="rendOrCustomer" :label="1">&nbsp;</el-radio>
          </div>
          <div class="left" > 
            客源列表
          </div>
          <div class="left p-l-10" >
            <el-radio @change="changeToCustomer" v-model="rendOrCustomer" :label="2">&nbsp;</el-radio>
          </div>
          <div class="left" >
            客对列表
          </div>
          <div class="left p-l-10"  >
            <i class="cut-icon"></i>
          </div>
          -->
          <div class="left p-l-10" >
            <el-dropdown  placement="bottom">
              <div class="border-icon clear" > 
                <span class="el-dropdown-link" >
                  新增<i class="el-icon-arrow-down m-l-5"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  <el-dropdown-item @click.native="newCustomer" icon="el-icon-plus">新增客源</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-close" @click.native="deletedCustomerClick" >删除客源</el-dropdown-item>
                </el-dropdown-menu>
              </div>  
            </el-dropdown>
          </div>
          <div class="left p-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left p-l-10" >
            <el-dropdown trigger="click" placement="bottom">
              <div class="border-icon clear" > 
                <span class="el-dropdown-link">
                  全部<i class="el-icon-arrow-down  m-l-5"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  <el-dropdown-item @click.native="findCustomer(1,1)" >今日新客</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(1,2)" >最近三天</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(1,3)" >最近七天</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(1,4)" >最近半月</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(1,5)" >最近一月</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(1,6)" >最近三月</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(1,7)" >最近半年</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(1,8)" >全部显示</el-dropdown-item>
                </el-dropdown-menu>
              </div>  
            </el-dropdown>
          </div>
          <div class="left p-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left p-l-10" >
            <el-dropdown trigger="click" placement="bottom">
              <div class="border-icon clear" > 
                <span class="el-dropdown-link">
                  求购<i class="el-icon-arrow-down  m-l-5"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  <el-dropdown-item @click.native="findCustomer(2,1)" >今日买客</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(2,2)" >最近三天</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(2,3)" >最近七天</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(2,4)" >最近半月</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(2,5)" >最近一月</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(2,6)" >最近三月</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(2,7)" >最近半年</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(2,8)" >全部显示</el-dropdown-item>
                </el-dropdown-menu>

              </div>  
            </el-dropdown>
          </div>
          <div class="left p-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left p-l-10" >
            <el-dropdown trigger="click" placement="bottom-start">
              <div class="border-icon clear" > 
                <span class="el-dropdown-link">
                  求租<i class="el-icon-arrow-down  m-l-5"></i>
                </span>
                <el-dropdown-menu slot="dropdown"  >
                  <el-dropdown-item @click.native="findCustomer(3,1)" >今日租客</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(3,2)" >最近三天</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(3,3)" >最近七天</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(3,4)" >最近半月</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(3,5)" >最近一月</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(3,6)" >最近三月</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(3,7)" >最近半年</el-dropdown-item>
                  <el-dropdown-item @click.native="findCustomer(3,8)" >全部显示</el-dropdown-item>

                </el-dropdown-menu>
              </div>  
            </el-dropdown>
          </div>
          <div class="left p-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left p-l-10" >

            <div class="left" >
              <el-dropdown trigger="click" placement="bottom">
                <div class="border-icon clear" > 
                  <span class="el-dropdown-link">
                    房型<i class="el-icon-arrow-down  m-l-5"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >

                      <el-dropdown-item @click.native="findCustomerByShape(item.id)" v-for="item in roomShapeIdParams"  >{{item.name}}</el-dropdown-item>


                    </el-dropdown-menu>
                </div>  
              </el-dropdown>
            </div>
          </div>
          <div class="left p-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left p-l-10" >
            <div class="border-icon clear" > 
              <div class="left" >
                <i class="well-icon" ></i>
              </div>
              <div class="left" >
                <div @click="findWellCustomer" >
                  优质客<i class=""  ></i>
                </div>
              </div>
            </div>  
          </div>
          <div class="left p-l-10" @click="modifyNumClick" >
            <div class="border-icon clear" > 
              <i class="editor-icon" title="选定客改自定号" ></i>
            </div>  
          </div>
          <div class="left p-l-10"  >
            <div class="border-icon clear" > 
              <i class="use-icon" title="选定客配房" @click="houseMatchCustomer" ></i>
            </div>  
          </div>
          <div class="left p-l-10"  >
            <div class="border-icon clear" > 
              <i class="change-icon" title="选定客转归属人" @click="modifyChangePeopleClick" ></i>
            </div>  
          </div>

          <div class="left p-l-10"  >
            <div class="border-icon clear" > 
              <i class="change-type-icon" title="私客转公客" @click="privateChangePublic" ></i>
            </div>  
          </div>
          <div class="left p-l-10"  >

            <i class="cut-column-icon"></i>
          </div>
          <div class="left padding-l-5 padding-t-5" >
            <div class="border-icon clear" > 
              <i class="one-Thirteen-icon" title="过滤选中"  @click="filterData" ></i>
            </div>  
          </div>
          <div class="left p-l-10"  >
            <div class="border-icon clear" > 
              <i class="leading-out-icon" title="自选列" @click="clickColumn"  ></i>
            </div>  
          </div>
          <div class="left p-l-10">
            <div class="border-icon clear" > 
              <i class="print-out-icon" title="导出" @click="exportToExcel"></i>
            </div> 
          </div>
          <div class="left p-l-10 p-t-2">
            <div class="border-icon clear" > 
              <i class="one-twelve-icon" @click="tabRemove('/home/customerSource')" ></i>
            </div> 
          </div>
          <div class="left p-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left p-l-10" >
            <div class="record-num" >
              <span class="search-word" ><</span>
              <span class="search-word" >{{currentNum}}</span>
              <span class="search-word" >/</span>
              <span class="search-word" >{{totalNum}}</span>
              <span class="search-word" >></span>
            </div>
          </div>
        </div>
      </div>
      <div class="search-container" style="max-height:94px;overflow:hidden;" >
        <el-form ref="formsData"  :model="form" >
          <div class="clear"  >
            <div class="left p-l-15" >
              <span class="des-word" >日期</span>
            </div>
            <div class="left " >
              <el-form-item label="" prop="timeMode" label-width="0">
                <el-select v-model="form.timeMode" style="width:85px;"   >
                  <el-option  label="委托日期" value="1" ></el-option>
                  <el-option  label="最后跟进日" value="2" ></el-option>
                  <el-option  label="首次录入日" value="3" ></el-option>
                  <el-option  label="全部" value="-1" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeStart" label-width="0">
                <el-date-picker size="mini" type="date"  value-format="yyyy-MM-dd" v-model="form.timeStart" style="width: 100px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeEnd" label-width="0">
                <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="form.timeEnd" style="width: 100px;"></el-date-picker>
              </el-form-item>
            </div>

            <div class="left p-l-15">
              <span class="des-word" >客制</span>
            </div>
            <div class="left" >
              <el-form-item prop="num" label-width="0">
                <el-select v-model="form.customerProperty1" style="width:70px;"   >
                  <el-option v-for="item in customerProperty1Params"  :label="item.name" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left padding-l-5" >
              <span class="des-word" >动机</span>
            </div>
            <div class="left" >
              <el-form-item>
                <CheckSelect :selectId="motiveId" :listData="motiveIdParams" style="width:70px;" ></CheckSelect>
              </el-form-item>
            </div>

            <div class="left p-l-15">
              <span class="des-word" >类型</span>
            </div>
            <div class="left">
              <el-form-item>
                <CheckSelect :selectId="roomTypeId" :listData="roomTypeIdParams" style="width:100px;" ></CheckSelect>
              </el-form-item>
            </div>

            <div class="left p-l-15">
              <span class="des-word" >排卡</span>
            </div>
            <div class="left" >
              <el-form-item prop="picard" label-width="0">
                <el-select v-model="form.picard" style="width:93px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="是" value="1" ></el-option>
                  <el-option  label="否" value="0" ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left p-l-15"  >
              <el-form-item prop="word1" label-width="0">
                <el-input  v-model.trim="form.word1" maxlength="30" title="编号/地址/客户名称/身份证号/手机号/备注" style="width:200px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>

            <div class=" left p-l-2"  >
              <i class="search-btn" @click="searchCustomerListData"  >查询</i>
            </div>
            <div class="left p-l-2"  >
              <i class="claerlys" @click="clearForm" ></i>
            </div>
            <div class="left m-t-2">
              <i :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}" @click="showSearch" ></i>
            </div>
          </div>
          
          <div id="search-content1" class="clear">
            <div class="left padding-l-15" >
              <span class="des-word" >自定</span>
            </div>
            <div class="left">
              <el-form-item>
                <CheckSelect :selectId="numId" :listData="numParams" style="width:70px;" ></CheckSelect>
              </el-form-item>
            </div>

            <div class="left p-l-10" >
              <span class="des-word" >交易</span>
            </div>
            <div class="left" >
              <el-form-item>
                <CheckSelectSpecial :selectId="tradeSelect" :listData="tradeParams" style="width:70px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left p-l-15">
              <span class="des-word" >状态</span>
            </div>
            <div class="left">
              <el-form-item>
                <CheckSelect :selectId="roomSaleStateId" :listData="customerSaleStateIdParams" style="width:70px;" ></CheckSelect>
              </el-form-item>
            </div>

            <div class="left padding-l-15"  >
              <span class="des-word" style="text-align:right;" >价格</span>
            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-input @change="checkNum5"   maxLength="13" title="上限10位数" v-model="form.price1"  style="width:82px;"   ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <span class="des-word" >-</span>

            </div>
            <div class="left " >
              <el-form-item label="" label-width="0">
                <el-input @change="checkNum6"  v-model="form.price2"  maxLength="13" title="上限10位数"  style="width:82px;"   ></el-input>
              </el-form-item>
            </div>

            <div class="left p-l-15">
              <span class="des-word" >类别</span>
            </div>
            <div class="left" >
              <el-form-item prop="num" label-width="0">
                <CheckSelect :selectId="categoryId" :listData="categoryIdParams" style="width:100px;" ></CheckSelect>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
             <span class="des-word" >重复客源</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="num" label-width="0">
                <el-select v-model="form.showRepeat"  style="width:65px;"   >
                  <el-option label=" " value="-1" ></el-option>
                  <el-option label="去重显示" value="1" ></el-option>
                  <el-option label="只看重复" value="2" ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
              <span class="des-word" >贷款</span>
            </div>
            <div class="left" >
              <el-form-item prop="num" label-width="0">
                <el-select v-model="form.loanQualification" style="width:50px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="有" value="有" ></el-option>
                  <el-option  label="无" value="无" ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
              <span class="des-word" >购房</span>
            </div>
            <div class="left" >
              <el-form-item prop="num" label-width="0">
                <el-select v-model="form.buyQualification" style="width:50px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="有" value="有" ></el-option>
                  <el-option  label="无" value="无" ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div id="search-content2" class="clear" >
            <div class="left p-l-15" >
              <span class="des-word" >地域</span>
            </div>
            <div class="left">
              <el-form-item>
                <CheckSelectSpecial :selectId="areaSelect" @findStreetByTown="findStreetByTown" :listData="areaParams" style="width:147px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item>
                <CheckSelect :selectId="streetSelectId" :listData="streetParams" style="width:140px;" ></CheckSelect>
              </el-form-item>
            </div>
            
            <div class="left padding-l-15"  >
              <span class="des-word" style="text-align:right;" >面积</span>
            </div>
            <div class="left " >
              <el-form-item prop="area1" label-width="0">
                <el-input @change="checkNum3"  maxLength="10" title="上限10位数" v-model="form.area1"   style="width:82px;"   ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <span class="des-word" >-</span>
            </div>
            <div class="left " >
              <el-form-item prop="area2"  label-width="0">
                <el-input @change="checkNum4" v-model="form.area2"  maxLength="10" title="上限10位数" style="width:82px;"   ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-15">
              <span class="des-word" >员工</span>
            </div>
            <div class="left "  >
              <el-form-item >
                <CheckSelectSpecial @findStreetByTown="finUserByDepart" :selectId="departIds" :listData="departParams" style="width:120px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" >
                <CheckSelectSpecial :selectId="userId" :listData="userParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15"  >
              <el-form-item label-width="0">
                <el-checkbox v-model="form.searchThree" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
              </el-form-item>
            </div>
            <div class="left" style="margin-left:-8px;margin-top:3px;" >
              同查二归属人
            </div>
            <div class="left padding-l-15"  >
              <el-form-item label-width="0">
                <el-checkbox v-model="form.publicAccount" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
              </el-form-item>
            </div>
            <div class="left" style="margin-left:-8px;margin-top:3px;" >
              公共账户
            </div>
            
          </div>
          
          
        </el-form>
      </div>
    </div>

    <div class="content clear" style="height:calc(100% - 145px)" >

      <div class="list-content" >

        <PlTable
          :datas="currentData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          @selection-change="handleSelectionChange"
          @row-click="getRowDataByClick"
          :row-class-name="tableRowClassName"
          :cell-class-name="rowClass"
          :cell-style="cellStyle"
          :row-height="rowHeight"
          ref="singleTable"
        >


          <template v-if="item.show" v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop == 'icon'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
            >
              <template slot-scope="scope">

                    <div  style="position:relative;" >
                      <i :class="{'private-pan-icon':scope.row.customerProperty1 == '公客','public-pan-icon':scope.row.customerProperty1 == '私客'}" ></i>
                    </div>
              </template>
            </PlTableColumn>
            <pl-table-column
              v-else-if="item.prop == 'name'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
            >
              <template slot-scope="scope">
                <div style="font-weight:700;text-algin:center;cursor:pointer;" @click="editorCustomer(scope.$index, scope.row)" >
                  {{ scope.row.name }}
                </div>
              </template>
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'customerType'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.customerType == '求租'" style="color:#009600;text-algin:center;cursor:pointer;"  >
                  {{ scope.row.customerType }}
                </div>
                <div v-if="scope.row.customerType == '求购'" style="color:#B40000;text-algin:center;cursor:pointer;"  >
                  {{ scope.row.customerType }}
                </div>
                <div v-if="scope.row.customerType == '租购'" style="color:#007878;text-algin:center;cursor:pointer;"  >
                  {{ scope.row.customerType }}
                </div>
              </template>
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'processingTime'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              slot-scope="scope"
              :fixed="item.fixed"
              :align="item.align"
            >
              

            </pl-table-column>


            <pl-table-column
              v-else
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              slot-scope="scope"
              :fixed="item.fixed"
              :align="item.align"
            >

            </pl-table-column>
          </template>
        </PlTable>
      </div>
    </div>
    <div class="component-container" >
      <ModifyNumPage @reloadCustomerList="reloadCustomerList" :modifyNumVisible="modifyNumValue"  ref="modifyNum"  ></ModifyNumPage>
    </div>
    <div class="component-container" >
      <ModifyChangePeoplePage @reloadCustomerList="reloadCustomerList" :modifyChangePeopleVisible="changePeopleValue"  ref="modifyChangePeople"  ></ModifyChangePeoplePage>
    </div>
    <div class="component-container" >
      <HouseMatchCustomerPage :houseMatchHouseVisible="houseMatchCustomerValue"  ref="houseMatchCustomerId"  ></HouseMatchCustomerPage>
    </div>
    <div class="component-container" >
      <PrivateChangePublicPage @reloadCustomerList="reloadCustomerList" :dialogVisible="privateChangePublicValue"  ref="privateChangePublicId"  ></PrivateChangePublicPage>
    </div>
  </div>
</template>


<script>

  import {findbyId} from '../../../service/getData'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {customerList,customerParams,deletedCustomer,privateChangePublicCount,customerBusinessCountList} from '../../../service/customerData'

  import {customerConstParam} from '../../../utils/customerParam'


  import { PlTable, PlTableColumn } from 'pl-table';

  import CheckSelect from '../../../components/check'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  // 新增客源
  import NewCustomerPage from './newCustomer'
  // 编辑客源
  import EditorCustomerPage from './editorCustomer'
  // 修改自定号
  import ModifyNumPage from './modifyCustomerNum'
  // 修改归属人
  import ModifyChangePeoplePage from './modifyChangePeople'
  //房配客
  import HouseMatchCustomerPage from './houseMatchCustomer'
  //私盘转公盘
  import PrivateChangePublicPage  from './privateChangePublic'
  import ColumPage from '../../../components/column'
  import {quickDate} from '../../../utils/getQuickDate'
  import layer from 'vue-layer'
  //获取数据
  export default {
    data() {
      return {
        currentPage:[],
        rendOrCustomer:1,
        upAndDown:1,
        currentNum:0,
        upAndDown:1,
        rowHeight:27,
        culumnTitle:'客源列表',
        modifyNumValue:false,
        changePeopleValue:false,
        newCustomerValue:false,
        houseMatchCustomerValue:false,
        privateChangePublicValue:false,
        columnValue:false,
        sessionStr:'customer-list',
        numId:'numId',
        areaSelect:'areaSelect',
        tradeSelect:'tradeSelect',
        roomSaleStateId:'roomSaleStateId',
        categoryId:'categoryId',
        motiveId:'motiveId',
        roomTypeId:'roomTypeId',
        streetSelectId:'streetSelectId',
        departIds:'departIds',
        userId:'userId',
        departIds1:'departIds1',
        userId1:'userId1',
        totalNum:0,
        multipleSelection:[],
        tableData:[],
        currentData:[],
        page:1,
        totalPage:0,
        roomShapeIdParams:[],
        roomShapeParams:[],
        numParams:[],
        tradeParams:[],
        customerProperty1Params:[],
        customerSaleStateIdParams:[],
        categoryIdParams:[],
        motiveIdParams:[],
        roomTypeIdParams:[],
        areaParams:[],
        streetParams:[],
        departParams:[],
        userParams:[{id:'-1',name:"全部",select:true}],
        departParams1:[],
        userParams1:[{id:'-1',name:"全部",select:true}],
        columnData:customerConstParam.customerColumn,
        loginuserdepart:'',
        loginuserid:'',
        value: null,
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        form:{
          timeMode:"2",
          timeStart:"",
          timeEnd:"",
          price1:"0",
          price2:"",
          area1:0,
          area2:"",
          loanQualification:'-1',
          buyQualification:'-1',
          customerProperty1:'-1',
          picard:"-1",
          word1:'',
          showRepeat:'-1',
          searchThree:0,
          publicAccount:1,
        },

      };
    },
    components:{
      PlTable,
      PlTableColumn,
      CheckSelectSpecial,
      CheckSelect,
      ModifyNumPage,
      ModifyChangePeoplePage,
      NewCustomerPage,
      EditorCustomerPage,
      HouseMatchCustomerPage,
      PrivateChangePublicPage,
      ColumPage,
    },
    methods: {
      showSearch(){
        let rent = document.getElementById("customer-container");

        if(this.upAndDown == 1){
          this.upAndDown = 2;

          rent.getElementsByClassName("content")[0].style.height="calc(100% - 100px)";
          rent.getElementsByClassName("el-table")[0].style.height="100%";
          rent.getElementsByClassName("ant-table-scroll")[0].style.maxHeight="100%";
          document.getElementById("search-content1").style.display = "none";
          document.getElementById("search-content2").style.display = "none";

        }else{
          this.upAndDown = 1;
          rent.getElementsByClassName("content")[0].style.height="calc(100% - 150px)";
          rent.getElementsByClassName("el-table")[0].style.height="100%";
          rent.getElementsByClassName("ant-table-scroll")[0].style.maxHeight="100%";
          document.getElementById("search-content1").style.display = "block";
          document.getElementById("search-content2").style.display = "block";
        }
      },
      changeTradeParams(){
        let tradeParams = this.tradeParams;
        let ids = [];
        tradeParams.forEach(item => {
          if(item.select){
            ids.push(item.id);
          }
        })
        ids = ids.toString();
        if(ids && ids == 1){
          this.priceName = "购价";
        }else if(ids && ids == 2){
          this.priceName = "租价";
        }else{
          this.priceName = "价格";
        }
      },
      getQuickDate(value){
        let time = quickDate.getTwoDateByDay(value);
        this.form.timeStart = time.startTime;
        this.form.timeEnd = time.endTime;
        if(value != 1){
          this.timeDisabled = true;
        }else{
          this.timeDisabled = false;
        }
      },

      checkNum1(){
        this.form.floorCurrentStart= this.form.floorCurrentStart.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.floorCurrentEnd= this.form.floorCurrentEnd.replace(/[^\.\d]/g,'');
      },
      checkNum3(){
        this.form.area1= this.form.area1.replace(/[^\.\d]/g,'');
      },
      checkNum4(){
        this.form.area2= this.form.area2.replace(/[^\.\d]/g,'');
      },
      checkNum5(){
        this.form.price1= this.form.price1.replace(/[^\.\d]/g,'');
      },
      checkNum6(){
        this.form.price2= this.form.price2.replace(/[^\.\d]/g,'');
      },
      rowClass({row, index}) {
        let className = "";
        if (row.customerProperty2 == '优质') {
          className =  'well-customer ';
        }
        if(row.customerSaleStateId == '无效'){
          className += " invoild-customer ";
        }
        if(row.isEnd === "1" && this.form.showRepeat == 2){
          className += 'frozen ';
        }
        if(this.currentPage.id &&  row.id == this.currentPage.id){
          className += 'page-check ';
        }
        
        return className;
      },
      
      getSameHouse(){
        let _this = this;
        let form = {sameOwner:0,page:1};
        customerList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            let count = response.data.count;
            _this.tableData = data;
            _this.totalNum = count;
            let len = data.length;
            _this.totalPage = Math.ceil(count/200);
            _this.currentData = data;
            _this.currentData.forEach(item=>{
              item.num = Number(item.num);
              item.area = Number(item.area.replace('㎡',''));
              item.price = Number(item.price.replace('元',''));
              item.floor = Number(item.floor);
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      clearForm(){
        let _this = this;
        this.timeDisabled = false;
        this.quick = '1';

        this.form.timeMode = "2";
        _this.getQuickDate(3);
        this.form.price1 = "0";
        this.form.price2 = "";
        this.form.area1 = 0;
        this.form.area2 = "";
        this.form.customerProperty1 = '-1';
        this.form.loanQualification = '-1';
        this.form.buyQualification  = '-1';
        this.form.picard = "-1";
        this.form.word1 = '';
        this.form.showRepeat = '-1';
        this.form.searchThree = 0;
        this.form.sameOwner = 0;
        _this.areaParams = _this.backSlect(_this.areaParams);
        _this.streetParams = _this.backSlect(_this.streetParams);
        _this.numParams = _this.backSlect(_this.numParams);
        _this.tradeParams = _this.backSlect(_this.tradeParams);
        _this.customerSaleStateIdParams = _this.setCheckSelectList(_this.customerSaleStateIdParams,"有效");
        _this.categoryIdParams = _this.backSlect(_this.categoryIdParams);
        _this.motiveIdParams = _this.backSlect(_this.motiveIdParams);
        _this.roomTypeIdParams = _this.backSlect(_this.roomTypeIdParams);
        _this.departParams = _this.backSlect(_this.departParams);
        _this.userParams = _this.backSlect(_this.userParams);
        _this.departParams1 = _this.loginuserdepart;
        _this.userParams1 = _this.loginuserid;
        
      },
      getCustomerListData(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        form.townIds = this.getSelectIdByList(this.areaParams);
        form.streetIds = this.getSelectIdByList(this.streetParams);
        let arr = [];
        this.numParams.forEach(function(item){
          if(item.select){
            arr.push(item.name);
          }
        })
        form.num = arr.toString();
        form.roomType = this.getSelectIdByList(this.tradeParams);
        form.roomSaleStateId = this.getSelectIdByList(this.customerSaleStateIdParams);
        form.category = this.getSelectIdByList(this.categoryIdParams);
        form.motiveIds = this.getSelectIdByList(this.motiveIdParams);
        form.roomTypeIds = this.getSelectIdByList(this.roomTypeIdParams);
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.numDepartId = this.getSelectIdByList(this.departParams1);
        form.numEmpId = this.getSelectIdByList(this.userParams1);

        
        form.page = this.page;
        customerList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            let count = response.data.count;
            _this.tableData = data;

            if(count){
              _this.totalNum = count;
              _this.totalPage = Math.ceil(count/200);
            };
            let currentData = _this.currentData;
            _this.currentData = currentData.concat(data);

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
          let label = document.getElementsByClassName("ant-table-scroll")[0];

          label.style.height = "100%";
          label.style.maxHeight = "100%";
          label.getElementsByClassName("el-table")[0].style.height = "100%";

        })
      },
      findCustomer(type1,type2){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        
        let timeStart = "";
        let timeEnd = "";
        if(type1 == 1){
           let tradeParams = this.tradeParams;
           tradeParams.forEach((item,index) => {
             if(index == 0){
               item.select = true;
             }else{
               item.select = false;
             }
           })
        }else if(type1 == 2){
           let tradeParams = this.tradeParams;
           tradeParams.forEach((item,index) => {
             if(index == 2){
               item.select = true;
             }else{
               item.select = false;
             }
           })
        }else if(type1 == 3){
           let tradeParams = this.tradeParams;
           tradeParams.forEach((item,index) => {
             if(index == 1){
               item.select = true;
             }else{
               item.select = false;
             }
           })
        }
        if(type2 == 1){
          let time = quickDate.getTwoByDay(0);
          timeStart = time.startTime;
          timeEnd = time.endTime;
        }else  if(type2 == 2){
          let time = quickDate.getTwoByDay(2);
          timeStart = time.startTime;
          timeEnd = time.endTime;
        }else  if(type2 == 3){
          let time = quickDate.getTwoByDay(6);
          timeStart = time.startTime;
          timeEnd = time.endTime;
        }else  if(type2 == 4){
          let time = quickDate.getTwoByDay(14);
          timeStart = time.startTime;
          timeEnd = time.endTime;
        }else  if(type2 == 5){
          let time = quickDate.getTwoByDay(29);
          timeStart = time.startTime;
          timeEnd = time.endTime;
        }else  if(type2 == 6){
          let time = quickDate.getTwoByDay(89);
          timeStart = time.startTime;
          timeEnd = time.endTime;
        }else  if(type2 == 7){
          let time = quickDate.getTwoByDay(178);
          timeStart = time.startTime;
          timeEnd = time.endTime;
        }else  if(type2 == 8){
          timeStart = "";
          timeEnd = "";
        }
        
        this.form.timeStart = timeStart;
        this.form.timeEnd = timeEnd;
        this.form.timeMode = '1';
        let form = JSON.parse(JSON.stringify(_this.form));
        form.townIds = this.getSelectIdByList(this.areaParams);
        form.streetIds = this.getSelectIdByList(this.streetParams);
        let arr = [];
        this.numParams.forEach(function(item){
          if(item.select){
            arr.push(item.name);
          }
        })
        form.num = arr.toString();
        form.roomType = this.getSelectIdByList(this.tradeParams);
        form.roomSaleStateId = this.getSelectIdByList(this.customerSaleStateIdParams);
        form.category = this.getSelectIdByList(this.categoryIdParams);
        form.motiveIds = this.getSelectIdByList(this.motiveIdParams);
        form.roomTypeIds = this.getSelectIdByList(this.roomTypeIdParams);
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.numDepartId = this.getSelectIdByList(this.departParams1);
        form.numEmpId = this.getSelectIdByList(this.userParams1);
        form.searchFlag = 1;
       
        customerList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            let count = response.data.count;
            _this.tableData = data;

            if(count != null){
              _this.totalNum = count;
              _this.totalPage = Math.ceil(count/200);
            };
            let currentData = _this.currentData;
            _this.currentData = data;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      findCustomerByShape(id){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });

        
        let form = JSON.parse(JSON.stringify(_this.form));
        form.townIds = this.getSelectIdByList(this.areaParams);
        form.streetIds = this.getSelectIdByList(this.streetParams);
        let arr = [];
        this.numParams.forEach(function(item){
          if(item.select){
            arr.push(item.name);
          }
        })
        form.num = arr.toString();
        form.roomType = this.getSelectIdByList(this.tradeParams);
        form.roomSaleStateId = this.getSelectIdByList(this.customerSaleStateIdParams);
        form.category = this.getSelectIdByList(this.categoryIdParams);
        form.motiveIds = this.getSelectIdByList(this.motiveIdParams);
        form.roomTypeIds = this.getSelectIdByList(this.roomTypeIdParams);
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.numDepartId = this.getSelectIdByList(this.departParams1);
        form.numEmpId = this.getSelectIdByList(this.userParams1);
        form.searchFlag = 1;
        form.roomShape = id;
        customerList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            let count = response.data.count;
            _this.tableData = data;

            if(count != null){
              _this.totalNum = count;
              _this.totalPage = Math.ceil(count/200);
            };
            let currentData = _this.currentData;
            _this.currentData = data;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      findWellCustomer(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        form.townIds = this.getSelectIdByList(this.areaParams);
        form.streetIds = this.getSelectIdByList(this.streetParams);
        let arr = [];
        this.numParams.forEach(function(item){
          if(item.select){
            arr.push(item.name);
          }
        })
        form.num = arr.toString();
        form.roomType = this.getSelectIdByList(this.tradeParams);
        form.roomSaleStateId = this.getSelectIdByList(this.customerSaleStateIdParams);
        form.category = this.getSelectIdByList(this.categoryIdParams);
        form.motiveIds = this.getSelectIdByList(this.motiveIdParams);
        form.roomTypeIds = this.getSelectIdByList(this.roomTypeIdParams);
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.numDepartId = this.getSelectIdByList(this.departParams1);
        form.numEmpId = this.getSelectIdByList(this.userParams1);
        form.searchFlag = 1;
        form.customerProperty2 = 1;
        customerList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.data;
            let count = response.data.count;
            _this.tableData = data;

            if(count != null){
              _this.totalNum = count;
              _this.totalPage = Math.ceil(count/200);
            };
            let currentData = _this.currentData;
            _this.currentData = data;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      searchCustomerListData(){
        this.page = 1;
        this.currentNum = 0;
        this.currentData = [];
        this.getCustomerListData();
      },
      reloadCustomerList(type,id){
        let _this = this;
        if(type ==1){
          this.searchCustomerListData();
        }else if(type == 2){
          this.searchCustomerListData();
          this.newCustomer();
        }else if(type == 3){
          let form = {id:id};
          customerList(form).then(function (response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data.data;
              let currentData = _this.currentData;
              let arr = [];
              currentData.forEach(function(item){
                if(item.id == data[0].id){
                  arr.push(data[0]);
                }else{
                  arr.push(item);
                }
              })
              _this.currentData = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }

          })
        }
      },

      //获取参数
      getRentParam(type,formData,needFlag){
        
        let _this = this;
        customerParams().then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let defaultUserList = data.defaultUserList;
            let defaultDepartId = data.defaultDepartId;
            let defaultUserId = data.defaultUserId;
            let initArr = [{id:"-1",name:"全部",select:true}];
            _this.getQuickDate(3);
            let areaList = data.areas;
            if(areaList && areaList.length != 0){
              let arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < areaList.length ; i++){
                arr.push({
                  id:areaList[i].id,
                  name:areaList[i].label,
                })
              }

              _this.areaParams = arr;
              _this.streetParams = initArr;
            }

            if(data.numParams){
              let initArrNum = [{id:"-1",name:"全部",select:true},{id:'0',name:'空',select:false}];
              data.numParams.forEach(function(item){
                initArrNum.push({
                  id:item.name,
                  name:item.name,
                  select:false,
                })
              })
              _this.numParams = initArrNum;
            }

            if(data.roomShapeIdParams){
              _this.roomShapeIdParams = data.roomShapeIdParams;
            }

            
            if(data.customerSaleStateIdParams){
              _this.customerSaleStateIdParams = _this.setCheckSelectList(data.customerSaleStateIdParams,"有效");

            }
            if(data.categoryParams){
              _this.categoryIdParams = _this.setCheckSelectList(data.categoryParams);
            }
            if(data.motiveIdParams){
              _this.motiveIdParams = _this.setCheckSelectList(data.motiveIdParams);
            }
            if(data.customerProperty1Params){
              _this.customerProperty1Params = initArr.concat(data.customerProperty1Params);
            }

            if(data.roomTypeIdParams){
              _this.roomTypeIdParams = _this.setCheckSelectList(data.roomTypeIdParams);
            }
            if(data.areaParams){
              _this.areaParams = _this.setCheckSelectList(data.areaParams);
            }

             if(data.departTree) {
              let arr = [{id:"-1",name:"全部",select:true}];
              let arr1 = [{id:"-1",name:"全部",select:true}];
              if(defaultDepartId){
                arr1 = [{id:"-1",name:"全部",select:false}];
              }else{
                 arr1 = [{id:"-1",name:"全部",select:true}];
              }
             
              let treeData = data.departTree
              for (let i = 0; i < treeData.length; i++) {
                let obj = {
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  select:false,
                  state:treeData[i].state,
                };
                let obj1 = {
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  select:false,
                };
                if(defaultDepartId && defaultDepartId == treeData[i].id ){
                  obj1.select = true;
                }
                arr.push(obj);
                arr1.push(obj1);
              }
              _this.departParams = JSON.parse(JSON.stringify(arr));
              _this.departParams1 = JSON.parse(JSON.stringify(arr1));
              _this.loginuserdepart = JSON.parse(JSON.stringify(arr1));
            }

            var arr = [{id:'-1',name:'全部',select:true}];
            if(defaultUserList && defaultUserList.length != 0){
              if(defaultUserId){
                arr = [{id:'-1',name:'全部',select:false}];
              }else{
                arr = [{id:'-1',name:'全部',select:true}];
              }
              defaultUserList.forEach(item =>{
                let obj = {
                  id:item.id,
                  name:item.name,
                  select:false
                }
                if(defaultUserId && defaultUserId == item.id){
                  obj.select = true;
                }
                arr.push(obj);
              })
            }
            _this.userParams1 = arr;
            _this.userParams = [{id:"-1",name:"全部",select:true}];
            _this.loginuserid = arr;

            let tradeParams = customerConstParam.tradeParams;
            _this.tradeParams = _this.setCheckSelectList(tradeParams);
            
            if(type == 1 && formData){
              _this.form.timeMode = "-1";
               _this.form.timeStart = "";
               _this.form.timeEnd = "";
               if(formData.check1 == '1'){
                  let customerType = formData.customerType;
                  let arr = [];
                  tradeParams.forEach(item =>{
                    if(customerType == 2 &&  item.id  == 1){
                      item.select = true;
                    }else if(customerType == 1 &&  item.id  == 2){
                      item.select = true;
                    }else if(customerType == 3 &&  item.id  == 3){
                      item.select = true;
                    }else{
                      item.select = false;
                    }
                    arr.push(item);
                  })
                  _this.tradeParams = arr;
               }
               if(formData.check2 == '1'){
                   let areaParams = _this.areaParams; 
                   let districtId = formData.districtId;
                   let arr = [];
                  areaParams.forEach(item =>{
                    if(item.id  == districtId){
                      item.select = true;
                    }else{
                      item.select = false;
                    }
                    arr.push(item);
                  })
                  _this.areaParams = arr;
               }
               if(formData.check3 == '1'){
                   let streetIds = formData.streetIds;
                   _this.streetParams = [{id:-1,name:'全部',select:false},{id:streetIds,name:'',select:true}];
                   
                   _this.findStreetByTown(streetIds);
                   
               }
               if(formData.check4 == '1'){
                   let areaVillage = formData.areaVillage;

               }
               if(formData.check5 == '1'){
                   let roomUseId = formData.roomUseId;

               }
               if(formData.check6 == '1'){
                   let roomShapeId = formData.roomShapeId;
                  
               }
               if(formData.check7 == '1'){
                  let roomTotalArea = formData.roomTotalArea;
                  _this.form.area2 = roomTotalArea;
               }
               if(formData.check8 == '1'){
                   let price1 = formData.price1;
                   if(price1){
                     _this.form.price2 = price1*1*10000;
                   }
                  
               }

            }
            if(needFlag){
              _this.linkhttpfunc(formData);
            }else{
              _this.searchCustomerListData();
            }
            
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      //查街镇
      findStreetByTown(streetIds){
        let _this = this;
        let ids = [];
        let areaParams = this.areaParams;
        if(areaParams){
          areaParams.forEach(function(item){
            if(item.select && item.id != '-1'){
              ids.push(item.id);
            }
          })
        }
        ids = ids.toString();
        findbyId(ids).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let arr = [{id:'-1',name:'全部',select:true}];
            if(streetIds){
              arr = [{id:'-1',name:'全部',select:false}];
            }
            
            if(data && data.length){
              data.forEach(function(item){
                let obj = {
                  id:item.id,
                  name:item.label,
                  select:false,
                }
                if(streetIds && streetIds == item.id){
                  obj.select = true;
                }
                arr.push(obj)
              })
            }
            _this.streetParams = arr;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      finUserByDepart(){
        let _this = this;
        let id = this.getSelectIdByList(_this.departParams);
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'-1',name:"全部",select:true}];
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
              _this.userParams = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.userParams = [{id:'-1',name:"全部",select:true}];
        }

      },
      finUserByDepart1(){
        let _this = this;
        let id = this.getSelectIdByList(_this.departParams1);
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'-1',name:"全部",select:true}];
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
              _this.userParams1 = arr;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.userParams1 = [{id:'-1',name:"全部",select:true}];
        }

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
      getRowDataByClick (row, column, event) {
        let _this = this
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        if(column.property == 'processingTime'){
          return {'background':row.processingColor}
        }
        if(column.property == 'name'){
          return {'color':"#336699"}
        }
        if(column.property == 'customerSaleStateId' && (row.customerSaleStateId == '他购' ||
          row.customerSaleStateId == '他租' ||
          row.customerSaleStateId == '我购' ||
          row.customerSaleStateId == '我租' 
        )){
          return {'color':"#B40000"}
        }
      },
      //全选
      handleSelectionChange(elemCheckbox){
        let _this = this;
        //获取用户的选中
        _this.multipleSelection = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      },


      //批量修改自定号
      modifyNumClick(){
        let select = this.multipleSelection.toString();
        if(select){
          this.$refs['modifyNum'].newModifyNum(select);
        }else{
          this.myAlert("请在【√】列选择要批量修改自定义号的客源！然后再使用此按钮批量修改自定义号",'dangerous-icon','my-message');
        }
      },
      //批量修改归属人
      modifyChangePeopleClick(){
        let select = this.multipleSelection.toString();
        if(select){
          this.$refs['modifyChangePeople'].diolagShow(select);
        }else{
          this.myAlert("请在【√】列选择要转归属人的客源！然后再使用此按钮批量转归属人",'dangerous-icon','my-message');
        }
      },

      loadmore(value){
        let page = this.page;
        let totalPage = this.totalPage;
        if(value == 1) {
          if (page < totalPage) {
            this.page ++ ;
            this.getCustomerListData();

          }
        }
      },
      //客对列表
      changeToCustomer(){
        this.$router.push('/home/customerCompare');
      },
      deletedCustomerClick(){
        let _this =  this;
        let select = this.multipleSelection.toString();
        if(select){
          _this.myConfirm("警告：删除客源会将其跟进记录一起删除！", 'question-icon','确定','取消','确定要将选定客源放入回收站吗？','my-message').then(res => {
            deletedCustomer(select,1).then(function (response) {
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                _this.myAlert("删除成功！",'success-icon').then(res =>{
                  _this.searchCustomerListData();
                });
              } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message + "！");
              }
            })
          }).catch(err => {
           
          })

        }else{
          this.myAlert("请选择要删除的客源！",'dangerous-icon');
        }
      },
      newCustomer(){
        let _this = this;
        let layerId = this.$layer.iframe({
          content: {
            content: NewCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title:'新增客源',
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件
           
          }
        });
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      editorCustomer(index, row){
        let _this = this;
        let thisifranmeisopen = false;
        let thisifranmeopennum = 0;
        _this.$store.state.layerifranme.forEach(item=>{
          if(item.thisrowid == row.id){
            try{
              document.getElementById(item.childlayerid).focus();
              thisifranmeisopen = true;
            }catch(e){

            }  
          };
          if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]){
            thisifranmeopennum = thisifranmeopennum + 1;
          }
        });
        if(thisifranmeisopen){
          return false;
        };
        if(thisifranmeopennum>=8){
          _this.myAlert("当前列表打开详情数量已达上限！",'dangerous-icon');
          return false;
        }
        debugger;
        let ids = [];
        let currentData = this.currentData;
        let len = currentData.length;
        for(let i = 0 ;  i < len; i ++){
          ids.push(currentData[i].id);
        }
        this.currentPage = row;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,mytitlename:row.name,activeName:'house',ids:ids.toString(),currentIndex:index}//props
          },
          area:['800px','560px'],
          title:'客源信息 【'+row.name+'】',
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件
            if( this.initLeft != 0){
              this.initLeft -= 10;
              this.initTop -= 30;
            }
          }
        });
        let getLayerId = document.getElementById(layerId);
        getLayerId.style.left = "calc(50% + "+this.initLeft+"px)";
        getLayerId.style.top =  "calc(50% + "+this.initTop+"px)";
        this.initLeft += 10;
        this.initTop += 30;

        document.getElementById('thimyshade').style.display = "block";
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.id,oneORmore:2};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
        _this.$refs.singleTable.setCurrentRow(row);
      },
      changeTitle(count,needlayerid,upordown){
        let _this = this;
        let mycountnum = 0;
        let currentId =  _this.currentData[count].id;
        let tableData = this.currentData;
        let saveData = this.$store.state.layerifranme;
        let hasSaveIds = [];
        saveData.forEach(item => {
            hasSaveIds.push(item.thisrowid);
        })
        hasSaveIds = hasSaveIds.toString();
        if(upordown == 1){
           let flag = 0;
           for(let i = tableData.length-1; i> 0 ; i--){
              let tempId = tableData[i].id;
              if(tempId == currentId){
                flag = 1;
                continue;
              }
              if(flag){
                  if(hasSaveIds.indexOf(tempId) == -1){
                     mycountnum = i;
                     break;
                  }
              }
           }  
        }else{
          let flag = 0;
           for(let j = 0 ,len = tableData.length;  j < len ; j++){
              let tempId1 = tableData[j].id;
              if(tempId1 == currentId){
                flag = 1;
                continue;
              }
              if(flag){
                  if(hasSaveIds.indexOf(tempId1) == -1){
                     mycountnum = j;
                     break;
                  }
              }
           }  
        }
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="客源信息 【"+_this.currentData[mycountnum].name+"】";
        _this.$refs.singleTable.setCurrentRow(_this.currentData[mycountnum]);
        let  callbackdata = {
          rowid: _this.currentData[mycountnum].id,
          thisindex:mycountnum,
        };

        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.currentData[mycountnum].id
          }
        })
        return callbackdata;
      },
      //房配客
      houseMatchCustomer(){
        let select = this.multipleSelection;
        if(select && select.length == 1){
          let currentData = this.currentData;
          let str = select.toString();
          let dataObj = null
          currentData.forEach(item =>{
            if(str.indexOf(item.id) != -1){
              dataObj = item;
            }
          })
          this.$refs["houseMatchCustomerId"].showDialogView(dataObj);
        }else{
          this.myAlert("请选择客源一条！",'dangerous-icon');
        }
        
      },
      //公转私
      privateChangePublic(){

        let select = this.multipleSelection;
        if(select && select.length !=  0){
          let currentData = this.currentData;
          let str = select.toString();
          let dataObj = null
          currentData.forEach(item =>{
            if(str.indexOf(item.id) != -1){
              dataObj = item;
            }
          })
          this.$refs["privateChangePublicId"].showDialogView(select)
        }else{
          this.myAlert("请选择客源！",'dangerous-icon');
        }
        
      },
      exportToExcel () {
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          const tHeader = ['客户','手机号','联系人','联系','身份证',
            '现住址','来源','客户编号','自定号','类别',
            '动机','国籍','现住','性别','期限',
            '动机','交易','状态','客制','分类',
            '委托方式','委托日期','地址','特点','房型',
            '贷款资格','购房资格','面积','价格','用途',
            '楼层','类型','朝向','装修','付款',
            '优惠','付佣','备注','员工1','员工2'
          ];
          const filterVal = ['name','phoneNum','contactor','comment','idCard',
            'currentAddress','source','customerCode','num','category',
            'motiveId','nationalId','livingTypeId','gender','duration',
            'customerType','customerSaleStateId','customerProperty1','customerProperty2',
            'delegateType','delegateDate','address','features','roomShapeId',
            'loanQualification','buyQualification','area','price','roomUseId',
            'floor','roomTypeId','roomDirectionId','decorateId','paymentId',
            'preferentialId','commissionId','remark','empId1','empId2'
          ];
          const list = this.currentData;
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '客源列表')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

      //自选列
      clickColumn(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: ColumPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              columnData:_this.columnData,
              sessionStr:_this.sessionStr,
            }//props
          },
          area:['350px','400px'],
          title: "自选列 【"+_this.culumnTitle+"】",
          tips: 1,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
        
        // this.$refs["addNewRent"].newRent();
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      reloadListByStorage(){
        let storage=window.localStorage;
        let titleData = storage.getItem(this.sessionStr);
        let storageColumn = JSON.parse(titleData);
        let columnData = JSON.parse(JSON.stringify(this.columnData));
        let column = null;
        if(storageColumn){
          column = storageColumn.column;
          this.rowHeight = storageColumn.height;
        }else{
          column = columnData;
        }
        let count = '';
        column.forEach(function(item,index){
          if(item.fixed){
            count = index;
          }
        })

        column.forEach(function(item,index){
          if(!count){
            item.fixed = false;
          }else {
            if (count >= index) {
              item.fixed = true;
            }
          }
        })
        this.columnData = column;
      },
      filterData(){

        let select = this.multipleSelection.toString();
        if(select){
          let arr = [];
          this.currentData.forEach(function(item){
            if(select.indexOf(item.id) != -1){
              arr.push(item);
            }
          })
          this.currentNum = 0;
          this.currentData = arr;
        }else{
          this.myAlert('请选择需要过滤的数据!','dangerous-icon');
        }
      },
      setCheckSelectList(list,init){
        let arr = [];
        let initArr = [{id:"-1",name:"全部",select:true}];
        if(init){
          initArr = [{id:"-1",name:"全部",select:false}];
        }
        list.forEach(function(item){
          if(item.id != '-1'){
            let obj = {
              id:item.id,
              name:item.name,
              select:false,
            };
            if(init && item.name == init){
              obj.select = true;
            }
            arr.push(obj);
          }  
        })
        arr = initArr.concat(arr);
        return arr;
      },
      backSlect(list){
        let arr = [];
        list.forEach(function(item){
          if(item.id != -1){
            item.select = false;
          }else{
            item.select = true;
          }
          arr.push(item);
        })
        return arr;
      },
      //业务统计跳转
      linkhttpfunc(form){
        let _this = this;
        this.$layer.loading({
          shade: true //是否显示遮罩
        });

        customerBusinessCountList(form).then(function(res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            _this.currentData = res.data.data;
            _this.totalNum = res.data.count;
          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      shadenum(){
        let _this = this;
        document.getElementById('thimyshade').style.display = "none";
        if(_this.$store.state.layerifranme.length!=0){
          _this.$store.state.layerifranme.forEach(item=>{
            if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2] && item.oneORmore==2){
              document.getElementById('thimyshade').style.display = "block";
            };
          });
        }
      },
    },
    mounted () {
      let form=this.$route.query.form;
      console.log(form);
      this.reloadListByStorage();
      this.shadenum();
      if(form){
        form = JSON.parse(form);
        if(form.needFlag){
          this.getRentParam(1,form,form.needFlag);
        }else{
          this.getRentParam(1,form);
        }
        
      }else{
        this.getRentParam(0);
      }
    },
    watch: {
      $route: {
          handler() {
            let form=this.$route.query.form;
            if(form){
              form = JSON.parse(form);
              if(form.needFlag){
                this.getRentParam(1,form,form.needFlag);
              }else{
                this.getRentParam(1,form);
              }
              
            }else{
              this.getRentParam(0);
            }
            //深度监听，同时也可监听到param参数变化
          },
          deep: true,
      },
      'form.price1':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
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
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
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
    }   
  };
</script>

<style lang="scss" scoped>

  .page-container {
    font-size: 12px;
    height: 100%;
    .padding-l-15 {
      padding-left: 15px;
    }
    .padding-l-5 {
      padding-left: 5px;
    }
    .padding-l-2 {
      padding-left: 2px;
    }
    .cut-icon {
      background: url(../../../images/system/fenge.png) -100px -90px;
      width: 3px;
      height: 23px;
      display: block;
    }
    .well-icon {
      background: url(../../../images/icon.png) -170px -5px;
      width: 20px;
      height: 20px;
      display: block;
    }

    .light-icon {
      background: url(../../../images/icon.png) -342px -2px;
      width: 20px;
      height: 20px;
      display: block;
    }

    .house-icon {
      background: url(../../../images/icon.png) -192px -2px;
      width: 20px;
      height: 20px;
      display: block;
    }

    .editor-icon {
      background: url(../../../images/icon.png) -112px -40px;
      width: 24px;
      height: 23px;
      display: block;
    }

    .use-icon {
      background: url(/static/images/icon.3def815.png) -112px -81px;
      width: 24px;
      height: 23px;
      display: block;
    }
    .public-pan-icon{
      background:url(../../../images/icon.png) -322px -230px;
      width:20px;
      height:20px;
      display:block;
    }
    .private-pan-icon{
      background:url(../../../images/icon.png) -344px -230px;
     width: 24px;
      height: 23px;
      display:block;
    }

    .change-icon {
      background: url(../../../images/icon.png) -312px -0px;
      width: 24px;
      height: 23px;
      display: block;
    }

    .user-house-icon {
      background: url(../../../images/icon.png) -140px -42px;
     width: 24px;
      height: 23px;
      display: block;
    }

    .change-type-icon {
      background: url(/static/images/icon.3def815.png) -370px -228px;
      width: 24px;
      height: 23px;
      display: block;
    }

    .leading-out-icon {
      background: url(../../../images/icon.png) -126px -118px;
      width: 24px;
      height: 23px;
      display: block;
    }

    .print-out-icon {
      background: url(../../../images/system/daochu.png) -15px -15px;
      width: 24px;
      height: 23px;
      display: block;
    }
    .key-icon{
      background:url(../../../images/icon.png) -160px -86px;
      width: 15px;
      height: 15px;
      display: block;
    }
    .special-icon{
      background:url(../../../images/icon.png) -256px -5px;
      width:20px;
      height:20px;
      display:block;
    }
    .public-icon{
      background:url(../../../images/icon.png) -160px -86px;
      width:15px;
      height:15px;
      display:block;
    }

    .print-out-icon:hover,.leading-out-icon:hover,
    .change-type-icon:hover,.user-house-icon:hover,
    .change-icon:hover,.use-icon:hover,.house-icon:hover,.light-icon:hover,.well-icon:hover,.editor-icon:hover{
      border:1px solid #828382;
    }
    .back-icon{
      background:url(../../../images/system/tuichu.png) -15px -15px;
      width:20px;
      height:20px;
      display:inline-block;
    }

    .search-btn,.claerlys{
      cursor:pointer;
    }
    /deep/ .content{
      width:100%;
      .list-content{
        height:100%!important;
        width: calc(100% - 20px);
        margin: 5px auto 0px;
        border-width: 2px;
        border-style: solid;
        border-image: url("../../../images/system/border.png")  2 repeat ;
        border-radius:5px;
        .plTableBox{
           height:100%!important;
           .ant-table-scroll{
             max-height:100%!important;
             .el-table{
               height:100%!important;
               /deep/ .el-table__body-wrapper{
                  height: calc(100% - 27px) !important;
                }
             }
           }
        }
      }
    }
	
  }
  
</style>
