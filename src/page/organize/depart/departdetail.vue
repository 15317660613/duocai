<template>
  <div style="width:100%;" >
    <div class="pop-up" style="margin:0 10px 10px;padding-bottom: 34px;" >
      <el-tabs type="border-card" v-model="activeName" @tab-click="changeTab" >
        <el-tab-pane label="部门信息" name="building" >
          <span slot="label" >部门信息</span>
           <div style="width:100%;"  >
            <div class="pop-up-container" style="height: 432px;overflow: auto;">
              <el-form :model="form"  ref="formsData" class="demo-ruleForm" style="height: 428px">
                  <div style="width: 100%;float: left;margin-top: 10px;" >
                    <span class="foss" style="margin-left: 15px;color: #990000;">基础信息</span>
                  </div>
                  <div class="clear" style="width: 100%;">
                    <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                        <span class="des-word" >部门编号</span>
                    </div>  
                    <div class="left clear" >
                      
                      <el-form-item   >
                        <div style="float: left">
                          <el-select  :disabled="form.level != 1 ? true : false"   v-model="form.num1" placeholder=""  style="width: 60px">
                            <el-option
                              v-for="item in options1"
                              :label="item.label"
                              :disabled="item.disabled"
                              :value="item.label">{{item.label}}
                            </el-option>
                          </el-select>
                        
                        </div>
                        <div style="float: left">
                          <el-select  :disabled="form.level != 2 ? true : false"  v-model="form.num2" placeholder=""  style="width: 60px">
                            <el-option
                              v-for="item in options2"
                              :disabled="item.disabled"
                              :label="item.label"
                              :value="item.label">{{item.label}}
                            </el-option>
                          </el-select>
                        
                        </div>
                        <div style="float: left">
                          <el-select :disabled="form.level != 3 ? true : false" v-model="form.num3" placeholder=""  style="width: 60px">
                            <el-option
                              v-for="item in options3"
                              :disabled="item.disabled"
                              :label="item.label"
                              :value="item.label">{{item.label}}
                            </el-option>
                          </el-select>
                        
                        </div>
                        <div style="float: left">
                          <el-select :disabled="form.level != 4 ? true : false" v-model="form.num4"  placeholder=""  style="width: 60px">
                            <el-option
                              v-for="item in options4"
                              :disabled="item.disabled"
                              :label="item.label"
                              :value="item.label">{{item.label}}
                            </el-option>
                          </el-select>
                          
                        </div>
                        <div style="float: left">
                          <el-select :disabled="form.level != 5 ? true : false" v-model="form.num5"  placeholder="" style="width: 60px">
                            <el-option
                              v-for="item in options5"
                              :disabled="item.disabled"
                              :label="item.label"
                              :value="item.label">{{item.label}}
                            </el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                    </div>
                    <div class="left" style="width:65px;padding-right:2px;text-align:center;" >
                        <span class="des-word" >状态</span>
                    </div>
                    <div class="left" > 
                      <div class="clear left">
                        <el-form-item  prop="state" style="">
                          <el-select v-model="form.state" placeholder="" style="width:60px;">
                            <el-option v-for="item in chang"  :label="item.name" :value="item.value" ></el-option>
                          </el-select>
                        </el-form-item>  
                      </div>  
                      <div class="clear left">
                        <el-form-item  prop="value" style="">  
                          <el-select disabled="true" v-model="form.type" placeholder="" @change="clearss" style="width:40px;">
                            <el-option v-for="item in shixu"  :label="item.name" :value="item.value" ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>  
                    </div>  
                  </div>
                  <div class="clear" style="width: 100%;">
                    <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                        <span class="des-word require-word" >部门名称</span>
                    </div>
                    <div class="left" >  
                      <el-form-item   >
                        <el-input   v-model="form.name"  title="上限10个字" maxlength="10" style="width: 180px;float: left"></el-input>
                      </el-form-item>
                    </div>  
                  </div>
                  <div class="clear" v-show="form.type=='主'" >
                      <div class="clear" >
                        <div class="left" style="width:70px;text-align:right;padding-right:2px;" >
                            <span class="des-word" >业务设置</span>
                        </div> 
                        <div class="left clear" >
                          <div class="left"  @click="disabledBusiness" >
                            <el-form-item  prop="doBusiness" >
                              <el-checkbox :disabled="doBusinessDisabled" v-model="form.doBusiness"   type="checkbox"  :false-label="0" :true-label="1"  ></el-checkbox>
                            </el-form-item>
                            
                          </div> 
                          <div class="left p-l-2" >
                            <span class=" des-word" >统计管理</span>
                          </div>  
                          <div class="left" style="padding-top:7px;" >
                              <i @click="showQuestion" class="question-gold-icon" ></i>
                          </div> 
                        </div>
                      </div>   
                      <div class="clear" style="padding:0px 0 0 70px;position:relative;top:-7px;"  >
                        <span style="color:#999;" >（必须上级部门先设置）</span>
                      </div>   
                  </div>  
                  <div class="clear" v-show="form.type=='主'" style="width: 100%;">
                    <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                          <span class="des-word" >部门电话</span>
                      </div>  
                    <div class="left clear">
                      <el-form-item >
                            <el-input @input="numck" v-model="form.phone" title="上限11位数" maxlength="11" style="width: 180px;"></el-input>
                      </el-form-item>
                    </div>  

                    <div class="left clear" >
                      <div class="left"  style="padding:0 2px 0 0px;width: 113px;text-align:right;" >
                          <span v-if="form.doBusiness==1" class="des-word require-word" >房/客源编号前缀</span>
                          <span v-if="form.doBusiness==0" class="des-word" >房/客源编号前缀</span>
                      </div> 
                      <div class="left" >
                        <el-form-item label="" style="float: left;">
                          <el-input  @input="checkss"  v-model.trim="form.prefix" minlength="4"  title="只能输入4位大写字母，字母" maxlength="4" style="width:170px;float: left;"></el-input>
                        </el-form-item>
                      </div>  
                    </div>
                  </div>
                  <div class="clear" v-show="form.type=='主'" style="width: 100%;">
                    <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                          <span class="des-word" >部门地址</span>
                      </div> 
                      <div class="left" >
                        <el-form-item >
                            <el-input  v-model="form.adress" title="上限30个字" maxlength="30" style="width: 463px;"></el-input>
                        </el-form-item>
                      </div>  
                  </div>
                  <div class="clear"  style="width: 100%;">
                    <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                          <span class="des-word" >备注</span>
                      </div> 
                      <div class="left" >
                        <textarea class="remark" type="textarea" v-model="form.remark" :rows="4" title="上限100个字" maxlength="100" style="width: 463px;height:95px;"></textarea>     
                      </div>  
                  </div>  

                  <div class="break" >
                  </div>

                  <div style="width: 100%;float: left;margin-top: 10px;" >
                    <span class="foss" style="margin-left: 15px;color: #990000;">物理信息</span>
                  </div>
                  <div class="clear" v-for="item in plcList">
                    <div class="left"  style="width:70px;text-align:right;padding-right:2px;" >
                      <span class="des-word" ></span>
                    </div> 
                    <div class="left" >
                      <el-form-item >
                        <el-input :disabled="true" v-model="item.name" style="width: 120px;"></el-input>
                      </el-form-item>
                    </div>
                    <div class="left" >
                      <el-form-item >
                        <el-input :disabled="true" v-model="item.state" style="width: 120px;"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
            
            </div>
          
          </div>
        </el-tab-pane>
        <el-tab-pane label="部门权限[行政跨部]" name="pedestal" >
          <span slot="label" >  部门权限[行政跨部]</span>
          <detailtwo  ref="detailtwo" @surch="surch" @gouchoose="gouchoose" @surde="surde" @updates="updates" :editorPedestal="true" :dform="dform" ></detailtwo>
        </el-tab-pane>
        <el-tab-pane label="部门权限[物理跨区]" name="school" >
          <span slot="label" > 部门权限[物理跨区]</span>
          <detailthree   ref="detailthree"  @surches="surches" @sdchoose="sdchoose" @allchoose="allchoose" @updates="updates" :editorPedestal="true" :pform="pform" ></detailthree>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer clear" style="padding: 3px 0px;position: absolute;right: 10px;bottom:20px;">
        <div v-if="thistrue" class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:295px;margin-left: 10px;" >
          <div class="left" style="padding-right:7px;"  >
            <i class="up-page-icon" @click="upPage($event)" ></i>
          </div>
          <div class="left" >
            <i class="down-page-icon" @click="downPage($event)" ></i>
          </div>
        </div>
        <span class="right save-cancel-btn" @click="closeDialog">取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="updates">保 存</span>
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
  </div>
