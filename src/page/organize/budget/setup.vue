<!--suppress ALL -->
<template>
  <el-dialog
    v-dialogDrag
    style=" height:100%"
    overflow="auto"
    id="addons"
    :close-on-click-modal="false"
    title="设置预算单位"
    :visible.sync="setVisible"
    width="780px"
  >
    <div class="pop-up" style="height: 510px" >
      <div class="pop-up-container" style="height: 460px">
        <el-form :model="form" :rules="rules" ref="formsDatas" label-width="60px" class="demo-ruleForm cr" style="width: 100%;height:100%">
            <div clss="fll" style="margin-top: 15px;margin-left: 15px ">
              <el-input v-model="form.dnames"  title="部门名称" style="width: 100px"></el-input>
            </div>
            <div clss="fll" style="margin-top: -24px;margin-left: 195px ">
              <el-form-item label="预算年份" class="" prop="year" style="width: 214px;">
                <div class="dib" >
                  <el-date-picker  v-model="form.year" size="mini"  type="year"   value-format="yyyy"  class="fll" style="width: 121px;"></el-date-picker>
                </div>
              </el-form-item>
            </div>
            <div style="width: 30%;height: 370px;border-right: 1px solid;border-top: 1px solid ">
              <el-tree :data="form.treeData"
                       @check-change="gettreeDatas"
                       :check-strictly=true
                       show-checkbox
                       :props="defaultProps"
                       default-expand-all
                       ref="selectTree"
                       style="font-size: 13px"
                       :expand-on-click-node="true"
                       node-key="id"
                       empty-text=" "
              >
              </el-tree>
            </div>
          <div style="width:69%;height:360px;float: right;margin-top: -370px;overflow: auto">
            <div  v-if="form.deparr!=''&& index==0"  v-for="(fo,index) in form.deparr" class="fll clear " style="display:inline-block;width: 97%;height:60px;border-top: 1px solid;border-bottom: 1px solid;margin-left:15px;" >
              <span  class="fll" style="margin-left: 0px;color: #88898c" >{{fo[0].name}}</span>
              <div v-if="index==0" v-for="(item,index) in fo" class="fll clear" style="margin-top: 30px;margin-left: -69px;">
                <input v-if="item.time!=null"  @change="changeas(item)" class="fll" style="margin-top: 2px;margin-left:14px" type="checkbox" :checked="true" />
                <span v-if="item.time!=null" class="fll"style="color:green;">{{item.name}}</span>

               <input v-if="item.time==null"  @change="changeas(item)" class="" style="top: 2px;left:24px;position: relative" type="checkbox" :checked="false" />
                <span v-if="item.time==null" class=""style="color:#993300;left:24px;position: relative">{{item.name}}</span>
                <!-- <input v-if="item.budgetNum>0"  disabled class="fll" style="margin-top: 2px;margin-left:14px" type="checkbox" />
                <span v-if="item.state!='0'" class="fll"style="color:grey;">{{item.name}}</span>-->
              </div>
              <div  v-else-if="index!=0" v-for="(item,index) in fo" class="fll clear" style="margin-top: 30px;margin-left: 15px;">
                <input v-if="item.time!=null"  @change="changeas(item)" class="fll" style="margin-top: 2px;margin-left:14px" type="checkbox" :checked="true" />
                <span v-if='item.time!=null' class="fll"style="color:green;">{{item.name}}</span>
                <input v-if="item.time==null"  @change="changeas(item)" class="fll" style="margin-top: 2px;margin-left:14px" type="checkbox" :checked="false" />
                <span v-if='item.time==null' class="fll">{{item.name}}</span>
                <input v-if="item.budgetNum>0"  disabled class="fll" style="margin-top: 2px;margin-left:14px" type="checkbox" />
              </div>
            </div>

            <div  v-if="form.deparr!=''&& index!=0"  v-for="(fo,index) in form.deparr" class=" fll clear " style="display:inline-block;width:97%;height:60px;border-bottom: 1px solid;margin-left:15px;" >
            <span  class="fll" style="margin-left: 0px;color: #88898c" >{{fo[0].name}}</span>
            <div v-if="index==0" v-for="(item,index) in fo" class="fll clear" style="margin-top: 30px;margin-left: -69px;">


              <input v-if="item.time==null"  @change="changeas(item)" class="fll" style="top: 2px;left:24px;position: relative" type="checkbox" :checked="false" />
              <span v-if="item.time==null" class=""style="color:#993300;left:24px;position: relative">{{item.name}}</span>
              <span v-if="item.time!=null" class="fll"style="color:green;">{{item.name}}</span>
              <!-- <input v-if="item.budgetNum>0"  disabled class="fll" style="margin-top: 2px;margin-left:14px" type="checkbox" />
              <span v-if="item.state!='0'" class="fll"style="color:grey;">{{item.name}}</span>-->
            </div>
            <div  v-if="index!=0" v-for="(item,index) in fo" class="fll clear" style="margin-top: 30px;margin-left: 15px;">
              <input v-if="item.time!=null"  @change="changeas(item)" class="fll" style="margin-top: 2px;margin-left:14px" type="checkbox" :checked="true" />
              <span v-if='item.time!=null' class="fll"style="color:green;">{{item.name}}</span>
              <input v-if="item.time==null"  @change="changeas(item)" class="fll" style="margin-top: 2px;margin-left:14px" type="checkbox" :checked="false" />
              <span v-if='item.time==null' class="fll">{{item.name}}</span>
              <input v-if="item.budgetNum>0"  disabled class="fll" style="margin-top: 2px;margin-left:14px" type="checkbox" />

            </div>
          </div>

          </div>
          <div style="margin-top: 0px;float: left;margin-left: 245px">
            <div class="green fll"></div>
            <span class="fll" style="font-size: 12px;margin-top: -4px">该年已生成预算单位</span>

          </div>
          <div style="margin-top: 10px;float: left;margin-left: 245px">
            <div class="grey fll" style="display: inline-block"></div>
            <span class="fll" style="font-size: 12px;margin-top: -4px">已关闭的部门/物理单位</span>
          </div>
        </el-form>
      </div>
      <div class="clear" style="margin-left: 530px" >
              <span   slot="footer" class="dialog-footer">
                <div  class="fll" style="margin-left: -43px;margin-top: 10px">
                <input v-model="form.alls" @change="allselect" type="checkbox"/>
                <span>全选</span></div>

                <button class="buttons" style="margin-left: 20px" type="primary" @click="saveys">保存</button>
                <button class="buttons" @click="this.setVisible=false">取 消</button>
              </span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import ElTreeSelect from '../../house/rent/tree'
  import {odeparttree} from '../../../service/organizeDate'
  import {insertBudget,getCoopBudgetById} from '../../../service/getdepartData'
  export default {
    name: 'setup',
    components: {ElTreeSelect},
    data(){
      return{
        setVisible:false,
        ntrue:"",
        unarr:[],
        form:{
          treeData:[],
          denamen:[],
          depaids:[],
          deparr:[],
          dnames:"",
          year:"",
          alls:false
        },
        rules:{
          year:[
                    { required: true, message: ' ', trigger: ' ' },
               ],
        },
        defaultProps:{

        },
      }
    },
    methods:{
      showset(){
        let _this=this
        this.setVisible=true
        this.unarr=[]
        odeparttree("","").then(function (res) {
              debugger
          _this.form.treeData=res.data
        })
      },
      gettreeDatas(val,cs,ss){
            debugger
            this.ntrue=cs
            let _this=this
            let arrn=[]
            this.$layer.loading({
              shade: true,//是否显示遮罩
            });
            if(cs==false){
              let time=this.form.year
              time=time.toString()

              let departId=val.id
              getCoopBudgetById(departId,time).then(function (res) {
                debugger
                let de=_this.form.deparr
                for(var i=0;de.length>i;i++){
                  let names=de[i][0].name
                  let datas=res.data[0].name
                  if(names!=datas){
                    arrn.push(de[i])
                  }else{
                    for(var n=0;de.length>n;n++){
                      for(var z=0;de[n].length>z;z++){
                        de[n][z].time=null
                      }
                    }
                  }
                }
                _this.form.deparr=arrn
                _this.$layer.closeAll("loading");
              })
            }

            if(cs==true){
              let time=this.form.year
              time=time.toString()
              if(time==""){
                this.myAlert("请选择时间")
                _this.$layer.closeAll("loading");
                return
              }
              let departId=val.id
              getCoopBudgetById(departId,time).then(function (res) {
                   debugger
                let sas=res.data
                _this.form.deparr.push(sas)
                _this.$layer.closeAll("loading");
              })
            }


      },
      //全选
      allselect(){
        let time=this.form.year
        let all=this.form.alls
        if(all==true){
          let dearr=this.form.deparr
          for(var i=0;dearr.length>i;i++){
            for(var z=0;dearr[i].length>z;z++) {
              dearr[i][z].time=time
            }
          }
        }else if(all==false){
          let dearr=this.form.deparr
          for(var i=0;dearr.length>i;i++){
            for(var z=0;dearr[i].length>z;z++) {
              dearr[i][z].time=null
            }
          }

        }
      },
      //改变
      changeas(item){
        debugger
        let dearr=this.form.deparr
        for(var i=0;dearr.length>i;i++){
          for(var z=0;dearr[i].length>z;z++){
            if(item.id==dearr[i][z].id){
                  if(dearr[i][z].time!=null){
                    dearr[i][z].time=null
                    this.unarr.push(dearr[i][z].id)
                  }else if(dearr[i][z].time==null){
                    let time=this.form.year
                    time=time.toString()
                    dearr[i][z].time=time
                  }

            }
          }
        }
      },
      saveys(){
        debugger
        let _this=this
        let charr=[]
        let dearr=this.form.deparr
        for(var i=0;dearr.length>i;i++) {
          for (var z = 0; dearr[i].length > z; z++) {
                    if(dearr[i][z].time!=null){
                      charr.push(dearr[i][z].id)
                    }
          }
        }
          let des=this.unarr
          let delDepartIds=des.toString()
          let departIds=charr.toString()
          let time=this.form.year
        insertBudget(delDepartIds,departIds,time).then(function (res) {
          debugger
          if(res.status==0){
            _this.myAlert("新增预算成功")
            _this.setVisible=false
            _this.$parent.$parent.changelist()
          }
        })



      }

    }
  }
</script>

<style scoped>
  .green{
    width: 10px;
    height: 10px;
    background-color: green;
  }
  .grey{
    width: 10px;
    height: 10px;
    background-color: grey;
  }
  .pop-up .pop-up-container /deep/ .el-form-item__label{
    width: 80px!important;
  }
  /deep/.pop-up .pop-up-container .el-input__prefix {
    left: 100px;
  }
  /deep/#deten .el-input__prefix {
    margin-left: -45px;
  }
  /deep/#dest .el-input__prefix {
    margin-left: 25px;
  }
  /deep/.el-tree {
    background-color: #DCD9D3;
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
  .inputs {
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
