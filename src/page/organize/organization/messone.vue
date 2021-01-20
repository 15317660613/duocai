<template>
  <div class="" style="height:475px" >
    <div class="pop-up-container" style="height: 442px">
      <el-form :model="formlist" :rules="rules" ref="formsData" label-width="68px" class="demo-ruleForm" style="height: 250px">
        <div class="cr" style="width: 682px;height:85px;margin-left: 20px;margin-top: 10px">
          <el-form-item label="姓名" prop="names" style="width: 160px;">
            <div class="dib cr"><input v-model.trim="formlist.name" title="上限10个字" maxlength="10" style="width: 100px"></div>
            <div class="conr dib fll cr" style="margin-top: -23px;margin-left: 100px">
              <input  class="ffinput fll" v-model.trim="formlist.age"disabled style="width: 30px;">
            </div>
          </el-form-item>
          <el-form-item label="人员编号" prop="pnum" style="width: 160px;">
            <div class="dib"><input v-model.trim="formlist.personnum" title="必须5位数" maxlength="5"style="width: 132px"></div>
          </el-form-item>
          <el-form-item label="身份证号" prop="cid" style="width: 260px;">
            <div class="dib"><input @change="getAge" v-model.trim="formlist.cid" title="上限18个字符" maxlength="18"style="width: 132px"></div>
          </el-form-item>
          <el-form-item class="fll " label="部门" prop="departs" style="width:160px;margin-top: -84px;margin-left: 234px;">
            <div class="dib">
              <select v-model="formlist.departName" class="ffinput fll selectno" disabled style="width: 132px;margin-top: -13px;height: 21px;">
                <option>{{formlist.departName}}</option>
              </select>
            </div>
          </el-form-item>
          <el-form-item class="fll" label="性别" prop="genders" style="width: 160px;margin-top: -54px;margin-left: 234px;">
            <div class="dib">
              <el-select v-model.trim="formlist.gender" style="width: 40px">
                <el-option :id="coupon.name" :value="coupon.name"  v-for="coupon in ges" ></el-option>
              </el-select>
            </div>

          </el-form-item>
           <el-form-item class="fll" label="自定" prop="selfNum" style="width: 160px;margin-top: -54px;margin-left: 325px;">
              <div class="dib">
                <el-select v-model="selfNum" style="width: 40px">
                  <el-option  value="" label=" "  ></el-option>
                  <el-option  :value="elem.id" :label="elem.name"  v-for="elem in numParams" ></el-option>
                </el-select>
              </div>
            </el-form-item>
          <el-form-item class="fll" label="电话" prop="phones" style="width: 160px;margin-top: -24px;margin-left: 234px;">
            <div class="dib"><input v-model.trim="formlist.mobeil" title="0-15位数" maxlength="15"style="width: 132px"></div>
          </el-form-item>

          <div >
            <div class="item_bock head_p">
              <div class="head_img">
                <img :src="formlist.userInfo.avatar"/>
              </div>
            </div>
            <div class="setting_right" >
              <div class="caption" style="margin-top: -78px;color: black">头像</div>
              <div  @click.stop="uploadHeadImg" class="caption" style="margin-top: -52px;margin-left: -26px; cursor:pointer;">上传/修改</div>
            </div>
            <input type="file" accept="image/*" @change="handleFile($event)" class="hiddenInput"/>
          </div>
        </div>
        <div class="break" style="width:660px;margin:5px 0 0px 25px;" >

        </div>
        <div class="cr" style="width: 682px;height:100px;margin-left: 20px;">
          <el-form-item label="毕业院校" prop="school" style="width: 160px;">
            <div class="dib cr"><input v-model.trim="formlist.fschool" title="上限20个字,数字/字母/汉字" maxlength="20" style="width: 132px"></div>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email" style="width: 160px;margin-top: 3px">
            <div class="dib"><input v-model.trim="formlist.email" title="上限30个字,数字/字母/汉字" maxlength="30" style="width: 132px"></div>
          </el-form-item>
          <el-form-item label="籍贯" prop="nativ" style="width: 160px;margin-top: 3px">
            <div class="dib"><input v-model.trim="formlist.native" title="上限30个字,数字/字母/汉字" maxlength="30"style="width: 132px"></div>
          </el-form-item>

          <el-form-item class="fll" label="所学专业" prop="major" style="width:160px;margin-top: -89px;margin-left: 234px;">
            <div class="dib">
              <input v-model.trim="formlist.major" title="上限10个字,数字/字母/汉字" maxlength="10"style="width: 132px">
            </div>
          </el-form-item>
          <el-form-item class="fll" label="最高学历" prop="edcution" style="width: 160px;margin-top: -59px;margin-left: 234px;">
            <div class="dib">
              <el-select style="width: 132px" v-model="formlist.heducation" >
                <el-option :id="coupon.id" :value="coupon.id" :label="coupon.name" :selected="coupon.select" v-for="coupon in form.educationd" ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item class="fll" label="民族" prop="national" style="width: 160px;margin-top: -29px;margin-left: 234px;">
            <div class="dib">
              <el-select style="width: 132px" v-model="formlist.national" >
                <el-option :id="na.id" :value="na.id" :label="na.name"v-for="na in formlist.nationalsd" ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item class="fll" value-format="yyyy-MM-dd" label="毕业时间" prop="finishtime" style="width:160px;margin-top: -84px;margin-left: 474px;">
            <div class="dib sdsd">
              <el-date-picker  size="mini" type="date"   value-format="yyyy-MM-dd" v-model="formlist.finshdate" style="width: 132px;"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item class="fll" label="来源方式" prop="sourc" style="width: 160px;margin-top: -54px;margin-left: 474px;">
            <div class="dib">
              <el-select style="width: 132px" v-model="formlist.source" >
                <el-option :id="so.id"  :value="so.id" :label="so.name"v-for="so in formlist.sourcesd" ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item class="fll" label="政治面貌" prop="polite" style="width: 160px;margin-top: -24px;margin-left: 474px;">
            <div class="dib">
              <el-select style="width: 132px" v-model="formlist.politic" >
                <el-option :id="po.id" :value="po.id" :label="po.name"v-for="po in formlist.politicsd" ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
        <div class="cr" style="width: 682px;height:100px;margin-left: 20px;margin-top: -20px">
          <el-form-item label="家庭住址" prop="address" style="width: 160px;">
            <div class="dib cr"><input v-model.trim="formlist.home" title="上限30个字,数字/字母/汉字" maxlength="30" style="width: 366px"></div>
          </el-form-item>
          <el-form-item label="银行卡号" prop="bid" style="width: 380px;">
            <div class="fll "><input v-model.trim="formlist.bank" title="银行名称,上限10个字" maxlength="10" style="width: 100px"></div>
            <div class="dib fll" style="margin-top: -28px;margin-left: 102px"><input v-model.trim="formlist.bankid" title="银行卡号,上限30个字" maxlength="30" style="width: 264px"></div>
          </el-form-item>
          <el-form-item label="个人爱好" prop="hobby" style="width: 160px;">
            <div class="dib"><input v-model.trim="formlist.hobby" title="上限20个字,数字/字母/汉字" maxlength="20" style="width: 366px"></div>
          </el-form-item>
          <el-form-item class="fll" label="技术职称" prop="technology" style="width:160px;margin-top: -84px;margin-left: 474px;">
            <div class="dib">
              <el-select style="width: 132px" v-model="formlist.technicaltitle" >
                <el-option :id="tech.id" :value="tech.id" :label="tech.name" v-for="tech in formlist.technicaltitlesd" ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item class="fll sdsd" label="阳历生日" prop="brithday" style="width: 160px;margin-top: -54px;margin-left: 474px;">
            <div class="dib">
              <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="formlist.ebdate" style="width: 132px;"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item class="fll sdsd" label="阴历生日" prop="lunar" style="width: 160px;margin-top: -24px;margin-left: 474px;">
            <el-date-picker  value-format="yyyy-MM-dd" size="mini" type="date"   v-model="formlist.lunar" style="width: 132px;"></el-date-picker>
          </el-form-item>
        </div>
        <div class="cr" style="width: 682px;height:100px;margin-left: 20px;margin-top: -20px">
          <el-form-item label="个人签名" prop="singn" style="width: 160px;">
            <div class="dib cr"><input v-model.trim="formlist.psignature" title="上限20个字,数字/字母/汉字" maxlength="20" style="width: 600px"></div>
          </el-form-item>
          <el-form-item label="基础备注" prop="premark1" style="padding-bottom: 10px;padding-top: 5px">
            <textarea  v-model.trim="formlist.remarknn" title="上限1000个字符" maxlength="1000" style="width: 600px;height: 80px;vertical-align:top"></textarea>
          </el-form-item>
        </div>


      </el-form>
    </div>
    <div slot="footer" class="footer-btn clear" style="padding:5px 0;"  >
      <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData" >取 消</span>
      <span class="right save-cancel-btn" type="primary"  @click="sves"  >保 存</span>
    </div>
  </div>
