<template>
  <el-dialog id="sts"
             v-dialogDrag
             :close-on-click-modal="false"
             style=" height:100%"
             title="合并街镇"
             :visible.sync="MergeVisible"
             width="600px"
  >
    <div class="pop-up" >
        <div class="pop-up-container clear" style="height: 362px;">
            <div class="clear left" style="width:200px;padding-left:15px;" >
              <div class="clear " style="padding:10px 0;"   >
                <div class="left" >
                     <el-input   v-model="ares1" disabled="true" style="width:60px;" ></el-input>
                </div>  
                 <div class="left padding-l-5" >
                     <el-input   v-model="ares2" disabled="true" style="width:100px;" ></el-input>
                </div> 
              </div>
              <div class="clear border list-content" style="height:280px;" >
                <el-table :data="leftData"
                  empty-text=" "
                  :header-cell-style="{background:'#f2f2f2'}"
                  ref="singleTable"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  height="276"
                  border
                  :default-sort = "{prop: 'date', order: 'descending'}">
                  <el-table-column
                    prop="no"
                    label="序号"
                    align='center'
                    width="50px"
                    sortable="true"
                  >
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    prop="label"
                    label="街镇"
                    align='center'
                    width="105"
                    sortable="true"
                  >
                    <template slot-scope="scope">
                      <div style="text-algin:center;cursor:pointer;" @click="colight1(scope.$index, scope.row)" >
                        {{ scope.row.label }}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>    
            </div>
            <div class="clear left" style="padding:0 15px;" >
              <div  @click="beMergeStreet"  style="margin:85px 0 20px 0;"><i class="youjian"></i></div>
              <div  @click="backBeMergeStreet" > <i class="zuojian"></i></div>
              <div  @click="mergeStreet" style="margin:100px 0 20px 0;" ><i class="youjian"></i></div>
              <div  @click="backMergeStreet" > <i class="zuojian"></i></div>
            </div> 
            <div class=" left" >
              <div style="padding:8px 0;line-height:26px;">
                <span>被合并的街镇:</span>
              </div>
              <div class="clear border list-content" style="height:150px;" >
                <el-table :data="rightDateon"
                  ref="sinTable"
                  empty-text=" "
                  :header-cell-style="{background:'#f2f2f2'}"
                  height="146"
                  highlight-current-row
                  @current-change="handleCurrentChange1"
                  border
                  :default-sort = "{prop: 'date', order: 'descending'}">
                  <el-table-column
                    prop="no"
                    label="序号"
                    align='center'
                    width="50px"
                    sortable="true"
                  >
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    prop="label"
                    label="街镇名称"
                    align='center'
                    width="105"
                    sortable="true"
                  >
                    <template slot-scope="scope">
                      <div style="text-algin:center;cursor:pointer;" @click="colight2(scope.$index, scope.row)" >
                        {{ scope.row.label }}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div> 
              <div style="padding: 17px 0 5px;">
                <span>合并目标街镇：</span>
              </div>
              <div class="clear border list-content" style="height:90px;" >
                <el-table :data="rightDateto"
                  :header-cell-style="{background:'#f2f2f2'}"
                  empty-text=" "
                  height="86"
                  highlight-current-row
                  @current-change="handleCurrentChange2"
                  border
                  :default-sort = "{prop: 'date', order: 'descending'}">
                  <el-table-column
                    prop="no"
                    label="序号"
                    align='center'
                    width="50px"
                    sortable="true"
                  >
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    prop="label"
                    label="街镇名称"
                    align='center'
                    width="105"
                    sortable="true"
                  >
                    <template slot-scope="scope">
                      <div style="text-algin:center;cursor:pointer;" @click="colight3(scope.$index, scope.row)" >
                        {{ scope.row.label }}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>   
            </div> 
            <div class="left" style="width:125px;padding:193px 0 0 15px;" >
                <i class="warnning"></i>
                <p><span id="warnning" style="color: #088383">本操作涉及大量数据，为避免影响日常业务，同时保证数据的一致性，请安排在晚上或者周末进行！</span></p> 
            </div>      
        </div>
        <div slot="footer" class="dialog-footer clear">
          <div class="left clear" style="padding-left:10px;" >
            <input class="left" style="margin-top:3px;" v-model="checkstates"  id="checks" type="checkbox" >
            <span class="left" style="color:#B45855;padding-left:5px;">合并后删除被合并街镇</span>
          </div>
          <span class="right save-cancel-btn" style="" @click="cancelData">取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData">开始合并街镇</span>
        </div>
      </div>
    
  </el-dialog>
</template>

