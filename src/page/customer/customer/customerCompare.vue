<template>
  <div class="rent-container mycontailerclass1">
    <div class="top-container border-black" >
      <div class="search-container mycontailerclass2">
        <div class="clear" >
          <div class="left padding-l-15"  >
            <el-radio @change="changeToRent"  v-model="rendOrCustomer" :label="1">&nbsp;</el-radio>
          </div>
          <div class="left" >
            客源列表
          </div>
          <div class="left padding-l-10" >
            <el-radio  v-model="rendOrCustomer" :label="2">&nbsp;</el-radio>
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-column-icon"></i>
          </div>
          <div class="left" >
            客对列表
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>
          <div class="left padding-l-5" @click="filterData"  >
            过滤选中
          </div>
          <div class="left padding-l-10"  >
            <i class="cut-column-icon"></i>
          </div>
          <div class="left padding-l-10"  >
            <i class="leading-out-icon" title="自选列" @click="rentColumn"  ></i>
          </div>
          <div class="left padding-l-10"  >
            <i class="print-out-icon" title="导出"  ></i>
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>
          <div class="item left" >
            <div class="record-num" >
              <span class="search-word" ><</span>
              <span class="search-word" >{{currentNum}}</span>
              <span class="search-word" >/</span>
              <span class="search-word" >{{tableData.length}}</span>
              <span class="search-word" >></span>
            </div>
          </div>
          <div class="item left clear" >
            <i class="back-icon user left"></i>
          </div>
          <div class="left padding-l-5"  >
            <i class="cut-icon"></i>
          </div>

        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear" >
            <div class="left padding-l-15 mt" >
              <span class="des-word" >标记日期</span>
            </div>
            <div class="left mt" >
              <el-form-item prop="quick" label-width="0">
                <el-select @change="getQuickDate" v-model="quick"  style="width:85px;"   >
                  <el-option  label="自定" value="1" ></el-option>
                  <el-option  label="今天" value="2" ></el-option>
                  <el-option  label="三天" value="3" ></el-option>
                  <el-option  label="七天" value="4" ></el-option>
                  <el-option  label="一月" value="5" ></el-option>
                  <el-option  label="三月" value="6" ></el-option>
                  <el-option  label="一年" value="7" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left padding-l-2 mt" >
              <el-form-item label="" label-width="0">
                <el-date-picker :disabled="timeDisabled" size="mini" type="date"  v-model="form.timeStart" style="width: 90px;"></el-date-picker>
              </el-form-item>
            </div>
            <div class="left padding-l-2 mt" >
              <el-form-item label="" label-width="0">
                <el-date-picker :disabled="timeDisabled" size="mini" type="date"  v-model="form.timeEnd" style="width: 90px;"></el-date-picker>

              </el-form-item>
            </div>
            <div class="left padding-l-15 mt" >
              <span class="des-word" >标记员工</span>
            </div>
            <div class="left mt" >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial @findStreetByTown="finUserByDepart" :selectId="departIds" :listData="departParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left mt" >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="userId" :listData="userParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left padding-l-15 mt" >
              <span class="des-word" >进程</span>
            </div>
            <div class="left mt" >
              <el-form-item label="" label-width="0">
                <CheckSelectSpecial :selectId="processId" :listData="processParams" style="width:110px;" ></CheckSelectSpecial>
              </el-form-item>

            </div>
            <div class="left padding-l-15 mt" >
              <span class="des-word" >状态</span>
            </div>
            <div class="left mt" >
              <el-form-item label="" label-width="0">
                <el-select v-model="form.state" style="width:85px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="有效" value="1" ></el-option>
                  <el-option  label="无效" value="2" ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left mt" style="padding-left:30px;" >
              <el-form-item label="" label-width="0">
                <el-input v-model.trim="form.word" title="房源编号，楼盘位置房号" maxlength="30" style="width:110px;"  autocomplete="off" ></el-input>
              </el-form-item>
            </div>
            <div class="left padding-l-15 mt" style="border-radius:5px" >
              <el-checkbox v-model="form.removal" :false-label="0" :true-label="1"  >&nbsp;</el-checkbox>
            </div>
            <div class="left mt" style="margin-left:-10px;" >
              客源去重
            </div>
            <div class="left padding-l-15 mt" style="border-radius:5px" >
              <el-checkbox v-model="form.firstRemoval" :false-label="0" :true-label="1" >&nbsp;</el-checkbox>
            </div>
            <div class="left mt" style="margin-left:-10px;" >
              首顺位去重
            </div>
            <div class=" left padding-l-5 mt" >
              <i class="search-btn" @click="getHouseCompareData" >查询</i>
            </div>
            <div class="left padding-l-5 mt" >
              <i class="claerlys" @click="clearForm" ></i>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear" >

      <div class="list-content" >
        <el-table
          :data="tableData"
          border
          height="100%"
          highlight-current-row
          :row-style="rowStyle"
          :row-class-name="tableRowClassName"
          @row-click="getRowDataByClick"
          @selection-change="handleSelectionChange"
        >
          <template v-for="(item,index) in columnData" >
            <el-table-column
              v-if="item.prop == 'num1'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
            >
              <template  slot-scope="scope">
                  <div style="line-height:18px;text-align:center;" >
                    <span v-html="scope.row[item.prop]" @click="modifyNum(scope.row)" style="cursor:pointer;color:#336699;font-weight:700" > </span>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
              :ref="item.ref"
              :sortable="item.sortable"
              :show="item.show"
            >


            </el-table-column>
          </template>


          <el-table-column
            width="130"
            prop="house"
            colspan="1"
            label="客源信息"
            sortable=true
          >
            <template  slot-scope="scope">
              <div style="">
                <div class="" style="width:120px;padding-left:44px;text-align:center;" >
                  <i :class="{'sex-icon':scope.row.gender == '女','male-sex-icon':scope.row.gender == '男'}" ></i>
                </div>
                <div style="width:120px;line-height:18px;text-align:center;" >
                  <span v-html="scope.row.name" @click="editorCustomer(scope.$index,scope.row)" style="cursor:pointer;color:#336699;font-weight:700" > </span>
                </div>
                <div class="clear" style="width:120px;text-align:center;" >

                  <span style="color:#666;" >
                          {{scope.row.createBy}}
                  </span>
                </div>
                <div style="position:absolute;top:10px;left:28px;width:24px;text-align:right;">
                  {{scope.row.customerType}}
                  </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :width="contentWidth"
            prop="customer1"
            label="房源信息"
          >
            <template  slot-scope="scope">
              <div class="clear" style="height:100px;">
                <div  v-for="(item , index) in scope.row.buyList" class="left" style="width:155px;height:100px;border-right:1px solid #fff;position:relative;" >
                  <div v-if="item.name" class="clear" >
                    <div class="clear" style="height:18px;" >
                      <div class="left" >
                          <span @click="modifySequenceNum(item.id,scope.row.id)" style="cursor:pointer;display:inline-block;width:20px;height:20px;background:#BE8F0D;color:#fff;font-weight:700;text-align:center;line-height:20px;border-radius:10px;" >
                            {{item.indexId}}
                          </span>
                      </div>
                      <div @click="" class="right" style="font-weight:700;font-size:14px;padding:2px;" >
                        {{item.num}}
                      </div>
                    </div>
                    <div style="position:relative" >
                      <div style="position:absolute;top:-5px;left:31px;width:24px;text-align:right;" >
                        {{item.houseType}}
                      </div>
                      <div style="padding-left:48px;" >
                        <i :class="{'new-icon':item.houseType == '新','sale-rent-icon':item.houseType == '售','rent-sale-icon':item.houseType == '租'}" ></i>
                      </div>
                    </div>
                    <div class="clear" style="padding-top:3px;" >
                      <div @click="modifyProgressElem(item.id)" class="left" style="cursor:pointer;padding-left:20px;font-size:14px;line-height:18px;height:18px;font-weight:700" >
                        {{item.processingStateId}}
                      </div>
                      <div class="left" @click="editorRent(scope.$index,item)" style="cursor:pointer;color:#336699;font-weight:700;background:#fff;line-height:18px;height:18px;width:90px;text-align:center;border-radius:3px;" >
                        {{item.name}}
                      </div>
                      <div class="left" >
                        <i @click="removeCompareClick(scope.row.id,item.id)" class="remove-buy-icon" ></i>
                      </div>
                    </div>

                    <div class="clear" style="text-align:center;line-height:12px;" >
                        <span style="color:#999;" >
                          {{item.createTime}}
                        </span>
                    </div>
                  </div>
                  <div v-else="item.num" class="left" style="width:155px;height:100px;border-right:1px solid #fff;" >

                  </div>

                </div>
                <div class="left clear " style="width:120px;height:100px;" >
                  <div class="left" >
                    <div class="clear" style="height:100px;width:80px" >
                      <div  class="clear" v-for="(value, key,index) in scope.row.processing" style="padding:2px 5px;" >
                        <div class="left" >
                          {{key}}:
                        </div>
                        <div class="left" >
                          {{value}}个
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="left" style="height:100px;width:40px;" >
                    <i @click="moreCompareClick(scope.$index,scope.row)" class="more-icon" ></i>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="component-container" >
      <ModifyProgressPage @findCustomerListByHouse="findCustomerListByHouse" :modifyProgressVisible="modifyProgressValue"  ref="modifyProgress" ></ModifyProgressPage>
    </div>
    <div class="component-container" >
      <ModifySequencePage  @findCustomerListByHouse="findCustomerListByHouse"  :modifySequenceVisible="modifySequenceValue"  ref="modifySequence" ></ModifySequencePage>
    </div>
    <div class="component-container" >
      <MoreComparePage  :moreCompareVisible="moreCompareValue"  ref="moreCompare" ></MoreComparePage>
    </div>
    <div class="component-container" >
      <ModifyNumPage @reloadCustomerList="findCustomerListByHouse" :modifyNumVisible="modifyNumValue"  ref="modifyNum"  ></ModifyNumPage>
    </div>
  </div>
