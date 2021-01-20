<template>
  <div class="" style="width:calc(100% - 20px);margin:0 10px;" >
    <div class="pop-up" >
      <el-form ref="formsData" :model="form">
        <el-form ref="formsData"  :model="form">
          <div class="pop-up-container padding-tb-5 clear margin-b-10" style="position:relative;z-index:10" >

            <div class="clear left padding-r-10" >
              <div class="left padding-r-5" >
                <div class="word-1 " >
                  楼盘
                </div>
                <div>
                  <el-form-item prop="villageId"  label-width="15px" >
                    <el-select v-model="form.villageId" disabled      style="width:100px;" >
                      <el-option v-for="item in villageParam"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="left padding-r-5" >
                <div class="word-1">
                  栋座
                </div>
                <div>
                  <el-form-item   >
                    <el-select v-model="form.villageSeatId" disabled      style="width:100px;" >
                      <el-option v-for="item in seatParam"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="left padding-r-5" style="position:relative;" >
                <div class="word-1" >
                  单元
                  </div>
                <div>
                  <el-form-item   >
                    <el-select v-model="form.unit" @change="changeUnit"      style="width:100px;" >
                      <el-option v-for="item in units"  :label="item.unit" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>

              </div>
              <div class="left padding-r-5" >
                <div class="word-1" >
                  楼层
                </div>
                <div>
                  <el-form-item   >
                    <el-select  v-model="form.building" disabled      style="width:100px;" >
                      <el-option label="楼层" value="楼层"></el-option>
                    </el-select>
                  </el-form-item>
                </div>


              </div>
              <div class="left" >
                <div class="word-1" >
                  房号规则
                </div>
                <div>
                  <el-form-item prop="rule" >
                    <el-select v-model="form.rule" @change="changeGetRule"      style="width:100px;" >
                      <el-option label="平层号" value="1"></el-option>
                      <el-option label="（楼层-1)X户数+平层" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </div>

              </div>
              <div class="left" style="padding-top:16px;" >
                <el-form-item >
                  <el-input v-model="form.doorNumber" disabled maxlength="5"   autocomplete="off" style="width:50px;" ></el-input>
                </el-form-item>
              </div>
              <div class="left" style="padding:22px 0 0 10px;" >
                {{unitName}}已有{{roomNumber}}个房号
              </div>
            </div>
            <div style="z-index:12;position:absolute;left:240px;top:65px;z-index:10px;color:#800000;" >
              <span>当前“设置房号”和“已有房号”共有【{{repeatCount}}】个重复房号</span>
            </div>
          </div>
        </el-form>
        <div class="list-content clear margin-b-10" >
          <el-tabs type="border-card" v-model="activeName" @tab-click="changeTab" >
            <el-tab-pane label="房号设置" name="throught" >
              <span slot="label">房号设置</span>
              <BatchHouserList2Page @setDoorNum="setDoorNum" @setRepeatCount="setRepeatCount" ref="housePage2"  ></BatchHouserList2Page>
            </el-tab-pane>
            <el-tab-pane label="已有房号" name="list" >
              <span slot="label">已有房号</span>
              <BatchHouserList3Page ref="housePage3"  ></BatchHouserList3Page>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {findSeatHouseNum} from '../../../service/newHouse'
  import BatchHouserList2Page from './batchHouserList2'
  import BatchHouserList3Page from './batchHouserList3'
  export default {
    props:["batchHouseNumValue","clickColumnId","name","unitId"],
    data() {
      return {
        dialogBatchHouseNum:this.batchHouseNumValue,
        textarea2:"",
        input:"",
        villageParam:[],
        seatParam:[],
        units:[],
        seatId:'',
        orientationParams:[],
        pliesNumber:0,
        doorNumber:0,
        butDisabled:true,
        repestButDisabled:true,
        activeName:'throught',
        villageName:'',
        seatName:'',
        unitName:'',
        ruleName:1,
        roomNumber:0,
        parentTableData:[],
        parentTableData1:[],
        floorMin:'',
        floorMax:'',
        repeatCount:'0',
        form: {
          name: '',
          check:0,
          villageId:'',
          villageSeatId:'',
          unit:'',
          showAll:0,
          rule:'1',
          building:'楼层',
          doorNumber:'',
        },
        formLabelWidth: '100px'
      };
    },
    components:{
      BatchHouserList2Page,
      BatchHouserList3Page
    },
    methods:{
      

      changeTab(tab){
        let _this = this;
        let label = tab.label;
        if(label == "已有房号"){
          _this.butDisabled = true;
          _this.repestButDisabled = false;

          let obj = {
            doorNumber:_this.form.doorNumber,
            rule:_this.form.rule,
            villageName: _this.villageName,
            seatName: _this.seatName,
            unitName: _this.unitName,
            villageId: _this.form.villageId,
            villageSeatId: _this.form.villageSeatId,
            unit: _this.form.unit,
          }
          _this.$refs["housePage3"].setParamData(obj);
        }else if(label == "房号设置"){

        }
      },
      setDoorNum(doorNum){
        this.form.doorNumber = doorNum+1;
      },
      changeUnit(value){
        let _this = this;
        let obj = {};
        obj = this.units.find((item)=>{
          return item.id === value;
        });
        let name = obj.unit;
        _this.myConfirm("是否切换单元?", 'question-icon','是','否','','my-message').then(res => {
          _this.unitName = name;
          let seatId = _this.form.villageSeatId;
          _this.getEditorData(seatId);
        }).catch(err => {

        })

      },
      changeGetRule(value){
        let _this = this;
        let rule = this.form.rule;
         _this.$refs["housePage2"].setChangeRule(rule);
      },

      getEditorData(seatId){
        var _this = this;
        let showAll = 0;
        let unitId = '';
        
        if(_this.form.unit){
          unitId = _this.form.unit;
        }
        findSeatHouseNum(seatId,showAll,unitId).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data =response.data;
            let arr1 = [{
              id:data.villageId,
              name:data.villageName
            }];
            let arr2 = [{
              id:data.villageSeatId,
              name:data.seatName
            }];

            _this.villageName = data.villageName;
            _this.seatName = data.seatName;
            _this.villageParam = arr1;
            _this.seatParam = arr2;
            _this.form.villageId = data.villageId;
            _this.form.villageSeatId = data.villageSeatId;
            _this.units = data.units;
            let units = data.units;
            if(units && units.length != 0 ){
              if(!_this.form.unit) {

                _this.form.unit = units[0].id;
                _this.unitName = units[0].unit;
                _this.floorMin = units[0].floorMin;
                _this.floorMax = units[0].floorMax;

              }else{
                units.forEach(function(item){
                  if(item.id == _this.form.unit){
                    _this.unitName = item.unit;
                    _this.floorMin = item.floorMin;
                    _this.floorMax = item.floorMax;
                  }
                })
              }
            }
            _this.form.doorNumber = data.doorNumber;
            _this.roomNumber = data.roomNumber;
            let obj = {
              rule:_this.form.rule,
              doorNumber:_this.form.doorNumber,
              villageName:_this.villageName,
              villageSeatName:_this.seatName,
              villageUnitName:_this.unitName,
              unitId: _this.form.unit,
              projectId:_this.form.villageId,
              buildingsId:_this.form.villageSeatId,
              villageSeatId:_this.form.villageSeatId,
              unit: _this.form.unit,
              floorMin:_this.floorMin,
              floorMax:_this.floorMax,
            };
           
            _this.$refs["housePage3"].setParamData(obj);
            _this.$refs["housePage2"].setUnitData(obj);
          }

        })
      },
      setRepeatCount(repeatCount){
        this.repeatCount = repeatCount;
      },
      clearFormData(){
        this.$refs.formsData.resetFields();
        this.activeName = 'throught';
        this.$refs["housePage2"].tableData = [];
        this.$refs["housePage3"].tableData = [];
        this.$refs["housePage2"].showTable = true;

        this.dialogBatchHouseNum = false;
      },
    },
    mounted(){
      this.seatId = this.clickColumnId;
      let unitId = this.unitId;
      let seatId = this.clickColumnId;
      if(unitId) {
        this.form.unit = unitId;
      }
      this.getEditorData(seatId);
      
    }
  }
