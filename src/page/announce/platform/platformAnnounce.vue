<template>
  <div id="follow-container" class="page-container mycontailerclass1" style="height: 100%;">
    <div class="top-container border-black" >
      <div class="search-container mycontailerclass2" >
        <div class="clear" >
          <div class="left p-l-15">
            <div class="left border-icon" @click="newaddfunc">
              <i class="six-eleven-icon left" style="margin-top: 5px;"></i>
              <span class="search-word p-l-5">新增</span>
            </div>
          </div>

          <div class="left p-l-15">
            <div class="left border-icon" @click="deletefunc">
              <i class="six-ten-icon left" style="margin-top: 6px;"></i>
              <span class="search-word p-l-5">删除</span>
            </div>
          </div>

          <div class="left p-l-15" >
            <i class="cut-icon cut"></i>
          </div>

          <div class="left p-l-15">
            <div class="left border-icon" @click="toppingfunc">
              <i class="fourteen-one-icon left m-t-3"></i>
              <span class="search-word p-l-5">置顶</span>
            </div>
          </div>

          <div class="left p-l-15">
            <div class="left border-icon" @click="canceltoppingfunc">
              <i class="fourteen-two-icon left m-t-3"></i>
              <span class="search-word p-l-5">取消置顶</span>
            </div>
          </div>

          <div class="left p-l-10">
            <div class="left border-icon"  >
              <i class="filterchoose-icon" title="过滤选中" @click="filterData" ></i>
            </div>
          </div>

          <div class="left p-l-10 m-t-3">
            <div class="border-icon clear" > 
             <i class="one-twelve-icon"  @click="tabRemove('/home/AnnocuncePlatform')"></i>
            </div> 
          </div>

          <div class="left p-l-15" >
            <i class="cut-icon cut"></i>
          </div>

          <div class="left p-l-10" >
            <div class="record-num" >
              <span><</span>
              <span>{{currentNum}}</span>
              <span >/</span>
              <span>{{tableData.length}}</span>
              <span>></span>
            </div>
          </div>
        </div>
      </div>
      <div class="search-container " >
        <el-form ref="formsData"  :model="form" >
          <div class="clear">
            <div class="left p-l-15">
              <span class="des-word">发布日</span>
            </div>
            <div class="left">
              <el-form-item label="" label-width="0">
                <el-select @change="getQuickDate" v-model="timetype"  placeholder="" style="width:70px;"   >
                  <el-option  label="全部" value="-1" ></el-option>
                  <el-option  label="今天" value="2" ></el-option>
                  <el-option  label="昨天" value="3" ></el-option>
                  <el-option  label="本周" value="4" ></el-option>
                  <el-option  label="本月" value="5" ></el-option>
                  <el-option  label="上月" value="6" ></el-option>
                  <el-option  label="3天" value="7" ></el-option>
                  <el-option  label="7天" value="8" ></el-option>
                  <el-option  label="10天" value="9" ></el-option>
                  <el-option  label="30天" value="10" ></el-option>
                  <el-option  label="100天" value="11" ></el-option>
                  <el-option  label="自定义" value="1" ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-date-picker
                  type="date"
                  :disabled="timeDisabled"  
                  value-format="yyyy-MM-dd"
                  v-model="form.timeStart"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <el-date-picker
                  type="date"
                  :disabled="timeDisabled"  
                  value-format="yyyy-MM-dd"
                  v-model="form.timeEnd"
                  style="width: 100px;"
                ></el-date-picker>
              </el-form-item>
            </div>

            <div class="left" style="padding-left: 27px;">
              <span class="des-word">类型</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" >
                <el-select v-model="form.types"  style="width:120px;">
                  <el-option v-for="item in pnameparams" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left p-l-30">
              <span class="des-word">发布</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" >
                <el-select v-model="form.ispuall"  style="width:97px;">
                  <el-option v-for="item in issueparams" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="left p-l-15">
              <el-form-item>
                <el-input title="标题/主讲人" placeholder="标题/主讲人" v-model="form.word" style="width: 200px;"></el-input>
              </el-form-item>
            </div>

            <div class=" left p-l-5" style="padding-top:1px;">
              <i class="search-btn" @click="searchTableData" >查询</i>
            </div>

            <div class="left" style="padding-top:2px;padding-left: 2px;" >
              <i class="claerlys" @click="clearForm" ></i>
            </div>

            <div class="left" style="margin-top:4px;">
              <i
                :class="{'down-search-icon':upAndDown == 1,'up-search-icon':upAndDown == 2}"
                @click="showSearch"
              ></i>
            </div>

            
          </div>
          <div class="clear" style id="searchContent2">
            <div class="left p-l-15">
              <span class="des-word">接收人</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" >
                <el-select v-model="form.dors" @change="dorschangefunc" style="width:70px;">
                  <el-option v-for="item in dorsparams" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- 部门 -->
            <div v-if="form.dors==1" class="left p-l-2">
              <el-form-item>
                <CheckSelectSpecial
                  @findStreetByTown="departschangefunc(1)"
                  :selectId="rdeparts"
                  :listData="rdepartsparams"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <!-- 职位 -->
            <div v-if="form.dors==2" class="left p-l-2">
              <el-form-item>
                <CheckSelectSpecial
                  @findStreetByTown="staffchangefunc"
                  :selectId="rstaffs"
                  :listData="rstaffsparams"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <CheckSelectSpecial
                  :selectId="rusers"
                  :listData="rusersparams"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

            <div class="left p-l-15">
              <span class="des-word">主讲人</span>
            </div>
            <div class="left">
              <el-form-item label label-width="0" >
                <el-select v-model="form.inex"  style="width:70px;">
                  <el-option v-for="item in inexparams" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- 内部 -->
            <div v-if="form.inex==0" class="left p-l-2">
              <el-form-item>
                <CheckSelectSpecial
                  @findStreetByTown="departschangefunc(2)"
                  :selectId="sdeparts"
                  :listData="sdepartsparams"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div v-if="form.inex==0" class="left p-l-2">
              <el-form-item>
                <CheckSelectSpecial
                  :selectId="susers"
                  :listData="susersparams"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <!-- 外部 -->
            <div v-if="form.inex==1" class="left p-l-2">
              <el-form-item>
                <el-input title="主讲人" v-model="form.word" style="width: 202px;visibility: hidden;"></el-input>
              </el-form-item>
            </div>

            <div class="left p-l-15">
              <span class="des-word">发布人</span>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <CheckSelectSpecial
                  @findStreetByTown="departschangefunc(3)"
                  :selectId="isdeparts"
                  :listData="isdepartsparams"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>
            <div class="left p-l-2">
              <el-form-item>
                <CheckSelectSpecial
                  :selectId="issuer"
                  :listData="issuerparams"
                  style="width:100px;"
                ></CheckSelectSpecial>
              </el-form-item>
            </div>

          </div>
        </el-form>
      </div>
    </div>

    <div class="content clear mycontent">
      <div class="list-content" style="padding: 10px;">
        <div v-for="item in tableData">
          <div class="clear thismytr" style=""  style="background-color: #eee !important;padding-top: 5px;">
            <div class="left" style="width: 40px;height: 120px;text-align: center;" >
              <div style="margin-top: 50px;">
                <el-checkbox v-model="item.select"></el-checkbox>
              </div>
            </div>
            <div class="left" style="width: 200px;">
              <div style="position: relative;width: 200px;">
                <div class="left" style="width: 200px;">
                  <video style="width: 200px;" class="video" ref="video" :src="initVideo.url" @pause="handPlay(2,2,item)" @play="handPlay(2,1,item)"
                       @loadedmetadata="getAudioLength(item)" @timeupdate="videoTimeUpdate(item)">
                  </video>
                </div>
                <!-- <p style="position: absolute;right: 10px;bottom: 5px;color: #fff;font-weight: bold;">{{item.progress}}</p> -->
              </div>
            </div>
            <div class="left" style="padding: 0px 15px;">
              <div class="clear" style="width: 100%;height: 30px;margin-top: 10px;">
                <div class="left" style="width: 100px;overflow: hidden;">
                  <span>编号：</span><span style="color: #999;">{{item.number}}</span>
                </div>
                <div class="left" style="width: 160px;overflow: hidden;">
                  <span>主讲人：</span><span style="color: #999;">{{item.speaker}}</span>
                </div>
                <div class="left" style="width: 170px;overflow: hidden;">
                  <span>类型：</span><span style="color: #999;">{{item.type}}</span>
                </div>
                <div class="left" style="width: 110px;overflow: hidden;">
                  <span>时长：</span><span style="color: #999;">{{item.duration}}</span>
                </div>
                <div class="left">
                  <i class="fourteen-nine-icon m-r-3" style="display: inline-block;"></i>
                </div>
                <div class="left" style="width: 60px;overflow: hidden;">
                  <span>播放：</span><span style="color: #999;">{{item.playbackVolume}}</span>
                </div>
                <div class="left">
                  <i class="fourteen-ten-icon m-r-3" style="display: inline-block;"></i>
                </div>
                <div class="left" style="width: 110px;overflow: hidden;">
                  <span>人数：</span><span style="color: #999;">{{item.personnum}}</span>
                </div>
                <div class="left" style="width: 60px;overflow: hidden;">
                  <span>发布：</span><span style="color: #999;">{{item.release}}</span>
                </div>
              </div>
              <div style="width:100%;height: 50px;">
                <div class="left m-r-10" style="margin-top: 8px;">
                  <i v-if="!item.initVideo.play" class="fifteen-two-icon" @click="clickplayfunc(item)"></i>
                  <i v-if="item.initVideo.play" class="fifteen-three-icon" @click="clickplayfunc(item)"></i>
                </div>
                
                <div class="left" style="width: 8px;height: 8px;background-color: #b87264;margin-top: 13px;border-radius: 50%;">
                  
                </div>
                <div  class="video_control left" style="width: 500px;">
                  <div class="progress" style="position: relative;">
                    <div class="clear">
                      
                      <div class="left" style="width: 500px;">
                        <el-slider class="commonSlider" :show-tooltip="false" v-model="item.initVideo.currentTime" :max="item.initVideo.videoLength" @change="((val)=>{changeVideoTime1(val, item)})" @input="((val)=>{changeVideoTime2(val, item)})">
                        </el-slider>
                      </div>
                    </div>
                    
                    
                    <div :id="'timeline'+item.id" class="time" style="position: absolute;border:1px solid #b87264;border-radius: 10px;padding: 0px 5px;background-color: #DCD9D3;left: 0px;top:7px;width: 105px;text-align: center;">
                      <span>{{item.initVideo.mycurrentTime}}</span>
                      <span style="margin: 0px 1px;">/</span>
                      <span>{{item.initVideo.myvideoLength}}</span>
                    </div>
                  </div>
                </div>

                <div class="left" style="width: 105px;background-color: #E4E7ED;height: 2px;margin-top: 16px;border-top-right-radius: 3px;border-bottom-right-radius: 3px;">
                  
                </div>
                <div v-if="item.initVideo.mycurrentTime==item.initVideo.myvideoLength" class="left" style="width: 8px;height: 8px;background-color: #b87264;margin-top: 13px;border-radius: 50%;">
                  
                </div>
                <div v-if="item.initVideo.mycurrentTime!=item.initVideo.myvideoLength" class="left" style="width: 8px;height: 8px;background-color: #DCD9D3;margin-top: 13px;border-radius: 50%;">
                  
                </div>
              </div>
              <div class="clear" style="width: 100%;height: 30px;margin-top: 10px;">
                <div class="left">
                  <span>标题：</span><span style="color: #336699;font-weight: bold;cursor: pointer;" @click="opendetailfunc(item)"><<{{item.name}}>></span>
                </div>
                <div class="right">
                  <span>发布人：</span><span style="color: #999;">{{item.publisher}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="break" style="height: 1px;">
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>


<script>
  // 获取数据
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex';
  import ColumPage from '../../../components/column'
  import progress111 from '../../../components/progress'
  import CheckSelectSpecial from '../../../components/checkSpecial'
  import { PlTable, PlTableColumn } from 'pl-table';
  import {quickDate} from '../../../utils/getQuickDate';
  import {sharingsharinglist,sharinggetNparam,userfindUserByStaffIds} from '../../../service/platformAnnounce';
  import {findUserByDepartId,dutyperson} from "../../../service/organizeDate";
  import newPlatformAnnounce from "./newPlatformAnnounce";
  import editorPlatformAnnounce from "./editorPlatformAnnounce";
  import { debounce } from "../../../utils/myself";
  import asdasd from "../../../images/beijing.png";
  import mymp4 from "../../../images/chapter_00.mp4"
  export default {
    data() {
      return {
        form:{
          timeStart:'',
          timeEnd:'',
          types:-1,
          ispuall:-1,
          word:'',
          dors:1,
          susers:'',
          inex:0,
        },
        multipleSelection:[],
        tableData:[
          {id:1,select:false,img:asdasd,name:'大厦空间大哈萨克',progress:'80%',number:'0001',speaker:'运保部-欧阳安然',type:'内部音频',mytype:2,duration:'01:20:23',playbackVolume:99,personnum:10,release:'是',music:'',publisher:'运保部-欧阳安然',initVideo:{play: false,videoLength: 0,myvideoLength: '00.00',url: mymp4,currentTime: 0,mycurrentTime: '00.00',lastTime: null,name: "",myindex:0,}},
          {id:2,select:false,img:asdasd,name:'大厦空间大哈萨克',progress:'80%',number:'0002',speaker:'运保部-1111111',type:'22222222',mytype:2,duration:'01:20:23',playbackVolume:99,personnum:10,release:'是',music:'',publisher:'运保部-欧阳安然',initVideo:{play: false,videoLength: 0,myvideoLength: '00.00',url: mymp4,currentTime: 0,mycurrentTime: '00.00',lastTime: null,name: "",myindex:1,}},
        ],
        currentNum:'',
        timetype:'7',
        rdeparts:'rdeparts',
        rusers:'rusers',
        sdeparts:'sdeparts',
        susers:'susers',
        isdeparts:'isdeparts',
        issuer:'issuer',
        rstaffs:'rstaffs',
        timeDisabled:false,
        pnameparams:[],
        upAndDown:1,
        rdepartsparams:[],
        rusersparams:[],
        sdepartsparams:[],
        susersparams:[],
        isdepartsparams:[],
        issuerparams:[],
        issueparams:[
          {id:-1,name:'全部',select:false},
          {id:0,name:'是',select:true},
          {id:1,name:'否',select:false},
        ],
        dorsparams:[
          {id:1,name:'部门',select:true},
          {id:2,name:'职位',select:false},
        ],
        inexparams:[
          {id:0,name:'内部',select:true},
          {id:1,name:'外部',select:false},
        ],
        currentNum:0,

        //视频
        initVideo: {
          play: false,//播放还是暂停 true播放中
          videoLength: 0,//时长
          myvideoLength: '00.00',//时长
          url: mymp4,//视频课件Url
          currentTime: 0,//当前播放时间
          mycurrentTime: '00.00',//当前播放时间
          lastTime: null,//标记时间戳
          name: "",
        },
        //音频
        initAudio: {
          play: false,//播放还是暂停 true播放中
          audioLength: 0,//audio时长
          url: "",//音频课件url
          currentTime: 0,//当前播放时间
          lastTime: null,//标记时间戳
          name: "",
        },
      };
    },
    components:{
      PlTable,
      PlTableColumn,
      ColumPage,
      CheckSelectSpecial,
      newPlatformAnnounce,
      editorPlatformAnnounce,
      progress111
    },
    methods:{
      clickplayfunc(item){
        this.playVideo(item);
        this.formatSeconds();
      },
      formatSeconds(value) {
      　　let result = parseInt(value)
      　　let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
      　　let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
      　　result = `${m}:${s}`;
      　　return result;
      },
      playVideo(item) {//播放视频
        console.log(this.$refs.video);
        if (item.initVideo.play) {
          this.$refs.video[item.initVideo.myindex].pause();
        } else {
          Math.abs(item.initVideo.currentTime - this.$refs.video[item.initVideo.myindex].currentTime) > 1 ? item.initVideo.currentTime =  this.$refs.video[item.initVideo.myindex].currentTime: '';
          Math.abs(item.initVideo.currentTime - this.$refs.video[item.initVideo.myindex].currentTime) > 1 ? item.initVideo.mycurrentTime =  this.formatSeconds(this.$refs.video[item.initVideo.myindex].currentTime): '';
          this.$refs.video[item.initVideo.myindex].play();
          this.$refs.video[item.initVideo.myindex].muted = false
        }
      },
      videoTimeUpdate(item) {//更新视频时间。节流，每秒触发一次
        let nowTime = Date.now()
        let gapTime = 50;
        if (!item.initVideo.lastTime || nowTime - item.initVideo.lastTime > gapTime) {
          if (this.$refs.video[item.initVideo.myindex]) {
              let time = this.$refs.video[item.initVideo.myindex].currentTime;
              item.initVideo.currentTime = time;
              item.initVideo.mycurrentTime = this.formatSeconds(time);
          }
          item.initVideo.lastTime = nowTime;
          let a = item.initVideo.currentTime;
          let b = item.initVideo.videoLength;
          let c = (a/b)*100;
          document.getElementById("timeline"+item.id).style.left = c+"%";

        }
      },
      changeVideoTime1(val,item) {//改变视频时间
        if (this.$refs.video[item.initVideo.myindex]) {
          this.$refs.video[item.initVideo.myindex].currentTime = val;
        }
      },
      changeVideoTime2(val,item) {//改变视频时间
        if (this.$refs.video[item.initVideo.myindex]) {
          let a = val;
          let b = item.initVideo.videoLength;
          let c = (a/b)*100;
          document.getElementById("timeline"+item.id).style.left = c+"%";
        }
      },
      getAudioLength(item) {//获取音视频时长 1音频 2视频
        console.log(this.$refs.video);
        if (item.mytype == 1) {
          item.initAudio.audioLength = this.$refs.audio[item.initAudio.myindex].duration;
        }
        if (item.mytype == 2) {
          item.initVideo.videoLength =  this.$refs.video[item.initVideo.myindex].duration;
          item.initVideo.myvideoLength =  this.formatSeconds(Math.floor(this.$refs.video[item.initVideo.myindex].duration));
        }
      },
      handPlay(type, status,item) {//音视频播放暂停 type:1 音频 2视频 status 1播放 2暂停
        if (type == 1) {
          status == 1 ? item.initAudio.play = true : item.initAudio.play = false;
        } else {
          status == 1 ? item.initVideo.play = true : item.initVideo.play = false;
        }
      },

      // 获取参数
      getParamsData(){
        let _this = this;
        this.$layer.loading({
          shade: true //是否显示遮罩
        });

        sharinggetNparam().then(function(res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            let data = res.data;
            let arr = [{id:-1,name:"全部",select:true}];
            _this.pnameparams = arr.concat(data.Shares);

            let arr1 = [{id:-1,name:"全部",select:true}];
            let arr2 = [{id:-1,name:"全部",select:true}];
            let arr3 = [{id:-1,name:"全部",select:true}];
            data.departTree.forEach(item=>{
              arr1.push({
                id:item.id,
                name:item.label.replace(/&nbsp;/g, ""),
                level: item.level,
                select: false,
                state:item.state,
              });
              arr2.push({
                id:item.id,
                name:item.label.replace(/&nbsp;/g, ""),
                level: item.level,
                select: false,
                state:item.state,
              });
              arr3.push({
                id:item.id,
                name:item.label.replace(/&nbsp;/g, ""),
                level: item.level,
                select: false,
                state:item.state,
              });
            })
            
            _this.rdepartsparams = arr1;
            _this.sdepartsparams = arr2;
            _this.isdepartsparams = arr3;

            _this.rusersparams = [{id:-1,name:"全部",select:true}];
            _this.susersparams = [{id:-1,name:"全部",select:true}];
            _this.issuerparams = [{id:-1,name:"全部",select:true}];

            let arr4 = [{id:-1,name:"全部",select:true}];
            data.staffList.forEach(item=>{
              arr4.push({
                id:item.id,
                name:item.label.replace(/&nbsp;/g, ""),
                select: false,
              });
            })
            _this.rstaffsparams = arr4;

            _this.getQuickDate(7);
          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        });
      },
      //查询
      searchTableData(){
        let _this=this;
        let form = JSON.parse(JSON.stringify(_this.form)); 
        form.rdeparts = _this.getSelectIdByList(_this.rdepartsparams);
        form.rstaffs = _this.getSelectIdByList(_this.rstaffsparams);
        form.rusers = _this.getSelectIdByList(_this.rusersparams);
        form.sdeparts = _this.getSelectIdByList(_this.sdepartsparams);
        form.susers = _this.getSelectIdByList(_this.sdepartsparams);
        form.isdeparts = _this.getSelectIdByList(_this.isdepartsparams);
        form.issuer = _this.getSelectIdByList(_this.issuerparams);
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        sharingsharinglist(form).then(function (res) {
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {

          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      dorschangefunc(){

      },
      // 新增
      newaddfunc(){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: newPlatformAnnounce, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "新增分享内容",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });

        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      
       // 详情
      opendetailfunc(item){
        let _this = this;
        let layerId = _this.$layer.iframe({
          content: {
            content: editorPlatformAnnounce, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','560px'],
          title: "分享内容修改 【"+item.name+"】",
          shadeClose: false,
          shade: true,//是否显示遮罩
          zIndex:19891110,
          cancel:()=>{//关闭事件

          }
        });

        let getLayerId = document.getElementById(layerId);
        let mygetLayerId = document.getElementById(layerId).getAttribute('id');
        document.getElementById(mygetLayerId+'_mask').style.height = 'calc(100% - 60px)';
        document.getElementById(mygetLayerId+'_mask').style.marginTop = '60px';
        let layerifranmedata = {thisactiveIndex: _this.$store.state.activeIndex.split('/')[2],childlayerid:mygetLayerId,thisrowid:'',oneORmore:1};
        _this.$store.commit('set_active_layerifranme',layerifranmedata);
      },
      // 部门下拉改变更新人员下拉
      departschangefunc(val){
        let _this = this;
        let id = '';
        if(val==1){
          id = _this.getSelectIdByList(_this.rdepartsparams);
        }else if(val == 2){
          id = _this.getSelectIdByList(_this.sdepartsparams);
        }else{
          id = _this.getSelectIdByList(_this.isdepartsparams);
        }
        if (id) {
          _this.$layer.loading({
            shade: true
          });
          let form = {id,flag:3,isSelect:1,showLeave:1};
          findUserByDepartId(form).then(function(res) {
            _this.$layer.closeAll('loading');
            if (res.status == 500) {
              return false;
            } else if (res.status == 0) {
              let data = res.data.user;
              let arr3 = [{id:-1,name:'全部',select:true}];
              data.forEach(item=>{
                let obj = {
                  id: item.id,
                  name: item.name,
                  stateUser:0,
                }
                if(item.paramName == '正式离职'){
                  obj.stateUser  = 1;
                }
                arr3.push(obj);
              });
              if(val==1){
                _this.rusersparams = arr3;
              }else if(val == 2){
                _this.susersparams = arr3;
              }else{
                _this.issuerparams = arr3;
              }
              
            } else if (res.status == 1) {
              let message = res.msg;
              _this.myAlert(message + "！");
            }
          });
        }
      },
      // 职位下拉改变人员
      staffchangefunc(){
        let _this = this;
        let id = _this.getSelectIdByList(_this.rstaffsparams);
        if (id) {
          _this.$layer.loading({
            shade: true
          });
          dutyperson(id).then(function(res) {
            _this.$layer.closeAll('loading');
            if (res.status == 500) {
              return false;
            } else if (res.status == 0) {
              let data = res.data.user;
              let arr = [{id:-1,name:'全部',select:true}];
              data.forEach(item=>{
                let obj = {
                  id: item.id,
                  name: item.name,
                  stateUser:0,
                }
                if(item.paramName == '正式离职'){
                  obj.stateUser  = 1;
                }
                arr.push(obj);
              });
              _this.rusersparams = arr;
              
            } else if (res.status == 1) {
              let message = res.msg;
              _this.myAlert(message + "！");
            }
          });
        }
      },
      getSelectIdByList(list) {
        let arr = [];
        list.forEach(function(item) {
          if (item.select) {
            arr.push(item.id);
          }
        });
        return arr.toString();
      },
      // 删除
      deletefunc(){

      },
      // 置顶
      toppingfunc(){

      },
      // 取消置顶
      canceltoppingfunc(){

      },
      //清空
      clearForm(){

      },
      // 搜索区展开折叠
      showSearch() {
        let rent = document.getElementById("follow-container");
        if (this.upAndDown == 1) {
          this.upAndDown = 2;
          document.getElementById("searchContent2").style.display = "none";
        } else {
          this.upAndDown = 1;
          document.getElementById("searchContent2").style.display = "block";
        }
      },
      //过滤方法
      filterData(){
        let select = this.multipleSelection.toString();
        if(select){
          let arr = [];
          this.tableData.forEach(function(item){
            if(select.indexOf(item.id) != -1){
              arr.push(item);
            }
          })
          this.currentNum = 0;
          this.tableData = arr;
        }else{
          this.myAlert('请选择需要过滤的数据!','dangerous-icon');
        }
      },
      // 退出
      tabRemove (targetName) {
        // 首页不可删除
        if (targetName == '/') {
          return;
        }
        this.$store.commit('delete_tabs', targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            this.$store.commit('set_active_index', this.options[this.options.length-1].path);
            this.$router.push({path: this.activeIndex});
          } else {
            this.$router.push({path: '/home/'});
          }
        }
      },
      // 快捷日期
      getQuickDate(value) {
        let time = quickDate.getTwoDayByDay(value);
        this.form.timeStart = time.startTime;
        this.form.timeEnd = time.endTime;
        if (value != 1) {
          this.timeDisabled = true;
        } else {
          this.timeDisabled = false;
        }
      },
    },
    mounted(){
      this.getParamsData();
    },
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-slider__button{
    width: 0px;
    height: 0px;
    /*border:1px solid #DCD9D3;*/
    border:none;
    border-radius: 0px;
  }
  /deep/ .el-slider__runway{
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
    height: 2px;
  }
  /deep/ .el-slider__bar{
    height: 2px;
    background-color: #b87264;
  }
  /deep/ .el-slider__button-wrapper{
    height: 10px;
    width: 10px;
    top: -4px;
  }
  /*/deep/ .thismytr{
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-image: url("../../../images/system/border.png")  2 repeat ;
  }*/
</style>
