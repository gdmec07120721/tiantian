
export function isURL (url) {
  let strRegex = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;

  return strRegex.test(url);
}

export function isPhoneNumber (mobile = '', type = 0) {
  let mob_reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  let tel_reg = /^0\\d{2,3}-?\\d{7,8}$|^(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])\\d{8}$/;
  let is_match = false;

  switch (type) {
    case 0:
      is_match = mob_reg.test(mobile);
      break;
    case 1: 
      is_match = tel_reg.test(mobile);
      break;
    case 2: 
      is_match = mob_reg.test(mobile) || tel_reg.test(mobile);
      break;
  }

  return is_match;
}

export function isAndroid() {
  let u = navigator.userAgent;
  console.log(u);
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    return true;
  }
  return false;
}

/**  
* 将以base64的图片url数据转换为File  
*/  
export function dataURLtoFile(dataurl, filename = '图片') { //将base64转换为文件
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}