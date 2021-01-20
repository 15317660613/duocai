<template>
  <div style="padding: 0px 10px;width: 100%;">
      <div class="pop-up" style="padding:10px 10px 27px 10px;">
        <div class="pop-up-container" style="border: none;margin: 0px;position: relative;">
          <el-tabs type="border-card" v-model="getActiveName" @tab-click="changeTab">
            <el-tab-pane label="日时期" name="daytime">
              <span slot="label">日时期</span>
              <div class="search-container" style="height:445px;overflow:auto;margin: 0px;width: 100%;position: relative;">
                <div class="clear p-t-5">
                  <div class="left" style="padding-left:15px">
                    <span class="des-word">时间</span>
                  </div>
                  <el-form ref="formsData" :model="form">
                    <div class="left" style="margin-top: 3px;">
                      <el-form-item>
                        <el-select v-model="form.yearforday" @change="yearchangefunc"  style="width:100px;">
                          <el-option v-for="item in yeardata" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    
                    <div class="left" style="margin-top: 3px;">
                      <el-form-item>
                        <el-select v-model="form.date" @change="datechangefunc"  style="width:100px;">
                          <el-option v-for="item in monthdata" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    
                  </el-form>
                  <div class="left p-l-10">
                    <span class="des-word" style="color: #999;">(显示历史所有年份和本年及未来1年)</span>
                  </div>
                  <div class="left p-l-10" style="margin-top: 7px;">
                    <i class="fourteen-three-icon" title="批量设置指标" @click="setupTargetbtnfunc" ></i>
                  </div>
                </div>
                <div class="break" style="margin: 5px;"></div>
                <div class="list-content" >
                  <PlTable
                    :datas="tableDataDay"
                    :pagination-show="false"
                    border
                    use-virtual
                    @selection-change="handleSelectionChange"
                    height="100%"
                    :row-height="rowHeight1"                  >
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

                      <pl-table-column
                        v-else-if="item.prop == 'day'"
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
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope" style="height: 100%;">
                            <span>{{scope.row.day}}</span>
                        </template>
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
                        show-overflow-tooltip
                      >
                        <template slot="header">
                          <p>{{item.label1}}</p>
                          <p>{{item.label2}}</p>
                        </template>
                        <template slot-scope="scope">
                          <el-input class="specialinput" v-model="scope.row[item.prop]" maxlength="4" title="上限4位数"></el-input>
                        </template>
                      </pl-table-column>
                    </template>
                  </PlTable>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="周时期" name="weektime">
              <span slot="label">周时期</span>
              <div class="search-container" style="height:445px;overflow:auto;margin: 0px;width: 100%;position: relative;">
                <div class="clear p-t-5">
                  <div class="left" style="padding-left:15px">
                    <span class="des-word">时间</span>
                  </div>
                  <el-form ref="formsData" :model="form">
                    <div class="left" style="margin-top: 3px;">
                      <el-form-item>
                        <el-select v-model="form.yearforweek" @change="yearchangefunc" style="width:100px;">
                          <el-option v-for="item in yeardata" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-form>
                  <div class="left p-l-10">
                    <span class="des-word" style="color: #999;">(显示历史所有年份和本年及未来1年)</span>
                  </div>
                  <div class="left p-l-10" style="margin-top: 7px;">
                    <i class="fourteen-three-icon" title="批量设置指标" @click="setupTargetbtnfunc" ></i>
                  </div>
                </div>
                <div class="break" style="margin: 5px;"></div>
                <div class="list-content" >
                  <PlTable
                    :datas="tableDataWeek"
                    :pagination-show="false"
                    border
                    use-virtual
                    @selection-change="handleSelectionChange"
                    height="100%"
                    :row-height="rowHeight2"                  >
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

                      <pl-table-column
                        v-else-if="item.prop == 'day'"
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
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope" style="height: 100%;">
                            <span>{{scope.row.day}}<br/>{{scope.row.startANDend}}</span>
                        </template>
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
                        show-overflow-tooltip
                      >
                        <template slot="header">
                          <p>{{item.label1}}</p>
                          <p>{{item.label2}}</p>
                        </template>
                        <template slot-scope="scope">
                          <el-input class="specialinput1" v-model="scope.row[item.prop]" maxlength="4" title="上限4位数"></el-input>
                        </template>
                      </pl-table-column>
                    </template>
                  </PlTable>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="月时期" name="monthtime">
              <span slot="label">月时期</span>
              <div class="search-container" style="height:445px;overflow:auto;margin: 0px;width: 100%;position: relative;">
                <div class="clear p-t-5">
                  <div class="left" style="padding-left:15px">
                    <span class="des-word">时间</span>
                  </div>
                  <el-form ref="formsData" :model="form">
                    <div class="left" style="margin-top: 3px;">
                      <el-form-item>
                        <el-select v-model="form.yearformonth" @change="yearchangefunc" style="width:100px;">
                          <el-option v-for="item in yeardata" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-form>
                  <div class="left p-l-10">
                    <span class="des-word" style="color: #999;">(显示历史所有年份和本年及未来1年)</span>
                  </div>
                  <div class="left p-l-10" style="margin-top: 7px;">
                    <i class="fourteen-three-icon" title="批量设置指标" @click="setupTargetbtnfunc" ></i>
                  </div>
                </div>
                <div class="break" style="margin: 5px;"></div>
                <div class="list-content" >
                  <PlTable
                    :datas="tableDataMonth"
                    :pagination-show="false"
                    border
                    use-virtual
                    @selection-change="handleSelectionChange"
                    height="100%"
                    :row-height="rowHeight1"                  >
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

                      <pl-table-column
                        v-else-if="item.prop == 'day'"
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
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope" style="height: 100%;">
                            <span>{{scope.row.day}}</span>
                        </template>
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
                        show-overflow-tooltip
                      >
                        <template slot="header">
                          <p>{{item.label1}}</p>
                          <p>{{item.label2}}</p>
                        </template>
                        <template slot-scope="scope">
                          <el-input class="specialinput" v-model="scope.row[item.prop]" maxlength="4" title="上限4位数"></el-input>
                        </template>
                      </pl-table-column>
                    </template>
                  </PlTable>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="季时期" name="seasontime">
              <span slot="label">季时期</span>
              <div class="search-container" style="height:445px;overflow:auto;margin: 0px;width: 100%;position: relative;">
                <div class="clear p-t-5">
                  <div class="left" style="padding-left:15px">
                    <span class="des-word">时间</span>
                  </div>
                  <el-form ref="formsData" :model="form">
                    <div class="left" style="margin-top: 3px;">
                      <el-form-item>
                        <el-select v-model="form.yearforseason" @change="yearchangefunc" style="width:100px;">
                          <el-option v-for="item in yeardata" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-form>
                  <div class="left p-l-10">
                    <span class="des-word" style="color: #999;">(显示历史所有年份和本年及未来1年)</span>
                  </div>
                  <div class="left p-l-10" style="margin-top: 7px;">
                    <i class="fourteen-three-icon" title="批量设置指标" @click="setupTargetbtnfunc" ></i>
                  </div>
                </div>
                <div class="break" style="margin: 5px;"></div>
                <div class="list-content" >
                  <PlTable
                    :datas="tableDataSeason"
                    :pagination-show="false"
                    border
                    use-virtual
                    @selection-change="handleSelectionChange"
                    height="100%"
                    :row-height="rowHeight1"                  >
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

                      <pl-table-column
                        v-else-if="item.prop == 'day'"
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
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope" style="height: 100%;">
                            <span>{{scope.row.day}}</span>
                        </template>
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
                        show-overflow-tooltip
                      >
                        <template slot="header">
                          <p>{{item.label1}}</p>
                          <p>{{item.label2}}</p>
                        </template>
                        <template slot-scope="scope">
                          <el-input class="specialinput" v-model="scope.row[item.prop]" maxlength="4" title="上限4位数"></el-input>
                        </template>
                      </pl-table-column>
                    </template>
                  </PlTable>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="年时期" name="yeartime">
              <span slot="label">年时期</span>
              <div class="search-container" style="height:445px;overflow:auto;margin: 0px;width: 100%;position: relative;">
                <div class="clear p-t-5">
                  <div class="left" style="padding-left:15px">
                    <span class="des-word">时间</span>
                  </div>
                  <el-form ref="formsData" :model="form">
                    <div class="left" style="margin-top: 3px;">
                      <el-form-item>
                        <el-select v-model="form.yearforyear" @change="yearchangefunc" style="width:100px;">
                          <el-option v-for="item in yeardata" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-form>
                  <div class="left p-l-10">
                    <span class="des-word" style="color: #999;">(显示历史所有年份和本年及未来1年)</span>
                  </div>
                  <div class="left p-l-10" style="margin-top: 7px;">
                    <i class="fourteen-three-icon" title="批量设置指标" @click="setupTargetbtnfunc" ></i>
                  </div>
                </div>
                <div class="break" style="margin: 5px;"></div>
                <div class="list-content" >
                  <PlTable
                    :datas="tableDataYear"
                    :pagination-show="false"
                    border
                    use-virtual
                    @selection-change="handleSelectionChange"
                    height="100%"
                    :row-height="rowHeight1"                  >
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

                      <pl-table-column
                        v-else-if="item.prop == 'day'"
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
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope" style="height: 100%;">
                            <span>{{scope.row.day}}</span>
                        </template>
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
                        show-overflow-tooltip
                      >
                        <template slot="header">
                          <p>{{item.label1}}</p>
                          <p>{{item.label2}}</p>
                        </template>
                        <template slot-scope="scope">
                          <el-input class="specialinput" v-model="scope.row[item.prop]" maxlength="4" title="上限4位数"></el-input>
                        </template>
                      </pl-table-column>
                    </template>
                  </PlTable>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="clear" style="position: absolute;top: 0px;right: 0px;">
            <p class="left" style="display: inline-block;line-height: 20px;">设置指标说明</p>
            <i class="nine-five-icon left" @click="questiondetail" style="display: inline-block;margin-left: 3px;"></i>
          </div>
        </div>
        <div  style="margin-top:3px">
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        </div>
      </div>

  </div>
