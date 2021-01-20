<template>
  <div class="dropdown-wrap">

    <el-select :disabled="getDisabled" v-model="value" multiple @change="changeSelectRisktypes" @visible-change="findDataBySelect"   class="dropdown-list"  :id="getSelectId">
      <el-option
        v-for="item in getListData"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        <div class="clear" @click="valueChange(item)" >
          <span v-if="item.level" :class="{padding1:item.level == 1,padding2:item.level == 2,padding3:item.level == 3,padding4:item.level == 4,padding5:item.level == 5,}" ></span>
          <el-checkbox
            v-if="true"
            :disabled="false"
            :checked="item.select"
            v-model="item.select"
            @change="valueChange(item)">
          </el-checkbox>
          <span v-if='item.state=="关闭"' style="display: inline-block;color: #999;"  >{{item.name}}</span>
          <span v-else-if='item.stateUser=="1"' style="display: inline-block;color: #999;"  >{{item.name}}</span>
          <span v-else style="display: inline-block;" >{{item.name}}</span>
        </div>  
      </el-option>
    </el-select>
  </div>
</template>

<script>

  export default {
    props:["selectId","listData",'selectDisabled','indexSelect','getDisabled'],
    data(){

      return {
        
        getSelectId:this.selectId,
        getListData:this.listData,
        selectedValue:'',
        selectArr:[],
        value:'',
      }
    },
    methods: {

      valueChange(elem){
        let id = document.getElementById(this.getSelectId);
        let selectArr = this.getListData.concat();
        if(elem.select){
            elem.select = false;
            selectArr.forEach(
              function(item){
               if(elem.id == item.id){
                  item.select = false;
                }
              }
            );
            
            this.getListData = selectArr.concat();
            let name = [];
            selectArr.forEach(function(item){
                if(item.select){
                  name.push(item.name);
                }
              }
            );
            id.value = name.toString();
        }else{
          
            elem.select = true;
            selectArr.forEach(
              function(item){
                if(elem.id == item.id){
                  item.select = true;
                }
              }
            );
            this.getListData = selectArr;
            let name = [];
            selectArr.forEach(function(item){
                if(item.select){
                  name.push(item.name);
                }
              }
            );
            id.value = name.toString();
        }
      },

      changeSelectRisktypes(value){

      },
      findDataBySelect(){
         
          this.$emit("changeSelect",this.indexSelect);
      },
      getElem(value){
        let elem ;
        let getListData = this.getListData;
        if(getListData && getListData.length != 0) {
          for (let i = 0; i < getListData.length; i++) {
            if (getListData[i].id == value) {
              elem = getListData[i];
              break;
            }
          }
        }
        return elem;
      }
    },
    mounted(){
      // if(this.selectDisabled != undefined){
      //     this.getDisabled = this.getDisabled;
      // }else{
      //   this.getDisabled = false;
        let listData = this.getListData;
        let value = [];
        if(listData){
          listData.forEach(function(item){
            if(item.select == 'undefined'){
              item.select = false;
            }
            if(item.select){
              value.push(item.name);
            }
          })
        }
        let id = document.getElementById(this.getSelectId);
        id.value = value.toString();
      // }
    },
    watch: {
     listData: {
        handler(newValue, oldValue) {
          this.getListData = newValue;
          let value = [];
          if(newValue){
            newValue.forEach(function(item){
              if(item.select == 'undefined'){
                item.select = false;
              }
              if(item.select){
                value.push(item.name);
              }
            })
          }
          let id = document.getElementById(this.getSelectId);
          id.value = value.toString();
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .padding1{
    padding-left:0px;
    display:inline-block;
    
  }
  .padding2{
    padding-left:15px;
    display:inline-block;
    
  }
  .padding3{
    padding-left:30px;
    display:inline-block;
  
  }
  .padding4{
    padding-left:45px;
    display:inline-block;
    
  }
  .padding5{
    padding-left:60px;
    display:inline-block;
  
  }
</style>