</template>

<script>
  import {userde} from '../../../service/organizeDate'

  export default {
    name: 'messone',
    props:["personid","dename","form","numParams"],
    data() {
      return {
        formlist:this.form,
        personaldialog:this.editormessage,
        newdeid:"",
        newdelabel:"",
        ssdui:"",
        
        ges:[
          {name:"男"},{name:"女"},
        ],
        selfNum:this.form.selfNum,
        rules:{
          names:[
            { required: true, message: ' ', trigger: ' ' },
          ],
          departs:[
            { required: true, message: ' ', trigger: ' ' },
          ],
          genders:[
            { required: true, message: ' ', trigger: ' ' },
          ],
          cid:[
            { required: false, message: ' ', trigger: ' ' },
          ],
          address:[
            { required: false, message: ' ', trigger: ' ' },
          ],
          lunar:[
            { required: false, message: ' ', trigger: ' ' },
          ],
          phones:[
            { required: false, message: ' ', trigger: ' ' },
          ],
        },

      }
    },
    mounted () {
      this.re()
    },
    methods:{
      cancelData(){
         this.$emit("cancelData");
      },
      upPage(){
        this.$emit("upPage");
      },
      downPage(){
        this.$emit("downPage");
      },
      re(){
        if(this.formlist.nongli==1){
             this.rules.lunar[0].required=true
        }
        if(this.formlist.mustphone==1){
          this.rules.phones[0].required=true
        }
        if(this.formlist.mustaddress==1){
          this.rules.address[0].required=true
        }
        if(this.formlist.mustcid==1){
          this.rules.cid[0].required=true
        }
      },
      // 打开图片上传
      uploadHeadImg() {
        this.$el.querySelector('.hiddenInput').click()
      },
      // 将头像显示
      handleFile(e) {
        this.formlist.photos= e.target.files;
        let $target = e.target || e.srcElement
        let file = $target.files[0]
        var reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          this.formlist.userInfo.avatar = res.result
        }
        reader.readAsDataURL(file)
      },
      //年龄显示
      getAge(){
        let dat=this.form.cid
        let d1=""
        let d2=""
        let d3=""
        if(dat!=null){
          if(dat.length==18){
            dat=dat.substr(6)
            dat=dat.substr(0,8)
            d1=dat.substr(0,4)
            dat=dat.substr(4)
            d2=dat.substr(0,2)
            d3=dat.substr(2)
            dat=d1+"-"+d2+"-"+d3

            let birthdays = new Date(dat.replace(/-/g, "/"));
            let d = new Date();
            let age =
              d.getFullYear() -
              birthdays.getFullYear() /*-
             (d.getMonth() < birthdays.getMonth() ||
             (d.getMonth() == birthdays.getMonth() &&
             d.getDate() < birthdays.getDate())
             ? 1
             : 0)*/;
            this.form.age = age;
          }
        }
        this.selfNum = this.form.selfNum;
      },
      sves(){
        let aa=this.formlist;
        aa.selfNum = this.selfNum;
        this.$emit('alldate')
      }
    },

    watch: {
      form: {
        handler (newValue, oldValue) {
          this.formlist=newValue
        }
      }
    }
  }
