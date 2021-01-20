import { MessageBox } from 'element-ui'
import Vue from 'vue'
Vue.prototype.myAlert = function(text = '新增成功', icon='dangerous-icon',mySuccess = 'my-success',text2 = ''){
   return MessageBox.alert('<div class="pop-up" style="" >\n' +
    '        <div class="pop-up-container">\n' +
    '          <div class="clear" style="padding:30px 10px 30px 10px;;" >\n' +
    '             <div class="left">\n'+
    '               <i class="'+icon+'" ></i>\n'+
    '             </div>\n'+
    '             <div class="left" style="width:88%;"  >\n'+
    '                 <p style="margin-left:5px;font-size:12px;"><span id="" >'+text+'</span></p>\n' +
     '                <p style="margin-left:5px;font-size:12px;line-height:18px;"><span id="" >'+text2+'</span></p>\n' +
    '             </div>\n'+
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="clear" style="width:100%;height:30px;" >\n' +
    '        </div>\n' +
    '      </div>', ' ',{
     customClass:mySuccess,
     appendToBody:true,
    dangerouslyUseHTMLString: true
  })
}

Vue.prototype.myConfirm = function(text1 = '新增成功', icon = 'dangerous-icon',confirmButtonText = '确定',cancelButtonText = '取消',text2="",mySuccess = 'my-success',text3=""){
   return MessageBox.confirm('<div class="pop-up" style="" >\n' +
    '        <div class="pop-up-container">\n' +
    '          <div class="clear" style="padding:30px 5px 30px  10px;" >\n' +
    '             <div class="left">\n'+
    '               <i class="'+icon+'" ></i>\n'+
    '             </div>\n'+
    '             <div class="left" style="width:88%;" >\n'+
    '                 <div style="margin-left:5px;font-size:12px;line-height:18px;word-wrap: break-word;">'+text1+'</div>' + '' +
     '                <p style="margin-left:5px;font-size:12px;line-height:18px;"><span style="word-wrap: break-word;" id="" >'+text2+'</span></p>\n' +
     '<p style="margin-left:5px;font-size:12px;line-height:18px;"><span id="" style="word-wrap: break-word;" >'+text3+'</span></p>\n' +
    '             </div>\n'+
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="clear" style="width:100%;height:30px;" >\n' +
    '        </div>\n' +
    '      </div>', ' ',{

     customClass:mySuccess,
     modalAppendToBody:false,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    dangerouslyUseHTMLString: true
  })
}