</script>

<style lang="scss" scoped>
  *{
    font-size:12px;
  }
  .margin-b-10{
    margin-bottom:10px;
  }
  .padding-tb-5{
    padding:5px 0;
  }
  .padding-r-5{
    padding-right:5px;
  }
  .padding-l-10{
    padding-left:10px;
  }
  .padding-r-10{
    padding-right:10px;
  }
  .word-1{
    text-align:center;
    color:#999;
  }
  .btn{
    cursor:pointer;
    border:1px solid #666;
    padding:1px 10px;
    border-radius:3px;
    display:inline-block;
    color:#333;
    background-color: #DFDAD5;
    margin-right: 0px;
  }
  .left-border{
    border-width: 0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-left-width:2px;
  }
  .item-earch-btn{
    border: 1px solid #797979;
    line-height: 21px;
    margin-top: 10px;
    text-align: center;
    border-radius: 3px;
    cursor:pointer;
  }
  .right {

    /deep/ .el-form-item__content{
      margin: 0 2px;
      line-height: 15px;
    }
  }
  /deep/ .el-tabs--border-card>.el-tabs__header {
    background:#DCD9D3;
  }
   /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    background:url("../../../images/tab-icon.png");
    border-width:0 !important;
    height:24px;
    padding-left:20px !important;
    span{
      position:relative;
      text-align:center;
      display:inline-block;
      top:3px;
      width: 72px;
    }

  }
   /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    background:url("../../../images/tab-active-icon.png");
    color: #909399;
    border-width:0px !important;
    height:24px;
    span{
      position:relative;
      text-align:center;
      display:inline-block;
      top:3px;
      width: 72px;
    }
  }
  /deep/ .el-tabs--border-card {
    background:#DCD9D3;
    border-width:0;
  }
  /deep/ .el-tabs--border-card>.el-tabs__content {
    padding:0 !important;
  }


  /deep/ .el-tabs__item{
    
    text-align:center !important;
    line-height:20px;
    height:20px;
    text-align:center;
  }
  .list-content{
    margin:5px;
  }

</style>
