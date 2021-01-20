<template>
  <div>
    <el-dialog
      style=" height:343px"
      overflow="auto"
      id="addons"
      title="删除地域"
      :visible.sync="deleteVisible"
      width="350px"
    >
      <div id="dest1" style="height: 112px;">
        <div id="dest2">
          <div id="dest3">
            <i class="warnning"></i>
            <p style=" float:left;margin-left:5px;margin-top: 25px;"><span id="" >警告:片区删除后将不能还原!<br>确定要永久删除选定的片区吗</span></p>
          </div>
        </div>
        <span id="spanstyle" slot="footer" class="dialog-footer">
             <button class="buttons" type="primary" @click="surebutten">确 定</button>
              <button class="buttons" @click="closebutten">取 消</button>
          </span>
      </div>

    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "alert"
    }
</script>

<style scoped>

</style>
