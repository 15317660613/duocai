<template>
  <el-dialog
    v-dialogDrag
    style=" height:100%"
    overflow="auto"
    id="addons"
    :close-on-click-modal="false"
    title="新增年月账套"
    :visible.sync="addbookVisible"
    width="350px"
  >
    <div class="pop-up" >
      <div class="pop-up-container" style="height: 112px;">
        <el-form :model="abform" :rules="rules" ref="form" label-width="60px" class="demo-ruleForm" style="height:100px">
          <div class="wf fll clear" style="padding-top: 20px">
            <el-form-item class="fll" label="选择职位" prop="cjob" style="margin-top: 0px">
              <el-select style="width: 82px" v-model="abform.chjob" >
                <el-option :id="tech.id" v-for="tech in abform.cjob" :label="tech.label" :value="tech.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="fll" label="选择年月" prop="cyear" style="">
              <el-date-picker  value-format="yyyy-MM" size="mini" type="month"   v-model="abform.cyear" style="width: 82px;"></el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
        <span class="right save-cancel-btn" @click="addbookVisible=false" >取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="savebook" >保 存</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import {dutytree} from '../../../service/organizeDate'
  import {addbuk} from '../../../service/jobData'

  export default {
    name: 'addsbooks',
    data(){
      return{
        addbookVisible:false,
        abform:{
          chjob:"",
          cjob:[],
          cyear:"",

        },
        rules:{
          cjob:[
            { required: true, message: ' ', trigger: ' ' },
          ],
          cyear:[
            { required: true, message: ' ', trigger: ' ' },
          ],
        },
      }
    },
    methods:{
          showbk(){
            let _this=this
            this.abform.chjob=""
            this.abform.cyear=""
            this.addbookVisible=true
            dutytree().then(function (res) {
              _this.abform.cjob=res.data

            })
          },
          savebook(){
            let _this=this
            let staffId=this.abform.chjob
            let time=this.abform.cyear.toString()
            if(!staffId){
               _this.myAlert("职位不能为空！", 'dangerous-icon')
              return false;
            }
            if(!time){
              _this.myAlert("年月不能为空！", 'dangerous-icon')
              return false;
            }
            this.$layer.loading({
              shade: true,//是否显示遮罩
            });
            addbuk(staffId, time).then(function (response) {
              
              _this.$layer.closeAll("loading");
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                _this.myAlert("数据保存成功！", 'success-icon').then(res => {
                  _this.addbookVisible=false;
                  _this.$emit('search');
                }).catch(err => {

                })
              } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message + "！");
              }
            })

          }



    }

  }
</script>

<style scoped>
  .pop-up .pop-up-container /deep/ .el-form-item__label {
    width: 68px!important;
  }
  span{
    font-family: '微软雅黑';
    font-size: 12px;
  }
  .wf{
    margin-left: 60px;
  }
  .buttons{
    border-width: 0px;
    margin-top: 10px;
    margin-bottom:10px ;
    width: 87px;
    height: 20px;
    background: inherit;
    background-color: rgba(223, 218, 213, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(102, 102, 102, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #1E1E1E;
  }
</style>