</template>

<script>
import { odeparttree, findUserByDepartId } from "../../../service/organizeDate";
import CheckSelectSpecial from '../../../components/checkSpecial';
import { statisticsInsertTarget } from "../../../service/BusinessStatisticsList";
import { BusinessStatisticsParam } from "../../../utils/BusinessStatistics";
import { PlTable, PlTableColumn } from "pl-table";
import SettingIndicators from "./SettingIndicators";
import questiondetail from "./questiondetail";

export default {
  props:['myids','mydateType','layerid','myuserType'],
  data() {
    return {
      getActiveName:'daytime',
      form:{  
        yearforday:'-1',
        yearforweek:'-1',
        yearformonth:'-1',
        yearforseason:'-1',
        yearforyear:'-1',
        date:'-1',
      },
      yeardata:[
        {id:'-1',name:' ',select:false},
        {id:'2019',name:'2019',select:false},
        {id:'2020',name:'2020',select:false},
        {id:'2021',name:'2021',select:false},
      ],
      monthdata:[
        { id: '-1',name: "", select: true }
      ],
      tableDataDay:[],
      tableDataWeek:[],
      tableDataMonth:[],
      tableDataSeason:[],
      tableDataYear:[],
      multipleSelection1:[],
      multipleSelection2:[],
      multipleSelection3:[],
      multipleSelection4:[],
      multipleSelection5:[],
      rowHeight1:27,
      rowHeight2:35,
      columnData:BusinessStatisticsParam.newBusinessStatistics,
    };
  },
  components: {
    CheckSelectSpecial,
    PlTable,
    PlTableColumn,
    SettingIndicators,
    questiondetail
  },
  methods: {
    setdayfunc(){
      let _this = this;
      _this.monthdata = [{ id: '-1',name: "  ", select: true }];
      _this.form.date = '-1';
      _this.tableDataDay = [];
      if(_this.form.yearforday!='-1'){
        for(let i = 1;i<13;i++){
          if(i<10){
            _this.monthdata.push({
              id:'0'+i,
              name:_this.form.yearforday + '-0' + i,
              select:false,
            })
          }else{
            _this.monthdata.push({
              id:'0'+i,
              name:_this.form.yearforday + '-' + i,
              select:false,
            })
          }
        }
      }
    },
    getDayData(){
      let _this = this;
      let year = _this.form.yearforday;
      let date = _this.form.date;
      _this.form.date = date.toString().padStart(2,'0');
      let thisrowdata = {};
      for(let j = 1;j<20;j++){
        thisrowdata['num'+j] = '';
        day:'';
      }
      if(_this.mydateType==1){
        let dateLength = new Date(year,date,0).getDate();
        for(let i = 1;i<dateLength+1;i++){
          _this.tableDataDay.push(JSON.parse(JSON.stringify(thisrowdata)));
        }
        _this.tableDataDay.forEach((item,index)=>{
          let i = index + 1;
          if(index<9){
            item.day = _this.form.yearforday + '-'+date +'-0' + i;
            item.myid = _this.form.yearforday + date +'0' + i
          }else{
            item.day = _this.form.yearforday + '-'+date +'-' + i;
            item.myid = _this.form.yearforday + date + i;
          }
        })
      }
    },
    getWeekData(){
      let _this = this;
      _this.tableDataWeek = [];
      if(_this.form.yearforweek!='-1'){
        let thisrowdata = {};
        for(let j = 1;j<20;j++){
          thisrowdata['num'+j] = '';
          day:'';
        };
        for(let i = 1;i<53;i++){
          _this.tableDataWeek.push(JSON.parse(JSON.stringify(thisrowdata)));
        };
        _this.tableDataWeek.forEach((item,index)=>{
          let i = index + 1;
          item.day = _this.form.yearforweek + '-第' + i +'周';
          item.startANDend =  _this.week_date(_this.form.yearforweek+'-'+i);
          item.myid = _this.form.yearforweek + i;
        })
      }
      
    },
    getMonthData(){
      let _this = this;
      _this.tableDataMonth = [];
      if(_this.form.yearformonth!='-1'){
        let thisrowdata = {};
        for(let j = 1;j<20;j++){
          thisrowdata['num'+j] = '';
          day:'';
        };
        for(let i = 1;i<13;i++){
          _this.tableDataMonth.push(JSON.parse(JSON.stringify(thisrowdata)));
        };
        _this.tableDataMonth.forEach((item,index)=>{
          let i = index + 1;
          if(index<9){
            item.day = _this.form.yearformonth + '-0' + i;
            item.myid = _this.form.yearformonth + i;
          }else{
            item.day = _this.form.yearformonth + '-' + i;
            item.myid = _this.form.yearformonth + i;
          }
        })
      }
    },
    getSeasonData(){
      let _this = this;
      _this.tableDataSeason = [];
      if(_this.form.yearforseason!='-1'){
        let thisrowdata = {};
        for(let j = 1;j<20;j++){
          thisrowdata['num'+j] = '';
          day:'';
        };
        for(let i = 1;i<5;i++){
          _this.tableDataSeason.push(JSON.parse(JSON.stringify(thisrowdata)));
        };
        _this.tableDataSeason.forEach((item,index)=>{
          if(index==0){
            item.day = _this.form.yearforseason + '-一季度';
            item.myid = _this.form.yearformonth + '1';
          };
          if(index==1){
            item.day = _this.form.yearforseason + '-二季度';
            item.myid = _this.form.yearformonth + '2';
          };
          if(index==2){
            item.day = _this.form.yearforseason + '-三季度';
            item.myid = _this.form.yearformonth + '3';
          };
          if(index==3){
            item.day = _this.form.yearforseason + '-四季度';
            item.myid = _this.form.yearformonth + '4';
          };
        })
      }
    },
    getYearData(){
      let _this = this;
      _this.tableDataYear = [];
      if(_this.form.yearforyear!='-1'){
        let thisrowdata = {};
        for(let j = 1;j<20;j++){
          thisrowdata['num'+j] = '';
          day:'';
        };
        for(let i = 1;i<2;i++){
          _this.tableDataYear.push(JSON.parse(JSON.stringify(thisrowdata)));
        };
        _this.tableDataYear.forEach((item,index)=>{
          item.day = _this.form.yearforyear;
          item.myid = _this.form.yearformonth;
        })
      }
      
    },
    trueclickfunc(row){
      console.log(row);
      this.tableDataDay.forEach((item,index)=>{
        if(index==0){

        }
      })
    },
    yearchangefunc(){
      let _this = this;
      if(_this.getActiveName=='daytime'){
        _this.setdayfunc();
      };
      if(_this.getActiveName=='weektime'){
        _this.getWeekData();
      };
      if(_this.getActiveName=='monthtime'){
        _this.getMonthData();
      };
      if(_this.getActiveName=='seasontime'){
        _this.getSeasonData();
      };
      if(_this.getActiveName=='yeartime'){
        _this.getYearData();
      };
    },
    datechangefunc(){
      if(this.form.date=='-1'){
        this.tableDataDay = [];
      }else{
        this.tableDataDay = [];
        this.getDayData();  
      }
    },
    setupTargetbtnfunc(){
      let _this = this;
      console.log(_this.multipleSelection1);
      if(_this.multipleSelection1.length==0&&_this.getActiveName=='daytime'){
        _this.myAlert("请选择指标时期!", "dangerous-icon");
        return false;
      };
      if(_this.multipleSelection2.length==0&&_this.getActiveName=='weektime'){
        _this.myAlert("请选择指标时期!", "dangerous-icon");
        return false;
      };
      if(_this.multipleSelection3.length==0&&_this.getActiveName=='monthtime'){
        _this.myAlert("请选择指标时期!", "dangerous-icon");
        return false;
      };
      if(_this.multipleSelection4.length==0&&_this.getActiveName=='seasontime'){
        _this.myAlert("请选择指标时期!", "dangerous-icon");
        return false;
      };
      if(_this.multipleSelection5.length==0&&_this.getActiveName=='yeartime'){
        _this.myAlert("请选择指标时期!", "dangerous-icon");
        return false;
      };
      let layerId = _this.$layer.iframe({
        content: {
          content: SettingIndicators, //传递的组件对象
          parent: _this, //当前的vue对象
          data: {

          } //props
        },
        area: ["600px", "400px"],
        title: "批量设置指标",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件

        }
      });
    },
    changeTab(val){
      // let _this = this;
      // console.log(_this.getActiveName);
      // if(_this.getActiveName=='daytime'){
      //   // _this.setdayfunc();
      //   _this.getDayData();
      // };
      // if(_this.getActiveName=='weektime'){
      //   _this.getWeekData();
      // };
      // if(_this.getActiveName=='monthtime'){
      //   _this.getMonthData();
      // };
      // if(_this.getActiveName=='seasontime'){
      //   _this.getSeasonData();
      // };
      // if(_this.getActiveName=='yeartime'){
      //   _this.getYearData();
      // };
    },
    setTableDatafunc(val){
      let _this = this;
      if(_this.getActiveName == 'daytime'){
        _this.tableDataDay.forEach(item=>{
          if(_this.multipleSelection1.includes(item.myid)){
            let day = item.day,myid = item.myid;
            for(let i in item){
              item[i] = val[i];
            }
            item.day = day;
            item.myid = myid;
          }
        })
      }else
      if(_this.getActiveName == 'weektime'){
        _this.tableDataWeek.forEach(item=>{
          if(_this.multipleSelection2.includes(item.myid)){
            let day = item.day,myid = item.myid;
            for(let i in item){
              item[i] = val[i];
            }
            item.day = day;
            item.myid = myid;
          }
        })
      }else
      if(_this.getActiveName == 'monthtime'){
        _this.tableDataMonth.forEach(item=>{
          if(_this.multipleSelection3.includes(item.myid)){
            let day = item.day,myid = item.myid;
            for(let i in item){
              item[i] = val[i];
            }
            item.day = day;
            item.myid = myid;
          }
        })
      }else
      if(_this.getActiveName == 'seasontime'){
        _this.tableDataSeason.forEach(item=>{
          if(_this.multipleSelection4.includes(item.myid)){
            let day = item.day,myid = item.myid;
            for(let i in item){
              item[i] = val[i];
            }
            item.day = day;
            item.myid = myid;
          }
        })
      }else
      if(_this.getActiveName == 'yeartime'){
        _this.tableDataYear.forEach(item=>{
          if(_this.multipleSelection5.includes(item.myid)){
            let day = item.day,myid = item.myid;
            for(let i in item){
              item[i] = val[i];
            }
            item.day = day;
            item.myid = myid;
          }
        })
      }
    },
    clearFormData(){
      this.$layer.close(this.layerid);
    },
    saveFormData(){
      let _this = this;
      let form = {};
      form.ids = _this.myids.toString();
      form.setType =  _this.myuserType;
      form.dates =  [];
      _this.tableDataDay.forEach((item,index)=>{
        let i = index + 1;
        for(let j in item){
          if(item[j]==''){
            delete item[j]
          }
        }
      })
      _this.tableDataWeek.forEach((item,index)=>{
        let i = index + 1;
        for(let j in item){
          if(item[j]==''){
            delete item[j]
          }
        }
      })
      _this.tableDataMonth.forEach((item,index)=>{
        let i = index + 1;
        for(let j in item){
          if(item[j]==''){
            delete item[j]
          }
        }
      })
      _this.tableDataSeason.forEach((item,index)=>{
        let i = index + 1;
        for(let j in item){
          if(item[j]==''){
            delete item[j]
          }
        }
      })
      _this.tableDataYear.forEach((item,index)=>{
        let i = index + 1;
        for(let j in item){
          if(item[j]==''){
            delete item[j]
          }
        }
      })
      // console.log(_this.tableDataDay);
      // console.log(_this.tableDataWeek);
      // console.log(_this.tableDataMonth);
      // console.log(_this.tableDataSeason);
      // console.log(_this.tableDataYear);

      form.dates.push(
        {
          dateType:'日',
          year:_this.form.yearforday,
          date:_this.form.yearforday +'-'+_this.form.date,
          childDate:_this.tableDataDay, 
        },
        {
          dateType:'周',
          date:_this.form.yearforweek,
          childDate:_this.tableDataWeek, 
        },
        {
          dateType:'月',
          date:_this.form.yearformonth,
          childDate:_this.tableDataMonth, 
        },
        {
          dateType:'季',
          date:_this.form.yearforseason,
          childDate:_this.tableDataSeason, 
        },
        {
          dateType:'年',
          date:_this.form.yearforyear,
          childDate:_this.tableDataYear, 
        },
      );
      form.dates = JSON.stringify(form.dates);
      form = JSON.parse(JSON.stringify(form));
      console.log(form);
      _this.$layer.loading({
        shade: true //是否显示遮罩
      });
      statisticsInsertTarget(form).then(function(res) {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status == 0) {
          _this.myAlert("数据保存成功！", "success-icon")
            .then(res => {
              _this.$parent.searchTableData();
              _this.clearFormData();
            })
            .catch(err => {});
        } else if (res.status == 1) {
          let message = res.msg;
          _this.myAlert(message + "！",'dangerous-icon');
        }
      });
    },
    questiondetail(){
      console.log('123');
      let _this = this;
      let layerId = _this.$layer.iframe({
        content: {
          content: questiondetail, //传递的组件对象
          parent: _this, //当前的vue对象
          data: {

          } //props
        },
        area: ["550px", "250px"],
        title: "【设置指标】 说明",
        shadeClose: false,
        shade: true, //是否显示遮罩
        zIndex: 198911100,
        cancel: () => {
          //关闭事件

        }
      });
    },
    //表格选择
    handleSelectionChange(elemCheckbox) {
      let _this = this;
      //获取用户的选中
      if(_this.getActiveName == 'daytime'){
        _this.multipleSelection1 = [];
        elemCheckbox.forEach(item => {
          _this.multipleSelection1.push(item.myid);
        });
        _this.multipleSelection1 = Array.from(new Set(_this.multipleSelection1));
      }else 
      if(_this.getActiveName == 'weektime'){
        _this.multipleSelection2 = [];
        elemCheckbox.forEach(item => {
          _this.multipleSelection2.push(item.myid);
        });
        _this.multipleSelection2 = Array.from(new Set(_this.multipleSelection2));
      }else 
      if(_this.getActiveName == 'monthtime'){
        _this.multipleSelection3 = [];
        elemCheckbox.forEach(item => {
          _this.multipleSelection3.push(item.myid);
        });
        _this.multipleSelection3 = Array.from(new Set(_this.multipleSelection3));
      }else 
      if(_this.getActiveName == 'seasontime'){
        _this.multipleSelection4 = [];
        elemCheckbox.forEach(item => {
          _this.multipleSelection4.push(item.myid);
        });
        _this.multipleSelection4 = Array.from(new Set(_this.multipleSelection4));
      }else 
      if(_this.getActiveName == 'yeartime'){
        _this.multipleSelection5 = [];
        elemCheckbox.forEach(item => {
          _this.multipleSelection5.push(item.myid);
        });
        _this.multipleSelection5 = Array.from(new Set(_this.multipleSelection5));
      }
    },
    week_date(weekstr){
      let _this = this;
      let year = weekstr.split("-")[0]
      let weekNo = weekstr.split("-")[1]
      // 此年1号是星期几
      let oneday = new Date(year+'-01-01').getDay() //0-6
      // 方便计算，当为星期天时为7
      if(oneday==0){
          oneday = 7
      }

      let one_fistday;
      let one_lastday;
      // 如果1号刚好是星期一
      if(oneday == 1){
           one_fistday = year+'-01-01'
           one_lastday = year+'-01-07'
      }else{
          let jj = 8-oneday
           one_fistday = '12.'+(31-oneday+2>9?31-oneday+2:'0'+(31-oneday+2))
           one_lastday = '01.'+(jj>9?jj:'0'+jj)
      }

      let fistday;
      let lastday;
      // 如果刚好是第一周
      if(weekNo ==1){
          fistday = one_fistday
          lastday = one_lastday
      }else{
          fistday = _this.addDate(one_lastday,(weekNo-2)*7+1)
          lastday = _this.addDate(one_lastday,(weekNo-1)*7)
      }
      return fistday+'-'+lastday
    },
    addDate(date,days){ 
      var d=new Date(date); 
      d.setDate(d.getDate()+days); 
      var m=d.getMonth()+1; 
      // return d.getFullYear()+'-'+(m>9?m:'0'+m)+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());
      return (m>9?m:'0'+m)+'.'+(d.getDate()>9?d.getDate():'0'+d.getDate()); 
    },
  },

  mounted() {
    this.setdayfunc();
    console.log(this.myuserType);
  }
};
</script>
<style lang="scss" scoped>
  .list-content{
    height: calc(100% - 48px);
  }
  /deep/ .specialinput input{
    text-align: center;
  }
  /deep/ .specialinput input::-webkit-input-placeholder {
    text-align:center;
  }
  /deep/ .specialinput input::-moz-input-placeholder {
    text-align:center;
  }
  /deep/ .specialinput input::-ms-input-placeholder {
    text-align:center;
  }
  /deep/ .specialinput input{
    border:none !important;
    background: initial;
  }
  /deep/ .specialinput1 input:focus{
    border:1px solid #aaa !important;
    background: #fff;
  }
  /deep/ .specialinput1 input{
    text-align: center;
  }
  /deep/ .specialinput1 input::-webkit-input-placeholder {
    text-align:center;
  }
  /deep/ .specialinput1 input::-moz-input-placeholder {
    text-align:center;
  }
  /deep/ .specialinput1 input::-ms-input-placeholder {
    text-align:center;
  }
  /deep/ .specialinput1 input{
    border:none !important;
    background: initial;
  }
  /deep/ .specialinput input:focus{
    border:1px solid #aaa !important;
    background: #fff;
  }
  /deep/ .ant-table-scroll .el-table .el-table__body-wrapper{
    height: calc(100% - 50px) !important;
  }
  /deep/ .specialinput1{
    line-height: 45px;
  }
  /deep/ .el-tabs--border-card{
    .el-tabs__header {
      .el-tabs__item{
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
    }
  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border-image:url(../../../images/mytabweixuanzhong.png) 0 fill;
    background: none;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border-image:url(../../../images/mytabxuanzhong.png) 0 fill;
    background:  none;
  }
</style>