<template>
  <div  style="margin:0 10px;width:100%;" >
    <div class="pop-up">
      <div class="pop-up-container clear" style="width: calc(100% - 20px);margin-bottom: 10px;height: 378px;">
        <el-form ref="formsData" :model="formf" >
          <div class="clear "style="width:100%;">
           
            <div class=""  style="height: 370px;overflow:auto;border-radius:3px;margin-top: 3px;">
                  <div class="clear" style="width: 100%;">
                    <i class="left" style="width:16px;height:16px;display:inline-block;margin-top:10px;margin-left: 10px" @click="addStarLevel"></i>
                    <span class="wfsize left" style="margin-top: 10px;margin-left: 5px">评价奖金设置</span>
                  </div>
                  <diV v-if="Evaluation.length != 0" class="border-box"  style="margin:10px 0 0 33px;width:500px;">
                      <div style="width:100%;margin:0px 0 5px">
                        <span style="margin-left:90px">月</span>
                        <span style="margin-left:80px">年</span>
                      </div>
                      <div class="clear"  v-for="(ev,index) in Evaluation" style="width:100%;">
                        <div class="left" style="padding-top:3px;" >
                          <i class="" style="widht:16px;height:16px;display:inline-block;margin-left: 10px" @click="deletedStarLevel(index)"></i>
                        </div> 
                        <div class="left" >
                          <span  style="display:inline-block;line-height:27px;">{{index+1}}星</span>
                        </div>   
                        <div class="left" >
                          <el-form-item   >
                             <el-input disabled="true" v-if="index>8" v-model="ev.lowerLimit" title="上限6位数" maxlength="6" style="width: 76px;margin-left:10px "></el-input>
                             <el-input disabled="true" v-else v-model="ev.lowerLimit" title="上限6位数" maxlength="6" style="width: 76px;margin-left:17px "></el-input>
                          </el-form-item>
                        </div> 
                        <div class="left" >
                          <el-form-item   >
                            <el-input disabled="true"  v-model="ev.upperLimit" title="上限6位数" maxlength="6" style="width: 76px;margin-left:20px "></el-input> 
                          </el-form-item> 
                        </div>
                        <div class="left" >
                          <el-form-item   >
                            <el-input disabled="true"  v-model="ev.remark"  title="上限100个字" maxlength="100" style="width: 200px;margin-left:50px "></el-input>
                          </el-form-item>
                        </div>
                      </div>
                  </diV>
                   <div class="clear" style="width: 100%;">
                    <i  class=" left" style="width:16px;height:16px;display:inline-block;margin-top:10px;margin-left: 10px" @click="addBounsModel1(bonusList1.length)"></i>
                    <span class="wfsize left" style="margin-top: 10px;margin-left: 5px">部门管理业绩设置</span>
                  
                    <i class="pensail-icon" style="margin:7px 0 0 5px;" @click="manageBusinessSet"   ></i>
                  </div>
                  <div class="clear" >
                    <div class="clear" v-if="elem.show == 0" v-for="(elem,index) in bonusList1" style="margin:10px 0 20px 0px">
                      <div class="left" style="padding:0 6px 0 12px;" >
                        <i style="width:16px;height:16px;display: inline-block;"  ></i>

                      </div>  
                      <div  class="border-box clear left"  style="width: 500px;position:relative;padding:12px 8px;">
                        <div class="clear" >
                           <div class="left" style="width:40px;height:25px;" >
                            <i v-if="elem.percentageType != percentageTypeParams[0].id" class="account-plus-icon left" style="margin:5px 10px 0;" @click="addBouns1(elem)"></i>
                          </div>
                          <div style="position:absolute;left:157px;top:-2px;" >
                            <span v-if style="margin-top:4px;margin-left: 5px;font-size: 12px;color: #990000;">
                               {{elem.businessTypeName}}
                            </span>
                          </div>
                          <div class="left" >
                            <el-form-item >
                              <CheckSelect :selectId="'id_g_'+index"  :indexSelect="index" :listData="elem.businessTypeParams" style="width:120px;" ></CheckSelect>
                            </el-form-item>
                            
                          </div>

                          <div class="left" style="padding-left:3px;" >
                            <el-form-item  >
                              <el-select :disabled="true" v-model="elem.percentageType" style="width: 100px;" @change="changePercentageType1(elem)">
                                <el-option v-for="item in percentageTypeParams" :id="item.id" :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>  
                          </div>

                          <div v-if="elem.percentageType != percentageTypeParams[0].id" class="left" >
                            <el-form-item  >
                              <el-select :disabled="true"  v-model="elem.isMinimum" style="width: 100px;margin-left: 20px">
                                <el-option v-for="item in deletedType" :id="item.id" :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>     
                          </div>
                          <div class="left" style="line-height:28px;padding:0 5px;" >
                            <span>━</span>
                          </div>
                          <div class="left" >
                            <el-form-item  >
                                <el-input :disabled="true"  @input="checkNum1(elem,3)" title="上限10位数" maxlength="10" v-model="elem.cost" style="width: 106px;" ></el-input>
                            </el-form-item>     
                          </div>
                        </div>  
                        <div v-if="elem.bonus != null && elem.bonus.length != 0" v-for="(elem1,index1) in elem.bonus"  class="clear" >
                          <div v-if="elem.percentageType != percentageTypeParams[0].id && elem1.deleted == 0" class="clear" >
                            <div class="left" style="padding:5px 6px 0px 60px;" >
                              <i style="width:16px;height:16px;display: inline-block;"  ></i>

                            </div>
                            <div class="left" style="" >
                              <el-form-item  >
                                <el-input :disabled="true"   @input="checkNum1(elem1,4)" title="上限10位数" maxlength="10"  v-model="elem1.lowerLimit" style="width: 85px;"></el-input>
                              </el-form-item  >
                            </div> 
                            <div class="left" style="padding:0 6px;" >
                              <el-form-item  >
                                <el-input :disabled="true"  @input="checkNum1(elem1,5)" title="上限10位数" maxlength="10"   v-model="elem1.upperLimit" style="width: 70px;"></el-input>
                              </el-form-item  >
                            </div> 
                            <div class="left" style="line-height:28px;color:#A5A5A4;" >
                                X
                            </div> 
                            <div class="left" style="padding:0 6px;" >
                              <el-form-item  >
                                <el-input :disabled="true"  @input="checkNum1(elem1,6)" title="上限10位数" maxlength="10"   v-model="elem1.percent" style="width: 60px;"></el-input>
                              </el-form-item  >
                            </div> 
                            <div class="left" style="line-height:28px;color:#A5A5A4;" >
                                X
                            </div>  
                            <div class="left" style="padding:0 6px;" >
                              <el-form-item  >
                                <el-input :disabled="true"   @input="checkNum1(elem1,7)" title="上限10位数" maxlength="10"  v-model="elem1.percentSecond" style="width: 60px;"></el-input>
                              </el-form-item  >
                            </div> 
                          </div>
                          <div v-if="elem.percentageType == percentageTypeParams[0].id  && elem1.deleted == 0" class="clear" >
                             <div class="left" style="padding:0 6px 0 85px;" >
                                <el-form-item  >
                                  <el-input :disabled="true"  @input="checkNum1(elem1,6)" title="上限10位数" maxlength="10"   v-model="elem1.percent" style="width: 105px;"></el-input>
                                </el-form-item  >
                              </div> 
                              <div class="left" style="line-height:28px;color:#A5A5A4;" >
                                  X
                              </div>  
                              <div class="left" style="padding:0 6px;" >
                                <el-form-item  >
                                  <el-input :disabled="true"  @input="checkNum1(elem1,7)" title="上限10位数" maxlength="10"    v-model="elem1.percentSecond" style="width:105px;"></el-input>
                                </el-form-item  >
                              </div>
                          </div>    
                         
                        </div>  
                      </div>
                    </div>
                  </div>
                  <div class="clear" style="width: 100%;">
                    <i class=" left" style="width:16px;height:16px;display:inliine-block;margin-top:10px;margin-left: 10px" ></i>
                    <span class="wfsize left" style="margin-top: 10px;margin-left: 5px">个人业务业绩设置</span>
                  </div>
                  <div class="clear" >
                    <div class="clear" v-if="elem.show == 0" v-for="(elem,index) in bonusList" style="margin:10px 0 20px 0px">
                      <div class="left" style="padding:0 6px 0 12px;" >
                         <i style="width:16px;height:16px;display: inline-block;"  ></i>
                      </div>  
                      <div  class="border-box clear left"  style="width: 500px;position:relative;padding:12px 8px;">
                        <div class="clear" >
                           <div class="left" style="width:40px;height:25px;" >
                            <i v-if="elem.percentageType != percentageTypeParams[0].id" class=" left" style="width:16px;height:16px;display:inline-block;margin:5px 10px 0;" ></i>
                          </div>
                          <div style="position:absolute;left:157px;top:-2px;" >
                            <span v-if style="margin-top:4px;margin-left: 5px;font-size: 12px;color: #990000;">
                               {{elem.businessTypeName}}
                            </span>
                            
                          </div>
                          <div class="left" >
                            <el-form-item label label-width="0">
                              <CheckSelect :disabled="true"  :selectId="'id_y_'+index"  :indexSelect="index" :listData="elem.businessTypeParams" style="width:120px;" ></CheckSelect>
                            </el-form-item>
                            
                          </div>

                          <div class="left" style="padding-left:3px;" >
                            <el-form-item  >
                              <el-select :disabled="true"  v-model="elem.percentageType" style="width: 100px;" @change="changePercentageType(elem)">
                                <el-option v-for="item in percentageTypeParams" :id="item.id" :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>  
                          </div>

                          <div v-if="elem.percentageType != percentageTypeParams[0].id" class="left" >
                            <el-form-item  >
                              <el-select :disabled="true"  v-model="elem.isMinimum" style="width: 100px;margin-left: 20px">
                                <el-option v-for="item in deletedType" :id="item.id" :label="item.name" :value="item.id" ></el-option>
                              </el-select>
                            </el-form-item>     
                          </div>
                          <div class="left" style="line-height:28px;padding:0 5px;" >
                            <span>━</span>
                          </div>
                          <div class="left" >
                            <el-form-item  >
                                <el-input :disabled="true"  @input="checkNum1(elem,3)" title="上限10位数" maxlength="10" v-model="elem.cost" style="width: 106px;" ></el-input>
                            </el-form-item>     
                          </div>
                        </div>  
                        <div v-if="elem.bonus != null && elem.bonus.length != 0" v-for="(elem1,index1) in elem.bonus"  class="clear" >
                          <div v-if="elem.percentageType != percentageTypeParams[0].id && elem1.deleted == 0" class="clear" >
                            <div class="left" style="padding:5px 6px 0px 60px;" >
                              <i style="width:16px;height:16px;display: inline-block;"  ></i>
                            </div>
                            <div class="left" style="" >
                              <el-form-item  >
                                <el-input :disabled="true"   @input="checkNum1(elem1,4)" title="上限10位数" maxlength="10"  v-model="elem1.lowerLimit" style="width: 85px;"></el-input>
                              </el-form-item  >
                            </div> 
                            <div class="left" style="padding:0 6px;" >
                              <el-form-item  >
                                <el-input :disabled="true"  @input="checkNum1(elem1,5)" title="上限10位数" maxlength="10"   v-model="elem1.upperLimit" style="width: 70px;"></el-input>
                              </el-form-item  >
                            </div> 
                            <div class="left" style="line-height:28px;color:#A5A5A4;" >
                                X
                            </div> 
                            <div class="left" style="padding:0 6px;" >
                              <el-form-item  >
                                <el-input :disabled="true"  @input="checkNum1(elem1,6)" title="上限10位数" maxlength="10"   v-model="elem1.percent" style="width: 60px;"></el-input>
                              </el-form-item  >
                            </div> 
                            <div class="left" style="line-height:28px;color:#A5A5A4;" >
                                X
                            </div>  
                            <div class="left" style="padding:0 6px;" >
                              <el-form-item  >
                                <el-input  :disabled="true"  @input="checkNum1(elem1,7)" title="上限10位数" maxlength="10"  v-model="elem1.percentSecond" style="width: 60px;"></el-input>
                              </el-form-item  >
                            </div> 
                          </div>
                          <div v-if="elem.percentageType == percentageTypeParams[0].id  && elem1.deleted == 0" class="clear" >
                             <div class="left" style="padding:0 6px 0 85px;" >
                                <el-form-item  >
                                  <el-input :disabled="true"  @input="checkNum1(elem1,6)" title="上限10位数" maxlength="10"   v-model="elem1.percent" style="width: 105px;"></el-input>
                                </el-form-item  >
                              </div> 
                              <div class="left" style="line-height:28px;color:#A5A5A4;" >
                                  X
                              </div>  
                              <div class="left" style="padding:0 6px;" >
                                <el-form-item  >
                                  <el-input :disabled="true"  @input="checkNum1(elem1,7)" title="上限10位数" maxlength="10"    v-model="elem1.percentSecond" style="width:105px;"></el-input>
                                </el-form-item  >
                              </div>
                          </div>    
                         
                        </div>  
                      </div>
                    </div>
                  </div>
                </div>

              </div>
        </el-form>
      </div>
     
    </div>
   
    
  </div>
