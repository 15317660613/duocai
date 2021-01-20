<template>
  <div style="width:100%;margin:0 10px;">
    <div class="pop-up">
      <div class="pop-up-container" style="height:106px;overflow-y:auto;overflow-x:hidden;" >
          <div id="updatast1">
            <div id="updatast2">
              <div id="updatast3" v-model="input21">
                <div id="updatawrit1" v-model="pid">区县</div>
                <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
                  <div style="width: 70px;">
                    <el-form-item label="街镇" prop="value" style="width: 60px;">
                      <el-select disabled v-model="form.value" style="width: 60px;color: #969696">
                        <el-option
                          v-for="item in adata"
                          :id="item.id"
                          :label="item.label"
                          :value="item.label">{{item.label}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div style="width:100px;margin-top: -30px;">
                    <el-form-item label="" prop="ustreetname"style="margin-left: 62px;"  >
                      <p @mouseenter="show1" @mouseleave="hide1" style="width: 152px;margin-top: 2px;">
                        <el-input  title="最多10个字" v-model="form.ustreetname" maxlength="10" style="width: 100px;"></el-input>

                      </p>
                    </el-form-item>
                  </div>
                  <el-form-item label="序号" prop="ustreetnum" style="margin-bottom:20px">
                    <p @mouseenter="show2" @mouseleave="hide2">
                      <el-input  @change="uchecknum" title="2位数" maxlength="2" v-model="form.ustreetnum" style="width: 100px;"></el-input>

                    </p>
                  </el-form-item>
                </el-form>

              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer clear" style="padding: 3px 0px;">
           <span v-model="rowid" id="updataspanstyle" slot="footer" class="dialog-footer">
                <span class="right save-cancel-btn margin-r-0" @click="closeData">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="ucheckname">保存</span>
             </span>
        </div>
      </div>
  </div>
</template>

<script>
import {updateArea, findbyId, checkname, checknum} from '../../../service/getData'

export default {
  name: 'detailArea',
  props:['rowdata','layerid'],
  data () {
    return {
      detailVisible: false,
      myrow:this.rowdata,
      input21: '',
      select1: '',
      san1: false,
      san2: false,
      adata: [
        {
          id: '选项1',
          label: '黄金糕'
        }, {
          id: '选项2',
          label: '双皮奶'
        }, {
          id: '选项3',
          label: '蚵仔煎'
        }, {
          id: '选项4',
          label: '龙须面'
        }, {
          id: '选项5',
          label: '北京烤鸭'
        }
      ],
      pid: '',
      rowid: '',
      form: {
        value: '',
        ustreetname: '',
        ustreetnum: ''
      },
      rules: {
        value: [
          { required: true, message: '', trigger: ' ' }
        ],
        ustreetnum: [
          { required: true, message: ' ', trigger: '' },
          { min: 2, max: 2, message: ' ', trigger: ' ' }
        ]
      }

    }
  },
  methods: {
    show1 () {
      this.san1 = true
    },
    hide1 () {
      this.san1 = false
    },
    show2 () {
      this.san2 = true
    },
    hide2 () {
      this.san2 = false
    },
    ucheckname () {
      let selects=this.pid
      let streetname= this.form.ustreetname
      let id= this.rowid
      let _this=this
      if(streetname) {
        checkname(id, streetname, selects).then(function (res) {
          _this.input21 = res.ok
          if (res.ok == false) {
            _this.myAlert("街镇重复！", 'dangerous-icon');
          } else {
            _this.usureDialog();
          }

        })
      }else{
        _this.myAlert("街镇不能为空！", 'dangerous-icon');
      }
    },
      uchecknum: function () {
          this.form.ustreetnum = this.form.ustreetnum.replace(/[^\.\d]/g, '')
          this.form.ustreetnum = this.form.ustreetnum.replace('.', '')
          let _this = this
          let selects = this.pid
          let streetnum = this.form.ustreetnum
          let id = this.rowid
          if (streetnum) {

          }
      },
    // 改变弹框显隐值
    changedetail (row) {

      this.rowid = row.id
      this.detailVisible = true
      let _this = this
      findbyId('642297670593159168').then(function (res) {
        let ups = res.data
        _this.adata = ups
        _this.form.ustreetname = row.label
        _this.form.ustreetnum = row.no
        for (var i = 0; ups.length > i; i++) {
          if (row.preId == ups[i].id) {
            _this.form.value = ups[i].label
            _this.pid = row.preId
          }
        }
      })
    },
   
    // 确定按钮
    usureDialog () {
      let _this = this
      let ide = this.rowid
      let streetname = this.form.ustreetname
      let streetnum = this.form.ustreetnum
      let creat = 'lsy'
      let level = 4
      var selects = ''
      let rse=_this.input21
      findbyId('642297670593159168').then(function (res) {
        let ups = res.data
        for (var i = 0; ups.length > i; i++) {
          if (_this.form.value == ups[i].label) {
            selects = ups[i].id
          }
        }
        if(streetname&&streetname!=" "){
            if (streetnum) {
              if (streetnum.length > 1&&rse!=false) {
                _this.$layer.loading({
                  shade: true,//是否显示遮罩
                });
                updateArea(ide, selects, streetname, streetnum, creat, level).then(function (res) {
                  _this.$layer.closeAll("loading");
                  _this.myAlert("数据保存成功！",'success-icon').then(res => {
                    _this.closeData();
                    let ppd = _this.pid
                    _this.$parent.serch(ppd);
                  }).catch(err => {
                  })

                })

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
              } else {
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
              }
            } else {
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
        }else{
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
      })
    },
     // 关闭按钮
    closeData () {
      this.$layer.close(this.layerid);
    },
  },
  mounted(){
    this.changedetail(this.myrow);
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
  #updatast1{
    border-width: 0px;
    margin-left: -6px;
    left: 0px;
    top: 0px;

  }
  #updatast2{
    border-width: 0px;
    margin-top: 6px;
    margin-left: 3.5px;

  }
  #updatast3{
    border-width: 0px;
  }
  #updatain1{
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
  #updatain2{
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
  #updatawrit1{
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #999999;
    margin-left: 93px;
    margin-top: 5px;
  }
  #updatawrit2{
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    margin-left: 36px;
    margin-top: 5px;
  }
  #updatawrit3{
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    margin:11px 0 10px 36px;
  }
  #updataspanstyle{
    float: right;
    margin-right: 3px;
  }
  #updataons{
    border-width: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(121, 121, 121, 1);
    border-radius: 8px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .buttons{
    width: 57px;
    height: 23px;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(102, 102, 102, 1);
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #1E1E1E;
  }
</style>
<style>
  .adlert1{
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
  .adlert2{
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
  .adlert3{
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

</style>
