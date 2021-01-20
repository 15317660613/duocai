<template>
  <div class="rent-container mycontailerclass1" style="height: 100%;">
    <div class="top-container border-black">
      <div class="search-container mycontailerclass2">
        <div class="clear" >
          <div class="left m-l-15">
            <el-radio @change="changeToOtherPage" v-model="DPorPS" :label="1"><span class="m-l-5">日比</span></el-radio>
          </div>
          <div class="left m-l-15">
            <el-radio @change="changeToOtherPage" v-model="DPorPS" :label="2"><span class="m-l-5">周比</span></el-radio>
          </div>
           <div class="left m-l-15">
            <el-radio @change="changeToOtherPage" v-model="DPorPS" :label="3"><span class="m-l-5">月比</span></el-radio>
          </div>
          <div class="left m-l-15">
            <el-radio @change="changeToOtherPage" v-model="DPorPS" :label="4"><span class="m-l-5">季比</span></el-radio>
          </div>
          <div class="left m-l-15">
            <el-radio @change="changeToOtherPage" v-model="DPorPS" :label="5"><span class="m-l-5">年比</span></el-radio>
          </div>
          <div class="left p-l-10">
            <i class="cut-icon"></i>
          </div>
          <div class="left p-l-10" style="margin-top: 1px;">
            <div class="border-icon clear" > 
             <i class="one-Thirteen-icon" title="过滤选中" @click="filterData" ></i>
            </div> 
          </div>
          <div class="left p-l-10">
            <div class="border-icon clear" > 
             <i class="one-ten-icon" title="自选列" @click="clickColumn"></i>
            </div> 
          </div>
          <div class="left p-l-10" style="margin-top: 1px;">
            <div class="border-icon clear" > 
             <i class="one-twelve-icon" title="" @click="tabRemove('/home/PerformanceStatistics')"></i>
            </div> 
          </div>
          <div class="left p-l-10">
            <i class="cut-icon"></i>
          </div>
          <div class="item p-l-10 left">
            <div class="record-num">
              <span class="search-word">&lt;</span>
              <span class="search-word">{{currentNum}}</span>
              <span class="search-word">/</span>
              <span class="search-word">{{tableData.length}}</span>
              <span class="search-word">&gt;</span>
            </div>
          </div>
        </div>
      </div>

      <div class="search-container" >
        <el-form ref="formsData" :model="form">
          <div class="clear">
            <div class="left" style="padding-left:15px">
              <span class="des-word">角度</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" >
                <el-select v-model="form.userType" @change="userTypefunc"  style="width:70px;">
                  <el-option v-for="item in userTypeparams" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            
            <!-- 部门 -->
            <div v-if="form.userType==1" class="left">
              <el-form-item label label-width="0" >
                <el-select v-model="form.userIds1" @change="userIds1func" style="width:100px;">
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option v-for="item in userIds1params" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-if="form.userType==1" class="left">
              <el-form-item label label-width="0" prop="stateUser4">
                <CheckSelectSpecial
                  :selectId="stateUser4"
                  :listData="myparams3"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <!-- 人员 -->
            <div v-if="form.userType==2" class="left">
              <el-form-item label label-width="0" prop="stateUser1">
                <CheckSelectSpecial
                  @findStreetByTown="finUserState"
                  :selectId="stateUser1"
                  :listData="myparams5"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div v-if="form.userType==2" class="left">
              <el-form-item label label-width="0" prop="stateUser2">
                <CheckSelectSpecial
                  :selectId="stateUser2"
                  :listData="myparams6"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <!-- 职位 -->
            <div v-if="form.userType==3" class="left">
              <el-form-item label label-width="0" prop="stateUser3">
                <CheckSelectSpecial
                  :selectId="stateUser3"
                  :listData="myparams7"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:15px">
              <span class="des-word">时期</span>
            </div>
            <div class="left " v-if="DPorPS==1">
              <div class="left">
                <el-form-item label="" label-width="0">
                  <el-select @change="getQuickDate1" v-model="myparamday"  placeholder="" style="width:80px;"   >
                    <el-option  label="全部" value="-1" ></el-option>
                    <el-option  label="今天" value="2" ></el-option>
                    <el-option  label="昨天" value="3" ></el-option>
                    <el-option  label="本周" value="4" ></el-option>
                    <el-option  label="本月" value="5" ></el-option>
                    <el-option  label="上月" value="6" ></el-option>
                    <el-option  label="3天" value="7" ></el-option>
                    <el-option  label="7天" value="8" ></el-option>
                    <el-option  label="10天" value="9" ></el-option>
                    <el-option  label="30天" value="10" ></el-option>
                    <el-option  label="100天" value="11" ></el-option>
                    <el-option  label="自定义" value="1" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="left p-l-5">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="date"
                    :disabled="timeDisabled"  
                    value-format="yyyy-MM-dd"
                    v-model="form.timeStart"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>

              <div class="left p-l-5">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="date"
                    :disabled="timeDisabled"  
                    value-format="yyyy-MM-dd"
                    v-model="form.timeEnd"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>

            <div class="left " v-if="DPorPS==2">
              <div class="left">
                <el-form-item label="" label-width="0">
                  <el-select @change="getQuickDate2" v-model="myparamweek"  placeholder="" style="width:85px;"   >
                    <el-option  label="全部" value="-1" ></el-option>
                    <el-option  label="本周" value="2" ></el-option>
                    <el-option  label="上周" value="3" ></el-option>
                    <el-option  label="本月" value="4" ></el-option>
                    <el-option  label="本年" value="5" ></el-option>
                    <el-option  label="近3周" value="6" ></el-option>
                    <el-option  label="近10周" value="7" ></el-option>
                    <el-option  label="近30周" value="8" ></el-option>
                    <el-option  label="自定义" value="1" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="left p-l-5">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="date"
                    :disabled="timeDisabled"  
                    value-format="yyyy-MM-dd"
                    v-model="form.timeStart"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>

              <div class="left p-l-5">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="date"
                    :disabled="timeDisabled"  
                    value-format="yyyy-MM-dd"
                    v-model="form.timeEnd"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>

            <div class="left " v-if="DPorPS==3">
              <div class="left">
                <el-form-item label="" label-width="0">
                  <el-select @change="getQuickDate3" v-model="myparammonth"  placeholder="" style="width:85px;"   >
                    <el-option  label="全部" value="-1" ></el-option>
                    <el-option  label="本月" value="2" ></el-option>
                    <el-option  label="上月" value="3" ></el-option>
                    <el-option  label="近3月" value="4" ></el-option>
                    <el-option  label="近6月" value="5" ></el-option>
                    <el-option  label="近12月" value="6" ></el-option>
                    <el-option  label="自定义" value="1" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="left p-l-5">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="month"
                    :disabled="timeDisabled"  
                    value-format="yyyy-MM"
                    v-model="form.timeStart"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>

              <div class="left p-l-5">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="month"
                    :disabled="timeDisabled"  
                    value-format="yyyy-MM"
                    v-model="form.timeEnd"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>

            <div class="left " v-if="DPorPS==4">
              <div class="left">
                <el-form-item label="" label-width="0">
                  <el-select @change="getQuickDate4" v-model="myparamseason"  placeholder="" style="width:85px;"   >
                    <el-option  label="全部" value="-1" ></el-option>
                    <el-option  label="本季" value="2" ></el-option>
                    <el-option  label="上季" value="3" ></el-option>
                    <el-option  label="今年" value="4" ></el-option>
                    <el-option  label="近4季" value="5" ></el-option>
                    <el-option  label="上年" value="6" ></el-option>
                    <el-option  label="近3年" value="7" ></el-option>
                    <el-option  label="自定义" value="1" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              
              <div class="left p-l-5">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="year"
                    :disabled="timeDisabled"
                    value-format="yyyy"
                    v-model="form.timeStart"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>

              <div class="left">
                <el-form-item label label-width="0">
                  <el-select :disabled="seasondisabled" v-model="quarter1"  style="width:60px;"   >
                    <el-option  label="一季" value="1" ></el-option>
                    <el-option  label="二季" value="2" ></el-option>
                    <el-option  label="三季" value="3" ></el-option>
                    <el-option  label="四季" value="4" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="left p-l-5">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="year"
                    :disabled="timeDisabled"
                    value-format="yyyy"
                    v-model="form.timeEnd"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>

              <div class="left">
                <el-form-item label label-width="0">
                  <el-select :disabled="seasondisabled" v-model="quarter2"  style="width:60px;"   >
                    <el-option  label="一季" value="1" ></el-option>
                    <el-option  label="二季" value="2" ></el-option>
                    <el-option  label="三季" value="3" ></el-option>
                    <el-option  label="四季" value="4" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>


            <div class="left " v-if="DPorPS==5">
              <div class="left">
                <el-form-item label="" label-width="0">
                  <el-select @change="getQuickDate5" v-model="myparamyear"  placeholder="" style="width:85px;"   >
                    <el-option  label="全部" value="-1" ></el-option>
                    <el-option  label="本年" value="2" ></el-option>
                    <el-option  label="上年" value="3" ></el-option>
                    <el-option  label="近3年" value="4" ></el-option>
                    <el-option  label="近10年" value="5" ></el-option>
                    <el-option  label="自定义" value="1" ></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="left">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="year"
                    :disabled="timeDisabled"
                    value-format="yyyy"
                    v-model="form.timeStart"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>

              <div class="left">
                <el-form-item label label-width="0" >
                  <el-date-picker
                    type="year"
                    :disabled="timeDisabled"
                    value-format="yyyy"
                    v-model="form.timeEnd"
                    style="width: 90px;"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>

            

            <div class=" left p-l-5" style="padding-top:1px;" >
              <i class="search-btn" @click="searchTableData">查询</i>
            </div>
            <div class="left" style="padding-top:3px;padding-left: 2px;" >
              <i class="claerlys" @click="clearForm" ></i>
            </div>
            <div class="left p-l-5">
              <el-form-item label label-width="0" >
                <span style="color: #999;">(修改条件时，数字点击链接同变化)</span>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear mycontent">
      <div class="list-content">
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          :header-cell-class-name="headerRowClass"
          @row-click="getRowDataByClick"
          :row-class-name="tableRowClassName"
          :row-height="rowHeight"
        >
            <template v-if="item.show" v-for="(item,index) in columnData">
              <PlTableColumn
                v-if="item.prop == 'check'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :type="item.type"
                :ref="item.ref"
                :sortable="item.sortable" 
                :align="item.align"
                >
              </PlTableColumn>
              <PlTableColumn
                v-else-if="item.prop == 'myindex'||item.prop == 'time'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
                :align="item.align"
                :sortable="item.sortable"
                >
              </PlTableColumn>
              <PlTableColumn
                v-else-if="item.prop == 'name'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
                :align="item.align"
                :sortable="item.sortable"
                >
                <template slot="header">
                  <span v-if="form.userType==1">{{item.label1}}</span>
                  <span v-if="form.userType==2">{{item.label2}}</span>
                  <span v-if="form.userType==3">{{item.label3}}</span>
                </template>
              </PlTableColumn>
              <PlTableColumn
                v-else-if="item.level==2"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
                :align="item.align"
                :sortable="item.sortable"
                >
                <template slot="header" v-if="item.prop=='totalfive'||item.prop=='totalsix'||item.prop=='totalseven'||item.prop=='totaleight'">
                  <p>{{item.label1}}</p>
                  <span>{{item.label2}}</span>
                </template>
                <template slot="header" v-else>
                  <span v-if="">{{item.label}}</span>
                </template>
                <template v-for="(item1,index) in item.child">
                  <PlTableColumn>
                    <PlTableColumn
                      :prop="item1.prop"
                      :label="item1.label"
                      :width="item1.width"
                      :fixed="item1.fixed"
                      :align="item1.align"
                      >
                      <template slot="header" v-if="!item1.link">
                        <span v-if="item1.label.substring(0, 1) == '0'">{{item1.label}}</span>
                        <span v-else  @click="linkclickfunc(item1.linkhttp,item1.thisindex,'')" style="color: #336699;cursor: pointer;">{{item1.label}}</span>
                      </template>
                      <template slot="header" v-if="item1.link">
                        <span v-if="item1.label.substring(0, 1) == '0'">{{item1.label}}</span>
                        <div v-else>
                          <el-popover
                            placement="bottom-start"
                            width="130"
                            trigger="hover"
                            popper-class='mypopoverclass'
                            >
                            <p v-for="ii in item1.link" @click="linkclickfunc(ii.linkhttp,item1.thisindex,'')" style="color: #336699;cursor: pointer;line-height: 28px;white-space: pre;">
                              <span>{{ii.linkname}}</span>    <i class="fourteen-four-icon" style="display: inline-block;"></i>
                            </p>
                            <span slot="reference" style="color: #336699;cursor: pointer;">{{item1.label}}</span>
                          </el-popover>
                        </div>
                      </template>
                      <template slot-scope="scope">
                        <div  v-if="!item1.link">
                          <span v-if="scope.row[item1.prop] == '0'||scope.row[item1.prop] == '0.00'">{{scope.row[item1.prop]}}</span>
                          <span v-else  @click="linkclickfunc(item1.linkhttp,item1.thisindex,scope.row)" style="color: #336699;cursor: pointer;">{{scope.row[item1.prop]}}</span>
                        </div>
                        <div v-if="item1.link">
                          <span v-if="scope.row[item1.prop] == '0'||scope.row[item1.prop] == '0.00'">{{scope.row[item1.prop]}}</span>
                          <div v-else>
                            <el-popover
                              placement="bottom-start"
                              width="130"
                              trigger="hover"
                              popper-class='mypopoverclass'
                              >
                              <p v-for="ii in item1.link" @click="linkclickfunc(ii.linkhttp,item1.thisindex,scope.row)" style="color: #336699;cursor: pointer;line-height: 28px;white-space: pre;">
                                <span>{{ii.linkname}}</span>    <i class="fourteen-four-icon" style="display: inline-block;"></i>
                              </p>
                              <span slot="reference" style="color: #336699;cursor: pointer;">{{scope.row[item1.prop]}}</span>
                            </el-popover>
                          </div>
                        </div>
                      </template>
                    </PlTableColumn>
                  </PlTableColumn>
                </template>
              </PlTableColumn>

              <PlTableColumn
                v-else-if="item.level==3"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
                :align="item.align"
                >
                <template slot="header">
                  <p>{{item.label1}}</p>
                  <span>{{item.label2}}</span>
                  <span @click="expendOrClose(item)" :class="{'el-icon-caret-right':!item.isClose,'el-icon-caret-bottom':item.isClose}"></span>
                </template>
                <template v-if="item1.show" v-for="(item1,index) in item.child">
                  <PlTableColumn
                    :prop="item1.prop"
                    :label="item1.label"
                    :width="item1.width"
                    :fixed="item1.fixed"
                    :align="item1.align"
                    :sortable="item1.sortable"
                    >
                    <template v-for="(item2,index) in item1.child">
                      <PlTableColumn
                        :prop="item2.prop"
                        :label="item2.label"
                        :width="item2.width"
                        :fixed="item2.fixed"
                        :align="item2.align"
                        >
                        <template slot="header" v-if="!item2.link">
                          <span v-if="item2.label.substring(0, 1) == '0'">{{item2.label}}</span>
                          <span v-else  @click="linkclickfunc(item2.linkhttp,item2.thisindex,'')" style="color: #336699;cursor: pointer;">{{item2.label}}</span>
                        </template>
                        <template slot="header" v-if="item2.link">
                          <span v-if="item2.label.substring(0, 1) == '0'">{{item2.label}}</span>
                          <div v-else>
                            <el-popover
                              placement="bottom-start"
                              width="130"
                              trigger="hover"
                              popper-class='mypopoverclass'
                              >
                              <p v-for="ii in item2.link" @click="linkclickfunc(ii.linkhttp,item2.thisindex,'')" style="color: #336699;cursor: pointer;line-height: 28px;white-space: pre;">
                                <span>{{ii.linkname}}</span>    <i class="fourteen-four-icon" style="display: inline-block;"></i>
                              </p>
                              <span slot="reference" style="color: #336699;cursor: pointer;">{{item2.label}}</span>
                            </el-popover>
                          </div>
                        </template>
                        <template slot-scope="scope">
                          <div  v-if="!item2.link">
                            <span v-if="scope.row[item2.prop] == '0'||scope.row[item2.prop] == '0.00'">{{scope.row[item2.prop]}}</span>
                            <span v-else  @click="linkclickfunc(item2.linkhttp,item2.thisindex,scope.row)" style="color: #336699;cursor: pointer;">{{scope.row[item2.prop]}}</span>
                          </div>
                          <div v-if="item2.link">
                            <span v-if="scope.row[item2.prop] == '0'||scope.row[item2.prop] == '0.00'">{{scope.row[item2.prop]}}</span>
                            <div v-else>
                              <el-popover
                                placement="bottom-start"
                                width="130"
                                trigger="hover"
                                popper-class='mypopoverclass'
                                >
                                <p v-for="ii in item2.link" @click="linkclickfunc(ii.linkhttp,item2.thisindex,scope.row)" style="color: #336699;cursor: pointer;line-height: 28px;white-space: pre;">
                                  <span>{{ii.linkname}}</span>    <i class="fourteen-four-icon" style="display: inline-block;"></i>
                                </p>
                                <span slot="reference" style="color: #336699;cursor: pointer;">{{scope.row[item2.prop]}}</span>
                              </el-popover>
                            </div>
                          </div>
                        </template>
                      </PlTableColumn>
                    </template>
                  </PlTableColumn>
                </template>
              </PlTableColumn>
            </template>
          </PlTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import CheckSelectSpecial from "../../../components/checkSpecial";
