<template>
  <div id="contract-finance-container" class="rent-container mycontailerclass1">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2">
        <div class="clear">
          <div class="left padding-l-10" >
            <el-radio @change="changeGoldExtractionType(3)" v-model="goldExtractionType" :label="3">&nbsp;</el-radio>
          </div>
          <div class="left" >
            人总提金
          </div>
          <div class="left padding-l-15"  >
            <el-radio  @change="changeGoldExtractionType(1)" v-model="goldExtractionType" :label="1">&nbsp;</el-radio>
          </div>
          <div class="left" >
            人月提金
          </div>
          <div class="left padding-l-10" >
            <el-radio @change="changeGoldExtractionType(2)" v-model="goldExtractionType" :label="2">&nbsp;</el-radio>
          </div>
          <div class="left" >
            人结提金
          </div>
         
          <div class="left padding-l-10" >
            <el-radio @change="changeGoldExtractionType(4)" v-model="goldExtractionType" :label="4">&nbsp;</el-radio>
          </div>
          <div class="left" >
            人笔提金
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div v-if="goldExtractionType ==1" class="item left padding-l-10 clear"  @click="showNewGoldExtraction" >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="fa fa-plus add"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >新增</span>
              </div>
            </div>  
          </div>

          <div v-if="goldExtractionType ==1" class="item left clear padding-l-10" @click="showDeletedGoldExtraction"  >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="fa fa-times delete"  ></i>
              </div>
              <div class="left"  >
                <span class="search-word" >删除</span>
              </div>
            </div>
          </div>
          <div v-if="goldExtractionType ==4" class="item left padding-l-10 clear"  @click="budgetGoldExtraction" >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="budget-icon"></i>
              </div>
              <div class="left"  >
                <span class="search-word" >结算</span>
              </div>
            </div>  
          </div>

          <div v-if="goldExtractionType ==4" class="item left clear padding-l-10" @click="cancelBudgetGoldExtraction"  >
            <div class="border-icon clear" > 
              <div class="left"  >
                <i class="no-budget-icon"  ></i>
              </div>
              <div class="left"  >
                <span class="search-word" >取消结算</span>
              </div>
            </div>
          </div>

          <div class="left padding-l-10" @click="filterData" style="cursor:pointer;">
            <div class="border-icon clear" > 
             <i class="filterchoose-icon" title="过滤选中"></i>
            </div> 
          </div>
          <div class="left padding-l-5">
            <i class="cut-icon"></i>
          </div>

          <div v-if="goldExtractionType != 4" class="left padding-l-10">
            <div class="border-icon clear" > 
              <i class="leading-out-icon" title="自选列" @click="clickColumn"></i>
            </div>  
          </div>

          <div class="item padding-l-5 left">
            <div class="record-num">
              <span class="search-word">&lt;</span>
              <span class="search-word">{{currentNum}}</span>
              <span class="search-word">/</span>
              <span class="search-word">{{currentTableNum}}</span>
              <span class="search-word">&gt;</span>
            </div>
          </div>

          <div class="item left clear padding-l-15">
            <div class="border-icon clear" > 
              <i class="back-icon user left" @click="tabRemove('/home/goldExtraction')"></i>
            </div>  
          </div>
        </div>
      </div>
      <div class="search-container">
        <el-form ref="formsData" :model="form">
          <div class="clear">
            <!-- <div class="clear left" v-if="goldExtractionType != 3" > -->
            <div class="clear left">
              <div class="clear left" v-if="goldExtractionType !=3 ">
                <div class="left padding-l-10">
                  <span class="des-word">年月</span>
                </div>

                <div class="left padding-l-2">
                  <el-form-item label label-width="0">
                    <el-date-picker
                      type="month"
                      value-format="yyyy-MM"
                      :disabled="timeDisabled"
                      v-model="form.timeStart"
                      style="width: 80px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="left padding-l-2">
                  <el-form-item label label-width="0">
                    <el-date-picker
                      type="month"
                      value-format="yyyy-MM"
                      :disabled="timeDisabled"
                      v-model="form.timeEnd"
                      style="width: 80px;"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              

              <div class="clear left" v-if="goldExtractionType ==4" >
                <div class="left padding-l-15" >
                  <span class="des-word " >角度</span>
                </div>
                <div class="left padding-l-2" >
                  <el-form-item label="" label-width="0" >
                    <el-select @change="changModel" v-model="form.model"    style="width:80px;"   >
                      <el-option  label="业绩分成" value="2" ></el-option>
                      <el-option  label="评价奖金" value="1" ></el-option>
                    </el-select>
                  </el-form-item>
                </div> 
                <div class="left padding-l-2" v-if="form.model==2">
                  <el-form-item label="" label-width="0" >
                    <el-select @change="changModel" v-model="form.type"    style="width:80px;"   >
                      <el-option  label="全部" value="-1" ></el-option>
                      <el-option  label="部门管理业绩" value="2" ></el-option>
                      <el-option  label="个人业务业绩" value="1" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <!-- <div class="left padding-l-2" v-if="form.model==1" style="width: 85px;">
                </div>   -->
              </div> 

              <div class="clear left" v-if="goldExtractionType == 1 || goldExtractionType == 2 || goldExtractionType == 3" >
                <div class="left padding-l-15" >
                  <span class="des-word " >模式</span>
                </div>
                <div class="left padding-l-2" >
                  <el-form-item label="" label-width="0" >
                    <el-select @change="changModel" v-model="form.type"    style="width:80px;"   >
                      <el-option  label="全部" value="-1" ></el-option>
                      <el-option  label="部门管理业绩" value="2" ></el-option>
                      <el-option  label="个人业务业绩" value="1" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>  
              </div>

              <div class="clear left">
                <div class="left padding-l-15" >
                  <span class="des-word " >人力状态</span>
                </div>
                <div class="left padding-l-2" >
                  <el-form-item label="" label-width="0" >
                    <CheckSelectSpecial :selectId="select1" :listData="userStateIdParams" style="width:80px;" ></CheckSelectSpecial>
                  </el-form-item>
                </div>
                <div class="left padding-l-2" >
                  <el-form-item label="" label-width="0" >
                    <CheckSelectSpecial :selectId="select2" :listData="stateParams1" style="width:80px;" ></CheckSelectSpecial>
                  </el-form-item>
                </div>
                <div class="left padding-l-2" >
                  <el-form-item label="" label-width="0" >
                    <CheckSelectSpecial :selectId="select3" :listData="stateParams2" style="width:80px;" ></CheckSelectSpecial>
                  </el-form-item>
                </div> 
              </div>
               
            </div>

            <div class="left padding-l-15" >
              <span class="des-word " >职位</span>
            </div>
            <div class="left padding-l-2" >
              <el-form-item label="" label-width="0" >
                <CheckSelectSpecial :selectId="select6" :listData="staffIdParams" style="width:80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
              <span v-if="goldExtractionType != 4" class="des-word " >分成人<span style="color: #999;display: inline-block;transform: scale(0.8);">(欠款)</span></span>
              <span v-else-if="goldExtractionType == 4 && form.model == 2" class="des-word " >分成人<span style="color: #999;display: inline-block;transform: scale(0.8);">(欠款)</span></span>
              <span v-else-if="goldExtractionType == 4 && form.model == 1" class="des-word " >被奖人<span style="color: #999;display: inline-block;transform: scale(0.8);">(欠款)</span></span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" >
                <CheckSelectSpecial
                  @findStreetByTown="finUserByDepart"
                  :selectId="select4"
                  :listData="executorList"
                  style="width:90px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-2">
              <el-form-item label label-width="0" >
                <CheckSelectSpecial
                  :selectId="select5"
                  :listData="userParams"
                  style="width:80px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left" style="padding-left:15px;" >
              <el-form-item prop="word" label-width="0">
                <el-input
                  v-model.trim="form.word"
                  :title="searchTitle"
                  maxlength="30"
                  style="width:100px;"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-5" style="padding-top:2px;">
              <i @click="searchGoldExtractionListData" class="search-btn" style="cursor:pointer;">查询</i>
            </div>
            <div class="left" style="padding-top:3px;">
              <i class="claerlys" @click="clearForm"></i>
            </div>

          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear" style="height:calc(100% - 96px);" >
      <div name="1"  v-show="goldExtractionType == 1" class="list-content 111">
        <PlTable
          :datas="tableData"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
          :cell-class-name="rowClass"
          :row-height="rowHeight1"
          ref="singleTable"
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
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
            >
            </PlTableColumn>
            <pl-table-column
              v-else-if="item.prop == 'user'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              :show-overflow-tooltip="true"
            >
              <template slot="header" slot-scope="scope">   
                <span style="color:#999;transform: scale(0.8);display: inline-block;" >(当时)</span>
                <span>{{item.label}}</span>
              </template>
              <template slot-scope="scope" style="height: 100%;">
                <div
                 
                  :style="{'color':scope.row.state =='正式离职' ? '#999' :'#336699','text-algin':'center','cursor':'pointer','z-index': '333','font-weight': 'bold','position':'relative','height':'25px'}"
                  
                >
                  <div v-if="scope.row.jobTime1 != ''" class="left-content" >
                    <span class="left-l-div" >
                    <span class="word-span-1" style="float: left;display:inline-block;">{{scope.row.jobTime1}}</span>
                    </span>
                    <span class="right-l-div" >
                    <span class="word-span" style="float: left;display:inline-block;">{{scope.row.jobTime2}}</span>
                    </span>
                  </div>
                  <!-- 状态 -->
                  <div v-if="scope.row.state3">
                    <div v-if="scope.row.state3.indexOf('强制')!=-1" class="nine-one-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -40px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('未办')!=-1" class="eight-eleven-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -11px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('黑名')!=-1" class="eight-nine-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: 20px;">
                    </div>
                  </div>
                  <span style="position:absolute;left:19px;top:3px;font-weight:700;" @click="editorBouns(scope.$index, scope.row)" >{{scope.row.user}}</span> 
                  <div v-if="scope.row.stopTime1 != ''" class="right-content-specail" >
                    <span class="left-r-div" >
                      <span class="word-r-span-1" style="float: left;display:inline-block;">{{scope.row.stopTime1}}</span>
                    </span>
                    <span class="right-r-div" >
                      <span class="word-r-span" style="float: left;display:inline-block;">{{scope.row.stopTime2}}</span>
                    </span>
                  </div>
                  <div class="" style="position:absolute;right:-5px;bottom:-2px;">
                    <i class="down-angle-icon"  @click="showBusiness(scope.$index, scope.row)"  ></i>
                  </div>
                </div>
                
              </template>
              
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'state'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.state}}-{{scope.row.state2}}
                </div>
              </template>
            </pl-table-column>

            <pl-table-column
              v-else-if="item.prop == 'staffId'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              :show-overflow-tooltip="true"
            >
              <template  v-if="item.show" slot="header">
                <span style="color: #999;transform: scale(0.8);display: inline-block;">(当时)</span>
                <span>{{item.label}}</span>
              </template>
            </pl-table-column>

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
              slot-scope="scope"
            >
               
               <template v-if="item1.show" v-for="item1 in item.child" >
                <PlTableColumn
                    v-if='item.child||item.child.length>0 '
                    
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item.sortable"
                    :align="item.align"
                    >
                    <template slot="header" slot-scope="scope">
                      <div class="clear" style="position:relative;" >
                      
                        <span :class="{'weight-font':item1.prop == 'type1_m_num3' || item1.prop == 'type1_m_num6' || item1.prop == 'type1_y_num3' || item1.prop == 'type1_y_num6' || item1.prop == 'type2_m_num2' || item1.prop == 'type2_y_num2'}" >{{item1.label}}</span>
                      </div>
                    </template>
                     <PlTableColumn
                    v-for="item2 in item1.child"
                    :label="item2.label"
                    :prop='item2.prop'
                    :width='item2.width'
                    :sortable="item2.sortable"
                    :align="item2.align"
                    > 
                      <template slot-scope="scope" style="height: 100%;">
                        <div style="position:relative;" >
                          <div :class="{'has-value-color':scope.row[item1.prop] != 0,'weight-font':item1.prop == 'type1_m_num3' || item1.prop == 'type1_m_num6' || item1.prop == 'type1_y_num3' || item1.prop == 'type1_y_num6' || item1.prop == 'type2_m_num2' || item1.prop == 'type2_y_num2'}" style="text-algin:center;width: 100%;"  >
                            {{ scope.row[item1.prop] }}
                          </div>
                          <div v-if="item1.prop == 'type1_m_num6' && scope.row[item1.prop] != 0" class="" style="position:absolute;right:-5px;bottom:-2px;">
                            <i class="down-angle-icon"  @click="noBusiness(scope.row,'月')"  ></i>
                          </div>
                          <div v-else-if="item1.prop == 'type1_y_num6' && scope.row[item1.prop] != 0" class="" style="position:absolute;right:-5px;bottom:-2px;">
                            <i class="down-angle-icon"  @click="noBusiness(scope.row,'年')"  ></i>
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
       <div name="2"   v-show="goldExtractionType == 2"  class="list-content">
        <PlTable
          :datas="tableData1"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName1"
          @row-click="getRowDataByClick1"
          @selection-change="handleSelectionChange1"
          :cell-class-name="rowClass1"
          :row-height="rowHeight2"

        >
          <template v-if="item.show" v-for="(item,index) in columnData1">
            <PlTableColumn
              v-if="item.prop == 'check'"
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
            </PlTableColumn>
           
             <PlTableColumn
              v-else-if="item.prop == 'time'"
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
            </PlTableColumn>

            

            <PlTableColumn
              v-else-if="item.prop == 'user'"
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
             <template slot="header" slot-scope="scope">
                <span style="color:#999;transform: scale(0.8);display: inline-block;" >(当时)</span>
                <span>{{item.label}}</span>
              </template>
              <template slot-scope="scope" style="height: 100%;">
                <div
                 
                  style="font-weight:700;height:25px;text-algin:center;cursor:pointer;position:relative;"
                  
                >
                  <div v-if="scope.row.jobTime1 != ''" class="left-content" >
                    <span class="left-l-div" >
                    <span class="word-span-1" style="float: left;display:inline-block;">{{scope.row.jobTime1}}</span>
                    </span>
                    <span class="right-l-div" >
                    <span class="word-span" style="float: left;display:inline-block;">{{scope.row.jobTime2}}</span>
                    </span>
                  </div>
                  <!-- 状态 -->
                  <div v-if="scope.row.state3">
                    <div v-if="scope.row.state3.indexOf('强制')!=-1" class="nine-one-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -40px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('未办')!=-1" class="eight-eleven-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -11px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('黑名')!=-1" class="eight-nine-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: 20px;">
                    </div>
                  </div>
                  <span style="position:absolute;left:19px;top:3px;">{{scope.row.user}}</span> 
                  <div v-if="scope.row.stopTime1 != ''" class="right-content-specail" >
                    <span class="left-r-div" >
                      <span class="word-r-span-1" style="float: left;display:inline-block;">{{scope.row.stopTime1}}</span>
                    </span>
                    <span class="right-r-div" >
                      <span class="word-r-span" style="float: left;display:inline-block;">{{scope.row.stopTime2}}</span>
                    </span>
                  </div>
                  
                </div> 
              </template>
              
            </PlTableColumn>
            <PlTableColumn
              v-else-if="item.prop == 'total_num'"
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
               <template slot-scope="scope" style="height: 100%;">
                <div style="position:relative;" >
                  <div class="" style="text-algin:center;width: 100%;" >
                    {{ scope.row.total_num }}
                  </div>
                  <div v-if="item.prop == 'total_num' && scope.row[item.prop] != 0" class="" style="font-weight:700;position:absolute;right:-5px;bottom:-2px;">
                    <i class="down-angle-icon"  @click="showBusiness(scope.$index, scope.row)"  ></i>
                  </div>
                </div>  
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
              slot-scope="scope"
            >
              <template v-if="item1.show" v-for="item1 in item.child" >
                <PlTableColumn
                    v-if='item.child&&item.child.length>0'
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item.sortable"
                    :align="item.align"
                    >
                    <template slot="header" slot-scope="scope">
                      <div class="clear" style="position:relative;" >
                      
                        <span :class="{'weight-font': item1.prop == 'type1_m_num1' || item1.prop == 'type1_y_num1' || item1.prop == 'type2_m_num1' || item1.prop == 'type2_y_num1'}" >{{item1.label}}</span>
                      </div>
                    </template>
                     <PlTableColumn
                    v-for="item2 in item1.child"
                    :label="item2.label"
                    :prop='item2.prop'
                    :width='item2.width'
                    :sortable="item2.sortable"
                    :align="item2.align"
                    > 
                      <template slot-scope="scope" style="height: 100%;">
                        <div style="position:relative;" >
                          <div :class="{'weight-font': item1.prop == 'type1_m_num1' || item1.prop == 'type1_y_num1' || item1.prop == 'type2_m_num1' || item1.prop == 'type2_y_num1'}"  style="text-algin:center;width: 100%;"  >
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
      <div name="3"  v-show="goldExtractionType == 3"  class="list-content">
        <PlTable
          :datas="tableData2"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
          :row-class-name="tableRowClassName2"
          @row-click="getRowDataByClick2"
          @selection-change="handleSelectionChange2"
          :header-cell-class-name="headerRowClass"
          @header-click="headerClick"
          :cell-class-name="rowClass2"
          :row-height="rowHeight3"
        >
          <template v-if="item.show" v-for="(item,index) in columnData2">
            <PlTableColumn
              v-if="item.prop == 'check'"
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
              <template  slot-scope="scope" style="height: 100%;">
                <div
                  v-if="scope.row.id == '-1'" 
                  style="height:25px;text-algin:center;position:relative;"
                  
                >
                  总计
                </div>
                 <div
                  v-else-if="scope.row.id != '-1'" 
                  style="height:25px;text-algin:center;position:relative;"
                  
                >
                  <el-checkbox style="height:20px;"  v-model="scope.row.checked"  :false-label="0" :true-label="1"  ></el-checkbox>
                </div>  
              </template>
            </PlTableColumn>
            <pl-table-column
              v-else-if="item.prop == 'user'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope" style="height: 100%;">
                <div
                 
                  style="font-weight:700;height:25px;text-algin:center;cursor:pointer;position:relative;"
                  
                >
                  <div v-if="scope.row.jobTime1 != ''" class="left-content" >
                    <span class="left-l-div" >
                    <span class="word-span-1" style="float: left;display:inline-block;">{{scope.row.jobTime1}}</span>
                    </span>
                    <span class="right-l-div" >
                    <span class="word-span" style="float: left;display:inline-block;">{{scope.row.jobTime2}}</span>
                    </span>
                  </div>
                  <!-- 状态 -->
                  <div v-if="scope.row.state3">
                    <div v-if="scope.row.state3.indexOf('强制')!=-1" class="nine-one-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -40px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('未办')!=-1" class="eight-eleven-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: -11px;">
                    </div>
                    <div  v-if="scope.row.state3.indexOf('黑名')!=-1" class="eight-nine-icon" style="position: absolute;top: 50%;margin-top: 2px;left: 50%;margin-left: 20px;">
                    </div>
                  </div>
                  <span style="position:absolute;left:19px;top:3px;">{{scope.row.user}}</span> 
                  <div v-if="scope.row.stopTime1 != ''" class="right-content-specail" >
                    <span class="left-r-div" >
                      <span class="word-r-span-1" style="float: left;display:inline-block;">{{scope.row.stopTime1}}</span>
                    </span>
                    <span class="right-r-div" >
                      <span class="word-r-span" style="float: left;display:inline-block;">{{scope.row.stopTime2}}</span>
                    </span>
                  </div>
                  
                </div> 
              </template>
              
            </pl-table-column>
            <PlTableColumn
              v-else-if="item.prop == 'total_num1'"
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
             <template slot="header" slot-scope="scope">
                <div class="clear" style="position:relative;top:10px;z-index:10;" >
                  <span>{{item.label}}</span>
                </div>
            </template>
              <template  v-for="item1 in item.child" >
                <PlTableColumn
                    v-if='item.child||item.child.length>0'
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item.sortable"
                    :align="item.align"
                    >
                    
                     <PlTableColumn
                    v-for="item2 in item1.child"
                    :label="item2.label"
                    :prop='item2.prop'
                    :width='item2.width'
                    :sortable="item2.sortable"
                    :align="item2.align"
                    > 
                       <template slot-scope="scope" style="height: 100%;">
                        <div style="position:relative;" >
                          <div  style="text-algin:center;width: 100%;"  >
                            {{ scope.row.total_num }}
                          </div>
                          <div class="" style="position:absolute;right:-5px;bottom:-2px;">
                            <i class="down-angle-icon"  @click="totlaPersonDebt(scope.row,'年')"  ></i>
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
              slot-scope="scope"
            >
              <template v-if="item1.show" v-for="item1 in item.child" >
                <PlTableColumn
                    v-if='item.child||item.child.length>0'
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item.sortable"
                    :align="item.align"
                    >
                    <template slot="header" slot-scope="scope">
                      <div class="clear" style="position:relative;" >
                      
                        <span :class="{'weight-font':item1.prop == 'type1_m_num3' || item1.prop == 'type1_y_num3'}" >{{item1.label}}</span>
                      </div>
                    </template>
                     <PlTableColumn
                    v-for="item2 in item1.child"
                    :label="item2.label"
                    :prop='item2.prop'
                    :width='item2.width'
                    :sortable="item2.sortable"
                    :align="item2.align"
                    > 
                      
                      <template slot-scope="scope" style="height: 100%;">
                        <div style="position:relative;" >
                          <div :class="{'has-value-color':scope.row[item1.prop] != 0,'weight-font':item1.prop == 'type1_m_num3' || item1.prop == 'type1_y_num3'}" style="text-algin:center;width: 100%;"  >
                            {{ scope.row[item1.prop] }}
                          </div>
                          <div v-if="item1.prop == 'type1_m_num3' && scope.row[item1.prop] != 0 && scope.row['user'] != '总计'" class="" style="position:absolute;right:-5px;bottom:-2px;">
                            <i class="down-angle-icon"  @click="totlaNoBudgetBusiness(scope.row,'月')"  ></i>
                          </div>
                          <div v-else-if="item1.prop == 'type1_y_num3' && scope.row[item1.prop] != 0 && scope.row['user'] != '总计'" class="" style="position:absolute;right:-5px;bottom:-2px;">
                            <i class="down-angle-icon"  @click="totlaNoBudgetBusiness(scope.row,'年')"  ></i>
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
      <div v-if="goldExtractionType == 4 && form.model == 2" class="list-content search-container table-special"  style="border-width: 0px 0 0 0px;height:calc(100% - 150px);" >
          <el-form ref="formsDataList"  :model="formList" style="height:100%;" >

           <PlTable
          :datas="tableData3"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
         
          :row-height="40"
        >
           <template v-if="item.show" v-for="(item,index) in columnData3">
             
            <PlTableColumn
              v-if="item.prop == 'user1'"
              :prop="item.prop"
              :label="item.label"
              :width="1300"
              :type="item.type"
              :ref="item.ref"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"

            >
              <template slot="header" slot-scope="scope">
                  <div class="title clear" style="" >
                    <div class="left" style="width:30px;text-align:center;" >
                      <span class="title-des" style="border-width:2px;" @click="checkAll1" >√</span>
                    </div>
                    <div class="left"  style="width:141px;text-align:center;" >
                      <span class="title-des" >分成人</span>
                    </div>
                    <div class="left"  style="width:86px;text-align:center;" >
                      <span class="title-des" >业绩年月</span>
                    </div>
                    <div class="left"  style="width:217px;text-align:center;" >
                      <span class="title-des" >业类事件</span>
                    </div>
                  
                    <div class="left"  style="width:130px;text-align:center;" >
                      <span class="title-des" >分成比例/应实业绩</span>
                    </div>
                  
                    <div class="left"  style="width:130px;text-align:center;" >
                      <span class="title-des" >模式</span>
                    </div>
                    <div class="left"  style="width:72px;text-align:center;" >
                      <span class="title-des" >特殊扣除</span>
                    </div>
                    <div class="left"  style="width:85px;text-align:center;" >
                      <span class="title-des" >应计提成</span>
                    </div>
                    

                    <div class="left"  style="width:63px;text-align:center;" >
                      <span class="title-des" >方式</span>
                    </div>
                    <div class="left"  style="width:106px;text-align:center;" >
                      <span class="title-des" >结算/年月</span>
                    </div>
                    <div class="left"  style="width:91px;text-align:center;" >
                      <span class="title-des" >首次结算</span>
                    </div>  
                    
                    <div class="left"  style="width:65px;text-align:center;" >
                      <span class="title-des" >计工资</span>
                    </div>
                  </div>
              </template>
              <template  slot-scope="scope" style="height: 100%;">
                <div class="clear "   >
                  
                  <div class="left elem-border clear" style="position:relative;padding:6px 0;margin-bottom:5px;" >
                      <div class="left" style="padding-left:5px;" >
                          <el-checkbox  style="height:20px;"   v-model="scope.row.dataCheck"  :false-label="0" :true-label="1"  ></el-checkbox>
                         
                      </div>

                      <div class="left" style="padding:5px 10px 0 10px;" >
                        <i @click="goldExtractSet(scope.row.userTimeId)" :class="{'manage-icon':scope.row.juniorBonusId,'business-icon':scope.row.juniorBonusId == null || scope.row.juniorBonusId == '','left':true}" style="display:inline-block;width:18px;height:18px;" ></i>
                      </div>
                      <div class="left padding-left-1" >
                          <el-form-item  >
                              <el-input  :disabled="true"  :title="scope.row.uname" style="width:105px;" v-model.trim="scope.row.uname"  autocomplete="off"></el-input>
                          </el-form-item>
                      </div>
                      <div class="left fourContent " style="padding-left:13px;" >
                          <el-form-item  >
                               <el-date-picker
                              type="month"
                               
                               
                              value-format="yyyy-MM"
                                style="width: 70px;"  :disabled="true"    v-model.trim="scope.row.time" ></el-date-picker>
                          </el-form-item>
                         
                      </div>  
                      <div class="left" style="padding-left:16px;" >
                          <el-form-item  >
                              <el-select  :disabled="true" :title="scope.row.categoryName"   v-model="scope.row.categoryOne"    style="width:50px;" >
                                  <el-option  v-for="item in categoryOneParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                          </el-form-item>
                      </div>
                      <div class="left padding-left-1" >
                          <el-form-item  >
                              <el-input  :disabled="true"  class="is-blue"  style="width:150px;" v-model.trim="scope.row.event"  autocomplete="off"></el-input>
                          </el-form-item>
                      </div>

                      
                      
                        <div class="left " style="padding-left:16px;" >
                          <el-form-item  >
                              <el-input  :disabled="true"  style="width:50px;" v-model.trim="scope.row.proportion"  autocomplete="off"></el-input>
                          </el-form-item>
                      </div>
                      <div class="left" style="padding-left:1px;" >
                          <el-form-item  >
                              <el-input  :disabled="true"  class="is-black" style="width:60px;" v-model.trim="scope.row.receivable" autocomplete="off"></el-input>
                          </el-form-item>
                      </div>
                      <div class="left" style="padding-left:24px;" >
                          <el-form-item  >
                              <el-select :disabled="scope.row.showClose == '1'"   v-model="scope.row.patternLevel"    style="width:112px;" >
                                  <el-option  v-for="item in scope.row.patternLevelParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                          </el-form-item>
                      </div>
                       <div class="left " style="padding-left:12px;"  >
                          <el-form-item  >
                              <el-input :disabled="scope.row.showClose == '1'" @input="specialchangefunc(scope.row)" style="width:60px;" class="is-yellow" v-model.trim="scope.row.deduct" title="上限10位数" maxLength="13" autocomplete="off"></el-input>
                          </el-form-item>
                      </div>  
                      <div class="left" style="padding-left:12px;" >
                          <el-form-item  >
                              <el-input  :disabled="true"   class="is-greent"  style="width:70px;" v-model.trim="scope.row.bonus"  autocomplete="off"></el-input>
                          </el-form-item>
                      </div>
                     
                      <div class="left" style="padding-left:15px;"  >
                          <el-form-item  >
                              <el-select :disabled="scope.row.showClose == '1'"   v-model="scope.row.type"    style="width:50px;" >
                                  <el-option  v-for="item in timeParams"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                          </el-form-item>
                      </div>
                      <div class="left " style="padding:0 1px 0 15px;" >
                          <el-form-item  >
                              <el-checkbox  style="height:20px;"   v-model="scope.row.check"  :false-label="0" :true-label="1"  ></el-checkbox>

                          </el-form-item>
                      </div>    
                      <div class="left " >
                          <el-form-item  >
                              <el-date-picker
                              type="month"
                               
                              :disabled="scope.row.showClose == '1'" 
                              value-format="yyyy-MM"
                              :picker-options="pickerOptions"
                              v-model="scope.row.balanceTime"
                                style="width: 80px;"
                                ></el-date-picker>

                          </el-form-item>
                      </div>
                       
                        <div class="left padding-left-1" style="padding-left:10px;position:relative;" >
                          <div class="left" style="padding:6px 2px 0;position:absolute;z-index:1;" >
                              <i @click="goleElemQuestion(scope.row.id,scope.row.balanceBonus,scope.row.uname)" class="question-gold-icon" ></i> 
                          </div>
                          <el-form-item  >
                              <el-input  :disabled="true"   class="is-greent"   style="width:80px;" v-model.trim="scope.row.balanceBonus"  autocomplete="off"></el-input>
                          </el-form-item>
                      </div>
                     
                        <div class="left padding-left-1" style="padding-left:10px;" >
                          <el-form-item  >
                              <el-checkbox  style="height:20px;"   v-model="scope.row.isCalculateSalary"  :false-label="0" :true-label="1"  ></el-checkbox>

                          </el-form-item>
                      </div>
                      <div class="left padding-left-5" >
                          <span class="des-word" >计工资</span>
                      </div> 
                      <div class="" style="position:absolute;right:0px;bottom:-7px;" >
                          <i @click="goldElemRemark(scope.row.explainRemark,index)" class="angle-disabled-gold-icon" ></i>
                      </div> 
                  </div>
                  <div class="left padding-left-5" style="padding-top:10px;" >
                    <span v-if="scope.row.showClose == '0'" @click="saveBusiness(scope.row,index,2)" class="save-btn" >保存</span>
                    <span v-else  style="font-weight:700;color:#6FB984;" >已封账</span>
                  </div>          
                </div>   
              </template>
            </PlTableColumn>
           </template> 
        </PlTable>
          </el-form>  
         
      </div>
      <div v-if="goldExtractionType == 4 && form.model == 1" class="list-content search-container table-special" style="border-width: 0px 0 0 0px;" >

         <el-form ref="formsDataList1"  :model="formList1" style="height:100%;" >

           <PlTable
          :datas="tableData4"
          :pagination-show="false"
          use-virtual
          empty-text=" "
          border
          height="100%"
         
          :row-height="40"
        >
           <template v-if="item.show" v-for="(item,index) in columnData4">
             
            <PlTableColumn
              v-if="item.prop == 'user1'"
              :prop="item.prop"
              :label="item.label"
              :width="1350"
              :type="item.type"
              :ref="item.ref"
              :show="item.show"
              :fixed="item.fixed"
              :align="item.align"

            >
              <template slot="header" slot-scope="scope">
                   <div class="title clear"  >
                    <div class="left" style="width:30px;text-align:center;" >
                      <span class="title-des" style="border-width:2px;" @click="checkAll2" >√</span>
                    </div>
                    <div class="left"  style="width:120px;text-align:center;" >
                      <span class="title-des" >被奖人</span>
                    </div>
                    <div class="left"  style="width:90px;text-align:center;" >
                      <span class="title-des" >奖金年月</span>
                    </div>
                    <div class="left"  style="width:75px;text-align:center;" >
                      <span class="title-des" >星级</span>
                    </div>
                    <div class="left"  style="width:86px;text-align:center;" >
                      <span class="title-des" >应计奖金</span>
                    </div>
                    <div class="left"  style="width:60px;text-align:center;" >
                      <span class="title-des" >方式</span>
                    </div>
                    <div class="left"  style="width:110px;text-align:center;" >
                      <span class="title-des" >结算年月</span>
                    </div>
                    <div class="left"  style="width:90px;text-align:center;" >
                      <span class="title-des" >结算奖金</span>
                    </div>
                    <div class="left"  style="width:533px;text-align:center;" >
                      <span class="title-des" >备注</span>
                    </div>
                  
                    <div class="left"  style="width:65px;text-align:center;" >
                      <span class="title-des" >计工资</span>
                    </div>
                  </div>
              </template>
              <template  slot-scope="scope" style="height: 100%;">
                  <div class="clear " >
                  
                    <div class="left elem-border clear" style="position:relative;padding:6px 0;margin-bottom:5px;" >
                        <div class="left" style="padding-left:5px;" >
                            <el-form-item  >
                                  <el-checkbox  style="height:20px;"   v-model="scope.row.dataCheck"  :false-label="0" :true-label="1"  ></el-checkbox>
                            </el-form-item>
                        </div>
                        <div class="left" style="padding:5px 10px 0 10px;" >
                          <i @click="goldExtractSet(scope.row.userTimeId)" :class="{'reward-icon':true,'left':true}" style="display:inline-block;width:18px;height:18px;" ></i>
                        </div>
                        <div class="left" style="" >
                            <el-form-item  >
                                <el-input  :disabled="true" :title="scope.row.uname"   style="width:85px;" v-model.trim="scope.row.uname"  autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                        <div class="left fourContent" style="padding-left:13px;" >
                            <el-form-item  >
                                <el-date-picker
                                type="month"
                                
                                
                                value-format="yyyy-MM"  :disabled="true"   style="width:70px;" v-model.trim="scope.row.time"  autocomplete="off"></el-date-picker>
                            </el-form-item>
                          
                        </div>  
                        <div class="left" style="padding-left:25px;" >
                            <el-form-item  >
                                <el-select @change="changeLevel(scope.row)"  v-model="scope.row.starLevel"    style="width:50px;" >
                                    <el-option  v-for="item in scope.row.starParams"  :label="item.name" :value="item.id" ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="left " style="padding-left:25px;" >
                            <el-form-item  >
                                <el-input :disabled="true" class="is-greent" style="width:60px;" v-model.trim="scope.row.bonus" autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                          <div class="left" style="padding-left:20px;" >
                            <el-form-item  >
                                <el-select  @change="changeLevel(scope.row)"   v-model="scope.row.type"    style="width:45px;" >
                                    <el-option  v-for="item in timeParams"  :label="item.name" :value="item.id" ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        
                        <div class="left " style="padding-left:15px;" >
                            <el-form-item  >
                                <el-checkbox  style="height:20px;"   v-model="scope.row.check"  :false-label="0" :true-label="1"  ></el-checkbox>

                            </el-form-item>
                        </div>
                        <div class="left padding-left-5" >
                            <el-form-item  >
                                <el-date-picker 
                                type="month"
                                
                                
                                value-format="yyyy-MM"
                                v-model="scope.row.balanceTime" 
                                :picker-options="pickerOptions"
                                style="width: 80px;"
                              ></el-date-picker>
    
                            </el-form-item>
                        </div>
                          <div class="left padding-left-10" >
                            <el-form-item  >
                                <el-input   :disabled="true" class="is-greent" style="width:78px;" v-model.trim="scope.row.balanceBonus"  autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                          <div class="left " style="padding-left:30px;" >
                            <el-form-item  >
                                <el-input   style="width:505px;" v-model.trim="scope.row.explainRemark" title="上限100个字" maxLength="100" autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                          <div class="left padding-left-10" >
                            <el-form-item  >
                                <el-checkbox  style="height:20px;"   v-model="scope.row.isCalculateSalary"  :false-label="0" :true-label="1"  ></el-checkbox>

                            </el-form-item>
                        </div>
                        <div class="left padding-left-5" >
                            <span class="des-word" >计工资</span>
                        </div> 
                    </div>
                    <div class="left padding-left-5" style="padding-top:10px;" >
                        <span @click="saveBusiness(scope.row,index,1)" class="save-btn" >保存</span>
                    </div>          
                </div>    
              </template>
            </PlTableColumn>
           </template> 
        </PlTable>
      </el-form>  
         
            
      </div>   
    </div>
    
  </div>
