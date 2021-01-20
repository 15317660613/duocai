<template>
  <div style="width:100%;" >
    <div class="pop-up-container clear" >
      <div class="left list-container list-content" style="height:428px;" >
        <div class="list-table" id="editorSchoolList" style="height:402px;margin:5px;" >
          <el-table
            :data="desform.tableDatas"
            highlight-current
            empty-text=" "
            ref="multipleTable"
            @header-click="head"
            height="398"
            border
            :cell-style="cellStyle"
             highlight-current
          >
            <el-table-column
              prop="label"
              label="部门"
              align='center'
              width="165">
              <template slot-scope="scope">
                <div @click="checkDepartCheck(scope.row)">
                  <span style="float: left;display: inline-block;max-width: 100px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{scope.row.label}}</span>
                  <span style="color: #999;float: right;">({{scope.row.level}}级部门)</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column

              prop="showHouse"
              label="查看 房源"
              :render-header="renderHeader"
              width="60"
              align='center'
            >
              <template slot-scope="scope">
                <div  style="margin-left: -5px">
                  <!-- <input v-if="scope.row.showHouse==0" type="checkbox" :checked="false"  />
                  <input v-if="scope.row.showHouse==1" type="checkbox" :checked="true"  /> -->
                  <el-checkbox v-model="scope.row.showHouse" type="checkbox" :false-label="0" :true-label="1" ></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column

              prop="showCustomer"
              label="查看 客源"
              :render-header="renderHeader"
              width="60"
              align='center'
            >
              <template slot-scope="scope">
                <div style="margin-left: -5px" >
                 <!--  <input v-if="scope.row.showCustomer==0" type="checkbox" :checked="false"  />
                  <input v-if="scope.row.showCustomer==1" type="checkbox" :checked="true"  /> -->
                  <el-checkbox v-model="scope.row.showCustomer" type="checkbox" :false-label="0" :true-label="1" ></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column

              prop="publicLandlord"
              label="公盘看业主"
              :render-header="renderHeader"
              width="60"
              align='center'
            >
              <template slot-scope="scope">
                <div  >
                  <!-- <input v-if="scope.row.publicLandlord==0" type="checkbox" :checked="false"  />
                  <input v-if="scope.row.publicLandlord==1" type="checkbox" :checked="true"  /> -->
                  <el-checkbox v-model="scope.row.publicLandlord" type="checkbox" :false-label="0" :true-label="1" ></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column

              prop="privateLandlord"
              label="私盘看业主"
              :render-header="renderHeader"
              width="60"
              align='center'
            >
              <template slot-scope="scope">
                <div style="margin-left: -5px" >
                  <!-- <input v-if="scope.row.privateLandlord==0" type="checkbox" :checked="false"  />
                  <input v-if="scope.row.privateLandlord==1" type="checkbox" :checked="true"  /> -->
                  <el-checkbox v-model="scope.row.privateLandlord" type="checkbox" :false-label="0" :true-label="1" ></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column

              prop="houseFollow"
              label="房源看跟进"
              :render-header="renderHeader"
              width="60"
              align='center'
            >
              <template slot-scope="scope">
                <div  >
                  <!-- <input v-if="scope.row.houseFollow==0" type="checkbox" :checked="false"  />
                  <input v-if="scope.row.houseFollow==1" type="checkbox" :checked="true"  /> -->
                  <el-checkbox v-model="scope.row.houseFollow" type="checkbox" :false-label="0" :true-label="1" ></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column

              prop="customerFollow"
              label="客源看跟进"
              :render-header="renderHeader"
              width="60"
              align='center'
            >
              <template slot-scope="scope">
                <div  >
                  <!-- <input v-if="scope.row.customerFollow==0" type="checkbox" :checked="false"  />
                  <input v-if="scope.row.customerFollow==1" type="checkbox" :checked="true"  /> -->
                  <el-checkbox v-model="scope.row.customerFollow" type="checkbox" :false-label="0" :true-label="1" ></el-checkbox>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--<div class="clear left" >
        <el-form ref="formsData"  :model="desform" >
          <div class="clear " style="margin-top: 82px;">
            <div class="left" >
              <el-form-item>
                <el-input  v-model="desform.ces" title="查询部门" style="width: 80px;" ></el-input>
              </el-form-item>
            </div>
            <div @click="chde" class="left che" style="margin-top:4px;" >
              <span>查</span>
            </div>
          </div>
          <div class="clear" style="margin-top: 10px;">
            <div class="left" >
              <el-form-item  prop="ern" >
                <el-select v-model="desform.cek" class=" flst" style="width: 80px">
                  <el-option  :value="na.value" :label="na.name" v-for="na in desform.oop" ></el-option>
                </el-select>
              </el-form-item>
            </div>    
            <div class=" che left" @click="cha" style="margin-top:4px;" >
              <span>查</span>
            </div>
          </div>
          <div class=" " @click="childcopy" style="margin-top: 10px;height:22px;width: 108px;text-align: center;border: 1px solid #797979;cursor:pointer">
            <span style="">复制到单部门</span>
          </div>
        </el-form>  
      </div>  
      -->
    </div>
    <!-- <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
      <span class="right save-cancel-btn" style="margin-right:0px;" @click="close" >取 消</span>
      <span class="right save-cancel-btn" type="primary" @click="save"  >保 存</span>
    </div> -->

    <div class="component-container" >
      <copydepart ref="copydepart"></copydepart>
    </div>
  </div>
