<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="height: 152px;">
          <div class="move-content">
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:1px 0 0;" >

                <div class="clear" >
                  <div class="left padding-r-3" style="width:65px;text-align:right;" >
                    <span class="word "  >按个数</span>
                  </div>
                  <div class="left  require-form">
                    <el-form-item  prop="num" >
                      <el-input
                            :disabled="hasUserDisabled"
                            style="width:100px;"
                            @input="checkNum1"
                            v-model.trim="form.num"
                             maxlength="5"
                            title="上限5位数"
                        ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3">
                    <span class="word"  >元/个</span>
                  </div>
                  <div class="left padding-r-3" style="width:83px;text-align:right;" >
                    <span class="word "  >按天数</span>
                  </div>
                  <div class="left  require-form">
                    <el-form-item  prop="day" >
                        <el-input
                            :disabled="hasUserDisabled"
                            style="width:100px;"
                            v-model.trim="form.day"
                            @input="checkNum2"
                            maxlength="5"
                            title="上限5位数"
                        ></el-input>
                    </el-form-item>
                  </div>
                   <div class="left padding-r-3">
                    <span class="word "  >元/天</span>
                  </div>
                </div>

                <div class="clear"  >
                  <div class="left padding-r-3" style="width:65px;text-align:right;" >
                    <span class="word"  >备注</span>
                  </div>
                  <div class="left" style="padding-top:7px;" >
                      <el-input
                        :disabled="hasUserDisabled"
                        type="textarea"
                        :rows="3"
                        style="width:344px;"
                        maxLength="1000"
                        title="上限1000个字"
                        class="remark"
                        v-model="form.remark">
                      </el-input>
                   
                  </div>    
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">保 存</span>
        </div>
      </div>
      <div class="clear footerabsoluteclass">
        <div class="left footerabsoluteclasschild" >
          <span class="record-word footerpaddingleft10">最后修改:</span>
          <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
          <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
        </div>
      </div>
   
  </div>
</template>
<script>

  import {detialExpendRule,modifyExpendRule} from '../../../service/expendData'
  export default {
    props:["id","layerid"],
    data() {
      return {
        expendManageParams:[],
        hasUserDisabled:false,
        form:{
           id:'', 
           financeConsumeManageId:'',
           time:'',
           num:'',
           day:'',
           remark:'',
           updateBy:'',
           updateTime:'',
           useNum:0,
        },
      };
    },
    components:{
    },
    methods:{
      checkNum1(){
          this.form.num= this.form.num.replace(/[^\d]/g,'');
      },
      checkNum2(){
           this.form.day= this.form.day.replace(/[^\d]/g,'');
      },  
       //获取跟进参数
      getExpendData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let id = this.id;
        let form = {id:id};
        detialExpendRule(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.financeExpenditure;
            for(let attr in data){
                if(data[attr] == null){
                    data[attr] = '';
                }
            }
            let useNum = data.useNum;
            if(useNum && useNum > 0){
              _this.hasUserDisabled = true;
            }
            _this.form = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      saveData(){
        let _this =  this;
        let form = JSON.parse(JSON.stringify(_this.form));
        let financeConsumeManageId = form.financeConsumeManageId;
        let time = form.time;
        let num = form.num;
        let day = form.day;
        
        if(num == ''){
            this.myAlert("按个数不能为空!","dangerous-icon");
            return false;
        }
        if(day == ''){
            this.myAlert("按天数不能为空!","dangerous-icon");
            return false;
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        modifyExpendRule(form).then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
             _this.myAlert("数据保存成功",'success-icon').then(res => {
		      _this.$parent.getExpendRuleData();
              _this.cancelData();
            }).catch(err => {
             
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
        
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
    },
    mounted(){
        this.getExpendData();
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    
    .remark{
      border:1px solid #aaa;
      border-radius:3px;
      font-size:12px;
    }
    .word{
      line-height:27px;
    }
    .padding-r-3{
        padding-right:3px;
    }
  }
  
</style>
