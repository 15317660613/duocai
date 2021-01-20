<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'学校修改 【'+titlename+'】'" width="350px" height="250px" :visible.sync="dialogEdiotrSchool" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 112px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="clear" >
                <div class="left padding-r-3" >
                  <span class="word require-word" style="display: inline-block;width: 51px;text-align: right;padding-right: 5px;" >楼盘</span>
                </div>
                <div class="left" >

                  <el-form-item prop="villageTownId">
                    <el-select v-model="form.villageTownId" @change="findBuildingByAreaId" :disabled="isBuilding"      style="width:80px;" >
                      <el-option v-for="item in towns"  :label="item.label" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item prop="villageId" >
                    <el-select v-model="form.villageId" :disabled="isBuilding"      style="width:120px;" >
                      <el-option v-for="item in villages"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left padding-r-3" >
                  <span class="word require-word" style="display: inline-block;width: 51px;text-align: right;padding-right: 5px;" >学校</span>
                </div>
                <div class="left" >
                  <el-form-item prop="schoolTownId" >
                    <el-select v-model="form.schoolTownId" @change="findSchoolByAreaId"  :disabled="isSchool"      style="width:80px;" >
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
                <div class="left" >
                  <el-form-item prop="distance" label="距离"  label-width="50px">
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
          <span class="right save-cancel-btn"   @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData">保 存</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {schoolList,modifyNearbySchool,edtiorNearbySchool,findBuildingListByAreaId}  from '../../../service/getData'
  export default {
    props:["editorSchoolValue"],
    data() {
      let validateBuilding = (rule, value, callback) => {
        if (value == "") {
          this.myAlert("楼盘为空！",'dangerous-icon');
        }
      }
      let validateSchool = (rule, value, callback) => {
        if (value == "") {
          this.myAlert("学校为空！",'dangerous-icon');
        }
      }
      let validateDistance = (rule, value, callback) => {
        if (value == "") {
          this.myAlert("距离为空！",'dangerous-icon');
        }
      }
      return {
        dialogEdiotrSchool:this.editorSchoolValue,
        titlename:'',
        dialogVisibleSuccess:false,
        isSchool:false,
        isBuilding:false,
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
      editorSchool(id,form,type){
        this.dialogEdiotrSchool = true;
        this.getNearbySelect(id,form,type);
      },
      getNearbySelect(id,form,type){
        let _this =  this;
        let schoolId = '';
        let villageId = '';
        if(type == "学校"){
          schoolId = form.id;
          _this.isBuilding = false;
          _this.isSchool = true;
        }else{
          villageId = form.id;
          _this.isBuilding = true;
          _this.isSchool = false;
        }
        edtiorNearbySchool(id,schoolId,villageId).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            let params = response.data.params;
            _this.form = response.data.schoolVillageDetail;
            _this.towns = params.towns;
            _this.villages = params.villages;
            _this.schools = params.schools;
            _this.distanceParams = params.distanceParams;
            if(type == "学校"){
              _this.schools = params.schools;
              _this.form.schoolTownId = params.schoolTownId;
              _this.form.schoolId = params.schoolId;
            }else{
              _this.villages = params.villages;
              _this.form.villageId = params.villageId;
              _this.form.villageTownId = params.villageTownId;
            }
            _this.schools.forEach(item=>{
              if(item.id == _this.form.schoolId){
                _this.titlename = item.name
              }
            })
          }
        })
      },
      findBuildingByAreaId(value) {
        var _this = this;
        let word = '';
        if(value) {
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
          this.myAlert("学校为空！",'dangerous-icon');
          return false;
        }
        if (distance == "") {
          this.myAlert("距离为空！",'dangerous-icon');
          return false;
        }
        modifyNearbySchool(form).then(function(response){
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
      saveDataSuccess() {
        let _this = this;
        _this.myAlert("数据保存成功！",'success-icon').then(res => {
          _this.$parent.reloadSchoolList();
          _this.clearFormData();
        }).catch(err => {
        })
      },
      clearFormData(){
        this.$refs.formsData.resetFields();
        this.schools = [];
        this.dialogEdiotrSchool = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px 0 10px 10px;
    .require-word:before{
      content: '*';
      color: #F56C6C;
      margin-right: 1px;
    }
    .word{
      line-height:27px;
    }
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
