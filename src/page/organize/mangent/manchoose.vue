<template>
 <div class="" style="width:100%;margin: 0 10px;" >
  
     <div class="pop-up" >
       <el-tabs type="border-card" style="height: 100%">
         <el-tab-pane label="房源1" >
           <span slot="label">房源1</span>
           <div >
             <div class="pop-up-container" style="height: 431px;" >
               <div class="move-content" >
                 <el-form ref="formsData" :model="form">
                   <div  class="clear" >
                     <div   style="height: 136px;width: 520px;border-block-end: 1px solid;}">
                       <div class="cler inblock fll" style="height: 136px;width: 520px;" >
                         <div class="cler fll" v-for="(item,i) in form.data" :key="i" >
                           <div v-if="item.clas==1" class="fll " >
                             <input  v-model="item.paramData" style="margin-top: 9px" class="fll " type="checkbox">
                             <p  v-if='item.paramName=="新增房源默认为【私盘】"'  class="fll">
                               <span class="fll" style="color: #800000;margin-top: 6px">{{item.paramName}}</span>
                             </p>
                             <p  v-else  class="fll">
                               <span class="fll" style="margin-top: 6px">{{item.paramName}}</span>
                             </p>
                           </div>
                           <div v-if="item.clas==2" class="fll " style="margin-left: 250px;height: 136px;width: 520px;margin-top: -113px" >
                            <input  v-model="item.paramData" style="margin-top: 9px" class="fll inblock " type="checkbox">
                            <p  class="fll inblock">
                              <span class="fll" style="margin-top: 6px">{{item.paramName}}</span>
                            </p>
                          </div>
                           <div v-if="item.clas==3" class="fll " style="margin-left: 380px;height: 226px;width: 770px;margin-top: -205px"  >
                             <input  v-model="item.paramData" style="margin-top: 9px" class="fll " type="checkbox">
                             <p  class="fll">
                               <span class="fll" style="margin-top: 6px">{{item.paramName}}</span>
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div>
                         
                      <div class="cler p-10">
                         <p class="cler">
                           <i class="yuanc up-down fll" style="margin-top: -2px"></i>
                           <span class="fll">
                                  每天最多可新增
                             </span>
                           <input v-model="form.最多可新增房源" class="fll inputs" type="text" style="width: 50px">
                           <span class="fll">
                                条房源（0=不限制）：
                           </span>
                           <input v-model="form.每人每部门"  value="1" name="radio" class="fll " type="radio" checked style="margin-top: 3px"/>
                           <span class="fll">
                               每人
                           </span>
                           <input v-model="form.每人每部门"  value="2" name="radio" class="fll " type="radio" style="margin-top: 3px"/>
                           <span class="fll">
                               每部门
                           </span>
                         </p>
                       </div>
                         <div class="cler p-10">
                            <p class="cler">
                           <i class="yuanc up-down fll" style="margin-top: -2px"></i>
                           <span class="fll">
                                 每人最多可拥有
                             </span>
                           <input v-model="form.最多可拥有私盘1" class="fll inputs" type="text" style="width: 50px">
                           <span class="fll">
                                条私盘（0=不限制/不含封盘/特盘）：
                           </span>
                           <input v-model="form.该限制只针对有效私盘" class="fll " type="checkbox" style="margin-top: 3px"/>
                           <span class="fll">
                               该限制只针对有效私盘
                           </span>
                         </p>
                         </div>
                         <div class="cler p-10">
                         <p class="cler">
                           <i class="yuanc up-down fll" style="margin-top: -2px"></i>
                           <span class="fll">
                                 每人最多可拥有
                             </span>
                           <input v-model="form.最多可拥有私盘2"class="fll inputs" type="text" style="width: 50px">
                           <span class="fll">
                                条优质房（0=不限制）：
                           </span>
                           
                         </p>
                       </div>
                     </div>
                   </div>
                 </el-form>
               </div>
             </div>
             <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="savemanegent" >保 存</span>
                <span class="right save-cancel-btn" type="primary" @click="initial(1)" >默 认</span>
             </div>
           </div>
         </el-tab-pane>
         <el-tab-pane label="房源2" >
           <span slot="label">房源2</span>
           <div >
             <div class="pop-up-container"  style="height: 431px;" >
               <div class="move-content" >
                 <el-form ref="formsData" :model="form1">
                   <div class="cler" >
                     <div style="height: 156px;width: 520px;border-block-end: 1px solid;}">
                       <div class="cler inblock fll" >
                         <div class="cler">
                           <input v-model="form1.遮盖栋座" checked class="fll input" type="checkbox">
                           <p class="fll">
                             <span class="fll" style="margin-top: -2px">遮盖业主同时遮盖【栋座】  </span>
                             <span class="fll" style="color: #999999;margin-top: -2px;">（点（看业主）方可看栋座  |  员工看业主次数<999)</span>
                           </p>
                         </div>
                         <div class="cler p-10" >
                           <input v-model="form1.遮盖房号" class="fll input" type="checkbox">
                           <p class="fll">
                             <span class="fll" style="margin-top: -2px">遮盖业主同时遮盖【房号】  </span>
                             <span class="fll" style="color: #999999;margin-top: -2px;">（点（看业主）方可看栋座  |  员工看业主次数<999)</span>
                           </p>
                         </div>
                         <div class="cler p-10" >
                           <input v-model="form1.遮盖照片" class="fll input" type="checkbox">
                           <p class="fll">
                             <span class="fll" style="margin-top: -2px">遮盖业主同时遮盖【照片】  </span>
                             <span class="fll" style="color: #999999;margin-top: -2px;">（点（看业主）方可看栋座  |  员工看业主次数<999)</span>
                           </p>
                         </div>
                         <div class="cler p-10" >
                           <input v-model="form1.看房源不计次数" class="fll input" type="checkbox">
                           <p class="fll">
                             <span class="fll" style="margin-top: -2px">自己看房源【看业主】不计次数，不记录日志（自己是房源第1归属人）</span>
                           </p>
                         </div>
                         <div class="cler p-10" >
                           <input v-model="form1.租售合并次数计算" class="fll input" type="checkbox">
                           <p class="fll">
                             <span class="fll" style="margin-top: -2px">租、售每天【看业主】次数合并计算（不分租售/仅限制总次数< 两者次数之和）</span>
                           </p>
                         </div>
                         <div class="cler p-10">
                           <p class="cler">
                             <i class="yuanc up-down fll" style="margin-top: -2px"></i>
                             <span class="fll">
                                 每条房源每天【看业主】次数不超过
                             </span>
                             <input v-model="form1.看业主不超过次数" class="fll inputs" type="text" style="width: 50px">
                             <span class="fll">
                                次（0=不启用  |  员工看业主次数<>999）
                             </span>

                           </p>
                         </div>
                       </div>

                     </div>
                     <div>
                       <div class="cler p-10">
                         <div class="clear left" >
                            <input v-model="form1.写跟进不可粘贴复制" class="fll input" type="checkbox">
                            <p class="fll">
                              <span class="fll" style="margin-top: -2px">写跟进不可【复制、粘贴】  </span>
                            </p>
                         </div>  
                         <div class="clear left" style="padding-left:55px;" >
                            <input v-model="form1.统计跟进包含带看" class="fll input" type="checkbox">
                            <span class="fll" style="margin-top: -2px">房客源统计跟进包含带看跟进</span>
                            <span class="fll" style="color: #999999;margin-top: -2px;">（业务统计)</span>
                         </div> 
                       </div>
                       <div class="cler p-10" >
                         <input v-model="form1.强制合并跟进记录" class="fll input" type="checkbox">
                         <p class="fll">
                           <span class="fll" style="margin-top: -2px">强制合并【同人、同天、同房源】的跟进记录  </span>
                         </p>
                       </div>
                       
                       <div class="cler p-10" >
                         <input v-model="form1.第一归属人更新房源" class="fll input" type="checkbox">
                         <p class="fll">
                           <span class="fll" style="margin-top: -2px">只有【第1归属人】写入跟进才更新房源的【最后跟进日】（其他人写入不更新）</span>
                         </p>
                       </div>
                       <div class="cler p-10">
                         <p class="cler">
                           <i class="yuanc up-down fll" style="margin-top: -2px"></i>
                           <span class="fll">
                                 写跟进至少
                             </span>
                           <input v-model="form1.跟进字数" class="fll inputs" type="text" style="width:50px;">
                           <span class="fll">
                               字
                           </span>
                           <span class="fll" style="color:#999999;">
                               （房源跟进、客源跟进）
                           </span>
                         </p>
                       </div>
                       <div class="cler p-10">
                         <p class="cler">
                           <i class="yuanc up-down fll" style="margin-top: -2px"></i>
                           <span class="fll" style="color: #800000">
                                  出售房源【最后跟进日】超过
                             </span>
                           <input v-model="form1.超过天数变黄色1" class="fll inputs" type="text" style="width: 50px">
                           <span class="fll" style="color: #800000">
                               天变黄色，超过
                           </span>
                           <input v-model="form1.超过天数变红色1" class="fll inputs" type="text" style="width:50px"/>
                           <span class="fll" style="color: #800000">
                              天变红色（0=不启用/含租售）
                           </span>

                         </p>
                       </div>
                       <div class="cler p-10">
                         <p class="cler">
                           <i class="yuanc up-down fll" style="margin-top: -2px"></i>
                           <span class="fll" style="color: #800000">
                                  出租房源【最后跟进日】超过
                             </span>
                           <input v-model="form1.超过天数变黄色2" class="fll inputs" type="text" style="width: 50px">
                           <span class="fll" style="color: #800000">
                               天变黄色，超过
                           </span>
                           <input v-model="form1.超过天数变红色2" class="fll inputs" type="text" style="width:50px"/>
                           <span class="fll" style="color: #800000">
                              天变红色（0=不启用）
                           </span>
                         </p>
                       </div>
               <!-- <div class="cler p-10">
                         <p class="cler">
                           <i class="yuanc up-down fll" style="margin-top: -2px"></i>
                           <span class="fll" style="color: #800000">
                                  出售房源【最后跟进日】超过
                             </span>
                           <input v-model="form1.超过天数变黄色3" class="fll inputs" type="text" style="width: 50px">
                           <span class="fll" style="color: #800000">
                               天变黄色，超过
                           </span>
                           <input v-model="form1.超过天数变红色3" class="fll inputs" type="text" style="width:50px"/>
                           <span class="fll" style="color: #800000">
                              天变红色（0=不启用）
                           </span>

                         </p>
                       </div>  -->

                     </div>
                   </div>
                 </el-form>
               </div>
             </div>
             <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="savemanegent" >保 存</span>
                <span class="right save-cancel-btn" type="primary" @click="initial(1)" >默 认</span>
             </div>
             
           </div>
         </el-tab-pane>
         <el-tab-pane label="房源3" >
           <span slot="label">房源3</span>
           <div >
             <div class="pop-up-container"  style="height: 431px;" >
               <div class="move-content" >
                 <el-form ref="formsData" :model="form2">
                   <div class="cler" >
                     <div style="height: 114px;width: 520px;border-block-end: 1px solid;}">
                       <div class="cler inblock fll" >
                         <div class="cler p-10">
                           <p class="cler">
                             <i class="yuanc up-down fll" style="margin-top: -2px"></i>
                             <span class="fll">
                                 房源价格
                             </span>
                             <input v-model="form2.房源价格标志" class="fll inputs" type="text" style="width: 50px">
                             <span class="fll">
                                天内有变动的将显示升降标志
                             </span>
                           </p>
                         </div>
                         <div class="cler p-10" style="margin-left: 18px">
                            <p class="cler">
                              <span class="fll" style="margin-top: 2px">租金单价单位：</span>
                              <input v-model="form2.租金单价单位1" name="zujin" value="1" class="fll input" style="margin-top: 5px" type="radio">
                              <span>【</span>
                              <select  v-model="form2.单选框里的下拉1">
                                 <option value="1">元</option>
                                 <option value="2">万元</option>
                              </select>
                              
                              <span>&nbsp;单价=租价/面积</span>
                            </p>
                         </div>
                         <div class="cler p-10" style="margin-left: 103px">
                           <p class="cler">
                             <input v-model="form2.租金单价单位1" name="zujin" value="2" class="fll input" style="margin-top: 5px" type="radio">
                             <span>【</span>
                             <select v-model="form2.单选框里的下拉2">
                               <option value="3">元</option>
                               <option value="4">万元</option>
                             </select>
                             
                             <span> &nbsp;单价=租价/面积/（365/12）天</span>
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     <div>
                       <div class="mat-10">
                         <p>
                           <span style="color:#800000 ">【所有房源】栏目改名：</span>
                         </p>
                       </div>
                       <div class="cler p-10 inblock" style="width:170px;" >
                         <p class="cler">
                           <span class="fll" style="padding-right:6px;" >
                               【现状】改名
                             </span>
                           <input v-model="form2.现状改名" maxLength="2" title="上限2个字" class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                        <div class="cler p-10 inblock"  style="width:170px;" >
                         <p class="cler">
                           <span class="fll" style="padding-right:6px;" >
                               【产权】改名
                             </span>
                           <input v-model="form2.产权改名"  maxLength="2" title="上限2个字"  class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div> 
                       <div class="cler p-10 inblock"  style="width:170px;" >
                         <p class="cler">
                           <span class="fll">
                               【归属人1】改名
                             </span>
                           <input v-model="form2.归属人1改名"  maxLength="4" title="上限4个字"  class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       <div class="cler p-10 inblock"  style="width:170px;" >
                         <p class="cler"  >
                           <span class="fll">
                               【付款1】改名
                             </span>
                           <input v-model="form2.付款1改名"  maxLength="3" title="上限3个字"  class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       <div class="cler p-10 inblock"  style="width:170px;" >
                         <p class="cler">
                           <span class="fll">
                                【付款2】改名
                             </span>
                           <input v-model="form2.付款2改名"  maxLength="3" title="上限3个字"  class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                      
                       <div class="cler p-10 inblock"  style="width:170px;" >
                         <p class="cler">
                           <span class="fll">
                               【归属人2】改名
                             </span>
                           <input v-model="form2.归属人2改名"  maxLength="4" title="上限4个字"  class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       <div class="cler p-10 inblock"  style="width:170px;" >
                         <p class="cler">
                           <span class="fll" style="padding-right:6px;" >
                               【装修】改名
                             </span>
                           <input v-model="form2.装修改名"  maxLength="2" title="上限2个字"  class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       <div class="cler p-10 inblock"  style="width:170px;" >
                         <p class="cler">
                           <span class="fll" style="padding-right:6px;" >
                               【付佣】改名
                             </span>
                           <input v-model="form2.付佣改名"  maxLength="2" title="上限2个字"  class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       
                       <div class="cler p-10 inblock"  style="width:170px;" >
                         <p class="cler" >
                           <span class="fll">
                               【归属人3】改名
                             </span>
                           <input v-model="form2.归属人3改名"  maxLength="4" title="上限4个字"  class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       <div class="fll" style="margin-left: 342px;">
                            <p>
                              <span style="color:rgb(8, 131, 131);">
                                  （所有改名栏目不可为空！）
                              </span>
                            </p>
                       </div>
                     </div>

                  </div>
                 </el-form>
               </div>
             </div>
             <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="savemanegent" >保 存</span>
                <span class="right save-cancel-btn" type="primary" @click="initial(1)" >默 认</span>
             </div>
           </div>
         </el-tab-pane>
         <el-tab-pane label="新房" >
           <span slot="label">新房</span>
           <div >
             <div class="pop-up-container"  style="height: 431px;" >
               <div class="move-content" >
                 <el-form ref="formsData" :model="form3">
                   <div class="cler">
                     <div style="height: 60px;width: 520px;border-block-end: 1px solid;}">
                       <div class="cler inblock fll" >
                         <div class="">
                           <p>
                             <span style="color:#800000 ">【项目列表】：</span>
                           </p>
                         </div>
                         <div class="cler p-10" >
                           <input v-model="form3.报备不必关联" class="fll" type="checkbox">
                           <p class="fll">
                             <span class="fll" style="margin-top: -2px">新增【报备】不必关联客源  </span>
                           </p>
                         </div>
                       
                       </div>

                     </div>
                     <div>
                       <div class="mat-10">
                         <p>
                           <span style="color:#800000 ">【销售管理】：</span>
                         </p>
                       </div>
                       <div class="cler fll  p-10">
                         <input v-model="form3.认筹不关联客源" class="fll" type="checkbox">
                         <p class="fll">
                           <span class="fll" style="margin-top: -2px">新增【销售管理-各资源】不必关联客源  </span>
                         </p>
                       </div>
                       <div class="cler p-10 inblock" style="margin-left: 38px;margin-top: -4px">
                         <p class="cler">
                           <span class="fll">
                                新房编号前缀
                             </span>
                           <input v-model="form3.新房编号前缀" class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                        <div class="cler " style="margin-top: 10px">
                         <p class="fll">
                           <span class="fll">
                               【成交人员1】改名
                             </span>
                           <input v-model="form3.成交人1改名" class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       <div class="cler  inblock" style="margin-left: 81px;">
                         <p class="cler">
                           <span class="fll">
                                报备编号前缀
                             </span>
                           <input v-model="form3.报备编号前缀" class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       <div class="cler p-10" >
                         <p class="fll">
                           <span class="fll">
                               【成交人员2】改名
                             </span>
                           <input v-model="form3.成交人2改名" class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       <div class="cler  inblock" style="margin-left: 81px;">
                         <p class="cler">
                           <span class="fll">
                                认购编号前缀
                             </span>
                           <input v-model="form3.认购编号前缀" class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       
                       <div class="cler p-10" >
                         <p class="fll">
                           <span class="fll">
                               【成交人员3】改名
                             </span>
                           <input v-model="form3.成交人3改名" class="fll inputs" type="text" style="width:76px;">
                         </p>
                       </div>
                       
                     </div>
                   </div>
                 </el-form>
               </div>
             </div>
             <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="savemanegent" >保 存</span>
                <span class="right save-cancel-btn" type="primary" @click="initial(1)" >默 认</span>
             </div>
           </div>
         </el-tab-pane>
         <el-tab-pane label="客源" >
           <span slot="label">客源</span>
           <div >
             <div class="pop-up-container"  style="height: 431px;" >
               <div class="move-content" >
                 <el-form ref="formsData" :model="form4">
                   <div class="cler" >
                     <div class="clear" >
                       <div class="clear left" style="width:155px;padding:5px 5px 0 0;" v-for="(item,i) in form4.data" :key="i">
                        <div class="left" >
                          <input  v-model="item.paramData" style="" class="fll inblock" type="checkbox">
                        </div>
                        <div class="left"   >
                           
                          <span  style="">{{item.paramName}}</span>
                        </div>
                       </div>
                     </div>
                     <div class="fll cler" style="height: 125px;width: 520px;border-block-end: 1px solid;}">
                       <div class="cler inblock fll" style="height: 117px;border-right: 1px solid;" >
                         <div class="cler fll mat-10">
                           <input v-model="form4.电话查重警告" class="fll" type="checkbox">
                           <p class="fll">
                             <span class="fll" style="margin-top: -2px">新增客源进行【电话】查重警告</span>
                             <span class="fll" style="margin-top: -2px;color: #999999;">（速度慢）</span>
                           </p>
                         </div>
                         <div class="cler fll mat-10">
                           <input v-model="form4.身份证查重警告" class="fll" type="checkbox">
                           <p class="fll">
                             <span class="fll" style="margin-top: -2px">新增客源进行【身份证】查重警告</span>
                             <span class="fll" style="margin-top: -2px;color: #999999;">（速度慢）</span>
                           </p>
                         </div>
                         <div class="cler fll mat-10">
                           <input v-model="form4.重复客源拒绝保存" class="fll" type="checkbox">
                           <p class="fll">
                             <span class="fll" style="margin-top: -2px">【电话】或【身份证】重复客源拒绝保存</span>
                             <span class="fll" style="margin-top: -2px;color: #999999;">（速度慢）</span>
                           </p>
                         </div>
                        
                       </div>
                       <div style="height: 125px;">
                         <div class="" style="margin-top: -3px">
                           <p>
                             <span style="color:#800000 ">【所有客源】栏目改名：</span>
                           </p>
                         </div>
                         <div class="cler p-10 inblock" style=" margin-left: 12px;">
                           <p class="cler">
                           <span class="fll">
                               【归属人1】改名
                             </span>
                             <input v-model="form4.归属人1改名" class="fll inputs" type="text" style="width:76px;">
                           </p>
                         </div>
                         <div class="cler  inblock" style=" margin-top: 2px;margin-left: 12px;">
                           <p class="cler">
                           <span class="fll">
                               【归属人2】改名
                             </span>
                             <input v-model="form4.归属人2改名" class="fll inputs" type="text" style="width:76px;">
                           </p>
                         </div>
                         <div class="cler  inblock" style=" margin-top: 2px;margin-left: 31px;">
                           <p class="cler">
                           <span class="fll">
                               【付款】改名
                             </span>
                             <input v-model="form4.付款改名f4" class="fll inputs" type="text" style="width:76px;">
                           </p>
                         </div>
                         <div class="cler  inblock" style=" margin-top: 2px;margin-left: 31px;">
                           <p class="cler">
                           <span class="fll">
                               【付佣】改名
                             </span>
                             <input v-model="form4.付佣改名f4" class="fll inputs" type="text" style="width:76px;">
                           </p>
                         </div>
                       </div>
                     </div>
                     <div class="fll">
                       
                       <div class="cler fll mat-10">
                         <input v-model="form4.写跟进不可复制粘贴" class="fll" type="checkbox">
                         <p class="fll">
                           <span class="fll" style="margin-top: -2px">写跟进不可复制、粘贴</span>
                         </p>
                       </div>
                       <div class="cler fll mat-10">
                         <input v-model="form4.强制合并跟进记录f4" class="fll" type="checkbox">
                         <p class="fll">
                           <span class="fll" style="margin-top: -2px">强制合并【同人、同天、同客源】的跟进记录</span>
                         </p>
                       </div>
                       
                       
                       <div class="cler fll p-t-5" >
                           <i class="yuanc up-down fll" style="margin-left:-4px;margin-top: -1px"></i>
                           <span class="fll">
                                每人最多可拥有
                           </span>
                           <input v-model="form4.最多拥有私客" class="left inputs" style="width: 50px">
                           <span class="left" >条私客（0=不限制）：            </span>
                           <input v-model="form4.该限制只针对有效私客" class="left" type="checkbox">
                           <span class="fll" style="margin-top: -2px">该限制只针对有效私客</span>
                       </div>
                       <div class="cler fll p-t-5" >
                           <i class="yuanc up-down fll" style="margin-left:-4px;margin-top: -1px"></i>
                           <span class="fll">
                               每条客源每天【跟进】不超过
                           </span>
                           <input v-model="form4.跟进不超过次数" class="fll inputs" style="width: 50px">
                           <span class="fll" >次（0=不启用）            </span>
                       </div>
                       <div class="cler fll p-t-5" >
                           <i class="yuanc up-down fll" style="margin-left:-4px;margin-top: -1px"></i>
                           <span class="fll" style="color: #800000;">
                                求购客源的【最后跟进日】若超过
                           </span>
                           <input v-model="form4.显示红色超过天数" class="fll inputs" style="color: #800000;width: 50px">
                           <span class="fll" style="color: #800000;">天以红色显示（0=不启用/含租购） </span>
                       </div>
                       <div class="cler fll p-t-5" >
                           <i class="yuanc up-down fll" style="margin-left:-4px;margin-top: -1px"></i>
                           <span class="fll" style="color: #800000;">
                                求租客源的【最后跟进日】若超过
                           </span>
                           <input v-model="form4.显示红色超过天数2" class="fll inputs" style="color: #800000;width: 50px">
                           <span class="fll" style="color: #800000;">天以红色显示（0=不启用） </span>
                       </div>
                     </div>
                   </div>
                 </el-form>
               </div>
             </div>
             <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="savemanegent" >保 存</span>
                <span class="right save-cancel-btn" type="primary" @click="initial(1)" >默 认</span>
             </div>
           </div>
         </el-tab-pane>
         <el-tab-pane label="合同" >
           <span slot="label">合同</span>
           <div >
             <div class="pop-up-container"  style="height: 431px;" >
               <div class="move-content" >
                 <el-form ref="formsData" :model="form">
                   <div class="clear width_a" style=" ">
                     <div class="clear left p-t-10" style="width:270px"v-for="(item,i) in form5.data" :key="i">
                      <div class="left p-l-20" >
                        <input v-model="item.paramData"  type="checkbox" style="margin-top: 3px">
                      </div>
                      <div class="left" >    
                        <span class="fll"  >{{item.paramName}}</span>
                      </div>  
                     </div>
                     
                   </div>
                 </el-form>
               </div>
             </div>
             <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="savemanegent" >保 存</span>
                <span class="right save-cancel-btn" type="primary" @click="initial(1)" >默 认</span>
             </div>
           </div>
         </el-tab-pane>
         <el-tab-pane label="其他" >
           <span slot="label">其他</span>
           <div >
             <div class="pop-up-container"  style="height: 431px;" >
               <div class="move-content" >
                 <el-form ref="formsData" :model="form6">
                  <div class="clear"  >
                    <div class="left" style="width:200px;">
                      <div class="clear width_a " v-for="(item,i) in form6.data" :key="i" >
                        
                        <div v-if='item.paramName=="员工【电话】必填"' class="p-10 width_a">
                            <p>
                              <span class=" p-10" style="color:#800000 ">   在职状态下必填</span>
                            </p>
                            <div class="clear  p-10">
                              <input v-model="item.paramData" class="left" type="checkbox">
                              <p class="left">
                                <span  style="margin-top: -2px">{{item.paramName}}</span>
                              </p>
                            </div> 
                        </div>
                        <div v-else class="width_a">
                          
                            <div class="clear  p-10">
                              <input v-model="item.paramData" class="left" type="checkbox">
                              <p class="left">
                                <span  style="margin-top: -2px">{{item.paramName}}</span>
                              </p>
                            </div> 
                        </div>
                      </div>
                    </div>
                    <div class=" left " style="width:340px;">
                      <div class="p-10" >
                        <span style="color:#800000 ">【状态时间】栏目改名：</span>
                      </div>
                      <div class="clear p-10" >
                        <div class="clear left" style="padding: 5px 0 0 0px;" >
                            <span class="fll">
                              【入职】改名
                            </span>
                            <input v-model="form6.入职改名" maxLength="2" title="上限2位数" class="fll inputs" type="text" style="width:76px;">
                        </div>
                        <div class="clear left" style="padding: 5px 0 0 10px;">
                            <span class="fll">
                              【首上】改名
                            </span>
                            <input v-model="form6.首上改名" maxLength="2" title="上限2位数" class="fll inputs" type="text" style="width:76px;">
                        </div>
                        <div class="clear left" style="padding: 5px 0 0 0px;" >
                            <span class="fll">
                              【离职】改名
                            </span>
                            <input v-model="form6.离职改名" maxLength="2" title="上限2位数" class="fll inputs" type="text" style="width:76px;">
                        </div>
                        <div class="clear left" style="padding: 5px 0 0 10px;" >
                            <span class="fll">
                              【止薪】改名
                            </span>
                            <input v-model="form6.止薪改名" maxLength="2" title="上限2位数" class="fll inputs" type="text" style="width:76px;">
                        </div>
                        <div class="clear left" style="padding: 5px 0 0 0px;" >
                            <span class="fll">
                              【转正】改名
                            </span>
                            <input v-model="form6.转正改名" maxLength="2" title="上限2位数" class="fll inputs" type="text" style="width:76px;">
                        </div>
                        <div class="clear left" style="padding: 5px 0 0 10px;" >
                            <span class="fll sign-word">
                              （所有改名栏目不可为空！）
                            </span>
                        </div>
                      </div>
                        
                    </div>
                   </div>
                 
                 
                 
                 
                  <div class="break" style="margin-top:5px;width:540px;" >
                  </div> 
                 <div class="width_a">
                    <div class="mat-10">
                      <p>
                        <span style="color:#800000 ">【系统照片设置】：</span>
                      </p>
                    </div>
                    <div class="clear" >
                      <div class="clear  p-t-5" >
                        <div class="clear left ">
                          <div class="clear left" >
                            <i class="yuanc up-down " ></i>
                          </div>
                          <div class="clear left" >
                            <span >
                              图照/视频/文档水印文字
                            </span>
                          </div> 
                          <div class="clear left" >
                            <input v-model="form6.照片水印文字" class="fll inputs" type="text" style="width:96px;">
                          </div> 
                        </div>
                        <div class="clear left">
                          <div class="clear left" >
                            <i class="yuanc up-down " ></i>
                          </div>
                          <div class="clear left" >
                              水印位置/方式
                          </div>
                          <div class="clear left" >  
                            <select v-model="form6.照片水印位置"  style="width:70px;">
                              <option
                                v-for="item in posit"
                                :id="item.id"
                                :label="item.label"
                                :value="item.label">{{item.label}}
                              </option>
                            </select>
                          </div>  
                          <div class="clear left" >  
                            <select v-model="form6.方式"  style="width:100px;">
                              <option
                                v-for="item in styles"
                                :id="item.id"
                                :label="item.label"
                                :value="item.label">{{item.label}}
                              </option>
                            </select>
                          </div>  
                        </div>
                      </div>  
                      <div class="clear p-t-5">
                        <div class="left">
                          <i class="yuanc up-down " ></i>
                        </div>
                        <div class="left">  
                          <span >
                            单张图照文件大小不能超过
                          </span>
                        </div>
                        <div class="left">  
                          <select v-model="form6.照片文件大小" style="width:50px;">
                              <option
                              v-for="item in picture"
                              :id="item.id"
                              :label="item.label"
                              :value="item.label">{{item.label}}

                            </option>
                          </select>
                        </div>
                        
                        <div class="left">
                          k
                        </div>
                      </div>
                      <div class="clear p-t-5">
                        <div class="left">
                          <i class="yuanc up-down " ></i>
                        </div>
                        <div class="left">  
                          <span >
                            单条【房源/项目/报备/合同/楼盘】图照不能超过
                          </span>
                        </div>
                        <div class="left">  
                          <input v-model="form6.照片文件大小1" style="width:50px;" />
                              
                        </div>
                        
                        <div class="left">
                          张（0=不限制）
                        </div>
                      </div>
                      <div class="clear p-t-5">
                        <div class="left">
                          <i class="yuanc up-down " ></i>
                        </div>
                        <div class="left">  
                          <span >
                            单条【图文/任务/收支/行政记录】图照不能超过
                          </span>
                        </div>
                        <div class="left">  
                          <input v-model="form6.照片文件大小2" style="width:50px;" />
                              
                        </div>
                        
                        <div class="left">
                          张（0=不限制）
                        </div>
                      </div>
                      <div class="clear p-t-5">
                        <div class="left">
                          <i class="yuanc up-down " ></i>
                        </div>
                        <div class="left">  
                          <span >
                            单条【制度】图照不能超过
                          </span>
                        </div>
                        <div class="left">  
                          <input v-model="form6.照片文件大小3" style="width:50px;" />
                             
                        </div>
                        
                        <div class="left">
                         张（0=不限制）
                        </div>
                      </div>
                    </div>
                  </div>  
                 </el-form>
               </div>
             </div>
             <div slot="footer" class="dialog-footer clear" style="padding:5px 0;" >
                <span class="right save-cancel-btn" style="margin-right:0px;" @click="cancelData">取 消</span>
                <span class="right save-cancel-btn" type="primary" @click="savemanegent" >保 存</span>
                <span class="right save-cancel-btn" type="primary" @click="initial(1)" >默 认</span>
             </div>
           </div>
         </el-tab-pane>
       </el-tabs>

     </div>
    <div class="clear footerabsoluteclass">
      <div class="left footerabsoluteclasschild" >
        <span class="record-word footerpaddingleft10">最后修改:</span>
        <span v-if="form.UpdateBy" class="record-word">{{form.UpdateBy}}</span>
        <span v-if="form.UpdateTime" class="record-word">{{form.UpdateTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {updateSystemSets,getSystemSets} from '../../../service/mangentDate'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name: 'manchoose',
    props:["layerid"],
    data() {
      return {
        dialogMangent:false,
        molist:[{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        },{
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        },],
        houlist: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }],
        picture:[{
          value: '50',
          label: '50'
        },{
          value: '75',
          label: '75'
        },{
          value: '100',
          label: '100'
        },{
          value: '150',
          label: '150'
        },{
          value: '200',
          label: '200'
        },{
          value: '300',
          label: '300'
        },{
          value: '400',
          label: '400'
        },{
          value: '500',
          label: '500'
        },
        ],
        size:[{
          value: '0',
          label: '自定义'
        },{
          value: '320',
          label: '320'
        },{
          value: '480',
          label: '480'
        },{
          value: '560',
          label: '560'
        },{
          value: '640',
          label: '640'
        },{
          value: '800',
          label: '800'
        },{
          value: '900',
          label: '900'
        },{
          value: '1000',
          label: '1000'
        },
          {
            value: '1100',
            label: '1100'
          },
          {
            value: '1200',
            label: '1200'
          },
        ],
        posit:[{
          value: '0',
          label: '自定义'
        },{
          value: '1',
          label: '居中'
        },{
          value: '2',
          label: '左上'
        },{
          value: '3',
          label: '左下'
        },{
          value: '4',
          label: '右上'
        },{
          value: '5',
          label: '右下'
        },
        ],
        styles:[{
          value: '0',
          label: '不必加水印'
        },{
          value: '1',
          label: '提示加水印'
        },{
          value: '2',
          label: '强制加水印'
        },
        ],
        form:{
          value: '3',
          UpdateBy:'',
          UpdateTime:'',
          data:[
            {
              clas:1,
              paramData:false,
              paramName:"新增房源默认为【私盘】",
              type:1,
            },
            {
              clas:1,
              paramData:false,
              paramName:"新增房源可选【公盘/私盘】",
              type:1,
            },
            {
              clas:1,
              paramData:false,
              paramName:"新增房源受部门权限【地理区域】限制",
              type:1,
            },
            {
              clas:1,
              paramData:true,
              paramName:"房源【栋座】必填（住宅）",
              type:1,
            },
            {
              clas:1,
              paramData:true,
              paramName:"房源【房型】必填（住宅）",
              type:1,
            },
            {
              clas:2,
              paramData:true,
              paramName:"【装修】必填",
              type:1,
            },
            {
              clas:2,
              paramData:true,
              paramName:"房源【价格】必填",
              type:1,
            },
            {
              clas:2,
              paramData:true,
              paramName:"房源【总层】必填",
              type:1,
            },
            {
              clas:2,
              paramData:true,
              paramName:"房源业主【手机】必填",
              type:1,
            },
            {
              clas:3,
              paramData:true,
              paramName:"房源【面积】必填",
              type:1,
            },
            {
              clas:3,
              paramData:true,
              paramName:"房源【楼层】必填",
              type:1,
            },
            {
              clas:3,
              paramData:true,
              paramName:"【来源】必填",
              type:1,
            },
          ],
          私盘查看1:false,
          房源部分修改1:false,
          私盘查看2:false,
          房源部分修改2:false,
          最多可新增房源:"0",
          最多可拥有私盘1:"5",
          最多可拥有私盘2:"25",
          该限制只针对有效私盘:false,
          默认显示列表配对:"",
          优质房置顶显示:true,
          每人每部门:1,
        },
        form1: {
            遮盖栋座:true,
            遮盖房号:true,
            遮盖照片:false,
            看房源不计次数:false,
          租售合并次数计算:false,
          看业主不超过次数:"0",
          写跟进不可粘贴复制:true,
          统计跟进包含带看:true,
          强制合并跟进记录:false,
          写跟进更新房源:true,
          第一归属人更新房源:false,
          跟进字数:"6",
          超过天数变黄色1:"5",
          超过天数变红色1:"7",
          超过天数变黄色2:"3",
          超过天数变红色2:"5",
          超过天数变黄色3:"3",
          超过天数变红色3:"5",
        },
        form2:{
           房源价格标志:"30",
           租金单价单位1:1,
           租金单价单位2:1,
           单选框里的下拉1:1,
          单选框里的下拉2:3,
           照片文件大小:"500",
          照片缩放尺寸:"1000",
          照片不超过张数:"15",
          照片水印位置:"居中",
          照片水印文字:"华郡地产",
          方式:"强制加水印",
          面积改名:"",
          委托编号:"",
          归属人1改名:"",
          归属人2改名:"",
          归属人3改名:"",
          房产证改名:"",
          付款改名:"",
          国籍改名:"",
          付佣改名:"",
          现状改名:"",
          产权改名:"",
          付款1改名:"",
          付款2改名:"",
          装修改名:"",
        },
        form3:{
            报备不必关联:false,
            报备不必传照片:false,
            不必上传确认单:false,
           认筹不关联客源:false,
          认购不关联客源:false,
          认购不关联客源报备:false,
          合同不关联认购信息:false,
          报备确认不上传照片:false,
          成交人1改名:"",
          成交人2改名:"",
          成交人3改名:"",
          新房编号前缀:"",
          报备编号前缀:"",
          认购编号前缀:"",
          默认列表配对:3,
        },
        form4:{
          data:[
            {
              clas:1,
              paramData:true,
              paramName:"新增客源默认为【私客】",
              type:5,
            },
            {
              clas:2,
              paramData:false,
              paramName:"客源【状态】必填",
              type:5,
            },
            {
              clas:3,
              paramData:false,
              paramName:"客源【类别】必填",
              type:5,
            },
            {
              clas:1,
              paramData:true,
              paramName:"客源【价格】必填",
              type:5,
            },
            {
              clas:1,
              paramData:false,
              paramName:"客源【期限】必填",
              type:5,
            },
            
            
            {
              clas:2,
              paramData:true,
              paramName:"客源【面积】必填",
              type:5,
            },
            {
              clas:2,
              paramData:true,
              paramName:"客源【来源】必填",
              type:5,
            },

           
            

          ],
          电话查重警告:true,
          身份证查重警告:false,
          重复客源拒绝保存:false,
          非数字符号:true,
          私客查看:false,
          归属人1改名:"",
          归属人2改名:"",
          付款改名f4:"付款",
          付佣改名f4:"付佣",
          修改客户电话:true,
          写跟进不可复制粘贴:false,
          强制合并跟进记录f4:false,
          跟新客源最后跟进日:true,
          默认列表配对:"3",
          最多拥有私客:"1",
          该限制只针对有效私客:false,
          跟进不超过次数:"0",
          优质客置顶显示:true,
          显示红色超过天数:"14",
          显示红色超过天数2:"7",

        },
        form5:{
          data:[
            {
              clas:1,
              paramData:false,
              paramName:"新增合同必须选择【关联房源】",
              type:6,
            },
             {
              clas:2,
              paramData:false,
              paramName:"合同【电话】必填",
              type:6,
            },
            {
              clas:1,
              paramData:false,
              paramName:"新增合同必须选择【关联客源】",
              type:6,
            },
            {
              clas:2,
              paramData:false,
              paramName:"合同【身份证】必填",
              type:6,
            },
           
            {
              clas:1,
              paramData:false,
              paramName:"业绩分成比例合计不足【100%】拒绝保存",
              type:6,
            },
            
          ],
          文件大小不超过:"500",
          合同照片缩放:"1000",
          合同照片不超过:"0",
        },
        form6:{
          data:[
            
            {
              clas:0,
              paramData:false,
              paramName:"员工【电话】必填",
              type:7,
            },
            {
              clas:0,
              paramData:false,
              paramName:"员工【地址】必填",
              type:7,
            },
            {
              clas:0,
              paramData:false,
              paramName:"员工【农历生日】必填",
              type:7,
            },
            {
              clas:0,
              paramData:false,
              paramName:"员工【身份证】必填",
              type:7,
            },
          ],
          入职改名:"入职",
          首上改名:"首上",
          转正改名:"转正",
          离职改名:"离职",
          止薪改名:"止薪",
          照片水印文字:"华郡地产",
          照片水印位置:"",
          方式:"",
          照片文件大小:"300",
          照片文件大小1:"15",
          照片文件大小2:"15",
          照片文件大小3:"15",
        }


      };
    },
    
    methods:{
      initial(num){
        let _this=this

        getSystemSets().then(function (res) {
          _this.form.UpdateBy = res.data.operate.UpdateBy;
          _this.form.UpdateTime = res.data.operate.UpdateTime;
          var init1=[]
          var  init5=[]
          var  init6=[]
          var  init7={};
          let aarr=""
          if(num==1){
            aarr=res.data.default
          }else {
            aarr=res.data.ret
          }
          for(var i=0;aarr.length>i;i++){
            if(aarr[i].paramData=="true"){
              aarr[i].paramData=true
            }
            if(aarr[i].paramData=="false"){
              aarr[i].paramData=false
            }
            if(aarr[i].clas=="1"){
              aarr[i].clas=1
            }else if(aarr[i].clas=="2"){
              aarr[i].clas=2
            }else if(aarr[i].clas=="3"){
              aarr[i].clas=3
            }else if(aarr[i].clas=="0"){
              aarr[i].clas=0
            }
            if(aarr[i].type=="1"&&aarr[i].clas!=0){
              init1.push(aarr[i])
            }
            if(aarr[i].type=="5"&&aarr[i].clas!=0){
              init5.push(aarr[i])
            }
            if(aarr[i].type=="6"){
              if(aarr[i].paramName == '新增合同必须选择【关联房源】' || aarr[i].paramName == '合同【电话】必填' || 
                aarr[i].paramName == '新增合同必须选择【关联客源】' || aarr[i].paramName == '合同【身份证】必填'  ||
                aarr[i].paramName == '业绩分成比例合计不足【100%】拒绝保存'
              ){
                 debugger;
                 let formData5 = _this.form5.data;
                 formData5.forEach(item => {
                   if(item.paramName == aarr[i].paramName){
                     if(aarr[i].paramData == true){
                       item.paramData = true;
                     }else{
                       item.paramData = false;
                     }
                   }
                 })  
              }
             
            }
            if(aarr[i].type==7){
              if(aarr[i].paramName == '员工【电话】必填' || aarr[i].paramName == '员工【地址】必填' || 
                aarr[i].paramName == '员工【农历生日】必填' || aarr[i].paramName == '员工【入职】必填'  ||
                aarr[i].paramName == '员工【身份证】必填'
              ){
                
                init7[aarr[i].paramName] = aarr[i];
              }else{
                _this.form6[aarr[i].paramName] = aarr[i].paramData;  
                 
              }
              
            }
            //type1
            if(aarr[i].paramName=="私盘查看1"&&aarr[i].type=="1"){
              _this.form.私盘查看1=aarr[i].paramData
            }
            if(aarr[i].paramName=="房源部分修改1"&&aarr[i].type=="1"){
              _this.form.房源部分修改1=aarr[i].paramData
            }
            if(aarr[i].paramName=="私盘查看2"&&aarr[i].type=="1"){
              _this.form.私盘查看2=aarr[i].paramData
            }
            if(aarr[i].paramName=="房源部分修改2"&&aarr[i].type=="1"){
              _this.form.房源部分修改2=aarr[i].paramData
            }
            if(aarr[i].paramName=="最多可新增房源"&&aarr[i].type=="1"){
              _this.form.最多可新增房源=aarr[i].paramData
            }
            if(aarr[i].paramName=="最多可拥有私盘1"&&aarr[i].type=="1"){
              _this.form.最多可拥有私盘1=aarr[i].paramData
            }
            if(aarr[i].paramName=="最多可拥有私盘2"&&aarr[i].type=="1"){
              _this.form.最多可拥有私盘2=aarr[i].paramData
            }
            if(aarr[i].paramName=="该限制只针对有效私盘"&&aarr[i].type=="1"){
              _this.form.该限制只针对有效私盘=aarr[i].paramData
            }
            if(aarr[i].paramName=="默认显示列表配对"&&aarr[i].type=="1"){
              _this.form.默认显示列表配对=aarr[i].paramData
            }
            if(aarr[i].paramName=="优质房置顶显示"&&aarr[i].type=="1"){
              _this.form.优质房置顶显示=aarr[i].paramData
            }
            if(aarr[i].paramName=="每人每部门"&&aarr[i].type=="1"){
              _this.form.每人每部门=aarr[i].paramData
            }
            //type2

            if(aarr[i].paramName=="遮盖栋座"&&aarr[i].type=="2"){
              _this.form1.遮盖栋座=aarr[i].paramData
            }
            if(aarr[i].paramName=="遮盖房号"&&aarr[i].type=="2"){
              _this.form1.遮盖房号=aarr[i].paramData
            }
            if(aarr[i].paramName=="遮盖照片"&&aarr[i].type=="2"){
              _this.form1.遮盖照片=aarr[i].paramData
            }
            if(aarr[i].paramName=="看房源不计次数"&&aarr[i].type=="2"){
              _this.form1.看房源不计次数=aarr[i].paramData
            }
            if(aarr[i].paramName=="租售合并次数计算"&&aarr[i].type=="2"){
              _this.form1.租售合并次数计算=aarr[i].paramData
            }
            if(aarr[i].paramName=="看业主不超过次数"&&aarr[i].type=="2"){
              _this.form1.看业主不超过次数=aarr[i].paramData
            }
            if(aarr[i].paramName=="写跟进不可粘贴复制"&&aarr[i].type=="2"){
              _this.form1.写跟进不可粘贴复制=aarr[i].paramData
            }
            if(aarr[i].paramName=="统计跟进包含带看"&&aarr[i].type=="2"){
              _this.form1.统计跟进包含带看=aarr[i].paramData
            }

            
            if(aarr[i].paramName=="强制合并跟进记录"&&aarr[i].type=="2"){
              _this.form1.强制合并跟进记录=aarr[i].paramData
            }
            if(aarr[i].paramName=="第一归属人更新房源"&&aarr[i].type=="2"){
              _this.form1.第一归属人更新房源=aarr[i].paramData
            }
            if(aarr[i].paramName=="写跟进更新房源"&&aarr[i].type=="2"){
              _this.form1.写跟进更新房源=aarr[i].paramData
            }
            if(aarr[i].paramName=="跟进字数"&&aarr[i].type=="2"){
              _this.form1.跟进字数=aarr[i].paramData
            }
            if(aarr[i].paramName=="超过天数变黄色1"&&aarr[i].type=="2"){
              _this.form1.超过天数变黄色1=aarr[i].paramData
            }
            if(aarr[i].paramName=="超过天数变红色1"&&aarr[i].type=="2"){
              _this.form1.超过天数变红色1=aarr[i].paramData
            }
            if(aarr[i].paramName=="超过天数变黄色2"&&aarr[i].type=="2"){
              _this.form1.超过天数变黄色2=aarr[i].paramData
            }
            if(aarr[i].paramName=="超过天数变红色2"&&aarr[i].type=="2"){
              _this.form1.超过天数变红色2=aarr[i].paramData
            }
            if(aarr[i].paramName=="超过天数变黄色3"&&aarr[i].type=="2"){
              _this.form1.超过天数变黄色3=aarr[i].paramData
            }
            if(aarr[i].paramName=="超过天数变红色3"&&aarr[i].type=="2"){
              _this.form1.超过天数变红色3=aarr[i].paramData
            }
            //type3
            if(aarr[i].paramName=="房源价格标志"&&aarr[i].type=="3"){
              _this.form2.房源价格标志=aarr[i].paramData
            }
            if(aarr[i].paramName=="租金单价单位1"&&aarr[i].type=="3"){
              _this.form2.租金单价单位1=aarr[i].paramData
            }
            if(aarr[i].paramName=="单选框里的下拉1"&&aarr[i].type=="3"){
              _this.form2.单选框里的下拉1=aarr[i].paramData
            }
            if(aarr[i].paramName=="租金单价单位2"&&aarr[i].type=="3"){
              _this.form2.租金单价单位2=aarr[i].paramData
            }
            if(aarr[i].paramName=="单选框里的下拉2"&&aarr[i].type=="3"){
              _this.form2.单选框里的下拉2=aarr[i].paramData
            }
            if(aarr[i].paramName=="照片文件大小"&&aarr[i].type=="3"){
              _this.form2.照片文件大小=aarr[i].paramData
            }
            if(aarr[i].paramName=="照片缩放尺寸"&&aarr[i].type=="3"){
              _this.form2.照片缩放尺寸=aarr[i].paramData
            }
            if(aarr[i].paramName=="照片不超过张数"&&aarr[i].type=="3"){
              _this.form2.照片不超过张数=aarr[i].paramData
            }
            if(aarr[i].paramName=="照片水印位置"&&aarr[i].type=="3"){
              _this.form2.照片水印位置=aarr[i].paramData
            }
            if(aarr[i].paramName=="照片水印文字"&&aarr[i].type=="3"){
              _this.form2.照片水印文字=aarr[i].paramData
            }
            if(aarr[i].paramName=="方式"&&aarr[i].type=="3"){
              _this.form2.方式=aarr[i].paramData
            }
            if(aarr[i].paramName=="面积改名"&&aarr[i].type=="3"){
              _this.form2.面积改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="委托编号"&&aarr[i].type=="3"){
              _this.form2.委托编号=aarr[i].paramData
            }
            if(aarr[i].paramName=="归属人1改名"&&aarr[i].type=="3"){
              _this.form2.归属人1改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="归属人2改名"&&aarr[i].type=="3"){
              _this.form2.归属人2改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="归属人3改名"&&aarr[i].type=="3"){
              _this.form2.归属人3改名=aarr[i].paramData
            }

            if(aarr[i].paramName=="房产证改名"&&aarr[i].type=="3"){
              _this.form2.房产证改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="付款改名"&&aarr[i].type=="3"){
              _this.form2.付款改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="国籍改名"&&aarr[i].type=="3"){
              _this.form2.国籍改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="付佣改名"&&aarr[i].type=="3"){
              _this.form2.付佣改名=aarr[i].paramData
            }

            if(aarr[i].paramName=="现状改名"&&aarr[i].type=="3"){
              _this.form2.现状改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="产权改名"&&aarr[i].type=="3"){
              _this.form2.产权改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="付款1改名"&&aarr[i].type=="3"){
              _this.form2.付款1改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="付款2改名"&&aarr[i].type=="3"){
              _this.form2.付款2改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="装修改名"&&aarr[i].type=="3"){
              _this.form2.装修改名=aarr[i].paramData
            }



            //type4
            if(aarr[i].paramName=="报备不必关联"&&aarr[i].type=="4"){
              _this.form3.报备不必关联=aarr[i].paramData
            }
            if(aarr[i].paramName=="报备不必传照片"&&aarr[i].type=="4"){
              _this.form3.报备不必传照片=aarr[i].paramData
            }
            if(aarr[i].paramName=="不必上传确认单"&&aarr[i].type=="4"){
              _this.form3.不必上传确认单=aarr[i].paramData
            }
            if(aarr[i].paramName=="认筹不关联客源"&&aarr[i].type=="4"){
              _this.form3.认筹不关联客源=aarr[i].paramData
            }
            if(aarr[i].paramName=="认购不关联客源"&&aarr[i].type=="4"){
              _this.form3.认购不关联客源=aarr[i].paramData
            }
            if(aarr[i].paramName=="认购不关联客源报备"&&aarr[i].type=="4"){
              _this.form3.认购不关联客源报备=aarr[i].paramData
            }
            if(aarr[i].paramName=="合同不关联认购信息"&&aarr[i].type=="4"){
              _this.form3.合同不关联认购信息=aarr[i].paramData
            }
            if(aarr[i].paramName=="报备确认不上传照片"&&aarr[i].type=="4"){
              _this.form3.报备确认不上传照片=aarr[i].paramData
            }
            if(aarr[i].paramName=="成交人1改名"&&aarr[i].type=="4"){
              _this.form3.成交人1改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="成交人2改名"&&aarr[i].type=="4"){
              _this.form3.成交人2改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="成交人3改名"&&aarr[i].type=="4"){
              _this.form3.成交人3改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="新房编号前缀"&&aarr[i].type=="4"){
              _this.form3.新房编号前缀=aarr[i].paramData
            }
            if(aarr[i].paramName=="报备编号前缀"&&aarr[i].type=="4"){
              _this.form3.报备编号前缀=aarr[i].paramData
            }
            if(aarr[i].paramName=="认购编号前缀"&&aarr[i].type=="4"){
              _this.form3.认购编号前缀=aarr[i].paramData
            }
           
            if(aarr[i].paramName=="默认列表配对3"&&aarr[i].type=="4"){
              _this.form3.默认列表配对3=aarr[i].paramData
            }
            //type5
            if(aarr[i].paramName=="电话查重警告"&&aarr[i].type=="5"){
              _this.form4.电话查重警告=aarr[i].paramData
            }
            if(aarr[i].paramName=="身份证查重警告"&&aarr[i].type=="5"){
              _this.form4.身份证查重警告=aarr[i].paramData
            }
            if(aarr[i].paramName=="重复客源拒绝保存"&&aarr[i].type=="5"){
              _this.form4.重复客源拒绝保存=aarr[i].paramData
            }
            if(aarr[i].paramName=="非数字符号"&&aarr[i].type=="5"){
              _this.form4.非数字符号=aarr[i].paramData
            }
            if(aarr[i].paramName=="私客查看"&&aarr[i].type=="5"){
              _this.form4.私客查看=aarr[i].paramData
            }
            if(aarr[i].paramName=="归属人1改名"&&aarr[i].type=="5"){
              _this.form4.归属人1改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="归属人2改名"&&aarr[i].type=="5"){
              _this.form4.归属人2改名=aarr[i].paramData
            }
            if(aarr[i].paramName=="付款改名f4"&&aarr[i].type=="5"){
              _this.form4.付款改名f4=aarr[i].paramData
            }
            if(aarr[i].paramName=="付佣改名f4"&&aarr[i].type=="5"){
              _this.form4.付佣改名f4=aarr[i].paramData
            }
            if(aarr[i].paramName=="修改客户电话"&&aarr[i].type=="5"){
              _this.form4.修改客户电话=aarr[i].paramData
            }
            if(aarr[i].paramName=="写跟进不可复制粘贴"&&aarr[i].type=="5"){
              _this.form4.写跟进不可复制粘贴=aarr[i].paramData
            }
            if(aarr[i].paramName=="强制合并跟进记录f4"&&aarr[i].type=="5"){
              _this.form4.强制合并跟进记录f4=aarr[i].paramData
            }
            if(aarr[i].paramName=="默认列表配对f4"&&aarr[i].type=="5"){
              _this.form4.默认列表配对f4=aarr[i].paramData
            }
            if(aarr[i].paramName=="最多拥有私客"&&aarr[i].type=="5"){
              _this.form4.最多拥有私客=aarr[i].paramData
            }
            if(aarr[i].paramName=="该限制只针对有效私客"&&aarr[i].type=="5"){
              _this.form4.该限制只针对有效私客=aarr[i].paramData
            }
            if(aarr[i].paramName=="跟进不超过次数"&&aarr[i].type=="5"){
              _this.form4.跟进不超过次数=aarr[i].paramData
            }
            if(aarr[i].paramName=="优质客置顶显示"&&aarr[i].type=="5"){
              _this.form4.优质客置顶显示=aarr[i].paramData
            }
            if(aarr[i].paramName=="跟新客源最后跟进日"&&aarr[i].type=="5"){
              _this.form4.跟新客源最后跟进日=aarr[i].paramData
            }

            if(aarr[i].paramName=="显示红色超过天数"&&aarr[i].type=="5"){
              _this.form4.显示红色超过天数=aarr[i].paramData
            }
            if(aarr[i].paramName=="显示红色超过天数2"&&aarr[i].type=="5"){
              _this.form4.显示红色超过天数2=aarr[i].paramData
            }
            //type6
            if(aarr[i].paramName=="文件大小不超过"&&aarr[i].type=="6"){
              _this.form5.文件大小不超过=aarr[i].paramData
            }
            if(aarr[i].paramName=="合同照片缩放"&&aarr[i].type=="6"){
              _this.form5.合同照片缩放=aarr[i].paramData
            }
            if(aarr[i].paramName=="合同照片不超过"&&aarr[i].type=="6"){
              _this.form5.合同照片不超过=aarr[i].paramData
            }
          }
          _this.form.data=init1
          _this.form4.data=init5
          let getInit7 = _this.form6.data;
          getInit7.forEach(item => {
            let elemData = init7[item.paramName];
            if(elemData){
               item.paramData = elemData.paramData;
            }
           
          })
          _this.form6.data=getInit7;

        })
      },
     
      savemanegent(){
        let _this=this
        let 私盘查看1=this.form.私盘查看1
        let 房源部分修改1=this.form.房源部分修改1
        let 私盘查看2=this.form.私盘查看2
        let 房源部分修改2=this.form.房源部分修改2
        let 最多可新增房源=this.form.最多可新增房源
        let 最多可拥有私盘1=this.form.最多可拥有私盘1
        let 最多可拥有私盘2=this.form.最多可拥有私盘2
        let 该限制只针对有效私盘=this.form.该限制只针对有效私盘
        let 默认显示列表配对=this.form.默认显示列表配对
        let 优质房置顶显示=this.form.优质房置顶显示
        let 每人每部门=this.form.每人每部门
        let arr=[ {clas:0,  paramData:私盘查看1, paramName:"私盘查看1", type:1,},{clas:0,  paramData:房源部分修改1, paramName:"房源部分修改1", type:1,},
           {clas:0,  paramData:私盘查看2, paramName:"私盘查看2", type:1,},{clas:0,  paramData:房源部分修改2, paramName:"房源部分修改2", type:1,},
           {clas:0,  paramData:最多可新增房源, paramName:"最多可新增房源", type:1,},{clas:0,  paramData:最多可拥有私盘1, paramName:"最多可拥有私盘1", type:1,},
           {clas:0,  paramData:最多可拥有私盘2, paramName:"最多可拥有私盘2", type:1,},{clas:0,  paramData:该限制只针对有效私盘, paramName:"该限制只针对有效私盘", type:1,},
           {clas:0,  paramData:默认显示列表配对, paramName:"默认显示列表配对", type:1,},{clas:0,  paramData:优质房置顶显示, paramName:"优质房置顶显示", type:1,},
           {clas:0,  paramData:每人每部门, paramName:"每人每部门", type:1,},
        ]
         let nn=this.form.data.concat(arr)

         let 遮盖栋座=this.form1.遮盖栋座
         let 遮盖房号=this.form1.遮盖房号
         let 遮盖照片=this.form1.遮盖照片
         let 看房源不计次数=this.form1.看房源不计次数
         let 租售合并次数计算=this.form1.租售合并次数计算
         let 看业主不超过次数=this.form1.看业主不超过次数
         let 写跟进不可粘贴复制=this.form1.写跟进不可粘贴复制
         let 统计跟进包含带看 = this.form1.统计跟进包含带看;
         let 强制合并跟进记录=this.form1.强制合并跟进记录
         let 写跟进更新房源=this.form1.写跟进更新房源
         let 第一归属人更新房源=this.form1.第一归属人更新房源
         let 跟进字数=this.form1.跟进字数
         let 超过天数变黄色1=this.form1.超过天数变黄色1
         let 超过天数变红色1=this.form1.超过天数变红色1
         let 超过天数变黄色2=this.form1.超过天数变黄色2
         let 超过天数变红色2=this.form1.超过天数变红色2
         let 超过天数变黄色3=this.form1.超过天数变黄色3
         let 超过天数变红色3=this.form1.超过天数变红色3
         var arr1=[ {clas:0,  paramData:遮盖栋座, paramName:"遮盖栋座", type:2,},{clas:0,  paramData:遮盖房号, paramName:"遮盖房号", type:2,},
            {clas:0,  paramData:遮盖照片, paramName:"遮盖照片", type:2,},{clas:0,  paramData:看房源不计次数, paramName:"看房源不计次数", type:2,},
            {clas:0,  paramData:租售合并次数计算, paramName:"租售合并次数计算", type:2,},{clas:0,  paramData:看业主不超过次数, paramName:"看业主不超过次数", type:2,},
            {clas:0,  paramData:写跟进不可粘贴复制, paramName:"写跟进不可粘贴复制", type:2,},
            {clas:0,  paramData:统计跟进包含带看, paramName:"统计跟进包含带看", type:2,},
            
            {clas:0,  paramData:强制合并跟进记录, paramName:"强制合并跟进记录", type:2,},
            {clas:0,  paramData:写跟进更新房源, paramName:"写跟进更新房源", type:2,},{clas:0,  paramData:第一归属人更新房源, paramName:"第一归属人更新房源", type:2,},
            {clas:0,  paramData:跟进字数, paramName:"跟进字数", type:2,},
            {clas:0,  paramData:超过天数变黄色1, paramName:"超过天数变黄色1", type:2,},{clas:0,  paramData:超过天数变红色1, paramName:"超过天数变红色1", type:2,},
            {clas:0,  paramData:超过天数变黄色2, paramName:"超过天数变黄色2", type:2,},{clas:0,  paramData:超过天数变红色2, paramName:"超过天数变红色2", type:2,},
            {clas:0,  paramData:超过天数变黄色3, paramName:"超过天数变黄色3", type:2,},{clas:0,  paramData:超过天数变红色3, paramName:"超过天数变红色3", type:2,},
        ]
        let ss=nn.concat(arr1)
        let 房源价格标志=this.form2.房源价格标志
        let 租金单价单位1=this.form2.租金单价单位1
        let 单选框里的下拉1=this.form2.单选框里的下拉1
        let 租金单价单位2=this.form2.租金单价单位2
        let 单选框里的下拉2=this.form2.单选框里的下拉2
       let 照片文件大小=this.form2.照片文件大小
       let 照片缩放尺寸=this.form2.照片缩放尺寸
       let 照片不超过张数=this.form2.照片不超过张数
       let 照片水印位置=this.form2.照片水印位置
       let 照片水印文字=this.form2.照片水印文字
       let 方式=this.form2.方式
       let 面积改名=this.form2.面积改名
       let 委托编号=this.form2.委托编号
       let 归属人1改名=this.form2.归属人1改名
       let 归属人2改名=this.form2.归属人2改名
       let 归属人3改名=this.form2.归属人3改名
       let 房产证改名=this.form2.房产证改名
       let 付款改名=this.form2.付款改名
       let 国籍改名=this.form2.国籍改名
       let 付佣改名=this.form2.付佣改名;
       
       let 现状改名=this.form2.现状改名;
       let 产权改名=this.form2.产权改名;
       let 付款1改名=this.form2.付款1改名;
       let 付款2改名=this.form2.付款2改名;
       let 装修改名=this.form2.装修改名; 


        let arr2=[ {clas:0,  paramData:房源价格标志, paramName:"房源价格标志", type:3,},{clas:0,  paramData:租金单价单位1, paramName:"租金单价单位1", type:3,},
            {clas:0,  paramData:单选框里的下拉1, paramName:"单选框里的下拉1", type:3,},{clas:0,  paramData:租金单价单位2, paramName:"租金单价单位2", type:3,},
            {clas:0,  paramData:单选框里的下拉2, paramName:"单选框里的下拉2", type:3,},{clas:0,  paramData:照片文件大小, paramName:"照片文件大小", type:3,},
            {clas:0,  paramData:照片缩放尺寸, paramName:"照片缩放尺寸", type:3,},{clas:0,  paramData:照片不超过张数, paramName:"照片不超过张数", type:3,},
            {clas:0,  paramData:照片水印位置, paramName:"照片水印位置", type:3,},{clas:0,  paramData:照片水印文字, paramName:"照片水印文字", type:3,},
            {clas:0,  paramData:方式, paramName:"方式", type:3,},{clas:0,  paramData:面积改名, paramName:"面积改名", type:3,},
            {clas:0,  paramData:委托编号, paramName:"委托编号", type:3,},{clas:0,  paramData:付佣改名, paramName:"付佣改名", type:3,},
            {clas:0,  paramData:归属人1改名, paramName:"归属人1改名", type:3,},{clas:0,  paramData:归属人2改名, paramName:"归属人2改名", type:3,},
            {clas:0,  paramData:归属人3改名, paramName:"归属人3改名", type:3,},{clas:0,  paramData:房产证改名, paramName:"房产证改名", type:3,},
            {clas:0,  paramData:付款改名, paramName:"付款改名", type:3,},
            
            {clas:0,  paramData:现状改名, paramName:"现状改名", type:3,},
            {clas:0,  paramData:产权改名, paramName:"产权改名", type:3,},
            {clas:0,  paramData:付款1改名, paramName:"付款1改名", type:3,},
            {clas:0,  paramData:付款2改名, paramName:"付款2改名", type:3,},
            {clas:0,  paramData:装修改名, paramName:"装修改名", type:3,},
            
            {clas:0,  paramData:国籍改名, paramName:"国籍改名", type:3,},
     ]
      let gg=ss.concat(arr2)
      let 报备不必关联=this.form3.报备不必关联
      let 报备不必传照片=this.form3.报备不必传照片
      let 不必上传确认单=this.form3.不必上传确认单
      let 认筹不关联客源=this.form3.认筹不关联客源
      let 认购不关联客源=this.form3.认购不关联客源
      let 认购不关联客源报备=this.form3.认购不关联客源报备
      let 合同不关联认购信息=this.form3.合同不关联认购信息
      let 报备确认不上传照片=this.form3.报备确认不上传照片
      let 成交人1改名=this.form3.成交人1改名
      let 成交人2改名=this.form3.成交人2改名
      let 成交人3改名=this.form3.成交人3改名
      let 新房编号前缀=this.form3.新房编号前缀
      let 报备编号前缀=this.form3.报备编号前缀
      let 认购编号前缀=this.form3.认购编号前缀
      let 默认列表配对3=this.form3.默认列表配对3
        let arr3=[ {clas:0,  paramData:报备不必关联, paramName:"报备不必关联", type:4,},{clas:0,  paramData:成交人2改名, paramName:"成交人2改名", type:4,},
                {clas:0,  paramData:报备不必传照片, paramName:"报备不必传照片", type:4,},{clas:0,  paramData:成交人3改名, paramName:"成交人3改名", type:4,},
                {clas:0,  paramData:不必上传确认单, paramName:"不必上传确认单", type:4,},{clas:0,  paramData:新房编号前缀, paramName:"新房编号前缀", type:4,},
                {clas:0,  paramData:认筹不关联客源, paramName:"认筹不关联客源", type:4,},{clas:0,  paramData:报备编号前缀, paramName:"报备编号前缀", type:4,},
                {clas:0,  paramData:认购不关联客源, paramName:"认购不关联客源", type:4,},{clas:0,  paramData:认购编号前缀, paramName:"认购编号前缀", type:4,},
                {clas:0,  paramData:认购不关联客源报备, paramName:"认购不关联客源报备", type:4,},{clas:0,  paramData:默认列表配对3, paramName:"默认列表配对3", type:4,},
                {clas:0,  paramData:合同不关联认购信息, paramName:"合同不关联认购信息", type:4,},{clas:0,  paramData:成交人1改名, paramName:"成交人1改名", type:4,},
                {clas:0,  paramData:报备确认不上传照片, paramName:"报备确认不上传照片", type:4,},
           ]
            let oo=gg.concat(arr3)
            let 电话查重警告=this.form4.电话查重警告
            let 身份证查重警告=this.form4.身份证查重警告
            let 重复客源拒绝保存=this.form4.重复客源拒绝保存
            let 非数字符号=this.form4.非数字符号
            let 私客查看=this.form4.私客查看
            let 归属人1改名f4=this.form4.归属人1改名
            let 归属人2改名f4=this.form4.归属人2改名
            let 付款改名f4=this.form4.付款改名f4
            let 付佣改名f4=this.form4.付佣改名f4
            let 修改客户电话=this.form4.修改客户电话
            let 写跟进不可复制粘贴=this.form4.写跟进不可复制粘贴
            let 强制合并跟进记录f4=this.form4.强制合并跟进记录f4
            let 跟新客源最后跟进日=this.form4.跟新客源最后跟进日
            let 默认列表配对f4=this.form4.默认列表配对f4
            let 最多拥有私客=this.form4.最多拥有私客
            let 该限制只针对有效私客=this.form4.该限制只针对有效私客
            let 跟进不超过次数=this.form4.跟进不超过次数
            let 优质客置顶显示=this.form4.优质客置顶显示
            let 显示红色超过天数=this.form4.显示红色超过天数
            let 显示红色超过天数2=this.form4.显示红色超过天数2; 

            let  arr4=[ {clas:0,  paramData:电话查重警告, paramName:"电话查重警告", type:5,},{clas:0,  paramData:身份证查重警告, paramName:"身份证查重警告", type:5,},
                  {clas:0,  paramData:重复客源拒绝保存, paramName:"重复客源拒绝保存", type:5,},{clas:0,  paramData:非数字符号, paramName:"非数字符号", type:5,},
                  {clas:0,  paramData:私客查看, paramName:"私客查看", type:5,},{clas:0,  paramData:归属人1改名f4, paramName:"归属人1改名", type:5,},
                  {clas:0,  paramData:归属人2改名f4, paramName:"归属人2改名", type:5,},{clas:0,  paramData:付款改名f4, paramName:"付款改名f4", type:5,},
                  {clas:0,  paramData:付佣改名f4, paramName:"付佣改名f4", type:5,},{clas:0,  paramData:修改客户电话, paramName:"修改客户电话", type:5,},
                  {clas:0,  paramData:写跟进不可复制粘贴, paramName:"写跟进不可复制粘贴", type:5,},{clas:0,  paramData:强制合并跟进记录f4, paramName:"强制合并跟进记录f4", type:5,},
                  {clas:0,  paramData:跟新客源最后跟进日, paramName:"跟新客源最后跟进日", type:5,},{clas:0,  paramData:默认列表配对f4, paramName:"默认列表配对f4", type:5,},
                  {clas:0,  paramData:最多拥有私客, paramName:"最多拥有私客", type:5,}, {clas:0,  paramData:该限制只针对有效私客, paramName:"该限制只针对有效私客", type:5,},
                  {clas:0,  paramData:跟进不超过次数, paramName:"跟进不超过次数", type:5,}, {clas:0,  paramData:优质客置顶显示, paramName:"优质客置顶显示", type:5,},
                  {clas:0,  paramData:显示红色超过天数, paramName:"显示红色超过天数", type:5,},
                  {clas:0,  paramData:显示红色超过天数2, paramName:"显示红色超过天数2", type:5,},
            ]
           let ts=this.form4.data.concat(arr4)
           let newarr=oo.concat(ts)
           let 文件大小不超过=this.form5.文件大小不超过
           let 合同照片缩放=this.form5.合同照片缩放
           let 合同照片不超过=this.form5.合同照片不超过
           let  arr5=[ {clas:0,  paramData:文件大小不超过, paramName:"文件大小不超过", type:6,},{clas:0,  paramData:合同照片缩放, paramName:"合同照片缩放", type:6,},
               {clas:0,  paramData:合同照片不超过, paramName:"合同照片不超过", type:6,},
           ];
           let 入职改名 = this.form6["入职改名"];
           let 首上改名 = this.form6["首上改名"];
           let 转正改名 = this.form6["转正改名"];
           let 离职改名 = this.form6["离职改名"];
           let 止薪改名 = this.form6["止薪改名"];

           let 照片水印文字1 = this.form6["照片水印文字"];
           let 照片水印位置1 = this.form6["照片水印位置"];
           let 方式1 = this.form6["方式"];
           let 照片文件大小101 = this.form6["照片文件大小"];
           let 照片文件大小11 = this.form6["照片文件大小1"];
           let 照片文件大小21 = this.form6["照片文件大小2"];
           let 照片文件大小31 = this.form6["照片文件大小3"];

           let changeForm6Arr = [
            {clas:0,  paramData:入职改名, paramName:"入职改名", type:7},
            {clas:0,  paramData:首上改名, paramName:"首上改名", type:7},
            {clas:0,  paramData:转正改名, paramName:"转正改名", type:7},
            {clas:0,  paramData:离职改名, paramName:"离职改名", type:7},
            {clas:0,  paramData:止薪改名, paramName:"止薪改名", type:7},

            {clas:0,  paramData:照片水印文字1, paramName:"照片水印文字", type:7},
            {clas:0,  paramData:照片水印位置1, paramName:"照片水印位置", type:7},
            {clas:0,  paramData:方式1, paramName:"方式", type:7},
            {clas:0,  paramData:照片文件大小101, paramName:"照片文件大小", type:7},
            {clas:0,  paramData:照片文件大小11, paramName:"照片文件大小1", type:7},
            {clas:0,  paramData:照片文件大小21, paramName:"照片文件大小2", type:7},
            {clas:0,  paramData:照片文件大小31, paramName:"照片文件大小3", type:7},
           ];
          
           let re=this.form5.data.concat(arr5)
           let newarr1=newarr.concat(re)
           let all=this.form6.data.concat(changeForm6Arr).concat(newarr1)
           console.log(all);
           let nnn=JSON.stringify(all);

            //加载动画
            _this.$layer.loading({
              shade:true,
            })
            updateSystemSets(nnn).then(function(response){

              _this.$layer.closeAll("loading");
              if (response.status == 500) {
                return false;
              } else if (response.status == 0) {
                _this.myAlert("数据保存成功！", 'success-icon',).then(res => {
                  _this.cancelData();
                }).catch(err => {

                })
              } else if (response.status == 1) {
                let message = response.msg;
                _this.myAlert(message+"！");
              }
            })

      },
      cancelData(){
        this.$layer.close(this.layerid);
      }
    },
    mounted () {
      this.initial(0)
    },
    beforeDestroy(){
      let _this = this;
      _this.$store.state.layerifranme.forEach((item,index)=>{
        if(item.thisactiveIndex == _this.$store.state.activeIndex.split('/')[2]&&item.oneORmore==1){
          _this.$store.state.layerifranme.splice(index,1);
        }
      }); 
    },
  }
