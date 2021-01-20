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
          <div class="left p-l-5">
            <i class="cut-icon"></i>
          </div>
          <div class="left p-l-10" style="margin-top: 1px;">
            <div class="border-icon clear" > 
             <i class="fourteen-three-icon" title="批量设置指标" @click="setupTargetbtnfunc" ></i>
            </div> 
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
             <i class="one-twelve-icon" title="" @click="tabRemove('/home/BusinessStatistics')"></i>
            </div> 
          </div>
          <div class="left p-l-5">
            <i class="cut-icon"></i>
          </div>
          <div class="item p-l-5 left">
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
                <el-select v-model="form.userType" @change="myparam1func"  style="width:70px;">
                  <el-option v-for="item in myparams1" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            
            <!-- 部门 -->
            <div v-if="form.userType==1" class="left">
              <el-form-item label label-width="0" >
                <el-select v-model="form.userIds1" @change="myparam2func" style="width:100px;">
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option v-for="item in myparams2" :label="item.name" :value="item.id"></el-option>
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
              <span class="des-word">指标</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" >
                <el-select :disabled="indexParamsTrueOrFalse" v-model="form.targetMode" @change="targetModechangefunc" style="width:80px;">
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option v-for="item in myparams4" :label="item.name" :value="item.id"></el-option>
                </el-select>
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
              <i class="search-btn" @click="searchTableData"  >查询</i>
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
          empty-text=" "
          use-virtual
          border
          height="100%"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @row-click="getRowDataByClick"
          :cell-class-name="finalCellStyle"
          :header-cell-class-name="headerRowClass"
          :row-height="rowHeight"
          >
          <template v-if="item.show" v-for="(item,index) in columnData" >
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
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              slot-scope="scope"
              show-overflow-tooltip
              >
              
            </PlTableColumn>

            <PlTableColumn
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
              show-overflow-tooltip
              >
              <template slot="header">
                <span v-if="form.userType==1">{{item.label1}}</span>
                <span v-if="form.userType==2">{{item.label2}}</span>
                <span v-if="form.userType==3">{{item.label3}}</span>
              </template>
              <template slot-scope="scope" style="height: 100%;">
                <div >
                  <span v-if="form.userType==1||form.userType==2" @click="nameclickfunc(scope.$index, scope.row)" style="color: #336699;cursor: pointer;font-weight: bold;">{{scope.row.name}}</span>
                  <span v-if="form.userType==3">{{scope.row.name}}</span>
                </div>
              </template>
              
            </PlTableColumn>

            <PlTableColumn
              v-else-if="item.prop == 'count1'||item.prop == 'count2'||item.prop == 'count3'||item.prop == 'count4'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              show-overflow-tooltip
              >
              <template v-if="item1.show" v-for="item1 in item.child">
                <PlTableColumn>
                  <PlTableColumn
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item1.sortable"
                    :align="item.align"
                    >
                    <template slot="header">
                      <div v-if="form.targetMode=='-1'">
                        <span v-if="item1.label.substring(0, 1) == '0'">{{item1.label}}</span>
                        <span v-else  @click="linkclickfunc(item1.linkhttp,item1.thisindex,'')" style="color: #336699;cursor: pointer;">{{item1.label}}</span>
                      </div>
                      <div v-if="form.targetMode==1">
                        <span v-if="item1.label.substring(0, 1) == '0'">{{item1.label}}</span>
                        <span v-else @click="linkclickfunc(item1.linkhttp,item1.thisindex,'')" style="color: #336699;cursor: pointer;">{{item1.label}}</span>
                      </div>
                      <div v-if="form.targetMode==2">
                        <span>{{item1.label}}</span>
                      </div>
                      
                    </template>
                    <template slot-scope="scope" style="height: 100%;">
                      <div style="position:relative;" >
                        <div v-if="form.targetMode=='-1'"  style="text-algin:center;width: 100%;"  >
                          <span v-if="scope.row[item.prop]==0">{{scope.row[item.prop]}}</span>
                          <span v-else @click="linkclickfunc(item1.linkhttp,item1.thisindex,scope.row)" style="color: #336699;cursor: pointer;">{{scope.row[item.prop]}}</span>
                          <span>/</span>
                          <span>{{scope.row[item.num]}}</span>
                        </div>
                        <div v-if="form.targetMode==1"  style="text-algin:center;width: 100%;"  >
                          <span v-if="scope.row[item.prop]==0">{{ scope.row[item.prop] }}</span>
                          <span v-else @click="linkclickfunc(item1.linkhttp,item1.thisindex,scope.row)" style="color: #336699;cursor: pointer;">{{ scope.row[item.prop] }}</span>
                        </div>
                        <div v-if="form.targetMode==2"  style="text-algin:center;width: 100%;"  >
                         <span> {{scope.row[item.num]}}</span>
                        </div>
                      </div>  
                    </template>
                  </PlTableColumn>
                </PlTableColumn>
                
              </template>
            </PlTableColumn>

            <PlTableColumn
              v-else
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              show-overflow-tooltip
              >
              <template v-if="item1.show" v-for="item1 in item.child">
                <PlTableColumn
                  :label="item1.label"
                  :prop='item1.prop'
                  :width='item1.width'
                  :sortable="item1.sortable"
                  :align="item.align"
                  >
                  <template slot="header">
                    <span v-if="item1.label1" style="color: #999;transform: scale(0.8);display: inline-block;">{{item1.label1}}</span>
                    <span>{{item1.label}}</span>
                  </template>
                  <template v-if="item2.show" v-for="(item2,index) in item1.child">
                    <PlTableColumn
                      :label="item2.label"
                      :prop='item2.prop'
                      :width='item2.width'
                      :sortable="item2.sortable"
                      :align="item2.align"
                      >
                      <template slot="header">
                        <div v-if="!item2.link" style="position:relative;" >
                          <div v-if="form.targetMode=='-1'">
                            <span v-if="item1.label1" style="color: #999;transform: scale(0.8);display: inline-block;">({{item1.count}})</span>
                            <span v-if="item2.label.substring(0, 1) == '0'">{{item2.label}}</span>
                            <span v-else @click="linkclickfunc(item2.linkhttp,item2.thisindex,'')" style="color: #336699;cursor: pointer;">{{item2.label}}</span>
                          </div>
                          <div v-if="form.targetMode==1">
                            <span v-if="item1.label1" style="color: #999;transform: scale(0.8);display: inline-block;">({{item1.count}})</span>
                            <span v-if="item2.label.substring(0, 1) == '0'">{{item2.label}}</span>
                            <span v-else @click="linkclickfunc(item2.linkhttp,item2.thisindex,'')" style="color: #336699;cursor: pointer;">{{item2.label}}</span>
                          </div>
                          <div v-if="form.targetMode==2">
                            <span>{{item2.label}}</span>
                          </div>
                        </div>
                        <div v-else>
                          <div v-if="form.targetMode=='-1'">
                            <div v-if="item2.label.substring(0, 1) == '0'">
                              <span>{{item2.label}}</span>
                            </div>
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
                            
                          </div>
                          <div v-if="form.targetMode==1">
                            <div v-if="item2.label.substring(0, 1) == '0'">
                              <span>{{item2.label}}</span>
                            </div>
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
                          </div>
                          <div v-if="form.targetMode==2">
                            <span>{{item2.label}}</span>
                          </div>
                        </div>
                      </template>
                      <template slot-scope="scope">
                        <div v-if="!item2.link" style="position:relative;" >
                          <div v-if="form.targetMode=='-1'"  style="text-algin:center;width: 100%;">
                            <span v-if="item1.label1" style="color: #999;transform: scale(0.8);display: inline-block;">({{scope.row[item2.count]}})</span>
                            <span v-if="scope.row[item2.count]==0">{{scope.row[item2.count]}}</span>
                            <span v-if="scope.row[item2.count]!=0" @click="linkclickfunc(item2.linkhttp,item2.thisindex,'')" style="color: #336699;cursor: pointer;">{{scope.row[item2.count]}}</span>
                            <span>/</span>
                            <span>{{scope.row[item2.num]}}</span>
                          </div>
                          <div v-if="form.targetMode==1"  style="text-algin:center;width: 100%;"  >
                            <span v-if="item1.label1" style="color: #999;transform: scale(0.8);display: inline-block;">({{scope.row[item2.count]}})</span>
                            <span v-if="scope.row[item2.count]==0">{{scope.row[item2.count]}}</span>
                            <span v-if="scope.row[item2.count]!=0" @click="linkclickfunc(item2.linkhttp,item2.thisindex,'')" style="color: #336699;cursor: pointer;">{{scope.row[item2.count]}}</span>
                          </div>
                          <div v-if="form.targetMode==2"  style="text-algin:center;width: 100%;"  >
                            {{scope.row[item2.num]}}
                          </div>
                        </div>

                        <div v-if="item2.link" style="position:relative;" >
                          <div v-if="form.targetMode=='-1'"  style="text-algin:center;width: 100%;"  >
                            <div v-if="scope.row[item2.count]==0">
                              <span v-if="item1.label1" style="color: #999;transform: scale(0.8);display: inline-block;">({{scope.row[item2.count]}})</span>
                              <span>{{scope.row[item2.count]}}</span>
                              <span>/</span>
                              <span>{{scope.row[item2.num]}}</span>
                            </div>
                            <div v-if="scope.row[item2.count]!=0">
                              <span v-if="item1.label1" style="color: #999;transform: scale(0.8);display: inline-block;">({{scope.row[item2.count]}})</span>
                              <el-popover
                                placement="bottom-start"
                                width="130"
                                trigger="hover"
                                popper-class='mypopoverclass'
                                >
                                <p v-for="ii in item2.link" @click="linkclickfunc(ii.linkhttp,item2.thisindex,'')" style="color: #336699;cursor: pointer;line-height: 28px;white-space: pre;">
                                  <span>{{ii.linkname}}</span>    <i class="fourteen-four-icon" style="display: inline-block;"></i>
                                </p>
                                <span slot="reference" style="color: #336699;cursor: pointer;">{{ scope.row[item2.count] }}</span>
                              </el-popover>
                              <span>/</span>
                              <span>{{scope.row[item2.num]}}</span>
                            </div>
                          </div>
                          <div v-if="form.targetMode==1"  style="text-algin:center;width: 100%;"  >
                            <div v-if="scope.row[item2.count]==0">
                              <span v-if="item1.label1" style="color: #999;transform: scale(0.8);display: inline-block;">({{scope.row[item2.count]}})</span>
                              <span>{{scope.row[item2.count]}}</span>
                            </div>
                            <div v-if="scope.row[item2.count]!=0">
                              <span v-if="item1.label1" style="color: #999;transform: scale(0.8);display: inline-block;">({{scope.row[item2.count]}})</span>
                              <el-popover
                                placement="bottom-start"
                                width="130"
                                trigger="hover"
                                popper-class='mypopoverclass'
                                >
                                <p v-for="ii in item2.link" @click="linkclickfunc(ii.linkhttp,item2.thisindex,'')" style="color: #336699;cursor: pointer;line-height: 28px;white-space: pre;">
                                  <span>{{ii.linkname}}</span>    <i class="fourteen-four-icon" style="display: inline-block;"></i>
                                </p>
                                <span slot="reference" style="color: #336699;cursor: pointer;">{{ scope.row[item2.count] }}</span>
                              </el-popover>
                            </div>
                          </div>
                          <div v-if="form.targetMode==2"  style="text-algin:center;width: 100%;"  >
                            {{scope.row[item2.num]}}
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
import { PlTable, PlTableColumn } from "pl-table";
import CheckSelectSpecial from '../../../components/checkSpecial';
import ColumPage from "../../../components/columnMoreHeader";
import {departperson} from "../../../service/organizeDate";
import { statisticsGetParams, statisticsBusinessCount } from '../../../service/BusinessStatisticsList';
import {quickDate} from '../../../utils/getQuickDate';
import { BusinessStatisticsParam } from "../../../utils/BusinessStatistics";

