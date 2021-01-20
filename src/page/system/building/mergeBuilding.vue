<template>
    <div>
      <el-dialog v-dialogDrag title="合并楼盘字典" width="600px"  @close="clearFormData"  :visible.sync="dialogMerge" :append-to-body="true" >
        <div class="pop-up" >
          <div class="pop-up-container clear" style="height: 362px;">
            <el-form class="clear" ref="formsData"  :model="form" >
              <div class="left list-container" style="height: 360px;">
                <div class="clear" >
                  <div class="left" style="line-height:30px;font-size:12px;padding:0px 5px 0 10px;" >
                    将
                  </div>
                  <div class="left" >
                    <el-form-item prop="oldId" >
                      <el-select @change="findSetSeats" v-model="form.oldId"      style="width:130px;" >
                        <el-option v-for="item in villages"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left" style="line-height:30px;font-size:12px;padding:0px 5px 0 10px;" >
                    合并到
                  </div>
                  <div class="left" >
                    <el-form-item prop="newId" >
                      <el-select @change="getPedestalListData" v-model="form.newId"        style="width:130px;" >
                        <el-option v-for="item in villages"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left" style="width:30px;" >
                      <span>栋座</span>
                      <span>对应</span>
                      <span>关系</span>
                  </div>
                  <div class="left list-content" >
                    <div class="list-table " style="width:300px;" >

                      <el-table
                        :data="tableData"
                        style="width: 100%"
                        border
                        height="260"
                      >

                        <el-table-column
                          prop="name"
                          label="栋座"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="shortName"
                          label="对应"
                          width="50"
                        >
                          <template slot-scope="scope">
                            <div>
                              ==>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="num"
                          label="栋座"
                          width="100">
                          <template slot-scope="scope">
                            <div>
                              <el-select
                                v-model="scope.row.newId"
                                @change="changeTableData"
                                 
                              >
                                <el-option v-for="item in seats"  :label="item.name" :value="item.id" ></el-option>
                              </el-select>

                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="left" style="height: 358px;width: 1px;">
                <i class="cut-y-icon" ></i>
              </div>
              <div class="left merge-container" >
                  <div class="clear" >
                    <div class="left padding-r-2" style="" >
                      <span class="input-left-word" >省市</span>
                    </div>
                    <div class="left" >
                      <el-form-item prop="townName" >
                        <el-input v-model="townName" disabled autocomplete="off" style="width:100px" ></el-input>
                      </el-form-item>
                    </div>
                  </div>

                  <div class="clear" >
                    <div class="left padding-r-2" style="" >
                      <span class="input-left-word" >区县</span>
                    </div>
                    <div class="left" >
                      <el-form-item prop="streetName" >
                        <el-input v-model="streetName" disabled autocomplete="off" style="width:100px" ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div>
                    <i class="dangerous-special-icon" ></i>
                  </div>
                  <div class="dangerous-word" >
                    本操作涉及大量数据，为避免影响日常业务，同时保证数据的一致性，请安排在晚上或者周末进行！
                  </div>
              </div>
              <div style="position:absolute;bottom:12px;" >
                <div class="left" style="padding:0 5px 0 10px;" >
                  <el-form-item >
                    <el-checkbox v-model="form.isDelete"  :false-label="0" :true-label="1"  ></el-checkbox>
                  </el-form-item>

                </div>
                <div style="line-height:33px;color:#990000;font-size:12px;" class="left l-h-30">
                  合并后删除被合并楼盘字典
                </div>
              </div>
            </el-form>
          </div>

          <div slot="footer" class="dialog-footer clear">
            <span class="right save-cancel-btn" @click="dialogMerge = false">取 消</span>
            <span class="right save-cancel-btn" type="primary" @click="saveFormData" >开始合并楼盘字典</span>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {pedestalList,mergerBuildingParams,mergerBuilding} from '../../../service/getData'

  export default {
      props:["buildingShowMerge"],
      data(){
        return {
          dialogMerge:this.buildingShowMerge,
          tableData:[],
          villages:[],
          seats:[],
          townName:'',
          streetName:'',
          form:{
            name:0,
            isDelete:1,
            villageId:'',
            oldId:'',
            newId:'',
          }
        }
      },
      methods:{
        newMergeBuilding(id){
          this.dialogMerge = true;
          this.getMergeParams(id);
        },
        changeTableData(){

        },
        getMergeParams(id){
          let _this = this;
          mergerBuildingParams(id).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let seats = data.secSeats;
              _this.villages = data.list;
              _this.seats = data.secSeats;

              _this.form.oldId = data.id;
              _this.form.newId = data.secId;
              let newId = '';
              if(seats && seats.length != 0){
                newId = seats[0].id;
              }
              let arr = [];
              data.seats.forEach(function(item){
                item.newId = newId;
                arr.push(item);
              })
              _this.tableData = arr;
              _this.townName = data.townName;
              _this.streetName = data.streetName;
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        },
        findSetSeats(value){
          this.getMergeParams(value);
        },
        getPedestalListData(id){
          let _this = this;
          let seatId = '';
          pedestalList(id,seatId).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data.seats;
              _this.seats = data;
              let newId = '';
              if(data && data.length != 0){
                newId = data[0].id;
              }
              _this.tableData.forEach(function(item){
                item.newId = newId;
              })
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        },

        saveFormData(){
          let _this = this;
          let tableData = this.tableData;
          let map = {};
          let flag = false;
          for(let i = 0 ; i < tableData.length ; i++){
            if(map[tableData[i].newId]){
              flag = true;
              break;
            }else{
              map[tableData[i].newId] = tableData[i];
            }
          }
          debugger;
          if(flag){
            _this.myConfirm("是否要将多栋合并到一栋？","question-icon",'是','否','','my-success').then(res => {
              let title1 = _this.getNameById(_this.villages,_this.form.oldId);
              let title2 = _this.getNameById(_this.villages,_this.form.newId);
              _this.myConfirm("是否要将楼盘字典【"+title1+"】合并到【"+title2+"】？","question-icon",'是','否','','my-message').then(res => {
                _this.mergeBuildingData();
              }).catch(err => {

              })
            }).catch(err => {

            })
            return false;
          }

          let title1 = _this.getNameById(_this.villages,_this.form.oldId);
          let title2 = _this.getNameById(_this.villages,_this.form.newId);
          _this.myConfirm("是否要将楼盘字典【"+title1+"】合并到【"+title2+"】？","question-icon",'是','否','','my-message').then(res => {
            _this.mergeBuildingData();
          }).catch(err => {

          })
        },
        mergeBuildingData(){
          let _this = this;
          let form = JSON.parse(JSON.stringify(_this.form));
          let tableData = this.tableData;

          let arr = [];
          tableData.forEach(function(item){
            arr.push({
              oId:item.id,
              nId:item.newId,
            })
          })
          form.merges = JSON.stringify(arr);
          mergerBuilding(form).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {

                _this.myAlert("合并成功！",'success-icon');
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        },
        getNameById(arr,id){
          let name = "";
          for(let i = 0 ; i < arr.length ; i++){
            if(arr[i].id == id){
              name = arr[i].name;
              break;
            }
          }
          return name;
        },
        clearFormData(){
          this.$refs.formsData.resetFields();
          this.dialogMerge = false
        },
      },

    }
</script>

<style lang="scss" scoped>
  .list-container{
    height:310px;
    border-top-width:0;
    padding:10px 10px 10px 0px;
    margin-left:5px;
    border-radius:5px;
    .list-table{
      width:350px;
      border:1px solid #797979;
    }
  }
  .padding-r-2{
    padding-right:2px;
  }
  .input-left-word{
    display:inline-block;
    line-height:28px;
  }
  .cut-y-icon{
    width:2px;
    height:300px;
    background: url(../../../images/system/fenge.png) -100px -90px;
  }
  .merge-container{
    padding:10px;
    padding-left: 30px;
    width:180px;
    .dangerous-special-icon{
      margin-left: -10px;
      display: inline-block;
      width:35px;
      height:35px;
      background: url("../../../images/system/jinggao.png") no-repeat -4px 0px;
    }
    .dangerous-word{
      color:#088383;
      font-size:12px;
      width:85px;
    }
    .item-earch-btn{
      border: 1px solid #797979;
      line-height: 21px;
      margin-top: 10px;
      text-align: center;
      border-radius: 3px;
      cursor:pointer;
    }
  }

</style>
