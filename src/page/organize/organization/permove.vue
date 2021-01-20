<template>
  <div>
    <el-dialog
      v-dialogDrag
      style=" height:100%"
      overflow="auto"
      id="addons"
      :close-on-click-modal="false"
      title="人员调动"
      :visible.sync="dialogVisible"
      width="350px"
    >
      <div class="pop-up" >
        <div class="pop-up-container" style="height: 106px;">
          <div id="addst1">
            <div id="addst2">
              <div id="addst3"  v-model="input21" style="padding-left: 15px;">
                <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
                  <div style="width: 160px;height:60px;margin-top: 30px">
                    <el-form-item label="调动到" prop="value" style="width: 60px;">
                      <el-select v-model="form.value"  style="width: 100px">
                        <el-option
                          v-for="item in form.options"
                          :id="item.id"
                          :label="item.name"
                          :value="item.id">
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" @click="valueChange(item)" >{{item.name}}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog-footer clear" >
              <span  v-model="atdata" id="spanstyle" slot="footer" class="dialog-footer">
                <span class="right save-cancel-btn margin-r-0"  @click="closeDialog">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="saveData">保存</span>
              </span>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {changeuserdepart,departTree2} from '../../../service/organizeDate'
    export default {
        name: "permove",
      data(){
          return{
            dialogVisible:false,
            input21:"",
            atdata:"",
            paid:[],
            form:{
              value:"",
              options:[],
            }
          }
      },
      methods:{
          pesho(si){
            let _this=this
            this.paid=si
            this.dialogVisible=true;
            let form = {state:"常态"};
            departTree2(form).then(function (res) {
              let staff=res.data
              let arr = [];
              for(let i = 0 ; i  < staff.length ; i++){
                arr.push({
                  id:staff[i].id,
                  name:staff[i].label.replace(/&nbsp;/g,""),
                  select:staff[i].select,
                  level:staff[i].level,
                })
              }
              _this.form.options=arr
            })
          },
          saveData(){
            let _this=this
            let id=this.paid
            let newDeptId=this.form.value;
            this.$layer.loading({
              shade: true,//是否显示遮罩
            });
            changeuserdepart(id,newDeptId).then(function (res) {
               _this.$layer.closeAll("loading");
              if(res.status==0){
                _this.myAlert("数据保存成功！",'success-icon').then(res => {
                    _this.$parent.reloadUserList()
                    _this.dialogVisible=false;
                  }).catch(err => {

                  })
              }else{
                _this.myAlert(res.msg)
              }
            })
          },
          closeDialog(){
            this.dialogVisible=false
          }
      }
    }
</script>

<style scoped>
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
  #addst1{
    border-width: 0px;
    margin-left: -6px;
    left: 0px;
    top: 0px;
    background: inherit;
    box-sizing: border-box;
  }
  #addst2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3.5px;
    background: inherit;
  }
  #addst3{

  }
  
  #addin1{
    left: 0px;
    top: 0px;
    width: 100px;
    height: 20px;
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-decoration: none;
  //color: #CCCCCC;
    text-align: left;
  }
  #addin2{

    width: 100px;
    height: 20px;
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-decoration: none;
  //color: #CCCCCC;
    text-align: left;
  }
  #writ1{
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #999999;
    margin-left: 93px;
    margin-top: 5px;
  }
  #writ2{
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    margin:5px 0 10px 36px;
  }
  #writ3{
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    margin:11px 0 10px 36px;
  }
  #spanstyle{
    float: right;
    margin-right: 3px;
    margin-top: -4px;
  }
  #addons{
    border-width: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 8px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
</style>
<style>
  #adlert1{
    border-width: 0px;
    margin-left: -6px;
    left: 0px;
    top: 0px;
    width: 310px;
    height: 145px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #adlert2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3.5px;
    left: 0px;
    top: 0px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #adlert3{
    border-width: 0px;
    text-align: center;
    left: 0px;
    top: 0px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #cklert1{
    border-width: 0px;
    margin-left: -6px;
    left: 0px;
    top: 0px;
    width: 310px;
    height: 145px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #cklert2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3.5px;
    left: 0px;
    top: 0px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #cklert3{
    border-width: 0px;
    text-align: center;
    left: 0px;
    top: 0px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #cnlert1{
    border-width: 0px;
    margin-left: -6px;
    left: 0px;
    top: 0px;
    width: 310px;
    height: 145px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #cnlert2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3.5px;
    left: 0px;
    top: 0px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #cnlert3{
    border-width: 0px;
    text-align: center;
    left: 0px;
    top: 0px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .eeradd1{
    border-width: 0px;
    margin-left: -6px;
    left: 0px;
    top: 0px;
    width: 310px;
    height: 145px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .eeradd2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3.5px;
    left: 0px;
    top: 0px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(220, 217, 211, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .eeradd3{
    border-width: 0px;
    text-align: center;
    left: 0px;
    top: 0px;
    width: 301px;
    height: 101px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 1);
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
</style>