</template>

<script>
  import detailone from "./detailone"
  import detailtwo from "./detailtwo"
  import detailthree from "./detailthree"
  import {departdet} from '../../../service/getdepartData'
  import {stration,sical} from '../../../service/getdepartData'
  import {updetadepart} from '../../../service/organizeDate'
  import QuestionDesPage from './questionDes'
  import DangerousMessagePage from './dangerousMessage'

  export default {
    name: 'departdetail',
    components:{
      detailone,
      detailtwo,
      detailthree,
      QuestionDesPage,
      DangerousMessagePage,
    },
    props:["rowData",'showUpAndDown','layerid','mythisindex',"thistrue","type"],
    data(){

      return{
        dialogdepartdetail:false,
        activeName:'building',
        thisindex:this.mythisindex,
        row:this.rowData,
        departid:"",
        departName:'',
        doBusinessDisabled:false,
        achievementCountDisabled:false,
        businessCountDisabled:false,
        plcList:[],
        shixu:[
          {value:"主",
           name:"主"},
          {value:"辅",
            name:"辅"},
        ],
        chang:[
          {value:"常态",
            name:"常态"},
          {value:"关闭",
            name:"关闭"},
        ],
        options1: [],
        options2: [],
        options3: [],
        options4: [],
        options5: [],
        form:{
          id:'',
          preId:"",
          level:'',
          num1:'00',
          num2:'00',
          num3:'00',
          num4:'00',
          num5:'00',
          state:'常态',
          type:'主',
          name:'',
          doBusiness:0,
          businessCount:0,
          achievementCount:0,
          preDoBusiness:0,
          preAchievementCount:0,
          preBusinessCount:0,
          phone:'',
          prefix:'',
          adress:'',
          remark:'',
        },
        dform:{
          tableDatas:[],
          cek:"",
          ces:"",
          oop:[
            {
              value:"-1",
              name:"显示全部行"
            }, 
            {
              value:"1",
              name:"第1列打勾"
            },
            {
              value:"2",
              name:"第2列打勾"
            },
            {
              value:"3",
              name:"第3列打勾"
            },
            {
              value:"4",
              name:"第4列打勾"
            },
            {
              value:"5",
              name:"第5列打勾"
            },
            {
              value:"6",
              name:"第6列打勾"
            },


          ]
        },
        pform: {
          tableDatas:[],
          alls:"",
          ern:"",
          sso:[
            {
              value:"-1",
              name:"显示全部行"
            }, {
              value:"1",
              name:"第1列打勾"
            }, {
              value:"2",
              name:"第2列打勾"
            },]
        }
      }
    },
    methods:{
        //校验
      numck(){
        this.form.phone=this.form.phone.replace(/[^\.\d]/g,'');
      },
      checkss(){
        this.form.prefix=this.form.prefix.replace(/[^\s+A-Z]/g,'')
      },
      showQuestion(){
         let layerId = this.$layer.iframe({
            content: {
                content: QuestionDesPage, //传递的组件对象
                parent: this,//当前的vue对象
                data:{}//props
            },
            area:['550px','250px'],
            title: "部门【统计管理】说明",
            shadeClose: false,
            shade: true,//是否显示遮罩
            zIndex:19891110,
            cancel:()=>{//关闭事件
            }
        });
      },
      disabledBusiness(){
        debugger;
        let doBusinessDisabled = this.doBusinessDisabled;
        let doBusiness = this.form.doBusiness;
        if(doBusinessDisabled && doBusiness == 1){
           let layerId = this.$layer.iframe({
            content: {
              content: DangerousMessagePage, //传递的组件对象
              parent: this, //当前的vue对象
              data: {} //props
            },
            title:'提示',
            area: ["350px", "210px"],
            shadeClose: false,
            shade: true, //是否显示遮罩
            zIndex: 19891110,
           });
        }
      }, 
       showddtail(we){
        this.departid=we;
        this.departName = we.label;
        this.dialogdepartdetail=true;
        this.setNumOption();
        this.getDepartData(we);
        this.deauthority(we);
        this.initphysical(we);
      },
      setNumOption(){
        let arr = [];
        for(let i = 1 ; i <= 30 ; i ++){
          let name = i ;
          if(name < 10){
            name = "0"+i;
          }else{
            name = ""+i;
          }
          let obj = {
            id:i,
            label:name
          }
          arr.push(obj);
        }
        this.options1 = JSON.parse(JSON.stringify(arr));
        this.options2 = JSON.parse(JSON.stringify(arr));
        this.options3 = JSON.parse(JSON.stringify(arr));
        this.options4 = JSON.parse(JSON.stringify(arr));
        this.options5 = JSON.parse(JSON.stringify(arr));
      },
      surch(){
        let ck=this.dform.cek
        this.deauthority(ck)

      },
      surches(){
        let ck=this.pform.ern
        this.initphysical(ck)
      },
      surde(){
        let ck=this.dform.cek
        let cs=this.dform.ces
        this.deauthority(ck,cs)
      },
      //全选
      allchoose(ss){
        let arr=this.pform.tableDatas
        for(var i=0;arr.length>i;i++){
          if(ss==true){
            arr[i].showHouse=1
            arr[i].showCustomer=1
          }
          if(ss==false){
            arr[i].showHouse=0
            arr[i].showCustomer=0
          }
        }
      },
      //纵向点击表头
      sdchoose(ss,check){
        let arr=this.pform.tableDatas
        for(var i=0;arr.length>i;i++){
          if(ss==1){
            if(check == 1){
               arr[i].showHouse=1;
            }else{
              arr[i].showHouse=0;
            }
          }
          if(ss==2){
             if(check == 1){
               arr[i].showCustomer=1;
            }else{
              arr[i].showCustomer=0;
            }
          }
        }
      },
        //清除
      clearss(){
        this.form.name = "";
        this.form.doBusiness= 0;
        this.form.phone = "";
        this.form.prefix = "";
        this.form.addadressress = "";
        this.form.remark = "";
      },
      //纵向点击表头
      gouchoose(ss,check){
        let arr=this.dform.tableDatas
        for(var i=0;arr.length>i;i++){
          if(ss==1){
            if(check == 1){
              arr[i].showHouse=1;
            }else{
              arr[i].showHouse=0;
            }
            
          }
          if(ss==2){
             if(check == 1){
              arr[i].showCustomer=1;
            }else{
              arr[i].showCustomer=0;
            }
          }
          if(ss==3){
             if(check == 1){
              arr[i].publicLandlord=1;
            }else{
              arr[i].publicLandlord=0;
            }
          }
          if(ss==4){
             if(check == 1){
              arr[i].privateLandlord=1;
            }else{
              arr[i].privateLandlord=0;
            }
          }
          if(ss==5){
             if(check == 1){
              arr[i].houseFollow=1;
            }else{
              arr[i].houseFollow=0;
            }
          }
          if(ss==6){
             if(check == 1){
              arr[i].customerFollow=1;
            }else{
              arr[i].customerFollow=0;
            }
          }
        }

      },
     
      //保存
      updates(){
        if(this.form.name == ''){
          this.myAlert("部门名称不能为空！","dangerous-icon");
          return false;
        }
        if(this.form.doBusiness=='1'&&this.form.prefix==''){
          this.myAlert("房/客源编号前缀不能为空！","dangerous-icon");
          return false;
        }
        let aa=this.dform.tableDatas
        let bb=this.pform.tableDatas
        for(var i=0;bb.length>i;i++){
          if(bb[i].showHouse==true){
            bb[i].showHouse=1
          }else if(bb[i].showHouse==false){
            bb[i].showHouse=0
          } 
          if(bb[i].showCustomer==true){
            bb[i].showCustomer=1
          }else if(bb[i].showCustomer==false){
            bb[i].showCustomer=0
          }
        }
        let departAdministrations=JSON.stringify(aa)
        let departPhysicalArea=JSON.stringify(bb)

        let _this=this
        let preId=this.form.preId
        let num1=this.form.num1
        let num2=this.form.num2
        let num3=this.form.num3
        let num4=this.form.num4
        let num5=this.form.num5
        let state=this.form.state;
        let level=this.form.level;
        let doBusiness = this.form.doBusiness;
        let businessCount = this.form.businessCount;
        let achievementCount = this.form.achievementCount;       

        let type=this.form.type
        let name=this.form.name
        let phone=this.form.phone
        let prefix=this.form.prefix
        let adress=this.form.adress
        let remark=this.form.remark
        let createBy="lsy"
        let upid=this.departid.id;

        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        updetadepart( departAdministrations,departPhysicalArea,upid,createBy,preId,level,num1,num2,num3,num4,num5,name,doBusiness,adress,phone,prefix,state,type,remark,businessCount,achievementCount).then(function (res) {
          _this.$layer.closeAll("loading");
          if(res.status==0){
            _this.myAlert("修改部门成功",'success-icon').then(res => {
              _this.$parent.searchdelist();
              _this.$layer.close(_this.layerid);
            }).catch(err => {
            })
          }else{
            _this.myAlert(res.msg)
          }
        })
      },
      initphysical(we,wn){
        let _this=this
        let col=""
        let departId=""
        let name=""
        if(wn){
          name=wn
        }
        if(we.id){
          col=-1
          departId= we.id
        }else{
          col=we
          departId= this.departid.id
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        sical(col,departId,name).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
             _this.pform.tableDatas=response.data;
             _this.pform.tableDatas.forEach(item=>{
              if(item.showCustomer=='1'){
                item.showCustomer = 1
              };
              if(item.showHouse=='1'){
                item.showHouse = 1
              };
                
             })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
          
        })
      },
      deauthority(we,wn){
        let _this=this
        let col=""
        let departId=""
        let name=""
        if(wn){
          name=wn
        }
        if(we.id){
           col=-1
          departId= we.id
        }else{
          col=we
          departId= this.departid.id
        }
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        stration(col,departId,name).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.dform.tableDatas=response.data;
            _this.dform.tableDatas.forEach(item=>{
              item.label = item.label.replace(/&nbsp;/g,"");
            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
          
        })
      },
      getDepartData(we){
        let _this=this
        let did=we.id
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        departdet(did).then(function (response) {
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let departData = response.data.depart;
            let childDepart = response.data.childDepart;
            _this.form.createBy = departData.createBy;
            _this.form.createTime = departData.createTime;
            _this.form.updateBy = departData.updateBy;
            _this.form.updateTime = departData.updateTime;
            _this.form  = departData;
            if(departData.selection ){
               _this.doBusinessDisabled = true;
            }else{
               _this.doBusinessDisabled = false;
            }
            if(_this.form.businessCount=='1'){
              _this.form.businessCount = 1
            }
            if(_this.form.achievementCount=='1'){
              _this.form.achievementCount = 1
            }
            let params = response.data.params;
            let level = departData.level;
            let nums = params.nums;
            
            response.data.plcList.forEach(item=>{
              _this.plcList.push({
                name:item.name,
                state:item.state,
              })
            })
            
            if(nums){
                 if(level == 1){
                   let options1 = _this.options1.concat();
                   options1.forEach(function(item){
                       if(nums.indexOf(item.label) != -1){
                           item.disabled = true;
                       }
                   })
                   _this.options1 = options1;
                 }
               if(level == 2){
                 let options2 = _this.options2.concat();
                 options2.forEach(function(item){
                   if(nums.indexOf(item.label) != -1){
                     item.disabled = true;
                   }
                 })
                 _this.options2 = options2;
               }
               if(level == 3){
                 let options3 = _this.options3.concat();
                 options3.forEach(function(item){
                   if(nums.indexOf(item.label) != -1){
                     item.disabled = true;
                   }
                 })
                 _this.options3 = options3;
               }
               if(level == 4){
                 let options4 = _this.options4.concat();
                 options4.forEach(function(item){
                   if(nums.indexOf(item.label) != -1){
                     item.disabled = true;
                   }
                 })
                 _this.options4 = options4;
               }
               if(level == 5){
                 let options5 = _this.options5.concat();
                 options5.forEach(function(item){
                   if(nums.indexOf(item.label) != -1){
                     item.disabled = true;
                   }
                 })
                 _this.options5 = options5;
               }
             }
          } else if (response.status == 1){
            _this.myAlert(response.msg,'dangerous-icon');
          }
        })
      },
      changeTab(tab){
        let _this = this;
        let id = _this.editorId;
        let label = tab.label;


      },
      changeTabInit(){
        let _this = this;
        _this.activeName = "building";
      },
      closeDialog(){
        this.$layer.close(this.layerid);
      },
      upPage(e){
        let count = this.thisindex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata = this.$parent.changeTitle(count,needlayerid,1);
        this.row = callbackdata.row;
        this.thisindex = callbackdata.thisindex;
        this.showddtail(this.row);
      },

      downPage(e){
        let count = this.thisindex;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        let callbackdata = this.$parent.changeTitle(count,needlayerid,2);
        this.row = callbackdata.row;
        this.thisindex = callbackdata.thisindex;
        this.showddtail(this.row);
      },
    },
    mounted(){
      this.showddtail(this.row);
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisrowid == _this.row.id&&item.oneORmore==2){
          _this.$store.state.layerifranme.splice(index,1);
          _this.$parent.shadenum();
        };
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      })
    },
  }
</script>

<style lang="scss" scoped>
  .width-60{
    width:55px;
  }
  .width-110{
    width:110px;
  }

  
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    background:url("../../../images/weixuanzhong1.png");
    border-width:0 !important;
    height:24px;
    padding-left:20px !important;
    span{
      position:relative;
      text-align:center;
      display:inline-block;
      top:3px;
      width:105px;
    }

  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    background:url("../../../images/xuanzhong1.png");
    color: #909399;
    border-width:0px !important;
    height:24px;
  }

  /deep/ .el-tabs--border-card>.el-tabs__content {
    padding:0 !important;
  }

  /deep/ .pop-up{
    padding:8px 8px 0;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/iborder.png")  2 repeat ;
    .pop-up-container {
      margin: 0px;
    }
    /deep/ .el-tabs__item {
      padding: 0 20px;
      height: 20px;
      line-height:18px;
      font-size:12px;
    }
    /deep/.el-dialog__wrapper .el-button--default {
      margin-right: 0px !important;
    }
  }
  .question-gold-icon{
    display: inline-block;
    height:15px;
    width:15px;
    background: url("../../../images/icon2.png") -368px -61px;
  }



</style>
