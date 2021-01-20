<template>
  <div class="clear" style="height:100%;" >
    <div id="finance-statistics-container" class="rent-container mycontailerclass1" >
      <div class="top-container border-black" >
        <div class="search-container mycontailerclass1 " >
          <div class="clear" >
              <div class=" left padding-l-15"  >
                  <el-radio @change="changeTimeType"  v-model="form.timeType" :label="1">&nbsp;</el-radio>
              </div>
              <div class="left" > 
                  日比
              </div>
              <div class=" left padding-l-15"  >
                  <el-radio  @change="changeTimeType" v-model="form.timeType" :label="2">&nbsp;</el-radio>
              </div>
              <div class="left " > 
                  周比
              </div>
              <div class=" left padding-l-15"  >
                  <el-radio  @change="changeTimeType"  v-model="form.timeType" :label="3">&nbsp;</el-radio>
              </div>
              <div class="left " > 
                  月比
              </div>
              <div class=" left padding-l-15"  >
                  <el-radio  @change="changeTimeType"  v-model="form.timeType" :label="4">&nbsp;</el-radio>
              </div>
              <div class="left " > 
                  季比
              </div>
              <div class=" left padding-l-15"  >
                  <el-radio  @change="changeTimeType"  v-model="form.timeType" :label="5">&nbsp;</el-radio>
              </div>
              <div class="left" > 
                  年比
              </div>
              <div class="item left padding-l-15" >
                <i class="fa cut-icon cut"></i>
              </div>
              <div class="left padding-l-15">
                 <div class="border-icon clear" > 
                  <i class="leading-out-icon" title="自选列" @click="clickColumn"></i>
                 </div>  
              </div>
          
              <div class="item left clear padding-l-15">
                 <div class="border-icon clear" > 
                  <i class="back-icon user left" @click="tabRemove('/home/FinanceStatistics')"></i>
                 </div> 
              </div>
              <div class="item padding-l-5 left">
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
        <div class="search-container " >
          <el-form ref="formsData"  :model="form" >
            <div  class="clear" >
              <div v-show="form.timeType == 1" class="clear left" >
                <div class="left padding-l-15">
                  <span class="des-word">日期</span>
                </div>
                
                <div class="left " >
                  <el-form-item label="" label-width="0">
                    <el-select @change="getQuickDate1" v-model="quick1"  placeholder="" style="width:85px;"   >
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
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="date"
                      :disabled="timeDisabled1"  
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="timeStart1"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="date"
                      :disabled="timeDisabled1"  
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="timeEnd1"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div v-show="form.timeType == 2" class="clear left" >
                <div class="left padding-l-15">
                  <span class="des-word">日期</span>
                </div>
                
                <div class="left " >
                  <el-form-item label="" label-width="0">
                    <el-select @change="getQuickDate2" v-model="quick2"  placeholder="" style="width:85px;"   >
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
                <div class="left padding-l-2">
                  <el-form-item label label-width="0">
                    <el-date-picker
                      type="date"
                      :disabled="timeDisabled2"  
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="timeStart2"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="date"
                      :disabled="timeDisabled2"  
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="timeEnd2"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              
              <div v-show="form.timeType == 3" class="clear left" >
                <div class="left padding-l-15">
                  <span class="des-word">日期</span>
                </div>
                
                <div class="left " >
                  <el-form-item label="" label-width="0">
                    <el-select @change="getQuickDate3" v-model="quick3"  placeholder="" style="width:85px;"   >
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
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                        type="month"
                      :disabled="timeDisabled3"  
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM"
                      v-model="timeStart3"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="month"
                      :disabled="timeDisabled3"  
                       
                      placeholder="选择日期"
                      value-format="yyyy-MM"
                      v-model="timeEnd3"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div v-show="form.timeType == 4" class="clear left" >
                <div class="left padding-l-15">
                  <span class="des-word">日期</span>
                </div>
                
                <div class="left " >
                  <el-form-item label="" label-width="0">
                    <el-select @change="getQuickDate4" v-model="quick4"  placeholder="" style="width:85px;"   >
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
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="year"
                      :disabled="timeDisabled4"  
                       
                      value-format="yyyy"
                      placeholder="选择日期"
                      v-model="timeStart4"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-select :disabled="timeDisabled4" v-model="quarter1" style="width:60px;"   >
                      <el-option  label="一季" value="1" ></el-option>
                      <el-option  label="二季" value="2" ></el-option>
                      <el-option  label="三季" value="3" ></el-option>
                      <el-option  label="四季" value="4" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="year"
                      :disabled="timeDisabled4"  
                       
                      value-format="yyyy"
                      placeholder="选择日期"
                      v-model="timeEnd4"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0">
                    <el-select :disabled="timeDisabled4" v-model="quarter2" style="width:60px;"   >
                      <el-option  label="一季" value="1" ></el-option>
                      <el-option  label="二季" value="2" ></el-option>
                      <el-option  label="三季" value="3" ></el-option>
                      <el-option  label="四季" value="4" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div v-show="form.timeType == 5" class="clear left" >
                <div class="left padding-l-15">
                  <span class="des-word">日期</span>
                </div>
                
                <div class="left " >
                  <el-form-item label="" label-width="0">
                    <el-select @change="getQuickDate5" v-model="quick5"  placeholder="" style="width:85px;"   >
                      <el-option  label="全部" value="-1" ></el-option>
                      <el-option  label="本年" value="2" ></el-option>
                      <el-option  label="上年" value="3" ></el-option>
                      <el-option  label="近3年" value="4" ></el-option>
                      <el-option  label="近10年" value="5" ></el-option>
                      
                      <el-option  label="自定义" value="1" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="year"
                      :disabled="timeDisabled5"  
                       
                      value-format="yyyy"
                      placeholder="选择日期"
                      v-model="timeStart5"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0" >
                    <el-date-picker
                      type="year"
                      :disabled="timeDisabled5"  
                       
                      value-format="yyyy"
                      placeholder="选择日期"
                      v-model="timeEnd5"
                      style="width: 90px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="left clear">
                <div class="left padding-l-15">
                  <span class="des-word">收支类型</span>
                </div>
                <div class="left">
                  <el-form-item label label-width="0">
                    <el-select v-model="form.model" placeholder style="width:85px;">
                      <el-option label="业务收支" value="1"></el-option>
                      <el-option label="经营支出" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class=" left padding-l-5" style="padding-top:3px;" >
                    <i class="search-btn" @click="searchStatisticsData"  >查询</i>
                </div>
                <div class="left padding-l-5" style="padding-top:3px;" >
                    <i class="claerlys" @click="clearForm" ></i>
                </div>
              </div>   
            </div>     
          </el-form>
        </div>
        <div class="search-container " >
          <div class="clear" style="padding-left:35px;" >
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word word-weight"   >
                        <span class="word-weight" >总现金余额</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon " @click="lookCount1(count.allNum)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money word-weight"  >
                    {{count.allNum}}
                  </div>
              </div>
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word word-weight"   >
                        <span class="" >总收入代收</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon " @click="lookCount2(count.incomeCollection)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money"  >
                      {{count.incomeCollection}}
                  </div>
              </div> 
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word word-weight"   >
                        <span class="" >总收入押金</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon " @click="lookCount3(count.totalCharge)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money"  >
                      {{count.totalCharge}}
                  </div>
              </div> 
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word word-weight"   >
                        <span class="" >总收入借款</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon "  @click="lookCount4(count.borrowInMoney)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money"  >
                      {{count.borrowInMoney}}
                  </div>
              </div>  
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word word-weight"   >
                        <span class="" >总未实付款</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon "  @click="lookCount5(count.notActuallyPaid)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money"  >
                      {{count.notActuallyPaid}}
                  </div>
              </div> 
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word word-weight"   >
                        <span class="" >总未结年金</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon "  @click="lookCount6(count.notPaidYearGold)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money"  >
                      {{count.notPaidYearGold}}
                  </div>
              </div> 
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word word-weight"   >
                        <span class="" >总未结月金</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon "  @click="lookCount7(count.notPaidMonGold)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money"  >
                      {{count.notPaidMonGold}}
                  </div>
              </div>  
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word "   >
                        <span class="word-weight" >总补付余额</span>
                    </div>
                      
                  </div>
                  <div class="clear type-money word-weight"  >
                      {{count.payTheBalance}}
                  </div>
              </div> 
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word "   >
                        <span class="" >总未实收款</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon "  @click="lookCount8(count.notReceived)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money word-weight"  >
                      {{count.notReceived}}
                  </div>
              </div> 
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word "   >
                        <span class="" >总支出押金</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon "  @click="lookCount9(count.deposit)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money word-weight"  >
                      {{count.deposit}}
                  </div>
              </div> 
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word"   >
                        <span class="" >总借出欠款</span>
                    </div>
                    <div class="left span-icon" >
                      <span class="question-gold-icon "  @click="lookCount10(count.borrowOutmoney)" ></span>
                    </div>  
                  </div>
                  <div class="clear type-money word-weight"  >
                      {{count.borrowOutmoney}}
                  </div>
              </div>  
              <div class="clear left"   >
                  <div class="clear static-item" style="" >
                    <div class="left type-word "   >
                        <span class="word-weight" >总收付余额</span>
                    </div>
                    
                  </div>
                  <div class="clear type-money word-weight"  >
                      {{count.paymentBalance}}
                  </div>
              </div>    
          </div>
        </div> 
      </div>

      <div class="content clear statistics-content" style="height:calc(100% - 150px)" >
        <div  class="list-content" style="position:relative;">
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
            
            :row-height="27"
          >
            <template :titleListUpdate="titleListUpdate" v-if="item.show" v-for="(item,index) in columnData">
            
              <PlTableColumn
                v-if="item.prop == 'time'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
                :align="item.align"
              >
              </PlTableColumn>
              <PlTableColumn
                v-else-if="item.prop == 'totalOne'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
                :align="item.align"
              >
                <PlTableColumn
                 v-for="item1 in item.child"
                :prop="item1.prop"
                :label="item1.label"
                :width="item1.width"
                :fixed="item1.fixed"
                :align="item1.align"
                > 
                   <PlTableColumn
                  v-for="item2 in item1.child"
                  :prop="item2.prop"
                  :label="item2.label"
                  :width="item2.width"
                  :fixed="item2.fixed"
                  :align="item2.align"
                  >
                    
                    <template slot-scope="scope" style="height: 100%;">
                      <div style="position:relative;" >
                        <div @click="linkFinanceList(scope.row.time,item1.prop,item.label)" v-if="scope.row.total !=null && scope.row.total !=''   && (scope.row.total+'').indexOf('-') != -1" class="" style="color:#cc3300;font-weight:700;text-algin:right;width: 100%;" >
                          {{ scope.row.total }}
                        </div>
                        <div @click="linkFinanceList(scope.row.time,item1.prop,item.label)" v-else  class="" style="color:#009933;font-weight:700;text-algin:right;width: 100%;" >
                          {{ scope.row.total }}
                        </div>
                        
                      </div>  
                    </template>
                   </PlTableColumn>  
                </PlTableColumn>
              </PlTableColumn>
              
              <PlTableColumn
                v-else
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              
                :sortable="item.sortable"
                :fixed="item.fixed"
                :align="item.align"
                slot-scope="scope"
              >
                <template slot="header" slot-scope="scope">
                    <div class="clear" >
                      <span>{{item.label}}</span>
                      <span @click="expendOrClose(item)" :class="{'el-icon-caret-right':!item.isClose,'el-icon-caret-bottom':item.isClose}"  ></span>
                    </div>
                </template>
                <template v-if="item1.show" v-for="item1 in item.child" >
                  <PlTableColumn
                      
                      :label="item1.label"
                      :prop='item1.prop'
                      :width='item1.width'
                      :align="item1.align"
                      >
                      <template slot="header">
                        <span>{{item1.label}}</span>
                      </template>
                      <PlTableColumn
                       v-for="item2 in item1.child"
                      :label="item2.label"
                      :prop='item2.prop'
                      :width='item2.width'
                      :align="item2.align"
                      >  
                        <template slot="header" >
                          <div style="position:relative;" >
                            <div @click="linkFinanceList('',item1.prop,item.label)" v-if="item1.label !=null && item1.labelNum !=''   && (item1.labelNum+'').indexOf('-') != -1" class="" style="color:#cc3300;font-weight:700;text-algin:right;width: 100%;" >
                              {{ item1.labelNum }}
                            </div>
                            <div @click="linkFinanceList('',item1.prop,item.label)" v-else  class="" style="color:#009933;font-weight:700;text-algin:right;width: 100%;" >
                              {{item1.labelNum }}
                            </div>
                            
                          </div>  
                        </template>
                        <template slot-scope="scope" style="height: 100%;">
                          <div style="position:relative;" >
                            <div @click="linkFinanceList(scope.row.time,item1.prop,item.label)" v-if="scope.row[item1.prop] !=null && scope.row[item1.prop] !=''   && (scope.row[item1.prop]+'').indexOf('-') != -1" class="" style="color:#cc3300;text-algin:right;width: 100%;" >
                              {{ scope.row[item1.prop] }}
                            </div>
                            <div @click="linkFinanceList(scope.row.time,item1.prop,item.label)" v-else   style="color:#009933;text-algin:right;width: 100%;" >
                              {{ scope.row[item1.prop] }}
                            </div>
                          </div>  
                        </template>
                      </PlTableColumn>  
                  </PlTableColumn>
                </template> 
                
              </PlTableColumn>
            </template>
          </PlTable>
        </div>
      </div>
     
    </div>
  </div>  
