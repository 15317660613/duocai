<template>
  <div style="padding: 0 10px 10px;width: 100%;">
    <div class="pop-up" >
      <div class="pop-up-container " style="height: 154px;padding:15px;">
        <el-form :model="form" ref="formsDatas">
          <div class="clear">
            <div class="left m-l-20">
              <span class="des-word require-word">部门物理名称</span>
            </div>
            <div class="left  m-l-2">
              <el-form-item>
                <el-select v-model="form.oldPreId"  @change="paramsUnit2Func"  style="width:120px;" >
                  <el-option  v-for="item in params1"  :label="item.name" :value="item.id">
                    <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                      <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                      <span v-if="item.state=='常态'">{{item.name}}</span>
                    </span>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left m-l-2">
              <el-form-item>
                <el-select v-model="form.id" style="width:120px;">
                  <el-option v-for="item in params2" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="clear">
            <div class="left m-l-20">
              <span class="des-word require-word">调动到部门下</span>
            </div>
            <div class="left  m-l-2">
              <el-form-item>
                <el-select v-model="form.newPreId" style="width:120px;" >
                  <el-option  v-for="item in params3"  :label="item.name" :value="item.id">
                    <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                      <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                      <span v-if="item.state=='常态'">{{item.name}}</span>
                    </span>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="m-t-20 m-l-20">
            <span class="span" style="color: #088383;">
              物理名称调动后，不影响该物理单位信息，相关数据跟随调动。
            </span>
          </div>
        </el-form>
      </div>
      <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
        <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="savedata" >保 存</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {departcoopgetParams,departcoopgetPlaceByDepart} from '../../../service/getdepartData'
  import {departchangeDepartPlace} from '../../../service/PhysicalManagement'
  export default {
    props:['layerid'],
    data(){
      return{
        form:{
          id:'',
          newPreId:'',
          oldPreId:'',
        },
        params1:[],
        params2:[],
        params3:[],
      }
    },
    
    methods:{
      //初始下拉
      getParamsData(){
        let _this=this;
        this.$layer.loading({
          shade: true //是否显示遮罩
        });
        departcoopgetParams().then(function (res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            let arr1 = [{ id: "-1", name: "  ", select: true }];
            res.data.departs.forEach(item=>{
              arr1.push({
                id: item.id,
                name: item.label.replace(/&nbsp;/g, ""),
                level: item.level,
                select: false,
                state:item.state,
              })
            })
            _this.params1 = arr1;
            _this.params3 = arr1;
          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      //物理下拉
      paramsUnit2Func(){
        let _this = this;
        _this.$layer.loading({
          shade: true
        });
        departcoopgetPlaceByDepart(_this.form.oldPreId).then(function(res) {
          _this.$layer.closeAll('loading');
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            let data = res.data;
            let arr3 = [{id:-1,name:'  ',select:true}];
            data.forEach(item=>{
              arr3.push({
                id:item.id,
                name: item.name.replace(/&nbsp;/g, ""),
                select: false,
              })
            })
            _this.params2 = arr3;
          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      //保存
      savedata(){
        let _this=this;
        if(_this.form.id==''){
          _this.myAlert("物理单位不能为空!", "dangerous-icon");
          return false;
        };
        if(_this.form.newPreId==''){
          _this.myAlert("调动到部门不能为空!", "dangerous-icon");
          return false;
        };
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        departchangeDepartPlace(_this.form).then(function (res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status === 0) {
            _this.myAlert("物理调动成功!", "success-icon")
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
      }
     },
    mounted(){
      this.getParamsData();
    },
  }
</script>

<style lang="scss" scoped>
  .padding1{
    padding-left:0px;
    display:inline-block;
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
  }
</style>