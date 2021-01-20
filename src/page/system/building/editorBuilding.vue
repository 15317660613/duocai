<template>
    <div style="width:100%;padding:0 10px;">
      <div class="pop-up"style="width:100%;padding:10px 10px 0;height: 631px;">
        <el-tabs type="border-card" v-model="activeName" @tab-click="changeTab" >
          <el-tab-pane label="楼盘" name="building" >
            <span slot="label"  >楼盘</span>
            <EditorBuildingTabOnePage @isShowPhotoAndFile="isShowPhotoAndFile" @setLockedData="setLockedData" @closeBuilding="closeBuilding" @setBuildingAndSchoolNum="setBuildingAndSchoolNum" ref="editorTabOne"  :editorBuilding="true"  :editorBuildingId="editorId" ></EditorBuildingTabOnePage>
          </el-tab-pane>
          <el-tab-pane label="栋座" name="pedestal" >
            <span slot="label"  >  栋座[{{seatNum}}]</span>
            <EditorBuildingTabTwoPage @isShowPhotoAndFile="isShowPhotoAndFile" @saveBuilding="saveBuilding"  @setBuildingNum="setBuildingNum" @closeBuilding="closeBuilding" ref="editorTabTwo"  :editorPedestal="true"  ></EditorBuildingTabTwoPage>
          </el-tab-pane>
          <el-tab-pane label="附近学校" name="school" >
            <span slot="label"  > 附近学校[{{schoolNum}}]</span>

            <EditorBuildingTabThreePage @isShowPhotoAndFile="isShowPhotoAndFile"  @saveBuilding="saveBuilding"  @setSchoolNum="setSchoolNum" @closeBuilding="closeBuilding" ref="editorTabThree" :editorPedestal="true"  ></EditorBuildingTabThreePage>
          </el-tab-pane>
        </el-tabs>
      </div>
      
      <div v-show="lockedShow" style="position:absolute;bottom:25px;left:15px;" >
        <div v-if="!thistrue" class="left clear" style="padding:2px 5px;border:1px solid #797979;border-radius:3px;margin-right:20px;margin-left: 7px;" >
          <div class="left" style="padding-right:7px;"  >
            <i class="up-page-icon" @click="upPage($event)" ></i>
          </div>
          <div class="left" >
            <i class="down-page-icon" @click="downPage($event)" ></i>
          </div>
        </div>
        <div class="left"  style="padding:0px 5px 0 10px;" >
            <el-checkbox @change="setLocked" v-model="locked"  :false-label="0" :true-label="1"  ></el-checkbox>
        </div>
        <div style="line-height:18px;" class="left">
          锁定
        </div>
      </div>

  </div>
</template>