</template>


<script>
  import{getFinanceStatistics,getFinanceExpendCount}  from "../../../service/financeStatistics";
  
  import {financeStatisticsParam} from '../../../utils/financeStatisticsParam'
  import {quickDate} from '../../../utils/getQuickDate'
  import { PlTable, PlTableColumn } from 'pl-table';
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import Question1Page from './question1'
  import Question2Page from './question2'
  import Question3Page from './question3'
  import Question4Page from './question4'
  import Question5Page from './question5'
  import Question6Page from './question6'
  import Question7Page from './question7'
  import Question8Page from './question8'
  import Question9Page from './question9'
  import Question10Page from './question10'
  // 编辑
  import ColumPage from '../../../components/columnMoreHeader'
 
  //获取数据
  export default {
    data() {
      return {
        culumnTitle:'收支统计',
        columnData:[],
        columnTempData: financeStatisticsParam.financeStatisticsColumn1,
        columnData1: [],
        tableData:[],
        sessionStr:'finance-statistics-list',
        columnValue:false,
        expendManageIds:'expendManageIds',
        quick1:'-1',
        quick2:'-1',
        quick3:'-1',
        quick4:'-1',
        quick5:'-1',
        currentNum:'0',
        timeDisabled1:true,
        timeDisabled2:true,
        timeDisabled3:true,
        timeDisabled4:true,
        timeDisabled5:true,
        seasondisabled:true,
        isUpdateTitle:true,
        active1:true,
        active2:true,
        active3:true,
        active4:true,
        active5:true,
        totalNum:null,
        titleListUpdate:1,
        count:{
          "notReceived":0.00,
          "incomeCollection": 0.00,
          "notActuallyPaid": 0.00,
          "totalCharge": 0.00,
          "borrowInMoney": 0.00,
          "deposit": 0.00,
          "borrowOutmoney": 0.00,
          "paymentBalance": 0.00,
          "notPaidMonGold": 0.00,
          "payTheBalance": 0.00,
          "allNum": 0.00,
          "notPaidYearGold": 0.00,
        },
        quarter1:'1',
        quarter2:'1',
        timeStart1:'',
        timeEnd1:'',
        timeStart2:'',
        timeEnd2:'',
        timeStart3:'',
        timeEnd3:'',
        timeStart4:'2019',
        timeEnd4:'2019',
        timeStart5:'2019',
        timeEnd5:'2019',
        form:{
            timeType:1,
            word:'',
            needTotal:1,
            model:'1',
        },
      };
    },
    components:{
      CheckSelectSpecial,
      ColumPage,
      PlTable,
      PlTableColumn,
      Question1Page,
      Question2Page,
      Question3Page,
      Question4Page,
      Question5Page,
      Question6Page,
      Question7Page,
      Question8Page,
      Question9Page,
      Question10Page,
    },
    methods: {
       headerRowClass({row, column, rowIndex, columnIndex}){
        let className = "";
        if (column.property == 'totalOne') {
          className =  ' cell-expend ';
        }
        return className;
        
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
      expendOrClose(item){
         debugger;
         let isClose = false;
         let child = item.child;
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
                  item.isClose = true;
                } 
            })
           }else{
             child.forEach((item1,index) => {
                if(index != 0){
                  item1.show = true;
                  item.isClose = false;
                } 
            })
           }
         }
      },
      getQuickDate1(value) {
        let time = quickDate.getTwoDayByDay(value);
        this.timeStart1 = time.startTime;
        this.timeEnd1 = time.endTime;
        if (value != 1) {
          this.timeDisabled1 = true;
        } else {
          this.timeDisabled1 = false;
        }
      },
      getQuickDate2(value) {
        let time = quickDate.getTwoWeekByDay(value);
        this.timeStart2 = time.startTime;
        this.timeEnd2 = time.endTime;
        if (value != 1) {
          this.timeDisabled2 = true;
        } else {
          this.timeDisabled2 = false;
        }
      },
      getQuickDate3(value) {
        let time = quickDate.getTwoMonthByDay(value);
        this.timeStart3 = time.startTime;
        this.timeEnd3 = time.endTime;
        if (value != 1) {
          this.timeDisabled3 = true;
        } else {
          this.timeDisabled3 = false;
        }
      },
      getQuickDate4(value) {
        let time = quickDate.getTwoQuarterByDay(value);
        let startQuarter = time.startQuarter;
        let endQuarter = time.endQuarter;
        this.timeStart4 = time.startTime+"";
        this.timeEnd4 = time.endTime+"";
        this.quarter1 = time.startQuarter+"";
        this.quarter2 = time.endQuarter+"";
        if (value != 1) {
          // this.seasondisabled = true;
          this.timeDisabled4 = true;
        } else {
          // this.seasondisabled = false;
          this.timeDisabled4 = false;
        }
      },
      getQuickDate5(value) {
        let time = quickDate.getTwoYearByDay(value);
        this.timeStart5 = time.startTime+"";
        this.timeEnd5 = time.endTime+"";
        if (value != 1) {
          this.timeDisabled5 = true;
        } else {
          this.timeDisabled5 = false;
        }
      },
     
      changeTimeType(){
          let timeType = this.form.timeType;
          if(timeType == 1){
            if(this.active1){
               this.getQuickDate1(4);
               this.quick1 = '4';
               this.active1 = false;
             }
          }else if(timeType == 2){
            if(this.active2){
               this.getQuickDate2(6);
               this.quick2 = '6';
               this.active2 = false;
             }
          }else if(timeType == 3){
            if(this.active3){
               this.getQuickDate3(4);
               this.quick3 = '4';
               this.active3 = false;
             }
          }else if(timeType == 4){
            if(this.active4){
               this.getQuickDate4(5);
               this.quick4 = '5';
               this.active4 = false;
             }
          }else if(timeType == 5){
             if(this.active5){
               this.getQuickDate5(4);
               this.quick5 = '4';
               this.active5 = false;
             }
          }
       },
       linkFinanceList(time,type,typFirst){
          let form = JSON.parse(JSON.stringify(this.form));
          let timeStart1 =  this.timeStart1; 
          let timeEnd1 =  this.timeEnd1; 
          let timeStart2 =  this.timeStart2; 
          let timeEnd2 =  this.timeEnd2; 
          let timeStart3 =  this.timeStart3; 
          let timeEnd3 =  this.timeEnd3; 
          let timeStart4 =  this.timeStart4; 
          let timeEnd4 =  this.timeEnd4; 
          let timeStart5 =  this.timeStart5; 
          let timeEnd5 =  this.timeEnd5; 
          let timeType = form.timeType;
          let form1 = {};
          if(timeType == 1){
            form1.timeStart = timeStart1;
            form1.timeEnd = timeEnd1;
          }else if(timeType == 2){
            form1.timeStart = timeStart2;
            form1.timeEnd = timeEnd2;
          }else if(timeType == 3){
            form1.timeStart = timeStart3;
            form1.timeEnd = timeEnd3;
          }else if(timeType == 4){
            form1.timeStart = timeStart4;
            form1.timeEnd = timeEnd4;
          }else if(timeType == 5){
            form1.timeStart = timeStart5;
            form1.timeEnd = timeEnd5;
          }
         if(!time){
           time = "";
         } 
         if(!type){
           type = "";
         }
         if(!typFirst){
           typFirst = "";
         }
         form1.model = form.model;
         form1.timeType = timeType;
         form1.rowTime = time;
         form1.colType2 = type;
         form1.colType = typFirst;
         form1 = JSON.stringify(form1);
         this.$router.push({
          path:"/home/FinanceDetails",
          query:{
            form:form1,
          }
        })
       },
       initStatisticsData(){
          this.getQuickDate1(4);
          this.quick1 = '4';
          this.active1 = false;
          this.searchStatisticsData();
       },
      searchStatisticsData(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let timeStart1 =  this.timeStart1; 
        let timeEnd1 =  this.timeEnd1; 
        let timeStart2 =  this.timeStart2; 
        let timeEnd2 =  this.timeEnd2; 
        let timeStart3 =  this.timeStart3; 
        let timeEnd3 =  this.timeEnd3; 
        let timeStart4 =  this.timeStart4; 
        let timeEnd4 =  this.timeEnd4; 
        let timeStart5 =  this.timeStart5; 
        let timeEnd5 =  this.timeEnd5; 
        let timeType = form.timeType;
        if(timeType == 1){
          form.timeStart = timeStart1;
          form.timeEnd = timeEnd1;
        }else if(timeType == 2){
          form.timeStart = timeStart2;
          form.timeEnd = timeEnd2;
        }else if(timeType == 3){
          form.timeStart = timeStart3;
          form.timeEnd = timeEnd3;
        }else if(timeType == 4){
          let quarter1 = this.quarter1;
          let quarter2 = this.quarter2;  
          let str1 = this.setMonth1(quarter1);
          let str2 = this.setMonth2(quarter2);
          form.timeStart = timeStart4+"-"+str1;
          form.timeEnd = timeEnd4+"-"+str2;
        }else if(timeType == 5){
          form.timeStart = timeStart5;
          form.timeEnd = timeEnd5;
        }
        getFinanceExpendCount(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let titles = data.titles;
            let totalNum = data.totalNum;
            let list = data.list;
           
            if(data){
              for(let attr in data){
                if(typeof data[attr] == 'number'){
                  let num = (data[attr]*1).toFixed(2);
                  _this.count[attr] = num;
                } 
              }
            }
            
            _this.setTitle(titles,totalNum);
               
            _this.reloadListByStorage();
            _this.tableData = list;
           
            
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
        
        
      },
      setTitle(titles,totalNum){
          let title1 = titles[0];
          let title2 = titles[1];
          let _this = this;
          let time = new Date().getTime();
          let columnTempData = [].concat(this.columnTempData);
          let columnData = [].concat(this.columnTempData);
          columnData.forEach(item =>{
            if(item.prop == 'totalOne'){
                item.child = [{
                id:item.id,
                type:'',
                width:'100',
                ref:'',
                prop:'',
                label:'',
                align:'center',
                sortable:false,
                show:true,
                fixed:false,
                isClose:false,
                setId:time+"203005021222",
                child:[{
                  id:item.id,
                  type:'',
                  width:'100',
                  ref:'',
                  prop:'total',
                  label:totalNum.total ? totalNum.total+"" : "0",
                  align:'center',
                  sortable:false,
                  show:true,
                  fixed:false,
                  isClose:false,
                  setId:time+"2030050212222",
                }]
                }]
            }
          })
          let isUpdateTitle = this.isUpdateTitle;
          if(title2 && title2.length != 0){
             title2.forEach((item,index) => {
                let prop = item.prop
                item.type = '';
                item.width = '100';
                item.ref = '';
                item.titleLabel = '';
                item.align = 'center';
                item.sortable = true;
                item.show = true;
                item.fixed = false;
                item.prop = item.prop+'';
                item.setId = time+"20300502100"+index;
                item.labelNum = totalNum[prop] ? totalNum[prop]+"" : "0",
                item.child = [{
                  type:'',
                  width:'100',
                  ref:'',
                  prop:prop+"",
                  label: totalNum[prop] ? totalNum[prop]+"" : "0",
                  titleLabel:'',
                  align:'center',
                  sortable:true,
                  show:true,
                  fixed:false,
                  setId:time+"2030050210000"+index,
                }]
             })
            let count = 0;
            
            
            title1.forEach((item,index) => {
                let colspan = item.colspan*1;
                let obj = {
                  id:item.id,
                  type:'',
                  width:'100',
                  ref:'',
                  prop:"x"+index,
                  label:item.label,
                  align:'center',
                  sortable:false,
                  show:true,
                  fixed:false,
                  isClose:isUpdateTitle,
                 
                  setId:time+"203005021"+index,
                }
                
                let child = [];
                if(colspan){
                  child = title2.slice(count,colspan+count);
                  child.forEach(item1 => {
                     item1.titleLabel = item.label;
                  })
                  count += colspan;
                }
                
                obj.child = child;
                
                columnData.push(obj);
            })
          }
          this.columnData = columnData;
          if(isUpdateTitle){
            isUpdateTitle = false;
            this.isUpdateTitle = false;
          }else{
            isUpdateTitle = true;
            this.isUpdateTitle = true;
          }
          debugger;
          this.reloadListByStorage();
          this.$forceUpdate();
      },
      changeTitle(totalNum){
        let columnData = this.columnData;
        
        if(columnData && columnData.length != 0){
          columnData.forEach(item =>{
             let child = item.child;
             if(child && child.length != 0){
                child.forEach(item1 => {
                    let child1 = item1.child;
                    let setChild1 = [];
                    if(child1 && child1.length != 0){
                        child1.forEach(item2 => {
                           item2.prop = item2.prop;
                           let num = totalNum[item2.prop];
                           if(num){
                             item2.label = num+"";
                           }else{
                             item2.label = " ";
                           }
                           setChild1.push(item2);
                        })
                    }
                    child1 = setChild1;
                    item1.child = child1;
                })
             }
          })
        }
       
        this.columnData = this.columnData.splice(this.columnData.length).concat(columnData);
      },
      getRowDataByClick(row, column, event){
        this.currentNum = row.index + 1;
      },
      tableRowClassName({ row, rowIndex }) {
        // 把每一行的索引放进row
        row.index = rowIndex;
      },
      
      lookCount1(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question1Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总现金余额"}//props
          },
          area:['600px','400px'],
          title: "总现金余额详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },  
      lookCount2(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question2Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总收入代收"}//props
          },
          area:['720px','540px'],
          title: "总收入代收详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      lookCount3(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question3Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总收入押金"}//props
          },
          area:['600px','400px'],
          title: "总收入押金详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      lookCount4(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question4Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总收入借款"}//props
          },
          area:['600px','400px'],
          title: "总收入借款详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      lookCount5(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question5Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总未实付款"}//props
          },
          area:['720px','540px'],
          title: "总未实付款详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      lookCount6(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question6Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总未结年金"}//props
          },
          area:['600px','400px'],
          title: "总未结年金详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      lookCount7(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question7Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总未结月金"}//props
          },
          area:['600px','400px'],
          title: "总未结月金详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      lookCount8(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question8Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总未实收款"}//props
          },
           area:['720px','540px'],
          title: "总未实收款详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      lookCount9(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question9Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总支出押金"}//props
          },
          area:['600px','400px'],
          title: "总支出押金详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      lookCount10(value){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: Question10Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{type:"总借出欠款"}//props
          },
          area:['600px','400px'],
          title: "总借出欠款详情-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
     
      changeExpendType(type){
         if(type == 1){

         }else{
           
         }
      },
      reloadListByStorage(){
        let _this = this;
        let currentColumnData = this.columnData;
        let sessionStr = this.sessionStr;
        
        let storage=window.localStorage;
        let titleData = storage.getItem(sessionStr);
        let storageColumn = JSON.parse(titleData);
        let columnData = JSON.parse(JSON.stringify(currentColumnData));
        let column = null;
        let storageMap = {};
        
        if(storageColumn){
          let getColumn = storageColumn.column;
          getColumn.forEach(item => {
            storageMap[item.setId] = item;
          })
          columnData.forEach(item => {
            let child = item.child;
            if(child){
              let flag = false;
              child.forEach(item1 => {
                if(item1.show){
                  flag = true;
                }
                item1.show = storageMap[item1.setId].show;
                item1.width = storageMap[item1.setId].width;
              })
              if(flag){
                item.show = true;
              }else{
                item.show = false;
              }
            }else{
              item.show = storageMap[item.setId].show;
              item.width = storageMap[item.setId].width;
            }
          })
          column = columnData;
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
        _this.columnData = [];
        column.forEach(function(item,index){
          if(!count){
            item.fixed = false;
          }else {
            if (count >= index) {
              item.fixed = true;
            }
          }
          _this.columnData.push(item);
        })
        
      },
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
          area:['450px','400px'],
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
       //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
      }, 
      
      getSelectIdByList(list){
        let arr = [];
        list.forEach(function(item){
          if(item.select){
            arr.push(item.id);
          }
        })
        return arr.toString();
      },
      
      clearForm(){
        let timeType = this.form.timeType;
        if(timeType == 1){
          this.getQuickDate1(4);
          this.quick1 = '4';
        }else if(timeType == 2){
          this.getQuickDate2(6);
          this.quick2 = '6';
        }else if(timeType == 3){
          this.getQuickDate3(4);
          this.quick3 = '4';
        }else if(timeType == 4){
          this.getQuickDate4(5);
          this.quick4 = '5';
        }else if(timeType == 5){
          this.getQuickDate5(4);
          this.quick5 = '4';
        }
        this.form.model = '1';
      },
      
      backSlect(list) {
        let arr = [];
        list.forEach(function(item) {
          if (item.id != -1) {
            item.select = false;
          } else {
            item.select = true;
          }
          arr.push(item);
        });
        return arr;
      },
      tabRemove (targetName) {
        // 首页不可删除
        if (targetName == '/') {
          return;
        }
        this.$store.commit('delete_tabs', targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            this.$store.commit('set_active_index', this.options[this.options.length-1].path);
            this.$router.push({path: this.activeIndex});
          } else {
            this.$router.push({path: '/home/'});
          }
        }
      }
    },
    mounted(){
       
       this.initStatisticsData();
    },
   
    computed: {

      options () {
        return this.$store.state.options;
      },
      activeIndex: {
        get () {
          return this.$store.state.activeIndex;
        },
        set (val) {
          this.$store.commit('set_active_index', val);
        }
      }
    },
  };
