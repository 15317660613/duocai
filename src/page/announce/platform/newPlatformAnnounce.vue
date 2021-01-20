<template>
  <div style="width: 100%;padding: 0px 10px;">
      <div class="pop-up" style="padding: 10px 10px 0px 10px;height: 510px;">
        <el-tabs type="border-card" v-model="getActiveName" @tab-click="changeTab">
          <el-tab-pane label="基本" name="base">
            <span slot="label">基本</span>

            <div class="pop-up-container" style="margin: 0px;height:440px;">
              <el-form ref="formsData"  :model="formbase" >
                <div class="clear m-t-5">
                  <div class="left" style="margin-left: 23px;">
                    <span class="des-word require-word">标题</span>
                  </div>
                  <div class="left p-l-5">
                    <el-form-item>
                      <el-input v-model.trim="formbase.title" style="width:340px;" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>

                  <div class="left m-l-15">
                    <span class="des-word require-word">类型</span>
                  </div>
                  <div class="left p-l-5">
                    <el-form-item>
                      <el-select v-model="formbase.type" style="width:90px;">
                        <el-option v-for="item in Shares" :label="item.name"  :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                  <div class="left m-l-15">
                    <span class="des-word">编号</span>
                  </div>
                  <div class="left p-l-5">
                    <el-form-item>
                      <el-input v-model.trim="formbase.number" style="width:110px;" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="clear m-t-5">
                  <div class="left m-l-15">
                    <span class="des-word require-word">内容</span>
                  </div>
                  <div class="left m-l-5">
                    <el-form-item>
                      <div class="left m-l-5 pop-up-container" style="width: 666px;height: 290px;">
                        <div style="width: 100%;height: 100%;display: flex;align-items: center;overflow: hidden;">
                          <div v-if="trueOffalse" style="margin: auto;cursor: pointer;" >
                            <el-upload
                              class="upload-demo"
                              action="https://jsonplaceholder.typicode.com/posts/"
                              :on-change="filechangefunc"
                              :show-file-list="false"
                              :auto-upload="false"
                              :file-list="fileListdata"
                              >
                              <i class="fifteen-four-icon"></i>
                              <div class="el-upload__text" style="color: #336699;">上传文件</div> 
                            </el-upload>
                          </div> 
                          <div v-if="!trueOffalse">
                            <video style="width: 100%;" class="video" ref="video" :src="initVideo.url" @pause="handPlay(2,2)" 
                              @play="handPlay(2,1)" @loadedmetadata="getAudioLength(2)" @timeupdate="videoTimeUpdate">
                            </video>
                          </div>
                        </div>
                          
                                       
                      </div>
                    </el-form-item>
                  </div>
                </div>
                <div class="clear" style="text-align: center;height: 20px;">
                    <span>{{filename}}</span>
                </div>
                <div class="clear m-t-5" style="text-align: center;">
                  <div class="left m-l-70">
                    <div class="left m-r-10" style="margin-top: 6px;">
                      <i v-if="!initVideo.play" class="fifteen-two-icon" @click="clickplayfunc"></i>
                      <i v-if="initVideo.play" class="fifteen-three-icon" @click="clickplayfunc"></i>
                    </div>
                    
                    <div class="left" style="width: 8px;height: 8px;background-color: #b87264;margin-top: 13px;border-radius: 50%;">
                      
                    </div>
                    <div  class="video_control left" style="width: 420px;">
                      <div class="progress" style="position: relative;">
                        <div class="clear">
                          <div class="left" style="width: 420px;">
                            <el-slider class="commonSlider" :show-tooltip="false" v-model="initVideo.currentTime" :max="initVideo.videoLength" @change="changeVideoTime1" @input="changeVideoTime2">
                            </el-slider>
                          </div>
                        </div>
                        <div id="detailtimeline" class="time" style="position: absolute;border:1px solid #b87264;border-radius: 10px;padding: 0px 5px;background-color: #DCD9D3;left: 0px;top:7px;width: 105px;text-align: center;">
                          <span>{{initVideo.mycurrentTime}}</span>
                          <span style="margin: 0px 1px;">/</span>
                          <span>{{initVideo.myvideoLength}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="left" style="width: 105px;background-color: #E4E7ED;height: 2px;margin-top: 16px;border-top-right-radius: 3px;border-bottom-right-radius: 3px;">
                      
                    </div>
                    <div v-if="initVideo.mycurrentTime==initVideo.myvideoLength" class="left" style="width: 8px;height: 8px;background-color: #b87264;margin-top: 13px;border-radius: 50%;">
                      
                    </div>
                    <div v-if="initVideo.mycurrentTime!=initVideo.myvideoLength" class="left" style="width: 8px;height: 8px;background-color: #eeeeee;margin-top: 13px;border-radius: 50%;">
                      
                    </div>
                  </div>
                  <div class="left">
                    <i class="fourteen-fifteen-icon m-l-20 m-t-5" title="全屏" @click="fullScreenfunc"></i>
                  </div>
                  <div class="left">
                    <i class="fourteen-fourteen-icon m-l-20 m-t-5" title="删除文件" @click="deletefilesfunc"></i>
                  </div>
                </div>
                <div class="clear m-t-5">
                  <div class="left m-l-15">
                    <span class="des-word require-word">主讲人</span>
                  </div>
                  <div class="left m-l-5">
                    <el-form-item>
                      <el-select v-model="formbase.inex"  style="width:60px;">
                        <el-option v-for="item in inexparams" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div v-if="formbase.inex==1" class="left p-l-2">
                    <el-form-item  label-width="0">
                      <el-select  style="width:100px;"  v-model="formbase.sdepart" @change="departschangefunc(1)">
                        <el-option  v-for="item in sdepartparams"  :label="item.name" :value="item.id">
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div v-if="formbase.inex==1" class="left p-l-2">
                    <el-form-item  label-width="0">
                      <el-select  style="width:100px;"  v-model="formbase.speaker">
                        <el-option v-for="item in speakerparams" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"  ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                  <div v-if="formbase.inex==2" class="left p-l-2">
                    <el-form-item>
                      <el-input v-model.trim="formbase.speaker" style="width:202px;" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>

                  <div class="left m-l-15">
                    <span class="des-word">发布人</span>
                  </div>
                  <div class="left p-l-2">

                    <el-form-item  label-width="0">
                      <el-select  style="width:100px;"  v-model="formbase.idepart" @change="departschangefunc(2)">
                        <el-option  v-for="item in idepartparams"  :label="item.name" :value="item.id">
                          <span test :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" >
                            <span v-if="item.state=='关闭'" style="color: #999;">{{item.name}}</span>
                            <span v-if="item.state=='常态'">{{item.name}}</span>
                          </span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="left p-l-2">
                    <el-form-item  label-width="0">
                      <el-select  style="width:100px;"  v-model="formbase.issuer">
                        <el-option v-for="item in issuerparams" :label="item.name" :value="item.id" :class="{'leave-user':item.stateUser == 1}"  ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                  <div class="left m-l-15">
                    <span class="des-word">发布日</span>
                  </div>
                  <div class="left p-l-2">
                    <el-form-item>
                      <el-date-picker
                        type="date" 
                        value-format="yyyy-MM-dd"
                        v-model="formbase.pubtime"
                        style="width: 100px;"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
                
              </el-form>
            </div>
            <div style="margin-top:5px">
              <el-checkbox class="left m-l-30 m-r-5" v-model="formbase.issue">发布</el-checkbox>
              <el-checkbox class="left" v-model="formbase.top">置顶</el-checkbox>
              <span
                class="right save-cancel-btn"
                style="margin-right:11px;padding: 2.4px 32px;"
                @click="cancelData"
              >取 消</span>
              <span
                class="right save-cancel-btn"
                style="padding: 2.4px 32px;"
                type="primary"
                @click="saveFormData"
              >保 存</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="接收人" name="receiver">
            <span slot="label">接收人</span>
            <div class="pop-up-container" style="height:440px;overflow-y:auto;overflow-x:hidden;position: relative;margin: 0px;" >
              <el-form ref="formsData"  :model="formreceiver" >
                <div class="clear" >
                  <div class="left center-fundation"  >
                    <div class="clear" >
                      <div class="left p-l-15 m-t-3">
                        <el-form-item>
                          <span v-if="activename==1" style="color: #336699;cursor: pointer;font-weight: bold;" @click="changeactivename">部门</span>
                          <span v-if="activename==2" style="color: #333333;cursor: pointer;font-weight: bold;" @click="changeactivename">部门</span>
                          <span>/</span>
                          <span v-if="activename==1" style="color: #333333;cursor: pointer;font-weight: bold;" @click="changeactivename">职位</span>
                          <span v-if="activename==2" style="color: #336699;cursor: pointer;font-weight: bold;" @click="changeactivename">职位</span>
                        </el-form-item>
                      </div>
                      <div class="left" >
                        <el-form-item  prop="projectName" style="height: 30px;margin: 3px 0 0 30px;">
                          <el-input class="specialinput" style="width: 120px;" v-model.trim="formIM.name"  maxlength="10" :placeholder="nametype" :title="nametype"   autocomplete="off" @input="mydebounce(vm)"></el-input>
                        </el-form-item>
                      </div>
                    </div>


                  </div>
                  </div>
                <div class="break" >
                </div>
                <!-- 部门树状图 -->
                <div v-show="activename==1" class="search-container left" style="height:420px;overflow:auto;width:220px;margin:0;border-left:none;border-bottom:none;padding:12px;border-top:none;">
                  <el-tree
                    :data="departtreeData"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :check-on-click-node="true"
                    :check-strictly="true"
                    @check="getpersonByDepartId"
                    :default-expanded-keys="[2, 3]"
                    :default-checked-keys="[5]"
                    :props="defaultProps"
                    style="background:#DCD9D3"
                    ></el-tree>
                </div>
                <!-- 职位树状图 -->
                <div v-show="activename==2" class="search-container left" style="height:420px;overflow:auto;width:220px;margin:0;border-left:none;border-bottom:none;padding:12px;border-top:none;">
                  <el-tree
                    :data="stafftreeData"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :check-on-click-node="true"
                    :check-strictly="true"
                    @check="getpersonByStaffId"
                    :default-expanded-keys="[2, 3]"
                    :default-checked-keys="[5]"
                    :props="defaultProps"
                    style="background:#DCD9D3"
                    ></el-tree>
                </div>
                <!-- 部门的人员列表 -->
                <div class="left" v-show="activename==1" style="position: relative;">
                  <div class="left content">  
                    <div class="left" v-for="(item,index) in departtableData" :key="item.id" style="width: 100%;">
                      <p style="padding-top:10px;color:#999999;padding-left: 10px;">{{item.title}}</p>
                      <div class="clear">
                        <el-checkbox-group v-model="chooseDepartPersonIds">
                          <div v-for="(i,cindex) in item.person">
                            <!-- 已经选中的 -->
                            <div class="left" v-if="i.yesORno=='yes'">
                              <el-checkbox 
                                disabled
                                :checked=true
                                :label="i.id" 
                                :key="i.id"
                                @change="checkbox(i.id,i.checked,index,cindex)"
                              >
                                <span  style="color: #00cc66;">{{i.name}}</span>
                              </el-checkbox>
                            </div>
                            <!-- 离职的 -->
                            <div class="left" v-else-if="i.state=='正式离职'" >
                              <el-checkbox 
                                :label="i.id" 
                                :key="i.id"
                                @change="checkbox(i.id,i.checked,index,cindex)"
                              >
                                <span  style="color: #999999;">{{i.name}}</span>
                            </el-checkbox>
                            </div>
                            <div class="left" v-else>
                              <el-checkbox
                                :label="i.id" 
                                :key="i.id"
                                @change="checkbox(i.id,i.checked,index,cindex)"
                              >
                                <span  style="color: #333333;">{{i.name}}</span>
                              </el-checkbox>
                            </div>
                          </div>
                        </el-checkbox-group>
                      </div>
                      <div class="break"></div>
                    </div>
                    
                  </div>
                  
                </div>
                <!-- 职位的人员列表 -->
                <div class="left" v-show="activename==2" style="position: relative;">
                  <div class="left content">  
                    <div class="left" v-for="(item,index) in stafftableData" :key="item.id" style="width: 100%;">
                      <p style="padding-top:10px;color:#999999;padding-left: 10px;">{{item.title}}</p>
                      <div class="clear">
                        <el-checkbox-group v-model="chooseDepartPersonIds">
                          <div v-for="(i,cindex) in item.person">
                            <!-- 已经选中的 -->
                            <div class="left" v-if="i.yesORno=='yes'">
                              <el-checkbox 
                                disabled
                                :checked=true
                                :label="i.id" 
                                :key="i.id"
                                @change="checkbox(i.id,i.checked,index,cindex)"
                              >
                                <span  style="color: #00cc66;">{{i.name}}</span>
                              </el-checkbox>
                            </div>
                            <!-- 离职的 -->
                            <div class="left" v-else-if="i.state=='正式离职'" >
                              <el-checkbox 
                                :label="i.id" 
                                :key="i.id"
                                @change="checkbox(i.id,i.checked,index,cindex)"
                              >
                                <span  style="color: #999999;">{{i.name}}</span>
                            </el-checkbox>
                            </div>
                            <div class="left" v-else>
                              <el-checkbox
                                :label="i.id" 
                                :key="i.id"
                                @change="checkbox(i.id,i.checked,index,cindex)"
                              >
                                <span  style="color: #333333;">{{i.name}}</span>
                              </el-checkbox>
                            </div>
                          </div>
                        </el-checkbox-group>
                      </div>
                      <div class="break"></div>
                    </div>
                    
                  </div>
                  
                </div>

              </el-form>
              <div style="width: 490px;position: absolute;bottom: 0px;right:0;">
                <div style="height: 20px;line-height: 20px;">
                  <div style="width: 12px;height: 12px;background: rgba(0, 204, 102, 1);margin-right: 5px;display: inline-block;"></div>
                  <span>已经是此制度公告的接收人</span>
                </div>
                <div style="height: 20px;line-height: 20px;">
                  <div style="width: 12px;height: 12px;background: rgba(153, 153, 153, 1);margin-right: 5px;display: inline-block;"></div>
                  <span>正式离职</span>
                </div>
                <div style="height: 20px;line-height: 20px;">
                  <div style="width: 12px;height: 12px;background: rgba(51, 51, 51, 1);margin-right: 5px;display: inline-block;"></div>
                  <span>常态在职，薪假在职，停薪在职，申离在职</span> 
                  <span v-show="activename==1" style="float: right;margin-right: 15px;">总共 : {{chooseDepartPersonIds.length}} 人</span>
                  <span v-show="activename==2" style="float: right;margin-right: 15px;">总共 : {{chooseStaffPersonIds.length}} 人</span>
                </div>
              </div>
            </div>
            <div style="margin-top:5px">
              <span
                class="right save-cancel-btn"
                style="margin-right:11px;padding: 2.4px 32px;"
                @click="clearFormData"
              >取 消</span>
              <span
                class="right save-cancel-btn"
                style="padding: 2.4px 32px;"
                type="primary"
                @click="saveFormData"
              >保 存</span>
              <el-checkbox v-show="activename==1" class="right" style="margin:0px 30px 0 0;"   v-model="checkAll1" @change="chooseAllPerssonDepart">全选</el-checkbox>
              <el-checkbox v-show="activename==2" class="right" style="margin:0px 30px 0 0;"   v-model="checkAll2" @change="chooseAllPerssonStaff">全选</el-checkbox>
            </div>
          </el-tab-pane>
          
        </el-tabs>
        

        
      </div>

  </div>
</template>

<script>
import { odeparttree,findUserByDepartId,dutytree,dutyperson } from "../../../service/organizeDate";
import CheckSelectSpecial from '../../../components/checkSpecial'
import CheckSelect from "../../../components/check";
import { debounce } from "../../../utils/myself";
import {onleyInsert,allInsert} from "../../../service/attendData";
import mymp4 from "../../../images/chapter_00.mp4";
import {sharinggetNparam,sharingSharingUpOrAdd,staffFindStaffByLike} from '../../../service/platformAnnounce';

export default {
  props:['layerid'],
  data() {
    return {
      getActiveName:'base',
      activename:1,
      nametype:'部门名称',
      activeTag1:true,
      activeTag2:false,
      activeName1:true,
      activeName2:false,
      vm: this,
      checkAll1: false,
      checkAll2: false,
      departtreeData:[],
      stafftreeData:[],
      Arrlength1:[],
      Arrlength2:[],
      departName: "",
      lastTime:0,
      defaultProps: {
        children: "children",
        label: "label"
      },
      chooseDepartPersonIds:[],
      chooseStaffPersonIds:[],
      formIM:{
        state:"常态",
        name:'',
        type:'主'
      },
      formbase:{
        title:'',
        type:'',
        number:'',
        inex:1,
        pubtime:'',
        speaker:'',
        issue:false,
        issuer:'',
        top:false,
      },
      filename:'',
      files:[],
      formreceiver:{
        time:'',
        userIds:'',
      },
      userId:[],
      departtableData:[],
      stafftableData:[],
      myhaveUserIds:[],
      Shares:[],
      inexparams:[
        {id:1,name:'内部',select:false},
        {id:2,name:'外部',select:false},
      ],
      sdepart:'sdepart',
      speaker:'speaker',
      idepart:'idepart',
      issuer:'issuer',
      sdepartparams:[],
      speakerparams:[],
      idepartparams:[],
      issuerparams:[],
      files:'',
      trueOffalse:true,
      fileListdata:[],
      //视频
      oldinitVideo: {
        play: false,//播放还是暂停 tru播放中
        videoLength: 0,//时长
        myvideoLength: '00:00',//时长
        url: '',//视频课件Url
        currentTime: 0,//当前播放时间
        lastTime: null,//标记时间戳
        name: "",
        mycurrentTime:'00:00',
      },
      //音频
      oldinitAudio: {
        play: false,//播放还是暂停 true播放中
        audioLength: 0,//audio时长
        myaudioLength: '00:00',//时长
        url: "",//音频课件url
        currentTime: 0,//当前播放时间
        lastTime: null,//标记时间戳
        name: "",
        mycurrentTime:'00:00',
      },
      //视频
      initVideo: {
        play: false,//播放还是暂停 tru播放中
        videoLength: 0,//时长
        myvideoLength: '00:00',//时长
        url: mymp4,//视频课件Url
        currentTime: 0,//当前播放时间
        lastTime: null,//标记时间戳
        name: "",
        mycurrentTime:'00:00',
      },
      //音频
      initAudio: {
        play: false,//播放还是暂停 true播放中
        audioLength: 0,//audio时长
        myaudioLength: '00:00',//时长
        url: "",//音频课件url
        currentTime: 0,//当前播放时间
        lastTime: null,//标记时间戳
        name: "",
        mycurrentTime:'00:00',
      },
    };
  },
  components: {
    CheckSelect,
    CheckSelectSpecial
  },
  methods: {
    typefunc(){
      console.log(this.formbase.type);
    },
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
          _this.Shares = data.Shares;
          _this.Shares.forEach((item,index)=>{
            if(index==0){
              _this.formbase.type = item.id;
            }
          });

          let arr1  = [{id:'-1',name:'   ',select:true}];
          let arr2  = [];
          
          data.departTree.forEach(item=>{
            arr1.push({
              id:item.id,
              name:item.label.replace(/&nbsp;/g, ""),
              select:false,
              state:item.state,
              level:item.level,
            })
            arr2.push({
              id:item.id,
              name:item.label.replace(/&nbsp;/g, ""),
              select:false,
              state:item.state,
              level:item.level,
            })
          })
          _this.sdepartparams = arr1;
          _this.idepartparams = arr2;

        } else if (res.status == 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      });
    },
    departschangefunc(value){
      let _this = this;
      let id = '';
      if(value==1){
        id = _this.formbase.sdepart;
      }else{
        id = _this.formbase.idepart;
      }
      if(id) {
        let form = {id,flag:3,isSelect:1,showLeave:1};
        findUserByDepartId(form).then(function (res) {
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            let data =res.data;
            let arr1  = [{id:'-1',name:'   ',select:true}];
            let arr2  = [];
            if(value==1){
              data.user.forEach(item=>{
                if(item.paramName == '正式离职'){
                  arr1.push({
                    id: item.id,
                    name: item.name,
                    stateUser:1,
                  })
                }else{
                  arr1.push({
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  })
                }
              })
              _this.speakerparams = arr1; 
            }

            if(value==2){
              data.user.forEach(item=>{
                if(item.paramName == '正式离职'){
                  arr2.push({
                    id: item.id,
                    name: item.name,
                    stateUser:1,
                  })
                }else{
                  arr2.push({
                    id: item.id,
                    name: item.name,
                    stateUser:0,
                  })
                }
              })
              _this.issuerparams = arr2; 
            }

          } else if (res.status == 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        })
      }else{
        _this.departPersonDataone =  [];
        _this.form.administrator = ' ';
      }
    },
    changeactivename(){
      if(this.activename==1){
        this.activename = 2;
        this.nametype = '职位名称';
        if(!this.activeName2){
          this.activeName2 = true;
          this.getStaffTreeData();
        } 
      }else{
        this.activename = 1;
        this.nametype = '部门名称';
      }
    },
    filechangefunc(file,fileList){
      // let typename = '';
      // this.Shares.forEach(item=>{
      //   if(item.id==this.formbase.type){
      //     typename = item.name;
      //   }
      // });
      // console.log(typename);
      // // 视频类型
      // const videotype = file.raw.type === "video/mp4" || file.raw.type === "video/rmvb" || file.raw.type === "video/rm" || file.raw.type === "video/3GP" || file.raw.type === "video/FLV" || file.raw.type === "video/mov" || file.raw.type === "video/avi" || file.raw.type === "video/ts";
      // // 音频类型
      // const audiotype = file.raw.type === "audio/mp3" || file.raw.type === "audio/MP3 PRO" || file.raw.type === "audio/MPEG" || file.raw.type === "audio/WMA" || file.raw.type === "audio/AAC" || file.raw.type === "audio/RealAudio";
      // if(typename.indexOf('音频')!=-1){
      //   if(!audiotype){
      //     this.deletefilesfunc();
      //     this.myAlert("上传文件与类型不符！");
      //     return false;
      //   }
      // };
      // if(typename.indexOf('视频')!=-1){
      //   if(!videotype){

      //     this.deletefilesfunc();
      //     this.myAlert("上传文件与类型不符！");
      //     return false;
      //   }
      // }


      this.filename = file.name;
      let myfils = [];
      myfils.push(file.raw);
      this.files =myfils;
      this.trueOffalse = false;
      this.getAudioLength();
      
    },
    formatSeconds(value) {
    　　let result = parseInt(value)
    　　let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    　　let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    　　result = `${m}:${s}`;
    　　return result;
    },
    clickplayfunc(item){
      this.playVideo(item);
      this.formatSeconds();
    },
    playVideo() {//播放视频
      if (this.initVideo.play) {
        this.$refs.video.pause();
      } else {
        Math.abs(this.initVideo.currentTime - this.$refs.video.currentTime) > 2 ? this.initVideo.currentTime =  this.$refs.video.currentTime: '';
        Math.abs(this.initVideo.currentTime - this.$refs.video.currentTime) > 2 ? this.initVideo.mycurrentTime =  this.formatSeconds(this.$refs.video.currentTime): '';
        this.$refs.video.play();
        this.$refs.video.muted = false
      }
    },
    videoTimeUpdate() {//更新视频时间。节流，每秒触发一次
      let nowTime = Date.now()
      let gapTime = 50;
      if (!this.initVideo.lastTime || nowTime - this.initVideo.lastTime > gapTime) {
        if (this.$refs.video) {
            let time = this.$refs.video.currentTime;
            this.initVideo.currentTime = time;
            this.initVideo.mycurrentTime = this.formatSeconds(time);
        }
        this.initVideo.lastTime = nowTime;
        let a = this.initVideo.currentTime;
        let b = this.initVideo.videoLength;
        let c = (a/b)*100;
        // console.log(a,b,c);
        document.getElementById("detailtimeline").style.left = c+"%";
      }
    },
    changeVideoTime1(val) {//改变视频时间
      if (this.$refs.video) {
        this.$refs.video.currentTime = val;
      }
    },
    changeVideoTime2(val) {//改变视频时间
      if (this.$refs.video) {
        let a = val;
        let b = this.initVideo.videoLength;
        let c = (a/b)*100;
        document.getElementById("detailtimeline").style.left = c+"%";
      }
    },
    getAudioLength(type) {//获取音视频时长 1音频 2视频
      if (type == 1) {
        this.initAudio.audioLength = this.$refs.audio[0].duration;
      }
      if (type == 2) {
        this.initVideo.videoLength =  this.$refs.video.duration;
        this.initVideo.myvideoLength =  this.formatSeconds(Math.floor(this.$refs.video.duration));
      }
    },
    handPlay(type, status) {//音视频播放暂停 type:1 音频 2视频 status 1播放 2暂停
      if (type == 1) {
        status == 1 ? this.initAudio.play = true : this.initAudio.play = false;
      } else {
        status == 1 ? this.initVideo.play = true : this.initVideo.play = false;
      }
    },
    cancelData(){

    },
    deletefilesfunc(){
      this.filename = '';
      this.trueOffalse = true;
      this.initVideo = this.oldinitVideo;
    },
    fullScreenfunc(){

    },
    changeTab(){
      if(this.getActiveName=="receiver"&&!this.activeTag2){
        this.getDepartTreeData();
        this.activeTag2=true;
      };
    },
    // datechangefunc(){
    //   this.$refs.tree.setCheckedKeys([]);
    //   this.departtableData = [];
    //   this.chooseDepartPersonIds = [];
    // },
    // 单选
    checkbox(val,checked,index,cindex){
      if(this.activename==1){
        if(!checked){
          if(this.Arrlength1.length == this.chooseDepartPersonIds.length){
            this.checkAll1 = true;
          }else{
            this.checkAll1 = false;
          }
          this.departtableData[index].person[cindex].checked=true;
          
        }else{
          this.checkAll1 = false;
          this.departtableData[index].person[cindex].checked=false;

          for(var i=0; i < this.chooseDepartPersonIds.length; i++){
            if(this.chooseDepartPersonIds[i] == val){ 
              let num = this.chooseDepartPersonIds.splice( i, 1 ); 
            }
          }
        }
      }else{
        console.log(val,checked,index,cindex);
        if(!checked){
          if(this.Arrlength2.length == this.chooseStaffPersonIds.length){
            this.checkAll2 = true;
          }else{
            this.checkAll2 = false;
          }
          this.stafftableData[index].person[cindex].checked=true;
          
        }else{
          this.checkAll2 = false;
          this.stafftableData[index].person[cindex].checked=false;

          for(var i=0; i < this.chooseStaffPersonIds.length; i++){
            if(this.chooseStaffPersonIds[i] == val){ 
              let num = this.chooseStaffPersonIds.splice( i, 1 ); 
            }
          }
        }
      }
      
    },
    // 全选部门
    chooseAllPerssonDepart(){
      if(this.checkAll1){
        this.chooseDepartPersonIds = [];
        this.checkAll1=true;
        this.departtableData.forEach(item=>{
          item.person.forEach(el=>{
            this.chooseDepartPersonIds.push(el.id);
            el.checked = true;
          })
        })
      }else{
        this.chooseDepartPersonIds = [];
        this.checkAll1=true;
        this.checkAll1=false;
        this.departtableData.forEach(item=>{
          item.person.forEach(el=>{
            if(this.myhaveUserIds.indexOf(el.id)!=-1){
              el.checked = true;
              this.chooseDepartPersonIds.push(el.id);
            }else{
              el.checked = false;
            }
            
          })
        })
      }
    },
    // 全选职位
    chooseAllPerssonStaff(){
      if(this.checkAll2){
        this.chooseStaffPersonIds = [];
        this.checkAll2=true;
        this.stafftableData.forEach(item=>{
          item.person.forEach(el=>{
            this.chooseStaffPersonIds.push(el.id);
            el.checked = true;
          })
        })
      }else{
        this.chooseStaffPersonIds = [];
        this.checkAll2=true;
        this.checkAll2=false;
        this.stafftableData.forEach(item=>{
          item.person.forEach(el=>{
            if(this.myhaveUserIds.indexOf(el.id)!=-1){
              el.checked = true;
              this.chooseStaffPersonIds.push(el.id);
            }else{
              el.checked = false;
            }
            
          })
        })
      }
    },
    mydebounce: debounce((vm) => {
      if(this.activename==1){
        let _this = vm;
        _this.$refs.tree.setCheckedKeys([]);
        _this.departtableData = [];
        _this.chooseDepartPersonIds = [];
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        odeparttree("常态","主",'',_this.formIM.name).then( (res) =>{
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status === 0) {
            if(res.data){
              res.data.forEach(item=>{
                item.label = item.label.replace(/&nbsp;/g, "");
              })
            }
            _this.departtreeData= res.data;
          } else if (res.status === 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        })
      }else{
        let _this = vm;
        _this.$refs.tree.setCheckedKeys([]);
        _this.departtableData = [];
        _this.chooseStaffPersonIds = [];
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        staffFindStaffByLike(_this.formIM.name).then( (res) =>{
          _this.$layer.closeAll("loading");
          if (res.status == 500) {
            return false;
          } else if (res.status === 0) {
            if(res.data){
              res.data.forEach(item=>{
                item.label = item.label.replace(/&nbsp;/g, "");
              })
            }
            _this.departtreeData= res.data;
          } else if (res.status === 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
        })
      }
      
      },500,true
    ),
    //获取部门树状数据
    getDepartTreeData(){
      let now = new Date();

      this.lastTime = now;
      this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      odeparttree("常态","主",'',this.formIM.name).then( (res) =>{
        this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          this.departtreeData=res.data;
        } else if (res.status === 1) {
          let message = res.msg;
          this.myAlert(message + "！");
        }
      })
    },
    //获取职位树状数据
    getStaffTreeData(){
      let _this=this;
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });

      dutytree().then(function (res) {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          _this.stafftreeData=res.data;
        } else if (res.status === 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      })
    },
    //根据部门id获取人员
    getpersonByDepartId(val,ss){
      let _this = this;
      let id="";
      if(val.id){
       id=val.id
      }else{
        id=val
      }
      let dataform = {
        id:id,
      }
      let filterArr = _this.departtableData.filter((item)=>item.departmentId!=val.id);
      if(filterArr.length==_this.departtableData.length){
        
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        findUserByDepartId(dataform).then( (res)=> {
          _this.$layer.closeAll('loading');
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            console.log(res.data);
            if(res.data.user){
              let nameArr=[];
              res.data.user.forEach(item1=>{
                _this.Arrlength1.push(item1.id);
                // if(res.data.haveUserIds.indexOf(item1.id)==-1){
                //   nameArr.push({
                //     name:item1.name,
                //     id:item1.id,
                //     checked:false,
                //     state:item1.paramName,
                //     yesORno:'no'
                //   });
                // }else{
                  nameArr.push({
                    name:item1.name,
                    id:item1.id,
                    checked:false,
                    state:item1.paramName,
                    yesORno:'no'
                  });
                // }
              });
              
              _this.departtableData.push({
                title:res.data.user[0].departName,
                person:nameArr,
                departmentId:val.id
              })
              console.log(_this.departtableData);
            }
          } else if (res.status === 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
          _this.checkAll1 = false;
          
        })

      }else{
        console.log('222');
        _this.departtableData = filterArr;
        if(_this.checkAll1 == true){
          _this.checkAll1 = true;
          _this.Arrlength1 = [];
          _this.chooseDepartPersonIds = [];
          _this.departtableData.forEach(item=>{
            item.person.forEach(el=>{
              _this.chooseDepartPersonIds.push(el.id);
              _this.Arrlength1.push(el.id);
            })
          })
        }else{
          _this.checkAll1 = false;
          _this.Arrlength1 = [];
          _this.departtableData.forEach(item=>{
            item.person.forEach(el=>{
              _this.Arrlength1.push(el.id);
            })
          })
        }
        console.log(_this.Arrlength1.length,_this.chooseDepartPersonIds.length);
      }
    },
    // 根据职位id获取人员
    getpersonByStaffId(val,ss){
      let _this = this;
      let id="";
      if(val.id){
       id=val.id
      }else{
        id=val
      }
      let dataform = {
        id:id,
      }
      let filterArr = _this.stafftableData.filter((item)=>item.departmentId!=val.id);
      if(filterArr.length==_this.stafftableData.length){
        
        _this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        dutyperson(id).then( (res)=> {
          _this.$layer.closeAll('loading');
          if (res.status == 500) {
            return false;
          } else if (res.status == 0) {
            console.log(res.data);
            if(res.data.user){
              let nameArr=[];
              res.data.user.forEach(item1=>{
                _this.Arrlength2.push(item1.id);
                // if(res.data.haveUserIds.indexOf(item1.id)==-1){
                //   nameArr.push({
                //     name:item1.name,
                //     id:item1.id,
                //     checked:false,
                //     state:item1.paramName,
                //     yesORno:'no'
                //   });
                // }else{
                  nameArr.push({
                    name:item1.name,
                    id:item1.id,
                    checked:false,
                    state:item1.paramName,
                    yesORno:'no'
                  });
                // }
              });
              
              _this.stafftableData.push({
                title:res.data.user[0].departName,
                person:nameArr,
                departmentId:val.id
              })
              console.log(_this.departtableData);
            }
          } else if (res.status === 1) {
            let message = res.msg;
            _this.myAlert(message + "！");
          }
          _this.checkAll2 = false;
          
        })

      }else{
        console.log('222');
        _this.stafftableData = filterArr;
        if(_this.checkAll2 == true){
          _this.checkAll2 = true;
          _this.Arrlength2 = [];
          _this.chooseStaffPersonIds = [];
          _this.stafftableData.forEach(item=>{
            item.person.forEach(el=>{
              _this.chooseStaffPersonIds.push(el.id);
              _this.Arrlength2.push(el.id);
            })
          })
        }else{
          _this.checkAll2 = false;
          _this.Arrlength2 = [];
          _this.stafftableData.forEach(item=>{
            item.person.forEach(el=>{
              _this.Arrlength2.push(el.id);
            })
          })
        }
      }
    },

    saveFormData(){
      let _this = this;
      if(_this.formbase.title==''){
        _this.myAlert("标题不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.formbase.type==''){
        _this.myAlert("类型不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.formbase.file==''){
        _this.myAlert("内容文件不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.formbase.speaker==''){
        _this.myAlert("主讲人不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.formbase.issuer==''){
        _this.myAlert("发布人不能为空!", "dangerous-icon");
        return false;
      };
      if(_this.formbase.issue){
        if(_this.formbase.pubtime==''){
          _this.myAlert("发布时间不能为空!", "dangerous-icon");
          return false;
        }
      };
      _this.$layer.loading({
        shade: true,//是否显示遮罩
      });
      let formbase = JSON.parse(JSON.stringify(_this.formbase));
      formbase.files = _this.files;

      let mythisids = [];
      _this.chooseDepartPersonIds.forEach(item=>{
        mythisids.push(item)
      });
      for (let i = 0; i < _this.myhaveUserIds.length; i++) {
        for (let j = 0; j < mythisids.length; j++) {
           if(_this.myhaveUserIds[i] == mythisids[j]){
              mythisids.splice(j,1);
            }
        }
      }
      formbase.reusers = mythisids.toString();
      sharingSharingUpOrAdd(formbase).then(res => {
        _this.$layer.closeAll("loading");
        if (res.status == 500) {
          return false;
        } else if (res.status === 0) {
          _this.myAlert("分享保存成功！", "success-icon")
            .then(res => {
              _this.$parent.searchTableData();
              _this.clearFormData();
            })
            .catch(err => {});
        } else if (res.status === 1) {
          let message = res.msg;
          _this.myAlert(message + "！");
        }
      })
    },
    clearFormData() {
      this.$layer.close(this.layerid);
    }
  },
  mounted() {
   this.getParamsData();
  },
  beforeDestroy(){
    let _this = this;
    _this.$store.state.layerifranme.forEach((item,index)=>{
      if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
        _this.$store.state.layerifranme.splice(index,1);
      }
    }); 
  },
};
</script>
<style lang="scss" scoped>
  /deep/ .el-checkbox__label {
      font-size: 12px;
      margin-right:20px;
  }
  /deep/ .el-upload-list__item .el-progress{
    display: none;
  }
  /deep/ .el-upload-list.el-upload-list--text li{
    display: none;
  }
  .content {
    height:300px;
    width: 500px;
    position: relative;
    padding: 0px 20px 20px 20px;
    overflow-y: auto;
  }
  /deep/ .el-upload-dragger{
    background-color: #DCD9D3;
    border:none !important; 
  }
  /deep/ .el-upload-dragger:hover{
    border:none !important;
  }


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
</style>