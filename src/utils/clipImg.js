
const hasTouch = 'ontouchstart' in window;
const inputEvt = hasTouch ? 'touchend' : 'click';

export default class ClipImg {

  static parseDom(arg) {
    let objE = document.createElement('div');
    objE.innerHTML = arg;
    return objE.childNodes[0];
  }

  static generateClip(params) {
    let template = `<div class="clip-wrap">
    <div class="clip-wrap-context">
      <div id="clipImgDiv" class="clip-img-wrap" style="width: ${params.width}px; height: ${params.height}px;">
        <div id="clipDiv" class="clip-div" style="width: ${params.clip.width}; height: ${params.clip.height};">
          <div class="clip-scale" id="clipScale" style="display: ${params.scale ? 'block' : 'none'}">
          <svg class="icon" width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#F1413D" d="M63.960615 509.636923C25.757538 509.636923 0 483.879385 0 445.833846V63.645538C0 25.6 25.757538 0 63.960615 0h383.291077c38.203077 0 63.803077 25.6 63.803077 63.566769 0 38.203077-25.678769 63.803077-63.960615 63.803077H217.245538l216.930462 216.694154a62.700308 62.700308 0 0 1 19.377231 44.583385 62.542769 62.542769 0 0 1-19.298462 44.425846 62.779077 62.779077 0 0 1-44.662154 19.219692 62.385231 62.385231 0 0 1-44.740923-19.140923l-217.088-216.615385v229.376c0 38.045538-25.6 63.645538-63.803077 63.645539M576.275692 1020.376615c-38.045538 0-63.566769-25.6-63.566769-63.645538 0-38.045538 25.521231-63.566769 63.566769-63.566769h229.848616l-217.009231-216.615385a63.015385 63.015385 0 0 1-19.298462-44.583385 63.015385 63.015385 0 0 1 19.298462-44.583384 62.936615 62.936615 0 0 1 44.662154-19.140923c16.541538 0 32.374154 6.774154 44.583384 19.062154l217.403077 216.457846V574.385231c0-38.045538 25.6-63.645538 63.803077-63.645539 37.966769 0 63.566769 25.678769 63.566769 63.803077v382.188308c0 38.045538-25.6 63.645538-63.566769 63.645538H576.275692z" /></svg>
          </div>
        </div>
        <canvas id="imgCanvas" class="clip-img-canvas" width="${params.width}" height="${params.height}"></canvas>
      </div>
    </div>
    <canvas id="canvas" class="clip-preview" width="${params.width}" height="${params.height}"></canvas>
    <div class="clip-wrap-footer">
      <button class="clip-btn btn-default footer-left" id="cancelBtn">取消</button>
      <button class="clip-btn btn-primary footer-right" id="confirmBtn">完成</button>
    </div>
  </div>`;

    return ClipImg.parseDom(template);
  }

  constructor (options = {}) {
    this.isMove = false;
    this.isScale = false;
    this.props = Object.assign({}, { 
      clip: {
        width: '100%',
        height: '80px'
      }, 
      minClip: {
        width: 10,
        height: 10
      },
      scale: false,
      ...options 
    });
    

    //上传 Image 元素
    this.img = new Image();
    //缩小之后的 Image 元素
    this.newImg = new Image();
    //修剪后的 Image 元素
    this.clipImg = new Image();

    this.render()
      .then(() => {
        this.renderCanvas();
        this.bindEvent();
      })
      .catch(e => {
        //文件流创建失败
      });
  }

  render() {
    return new Promise((resolve, reject) => {
      let self = this;
      //创建文件流对象
      let reader = new FileReader();
      this.wrapperEl = document.querySelector('body');

      this.props.width = this.wrapperEl.offsetWidth;
      //把文件流转化为base64
      reader.readAsDataURL(this.props.file);
      reader.onload = function (e) {
        self.img.src = e.target.result;
        self.img.onload = () => {
          //获取自适应宽度后的高度
          self.props.height = (self.props.width * self.img.naturalHeight) / self.img.naturalWidth;
            
          //在 body 元素上添加 clip 子元素
          self.wrapperEl.appendChild(ClipImg.generateClip(self.props));

          resolve();
        };
      };
      reader.onerror = e => {
        reject(e);
      };
    }); 
  }

  renderCanvas() {
    this.clipWrap = document.querySelector('.clip-wrap');
    this.imgCanvas = document.getElementById('imgCanvas'); //缩小图片canvas
    this.imgCtx = this.imgCanvas.getContext('2d');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.imgCtx.drawImage(this.img, 0, 0, this.props.width, this.props.height);
    this.newImg.src = this.imgCanvas.toDataURL('image/png');
  }

