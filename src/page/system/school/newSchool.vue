<template>
  <div class="" >
    <el-dialog v-dialogDrag  title="新增学校" width="500px" :visible.sync="dialogNewSchool" @close="clearFormData" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 262px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="clear" >
                <div class="left" style="padding-left:10px" >
                  <span class="require-word input-l-word" >学校名称</span>
                </div>
                <div class="left" >
                  <el-form-item prop="name" >
                      <el-input v-model="form.name" maxlength="20" title="最多20个字" autocomplete="off" style="width:290px" ></el-input>
                  </el-form-item>
                </div>

              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item prop="areaId" label="学校地址"  label-width="68px">
                    <el-select v-model="form.areaId"      style="width:70px;" >
                      <el-option v-for="item in towns"  :label="item.label" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item prop="adress" >
                    <el-input v-model="form.adress" maxlength="80" title="最多80个字" autocomplete="off" style="width:220px" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item prop="type" label="学校类型"  label-width="68px">
                    <el-select v-model="form.type"      style="width:70px;" >
                      <el-option v-for="item in typeParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item prop="characterId" label="性质"  label-width="40px">
                    <el-select v-model="form.characterId"      style="width:70px;" >
                      <el-option v-for="item in characterParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left" >
                  <el-form-item prop="level" label="级别"  label-width="40px">
                    <el-select v-model="form.level"      style="width:70px;" >
                      <el-option v-for="item in levelParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left" style="padding-top:5px;" >
                  <el-form-item label="学校介绍" label-width="68px"  prop="introduce">
                    <el-input
                      type="textarea"
                      title="最多1000个字"
                      maxLength="1000"
                      class="remark"
                      :rows="4"
                      style="width:290px;border-width:0px;"
                      v-model="form.introduce">
                    </el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" style="" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData">保 存</span>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {newSchool,edtiorSchool} from '../../../service/getData'
  export default {
    props:["newSchoolValue"],
    data() {
      return {
        dialogNewSchool:this.newSchoolValue,
        dialogVisibleSuccess:false,
        level:'',
        areaId:'',
        towns:[],
        typeParams:[],
        characterParams:[],
        levelParams:[],
        form: {
          name:'',
          areaId:'',
          adress:'',
          type:'',
          characterId:'',
          level:'',
          introduce:'',
          deleted:0,
          createBy:'aaa',
        },
        formLabelWidth: '100px'
      };
    },
    methods:{
      newSchool(id,level){
        this.dialogNewSchool = true;
        this.level = level;
        this.areaId = id;
        this.getSchoolSelect();
      },
      getSchoolSelect(){
        let _this = this;
        let id = '';
        edtiorSchool(1).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
            let params = response.data.params;
            _this.towns = params.towns;
            let towns = params.towns;
            if(towns && towns.length != 0  ){

              if(_this.level != 3) {
                _this.form.areaId = towns[0].id;
              }else{
                _this.form.areaId = _this.areaId;
              }
            }
            _this.typeParams = params.typeParams;
            _this.characterParams = params.characterParams;
            _this.levelParams = params.levelParams;
          }
        })
      },
      saveFormData(){
        let _this =  this;
        let name = _this.form.name;
        if(name == ''){
          _this.myAlert("学校名称为空！",'dangerous-icon');
          return false;
        }
        let form = _this.form;
        newSchool(form).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功！", 'success-icon').then(res => {
              _this.$emit("reloadSchoolList");
              _this.clearFormData();
            }).catch(err => {
            })
          } else if (response.status == 0){
            _this.myAlert(response.status,'dangouser-icon');
          }
        })

      },

      clearFormData(){
        this.$refs.formsData.resetFields();
        this.dialogNewSchool = false
      },
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
    .mearsure-unit{
      line-height:28px;
      color:#606266;
      font-size:12px;
      padding-left:5px;
    }
    .select {
      width: 120px;
    }
    p{
      color:#DCA96D;
      font-size:12px;
    }
  }
  /deep/ .el-textarea__inner{
    padding:5px;
    font-size:12px;
    border:1px solid #aaa;
  }
</style>
