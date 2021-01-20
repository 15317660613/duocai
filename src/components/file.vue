<template>
  <div class="" style="padding: 0px 10px 10px;">
    <!-- <el-dialog :close-on-click-modal="false" v-dialogDrag title="附件" width="750px" height="900px"  @close="clearFormData" :visible.sync="dialogVisible" :append-to-body="true" > -->
       <el-image-viewer v-if="showViewer"  :on-close="closeViewer" :url-list="srcList" :z-index="100001"/>
      <div class="pop-up" style="width:780px" >
        <div class="pop-up-container" style="height:508px;margin: 0px;border-width:0px;" >
          <div class="clear" >
            <div class="left file-left-content" >
              <div class="clear" style="padding:10px 10px"  @click='changefiletype("图片")'>
                <div :class="{activeclass:activeimg}">
                  <div class="clear" style="margin:0px 8px;"  >
                    <i class="phone-icon" ></i>
                  </div>
                  <div class="clear" style="text-align:center;" >
                      <span>图照【{{phoneNum}}】</span>
                  </div>
                </div>
              </div>
              <div class="clear" style="padding:10px 10px"  @click='changefiletype("视频")'>
                <div :class="{activeclass:activevideo}">
                  <div class="clear"  style="margin:0px 0px 0 8px;"  >
                    <i class="video-icon" ></i>
                  </div>
                  <div class="clear" style="text-align:center;" >
                    <span>视频【{{videoNum}}】</span>
                  </div>
                </div>
              </div>
              <div class="clear" style="padding:10px 10px" @click='changefiletype("文档")'>
                <div :class="{activeclass:activetext}">
                  <div class="clear" style="margin:0px 0px 0 9px;"  >
                    <i class="file-icon" ></i>
                  </div>
                  <div class="clear" style="text-align:center;" >
                    <span>文档【{{fileNum}}】</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="left file-right-content" >
                <div v-if="filetype == '图片'" class="clear" >
                  <div class="clear" v-for="(elem ,index) in imgFilesData" style="padding-bottom:20px;border-bottom:1px solid #CCCCCC;"  >
                    <div class="clear" >
                      <div class="clar" style="color:#999;padding:10px 0 5px 10px;" >
                        <span>提交人：{{elem.name}}</span>
                      </div>  
                      <div class="clear" style="display: inline-block;display: -webkit-box;display: flex;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-justify-content:space-between;justify-content:flex-start;overflow: hidden;text-align: center;overflow-x: auto;">
                        <div v-for="(item,index) in elem.files" class="left"  style="margin-left: 20px; height: 125px;width: 110px;display: inline-block;">
                          <div style="position: relative;display: inline-grid;">
                            <div  @click="bottomindexfunc(item,index)" style="width: 100%;height: 100px;box-shadow:5px 5px 5px #858585;border-radius:5px;border:1px solid #797979;overflow:hidden;position:relative;">
                              <img  :src=item.mFile style="width: 108px;height: 100%;">  
                            
                            </div>
                            
                            <div class="" style="width: 100%;overflow: hidden;margin-top:5px;text-overflow: ellipsis;white-space: nowrap;">
                              <span @click="showEditor(item)" v-show="item.editor == 0" style="border-radius:3px;display:inline-block;width:100%;border:1px solid #797979;" >{{item.name}}</span>
                              <input v-show="item.editor == 1" @blur="setFileName(item,'图片')" type="text" class="input" v-model="item.name"  />
                            </div>
                            <div style="position: absolute;bottom: 20px;right: 5px;">
                              <el-checkbox v-model="item.checked" @change="checkedfile(item)"  :false-label="0" :true-label="1" ></el-checkbox>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>
                <div v-if="filetype == '视频'">
                   <div class="clear" v-for="(elem ,index) in videoFilesData" style="padding-bottom:20px;border-bottom:1px solid #CCCCCC;" >
                    <div class="clear" >
                      <div class="clar" style="color:#999;padding:10px 0 5px 10px;" >
                        <span>提交人：{{elem.name}}</span>
                      </div>  
                      <div class="clear" style="display: inline-block;display: -webkit-box;display: flex;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-justify-content:space-between;justify-content:flex-start;overflow: hidden;text-align: center;overflow-x: auto;">
                        <div v-for="(item,index) in elem.files" class="left"  :style="{'margin-left': index == 0 ? '10px':'20px', 'height': '125px','width': '200px','display': 'inline-block'}">
                          <div style="position: relative;display: inline-grid;">
                            <div style="width: 200px;height: 100px;box-shadow:5px 5px 5px #858585;border-radius:5px;border:1px solid #797979;overflow:hidden;position:relative;">
                              
                              <img :src=item.frame style="width: 100%;height: 100%;"> 
                              <div  @click="openVideo(item)" class="" style="cursor:pointer;width:100%;height:100px;background:rgba(0,0,0,.1);position:absolute;left:0px;top:0px;" ></div>
                              <div  @click="openVideo(item)" class="clear" style="cursor:pointer;width:40px;height:40px;position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);" >
                                  <div class="play-pause" >
                                    <div class="play-angle" >
                                    </div>  
                                  </div>
                              </div>
                            </div>
                             
                             <div class="" style="width: 100%;overflow: hidden;margin-top:5px;text-overflow: ellipsis;white-space: nowrap;">
                              <span @click="showEditor(item)" v-show="item.editor == 0" style="border-radius:3px;display:inline-block;width:100%;border:1px solid #797979;" >{{item.name}}</span>
                              <input v-show="item.editor == 1" @blur="setFileName(item,'视频')" type="text" class="input" v-model="item.name"  />
                            </div>
                            <div style="position: absolute;bottom: 22px;right: 5px;">
                              <el-checkbox v-model="item.checked" @change="checkedfile(item)"  :false-label="0" :true-label="1"   ></el-checkbox>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    
                  </div>
                  <div id="videoBox" class="clear" style="display:none;position:absolute;width:800px;z-index:100;height:560px;background:rgba(0,0,0,0.3);left:calc(50% - 400px);top:calc(50% - 280px)" >
                    <div  class="clear close-box"  >
                        
                        <i @click="closeVideo" style="" class="el-icon-close" ></i>
                    </div>
                    <div class="vjs-icon-placeholder" ></div>
                    <div  id="playBox" style="width:685px;height:330px;left:calc(50% - 342px);top:calc(50% - 165px);position:absolute;"  
                      >
                      <audio id="example-video" preload="auto" class="video-js vjs-default-skin" type="audio/wav" hidden="hidden"></audio>
                      
                    </div>
                  </div>      
                </div>
                <div v-if="filetype == '文档'">
                   <div class="clear" v-for="(elem ,index) in fileFilesData" style="padding-bottom:20px;border-bottom:1px solid #CCCCCC;" >
                    <div class="clear" >
                      <div class="clar" style="color:#999;padding:10px 0 5px 10px;" >
                        <span>提交人：{{elem.name}}</span>
                      </div>  
                      <div class="clear" style="width:100%;">
                        <div v-for="(item,index) in elem.files" class="left"  style="margin-left: 20px; height: 125px;width: 110px;display: inline-block;">
                          <div style="position: relative;display: inline-grid;">
                            <div style="width: 100px;height: 100px;">
                              <a class="btn btn-success btn-sm" :href="item.file" target="_blank" :download="item.name" >
                                <img  :src="getFilePdfImg" style="width: 100%;height: 100%;">  
                              </a>
                            </div>
                            <div class="" style="width: 100%;overflow: hidden;margin-top:5px;text-overflow: ellipsis;white-space: nowrap;">
                              <span @click="showEditor(item)" v-show="item.editor == 0" style="text-align:center;border-radius:3px;display:inline-block;width:100%;border:1px solid #797979;" >{{item.name}}</span>
                              <input v-show="item.editor == 1" @blur="setFileName(item,'文档')" type="text" class="input" v-model="item.name"  />
                            </div>
                            <div style="position: absolute;bottom: 20px;right: 5px;">
                              <el-checkbox v-model="item.checked" @change="checkedfile(item)"  :false-label="0" :true-label="1"  ></el-checkbox>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>
            </div>
            <div v-if="!getContractStateDisable" class="clear" style="text-align:center;height:35px;padding:5px 0;position: absolute;bottom: 18px;left: 50%;margin-left: -70px;" >
              <span class="btn-span" @click="downloadloadFile" >下载</span>
              <span class="btn-span" @click="showUploadFile" >上传</span>
              <span class="btn-span" @click="deleteFilefunc" >删除</span>
              <!-- <el-image style="width: 42px; height: 26px;opacity: 1;position: absolute;right: 0px;cursor: pointer;" src='https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg' :preview-src-list="srcList" :z-index="100001"></el-image> -->
              <!-- <span class="btn-span" @click="narrowFilefunc" >缩小</span> -->
           </div>
          </div>
        </div>
      </div>
     
    </el-dialog>
  </div>