import NewBusinessPage from "./newbusiness";
import detailBusinessPage from "./detailbusiness";
export default {
  data() {
    return {
      DPorPS:1,
      multipleSelection:[],
      currentdata:'',
      tableData:[],
      stateUser1:'stateUser1',
      stateUser2:'stateUser2',
      stateUser3:'stateUser3',
      stateUser4:'stateUser4',
      quarter1:'1',
      quarter2:'1',
      currentNum:0,
      culumnTitle: "业务统计",
      columnData:BusinessStatisticsParam.BusinessStatistics,
      rowHeight:27,
      sessionStr: "BusinessStatistics-list",
      columnValue: false,
      timeDisabled:true,
      seasondisabled:true,
      myparams1:[
        { id: 1, name: "部门", select: false },
        { id: 2, name: "个人", select: false },
        { id: 3, name: "职位", select: false },
      ],
      myparams2:[
        { id: 1, name: "一级部门", select: false },
        { id: 2, name: "二级部门", select: false },
        { id: 3, name: "三级部门", select: false },
        { id: 4, name: "四级部门", select: false },
        { id: 5, name: "五级部门", select: false },
      ],
      myparams3:[],
      myparams3all:{},
      myparams4:[
        { id: 1, name: "完成指标", select: false },
        { id: 2, name: "设置指标", select: false },
      ],
      myparamday:'-1',
      myparamweek:'-1',
      myparammonth:'-1',
      myparamseason:'-1',
      myparamyear:'-1',
      myparams5:[],
      myparams6:[],
      myparams7:[],
      columnDatatotal1:{},
      columnDatatotal2:{},
      columnDatatotal3:{},
      columnDatatotal4:{
        number11: 0,
        number12: 0,
        number13: 0,
        number17: 2,
        number18: 1,
        number19: 0,
      },
      form:{
        timeMode:'日',
        userType:2,
        userIds1:'-1',
        userIds2:'-1',
        targetMode:'-1',
        timeStart:'',
        timeEnd:'',
        
      },
      indexParamsTrueOrFalse:false,
      linkform:{
        id:'',
        colType:'',
        needFlag:true,
        targetMode:'-1',
        time:'',
        timeMode:'日',
        userType:2,
        timeStart:'',
        timeEnd:'',
        userIds1:'',
        userIds2:'',
        userType:'',
      },
    }
  },
  components: {
    ColumPage,
    PlTable,
    PlTableColumn,
    CheckSelectSpecial,
    NewBusinessPage,
    detailBusinessPage,
  },
  methods: {
    //获取参数集合
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
              state:treeData[i].state,
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

          _this.myparams6 = [{ id: "-1", name: "全部", select: true }];
          _this.searchTableData();
        } else if (res.status == 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    searchTableData(){
      let _this =  this;
      _this.currentNum = 0;
      this.$layer.loading({
        shade: true,//是否显示遮罩
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
      _this.linkform.targetMode = form.targetMode;
      _this.linkform.userType = form.userType;
      

      statisticsBusinessCount(form).then(function (res) {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status == 0) {
          _this.tableData = res.data.list;
          if(res.data.list.length!=0){
            for(let i = 1;i<20;i++){
              _this.columnDatatotal1['count'+i+"total"] = JSON.stringify(res.data.total['count'+i])+'/'+res.data.total['num'+i];
              _this.columnDatatotal2['count'+i+"total"] = JSON.stringify(res.data.total['count'+i]);
              _this.columnDatatotal3['count'+i+"total"] = res.data.total['num'+i];

            }
            for(let i in _this.columnDatatotal4){
              _this.columnDatatotal4[i] = res.data.total[i];
            }
            
          }else{
            for(let i = 1;i<20;i++){
               _this.columnDatatotal1["count"+i+"total"] = '0/--';
               _this.columnDatatotal2["count"+i+"total"] = '--';
               _this.columnDatatotal3["count"+i+"total"] = '--';
            }
            for(let i in _this.columnDatatotal4){
              _this.columnDatatotal4[i] = '0';
            }
          }
          
          _this.columnData.forEach(item=>{
            if(item.child){
              item.child.forEach(item1=>{
                if(item1.label1){
                   item1.count = _this.columnDatatotal4[item1.num];
                }
                if(item1.child){
                  item1.child.forEach(item2=>{
                    item2.label = _this.columnDatatotal1[item2.prop];
                  })
                }else{
                  item1.label = _this.columnDatatotal1[item1.prop];
                }
              })
            }
          })

        } else if (res.status == 1) {
          let message = res.msg;
          _this.myAlert(message+"！");
        }

      })
      
    },  
    setupTargetbtnfunc(){
      let _this = this;
      if(_this.multipleSelection.length!=0){
        _this.setupNewTargetfunc(_this.multipleSelection);
      }else{
        _this.myAlert("请选择部门/人员进行指标设置!", "dangerous-icon");
      }
    },

    setupNewTargetfunc(val) {
      let _this = this;

      let layerId = _this.$layer.iframe({
        content: {
          content: NewBusinessPage, //传递的组件对象
          parent: _this, //当前的vue对象
          data: {
            myids:val,
            mydateType:_this.DPorPS,
            myuserType:_this.form.userType,
          } //props
        },
        area: ["800px", "560px"],
        title: "批量设置指标",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件

        }
      });
    },

    setupDetailTargetfunc(val) {
      let _this = this;

      let layerId = _this.$layer.iframe({
        content: {
          content: detailBusinessPage, //传递的组件对象
          parent: _this, //当前的vue对象
          data: {
            myrowdata:val,
            mydateType:_this.DPorPS,
            myuserType:_this.form.userType,
          } //props
        },
        area: ["800px", "560px"],
        title: "指标设置 【"+val.name+"】",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件

        }
      });
      let getLayerId = document.getElementById(layerId);
      let mygetLayerId = document.getElementById(layerId).getAttribute('id');
      document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
      document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
      let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:val.id,oneORmore:1};
      _this.$store.commit('set_active_layerifranme',layerifranmedata);
    },

    myparam1func(val){
      let _this = this;
      if(val==1){
        _this.indexParamsTrueOrFalse = false;
      };
      if(val==2){
        _this.indexParamsTrueOrFalse = false;
      };
      if(val==3){
        _this.indexParamsTrueOrFalse = true;
        _this.form.targetMode = 1;
      }
    },
    myparam2func(val){
      let _this = this;
      this.myparams3 = this.myparams3all['dept'+val];
    },
    targetModechangefunc(val){
      console.log(val);
      debugger;
      let _this = this;
      if(val=='-1'){
        _this.columnData.forEach(item=>{
          if(item.child){
            item.child.forEach(item1=>{
              if(item1.child){
                item1.child.forEach(item2=>{
                  item2.label = JSON.stringify(_this.columnDatatotal1[item2.prop]);
                })
              }else{
                item1.label = JSON.stringify(_this.columnDatatotal1[item1.prop]);
                
              }
            })
          }
        })
      };
      if(val=='1'){
        _this.columnData.forEach(item=>{
          if(item.child){
            item.child.forEach(item1=>{
              if(item1.child){
                item1.child.forEach(item2=>{
                  item2.label = JSON.stringify(_this.columnDatatotal2[item2.prop]);
                })
              }else{
                item1.label = JSON.stringify(_this.columnDatatotal3[item1.prop]);
              }
            })
          }
        })
      }
      if(val=='2'){
        _this.columnData.forEach(item=>{
          if(item.child){
            item.child.forEach(item1=>{
              if(item1.child){
                item1.child.forEach(item2=>{
                  item2.label = JSON.stringify(_this.columnDatatotal3[item2.prop]);
                })
              }else{
                item1.label = JSON.stringify(_this.columnDatatotal3[item1.prop]);
              }
            })
          }
        })
      }
    },
    nameclickfunc(index,row){
      this.setupDetailTargetfunc(row);
    },
    headerRowClass({row, column, rowIndex, columnIndex}){
      let className = "";
      if (column.property == 'count1'||column.property == 'count2'||column.property == 'count3'||column.property == 'count4') {
        className =  ' cellmyth ';
      }
      return className;
      
    },
    linkclickfunc(item,row){
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
      myform.colType = item.thisindex;
      myform.timeStart = this.form.timeStart;
      myform.timeEnd = this.form.timeEnd;
      myform.userType = this.form.userType;
      let thisform = JSON.stringify(myform);
      console.log(thisform);
      this.$router.push({
        path:item,
        query:{
          form:thisform,
        }
      })
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
    getSelectIdByList(list) {
      let arr = [];
      list.forEach(function(item) {
        if (item.select) {
          arr.push(item.id);
        }
      });
      return arr.toString();
    },
    tableRowClassName({ row, rowIndex }) {
      row.myindex = rowIndex + 1;
    },
    //全选
    handleSelectionChange(elemCheckbox) {
      let _this = this;
      //获取用户的选中
      _this.multipleSelection = [];
      _this.taskList = [];
      elemCheckbox.forEach(item => {
        _this.multipleSelection.push(item.id);
        _this.currentdata = item;
        _this.taskList.push({
          id:item.id,
          userId:item.userId
        });
      });
      _this.multipleSelection = Array.from(new Set(_this.multipleSelection));
      // _this.taskList = Array.from(new Set(_this.taskList));
    },
    getRowDataByClick(row, column, event) {
      let _this = this;
      console.log(row);
      _this.currentNum = row.myindex;
    },
    finalCellStyle({row, column, rowIndex, columnIndex}){
      if(column.label=='执行人'||column.label=='任务概念'){
        return 'myselfstyle'
      };
    },
    clearForm() {
      let _this = this;
      _this.form.userType = 2;
      _this.myparams5 = _this.backSlect(_this.myparams5);
      _this.myparams6 = _this.backSlect(_this.myparams6);
      _this.form.targetMode = '-1';
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
      
      // this.$refs["addNewRent"].newRent();
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
    reloadListByStorage() {
      let storage = window.localStorage;
      let titleData = storage.getItem(this.sessionStr);
      let storageColumn = JSON.parse(titleData);
     
      let columnDatas = JSON.parse(JSON.stringify(this.columnData));
      let column = null;
      if (storageColumn) {
        column = storageColumn.column;
         this.rowHeight = storageColumn.height;
      } else {
        column = columnDatas;
      }
      let count = "";
      column.forEach(function(item, index) {
        if (item.fixed) {
          count = index;
        }
      });

      column.forEach(function(item, index) {
        if (!count) {
          item.fixed = false;
        } else {
          if (count >= index) {
            item.fixed = true;
          }
        }
      });
      this.columnData = column;
    },
  },
  mounted() {
    this.changeToOtherPage(1);
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
    height: calc(100% - 80px) !important;
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