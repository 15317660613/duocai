<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="楼盘调动" width="350px" @close="clearFormData" :visible.sync="dialogMoveBuilding">
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 112px;">
          <div class="move-content" >
            <div class="title-word" >
              将楼盘字典【{{clickColumnName}}】从【{{clickStreetName}}】转到：
            </div>
            <el-form ref="formsData" :model="form">
              <div class="clear" >
                <div class="left" >
                  <el-form-item >
                    <el-select v-model="form.newTownId" @change="findBuildingByAreaFun"   class="select" >
                      <el-option
                        v-for="item in options"
                        :id="item.id"
                        :label="item.label"
                        :value="item.id">{{item.label}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left select-item" >
                  <el-form-item label="" label-width="0">

                    <el-select v-model="form.newStreetId"    class="select" >

                      <el-option
                        v-for="item in streetList"
                        :id="item.id"
                        :label="item.label"
                        :value="item.id">{{item.label}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <p>
                  本操作涉及大量数据，为避免影响日常业务，
                </p>
                <p>
                  同时保证数据的一致性，请安排在晚上或者
                </p>
                <p>
                  周末进行。
                </p>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogMoveBuilding = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">开始转换</span>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {findbyId,moveBuilding} from "../../../service/getData";
  export default {
    props:["buildingMove"],
    data() {
      return {
        dialogMoveBuilding:this.buildingMove,
        clickStreetName:'',
        clickColumnName:'',
        options:[],
        streetList:[],

        form: {
          clickColumnId:'',
          newTownId:'',
          newStreetId:'',
        },
        formLabelWidth: '100px'
      };
    },
    methods:{
      moveBuilding(obj){
        this.dialogMoveBuilding = true;
        this.clickStreetName = obj.clickStreetName;
        this.clickColumnName = obj.clickColumnName;
        this.form.clickColumnId = obj.clickColumnId;
        this.getSelectData();
      },
      getSelectData(){
        let _this = this;
        findbyId("642297670593159168").then(function (response) {
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            let areaList = response.data
            _this.options= areaList
          }
        })
      },
      findBuildingByAreaFun(id){
        let _this = this;
        let word = '';
        findbyId(id, word).then(function (response) {
          if (response.status == 500) {
            return false
          }else if(response.status == 0){
            let streetList = response.data
            _this.streetList= streetList;
            _this.form.newStreetId = '';
          }

        })
      },
      saveData(){
        let _this =  this;
        let id = _this.form.clickColumnId;
        let newTownId = _this.form.newTownId;
        let newStreetId = _this.form.newStreetId;

        moveBuilding(id,newTownId,newStreetId).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.dialogMoveBuilding = false;
            _this.myAlert("数据调动成功！",'success-icon').then(res => {
              _this.clearFormData();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

      clearFormData(){
        this.form.newTownId = '';
        this.form.newStreetId = '';
        this.dialogMoveBuilding = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 0px 20px;
    .title-word{
      line-height:20px;
      font-size:12px;
    }

    .select {
      width: 120px;
    }
    p{
      color:#990000;
      font-size:12px;
    }
  }
</style>
