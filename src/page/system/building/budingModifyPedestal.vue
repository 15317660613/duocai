<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'批量修改房源栋座 【'+titlename+'】'" width="550px" @close="clearFormData" :visible.sync="dialogBuildingModifyPedestal" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 162px;">
          <div class="move-content" >

            <el-form ref="formsData" :model="form">
              <div class="clear" >
                <div class="left" >
                  <el-form-item label="楼盘字典"  label-width="80px">
                    <el-input disabled v-model="form.name" autocomplete="off" class="" style="width:130px;" ></el-input>
                  </el-form-item>
                </div>
                <div class="left word" >
                  的所有房源：
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item label="将栋座是"  label-width="80px">
                    <el-select v-model="form.oldSeatId"      style="width:80px;" >
                      <el-option v-for="item in oldSeatList"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item label="改为"  label-width="50px" >
                    <el-select v-model="form.newSeatId"      style="width:80px;" >
                      <el-option v-for="item in newSeatList "  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>

            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn"  @click="dialogBuildingModifyPedestal = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">开始更改栋座</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {pedestalList,batchModifyPedestal} from '../../../service/getData'
  export default {

    props:["buildingModifyPedestalValue"],
    data() {
      return {
        dialogBuildingModifyPedestal:this.buildingModifyPedestalValue,
        titlename:'',
        oldSeatList:[],
        newSeatList:[],
        textarea2:"",

        pedestalId:0,
        pedestalId:0,
        form: {
          name:'',
          villageId: '',
          oldSeatId:'',
          newSeatId:'',
          deleted:0,
        },
        formLabelWidth: '100px'
      };
    },
    methods:{
      buildingModifyPedestal(id,name){
        let _this = this;
        _this.dialogBuildingModifyPedestal = true;
        _this.pedestalId = id;
        _this.titlename = name;
        _this.getPedestalDatalist(id,name);
      },
      getPedestalDatalist(id,name){
        let _this = this;
        let seatId = '';
        _this.form.name = name;
        _this.form.villageId = id;
        pedestalList(id,seatId).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let data = response.data.seats;
            _this.oldSeatList = data;
            _this.newSeatList = data;
          }
        })
      },
      saveData(){
        let _this =  this;
        let form = _this.form;
        let villageId = form.villageId;
        let oldSeatId = form.oldSeatId;
        let newSeatId = form.newSeatId;
        if(!oldSeatId){
          this.myAlert("请选择要修改的栋座！",'dangerous-icon');
          return false;
        }
        if(!oldSeatId){
          this.myAlert("请选择要改为的栋座！",'dangerous-icon');
          return false;
        }
        batchModifyPedestal(villageId,oldSeatId,newSeatId).then(function(response){
          debugger;
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let id = _this.form.villageId;
            _this.saveDataSuccess(id);
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }
        })
      },
      saveDataSuccess(){
        let _this = this;
        _this.myAlert("保存成功",'success-icon').then(res => {
          debugger;
          _this.$parent.reloadPedestal();
          _this.clearFormData();
        }).catch(err => {
        })
      },
      //恢复初始数据
      clearFormData(formRule){
        let _this = this;
        _this.form.oldSeatId = '';
        _this.form.newSeatId = '';
        _this.dialogBuildingModifyPedestal = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .word{
    line-height:30px;
    padding-left:5px;
    font-size:5px;
    color: #606266;
  }
  .move-content {
    padding:10px 0 10px 0px;
    .title-word{
      line-height:20px;
      font-size:12px;
    }

    .select {
      width: 120px;
    }
    p{
      color:#DCA96D;
      font-size:12px;
    }
  }
</style>