</template>

<script>
  import copydepart from "./copydepart"
  import {stration} from '../../../service/getdepartData'
  export default {
    props:["editorBuilding","departid","dform"],
    data(){
      return{
        desform:this.dform,
        check:1,
        check1:1,
      }
    },
    components: {
      copydepart
    },
    name: 'detailtwo',
    methods:{
      //表头格式
      renderHeader(h, {column}) {
        let header = column.label.substr(0,2);
        let headers = column.label.substr(2);
        return [h('p', [
          h('p', {}, header),
          h('span', {}, headers)
        ])];
      },
      cellStyle({row, column, rowIndex, columnIndex}){
       
        if(column.property == 'label'){
          return {'border-right':'1px solid #797979 !important'};
        }
        if(column.property == 'showCustomer'){
          return {'border-right':'1px solid #008000 !important'};
        }

        if(column.property == 'privateLandlord'){
          return {'border-right':'1px solid #008000 !important'};
        }
      },
      childcopy(){
        this.$refs.copydepart.showcopy()
      },
      //点击表头
      head(sa,ba){
        let index=ba.currentTarget.cellIndex
        let check = this.check;
        if(check == 1){
          this.check = 0;
          this.$emit('gouchoose',index,0);
        }else{
          this.check = 1;
          this.$emit('gouchoose',index,1);
        }
        
      },
      checkDepartCheck(elem){
        let check = this.check1;
        if(check == 1){
          this.check1 = 0;
          elem.showHouse = 0;
          elem.showCustomer = 0;
          elem.publicLandlord = 0;
          elem.privateLandlord = 0;
          elem.houseFollow = 0;
          elem.customerFollow = 0;
        }else{
          this.check1 = 1;
          elem.showHouse = 1;
          elem.showCustomer = 1;
          elem.publicLandlord =1;
          elem.privateLandlord =1;
          elem.houseFollow = 1;
          elem.customerFollow = 1;
        }
      },
      //查列
      cha(){
        this.$emit('surch')
      },
      //
      chde(){
        this.$emit('surde')
      },
      //保存
      save(){
        this.$emit('updates')
      },
      //关闭
      close(){
        this.$emit('closeDialog');
      },
      changefunc(value){
        console.log(value);
      }
    }
  }
</script>

<style scoped>
  .down-page-icon{
    background:url(../../../images/icon.png) -81px -118px;
    width:17px;
    height:17px;
    display:block;
    cursor:pointer;
  }
  .up-page-icon{
    background:url(../../../images/icon.png) -105px -120px;
    width:17px;
    height:17px;
    display:block;
    cursor:pointer;
  }
  .list-table{
    border-width:2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  /deep/#tsq .el-table__header-wrapper, .el-table__body-wrapper {
    background-color:white!important;
  }
  /deep/#tsq .el-table__empty-block{
    background-color:white!important;
  }
  /deep/#tsq  .is-scrolling-none{
    background-color:white!important;
  }
  .flst{
    float: left;
  }
  .clears{
    clear: both;
  }
  /deep/.el-table .cell {
    white-space: pre-line;
  }
  span{
    font-family: '微软雅黑';
    font-size: 12px;
  }
  
  
  .che{
    width: 30px;
    height: 20px;
    background-color: rgba(204, 204, 204, 1);
    text-align: center;
    border: 1px solid #797979;
  }
</style>
