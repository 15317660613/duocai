<template>
  <div class="" style="width:100%;margin:0 10px;" >
    <div class="pop-up" style="height: 400px;padding-left:0px;">
      <div class="pop-up-container clear" >
        <el-form ref="formsData" :model="form" >
          <div class="clear " style="height:340px;" >
            <div class="clear" style="width:530px;margin:10px auto 0;" >
                <div class="clear" >
                  <div class="left" >
                    <el-form-item >
                      <el-select
                          @change="changDepartType"
                          v-model="form.departRange"
                          placeholder
                          style="width:190px;"
                      >
                          <el-option label="包含直属部门及下级部门" value="1" ></el-option>
                          <el-option label="只包含直属部门" value="2" ></el-option>
                          <el-option label="只包含下级部门" value="3" ></el-option>
                      </el-select>
                    </el-form-item> 
                  </div>
                  <div class="left" style="padding-left:20px;" >
                    <div class="" style="line-height:20px;" >
                      <el-form-item >
                        <CheckSelectSpecial @findStreetByTown="setDepart" :selectId="id_g_2"   :listData="departParams" style="width:170px;" ></CheckSelectSpecial>
                      </el-form-item>
                    </div> 
                    <div class="" style="line-height:20px;" >
                        <span style="color:#999;" >包含下级部门业绩必须同时选中</span>
                    </div> 
                  </div>
                  <div class="right clear"  >
                          <div class="clear left" >
                            <el-form-item  prop="includeMy" >
                                <el-checkbox :disabled="checkDisabled"  style="height:20px;" v-model="form.includeMy"  :false-label="0" :true-label="1" ></el-checkbox>
                            </el-form-item>
                            
                          </div>   
                          <div class="clear left" style="width:135px;" >
                              <div class="left" style="padding:3px 0 0 5px;" >
                                  <span  >包含本人个人业务业绩</span>
                              </div>
                                <div class="left" style="line-height:20px;" >
                                  <span style="color:#999;" >选择本人直属部门时</span>
                              </div>    
                          </div>
                  </div>
                </div> 
                <div class="break" > 
                </div>     
            </div>    
            <div class="clear" >
               <div class="clear" v-for="(item,index) in list" style="padding:10px;" > 
                   <div class="left" style="width:80px; text-algin:center;line-height:20px;" >
                      <span  >{{item.name}}</span>
                   </div>
                   <div class="left clear " >
                      <div class="clear left" style="width:80px; text-algin:center;line-height:20px;" v-for="(item1,index1) in item.files" >
                        <span :class="{'state-color1:':item1.state != '常态','state-color2:':item1.state == '常态'}" >{{item1.name}}</span>
                      </div>
                   </div>  
               </div>   
            </div>

              </div>
        </el-form>
      </div>
     <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
        <div class="left clear" style="padding-left:35px;line-height:23px;" >
            <div class="closeed-icon left" style="margin-top:6px;" ></div>
            <div class="left" >关闭的部门</div>
        </div>
        <div class="left clear" style="padding-left:10px;line-height:23px;" >
            <div class="temp-icon left" style="margin-top:6px;" ></div>
            <div  class="left" >常态的部门</div>
        </div>  
        <span class="right save-cancel-btn" @click="cancelData" >取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="savetBonus" >保 存</span>
      </div>
    </div>
    
    
  </div>
</template>

