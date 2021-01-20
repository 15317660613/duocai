<template>
  <div class="dropdown-wrap">

    <el-select v-model="value" multiple @change="changeSelectRisktypes" @visible-change="findDataBySelect"   class="dropdown-list"  :id="getSelectId"  >
      <el-option
        v-for="item in getListData"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        <el-checkbox
          v-if="true"
          :disabled="false"
          :checked="item.select"
          v-model="item.select"
          @change="valueChange(item)">
        </el-checkbox>
        <span v-if='item.state=="关闭"' style="width: calc(100% - 20px);display: inline-block;color: #696767" @click="valueChange(item)" >{{item.name}}</span>
        <span v-else style="width: calc(100% - 20px);display: inline-block;" @click="valueChange(item)" >{{item.name}}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>

  export default {
    name: "checkcolor",
    props:["selectId","listData"],
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
        debugger;
        if(elem.select){
          if(elem.name == "全部"){
            selectArr.forEach(
              function(item){
                if(item.id != '-1'){
                  item.select = false;
                }else{
                  item.select = true;
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
            elem.select = false;
            selectArr.forEach(
              function(item){
                if(elem.id == item.id){
                  item.select = false;
                }
              }
            );
            let flag = false;
            for(let i = 0 ; i < selectArr.length ; i++){
              if(selectArr[i].select){
                flag = true;
                break;
              }
            }
            if(!flag){
              selectArr[0].select = true;
            }
            this.getListData = selectArr.concat();
            let name = [];
            selectArr.forEach(function(item){
                if(item.select){
                  name.push(item.name);
                }
              }
            );
            id.value = name.toString();
          }
        }else{
          elem.select = true;
          if(elem.name == "全部"){
            selectArr.forEach(
              function(item){
                if(item.id != '-1'){
                  item.select = false;
                }else{
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
          }else{
            elem.select = true;
            selectArr.forEach(
              function(item){
                if(item.id == '-1'){
                  item.select = false;
                }else if(elem.id == item.id){
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
        }
      },

      changeSelectRisktypes(value){
      },
      findDataBySelect(value){
        if(!value){
          this.$emit("findStreetByTown");
        }
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

</style>
<style lang="scss">

</style>
