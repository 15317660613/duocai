import Vue from 'vue'

/**
 * 防反跳。fn函数在最后一次调用时刻的delay毫秒之后执行！
 * @param fn 执行函数
 * @param delay 时间间隔
 * @param isImmediate 为true，debounce会在delay时间间隔的开始时立即调用这个函数
 * @returns {Function}
 */
function debounce(fn, delay, isImmediate) {
  var timer = null;  //初始化timer，作为计时清除依据
  return function() {
    var context = this;  //获取函数所在作用域this
    var args = arguments;  //取得传入参数
    clearTimeout(timer);
    if(isImmediate && timer === null) {
      //时间间隔外立即执行
      fn.apply(context,args);
      timer = 0;
      return;
    }
    timer = setTimeout(function() {
      fn.apply(context,args);
      timer = null;
    }, delay);
  }
}
// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
  bind(el, binding, vnode, oldVnode) {
    const dragDom = binding.value.$el.querySelector('.el-dialog')

    el.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - el.offsetLeft

      document.onmousemove = function(e) {
        e.preventDefault() // 移动时禁用默认事件

        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        dragDom.style.width = `${l}px`
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

Vue.directive('loadmore', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll',debounce(function() {
      let sign = 120
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;

      if (scrollDistance <= sign) {
        binding.value(1);
      }

    }, 500,true));
  }
})

Vue.directive('watermark',(el,binding)=>{
    function addWaterMarker(str,parentNode,font,textColor){// 水印文字，父元素，字体，文字颜色
        var can = document.createElement('canvas');
        parentNode.appendChild(can);
        can.width = 400;
        can.height = 200;
        can.style.display = 'none';
        var cans = can.getContext('2d');
        cans.rotate(-20 * Math.PI / 180);
        cans.font = font || "16px Microsoft JhengHei";
        cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
        cans.textAlign = 'left';
        cans.textBaseline = 'Middle';
        cans.fillText(str, can.width / 3, can.height / 2);
        parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
    }
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
})