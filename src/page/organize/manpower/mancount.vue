<template>
  <div class="depart-container mycontailerclass1">
    <div class="top-container " >
      <div class="search-container mycontailerclass2 clear" >
        <div class="item left"  >
          <el-radio   @change="changeModeCompare(1)" v-model="compareType" :label="1">&nbsp;</el-radio>
          <span>现状</span>
        </div>
         <div class="item left"  >
          <el-radio   @change="changeModeCompare(6)" v-model="compareType" :label="6">&nbsp;</el-radio>
          <span>日比</span>
        </div>
        <div class="item left"  >
          <el-radio   @change="changeModeCompare(2)" v-model="compareType" :label="2">&nbsp;</el-radio>
          <span>周比</span>
        </div>
        <div class="item left"  >
          <el-radio   @change="changeModeCompare(3)" v-model="compareType" :label="3">&nbsp;</el-radio>
          <span>月比</span>
        </div>
        <div class="item left"  >
          <el-radio   @change="changeModeCompare(4)" v-model="compareType" :label="4">&nbsp;</el-radio>
          <span>季比</span>
        </div>
        <div class="item left"  >
          <el-radio  @change="changeModeCompare(5)" v-model="compareType" :label="5">&nbsp;</el-radio>
          <span>年比</span>
        </div>

        <div class="item left" >
          <i class="fa cut-icon cut"></i>
        </div>
        <div class="item left" @click="filterData" >
          过滤选中
        </div>
        <div class="item left">
          <i class="one-ten-icon" title="自选列" @click="clickColumn"></i>
        </div>
        <div type="primary" icon="document" class="item left" @click="exportToExcel" >
          <i class="leading-out-icon other" title="导出"></i>
        </div>
        <div class="item left" >
          <div class="record-num" >
            <span><</span>
            <span>{{listnum}}</span>
            <span >/</span>
            <span>{{ptabledata.length}}</span>
            <span>></span>
          </div>
        </div>
        <div class="item left clear"  @click="tabRemove('/home/mancount')">
          <i class="back-icon user left" ></i>
        </div>
      </div>
    </div>
    <div class="top-container1">
      <div class="search-container clear" >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" >
            <div class="left p-l-5" >
              <span class="des-word" >角度</span>
            </div>
            <div class="left p-l-2" >
              <el-form-item  label-width="0">
                <el-select class="left" v-model="angle" style="width: 80px;">
                  <el-option v-for="item in uarr"  :label="item.name" :value="item.name" ></el-option>
                </el-select>
              </el-form-item>  
            </div>
            <div class="left p-l-2" >
              <el-form-item  label-width="0">
                <CheckSelectSpecial   :selectId="dds" :listData="dudp" style="width: 80px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>  
              
          
            

            <div class=" left p-l-5" >
              <i class="search-btn" @click="searchCountData"  >查询</i>
            </div>
            <div class="left"   >
              <i class="claerlys" @click="clearForm"  ></i>
            </div>
          </div>  
        </el-form>
      </div>
    </div>
    <div class="middled">
       <span class="topsa" style="margin-left: 20px;color: #828382;">留存</span>
       <div class="left"style="border: 1px solid #828382;border-radius:2px;width: 180px;height: 60px">
             <div class="kuai">信息留存</div>
             <div class="kuai">一般储存</div>
             <div class="kuai">优质储存</div>
             <span v-if="xinxi==0" class="kuai" style="margin-left: 30px">{{xinxi}}</span>
             <span v-if="xinxi!=0" class="kuai" style="margin-left: 30px;color:#336699;cursor:pointer;" @click="jump('信息留存')">{{xinxi}}</span>
             <span v-if="yiban==0"class="kuai" style="margin-left: 50px">{{yiban}}</span>
             <span v-if="yiban!=0"class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;"@click="jump('一般储存')">{{yiban}}</span>
             <span v-if="youzhi==0"class="kuai" style="margin-left: 50px">{{youzhi}}</span>
             <span v-if="youzhi!=0"class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('优质储存')">{{youzhi}}</span>
       </div>
      <span class="topsa" style="margin-left: 40px;color: #828382;">首面</span>
      <div class="left" style="border: 1px solid #828382;border-radius:2px;width: 180px;height: 60px;margin-left: 20px">
        <div class="kuai">我方待确</div>
        <div class="kuai">对方待确</div>
        <div class="kuai">首面已约</div>
        <span v-if="swofang==0" class="kuai" style="margin-left: 30px">{{swofang}}</span>
        <span v-if="swofang!=0" class="kuai" style="margin-left: 30px;color:#336699;cursor:pointer;" @click="jump('首面我方待确')">{{swofang}}</span>
        <span v-if="sduifang==0" class="kuai" style="margin-left: 50px">{{sduifang}}</span>
        <span v-if="sduifang!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('首面对方待确')">{{sduifang}}</span>
        <span v-if="syiyue==0" class="kuai" style="margin-left: 50px">{{syiyue}}</span>
        <span v-if="syiyue!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('首面已经约定')">{{syiyue}}</span>
      </div>
      <span class="topsa" style="margin-left: 40px;color: #828382;">复面</span>
      <div class="left" style="border: 1px solid #828382;border-radius:2px;width: 180px;height: 60px;margin-left: 20px">
        <div class="kuai">我方待确</div>
        <div class="kuai">对方待确</div>
        <div class="kuai">复面已约</div>
        <span v-if="fwofang==0" class="kuai" style="margin-left: 30px">{{fwofang}}</span>
        <span v-if="fwofang!=0" class="kuai" style="margin-left: 30px;color:#336699;cursor:pointer;" @click="jump('复面我方待确')">{{fwofang}}</span>
        <span v-if="fduifang==0" class="kuai" style="margin-left: 50px">{{fduifang}}</span>
        <span v-if="fduifang!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('复面对方待确')">{{fduifang}}</span>
        <span v-if="fyiyue==0" class="kuai" style="margin-left: 50px">{{fyiyue}}</span>
        <span v-if="fyiyue!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('复面已经约定')">{{fyiyue}}</span>
      </div>
      <span class="topsa" style="margin-left: 40px;color: #828382;">意向</span>
      <div class="left" style="border: 1px solid #828382;border-radius:2px;width: 180px;height: 60px;margin-left: 20px">
        <div class="kuai">我方待确</div>
        <div class="kuai">对方待确</div>
        <div class="kuai">意向入职</div>
        <span v-if="yxwofang==0" class="kuai" style="margin-left: 30px">{{yxwofang}}</span>
        <span v-if="yxwofang!=0" class="kuai" style="margin-left: 30px;color:#336699;cursor:pointer;cursor:pointer;" @click="jump('我方待确意向')">{{yxwofang}}</span>
        <span v-if="yxduifang==0" class="kuai" style="margin-left: 50px">{{yxduifang}}</span>
        <span v-if="yxduifang!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('对方待确意向')">{{yxduifang}}</span>
        <span v-if="yxruzhi==0" class="kuai" style="margin-left: 50px">{{yxruzhi}}</span>
        <span v-if="yxruzhi!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('意向入职约定')">{{yxruzhi}}</span>
      </div>
      <span class="topsa" style="margin-left: 40px;color: #828382;">在职</span>
      <div class="left" style="border: 1px solid #828382;border-radius:2px;width: 240px;height: 60px;margin-left: 20px">
        <div class="kuai">常态在职</div>
        <div class="kuai">薪假在职</div>
        <div class="kuai">停薪在职</div>
        <div class="kuai">申离在职</div>
        <span v-if="ctzaizhi==0" class="kuai" style="margin-left: 30px">{{ctzaizhi}}</span>
        <span v-if="ctzaizhi!=0" class="kuai" style="margin-left: 30px;color:#336699;cursor:pointer;" @click="jump('常态在职')">{{ctzaizhi}}</span>
        <span v-if="xjzaizhi==0" class="kuai" style="margin-left: 50px">{{xjzaizhi}}</span>
        <span v-if="xjzaizhi!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('薪假在职')">{{xjzaizhi}}</span>
        <span v-if="txzaizhi==0" class="kuai" style="margin-left: 50px">{{txzaizhi}}</span>
        <span v-if="txzaizhi!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('停薪在职')">{{txzaizhi}}</span>
        <span v-if="slzaizhi==0" class="kuai" style="margin-left: 50px">{{slzaizhi}}</span>
        <span v-if="slzaizhi!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('申离在职')">{{slzaizhi}}</span>
      </div>
      <span class="topsa" style="margin-left: 40px;color: #828382;">离职</span>
      <div class="left" style="border: 1px solid #828382;border-radius:2px;width:240px;height: 60px;margin-left: 20px">
        <div class="kuai">正式离职</div>
        <div class="kuai" style="margin-left: 30px">强制</div>
        <div class="kuai" style="margin-left: 30px">未办</div>
        <div class="kuai" style="margin-left: 30px">黑名</div>
        <span v-if="zslizhi==0" class="kuai" style="margin-left: 30px">{{zslizhi}}</span>
        <span v-if="zslizhi!=0" class="kuai" style="margin-left: 30px;color:#336699;cursor:pointer;" @click="jump('正式离职')">{{zslizhi}}</span>
        <span v-if="qz==0" class="kuai" style="margin-left: 50px">{{qz}}</span>
        <span v-if="qz!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('强制')">{{qz}}</span>
        <span v-if="wb==0" class="kuai" style="margin-left: 50px">{{wb}}</span>
        <span v-if="wb!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('未办')">{{wb}}</span>
        <span v-if="hm==0" class="kuai" style="margin-left: 50px">{{hm}}</span>
        <span v-if="hm!=0" class="kuai" style="margin-left: 50px;color:#336699;cursor:pointer;" @click="jump('黑名')">{{hm}}</span>
      </div>
    </div>
    <div class="depart-content clear list-content list-container" >
      <div class="right-list-content left" >
        <PlTable

          :datas="ptabledata"
          :pagination-show="false"

          empty-text=" "
          border
          height="100%"
          @header-click="selectionChange"
          @selection-change="gettableData"
          @row-click="countDetil"
          :row-class-name="tableRowClassName"
          :row-height="rowHeight"
        >

          <template v-show="item.show" v-for="(item,index) in columnData" >
            <PlTableColumn
              v-if="item.prop == 'check'"
              :prop="item.prop"
              :label="item.label"
              width="30"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"

              :align="item.align"
            >


            </PlTableColumn>
            <PlTableColumn
              v-else-if="item.prop =='name'"
              :render-header="renderHeader"
              :prop="item.prop"
              :label="item.label"
              width="120"
              :align="item.align"
              :show="item.show"

              :show-overflow-tooltip="true"
            >
             <template slot-scope="scope">
              <div  v-if="scope.row.state=='常态'">
                {{ scope.row.name }}
              </div>
              <div  v-if="scope.row.state=='关闭'" style="color:#999" >
                {{ scope.row.name }}
              </div>
            </template>
            </PlTableColumn>
            <PlTableColumn
              v-else
              :render-header="renderHeader"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              :show="item.show"
              :fixed="item.fixed"
              :show-overflow-tooltip="true"
            >
              <template v-for="item1 in item.child" >
                <PlTableColumn
                    
                    :label="item1.label"
                    :prop='item1.prop'
                    :width='item1.width'
                    :sortable="item1.sortable"
                    :align="item1.align"
                    >
                     <template slot-scope="scope">
                      <div   style="color:#336699;text-algin:center;cursor:pointer;" @click="runs(scope.$index, scope.row,item1.prop)" >
                        {{ scope.row[item1.prop] }}
                      </div>
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
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {userCount} from '../../../service/organizeDate'
  import { PlTable, PlTableColumn } from 'pl-table';
  import {dutytree,} from '../../../service/organizeDate'
  import {departparam} from '../../../service/getdepartData'
  import ColumPage from '../../../components/column'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name: 'mancount',
    components: {
      CheckSelectSpecial,PlTable,PlTableColumn,ColumPage
    },
    data(){
      return{
        multipleSelection:[],
        listnum:0,
        culumnTitle:'人力统计',
        sessionStr:'mancount-list',
        columnValue:false,
        ptabledata:[],
        columnData:[],
        rowHeight:27,
        tt:"",
        xinxi:0,
        yiban:0,
        youzhi:0,
        swofang:0,
        sduifang:0,
        syiyue:0,
        fwofang:0,
        fduifang:0,
        fyiyue:0,
        yxwofang:0,
        yxduifang:0,
        yxruzhi:0,
        ctzaizhi:0,
        xjzaizhi:0,
        txzaizhi:0,
        slzaizhi:0,
        zslizhi:0,
        qz:0,
        wb:0,
        hm:0,
        compareType:1,
        form:{

        },
        timetype:[
        {
          id:1,
          name:"全部",
          value:-1
        },{
          id:2,
          name:"今天",
          value:2
        },{
          id:3,
          name:"昨天",
          value:3
        },{
          id:4,
          name:"本周",
          value:9
        },{
          id:5,
          name:"本月",
          value:10
        },{
          id:6,
          name:"上月",
          value:11
        },{
          id:7,
          name:"3天",
          value:12
        },{
          id:8,
          name:"7天",
          value:13
        },{
          id:9,
          name:"10天",
          value:14
        },{
          id:10,
          name:"30天",
          value:1
        },{
          id:11,
          name:"100天",
          value:1
        },{
          id:12,
          name:"自定义",
          value:1
        },{
          id:13,
          name:"6个月",
          value:1
        },],
        starttime:"",
        endtime:"",
        uarr:[{
          id:1,
          name:"部门",

        },{
          id:2,
          name:"职位",

        },],
        angle:"部门",
        dds:"dds",
        dudp:[]
      }
    },
    mounted(){
      this.initManpowerData(true);
      // this.dedu();

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
   methods: {
     selectionChange(){

     },
     //导出
     exportToExcel () {
       // excel数据导出
       require.ensure([], () => {
         const {
           // eslint-disable-next-line camelcase
           export_json_to_excel
         } = require('../../../assets/js/Export2Excel.js')
         const tHeader = ['部门',  '常态在职',
           '薪假在职', '停薪在职', '申离在职', '正式离职', '强制', '未办', '黑名', '我方待确意向', '对方待确意向',
           '意向入职约定', '复面我方待确', '复面对方待确', '复面已经约定', '首面我方待确', '首面对方待确', '首面已经约定', '信息留存', '一般储存','优质储存']
         const filterVal = ['name','常态在职',
           '薪假在职', '停薪在职', '申离在职', '正式离职', '强制', '未办', '黑名', '我方待确意向', '对方待确意向',
           '意向入职约定', '复面我方待确', '复面对方待确', '复面已经约定', '首面我方待确', '首面对方待确', '首面已经约定', '信息留存', '一般储存','优质储存']
         const list = this.ptabledata
         const data = this.formatJson(filterVal, list)
         export_json_to_excel(tHeader, data, '列表excel')
       })
     },
     formatJson (filterVal, jsonData) {
       return jsonData.map(v => filterVal.map(j => v[j]))
     },
     clickColumn(){
      let _this = this;
      let mycolumnData = [];
      _this.columnData.forEach(item=>{
        if(item.prop!='name'){
          item.label = item.prop;
        }
      })
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
       let column = null
       if(storageColumn){
         column = storageColumn.column;
         this.rowHeight = storageColumn.height*1;
       }else{
         column = columnData;
       }
       let count = '';
       column.forEach(function(item,index){
         if(item.fixed && item.fixed != 'false'){
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
       this.$nextTick(function () {
         this.columnData = column;
       })
     },
     changeModeCompare(i){
       let timetype=this.tt
       let starttime=this.starttime
       let endtime=this.endtime
       let angle=this.angle
       if(i==1){
         this.$router.push({path:'/home/mancount',query:{timetype:timetype,starttime:starttime,endtime:endtime,angle:angle}});
       }
       if(i==2){
         this.$router.push({path:'/home/weekcompare',query:{timetype:timetype,starttime:starttime,endtime:endtime,angle:angle}});
       }
       if(i==3){
         this.$router.push({path:'/home/monthcompare',query:{timetype:timetype,starttime:starttime,endtime:endtime,angle:angle}});
       }
       if(i==4){
         this.$router.push({path:'/home/seasoncompare',query:{timetype:timetype,starttime:starttime,endtime:endtime,angle:angle}});
       }
       if(i==5){
         this.$router.push({path:'/home/yearcompare',query:{timetype:timetype,starttime:starttime,endtime:endtime,angle:angle}});
       }

     },
     initManpowerData (init) {
       let _this = this
       let angle = 1;
       let ids = -1;
       let type = "现状";
       let form = {
         angle, ids, type
       }
       userCount(form).then(function (res) {
         let totalData = res.data.aldate; 
         let first=res.data.total
         if(first.信息留存人员){
           _this.xinxi=first.信息留存人员
         }
         if(first.对方待确意向){
           _this.yxduifang=first.对方待确意向
         }
         if(first.常态在职){
          _this.ctzaizhi=first.常态在职
         }
         if(first.正式离职){
           _this.zslizhi=first.正式离职
         }
         if(first.首面已经约定){
           _this.syiyue=first.首面已经约定
         }
         if(first.一般存储人员){
           _this.yiban=first.一般存储人员
         }
         if(first.优质存储人员){
           _this.youzhi=first.优质存储人员
         }
         if(first.停薪在职){
           _this.txzaizhi=first.停薪在职
         }
         if(first.复面已经约定){
           _this.fyiyue=first.复面已经约定
         }
         if(first.复面我方待确){
           _this.fwofang=first.复面我方待确
         }
         if(first.意向入职约定){
           _this.yxruzhi=first.意向入职约定
         }
         if(first.我方待确意向){
           _this.yxwofang=first.我方待确意向
         }
         if(first.正式离职){
           _this.zslizhi=first.正式离职
         }
         if(first.正式离职强制){
           _this.qz=first.正式离职强制
         }
         if(first.正式离职未办){
           _this.wb=first.正式离职未办
         }
         if(first.正式离职黑名){
           _this.hm=first.正式离职黑名
         }
         if(first.申离在职){
           _this.slzaizhi=first.申离在职
         }
         if(first.薪假在职){
           _this.xjzaizhi=first.薪假在职
         }
         if(first.首面对方待确){
           _this.sduifang=first.首面对方待确
         }
         if(first.首面我方待确){
           _this.swofang=first.首面我方待确
         }
         if(first.黑名){
           _this.hm=first.黑名
         }
         if(first.未办){
           _this.wb=first.未办
         }
         let titles = res.data.titles;
         _this.setColumnData(titles,totalData);
         _this.ptabledata=res.data.list;
        
         if(init){
           _this.reloadListByStorage();
         }
       })
     },
     setColumnData(titles,totalData){
      if(titles && titles.length != 0){
        let angle =this.angle;
       
        titles.forEach((item,index) => {
          if(index != 0){
            let label = totalData[item.prop];
            if(!label){
              label = '';
            }else{
              label = ""+label;
            }
            if(item.show =='true'){
              item.show = true;
            }else{
              item.show = false;
            }
            item.child = [
                {
                  id:202007+index,
                  type:'',
                  width:'60',
                  ref:'',
                  prop:item.prop,
                  label:label,
                  align:'center',
                  sortable:true,
                  show:true,
                  fixed:false
              }
            ]
          }else{
            if(angle == '部门'){
              item.label = '部门';
            }else{
              item.label = '职位';
            }
          }
        })
      }
      
      this.columnData = [{
        id:"2019121901",
        type:'selection',
        width:'30',
        ref:'multipleTable',
        prop:'check',
        sortable:false,
        show:true,
        fixed:false,
        align:'center',
      }].concat(titles);
     },
     //表头处理
     renderHeader (h, {column, $index}, index) {
       if(column.label){
         let ss=column.label.split("<br/>")
         if(ss && ss.length >=2) {
           return h('span', {}, [
             h('span', {}, ss[0]),
             h('br', {},),
             h('span', {
               left: 60
             }, ss[1])
           ])
         }else{
           return ss.toString()
         }
       }else{
           return ss.toString();
       }

     },
     //qingchu
     clearForm(){
       this.angle="部门"
       this.starttime=""
       this.endtime=""

       for(var i=0;this.dudp.length>i;i++){
         if(i!=0){
           this.dudp[i].select==false
         }
         this.dudp[0].select==true
       }
     },
     //查询
     searchCountData(){
       let _this = this
       let angle =this.angle;
       this.listnum = 0;
       if(angle=="部门"){
         angle=1;
         
       }
       if(angle=="职位"){
         angle=2;
       }
       let ids = []
       for(var i=0;this.dudp.length>i;i++){
         if(this.dudp[i].select==true){
           ids.push(this.dudp[i].id)
         }
       }
       ids=ids.toString()
       let timeStart =this.starttime
       let timeEnd = this.endtime
       let type = "现状";
       let form = {
         angle, ids, timeStart, timeEnd, type
       }
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
       userCount(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let totalData = response.data.aldate; 
            let titles = response.data.titles;
            _this.setColumnData(titles,totalData);
            _this.ptabledata=response.data.list;
            _this.reloadListByStorage();
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        
         
       })
     },
     //top跳转
      jump(i){
        this.$router.push({path: '/home/manpowerlist', query: {ss: -1,ee:i}})
      },
     //跳转
     runs(i,ss,ee){
       this.$router.push({path: '/home/manpowerlist', query: {ss: ss,ee:ee}})
     },
    
     //获取下标
     countDetil(row, column, event){
       let _this = this
       _this.listnum =row.index + 1
     },
     tableRowClassName ({row, rowIndex}) {
       // 把每一行的索引放进row
       row.index = rowIndex
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
     //过滤选择
     gettableData(val){
       let _this = this;
       //获取用户的选中
       _this.multipleSelection = []
       val.forEach(item => {
         _this.multipleSelection.push(item.id);
       });
       _this.multipleSelection = Array.from(new Set(_this.multipleSelection));

     },
     //过滤方法
     filterData(){

       let select = this.multipleSelection.toString();
       if(select){
         let arr = [];
         this.ptabledata.forEach(function(item){
           if(select.indexOf(item.id) != -1){
             arr.push(item);
           }
         })
         this.listnum = 0;
         this.ptabledata = arr;
       }else{
        this.myAlert('请选择需要过滤的数据!','dangerous-icon');
       }
     },
   }
  }
</script>


<style lang="scss" scoped>
  .mt{
    margin-bottom: 5px;
    margin-top: 5px;
  }
  /deep/.right-list-content .el-table, .right-list-content .el-table__expanded-cell {
    background-color: #DCD9D3!important;
  }
  /deep/.ant-table-scroll {
    max-height: 100%;
  }
  /deep/ .list-content .el-table .el-table__body-wrapper {
    height: calc(100vh - 290px) !important;
  }
  .middled{
    width: 100%;
    height: 70px;
    margin: 10px 0 0 10px;
  }
  .kuai{
    float: left;
    margin-top: 6px;
    margin-left: 8px;
    color: #828382;

  }
  .topsa{
    background-color:#DCD9D3;
    margin-top:-8px;
    position: absolute
  }

  /deep/.list-content .el-table th .cell .el-checkbox__input .el-checkbox__inner::after {
    border-color: #000;
    border-width: 0px 1px 1px 0px !important;
    background: #DCD9D3;
    -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
  }
  .content{
    height: calc(100% - 150px);
    width:100%;
    .list-content{
      width: calc(100% - 20px);
      height:100%;
      margin: 10px auto 0px;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      border-radius:5px;
    }
  }
  .search-container {
    width: calc(100% - 20px);
    
    .item{
      line-height:20px;
      padding-left:15px;
      cursor:pointer;
      span{
        line-height:20px;
      }
      
      .cut-icon {
        background: url(../../../images/system/fenge.png) -100px -90px;
        width: 3px;
        height: 23px;
        display: block;
      }
      
      .zixuanlie-icon{
        background:url(../../../images/qiet.png) -125px -120px;
        width:20px;
        height:20px;
        display:inline-block;
      }
      
      .leading-out-icon{
        background:url(../../../images/system/daochu.png) -15px -15px;
        width:20px;
        height:20px;
        display:inline-block;
      }
      
      .back-icon{
        background:url(../../../images/system/tuichu.png) -15px -15px;
        width:20px;
        height:20px;
        display:inline-block;
      }
      
    }
  }
  /deep/.el-table thead {
    color: black;

  }
  /deep/ .el-tree-node__label {
    font-size: 12px;
  }
  /deep/.el-radio{
    margin-right: 0px;
  }
  .right-list-content .el-table, .right-list-content .el-table__expanded-cell {
    background-color: #DCD9D3;
  }
  .serc{

    border-width: 1px;
    border-style: solid;
    border-color: rgb(174, 174, 174);
    border-radius: 5px;
  }
  .el-tree{
    min-width: 100%;
    display: inline-block;
  }
  
  .depart-content{
    width: calc(100% - 20px);
    margin: 0px auto 0px;
    height:calc(100% - 55px);
    .left-tree-content{
      width:150px;
      height:100%;
      margin-right:10px;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      border-radius:5px;
      background:#fff;
      overflow:auto;
    }
    .right-list-content{
      width:100%;
      height:calc(100% - 130px);
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      background-color: #DCD9D3;
    }
  }  
  .border-black{
    border:1px solid #6B6B6B;
    border-radius:5px;
  }

  .border-white{
    border:1px solid #fff;
    border-radius:5px;
  }

</style>