</script>

<style lang="scss" scoped>

  .rent-container {
    font-size:12px;
    height:100%;
    .padding-l-15{
      padding-left:15px;
    }
    .padding-l-10{
      padding-left:10px;
    }
    .padding-l-5{
      padding-left:5px;
    }
    .padding-l-2{
      padding-left:2px;
    }
    .word-weight{
      font-weight:700;
    }
    .static-item{
      width:106px;
      
      .type-word{
        width:65px;
        text-align:left;
      }
      .type-money{
        text-align:center;
      }
      .span-icon{
        padding-top:2px;
      }
    }
    .cut-icon{
      background:url(../../../images/system/fenge.png) -100px -90px;
      width:3px;
      height:23px;
      display:block;
    }

    .question-gold-icon{
      display: inline-block;
      height:15px;
      width:15px;
      background: url("../../../images/icon2.png") -368px -61px;
    }
   
    .leading-out-icon{
      background:url(../../../images/icon.png) -126px -118px;
      width:20px;
      height:20px;
      display:block;
    }

    .back-icon{
      background:url(../../../images/system/tuichu.png) -15px -15px;
      width:20px;
      height:20px;
      display:inline-block;
    }
    
    .add {
      font-size:12px;
      color: #008000;
      margin-top:3px;
    }
    .delete{
      font-size:12px;
      color: #FF0000;
      margin-top:3px;
    }
  }
  
</style>
<style >
  .statistics-content .list-content .el-table .el-table__body-wrapper {
    height: calc(100% - 74px) !important;
    overflow: auto;
 }
</style>