</template>


<script>
  /*获取数据
   *
   * */
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  import { findUserByDepartId } from "../../../service/organizeDate";
  import {InsuranceMoneyParams} from "../../../service/InsuranceMoney"; 

  import {goldExtractionBudgetTime,goldExtractionTotalDebt,goldExtractType1,goldExtractType2,goldExtractType3,goldExtractType4,deletedBatchBouns,goldExtractEditor,goldExtractModify} from "../../../service/goldExtractionData";
  import { goldExtractionParam } from "../../../utils/goldExtractionParam";
  import {orgnizetionParam} from '../../../utils/orgnizeparam'
  import EditorBounsPage from "./editorGoldExtraction";
  import GoldExtractionBusinessDetailPage from "./goldExtractionBusinessDetail";
  import NoGoldExtractionBusinessDetailPage from "./noGoldExtractionBusiness";
  import TotalNoBudgetGoldExtractionPage from "./totalNoBudgetGoldExtraction";
  import goldExtractionsettlementPage from "./goldExtractionsettlement";
  import BatchAddGoldExtractionPage from "./batchAddGoldExtraction";
  import GoldExtractionBudgetPage from "./goldExtractionBudget";
  import { quickDate } from "../../../utils/getQuickDate";
  import CheckSelectSpecial from "../../../components/checkSpecial"; //
  import CheckSelect from "../../../components/check"; //
  import ColumPage from "../../../components/columnMoreHeader";
  import { PlTable, PlTableColumn } from "pl-table";
  import GoldElemSynchroPage from "./goldElemSynchro";
  import GoldElemQuestionPage from "./goldElemQuestion";
  import GoldRemarkPage from "./goldRemark";
  import GoldExtractionSetPage from "./goldExtractionSet";
  import QuestionDes5Page from "./questionDes5";
  //获取数据
  export default {
    data() {
      return {
        searchTitle:'姓名/事件',
        culumnTitle:'提金明细',
        check1:false,
        check2:false,
        sessionStr:'',
        rowHeight1:27,
        rowHeight2:27,
        rowHeight3:27,
        sessionStr1:'gold-extraction-list1',
        sessionStr2:'gold-extraction-list2',
        sessionStr3:'gold-extraction-list3',
        columnValue: false,
        columnDataByType:goldExtractionParam.goldExtractionColumn,
        columnData: goldExtractionParam.goldExtractionColumn,
        columnData1:goldExtractionParam.goldExtractionBusinessColumn,
        columnData2:goldExtractionParam.goldExtractionRewardColumn,
        columnData3:goldExtractionParam.goldExtractionDetailColumn,
        columnData4:goldExtractionParam.goldExtractionDetailRewardColumn,
        starParams:[], 
        timeParams:[
             {id:'月',name:'月'},
             {id:'年',name:'年'},
        ],
        multipleSelection: [],
        multipleSelection1: [],
        multipleSelection2: [],
        multipleSelection3: [],
        currentTableNum:0,
        thistruededuct:'',
        tableData: [],
        tableData1:[],
        tableData2:[],
        tableData3:[],
        tableData4:[],
        goldExtractionType:3,
        upAndDown:1,
        timeDisabled:false,
        currentNum:0,
        stateParams1:orgnizetionParam.orgnizetionStateTwo,
        stateParams2:orgnizetionParam.orgnizetionStateThree,
        userStateIdParams: [],
        executorList: [],
        userParams: [],
        executorList1: [],
        userParams1: [],
        staffIdParams:[],
        categoryOneParams:[],
        atternLevelParams:[],
        businessType2Ids:'businessType2Ids',
        departId:'departId',
        userId:'userId',
        select1:'select1',
        select2:'select2',
        select3:'select3',
        select4:'select4',
        select5:'select5',
        select6:'select6',
        select7:'select7',
        select8:'select8',
        select9:'select9',
        select10:'select10',
        clickActive:false,
        clickTime:1,
        active1:true,
        active2:true,
        active3:false,
        active4:true,
        active5:true,
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        form: {
          type:"-1",
          timeStart:'',
          timeEnd:'',
          states:'-1',
          word:'',
          model:'2',
        },
        formList:{},
        formList1:{},
         pickerOptions: { //大于当前月分的日期不可选
                disabledDate: (time) => {
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    var currentdate = year.toString()  + month.toString();

                    var timeyear = time.getFullYear();
                    var timemonth = time.getMonth() + 1;
                    if (timemonth >= 1 && timemonth <= 9) {
                        timemonth = "0" + timemonth;
                    }
                    var timedate = timeyear.toString() + timemonth.toString();
                    return currentdate < timedate;
                }
        },
      };
    },
    components: {
      EditorBounsPage,
      BatchAddGoldExtractionPage,
      GoldExtractionBusinessDetailPage,
      NoGoldExtractionBusinessDetailPage,
      TotalNoBudgetGoldExtractionPage,
      GoldExtractionBudgetPage,
      CheckSelectSpecial,
      CheckSelect,
      ColumPage,
      PlTable,
      PlTableColumn,
      GoldElemSynchroPage,
      GoldElemQuestionPage,
      GoldRemarkPage,
      GoldExtractionSetPage,
      QuestionDes5Page
    },
    methods: {
      returnMonth(val){
        if(val){
          return val.substring(5,7)
        }
      },
      returnYear(val){
        if(val){
          return val.substring(0,4)
        }
      },
      headerRowClass({row, column, rowIndex, columnIndex}){
        let className = "";
        
        if (column.property == 'total_num1') {
          className =  ' cell-expend ';
        }
        return className;
        
      },
      specialchangefunc(item){
        console.log('123');
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(item.deduct)) {
          if (item.deduct == undefined||item.deduct == '') {
            item.deduct = '';
            return;
          }
          item.deduct = this.thistruededuct;
        } else {
          this.thistruededuct = item.deduct;
        }
      },
      headerClick(column, event){
        let clickTime = this.clickTime;
        if(column.property == 'check' && clickTime == 1){
          let tableData2 = this.tableData2;
          if(this.clickActive){
            tableData2.forEach(item =>{
              item.checked = 1;
            })
            this.clickActive = false;
          }else{
             tableData2.forEach(item =>{
              item.checked = 0;
            })
            this.clickActive = true;
          }
          
        }
        if(clickTime == 2){
          this.clickTime = 1;
        }else{
           this.clickTime = 2;
        }
      },
      //结算
      budgetGoldExtraction(){
         let ids = [];
         let model = this.form.model;
         if(model == 1){
           let tableData = this.tableData4;
           tableData.forEach(item =>{
             if(item.dataCheck == 1){
               ids.push(item.id);
             }
           })
         }else{
            let tableData = this.tableData3;
            tableData.forEach(item =>{
              if(item.dataCheck == 1){
                ids.push(item.id);
              }
            })
         }
         if(ids.length == 0){
            this.myAlert("请选择结算的提金！",'dangerous-icon');
           return false;
         }
         ids = ids.toString();
         let test = this.$layer.iframe({
            content: {
                content: GoldExtractionBudgetPage, //传递的组件对象
                parent: this,//当前的vue对象
                data:{ids:ids,model:model}//props
            },
            area:['350px','200px'],
            title: "结算",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
            }
        });
          
      },
      totlaPersonDebt(row){
        let _this = this;
        let value = row.total_num;
        let id = row.userId;
        let layerId = _this.$layer.iframe({
          content: {
            content: QuestionDes5Page , //传递的组件对象
            parent: this,//当前的vue对象
            data:{id}//props
          },
          area:['600px','400px'],
          title: "总个人欠款-"+value,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
           
          }
        });
      },
      //取消结算
      cancelBudgetGoldExtraction(){
         let _this = this;
         let ids = [];
         let model = this.form.model;
         if(model == 1){
           let tableData = this.tableData4;
           tableData.forEach(item =>{
             if(item.dataCheck == 1){
               ids.push(item.id);
             }
           })
         }else{
            let tableData = this.tableData3;
            tableData.forEach(item =>{
              if(item.dataCheck == 1){
                ids.push(item.id);
              }
            })
         }
         if(ids.length == 0){
            this.myAlert("请选择结算的提金！",'dangerous-icon');
           return false;
         }
         ids = ids.toString();
         let form = {
              ids:ids,
              model:model,
          }
          goldExtractionBudgetTime(form).then(function(response) {
            _this.$layer.closeAll("loading");
            if (response.status == 500) {
                return false;
            } else if (response.status == 0) {
                let msg = response.msg
                _this.myAlert(msg,'success-icon').then(res => {
                    _this.getGoldExtractionListData3();
                }).catch(err => {
                })
            } else if (response.status == 1){
                let msg = response.msg;
                if(/成功/g.test(msg)){
                  _this.myAlert(response.msg,'dangouser-icon').then(res => {
                      _this.getGoldExtractionListData3();
                  }).catch(err => {
                  })
                }else{
                  _this.myAlert(response.msg,'dangouser-icon');
                }
                
            }
        })
      },
      checkAll1(){
        let check1 = this.check1;
        let tableData3 = this.tableData3;
        if(check1){
          this.$nextTick(function () {
            tableData3.forEach(item=>{
              item.dataCheck = 1;
            })
          })
          
          this.check1 = false;
        }else{
          this.$nextTick(function () {
            tableData3.forEach(item=>{
              item.dataCheck = 0;
            })
          })
          this.check1 = true;
        }
      },
      checkAll2(){
        let check2 = this.check2;
        let tableData4 = this.tableData4;
        if(check2){
         this.$nextTick(function () {
            tableData4.forEach(item=>{
              item.dataCheck = 1;
            })
          })
          this.check2 = false;
        }else{
          this.$nextTick(function () {
            tableData4.forEach(item=>{
              item.dataCheck = 0;
            })
          })
          this.check2 = true;
        }
      },
      saveBusiness(elem,index,type){
          let _this =  this;
          let userId = elem.userId;
          let time = elem.time;
          let tBonus2 = [elem];
          tBonus2 = JSON.stringify(tBonus2);
          let form = null;
          if(type == 1){
            form = {
              userId:userId,
                time:time,
                tBonus1:tBonus2,
            };
          }else{
            form = {
              userId:userId,
                time:time,
                tBonus2:tBonus2,
            };
          }
          
          this.$layer.loading({
          shade: true,//是否显示遮罩
          });
          goldExtractModify(form).then(function(response){
                _this.$layer.closeAll("loading");
              if (response.status == 500) {
                  return false;
              } else if (response.status == 0) {
                  _this.myAlert("数据保存成功",'success-icon').then(res => {
                        _this.getGoldExtractionListData3();
                  }).catch(err => {
                  })
              } else if (response.status == 1) {
                  let message = response.msg;
                  _this.myAlert(message + "！");
              }
          })
      },
      getGoldExtractionParams(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        InsuranceMoneyParams().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let time = quickDate.getTwoDateByDay(5);
            let startTime = time.startTime ;
            let endTime =  time.endTime;
            if(startTime){
              startTime = startTime.substring(0,7);
            }
            if(endTime){
              endTime = endTime.substring(0,7);
            }
            _this.form.timeStart = endTime;
            _this.form.timeEnd = endTime;
            let data = response.data;
             if(data.userStateIdParams){
              let initArr = [{id:"-1",name:"全部",select:true}];
              data.userStateIdParams.forEach(item =>{
                 if(item.name == '常态在职' ||  item.name == '薪假在职' ||  item.name == '停薪在职' ||  item.name == '申离在职' ||  item.name == '正式离职'){
                    let obj ={ 
                      id: item.id,
                      name: item.name,
                      select: item.select
                    };
                    initArr.push(obj);
                 }  
               })
              _this.userStateIdParams = initArr;
             }
             if(_this.stateParams1){
              let initArr = [{id:"-1",name:"全部",select:true}];
              _this.stateParams1 = initArr.concat(_this.stateParams1);
             }
              if(_this.stateParams2){
              let initArr = [{id:"-1",name:"全部",select:true}];
              _this.stateParams2 = initArr.concat(_this.stateParams2);
             }
             if(data.staffIdParams){
               let initArr = [{id:"-1",name:"全部",select:true}];
               let arr1 = [];
               data.staffIdParams.forEach(item =>{
                 arr1.push({
                   id:item.id,
                   name:item.label,
                 })
               })
               
               _this.staffIdParams = initArr.concat(arr1);
             }
             
            if (data.departTree) {
              let arr = [{ id: "-1", name: "全部", select: true }];
              let treeData = data.departTree;
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  select: false,
                  state: treeData[i].state,
                });
              }
              _this.executorList = arr;
              _this.executorList1 = arr;
            }
            _this.userParams = [{id:'-1',name:'全部',select:true}];
            _this.userParams1 = [{id:'-1',name:'全部',select:true}];
            _this.getGoldExtractionListData2();
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
       finUserByDepart(){
        let _this = this;
        let id = _this.getSelectIdByList(_this.executorList);
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
        let id = _this.getSelectIdByList(_this.executorList1);
        if(id){
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              user = [{id:'-1',name:"全部",select:true}].concat(user);
              _this.userParams1 = user;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }else{
          _this.userParams = [{id:'-1',name:"全部",select:true}];
        }
      },
      searchGoldExtractionListData(){
        let type = this.goldExtractionType;
        if(type == 1){
            this.getGoldExtractionListData();
        }else if(type == 2){
            this.getGoldExtractionListData1();
        }else  if(type == 3){
            this.getGoldExtractionListData2();
        }else{
            this.getGoldExtractionListData3();
        }
      },
      changeGoldExtractionType(type){
        debugger;
        if(type == 1){
          if(this.active1){
            this.reloadListByStorage();
            this.getGoldExtractionListData();
            this.active1 = false;
          }
          this.currentTableNum = this.tableData.length;
          this.currentNum = 0;
          this.searchTitle = '姓名/事件';
          this.columnDataByType = this.columnData;
        }else if(type == 2){
          if(this.active2){
            this.reloadListByStorage();
            this.getGoldExtractionListData1();
            this.active2 = false;
          }
          this.currentTableNum = this.tableData1.length;
          this.currentNum = 0;
         
          this.searchTitle = '姓名/事件';
          this.columnDataByType = this.columnData1;
        }else  if(type == 3){
          if(this.active3){
            this.reloadListByStorage();
            this.getGoldExtractionListData2();
            this.active3 = false;
          }
          this.currentTableNum = this.tableData2.length;
          this.currentNum = 0;
         
          this.searchTitle = '姓名/事件';
          this.columnDataByType = this.columnData2;
        }else if(type == 4){
          if(this.active4){
            this.getGoldExtractionListData3();
            this.active4 = false;
          }
          let model = this.form.model;
          if(model == 2){
            this.currentTableNum = this.tableData3.length;
            this.searchTitle = '分成人/事件';
          }else{
            this.currentTableNum = this.tableData4.length;
            this.searchTitle = '被奖人/星级';
          }
          this.currentNum = 0;
          
        }
      },
      changModel(){
        let model = this.form.model;
        if(model == 1){
           if(this.active5){
            this.getGoldExtractionListData3();
            this.active5 = false;
          }
          this.currentTableNum = this.tableData4.length;
          this.searchTitle = '被奖人/星级';
        }else{
          this.currentTableNum = this.tableData3.length;
          this.searchTitle = '分成人/事件';
        }
        this.currentNum = 0;
      },
      showNewGoldExtraction(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: BatchAddGoldExtractionPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "批量新增提金人月",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      showDeletedGoldExtraction(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if (select) {
          _this
            .myConfirm(
              "警告：人月提金删除后不能还原",
              "dangerous-icon",
              "确认",
              "取消",
              "确定要永久删除选定的人月提金吗？",
              "my-message"
            )
            .then(res => {
              _this.deletedDataGoldExtraction();
            })
            .catch(err => {});
        } else {
          this.myAlert("请勾选要删除的人月提金!", "dangerous-icon");
        }
        //
      },
      
      deletedDataGoldExtraction() {
        let _this = this;
        let id = this.multipleSelection.toString();
        let select = {
          id,
          deleted: 1
        };
        deletedBatchBouns(select).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this
              .myAlert("删除成功!", "success-icon")
              .then(res => {
                 let id = _this.multipleSelection;
                  let temp = _this.tableData.concat();
                  for(let i = 0 , len = id.length; i < len ; i++ ){
                    temp = _this.deletArrByValue(temp,id[i]);
                  }
                  _this.tableData = temp;
                  _this.currentTableNum = _this.tableData.length;
                  _this.currentNum = 0;
              })
              .catch(err => {});
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      showBusiness(index,row){
        let _this = this;
        let title = row.user + "   " + row.time + '   结算详情';
        let test = _this.$layer.iframe({
          content: {
            content: goldExtractionsettlementPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{rowData:row}//props
          },
          area:['720px','540px'],
          title: title,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
          }
        });
      },
      noBusiness(row,type){
        let _this = this;
        let title = row.time + "  " +row.user + '   经纪业务（月）未结月提成备注';
        
        let test = _this.$layer.iframe({
          content: {
            content: NoGoldExtractionBusinessDetailPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{row:row,type:type}//props
          },
         area:['500px','350px'],
          title: title,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
          }
        });
      },
      totlaNoBudgetBusiness(row,type){
        let _this = this;
        let title = '';
        if(type =='年'){
          title = row.time + "  " +row.user + '    总提成未结（年）详情   ' + row.type1_y_num3;
        }else{
          title = row.time + "  " +row.user + '    总提成未结（月）详情   ' + row.type1_m_num3;
        }
        
        
        let test = _this.$layer.iframe({
          content: {
            content: TotalNoBudgetGoldExtractionPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{row:row,type:type}//props
          },
         area:['600px','400px'],
          title: title,
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
          }
        });
      },
      goldExtractSet(userTimeId){
          
          let test = this.$layer.iframe({
              content: {
                  content:GoldExtractionSetPage, //传递的组件对象
                  parent: this,//当前的vue对象
                  data:{userTimeId:userTimeId}//props
              },
              area:['600px','450px'],
              title: "评价提金查看",
              shadeClose: false,
              shade: true,//是否显示遮罩
              zIndex:19891110,
              cancel:()=>{//关闭事件
              }
          });
      },
      
      rowClass(){

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
      tableRowClassName1({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      getRowDataByClick1 (row, column, event) {
        let _this = this
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
      },
      handleSelectionChange1(elemCheckbox){
         let _this = this;
        //获取用户的选中
        _this.multipleSelection1 = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection1.push(item.id);
        });
        _this.multipleSelection1 = Array.from(new Set(_this.multipleSelection1));
      },
      rowClass1(){

      },
      tableRowClassName2({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      getRowDataByClick2 (row, column, event) {
        let _this = this
        _this.currentNum =  row.index + 1;
        _this.currentPage = row;
      },
      handleSelectionChange2(elemCheckbox){
         let _this = this;
        //获取用户的选中
        _this.multipleSelection2 = []
        elemCheckbox.forEach(item => {
          _this.multipleSelection2.push(item.id);
        });
        _this.multipleSelection2 = Array.from(new Set(_this.multipleSelection2));
      },
      rowClass2(){

      },
      filterData(){
        let goldExtractionType = this.goldExtractionType;
        
        if(goldExtractionType == 1){
          let select = this.multipleSelection.toString();
          if(select){
            let arr = [];
            this.tableData.forEach(function(item){
              if(select.indexOf(item.id) != -1){
                arr.push(item);
              }
            })
            this.currentNum = 0;
            this.tableData = arr;
          }else{
            this.myAlert('请选择需要过滤的数据!','dangerous-icon');
          }
          this.currentTableNum = this.tableData.length;
        }else if(goldExtractionType == 2){
          
          let select1 = this.multipleSelection1.toString();
          if(select1){
            let arr = [];
            this.tableData1.forEach(function(item){
              if(select1.indexOf(item.id) != -1){
                arr.push(item);
              }
            })
            this.currentNum = 0;
            this.tableData1 = arr;
          }else{
            this.myAlert('请选择需要过滤的数据!','dangerous-icon');
          }
          this.currentTableNum = this.tableData1.length;
        }else if(goldExtractionType == 3){
          let select2 = this.multipleSelection2.toString();
          if(select2){
            let arr = [];
            this.tableData2.forEach(function(item){
              if(item.checked == 1){
                arr.push(item);
              }
            })
            this.currentNum = 0;
            this.tableData2 = arr;
          }else{
            this.myAlert('请选择需要过滤的数据!','dangerous-icon');
          }
          this.currentTableNum = this.tableData2.length;
        }else if(goldExtractionType == 4){
            let model = this.form.model;
            if(model == 2){
              let arr = [];
              this.tableData3.forEach(function(item){
                if(item.dataCheck == 1){
                  arr.push(item);
                }
              })
              this.tableData3 = arr;
              this.currentNum = 0;
              this.currentTableNum = this.tableData3.length;
            }else{
              let arr = [];
              this.tableData4.forEach(function(item){
                if(item.dataCheck == 1){
                  arr.push(item);
                }
              })
              this.tableData4 = arr;
              this.currentNum = 0;
              this.currentTableNum = this.tableData4.length;
            }
        }
        
      },

      exportToExcel(){
        // excel数据导出
        require.ensure([], () => {
          const {
            // eslint-disable-next-line camelcase
            export_json_to_excel
          } = require('../../../assets/js/Export2Excel.js')
          const tHeader = ['编号', '区县', '街镇', '地址', '房型', '朝向', '自定号', '面积', '来源',
            '交易','状态','盘制','分类','委托方式','委托日期','售价','租价',
            '税费','尾款','动机','证件','现状','装修','看房',
            '产权','付款','付佣','员工1','员工2','员工3','最后跟进日'
          ];
          const filterVal = ['roomCode','district',
            'street','adress','roomShape','roomDirection','roomType',
            'roomTotalArea','source','num','roomSaleState',
            'roomProperty1','roomProperty2','roomProperty3','roomDelegateDate','salePrice',
            'rentPrice','roomTax','restPrice','motive',
            'certificateType','roomState','decorate','keysName','houseProperty',
            'payment','commission','emp1','emp2','emp3',
            'processingTime'
          ];
          const list = this.currentData;
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '提金明细')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      clickColumn(){
        let goldExtractionType = this.goldExtractionType;
        let sessionStr = '';
        let columnData = '';
        if(goldExtractionType == 4){
          return false;
        }else if(goldExtractionType == 1){
          sessionStr = this.sessionStr1;
          columnData = this.columnData;
        }else if(goldExtractionType == 2){
          sessionStr = this.sessionStr2;
          columnData = this.columnData1;
        }else if(goldExtractionType == 3){
          sessionStr = this.sessionStr3;
          columnData = this.columnData2;
        }
        
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: ColumPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              columnData:columnData,
              sessionStr:sessionStr,
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
     
      clearForm(){
        let _this = this;
        
        let time = quickDate.getTwoDateByDay(5);
        let startTime = time.startTime ;
        let endTime =  time.endTime;
        if(startTime){
          startTime = startTime.substring(0,7);
        }
        if(endTime){
          endTime = endTime.substring(0,7);
        }
        _this.form.timeStart = endTime;
        _this.form.timeEnd = endTime;
        _this.form.type = "-1";
        _this.form.word = '';
        _this.stateParams1 = _this.backSlect(_this.stateParams1);
        _this.stateParams2 = _this.backSlect(_this.stateParams2);
        _this.userStateIdParams = _this.backSlect(_this.userStateIdParams);
        _this.executorList = _this.backSlect(_this.executorList);
        _this.userParams = _this.backSlect(_this.userParams);
        _this.staffIdParams = _this.backSlect(_this.staffIdParams);
      },
      editorBouns(index ,row){
        let _this = this;
        let thisifranmeisopen = false;
        let thisifranmeopennum = 0;
        _this.$store.state.layerifranme.forEach(item=>{
          if(item.thisrowid == row.id){
            document.getElementById(item.childlayerid).focus();
            thisifranmeisopen = true;
          };
          if(item.thisactiveIndex == _this.activeIndex.split('/')[2]){
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
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorBounsPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{rowData:row,mythisindex:index}//props
          },
          area:['1160px','670px'],
          title: '提金修改 【'+row.user + "&nbsp;&nbsp;&nbsp;&nbsp;" + row.time+'】',
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:19891110,
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
        let layerifranmedata = {thisactiveIndex: _this.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:row.id,oneORmore:2};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
        _this.$refs.singleTable.setCurrentRow(row);
      },
      getGoldExtractionListData(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let timeStart = form.timeStart;
        let timeEnd = form.timeEnd;
        let userStateIdParams = this.userStateIdParams;
        let stateParams1 = this.stateParams1;
        let stateParams2 = this.stateParams2;
        let executorList = this.executorList;
        let userParams = this.userParams;
        let staffIdParams = this.staffIdParams;
        if(!timeStart){
          timeStart = '';
        }
        if(!timeEnd){
          timeEnd = '';
        }
        form.timeStart = timeStart;
        form.timeEnd = timeEnd;
        form.departIds = this.getSelectIdByList(this.executorList);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.staffId = this.getSelectIdByList(this.staffIdParams);

        form.stateIds = this.getSelectIdByList(this.userStateIdParams);
        form.stateIds2 = this.getSelectIdByList(this.stateParams1);
        form.stateIds3 = this.getSelectIdByList(this.stateParams1);
        goldExtractType1(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data  = response.data.list;
            let total = response.data.total;
            let columnData = JSON.parse(JSON.stringify(_this.columnData));
            
            if(!total){
              total = {type1_m_num1:11}; 
            }
            let setTitle = _this.setTitle(total,columnData);
            _this.columnData = setTitle;
            _this.tableData = data;
            _this.currentTableNum = _this.tableData.length;
            _this.currentNum = 0;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      getGoldExtractionListData1(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let userStateIdParams = this.userStateIdParams;
        let stateParams1 = this.stateParams1;
        let stateParams2 = this.stateParams2;
        let executorList = this.executorList;
        let userParams = this.userParams;
        let staffIdParams = this.staffIdParams;
        let timeStart = form.timeStart;
        let timeEnd = form.timeEnd;
        if(!timeStart){
          timeStart = '';
        }
        if(!timeEnd){
          timeEnd = '';
        }
        form.timeStart = timeStart;
        form.timeEnd = timeEnd;
        form.departIds = this.getSelectIdByList(this.executorList);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.staffId = this.getSelectIdByList(this.staffIdParams);

        form.stateIds = this.getSelectIdByList(this.userStateIdParams);
        form.stateIds2 = this.getSelectIdByList(this.stateParams1);
        form.stateIds3 = this.getSelectIdByList(this.stateParams2);
        goldExtractType2(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data  = response.data.list;
            let total = response.data.total;
            let columnData1 = JSON.parse(JSON.stringify(_this.columnData1));
            let setTitle = _this.setTitle(total,columnData1);
            _this.columnData1 = setTitle;
            _this.tableData1 = data;
             _this.currentTableNum = _this.tableData1.length;
            _this.currentNum = 0;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      getGoldExtractionListData2(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let timeStart = form.timeStart;
        let timeEnd = form.timeEnd;
        let userStateIdParams = this.userStateIdParams;
        let stateParams1 = this.stateParams1;
        let stateParams2 = this.stateParams2;
        let executorList = this.executorList;
        let userParams = this.userParams;
        let staffIdParams = this.staffIdParams;
        if(!timeStart){
          timeStart = '';
        }
        if(!timeEnd){
          timeEnd = '';
        }
       
        form.timeStart = "";
        form.timeEnd = ""; 
        form.departIds = this.getSelectIdByList(this.executorList);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.staffId = this.getSelectIdByList(this.staffIdParams);

        form.stateIds = this.getSelectIdByList(this.userStateIdParams);
        form.stateIds2 = this.getSelectIdByList(this.stateParams1);
        form.stateIds3 = this.getSelectIdByList(this.stateParams2);
        goldExtractType3(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data  = response.data.list;
            let total = response.data.total;
            let columnData2 = JSON.parse(JSON.stringify(_this.columnData2));
            let setTitle = _this.setTitle(total,columnData2);
            _this.columnData2 = setTitle;
            data.forEach(item =>{
              item.checked = 0;
            })
            _this.tableData2 = data;

             _this.currentTableNum = _this.tableData2.length;
            _this.currentNum = 0;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      setTitle(total,columnData2){
        if(!total){
          total = {};
        }
        
        columnData2.forEach((item,index) => {
            if(item.child){
              let child = item.child;
              if(child && child.length != 0){
                
                child.forEach(item1 => {
                  item1.child = [{
                    id:2020070800003,
                    pre:2019070804,
                    type:'',
                    width:'100',
                    ref:'',
                    prop:'test'+index,
                    titleLabel:total[item1.prop] ? total[item1.prop] : '',
                    label:total[item1.prop] ? total[item1.prop] : '',
                    align:'center',
                    sortable:false,
                    show:true,
                    fixed:false
                  }]
                })
                
              }
            }
        })
        return  columnData2;
      },
      getGoldExtractionListData3(){
        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let userStateIdParams = this.userStateIdParams;
        let stateParams1 = this.stateParams1;
        let stateParams2 = this.stateParams2;
        let executorList = this.executorList;
        let userParams = this.userParams;
        let staffIdParams = this.staffIdParams;
        let timeStart = form.timeStart;
        let timeEnd = form.timeEnd;
        if(!timeStart){
          timeStart = '';
        }
        if(!timeEnd){
          timeEnd = '';
        }
        form.timeStart = timeStart;
        form.timeEnd = timeEnd;
        form.departIds = this.getSelectIdByList(this.executorList);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.staffId = this.getSelectIdByList(this.staffIdParams);

        form.stateIds = this.getSelectIdByList(this.userStateIdParams);
        form.stateIds2 = this.getSelectIdByList(this.stateParams1);
        form.stateIds3 = this.getSelectIdByList(this.stateParams2);

        goldExtractType4(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data  = response.data;
            let params = response.data.params;
            let categoryOneParams = params.categoryOneParams;
            _this.categoryOneParams = categoryOneParams; 
            if(_this.form.model == 2){
              let arr = [];
              let list = data.list;
              let models = data.models;
              
              if(list && list.length != 0){
                 list.forEach(item =>{
                   if(item.isCalculateSalary == '1'){
                        item.isCalculateSalary = 1;
                    }else{
                        item.isCalculateSalary = 0;
                    }
                    if(item.balanceTime){
                        item.check = 1;
                    }else{
                        item.check = 0;
                    }
                    item.dataCheck = 0;
                   item.patternLevelParams = models[item.userId+"_"+item.time];
                   arr.push(item);
                 })
              }
              _this.tableData3 = arr;
              _this.currentTableNum = _this.tableData3.length;
              _this.currentNum = 0;
            }else{
               let arr = [];
              let list = data.list;
              let stars = data.stars;
              
              if(list && list.length != 0){
                 list.forEach(item =>{
                  if(item.isCalculateSalary == '1'){
                      item.isCalculateSalary = 1;
                  }else{
                      item.isCalculateSalary = 0;
                  }
                  if(item.balanceTime){
                      item.check = 1;
                  }else{
                      item.check = 0;
                  }
                  item.dataCheck = 0;
                   item.starParams = stars[item.userId+"_"+item.time];
                   arr.push(item);
                 })
              }
              
              _this.tableData4 = arr;
              _this.currentTableNum = _this.tableData4.length;
              _this.currentNum = 0;
            }
            

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      goldElemSynchro(elem,index){
            let userId = elem.userId;
            let chiefIds = elem.chiefIds;
            let chiefNames = elem.chiefNames;
            let chiefDepartIds = elem.chiefDepartIds;
            if(!chiefDepartIds){
                chiefDepartIds = '';
            }
            let test = this.$layer.iframe({
                content: {
                    content: GoldElemSynchroPage, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{userId:userId,chiefIds:chiefIds,chiefNames:chiefNames,chiefDepartIds:chiefDepartIds,index:index}//props
                },
                area:['750px','450px'],
                title: "同步",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        setElemSynchro(getChiefIds,getChiefNames,getChiefDepartIds,index){
            let tableData3 = this.tableData3;
            tableData3.forEach((item,index1)=> {
               if(index == index1){
                   item.chiefIds = getChiefIds;
                   item.chiefNames = getChiefNames;
                   item.chiefDepartIds = getChiefDepartIds;
               }
            })
        },
        goleElemQuestion(id,balanceOldBonus,userName){
            if(!balanceOldBonus){
                balanceOldBonus = "";
            }
            let test = this.$layer.iframe({
                content: {
                    content: GoldElemQuestionPage, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{id:id}//props
                },
                area:['500px','350px'],
                title: userName +"   " +balanceOldBonus,
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        goldElemRemark(remark,index){
            if(!remark){
                remark = "";
            }
            let test = this.$layer.iframe({
                content: {
                    content: GoldRemarkPage, //传递的组件对象
                    parent: this,//当前的vue对象
                    data:{remark:remark,index:index}//props
                },
                area:['350px','200px'],
                title: "提成备注",
                shadeClose: false,
                shade: true,//是否显示遮罩
                zIndex:19891110,
                cancel:()=>{//关闭事件
                }
            });
        },
        setElemRemark(remark,index){
            if(remark){
                let tableData3 = this.tableData3;
                tableData3.forEach((item,index1) =>{
                    if(index == index1){
                        item.explainRemark = remark;
                    }
                })
            }else{
                let tableData3 = this.tableData3;
                tableData3.forEach((item,index1) =>{
                    if(index == index1){
                        item.explainRemark = "";
                    }
                })
            }
        },
      
       //删除数组中指定元素
      deletArrByValue(arr,id){
        return arr.filter(function(item){return item.id != id })
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
      reloadListByStorage(){
        
        let goldExtractionType = this.goldExtractionType;
        let currentColumnData = '';
        let sessionStr = '';
        if(goldExtractionType == 1){
          sessionStr = this.sessionStr1;
          currentColumnData = this.columnData;
        }else if(goldExtractionType == 2){
          sessionStr = this.sessionStr2;
          currentColumnData = this.columnData1;
        }else if(goldExtractionType == 3){
          sessionStr = this.sessionStr3;
          currentColumnData = this.columnData2;
        }
        let storage=window.localStorage;
        let titleData = storage.getItem(sessionStr);
        let storageColumn = JSON.parse(titleData);
        let columnData = JSON.parse(JSON.stringify(currentColumnData));
        let column = null;
        let storageMap = {};
        
        if(storageColumn){
          let getColumn = storageColumn.column;
          getColumn.forEach(item => {
            storageMap[item.id] = item;
          })
          columnData.forEach(item => {
            let child = item.child;
            if(child){
              let flag = false;
              child.forEach(item1 => {
               
                item1.show = storageMap[item1.id].show;
                item1.width = storageMap[item1.id].width;
                item1.fixed = storageMap[item1.id].fixed;
                 if(item1.show){
                  flag = true;
                }
              })
              
              if(flag){
                item.show = true;
              }else{
                item.show = false;
              }
            }else{
              item.show = storageMap[item.id].show;
              item.fixed = storageMap[item.id].fixed;
              item.width = storageMap[item.id].width;
            }
          })
          column = columnData;
         
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
        if(goldExtractionType == 1){
          this.columnData = column;
          if(storageColumn){
             this.rowHeight1 = storageColumn.height;
          }
        }else if(goldExtractionType == 2){
          this.columnData1 = column;
          if(storageColumn){
             this.rowHeight2 = storageColumn.height;
          }
        }else if(goldExtractionType == 3){
          this.columnData2 = column;
          if(storageColumn){
             this.rowHeight3 = storageColumn.height;
          }
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
      },
      changeTitle(count,needlayerid,upordown){
        let _this = this;
        let mycountnum = 0;
        let currentId =  _this.tableData[count].id;
        let tableData = this.tableData;
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
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML = '提金修改 【'+_this.tableData[mycountnum].user + "&nbsp;&nbsp;&nbsp;&nbsp;" + _this.tableData[mycountnum].time+'】';
        _this.$refs.singleTable.setCurrentRow(_this.tableData[mycountnum]);

        let  callbackdata = {
          row: _this.tableData[mycountnum],
          thisindex:mycountnum,
        };
        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.tableData[mycountnum].id
          }
        })
        return callbackdata;
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
    mounted() {
       this.reloadListByStorage();
       this.shadenum();
       this.getGoldExtractionParams(); 
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
  /deep/ .content{
    .list-content{
      .el-table{
        .el-table__body-wrapper{
          height:calc(100% - 77px) !important;
        }
      }
    }
  } 
  .rent-container {
    font-size: 12px;
    height: 100%;
    
    .padding-l-15 {
      padding-left: 15px;
    }
    .padding-l-10 {
      padding-left: 10px;
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
    .leading-out-icon {
      background: url(../../../images/icon.png) -126px -118px;
      width: 20px;
      height: 20px;
      display: block;
    }
    .budget-icon{
      background:url(../../../images/icon2.png) -186px -94px;
      width:20px;
      height:20px;
      display:block;
    }
    .no-budget-icon{
      background:url(../../../images/icon2.png) -219px -94px;
      width:20px;
      height:20px;
      display:block;
    }
    .print-out-icon {
      background: url(../../../images/system/daochu.png) -15px -15px;
      width: 20px;
      height: 20px;
      display: block;
    }
    .title-des{
      line-height: 27px;
      height: 27px;
      display: inline-block;
      border-width:2px 2px 0px 0;
      border-style: solid;
      width:100%;
      border-image: url("../../../images/system/border.png")  2 repeat ;
    }
    .print-out-icon:hover,
    .leading-out-icon:hover {
      border: 1px solid #828382;
    }
    .back-icon {
      background: url(../../../images/system/tuichu.png) -15px -15px;
      width: 20px;
      height: 20px;
      display: inline-block;
    }
    .des-word {
      line-height: 30px;
      height: 30px;
      display: inline-block;
    }
    .has-value-color{
      color:#7394B6;
    }
    .weight-font{
      font-weight:700;
    }

    .look-btn{
    display:inline-block;
    padding:3px 6px;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  .elem-border{
    padding:10px 5px;
    margin-bottom:10px;  
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
     background:#F2F2F2;
  }
  .required-word::after{
      content:'*';
      color:#F72F2E;
  }
  .des-word{
      display: inline-block;
      line-height:27px;
      height:27px;
  }
  .type-des-word{
    display: inline-block;
    color:#AC3C3B;
    font-weight:700;
  }
  .padding-left-1{
      padding-left:1px;
  }
  .padding-left-5{
      padding-left:5px;
  }
  .padding-left-10{
      padding-left:10px;
  }
  .padding-left-20{
      padding-left:20px;
  }
  .save-btn{
    display: inline-block;
     padding:0px 5px;  
    border-width: 2px;
    border-style: solid;
    height:25px;
    line-height:23px;
    cursor:pointer;
    background:#EBEBEB;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  .question-gold-icon{
    display: inline-block;
    height:15px;
    width:15px;
    background: url("../../../images/icon2.png") -368px -61px;
  }
  .check-gold-icon{
    display: inline-block;
    height:18px;
    width:18px;
    background: url("../../../images/icon2.png") -256px -61px;
  }
  .synchron-gold-icon{
    display: inline-block;
    height:20px;
    width:20px;
    background: url("../../../images/icon2.png") -291px -59px;
  }
  .synchron-disabled-gold-icon{
    display: inline-block;
    height:20px;
    width:20px;
    background: url("../../../images/icon2.png") -331px -60px;
  }
  .angle-disabled-gold-icon{
    display: inline-block;
    height:18px;
    width:18px;
    background: url("../../../images/icon2.png") -392px -57px;
  }
  
}
    .right-content-specail{
  		background:url(../../../images/right-icon.png) no-repeat;
  		position: absolute;
  		width:27px;
  		height:25px;
  		right:-5px;
  		top:0px;
  	}
   .left-content{
  		background:url(../../../images/left-icon.png) no-repeat;
  		position: absolute;
  		width:27px;
  		height:25px;
  		left:-5px;
  		top:0px;
  	}
  	.left-r-div{
	  transform: rotate(308deg);
    display: inline-block;
    left: -10px;
    top: 4px;
    position: absolute;
    	
  	}
  	.right-r-div{
	   
	  transform: rotate(311deg);
    display: inline-block;
    left:  -3px;
    top: 8px;
    position: absolute;
    	
  	}
  	.left-l-div{
	   
	  transform: rotate(-51deg);
    display: inline-block;
    left: -12px;
    top: 3px;
    position: absolute;
  	}
  	.right-l-div{
	   
	  transform: rotate(-55deg);
    display: inline-block;
    left: -18px;
    top: -3px;
    position: absolute;
    width: 48px;
    display: inline-block;
    	
  	}
  	.word-span-1{
  	    font-weight: 700;
  		 width: 48px;
	    display:inline-block;
	    color: #227643;
	    transform: scale(0.4);
	    -webkit-transform: scale(0.4);
	    height: 20px;
	    font-size: 20px;
  	}
  	.word-span{
  	    font-weight: 700;
  		 width: 48px;
	    display:inline-block;
	    color: #227643;
	    transform: scale(0.5);
	    -webkit-transform: scale(0.5);
	    height: 20px;
	    font-size: 20px;
  	}
  	.word-r-span-1{
  	    font-weight: 700;
  		 width: 48px;
	    display:inline-block;
	    color: #C66C6D;
	    transform: scale(0.4);
	    -webkit-transform: scale(0.4);
	    height: 20px;
	    font-size: 20px;
  	}
  	.word-r-span{
  	    font-weight: 700;
  		width: 48px;
	    color: #C66C6D;
	    transform: scale(0.5);
	    -webkit-transform: scale(0.5);
	    height: 20px;
	    font-size: 20px;
  	}
  	.right-l-div-w {
	    transform: rotate(-45deg);
	    display: inline-block;
	    left: -18px;
	    top: -4px;
	    position: absolute;
	    width: 48px;
	    display: inline-block;
    }
    .right-r-div-w{
    	transform: rotate(307deg);
	    display: inline-block;
	    left: -4px;
	    top: 9px;
	    position: absolute;
    }
    .reward-icon{
      display: inline-block;
      height:18px;
      width:18px;
      background: url("../../../images/icon2.png")  -162px -140px;
    }
    .manage-icon{
      display: inline-block;
      height:18px;
      width:18px;
      background: url("../../../images/icon2.png") -95px -141px;
    }
    .business-icon{
      display: inline-block;
      height:18px;
      width:18px;
      background: url("../../../images/icon2.png") -128px -141px;
    }
 
</style>
<style lang="scss" >
  .is-greent{
    input{
      color:#009933 !important;
      font-weight:700;
      text-align:right;
    }
    
  }
  .is-blue{
    input{
      color:#336699 !important;
      font-weight:700;
      text-align:center;
    }
  }
  .is-yellow{
    input{
      color:#E18668 !important;
      font-weight:500;
      text-align:right;
    }
  }
  .is-black{
    input{
      color:#666666 !important;
      font-weight:700;
      text-align:center;
    }
  }
  .table-special .el-table .cell{
    padding:0 5px 0 0px !important;
  }
</style>
