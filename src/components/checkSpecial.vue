<template>
  <div class="dropdown-wrap">

    <el-select :disabled="getDisabled" v-model="value" filterable  multiple @change="changeSelectRisktypes" @visible-change="findDataBySelect"   class="dropdown-list"  :id="getSelectId"  >
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
            @change.stop.native="valueChange(item)">
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
    props:["selectId","listData","selectDisabled"],
    data(){

      return {
        getDisabled:this.selectDisabled == undefined ? false : this.selectDisabled ,
        getSelectId:this.selectId,
        getListData:this.listData,
        opendata:[],
        closedata:[],
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
         if(value){
          // this.$emit("findStreetByTown");
        }
      },
      findDataBySelect(value){
        let thistrue = true;
        if(value){
          this.opendata = [];
          this.getListData.forEach(item=>{
            if(item.select){
              this.opendata.push(item.id);
            }
          })
        }else{
          this.closedata = [];
          this.getListData.forEach(item=>{
            if(item.select){
              this.closedata.push(item.id);
            }
          });
          if(this.opendata.length == this.closedata.length){
            this.closedata.forEach(item=>{
              if(this.opendata.indexOf(item)==-1){
                thistrue = false;
              }
            })
          }else{
            thistrue = false;
          }
          if(!thistrue){
            this.$emit("findStreetByTown");
          }
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
<style lang="scss">

</style>
