<template>
  <div class="" >
    <el-dialog :close-on-click-modal="false" style="z-index:200" v-dialogDrag title="更多客对" width="500px" height="250px" @close="clearFormData" :visible.sync="dialogModifyNum" >
      <div class="pop-up" >
        <div class="pop-up-container " >
          <div class="move-content list-content" >
            <div class="" style="height:260px;" >
                <el-table
                  :data="tableData"
                  empty-text=" "
                  border
                  height="100%"
                  :loading="loading"
                  highlight-current-row
                >

                  <el-table-column
                    prop="houseType"
                    label="交易"

                    width="35">

                  </el-table-column>

                  <el-table-column
                    prop="indexId"
                    label="顺位"
                    width="40">

                  </el-table-column>
                  <el-table-column
                    prop="processingStateId"
                    label="进程"
                    width="40">

                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="自定"
                    width="40">
                  </el-table-column>
                  <el-table-column
                    prop="area"
                    label="房源地址"
                    width="150">
                    <template slot-scope="scope">
                      <div style="color:#336699;text-algin:center;cursor:pointer;" @click="editorRent(scope.$index, scope.row)" >
                        {{ scope.row.area }}
                      </div>
                    </template>
                  </el-table-column>


                  <el-table-column
                    prop="createTime"
                    label="标记日期"
                    width="105">
                  </el-table-column>
                </el-table>
            </div>
          </div>
        </div>
      </div>

    </el-dialog>

  </div>
</template>
<script>
  import {customerFindPairList} from "../../../service/customerData";
  // 编辑租售
  import EditorRentPage from '../../house/rent/editorRent'
  export default {
    props:["moreCompareVisible"],
    data() {
      return {
        dialogModifyNum:this.moreCompareVisible,
        loading:false,
        tableData:[],
        form:{
          id:0,
        },
      };
    },
    components:{
      EditorRentPage
    },
    methods:{
      dialogShow(id){
        this.dialogModifyNum = true;
        this.form.id = id;
        this.findCustomerListByHouse();
      },

      findCustomerListByHouse(){
        let _this = this;
        let id = _this.form.id;
        customerFindPairList(id).then(function(response){
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            _this.tableData = response.data;

          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message+"！");
          }
        })
      },
      editorRent(index, row){
        let _this = this;
        _this.$layer.iframe({
          content: {
            content: EditorRentPage, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id,address:row.area,}//props
          },
          area:['800px','560px'],
          title: "房源信息 【"+ row.area+"】",
          shadeClose: false,
          shade: false,//是否显示遮罩
          zIndex:5000, //层优先级
          cancel:()=>{//关闭事件

          }
        });
      },
      clearFormData(){

        this.form.townId = '';
        this.dialogModifyNum = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .move-content {
    padding:10px;
  }
</style>