</template>

<script>
  //获取数据
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
  import UploadFilePage from './uploadFile';
  import { baseUrl } from '../config/env'
  import filePdfImg from '../images/pdfdefault.png'
  export default {
    // frozenAndInvoildDisalbed 合同状态冻结和作废的限制
    props:["fileVisible",'recordId','deleteFiles','getFilesByType','uploadFiles','downLoadFiles','updateFileName','frozenAndInvoildDisalbed'],
    data() {
      return {
        dialogVisible:this.fileVisible,
        uploadFilePageValue:false,
        getFilePdfImg:filePdfImg,
        phoneNum:0,
        videoNum:0,
        fileNum:0,
        myActiveIndex:0,
        filetype:"图片",
        myimgindex:0,
        imgFilesData:[],
        videoFilesData:[],
        fileFilesData:[],
        checkedfiledata:[],
        myActiveIndexFile:'',
        getContractStateDisable:false,
        urlImg:'',
        videoSrc:'',
        myVideo:'',
        params:{
          zoomVal:1,
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false
        },
        srcList: [
          
        ],
        showViewer: false,
        activeimg:true,
        activevideo:false,
        activetext:false,
      }
    },
    components:{
      UploadFilePage,
      ElImageViewer
    },
    methods: {
      openVideo(item){
        document.getElementById("videoBox").style.display = "block";
        this.urlImg = item.frame;
        this.videoSrc = item.file;
       
        var myVideoDiv = document.getElementById("playBox")
        myVideoDiv.innerHTML = "<video id='myPlayer' autoplay='auto' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' style='width: 100%;height: 100%' src="+ item.file +" controlBar='true'></video>"
        this.$video("myPlayer", {
          "width":"685px",
          "height":"330px",
            "poster":item.frame,
            "autoplay":true,
            "controls": true,
            "sources": [{
                src: item.file,
                
            }],
      
        }).src(item.file).load(item.file).play();
      },
      closeVideo(){
       
        document.getElementById("videoBox").style.display = "none";
       
        let myvideo = this.$video('myPlayer', {
                    bigPlayButton: false,
                    textTrackDisplay: false,
                    posterImage: true,
                    errorDisplay: false,
                    controlBar: true
                })
        myvideo.dispose()
      },
      setFileName(item,type){
        let _this = this;
        let form = {};
        item.editor = 0;
        form.id = item.id;
        form.name = item.name;
        form.type = type;
        this.updateFileName(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },

      bottomindexfunc(item,index){
        let _this = this;
        _this.myActiveIndex = index;
        _this.myActiveIndexFile = item.file;

        _this.srcList.forEach((i,ii)=>{
          if(ii==index){
             _this.srcList.splice(ii,1);
             return false;
          }
        })
        _this.srcList.unshift(item.file);
        _this.showViewer = true
      },
      showEditor(item){
        item.editor = 1;
      },
      mychange(newindex,oldindex){
        let o=document.getElementsByClassName("myimgclass")[oldindex];
        o.style.transform='none';
        o.style.left = 0;
        o.style.top = 0;
        this.myActiveIndex = newindex;
       
      },
      leftmove(){
        let swiper = document.getElementsByClassName("swiper");
        this.myimgindex++;
        document.getElementsByClassName("imgBox").style.transform="translateX("+(125*this.myimgindex)+"px)";
      },
      getfilesData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let thisform = {id:_this.recordId,type:_this.filetype};
        this.getFilesByType(thisform).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data
            let files = data.files;
            let count = 0;
            if(files && files.length != 0){
              files.forEach(item => {
                let childFiles = item.files;
                if(childFiles && childFiles.length != 0){
                  childFiles.forEach(item1 => {
                     item1.checked = 0;
                     item1.editor = 0;
                     count ++;
                  })
                }
               
              })
            }
            if(_this.filetype == '图片'){
              if(files){
                
                _this.imgFilesData = files;
                
              }else{
                _this.imgFilesData = [];
                _this.phoneNum = 0;
              }
            }else  if(_this.filetype == '视频'){
              if(files){
               
                _this.videoFilesData = files;
                
                _this.urlImg = files[0].frame;
                _this.videoSrc = files[0].file;
              }else{
                _this.videoFilesData = [];
                _this.videoNum = 0;
              }
            }else if(_this.filetype == '文档'){
              if(files){
               
                _this.fileFilesData = files;
              }else{
                _this.fileFilesData = [];
                _this.fileNum = 0;
              }
            }
            let filesall = data.filesall;
            let phoneNum = filesall["图片"];
            let videoNum = filesall["视频"];
            let fileNum = filesall["文档"];
            if(phoneNum){
              _this.phoneNum = phoneNum;
            }else{
               _this.phoneNum = 0;
            }
            if(videoNum){
                _this.videoNum = videoNum;
            }else{
               _this.videoNum = 0;
            }
            if(fileNum){
                _this.fileNum = fileNum;
            }else{
               _this.fileNum = 0;
            }
            
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })

      },

      //显示上传组件
      showUploadFile(){
        let _this = this;
        let test = _this.$layer.iframe({
          content: {
            content: UploadFilePage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{recordId:_this.recordId,filetype:_this.filetype,uploadFiles:this.uploadFiles}//props
          },
          area:['600px','450px'],
          title: "上传文件",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891111,
          cancel:()=>{//关闭事件
            this.currentPage = '';
          }
        });
      },

      //删除
      deleteFilefunc(){
        let _this = this;

        let arr = [];
        let filetype = _this.filetype;
        if(filetype == '图片'){
          let imgFilesData = this.imgFilesData;
          imgFilesData.forEach(item => {
            let childFiles = item.files;
            if(childFiles && childFiles.length != 0){
              childFiles.forEach(item1 => {
                  if(item1.checked){
                    arr.push(item1.id);
                  }
              })
            }
          })
        }else  if(filetype == '视频'){
          let videoFilesData = this.videoFilesData;
          videoFilesData.forEach(item => {
            let childFiles = item.files;
            if(childFiles && childFiles.length != 0){
              childFiles.forEach(item1 => {
                  if(item1.checked){
                    arr.push(item1.id);
                  }
              })
            }
          })
        }else  if(filetype == '文档'){
          let fileFilesData = this.fileFilesData;
          fileFilesData.forEach(item => {
            let childFiles = item.files;
            if(childFiles && childFiles.length != 0){
              childFiles.forEach(item1 => {
                  if(item1.checked){
                    arr.push(item1.id);
                  }
              })
            }
          })
        }

        if(arr.length==0){
          _this.myAlert("请选择需要删除的文件!");
          return false;
        };
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let ids = arr.toString();
       
        let form = {ids:ids};
        this.deleteFiles(form).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.myAlert("删除成功",'success-icon').then(res => {
              _this.getfilesData();
            }).catch(err => {

            })
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      //下载
      downloadloadFile(){
        let _this = this;
        let arr = [];
        let filetype = _this.filetype;
        debugger;
        if(filetype == '图片'){
          let imgFilesData = this.imgFilesData;
          imgFilesData.forEach(item => {
            let childFiles = item.files;
            if(childFiles && childFiles.length != 0){
              childFiles.forEach(item1 => {
                  if(item1.checked){
                    arr.push(item1.id);
                  }
              })
            }
          })
        }else  if(filetype == '视频'){
          let videoFilesData = this.videoFilesData;
          videoFilesData.forEach(item => {
            let childFiles = item.files;
            if(childFiles && childFiles.length != 0){
              childFiles.forEach(item1 => {
                  if(item1.checked){
                    arr.push(item1.id);
                  }
              })
            }
          })
        }else  if(filetype == '文档'){
          let fileFilesData = this.fileFilesData;
          fileFilesData.forEach(item => {
            let childFiles = item.files;
            if(childFiles && childFiles.length != 0){
              childFiles.forEach(item1 => {
                  if(item1.checked){
                    arr.push(item1.id);
                  }
              })
            }
          })
        }
        if(arr && arr.length == 0){
          _this.myAlert("请选择文件!","dangerous-icon");
          return false;
        }
        debugger;
        var form = document.createElement("form");
        document.getElementsByTagName('body')[0].appendChild(form);
        form.setAttribute('style','display:none');
        form.setAttribute('class','myForm');
        form.setAttribute('target','_blank');
        form.setAttribute('method','post');
        form.setAttribute('action',baseUrl+ this.downLoadFiles);//下载文件的请求路径

        //clinicId
        var input1 = document.createElement('input');
        input1.setAttribute('type','hidden');
        input1.setAttribute('name','ids');
        input1.setAttribute('value',arr.toString());
        form.appendChild(input1);

        form.submit();
        document.getElementsByTagName('body')[0].removeChild(form);
　　　　　},
      //放大
      // enlargeFilefunc(){
      //   let _this = this;
      //   let o=document.getElementsByClassName("myimgclass")[_this.myActiveIndex];
      //   _this.params.zoomVal+=0.2;
      //   if (_this.params.zoomVal <= 2) {
          
      //     o.style.transform="scale("+_this.params.zoomVal+")";
      //   }else {
      //     _this.params.zoomVal=2;
      //     o.style.transform="scale("+_this.params.zoomVal+")";
      //     return false;
      //   }
      // },
      //缩小
      // narrowFilefunc(){
      //   let _this = this;
      //   let o=document.getElementsByClassName("myimgclass")[_this.myActiveIndex];
      //   _this.params.zoomVal-=0.2;
      //   if (_this.params.zoomVal >= 1) {
      //     o.style.transform="scale("+_this.params.zoomVal+")";
      //   } else {
      //     _this.params.zoomVal=1;
      //     o.style.transform="scale("+_this.params.zoomVal+")";
      //     return false;
      //   }
      // },
      //全屏
      FullScreenShow(){
        this.showViewer = true
      },
      closeViewer() {
        this.showViewer = false
      },
      //勾选中的文件id
      checkedfile(item){
        let _this = this;
        if(_this.checkedfiledata.indexOf(item.id)==-1){
          item.checked = true;
          _this.checkedfiledata.push(item.id);

        }else{
          item.checked = false;
          _this.checkedfiledata.splice(_this.checkedfiledata.indexOf(item.id),1);
        }
        _this.$forceUpdate();
      },
      //图片拖拽
      movefilefunc(e){
        this.startDrag(document.getElementsByClassName("myimgclass")[0],document.getElementsByClassName("myimgclass")[0]);
      },

      //获取相关CSS属性
      getCss(o,key){
        return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
      },
      //拖拽的实现
      startDrag(bar, target, callback){
        let _this = this;
        if(_this.getCss(target, "left") !== "auto"){
          _this.params.left = _this.getCss(target, "left");
        }
        if(_this.getCss(target, "top") !== "auto"){
          _this.params.top = _this.getCss(target, "top");
        }
        //o是移动对象
        bar.onmousedown = function(event){
          _this.params.flag = true;
          if(!event){
            event = window.event;
            //防止IE文字选中
            bar.onselectstart = function(){
              return false;
            }
          }
          let e = event;
          _this.params.currentX = e.clientX;
          _this.params.currentY = e.clientY;
        };
        document.onmouseup = function(){
          _this.params.flag = false;
          if(_this.getCss(target, "left") !== "auto"){
            _this.params.left = _this.getCss(target, "left");
          }
          if(_this.getCss(target, "top") !== "auto"){
            _this.params.top = _this.getCss(target, "top");
          }
        };
        document.onmousemove = function(event){
          let e = event ? event: window.event;
          if(_this.params.flag){
            let nowX = e.clientX, nowY = e.clientY;
            let disX = nowX - _this.params.currentX, disY = nowY - _this.params.currentY;
            target.style.left = parseInt(_this.params.left) + disX+ "px";
            target.style.top = parseInt(_this.params.top) + disY+ "px";
            if (typeof callback == "function") {
              callback((parseInt(_this.params.left) || 0) + disX, (parseInt(_this.params.top) || 0) + disY);
            }
            if (event.preventDefault) {
              event.preventDefault();
            }
            return false;
          }
        }
      },
      clearFormData(){

      },
      changefiletype(typeval){
        this.filetype = typeval;
        if(typeval=="图片"){
          this.activeimg = true;
          this.activevideo = false;
          this.activetext = false;
        }else if(typeval == "视频"){
          this.activeimg = false;
          this.activevideo = true;
          this.activetext = false;
        }else if(typeval == "文档"){
          this.activeimg = false;
          this.activevideo = false;
          this.activetext = true;
        }
        this.getfilesData();
      }
    },
    mounted(){
      if(this.frozenAndInvoildDisalbed){
        this.getContractStateDisable = this.frozenAndInvoildDisalbed;
      }
      
      this.getfilesData();
    }
  }
