<template>
  <div class="" style="width:100%;margin:0 10px;" > 
    <div class="pop-up" >
      <el-tabs type="border-card" v-model="activeName" @tab-click="changeTab" >
        <el-tab-pane label="基础薪酬设置" name="bookone" >
          <span slot="label"  >基础薪酬设置</span>
          <bookone @cancelData="cancelData" ref="bookone" @operationlogfunc="operationlogfunc"  :acnut="getAccountData" ></bookone>
        </el-tab-pane>
        <el-tab-pane label="险金数据设置" name="booktwo" >
          <span slot="label" >险金数据设置</span>
          <booktwo  @cancelData="cancelData"   ref="booktwo" @operationlogfunc="operationlogfunc"  :acnut="getAccountData"  ></booktwo>
        </el-tab-pane>
        <el-tab-pane label="考勤规则设置" name="bookthree" >
          <span slot="label" >考勤规则设置</span>
          <bookthree  @cancelData="cancelData"   ref="bookthree" @operationlogfunc="operationlogfunc" :acnut="getAccountData"></bookthree>
        </el-tab-pane>
        <el-tab-pane label="评金提金设置" name="bookfour" >
          <span slot="label" >评金提金设置</span>
          <bookfour  @cancelData="cancelData"   ref="bookfour" @operationlogfunc="operationlogfunc" :acnut="getAccountData"></bookfour>
        </el-tab-pane>
      </el-tabs>
      <div class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;position: absolute;bottom: 24px;" >
        <div class="left" style="padding-right:7px;"  >
          <i class="up-page-icon" @click="upPage($event)" ></i>
        </div>
        <div class="left" >
          <i class="down-page-icon" @click="downPage($event)" ></i>
        </div>
      </div>
    </div> 
    <div class="clear footerabsoluteclass">
      <div class="left footerabsoluteclasschild" >
        <span class="record-word footerpaddingleft10">最后修改:</span>
        <span v-if="form.updateBy" class="record-word">{{form.updateBy}}</span>
        <span v-if="form.updateTime" class="record-word">{{form.updateTime}}</span>
      </div>
    </div>  
  </div>
</template>

<script>
  import bookone from './bookone'
  import booktwo from './booktwo'
  import bookthree from './bookthree'
  import bookfour from './bookfour'
  export default {
    name: 'sbooks',
    components:{
      bookone,booktwo,bookthree,bookfour
    },
    props:['layerid','accountData',"mythisindex"],
    data(){
      return{
        active1:false,
        active2:false,
        active3:false,
        active4:false,
        getAccountData:this.accountData,
        sbookdialog:false,
        activeName:'bookone',
        staffs:"",
        timee:"",
        thisindex:this.mythisindex,
        form:{
          updateTime:'',
          updateBy:'',
        },
      }
    },
    methods:{
      sbookshow(accountData){
       
        this.staffs=accountData.name
        this.sbookdialog=true
        let time=accountData.time.split("-");
        this.timee=time[0]+"年"+time[1]+"月"
        if(this.$refs.bookone!=undefined){
          this.$refs.bookone.intitbook(accountData);
          this.active1 = true;
        }
      },
      //切换
      changeTab(tab){
        let _this = this;
        let label = tab.label;
        if(label == "基础薪酬设置"){
          //if(!this.active1){
           this.$refs.bookone.intitbook(this.getAccountData);
            this.active1 = true;
          //}
        }else if(label == "险金数据设置"){
          if(!this.active2) {
            debugger;
            this.$refs.booktwo.intitbook(this.getAccountData);
            this.active2 = true;
          }
        }else if(label == "考勤规则设置"){
           // if(!this.active3) {
              this.$refs.bookthree.intitbook(this.getAccountData);
              this.active3 = true;
           // }
        }else if(label == "评金提金设置"){
          if(!this.active4) {
            this.$refs.bookfour.intitbook(this.getAccountData);
            this.active4 = true;
          }
        }
      },
      //关闭
      changeTabInit(){
        let _this = this;
        _this.activeName = "bookone";
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
        this.getAccountData = callbackdata.row;
        this.thisindex = callbackdata.thisindex;
        this.sbookshow(this.getAccountData);
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
        let callbackdata = this.$parent.changeTitle(count,needlayerid,2)
        this.getAccountData = callbackdata.row;
        this.thisindex = callbackdata.thisindex;
        this.sbookshow(this.getAccountData);
      },
      cancelData(){
        this.$layer.close(this.layerid);
      },
      operationlogfunc(val){
        this.form.updateBy = val.updateBy;
        this.form.updateTime = val.updateTime;
      }
    },
    mounted(){
      this.sbookshow(this.getAccountData);
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
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
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    height: 24px;
    //background:#F0F0F0;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
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

    .border-box{
      padding:8px 8px 0;
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/iborder.png")  2 repeat ;
    }

    .cut-line{
      border-width: 2px;
      border-style: solid;
      border-image: url("../../../images/iborder.png")  2 repeat ;
      border-width:0 0 2px 0;
    }
    .tie-icon{
      background:url(../../../images/icon2.png) -128px -55px;
      width: 16px;
      height: 16px;
      display: inline-block;
    }
    
  }




</style>
