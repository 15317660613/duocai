<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" v-dialogDrag title="新增销售公司" width="550px" @close="clearFormData" :visible.sync="dialogVisible" :append-to-body='true' >
      <div class="pop-up" >
        <div class="pop-up-container " style="height: 162px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:0px;" >
                <div class="clear" >
                  <div class="left padding-r-3" style="width:80px;text-align:right;" >
                    <span class="word require-word" >销售公司</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="contactCompany" >
                      <el-input  v-model="form.contactCompany" title="上限50个字" maxlength="50" style="width:360px;" ></el-input>
                    </el-form-item>
                  </div>

                </div>

                <div class="clear" >
                  <div class="left padding-r-3" style="width:80px;text-align:right;" >
                    <span class="word " >开始日期</span>
                  </div>
                  <div class="left" >
                    <el-form-item   prop="contactStartDate"  >
                      <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.contactStartDate" style="width: 145px;"></el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="width:70px;text-align:right;">
                    <span class="word "  >结束日期</span>
                  </div>
                  <div class="left" >
                    <el-form-item   prop="contactEndDate" >
                      <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.contactEndDate" style="width: 145px;"></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left padding-r-3" style="width:80px;text-align:right;" >
                    <span class="word " >备注</span>
                  </div>
                  <div class="left">
                    <el-form-item  prop="remark" >
                      <el-input  v-model="form.remark" title="上限50个字" maxlength="50" style="width:360px;" ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div v-if="item.deleted == 0" class="clear" v-for="(item , index) in connectionList" >

                  <div class="left padding-r-3">
                    <div class="left" style="padding:5px 2px 0 0;" >
                      <i :class="{'add-icon':index == 0,'deleted-icon':index != 0}" @click="addOrDeletedPlaformCompany(item,index)"  ></i>
                    </div>
                    <div class="left" >
                      <span class="word require-word"  >销售人员</span>
                    </div>
                  </div>
                  <div class="left">
                    <el-form-item   >
                      <el-input  v-model="item.contactEmp" title="上限10个字" maxlength="10"  style="width:145px;" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="padding-left:20px;" >
                    <span class="word "  >销售电话</span>
                  </div>
                  <div class="left">
                    <el-form-item   >
                      <el-input @input="checkNum(item)"  v-model="item.contactPhone" title="上限15位数" maxlength="15"  style="width:145px;" ></el-input>
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

    </el-dialog>

  </div>
</template>
<script>

  import {addSaleCompany} from '../../../service/newHouse'
  export default {
    props:["newSaleCompanyVisible"],
    data() {
      return {
        dialogVisible:this.newSaleCompanyVisible,
        checkHouse:false,
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
          projectId:'',
          contactCompany:'',
          contactStartDate:'',
          contactEndDate:'',
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
      showDialog(id){
        this.dialogVisible = true;
        this.form.projectId = id;
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
        let contactCompany = form.contactCompany;
        let connectionList = this.connectionList;
        let flag = false;
        if(!contactCompany){
          this.myAlert("销售公司为空！",'dangerous-icon');
          return false;
        }
        for(let i = 0 ; i < connectionList.length ; i ++){
          if(connectionList[i].contactEmp == ''){
            this.myAlert("销售人员为空！",'dangerous-icon');
            flag = true;
            break;
          }
          if(connectionList[i].contactPhone == ''){
            this.myAlert("销售电话为空！",'dangerous-icon');
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
        addSaleCompany(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("数据保存成功!",'success-icon').then(res => {

              _this.clearFormData();
              _this.$emit("reloadAgentCompanyList",2);
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
    padding:10px 0 0px 5px;
    height:170px;
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
