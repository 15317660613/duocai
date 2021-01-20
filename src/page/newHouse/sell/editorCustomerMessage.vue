<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'客户信息修改 【'+titlename+'】'" width="550px" @close="clearFormData" :visible.sync="dialogVisible" :append-to-body='true' >
      <div class="pop-up" style="margin-bottom: 8px;">
        <div class="pop-up-container " style="height: 154px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:0px;" >
                <div class="clear" >
                  <div class="left padding-r-3" style="width:55px;text-align:right;" >
                    <span class="word require-word" >姓名</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="name" >
                      <el-input  v-model="form.name" title="上限20个字" maxlength="20" style="width:160px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="width:55px;text-align:right;" >
                    <span class="word require-word" >手机号</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="phone" >
                      <el-input @input="checkNum1"  v-model="form.phone" title="上限15位数" maxlength="15" style="width:160px;" ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="width:55px;text-align:right;" >
                    <span class="word " >性别</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="gender" >
                      <el-select v-model="form.gender"    style="width:90px;" >
                        <el-option v-for="item in sexParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="width:45px;text-align:right;" >
                    <span class="word " >关系</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="relationshipId" >
                      <el-select v-model="form.relationshipId"    style="width:95px;" >
                        <el-option v-for="item in relationParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="width:45px;text-align:right;" >
                    <span class="word " >产权</span>
                  </div>
                  <div class="left padding-r-3">
                    <el-form-item  prop="propertyRight" >
                      <el-input @input="checkNum2"   v-model="form.propertyRight" title="上限7位数" maxlength="7" style="width:95px;" ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="width:55px;text-align:right;" >
                    <span class="word " >身份证</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="idCard" >
                      <el-input  v-model="form.idCard" title="上限18个字符" maxlength="18" style="width:160px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="width:55px;text-align:right;" >
                    <span class="word " >地址</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="adress" >
                      <el-input  v-model="form.adress" title="上限50个字" maxlength="50" style="width:160px;" ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="width:55px;text-align:right;" >
                    <span class="word " >备注</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="remark" >
                      <el-input  v-model="form.remark" title="上限50个字" maxlength="50" style="width:375px;" ></el-input>
                    </el-form-item>
                  </div>
                </div>

              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="dialogVisible = false">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
      <div class="clear footerabsoluteclass">
        <div class="left footerabsoluteclasschild" >
          <span class="record-word" style="margin-left:0px;">首次录入:</span>
          <span v-if="form.createBy" class="record-word">{{form.createBy}}</span>
          <span v-if="form.createTime" class="record-word">{{form.createTime}}</span>
          <span class="record-word footerpaddingleft10">最后修改:</span>
          <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
          <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
        </div>
      </div> 
    </el-dialog>

  </div>
</template>
<script>
  import {identifyChipsParams} from '../../../utils/sellParams'
  import {modifyPrebuyEmp,editorPrebuyEmp} from '../../../service/salesControl'
  export default {
    props:["editorCustomerMessageVisible"],
    data() {
      return {
        dialogVisible:this.editorCustomerMessageVisible,
        titlename:'',
        apartmentSelect:[],
        sexParams:identifyChipsParams.sexParams,
        relationParams:identifyChipsParams.relationParams,
        form:{
          id:'',
          prebuyId:'',
          name:'',
          phone:'',
          gender:'',
          relationshipId:'',
          propertyRight:'',
          idCard:'',
          adress:'',
          remark:'',
          createBy:'aaa',
        },
      };
    },
    components:{

    },
    methods:{
      checkNum1(){
        this.form.phone= this.form.phone.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.propertyRight= this.form.propertyRight.replace(/[^\.\d]/g,'');
      },
      showDialog(id,prebuyId,name){
        this.dialogVisible = true;
        this.form.prebuyId = prebuyId;
        this.form.id = id;
        this.titlename = name;
        this.getSelectData(id);
      },
      getSelectData(id){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        editorPrebuyEmp(id).then(function(response){
          _this.$layer.closeAll("loading");
          if(response.status == 500){
            return false;
          }else if(response.status == 0) {
              _this.form = response.data;
          }
        })
      },
      addOrDeletedPlaformCompany(item,index){
        if(index == 0){
          let obj = JSON.parse(JSON.stringify(this.connection)) ;
          this.connectionList.push(obj);
        }else{
          let arr = [];
          this.connectionList.forEach(function(item,i){
            if(index != i){
              arr.push(item);
            }
          })
          this.connectionList = arr;
        }
      },
      saveData(){
        let _this =  this;
        let form = JSON.parse(JSON.stringify(this.form));
        let name = form.name;
        let phone = form.phone;
        if(name == ''){
          this.myAlert("姓名不能为空！",'dangerous-icon');
          return false;
        }
        if(phone == ''){
          this.myAlert("电话不能为空！",'dangerous-icon');
          return false;
        }

        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        modifyPrebuyEmp(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功!",'success-icon').then(res => {
              _this.$emit("reloadMessageList");
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
        this.dialogVisible = false;
        this.connectionList = [
          {
            contactEmp:'',
            contactPhone:'',
            deleted:0,
          }
        ];
        this.$refs.formsData.resetFields();

      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:20px 25px;
    overflow:auto;
    .remark{
      border:1px solid #aaa;
      border-radius:3px;
      font-size:12px;
    }
    .padding-r-3{
      padding-right:3px;
    }
    .require-word:before{
      content: '*';
      color: #F56C6C;
      margin-right: 1px;
    }
    .word{
      line-height:27px;
    }
  }
  .padding1{
    padding-left:0px;
    display:inline-block;
    color:#000080;
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
    color:#000080;
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
    color:#000080;
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
    color:#000080;
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
    color:#000080;
  }
  .link-customer-icon{
    background:url(../../../images/icon.png) -366px -140px;
    width:25px;
    height:32px;
    display:block;
    cursor:pointer;
  }
  .add-icon{
    background:url(../../../images/icon.png) -213px -172px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
  .deleted-icon{
    background:url(../../../images/icon.png) -240px -172px;
    width:20px;
    height:20px;
    display:block;
    cursor:pointer;
  }
</style>
