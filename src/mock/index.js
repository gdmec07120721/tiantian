import Mock from 'mockjs';

Mock.mock(/\/news\/query_publish_news_list/, {
  'limit': 10,
  'total_num': 37,
  'page_num': 1,
  'pages': 3, //总页数
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新怎标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'http://image.jpd' //新闻图片
    }
  ]
});

Mock.mock(/\/news\/query_publish_news_info/, {
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'news_id': 1, //新闻id
      'text': '<div>halo</div>' //新闻内容
    }
  ]
});

Mock.mock(/\/news\/save_user_edit_news/, {
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新闻标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'http://image.jpd', //新闻图片
      'news_url': 'http://tiantiantui.top/news/query_user_own_news?news_id=1' //分享到微信的链接
    }
  ]
});

Mock.mock(/\/news\/save_user_edit_news/, {
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'news_id': 1, //新闻id
      'news_headline': '华为鸿蒙系统即将推出', //新闻标题
      'news_source_detail': '今日头条', //新闻机构
      'news_image_url': 'http://image.jpd', //新闻图片
      'news_url': 'http://tiantiantui.top/news/query_user_own_news?news_id=1' //分享到微信的链接
    }
  ]
});

Mock.mock(/\/images\/save_user_add_image/, {
  'retcode': '0',
  'retmsg': 'success',
  'result_rows': [
    {
      'image_url': 'http://image.jpg' //新闻id
    }
  ]
});

//新闻列表返回字段缺少时间字段
//缺少用户广告信息添加
//缺少文章详情接口
//详情返回 没有标题和时间字段 没有来源字段
//广告位置需要放置不同位置？ "location_type":1；//"广告位置：1：底部；2：顶部
//"ad_slogan":"广告标语"?
// "ad_image_url":"http://eeeeee.jpg";//广告图片的链接
// "ad_click_effect_type":1,//"广告点击效果:1:跳转链接；2：拨打电话；3：展示海报";
// "ad_click_content":"广告点击内容";

// url: http://tiantiantui.top/news/save_user_edit_news
// 请求方式：Post
// 入参：
// {
// "user_business_card":{
// "business_card_id":22,//名片id
// }
// "banner_ad_info":{
// "banner_ad_id":22,//通栏广告id
// }
// "news_parent_id":11;//新闻的父id，也是新闻来源的news_id 
// "text":"<div>****</div>",//网页内容

// }
// 出参：
// {
// "retcode":"0",
// "retmsg":"success",
// "result_rows":[
// {
// "news_id":1, //新闻id
// "news_headline":"华为鸿蒙系统即将推出", //新闻标题
// "news_source_detail":"今日头条",//新闻机构
// "news_image_url":"http://image.jpd",//新闻图片
// "news_url":"http://tiantiantui.top/news/query_user_own_news?news_id=1 //分享到微信的链接

// }
// ]
// }

//url: http://tiantiantui.top/news/save_user_edit_news
// 请求方式：Post
// 入参：
// {
// "user_business_card":{
// "business_card_id":22,//名片id
// }
// "banner_ad_info":{
// "banner_ad_id":22,//通栏广告id
// }
// "news_parent_id":11;//新闻的父id，也是新闻来源的news_id
// "text":"<div>****</div>",//网页内容

// }

// url: http://tiantiantui.top/news/query_user_own_news?news_id=1
// 请求方式：GET
// 入参：{
// "news_id":1,//新闻id
// }
// 出参：
// {
// "retcode":"0",
// "retmsg":"success",
// "result_rows":[
// {
// "user_business_card":{
// "business_card_id":22,//名片id
// "user_head_portrait":"http://image.jpg", //用户头像图片的连接
// "user_name":"张三", 
// "user_company_name":"公司名称",
// "position":"职位",
// "telphone":"电话号码",
// "ad_slogan":"广告标语",
// "card_type":1//广告模板类型,默认1
// }
// "banner_ad_info":{
// "banner_ad_id":22,//通栏广告id
// "ad_image_url":"http://eeeeee.jpg";//广告图片的链接
// "ad_click_effect_type":1,//"广告点击效果:1:跳转链接；2：拨打电话；3：展示海报";
// "ad_click_content":"广告点击内容";
// "location_type":1；//"广告位置：1：底部；2：顶部

// }
// "text":"<div>****</div>",//网页内容
// "news_id":11//新闻id

// }
// ]
// }

// url: http://tiantiantui.top/images/save_user_add_image
// 请求方式：Post
// 入参：
// {
// "file":"",//图片流内容，MultipartFile 类型
// }
// 出参：
// {
// "retcode":"0",
// "retmsg":"success",
// "result_rows":[
// {
// "image_url":"http://image.jpg" //新闻id
// }
// ]
// }
