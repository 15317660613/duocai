<template>
  <div class="rent-container mycontailerclass1" id="rent-container">
    <div class="top-container border-black" style="position: relative;">
      <div id="thimyshade" style="position: absolute;width: calc(100% - 20px);height: 100%;opacity: 0.4;background: #ccc;z-index: 450;margin-left: 10px;display: none;"></div>
      <div class="search-container mycontailerclass2 height-32" >
        <div class="clear" >
          <!--
          <div class="left padding-l-15"  >
            <el-radio  v-model="rendOrCustomer" :label="1">&nbsp;</el-radio>
          </div>
          <div class="left" >
            租售列表
          </div>
          <div class="left padding-l-10" >
            <el-radio @change="changeToCustomer" v-model="rendOrCustomer" :label="2">&nbsp;</el-radio>
          </div>
          <div class="left" >
            房对列表
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          -->
          <div class="left padding-l-10" >
            <el-dropdown  placement="bottom">
              <div class="border-icon clear" > 
                <span class="el-dropdown-link " >
                  新增<i class="el-icon-arrow-down p-l-5"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  <el-dropdown-item @click.native="newRent" icon="el-icon-plus">新增房源</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-close" @click.native="deletedRent" >删除房源</el-dropdown-item>
                </el-dropdown-menu>
              </div>  
            </el-dropdown>
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10" >
            <el-dropdown trigger="click" placement="bottom">
              <div class="border-icon clear" > 
                <span class="el-dropdown-link">
                  全部<i class="el-icon-arrow-down p-l-5"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  <el-dropdown-item @click.native="findRent(1,1)" >今日新增</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(1,2)" >最近三天</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(1,3)" >最近七天</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(1,4)" >最近半月</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(1,5)" >最近一月</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(1,6)" >最近三月</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(1,7)" >最近半年</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(1,8)" >全部显示</el-dropdown-item>
                </el-dropdown-menu>
              </div>  
            </el-dropdown>
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10" >
            <el-dropdown trigger="click" placement="bottom">
              <div class="border-icon clear" > 
                <span class="el-dropdown-link">
                  出售<i class="el-icon-arrow-down p-l-5"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  <el-dropdown-item @click.native="findRent(2,1)" >今日售房</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(2,2)" >最近三天</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(2,3)" >最近七天</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(2,4)" >最近半月</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(2,5)" >最近一月</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(2,6)" >最近三月</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(2,7)" >最近半年</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(2,8)" >全部显示</el-dropdown-item>

                </el-dropdown-menu>
              </div>  
            </el-dropdown>
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10" >
            <el-dropdown trigger="click" placement="bottom">
              <div class="border-icon clear" > 
                <span class="el-dropdown-link">
                  出租<i class="el-icon-arrow-down p-l-5"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  <el-dropdown-item @click.native="findRent(3,1)" >今日租房</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(3,2)" >最近三天</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(3,3)" >最近七天</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(3,4)" >最近半月</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(3,5)" >最近一月</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(3,6)" >最近三月</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(3,7)" >最近半年</el-dropdown-item>
                  <el-dropdown-item @click.native="findRent(3,8)" >全部显示</el-dropdown-item>

                </el-dropdown-menu>
              </div>  
            </el-dropdown>
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10" >
            <div class="border-icon clear" > 
              <div class="left" >
                <i class="well-icon" ></i>
              </div>
              <div class="left" >
                <el-dropdown trigger="click" placement="bottom-end">
                <span @click="findRentByWell()" class="el-dropdown-link">
                  优质房<i class="el-icon-arrow-down p-l-5"></i>
                </span>
                  <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  
                    <el-dropdown-item @click.native="findRentByWell(item.id)" v-for="item in roomProperty2Params"  >{{item.name}}</el-dropdown-item>
                    <el-dropdown-item @click.native="findRentByWell(1)"   >特盘房</el-dropdown-item>
                    <el-dropdown-item @click.native="findRentByWell(2)"   >封盘房</el-dropdown-item>
                    <el-dropdown-item @click.native="findRentByWell(3)"   >图照房</el-dropdown-item>
                    <el-dropdown-item @click.native="findRentByWell(4)"   >视频房</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10" >
            <div class="border-icon clear" > 
              <div class="left" >
                <i class="light-icon" ></i>
              </div>
              <div class="left" >
                <el-dropdown trigger="click" placement="bottom-end">
                <span class="el-dropdown-link">
                  注<i class="el-icon-arrow-down p-l-5"></i>
                </span>
                  <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                    <el-dropdown-item @click.native="findRentByComm(item.id)" v-for="item in commTypesParams"  >{{item.name}}</el-dropdown-item>

                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-10" >
            <div class="border-icon clear" > 
            <div class="left" >
              <i class="house-icon" ></i>
            </div>
            <div class="left" >
              <el-dropdown trigger="click" placement="bottom">
               
                <span class="el-dropdown-link">
                  房型<i class="el-icon-arrow-down p-l-5"></i>
                </span>
               
                <el-dropdown-menu slot="dropdown" style="margin-left:30px;" >
                  <el-dropdown-item @click.native="findRentByShape(item.id)" v-for="item in roomShapeParams"  >{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
             </div>
          </div>
          <div class="left padding-l-5"   >
            <i class="cut-icon"  ></i>
          </div>
          <div class="left padding-l-10" style="margin-top: 2px;">
            <div class="border-icon" >
              <i class="one-four-icon" title="选定房改自定号" @click="modifyNumClick"></i>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <div class="border-icon" >
              <i class="use-icon " title="选定房配客" @click="houseMatchCustomer" ></i>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <div class="border-icon" >
              <i class="change-icon " title="选定房转归属人" @click="modifyChangePeopleClick" ></i>
            </div>
          </div>
          <div class="left padding-l-10"  >
            <div class="border-icon" >
              <i class="user-house-icon " title="同一业主房源" @click="getSameHouse" ></i>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <div class="border-icon" >
              <i class="change-type-icon " title="私盘转公盘" @click="privateChangePublic" ></i>
            </div>
          </div>
          <div class="left padding-l-10" style="margin-top: 2px;">
            <div class="border-icon clear" > 
              <i class="one-Thirteen-icon" title="过滤选中"  @click="filterData" ></i>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <div class="border-icon" >
              <i class="leading-out-icon " title="自选列" @click="rentColumn"  ></i>
            </div>
          </div>
          <div class="left padding-l-10"  @click="exportToExcel"  >
            <div class="border-icon" >
              <i class="print-out-icon " title="导出"  ></i>
            </div>
          </div>
          <div class="item left clear p-l-10" style="margin-top: 2px;">
            <div class="border-icon clear" > 
              <i class="one-twelve-icon left" @click="tabRemove('/home/rent')"></i>
            </div>  
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left p-l-10" >
            <div class="record-num" >
              <span class="search-word" ><</span>
              <span class="search-word" >{{currentNum}}</span>
              <span class="search-word" >/</span>
              <span class="search-word" >{{currentData.length}}</span>
              <span class="search-word" >></span>
            </div>
          </div>
        </div>
      </div>
      <div class="search-container " style="max-height:84px;overflow:hidden;" >
        <el-form ref="formsData"  :model="form" >
          <div class="clear " >
            <div class="left padding-l-15" >
              <span class="des-word" >日期</span>
            </div>
            <div class="left " >
              <el-form-item label="" prop="timeMode" label-width="0">
                <el-select v-model="form.timeMode"    style="width:80px;"   >

                  <el-option  label="委托日期" value="1" ></el-option>
                  <el-option  label="最后跟进日" value="2" ></el-option>
                  <el-option  label="首次录入日" value="3" ></el-option>
                  <el-option  label="建房年代" value="4" ></el-option>
                  <el-option  label="钥匙日期" value="5" ></el-option>
                  <el-option  label="全部" value="-1" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeStart" label-width="0">
                <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd" v-model="form.timeStart" style="width: 100px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2" >
              <el-form-item prop="timeEnd" label-width="0">
                <el-date-picker size="mini" type="date"   value-format="yyyy-MM-dd" v-model="form.timeEnd" style="width: 100px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left padding-l-15" >
              <span class="des-word" >房型</span>
            </div>
            <div class="left " >
              <el-form-item prop="roomShape" label-width="0">
                 <CheckSelect :selectId="houseShapeTypeSelect" :listData="houseShapeType1" style="width:55px;" ></CheckSelect>
              </el-form-item>
            </div>
            
            <div class="left padding-l-5" >
              <span class="des-word" >房</span>
            </div>
            <div class="left " >
              <el-form-item prop="roomShape" label-width="0">
                <CheckSelect :selectId="houseShapeType2Select" :listData="houseShapeType2" style="width:55px;" ></CheckSelect>
                
              </el-form-item>
            </div>
            <div class="left padding-l-5" >
              <span class="des-word" >厅</span>
            </div>
            <div class="left " >
              <el-form-item prop="roomShape" label-width="0">
                <CheckSelect :selectId="houseShapeType3Select" :listData="houseShapeType3" style="width:55px;" ></CheckSelect>
                
              </el-form-item>
            </div>
            <div class="left padding-l-5" >
              <span class="des-word" >卫</span>
            </div>
            <div class="left " >
              <el-form-item prop="roomShape" label-width="0">
                <CheckSelect :selectId="houseShapeType4Select" :listData="houseShapeType4" style="width:55px;" ></CheckSelect>
              </el-form-item>
            </div>
             <div class="left padding-l-5" >
              <span class="des-word" >阳台</span>
            </div>

            <div class="left padding-l-15" >
              <span class="des-word" >类型</span>
            </div>
            <div class="left" >
              <el-form-item>
                <CheckSelect :selectId="roomTypeIds" :listData="roomTypeIdParams" style="width:65px;" ></CheckSelect>
              </el-form-item>
            </div>

            <div class="left padding-l-15" >
              <span class="des-word" >委托</span>
            </div>
            <div class="left " >
              <el-form-item prop="roomShape" label-width="0">
                <CheckSelect :selectId="roomProperty3Select" :listData="roomProperty3Params" style="width:80px;" ></CheckSelect>
              </el-form-item>
            </div>
            
            <div class="left " style="padding-left:5px;" >
              <el-form-item prop="word1" label-width="0">
                <el-input v-model.trim="form.word1" title="楼盘/业主姓名/房号/电话/归属人/备注/房源编号" maxlength="30" style="width:150px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            
            <div class=" left padding-l-5" >
              <i class="search-btn" @click="searchRentListData"  >查询</i>
            </div>
            <div class="left"  style="padding-top:1px;" >
              <i class="claerlys" @click="clearForm"  ></i>
            </div>
            <div class="left" style="margin-top:3px;" >
              <i :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}" @click="showSearch" ></i>
            </div>
          </div>
          <div  id="searchContent1"   class="clear position-t-5" >
             
              <div class="left padding-l-15" >
                <span class="des-word" >自定</span>
              </div>
              <div class="left"  >
                <el-form-item label="" >
                  <CheckSelect :selectId="numSelect" :listData="numParams" style="width:80px;" ></CheckSelect>
                </el-form-item>
              </div>

              <div class="left padding-l-5" >
                <span class="des-word" >交易</span>
              </div>
              <div class="left" >
                <el-form-item>
                  <CheckSelectSpecial @findStreetByTown="changeTradeParams" :selectId="tradeSelect" :listData="tradeParams" style="width:70px;" ></CheckSelectSpecial>
                </el-form-item>
              </div>

              <div class="left p-l-5">
                <span class="des-word" >状态</span>
              </div>
              <div class="left " >
                <el-form-item label="" label-width="0">
                  <CheckSelect :selectId="roomSaleStateId" :listData="roomSaleStateIdParams" style="width:70px;" ></CheckSelect>
                </el-form-item>
              </div>

              <div class="left padding-l-15" >
                <span class="des-word" >盘制</span>
              </div>
              <div class="left " >
                <el-form-item prop="roomShape" label-width="0">
                  <CheckSelect :selectId="roomProperty1Select" :listData="roomProperty1Params" style="width:70px;" ></CheckSelect>
                </el-form-item>
              </div>

              <div class="left" style="padding-left: 23px;">
                <span class="des-word" style="text-align:right;" >{{priceName}}</span>
              </div>
              <div class="left " >
                <el-form-item label="" label-width="0">
                  <el-input @change="checkNum5"   maxLength="13" title="上限10位数" v-model="form.price1"    style="width:75px;"   ></el-input>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <span class="des-word" >-</span>
              </div>
              <div class="left " >
                <el-form-item label="" label-width="0">
                  <el-input @change="checkNum6" v-model="form.price2"  maxLength="13" title="上限10位数"  style="width:75px;"   ></el-input>
                </el-form-item>
              </div>

              <div class="left" style="padding-left: 47px;">
                <span class="des-word" >楼层</span>
              </div>
              <div class="left " >
                <el-form-item prop="floorCurrentStart" label-width="0">
                  <el-input @change="checkNum1"  v-model="form.floorCurrentStart"  maxLength="10" title="上限10位数" style="width:65px;" ></el-input>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <span class="des-word" >-</span>
              </div>
              <div class="left " >
                <el-form-item prop="floorCurrentEnd" label-width="0">
                  <el-input @change="checkNum2"  v-model="form.floorCurrentEnd"  maxLength="10" title="上限10位数" style="width:65px;" ></el-input>
                </el-form-item>
              </div>

              <div class="left p-l-10">
                <span class="des-word" >朝向</span>
              </div>
              <div class="left" >
                <el-form-item>
                  <el-select v-model="form.roomDirectionId" style="width:65px;"   >
                    <el-option v-for="item in roomDirectionParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>

            <div   id="searchContent2"  class="clear position-t-10">
              <div class="left padding-l-15" >
                <span class="des-word" >地域</span>
              </div>
              <div class="left" >
                <el-form-item label="" label-width="0">
                  <CheckSelectSpecial :selectId="areaSelect" @findStreetByTown="findStreetByTown" :listData="areaParams" style="width:141px;" ></CheckSelectSpecial>
                </el-form-item>
              </div>

              <div class="left padding-l-2" >
                <el-form-item>
                  <CheckSelect :selectId="streetSelectId" :listData="streetParams" style="width:141px;" ></CheckSelect>
                </el-form-item>
              </div>
              
              <div class="left padding-l-15" >
                <span class="des-word" >用途</span>
              </div>
              <div class="left" >
                <el-form-item prop="roomUseId" label-width="0">
                  <el-select v-model="form.roomUseId"    style="width:70px;"   >
                    <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              
              <div class="left " style="padding-left:23px;"  >
                <span class="des-word" style="text-align:right;" >面积</span>
              </div>
              <div class="left " >
                <el-form-item prop="area1" label-width="0">
                  <el-input @change="checkNum3"  maxLength="10" title="上限10位数" v-model="form.area1"    style="width:75px;"   ></el-input>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <span class="des-word" >-</span>
              </div>
              <div class="left " >
                <el-form-item prop="area2"  label-width="0">
                  <el-input @change="checkNum4" v-model="form.area2"  maxLength="10" title="上限10位数" style="width:75px;"   ></el-input>
                </el-form-item>
              </div>
              
              <div class="left" style="padding-left: 47px;">
                <span class="des-word" >员工</span>
              </div>
              <div class="left"  >
                <el-form-item label="" label-width="0">
                  <CheckSelectSpecial @findStreetByTown="finUserByDepart" :selectId="departIds" :listData="departParams" style="width:120px;" ></CheckSelectSpecial>
                </el-form-item>
              </div>
              <div class="left padding-l-2" >
                <el-form-item label="" >
                  <CheckSelectSpecial :selectId="userId" :listData="userParams" style="width:120px;" ></CheckSelectSpecial>
                </el-form-item>
              </div>

              <div class="left padding-l-15"  >
                <el-checkbox v-model="form.searchThree" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
              </div>
              <div class="left" style="margin:2px 0 0 -11px;" >
                同查三归属人
              </div>
              <div class="left padding-l-15"  >
                <el-checkbox v-model="form.showRepeat" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
              </div>
              <div class="left" style="margin:2px 0 0 -11px;" >
                只看重复
              </div>

            </div>
        </el-form>
      </div>
    </div>

    <div class="content clear" style="height:calc(100% - 140px)" >

      <div class="list-content" >

        <PlTable
          :datas="currentData"
          :pagination-show="false"
          empty-text=" "
          use-virtual
          border
          height="100%"
          @header-click="selectionChange"
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
              v-else-if="item.prop == 'icon'"
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


                <div  style="padding-left:5px;position:relative;" >
                  <i :class="{'special-icon':scope.row.roomProperty1 == '特盘','public-icon':scope.row.roomProperty1 == '公盘','private-icon':scope.row.roomProperty1 == '私盘','close-icon':scope.row.roomProperty1 == '封盘',}" ></i>
                  <i v-if="scope.row.keyNum != 0" style="position:absolute;right:0px;top:0px;" class="key-icon" ></i>
                </div>
              </template>
            </PlTableColumn>
            <pl-table-column
              v-else-if="item.prop == 'adress'"
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
                <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="editorRent(scope.$index, scope.row)" >
                  {{ scope.row.adress }}
                </div>
              </template>
            </pl-table-column>
            <pl-table-column
              v-else-if="item.prop == 'roomType'"
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
                <div v-if="scope.row.roomType == '出售'" style="color:#B40000;text-algin:center;cursor:pointer;"  >
                  {{ scope.row.roomType }}
                </div>
                <div v-if="scope.row.roomType == '出租'" style="color:#009600;text-algin:center;cursor:pointer;"  >
                  {{ scope.row.roomType }}
                </div>
                <div v-if="scope.row.roomType == '租售'" style="color:#007878;text-algin:center;cursor:pointer;"  >
                  {{ scope.row.roomType }}
                </div>
              </template>
            </pl-table-column>
            <pl-table-column
              v-else-if="item.prop == 'salePrice'"
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
              :show-overflow-tooltip="true"
              :sort-method="item.sortMethod"
            >
              <template slot-scope="scope">
                <div class="clear" style="text-algin:center;"  >
                  <div class="right" style="width:80px;height:23px;text-align:right;" >
                     {{ scope.row.salePrice }}
                  </div> 
                  <div class="right" style="width:60px;height:23px;text-align:right;" >
                     {{ scope.row.priceFlag }}
                  </div> 
                  
                 
                </div>
               
              </template>
            </pl-table-column>
            <pl-table-column
              v-else-if="item.prop == 'rentPrice'"
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
              :show-overflow-tooltip="true"
              :sort-method="item.sortMethod"
            >
              <template slot-scope="scope">
                <div class="clear" style="text-algin:center;"  >
                  <div class="right" style="width:80px;height:23px;text-align:right;" >
                     {{ scope.row.rentPrice }}
                  </div> 
                  <div class="right" style="width:60px;height:23px;text-align:right;" >
                     {{ scope.row.rentPriceFlag }}
                  </div> 
                  
                 
                </div>
               
              </template>
            </pl-table-column>
            <pl-table-column
              v-else-if="item.prop == 'roomTotalArea'"
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
              :show-overflow-tooltip="true"
              :sort-method="item.sortMethod"
            >

            </pl-table-column>
            <pl-table-column
              v-else-if="item.prop == 'rentPrice'"
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
              :show-overflow-tooltip="true"
              :sort-method="item.sortMethod"
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
              :show-overflow-tooltip="true"
            >

            </pl-table-column>
          </template>
        </PlTable>
      </div>
    </div>
   
    <div class="component-container" >
      <ModifyNumPage @reloadRentList="reloadRentList" :modifyNumVisible="modifyNumValue"  ref="modifyNum"  ></ModifyNumPage>
    </div>
    <div class="component-container" >
      <ModifyChangePeoplePage @reloadRentList="reloadRentList"   :modifyChangePeopleVisible="changePeopleValue"  ref="modifyChangePeople"  ></ModifyChangePeoplePage>
    </div>


    <div class="component-container" >
      <HouseMatchCustomerPage :houseMatchHouseVisible="houseMatchCustomerValue"  ref="houseMatchCustomerId"  ></HouseMatchCustomerPage>
    </div>
    <div class="component-container" >
      <PrivateChangePublicPage @reloadRentList="reloadRentList"  :dialogVisible="privateChangePublicValue"  ref="privateChangePublicId"  ></PrivateChangePublicPage>
    </div>

    <!-- <div class="component-container" >
      <ColumPage :culumnTitle="culumnTitle" @reloadListByStorage="reloadListByStorage" :columnData="columnData" :sessionStr="sessionStr"  :columnVisible="rentColumnValue"  ref="rentColumnId"  ></ColumPage>
    </div> -->
  </div>
