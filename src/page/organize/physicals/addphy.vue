<template>
  <div style="padding: 0 10px 10px;width: 100%;">
    <div class="pop-up">
      <div class="pop-up-container" style="height: 464px;padding: 20px 0px;">
        <el-form :model="form" ref="formsDatas">
          <div class="clear" style="padding: 5px 0px 5px 30px;">
            <span style="font-weight: bold;color: #333;">基础信息</span>
          </div>

          <div class="clear">
            <div class="left m-l-45">
              <span class="des-word require-word">部门</span>
            </div>
            <div class="left p-l-2">
              <el-form-item >
                <el-select v-model="form.departId"    style="width:120px;" >
                  <el-option  v-for="item in departs"  :label="item.name" :value="item.id">
                    <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                      <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                      <span v-if="item.state=='常态'">{{item.name}}</span>
                    </span>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left m-l-15">
              <span class="des-word require-word">物理简称</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.name" style="width:130px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>

            <div class="left m-l-50">
              <span class="des-word">状态</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-select v-model="form.state"  style="width:207px;">
                  <el-option v-for="item in stateParam" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left" style="margin-left: 22px;">
              <span class="des-word require-word">物理全称</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.fullName" style="width:323px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>

            <div class="left m-l-50">
              <span class="des-word">面积</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.size" style="width:50px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left m-l-2">
              <span class="des-word">㎡</span>
            </div>

            <div class="left" style="margin-left: 22px;">
              <span class="des-word">业主</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.houseOwner" style="width:90px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left m-l-35">
              <span class="des-word require-word">负责人</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.responsibleName" style="width:130px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>

            <div class="left" style="margin-left: 48px;">
              <span class="des-word">签订日</span>
            </div>
            <div class="left p-l-5">
              <el-form-item>
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="form.signingDate"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>

            <div class="left m-l-40">
              <span class="des-word require-word">租期</span>
            </div>
            <div class="left p-l-5">
              <el-form-item>
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="form.rentStartTime"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="left p-l-5 m-l-3">
              <el-form-item>
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="form.rentEndTime"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>

          <div class="clear">
            <div class="left" style="margin-left: 53px;">
              <span class="des-word">资质</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.qualifications" style="width:130px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>

            <div class="left" style="margin-left: 33px;">
              <span class="des-word">工商</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.business" style="width:130px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>

            <div class="left m-l-50">
              <span class="des-word">公安</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.publicSecurity" style="width:207px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="break" >
          </div>

          <div class="clear" style="padding: 15px 0px 5px 30px;">
            <span style="font-weight: bold;color: #333;">缴费信息</span>
          </div>

          <div class="clear">
            <div class="left m-l-50">
              <span class="des-word">租金</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.yearRent" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left m-l-2">
              <span class="des-word">元/年</span>
            </div>

            <div class="left m-l-15">
              <el-form-item>
                <el-input v-model.trim="form.monthRent" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left m-l-2">
              <span class="des-word">元/月</span>
            </div>

            <div class="left m-l-15">
              <el-form-item>
                <el-input v-model.trim="form.unitRent" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left m-l-2">
              <span class="des-word">元/平米/天</span>
            </div>

            <div class="left m-l-15">
              <el-form-item>
                <el-input v-model.trim="form.paymentMethod" placeholder="付款方式" style="width:103px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="clear">
            <div class="left" style="margin-left: 38px;">
              <span class="des-word">物业费</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.propertyFee" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left m-l-2">
              <span class="des-word">元/年</span>
            </div>

            <div class="left m-l-15">
              <el-form-item>
                <el-input v-model.trim="form.price" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left m-l-2">
              <span class="des-word">元/平米</span>
            </div>
          </div>

          <div class="clear">
            <div class="left m-l-50">
              <span class="des-word">供暖</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.heatingCosts" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left m-l-2">
              <span class="des-word">元/年</span>
            </div>

            <div class="left m-l-15">
              <el-form-item>
                <el-input v-model.trim="form.heatingCompany" placeholder="供暖公司" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="clear">
            <div class="left m-l-50">
              <span class="des-word">网费</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-input v-model.trim="form.internetPriceYear" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left m-l-2">
              <span class="des-word">元/年</span>
            </div>

            <div class="left m-l-15">
              <el-form-item>
                <el-input v-model.trim="form.internetPriceMonth" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="left m-l-2">
              <span class="des-word">元/月</span>
            </div>

            <div class="left m-l-15">
              <el-form-item>
                <el-input v-model.trim="form.internetName" placeholder="服务商名称" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="clear">
            <div class="left m-l-80">
              <el-form-item>
                <el-input v-model.trim="form.internetPriceMonth" placeholder="用户名" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>

            <div class="left" style="margin-left: 48px;">
              <el-form-item>
                <el-input v-model.trim="form.internetPriceMonth" placeholder="用户号码" style="width:110px;" autocomplete="off"></el-input>
              </el-form-item>
            </div>

            <div class="left m-l-90">
              <span class="des-word">合约日</span>
            </div>
            <div class="left p-l-5">
              <el-form-item>
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="form.internetStartTime"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="left p-l-5 m-l-3">
              <el-form-item>
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="form.internetEndTime"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>

          <div class="clear">
            <div class="left" style="margin-left: 52px;">
              <span class="des-word">备注</span>
            </div>
            <div class="left padding-r-2">
              <el-form-item>
                <el-input
                  v-model="form.remark"
                  style="width:610px;"
                  type="textarea"
                  title="上限1000个字"
                  :maxlength="1000"
                  :rows="3"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
        <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {departparam,departcoopgetParams,departcoopinsert} from '../../../service/getdepartData'
  export default {
    props:['layerid'],
    data(){
      return{
        form:{
          departId:'',
          name:'',
          state:'',
          fullName:'',
          size:'',
          houseOwner:'',
          responsibleName:'',
          signingDate:'',
          rentStartTime:'',
          rentEndTime:'',
          qualifications:'',
          business:'',
          publicSecurity:'',
          yearRent:'',
          monthRent:'',
          unitRent:'',
          paymentMethod:'',
          propertyFee:'',
          price:'',
          heatingCosts:'',
          heatingCompany:'',
          internetName:'',
          internetStartTime:'',
          internetEndTime:'',
          remark:'',
        },
        departs:[],
        stateParam:[],
      }
    },
    methods:{
      getParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true //是否显示遮罩
        });

        departcoopgetParams().then(function(res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            let data = res.data;
            let arr1 = [{ id: "-1", name: "  ", select: true }];
            data.departs.forEach(item=>{
              arr1.push({
                id: item.id,
                name: item.label.replace(/&nbsp;/g, ""),
                level: item.level,
                select: false,
                state:item.state,
              })
            })
            _this.departs = arr1;

            _this.stateParam = data.stateParams;
            _this.stateParam.forEach((item,index)=>{
              if(index==0){
                _this.form.state = item.id;
              }
            })
          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      saveFormData(){
        let _this = this;
        if(_this.form.departId==''){
          _this.myAlert("部门不能为空!", "dangerous-icon");
          return false;
        };
        if(_this.form.name==''){
          _this.myAlert("物理简称不能为空!", "dangerous-icon");
          return false;
        };
        if(_this.form.fullName==''){
          _this.myAlert("物理全称不能为空!", "dangerous-icon");
          return false;
        };
        if(_this.form.responsibleName==''){
          _this.myAlert("负责人不能为空!", "dangerous-icon");
          return false;
        };
        if(_this.form.rentStartTime==''||_this.form.rentStartTime==null||_this.form.rentEndTime==''||_this.form.rentEndTime==null){
          _this.myAlert("租期不能为空!", "dangerous-icon");
          return false;
        };
        if(_this.form.internetStartTime=='null'||_this.form.internetStartTime==null){
          _this.form.internetStartTime = '';
        };
        if(_this.form.internetEndTime=='null'||_this.form.internetEndTime==null){
          _this.form.internetEndTime = '';
        };

        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        departcoopinsert(_this.form).then(res => {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status === 0) {
            _this.myAlert("数据保存成功！", "success-icon")
              .then(res => {
                _this.$parent.searchTableData();
                _this.clearFormData();
              })
              .catch(err => {});
          } else if (res.status === 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      clearFormData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
      this.getParamsData();
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
    },
  }
</script>

<style lang="scss" scoped>

</style>
