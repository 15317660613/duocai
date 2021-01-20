<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'房号设置 【'+titlename+'】'" width="550px" :visible.sync="dialogNewHouseNum" @close="clearFormData" :append-to-body="true" >
      <div class="pop-up" >
        <div class="pop-up-container" style="height: 162px;">
          <div class="move-content" >
            <el-form ref="formsData"  :model="form">

              <div class="clear" >

                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >房型</span>
                </div>
                <div class="left" >
                  <el-form-item prop="room" >
                    <el-select v-model="form.room"      style="width:50px;" >
                      <el-option   label=" " value="-1" ></el-option>
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  mearsure-unit">房</div>
                <div class="left"  >
                  <el-form-item prop="hall" >
                    <el-select v-model="form.hall"      style="width:50px;" >
                      <el-option   label=" " value="-1" ></el-option>
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left padding-r-2 mearsure-unit">厅</div>
                <div class="left"  >
                  <el-form-item prop="wei" >
                    <el-select v-model="form.wei"      style="width:50px;" >
                      <el-option   label=" " value="-1" ></el-option>
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 mearsure-unit">卫</div>
                <div class="left padding-r-2 word"  >
                  <el-form-item prop="balcony" >
                    <el-select v-model="form.balcony"      style="width:50px;" >
                      <el-option   label=" " value="-1" ></el-option>
                      <el-option v-for="item in otherSelect"  :label="item" :value="item" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left mearsure-unit  word">阳台</div>
              </div>
              <div class="clear" >
                <div class="left" >
                  <el-form-item prop="inArea"  label="套内面积"  label-width="60px">
                    <el-input @input="checkNum2" v-model="form.inArea" maxLength="5" title="上限5位数" autocomplete="off" style="width:80px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left mearsure-unit">㎡</div>

                <div class="left  padding-r-2 des-word" style="width:65px;text-align:right;"  >
                  <span class="word " >建筑面积</span>
                </div>
                <div class="left" >
                  <el-form-item prop="buildArea" >
                    <el-input @input="checkNum3" v-model="form.buildArea" maxLength="10" title="0-10位数" autocomplete="off" style="width:75px" ></el-input>
                  </el-form-item>
                </div>
                <div class="left mearsure-unit">㎡</div>
              </div>
              <div class="clear" >
                <div class="left  padding-r-2 des-word" style="width:60px;text-align:right;"  >
                  <span class="word " >朝向</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="orientation" >
                    <el-select v-model="form.orientation"      style="width:80px;" >
                      <el-option v-for="item in orientationParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:82px;text-align:right;"  >
                  <span class="word " >装修</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="roomDecorate" >
                    <el-select v-model="form.decorateId"      style="width:75px;" >
                      <el-option v-for="item in decorateIdParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2 des-word" style="width:45px;text-align:right;"  >
                  <span class="word " >用途</span>
                </div>
                <div class="left"  >
                  <el-form-item prop="roomUse" >
                    <el-select v-model="form.roomUseId"      style="width:70px;" >
                      <el-option v-for="item in roomUseParams"  :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>

              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData">保 存</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {modifyHouseNums,editorHouseNum}  from '../../../service/getData'
  export default {
    props:["modifyHouseNumValue"],
    data() {
      return {
        dialogNewHouseNum:this.modifyHouseNumValue,
        villages:[],
        titlename:'',
        seats:[],
        units:[],
        roomUseParams:[],
        orientationParams:[],
        decorateIdParams:[],
        otherSelect:[0,1,2,3,4,5,6,7,8,9],
        projectId:[],
        types:[],
        form: {
          ids:'',
          room: '-1',
          hall: '-1',
          wei: '-1',
          balcony: '-1',

          inArea: '',
          buildArea: '',
          orientation: '',
          decorateId: '',
          roomUseId: '',
        },
        formLabelWidth: '100px'
      };
    },
    methods:{

      checkNum2(){
        this.form.inArea= this.form.inArea.replace(/[^\.\d]/g,'');

      },
      checkNum3() {
        this.form.buildArea = this.form.buildArea.replace(/[^\.\d]/g, '');

      },
      modifyHouseNum(ids,projectId,name){
        this.dialogNewHouseNum = true;
        this.form.ids = ids;
        this.titlename = name;
        this.projectId = projectId;
        this.getSelectData();
      },
      getSelectData(){
        let _this = this;
        let id = this.form.id;
        let projectId = this.projectId;
        editorHouseNum().then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let params = response.data.params;
            let orientationParams = params.orientationParams;
            let decorateIdParams = params.decorateIdParams;
            let roomUseParams = params.roomUseParams;
            if(orientationParams && orientationParams.length != 0) {
              _this.orientationParams = params.orientationParams;
            }
            if(decorateIdParams && decorateIdParams.length != 0) {
              _this.decorateIdParams = decorateIdParams;
            }
            if(roomUseParams && roomUseParams.length != 0) {
              _this.roomUseParams = roomUseParams;
            }
          }
        })
      },
      saveFormData(){
        let _this =  this;
        var flag = false;
        let form =  JSON.parse(JSON.stringify(_this.form));
        let floor = form.floor;
        if(floor == ''){
          form.floor = '-1';
        }
        modifyHouseNums(form).then(function(response){
          if(response.status == 500){
            return false;
          }else if(response.status == 0){

            _this.myAlert("数据保存成功！",'success-icon').then(res => {
              let id = _this.form.projectId;
              _this.$parent.reloadListData(id);
              _this.clearFormData();
            }).catch(err => {
            })
          }else if(response.status == 1){
            let msg = response.msg
            _this.myAlert(msg+"！",'dangerous-icon');
          }

        })
      },

      clearFormData(){
        this.$refs.formsData.resetFields();
        this.dialogNewHouseNum = false
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
    .require-word-i:before{
      content: '*';
      color: #F56C6C;
      margin-right: 1px;
    }
    .word{
      line-height:27px;
      color:12px;
    }
    .break{
      border-width: 2px;
      border-top-width:0px;
      border-style: solid;
      border-image: url("../../../images/system/border.png")  2 repeat ;
      margin:5px 0  5px;
    }
    .title-word{
      line-height:20px;
      font-size:12px;
    }
    .mearsure-unit{
      line-height:28px;
      color:#999;
      font-size:12px;
      padding:0 2px;
    }
    .padding-r-2{
      padding-right:2px;
    }
    .select {
      width: 120px;
    }
    p{
      color:#DCA96D;
      font-size:12px;
    }
    .special-word{
      color:#009933;
    }
  }
</style>