</script>
<style lang="scss" scoped>
 
  .close-box{
    right:57px;
    top:115px;
    z-index:101;
    width:30px;
    height:30px;
    position:absolute;
    font-size:25px;
    color:#fff;
    .el-icon-close{
      cursor: pointer;
      display:block;
      font-size:25px;
      
    }  
  }
  .el-carousel,.el-carousel--horizontal{
    height: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .file-left-content{
    width:95px;
    height:466px;
  }
  .file-right-content{
    width:676px;
    border-width: 2px;
    overflow:auto;
    border-style: solid;
    border-image: url("../images/system/border.png")  2 repeat ;
    margin:8px 0  0;
    height:466px;
  }
  .phone-icon{
    display:inline-block;
    width:55px;
    height:55px;
    background: url("../images/icon.png") -231px -24px;
    cursor:pointer;
  }
  .video-icon{
    display:inline-block;
    width:55px;
    height:55px;
    background: url("../images/icon.png") -294px -28px;
    cursor:pointer;
  }
  .file-icon{

    display: inline-block;
    width: 53px;
    height: 55px;
    background: url("../images/icon.png") -348px -24px;
    cursor:pointer;
  }
  .btn-span{
    padding:3px 8px;
    border:1px solid #666;
    display:inline-block;
    cursor:pointer;
  }
  .activeclass{
    border: 1px solid #333;
    border-radius: 10px;
    margin-bottom: 3px;
  }


  
</style>]
<style lang="scss">
  .vjs-paused .vjs-big-play-button,
  .vjs-paused.vjs-has-started .vjs-big-play-button {
      display: block;
  }
  .video-js .vjs-big-play-button{
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115,133,159,.5);
    border-width: 0.15em;
    margin-top: -1.25em;
    margin-left: -1.75em;
}
.play-pause{
    border: 1px solid #fff;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    background-color: #73859f;
    background-color: rgba(115,133,159,0.5);
    border-width: 0.15em;
}
.play-angle{
  width: 0;
  height: 0;
  margin: 11px 0 0 15px;
  border-top: 8px solid transparent;
  border-left: 11px solid #fff;
  border-bottom: 8px solid transparent;
}
/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em;
}
/* 加载圆圈 */
.vjs-loading-spinner {
    font-size: 2.5em;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin-top: -1em;
    margin-left: -1.5em;
}
.video-js.vjs-playing .vjs-tech {
    pointer-events: auto;
}
.input{
  border:1px solid #797979;
  border-radius:3px;
}
i.el-icon-circle-close {
  font-size: 20px;
  color: #fff;
}
</style>