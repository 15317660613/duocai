<template>
  <el-dialog :close-on-click-modal="false" v-dialogDrag :title='"部门调整 【"+this.name+"】"' width="460px" @close="clearFormData" :visible.sync="departshow" >
    <div class="pop-up" >
      <div class="pop-up-container " style="height: 426px">
        <el-form :model="demoveform" :rules="rules" ref="form" label-width="400px" class="demo-ruleForm span" style="">
               <div style="margin-left: 10px;margin-top: 10px">
                 <el-radio :disabled='radio1disabled' v-model="demoveform.radios" :label="1">调整为一级部门</el-radio>

               </div>
               <div  style="width: 400px;clear: both;margin-left: 15px">
                 <el-form-item label="新的部门编号" prop="valuen" >
                   <el-select :disabled='demoveform.radios!=1' style="width:60px;float: left;margin-left: -310px" v-model="demoveform.ale1">
                     <el-option
                       style="width: 60px"
                       v-for="item in this.alevel1"
                       :id="item.id"
                       :label="item.label"
                       :value="item.label"
                       :disabled="item.disabled">{{item.label}}
                     </el-option>
                   </el-select>
                   <el-select style="width:60px;float: left;margin-left: -250px" v-model="demoveform.ale2" disabled>
                     <el-option
                       style="width: 60px"
                       v-for="item in this.alevel2"
                       :id="item.id"
                       :label="item.label"
                       :value="item.label"
                       :disabled="item.disabled">{{item.label}}
                     </el-option>
                   </el-select>
                   <el-select style="width:60px;float: left;margin-left: -190px" v-model="demoveform.ale3" disabled>
                     <el-option
                       style="width: 60px"
                       v-for="item in this.alevel3"
                       :id="item.id"
                       :label="item.label"
                       :value="item.label"
                       :disabled="item.disabled">{{item.label}}
                     </el-option>
                   </el-select>
                   <el-select style="width:60px;float: left;margin-left: -130px" v-model="demoveform.ale4" disabled>
                     <el-option
                       style="width: 60px"
                       v-for="item in this.alevel4"
                       :id="item.id"
                       :label="item.label"
                       :value="item.label"
                       :disabled="item.disabled">{{item.label}}
                     </el-option>
                   </el-select>
                   <el-select style="width:60px;float: left;margin-left: -70px" v-model="demoveform.ale5" disabled>
                     <el-option
                       style="width: 60px"
                       v-for="item in this.alevel5"
                       :id="item.id"
                       :label="item.label"
                       :value="item.label"
                       :disabled="item.disabled">{{item.label}}
                     </el-option>
                   </el-select>
                 </el-form-item>
               </div>
                <div style="margin-left:10px;margin-top: 10px">
                  <el-radio :disabled='radio2disabled' v-model="demoveform.radios" :label="2">调整为二级部门</el-radio>
                  <span style="margin-left: -37px"></span>
                </div>
                <div style="margin-left: 15px;margin-top: 5px">
                  <el-form-item label="上级部门名称" prop="value1" >
                    <el-select :disabled='demoveform.radios!=2' v-model="demoveform.demove1" style="width:128px;float: left;margin-left: -310px" @change="fzhi(1)">
                      <el-option
                        style="width: 120px"
                        v-for="item in this.Higher1"
                        :id="item.id"
                        :label="item.name"
                        :value="item.id"
                        >{{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="width: 400px;clear: both;margin-left: 15px">
                  <el-form-item label="新的部门编号" prop="valuew" >
                    <el-select style="width:60px;float: left;margin-left: -310px" v-model="demoveform.ble1" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.blevel1"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select :disabled='demoveform.radios!=2' style="width:60px;float: left;margin-left: -250px" v-model="demoveform.ble2">
                      <el-option
                        style="width: 60px"
                        v-for="item in this.blevel2"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -190px" v-model="demoveform.ble3" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.blevel3"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -130px" v-model="demoveform.ble4" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.blevel4"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -70px" v-model="demoveform.ble5" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.blevel5"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="margin-left: 10px;margin-top:10px">
                  <el-radio :disabled='radio3disabled' v-model="demoveform.radios" :label="3">调整为三级部门</el-radio>
                  <span style="margin-left: -37px"></span>
                </div>
                <div style="margin-left: 15px;margin-top: 5px">
                  <el-form-item label="上级部门名称" prop="value2" >
                    <el-select :disabled='demoveform.radios!=3' style="width:128px;float: left;margin-left: -310px" v-model="demoveform.demove2" @change="fzhi(2)">
                      <el-option
                        style="width: 120px"
                        v-for="item in this.Higher2"
                        :id="item.id"
                        :label="item.name"
                        :value="item.id"
                      >{{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="width: 400px;clear: both;margin-left: 15px">
                  <el-form-item label="新的部门编号" prop="values" >
                    <el-select style="width:60px;float: left;margin-left: -310px" v-model="demoveform.cle1" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.clevel1"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -250px" v-model="demoveform.cle2" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.clevel2"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select :disabled='demoveform.radios!=3' style="width:60px;float: left;margin-left: -190px" v-model="demoveform.cle3">
                      <el-option
                        style="width: 60px"
                        v-for="item in this.clevel3"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -130px" v-model="demoveform.cle4" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.clevel4"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -70px" v-model="demoveform.cle5" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.clevel5"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="margin-left: 10px;margin-top:10px">
                  <el-radio :disabled='radio4disabled' v-model="demoveform.radios" :label="4">调整为四级部门</el-radio>
                  <span style="margin-left: -37px"></span>
                </div>
                <div style="margin-left: 15px;margin-top: 5px">
                  <el-form-item label="上级部门名称" prop="value4">
                    <el-select :disabled='demoveform.radios!=4' style="width:128px;float: left;margin-left: -310px" v-model="demoveform.demove3"  @change="fzhi(3)">
                      <el-option
                        style="width: 120px"
                        v-for="item in this.Higher3"
                        :id="item.id"
                        :label="item.name"
                        :value="item.id"
                      >{{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="width: 400px;clear: both;margin-left: 15px">
                  <el-form-item label="新的部门编号" prop="value4" >
                    <el-select style="width:60px;float: left;margin-left: -310px" v-model="demoveform.dle1" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.dlevel1"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -250px" v-model="demoveform.dle2" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.dlevel2"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -190px" v-model="demoveform.dle3" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.dlevel3"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select :disabled='demoveform.radios!=4' style="width:60px;float: left;margin-left: -130px" v-model="demoveform.dle4">
                      <el-option
                        style="width: 60px"
                        v-for="item in this.dlevel4"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -70px" v-model="demoveform.dle5" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.dlevel5"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="margin-left: 10px;margin-top:10px">
                  <el-radio :disabled='radio5disabled' v-model="demoveform.radios" :label="5">调整为五级部门</el-radio>
                  <span style="margin-left: -37px"></span>
                </div>
                <div style="margin-left: 15px;margin-top: 5px">
                  <el-form-item label="上级部门名称" prop="value5" >
                    <el-select :disabled='demoveform.radios!=5' style="width:128px;float: left;margin-left: -310px" v-model="demoveform.demove4" @change="fzhi(4)">
                      <el-option
                        style="width: 120px"
                        v-for="item in this.Higher4"
                        :id="item.id"
                        :label="item.name"
                        :value="item.id"
                      >{{item.name}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="width: 400px;clear: both;margin-left: 15px">
                  <el-form-item label="新的部门编号" prop="value7" >
                    <el-select style="width:60px;float: left;margin-left: -310px" v-model="demoveform.ele1" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.elevel1"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -250px" v-model="demoveform.ele2" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.elevel2"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -190px" v-model="demoveform.ele3" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.elevel3"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select style="width:60px;float: left;margin-left: -130px" v-model="demoveform.ele4" disabled>
                      <el-option
                        style="width: 60px"
                        v-for="item in this.elevel4"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                    <el-select :disabled='demoveform.radios!=5' style="width:60px;float: left;margin-left: -70px" v-model="demoveform.ele5">
                      <el-option
                        style="width: 60px"
                        v-for="item in this.elevel5"
                        :id="item.id"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled">{{item.label}}
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
        </el-form>
      </div>
      <div class="clear" style="margin-left: 248px" >
              <span   slot="footer" class="dialog-footer">
                <button class="buttons" type="primary" @click="saved">保存</button>
                <button class="buttons" @click="departshow=false">取 消</button>
              </span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import ElTreeSelect from '../../house/rent/tree'
  import {departmentParam} from '../../../utils/departparam'
  import  {changedparam,changedpart} from '../../../service/organizeDate'

  export default {
    name: 'departmoves',
    components: {ElTreeSelect},
    data(){
      return{
        mydata:'',
        radio1disabled:true,
        radio2disabled:true,
        radio3disabled:true,
        radio4disabled:true,
        radio5disabled:true,
        departshow:false,
        Higher1:[],
        Higher2:[],
        Higher3:[],
        Higher4:[],
        name:"",
        pid:"",
        alevel1:departmentParam.alevel1,
        alevel2:departmentParam.alevel2,
        alevel3:departmentParam.alevel3,
        alevel4:departmentParam.alevel4,
        alevel5:departmentParam.alevel5,

        blevel1:departmentParam.blevel1,
        blevel2:departmentParam.blevel2,
        blevel3:departmentParam.blevel3,
        blevel4:departmentParam.blevel4,
        blevel5:departmentParam.blevel5,

        clevel1:departmentParam.clevel1,
        clevel2:departmentParam.clevel2,
        clevel3:departmentParam.clevel3,
        clevel4:departmentParam.clevel4,
        clevel5:departmentParam.clevel5,

        dlevel1:departmentParam.dlevel1,
        dlevel2:departmentParam.dlevel2,
        dlevel3:departmentParam.dlevel3,
        dlevel4:departmentParam.dlevel4,
        dlevel5:departmentParam.dlevel5,

        elevel1:departmentParam.elevel1,
        elevel2:departmentParam.elevel2,
        elevel3:departmentParam.elevel3,
        elevel4:departmentParam.elevel4,
        elevel5:departmentParam.elevel5,
        demoveform:{
          radios:'',
          ale1:"",
          ale2:"",
          ale3:"",
          ale4:"",
          ale5:"",

          ble1:"",
          ble2:"",
          ble3:"",
          ble4:"",
          ble5:"",

          cle1:"",
          cle2:"",
          cle3:"",
          cle4:"",
          cle5:"",

          dle1:"",
          dle2:"",
          dle3:"",
          dle4:"",
          dle5:"",

          ele1:"",
          ele2:"",
          ele3:"",
          ele4:"",
          ele5:"",

          demove1:"",
          demove2:"",
          demove3:"",
          demove4:"",

        },
        rules:{

        }
      }
    },
    methods:{
       demshow(val){
        this.departshow=true
        this.mydata = val;
        console.log(this.mydata);
        if(this.mydata.children.length != 0){
          console.log('111')
          if(this.mydata.level == 1){
            this.radio1disabled = false;
            this.demoveform.radios = 1;
          }else 
          if(this.mydata.level == 2){
            this.radio2disabled = false;
            this.demoveform.radios = 2;
          }else 
          if(this.mydata.level == 3){
            this.radio3disabled = false;
            this.demoveform.radios = 3;
          }else 
          if(this.mydata.level == 4){
            this.radio4disabled = false;
            this.demoveform.radios = 4;
          }else 
          if(this.mydata.level == 5){
            this.radio5disabled = false;
            this.demoveform.radios = 5;
          }
        }else{
          console.log('222')
          this.radio1disabled = false;
          this.radio2disabled = false;
          this.radio3disabled = false;
          this.radio4disabled = false;
          this.radio5disabled = false;
          if(this.mydata.level == 1){
            this.demoveform.radios = 1;
          }else 
          if(this.mydata.level == 2){
            this.demoveform.radios = 2;
          }else 
          if(this.mydata.level == 3){
            this.demoveform.radios = 3;
          }else 
          if(this.mydata.level == 4){
            this.demoveform.radios = 4;
          }else 
          if(this.mydata.level == 5){
            this.demoveform.radios = 5;
          }
        }
         
         let _this=this
         this.name=val.label
         this.pid=val.id
         let type=val.type
         changedparam(type).then(function (res) {
           debugger
           _this.Higher1=res.data.dept1
           _this.Higher2=res.data.dept2
           _this.Higher3=res.data.dept3
           _this.Higher4=res.data.dept4
           for(var i=0;_this.alevel1.length>i;i++){
              for(var a=0;res.data.nums1.length>a;a++){
                   if(_this.alevel1[i].label==res.data.nums1[a]){
                     _this.alevel1[i].disabled=true

                   }
              }

            }
           for(var i=0;_this.blevel2.length>i;i++){
             for(var a=0;res.data.nums2.length>a;a++){
               if(_this.blevel2[i].label==res.data.nums2[a]){
                 _this.blevel2[i].disabled=true
               }
             }
           }
           for(var i=0;_this.clevel3.length>i;i++){
             for(var a=0;res.data.nums3.length>a;a++){
               if(_this.clevel3[i].label==res.data.nums3[a]){
                 _this.clevel3[i].disabled=true

               }
             }

           }
           for(var i=0;_this.dlevel4.length>i;i++){
             for(var a=0;res.data.nums4.length>a;a++){
               if(_this.dlevel4[i].label==res.data.nums4[a]){
                 _this.dlevel4[i].disabled=true

               }
             }

           }
           for(var i=0;_this.elevel5.length>i;i++){
             for(var a=0;res.data.nums5.length>a;a++){
               if(_this.elevel5[i].label==res.data.nums5[a]){
                 _this.elevel5[i].disabled=true

               }
             }

           }




         })
       },
        fzhi(i){
         debugger
         if(i==1){
           let de1=this.demoveform.demove1
           for(var i=0;this.Higher1.length>i;i++){
               if(this.Higher1[i].id==de1){
                   this.demoveform.ble1=this.Higher1[i].num1
                   this.demoveform.ble2=this.Higher1[i].num2
                   this.demoveform.ble3=this.Higher1[i].num3
                   this.demoveform.ble4=this.Higher1[i].num4
                   this.demoveform.ble5=this.Higher1[i].num5
               }
           }
         }
        if(i==2){
          let de2=this.demoveform.demove2
          for(var i=0;this.Higher2.length>i;i++){
            if(this.Higher2[i].id==de2){
              this.demoveform.cle1=this.Higher2[i].num1
              this.demoveform.cle2=this.Higher2[i].num2
              this.demoveform.cle3=this.Higher2[i].num3
              this.demoveform.cle4=this.Higher2[i].num4
              this.demoveform.cle5=this.Higher2[i].num5
            }
          }
        }
        if(i==3){
          let de3=this.demoveform.demove3
          for(var i=0;this.Higher3.length>i;i++){
            if(this.Higher3[i].id==de3){
              this.demoveform.dle1=this.Higher3[i].num1
              this.demoveform.dle2=this.Higher3[i].num2
              this.demoveform.dle3=this.Higher3[i].num3
              this.demoveform.dle4=this.Higher3[i].num4
              this.demoveform.dle5=this.Higher3[i].num5
            }
          }
        }
        if(i==4){
          let de4=this.demoveform.demove4
          for(var i=0;this.Higher4.length>i;i++){
            if(this.Higher4[i].id==de4){
              this.demoveform.ele1=this.Higher4[i].num1
              this.demoveform.ele2=this.Higher4[i].num2
              this.demoveform.ele3=this.Higher4[i].num3
              this.demoveform.ele4=this.Higher4[i].num4
              this.demoveform.ele5=this.Higher4[i].num5
            }
          }
        }





      },
      //保存
      saved(){
         debugger
        let _this=this
        let id=this.pid
        let num1=""
        let num2=""
        let num3=""
        let num4=""
        let num5=""
        let preId=""
        let level=this.demoveform.radios
        if(level==1){
          num1=this.demoveform.ale1
          num2=this.demoveform.ale2
          num3=this.demoveform.ale3
          num4=this.demoveform.ale4
          num5=this.demoveform.ale5
          preId=0
        }
        if(level==2){
          num1=this.demoveform.ble1
          num2=this.demoveform.ble2
          num3=this.demoveform.ble3
          num4=this.demoveform.ble4
          num5=this.demoveform.ble5
          preId=this.demoveform.demove1
        }
        if(level==3){
          num1=this.demoveform.cle1
          num2=this.demoveform.cle2
          num3=this.demoveform.cle3
          num4=this.demoveform.cle4
          num5=this.demoveform.cle5
          preId=this.demoveform.demove2
        }
        if(level==4){
          num1=this.demoveform.dle1
          num2=this.demoveform.dle2
          num3=this.demoveform.dle3
          num4=this.demoveform.dle4
          num5=this.demoveform.dle5
          preId=this.demoveform.demove3
        }
        if(level==5){
          num1=this.demoveform.ele1
          num2=this.demoveform.ele2
          num3=this.demoveform.ele3
          num4=this.demoveform.ele4
          num5=this.demoveform.ele5
          preId=this.demoveform.demove4
        }
        changedpart(id,level,num1,num2, num3,num4,num5,preId).then(function (res) {
           debugger
                if(status==0){
                  _this.myAlert(res.msg, "success-icon")
                  _this.$parent.showdepart()
                  _this.departshow=false
                  _this.clearFormData()
                }else{
                  _this.myAlert("调动部门失败")
                }
        })
      },
      clearFormData(){
        this.demoveform.demove1=""
        this.demoveform.demove2=""
        this.demoveform.demove3=""
        this.demoveform.demove4=""
        this.demoveform.radios=1
        this.demoveform.ale1=""
        this.demoveform.ale2=""
        this.demoveform.ale3=""
        this.demoveform.ale4=""
        this.demoveform.ale5=""
        this.demoveform.ble1=""
        this.demoveform.ble2=""
        this.demoveform.ble3=""
        this.demoveform.ble4=""
        this.demoveform.ble5=""
        this.demoveform.cle1=""
        this.demoveform.cle2=""
        this.demoveform.cle3=""
        this.demoveform.cle4=""
        this.demoveform.cle5=""
        this.demoveform.dle1=""
        this.demoveform.dle2=""
        this.demoveform.dle3=""
        this.demoveform.dle4=""
        this.demoveform.dle5=""
        this.demoveform.ele1=""
        this.demoveform.ele2=""
        this.demoveform.ele3=""
        this.demoveform.ele4=""
        this.demoveform.ele5=""

        this.radio1disabled = true;
        this.radio2disabled = true;
        this.radio3disabled = true;
        this.radio4disabled = true;
        this.radio5disabled = true;

      }
    }

  }
</script>

<style scoped>
  .pop-up .pop-up-container /deep/ .el-form-item__label {
    width:88px!important;
    font-family: '微软雅黑';
    font-size: 12px;
  }
  .span{
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