<script>
  import EditorBuildingTabOnePage from './editorBuildingTabOne'
  import EditorBuildingTabTwoPage from './editorBuildingTabTwo'
  import EditorBuildingTabThreePage from './editorBuildingTabThree'
  import FilePage from '../../../components/file'
  import {getFilesList8,deletedFiles8,uploadFiles8,updateFileName8} from '../../../service/fileData'
  export default {
    props:["buildingShowEditor","areaVillageId","areaVillage","thistrue","tabactive","layerid","currentIndex"],
    data() {
      return {
        active1:false,
        active2:false,
        active3:false,
        isFromHousePage:false,
        activeName:this.tabactive,
        shortName:'',
        editorId:this.areaVillageId,
        schoolNum:0,
        seatNum:0,
        locked:0,
        lockedShow:true,
      };
    },
    components:{
      EditorBuildingTabOnePage,
      EditorBuildingTabTwoPage,
      EditorBuildingTabThreePage,
      FilePage
    },

    methods:{
      changeTab(tab){
        let _this = this;
        let id = _this.editorId;
        let label = tab.label;
        if(label == "楼盘"){
          if(!_this.active1) {
            let shortName = _this.shortName;
            _this.$refs["editorTabOne"].getEditorBuildingData(id, shortName);
            _this.active1 = true;
          }
          this.lockedShow = true;
        }else if(label == "栋座"){
          if(!_this.active2) {
            let shortName = _this.shortName;
            _this.$refs["editorTabTwo"].getPedestalListData(id, shortName);
            _this.active2 = true;
          }
          this.lockedShow = true;
        }else if(label == "附近学校"){
          if(!_this.active3) {
            let shortName = _this.shortName;
            _this.$refs["editorTabThree"].searchSchoolList(id, shortName);
            _this.active3 = true;
          }
          _this.lockedShow = false;
        }

      },
      setLockedData(value){
        this.locked = value;
      },
      setLocked(){
        this.$refs["editorTabOne"].form.locked = this.locked;
      },
      changeTabInit(){
        let _this = this;
        _this.activeName = "building";
        _this.$refs["editorTabTwo"].tableData = [];
        _this.$refs["editorTabTwo"].tableData1 = [];
        _this.active1 = false;
        _this.active2 = false;
        _this.active3 = false;
      },

      isShowEditorBuilding(){
        let _this = this;
        _this.shortName = _this.areaVillage;
        _this.editorId = _this.areaVillageId;
        let arr = Object.getOwnPropertyNames(_this.$refs);
        if(arr.length !=  0 && _this.$refs.editorTabOne ){
          _this.activeName = "building";
          _this.$refs.editorTabOne.getEditorBuildingData(_this.editorId,);
        }
        _this.isFromHousePage = _this.thistrue;
        _this.active1 = true;
      },
      isShowEditorPedestal(id,shortName){
        let _this = this;
         debugger;
        _this.shortName = shortName;
        _this.editorId = id;
        _this.activeName = "pedestal";
        let arr = Object.getOwnPropertyNames(_this.$refs);
        _this.$nextTick(function () {
          _this.$refs.editorTabOne.getEditorBuildingData(_this.editorId);
          _this.$refs["editorTabTwo"].getPedestalListData(_this.editorId,_this.shortName);
        })
        _this.active2 = true;
      },
      isShowEditorSchool(){
        let _this = this;
        _this.shortName = _this.areaVillage;
        _this.editorId = _this.areaVillageId;
       
        let arr = Object.getOwnPropertyNames(_this.$refs);
        if(arr.length !=  0 && _this.$refs.editorTabOne ){
          _this.activeName = "school";
          _this.$refs.editorTabOne.getEditorBuildingData(_this.editorId);
          _this.$refs["editorTabThree"].searchSchoolList(_this.editorId,_this.shortName);
          _this.active3 = true;
          _this.lockedShow = false;
        }

      },
      //栋座和学校数
      setBuildingAndSchoolNum(num1,num2){
        this.seatNum = num1;
        this.schoolNum = num2;
      },
      //栋座数
      setBuildingNum(num){
        this.seatNum = num;
      },
      //学校数
      setSchoolNum(num){
        this.schoolNum = num;
      },
      closeBuilding(id,form){
        console.log('111');
        
        if(this.isFromHousePage){

          this.$parent.addHouseBuilding(id,form);
        }else{
          this.$parent.reloadList();
        }
        this.$layer.close(this.layerid);

      },
      saveBuilding(){
        this.$refs.editorTabOne.saveEditorBuilding();
      },
      upPage(e){
        let ids = '';
        let count = this.currentIndex-1;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        // this.$parent.changeTitle(ids,count,needlayerid);
        let callbackdata = this.$parent.changeTitle(ids,count,needlayerid);
        this.areaVillage = callbackdata.areaVillage;
        this.areaVillageId = callbackdata.areaVillageId;
        this.currentIndex = callbackdata.currentIndex;
        this.isShowEditorBuilding();
      },
      downPage(e){
        let ids = '';
        let count = this.currentIndex+1;
        let needlayerid;
        e.path.forEach(item=>{
          if(item.id){
            if(item.id.indexOf('notification')!=-1){
              needlayerid = item.id;
            }
          }
        });
        // this.$parent.changeTitle(ids,count,needlayerid);
        let callbackdata = this.$parent.changeTitle(ids,count,needlayerid);
        this.areaVillage = callbackdata.areaVillage;
        this.areaVillageId = callbackdata.areaVillageId;
        this.currentIndex = callbackdata.currentIndex;
        this.isShowEditorBuilding();
      },
      isShowPhotoAndFile(){
        // this.$refs.FilePageId.showDialogVisible();
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: FilePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{
              recordId:_this.editorId,
              getFilesByType:getFilesList8,
              deleteFiles:deletedFiles8,
              uploadFiles:uploadFiles8,
              updateFileName:updateFileName8,
              downLoadFiles:'/area_village/downloadReFiles',
            }//props
          },
          area:['800px','560px'],
          title: "图照",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },
    },
    mounted(){
      let _this = this;
      if(_this.tabactive=="building"){
        _this.isShowEditorBuilding();
      }else if(_this.tabactive=="school"){
        _this.isShowEditorSchool();
        _this.$refs.editorTabOne.getEditorBuildingData(_this.editorId);
        _this.$refs["editorTabThree"].searchSchoolList(_this.editorId,_this.shortName);
      }else if(_this.tabactive=="pedestal"){
        _this.$refs.editorTabOne.getEditorBuildingData(_this.editorId);
        _this.$refs["editorTabTwo"].getPedestalListData(_this.editorId,_this.shortName);
      }
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
    height: 24px;
    border-image: url("../../../images/system/border.png")  2 repeat ;
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
  }




</style>