import { PlTable, PlTableColumn } from "pl-table";
import ColumPage from "../../../components/columnMoreHeader";
import {quickDate} from '../../../utils/getQuickDate';
import { orgnizetionParam } from "../../../utils/orgnizeparam";
import {departperson} from "../../../service/organizeDate";
import { PerformanceStatisticsParam } from "../../../utils/PerformanceStatisticsList";
import { statisticsGetParams,statisticsAchievementCount } from "../../../service/BusinessStatisticsList";
export default {
  data() {
    return {
      DPorPS:1,
      multipleSelection:[],
      tableData:[],
      columnData:PerformanceStatisticsParam.PerformanceStatisticsList,
      culumnTitle: "业绩统计",
      rowHeight:27,
      currentNum:0,
      stateUser1:'stateUser1',
      stateUser2:'stateUser2',
      stateUser3:'stateUser3',
      stateUser4:'stateUser4',
      sessionStr: "PerformanceStatisticsList-list",
      myparams3:[],
      myparams5:[],
      myparams6:[],
      myparams7:[],
      timeDisabled:true,
      seasondisabled:true,
      myparams3all:{},
      myparamday:'-1',
      myparamweek:'-1',
      myparammonth:'-1',
      myparamseason:'-1',
      myparamyear:'-1',
      quarter1:'1',
      quarter2:'1',
      form:{
        userType:2,
        userIds1:'-1',
        userIds2:'-1',
        timeStart:'',
        timeEnd:'',
      },
      linkform:{
        id:'',
        colType:'',
        needFlag:true,
        time:'',
        timeMode:'日',
        userType:2,
        timeStart:'',
        timeEnd:'',
        userIds1:'',
        userIds2:'',
        userType:'',
      },
      userTypeparams:[
        { id: 1, name: "部门", select: false },
        { id: 2, name: "个人", select: false },
        { id: 3, name: "职位", select: false },
      ],
      userIds1params:[
        { id: 1, name: "一级部门", select: false },
        { id: 2, name: "二级部门", select: false },
        { id: 3, name: "三级部门", select: false },
        { id: 4, name: "四级部门", select: false },
        { id: 5, name: "五级部门", select: false },
      ],
    };
  },
  components: {
    ColumPage,
    PlTable,
    PlTableColumn,
    CheckSelectSpecial,
  },
  methods: {
    getParamsData() {
      let _this = this;
      this.$layer.loading({
        shade: true //是否显示遮罩
      });

      statisticsGetParams().then(function(res) {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status == 0) {
          let arr1 = [{ id: "-1", name: "全部", select: true }];
          let data = res.data;
          let treeData = data.deptTree;
          for (let i = 0; i < treeData.length; i++) {
            arr1.push({
              id: treeData[i].id,
              name: treeData[i].label.replace(/&nbsp;/g, ""),
              level: treeData[i].level,
              select: false,
              state: treeData[i].state,
            });
          }
          _this.myparams5 = arr1;

          _this.myparams3all.dept1 = data.dept1;
          _this.myparams3all.dept2 = data.dept2;
          _this.myparams3all.dept3 = data.dept3;
          _this.myparams3all.dept4 = data.dept4;
          _this.myparams3all.dept5 = data.dept5;
          _this.myparams3 = [{ id: "-1", name: "全部", select: true }].concat(_this.myparams3all.dept1,_this.myparams3all.dept2,_this.myparams3all.dept3,_this.myparams3all.dept4,_this.myparams3all.dept5);

          let arr2 = [{ id: "-1", name: "全部", select: true }];
          data.staffs.forEach(item=>{
            arr2.push({
              id:item.id,
              name:item.name.replace(/&nbsp;/g, ""),
              select:false,
            })
          })
          _this.myparams7 = arr2;

          _this.form.timeMode = '日';
          _this.linkform.timeMode = '日';
          _this.myparamday = '4';
          _this.getQuickDate1(4);

          _this.myparams6 = [{ id: "-1", name: "全部", select: true }];
          _this.searchTableData();
        } else if (res.status == 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    searchTableData(){
      let _this = this;
      this.$layer.loading({
        shade: true //是否显示遮罩
      });
      let form = JSON.parse(JSON.stringify(_this.form));

      if(form.userType == 1){
        form.userIds2 = _this.getSelectIdByList(_this.myparams3).toString();
      };
      if(form.userType == 2){
        form.userIds1 = _this.getSelectIdByList(_this.myparams5).toString();
        form.userIds2 = _this.getSelectIdByList(_this.myparams6).toString();
      };
      if(form.userType == 3){
        form.userIds1 = _this.getSelectIdByList(_this.myparams7).toString();
        form.userIds2 = '';
      }

      if(_this.DPorPS == 4){
        let str1 = _this.setMonth1(_this.quarter1);
        let str2 = _this.setMonth2(_this.quarter2);
        form.timeStart = form.timeStart+"-"+str1;
        form.timeEnd = form.timeEnd+"-"+str2;
      }

      statisticsAchievementCount(form).then(function(res) {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status == 0) {
          _this.tableData = res.data.list;
          _this.columnData.forEach(item=>{
            if(item.child){
              item.child.forEach(item1=>{
                if(item1.child){
                  item1.child.forEach(item2=>{
                    item2.label = res.data.total[item2.prop];
                  })
                }else{
                  item1.label = res.data.total[item1.prop];
                }
              })
            }
          })
          console.log(_this.columnData);
        } else if (res.status == 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    userTypefunc(){

    },
    changeToOtherPage(val){
      if(val==1){
        this.form.timeMode = '日';
        this.linkform.timeMode = '日';
        this.myparamday = '4';
        this.getQuickDate1(4);
      };
      if(val==2){
        this.form.timeMode = '周';
        this.linkform.timeMode = '周';
        this.myparamweek = '6';
        this.getQuickDate2(6);
      }
      if(val==3){
        this.form.timeMode = '月';
        this.linkform.timeMode = '月';
        this.myparammonth = '4';
        this.getQuickDate3(4);
      }
      if(val==4){
        this.form.timeMode = '季';
        this.linkform.timeMode = '季';
        this.myparamseason = '5';
        this.getQuickDate4(5);
      }
      if(val==5){
        this.form.timeMode = '年';
        this.linkform.timeMode = '年';
        this.myparamyear = '4';
        this.getQuickDate5(4);
      }
      
      this.searchTableData();
    },
    clearForm(){
      let _this = this;
      _this.form.userType = 2;
      _this.myparams5 = _this.backSlect(_this.myparams5);
      _this.myparams6 = _this.backSlect(_this.myparams6);
      if(_this.DPorPS==1){
        _this.myparamday = '4';
        _this.getQuickDate1(4);
      };
      if(_this.DPorPS==2){
        _this.myparamweek = '6';
        _this.getQuickDate2(6);
      };
      if(_this.DPorPS==3){
        _this.myparammonth = '4';
        _this.getQuickDate3(4);
      };
      if(_this.DPorPS==4){
        _this.myparamseason = '5';
        _this.getQuickDate4(5);
      };
      if(_this.DPorPS==5){
        _this.myparamyear = '4';
        _this.getQuickDate5(4);
      };
    },
    linkclickfunc(linkhttp,thisindex,row){
      console.log(item);
      console.log(row); 
      
      let myform = JSON.parse(JSON.stringify(this.linkform));
      if(row){
        myform.id = row.id;
        myform.time = row.time;
      }else{
        myform.id = '-1';
        myform.time = '-1';
      };
      //部门
      if(this.form.userType==1){
        myform.userIds1 = this.form.userIds1;
        myform.userIds2 = this.getSelectIdByList(this.myparams3).toString();
      }else if(this.form.userType==2){
        myform.userIds1 = this.getSelectIdByList(this.myparams5).toString();
        myform.userIds2 = this.getSelectIdByList(this.myparams6).toString();
      }else{
        myform.userIds1 = this.getSelectIdByList(this.myparams7).toString();
        myform.userIds2 = '';
      }
      myform.colType = thisindex;
      myform.timeStart = this.form.timeStart;
      myform.timeEnd = this.form.timeEnd;
      myform.userType = this.form.userType;
      let thisform = JSON.stringify(myform);
      console.log(thisform);
      this.$router.push({
        path:linkhttp,
        query:{
          form:thisform,
        }
      })
    },
    userIds1func(val){
      let _this = this;
      this.myparams3 = this.myparams3all['dept'+val];
    },
    filterData() {
      let select = this.multipleSelection.toString();
      if (select) {
        let arr = [];
        this.tableData.forEach(function(item) {
          if (select.indexOf(item.id) != -1) {
            arr.push(item);
          }
        });
        this.currentNum = 0;
        this.tableData = arr;
      }else{
        this.myAlert('请选择需要过滤的数据!','dangerous-icon');
      }
    },
    expendOrClose(row){
      let isClose = false;
      let child = row.child;
      if(child && child.length != 0){
        child.forEach((item,index) => {
          if(index != 0){
            if(item.show){
              isClose = true; 
            }
          } 
        })
        if(isClose){
          child.forEach((item1,index) => {
            if(index != 0){
              item1.show = false;
              row.isClose = true;
            } 
          })
        }else{
          child.forEach((item1,index) => {
            if(index != 0){
              item1.show = true;
              row.isClose = false;
            } 
          })
        }
      }
    },
    finUserState() {
      let _this = this;
      let id = this.getSelectIdByList(_this.myparams5);
      if (id) {
        _this.$layer.loading({
          shade: true
        });
        departperson(id).then(function(response) {
          _this.$layer.closeAll('loading');
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            debugger;
            let data = response.data;
            let user = data.user;
            user = [{ id: "-1", name: "全部", select: true }].concat(user);
            _this.myparams6 = user;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      }
    },
    getQuickDate1(value) {
      let time = quickDate.getTwoDayByDay(value);
      this.form.timeStart = time.startTime;
      this.form.timeEnd = time.endTime;
      if (value != 1) {
        this.timeDisabled = true;
      } else {
        this.timeDisabled = false;
      }
    },
    getQuickDate2(value) {
      let time = quickDate.getTwoWeekByDay(value);
      this.form.timeStart = time.startTime;
      this.form.timeEnd = time.endTime;
      if (value != 1) {
        this.timeDisabled = true;
      } else {
        this.timeDisabled = false;
      }
    },
    getQuickDate3(value) {
      let time = quickDate.getTwoMonthByDay(value);
      this.form.timeStart = time.startTime;
      this.form.timeEnd = time.endTime;
      if (value != 1) {
        this.timeDisabled = true;
      } else {
        this.timeDisabled = false;
      }
    },
    getQuickDate4(value) {
      let time = quickDate.getTwoQuarterByDay(value);
      let startQuarter = time.startQuarter;
      let endQuarter = time.endQuarter;
      this.form.timeStart = time.startTime+"";
      this.form.timeEnd = time.endTime+"";
      this.quarter1 = time.startQuarter+"";
      this.quarter2 = time.endQuarter+"";
      if (value != 1) {
        this.seasondisabled = true;
        this.timeDisabled = true;
      } else {
        this.seasondisabled = false;
        this.timeDisabled = false;
      }
    },
    getQuickDate5(value) {
      let time = quickDate.getTwoYearByDay(value);
      this.form.timeStart = time.startTime+"";
      this.form.timeEnd = time.endTime+"";
      if (value != 1) {
        this.timeDisabled = true;
      } else {
        this.timeDisabled = false;
      }
    },
    setMonth1(value){
      let str = "";
      if(value == 1){
        str ="01";
      }else if(value == 2){
        str ="04";
      }else if(value == 3){
        str ="07";
      }else if(value == 4){
        str ="10";
      }
      return str;
    },
    setMonth2(value){
      let str = "";
      if(value == 1){
        str ="03";
      }else if(value == 2){
        str ="06";
      }else if(value == 3){
        str ="09";
      }else if(value == 4){
        str ="12";
      }
      return str;
    },
    getSelectIdByList(list) {
      let arr = [];
      list.forEach(function(item) {
        if (item.select) {
          arr.push(item.id);
        }
      });
      return arr.toString();
    },
    headerRowClass({row, column, rowIndex, columnIndex}){
      let className = "";
      if (column.property == 'totalone'||column.property == 'totaltwo'||column.property == 'totalthree'||column.property == 'totalfour'||column.property == 'totalfive'||column.property == 'totalsix'||column.property == 'totalseven'||column.property == 'totaleight') {
        className =  'cellmyth';
      }

      return className;
    },
    getRowDataByClick(row, column, event){
      this.currentNum = row.index + 1;
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.myindex = rowIndex;
    },
    clickColumn() {
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
        area:['450px','400px'],
        title: "自选列 【"+_this.culumnTitle+"】",
        tips: 1,
        shadeClose: false,
        shade: true,//是否显示遮罩
        zIndex:19891110,
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
    tabRemove(targetName) {
      // 首页不可删除
      if (targetName == "/") {
        return;
      }
      this.$store.commit("delete_tabs", targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit(
            "set_active_index",
            this.options[this.options.length - 1].path
          );
          this.$router.push({ path: this.activeIndex });
        } else {
          this.$router.push({ path: "/home/" });
        }
      }
    },
  },
  mounted() {
    this.getParamsData();
  },
  computed: {
    options() {
      return this.$store.state.options;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  /deep/ .mycontent{
    height: calc(100% - 87px);
    width:100%;
    .list-content{
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      margin: 5px auto 0px;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      border-radius:5px;
    }
  }
  /deep/ .mycontent .el-table .el-table__body-wrapper {
    height: calc(100% - 100px) !important;
  }
  /deep/ .list-content .el-table .caret-wrapper{
    display: none;
  }
  /deep/ .el-table thead.is-group th:hover .caret-wrapper{
    display: inline-block;
  }
  /deep/ .el-table .el-table__header .cellmyth{
    border-bottom:none !important;
    .pl-table-beyond{
      padding-top: 7px;
      position: absolute;
      width: 100%;
      left: 0px;
      top: 0px;
      text-align: center;
    }
  }
</style>