</script>

<style scoped>
  el-form-item__label{
    width: 68px!important;
  }
  .down-page-icon{
    background:url(../../../images/icon.png) -81px -118px;
    width:17px;
    height:17px;
    display:block;
    cursor:pointer;
  }
  .up-page-icon{
    background:url(../../../images/icon.png) -105px -120px;
    width:17px;
    height:17px;
    display:block;
    cursor:pointer;
  }
  /deep/.pop-up .pop-up-container .el-input__prefix {
          left: 100px;
        }
  /deep/.sdsd .el-input__prefix {
          /*margin-left: 43px;*/
        }
  /*.item_bock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:77px;
    width: 100px;
    padding:0px 24px 0px 38px;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
  }*/
  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }
  .head_p {
    height:132px;
  }
  .head_img{
    width:75px;
    height: 75px;
    border: 1px solid black;
    float: left;
    margin-left: 146px;
    margin-top: -76px;
  }
  .head_img img{
    width:73px;
    height:73px;

    /*border-radius:50px*/
  }
  .setting_right{
    display: flex;
    height: 37px;
    justify-content: flex-end;
    align-items: center;
  }
  .hiddenInput{
    display: none;
  }
  .caption {
    border-width: 0px;
    position: absolute;
    left: 527px;
    top: 97px;
    width: 54px;
    height: 15px;
    font-size: 12px;
    color: #336699;
  }

  .fll{
    float: left;
  }
  .cr{
    clear: both;
  }
  .dib{
    display: inline-block;
  }
  input {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
  }
  .selectno {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
  }
  .ffinput{
    position: absolute;
    width: 29px;
    height: 20px;
    background-color: #D7D7D7;
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-decoration: none;
    color: #000000;
    text-align: center;
    padding: 1px 0px 1px 0px;
    box-sizing: border-box;
  }
  .conr{
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333333;
    text-align: center;
    line-height: normal;
  }
  span{
    font-family: '微软雅黑';
    font-size: 12px;
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
