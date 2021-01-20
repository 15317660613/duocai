<template>
  <div class="" style="width:100%;margin:0 10px;" >
   
      <div class="pop-up" >
        <div class="pop-up-container clear" style="height:350px" >
          <div class="left list-content  list-container" >
            <div class="list-table" style="width:390px;" >
              <el-table
                :data="tableData"
                style="width: 100%"
                height="318"
                border
                @selection-change="selectchange"
              >
                <el-table-column
                  prop="check"
                  width="30"
                  label="√"
                >
                  <template slot-scope="scope">
                    <div  >
                      <input v-model="propertyOwnerId" type="radio" :value="scope.row.id"  @click="radio(scope.row)" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="projectName"
                  label="项目名称"
                  :show-overflow-tooltip="true"
                  align='center'
                  sortable="true"
                  width="90">
                  <template slot-scope="scope">
                    <div style="font-weight:700;color:#336699;text-algin:center;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)" >
                      {{ scope.row.projectName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="projectCode"
                  label="项目编号"
                  width="80"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="area"
                  label="区县"
                  width="100"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="projectState"
                  label="状态"
                  width="55"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="startDate"
                  label="开盘日期"
                  width="85"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                </el-table-column>
                <el-table-column
                  prop="endDate"
                  label="最晚交房"
                  width="85"
                  sortable="true"
                  :show-overflow-tooltip="true"
                  align='center'
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="left clear " style="padding:10px 10px 0px 0px;" >
            <el-form class=" clear "  ref="formsData"  :model="forms" >
              <div class="clear" >
                  <span class="word" >营销状态</span>
                </div>
              <div class=" clear " >
                
                <div class="left" >
                  <el-form-item  prop="word" >
                  
                    <el-select  v-model="forms.projectState" style="width:120px;" >
                      <el-option :id="stt.id" :value="stt.id" :label="stt.name" v-for="stt in prees" ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>  
              <div class="clear" >
                <el-form-item  prop="word" >
                  <el-input  v-model="forms.word" title="项目名称/项目编号"  autocomplete="off" style="width:120px;" >
                  </el-input>
                </el-form-item>
              </div>
            </el-form>
            <div class="item-earch-btn" @click="getProjectDataList" >
              查询
            </div>
            
          </div>
        </div>
        <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
          <span class="right save-cancel-btn"  @click="cancelData" >取 消</span>
          <span class="right save-cancel-btn" type="primary" @click="saveData" >保 存</span>
        </div>
      </div>
    
  </div>
</template>

<script>
  import {newHouseList,getparams} from '../../../service/newHouse'

  export default {
    name: 'cooseproject',
    props:["projectId","layerid"],
    data(){
      return{
        radids:"",
        prees:[],
        cprodialog:this.dialogpc,
        tableData:[],
        propertyOwnerId:this.projectId,
        forms:{
          projectState:"-1",
          needInfo: "1",
          word:"",
          flag:'1',
        }
      }
    },
    methods:{
      
      showcject(){
        let _this=this;
        this.forms.projectState="-1"
        this.forms.word=""
        getparams(true).then(function(response){
          if (response.status == 0) {
            let data = response.data;
            if(data.projectStateParams){
              let initArrSpecial = [{id:"-1",name:"全部",select:true}];
              data.projectStateParams.forEach(function(item){
                let obj = {
                  id:item.id,
                  name:item.name,
                  select:false,
                }
                if(item.name == "在售"){
                  obj.select = false;
                }
                initArrSpecial.push(obj);
              })
              _this.prees = initArrSpecial;
            }
            _this.getProjectDataList();
          }

        })
        
      },

      getProjectDataList(){
        let _this = this;
        let form = JSON.parse(JSON.stringify(_this.forms));
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        newHouseList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            _this.tableData = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
         
        })
      },

      getMyNewHouseListData(){
        let _this = this;
        this.$layer.loading({
          shade: true,//是否显示遮罩
        });
        let form = {};
        form.myCreate =1;
        form.needInfo = 1;
        newHouseList(form).then(function (response) {
          _this.$layer.closeAll("loading");
          if (response.status == 500) {
            return false;
          } else if (response.status == 0) {
            let data = response.data.list;
            _this.tableData = data;
          } else if (response.status == 1) {
            let message = response.msg;
            _this.myAlert(message + "！");
          }
        })
      },

     
      selectchange(exe){

      },
      //单选赋值
      radio(id){
        this.radids=id;

      },
      //保存
      saveData(){
        if(this.radids==""){
          this.myAlert("选择项目")
        }else{
           this.$parent.prona(this.radids);
           this.cancelData();
        }
      },
      cancelData(){
        let _this = this;
        _this.$layer.close(_this.layerid);
      },
    },
    mounted(){
      this.showcject();
    }

  }
</script>

<style lang="scss" scoped>
  .list-container{

    height:322px;
    background:#C0C0C0;
    border-width: 2px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    border-radius:5px;
    margin:10px;
    border-radius:5px;

  }
  .item-earch-btn{
    border: 1px solid #666;
    line-height: 21px;
    margin-top: 10px;
    text-align: center;
    border-radius: 3px;
    cursor:pointer;
  }
  .search-container{
    padding:10px;

  }
  .buttons{
    border-width: 0px;
    margin-top: 10px;
    margin-bottom:10px ;
    width: 87px;
    height: 20px;
    background: inherit;
    background-color: rgba(223, 218, 213, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(102, 102, 102, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: '思源黑体 CN Regular', '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #1E1E1E;
  }
</style>
