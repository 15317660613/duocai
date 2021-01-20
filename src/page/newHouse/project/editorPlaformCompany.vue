<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="'修改平台公司 【'+companyTitle+'】'" width="550px" @close="clearFormData" :visible.sync="dialogVisible" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " >
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:0px;" >
                <div class="clear" >
                  <div class="left padding-r-3" style="padding-left:22px;" >
                    <span class="word require-word" >平台公司</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="platformCompany" >
                      <el-input  v-model="form.platformCompany" title="上限50个字" maxlength="50" style="width:360px;" ></el-input>
                    </el-form-item>
                  </div>

                </div>

                <div v-if="item.deleted == 0" class="clear" v-for="(item , index) in connectionList" >

                  <div class="left padding-r-3">
                    <div class="left" style="padding:5px 2px 0 0;" >
                      <i :class="{'add-icon':index == 0,'deleted-icon':index != 0}" @click="addOrDeletedPlaformCompany(item,index)"  ></i>
                    </div>
                    <div class="left" >
                      <span class="word require-word"  >联系人员</span>
                    </div>
                  </div>
                  <div class="left">
                    <el-form-item   >
                      <el-input  v-model="item.contactEmp" title="上限15个字" maxlength="15"  style="width:145px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="padding-left:12px;" >
                    <span class="word require-word"  >联系电话</span>
                  </div>
                  <div class="left">
                    <el-form-item   >
                      <el-input @input="checkNum(item)"  v-model="item.contactPhone" title="上限15位数" maxlength="15"  style="width:145px;" ></el-input>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="padding-left:51px;" >
                    <span class="word "  >备注</span>
                  </div>
                  <div class="left" style="padding-top:5px;" >
                   
                      <textarea
                        type="textarea"
                        style="width:360px;height:60px;resize: none;"
                        class="remark"
                        maxLength="1000"
                        title="上限1000个字"
                        v-model="form.remark"></textarea>
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

    </el-dialog>

  </div>
</template>
<script>

  import {editorPlaformCompany,modifyPlaformCompany} from '../../../service/newHouse'
  export default {
    props:["editorPlatformCompanyVisible"],
    data() {
      return {
        dialogVisible:this.editorPlatformCompanyVisible,
        checkHouse:false,
        companyTitle:'',
        processWayIdParams:[],
        departTree:[],
        userList:[],
        time:'',
        houseName:'',
        connection:{
          contactEmp:'',
          contactPhone:'',
          deleted:0,
        },
        connectionList:[
          {
            contactEmp:'',
            contactPhone:'',
            deleted:0,
          }
        ],
        form:{
          id:'',
          platformCompany:'',
          remark:'',
        },
      };
    },
    components:{

    },
    methods:{
      checkNum(item){
        item.contactPhone = item.contactPhone.replace(/[^\.\d]/g,'');
      },
      showDialog(id,companyTitle){
        this.dialogVisible = true;
        this.companyTitle = companyTitle;
        this.edigorPlaformCompanyData(id);
      },
      edigorPlaformCompanyData(id){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        editorPlaformCompany(id).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
              let data = response.data;
              _this.form = data.platform;
              _this.connectionList = data.emps;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      addOrDeletedPlaformCompany(item,index){
        debugger;
        if(index == 0){
          let obj = JSON.parse(JSON.stringify(this.connection)) ;
          this.connectionList.push(obj);
        }else{
          if(item.id){
            item.deleted = 1;
          }else {
            let arr = [];
            this.connectionList.forEach(function (item, i) {
              if (index != i) {
                arr.push(item);
              }
            })
            this.connectionList = arr;
          }
        }
      },
      saveData(){
        let _this =  this;
        let form = JSON.parse(JSON.stringify(this.form));
        let platformCompany = form.platformCompany;
        let connectionList = this.connectionList;
        let flag = false;
        if(!platformCompany){
          this.myAlert("平台公司为空！",'dangerous-icon');
          return false;
        }
        for(let i = 0 ; i < connectionList.length ; i ++){
          if(connectionList[i].contactEmp == ''){
            this.myAlert("联系人员为空！",'dangerous-icon');
            flag = true;
            break;
          }
          if(connectionList[i].contactPhone == ''){
            this.myAlert("联系电话为空！",'dangerous-icon');
            flag = true;
            break;
          }
        }
        if(flag){
          return false;
        }
        form.emps = JSON.stringify(this.connectionList);
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        modifyPlaformCompany(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功！",'success-icon').then(res => {

              _this.clearFormData();
              _this.$emit("reloadPlaformCompany");
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
    padding:5px 0 0px 10px;
    height:158px;
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
