<template>
  <div class="" >
    <el-dialog v-dialogDrag title="楼盘-学校" width="350px" :visible.sync="dialogNewBuildingSchool" @close="clearFormData" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 112px;">
          <div class="move-content" >
            <el-form ref="formsData"  :model="form">
              <div class="clear" >
                <div class="left" style="padding-left:10px" >
                  <span class="require-word input-l-word" >楼盘</span>
                </div>
                <div class="left" >
                  <el-form-item prop="villageTownId" >
                    <el-select v-model="form.villageTownId" @change="findBuildingByAreaId" :disabled="isBuilding"      style="width:80px;" >
                      <el-option v-for="item in towns"  :label="item.label" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-select v-model="form.villageId"  :disabled="isBuilding"      style="width:120px;" >
                      <el-option v-for="item in villages"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" style="padding-left:10px" >
                  <span class="require-word input-l-word" >学校</span>
                </div>
                <div class="left" >
                  <el-form-item prop="schoolTownId" >
                    <el-select v-model="form.schoolTownId" @change="findSchoolByAreaId" :disabled="isSchool"      style="width:80px;" >
                      <el-option v-for="item in towns"  :label="item.label" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item prop="schoolId" >
                    <el-select v-model="form.schoolId" :disabled="isSchool"      style="width:120px;" >
                      <el-option v-for="item in schools"   :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" style="padding-left:10px" >
                  <span class=" input-l-word" style="text-align:right;width:35px;display:inline-block;" >距离</span>
                </div>
                <div class="left" >
                  <el-form-item prop="distance" >
                    <el-select v-model="form.distance"      style="width:200px;" >
                      <el-option v-for="item in distanceParams"  :label="item.name" :value="item.id" ></el-option>

                    </el-select>
                  </el-form-item>
                </div>

              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn"  @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData">保 存</span>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {newNearbySchool,edtiorNearbySchool,findBuildingListByAreaId,schoolList}  from '../../../service/getData'
  export default {
    props:["newSchoolValue"],
    data() {
      return {
        dialogNewBuildingSchool:this.newSchoolValue,
        isSchool:false,
        isBuilding:false,
        boxMessage:{
          boxWidth:200,
          boxHeight:150,
          title:'',
          icon:'dangerous-icon',
          message:'保存成功',
          dialogVisible:false,
          clickSaveCallback:'clickSaveCallback',
        },
        distanceParams:[],
        towns:[],
        schools:[],
        villages:[],
        form: {
          villageTownId:'',
          villageId:'',
          schoolTownId:'',
          schoolId:'',
          distance:'',
          deleted:0,
          createBy:'aaa'
        },
        formLabelWidth: '100px'
      };
    },
    methods:{
      newSchool(){
        this.dialogNewBuildingSchool = true;
        this.getNearbySelect();
      },
      getNearbySelect(){
        let _this =  this;
        let id = '';
        let schoolId = '';
        let villageId = '';

        edtiorNearbySchool(id,schoolId,villageId).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            let params = response.data.params;
            _this.towns = params.towns;
            _this.distanceParams = params.distanceParams;

          }
        })
      },
      findBuildingByAreaId(value) {
        var _this = this;
        if(value) {
          let word = '';
          findBuildingListByAreaId(value,word).then(function (response) {
            if (response.status == 500) {

            } else if (response.status == 0) {
              let data = response.data;
              _this.villages = data;
              _this.form.villageId = '';
            }
          })
        }
      },
      findSchoolByAreaId(value) {
        var _this = this;
        if(value) {
          let areaId = value;
          let character = '';
          let level = '';
          let type = '';
          let word = '';
          schoolList(character,level,type,word,areaId).then(function (response) {
            if (response.status == 500) {

            } else if (response.status == 0) {
              let data = response.data;
              _this.schools = data;
              _this.form.schoolId = '';
            }
          })
        }
      },
      saveFormData(){
        let _this =  this;
        let form = _this.form;
        let villageId = form.villageId;
        let schoolId = form.schoolId;
        let distance = form.distance;
        if (villageId == "") {
          this.myAlert("楼盘为空！",'dangerous-icon');
          return false;
        }
        if (schoolId == "") {
          this.myAlert("请先选择【学校】！",'dangerous-icon');
          return false;
        }

        newNearbySchool(form).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){
            _this.saveDataSuccess();
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }
        })

      },
      saveDataSuccess(){
        let _this = this;
        _this.myAlert("数据保存成功！",'success-icon').then(res => {
          _this.clearFormData();
        }).catch(err => {
        })

      },
      clearFormData(){
        this.$refs.formsData.resetFields();
        this.schools = [];
        this.villages = [];
        this.dialogNewBuildingSchool = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .input-l-word{
    display:inline-block;
    line-height:28px;
    padding-right:5px;
  }
  .move-content {
    padding:10px 0 10px 10px;
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
