<template>
  <div style="padding: 0px 10px;width: 100%;">
      <div class="pop-up" style="padding:10px 10px 27px 10px;">
        <div class="pop-up-container" style="margin: 0px;height: 308px;">
          <el-form ref="formsData"  :model="form" >
            <div style="padding: 10px 15px;">
              <el-form-item>
                <div class="clear">
                  <span style="color: #993300;">购房客源</span>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="clear">
                  <div class="left">
                    <span>客源</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num1" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>客跟</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num2" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                </div>
              </el-form-item>

              <el-form-item>
                <div class="clear">
                  <span style="color: #993300;">租房客源</span>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="clear">
                  <div class="left">
                    <span>客源</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num3" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>客跟</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num4" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                </div>
              </el-form-item>

              <el-form-item>
                <div class="clear">
                  <span style="color: #993300;">A二级渠道</span>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="clear">
                  <div class="left">
                    <span>报备</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num5" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>带看</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num6" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>排卡</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num7" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                </div>
              </el-form-item>

              <el-form-item>
                <div class="clear">
                  <span style="color: #993300;">B三级买卖</span>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="clear">
                  <div class="left">
                    <span>房增</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num8" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>房跟</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num9" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>带看</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num10" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>钥匙房</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num11" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>图照房</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num12" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>视频房</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num13" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                </div>
              </el-form-item>

              <el-form-item>
                <div class="clear">
                  <span style="color: #993300;">C三级租赁</span>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="clear">
                  <div class="left">
                    <span>房增</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num14" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>房跟</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num15" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>带看</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num16" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>钥匙房</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num17" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>图照房</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num18" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                  <div class="left m-l-15">
                    <span>视频房</span>
                  </div>
                  <div class="left" style="margin-left: 2px;">
                    <el-input v-model="form.num19" style="width: 40px;" title='0-4位数' maxlength="4"></el-input>
                  </div>
                </div>
              </el-form-item>
            </div>
            
          </el-form>
        </div>
        <div  style="margin-top:3px">
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        </div>
      </div>

  </div>
</template>

<script>

export default {
  props:['myids','mydateType','layerid'],
  data() {
    return {
      form:{  
        num1:'',num2:'',num3:'',num4:'',num5:'',num6:'',num7:'',num8:'',num9:'',num10:'',
        num11:'',num12:'',num13:'',num14:'',num15:'',num16:'',num17:'',num18:'',num19:'',
      },
    };
  },
  components: {

  },
  methods: {
    saveFormData(){
      let _this = this;
      let form = JSON.parse(JSON.stringify(_this.form));
      _this.myAlert("批量指标设置成功!", "success-icon")
        .then(res => {
          _this.$parent.setTableDatafunc(form);
          _this.clearFormData();
        })
        .catch(err => {});
    },
    clearFormData(){
      let _this = this;
      _this.$layer.close(_this.layerid);
    },
  },

  mounted() {

  }
};
</script>
<style lang="scss" scoped>

</style>