</template>


<script>
  // 获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {findbyId} from '../../../service/getData'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {rentParam,rentList,rentDeleted,sechouseBusinessCountList} from '../../../service/houseData'
  import {rentConstParam} from '../../../utils/rentParam'
  import {quickDate} from '../../../utils/getQuickDate'
  import CheckSelect from '../../../components/check'
  import CheckSelectSpecial from '../../../components/checkSpecial'

  import { PlTable, PlTableColumn } from 'pl-table';

  // 新增租售
  import NewRentPage from './newRent'
  // 编辑租售
  import EditorRentPage from './editorRent'
  // 修改自定号
  import ModifyNumPage from './modifyNum'
  // 修改归属人
  import ModifyChangePeoplePage from './modifyChangePeople'
  //房配客
  import HouseMatchCustomerPage from './houseMatchCustomer'
  //私盘转公盘
  import PrivateChangePublicPage  from './privateChangePublic'
  // 自选列
  import ColumPage from '../../../components/column'
  import layer from 'vue-layer'
  //获取数据
  export default {
    data() {
      return {
        loginuserdepart:'',
        loginuserid:'',
        currentPage:{title:''},
        rendOrCustomer:1,
        currentNum:0,
        modifyNumValue:false,
        changePeopleValue:false,
        newRentValue:false,
        houseMatchCustomerValue:false,
        privateChangePublicValue:false,
        rentColumnValue:false,
        rowHeight:27,
        sessionStr:'rent-list',
        select:'depart',
        areaSelect:'areaSelect',
        tradeSelect:'tradeSelect',
        numSelect:'numSelect',
        roomSaleStateId:'roomSaleStateId',
        streetSelectId:'streetSelectId',
        tradeSelect:'tradeSelect',
        roomTypeIds:'roomTypeIds',
        departIds:'departIds',
        userId:'userId',
        departIds1:'departIds1',
        userId1:'userId1',
        roomProperty1Select:'roomProperty1Select',
        roomProperty3Select:'roomProperty3Select',
        houseShapeTypeSelect:'houseShapeTypeSelect',
        houseShapeType2Select:'houseShapeType2Select',
        houseShapeType3Select:'houseShapeType3Select',
        houseShapeType4Select:'houseShapeType4Select',
        culumnTitle:'租售列表',
        priceName:"价格",
        departParams:[],
        userParams:[{id:'-1',name:"全部",select:true}],
        departParams1:[],
        userParams1:[{id:'-1',name:"全部",select:true}],
        totalNum:0,
        multipleSelection:[],
        tableData:[],
        currentData:[],
        page:1,
        totalPage:0,
        houseShapeType1:[],
        houseShapeType2:[],
        houseShapeType3:[],
        houseShapeType4:[],
        roomShapeParams:[],
        tradeParams:[],
        areaNum1:rentConstParam.areaNum1,
        areaNum2:rentConstParam.areaNum2,
        priceNum1:rentConstParam.priceNum1,
        priceNum2:rentConstParam.priceNum2,
        numParams:[],
        roomProperty1Params:[],
        roomProperty3Params:[],
        roomUseParams:[],
        roomTypeIdParams:[],
        roomDirectionParams:[],
        roomSaleStateIdParams:[],
        areaParams:[],
        streetParams:[],
        commTypesParams:[],
        roomProperty2Params:[],
        columnData:rentConstParam.rentColumn,
        // define default value
        value: null,
        upAndDown:1,
        initLeft:0,//初始化详情弹窗的增加 left
        initTop:0,//初始化详情弹窗的增加 top
        form:{
          timeMode:"2",
          timeStart:"",
          timeEnd:"",
          roomShape1:"-1",
          floorCurrentStart:0,
          floorCurrentEnd:"80",
          word1:"",
          word2:"",
          word3:"",
          num:"-1",
          roomUseId:"-1",
          area1:0,
          area2:"",
          searchThree:0,
          roomTypeIds:"-1",
          price1:"0",
          price2:"",
          roomDirectionId:"-1",
          roomSaleStateId:"",
          showRepeat:0,
        },
        thimyshade:false,
      };
    },
    components:{
      PlTable,
      PlTableColumn,
      CheckSelectSpecial,
      CheckSelect,
      ModifyNumPage,
      ModifyChangePeoplePage,
      NewRentPage,
      EditorRentPage,
      HouseMatchCustomerPage,
      PrivateChangePublicPage,
      ColumPage,


    },
    methods: {
      showSearch(){
        let rent = document.getElementById("rent-container");
        if(this.upAndDown == 1){
          this.upAndDown = 2;

          rent.getElementsByClassName("content")[0].style.height="calc(100vh - 91px) !important";
          rent.getElementsByClassName("el-table")[0].style.height="100% !important";
          document.getElementById("searchContent1").style.display = "none";
          document.getElementById("searchContent2").style.display = "none";

        }else{
          this.upAndDown = 1;
          rent.getElementsByClassName("content")[0].style.height="calc(100vh - 90px) !important";
          rent.getElementsByClassName("el-table")[0].style.height="100% !important";
          document.getElementById("searchContent1").style.display = "block";
          document.getElementById("searchContent2").style.display = "block";
        }
      },
      testCheck(value){
        let _this = this;
        let multipleSelection = _this.multipleSelection;
        if(value.indexOf("_false") != -1){
          _this.multipleSelection = _this.delectedIdFromArr(value,multipleSelection);
        }else{
          _this.multipleSelection.push(value);
        }
      },
      delectedIdFromArr(id,list){
        let arr = [];
        list.forEach(function(item){
          if(id.indexOf(item) == -1){
            arr.push(item);
          }
        })
        return arr;
      },
      selectionChange(){

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
          this.priceName = "售价";
        }else if(ids && ids == 2){
          this.priceName = "租价";
        }else{
          this.priceName = "价格";
        }
      },
      rowClass({row, index}) {
        let className = "";
        if (row.roomProperty2 == '优质') {
          className =  ' well-house ';
        }else if(row.roomProperty2 == '聚焦') {
          className =  ' focus-house ';
        }else if(row.roomProperty2 == '普通') {
          className =  ' common-house ';
        }else if(row.roomProperty2 == '预警') {
          className =  ' warning-house ';
        }else if(row.roomProperty2 == '缺失') {
          className =  ' defect-house ';
        }
        if(row.roomSaleState == '无效'){
          className += " invoild-customer ";
        }
        if(row.isEnd == 1){
          className += ' frozen ';
        }
        if(row.id == this.currentPage.id){
          className += ' page-check ';
        }
        return className;
      },
      cellStyle({row, column, rowIndex, columnIndex}){
       if(column.property == 'processingTime'){
         return {'background':row.processingColor}
       }
       
       if(column.property == 'salePrice' && row.priceFlag && row.priceFlag.indexOf("↑") != -1 ){
         return {'color':'#ce1516'}
       }else if(column.property == 'salePrice' && row.priceFlag && row.priceFlag.indexOf("↓") != -1 ){
         return {'color':'#00cc33'}
       }
        if(column.property == 'rentPrice' && row.rentPriceFlag && row.rentPriceFlag.indexOf("↑") != -1){
         return {'color':'#ce1516'}
       }else if(column.property == 'rentPrice' && row.rentPriceFlag && row.rentPriceFlag.indexOf("↓") != -1){
         return {'color':'#00cc33'}
       }
      },
      findRent(type1,type2){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let timeStart =  "";
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
             if(index == 1){
               item.select = true;
             }else{
               item.select = false;
             }
           })
        }else if(type1 == 3){
          let tradeParams = this.tradeParams;
           tradeParams.forEach((item,index) => {
             if(index == 2){
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
          let time = quickDate.getTwoDateByDay(5);
          timeStart = time.startTime;
          timeEnd = time.endTime;
        }else  if(type2 == 6){
          let time = quickDate.getTwoDateByDay(6);
          timeStart = time.startTime;
          timeEnd = time.endTime;
        }else  if(type2 == 7){
          let time = quickDate.getTwoDateByDay(8);
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
        let page = this.page;
        let ids = this.multipleSelection.toString();
        let townIds = this.getSelectIdByList(this.areaParams);
        let streetIds = this.getSelectIdByList(this.streetParams);
        let roomSaleStateId = this.getSelectIdByList(this.roomSaleStateIdParams);
        let roomTypeIds = this.getSelectIdByList(this.roomTypeIdParams);
        let roomType = this.getSelectIdByList(this.tradeParams);
        form.ids = ids;
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.num = this.getSelectIdByList(this.numParams);

        form.roomShape1 = this.getSelectIdByList(this.houseShapeType1);
        form.hall = this.getSelectIdByList(this.houseShapeType2);
        form.wei = this.getSelectIdByList(this.houseShapeType3);
        form.balcony = this.getSelectIdByList(this.houseShapeType4);
        form.roomProperty1 = this.getSelectIdByList(this.roomProperty1Params);
        form.roomProperty3 = this.getSelectIdByList(this.roomProperty3Params);
        form.numDepartId = this.getSelectIdByList(this.departParams1);
        form.numEmpId = this.getSelectIdByList(this.userParams1);
       
        form.townIds = townIds;
        form.streetIds = streetIds;
        form.roomSaleStateId = roomSaleStateId;
        form.roomTypeIds = roomTypeIds;
        form.roomType = roomType;
        form.searchFlag = 1;
        rentList(form).then(function (response) {
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
            _this.currentData.forEach(item=>{
              if(!item.roomTotalArea){
                item.roomTotalArea = '';
              }else{
                item.roomTotalArea = Number(item.roomTotalArea);
              };
              if(!item.rentPrice){
                item.rentPrice = '';
              }else{
                item.rentPrice = Number(item.rentPrice);
              }
              
            })
            console.log(_this.currentData);
            _this.$nextTick(function () {
              let rent = document.getElementById("rent-container");
              rent.getElementsByClassName("ant-table-scroll")[0].style.height = "100%";
              rent.getElementsByClassName("ant-table-scroll")[0].style.maxHeight = "100%";
              rent.getElementsByClassName("el-table")[0].style.height = "100%";
            })

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }

        })
      },
      findRentByShape(id){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let page = this.page;
        let ids = this.multipleSelection.toString();
        let townIds = this.getSelectIdByList(this.areaParams);
        let streetIds = this.getSelectIdByList(this.streetParams);
        let roomSaleStateId = this.getSelectIdByList(this.roomSaleStateIdParams);
        let roomTypeIds = this.getSelectIdByList(this.roomTypeIdParams);
        let roomType = this.getSelectIdByList(this.tradeParams);
        form.ids = ids;
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.num = this.getSelectIdByList(this.numParams);

        form.roomShape1 = this.getSelectIdByList(this.houseShapeType1);
        form.hall = this.getSelectIdByList(this.houseShapeType2);
        form.wei = this.getSelectIdByList(this.houseShapeType3);
        form.balcony = this.getSelectIdByList(this.houseShapeType4);
        form.roomProperty1 = this.getSelectIdByList(this.roomProperty1Params);
        form.roomProperty3 = this.getSelectIdByList(this.roomProperty3Params);
        form.numDepartId = this.getSelectIdByList(this.departParams1);
        form.numEmpId = this.getSelectIdByList(this.userParams1);
       
        form.townIds = townIds;
        form.streetIds = streetIds;
        form.roomSaleStateId = roomSaleStateId;
        form.roomTypeIds = roomTypeIds;
        form.roomType = roomType;
        form.searchFlag = 1;
        form.roomShape = id;
        rentList(form).then(function (response) {
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
      findRentByComm(id){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let page = this.page;
        let ids = this.multipleSelection.toString();
        let townIds = this.getSelectIdByList(this.areaParams);
        let streetIds = this.getSelectIdByList(this.streetParams);
        let roomSaleStateId = this.getSelectIdByList(this.roomSaleStateIdParams);
        let roomTypeIds = this.getSelectIdByList(this.roomTypeIdParams);
        let roomType = this.getSelectIdByList(this.tradeParams);
        form.ids = ids;
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.num = this.getSelectIdByList(this.numParams);

        form.roomShape1 = this.getSelectIdByList(this.houseShapeType1);
        form.hall = this.getSelectIdByList(this.houseShapeType2);
        form.wei = this.getSelectIdByList(this.houseShapeType3);
        form.balcony = this.getSelectIdByList(this.houseShapeType4);
        form.roomProperty1 = this.getSelectIdByList(this.roomProperty1Params);
        form.roomProperty3 = this.getSelectIdByList(this.roomProperty3Params);
        form.numDepartId = this.getSelectIdByList(this.departParams1);
        form.numEmpId = this.getSelectIdByList(this.userParams1);
       
        form.townIds = townIds;
        form.streetIds = streetIds;
        form.roomSaleStateId = roomSaleStateId;
        form.roomTypeIds = roomTypeIds;
        form.roomType = roomType;
        form.searchFlag = 1;
        form.commType = id;
        rentList(form).then(function (response) {
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
      findRentByWell(id){
        if(!id){
          //默认优质
          id = "657524295324807168";
        }
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let page = this.page;
        let ids = this.multipleSelection.toString();
        let townIds = this.getSelectIdByList(this.areaParams);
        let streetIds = this.getSelectIdByList(this.streetParams);
        let roomSaleStateId = this.getSelectIdByList(this.roomSaleStateIdParams);
        let roomTypeIds = this.getSelectIdByList(this.roomTypeIdParams);
        let roomType = this.getSelectIdByList(this.tradeParams);
        form.ids = ids;
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.num = this.getSelectIdByList(this.numParams);

        form.roomShape1 = this.getSelectIdByList(this.houseShapeType1);
        form.hall = this.getSelectIdByList(this.houseShapeType2);
        form.wei = this.getSelectIdByList(this.houseShapeType3);
        form.balcony = this.getSelectIdByList(this.houseShapeType4);
        form.roomProperty1 = this.getSelectIdByList(this.roomProperty1Params);
        form.roomProperty3 = this.getSelectIdByList(this.roomProperty3Params);
        form.numDepartId = this.getSelectIdByList(this.departParams1);
        form.numEmpId = this.getSelectIdByList(this.userParams1);
       
        form.townIds = townIds;
        form.streetIds = streetIds;
        form.roomSaleStateId = roomSaleStateId;
        form.roomTypeIds = roomTypeIds;
        form.roomType = roomType;
        form.searchFlag = 1;
        form.customerProperty2 = id;
        rentList(form).then(function (response) {
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
      getSameHouse(){
        let _this = this;
        let select = this.multipleSelection.toString();
        if(select){
          let form = {sameOwner:select,page:1};
          this.$layer.loading({
            shade: true,//是否显示遮罩
          });
          rentList(form).then(function (response) {
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

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }

          })
        }else{
          this.myAlert("请选中要查询【同业主】的房源","dangerous-icon");
        }

      },
      clearForm(){
        let _this = this;
        this.quick = '1';
        this.form.timeMode = "2" ;
        this.priceName = "价格";
        let time = quickDate.getTwoDateByDay(6);
        this.form.timeStart = time.startTime;
        this.form.timeEnd = time.endTime;

        this.form.roomShape1 = "-1";
        this.form.floorCurrentStart = 0;
        this.form.floorCurrentEnd = 80;
        this.form.word1 = "";
        this.form.word2 = "";
        this.form.word3 = "";

        this.form.roomUseId = "-1";
        this.form.area1 = 0;
        this.form.area2 = "";
        this.form.searchThree = 0;
        this.form.roomTypeIds = "-1";
        this.form.price1 = "0";
        this.form.price2 = "";
        this.form.roomDirectionId = "-1";
        this.form.roomSaleStateId = "";
        this.form.showRepeat = 0;
        _this.areaParams = _this.backSlect(_this.areaParams);
        _this.streetParams = _this.backSlect(_this.streetParams);
        _this.roomSaleStateIdParams = _this.backSlect(_this.roomSaleStateIdParams);
        _this.roomTypeIdParams = _this.backSlect(_this.roomTypeIdParams);
        _this.tradeParams = _this.backSlect(_this.tradeParams);
        _this.departParams = _this.backSlect(_this.departParams);
        _this.userParams = _this.backSlect(_this.userParams);
        _this.numParams = _this.backSlect(_this.numParams);

        _this.houseShapeType = _this.backSlect(_this.houseShapeType1);
        _this.houseShapeType2 = _this.backSlect(_this.houseShapeType2);
        _this.houseShapeType3 = _this.backSlect(_this.houseShapeType3);
        _this.houseShapeType4 = _this.backSlect(_this.houseShapeType4);
        _this.roomProperty1Params = _this.backSlect(_this.roomProperty1Params);
        _this.roomProperty3Params = _this.backSlect(_this.roomProperty3Params);
        _this.departParams1 = _this.loginuserdepart;
        _this.userParams1 = _this.loginuserid;
      },

      getRentListData(){

        let _this =  this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = JSON.parse(JSON.stringify(_this.form));
        let page = this.page;
        let ids = this.multipleSelection.toString();
        let townIds = this.getSelectIdByList(this.areaParams);
        let streetIds = this.getSelectIdByList(this.streetParams);
        let roomSaleStateId = this.getSelectIdByList(this.roomSaleStateIdParams);
        let roomTypeIds = this.getSelectIdByList(this.roomTypeIdParams);
        let roomType = this.getSelectIdByList(this.tradeParams);
        form.ids = ids;
        form.deptIds = this.getSelectIdByList(this.departParams);
        form.userIds = this.getSelectIdByList(this.userParams);
        form.num = this.getSelectIdByList(this.numParams);
        
        form.roomShape1 = this.getSelectIdByList(this.houseShapeType1);
        form.hall = this.getSelectIdByList(this.houseShapeType2);
        form.wei = this.getSelectIdByList(this.houseShapeType3);
        form.balcony = this.getSelectIdByList(this.houseShapeType4);
        form.roomProperty1 = this.getSelectIdByList(this.roomProperty1Params);
        form.roomProperty3 = this.getSelectIdByList(this.roomProperty3Params);
        form.numDepartId = this.getSelectIdByList(this.departParams1);
        form.numEmpId = this.getSelectIdByList(this.userParams1);

        form.townIds = townIds;
        form.streetIds = streetIds;
        form.roomSaleStateId = roomSaleStateId;
        form.roomTypeIds = roomTypeIds;
        form.roomType = roomType;
        if(!form.timeStart){
          form.timeStart = "";
        }
        if(!form.timeEnd){
          form.timeEnd = "";
        }
        rentList(form).then(function (response) {
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

        })
      },
      searchRentListData(){
        this.page = 1;
        this.currentNum = 0;
        this.currentData = [];
        this.getRentListData();
      },
      reloadRentList(type,id){
        var _this = this;
        if(type ==1){
          this.searchRentListData();
        }else if(type == 2){
          this.newRent();
        }else if(type == 3){
          let form = {id:id};
          rentList(form).then(function (response) {
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
        rentParam().then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            let time = quickDate.getTwoDateByDay(6);
            _this.form.timeStart = time.startTime;
            _this.form.timeEnd = time.endTime;
            let defaultUserList = data.defaultUserList;
            let defaultDepartId = data.defaultDepartId;
            let defaultUserId = data.defaultUserId;
            let roomProperty1Params = data.roomProperty1Params;
            let roomProperty3Params = data.roomProperty3Params;
            
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
            _this.loginuserid = arr;
            _this.userParams = [{id:"-1",name:"全部",select:true}];

            let initArr = [{id:"-1",name:"全部",select:true}];
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
            }
            _this.streetParams = initArr;
            if(rentConstParam.houseTradeParams){
              let arr = [{id:'-1',name:'全部',select:true}];
              let arrParams = rentConstParam.houseTradeParams;
              if(arrParams){
                for(let i = 0 ; i < arrParams.length ; i++){
                  arr.push({
                    id:arrParams[i].id,
                    name:arrParams[i].name,
                    select:false,
                  })
                }
              }
              _this.tradeParams = arr;
            }

            

            if(data.roomShapeParams){

              _this.roomShapeParams = data.roomShapeParams;
            }
            if(data.numParams){
              let arr = [{id:'0',name:'空',select:false}];
              data.numParams.forEach(function(item){
                  arr.push({
                    id:item.name,
                    name:item.name,
                    select:false,
                  })
              })
              _this.numParams = [{id:"-1",name:"全部",select:true}].concat(arr);
            }
            //用途
            if(data.roomUseParams){
              _this.roomUseParams = [{id:"-1",name:"全部",select:true}].concat(data.roomUseParams);
            }
            //
            if(roomProperty1Params){
              _this.roomProperty1Params = [{id:"-1",name:"全部",select:true}].concat(roomProperty1Params);
            }

            if(roomProperty3Params){
              _this.roomProperty3Params = [{id:"-1",name:"全部",select:true}].concat(roomProperty3Params);
            }

            if(data.commTypesParams){
              _this.commTypesParams = data.commTypesParams;
            }
            if(data.roomProperty2Params){
              _this.roomProperty2Params = data.roomProperty2Params;
            }
            let houseParam = rentConstParam.houses;
            let houseArr = [];
            houseParam.forEach(item => {
              if(item.id != -1){
                houseArr.push(item);
              }
            })
            _this.houseShapeType1 = [{id:"-1",name:"全部",select:true}].concat(JSON.parse(JSON.stringify(houseArr)));
            _this.houseShapeType2 = [{id:"-1",name:"全部",select:true}].concat(JSON.parse(JSON.stringify(houseArr)));
            _this.houseShapeType3 = [{id:"-1",name:"全部",select:true}].concat(JSON.parse(JSON.stringify(houseArr)));
            _this.houseShapeType4 = [{id:"-1",name:"全部",select:true}].concat(JSON.parse(JSON.stringify(houseArr)));
            //类型
            if(data.roomTypeIdParams){
              let arr = [{id:'-1',name:'全部',select:true}];
              let arrParams = data.roomTypeIdParams;
              if(arrParams){
                for(let i = 0 ; i < arrParams.length ; i++){
                  arr.push({
                    id:arrParams[i].id,
                    name:arrParams[i].name,
                    select:false,
                  })
                }
              }
              _this.roomTypeIdParams = arr;
            }

            //状态
            if(data.roomSaleStateIdParams){
              let arr = [{id:'-1',name:'全部',select:true}];
              let arrParams = data.roomSaleStateIdParams;
              if(arrParams){
                for(let i = 0 ; i < arrParams.length ; i++){
                  let obj = {
                    id:arrParams[i].id,
                    name:arrParams[i].name,
                    select:false,
                  };
                  if(arrParams[i].name == "有效"){
                    obj.select = true;
                    arr[0].select = false;
                  }
                  arr.push(obj);
                }
              }
              _this.roomSaleStateIdParams = arr;

            }

            if(data.roomDirectionParams){
              _this.roomDirectionParams = [{id:"-1",name:"全部",select:true}].concat(data.roomDirectionParams);
            }
            
            let tradeParams = _this.tradeParams;
            if(type == 1 && formData){
              _this.form.timeMode = '-1';
              _this.form.timeStart = "";
              _this.form.timeEnd = "";
               if(formData.check1 == '1'){
                  let roomTypeIds = formData.roomTypeIds;
                  let arr = [];
                  tradeParams.forEach(item =>{
                    if(roomTypeIds == 2 &&  item.id  == 1){
                      item.select = true;
                    }else if(roomTypeIds == 1 &&  item.id  == 2){
                      item.select = true;
                    }else if(roomTypeIds == 3 &&  item.id  == 3){
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
                   let townIds = formData.townIds;
                   let arr = [];
                  areaParams.forEach(item =>{
                    if(item.id  == townIds){
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
                  let area1 = formData.area1;
                  let area2 = formData.area2; 
                  _this.form.area1 = area1;
                  _this.form.area2 = area2;
               }
               if(formData.check7 == '1'){
                   let unit = formData.unit;
                   let price1 = formData.price1;
                   let price2 = formData.price2;
                   if(price1){
                     if(unit == '万元' || unit == '万'){
                        _this.form.price1 = price1*1*10000;
                     }else{
                         _this.form.price1 = price1*1;
                     }
                   }
                   if(price2){
                     if(unit == '万元' || unit == '万'){
                        _this.form.price2 = price2*1*10000;
                     }else{
                         _this.form.price2 = price2*1;
                     }
                   }
                  
               }

            }
            if(needFlag){
              _this.linkhttpfunc(formData);
            }else{
              _this.searchRentListData();
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
              if(user && user.lengthg != 0){
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
              if(user && user.lengthg != 0){
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
          this.myAlert("请选择房源！",'dangerous-icon');
        }
      },
      //批量修改归属人
      modifyChangePeopleClick(){
        let select = this.multipleSelection.toString();
        if(select){
          this.$refs['modifyChangePeople'].diolagShow(select);
        }else{
          this.myAlert("请选择房源！",'dangerous-icon');
        }
      },

      loadmore(value){
        let page = this.page;
        let totalPage = this.totalPage;
        if(value == 1) {
          if (page < totalPage) {
            this.page ++ ;
            this.getRentListData();

          }
        }
      },
      //客对列表
      changeToCustomer(){
        this.$router.push('/home/houseCompare');
      },
      deletedRent(){
        let _this =  this;
        let select = this.multipleSelection.toString();
        if(select){
          _this.myConfirm("警告：删除房源会将其跟进记录一起删除！", 'question-icon','确定','取消','确定要将选定房源放入回收站吗？','my-message').then(res => {
            rentDeleted(select,1).then(function (response) {
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                _this.myAlert("删除成功！",'success-icon').then(res => {
                  let id = _this.multipleSelection;
                  let temp = _this.currentData.concat();
                  for(let i = 0 , len = id.length; i < len ; i++ ){
                    temp = _this.deletArrByValue(temp,id[i]);
                  }
                  _this.currentData = temp;

                  _this.currentNum = 0;
                  let totalNum = _this.totalNum ;
                  _this.totalNum = totalNum - _this.multipleSelection.length;
                  _this.multipleSelection = [];
                }).catch(err => {

                })
              } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message + "！");
              }
            })
          }).catch(err => {
            
          })

        }else{
          this.myAlert("请选择房源！",'dangerous-icon');
        }
      },
      newRent(){
        
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: NewRentPage , //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "新增房源",
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
      editorRent(index, row){
        let _this = this;
        let thisifranmeisopen = false;
        let thisifranmeopennum = 0;

        _this.$store.state.layerifranme.forEach(item=>{
          if(item.thisrowid == row.id){
            document.getElementById(item.childlayerid).focus();
            thisifranmeisopen = true;
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

        let ids = [];
        let currentData = _this.currentData;
        let len = currentData.length;
        for(let i = 0 ;  i < len; i ++){
          ids.push(currentData[i].id);
        }
        _this.currentPage = row;
        let layerId = _this.$layer.iframe({
          content: {
            content: EditorRentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,address:row.adress,activeName:'house',ids:ids.toString(),mythisindex:index}//props
          },
          area:['800px','560px'],
          title: "房源信息 【"+_this.currentPage.adress+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          tipsMore:false,
          zIndex:19891110,
          btn:['queding','quxiao'],
          cancel:()=>{//关闭事件
            this.currentPage = '';
            if( this.initLeft != 0){
              this.initLeft -= 10;
              this.initTop -= 30;
            };
          },
        });
        let getLayerId = document.getElementById(layerId);
        getLayerId.style.left = "calc(50% + "+_this.initLeft+"px)";
        getLayerId.style.top =  "calc(50% + "+_this.initTop+"px)";
        _this.initLeft += 10;
        _this.initTop += 30;

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

        _this.currentPage = tableData[mycountnum];
        let getLayerId = document.getElementById(needlayerid);
        getLayerId.getElementsByClassName('lv-title')[0].innerHTML ="房源信息 【"+_this.currentPage.adress+"】";
        _this.$refs.singleTable.setCurrentRow(_this.currentPage);

        _this.$store.state.layerifranme.forEach(item=>{
          if(needlayerid == item.childlayerid){
            item.thisrowid =  _this.currentPage.id
          }
        });
        let  callbackdata = {
          rowid: tableData[mycountnum].id,
          thisindex:mycountnum,
        };
        return callbackdata;
      },
      setSroll(){
        let scoll = document.getElementById("rent-container").getElementsByClassName("el-table__body-wrapper");
        scoll.scrollTop = scoll.scrollHeight;
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
          this.myAlert("请选择房源一条！",'dangerous-icon');
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
          this.$refs["privateChangePublicId"].showDialogView(select);
        }else{
          this.myAlert("请选择房源！",'dangerous-icon');
        }
       
      },
      exportToExcel () {
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
          export_json_to_excel(tHeader, data, '租售列表')
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //自选列
      rentColumn(){
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
      // sortMethod(obj1, obj2){
      //   return (Number(obj1.salePrice.replace('万元','')) - Number(obj2.salePrice.replace('万元','')));
      // },

      //业务统计跳转
      linkhttpfunc(form){
        let _this = this;
        this.$layer.loading({
          shade: true //是否显示遮罩
        });

        sechouseBusinessCountList(form).then(function(res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            _this.currentData = res.data.list;
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
    .search-btn,.claerlys{
      cursor:pointer;
    }
    .content{
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
             }
           }
        }
      }
    }

  }
  
</style>