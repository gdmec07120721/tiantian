
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
        <div id="clipDiv" class="clip-div" style="width: ${params.clip.width}; height: ${params.clip.height};"></div>
        <canvas id="imgCanvas" class="clip-img-canvas" width="${params.width}" height="${params.height}"></canvas>
      </div>
    </div>
    <canvas id="canvas" width="${params.width}" height="${params.height}"></canvas>
    <div class="clip-wrap-footer">
      <button class="clip-btn btn-default footer-left" id="cancelBtn">取消</button>
      <button class="clip-btn btn-primary footer-right" id="confirmBtn">完成</button>
    </div>
  </div>`;

    return ClipImg.parseDom(template);
  }

  constructor (options = {}) {
    this.isMove = false;
    this.props = Object.assign({}, { clip: {
      width: '100%',
      height: '80px'
    }, ...options });
    

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
      let offsetTop = this.clipDiv.offsetTop; //获取截取框相对父元素的位置
      let top = offsetTop + (clientY -  this.clip.clientY); //获取移动后截取框相对父元素的位置

      //判断截取框移动的位置是否超出指定范围
      if ((top + this.clipDiv.offsetHeight) < (this.clipImgDiv.offsetHeight) && top > 0) {
        this.clipDiv.style.top = top + 'px';  //设置移动后截取框相对父元素的位置
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
}