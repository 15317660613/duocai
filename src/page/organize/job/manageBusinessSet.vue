<template>
  <div style="width:100%;padding:0 10px;">
    <div class="pop-up" style="">
      <div class="search-container">
        <el-form ref="formsData" :model="form">
          <div class="top" style="height:355px;" >
              <div class="clear" style="margin:0 auto;width:515px;padding:10px 0 ;"  >
                   <div class="clear" >
                    <div class="left" >
                        <el-select
                                v-model="form.departRange"
                                placeholder
                                style="width:190px;"
                            >
                                <el-option label="包含直属部门及下级部门" value="1" ></el-option>
                                <el-option label="只包含直属部门" value="2" ></el-option>
                                <el-option label="只包含下级部门" value="3" ></el-option>
                            </el-select>
                    </div>
                    <div class="right clear"  >
                            <div class="clear left" >
                                    <el-form-item  prop="includeMy" >
                                            <el-checkbox  style="height:20px;" v-model="form.includeMy"  :false-label="0" :true-label="1" ></el-checkbox>
                                        </el-form-item>
                              
                            </div>   
                            <div class="clear left" style="width:135px;" >
                                <div class="left" style="padding:3px 0 0 5px;" >
                                    <span  >包含本人个人业务业绩</span>
                                </div>
                                 <div class="left" style="line-height:20px;" >
                                    <span style="color:#999;" >选择本人直属部门时</span>
                                </div>    
                            </div>
                    </div> 
                  </div>  
                  <div class="break" > 
                  </div>   
              </div>
               
                 
          </div>
        </el-form>
      </div>
      <div slot="footer" style="padding:5px 0;" class="dialog-footer clear">
        <span class="right save-cancel-btn" @click="cancelData" >取 消</span>
        <span class="right save-cancel-btn" type="primary" @click="savetBonus" >保 存</span>
      </div>
    </div>

  </div>
</template>
<script>

export default {
  // noFinishDisabled 未结佣标识
  props: ["layerid","departRange","includeMy"],
  data() {
    return {
      
      form: {
          departRange:this.departRange,
          includeMy:this.includeMy*1,
      }
    };
  },
 
  methods: {
    
    savetBonus() {
        let _this = this;
        _this.myConfirm("修改部门管理业绩的部门设置会导致原已被同步的业绩自动删除，", 'question-icon','确定','取消','确定要修改吗？','my-message').then(res => {
          this.$parent.setManageDepart(this.form);
          this.myAlert("数据保存成功！","success-icon").then(res =>{
              this.cancelData();
          }).catch(res => {

          })
        }).catch(err => {
          
        })
        
    },
   
    cancelData() {
      this.$layer.close(this.layerid);
    }
  },
  
};
</script>

<style lang="scss" scoped>
    .break{
    border-width: 2px;
    border-top-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    
  }
</style>