</template>

<script>
  import {accountbd,userbonus,savebonus,saveuserbonus} from '../../../service/jobData'
  import CheckSelect from "../../../components/checkSpecial1";
  import ManageBusinessSetPage from "../../organize/job/manageBusinessSet";
  import ManageBusinessSetUserPage from "../../organize/job/manageBusinessSetUser";
  export default {
    name: 'bookfour',
    props:["userTimeId",'rowData'],
    data(){
      return{
        staffOrUserType:0,
        jobname:'',
        getrowData:this.rowData,
        accountData:"",
        Evaluation:[],
        fristpid:"",
       
        userList:[],
        staffTimeId:"",
        bonusList:[],
        bonusList1:[],
        percentageTypeParams:[],
        businessTypeParams:[],
        deletedType:[ {
          id:'1',
          name:"不减去限定额",
          select:false
        },{
          id:'2',
          name:"限定额不应计",
          select:false
        },{
          id:'3',
          name:"过限定额应计",
          select:false
        }],
        formf:{
            dang:"657219707774316544",
            xmoney:1,
        },
      }
    },
    
    methods:{
       //
      clickGetUserData(){
        let _this =  this;
        this.$layer.loading({
        shade: true,//是否显示遮罩
        });
        let userTimeId = this.userTimeId;
        userbonus(userTimeId).then(function (response) {
         _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0){
            let bouns1 = response.data.bouns1;
            let bouns2=response.data.bouns2;
            let bouns3=response.data.bouns3;
            let departRange = response.data.departRange;
            let includeMy = response.data.IncludeMy;
            let departId = response.data.departId;
            let departIds = response.data.departs;
             
            let businessTypeParams = response.data.params.businessTypeParams;
            if(departIds){
              _this.departIds = departIds.toString();
            }else{
              _this.departIds = "";
            }
            _this.percentageTypeParams=response.data.params.percentageTypeParams;
            businessTypeParams.forEach(item => {
              item.id = item.id,
              item.name = item.name +"-"+ item.remark;
            })
            _this.businessTypeParams = businessTypeParams;
            if(departRange != null){
              _this.departRange = departRange;
            }
            if(includeMy != null){
              _this.includeMy = includeMy;
            }
            _this.departId = departId;
            
            if(bouns1 && bouns1.length != 0){
              _this.Evaluation = bouns1;
            }else{
              _this.Evaluation = [];
            }
            
            if(bouns2 && bouns2.length != 0){
              bouns2.forEach(item => {
                let currentBusinessTypeParams = JSON.parse(JSON.stringify(businessTypeParams));
                if(item.businessIds){
                  let businessType = item.businessIds.toString();
                  if(businessType && businessType.length != 0){
                    currentBusinessTypeParams.forEach(item1 => {
                        if(businessType.indexOf(item1.id) != -1){
                            item1.select = true;
                        }
                    });
                  }
                }  
                item.businessTypeParams = currentBusinessTypeParams;
              })
              _this.bonusList = bouns2;
            }else{
              _this.bonusList = [];
            }

            if(bouns3 && bouns3.length != 0){
              bouns3.forEach(item => {
                let currentBusinessTypeParams = JSON.parse(JSON.stringify(businessTypeParams));
                if(item.businessIds){
                  let businessType = item.businessIds.toString();
                  if(businessType && businessType.length != 0){
                    currentBusinessTypeParams.forEach(item1 => {
                        if(businessType.indexOf(item1.id) != -1){
                            item1.select = true;
                        }
                    });
                  }
                }  
                item.businessTypeParams = currentBusinessTypeParams;
              })
              _this.bonusList1 = bouns3;
            }else{
              _this.bonusList1 = [];
            }
            
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
   
     
      manageBusinessSet(){
        let departRange = this.departRange;
        let includeMy = this.includeMy;
        let layerId = this.$layer.iframe({
          content: {
            content: ManageBusinessSetPage, //传递的组件对象
            parent: this, //当前的vue对象
            data: {
              departRange:departRange,
              includeMy:includeMy,

            } //props
          },
          area: ["600px", "450px"],
          title: "管理业绩部门设置 【" + this.getrowData.user +"&nbsp;&nbsp;&nbsp;&nbsp;"+this.getrowData.time+"】",
          shadeClose: false,
          shade: true, //是否显示遮罩
          zIndex: 198911100,
          cancel: () => {
            //关闭事件
          }
        });
      },
      setManageDepart(form){
        this.departRange = form.departRange;
        this.includeMy = form.includeMy;
      },
      
      setManageDepartUser(form){
        this.departRange = form.departRange;
        this.includeMy = form.includeMy;
        this.departIds = form.departIds; 
      },
				
			// achievementBusinessSet(){
   //      console.log(this.getrowData);
   //      let departId = this.departId;
   //      let departRange = this.departRange;
   //      let includeMy = this.includeMy;
   //      let departIds = this.departIds;
        
   //      let layerId = this.$layer.iframe({
   //        content: {
   //          content: ManageBusinessSetUserPage, //传递的组件对象
   //          parent: this, //当前的vue对象
   //          data: {
   //            departRange:departRange,
   //            includeMy:includeMy,
   //            departId:departId,
   //            departIds:departIds,
   //          } //props
   //        },
   //        area: ["600px", "450px"],
   //        title: "管理业绩部门设置 【" + this.getrowData.user +"&nbsp;&nbsp;&nbsp;&nbsp;"+this.getrowData.time+"】",
   //        shadeClose: false,
   //        shade: true, //是否显示遮罩
   //        zIndex: 198911100,
   //        cancel: () => {
   //          //关闭事件
   //        }
   //      });
   //    },
     
      //增加星级
      addStarLevel(){
        let Evaluation= this.Evaluation;
        let count = 0;
        Evaluation.forEach(item=>{
            if(item.deleted == 0){
              count ++;
            }
        })
        count=count+1
        let staffOrUserType=this.staffOrUserType
        if(staffOrUserType==0){
          this.Evaluation.push({
            id: "0",
            staffTimeId:this.staffTimeId,
            starLevel:count,
            lowerLimit:"",
            upperLimit:"",
            remark:"",
            deleted:0,
            type: 0,
          },)
        }else{
          this.Evaluation.push({
            id: "0",
            userTimeId:this.userTimeId,
            starLevel:count,
            lowerLimit:"",
            upperLimit:"",
            remark:"",
            deleted:0,
            type: 0,
          },)
        }

      },
      //减少星级
      deletedStarLevel(elem,i){
        let deleted = elem.deleted;
        let id = elem.id;
        let Evaluation= this.Evaluation;
        elem.deleted = 1;
        if(id == '0'){
          let arr1 = [];
          let count = 1;
          Evaluation.forEach((item,index) =>{
            if(i != index){
              item.starLevel = count;
              count ++;
              arr1.push(item);
            }
          })
          this.Evaluation = arr1;
        }else{
          let arr2 = [];
          let count = 1;
          Evaluation.forEach((item,index) =>{
            if(i != index){
              item.starLevel = count;
              count ++;
              arr2.push(item);
            }else{
              arr2.push(item);
            }
          })
          this.Evaluation = arr2;
        }
      },
      changePercentageType(elem){
         let _this = this;
         let bonus = elem.bonus;
         if(bonus && bonus.length != 0){
           let arr = [];
           bonus.forEach(function(item){
              if(item.id != '0'){
                  item.deleted = 1;
                  arr.push(item);
              }
           })
           arr.push(
              {
                id: "0",
                staffTimeId:_this.staffTimeId,
                lowerLimit:"",
                upperLimit:"",
                remark:"",
                type: 1,
                percent:"",
                percentSecond:"",
                deleted: 0,
            });
           
           elem.bonus = arr;  
         }
      },
      changePercentageType1(elem){
         let _this = this;
         let bonus = elem.bonus;
         if(bonus && bonus.length != 0){
           let arr = [];
           bonus.forEach(function(item){
              if(item.id != '0'){
                  item.deleted = 1;
                  arr.push(item);
              }
           })
           arr.push(
              {
                id: "0",
                staffTimeId:_this.staffTimeId,
                lowerLimit:"",
                upperLimit:"",
                remark:"",
                type: 2,
                percent:"",
                percentSecond:"",
                deleted: 0,
            });
           
           elem.bonus = arr;  
         }
      },
      changeBusinessType(elem){
        let businessType = elem.businessType;
        let businessTypeParams = this.businessTypeParams;
        
        let businessTypeName = "";
        let businessTypeSpecail = "";
        businessTypeParams.forEach(function(item){
          if(item.id == businessType){
              businessTypeName = item.name+"-";
              businessTypeSpecail = item.id;
          }
        })
        let count = 1;
        let bonusList = this.bonusList;
        let arrSpecail = [];
        bonusList.forEach(function(item){
          if(item.businessType == businessTypeSpecail && item.show == 0){
            
            let currentBusinessTypeName = "业" + ("模式"+count);
            item.businessTypeName = currentBusinessTypeName;
            item.patternLevel = count;
            count ++;
          }
          arrSpecail.push(item);
        })
        this.bonusList = arrSpecail;  
      },
      changeBusinessType1(elem){
        let businessType = elem.businessType;
        let businessTypeParams = this.businessTypeParams;
        
        let businessTypeName = "";
        let businessTypeSpecail = "";
        businessTypeParams.forEach(function(item){
          if(item.id == businessType){
              businessTypeName = item.name+"-";
              businessTypeSpecail = item.id;
          }
        })
        let count = 1;
        let bonusList = this.bonusList1;
        let arrSpecail = [];
        bonusList.forEach(function(item){
          if(item.businessType == businessTypeSpecail && item.show == 0){
            
            let currentBusinessTypeName = "管" + ("模式"+count);
            item.businessTypeName = currentBusinessTypeName;
            item.patternLevel = count;
            count ++;
          }
          arrSpecail.push(item);
        })
        this.bonusList1 = arrSpecail;  
      },
      
      //增加提金一行
      addBouns(elem){
        elem.bonus.push(
          {
            id: "0",
            staffTimeId:this.staffTimeId,
            lowerLimit:"",
            upperLimit:"",
            remark:"",
            type: 1,
            percent:"",
            percentSecond:"",
            deleted: 0,
          }
        )
      },
       //增加提金一行
      addBouns1(elem){
        elem.bonus.push(
          {
            id: "0",
            staffTimeId:this.staffTimeId,
            lowerLimit:"",
            upperLimit:"",
            remark:"",
            type: 1,
            percent:"",
            percentSecond:"",
            deleted: 0,
          }
        )
      },
      
      //增加提金模式
      addBounsModel(num){
        let _this = this;
        let staffOrUserType=this.staffOrUserType;
        let percentageType = this.percentageTypeParams[0].id;
        let businessType = this.businessTypeParams[0].id;
        let businessTypeParams = this.businessTypeParams;
        let bonusList = this.bonusList;
        let businessTypeName = "业-";
        let count = 1;
        bonusList.forEach(function(item){
          if(item.businessType == businessType && item.show == 0){
            count ++;
          }
        })
        businessTypeName += ("模式"+count);
        if(staffOrUserType==0){
          this.bonusList.push({
            cost: "",
            isMinimum: '1',
            patternLevel: count,
            
            percentageType:percentageType ,
            businessType:businessType,
            show:0,
            businessTypeName:businessTypeName,
            businessTypeParams:JSON.parse(JSON.stringify(_this.businessTypeParams)),
            bonus:[
              {
                id: "0",
                staffTimeId:this.staffTimeId,
                lowerLimit:"",
                upperLimit:"",
                remark:"",
                type: 1,
                percent:"",
                percentSecond:"",
                deleted: 0
              }
            ]

          })
        }else{
          this.bonusList.push({
            cost: "",
            isMinimum: '1',
            patternLevel: count,
            percentageType:percentageType ,
            businessType:businessType,
            show:0,
            businessTypeName:businessTypeName,
            businessTypeParams:JSON.parse(JSON.stringify(_this.businessTypeParams)),
            bonus:[
              {
                id: "0",
                userTimeId:this.userTimeId,
               lowerLimit:"",
                upperLimit:"",
                remark:"",
                type: 1,
                percent:"",
                percentSecond:"",
                deleted: 0
              }
            ]

          })
        }

        var num=0
        for(var c=0; this.bonusList.length>c;c++){
            if(this.bonusList[c].show=="0"){
              num+=1
              this.bonusList[c].patternLevel=num
              this.bonusList[c].index=num
            }
        }

      },
      addBounsModel1(num){
        let _this = this;
        let staffOrUserType=this.staffOrUserType;
        let percentageType = this.percentageTypeParams[0].id;
        let businessType = this.businessTypeParams[0].id;
        let businessTypeParams = this.businessTypeParams;
        let bonusList = this.bonusList1;
        let businessTypeName = "管-";
        let count = 1;
        bonusList.forEach(function(item){
          if(item.businessType == businessType && item.show == 0){
          count ++;
          }
        })
        businessTypeName += ("模式"+count);
        if(staffOrUserType==0){
          this.bonusList1.push({
          cost: "",
          isMinimum: '1',
          patternLevel: count,
          
          percentageType:percentageType ,
          businessType:businessType,
          show:0,
          businessTypeName:businessTypeName,
          businessTypeParams:JSON.parse(JSON.stringify(_this.businessTypeParams)),
          bonus:[
            {
            id: "0",
            staffTimeId:this.staffTimeId,
            lowerLimit:"",
            upperLimit:"",
            remark:"",
            type: 1,
            percent:"",
            percentSecond:"",
            deleted: 0
            }
          ]

          })
        }else{
          this.bonusList1.push({
          cost: "",
          isMinimum: '1',
          patternLevel: count,
          percentageType:percentageType ,
          businessType:businessType,
          show:0,
          businessTypeName:businessTypeName,
          businessTypeParams:JSON.parse(JSON.stringify(_this.businessTypeParams)),
          bonus:[
            {
            id: "0",
            userTimeId:this.userTimeId,
            lowerLimit:"",
            upperLimit:"",
            remark:"",
            type: 1,
            percent:"",
            percentSecond:"",
            deleted: 0
            }
          ]

          })
        }

        var num=0
        for(var c=0; this.bonusList1.length>c;c++){
          if(this.bonusList1[c].show=="0"){
            num+=1
            this.bonusList1[c].patternLevel=num
            this.bonusList1[c].index=num
          }
        }

      },
      //减少提金模式
      deletedBounsModel(elem,index){
         let _this = this;
         let bonusList = this.bonusList;
         let bonus = elem.bonus;
         let arr = [];
         
         bonus.forEach(function(item,index1){
           if(item.id != 0){
              item.deleted = 1;
              arr.push(item);
           }
         })
         if(arr && arr.length != 0){
           elem.bonus = arr;
           elem.show = 1;
         }else{
           let arr1 = [];
           bonusList.forEach(function(item,index1){
             if(index != index1){
               arr1.push(item);
             }
           })


           _this.bonusList = arr1;
         }

        
          let businessType = elem.businessType;
          let businessTypeParams = this.businessTypeParams;
         
          let businessTypeName = "";
          let businessTypeSpecail = "";
          businessTypeParams.forEach(function(item){
            if(item.id == businessType){
               businessTypeName = item.name+"-";
               businessTypeSpecail = item.id;
            }
          })
          let count = 1;
          bonusList = this.bonusList;
          let arrSpecail = [];
          bonusList.forEach(function(item){
            if(item.businessType == businessTypeSpecail && item.show == 0){
              let currentBusinessTypeName = businessTypeName + ("模式"+count);
              item.businessTypeName = currentBusinessTypeName;
              item.patternLevel = count;
              count ++;
            }
            arrSpecail.push(item);
          })
          this.bonusList = arrSpecail;
      },
      deletedBounsModel1(elem,index){
         let _this = this;
         let bonusList = this.bonusList1;
         let bonus = elem.bonus;
         let arr = [];
         
         bonus.forEach(function(item,index1){
           if(item.id != 0){
              item.deleted = 1;
              arr.push(item);
           }
         })
         if(arr && arr.length != 0){
           elem.bonus = arr;
           elem.show = 1;
         }else{
           let arr1 = [];
           bonusList.forEach(function(item,index1){
             if(index != index1){
               arr1.push(item);
             }
           })


           _this.bonusList1 = arr1;
         }

        
          let businessType = elem.businessType;
          let businessTypeParams = this.businessTypeParams;
         
          let businessTypeName = "";
          let businessTypeSpecail = "";
          businessTypeParams.forEach(function(item){
            if(item.id == businessType){
               businessTypeName = item.name+"-";
               businessTypeSpecail = item.id;
            }
          })
          let count = 1;
          bonusList = this.bonusList1;
          let arrSpecail = [];
          bonusList.forEach(function(item){
            if(item.businessType == businessTypeSpecail && item.show == 0){
              let currentBusinessTypeName = businessTypeName + ("模式"+count);
              item.businessTypeName = currentBusinessTypeName;
              item.patternLevel = count;
              count ++;
            }
            arrSpecail.push(item);
          })
          this.bonusList1 = arrSpecail;
      },
      deletedBouns(elem,elem1,index){
         if(elem1.id == '0'){
           let bonus = elem.bonus;
           let arr = 0;
           bonus.forEach(function(item,index1){
             if(index1 != index){
               arr.push(item);
             }
           })
           elem.bonus = arr;
         }else{
           elem1.deleted = 1;
         }
      },
      deletedBouns1(elem,elem1,index){
         if(elem1.id == '0'){
           let bonus = elem.bonus;
           let arr = 0;
           bonus.forEach(function(item,index1){
             if(index1 != index){
               arr.push(item);
             }
           })
           elem.bonus = arr;
         }else{
           elem1.deleted = 1;
         }
      },
    },
    mounted(){
      debugger;
      this.clickGetUserData();
    }

  }
</script>

<style lang="scss" scoped>
  .wfsize{
    font-family: '微软雅黑 Bold', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    color: #333333;
  }
 
  .wfsize{
    font-family: '微软雅黑 Bold', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    color: #333333;
  }
  .rjs{
    background:url(../../../images/qiet.png) -9px -234px;
    width:25px;
    height:25px;
    display:inline-block;
  }
  
  .backss2{
    background:url(../../../images/xuanzhong.png) 5px  2px no-repeat;
    width:120px;
    height:27px;
    display:inline-block;
    right: 15px;
    float: left;
  }
  .backss{
    background:url(../../../images/weixuanzhong.png) 9px 2px no-repeat;
    width:120px;
    height:27px;
    display:inline-block;
    margin-left: 2px;
    background-color: #DCD9D3;
  }
  /deep/ .el-tabs--border-card{
    box-shadow:0;
  }
  .require-word:before{
    content: '*';
    color: #F56C6C;
    margin-right: 1px;
  }
  .input-l-word{
    display:inline-block;
    line-height:28px;
    padding-right:5px;
  }
  .width-60{
    width:55px;
  }
  .width-110{
    width:110px;
  }
  .books .pop-up{
    padding-bottom:0 !important;
    .pop-up-container{
      border-width:0px;
    }
  }

  .select{
    width:100px;
  }
  .books-name{
    width:495px;
  }
  .mearsure-unit{
    line-height:25px;
    color:#606266;
    font-size:12px;
    padding-left:5px;
  }
  .icon-user{
    line-height:25px;
    padding-left:5px;
  }
  .remark{
    margin-top:5px;
    width:495px;
  }
  .select-item {
    margin-left: 0px;
  }
  .books-icon{
    background:url(../../../images/system/tupian.png) -15px -15px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .user-icon{
    background:url(../../../images/system/wuyezhu.png) -15px -15px;
    width:20px;
    height:20px;
    display:inline-block;
  }
  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
  }
  .padding-t-5{
    padding-top:5px;

  }
  .padding-t-b-5{
    padding:5px 0;
  }
  .left-word{
    height: 14px;
    width: 78px;
    text-align: right;
    line-height: 14px;
  }
  .rigth-word{
    font-size:12px;
  }
  .check-radio{
    padding: 0 5px 0 11px;
  }
  .special-word{

    color:#999;
  }
  .color1{
    color:#336699;
    font-size:12px;
  }
  .color2{
    color:#999999;
    font-size:12px;
  }
  .rules{
    /deep/ .el-form-item__content{
      line-height:18px !important;
    }
    /deep/ .el-radio__input.is-checked+.el-radio__label {
      color: #333;
      font-size:12px;
      padding:0;
    }
    /deep/ .el-radio__label {
      font-size: 12px;
      padding:0;
    }
  }
  .border-box{
      padding:8px 8px 0;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/iborder.png")  2 repeat ;
    }
  /deep/ .el-textarea__inner{
    padding:5px;
    font-size:12px;
    border:1px solid #aaa;
  }
</style>