  bindEvent() {
    this.cancelBtn = document.getElementById('cancelBtn');
    this.confirmBtn = document.getElementById('confirmBtn');
    this.clipDiv = document.getElementById('clipDiv'); //截图div
    this.clipImgDiv = document.getElementById('clipImgDiv'); //展示图片div

    this.confirm = e => this.confirmHandler();
    this.cancel = e => this.cancelHandler();
    this.touchstart = e => this.touchstartHandler(e);
    this.touchmove = e => this.touchmoveHandler(e);
    this.touchend = e => this.touchendHandler(e);

    this.confirmBtn.addEventListener(inputEvt, this.confirm, false);
    this.cancelBtn.addEventListener(inputEvt, this.cancel, false);

    this.clipDiv.addEventListener('touchstart', this.touchstart, false);
    this.clipDiv.addEventListener('mousedown', this.touchstart, false);
    
    this.clipDiv.addEventListener('touchmove', this.touchmove, false);
    this.clipDiv.addEventListener('mousemove', this.touchmove, false);
    
    this.clipDiv.addEventListener('touchend', this.touchend, false);
    this.clipDiv.addEventListener('mouseup', this.touchend, false);

    //剪切框是否可缩放
    if (this.props.scale) {
      this.clipScale = document.getElementById('clipScale'); 

      this.scaleTouchstart = e => this.scaleTouchstartHandler(e);
      this.scaleTouchmove = e => this.scaleTouchmoveHandler(e);
      this.scaleTouchend = e => this.scaleTouchendHandler(e);
      
      this.clipScale.addEventListener('touchstart', this.scaleTouchstart, false);
      this.clipScale.addEventListener('mousedown', this.scaleTouchstart, false);
      
      this.clipScale.addEventListener('touchmove', this.scaleTouchmove, false);
      this.clipScale.addEventListener('mousemove', this.scaleTouchmove, false);
      
      this.clipScale.addEventListener('touchend', this.scaleTouchend, false);
      this.clipScale.addEventListener('mouseup', this.scaleTouchend, false);
    }
  }

  confirmHandler() {
    this.clipImg.src = this.canvas.toDataURL('image/png');
    this.props.onConfirm && this.props.onConfirm({
      clipImg: this.clipImg, 
      clipImgSrc: this.clipImg.src
    });
    this.closeHandler();
  }

  cancelHandler() {
    this.props.onCancel && this.props.onCancel();
    this.closeHandler();
  }

  closeHandler() {
    this.wrapperEl.removeChild(this.clipWrap);
  }

  previewHandler() {
    this.canvas.width = this.clipDiv.offsetWidth; 
    this.canvas.height = this.clipDiv.offsetHeight;
    this.ctx.drawImage(this.newImg, this.clipDiv.offsetLeft, this.clipDiv.offsetTop, this.clipDiv.offsetWidth, this.clipDiv.offsetHeight, 0, 0, this.clipDiv.offsetWidth, this.clipDiv.offsetHeight);
  }

  touchstartHandler(event) {
    event.preventDefault();

    //初始化截取框移动目标值
    let { clientX, clientY } = event.changedTouches[0] || event;

    this.clip = { clientX, clientY };
    //可以移动截取框
    this.isMove = true;
  }
  
  touchmoveHandler(event) {
    event.preventDefault();
    
    //判断是否可移动截取框
    if (this.isMove) {
      let { clientX, clientY } = event.changedTouches[0] || event; //获取移动目标的 X，Y位置
      let offsetTop = this.clipDiv.offsetTop; //获取截取框距离父元素上边的位置
      let top = offsetTop + (clientY -  this.clip.clientY); //获取移动后截取框距离父元素上边的位置
      let offsetLeft = this.clipDiv.offsetLeft; //获取截取框距离父元素左边的位置
      let left = offsetLeft + (clientX -  this.clip.clientX); //获取移动后截取框距离父元素左边位置
      //判断截取框移动的位置是否超出父元素的上下范围
      let isExceedTB = ((top + this.clipDiv.offsetHeight) < (this.clipImgDiv.offsetHeight)) && (top > 0); 
      //判断截取框移动的位置是否超出父元素的左右范围
      let isExceedLR = ((left + this.clipDiv.offsetWidth) < (this.clipImgDiv.offsetWidth)) && (left > 0); 

      //判断截取框移动的位置是否超出指定范围
      if (isExceedTB) {
        this.clipDiv.style.top = top + 'px';  //设置移动后截取框相对父元素的位置
        this.clip = { clientX, clientY }; //更新截取框移动目标值
      } 

      if (isExceedLR) {
        this.clipDiv.style.left = left + 'px';  //设置移动后截取框相对父元素的位置
        this.clip = { clientX, clientY }; //更新截取框移动目标值
      }
      
      this.previewHandler();
    }
  }

  touchendHandler(event) {
    event.preventDefault();
    //不可移动截取框
    this.isMove = false;
  }

  scaleTouchstartHandler(event) {
    event.stopPropagation();

    //初始化截取框移动目标值
    let { clientX, clientY } = event.changedTouches[0] || event;

    this.clipScaleClient = { clientX, clientY };
    //可以缩放截取框
    this.isScale = true;
  }
  
  scaleTouchmoveHandler(event) {
    event.stopPropagation();

    if (this.isScale) {
      let { clientX, clientY } = event.changedTouches[0] || event; //获取移动目标的 X，Y位置

      
      let offsetTop = this.clipDiv.offsetTop; //获取截取框距离父元素上边的位置
      let offsetLeft = this.clipDiv.offsetLeft; //获取截取框距离父元素左边的位置
      let height = this.clipDiv.offsetHeight + (clientY - this.clipScaleClient.clientY); //获取截取框缩放后的高度
      let width = (height * this.clipDiv.offsetWidth) / this.clipDiv.offsetHeight; //获取截取框缩放后的宽度
      //判断截取框移动的位置是否超出父元素的下范围
      let isExceedB = ((offsetTop + height) < (this.clipImgDiv.offsetHeight)) && (height > this.props.minClip.height); 
      //判断截取框移动的位置是否超出父元素的右范围
      let isExceedR = ((offsetLeft + width) < (this.clipImgDiv.offsetWidth)) && (width > this.props.minClip.width); 

      if (isExceedB && isExceedR) {
        this.clipDiv.style.width = width + 'px';
        this.clipDiv.style.height = height + 'px';
        this.clipScaleClient = { clientX, clientY };
      }    

      this.previewHandler();  
    }
  }
  
  scaleTouchendHandler(event) {
    event.stopPropagation();

    //静止缩放截取框
    this.isScale = false;
  }
}