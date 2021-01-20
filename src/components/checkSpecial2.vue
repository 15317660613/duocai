<template>
  <div class="dropdown-wrap">

    <el-select :disabled="getDisabled" v-model="value" multiple @change="changeSelectRisktypes" @visible-change="findDataBySelect"   class="dropdown-list"  :id="getSelectId" >
      <el-option
        v-for="item in getListData"
        :key="`${item.name}+${item.money}`"
        :label="`${item.name}+${item.money}+${item.dw}`"
        :value="`${item.name}+${item.money}`">
         <div class="clear" @click="valueChange(item)" >
            <el-checkbox
              :disabled="false"
              :checked="item.select"
              :key="item.id"
              @change="valueChange(item)"
              v-model="item.select">
            </el-checkbox>
          
          <span  style="width: calc(100% - 20px);display: inline-block;" >
            <span>{{item.name}}</span>
            <span style="border-bottom: 1px solid #000;">
              <input @click.stop type="text" v-model="item.money" name="" maxlength="10" style="border: none;outline: none;width: 30px;">
            </span>
            <span>{{item.dw}}</span>
          </span>
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
        getDisabled:false,
        getSelectId:this.selectId,
        getListData:this.listData,
        selectedValue:'',
        selectArr:[],
        value:'',
        callbackvalue:''
      }
    },
    methods: {

      valueChange(elem){
        let id = document.getElementById(this.getSelectId);
        let selectArr = this.getListData.concat();
        if(elem.select){
            elem.select = false;
        }else{
            elem.select = true;
        };
        let thisvalue = [];
        selectArr.forEach(item=>{
          if(item.select){
            thisvalue.forEach(ii=>{
              if(item.id==ii.id){
                thisvalue.splice(ii,1);
              }
            });
            thisvalue.push({
              id:item.id,
              value:item.money
            })
          }
        })
        id.value = JSON.stringify(thisvalue);
        this.callbackvalue = JSON.stringify(thisvalue);;
      },

      changeSelectRisktypes(){
        
      },
      findDataBySelect(){
        this.$emit("changeSelect",this.callbackvalue);
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
        let listData = this.getListData;
        let value = [];
        if(listData){
          listData.forEach(function(item){
            if(item.select == 'undefined'){
              item.select = false;
            }
            if(item.select){
              value.push(item.name+item.money+item.dw)
            }
          })
        }
        let id = document.getElementById(this.getSelectId);
        id.value = value.toString();
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
                value.push(item.name+item.money+item.dw);
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

</style>
<style lang="scss">

</style>