<script>
    import {mergeArea} from "../../../service/getData";
    import {findbyId} from "../../../service/getData";
    export default {
        name: "mergeArea",
        data(){
            return{
                MergeVisible:false,
                leftData:[],
                leftDatacopy:[],
                rightDateon:[],
                rightDateto:[],
                geis:'',
                ares1:"",
                ares2:"",
                currentRow:[],
                currentRow1:[],
                currentRow2:[],
                checkstates:false,
                index1:"",
                index2:"",
                index3:""
            }
        },
        methods:{
            beMergeStreet(){
                let addarr=this.currentRow
                if(this.rightDateon==""){
                    this.rightDateon=[]
                }
                if(this.rightDateon.length>0){
                    var arr=[]
                    arr=addarr
                    this.rightDateon.push(arr[0]);
                }else{
                    this.rightDateon.push(addarr[0]);
                }

                let index = this.leftData.indexOf(addarr[0]);
                if(index!=-1) {
                    this.leftData.splice(index,1);
                }
                let in1=this.index1
                let qa=this.leftData[in1]
                this.$refs.singleTable.setCurrentRow(qa);
            },
            backBeMergeStreet(){
                let addarr=this.currentRow1
                if(this.leftData==""){
                    this.leftData=[]
                }
                if(this.leftData.length>0){
                    var arr=[]
                    arr=addarr
                    for(var i=0;this.leftDatacopy.length>i;i++){
                        if(this.leftDatacopy[i]==arr[0]){
                            this.leftData.splice(i, 0, arr[0]);
                        }
                    }

                }else{
                    var arr=[]
                    arr=addarr
                    for(var i=0;this.leftDatacopy.length>i;i++){
                        if(this.leftDatacopy[i]==arr[0]){
                            this.leftData.splice(i, 0, arr[0]);
                        }
                    }
                }
                let index = this.rightDateon.indexOf(addarr[0]);
                if(index!=-1) {
                    this.rightDateon.splice(index,1);
                }
                let in2=this.index2
                let qa=this.rightDateon[in2]
                this.$refs.sinTable.setCurrentRow(qa);
            },
            mergeStreet(){
                let addarr=this.currentRow
                if(this.rightDateto==""){
                    this.rightDateto=[]
                }
                if(this.rightDateto.length==0){
                    this.rightDateto.push(addarr[0])
                    let index = this.leftData.indexOf(addarr[0]);
                    if(index!=-1) {
                        this.leftData.splice(index,1);
                    }
                }
                let in1=this.index1
                let qa=this.leftData[in1]
                this.$refs.singleTable.setCurrentRow(qa);
            },
            backMergeStreet(){
                let addarr=this.currentRow2
                if(this.leftData==""){
                    this.leftData=[]
                }
                if(this.leftData.length>0){
                    var arr=[]
                    arr=addarr
                    for(var i=0;this.leftDatacopy.length>i;i++){
                        if(this.leftDatacopy[i]==arr[0]){
                            this.leftData.splice(i, 0, arr[0]);
                        }
                    }

                }else{
                    var arr=[]
                    arr=addarr
                    for(var i=0;this.leftDatacopy.length>i;i++){
                        if(this.leftDatacopy[i]==arr[0]){
                            this.leftData.splice(i, 0, arr[0]);
                        }
                    }
                }
                let index = this.rightDateto.indexOf(addarr[0]);
                if(index!=-1) {
                    this.rightDateto.splice(index,1);
                }
            },
            colight1(index,row){
                this.index1=index
            },
            colight2(index,row){
                this.index2=index
            },
            colight3(index,row){
                this.index3=index
            },
            handleCurrentChange(val) {
                this.currentRow=[]
                this.currentRow.push(val);

            },
            handleCurrentChange1(val){
                this.currentRow1=[]
                this.currentRow1.push(val);
            },
            handleCurrentChange2(val){
                this.currentRow2=[]
                this.currentRow2.push(val);
            },
            //改变弹框显隐值
            changeMerge(merge,tdata){
                let _this=this
                this.rightDateon=""
                this.rightDateto=""

                this.MergeVisible=true

                if(merge.preId=="642297670593159168"){
                    this.ares1="天津"
                }
                this.ares2=merge.label
                let towonId= merge.id
                _this.geis=merge.id
                findbyId(towonId).then(function (res) {

                    _this.leftData=res.data
                    _this.leftDatacopy=_this.leftData.slice(0)
                })
            },
            //关闭按钮
            closeMerge(){
                this.MergeVisible=false
                this.currentRow=[]
                this.$emit('closeMergeFather',this.MergeVisible);
            },
            //确定按钮
            saveData(){
                let _this=this;
                if(this.checkstates==false){
                    var delFlag=0
                }else{
                    var delFlag=1
                }
                var oldId=[]
                if(this.rightDateon.length>0){
                    for(var i=0;this.rightDateon.length>i;i++){
                        var oids=this.rightDateon[i].id
                        oldId.push(oids)
                    }
                }
                if(this.rightDateto.length>0){
                    for(var i=0;this.rightDateto.length>i;i++){
                        var newId=this.rightDateto[i].id
                    }
                }
                if((newId==undefined&&oldId==undefined)||(newId==undefined&&oldId.length==0)){
                    _this.myAlert("请选择要合并的街镇","dangerous-icon");
                    
                }else if(newId==undefined||newId.length==0) {
                    _this.myAlert("请选择合并目标街镇","dangerous-icon");
                   
                }else if(oldId==undefined||oldId.length==0){
                   _this.myAlert("请选择要合并的街镇","dangerous-icon");
                 
                }else{
                  this.$layer.loading({
                    shade: true,//是否显示遮罩
                  }); 
                  mergeArea(delFlag,newId,oldId).then(function (response) {
                    _this.$layer.closeAll("loading");
                    if (response.status == 500) {
                      return false;
                    } else if (response.status == 0) {
                      
                       _this.myAlert("合并街镇成功!","success-icon").then(res => {
                          _this.MergeVisible=false;
                         let ppd=_this.geis
                        _this.$parent.serch(ppd);
                       

                      }).then(res => {

                      })
                    } else if (response.status == 1){
                      _this.myAlert(response.msg,'dangouser-icon');
                    }
                  })
                    
                }
            },
            cancelData(){
              this.MergeVisible=false;
            }
        }
    }
</script>

<style scoped>
  .padding-l-5{
    padding-left:5px;
  }
  .zuojian{
    width: 20px;
    height: 20px;
    display:inline-block;
    background:url(../../../images/Area/zuojiantou.png) 40px 0px;
  }
  .youjian{
    width: 20px;
    height: 20px;
    display:inline-block;
    background:url(../../../images/Area/youjiantou.png) 40px 0px;
  }
  .warnning{
    width:20px;
    height:20px;
    display:inline-block;
    background:url(../../../images/system/jinggao.png) -15px -15px;
  }
</style>
