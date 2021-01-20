  <template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" >
        <div class="pop-up-container " style="height: 152px;">
          <div class="move-content" >
            <el-form ref="formsData" :model="form">
              <div class="" style="padding:1px 0 0;" >

                <div class="clear" style="padding-top:5px;" >
                  <div class="left padding-r-3" style="width:65px;text-align:right;">
                    <span class="word "  >消耗品</span>
                  </div>
                  <div class="left require-form">
                    <el-form-item  prop="financeConsumeManageId" >
                      <el-select v-model="form.financeConsumeManageId" placeholder="" style="width:130px;" >
                        <el-option v-for="item in expendManageParams"   :label="item.name" :value="item.id" >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-3" style="width:85px;text-align:right;" >
                    <span class="word "  >消耗年月</span>
                  </div>
                  <div class="left  require-form">
                    <el-form-item  prop="time" >
                         <el-date-picker
                            size="mini"
                            type="month"
                             
                            placeholder="选择日期"
                            value-format="yyyy-MM"
                            v-model="form.time"
                            style="width: 130px;"
                        ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>

                <div class="clear" >
                  <div class="left padding-r-3" style="width:65px;text-align:right;" >
                    <span class="word "  >按个数</span>
                  </div>
                  <div class="left  require-form">
                    <el-form-item  prop="num" >
                      <el-input
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
                            style="width:100px;"
                            v-model.trim="form.day"
                            @input="checkNum2"
                            maxlength="13"
                            title="上限10位数"
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
                    <el-form-item   prop="remark" >
                      <el-input
                        type="textarea"
                        :rows="3"
                        style="width:350px;"
                        maxLength="1000"
                        title="上限1000个字"
                        class="remark"
                        v-model="form.remark">
                      </el-input>
                    </el-form-item>
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

   
  </div>
</template>
<script>

  import {expendManageDetail,addExpendRule} from '../../../service/expendData'
  export default {
    props:["layerid"],
    data() {
      return {
        expendManageParams:[],
        form:{
           id:'', 
           financeConsumeManageId:'',
           time:'',
           num:'',
           day:'',
           remark:'',
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
        expendManageDetail().then(function(response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;

            _this.expendManageParams = [{id:'',name:' ',select:true}].concat(data);
           
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
        if(!financeConsumeManageId){
            this.myAlert("消耗品不能为空!","dangerous-icon");
            return false;
        }
        if(!time){
            this.myAlert("消耗年月为空!","dangerous-icon");
            return false;
        }
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
        addExpendRule(form).then(function(response) {
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
    },
    watch:{
      'form.day':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.day = undefined;
            return;
          }
          this.form.day = oldval
        } else {
          this.form.day = newval.replace(/^\./g, "")
        }
      },
      'form.num':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.num = undefined;
            return;
          }
          this.form.num = oldval
        } else {
          this.form.num = newval.replace(/^\./g, "")
        }
      },
    },
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