<script>
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import {getRangeDepart} from '../../../service/getdepartData'
  export default {
    props: ["layerid","departRange","includeMy",'departId','departIds'],
    data(){
      return{
        id_g_2:'id_g_2',
       
        departParams:[],
        form: {
          departRange:this.departRange,
          includeMy:this.includeMy*1,
          departIds:'',
        },
        checkDisabled:false,
        list:[],
        ids:'',
      }
    },
    components:{
      CheckSelectSpecial,
    },
    methods:{
      changDepartType(){
        let departRange = this.form.departRange;
        let departTree = JSON.parse(JSON.stringify(this.departParams));
        let ids = this.ids;
        let departId = this.departId;
        
        if(departRange == 1){
          let tempStr = departId+","+ids;
          let arr = [];
          departTree.forEach(item => {
            let obj = {id:item.id,name:item.name,select:false,level:item.level,state:item.state};
            if(tempStr.indexOf(item.id) != -1){
              obj.select = true;
            }else{
              obj.select = false;
            }
            arr.push(obj);
          })
          this.departParams = arr;
        }else if(departRange == 2){
          let arr = [];
          departTree.forEach(item => {
            let obj = {id:item.id,name:item.name,select:false,level:item.level,state:item.state};
            if(departId.indexOf(item.id) != -1){
              
              obj.select = true;
            }else{
              obj.select = false;
            }
            arr.push(obj);
          })
          this.departParams = arr;
        }else if(departRange == 3){
          let arr = [];
          departTree.forEach(item => {
            let obj = {id:item.id,name:item.name,select:false,level:item.level,state:item.state};
            if(ids.indexOf(item.id) != -1){
              obj.select = true;
            }else{
              obj.select = false;
            }
            arr.push(obj);
          })
          this.departParams = arr;
        }
        
        this.setDepart();
      },
      getDepartByDepartId(){
        debugger;
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let departId = this.departId;
        let departRange = this.form.departRange;
        let form = {departId:departId,departRange:departRange,needTree:1,};
        getRangeDepart(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
              return false;
            } else if (response.status == 0) {
                let list = response.data.list;
                let ids = response.data.ids;
                let departTree = response.data.departTree;
                let departIds = _this.departIds;
                let arr = [];
                if(ids){
                  _this.ids = ids.toString();
                }else{
                  _this.ids = "";
                }
                if(departIds){
                  if(departIds.indexOf(departId) != -1){
                    _this.checkDisabled = false; 
                  }else{
                    _this.checkDisabled = true;
                  }
                }
                departTree.forEach(item => {
                  let obj = {id:item.id,name:item.label,select:false,level:item.level,state:item.state};
                  
                  if(departIds.indexOf(item.id) != -1 && departIds){
                    obj.select = true;
                  }else{
                    obj.select = false;
                  }
                  arr.push(obj);
                })
                _this.departParams = arr;
                _this.setDepart();
            } else if (response.status == 1) {
              let message = response.msg;
              _this.myAlert(message + "！");
            }
        })
      },
      setDepart(){
        let departParams = JSON.parse(JSON.stringify(this.departParams));
        let departId = this.departId;
        let arrMap = {};
        let flag = false;
        departParams.forEach(item => {
          if(item.select){
            if(item.id == departId && !flag){
              flag = true;
            }
            if(item.level == 1){
              let arr = arrMap['一级部门'];
              if(arr){
                arr.push(item);
              }else {
                arrMap['一级部门'] = [];
                arrMap['一级部门'].push(item);
              }
            }else if(item.level == 2){
              let arr = arrMap['二级部门'];
              if(arr){
                arr.push(item);
              }else {
                arrMap['二级部门'] = [];
                arrMap['二级部门'].push(item);
              }
            }else if(item.level == 3){
              let arr = arrMap['三级部门'];
              if(arr){
                arr.push(item);
              }else {
                arrMap['三级部门'] = [];
                arrMap['三级部门'].push(item);
              }
            }else if(item.level == 4){
              let arr = arrMap['四级部门'];
              if(arr){
                arr.push(item);
              }else {
                arrMap['四级部门'] = [];
                arrMap['四级部门'].push(item);
              }
            }else if(item.level == 5){
              let arr = arrMap['五级部门'];
              if(arr){
                arr.push(item);
              }else {
                arrMap['五级部门'] = [];
                arrMap['五级部门'].push(item);
              }
            }
          }
        })
        if(flag){
          this.checkDisabled = false; 
        }else{
          this.checkDisabled = true; 
        }
        let list = [];
        for(let attr in arrMap){
           let obj = {
             name:attr,
             files:arrMap[attr],
           }
           list.push(obj);
        }
        this.list = list;
      },
      savetBonus() {
          let departParams = this.departParams;
          let departIds = [];
          departParams.forEach(item => {
            if(item.select){
              departIds.push(item.id);
            }
          })
          departIds = departIds.toString();
          if(!departIds){
            departIds = "";
          }
          this.form.departIds = departIds;
          
          this.$parent.setManageDepartUser(this.form);
          this.myAlert("数据保存成功！","success-icon").then(res =>{
              this.cancelData();
          }).catch(res => {

          })
      },
      
      cancelData() {
        this.$layer.close(this.layerid);
      }
    },
    mounted(){
      this.getDepartByDepartId();
    }
  }
</script>

<style lang="scss" scoped>
  .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    
  }
  .closeed-icon{
    border:6px solid #999;
    width:12px;
    height:12px;
    display:inline-block;
  }
  .temp-icon{
    border:6px solid #333;
    width:12px;
    height:12px;
    display:inline-block;
  }
  .state1-color{
    color:#999;
  }
  .state2-color{
    color:#333;
  }
</style>