</template>


<script>
  /*获取数据
  *
  * */
  import {houseParirsParams} from '../../../service/houseData'
  import {customerCompareList,removeCompare} from '../../../service/customerData'
  import {departperson} from "../../../service/organizeDate";

  import {quickDate} from '../../../utils/getQuickDate'

  import CheckSelectSpecial from '../../../components/checkSpecial'
  import ModifyProgressPage from './modifyProgress'
  import ModifySequencePage from './modifySequence'
  import MoreComparePage from './moreCompare'
  // 编辑租售
  import EditorRentPage from '../../house/rent/editorRent'
  // 编辑客源
  import EditorCustomerPage from './editorCustomer'
  // 自选列
  import ColumPage from '../../../components/column'
  // 修改自定号
  import ModifyNumPage from './modifyCustomerNum'
  //获取数据
  export default {
    data() {
      return {
        rendOrCustomer:2,
        currentNum:0,
        modifyProgressValue:false,
        modifySequenceValue:false,
        modifyNumValue:false,
        rentColumnValue:false,
        moreCompareValue:false,
        multipleSelection:[],
        select:'depart',
        maxNum:0,
        tableData:[],
        departParams:[],
        userParams:[{id:'-1',name:"全部",select:true}],
        processParams:[],
        stateParams:[],
        contentWidth:0,
        departIds:'departIds',
        userId:'userId',
        processId:'processId',
        quick:'1',
        timeDisabled:false,
        columnData:[
          {
            type:'selection',
            width:'35',
            ref:'multipleTable',
            prop:'check',
            label:'',
            sortable:false,
            show:true,
          },

        ],
        form:{

          timeStart:'',
          timeEnd:'',
          state:'-1',
          word:'',
          removal:0,
          firstRemoval:0,
        },

      };
    },
    components:{
      EditorCustomerPage,
      EditorRentPage,
      ModifyNumPage,
      CheckSelectSpecial,
      ModifyProgressPage,
      ModifySequencePage,
      MoreComparePage,
      ColumPage
    },
    methods: {
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
      editorRent(index, row){
        let _this = this;
        let ids = [row.houseId];
        this.currentPage = row;
        let test = _this.$layer.iframe({
          content: {
            content: EditorRentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.houseId,address:row.name,activeName:'house',ids:ids.toString(),currentIndex:index}//props
          },
          area:['812px','534px'],
          title:"房源信息 【"+ this.currentPage.name+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },
      //租售列表
      changeToRent(){
        this.$router.push('/home/customerSource');
      },
      getHouseCompareParams(){
        let _this = this;
        houseParirsParams().then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;

            let departTree = data.departTree;
            if(departTree && departTree.length != 0){
              let arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < departTree.length ; i++){
                arr.push({
                  id:departTree[i].id,
                  name:departTree[i].label.replace(/&nbsp;/g,""),
                  select:departTree[i].select,
                  state:departTree[i].state,
                })
              }
              _this.departParams = arr;
              _this.userParams = [{id:'-1',name:"全部",select:true}];
            }
            let processingStateParams = data.processingStateParams;
            if(processingStateParams && processingStateParams.length != 0){
              let arr = [{id:'-1',name:"全部",select:true}];
              for(let i = 0 ; i  < processingStateParams.length ; i++){
                arr.push({
                  id:processingStateParams[i].id,
                  name:processingStateParams[i].name,
                  select:processingStateParams[i].select,
                })
              }
              _this.processParams = arr;
            }
            _this.getHouseCompareData();

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      clearForm(){
        let _this = this;
        this.timeDisabled = false;
        this.quick = '1';
        this.form.timeStart = '';
        this.form.timeEnd= '';
        this.form.word= '';

        this.form.state = '-1';
        this.form.removal = 0;
        this.form.firstRemoval = 0;
        _this.departParams = _this.backSlect(_this.departParams);
        _this.userParams = _this.backSlect(_this.userParams);
        _this.processingStateIds = _this.backSlect(_this.processingStateIds);
        _this.processParams = _this.backSlect(_this.processParams);
      },
      //获取客对数据
      getHouseCompareData(){
        let _this = this;
        //加载动画
        _this.$layer.loading({
          shade:true,
        })
        this.currentNum = 0;
        let form = JSON.parse(JSON.stringify(_this.form));
        form.deptIds = _this.getSelectIdByList(_this.departParams);
        form.userIds = _this.getSelectIdByList(_this.userParams);
        form.processingStateIds = _this.getSelectIdByList(_this.processParams);
        customerCompareList(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            let title = response.data.title;
            let titleArr = [{
              type:'selection',
              width:'35',
              ref:'multipleTable',
              prop:'',
              label:'',
              sortable:false,
              show:true,
            },];
            title.forEach(function(item){
              let width = "75px";
              if(item.title == "客自定号"){
                width = "80px";
              }
              titleArr.push({
                type:'',
                width:width,
                ref:'',
                prop:item.field,
                label:'客自定号',
                sortable:false,
                show:true,
              })
            })

            _this.columnData = titleArr;
            _this.maxNum = response.data.maxNum;
            _this.contentWidth = (response.data.maxNum*1+1)*155+'px';
            let arr = [];
            data.forEach(function(item){

              _this.setArrList(item,_this.maxNum,item);
              arr.push(item);
            })

            _this.tableData = arr;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      setArrList(item,num,arr){
        let buyList = [];
        for(let i = 1 ; i <= num ; i++){
          buyList.push(item['pair'+i]);
        }
        arr.buyList = buyList;
      },
      modifyNum(row){
        this.$refs['modifyNum'].newModifyNum(row.id);
      },
      modifyProgressElem(id){
        this.$refs.modifyProgress.showDialog(id);
      },
      modifySequenceNum(id,customerId){
        this.$refs.modifySequence.showDialog(id,customerId);
      },
      removeCompareClick(houseId,ids){
        let _this = this;
        removeCompare(houseId,ids).then(function(response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("解除配对成功!",'success-icon').then(res => {
              _this.getHouseCompareData();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      rowStyle({ row, rowIndex}) {
        /*if (rowIndex === 0) {
          return {'background':'#f5f5f5;'};
        } else {
          return ''
        }*/
      },
      finUserByDepart(){
        let _this = this;
        let id = this.getSelectIdByList(_this.departParams);
        if(id){
          departperson(id).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [{id:'-1',name:"全部",select:true}];
              if(user && user.lengthg != 0){
                user.forEach(function(item){
                  if(item.doBusiness == 1 ) {
                    arr.push({
                      id: item.id,
                      name: item.name,
                      select:false,
                    })
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
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      getRowDataByClick (row, column, event) {
        let _this = this

        _this.currentNum = row.index + 1
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
      filterData(){
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
      },

      editorCustomer(index,row){
        let _this = this;
        let ids = [row.id];

        this.currentPage = row;
        _this.$layer.iframe({
          content: {
            content: EditorCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,name:row.name,activeName:'house',ids:ids.toString(),currentIndex:index}//props
          },
          area:['812px','550px'],
          title:'客源信息',
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件

          }
        });

      },
      moreCompareClick(index,row){
        let _this = this;
        let ids = [row.id];

        this.currentPage = row;
        _this.$layer.iframe({
          content: {
            content: EditorCustomerPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,name:row.name,activeName:'pedestal',ids:ids.toString(),currentIndex:index}//props
          },
          area:['812px','550px'],
          title:'客源信息',
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:3000, //层优先级
          cancel:()=>{//关闭事件

          }
        });
      },
      //自选列
      rentColumn(){
        this.$refs["rentColumnId"].showDialogView();
      },
      findCustomerListByHouse(){
        this.getHouseCompareData();
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
      backSlect(list){
        let arr = [];
        if(list && list.length != 0) {
          list.forEach(function (item) {
            if (item.id != -1) {
              item.select = false;
            } else {
              item.select = true;
            }
            arr.push(item);
          })
        }
        return arr;
      }
    },
    mounted(){
      this.getHouseCompareParams();
    }
  };
</script>

<style lang="scss" scoped>
  .mt{
    margin-top: 5px;
    margin-bottom: 5px;
  }

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
    .cut-icon{
      background:url(../../../images/system/fenge.png) -100px -90px;
      width:3px;
      height:23px;
      display:block;
    }
    .well-icon{
      background:url(../../../images/icon.png) -170px -5px;
      width:20px;
      height:20px;
      display:block;
    }

    .light-icon{
      background:url(../../../images/icon.png) -342px -2px;
      width:20px;
      height:20px;
      display:block;
    }

    .house-list-icon{
      background:url(../../../images/icon.png) -182px -37px;
      width:40px;
      height:40px;
      display:block;
      margin: 10px 30px 15px 40px;
    }

    .editor-icon{
      background:url(../../../images/icon.png) -112px -40px;
      width:20px;
      height:22px;
      display:block;
    }

    .use-icon{
      background:url(../../../images/icon.png) -114px -80px;
      width:20px;
      height:20px;
      display:block;
    }

    .change-icon{
      background:url(../../../images/icon.png) -312px -0px;
      width:20px;
      height:22px;
      display:block;
    }

    .user-house-icon{
      background:url(../../../images/icon.png) -140px -42px;
      width:20px;
      height:22px;
      display:block;
    }

    .change-type-icon{
      background:url(../../../images/icon.png) -35px -76px;
      width:20px;
      height:20px;
      display:block;
    }

    .leading-out-icon{
      background:url(../../../images/icon.png) -126px -118px;
      width:20px;
      height:20px;
      display:block;
    }
    .new-icon{
      background:url(../../../images/icon.png) -181px -39px;
      width:33px;
      height:34px;
      display:block;
    }
    .sale-rent-icon{
      background:url(../../../images/icon.png) -182px -37px;
      width:40px;
      height:40px;
      display:block;
    }
    .rent-sale-icon{
      background:url(../../../images/icon.png) -182px -37px;
      width:40px;
      height:40px;
      display:block;
    }
    .sex-icon{
      background:url(../../../images/icon.png) -3px -111px;
      width:33px;
      height:34px;
      display:block;
    }
    .male-sex-icon{
      background:url(../../../images/icon.png) -42px -109px;
      width:33px;
      height:34px;
      display:block;
    }
    .remove-buy-icon{
      background:url(../../../images/cuohao.png) -15px -16px;
      width:20px;
      height:20px;
      display:block;
      cursor:pointer;
    }
    .print-out-icon{
      background:url(../../../images/system/daochu.png) -15px -15px;
      width:20px;
      height:20px;
      display:block;
    }
    .more-icon{
      background:url(../../../images/icon2.png)  -38px -16px;
      width:10px;
      height:20px;
      display:block;
      margin: 52px 0 0 27px;
      cursor:pointer;
    }
    .more-icon:hover{
      background:url(../../../images/icon2.png) -21px -16px;
      width:10px;
      height:20px;
      display:block;
      margin: 52px 0 0 27px;
      cursor:pointer;
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
    .word{

    }
    .content{
      height: calc(100% - 90px);
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

  }

</style>
