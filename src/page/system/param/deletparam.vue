<template>
  <div>
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      style=" height:100%"
      overflow="auto"
      id="addons"
      title="删除参数"
      :visible.sync="deleteParam"
      width="350px"
    >
      <div class="pop-up" >
        <div class="pop-up-container" style="height: 112px;">
          <div id="dest1">
            <div id="dest2">
              <div id="dest3" class="clear" style="padding: 10px;">
                <i class="warnning"></i>
                <p style=" float:left;margin:20px 0 20px 5px;"><span  id="" >警告:参数删除后将不能还原!<br>确定要永久删除选定的参数吗</span></p>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear">
          <span class="right save-cancel-btn"  @click="cancelData" >取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData" >保 存</span>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {deparam} from "../../../service/getData";

  export default {
        name: "deletparam",
        data(){
            return{
                deleteParam:false,
                deids:[],
                pdename:""
            }
        },
        methods:{
            changedelet(dval,del){
                this.pdename=del
                this.deids=dval
                this.deleteParam=true
            },
            //关闭按钮
            cancelData(){
                this.deleteParam=false
                this.$emit('closebuttenFather',this.deleteParam);
            },
            //确定按钮
            saveData(){
                let _this=this
                for(var i=0;this.deids.length>i;i++){
                    let idd=this.deids[i].id
                  deparam(idd).then(function (res) {
                      let ppd=_this.pdename;
                      
                      _this.myAlert(res.msg)
                      _this.$parent.serche(ppd)
                  })
                }
                this.deleteParam=false
                this.$emit('surebuttenFather');
            },
        }

    }
</script>

<style scoped>
  .warnning{
    float: left;
    margin-top: 23px;
    margin-left: 40px;
    width:24px;
    height:20px;
    display:inline-block;
    background:url(../../../images/system/jinggao.png) -15px -15px;
  }
 
</style>
