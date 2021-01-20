<template>
  <div class="dropdown-wrap">
    <el-popover
      placement="bottom"
      width="322"
      trigger="click"
      v-model="visible"
      >
      <div style="width: 300px;height: 250px;padding: 0px 10px;">
        <div style="height: 40px;text-align: center;line-height: 40px;border-bottom: 1px solid #eee;font-size: 14px;">{{time}}</div>
        <div class="clear">
          <div @click="clickMonthFunc(item)" v-for="item in allMonth" :class="item.select ? 'isSelected' : ''" style="width: 55px;height: 30px;text-align: center;margin: 15px 5px;float: left;border-radius: 3px;line-height: 30px;">{{item.name}}</div>
        </div>
        <div style="border-top: 1px solid #eee;text-align: right;padding: 5px 0px;"> 
          <el-button @click="sureButton" type="primary" size="mini">确定</el-button>
        </div>
      </div>
      <el-input slot="reference" v-model="choosemonth" placeholder="请输入内容" style="width: 320px;"></el-input>
    </el-popover>
  </div>
</template>

<script>

  export default {
    props:["selectId","listData","selectDisabled"],
    data(){

      return {
       time:2020,
       dateMonthInput:'',
       visible:false,
       allMonth:[
        {id:'01',name:'一月',select:false},
        {id:'02',name:'二月',select:false},
        {id:'03',name:'三月',select:false},
        {id:'04',name:'四月',select:false},
        {id:'05',name:'五月',select:false},
        {id:'06',name:'六月',select:false},
        {id:'07',name:'七月',select:false},
        {id:'08',name:'八月',select:false},
        {id:'09',name:'九月',select:false},
        {id:'010',name:'十月',select:false},
        {id:'011',name:'十一月',select:false},
        {id:'012',name:'十二月',select:false},
       ],
       choosemonth:[],
      }
    },
    methods: {
      clickMonthFunc(item){
        console.log(item);
        if(item.select){
          item.select = false;
          let thistime = this.time+'-'+item.id;
          this.choosemonth.forEach((item,index)=>{
            if(item == thistime){
              this.choosemonth.splice(thistime,1);
            }
          })
        }else{
          item.select = true;
          this.choosemonth.push(this.time+'-'+item.id);
        };
        console.log(this.choosemonth);
      },
      sureButton(){
        console.log(this.choosemonth);
        this.visible = false;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .isSelected{
    background: #fff;
    background: #409eff
  }
</style>
