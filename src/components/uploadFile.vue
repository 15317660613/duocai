<template>
  <div class="" style="padding: 0 10px 10px;">
   
      <div class="pop-up" style="width:580px" >
        <div class="pop-up-container" style="margin: 10px;overflow-x: hidden;overflow-y: auto;" >
          <div class="clear" >
            <div class="clear" >
              <div class="left" style="margin: 5px 10px;">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-remove="handleRemove"
                  :on-change="filechangefunc"
                  :show-file-list="false"
                   multiple
                  :auto-upload="false"
                  :file-list="fileListdata">
                  <el-button  type="primary" >选择文件</el-button>
                </el-upload>
              </div>
            </div>
            <div class="phone-content" v-model="fileListdata" style="height: 296px;width: 536px;">
              <div class="left" v-if="fileListdata.length>0" v-for="(item,index) in fileListdata" style="width: 120px;height: 142px;margin: 4px;border: 1px solid #bcbcbc;border-radius: 3px;">
                <div style="height: 108px;width: 108px;margin: 5px;position:relative;">
                  <img :src="item.fileUrl" style="height: 100%;width: 100%;">
                  <div style="width:100%;height:100%;background:rgba(0,0,0,.3);position:absolute;left:0;top:0;" ></div> 
                  <div  v-if="filetype == '视频'" class="clear" style="width:40px;height:40px;position:absolute;left:34px;top:32px;" >
                      <div class="play-pause" >
                        <div class="play-angle" >
                        </div>  
                      </div>
                  </div>
                </div>
                
                <div style="text-align: center;position: relative;">
                  <div style="max-width: 110px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align: center;">
                    <span>{{item.name}}</span>
                  </div>
                  <div style="position: absolute;top: 2px;right: 5px;">
                    <i class="thirteen-three-icon" @click="deletefunc(item,index)"></i>
                  </div>
                  
                </div>
              </div>
            </div>
            <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
              <span class="right save-cancel-btn" @click="clearFormData">取 消</span>
              <span class="right save-cancel-btn" type="primary" @click="saveFormData" >保 存</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  //获取数据
  import videoImg from '../images/video.jpg'
  import filePdfImg from '../images/pdfdefault.png'
  import fileWordImg from '../images/worddefault.png'
  import fileXlsxImg from '../images/xlsxdefault.png'

  export default {
    props:["filetype",'recordId','layerid','uploadFiles'],
    
    data() {
      return {
       
        phoneNum:0,
        videoNum:0,
        fileNum:0,
        fileListdata:[],
      }
    },
    components:{

    },
    methods: {
      thisfiletypefunc(){
        console.log(this.filetype);
      },
      deletefunc(item,index){
        // item.deleted = 1;
        this.fileListdata.splice(index,1);
      },
      handleRemove(file, fileList) {
       
        this.fileListdata = fileList;

      },
      filechangefunc(file,fileList){
        debugger;
        let _this = this;
        //图片类型  'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'
        const imgtype = file.raw.type === 'image/jpg' ||file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
        //视频类型
        const videotype = file.raw.type === "video/mp4" || file.raw.type === "video/rmvb" || file.raw.type === "video/avi" || file.raw.type === "video/ts";
        //文档类型
        const documenttype = file.name.indexOf(".") == -1 || file.name.indexOf('.doc')!=-1 ||  file.name.indexOf('.docx')!=-1 ||file.name.indexOf('.xmind')!=-1 || file.name.indexOf('.xls')!=-1 || file.name.indexOf('.xlsx')!=-1 || file.name.indexOf('.txt')!=-1 || file.name.indexOf('.pptx')!=-1 || file.name.indexOf('.ppt')!=-1 || file.name.indexOf('.pdf')!=-1 ;
        //上传图片的大小
        const imgfilesize = file.size / 1024 / 1024  < 10;
        //上传视频的大小
        const videofilesize = file.size / 1024 / 1024  < 100;
        //上传文档的大小
        const documentfilesize = file.size / 1024 / 1024  < 10;
        // 列表图片显示路径
        let fileurl = URL.createObjectURL(file.raw);
        
      
        if(_this.filetype=="图片"){
          if(!imgtype){
            this.splicefilelistdata(file);
            _this.myAlert("请上传正确的文件格式！");
            return false;
          };
          if(!imgfilesize){
            this.splicefilelistdata(file);
            _this.myAlert("上传文件大小不能超过10MB！");
            return false;
          };
          
        };

        if(_this.filetype=="视频"){
          if(!videotype){
            this.splicefilelistdata(file);
            this.myAlert("请上传正确的文件格式！");
            return false;
          };
          if(!videofilesize){
            splicefilelistdata();
            _this.myAlert("上传文件大小不能超过100MB！");
            return false;
          };
         
        }

        if(_this.filetype=="文档"){
            if(!documenttype){
               this.splicefilelistdata(file);
              _this.myAlert("请上传正确的文件格式！");
              return false;
            };
            if(!videofilesize){
              this.splicefilelistdata(file);
              _this.myAlert("上传文件大小不能超过10MB！");
              return false;
            }  
        }    
        fileList.forEach(item => {
          if(_this.filetype == '图片'){
            item.fileUrl = URL.createObjectURL(item.raw);
          }else if(_this.filetype == '视频'){
            item.fileUrl = videoImg;
          }
            if(file.name.indexOf('.xmind')!=-1){
              item.fileUrl = filePdfImg;
            }else if(file.name.indexOf('.docx')!=-1){
                item.fileUrl = fileWordImg;
            } else if(file.name.indexOf('.xlsx')!=-1){
              item.fileUrl = fileXlsxImg;
            }
        }) 
        this.fileListdata = fileList;
      },
      splicefilelistdata(file){
        let fileListdata = this.fileListdata;
        let arr = [];
        fileListdata.forEach((item,index)=>{
          if(file.name !=item.name){
              arr.push(item);
          }
        });
        this.fileListdata = arr;
      },
      saveFormData(){
        let _this = this;
        
        if(_this.fileListdata.length<=0){
          _this.myAlert("请选择文件!");
          return false;
        }
        let myfilesdata = [];
        _this.fileListdata.forEach((item,index)=>{
          delete item.url;
          myfilesdata.push(item.raw);
        })
        console.log(myfilesdata);
        let thisform = {id:_this.recordId,type:_this.filetype,files:myfilesdata};
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        this.uploadFiles(thisform).then(function(response){
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data;
            _this.myAlert("上传成功！", "success-icon")
            .then(res => {
              _this.$parent.getfilesData();
              _this.$layer.close(_this.layerid);
            })
            .catch(err => {});

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      clearFormData(){
       // this.dialogVisible = false;
       this.$layer.close(this.layerid);
      },
      showDialogVisible(){
        this.dialogVisible = true;
      },
    },
  }
</script>
<style lang="scss" scoped>
  .mydelete-icon{
    display:inline-block;
    width:13px;
    height:13px;
    background: url("../images/custom-icon.png") -186px 0px;
    cursor:pointer;
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
  .file-left-content{
    width:95px;
    height:435px;
  }
  .phone-content{
    width:560px;
    border-width: 2px;
    border-style: solid;
    border-image: url("../images/system/border.png")  2 repeat ;
    margin:0px 10px;
    height:380px;
    overflow-y: auto;
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
</style>



