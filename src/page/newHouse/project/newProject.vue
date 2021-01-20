<template>
  <div style="width:100%;" >
      <div class="pop-up" style="margin:0 10px;width:calc(100% - 20px);" >
        <div class="pop-up-container" style="height:464px;overflow-y:auto;overflow-x:hidden;" >
          <el-form ref="formsData"  :model="form" >
            <div class="clear" >
              <div class="left left-fundation"  >
                <div class="clear" >
                  <span class="message-title" >
                    基础信息
                  </span>
                </div>
                <div class="img-style" >
                  <image src=""  style="" />
                </div>
              </div>
              <div class="left center-fundation"  >
                <div class="clear" >
                  <div class="left  padding-r-2 des-left-word"  >
                    <span class="word " >项目编号</span>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="projectCode" >
                      <el-input :disabled="true" style="width:100px;" v-model.trim="form.projectCode"  title="[自动编号]"  autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                  <div class="left  padding-r-2 des-word" style="width:72px;"  >
                    <span class="word require-word" >项目名称</span>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="projectName" >
                      <el-input style="width:100px;" v-model.trim="form.projectName"  maxlength="20" title="上限20个字"  autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left  padding-r-2 des-left-word" >
                    <span class="word require-word" >地域</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="districtId" >
                      <el-select @change="findStreeByTown" v-model="form.districtId"    style="width:100px;" >
                        <el-option v-for="item in areas"  :label="item.label" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="streetId" >
                      <el-select v-model="form.streetId"    style="width:170px;" >
                        <el-option v-for="item in streetArr"  :label="item.label" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left  padding-r-2 des-left-word" >
                    <span class="word " >信息负责人</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="responsibleDept" >
                      <el-select @change="findUserByDepart" v-model="form.responsibleDept"    style="width:100px;" >
                        <el-option  label=" " value="" ></el-option>
                        <el-option  v-for="item in departTree"  :label="item.name" :value="item.id">
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="responsibleEmp" >
                      <el-select v-model="form.responsibleEmp"    style="width:170px;" >
                        <el-option  label=" " value="" ></el-option>
                        <el-option v-for="item in userParams"  :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"  ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
              </div>
                <div class="clear" >
                  <div class="left  padding-r-2 des-left-word"  >
                    <span class="word special-color-word" >投&nbsp;资&nbsp;商</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="investor" >
                      <el-input v-model="form.investor" maxlength="20" title="上限20个字"    style="width:100px;" >

                      </el-input>
                    </el-form-item>
                  </div>
                  <div class="left  padding-r-2 des-word" style="width:70px;"  >
                    <span class="word special-color-word" >开&nbsp;发&nbsp;商</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="developer" >
                      <el-input v-model="form.developer" maxlength="20" title="上限20个字"   style="width:100px;" >

                      </el-input>
                    </el-form-item>
                  </div>

              </div>
                <div class="clear" style="position:relative;" >
                  <div class="left  padding-r-2 des-left-word"    >
                    <span class="word special-color-word" >拿地日期</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="placeGetDate" >
                      <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.placeGetDate" style="width: 100px;"></el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="clear" style="position: absolute;left: 173px;width: 351px;" >
                    <div class="left  padding-r-2 des-left-word"  >
                      <span class="word " >销售地址</span>
                    </div>
                    <div class="left padding-r-2" >
                      <el-form-item  prop="projectAddress" >
                        <el-input style="width:272px;" v-model.trim="form.projectAddress" maxlength="60" title="上限60个字" autocomplete="off"></el-input>
                      </el-form-item>
                    </div>
                  </div>


              </div>
              </div>
              <div class="left right-fundation"  >
                <div class="clear" >
                  <div class="left  padding-r-2 des-word" style="width:70px;"  >
                    <span class="word " >登记名称</span>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="registerName" >
                      <el-input style="width:100px;" v-model.trim="form.registerName" maxlength="20" title="上限20个字"   autocomplete="off"></el-input>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear" >
                  <div class="left  padding-r-2 des-word"  style="width:70px;"  >
                    <span class="word " >自定号</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="num" >
                      <el-select v-model="form.num"    style="width:100px;" >
                        <el-option  label=" " value="" ></el-option>
                        <el-option v-for="item in numParams"  :label="item.name" :value="item.name" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear" >
                  <div class="left  padding-r-2 des-word" style="width:70px;"  >
                    <span class="word special-color-word" >营销状态</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="projectState" >
                      <el-select v-model="form.projectState"    style="width:100px;" >
                        <el-option  label=" " value="" ></el-option>
                        <el-option v-for="item in projectStateParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear" >
                  <div class="left  padding-r-2 des-word" style="width:70px;"  >
                    <span class="word special-color-word" >合作状态</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="cooperateState" >
                      <el-select v-model="form.cooperateState"    style="width:100px;" >
                        <el-option  label=" " value="" ></el-option>
                        <el-option v-for="item in cooperateStateParams"  :label="item.name" :value="item.id" ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                </div>
                <div class="clear" >


                </div>
              </div>
            </div>
            <div class="break" >
            </div>
            <div class="sell-content" >
              <div class="clear" >
                  <span class="message-title" >
                    销售信息
                  </span>
              </div>
              <div class="clear" >
                <div class="clear" >
                   <div class="left" >
                     <span class="des-type-word" >项目证件</span>
                   </div>
                   <div class="left clear" >
                     <div class="left clear every-check" v-for="(item ,index ) in documentsParams" >
                       <div class="left" >
                           <input type="checkbox" style="height:28px;"   v-model="item.check"  :value="item.id"  ></input>

                       </div>
                       <div class="left" >
                         <span class="check-des-word" >{{item.name}}</span>
                       </div>
                     </div>
                   </div>
                </div>
                <div class="clear" >
                  <div class="left" >
                    <span class="des-type-word" >产品类型</span>
                  </div>
                  <div class="left clear" >
                    <div class="left clear every-check-special" v-for="(item ,index ) in typesParams" >
                      <div class="left" >

                          <input type="checkbox"   style="height:28px;"   v-model="item.check"  :value="item.id"  ></input>

                      </div>
                      <div class="left" >
                        <span class="check-des-word" >{{item.name}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left" >
                    <span class="des-type-word" >项目亮点</span>
                  </div>
                  <div class="left clear" >
                    <div class="left clear every-check-special" v-for="(item ,index ) in highlightsParams" >
                      <div class="left" >

                          <input type="checkbox"  style="height:28px;"   v-model="item.check" :value="item.id"  ></input>

                      </div>
                      <div class="left" >
                        <span class="check-des-word" >{{item.name}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left des-type-special-word"  >
                    <span class="word" >项目均价</span>
                  </div>
                  <div class="left padding-r-2"  >
                    <el-form-item  prop="avePriceLow" >
                      <el-input @input="checkNum1" maxlength="13" title="上限10位数" style="width:80px;" v-model.trim="form.avePriceLow" autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left " >
                    <el-form-item  prop="avePriceHigh" >
                      <el-input @input="checkNum2"  style="width:80px;" maxlength="13" title="上限10位数" v-model.trim="form.avePriceHigh" autocomplete="off"  ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word" >元/㎡</span>
                  </div>
                  <div class="left des-type-special-word" style="width:95px;"  >
                    <span class="word" >主力面积</span>
                  </div>
                  <div class="left padding-r-2"  >
                    <el-form-item  prop="avePriceLow" >
                      <el-input @input="checkNum7" style="width:80px;" maxlength="13" title="上限10位数"  v-model.trim="form.areaLow" autocomplete="off" ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left " >
                    <el-form-item  prop="avePriceHigh" >
                      <el-input @input="checkNum8"  style="width:80px;" maxlength="13" title="上限10位数"  v-model.trim="form.areaHigh" autocomplete="off"  ></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" >
                    <span class="word" >㎡</span>
                  </div>
                  <div class="left padding-r-2" style="width:72px;text-align:right;" >
                    <span class="word" >联系人</span>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="contactor" >
                      <el-input  style="width:100px;" maxlength="10" title="上限10个字" v-model.trim="form.contactor" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" >
                  <div class="left  padding-r-2" style="padding:0 5px;" >
                    <span class="word " >首开日期</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="startDate" >
                      <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.startDate" style="width: 100px;"></el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="left  padding-r-2" style="padding-left:41px;" >
                    <span class="word " >最晚交房</span>
                  </div>
                  <div class="left padding-r-2" >
                    <el-form-item  prop="endDate" >
                      <el-date-picker size="mini" value-format="yyyy-MM-dd" type="date"   v-model="form.endDate" style="width: 100px;"></el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" style="width:70px;text-align:right;" >
                    <span class="word" >产权年限</span>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="propertyYear" >
                      <el-input  style="width:100px;" maxlength="5" title="上限5个字" v-model.trim="form.propertyYear" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                  <div class="left padding-r-2" style="width:73px;text-align:right;" >
                    <span class="word" >联系电话</span>
                  </div>
                  <div class="left" >
                    <el-form-item  prop="contactorPhone" >
                      <el-input @input="checkNum3"   style="width:100px;" maxlength="15" title="上限15位数" v-model.trim="form.contactorPhone" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>

            </div>
            <div class="break" >
            </div>
            <div class="clear plan-content" >
              <div class="clear" >
                  <span class="message-title" >
                    规划信息
                  </span>
              </div>
              <div class="clear" >
                <div class="left des-type-special-word" >
                  <span class="word" >占地面积</span>
                </div>
                <div class="left padding-r-2" >
                  <el-form-item  prop="coverArea" >
                    <el-input @input="checkNum4" maxlength="13" title="上限10位数"  style="width:100px;" v-model.trim="form.coverArea" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div class="left padding-r-2" >
                  <span class="word" >㎡</span>
                </div>
                <div class="left padding-r-2" style="width:76px;text-align:right;" >
                  <span class="word" >建筑面积</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="buildingArea" >
                    <el-input  @input="checkNum5" maxlength="13" title="上限10位数" style="width:100px;" v-model.trim="form.buildingArea" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div class="left" >
                  <span class="word" >㎡</span>
                </div>
                <div class="left padding-r-2" style="width:60px;text-align:right;" >
                  <span class="word" >建筑类型</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="buildingType" >
                    <el-input  style="width:271px;" maxlength="30" title="上限30个字" v-model.trim="form.buildingType" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

              </div>
              <div class="clear" >
                <div class="left des-type-special-word" >
                  <span class="word" >总户数</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="ownerCount" >
                    <el-input  style="width:100px;" v-model.trim="form.ownerCount" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

                <div class="left padding-r-2" style="width:94px;text-align:right;" >
                  <span class="word" >停车位</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="parkingCount" >
                    <el-input  style="width:100px;" v-model.trim="form.parkingCount" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

                <div class="left padding-r-2" style="width:73px;text-align:right;" >
                  <span class="word" >物业公司</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="propertyCompany" >
                    <el-input  style="width:272px;" maxlength="20" title="上限20个字" v-model.trim="form.propertyCompany" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

              </div>
              <div class="clear" >
                <div class="left des-type-special-word" >
                  <span class="word" >绿化率</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="propertyGreen" >
                    <el-input  style="width:100px;" maxlength="5" title="上限2位数" v-model.trim="form.propertyGreen" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

                <div class="left padding-r-2" style="width:93px;text-align:right;" >
                  <span class="word" >燃气</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="propertyGas" >
                    <el-input  style="width:100px;" maxlength="10" title="上限10个字符" v-model.trim="form.propertyGas" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

                <div class="left padding-r-2" style="width:73px;text-align:right;" >
                  <span class="word" >水</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="propertyWater" >
                    <el-input  style="width:100px;" maxlength="10" title="上限10个字符" v-model.trim="form.propertyWater" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div class="left  padding-r-2" style="width:62px;text-align:right;" >
                  <span class="word" >物业费</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="propertyFee" >
                    <el-input @input="checkNum6"  style="width:111px;" maxlength="10" title="上限10个字符" v-model.trim="form.propertyFee" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="clear" >
                <div class="left des-type-special-word" >
                  <span class="word" >容积率</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="propertySpace" >
                    <el-input  style="width:100px;" maxlength="5" title="上限10位数" v-model.trim="form.propertySpace" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

                <div class="left padding-r-2" style="width:93px;text-align:right;" >
                  <span class="word" >供暖</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="propertyHot" >
                    <el-input  style="width:100px;" maxlength="10" title="上限10个字符" v-model.trim="form.propertyHot" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

                <div class="left padding-r-2" style="width:73px;text-align:right;" >
                  <span class="word" >电</span>
                </div>
                <div class="left" >
                  <el-form-item  prop="propertyElectricity" >
                    <el-input  style="width:100px;" maxlength="10" title="上限10个字符" v-model.trim="form.propertyElectricity" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

              </div>
              <div class="clear" style="padding-bottom:10px;" >
                <div class="left des-type-special-word" >
                  <span class="word" >项目描述</span>
                </div>
                <div class="left" style="padding-top:5px;" >
                  <textarea v-model="form.remark" maxlength="1000" title="上限1000个字" class="remark" style="width:638px;height:80px;" ></textarea>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
          <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
        </div>
      </div>

  </div>
</template>

<script>
  //获取数据

  import {getparams,addNewHouse} from '../../../service/newHouse'
  import {findUserByDepartId} from "../../../service/organizeDate";
  import {findbyId} from '../../../service/getData'
  export default {
    props:["newProjectVisible",'layerid'],
    data() {
      return {
        dialogVisible:this.newProjectVisible,
        projectStateParams:[],
        numParams:[],
        departTree:[],
        userParams:[],
        areas:[],
        streetArr:[],
        documentsParams:[],
        typesParams:[],
        highlightsParams:[],
        cooperateStateParams:[],
        form:{
          id:'',
          projectCode:'',
          projectName:'',
          districtId:'',
          streetId:'',
          responsibleDept:'',
          responsibleEmp:'',
          investor:'',
          developer:'',
          projectAddress:'',
          registerName:'',
          num:'',
          projectState:'',
          cooperateState:'',
          placeGetDate:'',
          areaLow:'',
          areaHigh:'',
          avePriceLow:'0',
          avePriceHigh:'0',
          description:'',
          contactor:'',
          contactorPhone:'',
          startDate:'',
          endDate:'',
          propertyYear:'',
          coverArea:'',
          buildingArea:'',
          buildingType:'',
          ownerCount:'',
          parkingCount:'',
          propertyCompany:'',
          propertyGreen:'',
          propertyGas:'',
          propertyWater:'',
          propertyFee:'',
          propertySpace:'',
          propertyHot:'',
          propertyElectricity:'',
          remark:'',
          num5:'',
        },
      }
    },
    components:{

    },
    methods:{
      checkNum1(){
        this.form.avePriceLow= this.form.avePriceLow.replace(/[^\.\d]/g,'');
      },
      checkNum2(){
        this.form.avePriceHigh= this.form.avePriceHigh.replace(/[^\.\d]/g,'');
      },
      checkNum3(){
        this.form.contactorPhone= this.form.contactorPhone.replace(/[^\d]/g,'');
      },

      checkNum4(){
        this.form.coverArea= this.form.coverArea.replace(/[^\.\d]/g,'');
      },
      checkNum5(){
        this.form.buildingArea= this.form.buildingArea.replace(/[^\.\d]/g,'');
      },
      checkNum6(){
        this.form.propertyFee= this.form.propertyFee.replace(/[^\.\d]/g,'');
      },
      checkNum7(){
        this.form.areaLow= this.form.areaLow.replace(/[^\.\d]/g,'');
      },
      checkNum8(){
        this.form.areaHigh= this.form.areaHigh.replace(/[^\.\d]/g,'');
      },

      showDialog(){
        this.dialogVisible = true;

      },
      getParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        getparams().then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.projectStateParams = data.projectStateParams;
            _this.numParams = data.numParams;

            if(data.departTree) {
              let arr = [];
              let treeData = data.departTree
              for (let i = 0; i < treeData.length; i++) {
                arr.push({
                  id: treeData[i].id,
                  name: treeData[i].label.replace(/&nbsp;/g, ""),
                  level: treeData[i].level,
                  state:treeData[i].state,
                })
              }
              _this.departTree = arr;
            }
            let initArr = [{id:"0",label:" "}];
            
            _this.areas = data.areas;
            _this.form.districtId = data.areas[0].id;
            let streets = data.streets;
            if(streets && streets.length != 0){
              _this.streetArr = initArr.concat(streets);
            }    
           

            if(data.highlightsParams){
              let  highlightsParams = data.highlightsParams;
              highlightsParams.forEach(function(item){
                item.check = 0;
              })
              _this.highlightsParams = data.highlightsParams;
            }

            if(data.documentsParams){
              let  documentsParams = data.documentsParams;
              documentsParams.forEach(function(item){
                item.check = 0;
              })
              _this.documentsParams = data.documentsParams;
            }
            if(data.typesParams){
              let  typesParams = data.typesParams;
              typesParams.forEach(function(item){
                item.check = 0;
              })
              _this.typesParams = data.typesParams;
            }
            if(data.cooperateStateParams){
              let cooperateStateParams = data.cooperateStateParams;
              cooperateStateParams.forEach(function(item){
                item.check = 0;
              })
              _this.cooperateStateParams = data.cooperateStateParams;
            }
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },
      findStreeByTown(val){
        let _this = this;

        if(val){
          findbyId(val).then(function(response){
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let initArr = [{id:"0",label:" "}];
              if(data && data.length != 0){
                _this.streetArr = initArr.concat(data);
                _this.form.streetId = '';
              }else{
                _this.streetArr = initArr;
                _this.form.streetId = '';
              }

            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message+"！");
            }
          })
        }
      },
      findUserByDepart(){
        let _this = this;
        let id = this.form.responsibleDept;
        if(id) {
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function (response) {
            if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
              let data = response.data;
              let user = data.user;
              let arr = [];
              if(user && user.length != 0){
                user.forEach(function(item){
                  
                  let obj = {
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  }
                  if(item.paramName == '正式离职'){
                    obj.stateUser  = 1;
                  }
                  arr.push(obj);
                })
              }
              _this.userParams =  arr;
              _this.form["responsibleEmp"] = '';
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
          })
        }
      },
      //保存数据
      saveFormData(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.form)) ;
        let streetId = form.streetId;
        let projectName = form.projectName;
        let documentsParams = this.documentsParams;
        let typesParams = this.typesParams;
        let highlightsParams = this.highlightsParams;
        let documentIds = [];
        let typesIds = [];
        let hightIds = [];
        if(projectName == ''){
          this.myAlert("项目名称不能为空！",'dangerous-icon');
          return false;
        }
        if(streetId == ''){
          this.myAlert("地域不能为空！",'dangerous-icon');
          return false;
        }
        documentsParams.forEach(function(item){
          if(item.check != '0'){
            documentIds.push(item.id);
          }
        })
        typesParams.forEach(function(item){
          if(item.check != '0'){
            typesIds.push(item.id);
          }
        })
        highlightsParams.forEach(function(item){
          if(item.check != '0'){
            hightIds.push(item.id);
          }
        })
        form.documents = documentIds.toString();
        form.types = typesIds.toString();
        form.highlights = hightIds.toString();

        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        addNewHouse(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.myAlert("保存成功！", 'success-icon').then(res => {
              let projectId = response.data;
              _this.saveDialog(projectId);
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },
      saveDialog(projectId){
        let _this = this;
        _this.myConfirm("是否继续填写代理信息?", 'question-icon','是','否').then(res => {
          _this.clearFormData();
          _this.$parent.reloadProjectList(2,projectId,_this.form.projectName);
        }).catch(err => {
          _this.clearFormData();
          _this.$parent.reloadProjectList(1);
        })
      },
      clearFormData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },
    },
    mounted(){
      this.getParamsData();
    },
    watch:{
      'form.avePriceLow':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.avePriceLow = undefined;
            return;
          }
          this.form.avePriceLow = oldval
        } else {
          this.form.avePriceLow = newval.replace(/^\./g, "")
        }
      },
      'form.avePriceHigh':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.avePriceHigh = undefined;
            return;
          }
          this.form.avePriceHigh = oldval
        } else {
          this.form.avePriceHigh = newval.replace(/^\./g, "")
        }
      },
      'form.areaLow':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.areaLow = undefined;
            return;
          }
          this.form.areaLow = oldval
        } else {
          this.form.areaLow = newval.replace(/^\./g, "")
        }
      },
      'form.areaHigh':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.areaHigh = undefined;
            return;
          }
          this.form.areaHigh = oldval
        } else {
          this.form.areaHigh = newval.replace(/^\./g, "")
        }
      },
      'form.coverArea':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.coverArea = undefined;
            return;
          }
          this.form.coverArea = oldval
        } else {
          this.form.coverArea = newval.replace(/^\./g, "")
        }
      },
      'form.buildingArea':function(newval, oldval){
        var reg = /^(\d{0,10})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.buildingArea = undefined;
            return;
          }
          this.form.buildingArea = oldval
        } else {
          this.form.buildingArea = newval.replace(/^\./g, "")
        }
      },
      'form.propertyGreen':function(newval, oldval){
        var reg = /^(\d{0,2})(\.(\d{0,2}))?$/g;
        if (!reg.test(newval)) {
          if (newval == undefined) {
            this.form.propertyGreen = undefined;
            return;
          }
          this.form.propertyGreen = oldval
        } else {
          this.form.propertyGreen = newval.replace(/^\./g, "")
        }
      },
      
    },
    //新增弹窗页面中 增加销毁弹窗移除内存方法
    beforeDestroy(){
        let _this = this;
        _this.$store.state.layerifranme.forEach((item,index)=>{
          if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
            _this.$store.state.layerifranme.splice(index,1);
          }
        }); 
        //详情弹窗中在销毁弹窗方法中调用父页面的默认方法
        _this.$parent.shadenum();
      },
  }
</script>
<style lang="scss" scoped>
@import '../../../style/editor.scss'
</style>
<style lang="scss" scoped>

  @import '../../../style/project.scss'
</style>
<style lang="scss" scoped>
  .padding1{
    padding-left:0px;
    display:inline-block;
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
  } 
</style>


