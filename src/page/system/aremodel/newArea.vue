<template>
  <div>
    <el-dialog
      v-dialogDrag
      style=" height:100%"
      overflow="auto"
      id="addons"
      :close-on-click-modal="false"
      title="新增街镇"
      :visible.sync="dialogVisible"
      width="350px"
    >
      <div class="pop-up" >
        <div class="pop-up-container" style="height: 112px;">
          <div id="addst1">
            <div id="addst2">
              <div id="addst3"  v-model="input21">
                <div id="writ1">区县</div>
                <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
                  <div style="width: 70px;">
                    <el-form-item label="街镇" prop="value" style="width: 60px;">
                      <el-select v-model="form.value"  style="width: 60px">
                        <el-option
                          v-for="item in options"
                          :id="item.id"
                          :label="item.label"
                          :value="item.label">{{item.label}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div style="width:100px;margin-top: -30px;">
                    <el-form-item label="" prop="streetname"style="margin-left: 62px;"  >
                      <p  @mouseenter="visible1" @mouseleave="invisible1" style="width: 152px;margin-top: 2px;">
                        <el-input  title="最多10个字"v-model="form.streetname" maxlength="10" style="width: 100px;"></el-input>
                      </p>
                    </el-form-item>
                  </div>
                  <el-form-item  label="序号" prop="streetnum" style="margin-bottom:20px">
                    <p @mouseenter="visible" @mouseleave="invisible">
                      <el-input  @change="checknum" title="2位数" maxlength="2"  :minlength="2" type="text" v-model="form.streetnum" style="width: 100px;"></el-input>
                    </p>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog-footer clear" >
            <span class="right save-cancel-btn margin-r-0"  @click="closeDialog">取 消</span>
            <span class="right save-cancel-btn" type="primary" @click="checkname">保存</span>
        </div>
      </div>
    </el-dialog>

  </div>

</template>

<script>
    import {addArea} from "../../../service/getData";
    import {findbyId} from "../../../service/getData";
    import {checkname} from "../../../service/getData";
    import {checknum} from "../../../service/getData";
    export default {
        name: "addArea",
        data(){
            return{
                dialogVisible:false,
                seen:false,
                seen1:false,
                place:"",
                input21:"",
                select1:"",
                options: [],
                form:{
                    value: "",
                    streetname:"",
                    streetnum:"",
                },
                rules:{
                    value:[
                        { required: true, message: ' ', trigger: ' ' },
                    ],
                    streetnum:[
                        { required: true, message: ' ', trigger: ' ' },
                    ],
                },
                atdata: []
            }
        },

        methods:{
            visible(){

                this.seen = true;
            },
            invisible(){

                this.seen = false;
            },
            visible1(){

                this.seen1 = true;
            },
            invisible1(){

                this.seen1 = false;
            },
            number(){
                this.form.streetnum=this.form.streetnum.replace(/[^\.\d]/g,'');
                this.form.streetnum=this.form.streetnum.replace('.','');
            },
            checkname(){
                let selects=this.select1
                let streetname= this.form.streetname
                let id=""
                let _this=this
                if(streetname) {
                  checkname(id, streetname, selects).then(function (res) {
                    _this.input21 = res.ok
                    if (res.ok == false) {
                      _this.myAlert("街镇重复！", 'dangerous-icon');
                    } else {
                      _this.sureDialog();
                    }

                  })
                }else{
                  _this.myAlert("街镇不能为空!", 'dangerous-icon');
                }
            },
            checknum(){
                this.form.streetnum= this.form.streetnum.replace(/[^\.\d]/g,'');
                this.form.streetnum= this.form.streetnum.replace('.','');
                let selects=this.select1
                let streetnum= this.form.streetnum
                let id=""
                let _this=this
                if(streetnum) {

                }
            },
            //改变弹框显隐值
            changedialog(tdata,place){
                this.dialogVisible=true
                let _this=this
                this.atdata=tdata
                _this.place=place
                _this.form.streetname=""
                _this.form.streetnum=""
                _this.form.value=place.label
                _this.select1=place.id
                findbyId("642297670593159168").then(function (res) {
                    let adtab= res.data
                    _this.options=adtab
                })
            },
            //关闭按钮
            closeDialog(){
                this.dialogVisible=false
                this.$emit('closeDialogFather',this.dialogVisible);
            },
            //确定按钮

          sureDialog(){
            let _this=this
            let selects=_this.select1
            let streetname= this.form.streetname
            let streetnum=this.form.streetnum
            let creat="lsy"
            let level=4
            let rse=_this.input21
            if(streetname&&streetname!=" "){
            if(streetnum){

                if(streetnum.length>1&&rse==true){
                    this.$layer.loading({
                    shade: true,//是否显示遮罩
                    });
                    addArea(selects,streetname,streetnum,creat,level).then(function (res) {
                        _this.$layer.closeAll("loading");
                        _this.myAlert("数据保存成功！",'success-icon').then(res => {
                        _this.dialogVisible=false
                            let ppd=_this.select1;
                        _this.$parent.serch(ppd);
                        }).catch(err => {
                        })

                    })

                }else if(streetnum.length<2){
                    _this.$alert('<div class="pop-up" style="" >\n' +
                        '        <div class="pop-up-container">\n' +
                        '          <div class="clear" style="padding:15px 10px 15px 10px;;" >\n' +
                        '             <div class="left">\n'+
                        '               <i class="dangerous-icon" ></i>\n'+
                        '             </div>\n'+
                        '             <div class="left">\n'+
                        '                 <p style="margin-left:5px;font-size:12px;"><span id="" >序号必须为两位数</span></p >\n' +
                        '             </div>\n'+
                        '          </div>\n' +
                        '        </div>\n' +
                        '        <div class="clear" style="width:100%;height:30px;" >\n' +
                        '        </div>\n' +
                        '      </div>', ' ', {
                        dangerouslyUseHTMLString: true
                    });
                }else if(rse==false){
                    _this.$alert('<div class="pop-up" style="" >\n' +
                        '        <div class="pop-up-container">\n' +
                        '          <div class="clear" style="padding:15px 10px 15px 10px;;" >\n' +
                        '             <div class="left">\n'+
                        '               <i class="dangerous-icon" ></i>\n'+
                        '             </div>\n'+
                        '             <div class="left">\n'+
                        '                 <p style="margin-left:5px;font-size:12px;"><span id="" >街镇重复</span></p >\n' +
                        '             </div>\n'+
                        '          </div>\n' +
                        '        </div>\n' +
                        '        <div class="clear" style="width:100%;height:30px;" >\n' +
                        '        </div>\n' +
                        '      </div>', ' ', {
                        dangerouslyUseHTMLString: true
                    });
                }

            }else{
                _this.$alert('<div class="pop-up" style="" >\n' +
                    '        <div class="pop-up-container">\n' +
                    '          <div class="clear" style="padding:15px 10px 15px 10px;;" >\n' +
                    '             <div class="left">\n'+
                    '               <i class="dangerous-icon" ></i>\n'+
                    '             </div>\n'+
                    '             <div class="left">\n'+
                    '                 <p style="margin-left:5px;font-size:12px;"><span id="" >序号不能为空</span></p >\n' +
                    '             </div>\n'+
                    '          </div>\n' +
                    '        </div>\n' +
                    '        <div class="clear" style="width:100%;height:30px;" >\n' +
                    '        </div>\n' +
                    '      </div>', ' ', {
                    dangerouslyUseHTMLString: true
                });
            }
            }else {
            _this.$alert('<div class="pop-up" style="" >\n' +
                '        <div class="pop-up-container">\n' +
                '          <div class="clear" style="padding:15px 10px 15px 10px;;" >\n' +
                '             <div class="left">\n'+
                '               <i class="dangerous-icon" ></i>\n'+
                '             </div>\n'+
                '             <div class="left">\n'+
                '                 <p style="margin-left:5px;font-size:12px;"><span id="" >街镇不能为空!</span></p >\n' +
                '             </div>\n'+
                '          </div>\n' +
                '        </div>\n' +
                '        <div class="clear" style="width:100%;height:30px;" >\n' +
                '        </div>\n' +
                '      </div>', ' ', {
                dangerouslyUseHTMLString: true
            });
            }

            },
        }
    }
</script>

<style scoped>
  select {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: black;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: menulist;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    background-color: white;
    cursor: default;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(169, 169, 169);
    border-image: initial;
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
  .buttons{
    border-width: 0px;
    left: 0px;
    top: 0px;
    width: 57px;
    height: 23px;
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