</script>

<style lang="scss" scoped>
  /deep/.el-dialog__wrapper .el-button:focus, .el-dialog__wrapper .el-button:hover {
    color: #000000;
    border-color: #666;
  }
  .right{
    border-radius: 0px!important;
  }
  .sign-word{
    color:#50A09E;
  }
  .inputs {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
    text-align: center;
    font-size: 12px;
  }
  .width_a{
    width:100%;
  }
  .up-down{
    font-size:12px;
    margin-top:1px;
    color:#336699;
  }
  .yuanc{
    background:#606266;
    width:10px;
    height:10px;
    border-radius: 5px;
    display:inline-block;
    margin:5px !important;
  }
  .cler{
    clear: both;
  }
  .inblock{
    display: inline-block;
  }
  p span{
    font-size: 12px;
    font-family: '微软雅黑';
  }
  .mat-10{
    margin-top: 10px;
  }
  .p-10{
    padding-top: 10px;
  }
  .flr{
    float: right;
  }
  .fll{
    float: left;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header {
    background:#DCD9D3;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    height: 24px;
    border-image: url("../../../images/system/border.png")  2 repeat ;
    //background:#F0F0F0;
  }
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    border-width: 2px;
    border-right-width:0px;
    border-bottom-width:0px;
    border-style: solid;
    border-image: url("../../../images/system/border.png")  2 repeat ;
  }
  /deep/ .el-tabs--border-card {
    background:#DCD9D3;
    border-width:0;
  }
  /deep/ .el-tabs--border-card>.el-tabs__content {
    padding:0 !important;
  }

  .pop-up{
    padding: 8px 8px 0;
    .el-tabs--border-card {
      background: #DCD9D3;
    }
    .pop-up-container{
      margin:0px;
      height: 475px;
    }
    /deep/ .el-tabs--border-card>.el-tabs__content {
      padding: 0px;
    }
    /deep/ .el-tabs__item {
      padding: 0 10px;
      height: 22px;
      width: 80px;
      line-height:18px;
      font-size:12px;
      span{
        width:40px;
      }
    }
    .list-container{
      height:185px;
      overflow:auto;
      background:#C0C0C0;
      border:1px solid #797979;
      border-top-width:0;
      margin:10px;
      margin-right:0px;
      border-radius:5px;
      .list-table{
        width:375px;
      }
    }
    .search-container{
      padding:10px 5px;
      .item-earch-btn{
        border: 1px solid #797979;
        line-height: 18px;
        margin-top: 10px;
        text-align: center;
        border-radius: 3px;
        cursor:pointer;
        font-size:12px;
        padding:0px 15px;
      }
    }
  }

  .move-content {
    padding:10px 0 10px 10px;
    .title-word{
      line-height:20px;
      font-size:12px;
    }
    .mearsure-unit{
      line-height:28px;
      color:#606266;
      font-size:12px;
      padding-left:5px;
    }
    .select {
      width: 120px;
    }
    p{

      font-size:12px;
    }
  }
  /deep/ .el-textarea__inner{
    padding:5px;
    font-size:12px;
    border:1px solid #aaa;
  }

</style>
<style>

</style>
